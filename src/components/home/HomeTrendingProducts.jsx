import { useMemo } from "react";
import { ProdGrid } from "../ProdGrid";
import { computeHomepageTrendingProducts } from "../../lib/merchPlacement";
import "../conversion/conversion.css";

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
  const trending = useMemo(
    () => computeHomepageTrendingProducts(produits, 8),
    [produits],
  );

  if (loading || trending.length === 0) return null;

  const isEn = locale === "en";

  return (
    <section className="yhm3-section home-trending">
      <div className="home-trending__head">
        <div>
          <span className="yhm3-eyebrow-light">{isEn ? "Trending now" : "Tendances"}</span>
          <h2 className="home-trending__title">
            {isEn ? "Recent sales & views" : "Ventes et vues récentes"}
          </h2>
          <p className="home-trending__sub">
            {isEn
              ? "Popular right now — distinct from Top products (new arrivals)."
              : "Populaires en ce moment — distinct des Top produits (nouveautés 30 j)."}
          </p>
        </div>
        {onSeeAll && (
          <button type="button" className="yhm3-section-link" onClick={() => onSeeAll()}>
            {isEn ? "All trends" : "Toutes les tendances"} <span>→</span>
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
