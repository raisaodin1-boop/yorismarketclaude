import "./conversion.css";

/** Preuve sociale une ligne — cartes compactes catalogue. */
export function CompactSocialProof({ product, locale = "fr" }) {
  const ventes = Number(product?.vente_total) || 0;
  const vues = Number(product?.vues) || 0;
  const avis = Number(product?.nombre_avis) || 0;
  const note = Number(product?.note) || 0;
  const verified = product?.vendeur_verifie || product?.verifie;
  const isEn = locale === "en";

  const watching = vues >= 12 ? Math.max(1, Math.min(99, Math.floor(vues / 12))) : 0;

  if (ventes < 1 && avis < 1 && !verified && watching < 1) return null;

  const parts = [];
  if (ventes > 0) {
    parts.push(
      <span key="sales">
        🔥 {isEn ? "Sold" : "Vendu"} <strong>{ventes}×</strong>
      </span>,
    );
  }
  if (avis > 0 && note > 0) {
    parts.push(
      <span key="rating">
        ⭐ <strong>{note.toFixed(1)}</strong>
      </span>,
    );
  }
  if (watching > 0) {
    parts.push(
      <span key="views">
        👀 <strong>{watching}</strong> {isEn ? "watching" : "regardent"}
      </span>,
    );
  }
  if (verified) {
    parts.push(
      <span key="verified" className="compact-proof-verified">
        ✅ {isEn ? "Verified" : "Vérifié"}
      </span>,
    );
  }

  return (
    <div className="compact-social-proof" aria-label={isEn ? "Product popularity" : "Popularité produit"}>
      {parts.map((node, i) => (
        <span key={node.key || i} className="compact-social-proof__item">
          {node}
        </span>
      ))}
    </div>
  );
}
