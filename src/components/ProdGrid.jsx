import { useState } from "react";
import { Stars } from "./Stars";
import { FicheProduit } from "./FicheProduit";
import { ModalCommander } from "./ModalCommander";

// ─────────────────────────────────────────────────────────────
// COMPOSANT : GRILLE PRODUITS
// ─────────────────────────────────────────────────────────────
export function ProdGrid({ prods, user, userData, onAddToCart, onWish, wishlist, onOpenProd }) {
  const [ficheOpen, setFicheOpen] = useState(null);
  const [cmdOpen, setCmdOpen]     = useState(null);

  // ── Image sécurisée
  const getSafeImg = (p) => {
    if (p.image && p.image.startsWith("http")) return p.image;
    if (p.image_urls && p.image_urls[0] && p.image_urls[0].startsWith("http")) return p.image_urls[0];
    return null;
  };

  // ── Badges vendeur
  const getVendeurBadges = (p) => {
    const badges = [];
    if (p.sponsorise)                   badges.push({ label: "⭐ Top Vendeur",   cls: "badge-top" });
    if (p.verifie || p.vendeur_verifie) badges.push({ label: "✅ Vérifié",        cls: "badge-verif" });
    if (p.promo)                        badges.push({ label: "🔥 Promo du jour", cls: "badge-promo" });
    if (p.flash)                        badges.push({ label: "⚡ Offre flash",   cls: "badge-flash" });
    if (p.vente_total > 50)             badges.push({ label: "🏆 Best seller",   cls: "badge-best" });
    return badges;
  };

  return (
    <>
      <div className="prod-grid">
        {prods.map(p => {
          const safeImg    = getSafeImg(p);
          const stockClass = p.stock > 5 ? "stock-ok" : p.stock > 0 ? "stock-low" : "stock-out";
          const vendBadges = getVendeurBadges(p);
          const prixPromo  = p.promo_pct ? Math.round(p.prix * (1 - p.promo_pct / 100)) : null;

          return (
            <div key={p.id} className={`prod-card${p.flash ? " prod-card-flash" : ""}`}>
              {/* ── IMAGE ── */}
              <div className="prod-img-wrap" onClick={() => setFicheOpen(p)}>
                {safeImg ? (
                  <img
                    src={safeImg}
                    alt={p.name_fr}
                    onError={e => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://via.placeholder.com/300?text=📦";
                    }}
                  />
                ) : (
                  <div className="prod-img-placeholder">📦</div>
                )}
                {p.flash                             && <span className="pbadge-flash">⚡ Flash</span>}
                {!p.flash && p.promo                 && <span className="pbadge-promo">-{p.promo_pct || 20}%</span>}
                {!p.flash && !p.promo && p.sponsorise && <span className="pbadge-r">⭐ Top</span>}
                {p.local                             && <span className="pbadge-y">🇨🇲</span>}
                {p.escrow                            && <span className="escrow-badge">🔐</span>}
                <button
                  className="wish-btn"
                  onClick={e => { e.stopPropagation(); onWish(p.id); }}
                >
                  {wishlist.has(p.id) ? "❤️" : "🤍"}
                </button>
              </div>

              {/* ── INFOS ── */}
              <div className="prod-info" onClick={() => setFicheOpen(p)}>
                {vendBadges.length > 0 && (
                  <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginBottom: 4 }}>
                    {vendBadges.map(b => (
                      <span key={b.label} className={`vendor-badge ${b.cls}`}>{b.label}</span>
                    ))}
                  </div>
                )}

                <div className="prod-name">{p.name_fr}</div>
                <div className="prod-loc">📍 {p.ville || "Cameroun"} · {p.vendeur_nom || ""}</div>

                <div className="prod-badge-row">
                  {p.stock > 0 && p.stock <= 5 && <span className="pb pb-fire">🔥 Stock limité</span>}
                  <span className="pb pb-truck">🚚 Livraison rapide</span>
                  <span className="pb pb-cash">💰 Paiement livraison</span>
                </div>

                {p.description_fr && <div className="prod-desc">{p.description_fr}</div>}

                {p.stock !== undefined && p.stock !== null && (
                  <div className={`prod-stock ${stockClass}`} style={{ fontSize: ".65rem" }}>
                    {p.stock > 5
                      ? `✅ ${p.stock} en stock`
                      : p.stock > 0
                        ? `⚠️ ${p.stock} restant(s)`
                        : "❌ Rupture"}
                  </div>
                )}

                <div className="prod-rating">
                  <Stars value={Math.round(p.note || 0)} />
                  <span className="rcount">({p.nombre_avis || 0})</span>
                </div>

                <div className="prod-price-row">
                  <div>
                    {prixPromo ? (
                      <>
                        <span className="price">
                          {prixPromo.toLocaleString()} <span className="price-unit">FCFA</span>
                        </span>
                        <span style={{ fontSize: ".65rem", color: "var(--gray)", textDecoration: "line-through", marginLeft: 5 }}>
                          {p.prix?.toLocaleString()}
                        </span>
                      </>
                    ) : (
                      <span className="price">
                        {p.prix?.toLocaleString()} <span className="price-unit">FCFA</span>
                      </span>
                    )}
                  </div>
                  <button
                    className="add-btn"
                    onClick={e => { e.stopPropagation(); onAddToCart(p); }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ── BOUTON PANIER ── */}
              <div className="prod-actions" style={{ padding: "0 11px 11px" }}>
                <button
                  className="add-btn"
                  style={{
                    width: "100%", padding: "8px", borderRadius: 8, fontSize: ".78rem",
                    fontFamily: "'Syne',sans-serif", fontWeight: 700,
                    background: "var(--green)", color: "#fff", border: "none",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                  }}
                  onClick={e => { e.stopPropagation(); onAddToCart(p); }}
                >
                  🛒 Ajouter au panier
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {ficheOpen && (
        <FicheProduit
          product={ficheOpen}
          user={user}
          userData={userData}
          onClose={() => setFicheOpen(null)}
          onAddToCart={onAddToCart}
        />
      )}
      {cmdOpen && (
        <ModalCommander
          product={cmdOpen}
          user={user}
          userData={userData}
          onClose={() => setCmdOpen(null)}
        />
      )}
    </>
  );
}
