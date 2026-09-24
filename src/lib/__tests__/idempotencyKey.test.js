import { describe, expect, it } from "vitest";
import { isCheckoutIdempotencyKey } from "../../../supabase/functions/_shared/idempotency_key.ts";

const REAL_UUID = "550e8400-e29b-41d4-a716-446655440000";

describe("isCheckoutIdempotencyKey", () => {
  it("accepts a Postgres uuid", () => {
    expect(isCheckoutIdempotencyKey(REAL_UUID)).toBe(true);
    expect(isCheckoutIdempotencyKey(REAL_UUID.toUpperCase())).toBe(true);
  });

  it("rejects the mobile timestamp-userId key that crashed confirm_checkout", () => {
    const mobileKey = `1720248213071-${REAL_UUID}`;
    // L'ancien garde-fou de confirm_checkout acceptait cette chaîne.
    expect(/^[0-9a-fA-F-]{16,}$/.test(mobileKey)).toBe(true);
    expect(isCheckoutIdempotencyKey(mobileKey)).toBe(false);
  });

  it("rejects empty and non-uuid fallbacks", () => {
    expect(isCheckoutIdempotencyKey("")).toBe(false);
    expect(isCheckoutIdempotencyKey("idem-1720248213071-abc123")).toBe(false);
    expect(isCheckoutIdempotencyKey("not-a-uuid")).toBe(false);
  });
});
