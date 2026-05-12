import{j as a}from"./index--4MKUZJD.js";import{r as y}from"./react-CDaM45aE.js";import"./supabase-D2gm834s.js";const N=[{id:"vente",icon:"🛒",label:"Vente terrain",color:"#1a6b3a",desc:"WhatsApp Selling, négociation, closing"},{id:"marketplace",icon:"🏪",label:"Marketplace",color:"#f59e0b",desc:"Devenir top vendeur Yorix"},{id:"logistique",icon:"🚚",label:"Livraison",color:"#0891b2",desc:"Optimiser tournées & coûts"},{id:"business",icon:"📈",label:"Business local",color:"#7c3aed",desc:"Lancer, financer, scaler"},{id:"paiement",icon:"💳",label:"Paiements",color:"#b45309",desc:"MoMo, Orange, conformité"},{id:"marketing",icon:"📢",label:"Marketing digital",color:"#db2777",desc:"Réseaux sociaux, ads, contenu"},{id:"whatsapp",icon:"💬",label:"WhatsApp Business",desc:"Automatisation, catalogues, support",color:"#22c55e"},{id:"diaspora",icon:"✈️",label:"Diaspora business",color:"#1565c0",desc:"Investir et entreprendre au CM"}],w=[{id:"debutant",label:"Débutant",emoji:"🌱",color:"#22c55e",gradient:"linear-gradient(135deg, #4ade80, #16a34a)",pct:100,pitch:"Bases solides pour démarrer",perks:["Cours d'introduction","Vocabulaire essentiel","Premiers exercices"]},{id:"intermediaire",label:"Intermédiaire",emoji:"🚀",color:"#3b82f6",gradient:"linear-gradient(135deg, #60a5fa, #2563eb)",pct:70,pitch:"Maîtriser les techniques clés",perks:["Cas pratiques réels","Outils avancés","Coaching collectif"]},{id:"pro",label:"Pro",emoji:"💼",color:"#f59e0b",gradient:"linear-gradient(135deg, #fbbf24, #d97706)",pct:45,pitch:"Niveau opérationnel professionnel",perks:["Stratégies avancées","Études de cas CM","Certificat Yorix"]},{id:"elite",label:"Elite",emoji:"💎",color:"#7c3aed",gradient:"linear-gradient(135deg, #a78bfa, #5b21b6)",pct:15,pitch:"Sommet : business leaders & mentors",perks:["Mentorat 1:1","Réseau Yorix Pro","Accès événements VIP"]}],k=[{n:"01",emoji:"🎯",t:"Choisissez",d:"Sélectionnez un parcours selon votre objectif business."},{n:"02",emoji:"📚",t:"Apprenez",d:"Vidéos courtes, exercices terrain et études de cas locales."},{n:"03",emoji:"🛠️",t:"Pratiquez",d:"Appliquez immédiatement sur Yorix avec coaching."},{n:"04",emoji:"🏆",t:"Certifiez",d:"Recevez votre certificat Yorix Academy à partager."}],z=[{name:"Aminatou B.",role:"Vendeuse Yorix · Douala",avatar:"A",color:"#1a6b3a",quote:"En 3 mois après la formation WhatsApp Selling, mes ventes ont triplé. Je suis passée de 50 à 180 commandes par mois.",metric:"+260% ventes"},{name:"Junior K.",role:"Livreur · Yaoundé",avatar:"J",color:"#0891b2",quote:"La formation Yorix Ride m'a appris à optimiser mes tournées. Je gagne 15 000 FCFA de plus par semaine.",metric:"+60 000 F / mois"},{name:"Sandrine M.",role:"Prestataire · Bafoussam",avatar:"S",color:"#7c3aed",quote:"Grâce au module Business local, j'ai structuré mon offre. Aujourd'hui, j'ai 4 clients récurrents et une équipe de 3 personnes.",metric:"4 clients fidèles"}],S=[{q:"Les formations sont-elles vraiment gratuites ?",a:"Une partie de notre catalogue est 100% gratuite (cours d'introduction, bases). Les modules approfondis et certificats sont payants à partir de 5 000 FCFA. Vous pouvez tester avant d'acheter."},{q:"Combien de temps dure une formation ?",a:"Les modules courts durent 30 à 60 minutes (idéal pause déjeuner). Les parcours complets demandent 4 à 12 heures réparties sur 2 à 4 semaines, à votre rythme."},{q:"Comment recevoir mon certificat Yorix ?",a:"Terminez tous les chapitres d'une formation pro/elite + réussissez le quiz final (70%+). Votre certificat est envoyé par email sous 24h, partageable sur LinkedIn et WhatsApp."},{q:"Puis-je accéder aux formations sur mobile ?",a:"Oui, toutes les formations sont 100% mobile. Vous pouvez télécharger les supports PDF pour les consulter hors-ligne (utile en zone faible connexion)."},{q:"Qui sont les formateurs Yorix Academy ?",a:"Des entrepreneurs camerounais en activité : top vendeurs Yorix, livreurs expérimentés, experts marketing local, partenaires fintech. Tous testés sur le terrain au Cameroun."},{q:"Les formations sont-elles adaptées à mon niveau ?",a:"Chaque cours est étiqueté Débutant / Intermédiaire / Pro / Elite. Vous pouvez aussi passer un test d'orientation gratuit pour trouver le bon parcours."}];function C({items:i}){return a.jsx("nav",{className:"yacad3-bc","aria-label":"Fil d'ariane",children:i.map((o,r)=>a.jsxs("span",{className:"yacad3-bc-item",children:[o.onClick?a.jsx("button",{type:"button",onClick:o.onClick,children:o.label}):a.jsx("span",{className:"yacad3-bc-current",children:o.label}),r<i.length-1&&a.jsx("span",{className:"yacad3-bc-sep","aria-hidden":!0,children:"›"})]},r))})}function q({academyCourses:i=[],academyLoading:o=!1,goAcademyDetail:r,goPage:t,user:x,userData:l,setAuthOpen:p,setAuthTab:m}){const[n,f]=y.useState("TOUT"),h=y.useMemo(()=>n==="TOUT"?i:i.filter(e=>e.category===n),[i,n]),u=i.reduce((e,s)=>e+(s.students_count||0),0);i.length*1.5;const b=i.filter(e=>(e.prix||0)===0).length,v=()=>{m==null||m("register"),p==null||p(!0)},c=()=>{const e=document.getElementById("yacad3-courses");e&&e.scrollIntoView({behavior:"smooth",block:"start"})},g=()=>{const e=i.find(s=>(s.prix||0)===0);e&&r?r(e):c()};return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
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
  `}),a.jsxs("div",{className:"yorix-acad-v3 anim",children:[a.jsx("header",{className:"yacad3-hero",children:a.jsxs("div",{className:"yacad3-hero-inner",children:[a.jsx(C,{items:[{label:"Accueil",onClick:()=>t==null?void 0:t("home")},{label:"Yorix Academy · centre de formation"}]}),a.jsxs("div",{className:"yacad3-hero-grid",children:[a.jsxs("div",{children:[a.jsxs("span",{className:"yacad3-eyebrow",children:[a.jsx("span",{className:"yacad3-eyebrow-dot"})," Yorix Academy · centre officiel"]}),a.jsxs("h1",{className:"yacad3-h1",children:["Développez vos compétences.",a.jsx("br",{}),a.jsx("em",{children:"Accélérez votre croissance."})]}),a.jsxs("p",{className:"yacad3-sub",children:["Formations pratiques pensées pour le marché camerounais : ",a.jsx("strong",{children:"vente terrain, e-commerce, WhatsApp Business, logistique, business growth"}),". Apprenez auprès d'entrepreneurs qui ont réussi au Cameroun."]}),a.jsxs("ul",{className:"yacad3-args",children:[a.jsxs("li",{children:[a.jsx("span",{children:"🛒"}),a.jsx("span",{children:"Vente terrain"})]}),a.jsxs("li",{children:[a.jsx("span",{children:"🏪"}),a.jsx("span",{children:"E-commerce Yorix"})]}),a.jsxs("li",{children:[a.jsx("span",{children:"💬"}),a.jsx("span",{children:"WhatsApp Selling"})]}),a.jsxs("li",{children:[a.jsx("span",{children:"📈"}),a.jsx("span",{children:"Business Growth"})]})]}),a.jsxs("div",{className:"yacad3-hero-cta",children:[a.jsx("button",{type:"button",className:"yacad3-btn yacad3-btn--pri",onClick:g,children:"🚀 Commencer gratuitement"}),a.jsx("button",{type:"button",className:"yacad3-btn yacad3-btn--sec",onClick:c,children:"Voir les parcours"})]}),a.jsxs("div",{className:"yacad3-hero-stats",children:[a.jsxs("div",{className:"yacad3-hero-stat",children:[a.jsxs("div",{className:"yacad3-hero-stat-val",children:[i.length||"12","+"]}),a.jsx("div",{className:"yacad3-hero-stat-lbl",children:"FORMATIONS"})]}),a.jsxs("div",{className:"yacad3-hero-stat",children:[a.jsxs("div",{className:"yacad3-hero-stat-val",children:[u.toLocaleString("fr-FR")||"850","+"]}),a.jsx("div",{className:"yacad3-hero-stat-lbl",children:"ÉTUDIANTS"})]}),a.jsxs("div",{className:"yacad3-hero-stat",children:[a.jsxs("div",{className:"yacad3-hero-stat-val",children:[b||"5","+"]}),a.jsx("div",{className:"yacad3-hero-stat-lbl",children:"GRATUITES"})]})]})]}),a.jsx("div",{className:"yacad3-hero-visual",children:a.jsxs("div",{className:"yacad3-dashboard",children:[a.jsxs("div",{className:"yacad3-dash-head",children:[a.jsxs("div",{className:"yacad3-dash-brand",children:[a.jsx("div",{className:"yacad3-dash-logo",children:"Y"}),a.jsxs("div",{className:"yacad3-dash-name",children:["Mon parcours",a.jsx("small",{children:"YORIX ACADEMY"})]})]}),a.jsx("div",{className:"yacad3-dash-badge",children:"🚀 En cours"})]}),a.jsx("div",{className:"yacad3-dash-progress-lbl",children:"Progression globale"}),a.jsx("div",{className:"yacad3-dash-progress-pct",children:"72%"}),a.jsx("div",{className:"yacad3-dash-progress-bar",children:a.jsx("div",{className:"yacad3-dash-progress-fill"})}),a.jsxs("ul",{className:"yacad3-dash-modules",children:[a.jsxs("li",{className:"yacad3-dash-mod",children:[a.jsx("div",{className:"yacad3-dash-mod-ico yacad3-dash-mod-ico--done",children:"✓"}),a.jsxs("div",{className:"yacad3-dash-mod-info",children:[a.jsx("div",{className:"yacad3-dash-mod-name",children:"Bases du commerce"}),a.jsx("div",{className:"yacad3-dash-mod-meta",children:"⏱ 45 min · 5 chapitres"})]}),a.jsx("div",{className:"yacad3-dash-mod-status yacad3-dash-mod-status--done",children:"Terminé"})]}),a.jsxs("li",{className:"yacad3-dash-mod",children:[a.jsx("div",{className:"yacad3-dash-mod-ico yacad3-dash-mod-ico--current",children:"📖"}),a.jsxs("div",{className:"yacad3-dash-mod-info",children:[a.jsx("div",{className:"yacad3-dash-mod-name",children:"WhatsApp Selling"}),a.jsx("div",{className:"yacad3-dash-mod-meta",children:"⏱ 1h · 8 chapitres"})]}),a.jsx("div",{className:"yacad3-dash-mod-status yacad3-dash-mod-status--current",children:"3/8"})]}),a.jsxs("li",{className:"yacad3-dash-mod",children:[a.jsx("div",{className:"yacad3-dash-mod-ico yacad3-dash-mod-ico--locked",children:"🔒"}),a.jsxs("div",{className:"yacad3-dash-mod-info",children:[a.jsx("div",{className:"yacad3-dash-mod-name",children:"Closing pro"}),a.jsx("div",{className:"yacad3-dash-mod-meta",children:"⏱ 1h30 · 10 chapitres"})]}),a.jsx("div",{className:"yacad3-dash-mod-status yacad3-dash-mod-status--locked",children:"Verrouillé"})]})]})]})})]})]})}),a.jsxs("section",{className:"yacad3-section",children:[a.jsxs("div",{className:"yacad3-section-head",children:[a.jsx("span",{className:"yacad3-eyebrow-light",children:"01 · Comment ça marche"}),a.jsxs("h2",{className:"yacad3-h2",children:["Quatre étapes pour ",a.jsx("em",{children:"monter en compétence"})]}),a.jsx("p",{className:"yacad3-lead",children:"De votre inscription à votre certificat Yorix : un parcours conçu pour transformer vos compétences."})]}),a.jsx("div",{className:"yacad3-steps",children:k.map(e=>a.jsxs("div",{className:"yacad3-step",children:[a.jsx("div",{className:"yacad3-step-num",children:e.n}),a.jsx("div",{className:"yacad3-step-emoji",children:e.emoji}),a.jsx("h3",{children:e.t}),a.jsx("p",{children:e.d})]},e.n))})]}),a.jsxs("section",{className:"yacad3-section--tinted",children:[a.jsxs("div",{className:"yacad3-section-head",children:[a.jsx("span",{className:"yacad3-eyebrow-light",children:"02 · Parcours disponibles"}),a.jsxs("h2",{className:"yacad3-h2",children:["Choisissez votre ",a.jsx("em",{children:"parcours"})]}),a.jsx("p",{className:"yacad3-lead",children:"8 parcours thématiques pensés pour le marché camerounais : vente, e-commerce, logistique, business."})]}),a.jsx("div",{className:"yacad3-parcours-grid",children:N.map(e=>a.jsxs("div",{className:"yacad3-parcours-card",style:{"--parc-color":e.color},onClick:c,children:[a.jsx("div",{className:"yacad3-parcours-emoji",children:e.icon}),a.jsx("div",{className:"yacad3-parcours-title",children:e.label}),a.jsx("div",{className:"yacad3-parcours-desc",children:e.desc})]},e.id))})]}),a.jsxs("section",{className:"yacad3-section",id:"yacad3-courses",children:[a.jsxs("div",{className:"yacad3-section-head",children:[a.jsx("span",{className:"yacad3-eyebrow-light",children:"03 · Catalogue"}),a.jsxs("h2",{className:"yacad3-h2",children:["Toutes nos ",a.jsx("em",{children:"formations"})]}),a.jsx("p",{className:"yacad3-lead",children:"Sélectionnez par niveau ou commencez par une formation gratuite."})]}),a.jsx("div",{className:"yacad3-filters",children:["TOUT","DÉBUTANT","INTERMÉDIAIRE","AVANCÉ"].map(e=>a.jsxs("button",{type:"button",className:`yacad3-filter${n===e?" is-active":""}`,onClick:()=>f(e),children:[e==="TOUT"&&"📚 Tout",e==="DÉBUTANT"&&"🌱 Débutant",e==="INTERMÉDIAIRE"&&"🚀 Intermédiaire",e==="AVANCÉ"&&"💎 Avancé"]},e))}),o?a.jsxs("div",{className:"yacad3-loading",children:[a.jsx("div",{className:"yacad3-spinner"}),"Chargement des formations..."]}):h.length===0?a.jsxs("div",{className:"yacad3-empty",children:[a.jsx("div",{className:"yacad3-empty-ico",children:"🎓"}),a.jsxs("p",{children:["Aucune formation dans cette catégorie pour l'instant.",a.jsx("br",{}),"Revenez bientôt — de nouveaux modules arrivent chaque semaine."]})]}):a.jsx("div",{className:"yacad3-courses-grid",children:h.map(e=>{const s=(e.prix||0)===0,j=e.category==="DÉBUTANT"?"debutant":e.category==="INTERMÉDIAIRE"?"intermediaire":"avance";return a.jsxs("article",{className:"yacad3-course",onClick:()=>r==null?void 0:r(e),role:"link",tabIndex:0,onKeyDown:d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),r==null||r(e))},children:[a.jsxs("div",{className:"yacad3-course-img",style:{background:e.color_bg||"var(--acad-green-pale)"},children:[a.jsx("span",{children:e.emoji||"🎓"}),a.jsx("span",{className:`yacad3-course-level yacad3-course-level--${j}`,children:e.category}),s&&a.jsx("span",{className:"yacad3-course-pin-free",children:"🎁 GRATUIT"})]}),a.jsxs("div",{className:"yacad3-course-body",children:[a.jsx("h3",{className:"yacad3-course-title",children:e.title}),a.jsxs("div",{className:"yacad3-course-meta",children:[a.jsxs("span",{children:["⏱ ",e.duration||"—"]}),a.jsxs("span",{children:["👥 ",(e.students_count||0).toLocaleString("fr-FR")]})]}),a.jsxs("div",{className:"yacad3-course-foot",children:[a.jsx("div",{className:`yacad3-course-price${s?" yacad3-course-price--free":""}`,children:s?"Gratuit":`${e.prix.toLocaleString("fr-FR")} F`}),a.jsx("button",{type:"button",className:"yacad3-course-cta",onClick:d=>{d.stopPropagation(),r==null||r(e)},children:"Démarrer →"})]})]})]},e.id)})})]}),a.jsxs("section",{className:"yacad3-section--tinted",children:[a.jsxs("div",{className:"yacad3-section-head",children:[a.jsx("span",{className:"yacad3-eyebrow-light",children:"04 · Progression"}),a.jsxs("h2",{className:"yacad3-h2",children:["Quatre niveaux. ",a.jsx("em",{children:"Une progression claire."})]}),a.jsx("p",{className:"yacad3-lead",children:"Du débutant à l'elite : un parcours structuré pour devenir un entrepreneur reconnu au Cameroun."})]}),a.jsx("div",{className:"yacad3-levels",children:w.map(e=>a.jsxs("article",{className:"yacad3-level",style:{"--lvl-color":e.color,"--lvl-gradient":e.gradient},children:[a.jsx("div",{className:"yacad3-level-emoji",children:e.emoji}),a.jsx("h3",{className:"yacad3-level-name",children:e.label}),a.jsx("p",{className:"yacad3-level-pitch",children:e.pitch}),a.jsxs("div",{className:"yacad3-level-progress",children:[a.jsxs("div",{className:"yacad3-level-progress-head",children:[a.jsx("span",{children:"Étudiants à ce niveau"}),a.jsxs("strong",{children:[e.pct,"%"]})]}),a.jsx("div",{className:"yacad3-level-progress-bar",children:a.jsx("div",{className:"yacad3-level-progress-fill",style:{width:`${e.pct}%`}})})]}),a.jsx("ul",{className:"yacad3-level-perks",children:e.perks.map(s=>a.jsxs("li",{children:[a.jsx("span",{children:"✓"}),s]},s))})]},e.id))})]}),a.jsxs("section",{className:"yacad3-section",children:[a.jsxs("div",{className:"yacad3-section-head",children:[a.jsx("span",{className:"yacad3-eyebrow-light",children:"05 · Certification"}),a.jsxs("h2",{className:"yacad3-h2",children:["Recevez votre ",a.jsx("em",{children:"certificat Yorix"})]}),a.jsx("p",{className:"yacad3-lead",children:"Un document officiel à partager sur LinkedIn, WhatsApp et avec vos clients."})]}),a.jsxs("div",{className:"yacad3-cert",children:[a.jsxs("div",{className:"yacad3-cert-visual",children:[a.jsx("div",{className:"yacad3-cert-seal",children:"🏅"}),a.jsx("div",{className:"yacad3-cert-brand",children:"YORIX ACADEMY"}),a.jsx("div",{className:"yacad3-cert-title",children:"Certificat de réussite"}),a.jsx("div",{className:"yacad3-cert-line"}),a.jsx("div",{className:"yacad3-cert-name",children:(l==null?void 0:l.nom)||"Votre nom"}),a.jsxs("div",{className:"yacad3-cert-foot",children:["Formation : WhatsApp Selling Pro · ",new Date().toLocaleDateString("fr-FR")]})]}),a.jsxs("div",{className:"yacad3-cert-text",children:[a.jsxs("h3",{className:"yacad3-h2",style:{fontSize:"1.3rem",marginBottom:10},children:["Reconnu &",a.jsx("br",{}),a.jsx("em",{children:"officiel"})]}),a.jsx("p",{className:"yacad3-lead",style:{fontSize:".88rem"},children:"Le certificat Yorix Academy atteste de vos compétences acquises et de votre engagement dans la formation continue."}),a.jsxs("ul",{children:[a.jsxs("li",{children:[a.jsx("span",{children:"1"}),a.jsxs("span",{children:[a.jsx("strong",{children:"Partageable"})," sur LinkedIn, WhatsApp, CV."]})]}),a.jsxs("li",{children:[a.jsx("span",{children:"2"}),a.jsxs("span",{children:[a.jsx("strong",{children:"Vérifiable"})," via un QR code unique."]})]}),a.jsxs("li",{children:[a.jsx("span",{children:"3"}),a.jsxs("span",{children:[a.jsx("strong",{children:"Reconnu"})," par les partenaires Yorix (CinetPay, MTN, Orange)."]})]}),a.jsxs("li",{children:[a.jsx("span",{children:"4"}),a.jsxs("span",{children:[a.jsx("strong",{children:"Boost de profil"})," sur la marketplace Yorix."]})]})]})]})]})]}),a.jsxs("section",{className:"yacad3-section",children:[a.jsxs("div",{className:"yacad3-section-head",children:[a.jsx("span",{className:"yacad3-eyebrow-light",children:"06 · Témoignages"}),a.jsxs("h2",{className:"yacad3-h2",children:["Ils ont ",a.jsx("em",{children:"transformé leur activité"})]}),a.jsx("p",{className:"yacad3-lead",children:"Des entrepreneurs camerounais qui ont fait grandir leur business grâce à Yorix Academy."})]}),a.jsx("div",{className:"yacad3-stories",children:z.map(e=>a.jsxs("article",{className:"yacad3-story",style:{"--story-color":e.color},children:[a.jsxs("div",{className:"yacad3-story-header",children:[a.jsx("div",{className:"yacad3-story-av",children:e.avatar}),a.jsxs("div",{children:[a.jsx("div",{className:"yacad3-story-name",children:e.name}),a.jsx("div",{className:"yacad3-story-role",children:e.role})]})]}),a.jsx("p",{className:"yacad3-story-quote",children:e.quote}),a.jsxs("span",{className:"yacad3-story-metric",children:["📈 ",e.metric]})]},e.name))})]}),a.jsxs("section",{className:"yacad3-section",children:[a.jsxs("div",{className:"yacad3-section-head",children:[a.jsx("span",{className:"yacad3-eyebrow-light",children:"07 · Questions fréquentes"}),a.jsxs("h2",{className:"yacad3-h2",children:["Tout savoir sur ",a.jsx("em",{children:"Yorix Academy"})]})]}),a.jsx("div",{className:"yacad3-faq",children:S.map((e,s)=>a.jsxs("details",{className:"yacad3-faq-item",children:[a.jsx("summary",{children:e.q}),a.jsx("p",{children:e.a})]},s))})]}),a.jsx("section",{className:"yacad3-section",children:a.jsx("div",{className:"yacad3-final",children:a.jsxs("div",{className:"yacad3-final-inner",children:[a.jsxs("span",{className:"yacad3-eyebrow",children:[a.jsx("span",{className:"yacad3-eyebrow-dot"})," Rejoignez Yorix Academy"]}),a.jsxs("h2",{className:"yacad3-h2 yacad3-h2--on-dark",children:["Commencez votre",a.jsx("br",{}),a.jsx("em",{children:"transformation"})," aujourd'hui"]}),a.jsxs("p",{className:"yacad3-sub yacad3-sub--on-dark",children:[a.jsx("strong",{children:"+850 entrepreneurs"})," camerounais ont déjà commencé leur parcours. Inscription gratuite · première formation offerte · certificats officiels."]}),a.jsxs("div",{className:"yacad3-final-actions",children:[a.jsxs("button",{type:"button",className:"yacad3-btn yacad3-btn--pri",onClick:x?g:v,children:["🚀 ",x?"Commencer gratuitement":"Créer mon compte"]}),a.jsx("button",{type:"button",className:"yacad3-btn yacad3-btn--sec",onClick:c,children:"Voir le catalogue"})]}),a.jsxs("ul",{className:"yacad3-final-trust",children:[a.jsxs("li",{children:[a.jsx("span",{"aria-hidden":!0,children:"🎓"})," Certificats officiels"]}),a.jsxs("li",{children:[a.jsx("span",{"aria-hidden":!0,children:"📱"})," Mobile-friendly"]}),a.jsxs("li",{children:[a.jsx("span",{"aria-hidden":!0,children:"🇨🇲"})," 100% Cameroun"]}),a.jsxs("li",{children:[a.jsx("span",{"aria-hidden":!0,children:"⚡"})," 30 sec d'inscription"]})]})]})})})]})]})}export{q as AcademyPage};
