/**
 * Règles de placement merchandising (hubs auto) + anti-doublon tendances / top produits.
 */

export const MERCH_NEW_PRODUCT_DAYS = 30;
export const MERCH_NEW_SELLER_DAYS = 30;
export const MERCH_TOP_SELLER_MIN_PRODUCTS = 30;
export const MERCH_TRENDING_WINDOW_DAYS = 14;

const MS_DAY = 86400000;

/** Hubs calculés par la plateforme — non choisis par le vendeur */
export const AUTO_MERCH_CATEGORY_SLUGS = new Set([
  "top-produits",
  "produits-tendance",
  "top-vendeurs",
  "nouveaux-vendeurs",
  "achat-par-ville",
  "promotions-hub",
  "livraison-express-hub",
  "made-in-cameroun",
  "produits-camerounais",
  "marques-camerounaises",
]);

export function isSellerSelectableCategory(node) {
  if (!node) return false;
  if (AUTO_MERCH_CATEGORY_SLUGS.has(node.slug)) return false;
  if (node.is_top_products) return false;
  if (node.slug === "produits-tendance") return false;
  return true;
}

function isActiveCatalogProduct(p) {
  if (!p || p.actif === false) return false;
  if (p.is_pack && p.pack_status !== "approved") return false;
  return true;
}

function daysAgo(n) {
  return Date.now() - n * MS_DAY;
}

function createdWithin(p, days) {
  const t = p?.created_at ? new Date(p.created_at).getTime() : 0;
  return t >= daysAgo(days);
}

function trendingScore(p) {
  const ventes = Number(p.vente_total) || 0;
  const vues = Number(p.vues) || 0;
  const note = Number(p.note) || 0;
  const recent = createdWithin(p, MERCH_TRENDING_WINDOW_DAYS) ? 12 : 0;
  const promo = p.promo || p.flash || (Number(p.promo_pct) || 0) > 0 ? 8 : 0;
  return ventes * 120 + vues * 2 + note * 15 + recent + promo;
}

function topNewScore(p) {
  const ventes = Number(p.vente_total) || 0;
  const vues = Number(p.vues) || 0;
  const t = p?.created_at ? new Date(p.created_at).getTime() : 0;
  return ventes * 100 + vues + t / 1e6;
}

function countProductsBySeller(products) {
  const map = new Map();
  for (const p of products) {
    if (!isActiveCatalogProduct(p) || !p.vendeur_id) continue;
    map.set(p.vendeur_id, (map.get(p.vendeur_id) || 0) + 1);
  }
  return map;
}

/**
 * @param {Record<string, unknown>[]} products
 * @param {{ limit?: number, excludeIds?: Set<string> }} [opts]
 */
export function computeTrendingProducts(products, opts = {}) {
  const limit = opts.limit ?? 48;
  const exclude = opts.excludeIds || new Set();
  return [...(products || [])]
    .filter((p) => isActiveCatalogProduct(p) && !exclude.has(p.id))
    .sort((a, b) => trendingScore(b) - trendingScore(a))
    .slice(0, limit);
}

/**
 * Nouveautés 30j + tri ventes/vues.
 */
export function computeTopNewProducts(products, opts = {}) {
  const limit = opts.limit ?? 64;
  const exclude = opts.excludeIds || new Set();
  return [...(products || [])]
    .filter((p) => isActiveCatalogProduct(p) && createdWithin(p, MERCH_NEW_PRODUCT_DAYS) && !exclude.has(p.id))
    .sort((a, b) => topNewScore(b) - topNewScore(a))
    .slice(0, limit);
}

/**
 * Bloc homepage « Tendances » — même logique que le hub /produits-tendance (sans doublon Top produits).
 */
export function computeHomepageTrendingProducts(products, limit = 8) {
  const active = (products || []).filter(isActiveCatalogProduct);
  const topNew = computeTopNewProducts(active, { limit: 64 });
  const exclude = new Set(topNew.map((p) => p.id));
  return computeTrendingProducts(active, { limit, excludeIds: exclude });
}

export function getTopSellerIds(products, minProducts = MERCH_TOP_SELLER_MIN_PRODUCTS) {
  const counts = countProductsBySeller(products);
  const ids = [];
  for (const [id, c] of counts) {
    if (c >= minProducts) ids.push(id);
  }
  return ids;
}

/**
 * @param {Record<string, unknown>[]} sellerProfiles — { id, created_at, role }
 */
export function getNewSellerIds(sellerProfiles, days = MERCH_NEW_SELLER_DAYS) {
  const cutoff = daysAgo(days);
  return (sellerProfiles || [])
    .filter((p) => {
      const role = p.role || "";
      if (role !== "seller" && role !== "vendeur") return false;
      const t = p.created_at ? new Date(p.created_at).getTime() : 0;
      return t >= cutoff;
    })
    .map((p) => p.id);
}

export function filterProductsByTopSellers(products, sellerIds) {
  const set = new Set(sellerIds || []);
  if (!set.size) return [];
  return (products || []).filter((p) => isActiveCatalogProduct(p) && set.has(p.vendeur_id));
}

export function filterProductsByNewSellers(products, sellerIds) {
  const set = new Set(sellerIds || []);
  if (!set.size) return [];
  return (products || []).filter((p) => isActiveCatalogProduct(p) && set.has(p.vendeur_id));
}
