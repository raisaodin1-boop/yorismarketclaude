/**
 * Cloche notifications header — dropdown paginé + temps réel Supabase.
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { enrichNotification, showBrowserNotificationIfPossible } from "../domain/notificationsDomain";
import { loadNotificationPrefs } from "../lib/notificationPrefs";
import { ensureLocalePath } from "../lib/seoRoutes";

const PAGE_SIZE = 10;

function timeAgo(date) {
  const d = typeof date === "string" ? new Date(date) : date;
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60) return "à l'instant";
  if (diff < 3600) return `il y a ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} h`;
  if (diff < 604800) return `il y a ${Math.floor(diff / 86400)} j`;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

function iconForType(type) {
  const t = (type || "").toLowerCase();
  if (["orders", "order", "commande"].includes(t)) return "📦";
  if (["messages", "message", "chat", "new_message"].includes(t)) return "💬";
  if (["promos", "promo", "deals", "promotions"].includes(t)) return "🎁";
  if (["loyalty", "fidelite", "points"].includes(t)) return "💎";
  if (["delivery", "livraison"].includes(t)) return "🚚";
  if (["payments", "payment", "paiement"].includes(t)) return "💳";
  return "🔔";
}

function colorForType(type) {
  const t = (type || "").toLowerCase();
  if (["orders", "order", "commande"].includes(t)) return "#1a6b3a";
  if (["messages", "message", "chat"].includes(t)) return "#2563eb";
  if (["promos", "promo", "deals"].includes(t)) return "#dc2626";
  if (["loyalty", "fidelite", "points"].includes(t)) return "#7c3aed";
  return "#666";
}

export function NotificationBell({ user, goPage, siteLocale = "fr", onSync }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const dropdownRef = useRef(null);
  const channelRef = useRef(null);
  const prefsRef = useRef(loadNotificationPrefs());

  const fetchUnreadCount = useCallback(async () => {
    if (!user?.id) return;
    const { count } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("lu", false);
    setUnreadCount(count || 0);
  }, [user?.id]);

  const fetchNotifs = useCallback(
    async (pageNum = 0, append = false) => {
      if (!user?.id) return;
      setLoading(true);

      const from = pageNum * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (!error && data) {
        setItems((prev) => (append ? [...prev, ...data] : data));
        setHasMore(data.length === PAGE_SIZE);
        setPage(pageNum);
      }
      setLoading(false);
    },
    [user?.id],
  );

  useEffect(() => {
    if (!user?.id) return undefined;

    fetchUnreadCount();

    const channel = supabase
      .channel(`notifications_bell:${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const row = payload.new;
          setItems((prev) => {
            if (prev.some((n) => n.id === row.id)) return prev;
            return [row, ...prev];
          });
          setUnreadCount((c) => c + 1);
          onSync?.();
          try {
            showBrowserNotificationIfPossible(enrichNotification(row), prefsRef.current);
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
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          setItems((prev) => prev.map((n) => (n.id === payload.new.id ? payload.new : n)));
          fetchUnreadCount();
          onSync?.();
        },
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      if (channelRef.current) supabase.removeChannel(channelRef.current);
    };
  }, [user?.id, fetchUnreadCount, onSync]);

  useEffect(() => {
    if (open && items.length === 0) fetchNotifs(0);
  }, [open, items.length, fetchNotifs]);

  useEffect(() => {
    if (!open) return undefined;
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const markAsRead = async (notifId) => {
    if (!user?.id) return;
    await supabase.from("notifications").update({ lu: true }).eq("id", notifId).eq("user_id", user.id);
    setItems((prev) => prev.map((n) => (n.id === notifId ? { ...n, lu: true } : n)));
    setUnreadCount((c) => Math.max(0, c - 1));
    onSync?.();
  };

  const markAllAsRead = async () => {
    if (!user?.id) return;
    await supabase.from("notifications").update({ lu: true }).eq("user_id", user.id).eq("lu", false);
    setItems((prev) => prev.map((n) => ({ ...n, lu: true })));
    setUnreadCount(0);
    onSync?.();
  };

  const handleClickNotif = async (notif) => {
    if (!notif.lu) await markAsRead(notif.id);

    const link = String(notif.link || "").trim();
    if (link.startsWith("http")) {
      window.open(link, "_blank", "noopener,noreferrer");
      setOpen(false);
      return;
    }
    if (link.startsWith("/")) {
      navigate(ensureLocalePath(link, siteLocale));
      setOpen(false);
      return;
    }
    if (notif.type === "new_product" || link.includes("/products/")) {
      goPage?.("produits");
    } else if (notif.type === "new_message") {
      goPage?.("dashboard");
    } else {
      goPage?.("notifications");
    }
    setOpen(false);
  };

  const loadMore = () => fetchNotifs(page + 1, true);

  if (!user?.id) return null;

  const css = `
    .ybell-wrap { position: relative; display: inline-block; }
    .ybell-btn {
      position: relative; background: none; border: none; padding: 8px;
      cursor: pointer; border-radius: 50%; transition: background .15s; color: inherit;
    }
    .ybell-btn:hover { background: rgba(255, 255, 255, .12); }
    .ybell-icon { width: 22px; height: 22px; display: block; }
    .ybell-badge {
      position: absolute; top: 3px; right: 3px; min-width: 18px; height: 18px;
      padding: 0 5px; background: linear-gradient(135deg, #dc2626, #ef4444); color: #fff;
      border-radius: 50px; font-size: .65rem; font-weight: 800; font-family: 'DM Sans', sans-serif;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 8px rgba(220, 38, 38, .4);
      animation: ybellPulse 2s ease-in-out infinite;
    }
    @keyframes ybellPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.12); } }
    .ybell-drop {
      position: absolute; top: calc(100% + 8px); right: 0;
      width: min(380px, 92vw); max-height: 540px; background: #fff;
      border-radius: 14px; box-shadow: 0 22px 60px rgba(0, 0, 0, .18);
      border: 1px solid #e5e5e5; overflow: hidden; display: flex; flex-direction: column;
      z-index: 9999; animation: ybellSlide .18s ease-out;
    }
    @keyframes ybellSlide { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
    .ybell-head {
      padding: 14px 16px; background: linear-gradient(135deg, #0a1410, #1a3a24); color: #fff;
      display: flex; align-items: center; justify-content: space-between;
    }
    .ybell-head-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1rem; letter-spacing: -.3px; }
    .ybell-head-action {
      background: rgba(252, 209, 22, .14); color: #fcd116;
      border: 1px solid rgba(252, 209, 22, .3); padding: 5px 10px; border-radius: 50px;
      font-size: .68rem; font-weight: 700; cursor: pointer; font-family: inherit;
    }
    .ybell-head-action:disabled { opacity: .4; cursor: not-allowed; }
    .ybell-list { flex: 1; overflow-y: auto; padding: 6px; }
    .ybell-empty { padding: 50px 24px; text-align: center; color: #888; }
    .ybell-empty-ico { font-size: 2.6rem; opacity: .35; margin-bottom: 10px; }
    .ybell-item {
      display: flex; gap: 12px; padding: 12px; border-radius: 10px; cursor: pointer;
      transition: background .12s; position: relative;
    }
    .ybell-item:hover { background: #f6f8f7; }
    .ybell-item--unread { background: rgba(26, 107, 58, .04); }
    .ybell-item--unread::before {
      content: ''; position: absolute; top: 18px; left: 4px;
      width: 6px; height: 6px; background: #1a6b3a; border-radius: 50%;
    }
    .ybell-item-icon {
      width: 38px; height: 38px; border-radius: 11px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.2rem; flex-shrink: 0; background: linear-gradient(135deg, #e8f5e9, #fff9e6);
    }
    .ybell-item-content { flex: 1; min-width: 0; }
    .ybell-item-title {
      font-family: 'Syne', sans-serif; font-weight: 800; font-size: .86rem;
      color: #111; margin-bottom: 2px; line-height: 1.25;
    }
    .ybell-item-msg {
      font-size: .78rem; color: #555; line-height: 1.4; margin-bottom: 4px;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }
    .ybell-item-meta { display: flex; align-items: center; gap: 6px; font-size: .68rem; color: #888; }
    .ybell-item-cat {
      display: inline-block; padding: 1px 7px; border-radius: 50px;
      font-weight: 700; text-transform: uppercase; font-size: .62rem;
    }
    .ybell-foot { border-top: 1px solid #e5e5e5; padding: 10px; display: flex; gap: 8px; }
    .ybell-foot-btn {
      flex: 1; padding: 9px; background: #f6f8f7; border: none; border-radius: 9px;
      cursor: pointer; font-size: .78rem; font-weight: 700; color: #1a6b3a;
    }
    .ybell-foot-btn:disabled { opacity: .5; cursor: not-allowed; }
    .ybell-loading { text-align: center; padding: 12px; color: #888; font-size: .78rem; }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="ybell-wrap" ref={dropdownRef}>
        <button
          type="button"
          className="ybell-btn"
          onClick={() => setOpen((o) => !o)}
          aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} non lues)` : ""}`}
          aria-expanded={open}
        >
          <svg
            className="ybell-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
          {unreadCount > 0 && (
            <span className="ybell-badge">{unreadCount > 99 ? "99+" : unreadCount}</span>
          )}
        </button>

        {open && (
          <div className="ybell-drop" role="dialog" aria-label="Notifications">
            <div className="ybell-head">
              <div className="ybell-head-title">
                🔔 Notifications {unreadCount > 0 && `(${unreadCount})`}
              </div>
              <button
                type="button"
                className="ybell-head-action"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                Tout marquer lu
              </button>
            </div>

            <div className="ybell-list">
              {items.length === 0 && !loading ? (
                <div className="ybell-empty">
                  <div className="ybell-empty-ico">🔕</div>
                  <p>Aucune notification pour le moment.</p>
                </div>
              ) : (
                <>
                  {items.map((n) => {
                    const enriched = enrichNotification(n);
                    return (
                      <div
                        key={n.id}
                        className={`ybell-item${!n.lu ? " ybell-item--unread" : ""}`}
                        onClick={() => handleClickNotif(n)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && handleClickNotif(n)}
                      >
                        <div className="ybell-item-icon">{n.icon || enriched._icon || iconForType(n.type)}</div>
                        <div className="ybell-item-content">
                          <div className="ybell-item-title">{n.titre || n.title || enriched._title}</div>
                          <div className="ybell-item-msg">{enriched._body || n.message}</div>
                          <div className="ybell-item-meta">
                            <span
                              className="ybell-item-cat"
                              style={{
                                background: `${colorForType(n.type)}18`,
                                color: colorForType(n.type),
                              }}
                            >
                              {n.category || n.type || "system"}
                            </span>
                            <span>·</span>
                            <span>{timeAgo(n.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {loading && <div className="ybell-loading">Chargement…</div>}
                </>
              )}
            </div>

            <div className="ybell-foot">
              {hasMore && items.length > 0 && (
                <button type="button" className="ybell-foot-btn" onClick={loadMore} disabled={loading}>
                  {loading ? "…" : "Charger plus"}
                </button>
              )}
              <button
                type="button"
                className="ybell-foot-btn"
                onClick={() => {
                  goPage?.("notifications");
                  setOpen(false);
                }}
              >
                Voir tout →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
