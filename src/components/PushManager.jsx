// ═══════════════════════════════════════════════════════════
//  YORIX CM — PushManager (UI compacte, alimentée par usePushNotifications)
// ═══════════════════════════════════════════════════════════
import { usePushNotifications } from "../hooks/usePushNotifications";

export function PushManager({ user, compact = false }) {
  const {
    isSupported,
    initialized,
    permission,
    isSubscribed,
    isLoading,
    subscribe,
    unsubscribe,
    error,
  } = usePushNotifications();

  if (!user?.id) return null;

  let status = "loading";
  if (initialized) {
    if (!isSupported) status = "unsupported";
    else if (permission === "denied") status = "denied";
    else if (isLoading) status = "pending";
    else if (isSubscribed) status = "subscribed";
    else status = "unsubscribed";
  }

  const box = {
    padding: compact ? "10px 12px" : "14px 16px",
    background: "var(--surface2, #f6f6f6)",
    borderRadius: 12,
    border: "1px solid var(--border, #e5e5e5)",
    marginBottom: 12,
    fontSize: compact ? 13 : 14,
  };

  const btn = {
    padding: "8px 14px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 13,
    marginTop: 8,
    width: "100%",
  };

  if (status === "loading") {
    return (
      <div style={box}>
        <div style={{ color: "var(--gray, #666)" }}>⏳ Vérification...</div>
      </div>
    );
  }

  if (status === "unsupported") {
    return (
      <div style={box}>
        <div style={{ color: "var(--gray, #666)" }}>
          ℹ️ Votre navigateur ne supporte pas les notifications push.
        </div>
        <div style={{ fontSize: 11, color: "var(--gray, #999)", marginTop: 4 }}>
          Utilisez Chrome, Firefox ou Edge pour activer cette fonctionnalité.
        </div>
      </div>
    );
  }

  if (status === "denied") {
    return (
      <div style={box}>
        <div style={{ color: "#c62828" }}>🔕 Notifications bloquées</div>
        <div style={{ fontSize: 11, color: "var(--gray, #666)", marginTop: 4 }}>
          Vous avez refusé les notifications. Pour les réactiver, allez dans les paramètres de votre
          navigateur (🔒 icône à gauche de l&apos;URL).
        </div>
      </div>
    );
  }

  if (status === "subscribed") {
    return (
      <div style={box}>
        <div style={{ color: "var(--green, #2e7d32)", fontWeight: 600 }}>
          🔔 Notifications activées
        </div>
        <div style={{ fontSize: 11, color: "var(--gray, #666)", marginTop: 4 }}>
          Vous recevrez des alertes pour les nouveaux messages et commandes.
        </div>
        <button
          type="button"
          style={{
            ...btn,
            background: "var(--surface, #fff)",
            border: "1px solid var(--border, #ddd)",
            color: "var(--ink, #222)",
          }}
          onClick={unsubscribe}
          disabled={isLoading}
        >
          🔕 Désactiver les notifications
        </button>
        {error && (
          <div style={{ color: "#c62828", fontSize: 12, marginTop: 6 }}>⚠️ {error}</div>
        )}
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div style={box}>
        <div style={{ color: "var(--gray, #666)" }}>⏳ En cours...</div>
      </div>
    );
  }

  return (
    <div style={box}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>🔔 Activer les notifications</div>
      <div style={{ fontSize: 12, color: "var(--gray, #666)", marginBottom: 8 }}>
        Soyez alerté dès qu&apos;un client vous envoie un message ou qu&apos;une commande est mise à jour.
      </div>
      <button
        type="button"
        style={{ ...btn, background: "var(--green, #2e7d32)", color: "#fff" }}
        onClick={subscribe}
        disabled={isLoading}
      >
        ✅ Activer maintenant
      </button>
      {error && (
        <div style={{ color: "#c62828", fontSize: 12, marginTop: 6 }}>⚠️ {error}</div>
      )}
    </div>
  );
}

export default PushManager;
