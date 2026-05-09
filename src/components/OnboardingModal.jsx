// ═══════════════════════════════════════════════════════════════
//  YORIX CM — ONBOARDING MODAL
//  Modal d'accueil pour nouveaux visiteurs
//  4 actions principales : Acheter / Vendre / Trouver un service / Demander une livraison
// ═══════════════════════════════════════════════════════════════

import { useEffect } from "react";

export function OnboardingModal({ open, onClose, onSelectAction, user }) {
  // Bloquer le scroll quand le modal est ouvert
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const actions = [
    {
      id: "buy",
      icon: "🛍️",
      title: "Acheter",
      desc: "Découvre des milliers de produits livrés chez toi",
      color: "linear-gradient(135deg, #10b981, #059669)",
      bgIcon: "rgba(16, 185, 129, .12)",
      cta: "Voir les produits",
    },
    {
      id: "sell",
      icon: "🏪",
      title: "Vendre",
      desc: "Crée ta boutique et vends partout au Cameroun",
      color: "linear-gradient(135deg, #f59e0b, #d97706)",
      bgIcon: "rgba(245, 158, 11, .12)",
      cta: "Devenir vendeur",
    },
    {
      id: "service",
      icon: "👷",
      title: "Trouver un service",
      desc: "Plombier, électricien, photographe... vérifiés",
      color: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
      bgIcon: "rgba(139, 92, 246, .12)",
      cta: "Voir les prestataires",
    },
    {
      id: "delivery",
      icon: "🚚",
      title: "Demander une livraison",
      desc: "Un livreur récupère et livre ton colis rapidement",
      color: "linear-gradient(135deg, #3b82f6, #2563eb)",
      bgIcon: "rgba(59, 130, 246, .12)",
      cta: "Commander une livraison",
    },
  ];

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10, 20, 16, 0.85)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        overflowY: "auto",
        animation: "fadeIn .25s ease",
      }}
    >
      <div
        style={{
          background: "var(--surface, #fff)",
          borderRadius: 20,
          maxWidth: 920,
          width: "100%",
          padding: "32px 28px",
          position: "relative",
          boxShadow: "0 24px 60px rgba(0,0,0,.4)",
          animation: "slideUp .3s ease",
          maxHeight: "92vh",
          overflowY: "auto",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            background: "var(--surface2, #f5f5f5)",
            border: "none",
            width: 36,
            height: 36,
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "1rem",
            color: "var(--ink, #111)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}
          aria-label="Fermer"
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "var(--green-pale, #e8f5e9)",
              color: "var(--green, #1a6b3a)",
              padding: "5px 14px",
              borderRadius: 50,
              fontSize: ".72rem",
              fontWeight: 700,
              marginBottom: 14,
            }}
          >
            🇨🇲 Bienvenue sur Yorix CM
          </div>
          <h1
            style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: "1.7rem",
              fontWeight: 800,
              color: "var(--ink, #111)",
              marginBottom: 8,
              letterSpacing: "-.5px",
              lineHeight: 1.2,
            }}
          >
            Que cherchez-vous aujourd'hui ?
          </h1>
          <p
            style={{
              color: "var(--gray, #666)",
              fontSize: ".9rem",
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Choisis une option pour commencer ton expérience Yorix.
            On t'accompagne à chaque étape.
          </p>
        </div>

        {/* 4 grandes cartes */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
            marginBottom: 20,
          }}
        >
          {actions.map((a) => (
            <button
              key={a.id}
              onClick={() => onSelectAction(a.id)}
              style={{
                background: "var(--surface, #fff)",
                border: "2px solid var(--border, #e5e5e5)",
                borderRadius: 16,
                padding: "22px 18px",
                cursor: "pointer",
                textAlign: "left",
                transition: "all .25s ease",
                position: "relative",
                overflow: "hidden",
                fontFamily: "inherit",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,.12)";
                e.currentTarget.style.borderColor = "transparent";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "var(--border, #e5e5e5)";
              }}
            >
              {/* Icône bg décoratif */}
              <div
                style={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  width: 70,
                  height: 70,
                  background: a.bgIcon,
                  borderRadius: "50%",
                  zIndex: 0,
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 13,
                    background: a.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.7rem",
                    marginBottom: 12,
                    boxShadow: "0 6px 16px rgba(0,0,0,.12)",
                  }}
                >
                  {a.icon}
                </div>

                <div
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 800,
                    fontSize: "1.05rem",
                    color: "var(--ink, #111)",
                    marginBottom: 5,
                    letterSpacing: "-.3px",
                  }}
                >
                  {a.title}
                </div>
                <div
                  style={{
                    fontSize: ".78rem",
                    color: "var(--gray, #666)",
                    lineHeight: 1.5,
                    marginBottom: 12,
                    minHeight: 36,
                  }}
                >
                  {a.desc}
                </div>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: ".75rem",
                    fontWeight: 700,
                    color: "var(--green, #1a6b3a)",
                    fontFamily: "'Syne',sans-serif",
                  }}
                >
                  {a.cta} →
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer info */}
        <div
          style={{
            textAlign: "center",
            paddingTop: 16,
            borderTop: "1px solid var(--border, #e5e5e5)",
          }}
        >
          {!user ? (
            <p
              style={{
                fontSize: ".78rem",
                color: "var(--gray, #666)",
                marginBottom: 10,
              }}
            >
              💡 Pas encore de compte ? Tu pourras t'inscrire après avoir choisi.
            </p>
          ) : (
            <p
              style={{
                fontSize: ".78rem",
                color: "var(--green, #1a6b3a)",
                marginBottom: 10,
                fontWeight: 600,
              }}
            >
              ✅ Tu es connecté. Choisis une action pour continuer.
            </p>
          )}
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--gray, #666)",
              fontSize: ".8rem",
              cursor: "pointer",
              textDecoration: "underline",
              fontFamily: "inherit",
            }}
          >
            Explorer librement le site
          </button>
        </div>

        <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
}
