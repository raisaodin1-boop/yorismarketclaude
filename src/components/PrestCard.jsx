// ═══════════════════════════════════════════════════════════════
//  YORIX CM — PREST CARD v2 PREMIUM
//  ✅ 3 boutons d'action : WhatsApp, Appeler, Réserver
//  ✅ Tarification harmonisée (forfait projet ou horaire)
//  ✅ Badges premium (Vérifié, Disponible, Urgence 24h, Top, etc.)
//  ✅ Distance + Temps de réponse
//  ✅ Mobile-first
// ═══════════════════════════════════════════════════════════════

import { YORIX_WA_NUMBER } from "../lib/supabase";

// ── PRIX HARMONISÉS YORIX ──
// 10 000 F / projet (forfait)
// 5 000 F / heure (bricolage et tâches courtes)
export const PREST_PRIX = {
  projet: 10000,
  heure:  5000,
};

// Helper : formate le prix selon le type de prestation
export function formatPrestPrix(prest) {
  // Si la prest a un tarif spécifique défini (string ou number)
  if (prest.prix_custom) return prest.prix_custom;

  // Sinon, on applique le tarif harmonisé
  if (prest.tarification === "horaire" || prest.tarif_type === "heure") {
    return `Dès ${PREST_PRIX.heure.toLocaleString()} FCFA/h`;
  }
  return `Dès ${PREST_PRIX.projet.toLocaleString()} FCFA/projet`;
}

export function PrestCard({ p, onClick }) {
  // Préparation des données affichables avec valeurs par défaut
  const displayPrix = p.prix || formatPrestPrix(p);
  const phone = (p.telephone || "").replace(/\D/g, "") || YORIX_WA_NUMBER;

  // Handlers actions (stopPropagation pour ne pas déclencher onClick parent)
  const handleWhatsApp = (e) => {
    e.stopPropagation();
    const msg = `Bonjour ${p.name} ! Je vous contacte via Yorix pour une prestation de ${p.metier || p.categorie}. Pouvez-vous m'aider ?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleCall = (e) => {
    e.stopPropagation();
    window.open(`tel:+${phone}`, "_self");
  };

  const handleReserve = (e) => {
    e.stopPropagation();
    const msg = `Bonjour Yorix ! Je souhaite réserver une prestation avec ${p.name} (${p.metier || p.categorie}). Merci de me confirmer la disponibilité.`;
    window.open(`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--surface, #fff)",
        border: "1.5px solid var(--border, #e5e5e5)",
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all .25s",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,.10)";
        e.currentTarget.style.borderColor = "var(--green-light, #86efac)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "var(--border, #e5e5e5)";
      }}
    >
      {/* ═══ HEADER avec photo/avatar ═══ */}
      <div
        style={{
          background: p.color_bg || "linear-gradient(135deg, #dcfce7, #bbf7d0)",
          padding: "20px 16px 14px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* Avatar / Photo */}
        {p.photo ? (
          <img
            src={p.photo}
            alt={p.name}
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #fff",
              boxShadow: "0 4px 12px rgba(0,0,0,.12)",
              flexShrink: 0,
            }}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        ) : (
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "var(--green, #1a6b3a)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.6rem",
              border: "3px solid #fff",
              boxShadow: "0 4px 12px rgba(0,0,0,.12)",
              flexShrink: 0,
            }}
          >
            {p.emoji || "👷"}
          </div>
        )}

        {/* Nom + métier */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: ".98rem",
              color: "var(--ink, #111)",
              letterSpacing: "-.2px",
              display: "flex",
              alignItems: "center",
              gap: 5,
              marginBottom: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <span>{p.name}</span>
            {p.verifie && (
              <span title="Vérifié Yorix" style={{ fontSize: ".82rem", color: "#0066cc" }}>
                ✓
              </span>
            )}
          </div>
          <div
            style={{
              fontSize: ".74rem",
              color: "var(--gray, #666)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {p.metier || p.categorie}
          </div>
          <div
            style={{
              fontSize: ".68rem",
              color: "var(--gray, #666)",
              marginTop: 2,
            }}
          >
            📍 {p.ville}{p.quartier ? `, ${p.quartier}` : ""}
            {p.distance && ` · ${p.distance}`}
          </div>
        </div>

        {/* Badge TOP en absolu */}
        {p.top && (
          <span
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "var(--yellow, #fcd116)",
              color: "#0d1f14",
              padding: "3px 9px",
              borderRadius: 50,
              fontSize: ".58rem",
              fontWeight: 800,
              fontFamily: "'Syne',sans-serif",
              letterSpacing: ".05em",
              boxShadow: "0 2px 6px rgba(0,0,0,.15)",
            }}
          >
            ⭐ TOP
          </span>
        )}
      </div>

      {/* ═══ CORPS ═══ */}
      <div style={{ padding: "12px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Badges de confiance */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
          {p.verifie && (
            <span
              style={{
                background: "#e0f2fe",
                color: "#0369a1",
                padding: "2px 7px",
                borderRadius: 50,
                fontSize: ".6rem",
                fontWeight: 700,
                border: "1px solid #bae6fd",
              }}
            >
              ✓ Vérifié
            </span>
          )}
          {p.dispo && (
            <span
              style={{
                background: "#dcfce7",
                color: "#15803d",
                padding: "2px 7px",
                borderRadius: 50,
                fontSize: ".6rem",
                fontWeight: 700,
                border: "1px solid #86efac",
              }}
            >
              🟢 Disponible
            </span>
          )}
          {p.urgent_24h && (
            <span
              style={{
                background: "#fff0f0",
                color: "#dc2626",
                padding: "2px 7px",
                borderRadius: 50,
                fontSize: ".6rem",
                fontWeight: 700,
                border: "1px solid #fecaca",
              }}
            >
              🚨 24h
            </span>
          )}
          {p.reponse_rapide && (
            <span
              style={{
                background: "#fef3c7",
                color: "#d97706",
                padding: "2px 7px",
                borderRadius: 50,
                fontSize: ".6rem",
                fontWeight: 700,
                border: "1px solid #fde68a",
              }}
            >
              ⚡ Rapide
            </span>
          )}
          {p.premium && (
            <span
              style={{
                background: "#f3e8ff",
                color: "#7c3aed",
                padding: "2px 7px",
                borderRadius: 50,
                fontSize: ".6rem",
                fontWeight: 700,
                border: "1px solid #d8b4fe",
              }}
            >
              💎 Premium
            </span>
          )}
        </div>

        {/* Stats : note + missions + temps réponse */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 10,
            fontSize: ".7rem",
            color: "var(--ink, #111)",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <span style={{ color: "#fcd116" }}>★</span>
            <strong>{p.note || "—"}</strong>
            <span style={{ color: "var(--gray, #666)" }}>({p.avis || 0})</span>
          </div>
          {p.realisations > 0 && (
            <div style={{ color: "var(--gray, #666)" }}>
              📦 {p.realisations} missions
            </div>
          )}
          {p.temps_reponse && (
            <div style={{ color: "var(--green, #1a6b3a)", fontWeight: 600 }}>
              ⏱ {p.temps_reponse}
            </div>
          )}
        </div>

        {/* Spécialités (tags) */}
        {p.tags && p.tags.length > 0 && (
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
            {p.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                style={{
                  background: "var(--surface2, #f5f5f5)",
                  color: "var(--gray, #666)",
                  padding: "2px 8px",
                  borderRadius: 50,
                  fontSize: ".62rem",
                  fontWeight: 600,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Prix */}
        <div
          style={{
            background: "var(--green-pale, #e8f5e9)",
            border: "1px solid var(--green-light, #86efac)",
            borderRadius: 9,
            padding: "8px 12px",
            marginBottom: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: ".58rem", color: "var(--gray, #666)", fontWeight: 700 }}>
              TARIF
            </div>
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: ".95rem",
                color: "var(--green, #1a6b3a)",
              }}
            >
              {displayPrix}
            </div>
          </div>
        </div>

        {/* ═══ 3 BOUTONS D'ACTION ═══ */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5, marginTop: "auto" }}>
          {/* WhatsApp */}
          <button
            onClick={handleWhatsApp}
            title="Contacter via WhatsApp"
            style={{
              background: "#25D366",
              color: "#fff",
              border: "none",
              padding: "8px 4px",
              borderRadius: 8,
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: ".68rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
            }}
          >
            💬 WhatsApp
          </button>

          {/* Appeler */}
          <button
            onClick={handleCall}
            title="Appeler directement"
            style={{
              background: "#0066cc",
              color: "#fff",
              border: "none",
              padding: "8px 4px",
              borderRadius: 8,
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: ".68rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
            }}
          >
            📞 Appeler
          </button>

          {/* Réserver */}
          <button
            onClick={handleReserve}
            title="Réserver via Yorix"
            style={{
              background: "var(--green, #1a6b3a)",
              color: "#fff",
              border: "none",
              padding: "8px 4px",
              borderRadius: 8,
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: ".68rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
            }}
          >
            📅 Réserver
          </button>
        </div>
      </div>
    </div>
  );
}
