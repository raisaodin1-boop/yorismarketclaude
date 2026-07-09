import { useMemo, useState } from "react";
import { Package, Boxes } from "lucide-react";
import { ProdGrid } from "../components/ProdGrid";
import { WholesaleHubHeader } from "../components/wholesale/WholesaleHubHeader";
import { MadeInCameroonHubHeader } from "../components/madeIn/MadeInCameroonHubHeader";
import { MERCH_HUBS } from "../lib/merchHubs";
import { PromotionsPremiumView } from "../components/promotions/PromotionsPremiumView";
import { productMoq } from "../lib/productMoq.js";
import { useMerchHubProducts } from "../hooks/useMerchHubProducts";
import "./merchHubPage.css";

const HUB_TIPS = {
  "top-produits": {
    fr: ["Meilleures ventes et nouveautés plébiscitées par les acheteurs."],
    en: ["Best sellers and new arrivals popular with buyers."],
  },
  promotions: {
    fr: ["Promos, offres flash et prix réduits — stock limité."],
    en: ["Deals, flash offers and discounted prices — limited stock."],
  },
};

const MOQ_FILTERS = [
  { id: "all", fr: "Tous", en: "All", icon: null },
  { id: "1", fr: "1 pc", en: "1 pc", icon: Package },
  { id: "5", fr: "Min. 5+", en: "Min. 5+", icon: Boxes },
  { id: "10", fr: "Min. 10+", en: "Min. 10+", icon: Boxes },
];

function filterByMoq(products, moqFilter) {
  if (moqFilter === "all") return products;
  if (moqFilter === "1") return products.filter((p) => productMoq(p) <= 1);
  const min = moqFilter === "5" ? 5 : 10;
  return products.filter((p) => productMoq(p) >= min);
}

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
  openSellerUrl,
  goPage,
}) {
  const hub = MERCH_HUBS[merchHub];
  const isEn = locale === "en";
  const isWholesaleHub = merchHub === "sourcer-en-gros";
  const isMadeInHub = merchHub === "made-in-cameroun";
  const { products, isLoading } = useMerchHubProducts(merchHub);
  const tips = HUB_TIPS[merchHub]?.[isEn ? "en" : "fr"] || [];
  const [moqFilter, setMoqFilter] = useState("all");

  const displayProducts = useMemo(() => {
    if (!isWholesaleHub) return products;
    return filterByMoq(products, moqFilter);
  }, [products, isWholesaleHub, moqFilter]);

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

  if (merchHub === "promotions") {
    return (
      <PromotionsPremiumView
        locale={locale}
        user={user}
        userData={userData}
        wishlist={wishlist}
        addToCart={addToCart}
        toggleWish={toggleWish}
        openProductUrl={openProductUrl}
        openSellerUrl={openSellerUrl}
        goPage={goPage}
      />
    );
  }

  return (
    <section className={`mhub-page sec anim yorix-page-flow${isWholesaleHub ? " mhub-page--wholesale" : ""}${isMadeInHub ? " mhub-page--made-in" : ""}`}>
      <header className={`mhub-hero mhub-hero--${hub.theme}${isWholesaleHub || isMadeInHub ? " mhub-hero--hub-compact" : ""}`}>
        <span className="mhub-hero-emoji" aria-hidden>
          {hub.emoji}
        </span>
        <h1 className="mhub-hero-title">
          {isEn ? hub.titleEn : hub.titleFr}
          {isWholesaleHub && (
            <span className="mhub-hero-title-sub">
              {isEn ? "Import without leaving your shop" : "Importez sans quitter votre boutique"}
            </span>
          )}
          {isMadeInHub && (
            <span className="mhub-hero-title-sub mhub-hero-title-sub--mic">
              {isEn ? "Eat, wear and live Cameroonian" : "Mangez, portez et vivez camerounais"}
            </span>
          )}
        </h1>
        {(isWholesaleHub || isMadeInHub) ? (
          <p className={`mhub-hero-desc${isWholesaleHub ? " mhub-hero-desc--wholesale" : " mhub-hero-desc--mic"}`}>
            {isEn ? hub.descEn : hub.descFr}
          </p>
        ) : (
          <p className="mhub-hero-desc">{isEn ? hub.descEn : hub.descFr}</p>
        )}
      </header>

      {isMadeInHub && <MadeInCameroonHubHeader locale={locale} />}

      {isWholesaleHub && <WholesaleHubHeader locale={locale} goPage={goPage} />}

      {!isWholesaleHub && !isMadeInHub && tips.length > 0 && (
        <ul className="mhub-tips">
          {tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      )}

      {isWholesaleHub && (
        <div
          className="mhub-moq-filters mhub-moq-filters--wholesale"
          role="group"
          aria-label={isEn ? "Minimum quantity filter" : "Filtre quantité minimale"}
        >
          <span className="mhub-moq-filters__lbl">
            <Boxes size={14} aria-hidden />
            {isEn ? "Min. order qty" : "Quantité minimale"}
          </span>
          {MOQ_FILTERS.map((f) => {
            const Icon = f.icon;
            return (
              <button
                key={f.id}
                type="button"
                className={`mhub-moq-btn${moqFilter === f.id ? " is-active" : ""}`}
                onClick={() => setMoqFilter(f.id)}
              >
                {Icon && <Icon size={13} aria-hidden />}
                {isEn ? f.en : f.fr}
              </button>
            );
          })}
        </div>
      )}

      {isLoading ? (
        <div className="mhub-loading">{isEn ? "Loading…" : "Chargement…"}</div>
      ) : displayProducts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">{hub.emoji}</div>
          <p>{isEn ? "No products in this selection yet." : "Aucun produit dans cette sélection pour le moment."}</p>
          <button type="button" className="form-submit" style={{ width: "auto" }} onClick={() => goPage("produits")}>
            {isEn ? "Browse catalog" : "Voir le catalogue"}
          </button>
        </div>
      ) : (
        <ProdGrid
          prods={displayProducts}
          user={user}
          userData={userData}
          onAddToCart={addToCart}
          onWish={toggleWish}
          wishlist={wishlist}
          onOpenProductUrl={openProductUrl}
          onOpenSellerUrl={openSellerUrl}
          siteLocale={locale}
          wholesaleMode={isWholesaleHub}
          madeInMode={isMadeInHub}
        />
      )}
    </section>
  );
}
