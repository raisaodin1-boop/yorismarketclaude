// ═══════════════════════════════════════════════════════════════
//  YORIX CM — DELIVERY QUICK ORDER (HERO CONVERTER)
//  Calculateur de tarif instantané + commande en 15 secondes
//  ✅ Adresse départ + arrivée
//  ✅ Type de colis (icônes visuelles)
//  ✅ Estimation prix + temps en temps réel
//  ✅ CTA principal "Commander maintenant"
//  ✅ Alternative WhatsApp Fast Order
// ═══════════════════════════════════════════════════════════════

import { useState, useMemo } from "react";
import { YORIX_WA_NUMBER } from "../lib/supabase";

// ── Tarifs par type de colis (FCFA / km) ──
const TARIFS = {
  document:    { base: 500,  parKm: 250, icon: "📄", label: "Document",      desc: "Lettres, dossiers" },
  petit_colis: { base: 800,  parKm: 350, icon: "📦", label: "Petit colis",   desc: "< 5 kg" },
  moyen_colis: { base: 1200, parKm: 500, icon: "📮", label: "Moyen colis",   desc: "5 à 20 kg" },
  gros_colis:  { base: 2000, parKm: 800, icon: "🪑", label: "Gros colis",    desc: "> 20 kg, mobilier" },
  repas:       { base: 600,  parKm: 300, icon: "🍱", label: "Repas",         desc: "Restaurants" },
  courses:     { base: 1000, parKm: 400, icon: "🛒", label: "Courses",       desc: "Marché, supermarché" },
};

// ── Distances approximatives par paire de villes (km) ──
const DISTANCES_INTRA = {
  "Douala":     [3, 12],
  "Yaoundé":    [3, 14],
  "Bafoussam":  [2, 8],
  "Bamenda":    [2, 10],
  "Kribi":      [2, 6],
  "Garoua":     [2, 8],
};

export function DeliveryQuickOrder({ user, userData, onOpenFullModal }) {
  const [depart, setDepart]       = useState("");
  const [arrivee, setArrivee]     = useState("");
  const [ville, setVille]         = useState("Douala");
  const [typeColis, setTypeColis] = useState("petit_colis");
  const [urgent, setUrgent]       = useState(false);

  // ── Calcul tarif instantané ──
  const estimation = useMemo(() => {
    if (!depart.trim() || !arrivee.trim()) return null;

    const tarif = TARIFS[typeColis];
    const [distMin, distMax] = DISTANCES_INTRA[ville] || [3, 12];
    const distEstimee = (distMin + distMax) / 2;

    let prix = tarif.base + (distEstimee * tarif.parKm);
    let tempsMin = Math.round(15 + distEstimee * 3);

    if (urgent) {
      prix *= 1.5;
      tempsMin = Math.round(tempsMin * 0.6);
    }

    // Arrondi au 100 FCFA supérieur
    prix = Math.ceil(prix / 100) * 100;

    return {
      prix,
      tempsMin,
      tempsMax: tempsMin + 10,
      distance: distEstimee.toFixed(1),
      fourchetteMin: Math.ceil((prix * 0.85) / 100) * 100,
      fourchetteMax: Math.ceil((prix * 1.15) / 100) * 100,
    };
  }, [depart, arrivee, ville, typeColis, urgent]);

  // ── Commander via WhatsApp ──
  const commanderWhatsApp = () => {
    if (!depart.trim() || !arrivee.trim()) {
      alert("Indiquez d'abord les adresses de départ et de destination.");
      return;
    }
    const tarif = TARIFS[typeColis];
    const lignes = [
      "🚚 *NOUVELLE DEMANDE DE LIVRAISON YORIX*",
      "",
      "📍 *Départ :* " + depart,
      "🏠 *Destination :* " + arrivee,
      "🏙️ *Ville :* " + ville,
      "📦 *Type de colis :* " + tarif.icon + " " + tarif.label + " (" + tarif.desc + ")",
      urgent ? "⚡ *Mode urgent* (prioritaire)" : "",
      "",
      estimation ? "💰 *Estimation :* " + estimation.fourchetteMin.toLocaleString() + " - " + estimation.fourchetteMax.toLocaleString() + " FCFA" : "",
      estimation ? "⏱ *Temps estimé :* " + estimation.tempsMin + "-" + estimation.tempsMax + " min" : "",
      "",
      "👤 *Client :*",
      "Nom : " + (userData?.nom || "____"),
      "Téléphone : " + (userData?.telephone || "____"),
      "",
      "Merci Yorix ! 🇨🇲",
    ].filter(Boolean).join("\n");

    const url = "https://wa.me/" + YORIX_WA_NUMBER + "?text=" + encodeURIComponent(lignes);
    window.open(url, "_blank");
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0a1410 0%, #1a3a24 50%, #0d3320 100%)",
        borderRadius: 18,
        padding: "28px 24px",
        marginBottom: 24,
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,.3)",
      }}
    >
      {/* Décorations background */}
      <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "rgba(252,209,22,.08)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, left: -60, width: 180, height: 180, background: "rgba(79,209,125,.06)", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* ═══ HEADER ═══ */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(252,209,22,.14)",
              color: "var(--yellow, #fcd116)",
              border: "1px solid rgba(252,209,22,.28)",
              padding: "5px 14px",
              borderRadius: 50,
              fontSize: ".7rem",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            🛵 Yorix Ride — Centre de commande
          </div>
          <h1
            style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: "1.55rem",
              fontWeight: 800,
              color: "#fff",
              marginBottom: 6,
              letterSpacing: "-.5px",
              lineHeight: 1.2,
            }}
          >
            Restez chez vous. <span style={{ color: "#4fd17d" }}>Yorix s'en charge.</span>
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,.65)",
              fontSize: ".9rem",
              lineHeight: 1.5,
              marginBottom: 0,
              maxWidth: 540,
            }}
          >
            Commandez un livreur en 15 secondes. Estimation tarifaire instantanée. Suivi GPS en temps réel.
          </p>
        </div>

        {/* ═══ FORMULAIRE QUICK ORDER ═══ */}
        <div
          style={{
            background: "rgba(255,255,255,.06)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,.1)",
            borderRadius: 14,
            padding: 16,
            marginBottom: 14,
          }}
        >
          {/* Adresses */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: ".95rem", pointerEvents: "none" }}>📍</span>
              <input
                type="text"
                placeholder="Départ (ex: Boutique Akwa, Douala)"
                value={depart}
                onChange={(e) => setDepart(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 42px",
                  borderRadius: 10,
                  border: "1.5px solid rgba(255,255,255,.15)",
                  background: "rgba(255,255,255,.08)",
                  color: "#fff",
                  fontSize: ".88rem",
                  fontFamily: "'DM Sans',sans-serif",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: ".95rem", pointerEvents: "none" }}>🏠</span>
              <input
                type="text"
                placeholder="Destination (ex: Bonanjo, Douala)"
                value={arrivee}
                onChange={(e) => setArrivee(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 42px",
                  borderRadius: 10,
                  border: "1.5px solid rgba(255,255,255,.15)",
                  background: "rgba(255,255,255,.08)",
                  color: "#fff",
                  fontSize: ".88rem",
                  fontFamily: "'DM Sans',sans-serif",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Ville + urgent */}
          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            <select
              value={ville}
              onChange={(e) => setVille(e.target.value)}
              style={{
                flex: "1 1 140px",
                padding: "10px 12px",
                borderRadius: 9,
                border: "1.5px solid rgba(255,255,255,.15)",
                background: "rgba(255,255,255,.08)",
                color: "#fff",
                fontSize: ".82rem",
                fontFamily: "'DM Sans',sans-serif",
                outline: "none",
                cursor: "pointer",
              }}
            >
              {Object.keys(DISTANCES_INTRA).map((v) => (
                <option key={v} value={v} style={{ background: "#1a3a24" }}>
                  📍 {v}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setUrgent(!urgent)}
              style={{
                flex: "1 1 140px",
                padding: "10px 12px",
                borderRadius: 9,
                border: urgent ? "1.5px solid var(--yellow, #fcd116)" : "1.5px solid rgba(255,255,255,.15)",
                background: urgent ? "rgba(252,209,22,.18)" : "rgba(255,255,255,.08)",
                color: urgent ? "var(--yellow, #fcd116)" : "#fff",
                fontSize: ".82rem",
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all .2s",
              }}
            >
              ⚡ {urgent ? "Mode urgent activé" : "Activer mode urgent"}
            </button>
          </div>

          {/* Type de colis (chips) */}
          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                fontSize: ".68rem",
                color: "rgba(255,255,255,.6)",
                fontWeight: 700,
                marginBottom: 8,
                letterSpacing: ".05em",
              }}
            >
              TYPE DE COLIS
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
                gap: 6,
              }}
            >
              {Object.entries(TARIFS).map(([key, t]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTypeColis(key)}
                  style={{
                    padding: "10px 8px",
                    borderRadius: 9,
                    border: typeColis === key ? "1.5px solid var(--yellow, #fcd116)" : "1.5px solid rgba(255,255,255,.12)",
                    background: typeColis === key ? "rgba(252,209,22,.15)" : "rgba(255,255,255,.05)",
                    color: "#fff",
                    cursor: "pointer",
                    transition: "all .2s",
                    textAlign: "center",
                    fontFamily: "inherit",
                  }}
                >
                  <div style={{ fontSize: "1.2rem", marginBottom: 3 }}>{t.icon}</div>
                  <div style={{ fontSize: ".7rem", fontWeight: 700, fontFamily: "'Syne',sans-serif" }}>{t.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ ESTIMATION TARIFAIRE ═══ */}
        {estimation && (
          <div
            style={{
              background: "rgba(252,209,22,.12)",
              border: "1.5px solid rgba(252,209,22,.35)",
              borderRadius: 12,
              padding: "14px 16px",
              marginBottom: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 10,
              animation: "yfadeIn .3s ease",
            }}
          >
            <div>
              <div style={{ fontSize: ".68rem", color: "rgba(255,255,255,.6)", fontWeight: 700, marginBottom: 3 }}>
                💰 ESTIMATION TARIFAIRE
              </div>
              <div
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "var(--yellow, #fcd116)",
                  lineHeight: 1.1,
                }}
              >
                {estimation.fourchetteMin.toLocaleString()} – {estimation.fourchetteMax.toLocaleString()} FCFA
              </div>
              <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.65)", marginTop: 3 }}>
                ⏱ {estimation.tempsMin}–{estimation.tempsMax} min · 📏 ~{estimation.distance} km
              </div>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,.1)",
                padding: "6px 12px",
                borderRadius: 50,
                fontSize: ".68rem",
                color: "#fff",
                fontWeight: 600,
              }}
            >
              ✅ Tarif transparent
            </div>
          </div>
        )}

        {/* ═══ CTA PRINCIPAUX ═══ */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={onOpenFullModal}
            style={{
              flex: "2 1 240px",
              background: "linear-gradient(135deg, var(--yellow, #fcd116), #ffd84a)",
              color: "#0d1f14",
              border: "none",
              padding: "14px 22px",
              borderRadius: 11,
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: ".92rem",
              cursor: "pointer",
              boxShadow: "0 6px 18px rgba(252,209,22,.35)",
              transition: "transform .15s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "none")}
          >
            🚀 Commander maintenant
          </button>
          <button
            onClick={commanderWhatsApp}
            style={{
              flex: "1 1 180px",
              background: "#25D366",
              color: "#fff",
              border: "none",
              padding: "14px 22px",
              borderRadius: 11,
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: ".88rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              transition: "transform .15s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "none")}
          >
            💬 Via WhatsApp
          </button>
        </div>

        {/* Trust badges */}
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            marginTop: 14,
            justifyContent: "center",
          }}
        >
          {["🔒 Paiement sécurisé", "📍 Suivi GPS", "💰 Tarif transparent", "🆘 Support 7j/7"].map((t) => (
            <span
              key={t}
              style={{
                background: "rgba(255,255,255,.08)",
                color: "rgba(255,255,255,.85)",
                padding: "5px 11px",
                borderRadius: 50,
                fontSize: ".68rem",
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,.1)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <style>{`@keyframes yfadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
