import "./conversion.css";

const STEPS = [
  { n: 1, title: "Créez votre compte", desc: "Inscription vendeur en 2 minutes — email ou téléphone." },
  { n: 2, title: "Publiez vos produits", desc: "Photos, prix, catégories et option Made in Cameroun 🇨🇲." },
  { n: 3, title: "Vendez & encaissez", desc: "MoMo, Orange Money, escrow — paiements adaptés au marché local." },
];

const BENEFITS = [
  "Visibilité nationale",
  "Commission 5%",
  "Escrow acheteur",
  "Dashboard vendeur",
  "Support WhatsApp",
  "Catégories SEO",
];

export function SellerLanding({ locale = "fr", onRegister, onBrowse }) {
  const isEn = locale === "en";

  return (
    <section className="sec anim seller-landing">
      <div className="seller-landing__hero">
        <h1>{isEn ? "Sell on Yorix — Cameroon marketplace" : "Vendre sur Yorix — marketplace Cameroun"}</h1>
        <p style={{ color: "var(--gray)", fontSize: ".9rem", lineHeight: 1.75, maxWidth: 520, margin: "0 auto" }}>
          {isEn
            ? "Launch your online shop, reach buyers nationwide, and get paid via MoMo with seller tools built for Cameroon."
            : "Lancez votre boutique en ligne, touchez des acheteurs partout au pays et encaissez via MoMo avec des outils pensés pour le Cameroun."}
        </p>
      </div>

      <div className="seller-landing__steps">
        {STEPS.map((s) => (
          <article key={s.n} className="seller-landing__step">
            <span className="seller-landing__step-num">{s.n}</span>
            <div style={{ fontWeight: 800, fontSize: ".85rem", marginBottom: 4 }}>{s.title}</div>
            <div style={{ fontSize: ".75rem", color: "var(--gray)", lineHeight: 1.5 }}>{s.desc}</div>
          </article>
        ))}
      </div>

      <div className="seller-landing__benefits">
        {BENEFITS.map((b) => (
          <span key={b} className="seller-landing__benefit">
            ✓ {b}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
        <button type="button" className="cta-y" onClick={onRegister}>
          {isEn ? "Open my seller shop" : "Créer ma boutique vendeur"}
        </button>
        {onBrowse && (
          <button type="button" className="cta-w" onClick={onBrowse}>
            {isEn ? "See the marketplace" : "Voir la marketplace"}
          </button>
        )}
      </div>

      <p style={{ textAlign: "center", marginTop: 16, fontSize: ".75rem", color: "var(--gray)" }}>
        {isEn
          ? "Questions? Our team replies on WhatsApp within 24h."
          : "Une question ? Notre équipe répond sur WhatsApp sous 24h."}
      </p>
    </section>
  );
}
