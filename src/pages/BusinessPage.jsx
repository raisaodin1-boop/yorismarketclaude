// ═══════════════════════════════════════════════════════════════
//  YORIX CM — BUSINESS PAGE PREMIUM v3
//  ✅ Hero B2B spectaculaire avec dashboard KPI animé
//  ✅ 6 piliers Business (sourcing, visibilité, paiement, logistique...)
//  ✅ Solutions par typologie d'entreprise (PME, retail, diaspora...)
//  ✅ 4 rôles entreprise avec workflow
//  ✅ Growth & Academy integration
//  ✅ Success stories B2B
//  ✅ FAQ B2B + Newsletter Business
//  ✅ CTA final puissant
//  ✅ Inspiration : Shopify Plus / Amazon Business / Alibaba B2B / Stripe
// ═══════════════════════════════════════════════════════════════

import { BusinessForm } from "../components/BusinessForm";

// ─────────────────────────────────────────────────────────────
// CONSTANTES
// ─────────────────────────────────────────────────────────────
const PILIERS = [
  {
    id: "sourcing",
    icon: "🏬",
    color: "#1a6b3a",
    title: "Achat groupé & sourcing",
    desc: "Regroupements d'offres marketplace, prix négociés, catalogue vérifié de 500+ fournisseurs camerounais.",
    metric: "-22% prix moyens"
  },
  {
    id: "visibility",
    icon: "📣",
    color: "#f59e0b",
    title: "Visibilité & campagnes",
    desc: "Mise en avant produits/services, boosts ciblés Douala/Yaoundé/villes secondaires, ads natives.",
    metric: "+340% portée"
  },
  {
    id: "payment",
    icon: "🏦",
    color: "#2563eb",
    title: "Paiements traçables",
    desc: "MTN MoMo, Orange Money, Escrow Yorix, factures pro automatiques, conformité fiscale.",
    metric: "100% sécurisé"
  },
  {
    id: "logistic",
    icon: "🚚",
    color: "#0891b2",
    title: "Logistique & livraison",
    desc: "Yorix Ride pour vos commandes, tarifs B2B dégressifs, livraison intra-ville et inter-villes.",
    metric: "J+1 garanti"
  },
  {
    id: "training",
    icon: "🎓",
    color: "#7c3aed",
    title: "Formation équipes",
    desc: "Yorix Academy : formez vos commerciaux, magasiniers et livreurs aux outils digitaux modernes.",
    metric: "+850 formés"
  },
  {
    id: "growth",
    icon: "📈",
    color: "#dc2626",
    title: "Croissance multi-ville",
    desc: "Expansion régionale, support diaspora business, partenariats stratégiques, audit gratuit.",
    metric: "10 régions CM"
  },
];

const SOLUTIONS = [
  {
    id: "pme",
    emoji: "🏢",
    title: "PME & Startups",
    desc: "Solutions clé en main : marketplace, paiements, livraison. Lancez votre activité en 7 jours.",
    perks: ["Setup en 1 semaine", "Paiements MoMo intégrés", "Support dédié 7j/7"],
    color: "#1a6b3a"
  },
  {
    id: "retail",
    emoji: "🏪",
    title: "Boutiques & Retail",
    desc: "Digitalisez votre boutique physique : catalogue en ligne, click & collect, fidélisation.",
    perks: ["Catalogue illimité", "Click & collect", "Programme fidélité"],
    color: "#f59e0b"
  },
  {
    id: "distrib",
    emoji: "📦",
    title: "Distributeurs",
    desc: "Gérez vos réseaux de distribution : commandes en gros, multi-points, livraison optimisée.",
    perks: ["Tarifs dégressifs", "Multi-livraison", "Gestion stocks"],
    color: "#2563eb"
  },
  {
    id: "services",
    emoji: "👷",
    title: "Réseaux prestataires",
    desc: "Coordonnez vos équipes terrain : interventions, planning, facturation, satisfaction client.",
    perks: ["Planning équipes", "Facturation auto", "Suivi terrain"],
    color: "#7c3aed"
  },
  {
    id: "diaspora",
    emoji: "✈️",
    title: "Diaspora business",
    desc: "Investissez ou lancez au Cameroun depuis l'étranger : pilotage à distance, partenaires locaux.",
    perks: ["Gestion à distance", "Partenaires vérifiés", "Reporting mensuel"],
    color: "#dc2626"
  },
  {
    id: "expansion",
    emoji: "🌍",
    title: "Expansion régionale",
    desc: "Étendez votre présence sur tout le Cameroun : Douala, Yaoundé, Bafoussam, Bamenda, Garoua.",
    perks: ["10 régions", "Logistique inter-villes", "Marketing local"],
    color: "#0891b2"
  },
];

const ROLES = [
  {
    id: "buyer",
    icon: "🛒",
    title: "Acheteur",
    color: "#22c55e",
    gradient: "linear-gradient(135deg, #4ade80, #16a34a)",
    workflow: ["Catalogue B2B", "Devis groupés", "Commandes récurrentes", "Suivi temps réel"]
  },
  {
    id: "seller",
    icon: "🏪",
    title: "Vendeur",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #fbbf24, #d97706)",
    workflow: ["Boutique en ligne", "Inventaire smart", "Promotions ciblées", "Analytics ventes"]
  },
  {
    id: "delivery",
    icon: "🚚",
    title: "Livreur",
    color: "#3b82f6",
    gradient: "linear-gradient(135deg, #60a5fa, #2563eb)",
    workflow: ["Missions assignées", "Optimisation tournée", "Preuve livraison", "Paiement quotidien"]
  },
  {
    id: "provider",
    icon: "👷",
    title: "Prestataire",
    color: "#7c3aed",
    gradient: "linear-gradient(135deg, #a78bfa, #5b21b6)",
    workflow: ["Planning équipe", "Devis & facturation", "Satisfaction client", "Réputation"]
  },
];

const STORIES = [
  {
    name: "Boutique Aïcha & Sœurs",
    role: "Retail mode · Douala",
    avatar: "B",
    color: "#f59e0b",
    quote: "Nous avons digitalisé notre boutique en 10 jours avec Yorix Business. Aujourd'hui, 60% de nos ventes viennent du digital, et nous livrons partout au Cameroun.",
    metric: "+150% CA"
  },
  {
    name: "Cameroun Sourcing SARL",
    role: "Distributeur · Yaoundé",
    avatar: "C",
    color: "#1a6b3a",
    quote: "Yorix Business nous a permis de structurer nos achats groupés. Nous économisons 22% sur nos approvisionnements grâce au catalogue vérifié.",
    metric: "-22% coûts"
  },
  {
    name: "Diaspora Invest CM",
    role: "Investisseur · Paris/Douala",
    avatar: "D",
    color: "#7c3aed",
    quote: "Depuis Paris, je pilote mes 3 boutiques au Cameroun grâce à Yorix. Reporting mensuel, paiements traçables, équipe locale fiable.",
    metric: "3 boutiques pilotées"
  },
];

const FAQ_DATA = [
  {
    q: "Combien coûte Yorix Business pour mon entreprise ?",
    a: "L'inscription est gratuite. Yorix se rémunère via une commission de 5% sur les transactions réalisées via la plateforme. Aucun frais fixe, aucun engagement. Les services premium (audit, formation équipes, campagnes ciblées) sont facturés à la prestation."
  },
  {
    q: "Combien de temps pour lancer mon entreprise sur Yorix ?",
    a: "Setup standard : 7 jours ouvrés (inscription, vérification, catalogue, formation équipe). Setup express : 48h pour les PME avec moins de 50 produits. Notre équipe accompagne chaque entreprise au démarrage."
  },
  {
    q: "Puis-je gérer plusieurs vendeurs/livreurs dans mon équipe ?",
    a: "Oui, les comptes entreprise supportent les rôles multiples : 1 admin + plusieurs vendeurs, livreurs ou prestataires. Permissions granulaires, statistiques par membre, paiements consolidés."
  },
  {
    q: "Les paiements sont-ils sécurisés pour les transactions B2B ?",
    a: "Absolument. Yorix Escrow protège chaque transaction : les fonds sont conservés jusqu'à livraison conforme. Médiation sous 48h en cas de litige. Conforme aux normes bancaires camerounaises."
  },
  {
    q: "Couvrez-vous tout le Cameroun ?",
    a: "Oui, livraison disponible dans les 10 régions du Cameroun. Couverture renforcée Douala/Yaoundé (intra-ville rapide), bonne couverture Bafoussam/Bamenda/Garoua/Kribi, livraison J+1 ou J+2 sur les zones rurales."
  },
  {
    q: "Proposez-vous un accompagnement personnalisé ?",
    a: "Oui, pour les entreprises ambitieuses : audit gratuit 1h, plan d'action sur 90 jours, suivi mensuel avec un Business Manager dédié. Demande via le formulaire en bas de cette page."
  },
];

// ─────────────────────────────────────────────────────────────
// COMPOSANT BREADCRUMB INLINE
// ─────────────────────────────────────────────────────────────
function InlineBreadcrumb({ items }) {
  return (
    <nav className="ybiz3-bc" aria-label="Fil d'ariane">
      {items.map((it, i) => (
        <span key={i} className="ybiz3-bc-item">
          {it.onClick ? (
            <button type="button" onClick={it.onClick}>{it.label}</button>
          ) : (
            <span className="ybiz3-bc-current">{it.label}</span>
          )}
          {i < items.length - 1 && <span className="ybiz3-bc-sep" aria-hidden>›</span>}
        </span>
      ))}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────────────────────
export function BusinessPage({ goPage, user, userData, setAuthOpen, setAuthTab, setSelectedRole }) {
  const scrollToForm = () => {
    const el = document.getElementById("ybiz3-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openRegister = (role = "seller") => {
    setSelectedRole?.(role);
    setAuthTab?.("register");
    setAuthOpen?.(true);
  };

  // ─────────────────────────────────────────────────────────────
  // CSS PREMIUM INTÉGRÉ
  // ─────────────────────────────────────────────────────────────
  const css = `
    .yorix-biz-v3 {
      --biz-green: #1a6b3a;
      --biz-green-deep: #0d4d28;
      --biz-green-pale: #e8f5e9;
      --biz-green-light: #86efac;
      --biz-yellow: #fcd116;
      --biz-gold: #f59e0b;
      --biz-blue: #2563eb;
      --biz-purple: #7c3aed;
      --biz-ink: var(--ink, #111);
      --biz-gray: var(--gray, #666);
      --biz-surface: var(--surface, #fff);
      --biz-surface2: var(--surface2, #f8f8f8);
      --biz-border: var(--border, #e5e5e5);
      --biz-shadow: 0 12px 30px rgba(0,0,0,.08);
      --biz-shadow-hover: 0 22px 50px rgba(0,0,0,.14);

      font-family: 'DM Sans', sans-serif;
      color: var(--biz-ink);
    }
    .yorix-biz-v3 * { box-sizing: border-box; }

    /* ━━━ BREADCRUMB ━━━ */
    .ybiz3-bc {
      display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
      margin-bottom: 20px; font-size: .76rem;
    }
    .ybiz3-bc-item { display: inline-flex; align-items: center; gap: 6px; }
    .ybiz3-bc button {
      background: none; border: none; color: rgba(255,255,255,.65);
      cursor: pointer; padding: 0; font-family: inherit; font-size: inherit;
      transition: color .15s;
    }
    .ybiz3-bc button:hover { color: var(--biz-yellow); }
    .ybiz3-bc-current { color: #fff; font-weight: 600; }
    .ybiz3-bc-sep { color: rgba(255,255,255,.35); font-size: .9rem; }

    /* ━━━ HERO B2B ━━━ */
    .ybiz3-hero {
      position: relative;
      background: linear-gradient(135deg, #0a1410 0%, #1a3a24 45%, #0d3320 100%);
      color: #fff;
      padding: 56px 24px 70px;
      overflow: hidden;
      border-radius: 0 0 28px 28px;
      margin-bottom: 50px;
    }
    .ybiz3-hero::before {
      content: '';
      position: absolute;
      top: -120px; right: -100px;
      width: 460px; height: 460px;
      background: radial-gradient(circle, rgba(252,209,22,.16), transparent 65%);
      border-radius: 50%;
      pointer-events: none;
    }
    .ybiz3-hero::after {
      content: '';
      position: absolute;
      bottom: -150px; left: -120px;
      width: 420px; height: 420px;
      background: radial-gradient(circle, rgba(37,99,235,.12), transparent 65%);
      border-radius: 50%;
      pointer-events: none;
    }
    .ybiz3-hero-inner {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
    }
    .ybiz3-hero-grid {
      display: grid;
      grid-template-columns: 1.1fr 1fr;
      gap: 44px;
      align-items: center;
    }
    .ybiz3-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: rgba(252,209,22,.14);
      color: var(--biz-yellow);
      border: 1px solid rgba(252,209,22,.32);
      padding: 6px 14px;
      border-radius: 50px;
      font-size: .7rem;
      font-weight: 700;
      margin-bottom: 18px;
      letter-spacing: .04em;
    }
    .ybiz3-eyebrow-dot {
      width: 7px; height: 7px;
      background: var(--biz-yellow);
      border-radius: 50%;
      box-shadow: 0 0 12px var(--biz-yellow);
      animation: ybiz3Pulse 2s ease-in-out infinite;
    }
    @keyframes ybiz3Pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%      { opacity: .5; transform: scale(1.4); }
    }
    .ybiz3-h1 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 800;
      line-height: 1.07;
      letter-spacing: -1.5px;
      margin-bottom: 16px;
    }
    .ybiz3-h1 em {
      font-style: normal;
      background: linear-gradient(135deg, #fcd116, #f59e0b);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .ybiz3-sub {
      font-size: clamp(.95rem, 1.5vw, 1.05rem);
      color: rgba(255,255,255,.75);
      line-height: 1.7;
      margin-bottom: 22px;
      max-width: 520px;
    }
    .ybiz3-sub strong { color: #fff; font-weight: 700; }

    .ybiz3-args {
      list-style: none;
      padding: 0;
      margin: 0 0 26px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 9px;
    }
    .ybiz3-args li {
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
    .ybiz3-args li span:first-child {
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
    .ybiz3-hero-cta {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 22px;
    }
    .ybiz3-hero-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      padding-top: 22px;
      border-top: 1px solid rgba(255,255,255,.1);
    }
    .ybiz3-hero-stat-val {
      font-family: 'Syne', sans-serif;
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--biz-yellow);
      letter-spacing: -.5px;
      line-height: 1;
      margin-bottom: 3px;
    }
    .ybiz3-hero-stat-lbl {
      font-size: .68rem;
      color: rgba(255,255,255,.55);
      letter-spacing: .04em;
    }

    /* ━━━ HERO DASHBOARD KPI (visuel droite) ━━━ */
    .ybiz3-hero-visual {
      position: relative;
      min-height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ybiz3-dashboard {
      position: relative;
      z-index: 2;
      background: var(--biz-surface);
      border-radius: 20px;
      padding: 22px 22px;
      max-width: 380px;
      width: 100%;
      box-shadow: 0 28px 60px rgba(0,0,0,.4);
      border: 1px solid rgba(255,255,255,.1);
    }
    .ybiz3-dash-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--biz-border);
    }
    .ybiz3-dash-brand {
      display: flex; align-items: center; gap: 9px;
    }
    .ybiz3-dash-logo {
      width: 34px; height: 34px;
      background: linear-gradient(135deg, var(--biz-yellow), var(--biz-gold));
      color: #0d1f14;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1.1rem;
    }
    .ybiz3-dash-name {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .85rem;
      letter-spacing: -.2px;
      color: var(--biz-ink);
    }
    .ybiz3-dash-name small {
      display: block;
      font-size: .62rem;
      color: var(--biz-gray);
      font-weight: 500;
      letter-spacing: .12em;
    }
    .ybiz3-dash-badge {
      background: var(--biz-green-pale);
      color: var(--biz-green);
      padding: 4px 10px;
      border-radius: 50px;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .64rem;
      letter-spacing: .04em;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .ybiz3-dash-badge::before {
      content: '';
      width: 6px; height: 6px;
      background: #4fd17d;
      border-radius: 50%;
      animation: ybiz3LiveDot 1.5s ease-in-out infinite;
    }
    @keyframes ybiz3LiveDot {
      0%, 100% { opacity: 1; }
      50%      { opacity: .35; }
    }

    .ybiz3-dash-kpis {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 14px;
    }
    .ybiz3-dash-kpi {
      background: var(--biz-surface2);
      border-radius: 10px;
      padding: 12px 12px;
    }
    .ybiz3-dash-kpi-lbl {
      font-size: .62rem;
      color: var(--biz-gray);
      font-weight: 600;
      letter-spacing: .04em;
      margin-bottom: 4px;
      text-transform: uppercase;
    }
    .ybiz3-dash-kpi-val {
      font-family: 'Syne', sans-serif;
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--biz-ink);
      letter-spacing: -.4px;
      line-height: 1;
      margin-bottom: 4px;
    }
    .ybiz3-dash-kpi-trend {
      font-size: .66rem;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }
    .ybiz3-dash-kpi-trend--up { color: var(--biz-green); }
    .ybiz3-dash-kpi-trend--down { color: #ce1126; }

    .ybiz3-dash-chart {
      background: var(--biz-surface2);
      border-radius: 10px;
      padding: 12px 14px;
      margin-bottom: 14px;
    }
    .ybiz3-dash-chart-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .ybiz3-dash-chart-title {
      font-size: .72rem;
      font-weight: 700;
      color: var(--biz-ink);
    }
    .ybiz3-dash-chart-period {
      font-size: .62rem;
      color: var(--biz-gray);
    }
    .ybiz3-dash-bars {
      display: flex;
      align-items: flex-end;
      gap: 5px;
      height: 60px;
    }
    .ybiz3-dash-bar {
      flex: 1;
      background: linear-gradient(180deg, var(--biz-yellow), var(--biz-gold));
      border-radius: 4px 4px 0 0;
      animation: ybiz3GrowBar .8s ease-out forwards;
      transform-origin: bottom;
    }
    @keyframes ybiz3GrowBar {
      from { transform: scaleY(0); }
      to   { transform: scaleY(1); }
    }
    .ybiz3-dash-bar--active {
      background: linear-gradient(180deg, var(--biz-green), var(--biz-green-deep));
      box-shadow: 0 0 12px rgba(26,107,58,.4);
    }
    .ybiz3-dash-team {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-top: 12px;
      border-top: 1px solid var(--biz-border);
    }
    .ybiz3-dash-team-avatars {
      display: flex;
      align-items: center;
    }
    .ybiz3-dash-team-av {
      width: 28px; height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .68rem;
      color: #fff;
      border: 2px solid var(--biz-surface);
      margin-left: -8px;
    }
    .ybiz3-dash-team-av:first-child { margin-left: 0; }
    .ybiz3-dash-team-text {
      flex: 1;
    }
    .ybiz3-dash-team-name {
      font-size: .72rem;
      font-weight: 700;
      color: var(--biz-ink);
    }
    .ybiz3-dash-team-sub {
      font-size: .62rem;
      color: var(--biz-gray);
    }

    /* ━━━ SECTIONS ━━━ */
    .ybiz3-section {
      max-width: 1200px;
      margin: 0 auto 56px;
      padding: 0 24px;
    }
    .ybiz3-section--tinted {
      background: var(--biz-surface2);
      padding: 56px 24px;
      margin: 0 auto 56px;
      border-radius: 24px;
      max-width: 1248px;
    }
    .ybiz3-section-head {
      text-align: center;
      max-width: 720px;
      margin: 0 auto 36px;
    }
    .ybiz3-eyebrow-light {
      display: inline-block;
      background: var(--biz-surface2);
      color: var(--biz-green);
      border: 1px solid var(--biz-border);
      padding: 5px 12px;
      border-radius: 50px;
      font-size: .66rem;
      font-weight: 700;
      letter-spacing: .12em;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .ybiz3-h2 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(1.5rem, 3.5vw, 2.1rem);
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -1px;
      color: var(--biz-ink);
      margin-bottom: 10px;
    }
    .ybiz3-h2 em {
      font-style: normal;
      color: var(--biz-green);
    }
    .ybiz3-h2--on-dark { color: #fff; }
    .ybiz3-h2--on-dark em {
      background: linear-gradient(135deg, #fcd116, #f59e0b);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .ybiz3-lead {
      font-size: .95rem;
      color: var(--biz-gray);
      line-height: 1.65;
    }
    .ybiz3-sub--on-dark { color: rgba(255,255,255,.75); }
    .ybiz3-sub--on-dark strong { color: var(--biz-yellow); }

    /* ━━━ PILIERS ━━━ */
    .ybiz3-piliers {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 18px;
    }
    .ybiz3-pilier {
      background: var(--biz-surface);
      border: 1.5px solid var(--biz-border);
      border-radius: 16px;
      padding: 24px 22px;
      position: relative;
      transition: all .25s;
      overflow: hidden;
    }
    .ybiz3-pilier::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: var(--p-color, var(--biz-green));
      transform: scaleX(0);
      transform-origin: left;
      transition: transform .35s;
    }
    .ybiz3-pilier:hover {
      transform: translateY(-5px);
      box-shadow: var(--biz-shadow-hover);
      border-color: var(--p-color, var(--biz-green));
    }
    .ybiz3-pilier:hover::before { transform: scaleX(1); }
    .ybiz3-pilier-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
    }
    .ybiz3-pilier-icon {
      width: 50px; height: 50px;
      background: linear-gradient(135deg, var(--biz-green-pale), #fff9e6);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.7rem;
      transition: transform .3s;
    }
    .ybiz3-pilier:hover .ybiz3-pilier-icon {
      transform: scale(1.1) rotate(-5deg);
    }
    .ybiz3-pilier-metric {
      background: var(--biz-green-pale);
      color: var(--biz-green);
      border: 1px solid var(--biz-green-light);
      padding: 4px 10px;
      border-radius: 50px;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .68rem;
      letter-spacing: -.1px;
    }
    .ybiz3-pilier h3 {
      font-family: 'Syne', sans-serif;
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--biz-ink);
      margin-bottom: 8px;
      letter-spacing: -.3px;
    }
    .ybiz3-pilier p {
      font-size: .85rem;
      color: var(--biz-gray);
      line-height: 1.65;
      margin: 0;
    }

    /* ━━━ SOLUTIONS ━━━ */
    .ybiz3-solutions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
    }
    .ybiz3-solution {
      background: var(--biz-surface);
      border: 1.5px solid var(--biz-border);
      border-radius: 16px;
      padding: 26px 22px;
      cursor: pointer;
      transition: all .25s;
      position: relative;
      overflow: hidden;
    }
    .ybiz3-solution::after {
      content: '';
      position: absolute;
      bottom: 0; right: 0;
      width: 80px; height: 80px;
      background: radial-gradient(circle at bottom right, var(--sol-color, var(--biz-green)), transparent 60%);
      opacity: .08;
      pointer-events: none;
      transition: opacity .3s;
    }
    .ybiz3-solution:hover {
      transform: translateY(-4px);
      box-shadow: var(--biz-shadow-hover);
      border-color: var(--sol-color, var(--biz-green));
    }
    .ybiz3-solution:hover::after { opacity: .15; }
    .ybiz3-solution-emoji {
      font-size: 2.4rem;
      margin-bottom: 10px;
      display: inline-block;
      transition: transform .3s;
    }
    .ybiz3-solution:hover .ybiz3-solution-emoji {
      transform: scale(1.12) rotate(-4deg);
    }
    .ybiz3-solution-title {
      font-family: 'Syne', sans-serif;
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--biz-ink);
      margin-bottom: 8px;
      letter-spacing: -.3px;
    }
    .ybiz3-solution-desc {
      font-size: .82rem;
      color: var(--biz-gray);
      line-height: 1.6;
      margin-bottom: 14px;
    }
    .ybiz3-solution-perks {
      list-style: none;
      padding: 0;
      margin: 0 0 14px;
    }
    .ybiz3-solution-perks li {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: .76rem;
      color: var(--biz-ink);
      padding: 4px 0;
    }
    .ybiz3-solution-perks li span {
      color: var(--sol-color, var(--biz-green));
      font-weight: 800;
      flex-shrink: 0;
    }
    .ybiz3-solution-cta {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: .78rem;
      color: var(--sol-color, var(--biz-green));
      transition: gap .2s;
    }
    .ybiz3-solution:hover .ybiz3-solution-cta {
      gap: 8px;
    }

    /* ━━━ RÔLES ENTREPRISE ━━━ */
    .ybiz3-roles {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }
    .ybiz3-role {
      background: var(--biz-surface);
      border: 2px solid var(--biz-border);
      border-radius: 16px;
      padding: 24px 22px;
      transition: all .25s;
      position: relative;
      overflow: hidden;
    }
    .ybiz3-role::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 5px;
      background: var(--role-gradient);
    }
    .ybiz3-role:hover {
      transform: translateY(-5px);
      box-shadow: var(--biz-shadow-hover);
    }
    .ybiz3-role-head {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    .ybiz3-role-icon {
      width: 48px; height: 48px;
      border-radius: 12px;
      background: var(--role-gradient);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      box-shadow: 0 6px 18px var(--role-color);
    }
    .ybiz3-role-title {
      font-family: 'Syne', sans-serif;
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--biz-ink);
      letter-spacing: -.3px;
    }
    .ybiz3-role-sub {
      font-size: .68rem;
      color: var(--biz-gray);
      font-weight: 600;
      letter-spacing: .04em;
      text-transform: uppercase;
      margin-top: 2px;
    }
    .ybiz3-role-workflow {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .ybiz3-role-workflow li {
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 8px 0;
      font-size: .82rem;
      color: var(--biz-ink);
      border-bottom: 1px solid var(--biz-border);
    }
    .ybiz3-role-workflow li:last-child { border-bottom: none; }
    .ybiz3-role-workflow li span:first-child {
      width: 20px; height: 20px;
      background: var(--role-gradient);
      color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: .65rem;
      font-weight: 800;
      flex-shrink: 0;
    }

    /* ━━━ GROWTH SECTION ━━━ */
    .ybiz3-growth {
      background: linear-gradient(135deg, #fff9e6 0%, #fffbeb 100%);
      border: 2px solid var(--biz-yellow);
      border-radius: 20px;
      padding: 36px 32px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    .ybiz3-growth::before {
      content: '📈';
      position: absolute;
      top: 50%; right: 30px;
      transform: translateY(-50%);
      font-size: 12rem;
      opacity: .06;
      pointer-events: none;
    }
    .ybiz3-growth-left {
      position: relative;
      z-index: 2;
    }
    .ybiz3-growth-stats {
      list-style: none;
      padding: 0;
      margin: 18px 0 0;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    .ybiz3-growth-stat {
      background: var(--biz-surface);
      border: 1px solid var(--biz-border);
      border-radius: 12px;
      padding: 14px 16px;
    }
    .ybiz3-growth-stat-val {
      font-family: 'Syne', sans-serif;
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--biz-green);
      letter-spacing: -.5px;
      line-height: 1;
      margin-bottom: 4px;
    }
    .ybiz3-growth-stat-lbl {
      font-size: .72rem;
      color: var(--biz-gray);
      font-weight: 600;
    }
    .ybiz3-growth-right {
      position: relative;
      z-index: 2;
      text-align: center;
    }
    .ybiz3-growth-cta {
      margin-top: 18px;
    }

    /* ━━━ SUCCESS STORIES ━━━ */
    .ybiz3-stories {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 18px;
    }
    .ybiz3-story {
      background: var(--biz-surface);
      border: 1px solid var(--biz-border);
      border-radius: 16px;
      padding: 24px 22px 20px;
      transition: all .25s;
      position: relative;
    }
    .ybiz3-story::before {
      content: '"';
      position: absolute;
      top: 12px; right: 18px;
      font-family: 'Syne', sans-serif;
      font-size: 4rem;
      color: var(--biz-green-pale);
      line-height: 1;
      font-weight: 800;
    }
    .ybiz3-story:hover {
      transform: translateY(-4px);
      box-shadow: var(--biz-shadow-hover);
      border-color: var(--biz-green-light);
    }
    .ybiz3-story-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 14px;
      position: relative;
      z-index: 2;
    }
    .ybiz3-story-av {
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
    .ybiz3-story-name {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .95rem;
      color: var(--biz-ink);
      letter-spacing: -.2px;
      line-height: 1.2;
    }
    .ybiz3-story-role {
      font-size: .7rem;
      color: var(--biz-gray);
      margin-top: 2px;
    }
    .ybiz3-story-quote {
      font-size: .85rem;
      color: var(--biz-ink);
      line-height: 1.65;
      margin-bottom: 14px;
      font-style: italic;
      position: relative;
      z-index: 2;
    }
    .ybiz3-story-metric {
      display: inline-block;
      background: linear-gradient(135deg, var(--biz-green-pale), #fff9e6);
      color: var(--biz-green);
      border: 1px solid var(--biz-green-light);
      padding: 5px 12px;
      border-radius: 50px;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .76rem;
    }

    /* ━━━ FAQ ━━━ */
    .ybiz3-faq {
      max-width: 760px;
      margin: 0 auto;
    }
    .ybiz3-faq-item {
      background: var(--biz-surface);
      border: 1px solid var(--biz-border);
      border-radius: 12px;
      margin-bottom: 10px;
      overflow: hidden;
      transition: all .2s;
    }
    .ybiz3-faq-item:hover { border-color: var(--biz-green); }
    .ybiz3-faq-item[open] {
      box-shadow: var(--biz-shadow);
      border-color: var(--biz-green);
    }
    .ybiz3-faq-item summary {
      padding: 16px 20px;
      cursor: pointer;
      font-weight: 700;
      font-size: .9rem;
      color: var(--biz-ink);
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 14px;
    }
    .ybiz3-faq-item summary::after {
      content: '+';
      font-family: 'Syne', sans-serif;
      font-size: 1.6rem;
      color: var(--biz-green);
      transition: transform .25s;
      flex-shrink: 0;
    }
    .ybiz3-faq-item[open] summary::after { transform: rotate(45deg); }
    .ybiz3-faq-item p {
      padding: 0 20px 18px;
      font-size: .85rem;
      color: var(--biz-gray);
      line-height: 1.75;
      margin: 0;
    }

    /* ━━━ FORMULAIRE BUSINESS ━━━ */
    .ybiz3-form-wrap {
      background: linear-gradient(135deg, #0a1410 0%, #1a3a24 100%);
      border-radius: 24px;
      padding: 44px 36px;
      color: #fff;
      position: relative;
      overflow: hidden;
    }
    .ybiz3-form-wrap::before {
      content: '🚀';
      position: absolute;
      top: 50%; right: -30px;
      transform: translateY(-50%);
      font-size: 14rem;
      opacity: .04;
      pointer-events: none;
    }
    .ybiz3-form-inner {
      position: relative;
      z-index: 2;
      max-width: 720px;
      margin: 0 auto;
    }
    .ybiz3-form-head {
      text-align: center;
      margin-bottom: 26px;
    }
    .ybiz3-form-card {
      background: rgba(255,255,255,.04);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,.1);
      border-radius: 16px;
      padding: 24px;
    }

    /* ━━━ CTA FINAL ━━━ */
    .ybiz3-final {
      background: linear-gradient(135deg, #0a1410 0%, #1a3a24 100%);
      border-radius: 22px;
      padding: 48px 36px;
      color: #fff;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .ybiz3-final::before {
      content: '💼';
      position: absolute;
      top: 50%; right: -10px;
      transform: translateY(-50%);
      font-size: 14rem;
      opacity: .05;
      pointer-events: none;
    }
    .ybiz3-final::after {
      content: '📈';
      position: absolute;
      top: 50%; left: -10px;
      transform: translateY(-50%);
      font-size: 11rem;
      opacity: .05;
      pointer-events: none;
    }
    .ybiz3-final-inner {
      position: relative;
      z-index: 2;
      max-width: 620px;
      margin: 0 auto;
    }
    .ybiz3-final-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 24px;
    }
    .ybiz3-final-trust {
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
    .ybiz3-final-trust li {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: .75rem;
      color: rgba(255,255,255,.6);
    }

    /* ━━━ BUTTONS ━━━ */
    .ybiz3-btn {
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
    .ybiz3-btn--pri {
      background: linear-gradient(135deg, var(--biz-yellow), var(--biz-gold));
      color: #0d1f14;
      box-shadow: 0 8px 22px rgba(252,209,22,.35);
    }
    .ybiz3-btn--pri:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(252,209,22,.45);
    }
    .ybiz3-btn--sec {
      background: rgba(255,255,255,.1);
      color: #fff;
      border: 1.5px solid rgba(255,255,255,.2);
      backdrop-filter: blur(10px);
    }
    .ybiz3-btn--sec:hover { background: rgba(255,255,255,.18); }
    .ybiz3-btn--green {
      background: linear-gradient(135deg, var(--biz-green), var(--biz-green-deep));
      color: #fff;
      box-shadow: 0 8px 22px rgba(26,107,58,.3);
    }
    .ybiz3-btn--green:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(26,107,58,.4);
    }

    /* ━━━ RESPONSIVE ━━━ */
    @media (max-width: 960px) {
      .ybiz3-hero { padding: 40px 18px 56px; }
      .ybiz3-hero-grid { grid-template-columns: 1fr; gap: 32px; }
      .ybiz3-hero-visual { min-height: auto; }
      .ybiz3-growth { grid-template-columns: 1fr; gap: 22px; padding: 28px 22px; }
      .ybiz3-final { padding: 36px 24px; }
      .ybiz3-section--tinted { padding: 40px 18px; }
      .ybiz3-form-wrap { padding: 32px 22px; }
    }
    @media (max-width: 500px) {
      .ybiz3-hero { padding: 32px 16px 50px; }
      .ybiz3-h1 { font-size: 1.85rem; }
      .ybiz3-args { grid-template-columns: 1fr; }
      .ybiz3-hero-stats { grid-template-columns: 1fr 1fr; gap: 10px; }
      .ybiz3-hero-cta { flex-direction: column; align-items: stretch; }
      .ybiz3-btn { width: 100%; text-align: center; }
      .ybiz3-section, .ybiz3-section--tinted { padding-left: 16px; padding-right: 16px; }
      .ybiz3-growth-stats { grid-template-columns: 1fr 1fr; }
    }
  `;

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>

      <div className="yorix-biz-v3 anim">
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* HERO PREMIUM B2B                   */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <header className="ybiz3-hero">
          <div className="ybiz3-hero-inner">
            <InlineBreadcrumb
              items={[
                { label: "Accueil", onClick: () => goPage?.("home") },
                { label: "Yorix Business · Growth Hub" },
              ]}
            />

            <div className="ybiz3-hero-grid">
              <div>
                <span className="ybiz3-eyebrow">
                  <span className="ybiz3-eyebrow-dot" /> Yorix Business · Growth Hub CM
                </span>

                <h1 className="ybiz3-h1">
                  Accélérez votre commerce.<br/>
                  <em>Développez votre entreprise.</em>
                </h1>

                <p className="ybiz3-sub">
                  La couche commerce premium pour entreprises ambitieuses au Cameroun :
                  <strong> sourcing B2B, visibilité nationale, paiements traçables, logistique</strong> et
                  accompagnement humain — sur une seule plateforme.
                </p>

                <ul className="ybiz3-args">
                  <li><span>🏬</span><span>Achats B2B</span></li>
                  <li><span>📣</span><span>Visibilité ciblée</span></li>
                  <li><span>🏦</span><span>Paiements tracés</span></li>
                  <li><span>🚚</span><span>Logistique J+1</span></li>
                </ul>

                <div className="ybiz3-hero-cta">
                  <button
                    type="button"
                    className="ybiz3-btn ybiz3-btn--pri"
                    onClick={scrollToForm}
                  >
                    🚀 Lancer une demande
                  </button>
                  <button
                    type="button"
                    className="ybiz3-btn ybiz3-btn--sec"
                    onClick={() => goPage?.("academy")}
                  >
                    🎓 Former mes équipes
                  </button>
                </div>

                <div className="ybiz3-hero-stats">
                  <div>
                    <div className="ybiz3-hero-stat-val">+850</div>
                    <div className="ybiz3-hero-stat-lbl">ENTREPRISES</div>
                  </div>
                  <div>
                    <div className="ybiz3-hero-stat-val">10</div>
                    <div className="ybiz3-hero-stat-lbl">RÉGIONS CM</div>
                  </div>
                  <div>
                    <div className="ybiz3-hero-stat-val">5%</div>
                    <div className="ybiz3-hero-stat-lbl">COMMISSION</div>
                  </div>
                </div>
              </div>

              {/* DASHBOARD KPI HERO */}
              <div className="ybiz3-hero-visual">
                <div className="ybiz3-dashboard">
                  <div className="ybiz3-dash-head">
                    <div className="ybiz3-dash-brand">
                      <div className="ybiz3-dash-logo">Y</div>
                      <div className="ybiz3-dash-name">
                        Dashboard Pro
                        <small>YORIX BUSINESS</small>
                      </div>
                    </div>
                    <div className="ybiz3-dash-badge">LIVE</div>
                  </div>

                  <div className="ybiz3-dash-kpis">
                    <div className="ybiz3-dash-kpi">
                      <div className="ybiz3-dash-kpi-lbl">CA du mois</div>
                      <div className="ybiz3-dash-kpi-val">2,4M F</div>
                      <div className="ybiz3-dash-kpi-trend ybiz3-dash-kpi-trend--up">▲ +18%</div>
                    </div>
                    <div className="ybiz3-dash-kpi">
                      <div className="ybiz3-dash-kpi-lbl">Commandes</div>
                      <div className="ybiz3-dash-kpi-val">142</div>
                      <div className="ybiz3-dash-kpi-trend ybiz3-dash-kpi-trend--up">▲ +24%</div>
                    </div>
                  </div>

                  <div className="ybiz3-dash-chart">
                    <div className="ybiz3-dash-chart-head">
                      <div className="ybiz3-dash-chart-title">📊 Ventes hebdo</div>
                      <div className="ybiz3-dash-chart-period">7 derniers jours</div>
                    </div>
                    <div className="ybiz3-dash-bars">
                      {[40, 65, 50, 75, 60, 85, 100].map((h, i) => (
                        <div
                          key={i}
                          className={`ybiz3-dash-bar${i === 6 ? " ybiz3-dash-bar--active" : ""}`}
                          style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="ybiz3-dash-team">
                    <div className="ybiz3-dash-team-avatars">
                      <div className="ybiz3-dash-team-av" style={{ background: "#22c55e" }}>A</div>
                      <div className="ybiz3-dash-team-av" style={{ background: "#f59e0b" }}>K</div>
                      <div className="ybiz3-dash-team-av" style={{ background: "#3b82f6" }}>M</div>
                      <div className="ybiz3-dash-team-av" style={{ background: "#7c3aed" }}>+5</div>
                    </div>
                    <div className="ybiz3-dash-team-text">
                      <div className="ybiz3-dash-team-name">8 membres actifs</div>
                      <div className="ybiz3-dash-team-sub">3 vendeurs · 2 livreurs · 3 prestataires</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* 01 · PILIERS BUSINESS              */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="ybiz3-section">
          <div className="ybiz3-section-head">
            <span className="ybiz3-eyebrow-light">01 · 6 piliers business</span>
            <h2 className="ybiz3-h2">L'infrastructure complète pour votre <em>croissance</em></h2>
            <p className="ybiz3-lead">
              Six leviers stratégiques pour transformer votre entreprise et accélérer votre développement au Cameroun.
            </p>
          </div>

          <div className="ybiz3-piliers">
            {PILIERS.map((p) => (
              <article
                key={p.id}
                className="ybiz3-pilier"
                style={{ "--p-color": p.color }}
              >
                <div className="ybiz3-pilier-head">
                  <div className="ybiz3-pilier-icon">{p.icon}</div>
                  <span className="ybiz3-pilier-metric">{p.metric}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* 02 · SOLUTIONS PAR TYPOLOGIE       */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="ybiz3-section--tinted">
          <div className="ybiz3-section-head">
            <span className="ybiz3-eyebrow-light">02 · Solutions sur mesure</span>
            <h2 className="ybiz3-h2">Une solution pour <em>chaque type d'entreprise</em></h2>
            <p className="ybiz3-lead">
              PME, retail, distributeurs, diaspora : nous adaptons Yorix Business à votre modèle.
            </p>
          </div>

          <div className="ybiz3-solutions">
            {SOLUTIONS.map((s) => (
              <article
                key={s.id}
                className="ybiz3-solution"
                style={{ "--sol-color": s.color }}
                onClick={scrollToForm}
              >
                <div className="ybiz3-solution-emoji">{s.emoji}</div>
                <h3 className="ybiz3-solution-title">{s.title}</h3>
                <p className="ybiz3-solution-desc">{s.desc}</p>
                <ul className="ybiz3-solution-perks">
                  {s.perks.map((p) => (
                    <li key={p}><span>✓</span>{p}</li>
                  ))}
                </ul>
                <span className="ybiz3-solution-cta">
                  Demander un audit <span>→</span>
                </span>
              </article>
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* 03 · RÔLES ENTREPRISE              */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="ybiz3-section">
          <div className="ybiz3-section-head">
            <span className="ybiz3-eyebrow-light">03 · 4 rôles intégrés</span>
            <h2 className="ybiz3-h2">Gérez toute votre équipe sur <em>une seule plateforme</em></h2>
            <p className="ybiz3-lead">
              Acheteurs, vendeurs, livreurs, prestataires : 4 rôles complémentaires pour orchestrer votre activité.
            </p>
          </div>

          <div className="ybiz3-roles">
            {ROLES.map((r) => (
              <article
                key={r.id}
                className="ybiz3-role"
                style={{
                  "--role-color": `${r.color}40`,
                  "--role-gradient": r.gradient,
                }}
              >
                <div className="ybiz3-role-head">
                  <div className="ybiz3-role-icon">{r.icon}</div>
                  <div>
                    <div className="ybiz3-role-title">{r.title}</div>
                    <div className="ybiz3-role-sub">Workflow optimisé</div>
                  </div>
                </div>
                <ul className="ybiz3-role-workflow">
                  {r.workflow.map((w, i) => (
                    <li key={w}>
                      <span>{i + 1}</span>{w}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* 04 · GROWTH + ACADEMY              */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="ybiz3-section">
          <div className="ybiz3-growth">
            <div className="ybiz3-growth-left">
              <span className="ybiz3-eyebrow-light">04 · Growth Engine</span>
              <h2 className="ybiz3-h2">
                Formez vos équipes,<br/><em>scalez votre business</em>
              </h2>
              <p className="ybiz3-lead" style={{ marginBottom: 0 }}>
                Yorix Academy + Business Manager dédié : un duo gagnant pour accélérer votre croissance commerciale.
              </p>
              <ul className="ybiz3-growth-stats">
                <li className="ybiz3-growth-stat">
                  <div className="ybiz3-growth-stat-val">+850</div>
                  <div className="ybiz3-growth-stat-lbl">Étudiants formés</div>
                </li>
                <li className="ybiz3-growth-stat">
                  <div className="ybiz3-growth-stat-val">+180%</div>
                  <div className="ybiz3-growth-stat-lbl">CA moyen après formation</div>
                </li>
                <li className="ybiz3-growth-stat">
                  <div className="ybiz3-growth-stat-val">90j</div>
                  <div className="ybiz3-growth-stat-lbl">Plan d'action</div>
                </li>
                <li className="ybiz3-growth-stat">
                  <div className="ybiz3-growth-stat-val">1:1</div>
                  <div className="ybiz3-growth-stat-lbl">Coaching dédié</div>
                </li>
              </ul>
            </div>
            <div className="ybiz3-growth-right">
              <div style={{ fontSize: "4rem", marginBottom: 14 }}>🎓</div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.3rem", fontWeight: 800, color: "var(--biz-ink)", marginBottom: 10, letterSpacing: "-.4px" }}>
                Yorix Academy Business
              </h3>
              <p style={{ fontSize: ".88rem", color: "var(--biz-gray)", lineHeight: 1.65, marginBottom: 16, maxWidth: 320, margin: "0 auto 16px" }}>
                Modules sur mesure pour vos commerciaux, livreurs et prestataires.
                Certificats Yorix officiels à la clé.
              </p>
              <div className="ybiz3-growth-cta">
                <button
                  type="button"
                  className="ybiz3-btn ybiz3-btn--green"
                  onClick={() => goPage?.("academy")}
                >
                  🎓 Découvrir l'Academy
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* 05 · SUCCESS STORIES B2B           */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="ybiz3-section">
          <div className="ybiz3-section-head">
            <span className="ybiz3-eyebrow-light">05 · Success stories</span>
            <h2 className="ybiz3-h2">Ils ont <em>transformé leur business</em></h2>
            <p className="ybiz3-lead">
              Découvrez comment des entreprises camerounaises ont accéléré leur croissance avec Yorix Business.
            </p>
          </div>

          <div className="ybiz3-stories">
            {STORIES.map((s) => (
              <article
                key={s.name}
                className="ybiz3-story"
                style={{ "--story-color": s.color }}
              >
                <div className="ybiz3-story-header">
                  <div className="ybiz3-story-av">{s.avatar}</div>
                  <div>
                    <div className="ybiz3-story-name">{s.name}</div>
                    <div className="ybiz3-story-role">{s.role}</div>
                  </div>
                </div>
                <p className="ybiz3-story-quote">{s.quote}</p>
                <span className="ybiz3-story-metric">📈 {s.metric}</span>
              </article>
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* 06 · FAQ                           */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="ybiz3-section">
          <div className="ybiz3-section-head">
            <span className="ybiz3-eyebrow-light">06 · Questions fréquentes</span>
            <h2 className="ybiz3-h2">Tout savoir sur <em>Yorix Business</em></h2>
          </div>

          <div className="ybiz3-faq">
            {FAQ_DATA.map((f, i) => (
              <details className="ybiz3-faq-item" key={i}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* 07 · FORMULAIRE BUSINESS           */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="ybiz3-section" id="ybiz3-form">
          <div className="ybiz3-form-wrap">
            <div className="ybiz3-form-inner">
              <div className="ybiz3-form-head">
                <span className="ybiz3-eyebrow">
                  <span className="ybiz3-eyebrow-dot" /> 07 · Demande personnalisée
                </span>
                <h2 className="ybiz3-h2 ybiz3-h2--on-dark">
                  Recevez votre <em>audit gratuit</em>
                </h2>
                <p className="ybiz3-sub ybiz3-sub--on-dark" style={{ margin: "10px auto 0", maxWidth: 540 }}>
                  Un Business Manager Yorix vous contacte sous 24h pour analyser vos besoins
                  et construire votre plan d'action sur <strong>90 jours</strong>.
                </p>
              </div>

              <div className="ybiz3-form-card">
                <BusinessForm />
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* CTA FINAL                          */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="ybiz3-section">
          <div className="ybiz3-final">
            <div className="ybiz3-final-inner">
              <span className="ybiz3-eyebrow">
                <span className="ybiz3-eyebrow-dot" /> Rejoignez Yorix Business
              </span>
              <h2 className="ybiz3-h2 ybiz3-h2--on-dark">
                Votre entreprise mérite<br/>une <em>infrastructure premium</em>
              </h2>
              <p className="ybiz3-sub ybiz3-sub--on-dark">
                <strong>+850 entreprises camerounaises</strong> nous font déjà confiance pour accélérer leur croissance.
                Inscription gratuite · commission 5% · accompagnement humain.
              </p>

              <div className="ybiz3-final-actions">
                <button
                  type="button"
                  className="ybiz3-btn ybiz3-btn--pri"
                  onClick={user ? scrollToForm : () => openRegister("seller")}
                >
                  🚀 {user ? "Demander un audit" : "Créer mon compte pro"}
                </button>
                <button
                  type="button"
                  className="ybiz3-btn ybiz3-btn--sec"
                  onClick={() => goPage?.("contact")}
                >
                  💬 Parler à un expert
                </button>
              </div>

              <ul className="ybiz3-final-trust">
                <li><span aria-hidden>🇨🇲</span> 100% Cameroun</li>
                <li><span aria-hidden>🏦</span> Paiements sécurisés</li>
                <li><span aria-hidden>📈</span> +850 entreprises</li>
                <li><span aria-hidden>⚡</span> Setup 7 jours</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
