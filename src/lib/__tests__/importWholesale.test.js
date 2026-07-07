import { describe, expect, it } from "vitest";
import {
  isImportProduct,
  parseWholesaleTiers,
  productMatchesInternationalImportFilter,
  productMatchesWholesaleFilter,
  resolveCountryLabel,
  resolveWholesaleUnitPrice,
  WHOLESALE_IMPORT_COUNTRIES,
} from "../importWholesale.js";

describe("importWholesale", () => {
  it("lists 10 wholesale import countries plus other", () => {
    expect(WHOLESALE_IMPORT_COUNTRIES).toHaveLength(10);
    expect(WHOLESALE_IMPORT_COUNTRIES.some((c) => c.code === "FR")).toBe(true);
    expect(WHOLESALE_IMPORT_COUNTRIES.some((c) => c.code === "IN")).toBe(true);
  });

  it("resolves other country with custom label", () => {
    expect(resolveCountryLabel("XX", "Sénégal", "fr")).toContain("Sénégal");
    expect(resolveCountryLabel("FR", null, "fr")).toContain("France");
  });

  it("detects import products by origin", () => {
    expect(isImportProduct({ country_of_origin: "IN" })).toBe(true);
    expect(isImportProduct({ country_of_origin: "CM" })).toBe(false);
  });

  it("resolves tiered wholesale pricing", () => {
    const product = {
      wholesale_tiers: [
        { min_qty: 10, unit_price: 18000 },
        { min_qty: 50, unit_price: 16000 },
      ],
    };
    expect(resolveWholesaleUnitPrice(product, 50)).toBe(16000);
    expect(parseWholesaleTiers(product)).toHaveLength(2);
  });

  it("filters international import hub", () => {
    expect(
      productMatchesInternationalImportFilter({ actif: true, b2b_enabled: true, country_of_origin: "FR" }),
    ).toBe(true);
    expect(
      productMatchesInternationalImportFilter({ actif: true, b2b_enabled: false, country_of_origin: "CM" }),
    ).toBe(false);
  });

  it("filters wholesale catalog items", () => {
    expect(productMatchesWholesaleFilter({ actif: true, b2b_enabled: true })).toBe(true);
  });
});
