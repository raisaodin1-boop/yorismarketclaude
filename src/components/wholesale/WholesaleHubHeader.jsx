import { ContentIcon } from "../../lib/contentIcons";
import { VerifiedSellerBadge } from "../seller/VerifiedSellerBadge";

const TRUST_BADGES = {
  fr: [
    { iconKey: "shield", label: "Escrow B2B", title: "Payez Yorix — vendeur payé après livraison" },
    { iconKey: "check", label: "Fournisseurs certifiés", title: "Badge vendeur vérifié admin" },
    { iconKey: "package", label: "Prix d'usine", title: "Paliers MOQ et prix dégressifs" },
    { iconKey: "messageCircle", label: "WhatsApp pro", title: "Devis rapide via WhatsApp" },
  ],
  en: [
    { iconKey: "shield", label: "B2B Escrow", title: "Pay Yorix — seller paid after delivery" },
    { iconKey: "check", label: "Certified suppliers", title: "Admin-verified seller badge" },
    { iconKey: "package", label: "Factory pricing", title: "MOQ tiers and volume discounts" },
    { iconKey: "messageCircle", label: "Pro WhatsApp", title: "Fast quotes via WhatsApp" },
  ],
};

export function WholesaleHubHeader({ locale = "fr", goPage = () => {} }) {
  const isEn = locale === "en";
  const badges = TRUST_BADGES[isEn ? "en" : "fr"];

  return (
    <>
      <div className="mhub-wholesale-escrow">
        <ContentIcon name="shield" size={18} />
        <span>
          {isEn
            ? "Pay Yorix — we only pay the factory when goods reach Douala port. Your best anti-scam for imports."
            : "Payez Yorix — l'usine n'est payée qu'à l'arrivée au port de Douala. Votre meilleure arme anti-arnaque."}
        </span>
        <button type="button" className="mhub-wholesale-escrow__link" onClick={() => goPage("escrow")}>
          {isEn ? "Escrow" : "Escrow"} →
        </button>
      </div>

      <div className="mhub-wholesale-trust" aria-label={isEn ? "Wholesale guarantees" : "Garanties gros"}>
        {badges.map((b) => (
          <span key={b.label} className="mhub-wholesale-trust__pill" title={b.title}>
            <ContentIcon name={b.iconKey} size={14} />
            {b.label}
          </span>
        ))}
        <VerifiedSellerBadge verified compact locale={locale} />
      </div>

      <div className="mhub-wholesale-links">
        <button type="button" className="mhub-wholesale-links__btn" onClick={() => goPage("merchHub", { merchHub: "import-chine" })}>
          🌏 {isEn ? "International import" : "Import international"}
        </button>
        <button type="button" className="mhub-wholesale-links__btn" onClick={() => goPage("importSupplier")}>
          {isEn ? "Become a supplier" : "Devenir fournisseur"}
        </button>
      </div>
    </>
  );
}
