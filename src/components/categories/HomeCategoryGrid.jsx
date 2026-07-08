import { categoryLabel } from "../../lib/marketplaceCategories";
import "./categoryUi.css";

/** Catégories mises en avant sur l'accueil — le reste via « Voir toutes » */
export const HOMEPAGE_FEATURED_CATEGORY_SLUGS = [
  "electronique-technologie",
  "mode-beaute",
  "maison-cuisine",
  "alimentation",
  "services",
];

export function HomeCategoryGrid({
  tree = [],
  locale = "fr",
  onCategoryClick,
  onSeeAll,
  title,
  featuredSlugs = HOMEPAGE_FEATURED_CATEGORY_SLUGS,
}) {
  const isEn = locale === "en";
  const bySlug = new Map(tree.map((r) => [r.slug, r]));
  const featured = featuredSlugs.map((slug) => bySlug.get(slug)).filter(Boolean);
  const roots = featured.length > 0 ? featured : tree.slice(0, 5);

  return (
    <section className="sec yhm3-cat-featured yx-reveal" aria-labelledby="home-cat-title">
      <div className="yhm3-cat-featured__head">
        <h2 id="home-cat-title" className="sec-title">
          {title || (isEn ? "Popular categories" : "Catégories populaires")}
        </h2>
        {onSeeAll && (
          <button type="button" className="yhm3-section-link" onClick={onSeeAll}>
            {isEn ? "All categories" : "Voir toutes les catégories"} <span>→</span>
          </button>
        )}
      </div>
      <div className="cat-home-grid cat-home-grid--featured">
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
