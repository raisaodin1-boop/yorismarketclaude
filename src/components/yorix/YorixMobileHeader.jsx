import { Search, ShoppingCart, LayoutGrid, Menu } from "lucide-react";
import { productMatchesSearch } from "../../lib/productSearch";
import { categoryLabel } from "../../lib/marketplaceCategories";
import { OptimizedImage } from "../OptimizedImage";
import { Package } from "lucide-react";

/** Header mobile 2 lignes — spec Yorix (logo + recherche + panier / catégories + menu). */
export function YorixMobileHeader({
  siteLocale = "fr",
  search,
  setSearch,
  produits = [],
  filterCat,
  setFilterCat,
  categoryTree = [],
  goPage,
  goToCategory,
  onOpenProduct,
  openCart,
  totalQty,
  onOpenCategories,
  onOpenMenu,
}) {
  const localeTag = siteLocale === "en" ? "en-FR" : "fr-FR";
  const t = (fr, en) => (siteLocale === "en" ? en : fr);

  return (
    <div className="yx-mobile-header">
      <div className="yx-mobile-header__row yx-mobile-header__row--1">
        <button type="button" className="yx-mobile-header__logo" onClick={() => goPage("home")} aria-label="Yorix accueil">
          <span className="logo-txt">
            Yo<span>rix</span>
            <sup>CM</sup>
          </span>
        </button>

        <div className="yx-mobile-header__search">
          <Search size={18} strokeWidth={2} className="yx-mobile-header__search-ico" aria-hidden />
          <input
            type="search"
            enterKeyHint="search"
            placeholder={t("Rechercher un produit…", "Search products…")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") goPage("produits");
            }}
            autoComplete="off"
            aria-label={t("Recherche", "Search")}
            aria-expanded={search.trim().length >= 2}
          />
          {search.trim().length >= 2 && (
            <div className="yx-mobile-search-dd" role="listbox">
              {produits
                .filter((p) => productMatchesSearch(p, search))
                .slice(0, 6)
                .map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className="yx-mobile-search-dd__item"
                    onClick={() => {
                      setSearch("");
                      if (onOpenProduct) onOpenProduct(p);
                      else goPage("produits");
                    }}
                  >
                    {(p.image?.startsWith("http") || p.image_urls?.[0]?.startsWith("http")) ? (
                      <OptimizedImage
                        src={p.image?.startsWith("http") ? p.image : p.image_urls?.[0]}
                        alt=""
                        size="thumb"
                        style={{ width: 36, height: 36, minHeight: 36, borderRadius: 8 }}
                      />
                    ) : (
                      <span className="yx-mobile-search-dd__ph">
                        <Package size={16} />
                      </span>
                    )}
                    <span className="yx-mobile-search-dd__txt">
                      <span className="yx-mobile-search-dd__name">{p.name_fr}</span>
                      <span className="yx-mobile-search-dd__price">{p.prix?.toLocaleString(localeTag)} FCFA</span>
                    </span>
                  </button>
                ))}
              {produits.filter((p) => productMatchesSearch(p, search)).length === 0 && (
                <div className="yx-mobile-search-dd__empty">{t("Aucun résultat", "No results")}</div>
              )}
            </div>
          )}
        </div>

        <button type="button" className="yx-mobile-header__cart icon-btn" onClick={openCart} aria-label={t("Panier", "Cart")}>
          <ShoppingCart size={22} strokeWidth={2} aria-hidden />
          {totalQty > 0 && <span className="ibadge ibadge--subtle">{totalQty > 99 ? "99+" : totalQty}</span>}
        </button>
      </div>

      <div className="yx-mobile-header__row yx-mobile-header__row--2">
        <button type="button" className="yx-mobile-header__chip" onClick={onOpenCategories}>
          <LayoutGrid size={16} strokeWidth={2} aria-hidden />
          {t("Catégories", "Categories")}
        </button>
        <select
          className="yx-mobile-header__cat-select"
          value={filterCat}
          onChange={(e) => {
            const v = e.target.value;
            setFilterCat(v);
            const root = categoryTree.find((r) => categoryLabel(r, siteLocale) === v);
            if (root) goToCategory?.({ parentSlug: root.slug });
            else if (!v) goPage("produits");
          }}
          aria-label={t("Filtrer par catégorie", "Filter by category")}
        >
          <option value="">{t("Toutes catégories", "All categories")}</option>
          {categoryTree.slice(0, 8).map((r) => (
            <option key={r.id || r.slug} value={categoryLabel(r, siteLocale)}>
              {categoryLabel(r, siteLocale)}
            </option>
          ))}
        </select>
        <button type="button" className="yx-mobile-header__chip yx-mobile-header__chip--menu" onClick={onOpenMenu}>
          <Menu size={16} strokeWidth={2} aria-hidden />
          {t("Menu", "Menu")}
        </button>
      </div>
    </div>
  );
}
