import{j as e,s as R,B as y,a as D}from"./index-53unBa80.js";import{r as g}from"./react-CDaM45aE.js";import{M as k}from"./MarketingBreadcrumb-CMkmj13X.js";import"./supabase-D2gm834s.js";function L(){const[r,a]=g.useState({entreprise:"",contact:"",email:"",telephone:"",besoins:""}),[n,m]=g.useState({}),[x,b]=g.useState(!1),[t,o]=g.useState(!1),p=()=>{const d={};return r.entreprise.trim()||(d.entreprise="Nom de l'entreprise obligatoire"),r.contact.trim()||(d.contact="Nom du contact obligatoire"),r.email.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email)||(d.email="Email invalide"):d.email="Email obligatoire",r.telephone.trim()||(d.telephone="Téléphone obligatoire"),m(d),Object.keys(d).length===0},v=async()=>{if(p()){b(!0);try{await R.from("business_requests").insert({entreprise:r.entreprise,contact:r.contact,email:r.email,telephone:r.telephone,besoins:r.besoins});const d=`Nouvelle demande d'accès Business — ${r.entreprise}`,u=["Bonjour,","","Une nouvelle demande d'accès Business a été soumise sur Yorix CM :","",`🏢 Entreprise : ${r.entreprise}`,`👤 Contact : ${r.contact}`,`📧 Email : ${r.email}`,`📞 Téléphone : ${r.telephone}`,"","📝 Besoins principaux :",r.besoins||"(non précisé)","","---","Envoyé depuis yorix.cm"].join(`
`),c=`mailto:raisaodin1@gmail.com?subject=${encodeURIComponent(d)}&body=${encodeURIComponent(u)}`;window.open(c,"_blank"),o(!0),a({entreprise:"",contact:"",email:"",telephone:"",besoins:""})}catch(d){alert("Erreur : "+d.message)}b(!1)}};return t?e.jsxs("div",{style:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:12,padding:40,textAlign:"center"},children:[e.jsx("div",{style:{fontSize:"3.5rem",marginBottom:14},children:"✅"}),e.jsx("h3",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.2rem",color:"var(--green)",marginBottom:10},children:"Message envoyé avec succès !"}),e.jsx("p",{style:{fontSize:".88rem",color:"var(--gray)",lineHeight:1.7,maxWidth:420,margin:"0 auto 20px"},children:"Merci pour votre intérêt ! Notre équipe Yorix Business vous contactera très bientôt pour discuter de vos besoins professionnels."}),e.jsx("button",{onClick:()=>o(!1),style:{background:"var(--surface2)",color:"var(--ink)",border:"1.5px solid var(--border)",borderRadius:8,padding:"9px 20px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".82rem"},children:"Envoyer une autre demande"})]}):e.jsxs("div",{style:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:12,padding:22},children:[e.jsx("h3",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"var(--ink)",marginBottom:4},children:"📋 Demande d'accès Business"}),e.jsx("p",{style:{fontSize:".78rem",color:"var(--gray)",marginBottom:16},children:"Notre équipe B2B vous contacte sous 24h."}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Entreprise ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:`form-input${n.entreprise?" error":""}`,placeholder:"Nom de l'entreprise",value:r.entreprise,onChange:d=>a(u=>({...u,entreprise:d.target.value}))}),n.entreprise&&e.jsx("span",{className:"form-error-text",children:n.entreprise})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Contact ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:`form-input${n.contact?" error":""}`,placeholder:"Votre nom",value:r.contact,onChange:d=>a(u=>({...u,contact:d.target.value}))}),n.contact&&e.jsx("span",{className:"form-error-text",children:n.contact})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Email pro ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:`form-input${n.email?" error":""}`,type:"email",placeholder:"contact@entreprise.cm",value:r.email,onChange:d=>a(u=>({...u,email:d.target.value}))}),n.email&&e.jsx("span",{className:"form-error-text",children:n.email})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Téléphone ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:`form-input${n.telephone?" error":""}`,placeholder:"+237 6XX XXX XXX",value:r.telephone,onChange:d=>a(u=>({...u,telephone:d.target.value}))}),n.telephone&&e.jsx("span",{className:"form-error-text",children:n.telephone})]}),e.jsxs("div",{className:"form-group full",children:[e.jsx("label",{className:"form-label",children:"Besoins principaux"}),e.jsx("textarea",{className:"form-textarea",style:{minHeight:65},placeholder:"Décrivez vos besoins...",value:r.besoins,onChange:d=>a(u=>({...u,besoins:d.target.value}))})]})]}),e.jsx("button",{className:"form-submit",onClick:v,disabled:x,children:x?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"spinner",style:{width:16,height:16,borderWidth:2}}),"Envoi..."]}):"💼 Soumettre ma demande"})]})}function A({type:r,goPage:a}){const n={cgv:{title:"📜 Conditions Générales de Vente",updated:"Dernière mise à jour : 16 avril 2026",content:[{h:"1. Objet",p:"Les présentes Conditions Générales de Vente (CGV) régissent les relations entre Yorix CM, société camerounaise immatriculée au Registre du Commerce de Douala (RC DOUALA/2026/B237), et toute personne effectuant un achat sur la plateforme www.yorix.cm."},{h:"2. Produits et services",p:"Yorix CM est une marketplace mettant en relation des vendeurs indépendants camerounais et des acheteurs. Les produits vendus sont sous la responsabilité de leurs vendeurs respectifs. Yorix CM assure la sécurité des transactions via son système Escrow."},{h:"3. Commande",p:"La commande est validée après paiement complet (MTN Mobile Money, Orange Money, ou paiement à la livraison selon la zone). Un email de confirmation est envoyé automatiquement. L'acheteur peut suivre sa commande depuis son espace personnel."},{h:"4. Prix et paiement",p:"Les prix sont indiqués en Francs CFA (FCFA) toutes taxes comprises. Les moyens de paiement acceptés sont : MTN Mobile Money, Orange Money, carte bancaire et paiement à la livraison (cash) dans certaines zones. Yorix CM prélève une commission de 5% sur chaque vente, incluse dans le prix affiché."},{h:"5. Livraison",p:"Les délais de livraison varient selon la zone : 20 minutes à 2 heures pour les livraisons intra-ville à Douala et Yaoundé, 1 à 3 jours pour les livraisons inter-villes. Les frais de livraison sont calculés selon la distance et le poids du colis."},{h:"6. Escrow et protection acheteur",p:"Le paiement est bloqué par Yorix CM jusqu'à la confirmation de réception du produit par l'acheteur. En cas de litige, Yorix CM arbitre et rembourse l'acheteur sous 48h si le vendeur est en tort."},{h:"7. Droit de rétractation",p:"Conformément au droit camerounais, l'acheteur dispose d'un délai de 7 jours à compter de la réception du produit pour exercer son droit de rétractation, sauf pour les produits périssables, personnalisés ou descellés pour des raisons d'hygiène."},{h:"8. Garanties",p:"Tous les produits vendus sur Yorix CM bénéficient de la garantie légale de conformité. Les produits électroniques et électroménagers bénéficient d'une garantie minimum de 6 mois, sauf mention contraire du vendeur."},{h:"9. Responsabilité",p:"Yorix CM agit en qualité d'intermédiaire. La responsabilité des produits vendus incombe aux vendeurs. Yorix CM ne saurait être tenu responsable des dommages indirects résultant de l'utilisation des produits."},{h:"10. Litiges",p:"Tout litige sera soumis en priorité à une médiation amiable via le support Yorix CM (support@yorix.cm ou WhatsApp +237 696 56 56 54). À défaut de résolution, les tribunaux de Douala seront seuls compétents."}]},mentions:{title:"📋 Mentions Légales",updated:"Dernière mise à jour : 16 avril 2026",content:[{h:"Éditeur du site",p:`Yorix CM — Société commerciale de droit camerounais
Registre du Commerce : DOUALA/2026/B237
Siège social : Akwa, Douala, Cameroun
Téléphone : +237 696 56 56 54
Email : support@yorix.cm
Site : www.yorix.cm`},{h:"Directeur de la publication",p:"La direction de Yorix CM est responsable de la publication du site et de son contenu éditorial."},{h:"Hébergement",p:"Le site yorix.cm est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. La base de données est hébergée par Supabase Inc. Les images sont stockées sur Cloudinary."},{h:"Propriété intellectuelle",p:"L'ensemble des éléments du site (textes, logos, images, vidéos, code source) sont la propriété exclusive de Yorix CM ou de ses partenaires. Toute reproduction, représentation, modification ou adaptation totale ou partielle est interdite sans autorisation écrite préalable."},{h:"Marque Yorix",p:"« Yorix » est une marque déposée. Son utilisation sans autorisation expose à des poursuites judiciaires."},{h:"Cookies",p:"Le site utilise des cookies techniques nécessaires au fonctionnement de la plateforme (authentification, panier, préférences). Des cookies d'analyse peuvent être utilisés pour améliorer l'expérience utilisateur. Vous pouvez les refuser via les paramètres de votre navigateur."},{h:"Données personnelles",p:"Vos données personnelles sont collectées et traitées conformément à notre Politique de Confidentialité. Vous disposez d'un droit d'accès, de rectification et de suppression en écrivant à support@yorix.cm."},{h:"Contact",p:`Pour toute question : support@yorix.cm
WhatsApp : +237 696 56 56 54
Adresse : Akwa, Douala, Cameroun`}]},confidentialite:{title:"🔒 Politique de Confidentialité",updated:"Dernière mise à jour : 16 avril 2026",content:[{h:"1. Introduction",p:"Yorix CM s'engage à protéger la vie privée de ses utilisateurs. Cette politique décrit comment nous collectons, utilisons et protégeons vos données personnelles."},{h:"2. Données collectées",p:`Nous collectons les données suivantes :
• Identité : nom, prénom, email, téléphone
• Adresse de livraison
• Historique de commandes et préférences
• Données de paiement (non stockées, traitées par les opérateurs mobile)
• Données techniques : adresse IP, type de navigateur, pages visitées`},{h:"3. Finalités du traitement",p:`Vos données sont utilisées pour :
• Traiter vos commandes et assurer la livraison
• Vous contacter concernant vos achats
• Améliorer nos services et votre expérience
• Vous envoyer des offres (avec votre consentement)
• Respecter nos obligations légales et fiscales`},{h:"4. Partage des données",p:`Vos données sont partagées uniquement avec :
• Les vendeurs concernés par vos commandes (nom, téléphone, adresse)
• Les livreurs pour assurer la livraison
• Les opérateurs de paiement mobile (MTN MoMo, Orange Money)
• Les autorités légales sur réquisition judiciaire

Nous ne vendons jamais vos données à des tiers.`},{h:"5. Durée de conservation",p:"Vos données de compte sont conservées tant que votre compte est actif. Les données de commande sont conservées 10 ans à des fins comptables et légales. Vous pouvez demander la suppression de votre compte à tout moment."},{h:"6. Sécurité",p:"Vos données sont stockées de manière sécurisée chez Supabase (certifié SOC 2). Les mots de passe sont chiffrés. Les paiements sont traités directement par les opérateurs mobiles sans que Yorix ne stocke vos identifiants bancaires."},{h:"7. Vos droits",p:`Vous disposez des droits suivants :
• Accès à vos données
• Rectification de données inexactes
• Suppression (« droit à l'oubli »)
• Portabilité de vos données
• Opposition au traitement

Pour exercer ces droits : support@yorix.cm`},{h:"8. Cookies",p:"Les cookies techniques (authentification, panier) sont nécessaires au fonctionnement du site. Les cookies analytiques (statistiques anonymes) peuvent être désactivés dans votre navigateur sans perte de fonctionnalité."},{h:"9. Modifications",p:"Cette politique peut être modifiée. Les utilisateurs seront informés de tout changement substantiel par email ou via une notification sur la plateforme."},{h:"10. Contact",p:`Pour toute question concernant vos données personnelles :
Email : support@yorix.cm
WhatsApp : +237 696 56 56 54`}]}},m=n[r]||n.cgv;return e.jsx("section",{className:"sec anim",children:e.jsxs("div",{style:{maxWidth:820,margin:"0 auto"},children:[e.jsx("button",{onClick:()=>a("home"),style:{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"var(--gray)",fontSize:14,marginBottom:20,padding:"8px 0"},children:"← Retour à l'accueil"}),e.jsx("h1",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.8rem",color:"var(--ink)",marginBottom:6,letterSpacing:"-.5px"},children:m.title}),e.jsx("p",{style:{fontSize:".78rem",color:"var(--gray)",marginBottom:28},children:m.updated}),e.jsx("div",{style:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:"26px 30px"},children:m.content.map((x,b)=>e.jsxs("div",{style:{marginBottom:24},children:[e.jsx("h2",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"var(--green)",marginBottom:8},children:x.h}),e.jsx("p",{style:{fontSize:".85rem",color:"var(--ink)",lineHeight:1.75,whiteSpace:"pre-line"},children:x.p})]},b))}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center",marginTop:24,flexWrap:"wrap"},children:[e.jsx("button",{onClick:()=>a("cgv"),style:{padding:"9px 18px",borderRadius:8,border:`1.5px solid ${r==="cgv"?"var(--green)":"var(--border)"}`,background:r==="cgv"?"var(--green)":"var(--surface)",color:r==="cgv"?"#fff":"var(--ink)",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".8rem"},children:"📜 CGV"}),e.jsx("button",{onClick:()=>a("mentions"),style:{padding:"9px 18px",borderRadius:8,border:`1.5px solid ${r==="mentions"?"var(--green)":"var(--border)"}`,background:r==="mentions"?"var(--green)":"var(--surface)",color:r==="mentions"?"#fff":"var(--ink)",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".8rem"},children:"📋 Mentions légales"}),e.jsx("button",{onClick:()=>a("confidentialite"),style:{padding:"9px 18px",borderRadius:8,border:`1.5px solid ${r==="confidentialite"?"var(--green)":"var(--border)"}`,background:r==="confidentialite"?"var(--green)":"var(--surface)",color:r==="confidentialite"?"#fff":"var(--ink)",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".8rem"},children:"🔒 Confidentialité"})]}),e.jsxs("div",{style:{textAlign:"center",marginTop:20,fontSize:".78rem",color:"var(--gray)"},children:["Une question ? ",e.jsx("a",{href:"mailto:support@yorix.cm",style:{color:"var(--green)",fontWeight:600},children:"support@yorix.cm"})," · ",e.jsx("a",{href:"https://wa.me/237696565654",style:{color:"var(--green)",fontWeight:600},children:"WhatsApp"})]})]})})}const C={BUSINESS:{icon:"📈",color:"#1565c0",pitch:"Stratégies, lancement, croissance"},LOCAL:{icon:"🌿",color:"#1a6b3a",pitch:"Produits locaux, terroir & export"},PAIEMENT:{icon:"💳",color:"#b45309",pitch:"Mobile money, fintech, escrow"},LIVRAISON:{icon:"🚚",color:"#ea580c",pitch:"Yorix Ride, logistique, suivi"},SÉCURITÉ:{icon:"🔐",color:"#7c3aed",pitch:"Escrow, anti-arnaque, confiance"},PRESTATAIRES:{icon:"⚡",color:"#dc2626",pitch:"Services à domicile, BTP, beauté"},MODE:{icon:"👗",color:"#db2777",pitch:"Style camerounais, wax, tendances"},CARRIÈRE:{icon:"🏍️",color:"#0891b2",pitch:"Devenir vendeur, livreur, freelance"}},Y=[{e:"🇨🇲",t:"100 % camerounais",d:"Rédigé par des journalistes basés à Douala et Yaoundé, sur le terrain."},{e:"✅",t:"Faits vérifiés",d:"Sources publiques, partenaires officiels, chiffres horodatés."},{e:"🧭",t:"Actionnable",d:"Chaque guide se termine par une étape concrète à exécuter aujourd'hui."},{e:"🛡️",t:"Indépendant",d:"Pas d'advertorial déguisé — la transparence éditoriale d'abord."}],B=["BUSINESS","SÉCURITÉ","LIVRAISON"];function S(r){r&&window.open(r,"_blank","noopener,noreferrer")}function T({p:r,size:a="normal"}){const n=C[r.cat]||{icon:r.emoji,color:"#1a6b3a"};return e.jsxs("article",{className:`yblog3-card yblog3-card--${a}`,role:"link",tabIndex:0,onClick:()=>S(r.external_url),onKeyDown:m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),S(r.external_url))},children:[e.jsxs("div",{className:"yblog3-card-media",style:{background:r.color_bg||"#e8f5e9"},children:[r.image?e.jsx("img",{src:r.image,alt:"",loading:"lazy",onError:m=>{m.currentTarget.style.display="none"}}):e.jsx("span",{className:"yblog3-card-emoji","aria-hidden":!0,children:r.emoji}),e.jsxs("span",{className:"yblog3-card-cat",style:{"--cat-color":n.color},children:[e.jsx("span",{"aria-hidden":!0,children:n.icon})," ",r.cat]}),e.jsxs("span",{className:"yblog3-card-read",children:[e.jsx("span",{"aria-hidden":!0,children:"⏱"})," ",r.read]})]}),e.jsxs("div",{className:"yblog3-card-body",children:[e.jsx("h3",{className:"yblog3-card-title",children:r.title}),e.jsx("p",{className:"yblog3-card-ex",children:r.excerpt}),r.tags&&r.tags.length>0&&e.jsx("div",{className:"yblog3-tags",children:r.tags.slice(0,3).map(m=>e.jsxs("span",{className:"yblog3-tag-sm",children:["#",m]},m))}),e.jsxs("div",{className:"yblog3-card-foot",children:[e.jsxs("div",{className:"yblog3-author",children:[e.jsx("div",{className:"yblog3-av","aria-hidden":!0,children:r.author_avatar||"Y"}),e.jsxs("div",{className:"yblog3-author-text",children:[e.jsx("div",{className:"yblog3-an",children:r.author}),e.jsx("div",{className:"yblog3-ad",children:r.date})]})]}),e.jsxs("span",{className:"yblog3-read-hint","aria-hidden":!0,children:["Lire ",e.jsx("span",{children:"→"})]})]})]})]})}function I({items:r}){return e.jsx("nav",{className:"yblog3-bc","aria-label":"Fil d'ariane",children:r.map((a,n)=>e.jsxs("span",{className:"yblog3-bc-item",children:[a.onClick?e.jsx("button",{type:"button",onClick:a.onClick,children:a.label}):e.jsx("span",{className:"yblog3-bc-current",children:a.label}),n<r.length-1&&e.jsx("span",{className:"yblog3-bc-sep","aria-hidden":!0,children:"›"})]},n))})}function W({blogFilter:r,setBlogFilter:a,nlEmail:n,setNlEmail:m,nlSent:x,setNlSent:b,goPage:t}){const[o,p]=g.useState(""),v=g.useMemo(()=>Array.from(new Set(y.map(i=>i.cat))),[]),d=g.useMemo(()=>{const i={TOUT:y.length};return y.forEach(h=>{i[h.cat]=(i[h.cat]||0)+1}),i},[]),u=g.useMemo(()=>{const i=o.trim().toLowerCase();return y.filter(h=>r==="TOUT"||h.cat===r).filter(h=>!i||h.title.toLowerCase().includes(i)||h.excerpt.toLowerCase().includes(i)||(h.tags||[]).some(q=>q.toLowerCase().includes(i)))},[r,o]),c=g.useMemo(()=>y.find(i=>i.featured&&(r==="TOUT"||i.cat===r))||u[0]||y[0],[r,u]),N=g.useMemo(()=>r==="TOUT"&&!o?u.filter(i=>i.id!==(c==null?void 0:c.id)):u,[u,c,r,o]),j=g.useMemo(()=>y.filter(i=>B.includes(i.cat)).slice(0,3),[]),z=async()=>{if(!(!n||!n.includes("@"))){try{await R.from("newsletter").insert({email:n})}catch(i){console.warn(i==null?void 0:i.message)}b(!0)}},f=c?C[c.cat]||{icon:c.emoji,color:"#1a6b3a"}:null;return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
    .yorix-blog-v3 {
      --jb-green: #1a6b3a;
      --jb-green-deep: #0d4d28;
      --jb-green-pale: #e8f5e9;
      --jb-green-light: #86efac;
      --jb-yellow: #fcd116;
      --jb-gold: #f59e0b;
      --jb-ink: var(--ink, #111);
      --jb-gray: var(--gray, #666);
      --jb-surface: var(--surface, #fff);
      --jb-surface2: var(--surface2, #f8f8f8);
      --jb-border: var(--border, #e5e5e5);
      --jb-radius: 16px;
      --jb-shadow: 0 12px 30px rgba(0,0,0,.08);
      --jb-shadow-hover: 0 22px 50px rgba(0,0,0,.14);

      font-family: 'DM Sans', sans-serif;
      color: var(--jb-ink);
    }
    .yorix-blog-v3 * { box-sizing: border-box; }

    /* ━━━ BREADCRUMB ━━━ */
    .yblog3-bc {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      margin-bottom: 20px;
      font-size: .76rem;
    }
    .yblog3-bc-item { display: inline-flex; align-items: center; gap: 6px; }
    .yblog3-bc button {
      background: none;
      border: none;
      color: rgba(255,255,255,.65);
      cursor: pointer;
      padding: 0;
      font-family: inherit;
      font-size: inherit;
      transition: color .15s;
    }
    .yblog3-bc button:hover { color: var(--jb-yellow); }
    .yblog3-bc-current { color: #fff; font-weight: 600; }
    .yblog3-bc-sep { color: rgba(255,255,255,.35); font-size: .9rem; }

    /* ━━━ HERO MAGAZINE PREMIUM ━━━ */
    .yblog3-hero {
      position: relative;
      background: linear-gradient(135deg, #0a1410 0%, #1a3a24 45%, #0d3320 100%);
      color: #fff;
      padding: 56px 24px 64px;
      overflow: hidden;
      border-radius: 0 0 28px 28px;
      margin-bottom: 50px;
    }
    .yblog3-hero::before {
      content: '';
      position: absolute;
      top: -100px; right: -80px;
      width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(252,209,22,.16), transparent 65%);
      border-radius: 50%;
      pointer-events: none;
    }
    .yblog3-hero::after {
      content: '';
      position: absolute;
      bottom: -150px; left: -120px;
      width: 420px; height: 420px;
      background: radial-gradient(circle, rgba(79,209,125,.12), transparent 65%);
      border-radius: 50%;
      pointer-events: none;
    }
    .yblog3-hero-inner {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
    }
    .yblog3-hero-grid {
      display: grid;
      grid-template-columns: 1.05fr 1fr;
      gap: 44px;
      align-items: center;
    }

    .yblog3-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: rgba(252,209,22,.14);
      color: var(--jb-yellow);
      border: 1px solid rgba(252,209,22,.32);
      padding: 6px 14px;
      border-radius: 50px;
      font-size: .7rem;
      font-weight: 700;
      margin-bottom: 18px;
      letter-spacing: .04em;
    }
    .yblog3-eyebrow-dot {
      width: 7px; height: 7px;
      background: var(--jb-yellow);
      border-radius: 50%;
      box-shadow: 0 0 12px var(--jb-yellow);
      animation: yblog3Pulse 2s ease-in-out infinite;
    }
    @keyframes yblog3Pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%      { opacity: .5; transform: scale(1.4); }
    }

    .yblog3-h1 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 800;
      line-height: 1.07;
      letter-spacing: -1.5px;
      margin-bottom: 16px;
    }
    .yblog3-h1 em {
      font-style: normal;
      background: linear-gradient(135deg, #fcd116, #f59e0b);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .yblog3-sub {
      font-size: clamp(.95rem, 1.5vw, 1.05rem);
      color: rgba(255,255,255,.75);
      line-height: 1.7;
      margin-bottom: 22px;
      max-width: 520px;
    }
    .yblog3-sub strong { color: #fff; font-weight: 700; }

    /* HERO SEARCH */
    .yblog3-hero-search {
      position: relative;
      max-width: 460px;
      margin-bottom: 18px;
    }
    .yblog3-hero-search-ico {
      position: absolute;
      left: 16px; top: 50%;
      transform: translateY(-50%);
      font-size: 1rem;
      pointer-events: none;
    }
    .yblog3-hero-search input {
      width: 100%;
      padding: 12px 42px 12px 42px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,.15);
      background: rgba(255,255,255,.08);
      backdrop-filter: blur(10px);
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      font-size: .88rem;
      outline: none;
      transition: all .2s;
    }
    .yblog3-hero-search input::placeholder { color: rgba(255,255,255,.5); }
    .yblog3-hero-search input:focus {
      border-color: var(--jb-yellow);
      background: rgba(255,255,255,.12);
    }
    .yblog3-hero-search-clear {
      position: absolute;
      right: 10px; top: 50%;
      transform: translateY(-50%);
      background: rgba(255,255,255,.15);
      border: none;
      width: 24px; height: 24px;
      border-radius: 50%;
      color: #fff;
      font-size: 1rem;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .yblog3-hero-search-clear:hover { background: rgba(255,255,255,.25); }

    /* THEMES TAGS */
    .yblog3-hero-themes {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
      margin: 0 0 22px;
    }
    .yblog3-hero-themes li { display: inline-flex; }
    .yblog3-hero-theme {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.12);
      color: rgba(255,255,255,.85);
      padding: 5px 11px;
      border-radius: 50px;
      font-family: inherit;
      font-size: .72rem;
      font-weight: 600;
      cursor: pointer;
      transition: all .15s;
    }
    .yblog3-hero-theme:hover {
      background: rgba(252,209,22,.14);
      border-color: rgba(252,209,22,.32);
      color: var(--jb-yellow);
      transform: translateY(-1px);
    }

    .yblog3-hero-trust {
      display: flex;
      gap: 18px;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .yblog3-hero-trust li {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: .72rem;
      color: rgba(255,255,255,.55);
    }

    /* HERO FEATURED CARD */
    .yblog3-hero-right {
      position: relative;
      min-height: 360px;
    }
    .yblog3-hero-feat {
      background: var(--jb-surface);
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 28px 60px rgba(0,0,0,.4);
      cursor: pointer;
      transition: transform .3s cubic-bezier(.4,0,.2,1), box-shadow .3s;
      position: relative;
      z-index: 2;
    }
    .yblog3-hero-feat:hover {
      transform: translateY(-5px);
      box-shadow: 0 35px 70px rgba(0,0,0,.5);
    }
    .yblog3-hero-feat-media {
      position: relative;
      height: 220px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .yblog3-hero-feat-media img {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform .5s;
    }
    .yblog3-hero-feat:hover .yblog3-hero-feat-media img {
      transform: scale(1.05);
    }
    .yblog3-hero-feat-fallback {
      font-size: 5rem;
      opacity: .5;
    }
    .yblog3-hero-feat-pin {
      position: absolute;
      top: 14px; left: 14px;
      background: var(--jb-yellow);
      color: #0d1f14;
      padding: 5px 12px;
      border-radius: 50px;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .68rem;
      letter-spacing: .04em;
      box-shadow: 0 6px 18px rgba(252,209,22,.4);
      animation: yblog3Wave 3s ease-in-out infinite;
    }
    @keyframes yblog3Wave {
      0%, 100% { transform: rotate(-2deg); }
      50%      { transform: rotate(2deg); }
    }
    .yblog3-hero-feat-body {
      padding: 22px 22px 20px;
    }
    .yblog3-hero-feat-kicker {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: var(--cat-color, var(--jb-green));
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .7rem;
      letter-spacing: .08em;
      margin-bottom: 9px;
    }
    .yblog3-hero-feat-title {
      font-family: 'Syne', sans-serif;
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--jb-ink);
      letter-spacing: -.4px;
      line-height: 1.25;
      margin-bottom: 8px;
    }
    .yblog3-hero-feat-ex {
      font-size: .82rem;
      color: var(--jb-gray);
      line-height: 1.6;
      margin-bottom: 14px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .yblog3-hero-feat-foot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
      border-top: 1px solid var(--jb-border);
    }

    /* SHARED AUTHOR */
    .yblog3-author {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .yblog3-av {
      width: 30px; height: 30px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--jb-green), var(--jb-green-deep));
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .78rem;
    }
    .yblog3-an {
      font-size: .74rem;
      font-weight: 700;
      color: var(--jb-ink);
      line-height: 1.2;
    }
    .yblog3-ad {
      font-size: .65rem;
      color: var(--jb-gray);
      line-height: 1.3;
    }
    .yblog3-read-hint {
      font-size: .74rem;
      font-weight: 700;
      color: var(--jb-green);
      display: inline-flex;
      align-items: center;
      gap: 3px;
      transition: gap .2s;
    }
    .yblog3-read-hint span { transition: transform .2s; }
    .yblog3-card:hover .yblog3-read-hint,
    .yblog3-hero-feat:hover .yblog3-read-hint {
      gap: 6px;
    }
    .yblog3-card:hover .yblog3-read-hint span,
    .yblog3-hero-feat:hover .yblog3-read-hint span {
      transform: translateX(2px);
    }
    .yblog3-read-hint--strong { font-size: .8rem; }

    /* ━━━ SECTIONS ━━━ */
    .yblog3-section {
      max-width: 1200px;
      margin: 0 auto 56px;
      padding: 0 24px;
    }
    .yblog3-section--tinted {
      background: var(--jb-surface2);
      padding: 56px 24px;
      margin: 0 auto 56px;
      border-radius: 24px;
      max-width: 1248px;
    }
    .yblog3-section-inner { max-width: 100%; }
    .yblog3-section-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 24px;
      margin-bottom: 32px;
      flex-wrap: wrap;
    }
    .yblog3-section-head--center {
      text-align: center;
      flex-direction: column;
      align-items: center;
      max-width: 720px;
      margin: 0 auto 36px;
    }

    .yblog3-eyebrow-light {
      display: inline-block;
      background: var(--jb-surface2);
      color: var(--jb-green);
      border: 1px solid var(--jb-border);
      padding: 5px 12px;
      border-radius: 50px;
      font-size: .66rem;
      font-weight: 700;
      letter-spacing: .12em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .yblog3-h2 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(1.5rem, 3.5vw, 2.1rem);
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -1px;
      color: var(--jb-ink);
      margin-bottom: 10px;
    }
    .yblog3-h2--center { text-align: center; }
    .yblog3-h2 em {
      font-style: normal;
      color: var(--jb-green);
    }
    .yblog3-h2--on-dark { color: #fff; }
    .yblog3-h2--on-dark em {
      background: linear-gradient(135deg, #fcd116, #f59e0b);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .yblog3-h2-sm {
      font-family: 'Syne', sans-serif;
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--jb-ink);
      letter-spacing: -.4px;
    }
    .yblog3-h2-sm em { font-style: normal; color: var(--jb-green); }
    .yblog3-lead {
      font-size: .95rem;
      color: var(--jb-gray);
      line-height: 1.65;
      max-width: 600px;
    }
    .yblog3-lead--center { margin: 0 auto; }
    .yblog3-sub--on-dark { color: rgba(255,255,255,.75); }
    .yblog3-sub--on-dark strong { color: var(--jb-yellow); }

    .yblog3-section-meta {
      font-size: .82rem;
      color: var(--jb-gray);
      white-space: nowrap;
    }
    .yblog3-section-meta strong { color: var(--jb-ink); font-weight: 700; }
    .yblog3-section-q { color: var(--jb-green); font-weight: 600; }

    /* ━━━ CATÉGORIES PILLS ━━━ */
    .yblog3-cats-head {
      text-align: center;
      margin-bottom: 22px;
    }
    .yblog3-cats {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .yblog3-cat {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: var(--jb-surface);
      border: 1.5px solid var(--jb-border);
      color: var(--jb-ink);
      padding: 9px 16px;
      border-radius: 50px;
      font-family: inherit;
      font-size: .82rem;
      font-weight: 600;
      cursor: pointer;
      transition: all .2s;
    }
    .yblog3-cat:hover {
      border-color: var(--cat-color, var(--jb-green));
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(0,0,0,.06);
    }
    .yblog3-cat.is-active {
      background: var(--cat-color, var(--jb-green));
      border-color: var(--cat-color, var(--jb-green));
      color: #fff;
      box-shadow: 0 8px 22px rgba(26,107,58,.25);
    }
    .yblog3-cat-ico { font-size: 1rem; }
    .yblog3-cat-count {
      background: rgba(0,0,0,.07);
      padding: 1px 7px;
      border-radius: 50px;
      font-size: .68rem;
      font-weight: 700;
    }
    .yblog3-cat.is-active .yblog3-cat-count {
      background: rgba(255,255,255,.22);
      color: #fff;
    }

    /* ━━━ GRID ARTICLES ━━━ */
    .yblog3-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
      gap: 22px;
    }
    .yblog3-guides-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
    }

    /* ━━━ CARD ARTICLE ━━━ */
    .yblog3-card {
      background: var(--jb-surface);
      border: 1px solid var(--jb-border);
      border-radius: 14px;
      overflow: hidden;
      cursor: pointer;
      transition: all .25s;
      display: flex;
      flex-direction: column;
    }
    .yblog3-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--jb-shadow-hover);
      border-color: var(--jb-green-light);
    }
    .yblog3-card-media {
      position: relative;
      height: 190px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .yblog3-card-media img {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform .5s;
    }
    .yblog3-card:hover .yblog3-card-media img {
      transform: scale(1.06);
    }
    .yblog3-card-emoji {
      font-size: 4rem;
      opacity: .6;
    }
    .yblog3-card-cat {
      position: absolute;
      top: 11px; left: 11px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: rgba(255,255,255,.95);
      backdrop-filter: blur(10px);
      color: var(--cat-color, var(--jb-green));
      padding: 4px 11px;
      border-radius: 50px;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .62rem;
      letter-spacing: .06em;
    }
    .yblog3-card-read {
      position: absolute;
      top: 11px; right: 11px;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      background: rgba(0,0,0,.6);
      backdrop-filter: blur(10px);
      color: #fff;
      padding: 4px 9px;
      border-radius: 50px;
      font-size: .6rem;
      font-weight: 700;
    }
    .yblog3-card-body {
      padding: 16px 16px 14px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .yblog3-card-title {
      font-family: 'Syne', sans-serif;
      font-size: 1rem;
      font-weight: 800;
      color: var(--jb-ink);
      margin-bottom: 8px;
      letter-spacing: -.2px;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .yblog3-card-ex {
      font-size: .8rem;
      color: var(--jb-gray);
      line-height: 1.6;
      margin-bottom: 12px;
      flex: 1;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .yblog3-tags {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }
    .yblog3-tag-sm {
      background: var(--jb-surface2);
      color: var(--jb-gray);
      padding: 2px 8px;
      border-radius: 50px;
      font-size: .6rem;
      font-weight: 600;
    }
    .yblog3-card-foot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 11px;
      border-top: 1px solid var(--jb-border);
    }

    /* CARD GUIDE (variante plus dense) */
    .yblog3-card--guide .yblog3-card-media { height: 170px; }

    /* ━━━ AUTORITÉ ÉDITORIALE ━━━ */
    .yblog3-pillars {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
    }
    .yblog3-pillar {
      background: var(--jb-surface);
      border: 1px solid var(--jb-border);
      border-radius: 14px;
      padding: 22px 20px;
      text-align: center;
      transition: all .25s;
      position: relative;
      overflow: hidden;
    }
    .yblog3-pillar::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--jb-green), var(--jb-yellow));
      transform: scaleX(0);
      transform-origin: left;
      transition: transform .35s;
    }
    .yblog3-pillar:hover {
      transform: translateY(-4px);
      box-shadow: var(--jb-shadow);
      border-color: var(--jb-green-light);
    }
    .yblog3-pillar:hover::before { transform: scaleX(1); }
    .yblog3-pillar-emoji {
      font-size: 2.2rem;
      margin-bottom: 10px;
      display: inline-block;
      transition: transform .3s;
    }
    .yblog3-pillar:hover .yblog3-pillar-emoji {
      transform: scale(1.12) rotate(-5deg);
    }
    .yblog3-pillar h3 {
      font-family: 'Syne', sans-serif;
      font-size: .98rem;
      font-weight: 800;
      color: var(--jb-ink);
      margin-bottom: 6px;
      letter-spacing: -.2px;
    }
    .yblog3-pillar p {
      font-size: .78rem;
      color: var(--jb-gray);
      line-height: 1.6;
      margin: 0;
    }

    /* ━━━ NEWSLETTER ━━━ */
    .yblog3-nl {
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
    .yblog3-nl::before {
      content: '📬';
      position: absolute;
      top: 50%; right: 30px;
      transform: translateY(-50%);
      font-size: 11rem;
      opacity: .04;
      pointer-events: none;
    }
    .yblog3-nl-left { position: relative; z-index: 2; }
    .yblog3-nl-form { position: relative; z-index: 2; }
    .yblog3-nl-perks {
      list-style: none;
      padding: 0;
      margin: 18px 0 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .yblog3-nl-perks li {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: .82rem;
      color: rgba(255,255,255,.85);
    }
    .yblog3-nl-perks li span {
      width: 24px; height: 24px;
      background: rgba(252,209,22,.15);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: .85rem;
    }
    .yblog3-nl-lbl {
      display: block;
      font-size: .72rem;
      color: rgba(255,255,255,.6);
      font-weight: 600;
      margin-bottom: 7px;
      letter-spacing: .04em;
    }
    .yblog3-nl-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
    .yblog3-nl-inp {
      flex: 1;
      min-width: 200px;
      padding: 13px 15px;
      border-radius: 11px;
      border: 1px solid rgba(255,255,255,.15);
      background: rgba(0,0,0,.25);
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      font-size: .88rem;
      outline: none;
      transition: border-color .2s;
    }
    .yblog3-nl-inp::placeholder { color: rgba(255,255,255,.4); }
    .yblog3-nl-inp:focus { border-color: var(--jb-yellow); }
    .yblog3-nl-note {
      font-size: .72rem;
      color: rgba(255,255,255,.55);
      line-height: 1.5;
      margin: 0;
    }

    /* ━━━ CTA FINAL CONTRIBUTION ━━━ */
    .yblog3-final-cta {
      background: linear-gradient(135deg, #0a1410 0%, #1a3a24 100%);
      border-radius: 22px;
      padding: 44px 36px;
      color: #fff;
      display: grid;
      grid-template-columns: 1.3fr 1fr;
      gap: 28px;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    .yblog3-final-cta::before {
      content: '✍️';
      position: absolute;
      top: 50%; right: -10px;
      transform: translateY(-50%) rotate(-10deg);
      font-size: 11rem;
      opacity: .05;
      pointer-events: none;
    }
    .yblog3-final-cta-text { position: relative; z-index: 2; }
    .yblog3-final-cta-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: flex-end;
      position: relative;
      z-index: 2;
    }

    /* ━━━ BUTTONS ━━━ */
    .yblog3-btn {
      padding: 12px 22px;
      border-radius: 11px;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: .85rem;
      cursor: pointer;
      transition: all .2s;
      border: none;
      letter-spacing: -.1px;
      white-space: nowrap;
    }
    .yblog3-btn--pri {
      background: linear-gradient(135deg, var(--jb-yellow), var(--jb-gold));
      color: #0d1f14;
      box-shadow: 0 8px 22px rgba(252,209,22,.32);
    }
    .yblog3-btn--pri:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(252,209,22,.45);
    }
    .yblog3-btn--ghost {
      background: rgba(255,255,255,.1);
      color: #fff;
      border: 1.5px solid rgba(255,255,255,.2);
      backdrop-filter: blur(10px);
    }
    .yblog3-btn--ghost:hover { background: rgba(255,255,255,.18); }
    .yblog3-btn--ghost-dark {
      background: transparent;
      color: var(--jb-ink);
      border: 1.5px solid var(--jb-border);
    }
    .yblog3-btn--ghost-dark:hover {
      background: var(--jb-surface);
      border-color: var(--jb-green);
      color: var(--jb-green);
    }
    .yblog3-nl-submit { padding: 13px 22px; }

    /* ━━━ EMPTY ━━━ */
    .yblog3-empty {
      text-align: center;
      padding: 60px 24px;
      background: var(--jb-surface);
      border: 1.5px dashed var(--jb-border);
      border-radius: 16px;
      max-width: 560px;
      margin: 0 auto;
    }
    .yblog3-empty-ico {
      font-size: 3.5rem;
      margin-bottom: 12px;
      opacity: .55;
    }
    .yblog3-empty h3 {
      font-family: 'Syne', sans-serif;
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--jb-ink);
      margin-bottom: 8px;
      letter-spacing: -.3px;
    }
    .yblog3-empty p {
      color: var(--jb-gray);
      font-size: .88rem;
      line-height: 1.6;
      margin: 0 0 18px;
    }
    .yblog3-empty-cta {
      display: flex;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    /* ━━━ RESPONSIVE ━━━ */
    @media (max-width: 960px) {
      .yblog3-hero { padding: 40px 18px 50px; }
      .yblog3-hero-grid {
        grid-template-columns: 1fr;
        gap: 32px;
      }
      .yblog3-hero-right { min-height: auto; }
      .yblog3-section-head {
        flex-direction: column;
        align-items: flex-start;
      }
      .yblog3-nl {
        grid-template-columns: 1fr;
        gap: 24px;
        padding: 30px 24px;
      }
      .yblog3-final-cta {
        grid-template-columns: 1fr;
        gap: 22px;
        padding: 32px 24px;
        text-align: center;
      }
      .yblog3-final-cta-actions { justify-content: center; }
      .yblog3-section--tinted { padding: 40px 18px; }
    }
    @media (max-width: 500px) {
      .yblog3-hero { padding: 32px 16px 44px; }
      .yblog3-h1 { font-size: 1.85rem; }
      .yblog3-grid { grid-template-columns: 1fr; gap: 16px; }
      .yblog3-section, .yblog3-section--tinted { padding-left: 16px; padding-right: 16px; }
      .yblog3-hero-feat-media { height: 180px; }
      .yblog3-nl-row { flex-direction: column; }
      .yblog3-nl-submit { width: 100%; }
      .yblog3-cats { gap: 6px; }
      .yblog3-cat { padding: 8px 12px; font-size: .76rem; }
    }
  `}),e.jsxs("div",{className:"yorix-blog-v3 anim",children:[e.jsx("header",{className:"yblog3-hero",children:e.jsxs("div",{className:"yblog3-hero-inner",children:[typeof t=="function"&&e.jsx(I,{items:[{label:"Accueil",onClick:()=>t("home")},{label:"Yorix Journal · blog officiel"}]}),e.jsxs("div",{className:"yblog3-hero-grid",children:[e.jsxs("div",{children:[e.jsxs("span",{className:"yblog3-eyebrow",children:[e.jsx("span",{className:"yblog3-eyebrow-dot"})," Yorix Journal · officiel"]}),e.jsxs("h1",{className:"yblog3-h1",children:["Toute l'actualité du",e.jsx("br",{}),e.jsx("em",{children:"commerce camerounais"})]}),e.jsxs("p",{className:"yblog3-sub",children:["Guides pratiques, analyses de marché, tendances et opportunités — rédigés par notre équipe et des experts ",e.jsx("strong",{children:"basés au Cameroun"}),"."]}),e.jsxs("form",{className:"yblog3-hero-search",onSubmit:i=>i.preventDefault(),role:"search","aria-label":"Rechercher un article",children:[e.jsx("span",{className:"yblog3-hero-search-ico","aria-hidden":!0,children:"🔎"}),e.jsx("input",{type:"search",placeholder:"Rechercher : MoMo, livraison, escrow, wax…",value:o,onChange:i=>p(i.target.value),"aria-label":"Rechercher un article"}),o&&e.jsx("button",{type:"button",className:"yblog3-hero-search-clear","aria-label":"Effacer",onClick:()=>p(""),children:"×"})]}),e.jsx("ul",{className:"yblog3-hero-themes","aria-label":"Thèmes éditoriaux",children:Object.entries(C).slice(0,5).map(([i,h])=>e.jsx("li",{children:e.jsxs("button",{type:"button",className:"yblog3-hero-theme",onClick:()=>{a(i),p("")},children:[e.jsx("span",{"aria-hidden":!0,children:h.icon})," ",i]})},i))}),e.jsxs("ul",{className:"yblog3-hero-trust","aria-label":"Engagement éditorial",children:[e.jsxs("li",{children:[e.jsx("span",{"aria-hidden":!0,children:"✅"})," Faits vérifiés"]}),e.jsxs("li",{children:[e.jsx("span",{"aria-hidden":!0,children:"🇨🇲"})," Rédigé au Cameroun"]}),e.jsxs("li",{children:[e.jsx("span",{"aria-hidden":!0,children:"📅"})," Mis à jour chaque semaine"]})]})]}),e.jsx("div",{className:"yblog3-hero-right",children:c&&e.jsxs("article",{className:"yblog3-hero-feat",role:"link",tabIndex:0,onClick:()=>S(c.external_url),onKeyDown:i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),S(c.external_url))},"aria-label":`À la une : ${c.title}`,children:[e.jsxs("div",{className:"yblog3-hero-feat-media",style:{background:c.color_bg||"#e8f5e9"},children:[c.image?e.jsx("img",{src:c.image,alt:"",loading:"lazy",onError:i=>{i.currentTarget.style.display="none"}}):e.jsx("span",{className:"yblog3-hero-feat-fallback","aria-hidden":!0,children:c.emoji}),e.jsx("span",{className:"yblog3-hero-feat-pin",children:"⭐ À la une"})]}),e.jsxs("div",{className:"yblog3-hero-feat-body",children:[e.jsxs("span",{className:"yblog3-hero-feat-kicker",style:{"--cat-color":f==null?void 0:f.color},children:[e.jsx("span",{"aria-hidden":!0,children:f==null?void 0:f.icon})," ",c.cat]}),e.jsx("h2",{className:"yblog3-hero-feat-title",children:c.title}),e.jsx("p",{className:"yblog3-hero-feat-ex",children:c.excerpt}),e.jsxs("div",{className:"yblog3-hero-feat-foot",children:[e.jsxs("div",{className:"yblog3-author",children:[e.jsx("div",{className:"yblog3-av","aria-hidden":!0,children:c.author_avatar||"Y"}),e.jsxs("div",{className:"yblog3-author-text",children:[e.jsx("div",{className:"yblog3-an",children:c.author}),e.jsxs("div",{className:"yblog3-ad",children:[c.date," · ⏱ ",c.read]})]})]}),e.jsxs("span",{className:"yblog3-read-hint yblog3-read-hint--strong","aria-hidden":!0,children:["Lire ",e.jsx("span",{children:"→"})]})]})]})]})})]})]})}),e.jsxs("section",{className:"yblog3-section",children:[e.jsxs("div",{className:"yblog3-cats-head",children:[e.jsx("span",{className:"yblog3-eyebrow-light",children:"Catégories éditoriales"}),e.jsxs("h2",{className:"yblog3-h2-sm",children:["Choisissez votre ",e.jsx("em",{children:"angle"})]})]}),e.jsxs("div",{className:"yblog3-cats",role:"tablist","aria-label":"Filtrer par catégorie",children:[e.jsxs("button",{type:"button",role:"tab","aria-selected":r==="TOUT",className:`yblog3-cat${r==="TOUT"?" is-active":""}`,onClick:()=>a("TOUT"),children:[e.jsx("span",{className:"yblog3-cat-ico","aria-hidden":!0,children:"📚"}),e.jsx("span",{className:"yblog3-cat-label",children:"Tout"}),e.jsx("span",{className:"yblog3-cat-count",children:d.TOUT})]}),v.map(i=>{const h=C[i]||{icon:"📰",color:"#1a6b3a"};return e.jsxs("button",{type:"button",role:"tab","aria-selected":r===i,className:`yblog3-cat${r===i?" is-active":""}`,style:{"--cat-color":h.color},onClick:()=>a(i),children:[e.jsx("span",{className:"yblog3-cat-ico","aria-hidden":!0,children:h.icon}),e.jsx("span",{className:"yblog3-cat-label",children:i}),e.jsx("span",{className:"yblog3-cat-count",children:d[i]||0})]},i)})]})]}),e.jsxs("section",{className:"yblog3-section",children:[e.jsxs("div",{className:"yblog3-section-head",children:[e.jsxs("div",{children:[e.jsx("span",{className:"yblog3-eyebrow-light",children:r==="TOUT"?"01 · Tous nos articles":`01 · Catégorie · ${r}`}),e.jsx("h2",{className:"yblog3-h2",children:"Derniers articles"}),e.jsx("p",{className:"yblog3-lead",children:"Analyses, guides pratiques et tendances — sélectionnés et tenus à jour par la rédaction Yorix."})]}),e.jsxs("div",{className:"yblog3-section-meta",children:[e.jsx("strong",{children:u.length})," article",u.length>1?"s":"",o&&e.jsxs("span",{className:"yblog3-section-q",children:[" · « ",o," »"]})]})]}),N.length===0?e.jsxs("div",{className:"yblog3-empty",children:[e.jsx("div",{className:"yblog3-empty-ico","aria-hidden":!0,children:"📰"}),e.jsx("h3",{children:"Aucun article ne correspond à votre recherche."}),e.jsx("p",{children:"Essayez un autre mot-clé ou parcourez toutes les catégories."}),e.jsx("div",{className:"yblog3-empty-cta",children:e.jsx("button",{type:"button",className:"yblog3-btn yblog3-btn--pri",onClick:()=>{a("TOUT"),p("")},children:"Voir tous les articles"})})]}):e.jsx("div",{className:"yblog3-grid",children:N.map(i=>e.jsx(T,{p:i},i.id))})]}),r==="TOUT"&&!o&&j.length>0&&e.jsx("section",{className:"yblog3-section--tinted",children:e.jsxs("div",{className:"yblog3-section-inner",children:[e.jsxs("div",{className:"yblog3-section-head",children:[e.jsxs("div",{children:[e.jsx("span",{className:"yblog3-eyebrow-light",children:"02 · Guides pratiques"}),e.jsxs("h2",{className:"yblog3-h2",children:["Nos meilleurs guides pour ",e.jsx("em",{children:"grandir"})]}),e.jsx("p",{className:"yblog3-lead",children:"Business, sécurité, livraison : les ressources que nous recommandons en priorité aux vendeurs et acheteurs."})]}),e.jsx("button",{type:"button",className:"yblog3-btn yblog3-btn--ghost-dark",onClick:()=>a("BUSINESS"),children:"Voir tous les guides →"})]}),e.jsx("div",{className:"yblog3-guides-grid",children:j.map(i=>e.jsx(T,{p:i,size:"guide"},i.id))})]})}),e.jsxs("section",{className:"yblog3-section",children:[e.jsxs("div",{className:"yblog3-section-head yblog3-section-head--center",children:[e.jsx("span",{className:"yblog3-eyebrow-light",children:"03 · Yorix Journal · l'autorité business CM"}),e.jsxs("h2",{className:"yblog3-h2 yblog3-h2--center",children:["Une rédaction au cœur du ",e.jsx("em",{children:"marché camerounais"})]}),e.jsx("p",{className:"yblog3-lead yblog3-lead--center",children:"Notre mission : décrypter le commerce, la livraison et la fintech au Cameroun avec des contenus utiles, vérifiés et actionnables."})]}),e.jsx("div",{className:"yblog3-pillars",children:Y.map(i=>e.jsxs("article",{className:"yblog3-pillar",children:[e.jsx("div",{className:"yblog3-pillar-emoji","aria-hidden":!0,children:i.e}),e.jsx("h3",{children:i.t}),e.jsx("p",{children:i.d})]},i.t))})]}),e.jsx("section",{className:"yblog3-section",children:e.jsxs("div",{className:"yblog3-nl",children:[e.jsxs("div",{className:"yblog3-nl-left",children:[e.jsxs("span",{className:"yblog3-eyebrow",children:[e.jsx("span",{className:"yblog3-eyebrow-dot"})," 04 · Newsletter Yorix Journal"]}),e.jsxs("h2",{className:"yblog3-h2 yblog3-h2--on-dark",children:["Recevez les meilleures ",e.jsx("em",{children:"analyses Yorix"})]}),e.jsxs("p",{className:"yblog3-sub yblog3-sub--on-dark",children:["Une newsletter par semaine · guides, données de marché, opportunités locales.",e.jsx("strong",{children:" Zéro spam, désinscription en un clic."})]}),e.jsxs("ul",{className:"yblog3-nl-perks",children:[e.jsxs("li",{children:[e.jsx("span",{"aria-hidden":!0,children:"📈"})," Analyses commerce CM"]}),e.jsxs("li",{children:[e.jsx("span",{"aria-hidden":!0,children:"🎯"})," Conseils vendeurs"]}),e.jsxs("li",{children:[e.jsx("span",{"aria-hidden":!0,children:"💎"})," Opportunités exclusives"]})]})]}),e.jsxs("form",{className:"yblog3-nl-form",onSubmit:i=>{i.preventDefault(),z()},noValidate:!0,children:[e.jsx("label",{htmlFor:"yblog3-nl-email",className:"yblog3-nl-lbl",children:"VOTRE EMAIL PROFESSIONNEL"}),e.jsxs("div",{className:"yblog3-nl-row",children:[e.jsx("input",{id:"yblog3-nl-email",type:"email",className:"yblog3-nl-inp",placeholder:"vous@entreprise.cm",value:n,onChange:i=>m(i.target.value),required:!0}),e.jsx("button",{type:"submit",className:"yblog3-btn yblog3-btn--pri yblog3-nl-submit",children:x?"Abonné(e) ✓":"S'abonner 🚀"})]}),e.jsx("p",{className:"yblog3-nl-note",children:x?"🎉 Merci ! Confirmez votre inscription depuis l'email que nous venons d'envoyer.":"🔒 RGPD · vous pouvez vous désabonner à tout moment depuis chaque envoi."})]})]})}),e.jsx("section",{className:"yblog3-section",children:e.jsxs("div",{className:"yblog3-final-cta",children:[e.jsxs("div",{className:"yblog3-final-cta-text",children:[e.jsx("span",{className:"yblog3-eyebrow",children:"05 · Vous avez quelque chose à dire ?"}),e.jsxs("h2",{className:"yblog3-h2 yblog3-h2--on-dark",children:["Devenez ",e.jsx("em",{children:"contributeur"}),e.jsx("br",{}),"ou ",e.jsx("em",{children:"partenaire"})]}),e.jsxs("p",{className:"yblog3-sub yblog3-sub--on-dark",children:["Experts business, journalistes, prestataires : proposez un sujet, un guide, ou un partenariat éditorial. ",e.jsx("strong",{children:"Nous lisons toutes les propositions sous 72 heures."})]})]}),e.jsxs("div",{className:"yblog3-final-cta-actions",children:[e.jsx("button",{type:"button",className:"yblog3-btn yblog3-btn--pri",onClick:()=>t==null?void 0:t("contact"),children:"✍️ Proposer un sujet"}),e.jsx("button",{type:"button",className:"yblog3-btn yblog3-btn--ghost",onClick:()=>t==null?void 0:t("business"),children:"Devenir partenaire"})]})]})})]})]})}const w=[{id:"buy",icon:"🛍️",title:"Acheter sur Yorix",faqs:[{q:"Comment passer une commande ?",r:"Parcourez le catalogue ou la recherche, ajoutez au panier puis finalisez sur la page Checkout (paiement sécurisé ou WhatsApp)."},{q:"Quels modes de paiement ?",r:"MTN Mobile Money, Orange Money, CinetPay carte, paiement sécurisé via escrow ou option selon le vendeur."},{q:"Comment fonctionne l'escrow ?",r:"Votre paiement est protégé jusqu'à votre confirmation de réception. En cas de litige, équipe médiation sous 48h ouvrées."}]},{id:"sell",icon:"🏪",title:"Vendre sur Yorix",faqs:[{q:"Comment créer ma boutique ?",r:"Créez un compte vendeur → Dashboard vendeur → Publier un produis. La page est mise en ligne immédiatement."},{q:"Commission Yorix ?",r:"Commission standard indicative 5% sur la vente (montants vendeur calculés automatiquement à la commande)."},{q:"Badge Top vendeur ?",r:"Réactivité et historique positif augmentent votre visibilité — contactez-nous pour le programme mis en avant."}]},{id:"ship",icon:"🚚",title:"Livraison & suivi",faqs:[{q:"Quels sont les délais ?",r:"Zones prioritaires (Douala, Yaoundé) : souvent 24–72 h. Autres régions : 3–7 jours ouvrés selon transport."},{q:"Colis non reçu ?",r:"Via Support WhatsApp +237 696 56 56 54 avec votre code de suivi ou référence commande groupe."}]},{id:"money",icon:"💰",title:"Fidélité & points",faqs:[{q:"Comment gagner des points ?",r:"Achats, ventes, actions qualité sur la plateforme — vérifiez votre solde depuis Fidélité."},{q:"Échange minimum ?",r:"Seuils indiqués sur la page Fidélité (bons d'achat et récompenses mises à jour régulièrement)."}]}];function E(r){return String(r||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}function O({goPage:r}){const[a,n]=g.useState(""),[m,x]=g.useState(w[0].id),b=g.useMemo(()=>{const t=E(a);return t?w.map(o=>({...o,faqs:o.faqs.filter(p=>E(p.q+p.r).includes(t))})).filter(o=>o.faqs.length>0):w},[a]);return e.jsxs("div",{className:"yorix-help yorix-pro-page anim",children:[e.jsxs("div",{className:"yorix-help-hero",children:[e.jsx(k,{items:[{label:"Accueil",onClick:()=>r("home")},{label:"Centre d'aide"}]}),e.jsx("h1",{className:"yorix-help-title",children:"Centre d'aide Yorix"}),e.jsx("p",{className:"yorix-help-lead",children:"Réponses instantanées, organisées par sujet — marketplace, escrow, livraison et fidélité."}),e.jsxs("label",{className:"yorix-help-search",children:[e.jsx("span",{className:"visually-hidden",children:"Rechercher dans l'aide"}),e.jsx("input",{type:"search",value:a,onChange:t=>n(t.target.value),placeholder:"Ex. escrow, livraison, points…",autoComplete:"off"})]}),e.jsxs("div",{className:"yorix-help-quick",children:[e.jsx("button",{type:"button",className:"yorix-chip",onClick:()=>r("escrow"),children:"Escrow acheteur"}),e.jsx("button",{type:"button",className:"yorix-chip",onClick:()=>r("livraison"),children:"Suivi livraison"}),e.jsx("button",{type:"button",className:"yorix-chip",onClick:()=>r("loyalty"),children:"Points Yorix"}),e.jsx("button",{type:"button",className:"yorix-chip wa",onClick:()=>r("contact"),children:"Contacter support"})]})]}),e.jsxs("div",{className:"yorix-help-layout",children:[e.jsx("aside",{className:"yorix-help-sidebar","aria-label":"Catégories d'aide",children:e.jsx("nav",{className:"yorix-help-nav",children:w.map(t=>e.jsxs("button",{type:"button",className:`yorix-help-nav-item${m===t.id?" is-active":""}`,onClick:()=>{var o;x(t.id),(o=document.getElementById(`help-sec-${t.id}`))==null||o.scrollIntoView({behavior:"smooth",block:"start"})},children:[e.jsx("span",{"aria-hidden":!0,children:t.icon}),e.jsx("span",{children:t.title})]},t.id))})}),e.jsxs("div",{className:"yorix-help-main",children:[b.length===0?e.jsxs("div",{className:"yorix-help-empty",children:[e.jsxs("p",{children:["Aucun résultat pour « ",a," »."]}),e.jsx("button",{type:"button",className:"cta-y",onClick:()=>n(""),children:"Effacer la recherche"})]}):b.map(t=>e.jsxs("section",{id:`help-sec-${t.id}`,className:"yorix-help-block",children:[e.jsxs("h2",{className:"yorix-help-block-title",children:[e.jsx("span",{className:"yorix-help-block-ico","aria-hidden":!0,children:t.icon}),t.title]}),e.jsx("div",{className:"yorix-help-faq-list",children:t.faqs.map((o,p)=>e.jsxs("details",{className:"yorix-details",children:[e.jsx("summary",{children:o.q}),e.jsx("p",{children:o.r})]},`${t.id}-${p}`))})]},t.id)),e.jsxs("div",{className:"yorix-help-cta-bar",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Besoin d'un humain ?"}),e.jsx("span",{children:"Équipe en ligne 7j/7 pour les urgences commande."})]}),e.jsx("button",{type:"button",className:"btn-wa",onClick:()=>r("contact"),children:"WhatsApp & contact"})]})]})]})]})}function G({page:r,goPage:a,setAuthOpen:n,setAuthTab:m,setSelectedRole:x,inscriptionSent:b,setInscriptionSent:t,inscriptionForm:o,setInscriptionForm:p,inscriptionError:v,inscriptionLoading:d,submitInscriptionPrestataire:u,academyCourses:c,academyLoading:N,goAcademyDetail:j,blogFilter:z,setBlogFilter:f,nlEmail:M,setNlEmail:i,nlSent:h,setNlSent:q}){switch(r){case"faq":return e.jsx("section",{className:"sec anim",children:e.jsxs("div",{style:{maxWidth:760,margin:"0 auto"},children:[e.jsxs("header",{style:{textAlign:"center",marginBottom:22},children:[e.jsx("h1",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.45rem",color:"var(--ink)"},children:"FAQ — Yorix marketplace Cameroun"}),e.jsx("p",{style:{color:"var(--gray)",fontSize:".86rem"},children:"Livraison, escrow, paiement MoMo et prestataires."})]}),[{q:"Comment acheter sur Yorix ?",a:"Choisissez un produit, ajoutez au panier, puis validez via WhatsApp ou votre espace. Paiement MTN MoMo, Orange Money ou selon options affichées."},{q:"La livraison fonctionne comment ?",a:"Yorix Ride met en relation clients et livreurs. Suivi, tarifs affichés avant validation — grandes villes en priorité."},{q:"C’est quoi l’escrow ?",a:"Votre paiement est protégé jusqu’à ce que vous confirmiez la réception. Idéal pour marketplace et achats entre particuliers."},{q:"Comment devenir vendeur ou livreur ?",a:"Créez un compte vendeur ou livreur, acceptez la charte pro, puis accédez à votre tableau de bord."}].map((s,l)=>e.jsxs("details",{style:{marginBottom:10,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:10},children:[e.jsx("summary",{style:{padding:"12px 14px",cursor:"pointer",fontWeight:700,fontSize:".86rem"},children:s.q}),e.jsx("div",{style:{padding:"0 14px 14px",fontSize:".82rem",color:"var(--gray)",lineHeight:1.7},children:s.a})]},l)),e.jsx("div",{style:{textAlign:"center",marginTop:18},children:e.jsx("button",{type:"button",className:"cta-w",onClick:()=>a("aide"),children:"Centre d'aide complet →"})})]})});case"devenirVendeur":return e.jsx("section",{className:"sec anim",children:e.jsxs("div",{style:{maxWidth:640,margin:"0 auto",textAlign:"center"},children:[e.jsx("h1",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.45rem",color:"var(--ink)",marginBottom:10},children:"Vendre sur Yorix — marketplace Cameroun"}),e.jsx("p",{style:{color:"var(--gray)",fontSize:".88rem",lineHeight:1.75,marginBottom:20},children:"Développez votre activité : boutique en ligne, visibilité nationale, paiements MoMo et outils vendeur."}),e.jsx("button",{type:"button",className:"cta-y",onClick:()=>{m("register"),x("seller"),n(!0)},children:"Créer ma boutique vendeur"})]})});case"devenirLivreur":return e.jsx("section",{className:"sec anim",children:e.jsxs("div",{style:{maxWidth:640,margin:"0 auto",textAlign:"center"},children:[e.jsx("h1",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.45rem",color:"var(--ink)",marginBottom:10},children:"Devenir livreur Yorix Ride — Cameroun"}),e.jsx("p",{style:{color:"var(--gray)",fontSize:".88rem",lineHeight:1.75,marginBottom:20},children:"Rejoignez le réseau de livraison : missions flexibles, paiement rapide, couverture villes et inter-villes."}),e.jsx("button",{type:"button",className:"cta-y",onClick:()=>{m("register"),x("delivery"),n(!0)},children:"S'inscrire comme livreur"})]})});case"inscription":return e.jsx("section",{className:"sec anim",children:e.jsxs("div",{style:{maxWidth:600,margin:"0 auto"},children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:24},children:[e.jsx("h2",{style:{fontFamily:"'Syne',sans-serif",fontSize:"1.6rem",fontWeight:800,color:"var(--ink)",marginBottom:7,letterSpacing:"-.5px"},children:"👷 Devenir prestataire Yorix"}),e.jsx("p",{style:{color:"var(--gray)",fontSize:".86rem",lineHeight:1.7},children:"Développez votre activité et accédez à des milliers de clients au Cameroun."})]}),b?e.jsxs("div",{style:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:12,padding:40,textAlign:"center"},children:[e.jsx("div",{style:{fontSize:"3.5rem",marginBottom:14},children:"🎉"}),e.jsx("h3",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.2rem",color:"var(--green)",marginBottom:10},children:"Candidature envoyée avec succès !"}),e.jsxs("p",{style:{fontSize:".88rem",color:"var(--gray)",lineHeight:1.7,maxWidth:420,margin:"0 auto 20px"},children:["Merci pour votre intérêt ! L'équipe Yorix vous contactera sous ",e.jsx("strong",{children:"24h"})," pour valider votre profil de prestataire."]}),e.jsxs("div",{style:{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"},children:[e.jsx("button",{onClick:()=>{t(!1),p({nom:"",prenom:"",tel:"",email:"",metier:"",ville:"",experience:"",tarif:"",bio:""})},style:{background:"var(--surface2)",color:"var(--ink)",border:"1.5px solid var(--border)",borderRadius:8,padding:"9px 20px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".82rem"},children:"Soumettre une autre candidature"}),e.jsx("button",{onClick:()=>a("home"),style:{background:"var(--green)",color:"#fff",border:"none",borderRadius:8,padding:"9px 20px",cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem"},children:"← Retour à l'accueil"})]})]}):e.jsxs("div",{style:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:24},children:[v&&e.jsxs("div",{style:{background:"#fff0f0",border:"1px solid #fecaca",color:"#ce1126",borderRadius:8,padding:"10px 14px",marginBottom:14,fontSize:".82rem"},children:["⚠️ ",v]}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Nom ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:"form-input",value:o.nom,onChange:s=>p(l=>({...l,nom:s.target.value})),placeholder:"Votre nom"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Prénom"}),e.jsx("input",{className:"form-input",value:o.prenom,onChange:s=>p(l=>({...l,prenom:s.target.value})),placeholder:"Votre prénom"})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Téléphone ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:"form-input",value:o.tel,onChange:s=>p(l=>({...l,tel:s.target.value})),placeholder:"+237 696 56 56 54"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Email"}),e.jsx("input",{className:"form-input",type:"email",value:o.email,onChange:s=>p(l=>({...l,email:s.target.value})),placeholder:"email@mail.com"})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Métier ",e.jsx("span",{children:"*"})]}),e.jsxs("select",{className:"form-select",value:o.metier,onChange:s=>p(l=>({...l,metier:s.target.value})),children:[e.jsx("option",{value:"",children:"Choisir..."}),["Plomberie","Électricité","Maçonnerie","Peinture","Menuiserie","Informatique","Graphisme","Photographie","Nettoyage","Transport","Cuisine","Autre"].map(s=>e.jsx("option",{children:s},s))]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Ville"}),e.jsxs("select",{className:"form-select",value:o.ville,onChange:s=>p(l=>({...l,ville:s.target.value})),children:[e.jsx("option",{value:"",children:"Choisir..."}),D.filter(s=>s!=="Toutes les villes").map(s=>e.jsx("option",{children:s},s))]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Expérience"}),e.jsx("input",{className:"form-input",value:o.experience,onChange:s=>p(l=>({...l,experience:s.target.value})),placeholder:"Ex: 5 ans"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Tarif (FCFA)"}),e.jsx("input",{className:"form-input",value:o.tarif,onChange:s=>p(l=>({...l,tarif:s.target.value})),placeholder:"Ex: 15 000/h"})]}),e.jsxs("div",{className:"form-group full",children:[e.jsx("label",{className:"form-label",children:"Présentation"}),e.jsx("textarea",{className:"form-textarea",value:o.bio,onChange:s=>p(l=>({...l,bio:s.target.value})),placeholder:"Décrivez vos compétences..."})]})]}),e.jsx("button",{className:"form-submit",disabled:d,onClick:u,children:d?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"spinner",style:{width:16,height:16,borderWidth:2}}),"Envoi en cours..."]}):"🚀 Soumettre ma candidature"}),e.jsx("p",{style:{fontSize:".7rem",color:"var(--gray)",textAlign:"center",marginTop:10,lineHeight:1.5},children:"🔒 Vos informations sont sécurisées · Réponse sous 24h"})]})]})});case"business":return e.jsxs("div",{className:"yorix-pro-page anim",children:[e.jsxs("section",{className:"yorix-bus-hero",children:[e.jsx(k,{items:[{label:"Accueil",onClick:()=>a("home")},{label:"Business"}]}),e.jsx("div",{style:{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(252,209,22,.14)",color:"var(--yellow)",border:"1px solid rgba(252,209,22,.28)",padding:"5px 14px",borderRadius:50,fontSize:".72rem",fontWeight:700,marginBottom:14},children:"💼 Yorix · Business Growth Hub CM"}),e.jsxs("h1",{className:"yorix-bus-h1",children:["Une couche commerce pour ",e.jsx("span",{children:"entreprises ambitieuses"})," au Cameroun"]}),e.jsx("p",{className:"yorix-bus-lead",children:"Achats groupe B2B, logistique, visibilité produit national, paiements traçables (MoMo · Orange Money · Escrow) et accompagnement humain WhatsApp — le tout sur une même plateforme."}),e.jsxs("div",{className:"yorix-bus-cta",children:[e.jsx("button",{type:"button",className:"cta-y",onClick:()=>window.scrollTo({behavior:"smooth",top:520}),children:"Lancer une demande"}),e.jsx("button",{type:"button",className:"cta-w",onClick:()=>a("academy"),children:"Formez vos équipes"})]}),e.jsx("div",{className:"yorix-bus-metrics",children:[["4 rôles pro","Acheteur · Vendeur · Livreur · Prestataire"],["Nationwide CM","Douala · Yaoundé · villes satellites"],["Stack confiance","Escrow • support humain • suivi livraisons"]].map(([s,l])=>e.jsxs("div",{className:"yorix-bus-metric",children:[e.jsx("strong",{children:s}),e.jsx("span",{children:l})]},s))})]}),e.jsxs("section",{className:"sec",children:[e.jsx("h2",{className:"yorix-sec-heading",children:"Piliers de la transformation business"}),e.jsx("div",{className:"yorix-bus-pillars",children:[{icon:"🏬",title:"Achat groupe & sourcing",txt:"Regroupements d’offres marketplace, meilleurs prix catalogue vérifié."},{icon:"📣",title:"Visibilité & campagnes",txt:"Mise en avant produits-services, boosts dans les grandes villes."},{icon:"🧠",title:"Formation continue",txt:"Yorix Academy pour digitaliser vos commerciaux & magasiniers."},{icon:"🏦",title:"Financement & sécurité",txt:"Paiements tracés, escrow et litiges médiation locale."}].map(s=>e.jsxs("article",{className:"yorix-bus-pillar",children:[e.jsx("div",{className:"yorix-bus-pillar-ico",children:s.icon}),e.jsx("h3",{children:s.title}),e.jsx("p",{children:s.txt})]},s.title))})]}),e.jsx("section",{className:"sec",children:e.jsx(L,{})})]});case"academy":return e.jsxs("section",{className:"sec anim yorix-pro-page",children:[e.jsx("div",{style:{marginBottom:18},children:e.jsx(k,{items:[{label:"Accueil",onClick:()=>a("home")},{label:"Academy"}]})}),e.jsxs("div",{className:"yorix-acad-hero",children:[e.jsx("div",{style:{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(252,209,22,.14)",color:"var(--yellow)",border:"1px solid rgba(252,209,22,.26)",padding:"5px 14px",borderRadius:50,fontSize:".72rem",fontWeight:700,marginBottom:14},children:"🎓 Centre d'apprentissage Yorix"}),e.jsxs("h1",{className:"yorix-acad-h1",children:["Upskill vos équipes : ",e.jsx("span",{children:"e-commerce terrain"})," · vente WhatsApp · logistique"]}),e.jsx("p",{className:"yorix-acad-sub",children:"Parcours courts, ludiques et actionnables — pensés pour les vendeurs boutiques, équipes marketing terrain et entrepreneurs diaspora retour au pays."}),e.jsx("div",{className:"yorix-acad-tracks",children:["Retail & Marketplace","Livraison & expérience client","Growth business local","Paiements & conformité"].map(s=>e.jsx("span",{className:"yorix-chip",children:s},s))}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginTop:22},children:[e.jsx("button",{type:"button",className:"cta-y",onClick:()=>{const s=c.find(l=>l.prix===0);s&&j(s)},children:"Commencer gratuitement"}),e.jsx("button",{type:"button",className:"cta-w",onClick:()=>window.scrollTo({top:560,behavior:"smooth"}),children:"Voir le catalogue"}),e.jsx("button",{type:"button",className:"cta-w",onClick:()=>a("blog"),children:"Lire nos guides"})]})]}),N?e.jsxs("div",{className:"loading",children:[e.jsx("div",{className:"spinner"}),"Chargement des formations..."]}):c.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:"🎓"}),e.jsx("p",{children:"Aucune formation pour l'instant"})]}):e.jsx("div",{className:"courses-grid",children:c.map(s=>e.jsxs("div",{className:"course-card",onClick:()=>j(s),style:{cursor:"pointer"},children:[e.jsx("div",{className:"course-img",style:{background:s.color_bg||"#E8F5E9"},children:s.emoji||"🎓"}),e.jsxs("div",{className:"course-body",children:[e.jsx("div",{className:`course-level ${s.category==="DÉBUTANT"?"lc-debutant":s.category==="INTERMÉDIAIRE"?"lc-intermediaire":"lc-avance"}`,children:s.category}),e.jsx("div",{className:"course-title",children:s.title}),e.jsxs("div",{className:"course-meta",children:["⏱ ",s.duration," · 👥 ",s.students_count||0]}),e.jsxs("div",{className:"course-footer",children:[e.jsx("div",{className:"course-price",children:s.prix===0?"Gratuit":`${s.prix.toLocaleString("fr-FR")} FCFA`}),e.jsx("button",{type:"button",className:"course-btn",onClick:l=>{l.stopPropagation(),j(s)},children:"Démarrer →"})]})]})]},s.id))})]});case"blog":return e.jsx(W,{blogFilter:z,setBlogFilter:f,nlEmail:M,setNlEmail:i,nlSent:h,setNlSent:q,goPage:a});case"contact":return e.jsx("section",{className:"sec anim yorix-pro-page",children:e.jsxs("div",{className:"yorix-contact-shell",children:[e.jsx("div",{className:"yorix-bc-row",children:e.jsx(k,{items:[{label:"Accueil",onClick:()=>a("home")},{label:"Contact"}]})}),e.jsxs("div",{className:"yorix-contact-intro",children:[e.jsx("h1",{className:"yorix-contact-h1",children:"📞 Relation client premium"}),e.jsx("p",{className:"yorix-contact-lead",children:"Priorité WhatsApp sous ~120 minutes · téléphone vocal · email pièces jointes — équipes Douala & Yaoundé."})]}),e.jsx("div",{className:"yorix-contact-chips",children:[{icon:"📱",label:"WhatsApp",val:"+237 696 56 56 54",action:()=>window.open(`https://wa.me/237696565654?text=${encodeURIComponent("Bonjour Yorix !")}`)},{icon:"📞",label:"Téléphone",val:"+237 696 56 56 54",action:()=>window.open("tel:+237696565654")},{icon:"✉️",label:"Email",val:"support@yorix.cm",action:()=>window.open("mailto:support@yorix.cm")}].map(s=>e.jsxs("div",{role:"button",tabIndex:0,className:"yorix-contact-chip",onClick:s.action,onKeyDown:l=>{(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),s.action())},children:[e.jsx("span",{className:"yorix-contact-chip-ico",children:s.icon}),e.jsx("span",{className:"yorix-contact-chip-lbl",children:s.label}),e.jsx("span",{className:"yorix-contact-chip-val",children:s.val})]},s.label))}),e.jsxs("div",{className:"yorix-contact-form-card",children:[e.jsx("div",{className:"yorix-contact-form-title",children:"💬 Envoyer un message"}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group",style:{marginBottom:0},children:[e.jsxs("label",{className:"form-label",children:["Nom ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:"form-input",placeholder:"Votre nom"})]}),e.jsxs("div",{className:"form-group",style:{marginBottom:0},children:[e.jsxs("label",{className:"form-label",children:["Email ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:"form-input",type:"email",placeholder:"email@exemple.cm"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Sujet ",e.jsx("span",{children:"*"})]}),e.jsxs("select",{className:"form-select",children:[e.jsx("option",{value:"",children:"Choisir un sujet..."}),["Problème avec une commande","Signaler un vendeur","Remboursement","Problème de paiement","Devenir vendeur","Devenir livreur","Autre"].map(s=>e.jsx("option",{children:s},s))]})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Message ",e.jsx("span",{children:"*"})]}),e.jsx("textarea",{className:"form-textarea",style:{minHeight:90},placeholder:"Décrivez votre demande..."})]}),e.jsx("button",{type:"button",className:"form-submit",onClick:()=>window.open(`https://wa.me/237696565654?text=${encodeURIComponent("Bonjour Yorix ! Je vous contacte pour : ")}`),children:"📱 Continuer via WhatsApp"})]}),e.jsxs("div",{className:"yorix-contact-info-strip",children:[e.jsxs("div",{style:{flex:1,minWidth:200},children:[e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem",color:"var(--green)",marginBottom:6},children:"⏰ Horaires"}),[["Lun – Ven","8h – 20h"],["Samedi","9h – 18h"],["Dimanche","10h – 16h"]].map(([s,l])=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:".75rem",padding:"3px 0",borderBottom:"1px solid var(--border)"},children:[e.jsx("span",{style:{color:"var(--gray)"},children:s}),e.jsx("span",{style:{fontWeight:600,color:"var(--ink)"},children:l})]},s))]}),e.jsxs("div",{style:{flex:1,minWidth:200},children:[e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem",color:"var(--green)",marginBottom:6},children:"📍 Bureaux"}),e.jsxs("div",{style:{fontSize:".75rem",color:"var(--gray)",lineHeight:1.7},children:["Douala — Akwa",e.jsx("br",{}),"Yaoundé — Bastos",e.jsx("br",{}),"📞 +237 696 56 56 54"]})]})]})]})});case"aide":return e.jsx(O,{goPage:a});case"cgv":return e.jsx(A,{type:"cgv",goPage:a});case"mentions":return e.jsx(A,{type:"mentions",goPage:a});case"confidentialite":return e.jsx(A,{type:"confidentialite",goPage:a});default:return null}}export{G as SiteMarketingPages};
