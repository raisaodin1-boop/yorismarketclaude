import { ContentIcon } from "../../lib/contentIcons";

const PILLARS = {
  fr: [
    { iconKey: "flag", label: "Artisans & producteurs" },
    { iconKey: "mapPin", label: "Terroir camerounais" },
    { iconKey: "truck", label: "Livraison locale" },
  ],
  en: [
    { iconKey: "flag", label: "Artisans & producers" },
    { iconKey: "mapPin", label: "Cameroonian terroir" },
    { iconKey: "truck", label: "Local delivery" },
  ],
};

export function MadeInCameroonHubHeader({ locale = "fr" }) {
  const isEn = locale === "en";
  const pillars = PILLARS[isEn ? "en" : "fr"];

  return (
    <>
      <div className="mhub-mic-cover" aria-hidden>
        <div className="mhub-mic-cover__gradient" />
        <div className="mhub-mic-cover__caption">
          {isEn ? "From Douala markets to Kribi shores" : "Des marchés de Douala aux côtes de Kribi"}
        </div>
      </div>

      <div className="mhub-mic-seal" role="status">
        <span className="mhub-mic-seal__flag" aria-hidden>
          🇨🇲
        </span>
        <div>
          <div className="mhub-mic-seal__title">
            {isEn ? "Trust Label · Guaranteed Cameroon Origin" : "Label de Confiance · Origine Cameroun Garantie"}
          </div>
          <div className="mhub-mic-seal__sub">
            {isEn
              ? "Local crafts, food and brands — proudly made in Cameroon."
              : "Artisanat, alimentation et marques locales — fièrement made in Cameroun."}
          </div>
        </div>
      </div>

      <div className="mhub-mic-pillars" aria-label={isEn ? "Made in Cameroon highlights" : "Atouts Made in Cameroun"}>
        {pillars.map((p) => (
          <span key={p.label} className="mhub-mic-pillar">
            <ContentIcon name={p.iconKey} size={14} />
            {p.label}
          </span>
        ))}
      </div>
    </>
  );
}
