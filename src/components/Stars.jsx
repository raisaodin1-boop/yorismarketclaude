import { useState } from "react";

// ─────────────────────────────────────────────────────────────
// COMPOSANT : ÉTOILES (rating)
// ─────────────────────────────────────────────────────────────
export function Stars({ value = 0, max = 5, onSelect = null, size = "normal" }) {
  const [hover, setHover] = useState(0);
  const current = hover || value;
  return (
    <div className={`stars-display${onSelect ? " star-input" : ""}`} style={{ cursor: onSelect ? "pointer" : "default" }}>
      {Array.from({ length: max }, (_, i) => i + 1).map(n => (
        <span
          key={n}
          className={`star ${n <= current ? "filled" : "empty"}`}
          style={{ fontSize: size === "lg" ? "1.4rem" : ".72rem" }}
          onClick={() => onSelect && onSelect(n)}
          onMouseEnter={() => onSelect && setHover(n)}
          onMouseLeave={() => onSelect && setHover(0)}
        >★</span>
      ))}
    </div>
  );
}
