import { useMemo, useState } from "react";
import { categoryLabel } from "../../lib/marketplaceCategories";
import {
  CATALOG_FEATURED_CATEGORY_SLUGS,
  CATALOG_MAX_VISIBLE_CATEGORIES,
} from "../../lib/catalogFeaturedCategories";
import "./categoryUi.css";

export function CategoryFilterPanel({
  tree = [],
  locale = "fr",
  parentSlug = "",
  subSlug = "",
  onParentChange,
  onSubChange,
  filterCat = "",
  maxVisible = CATALOG_MAX_VISIBLE_CATEGORIES,
}) {
  const [expanded, setExpanded] = useState(false);
  const parent = tree.find((r) => r.slug === parentSlug);
  const children = parent?.children || [];
  const isEn = locale === "en";

  const visibleRoots = useMemo(() => {
    if (expanded) return tree;

    const bySlug = new Map(tree.map((r) => [r.slug, r]));
    const featured = CATALOG_FEATURED_CATEGORY_SLUGS.map((s) => bySlug.get(s)).filter(Boolean);
    const base = featured.length >= 4 ? featured : tree.slice(0, maxVisible);
    const slice = base.slice(0, maxVisible);

    if (parentSlug && !slice.some((r) => r.slug === parentSlug)) {
      const active = bySlug.get(parentSlug);
      if (active) return [...slice.slice(0, maxVisible - 1), active];
    }
    return slice;
  }, [tree, expanded, maxVisible, parentSlug]);

  const hasMore = tree.length > maxVisible;

  return (
    <aside className="cat-filter-panel" aria-label={isEn ? "Filters" : "Filtres"}>
      <h3>{isEn ? "Category" : "Catégorie"}</h3>
      <div className="cat-filter-roots">
        <button
          type="button"
          className={`cat-filter-pill${!parentSlug && !filterCat ? " is-active" : ""}`}
          onClick={() => onParentChange?.("")}
        >
          {isEn ? "All" : "Tout"}
        </button>
        {visibleRoots.map((r) => (
          <button
            key={r.id || r.slug}
            type="button"
            className={`cat-filter-pill${parentSlug === r.slug ? " is-active" : ""}`}
            onClick={() => onParentChange?.(r.slug)}
          >
            {r.icon} {categoryLabel(r, locale)}
          </button>
        ))}
        {hasMore && !expanded && (
          <button
            type="button"
            className="cat-filter-pill cat-filter-more"
            onClick={() => setExpanded(true)}
          >
            {isEn ? "See +" : "Voir +"}
          </button>
        )}
        {expanded && hasMore && (
          <button
            type="button"
            className="cat-filter-pill cat-filter-more"
            onClick={() => setExpanded(false)}
          >
            {isEn ? "Less −" : "Moins −"}
          </button>
        )}
      </div>
      {parent && children.length > 0 && (
        <>
          <h3>{isEn ? "Subcategory" : "Sous-catégorie"}</h3>
          <div className="cat-filter-roots">
            <button
              type="button"
              className={`cat-filter-pill${parentSlug && !subSlug ? " is-active" : ""}`}
              onClick={() => onSubChange?.("")}
            >
              {isEn ? "All in" : "Tout"} {categoryLabel(parent, locale)}
            </button>
            {children.map((ch) => (
              <button
                key={ch.id || ch.slug}
                type="button"
                className={`cat-filter-pill${subSlug === ch.slug ? " is-active" : ""}`}
                onClick={() => onSubChange?.(ch.slug)}
              >
                {categoryLabel(ch, locale)}
              </button>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
