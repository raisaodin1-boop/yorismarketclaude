// @vitest-environment node

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it, vi } from "vitest";
import { ensureCinetPayOrdersPaid } from "../../../supabase/functions/_shared/cinetpay_orders.ts";

const returnStatusSource = readFileSync(
  fileURLToPath(new URL("../../../supabase/functions/checkout_return_status/index.ts", import.meta.url)),
  "utf8",
);
const webhookSource = readFileSync(
  fileURLToPath(new URL("../../../supabase/functions/webhook_cinetpay/index.ts", import.meta.url)),
  "utf8",
);
const checkoutPageSource = readFileSync(
  fileURLToPath(new URL("../../components/CheckoutPage.jsx", import.meta.url)),
  "utf8",
);

function mockUpdateChain({ data, error }) {
  const chain = {
    update: vi.fn(function update() {
      return this;
    }),
    eq: vi.fn(function eq() {
      return this;
    }),
    not: vi.fn(function not() {
      return this;
    }),
    select: vi.fn().mockResolvedValue({ data, error }),
  };
  return chain;
}

describe("ensureCinetPayOrdersPaid", () => {
  it("rejects missing order_group_id", async () => {
    const supabase = { from: vi.fn() };
    await expect(
      ensureCinetPayOrdersPaid(supabase, { orderGroupId: null, transactionRef: "YRXPAY-1" }),
    ).resolves.toEqual({ ok: false, reason: "missing_order_group" });
    expect(supabase.from).not.toHaveBeenCalled();
  });

  it("marks non-cancelled orders paid and skips cancelled statuses", async () => {
    const updateQuery = mockUpdateChain({
      data: [{ id: "ord-1", payment_status: "paid", status: "validee" }],
      error: null,
    });
    const supabase = { from: vi.fn(() => updateQuery) };

    await expect(
      ensureCinetPayOrdersPaid(supabase, {
        orderGroupId: "YORIX-GROUP",
        transactionRef: "YRXPAY-1",
      }),
    ).resolves.toEqual({ ok: true, orderIds: ["ord-1"] });

    expect(supabase.from).toHaveBeenCalledWith("orders");
    expect(updateQuery.update).toHaveBeenCalledWith({
      payment_status: "paid",
      escrow_status: "securise",
      payment_provider: "cinetpay",
      status: "validee",
      provider_tx_ref: "YRXPAY-1",
    });
    expect(updateQuery.eq).toHaveBeenCalledWith("order_group_id", "YORIX-GROUP");
    expect(updateQuery.not).toHaveBeenCalledWith("status", "in", "(annulee,cancelled,canceled)");
  });

  it("fails closed when the orders update errors so callers can retry", async () => {
    const updateQuery = mockUpdateChain({
      data: null,
      error: { message: "connection reset" },
    });
    const supabase = { from: vi.fn(() => updateQuery) };

    await expect(
      ensureCinetPayOrdersPaid(supabase, {
        orderGroupId: "YORIX-GROUP",
        transactionRef: "YRXPAY-1",
      }),
    ).resolves.toEqual({ ok: false, reason: "connection reset" });
  });

  it("treats an all-cancelled group as success without resurrection", async () => {
    const updateQuery = mockUpdateChain({ data: [], error: null });
    const readQuery = {
      select: vi.fn(function select() {
        return this;
      }),
      eq: vi.fn().mockResolvedValue({
        data: [
          { id: "ord-1", payment_status: "cancelled", status: "annulee" },
          { id: "ord-2", payment_status: "cancelled", status: "annulee" },
        ],
        error: null,
      }),
    };
    const supabase = {
      from: vi
        .fn()
        .mockImplementationOnce(() => updateQuery)
        .mockImplementationOnce(() => readQuery),
    };

    await expect(
      ensureCinetPayOrdersPaid(supabase, {
        orderGroupId: "YORIX-CANCELLED",
        transactionRef: "YRXPAY-1",
      }),
    ).resolves.toEqual({
      ok: true,
      allCancelled: true,
      orderIds: ["ord-1", "ord-2"],
    });
  });

  it("fails when active orders remain unpaid after a no-op update", async () => {
    const updateQuery = mockUpdateChain({ data: [], error: null });
    const readQuery = {
      select: vi.fn(function select() {
        return this;
      }),
      eq: vi.fn().mockResolvedValue({
        data: [
          { id: "ord-1", payment_status: "pending", status: "pending" },
          { id: "ord-2", payment_status: "cancelled", status: "annulee" },
        ],
        error: null,
      }),
    };
    const supabase = {
      from: vi
        .fn()
        .mockImplementationOnce(() => updateQuery)
        .mockImplementationOnce(() => readQuery),
    };

    await expect(
      ensureCinetPayOrdersPaid(supabase, {
        orderGroupId: "YORIX-STRANDED",
        transactionRef: "YRXPAY-1",
      }),
    ).resolves.toEqual({ ok: false, reason: "orders_unpaid" });
  });
});

describe("CinetPay order-repair wiring", () => {
  it("wires ensureCinetPayOrdersPaid into webhook and return status", () => {
    expect(returnStatusSource).toContain(
      'import { ensureCinetPayOrdersPaid } from "../_shared/cinetpay_orders.ts"',
    );
    expect(webhookSource).toContain(
      'import { ensureCinetPayOrdersPaid } from "../_shared/cinetpay_orders.ts"',
    );
    expect(returnStatusSource).toContain("ensureCinetPayOrdersPaid");
    expect(webhookSource).toContain("ensureCinetPayOrdersPaid");
    expect(returnStatusSource).toContain("orders_pending");
    expect(webhookSource).toMatch(/status: 500/);
  });

  it("repairs already-paid transactions instead of early-returning without order sync", () => {
    expect(webhookSource).toContain('if (tx.status === "paid")');
    expect(webhookSource).toContain("ensureCinetPayOrdersPaid");
    expect(returnStatusSource).toContain('payStatus === "paid"');
    expect(returnStatusSource).toContain("syncPaidOrders");
  });

  it("keeps CheckoutPage from clearing the cart while orders_pending", () => {
    expect(checkoutPageSource).toContain("data.orders_pending");
    expect(checkoutPageSource).toContain("finalisation des commandes");
    const pendingIdx = checkoutPageSource.indexOf("data.orders_pending");
    const clearIdx = checkoutPageSource.indexOf("setCartItems([])", pendingIdx);
    expect(pendingIdx).toBeGreaterThan(-1);
    expect(clearIdx).toBeGreaterThan(pendingIdx);
    const pendingBlock = checkoutPageSource.slice(pendingIdx, clearIdx);
    expect(pendingBlock).toContain("return;");
  });
});
