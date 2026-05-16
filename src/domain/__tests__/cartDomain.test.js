import { describe, it, expect, beforeEach } from "vitest";

const ls = {};
beforeEach(() => {
  Object.keys(ls).forEach((k) => delete ls[k]);
  globalThis.localStorage = {
    getItem: (k) => (k in ls ? ls[k] : null),
    setItem: (k, v) => {
      ls[k] = String(v);
    },
    removeItem: (k) => {
      delete ls[k];
    },
    clear: () => {
      Object.keys(ls).forEach((k) => delete ls[k]);
    },
  };
});

describe("cartDomain", () => {
  it("loadCart returns [] on empty storage", async () => {
    const { loadCart } = await import("../cartDomain.js");
    expect(loadCart()).toEqual([]);
  });

  it("saveCart + loadCart roundtrip", async () => {
    const { saveCart, loadCart, normalizeCartItem } = await import("../cartDomain.js");
    const items = [
      normalizeCartItem({
        id: "p1",
        kind: "product",
        name: "Test",
        prix: 1000,
        qty: 2,
      }),
    ].filter(Boolean);
    saveCart(items);
    const back = loadCart();
    expect(back).toHaveLength(1);
    expect(back[0].id).toBe("p1");
    expect(back[0].qty).toBe(2);
    expect(back[0].prix).toBe(1000);
  });

  it("upsertCartItem merges qty for same product id", async () => {
    const { upsertCartItem, normalizeCartItem } = await import("../cartDomain.js");
    const a = normalizeCartItem({ id: "x", kind: "product", prix: 5, qty: 1 });
    const b = normalizeCartItem({ id: "x", kind: "product", prix: 5, qty: 2 });
    const merged = upsertCartItem([a], b);
    expect(merged).toHaveLength(1);
    expect(merged[0].qty).toBe(3);
  });

  it("upsertCartItem does not stack qty for services", async () => {
    const { upsertCartItem, normalizeCartItem } = await import("../cartDomain.js");
    const a = normalizeCartItem({ id: "s1", kind: "service", prix: 100, qty: 1 });
    const b = normalizeCartItem({ id: "s1", kind: "service", prix: 100, qty: 1 });
    const merged = upsertCartItem([a], b);
    expect(merged[0].qty).toBe(1);
  });

  it("removeCartItem filters by id and kind", async () => {
    const { removeCartItem, normalizeCartItem } = await import("../cartDomain.js");
    const items = [
      normalizeCartItem({ id: 1, kind: "product", prix: 1, qty: 1 }),
      normalizeCartItem({ id: 1, kind: "service", prix: 2, qty: 1 }),
    ].filter(Boolean);
    const out = removeCartItem(items, 1, "product");
    expect(out).toHaveLength(1);
    expect(out[0].kind).toBe("service");
  });

  it("computeCartSummary returns totals for mixed cart", async () => {
    const { computeCartSummary, normalizeCartItem } = await import("../cartDomain.js");
    const items = [
      normalizeCartItem({
        id: "a",
        kind: "product",
        prix: 10000,
        qty: 2,
        fulfillmentMode: "delivery",
      }),
      normalizeCartItem({
        id: "b",
        kind: "service",
        prix: 5000,
        qty: 1,
        fulfillmentMode: "booking",
      }),
    ].filter(Boolean);
    const summary = computeCartSummary(items, {
      freeShippingThresholdXaf: 50_000,
      standardDeliveryFeeXaf: 1500,
    });
    expect(summary.subtotal).toBe(25000);
    expect(summary.servicesCount).toBe(1);
    expect(summary.productsCount).toBe(1);
    expect(summary.qty).toBe(3);
    expect(typeof summary.delivery).toBe("number");
    expect(summary.total).toBe(summary.subtotal + summary.delivery);
  });
});
