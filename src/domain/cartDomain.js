import { computeCartDeliverySummary } from "./deliveryPolicy";

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

export function normalizeCartItem(item) {
  if (!item || !item.id) return null;
  const kind = item.kind || "product";
  return {
    ...item,
    kind,
    qty: Math.max(1, Number(item.qty || 1)),
    prix: Number(item.prix || 0),
    fulfillmentMode: item.fulfillmentMode || (kind === "service" ? "booking" : "delivery"),
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

  return normalizeCartItem({
    id: product.id,
    kind: "product",
    name: product.name_fr || product.name || "Produit",
    image,
    prix: Number(product.prix || 0),
    qty: 1,
    vendeur_id: product.vendeur_id || null,
    vendeur_nom: product.vendeur_nom || "",
    categorie: product.categorie || "",
    ville: product.ville || "",
    stock: product.stock ?? null,
    fulfillmentMode: "delivery",
    pricingSnapshot: {
      base: Number(product.prix || 0),
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
  const idx = list.findIndex((i) => i.id === candidate.id && i.kind === candidate.kind);
  if (idx === -1) return [...list, candidate];
  return list.map((i, pos) =>
    pos !== idx
      ? i
      : { ...i, qty: i.kind === "service" ? 1 : Math.max(1, i.qty + candidate.qty) }
  );
}

export function updateCartQty(items, id, kind, delta) {
  return (items || []).map((item) => {
    if (item.id !== id || (kind && item.kind !== kind)) return item;
    if (item.kind === "service") return { ...item, qty: 1 };
    return { ...item, qty: Math.max(1, Number(item.qty || 1) + delta) };
  });
}

export function removeCartItem(items, id, kind) {
  return (items || []).filter((i) => !(i.id === id && (!kind || i.kind === kind)));
}

/** @param {unknown[]} items @param {object|number} [policyOrLegacyFee] */
export function computeCartSummary(items, policyOrLegacyFee = 1500) {
  return computeCartDeliverySummary(items, policyOrLegacyFee);
}
