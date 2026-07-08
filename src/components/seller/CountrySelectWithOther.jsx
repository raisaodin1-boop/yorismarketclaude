/**
 * Sélecteur pays (liste + « Autre » avec précision libre).
 */
import { isOtherCountryCode, resolveCountryLabel } from "../../lib/importWholesale";

export function CountrySelectWithOther({
  label,
  value,
  other = "",
  onChange,
  onOtherChange,
  options,
  locale = "fr",
  required = false,
  hint,
}) {
  const isOther = isOtherCountryCode(value);
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}{required && <span style={{ color: "var(--red,#e53e3e)", marginLeft: 3 }}>*</span>}
        </label>
      )}
      <select
        className="form-select"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{locale === "en" ? "Choose…" : "Choisir…"}</option>
        {options.map((o) => (
          <option key={o.code} value={o.code}>
            {o.flag} {locale === "en" ? o.labelEn : o.labelFr}
          </option>
        ))}
      </select>
      {isOther && (
        <input
          className="form-input"
          style={{ marginTop: 8 }}
          placeholder={locale === "en" ? "Specify country / location…" : "Précisez le pays ou la localisation…"}
          value={other}
          onChange={(e) => onOtherChange(e.target.value)}
        />
      )}
      {hint && !isOther && (
        <div style={{ fontSize: ".65rem", color: "var(--gray)", marginTop: 3 }}>{hint}</div>
      )}
      {isOther && value && other?.trim?.() && (
        <div style={{ fontSize: ".65rem", color: "var(--gray)", marginTop: 3 }}>
          {resolveCountryLabel(value, other, locale)}
        </div>
      )}
    </div>
  );
}
