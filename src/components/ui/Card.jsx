/**
 * Yorix Design System — Card
 */
export function Card({
  children,
  elevated = false,
  interactive = false,
  className = "",
  as: Tag = "div",
  ...props
}) {
  const classes = [
    "yx-card",
    elevated ? "yx-card--elevated" : "",
    interactive ? "yx-card--interactive" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}

export function CardBody({ children, className = "", ...props }) {
  return (
    <div className={`yx-card__body ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
