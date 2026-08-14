import { useEffect, useState } from "react";
import { ShoppingCart, X, Lock, Shield, Truck, Plus, Minus } from "lucide-react";
import { OptimizedImage } from "./OptimizedImage";
import { FreeShippingProgress } from "./FreeShippingProgress";
import { showAppToast } from "../lib/appToast";

function haptic(ms = 10) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(ms);
  }
}

export function CartDrawer({
  open,
  onClose,
  cartItems,
  cartSummary,
  changeQty,
  removeItem,
  goPage,
  totalQty,
  suggestedProducts = [],
  onAddProduct,
}) {
  const [removingKey, setRemovingKey] = useState(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const goCheckout = () => {
    onClose();
    goPage("checkout");
  };

  const goFullCart = () => {
    onClose();
    goPage("cart");
  };

  const itemKey = (item) => `${item.kind}-${item.id}-${item.variantId || item._variantId || ""}`;

  const handleRemove = (item) => {
    const key = itemKey(item);
    setRemovingKey(key);
    haptic(10);
    window.setTimeout(() => {
      removeItem(item.id, item.kind, item.variantId || item._variantId || null);
      setRemovingKey(null);
      showAppToast(
        item.kind === "service"
          ? "Prestation retirée du panier"
          : "Article retiré du panier",
        "info",
        1800,
      );
    }, 280);
  };

  const handleQty = (item, delta) => {
    const next = item.qty + delta;
    if (next < 1) {
      handleRemove(item);
      return;
    }
    changeQty(item.id, delta, item.kind, item.variantId || item._variantId || null);
    haptic(5);
  };

  const suggestions = suggestedProducts.slice(0, 3);

  return (
    <>
      <div
        className={`cart-overlay${open ? " open" : ""}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`cart-drawer${open ? " open" : ""}`}
        aria-hidden={!open}
        role="dialog"
        aria-label="Panier"
        aria-modal="true"
      >
        <div className="cart-header">
          <div className="cart-header-left">
            <div className="cart-header-icon" aria-hidden="true">
              <ShoppingCart className="yx-icon yx-icon--md" />
            </div>
            <div>
              <h2 className="cart-title">Mon panier</h2>
              <div className="cart-subtitle">
                {totalQty} article{totalQty !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
          <button type="button" className="cart-close" onClick={onClose} aria-label="Fermer le panier">
            <X className="yx-icon yx-icon--sm" aria-hidden="true" />
          </button>
        </div>

        <div className="cart-trust-bar">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Lock size={12} aria-hidden /> Sécurisé</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Shield size={12} aria-hidden /> Protégé</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Truck size={12} aria-hidden /> Suivi</span>
        </div>

        {cartItems.length > 0 && <FreeShippingProgress summary={cartSummary} variant="cart" />}

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon"><ShoppingCart size={40} strokeWidth={1.5} aria-hidden /></div>
            <div className="cart-empty-title">Panier vide</div>
            <p className="cart-empty-sub">Ajoutez des produits ou prestations pour commander.</p>
            <button
              type="button"
              className="cart-empty-btn"
              onClick={() => {
                onClose();
                goPage("produits");
              }}
            >
              Explorer le catalogue
            </button>

            {suggestions.length > 0 && onAddProduct && (
              <div className="cart-empty-suggestions">
                <p className="cart-empty-suggestions-title">Tendances du moment</p>
                {suggestions.map((p) => (
                  <div key={p.id} className="cart-suggestion">
                    <div className="cart-suggestion-img">
                      <OptimizedImage
                        src={p.image}
                        alt=""
                        width={96}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <div className="cart-suggestion-info">
                      <div className="cart-suggestion-name">{p.name_fr}</div>
                      <div className="cart-suggestion-price">
                        {Number(p.prix || 0).toLocaleString("fr-FR")} FCFA
                      </div>
                    </div>
                    <button
                      type="button"
                      className="cart-suggestion-add"
                      aria-label={`Ajouter ${p.name_fr} au panier`}
                      onClick={() => {
                        onAddProduct(p);
                        haptic(12);
                        showAppToast(`${p.name_fr} ajouté au panier`, "success", 2000);
                      }}
                    >
                      <Plus size={12} aria-hidden style={{ verticalAlign: "middle" }} /> Ajouter
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="cart-drawer__body">
            <div className="cart-items">
              {cartItems.map((item) => {
                const subtotal = item.prix * item.qty;
                const key = itemKey(item);
                return (
                  <article
                    key={key}
                    className={`cart-item${removingKey === key ? " is-removing" : ""}`}
                  >
                    <button
                      type="button"
                      className="ci-del"
                      onClick={() => handleRemove(item)}
                      aria-label={`Retirer ${item.name} du panier`}
                      disabled={removingKey === key}
                    >
                      <X size={14} aria-hidden />
                    </button>
                    <div className="ci-img">
                      <OptimizedImage
                        src={item.image}
                        alt={item.name}
                        width={156}
                        fallbackEmoji={item.kind === "service" ? "🛠️" : "📦"}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <div className="ci-info">
                      <div className="ci-name">
                        {item.name}
                        {item.variantLabel ? ` · ${item.variantLabel}` : ""}
                      </div>
                      <div className="ci-meta">
                        <span className="ci-tag">{item.kind === "service" ? "Prestation" : "Produit"}</span>
                      </div>
                      <div className="ci-bottom">
                        <div className="ci-price-block">
                          <div className="ci-unit-price">{item.prix?.toLocaleString()} FCFA</div>
                          <div className="ci-total-price">{subtotal.toLocaleString()} FCFA</div>
                        </div>
                        {item.kind === "service" ? (
                          // Une prestation est facturée à l'unité — pas de stepper
                          // (le "+" était sans effet, le "-" supprimait la ligne).
                          <span className="ci-qty-fixed" aria-label="Prestation — quantité fixée à 1">
                            Prestation ×1
                          </span>
                        ) : (
                          <div className="ci-qty" role="group" aria-label={`Quantité pour ${item.name}`}>
                            <button
                              type="button"
                              className="qty-btn"
                              aria-label={`Diminuer la quantité de ${item.name}`}
                              onClick={() => handleQty(item, -1)}
                            >
                              <Minus size={14} aria-hidden />
                            </button>
                            <span className="qty-val" aria-live="polite">{item.qty}</span>
                            <button
                              type="button"
                              className="qty-btn"
                              aria-label={`Augmenter la quantité de ${item.name}`}
                              onClick={() => handleQty(item, 1)}
                            >
                              <Plus size={14} aria-hidden />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="cart-footer">
              <div className="cart-summary">
                <div className="cart-total-row">
                  <span>Sous-total</span>
                  <strong>{cartSummary.subtotal.toLocaleString()} FCFA</strong>
                </div>
                <div className="cart-total-row">
                  <span>Livraison</span>
                  <strong>
                    {!cartSummary.hasShippableProducts
                      ? "N/A"
                      : cartSummary.freeShippingUnlocked
                        ? "Offerte"
                        : `${cartSummary.delivery.toLocaleString()} FCFA`}
                  </strong>
                </div>
                <div className="cart-divider" />
                <div className="cart-total-row grand">
                  <span>Total</span>
                  <strong>{cartSummary.total.toLocaleString()} FCFA</strong>
                </div>
              </div>
              <button type="button" className="cart-wa-confirm" onClick={goCheckout}>
                Passer au paiement
              </button>
              <button
                type="button"
                className="btn-ghost"
                style={{ width: "100%", marginTop: 8 }}
                onClick={goFullCart}
              >
                Voir panier complet
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
