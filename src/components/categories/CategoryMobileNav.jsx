import { categoryLabel } from "../../lib/marketplaceCategories";
import "./categoryUi.css";

export function CategoryMobileNav({ tree = [], locale = "fr", onNavigate }) {
  return (
    <nav className="cat-mobile-acc" aria-label={locale === "en" ? "Categories" : "Catégories"}>
      {tree.map((root) => (
        <details key={root.id || root.slug}>
          <summary>
            {root.icon} {categoryLabel(root, locale)}
          </summary>
          <div className="cat-mobile-subs">
            <button type="button" onClick={() => onNavigate?.({ parentSlug: root.slug })}>
              {locale === "en" ? "All" : "Tout"}
            </button>
            {(root.children || []).map((ch) => (
              <button
                key={ch.id || ch.slug}
                type="button"
                onClick={() => onNavigate?.({ parentSlug: root.slug, subSlug: ch.slug })}
              >
                {categoryLabel(ch, locale)}
              </button>
            ))}
          </div>
        </details>
      ))}
    </nav>
  );
}
