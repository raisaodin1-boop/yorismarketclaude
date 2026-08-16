// @vitest-environment node
import { describe, it, expect } from "vitest";
import { transform } from "esbuild";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const catalogPath = join(here, "../../../supabase/functions/_shared/catalog_prices.ts");

async function loadCatalogPrices() {
  const src = await readFile(catalogPath, "utf8");
  const { code } = await transform(src, { loader: "ts", format: "esm" });
  return import(`data:text/javascript,${encodeURIComponent(code)}`);
}

function mockDb({ products = [], services = [] } = {}) {
  return {
    from(table) {
      const rows = table === "products" ? products : services;
      return {
        select() {
          return {
            async in(_col, ids) {
              const set = new Set((ids || []).map(String));
              return {
                data: rows.filter((r) => set.has(String(r.id))),
                error: null,
              };
            },
          };
        },
      };
    },
  };
}

const PRODUCT = {
  id: "prod-1",
  prix: 150000,
  actif: true,
  promo: false,
  promo_pct: 0,
};

const SERVICE = {
  id: "svc-1",
  prix: 8000,
  disponible: true,
  actif: true,
};

describe("applyCatalogPricing unknown cart kinds", () => {
  it("rejects a spoofed kind so the client cannot keep a 1 FCFA price", async () => {
    const { applyCatalogPricing } = await loadCatalogPrices();
    const { lines, error } = await applyCatalogPricing(
      mockDb({ products: [PRODUCT] }),
      [{ id: "prod-1", kind: "gift", qty: 1, price: 1, fulfillmentMode: "pickup" }],
    );
    expect(error).toBe("Invalid cart line type");
    expect(lines).toEqual([]);
  });

  it("rejects mixed carts that include one unknown kind", async () => {
    const { applyCatalogPricing } = await loadCatalogPrices();
    const { error } = await applyCatalogPricing(
      mockDb({ products: [PRODUCT] }),
      [
        { id: "prod-1", kind: "product", qty: 1, price: 1 },
        { id: "prod-1", kind: "addon", qty: 1, price: 1 },
      ],
    );
    expect(error).toBe("Invalid cart line type");
  });

  it("rejects capitalized Product kind (same underpay bypass)", async () => {
    const { applyCatalogPricing } = await loadCatalogPrices();
    const { error } = await applyCatalogPricing(
      mockDb({ products: [PRODUCT] }),
      [{ id: "prod-1", kind: "Product", qty: 1, price: 1 }],
    );
    expect(error).toBe("Invalid cart line type");
  });

  it("reprices a real product from the catalog, ignoring the client price", async () => {
    const { applyCatalogPricing } = await loadCatalogPrices();
    const { lines, error } = await applyCatalogPricing(
      mockDb({ products: [PRODUCT] }),
      [{ id: "prod-1", kind: "product", qty: 1, price: 1 }],
    );
    expect(error).toBeUndefined();
    expect(lines[0].price).toBe(150000);
    expect(lines[0].prix).toBe(150000);
  });

  it("treats a missing kind as product and still reprices from the catalog", async () => {
    const { applyCatalogPricing } = await loadCatalogPrices();
    const { lines, error } = await applyCatalogPricing(
      mockDb({ products: [PRODUCT] }),
      [{ id: "prod-1", qty: 1, price: 1 }],
    );
    expect(error).toBeUndefined();
    expect(lines[0].price).toBe(150000);
  });

  it("reprices a service from the catalog", async () => {
    const { applyCatalogPricing } = await loadCatalogPrices();
    const { lines, error } = await applyCatalogPricing(
      mockDb({ services: [SERVICE] }),
      [{ id: "svc-1", kind: "service", qty: 1, price: 1 }],
    );
    expect(error).toBeUndefined();
    expect(lines[0].price).toBe(8000);
  });
});
