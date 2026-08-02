/**
 * @vitest-environment node
 *
 * Régression : CinetPay applique le coupon sur checkout_intents.total puis
 * redirige avant recordCouponRedemption → usage_limit / per-user jamais brûlés.
 * confirm_checkout doit consommer le coupon côté service_role avant les inserts.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { transform } from "esbuild";
import { describe, expect, it, vi } from "vitest";

const couponPath = fileURLToPath(
  new URL("../../../supabase/functions/_shared/coupon.ts", import.meta.url),
);
const confirmPath = fileURLToPath(
  new URL("../../../supabase/functions/confirm_checkout/index.ts", import.meta.url),
);

async function loadCouponModule() {
  const source = readFileSync(couponPath, "utf8");
  const { code } = await transform(source, {
    loader: "ts",
    format: "esm",
    target: "node18",
  });
  const dataUrl = `data:text/javascript;charset=utf-8,${encodeURIComponent(code)}`;
  return import(dataUrl);
}

function mockSupabase({ coupon, existingRedemption = null, orderCount = 0, insertError = null, rpcError = null, updateRows = [{ id: "c1" }] }) {
  const redemptionsInsert = vi.fn(async () => ({ error: insertError }));
  const redemptionsDelete = vi.fn(async () => ({ error: null }));
  const couponsUpdate = vi.fn(async () => ({ data: updateRows, error: null }));

  const from = vi.fn((table) => {
    if (table === "coupons") {
      return {
        select: () => ({
          eq: () => ({
            eq: () => ({
              maybeSingle: async () => ({ data: coupon, error: null }),
            }),
            maybeSingle: async () => ({ data: coupon, error: null }),
          }),
        }),
        update: (payload) => ({
          eq: () => ({
            eq: () => ({
              select: async () => {
                await couponsUpdate(payload);
                return { data: updateRows, error: null };
              },
            }),
          }),
        }),
      };
    }
    if (table === "coupon_redemptions") {
      return {
        select: () => ({
          eq: () => ({
            eq: () => ({
              maybeSingle: async () => ({ data: existingRedemption, error: null }),
            }),
          }),
        }),
        insert: (row) => {
          redemptionsInsert(row);
          return Promise.resolve({ error: insertError });
        },
        delete: () => ({
          eq: () => ({
            eq: () => ({
              eq: () => {
                redemptionsDelete();
                return Promise.resolve({ error: null });
              },
            }),
          }),
        }),
      };
    }
    if (table === "orders") {
      return {
        select: () => ({
          eq: async () => ({ count: orderCount, error: null }),
        }),
      };
    }
    throw new Error(`unexpected table ${table}`);
  });

  const rpc = vi.fn(async () => ({ error: rpcError }));
  return { from, rpc, redemptionsInsert, couponsUpdate, redemptionsDelete };
}

describe("consumeCouponRedemption", () => {
  it("inserts a redemption and increments usage when the coupon is still valid", async () => {
    const { consumeCouponRedemption } = await loadCouponModule();
    const sb = mockSupabase({
      coupon: {
        code: "WELCOME1",
        active: true,
        expires_at: null,
        usage_limit: 1,
        usage_count: 0,
        first_order_only: false,
        discount_amount: 2000,
      },
      rpcError: { message: "function missing" },
    });

    const result = await consumeCouponRedemption(sb, {
      code: "welcome1",
      userId: "11111111-1111-1111-1111-111111111111",
      orderId: "YORIX-ABCDEF12",
      expectedDiscount: 2000,
      cartTotal: 15000,
    });

    expect(result).toEqual({ ok: true, discount: 2000 });
    expect(sb.redemptionsInsert).toHaveBeenCalledWith({
      coupon_code: "WELCOME1",
      user_id: "11111111-1111-1111-1111-111111111111",
      order_id: "YORIX-ABCDEF12",
      discount_applied: 2000,
    });
    expect(sb.couponsUpdate).toHaveBeenCalledWith({ usage_count: 1 });
  });

  it("fails closed when usage_limit is already exhausted", async () => {
    const { consumeCouponRedemption } = await loadCouponModule();
    const sb = mockSupabase({
      coupon: {
        code: "WELCOME1",
        active: true,
        expires_at: null,
        usage_limit: 1,
        usage_count: 1,
        first_order_only: false,
        discount_amount: 2000,
      },
    });

    const result = await consumeCouponRedemption(sb, {
      code: "WELCOME1",
      userId: "11111111-1111-1111-1111-111111111111",
      orderId: "YORIX-ABCDEF12",
      expectedDiscount: 2000,
      cartTotal: 15000,
    });

    expect(result).toEqual({ ok: false, reason: "coupon_no_longer_valid" });
    expect(sb.redemptionsInsert).not.toHaveBeenCalled();
  });

  it("fails closed when the same user already redeemed the code", async () => {
    const { consumeCouponRedemption } = await loadCouponModule();
    const sb = mockSupabase({
      coupon: {
        code: "WELCOME1",
        active: true,
        expires_at: null,
        usage_limit: null,
        usage_count: 3,
        first_order_only: false,
        discount_amount: 2000,
      },
      existingRedemption: { id: "r1" },
    });

    const result = await consumeCouponRedemption(sb, {
      code: "WELCOME1",
      userId: "11111111-1111-1111-1111-111111111111",
      orderId: "YORIX-ABCDEF12",
      expectedDiscount: 2000,
      cartTotal: 15000,
    });

    expect(result).toEqual({ ok: false, reason: "coupon_no_longer_valid" });
    expect(sb.redemptionsInsert).not.toHaveBeenCalled();
  });
});

describe("confirm_checkout coupon burn wiring", () => {
  const source = readFileSync(confirmPath, "utf8");

  it("imports and calls consumeCouponRedemption before creating orders", () => {
    expect(source).toContain('from "../_shared/coupon.ts"');
    expect(source).toContain("consumeCouponRedemption");
    expect(source).toContain("COUPON_NO_LONGER_VALID");

    const consumeAt = source.indexOf("consumeCouponRedemption(supabase");
    const ordersAt = source.indexOf("const ordersCreated");
    expect(consumeAt).toBeGreaterThan(-1);
    expect(ordersAt).toBeGreaterThan(consumeAt);
  });

  it("does not rely only on the browser recordCouponRedemption path", () => {
    expect(source).toMatch(/Burn the coupon BEFORE order writes/);
    expect(source).toContain("couponCode && couponDiscount > 0");
  });
});
