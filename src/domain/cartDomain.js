import { computeCartDeliverySummary } from "./deliveryPolicy";
import { effectiveProductPrice } from "../lib/productPricing.js";

const STORAGE_KEY = "yorix_cart";

export function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(normalizeCartItem).filter(Boolean) : [];
  } catch {
    return [];
  }
}

export function saveCart(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items || []));
  } catch {
    // storage quota / private mode
  }
}

export function variantIdOf(item) {
  const raw = item?.variantId ?? item?._variantId ?? item?.variant_id ?? null;
  if (raw == null) return null;
  const s = String(raw).trim();
  return s === "" ? null : s;
}

export function cartItemKey(item) {
  if (!item || item.id == null) return "";
  const kind = item.kind || "product";
  const variantId = variantIdOf(item) || "";
  return `${kind}:${item.id}:${variantId}`;
}

export function withSelectedVariant(product, variant) {
  if (!product || !variant) return product;
  return {
    ...product,
    prix: Number(variant.prix ?? variant.price ?? product.prix),
    stock: variant.stock ?? product.stock,
    variantId: variant.id,
    variantLabel: variant.label || "",
    _variantId: variant.id,
    _variantLabel: variant.label || "",
  };
}

export function normalizeCartItem(item) {
  if (!item || !item.id) return null;
  const kind = item.kind || "product";
  const variantId = variantIdOf(item);
  const variantLabel = item.variantLabel || item._variantLabel || item.variant_label || null;
  return {
    ...item,
    kind,
    qty: Math.max(1, Number(item.qty || 1)),
    prix: Number(item.prix || 0),
    fulfillmentMode: item.fulfillmentMode || (kind === "service" ? "booking" : "delivery"),
    variantId,
    variantLabel: variantLabel || null,
    _variantId: variantId,
    _variantLabel: variantLabel || null,
  };
}

export function makeProductCartItem(product) {
  if (!product?.id) return null;
  let imgArr = [];
  if (Array.isArray(product.image_urls)) imgArr = product.image_urls;
  else if (typeof product.image_urls === "string") {
    try {
      imgArr = JSON.parse(product.image_urls);
    } catch {
      imgArr = [];
    }
  }
  const image =
    product.image && String(product.image).startsWith("http")
      ? product.image
      : imgArr[0] && String(imgArr[0]).startsWith("http")
        ? imgArr[0]
        : null;

  const variantId = variantIdOf(product);
  const variantLabel = product.variantLabel || product._variantLabel || null;
  return normalizeCartItem({
    id: product.id,
    kind: "product",
    name: product.name_fr || product.name || "Produit",
    image,
    prix: effectiveProductPrice(product),
    qty: 1,
    vendeur_id: product.vendeur_id || null,
    vendeur_nom: product.vendeur_nom || "",
    categorie: product.categorie || "",
    ville: product.ville || "",
    stock: product.stock ?? null,
    promo: product.promo,
    promo_pct: product.promo_pct,
    fulfillmentMode: "delivery",
    variantId,
    variantLabel,
    _variantId: variantId,
    _variantLabel: variantLabel,
    pricingSnapshot: {
      base: Number(product.prix || 0),
      sale: effectiveProductPrice(product),
      currency: "XAF",
    },
  });
}

export function makeServiceCartItem(service) {
  if (!service?.id) return null;
  return normalizeCartItem({
    id: service.id,
    kind: "service",
    name: service.name || service.provider_nom || service.metier || "Prestation",
    image: service.photo || null,
    prix: Number(service.prix_number || service.prix || 0),
    qty: 1,
    provider_id: service.provider_id || null,
    provider_nom: service.provider_nom || service.name || "",
    categorie: service.categorie || "Service",
    ville: service.ville || "",
    booking: {
      date: "",
      time: "",
      locationType: "home",
      notes: "",
    },
    fulfillmentMode: "booking",
    pricingSnapshot: {
      base: Number(service.prix_number || service.prix || 0),
      currency: "XAF",
    },
  });
}

export function upsertCartItem(items, newItem) {
  const candidate = normalizeCartItem(newItem);
  if (!candidate) return items || [];
  const list = Array.isArray(items) ? items : [];
  const key = cartItemKey(candidate);
  const idx = list.findIndex((i) => cartItemKey(i) === key);
  if (idx === -1) return [...list, candidate];
  return list.map((i, pos) =>
    pos !== idx
      ? i
      : { ...i, qty: i.kind === "service" ? 1 : Math.max(1, i.qty + candidate.qty) }
  );
}

export function updateCartQty(items, id, kind, delta, variantId = null) {
  const wantedVariant = variantId == null || variantId === "" ? null : String(variantId);
  return (items || []).map((item) => {
    if (item.id !== id || (kind && item.kind !== kind)) return item;
    if ((variantIdOf(item) || null) !== wantedVariant) return item;
    if (item.kind === "service") return { ...item, qty: 1 };
    return { ...item, qty: Math.max(1, Number(item.qty || 1) + delta) };
  });
}

export function removeCartItem(items, id, kind, variantId = null) {
  const wantedVariant = variantId == null || variantId === "" ? null : String(variantId);
  return (items || []).filter((i) => {
    if (!(i.id === id && (!kind || i.kind === kind))) return true;
    return (variantIdOf(i) || null) !== wantedVariant;
  });
}

/** @param {unknown[]} items @param {object|number} [policyOrLegacyFee] */
export function computeCartSummary(items, policyOrLegacyFee = 1500) {
  return computeCartDeliverySummary(items, policyOrLegacyFee);
}
