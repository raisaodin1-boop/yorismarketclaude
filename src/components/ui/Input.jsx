/**
 * Yorix Design System — Input
 */
export function Input({
  label,
  hint,
  error,
  id,
  className = "",
  required,
  icon: Icon,
  ...props
}) {
  const inputId = id || (label ? `yx-input-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const errorId = error ? `${inputId}-error` : undefined;
  const hintId = hint ? `${inputId}-hint` : undefined;

  return (
    <div className={`yx-input-wrap ${className}`.trim()}>
      {label && (
        <label className="yx-label" htmlFor={inputId}>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
      )}
      <div style={{ position: "relative" }}>
        {Icon && (
          <Icon
            className="yx-icon yx-icon--sm"
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--gray)",
              pointerEvents: "none",
            }}
          />
        )}
        <input
          id={inputId}
          className={`yx-input${error ? " yx-input--error" : ""}`}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={[errorId, hintId].filter(Boolean).join(" ") || undefined}
          required={required}
          style={Icon ? { paddingLeft: 42 } : undefined}
          {...props}
        />
      </div>
      {hint && !error && (
        <p className="yx-input-hint" id={hintId}>
          {hint}
        </p>
      )}
      {error && (
        <p className="yx-input-error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
