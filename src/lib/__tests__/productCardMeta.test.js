import { describe, it, expect } from "vitest";
import { productMoq, productMoqLabel } from "../productMoq.js";
import { productProtectScore } from "../productCardMeta.js";

describe("productCardMeta", () => {
  it("defaults MOQ to 1", () => {
    expect(productMoq({})).toBe(1);
    expect(productMoqLabel({}, "fr")).toBe("1 pc min.");
  });

  it("reads custom MOQ", () => {
    expect(productMoq({ moq: 10 })).toBe(10);
    expect(productMoqLabel({ moq: 10 }, "fr")).toBe("MOQ 10 pcs");
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
