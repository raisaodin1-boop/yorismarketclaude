/**
 * Bandeau newsletter global et footer site — visibles uniquement sur les pages publiques utiles.
 */

/** Pages catalogue / découverte où le bandeau newsletter a du sens (pas de doublon avec une section dédiée). */
const GLOBAL_NEWSLETTER_PAGES = new Set([
  "produits",
  "merchHub",
  "seoCity",
  "bonsPlans",
  "livraison",
  "prestataires",
  "escrow",
  "devenirVendeur",
  "devenirLivreur",
  "importSupplier",
]);

/** Pages outil / transaction / espace membre — pas de footer marketing. */
const SITE_FOOTER_HIDDEN_PAGES = new Set([
  "admin",
  "dashboard",
  "checkout",
  "cart",
  "notifications",
]);

/** @param {string} page */
export function shouldShowGlobalNewsletter(page) {
  return GLOBAL_NEWSLETTER_PAGES.has(page);
}

/** @param {string} page */
export function shouldShowSiteFooter(page) {
  return !SITE_FOOTER_HIDDEN_PAGES.has(page);
}

const CATALOG_FOCUS_MERCH_HUBS = new Set(["made-in-cameroun", "sourcer-en-gros"]);

/** @param {string} page @param {string | undefined} merchHub */
export function shouldUseCatalogFocusHeader(page, merchHub) {
  if (page === "prestataires") return true;
  return page === "merchHub" && CATALOG_FOCUS_MERCH_HUBS.has(merchHub);
}
