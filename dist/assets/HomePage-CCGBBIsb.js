import{j as n,S as I,C as R,a as E,Y as y,s as T}from"./index-B8l4YOmz.js";import{r as d}from"./react-CDaM45aE.js";import{P as k}from"./ProdGrid-CiwHkU_-.js";import"./supabase-D2gm834s.js";import"./OptimizedImage-C_eB4bBp.js";import"./ModalCommander-uNB1Pfvx.js";import"./checkoutApi-BrtKbdsp.js";function P(){const l=()=>{const i=new Date,s=new Date(i);return s.setHours(23,59,59,999),Math.floor((s-i)/1e3)},[t,p]=d.useState(l);d.useEffect(()=>{const i=setInterval(()=>p(s=>s>0?s-1:l()),1e3);return()=>clearInterval(i)},[]);const m=String(Math.floor(t/3600)).padStart(2,"0"),c=String(Math.floor(t%3600/60)).padStart(2,"0"),o=String(t%60).padStart(2,"0");return n.jsx("div",{style:{display:"flex",gap:4,alignItems:"center"},children:[m,c,o].map((i,s)=>n.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4},children:[n.jsx("span",{style:{background:"var(--red)",color:"#fff",padding:"2px 7px",borderRadius:5,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".82rem",minWidth:30,textAlign:"center"},children:i}),s<2&&n.jsx("span",{style:{fontWeight:800,color:"var(--red)",fontSize:".82rem"},children:":"})]},s))})}const L=`/* YORIX CM — HOMEPAGE PREMIUM v3 (scopé .yorix-home-v3 / .yhm3-*) */

.yorix-home-v3 {
  --hm-green: #1a6b3a;
  --hm-green-deep: #0d4d28;
  --hm-green-pale: #e8f5e9;
  --hm-green-light: #86efac;
  --hm-yellow: #fcd116;
  --hm-gold: #f59e0b;
  --hm-ink: var(--ink, #111);
  --hm-gray: var(--gray, #666);
  --hm-surface: var(--surface, #fff);
  --hm-surface2: var(--surface2, #f8f8f8);
  --hm-border: var(--border, #e5e5e5);
  --hm-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  --hm-shadow-hover: 0 22px 50px rgba(0, 0, 0, 0.14);

  font-family: "DM Sans", sans-serif;
  color: var(--hm-ink);
}
.yorix-home-v3 * {
  box-sizing: border-box;
}

.yhm3-marquee {
  background: linear-gradient(90deg, var(--hm-green-deep), var(--hm-green), var(--hm-green-deep));
  color: #fff;
  padding: 9px 0;
  overflow: hidden;
  position: relative;
}
.yhm3-marquee-track {
  display: inline-flex;
  gap: 38px;
  white-space: nowrap;
  animation: yhm3MarqueeRoll 36s linear infinite;
}
@keyframes yhm3MarqueeRoll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
.yhm3-marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.92);
}
.yhm3-marquee-item span {
  font-size: 0.95rem;
}

.yhm3-hero {
  position: relative;
  background: linear-gradient(135deg, #0a1410 0%, #1a3a24 45%, #0d3320 100%);
  color: #fff;
  padding: 56px 24px 70px;
  overflow: hidden;
  border-radius: 0 0 28px 28px;
  margin-bottom: 50px;
}
.yhm3-hero::before {
  content: "";
  position: absolute;
  top: -120px;
  right: -100px;
  width: 480px;
  height: 480px;
  background: radial-gradient(circle, rgba(252, 209, 22, 0.16), transparent 65%);
  border-radius: 50%;
  pointer-events: none;
}
.yhm3-hero::after {
  content: "";
  position: absolute;
  bottom: -150px;
  left: -120px;
  width: 460px;
  height: 460px;
  background: radial-gradient(circle, rgba(79, 209, 125, 0.12), transparent 65%);
  border-radius: 50%;
  pointer-events: none;
}
.yhm3-hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}
.yhm3-hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 44px;
  align-items: start;
}
.yhm3-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(252, 209, 22, 0.14);
  color: var(--hm-yellow);
  border: 1px solid rgba(252, 209, 22, 0.32);
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: 700;
  margin-bottom: 18px;
  letter-spacing: 0.04em;
}
.yhm3-eyebrow-dot {
  width: 7px;
  height: 7px;
  background: var(--hm-yellow);
  border-radius: 50%;
  box-shadow: 0 0 12px var(--hm-yellow);
  animation: yhm3Pulse 2s ease-in-out infinite;
}
@keyframes yhm3Pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.4);
  }
}
.yhm3-h1 {
  font-family: "Syne", sans-serif;
  font-size: clamp(2.2rem, 5.5vw, 3.4rem);
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: -1.8px;
  margin-bottom: 18px;
}
.yhm3-h1 em {
  font-style: normal;
  background: linear-gradient(135deg, #fcd116, #f59e0b);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.yhm3-sub {
  font-size: clamp(0.95rem, 1.5vw, 1.05rem);
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.7;
  margin-bottom: 22px;
  max-width: 540px;
}
.yhm3-sub strong {
  color: #fff;
  font-weight: 700;
}

.yhm3-hero-ctas {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}
.yhm3-btn {
  padding: 13px 24px;
  border-radius: 11px;
  font-family: "Syne", sans-serif;
  font-weight: 800;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  letter-spacing: -0.2px;
  white-space: nowrap;
}
.yhm3-btn--pri {
  background: linear-gradient(135deg, var(--hm-yellow), var(--hm-gold));
  color: #0d1f14;
  box-shadow: 0 8px 22px rgba(252, 209, 22, 0.35);
}
.yhm3-btn--pri:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(252, 209, 22, 0.45);
}
.yhm3-btn--sec {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}
.yhm3-btn--sec:hover {
  background: rgba(255, 255, 255, 0.18);
}
.yhm3-btn--green {
  background: linear-gradient(135deg, var(--hm-green), var(--hm-green-deep));
  color: #fff;
  box-shadow: 0 8px 22px rgba(26, 107, 58, 0.3);
}
.yhm3-btn--green:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(26, 107, 58, 0.4);
}
.yhm3-btn--ghost {
  background: transparent;
  color: var(--hm-ink);
  border: 1.5px solid var(--hm-border);
}
.yhm3-btn--ghost:hover {
  border-color: var(--hm-green);
  color: var(--hm-green);
  background: var(--hm-green-pale);
}

.yhm3-hero-trust {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}
.yhm3-hero-trust li {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.6);
  list-style: none;
}
.yhm3-hero-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  padding-top: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.yhm3-hero-stat-val {
  font-family: "Syne", sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--hm-yellow);
  letter-spacing: -0.5px;
  line-height: 1;
  margin-bottom: 4px;
}
.yhm3-hero-stat-lbl {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-weight: 600;
}

.yhm3-search-panel {
  background: var(--hm-surface);
  border-radius: 18px;
  padding: 22px 22px;
  box-shadow: 0 28px 60px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 2;
}
.yhm3-search-head {
  margin-bottom: 16px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--hm-border);
}
.yhm3-search-title {
  font-family: "Syne", sans-serif;
  font-weight: 800;
  font-size: 1rem;
  color: var(--hm-ink);
  letter-spacing: -0.3px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.yhm3-search-title::before {
  content: "🔍";
  font-size: 1.1rem;
}
.yhm3-search-sub {
  font-size: 0.75rem;
  color: var(--hm-gray);
  margin: 0;
}
.yhm3-search-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 8px;
}
.yhm3-search-input,
.yhm3-search-select {
  width: 100%;
  padding: 10px 12px;
  border-radius: 9px;
  border: 1.5px solid var(--hm-border);
  background: var(--hm-surface2);
  color: var(--hm-ink);
  font-family: "DM Sans", sans-serif;
  font-size: 0.84rem;
  outline: none;
  transition: border-color 0.15s;
}
.yhm3-search-input:focus,
.yhm3-search-select:focus {
  border-color: var(--hm-green);
  background: var(--hm-surface);
}
.yhm3-search-cta {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, var(--hm-green), var(--hm-green-deep));
  color: #fff;
  border: none;
  border-radius: 11px;
  font-family: "Syne", sans-serif;
  font-weight: 800;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 8px;
  letter-spacing: -0.2px;
}
.yhm3-search-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(26, 107, 58, 0.35);
}
.yhm3-search-trends {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 14px;
  align-items: center;
}
.yhm3-search-trends-lbl {
  font-size: 0.68rem;
  color: var(--hm-gray);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-right: 4px;
}
.yhm3-search-tag {
  background: var(--hm-surface2);
  border: 1px solid var(--hm-border);
  color: var(--hm-ink);
  padding: 4px 10px;
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}
.yhm3-search-tag:hover {
  background: var(--hm-green-pale);
  border-color: var(--hm-green);
  color: var(--hm-green);
}
.yhm3-search-perks {
  margin: 14px 0 0;
  padding-top: 14px;
  border-top: 1px dashed var(--hm-border);
  list-style: none;
}
.yhm3-search-perks li {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  font-size: 0.74rem;
  color: var(--hm-gray);
  padding: 4px 0;
  line-height: 1.5;
}
.yhm3-search-perks li::before {
  content: "✓";
  color: var(--hm-green);
  font-weight: 800;
  flex-shrink: 0;
}
.yhm3-search-perks strong {
  color: var(--hm-ink);
  font-weight: 700;
}
.yhm3-search-perks button {
  background: none;
  border: none;
  color: var(--hm-green);
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  padding: 0;
  text-decoration: underline;
}

.yhm3-section {
  max-width: 1200px;
  margin: 0 auto 56px;
  padding: 0 24px;
}
.yhm3-section--tinted {
  background: var(--hm-surface2);
  padding: 56px 24px;
  margin: 0 auto 56px;
  border-radius: 24px;
  max-width: 1248px;
}
.yhm3-section-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}
.yhm3-section-head--center {
  text-align: center;
  flex-direction: column;
  align-items: center;
  max-width: 720px;
  margin: 0 auto 36px;
}
.yhm3-eyebrow-light {
  display: inline-block;
  background: var(--hm-surface2);
  color: var(--hm-green);
  border: 1px solid var(--hm-border);
  padding: 5px 12px;
  border-radius: 50px;
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.yhm3-h2 {
  font-family: "Syne", sans-serif;
  font-size: clamp(1.5rem, 3.5vw, 2.1rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -1px;
  color: var(--hm-ink);
  margin-bottom: 8px;
}
.yhm3-h2--center {
  text-align: center;
}
.yhm3-h2 em {
  font-style: normal;
  color: var(--hm-green);
}
.yhm3-h2--on-dark {
  color: #fff;
}
.yhm3-h2--on-dark em {
  background: linear-gradient(135deg, #fcd116, #f59e0b);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.yhm3-lead {
  font-size: 0.95rem;
  color: var(--hm-gray);
  line-height: 1.65;
  max-width: 600px;
}
.yhm3-lead--center {
  margin: 0 auto;
}
.yhm3-section-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: "Syne", sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--hm-green);
  cursor: pointer;
  transition: gap 0.2s;
  background: none;
  border: none;
  padding: 0;
}
.yhm3-section-link:hover {
  gap: 9px;
}

.yhm3-cats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
}
.yhm3-cat-card {
  background: var(--hm-surface);
  border: 1.5px solid var(--hm-border);
  border-radius: 14px;
  padding: 22px 18px;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s;
  position: relative;
  overflow: hidden;
}
.yhm3-cat-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--cat-color, var(--hm-green));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s;
}
.yhm3-cat-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--hm-shadow-hover);
  border-color: var(--cat-color, var(--hm-green));
}
.yhm3-cat-card:hover::before {
  transform: scaleX(1);
}
.yhm3-cat-icon {
  font-size: 2.4rem;
  margin-bottom: 10px;
  display: inline-block;
  transition: transform 0.3s;
}
.yhm3-cat-card:hover .yhm3-cat-icon {
  transform: scale(1.15) rotate(-5deg);
}
.yhm3-cat-label {
  font-family: "Syne", sans-serif;
  font-size: 1rem;
  font-weight: 800;
  color: var(--hm-ink);
  margin-bottom: 4px;
  letter-spacing: -0.2px;
}
.yhm3-cat-desc {
  font-size: 0.72rem;
  color: var(--hm-gray);
  line-height: 1.4;
}

.yhm3-kpis {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.yhm3-kpi {
  background: var(--hm-surface);
  border: 1.5px solid var(--hm-border);
  border-radius: 16px;
  padding: 24px 22px;
  text-align: center;
  transition: all 0.25s;
  position: relative;
  overflow: hidden;
}
.yhm3-kpi::after {
  content: "";
  position: absolute;
  bottom: -40px;
  right: -40px;
  width: 110px;
  height: 110px;
  background: radial-gradient(circle, var(--kpi-color), transparent 65%);
  opacity: 0.12;
  pointer-events: none;
}
.yhm3-kpi:hover {
  transform: translateY(-4px);
  box-shadow: var(--hm-shadow);
  border-color: var(--kpi-color);
}
.yhm3-kpi-icon {
  font-size: 2rem;
  margin-bottom: 8px;
  display: inline-block;
  position: relative;
  z-index: 2;
}
.yhm3-kpi-val {
  font-family: "Syne", sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: var(--kpi-color);
  letter-spacing: -1px;
  line-height: 1;
  margin-bottom: 6px;
  position: relative;
  z-index: 2;
}
.yhm3-kpi-lbl {
  font-size: 0.78rem;
  color: var(--hm-gray);
  font-weight: 600;
  letter-spacing: 0.02em;
  position: relative;
  z-index: 2;
}

.yhm3-flash-banner {
  background: linear-gradient(135deg, #fff9e6 0%, #fff3c4 100%);
  border: 2px solid var(--hm-yellow);
  border-radius: 16px;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 22px;
  flex-wrap: wrap;
  position: relative;
  overflow: hidden;
}
.yhm3-flash-banner::before {
  content: "⚡";
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  font-size: 8rem;
  opacity: 0.07;
  pointer-events: none;
}
.yhm3-flash-banner-left {
  position: relative;
  z-index: 2;
}
.yhm3-flash-title {
  font-family: "Syne", sans-serif;
  font-weight: 800;
  font-size: 1.15rem;
  color: var(--hm-ink);
  letter-spacing: -0.4px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 7px;
}
.yhm3-flash-sub {
  font-size: 0.82rem;
  color: var(--hm-gray);
  line-height: 1.5;
}
.yhm3-flash-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: var(--hm-yellow);
  color: #0d1f14;
  padding: 4px 11px;
  border-radius: 50px;
  font-family: "Syne", sans-serif;
  font-weight: 800;
  font-size: 0.68rem;
  letter-spacing: 0.04em;
  margin-right: 10px;
}
.yhm3-flash-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  flex-wrap: wrap;
  gap: 14px;
}
.yhm3-flash-end {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: var(--hm-gray);
  font-weight: 600;
}

.yhm3-bento {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  gap: 16px;
}
.yhm3-bento-card {
  background: var(--hm-surface);
  border: 1.5px solid var(--hm-border);
  border-radius: 16px;
  padding: 26px 24px;
  cursor: pointer;
  transition: all 0.25s;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.yhm3-bento-card::after {
  content: "";
  position: absolute;
  bottom: -50px;
  right: -50px;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, var(--hm-green-pale), transparent 60%);
  opacity: 0.6;
  pointer-events: none;
  transition: opacity 0.3s;
}
.yhm3-bento-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--hm-shadow-hover);
  border-color: var(--hm-green-light);
}
.yhm3-bento-card:hover::after {
  opacity: 1;
}
.yhm3-bento-card--wide {
  grid-column: span 2;
  background: linear-gradient(135deg, #0a1410 0%, #1a3a24 100%);
  color: #fff;
  border-color: transparent;
}
.yhm3-bento-card--wide::after {
  background: radial-gradient(circle, rgba(252, 209, 22, 0.2), transparent 60%);
  opacity: 1;
}
.yhm3-bento-card--wide:hover {
  border-color: rgba(252, 209, 22, 0.3);
}
.yhm3-bento-icon {
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, var(--hm-green-pale), #fff9e6);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  margin-bottom: 14px;
  position: relative;
  z-index: 2;
  transition: transform 0.3s;
}
.yhm3-bento-card--wide .yhm3-bento-icon {
  background: rgba(252, 209, 22, 0.15);
  border: 1px solid rgba(252, 209, 22, 0.3);
}
.yhm3-bento-card:hover .yhm3-bento-icon {
  transform: scale(1.1) rotate(-5deg);
}
.yhm3-bento-card h3 {
  font-family: "Syne", sans-serif;
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--hm-ink);
  margin-bottom: 8px;
  letter-spacing: -0.3px;
  position: relative;
  z-index: 2;
}
.yhm3-bento-card--wide h3 {
  color: #fff;
  font-size: 1.4rem;
}
.yhm3-bento-card p {
  font-size: 0.85rem;
  color: var(--hm-gray);
  line-height: 1.6;
  margin: 0 0 14px;
  flex: 1;
  position: relative;
  z-index: 2;
}
.yhm3-bento-card--wide p {
  color: rgba(255, 255, 255, 0.75);
}
.yhm3-bento-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: "Syne", sans-serif;
  font-weight: 700;
  font-size: 0.82rem;
  color: var(--hm-green);
  transition: gap 0.2s;
  position: relative;
  z-index: 2;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
.yhm3-bento-card--wide .yhm3-bento-link {
  color: var(--hm-yellow);
}
.yhm3-bento-card:hover .yhm3-bento-link {
  gap: 9px;
}

.yhm3-why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}
.yhm3-why-card {
  background: var(--hm-surface);
  border: 1px solid var(--hm-border);
  border-radius: 14px;
  padding: 24px 22px;
  text-align: center;
  transition: all 0.25s;
  position: relative;
  overflow: hidden;
}
.yhm3-why-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--hm-green), var(--hm-yellow));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s;
}
.yhm3-why-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--hm-shadow);
  border-color: var(--hm-green-light);
}
.yhm3-why-card:hover::before {
  transform: scaleX(1);
}
.yhm3-why-icon {
  width: 52px;
  height: 52px;
  margin: 0 auto 12px;
  background: linear-gradient(135deg, var(--hm-green-pale), #fff9e6);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  transition: transform 0.3s;
}
.yhm3-why-card:hover .yhm3-why-icon {
  transform: scale(1.12) rotate(-5deg);
}
.yhm3-why-card h3 {
  font-family: "Syne", sans-serif;
  font-size: 1.02rem;
  font-weight: 800;
  color: var(--hm-ink);
  margin-bottom: 6px;
  letter-spacing: -0.2px;
}
.yhm3-why-card p {
  font-size: 0.82rem;
  color: var(--hm-gray);
  line-height: 1.55;
  margin: 0;
}

.yhm3-stories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}
.yhm3-story {
  background: var(--hm-surface);
  border: 1px solid var(--hm-border);
  border-radius: 16px;
  padding: 24px 22px 20px;
  transition: all 0.25s;
  position: relative;
}
.yhm3-story::before {
  content: "\\201C";
  position: absolute;
  top: 12px;
  right: 18px;
  font-family: "Syne", sans-serif;
  font-size: 4rem;
  color: var(--hm-green-pale);
  line-height: 1;
  font-weight: 800;
}
.yhm3-story:hover {
  transform: translateY(-4px);
  box-shadow: var(--hm-shadow-hover);
  border-color: var(--hm-green-light);
}
.yhm3-story-quote {
  font-size: 0.9rem;
  color: var(--hm-ink);
  line-height: 1.65;
  margin-bottom: 16px;
  font-style: italic;
  position: relative;
  z-index: 2;
}
.yhm3-story-foot {
  display: flex;
  align-items: center;
  gap: 11px;
  padding-top: 12px;
  border-top: 1px solid var(--hm-border);
  position: relative;
  z-index: 2;
}
.yhm3-story-av {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--story-color);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Syne", sans-serif;
  font-weight: 800;
  font-size: 1rem;
  flex-shrink: 0;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}
.yhm3-story-name {
  font-family: "Syne", sans-serif;
  font-weight: 800;
  font-size: 0.9rem;
  color: var(--hm-ink);
  letter-spacing: -0.2px;
  line-height: 1.2;
}
.yhm3-story-meta {
  font-size: 0.72rem;
  color: var(--hm-gray);
  margin-top: 2px;
}

.yhm3-prest-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}
.yhm3-prest-card {
  background: var(--hm-surface);
  border: 1.5px solid var(--hm-border);
  border-radius: 14px;
  padding: 20px 20px;
  transition: all 0.25s;
}
.yhm3-prest-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--hm-shadow);
  border-color: var(--hm-green);
}
.yhm3-prest-top {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 12px;
}
.yhm3-prest-av {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--hm-green), var(--hm-green-deep));
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
}
.yhm3-prest-name {
  font-family: "Syne", sans-serif;
  font-weight: 800;
  font-size: 0.92rem;
  color: var(--hm-ink);
  letter-spacing: -0.2px;
  line-height: 1.2;
}
.yhm3-prest-meta {
  font-size: 0.73rem;
  color: var(--hm-gray);
  margin-top: 2px;
}
.yhm3-prest-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}
.yhm3-ptag {
  background: var(--hm-surface2);
  color: var(--hm-gray);
  padding: 3px 10px;
  border-radius: 50px;
  font-size: 0.68rem;
  font-weight: 600;
}
.yhm3-prest-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid var(--hm-border);
}
.yhm3-prest-price {
  font-family: "Syne", sans-serif;
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--hm-green);
  letter-spacing: -0.3px;
}
.yhm3-prest-note {
  font-size: 0.68rem;
  color: var(--hm-gray);
}
.yhm3-btn-hire {
  background: linear-gradient(135deg, var(--hm-green), var(--hm-green-deep));
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 9px;
  font-family: "Syne", sans-serif;
  font-weight: 700;
  font-size: 0.76rem;
  cursor: pointer;
  transition: all 0.2s;
}
.yhm3-btn-hire:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 18px rgba(26, 107, 58, 0.3);
}

.yhm3-nl {
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
.yhm3-nl::before {
  content: "📬";
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  font-size: 11rem;
  opacity: 0.04;
  pointer-events: none;
}
.yhm3-nl-left,
.yhm3-nl-form {
  position: relative;
  z-index: 2;
}
.yhm3-nl-perks {
  list-style: none;
  padding: 0;
  margin: 16px 0 0;
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.yhm3-nl-perks li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.85);
}
.yhm3-nl-perks li span {
  width: 24px;
  height: 24px;
  background: rgba(252, 209, 22, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
}
.yhm3-nl-lbl {
  display: block;
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.55);
  font-weight: 700;
  margin-bottom: 7px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.yhm3-nl-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}
.yhm3-nl-inp {
  flex: 1;
  min-width: 180px;
  padding: 13px 15px;
  border-radius: 11px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.25);
  color: #fff;
  font-family: "DM Sans", sans-serif;
  font-size: 0.88rem;
  outline: none;
  transition: border-color 0.15s;
}
.yhm3-nl-inp::placeholder {
  color: rgba(255, 255, 255, 0.4);
}
.yhm3-nl-inp:focus {
  border-color: var(--hm-yellow);
}
.yhm3-nl-success {
  background: rgba(252, 209, 22, 0.12);
  border: 1px solid rgba(252, 209, 22, 0.3);
  border-radius: 11px;
  padding: 14px 18px;
  color: var(--hm-yellow);
  font-weight: 700;
  font-size: 0.92rem;
  text-align: center;
}
.yhm3-nl-note {
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.5;
  margin: 0;
}

.yhm3-final {
  background: linear-gradient(135deg, #0a1410 0%, #1a3a24 100%);
  border-radius: 22px;
  padding: 48px 36px;
  color: #fff;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.yhm3-final::before {
  content: "🇨🇲";
  position: absolute;
  top: 50%;
  right: -10px;
  transform: translateY(-50%);
  font-size: 12rem;
  opacity: 0.05;
  pointer-events: none;
}
.yhm3-final::after {
  content: "🚀";
  position: absolute;
  top: 50%;
  left: -10px;
  transform: translateY(-50%);
  font-size: 11rem;
  opacity: 0.05;
  pointer-events: none;
}
.yhm3-final-inner {
  position: relative;
  z-index: 2;
  max-width: 620px;
  margin: 0 auto;
}
.yhm3-final-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 24px;
}
.yhm3-final-trust {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 24px;
  padding-top: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  list-style: none;
  padding-left: 0;
}
.yhm3-final-trust li {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

.yhm3-wa-sticky {
  position: fixed;
  bottom: 22px;
  right: 22px;
  z-index: 999;
  background: #25d366;
  color: #fff;
  padding: 12px 18px;
  border-radius: 50px;
  box-shadow: 0 12px 30px rgba(37, 211, 102, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Syne", sans-serif;
  font-weight: 800;
  font-size: 0.82rem;
  border: none;
  transition: all 0.2s;
  animation: yhm3WaWiggle 4s ease-in-out infinite;
}
@keyframes yhm3WaWiggle {
  0%,
  90%,
  100% {
    transform: rotate(0);
  }
  92% {
    transform: rotate(-3deg);
  }
  94% {
    transform: rotate(3deg);
  }
  96% {
    transform: rotate(-2deg);
  }
  98% {
    transform: rotate(2deg);
  }
}
.yhm3-wa-sticky:hover {
  transform: scale(1.05);
  box-shadow: 0 16px 38px rgba(37, 211, 102, 0.5);
}

.yhm3-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 60px 20px;
  color: var(--hm-gray);
}
.yhm3-spinner {
  width: 22px;
  height: 22px;
  border: 3px solid var(--hm-border);
  border-top-color: var(--hm-green);
  border-radius: 50%;
  animation: yhm3Spin 0.7s linear infinite;
}
@keyframes yhm3Spin {
  to {
    transform: rotate(360deg);
  }
}
.yhm3-empty {
  text-align: center;
  padding: 50px 20px;
  background: var(--hm-surface);
  border: 1.5px dashed var(--hm-border);
  border-radius: 14px;
}
.yhm3-empty-ico {
  font-size: 3rem;
  margin-bottom: 10px;
  opacity: 0.55;
}
.yhm3-empty p {
  color: var(--hm-gray);
  font-size: 0.88rem;
  line-height: 1.65;
  margin: 0;
}

@media (max-width: 960px) {
  .yhm3-hero {
    padding: 40px 18px 56px;
  }
  .yhm3-hero-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .yhm3-hero-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .yhm3-cats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .yhm3-kpis {
    grid-template-columns: repeat(2, 1fr);
  }
  .yhm3-bento {
    grid-template-columns: repeat(2, 1fr);
  }
  .yhm3-bento-card--wide {
    grid-column: span 2;
  }
  .yhm3-nl {
    grid-template-columns: 1fr;
    gap: 22px;
    padding: 30px 22px;
  }
  .yhm3-final {
    padding: 36px 22px;
  }
  .yhm3-section--tinted {
    padding: 40px 18px;
  }
}
@media (max-width: 500px) {
  .yhm3-hero {
    padding: 30px 16px 46px;
  }
  .yhm3-h1 {
    font-size: 1.9rem;
    letter-spacing: -1px;
  }
  .yhm3-cats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .yhm3-kpis {
    grid-template-columns: 1fr 1fr;
  }
  .yhm3-bento {
    grid-template-columns: 1fr;
  }
  .yhm3-bento-card--wide {
    grid-column: span 1;
  }
  .yhm3-search-row {
    grid-template-columns: 1fr;
  }
  .yhm3-hero-ctas {
    flex-direction: column;
  }
  .yhm3-btn {
    width: 100%;
    text-align: center;
  }
  .yhm3-section,
  .yhm3-section--tinted {
    padding-left: 16px;
    padding-right: 16px;
  }
  .yhm3-nl-row {
    flex-direction: column;
  }
  .yhm3-flash-banner {
    padding: 16px 18px;
  }
  .yhm3-flash-banner::before {
    font-size: 6rem;
    right: -10px;
  }
  .yhm3-wa-sticky {
    bottom: 16px;
    right: 16px;
    padding: 11px 16px;
    font-size: 0.78rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .yhm3-marquee-track {
    animation: none !important;
  }
  .yhm3-eyebrow-dot {
    animation: none !important;
  }
  .yhm3-wa-sticky {
    animation: none !important;
  }
  .yhm3-spinner {
    animation: none !important;
  }
}

@media (max-width: 768px) {
  .yorix-home-v3 .yhm3-wa-sticky {
    display: none !important;
  }
}
`,W=[{key:"produits",label:"Produits",icon:"🛍️",desc:"Catalogue vérifié",color:"#1a6b3a"},{key:"prestataires",label:"Services",icon:"🛠️",desc:"Pros & freelances",color:"#f59e0b"},{key:"livraison",label:"Livraison",icon:"🚚",desc:"Yorix Ride · suivi",color:"#0891b2"},{key:"business",label:"Business",icon:"💼",desc:"B2B & croissance",color:"#7c3aed"},{key:"academy",label:"Academy",icon:"🎓",desc:"Monter en compétence",color:"#dc2626"}],F=[{key:"produits",icon:"🛍️",title:"Marketplace produits",desc:"Découverte fluide, panier universel, checkout sécurisé — comme les grandes marketplaces africaines.",wide:!0},{key:"prestataires",icon:"🛠️",title:"Services & talents",desc:"Réservez des pros vérifiés : beauté, tech, BTP… expérience marketplace de services."},{key:"livraison",icon:"🚚",title:"Livraison & logistique",desc:"Suivi, zones prioritaires Douala · Yaoundé, objectifs clairs comme une app de delivery moderne."},{key:"business",icon:"💼",title:"Yorix Business",desc:"Outils et crédibilité pour VSE, corners digitaux et partenaires B2B."},{key:"academy",icon:"🎓",title:"Yorix Academy",desc:"Former vos équipes et vos clients aux bonnes pratiques e-commerce & logistique."}],D=[{icon:"🚀",title:"Vitesse & clarté",desc:"Moins de friction entre l'intention et le paiement — tunnel optimisé mobile."},{icon:"🌍",title:"Local first",desc:"Conçu au Cameroun pour les usages MoMo, WhatsApp et la logistique réelle."},{icon:"🎯",title:"Multi-canal",desc:"Achat catalogue, réservation pros, livraison, business & formation — tout-en-un."},{icon:"💬",title:"Humain accessible",desc:"Support WhatsApp 7j/7 quand il faut trancher vite."}],B=[{val:"10+",lbl:"Villes & hubs",color:"#1a6b3a",icon:"🏙️"},{val:"24/7",lbl:"Support WhatsApp",color:"#f59e0b",icon:"💬"},{val:"100%",lbl:"Mobile money ready",color:"#0891b2",icon:"📱"},{val:"5%",lbl:"Commission plateforme",color:"#7c3aed",icon:"💎"}],O=[{quote:"Enfin une plateforme camerounaise qui ressemble aux géants — mais avec le sens du détail local.",author:"Acheteur vérifié",meta:"Douala · High-tech",avatar:"A",color:"#1a6b3a"},{quote:"Paiement MoMo fluide, escrow rassurant. Je recommande à mes clients de passer par Yorix.",author:"Vendeur pro",meta:"Mode & accessoires",avatar:"V",color:"#f59e0b"},{quote:"Les prestataires sont notés, la prise de contact est simple. Parfait pour nos urgences à Yaoundé.",author:"PME & services",meta:"Yaoundé",avatar:"P",color:"#7c3aed"}],N=[{i:"🚚",t:"Livraison prioritaire"},{i:"📱",t:"Mobile money intégré"},{i:"🔐",t:"Escrow protection"},{i:"💬",t:"Support WhatsApp 7j/7"},{i:"🇨🇲",t:"100% Cameroun"}];function G({filterCat:l,setFilterCat:t,search:p,setSearch:m,produitsLoading:c,produits:o,user:i,userData:s,wishlist:g,addToCart:f,toggleWish:u,openProductUrl:b,setOnboardingOpen:v,goPage:a,allServices:j,nlEmail:h,setNlEmail:z,nlSent:S,setNlSent:C,freeShippingThresholdXaf:M=5e4}){const[x,q]=d.useState(""),Y=d.useCallback(()=>{const e=I.find(r=>r.name===x);if(e){a("seoCity",{citySlug:e.slug,mode:"acheter"});return}a("produits")},[a,x]),w=Number(M)||5e4,A=async()=>{const e=h==null?void 0:h.trim();if(!(!e||!e.includes("@"))){try{const{error:r}=await T.from("newsletter").insert({email:e});r&&console.warn(r.message)}catch(r){console.warn(r==null?void 0:r.message)}C(!0)}};return n.jsxs(n.Fragment,{children:[n.jsx("style",{children:L}),n.jsxs("div",{className:"yx-promo-banner",role:"region","aria-label":"Offre limitée",children:[n.jsx("span",{className:"yx-promo-icon","aria-hidden":!0,children:"🎁"}),n.jsxs("span",{children:["Livraison ",n.jsx("strong",{children:"OFFERTE"})," dès ",w.toLocaleString("fr-FR")," FCFA · stocks limités"]}),n.jsx("button",{type:"button",className:"yx-promo-cta",onClick:()=>a("bonsPlans"),children:"J'en profite"})]}),n.jsxs("div",{className:"home-premium yorix-home-v3 anim",children:[n.jsx("div",{className:"yhm3-marquee",role:"region","aria-label":"Avantages Yorix",children:n.jsx("div",{className:"yhm3-marquee-track",children:[...N,...N].map((e,r)=>n.jsxs("span",{className:"yhm3-marquee-item",children:[n.jsx("span",{"aria-hidden":!0,children:e.i})," ",e.t]},`${e.t}-${r}`))})}),n.jsx("header",{className:"yhm3-hero",children:n.jsx("div",{className:"yhm3-hero-inner",children:n.jsxs("div",{className:"yhm3-hero-grid",children:[n.jsxs("div",{children:[n.jsxs("span",{className:"yhm3-eyebrow",children:[n.jsx("span",{className:"yhm3-eyebrow-dot"})," 🇨🇲 Super-app commerce · Cameroun"]}),n.jsxs("h1",{className:"yhm3-h1",children:["Le marché numérique",n.jsx("br",{}),"qui ",n.jsx("em",{children:"accélère"}),n.jsx("br",{}),"votre business"]}),n.jsxs("p",{className:"yhm3-sub",children:["Produits, freelances, livraison et formation — ",n.jsx("strong",{children:"un seul écosystème premium"}),". Conçu pour la confiance, pensé pour la conversion, ancré au Cameroun."]}),n.jsxs("div",{className:"yhm3-hero-ctas",children:[n.jsx("button",{type:"button",className:"yhm3-btn yhm3-btn--pri",onClick:()=>v(!0),children:"🚀 Démarrer · 30 s"}),n.jsx("button",{type:"button",className:"yhm3-btn yhm3-btn--sec",onClick:()=>a("produits"),children:"Parcourir le catalogue"})]}),n.jsxs("ul",{className:"yhm3-hero-trust",children:[n.jsxs("li",{children:[n.jsx("span",{"aria-hidden":!0,children:"⭐"})," Avis transparents"]}),n.jsxs("li",{children:[n.jsx("span",{"aria-hidden":!0,children:"🛡️"})," Paiements sécurisés"]}),n.jsxs("li",{children:[n.jsx("span",{"aria-hidden":!0,children:"📦"})," Vendeurs actifs"]})]}),n.jsxs("div",{className:"yhm3-hero-stats",children:[n.jsxs("div",{children:[n.jsx("div",{className:"yhm3-hero-stat-val",children:"10+"}),n.jsx("div",{className:"yhm3-hero-stat-lbl",children:"Villes"})]}),n.jsxs("div",{children:[n.jsx("div",{className:"yhm3-hero-stat-val",children:"24/7"}),n.jsx("div",{className:"yhm3-hero-stat-lbl",children:"Support"})]}),n.jsxs("div",{children:[n.jsx("div",{className:"yhm3-hero-stat-val",children:"100%"}),n.jsx("div",{className:"yhm3-hero-stat-lbl",children:"Mobile money"})]}),n.jsxs("div",{children:[n.jsx("div",{className:"yhm3-hero-stat-val",children:"1"}),n.jsx("div",{className:"yhm3-hero-stat-lbl",children:"Écosystème"})]})]})]}),n.jsxs("aside",{className:"yhm3-search-panel","aria-label":"Recherche rapide",children:[n.jsxs("div",{className:"yhm3-search-head",children:[n.jsx("div",{className:"yhm3-search-title",children:"Trouver en quelques secondes"}),n.jsx("p",{className:"yhm3-search-sub",children:"Filtres synchronisés avec le catalogue."})]}),n.jsxs("div",{className:"yhm3-search-row",children:[n.jsxs("select",{className:"yhm3-search-select",value:l,onChange:e=>t(e.target.value),"aria-label":"Catégorie",children:[n.jsx("option",{value:"",children:"Toutes catégories"}),R.map(e=>n.jsx("option",{value:e,children:e},e))]}),n.jsx("input",{className:"yhm3-search-input",placeholder:"Produit, marque, mot-clé…",value:p,onChange:e=>m(e.target.value),"aria-label":"Recherche"})]}),n.jsxs("div",{className:"yhm3-search-row",children:[n.jsxs("select",{className:"yhm3-search-select",value:x,onChange:e=>q(e.target.value),"aria-label":"Ville",children:[n.jsx("option",{value:"",children:"Toutes les villes"}),E.filter(e=>!/^toutes/i.test(e)).map(e=>n.jsx("option",{value:e,children:e},e))]}),n.jsx("input",{className:"yhm3-search-input",placeholder:"Budget max (FCFA)",readOnly:!0,tabIndex:-1,style:{opacity:.65}})]}),n.jsx("button",{type:"button",className:"yhm3-search-cta",onClick:Y,children:"🔍 Lancer la recherche"}),n.jsxs("div",{className:"yhm3-search-trends",children:[n.jsx("span",{className:"yhm3-search-trends-lbl",children:"Tendances"}),["Pagne wax","iPhone","Karité","BTP"].map(e=>n.jsx("button",{type:"button",className:"yhm3-search-tag",onClick:()=>{m(e),a("produits")},children:e},e))]}),n.jsxs("ul",{className:"yhm3-search-perks",children:[n.jsxs("li",{children:["Livraison offerte dès ",n.jsxs("strong",{children:[w.toLocaleString("fr-FR")," FCFA"]})," ·"," ",n.jsx("button",{type:"button",onClick:()=>a("bonsPlans"),children:"Détails offre"})]}),n.jsx("li",{children:"Commission plateforme jamais affichée au client final."})]})]})]})})}),n.jsxs("section",{className:"yhm3-section",children:[n.jsxs("div",{className:"yhm3-section-head yhm3-section-head--center",children:[n.jsx("span",{className:"yhm3-eyebrow-light",children:"Accès rapides"}),n.jsxs("h2",{className:"yhm3-h2 yhm3-h2--center",children:["Tout ce dont vous avez ",n.jsx("em",{children:"besoin"})]}),n.jsx("p",{className:"yhm3-lead yhm3-lead--center",children:"5 univers pour acheter, vendre, livrer, apprendre et faire grandir votre activité au Cameroun."})]}),n.jsx("div",{className:"yhm3-cats-grid",children:W.map(e=>n.jsxs("button",{type:"button",className:"yhm3-cat-card",style:{"--cat-color":e.color},onClick:()=>a(e.key),children:[n.jsx("div",{className:"yhm3-cat-icon",children:e.icon}),n.jsx("div",{className:"yhm3-cat-label",children:e.label}),n.jsx("div",{className:"yhm3-cat-desc",children:e.desc})]},e.key))})]}),n.jsxs("section",{className:"yhm3-section--tinted",children:[n.jsxs("div",{className:"yhm3-section-head yhm3-section-head--center",children:[n.jsx("span",{className:"yhm3-eyebrow-light",children:"Statistiques Yorix"}),n.jsxs("h2",{className:"yhm3-h2 yhm3-h2--center",children:["La plateforme commerce du ",n.jsx("em",{children:"Cameroun"})]}),n.jsx("p",{className:"yhm3-lead yhm3-lead--center",children:"Une infrastructure pensée pour la réalité locale et les ambitions internationales."})]}),n.jsx("div",{className:"yhm3-kpis",children:B.map(e=>n.jsxs("article",{className:"yhm3-kpi",style:{"--kpi-color":e.color},children:[n.jsx("div",{className:"yhm3-kpi-icon",children:e.icon}),n.jsx("div",{className:"yhm3-kpi-val",children:e.val}),n.jsx("div",{className:"yhm3-kpi-lbl",children:e.lbl})]},e.lbl))})]}),n.jsxs("section",{className:"yhm3-section",children:[n.jsxs("div",{className:"yhm3-flash-toolbar",children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"},children:[n.jsx("span",{className:"yhm3-flash-pill",children:"⚡ Temps limité"}),n.jsxs("h2",{className:"yhm3-h2",style:{marginBottom:0,fontSize:"1.5rem"},children:["Offres flash du ",n.jsx("em",{children:"jour"})]})]}),n.jsxs("div",{className:"yhm3-flash-end",children:[n.jsx("span",{children:"Fin dans"}),n.jsx(P,{})]})]}),n.jsxs("div",{className:"yhm3-flash-banner",children:[n.jsxs("div",{className:"yhm3-flash-banner-left",children:[n.jsx("div",{className:"yhm3-flash-title",children:"⚡ Sélection éclair · high-tech & lifestyle"}),n.jsx("div",{className:"yhm3-flash-sub",children:"Paiement MoMo / Orange · stocks limités selon vendeurs partenaires"})]}),n.jsx("button",{type:"button",className:"yhm3-btn yhm3-btn--green",onClick:()=>{t("Téléphones & HighTech"),a("produits")},children:"Voir les promos →"})]}),!c&&o.length>0&&n.jsx(k,{prods:o.slice(0,4).map((e,r)=>({...e,flash:r<2,promo:r>=2&&r<4,promo_pct:r===2?20:r===3?15:0})),user:i,userData:s,onAddToCart:f,onWish:u,wishlist:g,onOpenProductUrl:b})]}),n.jsxs("section",{className:"yhm3-section",children:[n.jsxs("div",{className:"yhm3-section-head",children:[n.jsxs("div",{children:[n.jsx("span",{className:"yhm3-eyebrow-light",children:"Catalogue"}),n.jsxs("h2",{className:"yhm3-h2",children:["Produits du ",n.jsx("em",{children:"moment"})]}),n.jsx("p",{className:"yhm3-lead",children:"Une sélection mise à jour quotidiennement par nos vendeurs."})]}),n.jsxs("button",{type:"button",className:"yhm3-section-link",onClick:()=>a("produits"),children:["Tout voir ",n.jsx("span",{children:"→"})]})]}),c?n.jsxs("div",{className:"yhm3-loading",children:[n.jsx("div",{className:"yhm3-spinner"}),"Chargement du marché…"]}):o.length===0?n.jsxs("div",{className:"yhm3-empty",children:[n.jsx("div",{className:"yhm3-empty-ico",children:"🛍️"}),n.jsx("p",{children:"Le catalogue se remplit — revenez très vite."})]}):n.jsx(k,{prods:o.slice(0,10),user:i,userData:s,onAddToCart:f,onWish:u,wishlist:g,onOpenProductUrl:b})]}),n.jsxs("section",{className:"yhm3-section--tinted",children:[n.jsxs("div",{className:"yhm3-section-head yhm3-section-head--center",children:[n.jsx("span",{className:"yhm3-eyebrow-light",children:"Écosystème Yorix"}),n.jsxs("h2",{className:"yhm3-h2 yhm3-h2--center",children:["Une plateforme, tous vos ",n.jsx("em",{children:"flux de revenus"})]}),n.jsx("p",{className:"yhm3-lead yhm3-lead--center",children:"Inspiré des leaders mondiaux — adapté au réel du Cameroun francophone."})]}),n.jsx("div",{className:"yhm3-bento",children:F.map(e=>n.jsxs("article",{className:`yhm3-bento-card${e.wide?" yhm3-bento-card--wide":""}`,onClick:()=>a(e.key),role:"link",tabIndex:0,onKeyDown:r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),a(e.key))},children:[n.jsx("div",{className:"yhm3-bento-icon",children:e.icon}),n.jsx("h3",{children:e.title}),n.jsx("p",{children:e.desc}),n.jsxs("span",{className:"yhm3-bento-link",children:["Explorer ",n.jsx("span",{children:"→"})]})]},e.key))})]}),n.jsxs("section",{className:"yhm3-section",children:[n.jsxs("div",{className:"yhm3-section-head yhm3-section-head--center",children:[n.jsx("span",{className:"yhm3-eyebrow-light",children:"Différenciation Yorix"}),n.jsxs("h2",{className:"yhm3-h2 yhm3-h2--center",children:["Une expérience premium, ",n.jsx("em",{children:"pensée conversion"})]}),n.jsx("p",{className:"yhm3-lead yhm3-lead--center",children:"Clarté des prix · Parcours mobile irréprochable · Réassurance à chaque étape."})]}),n.jsx("div",{className:"yhm3-why-grid",children:D.map(e=>n.jsxs("article",{className:"yhm3-why-card",children:[n.jsx("div",{className:"yhm3-why-icon",children:e.icon}),n.jsx("h3",{children:e.title}),n.jsx("p",{children:e.desc})]},e.title))})]}),n.jsxs("section",{className:"yhm3-section",children:[n.jsxs("div",{className:"yhm3-section-head yhm3-section-head--center",children:[n.jsx("span",{className:"yhm3-eyebrow-light",children:"Témoignages"}),n.jsxs("h2",{className:"yhm3-h2 yhm3-h2--center",children:["Ils ",n.jsx("em",{children:"nous font confiance"})]}),n.jsx("p",{className:"yhm3-lead yhm3-lead--center",children:"Acheteurs, vendeurs, professionnels — la communauté Yorix grandit chaque jour."})]}),n.jsx("div",{className:"yhm3-stories",children:O.map(e=>n.jsxs("figure",{className:"yhm3-story",style:{"--story-color":e.color},children:[n.jsxs("blockquote",{className:"yhm3-story-quote",children:["“",e.quote,"”"]}),n.jsxs("figcaption",{className:"yhm3-story-foot",children:[n.jsx("div",{className:"yhm3-story-av",children:e.avatar}),n.jsxs("div",{children:[n.jsx("div",{className:"yhm3-story-name",children:e.author}),n.jsx("div",{className:"yhm3-story-meta",children:e.meta})]})]})]},e.author))})]}),n.jsxs("section",{className:"yhm3-section",children:[n.jsxs("div",{className:"yhm3-section-head",children:[n.jsxs("div",{children:[n.jsx("span",{className:"yhm3-eyebrow-light",children:"Prestataires"}),n.jsxs("h2",{className:"yhm3-h2",children:["Prestataires ",n.jsx("em",{children:"sélectionnés"})]}),n.jsx("p",{className:"yhm3-lead",children:"Des talents camerounais vérifiés pour vos besoins du quotidien."})]}),n.jsxs("button",{type:"button",className:"yhm3-section-link",onClick:()=>a("prestataires"),children:["Marketplace services ",n.jsx("span",{children:"→"})]})]}),n.jsx("div",{className:"yhm3-prest-grid",children:j.length===0?n.jsxs("div",{className:"yhm3-empty",style:{gridColumn:"1/-1"},children:[n.jsx("div",{className:"yhm3-empty-ico",children:"🛠️"}),n.jsx("p",{children:"Les talents arrivent — explorez bientôt la vitrine services."})]}):j.slice(0,3).map(e=>n.jsxs("article",{className:"yhm3-prest-card",children:[n.jsxs("div",{className:"yhm3-prest-top",children:[n.jsx("div",{className:"yhm3-prest-av",children:"🧑‍💼"}),n.jsxs("div",{children:[n.jsx("div",{className:"yhm3-prest-name",children:e.provider_nom||"Prestataire"}),n.jsx("div",{className:"yhm3-prest-meta",children:e.nom})]})]}),n.jsxs("div",{className:"yhm3-prest-tags",children:[e.categorie&&n.jsx("span",{className:"yhm3-ptag",children:e.categorie}),e.ville&&n.jsxs("span",{className:"yhm3-ptag",children:["📍 ",e.ville]})]}),n.jsxs("div",{className:"yhm3-prest-foot",children:[n.jsxs("div",{children:[n.jsxs("div",{className:"yhm3-prest-price",children:[Number(e.prix).toLocaleString()," F"]}),n.jsxs("div",{className:"yhm3-prest-note",children:["⭐ ",e.note||0," · ",e.nombre_avis||0," avis"]})]}),n.jsx("button",{type:"button",className:"yhm3-btn-hire",onClick:()=>window.open(`https://wa.me/${y}?text=${encodeURIComponent(`Bonjour Yorix ! Projet : ${e.nom} (${e.provider_nom})`)}`,"_blank","noopener,noreferrer"),children:"Contacter"})]})]},e.id))})]}),n.jsx("section",{className:"yhm3-section",children:n.jsxs("div",{className:"yhm3-nl",children:[n.jsxs("div",{className:"yhm3-nl-left",children:[n.jsxs("span",{className:"yhm3-eyebrow",children:[n.jsx("span",{className:"yhm3-eyebrow-dot"})," Newsletter Yorix"]}),n.jsxs("h2",{className:"yhm3-h2 yhm3-h2--on-dark",children:["Restez dans la ",n.jsx("em",{children:"momentum Yorix"})]}),n.jsxs("p",{className:"yhm3-sub",style:{color:"rgba(255,255,255,.78)"},children:["Alertes bons plans, nouveaux hubs villes et masterclass Academy —",n.jsx("strong",{style:{color:"#fff"},children:" sans spam"}),"."]}),n.jsxs("ul",{className:"yhm3-nl-perks",children:[n.jsxs("li",{children:[n.jsx("span",{"aria-hidden":!0,children:"🎁"})," Bons plans exclusifs"]}),n.jsxs("li",{children:[n.jsx("span",{"aria-hidden":!0,children:"📍"})," Nouveaux hubs villes"]}),n.jsxs("li",{children:[n.jsx("span",{"aria-hidden":!0,children:"🎓"})," Masterclass Academy"]})]})]}),n.jsx("form",{className:"yhm3-nl-form",onSubmit:e=>{e.preventDefault(),A()},noValidate:!0,children:S?n.jsx("div",{className:"yhm3-nl-success",children:"🎉 Merci ! Vous êtes inscrit(e)."}):n.jsxs(n.Fragment,{children:[n.jsx("label",{htmlFor:"yhm3-nl-email",className:"yhm3-nl-lbl",children:"VOTRE MEILLEUR EMAIL"}),n.jsxs("div",{className:"yhm3-nl-row",children:[n.jsx("input",{id:"yhm3-nl-email",type:"email",className:"yhm3-nl-inp",placeholder:"vous@email.cm",value:h,onChange:e=>z(e.target.value),autoComplete:"email",required:!0}),n.jsx("button",{type:"submit",className:"yhm3-btn yhm3-btn--pri",children:"Rejoindre 🚀"})]}),n.jsx("p",{className:"yhm3-nl-note",children:"🔒 RGPD · désinscription en un clic depuis chaque envoi."})]})})]})}),n.jsx("section",{className:"yhm3-section",children:n.jsx("div",{className:"yhm3-final",children:n.jsxs("div",{className:"yhm3-final-inner",children:[n.jsxs("span",{className:"yhm3-eyebrow",children:[n.jsx("span",{className:"yhm3-eyebrow-dot"})," Prêt à commencer ?"]}),n.jsxs("h2",{className:"yhm3-h2 yhm3-h2--on-dark",children:["Rejoignez la marketplace",n.jsx("br",{}),"du ",n.jsx("em",{children:"Cameroun moderne"})]}),n.jsxs("p",{className:"yhm3-sub",style:{color:"rgba(255,255,255,.78)"},children:[n.jsx("strong",{style:{color:"#fff"},children:"Inscription gratuite"})," · paiement MoMo & Orange Money · support WhatsApp 7j/7. Commencez à acheter, vendre ou prester en moins de 30 secondes."]}),n.jsxs("div",{className:"yhm3-final-actions",children:[n.jsx("button",{type:"button",className:"yhm3-btn yhm3-btn--pri",onClick:()=>v(!0),children:"🚀 Démarrer maintenant"}),n.jsx("button",{type:"button",className:"yhm3-btn yhm3-btn--sec",onClick:()=>a("aide"),children:"🆘 Centre d'aide"})]}),n.jsxs("ul",{className:"yhm3-final-trust",children:[n.jsxs("li",{children:[n.jsx("span",{"aria-hidden":!0,children:"🇨🇲"})," 100% Cameroun"]}),n.jsxs("li",{children:[n.jsx("span",{"aria-hidden":!0,children:"🔐"})," Escrow inclus"]}),n.jsxs("li",{children:[n.jsx("span",{"aria-hidden":!0,children:"📱"})," Mobile money"]}),n.jsxs("li",{children:[n.jsx("span",{"aria-hidden":!0,children:"⚡"})," 30s d'inscription"]})]})]})})}),n.jsxs("button",{type:"button",className:"yhm3-wa-sticky","aria-label":"Commande WhatsApp express",onClick:()=>window.open(`https://wa.me/${y}?text=${encodeURIComponent("Bonjour Yorix ! Je veux passer commande 🛍️")}`,"_blank","noopener,noreferrer"),children:[n.jsx("span",{"aria-hidden":!0,children:"💬"})," WhatsApp express"]}),n.jsxs("div",{className:"wa-sticky",children:[n.jsx("span",{className:"wa-sticky-text",children:"Commande express"}),n.jsx("button",{type:"button",className:"wa-sticky-btn",onClick:()=>window.open(`https://wa.me/${y}?text=${encodeURIComponent("Bonjour Yorix ! Je veux passer commande 🛍️")}`,"_blank","noopener,noreferrer"),children:"WhatsApp"})]})]})]})}export{G as HomePage};
