/**
 * Stock lifecycle — helpers UI partagés.
 *
 * Source de vérité : la colonne `stock` (entier) sur `products` et
 * `commerce_settings` (seuil bas, délai de grâce, etc.). Les colonnes dérivées
 * (`stock_status`, `out_of_stock_since`, `auto_removal_date`, `is_archived`,
 * `hidden_from_marketplace`) sont maintenues automatiquement par le trigger
 * Postgres `fn_products_sync_stock_lifecycle`, mais les helpers ci-dessous
 * acceptent aussi des produits "legacy" (sans ces colonnes) pour rester
 * compatibles avec un catalogue qui n'aurait pas encore reçu la migration.
 */

export const STOCK_STATUS = Object.freeze({
  IN_STOCK: "in_stock",
  LOW: "low",
  OUT_OF_STOCK: "out_of_stock",
  ARCHIVED: "archived",
});

const DEFAULTS = Object.freeze({
  lowThreshold: 5,
  graceDays: 30,
});

function settingsView(settings) {
  return {
    lowThreshold: clampInt(settings?.stock_low_threshold ?? settings?.lowThreshold, 0, 10000, DEFAULTS.lowThreshold),
    graceDays: clampInt(settings?.stock_out_grace_days ?? settings?.graceDays, 1, 365, DEFAULTS.graceDays),
  };
}

function clampInt(v, min, max, fallback) {
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.trunc(n)));
}

function isArchivedProduct(product) {
  if (!product) return false;
  if (product.is_archived === true) return true;
  if (product.stock_status === STOCK_STATUS.ARCHIVED) return true;
  if (product.hidden_from_marketplace === true) return true;
  return false;
}

/**
 * Retourne le statut "affichable" du produit.
 * @returns {'in_stock' | 'low' | 'out_of_stock' | 'archived'}
 */
export function computeStockStatus(product, settings) {
  if (isArchivedProduct(product)) return STOCK_STATUS.ARCHIVED;
  const { lowThreshold } = settingsView(settings);
  const stock = Number(product?.stock);
  if (!Number.isFinite(stock) || stock <= 0) return STOCK_STATUS.OUT_OF_STOCK;
  if (stock <= lowThreshold) return STOCK_STATUS.LOW;
  return STOCK_STATUS.IN_STOCK;
}

/** Le produit peut-il etre achete / ajoute au panier ? */
export function isPurchasable(product) {
  if (!product) return false;
  if (product.actif === false) return false;
  if (isArchivedProduct(product)) return false;
  const stock = Number(product?.stock);
  if (!Number.isFinite(stock) || stock <= 0) return false;
  return true;
}

/** Doit-il etre affiche sur la vitrine publique ? */
export function isVisibleOnMarketplace(product) {
  if (!product) return false;
  if (product.actif === false) return false;
  if (isArchivedProduct(product)) return false;
  return true;
}

/**
 * Jours restants avant suppression auto.
 * @returns {number|null} entier (peut etre 0 ou negatif si delai depasse)
 */
export function daysUntilAutoRemoval(product, settings, now = new Date()) {
  if (!product) return null;
  if (isArchivedProduct(product)) return 0;
  const stock = Number(product?.stock);
  if (Number.isFinite(stock) && stock > 0) return null;

  const { graceDays } = settingsView(settings);
  const since = parseDate(product?.out_of_stock_since);
  const deadline = parseDate(product?.auto_removal_date)
    ?? (since ? new Date(since.getTime() + graceDays * 86400000) : null);
  if (!deadline) return graceDays;
  const ms = deadline.getTime() - now.getTime();
  return Math.ceil(ms / 86400000);
}

/** Nb de jours en rupture (>= 0, null si pas en rupture). */
export function daysSinceOutOfStock(product, now = new Date()) {
  const since = parseDate(product?.out_of_stock_since);
  if (!since) return null;
  const ms = now.getTime() - since.getTime();
  if (ms < 0) return 0;
  return Math.floor(ms / 86400000);
}

/**
 * Label francais court pour les UI vendeur (cards, alerts).
 */
export function formatStockBadge(product, settings) {
  const status = computeStockStatus(product, settings);
  const stock = Number(product?.stock);
  switch (status) {
    case STOCK_STATUS.ARCHIVED:
      return { label: "🗄️ Archivé (rupture > 30j)", tone: "muted" };
    case STOCK_STATUS.OUT_OF_STOCK: {
      const left = daysUntilAutoRemoval(product, settings);
      if (left == null) return { label: "❌ Rupture de stock", tone: "danger" };
      if (left <= 0) return { label: "❌ Rupture — archivage imminent", tone: "danger" };
      return { label: `❌ Rupture — ${left}j avant retrait`, tone: "danger" };
    }
    case STOCK_STATUS.LOW:
      return { label: `⚠️ Stock faible (${Number.isFinite(stock) ? stock : 0})`, tone: "warning" };
    default:
      return { label: `✅ En stock (${Number.isFinite(stock) ? stock : 0})`, tone: "ok" };
  }
}

function parseDate(value) {
  if (!value) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}
