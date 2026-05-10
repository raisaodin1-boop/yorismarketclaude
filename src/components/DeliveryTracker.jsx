import { useState, useEffect } from "react";
import { supabase, YORIX_WA_NUMBER } from "../lib/supabase";

// ─────────────────────────────────────────────────────────────
// COMPOSANT : DELIVERY TRACKER (suivi livraison temps réel)
// ─────────────────────────────────────────────────────────────
export function DeliveryTracker() {
  const [codeSuivi, setCodeSuivi] = useState("");
  const [delivery, setDelivery]   = useState(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [elapsed, setElapsed]     = useState(0);

  const STEPS = [
    { id: "commande_recue", label: "Commande reçue", icon: "📝", description: "Votre commande a été enregistrée" },
    { id: "preparation",    label: "Préparation",    icon: "📦", description: "Le vendeur prépare votre colis" },
    { id: "collecte",       label: "Colis collecté", icon: "🏪", description: "Le livreur a récupéré le colis" },
    { id: "en_route",       label: "En route",       icon: "🏍️", description: "Le livreur se dirige vers vous" },
    { id: "livre",          label: "Livré",          icon: "✅", description: "Colis remis avec succès" },
  ];

  const chercherLivraison = async (code) => {
    const searchCode = (code || codeSuivi).trim().toUpperCase();
    if (!searchCode) { setError("Entre un code de suivi"); return; }
    setLoading(true); setError("");
    try {
      const { data, error: err } = await supabase
        .from("deliveries")
        .select("*")
        .eq("code_suivi", searchCode)
        .maybeSingle();
      if (err) throw err;
      if (!data) {
        setError(`Aucune livraison trouvée pour le code "${searchCode}". Essaie avec YX-DEMO123`);
        setDelivery(null);
      } else {
        setDelivery(data);
      }
    } catch (err) {
      setError("Erreur : " + err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeFromUrl = params.get("code");
    if (codeFromUrl) {
      setCodeSuivi(codeFromUrl.toUpperCase());
      setTimeout(() => chercherLivraison(codeFromUrl), 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!delivery?.id) return;
    const channel = supabase
      .channel(`delivery-${delivery.id}`)
      .on("postgres_changes", {
        event: "UPDATE", schema: "public", table: "deliveries",
        filter: `id=eq.${delivery.id}`,
      }, payload => { setDelivery(payload.new); })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [delivery?.id]);

  useEffect(() => {
    if (!delivery?.en_route_at || delivery.statut === "livre") return;
    const interval = setInterval(() => {
      const start = new Date(delivery.en_route_at).getTime();
      setElapsed(Math.floor((Date.now() - start) / 60000));
    }, 30000);
    const start = new Date(delivery.en_route_at).getTime();
    setElapsed(Math.floor((Date.now() - start) / 60000));
    return () => clearInterval(interval);
  }, [delivery?.en_route_at, delivery?.statut]);

  const currentStepIdx = STEPS.findIndex(s => s.id === delivery?.statut);
  const progressPct = delivery ? ((currentStepIdx + 1) / STEPS.length) * 100 : 0;
  const tempsRestant = delivery?.temps_estime_min
    ? Math.max(0, delivery.temps_estime_min - elapsed)
    : 0;

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ background: "var(--surface)", border: "2px solid var(--green)", borderRadius: 14, padding: 20, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: "1.5rem" }}>📍</span>
          <div>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.05rem", color: "var(--ink)", margin: 0, letterSpacing: "-.3px" }}>
              Suivre ma livraison en temps réel
            </h3>
            <p style={{ fontSize: ".76rem", color: "var(--gray)", margin: "2px 0 0" }}>
              Entre ton code de suivi (ex: YX-DEMO123) pour voir où en est ton colis
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input
            placeholder="Code de suivi (ex: YX-DEMO123)"
            value={codeSuivi}
            onChange={e => setCodeSuivi(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === "Enter" && chercherLivraison()}
            style={{
              flex: "1 1 240px", minWidth: 200,
              padding: "11px 14px", borderRadius: 9,
              border: "1.5px solid var(--border)",
              background: "var(--surface2)", color: "var(--ink)",
              fontFamily: "'DM Sans',sans-serif", fontSize: ".88rem",
              outline: "none", letterSpacing: ".05em",
              textTransform: "uppercase", fontWeight: 600,
            }}
          />
          <button
            onClick={() => chercherLivraison()}
            disabled={loading}
            style={{
              background: "var(--green)", color: "#fff", border: "none",
              padding: "11px 24px", borderRadius: 9,
              fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".85rem",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "⏳ Recherche..." : "🔍 Suivre"}
          </button>
          <button
            onClick={() => chercherLivraison("YX-DEMO123")}
            style={{
              background: "var(--yellow)", color: "#0d1f14", border: "none",
              padding: "11px 18px", borderRadius: 9,
              fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: ".78rem",
              cursor: "pointer",
            }}
          >
            🎯 Essayer démo
          </button>
        </div>
        {error && (
          <div style={{
            marginTop: 10, background: "#fff0f0", border: "1px solid #fecaca",
            color: "#ce1126", padding: "9px 13px", borderRadius: 8,
            fontSize: ".8rem",
          }}>
            ⚠️ {error}
          </div>
        )}
      </div>

      {delivery && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
          <div style={{
            background: delivery.statut === "livre"
              ? "linear-gradient(135deg, #16a34a, #15803d)"
              : "linear-gradient(135deg, #1a3a24, var(--green))",
            padding: "20px 22px", color: "#fff",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, background: "rgba(252,209,22,.12)", borderRadius: "50%" }}/>
            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
                <div>
                  <div style={{ fontSize: ".72rem", opacity: .8, marginBottom: 3 }}>CODE DE SUIVI</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.3rem", fontWeight: 800, letterSpacing: ".05em" }}>
                    {delivery.code_suivi}
                  </div>
                </div>
                {delivery.statut === "livre" ? (
                  <span style={{ background: "rgba(255,255,255,.2)", padding: "6px 14px", borderRadius: 50, fontSize: ".78rem", fontWeight: 700, backdropFilter: "blur(10px)" }}>
                    ✅ LIVRÉ
                  </span>
                ) : (
                  <div style={{ background: "var(--yellow)", color: "#0d1f14", padding: "8px 16px", borderRadius: 10, fontFamily: "'Syne',sans-serif", fontWeight: 800, textAlign: "center", minWidth: 120 }}>
                    <div style={{ fontSize: ".65rem", opacity: .8 }}>ARRIVÉE DANS</div>
                    <div style={{ fontSize: "1.15rem" }}>⏱ ~{tempsRestant} min</div>
                  </div>
                )}
              </div>
              <div style={{ background: "rgba(255,255,255,.15)", borderRadius: 50, height: 8, marginTop: 18, overflow: "hidden" }}>
                <div style={{
                  background: "linear-gradient(90deg, var(--yellow), #ffd84a)",
                  height: "100%", width: `${progressPct}%`,
                  borderRadius: 50, transition: "width .6s ease",
                  boxShadow: "0 0 12px rgba(252,209,22,.5)",
                }}/>
              </div>
              <div style={{ fontSize: ".7rem", opacity: .75, marginTop: 6 }}>
                {Math.round(progressPct)}% du trajet effectué
              </div>
            </div>
          </div>

          {delivery.statut !== "livre" && (
            <div style={{ background: "linear-gradient(180deg, #e0f2fe 0%, #f0fdf4 100%)", padding: "24px 20px", position: "relative", minHeight: 160, overflow: "hidden" }}>
              <svg viewBox="0 0 600 120" style={{ width: "100%", height: 120 }} xmlns="http://www.w3.org/2000/svg">
                <path d="M 30 90 Q 150 20, 300 60 T 570 40" stroke="#94a3b8" strokeWidth="4" strokeDasharray="8 6" fill="none" opacity="0.4"/>
                <path d={`M 30 90 Q 150 20, 300 60 T 570 40`} stroke="var(--green)" strokeWidth="5" fill="none" strokeDasharray={`${progressPct * 6} 1000`} style={{ transition: "stroke-dasharray 1s ease" }}/>
                <circle cx="30" cy="90" r="10" fill="#ef4444"/>
                <text x="30" y="115" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="600">Vendeur</text>
                <circle cx="570" cy="40" r="10" fill="#22c55e"/>
                <text x="570" y="22" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="600">Vous</text>
                <g style={{
                  transform: `translate(${30 + (progressPct / 100) * 540}px, ${90 - (progressPct / 100) * 50}px)`,
                  transition: "transform 1s ease",
                }}>
                  <circle cx="0" cy="0" r="18" fill="#fff" stroke="var(--green)" strokeWidth="3"/>
                  <text x="0" y="5" textAnchor="middle" fontSize="18">🏍️</text>
                  <circle cx="0" cy="0" r="18" fill="none" stroke="var(--green)" strokeWidth="2" opacity="0.6">
                    <animate attributeName="r" from="18" to="30" dur="1.5s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite"/>
                  </circle>
                </g>
              </svg>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".72rem", color: "#475569", fontWeight: 600, marginTop: 8 }}>
                <span>📦 {delivery.adresse_collecte || "Collecte"}</span>
                <span>🏠 {delivery.adresse_livraison || "Livraison"}</span>
              </div>
            </div>
          )}

          <div style={{ padding: "20px 22px" }}>
            <h4 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".88rem", color: "var(--ink)", marginBottom: 14 }}>
              📋 Progression de la livraison
            </h4>
            <div style={{ position: "relative" }}>
              {STEPS.map((step, idx) => {
                const isDone = idx < currentStepIdx;
                const isCurrent = idx === currentStepIdx;
                const isLast = idx === STEPS.length - 1;
                const tsField = step.id === "commande_recue" ? "commande" : step.id === "livre" ? "livre" : step.id;
                const timestamp = delivery[`${tsField}_at`];

                return (
                  <div key={step.id} style={{ display: "flex", gap: 14, marginBottom: isLast ? 0 : 14, position: "relative" }}>
                    {!isLast && (
                      <div style={{
                        position: "absolute", left: 17, top: 36,
                        width: 2, height: "calc(100% + 14px)",
                        background: isDone ? "var(--green)" : "var(--border)",
                        zIndex: 0,
                      }}/>
                    )}
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: isDone || isCurrent ? "var(--green)" : "var(--surface2)",
                      border: `2px solid ${isDone || isCurrent ? "var(--green)" : "var(--border)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1rem", flexShrink: 0, zIndex: 1,
                      boxShadow: isCurrent ? "0 0 0 4px rgba(26,107,58,.2)" : "none",
                      animation: isCurrent ? "pulse 2s infinite" : "none",
                    }}>
                      {isDone ? "✓" : step.icon}
                    </div>
                    <div style={{ flex: 1, paddingTop: 4 }}>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".88rem", color: isDone || isCurrent ? "var(--ink)" : "var(--gray)" }}>
                        {step.label}
                        {isCurrent && (
                          <span style={{ marginLeft: 8, background: "var(--green)", color: "#fff", padding: "2px 8px", borderRadius: 50, fontSize: ".6rem", fontWeight: 800, fontFamily: "'DM Sans',sans-serif" }}>
                            EN COURS
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: ".72rem", color: "var(--gray)", marginTop: 2 }}>{step.description}</div>
                      {timestamp && (isDone || isCurrent) && (
                        <div style={{ fontSize: ".68rem", color: "var(--green)", fontWeight: 600, marginTop: 3 }}>
                          🕐 {new Date(timestamp).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <style>{`
              @keyframes pulse {
                0%, 100% { box-shadow: 0 0 0 4px rgba(26,107,58,.2); }
                50% { box-shadow: 0 0 0 8px rgba(26,107,58,.1); }
              }
            `}</style>
          </div>

          {delivery.livreur_nom && (
            <div style={{ background: "var(--surface2)", margin: "0 22px 20px", borderRadius: 12, padding: 14, display: "flex", alignItems: "center", gap: 12, border: "1px solid var(--border)" }}>
              <div style={{ width: 54, height: 54, borderRadius: "50%", background: "var(--green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", flexShrink: 0, boxShadow: "0 4px 12px rgba(26,107,58,.25)" }}>
                🏍️
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".92rem", color: "var(--ink)" }}>
                  {delivery.livreur_nom}
                </div>
                <div style={{ display: "flex", gap: 10, fontSize: ".7rem", color: "var(--gray)", marginTop: 3, flexWrap: "wrap" }}>
                  <span>⭐ {delivery.livreur_note || 4.8}</span>
                  <span>🏍️ {delivery.livreur_vehicule || "Moto"}</span>
                  <span>📏 {delivery.distance_km || 3.5} km</span>
                </div>
              </div>
              {delivery.livreur_tel && (
                <button
                  onClick={() => {
                    const phoneClean = (delivery.livreur_tel || "").replace(/\D/g, "");
                    const waMsg = "Bonjour " + delivery.livreur_nom + " ! C'est pour la commande " + delivery.code_suivi + ".";
                    const waLink = "https://wa.me/" + phoneClean + "?text=" + encodeURIComponent(waMsg);
                    window.open(waLink, "_blank");
                  }}
                  style={{
                    background: "#25D366", color: "#fff", border: "none",
                    padding: "10px 16px", borderRadius: 9,
                    cursor: "pointer", fontSize: ".76rem",
                    fontFamily: "'Syne',sans-serif", fontWeight: 700,
                    display: "flex", alignItems: "center", gap: 5,
                    whiteSpace: "nowrap",
                  }}
                >
                  💬 Appeler
                </button>
              )}
            </div>
          )}

          <div style={{ padding: "14px 22px 20px", borderTop: "1px solid var(--border)", display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              onClick={() => {
                const msg = "Bonjour Yorix ! J'ai une question sur ma livraison " + delivery.code_suivi;
                const url = "https://wa.me/" + YORIX_WA_NUMBER + "?text=" + encodeURIComponent(msg);
                window.open(url, "_blank");
              }}
              style={{
                flex: 1, background: "var(--surface2)", color: "var(--ink)",
                border: "1.5px solid var(--border)", padding: "10px",
                borderRadius: 9, cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".8rem",
              }}
            >
              🆘 Signaler un problème
            </button>
            <button
              onClick={() => chercherLivraison()}
              style={{
                flex: 1, background: "var(--green)", color: "#fff",
                border: "none", padding: "10px",
                borderRadius: 9, cursor: "pointer",
                fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".8rem",
              }}
            >
              🔄 Actualiser
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
