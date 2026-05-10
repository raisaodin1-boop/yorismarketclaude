import { useState, useEffect } from "react";
import { MarketingBreadcrumb } from "./layout/MarketingBreadcrumb";
import { supabase } from "../lib/supabase";
import { LevelBadge } from "./LevelBadge";
import { LoyaltyPackModal } from "./LoyaltyPackModal";
import { LoyaltyRedeemModal } from "./LoyaltyRedeemModal";

// ─────────────────────────────────────────────────────────────
// PAGE PRINCIPALE : LOYALTY (fidélité, points, récompenses)
// ─────────────────────────────────────────────────────────────

const LEVEL_LABEL_FR = {
  bronze: "Bronze",
  argent: "Argent",
  or: "Or",
  platine: "Platine",
};

function packCardAccentClass(badge) {
  if (badge === "meilleur_deal") return "loy-pack-card--deal";
  if (badge === "populaire") return "loy-pack-card--pop";
  if (badge) return "loy-pack-card--new";
  return "";
}

function packBadgeClass(badge) {
  if (badge === "meilleur_deal") return "loy-pack-badge--deal";
  if (badge === "populaire") return "loy-pack-badge--pop";
  return "loy-pack-badge--new";
}

function packBadgeLabel(badge) {
  if (badge === "meilleur_deal") return "🔥 Meilleur deal";
  if (badge === "populaire") return "⭐ Populaire";
  if (badge) return "🆕 Nouveau";
  return "";
}

export function LoyaltyPage({ user, userData, goPage, setAuthOpen, setAuthTab }) {
  const [packs, setPacks]                   = useState([]);
  const [rewards, setRewards]               = useState([]);
  const [transactions, setTransactions]     = useState([]);
  const [redemptions, setRedemptions]       = useState([]);
  const [loading, setLoading]               = useState(true);
  const [selectedPack, setSelectedPack]     = useState(null);
  const [selectedReward, setSelectedReward] = useState(null);
  const [currentPoints, setCurrentPoints]   = useState(0);
  const [totalGagnes, setTotalGagnes]       = useState(0);
  const [currentLevel, setCurrentLevel]     = useState("bronze");
  const [tab, setTab]                       = useState("rewards");

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

  const levelFr = LEVEL_LABEL_FR[currentLevel] || currentLevel;
  const nextLevelFr = currentLevel === "bronze" ? "Argent" : currentLevel === "argent" ? "Or" : currentLevel !== "platine" ? "Platine" : "";

  if (!user) {
    return (
      <section className="sec anim yorix-pro-page loy-page">
        <div className="yorix-bc-row">
          <MarketingBreadcrumb items={[{ label: "Accueil", onClick: () => goPage("home") }, { label: "Fidélité Yorix Points" }]} />
        </div>
        <div className="yorix-loy-panel-guest">
          <div className="yorix-loy-ico-big" aria-hidden>
            🌟
          </div>
          <h2 className="yorix-loy-h2">Yorix Points</h2>
          <p className="yorix-loy-p">
            Programme de fidélité marketplace : cumulez des points à chaque achat, vente ou avis, puis convertissez-les en réductions et avantages.
          </p>
          <div className="yorix-loy-guest-perks">
            <span className="yorix-loy-guest-perk">Cashback en points</span>
            <span className="yorix-loy-guest-perk">Niveaux VIP</span>
            <span className="yorix-loy-guest-perk">Codes promo exclusifs</span>
          </div>
          <div className="yorix-loy-cta-row">
            <button type="button" className="cta-y" onClick={() => { setAuthTab?.("register"); setAuthOpen?.(true); }}>
              Créer un compte — +50 pts
            </button>
            <button type="button" className="cta-w" onClick={() => { setAuthTab?.("login"); setAuthOpen?.(true); }}>
              J&apos;ai déjà un compte
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

      <section className="sec anim yorix-pro-page loy-page">
        <div className="yorix-bc-row">
          <MarketingBreadcrumb items={[{ label: "Accueil", onClick: () => goPage("home") }, { label: "Programme fidélité" }]} />
        </div>

        <div className="yorix-loy-dash-wrap">
          <div className="yorix-loy-dash-deco" aria-hidden />
          <div className="yorix-loy-dash-deco yorix-loy-dash-deco--b" aria-hidden />

          <div className="yorix-loy-inner">
            <div className="yorix-loy-kpi-head">
              <div>
                <div className="yorix-loy-kpi-label">Programme</div>
                <div className="yorix-loy-kpi-sub">Mes Yorix Points</div>
              </div>
              <LevelBadge level={currentLevel} size="lg" />
            </div>

            <div className="yorix-loy-big-pts">
              {currentPoints.toLocaleString("fr-FR")}
              <span className="yorix-loy-pts-suffix"> pts</span>
            </div>

            <div className="yorix-loy-meta">
              Total cumulé : <strong>{totalGagnes.toLocaleString("fr-FR")} pts</strong> · Niveau <strong>{levelFr}</strong>
              {currentLevel !== "platine" && (
                <>
                  {" "}
                  · Encore{" "}
                  <strong>{pointsToNext.toLocaleString("fr-FR")} pts</strong> pour {nextLevelFr}
                </>
              )}
            </div>

            {currentLevel !== "platine" && (
              <div className="yorix-loy-progress" role="progressbar" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100}>
                <div className="yorix-loy-progress-bar" style={{ width: `${progressPct}%` }} />
              </div>
            )}

            <div className="yorix-loy-actions">
              <button type="button" className="yorix-loy-btn-pri" onClick={() => setTab("packs")}>
                Acheter des points
              </button>
              <button type="button" className="yorix-loy-btn-sec" onClick={() => setTab("rewards")}>
                Échanger mes points
              </button>
            </div>
          </div>
        </div>

        <div className="loy-stats-grid">
          {[
            { icon: "🛍️", val: transactions.filter((t) => t.type === "achat").length, lbl: "Achats" },
            { icon: "💰", val: transactions.filter((t) => t.type === "vente").length, lbl: "Ventes" },
            { icon: "⭐", val: transactions.filter((t) => t.type === "avis").length, lbl: "Avis" },
            { icon: "🎁", val: redemptions.length, lbl: "Échanges" },
          ].map((s) => (
            <div key={s.lbl} className="loy-stat-card">
              <div className="loy-stat-ico" aria-hidden>{s.icon}</div>
              <div className="loy-stat-val">{s.val}</div>
              <div className="loy-stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>

        <div className="loy-howto">
          <div className="loy-howto-title">Comment gagner des points ?</div>
          <div className="loy-howto-grid">
            {[
              { emoji: "🛍️", t: "Chaque achat", d: "1 point pour 500 FCFA dépensés sur le catalogue." },
              { emoji: "💰", t: "Chaque vente", d: "1 point pour 500 FCFA vendus côté vendeur." },
              { emoji: "⭐", t: "Avis clients", d: "Bonus selon votre note pour aider la communauté." },
            ].map((w) => (
              <div key={w.t} className="loy-howto-card">
                <div className="loy-howto-emoji" aria-hidden>{w.emoji}</div>
                <div className="loy-howto-h">{w.t}</div>
                <div className="loy-howto-d">{w.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="loy-tabs" role="tablist" aria-label="Sections fidélité">
          {[
            { id: "rewards", label: "Récompenses", count: rewards.length },
            { id: "packs", label: "Packs points", count: packs.length },
            { id: "history", label: "Historique", count: transactions.length },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              className={`loy-tab${tab === t.id ? " is-active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
              {t.count > 0 && <span className="loy-tab-count">({t.count})</span>}
            </button>
          ))}
        </div>

        {tab === "rewards" &&
          (loading ? (
            <div className="loading"><div className="spinner" />Chargement...</div>
          ) : rewards.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">🎁</div><p>Aucune récompense disponible pour le moment.</p></div>
          ) : (
            <div className="rewards-grid">
              {rewards.map((r) => {
                const canAfford = currentPoints >= r.cout_points;
                return (
                  <div
                    key={r.id}
                    className={`reward-card${canAfford ? "" : " is-locked"}`}
                  >
                    {r.valeur_fcfa && (
                      <span className="loy-reward-val-badge">
                        {r.valeur_fcfa.toLocaleString("fr-FR")} F
                      </span>
                    )}
                    <div className="reward-icon" style={{ background: r.color_bg }}>{r.emoji}</div>
                    <div className="reward-name">{r.nom}</div>
                    {r.description && (
                      <div className="reward-desc">{r.description}</div>
                    )}
                    <div className="reward-pts" style={{ color: canAfford ? "var(--green)" : "var(--gray)" }}>
                      {r.cout_points.toLocaleString("fr-FR")} pts
                    </div>
                    <button
                      type="button"
                      className={`reward-btn ${canAfford ? "reward-btn--afford" : "reward-btn--locked"}`}
                      onClick={() => setSelectedReward(r)}
                    >
                      {canAfford
                        ? "Échanger"
                        : `Encore ${(r.cout_points - currentPoints).toLocaleString("fr-FR")} pts`}
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
            <div className="loy-packs-grid">
              {packs.map((p) => {
                const bonus = p.bonus_pct ? Math.round((p.points * p.bonus_pct) / 100) : 0;
                const total = p.points + bonus;
                const accent = packCardAccentClass(p.badge);
                return (
                  <div
                    key={p.id}
                    role="button"
                    tabIndex={0}
                    className={`loy-pack-card ${accent}`.trim()}
                    onClick={() => setSelectedPack(p)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedPack(p);
                      }
                    }}
                  >
                    {p.badge && (
                      <span className={`loy-pack-badge ${packBadgeClass(p.badge)}`}>
                        {packBadgeLabel(p.badge)}
                      </span>
                    )}

                    <div className="loy-pack-emoji-wrap" style={{ background: p.color_bg }}>
                      {p.emoji}
                    </div>

                    <div className="loy-pack-title">Pack {p.nom}</div>

                    <div className="loy-pack-pts">
                      {total.toLocaleString("fr-FR")} pts
                    </div>

                    {bonus > 0 && (
                      <div className="loy-pack-bonus">
                        +{bonus} pts bonus (+{p.bonus_pct}%)
                      </div>
                    )}

                    <div className="loy-pack-price">
                      {p.prix_fcfa.toLocaleString("fr-FR")} FCFA
                    </div>

                    <div className="loy-pack-unit">
                      {(p.prix_fcfa / total).toFixed(1)} FCFA / pt
                    </div>

                    <div className="loy-pack-buy" aria-hidden>Acheter</div>
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
              <p>Aucune transaction pour l&apos;instant.</p>
              <p style={{ fontSize: ".82rem", color: "var(--gray)", marginTop: 10, maxWidth: 400 }}>
                Passez une commande ou laissez un avis pour voir vos points apparaître ici.
              </p>
            </div>
          ) : (
            <div className="loy-history">
              {transactions.map((t) => {
                const info = typeLabels[t.type] || { label: t.type, emoji: "💫", color: "var(--gray)" };
                const isGain = t.points > 0;
                return (
                  <div key={t.id} className="loy-history-row">
                    <div className="loy-history-ico" aria-hidden>{info.emoji}</div>
                    <div className="loy-history-body">
                      <div className="loy-history-title">{info.label}</div>
                      <div className="loy-history-sub">
                        {t.description || "—"}
                        {t.montant_fcfa ? ` · ${t.montant_fcfa.toLocaleString("fr-FR")} FCFA` : ""}
                      </div>
                    </div>
                    <div className="loy-history-pts">
                      <div className={`loy-history-amt${isGain ? " loy-history-amt--gain" : " loy-history-amt--loss"}`}>
                        {isGain ? "+" : ""}{t.points.toLocaleString("fr-FR")}
                      </div>
                      <div className="loy-history-date">
                        {new Date(t.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

        {tab === "rewards" && redemptions.length > 0 && (
          <div>
            <div className="loy-codes-title">Mes codes récompenses</div>
            <div className="loy-codes-grid">
              {redemptions.map((r) => (
                <div key={r.id} className="loy-code-card">
                  <div className="loy-code-name">{r.reward_nom}</div>
                  <div className="loy-code-val">{r.code}</div>
                  <div className="loy-code-meta">
                    <span>Statut : {r.status}</span>
                    <span>{r.expire_at ? `Expire le ${new Date(r.expire_at).toLocaleDateString("fr-FR")}` : ""}</span>
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
