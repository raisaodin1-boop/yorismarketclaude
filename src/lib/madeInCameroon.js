/**
 * Made in Cameroun 🇨🇲 — logique hybride (vendeur + admin).
 * Le badge UI ne s'affiche que sur déclaration explicite ou validation admin —
 * pas sur la seule ville CM ni le flag legacy `local`.
 */

export const MIC_STATUS = {
  DECLARED: "declared",
  VERIFIED: "verified",
  AUTO: "auto",
  IMPORTED: "imported",
  REJECTED: "rejected",
};

/** Statuts qui autorisent l'affichage du badge sur cartes / fiches */
const BADGE_VISIBLE_STATUSES = new Set([
  MIC_STATUS.DECLARED,
  MIC_STATUS.VERIFIED,
  MIC_STATUS.AUTO,
]);

/**
 * Suggestion vendeur uniquement (ne force pas le badge catalogue).
 * Volontairement strict : pas de badge auto pour « vendeur à Douala » seul.
 */
export function detectMadeInCameroonAuto(product) {
  if (product?.made_in_cameroon_status === MIC_STATUS.REJECTED) return false;
  if (product?.local_brand_name?.trim()) return true;

  const cat = String(product?.categorie || "").toLowerCase();
  const strongLocalCats = ["artisan", "agricole local", "made in", "fabriqué au cameroun", "produit local"];
  if (strongLocalCats.some((h) => cat.includes(h))) return true;

  return false;
}

/**
 * Affichage badge catalogue / recherche.
 * @param {Record<string, unknown>} product
 */
export function resolveMadeInCameroon(product) {
  const status = normalizeMicStatus(product?.made_in_cameroon_status);
  const explicit = Boolean(product?.is_made_in_cameroon);

  if (status === MIC_STATUS.REJECTED) {
    return { show: false, status, label: null, verified: false };
  }

  if (status === MIC_STATUS.VERIFIED) {
    return {
      show: true,
      status: MIC_STATUS.VERIFIED,
      label: "🇨🇲✔ Vérifié Made in Cameroun",
      verified: true,
    };
  }

  if (status === MIC_STATUS.DECLARED && explicit) {
    return {
      show: true,
      status: MIC_STATUS.DECLARED,
      label: "🇨🇲 Made in Cameroun",
      verified: false,
    };
  }

  // Auto uniquement si enregistré en base (ex. marque locale renseignée à la création)
  if (status === MIC_STATUS.AUTO && explicit) {
    return {
      show: true,
      status: MIC_STATUS.AUTO,
      label: "🇨🇲 Made in Cameroun",
      verified: false,
    };
  }

  return { show: false, status, label: null, verified: false };
}

function normalizeMicStatus(raw) {
  const s = String(raw || "").toLowerCase();
  if (BADGE_VISIBLE_STATUSES.has(s) || s === MIC_STATUS.REJECTED || s === MIC_STATUS.IMPORTED) {
    return s;
  }
  // Anciens produits sans colonne / valeur vide → pas de badge
  return MIC_STATUS.IMPORTED;
}

/**
 * Champs à persister à l'enregistrement produit (vendeur).
 */
export function buildMadeInCameroonPayload(input, productDraft) {
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

  // « Non » : jamais de badge auto côté catalogue ; on ne persiste que des colonnes réelles.
  // La suggestion éventuelle est calculée à la volée via `detectMadeInCameroonAuto`.
  return {
    is_made_in_cameroon: false,
    made_in_cameroon_status: MIC_STATUS.IMPORTED,
    country_of_origin: input.countryOfOrigin || "CM",
    local: false,
    local_brand_name: input.localBrandName?.trim() || null,
  };
}

/** Filtre hub Made in Cameroun — uniquement déclarés / vérifiés / auto explicites en base */
export function productMatchesMadeInFilter(p) {
  const status = normalizeMicStatus(p?.made_in_cameroon_status);
  if (status === MIC_STATUS.VERIFIED) return true;
  if (status === MIC_STATUS.DECLARED && p?.is_made_in_cameroon) return true;
  if (status === MIC_STATUS.AUTO && p?.is_made_in_cameroon) return true;
  return false;
}
