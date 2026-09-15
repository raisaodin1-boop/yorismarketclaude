// @vitest-environment node
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  payableCheckoutTotal,
  resolveCouponDiscount,
  trustedCheckoutCoupon,
} from "../../../supabase/functions/_shared/coupon.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");

function mockSupabase({ coupon = null, redemption = null, orderCount = 0 } = {}) {
  return {
    from(table) {
      return {
        select() {
          const chain = {
            eq() {
              return chain;
            },
            maybeSingle: async () => {
              if (table === "coupons") return { data: coupon };
              if (table === "coupon_redemptions") return { data: redemption };
              return { data: null };
            },
            then: undefined,
          };
          if (table === "orders") {
            return {
              eq: async () => ({ count: orderCount }),
            };
          }
          return chain;
        },
      };
    },
  };
}

describe("trustedCheckoutCoupon", () => {
  it("ignores a forged stored coupon_discount when the buyer is a guest", async () => {
    const intent = {
      coupon_code: "FORGED",
      coupon_discount: 60000,
    };
    const resolved = await trustedCheckoutCoupon(
      mockSupabase(),
      intent,
      null,
      60000,
    );
    expect(resolved).toEqual({ code: null, discount: 0 });
    expect(payableCheckoutTotal(60000, resolved.discount)).toBe(60000);
    expect(payableCheckoutTotal(60000, intent.coupon_discount)).toBe(0);
  });

  it("ignores a forged code even for a logged-in user", async () => {
    const resolved = await trustedCheckoutCoupon(
      mockSupabase({ coupon: null }),
      { coupon_code: "FORGED", coupon_discount: 59900 },
      "11111111-1111-1111-1111-111111111111",
      60000,
    );
    expect(resolved.discount).toBe(0);
    expect(payableCheckoutTotal(60000, resolved.discount)).toBe(60000);
  });

  it("applies a real catalog coupon and clamps to the cart total", async () => {
    const resolved = await trustedCheckoutCoupon(
      mockSupabase({
        coupon: {
          code: "WELCOME",
          active: true,
          expires_at: null,
          usage_limit: null,
          usage_count: 0,
          first_order_only: false,
          discount_amount: 90000,
        },
      }),
      { coupon_code: "welcome", coupon_discount: 1 },
      "11111111-1111-1111-1111-111111111111",
      60000,
    );
    expect(resolved).toEqual({ code: "WELCOME", discount: 60000 });
    expect(payableCheckoutTotal(60000, resolved.discount)).toBe(0);
  });

  it("resolveCouponDiscount also refuses coupons without a user id", async () => {
    const resolved = await resolveCouponDiscount(
      mockSupabase({
        coupon: { code: "WELCOME", active: true, discount_amount: 5000 },
      }),
      "WELCOME",
      "",
      12000,
    );
    expect(resolved).toEqual({ code: null, discount: 0 });
  });
});

describe("confirm_checkout coupon source", () => {
  const confirmSrc = readFileSync(
    join(root, "supabase/functions/confirm_checkout/index.ts"),
    "utf8",
  );
  const migration = readFileSync(
    join(root, "supabase/migrations/20260915120000_lock_checkout_intent_coupon_writes.sql"),
    "utf8",
  );

  it("revalidates coupons and never charges intent.coupon_discount", () => {
    expect(confirmSrc).toContain("trustedCheckoutCoupon");
    expect(confirmSrc).toContain("payableCheckoutTotal");
    expect(confirmSrc).toMatch(/payableCheckoutTotal\(totals\.total, couponDiscount\)/);
    expect(confirmSrc).not.toMatch(/payableCheckoutTotal\([^)]*intent\.coupon_discount/);
  });

  it("stamps the revalidated coupon back onto the intent before payment", () => {
    expect(confirmSrc).toMatch(/coupon_code:\s*couponCode/);
    expect(confirmSrc).toMatch(/coupon_discount:\s*couponDiscount/);
  });

  it("revokes leftover anon writes on checkout_intents", () => {
    expect(migration).toMatch(/REVOKE ALL ON TABLE public\.checkout_intents FROM anon/i);
    expect(migration).toMatch(/FORCE ROW LEVEL SECURITY/i);
    expect(migration).toMatch(/checkout_intents_update_admin_only/);
    expect(migration).not.toMatch(/FOR INSERT TO anon/);
  });
});
