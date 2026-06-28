import { Shield, Lock, Unlock } from "lucide-react";
import { useCreditScore } from "../../hooks/useCreditScore";
import "../ai/yorixAiPanels.css";

/**
 * Yorix Credit Score — consentement + score expliqué (usage interne, conforme).
 */
export function CreditScorePanel({ user, locale = "fr" }) {
  const isEn = locale === "en";
  const { consent, profile, loading, grantConsent, revokeConsent } = useCreditScore(user?.id);

  if (!user?.id) {
    return (
      <section className="yai-panel yai-panel--credit">
        <p className="yai-panel__summary">
          {isEn ? "Sign in to access Yorix Credit Score." : "Connectez-vous pour accéder au Yorix Credit Score."}
        </p>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="yai-panel yai-panel--credit">
        <p className="yai-panel__summary">{isEn ? "Loading…" : "Chargement…"}</p>
      </section>
    );
  }

  if (!consent.consented) {
    return (
      <section className="yai-panel yai-panel--credit" aria-label="Yorix Credit Score">
        <header className="yai-panel__head">
          <Shield size={18} aria-hidden className="yai-panel__ico" />
          <div>
            <div className="yai-panel__brand">Yorix Credit Score</div>
            <div className="yai-panel__sub">{isEn ? "Opt-in required" : "Consentement requis"}</div>
          </div>
        </header>
        <p className="yai-panel__legal">
          {isEn
            ? "With your consent, Yorix analyzes your order, payment and delivery history to compute an internal trust score. This is not a bank credit score and is not shared with third parties without your permission."
            : "Avec votre accord, Yorix analyse votre historique d'achats, paiements et livraisons pour calculer un score de confiance interne. Ce n'est pas un score bancaire et n'est pas partagé à des tiers sans votre permission."}
        </p>
        <button type="button" className="yai-panel__btn" onClick={() => grantConsent().catch(console.warn)}>
          <Lock size={14} aria-hidden />
          {isEn ? "I agree — show my score" : "J'accepte — afficher mon score"}
        </button>
      </section>
    );
  }

  return (
    <section className="yai-panel yai-panel--credit" aria-label="Yorix Credit Score">
      <header className="yai-panel__head">
        <Shield size={18} aria-hidden className="yai-panel__ico" />
        <div>
          <div className="yai-panel__brand">Yorix Credit Score</div>
          <div className="yai-panel__sub">{isEn ? profile.tierLabelEn : profile.tierLabelFr}</div>
        </div>
        <div className="yai-credit-score" aria-label={`${profile.score}/100`}>
          {profile.score}
        </div>
      </header>

      <p className="yai-panel__summary">{isEn ? profile.summaryEn : profile.summaryFr}</p>

      <ul className="yai-panel__factors">
        {profile.factors.map((f) => (
          <li key={f.key} className={`yai-factor yai-factor--${f.impact >= 0 ? "positive" : "warning"}`}>
            <span>{isEn ? f.labelEn : f.labelFr}</span>
            <span className="yai-factor__impact">{f.impact > 0 ? `+${f.impact}` : f.impact}</span>
          </li>
        ))}
      </ul>

      <button type="button" className="yai-panel__btn yai-panel__btn--ghost" onClick={() => revokeConsent().catch(console.warn)}>
        <Unlock size={14} aria-hidden />
        {isEn ? "Revoke consent" : "Révoquer le consentement"}
      </button>
    </section>
  );
}
