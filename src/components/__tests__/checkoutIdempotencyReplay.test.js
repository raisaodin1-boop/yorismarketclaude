import React, { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createRoot } from "react-dom/client";

const api = vi.hoisted(() => ({
  createCheckoutIntent: vi.fn(),
  confirmCheckout: vi.fn(),
  initPaymentCinetPay: vi.fn(),
  checkoutReturnStatus: vi.fn(),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));
vi.mock("react-router-dom", () => ({
  useLocation: () => ({ pathname: "/checkout", search: "" }),
  useNavigate: () => vi.fn(),
}));
vi.mock("../../lib/checkoutApi", () => ({
  CheckoutError: class CheckoutError extends Error {
    constructor(message, options = {}) {
      super(message);
      Object.assign(this, options);
    }
  },
  ...api,
}));
vi.mock("../../domain/checkoutForm", () => ({
  clearCheckoutDraft: vi.fn(),
  composeFullAddress: ({ line1, quartier, ville }) => [line1, quartier, ville].filter(Boolean).join(", "),
  loadCheckoutDraft: () => ({
    step: 3,
    phoneLocal: "690000000",
    nomLocal: "Regression Test",
    addressLine: "1 Test Street",
    quartier: "Centre",
    ville: "Yaoundé",
    paymentMethod: "cinetpay",
  }),
  isValidCmMobile: () => true,
  normalizeCmMobileDigits: (value) => String(value || "").replace(/\D/g, "").slice(-9),
  saveCheckoutDraft: vi.fn(),
  validateCheckoutAddressStep: () => ({ ok: true, errors: {} }),
}));
vi.mock("../../domain/deliveryPolicy", () => ({
  computeCartDeliverySummary: (items, summary) => ({
    ...summary,
    subtotal: items.reduce((sum, item) => sum + item.prix * item.qty, 0),
    delivery: 0,
    total: items.reduce((sum, item) => sum + item.prix * item.qty, 0),
  }),
}));
vi.mock("../../domain/checkoutOrchestrator", () => ({
  detectCheckoutType: () => "product_only",
  buildCheckoutIntent: ({ items, user, userData, summary }) => ({
    items,
    customer: { id: user.id, telephone: userData.telephone },
    summary,
  }),
}));
vi.mock("../../lib/seoRoutes", () => ({
  PAGE_PATH: { checkout: "/checkout" },
  parseLocaleSegments: () => ({ locale: "fr", barePath: "/checkout" }),
  localePath: () => "/checkout",
}));
vi.mock("../../lib/supabase", () => ({
  YORIX_WA_NUMBER: "237690000000",
  supabase: { auth: { getSession: vi.fn() } },
}));
vi.mock("../CheckoutProgressBar", () => ({ CheckoutProgressBar: () => null }));
vi.mock("../FreeShippingProgress", () => ({ FreeShippingProgress: () => null }));
vi.mock("../ui/TrustStrip", () => ({ TrustStrip: () => null }));
vi.mock("../../lib/couponApi", () => ({
  validateCoupon: vi.fn(),
  recordCouponRedemption: vi.fn(() => Promise.resolve()),
}));
vi.mock("../../lib/referralApi", () => ({
  creditReferralBonusIfEligible: vi.fn(() => Promise.resolve()),
}));
vi.mock("../../lib/logisticsAi", () => ({
  explainDeliveryEta: () => ({ summaryFr: "Test ETA" }),
}));
vi.mock("../../lib/appToast", () => ({ userFacingSuccess: vi.fn() }));
vi.mock("../../lib/pdfDocumentGenerator", () => ({
  generateAttestationPdf: vi.fn(),
  generateDeliveryNotePdf: vi.fn(),
  generateInvoicePdf: vi.fn(),
}));

const INTENT_A = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const ORDER_A = "YORIX-AAAAAAAA";

let container;
let root;
let setCartItems;

async function renderCheckout() {
  const { CheckoutPage } = await import("../CheckoutPage.jsx");
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  setCartItems = vi.fn();

  await act(async () => {
    root.render(React.createElement(CheckoutPage, {
      user: { id: "11111111-1111-4111-8111-111111111111", email: "test@example.invalid" },
      userData: { nom: "Regression Test", telephone: "690000000", adresse: "1 Test Street", ville: "Yaoundé" },
      cartItems: [{ id: "product-1", kind: "product", qty: 1, prix: 10000, name: "Test product" }],
      summary: {
        subtotal: 10000,
        delivery: 0,
        total: 10000,
        hasShippableProducts: true,
        freeShippingUnlocked: true,
      },
      setCartItems,
      goPage: vi.fn(),
    }));
  });
}

async function submit() {
  const button = container.querySelector("button.form-submit");
  expect(button).not.toBeNull();
  await act(async () => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
}

async function choosePaymentMethod(value) {
  const select = container.querySelector("select");
  expect(select).not.toBeNull();
  await act(async () => {
    select.value = value;
    select.dispatchEvent(new Event("change", { bubbles: true }));
  });
}

beforeEach(() => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  sessionStorage.clear();
  api.createCheckoutIntent.mockReset().mockResolvedValue({
    checkout_intent_id: INTENT_A,
    total: 10000,
  });
  api.confirmCheckout.mockReset().mockResolvedValue({
    checkout_intent_id: INTENT_A,
    order_group_id: ORDER_A,
    total: 10000,
  });
  api.initPaymentCinetPay.mockReset().mockResolvedValue({
    transaction_ref: "YRXPAY-TEST",
    payment_url: null,
  });
  api.checkoutReturnStatus.mockReset();
});

afterEach(async () => {
  if (root) {
    await act(async () => root.unmount());
  }
  container?.remove();
  root = null;
  container = null;
  sessionStorage.clear();
  delete globalThis.IS_REACT_ACT_ENVIRONMENT;
});

describe("CheckoutPage confirmed-attempt retries", () => {
  it("reuses the original intent and idempotency key when the confirmation response is lost", async () => {
    api.confirmCheckout
      .mockReset()
      .mockRejectedValueOnce(new Error("network response lost"))
      .mockResolvedValueOnce({
        checkout_intent_id: INTENT_A,
        order_group_id: ORDER_A,
        total: 10000,
      });
    await renderCheckout();

    await submit();
    await submit();

    expect(api.createCheckoutIntent).toHaveBeenCalledTimes(1);
    expect(api.confirmCheckout).toHaveBeenCalledTimes(2);
    expect(api.confirmCheckout.mock.calls[1][0]).toEqual(api.confirmCheckout.mock.calls[0][0]);
    expect(api.confirmCheckout.mock.calls[1][0]).toMatchObject({
      checkout_intent_id: INTENT_A,
      payment_method: "cinetpay",
    });
    expect(api.initPaymentCinetPay).toHaveBeenCalledTimes(1);
    expect(api.initPaymentCinetPay).toHaveBeenCalledWith({
      checkout_intent_id: INTENT_A,
      order_group_id: ORDER_A,
      amount: 10000,
      channel: "ALL",
    });
  });

  it("retries CinetPay with intent A and order A without recreating or reconfirming checkout", async () => {
    await renderCheckout();

    await submit();
    await submit();

    expect(api.createCheckoutIntent).toHaveBeenCalledTimes(1);
    expect(api.confirmCheckout).toHaveBeenCalledTimes(1);
    expect(api.initPaymentCinetPay).toHaveBeenCalledTimes(2);
    expect(api.initPaymentCinetPay.mock.calls.map(([request]) => request)).toEqual([
      {
        checkout_intent_id: INTENT_A,
        order_group_id: ORDER_A,
        amount: 10000,
        channel: "ALL",
      },
      {
        checkout_intent_id: INTENT_A,
        order_group_id: ORDER_A,
        amount: 10000,
        channel: "ALL",
      },
    ]);
    expect(container.querySelector("select").disabled).toBe(true);
    expect(container.textContent).toContain("step3.methodLocked");
    expect(container.textContent).toContain("errors.paymentUnavailable");
  });

  it("restores the confirmed attempt after refresh instead of creating another order", async () => {
    await renderCheckout();
    await submit();

    const firstConfirmationRequest = api.confirmCheckout.mock.calls[0][0];
    await act(async () => root.unmount());
    container.remove();
    root = null;
    container = null;

    await renderCheckout();
    expect(container.querySelector("select").value).toBe("cinetpay");
    expect(container.querySelector("select").disabled).toBe(true);

    await submit();

    expect(api.createCheckoutIntent).toHaveBeenCalledTimes(1);
    expect(api.confirmCheckout).toHaveBeenCalledTimes(1);
    expect(api.initPaymentCinetPay).toHaveBeenCalledTimes(2);
    expect(api.initPaymentCinetPay.mock.calls[1][0]).toEqual({
      checkout_intent_id: INTENT_A,
      order_group_id: ORDER_A,
      amount: 10000,
      channel: "ALL",
    });
    expect(firstConfirmationRequest).toMatchObject({
      checkout_intent_id: INTENT_A,
      payment_method: "cinetpay",
    });
  });

  it("rejects a payment-method change after confirmation", async () => {
    await renderCheckout();
    await submit();

    const paymentSelect = container.querySelector("select");
    expect(paymentSelect.disabled).toBe(true);
    await choosePaymentMethod("cod");

    expect(paymentSelect.value).toBe("cinetpay");
    expect(container.textContent).toContain("errors.paymentMethodLocked");

    await submit();
    expect(api.createCheckoutIntent).toHaveBeenCalledTimes(1);
    expect(api.confirmCheckout).toHaveBeenCalledTimes(1);
    expect(api.initPaymentCinetPay).toHaveBeenCalledTimes(2);
    expect(setCartItems).not.toHaveBeenCalled();
  });

  it("preserves a fresh cash-on-delivery checkout", async () => {
    await renderCheckout();
    await choosePaymentMethod("cod");

    await submit();

    expect(api.createCheckoutIntent).toHaveBeenCalledTimes(1);
    expect(api.confirmCheckout).toHaveBeenCalledWith(expect.objectContaining({
      checkout_intent_id: INTENT_A,
      payment_method: "cod",
    }));
    expect(api.initPaymentCinetPay).not.toHaveBeenCalled();
    expect(setCartItems).toHaveBeenCalledWith([]);
    expect(container.textContent).toContain("confirm.summary");
    expect(container.textContent).toContain(ORDER_A);
  });
});
