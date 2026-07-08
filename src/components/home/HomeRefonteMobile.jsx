import { Package, Heart, CreditCard, Gift, Store } from "lucide-react";
import { computeHomepageTrendingProducts } from "../../lib/merchPlacement";

/** Image hero — contexte africain / marketplace locale */
export const HOME_HERO_IMAGE_AFRICA =
  "https://images.unsplash.com/photo-1611348586804-61bf6c080472?w=900&q=75&auto=format&fit=crop";

export function HomeRefontePersonalized({ locale = "fr", user, userData, goPage, goDash, produits = [] }) {
  if (!user) return null;
  const isEn = locale === "en";
  const name = userData?.nom || user?.email?.split("@")[0] || "";
  const picks = computeHomepageTrendingProducts(produits, 4);

  return (
    <section className="yx-personal yx-mobile-only yx-reveal" aria-label={isEn ? "Personalized" : "Accueil personnalisé"}>
      <h2 className="yx-personal__hi">
        {isEn ? `Hello, ${name}` : `Bonjour, ${name}`}
        <span aria-hidden> 👋</span>
      </h2>
      <div className="yx-personal__chips">
        <button type="button" onClick={() => goDash?.("commandes") || goPage("dashboard")}>
          <Package size={16} aria-hidden />
          {isEn ? "Continue shopping" : "Continuer vos achats"}
        </button>
        <button type="button" onClick={() => goDash?.("overview") || goPage("dashboard")}>
          <Heart size={16} aria-hidden />
          {isEn ? "Favorites" : "Favoris"}
        </button>
      </div>
      {picks.length > 0 && (
        <div className="yx-personal__rail">
          <p className="yx-personal__lbl">{isEn ? "Recommended for you" : "Recommandés pour vous"}</p>
          <div className="yx-personal__scroll">
            {picks.map((p) => (
              <button
                key={p.id}
                type="button"
                className="yx-personal__mini"
                onClick={() => goPage("produits")}
              >
                <span className="yx-personal__mini-price">{p.prix?.toLocaleString()} F</span>
                <span className="yx-personal__mini-name">{p.name_fr}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export function HomeRefonteMobileShortcuts({ locale = "fr", goPage, goDash }) {
  const isEn = locale === "en";
  const items = [
    { icon: Package, labelFr: "Mes commandes", labelEn: "Orders", action: () => (goDash ? goDash("commandes") : goPage("dashboard")) },
    { icon: Heart, labelFr: "Favoris", labelEn: "Favorites", action: () => (goDash ? goDash("overview") : goPage("dashboard")) },
    { icon: CreditCard, labelFr: "Paiements", labelEn: "Payments", action: () => goPage("cart") },
    { icon: Gift, labelFr: "Promotions", labelEn: "Deals", action: () => goPage("bonsPlans") },
    { icon: Store, labelFr: "Devenir vendeur", labelEn: "Sell", action: () => goPage("devenirVendeur") },
  ];

  return (
    <nav className="yx-shortcuts yx-mobile-only yx-reveal" aria-label={isEn ? "Quick links" : "Raccourcis"}>
      {items.map(({ icon: Icon, labelFr, labelEn, action }) => (
        <button key={labelFr} type="button" className="yx-shortcuts__item" onClick={action}>
          <Icon size={20} strokeWidth={1.75} aria-hidden />
          <span>{isEn ? labelEn : labelFr}</span>
        </button>
      ))}
    </nav>
  );
}

export function HomeRefonteTrustMicro({ locale = "fr" }) {
  const isEn = locale === "en";
  return (
    <div className="yx-trust-micro yx-mobile-only" role="list" aria-label={isEn ? "Trust badges" : "Badges confiance"}>
      <span role="listitem">✅ {isEn ? "Secure pay" : "Paiement sécurisé"}</span>
      <span role="listitem">🛡 {isEn ? "Escrow" : "Escrow"}</span>
      <span role="listitem">🚚 {isEn ? "Tracked delivery" : "Livraison suivie"}</span>
      <span role="listitem">⭐ {isEn ? "Verified sellers" : "Vendeurs vérifiés"}</span>
    </div>
  );
}
