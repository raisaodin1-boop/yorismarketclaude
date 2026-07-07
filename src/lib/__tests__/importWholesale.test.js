import { describe, expect, it } from "vitest";
import {
  isImportProduct,
  parseWholesaleTiers,
  productMatchesImportChinaFilter,
  productMatchesWholesaleFilter,
  resolveWholesaleUnitPrice,
} from "../importWholesale.js";

describe("importWholesale", () => {
  it("detects import products by origin", () => {
    expect(isImportProduct({ country_of_origin: "CN" })).toBe(true);
    expect(isImportProduct({ country_of_origin: "CM" })).toBe(false);
  });

  it("resolves tiered wholesale pricing", () => {
    const product = {
      wholesale_tiers: [
        { min_qty: 10, unit_price: 18000 },
        { min_qty: 50, unit_price: 16000 },
      ],
    };
    expect(resolveWholesaleUnitPrice(product, 10)).toBe(18000);
    expect(resolveWholesaleUnitPrice(product, 50)).toBe(16000);
    expect(parseWholesaleTiers(product)).toHaveLength(2);
  });

  it("filters wholesale catalog items", () => {
    expect(productMatchesWholesaleFilter({ actif: true, b2b_enabled: true })).toBe(true);
    expect(productMatchesWholesaleFilter({ actif: true, min_qty_gros: 5 })).toBe(true);
    expect(productMatchesWholesaleFilter({ actif: true, prix: 1000 })).toBe(false);
  });

  it("filters China import hub", () => {
    expect(
      productMatchesImportChinaFilter({ actif: true, b2b_enabled: true, country_of_origin: "CN" }),
    ).toBe(true);
    expect(
      productMatchesImportChinaFilter({ actif: true, b2b_enabled: false, country_of_origin: "CM" }),
    ).toBe(false);
  });
});
