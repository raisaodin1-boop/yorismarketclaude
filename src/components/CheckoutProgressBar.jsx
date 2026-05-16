import { useTranslation } from "react-i18next";

const STEP_KEYS = ["cart", "address", "payment", "confirm"];
const STEP_ICONS = ["🛒", "📍", "💳", "✓"];

/**
 * Barre de progression type marketplace (Panier → Adresse → Paiement → Confirmation).
 */
export function CheckoutProgressBar({ activeIndex = 0, onNavigate, navigationDisabled = false }) {
  const { t } = useTranslation("checkout");
  const safeIndex = Math.min(3, Math.max(0, activeIndex));

  const stepClickable = (i) => {
    if (navigationDisabled) return false;
    if (!onNavigate) return false;
    if (i >= safeIndex) return false;
    if (safeIndex === 3 && i >= 1) return false;
    return true;
  };

  return (
    <nav className="checkout-progress" aria-label={t("steps.aria")}>
      <ol className="checkout-progress-list">
        {STEP_KEYS.map((key, i) => {
          const label = t(`steps.${key}`);
          const done = i < safeIndex;
          const current = i === safeIndex;
          const clickable = stepClickable(i);
          const railActive = i > 0 && i <= safeIndex;

          return (
            <li key={key} className="checkout-progress-item" aria-current={current ? "step" : undefined}>
              <div className="checkout-progress-cluster">
                {i > 0 && (
                  <span
                    className={`checkout-progress-lead ${railActive ? "checkout-progress-lead--on" : ""}`}
                    aria-hidden
                  />
                )}
                <button
                  type="button"
                  className={`checkout-progress-node ${done ? "checkout-progress-node--done" : ""} ${
                    current ? "checkout-progress-node--current" : ""
                  } ${!done && !current ? "checkout-progress-node--todo" : ""}`}
                  disabled={!clickable}
                  onClick={() => clickable && onNavigate(i)}
                  title={clickable ? t("steps.backTo", { step: label }) : undefined}
                >
                  <span className="checkout-progress-node-inner" aria-hidden>
                    {done ? "✓" : STEP_ICONS[i]}
                  </span>
                  <span className="checkout-progress-label">
                    <span className="checkout-progress-label-full">{label}</span>
                    <span className="checkout-progress-label-compact">{label}</span>
                  </span>
                </button>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
