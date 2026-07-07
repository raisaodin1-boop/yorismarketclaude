import { originLabel, formatLeadTime, isImportProduct } from "../../lib/importWholesale";

export function ImportWholesaleBadge({ product, locale = "fr", compact = false }) {
  if (!product?.b2b_enabled && !isImportProduct(product)) return null;

  const isEn = locale === "en";
  const importFlag = isImportProduct(product);
  const origin = importFlag ? originLabel(product.country_of_origin, locale) : null;
  const lead = product.lead_time_days ? formatLeadTime(product.lead_time_days, locale) : null;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 6,
        marginBottom: compact ? 0 : 10,
      }}
    >
      {product.b2b_enabled && (
        <span className="b2b-card-badge" style={{ position: "relative", top: 0, left: 0 }}>
          {isEn ? "WHOLESALE" : "GROS"}
        </span>
      )}
      {importFlag && (
        <span
          style={{
            fontSize: ".58rem",
            fontWeight: 800,
            padding: "2px 8px",
            borderRadius: 6,
            background: "#fef3c7",
            color: "#92400e",
            letterSpacing: ".03em",
          }}
        >
          {isEn ? "IMPORT" : "IMPORT"} {origin}
        </span>
      )}
      {lead && !compact && (
        <span
          style={{
            fontSize: ".62rem",
            fontWeight: 600,
            padding: "2px 8px",
            borderRadius: 6,
            background: "var(--surface2)",
            color: "var(--gray)",
          }}
        >
          ⏱ {isEn ? "Lead time" : "Délai"} {lead}
        </span>
      )}
      {product.incoterm && !compact && (
        <span
          style={{
            fontSize: ".62rem",
            fontWeight: 600,
            padding: "2px 8px",
            borderRadius: 6,
            background: "#eff6ff",
            color: "#1d4ed8",
          }}
        >
          {product.incoterm}
        </span>
      )}
    </div>
  );
}
