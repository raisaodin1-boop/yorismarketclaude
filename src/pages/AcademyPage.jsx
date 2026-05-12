// ═══════════════════════════════════════════════════════════════
//  YORIX CM — ACADEMY PAGE PREMIUM v3
//  ✅ Hero spectaculaire avec dashboard de progression animé
//  ✅ Parcours par catégories (Vente, Marketplace, Logistique, Business...)
//  ✅ Comment ça marche (4 étapes)
//  ✅ Grille modules premium (Coursera/Shopify Academy style)
//  ✅ Niveaux Débutant → Elite avec progress bars
//  ✅ Certificats Yorix
//  ✅ Success stories (3 témoignages)
//  ✅ FAQ + Newsletter Academy + CTA final
//  ✅ Inspiration : Shopify Academy / HubSpot / Coursera / MasterClass
// ═══════════════════════════════════════════════════════════════

import { useState, useMemo } from "react";

// ─────────────────────────────────────────────────────────────
// CONSTANTES
// ─────────────────────────────────────────────────────────────
const PARCOURS = [
  { id: "vente",       icon: "🛒",  label: "Vente terrain",     color: "#1a6b3a", desc: "WhatsApp Selling, négociation, closing" },
  { id: "marketplace", icon: "🏪",  label: "Marketplace",        color: "#f59e0b", desc: "Devenir top vendeur Yorix" },
  { id: "logistique",  icon: "🚚",  label: "Livraison",          color: "#0891b2", desc: "Optimiser tournées & coûts" },
  { id: "business",    icon: "📈",  label: "Business local",     color: "#7c3aed", desc: "Lancer, financer, scaler" },
  { id: "paiement",    icon: "💳",  label: "Paiements",          color: "#b45309", desc: "MoMo, Orange, conformité" },
  { id: "marketing",   icon: "📢",  label: "Marketing digital", color: "#db2777", desc: "Réseaux sociaux, ads, contenu" },
  { id: "whatsapp",    icon: "💬",  label: "WhatsApp Business", desc: "Automatisation, catalogues, support", color: "#22c55e" },
  { id: "diaspora",    icon: "✈️",  label: "Diaspora business", color: "#1565c0", desc: "Investir et entreprendre au CM" },
];

const NIVEAUX = [
  {
    id: "debutant",
    label: "Débutant",
    emoji: "🌱",
    color: "#22c55e",
    gradient: "linear-gradient(135deg, #4ade80, #16a34a)",
    pct: 100,
    pitch: "Bases solides pour démarrer",
    perks: ["Cours d'introduction", "Vocabulaire essentiel", "Premiers exercices"],
  },
  {
    id: "intermediaire",
    label: "Intermédiaire",
    emoji: "🚀",
    color: "#3b82f6",
    gradient: "linear-gradient(135deg, #60a5fa, #2563eb)",
    pct: 70,
    pitch: "Maîtriser les techniques clés",
    perks: ["Cas pratiques réels", "Outils avancés", "Coaching collectif"],
  },
  {
    id: "pro",
    label: "Pro",
    emoji: "💼",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #fbbf24, #d97706)",
    pct: 45,
    pitch: "Niveau opérationnel professionnel",
    perks: ["Stratégies avancées", "Études de cas CM", "Certificat Yorix"],
  },
  {
    id: "elite",
    label: "Elite",
    emoji: "💎",
    color: "#7c3aed",
    gradient: "linear-gradient(135deg, #a78bfa, #5b21b6)",
    pct: 15,
    pitch: "Sommet : business leaders & mentors",
    perks: ["Mentorat 1:1", "Réseau Yorix Pro", "Accès événements VIP"],
  },
];

const STEPS = [
  { n: "01", emoji: "🎯", t: "Choisissez", d: "Sélectionnez un parcours selon votre objectif business." },
  { n: "02", emoji: "📚", t: "Apprenez",   d: "Vidéos courtes, exercices terrain et études de cas locales." },
  { n: "03", emoji: "🛠️", t: "Pratiquez",  d: "Appliquez immédiatement sur Yorix avec coaching." },
  { n: "04", emoji: "🏆", t: "Certifiez",  d: "Recevez votre certificat Yorix Academy à partager." },
];

const STORIES = [
  {
    name: "Aminatou B.",
    role: "Vendeuse Yorix · Douala",
    avatar: "A",
    color: "#1a6b3a",
    quote: "En 3 mois après la formation WhatsApp Selling, mes ventes ont triplé. Je suis passée de 50 à 180 commandes par mois.",
    metric: "+260% ventes",
  },
  {
    name: "Junior K.",
    role: "Livreur · Yaoundé",
    avatar: "J",
    color: "#0891b2",
    quote: "La formation Yorix Ride m'a appris à optimiser mes tournées. Je gagne 15 000 FCFA de plus par semaine.",
    metric: "+60 000 F / mois",
  },
  {
    name: "Sandrine M.",
    role: "Prestataire · Bafoussam",
    avatar: "S",
    color: "#7c3aed",
    quote: "Grâce au module Business local, j'ai structuré mon offre. Aujourd'hui, j'ai 4 clients récurrents et une équipe de 3 personnes.",
    metric: "4 clients fidèles",
  },
];

const FAQ_DATA = [
  {
    q: "Les formations sont-elles vraiment gratuites ?",
    a: "Une partie de notre catalogue est 100% gratuite (cours d'introduction, bases). Les modules approfondis et certificats sont payants à partir de 5 000 FCFA. Vous pouvez tester avant d'acheter."
  },
  {
    q: "Combien de temps dure une formation ?",
    a: "Les modules courts durent 30 à 60 minutes (idéal pause déjeuner). Les parcours complets demandent 4 à 12 heures réparties sur 2 à 4 semaines, à votre rythme."
  },
  {
    q: "Comment recevoir mon certificat Yorix ?",
    a: "Terminez tous les chapitres d'une formation pro/elite + réussissez le quiz final (70%+). Votre certificat est envoyé par email sous 24h, partageable sur LinkedIn et WhatsApp."
  },
  {
    q: "Puis-je accéder aux formations sur mobile ?",
    a: "Oui, toutes les formations sont 100% mobile. Vous pouvez télécharger les supports PDF pour les consulter hors-ligne (utile en zone faible connexion)."
  },
  {
    q: "Qui sont les formateurs Yorix Academy ?",
    a: "Des entrepreneurs camerounais en activité : top vendeurs Yorix, livreurs expérimentés, experts marketing local, partenaires fintech. Tous testés sur le terrain au Cameroun."
  },
  {
    q: "Les formations sont-elles adaptées à mon niveau ?",
    a: "Chaque cours est étiqueté Débutant / Intermédiaire / Pro / Elite. Vous pouvez aussi passer un test d'orientation gratuit pour trouver le bon parcours."
  },
];

// ─────────────────────────────────────────────────────────────
// COMPOSANT BREADCRUMB INLINE
// ─────────────────────────────────────────────────────────────
function InlineBreadcrumb({ items }) {
  return (
    <nav className="yacad3-bc" aria-label="Fil d'ariane">
      {items.map((it, i) => (
        <span key={i} className="yacad3-bc-item">
          {it.onClick ? (
            <button type="button" onClick={it.onClick}>{it.label}</button>
          ) : (
            <span className="yacad3-bc-current">{it.label}</span>
          )}
          {i < items.length - 1 && <span className="yacad3-bc-sep" aria-hidden>›</span>}
        </span>
      ))}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────────────────────
export function AcademyPage({
  academyCourses = [],
  academyLoading = false,
  goAcademyDetail,
  goPage,
  user,
  userData,
  setAuthOpen,
  setAuthTab,
}) {
  const [filterCat, setFilterCat] = useState("TOUT");

  // Filtrer les cours par catégorie (DÉBUTANT/INTERMÉDIAIRE/AVANCÉ)
  const filteredCourses = useMemo(() => {
    if (filterCat === "TOUT") return academyCourses;
    return academyCourses.filter((c) => c.category === filterCat);
  }, [academyCourses, filterCat]);

  const totalStudents = academyCourses.reduce((sum, c) => sum + (c.students_count || 0), 0);
  const totalHours    = academyCourses.length * 1.5; // estimation
  const freeCount     = academyCourses.filter((c) => (c.prix || 0) === 0).length;

  const openRegister = () => { setAuthTab?.("register"); setAuthOpen?.(true); };

  const scrollToCourses = () => {
    const el = document.getElementById("yacad3-courses");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToFree = () => {
    const first = academyCourses.find((c) => (c.prix || 0) === 0);
    if (first && goAcademyDetail) goAcademyDetail(first);
    else scrollToCourses();
  };

  // ─────────────────────────────────────────────────────────────
  // CSS PREMIUM INTÉGRÉ
  // ─────────────────────────────────────────────────────────────
  const css = `
    .yorix-acad-v3 {
      --acad-green: #1a6b3a;
      --acad-green-deep: #0d4d28;
      --acad-green-pale: #e8f5e9;
      --acad-green-light: #86efac;
      --acad-yellow: #fcd116;
      --acad-gold: #f59e0b;
      --acad-purple: #7c3aed;
      --acad-blue: #2563eb;
      --acad-ink: var(--ink, #111);
      --acad-gray: var(--gray, #666);
      --acad-surface: var(--surface, #fff);
      --acad-surface2: var(--surface2, #f8f8f8);
      --acad-border: var(--border, #e5e5e5);
      --acad-shadow: 0 12px 30px rgba(0,0,0,.08);
      --acad-shadow-hover: 0 22px 50px rgba(0,0,0,.14);

      font-family: 'DM Sans', sans-serif;
      color: var(--acad-ink);
    }
    .yorix-acad-v3 * { box-sizing: border-box; }

    /* ━━━ BREADCRUMB ━━━ */
    .yacad3-bc {
      display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
      margin-bottom: 20px; font-size: .76rem;
    }
    .yacad3-bc-item { display: inline-flex; align-items: center; gap: 6px; }
    .yacad3-bc button {
      background: none; border: none; color: rgba(255,255,255,.65);
      cursor: pointer; padding: 0; font-family: inherit; font-size: inherit;
      transition: color .15s;
    }
    .yacad3-bc button:hover { color: var(--acad-yellow); }
    .yacad3-bc-current { color: #fff; font-weight: 600; }
    .yacad3-bc-sep { color: rgba(255,255,255,.35); font-size: .9rem; }

    /* ━━━ HERO ━━━ */
    .yacad3-hero {
      position: relative;
      background: linear-gradient(135deg, #0a1410 0%, #1a3a24 45%, #0d3320 100%);
      color: #fff;
      padding: 56px 24px 70px;
      overflow: hidden;
      border-radius: 0 0 28px 28px;
      margin-bottom: 50px;
    }
    .yacad3-hero::before {
      content: '';
      position: absolute;
      top: -120px; right: -100px;
      width: 460px; height: 460px;
      background: radial-gradient(circle, rgba(252,209,22,.16), transparent 65%);
      border-radius: 50%;
      pointer-events: none;
    }
    .yacad3-hero::after {
      content: '';
      position: absolute;
      bottom: -150px; left: -120px;
      width: 420px; height: 420px;
      background: radial-gradient(circle, rgba(124,58,237,.14), transparent 65%);
      border-radius: 50%;
      pointer-events: none;
    }
    .yacad3-hero-inner {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
    }
    .yacad3-hero-grid {
      display: grid;
      grid-template-columns: 1.1fr 1fr;
      gap: 44px;
      align-items: center;
    }
    .yacad3-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: rgba(252,209,22,.14);
      color: var(--acad-yellow);
      border: 1px solid rgba(252,209,22,.32);
      padding: 6px 14px;
      border-radius: 50px;
      font-size: .7rem;
      font-weight: 700;
      margin-bottom: 18px;
      letter-spacing: .04em;
    }
    .yacad3-eyebrow-dot {
      width: 7px; height: 7px;
      background: var(--acad-yellow);
      border-radius: 50%;
      box-shadow: 0 0 12px var(--acad-yellow);
      animation: yacad3Pulse 2s ease-in-out infinite;
    }
    @keyframes yacad3Pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%      { opacity: .5; transform: scale(1.4); }
    }
    .yacad3-h1 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 800;
      line-height: 1.07;
      letter-spacing: -1.5px;
      margin-bottom: 16px;
    }
    .yacad3-h1 em {
      font-style: normal;
      background: linear-gradient(135deg, #fcd116, #f59e0b);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .yacad3-sub {
      font-size: clamp(.95rem, 1.5vw, 1.05rem);
      color: rgba(255,255,255,.75);
      line-height: 1.7;
      margin-bottom: 22px;
      max-width: 520px;
    }
    .yacad3-sub strong { color: #fff; font-weight: 700; }

    .yacad3-args {
      list-style: none;
      padding: 0;
      margin: 0 0 26px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 9px;
    }
    .yacad3-args li {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,.06);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,.1);
      padding: 9px 12px;
      border-radius: 10px;
      font-size: .82rem;
      color: rgba(255,255,255,.92);
    }
    .yacad3-args li span:first-child {
      width: 26px; height: 26px;
      background: rgba(252,209,22,.18);
      border: 1px solid rgba(252,209,22,.35);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: .85rem;
      flex-shrink: 0;
    }

    .yacad3-hero-cta {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 22px;
    }

    .yacad3-hero-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      padding-top: 22px;
      border-top: 1px solid rgba(255,255,255,.1);
    }
    .yacad3-hero-stat {
      text-align: left;
    }
    .yacad3-hero-stat-val {
      font-family: 'Syne', sans-serif;
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--acad-yellow);
      letter-spacing: -.5px;
      line-height: 1;
      margin-bottom: 3px;
    }
    .yacad3-hero-stat-lbl {
      font-size: .68rem;
      color: rgba(255,255,255,.55);
      letter-spacing: .04em;
    }

    /* ━━━ HERO DASHBOARD (visuel droite) ━━━ */
    .yacad3-hero-visual {
      position: relative;
      min-height: 380px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .yacad3-dashboard {
      position: relative;
      z-index: 2;
      background: var(--acad-surface);
      border-radius: 20px;
      padding: 22px 22px;
      max-width: 380px;
      width: 100%;
      box-shadow: 0 28px 60px rgba(0,0,0,.4);
      border: 1px solid rgba(255,255,255,.1);
    }
    .yacad3-dash-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 18px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--acad-border);
    }
    .yacad3-dash-brand {
      display: flex; align-items: center; gap: 9px;
    }
    .yacad3-dash-logo {
      width: 34px; height: 34px;
      background: linear-gradient(135deg, var(--acad-yellow), var(--acad-gold));
      color: #0d1f14;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1.1rem;
    }
    .yacad3-dash-name {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .85rem;
      letter-spacing: -.2px;
      color: var(--acad-ink);
    }
    .yacad3-dash-name small {
      display: block;
      font-size: .62rem;
      color: var(--acad-gray);
      font-weight: 500;
      letter-spacing: .12em;
    }
    .yacad3-dash-badge {
      background: var(--acad-green-pale);
      color: var(--acad-green);
      padding: 4px 10px;
      border-radius: 50px;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .64rem;
      letter-spacing: .04em;
    }

    .yacad3-dash-progress-lbl {
      font-size: .68rem;
      color: var(--acad-gray);
      letter-spacing: .08em;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .yacad3-dash-progress-pct {
      font-family: 'Syne', sans-serif;
      font-size: 2rem;
      font-weight: 800;
      color: var(--acad-ink);
      letter-spacing: -.5px;
      line-height: 1;
      margin-bottom: 12px;
    }
    .yacad3-dash-progress-bar {
      height: 8px;
      background: var(--acad-surface2);
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 14px;
    }
    .yacad3-dash-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--acad-green), var(--acad-yellow));
      border-radius: 10px;
      animation: yacad3FillProgress 2s ease-out forwards;
    }
    @keyframes yacad3FillProgress {
      from { width: 0%; }
      to { width: 72%; }
    }

    .yacad3-dash-modules {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .yacad3-dash-mod {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 0;
      border-bottom: 1px solid var(--acad-border);
    }
    .yacad3-dash-mod:last-child { border-bottom: none; }
    .yacad3-dash-mod-ico {
      width: 32px; height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: .95rem;
      flex-shrink: 0;
    }
    .yacad3-dash-mod-ico--done {
      background: var(--acad-green-pale);
      color: var(--acad-green);
    }
    .yacad3-dash-mod-ico--current {
      background: rgba(252,209,22,.18);
      color: var(--acad-gold);
      border: 2px solid var(--acad-yellow);
      animation: yacad3PulseRing 2s ease-in-out infinite;
    }
    @keyframes yacad3PulseRing {
      0%, 100% { box-shadow: 0 0 0 0 rgba(252,209,22,.4); }
      50%      { box-shadow: 0 0 0 6px rgba(252,209,22,0); }
    }
    .yacad3-dash-mod-ico--locked {
      background: var(--acad-surface2);
      color: var(--acad-gray);
    }
    .yacad3-dash-mod-info {
      flex: 1;
    }
    .yacad3-dash-mod-name {
      font-size: .8rem;
      font-weight: 700;
      color: var(--acad-ink);
      line-height: 1.3;
    }
    .yacad3-dash-mod-meta {
      font-size: .64rem;
      color: var(--acad-gray);
      margin-top: 1px;
    }
    .yacad3-dash-mod-status {
      font-size: .68rem;
      font-weight: 700;
    }
    .yacad3-dash-mod-status--done { color: var(--acad-green); }
    .yacad3-dash-mod-status--current { color: var(--acad-gold); }
    .yacad3-dash-mod-status--locked { color: var(--acad-gray); }

    /* ━━━ SECTIONS ━━━ */
    .yacad3-section {
      max-width: 1200px;
      margin: 0 auto 56px;
      padding: 0 24px;
    }
    .yacad3-section--tinted {
      background: var(--acad-surface2);
      padding: 56px 24px;
      margin: 0 auto 56px;
      border-radius: 24px;
      max-width: 1248px;
    }
    .yacad3-section-head {
      text-align: center;
      max-width: 720px;
      margin: 0 auto 36px;
    }
    .yacad3-eyebrow-light {
      display: inline-block;
      background: var(--acad-surface2);
      color: var(--acad-green);
      border: 1px solid var(--acad-border);
      padding: 5px 12px;
      border-radius: 50px;
      font-size: .66rem;
      font-weight: 700;
      letter-spacing: .12em;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .yacad3-h2 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(1.5rem, 3.5vw, 2.1rem);
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -1px;
      color: var(--acad-ink);
      margin-bottom: 10px;
    }
    .yacad3-h2 em {
      font-style: normal;
      color: var(--acad-green);
    }
    .yacad3-h2--on-dark { color: #fff; }
    .yacad3-h2--on-dark em {
      background: linear-gradient(135deg, #fcd116, #f59e0b);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .yacad3-lead {
      font-size: .95rem;
      color: var(--acad-gray);
      line-height: 1.65;
    }
    .yacad3-sub--on-dark { color: rgba(255,255,255,.75); }
    .yacad3-sub--on-dark strong { color: var(--acad-yellow); }

    /* ━━━ PARCOURS ━━━ */
    .yacad3-parcours-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
      gap: 14px;
    }
    .yacad3-parcours-card {
      background: var(--acad-surface);
      border: 1.5px solid var(--acad-border);
      border-radius: 14px;
      padding: 20px 18px;
      cursor: pointer;
      transition: all .25s;
      position: relative;
      overflow: hidden;
    }
    .yacad3-parcours-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: var(--parc-color, var(--acad-green));
      transform: scaleX(0);
      transform-origin: left;
      transition: transform .35s;
    }
    .yacad3-parcours-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--acad-shadow);
      border-color: var(--parc-color, var(--acad-green));
    }
    .yacad3-parcours-card:hover::before { transform: scaleX(1); }
    .yacad3-parcours-emoji {
      font-size: 2rem;
      margin-bottom: 10px;
      display: inline-block;
      transition: transform .3s;
    }
    .yacad3-parcours-card:hover .yacad3-parcours-emoji {
      transform: scale(1.15) rotate(-5deg);
    }
    .yacad3-parcours-title {
      font-family: 'Syne', sans-serif;
      font-size: 1rem;
      font-weight: 800;
      color: var(--acad-ink);
      margin-bottom: 5px;
      letter-spacing: -.2px;
    }
    .yacad3-parcours-desc {
      font-size: .76rem;
      color: var(--acad-gray);
      line-height: 1.55;
    }

    /* ━━━ COMMENT ÇA MARCHE ━━━ */
    .yacad3-steps {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 18px;
      position: relative;
    }
    .yacad3-steps::before {
      content: '';
      position: absolute;
      top: 38px;
      left: 12%;
      right: 12%;
      height: 3px;
      background: linear-gradient(90deg,
        var(--acad-green) 0%,
        var(--acad-green) 33%,
        var(--acad-yellow) 66%,
        var(--acad-gold) 100%);
      border-radius: 3px;
      z-index: 0;
    }
    .yacad3-step {
      background: var(--acad-surface);
      border: 1.5px solid var(--acad-border);
      border-radius: 14px;
      padding: 22px 18px;
      text-align: center;
      transition: all .25s;
      position: relative;
      z-index: 2;
    }
    .yacad3-step:hover {
      transform: translateY(-4px);
      box-shadow: var(--acad-shadow);
      border-color: var(--acad-green-light);
    }
    .yacad3-step-num {
      width: 56px; height: 56px;
      margin: 0 auto 12px;
      background: linear-gradient(135deg, var(--acad-green), var(--acad-green-deep));
      color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1.1rem;
      box-shadow: 0 8px 22px rgba(26,107,58,.3);
      border: 4px solid #fff;
    }
    .yacad3-step:nth-child(4) .yacad3-step-num {
      background: linear-gradient(135deg, var(--acad-yellow), var(--acad-gold));
      color: #0d1f14;
      box-shadow: 0 8px 22px rgba(252,209,22,.35);
    }
    .yacad3-step-emoji {
      font-size: 1.6rem;
      margin-bottom: 8px;
    }
    .yacad3-step h3 {
      font-family: 'Syne', sans-serif;
      font-size: 1rem;
      font-weight: 800;
      color: var(--acad-ink);
      margin-bottom: 6px;
      letter-spacing: -.3px;
    }
    .yacad3-step p {
      font-size: .78rem;
      color: var(--acad-gray);
      line-height: 1.55;
      margin: 0;
    }

    /* ━━━ FILTRES NIVEAU ━━━ */
    .yacad3-filters {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 28px;
    }
    .yacad3-filter {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--acad-surface);
      border: 1.5px solid var(--acad-border);
      color: var(--acad-ink);
      padding: 9px 16px;
      border-radius: 50px;
      font-family: inherit;
      font-size: .82rem;
      font-weight: 600;
      cursor: pointer;
      transition: all .2s;
    }
    .yacad3-filter:hover {
      border-color: var(--acad-green);
      transform: translateY(-2px);
    }
    .yacad3-filter.is-active {
      background: var(--acad-green);
      border-color: var(--acad-green);
      color: #fff;
      box-shadow: 0 8px 22px rgba(26,107,58,.25);
    }

    /* ━━━ GRILLE COURS ━━━ */
    .yacad3-courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
      gap: 20px;
    }
    .yacad3-course {
      background: var(--acad-surface);
      border: 1px solid var(--acad-border);
      border-radius: 16px;
      overflow: hidden;
      cursor: pointer;
      transition: all .25s;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .yacad3-course:hover {
      transform: translateY(-5px);
      box-shadow: var(--acad-shadow-hover);
      border-color: var(--acad-green-light);
    }
    .yacad3-course-img {
      height: 170px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4rem;
      position: relative;
      overflow: hidden;
      transition: transform .4s;
    }
    .yacad3-course:hover .yacad3-course-img {
      transform: scale(1.03);
    }
    .yacad3-course-level {
      position: absolute;
      top: 12px; left: 12px;
      background: rgba(255,255,255,.95);
      backdrop-filter: blur(10px);
      color: var(--acad-ink);
      padding: 4px 11px;
      border-radius: 50px;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .62rem;
      letter-spacing: .06em;
    }
    .yacad3-course-level--debutant     { color: #16a34a; }
    .yacad3-course-level--intermediaire{ color: #2563eb; }
    .yacad3-course-level--avance       { color: #7c3aed; }
    .yacad3-course-pin-free {
      position: absolute;
      top: 12px; right: 12px;
      background: linear-gradient(135deg, var(--acad-yellow), var(--acad-gold));
      color: #0d1f14;
      padding: 4px 11px;
      border-radius: 50px;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .62rem;
      letter-spacing: .04em;
      box-shadow: 0 4px 12px rgba(252,209,22,.4);
    }
    .yacad3-course-body {
      padding: 18px 18px 16px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .yacad3-course-title {
      font-family: 'Syne', sans-serif;
      font-size: 1.02rem;
      font-weight: 800;
      color: var(--acad-ink);
      margin-bottom: 8px;
      letter-spacing: -.2px;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .yacad3-course-meta {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      font-size: .7rem;
      color: var(--acad-gray);
      margin-bottom: 14px;
    }
    .yacad3-course-meta span {
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }
    .yacad3-course-foot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
      border-top: 1px solid var(--acad-border);
      margin-top: auto;
    }
    .yacad3-course-price {
      font-family: 'Syne', sans-serif;
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--acad-green);
      letter-spacing: -.3px;
    }
    .yacad3-course-price--free {
      color: var(--acad-gold);
    }
    .yacad3-course-cta {
      background: linear-gradient(135deg, var(--acad-green), var(--acad-green-deep));
      color: #fff;
      border: none;
      padding: 8px 16px;
      border-radius: 9px;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: .76rem;
      cursor: pointer;
      transition: all .2s;
    }
    .yacad3-course-cta:hover {
      transform: scale(1.03);
      box-shadow: 0 6px 18px rgba(26,107,58,.3);
    }

    /* ━━━ NIVEAUX / PROGRESSION ━━━ */
    .yacad3-levels {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }
    .yacad3-level {
      background: var(--acad-surface);
      border: 2px solid var(--acad-border);
      border-radius: 16px;
      padding: 24px 22px;
      transition: all .25s;
      position: relative;
      overflow: hidden;
    }
    .yacad3-level::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 5px;
      background: var(--lvl-gradient);
    }
    .yacad3-level:hover {
      transform: translateY(-5px);
      box-shadow: var(--acad-shadow-hover);
    }
    .yacad3-level-emoji {
      font-size: 2.4rem;
      margin-bottom: 8px;
    }
    .yacad3-level-name {
      font-family: 'Syne', sans-serif;
      font-size: 1.2rem;
      font-weight: 800;
      letter-spacing: -.4px;
      margin-bottom: 5px;
      background: var(--lvl-gradient);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .yacad3-level-pitch {
      font-size: .82rem;
      color: var(--acad-gray);
      line-height: 1.55;
      margin-bottom: 12px;
      min-height: 42px;
    }
    .yacad3-level-progress {
      margin-bottom: 14px;
    }
    .yacad3-level-progress-head {
      display: flex;
      justify-content: space-between;
      font-size: .68rem;
      color: var(--acad-gray);
      margin-bottom: 5px;
    }
    .yacad3-level-progress-head strong {
      color: var(--lvl-color);
      font-weight: 800;
    }
    .yacad3-level-progress-bar {
      height: 6px;
      background: var(--acad-surface2);
      border-radius: 10px;
      overflow: hidden;
    }
    .yacad3-level-progress-fill {
      height: 100%;
      background: var(--lvl-gradient);
      border-radius: 10px;
    }
    .yacad3-level-perks {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .yacad3-level-perks li {
      display: flex;
      align-items: flex-start;
      gap: 7px;
      font-size: .76rem;
      color: var(--acad-gray);
      padding: 4px 0;
      line-height: 1.5;
    }
    .yacad3-level-perks li span {
      color: var(--lvl-color);
      font-weight: 800;
      flex-shrink: 0;
    }

    /* ━━━ CERTIFICAT ━━━ */
    .yacad3-cert {
      background: linear-gradient(135deg, #fff9e6 0%, #fef9d6 100%);
      border: 2px solid var(--acad-yellow);
      border-radius: 18px;
      padding: 32px 28px;
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 28px;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    .yacad3-cert::before {
      content: '';
      position: absolute;
      top: -30px; right: -30px;
      width: 200px; height: 200px;
      background: radial-gradient(circle, rgba(252,209,22,.25), transparent 65%);
      border-radius: 50%;
    }
    .yacad3-cert-visual {
      position: relative;
      z-index: 2;
      background: var(--acad-surface);
      border: 3px solid var(--acad-yellow);
      border-radius: 14px;
      padding: 24px 22px;
      text-align: center;
      box-shadow: 0 20px 50px rgba(252,209,22,.2);
      transform: rotate(-2deg);
      transition: transform .3s;
    }
    .yacad3-cert-visual:hover {
      transform: rotate(0deg) scale(1.02);
    }
    .yacad3-cert-seal {
      font-size: 3rem;
      margin-bottom: 6px;
    }
    .yacad3-cert-brand {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .68rem;
      color: var(--acad-gray);
      letter-spacing: .2em;
      margin-bottom: 4px;
    }
    .yacad3-cert-title {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1.1rem;
      color: var(--acad-ink);
      margin-bottom: 8px;
      letter-spacing: -.3px;
    }
    .yacad3-cert-name {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1.3rem;
      color: var(--acad-green);
      margin-bottom: 10px;
      letter-spacing: -.5px;
    }
    .yacad3-cert-line {
      height: 2px;
      width: 70%;
      background: linear-gradient(90deg, transparent, var(--acad-yellow), transparent);
      margin: 10px auto;
    }
    .yacad3-cert-foot {
      font-size: .65rem;
      color: var(--acad-gray);
      letter-spacing: .04em;
    }
    .yacad3-cert-text {
      position: relative;
      z-index: 2;
    }
    .yacad3-cert-text ul {
      list-style: none;
      padding: 0;
      margin: 14px 0 0;
    }
    .yacad3-cert-text ul li {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 6px 0;
      font-size: .85rem;
      color: var(--acad-ink);
      line-height: 1.55;
    }
    .yacad3-cert-text ul li span {
      width: 22px; height: 22px;
      background: var(--acad-green);
      color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: .68rem;
      font-weight: 800;
      flex-shrink: 0;
      margin-top: 1px;
    }

    /* ━━━ SUCCESS STORIES ━━━ */
    .yacad3-stories {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 18px;
    }
    .yacad3-story {
      background: var(--acad-surface);
      border: 1px solid var(--acad-border);
      border-radius: 16px;
      padding: 22px 22px 20px;
      transition: all .25s;
      position: relative;
    }
    .yacad3-story::before {
      content: '"';
      position: absolute;
      top: 14px; right: 18px;
      font-family: 'Syne', sans-serif;
      font-size: 4rem;
      color: var(--acad-green-pale);
      line-height: 1;
      font-weight: 800;
    }
    .yacad3-story:hover {
      transform: translateY(-4px);
      box-shadow: var(--acad-shadow-hover);
      border-color: var(--acad-green-light);
    }
    .yacad3-story-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 14px;
      position: relative;
      z-index: 2;
    }
    .yacad3-story-av {
      width: 48px; height: 48px;
      border-radius: 50%;
      background: var(--story-color);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1.1rem;
      box-shadow: 0 4px 14px rgba(0,0,0,.1);
    }
    .yacad3-story-name {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .95rem;
      color: var(--acad-ink);
      letter-spacing: -.2px;
      line-height: 1.2;
    }
    .yacad3-story-role {
      font-size: .7rem;
      color: var(--acad-gray);
      margin-top: 2px;
    }
    .yacad3-story-quote {
      font-size: .85rem;
      color: var(--acad-ink);
      line-height: 1.65;
      margin-bottom: 14px;
      font-style: italic;
      position: relative;
      z-index: 2;
    }
    .yacad3-story-metric {
      display: inline-block;
      background: linear-gradient(135deg, var(--acad-green-pale), #fff9e6);
      color: var(--acad-green);
      border: 1px solid var(--acad-green-light);
      padding: 5px 12px;
      border-radius: 50px;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .76rem;
      letter-spacing: -.2px;
    }

    /* ━━━ FAQ ━━━ */
    .yacad3-faq {
      max-width: 760px;
      margin: 0 auto;
    }
    .yacad3-faq-item {
      background: var(--acad-surface);
      border: 1px solid var(--acad-border);
      border-radius: 12px;
      margin-bottom: 10px;
      overflow: hidden;
      transition: all .2s;
    }
    .yacad3-faq-item:hover { border-color: var(--acad-green); }
    .yacad3-faq-item[open] {
      box-shadow: var(--acad-shadow);
      border-color: var(--acad-green);
    }
    .yacad3-faq-item summary {
      padding: 16px 20px;
      cursor: pointer;
      font-weight: 700;
      font-size: .9rem;
      color: var(--acad-ink);
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 14px;
    }
    .yacad3-faq-item summary::after {
      content: '+';
      font-family: 'Syne', sans-serif;
      font-size: 1.6rem;
      color: var(--acad-green);
      transition: transform .25s;
      flex-shrink: 0;
    }
    .yacad3-faq-item[open] summary::after { transform: rotate(45deg); }
    .yacad3-faq-item p {
      padding: 0 20px 18px;
      font-size: .85rem;
      color: var(--acad-gray);
      line-height: 1.75;
      margin: 0;
    }

    /* ━━━ CTA FINAL ━━━ */
    .yacad3-final {
      background: linear-gradient(135deg, #0a1410 0%, #1a3a24 100%);
      border-radius: 22px;
      padding: 48px 36px;
      color: #fff;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .yacad3-final::before {
      content: '🎓';
      position: absolute;
      top: 50%; right: -10px;
      transform: translateY(-50%);
      font-size: 14rem;
      opacity: .05;
      pointer-events: none;
    }
    .yacad3-final::after {
      content: '🏆';
      position: absolute;
      top: 50%; left: -10px;
      transform: translateY(-50%);
      font-size: 11rem;
      opacity: .05;
      pointer-events: none;
    }
    .yacad3-final-inner {
      position: relative;
      z-index: 2;
      max-width: 620px;
      margin: 0 auto;
    }
    .yacad3-final-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 24px;
    }
    .yacad3-final-trust {
      display: flex;
      gap: 18px;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 24px;
      padding-top: 22px;
      border-top: 1px solid rgba(255,255,255,.1);
      list-style: none;
      padding-left: 0;
    }
    .yacad3-final-trust li {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: .75rem;
      color: rgba(255,255,255,.6);
    }

    /* ━━━ BUTTONS ━━━ */
    .yacad3-btn {
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
    .yacad3-btn--pri {
      background: linear-gradient(135deg, var(--acad-yellow), var(--acad-gold));
      color: #0d1f14;
      box-shadow: 0 8px 22px rgba(252,209,22,.35);
    }
    .yacad3-btn--pri:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(252,209,22,.45);
    }
    .yacad3-btn--sec {
      background: rgba(255,255,255,.1);
      color: #fff;
      border: 1.5px solid rgba(255,255,255,.2);
      backdrop-filter: blur(10px);
    }
    .yacad3-btn--sec:hover { background: rgba(255,255,255,.18); }

    /* ━━━ LOADING / EMPTY ━━━ */
    .yacad3-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 60px 20px;
      color: var(--acad-gray);
    }
    .yacad3-spinner {
      width: 22px; height: 22px;
      border: 3px solid var(--acad-border);
      border-top-color: var(--acad-green);
      border-radius: 50%;
      animation: yacad3Spin .7s linear infinite;
    }
    @keyframes yacad3Spin { to { transform: rotate(360deg); } }
    .yacad3-empty {
      text-align: center;
      padding: 50px 20px;
      background: var(--acad-surface);
      border: 1.5px dashed var(--acad-border);
      border-radius: 14px;
    }
    .yacad3-empty-ico {
      font-size: 3rem;
      margin-bottom: 10px;
      opacity: .6;
    }
    .yacad3-empty p {
      color: var(--acad-gray);
      font-size: .88rem;
      line-height: 1.65;
      margin: 0;
    }

    /* ━━━ RESPONSIVE ━━━ */
    @media (max-width: 960px) {
      .yacad3-hero { padding: 40px 18px 56px; }
      .yacad3-hero-grid { grid-template-columns: 1fr; gap: 32px; }
      .yacad3-hero-visual { min-height: auto; }
      .yacad3-steps { grid-template-columns: repeat(2, 1fr); }
      .yacad3-steps::before { display: none; }
      .yacad3-cert { grid-template-columns: 1fr; gap: 22px; padding: 26px 22px; }
      .yacad3-cert-visual { max-width: 320px; margin: 0 auto; }
      .yacad3-final { padding: 36px 24px; }
      .yacad3-section--tinted { padding: 40px 18px; }
    }
    @media (max-width: 500px) {
      .yacad3-hero { padding: 32px 16px 50px; }
      .yacad3-h1 { font-size: 1.85rem; }
      .yacad3-args { grid-template-columns: 1fr; }
      .yacad3-hero-stats { grid-template-columns: 1fr 1fr; gap: 10px; }
      .yacad3-steps { grid-template-columns: 1fr; }
      .yacad3-hero-cta { flex-direction: column; align-items: stretch; }
      .yacad3-btn { width: 100%; text-align: center; }
      .yacad3-section, .yacad3-section--tinted { padding-left: 16px; padding-right: 16px; }
      .yacad3-courses-grid { grid-template-columns: 1fr; gap: 14px; }
    }
  `;

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>

      <div className="yorix-acad-v3 anim">
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* HERO PREMIUM                       */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <header className="yacad3-hero">
          <div className="yacad3-hero-inner">
            <InlineBreadcrumb
              items={[
                { label: "Accueil", onClick: () => goPage?.("home") },
                { label: "Yorix Academy · centre de formation" },
              ]}
            />

            <div className="yacad3-hero-grid">
              <div>
                <span className="yacad3-eyebrow">
                  <span className="yacad3-eyebrow-dot" /> Yorix Academy · centre officiel
                </span>

                <h1 className="yacad3-h1">
                  Développez vos compétences.<br/>
                  <em>Accélérez votre croissance.</em>
                </h1>

                <p className="yacad3-sub">
                  Formations pratiques pensées pour le marché camerounais : <strong>vente terrain, e-commerce, WhatsApp Business, logistique, business growth</strong>.
                  Apprenez auprès d'entrepreneurs qui ont réussi au Cameroun.
                </p>

                <ul className="yacad3-args">
                  <li><span>🛒</span><span>Vente terrain</span></li>
                  <li><span>🏪</span><span>E-commerce Yorix</span></li>
                  <li><span>💬</span><span>WhatsApp Selling</span></li>
                  <li><span>📈</span><span>Business Growth</span></li>
                </ul>

                <div className="yacad3-hero-cta">
                  <button
                    type="button"
                    className="yacad3-btn yacad3-btn--pri"
                    onClick={goToFree}
                  >
                    🚀 Commencer gratuitement
                  </button>
                  <button
                    type="button"
                    className="yacad3-btn yacad3-btn--sec"
                    onClick={scrollToCourses}
                  >
                    Voir les parcours
                  </button>
                </div>

                <div className="yacad3-hero-stats">
                  <div className="yacad3-hero-stat">
                    <div className="yacad3-hero-stat-val">{academyCourses.length || "12"}+</div>
                    <div className="yacad3-hero-stat-lbl">FORMATIONS</div>
                  </div>
                  <div className="yacad3-hero-stat">
                    <div className="yacad3-hero-stat-val">{totalStudents.toLocaleString("fr-FR") || "850"}+</div>
                    <div className="yacad3-hero-stat-lbl">ÉTUDIANTS</div>
                  </div>
                  <div className="yacad3-hero-stat">
                    <div className="yacad3-hero-stat-val">{freeCount || "5"}+</div>
                    <div className="yacad3-hero-stat-lbl">GRATUITES</div>
                  </div>
                </div>
              </div>

              {/* DASHBOARD VISUEL DROITE */}
              <div className="yacad3-hero-visual">
                <div className="yacad3-dashboard">
                  <div className="yacad3-dash-head">
                    <div className="yacad3-dash-brand">
                      <div className="yacad3-dash-logo">Y</div>
                      <div className="yacad3-dash-name">
                        Mon parcours
                        <small>YORIX ACADEMY</small>
                      </div>
                    </div>
                    <div className="yacad3-dash-badge">🚀 En cours</div>
                  </div>

                  <div className="yacad3-dash-progress-lbl">Progression globale</div>
                  <div className="yacad3-dash-progress-pct">72%</div>
                  <div className="yacad3-dash-progress-bar">
                    <div className="yacad3-dash-progress-fill" />
                  </div>

                  <ul className="yacad3-dash-modules">
                    <li className="yacad3-dash-mod">
                      <div className="yacad3-dash-mod-ico yacad3-dash-mod-ico--done">✓</div>
                      <div className="yacad3-dash-mod-info">
                        <div className="yacad3-dash-mod-name">Bases du commerce</div>
                        <div className="yacad3-dash-mod-meta">⏱ 45 min · 5 chapitres</div>
                      </div>
                      <div className="yacad3-dash-mod-status yacad3-dash-mod-status--done">Terminé</div>
                    </li>
                    <li className="yacad3-dash-mod">
                      <div className="yacad3-dash-mod-ico yacad3-dash-mod-ico--current">📖</div>
                      <div className="yacad3-dash-mod-info">
                        <div className="yacad3-dash-mod-name">WhatsApp Selling</div>
                        <div className="yacad3-dash-mod-meta">⏱ 1h · 8 chapitres</div>
                      </div>
                      <div className="yacad3-dash-mod-status yacad3-dash-mod-status--current">3/8</div>
                    </li>
                    <li className="yacad3-dash-mod">
                      <div className="yacad3-dash-mod-ico yacad3-dash-mod-ico--locked">🔒</div>
                      <div className="yacad3-dash-mod-info">
                        <div className="yacad3-dash-mod-name">Closing pro</div>
                        <div className="yacad3-dash-mod-meta">⏱ 1h30 · 10 chapitres</div>
                      </div>
                      <div className="yacad3-dash-mod-status yacad3-dash-mod-status--locked">Verrouillé</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* 01 · COMMENT ÇA MARCHE             */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="yacad3-section">
          <div className="yacad3-section-head">
            <span className="yacad3-eyebrow-light">01 · Comment ça marche</span>
            <h2 className="yacad3-h2">Quatre étapes pour <em>monter en compétence</em></h2>
            <p className="yacad3-lead">
              De votre inscription à votre certificat Yorix : un parcours conçu pour transformer vos compétences.
            </p>
          </div>

          <div className="yacad3-steps">
            {STEPS.map((s) => (
              <div key={s.n} className="yacad3-step">
                <div className="yacad3-step-num">{s.n}</div>
                <div className="yacad3-step-emoji">{s.emoji}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* 02 · PARCOURS DE FORMATION         */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="yacad3-section--tinted">
          <div className="yacad3-section-head">
            <span className="yacad3-eyebrow-light">02 · Parcours disponibles</span>
            <h2 className="yacad3-h2">Choisissez votre <em>parcours</em></h2>
            <p className="yacad3-lead">
              8 parcours thématiques pensés pour le marché camerounais : vente, e-commerce, logistique, business.
            </p>
          </div>

          <div className="yacad3-parcours-grid">
            {PARCOURS.map((p) => (
              <div
                key={p.id}
                className="yacad3-parcours-card"
                style={{ "--parc-color": p.color }}
                onClick={scrollToCourses}
              >
                <div className="yacad3-parcours-emoji">{p.icon}</div>
                <div className="yacad3-parcours-title">{p.label}</div>
                <div className="yacad3-parcours-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* 03 · CATALOGUE COURS               */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="yacad3-section" id="yacad3-courses">
          <div className="yacad3-section-head">
            <span className="yacad3-eyebrow-light">03 · Catalogue</span>
            <h2 className="yacad3-h2">Toutes nos <em>formations</em></h2>
            <p className="yacad3-lead">
              Sélectionnez par niveau ou commencez par une formation gratuite.
            </p>
          </div>

          {/* Filtres niveau */}
          <div className="yacad3-filters">
            {["TOUT", "DÉBUTANT", "INTERMÉDIAIRE", "AVANCÉ"].map((lvl) => (
              <button
                key={lvl}
                type="button"
                className={`yacad3-filter${filterCat === lvl ? " is-active" : ""}`}
                onClick={() => setFilterCat(lvl)}
              >
                {lvl === "TOUT"          && "📚 Tout"}
                {lvl === "DÉBUTANT"     && "🌱 Débutant"}
                {lvl === "INTERMÉDIAIRE" && "🚀 Intermédiaire"}
                {lvl === "AVANCÉ"       && "💎 Avancé"}
              </button>
            ))}
          </div>

          {academyLoading ? (
            <div className="yacad3-loading">
              <div className="yacad3-spinner" />
              Chargement des formations...
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="yacad3-empty">
              <div className="yacad3-empty-ico">🎓</div>
              <p>Aucune formation dans cette catégorie pour l'instant.<br/>Revenez bientôt — de nouveaux modules arrivent chaque semaine.</p>
            </div>
          ) : (
            <div className="yacad3-courses-grid">
              {filteredCourses.map((c) => {
                const isFree = (c.prix || 0) === 0;
                const levelClass =
                  c.category === "DÉBUTANT" ? "debutant" :
                  c.category === "INTERMÉDIAIRE" ? "intermediaire" : "avance";
                return (
                  <article
                    key={c.id}
                    className="yacad3-course"
                    onClick={() => goAcademyDetail?.(c)}
                    role="link"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        goAcademyDetail?.(c);
                      }
                    }}
                  >
                    <div
                      className="yacad3-course-img"
                      style={{ background: c.color_bg || "var(--acad-green-pale)" }}
                    >
                      <span>{c.emoji || "🎓"}</span>
                      <span className={`yacad3-course-level yacad3-course-level--${levelClass}`}>
                        {c.category}
                      </span>
                      {isFree && (
                        <span className="yacad3-course-pin-free">🎁 GRATUIT</span>
                      )}
                    </div>
                    <div className="yacad3-course-body">
                      <h3 className="yacad3-course-title">{c.title}</h3>
                      <div className="yacad3-course-meta">
                        <span>⏱ {c.duration || "—"}</span>
                        <span>👥 {(c.students_count || 0).toLocaleString("fr-FR")}</span>
                      </div>
                      <div className="yacad3-course-foot">
                        <div className={`yacad3-course-price${isFree ? " yacad3-course-price--free" : ""}`}>
                          {isFree ? "Gratuit" : `${c.prix.toLocaleString("fr-FR")} F`}
                        </div>
                        <button
                          type="button"
                          className="yacad3-course-cta"
                          onClick={(e) => { e.stopPropagation(); goAcademyDetail?.(c); }}
                        >
                          Démarrer →
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* 04 · NIVEAUX / PROGRESSION         */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="yacad3-section--tinted">
          <div className="yacad3-section-head">
            <span className="yacad3-eyebrow-light">04 · Progression</span>
            <h2 className="yacad3-h2">Quatre niveaux. <em>Une progression claire.</em></h2>
            <p className="yacad3-lead">
              Du débutant à l'elite : un parcours structuré pour devenir un entrepreneur reconnu au Cameroun.
            </p>
          </div>

          <div className="yacad3-levels">
            {NIVEAUX.map((n) => (
              <article
                key={n.id}
                className="yacad3-level"
                style={{
                  "--lvl-color": n.color,
                  "--lvl-gradient": n.gradient,
                }}
              >
                <div className="yacad3-level-emoji">{n.emoji}</div>
                <h3 className="yacad3-level-name">{n.label}</h3>
                <p className="yacad3-level-pitch">{n.pitch}</p>
                <div className="yacad3-level-progress">
                  <div className="yacad3-level-progress-head">
                    <span>Étudiants à ce niveau</span>
                    <strong>{n.pct}%</strong>
                  </div>
                  <div className="yacad3-level-progress-bar">
                    <div className="yacad3-level-progress-fill" style={{ width: `${n.pct}%` }} />
                  </div>
                </div>
                <ul className="yacad3-level-perks">
                  {n.perks.map((p) => (
                    <li key={p}><span>✓</span>{p}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* 05 · CERTIFICAT                    */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="yacad3-section">
          <div className="yacad3-section-head">
            <span className="yacad3-eyebrow-light">05 · Certification</span>
            <h2 className="yacad3-h2">Recevez votre <em>certificat Yorix</em></h2>
            <p className="yacad3-lead">
              Un document officiel à partager sur LinkedIn, WhatsApp et avec vos clients.
            </p>
          </div>

          <div className="yacad3-cert">
            <div className="yacad3-cert-visual">
              <div className="yacad3-cert-seal">🏅</div>
              <div className="yacad3-cert-brand">YORIX ACADEMY</div>
              <div className="yacad3-cert-title">Certificat de réussite</div>
              <div className="yacad3-cert-line" />
              <div className="yacad3-cert-name">{userData?.nom || "Votre nom"}</div>
              <div className="yacad3-cert-foot">
                Formation : WhatsApp Selling Pro · {new Date().toLocaleDateString("fr-FR")}
              </div>
            </div>

            <div className="yacad3-cert-text">
              <h3 className="yacad3-h2" style={{ fontSize: "1.3rem", marginBottom: 10 }}>
                Reconnu &<br/><em>officiel</em>
              </h3>
              <p className="yacad3-lead" style={{ fontSize: ".88rem" }}>
                Le certificat Yorix Academy atteste de vos compétences acquises et de votre engagement
                dans la formation continue.
              </p>
              <ul>
                <li><span>1</span><span><strong>Partageable</strong> sur LinkedIn, WhatsApp, CV.</span></li>
                <li><span>2</span><span><strong>Vérifiable</strong> via un QR code unique.</span></li>
                <li><span>3</span><span><strong>Reconnu</strong> par les partenaires Yorix (CinetPay, MTN, Orange).</span></li>
                <li><span>4</span><span><strong>Boost de profil</strong> sur la marketplace Yorix.</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* 06 · SUCCESS STORIES               */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="yacad3-section">
          <div className="yacad3-section-head">
            <span className="yacad3-eyebrow-light">06 · Témoignages</span>
            <h2 className="yacad3-h2">Ils ont <em>transformé leur activité</em></h2>
            <p className="yacad3-lead">
              Des entrepreneurs camerounais qui ont fait grandir leur business grâce à Yorix Academy.
            </p>
          </div>

          <div className="yacad3-stories">
            {STORIES.map((s) => (
              <article
                key={s.name}
                className="yacad3-story"
                style={{ "--story-color": s.color }}
              >
                <div className="yacad3-story-header">
                  <div className="yacad3-story-av">{s.avatar}</div>
                  <div>
                    <div className="yacad3-story-name">{s.name}</div>
                    <div className="yacad3-story-role">{s.role}</div>
                  </div>
                </div>
                <p className="yacad3-story-quote">{s.quote}</p>
                <span className="yacad3-story-metric">📈 {s.metric}</span>
              </article>
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* 07 · FAQ                           */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="yacad3-section">
          <div className="yacad3-section-head">
            <span className="yacad3-eyebrow-light">07 · Questions fréquentes</span>
            <h2 className="yacad3-h2">Tout savoir sur <em>Yorix Academy</em></h2>
          </div>

          <div className="yacad3-faq">
            {FAQ_DATA.map((f, i) => (
              <details className="yacad3-faq-item" key={i}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* CTA FINAL                          */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="yacad3-section">
          <div className="yacad3-final">
            <div className="yacad3-final-inner">
              <span className="yacad3-eyebrow">
                <span className="yacad3-eyebrow-dot" /> Rejoignez Yorix Academy
              </span>
              <h2 className="yacad3-h2 yacad3-h2--on-dark">
                Commencez votre<br/><em>transformation</em> aujourd'hui
              </h2>
              <p className="yacad3-sub yacad3-sub--on-dark">
                <strong>+850 entrepreneurs</strong> camerounais ont déjà commencé leur parcours.
                Inscription gratuite · première formation offerte · certificats officiels.
              </p>

              <div className="yacad3-final-actions">
                <button
                  type="button"
                  className="yacad3-btn yacad3-btn--pri"
                  onClick={user ? goToFree : openRegister}
                >
                  🚀 {user ? "Commencer gratuitement" : "Créer mon compte"}
                </button>
                <button
                  type="button"
                  className="yacad3-btn yacad3-btn--sec"
                  onClick={scrollToCourses}
                >
                  Voir le catalogue
                </button>
              </div>

              <ul className="yacad3-final-trust">
                <li><span aria-hidden>🎓</span> Certificats officiels</li>
                <li><span aria-hidden>📱</span> Mobile-friendly</li>
                <li><span aria-hidden>🇨🇲</span> 100% Cameroun</li>
                <li><span aria-hidden>⚡</span> 30 sec d'inscription</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
