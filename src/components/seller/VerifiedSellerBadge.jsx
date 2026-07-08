import { BadgeCheck } from "lucide-react";

/**
 * Badge discret bleu — affiché uniquement si le vendeur est validé par l'admin.
 */
export function VerifiedSellerBadge({ verified, locale = "fr", compact = false, className = "" }) {
  if (!verified) return null;
  const label = locale === "en" ? "Verified seller" : "Vendeur vérifié";
  return (
    <span
      className={`verified-seller-badge ${className}`.trim()}
      title={label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: compact ? 3 : 4,
        fontSize: compact ? ".58rem" : ".62rem",
        fontWeight: 700,
        color: "#1d4ed8",
        background: "#eff6ff",
        border: "1px solid #bfdbfe",
        borderRadius: 999,
        padding: compact ? "1px 6px" : "2px 8px",
        letterSpacing: ".02em",
        lineHeight: 1.3,
        verticalAlign: "middle",
      }}
    >
      <BadgeCheck size={compact ? 11 : 12} strokeWidth={2.5} aria-hidden />
      {!compact && label}
    </span>
  );
}
