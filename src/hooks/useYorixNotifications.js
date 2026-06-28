import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { enrichNotification, showBrowserNotificationIfPossible } from "../domain/notificationsDomain";
import { applyNotificationOpen, getNotificationOpenAction } from "../lib/notificationNavigation";
import { ensureNotificationPrefsSynced, loadNotificationPrefs } from "../lib/notificationPrefs";
import { ensureLocalePath } from "../lib/seoRoutes";

/**
 * Notifications in-app + temps réel + deep links push.
 */
export function useYorixNotifications({
  userId,
  routeLocale,
  navigate,
  goPage,
  setDashTab,
  setPendingChatConversationId,
}) {
  const [notifs, setNotifs] = useState([]);
  const [notifRevision, setNotifRevision] = useState(0);
  const [notifPrefs, setNotifPrefs] = useState(() => loadNotificationPrefs());
  const notifPrefsRef = useRef(notifPrefs);
  notifPrefsRef.current = notifPrefs;

  const loadNotifsForUser = useCallback(async (uid, limit = 40) => {
    if (!uid) return;
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", uid)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) console.warn("Notifications:", error.message);
    else setNotifs(data || []);
    setNotifRevision((v) => v + 1);
  }, []);

  useEffect(() => {
    if (!userId) {
      setNotifPrefs(loadNotificationPrefs());
      return undefined;
    }
    let cancelled = false;
    ensureNotificationPrefsSynced(supabase, userId).then((p) => {
      if (!cancelled) setNotifPrefs(p);
    });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  useEffect(() => {
    if (!userId) return undefined;
    const channel = supabase
      .channel(`notifications_rt_${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const row = payload.new;
          setNotifs((prev) => {
            if (prev.some((x) => x.id === row.id)) return prev;
            return [row, ...prev].slice(0, 120);
          });
          setNotifRevision((v) => v + 1);
          try {
            showBrowserNotificationIfPossible(enrichNotification(row), notifPrefsRef.current);
          } catch {
            /* ignore */
          }
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const row = payload.new;
          setNotifs((prev) => prev.map((n) => (n.id === row.id ? row : n)));
          setNotifRevision((v) => v + 1);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const id = payload.old?.id;
          if (!id) return;
          setNotifs((prev) => prev.filter((n) => n.id !== id));
          setNotifRevision((v) => v + 1);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return undefined;
    const onMsg = (event) => {
      if (event.data?.type !== "NOTIF_NAV") return;
      const url = typeof event.data.url === "string" ? event.data.url : "/";
      const path = url.startsWith("/") ? url : `/${url}`;
      navigate(ensureLocalePath(path, routeLocale));
    };
    navigator.serviceWorker.addEventListener("message", onMsg);
    return () => navigator.serviceWorker.removeEventListener("message", onMsg);
  }, [navigate, routeLocale]);

  const openNotificationTarget = useCallback(
    (notification) => {
      if (!notification) return false;
      const action = getNotificationOpenAction(notification, routeLocale);
      return applyNotificationOpen(action, {
        navigate,
        goPage,
        setDashTab,
        setPendingChatConversationId,
      });
    },
    [navigate, routeLocale, goPage, setDashTab, setPendingChatConversationId],
  );

  const marquerNotifLue = useCallback(
    async (notif, opts = { navigate: false, closeDrawer: false }) => {
      const id = typeof notif === "object" ? notif.id : notif;
      const notification = typeof notif === "object" ? notif : notifs.find((n) => n.id === id);

      try {
        const { error } = await supabase.from("notifications").update({ lu: true }).eq("id", id);
        if (error) console.warn("marquerNotifLue:", error.message);
      } catch (e) {
        console.warn("marquerNotifLue exception:", e?.message);
      }

      setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, lu: true } : n)));
      setNotifRevision((v) => v + 1);

      if (opts.navigate && notification) {
        openNotificationTarget(notification);
      }
    },
    [notifs, openNotificationTarget],
  );

  const supprimerNotif = useCallback(async (id) => {
    if (!id) return;
    try {
      const { error } = await supabase.from("notifications").delete().eq("id", id);
      if (error) console.warn("supprimerNotif:", error.message);
    } catch (e) {
      console.warn("supprimerNotif exception:", e?.message);
    }
    setNotifs((prev) => prev.filter((n) => n.id !== id));
    setNotifRevision((v) => v + 1);
  }, []);

  const marquerToutesLues = useCallback(async () => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from("notifications")
        .update({ lu: true })
        .eq("user_id", userId)
        .eq("lu", false);
      if (error) console.warn("marquerToutesLues:", error.message);
    } catch (e) {
      console.warn("marquerToutesLues exception:", e?.message);
    }

    setNotifs((prev) => prev.map((n) => ({ ...n, lu: true })));
    setNotifRevision((v) => v + 1);
  }, [userId]);

  const unread = notifs.filter((n) => !n.lu).length;

  return {
    notifs,
    setNotifs,
    notifRevision,
    notifPrefs,
    setNotifPrefs,
    loadNotifsForUser,
    openNotificationTarget,
    marquerNotifLue,
    supprimerNotif,
    marquerToutesLues,
    unread,
  };
}
