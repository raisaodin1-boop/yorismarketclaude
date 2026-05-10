// ═══════════════════════════════════════════════════════
//  YORIX CM — APP COMPLÈTE CONNECTÉE À FIREBASE
//  Copie ce fichier dans src/App.jsx de ton projet React
// ═══════════════════════════════════════════════════════

import { useState, useEffect, useRef } from "react";

// ── FIREBASE ──
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  increment
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

// ── CONFIG FIREBASE YORIX ──
const firebaseConfig = {
  apiKey: "AIzaSyB8OoAoT7u0qbQWkWbISJ6vId9W2TV8PXE",
  authDomain: "yorix-74030.firebaseapp.com",
  projectId: "yorix-74030",
  storageBucket: "yorix-74030.firebasestorage.app",
  messagingSenderId: "942631804989",
  appId: "1:942631804989:web:b068e95deed0d5a927ca54"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

// ── CONSTANTES ──
const COMMISSION = 0.10;
const FORBIDDEN = [
  /(\+?237[\s\-]?[0-9]{8,9})/g,
  /(\+?[0-9]{1,3}[\s\-]?[0-9]{9,10})/g,
  /(whatsapp|wa\.me|t\.me|telegram)/gi,
  /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
  /(facebook\.com|instagram\.com)/gi,
];

function filtrerMsg(texte) {
  for (const p of FORBIDDEN) {
    if (p.test(texte)) return { bloque: true };
  }
  return { bloque: false };
}

// ── CSS ──
const makeCSS = (dark) => `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --ink:${dark?"#e8f0eb":"#0d1f14"};
  --green:#1a6b3a;--green-mid:#27a85a;--green-light:#4fd17d;
  --green-pale:${dark?"#1a3a24":"#c8f5d9"};
  --red:#ce1126;--yellow:#fcd116;--gold:#c9a84c;
  --bg:${dark?"#0d1a12":"#f5f2ed"};
  --surface:${dark?"#152118":"#ffffff"};
  --surface2:${dark?"#1c2e22":"#f0ece6"};
  --sand:${dark?"#1a2e1e":"#ede8df"};
  --border:${dark?"#2a4030":"#e2ddd6"};
  --gray:${dark?"#7a9a82":"#6b7a72"};
  --shadow:${dark?"rgba(0,0,0,.45)":"rgba(0,0,0,.08)"};
}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--ink);transition:background .3s,color .3s;}
.topbar{background:${dark?"#0a1410":"#0d1f14"};padding:5px 24px;display:flex;align-items:center;justify-content:space-between;font-size:.71rem;color:rgba(255,255,255,.44);}
.topbar-l{display:flex;gap:14px;align-items:center;}
.flag{display:flex;width:17px;height:11px;border-radius:2px;overflow:hidden;}
.fg{flex:1;background:#007a5e;}.fr{flex:1;background:#ce1126;}.fy{flex:1;background:#fcd116;}
.flag-wrap{display:flex;align-items:center;gap:5px;color:#b7e4c7;font-weight:600;}
.topbar-r{display:flex;gap:11px;}
.topbar-r span{cursor:pointer;transition:color .2s;}.topbar-r span:hover{color:#b7e4c7;}
.navbar{background:var(--surface);padding:0 24px;display:flex;align-items:center;gap:12px;height:64px;position:sticky;top:0;z-index:300;border-bottom:1px solid var(--border);box-shadow:0 2px 16px var(--shadow);}
.logo-wrap{cursor:pointer;display:flex;align-items:center;gap:8px;flex-shrink:0;}
.logo-txt{font-family:'Syne',sans-serif;font-weight:800;font-size:1.6rem;letter-spacing:-1px;color:var(--ink);}
.logo-txt span{color:var(--green);}
.logo-txt sup{font-size:.5rem;background:var(--yellow);color:#0d1f14;padding:1px 4px;border-radius:3px;font-weight:800;vertical-align:super;}
.nav-search{flex:1;max-width:440px;display:flex;background:var(--surface2);border:1.5px solid var(--border);border-radius:10px;overflow:hidden;transition:border-color .2s;}
.nav-search:focus-within{border-color:var(--green-mid);}
.nav-search select{border:none;border-right:1px solid var(--border);background:var(--sand);padding:9px 8px;font-family:'DM Sans',sans-serif;font-size:.76rem;color:var(--gray);outline:none;min-width:95px;}
.nav-search input{flex:1;border:none;background:transparent;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:.82rem;outline:none;color:var(--ink);}
.nav-search input::placeholder{color:var(--gray);}
.nav-search button{background:var(--green);color:#fff;border:none;padding:0 13px;cursor:pointer;}
.nav-actions{display:flex;align-items:center;gap:8px;margin-left:auto;}
.btn-ghost{border:1.5px solid var(--border);background:transparent;color:var(--ink);padding:7px 13px;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:.77rem;font-weight:500;cursor:pointer;transition:all .2s;}
.btn-ghost:hover{border-color:var(--green);color:var(--green);}
.btn-green{background:var(--green);color:#fff;border:none;padding:8px 14px;border-radius:8px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.77rem;cursor:pointer;}
.btn-red{background:var(--red);color:#fff;border:none;padding:8px 14px;border-radius:8px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.77rem;cursor:pointer;}
.icon-btn{position:relative;cursor:pointer;background:var(--surface2);border:1.5px solid var(--border);width:38px;height:38px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1rem;transition:all .2s;}
.icon-btn:hover{border-color:var(--green);}
.ibadge{position:absolute;top:-4px;right:-4px;background:var(--red);color:#fff;border-radius:50%;width:16px;height:16px;font-size:.55rem;font-weight:700;display:flex;align-items:center;justify-content:center;}
.dark-toggle{background:var(--surface2);border:1.5px solid var(--border);width:38px;height:38px;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1rem;}
.user-av{width:34px;height:34px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-size:.78rem;font-weight:700;cursor:pointer;border:2px solid var(--green-pale);}
.nav-tabs{background:var(--green);display:flex;padding:0 24px;overflow-x:auto;scrollbar-width:none;}
.nav-tabs::-webkit-scrollbar{display:none;}
.tab{color:rgba(255,255,255,.65);padding:9px 13px;font-size:.77rem;font-weight:500;cursor:pointer;border-bottom:2px solid transparent;white-space:nowrap;transition:all .2s;}
.tab:hover{color:#fff;}.tab.active{color:var(--yellow);border-bottom-color:var(--yellow);}
.pay-strip{background:var(--surface2);border-bottom:1px solid var(--border);padding:6px 24px;display:flex;align-items:center;gap:14px;font-size:.7rem;color:var(--gray);}
.pay-methods{display:flex;gap:5px;}
.pm{background:var(--surface);border:1px solid var(--border);border-radius:5px;padding:2px 7px;font-weight:600;font-size:.67rem;}
.mtn-b{background:#1a1a1a;color:#ffcc00;border-color:#1a1a1a;}.ora-b{color:#ff6600;}
.strip-right{margin-left:auto;display:flex;gap:12px;}
.hero{background:linear-gradient(135deg,#0a1410 0%,#1a3a24 55%,var(--green) 100%);padding:44px 24px 52px;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle at 78% 50%,rgba(79,209,125,.09) 0%,transparent 58%);}
.hero-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;position:relative;}
.hero-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(252,209,22,.14);color:var(--yellow);border:1px solid rgba(252,209,22,.28);padding:4px 12px;border-radius:50px;font-size:.7rem;font-weight:600;letter-spacing:.5px;margin-bottom:13px;}
.hero h1{font-family:'Syne',sans-serif;font-size:clamp(1.6rem,3vw,2.6rem);font-weight:800;color:#fff;line-height:1.15;margin-bottom:11px;letter-spacing:-1px;}
.hero h1 em{color:#4fd17d;font-style:normal;}
.hero-sub{color:rgba(255,255,255,.52);font-size:.87rem;line-height:1.75;margin-bottom:24px;}
.hero-ctas{display:flex;gap:8px;margin-bottom:26px;flex-wrap:wrap;}
.cta-y{background:var(--yellow);color:#0d1f14;border:none;padding:10px 18px;border-radius:8px;font-family:'DM Sans',sans-serif;font-weight:700;font-size:.82rem;cursor:pointer;transition:all .2s;}
.cta-y:hover{background:#e8bf00;transform:translateY(-2px);}
.cta-w{background:rgba(255,255,255,.09);color:#fff;border:1px solid rgba(255,255,255,.22);padding:10px 18px;border-radius:8px;font-family:'DM Sans',sans-serif;font-weight:500;font-size:.82rem;cursor:pointer;}
.hero-stats{display:flex;gap:22px;flex-wrap:wrap;}
.stat-num{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;color:#b7e4c7;}
.stat-lbl{font-size:.67rem;color:rgba(255,255,255,.38);}
.hero-card{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:22px;backdrop-filter:blur(8px);}
.hc-title{font-family:'Syne',sans-serif;font-size:.93rem;font-weight:700;color:#fff;margin-bottom:12px;}
.sf{display:flex;background:#fff;border-radius:9px;overflow:hidden;margin-bottom:8px;}
.sf select,.sf input{border:none;padding:10px 11px;font-family:'DM Sans',sans-serif;font-size:.79rem;outline:none;background:transparent;color:#0d1f14;}
.sf select{background:#f0ece6;border-right:1px solid #e2ddd6;min-width:95px;}
.sf input::placeholder{color:#bbb;}
.sbtn{width:100%;background:var(--green);color:#fff;border:none;padding:10px;border-radius:9px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.82rem;cursor:pointer;margin-bottom:8px;}
.pop-row{display:flex;flex-wrap:wrap;gap:5px;align-items:center;}
.pop-lbl{font-size:.67rem;color:rgba(255,255,255,.38);}
.pop-tag{background:rgba(255,255,255,.07);color:rgba(255,255,255,.65);border:1px solid rgba(255,255,255,.13);padding:2px 8px;border-radius:50px;font-size:.67rem;cursor:pointer;}
.pop-tag:hover{background:rgba(255,255,255,.15);color:#fff;}
.sec{max-width:1200px;margin:0 auto;padding:28px 24px;}
.sec-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:17px;}
.sec-title{font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:800;color:var(--ink);letter-spacing:-.5px;}
.sec-link{font-size:.75rem;color:var(--green);font-weight:600;cursor:pointer;border-bottom:1px solid var(--green-light);}
.prod-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;}
.prod-card{background:var(--surface);border-radius:11px;overflow:hidden;cursor:pointer;transition:all .25s;border:1px solid var(--border);}
.prod-card:hover{transform:translateY(-4px);box-shadow:0 9px 24px rgba(26,107,58,.11);}
.prod-img{width:100%;height:155px;display:flex;align-items:center;justify-content:center;font-size:3rem;background:var(--surface2);position:relative;overflow:hidden;}
.prod-img img{width:100%;height:100%;object-fit:cover;}
.pbadge-r{position:absolute;top:7px;left:7px;background:var(--red);color:#fff;font-size:.58rem;font-weight:700;padding:2px 6px;border-radius:50px;}
.pbadge-y{position:absolute;top:7px;right:7px;background:var(--yellow);color:#0d1f14;font-size:.58rem;font-weight:700;padding:2px 6px;border-radius:50px;}
.wish-btn{position:absolute;bottom:6px;right:6px;width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,.88);border:none;cursor:pointer;font-size:.73rem;display:flex;align-items:center;justify-content:center;}
.escrow-badge{position:absolute;bottom:6px;left:6px;background:var(--green);color:#fff;font-size:.55rem;font-weight:700;padding:2px 5px;border-radius:50px;}
.prod-info{padding:10px;}
.prod-name{font-size:.78rem;font-weight:500;color:var(--ink);margin-bottom:2px;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;height:2.1em;}
.prod-loc{font-size:.64rem;color:var(--gray);margin-bottom:5px;}
.prod-rating{display:flex;align-items:center;gap:3px;margin-bottom:7px;}
.stars{color:var(--gold);font-size:.68rem;}.rcount{font-size:.63rem;color:var(--gray);}
.prod-price-row{display:flex;align-items:center;justify-content:space-between;}
.price{font-family:'Syne',sans-serif;font-size:.95rem;font-weight:700;color:var(--green);}
.price-unit{font-size:.62rem;color:var(--gray);font-family:'DM Sans',sans-serif;font-weight:400;}
.price-old{font-size:.66rem;color:var(--gray);text-decoration:line-through;display:block;opacity:.6;}
.add-btn{background:var(--green);color:#fff;border:none;width:25px;height:25px;border-radius:6px;font-size:.9rem;cursor:pointer;display:flex;align-items:center;justify-content:center;}
.loading{display:flex;align-items:center;justify-content:center;padding:48px;color:var(--gray);gap:10px;font-size:.9rem;}
.spinner{width:28px;height:28px;border:3px solid var(--border);border-top-color:var(--green);border-radius:50%;animation:spin .7s linear infinite;}
@keyframes spin{to{transform:rotate(360deg);}}
.empty-state{text-align:center;padding:48px;color:var(--gray);}
.empty-icon{font-size:3rem;margin-bottom:12px;}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.58);z-index:500;display:flex;align-items:center;justify-content:center;padding:16px;}
.modal{background:var(--surface);border-radius:16px;padding:24px;width:100%;max-width:440px;position:relative;border:1px solid var(--border);max-height:90vh;overflow-y:auto;}
.modal-close{position:absolute;top:12px;right:12px;background:var(--surface2);border:none;width:28px;height:28px;border-radius:7px;cursor:pointer;font-size:.9rem;display:flex;align-items:center;justify-content:center;color:var(--gray);}
.modal-title{font-family:'Syne',sans-serif;font-size:1.2rem;font-weight:800;color:var(--ink);margin-bottom:3px;letter-spacing:-.5px;}
.modal-sub{font-size:.79rem;color:var(--gray);margin-bottom:18px;}
.auth-tabs{display:flex;background:var(--surface2);border-radius:8px;padding:3px;margin-bottom:16px;}
.auth-tab{flex:1;padding:7px;border-radius:6px;border:none;background:transparent;font-family:'DM Sans',sans-serif;font-size:.79rem;font-weight:500;cursor:pointer;color:var(--gray);}
.auth-tab.active{background:var(--surface);color:var(--ink);font-weight:600;box-shadow:0 1px 4px var(--shadow);}
.role-selector{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:15px;}
.role-card{border:2px solid var(--border);border-radius:10px;padding:12px;cursor:pointer;transition:all .2s;text-align:center;background:var(--surface);}
.role-card.selected{border-color:var(--green);background:var(--green-pale);}
.role-card h4{font-size:.82rem;font-weight:600;color:var(--ink);margin-top:5px;}
.role-card p{font-size:.69rem;color:var(--gray);margin-top:2px;}
.form-group{display:flex;flex-direction:column;gap:4px;margin-bottom:11px;}
.form-label{font-size:.73rem;font-weight:600;color:var(--ink);}
.form-input,.form-select{border:1.5px solid var(--border);border-radius:8px;padding:9px 10px;font-family:'DM Sans',sans-serif;font-size:.81rem;color:var(--ink);outline:none;transition:border-color .2s;background:var(--surface);}
.form-input:focus,.form-select:focus{border-color:var(--green);}
.form-textarea{border:1.5px solid var(--border);border-radius:8px;padding:9px 10px;font-family:'DM Sans',sans-serif;font-size:.81rem;color:var(--ink);outline:none;transition:border-color .2s;background:var(--surface);resize:vertical;min-height:72px;width:100%;}
.form-textarea:focus{border-color:var(--green);}
.form-submit{width:100%;background:var(--green);color:#fff;border:none;padding:11px;border-radius:9px;font-family:'Syne',sans-serif;font-weight:700;font-size:.85rem;cursor:pointer;transition:all .2s;margin-top:5px;}
.form-submit:hover{background:#0f4a28;}
.divider{display:flex;align-items:center;gap:8px;margin:11px 0;color:var(--gray);font-size:.72rem;}
.divider::before,.divider::after{content:'';flex:1;height:1px;background:var(--border);}
.social-btn{width:100%;background:var(--surface2);border:1.5px solid var(--border);border-radius:8px;padding:9px;font-family:'DM Sans',sans-serif;font-size:.79rem;cursor:pointer;color:var(--ink);display:flex;align-items:center;justify-content:center;gap:7px;}
.success-msg{background:var(--green-pale);border:1px solid #c0ecd0;border-radius:10px;padding:14px;text-align:center;color:var(--green);font-weight:600;font-size:.85rem;}
.error-msg{background:#f8d7da;border:1px solid #f5c6cb;border-radius:10px;padding:11px;text-align:center;color:#721c24;font-size:.8rem;margin-bottom:12px;}
.trust{background:${dark?"#0a1410":"#0d1f14"};padding:18px 24px;}
.trust-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:11px;}
.ti{display:flex;align-items:center;gap:10px;color:rgba(255,255,255,.7);}
.ti-icon{font-size:1.6rem;}.ti h4{font-size:.78rem;font-weight:600;color:#fff;margin-bottom:1px;}.ti p{font-size:.66rem;opacity:.42;}
.dash-layout{display:grid;grid-template-columns:200px 1fr;gap:0;min-height:75vh;max-width:1200px;margin:22px auto;padding:0 24px;}
.dash-sidebar{background:var(--surface);border-radius:13px;padding:18px;border:1px solid var(--border);height:fit-content;position:sticky;top:88px;}
.dash-avatar{width:56px;height:56px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.6rem;margin:0 auto 8px;}
.dash-name{font-family:'Syne',sans-serif;font-weight:800;font-size:.9rem;text-align:center;color:var(--ink);}
.dash-role{font-size:.7rem;color:var(--green);text-align:center;font-weight:600;margin-bottom:14px;}
.dash-nav{display:flex;flex-direction:column;gap:2px;}
.dash-nav-item{display:flex;align-items:center;gap:7px;padding:8px 11px;border-radius:8px;cursor:pointer;font-size:.8rem;color:var(--gray);font-weight:500;transition:all .2s;}
.dash-nav-item:hover{background:var(--surface2);color:var(--ink);}
.dash-nav-item.active{background:var(--green-pale);color:var(--green);font-weight:600;}
.dash-content{padding-left:18px;}
.dash-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:11px;margin-bottom:20px;}
.dstat{background:var(--surface);border:1px solid var(--border);border-radius:11px;padding:15px;}
.dstat-icon{font-size:1.3rem;margin-bottom:6px;}
.dstat-val{font-family:'Syne',sans-serif;font-size:1.35rem;font-weight:800;color:var(--ink);}
.dstat-lbl{font-size:.7rem;color:var(--gray);margin-top:2px;}
.dstat-trend{font-size:.66rem;color:var(--green);font-weight:600;margin-top:3px;}
.prod-form{background:var(--surface);border:1px solid var(--border);border-radius:13px;padding:22px;margin-bottom:20px;}
.pf-title{font-family:'Syne',sans-serif;font-weight:800;font-size:1rem;color:var(--ink);margin-bottom:16px;}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-bottom:11px;}
.form-group.full{grid-column:1/-1;}
.img-upload{border:2px dashed var(--border);border-radius:9px;padding:20px;text-align:center;cursor:pointer;transition:all .2s;}
.img-upload:hover{border-color:var(--green);background:var(--green-pale);}
.img-preview{width:100%;max-height:120px;object-fit:contain;border-radius:8px;margin-top:8px;}
.order-card{background:var(--surface);border:1px solid var(--border);border-radius:11px;padding:14px;margin-bottom:10px;display:flex;align-items:center;gap:14px;}
.oc-emoji{width:44px;height:44px;background:var(--surface2);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0;}
.oc-info{flex:1;}
.oc-name{font-size:.84rem;font-weight:600;color:var(--ink);margin-bottom:2px;}
.oc-meta{font-size:.7rem;color:var(--gray);}
.status-badge{padding:3px 8px;border-radius:50px;font-size:.64rem;font-weight:700;}
.s-pending{background:#fff3cd;color:#856404;}
.s-paid{background:#d4edda;color:#1a6b3a;}
.s-shipped{background:#cce5ff;color:#004085;}
.s-delivered{background:#d4edda;color:#1a6b3a;}
.s-dispute{background:#f8d7da;color:#721c24;}
.s-cancelled{background:#e2e3e5;color:#383d41;}
.chat-container{background:var(--surface);border:1px solid var(--border);border-radius:13px;overflow:hidden;height:420px;display:flex;flex-direction:column;}
.chat-header{background:var(--green);padding:12px 16px;display:flex;align-items:center;gap:9px;}
.chat-header-info h4{font-size:.85rem;font-weight:600;color:#fff;}
.chat-header-info p{font-size:.68rem;color:rgba(255,255,255,.6);}
.chat-messages{flex:1;overflow-y:auto;padding:14px;}
.chat-msg{margin-bottom:10px;display:flex;flex-direction:column;}
.chat-msg.me{align-items:flex-end;}
.chat-bubble{background:var(--surface2);padding:8px 11px;border-radius:11px 11px 3px 11px;font-size:.79rem;color:var(--ink);max-width:75%;line-height:1.45;}
.chat-msg.me .chat-bubble{background:var(--green);color:#fff;border-radius:11px 11px 11px 3px;}
.chat-time{font-size:.6rem;color:var(--gray);margin-top:2px;}
.chat-blocked{background:#f8d7da;border:1px solid #f5c6cb;border-radius:8px;padding:8px 12px;font-size:.75rem;color:#721c24;margin:6px 0;text-align:center;}
.chat-input-row{padding:10px;border-top:1px solid var(--border);display:flex;gap:7px;}
.chat-input{flex:1;border:1.5px solid var(--border);border-radius:8px;padding:8px 11px;font-family:'DM Sans',sans-serif;font-size:.81rem;outline:none;background:var(--surface);color:var(--ink);}
.chat-input:focus{border-color:var(--green);}
.chat-send{background:var(--green);color:#fff;border:none;width:34px;height:34px;border-radius:8px;cursor:pointer;font-size:.95rem;display:flex;align-items:center;justify-content:center;}
.cart-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:350;opacity:0;pointer-events:none;transition:opacity .3s;}
.cart-overlay.open{opacity:1;pointer-events:all;}
.cart-drawer{position:fixed;top:0;right:0;width:min(380px,100vw);height:100vh;background:var(--surface);z-index:351;transform:translateX(100%);transition:transform .35s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;box-shadow:-4px 0 28px rgba(0,0,0,.13);}
.cart-drawer.open{transform:none;}
.cart-header{padding:15px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.cart-title{font-family:'Syne',sans-serif;font-weight:800;font-size:.98rem;color:var(--ink);}
.cart-close{background:var(--surface2);border:none;width:28px;height:28px;border-radius:7px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--gray);}
.cart-items{flex:1;overflow-y:auto;padding:12px 18px;}
.cart-item{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);}
.ci-emoji{width:42px;height:42px;background:var(--surface2);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0;overflow:hidden;}
.ci-emoji img{width:100%;height:100%;object-fit:cover;}
.ci-info{flex:1;}
.ci-name{font-size:.77rem;font-weight:500;color:var(--ink);margin-bottom:2px;}
.ci-price{font-family:'Syne',sans-serif;font-size:.84rem;font-weight:700;color:var(--green);}
.ci-qty{display:flex;align-items:center;gap:6px;margin-top:4px;}
.qty-btn{width:22px;height:22px;border:1.5px solid var(--border);background:var(--surface);border-radius:5px;cursor:pointer;font-size:.84rem;display:flex;align-items:center;justify-content:center;color:var(--ink);}
.qty-btn:hover{border-color:var(--green);color:var(--green);}
.qty-val{font-size:.77rem;font-weight:600;min-width:16px;text-align:center;color:var(--ink);}
.ci-del{background:none;border:none;cursor:pointer;font-size:.88rem;color:var(--gray);}
.cart-footer{padding:14px 18px;border-top:1px solid var(--border);}
.cart-note{border-radius:8px;padding:8px 10px;display:flex;align-items:center;gap:7px;margin-bottom:9px;font-size:.72rem;font-weight:500;}
.note-escrow{background:var(--green-pale);color:var(--green);}
.cart-total-row{display:flex;justify-content:space-between;margin-bottom:4px;font-size:.8rem;color:var(--ink);}
.cart-total-row.big{font-family:'Syne',sans-serif;font-size:.98rem;font-weight:800;}
.cart-checkout{width:100%;background:var(--green);color:#fff;border:none;padding:11px;border-radius:9px;font-family:'Syne',sans-serif;font-weight:700;font-size:.85rem;cursor:pointer;margin-top:7px;}
.notif-drawer{position:fixed;top:64px;right:16px;width:min(310px,calc(100vw - 32px));background:var(--surface);border-radius:12px;border:1px solid var(--border);box-shadow:0 6px 26px var(--shadow);z-index:400;overflow:hidden;}
.notif-header{padding:12px 14px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.notif-title{font-family:'Syne',sans-serif;font-weight:700;font-size:.86rem;color:var(--ink);}
.notif-clear{font-size:.69rem;color:var(--green);cursor:pointer;font-weight:600;}
.notif-list{max-height:290px;overflow-y:auto;}
.notif-item{padding:10px 14px;border-bottom:1px solid var(--border);display:flex;gap:9px;cursor:pointer;transition:background .2s;}
.notif-item:hover{background:var(--surface2);}
.notif-item.unread{background:var(--green-pale);}
.notif-icon{font-size:1.2rem;flex-shrink:0;}
.notif-body h4{font-size:.77rem;font-weight:600;color:var(--ink);margin-bottom:2px;}
.notif-body p{font-size:.69rem;color:var(--gray);line-height:1.4;}
.notif-time{font-size:.62rem;color:var(--gray);margin-top:2px;}
.wa-float{position:fixed;bottom:20px;right:20px;z-index:500;display:flex;flex-direction:column;align-items:flex-end;gap:8px;}
.wa-btn{width:48px;height:48px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 16px rgba(37,211,102,.38);border:none;font-size:1.4rem;transition:all .25s;position:relative;}
.wa-btn:hover{transform:scale(1.1);}
.wa-pulse{position:absolute;width:48px;height:48px;background:#25D366;border-radius:50%;animation:waPulse 2s infinite;opacity:.3;}
@keyframes waPulse{0%{transform:scale(1);opacity:.3;}70%{transform:scale(1.65);opacity:0;}100%{opacity:0;}}
.wa-card{background:var(--surface);border-radius:12px;padding:13px;box-shadow:0 5px 22px var(--shadow);border:1px solid var(--border);min-width:214px;}
.wa-card-title{font-family:'Syne',sans-serif;font-weight:700;font-size:.82rem;color:var(--ink);margin-bottom:2px;}
.wa-card-sub{font-size:.69rem;color:var(--gray);margin-bottom:9px;}
.wa-link{display:flex;align-items:center;gap:6px;padding:8px 11px;border-radius:8px;text-decoration:none;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.77rem;transition:all .2s;margin-bottom:5px;cursor:pointer;border:none;width:100%;}
.wa-link-green{background:#25D366;color:#fff;}
.wa-link-ghost{background:var(--surface2);color:var(--ink);border:1.5px solid var(--border);}
.footer{background:${dark?"#060d09":"#0a1a10"};color:rgba(255,255,255,.44);padding:34px 24px 18px;margin-top:32px;}
.footer-grid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:2.5fr 1fr 1fr 1fr;gap:30px;margin-bottom:24px;}
.footer-logo{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;color:#b7e4c7;margin-bottom:7px;letter-spacing:-1px;}
.footer-logo span{color:var(--red);}
.footer-desc{font-size:.73rem;line-height:1.8;margin-bottom:10px;}
.footer-contact{font-size:.71rem;color:rgba(255,255,255,.34);display:flex;flex-direction:column;gap:3px;}
.footer-col h4{color:#fff;font-size:.75rem;font-weight:600;margin-bottom:10px;}
.footer-col ul{list-style:none;}
.footer-col ul li{font-size:.71rem;margin-bottom:7px;cursor:pointer;transition:color .2s;}
.footer-col ul li:hover{color:#b7e4c7;}
.footer-bottom{max-width:1200px;margin:0 auto;padding-top:14px;border-top:1px solid rgba(255,255,255,.07);display:flex;justify-content:space-between;font-size:.66rem;align-items:center;flex-wrap:wrap;gap:8px;}
.fb-badges{display:flex;gap:5px;flex-wrap:wrap;}
.fbb{background:rgba(255,255,255,.05);padding:2px 7px;border-radius:4px;font-size:.62rem;}
.newsletter{background:linear-gradient(135deg,var(--green),#27a85a);border-radius:14px;padding:26px;text-align:center;margin:0 24px 26px;}
.nl-title{font-family:'Syne',sans-serif;font-size:1.2rem;font-weight:800;color:#fff;margin-bottom:5px;}
.nl-sub{font-size:.82rem;color:rgba(255,255,255,.68);margin-bottom:16px;}
.nl-form{display:flex;max-width:380px;margin:0 auto;gap:7px;}
.nl-input{flex:1;border:none;border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:.82rem;outline:none;}
.nl-btn{background:var(--yellow);color:#0d1f14;border:none;padding:9px 16px;border-radius:8px;font-family:'Syne',sans-serif;font-weight:700;font-size:.79rem;cursor:pointer;}
.mobile-nav{display:none;position:fixed;bottom:0;left:0;right:0;background:var(--surface);border-top:1px solid var(--border);padding:8px 0 12px;z-index:400;box-shadow:0 -4px 20px var(--shadow);}
.mn-inner{display:flex;justify-content:space-around;align-items:center;}
.mn-item{display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;padding:4px 12px;border-radius:8px;transition:all .2s;position:relative;}
.mn-item.active .mn-icon,.mn-item.active .mn-label{color:var(--green);}
.mn-icon{font-size:1.25rem;color:var(--gray);}
.mn-label{font-size:.6rem;color:var(--gray);font-weight:500;}
.mn-badge{position:absolute;top:2px;right:6px;background:var(--red);color:#fff;border-radius:50%;width:14px;height:14px;font-size:.5rem;font-weight:700;display:flex;align-items:center;justify-content:center;}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:none;}}
.anim{animation:fadeUp .35s ease both;}
@media(max-width:768px){
  .topbar{display:none;}
  .navbar{padding:0 14px;height:56px;}
  .nav-search select{display:none;}
  .btn-ghost,.btn-green,.btn-red,.dark-toggle{display:none;}
  .hero-inner{grid-template-columns:1fr;}
  .hero-card{display:none;}
  .prod-grid{grid-template-columns:repeat(2,1fr);}
  .trust-inner{grid-template-columns:repeat(2,1fr);}
  .footer-grid{grid-template-columns:1fr 1fr;}
  .dash-layout{grid-template-columns:1fr;padding:0 14px;}
  .dash-sidebar{display:none;}
  .dash-content{padding-left:0;}
  .dash-stats{grid-template-columns:repeat(2,1fr);}
  .mobile-nav{display:block;}
  .wa-float{bottom:70px;}
  .form-row{grid-template-columns:1fr;}
}
`;

const CATS = ["Téléphones","Mode","Alimentation","Maison","Agricole","Beauté","BTP","Automobile","Éducation"];
const CITIES = ["Toutes les villes","Douala","Yaoundé","Bafoussam","Bamenda","Garoua","Kribi","Ngaoundéré"];
const WA_URL = `https://wa.me/237696565654?text=${encodeURIComponent("Bonjour Yorix ! J'ai besoin d'aide.")}`;

export default function Yorix() {
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auth
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const [role, setRole] = useState("client");
  const [authForm, setAuthForm] = useState({ nom:"", email:"", tel:"", password:"" });
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Produits
  const [produits, setProduits] = useState([]);
  const [produitsLoading, setProduitsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("Douala");

  // Panier
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Notifications
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState([]);

  // Dashboard
  const [dashTab, setDashTab] = useState("overview");
  const [mesCommandes, setMesCommandes] = useState([]);
  const [mesProduits, setMesProduits] = useState([]);
  const [wallet, setWallet] = useState({ solde: 0, totalGagne: 0 });

  // Formulaire produit
  const [prodForm, setProdForm] = useState({ name_fr:"", description_fr:"", prix:"", stock:"", categorie:"", ville:"", escrow:true });
  const [prodImage, setProdImage] = useState(null);
  const [prodImagePreview, setProdImagePreview] = useState(null);
  const [prodSaving, setProdSaving] = useState(false);
  const [prodSaved, setProdSaved] = useState(false);

  // Chat
  const [chatMessages, setChatMessages] = useState([
    { text:"Bonjour ! Comment puis-je vous aider ?", me:false, time:"10:02" },
  ]);
  const [chatMsg, setChatMsg] = useState("");
  const [chatBlocked, setChatBlocked] = useState(false);
  const chatEndRef = useRef(null);

  // WhatsApp
  const [waOpen, setWaOpen] = useState(false);

  // Newsletter
  const [nlEmail, setNlEmail] = useState("");
  const [nlSent, setNlSent] = useState(false);

  // Wishlist
  const [wishlist, setWishlist] = useState(new Set());

  // ── OBSERVER CONNEXION ──
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const userDoc = await getDoc(doc(db, "users", u.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
        // Charger notifications
        const nq = query(
          collection(db, "notifications"),
          where("userId", "==", u.uid),
          orderBy("createdAt", "desc"),
          limit(10)
        );
        onSnapshot(nq, (snap) => {
          const n = [];
          snap.forEach(d => n.push({ id: d.id, ...d.data() }));
          setNotifs(n);
        });
      } else {
        setUserData(null);
        setNotifs([]);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // ── CHARGER PRODUITS FIREBASE ──
  useEffect(() => {
    setProduitsLoading(true);
    const q = query(
      collection(db, "products"),
      where("actif", "==", true),
      orderBy("createdAt", "desc"),
      limit(20)
    );
    const unsub = onSnapshot(q, (snap) => {
      const p = [];
      snap.forEach(d => p.push({ id: d.id, ...d.data() }));
      setProduits(p);
      setProduitsLoading(false);
    }, () => {
      setProduitsLoading(false);
    });
    return () => unsub();
  }, []);

  // ── CHARGER COMMANDES & PRODUITS VENDEUR ──
  useEffect(() => {
    if (!user || !userData) return;
    // Mes commandes
    const cq = query(
      collection(db, "orders"),
      where("clientId", "==", user.uid),
      orderBy("createdAt", "desc"),
      limit(10)
    );
    const unsub1 = onSnapshot(cq, (snap) => {
      const c = [];
      snap.forEach(d => c.push({ id: d.id, ...d.data() }));
      setMesCommandes(c);
    });
    // Mes produits (si vendeur)
    if (userData.role === "vendeur") {
      const pq = query(
        collection(db, "products"),
        where("vendeurId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const unsub2 = onSnapshot(pq, (snap) => {
        const p = [];
        snap.forEach(d => p.push({ id: d.id, ...d.data() }));
        setMesProduits(p);
      });
      // Wallet
      getDoc(doc(db, "wallets", user.uid)).then(d => {
        if (d.exists()) setWallet(d.data());
      });
      return () => { unsub1(); unsub2(); };
    }
    return () => unsub1();
  }, [user, userData]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // ── NAVIGATION ──
  const goPage = (p) => { setPage(p); window.scrollTo(0, 0); setCartOpen(false); setNotifOpen(false); };

  // ── CONNEXION ──
  const doLogin = async () => {
    setAuthError(""); setAuthLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, authForm.email, authForm.password);
      const d = await getDoc(doc(db, "users", cred.user.uid));
      setUserData(d.data());
      setAuthOpen(false);
    } catch (e) {
      setAuthError("Email ou mot de passe incorrect.");
    }
    setAuthLoading(false);
  };

  // ── INSCRIPTION ──
  const doRegister = async () => {
    setAuthError(""); setAuthLoading(true);
    try {
      if (!authForm.nom || !authForm.email || !authForm.password || !authForm.tel) {
        throw new Error("Tous les champs sont obligatoires.");
      }
      const cred = await createUserWithEmailAndPassword(auth, authForm.email, authForm.password);
      await updateProfile(cred.user, { displayName: authForm.nom });
      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        nom: authForm.nom,
        email: authForm.email,
        telephone: authForm.tel,
        role,
        langue: "fr",
        actif: true,
        verifie: false,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        note: 0,
        nombreAvis: 0,
        totalCommandes: 0,
      });
      await setDoc(doc(db, "wallets", cred.user.uid), {
        userId: cred.user.uid,
        solde: 0,
        totalGagne: 0,
        devise: "FCFA",
        createdAt: serverTimestamp()
      });
      const d = await getDoc(doc(db, "users", cred.user.uid));
      setUserData(d.data());
      setAuthOpen(false);
    } catch (e) {
      setAuthError(e.message.includes("email-already-in-use") ? "Cet email est déjà utilisé." : e.message);
    }
    setAuthLoading(false);
  };

  // ── CONNEXION GOOGLE ──
  const doGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const u = result.user;
      const d = await getDoc(doc(db, "users", u.uid));
      if (!d.exists()) {
        await setDoc(doc(db, "users", u.uid), {
          uid: u.uid, nom: u.displayName, email: u.email,
          telephone: null, role: "client", langue: "fr",
          actif: true, verifie: true,
          createdAt: serverTimestamp(), lastLogin: serverTimestamp(),
          note: 0, nombreAvis: 0, totalCommandes: 0,
        });
        await setDoc(doc(db, "wallets", u.uid), {
          userId: u.uid, solde: 0, totalGagne: 0,
          devise: "FCFA", createdAt: serverTimestamp()
        });
      }
      const ud = await getDoc(doc(db, "users", u.uid));
      setUserData(ud.data());
      setAuthOpen(false);
    } catch (e) {
      setAuthError(e.message);
    }
  };

  // ── DÉCONNEXION ──
  const doLogout = async () => {
    await signOut(auth);
    setUserData(null);
    goPage("home");
  };

  // ── AJOUTER PRODUIT (VENDEUR) ──
  const sauvegarderProduit = async () => {
    if (!user || userData?.role !== "vendeur") return;
    if (!prodForm.name_fr || !prodForm.prix) {
      alert("Nom et prix sont obligatoires !"); return;
    }
    setProdSaving(true);
    try {
      let imageUrl = null;
      if (prodImage) {
        const imgRef = ref(storage, `produits/${user.uid}/${Date.now()}_${prodImage.name}`);
        const snap = await uploadBytes(imgRef, prodImage);
        imageUrl = await getDownloadURL(snap.ref);
      }
      await addDoc(collection(db, "products"), {
        name_fr: prodForm.name_fr,
        name_en: prodForm.name_en || prodForm.name_fr,
        description_fr: prodForm.description_fr || "",
        prix: Number(prodForm.prix),
        stock: Number(prodForm.stock || 0),
        categorie: prodForm.categorie || "Autre",
        ville: prodForm.ville || "Douala",
        image: imageUrl,
        vendeurId: user.uid,
        vendeurNom: userData.nom,
        actif: true,
        sponsorise: false,
        escrow: prodForm.escrow !== false,
        local: true,
        vues: 0,
        clics: 0,
        venteTotal: 0,
        note: 0,
        nombreAvis: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setProdForm({ name_fr:"", description_fr:"", prix:"", stock:"", categorie:"", ville:"", escrow:true });
      setProdImage(null);
      setProdImagePreview(null);
      setProdSaved(true);
      setTimeout(() => setProdSaved(false), 3000);
    } catch (e) {
      alert("Erreur : " + e.message);
    }
    setProdSaving(false);
  };

  // ── PANIER ──
  const addToCart = (p) => {
    setCartItems(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) return prev.map(i => i.id === p.id ? {...i, qty: i.qty+1} : i);
      return [...prev, { id:p.id, name:p.name_fr, image:p.image, prix:p.prix, qty:1, vendeurId:p.vendeurId }];
    });
    setCartOpen(true);
  };
  const changeQty = (id, d) => setCartItems(prev => prev.map(i => i.id===id ? {...i, qty:Math.max(1,i.qty+d)} : i));
  const removeItem = (id) => setCartItems(prev => prev.filter(i => i.id !== id));
  const totalQty = cartItems.reduce((a,i) => a+i.qty, 0);
  const totalPrice = cartItems.reduce((a,i) => a+(i.prix*i.qty), 0);

  // ── COMMANDER ──
  const passerCommande = async () => {
    if (!user) { setAuthOpen(true); setCartOpen(false); return; }
    if (cartItems.length === 0) return;
    try {
      const commande = {
        clientId: user.uid,
        clientNom: userData?.nom || user.displayName,
        produits: cartItems.map(i => ({
          produitId: i.id, nom: i.name,
          prix: i.prix, quantite: i.qty,
          vendeurId: i.vendeurId
        })),
        total: totalPrice + 2500,
        sousTotal: totalPrice,
        fraisLivraison: 2500,
        commission: totalPrice * COMMISSION,
        status: "pending",
        paiementStatus: "en_attente",
        escrowActif: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await addDoc(collection(db, "orders"), commande);
      setCartItems([]);
      setCartOpen(false);
      alert("✅ Commande créée ! Procédez au paiement MTN MoMo.");
    } catch (e) {
      alert("Erreur : " + e.message);
    }
  };

  // ── CHAT ──
  const sendChat = () => {
    if (!chatMsg.trim()) return;
    const filtre = filtrerMsg(chatMsg);
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2,"0")}`;
    if (filtre.bloque) {
      setChatBlocked(true);
      setTimeout(() => setChatBlocked(false), 4000);
      setChatMsg("");
      return;
    }
    // Sauvegarder dans Firestore si connecté
    if (user) {
      addDoc(collection(db, "messages"), {
        expediteurId: user.uid,
        destinataireId: "support",
        texte: chatMsg,
        conversationId: `${user.uid}_support`,
        lu: false,
        createdAt: serverTimestamp()
      });
    }
    setChatMessages(prev => [...prev, { text:chatMsg, me:true, time }]);
    setChatMsg("");
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        text: "Merci pour votre message ! Un conseiller Yorix vous répond dans quelques minutes. ⚡",
        me: false, time
      }]);
    }, 1200);
  };

  // ── WISHLIST ──
  const toggleWish = (id) => setWishlist(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n;
  });

  // ── SUPPRIMER PRODUIT VENDEUR ──
  const supprimerProduit = async (produitId) => {
    if (!confirm("Supprimer ce produit ?")) return;
    await updateDoc(doc(db, "products", produitId), { actif: false });
  };

  const unread = notifs.filter(n => !n.lu).length;

  // ── FILTRER PRODUITS ──
  const produitsFiltres = produits.filter(p => {
    if (search && !p.name_fr?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (loading) {
    return (
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", fontFamily:"'DM Sans',sans-serif", color:"#1a6b3a", gap:12 }}>
        <div style={{ width:40, height:40, border:"4px solid #e2ddd6", borderTopColor:"#1a6b3a", borderRadius:"50%", animation:"spin .7s linear infinite" }}/>
        Chargement de Yorix...
        <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
      </div>
    );
  }

  const TABS = [
    {l:"🏠 Accueil",p:"home"},{l:"🛍️ Produits",p:"produits"},
    {l:"🚚 Livraison",p:"livraison"},{l:"🗺️ Suivi",p:"tracking"},
    {l:"🔐 Escrow",p:"escrow"},{l:"👷 Prestataires",p:"prestataires"},
    {l:"💼 Business",p:"business"},{l:"🎓 Academy",p:"academy"},
    {l:"📰 Blog",p:"blog"},{l:"🌟 Fidélité",p:"loyalty"},
    ...(user ? [{l:"📊 Mon espace",p:"dashboard"}] : []),
  ];

  return (
    <>
      <style>{makeCSS(dark)}</style>

      {/* ── AUTH MODAL ── */}
      {authOpen && (
        <div className="modal-overlay" onClick={e => e.target===e.currentTarget && setAuthOpen(false)}>
          <div className="modal">
            <button className="modal-close" onClick={() => setAuthOpen(false)}>✕</button>
            <div className="modal-title">{authTab==="login" ? "Bon retour !" : "Créer un compte"}</div>
            <p className="modal-sub">Votre marketplace camerounaise de confiance</p>
            <div className="auth-tabs">
              <button className={`auth-tab${authTab==="login"?" active":""}`} onClick={() => setAuthTab("login")}>Connexion</button>
              <button className={`auth-tab${authTab==="register"?" active":""}`} onClick={() => setAuthTab("register")}>Inscription</button>
            </div>
            {authError && <div className="error-msg">{authError}</div>}
            {authTab === "register" && (
              <>
                <p style={{fontSize:".73rem",fontWeight:600,color:"var(--ink)",marginBottom:8}}>Je suis :</p>
                <div className="role-selector">
                  {[{id:"client",icon:"🛍️",label:"Acheteur",desc:"Acheter des produits"},
                    {id:"vendeur",icon:"🏪",label:"Vendeur",desc:"Vendre mes produits"},
                    {id:"livreur",icon:"🚚",label:"Livreur",desc:"Livrer des commandes"}].map(r => (
                    <div key={r.id} className={`role-card${role===r.id?" selected":""}`} onClick={() => setRole(r.id)}>
                      <div style={{fontSize:"1.6rem"}}>{r.icon}</div><h4>{r.label}</h4><p>{r.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="form-group">
                  <label className="form-label">Nom complet *</label>
                  <input className="form-input" placeholder="Votre nom" value={authForm.nom} onChange={e => setAuthForm(f=>({...f,nom:e.target.value}))}/>
                </div>
                <div className="form-group">
                  <label className="form-label">Téléphone *</label>
                  <input className="form-input" placeholder="+237 6XX XXX XXX" value={authForm.tel} onChange={e => setAuthForm(f=>({...f,tel:e.target.value}))}/>
                </div>
              </>
            )}
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input className="form-input" type="email" placeholder="votre@email.com" value={authForm.email} onChange={e => setAuthForm(f=>({...f,email:e.target.value}))}/>
            </div>
            <div className="form-group">
              <label className="form-label">Mot de passe *</label>
              <input className="form-input" type="password" placeholder="••••••••" value={authForm.password} onChange={e => setAuthForm(f=>({...f,password:e.target.value}))}/>
            </div>
            <button className="form-submit" onClick={authTab==="login" ? doLogin : doRegister} disabled={authLoading}>
              {authLoading ? "⏳ Chargement..." : authTab==="login" ? "🔑 Se connecter" : "🚀 Créer mon compte"}
            </button>
            <div className="divider">ou</div>
            <button className="social-btn" onClick={doGoogle}>
              <span>🇬</span> Continuer avec Google
            </button>
          </div>
        </div>
      )}

      {/* ── CART DRAWER ── */}
      <div className={`cart-overlay${cartOpen?" open":""}`} onClick={() => setCartOpen(false)}/>
      <div className={`cart-drawer${cartOpen?" open":""}`}>
        <div className="cart-header">
          <span className="cart-title">🛒 Panier ({totalQty})</span>
          <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
        </div>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div style={{textAlign:"center",padding:"36px 0",color:"var(--gray)"}}>
              <div style={{fontSize:"2.4rem"}}>🛒</div><p>Panier vide</p>
            </div>
          ) : cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="ci-emoji">
                {item.image ? <img src={item.image} alt={item.name}/> : "📦"}
              </div>
              <div className="ci-info">
                <div className="ci-name">{item.name}</div>
                <div className="ci-price">{(item.prix*item.qty).toLocaleString()} FCFA</div>
                <div className="ci-qty">
                  <button className="qty-btn" onClick={() => changeQty(item.id,-1)}>−</button>
                  <span className="qty-val">{item.qty}</span>
                  <button className="qty-btn" onClick={() => changeQty(item.id,1)}>+</button>
                </div>
              </div>
              <button className="ci-del" onClick={() => removeItem(item.id)}>🗑️</button>
            </div>
          ))}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-note note-escrow">🔐 Paiement protégé Escrow Yorix</div>
            <div className="cart-total-row"><span>Sous-total</span><span>{totalPrice.toLocaleString()} FCFA</span></div>
            <div className="cart-total-row"><span>Livraison</span><span>2 500 FCFA</span></div>
            <div className="cart-total-row big"><span>Total</span><span>{(totalPrice+2500).toLocaleString()} FCFA</span></div>
            <button className="cart-checkout" onClick={passerCommande}>💳 Payer MTN MoMo / Orange</button>
          </div>
        )}
      </div>

      {/* ── NOTIFS ── */}
      {notifOpen && (
        <div className="notif-drawer">
          <div className="notif-header">
            <span className="notif-title">🔔 Notifications ({unread})</span>
            <span className="notif-clear" onClick={async () => {
              for (const n of notifs.filter(x=>!x.lu)) {
                await updateDoc(doc(db,"notifications",n.id), { lu:true });
              }
            }}>Tout lire</span>
          </div>
          <div className="notif-list">
            {notifs.length === 0 ? (
              <div style={{padding:"20px",textAlign:"center",color:"var(--gray)",fontSize:".8rem"}}>Aucune notification</div>
            ) : notifs.map(n => (
              <div key={n.id} className={`notif-item${!n.lu?" unread":""}`}
                onClick={() => updateDoc(doc(db,"notifications",n.id),{lu:true})}>
                <div className="notif-icon">{n.icon||"🔔"}</div>
                <div className="notif-body"><h4>{n.title||n.type}</h4><p>{n.message}</p><div className="notif-time">{n.createdAt?.toDate?.()?.toLocaleString?.("fr-FR")||""}</div></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TOPBAR ── */}
      <div className="topbar">
        <div className="topbar-l">
          <span className="flag-wrap"><div className="flag"><div className="fg"/><div className="fr"/><div className="fy"/></div>Cameroun · FCFA</span>
          <span>📞 +237 696 56 56 54</span><span>✉️ support@yorix.cm</span>
        </div>
        <div className="topbar-r">
          <span onClick={() => goPage("academy")}>🎓 Academy</span><span>|</span>
          <span onClick={() => goPage("business")}>💼 Business</span><span>|</span>
          <span onClick={() => goPage("blog")}>Blog</span>
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="logo-wrap" onClick={() => goPage("home")}>
          <div className="logo-txt">Yo<span>rix</span><sup>CM</sup></div>
        </div>
        <div className="nav-search">
          <select><option>Tout</option>{CATS.map(c=><option key={c}>{c}</option>)}</select>
          <input placeholder="Rechercher au Cameroun..." value={search} onChange={e => setSearch(e.target.value)}/>
          <button onClick={() => goPage("produits")}>🔍</button>
        </div>
        <div className="nav-actions">
          <select style={{background:"var(--surface2)",border:"1.5px solid var(--border)",padding:"7px 9px",borderRadius:8,fontFamily:"'DM Sans',sans-serif",fontSize:".74rem",color:"var(--gray)",cursor:"pointer",outline:"none"}}
            value={city} onChange={e => setCity(e.target.value)}>
            {CITIES.map(c=><option key={c}>{c}</option>)}
          </select>
          <button className="dark-toggle" onClick={() => setDark(d=>!d)}>{dark?"☀️":"🌙"}</button>
          <button className="icon-btn" onClick={() => { setNotifOpen(o=>!o); setCartOpen(false); }}>
            🔔{unread>0 && <span className="ibadge">{unread}</span>}
          </button>
          <button className="icon-btn" onClick={() => { setCartOpen(o=>!o); setNotifOpen(false); }}>
            🛒{totalQty>0 && <span className="ibadge">{totalQty}</span>}
          </button>
          {user ? (
            <>
              <div className="user-av" onClick={() => goPage("dashboard")}>
                {userData?.nom?.[0] || user.displayName?.[0] || "U"}
              </div>
              <button className="btn-ghost" onClick={doLogout}>Déco.</button>
            </>
          ) : (
            <>
              <button className="btn-ghost" onClick={() => { setAuthTab("login"); setAuthOpen(true); }}>Connexion</button>
              <button className="btn-green" onClick={() => { setAuthTab("register"); setAuthOpen(true); }}>S'inscrire</button>
            </>
          )}
          <button className="btn-red" onClick={() => goPage("inscription")}>+ Prestataire</button>
        </div>
      </nav>

      {/* ── TABS ── */}
      <div className="nav-tabs">
        {TABS.map(t => (
          <div key={t.l} className={`tab${page===t.p?" active":""}`} onClick={() => goPage(t.p)}>{t.l}</div>
        ))}
      </div>

      {/* ── PAY STRIP ── */}
      <div className="pay-strip">
        <b style={{color:"var(--ink)"}}>Paiement :</b>
        <div className="pay-methods">
          <span className="pm mtn-b">📱 MTN MoMo</span>
          <span className="pm ora-b">🔶 Orange Money</span>
          <span className="pm">💳 Carte</span>
          <span className="pm">💵 Cash</span>
        </div>
        <div className="strip-right">
          <span>🚚 J+1 Douala & Yaoundé</span>
          <span>🔐 Escrow disponible</span>
          {user && <span style={{color:"var(--gold)"}}>👤 {userData?.nom || user.displayName}</span>}
        </div>
      </div>

      {/* ══════════════════════════════════
          HOME
      ══════════════════════════════════ */}
      {page === "home" && (
        <div className="anim">
          <section className="hero">
            <div className="hero-inner">
              <div>
                <div className="hero-tag">🇨🇲 Marketplace #1 au Cameroun</div>
                <h1>Achetez, vendez,<br/><em>faites-vous servir</em><br/>avec Yorix</h1>
                <p className="hero-sub">Produits locaux & importés, prestataires vérifiés, livraison express, MTN MoMo & Orange Money.</p>
                <div className="hero-ctas">
                  <button className="cta-y" onClick={() => goPage("produits")}>🛍️ Voir les produits</button>
                  <button className="cta-w" onClick={() => { setAuthTab("register"); setAuthOpen(true); }}>🏪 Vendre sur Yorix</button>
                </div>
                <div className="hero-stats">
                  {[["85K+","Produits"],["12K","Vendeurs"],["3K","Prestataires"],["10","Régions"]].map(([n,l]) => (
                    <div key={l}><div className="stat-num">{n}</div><div className="stat-lbl">{l}</div></div>
                  ))}
                </div>
              </div>
              <div className="hero-card">
                <div className="hc-title">🔍 Recherche rapide</div>
                <div className="sf">
                  <select><option>Tout</option>{CATS.map(c=><option key={c}>{c}</option>)}</select>
                  <input placeholder="Produit, marque..." value={search} onChange={e=>setSearch(e.target.value)}/>
                </div>
                <div className="sf">
                  <select>{CITIES.map(c=><option key={c}>{c}</option>)}</select>
                  <input placeholder="Budget max (FCFA)"/>
                </div>
                <button className="sbtn" onClick={() => goPage("produits")}>🔍 Rechercher</button>
                <div className="pop-row">
                  <span className="pop-lbl">Tendances :</span>
                  {["Pagne wax","iPhone","Karité","BTP"].map(s => (
                    <span key={s} className="pop-tag" onClick={() => { setSearch(s); goPage("produits"); }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="sec">
            <div className="sec-head"><h2 className="sec-title">🔥 Produits récents</h2><span className="sec-link" onClick={() => goPage("produits")}>Voir tout →</span></div>
            {produitsLoading ? (
              <div className="loading"><div className="spinner"/>Chargement des produits...</div>
            ) : produits.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🛍️</div>
                <p>Aucun produit pour l'instant</p>
                {userData?.role === "vendeur" && <button className="form-submit" style={{width:"auto",padding:"10px 24px",marginTop:12}} onClick={() => { goPage("dashboard"); setDashTab("produits"); }}>+ Ajouter mon premier produit</button>}
              </div>
            ) : (
              <div className="prod-grid">
                {produits.slice(0,10).map(p => (
                  <div key={p.id} className="prod-card">
                    <div className="prod-img">
                      {p.image ? <img src={p.image} alt={p.name_fr}/> : <span style={{fontSize:"3rem"}}>📦</span>}
                      {p.sponsorise && <span className="pbadge-r">⭐ Sponsorisé</span>}
                      {p.local && <span className="pbadge-y">🇨🇲</span>}
                      {p.escrow && <span className="escrow-badge">🔐</span>}
                      <button className="wish-btn" onClick={() => toggleWish(p.id)}>{wishlist.has(p.id)?"❤️":"🤍"}</button>
                    </div>
                    <div className="prod-info">
                      <div className="prod-name">{p.name_fr}</div>
                      <div className="prod-loc">📍 {p.ville || "Cameroun"}</div>
                      <div className="prod-rating">
                        <span className="stars">{"★".repeat(Math.round(p.note||4))}{"☆".repeat(5-Math.round(p.note||4))}</span>
                        <span className="rcount">({p.nombreAvis||0})</span>
                      </div>
                      <div className="prod-price-row">
                        <span className="price">{p.prix?.toLocaleString()} <span className="price-unit">FCFA</span></span>
                        <button className="add-btn" onClick={() => addToCart(p)}>+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <div className="trust">
            <div className="trust-inner">
              {[{icon:"📱",t:"MTN MoMo & Orange",p:"Paiement mobile sécurisé"},
                {icon:"🔐",t:"Escrow Yorix",p:"Fonds protégés"},
                {icon:"🚚",t:"Livraison J+1",p:"Douala & Yaoundé"},
                {icon:"🌟",t:"Vendeurs vérifiés",p:"Boutiques certifiées"}].map(t => (
                <div key={t.t} className="ti"><div className="ti-icon">{t.icon}</div><div><h4>{t.t}</h4><p>{t.p}</p></div></div>
              ))}
            </div>
          </div>

          <div className="newsletter">
            <div className="nl-title">📬 Restez informé(e)</div>
            <p className="nl-sub">Les meilleures offres Yorix dans votre boîte mail.</p>
            {nlSent ? (
              <div style={{background:"rgba(255,255,255,.2)",borderRadius:8,padding:"9px 18px",color:"#fff",fontWeight:600}}>✅ Abonné(e) !</div>
            ) : (
              <div className="nl-form">
                <input className="nl-input" placeholder="Votre email..." value={nlEmail} onChange={e=>setNlEmail(e.target.value)}/>
                <button className="nl-btn" onClick={async () => {
                  if (nlEmail) {
                    await addDoc(collection(db,"newsletter"), { email:nlEmail, createdAt:serverTimestamp() });
                    setNlSent(true);
                  }
                }}>S'abonner 🚀</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          TOUS LES PRODUITS
      ══════════════════════════════════ */}
      {page === "produits" && (
        <section className="sec anim">
          <div className="sec-head">
            <h2 className="sec-title">🛍️ Tous les produits</h2>
            <span style={{fontSize:".8rem",color:"var(--gray)"}}>{produitsFiltres.length} produits</span>
          </div>
          {produitsLoading ? (
            <div className="loading"><div className="spinner"/>Chargement...</div>
          ) : produitsFiltres.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <p>Aucun produit trouvé{search ? ` pour "${search}"` : ""}</p>
            </div>
          ) : (
            <div className="prod-grid">
              {produitsFiltres.map(p => (
                <div key={p.id} className="prod-card">
                  <div className="prod-img">
                    {p.image ? <img src={p.image} alt={p.name_fr}/> : <span style={{fontSize:"3rem"}}>📦</span>}
                    {p.sponsorise && <span className="pbadge-r">⭐ Sponsorisé</span>}
                    {p.local && <span className="pbadge-y">🇨🇲</span>}
                    {p.escrow && <span className="escrow-badge">🔐</span>}
                    <button className="wish-btn" onClick={() => toggleWish(p.id)}>{wishlist.has(p.id)?"❤️":"🤍"}</button>
                  </div>
                  <div className="prod-info">
                    <div className="prod-name">{p.name_fr}</div>
                    <div className="prod-loc">📍 {p.ville} · {p.vendeurNom}</div>
                    <div className="prod-rating">
                      <span className="stars">{"★".repeat(Math.round(p.note||4))}</span>
                      <span className="rcount">({p.nombreAvis||0})</span>
                    </div>
                    <div className="prod-price-row">
                      <span className="price">{p.prix?.toLocaleString()} <span className="price-unit">FCFA</span></span>
                      <button className="add-btn" onClick={() => addToCart(p)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ══════════════════════════════════
          DASHBOARD
      ══════════════════════════════════ */}
      {page === "dashboard" && (
        user ? (
          <div className="dash-layout anim">
            <div className="dash-sidebar">
              <div className="dash-avatar">{userData?.nom?.[0] || "U"}</div>
              <div className="dash-name">{userData?.nom || user.displayName}</div>
              <div className="dash-role">
                {userData?.role === "vendeur" ? "🏪 Vendeur Yorix" :
                 userData?.role === "admin" ? "⚙️ Administrateur" :
                 userData?.role === "livreur" ? "🚚 Livreur" : "🛍️ Acheteur Yorix"}
              </div>
              <div className="dash-nav">
                {[
                  {icon:"📊",label:"Vue d'ensemble",id:"overview"},
                  {icon:"📦",label:"Mes commandes",id:"commandes"},
                  {icon:"💬",label:"Messages",id:"messages"},
                  ...(userData?.role==="vendeur"||userData?.role==="admin" ? [
                    {icon:"🏪",label:"Mes produits",id:"mesProduits"},
                    {icon:"➕",label:"Ajouter produit",id:"ajouterProduit"},
                    {icon:"💰",label:"Mon wallet",id:"wallet"},
                  ] : []),
                  ...(userData?.role==="admin" ? [
                    {icon:"👥",label:"Utilisateurs",id:"utilisateurs"},
                    {icon:"🚨",label:"Fraudes",id:"fraudes"},
                  ] : []),
                ].map(item => (
                  <div key={item.id} className={`dash-nav-item${dashTab===item.id?" active":""}`}
                    onClick={() => setDashTab(item.id)}>
                    {item.icon} {item.label}
                  </div>
                ))}
                <div className="dash-nav-item" onClick={doLogout} style={{color:"var(--red)",marginTop:8}}>
                  🚪 Déconnexion
                </div>
              </div>
            </div>

            <div className="dash-content">
              {/* VUE D'ENSEMBLE */}
              {dashTab === "overview" && (
                <>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.25rem",color:"var(--ink)",marginBottom:16,letterSpacing:"-.5px"}}>
                    Bonjour {userData?.nom || user.displayName} 👋
                  </div>
                  <div className="dash-stats">
                    {[
                      {icon:"📦",val:mesCommandes.length,lbl:"Commandes",trend:""},
                      {icon:"❤️",val:wishlist.size,lbl:"Favoris",trend:""},
                      ...(userData?.role==="vendeur" ? [
                        {icon:"🏪",val:mesProduits.length,lbl:"Mes produits",trend:""},
                        {icon:"💰",val:`${wallet.solde?.toLocaleString()||0} F`,lbl:"Wallet",trend:""},
                      ] : [
                        {icon:"🛒",val:totalQty,lbl:"Panier",trend:""},
                        {icon:"🌟",val:"320 pts",lbl:"Fidélité",trend:""},
                      ])
                    ].map(s => (
                      <div key={s.lbl} className="dstat">
                        <div className="dstat-icon">{s.icon}</div>
                        <div className="dstat-val">{s.val}</div>
                        <div className="dstat-lbl">{s.lbl}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".95rem",color:"var(--ink)",marginBottom:12}}>
                    Dernières commandes
                  </div>
                  {mesCommandes.length === 0 ? (
                    <div className="empty-state"><div className="empty-icon">📦</div><p>Aucune commande</p></div>
                  ) : mesCommandes.slice(0,5).map(c => (
                    <div key={c.id} className="order-card">
                      <div className="oc-emoji">📦</div>
                      <div className="oc-info">
                        <div className="oc-name">Commande #{c.id.slice(-6)}</div>
                        <div className="oc-meta">{c.total?.toLocaleString()} FCFA · {c.produits?.length} produit(s)</div>
                      </div>
                      <span className={`status-badge s-${c.status}`}>
                        {c.status==="pending"?"⏳ En attente":c.status==="paid"?"✅ Payée":c.status==="shipped"?"🚚 Expédiée":c.status==="delivered"?"✅ Livrée":"❌ Litige"}
                      </span>
                    </div>
                  ))}
                </>
              )}

              {/* AJOUTER PRODUIT (VENDEUR) */}
              {dashTab === "ajouterProduit" && (userData?.role==="vendeur"||userData?.role==="admin") && (
                <>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.25rem",color:"var(--ink)",marginBottom:16,letterSpacing:"-.5px"}}>
                    ➕ Ajouter un produit
                  </div>
                  {prodSaved && <div className="success-msg" style={{marginBottom:16}}>✅ Produit ajouté avec succès ! Il est visible sur la plateforme.</div>}
                  <div className="prod-form">
                    <div className="pf-title">📋 Informations du produit</div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Nom du produit (FR) *</label>
                        <input className="form-input" placeholder="Ex: iPhone 14 128GB" value={prodForm.name_fr} onChange={e=>setProdForm(f=>({...f,name_fr:e.target.value}))}/>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Nom du produit (EN)</label>
                        <input className="form-input" placeholder="Ex: iPhone 14 128GB" value={prodForm.name_en||""} onChange={e=>setProdForm(f=>({...f,name_en:e.target.value}))}/>
                      </div>
                      <div className="form-group full">
                        <label className="form-label">Description</label>
                        <textarea className="form-textarea" placeholder="Décrivez votre produit..." value={prodForm.description_fr} onChange={e=>setProdForm(f=>({...f,description_fr:e.target.value}))}/>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Prix (FCFA) *</label>
                        <input className="form-input" type="number" placeholder="Ex: 15000" value={prodForm.prix} onChange={e=>setProdForm(f=>({...f,prix:e.target.value}))}/>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Stock disponible</label>
                        <input className="form-input" type="number" placeholder="Ex: 10" value={prodForm.stock} onChange={e=>setProdForm(f=>({...f,stock:e.target.value}))}/>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Catégorie</label>
                        <select className="form-select" value={prodForm.categorie} onChange={e=>setProdForm(f=>({...f,categorie:e.target.value}))}>
                          <option value="">Choisir...</option>
                          {CATS.map(c=><option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Ville</label>
                        <select className="form-select" value={prodForm.ville} onChange={e=>setProdForm(f=>({...f,ville:e.target.value}))}>
                          <option value="">Choisir...</option>
                          {CITIES.filter(c=>c!=="Toutes les villes").map(c=><option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="form-group full">
                        <label className="form-label">Photo du produit</label>
                        <div className="img-upload" onClick={() => document.getElementById("imgInput").click()}>
                          {prodImagePreview ? (
                            <img src={prodImagePreview} className="img-preview" alt="preview"/>
                          ) : (
                            <>
                              <div style={{fontSize:"2rem",marginBottom:8}}>📸</div>
                              <div style={{fontSize:".8rem",color:"var(--gray)"}}>Cliquer pour choisir une photo</div>
                            </>
                          )}
                        </div>
                        <input id="imgInput" type="file" accept="image/*" style={{display:"none"}} onChange={e=>{
                          const file = e.target.files[0];
                          if (file) {
                            setProdImage(file);
                            setProdImagePreview(URL.createObjectURL(file));
                          }
                        }}/>
                      </div>
                      <div className="form-group full">
                        <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:".82rem",fontWeight:600,color:"var(--ink)"}}>
                          <input type="checkbox" checked={prodForm.escrow} onChange={e=>setProdForm(f=>({...f,escrow:e.target.checked}))}/>
                          🔐 Activer la protection Escrow pour ce produit
                        </label>
                      </div>
                    </div>
                    <button className="form-submit" onClick={sauvegarderProduit} disabled={prodSaving}>
                      {prodSaving ? "⏳ Sauvegarde en cours..." : "✅ Publier le produit"}
                    </button>
                  </div>
                </>
              )}

              {/* MES PRODUITS */}
              {dashTab === "mesProduits" && (
                <>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.25rem",color:"var(--ink)",marginBottom:16,letterSpacing:"-.5px"}}>
                    🏪 Mes produits ({mesProduits.length})
                  </div>
                  {mesProduits.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-icon">📦</div>
                      <p>Aucun produit ajouté</p>
                      <button className="form-submit" style={{width:"auto",padding:"10px 24px",marginTop:12}} onClick={()=>setDashTab("ajouterProduit")}>+ Ajouter un produit</button>
                    </div>
                  ) : (
                    <div className="prod-grid">
                      {mesProduits.map(p => (
                        <div key={p.id} className="prod-card">
                          <div className="prod-img">
                            {p.image ? <img src={p.image} alt={p.name_fr}/> : <span style={{fontSize:"3rem"}}>📦</span>}
                            {!p.actif && <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:".8rem",fontWeight:700}}>Désactivé</div>}
                          </div>
                          <div className="prod-info">
                            <div className="prod-name">{p.name_fr}</div>
                            <div className="prod-loc">👁 {p.vues||0} vues · 📦 Stock: {p.stock||0}</div>
                            <div className="prod-price-row">
                              <span className="price">{p.prix?.toLocaleString()} <span className="price-unit">FCFA</span></span>
                              <button style={{background:"var(--red)",color:"#fff",border:"none",width:25,height:25,borderRadius:6,fontSize:".85rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}
                                onClick={() => supprimerProduit(p.id)}>🗑</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* MESSAGES */}
              {dashTab === "messages" && (
                <>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.25rem",color:"var(--ink)",marginBottom:16,letterSpacing:"-.5px"}}>
                    💬 Messagerie Yorix
                  </div>
                  <div style={{background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:9,padding:"10px 14px",marginBottom:14,fontSize:".78rem",color:"var(--gray)"}}>
                    🔐 La messagerie Yorix est sécurisée. Tout partage de numéro de téléphone, email ou contact externe est automatiquement bloqué.
                  </div>
                  <div className="chat-container">
                    <div className="chat-header">
                      <div className="chat-header-info">
                        <h4>Support Yorix</h4>
                        <p><span style={{width:6,height:6,background:"#4fd17d",borderRadius:"50%",display:"inline-block",marginRight:4}}/>En ligne</p>
                      </div>
                    </div>
                    <div className="chat-messages">
                      {chatMessages.map((m,i) => (
                        <div key={i} className={`chat-msg${m.me?" me":""}`}>
                          <div className="chat-bubble">{m.text}</div>
                          <div className="chat-time">{m.time}</div>
                        </div>
                      ))}
                      {chatBlocked && <div className="chat-blocked">⚠️ Message bloqué : partage de contact externe interdit sur Yorix.</div>}
                      <div ref={chatEndRef}/>
                    </div>
                    <div className="chat-input-row">
                      <input className="chat-input" placeholder="Écrire un message..." value={chatMsg} onChange={e=>setChatMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()}/>
                      <button className="chat-send" onClick={sendChat}>➤</button>
                    </div>
                  </div>
                </>
              )}

              {/* WALLET */}
              {dashTab === "wallet" && (
                <>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.25rem",color:"var(--ink)",marginBottom:16,letterSpacing:"-.5px"}}>
                    💰 Mon Wallet
                  </div>
                  <div style={{background:"linear-gradient(135deg,#1a3a24,var(--green))",borderRadius:14,padding:22,color:"#fff",marginBottom:18}}>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".95rem",marginBottom:4}}>Solde disponible</div>
                    <div style={{fontFamily:"'Syne',sans-serif",fontSize:"2.2rem",fontWeight:800,color:"var(--yellow)"}}>{wallet.solde?.toLocaleString()||0} FCFA</div>
                    <div style={{fontSize:".75rem",opacity:.65,marginTop:4}}>Total gagné : {wallet.totalGagne?.toLocaleString()||0} FCFA</div>
                  </div>
                  <div style={{background:"var(--surface2)",border:"1.5px dashed var(--border)",borderRadius:11,padding:18,textAlign:"center",color:"var(--gray)"}}>
                    <div style={{fontSize:"1.6rem",marginBottom:8}}>📱</div>
                    <p style={{fontSize:".82rem"}}>Retrait disponible vers MTN MoMo et Orange Money bientôt disponible.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="empty-state anim" style={{padding:"60px 0"}}>
            <div className="empty-icon">🔐</div>
            <p>Connectez-vous pour accéder à votre espace</p>
            <button className="form-submit" style={{width:"auto",padding:"11px 28px",marginTop:16}} onClick={()=>setAuthOpen(true)}>
              Se connecter
            </button>
          </div>
        )
      )}

      {/* WHATSAPP FLOAT */}
      <div className="wa-float">
        {waOpen && (
          <div className="wa-card">
            <div className="wa-card-title">💬 Contacter Yorix</div>
            <div className="wa-card-sub">Support 7j/7 · Réponse rapide</div>
            <a href={WA_URL} target="_blank" rel="noreferrer" className="wa-link wa-link-green">📱 WhatsApp +237 696 56 56 54</a>
            <a href="tel:+237696565654" className="wa-link wa-link-ghost">📞 Appeler</a>
            <a href="mailto:support@yorix.cm" className="wa-link wa-link-ghost">✉️ support@yorix.cm</a>
          </div>
        )}
        <div style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div className="wa-pulse"/>
          <button className="wa-btn" onClick={() => setWaOpen(o=>!o)}>{waOpen?"✕":"💬"}</button>
        </div>
      </div>

      {/* MOBILE NAV */}
      <div className="mobile-nav">
        <div className="mn-inner">
          {[{icon:"🏠",label:"Accueil",p:"home"},{icon:"🛍️",label:"Produits",p:"produits"},
            {icon:"👷",label:"Prestataires",p:"prestataires"},
            {icon:"📊",label:"Mon espace",p:"dashboard"},
            {icon:"💬",label:"Chat",p:null}].map(item => (
            <div key={item.label} className={`mn-item${page===item.p?" active":""}`}
              onClick={() => item.p ? goPage(item.p) : setAuthOpen(true)}>
              <div className="mn-icon">{item.icon}</div>
              <div className="mn-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">Yo<span>rix</span> CM</div>
            <p className="footer-desc">La marketplace camerounaise complète — produits, prestataires, livraison, paiement MoMo sécurisé Escrow.</p>
            <div className="footer-contact">
              <span>📞 +237 696 56 56 54</span>
              <span>✉️ support@yorix.cm</span>
              <span>🇨🇲 Douala · Yaoundé · Bafoussam · et partout</span>
            </div>
          </div>
          <div className="footer-col"><h4>Marketplace</h4><ul>{["Tous les produits","Produits locaux 🇨🇲","Offres du jour","Devenir vendeur"].map(i=><li key={i}>{i}</li>)}</ul></div>
          <div className="footer-col"><h4>Services</h4><ul>{[{l:"Escrow 🔐",p:"escrow"},{l:"Livraison 🚚",p:"livraison"},{l:"Prestataires 👷",p:"prestataires"},{l:"Business 💼",p:"business"}].map(i=><li key={i.l} onClick={()=>goPage(i.p)}>{i.l}</li>)}</ul></div>
          <div className="footer-col"><h4>Aide</h4><ul>{["Centre d'aide","Payer avec MoMo","Suivi commande","Nous contacter"].map(i=><li key={i}>{i}</li>)}</ul></div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Yorix Cameroun — RC: DOUALA/2026/B237</span>
          <div className="fb-badges">
            <span className="fbb">📱 MTN MoMo</span>
            <span className="fbb">🔶 Orange Money</span>
            <span className="fbb">🔐 Escrow</span>
            <span className="fbb">🇨🇲 Made in CM</span>
          </div>
        </div>
      </footer>
    </>
  );
}
