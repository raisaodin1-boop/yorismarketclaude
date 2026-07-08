/**
 * Model B — Import & wholesale (fournisseurs internationaux, MOQ, devis B2B).
 */

export const SUPPLIER_CHANNELS = {
  LOCAL: "local",
  IMPORT_CN: "import_cn",
  IMPORT_INTL: "import_intl",
};

export const INCOTERMS = [
  { code: "EXW", labelFr: "EXW — Départ usine", labelEn: "EXW — Ex works" },
  { code: "FOB", labelFr: "FOB — Free on board", labelEn: "FOB — Free on board" },
  { code: "CIF", labelFr: "CIF — Coût, assurance, fret", labelEn: "CIF — Cost, insurance & freight" },
  { code: "DDP", labelFr: "DDP — Rendu droits acquittés", labelEn: "DDP — Delivered duty paid" },
];

/** Cameroun — origine locale */
export const LOCAL_ORIGIN = {
  code: "CM",
  labelFr: "Cameroun",
  labelEn: "Cameroon",
  flag: "🇨🇲",
};

/** ~10 pays sourcing / import gros (hors Cameroun) */
export const WHOLESALE_IMPORT_COUNTRIES = [
  { code: "CN", labelFr: "Chine", labelEn: "China", flag: "🇨🇳" },
  { code: "IN", labelFr: "Inde", labelEn: "India", flag: "🇮🇳" },
  { code: "FR", labelFr: "France", labelEn: "France", flag: "🇫🇷" },
  { code: "TR", labelFr: "Turquie", labelEn: "Turkey", flag: "🇹🇷" },
  { code: "AE", labelFr: "Émirats arabes unis", labelEn: "UAE", flag: "🇦🇪" },
  { code: "NG", labelFr: "Nigeria", labelEn: "Nigeria", flag: "🇳🇬" },
  { code: "US", labelFr: "États-Unis", labelEn: "United States", flag: "🇺🇸" },
  { code: "BE", labelFr: "Belgique / UE", labelEn: "Belgium / EU", flag: "🇧🇪" },
  { code: "KR", labelFr: "Corée du Sud", labelEn: "South Korea", flag: "🇰🇷" },
  { code: "VN", labelFr: "Vietnam", labelEn: "Vietnam", flag: "🇻🇳" },
];

export const OTHER_COUNTRY = {
  code: "XX",
  labelFr: "Autre pays",
  labelEn: "Other country",
  flag: "🌍",
};

/** Options produit : local + import + autre */
export const ORIGIN_COUNTRIES = [
  LOCAL_ORIGIN,
  ...WHOLESALE_IMPORT_COUNTRIES,
  OTHER_COUNTRY,
];

/** RCCM / siège entreprise import */
export const IMPORT_BUSINESS_COUNTRIES = [
  ...WHOLESALE_IMPORT_COUNTRIES,
  OTHER_COUNTRY,
];

/** Entreprise locale CM + import */
export const BUSINESS_REGISTRATION_COUNTRIES = [
  LOCAL_ORIGIN,
  ...WHOLESALE_IMPORT_COUNTRIES,
  OTHER_COUNTRY,
];

export function isOtherCountryCode(code) {
  return String(code || "").toUpperCase() === "XX";
}

export function resolveCountryLabel(code, otherName, locale = "fr") {
  const c = [...ORIGIN_COUNTRIES, ...BUSINESS_REGISTRATION_COUNTRIES].find(
    (o) => o.code === String(code || "").toUpperCase(),
  );
  if (isOtherCountryCode(code)) {
    const custom = String(otherName || "").trim();
    if (custom) return `${OTHER_COUNTRY.flag} ${custom}`;
    return locale === "en" ? OTHER_COUNTRY.labelEn : OTHER_COUNTRY.labelFr;
  }
  if (!c) return String(code || otherName || "—");
  return `${c.flag} ${locale === "en" ? c.labelEn : c.labelFr}`;
}

/** @deprecated use resolveCountryLabel */
export function originLabel(code, locale = "fr", otherName) {
  return resolveCountryLabel(code, otherName, locale);
}

export function isImportProduct(product) {
  const origin = String(product?.country_of_origin || "CM").toUpperCase();
  return origin !== "CM" && origin !== "";
}

export function productOriginLabel(product, locale = "fr") {
  return resolveCountryLabel(
    product?.country_of_origin,
    product?.country_of_origin_other,
    locale,
  );
}

export function supplierChannelForCountryCode(code) {
  const c = String(code || "").toUpperCase();
  if (c === "CN") return SUPPLIER_CHANNELS.IMPORT_CN;
  if (c && c !== "CM" && c !== "XX") return SUPPLIER_CHANNELS.IMPORT_INTL;
  return SUPPLIER_CHANNELS.LOCAL;
}

export function parseWholesaleTiers(product) {
  const raw = product?.wholesale_tiers;
  if (!raw) return [];
  const arr = Array.isArray(raw) ? raw : [];
  return arr
    .map((t) => ({
      min_qty: Math.max(1, Number(t.min_qty) || 1),
      unit_price: Number(t.unit_price) || 0,
    }))
    .filter((t) => t.unit_price > 0)
    .sort((a, b) => a.min_qty - b.min_qty);
}

export function resolveWholesaleUnitPrice(product, quantity = 1) {
  const qty = Math.max(1, Number(quantity) || 1);
  const tiers = parseWholesaleTiers(product);
  if (tiers.length) {
    let price = tiers[0].unit_price;
    for (const t of tiers) {
      if (qty >= t.min_qty) price = t.unit_price;
    }
    return price;
  }
  if (product?.prix_gros != null && Number(product.prix_gros) > 0) {
    return Number(product.prix_gros);
  }
  return Number(product?.prix) || 0;
}

export function formatLeadTime(days, locale = "fr") {
  const d = Number(days);
  if (!d || d <= 0) return locale === "en" ? "On request" : "Sur devis";
  if (d <= 7) return locale === "en" ? `${d} days` : `${d} jours`;
  if (d <= 45) return locale === "en" ? `${d} days` : `${d} jours`;
  const weeks = Math.round(d / 7);
  return locale === "en" ? `~${weeks} weeks` : `~${weeks} sem.`;
}

export function productMatchesWholesaleFilter(p) {
  if (!p || p.actif === false) return false;
  if (p.b2b_enabled) return true;
  const moq = Number(p.min_qty_gros) || 1;
  if (moq > 1) return true;
  if (parseWholesaleTiers(p).length > 0) return true;
  if (isImportProduct(p)) return true;
  return false;
}

/** Hub import international (Chine, Inde, France, etc.) */
export function productMatchesInternationalImportFilter(p) {
  if (!productMatchesWholesaleFilter(p)) return false;
  if (isImportProduct(p)) return true;
  return Boolean(p.b2b_enabled);
}

/** @deprecated alias */
export const productMatchesImportChinaFilter = productMatchesInternationalImportFilter;

export const B2B_STATUS_LABELS = {
  fr: {
    pending: "En attente",
    quoted: "Devis envoyé",
    accepted: "Devis accepté",
    rejected: "Refusé",
    cancelled: "Annulé",
    paid: "Acompte payé",
    fulfilled: "Terminé",
  },
  en: {
    pending: "Pending",
    quoted: "Quote sent",
    accepted: "Quote accepted",
    rejected: "Rejected",
    cancelled: "Cancelled",
    paid: "Deposit paid",
    fulfilled: "Fulfilled",
  },
};

export function b2bStatusLabel(status, locale = "fr") {
  const map = B2B_STATUS_LABELS[locale === "en" ? "en" : "fr"];
  return map[status] || status || "—";
}
