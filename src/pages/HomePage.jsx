import { useEffect, useRef } from "react";
import { usePlatformStats } from "../hooks/usePlatformStats";
import homeRefonteCss from "./homePageRefonte.css?raw";
import {
  HomeRefonteHero,
  HomeRefonteTrustBar,
  HomeRefonteCategories,
  HomeRefonteTrending,
  HomeRefontePourquoi,
  HomeRefonteHowItWorks,
  HomeRefonteMadeIn,
  HomeRefonteTestimonials,
  HomeRefonteFinalCta,
} from "../components/home/HomeRefonteSections";
import {
  HomeRefontePersonalized,
  HomeRefonteMobileShortcuts,
  HomeRefonteTrustMicro,
} from "../components/home/HomeRefonteMobile";

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
  goDash,
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
        <HomeRefontePersonalized
          locale={siteLocale}
          user={user}
          userData={userData}
          goPage={goPage}
          goDash={goDash}
          produits={safeProduits}
        />

        <HomeRefonteHero locale={siteLocale} goPage={goPage} />

        <HomeRefonteMobileShortcuts locale={siteLocale} goPage={goPage} goDash={goDash} />

        <HomeRefonteTrustMicro locale={siteLocale} />

        <div className="yx-home__trust-compact yx-mobile-only">
          <HomeRefonteTrustBar locale={siteLocale} stats={platformStats} isLoading={statsLoading} />
        </div>
        <div className="yx-home__trust-full yx-desktop-only">
          <HomeRefonteTrustBar locale={siteLocale} stats={platformStats} isLoading={statsLoading} />
        </div>

        <HomeRefonteCategories locale={siteLocale} goPage={goPage} goToCategory={goToCategory} />

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

        <HomeRefontePourquoi locale={siteLocale} />

        <div className="yx-home__defer-mobile">
          <HomeRefonteHowItWorks locale={siteLocale} />
          <HomeRefonteMadeIn
            locale={siteLocale}
            produits={safeProduits}
            goPage={goPage}
            openProductUrl={openProductUrl}
          />
          <HomeRefonteTestimonials locale={siteLocale} stats={platformStats} />
        </div>

        <HomeRefonteFinalCta locale={siteLocale} goPage={goPage} setOnboardingOpen={setOnboardingOpen} />
      </div>
    </>
  );
}
