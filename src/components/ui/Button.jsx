/**
 * Yorix Design System — Button
 * Pure UI primitive. Does not alter business logic.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  block = false,
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  icon: Icon,
  iconPosition = "left",
  "aria-label": ariaLabel,
  ...props
}) {
  const sizeClass = size === "sm" ? "yx-btn--sm" : size === "lg" ? "yx-btn--lg" : "";
  const variantClass = `yx-btn--${variant}`;
  const classes = [
    "yx-btn",
    variantClass,
    sizeClass,
    block ? "yx-btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <span className="yx-btn-spinner" aria-hidden="true">
          <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
        </span>
      ) : (
        <>
          {Icon && iconPosition === "left" && <Icon className="yx-icon yx-icon--sm" aria-hidden="true" />}
          {children}
          {Icon && iconPosition === "right" && <Icon className="yx-icon yx-icon--sm" aria-hidden="true" />}
        </>
      )}
    </button>
  );
}
