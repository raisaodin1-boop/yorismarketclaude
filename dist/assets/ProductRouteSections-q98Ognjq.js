import{j as e,C as v}from"./index-cVu7CjtG.js";import{P as f}from"./ProdGrid-BECzT9d6.js";import"./react-CDaM45aE.js";import"./supabase-D2gm834s.js";import"./OptimizedImage-BRZcMq2G.js";import"./ModalCommander-BAAsYgzc.js";import"./checkoutApi-BZiFaq6m.js";function j({items:t}){return e.jsx("nav",{className:"yesc3-bc","aria-label":"Fil d'ariane",children:t.map((r,a)=>e.jsxs("span",{className:"yesc3-bc-item",children:[r.onClick?e.jsx("button",{type:"button",onClick:r.onClick,children:r.label}):e.jsx("span",{className:"yesc3-bc-current",children:r.label}),a<t.length-1&&e.jsx("span",{className:"yesc3-bc-sep","aria-hidden":!0,children:"›"})]},a))})}function w({dark:t,produitsLoading:r,produits:a,user:c,userData:d,wishlist:u,addToCart:n,toggleWish:o,openProductUrl:p,goPage:i}){const l=(a||[]).filter(s=>s.escrow);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
    .yorix-esc-v3 {
      --esc-green: #1a6b3a;
      --esc-green-deep: #0d4d28;
      --esc-green-pale: #e8f5e9;
      --esc-green-light: #86efac;
      --esc-yellow: #fcd116;
      --esc-gold: #f59e0b;
      --esc-blue: #2563eb;
      --esc-ink: var(--ink, #111);
      --esc-gray: var(--gray, #666);
      --esc-surface: var(--surface, #fff);
      --esc-surface2: var(--surface2, #f8f8f8);
      --esc-border: var(--border, #e5e5e5);
      --esc-shadow: 0 12px 30px rgba(0,0,0,.08);
      --esc-shadow-hover: 0 22px 50px rgba(0,0,0,.14);

      font-family: 'DM Sans', sans-serif;
      color: var(--esc-ink);
    }
    .yorix-esc-v3 * { box-sizing: border-box; }

    /* ━━━ BREADCRUMB ━━━ */
    .yesc3-bc {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      margin-bottom: 20px;
      font-size: .76rem;
    }
    .yesc3-bc-item { display: inline-flex; align-items: center; gap: 6px; }
    .yesc3-bc button {
      background: none;
      border: none;
      color: rgba(255,255,255,.65);
      cursor: pointer;
      padding: 0;
      font-family: inherit;
      font-size: inherit;
      transition: color .15s;
    }
    .yesc3-bc button:hover { color: var(--esc-yellow); }
    .yesc3-bc-current { color: #fff; font-weight: 600; }
    .yesc3-bc-sep { color: rgba(255,255,255,.35); font-size: .9rem; }

    /* ━━━ HERO PREMIUM ━━━ */
    .yesc3-hero {
      position: relative;
      background: linear-gradient(135deg, #0a1410 0%, #1a3a24 45%, #0d3320 100%);
      color: #fff;
      padding: 56px 24px 70px;
      overflow: hidden;
      border-radius: 0 0 28px 28px;
      margin-bottom: 50px;
    }
    .yesc3-hero::before {
      content: '';
      position: absolute;
      top: -120px; right: -100px;
      width: 460px; height: 460px;
      background: radial-gradient(circle, rgba(252,209,22,.16), transparent 65%);
      border-radius: 50%;
      pointer-events: none;
    }
    .yesc3-hero::after {
      content: '';
      position: absolute;
      bottom: -150px; left: -120px;
      width: 420px; height: 420px;
      background: radial-gradient(circle, rgba(79,209,125,.12), transparent 65%);
      border-radius: 50%;
      pointer-events: none;
    }
    .yesc3-hero-inner {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
    }
    .yesc3-hero-grid {
      display: grid;
      grid-template-columns: 1.1fr 1fr;
      gap: 44px;
      align-items: center;
    }

    .yesc3-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: rgba(252,209,22,.14);
      color: var(--esc-yellow);
      border: 1px solid rgba(252,209,22,.32);
      padding: 6px 14px;
      border-radius: 50px;
      font-size: .7rem;
      font-weight: 700;
      margin-bottom: 18px;
      letter-spacing: .04em;
    }
    .yesc3-eyebrow-dot {
      width: 7px; height: 7px;
      background: var(--esc-yellow);
      border-radius: 50%;
      box-shadow: 0 0 12px var(--esc-yellow);
      animation: yesc3Pulse 2s ease-in-out infinite;
    }
    @keyframes yesc3Pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%      { opacity: .5; transform: scale(1.4); }
    }

    .yesc3-h1 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 800;
      line-height: 1.07;
      letter-spacing: -1.5px;
      margin-bottom: 16px;
    }
    .yesc3-h1 em {
      font-style: normal;
      background: linear-gradient(135deg, #fcd116, #f59e0b);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .yesc3-sub {
      font-size: clamp(.95rem, 1.5vw, 1.05rem);
      color: rgba(255,255,255,.75);
      line-height: 1.7;
      margin-bottom: 22px;
      max-width: 520px;
    }
    .yesc3-sub strong { color: #fff; font-weight: 700; }

    .yesc3-args {
      list-style: none;
      padding: 0;
      margin: 0 0 26px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 9px;
    }
    .yesc3-args li {
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
    .yesc3-args li span:first-child {
      width: 26px; height: 26px;
      background: rgba(79,209,125,.2);
      border: 1px solid rgba(79,209,125,.4);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: .82rem;
      flex-shrink: 0;
    }

    .yesc3-hero-cta {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 22px;
    }
    .yesc3-trust-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .yesc3-trust-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.12);
      color: rgba(255,255,255,.75);
      padding: 5px 11px;
      border-radius: 50px;
      font-size: .7rem;
      font-weight: 600;
    }

    /* ━━━ HERO VISUEL : FLUX SÉCURISÉ ━━━ */
    .yesc3-hero-visual {
      position: relative;
      min-height: 380px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .yesc3-shield-bg {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 320px; height: 320px;
      background: radial-gradient(circle, rgba(252,209,22,.12), transparent 70%);
      border-radius: 50%;
      pointer-events: none;
    }
    .yesc3-shield-bg::before {
      content: '🛡️';
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      font-size: 10rem;
      opacity: .08;
    }
    .yesc3-flow-card {
      position: relative;
      z-index: 2;
      background: var(--esc-surface);
      border-radius: 18px;
      padding: 24px 22px;
      max-width: 380px;
      width: 100%;
      box-shadow: 0 28px 60px rgba(0,0,0,.4);
      border: 1px solid rgba(255,255,255,.1);
    }
    .yesc3-flow-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 18px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--esc-border);
    }
    .yesc3-flow-title {
      font-family: 'Syne', sans-serif;
      font-size: .85rem;
      font-weight: 800;
      color: var(--esc-ink);
      letter-spacing: -.2px;
    }
    .yesc3-flow-badge {
      background: var(--esc-green-pale);
      color: var(--esc-green);
      padding: 3px 10px;
      border-radius: 50px;
      font-size: .62rem;
      font-weight: 700;
      letter-spacing: .04em;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .yesc3-flow-badge::before {
      content: '';
      width: 6px; height: 6px;
      background: #4fd17d;
      border-radius: 50%;
      animation: yesc3LiveDot 1.5s ease-in-out infinite;
    }
    @keyframes yesc3LiveDot {
      0%, 100% { opacity: 1; }
      50%      { opacity: .35; }
    }
    .yesc3-flow-steps {
      list-style: none;
      padding: 0;
      margin: 0 0 14px;
      position: relative;
    }
    .yesc3-flow-steps::before {
      content: '';
      position: absolute;
      left: 18px;
      top: 18px;
      bottom: 18px;
      width: 2px;
      background: linear-gradient(180deg, var(--esc-green), var(--esc-green-pale));
    }
    .yesc3-flow-steps li {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 0;
      position: relative;
      z-index: 2;
    }
    .yesc3-flow-num {
      width: 38px; height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--esc-green), var(--esc-green-deep));
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .9rem;
      flex-shrink: 0;
      box-shadow: 0 4px 14px rgba(26,107,58,.3);
    }
    .yesc3-flow-num--check {
      background: linear-gradient(135deg, var(--esc-yellow), var(--esc-gold));
      color: #0d1f14;
    }
    .yesc3-flow-step-text {
      flex: 1;
    }
    .yesc3-flow-step-t {
      font-size: .85rem;
      font-weight: 700;
      color: var(--esc-ink);
      line-height: 1.3;
    }
    .yesc3-flow-step-s {
      font-size: .68rem;
      color: var(--esc-gray);
      margin-top: 1px;
    }
    .yesc3-flow-amount {
      background: linear-gradient(135deg, var(--esc-green-pale), #fff9e6);
      border: 1px dashed var(--esc-green-light);
      border-radius: 11px;
      padding: 12px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
    }
    .yesc3-flow-amount-lbl {
      font-size: .7rem;
      color: var(--esc-gray);
      font-weight: 600;
    }
    .yesc3-flow-amount-val {
      font-family: 'Syne', sans-serif;
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--esc-green);
      letter-spacing: -.3px;
    }

    /* ━━━ SECTIONS ━━━ */
    .yesc3-section {
      max-width: 1200px;
      margin: 0 auto 56px;
      padding: 0 24px;
    }
    .yesc3-section--tinted {
      background: var(--esc-surface2);
      padding: 56px 24px;
      margin: 0 auto 56px;
      border-radius: 24px;
      max-width: 1248px;
    }
    .yesc3-section-head {
      text-align: center;
      max-width: 720px;
      margin: 0 auto 36px;
    }
    .yesc3-eyebrow-light {
      display: inline-block;
      background: var(--esc-surface2);
      color: var(--esc-green);
      border: 1px solid var(--esc-border);
      padding: 5px 12px;
      border-radius: 50px;
      font-size: .66rem;
      font-weight: 700;
      letter-spacing: .12em;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .yesc3-h2 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(1.5rem, 3.5vw, 2.1rem);
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -1px;
      color: var(--esc-ink);
      margin-bottom: 10px;
    }
    .yesc3-h2 em {
      font-style: normal;
      color: var(--esc-green);
    }
    .yesc3-h2--on-dark { color: #fff; }
    .yesc3-h2--on-dark em {
      background: linear-gradient(135deg, #fcd116, #f59e0b);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .yesc3-lead {
      font-size: .95rem;
      color: var(--esc-gray);
      line-height: 1.65;
    }
    .yesc3-sub--on-dark { color: rgba(255,255,255,.75); }
    .yesc3-sub--on-dark strong { color: var(--esc-yellow); }

    /* ━━━ TIMELINE PREMIUM ━━━ */
    .yesc3-timeline {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 18px;
      position: relative;
    }
    .yesc3-timeline::before {
      content: '';
      position: absolute;
      top: 38px;
      left: 12%;
      right: 12%;
      height: 3px;
      background: linear-gradient(90deg,
        var(--esc-green) 0%,
        var(--esc-green) 33%,
        var(--esc-yellow) 66%,
        var(--esc-gold) 100%);
      border-radius: 3px;
      z-index: 0;
    }
    .yesc3-step {
      background: var(--esc-surface);
      border: 1.5px solid var(--esc-border);
      border-radius: 14px;
      padding: 22px 18px;
      text-align: center;
      transition: all .25s;
      position: relative;
      z-index: 2;
    }
    .yesc3-step:hover {
      transform: translateY(-4px);
      box-shadow: var(--esc-shadow);
      border-color: var(--esc-green-light);
    }
    .yesc3-step-num {
      width: 56px; height: 56px;
      margin: 0 auto 12px;
      background: linear-gradient(135deg, var(--esc-green), var(--esc-green-deep));
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
      position: relative;
    }
    .yesc3-step:nth-child(4) .yesc3-step-num {
      background: linear-gradient(135deg, var(--esc-yellow), var(--esc-gold));
      color: #0d1f14;
      box-shadow: 0 8px 22px rgba(252,209,22,.35);
    }
    .yesc3-step-emoji {
      font-size: 1.6rem;
      margin-bottom: 8px;
    }
    .yesc3-step h3 {
      font-family: 'Syne', sans-serif;
      font-size: 1rem;
      font-weight: 800;
      color: var(--esc-ink);
      margin-bottom: 6px;
      letter-spacing: -.3px;
    }
    .yesc3-step p {
      font-size: .78rem;
      color: var(--esc-gray);
      line-height: 1.55;
      margin: 0;
    }

    /* ━━━ POURQUOI SÉCURISÉ (4 garanties) ━━━ */
    .yesc3-trust-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }
    .yesc3-trust-card {
      background: var(--esc-surface);
      border: 1px solid var(--esc-border);
      border-radius: 14px;
      padding: 24px 22px;
      transition: all .25s;
      position: relative;
      overflow: hidden;
    }
    .yesc3-trust-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--esc-green), var(--esc-yellow));
      transform: scaleX(0);
      transform-origin: left;
      transition: transform .35s;
    }
    .yesc3-trust-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--esc-shadow);
      border-color: var(--esc-green);
    }
    .yesc3-trust-card:hover::before { transform: scaleX(1); }
    .yesc3-trust-icon {
      width: 52px; height: 52px;
      background: linear-gradient(135deg, var(--esc-green-pale), #fff9e6);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      margin-bottom: 14px;
      transition: transform .3s;
    }
    .yesc3-trust-card:hover .yesc3-trust-icon {
      transform: scale(1.1) rotate(-5deg);
    }
    .yesc3-trust-card h3 {
      font-family: 'Syne', sans-serif;
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--esc-ink);
      margin-bottom: 8px;
      letter-spacing: -.3px;
    }
    .yesc3-trust-card p {
      font-size: .84rem;
      color: var(--esc-gray);
      line-height: 1.6;
      margin: 0;
    }

    /* ━━━ DUO PROTECTION (acheteur / vendeur) ━━━ */
    .yesc3-duo {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .yesc3-protect {
      background: var(--esc-surface);
      border: 2px solid var(--esc-border);
      border-radius: 18px;
      padding: 28px 26px;
      position: relative;
      overflow: hidden;
      transition: all .25s;
    }
    .yesc3-protect:hover {
      transform: translateY(-4px);
      box-shadow: var(--esc-shadow-hover);
    }
    .yesc3-protect--buy {
      border-color: var(--esc-green-light);
      background: linear-gradient(135deg, #f0faf4, #fff);
    }
    .yesc3-protect--sell {
      border-color: rgba(252,209,22,.5);
      background: linear-gradient(135deg, #fffbeb, #fff);
    }
    .yesc3-protect::before {
      position: absolute;
      top: -20px; right: -20px;
      font-size: 8rem;
      opacity: .06;
      pointer-events: none;
    }
    .yesc3-protect--buy::before { content: '🛡️'; }
    .yesc3-protect--sell::before { content: '🏪'; }
    .yesc3-protect-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
      position: relative;
      z-index: 2;
    }
    .yesc3-protect-icon {
      width: 48px; height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
    }
    .yesc3-protect--buy .yesc3-protect-icon {
      background: var(--esc-green-pale);
      border: 1px solid var(--esc-green-light);
    }
    .yesc3-protect--sell .yesc3-protect-icon {
      background: #fef3c7;
      border: 1px solid rgba(252,209,22,.5);
    }
    .yesc3-protect-title {
      font-family: 'Syne', sans-serif;
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--esc-ink);
      letter-spacing: -.3px;
      line-height: 1.2;
    }
    .yesc3-protect-sub {
      font-size: .72rem;
      color: var(--esc-gray);
      font-weight: 600;
      margin-top: 2px;
    }
    .yesc3-protect-list {
      list-style: none;
      padding: 0;
      margin: 0;
      position: relative;
      z-index: 2;
    }
    .yesc3-protect-list li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 10px 0;
      font-size: .85rem;
      color: var(--esc-ink);
      line-height: 1.5;
      border-bottom: 1px solid rgba(0,0,0,.05);
    }
    .yesc3-protect-list li:last-child { border-bottom: none; }
    .yesc3-protect-list li span:first-child {
      flex-shrink: 0;
      width: 22px; height: 22px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: .72rem;
      font-weight: 800;
      margin-top: 1px;
    }
    .yesc3-protect--buy .yesc3-protect-list li span:first-child {
      background: var(--esc-green);
      color: #fff;
    }
    .yesc3-protect--sell .yesc3-protect-list li span:first-child {
      background: var(--esc-yellow);
      color: #0d1f14;
    }

    /* ━━━ CAS D'USAGE ━━━ */
    .yesc3-cases-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 14px;
    }
    .yesc3-case {
      background: var(--esc-surface);
      border: 1px solid var(--esc-border);
      border-radius: 12px;
      padding: 18px 16px;
      text-align: center;
      transition: all .2s;
    }
    .yesc3-case:hover {
      border-color: var(--esc-green);
      transform: translateY(-3px);
      box-shadow: var(--esc-shadow);
    }
    .yesc3-case-emoji {
      font-size: 2rem;
      margin-bottom: 8px;
      transition: transform .3s;
    }
    .yesc3-case:hover .yesc3-case-emoji {
      transform: scale(1.15);
    }
    .yesc3-case-title {
      font-family: 'Syne', sans-serif;
      font-size: .9rem;
      font-weight: 800;
      color: var(--esc-ink);
      margin-bottom: 4px;
      letter-spacing: -.2px;
    }
    .yesc3-case-desc {
      font-size: .72rem;
      color: var(--esc-gray);
      line-height: 1.5;
    }

    /* ━━━ FAQ ━━━ */
    .yesc3-faq {
      max-width: 760px;
      margin: 0 auto;
    }
    .yesc3-faq-item {
      background: var(--esc-surface);
      border: 1px solid var(--esc-border);
      border-radius: 12px;
      margin-bottom: 10px;
      overflow: hidden;
      transition: all .2s;
    }
    .yesc3-faq-item:hover { border-color: var(--esc-green); }
    .yesc3-faq-item[open] {
      box-shadow: var(--esc-shadow);
      border-color: var(--esc-green);
    }
    .yesc3-faq-item summary {
      padding: 16px 20px;
      cursor: pointer;
      font-weight: 700;
      font-size: .9rem;
      color: var(--esc-ink);
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 14px;
    }
    .yesc3-faq-item summary::after {
      content: '+';
      font-family: 'Syne', sans-serif;
      font-size: 1.6rem;
      color: var(--esc-green);
      transition: transform .25s;
      flex-shrink: 0;
    }
    .yesc3-faq-item[open] summary::after {
      transform: rotate(45deg);
    }
    .yesc3-faq-item p {
      padding: 0 20px 18px;
      font-size: .85rem;
      color: var(--esc-gray);
      line-height: 1.75;
      margin: 0;
    }

    /* ━━━ PRODUCTS SECTION ━━━ */
    .yesc3-products-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 14px;
    }
    .yesc3-products-head h2 {
      font-family: 'Syne', sans-serif;
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--esc-ink);
      letter-spacing: -.5px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .yesc3-products-head h2::before {
      content: '🛍️';
      font-size: 1.3rem;
    }
    .yesc3-sec-link {
      background: transparent;
      border: 1.5px solid var(--esc-border);
      color: var(--esc-ink);
      padding: 8px 16px;
      border-radius: 9px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: .82rem;
      cursor: pointer;
      transition: all .2s;
    }
    .yesc3-sec-link:hover {
      border-color: var(--esc-green);
      color: var(--esc-green);
      background: var(--esc-green-pale);
    }

    /* ━━━ CTA FINAL ━━━ */
    .yesc3-final {
      background: linear-gradient(135deg, #0a1410 0%, #1a3a24 100%);
      border-radius: 22px;
      padding: 48px 36px;
      color: #fff;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .yesc3-final::before {
      content: '🔐';
      position: absolute;
      top: 50%; right: -20px;
      transform: translateY(-50%);
      font-size: 14rem;
      opacity: .05;
      pointer-events: none;
    }
    .yesc3-final::after {
      content: '🛡️';
      position: absolute;
      top: 50%; left: -20px;
      transform: translateY(-50%);
      font-size: 12rem;
      opacity: .05;
      pointer-events: none;
    }
    .yesc3-final-inner {
      position: relative;
      z-index: 2;
      max-width: 600px;
      margin: 0 auto;
    }
    .yesc3-final-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 24px;
    }
    .yesc3-final-trust {
      display: flex;
      gap: 18px;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 24px;
      padding-top: 22px;
      border-top: 1px solid rgba(255,255,255,.1);
    }
    .yesc3-final-trust li {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: .75rem;
      color: rgba(255,255,255,.6);
    }

    /* ━━━ BUTTONS ━━━ */
    .yesc3-btn {
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
    .yesc3-btn--pri {
      background: linear-gradient(135deg, var(--esc-yellow), var(--esc-gold));
      color: #0d1f14;
      box-shadow: 0 8px 22px rgba(252,209,22,.35);
    }
    .yesc3-btn--pri:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(252,209,22,.45);
    }
    .yesc3-btn--sec {
      background: rgba(255,255,255,.1);
      color: #fff;
      border: 1.5px solid rgba(255,255,255,.2);
      backdrop-filter: blur(10px);
    }
    .yesc3-btn--sec:hover {
      background: rgba(255,255,255,.18);
    }
    .yesc3-btn--ghost-dark {
      background: transparent;
      color: var(--esc-ink);
      border: 1.5px solid var(--esc-border);
    }
    .yesc3-btn--ghost-dark:hover {
      background: var(--esc-surface);
      border-color: var(--esc-green);
      color: var(--esc-green);
    }

    /* ━━━ LOADING / EMPTY ━━━ */
    .yesc3-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 60px 20px;
      color: var(--esc-gray);
    }
    .yesc3-spinner {
      width: 22px; height: 22px;
      border: 3px solid var(--esc-border);
      border-top-color: var(--esc-green);
      border-radius: 50%;
      animation: yesc3Spin .7s linear infinite;
    }
    @keyframes yesc3Spin { to { transform: rotate(360deg); } }
    .yesc3-empty {
      text-align: center;
      padding: 50px 20px;
      background: var(--esc-surface);
      border: 1.5px dashed var(--esc-border);
      border-radius: 14px;
    }
    .yesc3-empty-ico {
      font-size: 3rem;
      margin-bottom: 10px;
      opacity: .6;
    }
    .yesc3-empty p {
      color: var(--esc-gray);
      font-size: .88rem;
      line-height: 1.65;
      margin: 0;
    }

    /* ━━━ RESPONSIVE ━━━ */
    @media (max-width: 960px) {
      .yesc3-hero { padding: 40px 18px 56px; }
      .yesc3-hero-grid { grid-template-columns: 1fr; gap: 32px; }
      .yesc3-hero-visual { min-height: auto; }
      .yesc3-timeline { grid-template-columns: repeat(2, 1fr); }
      .yesc3-timeline::before { display: none; }
      .yesc3-duo { grid-template-columns: 1fr; }
      .yesc3-final { padding: 36px 24px; }
      .yesc3-section--tinted { padding: 40px 18px; }
    }
    @media (max-width: 500px) {
      .yesc3-hero { padding: 32px 16px 50px; }
      .yesc3-h1 { font-size: 1.85rem; }
      .yesc3-args { grid-template-columns: 1fr; }
      .yesc3-timeline { grid-template-columns: 1fr; }
      .yesc3-hero-cta { flex-direction: column; align-items: stretch; }
      .yesc3-btn { width: 100%; text-align: center; }
      .yesc3-section, .yesc3-section--tinted { padding-left: 16px; padding-right: 16px; }
    }
  `}),e.jsxs("div",{className:"yorix-esc-v3 anim",children:[e.jsx("header",{className:"yesc3-hero",children:e.jsxs("div",{className:"yesc3-hero-inner",children:[e.jsx(j,{items:[{label:"Accueil",onClick:()=>i("home")},{label:"Escrow Yorix · paiement sécurisé"}]}),e.jsxs("div",{className:"yesc3-hero-grid",children:[e.jsxs("div",{children:[e.jsxs("span",{className:"yesc3-eyebrow",children:[e.jsx("span",{className:"yesc3-eyebrow-dot"})," Yorix Escrow · Paiement sécurisé"]}),e.jsxs("h1",{className:"yesc3-h1",children:["Votre argent reste",e.jsx("br",{}),e.jsx("em",{children:"protégé"})," jusqu'à validation"]}),e.jsxs("p",{className:"yesc3-sub",children:["Yorix bloque vos fonds jusqu'à ",e.jsx("strong",{children:"réception conforme"})," de votre commande. Pas de paiement direct au vendeur — c'est Yorix qui sécurise la transaction."]}),e.jsxs("ul",{className:"yesc3-args",children:[e.jsxs("li",{children:[e.jsx("span",{children:"🔐"}),e.jsx("span",{children:"Paiement sécurisé"})]}),e.jsxs("li",{children:[e.jsx("span",{children:"🛡️"}),e.jsx("span",{children:"Protection acheteur"})]}),e.jsxs("li",{children:[e.jsx("span",{children:"✅"}),e.jsx("span",{children:"Validation avant libération"})]}),e.jsxs("li",{children:[e.jsx("span",{children:"⚖️"}),e.jsx("span",{children:"Médiation Yorix 48h"})]})]}),e.jsxs("div",{className:"yesc3-hero-cta",children:[e.jsx("button",{type:"button",className:"yesc3-btn yesc3-btn--pri",onClick:()=>i("produits"),children:"🛒 Acheter avec Escrow"}),e.jsx("button",{type:"button",className:"yesc3-btn yesc3-btn--sec",onClick:()=>{const s=document.getElementById("yesc3-timeline");s&&s.scrollIntoView({behavior:"smooth",block:"start"})},children:"Comment ça marche"})]}),e.jsxs("div",{className:"yesc3-trust-row",children:[e.jsx("span",{className:"yesc3-trust-pill",children:"🇨🇲 Médiation équipe Cameroun"}),e.jsx("span",{className:"yesc3-trust-pill",children:"📱 MTN MoMo / Orange Money"}),e.jsx("span",{className:"yesc3-trust-pill",children:"⚡ Litige 48h max"})]})]}),e.jsxs("div",{className:"yesc3-hero-visual",children:[e.jsx("div",{className:"yesc3-shield-bg"}),e.jsxs("div",{className:"yesc3-flow-card",children:[e.jsxs("div",{className:"yesc3-flow-head",children:[e.jsx("div",{className:"yesc3-flow-title",children:"🔐 Flux Escrow sécurisé"}),e.jsx("span",{className:"yesc3-flow-badge",children:"EN COURS"})]}),e.jsxs("ul",{className:"yesc3-flow-steps",children:[e.jsxs("li",{children:[e.jsx("div",{className:"yesc3-flow-num",children:"1"}),e.jsxs("div",{className:"yesc3-flow-step-text",children:[e.jsx("div",{className:"yesc3-flow-step-t",children:"Paiement bloqué"}),e.jsx("div",{className:"yesc3-flow-step-s",children:"Fonds en sécurité chez Yorix"})]})]}),e.jsxs("li",{children:[e.jsx("div",{className:"yesc3-flow-num",children:"2"}),e.jsxs("div",{className:"yesc3-flow-step-text",children:[e.jsx("div",{className:"yesc3-flow-step-t",children:"Expédition vendeur"}),e.jsx("div",{className:"yesc3-flow-step-s",children:"Suivi en temps réel"})]})]}),e.jsxs("li",{children:[e.jsx("div",{className:"yesc3-flow-num",children:"3"}),e.jsxs("div",{className:"yesc3-flow-step-text",children:[e.jsx("div",{className:"yesc3-flow-step-t",children:"Livraison reçue"}),e.jsx("div",{className:"yesc3-flow-step-s",children:"Vous vérifiez la conformité"})]})]}),e.jsxs("li",{children:[e.jsx("div",{className:"yesc3-flow-num yesc3-flow-num--check",children:"✓"}),e.jsxs("div",{className:"yesc3-flow-step-text",children:[e.jsx("div",{className:"yesc3-flow-step-t",children:"Libération vendeur"}),e.jsx("div",{className:"yesc3-flow-step-s",children:"Paiement libéré automatiquement"})]})]})]}),e.jsxs("div",{className:"yesc3-flow-amount",children:[e.jsx("div",{className:"yesc3-flow-amount-lbl",children:"💰 Montant sécurisé"}),e.jsx("div",{className:"yesc3-flow-amount-val",children:"25 000 FCFA"})]})]})]})]})]})}),e.jsxs("section",{className:"yesc3-section",id:"yesc3-timeline",children:[e.jsxs("div",{className:"yesc3-section-head",children:[e.jsx("span",{className:"yesc3-eyebrow-light",children:"01 · Comment ça marche"}),e.jsxs("h2",{className:"yesc3-h2",children:["Timeline en ",e.jsx("em",{children:"quatre étapes"})," claires"]}),e.jsx("p",{className:"yesc3-lead",children:"De votre paiement à la livraison validée : chaque étape est tracée, sécurisée, et arbitrable."})]}),e.jsx("div",{className:"yesc3-timeline",children:[{n:"01",emoji:"💰",t:"Commande",d:"Fonds placés hors portée du vendeur jusqu'à accusé réception."},{n:"02",emoji:"📦",t:"Préparation",d:"Le vendeur prépare et expédie — statut suivi dans vos commandes."},{n:"03",emoji:"🚚",t:"Livré",d:"Vous confirmez la réception : les fonds partent automatiquement."},{n:"04",emoji:"⚖️",t:"Litige (si désaccord)",d:"Yorix tranche sous 48h ouvrées si désaccord avéré."}].map(s=>e.jsxs("div",{className:"yesc3-step",children:[e.jsx("div",{className:"yesc3-step-num",children:s.n}),e.jsx("div",{className:"yesc3-step-emoji",children:s.emoji}),e.jsx("h3",{children:s.t}),e.jsx("p",{children:s.d})]},s.n))})]}),e.jsxs("section",{className:"yesc3-section--tinted",children:[e.jsxs("div",{className:"yesc3-section-head",children:[e.jsx("span",{className:"yesc3-eyebrow-light",children:"02 · 4 garanties"}),e.jsxs("h2",{className:"yesc3-h2",children:["Pourquoi c'est ",e.jsx("em",{children:"vraiment sécurisé"})]}),e.jsx("p",{className:"yesc3-lead",children:"Quatre mécanismes complémentaires qui protègent à la fois acheteurs et vendeurs."})]}),e.jsx("div",{className:"yesc3-trust-grid",children:[{e:"🔐",t:"Fonds bloqués",d:"Votre paiement est conservé par Yorix et reste inaccessible au vendeur tant que la livraison n'est pas validée."},{e:"🛡️",t:"Anti-arnaque",d:"Tous nos vendeurs sont vérifiés (CNI, RC, contrat). Aucune commande sans identité tracée."},{e:"⚖️",t:"Médiation rapide",d:"Notre équipe basée à Douala arbitre les litiges sous 48h ouvrées maximum."},{e:"💸",t:"Remboursement garanti",d:"Si la médiation conclut en votre faveur, vous êtes remboursé(e) intégralement via MoMo ou Orange Money."}].map(s=>e.jsxs("article",{className:"yesc3-trust-card",children:[e.jsx("div",{className:"yesc3-trust-icon",children:s.e}),e.jsx("h3",{children:s.t}),e.jsx("p",{children:s.d})]},s.t))})]}),e.jsxs("section",{className:"yesc3-section",children:[e.jsxs("div",{className:"yesc3-section-head",children:[e.jsx("span",{className:"yesc3-eyebrow-light",children:"03 · Double protection"}),e.jsxs("h2",{className:"yesc3-h2",children:["Acheteurs ",e.jsx("em",{children:"ET"})," vendeurs gagnent en confiance"]}),e.jsx("p",{className:"yesc3-lead",children:"L'Escrow Yorix ne protège pas qu'un seul camp : c'est un système gagnant-gagnant pour tous."})]}),e.jsxs("div",{className:"yesc3-duo",children:[e.jsxs("article",{className:"yesc3-protect yesc3-protect--buy",children:[e.jsxs("div",{className:"yesc3-protect-header",children:[e.jsx("div",{className:"yesc3-protect-icon",children:"🛡️"}),e.jsxs("div",{children:[e.jsx("div",{className:"yesc3-protect-title",children:"Acheteur"}),e.jsx("div",{className:"yesc3-protect-sub",children:"Vos achats protégés"})]})]}),e.jsxs("ul",{className:"yesc3-protect-list",children:[e.jsxs("li",{children:[e.jsx("span",{children:"✓"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Remboursement"})," si produit non conforme ou non livré."]})]}),e.jsxs("li",{children:[e.jsx("span",{children:"✓"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Aucun paiement direct"})," au vendeur — pas de risque d'arnaque."]})]}),e.jsxs("li",{children:[e.jsx("span",{children:"✓"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Historique de paiement"})," lisible et tracé après chaque commande."]})]}),e.jsxs("li",{children:[e.jsx("span",{children:"✓"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Support WhatsApp"})," 7j/7 en cas d'urgence ou de litige."]})]}),e.jsxs("li",{children:[e.jsx("span",{children:"✓"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Validation finale"})," à votre seule discrétion après réception."]})]})]})]}),e.jsxs("article",{className:"yesc3-protect yesc3-protect--sell",children:[e.jsxs("div",{className:"yesc3-protect-header",children:[e.jsx("div",{className:"yesc3-protect-icon",children:"🏪"}),e.jsxs("div",{children:[e.jsx("div",{className:"yesc3-protect-title",children:"Vendeur"}),e.jsx("div",{className:"yesc3-protect-sub",children:"Vos ventes sécurisées"})]})]}),e.jsxs("ul",{className:"yesc3-protect-list",children:[e.jsxs("li",{children:[e.jsx("span",{children:"✓"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Acheteurs sérieux"})," — le paiement est déjà reçu avant expédition."]})]}),e.jsxs("li",{children:[e.jsx("span",{children:"✓"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Plus de confiance"})," = plus de paniers convertis (+38 % en moyenne)."]})]}),e.jsxs("li",{children:[e.jsx("span",{children:"✓"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Libération automatique"})," dès validation acheteur."]})]}),e.jsxs("li",{children:[e.jsx("span",{children:"✓"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Protection litige"})," : Yorix analyse les preuves des deux côtés."]})]}),e.jsxs("li",{children:[e.jsx("span",{children:"✓"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Crédibilité boost"}),' — badge "Escrow certifié" sur vos produits.']})]})]})]})]})]}),e.jsxs("section",{className:"yesc3-section",children:[e.jsxs("div",{className:"yesc3-section-head",children:[e.jsx("span",{className:"yesc3-eyebrow-light",children:"04 · Cas d'usage"}),e.jsxs("h2",{className:"yesc3-h2",children:["Quand utiliser ",e.jsx("em",{children:"l'Escrow Yorix"})," ?"]}),e.jsx("p",{className:"yesc3-lead",children:"Particulièrement recommandé pour les transactions à risque ou à forte valeur."})]}),e.jsx("div",{className:"yesc3-cases-grid",children:[{e:"💎",t:"Achats chers",d:"Téléphones, électronique, bijoux dès 50 000 FCFA."},{e:"🌍",t:"Achat à distance",d:"Vendeur dans une autre ville sans rencontre physique."},{e:"🛠️",t:"Prestations",d:"Services à domicile, BTP, événementiel avec paiement à étapes."},{e:"📦",t:"Livraison J+1+",d:"Quand vous voulez attendre la réception avant de payer."},{e:"🏢",t:"B2B & grossiste",d:"Commandes en gros avec acompte sécurisé."},{e:"🎁",t:"Première commande",d:"Quand vous testez un nouveau vendeur que vous ne connaissez pas."}].map(s=>e.jsxs("div",{className:"yesc3-case",children:[e.jsx("div",{className:"yesc3-case-emoji",children:s.e}),e.jsx("div",{className:"yesc3-case-title",children:s.t}),e.jsx("div",{className:"yesc3-case-desc",children:s.d})]},s.t))})]}),e.jsxs("section",{className:"yesc3-section",children:[e.jsxs("div",{className:"yesc3-section-head",children:[e.jsx("span",{className:"yesc3-eyebrow-light",children:"05 · Questions fréquentes"}),e.jsxs("h2",{className:"yesc3-h2",children:["Tout savoir sur ",e.jsx("em",{children:"l'Escrow Yorix"})]})]}),e.jsx("div",{className:"yesc3-faq",children:[{q:"Quand exactement mon argent est-il libéré au vendeur ?",a:"Dès que vous confirmez la réception conforme de votre commande depuis votre espace client. Si vous ne confirmez pas dans les 7 jours suivant la livraison, le paiement est automatiquement libéré (sauf si vous avez ouvert un litige)."},{q:"Que se passe-t-il en cas de litige ?",a:"Vous ouvrez un litige depuis votre espace client en moins d'un clic. Notre équipe de médiation basée à Douala examine les preuves (photos, conversations, factures) des deux parties et tranche sous 48 heures ouvrées. La décision est sans appel et exécutée immédiatement."},{q:"Le vendeur peut-il accéder à l'argent avant la livraison ?",a:"Non. C'est tout l'intérêt de l'Escrow : les fonds sont conservés par Yorix sur un compte séparé et ne sont libérés au vendeur que sur validation acheteur (ou décision de médiation favorable)."},{q:"Comment Yorix arbitre-t-il les litiges ?",a:"Notre équipe analyse : 1) les preuves de livraison (photo signée, code de réception), 2) les preuves de conformité (photos du produit reçu), 3) l'historique des deux comptes, 4) les échanges WhatsApp Yorix. La décision favorise toujours la partie qui apporte les preuves les plus solides."},{q:"L'Escrow est-il disponible partout au Cameroun ?",a:"Oui, dans toutes les villes où Yorix livre : Douala, Yaoundé, Bafoussam, Bamenda, Kribi, Garoua et au-delà. Le service est gratuit pour l'acheteur — il est inclus dans la commission Yorix de 5%."},{q:"Tous les produits sont-ils éligibles ?",a:"Les vendeurs peuvent activer l'option Escrow sur chaque produit. Tous les produits marqués 🔐 Escrow sur la fiche sont protégés. La grande majorité des produits Yorix sont éligibles."}].map((s,x)=>e.jsxs("details",{className:"yesc3-faq-item",children:[e.jsx("summary",{children:s.q}),e.jsx("p",{children:s.a})]},x))})]}),e.jsxs("section",{className:"yesc3-section",children:[e.jsxs("div",{className:"yesc3-products-head",children:[e.jsx("h2",{children:"Sélection produits Escrow"}),e.jsx("button",{type:"button",className:"yesc3-sec-link",onClick:()=>i("produits"),children:"Tout le catalogue →"})]}),r?e.jsxs("div",{className:"yesc3-loading",children:[e.jsx("div",{className:"yesc3-spinner"}),"Chargement des produits..."]}):l.length===0?e.jsxs("div",{className:"yesc3-empty",children:[e.jsx("div",{className:"yesc3-empty-ico",children:"📦"}),e.jsxs("p",{children:["Pas encore de produits Escrow listés.",e.jsx("br",{}),"Explorez tout le catalogue pour découvrir nos offres."]})]}):e.jsx(f,{prods:l.slice(0,24),user:c,userData:d,onAddToCart:n,onWish:o,wishlist:u,onOpenProductUrl:p})]}),e.jsx("section",{className:"yesc3-section",children:e.jsx("div",{className:"yesc3-final",children:e.jsxs("div",{className:"yesc3-final-inner",children:[e.jsxs("span",{className:"yesc3-eyebrow",children:[e.jsx("span",{className:"yesc3-eyebrow-dot"})," Commerce de confiance"]}),e.jsxs("h2",{className:"yesc3-h2 yesc3-h2--on-dark",children:["Commercez en toute ",e.jsx("em",{children:"confiance"}),e.jsx("br",{}),"sur Yorix"]}),e.jsxs("p",{className:"yesc3-sub yesc3-sub--on-dark",children:[e.jsx("strong",{children:"Plus de 2 400 commandes sécurisées"})," chaque mois grâce à l'Escrow Yorix. Rejoignez la marketplace de confiance du Cameroun."]}),e.jsxs("div",{className:"yesc3-final-actions",children:[e.jsx("button",{type:"button",className:"yesc3-btn yesc3-btn--pri",onClick:()=>i("produits"),children:"🛒 Acheter avec Escrow"}),e.jsx("button",{type:"button",className:"yesc3-btn yesc3-btn--sec",onClick:()=>i("aide"),children:"🆘 Centre d'aide"})]}),e.jsxs("ul",{className:"yesc3-final-trust",children:[e.jsxs("li",{children:[e.jsx("span",{"aria-hidden":!0,children:"🔐"})," 100% sécurisé"]}),e.jsxs("li",{children:[e.jsx("span",{"aria-hidden":!0,children:"⚖️"})," Médiation 48h"]}),e.jsxs("li",{children:[e.jsx("span",{"aria-hidden":!0,children:"🇨🇲"})," Made in Cameroun"]}),e.jsxs("li",{children:[e.jsx("span",{"aria-hidden":!0,children:"📱"})," Support 7j/7"]})]})]})})})]})]})}function Y({showProduits:t,page:r,seoCityName:a,produitsFiltres:c,produitsLoading:d,produits:u,filterCat:n,setFilterCat:o,search:p,user:i,userData:l,wishlist:h,addToCart:s,toggleWish:x,openProductUrl:g,dark:b,goPage:y}){return t?e.jsxs("section",{className:"sec anim yorix-page-flow yorix-pro-page",children:[e.jsxs("div",{className:"sec-head yorix-catalog-head",children:[e.jsx("h1",{className:"sec-title",children:r==="seoCity"&&a?`🛍️ Achat en ligne à ${a} — produits marketplace`:"🛍️ Marketplace Cameroun — tous les produits"}),e.jsxs("div",{className:"yorix-sec-toolbar-end",style:{flexWrap:"wrap",justifyContent:"flex-end"},children:[e.jsxs("span",{className:"yorix-catalog-meta",children:[c.length," résultat(s)"]}),n&&e.jsxs("button",{type:"button",className:"btn-ghost yorix-pill--ghost",onClick:()=>o(""),children:["✕ ",n]})]})]}),e.jsxs("div",{className:"yorix-pill-row",role:"tablist","aria-label":"Catégories",children:[e.jsx("button",{type:"button",className:`yorix-pill${n?"":" is-active"}`,onClick:()=>o(""),children:"Tout"}),v.map(m=>e.jsx("button",{type:"button",className:`yorix-pill${n===m?" is-active":""}`,onClick:()=>o(m),children:m},m))]}),d?e.jsxs("div",{className:"loading",children:[e.jsx("div",{className:"spinner"})," Chargement..."]}):c.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:"🔍"}),e.jsxs("p",{children:["Aucun produit",p?` pour « ${p} »`:"","."]})]}):e.jsx(f,{prods:c,user:i,userData:l,onAddToCart:s,onWish:x,wishlist:h,onOpenProductUrl:g})]}):r==="escrow"&&typeof y=="function"?e.jsx(w,{dark:b,produitsLoading:d,produits:u,user:i,userData:l,wishlist:h,addToCart:s,toggleWish:x,openProductUrl:g,goPage:y}):null}export{Y as ProductRouteSections};
