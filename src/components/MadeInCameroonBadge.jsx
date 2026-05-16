import { resolveMadeInCameroon } from "../lib/madeInCameroon";

/**
 * Badge Made in Cameroun 🇨🇲 — automatique, déclaré ou vérifié admin.
 */
export function MadeInCameroonBadge({ product, seller, size = "sm", className = "" }) {
  const mic = resolveMadeInCameroon(product, seller);
  if (!mic.show) return null;

  const verified = mic.verified;
  const cls = [
    "mic-badge",
    verified ? "mic-badge--verified" : "mic-badge--standard",
    size === "lg" ? "mic-badge--lg" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={cls} title={mic.label || "Made in Cameroun"}>
      <span className="mic-badge-flag" aria-hidden>
        🇨🇲
      </span>
      <span className="mic-badge-txt">
        {verified ? "Vérifié" : "Made in CM"}
      </span>
    </span>
  );
}
