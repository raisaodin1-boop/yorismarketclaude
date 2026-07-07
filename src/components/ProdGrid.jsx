import { useState, useCallback, lazy, Suspense } from "react";
import { VariantPickerModal } from "./VariantPickerModal";
import { ShoppingCart, MessageCircle, Lock, Flame, Zap, Star, Trophy, BadgeCheck, Truck, Banknote, ShieldCheck, Clock, Package } from "lucide-react";
import { showAppToast } from "../lib/appToast";
import { OptimizedImage } from "./OptimizedImage";
import { MadeInCameroonBadge } from "./MadeInCameroonBadge";
import { isImportProduct } from "../lib/importWholesale";
import { VerifiedSellerBadge } from "./seller/VerifiedSellerBadge";
import {
  wholesalePriceSummary,
  nextWholesaleTierHint,
  importLogisticsHint,
  buildWholesaleWhatsAppText,
} from "../lib/wholesaleCardMeta";
import { openWhatsAppShare, buildProductWhatsAppText } from "../lib/shareUtils";
import { resolveMadeInCameroon } from "../lib/madeInCameroon";
import { Stars } from "./Stars";
import { ModalCommander } from "./ModalCommander";
import { SocialProofLine } from "./conversion/SocialProofLine";
import { isPurchasable } from "../lib/stockStatus";
import { effectiveProductPrice, isPromoActive, productPromoListPrice } from "../lib/productPricing";
import {
  productMoqLabel,
  productDeliveryShort,
  productProtectScore,
} from "../lib/productCardMeta";
import { formatProductDisplayName } from "../lib/productDisplayName";
import "../components/yorix/marketplaceHeader.css";

const LazyFicheProduit = lazy(() =>
  import("./FicheProduit").then((m) => ({ default: m.FicheProduit }))
);

// ─────────────────────────────────────────────────────────────
// COMPOSANT : GRILLE PRODUITS (avec images optimisées Cloudinary)
// ─────────────────────────────────────────────────────────────
export function ProdGrid({
  prods,
  user,
  userData,
  onAddToCart,
  onWish,
  wishlist,
  onOpenProd,
  onOpenProductUrl,
  onOpenSellerUrl,
  siteLocale = "fr",
  showShare = false,
  wholesaleMode = false,
  madeInMode = false,
}) {
  const [ficheOpen, setFicheOpen]           = useState(null);
  const [cmdOpen, setCmdOpen]               = useState(null);
  const [addedIds, setAddedIds]             = useState(new Set());
  const [variantPickerProd, setVariantPickerProd] = useState(null);

  const handleAdd = useCallback((p, variant = null) => {
    if (!isPurchasable(p)) return;
    if (p.has_variants && Array.isArray(p.variants) && p.variants.length > 0 && !variant) {
      setVariantPickerProd(p);
      return;
    }
    const cartProduct = variant
      ? { ...p, prix: variant.prix, stock: variant.stock, _variantId: variant.id, _variantLabel: variant.label }
      : p;
    onAddToCart(cartProduct);
    showAppToast(`✓ ${(p.name_fr || "Produit").slice(0, 32)} ajouté au panier`, "success", 2200);
    setAddedIds((prev) => {
      const next = new Set(prev);
      next.add(p.id);
      setTimeout(() => setAddedIds((s) => { const c = new Set(s); c.delete(p.id); return c; }), 1200);
      return next;
    });
  }, [onAddToCart]);

  // ── Image sécurisée
  const getSafeImg = (p) => {
    if (p.image && p.image.startsWith("http")) return p.image;
    if (p.image_urls && p.image_urls[0] && p.image_urls[0].startsWith("http")) return p.image_urls[0];
    return null;
  };

  // ── Badges vendeur
  const getVendeurBadges = (p) => {
    const badges = [];
    if (p.sponsorise)                   badges.push({ label: "Top Vendeur",   cls: "badge-top",   icon: Star });
    if (isPromoActive(p))               badges.push({ label: "Promo du jour", cls: "badge-promo", icon: Flame });
    if (p.flash)                        badges.push({ label: "Offre flash",   cls: "badge-flash", icon: Zap });
    if (p.vente_total > 50)             badges.push({ label: "Best seller",   cls: "badge-best",  icon: Trophy });
    return badges;
  };

  return (
    <>
      <div className="prod-grid">
        {prods.map((p, i) => {
          const safeImg    = getSafeImg(p);
          const stockClass = p.stock > 5 ? "stock-ok" : p.stock > 0 ? "stock-low" : "stock-out";
          const vendBadges = getVendeurBadges(p);
          const prixPromo  = isPromoActive(p) ? effectiveProductPrice(p) : null;
          const prixBarre  = productPromoListPrice(p);
          const buyable    = isPurchasable(p);
          const wholesaleSummary = wholesaleMode ? wholesalePriceSummary(p) : null;
          const tierHint = wholesaleMode ? nextWholesaleTierHint(p, siteLocale) : null;
          const importHint = wholesaleMode && isImportProduct(p) ? importLogisticsHint(p, siteLocale) : null;
          const compactList = !wholesaleMode;
          const displayName = formatProductDisplayName(p.name_fr);

          return (
            <div key={p.id} className={`prod-card${p.flash ? " prod-card-flash" : ""}${wholesaleMode ? " prod-card--wholesale" : " prod-card--compact"}${madeInMode ? " prod-card--made-in" : ""}`}>
              {/* ── IMAGE OPTIMISÉE (lazy + WebP + compression auto) ── */}
              <div
                className="prod-img-wrap"
                onClick={() => {
                  if (onOpenProductUrl) onOpenProductUrl(p);
                  else setFicheOpen(p);
                }}
              >
                <OptimizedImage
                  src={safeImg}
                  alt={p.name_fr || "Produit Yorix"}
                  size="card"
                  priority={i < 4}
                  fallbackEmoji="📦"
                  style={{ width: "100%", height: "100%" }}
                />
                {p.flash && !compactList && <span className="pbadge-flash"><Zap size={10} strokeWidth={2.5} aria-hidden /> Flash</span>}
                {!compactList && !p.flash && isPromoActive(p) && <span className="pbadge-promo">-{p.promo_pct || 15}%</span>}
                {!compactList && !p.flash && !isPromoActive(p) && p.sponsorise && <span className="pbadge-r"><Star size={10} strokeWidth={2.5} aria-hidden /> Top</span>}
                {!compactList && resolveMadeInCameroon(p).show && <MadeInCameroonBadge product={p} size="sm" />}
                {!compactList && (p.b2b_enabled || isImportProduct(p)) && (
                  <span className={`b2b-card-badge${wholesaleMode ? " b2b-card-badge--wholesale" : ""}`}>
                    {p.b2b_enabled ? "GROS" : "IMPORT"}
                  </span>
                )}
                {wholesaleMode && (p.vendeur_verifie || p.verifie) && (
                  <span className="b2b-certified-badge" title={siteLocale === "en" ? "Yorix certified supplier" : "Fournisseur certifié Yorix"}>
                    <BadgeCheck size={11} strokeWidth={2.5} aria-hidden />
                    {siteLocale === "en" ? "Certified" : "Certifié"}
                  </span>
                )}
                {!compactList && p.escrow && <span className="escrow-badge" title="Escrow"><Lock size={12} strokeWidth={2.5} aria-hidden /></span>}
                {!buyable && (
                  <span
                    style={{
                      position: "absolute", top: 8, left: 8, zIndex: 3,
                      background: "rgba(206,17,38,.92)", color: "#fff",
                      padding: "3px 9px", borderRadius: 999, fontSize: ".62rem",
                      fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: ".02em",
                      boxShadow: "0 4px 12px rgba(206,17,38,.35)",
                    }}
                  >
                    Rupture
                  </span>
                )}
                <button
                  className={`wish-btn${compactList ? " wish-btn--compact" : ""}`}
                  aria-label={siteLocale === "en" ? "Wishlist" : "Liste de souhaits"}
                  onClick={e => { e.stopPropagation(); onWish(p.id); }}
                >
                  {wishlist.has(p.id) ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#e11d48" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  )}
                </button>
                {compactList && (
                  <button
                    className="add-btn add-btn--overlay"
                    disabled={!buyable}
                    aria-disabled={!buyable}
                    aria-label={buyable ? (siteLocale === "en" ? "Add to cart" : "Ajouter au panier") : (siteLocale === "en" ? "Unavailable" : "Indisponible")}
                    onClick={(e) => { e.stopPropagation(); handleAdd(p); }}
                  >
                    +
                  </button>
                )}
              </div>

              {/* ── INFOS ── */}
              <div
                className="prod-info"
                onClick={() => {
                  if (onOpenProductUrl) onOpenProductUrl(p);
                  else setFicheOpen(p);
                }}
              >
                {compactList ? (
                  <>
                    <div className="prod-name prod-name--rule3">{displayName}</div>
                    <div className="prod-price-row prod-price-row--rule3">
                      {prixPromo ? (
                        <>
                          <span className="price">
                            {prixPromo.toLocaleString()} <span className="price-unit">FCFA</span>
                          </span>
                          <span className="prod-price-was">{p.prix?.toLocaleString()} F</span>
                        </>
                      ) : (
                        <span className="price">
                          {p.prix?.toLocaleString()} <span className="price-unit">FCFA</span>
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                {vendBadges.length > 0 && (
                  <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginBottom: 4 }}>
                    {vendBadges.map(b => (
                      <span key={b.label} className={`vendor-badge ${b.cls}`} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                        {b.icon && <b.icon size={12} strokeWidth={2.25} aria-hidden />}
                        {b.label}
                      </span>
                    ))}
                  </div>
                )}

                <div className="prod-name">{displayName}</div>
                <div className="prod-loc">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {p.ville || "Cameroun"}
                  {p.vendeur_nom && (
                    <>
                      {" · "}
                      {onOpenSellerUrl && p.vendeur_id ? (
                        <button
                          type="button"
                          className="prod-seller-link"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenSellerUrl(p);
                          }}
                        >
                          {p.vendeur_nom}
                        </button>
                      ) : (
                        p.vendeur_nom
                      )}
                    </>
                  )}
                </div>

                <div className="prod-enriched-row" aria-label={siteLocale === "en" ? "Product trust" : "Confiance produit"}>
                  <span className="prod-enriched-chip prod-enriched-chip--moq">
                    <Package size={10} aria-hidden />
                    {productMoqLabel(p, siteLocale)}
                  </span>
                  {!wholesaleMode && (
                    <>
                      <span className="prod-enriched-chip prod-enriched-chip--delivery">
                        <Clock size={10} aria-hidden />
                        {productDeliveryShort(p, siteLocale)}
                      </span>
                      <span className="prod-enriched-chip prod-enriched-chip--protect">
                        <ShieldCheck size={10} aria-hidden />
                        Protect+ {productProtectScore(p)}%
                      </span>
                    </>
                  )}
                  {wholesaleMode && p.escrow && (
                    <span className="prod-enriched-chip prod-enriched-chip--escrow">
                      <Lock size={10} aria-hidden />
                      Escrow
                    </span>
                  )}
                  {(p.vendeur_verifie || p.verifie) && (
                    <VerifiedSellerBadge verified compact locale={siteLocale} />
                  )}
                </div>

                {importHint && (
                  <div className="prod-wholesale-logistics">
                    <span title={importHint.escrow}>🛡️ {importHint.escrow}</span>
                    <span>🚢 {importHint.lead} · {importHint.incoterm}</span>
                    <span>📋 {importHint.customs}</span>
                  </div>
                )}

                {tierHint && (
                  <div className="prod-wholesale-tier">
                    <div className="prod-wholesale-tier__bar" aria-hidden>
                      <span style={{ width: `${tierHint.progressPct}%` }} />
                    </div>
                    <span className="prod-wholesale-tier__lbl">{tierHint.label}</span>
                  </div>
                )}

                {!wholesaleMode && <SocialProofLine product={p} locale={siteLocale} />}

                {!wholesaleMode && (
                <div className="prod-badge-row">
                  {p.stock > 0 && p.stock <= 5 && <span className="pb pb-fire"><Flame size={11} aria-hidden /> Stock limité</span>}
                  <span className="pb pb-truck"><Truck size={11} aria-hidden /> Livraison rapide</span>
                  <span className="pb pb-cash"><Banknote size={11} aria-hidden /> Paiement livraison</span>
                </div>
                )}

                {!wholesaleMode && p.description_fr && <div className="prod-desc">{p.description_fr}</div>}

                {p.stock !== undefined && p.stock !== null && (
                  <div className={`prod-stock ${stockClass}`} style={{ fontSize: ".65rem" }}>
                    {p.stock > 5
                      ? `${p.stock} en stock`
                      : p.stock > 0
                        ? `${p.stock} restant(s)`
                        : "Rupture de stock"}
                  </div>
                )}

                {p.nombre_avis > 0 && (
                <div className="prod-rating">
                  <Stars value={Math.round(p.note || 0)} />
                  <span className="rcount">({p.nombre_avis})</span>
                </div>
                )}

                <div className="prod-price-row">
                  <div>
                    {wholesaleSummary && wholesaleSummary.wholesale > 0 ? (
                      <div className="prod-wholesale-prices">
                        {wholesaleSummary.retail > 0 && wholesaleSummary.retail !== wholesaleSummary.wholesale && (
                          <div className="prod-wholesale-prices__retail">
                            {siteLocale === "en" ? "Retail" : "Détail"} :{" "}
                            <s>{wholesaleSummary.retail.toLocaleString()} F</s>
                          </div>
                        )}
                        <div className="prod-wholesale-prices__gros">
                          <span className="price">
                            {wholesaleSummary.wholesale.toLocaleString()}{" "}
                            <span className="price-unit">FCFA</span>
                          </span>
                          <span className="prod-wholesale-prices__moq">
                            / {siteLocale === "en" ? "unit" : "unité"} ({wholesaleSummary.moq}+)
                          </span>
                        </div>
                        {wholesaleSummary.savingsPct != null && wholesaleSummary.savingsPct > 0 && (
                          <span className="prod-wholesale-savings">−{wholesaleSummary.savingsPct}% marge</span>
                        )}
                      </div>
                    ) : prixPromo ? (
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
                  {!wholesaleMode && (
                  <button
                    className="add-btn"
                    disabled={!buyable}
                    aria-disabled={!buyable}
                    title={buyable ? "Ajouter au panier" : "Produit indisponible"}
                    style={!buyable ? { opacity: 0.45, cursor: "not-allowed" } : undefined}
                    onClick={e => { e.stopPropagation(); handleAdd(p); }}
                  >
                    +
                  </button>
                  )}
                </div>
                  </>
                )}
              </div>

              {wholesaleMode && (
              <div className="prod-actions" style={{ padding: "0 11px 11px", display: "flex", flexDirection: "column", gap: 6 }}>
                    <button
                      type="button"
                      className="add-btn-full prod-wholesale-wa"
                      onClick={(e) => {
                        e.stopPropagation();
                        openWhatsAppShare(buildWholesaleWhatsAppText(p, siteLocale));
                      }}
                    >
                      <MessageCircle size={14} aria-hidden />
                      {siteLocale === "en" ? "Quote on WhatsApp" : "Devis WhatsApp"}
                    </button>
                    {buyable && (
                      <button
                        type="button"
                        className="add-btn-full"
                        style={{
                          width: "100%", padding: "8px", borderRadius: 8, fontSize: ".75rem",
                          fontFamily: "var(--font-display)", fontWeight: 700,
                          background: "var(--surface2)", color: "var(--ink)",
                          border: "1px solid var(--border)", cursor: "pointer",
                        }}
                        onClick={(e) => { e.stopPropagation(); handleAdd(p); }}
                      >
                        {siteLocale === "en" ? "Add to cart" : "Ajouter au panier"}
                      </button>
                    )}
              </div>
              )}
            </div>
          );
        })}
      </div>

      {ficheOpen && (
        <Suspense
          fallback={
            <div className="loading" style={{ justifyContent: "center", padding: 40 }}>
              <div className="spinner" /> Chargement...
            </div>
          }
        >
          <LazyFicheProduit
            product={ficheOpen}
            user={user}
            userData={userData}
            onClose={() => setFicheOpen(null)}
            onAddToCart={onAddToCart}
            siteLocale={siteLocale}
          />
        </Suspense>
      )}
      {cmdOpen && (
        <ModalCommander
          product={cmdOpen}
          user={user}
          userData={userData}
          onClose={() => setCmdOpen(null)}
        />
      )}
      {variantPickerProd && (
        <VariantPickerModal
          product={variantPickerProd}
          onClose={() => setVariantPickerProd(null)}
          onConfirm={(variant) => {
            handleAdd(variantPickerProd, variant);
            setVariantPickerProd(null);
          }}
        />
      )}
    </>
  );
}
