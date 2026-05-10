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
      <section className="sec anim">
        <div className="sec-head">
          <h1 className="sec-title">
            {page === "seoCity" && seoCityName
              ? `🛍️ Achat en ligne à ${seoCityName} — produits marketplace`
              : "🛍️ Marketplace Cameroun — tous les produits"}
          </h1>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: ".8rem", color: "var(--gray)" }}>{produitsFiltres.length} résultat(s)</span>
            {filterCat && (
              <button className="btn-ghost" style={{ fontSize: ".72rem", padding: "4px 10px" }} onClick={() => setFilterCat("")}>
                ✕ {filterCat}
              </button>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 18 }}>
          <button
            onClick={() => setFilterCat("")}
            style={{
              padding: "5px 12px",
              borderRadius: 50,
              border: "1.5px solid var(--border)",
              background: !filterCat ? "var(--green)" : "var(--surface)",
              color: !filterCat ? "#fff" : "var(--ink)",
              font: "600 .72rem 'DM Sans',sans-serif",
              cursor: "pointer",
            }}
          >
            Tout
          </button>
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setFilterCat(c)}
              style={{
                padding: "5px 12px",
                borderRadius: 50,
                border: "1.5px solid var(--border)",
                background: filterCat === c ? "var(--green)" : "var(--surface)",
                color: filterCat === c ? "#fff" : "var(--ink)",
                font: "600 .72rem 'DM Sans',sans-serif",
                cursor: "pointer",
              }}
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
            <p>Aucun produit{search ? ` pour "${search}"` : ""}.</p>
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
