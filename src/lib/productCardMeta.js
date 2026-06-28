import { computeProtectPlus } from "./protectPlus.js";
import { explainDeliveryEta } from "./logisticsAi.js";

/** Quantité minimum de commande (défaut 1 pièce). */
export function productMoq(product) {
  const n = Number(product?.moq ?? product?.moq_min ?? 1);
  return Number.isFinite(n) && n >= 1 ? Math.round(n) : 1;
}

export function productMoqLabel(product, locale = "fr") {
  const moq = productMoq(product);
  if (locale === "en") return moq <= 1 ? "1 pc min." : `MOQ ${moq} pcs`;
  return moq <= 1 ? "1 pc min." : `MOQ ${moq} pcs`;
}

/** Fenêtre livraison courte pour carte produit. */
export function productDeliveryShort(product, locale = "fr") {
  const city = String(product?.ville || "Douala").trim() || "Douala";
  const { eta } = explainDeliveryEta({
    originCity: city,
    destCity: city,
    orderAmount: Number(product?.prix) || 0,
  });
  return locale === "en" ? eta.labelEn : eta.labelFr;
}

export function productProtectScore(product) {
  return computeProtectPlus(product).score;
}

export function productProtectLevel(product) {
  return computeProtectPlus(product).level;
}
