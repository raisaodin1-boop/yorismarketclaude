/** Quantité minimum de commande (défaut 1 pièce) — sans dépendances lourdes (safe prebuild Node). */
export function productMoq(product) {
  const n = Number(product?.min_qty_gros ?? product?.moq ?? product?.moq_min ?? 1);
  return Number.isFinite(n) && n >= 1 ? Math.round(n) : 1;
}

export function productMoqLabel(product, locale = "fr") {
  const moq = productMoq(product);
  if (locale === "en") return moq <= 1 ? "Min. 1 pc" : `Min. ${moq} pcs`;
  return moq <= 1 ? "Qté min. 1 pc" : `Qté min. ${moq} pcs`;
}
