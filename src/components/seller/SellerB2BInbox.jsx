import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { showAppToast } from "../../lib/appToast";
import { b2bStatusLabel } from "../../lib/importWholesale";

const emptyQuote = () => ({ amount: "", notes: "", shippingDays: "" });

export function SellerB2BInbox({ userId }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [respondingId, setRespondingId] = useState(null);
  const [quoteForms, setQuoteForms] = useState({});

  const load = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("b2b_requests")
      .select("*, product:product_id(name_fr, image_urls, prix_gros, min_qty_gros)")
      .eq("seller_id", userId)
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) console.warn("[b2b inbox]", error.message);
    setRows(data || []);
    setLoading(false);
  }, [userId]);

  useEffect(() => { load(); }, [load]);

  const getQuoteForm = (id) => quoteForms[id] || emptyQuote();

  const updateQuoteForm = (id, patch) => {
    setQuoteForms((prev) => ({
      ...prev,
      [id]: { ...getQuoteForm(id), ...patch },
    }));
  };

  const submitQuote = async (requestId) => {
    const quoteForm = getQuoteForm(requestId);
    const amount = Number(quoteForm.amount);
    if (!amount || amount <= 0) {
      showAppToast("Montant du devis requis", "error");
      return;
    }
    setRespondingId(requestId);
    const { data, error } = await supabase.rpc("fn_respond_b2b_request", {
      p_request_id: requestId,
      p_quote_amount: amount,
      p_quote_notes: quoteForm.notes.trim() || null,
      p_shipping_estimate_days: quoteForm.shippingDays ? Number(quoteForm.shippingDays) : null,
      p_deposit_pct: 30,
    });
    setRespondingId(null);
    if (error) {
      showAppToast(error.message, "error");
      return;
    }
    showAppToast("Devis envoyé à l'acheteur", "success");
    setQuoteForms((prev) => {
      const next = { ...prev };
      delete next[requestId];
      return next;
    });
    if (data) {
      setRows((prev) => prev.map((r) => (r.id === requestId ? { ...r, ...data } : r)));
    } else {
      load();
    }
  };

  if (loading) {
    return <div style={{ padding: 24, color: "var(--gray)", fontSize: ".85rem" }}>Chargement des demandes B2B…</div>;
  }

  if (!rows.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🏭</div>
        <p>Aucune demande d&apos;achat en gros pour le moment.</p>
        <p style={{ fontSize: ".78rem", color: "var(--gray)", marginTop: 8 }}>
          Activez « Vente en gros » sur vos produits et renseignez MOQ / délai import.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {rows.map((r) => {
        const img = r.product?.image_urls?.[0];
        const quoteForm = getQuoteForm(r.id);
        return (
          <div
            key={r.id}
            style={{
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: 14,
              background: "var(--surface)",
            }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 10,
                  background: "var(--surface2)",
                  overflow: "hidden",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                }}
              >
                {img ? <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "📦"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: ".88rem" }}>
                  {r.product?.name_fr || "Produit"} · {r.quantity} unités
                </div>
                <div style={{ fontSize: ".72rem", color: "var(--gray)", marginTop: 4 }}>
                  {r.contact_name} · {r.phone}
                  {r.company_name ? ` · ${r.company_name}` : ""}
                </div>
                {r.message && (
                  <div style={{ fontSize: ".75rem", marginTop: 8, color: "var(--ink)", fontStyle: "italic" }}>
                    « {r.message} »
                  </div>
                )}
                <div style={{ marginTop: 8 }}>
                  <span className={`status-badge s-${r.status === "quoted" ? "validee" : r.status === "accepted" ? "livre" : "pending"}`}>
                    {b2bStatusLabel(r.status)}
                  </span>
                  {r.quote_amount != null && (
                    <span style={{ marginLeft: 8, fontWeight: 800, color: "var(--green)", fontSize: ".82rem" }}>
                      {Number(r.quote_amount).toLocaleString()} FCFA
                    </span>
                  )}
                </div>
              </div>
            </div>

            {r.status === "quoted" && r.quote_notes && (
              <div style={{ marginTop: 10, fontSize: ".75rem", background: "#eff6ff", padding: 10, borderRadius: 8 }}>
                {r.quote_notes}
              </div>
            )}

            {r.status === "pending" && (
              <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <input
                    className="form-input"
                    type="number"
                    placeholder="Montant total devis (FCFA)"
                    value={quoteForm.amount}
                    onChange={(e) => updateQuoteForm(r.id, { amount: e.target.value })}
                  />
                  <input
                    className="form-input"
                    type="number"
                    placeholder="Délai livraison (jours)"
                    value={quoteForm.shippingDays}
                    onChange={(e) => updateQuoteForm(r.id, { shippingDays: e.target.value })}
                  />
                </div>
                <textarea
                  className="form-textarea"
                  rows={2}
                  placeholder="Notes devis (Incoterm, acompte 30%, port Douala…)"
                  value={quoteForm.notes}
                  onChange={(e) => updateQuoteForm(r.id, { notes: e.target.value })}
                />
                <button
                  type="button"
                  className="btn-green"
                  disabled={respondingId === r.id}
                  onClick={() => submitQuote(r.id)}
                >
                  Envoyer le devis
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
