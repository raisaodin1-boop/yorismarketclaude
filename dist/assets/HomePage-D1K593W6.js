import{j as r,S as E,C as I,a as R,Y as x,s as T}from"./index-CzvrAFS9.js";import{r as h}from"./react-DtOhX2xw.js";import{P as k}from"./ProdGrid-BnbuBnoE.js";import"./supabase-BedW8mzU.js";import"./OptimizedImage-_qbnfEYj.js";import"./ModalCommander-BLe_RCUK.js";import"./checkoutApi-Djs8is8J.js";function P(){const l=()=>{const i=new Date,s=new Date(i);return s.setHours(23,59,59,999),Math.floor((s-i)/1e3)},[t,d]=h.useState(l);h.useEffect(()=>{const i=setInterval(()=>d(s=>s>0?s-1:l()),1e3);return()=>clearInterval(i)},[]);const m=String(Math.floor(t/3600)).padStart(2,"0"),c=String(Math.floor(t%3600/60)).padStart(2,"0"),o=String(t%60).padStart(2,"0");return r.jsx("div",{style:{display:"flex",gap:4,alignItems:"center"},children:[m,c,o].map((i,s)=>r.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4},children:[r.jsx("span",{style:{background:"var(--red)",color:"#fff",padding:"2px 7px",borderRadius:5,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".82rem",minWidth:30,textAlign:"center"},children:i}),s<2&&r.jsx("span",{style:{fontWeight:800,color:"var(--red)",fontSize:".82rem"},children:":"})]},s))})}const L=`/* YORIX CM — HOMEPAGE PREMIUM v3 (scopé .yorix-home-v3 / .yhm3-*) */\r
\r
.yorix-home-v3 {\r
  --hm-green: #1a6b3a;\r
  --hm-green-deep: #0d4d28;\r
  --hm-green-pale: #e8f5e9;\r
  --hm-green-light: #86efac;\r
  --hm-yellow: #fcd116;\r
  --hm-gold: #f59e0b;\r
  --hm-ink: var(--ink, #111);\r
  --hm-gray: var(--gray, #666);\r
  --hm-surface: var(--surface, #fff);\r
  --hm-surface2: var(--surface2, #f8f8f8);\r
  --hm-border: var(--border, #e5e5e5);\r
  --hm-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);\r
  --hm-shadow-hover: 0 22px 50px rgba(0, 0, 0, 0.14);\r
\r
  font-family: "DM Sans", sans-serif;\r
  color: var(--hm-ink);\r
}\r
.yorix-home-v3 * {\r
  box-sizing: border-box;\r
}\r
\r
.yhm3-marquee {\r
  background: linear-gradient(90deg, var(--hm-green-deep), var(--hm-green), var(--hm-green-deep));\r
  color: #fff;\r
  padding: 9px 0;\r
  overflow: hidden;\r
  position: relative;\r
}\r
.yhm3-marquee-track {\r
  display: inline-flex;\r
  gap: 38px;\r
  white-space: nowrap;\r
  animation: yhm3MarqueeRoll 36s linear infinite;\r
}\r
@keyframes yhm3MarqueeRoll {\r
  from {\r
    transform: translateX(0);\r
  }\r
  to {\r
    transform: translateX(-50%);\r
  }\r
}\r
.yhm3-marquee-item {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 7px;\r
  font-size: 0.78rem;\r
  font-weight: 600;\r
  color: rgba(255, 255, 255, 0.92);\r
}\r
.yhm3-marquee-item span {\r
  font-size: 0.95rem;\r
}\r
\r
.yhm3-hero {\r
  position: relative;\r
  background: linear-gradient(135deg, #0a1410 0%, #1a3a24 45%, #0d3320 100%);\r
  color: #fff;\r
  padding: 56px 24px 70px;\r
  overflow: hidden;\r
  border-radius: 0 0 28px 28px;\r
  margin-bottom: 50px;\r
}\r
.yhm3-hero::before {\r
  content: "";\r
  position: absolute;\r
  top: -120px;\r
  right: -100px;\r
  width: 480px;\r
  height: 480px;\r
  background: radial-gradient(circle, rgba(252, 209, 22, 0.16), transparent 65%);\r
  border-radius: 50%;\r
  pointer-events: none;\r
}\r
.yhm3-hero::after {\r
  content: "";\r
  position: absolute;\r
  bottom: -150px;\r
  left: -120px;\r
  width: 460px;\r
  height: 460px;\r
  background: radial-gradient(circle, rgba(79, 209, 125, 0.12), transparent 65%);\r
  border-radius: 50%;\r
  pointer-events: none;\r
}\r
.yhm3-hero-inner {\r
  max-width: 1200px;\r
  margin: 0 auto;\r
  position: relative;\r
  z-index: 2;\r
}\r
.yhm3-hero-grid {\r
  display: grid;\r
  grid-template-columns: 1.1fr 1fr;\r
  gap: 44px;\r
  align-items: start;\r
}\r
.yhm3-eyebrow {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 7px;\r
  background: rgba(252, 209, 22, 0.14);\r
  color: var(--hm-yellow);\r
  border: 1px solid rgba(252, 209, 22, 0.32);\r
  padding: 6px 14px;\r
  border-radius: 50px;\r
  font-size: 0.7rem;\r
  font-weight: 700;\r
  margin-bottom: 18px;\r
  letter-spacing: 0.04em;\r
}\r
.yhm3-eyebrow-dot {\r
  width: 7px;\r
  height: 7px;\r
  background: var(--hm-yellow);\r
  border-radius: 50%;\r
  box-shadow: 0 0 12px var(--hm-yellow);\r
  animation: yhm3Pulse 2s ease-in-out infinite;\r
}\r
@keyframes yhm3Pulse {\r
  0%,\r
  100% {\r
    opacity: 1;\r
    transform: scale(1);\r
  }\r
  50% {\r
    opacity: 0.5;\r
    transform: scale(1.4);\r
  }\r
}\r
.yhm3-h1 {\r
  font-family: "Syne", sans-serif;\r
  font-size: clamp(2.2rem, 5.5vw, 3.4rem);\r
  font-weight: 800;\r
  line-height: 1.04;\r
  letter-spacing: -1.8px;\r
  margin-bottom: 18px;\r
}\r
.yhm3-h1 em {\r
  font-style: normal;\r
  background: linear-gradient(135deg, #fcd116, #f59e0b);\r
  -webkit-background-clip: text;\r
  background-clip: text;\r
  -webkit-text-fill-color: transparent;\r
}\r
.yhm3-sub {\r
  font-size: clamp(0.95rem, 1.5vw, 1.05rem);\r
  color: rgba(255, 255, 255, 0.78);\r
  line-height: 1.7;\r
  margin-bottom: 22px;\r
  max-width: 540px;\r
}\r
.yhm3-sub strong {\r
  color: #fff;\r
  font-weight: 700;\r
}\r
\r
.yhm3-hero-ctas {\r
  display: flex;\r
  gap: 12px;\r
  flex-wrap: wrap;\r
  margin-bottom: 24px;\r
}\r
.yhm3-btn {\r
  padding: 13px 24px;\r
  border-radius: 11px;\r
  font-family: "Syne", sans-serif;\r
  font-weight: 800;\r
  font-size: 0.88rem;\r
  cursor: pointer;\r
  transition: all 0.2s;\r
  border: none;\r
  letter-spacing: -0.2px;\r
  white-space: nowrap;\r
}\r
.yhm3-btn--pri {\r
  background: linear-gradient(135deg, var(--hm-yellow), var(--hm-gold));\r
  color: #0d1f14;\r
  box-shadow: 0 8px 22px rgba(252, 209, 22, 0.35);\r
}\r
.yhm3-btn--pri:hover {\r
  transform: translateY(-2px);\r
  box-shadow: 0 12px 28px rgba(252, 209, 22, 0.45);\r
}\r
.yhm3-btn--sec {\r
  background: rgba(255, 255, 255, 0.1);\r
  color: #fff;\r
  border: 1.5px solid rgba(255, 255, 255, 0.2);\r
  backdrop-filter: blur(10px);\r
}\r
.yhm3-btn--sec:hover {\r
  background: rgba(255, 255, 255, 0.18);\r
}\r
.yhm3-btn--green {\r
  background: linear-gradient(135deg, var(--hm-green), var(--hm-green-deep));\r
  color: #fff;\r
  box-shadow: 0 8px 22px rgba(26, 107, 58, 0.3);\r
}\r
.yhm3-btn--green:hover {\r
  transform: translateY(-2px);\r
  box-shadow: 0 12px 28px rgba(26, 107, 58, 0.4);\r
}\r
.yhm3-btn--ghost {\r
  background: transparent;\r
  color: var(--hm-ink);\r
  border: 1.5px solid var(--hm-border);\r
}\r
.yhm3-btn--ghost:hover {\r
  border-color: var(--hm-green);\r
  color: var(--hm-green);\r
  background: var(--hm-green-pale);\r
}\r
\r
.yhm3-hero-trust {\r
  display: flex;\r
  gap: 18px;\r
  flex-wrap: wrap;\r
  margin-bottom: 24px;\r
}\r
.yhm3-hero-trust li {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 5px;\r
  font-size: 0.72rem;\r
  color: rgba(255, 255, 255, 0.6);\r
  list-style: none;\r
}\r
.yhm3-hero-stats {\r
  display: grid;\r
  grid-template-columns: repeat(4, 1fr);\r
  gap: 14px;\r
  padding-top: 22px;\r
  border-top: 1px solid rgba(255, 255, 255, 0.1);\r
}\r
.yhm3-hero-stat-val {\r
  font-family: "Syne", sans-serif;\r
  font-size: 1.5rem;\r
  font-weight: 800;\r
  color: var(--hm-yellow);\r
  letter-spacing: -0.5px;\r
  line-height: 1;\r
  margin-bottom: 4px;\r
}\r
.yhm3-hero-stat-lbl {\r
  font-size: 0.65rem;\r
  color: rgba(255, 255, 255, 0.55);\r
  letter-spacing: 0.04em;\r
  text-transform: uppercase;\r
  font-weight: 600;\r
}\r
\r
.yhm3-search-panel {\r
  background: var(--hm-surface);\r
  border-radius: 18px;\r
  padding: 22px 22px;\r
  box-shadow: 0 28px 60px rgba(0, 0, 0, 0.4);\r
  border: 1px solid rgba(255, 255, 255, 0.1);\r
  position: relative;\r
  z-index: 2;\r
}\r
.yhm3-search-head {\r
  margin-bottom: 16px;\r
  padding-bottom: 14px;\r
  border-bottom: 1px solid var(--hm-border);\r
}\r
.yhm3-search-title {\r
  font-family: "Syne", sans-serif;\r
  font-weight: 800;\r
  font-size: 1rem;\r
  color: var(--hm-ink);\r
  letter-spacing: -0.3px;\r
  margin-bottom: 4px;\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
}\r
.yhm3-search-title::before {\r
  content: "🔍";\r
  font-size: 1.1rem;\r
}\r
.yhm3-search-sub {\r
  font-size: 0.75rem;\r
  color: var(--hm-gray);\r
  margin: 0;\r
}\r
.yhm3-search-row {\r
  display: grid;\r
  grid-template-columns: 1fr 1fr;\r
  gap: 8px;\r
  margin-bottom: 8px;\r
}\r
.yhm3-search-input,\r
.yhm3-search-select {\r
  width: 100%;\r
  padding: 10px 12px;\r
  border-radius: 9px;\r
  border: 1.5px solid var(--hm-border);\r
  background: var(--hm-surface2);\r
  color: var(--hm-ink);\r
  font-family: "DM Sans", sans-serif;\r
  font-size: 0.84rem;\r
  outline: none;\r
  transition: border-color 0.15s;\r
}\r
.yhm3-search-input:focus,\r
.yhm3-search-select:focus {\r
  border-color: var(--hm-green);\r
  background: var(--hm-surface);\r
}\r
.yhm3-search-cta {\r
  width: 100%;\r
  padding: 12px;\r
  background: linear-gradient(135deg, var(--hm-green), var(--hm-green-deep));\r
  color: #fff;\r
  border: none;\r
  border-radius: 11px;\r
  font-family: "Syne", sans-serif;\r
  font-weight: 800;\r
  font-size: 0.9rem;\r
  cursor: pointer;\r
  transition: all 0.2s;\r
  margin-top: 8px;\r
  letter-spacing: -0.2px;\r
}\r
.yhm3-search-cta:hover {\r
  transform: translateY(-2px);\r
  box-shadow: 0 8px 22px rgba(26, 107, 58, 0.35);\r
}\r
.yhm3-search-trends {\r
  display: flex;\r
  gap: 6px;\r
  flex-wrap: wrap;\r
  margin-top: 14px;\r
  align-items: center;\r
}\r
.yhm3-search-trends-lbl {\r
  font-size: 0.68rem;\r
  color: var(--hm-gray);\r
  font-weight: 700;\r
  letter-spacing: 0.04em;\r
  text-transform: uppercase;\r
  margin-right: 4px;\r
}\r
.yhm3-search-tag {\r
  background: var(--hm-surface2);\r
  border: 1px solid var(--hm-border);\r
  color: var(--hm-ink);\r
  padding: 4px 10px;\r
  border-radius: 50px;\r
  font-size: 0.7rem;\r
  font-weight: 600;\r
  cursor: pointer;\r
  transition: all 0.15s;\r
}\r
.yhm3-search-tag:hover {\r
  background: var(--hm-green-pale);\r
  border-color: var(--hm-green);\r
  color: var(--hm-green);\r
}\r
.yhm3-search-perks {\r
  margin: 14px 0 0;\r
  padding-top: 14px;\r
  border-top: 1px dashed var(--hm-border);\r
  list-style: none;\r
}\r
.yhm3-search-perks li {\r
  display: flex;\r
  align-items: flex-start;\r
  gap: 7px;\r
  font-size: 0.74rem;\r
  color: var(--hm-gray);\r
  padding: 4px 0;\r
  line-height: 1.5;\r
}\r
.yhm3-search-perks li::before {\r
  content: "✓";\r
  color: var(--hm-green);\r
  font-weight: 800;\r
  flex-shrink: 0;\r
}\r
.yhm3-search-perks strong {\r
  color: var(--hm-ink);\r
  font-weight: 700;\r
}\r
.yhm3-search-perks button {\r
  background: none;\r
  border: none;\r
  color: var(--hm-green);\r
  font-weight: 700;\r
  cursor: pointer;\r
  font-family: inherit;\r
  font-size: inherit;\r
  padding: 0;\r
  text-decoration: underline;\r
}\r
\r
.yhm3-section {\r
  max-width: 1200px;\r
  margin: 0 auto 56px;\r
  padding: 0 24px;\r
}\r
.yhm3-section--tinted {\r
  background: var(--hm-surface2);\r
  padding: 56px 24px;\r
  margin: 0 auto 56px;\r
  border-radius: 24px;\r
  max-width: 1248px;\r
}\r
.yhm3-section-head {\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: flex-end;\r
  gap: 24px;\r
  margin-bottom: 28px;\r
  flex-wrap: wrap;\r
}\r
.yhm3-section-head--center {\r
  text-align: center;\r
  flex-direction: column;\r
  align-items: center;\r
  max-width: 720px;\r
  margin: 0 auto 36px;\r
}\r
.yhm3-eyebrow-light {\r
  display: inline-block;\r
  background: var(--hm-surface2);\r
  color: var(--hm-green);\r
  border: 1px solid var(--hm-border);\r
  padding: 5px 12px;\r
  border-radius: 50px;\r
  font-size: 0.66rem;\r
  font-weight: 700;\r
  letter-spacing: 0.12em;\r
  text-transform: uppercase;\r
  margin-bottom: 10px;\r
}\r
.yhm3-h2 {\r
  font-family: "Syne", sans-serif;\r
  font-size: clamp(1.5rem, 3.5vw, 2.1rem);\r
  font-weight: 800;\r
  line-height: 1.15;\r
  letter-spacing: -1px;\r
  color: var(--hm-ink);\r
  margin-bottom: 8px;\r
}\r
.yhm3-h2--center {\r
  text-align: center;\r
}\r
.yhm3-h2 em {\r
  font-style: normal;\r
  color: var(--hm-green);\r
}\r
.yhm3-h2--on-dark {\r
  color: #fff;\r
}\r
.yhm3-h2--on-dark em {\r
  background: linear-gradient(135deg, #fcd116, #f59e0b);\r
  -webkit-background-clip: text;\r
  background-clip: text;\r
  -webkit-text-fill-color: transparent;\r
}\r
.yhm3-lead {\r
  font-size: 0.95rem;\r
  color: var(--hm-gray);\r
  line-height: 1.65;\r
  max-width: 600px;\r
}\r
.yhm3-lead--center {\r
  margin: 0 auto;\r
}\r
.yhm3-section-link {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 5px;\r
  font-family: "Syne", sans-serif;\r
  font-weight: 700;\r
  font-size: 0.85rem;\r
  color: var(--hm-green);\r
  cursor: pointer;\r
  transition: gap 0.2s;\r
  background: none;\r
  border: none;\r
  padding: 0;\r
}\r
.yhm3-section-link:hover {\r
  gap: 9px;\r
}\r
\r
.yhm3-cats-grid {\r
  display: grid;\r
  grid-template-columns: repeat(5, 1fr);\r
  gap: 14px;\r
}\r
.yhm3-cat-card {\r
  background: var(--hm-surface);\r
  border: 1.5px solid var(--hm-border);\r
  border-radius: 14px;\r
  padding: 22px 18px;\r
  text-align: center;\r
  cursor: pointer;\r
  transition: all 0.25s;\r
  position: relative;\r
  overflow: hidden;\r
}\r
.yhm3-cat-card::before {\r
  content: "";\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  right: 0;\r
  height: 3px;\r
  background: var(--cat-color, var(--hm-green));\r
  transform: scaleX(0);\r
  transform-origin: left;\r
  transition: transform 0.35s;\r
}\r
.yhm3-cat-card:hover {\r
  transform: translateY(-5px);\r
  box-shadow: var(--hm-shadow-hover);\r
  border-color: var(--cat-color, var(--hm-green));\r
}\r
.yhm3-cat-card:hover::before {\r
  transform: scaleX(1);\r
}\r
.yhm3-cat-icon {\r
  font-size: 2.4rem;\r
  margin-bottom: 10px;\r
  display: inline-block;\r
  transition: transform 0.3s;\r
}\r
.yhm3-cat-card:hover .yhm3-cat-icon {\r
  transform: scale(1.15) rotate(-5deg);\r
}\r
.yhm3-cat-label {\r
  font-family: "Syne", sans-serif;\r
  font-size: 1rem;\r
  font-weight: 800;\r
  color: var(--hm-ink);\r
  margin-bottom: 4px;\r
  letter-spacing: -0.2px;\r
}\r
.yhm3-cat-desc {\r
  font-size: 0.72rem;\r
  color: var(--hm-gray);\r
  line-height: 1.4;\r
}\r
\r
.yhm3-kpis {\r
  display: grid;\r
  grid-template-columns: repeat(4, 1fr);\r
  gap: 16px;\r
}\r
.yhm3-kpi {\r
  background: var(--hm-surface);\r
  border: 1.5px solid var(--hm-border);\r
  border-radius: 16px;\r
  padding: 24px 22px;\r
  text-align: center;\r
  transition: all 0.25s;\r
  position: relative;\r
  overflow: hidden;\r
}\r
.yhm3-kpi::after {\r
  content: "";\r
  position: absolute;\r
  bottom: -40px;\r
  right: -40px;\r
  width: 110px;\r
  height: 110px;\r
  background: radial-gradient(circle, var(--kpi-color), transparent 65%);\r
  opacity: 0.12;\r
  pointer-events: none;\r
}\r
.yhm3-kpi:hover {\r
  transform: translateY(-4px);\r
  box-shadow: var(--hm-shadow);\r
  border-color: var(--kpi-color);\r
}\r
.yhm3-kpi-icon {\r
  font-size: 2rem;\r
  margin-bottom: 8px;\r
  display: inline-block;\r
  position: relative;\r
  z-index: 2;\r
}\r
.yhm3-kpi-val {\r
  font-family: "Syne", sans-serif;\r
  font-size: 2rem;\r
  font-weight: 800;\r
  color: var(--kpi-color);\r
  letter-spacing: -1px;\r
  line-height: 1;\r
  margin-bottom: 6px;\r
  position: relative;\r
  z-index: 2;\r
}\r
.yhm3-kpi-lbl {\r
  font-size: 0.78rem;\r
  color: var(--hm-gray);\r
  font-weight: 600;\r
  letter-spacing: 0.02em;\r
  position: relative;\r
  z-index: 2;\r
}\r
\r
.yhm3-flash-banner {\r
  background: linear-gradient(135deg, #fff9e6 0%, #fff3c4 100%);\r
  border: 2px solid var(--hm-yellow);\r
  border-radius: 16px;\r
  padding: 20px 24px;\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: center;\r
  gap: 20px;\r
  margin-bottom: 22px;\r
  flex-wrap: wrap;\r
  position: relative;\r
  overflow: hidden;\r
}\r
.yhm3-flash-banner::before {\r
  content: "⚡";\r
  position: absolute;\r
  top: 50%;\r
  right: 30px;\r
  transform: translateY(-50%);\r
  font-size: 8rem;\r
  opacity: 0.07;\r
  pointer-events: none;\r
}\r
.yhm3-flash-banner-left {\r
  position: relative;\r
  z-index: 2;\r
}\r
.yhm3-flash-title {\r
  font-family: "Syne", sans-serif;\r
  font-weight: 800;\r
  font-size: 1.15rem;\r
  color: var(--hm-ink);\r
  letter-spacing: -0.4px;\r
  margin-bottom: 4px;\r
  display: flex;\r
  align-items: center;\r
  gap: 7px;\r
}\r
.yhm3-flash-sub {\r
  font-size: 0.82rem;\r
  color: var(--hm-gray);\r
  line-height: 1.5;\r
}\r
.yhm3-flash-pill {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 5px;\r
  background: var(--hm-yellow);\r
  color: #0d1f14;\r
  padding: 4px 11px;\r
  border-radius: 50px;\r
  font-family: "Syne", sans-serif;\r
  font-weight: 800;\r
  font-size: 0.68rem;\r
  letter-spacing: 0.04em;\r
  margin-right: 10px;\r
}\r
.yhm3-flash-toolbar {\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: center;\r
  margin-bottom: 18px;\r
  flex-wrap: wrap;\r
  gap: 14px;\r
}\r
.yhm3-flash-end {\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
  font-size: 0.8rem;\r
  color: var(--hm-gray);\r
  font-weight: 600;\r
}\r
\r
.yhm3-bento {\r
  display: grid;\r
  grid-template-columns: repeat(3, 1fr);\r
  grid-auto-rows: 1fr;\r
  gap: 16px;\r
}\r
.yhm3-bento-card {\r
  background: var(--hm-surface);\r
  border: 1.5px solid var(--hm-border);\r
  border-radius: 16px;\r
  padding: 26px 24px;\r
  cursor: pointer;\r
  transition: all 0.25s;\r
  position: relative;\r
  overflow: hidden;\r
  display: flex;\r
  flex-direction: column;\r
}\r
.yhm3-bento-card::after {\r
  content: "";\r
  position: absolute;\r
  bottom: -50px;\r
  right: -50px;\r
  width: 150px;\r
  height: 150px;\r
  background: radial-gradient(circle, var(--hm-green-pale), transparent 60%);\r
  opacity: 0.6;\r
  pointer-events: none;\r
  transition: opacity 0.3s;\r
}\r
.yhm3-bento-card:hover {\r
  transform: translateY(-5px);\r
  box-shadow: var(--hm-shadow-hover);\r
  border-color: var(--hm-green-light);\r
}\r
.yhm3-bento-card:hover::after {\r
  opacity: 1;\r
}\r
.yhm3-bento-card--wide {\r
  grid-column: span 2;\r
  background: linear-gradient(135deg, #0a1410 0%, #1a3a24 100%);\r
  color: #fff;\r
  border-color: transparent;\r
}\r
.yhm3-bento-card--wide::after {\r
  background: radial-gradient(circle, rgba(252, 209, 22, 0.2), transparent 60%);\r
  opacity: 1;\r
}\r
.yhm3-bento-card--wide:hover {\r
  border-color: rgba(252, 209, 22, 0.3);\r
}\r
.yhm3-bento-icon {\r
  width: 52px;\r
  height: 52px;\r
  background: linear-gradient(135deg, var(--hm-green-pale), #fff9e6);\r
  border-radius: 12px;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  font-size: 1.7rem;\r
  margin-bottom: 14px;\r
  position: relative;\r
  z-index: 2;\r
  transition: transform 0.3s;\r
}\r
.yhm3-bento-card--wide .yhm3-bento-icon {\r
  background: rgba(252, 209, 22, 0.15);\r
  border: 1px solid rgba(252, 209, 22, 0.3);\r
}\r
.yhm3-bento-card:hover .yhm3-bento-icon {\r
  transform: scale(1.1) rotate(-5deg);\r
}\r
.yhm3-bento-card h3 {\r
  font-family: "Syne", sans-serif;\r
  font-size: 1.15rem;\r
  font-weight: 800;\r
  color: var(--hm-ink);\r
  margin-bottom: 8px;\r
  letter-spacing: -0.3px;\r
  position: relative;\r
  z-index: 2;\r
}\r
.yhm3-bento-card--wide h3 {\r
  color: #fff;\r
  font-size: 1.4rem;\r
}\r
.yhm3-bento-card p {\r
  font-size: 0.85rem;\r
  color: var(--hm-gray);\r
  line-height: 1.6;\r
  margin: 0 0 14px;\r
  flex: 1;\r
  position: relative;\r
  z-index: 2;\r
}\r
.yhm3-bento-card--wide p {\r
  color: rgba(255, 255, 255, 0.75);\r
}\r
.yhm3-bento-link {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 4px;\r
  font-family: "Syne", sans-serif;\r
  font-weight: 700;\r
  font-size: 0.82rem;\r
  color: var(--hm-green);\r
  transition: gap 0.2s;\r
  position: relative;\r
  z-index: 2;\r
  background: none;\r
  border: none;\r
  padding: 0;\r
  cursor: pointer;\r
}\r
.yhm3-bento-card--wide .yhm3-bento-link {\r
  color: var(--hm-yellow);\r
}\r
.yhm3-bento-card:hover .yhm3-bento-link {\r
  gap: 9px;\r
}\r
\r
.yhm3-why-grid {\r
  display: grid;\r
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\r
  gap: 16px;\r
}\r
.yhm3-why-card {\r
  background: var(--hm-surface);\r
  border: 1px solid var(--hm-border);\r
  border-radius: 14px;\r
  padding: 24px 22px;\r
  text-align: center;\r
  transition: all 0.25s;\r
  position: relative;\r
  overflow: hidden;\r
}\r
.yhm3-why-card::before {\r
  content: "";\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  right: 0;\r
  height: 3px;\r
  background: linear-gradient(90deg, var(--hm-green), var(--hm-yellow));\r
  transform: scaleX(0);\r
  transform-origin: left;\r
  transition: transform 0.35s;\r
}\r
.yhm3-why-card:hover {\r
  transform: translateY(-4px);\r
  box-shadow: var(--hm-shadow);\r
  border-color: var(--hm-green-light);\r
}\r
.yhm3-why-card:hover::before {\r
  transform: scaleX(1);\r
}\r
.yhm3-why-icon {\r
  width: 52px;\r
  height: 52px;\r
  margin: 0 auto 12px;\r
  background: linear-gradient(135deg, var(--hm-green-pale), #fff9e6);\r
  border-radius: 14px;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  font-size: 1.7rem;\r
  transition: transform 0.3s;\r
}\r
.yhm3-why-card:hover .yhm3-why-icon {\r
  transform: scale(1.12) rotate(-5deg);\r
}\r
.yhm3-why-card h3 {\r
  font-family: "Syne", sans-serif;\r
  font-size: 1.02rem;\r
  font-weight: 800;\r
  color: var(--hm-ink);\r
  margin-bottom: 6px;\r
  letter-spacing: -0.2px;\r
}\r
.yhm3-why-card p {\r
  font-size: 0.82rem;\r
  color: var(--hm-gray);\r
  line-height: 1.55;\r
  margin: 0;\r
}\r
\r
.yhm3-stories {\r
  display: grid;\r
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\r
  gap: 16px;\r
}\r
.yhm3-story {\r
  background: var(--hm-surface);\r
  border: 1px solid var(--hm-border);\r
  border-radius: 16px;\r
  padding: 24px 22px 20px;\r
  transition: all 0.25s;\r
  position: relative;\r
}\r
.yhm3-story::before {\r
  content: "\\201C";\r
  position: absolute;\r
  top: 12px;\r
  right: 18px;\r
  font-family: "Syne", sans-serif;\r
  font-size: 4rem;\r
  color: var(--hm-green-pale);\r
  line-height: 1;\r
  font-weight: 800;\r
}\r
.yhm3-story:hover {\r
  transform: translateY(-4px);\r
  box-shadow: var(--hm-shadow-hover);\r
  border-color: var(--hm-green-light);\r
}\r
.yhm3-story-quote {\r
  font-size: 0.9rem;\r
  color: var(--hm-ink);\r
  line-height: 1.65;\r
  margin-bottom: 16px;\r
  font-style: italic;\r
  position: relative;\r
  z-index: 2;\r
}\r
.yhm3-story-foot {\r
  display: flex;\r
  align-items: center;\r
  gap: 11px;\r
  padding-top: 12px;\r
  border-top: 1px solid var(--hm-border);\r
  position: relative;\r
  z-index: 2;\r
}\r
.yhm3-story-av {\r
  width: 44px;\r
  height: 44px;\r
  border-radius: 50%;\r
  background: var(--story-color);\r
  color: #fff;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  font-family: "Syne", sans-serif;\r
  font-weight: 800;\r
  font-size: 1rem;\r
  flex-shrink: 0;\r
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);\r
}\r
.yhm3-story-name {\r
  font-family: "Syne", sans-serif;\r
  font-weight: 800;\r
  font-size: 0.9rem;\r
  color: var(--hm-ink);\r
  letter-spacing: -0.2px;\r
  line-height: 1.2;\r
}\r
.yhm3-story-meta {\r
  font-size: 0.72rem;\r
  color: var(--hm-gray);\r
  margin-top: 2px;\r
}\r
\r
.yhm3-prest-grid {\r
  display: grid;\r
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\r
  gap: 16px;\r
}\r
.yhm3-prest-card {\r
  background: var(--hm-surface);\r
  border: 1.5px solid var(--hm-border);\r
  border-radius: 14px;\r
  padding: 20px 20px;\r
  transition: all 0.25s;\r
}\r
.yhm3-prest-card:hover {\r
  transform: translateY(-4px);\r
  box-shadow: var(--hm-shadow);\r
  border-color: var(--hm-green);\r
}\r
.yhm3-prest-top {\r
  display: flex;\r
  align-items: center;\r
  gap: 11px;\r
  margin-bottom: 12px;\r
}\r
.yhm3-prest-av {\r
  width: 44px;\r
  height: 44px;\r
  border-radius: 50%;\r
  background: linear-gradient(135deg, var(--hm-green), var(--hm-green-deep));\r
  color: #fff;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  font-size: 1.4rem;\r
  flex-shrink: 0;\r
}\r
.yhm3-prest-name {\r
  font-family: "Syne", sans-serif;\r
  font-weight: 800;\r
  font-size: 0.92rem;\r
  color: var(--hm-ink);\r
  letter-spacing: -0.2px;\r
  line-height: 1.2;\r
}\r
.yhm3-prest-meta {\r
  font-size: 0.73rem;\r
  color: var(--hm-gray);\r
  margin-top: 2px;\r
}\r
.yhm3-prest-tags {\r
  display: flex;\r
  gap: 6px;\r
  flex-wrap: wrap;\r
  margin-bottom: 14px;\r
}\r
.yhm3-ptag {\r
  background: var(--hm-surface2);\r
  color: var(--hm-gray);\r
  padding: 3px 10px;\r
  border-radius: 50px;\r
  font-size: 0.68rem;\r
  font-weight: 600;\r
}\r
.yhm3-prest-foot {\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: center;\r
  padding-top: 12px;\r
  border-top: 1px solid var(--hm-border);\r
}\r
.yhm3-prest-price {\r
  font-family: "Syne", sans-serif;\r
  font-size: 1.05rem;\r
  font-weight: 800;\r
  color: var(--hm-green);\r
  letter-spacing: -0.3px;\r
}\r
.yhm3-prest-note {\r
  font-size: 0.68rem;\r
  color: var(--hm-gray);\r
}\r
.yhm3-btn-hire {\r
  background: linear-gradient(135deg, var(--hm-green), var(--hm-green-deep));\r
  color: #fff;\r
  border: none;\r
  padding: 8px 16px;\r
  border-radius: 9px;\r
  font-family: "Syne", sans-serif;\r
  font-weight: 700;\r
  font-size: 0.76rem;\r
  cursor: pointer;\r
  transition: all 0.2s;\r
}\r
.yhm3-btn-hire:hover {\r
  transform: scale(1.03);\r
  box-shadow: 0 6px 18px rgba(26, 107, 58, 0.3);\r
}\r
\r
.yhm3-nl {\r
  background: linear-gradient(135deg, #1a3a24 0%, #0d3320 100%);\r
  border-radius: 22px;\r
  padding: 40px 36px;\r
  color: #fff;\r
  display: grid;\r
  grid-template-columns: 1.1fr 1fr;\r
  gap: 36px;\r
  align-items: center;\r
  position: relative;\r
  overflow: hidden;\r
}\r
.yhm3-nl::before {\r
  content: "📬";\r
  position: absolute;\r
  top: 50%;\r
  right: 30px;\r
  transform: translateY(-50%);\r
  font-size: 11rem;\r
  opacity: 0.04;\r
  pointer-events: none;\r
}\r
.yhm3-nl-left,\r
.yhm3-nl-form {\r
  position: relative;\r
  z-index: 2;\r
}\r
.yhm3-nl-perks {\r
  list-style: none;\r
  padding: 0;\r
  margin: 16px 0 0;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 7px;\r
}\r
.yhm3-nl-perks li {\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
  font-size: 0.82rem;\r
  color: rgba(255, 255, 255, 0.85);\r
}\r
.yhm3-nl-perks li span {\r
  width: 24px;\r
  height: 24px;\r
  background: rgba(252, 209, 22, 0.15);\r
  border-radius: 50%;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  font-size: 0.85rem;\r
}\r
.yhm3-nl-lbl {\r
  display: block;\r
  font-size: 0.68rem;\r
  color: rgba(255, 255, 255, 0.55);\r
  font-weight: 700;\r
  margin-bottom: 7px;\r
  letter-spacing: 0.08em;\r
  text-transform: uppercase;\r
}\r
.yhm3-nl-row {\r
  display: flex;\r
  gap: 8px;\r
  flex-wrap: wrap;\r
  margin-bottom: 8px;\r
}\r
.yhm3-nl-inp {\r
  flex: 1;\r
  min-width: 180px;\r
  padding: 13px 15px;\r
  border-radius: 11px;\r
  border: 1px solid rgba(255, 255, 255, 0.15);\r
  background: rgba(0, 0, 0, 0.25);\r
  color: #fff;\r
  font-family: "DM Sans", sans-serif;\r
  font-size: 0.88rem;\r
  outline: none;\r
  transition: border-color 0.15s;\r
}\r
.yhm3-nl-inp::placeholder {\r
  color: rgba(255, 255, 255, 0.4);\r
}\r
.yhm3-nl-inp:focus {\r
  border-color: var(--hm-yellow);\r
}\r
.yhm3-nl-success {\r
  background: rgba(252, 209, 22, 0.12);\r
  border: 1px solid rgba(252, 209, 22, 0.3);\r
  border-radius: 11px;\r
  padding: 14px 18px;\r
  color: var(--hm-yellow);\r
  font-weight: 700;\r
  font-size: 0.92rem;\r
  text-align: center;\r
}\r
.yhm3-nl-note {\r
  font-size: 0.68rem;\r
  color: rgba(255, 255, 255, 0.5);\r
  line-height: 1.5;\r
  margin: 0;\r
}\r
\r
.yhm3-final {\r
  background: linear-gradient(135deg, #0a1410 0%, #1a3a24 100%);\r
  border-radius: 22px;\r
  padding: 48px 36px;\r
  color: #fff;\r
  text-align: center;\r
  position: relative;\r
  overflow: hidden;\r
}\r
.yhm3-final::before {\r
  content: "🇨🇲";\r
  position: absolute;\r
  top: 50%;\r
  right: -10px;\r
  transform: translateY(-50%);\r
  font-size: 12rem;\r
  opacity: 0.05;\r
  pointer-events: none;\r
}\r
.yhm3-final::after {\r
  content: "🚀";\r
  position: absolute;\r
  top: 50%;\r
  left: -10px;\r
  transform: translateY(-50%);\r
  font-size: 11rem;\r
  opacity: 0.05;\r
  pointer-events: none;\r
}\r
.yhm3-final-inner {\r
  position: relative;\r
  z-index: 2;\r
  max-width: 620px;\r
  margin: 0 auto;\r
}\r
.yhm3-final-actions {\r
  display: flex;\r
  gap: 12px;\r
  flex-wrap: wrap;\r
  justify-content: center;\r
  margin-top: 24px;\r
}\r
.yhm3-final-trust {\r
  display: flex;\r
  gap: 18px;\r
  flex-wrap: wrap;\r
  justify-content: center;\r
  margin-top: 24px;\r
  padding-top: 22px;\r
  border-top: 1px solid rgba(255, 255, 255, 0.1);\r
  list-style: none;\r
  padding-left: 0;\r
}\r
.yhm3-final-trust li {\r
  display: flex;\r
  align-items: center;\r
  gap: 5px;\r
  font-size: 0.75rem;\r
  color: rgba(255, 255, 255, 0.6);\r
}\r
\r
.yhm3-wa-sticky {\r
  position: fixed;\r
  bottom: 22px;\r
  right: 22px;\r
  z-index: 999;\r
  background: #25d366;\r
  color: #fff;\r
  padding: 12px 18px;\r
  border-radius: 50px;\r
  box-shadow: 0 12px 30px rgba(37, 211, 102, 0.4);\r
  cursor: pointer;\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
  font-family: "Syne", sans-serif;\r
  font-weight: 800;\r
  font-size: 0.82rem;\r
  border: none;\r
  transition: all 0.2s;\r
  animation: yhm3WaWiggle 4s ease-in-out infinite;\r
}\r
@keyframes yhm3WaWiggle {\r
  0%,\r
  90%,\r
  100% {\r
    transform: rotate(0);\r
  }\r
  92% {\r
    transform: rotate(-3deg);\r
  }\r
  94% {\r
    transform: rotate(3deg);\r
  }\r
  96% {\r
    transform: rotate(-2deg);\r
  }\r
  98% {\r
    transform: rotate(2deg);\r
  }\r
}\r
.yhm3-wa-sticky:hover {\r
  transform: scale(1.05);\r
  box-shadow: 0 16px 38px rgba(37, 211, 102, 0.5);\r
}\r
\r
.yhm3-loading {\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  gap: 12px;\r
  padding: 60px 20px;\r
  color: var(--hm-gray);\r
}\r
.yhm3-spinner {\r
  width: 22px;\r
  height: 22px;\r
  border: 3px solid var(--hm-border);\r
  border-top-color: var(--hm-green);\r
  border-radius: 50%;\r
  animation: yhm3Spin 0.7s linear infinite;\r
}\r
@keyframes yhm3Spin {\r
  to {\r
    transform: rotate(360deg);\r
  }\r
}\r
.yhm3-empty {\r
  text-align: center;\r
  padding: 50px 20px;\r
  background: var(--hm-surface);\r
  border: 1.5px dashed var(--hm-border);\r
  border-radius: 14px;\r
}\r
.yhm3-empty-ico {\r
  font-size: 3rem;\r
  margin-bottom: 10px;\r
  opacity: 0.55;\r
}\r
.yhm3-empty p {\r
  color: var(--hm-gray);\r
  font-size: 0.88rem;\r
  line-height: 1.65;\r
  margin: 0;\r
}\r
\r
@media (max-width: 960px) {\r
  .yhm3-hero {\r
    padding: 40px 18px 56px;\r
  }\r
  .yhm3-hero-grid {\r
    grid-template-columns: 1fr;\r
    gap: 32px;\r
  }\r
  .yhm3-hero-stats {\r
    grid-template-columns: repeat(2, 1fr);\r
  }\r
  .yhm3-cats-grid {\r
    grid-template-columns: repeat(3, 1fr);\r
  }\r
  .yhm3-kpis {\r
    grid-template-columns: repeat(2, 1fr);\r
  }\r
  .yhm3-bento {\r
    grid-template-columns: repeat(2, 1fr);\r
  }\r
  .yhm3-bento-card--wide {\r
    grid-column: span 2;\r
  }\r
  .yhm3-nl {\r
    grid-template-columns: 1fr;\r
    gap: 22px;\r
    padding: 30px 22px;\r
  }\r
  .yhm3-final {\r
    padding: 36px 22px;\r
  }\r
  .yhm3-section--tinted {\r
    padding: 40px 18px;\r
  }\r
}\r
@media (max-width: 500px) {\r
  .yhm3-hero {\r
    padding: 30px 16px 46px;\r
  }\r
  .yhm3-h1 {\r
    font-size: 1.9rem;\r
    letter-spacing: -1px;\r
  }\r
  .yhm3-cats-grid {\r
    grid-template-columns: repeat(2, 1fr);\r
  }\r
  .yhm3-kpis {\r
    grid-template-columns: 1fr 1fr;\r
  }\r
  .yhm3-bento {\r
    grid-template-columns: 1fr;\r
  }\r
  .yhm3-bento-card--wide {\r
    grid-column: span 1;\r
  }\r
  .yhm3-search-row {\r
    grid-template-columns: 1fr;\r
  }\r
  .yhm3-hero-ctas {\r
    flex-direction: column;\r
  }\r
  .yhm3-btn {\r
    width: 100%;\r
    text-align: center;\r
  }\r
  .yhm3-section,\r
  .yhm3-section--tinted {\r
    padding-left: 16px;\r
    padding-right: 16px;\r
  }\r
  .yhm3-nl-row {\r
    flex-direction: column;\r
  }\r
  .yhm3-flash-banner {\r
    padding: 16px 18px;\r
  }\r
  .yhm3-flash-banner::before {\r
    font-size: 6rem;\r
    right: -10px;\r
  }\r
  .yhm3-wa-sticky {\r
    bottom: 16px;\r
    right: 16px;\r
    padding: 11px 16px;\r
    font-size: 0.78rem;\r
  }\r
}\r
\r
@media (prefers-reduced-motion: reduce) {\r
  .yhm3-marquee-track {\r
    animation: none !important;\r
  }\r
  .yhm3-eyebrow-dot {\r
    animation: none !important;\r
  }\r
  .yhm3-wa-sticky {\r
    animation: none !important;\r
  }\r
  .yhm3-spinner {\r
    animation: none !important;\r
  }\r
}\r
\r
@media (max-width: 768px) {\r
  .yorix-home-v3 .yhm3-wa-sticky {\r
    display: none !important;\r
  }\r
}\r
`,W=[{key:"produits",label:"Produits",icon:"🛍️",desc:"Catalogue vérifié",color:"#1a6b3a"},{key:"prestataires",label:"Services",icon:"🛠️",desc:"Pros & freelances",color:"#f59e0b"},{key:"livraison",label:"Livraison",icon:"🚚",desc:"Yorix Ride · suivi",color:"#0891b2"},{key:"business",label:"Business",icon:"💼",desc:"B2B & croissance",color:"#7c3aed"},{key:"academy",label:"Academy",icon:"🎓",desc:"Monter en compétence",color:"#dc2626"}],F=[{key:"produits",icon:"🛍️",title:"Marketplace produits",desc:"Découverte fluide, panier universel, checkout sécurisé — comme les grandes marketplaces africaines.",wide:!0},{key:"prestataires",icon:"🛠️",title:"Services & talents",desc:"Réservez des pros vérifiés : beauté, tech, BTP… expérience marketplace de services."},{key:"livraison",icon:"🚚",title:"Livraison & logistique",desc:"Suivi, zones prioritaires Douala · Yaoundé, objectifs clairs comme une app de delivery moderne."},{key:"business",icon:"💼",title:"Yorix Business",desc:"Outils et crédibilité pour VSE, corners digitaux et partenaires B2B."},{key:"academy",icon:"🎓",title:"Yorix Academy",desc:"Former vos équipes et vos clients aux bonnes pratiques e-commerce & logistique."}],D=[{icon:"🚀",title:"Vitesse & clarté",desc:"Moins de friction entre l'intention et le paiement — tunnel optimisé mobile."},{icon:"🌍",title:"Local first",desc:"Conçu au Cameroun pour les usages MoMo, WhatsApp et la logistique réelle."},{icon:"🎯",title:"Multi-canal",desc:"Achat catalogue, réservation pros, livraison, business & formation — tout-en-un."},{icon:"💬",title:"Humain accessible",desc:"Support WhatsApp 7j/7 quand il faut trancher vite."}],B=[{val:"10+",lbl:"Villes & hubs",color:"#1a6b3a",icon:"🏙️"},{val:"24/7",lbl:"Support WhatsApp",color:"#f59e0b",icon:"💬"},{val:"100%",lbl:"Mobile money ready",color:"#0891b2",icon:"📱"},{val:"5%",lbl:"Commission plateforme",color:"#7c3aed",icon:"💎"}],O=[{quote:"Enfin une plateforme camerounaise qui ressemble aux géants — mais avec le sens du détail local.",author:"Acheteur vérifié",meta:"Douala · High-tech",avatar:"A",color:"#1a6b3a"},{quote:"Paiement MoMo fluide, escrow rassurant. Je recommande à mes clients de passer par Yorix.",author:"Vendeur pro",meta:"Mode & accessoires",avatar:"V",color:"#f59e0b"},{quote:"Les prestataires sont notés, la prise de contact est simple. Parfait pour nos urgences à Yaoundé.",author:"PME & services",meta:"Yaoundé",avatar:"P",color:"#7c3aed"}],N=[{i:"🚚",t:"Livraison prioritaire"},{i:"📱",t:"Mobile money intégré"},{i:"🔐",t:"Escrow protection"},{i:"💬",t:"Support WhatsApp 7j/7"},{i:"🇨🇲",t:"100% Cameroun"}];function G({filterCat:l,setFilterCat:t,search:d,setSearch:m,produitsLoading:c,produits:o,user:i,userData:s,wishlist:y,addToCart:g,toggleWish:f,openProductUrl:u,setOnboardingOpen:b,goPage:a,allServices:v,nlEmail:j,setNlEmail:z,nlSent:S,setNlSent:C,freeShippingThresholdXaf:M=5e4}){const[p,q]=h.useState(""),Y=h.useCallback(()=>{const n=E.find(e=>e.name===p);if(n){a("seoCity",{citySlug:n.slug,mode:"acheter"});return}a("produits")},[a,p]),w=Number(M)||5e4,A=async()=>{const n=j?.trim();if(!(!n||!n.includes("@"))){try{const{error:e}=await T.from("newsletter").insert({email:n});e&&console.warn(e.message)}catch(e){console.warn(e?.message)}C(!0)}};return r.jsxs(r.Fragment,{children:[r.jsx("style",{children:L}),r.jsxs("div",{className:"yx-promo-banner",role:"region","aria-label":"Offre limitée",children:[r.jsx("span",{className:"yx-promo-icon","aria-hidden":!0,children:"🎁"}),r.jsxs("span",{children:["Livraison ",r.jsx("strong",{children:"OFFERTE"})," dès ",w.toLocaleString("fr-FR")," FCFA · stocks limités"]}),r.jsx("button",{type:"button",className:"yx-promo-cta",onClick:()=>a("bonsPlans"),children:"J'en profite"})]}),r.jsxs("div",{className:"home-premium yorix-home-v3 anim",children:[r.jsx("div",{className:"yhm3-marquee",role:"region","aria-label":"Avantages Yorix",children:r.jsx("div",{className:"yhm3-marquee-track",children:[...N,...N].map((n,e)=>r.jsxs("span",{className:"yhm3-marquee-item",children:[r.jsx("span",{"aria-hidden":!0,children:n.i})," ",n.t]},`${n.t}-${e}`))})}),r.jsx("header",{className:"yhm3-hero",children:r.jsx("div",{className:"yhm3-hero-inner",children:r.jsxs("div",{className:"yhm3-hero-grid",children:[r.jsxs("div",{children:[r.jsxs("span",{className:"yhm3-eyebrow",children:[r.jsx("span",{className:"yhm3-eyebrow-dot"})," 🇨🇲 Super-app commerce · Cameroun"]}),r.jsxs("h1",{className:"yhm3-h1",children:["Le marché numérique",r.jsx("br",{}),"qui ",r.jsx("em",{children:"accélère"}),r.jsx("br",{}),"votre business"]}),r.jsxs("p",{className:"yhm3-sub",children:["Produits, freelances, livraison et formation — ",r.jsx("strong",{children:"un seul écosystème premium"}),". Conçu pour la confiance, pensé pour la conversion, ancré au Cameroun."]}),r.jsxs("div",{className:"yhm3-hero-ctas",children:[r.jsx("button",{type:"button",className:"yhm3-btn yhm3-btn--pri",onClick:()=>b(!0),children:"🚀 Démarrer · 30 s"}),r.jsx("button",{type:"button",className:"yhm3-btn yhm3-btn--sec",onClick:()=>a("produits"),children:"Parcourir le catalogue"})]}),r.jsxs("ul",{className:"yhm3-hero-trust",children:[r.jsxs("li",{children:[r.jsx("span",{"aria-hidden":!0,children:"⭐"})," Avis transparents"]}),r.jsxs("li",{children:[r.jsx("span",{"aria-hidden":!0,children:"🛡️"})," Paiements sécurisés"]}),r.jsxs("li",{children:[r.jsx("span",{"aria-hidden":!0,children:"📦"})," Vendeurs actifs"]})]}),r.jsxs("div",{className:"yhm3-hero-stats",children:[r.jsxs("div",{children:[r.jsx("div",{className:"yhm3-hero-stat-val",children:"10+"}),r.jsx("div",{className:"yhm3-hero-stat-lbl",children:"Villes"})]}),r.jsxs("div",{children:[r.jsx("div",{className:"yhm3-hero-stat-val",children:"24/7"}),r.jsx("div",{className:"yhm3-hero-stat-lbl",children:"Support"})]}),r.jsxs("div",{children:[r.jsx("div",{className:"yhm3-hero-stat-val",children:"100%"}),r.jsx("div",{className:"yhm3-hero-stat-lbl",children:"Mobile money"})]}),r.jsxs("div",{children:[r.jsx("div",{className:"yhm3-hero-stat-val",children:"1"}),r.jsx("div",{className:"yhm3-hero-stat-lbl",children:"Écosystème"})]})]})]}),r.jsxs("aside",{className:"yhm3-search-panel","aria-label":"Recherche rapide",children:[r.jsxs("div",{className:"yhm3-search-head",children:[r.jsx("div",{className:"yhm3-search-title",children:"Trouver en quelques secondes"}),r.jsx("p",{className:"yhm3-search-sub",children:"Filtres synchronisés avec le catalogue."})]}),r.jsxs("div",{className:"yhm3-search-row",children:[r.jsxs("select",{className:"yhm3-search-select",value:l,onChange:n=>t(n.target.value),"aria-label":"Catégorie",children:[r.jsx("option",{value:"",children:"Toutes catégories"}),I.map(n=>r.jsx("option",{value:n,children:n},n))]}),r.jsx("input",{className:"yhm3-search-input",placeholder:"Produit, marque, mot-clé…",value:d,onChange:n=>m(n.target.value),"aria-label":"Recherche"})]}),r.jsxs("div",{className:"yhm3-search-row",children:[r.jsxs("select",{className:"yhm3-search-select",value:p,onChange:n=>q(n.target.value),"aria-label":"Ville",children:[r.jsx("option",{value:"",children:"Toutes les villes"}),R.filter(n=>!/^toutes/i.test(n)).map(n=>r.jsx("option",{value:n,children:n},n))]}),r.jsx("input",{className:"yhm3-search-input",placeholder:"Budget max (FCFA)",readOnly:!0,tabIndex:-1,style:{opacity:.65}})]}),r.jsx("button",{type:"button",className:"yhm3-search-cta",onClick:Y,children:"🔍 Lancer la recherche"}),r.jsxs("div",{className:"yhm3-search-trends",children:[r.jsx("span",{className:"yhm3-search-trends-lbl",children:"Tendances"}),["Pagne wax","iPhone","Karité","BTP"].map(n=>r.jsx("button",{type:"button",className:"yhm3-search-tag",onClick:()=>{m(n),a("produits")},children:n},n))]}),r.jsxs("ul",{className:"yhm3-search-perks",children:[r.jsxs("li",{children:["Livraison offerte dès ",r.jsxs("strong",{children:[w.toLocaleString("fr-FR")," FCFA"]})," ·"," ",r.jsx("button",{type:"button",onClick:()=>a("bonsPlans"),children:"Détails offre"})]}),r.jsx("li",{children:"Commission plateforme jamais affichée au client final."})]})]})]})})}),r.jsxs("section",{className:"yhm3-section",children:[r.jsxs("div",{className:"yhm3-section-head yhm3-section-head--center",children:[r.jsx("span",{className:"yhm3-eyebrow-light",children:"Accès rapides"}),r.jsxs("h2",{className:"yhm3-h2 yhm3-h2--center",children:["Tout ce dont vous avez ",r.jsx("em",{children:"besoin"})]}),r.jsx("p",{className:"yhm3-lead yhm3-lead--center",children:"5 univers pour acheter, vendre, livrer, apprendre et faire grandir votre activité au Cameroun."})]}),r.jsx("div",{className:"yhm3-cats-grid",children:W.map(n=>r.jsxs("button",{type:"button",className:"yhm3-cat-card",style:{"--cat-color":n.color},onClick:()=>a(n.key),children:[r.jsx("div",{className:"yhm3-cat-icon",children:n.icon}),r.jsx("div",{className:"yhm3-cat-label",children:n.label}),r.jsx("div",{className:"yhm3-cat-desc",children:n.desc})]},n.key))})]}),r.jsxs("section",{className:"yhm3-section--tinted",children:[r.jsxs("div",{className:"yhm3-section-head yhm3-section-head--center",children:[r.jsx("span",{className:"yhm3-eyebrow-light",children:"Statistiques Yorix"}),r.jsxs("h2",{className:"yhm3-h2 yhm3-h2--center",children:["La plateforme commerce du ",r.jsx("em",{children:"Cameroun"})]}),r.jsx("p",{className:"yhm3-lead yhm3-lead--center",children:"Une infrastructure pensée pour la réalité locale et les ambitions internationales."})]}),r.jsx("div",{className:"yhm3-kpis",children:B.map(n=>r.jsxs("article",{className:"yhm3-kpi",style:{"--kpi-color":n.color},children:[r.jsx("div",{className:"yhm3-kpi-icon",children:n.icon}),r.jsx("div",{className:"yhm3-kpi-val",children:n.val}),r.jsx("div",{className:"yhm3-kpi-lbl",children:n.lbl})]},n.lbl))})]}),r.jsxs("section",{className:"yhm3-section",children:[r.jsxs("div",{className:"yhm3-flash-toolbar",children:[r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"},children:[r.jsx("span",{className:"yhm3-flash-pill",children:"⚡ Temps limité"}),r.jsxs("h2",{className:"yhm3-h2",style:{marginBottom:0,fontSize:"1.5rem"},children:["Offres flash du ",r.jsx("em",{children:"jour"})]})]}),r.jsxs("div",{className:"yhm3-flash-end",children:[r.jsx("span",{children:"Fin dans"}),r.jsx(P,{})]})]}),r.jsxs("div",{className:"yhm3-flash-banner",children:[r.jsxs("div",{className:"yhm3-flash-banner-left",children:[r.jsx("div",{className:"yhm3-flash-title",children:"⚡ Sélection éclair · high-tech & lifestyle"}),r.jsx("div",{className:"yhm3-flash-sub",children:"Paiement MoMo / Orange · stocks limités selon vendeurs partenaires"})]}),r.jsx("button",{type:"button",className:"yhm3-btn yhm3-btn--green",onClick:()=>{t("Téléphones & HighTech"),a("produits")},children:"Voir les promos →"})]}),!c&&o.length>0&&r.jsx(k,{prods:o.slice(0,4).map((n,e)=>({...n,flash:e<2,promo:e>=2&&e<4,promo_pct:e===2?20:e===3?15:0})),user:i,userData:s,onAddToCart:g,onWish:f,wishlist:y,onOpenProductUrl:u})]}),r.jsxs("section",{className:"yhm3-section",children:[r.jsxs("div",{className:"yhm3-section-head",children:[r.jsxs("div",{children:[r.jsx("span",{className:"yhm3-eyebrow-light",children:"Catalogue"}),r.jsxs("h2",{className:"yhm3-h2",children:["Produits du ",r.jsx("em",{children:"moment"})]}),r.jsx("p",{className:"yhm3-lead",children:"Une sélection mise à jour quotidiennement par nos vendeurs."})]}),r.jsxs("button",{type:"button",className:"yhm3-section-link",onClick:()=>a("produits"),children:["Tout voir ",r.jsx("span",{children:"→"})]})]}),c?r.jsxs("div",{className:"yhm3-loading",children:[r.jsx("div",{className:"yhm3-spinner"}),"Chargement du marché…"]}):o.length===0?r.jsxs("div",{className:"yhm3-empty",children:[r.jsx("div",{className:"yhm3-empty-ico",children:"🛍️"}),r.jsx("p",{children:"Le catalogue se remplit — revenez très vite."})]}):r.jsx(k,{prods:o.slice(0,10),user:i,userData:s,onAddToCart:g,onWish:f,wishlist:y,onOpenProductUrl:u})]}),r.jsxs("section",{className:"yhm3-section--tinted",children:[r.jsxs("div",{className:"yhm3-section-head yhm3-section-head--center",children:[r.jsx("span",{className:"yhm3-eyebrow-light",children:"Écosystème Yorix"}),r.jsxs("h2",{className:"yhm3-h2 yhm3-h2--center",children:["Une plateforme, tous vos ",r.jsx("em",{children:"flux de revenus"})]}),r.jsx("p",{className:"yhm3-lead yhm3-lead--center",children:"Inspiré des leaders mondiaux — adapté au réel du Cameroun francophone."})]}),r.jsx("div",{className:"yhm3-bento",children:F.map(n=>r.jsxs("article",{className:`yhm3-bento-card${n.wide?" yhm3-bento-card--wide":""}`,onClick:()=>a(n.key),role:"link",tabIndex:0,onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),a(n.key))},children:[r.jsx("div",{className:"yhm3-bento-icon",children:n.icon}),r.jsx("h3",{children:n.title}),r.jsx("p",{children:n.desc}),r.jsxs("span",{className:"yhm3-bento-link",children:["Explorer ",r.jsx("span",{children:"→"})]})]},n.key))})]}),r.jsxs("section",{className:"yhm3-section",children:[r.jsxs("div",{className:"yhm3-section-head yhm3-section-head--center",children:[r.jsx("span",{className:"yhm3-eyebrow-light",children:"Différenciation Yorix"}),r.jsxs("h2",{className:"yhm3-h2 yhm3-h2--center",children:["Une expérience premium, ",r.jsx("em",{children:"pensée conversion"})]}),r.jsx("p",{className:"yhm3-lead yhm3-lead--center",children:"Clarté des prix · Parcours mobile irréprochable · Réassurance à chaque étape."})]}),r.jsx("div",{className:"yhm3-why-grid",children:D.map(n=>r.jsxs("article",{className:"yhm3-why-card",children:[r.jsx("div",{className:"yhm3-why-icon",children:n.icon}),r.jsx("h3",{children:n.title}),r.jsx("p",{children:n.desc})]},n.title))})]}),r.jsxs("section",{className:"yhm3-section",children:[r.jsxs("div",{className:"yhm3-section-head yhm3-section-head--center",children:[r.jsx("span",{className:"yhm3-eyebrow-light",children:"Témoignages"}),r.jsxs("h2",{className:"yhm3-h2 yhm3-h2--center",children:["Ils ",r.jsx("em",{children:"nous font confiance"})]}),r.jsx("p",{className:"yhm3-lead yhm3-lead--center",children:"Acheteurs, vendeurs, professionnels — la communauté Yorix grandit chaque jour."})]}),r.jsx("div",{className:"yhm3-stories",children:O.map(n=>r.jsxs("figure",{className:"yhm3-story",style:{"--story-color":n.color},children:[r.jsxs("blockquote",{className:"yhm3-story-quote",children:["“",n.quote,"”"]}),r.jsxs("figcaption",{className:"yhm3-story-foot",children:[r.jsx("div",{className:"yhm3-story-av",children:n.avatar}),r.jsxs("div",{children:[r.jsx("div",{className:"yhm3-story-name",children:n.author}),r.jsx("div",{className:"yhm3-story-meta",children:n.meta})]})]})]},n.author))})]}),r.jsxs("section",{className:"yhm3-section",children:[r.jsxs("div",{className:"yhm3-section-head",children:[r.jsxs("div",{children:[r.jsx("span",{className:"yhm3-eyebrow-light",children:"Prestataires"}),r.jsxs("h2",{className:"yhm3-h2",children:["Prestataires ",r.jsx("em",{children:"sélectionnés"})]}),r.jsx("p",{className:"yhm3-lead",children:"Des talents camerounais vérifiés pour vos besoins du quotidien."})]}),r.jsxs("button",{type:"button",className:"yhm3-section-link",onClick:()=>a("prestataires"),children:["Marketplace services ",r.jsx("span",{children:"→"})]})]}),r.jsx("div",{className:"yhm3-prest-grid",children:v.length===0?r.jsxs("div",{className:"yhm3-empty",style:{gridColumn:"1/-1"},children:[r.jsx("div",{className:"yhm3-empty-ico",children:"🛠️"}),r.jsx("p",{children:"Les talents arrivent — explorez bientôt la vitrine services."})]}):v.slice(0,3).map(n=>r.jsxs("article",{className:"yhm3-prest-card",children:[r.jsxs("div",{className:"yhm3-prest-top",children:[r.jsx("div",{className:"yhm3-prest-av",children:"🧑‍💼"}),r.jsxs("div",{children:[r.jsx("div",{className:"yhm3-prest-name",children:n.provider_nom||"Prestataire"}),r.jsx("div",{className:"yhm3-prest-meta",children:n.nom})]})]}),r.jsxs("div",{className:"yhm3-prest-tags",children:[n.categorie&&r.jsx("span",{className:"yhm3-ptag",children:n.categorie}),n.ville&&r.jsxs("span",{className:"yhm3-ptag",children:["📍 ",n.ville]})]}),r.jsxs("div",{className:"yhm3-prest-foot",children:[r.jsxs("div",{children:[r.jsxs("div",{className:"yhm3-prest-price",children:[Number(n.prix).toLocaleString()," F"]}),r.jsxs("div",{className:"yhm3-prest-note",children:["⭐ ",n.note||0," · ",n.nombre_avis||0," avis"]})]}),r.jsx("button",{type:"button",className:"yhm3-btn-hire",onClick:()=>window.open(`https://wa.me/${x}?text=${encodeURIComponent(`Bonjour Yorix ! Projet : ${n.nom} (${n.provider_nom})`)}`,"_blank","noopener,noreferrer"),children:"Contacter"})]})]},n.id))})]}),r.jsx("section",{className:"yhm3-section",children:r.jsxs("div",{className:"yhm3-nl",children:[r.jsxs("div",{className:"yhm3-nl-left",children:[r.jsxs("span",{className:"yhm3-eyebrow",children:[r.jsx("span",{className:"yhm3-eyebrow-dot"})," Newsletter Yorix"]}),r.jsxs("h2",{className:"yhm3-h2 yhm3-h2--on-dark",children:["Restez dans la ",r.jsx("em",{children:"momentum Yorix"})]}),r.jsxs("p",{className:"yhm3-sub",style:{color:"rgba(255,255,255,.78)"},children:["Alertes bons plans, nouveaux hubs villes et masterclass Academy —",r.jsx("strong",{style:{color:"#fff"},children:" sans spam"}),"."]}),r.jsxs("ul",{className:"yhm3-nl-perks",children:[r.jsxs("li",{children:[r.jsx("span",{"aria-hidden":!0,children:"🎁"})," Bons plans exclusifs"]}),r.jsxs("li",{children:[r.jsx("span",{"aria-hidden":!0,children:"📍"})," Nouveaux hubs villes"]}),r.jsxs("li",{children:[r.jsx("span",{"aria-hidden":!0,children:"🎓"})," Masterclass Academy"]})]})]}),r.jsx("form",{className:"yhm3-nl-form",onSubmit:n=>{n.preventDefault(),A()},noValidate:!0,children:S?r.jsx("div",{className:"yhm3-nl-success",children:"🎉 Merci ! Vous êtes inscrit(e)."}):r.jsxs(r.Fragment,{children:[r.jsx("label",{htmlFor:"yhm3-nl-email",className:"yhm3-nl-lbl",children:"VOTRE MEILLEUR EMAIL"}),r.jsxs("div",{className:"yhm3-nl-row",children:[r.jsx("input",{id:"yhm3-nl-email",type:"email",className:"yhm3-nl-inp",placeholder:"vous@email.cm",value:j,onChange:n=>z(n.target.value),autoComplete:"email",required:!0}),r.jsx("button",{type:"submit",className:"yhm3-btn yhm3-btn--pri",children:"Rejoindre 🚀"})]}),r.jsx("p",{className:"yhm3-nl-note",children:"🔒 RGPD · désinscription en un clic depuis chaque envoi."})]})})]})}),r.jsx("section",{className:"yhm3-section",children:r.jsx("div",{className:"yhm3-final",children:r.jsxs("div",{className:"yhm3-final-inner",children:[r.jsxs("span",{className:"yhm3-eyebrow",children:[r.jsx("span",{className:"yhm3-eyebrow-dot"})," Prêt à commencer ?"]}),r.jsxs("h2",{className:"yhm3-h2 yhm3-h2--on-dark",children:["Rejoignez la marketplace",r.jsx("br",{}),"du ",r.jsx("em",{children:"Cameroun moderne"})]}),r.jsxs("p",{className:"yhm3-sub",style:{color:"rgba(255,255,255,.78)"},children:[r.jsx("strong",{style:{color:"#fff"},children:"Inscription gratuite"})," · paiement MoMo & Orange Money · support WhatsApp 7j/7. Commencez à acheter, vendre ou prester en moins de 30 secondes."]}),r.jsxs("div",{className:"yhm3-final-actions",children:[r.jsx("button",{type:"button",className:"yhm3-btn yhm3-btn--pri",onClick:()=>b(!0),children:"🚀 Démarrer maintenant"}),r.jsx("button",{type:"button",className:"yhm3-btn yhm3-btn--sec",onClick:()=>a("aide"),children:"🆘 Centre d'aide"})]}),r.jsxs("ul",{className:"yhm3-final-trust",children:[r.jsxs("li",{children:[r.jsx("span",{"aria-hidden":!0,children:"🇨🇲"})," 100% Cameroun"]}),r.jsxs("li",{children:[r.jsx("span",{"aria-hidden":!0,children:"🔐"})," Escrow inclus"]}),r.jsxs("li",{children:[r.jsx("span",{"aria-hidden":!0,children:"📱"})," Mobile money"]}),r.jsxs("li",{children:[r.jsx("span",{"aria-hidden":!0,children:"⚡"})," 30s d'inscription"]})]})]})})}),r.jsxs("button",{type:"button",className:"yhm3-wa-sticky","aria-label":"Commande WhatsApp express",onClick:()=>window.open(`https://wa.me/${x}?text=${encodeURIComponent("Bonjour Yorix ! Je veux passer commande 🛍️")}`,"_blank","noopener,noreferrer"),children:[r.jsx("span",{"aria-hidden":!0,children:"💬"})," WhatsApp express"]}),r.jsxs("div",{className:"wa-sticky",children:[r.jsx("span",{className:"wa-sticky-text",children:"Commande express"}),r.jsx("button",{type:"button",className:"wa-sticky-btn",onClick:()=>window.open(`https://wa.me/${x}?text=${encodeURIComponent("Bonjour Yorix ! Je veux passer commande 🛍️")}`,"_blank","noopener,noreferrer"),children:"WhatsApp"})]})]})]})}export{G as HomePage};
