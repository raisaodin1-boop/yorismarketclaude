import { describe, it, expect } from "vitest";
import { parseAgentQuery, isAgentQuery, runYorixAgent } from "../yorixAgent.js";

const SAMPLE_PRODUCTS = [
  {
    id: "1",
    name_fr: "iPhone 15 128Go",
    description_fr: "Neuf sous garantie Apple",
    categorie: "Téléphones",
    ville: "Douala",
    prix: 480000,
    vendeur_id: "s1",
    vendeur_verifie: true,
    vente_total: 12,
    image: "https://res.cloudinary.com/demo/phone.jpg",
    escrow: true,
    actif: true,
  },
  {
    id: "2",
    name_fr: "iPhone 15 Pro",
    description_fr: "Occasion état neuf",
    categorie: "Téléphones",
    ville: "Yaoundé",
    prix: 650000,
    vendeur_id: "s2",
    vente_total: 3,
    image: "https://res.cloudinary.com/demo/phone2.jpg",
    actif: true,
  },
  {
    id: "3",
    name_fr: "Samsung Galaxy A55",
    description_fr: "Smartphone Android",
    categorie: "Téléphones",
    ville: "Douala",
    prix: 220000,
    vendeur_id: "s3",
    vente_total: 8,
    actif: true,
  },
];

describe("yorixAgent", () => {
  it("parse iPhone query with city and budget", () => {
    const p = parseAgentQuery("Je cherche un iPhone 15 à Douala, moins de 500 000 FCFA");
    expect(p.city).toBe("Douala");
    expect(p.maxPrice).toBe(500000);
    expect(p.productTerms.toLowerCase()).toContain("iphone");
  });

  it("detects agent-style queries", () => {
    expect(isAgentQuery("Je cherche un iPhone 15 à Douala, moins de 500 000 FCFA")).toBe(true);
    expect(isAgentQuery("iphone")).toBe(false);
  });

  it("ranks iPhone in Douala under budget", () => {
    const result = runYorixAgent(SAMPLE_PRODUCTS, "Je cherche un iPhone 15 à Douala, moins de 500 000 FCFA");
    expect(result.recommendations.length).toBeGreaterThan(0);
    expect(result.recommendations[0].product.id).toBe("1");
    expect(result.recommendations[0].protectPlus.score).toBeGreaterThan(50);
  });
});
