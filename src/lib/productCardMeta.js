import { computeProtectPlus } from "./protectPlus.js";
import { explainDeliveryEta } from "./logisticsAi.js";
import { productMoq, productMoqLabel } from "./productMoq.js";

export { productMoq, productMoqLabel };

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
