/**
 * @vitest-environment node
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it, vi } from "vitest";
import { ensureMomoOrdersPaid } from "../../../api/_lib/momo_orders.js";

const momoStatusSource = readFileSync(
  fileURLToPath(new URL("../../../api/momo-status.js", import.meta.url)),
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

describe("ensureMomoOrdersPaid", () => {
  it("rejects missing order_group_id", async () => {
    const supabase = { from: vi.fn() };
    await expect(
      ensureMomoOrdersPaid(supabase, { orderGroupId: null, referenceId: "ref-1" }),
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
      ensureMomoOrdersPaid(supabase, {
        orderGroupId: "YORIX-GROUP",
        referenceId: "paynote-ref",
      }),
    ).resolves.toEqual({ ok: true, orderIds: ["ord-1"] });

    expect(supabase.from).toHaveBeenCalledWith("orders");
    expect(updateQuery.update).toHaveBeenCalledWith({
      payment_status: "paid",
      escrow_status: "securise",
      payment_provider: "paynote_mtn",
      status: "validee",
      provider_tx_ref: "paynote-ref",
    });
    expect(updateQuery.eq).toHaveBeenCalledWith("order_group_id", "YORIX-GROUP");
    expect(updateQuery.not).toHaveBeenCalledWith("status", "in", "(annulee,cancelled,canceled)");
  });

  it("fails closed when the orders update errors so polling can retry", async () => {
    const updateQuery = mockUpdateChain({
      data: null,
      error: { message: "connection reset" },
    });
    const supabase = { from: vi.fn(() => updateQuery) };

    await expect(
      ensureMomoOrdersPaid(supabase, {
        orderGroupId: "YORIX-GROUP",
        referenceId: "paynote-ref",
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
      ensureMomoOrdersPaid(supabase, {
        orderGroupId: "YORIX-CANCELLED",
        referenceId: "paynote-ref",
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
      ensureMomoOrdersPaid(supabase, {
        orderGroupId: "YORIX-STRANDED",
        referenceId: "paynote-ref",
      }),
    ).resolves.toEqual({ ok: false, reason: "orders_unpaid" });
  });

  it("treats already-paid active orders as success when update returns no rows", async () => {
    const updateQuery = mockUpdateChain({ data: [], error: null });
    const readQuery = {
      select: vi.fn(function select() {
        return this;
      }),
      eq: vi.fn().mockResolvedValue({
        data: [
          { id: "ord-1", payment_status: "paid", status: "validee" },
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
      ensureMomoOrdersPaid(supabase, {
        orderGroupId: "YORIX-MIXED",
        referenceId: "paynote-ref",
      }),
    ).resolves.toEqual({ ok: true, orderIds: ["ord-1"] });
  });
});

describe("momo-status wiring", () => {
  it("settles via shared helper and does not blind-update cancelled orders", () => {
    expect(momoStatusSource).toContain('import { settlePaynoteMtnPayment } from "./_lib/paynote_settle.js"');
    expect(momoStatusSource).toContain("settlePaynoteMtnPayment");
    expect(momoStatusSource).toContain("orders_pending");
    expect(momoStatusSource).not.toMatch(
      /\.update\(\{\s*payment_status:\s*"paid"[\s\S]*?\}\)\s*\.eq\("order_group_id"/,
    );
  });

  it("keeps polling semantics when settlement reports pending order sync", () => {
    expect(momoStatusSource).toContain('result.outcome === "pending"');
    expect(momoStatusSource).toContain("orders_pending");
  });
});
