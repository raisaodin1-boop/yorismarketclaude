import { ContentIcon } from "../../lib/contentIcons";

const COPY = {
  fr: {
    eyebrow: "Made in Cameroun",
    title: "Une marketplace",
    titleEm: "camerounaise",
    lead: "Entreprise locale, paiement Mobile Money, vendeurs camerounais et livraison nationale — avec escrow pour protéger acheteurs et vendeurs.",
    missionLabel: "Notre promesse",
    mission:
      "Résoudre le problème n°1 du e-commerce au Cameroun : la confiance. Payer sans recevoir, recevoir un faux produit, se faire arnaquer sur Facebook — Yorix protège votre argent jusqu'à la livraison.",
    visionLabel: "Pour qui ?",
    vision:
      "Pour les acheteurs qui veulent acheter sans risque, et les vendeurs sérieux qui veulent des clients qui paient vraiment — partout à Douala, Yaoundé et dans tout le pays.",
    pillars: [
      { iconKey: "flag", title: "100 % Cameroun", desc: "Conçu à Douala, équipe locale, service client WhatsApp en français." },
      { iconKey: "smartphone", title: "Mobile Money", desc: "MTN MoMo et Orange Money — les moyens de paiement que vous utilisez déjà." },
      { iconKey: "shield", title: "Escrow intégré", desc: "L'argent du client reste bloqué jusqu'à validation de la livraison." },
    ],
  },
  en: {
    eyebrow: "Made in Cameroon",
    title: "A Cameroonian",
    titleEm: "marketplace",
    lead: "Local company, Mobile Money checkout, Cameroonian sellers and nationwide delivery — with escrow protecting buyers and sellers.",
    missionLabel: "Our promise",
    mission:
      "Solve e-commerce's #1 problem in Cameroon: trust. Paying without receiving, fake products, Facebook scams — Yorix protects your money until delivery.",
    visionLabel: "For whom?",
    vision:
      "For buyers who want risk-free shopping, and serious sellers who want customers who actually pay — across Douala, Yaoundé and nationwide.",
    pillars: [
      { iconKey: "flag", title: "100% Cameroon", desc: "Built in Douala, local team, French WhatsApp support." },
      { iconKey: "smartphone", title: "Mobile Money", desc: "MTN MoMo and Orange Money — the rails you already use." },
      { iconKey: "shield", title: "Built-in escrow", desc: "Buyer funds stay locked until delivery is confirmed." },
    ],
  },
};

export function HomeBrandStory({ locale = "fr" }) {
  const c = COPY[locale === "en" ? "en" : "fr"];

  return (
    <section className="yhm3-section yhm3-brand-story yx-reveal" aria-labelledby="yhm3-brand-title">
      <div className="yhm3-brand-story__grid">
        <div className="yhm3-brand-story__main">
          <span className="yhm3-eyebrow-light">{c.eyebrow}</span>
          <h2 id="yhm3-brand-title" className="yhm3-h2">
            {c.title} <em>{c.titleEm}</em> ?
          </h2>
          <p className="yhm3-lead">{c.lead}</p>

          <div className="yhm3-brand-story__blocks">
            <article className="yhm3-brand-block">
              <span className="yhm3-brand-block__lbl">{c.missionLabel}</span>
              <p>{c.mission}</p>
            </article>
            <article className="yhm3-brand-block yhm3-brand-block--vision">
              <span className="yhm3-brand-block__lbl">{c.visionLabel}</span>
              <p>{c.vision}</p>
            </article>
          </div>
        </div>

        <div className="yhm3-brand-story__pillars">
          {c.pillars.map((p) => (
            <article key={p.title} className="yhm3-brand-pillar">
              <div className="yhm3-brand-pillar__ico">
                <ContentIcon name={p.iconKey} size={20} />
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
