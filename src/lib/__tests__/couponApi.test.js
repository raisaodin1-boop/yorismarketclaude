import { describe, it, expect, beforeEach, vi } from "vitest";

const { from } = vi.hoisted(() => ({
  from: vi.fn(),
}));

vi.mock("../supabase.js", () => ({
  supabase: {
    from,
  },
}));

function maybeSingleBuilder(result) {
  const builder = {};
  builder.select = vi.fn(() => builder);
  builder.eq = vi.fn(() => builder);
  builder.maybeSingle = vi.fn().mockResolvedValue(result);
  return builder;
}

function countBuilder(result) {
  const builder = {};
  builder.select = vi.fn(() => builder);
  builder.eq = vi.fn().mockResolvedValue(result);
  return builder;
}

describe("couponApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects first-order coupons for users that already have orders", async () => {
    const couponQuery = maybeSingleBuilder({
      data: {
        code: "BIENVENUE2000",
        active: true,
        expires_at: null,
        usage_limit: null,
        usage_count: 0,
        first_order_only: true,
        discount_amount: 2000,
      },
      error: null,
    });
    const redemptionQuery = maybeSingleBuilder({ data: null, error: null });
    const ordersQuery = countBuilder({ count: 1, error: null });

    from
      .mockReturnValueOnce(couponQuery)
      .mockReturnValueOnce(redemptionQuery)
      .mockReturnValueOnce(ordersQuery);

    const { validateCoupon } = await import("../couponApi.js");
    const result = await validateCoupon("bienvenue2000", "user-1");

    expect(result).toEqual({
      ok: false,
      error: "Ce code est réservé à votre première commande.",
    });
    expect(ordersQuery.eq).toHaveBeenCalledWith("client_id", "user-1");
    expect(ordersQuery.eq).not.toHaveBeenCalledWith("customer_id", "user-1");
  });

  it("fails closed when first-order eligibility cannot be verified", async () => {
    const couponQuery = maybeSingleBuilder({
      data: {
        code: "BIENVENUE2000",
        active: true,
        expires_at: null,
        usage_limit: null,
        usage_count: 0,
        first_order_only: true,
        discount_amount: 2000,
      },
      error: null,
    });
    const redemptionQuery = maybeSingleBuilder({ data: null, error: null });
    const ordersQuery = countBuilder({
      count: null,
      error: new Error("column does not exist"),
    });

    from
      .mockReturnValueOnce(couponQuery)
      .mockReturnValueOnce(redemptionQuery)
      .mockReturnValueOnce(ordersQuery);

    const { validateCoupon } = await import("../couponApi.js");
    const result = await validateCoupon("BIENVENUE2000", "user-1");

    expect(result.ok).toBe(false);
    expect(result.error).toBe("Impossible de vérifier l'éligibilité du code promo.");
  });
});
