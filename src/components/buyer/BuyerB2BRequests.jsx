import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { showAppToast } from "../../lib/appToast";
import { b2bStatusLabel } from "../../lib/importWholesale";

export function BuyerB2BRequests({ userId }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acceptingId, setAcceptingId] = useState(null);

  const load = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const { data } = await supabase
      .from("b2b_requests")
      .select("*, product:product_id(name_fr, image_urls)")
      .eq("buyer_id", userId)
      .order("created_at", { ascending: false })
      .limit(50);
    setRows(data || []);
    setLoading(false);
  }, [userId]);

  useEffect(() => { load(); }, [load]);

  const acceptQuote = async (id) => {
    setAcceptingId(id);
    const { data, error } = await supabase.rpc("fn_accept_b2b_quote", { p_request_id: id });
    setAcceptingId(null);
    if (error) {
      showAppToast(error.message, "error");
      return;
    }
    showAppToast("Devis accepté — le fournisseur vous contactera pour l'acompte escrow", "success", 5000);
    if (data) {
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...data } : r)));
    } else {
      load();
    }
  };

  if (loading) {
    return <p style={{ fontSize: ".82rem", color: "var(--gray)" }}>Chargement…</p>;
  }

  if (!rows.length) {
    return (
      <p style={{ fontSize: ".82rem", color: "var(--gray)" }}>
        Aucune demande d&apos;achat en gros. Parcourez{" "}
        <strong>Sourcer en gros</strong> sur l&apos;accueil.
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {rows.map((r) => (
        <div
          key={r.id}
          style={{
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: 12,
            background: "var(--surface)",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: ".85rem" }}>
            {r.product?.name_fr || "Produit"} · {r.quantity} pcs
          </div>
          <div style={{ fontSize: ".72rem", color: "var(--gray)", marginTop: 4 }}>
            {new Date(r.created_at).toLocaleDateString("fr-FR")} · {b2bStatusLabel(r.status)}
          </div>
          {r.quote_amount != null && (
            <div style={{ marginTop: 8, fontWeight: 800, color: "var(--green)" }}>
              Devis : {Number(r.quote_amount).toLocaleString()} FCFA
              {r.deposit_pct ? ` · Acompte ${r.deposit_pct}%` : ""}
            </div>
          )}
          {r.quote_notes && (
            <div style={{ fontSize: ".75rem", marginTop: 6, color: "var(--ink)" }}>{r.quote_notes}</div>
          )}
          {r.status === "quoted" && (
            <button
              type="button"
              className="btn-green"
              style={{ marginTop: 10, width: "100%" }}
              disabled={acceptingId === r.id}
              onClick={() => acceptQuote(r.id)}
            >
              Accepter le devis
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
