import { beforeEach, describe, expect, it, vi } from "vitest";

const select = vi.fn();
const insert = vi.fn(() => ({ error: null, select }));
const from = vi.fn(() => ({ insert }));

vi.mock("../supabase.js", () => ({
  supabase: { from },
}));

describe("deliveryProQuoteApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("submits a public quote without requesting an RLS-protected readback", async () => {
    const { submitDeliveryProQuote } = await import("../deliveryProQuoteApi.js");
    const form = {
      shop_name: "Boutique Test",
      owner_name: "Alice Test",
      phone: "690000000",
      email: "ALICE@example.com",
      city: "Douala",
      address: "Akwa",
      monthly_volume: "1-50",
      driver_mode: "pool",
      notes: "",
    };

    await expect(submitDeliveryProQuote(form)).resolves.toEqual({ ok: true, errors: {} });
    expect(from).toHaveBeenCalledWith("delivery_pro_quotes");
    expect(insert).toHaveBeenCalledWith({
      user_id: null,
      shop_name: "Boutique Test",
      owner_name: "Alice Test",
      phone: "690000000",
      email: "alice@example.com",
      city: "Douala",
      address: "Akwa",
      monthly_volume: "1-50",
      driver_mode: "pool",
      notes: null,
      status: "pending",
    });
    expect(select).not.toHaveBeenCalled();
  });
});
