/** Pied de page partagé — liens métier préservés, ton marketplace premium */
import { Link } from "react-router-dom";

export function PremiumSiteFooter({ goPage, freeShippingThresholdXaf = 25000 }) {
  return (
    <footer className="footer footer--premium">
      <div className="footer-premium-accent" aria-hidden />

      <div className="footer-trust-strip">
        <span className="fts-item">🔐 Escrow vérifiable</span>
        <span className="fts-item">📱 MoMo · Orange Money</span>
        <span className="fts-item">
          Livraison offerte dès {freeShippingThresholdXaf?.toLocaleString?.("fr-FR") ?? "—"} FCFA
        </span>
        <span className="fts-item">🇨🇲 Support WhatsApp CM</span>
      </div>

      <div className="footer-grid">
        <div className="footer-brand-col">
          <div className="footer-logo">
            Yo<span>rix</span> CM
          </div>
          <p className="footer-desc">
            Marketplace camerounaise — catalogue produits, prestataires terrain, livraison Yorix Ride, paiements
            traçables et programme de fidélité.
          </p>
          <div className="footer-contact">
            <span>📞 +237 696 56 56 54</span>
            <span>✉️ support@yorix.cm</span>
            <span>🇨🇲 Douala · Yaoundé · Bafoussam · tout le pays</span>
          </div>
          <div className="footer-cta-cluster">
            <button type="button" className="footer-cta-chip" onClick={() => goPage("produits")}>
              Parcourir les produits
            </button>
            <button type="button" className="footer-cta-chip footer-cta-chip--ghost" onClick={() => goPage("aide")}>
              Centre d&apos;aide
            </button>
          </div>
        </div>

        <nav className="footer-col" aria-label="Entrées SEO Cameroun">
          <h4>Visibilité locale</h4>
          <ul>
            <li>
              <Link to="/marketplace-cameroun" className="footer-seo-link">
                Marketplace Cameroun
              </Link>
            </li>
            <li>
              <Link to="/ecommerce-cameroun" className="footer-seo-link">
                E-commerce Cameroun
              </Link>
            </li>
            <li>
              <Link to="/livraison-cameroun" className="footer-seo-link">
                Livraison Cameroun
              </Link>
            </li>
            <li>
              <Link to="/vendre-en-ligne-cameroun" className="footer-seo-link">
                Vendre en ligne
              </Link>
            </li>
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Guides journal Yorix">
          <h4>Guides</h4>
          <ul>
            <li>
              <Link to="/blog/top-sites-ecommerce-cameroun" className="footer-seo-link">
                Top e-commerce CM
              </Link>
            </li>
            <li>
              <Link to="/blog/comment-vendre-en-ligne-cameroun" className="footer-seo-link">
                Vendre en ligne
              </Link>
            </li>
            <li>
              <Link to="/blog/livraison-douala-guide" className="footer-seo-link">
                Livraison Douala
              </Link>
            </li>
            <li>
              <Link to="/achat-en-ligne-douala" className="footer-seo-link">
                Achat en ligne Douala
              </Link>
            </li>
            <li>
              <Link to="/achat-en-ligne-yaounde" className="footer-seo-link">
                Achat en ligne Yaoundé
              </Link>
            </li>
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Marketplace">
          <h4>Marketplace</h4>
          <ul>
            {[
              { l: "Tous les produits", p: "produits" },
              { l: "Panier · checkout", p: "cart" },
              { l: "Livraison", p: "livraison" },
              { l: "Bons plans", p: "bonsPlans" },
              { l: "Acheter à Douala", nav: () => goPage("seoCity", { citySlug: "douala", mode: "acheter" }) },
              { l: "Vendre sur Yorix", p: "devenirVendeur" },
            ].map((i) => (
              <li key={i.l}>
                <button type="button" onClick={() => (i.nav ? i.nav() : goPage(i.p))}>
                  {i.l}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Services et confiance">
          <h4>Services &amp; confiance</h4>
          <ul>
            {[
              { l: "Escrow 🔐", p: "escrow" },
              { l: "Prestataires", p: "prestataires" },
              { l: "Business 💼", p: "business" },
              { l: "Academy 🎓", p: "academy" },
              { l: "Blog & guides", p: "blog" },
              { l: "Fidélité ⭐", p: "loyalty" },
              { l: "Livraison à Yaoundé", nav: () => goPage("livraison", { citySlug: "yaounde" }) },
            ].map((i) => (
              <li key={i.l}>
                <button type="button" onClick={() => (i.nav ? i.nav() : goPage(i.p))}>
                  {i.l}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Rejoindre et légal">
          <h4>Rejoindre Yorix</h4>
          <ul>
            {[
              { l: "Devenir livreur", p: "devenirLivreur" },
              { l: "Devenir prestataire", p: "inscription" },
              { l: "Contact", p: "contact" },
              { l: "FAQ", p: "faq" },
              { l: "SOS · Aide", p: "aide" },
              { l: "Mentions légales", p: "mentions" },
              { l: "CGV", p: "cgv" },
              { l: "Confidentialité", p: "confidentialite" },
            ].map((i) => (
              <li key={i.l}>
                <button type="button" onClick={() => goPage(i.p)}>
                  {i.l}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© 2026 Yorix Cameroun — RC: DOUALA/2026/B237</span>
        <div className="fb-badges" role="list">
          <span className="fbb" role="listitem">
            📱 MTN MoMo
          </span>
          <span className="fbb" role="listitem">
            🔶 Orange Money
          </span>
          <span className="fbb" role="listitem">
            🔐 Escrow
          </span>
          <span className="fbb" role="listitem">
            🇨🇲 Made in CM
          </span>
        </div>
      </div>
    </footer>
  );
}
