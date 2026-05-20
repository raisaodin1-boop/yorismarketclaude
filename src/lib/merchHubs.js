import { productMatchesMadeInFilter } from "./madeInCameroon.js";
import {
  computeTopNewProducts,
  computeTrendingProducts,
  filterProductsByNewSellers,
  filterProductsByTopSellers,
  getNewSellerIds,
  getTopSellerIds,
} from "./merchPlacement.js";

/**
 * Hubs merchandising premium — routes SEO + filtres catalogue.
 */

/** @typedef {'made-in-cameroun'|'top-produits'|'produits-tendance'|'promotions'|'livraison-express'|'top-vendeurs'|'nouveaux-vendeurs'|'marques-camerounaises'|'acheter-local-cameroun'|'produits-camerounais'} MerchHubSlug */

/** @type {Record<string, { slug: string, page: string, categorySlug?: string, titleFr: string, titleEn: string, descFr: string, descEn: string, keywordsFr: string, emoji: string, theme: string }>} */
export const MERCH_HUBS = {
  "made-in-cameroun": {
    slug: "made-in-cameroun",
    page: "merchHub",
    categorySlug: "made-in-cameroun",
    titleFr: "Made in Cameroun 🇨🇲 — Produits locaux vérifiés",
    titleEn: "Made in Cameroon 🇨🇲 — Verified local products",
    descFr:
      "Découvrez artisans, marques et producteurs camerounais sur Yorix.cm. Achetez local, soutenez l'économie nationale.",
    descEn: "Discover Cameroonian makers and brands on Yorix.cm. Shop local, support the national economy.",
    keywordsFr: "made in cameroun, produits camerounais, acheter local cameroun, marques camerounaises",
    emoji: "🇨🇲",
    theme: "cameroon-green",
    filter: "made_in_cameroon",
  },
  "produits-camerounais": {
    slug: "produits-camerounais",
    page: "merchHub",
    categorySlug: "made-in-cameroun",
    titleFr: "Produits camerounais — Marketplace locale Yorix",
    titleEn: "Cameroonian products — Yorix local marketplace",
    descFr: "Catalogue de produits fabriqués ou transformés au Cameroun.",
    descEn: "Catalog of products made or processed in Cameroon.",
    keywordsFr: "produits camerounais, marketplace cameroun",
    emoji: "🇨🇲",
    theme: "cameroon-green",
    filter: "made_in_cameroon",
  },
  "marques-camerounaises": {
    slug: "marques-camerounaises",
    page: "merchHub",
    categorySlug: "mic-marques",
    titleFr: "Marques camerounaises | Yorix.cm",
    titleEn: "Cameroonian brands | Yorix.cm",
    descFr: "Marques locales et créateurs nationaux.",
    descEn: "Local brands and national creators.",
    keywordsFr: "marques camerounaises, créateurs cameroun",
    emoji: "🏷️",
    theme: "cameroon-green",
    filter: "local_brand",
  },
  "top-produits": {
    slug: "top-produits",
    page: "merchHub",
    categorySlug: "top-produits",
    titleFr: "Top produits — Meilleures ventes Cameroun",
    titleEn: "Top products — Best sellers Cameroon",
    descFr: "Nouveautés des 30 derniers jours, classées par ventes et vues.",
    descEn: "New arrivals from the last 30 days, ranked by sales and views.",
    keywordsFr: "meilleurs produits cameroun, top ventes",
    emoji: "⭐",
    theme: "gold",
    filter: "top_products",
  },
  "produits-tendance": {
    slug: "produits-tendance",
    page: "merchHub",
    categorySlug: "produits-tendance",
    titleFr: "Tendances & produits du moment",
    titleEn: "Trending products now",
    descFr: "Ventes et vues récentes — sélection distincte des Top produits (sans doublon).",
    descEn: "Recent sales and views — separate from Top products (no duplicates).",
    keywordsFr: "tendances cameroun, produits du moment",
    emoji: "🔥",
    theme: "fire",
    filter: "trending",
  },
  promotions: {
    slug: "promotions",
    page: "merchHub",
    categorySlug: "promotions-hub",
    titleFr: "Promotions & bons plans Cameroun",
    titleEn: "Deals & promotions Cameroon",
    descFr: "Réductions, déstockage et offres flash.",
    descEn: "Discounts, clearance and flash deals.",
    keywordsFr: "promotions cameroun, bons plans, prix cassés",
    emoji: "💸",
    theme: "deal",
    filter: "promo",
  },
  "livraison-express": {
    slug: "livraison-express",
    page: "merchHub",
    categorySlug: "livraison-express-hub",
    titleFr: "Livraison express — Douala, Yaoundé",
    titleEn: "Express delivery — Douala, Yaoundé",
    descFr: "Produits éligibles à une livraison rapide zones prioritaires.",
    descEn: "Products eligible for fast delivery in priority zones.",
    keywordsFr: "livraison express cameroun, livraison douala yaoundé",
    emoji: "🚚",
    theme: "express",
    filter: "express_delivery",
  },
  "top-vendeurs": {
    slug: "top-vendeurs",
    page: "merchHub",
    categorySlug: "top-vendeurs",
    titleFr: "Top vendeurs & boutiques premium",
    titleEn: "Top sellers & premium stores",
    descFr: "Boutiques avec au moins 30 produits actifs sur Yorix.",
    descEn: "Stores with at least 30 active products on Yorix.",
    keywordsFr: "top vendeurs cameroun, boutique premium",
    emoji: "👑",
    theme: "crown",
    filter: "top_sellers",
  },
  "nouveaux-vendeurs": {
    slug: "nouveaux-vendeurs",
    page: "merchHub",
    categorySlug: "nouveaux-vendeurs",
    titleFr: "Nouveaux vendeurs sur Yorix",
    titleEn: "New sellers on Yorix",
    descFr: "Vendeurs inscrits depuis moins de 30 jours.",
    descEn: "Sellers who joined within the last 30 days.",
    keywordsFr: "nouveaux vendeurs cameroun",
    emoji: "🚀",
    theme: "rocket",
    filter: "new_sellers",
  },
  "acheter-local-cameroun": {
    slug: "acheter-local-cameroun",
    page: "merchHub",
    categorySlug: "achat-par-ville",
    titleFr: "Acheter local au Cameroun par ville",
    titleEn: "Shop local in Cameroon by city",
    descFr: "Yaoundé, Douala, Bafoussam, Bamenda et plus.",
    descEn: "Yaoundé, Douala, Bafoussam, Bamenda and more.",
    keywordsFr: "acheter local cameroun, marketplace locale",
    emoji: "📍",
    theme: "map",
    filter: "local_city",
  },
};

export const MERCH_HUB_SLUGS = Object.keys(MERCH_HUBS);

export const HOMEPAGE_MERCH_TILES = [
  { hub: "made-in-cameroun", accent: "#007a5e" },
  { hub: "top-produits", accent: "#b8860b" },
  { hub: "produits-tendance", accent: "#dc2626" },
  { hub: "promotions", accent: "#7c3aed" },
  { hub: "livraison-express", accent: "#0891b2" },
  { hub: "top-vendeurs", accent: "#1a4a9a" },
];

/** Navigation émotionnelle header */
export const EMOTIONAL_NAV = [
  { page: "produits", labelFr: "Produits", labelEn: "Products", icon: "🛍️" },
  { page: "prestataires", labelFr: "Services", labelEn: "Services", icon: "🛠️" },
  { hub: "made-in-cameroun", labelFr: "Made in Cameroun", labelEn: "Made in Cameroon", icon: "🇨🇲" },
  { hub: "top-produits", labelFr: "Top Produits", labelEn: "Top Products", icon: "⭐" },
  { hub: "promotions", labelFr: "Promotions", labelEn: "Deals", icon: "💸" },
  { page: "seoAlias", alias: "immobilier-cameroun", labelFr: "Immobilier", labelEn: "Real estate", icon: "🏠" },
  { page: "seoAlias", alias: "jobs", labelFr: "Emploi", labelEn: "Jobs", icon: "💼" },
];

/**
 * Applique le filtre merchandising côté client (post-fetch ou complément SQL).
 * @param {Record<string, unknown>[]} products
 * @param {string} filterKey
 * @param {{ citySlug?: string, sellerProfiles?: Record<string, unknown>[] }} [opts]
 */
export function filterProductsByMerchHub(products, filterKey, opts = {}) {
  const list = Array.isArray(products) ? products : [];
  const active = list.filter((p) => p.actif !== false && (!p.is_pack || p.pack_status === "approved"));

  switch (filterKey) {
    case "made_in_cameroon":
      return active.filter(productMatchesMadeInFilter);
    case "local_brand":
      return active.filter((p) => Boolean(p.local_brand_name?.trim?.()));
    case "top_products":
      return computeTopNewProducts(active, { limit: 64 });
    case "trending": {
      const topNew = computeTopNewProducts(active, { limit: 64 });
      const exclude = new Set(topNew.map((p) => p.id));
      return computeTrendingProducts(active, { limit: 48, excludeIds: exclude });
    }
    case "promo":
      return active.filter((p) => p.promo || p.flash || (p.promo_pct && p.promo_pct > 0));
    case "express_delivery":
      return active.filter((p) => {
        const v = String(p.ville || "").toLowerCase();
        return v.includes("douala") || v.includes("yaound");
      });
    case "top_sellers": {
      const ids = getTopSellerIds(active);
      return filterProductsByTopSellers(active, ids);
    }
    case "new_sellers": {
      const ids = getNewSellerIds(opts.sellerProfiles || []);
      return filterProductsByNewSellers(active, ids);
    }
    case "local_city": {
      const city = opts.citySlug;
      if (!city) return list;
      const nameMap = {
        yaounde: "yaound",
        douala: "douala",
        bafoussam: "bafoussam",
        bamenda: "bamenda",
        garoua: "garoua",
        kribi: "kribi",
      };
      const needle = nameMap[city] || city;
      return active.filter((p) => String(p.ville || "").toLowerCase().includes(needle));
    }
    default:
      return active;
  }
}

export function getMerchHub(slug) {
  return MERCH_HUBS[slug] || null;
}
