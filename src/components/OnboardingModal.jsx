import { useEffect } from "react";
import "./onboarding.css";

export function OnboardingModal({ open, onClose, onSelectAction, user }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const actions = [
    {
      id: "buy",
      icon: "🛍️",
      title: "Acheter",
      desc: "Des milliers de produits livrés à Yaoundé, Douala et partout.",
      gradient: "linear-gradient(135deg, #10b981, #059669)",
      bgColor: "rgba(16, 185, 129, .11)",
      color: "#059669",
      cta: "Explorer maintenant",
      popular: "⭐ Populaire",
      mini: "🔒 Escrow inclus",
    },
    {
      id: "sell",
      icon: "🏪",
      title: "Vendre",
      desc: "Créez votre boutique en 2 minutes. Vendez dès aujourd'hui.",
      gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
      bgColor: "rgba(245, 158, 11, .11)",
      color: "#d97706",
      cta: "Ouvrir ma boutique",
      popular: null,
      mini: "💰 Commission 5%",
    },
    {
      id: "service",
      icon: "👷",
      title: "Trouver un pro",
      desc: "Plombiers, électriciens, photographes — tous vérifiés.",
      gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
      bgColor: "rgba(139, 92, 246, .11)",
      color: "#7c3aed",
      cta: "Trouver un pro",
      popular: null,
      mini: "✓ 850+ vérifiés",
    },
    {
      id: "delivery",
      icon: "🚚",
      title: "Faire livrer",
      desc: "Un livreur récupère votre colis en moins de 30 min.",
      gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
      bgColor: "rgba(59, 130, 246, .11)",
      color: "#2563eb",
      cta: "Appeler un livreur",
      popular: null,
      mini: "⚡ ~25 min",
    },
  ];

  const trustBadges = [
    { icon: "🛡️", label: "Paiement sécurisé" },
    { icon: "✅", label: "Vendeurs vérifiés" },
    { icon: "🇨🇲", label: "100% Cameroun" },
    { icon: "⚡", label: "Inscription 2 min" },
  ];

  return (
    <div
      className="yx-ob-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="yx-ob-modal" role="dialog" aria-modal="true" aria-labelledby="yx-ob-title">
        <button className="yx-ob-close" onClick={onClose} aria-label="Fermer">✕</button>

        {/* ── Header ── */}
        <div className="yx-ob-header">
          <div className="yx-ob-eyebrow">
            <span className="yx-ob-eyebrow-dot" />
            🇨🇲 Bienvenue sur Yorix CM
          </div>
          <h1 id="yx-ob-title" className="yx-ob-title">
            Que voulez-vous <em>faire aujourd'hui&nbsp;?</em>
          </h1>
          <p className="yx-ob-subtitle">
            Acheter, vendre, faire livrer ou trouver un pro — Yorix s'occupe du reste.
          </p>
        </div>

        {/* ── Trust badges ── */}
        <div className="yx-ob-trust" aria-label="Garanties Yorix">
          {trustBadges.map((b) => (
            <div key={b.label} className="yx-ob-badge">
              <span aria-hidden>{b.icon}</span>
              <span>{b.label}</span>
            </div>
          ))}
        </div>

        {/* ── 2×2 grid ── */}
        <div className="yx-ob-grid">
          {actions.map((a) => (
            <button
              key={a.id}
              className="yx-ob-card"
              style={{
                "--yx-ob-gradient": a.gradient,
                "--yx-ob-bg": a.bgColor,
                "--yx-ob-color": a.color,
              }}
              onClick={() => onSelectAction(a.id)}
            >
              <div className="yx-ob-orb" aria-hidden />
              {a.popular && <div className="yx-ob-popular">{a.popular}</div>}

              <div
                className="yx-ob-icon"
                style={{ background: a.gradient }}
                aria-hidden
              >
                {a.icon}
              </div>

              <div className="yx-ob-card-body">
                <div className="yx-ob-card-title">{a.title}</div>
                <div className="yx-ob-card-desc">{a.desc}</div>
                <div className="yx-ob-card-mini">{a.mini}</div>
                <div className="yx-ob-card-cta">
                  {a.cta} <span aria-hidden>→</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* ── Footer ── */}
        <div className="yx-ob-footer">
          {user ? (
            <p className="connected">✅ Connecté. Choisissez une action pour continuer.</p>
          ) : (
            <p>💡 Pas encore inscrit ? Vous pourrez créer votre compte après avoir choisi.</p>
          )}
          <button className="yx-ob-skip" onClick={onClose}>
            Explorer librement le site
          </button>
        </div>
      </div>
    </div>
  );
}
