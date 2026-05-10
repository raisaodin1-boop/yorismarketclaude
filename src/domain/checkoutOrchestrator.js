export function detectCheckoutType(items) {
  const hasProduct = (items || []).some((i) => i.kind === "product");
  const hasService = (items || []).some((i) => i.kind === "service");
  if (hasProduct && hasService) return "mixed";
  if (hasService) return "service_only";
  return "product_only";
}

export function buildCheckoutIntent({ items, user, userData, summary }) {
  const checkoutType = detectCheckoutType(items);
  return {
    checkoutType,
    customer: {
      id: user?.id || null,
      nom: userData?.nom || "",
      email: user?.email || "",
      telephone: userData?.telephone || "",
      ville: userData?.ville || "",
      adresse: userData?.adresse || "",
    },
    items: (items || []).map((item) => ({
      id: item.id,
      kind: item.kind || "product",
      qty: item.qty || 1,
      price: Number(item.prix || 0),
      fulfillmentMode: item.fulfillmentMode || (item.kind === "service" ? "booking" : "delivery"),
      booking: item.booking || null,
      provider_id: item.provider_id ?? null,
      vendeur_id: item.vendeur_id ?? null,
      vendeur_nom: item.vendeur_nom ?? "",
      ville: item.ville ?? "",
    })),
    summary,
  };
}

