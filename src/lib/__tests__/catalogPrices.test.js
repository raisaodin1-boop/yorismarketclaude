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

const VARIANT_PRODUCT = {
  id: "prod-1",
  prix: 50000,
  actif: true,
  promo: false,
  promo_pct: 0,
  has_variants: true,
  variants: [
    { id: "v-small", label: "64 Go", prix: 20000, stock: 4 },
    { id: "v-large", label: "256 Go", prix: 150000, stock: 1 },
  ],
  vendeur_id: "seller-real",
  vendeur_nom: "Boutique A",
  ville: "Douala",
};

describe("applyCatalogPricing variants + seller identity", () => {
  it("charges the selected variant price instead of products.prix", async () => {
    const { applyCatalogPricing } = await loadCatalogPrices();
    const { lines, error } = await applyCatalogPricing(
      mockDb({ products: [VARIANT_PRODUCT] }),
      [{ id: "prod-1", kind: "product", qty: 1, price: 20000, variant_id: "v-large", vendeur_id: "attacker" }],
    );
    expect(error).toBeUndefined();
    expect(lines[0].price).toBe(150000);
    expect(lines[0].prix).toBe(150000);
    expect(lines[0].variant_id).toBe("v-large");
    expect(lines[0].variant_label).toBe("256 Go");
  });

  it("overwrites client vendeur_id with the catalog seller", async () => {
    const { applyCatalogPricing } = await loadCatalogPrices();
    const { lines, error } = await applyCatalogPricing(
      mockDb({ products: [VARIANT_PRODUCT] }),
      [{ id: "prod-1", kind: "product", qty: 1, vendeur_id: "attacker" }],
    );
    expect(error).toBeUndefined();
    expect(lines[0].vendeur_id).toBe("seller-real");
    expect(lines[0].price).toBe(50000);
  });

  it("rejects an unknown variant id", async () => {
    const { applyCatalogPricing } = await loadCatalogPrices();
    const { error } = await applyCatalogPricing(
      mockDb({ products: [VARIANT_PRODUCT] }),
      [{ id: "prod-1", kind: "product", qty: 1, variant_id: "nope" }],
    );
    expect(error).toBe("Variante introuvable");
  });

  it("applies product promo to the variant price", async () => {
    const { applyCatalogPricing } = await loadCatalogPrices();
    const { lines, error } = await applyCatalogPricing(
      mockDb({
        products: [{ ...VARIANT_PRODUCT, promo: true, promo_pct: 10 }],
      }),
      [{ id: "prod-1", kind: "product", qty: 1, variant_id: "v-small" }],
    );
    expect(error).toBeUndefined();
    expect(lines[0].price).toBe(18000);
  });
});
