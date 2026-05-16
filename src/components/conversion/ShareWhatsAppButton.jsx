import { buildProductWhatsAppText, openWhatsAppShare } from "../../lib/shareUtils";
import "./conversion.css";

export function ShareWhatsAppButton({
  product,
  locale = "fr",
  variant = "primary",
  className = "",
}) {
  if (!product) return null;

  const handleShare = () => {
    openWhatsAppShare(buildProductWhatsAppText(product, locale));
  };

  return (
    <button
      type="button"
      className={`share-wa-btn share-wa-btn--${variant} ${className}`.trim()}
      onClick={handleShare}
    >
      <span aria-hidden>💬</span>
      {locale === "en" ? "Share on WhatsApp" : "Partager sur WhatsApp"}
    </button>
  );
}
