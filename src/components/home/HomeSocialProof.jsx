import { ContentIcon } from "../../lib/contentIcons";
import { formatPlatformStat } from "../../lib/platformStats";

const PARTNERS = [
  { name: "MTN MoMo", color: "#ffcc00" },
  { name: "Orange Money", color: "#ff6600" },
  { name: "Cloudinary", color: "#3448c5" },
  { name: "Supabase", color: "#3ecf8e" },
];

export function HomeSocialProof({ locale = "fr", stats, isLoading }) {
  const isEn = locale === "en";
  const s = stats || {};

  const kpis = [
    {
      val: formatPlatformStat(s.products),
      lbl: isEn ? "Products listed" : "Produits en ligne",
      iconKey: "shoppingBag",
      color: "#1a6b3a",
    },
    {
      val: formatPlatformStat(s.sellers),
      lbl: isEn ? "Active sellers" : "Vendeurs actifs",
      iconKey: "store",
      color: "#f59e0b",
    },
    {
      val: formatPlatformStat(s.orders),
      lbl: isEn ? "Orders delivered" : "Commandes livrées",
      iconKey: "package",
      color: "#0891b2",
    },
    {
      val: `${s.cities || 10}+`,
      lbl: isEn ? "Cities covered" : "Villes couvertes",
      iconKey: "mapPin",
      color: "#7c3aed",
    },
    {
      val: `${s.rating || 4.8}/5`,
      lbl: isEn ? "Average rating" : "Note moyenne",
      iconKey: "star",
      color: "#dc2626",
    },
    {
      val: formatPlatformStat(s.services),
      lbl: isEn ? "Service providers" : "Prestataires",
      iconKey: "wrench",
      color: "#1a4a9a",
    },
  ];

  return (
    <section className="yhm3-section--tinted yhm3-social-proof yx-reveal" aria-labelledby="yhm3-social-title">
      <div className="yhm3-section-head yhm3-section-head--center">
        <span className="yhm3-eyebrow-light">
          {s.live && <span className="yhm3-live-dot" aria-hidden />}
          {isEn ? "Yorix in numbers" : "Yorix en chiffres"}
        </span>
        <h2 id="yhm3-social-title" className="yhm3-h2 yhm3-h2--center">
          {isEn ? "The community that " : "La communauté qui "}
          <em>{isEn ? "builds trust" : "fait confiance"}</em>
        </h2>
        <p className="yhm3-lead yhm3-lead--center">
          {isEn
            ? "Real metrics from our marketplace — updated as the platform grows."
            : "Des indicateurs réels de notre plateforme — mis à jour au fil de la croissance."}
        </p>
      </div>

      <div className={`yhm3-social-kpis${isLoading ? " yhm3-social-kpis--loading" : ""}`}>
        {kpis.map((k) => (
          <article key={k.lbl} className="yhm3-social-kpi" style={{ "--kpi-color": k.color }}>
            <div className="yhm3-social-kpi__ico">
              <ContentIcon name={k.iconKey} size={20} />
            </div>
            <div className="yhm3-social-kpi__val">{k.val}</div>
            <div className="yhm3-social-kpi__lbl">{k.lbl}</div>
          </article>
        ))}
      </div>

      <div className="yhm3-partners" aria-label={isEn ? "Technology partners" : "Partenaires technologiques"}>
        <span className="yhm3-partners__lbl">{isEn ? "Powered by" : "Propulsé par"}</span>
        <div className="yhm3-partners__row">
          {PARTNERS.map((p) => (
            <span key={p.name} className="yhm3-partner-pill" style={{ "--partner-accent": p.color }}>
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
