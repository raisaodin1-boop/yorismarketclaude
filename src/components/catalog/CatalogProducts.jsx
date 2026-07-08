import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProdGrid } from "../ProdGrid";
import { CategoryFilterPanel } from "../categories/CategoryFilterPanel";
import { SkeletonCard } from "../SkeletonCard";
import { useCatalogProducts } from "../../hooks/useCatalogProducts";
import { useCatalogRails } from "../../hooks/useCatalogRails";
import { categoryLabel } from "../../lib/marketplaceCategories";
import { CatalogHero } from "./CatalogHero";
import { CatalogHubChips, CatalogCuratedRails } from "./CatalogCuratedRails";
import { CatalogSearchFilters, applyCatalogQuickFilters } from "./CatalogSearchFilters";
import { useSiteT } from "../../hooks/useSiteT";
import "./catalogPage.css";

function useDebounced(value, delay = 350) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function SkeletonRow({ count }) {
  return (
    <div className="prod-grid">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

function resolveCategoryFromTree(tree, parentSlug, subSlug, locale) {
  if (!parentSlug) return null;
  const parent = tree.find((r) => r.slug === parentSlug);
  if (!parent) {
    return { filterLabel: parentSlug.replace(/-/g, " "), categoryId: null, categoryIds: [], parent: null, child: null };
  }
  if (subSlug) {
    const child = (parent.children || []).find((c) => c.slug === subSlug);
    return {
      filterLabel: child ? categoryLabel(child, locale) : subSlug.replace(/-/g, " "),
      categoryId: child?.id ?? null,
      categoryIds: child?.id ? [child.id] : [],
      parent,
      child: child || null,
    };
  }
  const childIds = (parent.children || []).map((c) => c.id).filter(Boolean);
  return {
    filterLabel: categoryLabel(parent, locale),
    categoryId: parent.id ?? null,
    categoryIds: [parent.id, ...childIds].filter(Boolean),
    parent,
    child: null,
  };
}

export function CatalogProducts({
  page,
  seoCityName,
  categoryTree = [],
  categoryFilter: pathCategoryFilter = null,
  filterCat = "",
  siteLocale = "fr",
  search,
  user,
  userData,
  wishlist,
  addToCart,
  toggleWish,
  openProductUrl,
  openSellerUrl,
  goPage,
}) {
  const { t } = useSiteT(siteLocale);
  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedSearch = useDebounced(search || "", 350);

  const humanPage = Math.max(1, parseInt(searchParams.get("page"), 10) || 1);
  const pageIndex = humanPage - 1;
  const catParam = searchParams.get("categorie") || "";
  const subParam = searchParams.get("sous-categorie") || "";

  const queryCategory = useMemo(
    () => (catParam ? resolveCategoryFromTree(categoryTree, catParam, subParam, siteLocale) : null),
    [catParam, subParam, categoryTree, siteLocale],
  );
  const activeCategory = queryCategory || pathCategoryFilter || null;
  const legacyCat = catParam || pathCategoryFilter ? "" : filterCat;

  const activeParentSlug = catParam || pathCategoryFilter?.parent?.slug || "";
  const activeSubSlug = subParam || pathCategoryFilter?.child?.slug || "";
  const activeLabel = activeCategory?.filterLabel || filterCat || "";

  const hasQuickFilters =
    searchParams.has("ville") ||
    searchParams.has("madein") ||
    searchParams.has("escrow") ||
    searchParams.has("express") ||
    searchParams.has("max_prix");

  const showCurated =
    !debouncedSearch &&
    !activeLabel &&
    pageIndex === 0 &&
    !hasQuickFilters;

  const sigRef = useRef(debouncedSearch);
  useEffect(() => {
    if (sigRef.current === debouncedSearch) return;
    sigRef.current = debouncedSearch;
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete("page");
        return next;
      },
      { replace: true },
    );
  }, [debouncedSearch, setSearchParams]);

  const { products, total, totalPages, isLoading, isPlaceholder, isError } = useCatalogProducts({
    page: pageIndex,
    search: debouncedSearch,
    categoryFilter: activeCategory,
    legacyCat,
  });

  const { products: railProducts, isLoading: railsLoading } = useCatalogRails({
    enabled: showCurated,
  });

  const displayProducts = useMemo(() => {
    if (!hasQuickFilters) return products;
    return applyCatalogQuickFilters(products, searchParams);
  }, [products, searchParams, hasQuickFilters]);

  const setParent = (parentSlug) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("page");
      next.delete("sous-categorie");
      if (parentSlug) next.set("categorie", parentSlug);
      else next.delete("categorie");
      return next;
    });
  };

  const setSub = (subSlug) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("page");
      if (subSlug) next.set("sous-categorie", subSlug);
      else next.delete("sous-categorie");
      return next;
    });
  };

  const goToPage = (nextHuman) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (nextHuman <= 1) next.delete("page");
      else next.set("page", String(nextHuman));
      return next;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="sec anim yorix-page-flow yorix-pro-page catalog-page">
      <CatalogHero
        siteLocale={siteLocale}
        total={total}
        compact={Boolean(activeLabel || debouncedSearch || pageIndex > 0)}
        activeLabel={activeLabel}
        seoCityName={page === "seoCity" ? seoCityName : ""}
      />

      {!activeLabel && !debouncedSearch && goPage && (
        <CatalogHubChips siteLocale={siteLocale} goPage={goPage} />
      )}

      <CategoryFilterPanel
        tree={categoryTree}
        locale={siteLocale}
        parentSlug={activeParentSlug}
        subSlug={activeSubSlug}
        filterCat={catParam ? "" : filterCat}
        onParentChange={setParent}
        onSubChange={setSub}
      />

      {debouncedSearch && (
        <CatalogSearchFilters siteLocale={siteLocale} search={debouncedSearch} />
      )}

      {showCurated && !railsLoading && railProducts.length >= 8 && (
        <CatalogCuratedRails
          products={railProducts}
          siteLocale={siteLocale}
          goPage={goPage}
          user={user}
          userData={userData}
          addToCart={addToCart}
          toggleWish={toggleWish}
          wishlist={wishlist}
          openProductUrl={openProductUrl}
          openSellerUrl={openSellerUrl}
        />
      )}

      <div className="catalog-all-head">
        <h2>{t("catalog:allProducts")}</h2>
        <span className="yorix-catalog-meta">
          {isLoading
            ? "…"
            : hasQuickFilters
              ? t("catalog:resultsCountFiltered", { count: displayProducts.length })
              : t("catalog:resultsCount", { count: total })}
        </span>
        {activeLabel && (
          <button type="button" className="btn-ghost yorix-pill--ghost" onClick={() => setParent("")}>
            ✕ {activeLabel}
          </button>
        )}
      </div>

      {hasQuickFilters && !isLoading && (
        <p className="catalog-filtered-hint" role="note">
          {t("catalog:filteredHint")}
        </p>
      )}

      {isLoading ? (
        <SkeletonRow count={8} />
      ) : isError ? (
        <div className="empty-state">
          <div className="empty-icon">⚠️</div>
          <p>{t("catalog:loadError")}</p>
        </div>
      ) : displayProducts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p>{search ? t("catalog:noProductsSearch", { query: search }) : t("catalog:noProducts")}</p>
        </div>
      ) : (
        <>
          <ProdGrid
            prods={displayProducts}
            user={user}
            userData={userData}
            onAddToCart={addToCart}
            onWish={toggleWish}
            wishlist={wishlist}
            onOpenProductUrl={openProductUrl}
            onOpenSellerUrl={openSellerUrl}
            siteLocale={siteLocale}
          />
          {isPlaceholder && <SkeletonRow count={4} />}

          {totalPages > 1 && !hasQuickFilters && (
            <nav className="catalog-pager" aria-label={t("catalog:paginationAria")}>
              <button
                type="button"
                className="catalog-pager-btn"
                onClick={() => goToPage(humanPage - 1)}
                disabled={pageIndex <= 0 || isPlaceholder}
              >
                ← {t("catalog:prevPage")}
              </button>
              <span className="catalog-pager-status">
                {t("catalog:pageStatus", { current: humanPage, total: totalPages })}
              </span>
              <button
                type="button"
                className="catalog-pager-btn"
                onClick={() => goToPage(humanPage + 1)}
                disabled={humanPage >= totalPages || isPlaceholder}
              >
                {t("catalog:nextPage")} →
              </button>
            </nav>
          )}
        </>
      )}
    </section>
  );
}
