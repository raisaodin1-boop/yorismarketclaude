// ═══════════════════════════════════════════════════════════
//  YORIX CM — PushManager Component
//  Gère l'abonnement/désabonnement aux notifications push
// ═══════════════════════════════════════════════════════════
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

// Convertit la clé VAPID publique (base64) en Uint8Array
// (format attendu par le navigateur pour pushManager.subscribe)
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function PushManager({ user, compact = false }) {
  const [status, setStatus] = useState("loading");
  // Statuts possibles :
  // - loading : en train de vérifier
  // - unsupported : navigateur ne supporte pas
  // - denied : user a refusé explicitement
  // - unsubscribed : pas abonné (peut s'abonner)
  // - subscribed : déjà abonné
  // - pending : en cours d'action

  const [error, setError] = useState(null);

  // Récupère la clé publique VAPID depuis l'env Vercel
  const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

  // ── Au montage : vérifier l'état actuel ──
  useEffect(() => {
    checkSubscriptionStatus();
  }, [user?.id]);

  async function checkSubscriptionStatus() {
    // 1. Vérifier support navigateur
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setStatus("unsupported");
      return;
    }

    // 2. Vérifier permission
    if (Notification.permission === "denied") {
      setStatus("denied");
      return;
    }

    // 3. Vérifier si déjà abonné
    try {
      const reg = await navigator.serviceWorker.ready;
      const subscription = await reg.pushManager.getSubscription();
      if (subscription) {
        setStatus("subscribed");
      } else {
        setStatus("unsubscribed");
      }
    } catch (err) {
      console.error("[PushManager] Erreur check :", err);
      setStatus("unsubscribed");
    }
  }

  // ── S'ABONNER aux notifications ──
  async function subscribe() {
    if (!user?.id) {
      setError("Vous devez être connecté");
      return;
    }

    if (!VAPID_PUBLIC_KEY) {
      setError("Configuration manquante (VAPID)");
      console.error("[PushManager] VITE_VAPID_PUBLIC_KEY non définie");
      return;
    }

    setStatus("pending");
    setError(null);

    try {
      // 1. Demander permission au user
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus(permission === "denied" ? "denied" : "unsubscribed");
        return;
      }

      // 2. S'abonner via le Service Worker
      const reg = await navigator.serviceWorker.ready;

      // Si déjà abonné, on récupère l'existant (cas rare de state désync)
      let subscription = await reg.pushManager.getSubscription();

      if (!subscription) {
        subscription = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });
      }

      // 3. Extraire les clés p256dh et auth
      const subJSON = subscription.toJSON();
      const endpoint = subJSON.endpoint || subscription.endpoint;
      const p256dh = subJSON.keys?.p256dh;
      const auth = subJSON.keys?.auth;

      if (!endpoint || !p256dh || !auth) {
        throw new Error("Abonnement invalide (clés manquantes)");
      }

      // 4. Sauvegarder dans Supabase (upsert sur endpoint)
      const { error: dbError } = await supabase
        .from("push_subscriptions")
        .upsert(
          {
            user_id: user.id,
            endpoint,
            p256dh,
            auth,
            user_agent: navigator.userAgent.slice(0, 300),
          },
          { onConflict: "endpoint" }
        );

      if (dbError) {
        console.error("[PushManager] Erreur Supabase :", dbError);
        throw new Error("Erreur enregistrement : " + dbError.message);
      }

      setStatus("subscribed");
      console.log("[PushManager] ✅ Abonné aux push notifications");
    } catch (err) {
      console.error("[PushManager] Erreur abonnement :", err);
      setError(err.message || "Erreur lors de l'abonnement");
      setStatus("unsubscribed");
    }
  }

  // ── SE DÉSABONNER ──
  async function unsubscribe() {
    setStatus("pending");
    setError(null);

    try {
      const reg = await navigator.serviceWorker.ready;
      const subscription = await reg.pushManager.getSubscription();

      if (subscription) {
        // 1. Supprimer de Supabase
        const endpoint = subscription.endpoint;
        const { error: dbError } = await supabase
          .from("push_subscriptions")
          .delete()
          .eq("endpoint", endpoint);

        if (dbError) {
          console.warn("[PushManager] Erreur delete Supabase :", dbError);
        }

        // 2. Désabonner côté navigateur
        await subscription.unsubscribe();
      }

      setStatus("unsubscribed");
      console.log("[PushManager] ✅ Désabonné des push");
    } catch (err) {
      console.error("[PushManager] Erreur désabonnement :", err);
      setError(err.message || "Erreur lors du désabonnement");
      setStatus("subscribed");
    }
  }

  // ═════════════════════════════════════════════════════════
  // Si pas connecté, ne rien afficher
  if (!user?.id) return null;

  // ─── STYLES ───
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

  // ─── RENDU selon le statut ───

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
        <div style={{ color: "#c62828" }}>
          🔕 Notifications bloquées
        </div>
        <div style={{ fontSize: 11, color: "var(--gray, #666)", marginTop: 4 }}>
          Vous avez refusé les notifications. Pour les réactiver, allez dans les paramètres
          de votre navigateur (🔒 icône à gauche de l'URL).
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
          Vous recevrez des alertes pour les nouveaux messages et produits.
        </div>
        <button
          style={{ ...btn, background: "var(--surface, #fff)", border: "1px solid var(--border, #ddd)", color: "var(--ink, #222)" }}
          onClick={unsubscribe}
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

  // unsubscribed (par défaut)
  return (
    <div style={box}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>
        🔔 Activer les notifications
      </div>
      <div style={{ fontSize: 12, color: "var(--gray, #666)", marginBottom: 8 }}>
        Soyez alerté dès qu'un client vous envoie un message ou qu'un nouveau produit est ajouté.
      </div>
      <button
        style={{ ...btn, background: "var(--green, #2e7d32)", color: "#fff" }}
        onClick={subscribe}
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
