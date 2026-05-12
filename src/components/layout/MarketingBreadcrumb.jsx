/** Fil d'Ariane léger (accessibilité nav + focus clavier). */
export function MarketingBreadcrumb({ items }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <nav className="yorix-bc" aria-label="Fil d'ariane">
      {/* div plutôt que ol : évite les numéros 1. 2. sans CSS (liste native). */}
      <div className="yorix-bc__list">
        {items.map((it, idx) => {
          const last = idx === items.length - 1;
          return (
            <span key={`${it.label}-${idx}`} className="yorix-bc__segment">
              {!last && typeof it.onClick === "function" ? (
                <button type="button" className="yorix-bc__link" onClick={it.onClick}>
                  {it.label}
                </button>
              ) : (
                <span className={last ? "yorix-bc__current" : "yorix-bc__link"} aria-current={last ? "page" : undefined}>
                  {it.label}
                </span>
              )}
              {!last && (
                <span className="yorix-bc__sep" aria-hidden="true">
                  ›
                </span>
              )}
            </span>
          );
        })}
      </div>
    </nav>
  );
}
