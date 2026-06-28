import { useMemo, useState } from "react";
import { ProdGrid } from "../components/ProdGrid";
import { MERCH_HUBS } from "../lib/merchHubs";
import { productMoq } from "../lib/productMoq.js";
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
  "sourcer-en-gros": {
    fr: [
      "Filtrez par quantité minimum (MOQ) pour vos achats professionnels.",
      "Fournisseurs vérifiés, Protect+ et escrow sur les annonces éligibles.",
    ],
    en: [
      "Filter by minimum order quantity (MOQ) for professional buying.",
      "Verified suppliers, Protect+ and escrow on eligible listings.",
    ],
  },
};

const MOQ_FILTERS = [
  { id: "all", fr: "Tous", en: "All" },
  { id: "1", fr: "1 pc", en: "1 pc" },
  { id: "5", fr: "MOQ 5+", en: "MOQ 5+" },
  { id: "10", fr: "MOQ 10+", en: "MOQ 10+" },
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
  const { products, isLoading } = useMerchHubProducts(merchHub);
  const tips = HUB_TIPS[merchHub]?.[isEn ? "en" : "fr"] || [];
  const [moqFilter, setMoqFilter] = useState("all");

  const displayProducts = useMemo(() => {
    if (merchHub !== "sourcer-en-gros") return products;
    return filterByMoq(products, moqFilter);
  }, [products, merchHub, moqFilter]);

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
        {merchHub === "sourcer-en-gros" && (
          <p className="mhub-hero-note">
            {isEn
              ? "B2B sourcing hub — filter by MOQ, contact suppliers via chat on product pages."
              : "Hub sourcing B2B — filtrez par MOQ, contactez les fournisseurs via le chat sur les fiches produit."}
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

      {merchHub === "sourcer-en-gros" && (
        <div className="mhub-moq-filters" role="group" aria-label={isEn ? "MOQ filter" : "Filtre MOQ"}>
          {MOQ_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`mhub-moq-btn${moqFilter === f.id ? " is-active" : ""}`}
              onClick={() => setMoqFilter(f.id)}
            >
              {isEn ? f.en : f.fr}
            </button>
          ))}
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
        />
      )}
    </section>
  );
}
