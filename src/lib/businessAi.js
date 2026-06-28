import { normalizeSearchText } from "./productSearch";

/**
 * Suggère un prix à partir des produits similaires du vendeur ou du catalogue.
 */
export function suggestProductPrice(peerProducts, { category, nameHint } = {}) {
  const peers = (peerProducts || []).filter((p) => Number(p.prix) > 0);
  let pool = peers;

  if (category) {
    const cat = normalizeSearchText(category);
    const filtered = peers.filter((p) => normalizeSearchText(p.categorie).includes(cat));
    if (filtered.length >= 2) pool = filtered;
  }

  if (nameHint && pool.length < 3) {
    const terms = normalizeSearchText(nameHint).split(/\s+/).filter((t) => t.length > 2);
    const byName = peers.filter((p) => {
      const blob = normalizeSearchText(`${p.name_fr} ${p.categorie}`);
      return terms.some((t) => blob.includes(t));
    });
    if (byName.length >= 2) pool = byName;
  }

  if (!pool.length) return null;

  const prices = pool.map((p) => Number(p.prix)).sort((a, b) => a - b);
  const mid = Math.floor(prices.length / 2);
  const median = prices.length % 2 ? prices[mid] : Math.round((prices[mid - 1] + prices[mid]) / 2);
  const suggested = Math.round(median * 0.98);

  return {
    suggested,
    median,
    sampleSize: pool.length,
    rationaleFr: `Basé sur ${pool.length} produit(s) similaire(s) — médiane ${median.toLocaleString("fr-FR")} FCFA.`,
    rationaleEn: `Based on ${pool.length} similar product(s) — median ${median.toLocaleString("en-CM")} XAF.`,
  };
}

/**
 * Rédige une fiche produit (MVP templates — validation vendeur obligatoire).
 */
export function draftProductListing({
  hint = "",
  category = "",
  ville = "Douala",
  priceHint = "",
  peerProducts = [],
}) {
  const raw = String(hint || "").trim() || "Produit local de qualité";
  const title = raw.length > 60 ? `${raw.slice(0, 57)}…` : raw;
  const catLabel = category || "Articles";
  const city = ville || "Douala";

  const priceData = suggestProductPrice(peerProducts, { category: catLabel, nameHint: title });
  const prix = priceHint && !Number.isNaN(Number(priceHint))
    ? Number(priceHint)
    : priceData?.suggested || 25000;

  const description_fr = [
    `${title} — disponible sur Yorix.cm.`,
    "",
    `✓ État : neuf / conforme à la description`,
    `✓ Catégorie : ${catLabel}`,
    `✓ Zone : ${city} et livraison nationale selon options`,
    `✓ Paiement : MTN MoMo, Orange Money, escrow Yorix`,
    "",
    "Contactez le vendeur via Yorix pour toute question avant achat.",
  ].join("\n");

  const name_en = title
    .replace(/é/g, "e")
    .replace(/è/g, "e")
    .replace(/à/g, "a");

  return {
    name_fr: title,
    name_en,
    description_fr,
    prix: String(prix),
    ville: city,
    categorie: catLabel,
    priceSuggestion: priceData,
    tipsFr: [
      "Relisez le titre et la description avant publication.",
      "Ajoutez 2–8 photos via Cloudinary (1ère = photo principale).",
      "Activez l'escrow pour rassurer les acheteurs.",
    ],
    tipsEn: [
      "Review title and description before publishing.",
      "Add 2–8 photos via Cloudinary (first = main image).",
      "Enable escrow to build buyer trust.",
    ],
  };
}
