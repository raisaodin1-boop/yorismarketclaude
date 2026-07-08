import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "../lib/supabase";
import { DASHBOARD_ORDERS_LIMIT } from "../lib/queryLimits";
import { DELIVERY_STATUSES, REWARDS_DATA } from "../lib/constants";
import { ContentIcon } from "../lib/contentIcons";
import { OrderCardWithTracking } from "./OrderCardWithTracking";
import { ReferralPanel } from "./ReferralPanel";
import { CreditScorePanel } from "./credit/CreditScorePanel";
import { BuyerB2BRequests } from "./buyer/BuyerB2BRequests";

const PULL_THRESHOLD = 64; // px pour déclencher le refresh

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

// ─────────────────────────────────────────────────────────────
// COMPOSANT : DASHBOARD ACHETEUR (BUYER)
// ─────────────────────────────────────────────────────────────
export function BuyerDashboard({ user, userData, wishlist, totalQty, loyaltyPts, setLoyaltyPts, dashTab, goPage }) {
  const [mesCommandes, setMesCommandes] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [refreshing, setRefreshing]     = useState(false);

  const fetchOrders = useCallback(async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("client_id", user.id)
      .order("created_at", { ascending: false })
      .limit(DASHBOARD_ORDERS_LIMIT);
    setMesCommandes(data || []);
    setLoadingOrders(false);
    setRefreshing(false);
  }, [user.id]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  // ── Pull-to-refresh ──────────────────────────────────────────
  const listRef       = useRef(null);
  const touchStartY   = useRef(0);
  const [pullDelta, setPullDelta] = useState(0);

  const onTouchStart = useCallback((e) => {
    if (listRef.current?.scrollTop === 0) {
      touchStartY.current = e.touches[0].clientY;
    }
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
      {dashTab === "overview" && (
        <>
          <div className="dash-page-title">
            Bonjour {userData?.nom || user.email?.split("@")[0] || "cher client"} 🛍️
          </div>
          <div className="dash-stats">
            {[
              { icon: "📦", val: loadingOrders ? "—" : mesCommandes.length, lbl: "Commandes", trend: mesCommandes.length > 0 ? "↑ Actif" : "— Aucune" },
              { icon: "❤️", val: wishlist.size,       lbl: "Favoris",   trend: wishlist.size > 0 ? `${wishlist.size} sauvegardé${wishlist.size > 1 ? "s" : ""}` : "— Vide" },
              { icon: "🛒", val: totalQty,            lbl: "Panier",    trend: totalQty > 0 ? "↑ En cours" : "— Vide" },
              { icon: "🌟", val: `${loyaltyPts} pts`, lbl: "Points fidélité", trend: loyaltyPts > 0 ? "↑ Cumulés" : "— Démarrer" },
            ].map(s => (
              <div key={s.lbl} className="dstat">
                <div className="dstat-icon">{s.icon}</div>
                <div className="dstat-val">{s.val}</div>
                <div className="dstat-lbl">{s.lbl}</div>
                {s.trend && (
                  <div className="dstat-trend" style={{
                    fontSize: ".65rem", fontWeight: 600, marginTop: 4,
                    color: s.trend.startsWith("↑") ? "var(--green)" : "var(--ink-light,#888)",
                    letterSpacing: ".02em",
                  }}>{s.trend}</div>
                )}
              </div>
            ))}
          </div>
          <CreditScorePanel user={user} locale="fr" />
          <div className="dash-section-title">
            Mes dernières commandes
          </div>
          {loadingOrders ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[1, 2, 3].map(i => <SkeletonOrderRow key={i} />)}
            </div>
          ) : mesCommandes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🛍️</div>
              <p>Aucune commande</p>
              <button
                className="form-submit"
                style={{ width: "auto", padding: "10px 24px", marginTop: 12 }}
                onClick={() => goPage("produits")}
              >
                Voir les produits
              </button>
            </div>
          ) : (
            mesCommandes.slice(0, 5).map(c => (
              <div key={c.id} className="order-card">
                <div className="oc-icon">📦</div>
                <div className="oc-info">
                  <div className="oc-name">#{String(c.id).slice(-8)}</div>
                  <div className="oc-meta">
                    {c.montant?.toLocaleString()} FCFA ·{" "}
                    {c.created_at ? new Date(c.created_at).toLocaleDateString("fr-FR") : ""}
                  </div>
                </div>
                <div className="oc-actions">
                  <span className={`status-badge s-${c.status}`}>{c.status}</span>
                  <span className={`status-badge s-${c.livraison_status}`}>
                    {DELIVERY_STATUSES[c.livraison_status] || c.livraison_status}
                  </span>
                </div>
              </div>
            ))
          )}
        </>
      )}

      {dashTab === "commandes" && (
        <>
          <div className="dash-page-title">📦 Mes commandes</div>

          {/* Pull-to-refresh indicator */}
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
            {loadingOrders ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[1, 2, 3, 4].map(i => <SkeletonOrderRow key={i} />)}
              </div>
            ) : mesCommandes.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <p>Aucune commande</p>
              </div>
            ) : (
              mesCommandes.map(c => (
                <OrderCardWithTracking key={c.id} commande={c} goPage={goPage} />
              ))
            )}
          </div>
        </>
      )}

      {dashTab === "b2bDemandes" && (
        <>
          <div className="dash-page-title">🏭 Mes demandes d&apos;achat en gros</div>
          <BuyerB2BRequests userId={user.id} />
        </>
      )}

      {dashTab === "loyalty" && (
        <>
          <div className="dash-page-title">🌟 Programme fidélité</div>
          <div style={{
            background: "linear-gradient(135deg,#1a3a24,var(--green))",
            borderRadius: 14, padding: 22, color: "#fff", marginBottom: 18,
          }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: 4 }}>
              Mes points
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, color: "var(--yellow)" }}>
              {loyaltyPts} pts
            </div>
            <div style={{ fontSize: ".71rem", opacity: .62, marginBottom: 12 }}>
              Niveau Or · {1000 - loyaltyPts} pts pour Platine
            </div>
            <div style={{ background: "rgba(255,255,255,.2)", borderRadius: 50, height: 7 }}>
              <div style={{
                background: "var(--yellow)", borderRadius: 50, height: 7,
                width: `${Math.min((loyaltyPts % 1000) / 10, 100)}%`,
                transition: "width .6s",
              }} />
            </div>
          </div>
          <div className="rewards-grid">
            {REWARDS_DATA.map(r => (
              <div key={r.name} className="reward-card">
                <div className="reward-icon"><ContentIcon name={r.iconKey} size={22} /></div>
                <div className="reward-name">{r.name}</div>
                <div className="reward-pts">{r.pts} pts</div>
                <button
                  className="reward-btn"
                  onClick={() => setLoyaltyPts(p => Math.max(0, p - r.pts))}
                >
                  Échanger
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {dashTab === "parrainage" && (
        <ReferralPanel user={user} userData={userData} />
      )}
    </>
  );
}
