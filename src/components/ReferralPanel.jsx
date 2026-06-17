import { useEffect, useState } from "react";
import { getOrCreateReferralCode, getReferralStats } from "../lib/referralApi";
import { showAppToast } from "../lib/appToast";

const BONUS_AMOUNT = 5000;
const SITE_URL = import.meta.env.VITE_PUBLIC_SITE_URL || "https://www.yorix.cm";

export function ReferralPanel({ user, userData }) {
  const [code, setCode] = useState("");
  const [stats, setStats] = useState({ referrals: [], totalEarned: 0, pendingCount: 0, creditedCount: 0 });
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    (async () => {
      setLoading(true);
      const [c, s] = await Promise.all([
        getOrCreateReferralCode(user.id, userData?.nom || ""),
        getReferralStats(user.id),
      ]);
      setCode(c);
      setStats(s);
      setLoading(false);
    })();
  }, [user?.id, userData?.nom]);

  const referralLink = `${SITE_URL}/devenir-vendeur?ref=${code}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const shareWhatsApp = () => {
    const msg = `🏪 Rejoins-moi sur Yorix.cm, la marketplace camerounaise #1 !\n\nInscris-toi en tant que vendeur avec mon lien et commence à vendre dès aujourd'hui 👇\n${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div className="yrp-loading">
        <div className="yrp-shimmer" style={{ height: 120, borderRadius: 14, marginBottom: 12 }} />
        <div className="yrp-shimmer" style={{ height: 80, borderRadius: 14 }} />
      </div>
    );
  }

  return (
    <div className="yrp-root">
      <div className="dash-page-title">🤝 Programme de parrainage</div>

      {/* Hero bannière */}
      <div className="yrp-hero">
        <div className="yrp-hero-badge">💸</div>
        <div>
          <div className="yrp-hero-title">Recrutez un vendeur, gagnez {BONUS_AMOUNT.toLocaleString("fr-FR")} FCFA</div>
          <div className="yrp-hero-sub">
            Partagez votre lien unique. Dès que votre filleul passe sa première commande en tant que vendeur, le bonus est crédité automatiquement sur votre wallet Yorix.
          </div>
        </div>
      </div>

      {/* Comment ça marche */}
      <div className="yrp-steps">
        {[
          { icon: "🔗", label: "Partagez votre lien unique", sub: "Via WhatsApp, SMS ou réseaux sociaux" },
          { icon: "👤", label: "Votre filleul s'inscrit", sub: "Il crée son compte vendeur sur Yorix" },
          { icon: "🛒", label: "Il réalise sa 1ère vente", sub: "La commande est confirmée par l'acheteur" },
          { icon: "💰", label: `+${BONUS_AMOUNT.toLocaleString("fr-FR")} FCFA sur votre wallet`, sub: "Crédit automatique, retrait à tout moment" },
        ].map((s, i) => (
          <div key={i} className="yrp-step">
            <div className="yrp-step-num">{i + 1}</div>
            <div className="yrp-step-icon">{s.icon}</div>
            <div className="yrp-step-label">{s.label}</div>
            <div className="yrp-step-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Code & lien */}
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
      </div>

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
          <div className="yrp-stat-lbl">En attente</div>
        </div>
      </div>

      {/* Liste filleuls */}
      {stats.referrals.length > 0 ? (
        <div className="yrp-card" style={{ marginTop: 16 }}>
          <div className="yrp-card-title">Mes filleuls ({stats.referrals.length})</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {stats.referrals.map((b) => (
              <div key={b.id} className="yrp-referral-row">
                <div className="yrp-referral-avatar">
                  {(b.referred?.nom || "?")[0].toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="yrp-referral-nom">{b.referred?.nom || "Vendeur Yorix"}</div>
                  <div className="yrp-referral-date">
                    Inscrit le {new Date(b.created_at).toLocaleDateString("fr-FR")}
                  </div>
                </div>
                <div className={`yrp-referral-badge ${b.status === "credited" ? "credited" : "pending"}`}>
                  {b.status === "credited" ? `+${Number(b.bonus_amount).toLocaleString("fr-FR")} FCFA` : "En attente"}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="yrp-empty">
          <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>🤝</div>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Aucun filleul pour l'instant</div>
          <div style={{ fontSize: ".8rem", color: "var(--gray)" }}>
            Partagez votre lien sur WhatsApp pour commencer à gagner !
          </div>
          <button className="yrp-wa-btn" style={{ marginTop: 14 }} onClick={shareWhatsApp}>
            Partager maintenant
          </button>
        </div>
      )}

      <div className="yrp-conditions">
        ℹ️ Le bonus de {BONUS_AMOUNT.toLocaleString("fr-FR")} FCFA est crédité uniquement après la première commande confirmée de votre filleul. Retrait disponible dès 5 000 FCFA sur votre wallet Yorix.
      </div>
    </div>
  );
}
