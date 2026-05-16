import { useMemo } from "react";
import { ProdGrid } from "../ProdGrid";
import "../conversion/conversion.css";

function trendingScore(p) {
  const ventes = Number(p?.vente_total) || 0;
  const vues = Number(p?.vues) || 0;
  const note = Number(p?.note) || 0;
  return ventes * 100 + vues + note * 5;
}

export function HomeTrendingProducts({
  produits = [],
  locale = "fr",
  loading,
  user,
  userData,
  addToCart,
  toggleWish,
  wishlist,
  openProductUrl,
  onSeeAll,
}) {
  const trending = useMemo(() => {
    const safeProduits = Array.isArray(produits) ? produits : [];
    return [...safeProduits]
      .sort((a, b) => trendingScore(b) - trendingScore(a))
      .slice(0, 8);
  }, [produits]);

  if (loading || trending.length === 0) return null;

  const isEn = locale === "en";

  return (
    <section className="yhm3-section home-trending">
      <div className="home-trending__head">
        <div>
          <span className="yhm3-eyebrow-light">{isEn ? "Popular now" : "Tendances"}</span>
          <h2 className="home-trending__title">
            {isEn ? "Top sellers & most viewed" : "Meilleures ventes & plus vus"}
          </h2>
          <p className="home-trending__sub">
            {isEn
              ? "Real marketplace data — sales and views from Yorix sellers."
              : "Données réelles du marché — ventes et vues des vendeurs Yorix."}
          </p>
        </div>
        {onSeeAll && (
          <button type="button" className="yhm3-section-link" onClick={onSeeAll}>
            {isEn ? "Full catalog" : "Tout le catalogue"} <span>→</span>
          </button>
        )}
      </div>

      <ProdGrid
        prods={trending}
        user={user}
        userData={userData}
        onAddToCart={addToCart}
        onWish={toggleWish}
        wishlist={wishlist}
        onOpenProductUrl={openProductUrl}
        siteLocale={locale}
        showShare
      />
    </section>
  );
}
