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

export const ORIGIN_COUNTRIES = [
  { code: "CM", labelFr: "Cameroun", labelEn: "Cameroon", flag: "🇨🇲" },
  { code: "CN", labelFr: "Chine", labelEn: "China", flag: "🇨🇳" },
  { code: "TR", labelFr: "Turquie", labelEn: "Turkey", flag: "🇹🇷" },
  { code: "AE", labelFr: "Émirats", labelEn: "UAE", flag: "🇦🇪" },
  { code: "IN", labelFr: "Inde", labelEn: "India", flag: "🇮🇳" },
  { code: "NG", labelFr: "Nigeria", labelEn: "Nigeria", flag: "🇳🇬" },
  { code: "XX", labelFr: "Autre", labelEn: "Other", flag: "🌍" },
];

export function originLabel(code, locale = "fr") {
  const c = ORIGIN_COUNTRIES.find((o) => o.code === String(code || "").toUpperCase());
  if (!c) return code || "—";
  return `${c.flag} ${locale === "en" ? c.labelEn : c.labelFr}`;
}

export function isImportProduct(product) {
  const origin = String(product?.country_of_origin || "CM").toUpperCase();
  return origin !== "CM" && origin !== "";
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

/** Prix unitaire gros selon quantité (paliers ou prix_gros / prix). */
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

export function productMatchesImportChinaFilter(p) {
  if (!productMatchesWholesaleFilter(p)) return false;
  const origin = String(p.country_of_origin || "").toUpperCase();
  return origin === "CN" || p.b2b_enabled;
}

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
