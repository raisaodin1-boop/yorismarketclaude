import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { OptimizedImage } from "./OptimizedImage";
import { Stars } from "./Stars";
import { FormulaireAvis } from "./FormulaireAvis";
import { ModalCommander } from "./ModalCommander";
import { optimizeCloudinaryUrl } from "../utils/helpers";

// ─────────────────────────────────────────────────────────────
// COMPOSANT : FICHE PRODUIT DÉTAIL (avec images optimisées)
// ─────────────────────────────────────────────────────────────
export function FicheProduit({ product, user, userData, onClose, onAddToCart, onContactSeller }) {
  const [activeImg, setActiveImg]       = useState(0);
  const [avis, setAvis]                 = useState([]);
  const [showCmdModal, setShowCmdModal] = useState(false);

  const parseImageUrls = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    try { const p = JSON.parse(val); return Array.isArray(p) ? p : []; }
    catch { return []; }
  };

  const imgArr = parseImageUrls(product.image_urls);
  const rawImgs = product.image && product.image.startsWith("http")
    ? [product.image, ...imgArr.filter(u => u && u.startsWith("http") && u !== product.image)]
    : imgArr.filter(u => u && u.startsWith("http"));
  const images = rawImgs.length > 0 ? rawImgs : [];

  // ✅ Image actuellement affichée (selon clic sur miniature)
  const currentImage = images[activeImg] || images[0] || product.image;

  useEffect(() => {
    supabase
      .from("reviews")
      .select("*")
      .eq("product_id", product.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => setAvis(data || []));
  }, [product.id]);

  const avgNote = avis.length
    ? (avis.reduce((a, r) => a + r.note, 0) / avis.length).toFixed(1)
    : product.note || 0;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 40 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "16px" }}>
        <button
          onClick={onClose}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "none", border: "none", cursor: "pointer",
            color: "var(--gray)", fontSize: "14px",
            marginBottom: 16, padding: "8px 0",
          }}
        >
          ← Retour
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>

          {/* ═══════════════ COLONNE GAUCHE : IMAGES ═══════════════ */}
          {images.length > 0 ? (
            <div style={{ marginBottom: 16 }}>
              {/* Image principale optimisée (priority pour chargement rapide) */}
              <div style={{
                background: "var(--surface2)",
                borderRadius: 12,
                overflow: "hidden",
                marginBottom: 12,
                minHeight: 300,
              }}>
                <OptimizedImage
                  src={currentImage}
                  alt={product.name_fr || "Produit Yorix"}
                  width={800}
                  priority={true}
                  fallbackEmoji="📦"
                  objectFit="contain"
                  style={{
                    width: "100%",
                    height: "auto",
                    minHeight: 300,
                    maxHeight: 500,
                  }}
                />
              </div>

              {/* Galerie de miniatures optimisées */}
              {images.length > 1 && (
                <div className="img-gallery" style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  overflowX: "auto",
                  paddingBottom: 4,
                }}>
                  {images.map((url, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`img-gallery-thumb${i === activeImg ? " active" : ""}`}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 8,
                        overflow: "hidden",
                        cursor: "pointer",
                        border: i === activeImg ? "2.5px solid var(--green)" : "2px solid var(--border)",
                        flexShrink: 0,
                        transition: "border-color .15s",
                      }}
                    >
                      <OptimizedImage
                        src={url}
                        alt={`Photo ${i + 1}`}
                        width={140}
                        fallbackEmoji="📦"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div style={{
              height: 300,
              background: "var(--surface2)",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "4rem",
              marginBottom: 16,
            }}>
              📦
            </div>
          )}

          {/* ═══════════════ COLONNE DROITE : INFOS ═══════════════ */}
          <div>
            <div className="modal-title">{product.name_fr}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "6px 0 10px", flexWrap: "wrap" }}>
              <Stars value={Math.round(avgNote)} />
              <span style={{ fontSize: ".75rem", color: "var(--gray)" }}>
                {avgNote} / 5 ({avis.length} avis)
              </span>
              {product.ville && <span className="tag">📍 {product.ville}</span>}
              {product.categorie && <span className="tag">{product.categorie}</span>}
            </div>

            {product.description_fr && (
              <p style={{ fontSize: ".82rem", color: "var(--gray)", lineHeight: 1.75, marginBottom: 12 }}>
                {product.description_fr}
              </p>
            )}

            {product.stock !== undefined && product.stock !== null && (
              <div style={{ marginBottom: 10 }}>
                <span className={`prod-stock ${product.stock > 5 ? "stock-ok" : product.stock > 0 ? "stock-low" : "stock-out"}`}>
                  {product.stock > 5
                    ? `✅ En stock (${product.stock})`
                    : product.stock > 0
                      ? `⚠️ Plus que ${product.stock} en stock !`
                      : "❌ Rupture de stock"}
                </span>
              </div>
            )}

            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.5rem", fontWeight: 800, color: "var(--green)", marginBottom: 14 }}>
              {product.prix?.toLocaleString()}{" "}
              <span style={{ fontSize: ".8rem", fontFamily: "'DM Sans',sans-serif", fontWeight: 400, color: "var(--gray)" }}>FCFA</span>
            </div>

            {product.escrow && (
              <div className="commission-box" style={{ marginBottom: 12 }}>
                <span>🔐 Paiement protégé Escrow Yorix</span>
                <span style={{ fontSize: ".68rem" }}>Fonds libérés à la livraison</span>
              </div>
            )}

            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <button
                className="btn-cmd-sm"
                style={{ flex: 2, padding: "11px", borderRadius: 9 }}
                onClick={() => setShowCmdModal(true)}
              >
                ✅ Commander
              </button>
              {onAddToCart && (
                <button
                  onClick={() => { onAddToCart(product); onClose(); }}
                  style={{
                    background: "var(--green)", color: "#fff", border: "none",
                    borderRadius: 9, padding: "11px 16px",
                    cursor: "pointer", fontSize: ".85rem", fontWeight: 700,
                  }}
                >
                  🛒
                </button>
              )}
            </div>

            {/* ═══ BOUTON CONTACTER LE VENDEUR ═══ */}
            {onContactSeller && product.vendeur_id && user?.id !== product.vendeur_id && (
              <button
                onClick={() => onContactSeller(product)}
                style={{
                  width: "100%",
                  background: "var(--surface2)",
                  color: "var(--ink)",
                  border: "1.5px solid var(--green)",
                  borderRadius: 9,
                  padding: "11px",
                  cursor: "pointer",
                  fontSize: ".85rem",
                  fontWeight: 700,
                  fontFamily: "'Syne',sans-serif",
                  marginBottom: 16,
                  transition: "all .2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
                onMouseOver={e => { e.currentTarget.style.background = "var(--green)"; e.currentTarget.style.color = "#fff"; }}
                onMouseOut={e => { e.currentTarget.style.background = "var(--surface2)"; e.currentTarget.style.color = "var(--ink)"; }}
              >
                💬 Contacter le vendeur {product.vendeur_nom ? `(${product.vendeur_nom})` : ""}
              </button>
            )}

            <div className="divider-h" />

            <div className="avis-section">
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".95rem", color: "var(--ink)", marginBottom: 12 }}>
                💬 Avis clients ({avis.length})
              </div>
              {user && (
                <FormulaireAvis
                  productId={product.id}
                  userId={user.id}
                  userName={userData?.nom || user.email}
                  onSubmit={newAvis => setAvis(prev => [{ ...newAvis, id: Date.now() }, ...prev])}
                />
              )}
              {avis.length === 0 ? (
                <div style={{ fontSize: ".8rem", color: "var(--gray)", textAlign: "center", padding: "12px 0" }}>
                  Aucun avis pour l'instant.
                </div>
              ) : (
                avis.map(a => (
                  <div key={a.id} className="avis-card">
                    <div className="avis-header">
                      <div>
                        <span className="avis-auteur">{a.auteur}</span>
                        <Stars value={a.note} />
                      </div>
                      <span className="avis-date">
                        {a.created_at ? new Date(a.created_at).toLocaleDateString("fr-FR") : ""}
                      </span>
                    </div>
                    <p className="avis-texte">{a.texte}</p>
                  </div>
                ))
              )}
            </div>

            {showCmdModal && (
              <ModalCommander
                product={product}
                user={user}
                userData={userData}
                onClose={() => setShowCmdModal(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
