import { SeoBreadcrumb } from "./SeoBreadcrumb";
/**
 * Bloc SEO texte + liens internes pour pages ville (hub, acheter, livraison, prestataires).
 * Design : cartes discrètes, cohérentes avec les sections .sec existantes.
 */
export function SeoLocalIntro({ city, mode, goPage }) {
  const c = city?.name || "Cameroun";
  const slug = city?.slug || "";

  const titles = {
    hub: `Yorix à ${c} — marketplace, livraison & services`,
    acheter: `Acheter en ligne à ${c} — Yorix marketplace Cameroun`,
    livraison: `Livraison à ${c} — livreurs & colis au Cameroun`,
    prestataires: `Prestataires à ${c} — services à domicile vérifiés`,
  };

  const intros = {
    hub: `Yorix est une marketplace camerounaise : achetez en ligne à ${c}, faites-vous livrer rapidement et trouvez des prestataires vérifiés. Paiement MTN MoMo, Orange Money et protection Escrow.`,
    acheter: `Sur Yorix, l’achat en ligne à ${c} est simple : catalogue produits locaux et importés, vendeurs vérifiés, livraison suivie. Idéal pour votre shopping au Cameroun.`,
    livraison: `Notre service de livraison couvre ${c} et le réseau national : livreurs indépendants, suivi et tarifs transparents. Colis, courses, e-commerce — Yorix Ride.`,
    prestataires: `Trouvez des prestataires à ${c} : plomberie, électricité, ménage, beauté, BTP… profils vérifiés et réservation par WhatsApp.`,
  };

  const crumbs = [
    { label: "Accueil", href: "/" },
    { label: titles[mode] || titles.hub, current: true },
  ];

  return (
    <section className="sec" style={{ paddingBottom: 8 }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <SeoBreadcrumb items={crumbs} />
        <header>
          <h1
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.15rem, 2.5vw, 1.45rem)",
              color: "var(--ink)",
              margin: "0 0 12px",
              letterSpacing: "-.4px",
            }}
          >
            {titles[mode] || titles.hub}
          </h1>
          <p style={{ fontSize: ".88rem", color: "var(--gray)", lineHeight: 1.75, margin: 0 }}>{intros[mode] || intros.hub}</p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 10,
            marginTop: 18,
          }}
        >
          <button
            type="button"
            className="cta-w"
            style={{ padding: "12px 14px", textAlign: "left", borderRadius: 12, cursor: "pointer" }}
            onClick={() => slug && goPage("seoCity", { citySlug: slug, mode: "acheter" })}
          >
            <strong style={{ display: "block", marginBottom: 4 }}>🛍️ Produits à {c}</strong>
            <span style={{ fontSize: ".76rem", opacity: 0.9 }}>Marketplace &amp; catégories</span>
          </button>
          <button
            type="button"
            className="cta-w"
            style={{ padding: "12px 14px", textAlign: "left", borderRadius: 12, cursor: "pointer" }}
            onClick={() => slug && goPage("seoCity", { citySlug: slug, mode: "livraison" })}
          >
            <strong style={{ display: "block", marginBottom: 4 }}>🚚 Livraison</strong>
            <span style={{ fontSize: ".76rem", opacity: 0.9 }}>Livreurs &amp; délais</span>
          </button>
          <button
            type="button"
            className="cta-w"
            style={{ padding: "12px 14px", textAlign: "left", borderRadius: 12, cursor: "pointer" }}
            onClick={() => slug && goPage("seoCity", { citySlug: slug, mode: "prestataires" })}
          >
            <strong style={{ display: "block", marginBottom: 4 }}>👷 Prestataires</strong>
            <span style={{ fontSize: ".76rem", opacity: 0.9 }}>Services à domicile</span>
          </button>
          <button
            type="button"
            className="cta-w"
            style={{ padding: "12px 14px", textAlign: "left", borderRadius: 12, cursor: "pointer" }}
            onClick={() => goPage("business")}
          >
            <strong style={{ display: "block", marginBottom: 4 }}>💼 Business</strong>
            <span style={{ fontSize: ".76rem", opacity: 0.9 }}>B2B &amp; grossistes</span>
          </button>
        </div>
      </div>
    </section>
  );
}
