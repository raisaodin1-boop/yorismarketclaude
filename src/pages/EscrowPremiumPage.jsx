import { ProdGrid } from "../components/ProdGrid";
import { MarketingBreadcrumb } from "../components/layout/MarketingBreadcrumb";

/** Page Escrow — ton fintech marketplace (ne modifie pas la logique produits existante). */
export function EscrowPremiumPage({
  dark,
  produitsLoading,
  produits,
  user,
  userData,
  wishlist,
  addToCart,
  toggleWish,
  openProductUrl,
  goPage,
}) {
  const escrowProds = (produits || []).filter((p) => p.escrow);

  return (
    <div className="yorix-pro-page anim escrow-premium-root">
      <section className="yorix-esc-hero">
        <MarketingBreadcrumb
          items={[{ label: "Accueil", onClick: () => goPage("home") }, { label: "Escrow acheteur" }]}
        />
        <div className="yorix-esc-hero-grid">
          <div className="yorix-esc-hero-copy">
            <span className="yorix-esc-tag">🔐 Sécurité des paiements · Cameroun</span>
            <h1 className="yorix-esc-h1">
              Escrow Yorix : votre argent <em>neutralisé</em> jusqu&apos;à votre satisfaction
            </h1>
            <p className="yorix-esc-sub">
              Même mécanisme de confiance qu&apos;un wallet marketplace international : vos fonds ne sont pas libérés au vendeur
              tant que la commande n&apos;est pas validée livrée conforme — avec médiation Yorix.
            </p>
            <div className="yorix-esc-hero-cta">
              <button type="button" className="cta-y" onClick={() => goPage("produits")}>
                Acheter avec Escrow
              </button>
              <button type="button" className="cta-w" onClick={() => goPage("aide")}>
                Centre d&apos;aide
              </button>
            </div>
            <div className="yorix-esc-badge-row">
              {["PCI mindset", "Médiation équipe CM", "MTN MoMo / Orange Money"].map((b) => (
                <span key={b} className="yorix-trust-pill">
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div className="yorix-esc-hero-visual" aria-hidden>
            <div className="yorix-esc-card-float">
              <div className="yorix-esc-mini-label">Flux sécurisé</div>
              <ul className="yorix-esc-mini-flow">
                <li>
                  <span>1</span> Paiement bloqué
                </li>
                <li>
                  <span>2</span> Expédition
                </li>
                <li>
                  <span>3</span> Livraison / validation
                </li>
                <li>
                  <span>✓</span> Libération au vendeur
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sec yorix-esc-steps-sec">
        <h2 className="yorix-sec-heading">Timeline en quatre étapes claires</h2>
        <div className="yorix-step-rail">
          {[
            { n: "01", t: "Commande", d: "Fonds placés hors portée vendeur jusqu'à accusé réception." },
            { n: "02", t: "Préparation", d: "Vendeur prépare ou expédie — statut suivis dans vos commandes." },
            { n: "03", t: "Livré", d: "Vous confirmez : les fonds partent automatiquement." },
            { n: "04", t: "Litige", d: "Yorix tranche sous 48h ouvrées si désaccord avéré." },
          ].map((s) => (
            <div key={s.n} className="yorix-step-card">
              <span className="yorix-step-num">{s.n}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <h2 className="yorix-sec-heading">Protection acheteur &amp; vendeur</h2>
        <div className="yorix-duo-cards">
          <article className="yorix-panel yorix-panel--buy">
            <h3>Acheteur</h3>
            <ul>
              <li>Remboursement si non-conformité prouvable</li>
              <li>Historique paiement lisible après commande</li>
              <li>Support WhatsApp urgent</li>
            </ul>
          </article>
          <article className="yorix-panel yorix-panel--sell">
            <h3>Vendeur</h3>
            <ul>
              <li>Confiance acheteurs &gt; meilleur panier</li>
              <li>Blocage garantit que le client peut payer avant envoi fragile</li>
              <li>Libération automatique après validation</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="sec yorix-esc-faq">
        <h2 className="yorix-sec-heading">Questions fréquentes</h2>
        <div className="yorix-help-faq-list">
          {[
            {
              q: "L’escrow remplace WhatsApp pour payer ?",
              r: "Vous passez préférablement par le tunnel Checkout Yorix (CinetPay / options affichées) pour une traçabilité complète.",
            },
            { q: "Délai de litige ?", r: "Ouvert après signalement depuis votre espace client — dossier médiation équipe nationale." },
            { q: "Tous les produits ?", r: "Le catalogue peut marquer escrow par produit vendeur souhaitant l’option." },
          ].map((faq, idx) => (
            <details key={idx} className="yorix-details">
              <summary>{faq.q}</summary>
              <p>{faq.r}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="sec anim">
        <div className="yorix-products-head">
          <h2>Sélection produits escrow</h2>
          <button type="button" className="sec-link-btn" onClick={() => goPage("produits")}>
            Tout le catalogue →
          </button>
        </div>
        {produitsLoading ? (
          <div className="loading">
            <div className="spinner" /> Chargement...
          </div>
        ) : escrowProds.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <p>Pas encore de produits escrow listés ; explorez tout le catalogue.</p>
          </div>
        ) : (
          <ProdGrid
            prods={escrowProds.slice(0, 24)}
            user={user}
            userData={userData}
            onAddToCart={addToCart}
            onWish={toggleWish}
            wishlist={wishlist}
            onOpenProductUrl={openProductUrl}
          />
        )}
      </section>
    </div>
  );
}
