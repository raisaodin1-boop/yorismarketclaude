/**
 * Notifications push VAPID — abonnement navigateur + enregistrement Supabase.
 */
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

const VAPID_PUBLIC_KEY =
  import.meta.env.VITE_VAPID_PUBLIC_KEY ||
  "BHYax0YuzkC8V_07eVRTEathfnPPJCOh6uUocRG-tmcOu-etHRdAUm_nvOnXYi70hbJfWJTYf_gkN4v2JA6SuWQ";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function extractKeys(subscription) {
  const json = subscription.toJSON();
  return {
    endpoint: json.endpoint,
    p256dh: json.keys?.p256dh || "",
    auth: json.keys?.auth || "",
  };
}

export function usePushNotifications() {
  const [isSupported, setIsSupported] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [permission, setPermission] = useState("default");
  const [subscription, setSubscription] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    const supported =
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      "PushManager" in window &&
      "Notification" in window;

    setIsSupported(supported);
    if (!supported) {
      setInitialized(true);
      return undefined;
    }

    setPermission(Notification.permission);

    let cancelled = false;
    (async () => {
      try {
        const reg = await navigator.serviceWorker.ready;
        const sub = await reg.pushManager.getSubscription();
        if (cancelled) return;
        if (sub) {
          setSubscription(sub);
          setStatus("subscribed");
        }
      } catch (e) {
        console.warn("[usePushNotifications] init check failed:", e);
      } finally {
        if (!cancelled) setInitialized(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const subscribe = useCallback(async () => {
    if (!isSupported) {
      setError("Votre navigateur ne supporte pas les notifications push.");
      setStatus("error");
      return { ok: false, error: "unsupported" };
    }

    setStatus("loading");
    setError(null);

    try {
      let perm = Notification.permission;
      if (perm === "default") {
        perm = await Notification.requestPermission();
        setPermission(perm);
      }

      if (perm !== "granted") {
        setStatus("error");
        setError("Permission refusée. Activez les notifications dans les paramètres du navigateur.");
        return { ok: false, error: "permission_denied" };
      }

      const reg = await navigator.serviceWorker.ready;

      let sub = await reg.pushManager.getSubscription();
      if (!sub) {
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });
      }

      setSubscription(sub);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setStatus("error");
        setError("Vous devez être connecté pour activer les notifications.");
        return { ok: false, error: "not_authenticated" };
      }

      const keys = extractKeys(sub);
      const { error: dbError } = await supabase.from("push_subscriptions").upsert(
        {
          user_id: user.id,
          endpoint: keys.endpoint,
          p256dh: keys.p256dh,
          auth: keys.auth,
          user_agent: navigator.userAgent.substring(0, 500),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "endpoint" },
      );

      if (dbError) {
        console.error("[usePushNotifications] DB upsert failed:", dbError);
        setStatus("error");
        setError("Erreur lors de l'enregistrement. Réessayez.");
        return { ok: false, error: "db_error", details: dbError };
      }

      setStatus("subscribed");
      return { ok: true };
    } catch (e) {
      console.error("[usePushNotifications] subscribe failed:", e);
      setStatus("error");
      setError(e?.message || "Erreur inconnue");
      return { ok: false, error: "exception", details: e };
    }
  }, [isSupported]);

  const unsubscribe = useCallback(async () => {
    if (!subscription) {
      setStatus("idle");
      return { ok: true };
    }

    setStatus("loading");
    try {
      const keys = extractKeys(subscription);
      await subscription.unsubscribe();
      await supabase.from("push_subscriptions").delete().eq("endpoint", keys.endpoint);
      setSubscription(null);
      setStatus("idle");
      setError(null);
      return { ok: true };
    } catch (e) {
      console.error("[usePushNotifications] unsubscribe failed:", e);
      setStatus("error");
      setError(e?.message || "Erreur lors de la désactivation");
      return { ok: false, error: e };
    }
  }, [subscription]);

  return {
    isSupported,
    initialized,
    permission,
    subscription,
    status,
    error,
    isSubscribed: status === "subscribed",
    isLoading: status === "loading",
    subscribe,
    unsubscribe,
  };
}

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
