import { ProdGrid } from "../ProdGrid";

export function CatalogProductRail({
  title,
  subtitle,
  emoji,
  products = [],
  siteLocale = "fr",
  seeAllLabel,
  onSeeAll,
  user,
  userData,
  addToCart,
  toggleWish,
  wishlist,
  openProductUrl,
  openSellerUrl,
}) {
  if (!products.length) return null;

  return (
    <section className="catalog-rail" aria-label={title}>
      <div className="catalog-rail__head">
        <div>
          <h2 className="catalog-rail__title">
            {emoji ? `${emoji} ` : ""}
            {title}
          </h2>
          {subtitle && <p className="catalog-rail__sub">{subtitle}</p>}
        </div>
        {onSeeAll && (
          <button type="button" className="catalog-rail__link" onClick={onSeeAll}>
            {seeAllLabel} →
          </button>
        )}
      </div>
      <div className="catalog-rail-scroll">
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
      </div>
    </section>
  );
}
