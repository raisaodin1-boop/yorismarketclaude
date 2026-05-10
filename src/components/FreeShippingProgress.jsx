/**
 * Bandeau + barre de progression livraison offerte au seuil (articles à livrer).
 */
export function FreeShippingProgress({ summary, variant = "cart" }) {
  const threshold = summary?.policyThreshold ?? 50_000;
  const compact = variant === "compact";

  if (summary?.freeShippingNotApplicable) {
    return (
      <div className={`fs-ship-banner fs-ship-banner--muted${compact ? " fs-ship-banner--compact" : ""}`} role="status">
        <span className="fs-ship-eyebrow">Info livraison</span>
        <div className="fs-ship-title">Prestations sans colis — pas de frais de livraison marketplace sur ce panier.</div>
        <p className="fs-ship-caption">Ajoutez un produit expédiable pour bénéficier de la livraison offerte dès le seuil Yorix.</p>
      </div>
    );
  }

  if (summary?.freeShippingUnlocked) {
    return (
      <div className={`fs-ship-banner fs-ship-banner--won${compact ? " fs-ship-banner--compact" : ""}`} role="status">
        <span className="fs-ship-eyebrow fs-ship-eyebrow--gold">Bon plan · Livraison offerte</span>
        <div className="fs-ship-title fs-ship-title--celebrate">
          Félicitations ! Livraison standard offerte sur vos articles à livrer
        </div>
        <p className="fs-ship-caption">
          Seuil {threshold.toLocaleString("fr-FR")} FCFA atteint — vous économisez les frais d’expédition affichés.
        </p>
        <span className="fs-ship-badge-live">⭐ Offre spéciale Yorix</span>
      </div>
    );
  }

  const rem = summary?.amountRemainingForFreeShipping ?? 0;
  const pct = summary?.freeShippingProgress01 != null ? Math.round(Math.min(100, summary.freeShippingProgress01 * 100)) : 0;

  return (
    <div className={`fs-ship-banner fs-ship-banner--chase${compact ? " fs-ship-banner--compact" : ""}`} role="status">
      <div className="fs-ship-banner-top">
        <span className="fs-ship-eyebrow">Encore un effort · Livraison offerte</span>
        <span className="fs-ship-micro">Sur les produits à livrer uniquement · commission Yorix non affichée</span>
      </div>
      <div className="fs-ship-title">
        Ajoutez encore{" "}
        <strong>{rem.toLocaleString("fr-FR")} FCFA</strong> de produits pour débloquer la livraison gratuite
      </div>
      <div className="fs-ship-track" aria-hidden>
        <div className="fs-ship-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="fs-ship-meta">
        <span>
          {pct}% du seuil {threshold.toLocaleString("fr-FR")} FCFA · frais sinon{" "}
          {(summary.policyStandardFee ?? 1500).toLocaleString("fr-FR")} FCFA
        </span>
      </div>
    </div>
  );
}
