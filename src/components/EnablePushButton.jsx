import { usePushNotifications } from "../hooks/usePushNotifications";

export function EnablePushButton({ className = "", variant = "default" }) {
  const { isSupported, permission, isSubscribed, isLoading, subscribe, unsubscribe, error } =
    usePushNotifications();

  if (!isSupported) {
    return (
      <div className="ypush-unsupported">
        Votre navigateur ne supporte pas les notifications push.
      </div>
    );
  }

  if (permission === "denied") {
    return (
      <div className="ypush-denied">
        🔕 Notifications bloquées. Activez-les dans les paramètres du navigateur.
      </div>
    );
  }

  const css = `
    .ypush-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 11px 22px;
      border-radius: 11px;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .88rem;
      cursor: pointer;
      transition: all .2s;
      border: none;
      letter-spacing: -.2px;
    }
    .ypush-btn--primary {
      background: linear-gradient(135deg, #fcd116, #f59e0b);
      color: #0d1f14;
      box-shadow: 0 8px 22px rgba(252, 209, 22, .35);
    }
    .ypush-btn--primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(252, 209, 22, .45);
    }
    .ypush-btn--ghost {
      background: rgba(26, 107, 58, .08);
      color: #1a6b3a;
      border: 1.5px solid rgba(26, 107, 58, .2);
    }
    .ypush-btn--ghost:hover:not(:disabled) {
      background: rgba(26, 107, 58, .14);
    }
    .ypush-btn--subscribed {
      background: rgba(34, 197, 94, .12);
      color: #16a34a;
      border: 1.5px solid rgba(34, 197, 94, .3);
    }
    .ypush-btn:disabled {
      opacity: .6;
      cursor: wait;
    }
    .ypush-unsupported, .ypush-denied {
      font-size: .82rem;
      color: #666;
      padding: 10px 14px;
      background: #f8f8f8;
      border-radius: 10px;
      border: 1px solid #e5e5e5;
    }
    .ypush-error {
      font-size: .78rem;
      color: #dc2626;
      margin-top: 6px;
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div className={className}>
        {isSubscribed ? (
          <button
            type="button"
            className="ypush-btn ypush-btn--subscribed"
            onClick={unsubscribe}
            disabled={isLoading}
          >
            ✓ Notifications activées · cliquez pour désactiver
          </button>
        ) : (
          <button
            type="button"
            className={`ypush-btn ypush-btn--${variant === "ghost" ? "ghost" : "primary"}`}
            onClick={subscribe}
            disabled={isLoading}
          >
            {isLoading ? "Activation..." : "🔔 Activer les notifications"}
          </button>
        )}
        {error && <div className="ypush-error">{error}</div>}
      </div>
    </>
  );
}
