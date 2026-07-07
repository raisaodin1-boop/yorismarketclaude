import { useMemo } from "react";
import { filterProductsByMerchHub } from "../../lib/merchHubs";
import {
  computeBestRatedProducts,
  computeCityTrendingProducts,
  computeHomepageTrendingProducts,
  computeMostPopularProducts,
  computePremiumProducts,
  computeTopNewProducts,
} from "../../lib/merchPlacement";
import { CatalogProductRail } from "./CatalogProductRail";
import { useSiteT } from "../../hooks/useSiteT";

const HUB_CHIPS = [
  { hub: "made-in-cameroun", emoji: "🇨🇲", keyFr: "hubMadeIn", keyEn: "hubMadeIn" },
  { hub: "top-produits", emoji: "⭐", keyFr: "hubTop", keyEn: "hubTop" },
  { hub: "produits-tendance", emoji: "🔥", keyFr: "hubTrending", keyEn: "hubTrending" },
  { hub: "promotions", emoji: "💸", keyFr: "hubFlash", keyEn: "hubFlash" },
  { hub: "livraison-express", emoji: "🚚", keyFr: "hubExpress", keyEn: "hubExpress" },
];

export function CatalogHubChips({ siteLocale = "fr", goPage }) {
  const { t, isEn } = useSiteT(siteLocale);

  return (
    <nav className="catalog-hub-chips" aria-label={isEn ? "Quick collections" : "Collections rapides"}>
      {HUB_CHIPS.map((chip) => (
        <button
          key={chip.hub}
          type="button"
          className="catalog-hub-chip"
          onClick={() => goPage?.("merchHub", { merchHub: chip.hub })}
        >
          {chip.emoji} {t(`catalog:${chip.keyFr}`)}
        </button>
      ))}
    </nav>
  );
}

export function CatalogCuratedRails({
  products = [],
  siteLocale = "fr",
  goPage,
  user,
  userData,
  addToCart,
  toggleWish,
  wishlist,
  openProductUrl,
  openSellerUrl,
}) {
  const { t, isEn } = useSiteT(siteLocale);
  const seeAll = isEn ? "See all" : "Tout voir";

  const rails = useMemo(() => {
    const list = products || [];
    if (list.length < 8) return [];

    const popular = computeMostPopularProducts(list, { limit: 8 });
    const rated = computeBestRatedProducts(list, { limit: 8 });
    const madeIn = filterProductsByMerchHub(list, "made_in_cameroon").slice(0, 8);
    const express = filterProductsByMerchHub(list, "express_delivery").slice(0, 8);
    const flash = filterProductsByMerchHub(list, "promo").slice(0, 8);
    const fresh = computeTopNewProducts(list, { limit: 8 });
    const premium = computePremiumProducts(list, { limit: 8 });
    const trendDouala = computeCityTrendingProducts(list, "douala", { limit: 8 });
    const trendYaounde = computeCityTrendingProducts(list, "yaound", { limit: 8 });
    const trending = computeHomepageTrendingProducts(list, 8);

    return [
      {
        id: "popular",
        title: t("catalog:railPopular"),
        subtitle: t("catalog:railPopularSub"),
        emoji: "🔥",
        products: popular,
        hub: "top-produits",
      },
      {
        id: "rated",
        title: t("catalog:railRated"),
        subtitle: t("catalog:railRatedSub"),
        emoji: "⭐",
        products: rated,
        hub: "top-produits",
      },
      {
        id: "made-in",
        title: t("catalog:railMadeIn"),
        subtitle: t("catalog:railMadeInSub"),
        emoji: "🇨🇲",
        products: madeIn,
        hub: "made-in-cameroun",
      },
      {
        id: "express",
        title: t("catalog:railExpress"),
        subtitle: t("catalog:railExpressSub"),
        emoji: "🚚",
        products: express,
        hub: "livraison-express",
      },
      {
        id: "flash",
        title: t("catalog:railFlash"),
        subtitle: t("catalog:railFlashSub"),
        emoji: "🔥",
        products: flash,
        hub: "promotions",
      },
      {
        id: "new",
        title: t("catalog:railNew"),
        subtitle: t("catalog:railNewSub"),
        emoji: "🆕",
        products: fresh,
        hub: "top-produits",
      },
      {
        id: "trending",
        title: t("catalog:railTrending"),
        subtitle: t("catalog:railTrendingSub"),
        emoji: "📈",
        products: trending,
        hub: "produits-tendance",
      },
      trendDouala.length >= 4
        ? {
            id: "douala",
            title: t("catalog:railDouala"),
            subtitle: t("catalog:railCitySub"),
            emoji: "📍",
            products: trendDouala,
            hub: "acheter-local-cameroun",
          }
        : null,
      trendYaounde.length >= 4
        ? {
            id: "yaounde",
            title: t("catalog:railYaounde"),
            subtitle: t("catalog:railCitySub"),
            emoji: "📍",
            products: trendYaounde,
            hub: "acheter-local-cameroun",
          }
        : null,
      {
        id: "premium",
        title: t("catalog:railPremium"),
        subtitle: t("catalog:railPremiumSub"),
        emoji: "💎",
        products: premium,
        hub: "top-vendeurs",
      },
    ].filter((r) => r && r.products.length >= 4);
  }, [products, t]);

  if (!rails.length) return null;

  return (
    <div className="catalog-rails">
      {rails.map((rail) => (
        <CatalogProductRail
          key={rail.id}
          title={rail.title}
          subtitle={rail.subtitle}
          emoji={rail.emoji}
          products={rail.products}
          siteLocale={siteLocale}
          seeAllLabel={seeAll}
          onSeeAll={goPage ? () => goPage("merchHub", { merchHub: rail.hub }) : undefined}
          user={user}
          userData={userData}
          addToCart={addToCart}
          toggleWish={toggleWish}
          wishlist={wishlist}
          openProductUrl={openProductUrl}
          openSellerUrl={openSellerUrl}
        />
      ))}
    </div>
  );
}
