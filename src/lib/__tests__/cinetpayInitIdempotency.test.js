/**
 * @vitest-environment node
 *
 * Régression : init_payment_cinetpay générait un nouveau transaction_id
 * (Date.now) à chaque POST. Timeout / double-submit → 2 sessions CinetPay
 * payables pour la même commande → risque de double encaissement.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { transform } from "esbuild";
import { describe, expect, it, vi, beforeEach } from "vitest";

const initHelperPath = fileURLToPath(
  new URL("../../../supabase/functions/_shared/cinetpay_init.ts", import.meta.url),
);
const edgePath = fileURLToPath(
  new URL("../../../supabase/functions/init_payment_cinetpay/index.ts", import.meta.url),
);
const migrationPath = fileURLToPath(
  new URL("../../../supabase/migrations/20260807120000_cinetpay_init_idempotency.sql", import.meta.url),
);
const checkoutPagePath = fileURLToPath(
  new URL("../../components/CheckoutPage.jsx", import.meta.url),
);

async function loadInitModule() {
  const source = readFileSync(initHelperPath, "utf8");
  const { code } = await transform(source, {
    loader: "ts",
    format: "esm",
    target: "node18",
  });
  const dataUrl = `data:text/javascript;charset=utf-8,${encodeURIComponent(code)}`;
  return import(dataUrl);
}

function mockSupabase({ existingRows = [], claimError = null, updateError = null, racedRows = null } = {}) {
  let selectCalls = 0;
  const insert = vi.fn(() => ({
    select: vi.fn(() => ({
      single: vi.fn().mockResolvedValue(
        claimError
          ? { data: null, error: claimError }
          : { data: { id: "claim-1" }, error: null },
      ),
    })),
  }));

  const update = vi.fn(() => ({
    eq: vi.fn().mockResolvedValue({ error: updateError }),
  }));

  const selectChain = {};
  selectChain.eq = vi.fn(() => selectChain);
  selectChain.in = vi.fn(() => selectChain);
  selectChain.order = vi.fn(() => selectChain);
  selectChain.limit = vi.fn().mockImplementation(async () => {
    selectCalls += 1;
    const rows = selectCalls > 1 && racedRows != null ? racedRows : existingRows;
    return { data: rows, error: null };
  });

  return {
    from: vi.fn(() => ({
      select: vi.fn(() => selectChain),
      insert,
      update,
    })),
    _insert: insert,
    _update: update,
  };
}

describe("CinetPay init idempotency helpers", () => {
  let mod;

  beforeEach(async () => {
    vi.clearAllMocks();
    mod = await loadInitModule();
  });

  it("detects unique violations", () => {
    expect(mod.isUniqueViolation({ code: "23505" })).toBe(true);
    expect(mod.isUniqueViolation({ message: "duplicate key value violates unique constraint" })).toBe(true);
    expect(mod.isUniqueViolation({ message: "other" })).toBe(false);
  });

  it("prefers paid-with-ref, then pending-with-ref, then null-ref claim", () => {
    expect(
      mod.pickReusableCinetPayTx([
        { id: "claim", status: "pending", provider_ref: null },
        { id: "pending", status: "pending", provider_ref: "YRX-1", payload: { data: { payment_url: "https://pay/1" } } },
        { id: "paid", status: "paid", provider_ref: "YRX-paid" },
      ]).id,
    ).toBe("paid");

    expect(
      mod.pickReusableCinetPayTx([
        { id: "claim", status: "pending", provider_ref: null },
        { id: "pending", status: "pending", provider_ref: "YRX-1" },
      ]).id,
    ).toBe("pending");
  });

  it("extracts payment_url from CinetPay payload shape", () => {
    expect(mod.extractCinetPayPaymentUrl({ data: { payment_url: "https://pay.example/x" } })).toBe(
      "https://pay.example/x",
    );
    expect(mod.extractCinetPayPaymentUrl({})).toBeNull();
  });

  it("reuses an existing pending provider_ref without calling CinetPay", async () => {
    const supabase = mockSupabase({
      existingRows: [
        {
          id: "tx-1",
          status: "pending",
          provider_ref: "YRXPAY-ORD-1-111",
          payload: { data: { payment_url: "https://cinetpay.test/pay/111" } },
        },
      ],
    });
    const createPaymentSession = vi.fn();

    const result = await mod.initiateCinetPayPaymentIdempotent({
      supabase,
      createPaymentSession,
      checkoutIntentId: "intent-1",
      orderGroupId: "ORD-1",
      amount: 5000,
    });

    expect(result).toMatchObject({
      ok: true,
      reused: true,
      transaction_ref: "YRXPAY-ORD-1-111",
      payment_url: "https://cinetpay.test/pay/111",
      status: "pending",
    });
    expect(createPaymentSession).not.toHaveBeenCalled();
    expect(supabase._insert).not.toHaveBeenCalled();
  });

  it("returns paid reuse without opening a new provider session", async () => {
    const supabase = mockSupabase({
      existingRows: [
        {
          id: "tx-paid",
          status: "paid",
          provider_ref: "YRXPAY-ORD-PAID",
          payload: { data: { payment_url: "https://cinetpay.test/pay/old" } },
        },
      ],
    });
    const createPaymentSession = vi.fn();

    const result = await mod.initiateCinetPayPaymentIdempotent({
      supabase,
      createPaymentSession,
      checkoutIntentId: "intent-paid",
      orderGroupId: "ORD-PAID",
      amount: 9000,
    });

    expect(result).toMatchObject({
      ok: true,
      reused: true,
      status: "paid",
      transaction_ref: "YRXPAY-ORD-PAID",
    });
    expect(createPaymentSession).not.toHaveBeenCalled();
  });

  it("claims then calls CinetPay once on first init", async () => {
    const supabase = mockSupabase({ existingRows: [] });
    const createPaymentSession = vi.fn().mockResolvedValue({
      paymentUrl: "https://cinetpay.test/pay/new",
      raw: { code: "201", data: { payment_url: "https://cinetpay.test/pay/new" } },
    });

    const result = await mod.initiateCinetPayPaymentIdempotent({
      supabase,
      createPaymentSession,
      checkoutIntentId: "intent-2",
      orderGroupId: "ORD-2",
      amount: 2500,
      generateTxRef: () => "YRXPAY-ORD-2-FIXED",
    });

    expect(result).toMatchObject({
      ok: true,
      reused: false,
      transaction_ref: "YRXPAY-ORD-2-FIXED",
      payment_url: "https://cinetpay.test/pay/new",
      status: "pending",
    });
    expect(createPaymentSession).toHaveBeenCalledTimes(1);
    expect(createPaymentSession).toHaveBeenCalledWith("YRXPAY-ORD-2-FIXED");
    expect(supabase._insert).toHaveBeenCalledTimes(1);
    expect(supabase._update).toHaveBeenCalledTimes(1);
  });

  it("returns 409 while a null-ref claim is held (in-flight init)", async () => {
    const supabase = mockSupabase({
      existingRows: [{ id: "claim", status: "pending", provider_ref: null }],
    });
    const createPaymentSession = vi.fn();

    const result = await mod.initiateCinetPayPaymentIdempotent({
      supabase,
      createPaymentSession,
      checkoutIntentId: "intent-race",
      orderGroupId: "ORD-RACE",
      amount: 1000,
    });

    expect(result).toMatchObject({ ok: false, httpStatus: 409 });
    expect(createPaymentSession).not.toHaveBeenCalled();
  });

  it("fail-closes when pending journal has ref but no recoverable payment_url", async () => {
    const supabase = mockSupabase({
      existingRows: [{ id: "tx-bad", status: "pending", provider_ref: "YRX-BAD", payload: {} }],
    });
    const createPaymentSession = vi.fn();

    const result = await mod.initiateCinetPayPaymentIdempotent({
      supabase,
      createPaymentSession,
      checkoutIntentId: "intent-bad",
      orderGroupId: "ORD-BAD",
      amount: 1000,
    });

    expect(result.ok).toBe(false);
    expect(result.httpStatus).toBe(500);
    expect(createPaymentSession).not.toHaveBeenCalled();
  });

  it("marks claim failed and releases the slot when CinetPay errors", async () => {
    const supabase = mockSupabase({ existingRows: [] });
    const createPaymentSession = vi.fn().mockRejectedValue(new Error("CinetPay init failed"));

    const result = await mod.initiateCinetPayPaymentIdempotent({
      supabase,
      createPaymentSession,
      checkoutIntentId: "intent-fail",
      orderGroupId: "ORD-FAIL",
      amount: 1000,
      generateTxRef: () => "YRXPAY-FAIL",
    });

    expect(result.ok).toBe(false);
    expect(supabase._update).toHaveBeenCalled();
    const updateArg = supabase._update.mock.calls[0][0];
    expect(updateArg.status).toBe("failed");
  });

  it("on unique race, reuses the winner's payment_url without a second provider call", async () => {
    const supabase = mockSupabase({
      existingRows: [],
      claimError: { code: "23505", message: "duplicate key" },
      racedRows: [
        {
          id: "winner",
          status: "pending",
          provider_ref: "YRX-WIN",
          payload: { data: { payment_url: "https://cinetpay.test/pay/win" } },
        },
      ],
    });
    const createPaymentSession = vi.fn();

    const result = await mod.initiateCinetPayPaymentIdempotent({
      supabase,
      createPaymentSession,
      checkoutIntentId: "intent-uniq",
      orderGroupId: "ORD-UNIQ",
      amount: 3000,
    });

    expect(result).toMatchObject({
      ok: true,
      reused: true,
      transaction_ref: "YRX-WIN",
      payment_url: "https://cinetpay.test/pay/win",
    });
    expect(createPaymentSession).not.toHaveBeenCalled();
  });
});

describe("CinetPay init wiring", () => {
  it("edge function validates amount before provider call and uses the idempotent helper", () => {
    const source = readFileSync(edgePath, "utf8");
    const amountValidation = source.indexOf("Amount does not match checkout total");
    const helperCall = source.indexOf("const result = await initiateCinetPayPaymentIdempotent");
    const providerCall = source.indexOf('fetch("https://api-checkout.cinetpay.com/v2/payment"');

    expect(amountValidation).toBeGreaterThan(-1);
    expect(helperCall).toBeGreaterThan(-1);
    expect(amountValidation).toBeLessThan(helperCall);
    expect(providerCall).toBeGreaterThan(helperCall);
    expect(source).toContain('from "../_shared/cinetpay_init.ts"');
    expect(source).not.toMatch(/const txRef = `YRXPAY-\$\{orderGroupId\}-\$\{Date\.now\(\)\}`/);
  });

  it("migration installs unique pending indexes for cinetpay", () => {
    const sql = readFileSync(migrationPath, "utf8");
    expect(sql).toContain("idx_payment_tx_cinetpay_pending_intent");
    expect(sql).toContain("idx_payment_tx_cinetpay_pending_order_group");
    expect(sql).toContain("provider = 'cinetpay'");
    expect(sql).toContain("status = 'pending'");
  });

  it("CheckoutPage treats reused paid status as success without redirect", () => {
    const source = readFileSync(checkoutPagePath, "utf8");
    expect(source).toContain('payment?.status === "paid"');
    expect(source).toContain("Paiement CinetPay déjà confirmé");
  });
});
