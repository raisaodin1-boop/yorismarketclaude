// ═══════════════════════════════════════════════════════════════
//  YORIX CM — YORIX JOURNAL (Blog) PREMIUM v3
//  ✅ Hero magazine spectaculaire avec article à la une intégré
//  ✅ Catégories pills premium avec icônes & couleurs dédiées
//  ✅ Grille articles type Forbes/Medium/Shopify
//  ✅ Section guides pratiques (sélection éditoriale)
//  ✅ Section autorité éditoriale (4 piliers)
//  ✅ Newsletter premium avec gradient riche
//  ✅ CTA contribution / partenariat
//  ✅ Recherche full-text titre/excerpt/tags
//  ✅ CSS premium scopé intégré (cohérent avec LoyaltyPage v3)
// ═══════════════════════════════════════════════════════════════

import { useMemo, useState } from "react";
import { BLOG_DATA } from "../lib/constants";
import { supabase } from "../lib/supabase";

// ─────────────────────────────────────────────────────────────
// CONSTANTES
// ─────────────────────────────────────────────────────────────
const CATEGORY_META = {
  BUSINESS:     { icon: "📈", color: "#1565c0", pitch: "Stratégies, lancement, croissance" },
  LOCAL:        { icon: "🌿", color: "#1a6b3a", pitch: "Produits locaux, terroir & export" },
  PAIEMENT:     { icon: "💳", color: "#b45309", pitch: "Mobile money, fintech, escrow" },
  LIVRAISON:    { icon: "🚚", color: "#ea580c", pitch: "Yorix Ride, logistique, suivi" },
  "SÉCURITÉ":   { icon: "🔐", color: "#7c3aed", pitch: "Escrow, anti-arnaque, confiance" },
  PRESTATAIRES: { icon: "⚡", color: "#dc2626", pitch: "Services à domicile, BTP, beauté" },
  MODE:         { icon: "👗", color: "#db2777", pitch: "Style camerounais, wax, tendances" },
  "CARRIÈRE":   { icon: "🏍️", color: "#0891b2", pitch: "Devenir vendeur, livreur, freelance" },
};

const EDITORIAL_PILLARS = [
  { e: "🇨🇲", t: "100 % camerounais",  d: "Rédigé par des journalistes basés à Douala et Yaoundé, sur le terrain." },
  { e: "✅", t: "Faits vérifiés",       d: "Sources publiques, partenaires officiels, chiffres horodatés." },
  { e: "🧭", t: "Actionnable",          d: "Chaque guide se termine par une étape concrète à exécuter aujourd'hui." },
  { e: "🛡️", t: "Indépendant",         d: "Pas d'advertorial déguisé — la transparence éditoriale d'abord." },
];

const GUIDE_HIGHLIGHTS = ["BUSINESS", "SÉCURITÉ", "LIVRAISON"];

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
function openExternal(url) {
  if (!url) return;
  window.open(url, "_blank", "noopener,noreferrer");
}

// ─────────────────────────────────────────────────────────────
// COMPOSANT : CARTE ARTICLE
// ─────────────────────────────────────────────────────────────
function ArticleCard({ p, size = "normal" }) {
  const meta = CATEGORY_META[p.cat] || { icon: p.emoji, color: "#1a6b3a" };
  return (
    <article
      className={`yblog3-card yblog3-card--${size}`}
      role="link"
      tabIndex={0}
      onClick={() => openExternal(p.external_url)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openExternal(p.external_url);
        }
      }}
    >
      <div className="yblog3-card-media" style={{ background: p.color_bg || "#e8f5e9" }}>
        {p.image ? (
          <img
            src={p.image}
            alt=""
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        ) : (
          <span className="yblog3-card-emoji" aria-hidden>{p.emoji}</span>
        )}
        <span className="yblog3-card-cat" style={{ "--cat-color": meta.color }}>
          <span aria-hidden>{meta.icon}</span> {p.cat}
        </span>
        <span className="yblog3-card-read"><span aria-hidden>⏱</span> {p.read}</span>
      </div>
      <div className="yblog3-card-body">
        <h3 className="yblog3-card-title">{p.title}</h3>
        <p className="yblog3-card-ex">{p.excerpt}</p>
        {p.tags && p.tags.length > 0 && (
          <div className="yblog3-tags">
            {p.tags.slice(0, 3).map((t) => (
              <span key={t} className="yblog3-tag-sm">#{t}</span>
            ))}
          </div>
        )}
        <div className="yblog3-card-foot">
          <div className="yblog3-author">
            <div className="yblog3-av" aria-hidden>{p.author_avatar || "Y"}</div>
            <div className="yblog3-author-text">
              <div className="yblog3-an">{p.author}</div>
              <div className="yblog3-ad">{p.date}</div>
            </div>
          </div>
          <span className="yblog3-read-hint" aria-hidden>Lire <span>→</span></span>
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────
// BREADCRUMB INLINE (zéro dépendance)
// ─────────────────────────────────────────────────────────────
function InlineBreadcrumb({ items }) {
  return (
    <nav className="yblog3-bc" aria-label="Fil d'ariane">
      {items.map((it, i) => (
        <span key={i} className="yblog3-bc-item">
          {it.onClick ? (
            <button type="button" onClick={it.onClick}>{it.label}</button>
          ) : (
            <span className="yblog3-bc-current">{it.label}</span>
          )}
          {i < items.length - 1 && <span className="yblog3-bc-sep" aria-hidden>›</span>}
        </span>
      ))}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────────────────────
export function BlogPage({ blogFilter, setBlogFilter, nlEmail, setNlEmail, nlSent, setNlSent, goPage }) {
  const [query, setQuery] = useState("");

  // Liste des catégories disponibles
  const categoryOrder = useMemo(
    () => Array.from(new Set(BLOG_DATA.map((p) => p.cat))),
    []
  );

  // Comptes par catégorie
  const counts = useMemo(() => {
    const map = { TOUT: BLOG_DATA.length };
    BLOG_DATA.forEach((p) => { map[p.cat] = (map[p.cat] || 0) + 1; });
    return map;
  }, []);

  // Articles filtrés
  const filteredAll = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BLOG_DATA
      .filter((p) => blogFilter === "TOUT" || p.cat === blogFilter)
      .filter((p) => !q
        || p.title.toLowerCase().includes(q)
        || p.excerpt.toLowerCase().includes(q)
        || (p.tags || []).some((t) => t.toLowerCase().includes(q))
      );
  }, [blogFilter, query]);

  // Article à la une
  const featured = useMemo(() => {
    return (
      BLOG_DATA.find((p) => p.featured && (blogFilter === "TOUT" || p.cat === blogFilter)) ||
      filteredAll[0] ||
      BLOG_DATA[0]
    );
  }, [blogFilter, filteredAll]);

  // Grille (sans le featured si vue "TOUT")
  const gridArticles = useMemo(() => {
    if (blogFilter === "TOUT" && !query) {
      return filteredAll.filter((p) => p.id !== featured?.id);
    }
    return filteredAll;
  }, [filteredAll, featured, blogFilter, query]);

  // Guides
  const guideArticles = useMemo(() => {
    return BLOG_DATA.filter((p) => GUIDE_HIGHLIGHTS.includes(p.cat)).slice(0, 3);
  }, []);

  const submitNewsletter = async () => {
    if (!nlEmail || !nlEmail.includes("@")) return;
    try {
      await supabase.from("newsletter").insert({ email: nlEmail });
    } catch (e) {
      console.warn(e?.message);
    }
    setNlSent(true);
  };

  const featMeta = featured
    ? (CATEGORY_META[featured.cat] || { icon: featured.emoji, color: "#1a6b3a" })
    : null;

  // ─────────────────────────────────────────────────────────────
  // CSS PREMIUM INTÉGRÉ
  // ─────────────────────────────────────────────────────────────
  const css = `
    .yorix-blog-v3 {
      --jb-green: #1a6b3a;
      --jb-green-deep: #0d4d28;
      --jb-green-pale: #e8f5e9;
      --jb-green-light: #86efac;
      --jb-yellow: #fcd116;
      --jb-gold: #f59e0b;
      --jb-ink: var(--ink, #111);
      --jb-gray: var(--gray, #666);
      --jb-surface: var(--surface, #fff);
      --jb-surface2: var(--surface2, #f8f8f8);
      --jb-border: var(--border, #e5e5e5);
      --jb-radius: 16px;
      --jb-shadow: 0 12px 30px rgba(0,0,0,.08);
      --jb-shadow-hover: 0 22px 50px rgba(0,0,0,.14);

      font-family: 'DM Sans', sans-serif;
      color: var(--jb-ink);
    }
    .yorix-blog-v3 * { box-sizing: border-box; }

    /* ━━━ BREADCRUMB ━━━ */
    .yblog3-bc {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      margin-bottom: 20px;
      font-size: .76rem;
    }
    .yblog3-bc-item { display: inline-flex; align-items: center; gap: 6px; }
    .yblog3-bc button {
      background: none;
      border: none;
      color: rgba(255,255,255,.65);
      cursor: pointer;
      padding: 0;
      font-family: inherit;
      font-size: inherit;
      transition: color .15s;
    }
    .yblog3-bc button:hover { color: var(--jb-yellow); }
    .yblog3-bc-current { color: #fff; font-weight: 600; }
    .yblog3-bc-sep { color: rgba(255,255,255,.35); font-size: .9rem; }

    /* ━━━ HERO MAGAZINE PREMIUM ━━━ */
    .yblog3-hero {
      position: relative;
      background: linear-gradient(135deg, #0a1410 0%, #1a3a24 45%, #0d3320 100%);
      color: #fff;
      padding: 56px 24px 64px;
      overflow: hidden;
      border-radius: 0 0 28px 28px;
      margin-bottom: 50px;
    }
    .yblog3-hero::before {
      content: '';
      position: absolute;
      top: -100px; right: -80px;
      width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(252,209,22,.16), transparent 65%);
      border-radius: 50%;
      pointer-events: none;
    }
    .yblog3-hero::after {
      content: '';
      position: absolute;
      bottom: -150px; left: -120px;
      width: 420px; height: 420px;
      background: radial-gradient(circle, rgba(79,209,125,.12), transparent 65%);
      border-radius: 50%;
      pointer-events: none;
    }
    .yblog3-hero-inner {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
    }
    .yblog3-hero-grid {
      display: grid;
      grid-template-columns: 1.05fr 1fr;
      gap: 44px;
      align-items: center;
    }

    .yblog3-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: rgba(252,209,22,.14);
      color: var(--jb-yellow);
      border: 1px solid rgba(252,209,22,.32);
      padding: 6px 14px;
      border-radius: 50px;
      font-size: .7rem;
      font-weight: 700;
      margin-bottom: 18px;
      letter-spacing: .04em;
    }
    .yblog3-eyebrow-dot {
      width: 7px; height: 7px;
      background: var(--jb-yellow);
      border-radius: 50%;
      box-shadow: 0 0 12px var(--jb-yellow);
      animation: yblog3Pulse 2s ease-in-out infinite;
    }
    @keyframes yblog3Pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%      { opacity: .5; transform: scale(1.4); }
    }

    .yblog3-h1 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 800;
      line-height: 1.07;
      letter-spacing: -1.5px;
      margin-bottom: 16px;
    }
    .yblog3-h1 em {
      font-style: normal;
      background: linear-gradient(135deg, #fcd116, #f59e0b);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .yblog3-sub {
      font-size: clamp(.95rem, 1.5vw, 1.05rem);
      color: rgba(255,255,255,.75);
      line-height: 1.7;
      margin-bottom: 22px;
      max-width: 520px;
    }
    .yblog3-sub strong { color: #fff; font-weight: 700; }

    /* HERO SEARCH */
    .yblog3-hero-search {
      position: relative;
      max-width: 460px;
      margin-bottom: 18px;
    }
    .yblog3-hero-search-ico {
      position: absolute;
      left: 16px; top: 50%;
      transform: translateY(-50%);
      font-size: 1rem;
      pointer-events: none;
    }
    .yblog3-hero-search input {
      width: 100%;
      padding: 12px 42px 12px 42px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,.15);
      background: rgba(255,255,255,.08);
      backdrop-filter: blur(10px);
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      font-size: .88rem;
      outline: none;
      transition: all .2s;
    }
    .yblog3-hero-search input::placeholder { color: rgba(255,255,255,.5); }
    .yblog3-hero-search input:focus {
      border-color: var(--jb-yellow);
      background: rgba(255,255,255,.12);
    }
    .yblog3-hero-search-clear {
      position: absolute;
      right: 10px; top: 50%;
      transform: translateY(-50%);
      background: rgba(255,255,255,.15);
      border: none;
      width: 24px; height: 24px;
      border-radius: 50%;
      color: #fff;
      font-size: 1rem;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .yblog3-hero-search-clear:hover { background: rgba(255,255,255,.25); }

    /* THEMES TAGS */
    .yblog3-hero-themes {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
      margin: 0 0 22px;
    }
    .yblog3-hero-themes li { display: inline-flex; }
    .yblog3-hero-theme {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.12);
      color: rgba(255,255,255,.85);
      padding: 5px 11px;
      border-radius: 50px;
      font-family: inherit;
      font-size: .72rem;
      font-weight: 600;
      cursor: pointer;
      transition: all .15s;
    }
    .yblog3-hero-theme:hover {
      background: rgba(252,209,22,.14);
      border-color: rgba(252,209,22,.32);
      color: var(--jb-yellow);
      transform: translateY(-1px);
    }

    .yblog3-hero-trust {
      display: flex;
      gap: 18px;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .yblog3-hero-trust li {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: .72rem;
      color: rgba(255,255,255,.55);
    }

    /* HERO FEATURED CARD */
    .yblog3-hero-right {
      position: relative;
      min-height: 360px;
    }
    .yblog3-hero-feat {
      background: var(--jb-surface);
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 28px 60px rgba(0,0,0,.4);
      cursor: pointer;
      transition: transform .3s cubic-bezier(.4,0,.2,1), box-shadow .3s;
      position: relative;
      z-index: 2;
    }
    .yblog3-hero-feat:hover {
      transform: translateY(-5px);
      box-shadow: 0 35px 70px rgba(0,0,0,.5);
    }
    .yblog3-hero-feat-media {
      position: relative;
      height: 220px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .yblog3-hero-feat-media img {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform .5s;
    }
    .yblog3-hero-feat:hover .yblog3-hero-feat-media img {
      transform: scale(1.05);
    }
    .yblog3-hero-feat-fallback {
      font-size: 5rem;
      opacity: .5;
    }
    .yblog3-hero-feat-pin {
      position: absolute;
      top: 14px; left: 14px;
      background: var(--jb-yellow);
      color: #0d1f14;
      padding: 5px 12px;
      border-radius: 50px;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .68rem;
      letter-spacing: .04em;
      box-shadow: 0 6px 18px rgba(252,209,22,.4);
      animation: yblog3Wave 3s ease-in-out infinite;
    }
    @keyframes yblog3Wave {
      0%, 100% { transform: rotate(-2deg); }
      50%      { transform: rotate(2deg); }
    }
    .yblog3-hero-feat-body {
      padding: 22px 22px 20px;
    }
    .yblog3-hero-feat-kicker {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: var(--cat-color, var(--jb-green));
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .7rem;
      letter-spacing: .08em;
      margin-bottom: 9px;
    }
    .yblog3-hero-feat-title {
      font-family: 'Syne', sans-serif;
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--jb-ink);
      letter-spacing: -.4px;
      line-height: 1.25;
      margin-bottom: 8px;
    }
    .yblog3-hero-feat-ex {
      font-size: .82rem;
      color: var(--jb-gray);
      line-height: 1.6;
      margin-bottom: 14px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .yblog3-hero-feat-foot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
      border-top: 1px solid var(--jb-border);
    }

    /* SHARED AUTHOR */
    .yblog3-author {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .yblog3-av {
      width: 30px; height: 30px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--jb-green), var(--jb-green-deep));
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .78rem;
    }
    .yblog3-an {
      font-size: .74rem;
      font-weight: 700;
      color: var(--jb-ink);
      line-height: 1.2;
    }
    .yblog3-ad {
      font-size: .65rem;
      color: var(--jb-gray);
      line-height: 1.3;
    }
    .yblog3-read-hint {
      font-size: .74rem;
      font-weight: 700;
      color: var(--jb-green);
      display: inline-flex;
      align-items: center;
      gap: 3px;
      transition: gap .2s;
    }
    .yblog3-read-hint span { transition: transform .2s; }
    .yblog3-card:hover .yblog3-read-hint,
    .yblog3-hero-feat:hover .yblog3-read-hint {
      gap: 6px;
    }
    .yblog3-card:hover .yblog3-read-hint span,
    .yblog3-hero-feat:hover .yblog3-read-hint span {
      transform: translateX(2px);
    }
    .yblog3-read-hint--strong { font-size: .8rem; }

    /* ━━━ SECTIONS ━━━ */
    .yblog3-section {
      max-width: 1200px;
      margin: 0 auto 56px;
      padding: 0 24px;
    }
    .yblog3-section--tinted {
      background: var(--jb-surface2);
      padding: 56px 24px;
      margin: 0 auto 56px;
      border-radius: 24px;
      max-width: 1248px;
    }
    .yblog3-section-inner { max-width: 100%; }
    .yblog3-section-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 24px;
      margin-bottom: 32px;
      flex-wrap: wrap;
    }
    .yblog3-section-head--center {
      text-align: center;
      flex-direction: column;
      align-items: center;
      max-width: 720px;
      margin: 0 auto 36px;
    }

    .yblog3-eyebrow-light {
      display: inline-block;
      background: var(--jb-surface2);
      color: var(--jb-green);
      border: 1px solid var(--jb-border);
      padding: 5px 12px;
      border-radius: 50px;
      font-size: .66rem;
      font-weight: 700;
      letter-spacing: .12em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .yblog3-h2 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(1.5rem, 3.5vw, 2.1rem);
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -1px;
      color: var(--jb-ink);
      margin-bottom: 10px;
    }
    .yblog3-h2--center { text-align: center; }
    .yblog3-h2 em {
      font-style: normal;
      color: var(--jb-green);
    }
    .yblog3-h2--on-dark { color: #fff; }
    .yblog3-h2--on-dark em {
      background: linear-gradient(135deg, #fcd116, #f59e0b);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .yblog3-h2-sm {
      font-family: 'Syne', sans-serif;
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--jb-ink);
      letter-spacing: -.4px;
    }
    .yblog3-h2-sm em { font-style: normal; color: var(--jb-green); }
    .yblog3-lead {
      font-size: .95rem;
      color: var(--jb-gray);
      line-height: 1.65;
      max-width: 600px;
    }
    .yblog3-lead--center { margin: 0 auto; }
    .yblog3-sub--on-dark { color: rgba(255,255,255,.75); }
    .yblog3-sub--on-dark strong { color: var(--jb-yellow); }

    .yblog3-section-meta {
      font-size: .82rem;
      color: var(--jb-gray);
      white-space: nowrap;
    }
    .yblog3-section-meta strong { color: var(--jb-ink); font-weight: 700; }
    .yblog3-section-q { color: var(--jb-green); font-weight: 600; }

    /* ━━━ CATÉGORIES PILLS ━━━ */
    .yblog3-cats-head {
      text-align: center;
      margin-bottom: 22px;
    }
    .yblog3-cats {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .yblog3-cat {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: var(--jb-surface);
      border: 1.5px solid var(--jb-border);
      color: var(--jb-ink);
      padding: 9px 16px;
      border-radius: 50px;
      font-family: inherit;
      font-size: .82rem;
      font-weight: 600;
      cursor: pointer;
      transition: all .2s;
    }
    .yblog3-cat:hover {
      border-color: var(--cat-color, var(--jb-green));
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(0,0,0,.06);
    }
    .yblog3-cat.is-active {
      background: var(--cat-color, var(--jb-green));
      border-color: var(--cat-color, var(--jb-green));
      color: #fff;
      box-shadow: 0 8px 22px rgba(26,107,58,.25);
    }
    .yblog3-cat-ico { font-size: 1rem; }
    .yblog3-cat-count {
      background: rgba(0,0,0,.07);
      padding: 1px 7px;
      border-radius: 50px;
      font-size: .68rem;
      font-weight: 700;
    }
    .yblog3-cat.is-active .yblog3-cat-count {
      background: rgba(255,255,255,.22);
      color: #fff;
    }

    /* ━━━ GRID ARTICLES ━━━ */
    .yblog3-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
      gap: 22px;
    }
    .yblog3-guides-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
    }

    /* ━━━ CARD ARTICLE ━━━ */
    .yblog3-card {
      background: var(--jb-surface);
      border: 1px solid var(--jb-border);
      border-radius: 14px;
      overflow: hidden;
      cursor: pointer;
      transition: all .25s;
      display: flex;
      flex-direction: column;
    }
    .yblog3-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--jb-shadow-hover);
      border-color: var(--jb-green-light);
    }
    .yblog3-card-media {
      position: relative;
      height: 190px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .yblog3-card-media img {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform .5s;
    }
    .yblog3-card:hover .yblog3-card-media img {
      transform: scale(1.06);
    }
    .yblog3-card-emoji {
      font-size: 4rem;
      opacity: .6;
    }
    .yblog3-card-cat {
      position: absolute;
      top: 11px; left: 11px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: rgba(255,255,255,.95);
      backdrop-filter: blur(10px);
      color: var(--cat-color, var(--jb-green));
      padding: 4px 11px;
      border-radius: 50px;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .62rem;
      letter-spacing: .06em;
    }
    .yblog3-card-read {
      position: absolute;
      top: 11px; right: 11px;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      background: rgba(0,0,0,.6);
      backdrop-filter: blur(10px);
      color: #fff;
      padding: 4px 9px;
      border-radius: 50px;
      font-size: .6rem;
      font-weight: 700;
    }
    .yblog3-card-body {
      padding: 16px 16px 14px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .yblog3-card-title {
      font-family: 'Syne', sans-serif;
      font-size: 1rem;
      font-weight: 800;
      color: var(--jb-ink);
      margin-bottom: 8px;
      letter-spacing: -.2px;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .yblog3-card-ex {
      font-size: .8rem;
      color: var(--jb-gray);
      line-height: 1.6;
      margin-bottom: 12px;
      flex: 1;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .yblog3-tags {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }
    .yblog3-tag-sm {
      background: var(--jb-surface2);
      color: var(--jb-gray);
      padding: 2px 8px;
      border-radius: 50px;
      font-size: .6rem;
      font-weight: 600;
    }
    .yblog3-card-foot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 11px;
      border-top: 1px solid var(--jb-border);
    }

    /* CARD GUIDE (variante plus dense) */
    .yblog3-card--guide .yblog3-card-media { height: 170px; }

    /* ━━━ AUTORITÉ ÉDITORIALE ━━━ */
    .yblog3-pillars {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
    }
    .yblog3-pillar {
      background: var(--jb-surface);
      border: 1px solid var(--jb-border);
      border-radius: 14px;
      padding: 22px 20px;
      text-align: center;
      transition: all .25s;
      position: relative;
      overflow: hidden;
    }
    .yblog3-pillar::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--jb-green), var(--jb-yellow));
      transform: scaleX(0);
      transform-origin: left;
      transition: transform .35s;
    }
    .yblog3-pillar:hover {
      transform: translateY(-4px);
      box-shadow: var(--jb-shadow);
      border-color: var(--jb-green-light);
    }
    .yblog3-pillar:hover::before { transform: scaleX(1); }
    .yblog3-pillar-emoji {
      font-size: 2.2rem;
      margin-bottom: 10px;
      display: inline-block;
      transition: transform .3s;
    }
    .yblog3-pillar:hover .yblog3-pillar-emoji {
      transform: scale(1.12) rotate(-5deg);
    }
    .yblog3-pillar h3 {
      font-family: 'Syne', sans-serif;
      font-size: .98rem;
      font-weight: 800;
      color: var(--jb-ink);
      margin-bottom: 6px;
      letter-spacing: -.2px;
    }
    .yblog3-pillar p {
      font-size: .78rem;
      color: var(--jb-gray);
      line-height: 1.6;
      margin: 0;
    }

    /* ━━━ NEWSLETTER ━━━ */
    .yblog3-nl {
      background: linear-gradient(135deg, #1a3a24 0%, #0d3320 100%);
      border-radius: 22px;
      padding: 40px 36px;
      color: #fff;
      display: grid;
      grid-template-columns: 1.1fr 1fr;
      gap: 36px;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    .yblog3-nl::before {
      content: '📬';
      position: absolute;
      top: 50%; right: 30px;
      transform: translateY(-50%);
      font-size: 11rem;
      opacity: .04;
      pointer-events: none;
    }
    .yblog3-nl-left { position: relative; z-index: 2; }
    .yblog3-nl-form { position: relative; z-index: 2; }
    .yblog3-nl-perks {
      list-style: none;
      padding: 0;
      margin: 18px 0 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .yblog3-nl-perks li {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: .82rem;
      color: rgba(255,255,255,.85);
    }
    .yblog3-nl-perks li span {
      width: 24px; height: 24px;
      background: rgba(252,209,22,.15);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: .85rem;
    }
    .yblog3-nl-lbl {
      display: block;
      font-size: .72rem;
      color: rgba(255,255,255,.6);
      font-weight: 600;
      margin-bottom: 7px;
      letter-spacing: .04em;
    }
    .yblog3-nl-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
    .yblog3-nl-inp {
      flex: 1;
      min-width: 200px;
      padding: 13px 15px;
      border-radius: 11px;
      border: 1px solid rgba(255,255,255,.15);
      background: rgba(0,0,0,.25);
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      font-size: .88rem;
      outline: none;
      transition: border-color .2s;
    }
    .yblog3-nl-inp::placeholder { color: rgba(255,255,255,.4); }
    .yblog3-nl-inp:focus { border-color: var(--jb-yellow); }
    .yblog3-nl-note {
      font-size: .72rem;
      color: rgba(255,255,255,.55);
      line-height: 1.5;
      margin: 0;
    }

    /* ━━━ CTA FINAL CONTRIBUTION ━━━ */
    .yblog3-final-cta {
      background: linear-gradient(135deg, #0a1410 0%, #1a3a24 100%);
      border-radius: 22px;
      padding: 44px 36px;
      color: #fff;
      display: grid;
      grid-template-columns: 1.3fr 1fr;
      gap: 28px;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    .yblog3-final-cta::before {
      content: '✍️';
      position: absolute;
      top: 50%; right: -10px;
      transform: translateY(-50%) rotate(-10deg);
      font-size: 11rem;
      opacity: .05;
      pointer-events: none;
    }
    .yblog3-final-cta-text { position: relative; z-index: 2; }
    .yblog3-final-cta-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: flex-end;
      position: relative;
      z-index: 2;
    }

    /* ━━━ BUTTONS ━━━ */
    .yblog3-btn {
      padding: 12px 22px;
      border-radius: 11px;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .85rem;
      cursor: pointer;
      transition: all .2s;
      border: none;
      letter-spacing: -.1px;
      white-space: nowrap;
    }
    .yblog3-btn--pri {
      background: linear-gradient(135deg, var(--jb-yellow), var(--jb-gold));
      color: #0d1f14;
      box-shadow: 0 8px 22px rgba(252,209,22,.32);
    }
    .yblog3-btn--pri:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(252,209,22,.45);
    }
    .yblog3-btn--ghost {
      background: rgba(255,255,255,.1);
      color: #fff;
      border: 1.5px solid rgba(255,255,255,.2);
      backdrop-filter: blur(10px);
    }
    .yblog3-btn--ghost:hover { background: rgba(255,255,255,.18); }
    .yblog3-btn--ghost-dark {
      background: transparent;
      color: var(--jb-ink);
      border: 1.5px solid var(--jb-border);
    }
    .yblog3-btn--ghost-dark:hover {
      background: var(--jb-surface);
      border-color: var(--jb-green);
      color: var(--jb-green);
    }
    .yblog3-nl-submit { padding: 13px 22px; }

    /* ━━━ EMPTY ━━━ */
    .yblog3-empty {
      text-align: center;
      padding: 60px 24px;
      background: var(--jb-surface);
      border: 1.5px dashed var(--jb-border);
      border-radius: 16px;
      max-width: 560px;
      margin: 0 auto;
    }
    .yblog3-empty-ico {
      font-size: 3.5rem;
      margin-bottom: 12px;
      opacity: .55;
    }
    .yblog3-empty h3 {
      font-family: 'Syne', sans-serif;
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--jb-ink);
      margin-bottom: 8px;
      letter-spacing: -.3px;
    }
    .yblog3-empty p {
      color: var(--jb-gray);
      font-size: .88rem;
      line-height: 1.6;
      margin: 0 0 18px;
    }
    .yblog3-empty-cta {
      display: flex;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    /* ━━━ RESPONSIVE ━━━ */
    @media (max-width: 960px) {
      .yblog3-hero { padding: 40px 18px 50px; }
      .yblog3-hero-grid {
        grid-template-columns: 1fr;
        gap: 32px;
      }
      .yblog3-hero-right { min-height: auto; }
      .yblog3-section-head {
        flex-direction: column;
        align-items: flex-start;
      }
      .yblog3-nl {
        grid-template-columns: 1fr;
        gap: 24px;
        padding: 30px 24px;
      }
      .yblog3-final-cta {
        grid-template-columns: 1fr;
        gap: 22px;
        padding: 32px 24px;
        text-align: center;
      }
      .yblog3-final-cta-actions { justify-content: center; }
      .yblog3-section--tinted { padding: 40px 18px; }
    }
    @media (max-width: 500px) {
      .yblog3-hero { padding: 32px 16px 44px; }
      .yblog3-h1 { font-size: 1.85rem; }
      .yblog3-grid { grid-template-columns: 1fr; gap: 16px; }
      .yblog3-section, .yblog3-section--tinted { padding-left: 16px; padding-right: 16px; }
      .yblog3-hero-feat-media { height: 180px; }
      .yblog3-nl-row { flex-direction: column; }
      .yblog3-nl-submit { width: 100%; }
      .yblog3-cats { gap: 6px; }
      .yblog3-cat { padding: 8px 12px; font-size: .76rem; }
    }
  `;

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>

      <div className="yorix-blog-v3 anim">
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* HERO MAGAZINE PREMIUM              */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <header className="yblog3-hero">
          <div className="yblog3-hero-inner">
            {typeof goPage === "function" && (
              <InlineBreadcrumb
                items={[
                  { label: "Accueil", onClick: () => goPage("home") },
                  { label: "Yorix Journal · blog officiel" },
                ]}
              />
            )}

            <div className="yblog3-hero-grid">
              <div>
                <span className="yblog3-eyebrow">
                  <span className="yblog3-eyebrow-dot" /> Yorix Journal · officiel
                </span>

                <h1 className="yblog3-h1">
                  Toute l'actualité du<br/>
                  <em>commerce camerounais</em>
                </h1>

                <p className="yblog3-sub">
                  Guides pratiques, analyses de marché, tendances et opportunités —
                  rédigés par notre équipe et des experts <strong>basés au Cameroun</strong>.
                </p>

                <form
                  className="yblog3-hero-search"
                  onSubmit={(e) => e.preventDefault()}
                  role="search"
                  aria-label="Rechercher un article"
                >
                  <span className="yblog3-hero-search-ico" aria-hidden>🔎</span>
                  <input
                    type="search"
                    placeholder="Rechercher : MoMo, livraison, escrow, wax…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Rechercher un article"
                  />
                  {query && (
                    <button
                      type="button"
                      className="yblog3-hero-search-clear"
                      aria-label="Effacer"
                      onClick={() => setQuery("")}
                    >×</button>
                  )}
                </form>

                <ul className="yblog3-hero-themes" aria-label="Thèmes éditoriaux">
                  {Object.entries(CATEGORY_META).slice(0, 5).map(([cat, m]) => (
                    <li key={cat}>
                      <button
                        type="button"
                        className="yblog3-hero-theme"
                        onClick={() => { setBlogFilter(cat); setQuery(""); }}
                      >
                        <span aria-hidden>{m.icon}</span> {cat}
                      </button>
                    </li>
                  ))}
                </ul>

                <ul className="yblog3-hero-trust" aria-label="Engagement éditorial">
                  <li><span aria-hidden>✅</span> Faits vérifiés</li>
                  <li><span aria-hidden>🇨🇲</span> Rédigé au Cameroun</li>
                  <li><span aria-hidden>📅</span> Mis à jour chaque semaine</li>
                </ul>
              </div>

              {/* Article à la une — colonne droite */}
              <div className="yblog3-hero-right">
                {featured && (
                  <article
                    className="yblog3-hero-feat"
                    role="link"
                    tabIndex={0}
                    onClick={() => openExternal(featured.external_url)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openExternal(featured.external_url);
                      }
                    }}
                    aria-label={`À la une : ${featured.title}`}
                  >
                    <div
                      className="yblog3-hero-feat-media"
                      style={{ background: featured.color_bg || "#e8f5e9" }}
                    >
                      {featured.image ? (
                        <img
                          src={featured.image}
                          alt=""
                          loading="lazy"
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                      ) : (
                        <span className="yblog3-hero-feat-fallback" aria-hidden>{featured.emoji}</span>
                      )}
                      <span className="yblog3-hero-feat-pin">⭐ À la une</span>
                    </div>
                    <div className="yblog3-hero-feat-body">
                      <span
                        className="yblog3-hero-feat-kicker"
                        style={{ "--cat-color": featMeta?.color }}
                      >
                        <span aria-hidden>{featMeta?.icon}</span> {featured.cat}
                      </span>
                      <h2 className="yblog3-hero-feat-title">{featured.title}</h2>
                      <p className="yblog3-hero-feat-ex">{featured.excerpt}</p>
                      <div className="yblog3-hero-feat-foot">
                        <div className="yblog3-author">
                          <div className="yblog3-av" aria-hidden>{featured.author_avatar || "Y"}</div>
                          <div className="yblog3-author-text">
                            <div className="yblog3-an">{featured.author}</div>
                            <div className="yblog3-ad">{featured.date} · ⏱ {featured.read}</div>
                          </div>
                        </div>
                        <span className="yblog3-read-hint yblog3-read-hint--strong" aria-hidden>
                          Lire <span>→</span>
                        </span>
                      </div>
                    </div>
                  </article>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* CATÉGORIES PREMIUM                 */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="yblog3-section">
          <div className="yblog3-cats-head">
            <span className="yblog3-eyebrow-light">Catégories éditoriales</span>
            <h2 className="yblog3-h2-sm">Choisissez votre <em>angle</em></h2>
          </div>

          <div className="yblog3-cats" role="tablist" aria-label="Filtrer par catégorie">
            <button
              type="button"
              role="tab"
              aria-selected={blogFilter === "TOUT"}
              className={`yblog3-cat${blogFilter === "TOUT" ? " is-active" : ""}`}
              onClick={() => setBlogFilter("TOUT")}
            >
              <span className="yblog3-cat-ico" aria-hidden>📚</span>
              <span className="yblog3-cat-label">Tout</span>
              <span className="yblog3-cat-count">{counts.TOUT}</span>
            </button>
            {categoryOrder.map((cat) => {
              const m = CATEGORY_META[cat] || { icon: "📰", color: "#1a6b3a" };
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={blogFilter === cat}
                  className={`yblog3-cat${blogFilter === cat ? " is-active" : ""}`}
                  style={{ "--cat-color": m.color }}
                  onClick={() => setBlogFilter(cat)}
                >
                  <span className="yblog3-cat-ico" aria-hidden>{m.icon}</span>
                  <span className="yblog3-cat-label">{cat}</span>
                  <span className="yblog3-cat-count">{counts[cat] || 0}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* DERNIERS ARTICLES                  */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="yblog3-section">
          <div className="yblog3-section-head">
            <div>
              <span className="yblog3-eyebrow-light">
                {blogFilter === "TOUT" ? "01 · Tous nos articles" : `01 · Catégorie · ${blogFilter}`}
              </span>
              <h2 className="yblog3-h2">Derniers articles</h2>
              <p className="yblog3-lead">
                Analyses, guides pratiques et tendances — sélectionnés et tenus à jour par la rédaction Yorix.
              </p>
            </div>
            <div className="yblog3-section-meta">
              <strong>{filteredAll.length}</strong> article{filteredAll.length > 1 ? "s" : ""}
              {query && <span className="yblog3-section-q"> · « {query} »</span>}
            </div>
          </div>

          {gridArticles.length === 0 ? (
            <div className="yblog3-empty">
              <div className="yblog3-empty-ico" aria-hidden>📰</div>
              <h3>Aucun article ne correspond à votre recherche.</h3>
              <p>Essayez un autre mot-clé ou parcourez toutes les catégories.</p>
              <div className="yblog3-empty-cta">
                <button
                  type="button"
                  className="yblog3-btn yblog3-btn--pri"
                  onClick={() => { setBlogFilter("TOUT"); setQuery(""); }}
                >
                  Voir tous les articles
                </button>
              </div>
            </div>
          ) : (
            <div className="yblog3-grid">
              {gridArticles.map((p) => <ArticleCard key={p.id} p={p} />)}
            </div>
          )}
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* GUIDES PRATIQUES                   */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {blogFilter === "TOUT" && !query && guideArticles.length > 0 && (
          <section className="yblog3-section--tinted">
            <div className="yblog3-section-inner">
              <div className="yblog3-section-head">
                <div>
                  <span className="yblog3-eyebrow-light">02 · Guides pratiques</span>
                  <h2 className="yblog3-h2">
                    Nos meilleurs guides pour <em>grandir</em>
                  </h2>
                  <p className="yblog3-lead">
                    Business, sécurité, livraison : les ressources que nous recommandons en priorité aux vendeurs et acheteurs.
                  </p>
                </div>
                <button
                  type="button"
                  className="yblog3-btn yblog3-btn--ghost-dark"
                  onClick={() => setBlogFilter("BUSINESS")}
                >
                  Voir tous les guides →
                </button>
              </div>

              <div className="yblog3-guides-grid">
                {guideArticles.map((p) => <ArticleCard key={p.id} p={p} size="guide" />)}
              </div>
            </div>
          </section>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* AUTORITÉ ÉDITORIALE                */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="yblog3-section">
          <div className="yblog3-section-head yblog3-section-head--center">
            <span className="yblog3-eyebrow-light">03 · Yorix Journal · l'autorité business CM</span>
            <h2 className="yblog3-h2 yblog3-h2--center">
              Une rédaction au cœur du <em>marché camerounais</em>
            </h2>
            <p className="yblog3-lead yblog3-lead--center">
              Notre mission : décrypter le commerce, la livraison et la fintech au Cameroun avec des contenus
              utiles, vérifiés et actionnables.
            </p>
          </div>

          <div className="yblog3-pillars">
            {EDITORIAL_PILLARS.map((p) => (
              <article key={p.t} className="yblog3-pillar">
                <div className="yblog3-pillar-emoji" aria-hidden>{p.e}</div>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* NEWSLETTER PREMIUM                 */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="yblog3-section">
          <div className="yblog3-nl">
            <div className="yblog3-nl-left">
              <span className="yblog3-eyebrow">
                <span className="yblog3-eyebrow-dot" /> 04 · Newsletter Yorix Journal
              </span>
              <h2 className="yblog3-h2 yblog3-h2--on-dark">
                Recevez les meilleures <em>analyses Yorix</em>
              </h2>
              <p className="yblog3-sub yblog3-sub--on-dark">
                Une newsletter par semaine · guides, données de marché, opportunités locales.
                <strong> Zéro spam, désinscription en un clic.</strong>
              </p>
              <ul className="yblog3-nl-perks">
                <li><span aria-hidden>📈</span> Analyses commerce CM</li>
                <li><span aria-hidden>🎯</span> Conseils vendeurs</li>
                <li><span aria-hidden>💎</span> Opportunités exclusives</li>
              </ul>
            </div>

            <form
              className="yblog3-nl-form"
              onSubmit={(e) => { e.preventDefault(); submitNewsletter(); }}
              noValidate
            >
              <label htmlFor="yblog3-nl-email" className="yblog3-nl-lbl">
                VOTRE EMAIL PROFESSIONNEL
              </label>
              <div className="yblog3-nl-row">
                <input
                  id="yblog3-nl-email"
                  type="email"
                  className="yblog3-nl-inp"
                  placeholder="vous@entreprise.cm"
                  value={nlEmail}
                  onChange={(e) => setNlEmail(e.target.value)}
                  required
                />
                <button type="submit" className="yblog3-btn yblog3-btn--pri yblog3-nl-submit">
                  {nlSent ? "Abonné(e) ✓" : "S'abonner 🚀"}
                </button>
              </div>
              <p className="yblog3-nl-note">
                {nlSent
                  ? "🎉 Merci ! Confirmez votre inscription depuis l'email que nous venons d'envoyer."
                  : "🔒 RGPD · vous pouvez vous désabonner à tout moment depuis chaque envoi."}
              </p>
            </form>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* CTA CONTRIBUTION / PARTENARIAT     */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="yblog3-section">
          <div className="yblog3-final-cta">
            <div className="yblog3-final-cta-text">
              <span className="yblog3-eyebrow">05 · Vous avez quelque chose à dire ?</span>
              <h2 className="yblog3-h2 yblog3-h2--on-dark">
                Devenez <em>contributeur</em><br/>ou <em>partenaire</em>
              </h2>
              <p className="yblog3-sub yblog3-sub--on-dark">
                Experts business, journalistes, prestataires : proposez un sujet, un guide, ou un partenariat
                éditorial. <strong>Nous lisons toutes les propositions sous 72 heures.</strong>
              </p>
            </div>
            <div className="yblog3-final-cta-actions">
              <button
                type="button"
                className="yblog3-btn yblog3-btn--pri"
                onClick={() => goPage?.("contact")}
              >
                ✍️ Proposer un sujet
              </button>
              <button
                type="button"
                className="yblog3-btn yblog3-btn--ghost"
                onClick={() => goPage?.("business")}
              >
                Devenir partenaire
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
