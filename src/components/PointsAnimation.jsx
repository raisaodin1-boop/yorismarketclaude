import { useEffect } from "react";

// ─────────────────────────────────────────────────────────────
// Composant : Animation points qui s'ajoutent
// ─────────────────────────────────────────────────────────────
export function PointsAnimation({ show, points, onDone }) {
  useEffect(() => {
    if (show) {
      const t = setTimeout(() => onDone?.(), 2500);
      return () => clearTimeout(t);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div style={{
      position: "fixed", top: "30%", left: "50%",
      transform: "translateX(-50%)", zIndex: 10000,
      background: "linear-gradient(135deg,#fcd116,#f59e0b)",
      color: "#0d1f14", padding: "24px 40px", borderRadius: 16,
      fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "2rem",
      boxShadow: "0 20px 60px rgba(245,158,11,.5)",
      animation: "pointsBurst 2.5s ease-out forwards",
      pointerEvents: "none",
    }}>
      +{points} pts 🎉
      <style>{`
        @keyframes pointsBurst {
          0% { transform: translateX(-50%) scale(0) rotate(-10deg); opacity: 0; }
          15% { transform: translateX(-50%) scale(1.2) rotate(5deg); opacity: 1; }
          25% { transform: translateX(-50%) scale(1) rotate(0deg); }
          80% { transform: translateX(-50%) scale(1) translateY(0); opacity: 1; }
          100% { transform: translateX(-50%) scale(.8) translateY(-80px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
