import { useQuery } from "@tanstack/react-query";
import { ProdGrid } from "../ProdGrid";
import { fetchCategoryHighlightProducts } from "../../lib/merchHubProducts";
import { SEO_URL_ALIASES } from "../../lib/seoProgrammatic";
import "./seoAliasHubSection.css";

const ALIAS_CONFIG = {
  "immobilier-cameroun": {
    keywords: ["immobilier", "terrain", "maison", "appartement", "location"],
    tipsFr: [
      "Publiez vos annonces immobilières avec photos Cloudinary et visibilité nationale.",
      "Douala et Yaoundé : zones à forte demande locative et achat.",
      "Professionnels du BTP et agences : rejoignez Yorix Business pour la visibilité.",
    ],
    tipsEn: [
      "List properties with Cloudinary photos and nationwide visibility.",
      "Douala and Yaoundé: high demand for rentals and purchases.",
      "Agencies and builders: join Yorix Business for local reach.",
    ],
    ctaFr: "Parler à un conseiller",
    ctaEn: "Talk to an advisor",
    ctaPage: "contact",
  },
  "properties-cameroon": {
    keywords: ["immobilier", "terrain", "maison", "appartement", "location"],
    tipsFr: [],
    tipsEn: [
      "List properties with Cloudinary photos and nationwide visibility.",
      "Douala and Yaoundé: high demand for rentals and purchases.",
      "Agencies and builders: join Yorix Business for local reach.",
    ],
    ctaFr: "Contact",
    ctaEn: "Contact",
    ctaPage: "contact",
  },
  "emploi-cameroun": {
    keywords: [],
    tipsFr: [
      "Vendeur : ouvrez votre boutique en ligne et encaissez via MoMo.",
      "Livreur Yorix Ride : missions flexibles, paiement rapide.",
      "Prestataire : plomberie, beauté, IT… accédez à des clients vérifiés.",
    ],
    tipsEn: [
      "Seller: launch your online store and get paid via Mobile Money.",
      "Yorix Ride courier: flexible missions, fast payouts.",
      "Provider: plumbing, beauty, IT… reach verified clients.",
    ],
    ctaFr: "Créer mon compte pro",
    ctaEn: "Create pro account",
    ctaPage: "devenirVendeur",
  },
  "jobs-cameroon": {
    keywords: [],
    tipsFr: [],
    tipsEn: [
      "Seller: launch your online store and get paid via Mobile Money.",
      "Yorix Ride courier: flexible missions, fast payouts.",
      "Provider: plumbing, beauty, IT… reach verified clients.",
    ],
    ctaFr: "Register",
    ctaEn: "Create pro account",
    ctaPage: "devenirVendeur",
  },
};

const JOB_CARDS_FR = [
  { icon: "🏪", title: "Vendeur marketplace", desc: "Catalogue, commandes, paiements MoMo.", page: "devenirVendeur" },
  { icon: "🚚", title: "Livreur Yorix Ride", desc: "Livraisons Douala, Yaoundé et régions.", page: "devenirLivreur" },
  { icon: "🛠️", title: "Prestataire services", desc: "Interventions à domicile et réservations.", page: "inscription" },
];

const JOB_CARDS_EN = [
  { icon: "🏪", title: "Marketplace seller", desc: "Catalog, orders, Mobile Money payouts.", page: "devenirVendeur" },
  { icon: "🚚", title: "Yorix Ride courier", desc: "Deliveries in Douala, Yaoundé and beyond.", page: "devenirLivreur" },
  { icon: "🛠️", title: "Service provider", desc: "On-site jobs and bookings.", page: "inscription" },
];

/**
 * Bandeau produits / opportunités pour les alias SEO (Immobilier, Emploi).
 */
export function SeoAliasHubSection({
  seoAliasKey,
  locale = "fr",
  goPage,
  user,
  userData,
  wishlist,
  addToCart,
  toggleWish,
  openProductUrl,
  openSellerUrl,
}) {
  const isEn = locale === "en";
  const config = ALIAS_CONFIG[seoAliasKey];
  const meta = SEO_URL_ALIASES[seoAliasKey];

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["seo-alias-products", seoAliasKey],
    queryFn: () => fetchCategoryHighlightProducts(config?.keywords || [], 24),
    enabled: Boolean(config?.keywords?.length),
    staleTime: 120_000,
  });

  if (!config || !meta) return null;

  const tips = isEn ? config.tipsEn : config.tipsFr;
  const isJobs = seoAliasKey === "emploi-cameroun" || seoAliasKey === "jobs-cameroon";
  const jobCards = isEn ? JOB_CARDS_EN : JOB_CARDS_FR;

  return (
    <section className="seo-alias-hub sec anim">
      <header className="seo-alias-hub__hero">
        <h1 className="seo-alias-hub__title">{meta.title.split("|")[0].trim()}</h1>
        <p className="seo-alias-hub__desc">{meta.description}</p>
      </header>

      {tips.length > 0 && (
        <ul className="seo-alias-hub__tips">
          {tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      )}

      {isJobs ? (
        <div className="seo-alias-hub__jobs">
          {jobCards.map((card) => (
            <button
              key={card.title}
              type="button"
              className="seo-alias-hub__job-card"
              onClick={() => goPage(card.page)}
            >
              <span className="seo-alias-hub__job-icon" aria-hidden>
                {card.icon}
              </span>
              <span className="seo-alias-hub__job-title">{card.title}</span>
              <span className="seo-alias-hub__job-desc">{card.desc}</span>
            </button>
          ))}
        </div>
      ) : isLoading ? (
        <p className="seo-alias-hub__loading">{isEn ? "Loading listings…" : "Chargement des annonces…"}</p>
      ) : products.length > 0 ? (
        <ProdGrid
          prods={products}
          user={user}
          userData={userData}
          onAddToCart={addToCart}
          onWish={toggleWish}
          wishlist={wishlist}
          onOpenProductUrl={openProductUrl}
          onOpenSellerUrl={openSellerUrl}
        />
      ) : (
        <p className="seo-alias-hub__empty">
          {isEn
            ? "New property listings are added regularly. Contact us to publish yours."
            : "De nouvelles annonces immobilières sont ajoutées régulièrement. Contactez-nous pour publier la vôtre."}
        </p>
      )}

      <div className="seo-alias-hub__actions">
        <button type="button" className="form-submit seo-alias-hub__cta" onClick={() => goPage(config.ctaPage)}>
          {isEn ? config.ctaEn : config.ctaFr}
        </button>
        <button type="button" className="btn-ghost" onClick={() => goPage("produits")}>
          {isEn ? "Browse catalog" : "Voir le catalogue"}
        </button>
      </div>
    </section>
  );
}
