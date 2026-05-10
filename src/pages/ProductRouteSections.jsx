import { ProdGrid } from "../components/ProdGrid";
import { CATS } from "../lib/constants";

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

  if (page === "escrow") {
    return (
      <section className="sec anim">
        <div
          style={{
            background: dark ? "#152118" : "#f0faf4",
            border: `1.5px solid ${dark ? "#2a4030" : "#c0ecd0"}`,
            borderRadius: 14,
            padding: 28,
            marginBottom: 20,
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--green)", color: "#fff", padding: "4px 12px", borderRadius: 50, fontSize: ".7rem", fontWeight: 700, marginBottom: 12 }}>
            🔐 Escrow Yorix
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "var(--ink)", marginBottom: 10, letterSpacing: "-.5px" }}>
            Votre argent protégé jusqu'à la livraison
          </h2>
          <p style={{ color: "var(--gray)", fontSize: ".86rem", lineHeight: 1.75, marginBottom: 20 }}>
            Votre argent reste bloqué chez Yorix jusqu'à ce que vous confirmiez la réception. En cas de litige, nous vous remboursons.
          </p>
          <div className="escrow-steps">
            {[
              { n: 1, t: "Vous commandez", d: "Votre paiement est bloqué · statut : pending" },
              { n: 2, t: "Vendeur expédie", d: "Les fonds passent au statut : sécurisé 🔐" },
              { n: 3, t: "Vous confirmez", d: "Fonds libérés au vendeur · statut : libéré ✅" },
              { n: 4, t: "Litige ? Yorix arbitre", d: "Remboursement sous 48h · statut : remboursé ↩️" },
            ].map((s) => (
              <div key={s.n} className="estep">
                <div className="estep-num">{s.n}</div>
                <div className="estep-text">
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sec-head">
          <h2 className="sec-title">Produits avec protection Escrow</h2>
        </div>
        {produitsLoading ? (
          <div className="loading">
            <div className="spinner" /> Chargement...
          </div>
        ) : (
          <ProdGrid
            prods={produits.filter((p) => p.escrow).slice(0, 10)}
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

  return null;
}
