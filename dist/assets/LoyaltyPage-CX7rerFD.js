import{j as e,M as K,O as Z,s as v,h as le,Y as ce,L as ee}from"./index-DV4zxhmt.js";import{r as i}from"./react-CDaM45aE.js";import"./supabase-D2gm834s.js";function de({pack:o,user:t,userData:p,onClose:l,onSuccess:d}){const[m,w]=i.useState((p==null?void 0:p.nom)||""),[f,C]=i.useState((p==null?void 0:p.telephone)||""),[s,k]=i.useState("momo"),[h,N]=i.useState(!1),[n,b]=i.useState({});if(!o)return null;const g=o.bonus_pct?Math.round(o.points*(o.bonus_pct/100)):0,u=o.points+g,F=o.prix_fcfa/u,A=()=>{const c={};return m.trim()||(c.nom="Nom obligatoire"),f.trim()||(c.tel="Téléphone obligatoire"),b(c),Object.keys(c).length===0},z=async()=>{if(A()){N(!0);try{const{data:c,error:_}=await v.from("loyalty_pack_purchases").insert({user_id:t.id,pack_id:o.id,pack_nom:o.nom,points:u,prix_fcfa:o.prix_fcfa,telephone:f,nom:m,moyen_paiement:s,status:"pending"}).select().single();if(_)throw _;const P=s==="momo"?K:Z,y=s==="momo"?"MTN Mobile Money":"Orange Money",q=["🌟 *ACHAT DE POINTS YORIX*","",`📦 *Pack :* ${o.nom} ${o.emoji}`,`⭐ *Points :* ${o.points}${g>0?` + ${g} bonus = *${u} pts*`:""}`,`💰 *Prix :* ${o.prix_fcfa.toLocaleString("fr-FR")} FCFA`,"",`💳 *Mode de paiement :* ${y}`,`📱 *Numéro :* ${P}`,"","👤 *Acheteur :*",`Nom : ${m}`,`Téléphone : ${f}`,`ID : ${c.id.slice(0,8)}`,"","✅ *Instructions :*",`1. J'effectue le paiement au ${P}`,"2. J'envoie la capture ici","3. Mes points sont crédités sous 1h","","Merci Yorix ! 🇨🇲"].join(`
`);window.open(`https://wa.me/${le}?text=${encodeURIComponent(q)}`,"_blank"),d==null||d(),l()}catch(c){alert("Erreur : "+c.message)}N(!1)}};return e.jsx("div",{className:"modal-overlay",onClick:c=>c.target===c.currentTarget&&l(),children:e.jsxs("div",{className:"modal",style:{maxWidth:460},children:[e.jsx("button",{className:"modal-close",onClick:l,children:"✕"}),e.jsxs("div",{style:{textAlign:"center",marginBottom:16},children:[e.jsx("div",{style:{fontSize:"3rem",marginBottom:4,background:o.color_bg,width:72,height:72,borderRadius:"50%",display:"inline-flex",alignItems:"center",justifyContent:"center"},children:o.emoji}),e.jsxs("div",{style:{fontFamily:"'Syne',sans-serif",fontSize:"1.25rem",fontWeight:800,color:"var(--ink)",marginTop:8},children:["Pack ",o.nom]})]}),e.jsxs("div",{style:{background:"var(--green-pale)",border:"1px solid var(--green-light)",borderRadius:11,padding:14,marginBottom:16},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:".82rem",marginBottom:4},children:[e.jsx("span",{style:{color:"var(--gray)"},children:"Points de base"}),e.jsxs("strong",{children:[o.points.toLocaleString("fr-FR")," pts"]})]}),g>0&&e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:".82rem",marginBottom:4},children:[e.jsxs("span",{style:{color:"var(--green)"},children:["🎁 Bonus (+",o.bonus_pct,"%)"]}),e.jsxs("strong",{style:{color:"var(--green)"},children:["+",g.toLocaleString("fr-FR")," pts"]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:".95rem",fontFamily:"'Syne',sans-serif",fontWeight:800,borderTop:"1px dashed var(--green-light)",paddingTop:6,marginTop:4,color:"var(--green)"},children:[e.jsx("span",{children:"TOTAL POINTS"}),e.jsxs("span",{children:[u.toLocaleString("fr-FR")," pts"]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:".95rem",fontFamily:"'Syne',sans-serif",fontWeight:800,marginTop:6,color:"var(--ink)"},children:[e.jsx("span",{children:"À PAYER"}),e.jsxs("span",{children:[o.prix_fcfa.toLocaleString("fr-FR")," FCFA"]})]}),e.jsxs("div",{style:{fontSize:".68rem",color:"var(--gray)",marginTop:4,textAlign:"center"},children:["Soit ",F.toFixed(1)," FCFA / point"]})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Nom complet ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:`form-input${n.nom?" error":""}`,value:m,onChange:c=>w(c.target.value),placeholder:"Raisa Kouekam"})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Téléphone ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:`form-input${n.tel?" error":""}`,value:f,onChange:c=>C(c.target.value),placeholder:"+237 6XX XXX XXX"})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Moyen de paiement ",e.jsx("span",{children:"*"})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:[e.jsxs("div",{onClick:()=>k("momo"),style:{border:`2px solid ${s==="momo"?"var(--green)":"var(--border)"}`,background:s==="momo"?"var(--green-pale)":"var(--surface)",borderRadius:10,padding:12,cursor:"pointer",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:"1.4rem",marginBottom:3},children:"📱"}),e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem"},children:"MTN MoMo"}),e.jsx("div",{style:{fontSize:".65rem",color:"var(--gray)"},children:K})]}),e.jsxs("div",{onClick:()=>k("orange"),style:{border:`2px solid ${s==="orange"?"var(--green)":"var(--border)"}`,background:s==="orange"?"var(--green-pale)":"var(--surface)",borderRadius:10,padding:12,cursor:"pointer",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:"1.4rem",marginBottom:3},children:"🔶"}),e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem"},children:"Orange Money"}),e.jsx("div",{style:{fontSize:".65rem",color:"var(--gray)"},children:Z})]})]})]}),e.jsx("button",{className:"form-submit",onClick:z,disabled:h,children:h?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"spinner",style:{width:16,height:16,borderWidth:2}}),"Traitement..."]}):`💳 Payer ${o.prix_fcfa.toLocaleString("fr-FR")} FCFA via WhatsApp`}),e.jsx("p",{style:{fontSize:".68rem",color:"var(--gray)",textAlign:"center",marginTop:8},children:"🔒 Paiement sécurisé · Points crédités sous 1h après confirmation"})]})})}function ye({reward:o,userPoints:t,user:p,onClose:l,onSuccess:d}){const[m,w]=i.useState(!1),[f,C]=i.useState(!1),[s,k]=i.useState("");if(!o)return null;const h=t>=o.cout_points,N=async()=>{if(h){w(!0);try{const n=`YX-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`,{error:b}=await v.from("loyalty_redemptions").insert({user_id:p.id,reward_id:o.id,reward_nom:o.nom,cout_points:o.cout_points,code:n,status:"validated",expire_at:new Date(Date.now()+90*24*60*60*1e3).toISOString()});if(b)throw b;const{error:g}=await v.rpc("add_loyalty_points",{p_user_id:p.id,p_points:-o.cout_points,p_type:"echange",p_description:`Échange : ${o.nom}`,p_reference_id:null,p_reference_type:"reward"});if(g)throw g;k(n),C(!0),d==null||d()}catch(n){alert("Erreur : "+n.message)}w(!1)}};return f?e.jsx("div",{className:"modal-overlay",onClick:n=>n.target===n.currentTarget&&l(),children:e.jsxs("div",{className:"modal",style:{maxWidth:440,textAlign:"center"},children:[e.jsx("button",{className:"modal-close",onClick:l,children:"✕"}),e.jsx("div",{style:{fontSize:"4rem",marginBottom:12},children:"🎉"}),e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.25rem",color:"var(--green)",marginBottom:8},children:"Échange réussi !"}),e.jsxs("p",{style:{color:"var(--gray)",fontSize:".85rem",marginBottom:18,lineHeight:1.6},children:["Votre récompense ",e.jsxs("strong",{style:{color:"var(--ink)"},children:['"',o.nom,'"']})," est activée."]}),e.jsxs("div",{style:{background:"var(--green-pale)",border:"2px dashed var(--green)",borderRadius:12,padding:16,marginBottom:16},children:[e.jsx("div",{style:{fontSize:".7rem",color:"var(--gray)",fontWeight:700,marginBottom:4},children:"VOTRE CODE UNIQUE"}),e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontSize:"1.35rem",fontWeight:800,color:"var(--green)",letterSpacing:"0.05em"},children:s}),e.jsx("button",{onClick:()=>{var n;return(n=navigator.clipboard)==null?void 0:n.writeText(s)},style:{marginTop:8,background:"var(--surface)",color:"var(--ink)",border:"1px solid var(--border)",borderRadius:7,padding:"5px 14px",fontSize:".72rem",fontWeight:600,cursor:"pointer"},children:"📋 Copier"})]}),e.jsx("p",{style:{fontSize:".72rem",color:"var(--gray)"},children:"Donnez ce code lors de votre prochain achat. Valable 90 jours."}),e.jsx("button",{className:"form-submit",style:{marginTop:14},onClick:()=>window.open(`https://wa.me/${ce}?text=${encodeURIComponent(`Bonjour Yorix ! J'ai échangé ma récompense "${o.nom}" avec le code ${s}`)}`,"_blank"),children:"📱 Activer sur WhatsApp"})]})}):e.jsx("div",{className:"modal-overlay",onClick:n=>n.target===n.currentTarget&&l(),children:e.jsxs("div",{className:"modal",style:{maxWidth:420},children:[e.jsx("button",{className:"modal-close",onClick:l,children:"✕"}),e.jsxs("div",{style:{textAlign:"center",marginBottom:14},children:[e.jsx("div",{style:{fontSize:"3rem",marginBottom:4,background:o.color_bg,width:72,height:72,borderRadius:"50%",display:"inline-flex",alignItems:"center",justifyContent:"center"},children:o.emoji}),e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontSize:"1.15rem",fontWeight:800,color:"var(--ink)",marginTop:8},children:o.nom}),o.description&&e.jsx("p",{style:{fontSize:".8rem",color:"var(--gray)",marginTop:6},children:o.description})]}),e.jsxs("div",{style:{background:"var(--surface2)",borderRadius:10,padding:14,marginBottom:14},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:".82rem"},children:[e.jsx("span",{style:{color:"var(--gray)"},children:"Coût"}),e.jsxs("strong",{style:{color:"var(--ink)"},children:[o.cout_points.toLocaleString("fr-FR")," pts"]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:".82rem"},children:[e.jsx("span",{style:{color:"var(--gray)"},children:"Mon solde actuel"}),e.jsxs("strong",{style:{color:"var(--ink)"},children:[t.toLocaleString("fr-FR")," pts"]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",borderTop:"1px dashed var(--border)",paddingTop:6,fontSize:".88rem",fontFamily:"'Syne',sans-serif",fontWeight:800,color:h?"var(--green)":"var(--red)"},children:[e.jsx("span",{children:"Après échange"}),e.jsxs("span",{children:[(t-o.cout_points).toLocaleString("fr-FR")," pts"]})]})]}),h?e.jsx("button",{className:"form-submit",onClick:N,disabled:m,children:m?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"spinner",style:{width:16,height:16,borderWidth:2}}),"Traitement..."]}):`✅ Confirmer l'échange (${o.cout_points} pts)`}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{background:"#fff0f0",border:"1px solid #fecaca",color:"#ce1126",borderRadius:8,padding:"10px 14px",fontSize:".78rem",textAlign:"center",marginBottom:10},children:["⚠️ Il vous manque ",e.jsx("strong",{children:(o.cout_points-t).toLocaleString("fr-FR")})," points"]}),e.jsx("button",{className:"form-submit",style:{background:"var(--yellow)",color:"#0d1f14"},onClick:l,children:"💰 Acheter des points"})]})]})})}const pe={bronze:"Bronze",argent:"Argent",or:"Or",platine:"Platine"},me=[{id:"bronze",label:"Bronze",emoji:"🥉",color:"#CD7F32",gradient:"linear-gradient(135deg, #CD7F32, #8B5A2B)",threshold:0,nextLabel:"Argent",pitch:"Démarrez le programme. Cumulez vos premiers points.",perks:["Cashback 1 pt / 500 FCFA","Bonus 50 pts à l'inscription","Accès aux promos membres"]},{id:"argent",label:"Argent",emoji:"🥈",color:"#9CA3AF",gradient:"linear-gradient(135deg, #C0C0C0, #808080)",threshold:500,nextLabel:"Or",pitch:"Profitez de réductions et de livraisons offertes.",perks:["Codes promo membres","Livraison offerte ponctuelle","Cashback boosté +10 %"]},{id:"or",label:"Or",emoji:"🥇",color:"#F59E0B",gradient:"linear-gradient(135deg, #FCD116, #B8860B)",threshold:1e3,nextLabel:"Platine",pitch:"Statut VIP : avantages exclusifs et offres anticipées.",perks:["Cashback boosté +25 %","Accès anticipé aux ventes","Bonus anniversaire VIP"]},{id:"platine",label:"Platine",emoji:"💎",color:"#7C3AED",gradient:"linear-gradient(135deg, #A78BFA, #5B21B6)",threshold:5e3,nextLabel:null,pitch:"Sommet du programme — service & avantages exclusifs.",perks:["Conciergerie Yorix dédiée","Cashback maximal +40 %","Cadeaux & invitations VIP"]}];function ge(o){return o==="meilleur_deal"?"loy-pack-card--deal":o==="populaire"?"loy-pack-card--pop":o?"loy-pack-card--new":""}function xe(o){return o==="meilleur_deal"?"loy-pack-badge--deal":o==="populaire"?"loy-pack-badge--pop":"loy-pack-badge--new"}function fe(o){return o==="meilleur_deal"?"🔥 Meilleur deal":o==="populaire"?"⭐ Populaire":o?"🆕 Nouveau":""}function he(o,t){return`${((t==null?void 0:t.nom)&&String(t.nom).split(" ")[0]||(o==null?void 0:o.email)&&o.email.split("@")[0]||"YORIX").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,8)||"YORIX"}-${((o==null?void 0:o.id)||"guest").slice(0,4).toUpperCase()}`}function ke({user:o,userData:t,goPage:p,setAuthOpen:l,setAuthTab:d}){var J;const[m,w]=i.useState([]),[f,C]=i.useState([]),[s,k]=i.useState([]),[h,N]=i.useState([]),[n,b]=i.useState(!0),[g,u]=i.useState(null),[F,A]=i.useState(null),[z,c]=i.useState(0),[_,P]=i.useState(0),[y,q]=i.useState("bronze"),[R,$]=i.useState("rewards"),[T,B]=i.useState(""),[Y,O]=i.useState(!1),[re,V]=i.useState(!1),W=i.useMemo(()=>he(o,t),[o,t]),E=async()=>{var x,L,S,H,Q;b(!0);const r=[v.from("loyalty_packs").select("*").eq("actif",!0).order("ordre").limit(ee),v.from("loyalty_rewards").select("*").eq("actif",!0).order("ordre").limit(ee)];o!=null&&o.id&&r.push(v.from("loyalty_transactions").select("*").eq("user_id",o.id).order("created_at",{ascending:!1}).limit(30),v.from("loyalty_redemptions").select("*").eq("user_id",o.id).order("created_at",{ascending:!1}).limit(10),v.from("profiles").select("points,points_total_gagnes,points_level").eq("id",o.id).single());const a=await Promise.all(r);if(w(((x=a[0])==null?void 0:x.data)||[]),C(((L=a[1])==null?void 0:L.data)||[]),o!=null&&o.id){k(((S=a[2])==null?void 0:S.data)||[]),N(((H=a[3])==null?void 0:H.data)||[]);const M=(Q=a[4])==null?void 0:Q.data;M&&(c(M.points||0),P(M.points_total_gagnes||0),q(M.points_level||"bronze"))}b(!1)};i.useEffect(()=>{E()},[o==null?void 0:o.id]);const X={bronze:500,argent:1e3,or:5e3,platine:5e3}[y]||500,D={bronze:0,argent:500,or:1e3,platine:5e3}[y],oe=y==="platine"?100:Math.min(100,Math.round((_-D)/(X-D)*100)),ae=Math.max(0,X-_),ie={achat:{label:"Achat",emoji:"🛍️",color:"var(--green)"},vente:{label:"Vente",emoji:"💰",color:"var(--green)"},avis:{label:"Avis publié",emoji:"⭐",color:"#f59e0b"},achat_points:{label:"Pack acheté",emoji:"💎",color:"#7c3aed"},echange:{label:"Récompense échangée",emoji:"🎁",color:"#ce1126"},bonus_inscription:{label:"Bonus bienvenue",emoji:"🎉",color:"var(--green)"},parrainage:{label:"Parrainage",emoji:"👥",color:"#2563eb"}},G=pe[y]||y,ne=y==="bronze"?"Argent":y==="argent"?"Or":y!=="platine"?"Platine":"",j=()=>{d==null||d("register"),l==null||l(!0)},I=()=>{d==null||d("login"),l==null||l(!0)},U=r=>{$(r),setTimeout(()=>{const a=document.getElementById("yloy-rewards");a&&a.scrollIntoView({behavior:"smooth",block:"start"})},40)},te=async()=>{var r;try{await((r=navigator.clipboard)==null?void 0:r.writeText(`https://yorix.cm/?ref=${W}`)),V(!0),setTimeout(()=>V(!1),2200)}catch{}},se=async r=>{if(r.preventDefault(),!(!T||!T.includes("@"))){try{await v.from("newsletter").insert({email:T})}catch{}O(!0),setTimeout(()=>O(!1),4e3),B("")}};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
    .yorix-loy-v3 {
      --loy-green: #1a6b3a;
      --loy-green-deep: #0d4d28;
      --loy-yellow: #fcd116;
      --loy-gold: #f59e0b;
      --loy-ink: var(--ink, #111);
      --loy-gray: var(--gray, #666);
      --loy-surface: var(--surface, #fff);
      --loy-surface2: var(--surface2, #f8f8f8);
      --loy-border: var(--border, #e5e5e5);
      --loy-radius: 16px;
      --loy-shadow: 0 12px 30px rgba(0,0,0,.08);
      --loy-shadow-hover: 0 20px 50px rgba(0,0,0,.12);

      font-family: 'DM Sans', sans-serif;
      color: var(--loy-ink);
    }
    .yorix-loy-v3 * { box-sizing: border-box; }

    /* ━━━ HERO ━━━ */
    .yloy3-hero {
      position: relative;
      background: linear-gradient(135deg, #0a1410 0%, #1a3a24 45%, #0d3320 100%);
      color: #fff;
      padding: 60px 24px 70px;
      overflow: hidden;
      border-radius: 0 0 28px 28px;
      margin-bottom: 50px;
    }
    .yloy3-hero::before {
      content: '';
      position: absolute;
      top: -100px; right: -80px;
      width: 380px; height: 380px;
      background: radial-gradient(circle, rgba(252,209,22,.18), transparent 65%);
      border-radius: 50%;
      pointer-events: none;
    }
    .yloy3-hero::after {
      content: '';
      position: absolute;
      bottom: -120px; left: -100px;
      width: 360px; height: 360px;
      background: radial-gradient(circle, rgba(79,209,125,.12), transparent 65%);
      border-radius: 50%;
      pointer-events: none;
    }
    .yloy3-hero-inner {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1.1fr 1fr;
      gap: 48px;
      align-items: center;
      position: relative;
      z-index: 2;
    }
    .yloy3-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: rgba(252,209,22,.14);
      color: var(--loy-yellow);
      border: 1px solid rgba(252,209,22,.32);
      padding: 6px 14px;
      border-radius: 50px;
      font-size: .72rem;
      font-weight: 700;
      margin-bottom: 18px;
      letter-spacing: .04em;
    }
    .yloy3-eyebrow-dot {
      width: 7px; height: 7px;
      background: var(--loy-yellow);
      border-radius: 50%;
      box-shadow: 0 0 12px var(--loy-yellow);
      animation: yloyPulse 2s ease-in-out infinite;
    }
    @keyframes yloyPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%      { opacity: .5; transform: scale(1.4); }
    }
    .yloy3-h1 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 800;
      line-height: 1.05;
      letter-spacing: -1.5px;
      margin-bottom: 16px;
    }
    .yloy3-h1 em {
      font-style: normal;
      color: var(--loy-yellow);
      background: linear-gradient(135deg, #fcd116, #f59e0b);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .yloy3-sub {
      font-size: clamp(.95rem, 1.5vw, 1.05rem);
      color: rgba(255,255,255,.75);
      line-height: 1.7;
      margin-bottom: 24px;
      max-width: 520px;
    }
    .yloy3-sub strong { color: #fff; font-weight: 700; }
    .yloy3-perks {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-bottom: 28px;
      list-style: none;
      padding: 0;
    }
    .yloy3-perks li {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,.06);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,.1);
      padding: 9px 13px;
      border-radius: 10px;
      font-size: .82rem;
      color: rgba(255,255,255,.92);
    }
    .yloy3-perks li span:first-child { font-size: 1.15rem; }
    .yloy3-perks strong { font-weight: 700; color: var(--loy-yellow); }
    .yloy3-ctas {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }
    .yloy3-btn {
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
    .yloy3-btn--pri {
      background: linear-gradient(135deg, var(--loy-yellow), var(--loy-gold));
      color: #0d1f14;
      box-shadow: 0 8px 22px rgba(252,209,22,.35);
    }
    .yloy3-btn--pri:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(252,209,22,.45);
    }
    .yloy3-btn--sec {
      background: rgba(255,255,255,.1);
      color: #fff;
      border: 1.5px solid rgba(255,255,255,.2);
      backdrop-filter: blur(10px);
    }
    .yloy3-btn--sec:hover {
      background: rgba(255,255,255,.18);
    }
    .yloy3-btn--ghost {
      background: transparent;
      color: var(--loy-ink);
      border: 1.5px solid var(--loy-border);
    }
    .yloy3-btn--ghost:hover {
      background: var(--loy-surface2);
    }
    .yloy3-trust {
      display: flex;
      gap: 18px;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
    }
    .yloy3-trust li {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: .72rem;
      color: rgba(255,255,255,.55);
    }

    /* ━━━ CARTE VIP ━━━ */
    .yloy3-vipcard-wrap {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 340px;
    }
    .yloy3-vipcard {
      position: relative;
      width: 100%;
      max-width: 380px;
      aspect-ratio: 1.586/1;
      background: linear-gradient(135deg, #1a3a24 0%, #0a1410 100%);
      border-radius: 18px;
      padding: 22px 24px;
      color: #fff;
      box-shadow:
        0 25px 60px rgba(0,0,0,.5),
        0 0 0 1px rgba(255,255,255,.08) inset;
      transform: rotate(-3deg);
      transition: transform .4s cubic-bezier(.4,.0,.2,1);
      overflow: hidden;
    }
    .yloy3-vipcard:hover {
      transform: rotate(-1deg) translateY(-6px) scale(1.02);
    }
    .yloy3-vipcard::before {
      content: '';
      position: absolute;
      top: -50%; left: -50%;
      width: 200%; height: 200%;
      background: linear-gradient(
        135deg,
        transparent 30%,
        rgba(252,209,22,.15) 50%,
        transparent 70%
      );
      animation: yloyShine 6s ease-in-out infinite;
      pointer-events: none;
    }
    @keyframes yloyShine {
      0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
      50%      { transform: translate(-30%, -30%) rotate(45deg); }
    }
    .yloy3-vipcard-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 22px;
      position: relative;
      z-index: 2;
    }
    .yloy3-vipcard-brand {
      display: flex;
      align-items: center;
      gap: 9px;
    }
    .yloy3-vipcard-logo {
      width: 36px; height: 36px;
      background: linear-gradient(135deg, var(--loy-yellow), var(--loy-gold));
      color: #0d1f14;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1.2rem;
    }
    .yloy3-vipcard-name {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .9rem;
      letter-spacing: .12em;
    }
    .yloy3-vipcard-name em {
      font-style: normal;
      color: var(--loy-yellow);
      font-size: .68rem;
      display: block;
      letter-spacing: .25em;
    }
    .yloy3-vipcard-tier {
      background: rgba(252,209,22,.18);
      color: var(--loy-yellow);
      border: 1px solid rgba(252,209,22,.4);
      padding: 5px 11px;
      border-radius: 50px;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .68rem;
      letter-spacing: .1em;
      text-transform: uppercase;
    }
    .yloy3-vipcard-mid {
      position: relative;
      z-index: 2;
    }
    .yloy3-vipcard-lbl {
      font-size: .65rem;
      color: rgba(255,255,255,.55);
      letter-spacing: .1em;
      text-transform: uppercase;
      margin-bottom: 5px;
    }
    .yloy3-vipcard-pts {
      font-family: 'Syne', sans-serif;
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--loy-yellow);
      letter-spacing: -1px;
      line-height: 1;
      margin-bottom: 4px;
    }
    .yloy3-vipcard-pts small {
      font-size: .85rem;
      color: rgba(255,255,255,.6);
      margin-left: 4px;
    }
    .yloy3-vipcard-meta {
      font-size: .68rem;
      color: rgba(255,255,255,.7);
      margin-bottom: 14px;
      line-height: 1.5;
    }
    .yloy3-vipcard-meta strong { color: #fff; }
    .yloy3-vipcard-progress {
      height: 6px;
      background: rgba(255,255,255,.1);
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 16px;
    }
    .yloy3-vipcard-progress-bar {
      height: 100%;
      background: linear-gradient(90deg, var(--loy-yellow), var(--loy-gold));
      border-radius: 10px;
      transition: width .6s ease;
    }
    .yloy3-vipcard-foot {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      position: relative;
      z-index: 2;
    }
    .yloy3-vipcard-flbl {
      font-size: .58rem;
      color: rgba(255,255,255,.45);
      letter-spacing: .12em;
      text-transform: uppercase;
      margin-bottom: 3px;
    }
    .yloy3-vipcard-fval {
      font-size: .82rem;
      font-weight: 600;
      color: rgba(255,255,255,.95);
    }

    /* ━━━ SECTIONS ━━━ */
    .yloy3-section {
      max-width: 1200px;
      margin: 0 auto 60px;
      padding: 0 24px;
    }
    .yloy3-section--tinted {
      background: var(--loy-surface2);
      padding: 60px 24px;
      margin-bottom: 60px;
      border-radius: 24px;
      max-width: 1248px;
    }
    .yloy3-section-head {
      text-align: center;
      max-width: 720px;
      margin: 0 auto 40px;
    }
    .yloy3-eyebrow-light {
      display: inline-block;
      background: var(--loy-surface2);
      color: var(--loy-green);
      border: 1px solid var(--loy-border);
      padding: 5px 12px;
      border-radius: 50px;
      font-size: .68rem;
      font-weight: 700;
      letter-spacing: .12em;
      text-transform: uppercase;
      margin-bottom: 14px;
    }
    .yloy3-h2 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(1.5rem, 3.5vw, 2.2rem);
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -1px;
      color: var(--loy-ink);
      margin-bottom: 12px;
    }
    .yloy3-h2 em {
      font-style: normal;
      color: var(--loy-green);
    }
    .yloy3-h2--on-dark { color: #fff; }
    .yloy3-h2--on-dark em { color: var(--loy-yellow); }
    .yloy3-lead {
      font-size: 1rem;
      color: var(--loy-gray);
      line-height: 1.65;
    }

    /* ━━━ COMMENT GAGNER ━━━ */
    .yloy3-earn-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 18px;
    }
    .yloy3-earn-card {
      background: var(--loy-surface);
      border: 1px solid var(--loy-border);
      border-radius: 16px;
      padding: 24px 22px;
      text-align: center;
      transition: all .25s;
      position: relative;
      overflow: hidden;
    }
    .yloy3-earn-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--loy-green), var(--loy-yellow));
      transform: scaleX(0);
      transform-origin: left;
      transition: transform .3s;
    }
    .yloy3-earn-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--loy-shadow);
      border-color: var(--loy-green);
    }
    .yloy3-earn-card:hover::before {
      transform: scaleX(1);
    }
    .yloy3-earn-emoji {
      font-size: 2.4rem;
      margin-bottom: 12px;
      display: inline-block;
      transition: transform .3s;
    }
    .yloy3-earn-card:hover .yloy3-earn-emoji {
      transform: scale(1.15) rotate(-5deg);
    }
    .yloy3-earn-t {
      font-family: 'Syne', sans-serif;
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--loy-ink);
      margin-bottom: 8px;
      letter-spacing: -.3px;
    }
    .yloy3-earn-d {
      font-size: .82rem;
      color: var(--loy-gray);
      line-height: 1.6;
      margin-bottom: 14px;
    }
    .yloy3-earn-pts {
      display: inline-block;
      background: linear-gradient(135deg, var(--loy-green-pale, #e8f5e9), #fff9e6);
      color: var(--loy-green);
      border: 1px solid var(--loy-green-light, #86efac);
      padding: 5px 12px;
      border-radius: 50px;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: .78rem;
    }

    /* ━━━ TIERS ━━━ */
    .yloy3-tiers {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }
    .yloy3-tier {
      background: var(--loy-surface);
      border: 2px solid var(--loy-border);
      border-radius: 16px;
      padding: 26px 22px;
      position: relative;
      transition: all .25s;
      overflow: hidden;
    }
    .yloy3-tier::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 5px;
      background: var(--tier-gradient);
    }
    .yloy3-tier:hover {
      transform: translateY(-5px);
      box-shadow: var(--loy-shadow-hover);
    }
    .yloy3-tier.is-current {
      border-color: var(--tier-color);
      box-shadow: 0 0 0 3px var(--tier-color)20, var(--loy-shadow);
    }
    .yloy3-tier-now {
      position: absolute;
      top: 14px; right: 14px;
      background: var(--tier-color);
      color: #fff;
      padding: 4px 10px;
      border-radius: 50px;
      font-size: .62rem;
      font-weight: 700;
      letter-spacing: .05em;
    }
    .yloy3-tier-emoji {
      font-size: 2.8rem;
      margin-bottom: 10px;
    }
    .yloy3-tier-name {
      font-family: 'Syne', sans-serif;
      font-size: 1.3rem;
      font-weight: 800;
      letter-spacing: -.5px;
      margin-bottom: 4px;
      background: var(--tier-gradient);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .yloy3-tier-thresh {
      font-size: .72rem;
      color: var(--loy-gray);
      font-weight: 600;
      margin-bottom: 10px;
    }
    .yloy3-tier-pitch {
      font-size: .84rem;
      color: var(--loy-ink);
      line-height: 1.6;
      margin-bottom: 14px;
      min-height: 50px;
    }
    .yloy3-tier-perks {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .yloy3-tier-perks li {
      display: flex;
      align-items: flex-start;
      gap: 7px;
      font-size: .78rem;
      color: var(--loy-gray);
      padding: 5px 0;
      line-height: 1.5;
    }
    .yloy3-tier-perks li span {
      color: var(--tier-color);
      font-weight: 800;
      flex-shrink: 0;
    }

    /* ━━━ MES STATS ━━━ */
    .yloy3-stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 12px;
      margin-bottom: 28px;
    }
    .yloy3-stat-card {
      background: var(--loy-surface);
      border: 1px solid var(--loy-border);
      border-radius: 12px;
      padding: 16px 14px;
      text-align: center;
      transition: all .2s;
    }
    .yloy3-stat-card:hover {
      border-color: var(--loy-green);
      transform: translateY(-2px);
    }
    .yloy3-stat-ico {
      font-size: 1.6rem;
      margin-bottom: 6px;
    }
    .yloy3-stat-val {
      font-family: 'Syne', sans-serif;
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--loy-ink);
      letter-spacing: -.5px;
    }
    .yloy3-stat-lbl {
      font-size: .72rem;
      color: var(--loy-gray);
      font-weight: 600;
    }

    /* ━━━ TABS ━━━ */
    .yloy3-tabs {
      display: flex;
      gap: 6px;
      border-bottom: 2px solid var(--loy-border);
      margin-bottom: 28px;
      flex-wrap: wrap;
      overflow-x: auto;
    }
    .yloy3-tab {
      background: transparent;
      border: none;
      padding: 12px 18px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: .88rem;
      color: var(--loy-gray);
      cursor: pointer;
      position: relative;
      transition: color .2s;
      white-space: nowrap;
    }
    .yloy3-tab:hover { color: var(--loy-ink); }
    .yloy3-tab.is-active {
      color: var(--loy-green);
      font-weight: 700;
    }
    .yloy3-tab.is-active::after {
      content: '';
      position: absolute;
      bottom: -2px; left: 0; right: 0;
      height: 3px;
      background: var(--loy-green);
      border-radius: 3px 3px 0 0;
    }
    .yloy3-tab-count {
      margin-left: 5px;
      font-size: .72rem;
      color: var(--loy-gray);
    }

    /* ━━━ REWARDS GRID ━━━ */
    .yloy3-rewards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 16px;
    }
    .yloy3-reward-card {
      background: var(--loy-surface);
      border: 1px solid var(--loy-border);
      border-radius: 14px;
      padding: 20px 16px 18px;
      text-align: center;
      position: relative;
      transition: all .25s;
      display: flex;
      flex-direction: column;
    }
    .yloy3-reward-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--loy-shadow);
      border-color: var(--loy-green);
    }
    .yloy3-reward-card.is-locked { opacity: .6; }
    .yloy3-reward-val-badge {
      position: absolute;
      top: 12px; right: 12px;
      background: var(--loy-green);
      color: #fff;
      padding: 3px 9px;
      border-radius: 50px;
      font-size: .62rem;
      font-weight: 800;
    }
    .yloy3-reward-icon {
      width: 64px; height: 64px;
      border-radius: 14px;
      margin: 0 auto 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      transition: transform .3s;
    }
    .yloy3-reward-card:hover .yloy3-reward-icon {
      transform: scale(1.1) rotate(-4deg);
    }
    .yloy3-reward-name {
      font-family: 'Syne', sans-serif;
      font-size: .92rem;
      font-weight: 700;
      color: var(--loy-ink);
      margin-bottom: 6px;
      letter-spacing: -.2px;
    }
    .yloy3-reward-desc {
      font-size: .74rem;
      color: var(--loy-gray);
      line-height: 1.5;
      margin-bottom: 10px;
      flex: 1;
    }
    .yloy3-reward-pts {
      font-family: 'Syne', sans-serif;
      font-size: 1rem;
      font-weight: 800;
      margin-bottom: 12px;
      letter-spacing: -.3px;
    }
    .yloy3-reward-btn {
      width: 100%;
      padding: 9px;
      border-radius: 9px;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: .78rem;
      cursor: pointer;
      border: none;
      transition: all .2s;
    }
    .yloy3-reward-btn--afford {
      background: linear-gradient(135deg, var(--loy-green), var(--loy-green-deep));
      color: #fff;
    }
    .yloy3-reward-btn--afford:hover {
      transform: scale(1.03);
      box-shadow: 0 6px 18px rgba(26,107,58,.3);
    }
    .yloy3-reward-btn--locked {
      background: var(--loy-surface2);
      color: var(--loy-gray);
      cursor: not-allowed;
    }

    /* ━━━ PACKS GRID ━━━ */
    .yloy3-packs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 16px;
    }
    .yloy3-pack-card {
      background: var(--loy-surface);
      border: 1.5px solid var(--loy-border);
      border-radius: 14px;
      padding: 22px 18px 20px;
      text-align: center;
      cursor: pointer;
      transition: all .25s;
      position: relative;
    }
    .yloy3-pack-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--loy-shadow-hover);
      border-color: var(--loy-green);
    }
    .yloy3-pack-card--deal {
      border-color: #ff4444;
      box-shadow: 0 8px 22px rgba(255,68,68,.12);
    }
    .yloy3-pack-card--pop {
      border-color: var(--loy-yellow);
      box-shadow: 0 8px 22px rgba(252,209,22,.12);
    }
    .yloy3-pack-badge {
      position: absolute;
      top: -10px; left: 50%;
      transform: translateX(-50%);
      padding: 4px 13px;
      border-radius: 50px;
      font-size: .66rem;
      font-weight: 800;
      letter-spacing: .04em;
      white-space: nowrap;
    }
    .yloy3-pack-badge--deal { background: #ff4444; color: #fff; }
    .yloy3-pack-badge--pop  { background: var(--loy-yellow); color: #0d1f14; }
    .yloy3-pack-badge--new  { background: var(--loy-green); color: #fff; }
    .yloy3-pack-emoji-wrap {
      width: 72px; height: 72px;
      border-radius: 18px;
      margin: 0 auto 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.2rem;
    }
    .yloy3-pack-title {
      font-family: 'Syne', sans-serif;
      font-size: .92rem;
      color: var(--loy-gray);
      font-weight: 600;
      margin-bottom: 4px;
    }
    .yloy3-pack-pts {
      font-family: 'Syne', sans-serif;
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--loy-ink);
      letter-spacing: -.5px;
      margin-bottom: 4px;
    }
    .yloy3-pack-bonus {
      display: inline-block;
      background: rgba(245,158,11,.14);
      color: var(--loy-gold);
      padding: 3px 10px;
      border-radius: 50px;
      font-size: .68rem;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .yloy3-pack-price {
      font-family: 'Syne', sans-serif;
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--loy-green);
      margin-bottom: 3px;
    }
    .yloy3-pack-unit {
      font-size: .68rem;
      color: var(--loy-gray);
      margin-bottom: 12px;
    }
    .yloy3-pack-buy {
      background: linear-gradient(135deg, var(--loy-green), var(--loy-green-deep));
      color: #fff;
      padding: 9px 14px;
      border-radius: 9px;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: .78rem;
    }

    /* ━━━ HISTORY ━━━ */
    .yloy3-history {
      background: var(--loy-surface);
      border: 1px solid var(--loy-border);
      border-radius: 14px;
      overflow: hidden;
    }
    .yloy3-history-row {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 14px;
      align-items: center;
      padding: 14px 18px;
      border-bottom: 1px solid var(--loy-border);
      transition: background .15s;
    }
    .yloy3-history-row:last-child { border-bottom: none; }
    .yloy3-history-row:hover { background: var(--loy-surface2); }
    .yloy3-history-ico {
      width: 38px; height: 38px;
      border-radius: 10px;
      background: var(--loy-surface2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
    }
    .yloy3-history-title {
      font-weight: 700;
      font-size: .85rem;
      color: var(--loy-ink);
      margin-bottom: 2px;
    }
    .yloy3-history-sub {
      font-size: .72rem;
      color: var(--loy-gray);
    }
    .yloy3-history-pts { text-align: right; }
    .yloy3-history-amt {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1rem;
      letter-spacing: -.3px;
    }
    .yloy3-history-amt--gain { color: var(--loy-green); }
    .yloy3-history-amt--loss { color: #ce1126; }
    .yloy3-history-date {
      font-size: .65rem;
      color: var(--loy-gray);
      margin-top: 2px;
    }

    /* ━━━ CODES ━━━ */
    .yloy3-codes-title {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1.1rem;
      margin: 32px 0 14px;
      color: var(--loy-ink);
    }
    .yloy3-codes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 12px;
    }
    .yloy3-code-card {
      background: linear-gradient(135deg, #fff9e6, #fff);
      border: 1.5px dashed var(--loy-gold);
      border-radius: 11px;
      padding: 14px;
    }
    .yloy3-code-name {
      font-size: .72rem;
      color: var(--loy-gray);
      margin-bottom: 5px;
    }
    .yloy3-code-val {
      font-family: 'JetBrains Mono', 'Courier New', monospace;
      font-size: 1rem;
      font-weight: 800;
      color: var(--loy-ink);
      background: rgba(252,209,22,.14);
      padding: 6px 10px;
      border-radius: 7px;
      text-align: center;
      letter-spacing: .08em;
      margin-bottom: 7px;
    }
    .yloy3-code-meta {
      display: flex;
      justify-content: space-between;
      font-size: .65rem;
      color: var(--loy-gray);
    }

    /* ━━━ PARRAINAGE ━━━ */
    .yloy3-referral {
      background: linear-gradient(135deg, #1a3a24 0%, #0d3320 100%);
      border-radius: 20px;
      padding: 36px 32px;
      color: #fff;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 36px;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    .yloy3-referral::before {
      content: '👥';
      position: absolute;
      top: -20px; right: -10px;
      font-size: 10rem;
      opacity: .04;
      pointer-events: none;
    }
    .yloy3-referral-left { position: relative; z-index: 2; }
    .yloy3-referral-right { position: relative; z-index: 2; }
    .yloy3-sub--on-dark {
      color: rgba(255,255,255,.75);
    }
    .yloy3-sub--on-dark strong { color: var(--loy-yellow); }
    .yloy3-referral-lbl {
      display: block;
      font-size: .72rem;
      color: rgba(255,255,255,.6);
      font-weight: 600;
      margin-bottom: 6px;
    }
    .yloy3-referral-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 8px;
    }
    .yloy3-referral-inp {
      flex: 1;
      min-width: 200px;
      padding: 12px 14px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,.15);
      background: rgba(0,0,0,.25);
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      font-size: .82rem;
      outline: none;
    }
    .yloy3-referral-meta {
      font-size: .7rem;
      color: rgba(255,255,255,.55);
      line-height: 1.5;
    }

    /* ━━━ NEWSLETTER ━━━ */
    .yloy3-nl {
      background: linear-gradient(135deg, var(--loy-green-pale, #e8f5e9) 0%, #fff9e6 100%);
      border: 1.5px solid var(--loy-green-light, #86efac);
      border-radius: 20px;
      padding: 40px 28px;
      text-align: center;
      max-width: 720px;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
    }
    .yloy3-nl::before {
      content: '';
      position: absolute;
      top: -50%; left: 50%;
      transform: translateX(-50%);
      width: 300px; height: 300px;
      background: radial-gradient(circle, rgba(26,107,58,.06), transparent 70%);
      border-radius: 50%;
      pointer-events: none;
    }
    .yloy3-nl-ico {
      font-size: 3rem;
      margin-bottom: 10px;
      position: relative;
      z-index: 2;
    }
    .yloy3-nl-form {
      display: flex;
      gap: 10px;
      max-width: 460px;
      margin: 24px auto 14px;
      flex-wrap: wrap;
      justify-content: center;
      position: relative;
      z-index: 2;
    }
    .yloy3-nl-input {
      flex: 1;
      min-width: 220px;
      padding: 13px 16px;
      border-radius: 11px;
      border: 1.5px solid var(--loy-border);
      background: #fff;
      color: var(--loy-ink);
      font-family: 'DM Sans', sans-serif;
      font-size: .88rem;
      outline: none;
      transition: border-color .2s;
    }
    .yloy3-nl-input:focus { border-color: var(--loy-green); }
    .yloy3-nl-note {
      font-size: .72rem;
      color: var(--loy-gray);
      position: relative;
      z-index: 2;
    }
    .yloy3-lead--center { text-align: center; }
    .yloy3-h2--center { text-align: center; }

    /* ━━━ FAQ ━━━ */
    .yloy3-faq {
      max-width: 760px;
      margin: 0 auto;
    }
    .yloy3-faq-item {
      background: var(--loy-surface);
      border: 1px solid var(--loy-border);
      border-radius: 12px;
      margin-bottom: 10px;
      overflow: hidden;
      transition: all .2s;
    }
    .yloy3-faq-item:hover { border-color: var(--loy-green); }
    .yloy3-faq-item[open] {
      box-shadow: var(--loy-shadow);
      border-color: var(--loy-green);
    }
    .yloy3-faq-item summary {
      padding: 16px 20px;
      cursor: pointer;
      font-weight: 700;
      font-size: .9rem;
      color: var(--loy-ink);
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 14px;
      transition: color .2s;
    }
    .yloy3-faq-item summary::after {
      content: '+';
      font-family: 'Syne', sans-serif;
      font-size: 1.6rem;
      color: var(--loy-green);
      transition: transform .25s;
      flex-shrink: 0;
    }
    .yloy3-faq-item[open] summary::after {
      transform: rotate(45deg);
    }
    .yloy3-faq-item p {
      padding: 0 20px 18px;
      font-size: .85rem;
      color: var(--loy-gray);
      line-height: 1.75;
      margin: 0;
    }

    /* ━━━ CTA FINAL ━━━ */
    .yloy3-final {
      background: linear-gradient(135deg, #1a3a24 0%, #0d3320 100%);
      border-radius: 20px;
      padding: 48px 32px;
      color: #fff;
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 28px;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    .yloy3-final::before {
      content: '🎁';
      position: absolute;
      top: 50%;
      right: -20px;
      transform: translateY(-50%);
      font-size: 12rem;
      opacity: .05;
      pointer-events: none;
    }
    .yloy3-final-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: flex-end;
      position: relative;
      z-index: 2;
    }

    /* ━━━ EMPTY / LOADING ━━━ */
    .yloy3-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 60px 20px;
      color: var(--loy-gray);
    }
    .yloy3-spinner {
      width: 22px; height: 22px;
      border: 3px solid var(--loy-border);
      border-top-color: var(--loy-green);
      border-radius: 50%;
      animation: yloy3Spin .7s linear infinite;
    }
    @keyframes yloy3Spin { to { transform: rotate(360deg); } }
    .yloy3-empty {
      text-align: center;
      padding: 50px 20px;
      background: var(--loy-surface);
      border: 1.5px dashed var(--loy-border);
      border-radius: 14px;
    }
    .yloy3-empty-ico {
      font-size: 3rem;
      margin-bottom: 10px;
      opacity: .6;
    }
    .yloy3-empty p {
      color: var(--loy-gray);
      font-size: .88rem;
      line-height: 1.65;
      margin: 0 auto 8px;
      max-width: 380px;
    }

    /* ━━━ RESPONSIVE ━━━ */
    @media (max-width: 900px) {
      .yloy3-hero { padding: 40px 18px 56px; }
      .yloy3-hero-inner { grid-template-columns: 1fr; gap: 36px; }
      .yloy3-vipcard { transform: rotate(0); max-width: 340px; }
      .yloy3-vipcard:hover { transform: translateY(-4px) scale(1.02); }
      .yloy3-referral { grid-template-columns: 1fr; gap: 24px; padding: 28px 22px; }
      .yloy3-final { grid-template-columns: 1fr; gap: 22px; padding: 36px 24px; text-align: center; }
      .yloy3-final-actions { justify-content: center; }
      .yloy3-section--tinted { padding: 40px 18px; }
    }
    @media (max-width: 500px) {
      .yloy3-hero { padding: 36px 16px 50px; }
      .yloy3-h1 { font-size: 1.85rem; }
      .yloy3-perks { grid-template-columns: 1fr; }
      .yloy3-ctas { flex-direction: column; align-items: stretch; }
      .yloy3-btn { width: 100%; text-align: center; }
      .yloy3-section, .yloy3-section--tinted { padding-left: 16px; padding-right: 16px; }
    }
  `}),g&&e.jsx(de,{pack:g,user:o,userData:t,onClose:()=>u(null),onSuccess:E}),F&&e.jsx(ye,{reward:F,userPoints:z,user:o,onClose:()=>A(null),onSuccess:E}),e.jsxs("div",{className:"yorix-loy-v3 anim",children:[e.jsx("section",{className:"yloy3-hero",children:e.jsxs("div",{className:"yloy3-hero-inner",children:[e.jsxs("div",{children:[e.jsxs("span",{className:"yloy3-eyebrow",children:[e.jsx("span",{className:"yloy3-eyebrow-dot"})," Yorix Rewards · Programme fidélité"]}),e.jsxs("h1",{className:"yloy3-h1",children:["Plus vous achetez,",e.jsx("br",{}),e.jsx("em",{children:"plus vous gagnez."})]}),e.jsxs("p",{className:"yloy3-sub",children:["Cumulez des ",e.jsx("strong",{children:"Yorix Points"})," à chaque achat, vente ou avis publié — puis échangez-les contre des réductions, livraisons offertes et avantages VIP réservés aux membres."]}),e.jsxs("ul",{className:"yloy3-perks",children:[e.jsxs("li",{children:[e.jsx("span",{children:"🎁"}),e.jsxs("span",{children:[e.jsx("strong",{children:"+50 pts"})," à l'inscription"]})]}),e.jsxs("li",{children:[e.jsx("span",{children:"🚚"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Livraison"})," offerte"]})]}),e.jsxs("li",{children:[e.jsx("span",{children:"🎟️"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Codes promo"})," VIP"]})]}),e.jsxs("li",{children:[e.jsx("span",{children:"👥"}),e.jsxs("span",{children:[e.jsx("strong",{children:"+100 pts"})," par parrainage"]})]})]}),e.jsx("div",{className:"yloy3-ctas",children:o?e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"yloy3-btn yloy3-btn--pri",onClick:()=>U("packs"),children:"💎 Acheter des points"}),e.jsx("button",{className:"yloy3-btn yloy3-btn--sec",onClick:()=>U("rewards"),children:"🎁 Échanger mes points"})]}):e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"yloy3-btn yloy3-btn--pri",onClick:j,children:"🚀 Créer mon compte — +50 pts"}),e.jsx("button",{className:"yloy3-btn yloy3-btn--sec",onClick:I,children:"J'ai déjà un compte"})]})}),e.jsxs("ul",{className:"yloy3-trust",children:[e.jsxs("li",{children:[e.jsx("span",{children:"🔐"})," Escrow sécurisé"]}),e.jsxs("li",{children:[e.jsx("span",{children:"🇨🇲"})," Made in Cameroun"]}),e.jsxs("li",{children:[e.jsx("span",{children:"⭐"})," +1 000 membres actifs"]})]})]}),e.jsx("div",{className:"yloy3-vipcard-wrap",children:e.jsxs("div",{className:"yloy3-vipcard",children:[e.jsxs("div",{className:"yloy3-vipcard-top",children:[e.jsxs("div",{className:"yloy3-vipcard-brand",children:[e.jsx("div",{className:"yloy3-vipcard-logo",children:"Y"}),e.jsxs("div",{className:"yloy3-vipcard-name",children:["YORIX",e.jsx("em",{children:"REWARDS"})]})]}),e.jsx("div",{className:"yloy3-vipcard-tier",children:o?G:"Or"})]}),e.jsxs("div",{className:"yloy3-vipcard-mid",children:[e.jsx("div",{className:"yloy3-vipcard-lbl",children:"Points disponibles"}),e.jsxs("div",{className:"yloy3-vipcard-pts",children:[o?z.toLocaleString("fr-FR"):"1 250",e.jsx("small",{children:"pts"})]}),e.jsx("div",{className:"yloy3-vipcard-meta",children:o?e.jsxs(e.Fragment,{children:["Niveau ",e.jsx("strong",{children:G}),y!=="platine"&&e.jsxs(e.Fragment,{children:[" · plus que ",e.jsxs("strong",{children:[ae.toLocaleString("fr-FR")," pts"]})," pour ",ne]})]}):e.jsxs(e.Fragment,{children:["Exemple — niveau ",e.jsx("strong",{children:"Or"})," · ~250 pts pour Platine"]})}),e.jsx("div",{className:"yloy3-vipcard-progress",children:e.jsx("div",{className:"yloy3-vipcard-progress-bar",style:{width:`${o?oe:65}%`}})})]}),e.jsxs("div",{className:"yloy3-vipcard-foot",children:[e.jsxs("div",{children:[e.jsx("div",{className:"yloy3-vipcard-flbl",children:"Titulaire"}),e.jsx("div",{className:"yloy3-vipcard-fval",children:((t==null?void 0:t.nom)||((J=o==null?void 0:o.email)==null?void 0:J.split("@")[0])||"Membre Yorix").toString().slice(0,20)})]}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsx("div",{className:"yloy3-vipcard-flbl",children:"Membre"}),e.jsx("div",{className:"yloy3-vipcard-fval",children:new Date().getFullYear()})]})]})]})})]})}),e.jsxs("section",{className:"yloy3-section",children:[e.jsxs("div",{className:"yloy3-section-head",children:[e.jsx("span",{className:"yloy3-eyebrow-light",children:"01 · Comment ça marche"}),e.jsxs("h2",{className:"yloy3-h2",children:["Gagnez des points à chaque ",e.jsx("em",{children:"action"})]}),e.jsx("p",{className:"yloy3-lead",children:"Quatre façons simples d'accumuler vos Yorix Points et de débloquer des avantages."})]}),e.jsx("div",{className:"yloy3-earn-grid",children:[{e:"🛍️",t:"Chaque achat",d:"Gagnez 1 point pour chaque tranche de 500 FCFA dépensée sur la marketplace.",pts:"1 pt / 500 FCFA"},{e:"💰",t:"Chaque vente",d:"Côté vendeur : 1 point pour chaque tranche de 500 FCFA vendue, escrow inclus.",pts:"1 pt / 500 FCFA"},{e:"⭐",t:"Avis publié",d:"Aidez la communauté : un avis détaillé sur un produit ou un service rapporte des points.",pts:"+10 à +30 pts"},{e:"👥",t:"Parrainage",d:"Invitez un proche : à chaque inscription parrainée, vous gagnez un bonus.",pts:"+100 pts"}].map(r=>e.jsxs("article",{className:"yloy3-earn-card",children:[e.jsx("div",{className:"yloy3-earn-emoji",children:r.e}),e.jsx("h3",{className:"yloy3-earn-t",children:r.t}),e.jsx("p",{className:"yloy3-earn-d",children:r.d}),e.jsx("span",{className:"yloy3-earn-pts",children:r.pts})]},r.t))})]}),e.jsxs("section",{className:"yloy3-section--tinted",children:[e.jsxs("div",{className:"yloy3-section-head",children:[e.jsx("span",{className:"yloy3-eyebrow-light",children:"02 · Niveaux VIP"}),e.jsxs("h2",{className:"yloy3-h2",children:["Quatre niveaux. ",e.jsx("em",{children:"Plus vous montez, plus vous gagnez."})]}),e.jsx("p",{className:"yloy3-lead",children:"Votre niveau évolue automatiquement en fonction de vos points cumulés. Aucun frais, aucun engagement."})]}),e.jsx("div",{className:"yloy3-tiers",children:me.map(r=>{const a=o&&y===r.id;return e.jsxs("article",{className:`yloy3-tier ${a?"is-current":""}`,style:{"--tier-color":r.color,"--tier-gradient":r.gradient},children:[a&&e.jsx("span",{className:"yloy3-tier-now",children:"Mon niveau"}),e.jsx("div",{className:"yloy3-tier-emoji",children:r.emoji}),e.jsx("h3",{className:"yloy3-tier-name",children:r.label}),e.jsx("div",{className:"yloy3-tier-thresh",children:r.threshold===0?"Dès l'inscription":`À partir de ${r.threshold.toLocaleString("fr-FR")} pts`}),e.jsx("p",{className:"yloy3-tier-pitch",children:r.pitch}),e.jsx("ul",{className:"yloy3-tier-perks",children:r.perks.map(x=>e.jsxs("li",{children:[e.jsx("span",{children:"✓"}),x]},x))})]},r.id)})})]}),e.jsxs("section",{className:"yloy3-section",id:"yloy-rewards",children:[e.jsxs("div",{className:"yloy3-section-head",children:[e.jsx("span",{className:"yloy3-eyebrow-light",children:"03 · Récompenses"}),e.jsxs("h2",{className:"yloy3-h2",children:["Vos Yorix Points, transformés en ",e.jsx("em",{children:"avantages réels"})]}),e.jsx("p",{className:"yloy3-lead",children:o?"Choisissez vos récompenses, ou accélérez votre progression avec un pack de points.":"Inscrivez-vous pour voir vos points, débloquer les onglets et activer les récompenses."})]}),o&&e.jsx("div",{className:"yloy3-stats-grid",children:[{icon:"🛍️",val:s.filter(r=>r.type==="achat").length,lbl:"Achats"},{icon:"💰",val:s.filter(r=>r.type==="vente").length,lbl:"Ventes"},{icon:"⭐",val:s.filter(r=>r.type==="avis").length,lbl:"Avis"},{icon:"🎁",val:h.length,lbl:"Échanges"}].map(r=>e.jsxs("div",{className:"yloy3-stat-card",children:[e.jsx("div",{className:"yloy3-stat-ico",children:r.icon}),e.jsx("div",{className:"yloy3-stat-val",children:r.val}),e.jsx("div",{className:"yloy3-stat-lbl",children:r.lbl})]},r.lbl))}),e.jsx("div",{className:"yloy3-tabs",children:[{id:"rewards",label:"🎁 Récompenses",count:f.length},{id:"packs",label:"💎 Packs points",count:m.length},{id:"history",label:"📜 Historique",count:s.length}].map(r=>e.jsxs("button",{className:`yloy3-tab ${R===r.id?"is-active":""}`,onClick:()=>$(r.id),children:[r.label,r.count>0&&e.jsxs("span",{className:"yloy3-tab-count",children:["(",r.count,")"]})]},r.id))}),R==="rewards"&&(n?e.jsxs("div",{className:"yloy3-loading",children:[e.jsx("div",{className:"yloy3-spinner"}),"Chargement..."]}):f.length===0?e.jsxs("div",{className:"yloy3-empty",children:[e.jsx("div",{className:"yloy3-empty-ico",children:"🎁"}),e.jsx("p",{children:"Aucune récompense disponible pour le moment."})]}):e.jsx("div",{className:"yloy3-rewards-grid",children:f.map(r=>{const a=!!o&&z>=r.cout_points;return e.jsxs("div",{className:`yloy3-reward-card ${a?"":"is-locked"}`,children:[r.valeur_fcfa&&e.jsxs("span",{className:"yloy3-reward-val-badge",children:[r.valeur_fcfa.toLocaleString("fr-FR")," F"]}),e.jsx("div",{className:"yloy3-reward-icon",style:{background:r.color_bg},children:r.emoji}),e.jsx("div",{className:"yloy3-reward-name",children:r.nom}),r.description&&e.jsx("div",{className:"yloy3-reward-desc",children:r.description}),e.jsxs("div",{className:"yloy3-reward-pts",style:{color:a?"var(--loy-green)":"var(--loy-gray)"},children:[r.cout_points.toLocaleString("fr-FR")," pts"]}),e.jsx("button",{className:`yloy3-reward-btn ${a?"yloy3-reward-btn--afford":"yloy3-reward-btn--locked"}`,onClick:()=>o?A(r):j(),children:o?a?"Échanger":`Encore ${(r.cout_points-z).toLocaleString("fr-FR")} pts`:"S'inscrire"})]},r.id)})})),R==="packs"&&(n?e.jsxs("div",{className:"yloy3-loading",children:[e.jsx("div",{className:"yloy3-spinner"}),"Chargement..."]}):m.length===0?e.jsxs("div",{className:"yloy3-empty",children:[e.jsx("div",{className:"yloy3-empty-ico",children:"💎"}),e.jsx("p",{children:"Aucun pack disponible pour le moment."})]}):e.jsx("div",{className:"yloy3-packs-grid",children:m.map(r=>{const a=r.bonus_pct?Math.round(r.points*r.bonus_pct/100):0,x=r.points+a,L=ge(r.badge);return e.jsxs("div",{role:"button",tabIndex:0,className:`yloy3-pack-card ${L}`.trim(),onClick:()=>o?u(r):j(),onKeyDown:S=>{(S.key==="Enter"||S.key===" ")&&(S.preventDefault(),o?u(r):j())},children:[r.badge&&e.jsx("span",{className:`yloy3-pack-badge ${xe(r.badge)}`,children:fe(r.badge)}),e.jsx("div",{className:"yloy3-pack-emoji-wrap",style:{background:r.color_bg},children:r.emoji}),e.jsxs("div",{className:"yloy3-pack-title",children:["Pack ",r.nom]}),e.jsxs("div",{className:"yloy3-pack-pts",children:[x.toLocaleString("fr-FR")," pts"]}),a>0&&e.jsxs("div",{className:"yloy3-pack-bonus",children:["+",a," pts bonus (+",r.bonus_pct,"%)"]}),e.jsxs("div",{className:"yloy3-pack-price",children:[r.prix_fcfa.toLocaleString("fr-FR")," FCFA"]}),e.jsxs("div",{className:"yloy3-pack-unit",children:[(r.prix_fcfa/x).toFixed(1)," FCFA / pt"]}),e.jsx("div",{className:"yloy3-pack-buy",children:o?"Acheter":"Créer un compte"})]},r.id)})})),R==="history"&&(o?n?e.jsxs("div",{className:"yloy3-loading",children:[e.jsx("div",{className:"yloy3-spinner"}),"Chargement..."]}):s.length===0?e.jsxs("div",{className:"yloy3-empty",children:[e.jsx("div",{className:"yloy3-empty-ico",children:"📜"}),e.jsx("p",{children:"Aucune transaction pour l'instant."}),e.jsx("p",{style:{fontSize:".78rem",marginTop:8},children:"Passez une commande ou laissez un avis pour voir vos points apparaître ici."})]}):e.jsx("div",{className:"yloy3-history",children:s.map(r=>{const a=ie[r.type]||{label:r.type,emoji:"💫"},x=r.points>0;return e.jsxs("div",{className:"yloy3-history-row",children:[e.jsx("div",{className:"yloy3-history-ico",children:a.emoji}),e.jsxs("div",{children:[e.jsx("div",{className:"yloy3-history-title",children:a.label}),e.jsxs("div",{className:"yloy3-history-sub",children:[r.description||"—",r.montant_fcfa?` · ${r.montant_fcfa.toLocaleString("fr-FR")} FCFA`:""]})]}),e.jsxs("div",{className:"yloy3-history-pts",children:[e.jsxs("div",{className:`yloy3-history-amt ${x?"yloy3-history-amt--gain":"yloy3-history-amt--loss"}`,children:[x?"+":"",r.points.toLocaleString("fr-FR")]}),e.jsx("div",{className:"yloy3-history-date",children:new Date(r.created_at).toLocaleDateString("fr-FR",{day:"numeric",month:"short",year:"numeric"})})]})]},r.id)})}):e.jsxs("div",{className:"yloy3-empty",children:[e.jsx("div",{className:"yloy3-empty-ico",children:"📜"}),e.jsx("p",{children:"Créez un compte pour suivre l'historique de vos points."}),e.jsxs("div",{style:{marginTop:14,display:"flex",justifyContent:"center",gap:10,flexWrap:"wrap"},children:[e.jsx("button",{className:"yloy3-btn yloy3-btn--pri",onClick:j,children:"Créer mon compte"}),e.jsx("button",{className:"yloy3-btn yloy3-btn--ghost",onClick:I,children:"Me connecter"})]})]})),o&&R==="rewards"&&h.length>0&&e.jsxs("div",{children:[e.jsx("div",{className:"yloy3-codes-title",children:"🎟️ Mes codes récompenses actifs"}),e.jsx("div",{className:"yloy3-codes-grid",children:h.map(r=>e.jsxs("div",{className:"yloy3-code-card",children:[e.jsx("div",{className:"yloy3-code-name",children:r.reward_nom}),e.jsx("div",{className:"yloy3-code-val",children:r.code}),e.jsxs("div",{className:"yloy3-code-meta",children:[e.jsxs("span",{children:["Statut : ",r.status]}),e.jsx("span",{children:r.expire_at?`Exp. ${new Date(r.expire_at).toLocaleDateString("fr-FR")}`:""})]})]},r.id))})]})]}),e.jsx("section",{className:"yloy3-section",children:e.jsxs("div",{className:"yloy3-referral",children:[e.jsxs("div",{className:"yloy3-referral-left",children:[e.jsx("span",{className:"yloy3-eyebrow",children:"04 · Parrainage"}),e.jsxs("h2",{className:"yloy3-h2 yloy3-h2--on-dark",children:["Invitez un proche,",e.jsx("br",{}),e.jsx("em",{children:"gagnez 100 pts."})]}),e.jsxs("p",{className:"yloy3-sub yloy3-sub--on-dark",children:["Partagez votre lien : à chaque inscription validée, vous recevez ",e.jsx("strong",{children:"100 points"})," de bonus — et votre filleul démarre avec ",e.jsx("strong",{children:"50 points offerts"}),"."]})]}),e.jsxs("div",{className:"yloy3-referral-right",children:[e.jsx("label",{className:"yloy3-referral-lbl",htmlFor:"yloy3-ref-code",children:"Votre lien de parrainage"}),e.jsxs("div",{className:"yloy3-referral-row",children:[e.jsx("input",{id:"yloy3-ref-code",type:"text",readOnly:!0,className:"yloy3-referral-inp",value:`https://yorix.cm/?ref=${W}`,onFocus:r=>r.target.select()}),e.jsx("button",{className:"yloy3-btn yloy3-btn--pri",onClick:o?te:j,children:o?re?"Copié ✓":"Copier":"Activer"})]}),e.jsx("div",{className:"yloy3-referral-meta",children:o?"💡 Partagez par WhatsApp, SMS ou email — vos points sont crédités automatiquement.":"🔐 Créez un compte pour activer votre lien personnel de parrainage."})]})]})}),e.jsx("section",{className:"yloy3-section",children:e.jsxs("div",{className:"yloy3-nl",children:[e.jsx("div",{className:"yloy3-nl-ico",children:"📬"}),e.jsxs("h2",{className:"yloy3-h2 yloy3-h2--center",children:["Restez informé(e) des ",e.jsx("em",{children:"offres VIP"})]}),e.jsx("p",{className:"yloy3-lead yloy3-lead--center",children:"Recevez en avant-première les codes promo, les ventes flash et les nouvelles récompenses du programme."}),e.jsxs("form",{className:"yloy3-nl-form",onSubmit:se,noValidate:!0,children:[e.jsx("input",{type:"email",className:"yloy3-nl-input",placeholder:"votre@email.com",value:T,onChange:r=>B(r.target.value),"aria-label":"Adresse email pour la newsletter",required:!0}),e.jsx("button",{type:"submit",className:"yloy3-btn yloy3-btn--pri",children:Y?"Inscrit ✓":"Je m'abonne 🚀"})]}),e.jsx("div",{className:"yloy3-nl-note",children:Y?"🎉 Merci ! Vérifiez votre boîte mail pour confirmer.":"🔒 Pas de spam · désinscription en un clic · conforme RGPD"})]})}),e.jsxs("section",{className:"yloy3-section",children:[e.jsxs("div",{className:"yloy3-section-head",children:[e.jsx("span",{className:"yloy3-eyebrow-light",children:"06 · Questions fréquentes"}),e.jsxs("h2",{className:"yloy3-h2",children:["Tout savoir sur ",e.jsx("em",{children:"Yorix Rewards"})]})]}),e.jsx("div",{className:"yloy3-faq",children:[{q:"Comment fonctionne le programme Yorix Rewards ?",a:"Chaque action (achat, vente, avis, parrainage) vous rapporte des points. Vous échangez ensuite ces points contre des récompenses — codes promo, livraisons offertes, bons d'achat — directement depuis cette page."},{q:"Combien de points par achat ?",a:"Vous gagnez 1 point pour chaque tranche de 500 FCFA dépensée sur la marketplace, paiement validé. Les avantages VIP (Or, Platine) augmentent ce cashback."},{q:"Comment monter de niveau ?",a:"Votre niveau évolue automatiquement selon votre total cumulé de points : 500 pour Argent, 1 000 pour Or, 5 000 pour Platine. Aucun engagement ni frais."},{q:"Mes points expirent-ils ?",a:"Non, vos points restent valables tant que votre compte est actif. Les codes promo générés à l'échange peuvent avoir une date d'expiration indiquée sur le code."},{q:"Le parrainage, comment ça marche ?",a:"Vous partagez votre lien personnel. Dès qu'un filleul s'inscrit et passe une première commande, vous recevez automatiquement 100 points bonus."},{q:"Puis-je acheter des points directement ?",a:"Oui ! Via les packs Yorix Points, vous pouvez acheter des points à prix dégressif. Idéal pour accélérer votre montée en niveau ou échanger immédiatement contre des récompenses."}].map((r,a)=>e.jsxs("details",{className:"yloy3-faq-item",children:[e.jsx("summary",{children:r.q}),e.jsx("p",{children:r.a})]},a))})]}),!o&&e.jsx("section",{className:"yloy3-section",children:e.jsxs("div",{className:"yloy3-final",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"yloy3-h2 yloy3-h2--on-dark",children:"Rejoignez Yorix Rewards aujourd'hui"}),e.jsxs("p",{className:"yloy3-sub yloy3-sub--on-dark",children:["Inscription ",e.jsx("strong",{children:"gratuite"})," · +50 points offerts · 30 secondes chrono."]})]}),e.jsxs("div",{className:"yloy3-final-actions",children:[e.jsx("button",{className:"yloy3-btn yloy3-btn--pri",onClick:j,children:"🚀 Créer mon compte"}),e.jsx("button",{className:"yloy3-btn yloy3-btn--sec",onClick:I,children:"Me connecter"})]})]})})]})]})}export{ke as LoyaltyPage};
