import { useRef, useState } from "react";
import { REFERRAL_BONUS_AMOUNT, REFERRAL_ELIGIBLE_CATEGORIES, REFERRAL_CONSENT_VERSION, signConsentAndGetCode } from "../lib/referralApi";

const REFERRAL_CONSENT_VERSION_LABEL = REFERRAL_CONSENT_VERSION;

const ELIGIBLE_LABELS = {
  "electronique":   "Électronique & Technologie",
  "electromenager": "Électroménager",
  "maison-cuisine": "Maison & Cuisine",
  "mode-beaute":    "Mode & Beauté",
  "sante-bienetre": "Santé & Bien-être",
  "auto-moto":      "Automobile & Moto",
  "alimentation":   "Alimentation",
  "bebe-enfants":   "Bébé & Enfants",
  "education":      "Éducation & Formation",
  "agriculture":    "Agriculture & Agrobusiness",
};

const TODAY = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export function ReferralConsentModal({ user, userData, onClose, onCodeGenerated }) {
  const [step, setStep] = useState(1); // 1=présentation, 2=conditions légales, 3=signature
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [fullName, setFullName] = useState(userData?.nom || "");
  const [checks, setChecks] = useState({ c1: false, c2: false, c3: false, c4: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  const allChecked = Object.values(checks).every(Boolean);
  const canSign = scrolledToBottom && allChecked && fullName.trim().length >= 3;

  const handleScroll = (e) => {
    const el = e.currentTarget;
    if (el.scrollHeight - el.scrollTop <= el.clientHeight + 40) {
      setScrolledToBottom(true);
    }
  };

  const handleSign = async () => {
    if (!canSign) return;
    setLoading(true);
    setError("");
    const result = await signConsentAndGetCode(user.id, fullName);
    setLoading(false);
    if (result.ok) {
      onCodeGenerated(result.code);
    } else {
      setError(result.error || "Erreur. Réessayez.");
    }
  };

  return (
    <div
      className="rcm-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rcm-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="rcm-modal">
        {/* Header */}
        <div className="rcm-header">
          <div className="rcm-steps">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`rcm-step-dot${step >= s ? " active" : ""}${step > s ? " done" : ""}`}>
                {step > s ? "✓" : s}
              </div>
            ))}
          </div>
          <button className="rcm-close" onClick={onClose} aria-label="Fermer">✕</button>
        </div>

        {/* ÉTAPE 1 : Présentation du programme */}
        {step === 1 && (
          <div className="rcm-body">
            <div className="rcm-icon-hero">🤝</div>
            <h2 id="rcm-title" className="rcm-title">Programme de parrainage Yorix</h2>
            <p className="rcm-subtitle">
              Invitez vos proches à rejoindre Yorix.cm et gagnez <strong>{REFERRAL_BONUS_AMOUNT.toLocaleString("fr-FR")} FCFA</strong> par filleul actif.
            </p>

            <div className="rcm-info-cards">
              <div className="rcm-info-card">
                <div className="rcm-info-icon">🔗</div>
                <div>
                  <div className="rcm-info-title">Votre code unique à 6 caractères</div>
                  <div className="rcm-info-sub">Généré instantanément après signature. Partageable partout.</div>
                </div>
              </div>
              <div className="rcm-info-card">
                <div className="rcm-info-icon">🛒</div>
                <div>
                  <div className="rcm-info-title">Filleul doit acheter pour activer le bonus</div>
                  <div className="rcm-info-sub">L'inscription seule ne suffit pas. Le premier achat confirmé déclenche le versement.</div>
                </div>
              </div>
              <div className="rcm-info-card rcm-info-card--warn">
                <div className="rcm-info-icon">📦</div>
                <div>
                  <div className="rcm-info-title">Produits éligibles uniquement</div>
                  <div className="rcm-info-sub">Le bonus s'applique sur des catégories spécifiques de produits physiques.</div>
                </div>
              </div>
              <div className="rcm-info-card">
                <div className="rcm-info-icon">💰</div>
                <div>
                  <div className="rcm-info-title">{REFERRAL_BONUS_AMOUNT.toLocaleString("fr-FR")} FCFA crédités automatiquement</div>
                  <div className="rcm-info-sub">Sur votre wallet Yorix. Retrait disponible dès 5 000 FCFA via MTN MoMo ou Orange Money.</div>
                </div>
              </div>
            </div>

            <div className="rcm-eligible-list">
              <div className="rcm-eligible-title">Catégories éligibles au bonus :</div>
              <div className="rcm-eligible-tags">
                {REFERRAL_ELIGIBLE_CATEGORIES.map((c) => (
                  <span key={c} className="rcm-tag">{ELIGIBLE_LABELS[c] || c}</span>
                ))}
              </div>
            </div>

            <button className="rcm-btn-primary" onClick={() => setStep(2)}>
              Lire les conditions légales →
            </button>
          </div>
        )}

        {/* ÉTAPE 2 : Contrat / Conditions légales */}
        {step === 2 && (
          <div className="rcm-body">
            <h2 id="rcm-title" className="rcm-title">Contrat de parrainage</h2>
            <p className="rcm-subtitle" style={{ color: "var(--gray)", fontSize: ".8rem" }}>
              Lisez entièrement ce contrat avant de signer. Faites défiler jusqu'en bas.
            </p>

            <div className="rcm-scroll-container" onScroll={handleScroll} ref={scrollRef}>
              <div className="rcm-legal-doc">
                <div className="rcm-legal-header">
                  <div className="rcm-legal-logo">YORIX.CM</div>
                  <div className="rcm-legal-ref">Réf. : CONTRAT-PARRAINAGE-{REFERRAL_CONSENT_VERSION_LABEL}</div>
                  <div className="rcm-legal-date">Fait le {TODAY}</div>
                </div>

                <h3>CONTRAT DE PARTICIPATION AU PROGRAMME DE PARRAINAGE YORIX</h3>

                <section>
                  <h4>ARTICLE 1 — PARTIES</h4>
                  <p>
                    Le présent contrat est conclu entre :<br />
                    <strong>Yorix.cm</strong> (ci-après « la Plateforme »), marketplace camerounaise en ligne accessible à l'adresse www.yorix.cm, d'une part ;
                    et <strong>le Participant</strong>, toute personne physique titulaire d'un compte actif sur la Plateforme, souhaitant rejoindre le programme de parrainage, d'autre part.
                  </p>
                </section>

                <section>
                  <h4>ARTICLE 2 — OBJET</h4>
                  <p>
                    Le présent contrat a pour objet de définir les conditions dans lesquelles le Participant peut bénéficier d'une récompense financière en contrepartie de l'invitation de nouveaux membres à s'inscrire et à effectuer un premier achat sur la Plateforme Yorix.cm.
                  </p>
                </section>

                <section>
                  <h4>ARTICLE 3 — ATTRIBUTION DU CODE DE PARRAINAGE</h4>
                  <p>
                    3.1. Un code unique de 6 (six) caractères alphanumériques est attribué à chaque Participant après signature électronique du présent contrat.<br />
                    3.2. Ce code est personnel, incessible et ne peut être utilisé que par des tiers n'ayant jamais créé de compte sur Yorix.cm.<br />
                    3.3. Toute tentative de manipulation, de fraude ou d'utilisation abusive entraîne la révocation immédiate du code et l'annulation de tous les bonus associés.
                  </p>
                </section>

                <section>
                  <h4>ARTICLE 4 — CONDITIONS D'OBTENTION DU BONUS</h4>
                  <p>
                    4.1. <strong>Double condition obligatoire :</strong> Le bonus de <strong>{REFERRAL_BONUS_AMOUNT.toLocaleString("fr-FR")} FCFA</strong> est déclenché uniquement si le filleul (i) crée un compte Yorix.cm en utilisant le code de parrainage du Participant, ET (ii) effectue et confirme un premier achat de produits appartenant aux catégories éligibles listées à l'Article 6.<br />
                    4.2. L'inscription du filleul seule, sans achat confirmé, ne donne droit à aucune récompense.<br />
                    4.3. Le bonus est crédité une seule fois par filleul, indépendamment du nombre de commandes ultérieures.<br />
                    4.4. Le filleul doit avoir un compte nouveau, non préalablement lié à la Plateforme, et ne doit pas partager l'adresse IP, l'appareil ou le numéro de téléphone avec le Participant.
                  </p>
                </section>

                <section>
                  <h4>ARTICLE 5 — DÉLAI DE VERSEMENT</h4>
                  <p>
                    5.1. Le bonus est crédité automatiquement sur le wallet Yorix du Participant dans les 24 (vingt-quatre) heures suivant la confirmation de la commande du filleul par l'acheteur ou la livraison effective.<br />
                    5.2. Yorix.cm se réserve le droit de suspendre le versement dans le cadre d'une enquête sur une fraude présumée.
                  </p>
                </section>

                <section>
                  <h4>ARTICLE 6 — CATÉGORIES DE PRODUITS ÉLIGIBLES</h4>
                  <p>Seuls les achats de produits appartenant aux catégories suivantes ouvrent droit au bonus :</p>
                  <ul>
                    {REFERRAL_ELIGIBLE_CATEGORIES.map((c) => (
                      <li key={c}>{ELIGIBLE_LABELS[c] || c}</li>
                    ))}
                  </ul>
                  <p>
                    Sont expressément <strong>exclus</strong> : les services à domicile, les prestations en ligne, les offres d'emploi, les biens immobiliers, les produits industriels, et tout autre article relevant de catégories non listées ci-dessus. Yorix.cm se réserve le droit de modifier cette liste avec un préavis de 30 jours.
                  </p>
                </section>

                <section>
                  <h4>ARTICLE 7 — UTILISATION DU WALLET ET RETRAIT</h4>
                  <p>
                    7.1. Le bonus est crédité en FCFA sur le wallet Yorix du Participant.<br />
                    7.2. Le retrait est disponible à partir d'un solde minimum de <strong>5 000 FCFA</strong> via MTN Mobile Money ou Orange Money.<br />
                    7.3. Les montants crédités ne peuvent être convertis en points fidélité ni être reversés à un tiers.
                  </p>
                </section>

                <section>
                  <h4>ARTICLE 8 — OBLIGATIONS DU PARTICIPANT</h4>
                  <p>
                    Le Participant s'engage à :<br />
                    8.1. Ne partager son code qu'avec des personnes de bonne foi, n'ayant jamais utilisé Yorix.cm ;<br />
                    8.2. Ne pas créer de faux comptes (sockpuppets) pour générer des bonus artificiels ;<br />
                    8.3. Ne pas diffuser son code via des spams, messages en masse non sollicités ou plateformes de revente de codes ;<br />
                    8.4. Informer ses filleuls que le programme implique un achat pour activer la récompense.
                  </p>
                </section>

                <section>
                  <h4>ARTICLE 9 — SANCTIONS ET RÉSILIATION</h4>
                  <p>
                    9.1. En cas de violation des présentes conditions, Yorix.cm se réserve le droit de :<br />
                    — Annuler les bonus non encore versés ;<br />
                    — Récupérer les bonus déjà versés si la fraude est avérée ;<br />
                    — Suspendre ou fermer définitivement le compte du Participant ;<br />
                    — Engager des poursuites judiciaires selon la législation camerounaise applicable.<br />
                    9.2. Le présent contrat peut être résilié à tout moment par l'une ou l'autre des parties, sous réserve de 30 jours de préavis, sans effet sur les bonus déjà acquis.
                  </p>
                </section>

                <section>
                  <h4>ARTICLE 10 — PROTECTION DES DONNÉES PERSONNELLES</h4>
                  <p>
                    10.1. Les données collectées dans le cadre du programme (nom, date de signature, code attribué) sont traitées conformément à la Politique de Confidentialité de Yorix.cm, accessible sur www.yorix.cm/politique-confidentialite.<br />
                    10.2. Ces données sont conservées pendant toute la durée d'activité du compte et supprimées conformément aux obligations légales applicables au Cameroun.
                  </p>
                </section>

                <section>
                  <h4>ARTICLE 11 — DROIT APPLICABLE</h4>
                  <p>
                    Le présent contrat est soumis au droit camerounais. Tout litige relatif à son interprétation ou son exécution sera porté devant les juridictions compétentes du Cameroun, les parties convenant de rechercher en priorité une solution amiable.
                  </p>
                </section>

                <div className="rcm-legal-seal">
                  ✦ YORIX.CM — Document généré électroniquement · Version {REFERRAL_CONSENT_VERSION_LABEL} ✦
                </div>
              </div>
            </div>

            {!scrolledToBottom && (
              <p className="rcm-scroll-hint" aria-live="polite">
                ↓ Faites défiler jusqu'en bas pour continuer
              </p>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button className="rcm-btn-ghost" onClick={() => setStep(1)}>← Retour</button>
              <button
                className="rcm-btn-primary"
                disabled={!scrolledToBottom}
                onClick={() => setStep(3)}
                style={{ flex: 1 }}
              >
                J'ai lu le contrat → Signer
              </button>
            </div>
          </div>
        )}

        {/* ÉTAPE 3 : Signature */}
        {step === 3 && (
          <div className="rcm-body">
            <div className="rcm-icon-hero" style={{ fontSize: "2.5rem" }}>✍️</div>
            <h2 id="rcm-title" className="rcm-title">Signature électronique</h2>
            <p className="rcm-subtitle">
              En signant, vous acceptez les conditions du programme de parrainage Yorix.
            </p>

            <div className="rcm-sign-field">
              <label className="rcm-sign-label" htmlFor="rcm-fullname">
                Nom complet (tel qu'il apparaît sur votre pièce d'identité) <span aria-hidden>*</span>
              </label>
              <input
                id="rcm-fullname"
                className="rcm-sign-input"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex : Jean-Pierre Mbassi Ateba"
                autoComplete="name"
                minLength={3}
                required
              />
            </div>

            <fieldset className="rcm-checks" aria-label="Engagements à cocher">
              <legend className="rcm-checks-legend">Je confirme et m'engage à :</legend>
              {[
                { id: "c1", text: "Avoir lu et compris l'intégralité du contrat de parrainage Yorix." },
                { id: "c2", text: `Ne partager mon code qu'avec des personnes n'ayant jamais utilisé Yorix.cm, et les informer que le bonus est conditionné à un achat dans une catégorie éligible.` },
                { id: "c3", text: "Ne pas créer de faux comptes ni tenter de fraude pour générer des bonus artificiels, sous peine de suspension de mon compte." },
                { id: "c4", text: "Accepter que les données liées à ma participation soient conservées conformément à la politique de confidentialité de Yorix.cm." },
              ].map(({ id, text }) => (
                <label key={id} className={`rcm-check-item${checks[id] ? " checked" : ""}`}>
                  <input
                    type="checkbox"
                    checked={checks[id]}
                    onChange={(e) => setChecks((p) => ({ ...p, [id]: e.target.checked }))}
                    aria-label={text}
                  />
                  <span className="rcm-check-box" aria-hidden>{checks[id] ? "✓" : ""}</span>
                  <span className="rcm-check-text">{text}</span>
                </label>
              ))}
            </fieldset>

            <div className="rcm-sign-meta">
              <div>Date : <strong>{TODAY}</strong></div>
              <div>Depuis : <strong>{userData?.ville || "Cameroun"}</strong></div>
              <div>Compte : <strong>{user?.email}</strong></div>
            </div>

            {error && <p className="rcm-error" role="alert">{error}</p>}

            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button className="rcm-btn-ghost" onClick={() => setStep(2)} disabled={loading}>← Relire</button>
              <button
                className="rcm-btn-primary"
                disabled={!canSign || loading}
                onClick={handleSign}
                style={{ flex: 1 }}
              >
                {loading ? "Signature en cours…" : "Signer et obtenir mon code →"}
              </button>
            </div>
            {!canSign && (
              <p className="rcm-hint" aria-live="polite">
                {!scrolledToBottom ? "Relisez le contrat jusqu'en bas." : !allChecked ? "Cochez toutes les cases." : fullName.trim().length < 3 ? "Saisissez votre nom complet." : ""}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
