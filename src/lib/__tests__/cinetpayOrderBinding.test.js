// @vitest-environment node
import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { hasConfirmedOrderBinding } from "../../../supabase/functions/_shared/confirmed_order_binding.ts";

function bindingQuery(result) {
  const query = {
    select: vi.fn(() => query),
    eq: vi.fn(() => query),
    contains: vi.fn(() => query),
    limit: vi.fn(() => query),
    maybeSingle: vi.fn().mockResolvedValue(result),
  };
  return query;
}

describe("CinetPay confirmed-order binding", () => {
  it("accepts only a completed confirmation containing the exact intent and order group", async () => {
    const query = bindingQuery({ data: { key: "idem-1" }, error: null });
    const supabase = { from: vi.fn(() => query) };

    await expect(
      hasConfirmedOrderBinding(supabase, "intent-cheap", "YORIX-CHEAP"),
    ).resolves.toBe(true);

    expect(supabase.from).toHaveBeenCalledWith("checkout_idempotency");
    expect(query.eq).toHaveBeenNthCalledWith(1, "status", "completed");
    expect(query.eq).toHaveBeenNthCalledWith(2, "order_group_id", "YORIX-CHEAP");
    expect(query.contains).toHaveBeenCalledWith("response", {
      checkout_intent_id: "intent-cheap",
      order_group_id: "YORIX-CHEAP",
    });
  });

  it("rejects an order group confirmed from a different checkout", async () => {
    const query = bindingQuery({ data: null, error: null });
    const supabase = { from: vi.fn(() => query) };

    await expect(
      hasConfirmedOrderBinding(supabase, "intent-cheap", "YORIX-EXPENSIVE"),
    ).resolves.toBe(false);
  });

  it("fails closed when the confirmation lookup fails", async () => {
    const query = bindingQuery({ data: null, error: new Error("database unavailable") });
    const supabase = { from: vi.fn(() => query) };

    await expect(
      hasConfirmedOrderBinding(supabase, "intent-cheap", "YORIX-EXPENSIVE"),
    ).rejects.toThrow("database unavailable");
  });

  it("validates amount and order binding before contacting CinetPay", () => {
    const source = readFileSync(
      new URL("../../../supabase/functions/init_payment_cinetpay/index.ts", import.meta.url),
      "utf8",
    );
    const amountValidation = source.indexOf("Amount does not match checkout total");
    const bindingValidation = source.indexOf("const bound = await hasConfirmedOrderBinding");
    const providerCall = source.indexOf('fetch("https://api-checkout.cinetpay.com/v2/payment"');

    expect(amountValidation).toBeGreaterThan(-1);
    expect(bindingValidation).toBeGreaterThan(amountValidation);
    expect(providerCall).toBeGreaterThan(bindingValidation);
  });
});
