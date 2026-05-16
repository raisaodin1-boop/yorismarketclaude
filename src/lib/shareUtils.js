import { SITE_URL, buildEntitySlug, localePath } from "./seoRoutes";
import { YORIX_WA_NUMBER } from "./supabase";

/** URL publique indexable d’un produit */
export function productPublicPath(product, locale = "fr") {
  const slug = buildEntitySlug(product?.name_fr || "produit", product?.id);
  return localePath(locale, `/produit/${slug}`);
}

export function productPublicUrl(product, locale = "fr") {
  const path = productPublicPath(product, locale);
  return `${SITE_URL.replace(/\/$/, "")}${path}`;
}

export function buildProductWhatsAppText(product, locale = "fr") {
  const name = product?.name_fr || "Produit";
  const price = product?.prix != null ? `${Number(product.prix).toLocaleString("fr-FR")} FCFA` : "";
  const url = productPublicUrl(product, locale);
  if (locale === "en") {
    return `🛍️ ${name}${price ? ` — ${price}` : ""}\nBuy safely on Yorix.cm (Escrow · MoMo):\n${url}`;
  }
  return `🛍️ ${name}${price ? ` — ${price}` : ""}\nAchetez en confiance sur Yorix.cm (Escrow · MoMo):\n${url}`;
}

export function openWhatsAppShare(text) {
  const link = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(link, "_blank", "noopener,noreferrer");
}

export function openWhatsAppSupport(message) {
  const base = String(YORIX_WA_NUMBER).replace(/\D/g, "");
  const link = `https://wa.me/${base}?text=${encodeURIComponent(message)}`;
  window.open(link, "_blank", "noopener,noreferrer");
}
