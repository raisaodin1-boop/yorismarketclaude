// ═══════════════════════════════════════════════════════════════
//  YORIX CM — ONBOARDING MODAL v2 PREMIUM
//  ✅ Grille 2×2 équilibrée
//  ✅ Titre puissant + sous-titre orienté conversion
//  ✅ Badges de confiance (4 trust signals)
//  ✅ Microcopy chiffrée et locale
//  ✅ CTA premium
//  ✅ Mobile-first Android (1 colonne sous 600px)
//  ✅ Animation cascade à l'entrée
//  ✅ Badge "Populaire" sur Acheter
// ═══════════════════════════════════════════════════════════════

import { useEffect, useState } from "react";

export function OnboardingModal({ open, onClose, onSelectAction, user }) {
  const [isMobile, setIsMobile] = useState(false);

  // Détection mobile responsive
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Bloquer le scroll quand le modal est ouvert
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  // ── 4 ACTIONS, ordre 2×2 : Acheter | Vendre / Pro | Livraison ──
  const actions = [
    {
      id: "buy",
      icon: "🛍️",
      title: "Acheter",
      desc: "Des milliers de produits livrés à Yaoundé, Douala et partout.",
      color: "linear-gradient(135deg, #10b981, #059669)",
      bgIcon: "rgba(16, 185, 129, .12)",
      cta: "Explorer maintenant",
      badge: "⭐ Populaire",
      badgeColor: "#fcd116",
      miniBadge: "🔒 Escrow inclus",
    },
    {
      id: "sell",
      icon: "🏪",
      title: "Vendre",
      desc: "Créez votre boutique en 2 minutes. Vendez dès aujourd'hui.",
      color: "linear-gradient(135deg, #f59e0b, #d97706)",
      bgIcon: "rgba(245, 158, 11, .12)",
      cta: "Ouvrir ma boutique",
      badge: null,
      miniBadge: "💰 Commission 5%",
    },
    {
      id: "service",
      icon: "👷",
      title: "Trouver un pro",
      desc: "Plombiers, électriciens, photographes — tous vérifiés.",
      color: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
      bgIcon: "rgba(139, 92, 246, .12)",
      cta: "Trouver un pro",
      badge: null,
      miniBadge: "✓ 850+ vérifiés",
    },
    {
      id: "delivery",
      icon: "🚚",
      title: "Faire livrer",
      desc: "Un livreur récupère votre colis en moins de 30 min.",
      color: "linear-gradient(135deg, #3b82f6, #2563eb)",
      bgIcon: "rgba(59, 130, 246, .12)",
      cta: "Appeler un livreur",
      badge: null,
      miniBadge: "⚡ ~25 min",
    },
  ];

  // ── 4 BADGES DE CONFIANCE ──
  const trustBadges = [
    { icon: "🛡️", label: "Paiement sécurisé" },
    { icon: "✅", label: "Vendeurs vérifiés" },
    { icon: "🇨🇲", label: "100% Cameroun" },
    { icon: "⚡", label: "Inscription 2 min" },
  ];

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10, 20, 16, 0.88)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "12px" : "20px",
        overflowY: "auto",
        animation: "yfadeIn .25s ease",
      }}
    >
      <div
        style={{
          background: "var(--surface, #fff)",
          borderRadius: isMobile ? 18 : 22,
          maxWidth: 880,
          width: "100%",
          padding: isMobile ? "26px 18px 22px" : "36px 32px 28px",
          position: "relative",
          boxShadow: "0 28px 70px rgba(0,0,0,.45)",
          animation: "yslideUp .35s cubic-bezier(.2,.8,.2,1)",
          maxHeight: "94vh",
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
            width: 38,
            height: 38,
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "1.05rem",
            color: "var(--ink, #111)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            fontWeight: 600,
          }}
          aria-label="Fermer"
        >
          ✕
        </button>

        {/* ═══ HEADER ═══ */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? 18 : 22 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "var(--green-pale, #e8f5e9)",
              color: "var(--green, #1a6b3a)",
              padding: "5px 14px",
              borderRadius: 50,
              fontSize: ".7rem",
              fontWeight: 700,
              marginBottom: 12,
              letterSpacing: ".02em",
            }}
          >
            🇨🇲 Bienvenue sur Yorix CM
          </div>
          <h1
            style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: isMobile ? "1.45rem" : "1.85rem",
              fontWeight: 800,
              color: "var(--ink, #111)",
              marginBottom: 8,
              letterSpacing: "-.5px",
              lineHeight: 1.18,
            }}
          >
            Que voulez-vous faire aujourd'hui ?
          </h1>
          <p
            style={{
              color: "var(--gray, #666)",
              fontSize: isMobile ? ".84rem" : ".92rem",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.55,
            }}
          >
            Acheter, vendre, faire livrer ou trouver un pro — Yorix s'occupe du reste.
          </p>
        </div>

        {/* ═══ BADGES DE CONFIANCE ═══ */}
        <div
          style={{
            display: "flex",
            gap: isMobile ? 6 : 8,
            justifyContent: "center",
            flexWrap: isMobile ? "nowrap" : "wrap",
            overflowX: isMobile ? "auto" : "visible",
            marginBottom: isMobile ? 18 : 24,
            paddingBottom: isMobile ? 4 : 0,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="yorix-trust-badges"
        >
          {trustBadges.map((b, i) => (
            <div
              key={b.label}
              style={{
                background: "var(--surface2, #f8f8f8)",
                border: "1px solid var(--border, #e5e5e5)",
                color: "var(--ink, #111)",
                padding: isMobile ? "6px 11px" : "7px 14px",
                borderRadius: 50,
                fontSize: isMobile ? ".68rem" : ".74rem",
                fontWeight: 600,
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                fontFamily: "'DM Sans',sans-serif",
                animation: `yfadeIn .4s ease ${0.1 + i * 0.05}s both`,
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: ".95em" }}>{b.icon}</span>
              <span>{b.label}</span>
            </div>
          ))}
        </div>

        {/* ═══ GRILLE 2×2 (1 colonne mobile) ═══ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: isMobile ? 12 : 16,
            marginBottom: 18,
          }}
        >
          {actions.map((a, i) => (
            <button
              key={a.id}
              onClick={() => onSelectAction(a.id)}
              style={{
                background: "var(--surface, #fff)",
                border: "1.5px solid var(--border, #e5e5e5)",
                borderRadius: 16,
                padding: isMobile ? "20px 18px" : "24px 22px",
                cursor: "pointer",
                textAlign: "left",
                transition: "all .25s cubic-bezier(.2,.8,.2,1)",
                position: "relative",
                overflow: "hidden",
                fontFamily: "inherit",
                minHeight: isMobile ? 0 : 220,
                display: "flex",
                flexDirection: "column",
                animation: `yslideUp .4s cubic-bezier(.2,.8,.2,1) ${0.15 + i * 0.08}s both`,
              }}
              onMouseOver={(e) => {
                if (isMobile) return;
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 14px 32px rgba(0,0,0,.12)";
                e.currentTarget.style.borderColor = "transparent";
              }}
              onMouseOut={(e) => {
                if (isMobile) return;
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "var(--border, #e5e5e5)";
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = "scale(0.98)";
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = "none";
              }}
            >
              {/* Cercle décoratif */}
              <div
                style={{
                  position: "absolute",
                  top: -14,
                  right: -14,
                  width: 80,
                  height: 80,
                  background: a.bgIcon,
                  borderRadius: "50%",
                  zIndex: 0,
                }}
              />

              {/* Badge "Populaire" si présent */}
              {a.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    background: a.badgeColor,
                    color: "#0d1f14",
                    padding: "3px 9px",
                    borderRadius: 50,
                    fontSize: ".62rem",
                    fontWeight: 800,
                    fontFamily: "'Syne',sans-serif",
                    letterSpacing: ".03em",
                    zIndex: 2,
                    boxShadow: "0 2px 6px rgba(0,0,0,.15)",
                  }}
                >
                  {a.badge}
                </div>
              )}

              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Icône */}
                <div
                  style={{
                    width: isMobile ? 48 : 54,
                    height: isMobile ? 48 : 54,
                    borderRadius: 13,
                    background: a.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: isMobile ? "1.55rem" : "1.75rem",
                    marginBottom: 12,
                    boxShadow: "0 6px 16px rgba(0,0,0,.14), inset 0 -2px 0 rgba(0,0,0,.08)",
                  }}
                >
                  {a.icon}
                </div>

                {/* Titre */}
                <div
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 800,
                    fontSize: isMobile ? "1.05rem" : "1.15rem",
                    color: "var(--ink, #111)",
                    marginBottom: 6,
                    letterSpacing: "-.3px",
                  }}
                >
                  {a.title}
                </div>

                {/* Description */}
                <div
                  style={{
                    fontSize: isMobile ? ".8rem" : ".83rem",
                    color: "var(--gray, #666)",
                    lineHeight: 1.55,
                    marginBottom: 10,
                    flex: 1,
                  }}
                >
                  {a.desc}
                </div>

                {/* Mini badge confiance */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    background: "var(--surface2, #f5f5f5)",
                    color: "var(--ink, #111)",
                    padding: "3px 9px",
                    borderRadius: 50,
                    fontSize: ".66rem",
                    fontWeight: 600,
                    marginBottom: 12,
                    alignSelf: "flex-start",
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                >
                  {a.miniBadge}
                </div>

                {/* CTA */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: isMobile ? ".78rem" : ".82rem",
                    fontWeight: 800,
                    color: "var(--green, #1a6b3a)",
                    fontFamily: "'Syne',sans-serif",
                    letterSpacing: "-.1px",
                  }}
                >
                  {a.cta} <span style={{ fontSize: "1.05em" }}>→</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* ═══ FOOTER ═══ */}
        <div
          style={{
            textAlign: "center",
            paddingTop: 14,
            borderTop: "1px solid var(--border, #e5e5e5)",
            marginTop: 4,
          }}
        >
          {!user ? (
            <p
              style={{
                fontSize: isMobile ? ".74rem" : ".78rem",
                color: "var(--gray, #666)",
                marginBottom: 8,
              }}
            >
              💡 Pas encore inscrit ? Vous pourrez créer votre compte après avoir choisi.
            </p>
          ) : (
            <p
              style={{
                fontSize: isMobile ? ".74rem" : ".78rem",
                color: "var(--green, #1a6b3a)",
                marginBottom: 8,
                fontWeight: 600,
              }}
            >
              ✅ Connecté. Choisissez une action pour continuer.
            </p>
          )}
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--gray, #666)",
              fontSize: ".78rem",
              cursor: "pointer",
              textDecoration: "underline",
              fontFamily: "inherit",
              padding: "4px 8px",
            }}
          >
            Explorer librement le site
          </button>
        </div>

        {/* Animations + scrollbar hide */}
        <style>{`
          @keyframes yfadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes yslideUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .yorix-trust-badges::-webkit-scrollbar { display: none; }
        `}</style>
      </div>
    </div>
  );
}
