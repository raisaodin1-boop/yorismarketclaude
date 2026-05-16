/**
 * Prix catalogue avec promos temporisées (promo, promo_pct, promo_*_at).
 */

export function isPromoActive(product, now = new Date()) {
  if (!product) return false;
  const pct = Number(product.promo_pct || 0);
  if (!product.promo && pct <= 0) return false;

  const t = now instanceof Date ? now.getTime() : new Date(now).getTime();
  if (product.promo_starts_at) {
    const start = new Date(product.promo_starts_at).getTime();
    if (t < start) return false;
  }
  if (product.promo_ends_at) {
    const end = new Date(product.promo_ends_at).getTime();
    if (t > end) return false;
  }
  return product.promo === true || pct > 0;
}

export function effectiveProductPrice(product, now = new Date()) {
  const base = Number(product?.prix ?? product?.price ?? 0);
  if (!isPromoActive(product, now)) return Math.round(base);
  const pct = Math.min(100, Math.max(0, Number(product.promo_pct || 0)));
  if (pct <= 0) return Math.round(base);
  return Math.round(base * (1 - pct / 100));
}

export function productPromoListPrice(product, now = new Date()) {
  if (!isPromoActive(product, now)) return null;
  const base = Number(product?.prix ?? 0);
  const sale = effectiveProductPrice(product, now);
  return sale < base ? base : null;
}
