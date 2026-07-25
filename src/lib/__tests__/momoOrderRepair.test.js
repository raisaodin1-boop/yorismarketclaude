/**
 * @vitest-environment node
 */
import { describe, expect, it, vi } from "vitest";
import { ensureMomoOrdersPaid } from "../../../api/momo-status.js";

describe("ensureMomoOrdersPaid", () => {
  it("rejects missing order_group_id", async () => {
    const supabase = { from: vi.fn() };
    await expect(
      ensureMomoOrdersPaid(supabase, { orderGroupId: null, referenceId: "ref-1" }),
    ).resolves.toEqual({ ok: false, reason: "missing_order_group" });
    expect(supabase.from).not.toHaveBeenCalled();
  });

  it("marks matching orders paid and returns ok", async () => {
    const updateQuery = {
      update: vi.fn(function update() {
        return this;
      }),
      eq: vi.fn(function eq() {
        return this;
      }),
      select: vi.fn().mockResolvedValue({
        data: [{ id: "ord-1", payment_status: "paid" }],
        error: null,
      }),
    };
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
  });

  it("fails closed when the orders update errors (so polling can retry)", async () => {
    const updateQuery = {
      update: vi.fn(function update() {
        return this;
      }),
      eq: vi.fn(function eq() {
        return this;
      }),
      select: vi.fn().mockResolvedValue({
        data: null,
        error: { message: "connection reset" },
      }),
    };
    const supabase = { from: vi.fn(() => updateQuery) };

    await expect(
      ensureMomoOrdersPaid(supabase, {
        orderGroupId: "YORIX-GROUP",
        referenceId: "paynote-ref",
      }),
    ).resolves.toEqual({ ok: false, reason: "connection reset" });
  });

  it("fails closed when no orders exist for the paid transaction group", async () => {
    const updateQuery = {
      update: vi.fn(function update() {
        return this;
      }),
      eq: vi.fn(function eq() {
        return this;
      }),
      select: vi.fn().mockResolvedValue({ data: [], error: null }),
    };
    const readQuery = {
      select: vi.fn(function select() {
        return this;
      }),
      eq: vi.fn().mockResolvedValue({ data: [], error: null }),
    };
    const supabase = {
      from: vi
        .fn()
        .mockImplementationOnce(() => updateQuery)
        .mockImplementationOnce(() => readQuery),
    };

    await expect(
      ensureMomoOrdersPaid(supabase, {
        orderGroupId: "YORIX-MISSING",
        referenceId: "paynote-ref",
      }),
    ).resolves.toEqual({ ok: false, reason: "no_orders" });
  });

  it("treats already-paid orders as success when update returns no rows", async () => {
    const updateQuery = {
      update: vi.fn(function update() {
        return this;
      }),
      eq: vi.fn(function eq() {
        return this;
      }),
      select: vi.fn().mockResolvedValue({ data: [], error: null }),
    };
    const readQuery = {
      select: vi.fn(function select() {
        return this;
      }),
      eq: vi.fn().mockResolvedValue({
        data: [
          { id: "ord-1", payment_status: "paid" },
          { id: "ord-2", payment_status: "paid" },
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
        orderGroupId: "YORIX-GROUP",
        referenceId: "paynote-ref",
      }),
    ).resolves.toEqual({ ok: true, orderIds: ["ord-1", "ord-2"] });
  });
});
