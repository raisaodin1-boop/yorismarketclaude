import { pickCrossSellProducts } from "../domain/deliveryPolicy";
import { OptimizedImage } from "./OptimizedImage";
import { CheckoutProgressBar } from "./CheckoutProgressBar";
import { FreeShippingProgress } from "./FreeShippingProgress";

export function CartPage({
  cartItems,
  cartSummary,
  changeQty,
  removeItem,
  goPage,
  addToCart,
  produits,
  wishlist,
  toggleWish,
}) {
  const recommendations = pickCrossSellProducts(cartItems, produits, cartSummary, 6);

  return (
    <section className="sec anim cart-page-wrap">
      <div className="cart-page-head">
        <div>
          <h1 className="sec-title">Mon panier Yorix</h1>
          <p className="cart-page-sub">
            Vue claire et complète de vos produits, prestations, livraison et paiement.
          </p>
        </div>
        <button className="btn-ghost" onClick={() => goPage("produits")}>
          Continuer mes achats
        </button>
      </div>

      <CheckoutProgressBar activeIndex={0} />

      {cartItems.length > 0 && <FreeShippingProgress summary={cartSummary} variant="cart" />}

      {cartItems.length === 0 ? (
        <div className="cart-page-empty">
          <div className="empty-icon">🛒</div>
          <div className="cart-empty-title">Votre panier est vide</div>
          <p>Ajoutez des produits ou prestations pour commencer votre commande.</p>
          <button className="form-submit" style={{ width: "auto" }} onClick={() => goPage("produits")}>
            Explorer le catalogue
          </button>
        </div>
      ) : (
        <div className="cart-page-grid">
          <div className="cart-page-main">
            <div className="cart-page-trust">
              <span>🔒 Paiement sécurisé</span>
              <span>🛡️ Protection acheteur</span>
              <span>🚚 Livraison suivie</span>
            </div>

            {cartItems.map((item) => {
              const subtotal = item.prix * item.qty;
              return (
                <article key={`${item.kind}-${item.id}`} className="cart-page-item">
                  <div className="cart-page-thumb">
                    <OptimizedImage
                      src={item.image}
                      alt={item.name}
                      width={180}
                      fallbackEmoji={item.kind === "service" ? "🛠️" : "📦"}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <div className="cart-page-content">
                    <div className="cart-page-title">{item.name}</div>
                    <div className="cart-page-meta">
                      <span className="ci-tag">{item.kind === "service" ? "Prestation" : "Produit"}</span>
                      {item.categorie && <span className="ci-tag">{item.categorie}</span>}
                      {item.ville && <span className="ci-tag">📍 {item.ville}</span>}
                    </div>
                    <div className="cart-page-line">
                      <div className="ci-unit-price">{item.prix?.toLocaleString()} FCFA / unité</div>
                      <div className="ci-total-price">{subtotal.toLocaleString()} FCFA</div>
                    </div>
                    <div className="cart-page-actions">
                      <div className="ci-qty">
                        <button className="qty-btn" onClick={() => changeQty(item.id, -1, item.kind)}>
                          −
                        </button>
                        <span className="qty-val">{item.qty}</span>
                        <button className="qty-btn" onClick={() => changeQty(item.id, 1, item.kind)}>
                          +
                        </button>
                      </div>
                      <button className="btn-action-sm" onClick={() => removeItem(item.id, item.kind)}>
                        Retirer
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="cart-page-summary">
            <h3>Résumé commande</h3>
            <div className="cart-total-row">
              <span>Sous-total</span>
              <strong>{cartSummary.subtotal.toLocaleString()} FCFA</strong>
            </div>
            <div className="cart-total-row">
              <span>Livraison (produits à expédier)</span>
              <strong>
                {!cartSummary.hasShippableProducts
                  ? "N/A"
                  : cartSummary.freeShippingUnlocked
                    ? (
                        <span style={{ color: "var(--green)" }}>Offerte</span>
                      )
                    : `${cartSummary.delivery.toLocaleString()} FCFA`}
              </strong>
            </div>
            {cartSummary.hasShippableProducts && !cartSummary.freeShippingUnlocked && (
              <p className="cart-info-text" style={{ textAlign: "left", marginTop: 6 }}>
                Standard <strong>{(cartSummary.policyStandardFee ?? 1500).toLocaleString("fr-FR")} FCFA</strong> en dessous de{" "}
                <strong>{(cartSummary.policyThreshold ?? 50000).toLocaleString("fr-FR")} FCFA</strong> d’articles livrables — pas
                d’impact sur les prestations hors colis.
              </p>
            )}
            <div className="cart-total-row discount">
              <span>Protection Yorix</span>
              <strong>Incluse</strong>
            </div>
            <div className="cart-divider" />
            <div className="cart-total-row grand">
              <span>Total</span>
              <strong>{cartSummary.total.toLocaleString()} FCFA</strong>
            </div>
            <button className="form-submit" onClick={() => goPage("checkout")}>
              Passer au paiement
            </button>
            <button className="cart-wa-confirm" onClick={() => goPage("checkout")}>
              Backup WhatsApp / paiement alternatif
            </button>
          </aside>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="cart-page-reco">
          <div className="sec-head">
            <h2 className="sec-title">
              {cartSummary.hasShippableProducts && !cartSummary.freeShippingUnlocked
                ? "Pour débloquer la livraison offerte"
                : "Recommandations pour vous"}
            </h2>
            {cartSummary.hasShippableProducts && !cartSummary.freeShippingUnlocked && (
              <p className="fs-reco-tip">
                Sélection intelligente : nous mettons en avant des produits susceptibles de combler votre panier à{" "}
                {(cartSummary.policyThreshold ?? 50000).toLocaleString("fr-FR")} FCFA d’articles livrables.
              </p>
            )}
          </div>
          <div className="prod-grid">
            {recommendations.map((p) => (
              <div key={p.id} className="prod-card">
                <div className="prod-img-wrap">
                  <OptimizedImage src={p.image} alt={p.name_fr} width={280} fallbackEmoji="📦" style={{ width: "100%", height: "100%" }} />
                  <button className="wish-btn" onClick={() => toggleWish(p.id)} title="Wishlist">
                    {wishlist.has(p.id) ? "❤️" : "🤍"}
                  </button>
                </div>
                <div className="prod-info">
                  <div className="prod-name">{p.name_fr}</div>
                  <div className="prod-price-row">
                    <span className="price">{Number(p.prix || 0).toLocaleString()} FCFA</span>
                    <button className="add-btn" onClick={() => addToCart(p)} title="Ajouter">
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

