/**
 * Badges tier, disponibilité et ETA pour les cartes prestataires.
 */

/** @param {{ top?: boolean, premium?: boolean, note?: number, realisations?: number, verifie?: boolean }} p */
export function resolvePrestTier(p) {
  const missions = p.realisations || 0;
  const note = p.note || 0;
  if (p.premium && note >= 4.8 && missions >= 200) {
    return { label: "Super Pro", tone: "super" };
  }
  if (p.top && note >= 4.7 && missions >= 100) {
    return { label: "Expert Yorix", tone: "expert" };
  }
  if (p.premium || (note >= 4.6 && missions >= 50)) {
    return { label: "Elite", tone: "elite" };
  }
  if (p.verifie && note >= 4.5) {
    return { label: "Premium", tone: "premium" };
  }
  return null;
}

/** ETA style Uber — stable par id pour la démo. */
export function prestArrivalEta(p, locale = "fr") {
  const isEn = locale === "en";
  if (!p.dispo) return null;
  const seed = String(p.id || p.name || "")
    .split("")
    .reduce((a, c) => a + c.charCodeAt(0), 0);
  const minutes = 20 + (seed % 45);
  if (minutes <= 30) {
    return isEn ? `Arrives in ${minutes} min` : `Arrive dans ${minutes} min`;
  }
  return isEn ? `Arrives in ~${Math.round(minutes / 5) * 5} min` : `Arrive dans ~${Math.round(minutes / 5) * 5} min`;
}

export function isLiveAvailable(p) {
  return Boolean(p.dispo && (p.reponse_rapide || p.urgent_24h || p.top));
}

export function portfolioCount(p) {
  if (Array.isArray(p.portfolio_urls) && p.portfolio_urls.length > 0) {
    return p.portfolio_urls.length;
  }
  if (p.categorie === "Photographie" && (p.realisations || 0) > 0) {
    return Math.min(20, Math.max(6, Math.floor((p.realisations || 0) / 25)));
  }
  if (["Menuiserie", "Réparation", "Plomberie"].includes(p.categorie || "")) {
    return Math.min(12, Math.max(4, Math.floor((p.realisations || 0) / 40)));
  }
  return 0;
}
