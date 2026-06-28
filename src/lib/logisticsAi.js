import { suggererCommissionLivreur } from "../utils/deliveryWorkflow.js";

const METRO = ["douala", "yaound"];

function normCity(city) {
  return String(city || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .trim();
}

function isMetro(city) {
  const n = normCity(city);
  return METRO.some((m) => n.includes(m));
}

function estimateDistanceKm(origin, dest) {
  const o = normCity(origin);
  const d = normCity(dest);
  if (!o || !d) return 4;
  if (o === d || o.includes(d) || d.includes(o)) return 3.5;
  if (isMetro(o) && isMetro(d)) return 280;
  if (isMetro(o) || isMetro(d)) return 120;
  return 45;
}

function etaWindow(distanceKm, sameCity) {
  if (sameCity) return { minMin: 25, maxMin: 90, labelFr: "25 min – 1 h 30", labelEn: "25 min – 1 h 30" };
  if (distanceKm > 200) return { minMin: 24 * 60, maxMin: 48 * 60, labelFr: "J+1 à J+2", labelEn: "D+1 to D+2" };
  if (distanceKm > 80) return { minMin: 180, maxMin: 360, labelFr: "3 h – 6 h", labelEn: "3 h – 6 h" };
  return { minMin: 60, maxMin: 150, labelFr: "1 h – 2 h 30", labelEn: "1 h – 2 h 30" };
}

function costRange(distanceKm, sameCity, orderAmount = 0) {
  if (sameCity) {
    const base = suggererCommissionLivreur({ montant: orderAmount, distanceKm });
    return { min: Math.max(500, base - 200), max: base + 400 };
  }
  if (distanceKm > 200) return { min: 3000, max: 8000 };
  if (distanceKm > 80) return { min: 1500, max: 3500 };
  return { min: 800, max: 2000 };
}

/**
 * Explique un ETA livraison (géo + historique simulé + coureurs dispo).
 */
export function explainDeliveryEta({
  originCity = "Douala",
  destCity = "Douala",
  orderAmount = 0,
  couriersNearby = 3,
  avgCourierRating = 4.8,
} = {}) {
  const distanceKm = estimateDistanceKm(originCity, destCity);
  const sameCity = normCity(originCity) === normCity(destCity) ||
    normCity(originCity).includes(normCity(destCity).slice(0, 5));

  const eta = etaWindow(distanceKm, sameCity);
  const costs = costRange(distanceKm, sameCity, orderAmount);

  const factors = [];
  if (sameCity) {
    factors.push({
      key: "intra_city",
      labelFr: `Livraison intra-ville ${destCity}`,
      labelEn: `Intra-city delivery ${destCity}`,
      impact: "positive",
    });
  } else {
    factors.push({
      key: "inter_city",
      labelFr: `Trajet ${originCity} → ${destCity} (~${Math.round(distanceKm)} km)`,
      labelEn: `Route ${originCity} → ${destCity} (~${Math.round(distanceKm)} km)`,
      impact: "neutral",
    });
  }

  if (couriersNearby >= 3) {
    factors.push({
      key: "couriers",
      labelFr: `${couriersNearby} livreurs disponibles à proximité`,
      labelEn: `${couriersNearby} couriers available nearby`,
      impact: "positive",
    });
  } else if (couriersNearby > 0) {
    factors.push({
      key: "couriers_low",
      labelFr: `Peu de livreurs dispo (${couriersNearby}) — délai possible`,
      labelEn: `Few couriers (${couriersNearby}) — possible delay`,
      impact: "warning",
    });
  } else {
    factors.push({
      key: "no_courier",
      labelFr: "Aucun livreur immédiat — assignation sous 30–60 min",
      labelEn: "No instant courier — assignment in 30–60 min",
      impact: "warning",
    });
  }

  factors.push({
    key: "history",
    labelFr: "Historique Yorix Ride : zones métro livrées en priorité",
    labelEn: "Yorix Ride history: metro zones prioritized",
    impact: "neutral",
  });

  if (avgCourierRating >= 4.7) {
    factors.push({
      key: "rating",
      labelFr: `Note moyenne livreurs zone : ${avgCourierRating}/5`,
      labelEn: `Average courier rating: ${avgCourierRating}/5`,
      impact: "positive",
    });
  }

  const summaryFr = sameCity
    ? `Livraison estimée à ${destCity} : ${eta.labelFr}. Coût indicatif ${costs.min.toLocaleString("fr-FR")}–${costs.max.toLocaleString("fr-FR")} FCFA.`
    : `Livraison ${originCity} → ${destCity} : ${eta.labelFr}. Coût indicatif ${costs.min.toLocaleString("fr-FR")}–${costs.max.toLocaleString("fr-FR")} FCFA.`;

  const summaryEn = sameCity
    ? `Estimated delivery in ${destCity}: ${eta.labelEn}. Indicative cost ${costs.min.toLocaleString("en-CM")}–${costs.max.toLocaleString("en-CM")} XAF.`
    : `Delivery ${originCity} → ${destCity}: ${eta.labelEn}. Indicative cost ${costs.min.toLocaleString("en-CM")}–${costs.max.toLocaleString("en-CM")} XAF.`;

  return {
    originCity,
    destCity,
    distanceKm: Math.round(distanceKm * 10) / 10,
    eta,
    costs,
    factors,
    summaryFr,
    summaryEn,
    couriersNearby,
  };
}
