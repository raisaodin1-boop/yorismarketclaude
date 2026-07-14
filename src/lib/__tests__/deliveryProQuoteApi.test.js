import { beforeEach, describe, expect, it, vi } from "vitest";

const select = vi.fn();
const insert = vi.fn();
const from = vi.fn(() => ({ insert }));

vi.mock("../supabase.js", () => ({
  supabase: { from },
}));

const validForm = {
  shop_name: " Boutique Test ",
  owner_name: " Test Owner ",
  phone: " +237 699 000 000 ",
  email: " OWNER@EXAMPLE.TEST ",
  city: " Douala ",
  address: " Akwa ",
  monthly_volume: "1-50",
  driver_mode: "assigned",
  notes: "",
};

describe("submitDeliveryProQuote", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    const insertResult = Promise.resolve({ data: null, error: null });
    insertResult.select = select;
    insert.mockReturnValue(insertResult);
  });

  it("inserts an anonymous quote without requesting an RLS-protected readback", async () => {
    const { submitDeliveryProQuote } = await import("../deliveryProQuoteApi.js");

    await expect(submitDeliveryProQuote(validForm)).resolves.toEqual({
      ok: true,
      errors: {},
    });

    expect(from).toHaveBeenCalledWith("delivery_pro_quotes");
    expect(insert).toHaveBeenCalledWith({
      user_id: null,
      shop_name: "Boutique Test",
      owner_name: "Test Owner",
      phone: "+237 699 000 000",
      email: "owner@example.test",
      city: "Douala",
      address: "Akwa",
      monthly_volume: "1-50",
      driver_mode: "assigned",
      notes: null,
      status: "pending",
    });
    expect(select).not.toHaveBeenCalled();
  });
});
