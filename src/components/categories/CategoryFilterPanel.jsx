import { categoryLabel } from "../../lib/marketplaceCategories";
import "./categoryUi.css";

export function CategoryFilterPanel({
  tree = [],
  locale = "fr",
  parentSlug = "",
  subSlug = "",
  onParentChange,
  onSubChange,
  filterCat = "",
  onLegacyCatChange,
}) {
  const parent = tree.find((r) => r.slug === parentSlug);
  const children = parent?.children || [];

  return (
    <aside className="cat-filter-panel" aria-label={locale === "en" ? "Filters" : "Filtres"}>
      <h3>{locale === "en" ? "Category" : "Catégorie"}</h3>
      <div className="cat-filter-roots">
        <button
          type="button"
          className={`cat-filter-pill${!parentSlug && !filterCat ? " is-active" : ""}`}
          onClick={() => {
            onParentChange?.("");
            onSubChange?.("");
            onLegacyCatChange?.("");
          }}
        >
          {locale === "en" ? "All" : "Tout"}
        </button>
        {tree.map((r) => (
          <button
            key={r.id || r.slug}
            type="button"
            className={`cat-filter-pill${parentSlug === r.slug ? " is-active" : ""}`}
            onClick={() => {
              onParentChange?.(r.slug);
              onSubChange?.("");
              onLegacyCatChange?.(categoryLabel(r, locale));
            }}
          >
            {r.icon} {categoryLabel(r, locale)}
          </button>
        ))}
      </div>
      {parent && children.length > 0 && (
        <>
          <h3>{locale === "en" ? "Subcategory" : "Sous-catégorie"}</h3>
          <div className="cat-filter-roots">
            <button
              type="button"
              className={`cat-filter-pill${parentSlug && !subSlug ? " is-active" : ""}`}
              onClick={() => onSubChange?.("")}
            >
              {locale === "en" ? "All in" : "Tout"} {categoryLabel(parent, locale)}
            </button>
            {children.map((ch) => (
              <button
                key={ch.id || ch.slug}
                type="button"
                className={`cat-filter-pill${subSlug === ch.slug ? " is-active" : ""}`}
                onClick={() => {
                  onSubChange?.(ch.slug);
                  onLegacyCatChange?.(categoryLabel(ch, locale));
                }}
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
