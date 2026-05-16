// ═══════════════════════════════════════════════════════════════
//  YORIX CM — CONTACT PAGE PREMIUM v3
//  Hero · 3 canaux · formulaire + validation · horaires · FAQ · CTA
// ═══════════════════════════════════════════════════════════════

import { useState } from "react";

const SUBJECTS = [
  "Problème avec une commande",
  "Signaler un vendeur",
  "Demande de remboursement",
  "Problème de paiement (MoMo / Orange)",
  "Devenir vendeur sur Yorix",
  "Devenir livreur Yorix Ride",
  "Devenir prestataire",
  "Partenariat business B2B",
  "Question sur Yorix Academy",
  "Question sur Escrow",
  "Bug technique / site",
  "Autre demande",
];

const CHANNELS = [
  {
    id: "whatsapp",
    icon: "💬",
    label: "WhatsApp",
    value: "+237 696 56 56 54",
    sub: "Réponse sous ~120 min",
    color: "#25D366",
    cta: "Discuter sur WhatsApp",
    action: () =>
      window.open(
        `https://wa.me/237696565654?text=${encodeURIComponent("Bonjour Yorix ! ")}`,
        "_blank",
        "noopener,noreferrer"
      ),
  },
  {
    id: "phone",
    icon: "📞",
    label: "Téléphone",
    value: "+237 696 56 56 54",
    sub: "Lun-Ven · 8h-20h",
    color: "#2563eb",
    cta: "Appeler maintenant",
    action: () => window.open("tel:+237696565654", "_self"),
  },
  {
    id: "email",
    icon: "✉️",
    label: "Email",
    value: "support@yorix.cm",
    sub: "Réponse sous 24h",
    color: "#7c3aed",
    cta: "Envoyer un email",
    action: () => window.open("mailto:support@yorix.cm", "_blank", "noopener,noreferrer"),
  },
];

const QUICK_HELP = [
  { icon: "🛍️", title: "Suivi de commande", desc: "État, livraison, conformité", page: "aide" },
  { icon: "💰", title: "Remboursement", desc: "Litige, escrow, médiation", page: "escrow" },
  { icon: "🚚", title: "Livraison", desc: "Délais, zones, tarifs", page: "livraison" },
  { icon: "🎁", title: "Fidélité", desc: "Points, paliers, récompenses", page: "loyalty" },
];

const HOURS = [
  { day: "Lundi – Vendredi", h: "8h – 20h" },
  { day: "Samedi", h: "9h – 18h" },
  { day: "Dimanche", h: "10h – 16h" },
];

const OFFICES = [
  { city: "Douala", area: "Akwa", emoji: "🏙️" },
  { city: "Yaoundé", area: "Bastos", emoji: "🏛️" },
];

const CONTACT_FAQ = [
  {
    q: "Quel délai de réponse sur WhatsApp ?",
    r: "En journée ouvrée, nous visons environ 2 heures · parfois un peu plus en pic d’activité.",
  },
  {
    q: "Puis-je joindre le support sans compte ?",
    r: "Oui · WhatsApp et téléphone sont ouverts même si vous n’êtes pas inscrit. Précisez votre numéro de commande si vous en avez un.",
  },
  {
    q: "Pour un litige ou un remboursement, que faire ?",
    r: "Choisissez le sujet correspondant dans le formulaire puis détaillez les faits · notre médiation escrow peut prendre le relais selon les cas.",
  },
];

function InlineBreadcrumb({ items }) {
  return (
    <nav className="ycon3-bc" aria-label="Fil d'ariane">
      {items.map((it, i) => (
        <span key={i} className="ycon3-bc-item">
          {it.onClick ? (
            <button type="button" onClick={it.onClick}>
              {it.label}
            </button>
          ) : (
            <span className="ycon3-bc-current">{it.label}</span>
          )}
          {i < items.length - 1 && (
            <span className="ycon3-bc-sep" aria-hidden="true">
              ›
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function ContactPage({ goPage }) {
  const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "" });
  const [errors, setErrors] = useState({});
  const [faqOpen, setFaqOpen] = useState({});

  const validate = (values = form) => {
    const e = {};
    if (!values.nom.trim()) e.nom = "Indiquez votre nom.";
    const em = values.email.trim();
    if (!em) e.email = "Indiquez votre email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) e.email = "Email invalide.";
    if (!values.sujet.trim()) e.sujet = "Choisissez un sujet.";
    if (!values.message.trim()) e.message = "Détaillez votre demande (au moins une phrase).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const clearFieldErr = (key) =>
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const submitWhatsApp = () => {
    if (!validate()) return;
    const txt =
      `Bonjour Yorix !\n\n` +
      `Nom: ${form.nom.trim()}\n` +
      `Email: ${form.email.trim()}\n` +
      `Sujet: ${form.sujet.trim()}\n\n` +
      `Message:\n${form.message.trim()}`;
    window.open(`https://wa.me/237696565654?text=${encodeURIComponent(txt)}`, "_blank", "noopener,noreferrer");
  };

  const css = `
    .yorix-con-v3 {
      --con-green: #1a6b3a;
      --con-green-deep: #0d4d28;
      --con-green-pale: #e8f5e9;
      --con-green-light: #86efac;
      --con-yellow: #fcd116;
      --con-gold: #f59e0b;
      --con-ink: var(--ink, #111);
      --con-gray: var(--gray, #666);
      --con-surface: var(--surface, #fff);
      --con-surface2: var(--surface2, #f8f8f8);
      --con-border: var(--border, #e5e5e5);
      --con-shadow: 0 12px 30px rgba(0,0,0,.08);
      --con-shadow-hover: 0 22px 50px rgba(0,0,0,.14);
      --con-err: #dc2626;
      font-family: 'DM Sans', sans-serif;
      color: var(--con-ink);
    }
    .yorix-con-v3 * { box-sizing: border-box; }

    .ycon3-bc {
      display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
      margin-bottom: 20px; font-size: .76rem;
    }
    .ycon3-bc-item { display: inline-flex; align-items: center; gap: 6px; }
    .ycon3-bc button {
      background: none; border: none; color: rgba(255,255,255,.65);
      cursor: pointer; padding: 0; font-family: inherit; font-size: inherit;
      transition: color .15s;
    }
    .ycon3-bc button:hover { color: var(--con-yellow); }
    .ycon3-bc-current { color: #fff; font-weight: 600; }
    .ycon3-bc-sep { color: rgba(255,255,255,.35); font-size: .9rem; }

    .ycon3-hero {
      position: relative;
      background: linear-gradient(135deg, #0a1410 0%, #1a3a24 45%, #0d3320 100%);
      color: #fff;
      padding: 56px 24px 70px;
      overflow: hidden;
      border-radius: 0 0 28px 28px;
      margin-bottom: 50px;
    }
    .ycon3-hero::before {
      content: '';
      position: absolute;
      top: -120px; right: -100px;
      width: 460px; height: 460px;
      background: radial-gradient(circle, rgba(252,209,22,.16), transparent 65%);
      border-radius: 50%;
      pointer-events: none;
    }
    .ycon3-hero::after {
      content: '';
      position: absolute;
      bottom: -150px; left: -120px;
      width: 420px; height: 420px;
      background: radial-gradient(circle, rgba(37,211,102,.15), transparent 65%);
      border-radius: 50%;
      pointer-events: none;
    }
    .ycon3-hero-inner {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
      text-align: center;
    }
    .ycon3-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: rgba(252,209,22,.14);
      color: var(--con-yellow);
      border: 1px solid rgba(252,209,22,.32);
      padding: 6px 14px;
      border-radius: 50px;
      font-size: .7rem;
      font-weight: 700;
      margin-bottom: 18px;
      letter-spacing: .04em;
    }
    .ycon3-eyebrow-dot {
      width: 7px; height: 7px;
      background: var(--con-yellow);
      border-radius: 50%;
      box-shadow: 0 0 12px var(--con-yellow);
      animation: ycon3Pulse 2s ease-in-out infinite;
    }
    @keyframes ycon3Pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%      { opacity: .5; transform: scale(1.4); }
    }
    .ycon3-h1 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 800;
      line-height: 1.07;
      letter-spacing: -1.5px;
      margin-bottom: 16px;
    }
    .ycon3-h1 em {
      font-style: normal;
      background: linear-gradient(135deg, #fcd116, #f59e0b);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .ycon3-sub {
      font-size: clamp(.95rem, 1.5vw, 1.05rem);
      color: rgba(255,255,255,.78);
      line-height: 1.7;
      margin: 0 auto 8px;
      max-width: 600px;
    }
    .ycon3-sub strong { color: #fff; font-weight: 700; }

    .ycon3-channels {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      max-width: 1080px;
      margin: -40px auto 56px;
      padding: 0 24px;
      position: relative;
      z-index: 5;
    }
    .ycon3-channel {
      background: var(--con-surface);
      border: 1.5px solid var(--con-border);
      border-radius: 16px;
      padding: 26px 22px;
      text-align: center;
      cursor: pointer;
      transition: all .25s;
      position: relative;
      overflow: hidden;
      box-shadow: var(--con-shadow);
    }
    .ycon3-channel::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: var(--ch-color, var(--con-green));
      transform: scaleX(0);
      transform-origin: left;
      transition: transform .35s;
    }
    .ycon3-channel:hover {
      transform: translateY(-5px);
      box-shadow: var(--con-shadow-hover);
      border-color: var(--ch-color, var(--con-green));
    }
    .ycon3-channel:focus-visible {
      outline: 3px solid var(--con-green);
      outline-offset: 3px;
    }
    .ycon3-channel:hover::before { transform: scaleX(1); }
    .ycon3-channel-icon {
      width: 60px; height: 60px;
      margin: 0 auto 14px;
      background: linear-gradient(135deg, var(--con-green-pale), #fff9e6);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      transition: transform .3s;
    }
    .ycon3-channel:hover .ycon3-channel-icon {
      transform: scale(1.1) rotate(-5deg);
    }
    .ycon3-channel-label {
      font-family: 'Syne', sans-serif;
      font-size: .72rem;
      font-weight: 700;
      color: var(--con-gray);
      letter-spacing: .12em;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .ycon3-channel-value {
      font-family: 'Syne', sans-serif;
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--con-ink);
      letter-spacing: -.3px;
      margin-bottom: 4px;
      word-break: break-word;
    }
    .ycon3-channel-sub {
      font-size: .76rem;
      color: var(--con-gray);
      margin-bottom: 14px;
    }
    .ycon3-channel-cta {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 8px 16px;
      border-radius: 9px;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: .78rem;
      cursor: pointer;
      transition: all .2s;
      border: none;
      background: var(--ch-color, var(--con-green));
      color: #fff;
    }
    .ycon3-channel-cta:focus-visible {
      outline: 2px solid var(--con-ink); outline-offset: 2px;
    }
    .ycon3-channel-cta:hover {
      transform: scale(1.03);
      box-shadow: 0 6px 18px rgba(0,0,0,.18);
    }

    .ycon3-section {
      max-width: 1200px;
      margin: 0 auto 56px;
      padding: 0 24px;
    }
    .ycon3-section--tinted {
      background: var(--con-surface2);
      padding: 56px 24px;
      margin: 0 auto 56px;
      border-radius: 24px;
      max-width: 1248px;
    }
    .ycon3-section-head {
      text-align: center;
      max-width: 720px;
      margin: 0 auto 36px;
    }
    .ycon3-eyebrow-light {
      display: inline-block;
      background: var(--con-surface2);
      color: var(--con-green);
      border: 1px solid var(--con-border);
      padding: 5px 12px;
      border-radius: 50px;
      font-size: .66rem;
      font-weight: 700;
      letter-spacing: .12em;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .ycon3-h2 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(1.5rem, 3.5vw, 2.1rem);
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -1px;
      color: var(--con-ink);
      margin-bottom: 10px;
    }
    .ycon3-h2 em { font-style: normal; color: var(--con-green); }
    .ycon3-h2--on-dark { color: #fff; }
    .ycon3-h2--on-dark em {
      background: linear-gradient(135deg, #fcd116, #f59e0b);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .ycon3-lead {
      font-size: .95rem;
      color: var(--con-gray);
      line-height: 1.65;
    }

    .ycon3-quick {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
    }
    .ycon3-quick-card {
      background: var(--con-surface);
      border: 1.5px solid var(--con-border);
      border-radius: 14px;
      padding: 20px 18px;
      cursor: pointer;
      transition: all .25s;
      text-align: center;
    }
    .ycon3-quick-card:focus-visible {
      outline: 3px solid var(--con-green); outline-offset: 2px;
    }
    .ycon3-quick-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--con-shadow);
      border-color: var(--con-green);
    }
    .ycon3-quick-icon {
      font-size: 2rem;
      margin-bottom: 10px;
      display: inline-block;
      transition: transform .3s;
    }
    .ycon3-quick-card:hover .ycon3-quick-icon {
      transform: scale(1.15) rotate(-5deg);
    }
    .ycon3-quick-title {
      font-family: 'Syne', sans-serif;
      font-size: .92rem;
      font-weight: 800;
      color: var(--con-ink);
      margin-bottom: 4px;
      letter-spacing: -.2px;
    }
    .ycon3-quick-desc {
      font-size: .72rem;
      color: var(--con-gray);
      line-height: 1.45;
    }

    .ycon3-faq { max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 10px; }
    .ycon3-faq-item {
      border: 1px solid var(--con-border); border-radius: 12px; background: var(--con-surface);
      overflow: hidden; text-align: left;
    }
    .ycon3-faq-q {
      width: 100%; text-align: left; padding: 14px 16px;
      border: none; background: transparent; cursor: pointer;
      font-family: 'Syne', sans-serif; font-weight: 800; font-size: .82rem;
      color: var(--con-ink); display: flex; justify-content: space-between; gap: 10px;
    }
    .ycon3-faq-q:focus-visible { outline: 3px solid var(--con-green); outline-offset: -2px; }
    .ycon3-faq-chev { opacity: .5; transition: transform .2s; }
    .ycon3-faq-item[data-open='1'] .ycon3-faq-chev { transform: rotate(90deg); }
    .ycon3-faq-r {
      padding: 0 16px 14px;
      font-size: .82rem;
      color: var(--con-gray); line-height: 1.6;
      border-top: 1px solid var(--con-border); margin-top: 0; padding-top: 10px;
    }

    .ycon3-form-wrap {
      max-width: 760px;
      margin: 0 auto;
      background: var(--con-surface);
      border: 1px solid var(--con-border);
      border-radius: 18px;
      padding: 32px 30px;
      box-shadow: var(--con-shadow);
    }
    .ycon3-form-head {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 24px;
      padding-bottom: 18px;
      border-bottom: 1px solid var(--con-border);
    }
    .ycon3-form-head-icon {
      width: 52px; height: 52px;
      background: linear-gradient(135deg, var(--con-green-pale), #fff9e6);
      border-radius: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.7rem;
      flex-shrink: 0;
    }
    .ycon3-form-title {
      font-family: 'Syne', sans-serif;
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--con-ink);
      letter-spacing: -.4px;
      line-height: 1.2;
      margin-bottom: 3px;
    }
    .ycon3-form-sub {
      font-size: .78rem;
      color: var(--con-gray);
      line-height: 1.45;
    }
    .ycon3-form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 14px;
    }
    .ycon3-field { margin-bottom: 14px; }
    .ycon3-label {
      display: block;
      font-size: .76rem;
      font-weight: 700;
      color: var(--con-ink);
      margin-bottom: 6px;
      letter-spacing: -.1px;
    }
    .ycon3-label span { color: var(--con-err); margin-left: 2px; }
    .ycon3-input,
    .ycon3-select,
    .ycon3-textarea {
      width: 100%;
      padding: 11px 14px;
      border-radius: 10px;
      border: 1.5px solid var(--con-border);
      background: var(--con-surface);
      color: var(--con-ink);
      font-family: 'DM Sans', sans-serif;
      font-size: .88rem;
      outline: none;
      transition: all .15s;
      font-weight: 500;
    }
    .ycon3-input.err, .ycon3-select.err, .ycon3-textarea.err {
      border-color: var(--con-err);
      box-shadow: 0 0 0 2px rgba(220,38,38,.15);
    }
    .ycon3-field-err {
      margin-top: 5px; font-size: .72rem; color: var(--con-err); font-weight: 600;
    }
    .ycon3-input:focus,
    .ycon3-select:focus,
    .ycon3-textarea:focus {
      border-color: var(--con-green);
      box-shadow: 0 0 0 3px rgba(26,107,58,.12);
    }
    .ycon3-textarea {
      min-height: 130px;
      resize: vertical;
      font-family: 'DM Sans', sans-serif;
    }
    .ycon3-submit {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, var(--con-yellow), var(--con-gold));
      color: #0d1f14;
      border: none;
      border-radius: 11px;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .92rem;
      cursor: pointer;
      transition: all .2s;
      letter-spacing: -.2px;
      box-shadow: 0 8px 22px rgba(252,209,22,.35);
      margin-top: 6px;
    }
    .ycon3-submit:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(252,209,22,.45);
    }
    .ycon3-form-note {
      text-align: center;
      font-size: .72rem;
      color: var(--con-gray);
      margin-top: 12px;
      line-height: 1.5;
    }

    .ycon3-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
    }
    .ycon3-info-card {
      background: var(--con-surface);
      border: 1.5px solid var(--con-border);
      border-radius: 14px;
      padding: 22px 22px;
      transition: all .25s;
    }
    .ycon3-info-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--con-shadow);
      border-color: var(--con-green-light);
    }
    .ycon3-info-head {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 14px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--con-border);
    }
    .ycon3-info-icon {
      width: 42px; height: 42px;
      background: linear-gradient(135deg, var(--con-green-pale), #fff9e6);
      border-radius: 11px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      flex-shrink: 0;
    }
    .ycon3-info-title {
      font-family: 'Syne', sans-serif;
      font-size: 1rem;
      font-weight: 800;
      color: var(--con-ink);
      letter-spacing: -.3px;
    }
    .ycon3-info-list { list-style: none; padding: 0; margin: 0; }
    .ycon3-info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 9px 0;
      font-size: .85rem;
      border-bottom: 1px solid rgba(0,0,0,.05);
    }
    .ycon3-info-row:last-child { border-bottom: none; }
    .ycon3-info-key { color: var(--con-gray); }
    .ycon3-info-val { font-weight: 700; color: var(--con-ink); }
    .ycon3-office {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 0;
      border-bottom: 1px solid rgba(0,0,0,.05);
    }
    .ycon3-office:last-child { border-bottom: none; }
    .ycon3-office-emoji { font-size: 1.6rem; width: 38px; text-align: center; }
    .ycon3-office-text { flex: 1; }
    .ycon3-office-city {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .92rem;
      color: var(--con-ink);
      letter-spacing: -.2px;
    }
    .ycon3-office-area { font-size: .74rem; color: var(--con-gray); margin-top: 1px; }

    .ycon3-final {
      background: linear-gradient(135deg, #0a1410 0%, #1a3a24 100%);
      border-radius: 22px;
      padding: 44px 36px;
      color: #fff;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .ycon3-final::before {
      content: '💬';
      position: absolute;
      top: 50%; right: -10px;
      transform: translateY(-50%);
      font-size: 13rem;
      opacity: .05;
      pointer-events: none;
    }
    .ycon3-final-inner { position: relative; z-index: 2; max-width: 580px; margin: 0 auto; }
    .ycon3-final-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 22px;
    }
    .ycon3-btn {
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
    .ycon3-btn--pri {
      background: linear-gradient(135deg, var(--con-yellow), var(--con-gold));
      color: #0d1f14;
      box-shadow: 0 8px 22px rgba(252,209,22,.35);
    }
    .ycon3-btn--pri:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(252,209,22,.45);
    }
    .ycon3-btn--sec {
      background: rgba(255,255,255,.1);
      color: #fff;
      border: 1.5px solid rgba(255,255,255,.2);
      backdrop-filter: blur(10px);
    }
    .ycon3-btn--sec:hover { background: rgba(255,255,255,.18); }
    .ycon3-btn:focus-visible { outline: 3px solid var(--con-yellow); outline-offset: 2px; }
    .ycon3-sub--on-dark { color: rgba(255,255,255,.78); }
    .ycon3-sub--on-dark strong { color: #fff; }

    @media (max-width: 960px) {
      .ycon3-hero { padding: 40px 18px 70px; }
      .ycon3-channels {
        grid-template-columns: 1fr;
        margin: -30px 16px 40px;
        gap: 12px;
      }
      .ycon3-quick { grid-template-columns: repeat(2, 1fr); }
      .ycon3-info { grid-template-columns: 1fr; }
      .ycon3-form-wrap { padding: 26px 22px; }
      .ycon3-form-row { grid-template-columns: 1fr; }
      .ycon3-section--tinted { padding: 40px 18px; }
      .ycon3-final { padding: 32px 22px; }
    }
    @media (max-width: 500px) {
      .ycon3-h1 { font-size: 1.85rem; }
      .ycon3-quick { grid-template-columns: 1fr 1fr; gap: 10px; }
      .ycon3-section, .ycon3-section--tinted { padding-left: 16px; padding-right: 16px; }
    }
  `;

  return (
    <>
      <style>{css}</style>

      <div className="yorix-con-v3 anim">
        <header className="ycon3-hero">
          <div className="ycon3-hero-inner">
            <InlineBreadcrumb
              items={[{ label: "Accueil", onClick: () => goPage?.("home") }, { label: "Relation client · Contact" }]}
            />
            <span className="ycon3-eyebrow">
              <span className="ycon3-eyebrow-dot" /> Support premium · 7j/7
            </span>
            <h1 className="ycon3-h1">
              Une équipe à votre <em>écoute</em>
            </h1>
            <p className="ycon3-sub">
              <strong>Priorité WhatsApp</strong> sous ~120 minutes · téléphone vocal · email pièces jointes — équipes basées à
              Douala &amp; Yaoundé.
            </p>
          </div>
        </header>

        <div className="ycon3-channels">
          {CHANNELS.map((c) => (
            <article
              key={c.id}
              className="ycon3-channel"
              style={{ "--ch-color": c.color }}
              onClick={c.action}
              role="button"
              tabIndex={0}
              aria-label={`${c.label} : ${c.value}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  c.action();
                }
              }}
            >
              <div className="ycon3-channel-icon">{c.icon}</div>
              <div className="ycon3-channel-label">{c.label}</div>
              <div className="ycon3-channel-value">{c.value}</div>
              <div className="ycon3-channel-sub">{c.sub}</div>
              <button
                type="button"
                className="ycon3-channel-cta"
                onClick={(e) => {
                  e.stopPropagation();
                  c.action();
                }}
              >
                {c.cta} →
              </button>
            </article>
          ))}
        </div>

        <section className="ycon3-section">
          <div className="ycon3-section-head">
            <span className="ycon3-eyebrow-light">01 · Aide rapide</span>
            <h2 className="ycon3-h2">
              Trouvez votre <em>réponse</em> en un clic
            </h2>
            <p className="ycon3-lead">
              Les sujets les plus demandés ont leur propre page dédiée — réponse immédiate, sans attendre.
            </p>
          </div>

          <div className="ycon3-quick">
            {QUICK_HELP.map((q) => (
              <article
                key={q.title}
                className="ycon3-quick-card"
                onClick={() => goPage?.(q.page)}
                role="button"
                tabIndex={0}
                aria-label={q.title}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goPage?.(q.page);
                  }
                }}
              >
                <div className="ycon3-quick-icon">{q.icon}</div>
                <div className="ycon3-quick-title">{q.title}</div>
                <div className="ycon3-quick-desc">{q.desc}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="ycon3-section">
          <div className="ycon3-section-head">
            <span className="ycon3-eyebrow-light">02 · FAQ support</span>
            <h2 className="ycon3-h2">
              Questions <em>fréquentes</em>
            </h2>
          </div>
          <div className="ycon3-faq">
            {CONTACT_FAQ.map((item, i) => (
              <div key={item.q} className="ycon3-faq-item" data-open={faqOpen[i] ? "1" : "0"}>
                <button
                  type="button"
                  className="ycon3-faq-q"
                  aria-expanded={!!faqOpen[i]}
                  onClick={() => setFaqOpen((prev) => ({ ...prev, [i]: !prev[i] }))}
                >
                  <span>{item.q}</span>
                  <span className="ycon3-faq-chev" aria-hidden>
                    ›
                  </span>
                </button>
                {faqOpen[i] ? <div className="ycon3-faq-r">{item.r}</div> : null}
              </div>
            ))}
          </div>
        </section>

        <section className="ycon3-section--tinted">
          <div className="ycon3-section-head">
            <span className="ycon3-eyebrow-light">03 · Envoyer un message</span>
            <h2 className="ycon3-h2">
              Décrivez votre <em>demande</em>
            </h2>
            <p className="ycon3-lead">
              Remplissez ce formulaire — il sera envoyé via WhatsApp pour un traitement prioritaire.
            </p>
          </div>

          <form
            className="ycon3-form-wrap"
            onSubmit={(e) => {
              e.preventDefault();
              submitWhatsApp();
            }}
          >
            <div className="ycon3-form-head">
              <div className="ycon3-form-head-icon">✍️</div>
              <div>
                <div className="ycon3-form-title">Formulaire de contact</div>
                <div className="ycon3-form-sub">Réponse sous 24h ouvrées · WhatsApp pour traitement immédiat</div>
              </div>
            </div>

            <div className="ycon3-form-row">
              <div className="ycon3-field" style={{ marginBottom: 0 }}>
                <label className="ycon3-label" htmlFor="ycon3-nom">
                  Nom <span>*</span>
                </label>
                <input
                  id="ycon3-nom"
                  className={`ycon3-input${errors.nom ? " err" : ""}`}
                  placeholder="Votre nom complet"
                  value={form.nom}
                  onChange={(e) => {
                    clearFieldErr("nom");
                    setForm((f) => ({ ...f, nom: e.target.value }));
                  }}
                  aria-invalid={!!errors.nom}
                />
                {errors.nom ? <div className="ycon3-field-err">{errors.nom}</div> : null}
              </div>
              <div className="ycon3-field" style={{ marginBottom: 0 }}>
                <label className="ycon3-label" htmlFor="ycon3-email">
                  Email <span>*</span>
                </label>
                <input
                  id="ycon3-email"
                  className={`ycon3-input${errors.email ? " err" : ""}`}
                  type="email"
                  placeholder="email@exemple.cm"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => {
                    clearFieldErr("email");
                    setForm((f) => ({ ...f, email: e.target.value }));
                  }}
                  aria-invalid={!!errors.email}
                />
                {errors.email ? <div className="ycon3-field-err">{errors.email}</div> : null}
              </div>
            </div>

            <div className="ycon3-field">
              <label className="ycon3-label" htmlFor="ycon3-sujet">
                Sujet <span>*</span>
              </label>
              <select
                id="ycon3-sujet"
                className={`ycon3-select${errors.sujet ? " err" : ""}`}
                value={form.sujet}
                onChange={(e) => {
                  clearFieldErr("sujet");
                  setForm((f) => ({ ...f, sujet: e.target.value }));
                }}
                aria-invalid={!!errors.sujet}
              >
                <option value="">Choisir un sujet…</option>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.sujet ? <div className="ycon3-field-err">{errors.sujet}</div> : null}
            </div>

            <div className="ycon3-field">
              <label className="ycon3-label" htmlFor="ycon3-msg">
                Message <span>*</span>
              </label>
              <textarea
                id="ycon3-msg"
                className={`ycon3-textarea${errors.message ? " err" : ""}`}
                placeholder="Décrivez votre demande en détail (commande, vendeur, paiement…)"
                value={form.message}
                onChange={(e) => {
                  clearFieldErr("message");
                  setForm((f) => ({ ...f, message: e.target.value }));
                }}
                aria-invalid={!!errors.message}
              />
              {errors.message ? <div className="ycon3-field-err">{errors.message}</div> : null}
            </div>

            <button type="submit" className="ycon3-submit">
              💬 Envoyer via WhatsApp
            </button>

            <p className="ycon3-form-note">
              🔒 Vos informations sont transmises par votre appareil au canal choisi · réponse prioritaire sous ~120 min en heures ouvrées
            </p>
          </form>
        </section>

        <section className="ycon3-section">
          <div className="ycon3-section-head">
            <span className="ycon3-eyebrow-light">04 · Informations pratiques</span>
            <h2 className="ycon3-h2">
              Quand et où nous <em>joindre</em>
            </h2>
            <p className="ycon3-lead">Nos équipes basées à Douala et Yaoundé sont à votre service presque tous les jours.</p>
          </div>

          <div className="ycon3-info">
            <article className="ycon3-info-card">
              <div className="ycon3-info-head">
                <div className="ycon3-info-icon">⏰</div>
                <div className="ycon3-info-title">Horaires d&apos;ouverture</div>
              </div>
              <ul className="ycon3-info-list">
                {HOURS.map((h) => (
                  <li key={h.day} className="ycon3-info-row">
                    <span className="ycon3-info-key">{h.day}</span>
                    <span className="ycon3-info-val">{h.h}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="ycon3-info-card">
              <div className="ycon3-info-head">
                <div className="ycon3-info-icon">📍</div>
                <div className="ycon3-info-title">Nos bureaux</div>
              </div>
              <ul className="ycon3-info-list">
                {OFFICES.map((o) => (
                  <li key={o.city} className="ycon3-office">
                    <div className="ycon3-office-emoji">{o.emoji}</div>
                    <div className="ycon3-office-text">
                      <div className="ycon3-office-city">{o.city}</div>
                      <div className="ycon3-office-area">{o.area}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="ycon3-section">
          <div className="ycon3-final">
            <div className="ycon3-final-inner">
              <span className="ycon3-eyebrow">
                <span className="ycon3-eyebrow-dot" /> Réponse rapide garantie
              </span>
              <h2 className="ycon3-h2 ycon3-h2--on-dark">
                Une question <em>urgente</em> ?
              </h2>
              <p className="ycon3-sub ycon3-sub--on-dark">
                Le canal le plus rapide reste <strong>WhatsApp</strong>. Notre équipe répond en moyenne en{" "}
                <strong>moins de 2 heures</strong> en journée.
              </p>
              <div className="ycon3-final-actions">
                <button
                  type="button"
                  className="ycon3-btn ycon3-btn--pri"
                  onClick={() =>
                    window.open(
                      `https://wa.me/237696565654?text=${encodeURIComponent("Bonjour Yorix, j'ai une question urgente : ")}`,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  💬 WhatsApp prioritaire
                </button>
                <button type="button" className="ycon3-btn ycon3-btn--sec" onClick={() => goPage?.("aide")}>
                  🆘 Centre d&apos;aide
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
