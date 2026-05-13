import { describe, it, expect } from "vitest";

describe("checkoutOrchestrator", () => {
  it("detectCheckoutType product_only / service_only / mixed", async () => {
    const { detectCheckoutType } = await import("../checkoutOrchestrator.js");
    expect(detectCheckoutType([])).toBe("product_only");
    expect(detectCheckoutType([{ id: 1, kind: "product" }])).toBe("product_only");
    expect(detectCheckoutType([{ id: 1, kind: "service" }])).toBe("service_only");
    expect(
      detectCheckoutType([
        { id: 1, kind: "product" },
        { id: 2, kind: "service" },
      ]),
    ).toBe("mixed");
  });

  it("buildCheckoutIntent maps items and customer", async () => {
    const { buildCheckoutIntent } = await import("../checkoutOrchestrator.js");
    const intent = buildCheckoutIntent({
      items: [{ id: "p1", kind: "product", qty: 2, prix: 500, fulfillmentMode: "delivery" }],
      user: { id: "uid", email: "a@b.cm" },
      userData: { nom: "Jean", telephone: "690", ville: "Dla", adresse: "Rue 1" },
      summary: { total: 1000 },
    });
    expect(intent.checkoutType).toBe("product_only");
    expect(intent.customer.email).toBe("a@b.cm");
    expect(intent.items[0].price).toBe(500);
    expect(intent.items[0].qty).toBe(2);
    expect(intent.summary).toEqual({ total: 1000 });
  });
});
