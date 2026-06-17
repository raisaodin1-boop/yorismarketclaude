import { useEffect, useState } from "react";
import { getReferralProfile, getReferralStats, REFERRAL_BONUS_AMOUNT } from "../lib/referralApi";
import { ReferralConsentModal } from "./ReferralConsentModal";

const SITE_URL = import.meta.env.VITE_PUBLIC_SITE_URL || "https://www.yorix.cm";

export function ReferralPanel({ user, userData }) {
  const [profile, setProfile] = useState(null); // { referral_code, referral_consent_signed_at, ... }
  const [stats, setStats] = useState({ referrals: [], totalEarned: 0, pendingCount: 0, creditedCount: 0 });
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showConsent, setShowConsent] = useState(false);

  const load = async () => {
    setLoading(true);
    const [p, s] = await Promise.all([
      getReferralProfile(user.id),
      getReferralStats(user.id),
    ]);
    setProfile(p);
    setStats(s);
    setLoading(false);
  };

  useEffect(() => { if (user?.id) load(); }, [user?.id]);

  const code = profile?.referral_code;
  const hasSigned = !!profile?.referral_consent_signed_at;
  // Lien direct vers la page d'inscription avec code pré-rempli
  const referralLink = code ? `${SITE_URL}/?register=1&ref=${code}` : "";

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const shareWhatsApp = () => {
    const msg = `🏪 Rejoins-moi sur Yorix.cm, la marketplace camerounaise #1 !\n\nUtilise mon code de parrainage *${code}* pour t'inscrire, achète un produit et je reçois ${REFERRAL_BONUS_AMOUNT.toLocaleString("fr-FR")} FCFA de bonus.\n\nLien direct : ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  const handleCodeGenerated = (newCode) => {
    setShowConsent(false);
    setProfile((p) => ({ ...p, referral_code: newCode, referral_consent_signed_at: new Date().toISOString() }));
  };

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[120, 80, 100].map((h, i) => (
          <div key={i} className="yrp-shimmer" style={{ height: h, borderRadius: 14 }} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="yrp-root">
        <div className="dash-page-title">🤝 Programme de parrainage</div>

        {/* Bannière hero */}
        <div className="yrp-hero">
          <div className="yrp-hero-badge">💸</div>
          <div>
            <div className="yrp-hero-title">
              Recrutez un proche, gagnez {REFERRAL_BONUS_AMOUNT.toLocaleString("fr-FR")} FCFA
            </div>
            <div className="yrp-hero-sub">
              Partagez votre code unique. Le bonus est versé dès que votre filleul effectue son premier achat dans une catégorie éligible.
            </div>
          </div>
        </div>

        {/* Comment ça marche */}
        <div className="yrp-steps">
          {[
            { icon: "✍️", label: "Signez le contrat", sub: "Lecture et acceptation des conditions" },
            { icon: "🔗", label: "Partagez votre code", sub: "Via WhatsApp, SMS ou réseaux" },
            { icon: "🛒", label: "Le filleul achète", sub: "1er achat dans une catégorie éligible" },
            { icon: "💰", label: `+${REFERRAL_BONUS_AMOUNT.toLocaleString("fr-FR")} FCFA wallet`, sub: "Crédit automatique, retrait libre" },
          ].map((s, i) => (
            <div key={i} className="yrp-step">
              <div className="yrp-step-num">{i + 1}</div>
              <div className="yrp-step-icon">{s.icon}</div>
              <div className="yrp-step-label">{s.label}</div>
              <div className="yrp-step-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Bloc principal : pas encore de code → CTA */}
        {!code ? (
          <div className="yrp-card yrp-get-code-card">
            <div style={{ textAlign: "center", padding: "10px 0 6px" }}>
              <div style={{ fontSize: "3rem", marginBottom: 10 }}>🎫</div>
              <div className="yrp-card-title" style={{ fontSize: "1rem", marginBottom: 6 }}>
                Vous n'avez pas encore de code de parrainage
              </div>
              <p style={{ fontSize: ".82rem", color: "var(--gray)", lineHeight: 1.6, marginBottom: 18 }}>
                Obtenez votre code unique à 6 caractères en lisant et signant le contrat de parrainage Yorix. Cela prend 2 minutes.
              </p>
              <button className="yrp-cta-btn" onClick={() => setShowConsent(true)}>
                <span>🤝</span> Obtenir mon code de parrainage
              </button>
              {!hasSigned && (
                <p style={{ fontSize: ".7rem", color: "var(--gray)", marginTop: 10 }}>
                  Un formulaire de consentement vous sera présenté avant la génération du code.
                </p>
              )}
            </div>
          </div>
        ) : (
          /* Code actif → affichage + partage */
          <div className="yrp-card">
            <div className="yrp-card-title">Votre code de parrainage</div>
            <div className="yrp-code-display">{code}</div>
            <div className="yrp-link-row">
              <input
                className="yrp-link-input"
                value={referralLink}
                readOnly
                onFocus={(e) => e.target.select()}
                aria-label="Lien de parrainage"
              />
              <button
                className={`yrp-copy-btn${copied ? " copied" : ""}`}
                onClick={copyLink}
                aria-label="Copier le lien"
              >
                {copied ? "✓ Copié" : "Copier"}
              </button>
            </div>
            <button className="yrp-wa-btn" onClick={shareWhatsApp}>
              <svg viewBox="0 0 24 24" className="yrp-wa-icon" aria-hidden="true">
                <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Partager sur WhatsApp
            </button>
            {profile?.referral_consent_signed_at && (
              <p style={{ fontSize: ".68rem", color: "var(--gray)", marginTop: 10, textAlign: "center" }}>
                Contrat signé le {new Date(profile.referral_consent_signed_at).toLocaleDateString("fr-FR")} — {profile.referral_consent_fullname}
              </p>
            )}
          </div>
        )}

        {/* Statistiques */}
        <div className="yrp-stats-grid">
          <div className="yrp-stat">
            <div className="yrp-stat-val" style={{ color: "var(--green)" }}>
              {stats.totalEarned.toLocaleString("fr-FR")} FCFA
            </div>
            <div className="yrp-stat-lbl">Total gagné</div>
          </div>
          <div className="yrp-stat">
            <div className="yrp-stat-val">{stats.creditedCount}</div>
            <div className="yrp-stat-lbl">Filleuls actifs</div>
          </div>
          <div className="yrp-stat">
            <div className="yrp-stat-val" style={{ color: "#d97706" }}>{stats.pendingCount}</div>
            <div className="yrp-stat-lbl">En attente d'achat</div>
          </div>
        </div>

        {/* Liste filleuls */}
        {stats.referrals.length > 0 && (
          <div className="yrp-card">
            <div className="yrp-card-title">Mes filleuls ({stats.referrals.length})</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {stats.referrals.map((b) => (
                <div key={b.id} className="yrp-referral-row">
                  <div className="yrp-referral-avatar">
                    {(b.referred?.nom || "?")[0].toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="yrp-referral-nom">{b.referred?.nom || "Membre Yorix"}</div>
                    <div className="yrp-referral-date">
                      Inscrit le {new Date(b.created_at).toLocaleDateString("fr-FR")}
                    </div>
                  </div>
                  <div className={`yrp-referral-badge ${b.status === "credited" ? "credited" : "pending"}`}>
                    {b.status === "credited"
                      ? `+${Number(b.bonus_amount).toLocaleString("fr-FR")} FCFA`
                      : "Attend 1er achat"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="yrp-conditions">
          ℹ️ Le bonus de {REFERRAL_BONUS_AMOUNT.toLocaleString("fr-FR")} FCFA est versé uniquement après la première commande <strong>confirmée</strong> de votre filleul sur des produits des catégories éligibles (hors services, immobilier et prestations). Retrait minimum 5 000 FCFA.
        </div>
      </div>

      {showConsent && (
        <ReferralConsentModal
          user={user}
          userData={userData}
          onClose={() => setShowConsent(false)}
          onCodeGenerated={handleCodeGenerated}
        />
      )}
    </>
  );
}
