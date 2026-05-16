import "../conversion/conversion.css";

export function HomeBuyerSellerCta({ locale = "fr", onBrowse, onSell }) {
  const isEn = locale === "en";

  return (
    <section className="home-bsc" aria-label={isEn ? "Buy or sell" : "Acheter ou vendre"}>
      <button type="button" className="home-bsc__card home-bsc__card--buy" onClick={onBrowse}>
        <div className="home-bsc__ico" aria-hidden>
          🛍️
        </div>
        <h3 className="home-bsc__title">{isEn ? "I'm buying" : "Je veux acheter"}</h3>
        <p className="home-bsc__desc">
          {isEn
            ? "Browse verified products, MoMo checkout, escrow protection and fast delivery."
            : "Parcourez des produits vérifiés, paiement MoMo, escrow et livraison rapide."}
        </p>
        <span className="home-bsc__cta">{isEn ? "Browse catalog →" : "Voir le catalogue →"}</span>
      </button>

      <button type="button" className="home-bsc__card home-bsc__card--sell" onClick={onSell}>
        <div className="home-bsc__ico" aria-hidden>
          🏪
        </div>
        <h3 className="home-bsc__title">{isEn ? "I'm selling" : "Je veux vendre"}</h3>
        <p className="home-bsc__desc">
          {isEn
            ? "Open your shop in minutes, reach buyers nationwide, 5% commission."
            : "Ouvrez votre boutique en quelques minutes, touchez tout le pays, commission 5 %."}
        </p>
        <span className="home-bsc__cta">{isEn ? "Become a seller →" : "Devenir vendeur →"}</span>
      </button>
    </section>
  );
}
