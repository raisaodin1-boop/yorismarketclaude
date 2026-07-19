import { describe, expect, it, vi } from "vitest";
import { resolveConfirmedOrderGroup } from "../../../api/momo.js";

function checkoutBindingQuery(result) {
  const query = {
    select: vi.fn(() => query),
    eq: vi.fn(() => query),
    contains: vi.fn(() => query),
    maybeSingle: vi.fn().mockResolvedValue(result),
  };
  return query;
}

describe("MoMo checkout order binding", () => {
  it("accepts only a completed confirmation binding the intent and order group", async () => {
    const query = checkoutBindingQuery({
      data: { order_group_id: "YORIX-EXPENSIVE" },
      error: null,
    });
    const supabase = { from: vi.fn(() => query) };

    await expect(
      resolveConfirmedOrderGroup(supabase, "intent-cheap", "YORIX-EXPENSIVE"),
    ).resolves.toBe("YORIX-EXPENSIVE");

    expect(supabase.from).toHaveBeenCalledWith("checkout_idempotency");
    expect(query.eq).toHaveBeenNthCalledWith(1, "status", "completed");
    expect(query.eq).toHaveBeenNthCalledWith(
      2,
      "order_group_id",
      "YORIX-EXPENSIVE",
    );
    expect(query.contains).toHaveBeenCalledWith("response", {
      checkout_intent_id: "intent-cheap",
      order_group_id: "YORIX-EXPENSIVE",
    });
  });

  it("rejects an order group that was confirmed from a different intent", async () => {
    const query = checkoutBindingQuery({ data: null, error: null });
    const supabase = { from: vi.fn(() => query) };

    await expect(
      resolveConfirmedOrderGroup(supabase, "intent-cheap", "YORIX-UNRELATED"),
    ).resolves.toBeNull();
  });

  it("fails closed when the confirmation lookup fails", async () => {
    const query = checkoutBindingQuery({
      data: null,
      error: new Error("database unavailable"),
    });
    const supabase = { from: vi.fn(() => query) };

    await expect(
      resolveConfirmedOrderGroup(supabase, "intent-cheap", "YORIX-EXPENSIVE"),
    ).rejects.toThrow("database unavailable");
  });
});
