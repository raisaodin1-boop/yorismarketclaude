import { describe, it, expect } from "vitest";
import { computeProtectPlus } from "../protectPlus.js";

describe("protectPlus", () => {
  it("scores verified seller with photos highly", () => {
    const score = computeProtectPlus({
      vendeur_id: "x",
      vendeur_verifie: true,
      image: "https://example.com/p.jpg",
      description_fr: "Description complète du produit avec détails utiles pour l'acheteur.",
      prix: 100000,
      vente_total: 20,
      escrow: true,
      actif: true,
    });
    expect(score.score).toBeGreaterThanOrEqual(85);
    expect(score.level).toBe("excellent");
  });

  it("penalizes missing seller and photos", () => {
    const score = computeProtectPlus({
      prix: 50000,
      description_fr: "x",
      actif: true,
    });
    expect(score.score).toBeLessThan(50);
    expect(score.level).toBe("low");
  });
});
