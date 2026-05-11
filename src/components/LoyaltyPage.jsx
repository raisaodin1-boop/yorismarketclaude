import { useState, useEffect, useMemo } from "react";
import { MarketingBreadcrumb } from "./layout/MarketingBreadcrumb";
import { supabase } from "../lib/supabase";
import { LevelBadge } from "./LevelBadge";
import { LoyaltyPackModal } from "./LoyaltyPackModal";
import { LoyaltyRedeemModal } from "./LoyaltyRedeemModal";

// ─────────────────────────────────────────────────────────────
// PAGE PRINCIPALE : LOYALTY — Yorix Rewards (refonte ultra premium)
// ─────────────────────────────────────────────────────────────

const LEVEL_LABEL_FR = {
  bronze: "Bronze",
  argent: "Argent",
  or: "Or",
  platine: "Platine",
};

// Définition complète des 4 niveaux VIP (UI / storytelling)
const TIERS = [
  {
    id: "bronze",
    label: "Bronze",
    emoji: "🥉",
    color: "#CD7F32",
    threshold: 0,
    nextLabel: "Argent",
    pitch: "Démarrez le programme. Cumulez vos premiers points.",
    perks: ["Cashback 1 pt / 500 FCFA", "Bonus 50 pts à l'inscription", "Accès aux promos membres"],
  },
  {
    id: "argent",
    label: "Argent",
    emoji: "🥈",
    color: "#9CA3AF",
    threshold: 500,
    nextLabel: "Or",
    pitch: "Profitez de réductions et de livraisons offertes.",
    perks: ["Codes promo membres", "Livraison offerte ponctuelle", "Cashback boosté +10 %"],
  },
  {
    id: "or",
    label: "Or",
    emoji: "🥇",
    color: "#F59E0B",
    threshold: 1000,
    nextLabel: "Platine",
    pitch: "Statut VIP : avantages exclusifs et offres anticipées.",
    perks: ["Cashback boosté +25 %", "Accès anticipé aux ventes", "Bonus anniversaire VIP"],
  },
  {
    id: "platine",
    label: "Platine",
    emoji: "💎",
    color: "#7C3AED",
    threshold: 5000,
    nextLabel: null,
    pitch: "Sommet du programme — service & avantages exclusifs.",
    perks: ["Conciergerie Yorix dédiée", "Cashback maximal +40 %", "Cadeaux & invitations VIP"],
  },
];

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

function buildReferralCode(user, userData) {
  const base =
    (userData?.nom && String(userData.nom).split(" ")[0]) ||
    (user?.email && user.email.split("@")[0]) ||
    "YORIX";
  const clean = base
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 8);
  return `${clean || "YORIX"}-${(user?.id || "guest").slice(0, 4).toUpperCase()}`;
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

  // Newsletter (state local, simple — pas de backend ici)
  const [nlEmail, setNlEmail]   = useState("");
  const [nlSent, setNlSent]     = useState(false);

  // Parrainage : copie dans le presse-papier
  const [refCopied, setRefCopied] = useState(false);
  const referralCode = useMemo(() => buildReferralCode(user, userData), [user, userData]);

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

  // Helpers actions
  const openRegister = () => { setAuthTab?.("register"); setAuthOpen?.(true); };
  const openLogin    = () => { setAuthTab?.("login");    setAuthOpen?.(true); };

  const goToTab = (id) => {
    setTab(id);
    setTimeout(() => {
      const el = document.getElementById("yloy-rewards");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  };

  const copyReferral = async () => {
    try {
      await navigator.clipboard?.writeText(`https://yorix.cm/?ref=${referralCode}`);
      setRefCopied(true);
      setTimeout(() => setRefCopied(false), 2200);
    } catch {
      /* silencieux : si le presse-papier n'est pas disponible, on ignore */
    }
  };

  const submitNewsletter = (e) => {
    e.preventDefault();
    if (!nlEmail || !nlEmail.includes("@")) return;
    setNlSent(true);
    setTimeout(() => setNlSent(false), 4000);
    setNlEmail("");
  };

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

      <section className="anim yorix-loy-v2 loy-page">
        {/* ─────────── HERO PREMIUM ─────────── */}
        <header className="yloy-hero">
          <div className="yloy-hero-fx" aria-hidden>
            <div className="yloy-hero-glow yloy-hero-glow--a" />
            <div className="yloy-hero-glow yloy-hero-glow--b" />
            <div className="yloy-hero-grid-deco" />
          </div>

          <div className="yloy-section-inner yloy-hero-inner">
            <div className="yloy-hero-bc">
              <MarketingBreadcrumb
                items={[
                  { label: "Accueil", onClick: () => goPage("home") },
                  { label: "Yorix Rewards · fidélité" },
                ]}
              />
            </div>

            <div className="yloy-hero-grid">
              {/* Côté gauche : promesse + CTA */}
              <div className="yloy-hero-left">
                <span className="yloy-eyebrow yloy-eyebrow--on-dark">
                  <span className="yloy-eyebrow-dot" aria-hidden /> Yorix Rewards · programme fidélité
                </span>

                <h1 className="yloy-h1">
                  Plus vous achetez, <em>plus vous gagnez.</em>
                </h1>

                <p className="yloy-sub">
                  Cumulez des <strong>Yorix Points</strong> à chaque achat, vente ou avis publié — puis
                  échangez-les contre des réductions, livraisons offertes et avantages VIP réservés aux membres.
                </p>

                <ul className="yloy-hero-perks" aria-label="Avantages du programme">
                  <li><span aria-hidden>🎁</span><strong>+50 pts</strong> à l’inscription</li>
                  <li><span aria-hidden>🚚</span><strong>Livraison</strong> offerte</li>
                  <li><span aria-hidden>🎟️</span><strong>Codes promo</strong> VIP</li>
                  <li><span aria-hidden>👥</span><strong>Bonus</strong> parrainage</li>
                </ul>

                <div className="yloy-hero-cta">
                  {user ? (
                    <>
                      <button type="button" className="yloy-btn yloy-btn--pri" onClick={() => goToTab("packs")}>
                        Acheter des points
                      </button>
                      <button type="button" className="yloy-btn yloy-btn--sec" onClick={() => goToTab("rewards")}>
                        Échanger mes points
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" className="yloy-btn yloy-btn--pri" onClick={openRegister}>
                        Créer mon compte — +50 pts
                      </button>
                      <button type="button" className="yloy-btn yloy-btn--sec" onClick={openLogin}>
                        J’ai déjà un compte
                      </button>
                    </>
                  )}
                </div>

                <ul className="yloy-hero-trust" aria-label="Avantages plateforme">
                  <li><span aria-hidden>🔐</span> Escrow sécurisé</li>
                  <li><span aria-hidden>🇨🇲</span> Made in Cameroun</li>
                  <li><span aria-hidden>⭐</span> +1 000 membres actifs</li>
                </ul>
              </div>

              {/* Côté droit : carte VIP */}
              <div className="yloy-hero-right">
                <div className="yloy-vipcard" role="img" aria-label="Carte de membre Yorix Rewards">
                  <div className="yloy-vipcard-shine" aria-hidden />
                  <div className="yloy-vipcard-top">
                    <div className="yloy-vipcard-brand">
                      <span className="yloy-vipcard-logo">Y</span>
                      <span className="yloy-vipcard-name">YORIX <em>REWARDS</em></span>
                    </div>
                    <LevelBadge level={user ? currentLevel : "or"} size="lg" />
                  </div>

                  <div className="yloy-vipcard-mid">
                    <div className="yloy-vipcard-lbl">Points disponibles</div>
                    <div className="yloy-vipcard-pts">
                      {user ? currentPoints.toLocaleString("fr-FR") : "1 250"}
                      <small> pts</small>
                    </div>
                    <div className="yloy-vipcard-meta">
                      {user ? (
                        <>
                          Niveau <strong>{levelFr}</strong>
                          {currentLevel !== "platine" && (
                            <> · plus que <strong>{pointsToNext.toLocaleString("fr-FR")} pts</strong> pour {nextLevelFr}</>
                          )}
                        </>
                      ) : (
                        <>Exemple — niveau <strong>Or</strong> · ~250 pts pour Platine</>
                      )}
                    </div>

                    <div className="yloy-vipcard-progress" role="progressbar" aria-valuenow={user ? progressPct : 65} aria-valuemin={0} aria-valuemax={100}>
                      <div className="yloy-vipcard-progress-bar" style={{ width: `${user ? progressPct : 65}%` }} />
                    </div>
                  </div>

                  <div className="yloy-vipcard-foot">
                    <div>
                      <div className="yloy-vipcard-flbl">Titulaire</div>
                      <div className="yloy-vipcard-fval" title={userData?.nom || user?.email || ""}>
                        {(userData?.nom || user?.email?.split("@")[0] || "Membre Yorix").toString().slice(0, 22)}
                      </div>
                    </div>
                    <div>
                      <div className="yloy-vipcard-flbl">Membre · {user ? "actif" : "exemple"}</div>
                      <div className="yloy-vipcard-fval">{new Date().getFullYear()}</div>
                    </div>
                  </div>
                </div>

                <div className="yloy-orbit yloy-orbit--a" aria-hidden />
                <div className="yloy-orbit yloy-orbit--b" aria-hidden />
              </div>
            </div>
          </div>
        </header>

        {/* ─────────── 01 · COMMENT GAGNER DES POINTS ─────────── */}
        <section className="yloy-section">
          <div className="yloy-section-inner">
            <div className="yloy-section-head">
              <span className="yloy-eyebrow">01 · Comment ça marche</span>
              <h2 className="yloy-h2">
                Gagnez des points à chaque <em>action</em>
              </h2>
              <p className="yloy-lead">
                Quatre façons simples d’accumuler vos Yorix Points et de débloquer des avantages.
              </p>
            </div>

            <div className="yloy-earn-grid">
              {[
                { e: "🛍️", t: "Chaque achat",          d: "Gagnez 1 point pour chaque tranche de 500 FCFA dépensée sur la marketplace.",   pts: "1 pt / 500 FCFA" },
                { e: "💰", t: "Chaque vente",          d: "Côté vendeur : 1 point pour chaque tranche de 500 FCFA vendue, escrow inclus.", pts: "1 pt / 500 FCFA" },
                { e: "⭐", t: "Avis publié",          d: "Aidez la communauté : un avis détaillé sur un produit ou un service rapporte des points.", pts: "+10 à +30 pts" },
                { e: "👥", t: "Parrainage",            d: "Invitez un proche : à chaque inscription parrainée, vous gagnez un bonus.",                pts: "+100 pts" },
              ].map((w) => (
                <article key={w.t} className="yloy-earn-card">
                  <div className="yloy-earn-emoji" aria-hidden>{w.e}</div>
                  <h3 className="yloy-earn-t">{w.t}</h3>
                  <p className="yloy-earn-d">{w.d}</p>
                  <span className="yloy-earn-pts">{w.pts}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── 02 · NIVEAUX VIP ─────────── */}
        <section className="yloy-section yloy-section--tinted">
          <div className="yloy-section-inner">
            <div className="yloy-section-head">
              <span className="yloy-eyebrow">02 · Niveaux VIP</span>
              <h2 className="yloy-h2">
                Quatre niveaux. <em>Plus vous montez, plus vous gagnez.</em>
              </h2>
              <p className="yloy-lead">
                Votre niveau évolue automatiquement en fonction de vos points cumulés. Aucun frais, aucun engagement.
              </p>
            </div>

            <div className="yloy-tiers">
              {TIERS.map((t) => {
                const isCurrent = user && currentLevel === t.id;
                return (
                  <article
                    key={t.id}
                    className={`yloy-tier yloy-tier--${t.id}${isCurrent ? " is-current" : ""}`}
                    style={{ "--tier-color": t.color }}
                  >
                    {isCurrent && <span className="yloy-tier-now">Mon niveau actuel</span>}
                    <div className="yloy-tier-emoji" aria-hidden>{t.emoji}</div>
                    <h3 className="yloy-tier-name">{t.label}</h3>
                    <div className="yloy-tier-thresh">
                      {t.threshold === 0
                        ? "Dès l’inscription"
                        : `À partir de ${t.threshold.toLocaleString("fr-FR")} pts`}
                    </div>
                    <p className="yloy-tier-pitch">{t.pitch}</p>
                    <ul className="yloy-tier-perks">
                      {t.perks.map((p) => (
                        <li key={p}><span aria-hidden>✓</span>{p}</li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─────────── 03 · MES POINTS / RÉCOMPENSES ─────────── */}
        <section className="yloy-section" id="yloy-rewards">
          <div className="yloy-section-inner">
            <div className="yloy-section-head">
              <span className="yloy-eyebrow">03 · Récompenses</span>
              <h2 className="yloy-h2">
                Vos Yorix Points, transformés en <em>avantages réels</em>
              </h2>
              <p className="yloy-lead">
                {user
                  ? "Choisissez vos récompenses, ou accélérez votre progression avec un pack de points."
                  : "Inscrivez-vous pour voir vos points, débloquer les onglets et activer les récompenses."}
              </p>
            </div>

            {/* Mini stats — uniquement membre */}
            {user && (
              <div className="loy-stats-grid">
                {[
                  { icon: "🛍️", val: transactions.filter((t) => t.type === "achat").length, lbl: "Achats" },
                  { icon: "💰", val: transactions.filter((t) => t.type === "vente").length, lbl: "Ventes" },
                  { icon: "⭐", val: transactions.filter((t) => t.type === "avis").length,  lbl: "Avis" },
                  { icon: "🎁", val: redemptions.length,                                     lbl: "Échanges" },
                ].map((s) => (
                  <div key={s.lbl} className="loy-stat-card">
                    <div className="loy-stat-ico" aria-hidden>{s.icon}</div>
                    <div className="loy-stat-val">{s.val}</div>
                    <div className="loy-stat-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Tabs */}
            <div className="loy-tabs" role="tablist" aria-label="Sections fidélité">
              {[
                { id: "rewards", label: "Récompenses", count: rewards.length },
                { id: "packs",   label: "Packs points", count: packs.length },
                { id: "history", label: "Historique",  count: transactions.length },
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
                <div className="empty-state"><div className="empty-icon" aria-hidden>🎁</div><p>Aucune récompense disponible pour le moment.</p></div>
              ) : (
                <div className="rewards-grid">
                  {rewards.map((r) => {
                    const canAfford = !!user && currentPoints >= r.cout_points;
                    return (
                      <div key={r.id} className={`reward-card${canAfford ? "" : " is-locked"}`}>
                        {r.valeur_fcfa && (
                          <span className="loy-reward-val-badge">{r.valeur_fcfa.toLocaleString("fr-FR")} F</span>
                        )}
                        <div className="reward-icon" style={{ background: r.color_bg }}>{r.emoji}</div>
                        <div className="reward-name">{r.nom}</div>
                        {r.description && <div className="reward-desc">{r.description}</div>}
                        <div className="reward-pts" style={{ color: canAfford ? "var(--green)" : "var(--gray)" }}>
                          {r.cout_points.toLocaleString("fr-FR")} pts
                        </div>
                        <button
                          type="button"
                          className={`reward-btn ${canAfford ? "reward-btn--afford" : "reward-btn--locked"}`}
                          onClick={() => (user ? setSelectedReward(r) : openRegister())}
                        >
                          {!user
                            ? "S’inscrire"
                            : canAfford
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
              ) : packs.length === 0 ? (
                <div className="empty-state"><div className="empty-icon" aria-hidden>💎</div><p>Aucun pack disponible pour le moment.</p></div>
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
                        onClick={() => (user ? setSelectedPack(p) : openRegister())}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            if (user) setSelectedPack(p);
                            else openRegister();
                          }
                        }}
                      >
                        {p.badge && (
                          <span className={`loy-pack-badge ${packBadgeClass(p.badge)}`}>{packBadgeLabel(p.badge)}</span>
                        )}
                        <div className="loy-pack-emoji-wrap" style={{ background: p.color_bg }}>{p.emoji}</div>
                        <div className="loy-pack-title">Pack {p.nom}</div>
                        <div className="loy-pack-pts">{total.toLocaleString("fr-FR")} pts</div>
                        {bonus > 0 && (
                          <div className="loy-pack-bonus">+{bonus} pts bonus (+{p.bonus_pct}%)</div>
                        )}
                        <div className="loy-pack-price">{p.prix_fcfa.toLocaleString("fr-FR")} FCFA</div>
                        <div className="loy-pack-unit">{(p.prix_fcfa / total).toFixed(1)} FCFA / pt</div>
                        <div className="loy-pack-buy" aria-hidden>{user ? "Acheter" : "Créer un compte"}</div>
                      </div>
                    );
                  })}
                </div>
              ))}

            {tab === "history" &&
              (!user ? (
                <div className="empty-state">
                  <div className="empty-icon" aria-hidden>📜</div>
                  <p>Créez un compte pour suivre l’historique de vos points.</p>
                  <div style={{ marginTop: 14, display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
                    <button type="button" className="yloy-btn yloy-btn--pri" onClick={openRegister}>Créer mon compte</button>
                    <button type="button" className="yloy-btn yloy-btn--ghost" onClick={openLogin}>Me connecter</button>
                  </div>
                </div>
              ) : loading ? (
                <div className="loading"><div className="spinner" />Chargement...</div>
              ) : transactions.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon" aria-hidden>📜</div>
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

            {user && tab === "rewards" && redemptions.length > 0 && (
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
          </div>
        </section>

        {/* ─────────── 04 · PARRAINAGE ─────────── */}
        <section className="yloy-section">
          <div className="yloy-section-inner">
            <div className="yloy-referral">
              <div className="yloy-referral-fx" aria-hidden />
              <div className="yloy-referral-left">
                <span className="yloy-eyebrow yloy-eyebrow--on-dark">04 · Parrainage</span>
                <h2 className="yloy-h2 yloy-h2--on-dark">
                  Invitez un proche, <em>gagnez 100 pts.</em>
                </h2>
                <p className="yloy-sub yloy-sub--on-dark">
                  Partagez votre lien : à chaque inscription validée, vous recevez <strong>100 points</strong> de bonus
                  — et votre filleul démarre avec <strong>50 points offerts</strong>.
                </p>
              </div>

              <div className="yloy-referral-right">
                <label className="yloy-referral-lbl" htmlFor="yloy-ref-code">Votre lien de parrainage</label>
                <div className="yloy-referral-row">
                  <input
                    id="yloy-ref-code"
                    type="text"
                    readOnly
                    className="yloy-referral-inp"
                    value={`https://yorix.cm/?ref=${referralCode}`}
                    onFocus={(e) => e.target.select()}
                  />
                  <button
                    type="button"
                    className="yloy-btn yloy-btn--pri yloy-referral-btn"
                    onClick={user ? copyReferral : openRegister}
                    aria-live="polite"
                  >
                    {user ? (refCopied ? "Copié ✓" : "Copier") : "Activer mon lien"}
                  </button>
                </div>
                <div className="yloy-referral-meta">
                  {user
                    ? "Astuce : partagez par WhatsApp, SMS ou email — vos points sont crédités automatiquement."
                    : "Créez un compte pour activer votre lien personnel de parrainage."}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────── 05 · NEWSLETTER PREMIUM ─────────── */}
        <section className="yloy-section">
          <div className="yloy-section-inner">
            <div className="yloy-nl">
              <div className="yloy-nl-ico" aria-hidden>📬</div>
              <h2 className="yloy-h2 yloy-h2--center">
                Restez informé(e) des <em>offres VIP</em>
              </h2>
              <p className="yloy-lead yloy-lead--center">
                Recevez en avant-première les codes promo, les ventes flash et les nouvelles récompenses du programme.
              </p>

              <form className="yloy-nl-form" onSubmit={submitNewsletter} noValidate>
                <input
                  type="email"
                  className="yloy-nl-input"
                  placeholder="votre@email.com"
                  value={nlEmail}
                  onChange={(e) => setNlEmail(e.target.value)}
                  aria-label="Adresse email pour la newsletter"
                  required
                />
                <button type="submit" className="yloy-btn yloy-btn--pri yloy-nl-submit">
                  {nlSent ? "Inscrit ✓" : "Je m’abonne"}
                </button>
              </form>

              <div className="yloy-nl-note">
                {nlSent
                  ? "Merci ! Vérifiez votre boîte mail pour confirmer votre inscription."
                  : "Pas de spam · désinscription en un clic · gestion conforme RGPD."}
              </div>
            </div>
          </div>
        </section>

        {/* ─────────── 06 · FAQ ─────────── */}
        <section className="yloy-section">
          <div className="yloy-section-inner">
            <div className="yloy-section-head">
              <span className="yloy-eyebrow">06 · Questions fréquentes</span>
              <h2 className="yloy-h2">Tout savoir sur <em>Yorix Rewards</em></h2>
            </div>

            <div className="yloy-faq">
              {[
                {
                  q: "Comment fonctionne le programme Yorix Rewards ?",
                  a: "Chaque action (achat, vente, avis, parrainage) vous rapporte des points. Vous échangez ensuite ces points contre des récompenses — codes promo, livraisons offertes, bons d’achat — directement depuis cette page.",
                },
                {
                  q: "Combien de points par achat ?",
                  a: "Vous gagnez 1 point pour chaque tranche de 500 FCFA dépensée sur la marketplace, paiement validé. Les avantages VIP (Or, Platine) augmentent ce cashback.",
                },
                {
                  q: "Comment monter de niveau ?",
                  a: "Votre niveau évolue automatiquement selon votre total cumulé de points : 500 pour Argent, 1 000 pour Or, 5 000 pour Platine. Aucun engagement ni frais.",
                },
                {
                  q: "Mes points expirent-ils ?",
                  a: "Non, vos points restent valables tant que votre compte est actif. Les codes promo générés à l’échange peuvent avoir une date d’expiration indiquée sur le code.",
                },
                {
                  q: "Le parrainage, comment ça marche ?",
                  a: "Vous partagez votre lien personnel. Dès qu’un filleul s’inscrit et passe une première commande, vous recevez automatiquement 100 points bonus.",
                },
              ].map((f) => (
                <details className="yloy-faq-item" key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── BANDEAU CTA FINAL ─────────── */}
        {!user && (
          <section className="yloy-section">
            <div className="yloy-section-inner">
              <div className="yloy-final-cta">
                <div>
                  <h2 className="yloy-h2 yloy-h2--on-dark">Rejoignez Yorix Rewards aujourd’hui</h2>
                  <p className="yloy-sub yloy-sub--on-dark">
                    Inscription gratuite · +50 points offerts · 30 secondes chrono.
                  </p>
                </div>
                <div className="yloy-final-cta-actions">
                  <button type="button" className="yloy-btn yloy-btn--pri" onClick={openRegister}>
                    Créer mon compte — +50 pts
                  </button>
                  <button type="button" className="yloy-btn yloy-btn--ghost" onClick={openLogin}>
                    Me connecter
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </section>
    </>
  );
}
