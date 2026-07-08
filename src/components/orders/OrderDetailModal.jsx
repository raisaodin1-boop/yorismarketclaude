import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { ESCROW_STATUSES } from "../../lib/constants";
import { DELIVERY_STATUTS, getStatutConfig, openWhatsApp } from "../../utils/deliveryWorkflow";

const PAYMENT_LABELS = {
  cinetpay: "CinetPay (Escrow)",
  momo_direct: "MTN MoMo (paiement direct)",
  cod: "Paiement à la livraison",
  whatsapp_backup: "WhatsApp (validation manuelle)",
  manual: "Manuel",
};

function productImage(p) {
  if (!p) return null;
  if (p.image) return p.image;
  if (Array.isArray(p.image_urls) && p.image_urls.length) return p.image_urls[0];
  return null;
}

function fmt(n) {
  return Number(n || 0).toLocaleString("fr-FR");
}

/**
 * Détail complet d'une commande client, ouvert au clic sur une carte « Mes achats ».
 * Regroupe toutes les lignes `orders` partageant le même order_group_id (le checkout
 * crée une ligne par produit), joint order_items → products pour les articles, et
 * deliveries → livreur/suivi pour la livraison.
 *
 * @param {{ order: object, goPage?: (p: string) => void, onClose: () => void }} props
 */
export function OrderDetailModal({ order, goPage, onClose }) {
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState([order]);
  const [items, setItems] = useState([]);
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        let groupRows = [order];
        if (order?.order_group_id) {
          const { data } = await supabase
            .from("orders")
            .select("*")
            .eq("order_group_id", order.order_group_id)
            .order("created_at", { ascending: true });
          if (data && data.length) groupRows = data;
        }
        const orderIds = groupRows.map((o) => o.id).filter(Boolean);

        const [{ data: itemRows }, { data: delivRows }] = await Promise.all([
          supabase
            .from("order_items")
            .select("*, products(name_fr, prix, image, image_urls)")
            .in("order_id", orderIds),
          supabase.from("deliveries").select("*").in("order_id", orderIds),
        ]);

        let resolvedItems = itemRows || [];
        // Repli : commandes anciennes sans order_items → on lit le produit depuis orders.product_id
        if (!resolvedItems.length) {
          const productIds = groupRows.map((o) => o.product_id).filter(Boolean);
          let products = [];
          if (productIds.length) {
            const { data: prod } = await supabase
              .from("products")
              .select("id, name_fr, prix, image, image_urls")
              .in("id", productIds);
            products = prod || [];
          }
          resolvedItems = groupRows.map((o) => ({
            id: o.id,
            order_id: o.id,
            quantity: 1,
            unit_price: o.montant,
            subtotal: o.montant,
            products: products.find((p) => p.id === o.product_id) || null,
          }));
        }

        if (!cancelled) {
          setGroup(groupRows);
          setItems(resolvedItems);
          setDeliveries(delivRows || []);
        }
      } catch (e) {
        console.warn("OrderDetail:", e?.message || e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [order]);

  const ref = order?.order_group_id || `#${String(order?.id || "").slice(-8)}`;
  const total = group.reduce((sum, o) => sum + Number(o.montant || 0), 0);
  const createdAt = order?.created_at ? new Date(order.created_at).toLocaleString("fr-FR") : "";
  const paymentLabel = PAYMENT_LABELS[order?.payment_method] || order?.payment_method || "—";

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-lg" role="dialog" aria-modal="true" aria-label="Détail de la commande">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Fermer">✕</button>

        <div className="modal-title">📦 Commande {String(ref).slice(0, 24)}</div>
        <div className="modal-sub">{createdAt}</div>

        {/* Statuts */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "10px 0 4px" }}>
          <span className={`status-badge s-${order?.status}`}>{order?.status || "—"}</span>
          <span className={`status-badge s-${order?.payment_status}`}>
            💳 {order?.payment_status || "—"}
          </span>
          <span className={`status-badge s-${order?.escrow_status}`}>
            {ESCROW_STATUSES[order?.escrow_status] || order?.escrow_status || "—"}
          </span>
        </div>

        {loading ? (
          <div style={{ padding: 24, textAlign: "center", color: "var(--gray)" }}>Chargement du détail…</div>
        ) : (
          <>
            {/* Articles */}
            <div className="dash-section-title" style={{ marginTop: 14 }}>Articles ({items.length})</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {items.map((it) => {
                const p = it.products || {};
                const img = productImage(p);
                return (
                  <div
                    key={it.id}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      border: "1px solid var(--border)", borderRadius: 12, padding: 10,
                      background: "var(--surface)",
                    }}
                  >
                    <div style={{
                      width: 48, height: 48, borderRadius: 10, flexShrink: 0, overflow: "hidden",
                      background: "var(--green-pale)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem",
                    }}>
                      {img ? <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "📦"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: ".9rem", color: "var(--ink)" }}>
                        {p.name_fr || "Article"}
                      </div>
                      <div style={{ fontSize: ".76rem", color: "var(--gray)", marginTop: 2 }}>
                        {fmt(it.unit_price)} FCFA × {it.quantity || 1}
                        {it.fulfillment_mode === "pickup" ? " · 🏪 retrait" : ""}
                      </div>
                    </div>
                    <div style={{ fontWeight: 800, color: "var(--green)", fontSize: ".9rem" }}>
                      {fmt(it.subtotal || it.unit_price)} F
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Totaux + paiement */}
            <div className="yorix-ds-inset-panel" style={{ marginTop: 14 }}>
              <div className="yorix-ds-kvrow"><span>Total</span><strong>{fmt(total)} FCFA</strong></div>
              <div className="yorix-ds-kvrow"><span>Paiement</span><strong>{paymentLabel}</strong></div>
              {order?.client_nom && (
                <div className="yorix-ds-kvrow"><span>Client</span><strong>{order.client_nom}</strong></div>
              )}
              {order?.telephone && (
                <div className="yorix-ds-kvrow"><span>Téléphone</span><strong>{order.telephone}</strong></div>
              )}
            </div>

            {/* Livraison + livreur */}
            <div className="dash-section-title" style={{ marginTop: 14 }}>Livraison & suivi</div>
            {deliveries.length === 0 ? (
              <div style={{ fontSize: ".82rem", color: "var(--gray)", padding: "6px 2px" }}>
                Aucune livraison associée pour le moment — le code de suivi apparaîtra dès la préparation.
              </div>
            ) : (
              deliveries.map((d) => {
                const cfg = getStatutConfig ? getStatutConfig(d.statut) : null;
                const label = (DELIVERY_STATUTS[d.statut]?.label) || cfg?.label || d.statut;
                return (
                  <div key={d.id} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 12, marginBottom: 8, background: "var(--surface)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: ".04em", color: "var(--green)" }}>
                        {d.code_suivi || "—"}
                      </div>
                      <span
                        className="status-badge"
                        style={cfg ? { background: cfg.bg, color: cfg.color } : undefined}
                      >
                        {label}
                      </span>
                    </div>

                    {d.adresse_livraison && (
                      <div style={{ fontSize: ".8rem", color: "var(--ink)", marginTop: 8 }}>
                        📍 {d.adresse_livraison}{d.ville ? ` · ${d.ville}` : ""}
                      </div>
                    )}
                    {d.temps_estime_min ? (
                      <div style={{ fontSize: ".76rem", color: "var(--gray)", marginTop: 4 }}>
                        ⏱️ Estimation : {d.temps_estime_min} min
                      </div>
                    ) : null}

                    {/* Livreur */}
                    {d.livreur_nom ? (
                      <div style={{
                        marginTop: 10, padding: 10, borderRadius: 10, background: "var(--surface2)",
                        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap",
                      }}>
                        <div>
                          <div style={{ fontSize: ".65rem", color: "var(--gray)", fontWeight: 700, letterSpacing: ".05em" }}>🏍️ LIVREUR</div>
                          <div style={{ fontWeight: 700, color: "var(--ink)" }}>{d.livreur_nom}</div>
                          <div style={{ fontSize: ".74rem", color: "var(--gray)" }}>
                            {d.livreur_vehicule || "Moto"}{d.livreur_tel ? ` · ${d.livreur_tel}` : ""}
                          </div>
                        </div>
                        {d.livreur_tel && (
                          <button
                            type="button"
                            className="btn-cmd-sm"
                            onClick={() => openWhatsApp(d.livreur_tel, `Bonjour, au sujet de ma commande ${d.code_suivi || ref}`)}
                          >
                            💬 Contacter
                          </button>
                        )}
                      </div>
                    ) : (
                      <div style={{ fontSize: ".78rem", color: "var(--gray)", marginTop: 8 }}>
                        Livreur pas encore assigné.
                      </div>
                    )}

                    {d.code_suivi && typeof goPage === "function" && (
                      <button
                        type="button"
                        className="form-submit"
                        style={{ width: "100%", marginTop: 10 }}
                        onClick={() => {
                          navigator.clipboard?.writeText(d.code_suivi);
                          onClose();
                          goPage("livraison");
                          setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
                        }}
                      >
                        📍 Suivre la livraison en temps réel
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </>
        )}
      </div>
    </div>
  );
}
