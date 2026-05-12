/**
 * Politique livraison standard / livraison gratuite seuil — source unique côté SPA.
 * Règle : frais standards sur articles **physiques à livrer** si leur sous-total < seuil.
 * Prestations et retraits pickup exclus du sous-total “éligible”.
 */

/** @typedef {{ freeShippingThresholdXaf?: number; standardDeliveryFeeXaf?: number }} DeliveryPolicyInput */

function normCartLikeItem(item) {
  if (!item || item.id == null) return null;
  const kind = item.kind || "product";
  const qty = Math.max(1, Number(item.qty || 1));
  const prix = Number(item.prix ?? item.price ?? 0);
  const fulfillmentMode =
    item.fulfillmentMode || (kind === "service" ? "booking" : "delivery");
  return { ...item, kind, qty, prix, fulfillmentMode };
}

export function getDefaultPolicyFromEnv() {
  const threshold = Number(import.meta.env.VITE_FREE_SHIPPING_THRESHOLD_XAF);
  const fee = Number(import.meta.env.VITE_STANDARD_DELIVERY_FEE_XAF);
  return {
    freeShippingThresholdXaf: Number.isFinite(threshold) && threshold >= 0 ? threshold : 50_000,
    standardDeliveryFeeXaf: Number.isFinite(fee) && fee >= 0 ? fee : 1500,
  };
}

/** @param {DeliveryPolicyInput} patch */
export function normalizeDeliveryPolicy(patch) {
  const d = getDefaultPolicyFromEnv();
  const threshold = patch?.freeShippingThresholdXaf;
  const fee = patch?.standardDeliveryFeeXaf;
  return {
    freeShippingThresholdXaf:
      threshold != null && Number.isFinite(Number(threshold)) && Number(threshold) >= 0
        ? Number(threshold)
        : d.freeShippingThresholdXaf,
    standardDeliveryFeeXaf:
      fee != null && Number.isFinite(Number(fee)) && Number(fee) >= 0 ? Number(fee) : d.standardDeliveryFeeXaf,
  };
}

/**
 * Produits à expédier (hors pickup / hors services).
 */
export function shippableProductsSubtotalFromItems(items) {
  const safe = (items || []).map(normCartLikeItem).filter(Boolean);
  return safe
    .filter((i) => i.kind === "product" && i.fulfillmentMode !== "pickup")
    .reduce((sum, i) => sum + i.prix * i.qty, 0);
}

/**
 * Détail panier + livraison pour affichage & checkout.
 * @param {unknown[]} items
 * @param {DeliveryPolicyInput | number} [policyOrLegacyFee] — ancien usage : nombre = frais standard uniquement
 */
export function computeCartDeliverySummary(items, policyOrLegacyFee) {
  let policy = getDefaultPolicyFromEnv();
  if (typeof policyOrLegacyFee === "number" && Number.isFinite(policyOrLegacyFee)) {
    policy = { ...policy, standardDeliveryFeeXaf: policyOrLegacyFee };
  } else if (policyOrLegacyFee && typeof policyOrLegacyFee === "object") {
    policy = normalizeDeliveryPolicy(policyOrLegacyFee);
  }

  const safe = (items || []).map(normCartLikeItem).filter(Boolean);
  const products = safe.filter((i) => i.kind === "product");
  const services = safe.filter((i) => i.kind === "service");
  const productsSubtotal = products.reduce((s, i) => s + i.prix * i.qty, 0);
  const servicesSubtotal = services.reduce((s, i) => s + i.prix * i.qty, 0);
  const subtotal = productsSubtotal + servicesSubtotal;
  const qty = safe.reduce((s, i) => s + i.qty, 0);

  const shipSub = shippableProductsSubtotalFromItems(safe);
  const hasShippableProducts = shipSub > 0;
  const threshold = policy.freeShippingThresholdXaf;
  const fee = policy.standardDeliveryFeeXaf;

  const freeShippingUnlocked = hasShippableProducts && shipSub >= threshold;
  const delivery =
    hasShippableProducts && !freeShippingUnlocked ? Math.round(fee) : 0;

  const amountRemainingForFreeShipping = freeShippingUnlocked || !hasShippableProducts
    ? 0
    : Math.max(0, Math.round(threshold - shipSub));

  const freeShippingProgress01 =
    !hasShippableProducts || threshold <= 0
      ? null
      : Math.min(1, shipSub / threshold);

  return {
    qty,
    productsCount: products.length,
    servicesCount: services.length,
    productsSubtotal,
    servicesSubtotal,
    shippableProductsSubtotal: shipSub,
    subtotal,
    delivery,
    total: subtotal + delivery,
    policyThreshold: threshold,
    policyStandardFee: fee,
    hasShippableProducts,
    freeShippingUnlocked,
    amountRemainingForFreeShipping,
    freeShippingProgress01,
    freeShippingNotApplicable: !hasShippableProducts,
  };
}

/**
 * Cross-sell : priorise un article qui couvre le reste pour débloquer la livraison offerte.
 */
export function pickCrossSellProducts(cartItems, catalogProducts, summary, limit = 4) {
  const cap = Math.max(1, Number(limit) || 4);
  const inCart = new Set((cartItems || []).map((i) => i.id));
  const pool = (catalogProducts || []).filter((p) => p?.id != null && !inCart.has(p.id));
  const hasShip = summary?.hasShippableProducts;
  const unlocked = summary?.freeShippingUnlocked;
  const rem = summary?.amountRemainingForFreeShipping || 0;

  if (!hasShip || unlocked || pool.length === 0) {
    return pool.slice(0, cap);
  }

  const scored = pool
    .map((p) => {
      const price = Number(p.prix || 0);
      const coversGap = price >= rem;
      return { p, price, coversGap, delta: coversGap ? price - rem : rem - price };
    })
    .filter((x) => x.price > 0)
    .sort((a, b) => {
      if (a.coversGap !== b.coversGap) return a.coversGap ? -1 : 1;
      return a.delta - b.delta;
    });

  const out = scored.slice(0, cap).map((x) => x.p);
  if (out.length >= cap) return out;
  const rest = pool.filter((p) => !out.some((x) => x.id === p.id)).slice(0, cap - out.length);
  return [...out, ...rest];
}
