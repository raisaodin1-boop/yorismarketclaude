import { ProdGrid } from "../components/ProdGrid";
import { CATS } from "../lib/constants";
import { EscrowPremiumPage } from "./EscrowPremiumPage";

export function ProductRouteSections({
  showProduits,
  page,
  seoCityName,
  produitsFiltres,
  produitsLoading,
  produits,
  filterCat,
  setFilterCat,
  search,
  user,
  userData,
  wishlist,
  addToCart,
  toggleWish,
  openProductUrl,
  dark,
  goPage,
}) {
  if (showProduits) {
    return (
      <section className="sec anim yorix-page-flow yorix-pro-page">
        <div className="sec-head yorix-catalog-head">
          <h1 className="sec-title">
            {page === "seoCity" && seoCityName
              ? `🛍️ Achat en ligne à ${seoCityName} — produits marketplace`
              : "🛍️ Marketplace Cameroun — tous les produits"}
          </h1>
          <div className="yorix-sec-toolbar-end" style={{ flexWrap: "wrap", justifyContent: "flex-end" }}>
            <span className="yorix-catalog-meta">{produitsFiltres.length} résultat(s)</span>
            {filterCat && (
              <button type="button" className="btn-ghost yorix-pill--ghost" onClick={() => setFilterCat("")}>
                ✕ {filterCat}
              </button>
            )}
          </div>
        </div>
        <div className="yorix-pill-row" role="tablist" aria-label="Catégories">
          <button
            type="button"
            className={`yorix-pill${!filterCat ? " is-active" : ""}`}
            onClick={() => setFilterCat("")}
          >
            Tout
          </button>
          {CATS.map((c) => (
            <button
              key={c}
              type="button"
              className={`yorix-pill${filterCat === c ? " is-active" : ""}`}
              onClick={() => setFilterCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
        {produitsLoading ? (
          <div className="loading">
            <div className="spinner" /> Chargement...
          </div>
        ) : produitsFiltres.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p>Aucun produit{search ? ` pour « ${search} »` : ""}.</p>
          </div>
        ) : (
          <ProdGrid
            prods={produitsFiltres}
            user={user}
            userData={userData}
            onAddToCart={addToCart}
            onWish={toggleWish}
            wishlist={wishlist}
            onOpenProductUrl={openProductUrl}
          />
        )}
      </section>
    );
  }

  if (page === "escrow" && typeof goPage === "function") {
    return (
      <EscrowPremiumPage
        dark={dark}
        produitsLoading={produitsLoading}
        produits={produits}
        user={user}
        userData={userData}
        wishlist={wishlist}
        addToCart={addToCart}
        toggleWish={toggleWish}
        openProductUrl={openProductUrl}
        goPage={goPage}
      />
    );
  }

  return null;
}
