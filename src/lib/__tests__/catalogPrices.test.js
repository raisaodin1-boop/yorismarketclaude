// @vitest-environment node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  applyCatalogPricing,
  isInvalidCatalogPrice,
} from "../../../supabase/functions/_shared/catalog_prices.ts";

function catalogClient({ products = [], services = [] } = {}) {
  return {
    from(table) {
      const rows = table === "products" ? products : services;
      return {
        select() {
          return {
            async in(_col, ids) {
              return {
                data: rows.filter((row) => ids.includes(row.id)),
                error: null,
              };
            },
          };
        },
      };
    },
  };
}

describe("isInvalidCatalogPrice", () => {
  it("allows zero and positive finite prices", () => {
    expect(isInvalidCatalogPrice(0)).toBe(false);
    expect(isInvalidCatalogPrice(1500)).toBe(false);
  });

  it("rejects negatives and non-finite values", () => {
    expect(isInvalidCatalogPrice(-1)).toBe(true);
    expect(isInvalidCatalogPrice(-50000)).toBe(true);
    expect(isInvalidCatalogPrice(Number.NaN)).toBe(true);
    expect(isInvalidCatalogPrice(Number.POSITIVE_INFINITY)).toBe(true);
  });
});

describe("applyCatalogPricing", () => {
  it("overwrites client prices from the catalog", async () => {
    const supabase = catalogClient({
      products: [{ id: "real", prix: 60000, actif: true }],
    });
    const { lines, error } = await applyCatalogPricing(supabase, [
      { id: "real", kind: "product", price: 1, qty: 1 },
    ]);
    expect(error).toBeUndefined();
    expect(lines[0].price).toBe(60000);
    expect(lines[0].prix).toBe(60000);
  });

  it("rejects a mixed cart that uses a negative decoy product to underpay", async () => {
    const supabase = catalogClient({
      products: [
        { id: "phone", prix: 60000, actif: true },
        { id: "decoy", prix: -50000, actif: true },
      ],
    });
    const { lines, error } = await applyCatalogPricing(supabase, [
      { id: "phone", kind: "product", qty: 1 },
      { id: "decoy", kind: "product", qty: 1 },
    ]);
    expect(error).toBe("Prix invalide");
    expect(lines).toEqual([]);
  });

  it("rejects a service listed at a negative price", async () => {
    const supabase = catalogClient({
      services: [{ id: "svc", prix: -8000, disponible: true, actif: true }],
    });
    const { error } = await applyCatalogPricing(supabase, [
      { id: "svc", kind: "service", qty: 1 },
    ]);
    expect(error).toBe("Prix invalide");
  });

  it("allows a 100% promo (effective price 0)", async () => {
    const supabase = catalogClient({
      products: [{ id: "gift", prix: 10000, actif: true, promo: true, promo_pct: 100 }],
    });
    const { lines, error } = await applyCatalogPricing(supabase, [
      { id: "gift", kind: "product", qty: 1 },
    ]);
    expect(error).toBeUndefined();
    expect(lines[0].price).toBe(0);
  });

  it("rejects leftover negative client prices on non-catalog kinds", async () => {
    const supabase = catalogClient();
    const { error } = await applyCatalogPricing(supabase, [
      { id: "x", kind: "gift", price: -40000, qty: 1 },
    ]);
    expect(error).toBe("Prix invalide");
  });
});

describe("lock_non_negative_catalog_prices migration", () => {
  it("adds NOT VALID non-negative CHECKs on products and services", () => {
    const sql = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "../../../supabase/migrations/20260831120000_lock_non_negative_catalog_prices.sql"),
      "utf8",
    );
    expect(sql).toContain("products_prix_non_negative");
    expect(sql).toContain("services_prix_non_negative");
    expect(sql).toContain("CHECK (prix IS NULL OR prix >= 0) NOT VALID");
  });
});
