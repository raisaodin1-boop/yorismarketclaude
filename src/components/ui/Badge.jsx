/**
 * Yorix Design System — Badge
 */
export function Badge({ children, variant = "green", className = "", icon: Icon, ...props }) {
  return (
    <span className={`yx-badge yx-badge--${variant} ${className}`.trim()} {...props}>
      {Icon && <Icon className="yx-icon yx-icon--sm" aria-hidden="true" />}
      {children}
    </span>
  );
}
