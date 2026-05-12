import{j as e,s as M,B as w,a as L}from"./index-CJvqQFFF.js";import{r as b}from"./react-CDaM45aE.js";import"./supabase-D2gm834s.js";function D(){const[a,i]=b.useState({entreprise:"",contact:"",email:"",telephone:"",besoins:""}),[o,c]=b.useState({}),[g,y]=b.useState(!1),[l,t]=b.useState(!1),m=()=>{const d={};return a.entreprise.trim()||(d.entreprise="Nom de l'entreprise obligatoire"),a.contact.trim()||(d.contact="Nom du contact obligatoire"),a.email.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email)||(d.email="Email invalide"):d.email="Email obligatoire",a.telephone.trim()||(d.telephone="Téléphone obligatoire"),c(d),Object.keys(d).length===0},N=async()=>{if(m()){y(!0);try{await M.from("business_requests").insert({entreprise:a.entreprise,contact:a.contact,email:a.email,telephone:a.telephone,besoins:a.besoins});const d=`Nouvelle demande d'accès Business — ${a.entreprise}`,u=["Bonjour,","","Une nouvelle demande d'accès Business a été soumise sur Yorix CM :","",`🏢 Entreprise : ${a.entreprise}`,`👤 Contact : ${a.contact}`,`📧 Email : ${a.email}`,`📞 Téléphone : ${a.telephone}`,"","📝 Besoins principaux :",a.besoins||"(non précisé)","","---","Envoyé depuis yorix.cm"].join(`
`),p=`mailto:raisaodin1@gmail.com?subject=${encodeURIComponent(d)}&body=${encodeURIComponent(u)}`;window.open(p,"_blank"),t(!0),i({entreprise:"",contact:"",email:"",telephone:"",besoins:""})}catch(d){alert("Erreur : "+d.message)}y(!1)}};return l?e.jsxs("div",{style:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:12,padding:40,textAlign:"center"},children:[e.jsx("div",{style:{fontSize:"3.5rem",marginBottom:14},children:"✅"}),e.jsx("h3",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.2rem",color:"var(--green)",marginBottom:10},children:"Message envoyé avec succès !"}),e.jsx("p",{style:{fontSize:".88rem",color:"var(--gray)",lineHeight:1.7,maxWidth:420,margin:"0 auto 20px"},children:"Merci pour votre intérêt ! Notre équipe Yorix Business vous contactera très bientôt pour discuter de vos besoins professionnels."}),e.jsx("button",{onClick:()=>t(!1),style:{background:"var(--surface2)",color:"var(--ink)",border:"1.5px solid var(--border)",borderRadius:8,padding:"9px 20px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".82rem"},children:"Envoyer une autre demande"})]}):e.jsxs("div",{style:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:12,padding:22},children:[e.jsx("h3",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"var(--ink)",marginBottom:4},children:"📋 Demande d'accès Business"}),e.jsx("p",{style:{fontSize:".78rem",color:"var(--gray)",marginBottom:16},children:"Notre équipe B2B vous contacte sous 24h."}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Entreprise ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:`form-input${o.entreprise?" error":""}`,placeholder:"Nom de l'entreprise",value:a.entreprise,onChange:d=>i(u=>({...u,entreprise:d.target.value}))}),o.entreprise&&e.jsx("span",{className:"form-error-text",children:o.entreprise})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Contact ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:`form-input${o.contact?" error":""}`,placeholder:"Votre nom",value:a.contact,onChange:d=>i(u=>({...u,contact:d.target.value}))}),o.contact&&e.jsx("span",{className:"form-error-text",children:o.contact})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Email pro ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:`form-input${o.email?" error":""}`,type:"email",placeholder:"contact@entreprise.cm",value:a.email,onChange:d=>i(u=>({...u,email:d.target.value}))}),o.email&&e.jsx("span",{className:"form-error-text",children:o.email})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Téléphone ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:`form-input${o.telephone?" error":""}`,placeholder:"+237 6XX XXX XXX",value:a.telephone,onChange:d=>i(u=>({...u,telephone:d.target.value}))}),o.telephone&&e.jsx("span",{className:"form-error-text",children:o.telephone})]}),e.jsxs("div",{className:"form-group full",children:[e.jsx("label",{className:"form-label",children:"Besoins principaux"}),e.jsx("textarea",{className:"form-textarea",style:{minHeight:65},placeholder:"Décrivez vos besoins...",value:a.besoins,onChange:d=>i(u=>({...u,besoins:d.target.value}))})]})]}),e.jsx("button",{className:"form-submit",onClick:N,disabled:g,children:g?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"spinner",style:{width:16,height:16,borderWidth:2}}),"Envoi..."]}):"💼 Soumettre ma demande"})]})}function q({type:a,goPage:i}){const o={cgv:{title:"📜 Conditions Générales de Vente",updated:"Dernière mise à jour : 16 avril 2026",content:[{h:"1. Objet",p:"Les présentes Conditions Générales de Vente (CGV) régissent les relations entre Yorix CM, société camerounaise immatriculée au Registre du Commerce de Douala (RC DOUALA/2026/B237), et toute personne effectuant un achat sur la plateforme www.yorix.cm."},{h:"2. Produits et services",p:"Yorix CM est une marketplace mettant en relation des vendeurs indépendants camerounais et des acheteurs. Les produits vendus sont sous la responsabilité de leurs vendeurs respectifs. Yorix CM assure la sécurité des transactions via son système Escrow."},{h:"3. Commande",p:"La commande est validée après paiement complet (MTN Mobile Money, Orange Money, ou paiement à la livraison selon la zone). Un email de confirmation est envoyé automatiquement. L'acheteur peut suivre sa commande depuis son espace personnel."},{h:"4. Prix et paiement",p:"Les prix sont indiqués en Francs CFA (FCFA) toutes taxes comprises. Les moyens de paiement acceptés sont : MTN Mobile Money, Orange Money, carte bancaire et paiement à la livraison (cash) dans certaines zones. Yorix CM prélève une commission de 5% sur chaque vente, incluse dans le prix affiché."},{h:"5. Livraison",p:"Les délais de livraison varient selon la zone : 20 minutes à 2 heures pour les livraisons intra-ville à Douala et Yaoundé, 1 à 3 jours pour les livraisons inter-villes. Les frais de livraison sont calculés selon la distance et le poids du colis."},{h:"6. Escrow et protection acheteur",p:"Le paiement est bloqué par Yorix CM jusqu'à la confirmation de réception du produit par l'acheteur. En cas de litige, Yorix CM arbitre et rembourse l'acheteur sous 48h si le vendeur est en tort."},{h:"7. Droit de rétractation",p:"Conformément au droit camerounais, l'acheteur dispose d'un délai de 7 jours à compter de la réception du produit pour exercer son droit de rétractation, sauf pour les produits périssables, personnalisés ou descellés pour des raisons d'hygiène."},{h:"8. Garanties",p:"Tous les produits vendus sur Yorix CM bénéficient de la garantie légale de conformité. Les produits électroniques et électroménagers bénéficient d'une garantie minimum de 6 mois, sauf mention contraire du vendeur."},{h:"9. Responsabilité",p:"Yorix CM agit en qualité d'intermédiaire. La responsabilité des produits vendus incombe aux vendeurs. Yorix CM ne saurait être tenu responsable des dommages indirects résultant de l'utilisation des produits."},{h:"10. Litiges",p:"Tout litige sera soumis en priorité à une médiation amiable via le support Yorix CM (support@yorix.cm ou WhatsApp +237 696 56 56 54). À défaut de résolution, les tribunaux de Douala seront seuls compétents."}]},mentions:{title:"📋 Mentions Légales",updated:"Dernière mise à jour : 16 avril 2026",content:[{h:"Éditeur du site",p:`Yorix CM — Société commerciale de droit camerounais
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
WhatsApp : +237 696 56 56 54`}]}},c=o[a]||o.cgv;return e.jsx("section",{className:"sec anim",children:e.jsxs("div",{style:{maxWidth:820,margin:"0 auto"},children:[e.jsx("button",{onClick:()=>i("home"),style:{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"var(--gray)",fontSize:14,marginBottom:20,padding:"8px 0"},children:"← Retour à l'accueil"}),e.jsx("h1",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.8rem",color:"var(--ink)",marginBottom:6,letterSpacing:"-.5px"},children:c.title}),e.jsx("p",{style:{fontSize:".78rem",color:"var(--gray)",marginBottom:28},children:c.updated}),e.jsx("div",{style:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:"26px 30px"},children:c.content.map((g,y)=>e.jsxs("div",{style:{marginBottom:24},children:[e.jsx("h2",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"var(--green)",marginBottom:8},children:g.h}),e.jsx("p",{style:{fontSize:".85rem",color:"var(--ink)",lineHeight:1.75,whiteSpace:"pre-line"},children:g.p})]},y))}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center",marginTop:24,flexWrap:"wrap"},children:[e.jsx("button",{onClick:()=>i("cgv"),style:{padding:"9px 18px",borderRadius:8,border:`1.5px solid ${a==="cgv"?"var(--green)":"var(--border)"}`,background:a==="cgv"?"var(--green)":"var(--surface)",color:a==="cgv"?"#fff":"var(--ink)",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".8rem"},children:"📜 CGV"}),e.jsx("button",{onClick:()=>i("mentions"),style:{padding:"9px 18px",borderRadius:8,border:`1.5px solid ${a==="mentions"?"var(--green)":"var(--border)"}`,background:a==="mentions"?"var(--green)":"var(--surface)",color:a==="mentions"?"#fff":"var(--ink)",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".8rem"},children:"📋 Mentions légales"}),e.jsx("button",{onClick:()=>i("confidentialite"),style:{padding:"9px 18px",borderRadius:8,border:`1.5px solid ${a==="confidentialite"?"var(--green)":"var(--border)"}`,background:a==="confidentialite"?"var(--green)":"var(--surface)",color:a==="confidentialite"?"#fff":"var(--ink)",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".8rem"},children:"🔒 Confidentialité"})]}),e.jsxs("div",{style:{textAlign:"center",marginTop:20,fontSize:".78rem",color:"var(--gray)"},children:["Une question ? ",e.jsx("a",{href:"mailto:support@yorix.cm",style:{color:"var(--green)",fontWeight:600},children:"support@yorix.cm"})," · ",e.jsx("a",{href:"https://wa.me/237696565654",style:{color:"var(--green)",fontWeight:600},children:"WhatsApp"})]})]})})}function R({items:a}){return!Array.isArray(a)||a.length===0?null:e.jsx("nav",{className:"yorix-bc","aria-label":"Fil d'ariane",children:e.jsx("div",{className:"yorix-bc__list",children:a.map((i,o)=>{const c=o===a.length-1;return e.jsxs("span",{className:"yorix-bc__segment",children:[!c&&typeof i.onClick=="function"?e.jsx("button",{type:"button",className:"yorix-bc__link",onClick:i.onClick,children:i.label}):e.jsx("span",{className:c?"yorix-bc__current":"yorix-bc__link","aria-current":c?"page":void 0,children:i.label}),!c&&e.jsx("span",{className:"yorix-bc__sep","aria-hidden":"true",children:"›"})]},`${i.label}-${o}`)})})})}const S={BUSINESS:{icon:"📈",color:"#1565c0",pitch:"Stratégies, lancement, croissance"},LOCAL:{icon:"🌿",color:"#1a6b3a",pitch:"Produits locaux, terroir & export"},PAIEMENT:{icon:"💳",color:"#b45309",pitch:"Mobile money, fintech, escrow"},LIVRAISON:{icon:"🚚",color:"#ea580c",pitch:"Yorix Ride, logistique, suivi"},SÉCURITÉ:{icon:"🔐",color:"#7c3aed",pitch:"Escrow, anti-arnaque, confiance"},PRESTATAIRES:{icon:"⚡",color:"#dc2626",pitch:"Services à domicile, BTP, beauté"},MODE:{icon:"👗",color:"#db2777",pitch:"Style camerounais, wax, tendances"},CARRIÈRE:{icon:"🏍️",color:"#0891b2",pitch:"Devenir vendeur, livreur, freelance"}},B=[{e:"🇨🇲",t:"100 % camerounais",d:"Rédigé par des journalistes basés à Douala et Yaoundé, sur le terrain."},{e:"✅",t:"Faits vérifiés",d:"Sources publiques, partenaires officiels, chiffres horodatés."},{e:"🧭",t:"Actionnable",d:"Chaque guide se termine par une étape concrète à exécuter aujourd'hui."},{e:"🛡️",t:"Indépendant",d:"Pas d'advertorial déguisé — la transparence éditoriale d'abord."}],O=["BUSINESS","SÉCURITÉ","LIVRAISON"];function A(a){a&&window.open(a,"_blank","noopener,noreferrer")}function T({p:a,size:i="normal"}){const o=S[a.cat]||{icon:a.emoji,color:"#1a6b3a"};return e.jsxs("article",{className:`yblog3-card yblog3-card--${i}`,role:"link",tabIndex:0,onClick:()=>A(a.external_url),onKeyDown:c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),A(a.external_url))},children:[e.jsxs("div",{className:"yblog3-card-media",style:{background:a.color_bg||"#e8f5e9"},children:[a.image?e.jsx("img",{src:a.image,alt:"",loading:"lazy",onError:c=>{c.currentTarget.style.display="none"}}):e.jsx("span",{className:"yblog3-card-emoji","aria-hidden":!0,children:a.emoji}),e.jsxs("span",{className:"yblog3-card-cat",style:{"--cat-color":o.color},children:[e.jsx("span",{"aria-hidden":!0,children:o.icon})," ",a.cat]}),e.jsxs("span",{className:"yblog3-card-read",children:[e.jsx("span",{"aria-hidden":!0,children:"⏱"})," ",a.read]})]}),e.jsxs("div",{className:"yblog3-card-body",children:[e.jsx("h3",{className:"yblog3-card-title",children:a.title}),e.jsx("p",{className:"yblog3-card-ex",children:a.excerpt}),a.tags&&a.tags.length>0&&e.jsx("div",{className:"yblog3-tags",children:a.tags.slice(0,3).map(c=>e.jsxs("span",{className:"yblog3-tag-sm",children:["#",c]},c))}),e.jsxs("div",{className:"yblog3-card-foot",children:[e.jsxs("div",{className:"yblog3-author",children:[e.jsx("div",{className:"yblog3-av","aria-hidden":!0,children:a.author_avatar||"Y"}),e.jsxs("div",{className:"yblog3-author-text",children:[e.jsx("div",{className:"yblog3-an",children:a.author}),e.jsx("div",{className:"yblog3-ad",children:a.date})]})]}),e.jsxs("span",{className:"yblog3-read-hint","aria-hidden":!0,children:["Lire ",e.jsx("span",{children:"→"})]})]})]})]})}function V({items:a}){return e.jsx("nav",{className:"yblog3-bc","aria-label":"Fil d'ariane",children:a.map((i,o)=>e.jsxs("span",{className:"yblog3-bc-item",children:[i.onClick?e.jsx("button",{type:"button",onClick:i.onClick,children:i.label}):e.jsx("span",{className:"yblog3-bc-current",children:i.label}),o<a.length-1&&e.jsx("span",{className:"yblog3-bc-sep","aria-hidden":!0,children:"›"})]},o))})}function W({blogFilter:a,setBlogFilter:i,nlEmail:o,setNlEmail:c,nlSent:g,setNlSent:y,goPage:l}){const[t,m]=b.useState(""),N=b.useMemo(()=>Array.from(new Set(w.map(r=>r.cat))),[]),d=b.useMemo(()=>{const r={TOUT:w.length};return w.forEach(h=>{r[h.cat]=(r[h.cat]||0)+1}),r},[]),u=b.useMemo(()=>{const r=t.trim().toLowerCase();return w.filter(h=>a==="TOUT"||h.cat===a).filter(h=>!r||h.title.toLowerCase().includes(r)||h.excerpt.toLowerCase().includes(r)||(h.tags||[]).some(j=>j.toLowerCase().includes(r)))},[a,t]),p=b.useMemo(()=>w.find(r=>r.featured&&(a==="TOUT"||r.cat===a))||u[0]||w[0],[a,u]),k=b.useMemo(()=>a==="TOUT"&&!t?u.filter(r=>r.id!==(p==null?void 0:p.id)):u,[u,p,a,t]),f=b.useMemo(()=>w.filter(r=>O.includes(r.cat)).slice(0,3),[]),C=async()=>{if(!(!o||!o.includes("@"))){try{await M.from("newsletter").insert({email:o})}catch(r){console.warn(r==null?void 0:r.message)}y(!0)}},v=p?S[p.cat]||{icon:p.emoji,color:"#1a6b3a"}:null;return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
  `}),e.jsxs("div",{className:"yorix-blog-v3 anim",children:[e.jsx("header",{className:"yblog3-hero",children:e.jsxs("div",{className:"yblog3-hero-inner",children:[typeof l=="function"&&e.jsx(V,{items:[{label:"Accueil",onClick:()=>l("home")},{label:"Yorix Journal · blog officiel"}]}),e.jsxs("div",{className:"yblog3-hero-grid",children:[e.jsxs("div",{children:[e.jsxs("span",{className:"yblog3-eyebrow",children:[e.jsx("span",{className:"yblog3-eyebrow-dot"})," Yorix Journal · officiel"]}),e.jsxs("h1",{className:"yblog3-h1",children:["Toute l'actualité du",e.jsx("br",{}),e.jsx("em",{children:"commerce camerounais"})]}),e.jsxs("p",{className:"yblog3-sub",children:["Guides pratiques, analyses de marché, tendances et opportunités — rédigés par notre équipe et des experts ",e.jsx("strong",{children:"basés au Cameroun"}),"."]}),e.jsxs("form",{className:"yblog3-hero-search",onSubmit:r=>r.preventDefault(),role:"search","aria-label":"Rechercher un article",children:[e.jsx("span",{className:"yblog3-hero-search-ico","aria-hidden":!0,children:"🔎"}),e.jsx("input",{type:"search",placeholder:"Rechercher : MoMo, livraison, escrow, wax…",value:t,onChange:r=>m(r.target.value),"aria-label":"Rechercher un article"}),t&&e.jsx("button",{type:"button",className:"yblog3-hero-search-clear","aria-label":"Effacer",onClick:()=>m(""),children:"×"})]}),e.jsx("ul",{className:"yblog3-hero-themes","aria-label":"Thèmes éditoriaux",children:Object.entries(S).slice(0,5).map(([r,h])=>e.jsx("li",{children:e.jsxs("button",{type:"button",className:"yblog3-hero-theme",onClick:()=>{i(r),m("")},children:[e.jsx("span",{"aria-hidden":!0,children:h.icon})," ",r]})},r))}),e.jsxs("ul",{className:"yblog3-hero-trust","aria-label":"Engagement éditorial",children:[e.jsxs("li",{children:[e.jsx("span",{"aria-hidden":!0,children:"✅"})," Faits vérifiés"]}),e.jsxs("li",{children:[e.jsx("span",{"aria-hidden":!0,children:"🇨🇲"})," Rédigé au Cameroun"]}),e.jsxs("li",{children:[e.jsx("span",{"aria-hidden":!0,children:"📅"})," Mis à jour chaque semaine"]})]})]}),e.jsx("div",{className:"yblog3-hero-right",children:p&&e.jsxs("article",{className:"yblog3-hero-feat",role:"link",tabIndex:0,onClick:()=>A(p.external_url),onKeyDown:r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),A(p.external_url))},"aria-label":`À la une : ${p.title}`,children:[e.jsxs("div",{className:"yblog3-hero-feat-media",style:{background:p.color_bg||"#e8f5e9"},children:[p.image?e.jsx("img",{src:p.image,alt:"",loading:"lazy",onError:r=>{r.currentTarget.style.display="none"}}):e.jsx("span",{className:"yblog3-hero-feat-fallback","aria-hidden":!0,children:p.emoji}),e.jsx("span",{className:"yblog3-hero-feat-pin",children:"⭐ À la une"})]}),e.jsxs("div",{className:"yblog3-hero-feat-body",children:[e.jsxs("span",{className:"yblog3-hero-feat-kicker",style:{"--cat-color":v==null?void 0:v.color},children:[e.jsx("span",{"aria-hidden":!0,children:v==null?void 0:v.icon})," ",p.cat]}),e.jsx("h2",{className:"yblog3-hero-feat-title",children:p.title}),e.jsx("p",{className:"yblog3-hero-feat-ex",children:p.excerpt}),e.jsxs("div",{className:"yblog3-hero-feat-foot",children:[e.jsxs("div",{className:"yblog3-author",children:[e.jsx("div",{className:"yblog3-av","aria-hidden":!0,children:p.author_avatar||"Y"}),e.jsxs("div",{className:"yblog3-author-text",children:[e.jsx("div",{className:"yblog3-an",children:p.author}),e.jsxs("div",{className:"yblog3-ad",children:[p.date," · ⏱ ",p.read]})]})]}),e.jsxs("span",{className:"yblog3-read-hint yblog3-read-hint--strong","aria-hidden":!0,children:["Lire ",e.jsx("span",{children:"→"})]})]})]})]})})]})]})}),e.jsxs("section",{className:"yblog3-section",children:[e.jsxs("div",{className:"yblog3-cats-head",children:[e.jsx("span",{className:"yblog3-eyebrow-light",children:"Catégories éditoriales"}),e.jsxs("h2",{className:"yblog3-h2-sm",children:["Choisissez votre ",e.jsx("em",{children:"angle"})]})]}),e.jsxs("div",{className:"yblog3-cats",role:"tablist","aria-label":"Filtrer par catégorie",children:[e.jsxs("button",{type:"button",role:"tab","aria-selected":a==="TOUT",className:`yblog3-cat${a==="TOUT"?" is-active":""}`,onClick:()=>i("TOUT"),children:[e.jsx("span",{className:"yblog3-cat-ico","aria-hidden":!0,children:"📚"}),e.jsx("span",{className:"yblog3-cat-label",children:"Tout"}),e.jsx("span",{className:"yblog3-cat-count",children:d.TOUT})]}),N.map(r=>{const h=S[r]||{icon:"📰",color:"#1a6b3a"};return e.jsxs("button",{type:"button",role:"tab","aria-selected":a===r,className:`yblog3-cat${a===r?" is-active":""}`,style:{"--cat-color":h.color},onClick:()=>i(r),children:[e.jsx("span",{className:"yblog3-cat-ico","aria-hidden":!0,children:h.icon}),e.jsx("span",{className:"yblog3-cat-label",children:r}),e.jsx("span",{className:"yblog3-cat-count",children:d[r]||0})]},r)})]})]}),e.jsxs("section",{className:"yblog3-section",children:[e.jsxs("div",{className:"yblog3-section-head",children:[e.jsxs("div",{children:[e.jsx("span",{className:"yblog3-eyebrow-light",children:a==="TOUT"?"01 · Tous nos articles":`01 · Catégorie · ${a}`}),e.jsx("h2",{className:"yblog3-h2",children:"Derniers articles"}),e.jsx("p",{className:"yblog3-lead",children:"Analyses, guides pratiques et tendances — sélectionnés et tenus à jour par la rédaction Yorix."})]}),e.jsxs("div",{className:"yblog3-section-meta",children:[e.jsx("strong",{children:u.length})," article",u.length>1?"s":"",t&&e.jsxs("span",{className:"yblog3-section-q",children:[" · « ",t," »"]})]})]}),k.length===0?e.jsxs("div",{className:"yblog3-empty",children:[e.jsx("div",{className:"yblog3-empty-ico","aria-hidden":!0,children:"📰"}),e.jsx("h3",{children:"Aucun article ne correspond à votre recherche."}),e.jsx("p",{children:"Essayez un autre mot-clé ou parcourez toutes les catégories."}),e.jsx("div",{className:"yblog3-empty-cta",children:e.jsx("button",{type:"button",className:"yblog3-btn yblog3-btn--pri",onClick:()=>{i("TOUT"),m("")},children:"Voir tous les articles"})})]}):e.jsx("div",{className:"yblog3-grid",children:k.map(r=>e.jsx(T,{p:r},r.id))})]}),a==="TOUT"&&!t&&f.length>0&&e.jsx("section",{className:"yblog3-section--tinted",children:e.jsxs("div",{className:"yblog3-section-inner",children:[e.jsxs("div",{className:"yblog3-section-head",children:[e.jsxs("div",{children:[e.jsx("span",{className:"yblog3-eyebrow-light",children:"02 · Guides pratiques"}),e.jsxs("h2",{className:"yblog3-h2",children:["Nos meilleurs guides pour ",e.jsx("em",{children:"grandir"})]}),e.jsx("p",{className:"yblog3-lead",children:"Business, sécurité, livraison : les ressources que nous recommandons en priorité aux vendeurs et acheteurs."})]}),e.jsx("button",{type:"button",className:"yblog3-btn yblog3-btn--ghost-dark",onClick:()=>i("BUSINESS"),children:"Voir tous les guides →"})]}),e.jsx("div",{className:"yblog3-guides-grid",children:f.map(r=>e.jsx(T,{p:r,size:"guide"},r.id))})]})}),e.jsxs("section",{className:"yblog3-section",children:[e.jsxs("div",{className:"yblog3-section-head yblog3-section-head--center",children:[e.jsx("span",{className:"yblog3-eyebrow-light",children:"03 · Yorix Journal · l'autorité business CM"}),e.jsxs("h2",{className:"yblog3-h2 yblog3-h2--center",children:["Une rédaction au cœur du ",e.jsx("em",{children:"marché camerounais"})]}),e.jsx("p",{className:"yblog3-lead yblog3-lead--center",children:"Notre mission : décrypter le commerce, la livraison et la fintech au Cameroun avec des contenus utiles, vérifiés et actionnables."})]}),e.jsx("div",{className:"yblog3-pillars",children:B.map(r=>e.jsxs("article",{className:"yblog3-pillar",children:[e.jsx("div",{className:"yblog3-pillar-emoji","aria-hidden":!0,children:r.e}),e.jsx("h3",{children:r.t}),e.jsx("p",{children:r.d})]},r.t))})]}),e.jsx("section",{className:"yblog3-section",children:e.jsxs("div",{className:"yblog3-nl",children:[e.jsxs("div",{className:"yblog3-nl-left",children:[e.jsxs("span",{className:"yblog3-eyebrow",children:[e.jsx("span",{className:"yblog3-eyebrow-dot"})," 04 · Newsletter Yorix Journal"]}),e.jsxs("h2",{className:"yblog3-h2 yblog3-h2--on-dark",children:["Recevez les meilleures ",e.jsx("em",{children:"analyses Yorix"})]}),e.jsxs("p",{className:"yblog3-sub yblog3-sub--on-dark",children:["Une newsletter par semaine · guides, données de marché, opportunités locales.",e.jsx("strong",{children:" Zéro spam, désinscription en un clic."})]}),e.jsxs("ul",{className:"yblog3-nl-perks",children:[e.jsxs("li",{children:[e.jsx("span",{"aria-hidden":!0,children:"📈"})," Analyses commerce CM"]}),e.jsxs("li",{children:[e.jsx("span",{"aria-hidden":!0,children:"🎯"})," Conseils vendeurs"]}),e.jsxs("li",{children:[e.jsx("span",{"aria-hidden":!0,children:"💎"})," Opportunités exclusives"]})]})]}),e.jsxs("form",{className:"yblog3-nl-form",onSubmit:r=>{r.preventDefault(),C()},noValidate:!0,children:[e.jsx("label",{htmlFor:"yblog3-nl-email",className:"yblog3-nl-lbl",children:"VOTRE EMAIL PROFESSIONNEL"}),e.jsxs("div",{className:"yblog3-nl-row",children:[e.jsx("input",{id:"yblog3-nl-email",type:"email",className:"yblog3-nl-inp",placeholder:"vous@entreprise.cm",value:o,onChange:r=>c(r.target.value),required:!0}),e.jsx("button",{type:"submit",className:"yblog3-btn yblog3-btn--pri yblog3-nl-submit",children:g?"Abonné(e) ✓":"S'abonner 🚀"})]}),e.jsx("p",{className:"yblog3-nl-note",children:g?"🎉 Merci ! Confirmez votre inscription depuis l'email que nous venons d'envoyer.":"🔒 RGPD · vous pouvez vous désabonner à tout moment depuis chaque envoi."})]})]})}),e.jsx("section",{className:"yblog3-section",children:e.jsxs("div",{className:"yblog3-final-cta",children:[e.jsxs("div",{className:"yblog3-final-cta-text",children:[e.jsx("span",{className:"yblog3-eyebrow",children:"05 · Vous avez quelque chose à dire ?"}),e.jsxs("h2",{className:"yblog3-h2 yblog3-h2--on-dark",children:["Devenez ",e.jsx("em",{children:"contributeur"}),e.jsx("br",{}),"ou ",e.jsx("em",{children:"partenaire"})]}),e.jsxs("p",{className:"yblog3-sub yblog3-sub--on-dark",children:["Experts business, journalistes, prestataires : proposez un sujet, un guide, ou un partenariat éditorial. ",e.jsx("strong",{children:"Nous lisons toutes les propositions sous 72 heures."})]})]}),e.jsxs("div",{className:"yblog3-final-cta-actions",children:[e.jsx("button",{type:"button",className:"yblog3-btn yblog3-btn--pri",onClick:()=>l==null?void 0:l("contact"),children:"✍️ Proposer un sujet"}),e.jsx("button",{type:"button",className:"yblog3-btn yblog3-btn--ghost",onClick:()=>l==null?void 0:l("business"),children:"Devenir partenaire"})]})]})})]})]})}const z=[{id:"buy",icon:"🛍️",title:"Acheter sur Yorix",faqs:[{q:"Comment passer une commande ?",r:"Parcourez le catalogue ou la recherche, ajoutez au panier puis finalisez sur la page Checkout (paiement sécurisé ou WhatsApp)."},{q:"Quels modes de paiement ?",r:"MTN Mobile Money, Orange Money, CinetPay carte, paiement sécurisé via escrow ou option selon le vendeur."},{q:"Comment fonctionne l'escrow ?",r:"Votre paiement est protégé jusqu'à votre confirmation de réception. En cas de litige, équipe médiation sous 48h ouvrées."}]},{id:"sell",icon:"🏪",title:"Vendre sur Yorix",faqs:[{q:"Comment créer ma boutique ?",r:"Créez un compte vendeur → Dashboard vendeur → Publier un produis. La page est mise en ligne immédiatement."},{q:"Commission Yorix ?",r:"Commission standard indicative 5% sur la vente (montants vendeur calculés automatiquement à la commande)."},{q:"Badge Top vendeur ?",r:"Réactivité et historique positif augmentent votre visibilité — contactez-nous pour le programme mis en avant."}]},{id:"ship",icon:"🚚",title:"Livraison & suivi",faqs:[{q:"Quels sont les délais ?",r:"Zones prioritaires (Douala, Yaoundé) : souvent 24–72 h. Autres régions : 3–7 jours ouvrés selon transport."},{q:"Colis non reçu ?",r:"Via Support WhatsApp +237 696 56 56 54 avec votre code de suivi ou référence commande groupe."}]},{id:"money",icon:"💰",title:"Fidélité & points",faqs:[{q:"Comment gagner des points ?",r:"Achats, ventes, actions qualité sur la plateforme — vérifiez votre solde depuis Fidélité."},{q:"Échange minimum ?",r:"Seuils indiqués sur la page Fidélité (bons d'achat et récompenses mises à jour régulièrement)."}]}];function E(a){return String(a||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}function U({goPage:a}){const[i,o]=b.useState(""),[c,g]=b.useState(z[0].id),y=b.useMemo(()=>{const l=E(i);return l?z.map(t=>({...t,faqs:t.faqs.filter(m=>E(m.q+m.r).includes(l))})).filter(t=>t.faqs.length>0):z},[i]);return e.jsxs("div",{className:"yorix-help yorix-pro-page anim",children:[e.jsxs("div",{className:"yorix-help-hero",children:[e.jsx(R,{items:[{label:"Accueil",onClick:()=>a("home")},{label:"Centre d'aide"}]}),e.jsx("h1",{className:"yorix-help-title",children:"Centre d'aide Yorix"}),e.jsx("p",{className:"yorix-help-lead",children:"Réponses instantanées, organisées par sujet — marketplace, escrow, livraison et fidélité."}),e.jsxs("label",{className:"yorix-help-search",children:[e.jsx("span",{className:"visually-hidden",children:"Rechercher dans l'aide"}),e.jsx("input",{type:"search",value:i,onChange:l=>o(l.target.value),placeholder:"Ex. escrow, livraison, points…",autoComplete:"off"})]}),e.jsxs("div",{className:"yorix-help-quick",children:[e.jsx("button",{type:"button",className:"yorix-chip",onClick:()=>a("escrow"),children:"Escrow acheteur"}),e.jsx("button",{type:"button",className:"yorix-chip",onClick:()=>a("livraison"),children:"Suivi livraison"}),e.jsx("button",{type:"button",className:"yorix-chip",onClick:()=>a("loyalty"),children:"Points Yorix"}),e.jsx("button",{type:"button",className:"yorix-chip wa",onClick:()=>a("contact"),children:"Contacter support"})]})]}),e.jsxs("div",{className:"yorix-help-layout",children:[e.jsx("aside",{className:"yorix-help-sidebar","aria-label":"Catégories d'aide",children:e.jsx("nav",{className:"yorix-help-nav",children:z.map(l=>e.jsxs("button",{type:"button",className:`yorix-help-nav-item${c===l.id?" is-active":""}`,onClick:()=>{var t;g(l.id),(t=document.getElementById(`help-sec-${l.id}`))==null||t.scrollIntoView({behavior:"smooth",block:"start"})},children:[e.jsx("span",{"aria-hidden":!0,children:l.icon}),e.jsx("span",{children:l.title})]},l.id))})}),e.jsxs("div",{className:"yorix-help-main",children:[y.length===0?e.jsxs("div",{className:"yorix-help-empty",children:[e.jsxs("p",{children:["Aucun résultat pour « ",i," »."]}),e.jsx("button",{type:"button",className:"cta-y",onClick:()=>o(""),children:"Effacer la recherche"})]}):y.map(l=>e.jsxs("section",{id:`help-sec-${l.id}`,className:"yorix-help-block",children:[e.jsxs("h2",{className:"yorix-help-block-title",children:[e.jsx("span",{className:"yorix-help-block-ico","aria-hidden":!0,children:l.icon}),l.title]}),e.jsx("div",{className:"yorix-help-faq-list",children:l.faqs.map((t,m)=>e.jsxs("details",{className:"yorix-details",children:[e.jsx("summary",{children:t.q}),e.jsx("p",{children:t.r})]},`${l.id}-${m}`))})]},l.id)),e.jsxs("div",{className:"yorix-help-cta-bar",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Besoin d'un humain ?"}),e.jsx("span",{children:"Équipe en ligne 7j/7 pour les urgences commande."})]}),e.jsx("button",{type:"button",className:"btn-wa",onClick:()=>a("contact"),children:"WhatsApp & contact"})]})]})]})]})}const P=[{id:"vente",icon:"🛒",label:"Vente terrain",color:"#1a6b3a",desc:"WhatsApp Selling, négociation, closing"},{id:"marketplace",icon:"🏪",label:"Marketplace",color:"#f59e0b",desc:"Devenir top vendeur Yorix"},{id:"logistique",icon:"🚚",label:"Livraison",color:"#0891b2",desc:"Optimiser tournées & coûts"},{id:"business",icon:"📈",label:"Business local",color:"#7c3aed",desc:"Lancer, financer, scaler"},{id:"paiement",icon:"💳",label:"Paiements",color:"#b45309",desc:"MoMo, Orange, conformité"},{id:"marketing",icon:"📢",label:"Marketing digital",color:"#db2777",desc:"Réseaux sociaux, ads, contenu"},{id:"whatsapp",icon:"💬",label:"WhatsApp Business",desc:"Automatisation, catalogues, support",color:"#22c55e"},{id:"diaspora",icon:"✈️",label:"Diaspora business",color:"#1565c0",desc:"Investir et entreprendre au CM"}],F=[{id:"debutant",label:"Débutant",emoji:"🌱",color:"#22c55e",gradient:"linear-gradient(135deg, #4ade80, #16a34a)",pct:100,pitch:"Bases solides pour démarrer",perks:["Cours d'introduction","Vocabulaire essentiel","Premiers exercices"]},{id:"intermediaire",label:"Intermédiaire",emoji:"🚀",color:"#3b82f6",gradient:"linear-gradient(135deg, #60a5fa, #2563eb)",pct:70,pitch:"Maîtriser les techniques clés",perks:["Cas pratiques réels","Outils avancés","Coaching collectif"]},{id:"pro",label:"Pro",emoji:"💼",color:"#f59e0b",gradient:"linear-gradient(135deg, #fbbf24, #d97706)",pct:45,pitch:"Niveau opérationnel professionnel",perks:["Stratégies avancées","Études de cas CM","Certificat Yorix"]},{id:"elite",label:"Elite",emoji:"💎",color:"#7c3aed",gradient:"linear-gradient(135deg, #a78bfa, #5b21b6)",pct:15,pitch:"Sommet : business leaders & mentors",perks:["Mentorat 1:1","Réseau Yorix Pro","Accès événements VIP"]}],$=[{n:"01",emoji:"🎯",t:"Choisissez",d:"Sélectionnez un parcours selon votre objectif business."},{n:"02",emoji:"📚",t:"Apprenez",d:"Vidéos courtes, exercices terrain et études de cas locales."},{n:"03",emoji:"🛠️",t:"Pratiquez",d:"Appliquez immédiatement sur Yorix avec coaching."},{n:"04",emoji:"🏆",t:"Certifiez",d:"Recevez votre certificat Yorix Academy à partager."}],_=[{name:"Aminatou B.",role:"Vendeuse Yorix · Douala",avatar:"A",color:"#1a6b3a",quote:"En 3 mois après la formation WhatsApp Selling, mes ventes ont triplé. Je suis passée de 50 à 180 commandes par mois.",metric:"+260% ventes"},{name:"Junior K.",role:"Livreur · Yaoundé",avatar:"J",color:"#0891b2",quote:"La formation Yorix Ride m'a appris à optimiser mes tournées. Je gagne 15 000 FCFA de plus par semaine.",metric:"+60 000 F / mois"},{name:"Sandrine M.",role:"Prestataire · Bafoussam",avatar:"S",color:"#7c3aed",quote:"Grâce au module Business local, j'ai structuré mon offre. Aujourd'hui, j'ai 4 clients récurrents et une équipe de 3 personnes.",metric:"4 clients fidèles"}],H=[{q:"Les formations sont-elles vraiment gratuites ?",a:"Une partie de notre catalogue est 100% gratuite (cours d'introduction, bases). Les modules approfondis et certificats sont payants à partir de 5 000 FCFA. Vous pouvez tester avant d'acheter."},{q:"Combien de temps dure une formation ?",a:"Les modules courts durent 30 à 60 minutes (idéal pause déjeuner). Les parcours complets demandent 4 à 12 heures réparties sur 2 à 4 semaines, à votre rythme."},{q:"Comment recevoir mon certificat Yorix ?",a:"Terminez tous les chapitres d'une formation pro/elite + réussissez le quiz final (70%+). Votre certificat est envoyé par email sous 24h, partageable sur LinkedIn et WhatsApp."},{q:"Puis-je accéder aux formations sur mobile ?",a:"Oui, toutes les formations sont 100% mobile. Vous pouvez télécharger les supports PDF pour les consulter hors-ligne (utile en zone faible connexion)."},{q:"Qui sont les formateurs Yorix Academy ?",a:"Des entrepreneurs camerounais en activité : top vendeurs Yorix, livreurs expérimentés, experts marketing local, partenaires fintech. Tous testés sur le terrain au Cameroun."},{q:"Les formations sont-elles adaptées à mon niveau ?",a:"Chaque cours est étiqueté Débutant / Intermédiaire / Pro / Elite. Vous pouvez aussi passer un test d'orientation gratuit pour trouver le bon parcours."}];function G({items:a}){return e.jsx("nav",{className:"yacad3-bc","aria-label":"Fil d'ariane",children:a.map((i,o)=>e.jsxs("span",{className:"yacad3-bc-item",children:[i.onClick?e.jsx("button",{type:"button",onClick:i.onClick,children:i.label}):e.jsx("span",{className:"yacad3-bc-current",children:i.label}),o<a.length-1&&e.jsx("span",{className:"yacad3-bc-sep","aria-hidden":!0,children:"›"})]},o))})}function X({academyCourses:a=[],academyLoading:i=!1,goAcademyDetail:o,goPage:c,user:g,userData:y,setAuthOpen:l,setAuthTab:t}){const[m,N]=b.useState("TOUT"),d=b.useMemo(()=>m==="TOUT"?a:a.filter(s=>s.category===m),[a,m]),u=a.reduce((s,r)=>s+(r.students_count||0),0);a.length*1.5;const p=a.filter(s=>(s.prix||0)===0).length,k=()=>{t==null||t("register"),l==null||l(!0)},f=()=>{const s=document.getElementById("yacad3-courses");s&&s.scrollIntoView({behavior:"smooth",block:"start"})},C=()=>{const s=a.find(r=>(r.prix||0)===0);s&&o?o(s):f()};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
  `}),e.jsxs("div",{className:"yorix-acad-v3 anim",children:[e.jsx("header",{className:"yacad3-hero",children:e.jsxs("div",{className:"yacad3-hero-inner",children:[e.jsx(G,{items:[{label:"Accueil",onClick:()=>c==null?void 0:c("home")},{label:"Yorix Academy · centre de formation"}]}),e.jsxs("div",{className:"yacad3-hero-grid",children:[e.jsxs("div",{children:[e.jsxs("span",{className:"yacad3-eyebrow",children:[e.jsx("span",{className:"yacad3-eyebrow-dot"})," Yorix Academy · centre officiel"]}),e.jsxs("h1",{className:"yacad3-h1",children:["Développez vos compétences.",e.jsx("br",{}),e.jsx("em",{children:"Accélérez votre croissance."})]}),e.jsxs("p",{className:"yacad3-sub",children:["Formations pratiques pensées pour le marché camerounais : ",e.jsx("strong",{children:"vente terrain, e-commerce, WhatsApp Business, logistique, business growth"}),". Apprenez auprès d'entrepreneurs qui ont réussi au Cameroun."]}),e.jsxs("ul",{className:"yacad3-args",children:[e.jsxs("li",{children:[e.jsx("span",{children:"🛒"}),e.jsx("span",{children:"Vente terrain"})]}),e.jsxs("li",{children:[e.jsx("span",{children:"🏪"}),e.jsx("span",{children:"E-commerce Yorix"})]}),e.jsxs("li",{children:[e.jsx("span",{children:"💬"}),e.jsx("span",{children:"WhatsApp Selling"})]}),e.jsxs("li",{children:[e.jsx("span",{children:"📈"}),e.jsx("span",{children:"Business Growth"})]})]}),e.jsxs("div",{className:"yacad3-hero-cta",children:[e.jsx("button",{type:"button",className:"yacad3-btn yacad3-btn--pri",onClick:C,children:"🚀 Commencer gratuitement"}),e.jsx("button",{type:"button",className:"yacad3-btn yacad3-btn--sec",onClick:f,children:"Voir les parcours"})]}),e.jsxs("div",{className:"yacad3-hero-stats",children:[e.jsxs("div",{className:"yacad3-hero-stat",children:[e.jsxs("div",{className:"yacad3-hero-stat-val",children:[a.length||"12","+"]}),e.jsx("div",{className:"yacad3-hero-stat-lbl",children:"FORMATIONS"})]}),e.jsxs("div",{className:"yacad3-hero-stat",children:[e.jsxs("div",{className:"yacad3-hero-stat-val",children:[u.toLocaleString("fr-FR")||"850","+"]}),e.jsx("div",{className:"yacad3-hero-stat-lbl",children:"ÉTUDIANTS"})]}),e.jsxs("div",{className:"yacad3-hero-stat",children:[e.jsxs("div",{className:"yacad3-hero-stat-val",children:[p||"5","+"]}),e.jsx("div",{className:"yacad3-hero-stat-lbl",children:"GRATUITES"})]})]})]}),e.jsx("div",{className:"yacad3-hero-visual",children:e.jsxs("div",{className:"yacad3-dashboard",children:[e.jsxs("div",{className:"yacad3-dash-head",children:[e.jsxs("div",{className:"yacad3-dash-brand",children:[e.jsx("div",{className:"yacad3-dash-logo",children:"Y"}),e.jsxs("div",{className:"yacad3-dash-name",children:["Mon parcours",e.jsx("small",{children:"YORIX ACADEMY"})]})]}),e.jsx("div",{className:"yacad3-dash-badge",children:"🚀 En cours"})]}),e.jsx("div",{className:"yacad3-dash-progress-lbl",children:"Progression globale"}),e.jsx("div",{className:"yacad3-dash-progress-pct",children:"72%"}),e.jsx("div",{className:"yacad3-dash-progress-bar",children:e.jsx("div",{className:"yacad3-dash-progress-fill"})}),e.jsxs("ul",{className:"yacad3-dash-modules",children:[e.jsxs("li",{className:"yacad3-dash-mod",children:[e.jsx("div",{className:"yacad3-dash-mod-ico yacad3-dash-mod-ico--done",children:"✓"}),e.jsxs("div",{className:"yacad3-dash-mod-info",children:[e.jsx("div",{className:"yacad3-dash-mod-name",children:"Bases du commerce"}),e.jsx("div",{className:"yacad3-dash-mod-meta",children:"⏱ 45 min · 5 chapitres"})]}),e.jsx("div",{className:"yacad3-dash-mod-status yacad3-dash-mod-status--done",children:"Terminé"})]}),e.jsxs("li",{className:"yacad3-dash-mod",children:[e.jsx("div",{className:"yacad3-dash-mod-ico yacad3-dash-mod-ico--current",children:"📖"}),e.jsxs("div",{className:"yacad3-dash-mod-info",children:[e.jsx("div",{className:"yacad3-dash-mod-name",children:"WhatsApp Selling"}),e.jsx("div",{className:"yacad3-dash-mod-meta",children:"⏱ 1h · 8 chapitres"})]}),e.jsx("div",{className:"yacad3-dash-mod-status yacad3-dash-mod-status--current",children:"3/8"})]}),e.jsxs("li",{className:"yacad3-dash-mod",children:[e.jsx("div",{className:"yacad3-dash-mod-ico yacad3-dash-mod-ico--locked",children:"🔒"}),e.jsxs("div",{className:"yacad3-dash-mod-info",children:[e.jsx("div",{className:"yacad3-dash-mod-name",children:"Closing pro"}),e.jsx("div",{className:"yacad3-dash-mod-meta",children:"⏱ 1h30 · 10 chapitres"})]}),e.jsx("div",{className:"yacad3-dash-mod-status yacad3-dash-mod-status--locked",children:"Verrouillé"})]})]})]})})]})]})}),e.jsxs("section",{className:"yacad3-section",children:[e.jsxs("div",{className:"yacad3-section-head",children:[e.jsx("span",{className:"yacad3-eyebrow-light",children:"01 · Comment ça marche"}),e.jsxs("h2",{className:"yacad3-h2",children:["Quatre étapes pour ",e.jsx("em",{children:"monter en compétence"})]}),e.jsx("p",{className:"yacad3-lead",children:"De votre inscription à votre certificat Yorix : un parcours conçu pour transformer vos compétences."})]}),e.jsx("div",{className:"yacad3-steps",children:$.map(s=>e.jsxs("div",{className:"yacad3-step",children:[e.jsx("div",{className:"yacad3-step-num",children:s.n}),e.jsx("div",{className:"yacad3-step-emoji",children:s.emoji}),e.jsx("h3",{children:s.t}),e.jsx("p",{children:s.d})]},s.n))})]}),e.jsxs("section",{className:"yacad3-section--tinted",children:[e.jsxs("div",{className:"yacad3-section-head",children:[e.jsx("span",{className:"yacad3-eyebrow-light",children:"02 · Parcours disponibles"}),e.jsxs("h2",{className:"yacad3-h2",children:["Choisissez votre ",e.jsx("em",{children:"parcours"})]}),e.jsx("p",{className:"yacad3-lead",children:"8 parcours thématiques pensés pour le marché camerounais : vente, e-commerce, logistique, business."})]}),e.jsx("div",{className:"yacad3-parcours-grid",children:P.map(s=>e.jsxs("div",{className:"yacad3-parcours-card",style:{"--parc-color":s.color},onClick:f,children:[e.jsx("div",{className:"yacad3-parcours-emoji",children:s.icon}),e.jsx("div",{className:"yacad3-parcours-title",children:s.label}),e.jsx("div",{className:"yacad3-parcours-desc",children:s.desc})]},s.id))})]}),e.jsxs("section",{className:"yacad3-section",id:"yacad3-courses",children:[e.jsxs("div",{className:"yacad3-section-head",children:[e.jsx("span",{className:"yacad3-eyebrow-light",children:"03 · Catalogue"}),e.jsxs("h2",{className:"yacad3-h2",children:["Toutes nos ",e.jsx("em",{children:"formations"})]}),e.jsx("p",{className:"yacad3-lead",children:"Sélectionnez par niveau ou commencez par une formation gratuite."})]}),e.jsx("div",{className:"yacad3-filters",children:["TOUT","DÉBUTANT","INTERMÉDIAIRE","AVANCÉ"].map(s=>e.jsxs("button",{type:"button",className:`yacad3-filter${m===s?" is-active":""}`,onClick:()=>N(s),children:[s==="TOUT"&&"📚 Tout",s==="DÉBUTANT"&&"🌱 Débutant",s==="INTERMÉDIAIRE"&&"🚀 Intermédiaire",s==="AVANCÉ"&&"💎 Avancé"]},s))}),i?e.jsxs("div",{className:"yacad3-loading",children:[e.jsx("div",{className:"yacad3-spinner"}),"Chargement des formations..."]}):d.length===0?e.jsxs("div",{className:"yacad3-empty",children:[e.jsx("div",{className:"yacad3-empty-ico",children:"🎓"}),e.jsxs("p",{children:["Aucune formation dans cette catégorie pour l'instant.",e.jsx("br",{}),"Revenez bientôt — de nouveaux modules arrivent chaque semaine."]})]}):e.jsx("div",{className:"yacad3-courses-grid",children:d.map(s=>{const r=(s.prix||0)===0,h=s.category==="DÉBUTANT"?"debutant":s.category==="INTERMÉDIAIRE"?"intermediaire":"avance";return e.jsxs("article",{className:"yacad3-course",onClick:()=>o==null?void 0:o(s),role:"link",tabIndex:0,onKeyDown:j=>{(j.key==="Enter"||j.key===" ")&&(j.preventDefault(),o==null||o(s))},children:[e.jsxs("div",{className:"yacad3-course-img",style:{background:s.color_bg||"var(--acad-green-pale)"},children:[e.jsx("span",{children:s.emoji||"🎓"}),e.jsx("span",{className:`yacad3-course-level yacad3-course-level--${h}`,children:s.category}),r&&e.jsx("span",{className:"yacad3-course-pin-free",children:"🎁 GRATUIT"})]}),e.jsxs("div",{className:"yacad3-course-body",children:[e.jsx("h3",{className:"yacad3-course-title",children:s.title}),e.jsxs("div",{className:"yacad3-course-meta",children:[e.jsxs("span",{children:["⏱ ",s.duration||"—"]}),e.jsxs("span",{children:["👥 ",(s.students_count||0).toLocaleString("fr-FR")]})]}),e.jsxs("div",{className:"yacad3-course-foot",children:[e.jsx("div",{className:`yacad3-course-price${r?" yacad3-course-price--free":""}`,children:r?"Gratuit":`${s.prix.toLocaleString("fr-FR")} F`}),e.jsx("button",{type:"button",className:"yacad3-course-cta",onClick:j=>{j.stopPropagation(),o==null||o(s)},children:"Démarrer →"})]})]})]},s.id)})})]}),e.jsxs("section",{className:"yacad3-section--tinted",children:[e.jsxs("div",{className:"yacad3-section-head",children:[e.jsx("span",{className:"yacad3-eyebrow-light",children:"04 · Progression"}),e.jsxs("h2",{className:"yacad3-h2",children:["Quatre niveaux. ",e.jsx("em",{children:"Une progression claire."})]}),e.jsx("p",{className:"yacad3-lead",children:"Du débutant à l'elite : un parcours structuré pour devenir un entrepreneur reconnu au Cameroun."})]}),e.jsx("div",{className:"yacad3-levels",children:F.map(s=>e.jsxs("article",{className:"yacad3-level",style:{"--lvl-color":s.color,"--lvl-gradient":s.gradient},children:[e.jsx("div",{className:"yacad3-level-emoji",children:s.emoji}),e.jsx("h3",{className:"yacad3-level-name",children:s.label}),e.jsx("p",{className:"yacad3-level-pitch",children:s.pitch}),e.jsxs("div",{className:"yacad3-level-progress",children:[e.jsxs("div",{className:"yacad3-level-progress-head",children:[e.jsx("span",{children:"Étudiants à ce niveau"}),e.jsxs("strong",{children:[s.pct,"%"]})]}),e.jsx("div",{className:"yacad3-level-progress-bar",children:e.jsx("div",{className:"yacad3-level-progress-fill",style:{width:`${s.pct}%`}})})]}),e.jsx("ul",{className:"yacad3-level-perks",children:s.perks.map(r=>e.jsxs("li",{children:[e.jsx("span",{children:"✓"}),r]},r))})]},s.id))})]}),e.jsxs("section",{className:"yacad3-section",children:[e.jsxs("div",{className:"yacad3-section-head",children:[e.jsx("span",{className:"yacad3-eyebrow-light",children:"05 · Certification"}),e.jsxs("h2",{className:"yacad3-h2",children:["Recevez votre ",e.jsx("em",{children:"certificat Yorix"})]}),e.jsx("p",{className:"yacad3-lead",children:"Un document officiel à partager sur LinkedIn, WhatsApp et avec vos clients."})]}),e.jsxs("div",{className:"yacad3-cert",children:[e.jsxs("div",{className:"yacad3-cert-visual",children:[e.jsx("div",{className:"yacad3-cert-seal",children:"🏅"}),e.jsx("div",{className:"yacad3-cert-brand",children:"YORIX ACADEMY"}),e.jsx("div",{className:"yacad3-cert-title",children:"Certificat de réussite"}),e.jsx("div",{className:"yacad3-cert-line"}),e.jsx("div",{className:"yacad3-cert-name",children:(y==null?void 0:y.nom)||"Votre nom"}),e.jsxs("div",{className:"yacad3-cert-foot",children:["Formation : WhatsApp Selling Pro · ",new Date().toLocaleDateString("fr-FR")]})]}),e.jsxs("div",{className:"yacad3-cert-text",children:[e.jsxs("h3",{className:"yacad3-h2",style:{fontSize:"1.3rem",marginBottom:10},children:["Reconnu &",e.jsx("br",{}),e.jsx("em",{children:"officiel"})]}),e.jsx("p",{className:"yacad3-lead",style:{fontSize:".88rem"},children:"Le certificat Yorix Academy atteste de vos compétences acquises et de votre engagement dans la formation continue."}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("span",{children:"1"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Partageable"})," sur LinkedIn, WhatsApp, CV."]})]}),e.jsxs("li",{children:[e.jsx("span",{children:"2"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Vérifiable"})," via un QR code unique."]})]}),e.jsxs("li",{children:[e.jsx("span",{children:"3"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Reconnu"})," par les partenaires Yorix (CinetPay, MTN, Orange)."]})]}),e.jsxs("li",{children:[e.jsx("span",{children:"4"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Boost de profil"})," sur la marketplace Yorix."]})]})]})]})]})]}),e.jsxs("section",{className:"yacad3-section",children:[e.jsxs("div",{className:"yacad3-section-head",children:[e.jsx("span",{className:"yacad3-eyebrow-light",children:"06 · Témoignages"}),e.jsxs("h2",{className:"yacad3-h2",children:["Ils ont ",e.jsx("em",{children:"transformé leur activité"})]}),e.jsx("p",{className:"yacad3-lead",children:"Des entrepreneurs camerounais qui ont fait grandir leur business grâce à Yorix Academy."})]}),e.jsx("div",{className:"yacad3-stories",children:_.map(s=>e.jsxs("article",{className:"yacad3-story",style:{"--story-color":s.color},children:[e.jsxs("div",{className:"yacad3-story-header",children:[e.jsx("div",{className:"yacad3-story-av",children:s.avatar}),e.jsxs("div",{children:[e.jsx("div",{className:"yacad3-story-name",children:s.name}),e.jsx("div",{className:"yacad3-story-role",children:s.role})]})]}),e.jsx("p",{className:"yacad3-story-quote",children:s.quote}),e.jsxs("span",{className:"yacad3-story-metric",children:["📈 ",s.metric]})]},s.name))})]}),e.jsxs("section",{className:"yacad3-section",children:[e.jsxs("div",{className:"yacad3-section-head",children:[e.jsx("span",{className:"yacad3-eyebrow-light",children:"07 · Questions fréquentes"}),e.jsxs("h2",{className:"yacad3-h2",children:["Tout savoir sur ",e.jsx("em",{children:"Yorix Academy"})]})]}),e.jsx("div",{className:"yacad3-faq",children:H.map((s,r)=>e.jsxs("details",{className:"yacad3-faq-item",children:[e.jsx("summary",{children:s.q}),e.jsx("p",{children:s.a})]},r))})]}),e.jsx("section",{className:"yacad3-section",children:e.jsx("div",{className:"yacad3-final",children:e.jsxs("div",{className:"yacad3-final-inner",children:[e.jsxs("span",{className:"yacad3-eyebrow",children:[e.jsx("span",{className:"yacad3-eyebrow-dot"})," Rejoignez Yorix Academy"]}),e.jsxs("h2",{className:"yacad3-h2 yacad3-h2--on-dark",children:["Commencez votre",e.jsx("br",{}),e.jsx("em",{children:"transformation"})," aujourd'hui"]}),e.jsxs("p",{className:"yacad3-sub yacad3-sub--on-dark",children:[e.jsx("strong",{children:"+850 entrepreneurs"})," camerounais ont déjà commencé leur parcours. Inscription gratuite · première formation offerte · certificats officiels."]}),e.jsxs("div",{className:"yacad3-final-actions",children:[e.jsxs("button",{type:"button",className:"yacad3-btn yacad3-btn--pri",onClick:g?C:k,children:["🚀 ",g?"Commencer gratuitement":"Créer mon compte"]}),e.jsx("button",{type:"button",className:"yacad3-btn yacad3-btn--sec",onClick:f,children:"Voir le catalogue"})]}),e.jsxs("ul",{className:"yacad3-final-trust",children:[e.jsxs("li",{children:[e.jsx("span",{"aria-hidden":!0,children:"🎓"})," Certificats officiels"]}),e.jsxs("li",{children:[e.jsx("span",{"aria-hidden":!0,children:"📱"})," Mobile-friendly"]}),e.jsxs("li",{children:[e.jsx("span",{"aria-hidden":!0,children:"🇨🇲"})," 100% Cameroun"]}),e.jsxs("li",{children:[e.jsx("span",{"aria-hidden":!0,children:"⚡"})," 30 sec d'inscription"]})]})]})})})]})]})}function Z({page:a,goPage:i,setAuthOpen:o,setAuthTab:c,setSelectedRole:g,inscriptionSent:y,setInscriptionSent:l,inscriptionForm:t,setInscriptionForm:m,inscriptionError:N,inscriptionLoading:d,submitInscriptionPrestataire:u,academyCourses:p,academyLoading:k,goAcademyDetail:f,blogFilter:C,setBlogFilter:v,nlEmail:s,setNlEmail:r,nlSent:h,setNlSent:j,user:Y,userData:I}){switch(a){case"faq":return e.jsx("section",{className:"sec anim",children:e.jsxs("div",{style:{maxWidth:760,margin:"0 auto"},children:[e.jsxs("header",{style:{textAlign:"center",marginBottom:22},children:[e.jsx("h1",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.45rem",color:"var(--ink)"},children:"FAQ — Yorix marketplace Cameroun"}),e.jsx("p",{style:{color:"var(--gray)",fontSize:".86rem"},children:"Livraison, escrow, paiement MoMo et prestataires."})]}),[{q:"Comment acheter sur Yorix ?",a:"Choisissez un produit, ajoutez au panier, puis validez via WhatsApp ou votre espace. Paiement MTN MoMo, Orange Money ou selon options affichées."},{q:"La livraison fonctionne comment ?",a:"Yorix Ride met en relation clients et livreurs. Suivi, tarifs affichés avant validation — grandes villes en priorité."},{q:"C’est quoi l’escrow ?",a:"Votre paiement est protégé jusqu’à ce que vous confirmiez la réception. Idéal pour marketplace et achats entre particuliers."},{q:"Comment devenir vendeur ou livreur ?",a:"Créez un compte vendeur ou livreur, acceptez la charte pro, puis accédez à votre tableau de bord."}].map((n,x)=>e.jsxs("details",{style:{marginBottom:10,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:10},children:[e.jsx("summary",{style:{padding:"12px 14px",cursor:"pointer",fontWeight:700,fontSize:".86rem"},children:n.q}),e.jsx("div",{style:{padding:"0 14px 14px",fontSize:".82rem",color:"var(--gray)",lineHeight:1.7},children:n.a})]},x)),e.jsx("div",{style:{textAlign:"center",marginTop:18},children:e.jsx("button",{type:"button",className:"cta-w",onClick:()=>i("aide"),children:"Centre d'aide complet →"})})]})});case"devenirVendeur":return e.jsx("section",{className:"sec anim",children:e.jsxs("div",{style:{maxWidth:640,margin:"0 auto",textAlign:"center"},children:[e.jsx("h1",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.45rem",color:"var(--ink)",marginBottom:10},children:"Vendre sur Yorix — marketplace Cameroun"}),e.jsx("p",{style:{color:"var(--gray)",fontSize:".88rem",lineHeight:1.75,marginBottom:20},children:"Développez votre activité : boutique en ligne, visibilité nationale, paiements MoMo et outils vendeur."}),e.jsx("button",{type:"button",className:"cta-y",onClick:()=>{c("register"),g("seller"),o(!0)},children:"Créer ma boutique vendeur"})]})});case"devenirLivreur":return e.jsx("section",{className:"sec anim",children:e.jsxs("div",{style:{maxWidth:640,margin:"0 auto",textAlign:"center"},children:[e.jsx("h1",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.45rem",color:"var(--ink)",marginBottom:10},children:"Devenir livreur Yorix Ride — Cameroun"}),e.jsx("p",{style:{color:"var(--gray)",fontSize:".88rem",lineHeight:1.75,marginBottom:20},children:"Rejoignez le réseau de livraison : missions flexibles, paiement rapide, couverture villes et inter-villes."}),e.jsx("button",{type:"button",className:"cta-y",onClick:()=>{c("register"),g("delivery"),o(!0)},children:"S'inscrire comme livreur"})]})});case"inscription":return e.jsx("section",{className:"sec anim",children:e.jsxs("div",{style:{maxWidth:600,margin:"0 auto"},children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:24},children:[e.jsx("h2",{style:{fontFamily:"'Syne',sans-serif",fontSize:"1.6rem",fontWeight:800,color:"var(--ink)",marginBottom:7,letterSpacing:"-.5px"},children:"👷 Devenir prestataire Yorix"}),e.jsx("p",{style:{color:"var(--gray)",fontSize:".86rem",lineHeight:1.7},children:"Développez votre activité et accédez à des milliers de clients au Cameroun."})]}),y?e.jsxs("div",{style:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:12,padding:40,textAlign:"center"},children:[e.jsx("div",{style:{fontSize:"3.5rem",marginBottom:14},children:"🎉"}),e.jsx("h3",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.2rem",color:"var(--green)",marginBottom:10},children:"Candidature envoyée avec succès !"}),e.jsxs("p",{style:{fontSize:".88rem",color:"var(--gray)",lineHeight:1.7,maxWidth:420,margin:"0 auto 20px"},children:["Merci pour votre intérêt ! L'équipe Yorix vous contactera sous ",e.jsx("strong",{children:"24h"})," pour valider votre profil de prestataire."]}),e.jsxs("div",{style:{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"},children:[e.jsx("button",{onClick:()=>{l(!1),m({nom:"",prenom:"",tel:"",email:"",metier:"",ville:"",experience:"",tarif:"",bio:""})},style:{background:"var(--surface2)",color:"var(--ink)",border:"1.5px solid var(--border)",borderRadius:8,padding:"9px 20px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".82rem"},children:"Soumettre une autre candidature"}),e.jsx("button",{onClick:()=>i("home"),style:{background:"var(--green)",color:"#fff",border:"none",borderRadius:8,padding:"9px 20px",cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem"},children:"← Retour à l'accueil"})]})]}):e.jsxs("div",{style:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:24},children:[N&&e.jsxs("div",{style:{background:"#fff0f0",border:"1px solid #fecaca",color:"#ce1126",borderRadius:8,padding:"10px 14px",marginBottom:14,fontSize:".82rem"},children:["⚠️ ",N]}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Nom ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:"form-input",value:t.nom,onChange:n=>m(x=>({...x,nom:n.target.value})),placeholder:"Votre nom"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Prénom"}),e.jsx("input",{className:"form-input",value:t.prenom,onChange:n=>m(x=>({...x,prenom:n.target.value})),placeholder:"Votre prénom"})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Téléphone ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:"form-input",value:t.tel,onChange:n=>m(x=>({...x,tel:n.target.value})),placeholder:"+237 696 56 56 54"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Email"}),e.jsx("input",{className:"form-input",type:"email",value:t.email,onChange:n=>m(x=>({...x,email:n.target.value})),placeholder:"email@mail.com"})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Métier ",e.jsx("span",{children:"*"})]}),e.jsxs("select",{className:"form-select",value:t.metier,onChange:n=>m(x=>({...x,metier:n.target.value})),children:[e.jsx("option",{value:"",children:"Choisir..."}),["Plomberie","Électricité","Maçonnerie","Peinture","Menuiserie","Informatique","Graphisme","Photographie","Nettoyage","Transport","Cuisine","Autre"].map(n=>e.jsx("option",{children:n},n))]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Ville"}),e.jsxs("select",{className:"form-select",value:t.ville,onChange:n=>m(x=>({...x,ville:n.target.value})),children:[e.jsx("option",{value:"",children:"Choisir..."}),L.filter(n=>n!=="Toutes les villes").map(n=>e.jsx("option",{children:n},n))]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Expérience"}),e.jsx("input",{className:"form-input",value:t.experience,onChange:n=>m(x=>({...x,experience:n.target.value})),placeholder:"Ex: 5 ans"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Tarif (FCFA)"}),e.jsx("input",{className:"form-input",value:t.tarif,onChange:n=>m(x=>({...x,tarif:n.target.value})),placeholder:"Ex: 15 000/h"})]}),e.jsxs("div",{className:"form-group full",children:[e.jsx("label",{className:"form-label",children:"Présentation"}),e.jsx("textarea",{className:"form-textarea",value:t.bio,onChange:n=>m(x=>({...x,bio:n.target.value})),placeholder:"Décrivez vos compétences..."})]})]}),e.jsx("button",{className:"form-submit",disabled:d,onClick:u,children:d?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"spinner",style:{width:16,height:16,borderWidth:2}}),"Envoi en cours..."]}):"🚀 Soumettre ma candidature"}),e.jsx("p",{style:{fontSize:".7rem",color:"var(--gray)",textAlign:"center",marginTop:10,lineHeight:1.5},children:"🔒 Vos informations sont sécurisées · Réponse sous 24h"})]})]})});case"business":return e.jsxs("div",{className:"yorix-pro-page anim",children:[e.jsxs("section",{className:"yorix-bus-hero",children:[e.jsx(R,{items:[{label:"Accueil",onClick:()=>i("home")},{label:"Business"}]}),e.jsx("div",{style:{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(252,209,22,.14)",color:"var(--yellow)",border:"1px solid rgba(252,209,22,.28)",padding:"5px 14px",borderRadius:50,fontSize:".72rem",fontWeight:700,marginBottom:14},children:"💼 Yorix · Business Growth Hub CM"}),e.jsxs("h1",{className:"yorix-bus-h1",children:["Une couche commerce pour ",e.jsx("span",{children:"entreprises ambitieuses"})," au Cameroun"]}),e.jsx("p",{className:"yorix-bus-lead",children:"Achats groupe B2B, logistique, visibilité produit national, paiements traçables (MoMo · Orange Money · Escrow) et accompagnement humain WhatsApp — le tout sur une même plateforme."}),e.jsxs("div",{className:"yorix-bus-cta",children:[e.jsx("button",{type:"button",className:"cta-y",onClick:()=>window.scrollTo({behavior:"smooth",top:520}),children:"Lancer une demande"}),e.jsx("button",{type:"button",className:"cta-w",onClick:()=>i("academy"),children:"Formez vos équipes"})]}),e.jsx("div",{className:"yorix-bus-metrics",children:[["4 rôles pro","Acheteur · Vendeur · Livreur · Prestataire"],["Nationwide CM","Douala · Yaoundé · villes satellites"],["Stack confiance","Escrow • support humain • suivi livraisons"]].map(([n,x])=>e.jsxs("div",{className:"yorix-bus-metric",children:[e.jsx("strong",{children:n}),e.jsx("span",{children:x})]},n))})]}),e.jsxs("section",{className:"sec",children:[e.jsx("h2",{className:"yorix-sec-heading",children:"Piliers de la transformation business"}),e.jsx("div",{className:"yorix-bus-pillars",children:[{icon:"🏬",title:"Achat groupe & sourcing",txt:"Regroupements d’offres marketplace, meilleurs prix catalogue vérifié."},{icon:"📣",title:"Visibilité & campagnes",txt:"Mise en avant produits-services, boosts dans les grandes villes."},{icon:"🧠",title:"Formation continue",txt:"Yorix Academy pour digitaliser vos commerciaux & magasiniers."},{icon:"🏦",title:"Financement & sécurité",txt:"Paiements tracés, escrow et litiges médiation locale."}].map(n=>e.jsxs("article",{className:"yorix-bus-pillar",children:[e.jsx("div",{className:"yorix-bus-pillar-ico",children:n.icon}),e.jsx("h3",{children:n.title}),e.jsx("p",{children:n.txt})]},n.title))})]}),e.jsx("section",{className:"sec",children:e.jsx(D,{})})]});case"academy":return e.jsx(X,{academyCourses:p,academyLoading:k,goAcademyDetail:f,goPage:i,user:Y,userData:I,setAuthOpen:o,setAuthTab:c});case"blog":return e.jsx(W,{blogFilter:C,setBlogFilter:v,nlEmail:s,setNlEmail:r,nlSent:h,setNlSent:j,goPage:i});case"contact":return e.jsx("section",{className:"sec anim yorix-pro-page",children:e.jsxs("div",{className:"yorix-contact-shell",children:[e.jsx("div",{className:"yorix-bc-row",children:e.jsx(R,{items:[{label:"Accueil",onClick:()=>i("home")},{label:"Contact"}]})}),e.jsxs("div",{className:"yorix-contact-intro",children:[e.jsx("h1",{className:"yorix-contact-h1",children:"📞 Relation client premium"}),e.jsx("p",{className:"yorix-contact-lead",children:"Priorité WhatsApp sous ~120 minutes · téléphone vocal · email pièces jointes — équipes Douala & Yaoundé."})]}),e.jsx("div",{className:"yorix-contact-chips",children:[{icon:"📱",label:"WhatsApp",val:"+237 696 56 56 54",action:()=>window.open(`https://wa.me/237696565654?text=${encodeURIComponent("Bonjour Yorix !")}`)},{icon:"📞",label:"Téléphone",val:"+237 696 56 56 54",action:()=>window.open("tel:+237696565654")},{icon:"✉️",label:"Email",val:"support@yorix.cm",action:()=>window.open("mailto:support@yorix.cm")}].map(n=>e.jsxs("div",{role:"button",tabIndex:0,className:"yorix-contact-chip",onClick:n.action,onKeyDown:x=>{(x.key==="Enter"||x.key===" ")&&(x.preventDefault(),n.action())},children:[e.jsx("span",{className:"yorix-contact-chip-ico",children:n.icon}),e.jsx("span",{className:"yorix-contact-chip-lbl",children:n.label}),e.jsx("span",{className:"yorix-contact-chip-val",children:n.val})]},n.label))}),e.jsxs("div",{className:"yorix-contact-form-card",children:[e.jsx("div",{className:"yorix-contact-form-title",children:"💬 Envoyer un message"}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group",style:{marginBottom:0},children:[e.jsxs("label",{className:"form-label",children:["Nom ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:"form-input",placeholder:"Votre nom"})]}),e.jsxs("div",{className:"form-group",style:{marginBottom:0},children:[e.jsxs("label",{className:"form-label",children:["Email ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:"form-input",type:"email",placeholder:"email@exemple.cm"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Sujet ",e.jsx("span",{children:"*"})]}),e.jsxs("select",{className:"form-select",children:[e.jsx("option",{value:"",children:"Choisir un sujet..."}),["Problème avec une commande","Signaler un vendeur","Remboursement","Problème de paiement","Devenir vendeur","Devenir livreur","Autre"].map(n=>e.jsx("option",{children:n},n))]})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Message ",e.jsx("span",{children:"*"})]}),e.jsx("textarea",{className:"form-textarea",style:{minHeight:90},placeholder:"Décrivez votre demande..."})]}),e.jsx("button",{type:"button",className:"form-submit",onClick:()=>window.open(`https://wa.me/237696565654?text=${encodeURIComponent("Bonjour Yorix ! Je vous contacte pour : ")}`),children:"📱 Continuer via WhatsApp"})]}),e.jsxs("div",{className:"yorix-contact-info-strip",children:[e.jsxs("div",{style:{flex:1,minWidth:200},children:[e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem",color:"var(--green)",marginBottom:6},children:"⏰ Horaires"}),[["Lun – Ven","8h – 20h"],["Samedi","9h – 18h"],["Dimanche","10h – 16h"]].map(([n,x])=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:".75rem",padding:"3px 0",borderBottom:"1px solid var(--border)"},children:[e.jsx("span",{style:{color:"var(--gray)"},children:n}),e.jsx("span",{style:{fontWeight:600,color:"var(--ink)"},children:x})]},n))]}),e.jsxs("div",{style:{flex:1,minWidth:200},children:[e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem",color:"var(--green)",marginBottom:6},children:"📍 Bureaux"}),e.jsxs("div",{style:{fontSize:".75rem",color:"var(--gray)",lineHeight:1.7},children:["Douala — Akwa",e.jsx("br",{}),"Yaoundé — Bastos",e.jsx("br",{}),"📞 +237 696 56 56 54"]})]})]})]})});case"aide":return e.jsx(U,{goPage:i});case"cgv":return e.jsx(q,{type:"cgv",goPage:i});case"mentions":return e.jsx(q,{type:"mentions",goPage:i});case"confidentialite":return e.jsx(q,{type:"confidentialite",goPage:i});default:return null}}export{Z as SiteMarketingPages};
