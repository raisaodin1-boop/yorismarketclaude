import { Bell } from "lucide-react";
import { Button } from "./Button";

/**
 * Écran d'invitation à se connecter — notifications, dashboard, etc.
 */
export function AuthGate({
  icon: Icon = Bell,
  title,
  description,
  ctaLabel = "Se connecter — c'est gratuit",
  onLogin,
  className = "",
}) {
  return (
    <section
      className={`yx-auth-gate sec anim ${className}`.trim()}
      aria-labelledby="yx-auth-gate-title"
    >
      <div className="yx-auth-gate-icon" aria-hidden="true">
        <Icon size={40} strokeWidth={1.75} />
      </div>
      <h1 id="yx-auth-gate-title" className="yx-auth-gate-title">
        {title}
      </h1>
      <p className="yx-auth-gate-desc">{description}</p>
      <Button type="button" variant="primary" size="lg" onClick={onLogin}>
        {ctaLabel}
      </Button>
    </section>
  );
}
