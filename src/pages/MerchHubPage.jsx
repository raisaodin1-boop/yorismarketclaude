import { ProdGrid } from "../components/ProdGrid";
import { MERCH_HUBS } from "../lib/merchHubs";
import { useMerchHubProducts } from "../hooks/useMerchHubProducts";
import "./merchHubPage.css";

const HUB_TIPS = {
  "made-in-cameroun": {
    fr: [
      "Produits déclarés ou vérifiés Made in Cameroun par les vendeurs.",
      "Soutenez l'économie locale : artisans, marques et producteurs nationaux.",
    ],
    en: [
      "Products declared or verified Made in Cameroon by sellers.",
      "Support the local economy: artisans, brands and national producers.",
    ],
  },
  "top-produits": {
    fr: ["Meilleures ventes et nouveautés plébiscitées par les acheteurs."],
    en: ["Best sellers and new arrivals popular with buyers."],
  },
  promotions: {
    fr: ["Promos, offres flash et prix réduits — stock limité."],
    en: ["Deals, flash offers and discounted prices — limited stock."],
  },
};

/**
 * Landing merchandising premium (/made-in-cameroun, /top-produits, …)
 */
export function MerchHubPage({
  merchHub,
  locale = "fr",
  user,
  userData,
  wishlist,
  addToCart,
  toggleWish,
  openProductUrl,
  goPage,
}) {
  const hub = MERCH_HUBS[merchHub];
  const isEn = locale === "en";
  const { products, isLoading } = useMerchHubProducts(merchHub);
  const tips = HUB_TIPS[merchHub]?.[isEn ? "en" : "fr"] || [];

  if (!hub) {
    return (
      <section className="sec anim">
        <p>Hub introuvable.</p>
        <button type="button" className="form-submit" onClick={() => goPage("produits")}>
          Catalogue
        </button>
      </section>
    );
  }

  return (
    <section className="mhub-page sec anim yorix-page-flow">
      <header className={`mhub-hero mhub-hero--${hub.theme}`}>
        <span className="mhub-hero-emoji" aria-hidden>
          {hub.emoji}
        </span>
        <h1 className="mhub-hero-title">{isEn ? hub.titleEn : hub.titleFr}</h1>
        <p className="mhub-hero-desc">{isEn ? hub.descEn : hub.descFr}</p>
        {merchHub === "made-in-cameroun" && (
          <p className="mhub-hero-note">
            {isEn
              ? "🇨🇲 Badge: seller choice + auto-detection + admin verification (✔)"
              : "🇨🇲 Badge : choix vendeur + détection auto + validation admin (✔)"}
          </p>
        )}
      </header>

      {tips.length > 0 && (
        <ul className="mhub-tips">
          {tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      )}

      {isLoading ? (
        <div className="mhub-loading">{isEn ? "Loading…" : "Chargement…"}</div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">{hub.emoji}</div>
          <p>{isEn ? "No products in this selection yet." : "Aucun produit dans cette sélection pour le moment."}</p>
          <button type="button" className="form-submit" style={{ width: "auto" }} onClick={() => goPage("produits")}>
            {isEn ? "Browse catalog" : "Voir le catalogue"}
          </button>
        </div>
      ) : (
        <ProdGrid
          prods={products}
          user={user}
          userData={userData}
          onAddToCart={addToCart}
          onWish={toggleWish}
          wishlist={wishlist}
          onOpenProductUrl={openProductUrl}
        />
      )}
    </section>
  );
}
