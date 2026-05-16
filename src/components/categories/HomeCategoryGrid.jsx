import { categoryLabel } from "../../lib/marketplaceCategories";
import "./categoryUi.css";

export function HomeCategoryGrid({ tree = [], locale = "fr", onCategoryClick, title }) {
  const roots = tree.slice(0, 15);
  return (
    <section className="sec" aria-labelledby="home-cat-title">
      <h2 id="home-cat-title" className="sec-title">
        {title || (locale === "en" ? "Shop by category" : "Acheter par catégorie")}
      </h2>
      <div className="cat-home-grid">
        {roots.map((r) => (
          <button
            key={r.id || r.slug}
            type="button"
            className="cat-home-tile"
            onClick={() => onCategoryClick?.({ parentSlug: r.slug })}
          >
            <span className="ico">{r.icon || "📦"}</span>
            <span>{categoryLabel(r, locale)}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
