// ═══════════════════════════════════════════════════════════════
//  YORIX CM — CONTRACT ACCEPTANCE MODAL
//  ✅ Affichage contrat scrollable
//  ✅ Scroll obligatoire avant activation checkbox
//  ✅ Checkbox + double confirmation
//  ✅ Engagement spécifique par rôle
//  ✅ Signature numérique (nom, tel, IP, user-agent)
//  ✅ Stockage Supabase pour traçabilité légale
// ═══════════════════════════════════════════════════════════════

import { useState, useRef, useEffect } from "react";
import { supabase } from "../lib/supabase";

// Version du contrat — incrémenter à chaque mise à jour
export const CONTRACT_VERSION = "v1.0";

// ── ENGAGEMENTS SPÉCIFIQUES PAR RÔLE ──
const ENGAGEMENTS_ROLE = {
  seller: {
    icon: "🏪",
    label: "Vendeur",
    color: "#f59e0b",
    engagement: "Je m'engage à fournir des produits conformes, authentiques et à respecter les transactions Yorix.",
  },
  provider: {
    icon: "👷",
    label: "Prestataire",
    color: "#8b5cf6",
    engagement: "Je m'engage à fournir des services conformes, professionnels et à respecter mes clients.",
  },
  delivery: {
    icon: "🚚",
    label: "Livreur",
    color: "#3b82f6",
    engagement: "Je m'engage à respecter les tarifs Yorix Ride, livrer les colis avec soin et dans les délais.",
  },
};

export function ContractAcceptance({
  open,
  onClose,
  onAccepted,
  user,
  userData,
  role = "seller",
  authForm = {},
}) {
  const [scrollComplete, setScrollComplete]   = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [confirmModal, setConfirmModal]       = useState(false);
  const [submitting, setSubmitting]           = useState(false);
  const [error, setError]                     = useState("");
  const scrollRef = useRef(null);

  // Reset à chaque ouverture
  useEffect(() => {
    if (open) {
      setScrollComplete(false);
      setCheckboxChecked(false);
      setConfirmModal(false);
      setError("");
    }
  }, [open]);

  if (!open) return null;

  const roleInfo = ENGAGEMENTS_ROLE[role] || ENGAGEMENTS_ROLE.seller;

  // ── Détection du scroll complet ──
  const handleScroll = (e) => {
    const el = e.target;
    const reachedBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;
    if (reachedBottom && !scrollComplete) {
      setScrollComplete(true);
    }
  };

  // ── Étape 1 : valider que tout est OK puis ouvrir confirmation ──
  const handleAcceptClick = () => {
    if (!scrollComplete) {
      setError("Veuillez d'abord lire l'intégralité du contrat (scrollez jusqu'en bas).");
      return;
    }
    if (!checkboxChecked) {
      setError("Vous devez cocher la case d'acceptation pour continuer.");
      return;
    }
    setError("");
    setConfirmModal(true);
  };

  // ── Étape 2 : confirmation finale + enregistrement Supabase ──
  const handleFinalConfirm = async () => {
    setSubmitting(true);
    setError("");

    try {
      // Récupérer l'IP et user-agent côté client
      let ip = "unknown";
      try {
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipRes.json();
        ip = ipData.ip || "unknown";
      } catch (e) {
        console.warn("Impossible de récupérer l'IP:", e);
      }

      const userAgent = navigator.userAgent || "unknown";
      const fullName = authForm?.nom || userData?.nom || "Inconnu";
      const phone    = authForm?.tel || userData?.telephone || "Inconnu";

      // Enregistrer dans Supabase (table user_contract_acceptance)
      const { error: dbError } = await supabase
        .from("user_contract_acceptance")
        .insert({
          user_id:             user?.id || null,
          full_name:           fullName,
          phone:               phone,
          role:                role,
          contract_version:    CONTRACT_VERSION,
          accepted_at:         new Date().toISOString(),
          ip_address:          ip,
          user_agent:          userAgent,
          acceptance_checkbox: true,
          otp_verified:        false,
          signature_type:      "checkbox_v1",
        });

      if (dbError) {
        console.warn("Acceptance DB error:", dbError);
        // On continue quand même, mais on log
      }

      // Callback succès
      setSubmitting(false);
      setConfirmModal(false);
      onAccepted({
        version:    CONTRACT_VERSION,
        acceptedAt: new Date().toISOString(),
        ip,
        userAgent,
      });

    } catch (err) {
      console.error("Erreur acceptance:", err);
      setError("Erreur : " + (err.message || "Impossible d'enregistrer l'acceptation."));
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* ═══ MODAL PRINCIPAL ═══ */}
      <div
        onClick={(e) => e.target === e.currentTarget && !submitting && onClose()}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(10, 20, 16, 0.88)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          zIndex: 99998,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          animation: "yfadeIn .25s ease",
        }}
      >
        <div
          style={{
            background: "var(--surface, #fff)",
            borderRadius: 18,
            maxWidth: 720,
            width: "100%",
            maxHeight: "92vh",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 28px 70px rgba(0,0,0,.45)",
            animation: "yslideUp .3s cubic-bezier(.2,.8,.2,1)",
            overflow: "hidden",
          }}
        >
          {/* ═══ HEADER ═══ */}
          <div
            style={{
              background: "linear-gradient(135deg, #0a1410 0%, #1a3a24 100%)",
              padding: "20px 24px",
              color: "#fff",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: roleInfo.color,
                color: "#fff",
                padding: "4px 12px",
                borderRadius: 50,
                fontSize: ".7rem",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              {roleInfo.icon} Inscription {roleInfo.label}
            </div>
            <h2
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: "1.3rem",
                fontWeight: 800,
                marginBottom: 4,
                letterSpacing: "-.4px",
                lineHeight: 1.2,
              }}
            >
              Contrat d'utilisation et d'engagement Yorix
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,.7)",
                fontSize: ".82rem",
                lineHeight: 1.5,
                marginBottom: 0,
              }}
            >
              Veuillez lire attentivement ces conditions. L'inscription implique votre engagement contractuel.
            </p>

            {/* Barre de progression du scroll */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 3,
                background: "rgba(255,255,255,.15)",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, var(--yellow, #fcd116), #4fd17d)",
                  width: scrollComplete ? "100%" : "20%",
                  transition: "width .4s",
                }}
              />
            </div>
          </div>

          {/* ═══ CONTRAT SCROLLABLE ═══ */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            style={{
              padding: "20px 24px",
              overflowY: "auto",
              flex: 1,
              fontSize: ".84rem",
              lineHeight: 1.65,
              color: "var(--ink, #111)",
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            <ContractContent role={role} roleInfo={roleInfo} />

            {/* Indicateur "Continuez à scroller" si pas encore complet */}
            {!scrollComplete && (
              <div
                style={{
                  position: "sticky",
                  bottom: 0,
                  textAlign: "center",
                  padding: "10px",
                  background: "linear-gradient(to top, var(--surface, #fff) 60%, rgba(255,255,255,0))",
                  pointerEvents: "none",
                  fontSize: ".74rem",
                  color: "var(--gray, #666)",
                  fontWeight: 600,
                }}
              >
                ⬇ Continuez à scroller pour activer l'acceptation
              </div>
            )}
            {scrollComplete && (
              <div
                style={{
                  textAlign: "center",
                  padding: "12px",
                  marginTop: 16,
                  background: "var(--green-pale, #e8f5e9)",
                  border: "1px solid var(--green-light, #86efac)",
                  borderRadius: 9,
                  fontSize: ".78rem",
                  color: "var(--green, #1a6b3a)",
                  fontWeight: 700,
                }}
              >
                ✓ Vous avez lu l'intégralité du contrat
              </div>
            )}
          </div>

          {/* ═══ FOOTER : CHECKBOX + BOUTONS ═══ */}
          <div
            style={{
              borderTop: "1px solid var(--border, #e5e5e5)",
              padding: "16px 24px",
              background: "var(--surface2, #f8f8f8)",
            }}
          >
            {/* Engagement spécifique au rôle (mis en avant) */}
            <div
              style={{
                background: `${roleInfo.color}15`,
                border: `1.5px solid ${roleInfo.color}40`,
                borderRadius: 9,
                padding: "10px 12px",
                marginBottom: 12,
                fontSize: ".78rem",
                color: "var(--ink, #111)",
                fontWeight: 600,
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
              }}
            >
              <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{roleInfo.icon}</span>
              <span>{roleInfo.engagement}</span>
            </div>

            {/* Checkbox d'acceptation */}
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                cursor: scrollComplete ? "pointer" : "not-allowed",
                opacity: scrollComplete ? 1 : 0.5,
                marginBottom: 12,
                userSelect: "none",
              }}
            >
              <input
                type="checkbox"
                checked={checkboxChecked}
                onChange={(e) => {
                  if (scrollComplete) setCheckboxChecked(e.target.checked);
                }}
                disabled={!scrollComplete}
                style={{
                  marginTop: 2,
                  width: 18,
                  height: 18,
                  cursor: scrollComplete ? "pointer" : "not-allowed",
                  accentColor: "var(--green, #1a6b3a)",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: ".82rem",
                  lineHeight: 1.5,
                  color: "var(--ink, #111)",
                  fontWeight: 600,
                }}
              >
                J'ai lu, compris et j'accepte les conditions d'utilisation, commissions, règles et engagements de Yorix.
              </span>
            </label>

            {/* Microcopy rassurant */}
            <p
              style={{
                fontSize: ".7rem",
                color: "var(--gray, #666)",
                marginBottom: 12,
                lineHeight: 1.5,
              }}
            >
              🛡️ Cette étape protège Yorix, vos clients et votre activité.
              Yorix protège ses utilisateurs grâce à des engagements de transparence, qualité et sécurité.
            </p>

            {/* Erreur */}
            {error && (
              <div
                style={{
                  background: "#fff0f0",
                  border: "1px solid #fecaca",
                  color: "#ce1126",
                  padding: "8px 12px",
                  borderRadius: 7,
                  fontSize: ".78rem",
                  marginBottom: 10,
                }}
              >
                ⚠️ {error}
              </div>
            )}

            {/* Boutons */}
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={onClose}
                disabled={submitting}
                style={{
                  flex: 1,
                  background: "var(--surface, #fff)",
                  color: "var(--ink, #111)",
                  border: "1.5px solid var(--border, #e5e5e5)",
                  padding: "12px 16px",
                  borderRadius: 9,
                  fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 600,
                  fontSize: ".85rem",
                  cursor: submitting ? "not-allowed" : "pointer",
                }}
              >
                Annuler
              </button>
              <button
                onClick={handleAcceptClick}
                disabled={!scrollComplete || !checkboxChecked || submitting}
                style={{
                  flex: 2,
                  background:
                    scrollComplete && checkboxChecked
                      ? "linear-gradient(135deg, var(--green, #1a6b3a), #0d4d28)"
                      : "var(--border, #e5e5e5)",
                  color: scrollComplete && checkboxChecked ? "#fff" : "var(--gray, #666)",
                  border: "none",
                  padding: "12px 16px",
                  borderRadius: 9,
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 800,
                  fontSize: ".88rem",
                  cursor:
                    scrollComplete && checkboxChecked && !submitting
                      ? "pointer"
                      : "not-allowed",
                  transition: "all .2s",
                }}
              >
                ✓ Accepter et continuer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ MODAL DE DOUBLE CONFIRMATION ═══ */}
      {confirmModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.5)",
            backdropFilter: "blur(4px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            animation: "yfadeIn .2s ease",
          }}
        >
          <div
            style={{
              background: "var(--surface, #fff)",
              borderRadius: 14,
              maxWidth: 440,
              width: "100%",
              padding: "24px 22px",
              boxShadow: "0 20px 50px rgba(0,0,0,.4)",
              animation: "yslideUp .3s cubic-bezier(.2,.8,.2,1)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>📜</div>
              <h3
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 800,
                  fontSize: "1.15rem",
                  color: "var(--ink, #111)",
                  marginBottom: 6,
                  letterSpacing: "-.3px",
                }}
              >
                Confirmer votre engagement
              </h3>
              <p
                style={{
                  fontSize: ".84rem",
                  color: "var(--gray, #666)",
                  lineHeight: 1.6,
                }}
              >
                En acceptant, vous reconnaissez être <strong style={{ color: "var(--ink, #111)" }}>légalement engagé</strong> envers les conditions Yorix. Cette acceptation sera tracée et conservée comme preuve.
              </p>
            </div>

            {/* Récap des informations qui seront enregistrées */}
            <div
              style={{
                background: "var(--surface2, #f5f5f5)",
                border: "1px solid var(--border, #e5e5e5)",
                borderRadius: 9,
                padding: "12px 14px",
                marginBottom: 14,
                fontSize: ".74rem",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 6, color: "var(--gray, #666)" }}>
                📋 Informations enregistrées :
              </div>
              <div style={{ color: "var(--ink, #111)", lineHeight: 1.7 }}>
                <div>👤 <strong>{authForm?.nom || userData?.nom || "—"}</strong></div>
                <div>📞 {authForm?.tel || userData?.telephone || "—"}</div>
                <div>{roleInfo.icon} Rôle : {roleInfo.label}</div>
                <div>📅 {new Date().toLocaleString("fr-FR")}</div>
                <div>📝 Contrat version {CONTRACT_VERSION}</div>
              </div>
            </div>

            {error && (
              <div
                style={{
                  background: "#fff0f0",
                  border: "1px solid #fecaca",
                  color: "#ce1126",
                  padding: "8px 12px",
                  borderRadius: 7,
                  fontSize: ".78rem",
                  marginBottom: 10,
                }}
              >
                ⚠️ {error}
              </div>
            )}

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setConfirmModal(false)}
                disabled={submitting}
                style={{
                  flex: 1,
                  background: "var(--surface, #fff)",
                  color: "var(--ink, #111)",
                  border: "1.5px solid var(--border, #e5e5e5)",
                  padding: "11px 16px",
                  borderRadius: 9,
                  fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 600,
                  fontSize: ".82rem",
                  cursor: submitting ? "not-allowed" : "pointer",
                }}
              >
                ← Annuler
              </button>
              <button
                onClick={handleFinalConfirm}
                disabled={submitting}
                style={{
                  flex: 1.5,
                  background: "linear-gradient(135deg, var(--green, #1a6b3a), #0d4d28)",
                  color: "#fff",
                  border: "none",
                  padding: "11px 16px",
                  borderRadius: 9,
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 800,
                  fontSize: ".82rem",
                  cursor: submitting ? "wait" : "pointer",
                  opacity: submitting ? 0.7 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                {submitting ? (
                  <>
                    <span
                      style={{
                        width: 14,
                        height: 14,
                        border: "2px solid #fff",
                        borderTopColor: "transparent",
                        borderRadius: "50%",
                        animation: "spin .7s linear infinite",
                      }}
                    />
                    Enregistrement...
                  </>
                ) : (
                  "✓ Accepter et continuer"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes yfadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes yslideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPOSANT INTERNE : Contenu du contrat (HTML lisible)
// ─────────────────────────────────────────────────────────────
function ContractContent({ role, roleInfo }) {
  const Heading = ({ children }) => (
    <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: ".95rem", fontWeight: 800, color: "var(--ink, #111)", marginTop: 18, marginBottom: 8, letterSpacing: "-.2px" }}>
      {children}
    </h3>
  );

  const SubHeading = ({ children }) => (
    <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: ".84rem", fontWeight: 700, color: "var(--ink, #111)", marginTop: 12, marginBottom: 6 }}>
      {children}
    </h4>
  );

  return (
    <div>
      <div
        style={{
          background: "var(--green-pale, #e8f5e9)",
          border: "1px solid var(--green-light, #86efac)",
          borderRadius: 9,
          padding: "10px 12px",
          marginBottom: 14,
          fontSize: ".78rem",
        }}
      >
        <div style={{ fontWeight: 700, color: "var(--green, #1a6b3a)", marginBottom: 4 }}>
          📜 Contrat Yorix CM — Version v1.0 — {new Date().toLocaleDateString("fr-FR")}
        </div>
        <div style={{ color: "var(--ink, #111)" }}>
          Marketplace camerounaise • Vendeurs • Prestataires • Livreurs
        </div>
      </div>

      <Heading>PRÉAMBULE</Heading>
      <p>Le présent contrat régit les relations entre <strong>YORIX CAMEROUN</strong> (« Yorix »), exploitant www.yorix.cm, et toute personne physique ou morale (« l'Utilisateur Professionnel ») souhaitant proposer des produits, services ou livraisons via la Plateforme.</p>
      <p>En cochant la case d'acceptation, vous reconnaissez avoir lu, compris et accepté l'intégralité des présentes conditions, et vous engagez juridiquement à les respecter.</p>

      <Heading>ARTICLE 1 — OBJET</Heading>
      <p>Le présent Contrat définit les conditions d'utilisation de Yorix pour vendre des produits, proposer des services ou effectuer des livraisons. L'inscription est <strong>gratuite</strong>. Yorix se rémunère via une commission de 5% sur chaque transaction.</p>

      <Heading>ARTICLE 2 — INSCRIPTION ET VÉRIFICATION</Heading>
      <p>Pour vous inscrire, vous devez : être âgé d'<strong>au moins 18 ans</strong>, disposer d'une <strong>pièce d'identité valide</strong>, fournir un <strong>numéro camerounais</strong> actif (MTN ou Orange) et fournir des informations exactes.</p>
      <p>Yorix se réserve le droit de demander des justificatifs (CNI, attestation, photo) à tout moment. Les comptes non vérifiés peuvent être suspendus.</p>

      <Heading>ARTICLE 3 — ENGAGEMENTS COMMUNS</Heading>
      <p>En vous inscrivant, vous vous engagez à :</p>
      <ul style={{ paddingLeft: 20, marginTop: 6 }}>
        <li>Respecter les Acheteurs : courtoisie, professionnalisme, honnêteté</li>
        <li>Fournir des informations exactes</li>
        <li>Respecter les engagements (délai, qualité, prix)</li>
        <li><strong>Ne jamais contourner Yorix</strong> en proposant un paiement direct hors plateforme</li>
        <li>Ne pas frauder (faux avis, faux profils, doubles comptes)</li>
        <li>Respecter les lois camerounaises en vigueur</li>
        <li>Maintenir un comportement professionnel</li>
        <li>Coopérer avec Yorix en cas de litige</li>
      </ul>

      <Heading>ARTICLE 4 — ENGAGEMENT SPÉCIFIQUE À VOTRE RÔLE</Heading>
      <div
        style={{
          background: `${roleInfo.color}15`,
          border: `1.5px solid ${roleInfo.color}50`,
          borderRadius: 9,
          padding: "12px 14px",
          marginTop: 8,
        }}
      >
        <div style={{ fontWeight: 800, marginBottom: 6, color: "var(--ink, #111)" }}>
          {roleInfo.icon} En tant que {roleInfo.label}
        </div>
        {role === "seller" && (
          <ul style={{ paddingLeft: 20, marginTop: 4 }}>
            <li>Je m'engage à fournir des <strong>produits conformes</strong> à leur description</li>
            <li>Je garantis que mes produits sont <strong>authentiques et légaux</strong></li>
            <li>Je m'engage à <strong>expédier dans les délais</strong> annoncés</li>
            <li>J'accepte la <strong>commission Yorix de 5%</strong> sur chaque vente</li>
            <li>J'accepte le système <strong>Escrow</strong> (libération des fonds après livraison validée)</li>
            <li>Je m'engage à <strong>rembourser</strong> en cas de produit non conforme</li>
            <li>Je ne vendrai <strong>jamais de produits contrefaits, illégaux ou dangereux</strong></li>
          </ul>
        )}
        {role === "provider" && (
          <ul style={{ paddingLeft: 20, marginTop: 4 }}>
            <li>Je m'engage à fournir des <strong>services conformes et professionnels</strong></li>
            <li>Je garantis avoir les <strong>qualifications nécessaires</strong></li>
            <li>Je m'engage à <strong>respecter les rendez-vous</strong> et délais</li>
            <li>Je facture des <strong>tarifs justes et transparents</strong></li>
            <li>Tarifs Yorix recommandés : <strong>10 000 FCFA / projet</strong> ou <strong>5 000 FCFA / heure</strong></li>
            <li>J'accepte la <strong>commission Yorix de 5%</strong></li>
            <li>Je ne solliciterai <strong>jamais de paiement hors Yorix</strong> pour contourner la commission</li>
          </ul>
        )}
        {role === "delivery" && (
          <ul style={{ paddingLeft: 20, marginTop: 4 }}>
            <li>Je m'engage à <strong>respecter les tarifs Yorix Ride</strong> affichés au client</li>
            <li>Je m'engage à <strong>livrer les colis confiés</strong> dans les délais</li>
            <li>J'accepte la <strong>commission Yorix</strong> sur chaque livraison</li>
            <li>Je dispose d'un <strong>véhicule en bon état</strong> et des <strong>documents légaux</strong></li>
            <li>Je traiterai les colis avec <strong>soin et confidentialité</strong></li>
            <li>En cas de <strong>perte ou détérioration</strong>, j'accepte d'être tenu responsable</li>
            <li>Je n'effectuerai <strong>aucune livraison illégale</strong> (drogues, armes, contrefaçons)</li>
          </ul>
        )}
      </div>

      <Heading>ARTICLE 5 — COMMISSIONS ET PAIEMENTS</Heading>
      <SubHeading>5.1 Commission Yorix</SubHeading>
      <p>Yorix prélève une <strong>commission de 5%</strong> sur chaque transaction. Exemple : pour 10 000 FCFA, vous recevez 9 500 FCFA.</p>
      <SubHeading>5.2 Paiement</SubHeading>
      <p>Versement via <strong>MTN MoMo</strong> ou <strong>Orange Money</strong>, au plus tard <strong>48 heures</strong> après validation de la livraison/prestation.</p>
      <SubHeading>5.3 Modification des commissions</SubHeading>
      <p>Yorix peut modifier les commissions avec un <strong>préavis de 30 jours</strong>.</p>

      <Heading>ARTICLE 6 — SYSTÈME ESCROW</Heading>
      <p>Les fonds versés par l'Acheteur sont <strong>bloqués chez Yorix</strong> jusqu'à validation de la livraison. En cas de litige, Yorix arbitre sous <strong>48h maximum</strong>.</p>

      <Heading>ARTICLE 7 — NOTATION ET RÉPUTATION</Heading>
      <p>Les Acheteurs notent de <strong>1 à 5 étoiles</strong>. Une note moyenne sous <strong>3,0/5</strong> sur plus de 10 avis peut entraîner suspension. Tout faux avis entraîne l'<strong>exclusion immédiate</strong>.</p>

      <Heading>ARTICLE 8 — INTERDICTIONS ET SANCTIONS</Heading>
      <p><strong>Strictement interdit :</strong></p>
      <ul style={{ paddingLeft: 20 }}>
        <li>Contournement de la plateforme (paiement direct)</li>
        <li>Faux avis, faux profils, fausses livraisons</li>
        <li>Vente de produits illégaux, contrefaits, dangereux</li>
        <li>Discrimination, harcèlement, propos haineux</li>
        <li>Usurpation d'identité</li>
        <li>Tentative de piratage</li>
      </ul>
      <p><strong>Sanctions :</strong> avertissement, suspension (24h-30j), exclusion définitive, retenue des paiements, poursuites judiciaires.</p>

      <Heading>ARTICLE 9 — RESPONSABILITÉ</Heading>
      <p>Vous êtes <strong>seul responsable</strong> de vos produits/services/livraisons. Yorix agit comme <strong>intermédiaire technique</strong>.</p>

      <Heading>ARTICLE 10 — DONNÉES PERSONNELLES</Heading>
      <p>Vos données sont stockées de manière sécurisée et jamais revendues. Droit d'accès, rectification, suppression : <strong>support@yorix.cm</strong>.</p>

      <Heading>ARTICLE 11 — TRAÇABILITÉ DE L'ACCEPTATION</Heading>
      <p>En cochant la case, sont enregistrés : votre nom, téléphone, rôle, date/heure, IP, navigateur, version du contrat. Ces informations constituent une <strong>preuve juridique</strong>.</p>

      <Heading>ARTICLE 12 — MODIFICATION DU CONTRAT</Heading>
      <p>Yorix peut modifier ce contrat. Vous serez notifié par email et devrez réaccepter la nouvelle version lors de votre prochaine connexion.</p>

      <Heading>ARTICLE 13 — RÉSILIATION</Heading>
      <p>Vous pouvez résilier à tout moment via <strong>support@yorix.cm</strong>. Yorix peut résilier sans préavis en cas de manquement grave, fraude.</p>

      <Heading>ARTICLE 14 — DROIT APPLICABLE</Heading>
      <p>Contrat régi par le <strong>droit camerounais</strong>. En cas de litige : tribunaux compétents de <strong>Douala</strong>.</p>

      <Heading>ARTICLE 15 — CONTACT</Heading>
      <p>📧 support@yorix.cm<br/>📱 +237 696 56 56 54<br/>📍 Douala / Yaoundé, Cameroun</p>

      <div
        style={{
          marginTop: 24,
          padding: "14px 16px",
          background: "linear-gradient(135deg, #1a3a24, #0d3320)",
          borderRadius: 11,
          color: "#fff",
        }}
      >
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".95rem", marginBottom: 6 }}>
          🤝 Engagement final
        </div>
        <p style={{ color: "rgba(255,255,255,.85)", fontSize: ".82rem", lineHeight: 1.6, marginBottom: 0 }}>
          En acceptant, je reconnais que je ne crée pas simplement un compte. Je m'engage à respecter un système, des engagements professionnels et des obligations légales. Yorix protège ses utilisateurs grâce à des engagements de transparence, qualité et sécurité.
        </p>
      </div>

      <p style={{ textAlign: "center", marginTop: 16, fontSize: ".7rem", color: "var(--gray, #666)" }}>
        🇨🇲 Yorix CM — La marketplace de confiance du Cameroun
      </p>
    </div>
  );
}
