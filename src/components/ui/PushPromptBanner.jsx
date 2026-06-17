import { useEffect, useState } from "react";
import { usePushNotifications } from "../../hooks/usePushNotifications";

/**
 * Bannière flottante qui invite l'utilisateur à activer les notifications push.
 * Disparaît définitivement une fois accepté, ou après 3 refus (snoozed).
 */
export function PushPromptBanner({ user }) {
  const { status, subscribe } = usePushNotifications(user);
  const [visible, setVisible]   = useState(false);
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    if (!user) return;
    if (status === "subscribed" || status === "unsupported") return;

    // Ne pas afficher si l'utilisateur a déjà refusé 3 fois
    const snoozed = Number(localStorage.getItem("yorix_push_snoozed") || 0);
    if (snoozed >= 3) return;

    // Afficher après 4s (laisser la page se charger)
    const t = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(t);
  }, [user, status]);

  if (!visible) return null;

  const handleAccept = async () => {
    setLoading(true);
    try {
      await subscribe();
      setVisible(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSnooze = () => {
    const n = Number(localStorage.getItem("yorix_push_snoozed") || 0);
    localStorage.setItem("yorix_push_snoozed", String(n + 1));
    setVisible(false);
  };

  return (
    <div className="yx-push-banner" role="alert" aria-live="polite">
      <div className="yx-push-banner__icon" aria-hidden>🔔</div>
      <div className="yx-push-banner__body">
        <strong className="yx-push-banner__title">Activez vos notifications</strong>
        <span className="yx-push-banner__sub">
          Soyez alerté(e) en temps réel : commandes, livraisons, messages.
        </span>
      </div>
      <div className="yx-push-banner__actions">
        <button
          className="yx-push-banner__btn yx-push-banner__btn--accept"
          onClick={handleAccept}
          disabled={loading}
        >
          {loading ? "…" : "Activer"}
        </button>
        <button
          className="yx-push-banner__btn yx-push-banner__btn--snooze"
          onClick={handleSnooze}
          aria-label="Fermer"
        >
          Plus tard
        </button>
      </div>
    </div>
  );
}
