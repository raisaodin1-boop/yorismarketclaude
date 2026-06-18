import { describe, it, expect } from "vitest";
import { shouldBlockCinetPayCoupon } from "../CheckoutPage.jsx";

describe("CheckoutPage payment guards", () => {
  it("blocks CinetPay when a coupon is applied to avoid charging the undiscounted total", () => {
    expect(shouldBlockCinetPayCoupon("cinetpay", { code: "BIENVENUE2000", discount: 2000 })).toBe(true);
  });

  it("allows CinetPay without a coupon and manual methods with a coupon", () => {
    expect(shouldBlockCinetPayCoupon("cinetpay", null)).toBe(false);
    expect(shouldBlockCinetPayCoupon("cod", { code: "BIENVENUE2000", discount: 2000 })).toBe(false);
    expect(shouldBlockCinetPayCoupon("whatsapp_backup", { code: "BIENVENUE2000", discount: 2000 })).toBe(false);
  });
});
