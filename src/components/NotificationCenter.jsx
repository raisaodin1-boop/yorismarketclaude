import { useEffect, useMemo, useState } from "react";
import { NOTIF_CATEGORIES, NOTIF_PRIORITIES, enrichNotification, filterNotificationsByCategory } from "../domain/notificationsDomain";
import {
  ensureNotificationPrefsSynced,
  loadNotificationPrefs,
  saveNotificationPrefsHybrid,
} from "../lib/notificationPrefs";
import { supabase } from "../lib/supabase";
import { PushManager } from "./PushManager";
import { EnablePushButton } from "./EnablePushButton";

const FILTERS = [
  { key: "all", label: "Tous" },
  { key: NOTIF_CATEGORIES.messages, label: "Messages" },
  { key: NOTIF_CATEGORIES.orders, label: "Commandes" },
  { key: NOTIF_CATEGORIES.payments, label: "Paiements" },
  { key: NOTIF_CATEGORIES.delivery, label: "Livraison" },
  { key: NOTIF_CATEGORIES.business, label: "Business" },
  { key: NOTIF_CATEGORIES.admin, label: "Admin" },
  { key: NOTIF_CATEGORIES.security, label: "Sécurité" },
  { key: NOTIF_CATEGORIES.promotions, label: "Promos" },
  { key: NOTIF_CATEGORIES.system, label: "Système" },
];

function priorityClass(p) {
  if (p === NOTIF_PRIORITIES.critical || p === "urgent") return "notif-card-priority-critical";
  if (p === NOTIF_PRIORITIES.important || p === "high") return "notif-card-priority-important";
  if (p === NOTIF_PRIORITIES.promo || p === "promo") return "notif-card-priority-promo";
  return "notif-card-priority-standard";
}

/**
 * Centre de notifications premium (dropdown ou page complète).
 */
export function NotificationCenter({
  variant = "dropdown",
  notifs = [],
  user,
  goPage,
  onMarkRead,
  onMarkAllRead,
  onDismiss,
  onClose,
  onPrefsUpdated,
}) {
  const [filter, setFilter] = useState("all");
  const [prefs, setPrefs] = useState(() => loadNotificationPrefs());

  useEffect(() => {
    if (!user?.id) {
      setPrefs(loadNotificationPrefs());
      return undefined;
    }
    let cancelled = false;
    ensureNotificationPrefsSynced(supabase, user.id).then((p) => {
      if (!cancelled) setPrefs(p);
    });
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const filtered = useMemo(() => filterNotificationsByCategory(notifs, filter === "all" ? null : filter), [notifs, filter]);

  const updatePrefs = (patch) => {
    saveNotificationPrefsHybrid(supabase, user?.id, patch).then((next) => {
      setPrefs(next);
      onPrefsUpdated?.(next);
    });
  };

  const unread = useMemo(() => notifs.filter((n) => !n.lu).length, [notifs]);

  return (
    <div className={`notif-hub notif-hub--${variant}`}>
      <div className="notif-hub-toolbar">
        <div className="notif-hub-title-row">
          <h2 className="notif-hub-title">Notifications</h2>
          {unread > 0 && <span className="notif-hub-badge">{unread > 99 ? "99+" : unread}</span>}
        </div>
        <div className="notif-hub-actions-top">
          {unread > 0 && (
            <button type="button" className="notif-link-btn" onClick={() => onMarkAllRead?.()}>
              Tout marquer lu
            </button>
          )}
          {variant === "dropdown" && (
            <button type="button" className="notif-link-btn notif-link-btn-strong" onClick={() => goPage?.("notifications")}>
              Voir tout
            </button>
          )}
          {variant === "dropdown" && (
            <button type="button" className="notif-hub-close" onClick={() => onClose?.()} aria-label="Fermer">
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="notif-filter-strip" role="tablist">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            role="tab"
            aria-selected={filter === f.key}
            className={`notif-chip${filter === f.key ? " notif-chip--active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className={variant === "dropdown" ? "notif-hub-scroll notif-hub-scroll--drop" : "notif-hub-scroll notif-hub-scroll--page"}>
        {filtered.length === 0 ? (
          <div className="notif-empty premium">
            <div className="notif-empty-icon">🔕</div>
            <div className="notif-empty-title">Aucune alerte dans ce filtre</div>
            <p className="notif-empty-sub">Les commandes, messages et livraisons apparaîtront ici en temps réel.</p>
          </div>
        ) : (
          <ul className="notif-card-list">
            {filtered.map((raw) => {
              const n = enrichNotification(raw);
              return (
                <li key={String(n.id)} className={`notif-card-li ${priorityClass(n._priority)}`}>
                  <button
                    type="button"
                    className={`notif-card-main${raw.lu ? "" : " notif-card-unread"}`}
                    onClick={() => onMarkRead?.(raw, { navigate: true, closeDrawer: variant === "dropdown" })}
                  >
                    <span className="notif-card-avatar" aria-hidden>
                      {n._image ? <img src={n._image} alt="" loading="lazy" /> : <span className="notif-card-emoji">{n._icon}</span>}
                      {!raw.lu && <span className="notif-card-dot" />}
                    </span>
                    <span className="notif-card-copy">
                      <span className="notif-card-top">
                        <span className="notif-card-title">{n._title}</span>
                        <time className="notif-card-time" dateTime={raw.created_at || undefined}>
                          {n._timeLabel}
                        </time>
                      </span>
                      <span className="notif-card-body">{n._body}</span>
                      {n._deeplink?.startsWith("http") && (
                        <span className="notif-card-cta-secondary">Ouverture du lien sécurisé →</span>
                      )}
                      {n._deeplink?.startsWith("/") && <span className="notif-card-cta-secondary">Appuyer pour ouvrir dans Yorix</span>}
                    </span>
                  </button>
                  <div className="notif-card-side">
                    <button
                      type="button"
                      className="notif-mini-btn"
                      title="Lu"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMarkRead?.(raw, { navigate: false, closeDrawer: false });
                      }}
                    >
                      ✓
                    </button>
                    <button
                      type="button"
                      className="notif-mini-btn notif-mini-btn-del"
                      title="Masquer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDismiss?.(raw.id);
                      }}
                    >
                      🗑
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="notif-hub-footer-premium">
        <div className="notif-preferences-mini">
          <div className="notif-preferences-title">Préférences (compte synchronisé)</div>
          <label className="notif-toggle">
            <input
              type="checkbox"
              checked={prefs.pushBrowser}
              onChange={(e) => updatePrefs({ pushBrowser: e.target.checked })}
            />
            Alertes bureau (navigateur ouvert)
          </label>
          <label className="notif-toggle">
            <input
              type="checkbox"
              checked={prefs.sound}
              onChange={(e) => updatePrefs({ sound: e.target.checked })}
            />
            Son discret (si navigateur autorise)
          </label>
        </div>
        {user?.id &&
          (variant === "page" ? (
            <EnablePushButton variant="primary" />
          ) : (
            <PushManager user={user} compact />
          ))}
      </div>
    </div>
  );
}
