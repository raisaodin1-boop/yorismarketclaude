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
