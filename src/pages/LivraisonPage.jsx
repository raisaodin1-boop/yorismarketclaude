import { Suspense, lazy } from "react";
import { CITY_BY_SLUG } from "../lib/seoRoutes";

function LivraisonSuspenseFallback({ minHeight = 200, label = "Chargement..." }) {
  return (
    <div className="loading" style={{ minHeight, justifyContent: "center", padding: "24px 0" }}>
      <div className="spinner" />
      {label}
    </div>
  );
}

const LazyLivraisonTopInteractive = lazy(() =>
  import("../components/LivraisonLazyBlocks").then((m) => ({
    default: m.LivraisonTopInteractive,
  }))
);

const LazyLivraisonBottomInteractive = lazy(() =>
  import("../components/LivraisonLazyBlocks").then((m) => ({
    default: m.LivraisonBottomInteractive,
  }))
);

export function LivraisonPage({
  route,
  user,
  userData,
  setDemandeLivraisonOpen,
  setAuthTab,
  setSelectedRole,
  setAuthOpen,
}) {
  return (
    <div className="anim">
      <section className="sec">
        <header style={{ marginBottom: 20, maxWidth: 760 }}>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.15rem,2.5vw,1.35rem)", color: "var(--ink)", margin: "0 0 10px", letterSpacing: "-.3px" }}>
            {route.citySlug && CITY_BY_SLUG[route.citySlug]
              ? `Livraison à ${CITY_BY_SLUG[route.citySlug].name} — livreurs Yorix`
              : "Livraison Cameroun — Yorix Ride express"}
          </h1>
          <p style={{ fontSize: ".87rem", color: "var(--gray)", lineHeight: 1.75, margin: 0 }}>
            Service de livraison rapide au Cameroun : colis, courses, marketplace. Réseau de livreurs indépendants — suivi, tarifs transparents, paiement MoMo.
          </p>
        </header>

        <Suspense fallback={<LivraisonSuspenseFallback minHeight={160} label="Chargement outils livraison..." />}>
          <LazyLivraisonTopInteractive user={user} userData={userData} onOpenDemand={() => setDemandeLivraisonOpen(true)} />
        </Suspense>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 22, marginBottom: 20 }}>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1rem", color: "var(--ink)", marginBottom: 16, letterSpacing: "-.3px" }}>🗺️ Comment fonctionne Yorix Ride ?</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {[
              { n: 1, icon: "🛍️", t: "Vous commandez", d: "Passez commande sur Yorix ou via WhatsApp" },
              { n: 2, icon: "🏍️", t: "Livreur assigné", d: "Un livreur proche accepte votre mission en quelques secondes" },
              { n: 3, icon: "📍", t: "Suivi en direct", d: "Suivez votre livreur sur la carte en temps réel" },
              { n: 4, icon: "✅", t: "Livraison confirmée", d: "Réceptionnez et confirmez. Paiement libéré au livreur." },
            ].map((s) => (
              <div key={s.n} style={{ textAlign: "center", padding: "14px 10px", background: "var(--surface2)", borderRadius: 10 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    background: "var(--green)",
                    color: "#fff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 800,
                    fontSize: ".78rem",
                    margin: "0 auto 8px",
                  }}
                >
                  {s.n}
                </div>
                <div style={{ fontSize: "1.4rem", marginBottom: 5 }}>{s.icon}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".78rem", color: "var(--ink)", marginBottom: 3 }}>{s.t}</div>
                <div style={{ fontSize: ".68rem", color: "var(--gray)", lineHeight: 1.5 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 22, marginBottom: 20 }}>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1rem", color: "var(--ink)", marginBottom: 14 }}>💰 Tarifs de livraison</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            {[
              { zone: "🏙️ Intra-ville", prix: "500 – 1 500 FCFA", delai: "20 – 45 min", dispo: "Douala, Yaoundé" },
              { zone: "🌆 Inter-quartiers", prix: "1 500 – 3 000 FCFA", delai: "1h – 2h", dispo: "Bafoussam, Bamenda" },
              { zone: "🗺️ Inter-villes", prix: "3 000 – 8 000 FCFA", delai: "J+1", dispo: "Tout le Cameroun" },
            ].map((t) => (
              <div key={t.zone} style={{ background: "var(--surface2)", borderRadius: 10, padding: 14, border: "1px solid var(--border)" }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".84rem", color: "var(--ink)", marginBottom: 5 }}>{t.zone}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1rem", fontWeight: 800, color: "var(--green)", marginBottom: 3 }}>{t.prix}</div>
                <div style={{ fontSize: ".69rem", color: "var(--gray)", marginBottom: 2 }}>⏱ {t.delai}</div>
                <div style={{ fontSize: ".65rem", color: "var(--gray)" }}>{t.dispo}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="sec-head">
            <h3 className="sec-title">🏍️ Livreurs disponibles maintenant</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            {[
              { emoji: "🏍️", name: "Jean-Pierre M.", sub: "Moto · Douala · Akwa", livraisons: 342, note: 4.9, dispo: true, temps: "~15 min" },
              { emoji: "🚐", name: "Augustin N.", sub: "Minibus · Yaoundé · Bastos", livraisons: 218, note: 4.8, dispo: true, temps: "~20 min" },
              { emoji: "🚗", name: "Grace T.", sub: "Voiture · Douala · Bonanjo", livraisons: 156, note: 5.0, dispo: true, temps: "~10 min" },
              { emoji: "🚚", name: "Fabrice K.", sub: "Camionnette · Bafoussam", livraisons: 189, note: 4.7, dispo: false, temps: null },
              { emoji: "🏍️", name: "Bertrand A.", sub: "Moto · Yaoundé · Mvan", livraisons: 271, note: 4.8, dispo: true, temps: "~18 min" },
              { emoji: "🚐", name: "Carine M.", sub: "Minibus · Douala · Bonapriso", livraisons: 98, note: 4.9, dispo: false, temps: null },
            ].map((d) => (
              <div
                key={d.name}
                style={{
                  background: d.dispo ? "var(--surface)" : "var(--surface2)",
                  border: `1.5px solid ${d.dispo ? "var(--green-light)" : "var(--border)"}`,
                  borderRadius: 12,
                  padding: 15,
                  opacity: d.dispo ? 1 : 0.7,
                  transition: "all .2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: d.dispo ? "var(--green)" : "var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.3rem",
                      flexShrink: 0,
                    }}
                  >
                    {d.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".86rem", color: "var(--ink)" }}>{d.name}</div>
                    <div style={{ fontSize: ".65rem", color: "var(--gray)", lineHeight: 1.4 }}>{d.sub}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <div style={{ background: "var(--surface2)", borderRadius: 7, padding: "4px 8px", fontSize: ".67rem", fontWeight: 600, color: "var(--ink)" }}>⭐ {d.note}</div>
                  <div style={{ background: "var(--surface2)", borderRadius: 7, padding: "4px 8px", fontSize: ".67rem", fontWeight: 600, color: "var(--ink)" }}>📦 {d.livraisons} livraisons</div>
                </div>
                <div style={{ fontSize: ".67rem", marginBottom: 10, fontWeight: 600, color: d.dispo ? "#27a85a" : "var(--gray)" }}>
                  {d.dispo ? (
                    <>
                      <span style={{ width: 6, height: 6, background: "#4fd17d", borderRadius: "50%", display: "inline-block", marginRight: 4 }} />
                      Disponible · {d.temps}
                    </>
                  ) : (
                    "⏸️ Non disponible pour le moment"
                  )}
                </div>
                <button
                  style={{
                    width: "100%",
                    background: d.dispo ? "var(--green)" : "var(--border)",
                    color: d.dispo ? "#fff" : "var(--gray)",
                    border: "none",
                    padding: "8px",
                    borderRadius: 8,
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 700,
                    fontSize: ".75rem",
                    cursor: d.dispo ? "pointer" : "default",
                  }}
                  onClick={() => d.dispo && setDemandeLivraisonOpen(true)}
                >
                  {d.dispo ? "📦 Demander livraison" : "⏳ Voir plus tard"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <Suspense fallback={<LivraisonSuspenseFallback minHeight={100} />}>
          <LazyLivraisonBottomInteractive onOpenDemand={() => setDemandeLivraisonOpen(true)} />
        </Suspense>

        <div style={{ background: "linear-gradient(135deg,#1a3a24,#0d3320)", borderRadius: 14, padding: 24, marginTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#fff", marginBottom: 5 }}>🏍️ Devenez livreur Yorix</div>
            <div style={{ color: "rgba(255,255,255,.6)", fontSize: ".82rem", lineHeight: 1.6, maxWidth: 360 }}>
              Gagnez 15 000 – 80 000 FCFA/mois selon votre activité. Horaires libres, votre propre véhicule, paiement quotidien.
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
              {["✅ Paiement quotidien", "🕐 Horaires libres", "🏍️ Votre véhicule"].map((t) => (
                <span key={t} style={{ background: "rgba(255,255,255,.1)", color: "rgba(255,255,255,.8)", padding: "3px 9px", borderRadius: 50, fontSize: ".67rem" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <button
            style={{
              background: "var(--yellow)",
              color: "#0d1f14",
              border: "none",
              padding: "12px 22px",
              borderRadius: 10,
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: ".85rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
            onClick={() => {
              setAuthTab("register");
              setSelectedRole("delivery");
              setAuthOpen(true);
            }}
          >
            🚀 S'inscrire comme livreur
          </button>
        </div>
      </section>
    </div>
  );
}
