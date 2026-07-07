import { productMatchesMadeInFilter } from "./madeInCameroon.js";
import {
  productMatchesImportChinaFilter,
  productMatchesWholesaleFilter,
} from "./importWholesale.js";
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
  "sourcer-en-gros": {
    slug: "sourcer-en-gros",
    page: "merchHub",
    categorySlug: "sourcing-gros",
    titleFr: "Sourcer en gros — Fournisseurs & MOQ Cameroun",
    titleEn: "Wholesale sourcing — Suppliers & MOQ Cameroon",
    descFr:
      "Achat groupé, fournisseurs vérifiés et quantités minimum (MOQ) pour professionnels, boutiques et distributeurs.",
    descEn:
      "Bulk buying, verified suppliers and minimum order quantities (MOQ) for pros, shops and distributors.",
    keywordsFr: "gros cameroun, sourcing fournisseur, moq marketplace, achat groupé",
    emoji: "📦",
    theme: "wholesale",
    filter: "wholesale",
  },
  "import-chine": {
    slug: "import-chine",
    page: "merchHub",
    categorySlug: "import-chine",
    titleFr: "Import Chine → Cameroun — Gros & devis B2B",
    titleEn: "China import → Cameroon — Wholesale & B2B quotes",
    descFr:
      "Produits importés depuis la Chine : MOQ, délais FOB/CIF, demandes de devis et escrow Yorix pour professionnels.",
    descEn:
      "Products imported from China: MOQ, FOB/CIF lead times, quote requests and Yorix escrow for professionals.",
    keywordsFr: "import chine cameroun, fournisseur chinois, gros import, sourcing chine",
    emoji: "🇨🇳",
    theme: "import-cn",
    filter: "import_china",
  },
};

export const MERCH_HUB_SLUGS = Object.keys(MERCH_HUBS);

export const HOMEPAGE_MERCH_TILES = [
  { hub: "made-in-cameroun", accent: "#007a5e" },
  { hub: "sourcer-en-gros", accent: "#f59e0b" },
  { hub: "top-produits", accent: "#b8860b" },
  { hub: "produits-tendance", accent: "#dc2626" },
  { hub: "promotions", accent: "#7c3aed" },
  { hub: "livraison-express", accent: "#0891b2" },
  { hub: "top-vendeurs", accent: "#1a4a9a" },
];

/** Alias SEO avec contenu hub dédié (immobilier, emploi). */
export const SEO_HUB_ALIAS_KEYS = new Set([
  "immobilier-cameroun",
  "properties-cameroon",
  "emploi-cameroun",
  "jobs-cameroon",
]);

/** Navigation émotionnelle header */
export const EMOTIONAL_NAV = [
  { page: "produits", labelFr: "Produits", labelEn: "Products", iconKey: "shoppingBag" },
  { hub: "sourcer-en-gros", labelFr: "Sourcer en gros", labelEn: "Wholesale", iconKey: "package" },
  { page: "prestataires", labelFr: "Services", labelEn: "Services", iconKey: "wrench" },
  { hub: "made-in-cameroun", labelFr: "Made in Cameroun", labelEn: "Made in Cameroon", iconKey: "flag" },
  { hub: "top-produits", labelFr: "Top Produits", labelEn: "Top Products", iconKey: "star" },
  { hub: "promotions", labelFr: "Promotions", labelEn: "Deals", iconKey: "gift" },
  { page: "seoAlias", alias: "immobilier-cameroun", labelFr: "Immobilier", labelEn: "Real estate", iconKey: "building" },
  { page: "seoAlias", alias: "emploi-cameroun", labelFr: "Emploi", labelEn: "Jobs", iconKey: "briefcase" },
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
    case "made_in_cameroon": {
      const strict = active.filter(productMatchesMadeInFilter);
      if (strict.length >= 4) return strict;
      const cmCities = ["douala", "yaound", "bafoussam", "bamenda", "garoua", "kribi", "ngaound", "maroua"];
      return active
        .filter((p) => {
          const v = String(p.ville || "").toLowerCase();
          if (cmCities.some((c) => v.includes(c))) return true;
          if (p.local_brand_name?.trim?.()) return true;
          if (p.is_made_in_cameroon) return true;
          const cat = String(p.categorie || "").toLowerCase();
          return /artisan|local|agricole|cameroun|fabriqu|made in/.test(cat);
        })
        .slice(0, 64);
    }
    case "local_brand": {
      const branded = active.filter((p) => Boolean(p.local_brand_name?.trim?.()));
      if (branded.length >= 4) return branded;
      return active.filter((p) => Boolean(p.vendeur_nom?.trim?.())).slice(0, 48);
    }
    case "top_products": {
      const topNew = computeTopNewProducts(active, { limit: 64 });
      if (topNew.length >= 4) return topNew;
      return [...active]
        .sort((a, b) => (Number(b.vente_total) || 0) - (Number(a.vente_total) || 0))
        .slice(0, 64);
    }
    case "trending": {
      const topNew = computeTopNewProducts(active, { limit: 64 });
      const exclude = new Set(topNew.map((p) => p.id));
      const trending = computeTrendingProducts(active, { limit: 48, excludeIds: exclude });
      if (trending.length >= 4) return trending;
      return computeTrendingProducts(active, { limit: 48 });
    }
    case "promo": {
      const promos = active.filter((p) => p.promo || p.flash || (Number(p.promo_pct) || 0) > 0);
      if (promos.length >= 4) return promos;
      return [...active]
        .sort((a, b) => (Number(b.vente_total) || 0) - (Number(a.vente_total) || 0))
        .slice(0, 48);
    }
    case "express_delivery": {
      const express = active.filter((p) => {
        const v = String(p.ville || "").toLowerCase();
        return v.includes("douala") || v.includes("yaound");
      });
      if (express.length >= 4) return express;
      return active.filter((p) => String(p.ville || "").trim()).slice(0, 48);
    }
    case "top_sellers": {
      const ids = getTopSellerIds(active);
      let list = filterProductsByTopSellers(active, ids);
      if (list.length >= 4) return list;
      const relaxed = getTopSellerIds(active, 5);
      list = filterProductsByTopSellers(active, relaxed);
      if (list.length >= 4) return list;
      return [...active]
        .sort((a, b) => (Number(b.vente_total) || 0) - (Number(a.vente_total) || 0))
        .slice(0, 48);
    }
    case "new_sellers": {
      const ids = getNewSellerIds(opts.sellerProfiles || []);
      let list = filterProductsByNewSellers(active, ids);
      if (list.length >= 4) return list;
      return [...active]
        .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
        .slice(0, 48);
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
    case "wholesale": {
      const wholesale = active.filter(productMatchesWholesaleFilter);
      if (wholesale.length >= 4) {
        return [...wholesale].sort(
          (a, b) => (Number(b.min_qty_gros) || 0) - (Number(a.min_qty_gros) || 0),
        );
      }
      return [...active]
        .filter((p) => p.b2b_enabled || Number(p.min_qty_gros) > 1)
        .slice(0, 64);
    }
    case "import_china": {
      const imported = active.filter(productMatchesImportChinaFilter);
      if (imported.length >= 2) return imported;
      return active.filter((p) => p.b2b_enabled).slice(0, 48);
    }
    default:
      return active;
  }
}

export function getMerchHub(slug) {
  return MERCH_HUBS[slug] || null;
}
