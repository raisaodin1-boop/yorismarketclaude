import { ContentIcon } from "../../lib/contentIcons";

const COPY = {
  fr: {
    eyebrow: "Notre histoire",
    title: "Pourquoi",
    titleEm: "Yorix",
    lead: "Yorix, c'est votre index commerce — le point d'entrée unique pour tout le parcours : acheter, vendre, se faire livrer et trouver des talents locaux.",
    missionLabel: "Mission",
    mission:
      "Rendre le commerce digital accessible à chaque Camerounais : sans barrière technique, avec les moyens de paiement qu'on utilise déjà (MoMo, Orange Money) et une logistique pensée pour nos villes.",
    visionLabel: "Vision",
    vision:
      "Devenir l'infrastructure technologique du commerce local — une super-app camerounaise qui rivalise avec les géants mondiaux, ancrée dans la réalité du terrain.",
    pillars: [
      { iconKey: "flag", title: "100 % Cameroun", desc: "Conçu à Douala, pour Douala, Yaoundé et tout le pays." },
      { iconKey: "smartphone", title: "Mobile first", desc: "WhatsApp, MoMo, parcours en 30 secondes — comme vous vivez au quotidien." },
      { iconKey: "shield", title: "Confiance intégrée", desc: "Escrow, vendeurs vérifiés et support humain quand la tech ne suffit pas." },
    ],
  },
  en: {
    eyebrow: "Our story",
    title: "Why",
    titleEm: "Yorix",
    lead: "Yorix is your commerce index — one entry point for buying, selling, delivery and trusted local providers.",
    missionLabel: "Mission",
    mission:
      "Make digital commerce accessible to every Cameroonian: no technical barriers, local payment rails (MoMo, Orange Money) and logistics built for our cities.",
    visionLabel: "Vision",
    vision:
      "Become the technology backbone of local commerce — a Cameroonian super-app that competes globally while staying rooted on the ground.",
    pillars: [
      { iconKey: "flag", title: "100% Cameroon", desc: "Built in Douala, for Douala, Yaoundé and nationwide." },
      { iconKey: "smartphone", title: "Mobile first", desc: "WhatsApp, MoMo, 30-second flows — how you live every day." },
      { iconKey: "shield", title: "Trust built-in", desc: "Escrow, verified sellers and human support when tech isn't enough." },
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
