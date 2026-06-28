import { normalizeSearchText, productMatchesSearch } from "./productSearch";
import { computeProtectPlus } from "./protectPlus";

const CITY_ALIASES = [
  { match: ["douala"], label: "Douala" },
  { match: ["yaounde", "yaoundé", "yde"], label: "Yaoundé" },
  { match: ["bafoussam"], label: "Bafoussam" },
  { match: ["bamenda"], label: "Bamenda" },
  { match: ["garoua"], label: "Garoua" },
  { match: ["kribi"], label: "Kribi" },
  { match: ["ngaoundere", "ngaoundéré"], label: "Ngaoundéré" },
  { match: ["maroua"], label: "Maroua" },
  { match: ["ebolowa"], label: "Ebolowa" },
  { match: ["buea"], label: "Buea" },
  { match: ["bertoua"], label: "Bertoua" },
];

const AGENT_TRIGGERS =
  /\b(cherche|recherche|veux|besoin|trouve|trouver|moins de|max|maximum|budget|à douala|a douala|yaound)/i;

const PRICE_PATTERNS = [
  /moins\s+de\s+([\d\s.,]+)\s*(?:f|fcfa|francs?)?/i,
  /max(?:imum)?\s+([\d\s.,]+)\s*(?:f|fcfa|francs?)?/i,
  /budget\s+(?:de\s+)?([\d\s.,]+)/i,
  /([\d\s.,]+)\s*(?:f|fcfa|francs?)\s*(?:max|maximum)?/i,
  /([\d]+)\s*k\s*(?:f|fcfa)?/i,
];

function parsePriceToken(raw) {
  if (!raw) return null;
  const s = String(raw).toLowerCase().replace(/\s/g, "").replace(",", ".");
  const kMatch = s.match(/^(\d+(?:\.\d+)?)k$/);
  if (kMatch) return Math.round(Number(kMatch[1]) * 1000);
  const n = Number(s.replace(/[^\d.]/g, ""));
  return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
}

/** Extrait ville, budget et mots-clés produit d'une requête en langage naturel. */
export function parseAgentQuery(query) {
  const raw = String(query || "").trim();
  const normalized = normalizeSearchText(raw);
  let city = null;
  let maxPrice = null;

  for (const { match, label } of CITY_ALIASES) {
    if (match.some((m) => normalized.includes(normalizeSearchText(m)))) {
      city = label;
      break;
    }
  }

  for (const pattern of PRICE_PATTERNS) {
    const m = raw.match(pattern);
    if (m?.[1]) {
      const p = parsePriceToken(m[1]);
      if (p) {
        maxPrice = p;
        break;
      }
    }
  }

  let productTerms = raw
    .replace(/je\s+(cherche|veux|recherche)/gi, "")
    .replace(/moins\s+de\s+[\d\s.,k]+(?:\s*(?:f|fcfa|francs?))?/gi, "")
    .replace(/max(?:imum)?\s+[\d\s.,k]+(?:\s*(?:f|fcfa|francs?))?/gi, "")
    .replace(/budget\s+(?:de\s+)?[\d\s.,k]+/gi, "")
    .replace(/\b(à|a|en|dans)\s+(douala|yaoundé|yaounde|bafoussam|bamenda|garoua|kribi)\b/gi, "")
    .replace(/[,;.!?]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  productTerms = productTerms.replace(/^(un|une|des|le|la|les)\s+/i, "").trim();

  return {
    raw,
    productTerms: productTerms || raw,
    city,
    maxPrice,
    intent: "buy_product",
  };
}

/** Détecte une requête « agent » (langage naturel) vs recherche simple. */
export function isAgentQuery(query) {
  const q = String(query || "").trim();
  if (q.length < 12) return false;
  if (AGENT_TRIGGERS.test(q)) return true;
  if (/\d{3,}/.test(q) && /f|fcfa|franc/i.test(q)) return true;
  if (CITY_ALIASES.some((c) => c.match.some((m) => normalizeSearchText(q).includes(normalizeSearchText(m))))) {
    return q.split(/\s+/).length >= 4;
  }
  return false;
}

function cityMatch(product, city) {
  if (!city) return true;
  const v = normalizeSearchText(product?.ville || "");
  const needle = normalizeSearchText(city).slice(0, 5);
  return v.includes(needle);
}

function priceMatch(product, maxPrice) {
  if (!maxPrice) return true;
  const prix = Number(product?.prix) || 0;
  return prix > 0 && prix <= maxPrice;
}

function deliveryEstimate(product, targetCity) {
  const v = normalizeSearchText(product?.ville || "");
  if (!targetCity) return { labelFr: "2–5 jours", labelEn: "2–5 days", score: 0.5 };
  const target = normalizeSearchText(targetCity).slice(0, 5);
  if (v.includes(target)) {
    return { labelFr: "24–48 h", labelEn: "24–48 h", score: 1 };
  }
  if (/douala|yaound/.test(v) && /douala|yaound/.test(target)) {
    return { labelFr: "1–3 jours", labelEn: "1–3 days", score: 0.75 };
  }
  return { labelFr: "3–6 jours", labelEn: "3–6 days", score: 0.35 };
}

function canNegotiate(product) {
  return Boolean(product?.vendeur_id) && product?.actif !== false;
}

function medianPrice(products) {
  const prices = products.map((p) => Number(p.prix)).filter((n) => n > 0).sort((a, b) => a - b);
  if (!prices.length) return null;
  const mid = Math.floor(prices.length / 2);
  return prices.length % 2 ? prices[mid] : (prices[mid - 1] + prices[mid]) / 2;
}

/**
 * MVP Yorix Agent : filtre + classe les produits, enrichit Protect+.
 */
export function runYorixAgent(products, query, opts = {}) {
  const locale = opts.locale === "en" ? "en" : "fr";
  const limit = opts.limit ?? 3;
  const parsed = parseAgentQuery(query);
  const list = Array.isArray(products) ? products.filter((p) => p.actif !== false) : [];

  let candidates = list.filter((p) => productMatchesSearch(p, parsed.productTerms));
  if (candidates.length < 2) {
    candidates = list.filter((p) => {
      const terms = parsed.productTerms.split(/\s+/).filter((t) => t.length > 2);
      const blob = normalizeSearchText(`${p.name_fr} ${p.description_fr} ${p.categorie}`);
      return terms.some((t) => blob.includes(normalizeSearchText(t)));
    });
  }

  candidates = candidates.filter((p) => cityMatch(p, parsed.city) && priceMatch(p, parsed.maxPrice));

  const catMedian = medianPrice(candidates.length ? candidates : list);
  const enriched = candidates.map((product) => {
    const protectPlus = computeProtectPlus(product, { categoryMedianPrice: catMedian });
    const delivery = deliveryEstimate(product, parsed.city);
    const sales = Number(product.vente_total) || 0;
    const price = Number(product.prix) || 0;
    const trustScore = protectPlus.score / 100;
    const priceScore = parsed.maxPrice && price > 0 ? 1 - price / parsed.maxPrice : price > 0 ? 0.5 : 0;
    const composite = trustScore * 0.45 + delivery.score * 0.25 + priceScore * 0.2 + Math.min(sales / 50, 1) * 0.1;

    return {
      product,
      protectPlus,
      delivery,
      negotiable: canNegotiate(product),
      composite,
      sales,
      price,
    };
  });

  enriched.sort((a, b) => b.composite - a.composite);

  const recommendations = enriched.slice(0, limit);
  const bestPrice = [...enriched].sort((a, b) => a.price - b.price)[0];
  const bestTrust = [...enriched].sort((a, b) => b.protectPlus.score - a.protectPlus.score)[0];
  const bestDelivery = [...enriched].sort((a, b) => b.delivery.score - a.delivery.score)[0];

  const summaryFr = buildSummaryFr(parsed, recommendations.length, enriched.length);
  const summaryEn = buildSummaryEn(parsed, recommendations.length, enriched.length);

  return {
    parsed,
    recommendations,
    summary: locale === "en" ? summaryEn : summaryFr,
    summaryFr,
    summaryEn,
    highlights: {
      bestPrice: bestPrice?.product?.id,
      bestTrust: bestTrust?.product?.id,
      bestDelivery: bestDelivery?.product?.id,
    },
    totalMatches: enriched.length,
  };
}

function buildSummaryFr(parsed, shown, total) {
  const parts = [];
  if (parsed.productTerms) parts.push(`« ${parsed.productTerms} »`);
  if (parsed.city) parts.push(`à ${parsed.city}`);
  if (parsed.maxPrice) parts.push(`≤ ${parsed.maxPrice.toLocaleString("fr-FR")} FCFA`);
  if (!shown) {
    return `Aucun résultat pour ${parts.join(" ")}. Essayez d'élargir le budget ou une autre ville.`;
  }
  return `${shown} recommandation${shown > 1 ? "s" : ""} sur ${total} correspondance${total > 1 ? "s" : ""} ${parts.length ? `pour ${parts.join(" ")}` : ""}.`;
}

function buildSummaryEn(parsed, shown, total) {
  const parts = [];
  if (parsed.productTerms) parts.push(`"${parsed.productTerms}"`);
  if (parsed.city) parts.push(`in ${parsed.city}`);
  if (parsed.maxPrice) parts.push(`≤ ${parsed.maxPrice.toLocaleString("en-CM")} XAF`);
  if (!shown) {
    return `No matches for ${parts.join(" ")}. Try a higher budget or another city.`;
  }
  return `${shown} pick${shown > 1 ? "s" : ""} from ${total} match${total !== 1 ? "es" : ""} ${parts.length ? `for ${parts.join(" ")}` : ""}.`;
}

export function agentBadgeLabels(locale = "fr") {
  const en = locale === "en";
  return {
    bestPrice: en ? "Best price" : "Meilleur prix",
    bestTrust: en ? "Most reliable" : "Vendeur fiable",
    bestDelivery: en ? "Fastest delivery" : "Livraison rapide",
    negotiable: en ? "Negotiable" : "Négociable",
    protect: "Protect+",
  };
}
