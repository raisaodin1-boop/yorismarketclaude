const STEPS = [
  { label: "Panier", labelShort: "Panier", icon: "🛒" },
  { label: "Adresse", labelShort: "Adresse", icon: "📍" },
  { label: "Paiement", labelShort: "Paiement", icon: "💳" },
  { label: "Confirmation", labelShort: "OK", icon: "✓" },
];

/**
 * Barre de progression type marketplace (Panier → Adresse → Paiement → Confirmation).
 * @param {number} activeIndex — 0..3 (étape courante)
 * @param {(index: number) => void} [onNavigate] — clic sur une étape déjà passée (retour)
 * @param {boolean} [navigationDisabled]
 */
export function CheckoutProgressBar({ activeIndex = 0, onNavigate, navigationDisabled = false }) {
  const safeIndex = Math.min(3, Math.max(0, activeIndex));

  const stepClickable = (i) => {
    if (navigationDisabled) return false;
    if (!onNavigate) return false;
    if (i >= safeIndex) return false;
    if (safeIndex === 3 && i >= 1) return false;
    return true;
  };

  return (
    <nav className="checkout-progress" aria-label="Étapes de commande">
      <ol className="checkout-progress-list">
        {STEPS.map((step, i) => {
          const done = i < safeIndex;
          const current = i === safeIndex;
          const clickable = stepClickable(i);
          const railActive = i > 0 && i <= safeIndex;

          return (
            <li key={step.label} className="checkout-progress-item" aria-current={current ? "step" : undefined}>
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
                  title={clickable ? `Retour : ${step.label}` : undefined}
                >
                  <span className="checkout-progress-node-inner" aria-hidden>
                    {done ? "✓" : step.icon}
                  </span>
                  <span className="checkout-progress-label">
                    <span className="checkout-progress-label-full">{step.label}</span>
                    <span className="checkout-progress-label-compact">{step.labelShort}</span>
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
