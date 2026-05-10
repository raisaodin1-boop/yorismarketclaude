// ─────────────────────────────────────────────────────────────
// Composant : Niveau badge
// ─────────────────────────────────────────────────────────────
export function LevelBadge({ level, size = "normal" }) {
  const levels = {
    bronze:  { label: "Bronze",  emoji: "🥉", color: "#CD7F32", bg: "rgba(205,127,50,.15)" },
    argent:  { label: "Argent",  emoji: "🥈", color: "#9CA3AF", bg: "rgba(156,163,175,.15)" },
    or:      { label: "Or",      emoji: "🥇", color: "#F59E0B", bg: "rgba(245,158,11,.15)" },
    platine: { label: "Platine", emoji: "💎", color: "#7C3AED", bg: "rgba(124,58,237,.15)" },
  };
  const l = levels[level] || levels.bronze;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: l.bg, color: l.color, border: `1px solid ${l.color}33`,
      padding: size === "lg" ? "5px 12px" : "3px 9px",
      borderRadius: 50,
      fontSize: size === "lg" ? ".82rem" : ".68rem",
      fontWeight: 800, fontFamily: "'Syne',sans-serif",
    }}>
      {l.emoji} {l.label}
    </span>
  );
}
