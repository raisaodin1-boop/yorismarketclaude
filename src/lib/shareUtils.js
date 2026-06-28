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

export function buildProductShareText(product, locale = "fr") {
  const name = product?.name_fr || "Produit";
  const price = product?.prix != null ? `${Number(product.prix).toLocaleString("fr-FR")} FCFA` : "";
  const url = productPublicUrl(product, locale);
  if (locale === "en") {
    return `${name}${price ? ` — ${price}` : ""}\nBuy safely on Yorix.cm (Escrow · MoMo):\n${url}`;
  }
  return `${name}${price ? ` — ${price}` : ""}\nAchetez en confiance sur Yorix.cm (Escrow · MoMo):\n${url}`;
}

export function buildProductWhatsAppText(product, locale = "fr") {
  const plain = buildProductShareText(product, locale);
  return `🛍️ ${plain}`;
}

/**
 * Partage natif (Web Share API) avec repli presse-papiers puis WhatsApp.
 * @returns {Promise<{ ok: boolean, method: 'native' | 'clipboard' | 'whatsapp' | 'cancelled' }>}
 */
export async function shareProduct(product, locale = "fr") {
  if (!product) return { ok: false, method: "cancelled" };

  const title = product.name_fr || "Produit Yorix";
  const text = buildProductShareText(product, locale);
  const url = productPublicUrl(product, locale);

  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share({ title, text, url });
      return { ok: true, method: "native" };
    } catch (e) {
      if (e?.name === "AbortError") return { ok: false, method: "cancelled" };
    }
  }

  const payload = `${text}`;
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(payload);
      return { ok: true, method: "clipboard" };
    } catch {
      /* fall through */
    }
  }

  openWhatsAppShare(buildProductWhatsAppText(product, locale));
  return { ok: true, method: "whatsapp" };
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
