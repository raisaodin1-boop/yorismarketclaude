/**
 * Badges terroir / fraîcheur pour le hub Made in Cameroun.
 */

const FRESH_NAME = /crabe|crevette|poisson|vivaneau|bar\b|sardine|thon|calamar|pêch|peche|huître|huitre|fruits de mer|langouste|moules|frais/i;
const FRESH_CAT = /aliment|poisson|mer|frais|boucherie|pêche|peche/i;
const COASTAL = /kribi|limbe|douala|edéa|edea/i;

export function isFreshProduct(product) {
  const name = String(product?.name_fr || "").toLowerCase();
  const cat = String(product?.categorie || "").toLowerCase();
  return FRESH_NAME.test(name) || FRESH_CAT.test(cat);
}

/** Badge appétissant pour produits frais / côte. */
export function freshTerroirBadge(product, locale = "fr") {
  const isEn = locale === "en";
  const ville = String(product?.ville || "").toLowerCase();
  if (COASTAL.test(ville) && isFreshProduct(product)) {
    if (ville.includes("kribi")) {
      return { label: isEn ? "🦐 Direct Kribi" : "🦐 Direct Kribi", tone: "sea" };
    }
    return { label: isEn ? "🐟 Fresh from the coast" : "🐟 Frais de la côte", tone: "sea" };
  }
  if (isFreshProduct(product)) {
    return { label: isEn ? "🔥 Fresh today" : "🔥 Pêché frais", tone: "fresh" };
  }
  if (/artisan|pagne|wax|karit|miel|café|cafe|cacao|sculpt|poterie/i.test(String(product?.name_fr || ""))) {
    return { label: isEn ? "✋ Local artisan" : "✋ Artisan local", tone: "craft" };
  }
  return null;
}

export function madeInCardDetails(product, locale = "fr") {
  const isEn = locale === "en";
  const lines = [];
  if (product?.vendeur_nom) {
    lines.push(isEn ? `Seller: ${product.vendeur_nom}` : `Vendeur : ${product.vendeur_nom}`);
  }
  if (product?.description_fr) {
    lines.push(product.description_fr.slice(0, 120) + (product.description_fr.length > 120 ? "…" : ""));
  }
  return lines;
}
