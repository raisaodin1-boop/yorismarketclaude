import { describe, it, expect } from "vitest";
import { productMoq, productMoqLabel } from "../productMoq.js";
import { productProtectScore } from "../productCardMeta.js";

describe("productCardMeta", () => {
  it("defaults MOQ to 1", () => {
    expect(productMoq({})).toBe(1);
    expect(productMoqLabel({}, "fr")).toBe("Qté min. 1 pc");
  });

  it("reads custom MOQ from min_qty_gros or moq", () => {
    expect(productMoq({ moq: 10 })).toBe(10);
    expect(productMoq({ min_qty_gros: 25 })).toBe(25);
    expect(productMoqLabel({ moq: 10 }, "fr")).toBe("Qté min. 10 pcs");
  });

  it("computes protect score", () => {
    const score = productProtectScore({
      vendeur_verifie: true,
      vendeur_id: "x",
      image: "https://x.com/a.jpg",
      description_fr: "Description longue pour test protect plus score",
      escrow: true,
    });
    expect(score).toBeGreaterThan(60);
  });
});
