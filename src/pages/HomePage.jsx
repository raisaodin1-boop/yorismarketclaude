// ═══════════════════════════════════════════════════════════════
//  YORIX CM — HOMEPAGE REFONTE v1.0 (9 sections stratégiques)
// ═══════════════════════════════════════════════════════════════

import { useEffect, useRef } from "react";
import { usePlatformStats } from "../hooks/usePlatformStats";
import homeRefonteCss from "./homePageRefonte.css?raw";
import {
  HomeRefonteHero,
  HomeRefonteTrustBar,
  HomeRefonteCategories,
  HomeRefonteTrending,
  HomeRefonteHowItWorks,
  HomeRefonteMadeIn,
  HomeRefonteTestimonials,
  HomeRefonteFinalCta,
} from "../components/home/HomeRefonteSections";

export function HomePage({
  siteLocale = "fr",
  produitsLoading,
  produits = [],
  user,
  userData,
  wishlist = [],
  addToCart = () => {},
  toggleWish = () => {},
  openProductUrl = () => {},
  openSellerUrl,
  setOnboardingOpen = () => {},
  goPage = () => {},
  goToCategory = () => {},
  // Props conservés pour compatibilité YorixPages (non utilisés sur la homepage épurée)
  filterCat: _filterCat,
  setFilterCat: _setFilterCat,
  search: _search,
  setSearch: _setSearch,
  categoryTree: _categoryTree,
  allServices: _allServices,
  nlEmail: _nlEmail,
  setNlEmail: _setNlEmail,
  nlSent: _nlSent,
  setNlSent: _setNlSent,
  freeShippingThresholdXaf: _freeShippingThresholdXaf,
}) {
  const safeProduits = Array.isArray(produits) ? produits : [];
  const { stats: platformStats, isLoading: statsLoading } = usePlatformStats();
  const homeRef = useRef(null);

  useEffect(() => {
    const container = homeRef.current;
    if (!container) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      container.querySelectorAll(".yx-reveal").forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" },
    );
    const tid = setTimeout(() => {
      container.querySelectorAll(".yx-reveal").forEach((el) => io.observe(el));
      container.querySelector(".yx-hero")?.classList.add("is-in");
    }, 40);
    return () => {
      clearTimeout(tid);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <style>{homeRefonteCss}</style>
      <div className="yx-home home-premium anim" ref={homeRef}>
        {/* ② Hero */}
        <HomeRefonteHero locale={siteLocale} goPage={goPage} />

        {/* ③ Barre de confiance */}
        <HomeRefonteTrustBar locale={siteLocale} stats={platformStats} isLoading={statsLoading} />

        {/* ④ Catégories (8 univers) */}
        <HomeRefonteCategories locale={siteLocale} goPage={goPage} goToCategory={goToCategory} />

        {/* ⑤ Produits tendance */}
        <HomeRefonteTrending
          locale={siteLocale}
          produits={safeProduits}
          loading={produitsLoading}
          user={user}
          userData={userData}
          addToCart={addToCart}
          toggleWish={toggleWish}
          wishlist={wishlist}
          openProductUrl={openProductUrl}
          openSellerUrl={openSellerUrl}
          goPage={goPage}
        />

        {/* ⑥ Comment ça marche */}
        <HomeRefonteHowItWorks locale={siteLocale} />

        {/* ⑦ Made in Cameroun */}
        <HomeRefonteMadeIn
          locale={siteLocale}
          produits={safeProduits}
          goPage={goPage}
          openProductUrl={openProductUrl}
        />

        {/* ⑧ Témoignages */}
        <HomeRefonteTestimonials locale={siteLocale} stats={platformStats} />

        {/* ⑨ CTA final (footer global = PremiumSiteFooter) */}
        <HomeRefonteFinalCta locale={siteLocale} goPage={goPage} setOnboardingOpen={setOnboardingOpen} />
      </div>
    </>
  );
}
