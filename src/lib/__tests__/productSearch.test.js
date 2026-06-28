import { describe, it, expect } from "vitest";
import {
  normalizeSearchText,
  productMatchesSearch,
  filterProductsBySearch,
} from "../productSearch";

const sample = {
  name_fr: "Téléphone Élégant",
  description_fr: "Smartphone Android",
  categorie: "Électronique",
};

describe("productSearch", () => {
  it("normalise accents et casse", () => {
    expect(normalizeSearchText("Élégant")).toBe("elegant");
  });

  it("productMatchesSearch ignore une requête vide", () => {
    expect(productMatchesSearch(sample, "")).toBe(true);
    expect(productMatchesSearch(sample, "   ")).toBe(true);
  });

  it("productMatchesSearch trouve par nom ou catégorie", () => {
    expect(productMatchesSearch(sample, "elegant")).toBe(true);
    expect(productMatchesSearch(sample, "electronique")).toBe(true);
    expect(productMatchesSearch(sample, "iphone")).toBe(false);
  });

  it("filterProductsBySearch exige au moins 2 caractères", () => {
    expect(filterProductsBySearch([sample], "t", 8)).toEqual([]);
    expect(filterProductsBySearch([sample], "te", 8)).toHaveLength(1);
  });
});
