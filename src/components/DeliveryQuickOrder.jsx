// ═══════════════════════════════════════════════════════════════
//  YORIX CM — DELIVERY QUICK ORDER v4
//  ✅ CALCUL DE DISTANCE EN TEMPS RÉEL via dictionnaire de quartiers
//  ✅ Tarifs Yorix CM
//  ✅ Mode urgent × 2
//  
//  💡 COMMENT ÇA MARCHE :
//  L'utilisateur tape "Bastos" → on cherche les coordonnées GPS
//  L'utilisateur tape "Ahala" → on cherche les coordonnées GPS
//  On calcule la distance réelle (formule Haversine) en km
//  Si quartier non trouvé → fallback sur moyenne ville
// ═══════════════════════════════════════════════════════════════

import { useState, useMemo } from "react";
import { YORIX_WA_NUMBER } from "../lib/supabase";

// ── TARIFS YORIX CM (FCFA) ──
const TARIFS = {
  document:    { base: 1000, parKm: 75,  icon: "📄", label: "Enveloppe",    desc: "Lettres, documents" },
  petit_colis: { base: 1500, parKm: 100, icon: "📦", label: "Petit colis",  desc: "Moins de 5 kg" },
  moyen_colis: { base: 2000, parKm: 200, icon: "📮", label: "Moyen colis",  desc: "5 à 20 kg" },
  gros_colis:  { base: 3000, parKm: 300, icon: "🪑", label: "Gros colis",   desc: "Plus de 20 kg" },
  repas:       { base: 1500, parKm: 75,  icon: "🍱", label: "Repas",        desc: "Restaurants, plats" },
  courses:     { base: 2500, parKm: 300, icon: "🛒", label: "Courses",      desc: "Marché, supermarché" },
};

// ═══════════════════════════════════════════════════════════════
//  DICTIONNAIRE DES QUARTIERS AVEC COORDONNÉES GPS RÉELLES
//  Tu peux en ajouter facilement : { "nom_quartier": [latitude, longitude] }
//  Recherche le nom → utilise les coordonnées pour calculer la distance
// ═══════════════════════════════════════════════════════════════
const QUARTIERS = {
  // ─── YAOUNDÉ ───
  "bastos":         { ville: "Yaoundé", coords: [3.8920, 11.5180] },
  "ahala":          { ville: "Yaoundé", coords: [3.8160, 11.4980] },
  "mvan":           { ville: "Yaoundé", coords: [3.8270, 11.5210] },
  "mvog ada":       { ville: "Yaoundé", coords: [3.8580, 11.5290] },
  "mvog-ada":       { ville: "Yaoundé", coords: [3.8580, 11.5290] },
  "mokolo":         { ville: "Yaoundé", coords: [3.8810, 11.5100] },
  "messa":          { ville: "Yaoundé", coords: [3.8740, 11.5050] },
  "biyem-assi":     { ville: "Yaoundé", coords: [3.8430, 11.4830] },
  "biyem assi":     { ville: "Yaoundé", coords: [3.8430, 11.4830] },
  "essos":          { ville: "Yaoundé", coords: [3.8780, 11.5380] },
  "ngoa-ekele":     { ville: "Yaoundé", coords: [3.8650, 11.5200] },
  "ngoa ekele":     { ville: "Yaoundé", coords: [3.8650, 11.5200] },
  "nlongkak":       { ville: "Yaoundé", coords: [3.8950, 11.5290] },
  "tsinga":         { ville: "Yaoundé", coords: [3.8830, 11.5050] },
  "etoudi":         { ville: "Yaoundé", coords: [3.9120, 11.5380] },
  "nsimeyong":      { ville: "Yaoundé", coords: [3.8480, 11.4940] },
  "obili":          { ville: "Yaoundé", coords: [3.8660, 11.4910] },
  "olembe":         { ville: "Yaoundé", coords: [3.9320, 11.4890] },
  "centre ville":   { ville: "Yaoundé", coords: [3.8670, 11.5170] },
  "centre-ville":   { ville: "Yaoundé", coords: [3.8670, 11.5170] },
  "yaoundé":        { ville: "Yaoundé", coords: [3.8670, 11.5170] },
  "emana":          { ville: "Yaoundé", coords: [3.9070, 11.5160] },
  "elig-essono":    { ville: "Yaoundé", coords: [3.8890, 11.5290] },
  "etoa-meki":      { ville: "Yaoundé", coords: [3.8920, 11.5350] },
  "djoungolo":      { ville: "Yaoundé", coords: [3.8970, 11.5420] },
  "nkoabang":       { ville: "Yaoundé", coords: [3.8430, 11.6210] },
  "soa":            { ville: "Yaoundé", coords: [3.9760, 11.6290] },
  "mfoundi":        { ville: "Yaoundé", coords: [3.8650, 11.5170] },
  "melen":          { ville: "Yaoundé", coords: [3.8550, 11.4970] },
  "etoug-ebe":      { ville: "Yaoundé", coords: [3.8740, 11.4890] },
  "simbock":        { ville: "Yaoundé", coords: [3.8260, 11.4820] },

  // ─── DOUALA ───
  "akwa":           { ville: "Douala", coords: [4.0430, 9.7060] },
  "bonanjo":        { ville: "Douala", coords: [4.0530, 9.6900] },
  "bonapriso":      { ville: "Douala", coords: [4.0290, 9.6890] },
  "bonaberi":       { ville: "Douala", coords: [4.0820, 9.6670] },
  "deido":          { ville: "Douala", coords: [4.0660, 9.7090] },
  "bali":           { ville: "Douala", coords: [4.0440, 9.6970] },
  "bepanda":        { ville: "Douala", coords: [4.0790, 9.7160] },
  "ndokotti":       { ville: "Douala", coords: [4.0500, 9.7350] },
  "logbessou":      { ville: "Douala", coords: [4.0950, 9.7490] },
  "logpom":         { ville: "Douala", coords: [4.0760, 9.7610] },
  "makepe":         { ville: "Douala", coords: [4.0840, 9.7320] },
  "kotto":          { ville: "Douala", coords: [4.0560, 9.7390] },
  "yassa":          { ville: "Douala", coords: [4.0070, 9.7820] },
  "japoma":         { ville: "Douala", coords: [4.0240, 9.8010] },
  "village":        { ville: "Douala", coords: [4.0700, 9.7770] },
  "ndogbong":       { ville: "Douala", coords: [4.0600, 9.7530] },
  "pk8":            { ville: "Douala", coords: [4.1000, 9.7860] },
  "pk9":            { ville: "Douala", coords: [4.1080, 9.7920] },
  "pk10":           { ville: "Douala", coords: [4.1160, 9.7980] },
  "pk12":           { ville: "Douala", coords: [4.1310, 9.8090] },
  "pk14":           { ville: "Douala", coords: [4.1450, 9.8200] },
  "douala":         { ville: "Douala", coords: [4.0510, 9.7080] },
  "marché central": { ville: "Douala", coords: [4.0490, 9.7050] },
  "new-bell":       { ville: "Douala", coords: [4.0650, 9.7230] },
  "new bell":       { ville: "Douala", coords: [4.0650, 9.7230] },

  // ─── BAFOUSSAM ───
  "bafoussam":      { ville: "Bafoussam", coords: [5.4781, 10.4179] },
  "tougang":        { ville: "Bafoussam", coords: [5.4870, 10.4280] },
  "tamdja":         { ville: "Bafoussam", coords: [5.4690, 10.4080] },
  "djeleng":        { ville: "Bafoussam", coords: [5.4920, 10.4350] },

  // ─── BAMENDA ───
  "bamenda":        { ville: "Bamenda", coords: [5.9597, 10.1456] },
  "commercial":     { ville: "Bamenda", coords: [5.9650, 10.1500] },
  "nkwen":          { ville: "Bamenda", coords: [5.9750, 10.1600] },
  "mendankwe":      { ville: "Bamenda", coords: [5.9830, 10.1380] },

  // ─── KRIBI ───
  "kribi":          { ville: "Kribi", coords: [2.9405, 9.9098] },

  // ─── GAROUA ───
  "garoua":         { ville: "Garoua", coords: [9.3265, 13.3958] },
};

// ── DISTANCES MOYENNES PAR VILLE (fallback si quartier non trouvé) ──
const DISTANCES_MOYENNES = {
  "Yaoundé":    7,
  "Douala":     6,
  "Bafoussam":  4,
  "Bamenda":    5,
  "Kribi":      3,
  "Garoua":     4,
};

// ═══════════════════════════════════════════════════════════════
//  CALCUL DE DISTANCE — Formule Haversine
//  Calcule la distance à vol d'oiseau entre 2 points GPS
// ═══════════════════════════════════════════════════════════════
function distanceHaversine(coords1, coords2) {
  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;
  const R = 6371; // Rayon Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// ═══════════════════════════════════════════════════════════════
//  CHERCHE UN QUARTIER DANS LE TEXTE TAPÉ
//  Normalise : minuscules, retire accents, cherche correspondance
// ═══════════════════════════════════════════════════════════════
function chercherQuartier(texte) {
  if (!texte) return null;
  const normalized = texte.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")  // retire accents
    .trim();

  // Recherche exacte d'abord
  if (QUARTIERS[normalized]) return QUARTIERS[normalized];

  // Recherche : un des quartiers est-il dans le texte ?
  // (ex: "Bastos, Yaoundé" contient "bastos")
  for (const [key, val] of Object.entries(QUARTIERS)) {
    if (normalized.includes(key)) return val;
  }
  return null;
}

export function DeliveryQuickOrder({ user, userData, onOpenFullModal }) {
  const [depart, setDepart]       = useState("");
  const [arrivee, setArrivee]     = useState("");
  const [ville, setVille]         = useState("Douala");
  const [typeColis, setTypeColis] = useState("document");
  const [urgent, setUrgent]       = useState(false);

  // ═══ CALCUL TARIF + DISTANCE INSTANTANÉ ═══
  const estimation = useMemo(() => {
    if (!depart.trim() || !arrivee.trim()) return null;

    // 1️⃣ Chercher les coordonnées des deux adresses
    const departInfo  = chercherQuartier(depart);
    const arriveeInfo = chercherQuartier(arrivee);

    // 2️⃣ Calculer la distance
    let distEstimee;
    let methodeCalcul;

    if (departInfo && arriveeInfo) {
      // Distance réelle calculée à partir des coordonnées GPS
      const distVolOiseau = distanceHaversine(departInfo.coords, arriveeInfo.coords);
      // Multiplier par 1.3 pour estimer la distance routière (vs vol d'oiseau)
      distEstimee = distVolOiseau * 1.3;
      methodeCalcul = "calculée";
    } else if (departInfo || arriveeInfo) {
      // Une seule adresse reconnue → estimation moyenne ville
      const villeDetectee = (departInfo || arriveeInfo).ville;
      distEstimee = DISTANCES_MOYENNES[villeDetectee] || 6;
      methodeCalcul = "estimée";
    } else {
      // Aucune adresse reconnue → fallback ville sélectionnée
      distEstimee = DISTANCES_MOYENNES[ville] || 6;
      methodeCalcul = "estimée";
    }

    // Distance minimum 1km, maximum 50km
    distEstimee = Math.max(1, Math.min(50, distEstimee));

    // 3️⃣ Calculer le prix
    const tarif = TARIFS[typeColis];
    let prix = tarif.base + (distEstimee * tarif.parKm);

    // Mode urgent : tarif × 2
    let tempsMin = Math.round(15 + distEstimee * 3);
    if (urgent) {
      prix = prix * 2;
      tempsMin = Math.round(tempsMin * 0.6);
    }

    // Arrondi au 100 FCFA supérieur
    prix = Math.ceil(prix / 100) * 100;

    return {
      prix,
      tempsMin,
      tempsMax: tempsMin + 10,
      distance: distEstimee.toFixed(1),
      methodeCalcul,
      fourchetteMin: Math.ceil((prix * 0.9) / 100) * 100,
      fourchetteMax: Math.ceil((prix * 1.1) / 100) * 100,
    };
  }, [depart, arrivee, ville, typeColis, urgent]);

  // ── COMMANDER VIA WHATSAPP ──
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
      "📦 *Type :* " + tarif.icon + " " + tarif.label + " (" + tarif.desc + ")",
      urgent ? "⚡ *Mode urgent activé* (tarif × 2, livraison prioritaire)" : "",
      "",
      estimation ? "📏 *Distance " + estimation.methodeCalcul + " :* ~" + estimation.distance + " km" : "",
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
      <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "rgba(252,209,22,.08)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, left: -60, width: 180, height: 180, background: "rgba(79,209,125,.06)", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* HEADER */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(252,209,22,.14)", color: "var(--yellow, #fcd116)",
              border: "1px solid rgba(252,209,22,.28)",
              padding: "5px 14px", borderRadius: 50,
              fontSize: ".7rem", fontWeight: 700, marginBottom: 12,
            }}
          >
            🛵 Yorix Ride — Centre de commande
          </div>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.55rem", fontWeight: 800, color: "#fff", marginBottom: 6, letterSpacing: "-.5px", lineHeight: 1.2 }}>
            Restez chez vous. <span style={{ color: "#4fd17d" }}>Yorix s'en charge.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,.65)", fontSize: ".9rem", lineHeight: 1.5, marginBottom: 0, maxWidth: 540 }}>
            Tarif à partir de <strong style={{color:"var(--yellow, #fcd116)"}}>1 000 FCFA</strong> · Distance calculée automatiquement.
          </p>
        </div>

        {/* FORMULAIRE */}
        <div
          style={{
            background: "rgba(255,255,255,.06)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,.1)",
            borderRadius: 14, padding: 16, marginBottom: 14,
          }}
        >
          {/* Adresses */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: ".95rem", pointerEvents: "none" }}>📍</span>
              <input
                type="text"
                placeholder="Départ (ex: Bastos, Yaoundé)"
                value={depart}
                onChange={(e) => setDepart(e.target.value)}
                list="quartiers-yorix"
                style={{
                  width: "100%", padding: "12px 14px 12px 42px",
                  borderRadius: 10, border: "1.5px solid rgba(255,255,255,.15)",
                  background: "rgba(255,255,255,.08)", color: "#fff",
                  fontSize: ".88rem", fontFamily: "'DM Sans',sans-serif",
                  outline: "none", boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: ".95rem", pointerEvents: "none" }}>🏠</span>
              <input
                type="text"
                placeholder="Destination (ex: Ahala, Yaoundé)"
                value={arrivee}
                onChange={(e) => setArrivee(e.target.value)}
                list="quartiers-yorix"
                style={{
                  width: "100%", padding: "12px 14px 12px 42px",
                  borderRadius: 10, border: "1.5px solid rgba(255,255,255,.15)",
                  background: "rgba(255,255,255,.08)", color: "#fff",
                  fontSize: ".88rem", fontFamily: "'DM Sans',sans-serif",
                  outline: "none", boxSizing: "border-box",
                }}
              />
            </div>
            {/* Datalist pour autocomplétion native */}
            <datalist id="quartiers-yorix">
              {Object.keys(QUARTIERS).map(q => (
                <option key={q} value={q.charAt(0).toUpperCase() + q.slice(1)} />
              ))}
            </datalist>
          </div>

          {/* Ville + urgent */}
          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            <select
              value={ville}
              onChange={(e) => setVille(e.target.value)}
              style={{
                flex: "1 1 140px", padding: "10px 12px", borderRadius: 9,
                border: "1.5px solid rgba(255,255,255,.15)",
                background: "rgba(255,255,255,.08)", color: "#fff",
                fontSize: ".82rem", fontFamily: "'DM Sans',sans-serif",
                outline: "none", cursor: "pointer",
              }}
            >
              {Object.keys(DISTANCES_MOYENNES).map((v) => (
                <option key={v} value={v} style={{ background: "#1a3a24" }}>📍 {v}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setUrgent(!urgent)}
              style={{
                flex: "1 1 140px", padding: "10px 12px", borderRadius: 9,
                border: urgent ? "1.5px solid var(--yellow, #fcd116)" : "1.5px solid rgba(255,255,255,.15)",
                background: urgent ? "rgba(252,209,22,.18)" : "rgba(255,255,255,.08)",
                color: urgent ? "var(--yellow, #fcd116)" : "#fff",
                fontSize: ".82rem", fontFamily: "'Syne',sans-serif",
                fontWeight: 700, cursor: "pointer", transition: "all .2s",
              }}
            >
              ⚡ {urgent ? "Urgent activé (×2)" : "Mode urgent (×2)"}
            </button>
          </div>

          {/* Type de colis */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: ".68rem", color: "rgba(255,255,255,.6)", fontWeight: 700, marginBottom: 8, letterSpacing: ".05em" }}>
              TYPE DE COLIS
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 6 }}>
              {Object.entries(TARIFS).map(([key, t]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTypeColis(key)}
                  style={{
                    padding: "10px 8px", borderRadius: 9,
                    border: typeColis === key ? "1.5px solid var(--yellow, #fcd116)" : "1.5px solid rgba(255,255,255,.12)",
                    background: typeColis === key ? "rgba(252,209,22,.15)" : "rgba(255,255,255,.05)",
                    color: "#fff", cursor: "pointer", transition: "all .2s",
                    textAlign: "center", fontFamily: "inherit",
                  }}
                >
                  <div style={{ fontSize: "1.2rem", marginBottom: 3 }}>{t.icon}</div>
                  <div style={{ fontSize: ".7rem", fontWeight: 700, fontFamily: "'Syne',sans-serif" }}>{t.label}</div>
                  <div style={{ fontSize: ".58rem", color: "rgba(255,255,255,.5)", marginTop: 2 }}>
                    dès {t.base.toLocaleString()} F
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ESTIMATION */}
        {estimation && (
          <div
            style={{
              background: "rgba(252,209,22,.12)",
              border: "1.5px solid rgba(252,209,22,.35)",
              borderRadius: 12, padding: "14px 16px", marginBottom: 14,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: 10, animation: "yfadeIn .3s ease",
            }}
          >
            <div>
              <div style={{ fontSize: ".68rem", color: "rgba(255,255,255,.6)", fontWeight: 700, marginBottom: 3 }}>
                💰 ESTIMATION TARIFAIRE {urgent && "⚡ URGENT"}
              </div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "var(--yellow, #fcd116)", lineHeight: 1.1 }}>
                {estimation.fourchetteMin.toLocaleString()} – {estimation.fourchetteMax.toLocaleString()} FCFA
              </div>
              <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.65)", marginTop: 3 }}>
                ⏱ {estimation.tempsMin}–{estimation.tempsMax} min · 📏 ~{estimation.distance} km {estimation.methodeCalcul === "calculée" ? "✓" : "(estimée)"}
                {urgent && " · ⚡ Tarif × 2"}
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,.1)", padding: "6px 12px", borderRadius: 50, fontSize: ".68rem", color: "#fff", fontWeight: 600 }}>
              {estimation.methodeCalcul === "calculée" ? "📍 Distance réelle" : "📊 Tarif transparent"}
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={onOpenFullModal}
            style={{
              flex: "2 1 240px",
              background: "linear-gradient(135deg, var(--yellow, #fcd116), #ffd84a)",
              color: "#0d1f14", border: "none",
              padding: "14px 22px", borderRadius: 11,
              fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".92rem",
              cursor: "pointer", boxShadow: "0 6px 18px rgba(252,209,22,.35)",
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
              flex: "1 1 180px", background: "#25D366",
              color: "#fff", border: "none",
              padding: "14px 22px", borderRadius: 11,
              fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".88rem",
              cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", gap: 6, transition: "transform .15s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "none")}
          >
            💬 Via WhatsApp
          </button>
        </div>

        {/* Trust badges */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 14, justifyContent: "center" }}>
          {["🔒 Paiement sécurisé", "📍 Suivi GPS", "💰 Tarif transparent", "🆘 Support 7j/7"].map((t) => (
            <span key={t} style={{ background: "rgba(255,255,255,.08)", color: "rgba(255,255,255,.85)", padding: "5px 11px", borderRadius: 50, fontSize: ".68rem", fontWeight: 600, border: "1px solid rgba(255,255,255,.1)" }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <style>{`@keyframes yfadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
