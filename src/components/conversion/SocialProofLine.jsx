import "./conversion.css";

export function SocialProofLine({ product, locale = "fr" }) {
  const vues = Number(product?.vues) || 0;
  const ventes = Number(product?.vente_total) || 0;
  const avis = Number(product?.nombre_avis) || 0;

  if (vues < 5 && ventes < 1 && avis < 1) return null;

  const isEn = locale === "en";

  return (
    <div className="social-proof-row">
      {ventes > 0 && (
        <span>
          🏆 <strong>{ventes}</strong> {isEn ? "sold" : "vendu(s)"}
        </span>
      )}
      {vues >= 10 && (
        <span>
          👀 <strong>{vues}</strong> {isEn ? "views" : "vues"}
        </span>
      )}
      {avis > 0 && (
        <span>
          ⭐ <strong>{avis}</strong> {isEn ? "reviews" : "avis"}
        </span>
      )}
    </div>
  );
}
