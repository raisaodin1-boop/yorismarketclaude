import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { LevelBadge } from "./LevelBadge";
import { LoyaltyPackModal } from "./LoyaltyPackModal";
import { LoyaltyRedeemModal } from "./LoyaltyRedeemModal";

// ─────────────────────────────────────────────────────────────
// PAGE PRINCIPALE : LOYALTY (fidélité, points, récompenses)
// ─────────────────────────────────────────────────────────────
export function LoyaltyPage({ user, userData, goPage, setAuthOpen, setAuthTab }) {
  const [packs, setPacks]                 = useState([]);
  const [rewards, setRewards]             = useState([]);
  const [transactions, setTransactions]   = useState([]);
  const [redemptions, setRedemptions]     = useState([]);
  const [loading, setLoading]             = useState(true);
  const [selectedPack, setSelectedPack]   = useState(null);
  const [selectedReward, setSelectedReward] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [totalGagnes, setTotalGagnes]     = useState(0);
  const [currentLevel, setCurrentLevel]   = useState("bronze");
  const [tab, setTab]                     = useState("rewards");

  const loadAll = async () => {
    setLoading(true);

    const queries = [
      supabase.from("loyalty_packs").select("*").eq("actif", true).order("ordre"),
      supabase.from("loyalty_rewards").select("*").eq("actif", true).order("ordre"),
    ];

    if (user?.id) {
      queries.push(
        supabase.from("loyalty_transactions").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(30),
        supabase.from("loyalty_redemptions").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(10),
        supabase.from("profiles").select("points,points_total_gagnes,points_level").eq("id", user.id).single()
      );
    }

    const results = await Promise.all(queries);
    setPacks(results[0]?.data || []);
    setRewards(results[1]?.data || []);

    if (user?.id) {
      setTransactions(results[2]?.data || []);
      setRedemptions(results[3]?.data || []);
      const profile = results[4]?.data;
      if (profile) {
        setCurrentPoints(profile.points || 0);
        setTotalGagnes(profile.points_total_gagnes || 0);
        setCurrentLevel(profile.points_level || "bronze");
      }
    }

    setLoading(false);
  };

  useEffect(() => { loadAll(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [user?.id]);

  const levelThresholds = { bronze: 500, argent: 1000, or: 5000, platine: 5000 };
  const nextThreshold   = levelThresholds[currentLevel] || 500;
  const prevThreshold   = { bronze: 0, argent: 500, or: 1000, platine: 5000 }[currentLevel];
  const progressPct     = currentLevel === "platine"
    ? 100
    : Math.min(100, Math.round(((totalGagnes - prevThreshold) / (nextThreshold - prevThreshold)) * 100));
  const pointsToNext    = Math.max(0, nextThreshold - totalGagnes);

  const typeLabels = {
    achat:             { label: "Achat",               emoji: "🛍️", color: "var(--green)" },
    vente:             { label: "Vente",               emoji: "💰", color: "var(--green)" },
    avis:              { label: "Avis publié",         emoji: "⭐", color: "#f59e0b" },
    achat_points:      { label: "Pack acheté",         emoji: "💎", color: "#7c3aed" },
    echange:           { label: "Récompense échangée", emoji: "🎁", color: "#ce1126" },
    bonus_inscription: { label: "Bonus bienvenue",     emoji: "🎉", color: "var(--green)" },
    parrainage:        { label: "Parrainage",          emoji: "👥", color: "#2563eb" },
  };

  if (!user) {
    return (
      <section className="sec anim">
        <div style={{
          background: "linear-gradient(135deg,#1a3a24,var(--green))",
          borderRadius: 16, padding: "40px 28px", textAlign: "center", color: "#fff",
        }}>
          <div style={{ fontSize: "4rem", marginBottom: 14 }}>🌟</div>
          <h2 style={{
            fontFamily: "'Syne',sans-serif", fontSize: "1.6rem", fontWeight: 800,
            marginBottom: 8, letterSpacing: "-.5px",
          }}>
            Yorix Points — Programme de fidélité
          </h2>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: ".9rem", marginBottom: 20, maxWidth: 460, margin: "0 auto 20px" }}>
            Gagnez des points à chaque achat, vente ou avis posté. Échangez-les contre des bons d'achat, des livraisons gratuites et bien plus !
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              className="cta-y"
              onClick={() => { setAuthTab?.("register"); setAuthOpen?.(true); }}
            >
              🎁 Créer mon compte (+50 pts offerts)
            </button>
            <button
              className="cta-w"
              onClick={() => { setAuthTab?.("login"); setAuthOpen?.(true); }}
            >
              🔑 Me connecter
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {selectedPack && (
        <LoyaltyPackModal
          pack={selectedPack}
          user={user}
          userData={userData}
          onClose={() => setSelectedPack(null)}
          onSuccess={loadAll}
        />
      )}
      {selectedReward && (
        <LoyaltyRedeemModal
          reward={selectedReward}
          userPoints={currentPoints}
          user={user}
          onClose={() => setSelectedReward(null)}
          onSuccess={loadAll}
        />
      )}

      <section className="sec anim">
        <div style={{
          background: "linear-gradient(135deg, #1a3a24 0%, var(--green) 60%, #2d9655 100%)",
          borderRadius: 16, padding: "26px 24px", color: "#fff",
          marginBottom: 18, position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -30, right: -30, width: 180, height: 180, background: "rgba(252,209,22,.08)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", bottom: -50, left: -40, width: 160, height: 160, background: "rgba(255,255,255,.05)", borderRadius: "50%" }} />

          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
              <div>
                <div style={{ fontSize: ".72rem", opacity: .7, fontWeight: 600, marginBottom: 3 }}>YORIX POINTS</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: ".92rem", fontWeight: 600, opacity: .88 }}>
                  Mes points
                </div>
              </div>
              <LevelBadge level={currentLevel} size="lg" />
            </div>

            <div style={{
              fontFamily: "'Syne',sans-serif", fontSize: "2.8rem", fontWeight: 800,
              color: "var(--yellow)", lineHeight: 1, marginBottom: 4,
            }}>
              {currentPoints.toLocaleString("fr-FR")}{" "}
              <span style={{ fontSize: "1rem", color: "rgba(255,255,255,.6)" }}>pts</span>
            </div>

            <div style={{ fontSize: ".72rem", opacity: .65, marginBottom: 14 }}>
              Total gagné : {totalGagnes.toLocaleString("fr-FR")} pts · Niveau {currentLevel}
              {currentLevel !== "platine" &&
                ` · ${pointsToNext.toLocaleString("fr-FR")} pts pour ${
                  currentLevel === "bronze" ? "Argent"
                  : currentLevel === "argent" ? "Or"
                  : "Platine"
                }`}
            </div>

            {currentLevel !== "platine" && (
              <div style={{ background: "rgba(255,255,255,.15)", borderRadius: 50, height: 8, overflow: "hidden" }}>
                <div style={{
                  background: "linear-gradient(90deg, var(--yellow), #ffd84a)",
                  borderRadius: 50, height: "100%", width: `${progressPct}%`,
                  transition: "width .8s ease",
                }} />
              </div>
            )}

            <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
              <button
                onClick={() => setTab("packs")}
                style={{
                  background: "var(--yellow)", color: "#0d1f14", border: "none",
                  padding: "9px 18px", borderRadius: 9,
                  fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".8rem",
                  cursor: "pointer", flex: "1 1 auto",
                }}
              >
                💎 Acheter des points
              </button>
              <button
                onClick={() => setTab("rewards")}
                style={{
                  background: "rgba(255,255,255,.15)", color: "#fff",
                  border: "1px solid rgba(255,255,255,.25)",
                  padding: "9px 18px", borderRadius: 9,
                  fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".8rem",
                  cursor: "pointer", flex: "1 1 auto",
                }}
              >
                🎁 Échanger
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 18 }}>
          {[
            { icon: "🛍️", val: transactions.filter(t => t.type === "achat").length, lbl: "Achats" },
            { icon: "💰", val: transactions.filter(t => t.type === "vente").length, lbl: "Ventes" },
            { icon: "⭐", val: transactions.filter(t => t.type === "avis").length,  lbl: "Avis" },
            { icon: "🎁", val: redemptions.length,                                   lbl: "Échanges" },
          ].map(s => (
            <div key={s.lbl} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 10, padding: "12px 10px", textAlign: "center",
            }}>
              <div style={{ fontSize: "1.3rem", marginBottom: 2 }}>{s.icon}</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "var(--ink)" }}>
                {s.val}
              </div>
              <div style={{ fontSize: ".65rem", color: "var(--gray)" }}>{s.lbl}</div>
            </div>
          ))}
        </div>

        <div style={{
          background: "var(--green-pale)", border: "1px solid var(--green-light)",
          borderRadius: 12, padding: 16, marginBottom: 18,
        }}>
          <div style={{
            fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".88rem",
            color: "var(--green)", marginBottom: 10,
          }}>
            💡 Comment gagner des points ?
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            {[
              { emoji: "🛍️", t: "Chaque achat", d: "1 point / 500 FCFA dépensés" },
              { emoji: "💰", t: "Chaque vente", d: "1 point / 500 FCFA vendus" },
              { emoji: "⭐", t: "Avis clients", d: "2 à 10 pts selon la note" },
            ].map(w => (
              <div key={w.t} style={{
                background: "var(--surface)", borderRadius: 9, padding: 12, textAlign: "center",
              }}>
                <div style={{ fontSize: "1.8rem", marginBottom: 5 }}>{w.emoji}</div>
                <div style={{
                  fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".78rem",
                  color: "var(--ink)", marginBottom: 3,
                }}>
                  {w.t}
                </div>
                <div style={{ fontSize: ".7rem", color: "var(--gray)" }}>{w.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          display: "flex", gap: 6, marginBottom: 16,
          borderBottom: "1px solid var(--border)", overflowX: "auto",
        }}>
          {[
            { id: "rewards", label: "🎁 Récompenses", count: rewards.length },
            { id: "packs",   label: "💎 Acheter pts", count: packs.length },
            { id: "history", label: "📜 Historique",  count: transactions.length },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "10px 14px",
                fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".82rem",
                color: tab === t.id ? "var(--green)" : "var(--gray)",
                borderBottom: tab === t.id ? "3px solid var(--green)" : "3px solid transparent",
                whiteSpace: "nowrap",
              }}
            >
              {t.label} {t.count > 0 && <span style={{ opacity: .6, fontSize: ".72rem" }}>({t.count})</span>}
            </button>
          ))}
        </div>

        {tab === "rewards" &&
          (loading ? (
            <div className="loading"><div className="spinner" />Chargement...</div>
          ) : rewards.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">🎁</div><p>Aucune récompense disponible</p></div>
          ) : (
            <div className="rewards-grid">
              {rewards.map(r => {
                const canAfford = currentPoints >= r.cout_points;
                return (
                  <div
                    key={r.id}
                    className="reward-card"
                    style={{ opacity: canAfford ? 1 : 0.72, position: "relative", overflow: "hidden" }}
                  >
                    {r.valeur_fcfa && (
                      <span style={{
                        position: "absolute", top: 8, right: 8,
                        background: "var(--green)", color: "#fff",
                        fontSize: ".58rem", fontWeight: 700,
                        padding: "2px 7px", borderRadius: 4,
                      }}>
                        {r.valeur_fcfa.toLocaleString("fr-FR")} F
                      </span>
                    )}
                    <div className="reward-icon" style={{ background: r.color_bg }}>{r.emoji}</div>
                    <div className="reward-name">{r.nom}</div>
                    {r.description && (
                      <div style={{ fontSize: ".68rem", color: "var(--gray)", marginBottom: 6, textAlign: "center", lineHeight: 1.4 }}>
                        {r.description}
                      </div>
                    )}
                    <div className="reward-pts" style={{ color: canAfford ? "var(--green)" : "var(--gray)" }}>
                      {r.cout_points.toLocaleString("fr-FR")} pts
                    </div>
                    <button
                      className="reward-btn"
                      onClick={() => setSelectedReward(r)}
                      style={{
                        background: canAfford ? "var(--green)" : "var(--surface2)",
                        color: canAfford ? "#fff" : "var(--gray)",
                        border: canAfford ? "none" : "1px solid var(--border)",
                      }}
                    >
                      {canAfford
                        ? "Échanger"
                        : `Il manque ${(r.cout_points - currentPoints).toLocaleString("fr-FR")} pts`}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}

        {tab === "packs" &&
          (loading ? (
            <div className="loading"><div className="spinner" />Chargement...</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
              {packs.map(p => {
                const bonus = p.bonus_pct ? Math.round(p.points * p.bonus_pct / 100) : 0;
                const total = p.points + bonus;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPack(p)}
                    style={{
                      background: "var(--surface)",
                      border: `2px solid ${p.badge === "meilleur_deal" ? "var(--yellow)" : p.badge === "populaire" ? "var(--green)" : "var(--border)"}`,
                      borderRadius: 12, padding: 14, cursor: "pointer",
                      position: "relative", transition: "transform .15s,box-shadow .15s",
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,.08)";
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {p.badge && (
                      <span style={{
                        position: "absolute", top: -9, left: "50%", transform: "translateX(-50%)",
                        background: p.badge === "meilleur_deal" ? "var(--yellow)" : p.badge === "populaire" ? "var(--green)" : "#7c3aed",
                        color: p.badge === "meilleur_deal" ? "#0d1f14" : "#fff",
                        fontSize: ".6rem", fontWeight: 800, padding: "3px 10px", borderRadius: 50,
                        textTransform: "uppercase", letterSpacing: ".05em",
                        fontFamily: "'Syne',sans-serif",
                      }}>
                        {p.badge === "meilleur_deal" ? "🔥 Meilleur deal" : p.badge === "populaire" ? "⭐ Populaire" : "🆕 Nouveau"}
                      </span>
                    )}

                    <div style={{
                      fontSize: "2.5rem", textAlign: "center", marginBottom: 6,
                      background: p.color_bg, borderRadius: "50%",
                      width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "4px auto 8px",
                    }}>
                      {p.emoji}
                    </div>

                    <div style={{
                      fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".88rem",
                      color: "var(--ink)", textAlign: "center", marginBottom: 4,
                    }}>
                      Pack {p.nom}
                    </div>

                    <div style={{
                      fontFamily: "'Syne',sans-serif", fontSize: "1.5rem", fontWeight: 800,
                      color: "var(--green)", textAlign: "center",
                    }}>
                      {total.toLocaleString("fr-FR")} pts
                    </div>

                    {bonus > 0 && (
                      <div style={{
                        textAlign: "center", fontSize: ".68rem", color: "#f59e0b",
                        fontWeight: 700, marginBottom: 4,
                      }}>
                        +{bonus} pts bonus (+{p.bonus_pct}%)
                      </div>
                    )}

                    <div style={{
                      textAlign: "center", fontSize: ".88rem", fontWeight: 700,
                      color: "var(--ink)", marginTop: 4,
                    }}>
                      {p.prix_fcfa.toLocaleString("fr-FR")} FCFA
                    </div>

                    <div style={{
                      textAlign: "center", fontSize: ".6rem", color: "var(--gray)", marginTop: 2,
                    }}>
                      {(p.prix_fcfa / total).toFixed(1)} FCFA / pt
                    </div>

                    <button style={{
                      width: "100%", marginTop: 10,
                      background: "var(--green)", color: "#fff", border: "none",
                      padding: "8px", borderRadius: 8, cursor: "pointer",
                      fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".75rem",
                    }}>
                      💳 Acheter
                    </button>
                  </div>
                );
              })}
            </div>
          ))}

        {tab === "history" &&
          (loading ? (
            <div className="loading"><div className="spinner" />Chargement...</div>
          ) : transactions.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📜</div>
              <p>Aucune transaction pour l'instant.</p>
              <p style={{ fontSize: ".78rem", marginTop: 8 }}>
                Passez une commande ou postez un avis pour gagner vos premiers points !
              </p>
            </div>
          ) : (
            <div style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 12, overflow: "hidden",
            }}>
              {transactions.map((t, i) => {
                const info = typeLabels[t.type] || { label: t.type, emoji: "💫", color: "var(--gray)" };
                const isGain = t.points > 0;
                return (
                  <div
                    key={t.id}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "12px 14px",
                      borderBottom: i < transactions.length - 1 ? "1px solid var(--border)" : "none",
                    }}
                  >
                    <div style={{
                      width: 38, height: 38, borderRadius: "50%",
                      background: "var(--surface2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.1rem", flexShrink: 0,
                    }}>
                      {info.emoji}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".82rem",
                        color: "var(--ink)",
                      }}>
                        {info.label}
                      </div>
                      <div style={{ fontSize: ".68rem", color: "var(--gray)", marginTop: 2 }}>
                        {t.description || "—"}
                        {t.montant_fcfa && ` · ${t.montant_fcfa.toLocaleString("fr-FR")} FCFA`}
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{
                        fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".92rem",
                        color: isGain ? "var(--green)" : "#ce1126",
                      }}>
                        {isGain ? "+" : ""}{t.points.toLocaleString("fr-FR")}
                      </div>
                      <div style={{ fontSize: ".6rem", color: "var(--gray)" }}>
                        {new Date(t.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

        {tab === "rewards" && redemptions.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <div style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".95rem",
              color: "var(--ink)", marginBottom: 12,
            }}>
              🎫 Mes codes récompenses
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 10 }}>
              {redemptions.map(r => (
                <div key={r.id} style={{
                  background: "var(--surface)", border: "2px dashed var(--green-light)",
                  borderRadius: 10, padding: 12,
                }}>
                  <div style={{ fontSize: ".72rem", color: "var(--gray)", marginBottom: 3 }}>
                    {r.reward_nom}
                  </div>
                  <div style={{
                    fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".95rem",
                    color: "var(--green)", letterSpacing: "0.03em",
                  }}>
                    {r.code}
                  </div>
                  <div style={{
                    display: "flex", justifyContent: "space-between", marginTop: 6,
                    fontSize: ".64rem", color: "var(--gray)",
                  }}>
                    <span>Status : {r.status}</span>
                    <span>
                      {r.expire_at ? `Expire ${new Date(r.expire_at).toLocaleDateString("fr-FR")}` : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
