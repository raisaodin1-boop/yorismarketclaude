/**
 * Made in Cameroun 🇨🇲 — logique hybride (vendeur + auto + admin).
 */

export const MIC_STATUS = {
  DECLARED: "declared",
  VERIFIED: "verified",
  AUTO: "auto",
  IMPORTED: "imported",
  REJECTED: "rejected",
};

const CAMEROON_CITIES = new Set([
  "douala",
  "yaoundé",
  "yaounde",
  "bafoussam",
  "bamenda",
  "garoua",
  "maroua",
  "ngaoundéré",
  "ngaoundere",
  "bertoua",
  "ebolowa",
  "kribi",
  "buea",
]);

const LOCAL_CATEGORY_HINTS = [
  "agricole",
  "agriculture",
  "artisan",
  "mode",
  "cosmét",
  "cosmet",
  "gastronom",
  "local",
  "cameroun",
  "made in",
];

/**
 * Détection automatique (niveau 2) — ne remplace pas un refus admin.
 * @param {Record<string, unknown>} product
 * @param {Record<string, unknown>|null} [seller]
 */
export function detectMadeInCameroonAuto(product, seller = null) {
  if (product?.made_in_cameroon_status === MIC_STATUS.REJECTED) return false;

  const origin = String(product?.country_of_origin || seller?.pays || "CM")
    .trim()
    .toLowerCase();
  if (origin && !["cm", "cameroun", "cameroon", "cmr"].includes(origin)) {
    return false;
  }

  const ville = String(product?.ville || seller?.ville || "").toLowerCase();
  if (ville && CAMEROON_CITIES.has(ville.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
    return true;
  }

  const cat = String(product?.categorie || "").toLowerCase();
  if (LOCAL_CATEGORY_HINTS.some((h) => cat.includes(h))) return true;

  if (product?.local_brand_name?.trim()) return true;

  return false;
}

/**
 * Résout l'affichage badge + statut effectif pour l'UI.
 * @param {Record<string, unknown>} product
 * @param {Record<string, unknown>|null} [seller]
 */
export function resolveMadeInCameroon(product, seller = null) {
  const status = String(product?.made_in_cameroon_status || MIC_STATUS.IMPORTED);
  const declared = Boolean(product?.is_made_in_cameroon);
  const legacyLocal = Boolean(product?.local);
  const autoHit = detectMadeInCameroonAuto(product, seller);

  let effectiveStatus = status;
  if (status === MIC_STATUS.REJECTED) {
    return { show: false, status: effectiveStatus, label: null, verified: false };
  }

  if (status === MIC_STATUS.VERIFIED) {
    return {
      show: true,
      status: MIC_STATUS.VERIFIED,
      label: "🇨🇲✔ Vérifié Made in Cameroun",
      verified: true,
    };
  }

  if (declared || legacyLocal) {
    return {
      show: true,
      status: declared ? MIC_STATUS.DECLARED : status,
      label: "🇨🇲 Made in Cameroun",
      verified: false,
    };
  }

  if (autoHit || status === MIC_STATUS.AUTO) {
    return {
      show: true,
      status: MIC_STATUS.AUTO,
      label: "🇨🇲 Made in Cameroun",
      verified: false,
    };
  }

  if (status === MIC_STATUS.IMPORTED) {
    return { show: false, status, label: "🌍 Importé", verified: false, imported: true };
  }

  return { show: false, status, label: null, verified: false };
}

/**
 * Champs à persister à l'enregistrement produit (vendeur).
 * @param {{ madeInChoice: 'yes'|'no'|'imported', localBrandName?: string, countryOfOrigin?: string }} input
 * @param {Record<string, unknown>} productDraft
 * @param {Record<string, unknown>|null} [seller]
 */
export function buildMadeInCameroonPayload(input, productDraft, seller = null) {
  const choice = input.madeInChoice || "no";
  if (choice === "imported") {
    return {
      is_made_in_cameroon: false,
      made_in_cameroon_status: MIC_STATUS.IMPORTED,
      country_of_origin: input.countryOfOrigin || "XX",
      local: false,
      local_brand_name: null,
    };
  }
  if (choice === "yes") {
    return {
      is_made_in_cameroon: true,
      made_in_cameroon_status: MIC_STATUS.DECLARED,
      country_of_origin: "CM",
      local: true,
      local_brand_name: input.localBrandName?.trim() || null,
    };
  }

  const auto = detectMadeInCameroonAuto(productDraft, seller);
  return {
    is_made_in_cameroon: auto,
    made_in_cameroon_status: auto ? MIC_STATUS.AUTO : MIC_STATUS.IMPORTED,
    country_of_origin: auto ? "CM" : input.countryOfOrigin || "CM",
    local: auto,
    local_brand_name: input.localBrandName?.trim() || null,
  };
}

/** Filtre client-side si colonnes SQL absentes (migration non appliquée). */
export function productMatchesMadeInFilter(p) {
  const r = resolveMadeInCameroon(p);
  return r.show;
}
