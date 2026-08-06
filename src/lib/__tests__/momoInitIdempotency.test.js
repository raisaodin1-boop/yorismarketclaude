/** @vitest-environment node */
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  isUniqueViolation,
  pickReusableMomoTx,
  initiateMomoPaymentIdempotent,
} from "../../../api/_lib/momo_init.js";

describe("isUniqueViolation", () => {
  it("detects Postgres 23505 and common PostgREST messages", () => {
    expect(isUniqueViolation({ code: "23505" })).toBe(true);
    expect(isUniqueViolation({ message: "duplicate key value violates unique constraint" })).toBe(true);
    expect(isUniqueViolation({ message: "other" })).toBe(false);
  });
});

describe("pickReusableMomoTx", () => {
  it("prefers paid-with-ref over pending", () => {
    const picked = pickReusableMomoTx([
      { id: "p1", status: "pending", provider_ref: "msg-pending" },
      { id: "paid", status: "paid", provider_ref: "msg-paid" },
    ]);
    expect(picked.id).toBe("paid");
  });

  it("reuses pending-with-ref before null-ref claims", () => {
    const picked = pickReusableMomoTx([
      { id: "claim", status: "pending", provider_ref: null },
      { id: "ref", status: "pending", provider_ref: "msg-1" },
    ]);
    expect(picked.id).toBe("ref");
  });
});

function mockSupabase({ existingRows = [], claimError = null, updateError = null } = {}) {
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
  selectChain.limit = vi.fn().mockResolvedValue({ data: existingRows, error: null });

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

describe("initiateMomoPaymentIdempotent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("reuses an existing pending provider_ref without calling Paynote", async () => {
    const supabase = mockSupabase({
      existingRows: [{ id: "tx-1", status: "pending", provider_ref: "msg-existing" }],
    });
    const initiatePayment = vi.fn();

    const result = await initiateMomoPaymentIdempotent({
      supabase,
      initiatePayment,
      checkoutIntentId: "intent-1",
      orderGroupId: "ORD-1",
      amount: 5000,
      phone: "670000000",
      paynoteArgs: { orderId: "intent-1", amount: 5000 },
    });

    expect(result).toMatchObject({
      ok: true,
      reused: true,
      reference_id: "msg-existing",
      status: "pending",
    });
    expect(initiatePayment).not.toHaveBeenCalled();
    expect(supabase._insert).not.toHaveBeenCalled();
  });

  it("claims then calls Paynote once on first init", async () => {
    const supabase = mockSupabase({ existingRows: [] });
    const initiatePayment = vi.fn().mockResolvedValue({ messageId: "msg-new", raw: { ok: true } });

    const result = await initiateMomoPaymentIdempotent({
      supabase,
      initiatePayment,
      checkoutIntentId: "intent-2",
      orderGroupId: "ORD-2",
      amount: 2500,
      phone: "670000001",
      paynoteArgs: { orderId: "intent-2", amount: 2500 },
    });

    expect(result).toMatchObject({
      ok: true,
      reused: false,
      reference_id: "msg-new",
      status: "pending",
    });
    expect(initiatePayment).toHaveBeenCalledTimes(1);
    expect(supabase._insert).toHaveBeenCalledTimes(1);
    expect(supabase._update).toHaveBeenCalledTimes(1);
  });

  it("does not call Paynote again when a null-ref claim is already held", async () => {
    const supabase = mockSupabase({
      existingRows: [{ id: "claim", status: "pending", provider_ref: null }],
    });
    const initiatePayment = vi.fn();

    const result = await initiateMomoPaymentIdempotent({
      supabase,
      initiatePayment,
      checkoutIntentId: "intent-3",
      amount: 1000,
      phone: "670000002",
      paynoteArgs: { orderId: "intent-3", amount: 1000 },
    });

    expect(result).toMatchObject({ ok: false, httpStatus: 409 });
    expect(initiatePayment).not.toHaveBeenCalled();
  });

  it("on unique race, reuses the winner's provider_ref without a second Paynote call", async () => {
    let lookups = 0;
    const selectChain = {};
    selectChain.eq = vi.fn(() => selectChain);
    selectChain.in = vi.fn(() => selectChain);
    selectChain.order = vi.fn(() => selectChain);
    selectChain.limit = vi.fn().mockImplementation(async () => {
      lookups += 1;
      if (lookups === 1) return { data: [], error: null };
      return {
        data: [{ id: "winner", status: "pending", provider_ref: "msg-winner" }],
        error: null,
      };
    });

    const supabase = {
      from: vi.fn(() => ({
        select: vi.fn(() => selectChain),
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: null,
              error: { code: "23505", message: "duplicate key" },
            }),
          })),
        })),
        update: vi.fn(),
      })),
    };
    const initiatePayment = vi.fn();

    const result = await initiateMomoPaymentIdempotent({
      supabase,
      initiatePayment,
      orderGroupId: "LOYALTY-p1",
      amount: 3000,
      phone: "670000003",
      extraPayload: { loyalty_purchase_id: "p1" },
      paynoteArgs: { orderId: "LOYALTY-p1", amount: 3000 },
    });

    expect(result).toMatchObject({
      ok: true,
      reused: true,
      reference_id: "msg-winner",
    });
    expect(initiatePayment).not.toHaveBeenCalled();
  });

  it("marks the claim failed on Paynote error so a later retry can init again", async () => {
    const supabase = mockSupabase({ existingRows: [] });
    const initiatePayment = vi.fn().mockRejectedValue(new Error("Paynote down"));

    const result = await initiateMomoPaymentIdempotent({
      supabase,
      initiatePayment,
      checkoutIntentId: "intent-fail",
      amount: 1000,
      phone: "670000004",
      paynoteArgs: { orderId: "intent-fail", amount: 1000 },
    });

    expect(result).toMatchObject({ ok: false, httpStatus: 502, error: "Paynote down" });
    expect(supabase._update).toHaveBeenCalled();
    const updateArg = supabase._update.mock.calls[0][0];
    expect(updateArg.status).toBe("failed");
  });

  it("fails closed without releasing the claim when provider_ref cannot be saved", async () => {
    const supabase = mockSupabase({ existingRows: [], updateError: { message: "write failed" } });
    const initiatePayment = vi.fn().mockResolvedValue({ messageId: "msg-orphan", raw: {} });

    const result = await initiateMomoPaymentIdempotent({
      supabase,
      initiatePayment,
      checkoutIntentId: "intent-orphan",
      amount: 1000,
      phone: "670000005",
      paynoteArgs: { orderId: "intent-orphan", amount: 1000 },
    });

    expect(result.ok).toBe(false);
    expect(result.httpStatus).toBe(500);
    expect(result.error).toMatch(/ne réessayez pas/i);
    const updateArg = supabase._update.mock.calls[0][0];
    expect(updateArg.status).toBeUndefined();
    expect(updateArg.provider_ref).toBe("msg-orphan");
  });
});
