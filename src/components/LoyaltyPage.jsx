// ═══════════════════════════════════════════════════════════════
//  YORIX CM — LOYALTY PAGE PREMIUM v3
//  ✅ Hero spectaculaire avec carte VIP animée
//  ✅ 4 niveaux Bronze / Argent / Or / Platine
//  ✅ Système de points avec progression
//  ✅ Packs achetables + Récompenses échangeables
//  ✅ Parrainage avec lien personnel
//  ✅ Newsletter premium + FAQ
//  ✅ Refonte design : Amazon Prime / Starbucks Rewards inspired
// ═══════════════════════════════════════════════════════════════

import { useState, useEffect, useMemo } from "react";
import { supabase } from "../lib/supabase";
import { LevelBadge } from "./LevelBadge";
import { LoyaltyPackModal } from "./LoyaltyPackModal";
import { LoyaltyRedeemModal } from "./LoyaltyRedeemModal";

// ─────────────────────────────────────────────────────────────
// CONSTANTES
// ─────────────────────────────────────────────────────────────
const LEVEL_LABEL_FR = {
  bronze: "Bronze",
  argent: "Argent",
  or: "Or",
  platine: "Platine",
};

const TIERS = [
  {
    id: "bronze",
    label: "Bronze",
    emoji: "🥉",
    color: "#CD7F32",
    gradient: "linear-gradient(135deg, #CD7F32, #8B5A2B)",
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
    gradient: "linear-gradient(135deg, #C0C0C0, #808080)",
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
    gradient: "linear-gradient(135deg, #FCD116, #B8860B)",
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
    gradient: "linear-gradient(135deg, #A78BFA, #5B21B6)",
    threshold: 5000,
    nextLabel: null,
    pitch: "Sommet du programme — service & avantages exclusifs.",
    perks: ["Conciergerie Yorix dédiée", "Cashback maximal +40 %", "Cadeaux & invitations VIP"],
  },
];

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────────────────────
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
  const [nlEmail, setNlEmail]               = useState("");
  const [nlSent, setNlSent]                 = useState(false);
  const [refCopied, setRefCopied]           = useState(false);

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

  const levelFr     = LEVEL_LABEL_FR[currentLevel] || currentLevel;
  const nextLevelFr = currentLevel === "bronze" ? "Argent"
                    : currentLevel === "argent" ? "Or"
                    : currentLevel !== "platine" ? "Platine" : "";

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
    } catch {}
  };

  const submitNewsletter = async (e) => {
    e.preventDefault();
    if (!nlEmail || !nlEmail.includes("@")) return;
    try {
      await supabase.from("newsletter").insert({ email: nlEmail });
    } catch {}
    setNlSent(true);
    setTimeout(() => setNlSent(false), 4000);
    setNlEmail("");
  };

  // ─────────────────────────────────────────────────────────────
  // CSS PREMIUM INTÉGRÉ
  // ─────────────────────────────────────────────────────────────
  const css = `
    .yorix-loy-v3 {
      --loy-green: #1a6b3a;
      --loy-green-deep: #0d4d28;
      --loy-yellow: #fcd116;
      --loy-gold: #f59e0b;
      --loy-ink: var(--ink, #111);
      --loy-gray: var(--gray, #666);
      --loy-surface: var(--surface, #fff);
      --loy-surface2: var(--surface2, #f8f8f8);
      --loy-border: var(--border, #e5e5e5);
      --loy-radius: 16px;
      --loy-shadow: 0 12px 30px rgba(0,0,0,.08);
      --loy-shadow-hover: 0 20px 50px rgba(0,0,0,.12);

      font-family: 'DM Sans', sans-serif;
      color: var(--loy-ink);
    }
    .yorix-loy-v3 * { box-sizing: border-box; }

    /* ━━━ HERO ━━━ */
    .yloy3-hero {
      position: relative;
      background: linear-gradient(135deg, #0a1410 0%, #1a3a24 45%, #0d3320 100%);
      color: #fff;
      padding: 60px 24px 70px;
      overflow: hidden;
      border-radius: 0 0 28px 28px;
      margin-bottom: 50px;
    }
    .yloy3-hero::before {
      content: '';
      position: absolute;
      top: -100px; right: -80px;
      width: 380px; height: 380px;
      background: radial-gradient(circle, rgba(252,209,22,.18), transparent 65%);
      border-radius: 50%;
      pointer-events: none;
    }
    .yloy3-hero::after {
      content: '';
      position: absolute;
      bottom: -120px; left: -100px;
      width: 360px; height: 360px;
      background: radial-gradient(circle, rgba(79,209,125,.12), transparent 65%);
      border-radius: 50%;
      pointer-events: none;
    }
    .yloy3-hero-inner {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1.1fr 1fr;
      gap: 48px;
      align-items: center;
      position: relative;
      z-index: 2;
    }
    .yloy3-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: rgba(252,209,22,.14);
      color: var(--loy-yellow);
      border: 1px solid rgba(252,209,22,.32);
      padding: 6px 14px;
      border-radius: 50px;
      font-size: .72rem;
      font-weight: 700;
      margin-bottom: 18px;
      letter-spacing: .04em;
    }
    .yloy3-eyebrow-dot {
      width: 7px; height: 7px;
      background: var(--loy-yellow);
      border-radius: 50%;
      box-shadow: 0 0 12px var(--loy-yellow);
      animation: yloyPulse 2s ease-in-out infinite;
    }
    @keyframes yloyPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%      { opacity: .5; transform: scale(1.4); }
    }
    .yloy3-h1 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 800;
      line-height: 1.05;
      letter-spacing: -1.5px;
      margin-bottom: 16px;
    }
    .yloy3-h1 em {
      font-style: normal;
      color: var(--loy-yellow);
      background: linear-gradient(135deg, #fcd116, #f59e0b);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .yloy3-sub {
      font-size: clamp(.95rem, 1.5vw, 1.05rem);
      color: rgba(255,255,255,.75);
      line-height: 1.7;
      margin-bottom: 24px;
      max-width: 520px;
    }
    .yloy3-sub strong { color: #fff; font-weight: 700; }
    .yloy3-perks {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-bottom: 28px;
      list-style: none;
      padding: 0;
    }
    .yloy3-perks li {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,.06);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,.1);
      padding: 9px 13px;
      border-radius: 10px;
      font-size: .82rem;
      color: rgba(255,255,255,.92);
    }
    .yloy3-perks li span:first-child { font-size: 1.15rem; }
    .yloy3-perks strong { font-weight: 700; color: var(--loy-yellow); }
    .yloy3-ctas {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }
    .yloy3-btn {
      padding: 13px 24px;
      border-radius: 11px;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .88rem;
      cursor: pointer;
      transition: all .2s;
      border: none;
      letter-spacing: -.2px;
      white-space: nowrap;
    }
    .yloy3-btn--pri {
      background: linear-gradient(135deg, var(--loy-yellow), var(--loy-gold));
      color: #0d1f14;
      box-shadow: 0 8px 22px rgba(252,209,22,.35);
    }
    .yloy3-btn--pri:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(252,209,22,.45);
    }
    .yloy3-btn--sec {
      background: rgba(255,255,255,.1);
      color: #fff;
      border: 1.5px solid rgba(255,255,255,.2);
      backdrop-filter: blur(10px);
    }
    .yloy3-btn--sec:hover {
      background: rgba(255,255,255,.18);
    }
    .yloy3-btn--ghost {
      background: transparent;
      color: var(--loy-ink);
      border: 1.5px solid var(--loy-border);
    }
    .yloy3-btn--ghost:hover {
      background: var(--loy-surface2);
    }
    .yloy3-trust {
      display: flex;
      gap: 18px;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
    }
    .yloy3-trust li {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: .72rem;
      color: rgba(255,255,255,.55);
    }

    /* ━━━ CARTE VIP ━━━ */
    .yloy3-vipcard-wrap {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 340px;
    }
    .yloy3-vipcard {
      position: relative;
      width: 100%;
      max-width: 380px;
      aspect-ratio: 1.586/1;
      background: linear-gradient(135deg, #1a3a24 0%, #0a1410 100%);
      border-radius: 18px;
      padding: 22px 24px;
      color: #fff;
      box-shadow:
        0 25px 60px rgba(0,0,0,.5),
        0 0 0 1px rgba(255,255,255,.08) inset;
      transform: rotate(-3deg);
      transition: transform .4s cubic-bezier(.4,.0,.2,1);
      overflow: hidden;
    }
    .yloy3-vipcard:hover {
      transform: rotate(-1deg) translateY(-6px) scale(1.02);
    }
    .yloy3-vipcard::before {
      content: '';
      position: absolute;
      top: -50%; left: -50%;
      width: 200%; height: 200%;
      background: linear-gradient(
        135deg,
        transparent 30%,
        rgba(252,209,22,.15) 50%,
        transparent 70%
      );
      animation: yloyShine 6s ease-in-out infinite;
      pointer-events: none;
    }
    @keyframes yloyShine {
      0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
      50%      { transform: translate(-30%, -30%) rotate(45deg); }
    }
    .yloy3-vipcard-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 22px;
      position: relative;
      z-index: 2;
    }
    .yloy3-vipcard-brand {
      display: flex;
      align-items: center;
      gap: 9px;
    }
    .yloy3-vipcard-logo {
      width: 36px; height: 36px;
      background: linear-gradient(135deg, var(--loy-yellow), var(--loy-gold));
      color: #0d1f14;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1.2rem;
    }
    .yloy3-vipcard-name {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .9rem;
      letter-spacing: .12em;
    }
    .yloy3-vipcard-name em {
      font-style: normal;
      color: var(--loy-yellow);
      font-size: .68rem;
      display: block;
      letter-spacing: .25em;
    }
    .yloy3-vipcard-tier {
      background: rgba(252,209,22,.18);
      color: var(--loy-yellow);
      border: 1px solid rgba(252,209,22,.4);
      padding: 5px 11px;
      border-radius: 50px;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .68rem;
      letter-spacing: .1em;
      text-transform: uppercase;
    }
    .yloy3-vipcard-mid {
      position: relative;
      z-index: 2;
    }
    .yloy3-vipcard-lbl {
      font-size: .65rem;
      color: rgba(255,255,255,.55);
      letter-spacing: .1em;
      text-transform: uppercase;
      margin-bottom: 5px;
    }
    .yloy3-vipcard-pts {
      font-family: 'Syne', sans-serif;
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--loy-yellow);
      letter-spacing: -1px;
      line-height: 1;
      margin-bottom: 4px;
    }
    .yloy3-vipcard-pts small {
      font-size: .85rem;
      color: rgba(255,255,255,.6);
      margin-left: 4px;
    }
    .yloy3-vipcard-meta {
      font-size: .68rem;
      color: rgba(255,255,255,.7);
      margin-bottom: 14px;
      line-height: 1.5;
    }
    .yloy3-vipcard-meta strong { color: #fff; }
    .yloy3-vipcard-progress {
      height: 6px;
      background: rgba(255,255,255,.1);
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 16px;
    }
    .yloy3-vipcard-progress-bar {
      height: 100%;
      background: linear-gradient(90deg, var(--loy-yellow), var(--loy-gold));
      border-radius: 10px;
      transition: width .6s ease;
    }
    .yloy3-vipcard-foot {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      position: relative;
      z-index: 2;
    }
    .yloy3-vipcard-flbl {
      font-size: .58rem;
      color: rgba(255,255,255,.45);
      letter-spacing: .12em;
      text-transform: uppercase;
      margin-bottom: 3px;
    }
    .yloy3-vipcard-fval {
      font-size: .82rem;
      font-weight: 600;
      color: rgba(255,255,255,.95);
    }

    /* ━━━ SECTIONS ━━━ */
    .yloy3-section {
      max-width: 1200px;
      margin: 0 auto 60px;
      padding: 0 24px;
    }
    .yloy3-section--tinted {
      background: var(--loy-surface2);
      padding: 60px 24px;
      margin-bottom: 60px;
      border-radius: 24px;
      max-width: 1248px;
    }
    .yloy3-section-head {
      text-align: center;
      max-width: 720px;
      margin: 0 auto 40px;
    }
    .yloy3-eyebrow-light {
      display: inline-block;
      background: var(--loy-surface2);
      color: var(--loy-green);
      border: 1px solid var(--loy-border);
      padding: 5px 12px;
      border-radius: 50px;
      font-size: .68rem;
      font-weight: 700;
      letter-spacing: .12em;
      text-transform: uppercase;
      margin-bottom: 14px;
    }
    .yloy3-h2 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(1.5rem, 3.5vw, 2.2rem);
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -1px;
      color: var(--loy-ink);
      margin-bottom: 12px;
    }
    .yloy3-h2 em {
      font-style: normal;
      color: var(--loy-green);
    }
    .yloy3-h2--on-dark { color: #fff; }
    .yloy3-h2--on-dark em { color: var(--loy-yellow); }
    .yloy3-lead {
      font-size: 1rem;
      color: var(--loy-gray);
      line-height: 1.65;
    }

    /* ━━━ COMMENT GAGNER ━━━ */
    .yloy3-earn-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 18px;
    }
    .yloy3-earn-card {
      background: var(--loy-surface);
      border: 1px solid var(--loy-border);
      border-radius: 16px;
      padding: 24px 22px;
      text-align: center;
      transition: all .25s;
      position: relative;
      overflow: hidden;
    }
    .yloy3-earn-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--loy-green), var(--loy-yellow));
      transform: scaleX(0);
      transform-origin: left;
      transition: transform .3s;
    }
    .yloy3-earn-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--loy-shadow);
      border-color: var(--loy-green);
    }
    .yloy3-earn-card:hover::before {
      transform: scaleX(1);
    }
    .yloy3-earn-emoji {
      font-size: 2.4rem;
      margin-bottom: 12px;
      display: inline-block;
      transition: transform .3s;
    }
    .yloy3-earn-card:hover .yloy3-earn-emoji {
      transform: scale(1.15) rotate(-5deg);
    }
    .yloy3-earn-t {
      font-family: 'Syne', sans-serif;
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--loy-ink);
      margin-bottom: 8px;
      letter-spacing: -.3px;
    }
    .yloy3-earn-d {
      font-size: .82rem;
      color: var(--loy-gray);
      line-height: 1.6;
      margin-bottom: 14px;
    }
    .yloy3-earn-pts {
      display: inline-block;
      background: linear-gradient(135deg, var(--loy-green-pale, #e8f5e9), #fff9e6);
      color: var(--loy-green);
      border: 1px solid var(--loy-green-light, #86efac);
      padding: 5px 12px;
      border-radius: 50px;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: .78rem;
    }

    /* ━━━ TIERS ━━━ */
    .yloy3-tiers {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }
    .yloy3-tier {
      background: var(--loy-surface);
      border: 2px solid var(--loy-border);
      border-radius: 16px;
      padding: 26px 22px;
      position: relative;
      transition: all .25s;
      overflow: hidden;
    }
    .yloy3-tier::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 5px;
      background: var(--tier-gradient);
    }
    .yloy3-tier:hover {
      transform: translateY(-5px);
      box-shadow: var(--loy-shadow-hover);
    }
    .yloy3-tier.is-current {
      border-color: var(--tier-color);
      box-shadow: 0 0 0 3px var(--tier-color)20, var(--loy-shadow);
    }
    .yloy3-tier-now {
      position: absolute;
      top: 14px; right: 14px;
      background: var(--tier-color);
      color: #fff;
      padding: 4px 10px;
      border-radius: 50px;
      font-size: .62rem;
      font-weight: 700;
      letter-spacing: .05em;
    }
    .yloy3-tier-emoji {
      font-size: 2.8rem;
      margin-bottom: 10px;
    }
    .yloy3-tier-name {
      font-family: 'Syne', sans-serif;
      font-size: 1.3rem;
      font-weight: 800;
      letter-spacing: -.5px;
      margin-bottom: 4px;
      background: var(--tier-gradient);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .yloy3-tier-thresh {
      font-size: .72rem;
      color: var(--loy-gray);
      font-weight: 600;
      margin-bottom: 10px;
    }
    .yloy3-tier-pitch {
      font-size: .84rem;
      color: var(--loy-ink);
      line-height: 1.6;
      margin-bottom: 14px;
      min-height: 50px;
    }
    .yloy3-tier-perks {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .yloy3-tier-perks li {
      display: flex;
      align-items: flex-start;
      gap: 7px;
      font-size: .78rem;
      color: var(--loy-gray);
      padding: 5px 0;
      line-height: 1.5;
    }
    .yloy3-tier-perks li span {
      color: var(--tier-color);
      font-weight: 800;
      flex-shrink: 0;
    }

    /* ━━━ MES STATS ━━━ */
    .yloy3-stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 12px;
      margin-bottom: 28px;
    }
    .yloy3-stat-card {
      background: var(--loy-surface);
      border: 1px solid var(--loy-border);
      border-radius: 12px;
      padding: 16px 14px;
      text-align: center;
      transition: all .2s;
    }
    .yloy3-stat-card:hover {
      border-color: var(--loy-green);
      transform: translateY(-2px);
    }
    .yloy3-stat-ico {
      font-size: 1.6rem;
      margin-bottom: 6px;
    }
    .yloy3-stat-val {
      font-family: 'Syne', sans-serif;
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--loy-ink);
      letter-spacing: -.5px;
    }
    .yloy3-stat-lbl {
      font-size: .72rem;
      color: var(--loy-gray);
      font-weight: 600;
    }

    /* ━━━ TABS ━━━ */
    .yloy3-tabs {
      display: flex;
      gap: 6px;
      border-bottom: 2px solid var(--loy-border);
      margin-bottom: 28px;
      flex-wrap: wrap;
      overflow-x: auto;
    }
    .yloy3-tab {
      background: transparent;
      border: none;
      padding: 12px 18px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: .88rem;
      color: var(--loy-gray);
      cursor: pointer;
      position: relative;
      transition: color .2s;
      white-space: nowrap;
    }
    .yloy3-tab:hover { color: var(--loy-ink); }
    .yloy3-tab.is-active {
      color: var(--loy-green);
      font-weight: 700;
    }
    .yloy3-tab.is-active::after {
      content: '';
      position: absolute;
      bottom: -2px; left: 0; right: 0;
      height: 3px;
      background: var(--loy-green);
      border-radius: 3px 3px 0 0;
    }
    .yloy3-tab-count {
      margin-left: 5px;
      font-size: .72rem;
      color: var(--loy-gray);
    }

    /* ━━━ REWARDS GRID ━━━ */
    .yloy3-rewards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 16px;
    }
    .yloy3-reward-card {
      background: var(--loy-surface);
      border: 1px solid var(--loy-border);
      border-radius: 14px;
      padding: 20px 16px 18px;
      text-align: center;
      position: relative;
      transition: all .25s;
      display: flex;
      flex-direction: column;
    }
    .yloy3-reward-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--loy-shadow);
      border-color: var(--loy-green);
    }
    .yloy3-reward-card.is-locked { opacity: .6; }
    .yloy3-reward-val-badge {
      position: absolute;
      top: 12px; right: 12px;
      background: var(--loy-green);
      color: #fff;
      padding: 3px 9px;
      border-radius: 50px;
      font-size: .62rem;
      font-weight: 800;
    }
    .yloy3-reward-icon {
      width: 64px; height: 64px;
      border-radius: 14px;
      margin: 0 auto 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      transition: transform .3s;
    }
    .yloy3-reward-card:hover .yloy3-reward-icon {
      transform: scale(1.1) rotate(-4deg);
    }
    .yloy3-reward-name {
      font-family: 'Syne', sans-serif;
      font-size: .92rem;
      font-weight: 700;
      color: var(--loy-ink);
      margin-bottom: 6px;
      letter-spacing: -.2px;
    }
    .yloy3-reward-desc {
      font-size: .74rem;
      color: var(--loy-gray);
      line-height: 1.5;
      margin-bottom: 10px;
      flex: 1;
    }
    .yloy3-reward-pts {
      font-family: 'Syne', sans-serif;
      font-size: 1rem;
      font-weight: 800;
      margin-bottom: 12px;
      letter-spacing: -.3px;
    }
    .yloy3-reward-btn {
      width: 100%;
      padding: 9px;
      border-radius: 9px;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: .78rem;
      cursor: pointer;
      border: none;
      transition: all .2s;
    }
    .yloy3-reward-btn--afford {
      background: linear-gradient(135deg, var(--loy-green), var(--loy-green-deep));
      color: #fff;
    }
    .yloy3-reward-btn--afford:hover {
      transform: scale(1.03);
      box-shadow: 0 6px 18px rgba(26,107,58,.3);
    }
    .yloy3-reward-btn--locked {
      background: var(--loy-surface2);
      color: var(--loy-gray);
      cursor: not-allowed;
    }

    /* ━━━ PACKS GRID ━━━ */
    .yloy3-packs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 16px;
    }
    .yloy3-pack-card {
      background: var(--loy-surface);
      border: 1.5px solid var(--loy-border);
      border-radius: 14px;
      padding: 22px 18px 20px;
      text-align: center;
      cursor: pointer;
      transition: all .25s;
      position: relative;
    }
    .yloy3-pack-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--loy-shadow-hover);
      border-color: var(--loy-green);
    }
    .yloy3-pack-card--deal {
      border-color: #ff4444;
      box-shadow: 0 8px 22px rgba(255,68,68,.12);
    }
    .yloy3-pack-card--pop {
      border-color: var(--loy-yellow);
      box-shadow: 0 8px 22px rgba(252,209,22,.12);
    }
    .yloy3-pack-badge {
      position: absolute;
      top: -10px; left: 50%;
      transform: translateX(-50%);
      padding: 4px 13px;
      border-radius: 50px;
      font-size: .66rem;
      font-weight: 800;
      letter-spacing: .04em;
      white-space: nowrap;
    }
    .yloy3-pack-badge--deal { background: #ff4444; color: #fff; }
    .yloy3-pack-badge--pop  { background: var(--loy-yellow); color: #0d1f14; }
    .yloy3-pack-badge--new  { background: var(--loy-green); color: #fff; }
    .yloy3-pack-emoji-wrap {
      width: 72px; height: 72px;
      border-radius: 18px;
      margin: 0 auto 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.2rem;
    }
    .yloy3-pack-title {
      font-family: 'Syne', sans-serif;
      font-size: .92rem;
      color: var(--loy-gray);
      font-weight: 600;
      margin-bottom: 4px;
    }
    .yloy3-pack-pts {
      font-family: 'Syne', sans-serif;
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--loy-ink);
      letter-spacing: -.5px;
      margin-bottom: 4px;
    }
    .yloy3-pack-bonus {
      display: inline-block;
      background: rgba(245,158,11,.14);
      color: var(--loy-gold);
      padding: 3px 10px;
      border-radius: 50px;
      font-size: .68rem;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .yloy3-pack-price {
      font-family: 'Syne', sans-serif;
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--loy-green);
      margin-bottom: 3px;
    }
    .yloy3-pack-unit {
      font-size: .68rem;
      color: var(--loy-gray);
      margin-bottom: 12px;
    }
    .yloy3-pack-buy {
      background: linear-gradient(135deg, var(--loy-green), var(--loy-green-deep));
      color: #fff;
      padding: 9px 14px;
      border-radius: 9px;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: .78rem;
    }

    /* ━━━ HISTORY ━━━ */
    .yloy3-history {
      background: var(--loy-surface);
      border: 1px solid var(--loy-border);
      border-radius: 14px;
      overflow: hidden;
    }
    .yloy3-history-row {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 14px;
      align-items: center;
      padding: 14px 18px;
      border-bottom: 1px solid var(--loy-border);
      transition: background .15s;
    }
    .yloy3-history-row:last-child { border-bottom: none; }
    .yloy3-history-row:hover { background: var(--loy-surface2); }
    .yloy3-history-ico {
      width: 38px; height: 38px;
      border-radius: 10px;
      background: var(--loy-surface2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
    }
    .yloy3-history-title {
      font-weight: 700;
      font-size: .85rem;
      color: var(--loy-ink);
      margin-bottom: 2px;
    }
    .yloy3-history-sub {
      font-size: .72rem;
      color: var(--loy-gray);
    }
    .yloy3-history-pts { text-align: right; }
    .yloy3-history-amt {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1rem;
      letter-spacing: -.3px;
    }
    .yloy3-history-amt--gain { color: var(--loy-green); }
    .yloy3-history-amt--loss { color: #ce1126; }
    .yloy3-history-date {
      font-size: .65rem;
      color: var(--loy-gray);
      margin-top: 2px;
    }

    /* ━━━ CODES ━━━ */
    .yloy3-codes-title {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1.1rem;
      margin: 32px 0 14px;
      color: var(--loy-ink);
    }
    .yloy3-codes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 12px;
    }
    .yloy3-code-card {
      background: linear-gradient(135deg, #fff9e6, #fff);
      border: 1.5px dashed var(--loy-gold);
      border-radius: 11px;
      padding: 14px;
    }
    .yloy3-code-name {
      font-size: .72rem;
      color: var(--loy-gray);
      margin-bottom: 5px;
    }
    .yloy3-code-val {
      font-family: 'JetBrains Mono', 'Courier New', monospace;
      font-size: 1rem;
      font-weight: 800;
      color: var(--loy-ink);
      background: rgba(252,209,22,.14);
      padding: 6px 10px;
      border-radius: 7px;
      text-align: center;
      letter-spacing: .08em;
      margin-bottom: 7px;
    }
    .yloy3-code-meta {
      display: flex;
      justify-content: space-between;
      font-size: .65rem;
      color: var(--loy-gray);
    }

    /* ━━━ PARRAINAGE ━━━ */
    .yloy3-referral {
      background: linear-gradient(135deg, #1a3a24 0%, #0d3320 100%);
      border-radius: 20px;
      padding: 36px 32px;
      color: #fff;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 36px;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    .yloy3-referral::before {
      content: '👥';
      position: absolute;
      top: -20px; right: -10px;
      font-size: 10rem;
      opacity: .04;
      pointer-events: none;
    }
    .yloy3-referral-left { position: relative; z-index: 2; }
    .yloy3-referral-right { position: relative; z-index: 2; }
    .yloy3-sub--on-dark {
      color: rgba(255,255,255,.75);
    }
    .yloy3-sub--on-dark strong { color: var(--loy-yellow); }
    .yloy3-referral-lbl {
      display: block;
      font-size: .72rem;
      color: rgba(255,255,255,.6);
      font-weight: 600;
      margin-bottom: 6px;
    }
    .yloy3-referral-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 8px;
    }
    .yloy3-referral-inp {
      flex: 1;
      min-width: 200px;
      padding: 12px 14px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,.15);
      background: rgba(0,0,0,.25);
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      font-size: .82rem;
      outline: none;
    }
    .yloy3-referral-meta {
      font-size: .7rem;
      color: rgba(255,255,255,.55);
      line-height: 1.5;
    }

    /* ━━━ NEWSLETTER ━━━ */
    .yloy3-nl {
      background: linear-gradient(135deg, var(--loy-green-pale, #e8f5e9) 0%, #fff9e6 100%);
      border: 1.5px solid var(--loy-green-light, #86efac);
      border-radius: 20px;
      padding: 40px 28px;
      text-align: center;
      max-width: 720px;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
    }
    .yloy3-nl::before {
      content: '';
      position: absolute;
      top: -50%; left: 50%;
      transform: translateX(-50%);
      width: 300px; height: 300px;
      background: radial-gradient(circle, rgba(26,107,58,.06), transparent 70%);
      border-radius: 50%;
      pointer-events: none;
    }
    .yloy3-nl-ico {
      font-size: 3rem;
      margin-bottom: 10px;
      position: relative;
      z-index: 2;
    }
    .yloy3-nl-form {
      display: flex;
      gap: 10px;
      max-width: 460px;
      margin: 24px auto 14px;
      flex-wrap: wrap;
      justify-content: center;
      position: relative;
      z-index: 2;
    }
    .yloy3-nl-input {
      flex: 1;
      min-width: 220px;
      padding: 13px 16px;
      border-radius: 11px;
      border: 1.5px solid var(--loy-border);
      background: #fff;
      color: var(--loy-ink);
      font-family: 'DM Sans', sans-serif;
      font-size: .88rem;
      outline: none;
      transition: border-color .2s;
    }
    .yloy3-nl-input:focus { border-color: var(--loy-green); }
    .yloy3-nl-note {
      font-size: .72rem;
      color: var(--loy-gray);
      position: relative;
      z-index: 2;
    }
    .yloy3-lead--center { text-align: center; }
    .yloy3-h2--center { text-align: center; }

    /* ━━━ FAQ ━━━ */
    .yloy3-faq {
      max-width: 760px;
      margin: 0 auto;
    }
    .yloy3-faq-item {
      background: var(--loy-surface);
      border: 1px solid var(--loy-border);
      border-radius: 12px;
      margin-bottom: 10px;
      overflow: hidden;
      transition: all .2s;
    }
    .yloy3-faq-item:hover { border-color: var(--loy-green); }
    .yloy3-faq-item[open] {
      box-shadow: var(--loy-shadow);
      border-color: var(--loy-green);
    }
    .yloy3-faq-item summary {
      padding: 16px 20px;
      cursor: pointer;
      font-weight: 700;
      font-size: .9rem;
      color: var(--loy-ink);
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 14px;
      transition: color .2s;
    }
    .yloy3-faq-item summary::after {
      content: '+';
      font-family: 'Syne', sans-serif;
      font-size: 1.6rem;
      color: var(--loy-green);
      transition: transform .25s;
      flex-shrink: 0;
    }
    .yloy3-faq-item[open] summary::after {
      transform: rotate(45deg);
    }
    .yloy3-faq-item p {
      padding: 0 20px 18px;
      font-size: .85rem;
      color: var(--loy-gray);
      line-height: 1.75;
      margin: 0;
    }

    /* ━━━ CTA FINAL ━━━ */
    .yloy3-final {
      background: linear-gradient(135deg, #1a3a24 0%, #0d3320 100%);
      border-radius: 20px;
      padding: 48px 32px;
      color: #fff;
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 28px;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    .yloy3-final::before {
      content: '🎁';
      position: absolute;
      top: 50%;
      right: -20px;
      transform: translateY(-50%);
      font-size: 12rem;
      opacity: .05;
      pointer-events: none;
    }
    .yloy3-final-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: flex-end;
      position: relative;
      z-index: 2;
    }

    /* ━━━ EMPTY / LOADING ━━━ */
    .yloy3-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 60px 20px;
      color: var(--loy-gray);
    }
    .yloy3-spinner {
      width: 22px; height: 22px;
      border: 3px solid var(--loy-border);
      border-top-color: var(--loy-green);
      border-radius: 50%;
      animation: yloy3Spin .7s linear infinite;
    }
    @keyframes yloy3Spin { to { transform: rotate(360deg); } }
    .yloy3-empty {
      text-align: center;
      padding: 50px 20px;
      background: var(--loy-surface);
      border: 1.5px dashed var(--loy-border);
      border-radius: 14px;
    }
    .yloy3-empty-ico {
      font-size: 3rem;
      margin-bottom: 10px;
      opacity: .6;
    }
    .yloy3-empty p {
      color: var(--loy-gray);
      font-size: .88rem;
      line-height: 1.65;
      margin: 0 auto 8px;
      max-width: 380px;
    }

    /* ━━━ RESPONSIVE ━━━ */
    @media (max-width: 900px) {
      .yloy3-hero { padding: 40px 18px 56px; }
      .yloy3-hero-inner { grid-template-columns: 1fr; gap: 36px; }
      .yloy3-vipcard { transform: rotate(0); max-width: 340px; }
      .yloy3-vipcard:hover { transform: translateY(-4px) scale(1.02); }
      .yloy3-referral { grid-template-columns: 1fr; gap: 24px; padding: 28px 22px; }
      .yloy3-final { grid-template-columns: 1fr; gap: 22px; padding: 36px 24px; text-align: center; }
      .yloy3-final-actions { justify-content: center; }
      .yloy3-section--tinted { padding: 40px 18px; }
    }
    @media (max-width: 500px) {
      .yloy3-hero { padding: 36px 16px 50px; }
      .yloy3-h1 { font-size: 1.85rem; }
      .yloy3-perks { grid-template-columns: 1fr; }
      .yloy3-ctas { flex-direction: column; align-items: stretch; }
      .yloy3-btn { width: 100%; text-align: center; }
      .yloy3-section, .yloy3-section--tinted { padding-left: 16px; padding-right: 16px; }
    }
  `;

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>

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

      <div className="yorix-loy-v3 anim">
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* HERO PREMIUM                       */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="yloy3-hero">
          <div className="yloy3-hero-inner">
            <div>
              <span className="yloy3-eyebrow">
                <span className="yloy3-eyebrow-dot" /> Yorix Rewards · Programme fidélité
              </span>

              <h1 className="yloy3-h1">
                Plus vous achetez,<br/>
                <em>plus vous gagnez.</em>
              </h1>

              <p className="yloy3-sub">
                Cumulez des <strong>Yorix Points</strong> à chaque achat, vente ou avis publié — puis
                échangez-les contre des réductions, livraisons offertes et avantages VIP réservés aux membres.
              </p>

              <ul className="yloy3-perks">
                <li><span>🎁</span><span><strong>+50 pts</strong> à l'inscription</span></li>
                <li><span>🚚</span><span><strong>Livraison</strong> offerte</span></li>
                <li><span>🎟️</span><span><strong>Codes promo</strong> VIP</span></li>
                <li><span>👥</span><span><strong>+100 pts</strong> par parrainage</span></li>
              </ul>

              <div className="yloy3-ctas">
                {user ? (
                  <>
                    <button className="yloy3-btn yloy3-btn--pri" onClick={() => goToTab("packs")}>
                      💎 Acheter des points
                    </button>
                    <button className="yloy3-btn yloy3-btn--sec" onClick={() => goToTab("rewards")}>
                      🎁 Échanger mes points
                    </button>
                  </>
                ) : (
                  <>
                    <button className="yloy3-btn yloy3-btn--pri" onClick={openRegister}>
                      🚀 Créer mon compte — +50 pts
                    </button>
                    <button className="yloy3-btn yloy3-btn--sec" onClick={openLogin}>
                      J'ai déjà un compte
                    </button>
                  </>
                )}
              </div>

              <ul className="yloy3-trust">
                <li><span>🔐</span> Escrow sécurisé</li>
                <li><span>🇨🇲</span> Made in Cameroun</li>
                <li><span>⭐</span> +1 000 membres actifs</li>
              </ul>
            </div>

            {/* CARTE VIP */}
            <div className="yloy3-vipcard-wrap">
              <div className="yloy3-vipcard">
                <div className="yloy3-vipcard-top">
                  <div className="yloy3-vipcard-brand">
                    <div className="yloy3-vipcard-logo">Y</div>
                    <div className="yloy3-vipcard-name">
                      YORIX
                      <em>REWARDS</em>
                    </div>
                  </div>
                  <div className="yloy3-vipcard-tier">{user ? levelFr : "Or"}</div>
                </div>

                <div className="yloy3-vipcard-mid">
                  <div className="yloy3-vipcard-lbl">Points disponibles</div>
                  <div className="yloy3-vipcard-pts">
                    {user ? currentPoints.toLocaleString("fr-FR") : "1 250"}
                    <small>pts</small>
                  </div>
                  <div className="yloy3-vipcard-meta">
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
                  <div className="yloy3-vipcard-progress">
                    <div className="yloy3-vipcard-progress-bar" style={{ width: `${user ? progressPct : 65}%` }} />
                  </div>
                </div>

                <div className="yloy3-vipcard-foot">
                  <div>
                    <div className="yloy3-vipcard-flbl">Titulaire</div>
                    <div className="yloy3-vipcard-fval">
                      {(userData?.nom || user?.email?.split("@")[0] || "Membre Yorix").toString().slice(0, 20)}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="yloy3-vipcard-flbl">Membre</div>
                    <div className="yloy3-vipcard-fval">{new Date().getFullYear()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* 01 · COMMENT GAGNER                */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="yloy3-section">
          <div className="yloy3-section-head">
            <span className="yloy3-eyebrow-light">01 · Comment ça marche</span>
            <h2 className="yloy3-h2">Gagnez des points à chaque <em>action</em></h2>
            <p className="yloy3-lead">Quatre façons simples d'accumuler vos Yorix Points et de débloquer des avantages.</p>
          </div>

          <div className="yloy3-earn-grid">
            {[
              { e: "🛍️", t: "Chaque achat",   d: "Gagnez 1 point pour chaque tranche de 500 FCFA dépensée sur la marketplace.",  pts: "1 pt / 500 FCFA" },
              { e: "💰", t: "Chaque vente",   d: "Côté vendeur : 1 point pour chaque tranche de 500 FCFA vendue, escrow inclus.", pts: "1 pt / 500 FCFA" },
              { e: "⭐", t: "Avis publié",   d: "Aidez la communauté : un avis détaillé sur un produit ou un service rapporte des points.", pts: "+10 à +30 pts" },
              { e: "👥", t: "Parrainage",     d: "Invitez un proche : à chaque inscription parrainée, vous gagnez un bonus.",                pts: "+100 pts" },
            ].map((w) => (
              <article key={w.t} className="yloy3-earn-card">
                <div className="yloy3-earn-emoji">{w.e}</div>
                <h3 className="yloy3-earn-t">{w.t}</h3>
                <p className="yloy3-earn-d">{w.d}</p>
                <span className="yloy3-earn-pts">{w.pts}</span>
              </article>
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* 02 · NIVEAUX VIP                   */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="yloy3-section--tinted">
          <div className="yloy3-section-head">
            <span className="yloy3-eyebrow-light">02 · Niveaux VIP</span>
            <h2 className="yloy3-h2">Quatre niveaux. <em>Plus vous montez, plus vous gagnez.</em></h2>
            <p className="yloy3-lead">Votre niveau évolue automatiquement en fonction de vos points cumulés. Aucun frais, aucun engagement.</p>
          </div>

          <div className="yloy3-tiers">
            {TIERS.map((t) => {
              const isCurrent = user && currentLevel === t.id;
              return (
                <article
                  key={t.id}
                  className={`yloy3-tier ${isCurrent ? "is-current" : ""}`}
                  style={{ "--tier-color": t.color, "--tier-gradient": t.gradient }}
                >
                  {isCurrent && <span className="yloy3-tier-now">Mon niveau</span>}
                  <div className="yloy3-tier-emoji">{t.emoji}</div>
                  <h3 className="yloy3-tier-name">{t.label}</h3>
                  <div className="yloy3-tier-thresh">
                    {t.threshold === 0
                      ? "Dès l'inscription"
                      : `À partir de ${t.threshold.toLocaleString("fr-FR")} pts`}
                  </div>
                  <p className="yloy3-tier-pitch">{t.pitch}</p>
                  <ul className="yloy3-tier-perks">
                    {t.perks.map((p) => (
                      <li key={p}><span>✓</span>{p}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* 03 · RÉCOMPENSES / PACKS / HISTORIQUE */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="yloy3-section" id="yloy-rewards">
          <div className="yloy3-section-head">
            <span className="yloy3-eyebrow-light">03 · Récompenses</span>
            <h2 className="yloy3-h2">Vos Yorix Points, transformés en <em>avantages réels</em></h2>
            <p className="yloy3-lead">
              {user
                ? "Choisissez vos récompenses, ou accélérez votre progression avec un pack de points."
                : "Inscrivez-vous pour voir vos points, débloquer les onglets et activer les récompenses."}
            </p>
          </div>

          {user && (
            <div className="yloy3-stats-grid">
              {[
                { icon: "🛍️", val: transactions.filter((t) => t.type === "achat").length, lbl: "Achats" },
                { icon: "💰", val: transactions.filter((t) => t.type === "vente").length, lbl: "Ventes" },
                { icon: "⭐", val: transactions.filter((t) => t.type === "avis").length,  lbl: "Avis" },
                { icon: "🎁", val: redemptions.length,                                    lbl: "Échanges" },
              ].map((s) => (
                <div key={s.lbl} className="yloy3-stat-card">
                  <div className="yloy3-stat-ico">{s.icon}</div>
                  <div className="yloy3-stat-val">{s.val}</div>
                  <div className="yloy3-stat-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
          )}

          <div className="yloy3-tabs">
            {[
              { id: "rewards", label: "🎁 Récompenses", count: rewards.length },
              { id: "packs",   label: "💎 Packs points", count: packs.length },
              { id: "history", label: "📜 Historique",   count: transactions.length },
            ].map((t) => (
              <button
                key={t.id}
                className={`yloy3-tab ${tab === t.id ? "is-active" : ""}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
                {t.count > 0 && <span className="yloy3-tab-count">({t.count})</span>}
              </button>
            ))}
          </div>

          {/* TAB : RÉCOMPENSES */}
          {tab === "rewards" && (
            loading ? (
              <div className="yloy3-loading"><div className="yloy3-spinner" />Chargement...</div>
            ) : rewards.length === 0 ? (
              <div className="yloy3-empty">
                <div className="yloy3-empty-ico">🎁</div>
                <p>Aucune récompense disponible pour le moment.</p>
              </div>
            ) : (
              <div className="yloy3-rewards-grid">
                {rewards.map((r) => {
                  const canAfford = !!user && currentPoints >= r.cout_points;
                  return (
                    <div key={r.id} className={`yloy3-reward-card ${canAfford ? "" : "is-locked"}`}>
                      {r.valeur_fcfa && (
                        <span className="yloy3-reward-val-badge">{r.valeur_fcfa.toLocaleString("fr-FR")} F</span>
                      )}
                      <div className="yloy3-reward-icon" style={{ background: r.color_bg }}>{r.emoji}</div>
                      <div className="yloy3-reward-name">{r.nom}</div>
                      {r.description && <div className="yloy3-reward-desc">{r.description}</div>}
                      <div className="yloy3-reward-pts" style={{ color: canAfford ? "var(--loy-green)" : "var(--loy-gray)" }}>
                        {r.cout_points.toLocaleString("fr-FR")} pts
                      </div>
                      <button
                        className={`yloy3-reward-btn ${canAfford ? "yloy3-reward-btn--afford" : "yloy3-reward-btn--locked"}`}
                        onClick={() => (user ? setSelectedReward(r) : openRegister())}
                      >
                        {!user
                          ? "S'inscrire"
                          : canAfford
                            ? "Échanger"
                            : `Encore ${(r.cout_points - currentPoints).toLocaleString("fr-FR")} pts`}
                      </button>
                    </div>
                  );
                })}
              </div>
            )
          )}

          {/* TAB : PACKS */}
          {tab === "packs" && (
            loading ? (
              <div className="yloy3-loading"><div className="yloy3-spinner" />Chargement...</div>
            ) : packs.length === 0 ? (
              <div className="yloy3-empty">
                <div className="yloy3-empty-ico">💎</div>
                <p>Aucun pack disponible pour le moment.</p>
              </div>
            ) : (
              <div className="yloy3-packs-grid">
                {packs.map((p) => {
                  const bonus = p.bonus_pct ? Math.round((p.points * p.bonus_pct) / 100) : 0;
                  const total = p.points + bonus;
                  const accent = packCardAccentClass(p.badge);
                  return (
                    <div
                      key={p.id}
                      role="button"
                      tabIndex={0}
                      className={`yloy3-pack-card ${accent}`.trim()}
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
                        <span className={`yloy3-pack-badge ${packBadgeClass(p.badge)}`}>{packBadgeLabel(p.badge)}</span>
                      )}
                      <div className="yloy3-pack-emoji-wrap" style={{ background: p.color_bg }}>{p.emoji}</div>
                      <div className="yloy3-pack-title">Pack {p.nom}</div>
                      <div className="yloy3-pack-pts">{total.toLocaleString("fr-FR")} pts</div>
                      {bonus > 0 && (
                        <div className="yloy3-pack-bonus">+{bonus} pts bonus (+{p.bonus_pct}%)</div>
                      )}
                      <div className="yloy3-pack-price">{p.prix_fcfa.toLocaleString("fr-FR")} FCFA</div>
                      <div className="yloy3-pack-unit">{(p.prix_fcfa / total).toFixed(1)} FCFA / pt</div>
                      <div className="yloy3-pack-buy">{user ? "Acheter" : "Créer un compte"}</div>
                    </div>
                  );
                })}
              </div>
            )
          )}

          {/* TAB : HISTORIQUE */}
          {tab === "history" && (
            !user ? (
              <div className="yloy3-empty">
                <div className="yloy3-empty-ico">📜</div>
                <p>Créez un compte pour suivre l'historique de vos points.</p>
                <div style={{ marginTop: 14, display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
                  <button className="yloy3-btn yloy3-btn--pri" onClick={openRegister}>Créer mon compte</button>
                  <button className="yloy3-btn yloy3-btn--ghost" onClick={openLogin}>Me connecter</button>
                </div>
              </div>
            ) : loading ? (
              <div className="yloy3-loading"><div className="yloy3-spinner" />Chargement...</div>
            ) : transactions.length === 0 ? (
              <div className="yloy3-empty">
                <div className="yloy3-empty-ico">📜</div>
                <p>Aucune transaction pour l'instant.</p>
                <p style={{ fontSize: ".78rem", marginTop: 8 }}>
                  Passez une commande ou laissez un avis pour voir vos points apparaître ici.
                </p>
              </div>
            ) : (
              <div className="yloy3-history">
                {transactions.map((t) => {
                  const info = typeLabels[t.type] || { label: t.type, emoji: "💫", color: "var(--loy-gray)" };
                  const isGain = t.points > 0;
                  return (
                    <div key={t.id} className="yloy3-history-row">
                      <div className="yloy3-history-ico">{info.emoji}</div>
                      <div>
                        <div className="yloy3-history-title">{info.label}</div>
                        <div className="yloy3-history-sub">
                          {t.description || "—"}
                          {t.montant_fcfa ? ` · ${t.montant_fcfa.toLocaleString("fr-FR")} FCFA` : ""}
                        </div>
                      </div>
                      <div className="yloy3-history-pts">
                        <div className={`yloy3-history-amt ${isGain ? "yloy3-history-amt--gain" : "yloy3-history-amt--loss"}`}>
                          {isGain ? "+" : ""}{t.points.toLocaleString("fr-FR")}
                        </div>
                        <div className="yloy3-history-date">
                          {new Date(t.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          )}

          {/* CODES RÉCOMPENSES */}
          {user && tab === "rewards" && redemptions.length > 0 && (
            <div>
              <div className="yloy3-codes-title">🎟️ Mes codes récompenses actifs</div>
              <div className="yloy3-codes-grid">
                {redemptions.map((r) => (
                  <div key={r.id} className="yloy3-code-card">
                    <div className="yloy3-code-name">{r.reward_nom}</div>
                    <div className="yloy3-code-val">{r.code}</div>
                    <div className="yloy3-code-meta">
                      <span>Statut : {r.status}</span>
                      <span>{r.expire_at ? `Exp. ${new Date(r.expire_at).toLocaleDateString("fr-FR")}` : ""}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* 04 · PARRAINAGE                    */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="yloy3-section">
          <div className="yloy3-referral">
            <div className="yloy3-referral-left">
              <span className="yloy3-eyebrow">04 · Parrainage</span>
              <h2 className="yloy3-h2 yloy3-h2--on-dark">
                Invitez un proche,<br/><em>gagnez 100 pts.</em>
              </h2>
              <p className="yloy3-sub yloy3-sub--on-dark">
                Partagez votre lien : à chaque inscription validée, vous recevez <strong>100 points</strong> de bonus
                — et votre filleul démarre avec <strong>50 points offerts</strong>.
              </p>
            </div>

            <div className="yloy3-referral-right">
              <label className="yloy3-referral-lbl" htmlFor="yloy3-ref-code">Votre lien de parrainage</label>
              <div className="yloy3-referral-row">
                <input
                  id="yloy3-ref-code"
                  type="text"
                  readOnly
                  className="yloy3-referral-inp"
                  value={`https://yorix.cm/?ref=${referralCode}`}
                  onFocus={(e) => e.target.select()}
                />
                <button
                  className="yloy3-btn yloy3-btn--pri"
                  onClick={user ? copyReferral : openRegister}
                >
                  {user ? (refCopied ? "Copié ✓" : "Copier") : "Activer"}
                </button>
              </div>
              <div className="yloy3-referral-meta">
                {user
                  ? "💡 Partagez par WhatsApp, SMS ou email — vos points sont crédités automatiquement."
                  : "🔐 Créez un compte pour activer votre lien personnel de parrainage."}
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* 05 · NEWSLETTER                    */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="yloy3-section">
          <div className="yloy3-nl">
            <div className="yloy3-nl-ico">📬</div>
            <h2 className="yloy3-h2 yloy3-h2--center">
              Restez informé(e) des <em>offres VIP</em>
            </h2>
            <p className="yloy3-lead yloy3-lead--center">
              Recevez en avant-première les codes promo, les ventes flash et les nouvelles récompenses du programme.
            </p>

            <form className="yloy3-nl-form" onSubmit={submitNewsletter} noValidate>
              <input
                type="email"
                className="yloy3-nl-input"
                placeholder="votre@email.com"
                value={nlEmail}
                onChange={(e) => setNlEmail(e.target.value)}
                aria-label="Adresse email pour la newsletter"
                required
              />
              <button type="submit" className="yloy3-btn yloy3-btn--pri">
                {nlSent ? "Inscrit ✓" : "Je m'abonne 🚀"}
              </button>
            </form>

            <div className="yloy3-nl-note">
              {nlSent
                ? "🎉 Merci ! Vérifiez votre boîte mail pour confirmer."
                : "🔒 Pas de spam · désinscription en un clic · conforme RGPD"}
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* 06 · FAQ                           */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="yloy3-section">
          <div className="yloy3-section-head">
            <span className="yloy3-eyebrow-light">06 · Questions fréquentes</span>
            <h2 className="yloy3-h2">Tout savoir sur <em>Yorix Rewards</em></h2>
          </div>

          <div className="yloy3-faq">
            {[
              { q: "Comment fonctionne le programme Yorix Rewards ?",
                a: "Chaque action (achat, vente, avis, parrainage) vous rapporte des points. Vous échangez ensuite ces points contre des récompenses — codes promo, livraisons offertes, bons d'achat — directement depuis cette page." },
              { q: "Combien de points par achat ?",
                a: "Vous gagnez 1 point pour chaque tranche de 500 FCFA dépensée sur la marketplace, paiement validé. Les avantages VIP (Or, Platine) augmentent ce cashback." },
              { q: "Comment monter de niveau ?",
                a: "Votre niveau évolue automatiquement selon votre total cumulé de points : 500 pour Argent, 1 000 pour Or, 5 000 pour Platine. Aucun engagement ni frais." },
              { q: "Mes points expirent-ils ?",
                a: "Non, vos points restent valables tant que votre compte est actif. Les codes promo générés à l'échange peuvent avoir une date d'expiration indiquée sur le code." },
              { q: "Le parrainage, comment ça marche ?",
                a: "Vous partagez votre lien personnel. Dès qu'un filleul s'inscrit et passe une première commande, vous recevez automatiquement 100 points bonus." },
              { q: "Puis-je acheter des points directement ?",
                a: "Oui ! Via les packs Yorix Points, vous pouvez acheter des points à prix dégressif. Idéal pour accélérer votre montée en niveau ou échanger immédiatement contre des récompenses." },
            ].map((f, i) => (
              <details className="yloy3-faq-item" key={i}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* CTA FINAL                          */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {!user && (
          <section className="yloy3-section">
            <div className="yloy3-final">
              <div>
                <h2 className="yloy3-h2 yloy3-h2--on-dark">Rejoignez Yorix Rewards aujourd'hui</h2>
                <p className="yloy3-sub yloy3-sub--on-dark">
                  Inscription <strong>gratuite</strong> · +50 points offerts · 30 secondes chrono.
                </p>
              </div>
              <div className="yloy3-final-actions">
                <button className="yloy3-btn yloy3-btn--pri" onClick={openRegister}>
                  🚀 Créer mon compte
                </button>
                <button className="yloy3-btn yloy3-btn--sec" onClick={openLogin}>
                  Me connecter
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
