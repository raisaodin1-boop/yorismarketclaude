import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProdGrid } from "../ProdGrid";
import { CategoryFilterPanel } from "../categories/CategoryFilterPanel";
import { SkeletonCard } from "../SkeletonCard";
import { useCatalogProducts } from "../../hooks/useCatalogProducts";
import { categoryLabel } from "../../lib/marketplaceCategories";

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

// Slug catégorie (?categorie=) → filtre, résolu depuis l'arbre (id taxonomie + libellé).
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
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedSearch = useDebounced(search || "", 350);

  const humanPage = Math.max(1, parseInt(searchParams.get("page"), 10) || 1);
  const pageIndex = humanPage - 1;
  const catParam = searchParams.get("categorie") || "";
  const subParam = searchParams.get("sous-categorie") || "";

  // Catégorie : ?categorie= prioritaire, sinon route SEO (path), sinon libellé legacy.
  const queryCategory = useMemo(
    () => (catParam ? resolveCategoryFromTree(categoryTree, catParam, subParam, siteLocale) : null),
    [catParam, subParam, categoryTree, siteLocale]
  );
  const activeCategory = queryCategory || pathCategoryFilter || null;
  const legacyCat = catParam || pathCategoryFilter ? "" : filterCat;

  const activeParentSlug = catParam || pathCategoryFilter?.parent?.slug || "";
  const activeSubSlug = subParam || pathCategoryFilter?.child?.slug || "";
  const activeLabel = activeCategory?.filterLabel || filterCat || "";

  // Retour page 1 quand la recherche change (les changements de catégorie passent par setParent/setSub).
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
      { replace: true }
    );
  }, [debouncedSearch, setSearchParams]);

  const { products, total, totalPages, isLoading, isPlaceholder, isError } = useCatalogProducts({
    page: pageIndex,
    search: debouncedSearch,
    categoryFilter: activeCategory,
    legacyCat,
  });

  // Un clic = un seul setSearchParams (le panneau n'appelle qu'un callback à la fois).
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

  const title =
    page === "seoCity" && seoCityName
      ? `🛍️ Achat en ligne à ${seoCityName} — produits marketplace`
      : "🛍️ Marketplace Cameroun — tous les produits";

  return (
    <section className="sec anim yorix-page-flow yorix-pro-page">
      <div className="sec-head yorix-catalog-head">
        <h1 className="sec-title">{title}</h1>
        <div className="yorix-sec-toolbar-end" style={{ flexWrap: "wrap", justifyContent: "flex-end" }}>
          <span className="yorix-catalog-meta">{isLoading ? "…" : `${total} résultat(s)`}</span>
          {activeLabel && (
            <button type="button" className="btn-ghost yorix-pill--ghost" onClick={() => setParent("")}>
              ✕ {activeLabel}
            </button>
          )}
        </div>
      </div>

      <CategoryFilterPanel
        tree={categoryTree}
        locale={siteLocale}
        parentSlug={activeParentSlug}
        subSlug={activeSubSlug}
        filterCat={catParam ? "" : filterCat}
        onParentChange={setParent}
        onSubChange={setSub}
      />

      {isLoading ? (
        <SkeletonRow count={8} />
      ) : isError ? (
        <div className="empty-state">
          <div className="empty-icon">⚠️</div>
          <p>Impossible de charger les produits. Réessaie dans un instant.</p>
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p>Aucun produit{search ? ` pour « ${search} »` : ""}.</p>
        </div>
      ) : (
        <>
          <ProdGrid
            prods={products}
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

          {totalPages > 1 && (
            <nav className="catalog-pager" aria-label="Pagination catalogue">
              <button
                type="button"
                className="catalog-pager-btn"
                onClick={() => goToPage(humanPage - 1)}
                disabled={pageIndex <= 0 || isPlaceholder}
              >
                ← Précédent
              </button>
              <span className="catalog-pager-status">
                Page {humanPage} / {totalPages}
              </span>
              <button
                type="button"
                className="catalog-pager-btn"
                onClick={() => goToPage(humanPage + 1)}
                disabled={humanPage >= totalPages || isPlaceholder}
              >
                Suivant →
              </button>
            </nav>
          )}
        </>
      )}
    </section>
  );
}
