import { describe, expect, it } from "vitest";
import { isFreshProduct, freshTerroirBadge, madeInCardDetails } from "../madeInCardMeta.js";

describe("madeInCardMeta", () => {
  it("detects fresh seafood products", () => {
    expect(isFreshProduct({ name_fr: "Crabe frais de Kribi" })).toBe(true);
    expect(isFreshProduct({ name_fr: "Pagne wax", categorie: "Mode" })).toBe(false);
  });

  it("shows Direct Kribi badge for coastal fresh products", () => {
    const badge = freshTerroirBadge({ name_fr: "Poisson frais", ville: "Kribi" }, "fr");
    expect(badge?.label).toContain("Direct Kribi");
    expect(badge?.tone).toBe("sea");
  });

  it("shows pêché frais for inland fresh products", () => {
    const badge = freshTerroirBadge({ name_fr: "Crevettes", ville: "Yaoundé" }, "fr");
    expect(badge?.label).toContain("Pêché frais");
    expect(badge?.tone).toBe("fresh");
  });

  it("shows artisan badge for craft products", () => {
    const badge = freshTerroirBadge({ name_fr: "Pagne wax artisanal", ville: "Douala" }, "fr");
    expect(badge?.label).toContain("Artisan local");
    expect(badge?.tone).toBe("craft");
  });

  it("builds detail lines for expanded card info", () => {
    const lines = madeInCardDetails(
      { vendeur_nom: "Mama Fish", description_fr: "Poisson du jour, livré frais." },
      "fr",
    );
    expect(lines[0]).toContain("Mama Fish");
    expect(lines[1]).toContain("Poisson du jour");
  });
});
