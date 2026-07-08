import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabase";
import { DASHBOARD_ORDERS_LIMIT } from "../../lib/queryLimits";
import { OrderCardWithTracking } from "../OrderCardWithTracking";

const PULL_THRESHOLD = 64;

function SkeletonOrderRow() {
  return (
    <div className="order-card" style={{ alignItems: "center" }}>
      <div className="sk-block" style={{ width: 36, height: 36, borderRadius: 8, flexShrink: 0 }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
        <div className="sk-block" style={{ height: 12, width: "55%", borderRadius: 6 }} />
        <div className="sk-block" style={{ height: 10, width: "38%", borderRadius: 6 }} />
      </div>
      <div className="sk-block" style={{ width: 68, height: 22, borderRadius: 20, flexShrink: 0 }} />
    </div>
  );
}

/**
 * Panneau « Mes achats » réutilisable sur TOUS les tableaux de bord.
 *
 * N'importe quel utilisateur (acheteur, vendeur, prestataire, livreur, admin)
 * peut passer une commande en tant que client — cette commande est reliée via
 * orders.client_id. Ce panneau liste donc les commandes du compte connecté et
 * réutilise OrderCardWithTracking (qui joint deliveries → code_suivi) pour le
 * suivi de livraison.
 *
 * @param {{ user: {id: string}, goPage: (page: string) => void, title?: string }} props
 */
export function MyOrdersPanel({ user, goPage, title = "🛒 Mes achats" }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("client_id", user.id)
      .order("created_at", { ascending: false })
      .limit(DASHBOARD_ORDERS_LIMIT);
    setOrders(data || []);
    setLoading(false);
    setRefreshing(false);
  }, [user?.id]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const listRef = useRef(null);
  const touchStartY = useRef(0);
  const [pullDelta, setPullDelta] = useState(0);

  const onTouchStart = useCallback((e) => {
    if (listRef.current?.scrollTop === 0) touchStartY.current = e.touches[0].clientY;
  }, []);
  const onTouchMove = useCallback((e) => {
    if (!touchStartY.current) return;
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta > 0 && delta < 110) setPullDelta(delta);
  }, []);
  const onTouchEnd = useCallback(() => {
    if (pullDelta >= PULL_THRESHOLD && !refreshing) {
      setRefreshing(true);
      fetchOrders();
    }
    touchStartY.current = 0;
    setPullDelta(0);
  }, [pullDelta, refreshing, fetchOrders]);

  return (
    <>
      <div className="dash-page-title">{title}</div>

      {(pullDelta > 0 || refreshing) && (
        <div
          aria-live="polite"
          style={{
            textAlign: "center",
            padding: "8px 0",
            fontSize: ".78rem",
            color: "var(--green)",
            fontWeight: 600,
            transform: `translateY(${Math.min(pullDelta * 0.4, 24)}px)`,
            transition: pullDelta === 0 ? "transform .3s" : "none",
            opacity: refreshing ? 1 : Math.min(pullDelta / PULL_THRESHOLD, 1),
          }}
        >
          {refreshing
            ? "Actualisation…"
            : pullDelta >= PULL_THRESHOLD
              ? "↑ Relâcher pour actualiser"
              : "↓ Tirer pour actualiser"}
        </div>
      )}

      <div
        ref={listRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ overflowY: "auto" }}
      >
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[1, 2, 3, 4].map((i) => (
              <SkeletonOrderRow key={i} />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🛍️</div>
            <p>Aucune commande passée avec ce compte pour le moment.</p>
            {typeof goPage === "function" && (
              <button
                className="form-submit"
                style={{ width: "auto", padding: "10px 24px", marginTop: 12 }}
                onClick={() => goPage("produits")}
              >
                Découvrir les produits
              </button>
            )}
          </div>
        ) : (
          orders.map((c) => <OrderCardWithTracking key={c.id} commande={c} goPage={goPage} />)
        )}
      </div>
    </>
  );
}
