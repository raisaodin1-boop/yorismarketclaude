// @vitest-environment node
import { describe, expect, it } from "vitest";
import {
  applyCheckoutDiscount,
  validateCheckoutCoupon,
} from "../../../supabase/functions/_shared/checkout_coupons.ts";

function makeSupabase({ coupon, existingRedemption = null, orderCount = 0 }) {
  const calls = [];

  return {
    calls,
    from(table) {
      const state = { table, filters: [], selectArgs: null };
      const resultFor = () => {
        calls.push({ ...state, filters: [...state.filters] });
        if (table === "coupons") return { data: coupon, error: null };
        if (table === "coupon_redemptions") return { data: existingRedemption, error: null };
        if (table === "orders") return { count: orderCount, error: null };
        return { data: null, error: null };
      };

      const chain = {
        select(...args) {
          state.selectArgs = args;
          return chain;
        },
        eq(column, value) {
          state.filters.push([column, value]);
          return chain;
        },
        maybeSingle() {
          return Promise.resolve(resultFor());
        },
        then(resolve, reject) {
          return Promise.resolve(resultFor()).then(resolve, reject);
        },
      };
      return chain;
    },
  };
}

describe("checkout coupon helpers", () => {
  it("clips discounts to the checkout total", () => {
    expect(applyCheckoutDiscount(1500, 2000)).toBe(0);
    expect(applyCheckoutDiscount(3500, 1000)).toBe(2500);
  });

  it("rejects first-order coupons when the buyer already has orders", async () => {
    const supabase = makeSupabase({
      coupon: {
        code: "BIENVENUE2000",
        active: true,
        discount_amount: 2000,
        first_order_only: true,
        usage_limit: null,
        usage_count: 0,
      },
      orderCount: 1,
    });

    const result = await validateCheckoutCoupon(supabase, {
      code: "bienvenue2000",
      customerId: "user-1",
      grossTotal: 5000,
    });

    expect(result.error).toBe("Ce code est réservé à votre première commande.");
    const orderCall = supabase.calls.find((call) => call.table === "orders");
    expect(orderCall.filters).toContainEqual(["client_id", "user-1"]);
  });

  it("returns the trusted server-side discount for valid coupons", async () => {
    const supabase = makeSupabase({
      coupon: {
        code: "BIENVENUE2000",
        active: true,
        discount_amount: 2000,
        first_order_only: false,
        usage_limit: null,
        usage_count: 0,
      },
    });

    await expect(
      validateCheckoutCoupon(supabase, {
        code: " bienvenue2000 ",
        customerId: "user-1",
        grossTotal: 5000,
      }),
    ).resolves.toEqual({ code: "BIENVENUE2000", discountAmount: 2000 });
  });
});
