import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { ESCROW_STATUSES } from "../lib/constants";

// ─────────────────────────────────────────────────────────────
// COMPOSANT : CARTE COMMANDE AVEC CODE DE SUIVI
// ─────────────────────────────────────────────────────────────
export function OrderCardWithTracking({ commande, goPage }) {
  const [codeSuivi, setCodeSuivi] = useState(null);

  useEffect(() => {
    // Chercher la livraison associée à cette commande
    supabase
      .from("deliveries")
      .select("code_suivi, statut")
      .eq("order_id", commande.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setCodeSuivi(data);
      });
  }, [commande.id]);

  const statusLabels = {
    commande_recue: "📝 Commande reçue",
    preparation:    "📦 Préparation",
    collecte:       "🏪 Collecté",
    en_route:       "🏍️ En route",
    livre:          "✅ Livré",
  };

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
      }}
    >
      {/* Ligne principale */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: codeSuivi ? 12 : 0,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            background: "var(--green-pale)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.4rem",
            flexShrink: 0,
          }}
        >
          📦
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: ".88rem",
              color: "var(--ink)",
            }}
          >
            Commande #{String(commande.id).slice(-8)}
          </div>
          <div style={{ fontSize: ".72rem", color: "var(--gray)", marginTop: 2 }}>
            {commande.montant?.toLocaleString()} FCFA ·{" "}
            {commande.created_at
              ? new Date(commande.created_at).toLocaleDateString("fr-FR")
              : ""}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
          <span className={`status-badge s-${commande.status}`}>{commande.status}</span>
          <span className={`status-badge s-${commande.escrow_status}`}>
            {ESCROW_STATUSES[commande.escrow_status] || commande.escrow_status}
          </span>
        </div>
      </div>

      {/* Zone tracking */}
      {codeSuivi && (
        <div
          style={{
            background: "linear-gradient(135deg, var(--green-pale), #f0fdf4)",
            border: "1px solid var(--green-light)",
            borderRadius: 10,
            padding: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <div>
            <div
              style={{
                fontSize: ".65rem",
                fontWeight: 700,
                color: "var(--gray)",
                marginBottom: 3,
                letterSpacing: ".05em",
              }}
            >
              📍 SUIVI DE LIVRAISON
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <div
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 800,
                  fontSize: ".95rem",
                  color: "var(--green)",
                  letterSpacing: ".05em",
                }}
              >
                {codeSuivi.code_suivi}
              </div>
              <span
                style={{
                  fontSize: ".7rem",
                  fontWeight: 600,
                  color: "var(--ink)",
                  background: "var(--surface)",
                  padding: "2px 9px",
                  borderRadius: 50,
                  border: "1px solid var(--border)",
                }}
              >
                {statusLabels[codeSuivi.statut] || codeSuivi.statut}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(codeSuivi.code_suivi);
              goPage("livraison");
              setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
            }}
            style={{
              background: "var(--green)",
              color: "#fff",
              border: "none",
              padding: "8px 14px",
              borderRadius: 9,
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: ".78rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            📍 Suivre
          </button>
        </div>
      )}
    </div>
  );
}
