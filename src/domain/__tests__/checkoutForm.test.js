import { describe, it, expect, beforeEach } from "vitest";

const ss = {};
beforeEach(() => {
  Object.keys(ss).forEach((k) => delete ss[k]);
  globalThis.sessionStorage = {
    getItem: (k) => (k in ss ? ss[k] : null),
    setItem: (k, v) => {
      ss[k] = String(v);
    },
    removeItem: (k) => {
      delete ss[k];
    },
    clear: () => {
      Object.keys(ss).forEach((k) => delete ss[k]);
    },
  };
});

describe("checkoutForm", () => {
  it("normalizeCmMobileDigits strips 237 and non-digits", async () => {
    const { normalizeCmMobileDigits } = await import("../checkoutForm.js");
    expect(normalizeCmMobileDigits("+237 6 90 12 34 56")).toBe("690123456");
    expect(normalizeCmMobileDigits("237690123456789")).toBe("123456789");
  });

  it("isValidCmMobile accepts 9 digits starting with 6", async () => {
    const { isValidCmMobile } = await import("../checkoutForm.js");
    expect(isValidCmMobile("690123456")).toBe(true);
    expect(isValidCmMobile("590123456")).toBe(false);
    expect(isValidCmMobile("69012345")).toBe(false);
  });

  it("validateCheckoutAddressStep requires phone and city", async () => {
    const { validateCheckoutAddressStep } = await import("../checkoutForm.js");
    const r = validateCheckoutAddressStep({
      phone: "",
      line1: "Rue longue",
      ville: "Douala",
      quartier: "Akwa",
    });
    expect(r.ok).toBe(false);
    expect(r.errors.phone).toBeDefined();
  });

  it("validateCheckoutAddressStep ok with valid mobile and address", async () => {
    const { validateCheckoutAddressStep } = await import("../checkoutForm.js");
    const r = validateCheckoutAddressStep({
      phone: "690123456",
      line1: "Rue de la Paix",
      ville: "Douala",
      quartier: "Akwa",
    });
    expect(r.ok).toBe(true);
    expect(r.phoneDigits).toBe("690123456");
  });

  it("composeFullAddress joins parts", async () => {
    const { composeFullAddress } = await import("../checkoutForm.js");
    const s = composeFullAddress({
      line1: "Rue 12",
      quartier: "Bastos",
      ville: "Yaoundé",
      landmark: "Portail vert",
      deliveryTag: "Bip au portail",
    });
    expect(s).toContain("Rue 12");
    expect(s).toContain("Yaoundé");
    expect(s).toContain("Repère : Portail vert");
  });

  it("saveCheckoutDraft + loadCheckoutDraft scoped by userId", async () => {
    const { saveCheckoutDraft, loadCheckoutDraft } = await import("../checkoutForm.js");
    saveCheckoutDraft("u1", { step: 2 });
    expect(loadCheckoutDraft("u1")).toEqual({ step: 2 });
    expect(loadCheckoutDraft("u2")).toBeNull();
  });
});
