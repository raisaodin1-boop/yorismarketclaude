import { describe, it, expect } from "vitest";
import { draftProductListing, suggestProductPrice } from "../businessAi.js";

describe("businessAi", () => {
  it("drafts a product listing from hint", () => {
    const d = draftProductListing({
      hint: "iPhone 15 128Go",
      category: "Téléphones",
      ville: "Douala",
      peerProducts: [{ prix: 480000, categorie: "Téléphones", name_fr: "iPhone 14" }],
    });
    expect(d.name_fr).toContain("iPhone");
    expect(d.description_fr).toContain("MoMo");
    expect(Number(d.prix)).toBeGreaterThan(0);
  });

  it("suggests price from peers", () => {
    const s = suggestProductPrice(
      [{ prix: 100000, categorie: "Mode" }, { prix: 120000, categorie: "Mode" }],
      { category: "Mode" },
    );
    expect(s?.suggested).toBeGreaterThan(90000);
  });
});
