/**
 * Fil d’Ariane sémantique (SEO + accessibilité)
 */
export function SeoBreadcrumb({ items }) {
  if (!items?.length) return null;
  return (
    <nav aria-label="Fil d'Ariane" className="seo-breadcrumb">
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px 10px",
          alignItems: "center",
          listStyle: "none",
          margin: "0 0 16px",
          padding: 0,
          fontSize: ".78rem",
          color: "var(--gray)",
        }}
      >
        {items.map((item, i) => (
          <li key={item.href || i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href && !item.current ? (
              <a href={item.href} style={{ color: "var(--green)", fontWeight: 600 }}>
                {item.label}
              </a>
            ) : (
              <span style={{ color: item.current ? "var(--ink)" : "var(--gray)", fontWeight: item.current ? 700 : 500 }}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
