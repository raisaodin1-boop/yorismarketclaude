// ═══════════════════════════════════════════════════════════════
//  YORIX CM — DELIVERY STICKY MOBILE CTA
//  Bouton flottant qui suit l'utilisateur pendant le scroll
//  ✅ Visible uniquement sur mobile (<= 768px)
//  ✅ Apparaît après 200px de scroll
//  ✅ 2 options : Commander + WhatsApp
// ═══════════════════════════════════════════════════════════════

import { useState, useEffect } from "react";
import { YORIX_WA_NUMBER } from "../lib/supabase";

export function DeliveryStickyMobile({ onOpenFullModal }) {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMobile || !visible) return null;

  const commanderWA = () => {
    const msg = "Bonjour Yorix ! Je veux commander un livreur 🚚";
    const url = "https://wa.me/" + YORIX_WA_NUMBER + "?text=" + encodeURIComponent(msg);
    window.open(url, "_blank");
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 70, // au-dessus de la mobile-nav
        left: 12,
        right: 12,
        zIndex: 998,
        display: "flex",
        gap: 8,
        animation: "yslideUpMobile .35s cubic-bezier(.2,.8,.2,1)",
      }}
    >
      <button
        onClick={onOpenFullModal}
        style={{
          flex: 2,
          background: "linear-gradient(135deg, var(--yellow, #fcd116), #ffd84a)",
          color: "#0d1f14",
          border: "none",
          padding: "13px 16px",
          borderRadius: 50,
          fontFamily: "'Syne',sans-serif",
          fontWeight: 800,
          fontSize: ".88rem",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(252,209,22,.45), 0 2px 6px rgba(0,0,0,.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        🚀 Commander un livreur
      </button>
      <button
        onClick={commanderWA}
        aria-label="Commander via WhatsApp"
        style={{
          flex: 0,
          width: 50,
          height: 50,
          background: "#25D366",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          fontSize: "1.4rem",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(37,211,102,.45), 0 2px 6px rgba(0,0,0,.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        💬
      </button>

      <style>{`
        @keyframes yslideUpMobile {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
