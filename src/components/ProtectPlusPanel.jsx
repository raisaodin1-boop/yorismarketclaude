import { useMemo, useState } from "react";
import { Shield, ChevronDown, ChevronUp } from "lucide-react";
import { computeProtectPlus, protectLevelColor } from "../lib/protectPlus";
import "./protectPlus.css";

/**
 * Bandeau Yorix Protect+ sur fiche produit.
 */
export function ProtectPlusPanel({
  product,
  locale = "fr",
  reviewsCount = 0,
  avgReviewNote = 0,
}) {
  const [expanded, setExpanded] = useState(false);
  const isEn = locale === "en";

  const protect = useMemo(
    () =>
      computeProtectPlus(product, {
        reviewsCount,
        avgReviewNote: Number(avgReviewNote) || 0,
      }),
    [product, reviewsCount, avgReviewNote],
  );

  const color = protectLevelColor(protect.level);
  const label = isEn ? protect.labelEn : protect.labelFr;

  return (
    <div
      className={`protect-plus protect-plus--${protect.level}`}
      style={{ "--protect-color": color }}
    >
      <button
        type="button"
        className="protect-plus__head"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <span className="protect-plus__icon" aria-hidden>
          <Shield size={18} strokeWidth={2.25} />
        </span>
        <span className="protect-plus__copy">
          <span className="protect-plus__brand">Yorix Protect+</span>
          <span className="protect-plus__score">{label}</span>
        </span>
        <span className="protect-plus__meter" aria-hidden>
          <span className="protect-plus__meter-fill" style={{ width: `${protect.score}%` }} />
        </span>
        {expanded ? <ChevronUp size={16} aria-hidden /> : <ChevronDown size={16} aria-hidden />}
      </button>

      {expanded && protect.factors.length > 0 && (
        <ul className="protect-plus__factors">
          {protect.factors.slice(0, 6).map((f) => (
            <li key={f.key} className={f.impact < 0 ? "is-risk" : "is-ok"}>
              <span>{isEn ? f.labelEn : f.labelFr}</span>
              <span className="protect-plus__impact">{f.impact > 0 ? `+${f.impact}` : f.impact}</span>
            </li>
          ))}
        </ul>
      )}

      <p className="protect-plus__disclaimer">
        {isEn
          ? "Protect+ analyzes listing quality and seller signals — not a guarantee. Prefer escrow for high-value orders."
          : "Protect+ analyse la qualité de l'annonce et les signaux vendeur — ce n'est pas une garantie. Privilégiez l'escrow pour les achats importants."}
      </p>
    </div>
  );
}
