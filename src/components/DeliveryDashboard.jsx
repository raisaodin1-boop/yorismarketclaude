import { useState } from "react";
import { supabase } from "../lib/supabase";

// ─────────────────────────────────────────────────────────────
// COMPOSANT : DASHBOARD LIVREUR (DELIVERY) — Uber Yorix Ride
// ─────────────────────────────────────────────────────────────
export function DeliveryDashboard({ user, userData, dashTab, setDashTab }) {
  const [livraisons, setLivraisons] = useState([
    { id: "YX-2847", client: "Amina T.",     telephone: "655112233", adresse_collecte: "Marché Central, Douala",       adresse_livraison: "Akwa, Douala",             produit: "iPhone 14 128GB",   montant: 287500, commission_livreur: 2500, status: "available",   distance: "2.4 km", temps_estime: "~15 min" },
    { id: "YX-2835", client: "Bertrand K.",  telephone: "677884455", adresse_collecte: "Boutique Ngoa-Ekélé, Yaoundé", adresse_livraison: "Bastos, Yaoundé",          produit: "Robe Pagne Wax",    montant: 20500,  commission_livreur: 1500, status: "available",   distance: "5.1 km", temps_estime: "~25 min" },
    { id: "YX-2801", client: "Célestine M.", telephone: "699001122", adresse_collecte: "Mall de Douala",                adresse_livraison: "Bonanjo, Douala",          produit: "Ventilateur 40cm",  montant: 25000,  commission_livreur: 1200, status: "in_progress", distance: "1.2 km", temps_estime: "~8 min"  },
    { id: "YX-2799", client: "Rodrigue E.",  telephone: "670223344", adresse_collecte: "Centre Ville, Bafoussam",       adresse_livraison: "Quartier Mtcheu, Bafoussam", produit: "Sac à main cuir", montant: 15000,  commission_livreur: 800,  status: "delivered",   distance: "3.0 km", temps_estime: "Livré"   },
  ]);
  const [gainsTotal] = useState(47500);
  const [gainsMois]  = useState(127000);

  const actionLivraison = async (id, newStatus) => {
    const statusMap = {
      available:   "commande_recue",
      in_progress: "en_route",
      delivered:   "livre",
      refused:     "commande_recue",
    };
    const newStatutReal = statusMap[newStatus] || newStatus;

    try {
      const updates = {
        statut:      newStatutReal,
        livreur_id:  user.id,
        livreur_nom: userData?.nom || "Livreur Yorix",
        livreur_tel: userData?.telephone || "",
      };

      const now = new Date().toISOString();
      if (newStatutReal === "preparation") updates.preparation_at = now;
      if (newStatutReal === "collecte")    updates.collecte_at    = now;
      if (newStatutReal === "en_route")    updates.en_route_at    = now;
      if (newStatutReal === "livre")       updates.livre_at       = now;

      const { error } = await supabase
        .from("deliveries")
        .update(updates)
        .or(`order_id.eq.${id},code_suivi.eq.${id}`);

      if (error) console.warn("update deliveries:", error);

      setLivraisons(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    } catch (err) {
      console.error("actionLivraison:", err);
      setLivraisons(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    }
  };

  const dispo   = livraisons.filter(l => l.status === "available");
  const enCours = livraisons.filter(l => l.status === "in_progress");
  const livrees = livraisons.filter(l => l.status === "delivered");

  const LivraisonCard = ({ l, showActions = true }) => (
    <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 12, padding: 16, marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 36, height: 36, background: "var(--green-pale)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>📦</div>
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".85rem", color: "var(--ink)" }}>#{l.id}</div>
            <div style={{ fontSize: ".68rem", color: "var(--gray)" }}>👤 {l.client} · 📞 {l.telephone}</div>
          </div>
        </div>
        <span className={`status-badge s-${l.status === "available" ? "pending" : l.status === "in_progress" ? "en_cours" : l.status}`}>
          {l.status === "available" ? "🟡 Disponible" : l.status === "in_progress" ? "🚚 En cours" : "✅ Livré"}
        </span>
      </div>

      <div style={{ background: "var(--surface2)", borderRadius: 8, padding: "10px 12px", marginBottom: 10, fontSize: ".75rem" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
          <span style={{ color: "var(--green)", fontWeight: 700, flexShrink: 0 }}>📍</span>
          <div>
            <span style={{ fontWeight: 600, color: "var(--gray)", fontSize: ".67rem" }}>COLLECTE</span><br />
            <span style={{ color: "var(--ink)" }}>{l.adresse_collecte}</span>
          </div>
        </div>
        <div style={{ borderLeft: "2px dashed var(--border)", marginLeft: 6, height: 10, marginBottom: 6 }} />
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <span style={{ color: "var(--red)", fontWeight: 700, flexShrink: 0 }}>🏠</span>
          <div>
            <span style={{ fontWeight: 600, color: "var(--gray)", fontSize: ".67rem" }}>LIVRAISON</span><br />
            <span style={{ color: "var(--ink)" }}>{l.adresse_livraison}</span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: showActions ? 10 : 0 }}>
        <span style={{ background: "var(--surface2)", borderRadius: 6, padding: "3px 8px", fontSize: ".68rem", fontWeight: 600, color: "var(--ink)" }}>📦 {l.produit}</span>
        <span style={{ background: "var(--surface2)", borderRadius: 6, padding: "3px 8px", fontSize: ".68rem", fontWeight: 600, color: "var(--ink)" }}>📏 {l.distance}</span>
        <span style={{ background: "var(--surface2)", borderRadius: 6, padding: "3px 8px", fontSize: ".68rem", fontWeight: 600, color: "var(--ink)" }}>⏱ {l.temps_estime}</span>
        <span style={{ background: "var(--green-pale)", borderRadius: 6, padding: "3px 8px", fontSize: ".68rem", fontWeight: 700, color: "var(--green)" }}>
          💰 Gain: {l.commission_livreur?.toLocaleString()} FCFA
        </span>
      </div>

      {showActions && l.status === "available" && (
        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={{ flex: 2, background: "var(--green)", color: "#fff", border: "none", padding: "9px", borderRadius: 8, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".78rem", cursor: "pointer" }}
            onClick={() => actionLivraison(l.id, "in_progress")}
          >
            ✅ Accepter la livraison
          </button>
          <button
            style={{ flex: 1, background: "var(--surface2)", color: "var(--ink)", border: "1.5px solid var(--border)", padding: "9px", borderRadius: 8, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".78rem", cursor: "pointer" }}
            onClick={() => actionLivraison(l.id, "refused")}
          >
            ❌ Refuser
          </button>
        </div>
      )}
      {showActions && l.status === "in_progress" && (
        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={{ flex: 1, background: "#1565c0", color: "#fff", border: "none", padding: "9px", borderRadius: 8, cursor: "pointer" }}
            onClick={() => {
              const url = `https://wa.me/${(l.telephone || "237696565654").replace(/\D/g, "")}?text=${encodeURIComponent(`Bonjour ${l.client} ! Je suis votre livreur Yorix 🏍️`)}`;
              window.open(url, "_blank");
            }}
          >
            📱 Contacter
          </button>
          <button
            style={{ flex: 1, background: "var(--green)", color: "#fff", border: "none", padding: "9px", borderRadius: 8, cursor: "pointer" }}
            onClick={() => actionLivraison(l.id, "delivered")}
          >
            ✅ Confirmer livraison
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="dash-page-title">
        Bonjour {userData?.nom} 🏍️{" "}
        <span style={{ fontSize: ".75rem", color: "var(--gray)", fontFamily: "'DM Sans',sans-serif", fontWeight: 400 }}>
          — Yorix Ride
        </span>
      </div>

      <div className="dash-stats">
        {[
          { icon: "🟡", val: dispo.length,   lbl: "Disponibles", trend: "Nouvelles missions" },
          { icon: "🚚", val: enCours.length, lbl: "En cours",    trend: "" },
          { icon: "✅", val: livrees.length, lbl: "Livrées",     trend: "+" },
          { icon: "💰", val: `${gainsTotal.toLocaleString()} F`, lbl: "Gains disponibles", trend: `${gainsMois.toLocaleString()} F / mois` },
        ].map(s => (
          <div key={s.lbl} className="dstat">
            <div className="dstat-icon">{s.icon}</div>
            <div className="dstat-val">{s.val}</div>
            <div className="dstat-lbl">{s.lbl}</div>
            {s.trend && <div className="dstat-trend">{s.trend}</div>}
          </div>
        ))}
      </div>

      {dashTab === "overview" && (
        <>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".95rem", color: "var(--ink)", marginBottom: 12 }}>
            🟡 Missions disponibles ({dispo.length})
          </div>
          {dispo.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🛵</div>
              <p>Aucune mission disponible pour l'instant</p>
              <p style={{ fontSize: ".78rem", marginTop: 6 }}>Revenez dans quelques minutes !</p>
            </div>
          ) : (
            dispo.map(l => <LivraisonCard key={l.id} l={l} />)
          )}
          {enCours.length > 0 && (
            <>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".95rem", color: "var(--ink)", margin: "18px 0 12px" }}>
                🚚 En cours ({enCours.length})
              </div>
              {enCours.map(l => <LivraisonCard key={l.id} l={l} />)}
            </>
          )}
        </>
      )}

      {dashTab === "disponibles" && (
        <>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".95rem", color: "var(--ink)", marginBottom: 12 }}>
            🟡 Missions disponibles
          </div>
          {dispo.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">🛵</div><p>Aucune mission disponible</p></div>
          ) : (
            dispo.map(l => <LivraisonCard key={l.id} l={l} />)
          )}
        </>
      )}

      {dashTab === "enCours" && (
        <>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".95rem", color: "var(--ink)", marginBottom: 12 }}>
            🚚 Livraisons en cours
          </div>
          {enCours.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">🚚</div><p>Aucune livraison en cours</p></div>
          ) : (
            enCours.map(l => <LivraisonCard key={l.id} l={l} />)
          )}
        </>
      )}

      {dashTab === "historique" && (
        <>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".95rem", color: "var(--ink)", marginBottom: 12 }}>
            ✅ Historique ({livrees.length})
          </div>
          {livrees.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">📋</div><p>Aucune livraison terminée</p></div>
          ) : (
            livrees.map(l => <LivraisonCard key={l.id} l={l} showActions={false} />)
          )}
        </>
      )}

      {dashTab === "wallet" && (
        <>
          <div className="dash-page-title">💰 Mes Gains</div>
          <div className="wallet-card">
            <div className="wc-label">Gains disponibles</div>
            <div className="wc-amount">{gainsTotal.toLocaleString()} FCFA</div>
            <div className="wc-sub">
              Ce mois : {gainsMois.toLocaleString()} FCFA · {livrees.length} livraisons effectuées
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
            {[
              { label: "Aujourd'hui",      val: "12 500 FCFA",                          ic: "📅" },
              { label: "Cette semaine",    val: "47 500 FCFA",                          ic: "📆" },
              { label: "Ce mois",          val: `${gainsMois.toLocaleString()} FCFA`,   ic: "🗓️" },
              { label: "Total livraisons", val: livrees.length,                         ic: "✅" },
            ].map(s => (
              <div key={s.label} style={{ background: "var(--surface2)", borderRadius: 10, padding: "12px 14px", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: "1.1rem", marginBottom: 4 }}>{s.ic}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".88rem", color: "var(--ink)" }}>{s.val}</div>
                <div style={{ fontSize: ".68rem", color: "var(--gray)" }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div className="info-box">
            <div className="info-icon">📱</div>
            <p>Retrait MTN MoMo et Orange Money — bientôt disponible.</p>
          </div>
        </>
      )}
    </>
  );
}
