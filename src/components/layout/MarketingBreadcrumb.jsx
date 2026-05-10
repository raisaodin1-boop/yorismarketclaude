/** Fil d'Ariane léger (accessibilité nav + focus clavier). */
export function MarketingBreadcrumb({ items }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <nav className="yorix-bc" aria-label="Fil d'ariane">
      <ol className="yorix-bc__list">
        {items.map((it, idx) => {
          const last = idx === items.length - 1;
          return (
            <li key={`${it.label}-${idx}`} className="yorix-bc__item">
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
                <span className="yorix-bc__sep" aria-hidden>
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
