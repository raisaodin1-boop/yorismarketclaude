import { ContentIcon } from "../../lib/contentIcons";

const STEPS = {
  fr: [
    {
      n: "1",
      iconKey: "smartphone",
      title: "Le client paie",
      desc: "MTN MoMo, Orange Money ou carte — en toute sécurité depuis votre téléphone.",
    },
    {
      n: "2",
      iconKey: "lock",
      title: "Yorix garde l'argent",
      desc: "Votre paiement reste bloqué en escrow jusqu'à confirmation de la livraison.",
    },
    {
      n: "3",
      iconKey: "package",
      title: "Le vendeur est payé après livraison",
      desc: "Vous validez la réception — seulement alors le vendeur reçoit son argent.",
    },
  ],
  en: [
    {
      n: "1",
      iconKey: "smartphone",
      title: "The buyer pays",
      desc: "MTN MoMo, Orange Money or card — securely from your phone.",
    },
    {
      n: "2",
      iconKey: "lock",
      title: "Yorix holds the funds",
      desc: "Your payment stays in escrow until delivery is confirmed.",
    },
    {
      n: "3",
      iconKey: "package",
      title: "Seller paid after delivery",
      desc: "You confirm receipt — only then does the seller get paid.",
    },
  ],
};

const TRUST_SIGNALS = {
  fr: [
    { iconKey: "lock", label: "Paiement sécurisé", sub: "Escrow intégré" },
    { iconKey: "shield", label: "Escrow", sub: "Argent protégé" },
    { iconKey: "check", label: "Vendeurs vérifiés", sub: "Badge admin" },
    { iconKey: "truck", label: "Livraison suivie", sub: "Statut en temps réel" },
    { iconKey: "messageCircle", label: "WhatsApp 7j/7", sub: "Support local" },
    { iconKey: "refresh", label: "Remboursement", sub: "Politique CGV" },
  ],
  en: [
    { iconKey: "lock", label: "Secure payment", sub: "Built-in escrow" },
    { iconKey: "shield", label: "Escrow", sub: "Funds protected" },
    { iconKey: "check", label: "Verified sellers", sub: "Admin badge" },
    { iconKey: "truck", label: "Tracked delivery", sub: "Live status" },
    { iconKey: "messageCircle", label: "WhatsApp 7/7", sub: "Local support" },
    { iconKey: "refresh", label: "Refund policy", sub: "See terms" },
  ],
};

export function HomeEscrowTrust({ locale = "fr", goPage = () => {} }) {
  const lang = locale === "en" ? "en" : "fr";
  const steps = STEPS[lang];
  const signals = TRUST_SIGNALS[lang];

  return (
    <section className="yhm3-section yhm3-escrow-trust yx-reveal" aria-labelledby="yhm3-escrow-title">
      <div className="yhm3-section-head yhm3-section-head--center">
        <span className="yhm3-eyebrow-light">{lang === "en" ? "Your protection" : "Votre protection"}</span>
        <h2 id="yhm3-escrow-title" className="yhm3-h2 yhm3-h2--center">
          {lang === "en" ? "Why " : "Pourquoi "}
          <em>{lang === "en" ? "Yorix is different" : "Yorix est différent"}</em>
        </h2>
        <p className="yhm3-lead yhm3-lead--center">
          {lang === "en"
            ? "Unlike Facebook or informal chats, your money is protected until you receive your order."
            : "Contrairement à Facebook ou aux achats informels, votre argent est protégé jusqu'à réception de votre commande."}
        </p>
      </div>

      <div className="yhm3-escrow-steps">
        {steps.map((s, i) => (
          <article key={s.n} className={`yhm3-escrow-step yx-reveal yx-reveal-d${Math.min(i + 1, 3)}`}>
            <div className="yhm3-escrow-step__n" aria-hidden>
              {s.n}
            </div>
            <div className="yhm3-escrow-step__ico">
              <ContentIcon name={s.iconKey} size={22} />
            </div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </article>
        ))}
      </div>

      <div className="yhm3-escrow-cta-row">
        <button type="button" className="yhm3-btn yhm3-btn--pri" onClick={() => goPage("escrow")}>
          {lang === "en" ? "How Escrow works" : "Comprendre l'Escrow"}
        </button>
        <button type="button" className="yhm3-btn yhm3-btn--sec" onClick={() => goPage("produits")}>
          {lang === "en" ? "Shop with protection" : "Acheter en toute confiance"}
        </button>
      </div>

      <div className="yhm3-trust-signals" aria-label={lang === "en" ? "Trust guarantees" : "Garanties de confiance"}>
        {signals.map((t) => {
          const isRefund = t.iconKey === "refresh";
          const Tag = isRefund ? "button" : "div";
          return (
            <Tag
              key={t.label}
              type={isRefund ? "button" : undefined}
              className={`yhm3-trust-signal${isRefund ? " yhm3-trust-signal--link" : ""}`}
              onClick={isRefund ? () => goPage("cgv") : undefined}
            >
              <div className="yhm3-trust-signal__ico">
                <ContentIcon name={t.iconKey} size={18} />
              </div>
              <div>
                <div className="yhm3-trust-signal__lbl">{t.label}</div>
                <div className="yhm3-trust-signal__sub">{t.sub}</div>
              </div>
            </Tag>
          );
        })}
      </div>
    </section>
  );
}
