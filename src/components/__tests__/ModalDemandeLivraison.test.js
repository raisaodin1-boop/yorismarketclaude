// @vitest-environment node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const modalSource = readFileSync(
  fileURLToPath(new URL("../ModalDemandeLivraison.jsx", import.meta.url)),
  "utf8",
);

describe("ModalDemandeLivraison delivery request mapping", () => {
  it("passes flat creerDemandeLivraison fields instead of a nested form blob", () => {
    expect(modalSource).toContain("creerDemandeLivraison({");
    expect(modalSource).toContain("clientNom: form.nom");
    expect(modalSource).toContain("clientTel: form.telephone");
    expect(modalSource).toContain("adresseCollecte: form.adresse_collecte");
    expect(modalSource).toContain("adresseLivraison: form.adresse_livraison");
    expect(modalSource).toContain("ville: form.ville");
    expect(modalSource).toContain("colisDescription: form.colis_description");
    expect(modalSource).toContain("montant: form.budget");
    expect(modalSource).not.toMatch(/creerDemandeLivraison\(\{[\s\S]*form:\s*\{/);
  });
});
