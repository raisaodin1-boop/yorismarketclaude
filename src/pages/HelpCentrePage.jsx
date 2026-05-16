// ═══════════════════════════════════════════════════════════════
//  YORIX CM — HELP CENTRE PAGE PREMIUM v3
//  Hero recherche · catégories · articles · FAQ · sujets tendance · CTA
// ═══════════════════════════════════════════════════════════════

import { useMemo, useState } from "react";

const CATEGORIES = [
  {
    id: "acheter",
    icon: "🛍️",
    title: "Acheter sur Yorix",
    desc: "Commande, paiement, escrow, livraison",
    color: "#1a6b3a",
    articles: [
      {
        q: "Comment passer une commande ?",
        a:
          "Parcourez le catalogue, ajoutez vos produits au panier puis validez via WhatsApp ou votre espace client. Choisissez votre mode de paiement (MTN MoMo, Orange Money ou carte) et confirmez. Vous recevez un email de confirmation et le suivi en temps réel dans votre compte.",
      },
      {
        q: "Quels modes de paiement sont acceptés ?",
        a:
          "Nous acceptons MTN Mobile Money, Orange Money, carte bancaire (Visa, Mastercard) et paiement à la livraison (cash) pour certaines villes. Les paiements escrow protégés sont disponibles sur les produits marqués 🔐.",
      },
      {
        q: "Comment fonctionne l'escrow ?",
        a:
          "Lorsque vous payez avec l'option Escrow, vos fonds sont conservés par Yorix jusqu'à confirmation de réception conforme. Si vous n'êtes pas satisfait(e), vous pouvez ouvrir un litige sous 7 jours — notre équipe arbitre sous 48h ouvrées.",
      },
      {
        q: "Puis-je annuler une commande ?",
        a:
          "Oui, tant que le vendeur n'a pas confirmé l'expédition. Allez dans 'Mes commandes' puis cliquez sur 'Annuler'. Si l'expédition a déjà eu lieu, contactez le support WhatsApp.",
      },
      {
        q: "Comment suivre ma commande ?",
        a:
          "Depuis votre espace 'Mes commandes', vous voyez en temps réel : préparation → expédition → livraison → validation. Vous recevez aussi des notifications WhatsApp à chaque étape.",
      },
    ],
  },
  {
    id: "vendre",
    icon: "🏪",
    title: "Vendre sur Yorix",
    desc: "Boutique, produits, commission, paiements",
    color: "#f59e0b",
    articles: [
      {
        q: "Comment créer ma boutique vendeur ?",
        a:
          "Cliquez sur 'S'inscrire' puis choisissez 'Vendeur'. Renseignez vos infos, ajoutez une photo de profil et une bannière. Acceptez la charte pro. Votre boutique est en ligne en moins de 10 minutes.",
      },
      {
        q: "Quelle est la commission Yorix ?",
        a:
          "Yorix prélève 5% de commission sur chaque transaction réalisée via la plateforme. Aucun frais fixe, aucun abonnement. La commission n'est jamais affichée au client final.",
      },
      {
        q: "Comment ajouter mes produits ?",
        a:
          "Depuis votre dashboard vendeur, cliquez 'Ajouter un produit'. Remplissez : titre, description, prix, photos (jusqu'à 8), catégorie, ville de stock. Validez — votre produit est en ligne immédiatement après modération automatique.",
      },
      {
        q: "Comment obtenir le badge Top Vendeur ?",
        a:
          "Le badge Top Vendeur est attribué automatiquement après : 50 commandes livrées, 95%+ de satisfaction client, 0 litige non résolu. Il booste votre visibilité sur les pages catégories.",
      },
      {
        q: "Quand suis-je payé(e) ?",
        a:
          "Vos paiements sont libérés automatiquement 24h après confirmation de livraison conforme par l'acheteur. Versement direct sur votre numéro MoMo ou Orange Money — pas de frais de retrait.",
      },
    ],
  },
  {
    id: "livraison",
    icon: "🚚",
    title: "Livraison & suivi",
    desc: "Délais, zones, tarifs, Yorix Ride",
    color: "#0891b2",
    articles: [
      {
        q: "Quels sont les délais de livraison ?",
        a:
          "Douala et Yaoundé intra-ville : J+1 (parfois J+0 si commande avant 14h). Villes secondaires (Bafoussam, Bamenda, Garoua, Kribi) : J+2 à J+3. Zones rurales : J+3 à J+5 selon localisation.",
      },
      {
        q: "Combien coûte la livraison ?",
        a:
          "Douala/Yaoundé intra-ville : 1 500 à 3 000 FCFA selon distance. Inter-villes : 2 500 à 6 000 FCFA. Livraison offerte automatiquement dès 50 000 FCFA d'achats sur les produits physiques.",
      },
      {
        q: "Où puis-je faire livrer ?",
        a:
          "Yorix Ride couvre 10 régions du Cameroun. Vous pouvez livrer à domicile, au bureau, en point relais (mairie, station-service partenaire). Adresse précise + numéro WhatsApp obligatoires.",
      },
      {
        q: "Que faire si le colis est endommagé ?",
        a:
          "Refusez la livraison et prenez une photo immédiatement. Contactez le support WhatsApp dans les 24h avec la photo. Si l'option Escrow est active, ouvrez un litige depuis votre espace client.",
      },
      {
        q: "Puis-je modifier l'adresse après commande ?",
        a:
          "Oui, tant que le statut est 'En préparation'. Allez dans 'Mes commandes' > 'Modifier l'adresse'. Si la commande est déjà 'En cours d'expédition', contactez le support immédiatement.",
      },
    ],
  },
  {
    id: "fidelite",
    icon: "💎",
    title: "Fidélité & points",
    desc: "Cumul, paliers, récompenses Yorix",
    color: "#7c3aed",
    articles: [
      {
        q: "Comment gagner des points ?",
        a:
          "Vous gagnez 5 points pour chaque achat effectué sur Yorix. Bonus de bienvenue : 100 points à l'inscription. Points additionnels pour parrainage (50 pts par filleul actif) et avis vérifiés (10 pts par avis).",
      },
      {
        q: "À quoi servent les points ?",
        a:
          "1 point = 1 FCFA de réduction. Vous pouvez utiliser vos points dès 500 points cumulés au moment du checkout. Les points n'expirent jamais tant que votre compte est actif.",
      },
      {
        q: "Quels sont les paliers VIP ?",
        a:
          "Bronze (0-99 pts) : avantages standards. Argent (100-499 pts) : -5% sur livraison. Or (500-1499 pts) : -10% livraison + accès ventes privées. Platine (1500+ pts) : livraison gratuite illimitée + support prioritaire.",
      },
      {
        q: "Comment parrainer un ami ?",
        a:
          "Dans 'Mon compte' > 'Programme parrainage', copiez votre code unique et partagez-le. Votre filleul reçoit 100 points à l'inscription, et vous gagnez 50 points dès sa première commande validée.",
      },
      {
        q: "Mes points peuvent-ils expirer ?",
        a:
          "Non, vos points sont valables tant que votre compte est actif. Si votre compte reste inactif plus de 24 mois consécutifs, un email de rappel est envoyé avant toute action.",
      },
    ],
  },
];

/** Clés compatibles avec `pathForPage` (cf. seoRoutes PAGE_PATH). */
const POPULAR_TOPICS = [
  { tag: "Escrow acheteur", page: "escrow" },
  { tag: "Suivi de livraison", page: "livraison" },
  { tag: "Points fidélité", page: "loyalty" },
  { tag: "Devenir vendeur", page: "devenirVendeur" },
  { tag: "Devenir livreur", page: "devenirLivreur" },
  { tag: "Contacter le support", page: "contact" },
];

const POPULAR_ARTICLES = [
  {
    icon: "💰",
    title: "Comment fonctionne l'escrow Yorix ?",
    desc: "Tout savoir sur la protection acheteur et la médiation 48h.",
    cat: "Acheter",
    page: "escrow",
  },
  {
    icon: "🚚",
    title: "Délais de livraison par ville",
    desc: "J+1, J+2, J+3 — combien de temps pour chaque destination.",
    cat: "Livraison",
    page: "livraison",
  },
  {
    icon: "🎁",
    title: "Programme de fidélité — guide complet",
    desc: "Cumul, paliers, récompenses, parrainage.",
    cat: "Fidélité",
    page: "loyalty",
  },
  {
    icon: "🏪",
    title: "Devenir vendeur en 10 minutes",
    desc: "Setup boutique, commission 5%, badges et visibilité.",
    cat: "Vendre",
    page: "devenirVendeur",
  },
];

function InlineBreadcrumb({ items }) {
  return (
    <nav className="yhlp3-bc" aria-label="Fil d'ariane">
      {items.map((it, i) => (
        <span key={i} className="yhlp3-bc-item">
          {it.onClick ? (
            <button type="button" onClick={it.onClick}>
              {it.label}
            </button>
          ) : (
            <span className="yhlp3-bc-current">{it.label}</span>
          )}
          {i < items.length - 1 && (
            <span className="yhlp3-bc-sep" aria-hidden="true">
              ›
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function HelpCentrePage({ goPage }) {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("acheter");

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATEGORIES;
    return CATEGORIES.map((cat) => ({
      ...cat,
      articles: cat.articles.filter(
        (a) => a.q.toLowerCase().includes(q) || a.a.toLowerCase().includes(q)
      ),
    })).filter((cat) => cat.articles.length > 0);
  }, [query]);

  const currentCat = filteredCategories.find((c) => c.id === activeCat) || filteredCategories[0];

  const css = `
    .yorix-hlp-v3 {
      --hlp-green: #1a6b3a;
      --hlp-green-deep: #0d4d28;
      --hlp-green-pale: #e8f5e9;
      --hlp-green-light: #86efac;
      --hlp-yellow: #fcd116;
      --hlp-gold: #f59e0b;
      --hlp-ink: var(--ink, #111);
      --hlp-gray: var(--gray, #666);
      --hlp-surface: var(--surface, #fff);
      --hlp-surface2: var(--surface2, #f8f8f8);
      --hlp-border: var(--border, #e5e5e5);
      --hlp-shadow: 0 12px 30px rgba(0,0,0,.08);
      --hlp-shadow-hover: 0 22px 50px rgba(0,0,0,.14);

      font-family: 'DM Sans', sans-serif;
      color: var(--hlp-ink);
    }
    .yorix-hlp-v3 * { box-sizing: border-box; }

    .yhlp3-bc {
      display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
      margin-bottom: 20px; font-size: .76rem;
    }
    .yhlp3-bc-item { display: inline-flex; align-items: center; gap: 6px; }
    .yhlp3-bc button {
      background: none; border: none; color: rgba(255,255,255,.65);
      cursor: pointer; padding: 0; font-family: inherit; font-size: inherit;
      transition: color .15s;
    }
    .yhlp3-bc button:hover { color: var(--hlp-yellow); }
    .yhlp3-bc-current { color: #fff; font-weight: 600; }
    .yhlp3-bc-sep { color: rgba(255,255,255,.35); font-size: .9rem; }

    .yhlp3-hero {
      position: relative;
      background: linear-gradient(135deg, #0a1410 0%, #1a3a24 45%, #0d3320 100%);
      color: #fff;
      padding: 56px 24px 70px;
      overflow: hidden;
      border-radius: 0 0 28px 28px;
      margin-bottom: 50px;
    }
    .yhlp3-hero::before {
      content: '';
      position: absolute;
      top: -120px; right: -100px;
      width: 460px; height: 460px;
      background: radial-gradient(circle, rgba(252,209,22,.16), transparent 65%);
      border-radius: 50%;
      pointer-events: none;
    }
    .yhlp3-hero::after {
      content: '';
      position: absolute;
      bottom: -150px; left: -120px;
      width: 420px; height: 420px;
      background: radial-gradient(circle, rgba(79,209,125,.12), transparent 65%);
      border-radius: 50%;
      pointer-events: none;
    }
    .yhlp3-hero-inner {
      max-width: 900px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
      text-align: center;
    }
    .yhlp3-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: rgba(252,209,22,.14);
      color: var(--hlp-yellow);
      border: 1px solid rgba(252,209,22,.32);
      padding: 6px 14px;
      border-radius: 50px;
      font-size: .7rem;
      font-weight: 700;
      margin-bottom: 18px;
      letter-spacing: .04em;
    }
    .yhlp3-eyebrow-dot {
      width: 7px; height: 7px;
      background: var(--hlp-yellow);
      border-radius: 50%;
      box-shadow: 0 0 12px var(--hlp-yellow);
      animation: yhlp3Pulse 2s ease-in-out infinite;
    }
    @keyframes yhlp3Pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%      { opacity: .5; transform: scale(1.4); }
    }
    .yhlp3-h1 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 800;
      line-height: 1.07;
      letter-spacing: -1.5px;
      margin-bottom: 14px;
    }
    .yhlp3-h1 em {
      font-style: normal;
      background: linear-gradient(135deg, #fcd116, #f59e0b);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .yhlp3-sub {
      font-size: clamp(.95rem, 1.5vw, 1.05rem);
      color: rgba(255,255,255,.78);
      line-height: 1.65;
      margin-bottom: 26px;
    }

    .yhlp3-search {
      position: relative;
      max-width: 600px;
      margin: 0 auto 20px;
    }
    .yhlp3-search-ico {
      position: absolute;
      left: 18px; top: 50%;
      transform: translateY(-50%);
      font-size: 1.1rem;
      pointer-events: none;
    }
    .yhlp3-search input {
      width: 100%;
      padding: 16px 50px 16px 48px;
      border-radius: 14px;
      border: 1.5px solid rgba(255,255,255,.15);
      background: rgba(255,255,255,.12);
      backdrop-filter: blur(10px);
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      font-size: .95rem;
      outline: none;
      transition: all .2s;
    }
    .yhlp3-search input::placeholder { color: rgba(255,255,255,.55); }
    .yhlp3-search input:focus {
      border-color: var(--hlp-yellow);
      background: rgba(255,255,255,.18);
      box-shadow: 0 0 0 4px rgba(252,209,22,.12);
    }
    .yhlp3-search-clear {
      position: absolute;
      right: 12px; top: 50%;
      transform: translateY(-50%);
      background: rgba(255,255,255,.2);
      border: none;
      width: 28px; height: 28px;
      border-radius: 50%;
      color: #fff;
      font-size: 1.1rem;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .yhlp3-search-clear:hover { background: rgba(255,255,255,.32); }

    .yhlp3-topics {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
      justify-content: center;
      max-width: 700px;
      margin: 0 auto;
    }
    .yhlp3-topics-lbl {
      font-size: .72rem;
      color: rgba(255,255,255,.55);
      font-weight: 700;
      letter-spacing: .08em;
      text-transform: uppercase;
      width: 100%;
      margin-bottom: 4px;
    }
    .yhlp3-topic {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(255,255,255,.08);
      border: 1px solid rgba(255,255,255,.15);
      color: rgba(255,255,255,.9);
      padding: 6px 13px;
      border-radius: 50px;
      font-size: .76rem;
      font-weight: 600;
      cursor: pointer;
      transition: all .15s;
      font-family: inherit;
    }
    .yhlp3-topic:hover {
      background: rgba(252,209,22,.16);
      border-color: rgba(252,209,22,.4);
      color: var(--hlp-yellow);
      transform: translateY(-1px);
    }
    .yhlp3-topic:focus-visible {
      outline: 3px solid var(--hlp-yellow);
      outline-offset: 2px;
    }

    .yhlp3-section {
      max-width: 1200px;
      margin: 0 auto 56px;
      padding: 0 24px;
    }
    .yhlp3-section--tinted {
      background: var(--hlp-surface2);
      padding: 56px 24px;
      margin: 0 auto 56px;
      border-radius: 24px;
      max-width: 1248px;
    }
    .yhlp3-section-head {
      text-align: center;
      max-width: 720px;
      margin: 0 auto 36px;
    }
    .yhlp3-eyebrow-light {
      display: inline-block;
      background: var(--hlp-surface2);
      color: var(--hlp-green);
      border: 1px solid var(--hlp-border);
      padding: 5px 12px;
      border-radius: 50px;
      font-size: .66rem;
      font-weight: 700;
      letter-spacing: .12em;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .yhlp3-h2 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(1.5rem, 3.5vw, 2.1rem);
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -1px;
      color: var(--hlp-ink);
      margin-bottom: 10px;
    }
    .yhlp3-h2 em {
      font-style: normal;
      color: var(--hlp-green);
    }
    .yhlp3-h2--on-dark { color: #fff; }
    .yhlp3-h2--on-dark em {
      background: linear-gradient(135deg, #fcd116, #f59e0b);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .yhlp3-lead {
      font-size: .95rem;
      color: var(--hlp-gray);
      line-height: 1.65;
    }
    .yhlp3-sub--on-dark { color: rgba(255,255,255,.78); }
    .yhlp3-sub--on-dark strong { color: #fff; }

    .yhlp3-popular {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
    }
    .yhlp3-popular-card {
      background: var(--hlp-surface);
      border: 1.5px solid var(--hlp-border);
      border-radius: 14px;
      padding: 22px 22px;
      cursor: pointer;
      transition: all .25s;
      position: relative;
      overflow: hidden;
    }
    .yhlp3-popular-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--hlp-green), var(--hlp-yellow));
      transform: scaleX(0);
      transform-origin: left;
      transition: transform .35s;
    }
    .yhlp3-popular-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--hlp-shadow-hover);
      border-color: var(--hlp-green);
    }
    .yhlp3-popular-card:focus-visible {
      outline: 3px solid var(--hlp-green);
      outline-offset: 3px;
    }
    .yhlp3-popular-card:hover::before { transform: scaleX(1); }
    .yhlp3-popular-icon {
      width: 48px; height: 48px;
      background: linear-gradient(135deg, var(--hlp-green-pale), #fff9e6);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      margin-bottom: 12px;
      transition: transform .3s;
    }
    .yhlp3-popular-card:hover .yhlp3-popular-icon {
      transform: scale(1.1) rotate(-5deg);
    }
    .yhlp3-popular-cat {
      display: inline-block;
      background: var(--hlp-green-pale);
      color: var(--hlp-green);
      padding: 3px 9px;
      border-radius: 50px;
      font-size: .62rem;
      font-weight: 800;
      letter-spacing: .06em;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .yhlp3-popular-title {
      font-family: 'Syne', sans-serif;
      font-size: 1rem;
      font-weight: 800;
      color: var(--hlp-ink);
      margin-bottom: 6px;
      letter-spacing: -.2px;
      line-height: 1.3;
    }
    .yhlp3-popular-desc {
      font-size: .8rem;
      color: var(--hlp-gray);
      line-height: 1.55;
      margin-bottom: 12px;
    }
    .yhlp3-popular-link {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: .78rem;
      color: var(--hlp-green);
      transition: gap .2s;
    }
    .yhlp3-popular-card:hover .yhlp3-popular-link { gap: 9px; }

    .yhlp3-cat-tabs {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 32px;
    }
    .yhlp3-cat-tab {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--hlp-surface);
      border: 1.5px solid var(--hlp-border);
      color: var(--hlp-ink);
      padding: 11px 18px;
      border-radius: 50px;
      font-family: inherit;
      font-size: .86rem;
      font-weight: 600;
      cursor: pointer;
      transition: all .2s;
    }
    .yhlp3-cat-tab:hover {
      border-color: var(--cat-color, var(--hlp-green));
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(0,0,0,.06);
    }
    .yhlp3-cat-tab.is-active {
      background: var(--cat-color, var(--hlp-green));
      border-color: var(--cat-color, var(--hlp-green));
      color: #fff;
      box-shadow: 0 8px 22px rgba(26,107,58,.25);
    }
    .yhlp3-cat-tab:focus-visible {
      outline: 3px solid var(--cat-color, var(--hlp-green));
      outline-offset: 2px;
    }
    .yhlp3-cat-tab-icon { font-size: 1.1rem; }
    .yhlp3-cat-tab-count {
      background: rgba(0,0,0,.08);
      padding: 2px 8px;
      border-radius: 50px;
      font-size: .68rem;
      font-weight: 700;
    }
    .yhlp3-cat-tab.is-active .yhlp3-cat-tab-count {
      background: rgba(255,255,255,.22);
      color: #fff;
    }

    .yhlp3-faq {
      max-width: 820px;
      margin: 0 auto;
    }
    .yhlp3-faq-item {
      background: var(--hlp-surface);
      border: 1px solid var(--hlp-border);
      border-radius: 12px;
      margin-bottom: 10px;
      overflow: hidden;
      transition: all .2s;
    }
    .yhlp3-faq-item:hover { border-color: var(--hlp-green); }
    .yhlp3-faq-item[open] {
      box-shadow: var(--hlp-shadow);
      border-color: var(--hlp-green);
    }
    .yhlp3-faq-item summary {
      padding: 16px 20px;
      cursor: pointer;
      font-weight: 700;
      font-size: .92rem;
      color: var(--hlp-ink);
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 14px;
      letter-spacing: -.1px;
    }
    .yhlp3-faq-item summary::-webkit-details-marker { display: none; }
    .yhlp3-faq-item summary::after {
      content: '+';
      font-family: 'Syne', sans-serif;
      font-size: 1.6rem;
      color: var(--hlp-green);
      transition: transform .25s;
      flex-shrink: 0;
      line-height: 1;
    }
    .yhlp3-faq-item[open] summary::after { transform: rotate(45deg); }
    .yhlp3-faq-item p {
      padding: 0 20px 18px;
      font-size: .88rem;
      color: var(--hlp-gray);
      line-height: 1.75;
      margin: 0;
    }

    .yhlp3-empty {
      text-align: center;
      padding: 60px 20px;
      background: var(--hlp-surface);
      border: 1.5px dashed var(--hlp-border);
      border-radius: 16px;
      max-width: 600px;
      margin: 0 auto;
    }
    .yhlp3-empty-ico {
      font-size: 3.5rem;
      margin-bottom: 12px;
      opacity: .55;
    }
    .yhlp3-empty h3 {
      font-family: 'Syne', sans-serif;
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--hlp-ink);
      margin-bottom: 8px;
      letter-spacing: -.3px;
    }
    .yhlp3-empty p {
      color: var(--hlp-gray);
      font-size: .88rem;
      line-height: 1.6;
      margin: 0;
    }

    .yhlp3-final {
      background: linear-gradient(135deg, #0a1410 0%, #1a3a24 100%);
      border-radius: 22px;
      padding: 48px 36px;
      color: #fff;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .yhlp3-final::before {
      content: '🆘';
      position: absolute;
      top: 50%; right: -10px;
      transform: translateY(-50%);
      font-size: 13rem;
      opacity: .05;
      pointer-events: none;
    }
    .yhlp3-final::after {
      content: '💬';
      position: absolute;
      top: 50%; left: -10px;
      transform: translateY(-50%);
      font-size: 11rem;
      opacity: .05;
      pointer-events: none;
    }
    .yhlp3-final-inner {
      position: relative;
      z-index: 2;
      max-width: 600px;
      margin: 0 auto;
    }
    .yhlp3-final-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 22px;
    }
    .yhlp3-btn {
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
    .yhlp3-btn:focus-visible {
      outline: 3px solid var(--hlp-yellow);
      outline-offset: 2px;
    }
    .yhlp3-btn--pri {
      background: linear-gradient(135deg, var(--hlp-yellow), var(--hlp-gold));
      color: #0d1f14;
      box-shadow: 0 8px 22px rgba(252,209,22,.35);
    }
    .yhlp3-btn--pri:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(252,209,22,.45);
    }
    .yhlp3-btn--sec {
      background: rgba(255,255,255,.1);
      color: #fff;
      border: 1.5px solid rgba(255,255,255,.2);
      backdrop-filter: blur(10px);
    }
    .yhlp3-btn--sec:hover { background: rgba(255,255,255,.18); }

    @media (max-width: 960px) {
      .yhlp3-hero { padding: 40px 18px 56px; }
      .yhlp3-section--tinted { padding: 40px 18px; }
      .yhlp3-final { padding: 36px 22px; }
    }
    @media (max-width: 500px) {
      .yhlp3-h1 { font-size: 1.85rem; }
      .yhlp3-search input { padding: 14px 44px 14px 42px; font-size: .88rem; }
      .yhlp3-section, .yhlp3-section--tinted { padding-left: 16px; padding-right: 16px; }
      .yhlp3-cat-tab { padding: 9px 14px; font-size: .8rem; }
      .yhlp3-faq-item summary { padding: 14px 16px; font-size: .85rem; }
      .yhlp3-faq-item p { padding: 0 16px 14px; font-size: .82rem; }
    }
  `;

  return (
    <>
      <style>{css}</style>

      <div className="yorix-hlp-v3 anim">
        <header className="yhlp3-hero">
          <div className="yhlp3-hero-inner">
            <InlineBreadcrumb
              items={[{ label: "Accueil", onClick: () => goPage?.("home") }, { label: "Centre d'aide" }]}
            />
            <span className="yhlp3-eyebrow">
              <span className="yhlp3-eyebrow-dot" /> Centre d'aide officiel Yorix
            </span>
            <h1 className="yhlp3-h1">
              Comment pouvons-nous
              <br />
              vous <em>aider</em> ?
            </h1>
            <p className="yhlp3-sub">
              Réponses instantanées, organisées par sujet — marketplace, escrow, livraison et fidélité.
            </p>

            <div className="yhlp3-search">
              <span className="yhlp3-search-ico" aria-hidden="true">
                🔍
              </span>
              <input
                type="search"
                placeholder="Recherchez : escrow, livraison, points fidélité…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Rechercher dans l'aide"
                autoComplete="off"
              />
              {query ? (
                <button
                  type="button"
                  className="yhlp3-search-clear"
                  aria-label="Effacer la recherche"
                  onClick={() => setQuery("")}
                >
                  ×
                </button>
              ) : null}
            </div>

            <div className="yhlp3-topics">
              <div className="yhlp3-topics-lbl">Sujets populaires</div>
              {POPULAR_TOPICS.map((t) => (
                <button key={t.tag} type="button" className="yhlp3-topic" onClick={() => goPage?.(t.page)}>
                  {t.tag}
                </button>
              ))}
            </div>
          </div>
        </header>

        {!query.trim() ? (
          <section className="yhlp3-section">
            <div className="yhlp3-section-head">
              <span className="yhlp3-eyebrow-light">01 · Articles populaires</span>
              <h2 className="yhlp3-h2">
                Les guides les plus <em>consultés</em>
              </h2>
              <p className="yhlp3-lead">Les sujets que nos clients consultent le plus chaque semaine.</p>
            </div>

            <div className="yhlp3-popular">
              {POPULAR_ARTICLES.map((a) => (
                <article
                  key={a.title}
                  className="yhlp3-popular-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => goPage?.(a.page)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      goPage?.(a.page);
                    }
                  }}
                >
                  <div className="yhlp3-popular-icon">{a.icon}</div>
                  <span className="yhlp3-popular-cat">{a.cat}</span>
                  <h3 className="yhlp3-popular-title">{a.title}</h3>
                  <p className="yhlp3-popular-desc">{a.desc}</p>
                  <span className="yhlp3-popular-link">Lire le guide →</span>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="yhlp3-section--tinted">
          <div className="yhlp3-section-head">
            <span className="yhlp3-eyebrow-light">{query.trim() ? `🔍 Résultats pour « ${query.trim()} »` : "02 · Toutes les questions"}</span>
            <h2 className="yhlp3-h2">{query.trim() ? "Résultats de recherche" : <>Parcourir par <em>catégorie</em></>}</h2>
            {!query.trim() ? (
              <p className="yhlp3-lead">Acheteurs, vendeurs, livreurs ou clients fidèles : sélectionnez votre rôle.</p>
            ) : null}
          </div>

          {!query.trim() ? (
            <div className="yhlp3-cat-tabs" role="tablist" aria-label="Catégories d'aide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCat === cat.id}
                  className={`yhlp3-cat-tab${activeCat === cat.id ? " is-active" : ""}`}
                  style={{ "--cat-color": cat.color }}
                  onClick={() => setActiveCat(cat.id)}
                >
                  <span className="yhlp3-cat-tab-icon" aria-hidden="true">
                    {cat.icon}
                  </span>
                  <span>{cat.title}</span>
                  <span className="yhlp3-cat-tab-count">{cat.articles.length}</span>
                </button>
              ))}
            </div>
          ) : null}

          {filteredCategories.length === 0 ? (
            <div className="yhlp3-empty">
              <div className="yhlp3-empty-ico" aria-hidden="true">
                🔍
              </div>
              <h3>Aucun article ne correspond à votre recherche</h3>
              <p>Essayez un autre mot-clé ou contactez-nous directement via WhatsApp.</p>
            </div>
          ) : (
            <div className="yhlp3-faq">
              {query.trim() ? (
                filteredCategories.map((cat) => (
                  <div key={cat.id} style={{ marginBottom: 20 }}>
                    <div
                      style={{
                        fontFamily: "'Syne',sans-serif",
                        fontWeight: 800,
                        fontSize: ".95rem",
                        color: cat.color,
                        marginBottom: 10,
                        paddingLeft: 4,
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                      }}
                    >
                      <span aria-hidden="true">{cat.icon}</span> {cat.title}
                    </div>
                    {cat.articles.map((a, i) => (
                      <details className="yhlp3-faq-item" key={`${cat.id}-${i}`}>
                        <summary>{a.q}</summary>
                        <p>{a.a}</p>
                      </details>
                    ))}
                  </div>
                ))
              ) : (
                currentCat?.articles.map((a, i) => (
                  <details className="yhlp3-faq-item" key={i}>
                    <summary>{a.q}</summary>
                    <p>{a.a}</p>
                  </details>
                ))
              )}
            </div>
          )}
        </section>

        <section className="yhlp3-section">
          <div className="yhlp3-final">
            <div className="yhlp3-final-inner">
              <span className="yhlp3-eyebrow">
                <span className="yhlp3-eyebrow-dot" /> Toujours bloqué(e) ?
              </span>
              <h2 className="yhlp3-h2 yhlp3-h2--on-dark">
                Notre équipe est là pour <em>vous aider</em>
              </h2>
              <p className="yhlp3-sub yhlp3-sub--on-dark">
                Si vous n&apos;avez pas trouvé votre réponse, <strong>contactez-nous directement</strong>. Réponse WhatsApp en
                moins de 2 heures en journée.
              </p>
              <div className="yhlp3-final-actions">
                <button
                  type="button"
                  className="yhlp3-btn yhlp3-btn--pri"
                  onClick={() =>
                    window.open(
                      `https://wa.me/237696565654?text=${encodeURIComponent("Bonjour Yorix, j'ai besoin d'aide : ")}`,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  💬 WhatsApp prioritaire
                </button>
                <button type="button" className="yhlp3-btn yhlp3-btn--sec" onClick={() => goPage?.("contact")}>
                  ✉️ Formulaire de contact
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
