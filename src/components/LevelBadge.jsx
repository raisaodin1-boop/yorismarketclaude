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
  const lg = size === "lg";
  return (
    <span
      className={`yorix-level-badge${lg ? " yorix-level-badge--lg" : ""}`}
      style={{
        background: l.bg,
        color: l.color,
        border: lg ? `2px solid ${l.color}` : `1px solid ${l.color}55`,
      }}
    >
      <span aria-hidden>{l.emoji}</span> {l.label}
    </span>
  );
}
