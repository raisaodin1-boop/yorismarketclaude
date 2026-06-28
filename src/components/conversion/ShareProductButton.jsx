import { useState } from "react";
import { Share2 } from "lucide-react";
import { shareProduct } from "../../lib/shareUtils";
import { userFacingSuccess } from "../../lib/appToast";
import "./conversion.css";

export function ShareProductButton({
  product,
  locale = "fr",
  variant = "primary",
  className = "",
}) {
  const [busy, setBusy] = useState(false);

  if (!product) return null;

  const handleShare = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const result = await shareProduct(product, locale);
      if (result.method === "clipboard") {
        userFacingSuccess(
          locale === "en" ? "Link copied to clipboard" : "Lien copié dans le presse-papiers",
        );
      } else if (result.method === "whatsapp") {
        userFacingSuccess(
          locale === "en" ? "Opening WhatsApp…" : "Ouverture de WhatsApp…",
          3000,
        );
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      className={`share-wa-btn share-product-btn share-wa-btn--${variant} ${className}`.trim()}
      onClick={handleShare}
      disabled={busy}
      aria-busy={busy}
    >
      <Share2 size={16} strokeWidth={2.25} aria-hidden />
      {locale === "en" ? "Share product" : "Partager le produit"}
    </button>
  );
}
