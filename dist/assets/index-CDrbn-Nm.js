const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/HomePage-BNfEF2Nw.js","assets/react-CDaM45aE.js","assets/ProdGrid-CLdlOECK.js","assets/OptimizedImage-idJD87DD.js","assets/ModalCommander-BiYjQKHI.js","assets/checkoutApi-BdtKQWBr.js","assets/supabase-D2gm834s.js","assets/ProductRouteSections-PB1Gqe-b.js","assets/LivraisonPage-DGRKY75O.js","assets/SiteMarketingPages-CSQ38_EM.js","assets/LivraisonLazyBlocks-CsVkZ8cn.js","assets/FicheProduit-BCoa7pqx.js","assets/PrestPage-dx-CU_jD.js","assets/CheckoutPage-D0H5-sDJ.js","assets/FreeShippingProgress-ymlXrGbB.js","assets/CartPage-B64Rv_5n.js","assets/AcademyDetail-KGfg_8tW.js","assets/AcademyContactForm-Ce10ECqg.js","assets/LoyaltyPage-BJOUPqQ9.js","assets/SellerDashboard-DEb1xgTG.js","assets/BuyerDashboard-C82eZ5SN.js","assets/DeliveryDashboard-DXDeekI7.js","assets/ProviderDashboard-CbT6ytMC.js","assets/AdminDashboard-ComEtVZ9.js","assets/NotificationsPage-BvTkyzlF.js","assets/PromotionsPage-DOwnFcDl.js"])))=>i.map(i=>d[i]);
var Wo=Object.defineProperty;var Vo=(e,t,o)=>t in e?Wo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var me=(e,t,o)=>Vo(e,typeof t!="symbol"?t+"":t,o);import{r as d,a as Ho,R as Xo,g as Qr,b as ue}from"./react-CDaM45aE.js";import{c as Go}from"./supabase-D2gm834s.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=o(a);fetch(a.href,s)}})();var Pt={exports:{}},dr={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Jo=d,Ko=Symbol.for("react.element"),Qo=Symbol.for("react.fragment"),Zo=Object.prototype.hasOwnProperty,ei=Jo.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ri={key:!0,ref:!0,__self:!0,__source:!0};function Ot(e,t,o){var i,a={},s=null,n=null;o!==void 0&&(s=""+o),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(n=t.ref);for(i in t)Zo.call(t,i)&&!ri.hasOwnProperty(i)&&(a[i]=t[i]);if(e&&e.defaultProps)for(i in t=e.defaultProps,t)a[i]===void 0&&(a[i]=t[i]);return{$$typeof:Ko,type:e,key:s,ref:n,props:a,_owner:ei.current}}dr.Fragment=Qo;dr.jsx=Ot;dr.jsxs=Ot;Pt.exports=dr;var r=Pt.exports,Vr={},ut=Ho;Vr.createRoot=ut.createRoot,Vr.hydrateRoot=ut.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Be(){return Be=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(e[i]=o[i])}return e},Be.apply(this,arguments)}var ke;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(ke||(ke={}));const bt="popstate";function ti(e){e===void 0&&(e={});function t(i,a){let{pathname:s,search:n,hash:l}=i.location;return Hr("",{pathname:s,search:n,hash:l},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function o(i,a){return typeof a=="string"?a:Dt(a)}return ai(t,o,null,e)}function xe(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function oi(e,t){{typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function ii(){return Math.random().toString(36).substr(2,8)}function ht(e,t){return{usr:e.state,key:e.key,idx:t}}function Hr(e,t,o,i){return o===void 0&&(o=null),Be({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?cr(t):t,{state:o,key:t&&t.key||i||ii()})}function Dt(e){let{pathname:t="/",search:o="",hash:i=""}=e;return o&&o!=="?"&&(t+=o.charAt(0)==="?"?o:"?"+o),i&&i!=="#"&&(t+=i.charAt(0)==="#"?i:"#"+i),t}function cr(e){let t={};if(e){let o=e.indexOf("#");o>=0&&(t.hash=e.substr(o),e=e.substr(0,o));let i=e.indexOf("?");i>=0&&(t.search=e.substr(i),e=e.substr(0,i)),e&&(t.pathname=e)}return t}function ai(e,t,o,i){i===void 0&&(i={});let{window:a=document.defaultView,v5Compat:s=!1}=i,n=a.history,l=ke.Pop,c=null,g=f();g==null&&(g=0,n.replaceState(Be({},n.state,{idx:g}),""));function f(){return(n.state||{idx:null}).idx}function x(){l=ke.Pop;let p=f(),b=p==null?null:p-g;g=p,c&&c({action:l,location:k.location,delta:b})}function w(p,b){l=ke.Push;let z=Hr(k.location,p,b);g=f()+1;let C=ht(z,g),I=k.createHref(z);try{n.pushState(C,"",I)}catch(L){if(L instanceof DOMException&&L.name==="DataCloneError")throw L;a.location.assign(I)}s&&c&&c({action:l,location:k.location,delta:1})}function y(p,b){l=ke.Replace;let z=Hr(k.location,p,b);g=f();let C=ht(z,g),I=k.createHref(z);n.replaceState(C,"",I),s&&c&&c({action:l,location:k.location,delta:0})}function u(p){let b=a.location.origin!=="null"?a.location.origin:a.location.href,z=typeof p=="string"?p:Dt(p);return z=z.replace(/ $/,"%20"),xe(b,"No window.location.(origin|href) available to create URL for href: "+z),new URL(z,b)}let k={get action(){return l},get location(){return e(a,n)},listen(p){if(c)throw new Error("A history only accepts one active listener");return a.addEventListener(bt,x),c=p,()=>{a.removeEventListener(bt,x),c=null}},createHref(p){return t(a,p)},createURL:u,encodeLocation(p){let b=u(p);return{pathname:b.pathname,search:b.search,hash:b.hash}},push:w,replace:y,go(p){return n.go(p)}};return k}var yt;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(yt||(yt={}));function ni(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let o=t.endsWith("/")?t.length-1:t.length,i=e.charAt(o);return i&&i!=="/"?null:e.slice(o)||"/"}const si=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,li=e=>si.test(e);function di(e,t){t===void 0&&(t="/");let{pathname:o,search:i="",hash:a=""}=typeof e=="string"?cr(e):e,s;if(o)if(li(o))s=o;else{if(o.includes("//")){let n=o;o=o.replace(/\/\/+/g,"/"),oi(!1,"Pathnames cannot have embedded double slashes - normalizing "+(n+" -> "+o))}o.startsWith("/")?s=vt(o.substring(1),"/"):s=vt(o,t)}else s=t;return{pathname:s,search:mi(i),hash:xi(a)}}function vt(e,t){let o=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?o.length>1&&o.pop():a!=="."&&o.push(a)}),o.length>1?o.join("/"):"/"}function Dr(e,t,o,i){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(i)+"].  Please separate it out to the ")+("`to."+o+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function ci(e){return e.filter((t,o)=>o===0||t.route.path&&t.route.path.length>0)}function pi(e,t){let o=ci(e);return t?o.map((i,a)=>a===o.length-1?i.pathname:i.pathnameBase):o.map(i=>i.pathnameBase)}function gi(e,t,o,i){i===void 0&&(i=!1);let a;typeof e=="string"?a=cr(e):(a=Be({},e),xe(!a.pathname||!a.pathname.includes("?"),Dr("?","pathname","search",a)),xe(!a.pathname||!a.pathname.includes("#"),Dr("#","pathname","hash",a)),xe(!a.search||!a.search.includes("#"),Dr("#","search","hash",a)));let s=e===""||a.pathname==="",n=s?"/":a.pathname,l;if(n==null)l=o;else{let x=t.length-1;if(!i&&n.startsWith("..")){let w=n.split("/");for(;w[0]==="..";)w.shift(),x-=1;a.pathname=w.join("/")}l=x>=0?t[x]:"/"}let c=di(a,l),g=n&&n!=="/"&&n.endsWith("/"),f=(s||n===".")&&o.endsWith("/");return!c.pathname.endsWith("/")&&(g||f)&&(c.pathname+="/"),c}const fi=e=>e.join("/").replace(/\/\/+/g,"/"),mi=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,xi=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e,qt=["post","put","patch","delete"];new Set(qt);const ui=["get",...qt];new Set(ui);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ar(){return ar=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(e[i]=o[i])}return e},ar.apply(this,arguments)}const Yt=d.createContext(null),Zr=d.createContext(null),et=d.createContext(null),rt=d.createContext({outlet:null,matches:[],isDataRoute:!1});function tt(){return d.useContext(et)!=null}function Bt(){return tt()||xe(!1),d.useContext(et).location}function $t(e){d.useContext(Zr).static||d.useLayoutEffect(e)}function bi(){let{isDataRoute:e}=d.useContext(rt);return e?ki():hi()}function hi(){tt()||xe(!1);let e=d.useContext(Yt),{basename:t,future:o,navigator:i}=d.useContext(Zr),{matches:a}=d.useContext(rt),{pathname:s}=Bt(),n=JSON.stringify(pi(a,o.v7_relativeSplatPath)),l=d.useRef(!1);return $t(()=>{l.current=!0}),d.useCallback(function(g,f){if(f===void 0&&(f={}),!l.current)return;if(typeof g=="number"){i.go(g);return}let x=gi(g,JSON.parse(n),s,f.relative==="path");e==null&&t!=="/"&&(x.pathname=x.pathname==="/"?t:fi([t,x.pathname])),(f.replace?i.replace:i.push)(x,f.state,f)},[t,i,n,s,e])}var Ft=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(Ft||{}),Ut=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(Ut||{});function yi(e){let t=d.useContext(Yt);return t||xe(!1),t}function vi(e){let t=d.useContext(rt);return t||xe(!1),t}function wi(e){let t=vi(),o=t.matches[t.matches.length-1];return o.route.id||xe(!1),o.route.id}function ki(){let{router:e}=yi(Ft.UseNavigateStable),t=wi(Ut.UseNavigateStable),o=d.useRef(!1);return $t(()=>{o.current=!0}),d.useCallback(function(a,s){s===void 0&&(s={}),o.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,ar({fromRouteId:t},s)))},[e,t])}function ji(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function Si(e){let{basename:t="/",children:o=null,location:i,navigationType:a=ke.Pop,navigator:s,static:n=!1,future:l}=e;tt()&&xe(!1);let c=t.replace(/^\/*/,"/"),g=d.useMemo(()=>({basename:c,navigator:s,static:n,future:ar({v7_relativeSplatPath:!1},l)}),[c,l,s,n]);typeof i=="string"&&(i=cr(i));let{pathname:f="/",search:x="",hash:w="",state:y=null,key:u="default"}=i,k=d.useMemo(()=>{let p=ni(f,c);return p==null?null:{location:{pathname:p,search:x,hash:w,state:y,key:u},navigationType:a}},[c,f,x,w,y,u,a]);return k==null?null:d.createElement(Zr.Provider,{value:g},d.createElement(et.Provider,{children:o,value:k}))}new Promise(()=>{});/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const zi="6";try{window.__reactRouterVersion=zi}catch{}const Ci="startTransition",wt=Xo[Ci];function _i(e){let{basename:t,children:o,future:i,window:a}=e,s=d.useRef();s.current==null&&(s.current=ti({window:a,v5Compat:!0}));let n=s.current,[l,c]=d.useState({action:n.action,location:n.location}),{v7_startTransition:g}=i||{},f=d.useCallback(x=>{g&&wt?wt(()=>c(x)):c(x)},[c,g]);return d.useLayoutEffect(()=>n.listen(f),[n,f]),d.useEffect(()=>ji(i),[i]),d.createElement(Si,{basename:t,children:o,location:l.location,navigationType:l.action,navigator:n,future:i})}var kt;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(kt||(kt={}));var jt;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(jt||(jt={}));function Ei(e,t){return e===t?!0:!e||!t||e.length!==t.length?!1:e.every((o,i)=>o===t[i])}class Wt extends d.Component{constructor(o){super(o);me(this,"handleRetry",()=>{this.setState({error:null})});this.state={error:null}}static getDerivedStateFromError(o){return{error:o}}componentDidCatch(o,i){console.error("[AppErrorBoundary]",(o==null?void 0:o.message)||o,i==null?void 0:i.componentStack)}componentDidUpdate(o){const{resetKeys:i}=this.props;i&&!Ei(i,o.resetKeys)&&this.state.error&&this.setState({error:null})}render(){const{children:o,variant:i="full"}=this.props,{error:a}=this.state;return a?i==="route"?r.jsxs("section",{className:"sec anim",style:{maxWidth:560,margin:"32px auto",padding:"28px 24px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:16,textAlign:"center"},role:"alert",children:[r.jsx("div",{style:{fontSize:"2rem",marginBottom:12},children:"⚠️"}),r.jsx("h2",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.05rem",color:"var(--ink)",margin:"0 0 10px"},children:"Cette page a rencontré un problème"}),r.jsx("p",{style:{color:"var(--gray)",fontSize:".88rem",lineHeight:1.55,marginBottom:18},children:"Un incident technique a interrompu l’affichage. Tu peux réessayer ou changer de rubrique."}),!1,r.jsx("button",{type:"button",className:"form-submit",style:{width:"auto",padding:"12px 28px"},onClick:this.handleRetry,children:"Réessayer"})]}):r.jsx("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24,background:"var(--bg, #f5f1e8)",fontFamily:"'DM Sans',sans-serif"},children:r.jsxs("div",{style:{maxWidth:440,width:"100%",background:"var(--surface, #fff)",border:"1px solid var(--border, #e2ddd6)",borderRadius:16,padding:"32px 28px",textAlign:"center",boxShadow:"0 12px 40px rgba(13,31,20,.08)"},role:"alert",children:[r.jsx("div",{style:{fontSize:"2.5rem",marginBottom:14},children:"🛠️"}),r.jsx("h1",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.25rem",color:"var(--ink, #0d1f14)",margin:"0 0 12px"},children:"Yorix rencontre une erreur"}),r.jsx("p",{style:{color:"var(--gray, #6b7280)",fontSize:".9rem",lineHeight:1.6,marginBottom:22},children:"L’application n’a pas pu s’afficher correctement. Réessaie ou recharge la page."}),!1,r.jsxs("div",{style:{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"},children:[r.jsx("button",{type:"button",className:"form-submit",style:{width:"auto",padding:"12px 22px"},onClick:this.handleRetry,children:"Réessayer"}),r.jsx("button",{type:"button",style:{width:"auto",padding:"12px 22px",borderRadius:10,border:"1.5px solid var(--border, #e2ddd6)",background:"var(--surface2, #faf8f5)",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".85rem",cursor:"pointer",color:"var(--ink, #0d1f14)"},onClick:()=>window.location.reload(),children:"Recharger la page"})]})]})}):o}}function Ai({children:e,resetKeys:t}){return r.jsx(Wt,{variant:"route",resetKeys:t,children:e})}const Ti={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_VAPID_PUBLIC_KEY:"BHYax0YuzkC8V_07eVRTEathfnPPJCOh6uUocRG-tmcOu-etHRdAUm_nvOnXYi7OhbJfWJTYf_gkN4v2JA6SuWQ"},St="https://www.yorix.cm",ce=(()=>{try{return String(typeof import.meta<"u"&&Ti&&void 0||"").trim().replace(/\/$/,"")||St}catch{return St}})(),Vt=[{slug:"yaounde",name:"Yaoundé",region:"Centre"},{slug:"douala",name:"Douala",region:"Littoral"},{slug:"bafoussam",name:"Bafoussam",region:"Ouest"},{slug:"bamenda",name:"Bamenda",region:"Nord-Ouest"},{slug:"kribi",name:"Kribi",region:"Sud"},{slug:"bertoua",name:"Bertoua",region:"Est"},{slug:"garoua",name:"Garoua",region:"Nord"},{slug:"ngaoundere",name:"Ngaoundéré",region:"Adamaoua"},{slug:"maroua",name:"Maroua",region:"Extrême-Nord"},{slug:"ebolowa",name:"Ebolowa",region:"Sud"}],Q=Object.fromEntries(Vt.map(e=>[e.slug,e]));Object.fromEntries(Vt.map(e=>[e.name.toLowerCase(),e.slug]));const Ht={plomberie:"Plomberie",electricite:"Électricité",menage:"Nettoyage",beaute:"Beauté",reparation:"Réparation",transport:"Transport",graphisme:"Graphisme",photographie:"Photographie",nettoyage:"Nettoyage",menuiserie:"Menuiserie",informatique:"Informatique",cuisine:"Cuisine",maconnerie:"Maçonnerie",peinture:"Peinture",couture:"Couture"},Ni={"mode-accesoires":"Mode & Accessoires"};function Ri(e){return Xt(e||"")}function Xt(e){return e?(String(e).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ø/g,"o").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"yorix").slice(0,80):"yorix"}function Gt(e,t){return`${Xt(e)}--${t}`}function zt(e){if(!e||typeof e!="string")return{base:"",id:""};const t=e.lastIndexOf("--");return t===-1?{base:e,id:""}:{base:e.slice(0,t),id:e.slice(t+2)}}const nr={home:"/",produits:"/produits",livraison:"/livraison",escrow:"/escrow",prestataires:"/prestataires",inscription:"/devenir-prestataire",business:"/business",academy:"/academy",blog:"/blog",loyalty:"/fidelite",contact:"/contact",aide:"/aide",faq:"/faq",cgv:"/cgv",mentions:"/mentions-legales",confidentialite:"/politique-confidentialite",dashboard:"/dashboard",admin:"/admin",checkout:"/checkout",cart:"/panier",bonsPlans:"/bons-plans",notifications:"/notifications",devenirVendeur:"/devenir-vendeur",devenirLivreur:"/devenir-livreur"};function qr(e,t={}){if(e==="productDetail"&&t.productSlug)return`/produit/${t.productSlug}`;if(e==="prestDetail"&&t.prestSlug)return`/prestataire/${t.prestSlug}`;if(e==="produits"&&t.categorySlug)return`/categories/${t.categorySlug}`;if(e==="livraison"&&t.citySlug&&Q[t.citySlug])return`/livraison/${t.citySlug}`;if(e==="prestataires"&&t.metierSlug&&t.villeSlug)return`/prestataires/${t.metierSlug}/${t.villeSlug}`;if(e==="seoCity"){const{citySlug:o,mode:i="hub"}=t;return!o||!Q[o]?"/":i==="acheter"?`/acheter-a-${o}`:i==="livraison"?`/livraison-a-${o}`:i==="prestataires"?`/prestataires-a-${o}`:`/${o}`}return e==="academyDetail"&&t.courseId?`/academy/${t.courseId}`:e==="academyContact"&&t.courseId?`/academy/${t.courseId}/contact`:nr[e]??"/"}function Mi(e,t=[]){if(!e)return"";const o=Ni[e];return o&&t.includes(o)?o:t.find(a=>Ri(a)===e)||""}function Ii(e){const t=e.replace(/\/+$/,"")||"/";if(t==="/")return{page:"home",canonicalPath:"/"};const o=t.split("/").filter(Boolean),[i,a,s]=o;if(i==="produit"&&a)return{page:"productDetail",productSlug:a,canonicalPath:t};if(i==="categories"&&a)return{page:"produits",categorySlug:a,canonicalPath:t};if(i==="livraison")return a?Q[a]?{page:"livraison",citySlug:a,canonicalPath:t}:{page:"livraison",canonicalPath:"/livraison"}:{page:"livraison",canonicalPath:"/livraison"};if(i==="prestataire"&&a)return{page:"prestDetail",prestSlug:a,canonicalPath:t};if(i==="prestataires"&&a&&s&&Ht[a]&&Q[s])return{page:"prestataires",metierSlug:a,villeSlug:s,canonicalPath:t};if(i==="prestataires")return{page:"prestataires",canonicalPath:"/prestataires"};if(i==="academy"&&a)return s==="contact"?{page:"academyContact",courseId:a,canonicalPath:t}:{page:"academyDetail",courseId:a,canonicalPath:t};const n=Q[i];if(o.length===1&&n)return{page:"seoCity",citySlug:i,cityMode:"hub",canonicalPath:t};if(i!=null&&i.startsWith("acheter-a-")){const c=i.replace(/^acheter-a-/,"");if(Q[c])return{page:"seoCity",citySlug:c,cityMode:"acheter",canonicalPath:t}}if(i!=null&&i.startsWith("livraison-a-")){const c=i.replace(/^livraison-a-/,"");if(Q[c])return{page:"seoCity",citySlug:c,cityMode:"livraison",canonicalPath:t}}if(i!=null&&i.startsWith("prestataires-a-")){const c=i.replace(/^prestataires-a-/,"");if(Q[c])return{page:"seoCity",citySlug:c,cityMode:"prestataires",canonicalPath:t}}const l={produits:"produits",livraison:"livraison",escrow:"escrow",prestataires:"prestataires",business:"business",academy:"academy",blog:"blog",fidelite:"loyalty",contact:"contact",aide:"aide",faq:"faq",cgv:"cgv",mentions:"mentions","mentions-legales":"mentions",confidentialite:"confidentialite","politique-confidentialite":"confidentialite",dashboard:"dashboard",admin:"admin",checkout:"checkout",panier:"cart",cart:"cart","bons-plans":"bonsPlans",notifications:"notifications","devenir-vendeur":"devenirVendeur","devenir-livreur":"devenirLivreur","devenir-prestataire":"inscription",inscription:"inscription"};if(o.length===1&&l[i]){const c=l[i];return{page:c,canonicalPath:nr[c]??`/${i}`}}return{page:"home",canonicalPath:"/"}}function Li(){return`${ce}/produits`}var Pi=typeof Element<"u",Oi=typeof Map=="function",Di=typeof Set=="function",qi=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function tr(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){if(e.constructor!==t.constructor)return!1;var o,i,a;if(Array.isArray(e)){if(o=e.length,o!=t.length)return!1;for(i=o;i--!==0;)if(!tr(e[i],t[i]))return!1;return!0}var s;if(Oi&&e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(s=e.entries();!(i=s.next()).done;)if(!t.has(i.value[0]))return!1;for(s=e.entries();!(i=s.next()).done;)if(!tr(i.value[1],t.get(i.value[0])))return!1;return!0}if(Di&&e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(s=e.entries();!(i=s.next()).done;)if(!t.has(i.value[0]))return!1;return!0}if(qi&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(t)){if(o=e.length,o!=t.length)return!1;for(i=o;i--!==0;)if(e[i]!==t[i])return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf&&typeof e.valueOf=="function"&&typeof t.valueOf=="function")return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString&&typeof e.toString=="function"&&typeof t.toString=="function")return e.toString()===t.toString();if(a=Object.keys(e),o=a.length,o!==Object.keys(t).length)return!1;for(i=o;i--!==0;)if(!Object.prototype.hasOwnProperty.call(t,a[i]))return!1;if(Pi&&e instanceof Element)return!1;for(i=o;i--!==0;)if(!((a[i]==="_owner"||a[i]==="__v"||a[i]==="__o")&&e.$$typeof)&&!tr(e[a[i]],t[a[i]]))return!1;return!0}return e!==e&&t!==t}var Yi=function(t,o){try{return tr(t,o)}catch(i){if((i.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw i}};const Bi=Qr(Yi);var $i=function(e,t,o,i,a,s,n,l){if(!e){var c;if(t===void 0)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var g=[o,i,a,s,n,l],f=0;c=new Error(t.replace(/%s/g,function(){return g[f++]})),c.name="Invariant Violation"}throw c.framesToPop=1,c}},Fi=$i;const Ct=Qr(Fi);var Ui=function(t,o,i,a){var s=i?i.call(a,t,o):void 0;if(s!==void 0)return!!s;if(t===o)return!0;if(typeof t!="object"||!t||typeof o!="object"||!o)return!1;var n=Object.keys(t),l=Object.keys(o);if(n.length!==l.length)return!1;for(var c=Object.prototype.hasOwnProperty.bind(o),g=0;g<n.length;g++){var f=n[g];if(!c(f))return!1;var x=t[f],w=o[f];if(s=i?i.call(a,x,w,f):void 0,s===!1||s===void 0&&x!==w)return!1}return!0};const Wi=Qr(Ui);var Jt=(e=>(e.BASE="base",e.BODY="body",e.HEAD="head",e.HTML="html",e.LINK="link",e.META="meta",e.NOSCRIPT="noscript",e.SCRIPT="script",e.STYLE="style",e.TITLE="title",e.FRAGMENT="Symbol(react.fragment)",e))(Jt||{}),Yr={link:{rel:["amphtml","canonical","alternate"]},script:{type:["application/ld+json"]},meta:{charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]}},_t=Object.values(Jt),ot={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},Vi=Object.entries(ot).reduce((e,[t,o])=>(e[o]=t,e),{}),ge="data-rh",Re={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate",PRIORITIZE_SEO_TAGS:"prioritizeSeoTags"},Me=(e,t)=>{for(let o=e.length-1;o>=0;o-=1){const i=e[o];if(Object.prototype.hasOwnProperty.call(i,t))return i[t]}return null},Hi=e=>{let t=Me(e,"title");const o=Me(e,Re.TITLE_TEMPLATE);if(Array.isArray(t)&&(t=t.join("")),o&&t)return o.replace(/%s/g,()=>t);const i=Me(e,Re.DEFAULT_TITLE);return t||i||void 0},Xi=e=>Me(e,Re.ON_CHANGE_CLIENT_STATE)||(()=>{}),Br=(e,t)=>t.filter(o=>typeof o[e]<"u").map(o=>o[e]).reduce((o,i)=>({...o,...i}),{}),Gi=(e,t)=>t.filter(o=>typeof o.base<"u").map(o=>o.base).reverse().reduce((o,i)=>{if(!o.length){const a=Object.keys(i);for(let s=0;s<a.length;s+=1){const l=a[s].toLowerCase();if(e.indexOf(l)!==-1&&i[l])return o.concat(i)}}return o},[]),Ji=e=>console&&typeof console.warn=="function"&&console.warn(e),qe=(e,t,o)=>{const i={};return o.filter(a=>Array.isArray(a[e])?!0:(typeof a[e]<"u"&&Ji(`Helmet: ${e} should be of type "Array". Instead found type "${typeof a[e]}"`),!1)).map(a=>a[e]).reverse().reduce((a,s)=>{const n={};s.filter(c=>{let g;const f=Object.keys(c);for(let w=0;w<f.length;w+=1){const y=f[w],u=y.toLowerCase();t.indexOf(u)!==-1&&!(g==="rel"&&c[g].toLowerCase()==="canonical")&&!(u==="rel"&&c[u].toLowerCase()==="stylesheet")&&(g=u),t.indexOf(y)!==-1&&(y==="innerHTML"||y==="cssText"||y==="itemprop")&&(g=y)}if(!g||!c[g])return!1;const x=c[g].toLowerCase();return i[g]||(i[g]={}),n[g]||(n[g]={}),i[g][x]?!1:(n[g][x]=!0,!0)}).reverse().forEach(c=>a.push(c));const l=Object.keys(n);for(let c=0;c<l.length;c+=1){const g=l[c],f={...i[g],...n[g]};i[g]=f}return a},[]).reverse()},Ki=(e,t)=>{if(Array.isArray(e)&&e.length){for(let o=0;o<e.length;o+=1)if(e[o][t])return!0}return!1},Qi=e=>({baseTag:Gi(["href"],e),bodyAttributes:Br("bodyAttributes",e),defer:Me(e,Re.DEFER),encode:Me(e,Re.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:Br("htmlAttributes",e),linkTags:qe("link",["rel","href"],e),metaTags:qe("meta",["name","charset","http-equiv","property","itemprop"],e),noscriptTags:qe("noscript",["innerHTML"],e),onChangeClientState:Xi(e),scriptTags:qe("script",["src","innerHTML"],e),styleTags:qe("style",["cssText"],e),title:Hi(e),titleAttributes:Br("titleAttributes",e),prioritizeSeoTags:Ki(e,Re.PRIORITIZE_SEO_TAGS)}),Kt=e=>Array.isArray(e)?e.join(""):e,Zi=(e,t)=>{const o=Object.keys(e);for(let i=0;i<o.length;i+=1)if(t[o[i]]&&t[o[i]].includes(e[o[i]]))return!0;return!1},$r=(e,t)=>Array.isArray(e)?e.reduce((o,i)=>(Zi(i,t)?o.priority.push(i):o.default.push(i),o),{priority:[],default:[]}):{default:e,priority:[]},Et=(e,t)=>({...e,[t]:void 0}),ea=["noscript","script","style"],Xr=(e,t=!0)=>t===!1?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"),Qt=e=>Object.keys(e).reduce((t,o)=>{const i=typeof e[o]<"u"?`${o}="${e[o]}"`:`${o}`;return t?`${t} ${i}`:i},""),ra=(e,t,o,i)=>{const a=Qt(o),s=Kt(t);return a?`<${e} ${ge}="true" ${a}>${Xr(s,i)}</${e}>`:`<${e} ${ge}="true">${Xr(s,i)}</${e}>`},ta=(e,t,o=!0)=>t.reduce((i,a)=>{const s=a,n=Object.keys(s).filter(g=>!(g==="innerHTML"||g==="cssText")).reduce((g,f)=>{const x=typeof s[f]>"u"?f:`${f}="${Xr(s[f],o)}"`;return g?`${g} ${x}`:x},""),l=s.innerHTML||s.cssText||"",c=ea.indexOf(e)===-1;return`${i}<${e} ${ge}="true" ${n}${c?"/>":`>${l}</${e}>`}`},""),Zt=(e,t={})=>Object.keys(e).reduce((o,i)=>{const a=ot[i];return o[a||i]=e[i],o},t),oa=(e,t,o)=>{const i={key:t,[ge]:!0},a=Zt(o,i);return[ue.createElement("title",a,t)]},or=(e,t)=>t.map((o,i)=>{const a={key:i,[ge]:!0};return Object.keys(o).forEach(s=>{const l=ot[s]||s;if(l==="innerHTML"||l==="cssText"){const c=o.innerHTML||o.cssText;a.dangerouslySetInnerHTML={__html:c}}else a[l]=o[s]}),ue.createElement(e,a)}),le=(e,t,o=!0)=>{switch(e){case"title":return{toComponent:()=>oa(e,t.title,t.titleAttributes),toString:()=>ra(e,t.title,t.titleAttributes,o)};case"bodyAttributes":case"htmlAttributes":return{toComponent:()=>Zt(t),toString:()=>Qt(t)};default:return{toComponent:()=>or(e,t),toString:()=>ta(e,t,o)}}},ia=({metaTags:e,linkTags:t,scriptTags:o,encode:i})=>{const a=$r(e,Yr.meta),s=$r(t,Yr.link),n=$r(o,Yr.script);return{priorityMethods:{toComponent:()=>[...or("meta",a.priority),...or("link",s.priority),...or("script",n.priority)],toString:()=>`${le("meta",a.priority,i)} ${le("link",s.priority,i)} ${le("script",n.priority,i)}`},metaTags:a.default,linkTags:s.default,scriptTags:n.default}},aa=e=>{const{baseTag:t,bodyAttributes:o,encode:i=!0,htmlAttributes:a,noscriptTags:s,styleTags:n,title:l="",titleAttributes:c,prioritizeSeoTags:g}=e;let{linkTags:f,metaTags:x,scriptTags:w}=e,y={toComponent:()=>{},toString:()=>""};return g&&({priorityMethods:y,linkTags:f,metaTags:x,scriptTags:w}=ia(e)),{priority:y,base:le("base",t,i),bodyAttributes:le("bodyAttributes",o,i),htmlAttributes:le("htmlAttributes",a,i),link:le("link",f,i),meta:le("meta",x,i),noscript:le("noscript",s,i),script:le("script",w,i),style:le("style",n,i),title:le("title",{title:l,titleAttributes:c},i)}},Gr=aa,er=[],eo=!!(typeof window<"u"&&window.document&&window.document.createElement),Jr=class{constructor(e,t){me(this,"instances",[]);me(this,"canUseDOM",eo);me(this,"context");me(this,"value",{setHelmet:e=>{this.context.helmet=e},helmetInstances:{get:()=>this.canUseDOM?er:this.instances,add:e=>{(this.canUseDOM?er:this.instances).push(e)},remove:e=>{const t=(this.canUseDOM?er:this.instances).indexOf(e);(this.canUseDOM?er:this.instances).splice(t,1)}}});this.context=e,this.canUseDOM=t||!1,t||(e.helmet=Gr({baseTag:[],bodyAttributes:{},htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}},na={},ro=ue.createContext(na),je,to=(je=class extends d.Component{constructor(o){super(o);me(this,"helmetData");this.helmetData=new Jr(this.props.context||{},je.canUseDOM)}render(){return ue.createElement(ro.Provider,{value:this.helmetData.value},this.props.children)}},me(je,"canUseDOM",eo),je),Te=(e,t)=>{const o=document.head||document.querySelector("head"),i=o.querySelectorAll(`${e}[${ge}]`),a=[].slice.call(i),s=[];let n;return t&&t.length&&t.forEach(l=>{const c=document.createElement(e);for(const g in l)if(Object.prototype.hasOwnProperty.call(l,g))if(g==="innerHTML")c.innerHTML=l.innerHTML;else if(g==="cssText")c.styleSheet?c.styleSheet.cssText=l.cssText:c.appendChild(document.createTextNode(l.cssText));else{const f=g,x=typeof l[f]>"u"?"":l[f];c.setAttribute(g,x)}c.setAttribute(ge,"true"),a.some((g,f)=>(n=f,c.isEqualNode(g)))?a.splice(n,1):s.push(c)}),a.forEach(l=>{var c;return(c=l.parentNode)==null?void 0:c.removeChild(l)}),s.forEach(l=>o.appendChild(l)),{oldTags:a,newTags:s}},Kr=(e,t)=>{const o=document.getElementsByTagName(e)[0];if(!o)return;const i=o.getAttribute(ge),a=i?i.split(","):[],s=[...a],n=Object.keys(t);for(const l of n){const c=t[l]||"";o.getAttribute(l)!==c&&o.setAttribute(l,c),a.indexOf(l)===-1&&a.push(l);const g=s.indexOf(l);g!==-1&&s.splice(g,1)}for(let l=s.length-1;l>=0;l-=1)o.removeAttribute(s[l]);a.length===s.length?o.removeAttribute(ge):o.getAttribute(ge)!==n.join(",")&&o.setAttribute(ge,n.join(","))},sa=(e,t)=>{typeof e<"u"&&document.title!==e&&(document.title=Kt(e)),Kr("title",t)},At=(e,t)=>{const{baseTag:o,bodyAttributes:i,htmlAttributes:a,linkTags:s,metaTags:n,noscriptTags:l,onChangeClientState:c,scriptTags:g,styleTags:f,title:x,titleAttributes:w}=e;Kr("body",i),Kr("html",a),sa(x,w);const y={baseTag:Te("base",o),linkTags:Te("link",s),metaTags:Te("meta",n),noscriptTags:Te("noscript",l),scriptTags:Te("script",g),styleTags:Te("style",f)},u={},k={};Object.keys(y).forEach(p=>{const{newTags:b,oldTags:z}=y[p];b.length&&(u[p]=b),z.length&&(k[p]=y[p].oldTags)}),t&&t(),c(e,u,k)},Ye=null,la=e=>{Ye&&cancelAnimationFrame(Ye),e.defer?Ye=requestAnimationFrame(()=>{At(e,()=>{Ye=null})}):(At(e),Ye=null)},da=la,Tt=class extends d.Component{constructor(){super(...arguments);me(this,"rendered",!1)}shouldComponentUpdate(t){return!Wi(t,this.props)}componentDidUpdate(){this.emitChange()}componentWillUnmount(){const{helmetInstances:t}=this.props.context;t.remove(this),this.emitChange()}emitChange(){const{helmetInstances:t,setHelmet:o}=this.props.context;let i=null;const a=Qi(t.get().map(s=>{const n={...s.props};return delete n.context,n}));to.canUseDOM?da(a):Gr&&(i=Gr(a)),o(i)}init(){if(this.rendered)return;this.rendered=!0;const{helmetInstances:t}=this.props.context;t.add(this),this.emitChange()}render(){return this.init(),null}},Wr,ca=(Wr=class extends d.Component{shouldComponentUpdate(e){return!Bi(Et(this.props,"helmetData"),Et(e,"helmetData"))}mapNestedChildrenToProps(e,t){if(!t)return null;switch(e.type){case"script":case"noscript":return{innerHTML:t};case"style":return{cssText:t};default:throw new Error(`<${e.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`)}}flattenArrayTypeChildren(e,t,o,i){return{...t,[e.type]:[...t[e.type]||[],{...o,...this.mapNestedChildrenToProps(e,i)}]}}mapObjectTypeChildren(e,t,o,i){switch(e.type){case"title":return{...t,[e.type]:i,titleAttributes:{...o}};case"body":return{...t,bodyAttributes:{...o}};case"html":return{...t,htmlAttributes:{...o}};default:return{...t,[e.type]:{...o}}}}mapArrayTypeChildrenToProps(e,t){let o={...t};return Object.keys(e).forEach(i=>{o={...o,[i]:e[i]}}),o}warnOnInvalidChildren(e,t){return Ct(_t.some(o=>e.type===o),typeof e.type=="function"?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${_t.join(", ")} are allowed. Helmet does not support rendering <${e.type}> elements. Refer to our API for more information.`),Ct(!t||typeof t=="string"||Array.isArray(t)&&!t.some(o=>typeof o!="string"),`Helmet expects a string as a child of <${e.type}>. Did you forget to wrap your children in braces? ( <${e.type}>{\`\`}</${e.type}> ) Refer to our API for more information.`),!0}mapChildrenToProps(e,t){let o={};return ue.Children.forEach(e,i=>{if(!i||!i.props)return;const{children:a,...s}=i.props,n=Object.keys(s).reduce((c,g)=>(c[Vi[g]||g]=s[g],c),{});let{type:l}=i;switch(typeof l=="symbol"?l=l.toString():this.warnOnInvalidChildren(i,a),l){case"Symbol(react.fragment)":t=this.mapChildrenToProps(a,t);break;case"link":case"meta":case"noscript":case"script":case"style":o=this.flattenArrayTypeChildren(i,o,n,a);break;default:t=this.mapObjectTypeChildren(i,t,n,a);break}}),this.mapArrayTypeChildrenToProps(o,t)}render(){const{children:e,...t}=this.props;let o={...t},{helmetData:i}=t;if(e&&(o=this.mapChildrenToProps(e,o)),i&&!(i instanceof Jr)){const a=i;i=new Jr(a.context,!0),delete o.helmetData}return i?ue.createElement(Tt,{...o,context:i.value}):ue.createElement(ro.Consumer,null,a=>ue.createElement(Tt,{...o,context:a}))}},me(Wr,"defaultProps",{defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1}),Wr);function pa({title:e,description:t,canonicalPath:o,robots:i="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",keywords:a,ogType:s="website",ogImage:n="https://www.yorix.cm/og-image.svg",ogImageAlt:l,ogImageType:c,jsonLd:g=[],noindex:f=!1}){const x=`${ce}${o!=null&&o.startsWith("/")?o:`/${o||""}`}`.replace(/([^:]\/)\/+/g,"$1"),w=f?"noindex, nofollow":i,y=Array.isArray(g)?g.filter(Boolean):g?[g]:[],u=l||e||"Yorix CM — Marketplace #1 au Cameroun",k=c||(n.endsWith(".svg")?"image/svg+xml":n.endsWith(".png")?"image/png":n.endsWith(".webp")?"image/webp":"image/jpeg");return r.jsxs(ca,{children:[r.jsx("html",{lang:"fr-CM"}),r.jsx("title",{children:e}),r.jsx("meta",{name:"description",content:t}),a&&r.jsx("meta",{name:"keywords",content:a}),r.jsx("meta",{name:"robots",content:w}),r.jsx("meta",{name:"googlebot",content:w}),r.jsx("link",{rel:"canonical",href:x}),r.jsx("link",{rel:"alternate",hrefLang:"fr-CM",href:x}),r.jsx("link",{rel:"alternate",hrefLang:"fr",href:x}),r.jsx("link",{rel:"alternate",hrefLang:"x-default",href:x}),r.jsx("meta",{property:"og:type",content:s}),r.jsx("meta",{property:"og:site_name",content:"Yorix CM"}),r.jsx("meta",{property:"og:title",content:e}),r.jsx("meta",{property:"og:description",content:t}),r.jsx("meta",{property:"og:url",content:x}),r.jsx("meta",{property:"og:image",content:n}),r.jsx("meta",{property:"og:image:type",content:k}),r.jsx("meta",{property:"og:image:width",content:"1200"}),r.jsx("meta",{property:"og:image:height",content:"630"}),r.jsx("meta",{property:"og:image:alt",content:u}),r.jsx("meta",{property:"og:locale",content:"fr_CM"}),r.jsx("meta",{property:"og:locale:alternate",content:"fr_FR"}),r.jsx("meta",{property:"og:locale:alternate",content:"en_US"}),r.jsx("meta",{name:"twitter:card",content:"summary_large_image"}),r.jsx("meta",{name:"twitter:site",content:"@yorixcm"}),r.jsx("meta",{name:"twitter:creator",content:"@yorixcm"}),r.jsx("meta",{name:"twitter:title",content:e}),r.jsx("meta",{name:"twitter:description",content:t}),r.jsx("meta",{name:"twitter:image",content:n}),r.jsx("meta",{name:"twitter:image:alt",content:u}),y.map((p,b)=>r.jsx("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:typeof p=="string"?p:JSON.stringify(p)}},b))]})}const oo="https://msrymchhhxitdevthvdi.supabase.co",ga="sb_publishable_yJj7JNdn-r19Pjc070IOBg_y2VzGJXA",fa=oo,io=ga,E=Go(fa,io),sr="237696565654",ma="676935195",xa="696565654",ua="237696565654",ba="yorix_unsigned",ha=io,ao=["Téléphones & HighTech","Mode & Accessoires","Alimentation","Maison & Decoration","Agricole","Beauté & Soins","BTP","Automobile","Éducation","Services"],ya=["Toutes les villes","Douala","Yaoundé","Bafoussam","Bamenda","Garoua","Kribi","Ngaoundéré","Maroua","Ebolowa","Buea","Bertoua"],no={buyer:"🛍️ Acheteur",seller:"🏪 Vendeur",delivery:"🚚 Livreur",provider:"👷 Prestataire",admin:"🛡️ Administrateur"},Qn={pending:"⏳ En attente",en_cours:"🚚 En cours",livre:"✅ Livré",echec:"❌ Échoué"},Zn={pending:"⏳ En attente",securise:"🔐 Sécurisé",libere:"✅ Libéré",rembourse:"↩️ Remboursé"},va=[{id:"p1",name:"Claude Mbassi",metier:"Plombier certifié",categorie:"Plomberie",ville:"Douala",quartier:"Akwa",emoji:"🔧",photo:"https://images.unsplash.com/photo-1620207418302-439b387441b0?w=400&q=80",color_bg:"linear-gradient(135deg, #dbeafe, #bfdbfe)",tags:["Plomberie","Sanitaire","Chauffe-eau"],note:4.9,avis:87,prix:"15 000 FCFA/h",experience:"8 ans",verifie:!0,top:!0,dispo:!0,bio:"Spécialiste en installations sanitaires et réparations d'urgence. Intervention rapide dans tout Douala. Devis gratuit.",telephone:"+237696565454",realisations:340},{id:"p2",name:"Électro Bertrand",metier:"Électricien",categorie:"Électricité",ville:"Yaoundé",quartier:"Bastos",emoji:"⚡",photo:"https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&q=80",color_bg:"linear-gradient(135deg, #fef3c7, #fde68a)",tags:["Électricité","Installation","Dépannage"],note:4.8,avis:124,prix:"12 000 FCFA/h",experience:"12 ans",verifie:!0,top:!0,dispo:!0,bio:"Installation électrique complète, mise aux normes, dépannage 24h/24. Travaux garantis 1 an.",telephone:"+237677884455",realisations:450},{id:"p3",name:"Raissa Design",metier:"Graphiste freelance",categorie:"Graphisme",ville:"Douala",quartier:"Bonanjo",emoji:"🎨",photo:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",color_bg:"linear-gradient(135deg, #fce7f3, #fbcfe8)",tags:["Logo","Flyer","Branding"],note:5,avis:56,prix:"25 000 FCFA/projet",experience:"5 ans",verifie:!0,top:!1,dispo:!0,bio:"Création d'identité visuelle, logos, flyers et supports print. Style moderne et africain contemporain.",telephone:"+237699001122",realisations:180},{id:"p4",name:"PhotoCam Pro",metier:"Photographe",categorie:"Photographie",ville:"Kribi",quartier:"Centre-ville",emoji:"📸",photo:"https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400&q=80",color_bg:"linear-gradient(135deg, #e0e7ff, #c7d2fe)",tags:["Mariage","Portrait","Événementiel"],note:4.9,avis:203,prix:"50 000 FCFA/jour",experience:"10 ans",verifie:!0,top:!0,dispo:!0,bio:"Photographe de mariage, portrait et événementiel. Studio équipé + déplacement partout au Cameroun.",telephone:"+237670223344",realisations:520},{id:"p5",name:"CleanPro237",metier:"Service de nettoyage",categorie:"Nettoyage",ville:"Douala",quartier:"Bonapriso",emoji:"🧹",photo:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",color_bg:"linear-gradient(135deg, #dcfce7, #bbf7d0)",tags:["Ménage","Bureaux","Grand nettoyage"],note:4.6,avis:312,prix:"8 000 FCFA/h",experience:"6 ans",verifie:!0,top:!1,dispo:!0,bio:"Nettoyage professionnel de maisons, bureaux et appartements. Produits écologiques. Équipe formée.",telephone:"+237655112233",realisations:890},{id:"p6",name:"DevCam Tech",metier:"Développeur Web",categorie:"Informatique",ville:"Yaoundé",quartier:"Nlongkak",emoji:"💻",photo:"https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80",color_bg:"linear-gradient(135deg, #cffafe, #a5f3fc)",tags:["Site web","App","E-commerce"],note:4.8,avis:41,prix:"200 000 FCFA/projet",experience:"7 ans",verifie:!0,top:!0,dispo:!0,bio:"Création de sites web, applications mobiles et boutiques en ligne. Technologies React, Next.js, React Native.",telephone:"+237690112233",realisations:95},{id:"p7",name:"Kouakou Menuiserie",metier:"Menuisier ébéniste",categorie:"Menuiserie",ville:"Bafoussam",quartier:"Tamdja",emoji:"🪚",photo:"https://images.unsplash.com/photo-1513467655676-561b7d489a88?w=400&q=80",color_bg:"linear-gradient(135deg, #fed7aa, #fdba74)",tags:["Meubles","Placards","Sur-mesure"],note:4.7,avis:156,prix:"À partir de 50 000 FCFA",experience:"15 ans",verifie:!0,top:!1,dispo:!0,bio:"Menuiserie traditionnelle et moderne. Fabrication de meubles sur-mesure, placards, portes et fenêtres.",telephone:"+237677445566",realisations:420},{id:"p8",name:"Chef Marguerite",metier:"Cuisinière événementielle",categorie:"Cuisine",ville:"Douala",quartier:"Logbessou",emoji:"👩‍🍳",photo:"https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80",color_bg:"linear-gradient(135deg, #fecaca, #fca5a5)",tags:["Traiteur","Mariages","Cuisine locale"],note:4.9,avis:178,prix:"3 500 FCFA/pers.",experience:"20 ans",verifie:!0,top:!0,dispo:!0,bio:"Traiteur spécialisé cuisine camerounaise et internationale. Ndolé, Poulet DG, Eru... pour mariages et événements.",telephone:"+237699778899",realisations:260},{id:"p9",name:"Beauté by Sandra",metier:"Coiffeuse à domicile",categorie:"Beauté",ville:"Yaoundé",quartier:"Mvan",emoji:"💇‍♀️",photo:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",color_bg:"linear-gradient(135deg, #fbcfe8, #f9a8d4)",tags:["Tresses","Coloration","Soins"],note:5,avis:89,prix:"10 000 FCFA/prest.",experience:"6 ans",verifie:!0,top:!1,dispo:!0,bio:"Coiffure à domicile : tresses africaines, mèches, coloration, soins capillaires. Je me déplace partout à Yaoundé.",telephone:"+237651223344",realisations:340}],es=[{id:1,slug:"vendre-en-ligne-cameroun-2026",title:"Comment vendre en ligne au Cameroun en 2026 : le guide complet",excerpt:"Stratégies concrètes pour lancer ton business e-commerce au Cameroun : choix des produits, marketing WhatsApp, paiement mobile, logistique locale.",cat:"BUSINESS",emoji:"📈",color_bg:"linear-gradient(135deg, #dbeafe, #bfdbfe)",image:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",date:"15 avril 2026",read:"8 min",author:"Équipe Yorix",author_avatar:"Y",featured:!0,external_url:"https://www.journalducameroun.com/e-commerce-au-cameroun-un-marche-en-pleine-expansion/",tags:["E-commerce","Cameroun","Business"]},{id:2,slug:"produits-camerounais-plus-vendus",title:"Les 10 produits camerounais les plus vendus en ligne",excerpt:"Beurre de karité, pagne wax, cacao, miel de Oku, poivre de Penja... Découvre les produits locaux qui cartonnent à l'international.",cat:"LOCAL",emoji:"🌿",color_bg:"linear-gradient(135deg, #dcfce7, #bbf7d0)",image:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",date:"12 avril 2026",read:"6 min",author:"Marie Tchoumi",author_avatar:"M",featured:!1,external_url:"https://www.investiraucameroun.com/agriculture",tags:["Produits locaux","Export","Artisanat"]},{id:3,slug:"mtn-momo-vs-orange-money",title:"MTN MoMo vs Orange Money : quel système de paiement choisir ?",excerpt:"Comparatif détaillé des deux géants du mobile money au Cameroun : frais, limites, sécurité, intégration marchande et expérience utilisateur.",cat:"PAIEMENT",emoji:"💳",color_bg:"linear-gradient(135deg, #fef3c7, #fde68a)",image:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",date:"10 avril 2026",read:"7 min",author:"Jean-Paul Essomba",author_avatar:"J",featured:!1,external_url:"https://www.gsma.com/mobilefordevelopment/mobile-money/",tags:["MoMo","Orange Money","Fintech"]},{id:4,slug:"suivi-commande-temps-reel",title:"Suivi de commande en temps réel : comment ça marche chez Yorix",excerpt:"Découvre notre système de tracking GPS inspiré d'Uber : de la collecte chez le vendeur jusqu'à ta porte, tu vois tout en direct.",cat:"LIVRAISON",emoji:"🚚",color_bg:"linear-gradient(135deg, #fed7aa, #fdba74)",image:"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",date:"8 avril 2026",read:"5 min",author:"Équipe Yorix Ride",author_avatar:"R",featured:!1,external_url:"https://www.uber.com/fr/newsroom/",tags:["Livraison","GPS","Technologie"]},{id:5,slug:"escrow-protection-acheteur",title:"Escrow Yorix : pourquoi ton argent est 100% protégé",excerpt:"Comprends en 5 minutes le système Escrow : ton paiement reste bloqué jusqu'à la livraison confirmée. Zéro arnaque, zéro stress.",cat:"SÉCURITÉ",emoji:"🔐",color_bg:"linear-gradient(135deg, #e9d5ff, #d8b4fe)",image:"https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",date:"5 avril 2026",read:"4 min",author:"Équipe Sécurité",author_avatar:"S",featured:!1,external_url:"https://en.wikipedia.org/wiki/Escrow",tags:["Escrow","Sécurité","Paiement"]},{id:6,slug:"electricien-fiable-douala",title:"Comment trouver un électricien fiable à Douala en 2026",excerpt:"Check-list complète : vérifier les qualifications, demander un devis, évaluer les avis, éviter les arnaques courantes dans le BTP camerounais.",cat:"PRESTATAIRES",emoji:"⚡",color_bg:"linear-gradient(135deg, #fecaca, #fca5a5)",image:"https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",date:"2 avril 2026",read:"6 min",author:"Service Prestataires",author_avatar:"P",featured:!1,external_url:"https://www.cameroon-tribune.cm/",tags:["BTP","Douala","Prestataires"]},{id:7,slug:"pagne-wax-histoire-tendances",title:"Le pagne wax camerounais : histoire, tendances et où acheter",excerpt:"Du marché de Mokolo aux défilés internationaux, le pagne wax conquiert le monde. Guide complet pour reconnaître un vrai pagne de qualité.",cat:"MODE",emoji:"👗",color_bg:"linear-gradient(135deg, #fce7f3, #fbcfe8)",image:"https://images.unsplash.com/photo-1617627191894-1c9e59f7a4ab?w=800&q=80",date:"28 mars 2026",read:"9 min",author:"Fatima Abakar",author_avatar:"F",featured:!1,external_url:"https://www.vogue.fr/mode/article/wax-pagne-africain-histoire",tags:["Mode","Pagne","Culture"]},{id:8,slug:"devenir-livreur-yorix",title:"Devenir livreur Yorix : gagne jusqu'à 150 000 FCFA/mois",excerpt:"Témoignages de livreurs actifs à Yaoundé et Douala, processus d'inscription, revenus réels et conseils pour maximiser tes gains.",cat:"CARRIÈRE",emoji:"🏍️",color_bg:"linear-gradient(135deg, #cffafe, #a5f3fc)",image:"https://images.unsplash.com/photo-1558383331-f520f2888351?w=800&q=80",date:"25 mars 2026",read:"7 min",author:"Équipe Yorix Ride",author_avatar:"R",featured:!1,external_url:"https://www.cameroon-info.net/",tags:["Emploi","Livraison","Revenus"]},{id:9,slug:"fiscalite-vendeurs-cameroun",title:"Fiscalité des vendeurs en ligne au Cameroun : ce qu'il faut savoir",excerpt:"TVA, impôt sur le revenu, patente : toutes les obligations fiscales d'un e-commerçant camerounais expliquées simplement.",cat:"BUSINESS",emoji:"📊",color_bg:"linear-gradient(135deg, #dbeafe, #bfdbfe)",image:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",date:"22 mars 2026",read:"10 min",author:"Expert Comptable",author_avatar:"E",featured:!1,external_url:"https://www.impots.cm/",tags:["Fiscalité","Impôts","Business"]}],rs=[{icon:"🎁",name:"Bon 5 000 FCFA",pts:500},{icon:"🚚",name:"Livraison gratuite x3",pts:300},{icon:"⭐",name:"Statut VIP Yorix",pts:1e3},{icon:"📱",name:"-20% téléphones",pts:400},{icon:"☕",name:"Pack café 500g",pts:200},{icon:"🎓",name:"Cours Academy offert",pts:350}],Ne={};function ir(e,t={}){if(!e||typeof e!="string"||!e.includes("cloudinary.com"))return e;const{width:o=400,quality:i="auto:low",format:a="auto",dpr:s="auto"}=t;if(e.includes("/w_")||e.includes("/q_"))return e;const n=[`w_${o}`,`q_${i}`,`f_${a}`,`dpr_${s}`,"c_limit"].join(",");return e.replace(/\/upload\//,`/upload/${n}/`)}function ts(e){return!e||!e.includes("cloudinary.com")?"":[`${ir(e,{width:400})} 400w`,`${ir(e,{width:800})} 800w`,`${ir(e,{width:1200})} 1200w`].join(", ")}function os(e){return!e||!e.includes("cloudinary.com")?"":ir(e,{width:20,quality:"auto:low"})}async function is(e){const t=new FormData;t.append("file",e),t.append("upload_preset",ba);const i=await(await fetch("https://api.cloudinary.com/v1_1/dulwb03nf/image/upload",{method:"POST",body:t})).json();if(i.error)throw new Error(i.error.message);return i.secure_url}async function wa(e){const{data:t,error:o}=await E.from("profiles").select("*").eq("id",e).maybeSingle();return o?(console.error("getUserProfile ERROR:",o),null):t}function ka(e){const t=["buyer","seller","delivery","provider","admin"],o=e==null?void 0:e.role;return o==="superadmin"?"admin":o&&t.includes(o)?o:"buyer"}const ja=[/(\+?237[\s\-]?[0-9]{8,9})/g,/(\+?[0-9]{1,3}[\s\-]?[0-9]{9,10})/g,/(whatsapp|wa\.me|t\.me|telegram)/gi,/([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g,/(facebook\.com|instagram\.com)/gi];function Sa(e){return ja.some(t=>new RegExp(t.source,t.flags).test(e))?{bloque:!0}:{bloque:!1}}function za(){const e=Ne==null?void 0:Ne.VITE_SEND_EMAIL_URL;if(e&&String(e).trim())return String(e).trim().replace(/\/$/,"");const t=String((Ne==null?void 0:Ne.VITE_SUPABASE_URL)||oo).trim().replace(/\/$/,"");return t?`${t}/functions/v1/send-email`:""}const Ca=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;async function _a({to:e,subject:t,html:o,from:i}){const a=za();if(!a||!/^https:\/\//i.test(a))return console.error("sendEmail: URL Edge invalide (VITE_SUPABASE_URL / VITE_SEND_EMAIL_URL)"),{success:!1,error:"Configuration email manquante"};if(!e||typeof e!="string"||!Ca.test(e.trim()))return{success:!1,error:"Destinataire invalide"};if(!t||typeof t!="string"||!o||typeof o!="string")return{success:!1,error:"Sujet ou contenu manquant"};const{data:{session:s},error:n}=await E.auth.getSession(),l=s==null?void 0:s.access_token;if(n||!l)return console.warn("sendEmail: session requise",n==null?void 0:n.message),{success:!1,error:"Authentification requise pour envoyer un e-mail."};try{const c=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${l}`,apikey:ha},body:JSON.stringify({to:e.trim(),subject:t,html:o,from:i})}),g=await c.json().catch(()=>({}));return c.ok?{success:!0,id:g.id}:(console.error("sendEmail error:",g),{success:!1,error:g.error||g.message||`HTTP ${c.status}`})}catch(c){return console.error("sendEmail exception:",c),{success:!1,error:c.message}}}function Ea(e,t){return`
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f5f1e8;padding:0">
      <div style="background:linear-gradient(135deg,#1a6b3a,#0d4a25);padding:24px 32px;text-align:center">
        <h1 style="color:#fff;margin:0;font-size:28px;letter-spacing:-.5px">Yo<span style="color:#fcd116">rix</span> CM</h1>
        <p style="color:rgba(255,255,255,.8);margin:4px 0 0;font-size:13px">Marketplace du Cameroun 🇨🇲</p>
      </div>
      <div style="background:#fff;padding:32px;border-left:1px solid #e2ddd6;border-right:1px solid #e2ddd6">
        <h2 style="color:#1a6b3a;margin:0 0 16px;font-size:20px">${e}</h2>
        ${t}
      </div>
      <div style="background:#0d1f14;padding:20px 32px;text-align:center;color:rgba(255,255,255,.6);font-size:12px">
        <p style="margin:0 0 8px"><strong style="color:#fff">Yorix CM</strong> — RC DOUALA/2026/B237</p>
        <p style="margin:0">📱 +237 696 56 56 54 · ✉️ support@yorix.cm · 🌐 <a href="https://www.yorix.cm" style="color:#4fd17d">yorix.cm</a></p>
        <p style="margin:12px 0 0;font-size:11px;opacity:.5">Vous recevez cet email car vous êtes utilisateur de Yorix CM.</p>
      </div>
    </div>
  `}function Aa(e,t="client"){const i={buyer:"acheteur",seller:"vendeur",delivery:"livreur",provider:"prestataire",client:"client"}[t]||"client";return Ea(`Bienvenue sur Yorix, ${e} ! 🎉`,`
      <p style="font-size:15px;line-height:1.7;color:#0d1f14">Nous sommes ravis de vous compter parmi nos <strong>${i}s</strong> sur Yorix CM, la marketplace camerounaise #1.</p>
      <p style="font-size:15px;line-height:1.7;color:#0d1f14">Voici ce que vous pouvez faire dès maintenant :</p>
      <ul style="font-size:14px;line-height:1.9;color:#4a5048;padding-left:20px">
        <li>🛍️ Explorer des milliers de produits locaux et importés</li>
        <li>🚚 Commander avec livraison rapide à Yaoundé & Douala</li>
        <li>💳 Payer en toute sécurité via MTN MoMo ou Orange Money</li>
        <li>🔐 Bénéficier de la protection Escrow Yorix</li>
      </ul>
      <div style="text-align:center;margin:24px 0">
        <a href="https://www.yorix.cm" style="display:inline-block;background:#1a6b3a;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">🚀 Explorer Yorix</a>
      </div>
      <p style="font-size:13px;color:#888;margin-top:24px">Des questions ? Répondez à cet email ou écrivez-nous sur WhatsApp au +237 696 56 56 54.</p>
    `)}const Ta=e=>`
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --ink:${e?"#e8f0eb":"#0d1f14"};
  --green:#1a6b3a;--green-mid:#27a85a;--green-light:#4fd17d;
  --green-pale:${e?"#1a3a24":"#c8f5d9"};
  --red:#ce1126;--yellow:#fcd116;--gold:#c9a84c;
  --wa:#25D366;
  --bg:${e?"#0d1a12":"#f5f2ed"};
  --surface:${e?"#152118":"#ffffff"};
  --surface2:${e?"#1c2e22":"#f0ece6"};
  --sand:${e?"#1a2e1e":"#ede8df"};
  --border:${e?"#2a4030":"#e2ddd6"};
  --gray:${e?"#7a9a82":"#6b7a72"};
  --shadow:${e?"rgba(0,0,0,.45)":"rgba(0,0,0,.08)"};
  --yorix-r-sm:10px;--yorix-r-md:12px;--yorix-r-lg:16px;--yorix-r-xl:20px;
  --yorix-sh-sm:0 4px 20px ${e?"rgba(0,0,0,.28)":"rgba(13,31,20,.06)"};
  --yorix-sh-md:0 12px 40px ${e?"rgba(0,0,0,.35)":"rgba(13,31,20,.09)"};
}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--ink);transition:background .3s,color .3s;}

/* TOPBAR */
.topbar{background:${e?"#0a1410":"#0d1f14"};padding:5px 24px;display:flex;align-items:center;justify-content:space-between;font-size:.71rem;color:rgba(255,255,255,.44);}
.topbar-l{display:flex;gap:14px;align-items:center;}
.flag{display:flex;width:17px;height:11px;border-radius:2px;overflow:hidden;}
.fg{flex:1;background:#007a5e;}.fr{flex:1;background:#ce1126;}.fy{flex:1;background:#fcd116;}
.flag-wrap{display:flex;align-items:center;gap:5px;color:#b7e4c7;font-weight:600;}
.topbar-r{display:flex;gap:11px;}
.topbar-r span{cursor:pointer;transition:color .2s;}.topbar-r span:hover{color:#b7e4c7;}

/* NAVBAR · parent sticky via .header-sticky-stack */
.navbar{background:var(--surface);padding:0 24px;display:flex;align-items:center;gap:12px;height:64px;position:relative;z-index:1;border-bottom:1px solid var(--border);box-shadow:none;transition:height .2s ease, padding .2s ease;}
.logo-wrap{cursor:pointer;display:flex;align-items:center;gap:8px;flex-shrink:0;}
.logo-txt{font-family:'Syne',sans-serif;font-weight:800;font-size:1.6rem;letter-spacing:-1px;color:var(--ink);}
.logo-txt span{color:var(--green);}
.logo-txt sup{font-size:.5rem;background:var(--yellow);color:#0d1f14;padding:1px 4px;border-radius:3px;font-weight:800;vertical-align:super;}
.nav-search-wrap{flex:1;max-width:440px;min-width:0;position:relative;}
.nav-search{display:flex;background:var(--surface);border:1px solid var(--border);border-radius:var(--yorix-r-md);overflow:hidden;transition:border-color .2s,box-shadow .2s;box-shadow:var(--yorix-sh-sm);}
.nav-search:focus-within{border-color:var(--green-mid);box-shadow:0 0 0 2px rgba(39,168,90,.12),var(--yorix-sh-sm);}
.nav-search select{border:none;border-right:1px solid var(--border);background:var(--surface2);padding:8px 7px;font-family:'DM Sans',sans-serif;font-size:.74rem;color:var(--gray);outline:none;min-width:86px;}
.nav-search input{flex:1;min-width:0;border:none;background:transparent;padding:8px 11px;font-family:'DM Sans',sans-serif;font-size:.8rem;outline:none;color:var(--ink);}
.nav-search input::placeholder{color:${e?"rgba(181,216,188,.42)":"var(--gray)"};opacity:${e?"1":".82"};}
.nav-search button{background:var(--green);color:#fff;border:none;padding:0 12px;cursor:pointer;font-size:.95rem;transition:filter .15s;}
.nav-search button:hover{filter:brightness(1.05);}
.nav-search-dd{position:absolute;top:calc(100% + 5px);left:0;right:0;background:var(--surface);border:1px solid var(--border);border-radius:var(--yorix-r-md);box-shadow:var(--yorix-sh-md);z-index:560;max-height:min(320px,52vh);overflow-y:auto;margin:0;padding:6px;display:flex;flex-direction:column;gap:3px;}
.nav-search-dd-item{display:flex;align-items:center;gap:10px;padding:9px 10px;cursor:pointer;border:none;background:transparent;width:100%;text-align:left;font-family:'DM Sans',sans-serif;color:var(--ink);border-radius:var(--yorix-r-sm);transition:background .12s;font-size:.81rem;line-height:1.35;}
.nav-search-dd-item:hover,.nav-search-dd-item:focus-visible{background:var(--surface2);outline:none;}
.nav-search-dd-img{width:38px;height:38px;border-radius:var(--yorix-r-sm);object-fit:cover;flex-shrink:0;background:var(--surface2);}
.nav-search-dd-ph{display:flex;align-items:center;justify-content:center;font-size:1.05rem;opacity:.55;}
.nav-search-dd-t{font-weight:600;color:var(--ink);font-size:.8rem;}
.nav-search-dd-p{color:var(--gray);font-size:.72rem;margin-top:1px;}
.nav-search-dd-empty{padding:13px;color:var(--gray);font-size:.8rem;text-align:center;line-height:1.45;}
.nav-cta-onboard{background:linear-gradient(135deg,var(--green),#155a31);color:#fff;border:none;padding:7px 13px;border-radius:var(--yorix-r-sm);font-family:'Syne',sans-serif;font-weight:700;font-size:.73rem;cursor:pointer;white-space:nowrap;box-shadow:var(--yorix-sh-sm);transition:transform .15s,filter .15s;}
.nav-cta-onboard:hover{filter:brightness(1.06);transform:translateY(-1px);}
.nav-actions{display:flex;align-items:center;gap:8px;margin-left:auto;}
.btn-ghost{border:1.5px solid var(--border);background:transparent;color:var(--ink);padding:7px 13px;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:.77rem;font-weight:500;cursor:pointer;transition:all .2s;}
.btn-ghost:hover{border-color:var(--green);color:var(--green);}
.btn-green{background:var(--green);color:#fff;border:none;padding:8px 14px;border-radius:8px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.77rem;cursor:pointer;}
.btn-red{background:var(--red);color:#fff;border:none;padding:8px 14px;border-radius:8px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.77rem;cursor:pointer;}
.btn-wa{background:var(--wa);color:#fff;border:none;padding:8px 14px;border-radius:8px;font-family:'DM Sans',sans-serif;font-weight:700;font-size:.77rem;cursor:pointer;display:flex;align-items:center;gap:5px;transition:all .2s;}
.btn-wa:hover{filter:brightness(1.1);transform:translateY(-1px);}
.icon-btn{position:relative;cursor:pointer;background:var(--surface2);border:1.5px solid var(--border);width:38px;height:38px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1rem;transition:all .2s;}
.icon-btn:hover{border-color:var(--green);}
.ibadge{position:absolute;top:-4px;right:-4px;background:var(--red);color:#fff;border-radius:50%;width:16px;height:16px;font-size:.55rem;font-weight:700;display:flex;align-items:center;justify-content:center;}
.dark-toggle{background:var(--surface2);border:1.5px solid var(--border);width:38px;height:38px;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1rem;}
.user-av{width:34px;height:34px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-size:.78rem;font-weight:700;cursor:pointer;border:2px solid var(--green-pale);}
.role-chip{padding:3px 9px;border-radius:50px;font-size:.64rem;font-weight:700;border:none;cursor:default;}
.chip-buyer{background:#e3f2fd;color:#1565c0;}
.chip-seller{background:var(--green-pale);color:var(--green);}
.chip-delivery{background:#fff3cd;color:#856404;}
.chip-provider{background:#ede7f6;color:#6a1b9a;}
.chip-admin{background:#fef3c7;color:#92400e;}

/* CLUSTER HEADER STICKY (topbar → navbar → onglets → bande paiement) */
.header-sticky-stack{position:sticky;top:0;z-index:440;background:var(--bg);transition:box-shadow .2s ease;}
.header-sticky-stack--compact{box-shadow:0 10px 36px rgba(0,0,0,.07);}
@media (max-width:900px){
.header-sticky-stack--compact .topbar{display:none!important;}
.header-sticky-stack--compact .navbar{height:56px!important;}
.header-sticky-stack--compact .pay-strip{padding-block:5px;font-size:.65rem!important;}
}

/* TABS PREMIUM + menu rapide */
.nav-tabs-row{display:flex;align-items:center;gap:10px;background:var(--green);padding:0 16px 0 24px;flex-wrap:nowrap;}
.nav-tabs{flex:1;min-width:0;display:flex;padding:0;overflow-x:auto;scrollbar-width:none;scroll-snap-type:x proximity;}
.nav-tabs::-webkit-scrollbar{display:none;}
.tab{scroll-snap-align:start;color:rgba(255,255,255,.65);padding:10px 14px;font-size:.77rem;font-weight:500;cursor:pointer;border-bottom:2px solid transparent;white-space:nowrap;transition:all .18s;font-family:'DM Sans',sans-serif;}
.tab:hover{color:#fff;}.tab.active{color:var(--yellow);border-bottom-color:var(--yellow);}
.nav-quick-wrap{flex-shrink:0;position:relative;}
.nav-quick-btn{display:inline-flex;align-items:center;gap:6px;border:none;background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.22);padding:8px 12px;border-radius:10px;font-size:.71rem;font-weight:700;cursor:pointer;font-family:'Syne',sans-serif;}
.nav-quick-btn:hover{background:rgba(255,255,255,.22);}
.nav-quick-panel{position:absolute;top:calc(100% + 6px);right:0;background:var(--surface);border-radius:16px;border:1px solid var(--border);box-shadow:0 20px 48px rgba(0,0,0,.14);width:min(720px,calc(100vw - 24px));z-index:505;padding:18px;display:grid;gap:0;}
.nav-quick-panel[hidden]{display:none!important;}
.nav-quick-mega-cols{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;}
@media (max-width:720px){.nav-quick-mega-cols{grid-template-columns:1fr;}}
.nav-quick-section{border-right:1px solid var(--border);padding-right:12px;margin-right:-2px;}
.nav-quick-section:last-child{border-right:none;padding-right:0;}
@media (max-width:720px){.nav-quick-section{border-right:none;padding-right:0;border-bottom:1px solid var(--border);padding-bottom:12px;margin-bottom:10px;}
.nav-quick-section:last-child{border-bottom:none;padding-bottom:0;margin-bottom:0;}}
.nav-quick-section h4{font-family:'Syne',sans-serif;font-size:.62rem;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--green);margin:0 0 10px;display:flex;align-items:center;gap:6px;}
.nav-quick-links{display:flex;flex-direction:column;gap:4px;}
.nav-quick-links button{border:none;text-align:left;background:var(--surface2);color:var(--ink);padding:9px 10px;border-radius:10px;font-size:.75rem;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:background .18s,color .18s,border-color .18s;display:flex;align-items:flex-start;gap:8px;line-height:1.35;border:1px solid transparent;}
.nav-quick-links button:hover{background:var(--green-pale);color:var(--green);border-color:rgba(39,168,90,.35);}
.nav-quick-ico{font-size:1.05rem;line-height:1;flex-shrink:0;}

.admin-quick-pill{background:linear-gradient(135deg,#0d1f14,var(--green));color:#fff;border:none;padding:11px 16px;border-radius:50px;font-size:.74rem;font-weight:800;font-family:'Syne',sans-serif;cursor:pointer;box-shadow:0 8px 24px rgba(26,107,58,.38);transition:transform .15s;display:flex;align-items:center;gap:6px;white-space:nowrap;}
.admin-quick-pill:hover{transform:translateY(-2px);}
.yorix-fab-stack .admin-quick-pill{position:relative;right:auto;bottom:auto;}


/* PAY STRIP */
.pay-strip{background:var(--surface2);border-bottom:1px solid var(--border);padding:6px 24px;display:flex;align-items:center;gap:14px;font-size:.7rem;color:var(--gray);}
.pay-methods{display:flex;gap:5px;}
.pm{background:var(--surface);border:1px solid var(--border);border-radius:5px;padding:2px 7px;font-weight:600;font-size:.67rem;}
.mtn-b{background:#1a1a1a;color:#ffcc00;border-color:#1a1a1a;}.ora-b{color:#ff6600;}
.strip-right{margin-left:auto;display:flex;gap:12px;}

/* HERO */
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
.sbtn{width:100%;background:var(--green);color:#fff;border:none;padding:10px;border-radius:9px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.82rem;cursor:pointer;margin-bottom:8px;}
.pop-row{display:flex;flex-wrap:wrap;gap:5px;align-items:center;}
.pop-lbl{font-size:.67rem;color:rgba(255,255,255,.38);}
.pop-tag{background:rgba(255,255,255,.07);color:rgba(255,255,255,.65);border:1px solid rgba(255,255,255,.13);padding:2px 8px;border-radius:50px;font-size:.67rem;cursor:pointer;}
.pop-tag:hover{background:rgba(255,255,255,.15);color:#fff;}

/* SECTIONS */
.sec{max-width:1200px;margin:0 auto;padding:28px 24px;}
.sec-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:17px;}
.sec-title{font-family:'Syne',sans-serif;font-size:clamp(1.12rem,2.1vw,1.34rem);font-weight:800;color:var(--ink);letter-spacing:-.45px;line-height:1.15;}
.card,.yorix-ds-surface{background:var(--surface);border:1px solid var(--border);border-radius:var(--yorix-r-lg);box-shadow:var(--yorix-sh-sm);}
.yorix-ds-lead{color:var(--gray);font-size:.88rem;line-height:1.65;margin-bottom:16px;max-width:56ch;}
.yorix-ds-tight{margin-bottom:6px;}
.yorix-ds-inline-banner{margin-bottom:14px;padding:12px 14px;border-radius:var(--yorix-r-md);background:var(--surface2);border:1px solid var(--border);font-size:.86rem;line-height:1.45;}
.yorix-ds-inset-panel{background:var(--surface2);border-radius:var(--yorix-r-md);padding:13px;margin-bottom:16px;text-align:left;font-size:.84rem;border:1px solid var(--border);}
.yorix-ds-stack{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;}
.yorix-ds-kvrow{display:flex;justify-content:space-between;gap:10px;margin-bottom:8px;font-size:inherit;}
.yorix-ds-kvrow:last-child{margin-bottom:0;}
.yorix-page-flow{padding-bottom:32px;}
.yorix-catalog-head{align-items:flex-start;}
.yorix-catalog-meta{font-size:.8rem;color:var(--gray);white-space:nowrap;}
.yorix-pill-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px;}
.yorix-pill{border:1px solid var(--border);background:var(--surface);color:var(--ink);padding:6px 14px;border-radius:50px;font:600 .73rem 'DM Sans',sans-serif;cursor:pointer;transition:background .18s,color .18s,border-color .18s,box-shadow .18s;}
.yorix-pill:hover{border-color:var(--green-mid);}
.yorix-pill.is-active{background:var(--green);border-color:var(--green);color:#fff;box-shadow:0 6px 16px rgba(26,107,58,.22);}
.yorix-pill--ghost{font-size:.72rem;padding:5px 12px;background:transparent;}
.yorix-sec-toolbar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
.yorix-sec-toolbar-end{display:flex;align-items:center;gap:8px;margin-left:auto;}
.sec-link{font-size:.75rem;color:var(--green);font-weight:600;cursor:pointer;border-bottom:1px solid var(--green-light);}

/* PRODUITS */
.prod-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;}
.prod-card{background:var(--surface);border-radius:12px;overflow:hidden;cursor:pointer;transition:all .25s;border:1px solid var(--border);display:flex;flex-direction:column;}
.prod-card:hover{transform:translateY(-4px);box-shadow:0 10px 28px rgba(26,107,58,.12);}
.prod-img-wrap{position:relative;width:100%;height:160px;background:var(--surface2);overflow:hidden;flex-shrink:0;}
.prod-img-wrap img{width:100%;height:100%;object-fit:cover;}
.prod-img-placeholder{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;}
.pbadge-r{position:absolute;top:7px;left:7px;background:var(--red);color:#fff;font-size:.58rem;font-weight:700;padding:2px 6px;border-radius:50px;z-index:1;}
.pbadge-y{position:absolute;top:7px;right:7px;background:var(--yellow);color:#0d1f14;font-size:.58rem;font-weight:700;padding:2px 6px;border-radius:50px;z-index:1;}
.escrow-badge{position:absolute;bottom:6px;left:6px;background:var(--green);color:#fff;font-size:.55rem;font-weight:700;padding:2px 5px;border-radius:50px;z-index:1;}
.wish-btn{position:absolute;bottom:6px;right:6px;width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.9);border:none;cursor:pointer;font-size:.8rem;display:flex;align-items:center;justify-content:center;z-index:1;transition:transform .2s;}
.wish-btn:hover{transform:scale(1.15);}
.prod-info{padding:11px;display:flex;flex-direction:column;gap:5px;flex:1;}
.prod-name{font-size:.8rem;font-weight:600;color:var(--ink);line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.prod-loc{font-size:.65rem;color:var(--gray);}
.prod-desc{font-size:.7rem;color:var(--gray);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;line-height:1.5;}
.prod-stock{font-size:.65rem;font-weight:600;}
.stock-ok{color:var(--green);}
.stock-low{color:#e67e22;}
.stock-out{color:var(--red);}
.prod-rating{display:flex;align-items:center;gap:4px;}
.stars-display{display:flex;gap:1px;}
.star{font-size:.7rem;}.star.filled{color:var(--gold);}.star.empty{color:var(--border);}
.rcount{font-size:.63rem;color:var(--gray);}
.prod-price-row{display:flex;align-items:center;justify-content:space-between;margin-top:auto;}
.price{font-family:'Syne',sans-serif;font-size:.95rem;font-weight:700;color:var(--green);}
.price-unit{font-size:.62rem;color:var(--gray);font-family:'DM Sans',sans-serif;font-weight:400;}
.add-btn{background:var(--green);color:#fff;border:none;width:26px;height:26px;border-radius:6px;font-size:.95rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s;}
.add-btn:hover{background:#0f4a28;}
.prod-actions{display:flex;gap:5px;margin-top:6px;}
.btn-wa-sm{background:var(--wa);color:#fff;border:none;padding:6px 9px;border-radius:7px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.68rem;cursor:pointer;display:flex;align-items:center;gap:4px;flex:1;justify-content:center;transition:all .2s;}
.btn-wa-sm:hover{filter:brightness(1.1);}
.btn-cmd-sm{background:var(--green);color:#fff;border:none;padding:6px 9px;border-radius:7px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.68rem;cursor:pointer;flex:1;display:flex;align-items:center;justify-content:center;gap:4px;transition:all .2s;}
.btn-cmd-sm:hover{background:#0f4a28;}

/* GALERIE IMAGES */
.img-gallery{display:flex;gap:6px;overflow-x:auto;padding:8px 0;scrollbar-width:thin;}
.img-gallery::-webkit-scrollbar{height:4px;}
.img-gallery-thumb{width:70px;height:70px;border-radius:7px;object-fit:cover;cursor:pointer;border:2px solid transparent;transition:border-color .2s;flex-shrink:0;}
.img-gallery-thumb.active{border-color:var(--green);}
.img-main{width:100%;height:200px;object-fit:cover;border-radius:10px;}

/* LOADING / EMPTY */
.loading{display:flex;align-items:center;justify-content:center;padding:48px;color:var(--gray);gap:10px;font-size:.9rem;}
.spinner{width:28px;height:28px;border:3px solid var(--border);border-top-color:var(--green);border-radius:50%;animation:spin .7s linear infinite;}
@keyframes spin{to{transform:rotate(360deg);}}
.empty-state{text-align:center;padding:48px;color:var(--gray);}
.empty-icon{font-size:3rem;margin-bottom:12px;}

/* MODALS */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:2000;display:flex;align-items:center;justify-content:center;padding:16px;}
.modal{background:var(--surface);border-radius:16px;padding:24px;width:100%;max-width:480px;position:relative;border:1px solid var(--border);max-height:92vh;overflow-y:auto;}
.modal-lg{max-width:640px;}
.modal-close{position:absolute;top:12px;right:12px;background:var(--surface2);border:none;width:28px;height:28px;border-radius:7px;cursor:pointer;font-size:.9rem;display:flex;align-items:center;justify-content:center;color:var(--gray);}
.modal-title{font-family:'Syne',sans-serif;font-size:1.2rem;font-weight:800;color:var(--ink);margin-bottom:3px;letter-spacing:-.5px;}
.modal-sub{font-size:.79rem;color:var(--gray);margin-bottom:18px;}

/* AUTH */
.auth-tabs{display:flex;background:var(--surface2);border-radius:8px;padding:3px;margin-bottom:16px;}
.auth-tab{flex:1;padding:7px;border-radius:6px;border:none;background:transparent;font-family:'DM Sans',sans-serif;font-size:.79rem;font-weight:500;cursor:pointer;color:var(--gray);}
.auth-tab.active{background:var(--surface);color:var(--ink);font-weight:600;box-shadow:0 1px 4px var(--shadow);}
.role-selector{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:15px;}
.role-card{border:2px solid var(--border);border-radius:10px;padding:12px;cursor:pointer;transition:all .2s;text-align:center;background:var(--surface);}
.role-card:hover{border-color:var(--green-mid);}
.role-card.selected{border-color:var(--green);background:var(--green-pale);}
.role-card .rc-icon{font-size:1.6rem;margin-bottom:5px;}
.role-card h4{font-size:.82rem;font-weight:600;color:var(--ink);}
.role-card p{font-size:.69rem;color:var(--gray);margin-top:2px;}

/* FORMS */
.form-group{display:flex;flex-direction:column;gap:4px;margin-bottom:11px;}
.form-label{font-size:.73rem;font-weight:600;color:var(--ink);}
.form-label span{color:var(--red);margin-left:2px;}
.form-input,.form-select{border:1.5px solid var(--border);border-radius:8px;padding:9px 10px;font-family:'DM Sans',sans-serif;font-size:.81rem;color:var(--ink);outline:none;transition:border-color .2s;background:var(--surface);width:100%;}
.form-input:focus,.form-select:focus{border-color:var(--green);}
.form-input.error,.form-select.error{border-color:var(--red);}
.form-textarea{border:1.5px solid var(--border);border-radius:8px;padding:9px 10px;font-family:'DM Sans',sans-serif;font-size:.81rem;color:var(--ink);outline:none;transition:border-color .2s;background:var(--surface);resize:vertical;min-height:80px;width:100%;}
.form-textarea:focus{border-color:var(--green);}
.form-error-text{font-size:.68rem;color:var(--red);margin-top:2px;}
.form-submit{width:100%;background:var(--green);color:#fff;border:none;padding:11px;border-radius:9px;font-family:'Syne',sans-serif;font-weight:700;font-size:.85rem;cursor:pointer;transition:all .2s;margin-top:5px;display:flex;align-items:center;justify-content:center;gap:7px;}
.form-submit:hover:not(:disabled){background:#0f4a28;}
.form-submit:disabled{opacity:.55;cursor:not-allowed;}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-bottom:0;}
.form-group.full{grid-column:1/-1;}
.divider{display:flex;align-items:center;gap:8px;margin:11px 0;color:var(--gray);font-size:.72rem;}
.divider::before,.divider::after{content:'';flex:1;height:1px;background:var(--border);}
.social-btn{width:100%;background:var(--surface2);border:1.5px solid var(--border);border-radius:8px;padding:9px;font-family:'DM Sans',sans-serif;font-size:.79rem;cursor:pointer;color:var(--ink);display:flex;align-items:center;justify-content:center;gap:7px;}
.success-msg{background:var(--green-pale);border:1px solid #c0ecd0;border-radius:10px;padding:12px 14px;color:var(--green);font-weight:600;font-size:.82rem;margin-bottom:12px;display:flex;align-items:center;gap:8px;}
.error-msg{background:#f8d7da;border:1px solid #f5c6cb;border-radius:10px;padding:12px 14px;color:#721c24;font-size:.8rem;margin-bottom:12px;display:flex;align-items:center;gap:8px;}
.info-msg{background:#e3f2fd;border:1px solid #bbdefb;border-radius:10px;padding:12px 14px;color:#1565c0;font-size:.8rem;margin-bottom:12px;}

/* IMG UPLOAD MULTI */
.img-upload-area{border:2px dashed var(--border);border-radius:9px;padding:18px;text-align:center;cursor:pointer;transition:all .2s;}
.img-upload-area:hover{border-color:var(--green);background:var(--green-pale);}
.img-upload-area.dragover{border-color:var(--green-mid);background:var(--green-pale);}
.img-upload-icon{font-size:2rem;margin-bottom:6px;}
.img-upload-text{font-size:.79rem;color:var(--gray);}
.img-upload-hint{font-size:.69rem;color:var(--gray);margin-top:3px;opacity:.7;}
.img-previews{display:flex;flex-wrap:wrap;gap:7px;margin-top:10px;}
.img-preview-item{position:relative;width:70px;height:70px;}
.img-preview-item img{width:100%;height:100%;object-fit:cover;border-radius:7px;border:1.5px solid var(--border);}
.img-preview-del{position:absolute;top:-5px;right:-5px;width:18px;height:18px;background:var(--red);color:#fff;border:none;border-radius:50%;cursor:pointer;font-size:.65rem;display:flex;align-items:center;justify-content:center;font-weight:700;}
.upload-progress{background:var(--surface2);border-radius:50px;height:6px;margin-top:8px;overflow:hidden;}
.upload-progress-bar{background:var(--green);height:100%;border-radius:50px;transition:width .3s;}

/* TRUST */
.trust{background:${e?"#0a1410":"#0d1f14"};padding:18px 24px;}
.trust-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:11px;}
.ti{display:flex;align-items:center;gap:10px;color:rgba(255,255,255,.7);}
.ti-icon{font-size:1.6rem;}.ti h4{font-size:.78rem;font-weight:600;color:#fff;margin-bottom:1px;}.ti p{font-size:.66rem;opacity:.42;}

/* DASHBOARD */
.dash-layout{display:grid;grid-template-columns:220px 1fr;gap:0;min-height:75vh;max-width:1200px;margin:22px auto;padding:0 24px;}
.dash-sidebar{background:var(--surface);border-radius:13px;padding:18px;border:1px solid var(--border);height:fit-content;position:sticky;top:88px;overflow:hidden;min-width:0;}
.dash-avatar{width:60px;height:60px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.8rem;margin:0 auto 8px;}
.dash-name{font-family:'Syne',sans-serif;font-weight:800;font-size:.92rem;text-align:center;color:var(--ink);margin-bottom:4px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 4px;}
.dash-role-badge{text-align:center;margin-bottom:14px;}
.dash-nav{display:flex;flex-direction:column;gap:2px;}
.dash-nav-item{display:flex;align-items:center;gap:7px;padding:8px 11px;border-radius:8px;cursor:pointer;font-size:.8rem;color:var(--gray);font-weight:500;transition:all .2s;}
.dash-nav-item:hover{background:var(--surface2);color:var(--ink);}
.dash-nav-item.active{background:var(--green-pale);color:var(--green);font-weight:600;}
.dash-nav-divider{height:1px;background:var(--border);margin:7px 0;}
.dash-content{padding-left:18px;}
.dash-page-title{font-family:'Syne',sans-serif;font-weight:800;font-size:1.2rem;color:var(--ink);margin-bottom:16px;letter-spacing:-.5px;display:flex;align-items:center;gap:8px;}
.dash-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:11px;margin-bottom:20px;}
.dstat{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:15px;}
.dstat-icon{font-size:1.3rem;margin-bottom:6px;}
.dstat-val{font-family:'Syne',sans-serif;font-size:1.35rem;font-weight:800;color:var(--ink);}
.dstat-lbl{font-size:.7rem;color:var(--gray);margin-top:2px;}
.dstat-trend{font-size:.66rem;color:var(--green);font-weight:600;margin-top:3px;}

/* PRODUCT FORM */
.prod-form{background:var(--surface);border:1px solid var(--border);border-radius:13px;padding:22px;margin-bottom:20px;}
.pf-title{font-family:'Syne',sans-serif;font-weight:800;font-size:.98rem;color:var(--ink);margin-bottom:16px;display:flex;align-items:center;gap:6px;}

/* ORDERS */
.order-card{background:var(--surface);border:1px solid var(--border);border-radius:11px;padding:14px 16px;margin-bottom:10px;display:flex;align-items:center;gap:14px;}
.oc-icon{width:42px;height:42px;background:var(--surface2);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;}
.oc-info{flex:1;}
.oc-name{font-size:.84rem;font-weight:600;color:var(--ink);margin-bottom:2px;}
.oc-meta{font-size:.7rem;color:var(--gray);line-height:1.6;}
.oc-actions{display:flex;flex-direction:column;gap:5px;align-items:flex-end;}
.status-badge{padding:3px 8px;border-radius:50px;font-size:.64rem;font-weight:700;white-space:nowrap;}
.s-pending{background:#fff3cd;color:#856404;}
.s-paid{background:#d4edda;color:#1a6b3a;}
.s-shipped{background:#cce5ff;color:#004085;}
.s-delivered,.s-livre{background:#d4edda;color:#1a6b3a;}
.s-dispute,.s-echec{background:#f8d7da;color:#721c24;}
.s-cancelled{background:#e2e3e5;color:#383d41;}
.s-securise{background:#ede7f6;color:#6a1b9a;}
.s-libere{background:#d4edda;color:#1a6b3a;}
.s-rembourse{background:#cce5ff;color:#004085;}
.s-en_cours{background:#fff3cd;color:#856404;}
.btn-action-sm{background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:4px 10px;font-size:.69rem;cursor:pointer;color:var(--ink);font-family:'DM Sans',sans-serif;font-weight:500;transition:all .2s;}
.btn-action-sm:hover{background:var(--green-pale);border-color:var(--green);color:var(--green);}

/* AVIS */
.avis-section{margin-top:20px;}
.avis-card{background:var(--surface2);border-radius:10px;padding:13px;margin-bottom:8px;}
.avis-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:5px;}
.avis-auteur{font-size:.8rem;font-weight:600;color:var(--ink);}
.avis-date{font-size:.67rem;color:var(--gray);}
.avis-texte{font-size:.78rem;color:var(--gray);line-height:1.6;}
.star-input{display:flex;gap:3px;cursor:pointer;}
.star-input span{font-size:1.3rem;transition:transform .15s;}
.star-input span:hover{transform:scale(1.2);}

/* COMMISSION */
.commission-box{background:var(--green-pale);border:1px solid var(--green-light);border-radius:9px;padding:11px 14px;font-size:.77rem;color:var(--green);display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}
.commission-box strong{font-family:'Syne',sans-serif;}

/* CART */
/* ═══ CART AMAZON STYLE ═══ */
.cart-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:350;opacity:0;pointer-events:none;transition:opacity .3s;backdrop-filter:blur(2px);}
.cart-overlay.open{opacity:1;pointer-events:all;}
.cart-drawer{position:fixed;top:0;right:0;width:min(440px,100vw);height:100vh;background:var(--bg);z-index:351;transform:translateX(100%);transition:transform .4s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;box-shadow:-8px 0 32px rgba(0,0,0,.2);}
.cart-drawer.open{transform:none;}

/* Header */
.cart-header{background:linear-gradient(135deg,var(--green),#0f4a28);padding:16px 20px;color:#fff;display:flex;align-items:center;justify-content:space-between;box-shadow:0 2px 12px rgba(0,0,0,.1);}
.cart-header-left{display:flex;align-items:center;gap:10px;}
.cart-header-icon{width:38px;height:38px;background:rgba(255,255,255,.15);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;}
.cart-title{font-family:'Syne',sans-serif;font-weight:800;font-size:1rem;color:#fff;margin:0;}
.cart-subtitle{font-size:.68rem;color:rgba(255,255,255,.75);margin-top:1px;}
.cart-close{background:rgba(255,255,255,.15);border:none;width:32px;height:32px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1rem;transition:background .2s;}
.cart-close:hover{background:rgba(255,255,255,.25);}

/* Trust bar */
.cart-trust-bar{background:var(--green-pale);padding:8px 16px;display:flex;align-items:center;gap:8px;font-size:.7rem;color:var(--green);font-weight:600;border-bottom:1px solid var(--border);}
.cart-trust-bar span{flex:1;text-align:center;}

/* Empty state */
.cart-empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:40px 30px;text-align:center;}
.cart-empty-icon{font-size:4rem;opacity:.4;}
.cart-empty-title{font-family:'Syne',sans-serif;font-weight:800;font-size:1.05rem;color:var(--ink);}
.cart-empty-sub{font-size:.8rem;color:var(--gray);line-height:1.6;max-width:260px;}
.cart-empty-btn{background:var(--green);color:#fff;border:none;padding:11px 24px;border-radius:9px;font-family:'Syne',sans-serif;font-weight:700;font-size:.82rem;cursor:pointer;margin-top:6px;transition:all .2s;}
.cart-empty-btn:hover{background:#0f4a28;transform:translateY(-1px);}

/* Items list */
.cart-items{flex:1;overflow-y:auto;padding:12px 16px;background:var(--surface2);}
.cart-items::-webkit-scrollbar{width:6px;}
.cart-items::-webkit-scrollbar-track{background:transparent;}
.cart-items::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px;}

/* Item card */
.cart-item{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:10px;display:flex;gap:12px;position:relative;transition:all .2s;}
.cart-item:hover{border-color:var(--green-light);box-shadow:0 3px 12px rgba(26,107,58,.08);}

.ci-img{width:78px;height:78px;background:var(--surface2);border-radius:10px;flex-shrink:0;overflow:hidden;border:1px solid var(--border);}
.ci-img img{width:100%;height:100%;object-fit:cover;}
.ci-img-placeholder{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2rem;opacity:.4;}

.ci-info{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px;}
.ci-name{font-size:.82rem;font-weight:700;color:var(--ink);line-height:1.35;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.ci-vendeur{font-size:.67rem;color:var(--gray);display:flex;align-items:center;gap:4px;}
.ci-vendeur strong{color:var(--green);font-weight:600;}
.ci-meta{display:flex;flex-wrap:wrap;gap:4px;margin-top:2px;}
.ci-tag{background:var(--surface2);border:1px solid var(--border);padding:2px 6px;border-radius:4px;font-size:.6rem;color:var(--gray);font-weight:500;}
.ci-tag-stock-ok{background:#e6fff0;color:#1a6b3a;border-color:#b7e4c7;}
.ci-tag-stock-low{background:#fff3cd;color:#856404;border-color:#ffe8a1;}
.ci-tag-stock-out{background:#f8d7da;color:#721c24;border-color:#f5c6cb;}

.ci-bottom{display:flex;align-items:center;justify-content:space-between;margin-top:6px;gap:8px;}
.ci-price-block{display:flex;flex-direction:column;}
.ci-unit-price{font-size:.62rem;color:var(--gray);}
.ci-total-price{font-family:'Syne',sans-serif;font-size:1rem;font-weight:800;color:var(--green);line-height:1;}

.ci-qty{display:flex;align-items:center;gap:0;background:var(--surface2);border:1px solid var(--border);border-radius:8px;overflow:hidden;}
.qty-btn{width:26px;height:26px;background:transparent;border:none;cursor:pointer;font-size:.95rem;display:flex;align-items:center;justify-content:center;color:var(--ink);font-weight:700;transition:background .15s;}
.qty-btn:hover{background:var(--green-pale);color:var(--green);}
.qty-val{font-size:.78rem;font-weight:700;min-width:24px;text-align:center;color:var(--ink);padding:0 2px;}

.ci-del{position:absolute;top:8px;right:8px;background:transparent;border:none;cursor:pointer;font-size:.9rem;color:var(--gray);width:22px;height:22px;border-radius:5px;display:flex;align-items:center;justify-content:center;transition:all .2s;}
.ci-del:hover{background:#f8d7da;color:var(--red);}

/* Footer */
.cart-footer{background:var(--surface);border-top:2px solid var(--border);padding:14px 18px;box-shadow:0 -4px 16px rgba(0,0,0,.06);}

.cart-promo-row{background:var(--green-pale);border:1px dashed var(--green-light);border-radius:9px;padding:8px 12px;margin-bottom:10px;display:flex;align-items:center;gap:8px;font-size:.73rem;color:var(--green);font-weight:600;}
.cart-promo-row strong{font-family:'Syne',sans-serif;}

.cart-summary{margin-bottom:10px;}
.cart-total-row{display:flex;justify-content:space-between;padding:4px 0;font-size:.82rem;color:var(--gray);}
.cart-total-row strong{color:var(--ink);font-weight:600;}
.cart-total-row.discount strong{color:var(--green);}
.cart-divider{height:1px;background:var(--border);margin:6px 0;}
.cart-total-row.grand{font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:800;color:var(--ink);padding:6px 0 2px;}
.cart-total-row.grand strong{color:var(--green);font-size:1.15rem;}
.cart-savings{font-size:.68rem;color:var(--green);font-weight:600;text-align:right;margin-top:-2px;}

/* Payment methods */
.cart-payment-section{margin-top:10px;padding-top:10px;border-top:1px dashed var(--border);}
.cart-payment-title{font-family:'Syne',sans-serif;font-weight:700;font-size:.78rem;color:var(--ink);margin-bottom:8px;display:flex;align-items:center;gap:6px;}
.cart-payment-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;}
.cart-pay-btn{background:var(--surface2);border:1.5px solid var(--border);border-radius:9px;padding:10px 8px;cursor:pointer;text-align:center;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:4px;font-family:'DM Sans',sans-serif;}
.cart-pay-btn:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,.08);}
.cart-pay-btn.momo{border-color:#ffcc00;background:linear-gradient(135deg,#fffbe6,#fff3b0);}
.cart-pay-btn.momo:hover{background:linear-gradient(135deg,#fff3b0,#ffe066);}
.cart-pay-btn.orange{border-color:#ff6600;background:linear-gradient(135deg,#fff4e6,#ffd9b3);}
.cart-pay-btn.orange:hover{background:linear-gradient(135deg,#ffd9b3,#ffbf80);}
.cart-pay-icon{font-size:1.3rem;}
.cart-pay-label{font-size:.68rem;font-weight:700;color:#1a1a1a;}
.cart-pay-number{font-size:.64rem;color:#444;font-weight:600;}

.cart-wa-confirm{width:100%;background:linear-gradient(135deg,var(--wa),#1ebe5d);color:#fff;border:none;padding:13px;border-radius:10px;font-family:'Syne',sans-serif;font-weight:800;font-size:.85rem;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .2s;box-shadow:0 4px 14px rgba(37,211,102,.3);}
.cart-wa-confirm:hover{transform:translateY(-1px);box-shadow:0 6px 18px rgba(37,211,102,.4);}

.cart-info-text{font-size:.67rem;color:var(--gray);text-align:center;margin-top:8px;line-height:1.5;}
.cart-info-text strong{color:var(--green);}

/* Cart Page Premium */
.cart-page-wrap{max-width:1280px;}
.cart-page-head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:16px;flex-wrap:wrap;}
.cart-page-sub{font-size:.84rem;color:var(--gray);margin-top:4px;}
.cart-page-empty{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:42px 22px;text-align:center;}
.cart-page-grid{display:grid;grid-template-columns:1.5fr .8fr;gap:16px;align-items:start;}
.cart-page-main{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:14px;}
.cart-page-trust{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;}
.cart-page-trust span{background:var(--surface2);border:1px solid var(--border);padding:5px 10px;border-radius:50px;font-size:.7rem;color:var(--gray);font-weight:600;}
.cart-page-item{display:flex;gap:12px;border:1px solid var(--border);background:var(--surface2);border-radius:12px;padding:10px;margin-bottom:10px;}
.cart-page-thumb{width:96px;height:96px;border-radius:10px;overflow:hidden;flex-shrink:0;background:var(--surface);}
.cart-page-content{flex:1;min-width:0;}
.cart-page-title{font-family:'Syne',sans-serif;font-size:.93rem;font-weight:700;color:var(--ink);}
.cart-page-meta{display:flex;gap:5px;flex-wrap:wrap;margin:5px 0;}
.cart-page-line{display:flex;align-items:center;justify-content:space-between;gap:8px;}
.cart-page-actions{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:8px;}
.cart-page-summary{position:sticky;top:96px;background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:14px;}
.cart-page-summary h3{font-family:'Syne',sans-serif;font-size:1rem;font-weight:800;color:var(--ink);margin-bottom:8px;}
.cart-page-reco{margin-top:24px;}

/* Livraison offerte au seuil — UX conversion */
.fs-ship-banner{border-radius:14px;padding:14px 16px;margin-bottom:14px;border:1px solid var(--border);background:linear-gradient(135deg,var(--surface),var(--surface2));box-shadow:0 2px 12px rgba(0,0,0,.045);}
.fs-ship-banner--compact{padding:11px 12px;}
.fs-ship-banner--muted{border-style:dashed;opacity:.95;}
.fs-ship-banner--chase{border-color:rgba(253,209,116,.95);background:linear-gradient(135deg,#fff9e9,#fef6ff);}
.fs-ship-banner--won{border-color:rgba(46,167,107,.65);background:linear-gradient(135deg,#eafaf1,#f3fff9);}
.fs-ship-banner-top{display:flex;flex-direction:column;gap:3px;margin-bottom:8px;}
.fs-ship-eyebrow{font-size:.62rem;text-transform:uppercase;letter-spacing:.08em;font-weight:800;color:var(--gray);}
.fs-ship-eyebrow--gold{color:#946200;}
.fs-ship-micro{font-size:.62rem;color:var(--gray);line-height:1.35;}
.fs-ship-title{font-family:'Syne',sans-serif;font-size:.94rem;font-weight:800;color:var(--ink);line-height:1.35;margin-bottom:8px;}
.fs-ship-title--celebrate{margin-bottom:6px;color:#146635;}
.fs-ship-caption{font-size:.75rem;color:var(--gray);margin:0 0 6px;line-height:1.45;}
.fs-ship-track{width:100%;height:9px;background:var(--border);border-radius:99px;overflow:hidden;}
.fs-ship-fill{height:100%;border-radius:99px;background:linear-gradient(90deg,var(--gold,#fcd116),var(--green,#2eaa6b));transition:width .35s ease;}
.fs-ship-meta{font-size:.7rem;color:var(--gray);margin-top:8px;font-weight:600;}
.fs-ship-badge-live{display:inline-flex;align-items:center;gap:5px;background:linear-gradient(135deg,#fff4d8,#fde9c9);padding:6px 12px;border-radius:999px;font-size:.72rem;font-weight:800;color:#5c4200;margin-top:4px;border:1px solid rgba(253,209,116,.95);}
.fs-ship-badge{font-size:.7rem;font-weight:800;color:#146635;background:var(--green-pale);padding:5px 10px;border-radius:999px;display:inline-flex;align-items:center;gap:4px;margin-top:6px;}
.fs-reco-tip{font-size:.72rem;color:var(--gray);margin-bottom:10px;line-height:1.45;}
@media(max-width:640px){
  .fs-ship-title{font-size:.86rem;}
}

/* Checkout flow — barre de progression (Panier → Adresse → Paiement → Confirmation) */
.checkout-page-wrap{max-width:980px;margin:0 auto;}
.checkout-progress{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:14px;
  padding:12px 10px 14px;
  margin-bottom:18px;
  box-shadow:0 2px 10px rgba(0,0,0,.04);
}
.checkout-progress-list{
  list-style:none;margin:0;padding:0;display:flex;align-items:stretch;width:100%;
}
.checkout-progress-item{
  flex:1;min-width:0;display:flex;flex-direction:column;align-items:stretch;
}
.checkout-progress-cluster{
  display:flex;align-items:center;width:100%;min-width:0;
}
.checkout-progress-lead{
  flex:1;height:3px;background:var(--border);border-radius:2px;margin-right:6px;
  min-width:6px;align-self:center;
  transition:background .25s ease;
}
.checkout-progress-lead--on{
  background:linear-gradient(90deg,var(--green),#2ec27e);
}
.checkout-progress .checkout-progress-node{
  flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:5px;
  width:92px;padding:6px 4px;background:transparent;border:none;cursor:default;
  color:var(--ink);font-family:inherit;
  transition:transform .15s ease,opacity .15s ease;
  min-height:auto;min-width:0;touch-action:manipulation;
}
.checkout-progress-node:disabled{
  opacity:1;cursor:default;
}
.checkout-progress-node:not(:disabled){
  cursor:pointer;
}
.checkout-progress-node:not(:disabled):hover{
  transform:translateY(-1px);
}
.checkout-progress-node-inner{
  width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  font-size:1rem;border:2px solid var(--border);background:var(--surface2);
  transition:border-color .2s,background .2s,color .2s;
}
.checkout-progress-node--todo .checkout-progress-node-inner{color:var(--gray);opacity:.72;}
.checkout-progress-node--current .checkout-progress-node-inner{
  border-color:var(--green);background:var(--green-pale);box-shadow:0 0 0 3px rgba(79,209,125,.22);
  font-weight:800;
}
.checkout-progress-node--done .checkout-progress-node-inner{
  border-color:var(--green);background:var(--green);color:#fff;font-size:.95rem;line-height:1;
}
.checkout-progress-label{
  font-size:.69rem;font-weight:700;color:var(--gray);text-align:center;line-height:1.2;
  max-width:100%;
}
.checkout-progress-node--current .checkout-progress-label{color:var(--ink);font-weight:800;}
.checkout-progress-node--done .checkout-progress-label{color:var(--green);}
.checkout-progress-label-compact{display:none;}
.checkout-confirm-card{text-align:center;padding:8px 4px 4px;}
.checkout-confirm-icon{font-size:2.4rem;line-height:1;margin-bottom:4px;}

.card.checkout-form-card{padding:18px;border-radius:var(--yorix-r-lg);}
.checkout-step-heading{font-weight:800;font-size:.95rem;color:var(--ink);grid-column:1/-1;font-family:'Syne',sans-serif;letter-spacing:-.2px;}
.checkout-step-lead{grid-column:1/-1;font-size:.8rem;color:var(--gray);margin:-4px 0 8px;line-height:1.45;}
.checkout-step-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:12px;
  align-items:start;
}
@media(max-width:640px){
  .checkout-step-grid{grid-template-columns:1fr;}
}
.checkout-field{display:flex;flex-direction:column;gap:4px;min-width:0;}
.checkout-field-wide{grid-column:1/-1;}
.checkout-field-error{font-size:.72rem;color:#b91c1c;font-weight:600;margin-top:2px;}
.checkout-input-invalid{border-color:#b91c1c !important;box-shadow:0 0 0 1px rgba(185,28,28,.2);}
.checkout-trust-row{
  display:flex;flex-wrap:wrap;gap:8px;
  font-size:.72rem;font-weight:600;color:var(--gray);
}
.checkout-trust-row span{
  background:var(--surface2);border:1px solid var(--border);padding:6px 10px;border-radius:50px;
}
.checkout-estimate-box{
  background:var(--surface2);
  border:1px solid var(--border);
  border-radius:var(--yorix-r-md);
  padding:13px;
  box-shadow:var(--yorix-sh-sm);
}
.checkout-pay-recap{font-size:.88rem;}
.checkout-pay-recap-row{display:flex;justify-content:space-between;align-items:baseline;margin-top:4px;}
.checkout-pay-recap-row:first-of-type{margin-top:0;}
.checkout-pay-recap-total{display:flex;justify-content:space-between;margin-top:8px;padding-top:8px;border-top:1px solid var(--border);font-weight:800;font-size:.92rem;font-family:'Syne',sans-serif;}
.checkout-error-banner{color:#b91c1c;font-weight:600;font-size:.84rem;}

@media(max-width:520px){
  .checkout-progress-node{width:72px;padding:4px 2px;}
  .checkout-progress-node-inner{width:32px;height:32px;font-size:.9rem;}
  .checkout-progress-label{font-size:.62rem;}
  .checkout-progress-label-full{display:none;}
  .checkout-progress-label-compact{display:inline;}
}

@media(max-width:900px){
  .admin-layout{flex-direction:column;}
  .admin-sidebar{
    width:100%;height:auto;position:relative;
    padding:10px 0;overflow-x:auto;overflow-y:hidden;
    display:flex;flex-direction:row;align-items:center;
    white-space:nowrap;
  }
  .admin-sidebar-logo{display:none;}
  .admin-nav-item{
    flex-direction:column;gap:2px;padding:8px 14px;
    border-left:none;border-bottom:3px solid transparent;
    font-size:.68rem;min-width:72px;text-align:center;
  }
  .admin-nav-item.active{border-left:none;border-bottom-color:#4fd17d;}
  .admin-nav-item span:first-child{font-size:1.1rem;}
  .admin-content{padding:14px;}
  .admin-page-title{font-size:1.05rem;flex-wrap:wrap;}
  .stat-cards-grid{grid-template-columns:repeat(2,1fr);gap:8px;}
  .stat-card{padding:12px;}
  .stat-card-val{font-size:1.1rem;}
  .stat-card-lbl{font-size:.65rem;}
  .admin-table{font-size:.7rem;}
  .admin-table th,.admin-table td{padding:6px 7px;}
  .admin-filter-row{gap:6px;}
  .admin-search{font-size:.72rem;padding:6px 9px;}
  .admin-action-btn{padding:3px 6px;font-size:.62rem;}
  .admin-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;}
}
@media(max-width:500px){
  .stat-cards-grid{grid-template-columns:1fr;}
  .admin-content{padding:10px;}
}
/* Navbar mobile optimisée */
  .navbar{padding:0 10px;gap:6px;height:54px;}
  .logo-txt{font-size:1.2rem;}
  .logo-txt sup{display:none;}
  .nav-search{max-width:none;flex:1;}
  .nav-search select{display:none;}
  .nav-search input{padding:7px 9px;font-size:.75rem;}
  .nav-search button{padding:0 10px;font-size:.85rem;}
  .nav-actions{gap:5px;}
  .nav-actions .dark-toggle{display:none;}
  .btn-ghost,.btn-green,.btn-red{font-size:.68rem;padding:6px 8px;}
  .btn-ghost span,.btn-green span,.btn-red span{display:none;}
  .user-av{width:30px;height:30px;font-size:.72rem;}
  .role-chip{display:none;}
  .icon-btn{width:34px;height:34px;font-size:.88rem;}

/* NOTIFS — centre premium + ancien fallback */
.notif-backdrop{position:fixed;inset:0;background:rgba(15,20,18,.28);z-index:1050;backdrop-filter:blur(3px);}
.notif-drawer{position:fixed;top:clamp(72px,14vh,102px);right:12px;width:min(408px,calc(100vw - 20px));max-height:calc(100vh - 88px);display:flex;flex-direction:column;background:var(--surface);border-radius:16px;border:1px solid var(--border);box-shadow:0 16px 48px rgba(0,0,0,.14),0 4px 14px rgba(26,107,58,.08);z-index:1060;overflow:hidden;}
.notif-drawer--premium{border-radius:16px;}
.notif-hub{display:flex;flex-direction:column;height:100%;min-height:0;}
.notif-hub--dropdown{min-height:380px;max-height:inherit;}
.notif-hub--page{max-width:760px;margin:0 auto;}
.notif-hub-toolbar{padding:14px 14px 10px;border-bottom:1px solid var(--border);background:linear-gradient(180deg,var(--surface2),var(--surface));flex-shrink:0;}
.notif-hub-title-row{display:flex;align-items:center;gap:8px;}
.notif-hub-title{font-family:'Syne',sans-serif;font-weight:800;font-size:1.02rem;color:var(--ink);margin:0;letter-spacing:-.3px;}
.notif-hub-badge{background:var(--red);color:#fff;font-size:.68rem;font-weight:800;padding:2px 7px;border-radius:50px;min-width:22px;text-align:center;}
.notif-hub-actions-top{display:flex;align-items:center;gap:10px;margin-top:8px;flex-wrap:wrap;justify-content:space-between;}
.notif-hub-close{width:34px;height:34px;border-radius:8px;border:1px solid var(--border);background:var(--surface2);cursor:pointer;font-size:.9rem;line-height:1;margin-left:auto;}
.notif-link-btn{background:none;border:none;font-size:.72rem;font-weight:700;color:var(--gray);cursor:pointer;padding:4px 0;}
.notif-link-btn-strong{color:var(--green);}
.notif-filter-strip{display:flex;gap:6px;padding:10px 12px;border-bottom:1px solid var(--border);overflow-x:auto;flex-shrink:0;-webkit-overflow-scrolling:touch;}
.notif-chip{
  flex-shrink:0;border:none;border-radius:50px;padding:6px 12px;font-size:.72rem;font-weight:700;background:var(--surface2);color:var(--gray);cursor:pointer;border:1px solid var(--border);
}
.notif-chip--active{background:var(--green-pale);color:var(--green);border-color:var(--green-light);}
.notif-hub-scroll{flex:1;min-height:0;overflow-y:auto;-webkit-overflow-scrolling:touch;}
.notif-hub-scroll--drop{max-height:min(52vh,420px);}
.notif-hub-scroll--page{max-height:none;}
.notif-empty.premium{text-align:center;padding:36px 20px;color:var(--gray);}
.notif-empty-icon{font-size:2rem;margin-bottom:8px;}
.notif-empty-title{font-weight:700;font-size:.92rem;color:var(--ink);margin-bottom:6px;font-family:'Syne',sans-serif;}
.notif-empty-sub{font-size:.78rem;line-height:1.45;margin:0;}
.notif-card-list{list-style:none;margin:0;padding:8px 10px 12px;}
.notif-card-li{
  display:flex;gap:8px;align-items:stretch;background:var(--surface);border:1px solid var(--border);border-radius:12px;margin-bottom:8px;
  overflow:hidden;transition:box-shadow .18s ease,border-color .18s ease;
}
.notif-card-li:hover{box-shadow:0 4px 14px rgba(26,107,58,.06);}
.notif-card-priority-critical{border-left:4px solid #b91c1c;}
.notif-card-priority-important{border-left:4px solid #2563eb;}
.notif-card-priority-promo{border-left:4px solid #d97706;}
.notif-card-priority-standard{border-left:4px solid var(--green-light);}
.notif-card-main{
  flex:1;min-width:0;display:flex;gap:10px;padding:10px 4px 10px 10px;text-align:left;border:none;background:transparent;cursor:pointer;font:inherit;
}
.notif-card-unread{background:rgba(232,247,239,.52);}
.notif-card-avatar{width:42px;height:42px;border-radius:10px;background:var(--surface2);display:flex;align-items:center;justify-content:center;flex-shrink:0;position:relative;overflow:hidden;border:1px solid var(--border);}
.notif-card-avatar img{width:100%;height:100%;object-fit:cover;}
.notif-card-emoji{font-size:1.35rem;line-height:1;}
.notif-card-dot{position:absolute;top:5px;right:5px;width:7px;height:7px;background:var(--green);border-radius:50%;border:1.5px solid var(--surface);}
.notif-card-copy{display:flex;flex-direction:column;gap:4px;min-width:0;}
.notif-card-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;}
.notif-card-title{font-family:'Syne',sans-serif;font-weight:800;font-size:.82rem;color:var(--ink);line-height:1.25;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.notif-card-time{font-size:.64rem;color:var(--gray);white-space:nowrap;flex-shrink:0;}
.notif-card-body{font-size:.74rem;color:var(--gray);line-height:1.42;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}
.notif-card-cta-secondary{font-size:.65rem;font-weight:700;color:var(--green);}
.notif-card-side{display:flex;flex-direction:column;gap:4px;padding:8px 8px 8px 0;}
.notif-mini-btn{width:34px;height:34px;border-radius:8px;border:1px solid var(--border);background:var(--surface2);cursor:pointer;font-size:.78rem;display:flex;align-items:center;justify-content:center;}
.notif-mini-btn-del{font-size:.72rem;opacity:.75;}
.notif-hub-footer-premium{border-top:1px solid var(--border);padding:10px 12px;background:var(--surface2);flex-shrink:0;max-height:min(240px,40vh);overflow-y:auto;}
.notif-preferences-mini{display:grid;gap:6px;margin-bottom:8px;font-size:.72rem;color:var(--ink);}
.notif-preferences-title{font-weight:800;font-family:'Syne',sans-serif;font-size:.74rem;color:var(--ink);}
.notif-toggle{display:flex;align-items:center;gap:8px;font-size:.71rem;color:var(--gray);cursor:pointer;font-weight:600;}
.notif-page-wrap{padding-bottom:48px;}

/* legacy compat */
.notif-header{padding:12px 14px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.notif-title{font-family:'Syne',sans-serif;font-weight:700;font-size:.86rem;color:var(--ink);}
.notif-clear{font-size:.69rem;color:var(--green);cursor:pointer;font-weight:600;}
.notif-item{padding:10px 14px;border-bottom:1px solid var(--border);display:flex;gap:9px;cursor:pointer;transition:background .2s;}

/* PRESTATAIRES */
.prest-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}
.prest-card{background:var(--surface);border:1px solid var(--border);border-radius:11px;padding:16px;cursor:pointer;transition:all .25s;}
.prest-card:hover{transform:translateY(-3px);box-shadow:0 7px 20px rgba(26,107,58,.09);border-color:var(--green-light);}
.prest-top{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
.prest-av{width:46px;height:46px;border-radius:11px;background:var(--green-pale);display:flex;align-items:center;justify-content:center;font-size:1.4rem;}
.prest-name{font-family:'Syne',sans-serif;font-weight:700;font-size:.88rem;color:var(--ink);}
.prest-meta{font-size:.69rem;color:var(--gray);}
.prest-tags{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:9px;}
.ptag{background:var(--green-pale);color:var(--green);padding:2px 7px;border-radius:50px;font-size:.63rem;font-weight:600;}
.prest-footer{display:flex;align-items:center;justify-content:space-between;}
.prest-price{font-family:'Syne',sans-serif;font-size:.88rem;font-weight:700;color:var(--green);}
.btn-hire{background:var(--green);color:#fff;border:none;padding:5px 12px;border-radius:6px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.7rem;cursor:pointer;}

/* BLOG */
.blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}
.blog-card{background:var(--surface);border:1px solid var(--border);border-radius:11px;overflow:hidden;cursor:pointer;transition:all .25s;}
.blog-card:hover{transform:translateY(-3px);}
.blog-img{height:120px;display:flex;align-items:center;justify-content:center;font-size:3rem;background:var(--surface2);}
.blog-body{padding:13px;}
.blog-cat{font-size:.63rem;font-weight:700;color:var(--green);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px;}
.blog-title{font-family:'Syne',sans-serif;font-size:.88rem;font-weight:700;color:var(--ink);margin-bottom:4px;line-height:1.35;}
.blog-excerpt{font-size:.73rem;color:var(--gray);line-height:1.55;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.blog-footer{display:flex;align-items:center;justify-content:space-between;padding:8px 13px;border-top:1px solid var(--border);font-size:.67rem;color:var(--gray);}

/* ACADEMY */
.courses-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:11px;}
.course-card{background:var(--surface);border:1px solid var(--border);border-radius:11px;overflow:hidden;cursor:pointer;transition:all .25s;}
.course-card:hover{transform:translateY(-3px);}
.course-img{height:95px;display:flex;align-items:center;justify-content:center;font-size:2.7rem;}
.course-body{padding:12px;}
.course-level{font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px;}
.level-deb{color:#27a85a;}.level-int{color:#e67e22;}.level-adv{color:var(--red);}
.course-title{font-family:'Syne',sans-serif;font-size:.85rem;font-weight:700;color:var(--ink);margin-bottom:4px;}
.course-meta{font-size:.69rem;color:var(--gray);margin-bottom:8px;}
.course-footer{display:flex;align-items:center;justify-content:space-between;}
.course-price{font-family:'Syne',sans-serif;font-size:.88rem;font-weight:700;color:var(--green);}
.course-btn{background:var(--green);color:#fff;border:none;padding:5px 11px;border-radius:6px;font-size:.7rem;font-weight:600;cursor:pointer;}

/* ESCROW STEPS */
.escrow-steps{display:flex;flex-direction:column;gap:10px;}
.estep{display:flex;align-items:flex-start;gap:10px;}
.estep-num{width:24px;height:24px;background:var(--green);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.69rem;font-weight:700;flex-shrink:0;margin-top:1px;}
.estep-text h4{font-size:.8rem;font-weight:600;color:var(--ink);margin-bottom:2px;}
.estep-text p{font-size:.73rem;color:var(--gray);line-height:1.5;}

/* WALLET */
.wallet-card{background:linear-gradient(135deg,#1a3a24,var(--green));border-radius:14px;padding:22px;color:#fff;margin-bottom:18px;}
.wc-label{font-family:'Syne',sans-serif;font-weight:700;font-size:.95rem;margin-bottom:4px;}
.wc-amount{font-family:'Syne',sans-serif;font-size:2.2rem;font-weight:800;color:var(--yellow);}
.wc-sub{font-size:.75rem;opacity:.65;margin-top:4px;}
.info-box{background:var(--surface2);border:1.5px dashed var(--border);border-radius:11px;padding:18px;text-align:center;color:var(--gray);font-size:.82rem;}
.info-box .info-icon{font-size:1.6rem;margin-bottom:8px;}

/* REWARDS */
.rewards-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
.reward-card{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:14px;text-align:center;}
.reward-icon{font-size:1.8rem;margin-bottom:5px;}
.reward-name{font-size:.78rem;font-weight:600;color:var(--ink);margin-bottom:3px;}
.reward-pts{font-size:.71rem;color:var(--gold);font-weight:600;}
.reward-btn{background:var(--green);color:#fff;border:none;padding:5px 11px;border-radius:6px;font-family:'DM Sans',sans-serif;font-size:.71rem;font-weight:600;cursor:pointer;margin-top:8px;width:100%;}

/* BUSSINESS */
.biz-hero{background:linear-gradient(135deg,#0a1410,#1a3a24);border-radius:14px;padding:28px;margin-bottom:16px;}
.biz-title{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;color:#fff;margin-bottom:8px;}
.biz-sub{color:rgba(255,255,255,.5);font-size:.84rem;line-height:1.7;margin-bottom:16px;}
.biz-feats{display:grid;grid-template-columns:repeat(2,1fr);gap:9px;margin-top:14px;}
.biz-feat{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:9px;padding:12px;}
.biz-feat h4{font-size:.79rem;font-weight:600;color:#fff;margin-bottom:2px;}
.biz-feat p{font-size:.69rem;color:rgba(255,255,255,.4);line-height:1.5;}

/* WA + ADMIN — empilés, au-dessus de la barre mobile */
.yorix-fab-stack{position:fixed;right:max(14px,env(safe-area-inset-right));bottom:calc(100px + env(safe-area-inset-bottom));z-index:480;display:flex;flex-direction:column-reverse;align-items:flex-end;gap:11px;pointer-events:none;}
.yorix-fab-stack > *{pointer-events:auto;}
@media (min-width:901px){.yorix-fab-stack{bottom:calc(28px + env(safe-area-inset-bottom));right:max(20px,env(safe-area-inset-right));}}
.wa-float{position:relative;bottom:auto;right:auto;z-index:auto;display:flex;flex-direction:column;align-items:flex-end;gap:8px;}
.wa-btn{width:50px;height:50px;background:var(--wa);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 16px rgba(37,211,102,.4);border:none;font-size:1.5rem;transition:all .25s;position:relative;}
.wa-btn:hover{transform:scale(1.1);}
.wa-pulse{position:absolute;width:50px;height:50px;background:var(--wa);border-radius:50%;animation:waPulse 2s infinite;opacity:.3;}
@keyframes waPulse{0%{transform:scale(1);opacity:.3;}70%{transform:scale(1.65);opacity:0;}100%{opacity:0;}}
.wa-card{background:var(--surface);border-radius:12px;padding:13px;box-shadow:0 5px 22px var(--shadow);border:1px solid var(--border);min-width:220px;}
.wa-card-title{font-family:'Syne',sans-serif;font-weight:700;font-size:.82rem;color:var(--ink);margin-bottom:2px;}
.wa-card-sub{font-size:.69rem;color:var(--gray);margin-bottom:9px;}
.wa-link{display:flex;align-items:center;gap:6px;padding:8px 11px;border-radius:8px;text-decoration:none;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.77rem;transition:all .2s;margin-bottom:5px;cursor:pointer;border:none;width:100%;}
.wa-link-green{background:var(--wa);color:#fff;}
.wa-link-ghost{background:var(--surface2);color:var(--ink);border:1.5px solid var(--border);}

/* NEWSLETTER */
.newsletter{background:linear-gradient(135deg,var(--green),#27a85a);border-radius:14px;padding:26px;text-align:center;margin:0 24px 26px;}
.nl-title{font-family:'Syne',sans-serif;font-size:1.2rem;font-weight:800;color:#fff;margin-bottom:5px;}
.nl-sub{font-size:.82rem;color:rgba(255,255,255,.68);margin-bottom:16px;}
.nl-form{display:flex;max-width:380px;margin:0 auto;gap:7px;}
.nl-input{flex:1;border:none;border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:.82rem;outline:none;}
.nl-btn{background:var(--yellow);color:#0d1f14;border:none;padding:9px 16px;border-radius:8px;font-family:'Syne',sans-serif;font-weight:700;font-size:.79rem;cursor:pointer;}

/* ── ADMIN DASHBOARD ── */
.admin-layout{display:flex;min-height:100vh;gap:0;}
.admin-sidebar{width:220px;background:${e?"#060d09":"#0a1a10"};color:#fff;padding:20px 0;flex-shrink:0;position:sticky;top:0;height:100vh;overflow-y:auto;}
.admin-sidebar-logo{padding:0 20px 20px;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:8px;}
.admin-sidebar-logo-txt{font-family:'Syne',sans-serif;font-weight:800;font-size:1.1rem;color:#b7e4c7;}
.admin-sidebar-logo-sub{font-size:.65rem;color:rgba(255,255,255,.35);margin-top:2px;}
.admin-nav-item{display:flex;align-items:center;gap:9px;padding:10px 20px;cursor:pointer;font-size:.83rem;color:rgba(255,255,255,.55);transition:all .15s;border-left:3px solid transparent;}
.admin-nav-item:hover{background:rgba(255,255,255,.05);color:#fff;}
.admin-nav-item.active{background:rgba(79,209,125,.1);color:#4fd17d;border-left-color:#4fd17d;}
.admin-content{flex:1;padding:24px;background:var(--bg);overflow-y:auto;min-width:0;}
.admin-page-title{font-family:'Syne',sans-serif;font-weight:800;font-size:1.3rem;color:var(--ink);margin-bottom:20px;display:flex;align-items:center;gap:10px;}
.stat-cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px;margin-bottom:24px;}
.stat-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:18px;position:relative;overflow:hidden;}
.stat-card-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;margin-bottom:10px;}
.stat-card-val{font-family:'Syne',sans-serif;font-weight:800;font-size:1.5rem;color:var(--ink);line-height:1;}
.stat-card-lbl{font-size:.72rem;color:var(--gray);margin-top:4px;}
.stat-card-trend{font-size:.68rem;font-weight:600;margin-top:6px;}
.admin-table{width:100%;border-collapse:collapse;background:var(--surface);border-radius:12px;overflow:hidden;border:1px solid var(--border);}
.admin-table th{background:var(--surface2);padding:10px 14px;text-align:left;font-size:.73rem;font-weight:700;color:var(--gray);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border);}
.admin-table td{padding:11px 14px;font-size:.8rem;color:var(--ink);border-bottom:1px solid var(--border);}
.admin-table tr:last-child td{border-bottom:none;}
.admin-table tr:hover td{background:var(--surface2);}
.admin-badge{display:inline-block;padding:2px 8px;border-radius:50px;font-size:.65rem;font-weight:700;}
.admin-badge-green{background:#e6fff0;color:#1a6b3a;}
.admin-badge-red{background:#fff0f0;color:#ce1126;}
.admin-badge-blue{background:#e6f0ff;color:#1a4a9a;}
.admin-badge-yellow{background:#fff9e6;color:#b8860b;}
.admin-badge-gray{background:var(--surface2);color:var(--gray);}
.admin-action-btn{padding:4px 10px;border-radius:6px;border:none;cursor:pointer;font-size:.71rem;font-weight:600;transition:all .15s;}
.admin-search{border:1.5px solid var(--border);border-radius:8px;padding:8px 12px;font-family:'DM Sans',sans-serif;font-size:.82rem;color:var(--ink);background:var(--surface);outline:none;width:100%;max-width:280px;}
.admin-filter-row{display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap;align-items:center;}
.admin-section{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:18px;margin-bottom:20px;}
.admin-section-title{font-family:'Syne',sans-serif;font-weight:700;font-size:.88rem;color:var(--ink);margin-bottom:14px;display:flex;align-items:center;justify-content:space-between;}
.admin-alert{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:9px;margin-bottom:8px;font-size:.8rem;}
.admin-alert-red{background:#fff0f0;border:1px solid #f5c6c6;color:#721c24;}
.admin-alert-yellow{background:#fff9e6;border:1px solid #fdecc6;color:#856404;}
.admin-alert-green{background:#e6fff0;border:1px solid #b7e4c7;color:#1a6b3a;}
.chart-bar-wrap{display:flex;align-items:flex-end;gap:5px;height:80px;margin-top:10px;}
.chart-bar{flex:1;background:var(--green);border-radius:3px 3px 0 0;min-width:8px;transition:height .4s;position:relative;cursor:pointer;}
.chart-bar:hover::after{content:attr(data-val);position:absolute;top:-22px;left:50%;transform:translateX(-50%);background:var(--ink);color:var(--surface);font-size:.62rem;padding:2px 5px;border-radius:4px;white-space:nowrap;}
.chart-labels{display:flex;gap:5px;margin-top:4px;}
.chart-label{flex:1;font-size:.58rem;color:var(--gray);text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
@media(max-width:768px){.admin-sidebar{width:100%;height:auto;position:relative;}.admin-layout{flex-direction:column;}.admin-content{padding:16px;}}

/* ── ADMIN DASHBOARD ── */
.admin-layout{display:flex;min-height:calc(100vh - 60px);gap:0;}
.admin-sidebar{width:220px;background:${e?"#060d09":"#0a1a10"};color:#fff;padding:20px 0;flex-shrink:0;}
.admin-sidebar-logo{padding:0 20px 16px;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:8px;}
.admin-sidebar-logo-txt{font-family:'Syne',sans-serif;font-weight:800;font-size:1rem;color:#b7e4c7;}
.admin-sidebar-logo-sub{font-size:.62rem;color:rgba(255,255,255,.35);margin-top:2px;}
.admin-nav-item{display:flex;align-items:center;gap:9px;padding:10px 20px;cursor:pointer;font-size:.82rem;color:rgba(255,255,255,.55);transition:all .15s;border-left:3px solid transparent;}
.admin-nav-item:hover{background:rgba(255,255,255,.05);color:#fff;}
.admin-nav-item.active{background:rgba(79,209,125,.1);color:#4fd17d;border-left-color:#4fd17d;}
.admin-content{flex:1;padding:22px;overflow-y:auto;min-width:0;}
.admin-page-title{font-family:'Syne',sans-serif;font-weight:800;font-size:1.2rem;color:var(--ink);margin-bottom:18px;display:flex;align-items:center;gap:10px;}
.stat-cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;margin-bottom:22px;}
.stat-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;position:relative;overflow:hidden;}
.stat-card-icon{width:38px;height:38px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;margin-bottom:9px;}
.stat-card-val{font-family:'Syne',sans-serif;font-weight:800;font-size:1.4rem;color:var(--ink);line-height:1;}
.stat-card-lbl{font-size:.7rem;color:var(--gray);margin-top:4px;}
.stat-card-trend{font-size:.67rem;font-weight:600;margin-top:5px;}
.admin-table-wrap{overflow-x:auto;}
.admin-table{width:100%;border-collapse:collapse;border-radius:12px;overflow:hidden;border:1px solid var(--border);}
.admin-table th{background:var(--surface2);padding:10px 12px;text-align:left;font-size:.7rem;font-weight:700;color:var(--gray);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border);}
.admin-table td{padding:10px 12px;font-size:.78rem;color:var(--ink);border-bottom:1px solid var(--border);background:var(--surface);}
.admin-table tr:last-child td{border-bottom:none;}
.admin-table tr:hover td{background:var(--surface2);}
.admin-badge{display:inline-block;padding:2px 8px;border-radius:50px;font-size:.63rem;font-weight:700;}
.admin-badge-green{background:#e6fff0;color:#1a6b3a;}
.admin-badge-red{background:#fff0f0;color:#ce1126;}
.admin-badge-blue{background:#e6f0ff;color:#1a4a9a;}
.admin-badge-yellow{background:#fff9e6;color:#b8860b;}
.admin-badge-gray{background:var(--surface2);color:var(--gray);}
.admin-action-btn{padding:4px 9px;border-radius:6px;border:none;cursor:pointer;font-size:.69rem;font-weight:600;transition:all .15s;margin:0 2px;}
.admin-search{border:1.5px solid var(--border);border-radius:8px;padding:7px 11px;font-size:.8rem;color:var(--ink);background:var(--surface);outline:none;width:100%;max-width:260px;}
.admin-filter-row{display:flex;gap:9px;margin-bottom:14px;flex-wrap:wrap;align-items:center;}
.admin-section{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:18px;}
.admin-section-title{font-family:'Syne',sans-serif;font-weight:700;font-size:.86rem;color:var(--ink);margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;}
.admin-alert{display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:8px;margin-bottom:7px;font-size:.78rem;}
.admin-alert-red{background:#fff0f0;border:1px solid #f5c6c6;color:#721c24;}
.admin-alert-yellow{background:#fff9e6;border:1px solid #fdecc6;color:#856404;}
.admin-alert-green{background:#e6fff0;border:1px solid #b7e4c7;color:#1a6b3a;}
.chart-bar-wrap{display:flex;align-items:flex-end;gap:4px;height:70px;}
.chart-bar{flex:1;border-radius:3px 3px 0 0;min-width:8px;transition:height .4s;cursor:pointer;background:var(--green);}
.chart-labels{display:flex;gap:4px;margin-top:3px;}
.chart-label{flex:1;font-size:.56rem;color:var(--gray);text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
@media(max-width:768px){.admin-sidebar{display:none;}.admin-content{padding:14px;}}
/* FOOTER */
.footer{position:relative;background:linear-gradient(180deg,${e?"#050a08":"#07120c"} 0%,${e?"#060d09":"#0a1a10"} 42%);color:rgba(255,255,255,.5);padding:0 24px 22px;margin-top:40px;border-top:1px solid rgba(255,255,255,.06);}
.footer--premium{padding-top:0;}
.footer-premium-accent{height:3px;background:linear-gradient(90deg,var(--green),var(--yellow),var(--green-mid));opacity:.85;}
.footer-trust-strip{max-width:1200px;margin:0 auto;display:flex;flex-wrap:wrap;gap:8px 18px;justify-content:center;align-items:center;padding:14px 0 18px;border-bottom:1px solid rgba(255,255,255,.08);}
.fts-item{font-size:.66rem;font-weight:600;color:rgba(255,255,255,.38);letter-spacing:.02em;}
.footer-grid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:minmax(200px,2.2fr) minmax(120px,1fr) minmax(120px,1fr) minmax(120px,1fr);gap:clamp(18px,3vw,36px);margin-bottom:26px;padding-top:22px;}
.footer-brand-col{min-width:0;}
.footer-logo{font-family:'Syne',sans-serif;font-size:1.45rem;font-weight:800;color:#e8f6ec;margin-bottom:9px;letter-spacing:-1px;}
.footer-logo span{color:#ff6b6b;}
.footer-desc{font-size:.74rem;line-height:1.82;margin-bottom:12px;color:rgba(255,255,255,.52);max-width:44ch;}
.footer-contact{font-size:.71rem;color:rgba(255,255,255,.42);display:flex;flex-direction:column;gap:4px;margin-bottom:14px;}
.footer-cta-cluster{display:flex;flex-wrap:wrap;gap:8px;}
.footer-cta-chip{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);color:#e8f6ec;border-radius:10px;padding:8px 13px;font-size:.71rem;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;transition:background .2s,transform .15s;}
.footer-cta-chip:hover{background:rgba(79,209,125,.18);transform:translateY(-1px);}
.footer-cta-chip--ghost{background:transparent;color:rgba(255,255,255,.55);}
.footer-col h4{color:#fff;font-size:.73rem;font-weight:700;margin-bottom:12px;letter-spacing:.04em;text-transform:uppercase;font-family:'Syne',sans-serif;}
.footer-col ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:6px;}
.footer-col li button{font-size:.72rem;margin:0;color:rgba(255,255,255,.48);transition:color .2s;text-align:left;width:100%;border:none;background:none;padding:4px 0;cursor:pointer;font-family:'DM Sans',sans-serif;line-height:1.45;border-radius:6px;}
.footer-col li button:hover{color:#b7e4c7;}
.footer-bottom{max-width:1200px;margin:0 auto;padding-top:18px;border-top:1px solid rgba(255,255,255,.08);display:flex;justify-content:space-between;font-size:.65rem;align-items:center;flex-wrap:wrap;gap:10px;color:rgba(255,255,255,.35);}
.footer-copy{max-width:100%;}
.fb-badges{display:flex;gap:6px;flex-wrap:wrap;}
.fbb{background:rgba(255,255,255,.06);padding:5px 9px;border-radius:8px;font-size:.61rem;color:rgba(255,255,255,.55);border:1px solid rgba(255,255,255,.08);}

/* MOBILE NAV */
.mobile-nav{display:none;position:fixed;bottom:0;left:0;right:0;background:var(--surface);border-top:1px solid var(--border);padding:8px 0 calc(8px + env(safe-area-inset-bottom));z-index:520;box-shadow:0 -12px 32px rgba(0,0,0,.09);}
.mn-inner{display:flex;justify-content:space-around;align-items:center;padding-bottom:6px;}
.mn-item{display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;padding:4px 12px;border-radius:8px;transition:all .2s;position:relative;}
.mn-item.active .mn-icon,.mn-item.active .mn-label{color:var(--green);}
.mn-icon{font-size:1.25rem;color:var(--gray);}
.mn-label{font-size:.6rem;color:var(--gray);font-weight:500;}
.mn-badge{position:absolute;top:2px;right:6px;background:var(--red);color:#fff;border-radius:50%;width:14px;height:14px;font-size:.5rem;font-weight:700;display:flex;align-items:center;justify-content:center;}

/* MISC */
@keyframes fadeUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:none;}}
.anim{animation:fadeUp .35s ease both;}
.tag{background:var(--surface2);border:1px solid var(--border);border-radius:50px;padding:3px 9px;font-size:.68rem;font-weight:600;color:var(--gray);}
.divider-h{height:1px;background:var(--border);margin:16px 0;}

/* VENDOR BADGES */
.vendor-badge{padding:2px 7px;border-radius:4px;font-size:.6rem;font-weight:700;white-space:nowrap;}
.badge-top{background:#fff9e6;color:#b8860b;}
.badge-verif{background:#e6fff0;color:#1a6b3a;}
.badge-promo{background:#fff0e6;color:#d4520a;}
.badge-flash{background:#ffe6e6;color:#c0392b;}
.badge-best{background:#e6f0ff;color:#1a4a9a;}

/* FLASH CARD */
.prod-card-flash{border-color:#ff4444;box-shadow:0 0 0 1.5px rgba(255,68,68,.2);}
.prod-card-flash .prod-img-wrap::after{content:"⚡ FLASH";position:absolute;top:0;left:0;right:0;background:rgba(255,68,68,.85);color:#fff;font-size:.62rem;font-weight:800;text-align:center;padding:2px;letter-spacing:.5px;}
.pbadge-flash{position:absolute;top:7px;left:7px;background:#ff4444;color:#fff;font-size:.58rem;font-weight:800;padding:3px 7px;border-radius:50px;z-index:2;animation:flashPulse 1.5s infinite;}
@keyframes flashPulse{0%,100%{opacity:1;}50%{opacity:.6;}}
.pbadge-promo{position:absolute;top:7px;left:7px;background:#ff6b35;color:#fff;font-size:.62rem;font-weight:800;padding:3px 8px;border-radius:50px;z-index:2;}

/* TRUST BANNER */
.trust-banner{background:${e?"#0f1f16":"#f0faf4"};border-bottom:1px solid ${e?"#2a4030":"#c8f0d8"};padding:8px 20px;display:flex;align-items:center;justify-content:center;gap:20px;flex-wrap:wrap;}
.tb-item{display:flex;align-items:center;gap:5px;font-size:.72rem;font-weight:600;color:${e?"#7aca94":"#1a6b3a"};}

/* HERO BADGES */
.hero-badges{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px;}
.hbadge{display:flex;align-items:center;gap:5px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.16);color:#fff;padding:5px 10px;border-radius:50px;font-size:.72rem;font-weight:600;}
.hbadge-green{background:rgba(79,209,125,.15);border-color:rgba(79,209,125,.3);color:#4fd17d;}
.hbadge-yellow{background:rgba(252,209,22,.12);border-color:rgba(252,209,22,.28);color:var(--yellow);}

/* PROD CARD BADGES */
.prod-badge-row{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:5px;}
.pb{padding:2px 6px;border-radius:4px;font-size:.58rem;font-weight:700;white-space:nowrap;}
.pb-fire{background:#fff0e6;color:#d4520a;}
.pb-truck{background:#e6f4ff;color:#0066cc;}
.pb-cash{background:#e6fff0;color:#1a6b3a;}

/* WHY SECTION */
.why-section{background:${e?"#0f1a14":"#f8fbf9"};border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:28px 24px;}
.why-inner{max-width:1200px;margin:0 auto;}
.why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:16px;}
.why-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:18px;text-align:center;}
.why-icon{font-size:2rem;margin-bottom:8px;}
.why-title{font-family:'Syne',sans-serif;font-weight:700;font-size:.85rem;color:var(--ink);margin-bottom:4px;}
.why-desc{font-size:.72rem;color:var(--gray);line-height:1.55;}

/* SOCIAL PROOF */
.proof-bar{background:linear-gradient(135deg,#0d1f14,#1a3a24);padding:12px 24px;display:flex;align-items:center;justify-content:center;gap:28px;flex-wrap:wrap;}
.proof-item{display:flex;align-items:center;gap:6px;color:rgba(255,255,255,.85);font-size:.75rem;font-weight:600;}
.proof-num{font-family:'Syne',sans-serif;font-size:1rem;font-weight:800;color:var(--yellow);}

/* HOME PREMIUM (accueil) */
.home-premium{position:relative;}
.hp-trust-marquee{display:flex;gap:0;overflow-x:auto;scrollbar-width:none;padding:11px 20px;background:linear-gradient(90deg,var(--green-pale),var(--surface));border-bottom:1px solid var(--border);-webkit-overflow-scrolling:touch;}
.hp-trust-marquee::-webkit-scrollbar{display:none;}
.hp-trust-node{flex:0 0 auto;display:inline-flex;align-items:center;gap:7px;padding:9px 20px;font-size:.7rem;font-weight:700;color:var(--green);white-space:nowrap;border-right:1px solid var(--border);}
.hp-trust-node:last-child{border-right:none;}

.hero.hp-hero-shell{background:linear-gradient(165deg,#030806 0%,#0e2418 38%,#174c2f 72%,#14221a 100%);padding:50px 24px 58px;}
.hero.hp-hero-shell::before{opacity:0;}
.hp-hero-aurora{pointer-events:none;position:absolute;inset:0;background:
  radial-gradient(ellipse 90% 52% at 12% 12%,rgba(252,209,22,.13) 0%,transparent 50%),
  radial-gradient(ellipse 68% 48% at 90% 40%,rgba(79,209,125,.17) 0%,transparent 50%),
  radial-gradient(circle at 48% 125%,rgba(26,107,58,.42) 0%,transparent 45%);}
.hero.hp-hero-shell .hero-inner{position:relative;z-index:1;}
.hero.hp-hero-shell h1{font-size:clamp(1.82rem,4.5vw,3.08rem);line-height:1.05;margin-bottom:12px;}
.hp-hero-sub{max-width:580px;color:rgba(255,255,255,.55)!important;}
.hp-hero-lead{font-size:.8rem;line-height:1.65;color:rgba(255,255,255,.44);max-width:540px;margin-bottom:18px;margin-top:-6px;}

.hp-chip-scroller{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;}
.hp-chip{display:flex;align-items:flex-start;gap:10px;padding:11px 15px;border-radius:14px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.06);color:#fff;cursor:pointer;text-align:left;font-family:inherit;transition:transform .2s,background .2s,border-color .2s;touch-action:manipulation;}
.hp-chip:hover{background:rgba(255,255,255,.12);transform:translateY(-2px);border-color:rgba(252,209,22,.42);}
.hp-chip-ico{font-size:1.22rem;line-height:1;}
.hp-chip-label{display:block;font-family:'Syne',sans-serif;font-weight:800;font-size:.8rem;}
.hp-chip-desc{display:block;font-size:.64rem;color:rgba(255,255,255,.44);margin-top:2px;}

.hp-cta-primary{box-shadow:0 8px 26px rgba(252,209,22,.38);}
.hp-cta-ghost{backdrop-filter:blur(8px);}
.hp-hero-ctas{margin-top:6px;}

.hp-stat{min-width:92px;}

.hp-search-panel{border-radius:20px;padding:24px 22px;background:rgba(8,18,12,.74);border:1px solid rgba(255,255,255,.15);backdrop-filter:blur(18px);box-shadow:0 28px 64px rgba(0,0,0,.42);}
.hp-panel-head{margin-bottom:12px;}
.hc-title{font-size:1rem;}
.hp-panel-sub{font-size:.72rem;color:rgba(255,255,255,.5);margin-top:7px;line-height:1.5;}
.hp-sbtn{font-family:'Syne',sans-serif;font-weight:800;font-size:.83rem;padding:12px;margin-top:2px;}
.hp-panel-bullets{margin:14px 0 0;padding-left:17px;font-size:.68rem;color:rgba(255,255,255,.58);line-height:1.55;}
.hp-panel-bullets li{margin-bottom:7px;}
.hp-inline-link{background:none;border:none;color:#7ef0a8;font-weight:700;cursor:pointer;text-decoration:underline;padding:0;font-size:inherit;font-family:inherit;}

.hp-mega-strip{background:var(--surface);border-bottom:1px solid var(--border);box-shadow:0 10px 32px var(--shadow);}
.hp-mega-inner{max-width:1200px;margin:0 auto;padding:14px 24px;display:flex;gap:10px;flex-wrap:wrap;justify-content:center;}
.hp-mega-tile{flex:1;min-width:104px;max-width:150px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;padding:12px 8px;border-radius:14px;border:1px solid var(--border);background:var(--surface2);cursor:pointer;font-size:.71rem;font-weight:800;color:var(--ink);font-family:inherit;transition:all .2s;touch-action:manipulation;}
.hp-mega-tile span:first-child{font-size:1.32rem;line-height:1;}
.hp-mega-tile:hover{border-color:var(--green-mid);color:var(--green);transform:translateY(-2px);}
.hp-mega-tile--accent{background:linear-gradient(135deg,var(--green-pale),#fff);border-color:var(--green-light);}

.hp-proof-bar{background:linear-gradient(92deg,#0a1510,#1a3826,#0a1510);}
.hp-quotes{background:var(--surface2);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:26px 24px;}
.hp-quotes-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
.hp-quote-card{margin:0;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:18px;display:flex;flex-direction:column;gap:12px;}
.hp-quote-card blockquote{margin:0;font-size:.82rem;line-height:1.55;color:var(--ink);}
.hp-quote-card figcaption{display:flex;flex-direction:column;gap:3px;font-size:.72rem;color:var(--gray);}
.hp-quote-card figcaption strong{color:var(--green);}

.hp-flash-pill{background:linear-gradient(135deg,#ef4444,#f97316);color:#fff;padding:4px 12px;border-radius:999px;font-size:.61rem;font-weight:800;text-transform:uppercase;letter-spacing:.04em;}
.hp-flash-banner{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;background:linear-gradient(135deg,#111827,#422006);border-radius:16px;padding:17px 20px;margin-bottom:16px;border:1px solid rgba(251,146,60,.35);}
.hp-flash-title{font-family:'Syne',sans-serif;font-weight:800;font-size:1.02rem;color:#fff;}
.hp-flash-sub{font-size:.75rem;color:rgba(255,255,255,.55);margin-top:4px;}
.hp-flash-btn{background:var(--yellow);color:#0d1f14;border:none;padding:11px 20px;border-radius:11px;font-family:'Syne',sans-serif;font-weight:800;font-size:.79rem;cursor:pointer;touch-action:manipulation;}

.hp-bento{padding:38px 24px 46px;background:var(--bg);}
.hp-bento-header{max-width:720px;margin:0 auto 22px;text-align:center;}
.hp-bento-title{font-family:'Syne',sans-serif;font-size:clamp(1.28rem,2.8vw,1.72rem);font-weight:800;color:var(--ink);letter-spacing:-.55px;line-height:1.15;}
.hp-bento-sub{font-size:.84rem;color:var(--gray);margin-top:10px;line-height:1.6;}
.hp-bento-grid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(12,1fr);gap:13px;}
.hp-bento-card{grid-column:span 4;background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:21px;display:flex;flex-direction:column;gap:7px;transition:box-shadow .22s,transform .22s;}
.hp-bento-card:hover{transform:translateY(-3px);box-shadow:0 16px 44px rgba(26,107,58,.13);}
.hp-bento-card--wide{grid-column:span 6;}
.hp-bento-card h3{font-family:'Syne',sans-serif;font-size:.95rem;font-weight:800;color:var(--ink);}
.hp-bento-card p{font-size:.75rem;color:var(--gray);line-height:1.55;flex:1;}
.hp-bento-ico{font-size:1.85rem;line-height:1;}
.hp-bento-link{align-self:flex-start;margin-top:6px;background:none;border:none;color:var(--green);font-weight:800;font-size:.74rem;cursor:pointer;padding:0;font-family:inherit;border-bottom:1px solid transparent;}
.hp-bento-link:hover{border-bottom-color:var(--green);}

.hp-trust-inner{align-items:flex-start;}
.hp-ti{padding:10px;border-radius:12px;}

.hp-why-intro{text-align:center;margin-bottom:18px;}
.hp-why-kicker{display:inline-flex;padding:6px 15px;border-radius:999px;background:var(--green-pale);color:var(--green);font-size:.7rem;font-weight:800;margin-bottom:10px;}
.hp-why-heading{font-family:'Syne',sans-serif;font-size:clamp(1.2rem,2.5vw,1.52rem);font-weight:800;color:var(--ink);}
.hp-why-sub{font-size:.8rem;color:var(--gray);margin-top:9px;line-height:1.5;}

.hp-newsletter{border-radius:0!important;margin:0!important;position:relative;overflow:hidden;}
.hp-newsletter::before{content:'';position:absolute;inset:0;background:linear-gradient(118deg,rgba(26,107,58,.95),rgba(10,31,22,.94));z-index:0;}
.hp-newsletter .nl-title,.hp-newsletter .nl-sub{color:#fff!important;}
.hp-newsletter .nl-sub{opacity:.88;}
.hp-nl-form{display:flex!important;gap:10px;flex-wrap:wrap;justify-content:center;max-width:520px;margin:0 auto!important;}
.hp-nl-form .nl-input{flex:1;min-width:200px;background:rgba(255,255,255,.95);}
.hp-nl-success{display:inline-block;background:rgba(255,255,255,.22);border-radius:12px;padding:12px 22px;color:#fff;font-weight:700;}

@media(max-width:992px){
  .hp-bento-card,.hp-bento-card--wide{grid-column:span 6;}
}
@media(max-width:768px){
  .hp-quotes-inner{grid-template-columns:1fr;}
  .hp-mega-inner{justify-content:flex-start;flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px;}
  .hp-mega-tile{flex:0 0 auto;min-width:118px;}
  .home-premium .hp-hero-grid{display:flex;flex-direction:column;}
  .home-premium .hp-search-panel{order:-1;}
}

/* WA STICKY */
.wa-sticky{display:none;position:fixed;bottom:0;left:0;right:0;z-index:450;background:var(--wa);padding:10px 16px;gap:8px;align-items:center;justify-content:center;box-shadow:0 -3px 16px rgba(0,0,0,.2);}
.wa-sticky-btn{background:#fff;color:#1a5c38;border:none;padding:8px 20px;border-radius:50px;font-family:'Syne',sans-serif;font-weight:800;font-size:.82rem;cursor:pointer;flex:1;max-width:260px;}
.wa-sticky-text{color:#fff;font-size:.75rem;font-weight:600;}

@media(max-width:768px){
  .topbar{display:none;}
  .navbar{padding:0 14px;height:56px;}
  .nav-search select{display:none;}
  .btn-ghost,.btn-green,.btn-red,.dark-toggle{display:none;}
  .hero-inner{grid-template-columns:1fr;}
  .hero-card{display:none;}
  .prod-grid{grid-template-columns:repeat(2,1fr);}
  .trust-inner{grid-template-columns:repeat(2,1fr);}
  .prest-grid,.blog-grid,.courses-grid{grid-template-columns:1fr;}
  .rewards-grid{grid-template-columns:repeat(2,1fr);}
  .biz-feats{grid-template-columns:1fr;}
  .why-grid{grid-template-columns:repeat(2,1fr);}
  .proof-bar{gap:14px;}
  .footer-grid{grid-template-columns:1fr;gap:22px;}
  .footer-trust-strip{justify-content:flex-start;padding-left:0;padding-right:0;}
  .dash-layout{grid-template-columns:1fr;padding:0 14px;gap:12px;}
  .dash-sidebar{
    display:flex;
    flex-direction:row;
    flex-wrap:nowrap;
    align-items:center;
    gap:8px;
    position:sticky;
    top:56px;
    z-index:200;
    width:100%;
    max-width:100%;
    height:auto;
    overflow-x:auto;
    overflow-y:hidden;
    -webkit-overflow-scrolling:touch;
    scrollbar-width:thin;
    padding:10px 12px;
    border-radius:10px;
  }
  .dash-sidebar::-webkit-scrollbar{height:4px;}
  .dash-avatar,.dash-name,.dash-role-badge{display:none;}
  .dash-nav{display:flex;flex-direction:row;flex-wrap:nowrap;gap:4px;min-width:min-content;}
  .dash-nav-item{white-space:nowrap;flex-shrink:0;font-size:.72rem;padding:7px 10px;}
  .dash-nav-divider{display:none;width:0;height:0;margin:0;padding:0;border:none;}
  .dash-content{padding-left:0;min-width:0;}
  .dash-stats{grid-template-columns:repeat(2,1fr);}
  .mobile-nav{display:block;}
  .yorix-fab-stack{bottom:calc(118px + env(safe-area-inset-bottom));}
  .wa-sticky{display:flex;}
  .form-row{grid-template-columns:1fr;}
  .hero-badges{gap:6px;}
  .hbadge{font-size:.68rem;padding:4px 8px;}
  .trust-banner{gap:12px;padding:8px 14px;}
  .tb-item{font-size:.68rem;}
  .prod-badge-row{gap:3px;}
  .pb{font-size:.55rem;}
  .cart-page-grid{grid-template-columns:1fr;gap:12px;}
  .cart-page-summary{position:static;}
  .cart-page-item{align-items:flex-start;}
  .cart-page-thumb{width:82px;height:82px;}
  .cart-page-actions{flex-wrap:wrap;justify-content:flex-start;}
  .checkout-progress{padding:10px 6px;}
  .checkout-progress-node{width:min(22vw,80px);}
  .notif-drawer{top:56px;right:8px;width:calc(100vw - 16px);border-radius:14px;}
  .notif-hub-scroll--drop{max-height:min(48vh,380px);}
}
/* ========================================
   YORIX CM - MOBILE FIXES
   ======================================== */

html, body, #root {
  overflow-x: hidden;
  max-width: 100vw;
}

*{ box-sizing: border-box; }

img {
  max-width: 100%;
  height: auto;
}

button, a[role="button"], input[type="submit"] {
  min-height: 44px;
  touch-action: manipulation;
}

input, select, textarea {
  font-size: 16px !important;
  max-width: 100%;
}

@media (max-width: 768px) {

  body { font-size: 14px; padding-bottom: 70px; }

  h1 { font-size: 1.75rem !important; line-height: 1.2; }
  h2 { font-size: 1.4rem !important; line-height: 1.3; }
  h3 { font-size: 1.15rem !important; }

  .container, main, section {
    padding-left: 12px !important;
    padding-right: 12px !important;
  }

  [class*="grid-cols-4"],
  [class*="grid-cols-3"] {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 10px !important;
  }

  nav {
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  }
  nav::-webkit-scrollbar { display: none; }

  form { width: 100%; padding: 12px; }
  form input, form select, form textarea {
    width: 100% !important;
    padding: 12px !important;
    margin-bottom: 10px !important;
    border-radius: 8px;
  }
  form button { width: 100%; padding: 14px !important; margin-top: 8px; }

  [role="dialog"], .modal {
    width: 95vw !important;
    max-width: 95vw !important;
    max-height: 90vh;
    overflow-y: auto;
  }

  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  }

  iframe[src*="whatsapp"],
  iframe[title*="chat"],
  [class*="chat"],
  [id*="whatsapp"] {
    bottom: 80px !important;
    right: 10px !important;
    transform: scale(0.8);
    transform-origin: bottom right;
  }

  .cart-drawer {
    width: 100vw !important;
    max-width: 100vw !important;
  }
}

@media (max-width: 400px) {
  [class*="grid-cols-2"] {
    grid-template-columns: 1fr !important;
  }
  h1 { font-size: 1.5rem !important; }
}
/* =========================================================
   YORIX CM - FIX "VERSION ORDINATEUR FORCÉE" SUR MOBILE
   Ce bloc écrase toutes les largeurs fixes problématiques
   ========================================================= */

@media (max-width: 768px) {
  
  /* FORCE toutes les largeurs fixes à devenir flexibles */
  * {
    max-width: 100vw !important;
  }
  
  /* Écrase les min-width qui cassent tout */
  body, #root, main, section, header, footer, nav, aside, div {
    min-width: 0 !important;
  }
  
  /* TOPBAR : force le wrap */
  .topbar,
  [class*="topbar"],
  [class*="top-bar"] {
    flex-wrap: wrap !important;
    padding: 8px !important;
    font-size: 11px !important;
    gap: 6px !important;
    height: auto !important;
  }
  
  /* NAVBAR principale : scrollable horizontalement */
  header nav,
  .navbar,
  [class*="navbar"] {
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  
  header nav::-webkit-scrollbar,
  .navbar::-webkit-scrollbar {
    display: none;
  }
  
  /* Tous les containers flex : permettre le wrap */
  [style*="display:flex"],
  [style*="display: flex"] {
    flex-wrap: wrap !important;
  }
  
  /* HERO / titre principal */
  h1 {
    font-size: 1.8rem !important;
    word-wrap: break-word;
  }
  /* =========================================================
   FIX CIBLÉ — NAVBAR + PAIEMENT SUR MOBILE
   ========================================================= */

@media (max-width: 768px) {
  
  /* ===== NAVBAR PRINCIPALE (Accueil, Produits, Livraison...) ===== */
  /* Force le scroll horizontal au lieu du chevauchement */
  
  nav, 
  .navbar,
  [class*="navbar"],
  header > div:nth-of-type(2),
  header nav {
    display: flex !important;
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    -webkit-overflow-scrolling: touch !important;
    scrollbar-width: none !important;
    white-space: nowrap !important;
    gap: 4px !important;
    padding: 8px 10px !important;
    justify-content: flex-start !important;
  }
  
  nav::-webkit-scrollbar,
  .navbar::-webkit-scrollbar { 
    display: none !important; 
  }
  
  /* Chaque item de navbar : taille fixe lisible */
  nav a, 
  nav button,
  .navbar a,
  .navbar button {
    flex-shrink: 0 !important;
    font-size: 13px !important;
    padding: 6px 10px !important;
    white-space: nowrap !important;
    min-width: auto !important;
  }
  
  /* ===== BARRE PAIEMENT (MTN, Orange, Carte, Cash, J+1...) ===== */
  
  /* Cibler le conteneur "Paiement :" */
  div:has(> :is(.payment-btn, [class*="payment"])),
  [class*="payment"],
  [class*="paiement"] {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 6px !important;
    padding: 8px !important;
    align-items: center !important;
  }
  
  /* Boutons de paiement + labels infos */
  [class*="payment"] > *,
  [class*="paiement"] > * {
    flex-shrink: 0 !important;
    font-size: 12px !important;
    padding: 6px 8px !important;
  }
  
  /* ===== TOPBAR (Cameroun CM | FR/EN | +237... | Aide | Contact) ===== */
  
  .topbar,
  [class*="topbar"] {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 6px !important;
    padding: 6px 10px !important;
    font-size: 11px !important;
    justify-content: space-between !important;
    height: auto !important;
  }
  
  /* ===== HEADER top (Yorix + search + icônes) ===== */
  
  header > div:first-of-type {
    flex-wrap: wrap !important;
    gap: 8px !important;
    padding: 8px !important;
  }
  
  /* Input de recherche prend la largeur dispo */
  header input[type="search"],
  header input[type="text"] {
    flex: 1 !important;
    min-width: 150px !important;
    font-size: 14px !important;
  }
}

/* ===== VERY SMALL (< 420px) ===== */
@media (max-width: 420px) {
  
  nav a, nav button {
    font-size: 12px !important;
    padding: 5px 8px !important;
  }
  
  .topbar, [class*="topbar"] {
    font-size: 10px !important;
  }
  
  /* Cacher textes secondaires si trop petit */
  .topbar [class*="help-text"],
  .topbar [class*="optional"] {
    display: none !important;
  }
}
/* =========================================================
   FIX NAVBAR .nav-tabs SUR MOBILE
   ========================================================= */

@media (max-width: 768px) {
  
  /* Navbar principale = .nav-tabs → scroll horizontal */
  .nav-tabs {
    display: flex !important;
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    -webkit-overflow-scrolling: touch !important;
    scrollbar-width: none !important;
    white-space: nowrap !important;
    gap: 4px !important;
    padding: 6px 10px !important;
    width: 100% !important;
    max-width: 100vw !important;
    justify-content: flex-start !important;
  }
  
  .nav-tabs::-webkit-scrollbar {
    display: none !important;
  }
  
  /* Chaque onglet : taille fixe, ne se compresse pas */
  .nav-tabs .tab {
    flex: 0 0 auto !important;
    white-space: nowrap !important;
    font-size: 0.85rem !important;
    padding: 8px 12px !important;
    min-width: auto !important;
    display: inline-flex !important;
    align-items: center !important;
  }
  
  /* ═══ FIX PANIER YORIX — Override final ═══ */
.cart-drawer{display:flex !important;flex-direction:column !important;height:100vh !important;max-height:100vh !important;overflow:hidden !important;}
.cart-header,.cart-trust-bar,.cart-footer{flex-shrink:0 !important;}
.cart-items{flex:1 1 auto !important;overflow-y:auto !important;overflow-x:hidden !important;min-height:0 !important;padding:12px 16px !important;}
.cart-items::-webkit-scrollbar{width:6px;}
.cart-items::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px;}
.cart-items::-webkit-scrollbar-track{background:transparent;}
.cart-footer{border-top:1px solid var(--border);background:var(--surface);padding:14px 16px !important;max-height:55vh;overflow-y:auto;}

.cart-item{display:flex !important;gap:12px !important;padding:12px !important;background:var(--surface) !important;border:1px solid var(--border) !important;border-radius:12px !important;margin-bottom:10px !important;position:relative;}
.cart-item:hover{border-color:var(--green-light) !important;}
.ci-img{width:70px !important;height:70px !important;flex-shrink:0 !important;border-radius:10px !important;overflow:hidden !important;background:var(--surface2) !important;display:flex !important;align-items:center !important;justify-content:center !important;}
.ci-img img{width:100% !important;height:100% !important;object-fit:cover !important;}
.ci-info{flex:1 !important;min-width:0 !important;display:flex !important;flex-direction:column !important;gap:3px !important;}
.ci-name{font-family:'Syne',sans-serif !important;font-weight:700 !important;font-size:.88rem !important;color:var(--ink) !important;line-height:1.3 !important;overflow:hidden !important;text-overflow:ellipsis !important;display:-webkit-box !important;-webkit-line-clamp:2 !important;-webkit-box-orient:vertical !important;padding-right:24px !important;}
.ci-vendeur{font-size:.68rem !important;color:var(--gray) !important;}
.ci-meta{display:flex !important;gap:4px !important;flex-wrap:wrap !important;margin-top:2px !important;}
.ci-tag{font-size:.6rem !important;padding:2px 7px !important;border-radius:20px !important;background:var(--surface2) !important;color:var(--gray) !important;font-weight:600 !important;}
.ci-tag-stock-ok{background:var(--green-pale) !important;color:var(--green) !important;}
.ci-tag-stock-low{background:#fff3e0 !important;color:#d97706 !important;}
.ci-tag-stock-out{background:#ffebee !important;color:#ce1126 !important;}
.ci-bottom{display:flex !important;justify-content:space-between !important;align-items:center !important;margin-top:6px !important;gap:8px !important;}
.ci-price-block{display:flex !important;flex-direction:column !important;min-width:0 !important;}
.ci-unit-price{font-size:.64rem !important;color:var(--gray) !important;}
.ci-total-price{font-family:'Syne',sans-serif !important;font-weight:800 !important;font-size:.95rem !important;color:var(--green) !important;}
.ci-qty{display:flex !important;align-items:center !important;gap:4px !important;background:var(--surface2) !important;border-radius:8px !important;padding:2px !important;flex-shrink:0 !important;}
.qty-btn{width:26px !important;height:26px !important;border:none !important;background:var(--surface) !important;border-radius:6px !important;cursor:pointer !important;font-weight:700 !important;font-size:.9rem !important;color:var(--ink) !important;display:flex !important;align-items:center !important;justify-content:center !important;}
.qty-btn:hover{background:var(--green) !important;color:#fff !important;}
.qty-val{min-width:22px !important;text-align:center !important;font-weight:700 !important;font-size:.82rem !important;color:var(--ink) !important;}
.ci-del{position:absolute !important;top:8px !important;right:8px !important;width:26px !important;height:26px !important;border:none !important;background:transparent !important;color:var(--gray) !important;cursor:pointer !important;border-radius:6px !important;font-size:.85rem !important;display:flex !important;align-items:center !important;justify-content:center !important;}
.ci-del:hover{background:#ffebee !important;color:#ce1126 !important;}
}

/* =========================================================
   YORIX PREMIUM MARKETING — breadcrumbs, escrow, help, business
   ========================================================= */
.visually-hidden{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}
.yorix-pro-page{padding-top:4px;padding-bottom:32px;}
.loy-page.sec{overflow-x:hidden;}
.loy-page.yorix-pro-page.sec{background:${e?"linear-gradient(185deg,var(--bg) 0%,#121f16 92%)":"linear-gradient(180deg,var(--bg) 0%,var(--sand) 100%)"};padding-bottom:40px;}
.yorix-loy-hero-bleed{width:100vw;max-width:none;position:relative;left:50%;margin-left:-50vw;box-sizing:border-box;padding-inline:clamp(18px,calc(env(safe-area-inset-left) + 14px),32px);padding-block:0 clamp(8px,1.8vw,12px);}
.yorix-loy-hero-bleed--guest{padding-bottom:clamp(32px,5vw,48px);}
.yorix-loy-hero-bleed--guest::before{content:'';position:absolute;left:4%;right:4%;bottom:-24%;pointer-events:none;height:clamp(200px,45vw,360px);background:radial-gradient(ellipse 85% 50% at 50% 0%,rgba(39,168,90,.13),transparent 72%);opacity:${e?".42":".95"};}
.yorix-loy-hero-inner{max-width:1200px;margin:0 auto;width:100%;}
.yorix-loy-body-stack{background:var(--surface)!important;border:1px solid var(--border);border-radius:clamp(18px,2.2vw,24px)!important;padding:clamp(22px,3.8vw,34px)!important;box-shadow:${e?"0 20px 48px rgba(0,0,0,.42),inset 0 1px 0 rgba(255,255,255,.04)":"0 22px 50px rgba(13,31,20,.09),inset 0 1px 0 rgba(255,255,255,.92)"}!important;}
@media(max-width:600px){.yorix-loy-body-stack{border-radius:16px!important;padding:18px 14px!important;}}
.yorix-loy-page-h1{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(1.55rem,4.8vw,2.25rem);line-height:1.1;color:#fff;margin:8px 0 10px;padding:0;letter-spacing:-.8px;text-shadow:0 8px 32px rgba(0,0,0,.32);}
.yorix-loy-kpi-lead{font-size:.84rem;line-height:1.6;color:rgba(255,255,255,.62);margin:0 0 6px;padding:0;max-width:min(44ch,100%);}
.yorix-level-badge{display:inline-flex!important;align-items:center;gap:4px!important;padding:4px 10px!important;border-radius:999px;font-weight:800!important;font-family:'Syne',sans-serif!important;line-height:1.2!important;font-size:.68rem!important;box-sizing:border-box;}
.yorix-level-badge--lg{gap:7px!important;padding:10px 18px!important;font-size:.92rem!important;box-shadow:0 14px 32px rgba(0,0,0,.38),inset 0 1px 0 rgba(255,255,255,.4)!important;text-shadow:0 1px 0 rgba(255,255,255,.08);}
.yorix-bc-row{margin-bottom:14px;}
.yorix-bc{margin:0 0 16px;}
.yorix-bc__list{display:flex;flex-wrap:wrap;align-items:center;gap:2px 2px;margin:0;padding:0;font-size:.72rem;list-style:none;}
.yorix-bc__segment,.yorix-bc__item{display:inline-flex;align-items:center;gap:6px;}
.yorix-bc__link,.yorix-bc__current{font-family:'DM Sans',sans-serif;font-size:.72rem;}
.yorix-bc__link{background:none;border:none;padding:0;color:var(--green);font-weight:600;cursor:pointer;text-decoration:underline;text-underline-offset:2px;}
.yorix-bc__link:hover{color:var(--green-mid);}
.yorix-bc__current{color:var(--gray);font-weight:600;cursor:default;text-decoration:none;}
.yorix-bc__sep{display:inline;color:var(--gray);opacity:.45;font-weight:500;font-size:.85em;margin-left:2px;margin-right:2px;user-select:none;}
.loy-page .yorix-bc-row--loy{margin-bottom:clamp(14px,2.4vw,20px);}
.loy-page .yorix-bc-row--loy .yorix-bc{margin-bottom:0;}
.loy-page .yorix-bc-row--loy .yorix-bc__list{font-size:.78rem;background:var(--surface);border:1px solid var(--border);border-radius:999px;padding:10px 20px 10px 18px;box-shadow:var(--yorix-sh-sm);gap:4px 2px;width:fit-content;max-width:100%;}
.loy-page .yorix-bc-row--loy .yorix-bc__sep{opacity:.4;margin-left:8px;margin-right:8px;}
.loy-shell{display:flex;flex-direction:column;gap:clamp(20px,2.8vw,28px);width:100%;min-width:0;}

.yorix-sec-heading{font-family:'Syne',sans-serif;font-size:clamp(1.15rem,2vw,1.45rem);font-weight:800;color:var(--ink);letter-spacing:-.4px;margin:0 0 18px;line-height:1.2;}
.sec-link-btn{background:none;border:none;padding:0;font-family:'DM Sans',sans-serif;font-size:.78rem;font-weight:700;color:var(--green);cursor:pointer;border-bottom:1px solid var(--green-light);}
.sec-link-btn:hover{color:var(--green-mid);}
.yorix-chip{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--border);background:var(--surface2);color:var(--ink);padding:8px 12px;border-radius:50px;font-size:.72rem;font-weight:600;cursor:default;font-family:'DM Sans',sans-serif;}
button.yorix-chip{cursor:pointer;transition:border-color .2s,background .2s;}
button.yorix-chip:hover{background:var(--green-pale);border-color:var(--green);}
.yorix-chip.wa{border-color:rgba(37,211,102,.35);background:rgba(37,211,102,.08);color:#0d5c2e;}
button.yorix-chip.wa:hover{background:rgba(37,211,102,.14);border-color:var(--wa);}

.yorix-details{background:var(--surface);border:1px solid var(--border);border-radius:12px;margin-bottom:10px;overflow:hidden;}
.yorix-details summary{cursor:pointer;padding:14px 16px;font-weight:700;font-size:.84rem;color:var(--ink);font-family:'DM Sans',sans-serif;list-style:none;}
.yorix-details summary::-webkit-details-marker{display:none;}
.yorix-details summary::after{content:'+';float:right;font-weight:800;color:var(--gray);transition:transform .2s;}
.yorix-details[open] summary::after{transform:rotate(45deg);}
.yorix-details p{padding:0 16px 16px;font-size:.82rem;line-height:1.7;color:var(--gray);margin:0;}
.yorix-help-faq-list{display:flex;flex-direction:column;gap:0;}

.yorix-esc-hero{background:linear-gradient(145deg,#060d0a 0%,#0d3320 38%,var(--green) 100%);padding:36px 24px 48px;color:#fff;border-radius:0;margin:0 calc(-1 * max(12px, env(safe-area-inset-left))) 0 calc(-1 * max(12px, env(safe-area-inset-right)));max-width:none;}
@media (min-width:901px){.yorix-esc-hero{border-radius:0 0 20px 20px;margin:0 -24px;}}
.escrow-premium-root .yorix-esc-hero .yorix-bc{margin-bottom:18px;}
.escrow-premium-root .yorix-bc__current,.escrow-premium-root .yorix-bc__link{color:rgba(255,255,255,.92);}
.escrow-premium-root .yorix-bc__link{color:#b7e4c7;}
.escrow-premium-root .yorix-bc__sep{color:rgba(255,255,255,.25);}
.yorix-esc-hero-grid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.1fr minmax(240px,.9fr);gap:32px;align-items:center;}
.yorix-esc-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(252,209,22,.12);border:1px solid rgba(252,209,22,.35);color:var(--yellow);padding:6px 14px;border-radius:50px;font-size:.7rem;font-weight:700;margin-bottom:14px;}
.yorix-esc-h1{font-family:'Syne',sans-serif;font-size:clamp(1.65rem,3vw,2.5rem);font-weight:800;line-height:1.12;letter-spacing:-1px;margin:0 0 14px;}
.yorix-esc-h1 em{color:#7ef0a8;font-style:normal;}
.yorix-esc-sub{font-size:.9rem;line-height:1.72;color:rgba(255,255,255,.72);margin:0 0 22px;max-width:52ch;}
.yorix-esc-hero-cta{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:20px;}
.yorix-esc-badge-row{display:flex;flex-wrap:wrap;gap:8px;}
.yorix-trust-pill{font-size:.66rem;font-weight:700;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);padding:6px 12px;border-radius:50px;}
.yorix-esc-hero-visual{display:flex;justify-content:center;align-items:center;}
.yorix-esc-card-float{background:rgba(255,255,255,.08);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.15);border-radius:16px;padding:22px 20px;width:100%;max-width:320px;box-shadow:0 24px 48px rgba(0,0,0,.2);}
.yorix-esc-mini-label{font-family:'Syne',sans-serif;font-size:.74rem;font-weight:800;color:rgba(255,255,255,.55);margin-bottom:12px;text-transform:uppercase;letter-spacing:.08em;}
.yorix-esc-mini-flow{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px;font-size:.8rem;color:rgba(255,255,255,.88);}
.yorix-esc-mini-flow li{display:flex;align-items:center;gap:10px;line-height:1.35;}
.yorix-esc-mini-flow span{flex-shrink:0;width:26px;height:26px;border-radius:8px;background:rgba(252,209,22,.22);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:.72rem;color:#fff;}
.yorix-esc-steps-sec{padding-top:40px!important;}
.yorix-step-rail{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
@media (max-width:900px){.yorix-step-rail{grid-template-columns:1fr 1fr;}}
@media (max-width:520px){.yorix-step-rail{grid-template-columns:1fr;}}
.yorix-step-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:18px 16px 20px;position:relative;transition:box-shadow .2s;border-top:3px solid var(--green);}
.yorix-step-card:hover{box-shadow:0 12px 32px rgba(26,107,58,.08);}
.yorix-step-num{display:inline-block;font-family:'Syne',sans-serif;font-size:.75rem;font-weight:800;color:var(--green);margin-bottom:8px;}
.yorix-step-card h3{font-family:'Syne',sans-serif;font-size:.88rem;font-weight:800;margin:0 0 8px;color:var(--ink);}
.yorix-step-card p{margin:0;font-size:.76rem;line-height:1.65;color:var(--gray);}
.yorix-duo-cards{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
@media (max-width:720px){.yorix-duo-cards{grid-template-columns:1fr;}}
.yorix-panel{background:var(--surface);border-radius:14px;padding:22px;border:1px solid var(--border);}
.yorix-panel h3{font-family:'Syne',sans-serif;font-size:1rem;font-weight:800;margin:0 0 14px;color:var(--ink);}
.yorix-panel ul{margin:0;padding-left:18px;color:var(--gray);font-size:.82rem;line-height:1.75;}
.yorix-panel li{margin-bottom:8px;}
.yorix-panel--buy{border-left:4px solid #1565c0;background:${e?"#151d24":"linear-gradient(180deg,#fafdff 0%,var(--surface) 100%)"};}
.yorix-panel--sell{border-left:4px solid var(--green);background:${e?"#151f18":"linear-gradient(180deg,#f4fff8 0%,var(--surface) 100%)"};}
.yorix-esc-faq{padding-bottom:40px!important;}
.yorix-products-head{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:18px;border-bottom:1px solid var(--border);padding-bottom:12px;}
.yorix-products-head h2{font-family:'Syne',sans-serif;font-size:1.15rem;font-weight:800;margin:0;color:var(--ink);}
@media (max-width:900px){.yorix-esc-hero-grid{grid-template-columns:1fr;}}

.yorix-bus-hero{background:linear-gradient(135deg,#0a1410 0%,#102a1a 45%,#1a5c38 100%);color:#fff;padding:40px 24px 44px;border-radius:0;margin:0 -24px 28px;position:relative;overflow:hidden;}
.yorix-bus-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 85% 20%,rgba(252,209,22,.12) 0%,transparent 45%);}
.yorix-bus-hero > *{position:relative;z-index:1;}
.yorix-bus-hero .yorix-bc{margin-bottom:16px;}
.yorix-bus-hero .yorix-bc__current{color:rgba(255,255,255,.75);}
.yorix-bus-hero .yorix-bc__link{color:#b7e4c7;}
.yorix-bus-h1{font-family:'Syne',sans-serif;font-size:clamp(1.6rem,2.8vw,2.35rem);font-weight:800;line-height:1.13;letter-spacing:-.8px;margin:0 0 14px;}
.yorix-bus-h1 span{color:var(--yellow);}
.yorix-bus-lead{font-size:.9rem;line-height:1.75;color:rgba(255,255,255,.72);margin:0 0 22px;max-width:58ch;}
.yorix-bus-cta{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:22px;}
.yorix-bus-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}
@media (max-width:720px){.yorix-bus-metrics{grid-template-columns:1fr;}}
.yorix-bus-metric{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:6px;}
.yorix-bus-metric strong{font-family:'Syne',sans-serif;font-size:.76rem;color:#fff;}
.yorix-bus-metric span{font-size:.68rem;color:rgba(255,255,255,.55);line-height:1.45;}
.yorix-bus-pillars{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}
@media (max-width:640px){.yorix-bus-pillars{grid-template-columns:1fr;}}
.yorix-bus-pillar{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:20px;transition:transform .2s,box-shadow .2s;}
.yorix-bus-pillar:hover{transform:translateY(-3px);box-shadow:0 14px 36px rgba(26,107,58,.1);}
.yorix-bus-pillar-ico{font-size:1.8rem;margin-bottom:10px;}
.yorix-bus-pillar h3{font-family:'Syne',sans-serif;font-size:.95rem;font-weight:800;margin:0 0 8px;color:var(--ink);}
.yorix-bus-pillar p{margin:0;font-size:.8rem;line-height:1.65;color:var(--gray);}

.yorix-acad-hero{text-align:center;background:linear-gradient(180deg,var(--surface) 0%,var(--surface2) 100%);border:1px solid var(--border);border-radius:18px;padding:36px 22px 32px;margin-bottom:28px;}
.yorix-acad-h1{font-family:'Syne',sans-serif;font-size:clamp(1.45rem,2.5vw,2rem);font-weight:800;color:var(--ink);line-height:1.15;margin:0 0 12px;letter-spacing:-.5px;}
.yorix-acad-h1 span{color:var(--green);}
.yorix-acad-sub{font-size:.88rem;color:var(--gray);line-height:1.7;max-width:640px;margin:0 auto 16px;}
.yorix-acad-tracks{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;}

.yorix-contact-chips{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:22px;}
@media (max-width:720px){.yorix-contact-chips{grid-template-columns:1fr;}}

.yorix-help{max-width:1200px;margin:0 auto;padding:0 24px 40px;}
.yorix-help-hero{background:linear-gradient(135deg,#0a1410 0%,#153520 50%,var(--green) 100%);color:#fff;padding:40px 24px 36px;border-radius:16px;margin-bottom:28px;text-align:center;position:relative;overflow:hidden;}
.yorix-help-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 20% 80%,rgba(252,209,22,.1) 0%,transparent 50%);}
.yorix-help-hero > *{position:relative;z-index:1;}
.yorix-help-title{font-family:'Syne',sans-serif;font-size:clamp(1.5rem,2.6vw,2.1rem);font-weight:800;margin:0 0 10px;letter-spacing:-.5px;}
.yorix-help-lead{font-size:.88rem;color:rgba(255,255,255,.7);max-width:520px;margin:0 auto 20px;line-height:1.65;}
.yorix-help-search{display:block;max-width:420px;margin:0 auto 18px;text-align:left;}
.yorix-help-search span{display:block;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:rgba(255,255,255,.45);margin-bottom:6px;}
.yorix-help-search input{width:100%;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.1);color:#fff;border-radius:12px;padding:12px 14px;font-family:'DM Sans',sans-serif;font-size:.88rem;outline:none;}
.yorix-help-search input::placeholder{color:rgba(255,255,255,.45);}
.yorix-help-search input:focus{border-color:var(--yellow);background:rgba(255,255,255,.14);}
.yorix-help-quick{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;}
.yorix-help-layout{display:grid;grid-template-columns:220px 1fr;gap:28px;align-items:start;}
@media (max-width:900px){.yorix-help-layout{grid-template-columns:1fr;}}
.yorix-help-sidebar{position:sticky;top:calc(120px + env(safe-area-inset-top));align-self:start;z-index:2;}
@media (max-width:900px){.yorix-help-sidebar{position:relative;top:auto;}}
.yorix-help-nav{display:flex;flex-direction:column;gap:4px;}
.yorix-help-nav-item{display:flex;align-items:center;gap:10px;width:100%;text-align:left;border:1px solid var(--border);background:var(--surface);border-radius:10px;padding:10px 12px;font-size:.78rem;font-weight:600;color:var(--ink);cursor:pointer;font-family:'DM Sans',sans-serif;transition:background .2s,border-color .2s;}
.yorix-help-nav-item:hover{background:var(--surface2);border-color:var(--green-mid);}
.yorix-help-nav-item.is-active{background:var(--green-pale);border-color:var(--green);color:var(--green);}
@media (max-width:900px){.yorix-help-nav{flex-direction:row;flex-wrap:wrap;}}
.yorix-help-main{min-width:0;}
.yorix-help-empty{text-align:center;padding:48px 20px;color:var(--gray);}
.yorix-help-empty p{margin-bottom:16px;font-size:.9rem;}
.yorix-help-block{padding:26px 0;border-bottom:1px solid var(--border);scroll-margin-top:120px;}
.yorix-help-block:last-of-type{border-bottom:none;}
.yorix-help-block-title{font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:800;margin:0 0 16px;color:var(--ink);display:flex;align-items:center;gap:10px;}
.yorix-help-block-ico{font-size:1.4rem;line-height:1;}
.yorix-help-cta-bar{margin-top:32px;display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:space-between;background:linear-gradient(90deg,var(--surface2),var(--surface));border:1px solid var(--border);border-radius:14px;padding:18px 20px;}
.yorix-help-cta-bar strong{display:block;font-family:'Syne',sans-serif;color:var(--ink);margin-bottom:4px;}
.yorix-help-cta-bar span{font-size:.78rem;color:var(--gray);}

.yorix-trust-badges{display:flex;gap:10px;overflow-x:auto;scrollbar-width:thin;-webkit-overflow-scrolling:touch;padding-bottom:6px;}

.yorix-blog-hero{margin-bottom:28px;position:relative;overflow:hidden;border-radius:clamp(14px,2vw,20px);background:linear-gradient(135deg,#0a1410 0%,#1a3a24 50%,#0d3320 100%);}
.yorix-blog-hero-glare{pointer-events:none;position:absolute;top:-40px;right:-40px;width:220px;height:220px;background:rgba(252,209,22,.07);border-radius:50%;z-index:1;}
.yorix-blog-hero-glare.yorix-blog-hero-glare--b{bottom:-60px;top:auto;left:-50px;right:auto;background:rgba(79,209,125,.06);}
.yorix-blog-hero-inner{position:relative;z-index:2;text-align:center;padding:clamp(28px,4vw,40px) clamp(20px,3vw,32px);}
.yorix-blog-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(252,209,22,.14);color:var(--yellow);border:1px solid rgba(252,209,22,.26);padding:6px 16px;border-radius:50px;font-size:.71rem;font-weight:800;margin-bottom:14px;font-family:'Syne',sans-serif;letter-spacing:.04em;text-transform:uppercase;}
.yorix-blog-h1{font-family:'Syne',sans-serif;font-size:clamp(1.65rem,3.2vw,2.35rem);font-weight:800;margin:0 0 12px;line-height:1.12;color:#fff;letter-spacing:-.5px;}
.yorix-blog-h1 em,.yorix-blog-h1-em{color:var(--yellow);font-style:normal;}
.yorix-blog-lead{font-size:.9rem;color:rgba(255,255,255,.62);max-width:560px;margin:0 auto;line-height:1.72;}
.yorix-blog-cats{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:26px;justify-content:center;}
.yorix-blog-cat{border:1.5px solid var(--border);background:var(--surface);color:var(--ink);padding:8px 18px;border-radius:50px;font-family:'DM Sans',sans-serif;font-weight:700;font-size:.74rem;cursor:pointer;transition:transform .15s,box-shadow .2s,border-color .2s,background .2s;}
.yorix-blog-cat:hover{transform:translateY(-1px);border-color:var(--green-mid);}
.yorix-blog-cat.is-active{background:var(--green);border-color:var(--green);color:#fff;box-shadow:0 6px 18px rgba(26,107,58,.25);}
.yorix-blog-featured{background:var(--surface);border:1px solid var(--border);border-radius:18px;overflow:hidden;margin-bottom:30px;cursor:pointer;transition:transform .22s,box-shadow .22s;border-top:3px solid var(--green);display:grid;grid-template-columns:1.05fr 1fr;gap:0;}
.yorix-blog-featured:hover{transform:translateY(-4px);box-shadow:0 18px 44px rgba(0,0,0,.1);}
@media (max-width:820px){.yorix-blog-featured{grid-template-columns:1fr;}}
.yorix-blog-feat-media{min-height:260px;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;background:var(--green-pale);}
.yorix-blog-feat-media img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0;}
.yorix-blog-feat-fallback{font-size:5.5rem;opacity:.45;}
.yorix-blog-feat-badge{position:absolute;top:16px;left:16px;background:var(--yellow);color:#0d1f14;padding:6px 14px;border-radius:50px;font-size:.68rem;font-weight:800;font-family:'Syne',sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.12);z-index:2;}
.yorix-blog-feat-body{padding:clamp(22px,3vw,32px);display:flex;flex-direction:column;justify-content:center;}
.yorix-blog-feat-kicker{font-size:.68rem;font-weight:800;color:var(--green);letter-spacing:.1em;text-transform:uppercase;margin-bottom:10px;}
.yorix-blog-feat-title{font-family:'Syne',sans-serif;font-size:clamp(1.15rem,2vw,1.45rem);font-weight:800;color:var(--ink);margin:0 0 12px;line-height:1.22;letter-spacing:-.3px;}
.yorix-blog-feat-ex{font-size:.86rem;color:var(--gray);line-height:1.7;margin-bottom:16px;}
.yorix-blog-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px;}
.yorix-blog-tag-sm{background:var(--surface2);color:var(--gray);padding:4px 11px;border-radius:50px;font-size:.65rem;font-weight:600;}
.yorix-blog-feat-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:16px;border-top:1px solid var(--border);flex-wrap:wrap;}
.yorix-blog-author{display:flex;align-items:center;gap:10px;}
.yorix-blog-av{width:36px;height:36px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:.82rem;flex-shrink:0;}
.yorix-blog-an{font-size:.76rem;font-weight:700;color:var(--ink);}
.yorix-blog-ad{font-size:.65rem;color:var(--gray);}
.yorix-blog-btn-rd{background:var(--green);color:#fff;border:none;padding:9px 18px;border-radius:10px;font-family:'Syne',sans-serif;font-weight:800;font-size:.78rem;cursor:pointer;transition:filter .15s;}
.yorix-blog-btn-rd:hover{filter:brightness(1.08);}
.yorix-blog-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(288px,1fr));gap:18px;}
.yorix-blog-card{background:var(--surface);border:1px solid var(--border);border-radius:16px;overflow:hidden;cursor:pointer;transition:transform .2s,box-shadow .2s,border-color .2s;display:flex;flex-direction:column;}
.yorix-blog-card:hover{transform:translateY(-5px);box-shadow:0 16px 36px rgba(26,107,58,.1);border-color:var(--green-light);}
.yorix-blog-card-media{height:182px;position:relative;background:var(--green-pale);display:flex;align-items:center;justify-content:center;overflow:hidden;}
.yorix-blog-card-media img{width:100%;height:100%;object-fit:cover;}
.yorix-blog-card-emoji{font-size:3.8rem;opacity:.55;}
.yorix-blog-card-cat{position:absolute;top:12px;left:12px;background:rgba(255,255,255,.94);backdrop-filter:blur(8px);color:var(--ink);padding:5px 12px;border-radius:50px;font-size:.63rem;font-weight:800;font-family:'Syne',sans-serif;letter-spacing:.04em;}
.yorix-blog-card-read{position:absolute;top:12px;right:12px;background:rgba(0,0,0,.58);backdrop-filter:blur(8px);color:#fff;padding:4px 11px;border-radius:50px;font-size:.62rem;font-weight:700;}
.yorix-blog-card-body{padding:16px 16px 15px;flex:1;display:flex;flex-direction:column;}
.yorix-blog-card-title{font-family:'Syne',sans-serif;font-size:.98rem;font-weight:800;color:var(--ink);margin:0 0 8px;line-height:1.32;letter-spacing:-.2px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.yorix-blog-card-ex{font-size:.78rem;color:var(--gray);line-height:1.62;margin-bottom:12px;flex:1;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}
.yorix-blog-card-foot{display:flex;align-items:center;justify-content:space-between;padding-top:12px;border-top:1px solid var(--border);}
.yorix-blog-read-hint{font-size:.7rem;font-weight:800;color:var(--green);display:flex;align-items:center;gap:5px;}
.yorix-blog-nl{background:linear-gradient(135deg,var(--green-pale),#fdf6e8);border:1.5px solid var(--green-light);border-radius:16px;padding:clamp(22px,3vw,32px);margin-top:34px;text-align:center;}
.yorix-blog-nl-ico{font-size:2.4rem;margin-bottom:8px;line-height:1;}
.yorix-blog-nl-h{font-family:'Syne',sans-serif;font-size:clamp(1.05rem,2vw,1.25rem);font-weight:800;color:var(--ink);margin:0 0 8px;letter-spacing:-.3px;}
.yorix-blog-nl-p{font-size:.84rem;color:var(--gray);margin:0 auto 16px;line-height:1.65;max-width:460px;}
.yorix-blog-nl-row{display:flex;gap:8px;max-width:420px;margin:0 auto;flex-wrap:wrap;justify-content:center;}
.yorix-blog-nl-inp{flex:1;min-width:200px;padding:11px 14px;border-radius:10px;border:1.5px solid var(--border);background:var(--surface);color:var(--ink);font-family:'DM Sans',sans-serif;font-size:.85rem;outline:none;}
.yorix-blog-nl-inp:focus{border-color:var(--green);}
.yorix-blog-nl-submit{background:var(--green);color:#fff;border:none;padding:11px 22px;border-radius:10px;font-family:'Syne',sans-serif;font-weight:800;font-size:.82rem;cursor:pointer;white-space:nowrap;}

.yorix-loy-panel-guest{border-radius:clamp(18px,2vw,24px);text-align:center;color:#fff;position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.18);background:linear-gradient(135deg,#143220 0%,var(--green) 55%,#1f8f4f 100%);padding:clamp(36px,5vw,48px) clamp(22px,4vw,40px);box-shadow:0 32px 64px rgba(0,0,0,.38),inset 0 1px 0 rgba(255,255,255,.1);}
.yorix-loy-ico-big{font-size:3.75rem;line-height:1;margin-bottom:16px;text-shadow:0 8px 24px rgba(0,0,0,.25);}
.yorix-loy-h2{font-family:'Syne',sans-serif;font-size:clamp(1.45rem,2.5vw,1.85rem);font-weight:800;margin:0 0 10px;letter-spacing:-.5px;line-height:1.15;}
.yorix-loy-p{color:rgba(255,255,255,.72);font-size:.9rem;line-height:1.68;max-width:480px;margin:0 auto 22px;}
.yorix-loy-cta-row{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;}
.yorix-loy-dash-wrap{margin-bottom:4px;border-radius:clamp(20px,2.4vw,26px);padding:clamp(12px,1.9vw,18px);color:#fff;position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.2);background:linear-gradient(135deg,#0c1f14 0%,#152e1f 38%,var(--green) 64%,#1f8f51 100%);box-shadow:0 32px 64px rgba(0,0,0,.42),inset 0 1px 0 rgba(255,255,255,.12);}
.yorix-loy-dash-wrap::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 80% 55% at 18% -10%,rgba(252,209,22,.16),transparent 52%),radial-gradient(circle at 92% 88%,rgba(255,255,255,.06),transparent 42%);}
.yorix-loy-dash-deco,.yorix-loy-dash-deco--b{position:absolute;border-radius:50%;pointer-events:none;}
.yorix-loy-dash-deco{width:190px;height:190px;top:-36px;right:-36px;background:rgba(252,209,22,.1);}
.yorix-loy-dash-deco--b{width:168px;height:168px;bottom:-44px;left:-38px;background:rgba(255,255,255,.07);}
.yorix-loy-panel-guest::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 90% 70% at 50% -30%,rgba(252,209,22,.18),transparent 55%);pointer-events:none;}
.yorix-loy-guest-perks{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:20px auto 0;max-width:560px;}
.yorix-loy-guest-perk{background:rgba(255,255,255,.11);border:1px solid rgba(255,255,255,.2);border-radius:50px;padding:7px 14px;font-size:.7rem;font-weight:700;color:rgba(255,255,255,.88);letter-spacing:.02em;}
.yorix-loy-inner{position:relative;z-index:2;background:rgba(0,0,0,.14);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-radius:clamp(14px,1.8vw,17px);padding:clamp(20px,3.4vw,30px);border:1px solid rgba(255,255,255,.14);box-shadow:inset 0 1px 0 rgba(255,255,255,.08);}
.yorix-loy-kpi-head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px 20px;flex-wrap:wrap;margin-bottom:clamp(14px,2vw,18px);}
.yorix-loy-kpi-label{display:block;font-size:.61rem;font-weight:800;letter-spacing:.13em;text-transform:uppercase;color:rgba(252,209,22,.78);}
.yorix-loy-kpi-sub{font-family:'Syne',sans-serif;font-size:clamp(1.08rem,2.4vw,1.28rem);font-weight:800;color:rgba(255,255,255,.96);margin-top:6px;line-height:1.2;}
.yorix-loy-big-pts{font-family:'Syne',sans-serif;font-size:clamp(2.35rem,6vw,3.25rem);font-weight:800;color:var(--yellow);line-height:1;margin-bottom:10px;text-shadow:0 4px 32px rgba(0,0,0,.35),0 0 40px rgba(252,209,22,.2);}
.yorix-loy-big-pts .yorix-loy-pts-suffix{font-size:1.1rem;font-weight:700;color:rgba(255,255,255,.55);vertical-align:super;margin-left:4px;}
.yorix-loy-meta{font-size:.8rem;line-height:1.55;color:rgba(255,255,255,.78);margin-bottom:16px;max-width:62ch;}
.yorix-loy-meta strong{font-weight:800;color:rgba(255,255,255,.95);}
.yorix-loy-progress{height:12px;border-radius:50px;background:rgba(0,0,0,.28);overflow:hidden;box-shadow:inset 0 2px 4px rgba(0,0,0,.22);}
.yorix-loy-progress-bar{height:100%;border-radius:50px;background:linear-gradient(90deg,#c9a010,var(--yellow),#fff9c4);transition:width .85s cubic-bezier(.4,0,.2,1);box-shadow:0 0 16px rgba(252,209,22,.35);}
.yorix-loy-actions{display:flex;gap:12px;margin-top:clamp(20px,2.8vw,24px);flex-wrap:wrap;}
.yorix-loy-btn-pri,.yorix-loy-btn-sec{-webkit-appearance:none;appearance:none;display:inline-flex;align-items:center;justify-content:center;text-align:center;line-height:1.2;}
.yorix-loy-btn-pri{flex:1;min-width:min(148px,100%);background:linear-gradient(180deg,#ffe566,var(--yellow) 42%,#e8b800);color:#0d1f14;border:none;padding:13px 20px;border-radius:var(--yorix-r-md);font-family:'Syne',sans-serif;font-weight:800;font-size:.82rem;letter-spacing:.02em;cursor:pointer;box-shadow:0 10px 28px rgba(0,0,0,.26),inset 0 1px 0 rgba(255,255,255,.45);transition:transform .18s,filter .18s;}
.yorix-loy-btn-pri:hover{filter:brightness(1.05);transform:translateY(-2px);}
.yorix-loy-btn-pri:active{transform:translateY(0);}
.yorix-loy-btn-sec{flex:1;min-width:min(148px,100%);background:rgba(255,255,255,.12);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:#fff;border:1px solid rgba(255,255,255,.35);padding:13px 20px;border-radius:var(--yorix-r-md);font-family:'Syne',sans-serif;font-weight:800;font-size:.81rem;letter-spacing:.02em;cursor:pointer;transition:background .2s,border-color .2s;}
.yorix-loy-btn-sec:hover{background:rgba(255,255,255,.22);border-color:rgba(255,255,255,.5);}
.loy-page .loy-stats-grid{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:clamp(12px,1.8vw,16px)!important;margin-bottom:22px;width:100%;}
@media(max-width:900px){.loy-page .loy-stats-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;}}
@media(max-width:380px){.loy-page .loy-stats-grid{grid-template-columns:1fr!important;}}
.loy-stat-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--yorix-r-lg);padding:18px 12px;text-align:center;box-shadow:var(--yorix-sh-sm);transition:transform .18s,border-color .2s,box-shadow .2s;}
.loy-page .loy-stat-card{border-top:3px solid var(--green-mid);}
.loy-stat-card:hover{border-color:var(--green-mid);transform:translateY(-3px);box-shadow:var(--yorix-sh-md);}
.loy-stat-ico{font-size:1.85rem;line-height:1;margin-bottom:10px;filter:${e?"brightness(1.08)":"none"};}
.loy-stat-val{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(1.15rem,2.6vw,1.35rem);color:var(--ink);}
.loy-stat-lbl{font-size:.7rem;color:var(--gray);font-weight:700;margin-top:5px;text-transform:uppercase;letter-spacing:.04em;}
.loy-howto{background:linear-gradient(160deg,var(--green-pale) 0%,var(--surface) 48%);border:1px solid var(--border);border-radius:var(--yorix-r-xl);padding:clamp(22px,3vw,28px);margin-bottom:8px;box-shadow:var(--yorix-sh-md);border-top:3px solid var(--green-mid);}
.loy-howto-title{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(1.02rem,2vw,1.12rem);color:var(--green);margin-bottom:18px;display:flex;align-items:center;gap:8px;letter-spacing:-.25px;line-height:1.25;}
.loy-page .loy-howto-grid{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:clamp(14px,2vw,18px)!important;width:100%;}
@media(max-width:720px){.loy-page .loy-howto-grid{grid-template-columns:1fr!important;}}
.loy-howto-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--yorix-r-md);padding:18px 14px;text-align:center;box-shadow:var(--yorix-sh-sm);transition:border-color .2s;}
.loy-howto-card:hover{border-color:var(--green-light);}
.loy-howto-emoji{font-size:2.1rem;margin-bottom:10px;line-height:1;}
.loy-howto-h{font-family:'Syne',sans-serif;font-weight:800;font-size:.82rem;color:var(--ink);margin-bottom:6px;}
.loy-howto-d{font-size:.76rem;color:var(--gray);line-height:1.55;}
.loy-page .loy-tabs{display:flex!important;flex-wrap:nowrap;gap:6px;margin-bottom:22px;padding:6px;background:var(--surface2);border-radius:var(--yorix-r-lg);border:1px solid var(--border);box-shadow:var(--yorix-sh-sm);overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;width:100%;min-width:0;}
.loy-tabs::-webkit-scrollbar{display:none;}
.loy-tab{flex:1;min-width:fit-content;background:transparent;border:none;cursor:pointer;padding:12px 18px;border-radius:var(--yorix-r-md);font-family:'Syne',sans-serif;font-weight:700;font-size:.78rem;color:var(--gray);white-space:nowrap;transition:background .2s,color .2s,box-shadow .2s;}
.loy-tab:hover{color:var(--ink);background:var(--surface2);}
.loy-tab.is-active{background:var(--surface);color:var(--green);box-shadow:var(--yorix-sh-sm);border:1px solid var(--border);}
.loy-tab-count{opacity:.55;font-size:.72rem;font-weight:600;margin-left:4px;}
.loy-page .rewards-grid{display:grid!important;grid-template-columns:repeat(auto-fill,minmax(176px,1fr))!important;gap:16px!important;width:100%;}
.loy-page .reward-card{border-radius:var(--yorix-r-lg);padding:20px 16px;border:1px solid var(--border);box-shadow:var(--yorix-sh-sm);transition:transform .22s,box-shadow .22s,border-color .22s;}
.loy-page .reward-card:hover{transform:translateY(-4px);box-shadow:var(--yorix-sh-md);border-color:rgba(79,209,125,.45);}
.loy-page .reward-card.is-locked{opacity:.92;}
.loy-reward-val-badge{position:absolute;top:12px;right:12px;background:linear-gradient(135deg,var(--green),var(--green-mid));color:#fff;font-size:.58rem;font-weight:800;padding:5px 9px;border-radius:8px;box-shadow:0 4px 12px rgba(26,107,58,.25);}
.loy-page .reward-icon{width:56px;height:56px;margin:4px auto 12px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:1.65rem;}
.loy-page .reward-name{font-family:'Syne',sans-serif;font-weight:800;font-size:.84rem;line-height:1.25;color:var(--ink);margin-bottom:6px;}
.loy-page .reward-desc{font-size:.72rem;color:var(--gray);line-height:1.5;margin-bottom:10px;min-height:2.15em;}
.loy-page .reward-pts{font-family:'Syne',sans-serif;font-weight:800;font-size:.92rem;margin-bottom:12px;}
.loy-page .reward-btn{border-radius:var(--yorix-r-md);padding:11px;font-size:.76rem;font-weight:800;font-family:'Syne',sans-serif;transition:filter .15s,transform .15s;}
.loy-page .reward-btn:hover:not(:disabled){transform:translateY(-1px);}
.loy-page .reward-btn--afford{background:var(--green)!important;color:#fff!important;border:none!important;}
.loy-page .reward-btn--locked{background:var(--surface2)!important;color:var(--gray)!important;border:1px solid var(--border)!important;}
.loy-page .loy-packs-grid{display:grid!important;grid-template-columns:repeat(auto-fill,minmax(216px,1fr))!important;gap:18px!important;width:100%;}
.loy-pack-card{background:var(--surface);border:2px solid var(--border);border-radius:var(--yorix-r-xl);padding:22px 18px 18px;cursor:pointer;position:relative;transition:transform .22s,box-shadow .22s,border-color .22s;text-align:center;box-shadow:var(--yorix-sh-sm);}
.loy-pack-card:hover{transform:translateY(-5px);box-shadow:var(--yorix-sh-md);}
.loy-pack-card--deal{border-color:rgba(252,209,22,.65);background:linear-gradient(180deg,var(--surface) 0%,rgba(252,209,22,.07) 100%);}
.loy-pack-card--pop{border-color:rgba(39,168,90,.55);}
.loy-pack-card--new{border-color:rgba(124,58,237,.35);}
.loy-pack-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);font-size:.56rem;font-weight:800;padding:6px 14px;border-radius:50px;text-transform:uppercase;letter-spacing:.08em;font-family:'Syne',sans-serif;white-space:nowrap;box-shadow:var(--yorix-sh-sm);}
.loy-pack-badge--deal{background:var(--yellow);color:#0d1f14;}
.loy-pack-badge--pop{background:var(--green);color:#fff;}
.loy-pack-badge--new{background:#7c3aed;color:#fff;}
.loy-pack-emoji-wrap{width:72px;height:72px;border-radius:20px;display:flex;align-items:center;justify-content:center;margin:10px auto 14px;font-size:2.35rem;}
.loy-pack-title{font-family:'Syne',sans-serif;font-weight:800;font-size:.91rem;color:var(--ink);margin-bottom:8px;line-height:1.25;}
.loy-pack-pts{font-family:'Syne',sans-serif;font-size:1.6rem;font-weight:800;color:var(--green);line-height:1;}
.loy-pack-bonus{text-align:center;font-size:.72rem;color:#b45309;font-weight:700;margin-top:6px;}
.loy-pack-price{font-size:.93rem;font-weight:800;color:var(--ink);margin-top:10px;font-family:'Syne',sans-serif;}
.loy-pack-unit{font-size:.64rem;color:var(--gray);margin-top:4px;}
.loy-pack-buy{width:100%;margin-top:14px;background:var(--green);color:#fff;border:none;padding:11px;border-radius:var(--yorix-r-md);font-family:'Syne',sans-serif;font-weight:800;font-size:.76rem;pointer-events:none;box-shadow:0 6px 18px rgba(26,107,58,.28);}
.loy-history{border-radius:var(--yorix-r-lg);overflow:hidden;border:1px solid var(--border);background:var(--surface);box-shadow:var(--yorix-sh-sm);}
.loy-history-row{display:flex;align-items:center;gap:14px;padding:15px 18px;border-bottom:1px solid var(--border);transition:background .14s;}
.loy-history-row:last-child{border-bottom:none;}
.loy-history-row:hover{background:var(--surface2);}
.loy-history-ico{width:44px;height:44px;border-radius:14px;background:linear-gradient(145deg,var(--surface2),var(--surface));border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;}
.loy-history-body{flex:1;min-width:0;}
.loy-history-title{font-family:'Syne',sans-serif;font-weight:700;font-size:.85rem;color:var(--ink);}
.loy-history-sub{font-size:.71rem;color:var(--gray);margin-top:4px;line-height:1.45;}
.loy-history-pts{text-align:right;flex-shrink:0;}
.loy-history-amt{font-family:'Syne',sans-serif;font-weight:800;font-size:.98rem;}
.loy-history-amt--gain{color:var(--green);}
.loy-history-amt--loss{color:var(--red);}
.loy-history-date{font-size:.63rem;color:var(--gray);margin-top:3px;}
.loy-codes-title{font-family:'Syne',sans-serif;font-weight:800;font-size:1.05rem;color:var(--ink);margin:32px 0 14px;letter-spacing:-.3px;}
.loy-page .loy-codes-grid{display:grid!important;grid-template-columns:repeat(auto-fill,minmax(252px,1fr))!important;gap:14px!important;width:100%;}
.loy-code-card{background:var(--surface);border:2px dashed rgba(79,209,125,.65);border-radius:var(--yorix-r-md);padding:16px 18px;box-shadow:var(--yorix-sh-sm);}
.loy-code-name{font-size:.75rem;color:var(--gray);margin-bottom:8px;font-weight:600;}
.loy-code-val{font-family:'Syne',sans-serif;font-weight:800;font-size:1.08rem;color:var(--green);letter-spacing:.06em;}
.loy-code-meta{display:flex;justify-content:space-between;gap:8px;margin-top:12px;font-size:.66rem;color:var(--gray);flex-wrap:wrap;}

/* =========================================================
   YORIX REWARDS — Refonte premium (V2)
   prefix: .yorix-loy-v2 / .yloy-*
   ========================================================= */
.yorix-loy-v2{display:block;background:${e?"linear-gradient(180deg,#0a1410 0%,#0d1a12 100%)":"linear-gradient(180deg,#fbfaf7 0%,#f3efe7 100%)"};color:var(--ink);padding:0 0 clamp(40px,6vw,72px);overflow-x:hidden;}
.yorix-loy-v2 .yloy-section-inner{max-width:1200px;margin:0 auto;padding:0 clamp(16px,3vw,28px);width:100%;box-sizing:border-box;}
.yorix-loy-v2 .yloy-section{padding:clamp(40px,6vw,72px) 0;position:relative;}
.yorix-loy-v2 .yloy-section--tinted{background:${e?"linear-gradient(180deg,#0d1a12 0%,#101f17 50%,#0d1a12 100%)":"linear-gradient(180deg,#fbfaf7 0%,#eef1ec 50%,#fbfaf7 100%)"};}

.yorix-loy-v2 .yloy-eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'Syne',sans-serif;font-size:.7rem;font-weight:800;color:var(--green);text-transform:uppercase;letter-spacing:.16em;margin-bottom:14px;}
.yorix-loy-v2 .yloy-eyebrow--on-dark{color:rgba(252,209,22,.85);}
.yorix-loy-v2 .yloy-eyebrow-dot{width:7px;height:7px;border-radius:50%;background:var(--yellow);box-shadow:0 0 14px rgba(252,209,22,.65);}
.yorix-loy-v2 .yloy-h1{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(2rem,5.2vw,3.4rem);line-height:1.06;letter-spacing:-1.4px;margin:0 0 16px;color:#fff;text-wrap:balance;}
.yorix-loy-v2 .yloy-h1 em{font-style:normal;background:linear-gradient(135deg,#ffe566 0%,var(--yellow) 50%,#f1b805 100%);-webkit-background-clip:text;background-clip:text;color:transparent;}
.yorix-loy-v2 .yloy-h2{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(1.45rem,3vw,2.05rem);line-height:1.12;letter-spacing:-.7px;color:var(--ink);margin:0 0 12px;text-wrap:balance;}
.yorix-loy-v2 .yloy-h2 em{font-style:normal;color:var(--green);}
.yorix-loy-v2 .yloy-h2--on-dark{color:#fff;}
.yorix-loy-v2 .yloy-h2--on-dark em{background:linear-gradient(135deg,#ffe566,var(--yellow));-webkit-background-clip:text;background-clip:text;color:transparent;}
.yorix-loy-v2 .yloy-h2--center{text-align:center;}
.yorix-loy-v2 .yloy-sub{font-size:clamp(.92rem,1.6vw,1.02rem);line-height:1.7;color:rgba(255,255,255,.72);margin:0 0 22px;max-width:54ch;}
.yorix-loy-v2 .yloy-sub--on-dark{color:rgba(255,255,255,.74);}
.yorix-loy-v2 .yloy-sub strong{color:#fff;font-weight:700;}
.yorix-loy-v2 .yloy-lead{font-size:clamp(.88rem,1.4vw,.95rem);line-height:1.7;color:var(--gray);max-width:62ch;margin:0;}
.yorix-loy-v2 .yloy-lead--center{margin:0 auto 22px;text-align:center;}

.yorix-loy-v2 .yloy-section-head{margin-bottom:clamp(26px,3.4vw,38px);}
.yorix-loy-v2 .yloy-section-head .yloy-h2{margin-bottom:10px;}

/* ───────── HERO ───────── */
.yorix-loy-v2 .yloy-hero{position:relative;padding:clamp(28px,4vw,40px) 0 clamp(48px,7vw,84px);background:linear-gradient(135deg,#070d0a 0%,#0a1f14 28%,#0d3320 58%,var(--green) 100%);color:#fff;overflow:hidden;isolation:isolate;}
.yorix-loy-v2 .yloy-hero-fx{position:absolute;inset:0;z-index:0;pointer-events:none;}
.yorix-loy-v2 .yloy-hero-glow{position:absolute;border-radius:50%;filter:blur(60px);opacity:.6;}
.yorix-loy-v2 .yloy-hero-glow--a{width:520px;height:520px;top:-120px;right:-120px;background:radial-gradient(circle,rgba(252,209,22,.35),transparent 65%);}
.yorix-loy-v2 .yloy-hero-glow--b{width:420px;height:420px;bottom:-160px;left:-80px;background:radial-gradient(circle,rgba(79,209,125,.32),transparent 65%);}
.yorix-loy-v2 .yloy-hero-grid-deco{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse 80% 60% at 50% 50%,#000 0%,transparent 80%);-webkit-mask-image:radial-gradient(ellipse 80% 60% at 50% 50%,#000 0%,transparent 80%);opacity:.45;}
.yorix-loy-v2 .yloy-hero-inner{position:relative;z-index:1;}
.yorix-loy-v2 .yloy-hero-bc{margin-bottom:clamp(20px,3vw,28px);}
.yorix-loy-v2 .yloy-hero-bc .yorix-bc__list{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-radius:999px;padding:9px 18px;width:fit-content;}
.yorix-loy-v2 .yloy-hero-bc .yorix-bc__link{color:#b7e4c7;}
.yorix-loy-v2 .yloy-hero-bc .yorix-bc__current{color:rgba(255,255,255,.7);}
.yorix-loy-v2 .yloy-hero-bc .yorix-bc__sep{color:rgba(255,255,255,.35);opacity:1;}
.yorix-loy-v2 .yloy-hero-grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:clamp(28px,4vw,56px);align-items:center;}
@media (max-width:920px){.yorix-loy-v2 .yloy-hero-grid{grid-template-columns:1fr;gap:36px;}}
.yorix-loy-v2 .yloy-hero-left{min-width:0;}
.yorix-loy-v2 .yloy-hero-right{position:relative;display:flex;justify-content:center;align-items:center;min-width:0;}

.yorix-loy-v2 .yloy-hero-perks{list-style:none;margin:0 0 26px;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 14px;}
@media (max-width:520px){.yorix-loy-v2 .yloy-hero-perks{grid-template-columns:1fr;}}
.yorix-loy-v2 .yloy-hero-perks li{display:inline-flex;align-items:center;gap:10px;color:rgba(255,255,255,.85);font-size:.86rem;line-height:1.4;}
.yorix-loy-v2 .yloy-hero-perks li strong{font-weight:700;color:#fff;margin-right:4px;}
.yorix-loy-v2 .yloy-hero-perks li > span{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:9px;background:rgba(252,209,22,.16);border:1px solid rgba(252,209,22,.32);font-size:.95rem;}

.yorix-loy-v2 .yloy-hero-cta{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:24px;}
.yorix-loy-v2 .yloy-btn{display:inline-flex;align-items:center;justify-content:center;text-align:center;line-height:1.2;cursor:pointer;padding:14px 22px;border-radius:12px;font-family:'Syne',sans-serif;font-weight:800;font-size:.84rem;letter-spacing:.02em;border:none;transition:transform .18s ease,filter .18s ease,background .18s ease,border-color .18s ease,box-shadow .18s ease;-webkit-appearance:none;appearance:none;}
.yorix-loy-v2 .yloy-btn--pri{background:linear-gradient(180deg,#ffe566,var(--yellow) 45%,#e8b800);color:#0d1f14;box-shadow:0 12px 30px rgba(252,209,22,.32),inset 0 1px 0 rgba(255,255,255,.5);}
.yorix-loy-v2 .yloy-btn--pri:hover{filter:brightness(1.06);transform:translateY(-2px);box-shadow:0 16px 36px rgba(252,209,22,.4),inset 0 1px 0 rgba(255,255,255,.55);}
.yorix-loy-v2 .yloy-btn--pri:active{transform:translateY(0);}
.yorix-loy-v2 .yloy-btn--sec{background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.32);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);}
.yorix-loy-v2 .yloy-btn--sec:hover{background:rgba(255,255,255,.18);border-color:rgba(255,255,255,.5);transform:translateY(-2px);}
.yorix-loy-v2 .yloy-btn--ghost{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.34);}
.yorix-loy-v2 .yloy-btn--ghost:hover{background:rgba(255,255,255,.08);border-color:#fff;}

.yorix-loy-v2 .yloy-hero-trust{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:8px 14px;color:rgba(255,255,255,.62);font-size:.75rem;}
.yorix-loy-v2 .yloy-hero-trust li{display:inline-flex;align-items:center;gap:6px;}

/* ───────── VIP CARD ───────── */
.yorix-loy-v2 .yloy-vipcard{position:relative;z-index:2;width:min(420px,100%);background:linear-gradient(135deg,#0c1f14 0%,#163a23 45%,var(--green) 100%);border:1px solid rgba(255,255,255,.18);border-radius:24px;padding:clamp(20px,2.8vw,28px);color:#fff;box-shadow:0 40px 80px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.14);overflow:hidden;transform:perspective(1200px) rotateY(-6deg) rotateX(2deg);transition:transform .4s cubic-bezier(.2,.8,.2,1);}
.yorix-loy-v2 .yloy-vipcard:hover{transform:perspective(1200px) rotateY(-3deg) rotateX(1deg) translateY(-4px);}
.yorix-loy-v2 .yloy-vipcard-shine{position:absolute;inset:0;background:linear-gradient(115deg,transparent 35%,rgba(255,255,255,.12) 50%,transparent 65%);pointer-events:none;animation:yloyShine 5.2s ease-in-out infinite;}
@keyframes yloyShine{0%,100%{transform:translateX(-30%);}50%{transform:translateX(30%);}}
.yorix-loy-v2 .yloy-vipcard-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:24px;position:relative;z-index:1;}
.yorix-loy-v2 .yloy-vipcard-brand{display:flex;align-items:center;gap:10px;}
.yorix-loy-v2 .yloy-vipcard-logo{width:38px;height:38px;border-radius:11px;background:linear-gradient(135deg,var(--yellow),#e8b800);color:#0d1f14;display:inline-flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:1.15rem;box-shadow:0 6px 16px rgba(252,209,22,.4);}
.yorix-loy-v2 .yloy-vipcard-name{font-family:'Syne',sans-serif;font-weight:800;font-size:.78rem;letter-spacing:.18em;color:rgba(255,255,255,.78);}
.yorix-loy-v2 .yloy-vipcard-name em{font-style:normal;color:var(--yellow);}
.yorix-loy-v2 .yloy-vipcard-mid{position:relative;z-index:1;}
.yorix-loy-v2 .yloy-vipcard-lbl{font-size:.65rem;font-weight:800;text-transform:uppercase;letter-spacing:.16em;color:rgba(255,255,255,.55);margin-bottom:6px;}
.yorix-loy-v2 .yloy-vipcard-pts{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(2.2rem,5.4vw,3rem);line-height:1;color:var(--yellow);text-shadow:0 4px 24px rgba(252,209,22,.4);margin-bottom:8px;}
.yorix-loy-v2 .yloy-vipcard-pts small{font-size:1rem;font-weight:700;color:rgba(255,255,255,.55);margin-left:4px;vertical-align:super;}
.yorix-loy-v2 .yloy-vipcard-meta{font-size:.78rem;color:rgba(255,255,255,.72);margin-bottom:14px;line-height:1.45;}
.yorix-loy-v2 .yloy-vipcard-meta strong{color:#fff;font-weight:700;}
.yorix-loy-v2 .yloy-vipcard-progress{height:9px;border-radius:50px;background:rgba(0,0,0,.32);overflow:hidden;box-shadow:inset 0 2px 4px rgba(0,0,0,.3);margin-bottom:22px;}
.yorix-loy-v2 .yloy-vipcard-progress-bar{height:100%;border-radius:50px;background:linear-gradient(90deg,#c9a010,var(--yellow),#fff9c4);box-shadow:0 0 14px rgba(252,209,22,.5);transition:width .8s cubic-bezier(.4,0,.2,1);}
.yorix-loy-v2 .yloy-vipcard-foot{display:flex;justify-content:space-between;gap:12px;position:relative;z-index:1;padding-top:14px;border-top:1px solid rgba(255,255,255,.14);}
.yorix-loy-v2 .yloy-vipcard-flbl{font-size:.6rem;font-weight:800;text-transform:uppercase;letter-spacing:.14em;color:rgba(255,255,255,.5);margin-bottom:3px;}
.yorix-loy-v2 .yloy-vipcard-fval{font-family:'Syne',sans-serif;font-weight:700;font-size:.82rem;color:#fff;letter-spacing:.04em;}

.yorix-loy-v2 .yloy-orbit{position:absolute;border-radius:50%;pointer-events:none;z-index:0;}
.yorix-loy-v2 .yloy-orbit--a{width:140px;height:140px;top:-30px;right:30px;background:rgba(252,209,22,.18);filter:blur(40px);}
.yorix-loy-v2 .yloy-orbit--b{width:180px;height:180px;bottom:-30px;left:-20px;background:rgba(79,209,125,.22);filter:blur(50px);}

/* ───────── EARN GRID ───────── */
.yorix-loy-v2 .yloy-earn-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(14px,2vw,20px);}
@media (max-width:980px){.yorix-loy-v2 .yloy-earn-grid{grid-template-columns:repeat(2,minmax(0,1fr));}}
@media (max-width:520px){.yorix-loy-v2 .yloy-earn-grid{grid-template-columns:1fr;}}
.yorix-loy-v2 .yloy-earn-card{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:clamp(20px,2.4vw,26px) clamp(18px,2vw,22px);box-shadow:${e?"0 14px 32px rgba(0,0,0,.32)":"0 14px 34px rgba(13,31,20,.06)"};transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease;position:relative;overflow:hidden;}
.yorix-loy-v2 .yloy-earn-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--green),var(--green-light));transform:scaleX(.35);transform-origin:left;transition:transform .35s ease;}
.yorix-loy-v2 .yloy-earn-card:hover{transform:translateY(-5px);box-shadow:${e?"0 22px 48px rgba(0,0,0,.42)":"0 22px 48px rgba(13,31,20,.1)"};border-color:rgba(79,209,125,.4);}
.yorix-loy-v2 .yloy-earn-card:hover::before{transform:scaleX(1);}
.yorix-loy-v2 .yloy-earn-emoji{font-size:2.2rem;line-height:1;margin-bottom:14px;display:inline-flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:16px;background:linear-gradient(135deg,${e?"#1c2e22":"#f0fff5"},${e?"#152118":"#e2f7ec"});border:1px solid var(--border);}
.yorix-loy-v2 .yloy-earn-t{font-family:'Syne',sans-serif;font-weight:800;font-size:1rem;color:var(--ink);margin:0 0 8px;letter-spacing:-.3px;}
.yorix-loy-v2 .yloy-earn-d{font-size:.82rem;line-height:1.6;color:var(--gray);margin:0 0 14px;}
.yorix-loy-v2 .yloy-earn-pts{display:inline-flex;align-items:center;background:var(--green-pale);color:var(--green);border:1px solid rgba(39,168,90,.32);padding:5px 12px;border-radius:999px;font-family:'Syne',sans-serif;font-weight:800;font-size:.7rem;letter-spacing:.04em;}

/* ───────── TIERS ───────── */
.yorix-loy-v2 .yloy-tiers{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(14px,2vw,20px);}
@media (max-width:980px){.yorix-loy-v2 .yloy-tiers{grid-template-columns:repeat(2,minmax(0,1fr));}}
@media (max-width:560px){.yorix-loy-v2 .yloy-tiers{grid-template-columns:1fr;}}
.yorix-loy-v2 .yloy-tier{--tier-color:#CD7F32;background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:clamp(22px,2.6vw,28px) clamp(18px,2vw,22px) clamp(20px,2.4vw,24px);position:relative;transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease;overflow:hidden;}
.yorix-loy-v2 .yloy-tier::before{content:'';position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(90deg,var(--tier-color),color-mix(in srgb,var(--tier-color) 60%,#fff));}
.yorix-loy-v2 .yloy-tier:hover{transform:translateY(-4px);box-shadow:${e?"0 22px 48px rgba(0,0,0,.42)":"0 22px 48px rgba(13,31,20,.1)"};border-color:color-mix(in srgb,var(--tier-color) 45%,var(--border));}
.yorix-loy-v2 .yloy-tier.is-current{border-color:var(--tier-color);box-shadow:0 0 0 4px color-mix(in srgb,var(--tier-color) 18%,transparent),0 22px 48px rgba(0,0,0,.14);}
.yorix-loy-v2 .yloy-tier-now{position:absolute;top:14px;right:14px;background:linear-gradient(135deg,var(--green),var(--green-mid));color:#fff;font-family:'Syne',sans-serif;font-size:.6rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;padding:4px 10px;border-radius:999px;box-shadow:0 6px 14px rgba(26,107,58,.3);}
.yorix-loy-v2 .yloy-tier-emoji{font-size:2.4rem;line-height:1;margin-bottom:12px;}
.yorix-loy-v2 .yloy-tier-name{font-family:'Syne',sans-serif;font-weight:800;font-size:1.15rem;color:var(--tier-color);margin:0 0 6px;letter-spacing:-.4px;}
.yorix-loy-v2 .yloy-tier-thresh{font-size:.74rem;font-weight:700;color:var(--gray);margin-bottom:12px;text-transform:uppercase;letter-spacing:.06em;}
.yorix-loy-v2 .yloy-tier-pitch{font-size:.82rem;line-height:1.6;color:var(--ink);margin:0 0 14px;}
.yorix-loy-v2 .yloy-tier-perks{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px;}
.yorix-loy-v2 .yloy-tier-perks li{display:flex;align-items:flex-start;gap:8px;font-size:.78rem;line-height:1.45;color:var(--gray);}
.yorix-loy-v2 .yloy-tier-perks li span{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;background:color-mix(in srgb,var(--tier-color) 18%,transparent);color:var(--tier-color);font-weight:800;font-size:.62rem;}

/* ───────── REFERRAL ───────── */
.yorix-loy-v2 .yloy-referral{position:relative;background:linear-gradient(135deg,#0a1f14 0%,#143b25 50%,var(--green) 100%);border-radius:24px;padding:clamp(28px,3.6vw,42px) clamp(24px,3vw,36px);color:#fff;display:grid;grid-template-columns:1.1fr .9fr;gap:clamp(24px,3vw,36px);align-items:center;overflow:hidden;box-shadow:0 28px 64px rgba(0,0,0,.32),inset 0 1px 0 rgba(255,255,255,.1);}
@media (max-width:820px){.yorix-loy-v2 .yloy-referral{grid-template-columns:1fr;padding:clamp(24px,4vw,32px);}}
.yorix-loy-v2 .yloy-referral-fx{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 90% 10%,rgba(252,209,22,.22),transparent 50%),radial-gradient(circle at 10% 90%,rgba(79,209,125,.2),transparent 55%);}
.yorix-loy-v2 .yloy-referral-left{position:relative;z-index:1;}
.yorix-loy-v2 .yloy-referral-right{position:relative;z-index:1;background:rgba(0,0,0,.22);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.16);border-radius:16px;padding:clamp(18px,2vw,22px);}
.yorix-loy-v2 .yloy-referral-lbl{display:block;font-family:'Syne',sans-serif;font-size:.65rem;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:10px;}
.yorix-loy-v2 .yloy-referral-row{display:flex;gap:8px;flex-wrap:wrap;}
.yorix-loy-v2 .yloy-referral-inp{flex:1;min-width:200px;padding:13px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.08);color:#fff;font-family:'DM Sans',sans-serif;font-size:.86rem;outline:none;}
.yorix-loy-v2 .yloy-referral-inp:focus{border-color:var(--yellow);background:rgba(255,255,255,.14);}
.yorix-loy-v2 .yloy-referral-btn{flex-shrink:0;}
.yorix-loy-v2 .yloy-referral-meta{margin-top:12px;font-size:.74rem;color:rgba(255,255,255,.55);line-height:1.5;}

/* ───────── NEWSLETTER ───────── */
.yorix-loy-v2 .yloy-nl{position:relative;background:${e?"linear-gradient(160deg,#152118 0%,#1c2e22 100%)":"linear-gradient(160deg,#ffffff 0%,#fbf9f3 100%)"};border:1px solid var(--border);border-radius:24px;padding:clamp(32px,4vw,48px) clamp(22px,3vw,40px);text-align:center;box-shadow:${e?"0 24px 56px rgba(0,0,0,.36)":"0 24px 56px rgba(13,31,20,.08)"};overflow:hidden;}
.yorix-loy-v2 .yloy-nl::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--yellow),var(--green),var(--yellow));}
.yorix-loy-v2 .yloy-nl::after{content:'';position:absolute;bottom:-100px;right:-80px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(252,209,22,.12),transparent 70%);pointer-events:none;}
.yorix-loy-v2 .yloy-nl-ico{font-size:2.6rem;line-height:1;margin-bottom:14px;position:relative;z-index:1;}
.yorix-loy-v2 .yloy-nl .yloy-h2{margin-bottom:10px;position:relative;z-index:1;}
.yorix-loy-v2 .yloy-nl .yloy-lead{position:relative;z-index:1;}
.yorix-loy-v2 .yloy-nl-form{display:flex;gap:10px;max-width:520px;margin:20px auto 14px;flex-wrap:wrap;position:relative;z-index:1;}
.yorix-loy-v2 .yloy-nl-input{flex:1;min-width:220px;padding:14px 16px;border-radius:12px;border:1.5px solid var(--border);background:var(--surface);color:var(--ink);font-family:'DM Sans',sans-serif;font-size:.92rem;outline:none;transition:border-color .18s,box-shadow .18s;}
.yorix-loy-v2 .yloy-nl-input:focus{border-color:var(--green);box-shadow:0 0 0 4px rgba(39,168,90,.18);}
.yorix-loy-v2 .yloy-nl-submit{padding:14px 24px;}
.yorix-loy-v2 .yloy-nl-note{font-size:.74rem;color:var(--gray);line-height:1.5;position:relative;z-index:1;}

/* ───────── FAQ ───────── */
.yorix-loy-v2 .yloy-faq{display:flex;flex-direction:column;gap:10px;max-width:860px;margin:0 auto;}
.yorix-loy-v2 .yloy-faq-item{background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden;transition:border-color .2s,box-shadow .2s;}
.yorix-loy-v2 .yloy-faq-item:hover{border-color:var(--green-mid);}
.yorix-loy-v2 .yloy-faq-item[open]{border-color:var(--green);box-shadow:${e?"0 10px 28px rgba(0,0,0,.32)":"0 10px 28px rgba(26,107,58,.08)"};}
.yorix-loy-v2 .yloy-faq-item summary{cursor:pointer;padding:18px 56px 18px 22px;font-family:'Syne',sans-serif;font-weight:800;font-size:.92rem;color:var(--ink);position:relative;list-style:none;line-height:1.4;}
.yorix-loy-v2 .yloy-faq-item summary::-webkit-details-marker{display:none;}
.yorix-loy-v2 .yloy-faq-item summary::after{content:'+';position:absolute;right:20px;top:50%;transform:translateY(-50%);font-family:'Syne',sans-serif;font-weight:800;font-size:1.45rem;color:var(--green);transition:transform .25s ease;width:28px;height:28px;border-radius:50%;background:var(--green-pale);display:inline-flex;align-items:center;justify-content:center;}
.yorix-loy-v2 .yloy-faq-item[open] summary::after{transform:translateY(-50%) rotate(45deg);}
.yorix-loy-v2 .yloy-faq-item p{margin:0;padding:0 22px 20px;font-size:.86rem;line-height:1.72;color:var(--gray);}

/* ───────── FINAL CTA ───────── */
.yorix-loy-v2 .yloy-final-cta{background:linear-gradient(135deg,#0a1f14 0%,#143b25 50%,var(--green) 100%);border-radius:24px;padding:clamp(28px,3.6vw,42px) clamp(24px,3vw,36px);color:#fff;display:flex;align-items:center;justify-content:space-between;gap:clamp(22px,3vw,32px);flex-wrap:wrap;box-shadow:0 28px 64px rgba(0,0,0,.32);}
.yorix-loy-v2 .yloy-final-cta .yloy-h2{margin-bottom:6px;}
.yorix-loy-v2 .yloy-final-cta-actions{display:flex;gap:10px;flex-wrap:wrap;}

/* ───────── EMBEDDED LEGACY (tabs/grids) RAFFINEMENT ───────── */
.yorix-loy-v2 .loy-stats-grid{margin-top:0;margin-bottom:clamp(22px,2.6vw,28px);}
.yorix-loy-v2 .loy-tabs{margin-bottom:clamp(22px,2.6vw,28px);}
.yorix-loy-v2 .loy-stat-card{padding:clamp(18px,2.2vw,22px) 12px;}
.yorix-loy-v2 .loy-stat-val{font-size:clamp(1.3rem,2.8vw,1.55rem);}
.yorix-loy-v2 .empty-state{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:clamp(36px,5vw,56px) 24px;}
.yorix-loy-v2 .empty-icon{font-size:3rem;margin-bottom:14px;line-height:1;}

/* Compatibilité avec anciennes pages : si on revient sur .sec wrapper, on désactive */
.yorix-loy-v2.sec{max-width:none!important;padding:0!important;margin:0!important;}


/* =========================================================
   YORIX JOURNAL — Refonte premium magazine (V2)
   prefix: .yorix-blog-v2 / .yblog-*
   ========================================================= */
.yorix-blog-v2{display:block;background:${e?"linear-gradient(180deg,#0a1410 0%,#0d1a12 100%)":"linear-gradient(180deg,#fbfaf7 0%,#f3efe7 100%)"};color:var(--ink);padding:0 0 clamp(40px,6vw,72px);overflow-x:hidden;}
.yorix-blog-v2 .yblog-section-inner{max-width:1200px;margin:0 auto;padding:0 clamp(16px,3vw,28px);width:100%;box-sizing:border-box;}
.yorix-blog-v2 .yblog-section{padding:clamp(40px,6vw,72px) 0;position:relative;}
.yorix-blog-v2 .yblog-section--cats{padding:clamp(28px,4vw,40px) 0 clamp(12px,2vw,18px);}
.yorix-blog-v2 .yblog-section--tinted{background:${e?"linear-gradient(180deg,#0d1a12 0%,#101f17 50%,#0d1a12 100%)":"linear-gradient(180deg,#fbfaf7 0%,#eef1ec 50%,#fbfaf7 100%)"};}

/* Eyebrow / typo system */
.yorix-blog-v2 .yblog-eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'Syne',sans-serif;font-size:.7rem;font-weight:800;color:var(--green);text-transform:uppercase;letter-spacing:.16em;margin-bottom:14px;}
.yorix-blog-v2 .yblog-eyebrow--on-dark{color:rgba(252,209,22,.85);}
.yorix-blog-v2 .yblog-eyebrow-dot{width:7px;height:7px;border-radius:50%;background:var(--yellow);box-shadow:0 0 14px rgba(252,209,22,.65);}
.yorix-blog-v2 .yblog-h1{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(2rem,5.2vw,3.4rem);line-height:1.06;letter-spacing:-1.4px;margin:0 0 16px;color:#fff;text-wrap:balance;}
.yorix-blog-v2 .yblog-h1 em{font-style:normal;background:linear-gradient(135deg,#ffe566 0%,var(--yellow) 50%,#f1b805 100%);-webkit-background-clip:text;background-clip:text;color:transparent;}
.yorix-blog-v2 .yblog-h2{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(1.45rem,3vw,2.05rem);line-height:1.12;letter-spacing:-.7px;color:var(--ink);margin:0 0 12px;text-wrap:balance;}
.yorix-blog-v2 .yblog-h2 em{font-style:normal;color:var(--green);}
.yorix-blog-v2 .yblog-h2--on-dark{color:#fff;}
.yorix-blog-v2 .yblog-h2--on-dark em{background:linear-gradient(135deg,#ffe566,var(--yellow));-webkit-background-clip:text;background-clip:text;color:transparent;}
.yorix-blog-v2 .yblog-h2--center{text-align:center;}
.yorix-blog-v2 .yblog-h2-sm{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(1.2rem,2.2vw,1.5rem);line-height:1.18;letter-spacing:-.5px;color:var(--ink);margin:0;}
.yorix-blog-v2 .yblog-h2-sm em{font-style:normal;color:var(--green);}
.yorix-blog-v2 .yblog-sub{font-size:clamp(.92rem,1.6vw,1.02rem);line-height:1.7;color:rgba(255,255,255,.72);margin:0 0 22px;max-width:56ch;}
.yorix-blog-v2 .yblog-sub--on-dark{color:rgba(255,255,255,.74);}
.yorix-blog-v2 .yblog-sub strong{color:#fff;font-weight:700;}
.yorix-blog-v2 .yblog-lead{font-size:clamp(.88rem,1.4vw,.95rem);line-height:1.7;color:var(--gray);max-width:62ch;margin:0;}
.yorix-blog-v2 .yblog-lead--center{margin:0 auto 22px;text-align:center;}

/* Buttons */
.yorix-blog-v2 .yblog-btn{display:inline-flex;align-items:center;justify-content:center;text-align:center;line-height:1.2;cursor:pointer;padding:14px 22px;border-radius:12px;font-family:'Syne',sans-serif;font-weight:800;font-size:.84rem;letter-spacing:.02em;border:none;transition:transform .18s ease,filter .18s ease,background .18s ease,border-color .18s ease,box-shadow .18s ease;-webkit-appearance:none;appearance:none;}
.yorix-blog-v2 .yblog-btn--pri{background:linear-gradient(180deg,#ffe566,var(--yellow) 45%,#e8b800);color:#0d1f14;box-shadow:0 12px 30px rgba(252,209,22,.32),inset 0 1px 0 rgba(255,255,255,.5);}
.yorix-blog-v2 .yblog-btn--pri:hover{filter:brightness(1.06);transform:translateY(-2px);box-shadow:0 16px 36px rgba(252,209,22,.4),inset 0 1px 0 rgba(255,255,255,.55);}
.yorix-blog-v2 .yblog-btn--pri:active{transform:translateY(0);}
.yorix-blog-v2 .yblog-btn--sec{background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.32);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);}
.yorix-blog-v2 .yblog-btn--sec:hover{background:rgba(255,255,255,.18);border-color:rgba(255,255,255,.5);transform:translateY(-2px);}
.yorix-blog-v2 .yblog-btn--ghost{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.34);}
.yorix-blog-v2 .yblog-btn--ghost:hover{background:rgba(255,255,255,.08);border-color:#fff;}
.yorix-blog-v2 .yblog-btn--ghost-dark{background:transparent;color:var(--ink);border:1.5px solid var(--border);}
.yorix-blog-v2 .yblog-btn--ghost-dark:hover{border-color:var(--green-mid);color:var(--green);background:var(--green-pale);}

/* ───────── HERO ───────── */
.yorix-blog-v2 .yblog-hero{position:relative;padding:clamp(28px,4vw,40px) 0 clamp(48px,7vw,84px);background:linear-gradient(135deg,#070d0a 0%,#0a1f14 28%,#0d3320 58%,var(--green) 100%);color:#fff;overflow:hidden;isolation:isolate;}
.yorix-blog-v2 .yblog-hero-fx{position:absolute;inset:0;z-index:0;pointer-events:none;}
.yorix-blog-v2 .yblog-hero-glow{position:absolute;border-radius:50%;filter:blur(60px);opacity:.6;}
.yorix-blog-v2 .yblog-hero-glow--a{width:520px;height:520px;top:-120px;right:-120px;background:radial-gradient(circle,rgba(252,209,22,.32),transparent 65%);}
.yorix-blog-v2 .yblog-hero-glow--b{width:420px;height:420px;bottom:-160px;left:-80px;background:radial-gradient(circle,rgba(79,209,125,.3),transparent 65%);}
.yorix-blog-v2 .yblog-hero-grid-deco{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse 80% 60% at 50% 50%,#000 0%,transparent 80%);-webkit-mask-image:radial-gradient(ellipse 80% 60% at 50% 50%,#000 0%,transparent 80%);opacity:.45;}
.yorix-blog-v2 .yblog-hero-inner{position:relative;z-index:1;}
.yorix-blog-v2 .yblog-hero-bc{margin-bottom:clamp(20px,3vw,28px);}
.yorix-blog-v2 .yblog-hero-bc .yorix-bc__list{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-radius:999px;padding:9px 18px;width:fit-content;}
.yorix-blog-v2 .yblog-hero-bc .yorix-bc__link{color:#b7e4c7;}
.yorix-blog-v2 .yblog-hero-bc .yorix-bc__current{color:rgba(255,255,255,.7);}
.yorix-blog-v2 .yblog-hero-bc .yorix-bc__sep{color:rgba(255,255,255,.35);opacity:1;}
.yorix-blog-v2 .yblog-hero-grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:clamp(28px,4vw,56px);align-items:center;}
@media (max-width:920px){.yorix-blog-v2 .yblog-hero-grid{grid-template-columns:1fr;gap:36px;}}
.yorix-blog-v2 .yblog-hero-left{min-width:0;}
.yorix-blog-v2 .yblog-hero-right{position:relative;display:flex;justify-content:center;align-items:center;min-width:0;}

/* Hero search */
.yorix-blog-v2 .yblog-hero-search{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-radius:14px;padding:6px 14px;margin:0 0 20px;max-width:520px;transition:border-color .2s,background .2s,box-shadow .2s;}
.yorix-blog-v2 .yblog-hero-search:focus-within{border-color:var(--yellow);background:rgba(255,255,255,.14);box-shadow:0 0 0 4px rgba(252,209,22,.18);}
.yorix-blog-v2 .yblog-hero-search-ico{font-size:1rem;color:rgba(255,255,255,.7);flex-shrink:0;}
.yorix-blog-v2 .yblog-hero-search input{flex:1;min-width:0;background:transparent;border:none;outline:none;color:#fff;padding:12px 4px;font-family:'DM Sans',sans-serif;font-size:.92rem;}
.yorix-blog-v2 .yblog-hero-search input::placeholder{color:rgba(255,255,255,.5);}
.yorix-blog-v2 .yblog-hero-search-clear{background:rgba(255,255,255,.18);border:none;color:#fff;width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:1.2rem;line-height:1;display:inline-flex;align-items:center;justify-content:center;transition:background .2s;}
.yorix-blog-v2 .yblog-hero-search-clear:hover{background:rgba(255,255,255,.3);}

/* Hero theme pills */
.yorix-blog-v2 .yblog-hero-themes{list-style:none;margin:0 0 24px;padding:0;display:flex;flex-wrap:wrap;gap:8px;}
.yorix-blog-v2 .yblog-hero-theme{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.92);padding:8px 14px;border-radius:999px;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:.78rem;font-weight:600;transition:background .2s,border-color .2s,transform .15s;}
.yorix-blog-v2 .yblog-hero-theme:hover{background:rgba(255,255,255,.14);border-color:rgba(252,209,22,.5);transform:translateY(-1px);}

.yorix-blog-v2 .yblog-hero-trust{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:8px 14px;color:rgba(255,255,255,.62);font-size:.75rem;}
.yorix-blog-v2 .yblog-hero-trust li{display:inline-flex;align-items:center;gap:6px;}

/* Hero featured card */
.yorix-blog-v2 .yblog-hero-feat{position:relative;z-index:2;width:min(440px,100%);background:${e?"#152118":"#fff"};border:1px solid ${e?"rgba(255,255,255,.14)":"rgba(0,0,0,.06)"};border-radius:24px;overflow:hidden;cursor:pointer;box-shadow:0 40px 80px rgba(0,0,0,.45);transform:perspective(1400px) rotateY(-5deg) rotateX(2deg);transition:transform .4s cubic-bezier(.2,.8,.2,1),box-shadow .3s ease;}
.yorix-blog-v2 .yblog-hero-feat:hover{transform:perspective(1400px) rotateY(-2deg) rotateX(1deg) translateY(-4px);box-shadow:0 48px 90px rgba(0,0,0,.5);}
.yorix-blog-v2 .yblog-hero-feat:focus-visible{outline:3px solid var(--yellow);outline-offset:4px;}
.yorix-blog-v2 .yblog-hero-feat-shine{position:absolute;inset:0;background:linear-gradient(115deg,transparent 35%,rgba(255,255,255,.1) 50%,transparent 65%);pointer-events:none;animation:yblogShine 6s ease-in-out infinite;z-index:3;}
@keyframes yblogShine{0%,100%{transform:translateX(-30%);}50%{transform:translateX(30%);}}
.yorix-blog-v2 .yblog-hero-feat-media{position:relative;width:100%;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;overflow:hidden;}
.yorix-blog-v2 .yblog-hero-feat-media img{width:100%;height:100%;object-fit:cover;}
.yorix-blog-v2 .yblog-hero-feat-fallback{font-size:5rem;opacity:.5;}
.yorix-blog-v2 .yblog-hero-feat-pin{position:absolute;top:14px;left:14px;background:linear-gradient(135deg,#ffe566,var(--yellow));color:#0d1f14;padding:6px 14px;border-radius:50px;font-family:'Syne',sans-serif;font-size:.65rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;box-shadow:0 6px 14px rgba(252,209,22,.45);z-index:2;}
.yorix-blog-v2 .yblog-hero-feat-body{padding:clamp(18px,2.4vw,22px);}
.yorix-blog-v2 .yblog-hero-feat-kicker{--cat-color:var(--green);display:inline-flex;align-items:center;gap:6px;font-family:'Syne',sans-serif;font-size:.68rem;font-weight:800;color:var(--cat-color);background:color-mix(in srgb,var(--cat-color) 12%,transparent);border:1px solid color-mix(in srgb,var(--cat-color) 28%,transparent);padding:5px 11px;border-radius:50px;margin-bottom:10px;letter-spacing:.06em;text-transform:uppercase;}
.yorix-blog-v2 .yblog-hero-feat-title{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(1.05rem,1.9vw,1.25rem);line-height:1.25;color:var(--ink);margin:0 0 10px;letter-spacing:-.35px;}
.yorix-blog-v2 .yblog-hero-feat-ex{font-size:.82rem;line-height:1.6;color:var(--gray);margin:0 0 16px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.yorix-blog-v2 .yblog-hero-feat-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;padding-top:14px;border-top:1px solid var(--border);}

.yorix-blog-v2 .yblog-orbit{position:absolute;border-radius:50%;pointer-events:none;z-index:0;}
.yorix-blog-v2 .yblog-orbit--a{width:160px;height:160px;top:-30px;right:0;background:rgba(252,209,22,.18);filter:blur(50px);}
.yorix-blog-v2 .yblog-orbit--b{width:200px;height:200px;bottom:-40px;left:-30px;background:rgba(79,209,125,.22);filter:blur(60px);}

/* ───────── CATÉGORIES ───────── */
.yorix-blog-v2 .yblog-cats-head{margin-bottom:18px;display:flex;flex-direction:column;align-items:flex-start;}
.yorix-blog-v2 .yblog-cats{display:flex;flex-wrap:wrap;gap:10px;}
@media (max-width:640px){.yorix-blog-v2 .yblog-cats{flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding-bottom:4px;margin-left:calc(-1 * clamp(16px,3vw,28px));margin-right:calc(-1 * clamp(16px,3vw,28px));padding-left:clamp(16px,3vw,28px);padding-right:clamp(16px,3vw,28px);}.yorix-blog-v2 .yblog-cats::-webkit-scrollbar{display:none;}}
.yorix-blog-v2 .yblog-cat{--cat-color:var(--green);display:inline-flex;align-items:center;gap:8px;background:var(--surface);border:1.5px solid var(--border);color:var(--ink);padding:11px 16px;border-radius:999px;font-family:'DM Sans',sans-serif;font-weight:700;font-size:.82rem;cursor:pointer;transition:transform .15s,border-color .2s,background .2s,box-shadow .2s,color .2s;flex-shrink:0;}
.yorix-blog-v2 .yblog-cat:hover{transform:translateY(-1px);border-color:color-mix(in srgb,var(--cat-color) 55%,var(--border));color:var(--cat-color);box-shadow:0 8px 22px rgba(13,31,20,.06);}
.yorix-blog-v2 .yblog-cat.is-active{background:var(--cat-color);border-color:var(--cat-color);color:#fff;box-shadow:0 10px 24px color-mix(in srgb,var(--cat-color) 32%,transparent);}
.yorix-blog-v2 .yblog-cat.is-active .yblog-cat-count{background:rgba(255,255,255,.22);color:#fff;}
.yorix-blog-v2 .yblog-cat-ico{font-size:1rem;line-height:1;}
.yorix-blog-v2 .yblog-cat-label{font-family:'Syne',sans-serif;font-weight:800;letter-spacing:.02em;}
.yorix-blog-v2 .yblog-cat-count{display:inline-flex;align-items:center;justify-content:center;min-width:22px;height:22px;padding:0 7px;border-radius:11px;background:var(--surface2);color:var(--gray);font-family:'Syne',sans-serif;font-size:.66rem;font-weight:800;}

/* ───────── SECTION HEAD ───────── */
.yorix-blog-v2 .yblog-section-head{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;flex-wrap:wrap;margin-bottom:clamp(24px,3vw,34px);}
.yorix-blog-v2 .yblog-section-head .yblog-h2{margin-bottom:10px;}
.yorix-blog-v2 .yblog-section-head .yblog-lead{margin:0;}
.yorix-blog-v2 .yblog-section-head--center{display:block;text-align:center;margin-bottom:clamp(26px,3.4vw,38px);}
.yorix-blog-v2 .yblog-section-meta{font-family:'Syne',sans-serif;font-size:.78rem;color:var(--gray);font-weight:700;letter-spacing:.04em;background:var(--surface);border:1px solid var(--border);padding:8px 14px;border-radius:999px;}
.yorix-blog-v2 .yblog-section-meta strong{color:var(--green);font-weight:800;margin-right:2px;}
.yorix-blog-v2 .yblog-section-q{color:var(--ink);font-weight:600;}

/* ───────── GRID / CARDS ───────── */
.yorix-blog-v2 .yblog-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:clamp(16px,2vw,22px);}
.yorix-blog-v2 .yblog-guides-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(16px,2vw,22px);}
@media (max-width:980px){.yorix-blog-v2 .yblog-guides-grid{grid-template-columns:repeat(2,minmax(0,1fr));}}
@media (max-width:640px){.yorix-blog-v2 .yblog-guides-grid{grid-template-columns:1fr;}}
.yorix-blog-v2 .yblog-card{background:var(--surface);border:1px solid var(--border);border-radius:18px;overflow:hidden;cursor:pointer;display:flex;flex-direction:column;transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease;box-shadow:${e?"0 12px 28px rgba(0,0,0,.28)":"0 12px 28px rgba(13,31,20,.05)"};}
.yorix-blog-v2 .yblog-card:hover{transform:translateY(-5px);box-shadow:${e?"0 22px 48px rgba(0,0,0,.42)":"0 22px 48px rgba(26,107,58,.1)"};border-color:rgba(79,209,125,.4);}
.yorix-blog-v2 .yblog-card:focus-visible{outline:3px solid var(--green);outline-offset:3px;}
.yorix-blog-v2 .yblog-card-media{position:relative;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;overflow:hidden;}
.yorix-blog-v2 .yblog-card-media img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease;}
.yorix-blog-v2 .yblog-card:hover .yblog-card-media img{transform:scale(1.05);}
.yorix-blog-v2 .yblog-card-emoji{font-size:3.6rem;opacity:.55;}
.yorix-blog-v2 .yblog-card-cat{--cat-color:var(--green);position:absolute;top:12px;left:12px;display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,.94);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:var(--cat-color);padding:5px 11px;border-radius:50px;font-size:.62rem;font-weight:800;font-family:'Syne',sans-serif;letter-spacing:.06em;text-transform:uppercase;box-shadow:0 4px 12px rgba(0,0,0,.08);}
.yorix-blog-v2 .yblog-card-read{position:absolute;top:12px;right:12px;display:inline-flex;align-items:center;gap:4px;background:rgba(0,0,0,.6);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:#fff;padding:4px 10px;border-radius:50px;font-size:.62rem;font-weight:700;}
.yorix-blog-v2 .yblog-card-body{padding:18px;flex:1;display:flex;flex-direction:column;gap:10px;}
.yorix-blog-v2 .yblog-card-title{font-family:'Syne',sans-serif;font-weight:800;font-size:1.02rem;line-height:1.3;letter-spacing:-.3px;color:var(--ink);margin:0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.yorix-blog-v2 .yblog-card-ex{font-size:.82rem;line-height:1.6;color:var(--gray);margin:0;flex:1;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}
.yorix-blog-v2 .yblog-tags{display:flex;flex-wrap:wrap;gap:6px;}
.yorix-blog-v2 .yblog-tag-sm{background:var(--green-pale);color:var(--green);padding:3px 10px;border-radius:50px;font-size:.65rem;font-weight:700;font-family:'Syne',sans-serif;letter-spacing:.02em;}
.yorix-blog-v2 .yblog-card-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;padding-top:12px;border-top:1px solid var(--border);}
.yorix-blog-v2 .yblog-author{display:flex;align-items:center;gap:9px;min-width:0;}
.yorix-blog-v2 .yblog-av{flex-shrink:0;width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--green),var(--green-mid));color:#fff;display:inline-flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:.76rem;}
.yorix-blog-v2 .yblog-author-text{min-width:0;}
.yorix-blog-v2 .yblog-an{font-family:'Syne',sans-serif;font-weight:700;font-size:.74rem;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px;}
.yorix-blog-v2 .yblog-ad{font-size:.66rem;color:var(--gray);margin-top:1px;}
.yorix-blog-v2 .yblog-read-hint{font-family:'Syne',sans-serif;font-size:.72rem;font-weight:800;color:var(--green);display:inline-flex;align-items:center;gap:5px;transition:gap .2s ease;}
.yorix-blog-v2 .yblog-read-hint span{transition:transform .2s ease;display:inline-block;}
.yorix-blog-v2 .yblog-card:hover .yblog-read-hint{gap:8px;}
.yorix-blog-v2 .yblog-card:hover .yblog-read-hint span{transform:translateX(2px);}
.yorix-blog-v2 .yblog-read-hint--strong{font-size:.82rem;}

/* Variante "guide" : carte plus haute / image plus tall */
.yorix-blog-v2 .yblog-card--guide .yblog-card-media{aspect-ratio:4/3;}
.yorix-blog-v2 .yblog-card--guide .yblog-card-title{font-size:1.08rem;-webkit-line-clamp:3;}

/* ───────── EMPTY STATE ───────── */
.yorix-blog-v2 .yblog-empty{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:clamp(36px,5vw,56px) 24px;text-align:center;}
.yorix-blog-v2 .yblog-empty-ico{font-size:3rem;margin-bottom:14px;line-height:1;}
.yorix-blog-v2 .yblog-empty h3{font-family:'Syne',sans-serif;font-weight:800;font-size:1.05rem;color:var(--ink);margin:0 0 6px;}
.yorix-blog-v2 .yblog-empty p{font-size:.86rem;color:var(--gray);margin:0 auto 18px;max-width:400px;}
.yorix-blog-v2 .yblog-empty-cta{display:flex;justify-content:center;}

/* ───────── PILIERS ÉDITORIAUX ───────── */
.yorix-blog-v2 .yblog-pillars{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(14px,2vw,20px);}
@media (max-width:980px){.yorix-blog-v2 .yblog-pillars{grid-template-columns:repeat(2,minmax(0,1fr));}}
@media (max-width:520px){.yorix-blog-v2 .yblog-pillars{grid-template-columns:1fr;}}
.yorix-blog-v2 .yblog-pillar{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:clamp(22px,2.6vw,28px) clamp(18px,2vw,22px);text-align:center;transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease;position:relative;overflow:hidden;}
.yorix-blog-v2 .yblog-pillar::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--green),var(--green-light));transform:scaleX(.3);transform-origin:left;transition:transform .4s ease;}
.yorix-blog-v2 .yblog-pillar:hover{transform:translateY(-4px);box-shadow:${e?"0 22px 48px rgba(0,0,0,.42)":"0 22px 48px rgba(13,31,20,.1)"};border-color:rgba(79,209,125,.4);}
.yorix-blog-v2 .yblog-pillar:hover::before{transform:scaleX(1);}
.yorix-blog-v2 .yblog-pillar-emoji{font-size:2.4rem;line-height:1;margin-bottom:12px;display:inline-flex;align-items:center;justify-content:center;width:64px;height:64px;border-radius:18px;background:linear-gradient(135deg,${e?"#1c2e22":"#f0fff5"},${e?"#152118":"#e2f7ec"});border:1px solid var(--border);}
.yorix-blog-v2 .yblog-pillar h3{font-family:'Syne',sans-serif;font-weight:800;font-size:1rem;color:var(--ink);margin:0 0 8px;letter-spacing:-.3px;}
.yorix-blog-v2 .yblog-pillar p{font-size:.82rem;line-height:1.6;color:var(--gray);margin:0;}

/* ───────── NEWSLETTER ───────── */
.yorix-blog-v2 .yblog-nl{position:relative;background:linear-gradient(135deg,#0a1f14 0%,#143b25 50%,var(--green) 100%);border-radius:24px;padding:clamp(28px,3.6vw,42px) clamp(24px,3vw,36px);color:#fff;display:grid;grid-template-columns:1.1fr .9fr;gap:clamp(24px,3vw,36px);align-items:center;overflow:hidden;box-shadow:0 28px 64px rgba(0,0,0,.32),inset 0 1px 0 rgba(255,255,255,.1);}
@media (max-width:860px){.yorix-blog-v2 .yblog-nl{grid-template-columns:1fr;padding:clamp(24px,4vw,32px);}}
.yorix-blog-v2 .yblog-nl-fx{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 90% 10%,rgba(252,209,22,.22),transparent 50%),radial-gradient(circle at 10% 90%,rgba(79,209,125,.2),transparent 55%);}
.yorix-blog-v2 .yblog-nl-left{position:relative;z-index:1;}
.yorix-blog-v2 .yblog-nl-left .yblog-h2{margin-bottom:10px;}
.yorix-blog-v2 .yblog-nl-perks{list-style:none;margin:16px 0 0;padding:0;display:flex;flex-direction:column;gap:8px;}
.yorix-blog-v2 .yblog-nl-perks li{display:inline-flex;align-items:center;gap:8px;color:rgba(255,255,255,.84);font-size:.84rem;}
.yorix-blog-v2 .yblog-nl-perks li span{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:8px;background:rgba(252,209,22,.18);border:1px solid rgba(252,209,22,.32);font-size:.86rem;}
.yorix-blog-v2 .yblog-nl-form{position:relative;z-index:1;background:rgba(0,0,0,.22);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.16);border-radius:16px;padding:clamp(18px,2vw,22px);}
.yorix-blog-v2 .yblog-nl-lbl{display:block;font-family:'Syne',sans-serif;font-size:.65rem;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:10px;}
.yorix-blog-v2 .yblog-nl-row{display:flex;gap:8px;flex-wrap:wrap;}
.yorix-blog-v2 .yblog-nl-inp{flex:1;min-width:200px;padding:13px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.08);color:#fff;font-family:'DM Sans',sans-serif;font-size:.86rem;outline:none;transition:border-color .18s,background .18s;}
.yorix-blog-v2 .yblog-nl-inp::placeholder{color:rgba(255,255,255,.45);}
.yorix-blog-v2 .yblog-nl-inp:focus{border-color:var(--yellow);background:rgba(255,255,255,.14);}
.yorix-blog-v2 .yblog-nl-submit{flex-shrink:0;}
.yorix-blog-v2 .yblog-nl-note{margin-top:12px;font-size:.74rem;color:rgba(255,255,255,.55);line-height:1.5;}

/* ───────── FINAL CTA ───────── */
.yorix-blog-v2 .yblog-final-cta{background:linear-gradient(135deg,#0a1f14 0%,#143b25 50%,var(--green) 100%);border-radius:24px;padding:clamp(28px,3.6vw,42px) clamp(24px,3vw,36px);color:#fff;display:flex;align-items:center;justify-content:space-between;gap:clamp(22px,3vw,32px);flex-wrap:wrap;box-shadow:0 28px 64px rgba(0,0,0,.32);}
.yorix-blog-v2 .yblog-final-cta-text{flex:1;min-width:240px;}
.yorix-blog-v2 .yblog-final-cta-text .yblog-h2{margin-bottom:6px;}
.yorix-blog-v2 .yblog-final-cta-actions{display:flex;gap:10px;flex-wrap:wrap;}

/* Désactivation .sec wrapper (au cas où) */
.yorix-blog-v2.sec{max-width:none!important;padding:0!important;margin:0!important;}


.yorix-contact-shell{max-width:900px;margin:0 auto;}
.yorix-contact-intro{text-align:center;margin:20px auto 26px;max-width:580px;}
.yorix-contact-h1{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(1.5rem,2.6vw,2rem);color:var(--ink);margin-bottom:10px;letter-spacing:-.4px;line-height:1.2;}
.yorix-contact-lead{color:var(--gray);font-size:.9rem;line-height:1.65;}
.yorix-contact-chip{transition:border-color .2s,transform .15s;background:var(--surface);border:1.5px solid var(--border);border-radius:14px;padding:18px;text-align:center;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px;}
.yorix-contact-chip:hover{border-color:var(--green);transform:translateY(-2px);box-shadow:0 12px 28px rgba(26,107,58,.07);}
.yorix-contact-chip-ico{font-size:2rem;line-height:1;}
.yorix-contact-chip-lbl{font-family:'Syne',sans-serif;font-weight:700;font-size:.86rem;color:var(--ink);}
.yorix-contact-chip-val{font-size:.79rem;color:var(--green);font-weight:700;}
.yorix-contact-form-card{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:24px;margin-bottom:16px;}
.yorix-contact-form-title{font-family:'Syne',sans-serif;font-weight:800;font-size:1.02rem;color:var(--ink);margin-bottom:16px;}
.yorix-contact-info-strip{background:var(--green-pale);border:1px solid var(--green-light);border-radius:12px;padding:18px;display:flex;gap:18px;flex-wrap:wrap;}

/* ═══════════════════════════════════════════════════════════════════════════
   🏆 YORIX HOMEPAGE — PREMIUM REVAMP (animations, hero immersif, storytelling)
   GPU-friendly · prefers-reduced-motion safe · mobile-first
   ═══════════════════════════════════════════════════════════════════════════ */

/* ─── Reveal au scroll (générique) ─────────────────────────────────────── */
.yx-reveal{opacity:0;transform:translateY(22px);transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1);transition-delay:var(--yx-d,0ms);will-change:opacity,transform;}
.yx-reveal.is-in{opacity:1;transform:translateY(0);}
.yx-reveal.yx-reveal-left{transform:translateX(-26px);}
.yx-reveal.yx-reveal-right{transform:translateX(26px);}
.yx-reveal.yx-reveal-left.is-in,.yx-reveal.yx-reveal-right.is-in{transform:translateX(0);}
.yx-reveal.yx-reveal-scale{transform:scale(.92);}
.yx-reveal.yx-reveal-scale.is-in{transform:scale(1);}
@media(prefers-reduced-motion:reduce){.yx-reveal{opacity:1;transform:none!important;transition:none;}}

/* ─── Keyframes premium (GPU-only) ─────────────────────────────────────── */
@keyframes yx-float{0%,100%{transform:translate3d(0,0,0);}50%{transform:translate3d(0,-12px,0);}}
@keyframes yx-float-slow{0%,100%{transform:translate3d(0,0,0) scale(1);}50%{transform:translate3d(0,-18px,0) scale(1.03);}}
@keyframes yx-spin-slow{from{transform:rotate(0);}to{transform:rotate(360deg);}}
@keyframes yx-pulse-glow{0%,100%{box-shadow:0 0 0 0 rgba(252,209,22,.45),0 10px 28px rgba(252,209,22,.4);}50%{box-shadow:0 0 0 14px rgba(252,209,22,0),0 14px 32px rgba(252,209,22,.55);}}
@keyframes yx-pulse-ring{0%{box-shadow:0 0 0 0 rgba(79,209,125,.55);}70%{box-shadow:0 0 0 22px rgba(79,209,125,0);}100%{box-shadow:0 0 0 0 rgba(79,209,125,0);}}
@keyframes yx-aurora-shift{0%{background-position:0% 50%,100% 50%,50% 50%;}50%{background-position:100% 50%,0% 50%,50% 100%;}100%{background-position:0% 50%,100% 50%,50% 50%;}}
@keyframes yx-shine{0%{transform:translateX(-100%);}100%{transform:translateX(180%);}}
@keyframes yx-marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
@keyframes yx-fade-up{from{opacity:0;transform:translate3d(0,18px,0);}to{opacity:1;transform:none;}}
@keyframes yx-tilt-in{from{opacity:0;transform:perspective(900px) rotateX(8deg) translateY(20px);}to{opacity:1;transform:perspective(900px) rotateX(0) translateY(0);}}
@keyframes yx-gradient-text{0%,100%{background-position:0% 50%;}50%{background-position:100% 50%;}}
@keyframes yx-count-pop{0%{transform:scale(1);}40%{transform:scale(1.08);}100%{transform:scale(1);}}
@keyframes yx-bounce-soft{0%,100%{transform:translateY(0);}50%{transform:translateY(-4px);}}

/* ─── HERO IMMERSIF (overrides additifs sur .hero.hp-hero-shell) ───────── */
.hp-hero-shell{position:relative;overflow:hidden;}
.hp-hero-shell .hp-hero-aurora{
  background:
    radial-gradient(ellipse 70% 50% at 10% 8%,rgba(252,209,22,.16) 0%,transparent 55%),
    radial-gradient(ellipse 60% 50% at 88% 32%,rgba(79,209,125,.22) 0%,transparent 55%),
    radial-gradient(circle at 50% 130%,rgba(26,107,58,.55) 0%,transparent 50%);
  background-size:200% 200%,200% 200%,200% 200%;
  animation:yx-aurora-shift 18s ease-in-out infinite;
  opacity:.95;
}
@media(prefers-reduced-motion:reduce){.hp-hero-shell .hp-hero-aurora{animation:none;}}

/* Particules flottantes décoratives (3 spheres) */
.yx-hero-orbs{position:absolute;inset:0;pointer-events:none;z-index:0;overflow:hidden;}
.yx-hero-orbs::before,.yx-hero-orbs::after,
.yx-hero-orbs span{position:absolute;border-radius:50%;filter:blur(40px);will-change:transform;}
.yx-hero-orbs::before{content:"";width:280px;height:280px;top:-60px;left:-80px;background:radial-gradient(circle,rgba(252,209,22,.45),transparent 70%);animation:yx-float-slow 12s ease-in-out infinite;}
.yx-hero-orbs::after{content:"";width:220px;height:220px;bottom:-50px;right:-50px;background:radial-gradient(circle,rgba(79,209,125,.45),transparent 70%);animation:yx-float-slow 14s ease-in-out infinite reverse;}
.yx-hero-orbs span{width:160px;height:160px;top:35%;left:48%;background:radial-gradient(circle,rgba(26,107,58,.4),transparent 70%);animation:yx-float 10s ease-in-out infinite;}
@media(prefers-reduced-motion:reduce){.yx-hero-orbs::before,.yx-hero-orbs::after,.yx-hero-orbs span{animation:none;}}
@media(max-width:768px){.yx-hero-orbs::before{width:180px;height:180px;}.yx-hero-orbs::after{width:140px;height:140px;}.yx-hero-orbs span{display:none;}}

/* Titre hero avec gradient animé sur le <em> */
.hp-hero-shell h1 em{font-style:normal;background:linear-gradient(120deg,#fcd116 0%,#4fd17d 38%,#7ef0a8 64%,#fcd116 100%);background-size:220% 220%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:yx-gradient-text 8s ease infinite;display:inline-block;}
@media(prefers-reduced-motion:reduce){.hp-hero-shell h1 em{animation:none;}}

/* Entrée fluide du contenu hero */
.hp-hero-copy>*{animation:yx-fade-up .8s cubic-bezier(.22,1,.36,1) backwards;}
.hp-hero-copy>:nth-child(1){animation-delay:.05s;}
.hp-hero-copy>:nth-child(2){animation-delay:.15s;}
.hp-hero-copy>:nth-child(3){animation-delay:.25s;}
.hp-hero-copy>:nth-child(4){animation-delay:.35s;}
.hp-hero-copy>:nth-child(5){animation-delay:.45s;}
.hp-hero-copy>:nth-child(6){animation-delay:.55s;}
.hp-hero-copy>:nth-child(7){animation-delay:.65s;}
.hp-hero-copy>:nth-child(8){animation-delay:.75s;}
@media(prefers-reduced-motion:reduce){.hp-hero-copy>*{animation:none;}}

/* CTA principal avec halo pulsant */
.hp-cta-primary{position:relative;overflow:hidden;animation:yx-pulse-glow 3.4s ease-in-out infinite;}
.hp-cta-primary::after{content:"";position:absolute;top:0;left:0;width:35%;height:100%;background:linear-gradient(120deg,transparent 0%,rgba(255,255,255,.55) 50%,transparent 100%);transform:translateX(-100%);}
.hp-cta-primary:hover::after{animation:yx-shine 1.1s ease forwards;}
.hp-cta-primary:hover{transform:translateY(-3px);box-shadow:0 14px 36px rgba(252,209,22,.55);}
@media(prefers-reduced-motion:reduce){.hp-cta-primary{animation:none;}.hp-cta-primary::after{display:none;}}

.hp-cta-ghost{transition:all .25s ease;}
.hp-cta-ghost:hover{background:rgba(255,255,255,.14)!important;transform:translateY(-2px);}

/* Chips quick-links avec petit lift + glow */
.hp-chip{position:relative;overflow:hidden;}
.hp-chip::before{content:"";position:absolute;inset:-1px;border-radius:14px;background:linear-gradient(135deg,rgba(252,209,22,.4),rgba(79,209,125,.35));opacity:0;transition:opacity .35s ease;z-index:-1;}
.hp-chip:hover::before{opacity:1;}
.hp-chip:active{transform:translateY(0) scale(.98);}

/* Panel de recherche avec shine au hover */
.hp-search-panel{position:relative;overflow:hidden;}
.hp-search-panel::before{content:"";position:absolute;top:-2px;left:-30%;width:60%;height:2px;background:linear-gradient(90deg,transparent,rgba(252,209,22,.85),transparent);animation:yx-marquee 6s linear infinite;pointer-events:none;}
@media(prefers-reduced-motion:reduce){.hp-search-panel::before{animation:none;display:none;}}

/* ─── COUNTERS ANIMÉS ──────────────────────────────────────────────────── */
.yx-counter-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;max-width:1200px;margin:0 auto;padding:32px 24px;}
.yx-counter{position:relative;background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:22px 18px;text-align:center;overflow:hidden;transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease;}
.yx-counter:hover{transform:translateY(-4px);box-shadow:0 18px 44px rgba(26,107,58,.12);border-color:var(--green-light);}
.yx-counter::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 0%,rgba(26,107,58,.08),transparent 60%);opacity:0;transition:opacity .35s ease;}
.yx-counter:hover::before{opacity:1;}
.yx-counter-icon{font-size:1.9rem;line-height:1;margin-bottom:8px;display:inline-block;}
.yx-counter:hover .yx-counter-icon{animation:yx-bounce-soft .9s ease infinite;}
.yx-counter-num{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(1.45rem,3vw,2.1rem);color:var(--green);letter-spacing:-.5px;line-height:1.1;}
.yx-counter-lbl{font-size:.74rem;font-weight:600;color:var(--gray);margin-top:4px;letter-spacing:.02em;}
.yx-counter-sub{font-size:.65rem;color:var(--gray);margin-top:6px;opacity:.78;}
@media(max-width:768px){.yx-counter-grid{grid-template-columns:repeat(2,1fr);padding:24px 16px;gap:10px;}.yx-counter{padding:18px 14px;}}

/* ─── MARQUEE PARTENAIRES / CATÉGORIES ─────────────────────────────────── */
.yx-marquee-wrap{overflow:hidden;padding:20px 0;background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);}
.yx-marquee-track{display:flex;gap:42px;width:max-content;animation:yx-marquee 35s linear infinite;}
.yx-marquee-wrap:hover .yx-marquee-track{animation-play-state:paused;}
.yx-marquee-item{display:inline-flex;align-items:center;gap:10px;font-family:'Syne',sans-serif;font-weight:800;font-size:.92rem;color:var(--ink);white-space:nowrap;letter-spacing:.02em;opacity:.78;transition:opacity .2s ease;}
.yx-marquee-item:hover{opacity:1;color:var(--green);}
.yx-marquee-item .yx-mq-ico{font-size:1.2rem;line-height:1;}
.yx-marquee-item .yx-mq-dot{width:6px;height:6px;border-radius:50%;background:var(--green-mid);opacity:.45;}
@media(prefers-reduced-motion:reduce){.yx-marquee-track{animation:none;flex-wrap:wrap;justify-content:center;}}

/* ─── HOW IT WORKS (timeline horizontale premium) ──────────────────────── */
.yx-how-section{max-width:1200px;margin:0 auto;padding:48px 24px 36px;}
.yx-how-head{text-align:center;margin-bottom:36px;}
.yx-how-kicker{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:999px;background:var(--green-pale);color:var(--green);font-size:.7rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;margin-bottom:12px;}
.yx-how-title{font-family:'Syne',sans-serif;font-size:clamp(1.45rem,3.2vw,2.05rem);font-weight:800;color:var(--ink);letter-spacing:-.6px;line-height:1.15;}
.yx-how-sub{font-size:.88rem;color:var(--gray);margin-top:10px;line-height:1.65;max-width:540px;margin-left:auto;margin-right:auto;}
.yx-how-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;position:relative;}
.yx-how-grid::before{content:"";position:absolute;top:48px;left:8%;right:8%;height:2px;background:repeating-linear-gradient(90deg,var(--green-light) 0 8px,transparent 8px 16px);opacity:.55;}
.yx-how-step{position:relative;background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:24px 18px;text-align:center;transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease;z-index:1;}
.yx-how-step:hover{transform:translateY(-5px);box-shadow:0 20px 48px rgba(26,107,58,.13);border-color:var(--green-light);}
.yx-how-num{position:absolute;top:-13px;left:50%;transform:translateX(-50%);width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,var(--green),var(--green-mid));color:#fff;font-family:'Syne',sans-serif;font-weight:800;font-size:.82rem;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 18px rgba(26,107,58,.4);}
.yx-how-ico{font-size:2.2rem;line-height:1;margin:8px 0 12px;display:inline-block;}
.yx-how-step:hover .yx-how-ico{animation:yx-bounce-soft 1s ease infinite;}
.yx-how-step h4{font-family:'Syne',sans-serif;font-weight:800;font-size:.95rem;color:var(--ink);margin-bottom:6px;}
.yx-how-step p{font-size:.77rem;color:var(--gray);line-height:1.55;}
@media(max-width:992px){.yx-how-grid{grid-template-columns:repeat(2,1fr);}.yx-how-grid::before{display:none;}}
@media(max-width:520px){.yx-how-grid{grid-template-columns:1fr;}}

/* ─── BENTO CARDS amélioration premium ─────────────────────────────────── */
.hp-bento-card{position:relative;overflow:hidden;transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s ease,border-color .35s ease;}
.hp-bento-card::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,transparent 0%,rgba(26,107,58,.04) 100%);opacity:0;transition:opacity .4s ease;pointer-events:none;}
.hp-bento-card::after{content:"";position:absolute;top:0;right:0;width:80px;height:80px;background:radial-gradient(circle at top right,rgba(252,209,22,.18),transparent 70%);opacity:0;transition:opacity .4s ease;pointer-events:none;}
.hp-bento-card:hover{transform:translateY(-6px) scale(1.015);box-shadow:0 22px 56px rgba(26,107,58,.16);border-color:var(--green-light);}
.hp-bento-card:hover::before,.hp-bento-card:hover::after{opacity:1;}
.hp-bento-card:hover .hp-bento-ico{animation:yx-float 2s ease-in-out infinite;}
.hp-bento-link{position:relative;overflow:hidden;}
.hp-bento-link::before{content:"";position:absolute;bottom:-1px;left:0;right:0;height:1px;background:var(--green);transform:scaleX(0);transform-origin:left;transition:transform .35s ease;}
.hp-bento-link:hover::before{transform:scaleX(1);}

/* ─── PROD GRID hover boost (additif sans casser ProdGrid) ─────────────── */
.home-premium .prod-card,.home-premium .prod-grid>*{transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s ease;}
.home-premium .prod-card:hover{transform:translateY(-6px);box-shadow:0 22px 50px rgba(13,31,20,.15);}

/* ─── PROOF BAR animée ─────────────────────────────────────────────────── */
.hp-proof-bar.yx-proof-glow{background:linear-gradient(92deg,#0a1510,#1a3826,#0a1510),linear-gradient(120deg,rgba(252,209,22,.06),rgba(79,209,125,.06));background-blend-mode:overlay;}
.hp-proof-bar .proof-item{transition:transform .25s ease,color .25s ease;}
.hp-proof-bar .proof-item:hover{transform:translateY(-2px);}
.hp-proof-bar .proof-num{display:inline-block;}
.hp-proof-bar .proof-item:hover .proof-num{animation:yx-bounce-soft .8s ease infinite;}

/* ─── TESTIMONIALS amélioration premium ────────────────────────────────── */
.hp-quote-card{position:relative;overflow:hidden;transition:transform .35s ease,box-shadow .35s ease,border-color .35s ease;}
.hp-quote-card::before{content:"\\201C";position:absolute;top:-22px;right:6px;font-family:'Syne',sans-serif;font-weight:800;font-size:6rem;color:var(--green-pale);line-height:1;opacity:.85;pointer-events:none;}
.hp-quote-card:hover{transform:translateY(-4px);box-shadow:0 18px 44px rgba(26,107,58,.13);border-color:var(--green-light);}
.hp-quote-card blockquote{position:relative;z-index:1;}

/* ─── BADGES animés (entrée + flottement) ──────────────────────────────── */
.hero-badges .hbadge{transition:transform .25s ease,box-shadow .25s ease;}
.hero-badges .hbadge:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(0,0,0,.18);}

/* ─── PREMIUM NEWSLETTER (overrides additifs) ──────────────────────────── */
.hp-newsletter{position:relative;}
.hp-newsletter::after{content:"";position:absolute;inset:0;background:
  radial-gradient(circle at 15% 20%,rgba(252,209,22,.18),transparent 50%),
  radial-gradient(circle at 85% 80%,rgba(79,209,125,.18),transparent 50%);
  background-size:140% 140%;animation:yx-aurora-shift 22s ease-in-out infinite;z-index:0;pointer-events:none;}
.hp-newsletter>*{position:relative;z-index:1;}
@media(prefers-reduced-motion:reduce){.hp-newsletter::after{animation:none;}}

/* ─── PROMO BANNER haut de page (animée + countdown) ───────────────────── */
.yx-promo-banner{position:relative;display:flex;align-items:center;justify-content:center;gap:14px;padding:11px 24px;background:linear-gradient(92deg,#0d1f14 0%,#1a6b3a 50%,#0d1f14 100%);background-size:240% 100%;animation:yx-aurora-shift 14s ease-in-out infinite;color:#fff;font-size:.78rem;font-weight:600;flex-wrap:wrap;text-align:center;border-bottom:1px solid rgba(252,209,22,.25);overflow:hidden;}
.yx-promo-banner::before{content:"";position:absolute;top:0;left:-50%;width:30%;height:100%;background:linear-gradient(120deg,transparent,rgba(252,209,22,.18),transparent);animation:yx-marquee 7s linear infinite;}
.yx-promo-banner .yx-promo-icon{font-size:1rem;animation:yx-bounce-soft 1.8s ease-in-out infinite;}
.yx-promo-banner strong{color:var(--yellow);font-family:'Syne',sans-serif;font-weight:800;letter-spacing:.02em;}
.yx-promo-banner .yx-promo-cta{background:var(--yellow);color:#0d1f14;padding:5px 13px;border-radius:999px;font-family:'Syne',sans-serif;font-weight:800;font-size:.72rem;text-decoration:none;border:none;cursor:pointer;transition:transform .2s ease,box-shadow .2s ease;}
.yx-promo-banner .yx-promo-cta:hover{transform:translateY(-1px);box-shadow:0 6px 16px rgba(252,209,22,.5);}
@media(prefers-reduced-motion:reduce){.yx-promo-banner,.yx-promo-banner::before{animation:none;}}
@media(max-width:560px){.yx-promo-banner{font-size:.72rem;padding:9px 14px;gap:8px;}}

/* ─── SOCIAL PROOF strip (avis + chiffres) ─────────────────────────────── */
.yx-social-proof{max-width:1200px;margin:0 auto;padding:36px 24px 24px;display:grid;grid-template-columns:1.2fr 2fr;gap:24px;align-items:center;}
.yx-sp-rating{background:linear-gradient(135deg,#fef3c7,#fed7aa);border:1px solid #f59e0b;border-radius:20px;padding:24px;display:flex;flex-direction:column;align-items:center;gap:6px;box-shadow:0 12px 32px rgba(245,158,11,.18);}
.yx-sp-stars{font-size:1.6rem;letter-spacing:2px;line-height:1;}
.yx-sp-stars span{display:inline-block;animation:yx-bounce-soft 1.6s ease-in-out infinite;}
.yx-sp-stars span:nth-child(2){animation-delay:.1s;}
.yx-sp-stars span:nth-child(3){animation-delay:.2s;}
.yx-sp-stars span:nth-child(4){animation-delay:.3s;}
.yx-sp-stars span:nth-child(5){animation-delay:.4s;}
.yx-sp-score{font-family:'Syne',sans-serif;font-weight:800;font-size:2.4rem;color:#92400e;line-height:1;}
.yx-sp-label{font-size:.78rem;color:#78350f;font-weight:600;text-align:center;}
.yx-sp-logos{display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:flex-end;}
.yx-sp-logo{padding:11px 18px;border:1px solid var(--border);border-radius:14px;background:var(--surface);font-family:'Syne',sans-serif;font-weight:800;font-size:.78rem;color:var(--gray);transition:all .25s ease;}
.yx-sp-logo:hover{color:var(--green);border-color:var(--green-light);transform:translateY(-2px);}
@media(max-width:768px){.yx-social-proof{grid-template-columns:1fr;}.yx-sp-logos{justify-content:center;}}

/* ─── CATEGORY CARDS (carrousel premium) ───────────────────────────────── */
.yx-cat-section{max-width:1200px;margin:0 auto;padding:36px 24px;}
.yx-cat-head{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:20px;flex-wrap:wrap;}
.yx-cat-title{font-family:'Syne',sans-serif;font-size:clamp(1.25rem,2.4vw,1.55rem);font-weight:800;color:var(--ink);letter-spacing:-.4px;}
.yx-cat-sub{font-size:.82rem;color:var(--gray);margin-top:6px;}
.yx-cat-link{font-family:'Syne',sans-serif;font-weight:800;font-size:.78rem;color:var(--green);cursor:pointer;background:none;border:none;padding:0;border-bottom:1px solid transparent;transition:border-color .25s ease;}
.yx-cat-link:hover{border-bottom-color:var(--green);}
.yx-cat-scroller{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(170px,1fr);gap:14px;overflow-x:auto;padding-bottom:10px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:thin;scrollbar-color:var(--green-light) transparent;}
.yx-cat-scroller::-webkit-scrollbar{height:6px;}
.yx-cat-scroller::-webkit-scrollbar-thumb{background:var(--green-light);border-radius:99px;}
.yx-cat-card{scroll-snap-align:start;position:relative;background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:22px 18px;cursor:pointer;text-align:center;overflow:hidden;transition:all .3s cubic-bezier(.22,1,.36,1);}
.yx-cat-card::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,var(--green-pale) 0%,transparent 100%);opacity:0;transition:opacity .35s ease;}
.yx-cat-card:hover{transform:translateY(-5px);box-shadow:0 22px 50px rgba(26,107,58,.16);border-color:var(--green);}
.yx-cat-card:hover::before{opacity:1;}
.yx-cat-emoji{position:relative;z-index:1;font-size:2.4rem;line-height:1;display:inline-block;margin-bottom:10px;transition:transform .35s ease;}
.yx-cat-card:hover .yx-cat-emoji{transform:scale(1.15) rotate(-6deg);}
.yx-cat-name{position:relative;z-index:1;font-family:'Syne',sans-serif;font-weight:800;font-size:.82rem;color:var(--ink);line-height:1.3;}
.yx-cat-count{position:relative;z-index:1;font-size:.66rem;color:var(--gray);margin-top:4px;}
@media(max-width:540px){.yx-cat-scroller{grid-auto-columns:minmax(140px,1fr);}}

/* ─── SCROLL INDICATOR animé ───────────────────────────────────────────── */
.yx-scroll-hint{position:absolute;bottom:18px;left:50%;transform:translateX(-50%);z-index:2;display:flex;flex-direction:column;align-items:center;gap:6px;color:rgba(255,255,255,.55);font-size:.66rem;letter-spacing:.2em;font-weight:600;text-transform:uppercase;pointer-events:none;}
.yx-scroll-hint::after{content:"";width:1px;height:22px;background:linear-gradient(180deg,rgba(255,255,255,.55),transparent);animation:yx-bounce-soft 1.8s ease-in-out infinite;}
@media(prefers-reduced-motion:reduce){.yx-scroll-hint::after{animation:none;}}
@media(max-width:768px){.yx-scroll-hint{display:none;}}

/* ─── WA STICKY amélioration : seulement sur mobile + pulse ────────────── */
.wa-sticky{animation:yx-pulse-ring 2.4s ease-out infinite;}
@media(prefers-reduced-motion:reduce){.wa-sticky{animation:none;}}
@media(min-width:769px){.wa-sticky{display:none!important;}}

`;async function Na(e,t){const o=t.userId;if(!o)return{ok:!1,error:"no userId"};const i=(t.titre||t.title||"Yorix").trim(),a=t.metadata??t.payload??null,s={user_id:o,type:t.type||"system",title:i,message:t.message??"",link:t.link??null,lu:!1,priority:t.priority||"standard",category:t.category||"system",payload:a},{data:n,error:l}=await e.from("notifications").insert(s).select("id").maybeSingle();return l?{ok:!1,error:l.message}:{ok:!0,id:n==null?void 0:n.id}}const Ra={commande_recue:{label:"En attente",short:"En attente",icon:"⏳",color:"#f59e0b",bg:"#fef3c7",order:1},livreur_assigne:{label:"Livreur assigné",short:"Assignée",icon:"🏍️",color:"#0ea5e9",bg:"#e0f2fe",order:2},accepte:{label:"Acceptée par livreur",short:"Acceptée",icon:"✅",color:"#10b981",bg:"#d1fae5",order:3},refuse:{label:"Refusée par livreur",short:"Refusée",icon:"❌",color:"#ef4444",bg:"#fee2e2",order:0},preparation:{label:"Préparation",short:"Préparation",icon:"📦",color:"#3b82f6",bg:"#dbeafe",order:4},collecte:{label:"Colis collecté",short:"Collecté",icon:"🏪",color:"#8b5cf6",bg:"#ede9fe",order:5},en_route:{label:"En route",short:"En route",icon:"🏍️",color:"#10b981",bg:"#d1fae5",order:6},livre:{label:"Livré",short:"Livré",icon:"✅",color:"#22c55e",bg:"#dcfce7",order:7},annule:{label:"Annulé",short:"Annulé",icon:"❌",color:"#ef4444",bg:"#fee2e2",order:-1}};function lr(e){return Ra[e]||{label:e||"—",short:"—",icon:"•",color:"#64748b",bg:"#f1f5f9",order:0}}const Ma=()=>{const e=Math.random().toString(36).substring(2,7).toUpperCase(),t=Date.now().toString(36).slice(-3).toUpperCase();return`YX-${e}${t}`};async function Ie({delivery:e,acteurId:t,acteurRole:o,action:i,ancienStatut:a,nouveauStatut:s,payload:n}){try{await E.from("delivery_logs").insert({delivery_id:(e==null?void 0:e.id)||null,code_suivi:(e==null?void 0:e.code_suivi)||null,acteur_id:t||null,acteur_role:o||"system",action:i,ancien_statut:a||null,nouveau_statut:s||null,payload:n||null})}catch(l){console.warn("[deliveryWorkflow] log skipped:",l==null?void 0:l.message)}}async function Se({userId:e,type:t,title:o,message:i,link:a,payload:s}){if(!e)return{ok:!1,reason:"no-user"};const n=await Na(E,{userId:e,type:t||"delivery",title:o||"Notification Yorix",message:i||"",link:a||null,priority:"important",category:"delivery",payload:s||null});return n.ok?{ok:!0}:(console.warn("[deliveryWorkflow] notification skipped:",n.error),{ok:!1,reason:n.error})}function Ia(e){if(!e)return"";const t=String(e).replace(/[^0-9]/g,"");return t?t.startsWith("237")?t:`237${t.replace(/^0+/,"")}`:""}function La(e,t){const o=Ia(e);return o?`https://wa.me/${o}?text=${encodeURIComponent(t||"")}`:null}function Pa(e,t){const o=La(e,t);if(!o)return!1;try{return window.open(o,"_blank","noopener,noreferrer"),!0}catch{return!1}}function Nt(e){return e==null||isNaN(e)?"À définir":Number(e).toLocaleString("fr-FR")+" FCFA"}function Oa(e){const t=`https://yorix.cm/?page=dashboard&tab=disponibles&code=${e.code_suivi}`;return["🚚 *NOUVELLE COURSE YORIX DISPONIBLE*","","📦 *Code mission :* "+(e.code_suivi||"—"),"","👤 *CLIENT*","Nom : "+(e.client_nom||"N/A"),"Téléphone : "+(e.client_tel||"N/A"),"","📍 *TRAJET*","🔴 Collecte : "+(e.adresse_collecte||"N/A"),"🟢 Livraison : "+(e.adresse_livraison||"N/A"),"Ville : "+(e.ville||"N/A"),"","💰 Montant : "+Nt(e.montant),e.commission_livreur?"🎁 Votre gain : "+Nt(e.commission_livreur):"","📏 Distance : ~"+(e.distance_km||3.5)+" km","⏱️ Temps estimé : ~"+(e.temps_estime_min||25)+" min",(e.instructions,""),e.instructions?"📝 Instructions : "+e.instructions:"","","👉 Connectez-vous à votre dashboard Yorix pour ACCEPTER ou REFUSER cette livraison :",t,"","Yorix CM 🇨🇲"].filter(Boolean).join(`
`)}async function as({delivery:e,livreur:t,acteurId:o,openWhatsAppFallback:i=!0}){if(!(e!=null&&e.id))throw new Error("Livraison invalide");if(!(t!=null&&t.nom))throw new Error("Livreur invalide");const a={livreur_id:t.id||t.uid||null,livreur_nom:t.nom,livreur_tel:t.telephone||t.tel||"",livreur_vehicule:t.vehicule||t.livreur_vehicule||"Moto",statut:"livreur_assigne",assigne_at:new Date().toISOString(),refuse_at:null,refus_motif:null,accepte_at:null,notif_livreur_sent:!1},{data:s,error:n}=await E.from("deliveries").update(a).eq("id",e.id).select().single();if(n)throw n;const l=s||{...e,...a};a.livreur_id&&await Se({userId:a.livreur_id,type:"delivery_assigned",title:"🚚 Nouvelle course Yorix",message:`Mission ${l.code_suivi} : ${l.adresse_collecte||""} → ${l.adresse_livraison||""}`,link:`/?page=dashboard&tab=disponibles&code=${l.code_suivi}`,payload:{delivery_id:l.id,code:l.code_suivi}});let c=!1;return i&&a.livreur_tel&&(c=Pa(a.livreur_tel,Oa(l))),(c||a.livreur_id)&&await E.from("deliveries").update({notif_livreur_sent:!0}).eq("id",l.id),await Ie({delivery:l,acteurId:o,acteurRole:"admin",action:e.livreur_id?"reassigned":"assigned",ancienStatut:e.statut,nouveauStatut:"livreur_assigne",payload:{livreur_id:a.livreur_id,livreur_nom:a.livreur_nom,wa:c}}),{delivery:l,waOpened:c}}async function so({delivery:e,patch:t,acteurId:o}){if(!(e!=null&&e.id))throw new Error("Livraison invalide");const i={...t},a=new Date().toISOString();t.statut&&t.statut!==e.statut&&(t.statut==="preparation"&&!e.preparation_at&&(i.preparation_at=a),t.statut==="collecte"&&!e.collecte_at&&(i.collecte_at=a),t.statut==="en_route"&&!e.en_route_at&&(i.en_route_at=a),t.statut==="livre"&&!e.livre_at&&(i.livre_at=a),t.statut==="annule"&&!e.annule_at&&(i.annule_at=a));const{data:s,error:n}=await E.from("deliveries").update(i).eq("id",e.id).select().single();if(n)throw n;return await Ie({delivery:s,acteurId:o,acteurRole:"admin",action:"edited",ancienStatut:e.statut,nouveauStatut:s.statut,payload:{patch:t}}),s}async function ns({delivery:e,nouveauStatut:t,acteurId:o,notifyClient:i=!0}){const a=await so({delivery:e,patch:{statut:t},acteurId:o});return i&&e.client_id&&await Se({userId:e.client_id,type:"delivery_status",title:`Livraison ${e.code_suivi} : ${lr(t).label}`,message:`Votre livraison est maintenant : ${lr(t).label}.`,link:`/?page=livraison&code=${e.code_suivi}`,payload:{delivery_id:e.id,statut:t}}),a}async function ss({delivery:e,motif:t,acteurId:o}){const i=await so({delivery:e,patch:{statut:"annule",refus_motif:t||null,annule_at:new Date().toISOString()},acteurId:o});return e.client_id&&await Se({userId:e.client_id,type:"delivery_cancelled",title:"❌ Livraison annulée",message:`Votre livraison ${e.code_suivi} a été annulée. ${t?"Motif : "+t:""}`,link:`/?page=livraison&code=${e.code_suivi}`,payload:{delivery_id:e.id,motif:t}}),i}async function ls({delivery:e,user:t,userData:o}){if(!(e!=null&&e.id))throw new Error("Mission invalide");if(!(t!=null&&t.id))throw new Error("Authentification requise");let i=null;const{data:a,error:s}=await E.rpc("accepter_livraison",{p_delivery_id:e.id});if(!s&&a)i=Array.isArray(a)?a[0]:a;else{s&&console.warn("[livreurAccepter] RPC fallback:",s.message);const{data:n,error:l}=await E.from("deliveries").update({statut:"accepte",accepte_at:new Date().toISOString()}).eq("id",e.id).eq("livreur_id",t.id).select().single();if(l)throw l;i=n,await Ie({delivery:i,acteurId:t.id,acteurRole:"delivery",action:"accepted",ancienStatut:e.statut,nouveauStatut:"accepte"})}return i!=null&&i.client_id&&await Se({userId:i.client_id,type:"delivery_accepted",title:"✅ Votre livraison a un livreur !",message:`${i.livreur_nom||"Votre livreur"} a accepté votre livraison ${i.code_suivi}.`,link:`/?page=livraison&code=${i.code_suivi}`,payload:{delivery_id:i.id}}),i}async function ds({delivery:e,user:t,userData:o,motif:i}){if(!(e!=null&&e.id))throw new Error("Mission invalide");if(!(t!=null&&t.id))throw new Error("Authentification requise");let a=null;const{data:s,error:n}=await E.rpc("refuser_livraison",{p_delivery_id:e.id,p_motif:i||null});if(!n&&s)a=Array.isArray(s)?s[0]:s;else{n&&console.warn("[livreurRefuser] RPC fallback:",n.message);const l=e.livreur_nom,g=[...Array.isArray(e.historique_refus)?e.historique_refus:[],{livreur_id:t.id,livreur_nom:l,motif:i||"",refuse_at:new Date().toISOString()}],{data:f,error:x}=await E.from("deliveries").update({statut:"commande_recue",livreur_id:null,livreur_nom:null,livreur_tel:null,livreur_vehicule:null,assigne_at:null,accepte_at:null,refuse_at:new Date().toISOString(),refus_motif:i||null,historique_refus:g}).eq("id",e.id).eq("livreur_id",t.id).select().single();if(x)throw x;a=f,await Ie({delivery:a,acteurId:t.id,acteurRole:"delivery",action:"refused",ancienStatut:e.statut,nouveauStatut:"commande_recue",payload:{motif:i}})}return await Se({userId:null,type:"delivery_refused",title:"⚠️ Mission refusée",message:`${(o==null?void 0:o.nom)||"Un livreur"} a refusé la mission ${e.code_suivi}. ${i?"Motif : "+i:""}`,link:"/?page=admin&tab=deliveries",payload:{delivery_id:e.id,motif:i}}),a}async function cs({delivery:e,user:t,nouveauStatut:o}){if(!(e!=null&&e.id)||!(t!=null&&t.id))throw new Error("Paramètres invalides");if(!["preparation","collecte","en_route","livre"].includes(o))throw new Error("Statut non autorisé pour le livreur : "+o);const a={statut:o},s=new Date().toISOString();o==="preparation"&&(a.preparation_at=s),o==="collecte"&&(a.collecte_at=s),o==="en_route"&&(a.en_route_at=s),o==="livre"&&(a.livre_at=s);const{data:n,error:l}=await E.from("deliveries").update(a).eq("id",e.id).eq("livreur_id",t.id).select().single();if(l)throw l;return n!=null&&n.client_id&&await Se({userId:n.client_id,type:"delivery_status",title:`${lr(o).icon} Livraison ${n.code_suivi}`,message:lr(o).label,link:`/?page=livraison&code=${n.code_suivi}`,payload:{delivery_id:n.id,statut:o}}),await Ie({delivery:n,acteurId:t.id,acteurRole:"delivery",action:"status_change",ancienStatut:e.statut,nouveauStatut:o}),n}async function Da({clientId:e=null,clientNom:t="",clientTel:o="",adresseCollecte:i="",adresseLivraison:a="",ville:s="",colisDescription:n="",vehicule:l="Moto",urgence:c="normal",montant:g=0,distanceKm:f=3.5,tempsEstimeMin:x=30,instructions:w="",orderId:y=null}){const u=Ma(),k={code_suivi:u,order_id:y,client_id:e,client_nom:t,client_tel:o,adresse_collecte:i||"Boutique Yorix",adresse_livraison:a,ville:s||null,colis_description:n||null,livreur_vehicule:l,urgence:c,montant:Number(g)||0,distance_km:f,temps_estime_min:x,instructions:w||null,statut:"commande_recue",commande_at:new Date().toISOString()},{data:p,error:b}=await E.from("deliveries").insert(k).select().single();if(b)throw b;return await Se({userId:null,type:"delivery_request",title:"🚚 Nouvelle demande de livraison",message:`${t||"Client"} → ${a} (${u})`,link:"/?page=admin&tab=deliveries",payload:{delivery_id:p.id,code:u}}),await Ie({delivery:p,acteurId:e,acteurRole:e?"client":"system",action:"created",nouveauStatut:"commande_recue"}),{code:u,delivery:p}}function ps(e){var k;const t=Array.isArray(e)?e:[],o=t.filter(p=>p.statut==="livre"),i=t.filter(p=>p.statut==="refuse"||p.refus_motif),a=t.filter(p=>["accepte","preparation","collecte","en_route"].includes(p.statut)),s=t.filter(p=>p.statut==="livreur_assigne"),n=p=>p.reduce((b,z)=>b+Number(z.commission_livreur||0),0),l=new Date,c=new Date(l.getFullYear(),l.getMonth(),1),g=new Date(l.getTime()-7*864e5),f=new Date(l.getFullYear(),l.getMonth(),l.getDate()),x=p=>o.filter(b=>b.livre_at&&new Date(b.livre_at)>=p),w=t.filter(p=>["accepte","refuse","preparation","collecte","en_route","livre"].includes(p.statut)||p.refus_motif),y=t.filter(p=>["accepte","preparation","collecte","en_route","livre"].includes(p.statut)&&!p.refus_motif),u=w.length===0?0:Math.round(y.length/w.length*1e3)/10;return{total_missions:t.length,missions_livrees:o.length,missions_refusees:i.length,missions_en_cours:a.length,missions_dispos:s.length,gains_total:n(o),gains_mois:n(x(c)),gains_semaine:n(x(g)),gains_jour:n(x(f)),taux_acceptation:u,derniere_livraison:((k=o[0])==null?void 0:k.livre_at)||null}}function qa({user:e,userData:t,onClose:o,onSuccess:i}){const[a,s]=d.useState(1),[n,l]=d.useState({nom:(t==null?void 0:t.nom)||"",telephone:(t==null?void 0:t.telephone)||"",adresse_collecte:"",adresse_livraison:"",ville:(t==null?void 0:t.ville)||"Douala",colis_description:"",vehicule:"Moto",budget:"",urgence:"normal"}),[c,g]=d.useState({}),[f,x]=d.useState(!1),[w,y]=d.useState(""),u=()=>{const p={};return n.nom.trim()||(p.nom="Nom obligatoire"),n.telephone.trim()||(p.telephone="Téléphone obligatoire"),n.adresse_collecte.trim()||(p.adresse_collecte="Adresse de collecte obligatoire"),n.adresse_livraison.trim()||(p.adresse_livraison="Adresse de livraison obligatoire"),n.colis_description.trim()||(p.colis_description="Description du colis obligatoire"),g(p),Object.keys(p).length===0},k=async()=>{if(u()){x(!0);try{const{delivery:p,code:b}=await Da({clientId:(e==null?void 0:e.id)||null,form:{nom:n.nom,telephone:n.telephone,adresse_collecte:n.adresse_collecte,adresse_livraison:n.adresse_livraison,ville:n.ville,colis_description:n.colis_description,vehicule:n.vehicule,urgence:n.urgence,budget:n.budget}}),z={normal:"🟢 Normal (30-60 min)",urgent:"🟠 Urgent (15-30 min)",express:"🔴 Express (< 15 min)"},C=["🚚 *NOUVELLE DEMANDE DE LIVRAISON YORIX*","","📦 *CODE DE SUIVI : "+b+"*","","👤 *CLIENT*","Nom : "+n.nom,"Téléphone : "+n.telephone,"Ville : "+n.ville,"","📍 *TRAJET*","🔴 Collecte : "+n.adresse_collecte,"🟢 Livraison : "+n.adresse_livraison,"","📦 *COLIS*","Description : "+n.colis_description,"Véhicule : "+n.vehicule,"Urgence : "+(z[n.urgence]||n.urgence),n.budget?"Budget proposé : "+n.budget+" FCFA":"Budget : À définir","","✅ *ACTIONS À FAIRE*","1. Assigner un livreur disponible","2. Confirmer le prix au client","3. Le client suit sa livraison sur yorix.cm/livraison avec le code "+b,"","Merci Yorix ! 🇨🇲"].join(`
`),I="https://wa.me/"+sr+"?text="+encodeURIComponent(C);window.open(I,"_blank","noopener,noreferrer"),y(b),s(2),i==null||i(b,p)}catch(p){console.error("ModalDemandeLivraison:",p),alert("Erreur : "+((p==null?void 0:p.message)||"Impossible de créer la livraison"))}x(!1)}};return a===2?r.jsx("div",{className:"modal-overlay",onClick:p=>p.target===p.currentTarget&&o(),children:r.jsxs("div",{className:"modal",style:{maxWidth:480,textAlign:"center"},children:[r.jsx("button",{className:"modal-close",onClick:o,children:"✕"}),r.jsx("div",{style:{fontSize:"4rem",marginBottom:12},children:"🎉"}),r.jsx("h2",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.4rem",color:"var(--green)",marginBottom:8,letterSpacing:"-.3px"},children:"Demande envoyée !"}),r.jsxs("p",{style:{fontSize:".88rem",color:"var(--gray)",lineHeight:1.7,marginBottom:20},children:["Notre équipe va assigner un livreur et vous recontacter dans les ",r.jsx("strong",{children:"5 minutes"})," pour confirmer."]}),r.jsxs("div",{style:{background:"linear-gradient(135deg, var(--green-pale), #fef9e0)",border:"2px dashed var(--green)",borderRadius:12,padding:18,marginBottom:18},children:[r.jsx("div",{style:{fontSize:".7rem",color:"var(--gray)",fontWeight:700,marginBottom:5,letterSpacing:".05em"},children:"VOTRE CODE DE SUIVI"}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontSize:"1.8rem",fontWeight:800,color:"var(--green)",letterSpacing:".08em",marginBottom:10},children:w}),r.jsx("button",{onClick:()=>{var p;(p=navigator.clipboard)==null||p.writeText(w),alert("✅ Code copié !")},style:{background:"var(--surface)",color:"var(--ink)",border:"1.5px solid var(--border)",borderRadius:8,padding:"6px 14px",fontSize:".75rem",fontWeight:600,cursor:"pointer"},children:"📋 Copier le code"})]}),r.jsx("p",{style:{fontSize:".78rem",color:"var(--gray)",marginBottom:18,lineHeight:1.6},children:"💡 Conservez ce code pour suivre votre livraison en temps réel sur la page Livraison."}),r.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:[r.jsx("button",{onClick:o,style:{background:"var(--surface2)",color:"var(--ink)",border:"1.5px solid var(--border)",borderRadius:9,padding:"11px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".82rem"},children:"Fermer"}),r.jsx("button",{onClick:()=>{o(),window.location.href="/?page=livraison&code="+w},style:{background:"var(--green)",color:"#fff",border:"none",padding:"11px",borderRadius:9,cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem"},children:"📍 Suivre maintenant"})]})]})}):r.jsx("div",{className:"modal-overlay",onClick:p=>p.target===p.currentTarget&&o(),children:r.jsxs("div",{className:"modal",style:{maxWidth:560},children:[r.jsx("button",{className:"modal-close",onClick:o,children:"✕"}),r.jsxs("div",{style:{textAlign:"center",marginBottom:18},children:[r.jsx("div",{style:{fontSize:"2.8rem",marginBottom:6,background:"var(--green-pale)",width:72,height:72,borderRadius:"50%",display:"inline-flex",alignItems:"center",justifyContent:"center"},children:"📦"}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontSize:"1.3rem",fontWeight:800,color:"var(--ink)",marginTop:8,letterSpacing:"-.3px"},children:"Demander une livraison"}),r.jsx("p",{style:{fontSize:".82rem",color:"var(--gray)",marginTop:4},children:"Remplissez le formulaire, un livreur sera assigné en quelques minutes"})]}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",color:"var(--green)",marginBottom:8,marginTop:4},children:"👤 Vos coordonnées"}),r.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14},children:[r.jsxs("div",{className:"form-group",style:{marginBottom:0},children:[r.jsxs("label",{className:"form-label",children:["Nom ",r.jsx("span",{children:"*"})]}),r.jsx("input",{className:"form-input"+(c.nom?" error":""),placeholder:"Votre nom",value:n.nom,onChange:p=>l(b=>({...b,nom:p.target.value}))}),c.nom&&r.jsx("span",{className:"form-error-text",children:c.nom})]}),r.jsxs("div",{className:"form-group",style:{marginBottom:0},children:[r.jsxs("label",{className:"form-label",children:["Téléphone ",r.jsx("span",{children:"*"})]}),r.jsx("input",{className:"form-input"+(c.telephone?" error":""),placeholder:"+237 6XX XXX XXX",value:n.telephone,onChange:p=>l(b=>({...b,telephone:p.target.value}))}),c.telephone&&r.jsx("span",{className:"form-error-text",children:c.telephone})]})]}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",color:"var(--green)",marginBottom:8},children:"📍 Adresses"}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{className:"form-label",children:["🔴 Adresse de collecte ",r.jsx("span",{children:"*"})]}),r.jsx("input",{className:"form-input"+(c.adresse_collecte?" error":""),placeholder:"Ex: Marché Central, Douala",value:n.adresse_collecte,onChange:p=>l(b=>({...b,adresse_collecte:p.target.value}))}),c.adresse_collecte&&r.jsx("span",{className:"form-error-text",children:c.adresse_collecte})]}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{className:"form-label",children:["🟢 Adresse de livraison ",r.jsx("span",{children:"*"})]}),r.jsx("input",{className:"form-input"+(c.adresse_livraison?" error":""),placeholder:"Ex: Akwa Nord, Rue Bonanjo, Douala",value:n.adresse_livraison,onChange:p=>l(b=>({...b,adresse_livraison:p.target.value}))}),c.adresse_livraison&&r.jsx("span",{className:"form-error-text",children:c.adresse_livraison})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Ville"}),r.jsx("select",{className:"form-select",value:n.ville,onChange:p=>l(b=>({...b,ville:p.target.value})),children:ya.filter(p=>p!=="Toutes les villes").map(p=>r.jsx("option",{value:p,children:p},p))})]}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",color:"var(--green)",marginBottom:8,marginTop:4},children:"📦 Détails du colis"}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{className:"form-label",children:["Description du colis ",r.jsx("span",{children:"*"})]}),r.jsx("textarea",{className:"form-textarea"+(c.colis_description?" error":""),style:{minHeight:60},placeholder:"Ex: Enveloppe de documents, Carton de 5kg, Sac à main...",value:n.colis_description,onChange:p=>l(b=>({...b,colis_description:p.target.value}))}),c.colis_description&&r.jsx("span",{className:"form-error-text",children:c.colis_description})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Type de véhicule"}),r.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6},children:[{id:"Moto",icon:"🏍️",label:"Moto",sub:"Petits colis"},{id:"Voiture",icon:"🚗",label:"Voiture",sub:"Colis moyens"},{id:"Minibus",icon:"🚐",label:"Minibus",sub:"Gros volume"}].map(p=>r.jsxs("div",{onClick:()=>l(b=>({...b,vehicule:p.id})),style:{border:"2px solid "+(n.vehicule===p.id?"var(--green)":"var(--border)"),background:n.vehicule===p.id?"var(--green-pale)":"var(--surface)",borderRadius:9,padding:"10px 6px",cursor:"pointer",textAlign:"center",transition:"all .2s"},children:[r.jsx("div",{style:{fontSize:"1.4rem",marginBottom:3},children:p.icon}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem",color:"var(--ink)"},children:p.label}),r.jsx("div",{style:{fontSize:".62rem",color:"var(--gray)"},children:p.sub})]},p.id))})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Niveau d'urgence"}),r.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6},children:[{id:"normal",icon:"🟢",label:"Normal",time:"30-60 min"},{id:"urgent",icon:"🟠",label:"Urgent",time:"15-30 min"},{id:"express",icon:"🔴",label:"Express",time:"< 15 min"}].map(p=>r.jsxs("div",{onClick:()=>l(b=>({...b,urgence:p.id})),style:{border:"2px solid "+(n.urgence===p.id?"var(--green)":"var(--border)"),background:n.urgence===p.id?"var(--green-pale)":"var(--surface)",borderRadius:9,padding:"10px 6px",cursor:"pointer",textAlign:"center",transition:"all .2s"},children:[r.jsx("div",{style:{fontSize:"1.1rem",marginBottom:2},children:p.icon}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".76rem",color:"var(--ink)"},children:p.label}),r.jsx("div",{style:{fontSize:".62rem",color:"var(--gray)"},children:p.time})]},p.id))})]}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{className:"form-label",children:["Budget proposé (FCFA) ",r.jsx("span",{style:{color:"var(--gray)",fontSize:".7rem"},children:"— optionnel"})]}),r.jsx("input",{className:"form-input",type:"number",placeholder:"Ex: 2000 (laisser vide = à définir avec livreur)",value:n.budget,onChange:p=>l(b=>({...b,budget:p.target.value}))}),r.jsx("div",{style:{fontSize:".68rem",color:"var(--gray)",marginTop:4,lineHeight:1.5},children:"💡 Tarifs indicatifs : Intra-ville 500-1500 F · Inter-quartiers 1500-3000 F · Inter-villes 3000-8000 F"})]}),r.jsx("button",{className:"form-submit",onClick:k,disabled:f,style:{marginTop:8},children:f?r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"spinner",style:{width:16,height:16,borderWidth:2}}),"Envoi en cours..."]}):"📦 Envoyer ma demande"}),r.jsx("p",{style:{fontSize:".7rem",color:"var(--gray)",textAlign:"center",marginTop:10,lineHeight:1.5},children:"🔒 Vos informations sont sécurisées · Paiement à la livraison"})]})})}function lo(e){if(!e||e.id==null)return null;const t=e.kind||"product",o=Math.max(1,Number(e.qty||1)),i=Number(e.prix??e.price??0),a=e.fulfillmentMode||(t==="service"?"booking":"delivery");return{...e,kind:t,qty:o,prix:i,fulfillmentMode:a}}function it(){return{freeShippingThresholdXaf:(Number.isFinite(NaN),5e4),standardDeliveryFeeXaf:(Number.isFinite(NaN),1500)}}function co(e){const t=it(),o=e==null?void 0:e.freeShippingThresholdXaf,i=e==null?void 0:e.standardDeliveryFeeXaf;return{freeShippingThresholdXaf:o!=null&&Number.isFinite(Number(o))&&Number(o)>=0?Number(o):t.freeShippingThresholdXaf,standardDeliveryFeeXaf:i!=null&&Number.isFinite(Number(i))&&Number(i)>=0?Number(i):t.standardDeliveryFeeXaf}}function Ya(e){return(e||[]).map(lo).filter(Boolean).filter(o=>o.kind==="product"&&o.fulfillmentMode!=="pickup").reduce((o,i)=>o+i.prix*i.qty,0)}function Ba(e,t){let o=it();typeof t=="number"&&Number.isFinite(t)?o={...o,standardDeliveryFeeXaf:t}:t&&typeof t=="object"&&(o=co(t));const i=(e||[]).map(lo).filter(Boolean),a=i.filter(z=>z.kind==="product"),s=i.filter(z=>z.kind==="service"),n=a.reduce((z,C)=>z+C.prix*C.qty,0),l=s.reduce((z,C)=>z+C.prix*C.qty,0),c=n+l,g=i.reduce((z,C)=>z+C.qty,0),f=Ya(i),x=f>0,w=o.freeShippingThresholdXaf,y=o.standardDeliveryFeeXaf,u=x&&f>=w,k=x&&!u?Math.round(y):0,p=u||!x?0:Math.max(0,Math.round(w-f)),b=!x||w<=0?null:Math.min(1,f/w);return{qty:g,productsCount:a.length,servicesCount:s.length,productsSubtotal:n,servicesSubtotal:l,shippableProductsSubtotal:f,subtotal:c,delivery:k,total:c+k,policyThreshold:w,policyStandardFee:y,hasShippableProducts:x,freeShippingUnlocked:u,amountRemainingForFreeShipping:p,freeShippingProgress01:b,freeShippingNotApplicable:!x}}function gs(e,t,o,i=4){const a=Math.max(1,Number(i)||4),s=new Set((e||[]).map(y=>y.id)),n=(t||[]).filter(y=>(y==null?void 0:y.id)!=null&&!s.has(y.id)),l=o==null?void 0:o.hasShippableProducts,c=o==null?void 0:o.freeShippingUnlocked,g=(o==null?void 0:o.amountRemainingForFreeShipping)||0;if(!l||c||n.length===0)return n.slice(0,a);const x=n.map(y=>{const u=Number(y.prix||0),k=u>=g;return{p:y,price:u,coversGap:k,delta:k?u-g:g-u}}).filter(y=>y.price>0).sort((y,u)=>y.coversGap!==u.coversGap?y.coversGap?-1:1:y.delta-u.delta).slice(0,a).map(y=>y.p);if(x.length>=a)return x;const w=n.filter(y=>!x.some(u=>u.id===y.id)).slice(0,a-x.length);return[...x,...w]}const _={messages:"messages",orders:"orders",payments:"payments",delivery:"delivery",security:"security",promotions:"promotions",system:"system",business:"business",admin:"admin"},X={critical:"critical",important:"important",standard:"standard",promo:"promo"},$a=[{test:e=>/admin|incident|réclamation|reclamation|staff yorix|paiement bloqué/i.test(e||""),category:_.admin,priority:X.critical},{test:e=>/business|b2b|partenaire|yorix business/i.test(e||""),category:_.business,priority:X.important},{test:e=>/payment|paiement|checkout|cinetpay|escrow/i.test(e||""),category:_.payments,priority:X.critical},{test:e=>/security|fraud|litige|connexion|login|suspicious/i.test(e||""),category:_.security,priority:X.critical},{test:e=>/deliver|livraison|livreur|shipping|colis/i.test(e||""),category:_.delivery,priority:X.important},{test:e=>/order|commande|booking|réservation|prestation|service_booking/i.test(e||""),category:_.orders,priority:X.important},{test:e=>/message|chat|support|conversation/i.test(e||""),category:_.messages,priority:X.important},{test:e=>/promo|offre|soldes|flash/i.test(e||""),category:_.promotions,priority:X.promo}],Fa={[_.messages]:"💬",[_.orders]:"📦",[_.payments]:"💳",[_.delivery]:"🚚",[_.security]:"🛡️",[_.promotions]:"🏷️",[_.system]:"🔔",[_.business]:"💼",[_.admin]:"⚙️"};function Ua(e){if(e==null||e==="")return X.standard;const t=String(e).toLowerCase();return t==="urgent"||t==="critical"?X.critical:t==="high"||t==="important"?X.important:t==="normal"||t==="standard"?X.standard:t==="promo"||t==="promotion"?X.promo:X.standard}function Wa(e,t,o){const i=`${e||""} ${t||""} ${o||""}`;for(const a of $a)if(a.test(i))return{category:a.category,priority:a.priority};return{category:_.system,priority:X.standard}}function Va(e){return e==null?"":String(e).replace(/https?:\/\/[^\s]+/g,t=>{try{const o=new URL(t);return o.hostname.includes("wa.me")||o.hostname.includes("whatsapp")?"Lien WhatsApp":o.hostname.includes("yorix")?"Ouvrir sur Yorix":`[${o.hostname}]`}catch{return"Lien"}})}function at(e){const t=e.type||"",o=String(e.titre||e.title||""),i=Wa(t,o,e.message),a=e.category||i.category,s=Ua(e.priority||i.priority);return{...e,_category:a,_priority:s,_icon:e.icon||Fa[a]||"🔔",_title:o||"Notification Yorix",_body:Va(e.message),_image:e.image_url||typeof e.metadata=="object"&&e.metadata!==null&&e.metadata.image_url||null,_deeplink:typeof e.link=="string"?e.link.trim():"",_timeLabel:e.created_at?new Date(e.created_at).toLocaleString("fr-FR",{dateStyle:"short",timeStyle:"short"}):""}}function Ha(e,t){return!t||t==="all"?e:(e||[]).filter(o=>at(o)._category===t)}function Xa(e,t){if(typeof window>"u"||typeof Notification>"u"||Notification.permission!=="granted"||!(t!=null&&t.pushBrowser))return;const o=e._category||_.system;if(!(t.categories&&t.categories[o]===!1))try{new Notification(e._title,{body:(e._body||"").slice(0,180),icon:"/favicon.svg",tag:String(e.id||e.created_at||"yorix"),silent:!(t!=null&&t.sound)})}catch{}}const po="yorix_notification_prefs_v1",rr=()=>({pushBrowser:!0,sound:!1,email:!1,sms:!1,whatsappDigest:!1,categories:{[_.messages]:!0,[_.orders]:!0,[_.payments]:!0,[_.delivery]:!0,[_.security]:!0,[_.promotions]:!0,[_.system]:!0,[_.business]:!0,[_.admin]:!0}});function pe(){try{const e=localStorage.getItem(po);if(!e)return rr();const t=JSON.parse(e);return{...rr(),...t,categories:{...rr().categories,...t.categories||{}}}}catch{return rr()}}function go(e){try{const t=pe(),o={...t,...e,categories:{...t.categories,...e.categories||{}}};return localStorage.setItem(po,JSON.stringify(o)),o}catch{return pe()}}function Ga(e){return e?{pushBrowser:e.push_enabled!==!1&&e.desktop_alerts!==!1,sound:e.sound_enabled===!0,email:e.email_critical===!0,sms:e.sms_critical===!0,whatsappDigest:e.whatsapp_critical!==!1,categories:{[_.messages]:e.category_messages!==!1,[_.orders]:e.category_orders!==!1,[_.payments]:e.category_payments!==!1,[_.delivery]:e.category_delivery!==!1,[_.security]:e.category_security!==!1,[_.promotions]:e.category_promotions!==!1,[_.system]:e.category_system!==!1,[_.business]:e.category_business!==!1,[_.admin]:e.category_admin!==!1}}:null}function fo(e,t){const o=t.categories||{};return{user_id:e,push_enabled:t.pushBrowser!==!1,desktop_alerts:t.pushBrowser!==!1,sound_enabled:t.sound===!0,email_critical:t.email===!0,sms_critical:t.sms===!0,whatsapp_critical:t.whatsappDigest!==!1,category_messages:o[_.messages]!==!1,category_orders:o[_.orders]!==!1,category_payments:o[_.payments]!==!1,category_delivery:o[_.delivery]!==!1,category_security:o[_.security]!==!1,category_promotions:o[_.promotions]!==!1,category_system:o[_.system]!==!1,category_business:o[_.business]!==!1,category_admin:o[_.admin]!==!1,updated_at:new Date().toISOString()}}async function mo(e,t){if(!(e!=null&&e.from)||!t)return pe();try{const{data:o,error:i}=await e.from("notification_preferences").select("*").eq("user_id",t).maybeSingle();if(i)return console.warn("[notification_prefs] load:",i.message),pe();if(o){const l=Ga(o);return l&&go(l),l||pe()}const a=pe(),s=fo(t,a),{error:n}=await e.from("notification_preferences").upsert(s,{onConflict:"user_id"});return n&&console.warn("[notification_prefs] seed:",n.message),a}catch(o){return console.warn("[notification_prefs]",(o==null?void 0:o.message)||o),pe()}}async function Ja(e,t,o){const i=go(o);if(!(e!=null&&e.from)||!t)return i;try{const a=fo(t,i),{error:s}=await e.from("notification_preferences").upsert(a,{onConflict:"user_id"});s&&console.warn("[notification_prefs] save:",s.message)}catch(a){console.warn("[notification_prefs] save",(a==null?void 0:a.message)||a)}return i}function Ka(e){const t="=".repeat((4-e.length%4)%4),o=(e+t).replace(/-/g,"+").replace(/_/g,"/"),i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;++s)a[s]=i.charCodeAt(s);return a}function Qa({user:e,compact:t=!1}){const[o,i]=d.useState("loading"),[a,s]=d.useState(null),n="BHYax0YuzkC8V_07eVRTEathfnPPJCOh6uUocRG-tmcOu-etHRdAUm_nvOnXYi7OhbJfWJTYf_gkN4v2JA6SuWQ";d.useEffect(()=>{l()},[e==null?void 0:e.id]);async function l(){if(!("serviceWorker"in navigator)||!("PushManager"in window)){i("unsupported");return}if(Notification.permission==="denied"){i("denied");return}try{const y=await(await navigator.serviceWorker.ready).pushManager.getSubscription();i(y?"subscribed":"unsubscribed")}catch(w){console.error("[PushManager] Erreur check :",w),i("unsubscribed")}}async function c(){var w,y;if(!(e!=null&&e.id)){s("Vous devez être connecté");return}i("pending"),s(null);try{const u=await Notification.requestPermission();if(u!=="granted"){i(u==="denied"?"denied":"unsubscribed");return}const k=await navigator.serviceWorker.ready;let p=await k.pushManager.getSubscription();p||(p=await k.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Ka(n)}));const b=p.toJSON(),z=b.endpoint||p.endpoint,C=(w=b.keys)==null?void 0:w.p256dh,I=(y=b.keys)==null?void 0:y.auth;if(!z||!C||!I)throw new Error("Abonnement invalide (clés manquantes)");const{error:L}=await E.from("push_subscriptions").upsert({user_id:e.id,endpoint:z,p256dh:C,auth:I,user_agent:navigator.userAgent.slice(0,300)},{onConflict:"endpoint"});if(L)throw console.error("[PushManager] Erreur Supabase :",L),new Error("Erreur enregistrement : "+L.message);i("subscribed"),console.log("[PushManager] ✅ Abonné aux push notifications")}catch(u){console.error("[PushManager] Erreur abonnement :",u),s(u.message||"Erreur lors de l'abonnement"),i("unsubscribed")}}async function g(){i("pending"),s(null);try{const y=await(await navigator.serviceWorker.ready).pushManager.getSubscription();if(y){const u=y.endpoint,{error:k}=await E.from("push_subscriptions").delete().eq("endpoint",u);k&&console.warn("[PushManager] Erreur delete Supabase :",k),await y.unsubscribe()}i("unsubscribed"),console.log("[PushManager] ✅ Désabonné des push")}catch(w){console.error("[PushManager] Erreur désabonnement :",w),s(w.message||"Erreur lors du désabonnement"),i("subscribed")}}if(!(e!=null&&e.id))return null;const f={padding:t?"10px 12px":"14px 16px",background:"var(--surface2, #f6f6f6)",borderRadius:12,border:"1px solid var(--border, #e5e5e5)",marginBottom:12,fontSize:t?13:14},x={padding:"8px 14px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:600,fontSize:13,marginTop:8,width:"100%"};return o==="loading"?r.jsx("div",{style:f,children:r.jsx("div",{style:{color:"var(--gray, #666)"},children:"⏳ Vérification..."})}):o==="unsupported"?r.jsxs("div",{style:f,children:[r.jsx("div",{style:{color:"var(--gray, #666)"},children:"ℹ️ Votre navigateur ne supporte pas les notifications push."}),r.jsx("div",{style:{fontSize:11,color:"var(--gray, #999)",marginTop:4},children:"Utilisez Chrome, Firefox ou Edge pour activer cette fonctionnalité."})]}):o==="denied"?r.jsxs("div",{style:f,children:[r.jsx("div",{style:{color:"#c62828"},children:"🔕 Notifications bloquées"}),r.jsx("div",{style:{fontSize:11,color:"var(--gray, #666)",marginTop:4},children:"Vous avez refusé les notifications. Pour les réactiver, allez dans les paramètres de votre navigateur (🔒 icône à gauche de l'URL)."})]}):o==="subscribed"?r.jsxs("div",{style:f,children:[r.jsx("div",{style:{color:"var(--green, #2e7d32)",fontWeight:600},children:"🔔 Notifications activées"}),r.jsx("div",{style:{fontSize:11,color:"var(--gray, #666)",marginTop:4},children:"Vous recevrez des alertes pour les nouveaux messages et produits."}),r.jsx("button",{style:{...x,background:"var(--surface, #fff)",border:"1px solid var(--border, #ddd)",color:"var(--ink, #222)"},onClick:g,children:"🔕 Désactiver les notifications"}),a&&r.jsxs("div",{style:{color:"#c62828",fontSize:12,marginTop:6},children:["⚠️ ",a]})]}):o==="pending"?r.jsx("div",{style:f,children:r.jsx("div",{style:{color:"var(--gray, #666)"},children:"⏳ En cours..."})}):r.jsxs("div",{style:f,children:[r.jsx("div",{style:{fontWeight:600,marginBottom:4},children:"🔔 Activer les notifications"}),r.jsx("div",{style:{fontSize:12,color:"var(--gray, #666)",marginBottom:8},children:"Soyez alerté dès qu'un client vous envoie un message ou qu'un nouveau produit est ajouté."}),r.jsx("button",{style:{...x,background:"var(--green, #2e7d32)",color:"#fff"},onClick:c,children:"✅ Activer maintenant"}),a&&r.jsxs("div",{style:{color:"#c62828",fontSize:12,marginTop:6},children:["⚠️ ",a]})]})}const Za=[{key:"all",label:"Tous"},{key:_.messages,label:"Messages"},{key:_.orders,label:"Commandes"},{key:_.payments,label:"Paiements"},{key:_.delivery,label:"Livraison"},{key:_.business,label:"Business"},{key:_.admin,label:"Admin"},{key:_.security,label:"Sécurité"},{key:_.promotions,label:"Promos"},{key:_.system,label:"Système"}];function en(e){return e===X.critical||e==="urgent"?"notif-card-priority-critical":e===X.important||e==="high"?"notif-card-priority-important":e===X.promo||e==="promo"?"notif-card-priority-promo":"notif-card-priority-standard"}function rn({variant:e="dropdown",notifs:t=[],user:o,goPage:i,onMarkRead:a,onMarkAllRead:s,onDismiss:n,onClose:l,onPrefsUpdated:c}){const[g,f]=d.useState("all"),[x,w]=d.useState(()=>pe());d.useEffect(()=>{if(!(o!=null&&o.id)){w(pe());return}let p=!1;return mo(E,o.id).then(b=>{p||w(b)}),()=>{p=!0}},[o==null?void 0:o.id]);const y=d.useMemo(()=>Ha(t,g==="all"?null:g),[t,g]),u=p=>{Ja(E,o==null?void 0:o.id,p).then(b=>{w(b),c==null||c(b)})},k=d.useMemo(()=>t.filter(p=>!p.lu).length,[t]);return r.jsxs("div",{className:`notif-hub notif-hub--${e}`,children:[r.jsxs("div",{className:"notif-hub-toolbar",children:[r.jsxs("div",{className:"notif-hub-title-row",children:[r.jsx("h2",{className:"notif-hub-title",children:"Notifications"}),k>0&&r.jsx("span",{className:"notif-hub-badge",children:k>99?"99+":k})]}),r.jsxs("div",{className:"notif-hub-actions-top",children:[k>0&&r.jsx("button",{type:"button",className:"notif-link-btn",onClick:()=>s==null?void 0:s(),children:"Tout marquer lu"}),e==="dropdown"&&r.jsx("button",{type:"button",className:"notif-link-btn notif-link-btn-strong",onClick:()=>i==null?void 0:i("notifications"),children:"Voir tout"}),e==="dropdown"&&r.jsx("button",{type:"button",className:"notif-hub-close",onClick:()=>l==null?void 0:l(),"aria-label":"Fermer",children:"✕"})]})]}),r.jsx("div",{className:"notif-filter-strip",role:"tablist",children:Za.map(p=>r.jsx("button",{type:"button",role:"tab","aria-selected":g===p.key,className:`notif-chip${g===p.key?" notif-chip--active":""}`,onClick:()=>f(p.key),children:p.label},p.key))}),r.jsx("div",{className:e==="dropdown"?"notif-hub-scroll notif-hub-scroll--drop":"notif-hub-scroll notif-hub-scroll--page",children:y.length===0?r.jsxs("div",{className:"notif-empty premium",children:[r.jsx("div",{className:"notif-empty-icon",children:"🔕"}),r.jsx("div",{className:"notif-empty-title",children:"Aucune alerte dans ce filtre"}),r.jsx("p",{className:"notif-empty-sub",children:"Les commandes, messages et livraisons apparaîtront ici en temps réel."})]}):r.jsx("ul",{className:"notif-card-list",children:y.map(p=>{var z,C;const b=at(p);return r.jsxs("li",{className:`notif-card-li ${en(b._priority)}`,children:[r.jsxs("button",{type:"button",className:`notif-card-main${p.lu?"":" notif-card-unread"}`,onClick:()=>a==null?void 0:a(p,{navigate:!0,closeDrawer:e==="dropdown"}),children:[r.jsxs("span",{className:"notif-card-avatar","aria-hidden":!0,children:[b._image?r.jsx("img",{src:b._image,alt:"",loading:"lazy"}):r.jsx("span",{className:"notif-card-emoji",children:b._icon}),!p.lu&&r.jsx("span",{className:"notif-card-dot"})]}),r.jsxs("span",{className:"notif-card-copy",children:[r.jsxs("span",{className:"notif-card-top",children:[r.jsx("span",{className:"notif-card-title",children:b._title}),r.jsx("time",{className:"notif-card-time",dateTime:p.created_at||void 0,children:b._timeLabel})]}),r.jsx("span",{className:"notif-card-body",children:b._body}),((z=b._deeplink)==null?void 0:z.startsWith("http"))&&r.jsx("span",{className:"notif-card-cta-secondary",children:"Ouverture du lien sécurisé →"}),((C=b._deeplink)==null?void 0:C.startsWith("/"))&&r.jsx("span",{className:"notif-card-cta-secondary",children:"Appuyer pour ouvrir dans Yorix"})]})]}),r.jsxs("div",{className:"notif-card-side",children:[r.jsx("button",{type:"button",className:"notif-mini-btn",title:"Lu",onClick:I=>{I.stopPropagation(),a==null||a(p,{navigate:!1,closeDrawer:!1})},children:"✓"}),r.jsx("button",{type:"button",className:"notif-mini-btn notif-mini-btn-del",title:"Masquer",onClick:I=>{I.stopPropagation(),n==null||n(p.id)},children:"🗑"})]})]},String(b.id))})})}),r.jsxs("div",{className:"notif-hub-footer-premium",children:[r.jsxs("div",{className:"notif-preferences-mini",children:[r.jsx("div",{className:"notif-preferences-title",children:"Préférences (compte synchronisé)"}),r.jsxs("label",{className:"notif-toggle",children:[r.jsx("input",{type:"checkbox",checked:x.pushBrowser,onChange:p=>u({pushBrowser:p.target.checked})}),"Alertes bureau (navigateur ouvert)"]}),r.jsxs("label",{className:"notif-toggle",children:[r.jsx("input",{type:"checkbox",checked:x.sound,onChange:p=>u({sound:p.target.checked})}),"Son discret (si navigateur autorise)"]})]}),r.jsx(Qa,{user:o,compact:!0})]})]})}function tn({goPage:e,freeShippingThresholdXaf:t=25e3}){var o;return r.jsxs("footer",{className:"footer footer--premium",children:[r.jsx("div",{className:"footer-premium-accent","aria-hidden":!0}),r.jsxs("div",{className:"footer-trust-strip",children:[r.jsx("span",{className:"fts-item",children:"🔐 Escrow vérifiable"}),r.jsx("span",{className:"fts-item",children:"📱 MoMo · Orange Money"}),r.jsxs("span",{className:"fts-item",children:["Livraison offerte dès ",((o=t==null?void 0:t.toLocaleString)==null?void 0:o.call(t,"fr-FR"))??"—"," FCFA"]}),r.jsx("span",{className:"fts-item",children:"🇨🇲 Support WhatsApp CM"})]}),r.jsxs("div",{className:"footer-grid",children:[r.jsxs("div",{className:"footer-brand-col",children:[r.jsxs("div",{className:"footer-logo",children:["Yo",r.jsx("span",{children:"rix"})," CM"]}),r.jsx("p",{className:"footer-desc",children:"Marketplace camerounaise — catalogue produits, prestataires terrain, livraison Yorix Ride, paiements traçables et programme de fidélité."}),r.jsxs("div",{className:"footer-contact",children:[r.jsx("span",{children:"📞 +237 696 56 56 54"}),r.jsx("span",{children:"✉️ support@yorix.cm"}),r.jsx("span",{children:"🇨🇲 Douala · Yaoundé · Bafoussam · tout le pays"})]}),r.jsxs("div",{className:"footer-cta-cluster",children:[r.jsx("button",{type:"button",className:"footer-cta-chip",onClick:()=>e("produits"),children:"Parcourir les produits"}),r.jsx("button",{type:"button",className:"footer-cta-chip footer-cta-chip--ghost",onClick:()=>e("aide"),children:"Centre d'aide"})]})]}),r.jsxs("nav",{className:"footer-col","aria-label":"Marketplace",children:[r.jsx("h4",{children:"Marketplace"}),r.jsx("ul",{children:[{l:"Tous les produits",p:"produits"},{l:"Panier · checkout",p:"cart"},{l:"Livraison",p:"livraison"},{l:"Bons plans",p:"bonsPlans"},{l:"Acheter à Douala",nav:()=>e("seoCity",{citySlug:"douala",mode:"acheter"})},{l:"Vendre sur Yorix",p:"devenirVendeur"}].map(i=>r.jsx("li",{children:r.jsx("button",{type:"button",onClick:()=>i.nav?i.nav():e(i.p),children:i.l})},i.l))})]}),r.jsxs("nav",{className:"footer-col","aria-label":"Services et confiance",children:[r.jsx("h4",{children:"Services & confiance"}),r.jsx("ul",{children:[{l:"Escrow 🔐",p:"escrow"},{l:"Prestataires",p:"prestataires"},{l:"Business 💼",p:"business"},{l:"Academy 🎓",p:"academy"},{l:"Blog & guides",p:"blog"},{l:"Fidélité ⭐",p:"loyalty"},{l:"Livraison à Yaoundé",nav:()=>e("livraison",{citySlug:"yaounde"})}].map(i=>r.jsx("li",{children:r.jsx("button",{type:"button",onClick:()=>i.nav?i.nav():e(i.p),children:i.l})},i.l))})]}),r.jsxs("nav",{className:"footer-col","aria-label":"Rejoindre et légal",children:[r.jsx("h4",{children:"Rejoindre Yorix"}),r.jsx("ul",{children:[{l:"Devenir livreur",p:"devenirLivreur"},{l:"Devenir prestataire",p:"inscription"},{l:"Contact",p:"contact"},{l:"FAQ",p:"faq"},{l:"SOS · Aide",p:"aide"},{l:"Mentions légales",p:"mentions"},{l:"CGV",p:"cgv"},{l:"Confidentialité",p:"confidentialite"}].map(i=>r.jsx("li",{children:r.jsx("button",{type:"button",onClick:()=>e(i.p),children:i.l})},i.l))})]})]}),r.jsxs("div",{className:"footer-bottom",children:[r.jsx("span",{className:"footer-copy",children:"© 2026 Yorix Cameroun — RC: DOUALA/2026/B237"}),r.jsxs("div",{className:"fb-badges",role:"list",children:[r.jsx("span",{className:"fbb",role:"listitem",children:"📱 MTN MoMo"}),r.jsx("span",{className:"fbb",role:"listitem",children:"🔶 Orange Money"}),r.jsx("span",{className:"fbb",role:"listitem",children:"🔐 Escrow"}),r.jsx("span",{className:"fbb",role:"listitem",children:"🇨🇲 Made in CM"})]})]})]})}function on({open:e,onClose:t,onSelectAction:o,user:i}){const[a,s]=d.useState(!1);if(d.useEffect(()=>{const c=()=>s(window.innerWidth<600);return c(),window.addEventListener("resize",c),()=>window.removeEventListener("resize",c)},[]),d.useEffect(()=>(e?document.body.style.overflow="hidden":document.body.style.overflow="",()=>{document.body.style.overflow=""}),[e]),!e)return null;const n=[{id:"buy",icon:"🛍️",title:"Acheter",desc:"Des milliers de produits livrés à Yaoundé, Douala et partout.",color:"linear-gradient(135deg, #10b981, #059669)",bgIcon:"rgba(16, 185, 129, .12)",cta:"Explorer maintenant",badge:"⭐ Populaire",badgeColor:"#fcd116",miniBadge:"🔒 Escrow inclus"},{id:"sell",icon:"🏪",title:"Vendre",desc:"Créez votre boutique en 2 minutes. Vendez dès aujourd'hui.",color:"linear-gradient(135deg, #f59e0b, #d97706)",bgIcon:"rgba(245, 158, 11, .12)",cta:"Ouvrir ma boutique",badge:null,miniBadge:"💰 Commission 5%"},{id:"service",icon:"👷",title:"Trouver un pro",desc:"Plombiers, électriciens, photographes — tous vérifiés.",color:"linear-gradient(135deg, #8b5cf6, #7c3aed)",bgIcon:"rgba(139, 92, 246, .12)",cta:"Trouver un pro",badge:null,miniBadge:"✓ 850+ vérifiés"},{id:"delivery",icon:"🚚",title:"Faire livrer",desc:"Un livreur récupère votre colis en moins de 30 min.",color:"linear-gradient(135deg, #3b82f6, #2563eb)",bgIcon:"rgba(59, 130, 246, .12)",cta:"Appeler un livreur",badge:null,miniBadge:"⚡ ~25 min"}],l=[{icon:"🛡️",label:"Paiement sécurisé"},{icon:"✅",label:"Vendeurs vérifiés"},{icon:"🇨🇲",label:"100% Cameroun"},{icon:"⚡",label:"Inscription 2 min"}];return r.jsx("div",{onClick:c=>c.target===c.currentTarget&&t(),style:{position:"fixed",inset:0,background:"rgba(10, 20, 16, 0.88)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",zIndex:99999,display:"flex",alignItems:"center",justifyContent:"center",padding:a?"12px":"20px",overflowY:"auto",animation:"yfadeIn .25s ease"},children:r.jsxs("div",{style:{background:"var(--surface, #fff)",borderRadius:a?18:22,maxWidth:880,width:"100%",padding:a?"26px 18px 22px":"36px 32px 28px",position:"relative",boxShadow:"0 28px 70px rgba(0,0,0,.45)",animation:"yslideUp .35s cubic-bezier(.2,.8,.2,1)",maxHeight:"94vh",overflowY:"auto"},children:[r.jsx("button",{onClick:t,style:{position:"absolute",top:14,right:14,background:"var(--surface2, #f5f5f5)",border:"none",width:38,height:38,borderRadius:"50%",cursor:"pointer",fontSize:"1.05rem",color:"var(--ink, #111)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2,fontWeight:600},"aria-label":"Fermer",children:"✕"}),r.jsxs("div",{style:{textAlign:"center",marginBottom:a?18:22},children:[r.jsx("div",{style:{display:"inline-flex",alignItems:"center",gap:6,background:"var(--green-pale, #e8f5e9)",color:"var(--green, #1a6b3a)",padding:"5px 14px",borderRadius:50,fontSize:".7rem",fontWeight:700,marginBottom:12,letterSpacing:".02em"},children:"🇨🇲 Bienvenue sur Yorix CM"}),r.jsx("h1",{style:{fontFamily:"'Syne',sans-serif",fontSize:a?"1.45rem":"1.85rem",fontWeight:800,color:"var(--ink, #111)",marginBottom:8,letterSpacing:"-.5px",lineHeight:1.18},children:"Que voulez-vous faire aujourd'hui ?"}),r.jsx("p",{style:{color:"var(--gray, #666)",fontSize:a?".84rem":".92rem",maxWidth:520,margin:"0 auto",lineHeight:1.55},children:"Acheter, vendre, faire livrer ou trouver un pro — Yorix s'occupe du reste."})]}),r.jsx("div",{style:{display:"flex",gap:a?6:8,justifyContent:"center",flexWrap:a?"nowrap":"wrap",overflowX:a?"auto":"visible",marginBottom:a?18:24,paddingBottom:a?4:0,scrollbarWidth:"none",msOverflowStyle:"none"},className:"yorix-trust-badges",children:l.map((c,g)=>r.jsxs("div",{style:{background:"var(--surface2, #f8f8f8)",border:"1px solid var(--border, #e5e5e5)",color:"var(--ink, #111)",padding:a?"6px 11px":"7px 14px",borderRadius:50,fontSize:a?".68rem":".74rem",fontWeight:600,whiteSpace:"nowrap",display:"inline-flex",alignItems:"center",gap:5,fontFamily:"'DM Sans',sans-serif",animation:`yfadeIn .4s ease ${.1+g*.05}s both`,flexShrink:0},children:[r.jsx("span",{style:{fontSize:".95em"},children:c.icon}),r.jsx("span",{children:c.label})]},c.label))}),r.jsx("div",{style:{display:"grid",gridTemplateColumns:a?"1fr":"repeat(2, 1fr)",gap:a?12:16,marginBottom:18},children:n.map((c,g)=>r.jsxs("button",{onClick:()=>o(c.id),style:{background:"var(--surface, #fff)",border:"1.5px solid var(--border, #e5e5e5)",borderRadius:16,padding:a?"20px 18px":"24px 22px",cursor:"pointer",textAlign:"left",transition:"all .25s cubic-bezier(.2,.8,.2,1)",position:"relative",overflow:"hidden",fontFamily:"inherit",minHeight:a?0:220,display:"flex",flexDirection:"column",animation:`yslideUp .4s cubic-bezier(.2,.8,.2,1) ${.15+g*.08}s both`},onMouseOver:f=>{a||(f.currentTarget.style.transform="translateY(-4px)",f.currentTarget.style.boxShadow="0 14px 32px rgba(0,0,0,.12)",f.currentTarget.style.borderColor="transparent")},onMouseOut:f=>{a||(f.currentTarget.style.transform="none",f.currentTarget.style.boxShadow="none",f.currentTarget.style.borderColor="var(--border, #e5e5e5)")},onTouchStart:f=>{f.currentTarget.style.transform="scale(0.98)"},onTouchEnd:f=>{f.currentTarget.style.transform="none"},children:[r.jsx("div",{style:{position:"absolute",top:-14,right:-14,width:80,height:80,background:c.bgIcon,borderRadius:"50%",zIndex:0}}),c.badge&&r.jsx("div",{style:{position:"absolute",top:12,right:12,background:c.badgeColor,color:"#0d1f14",padding:"3px 9px",borderRadius:50,fontSize:".62rem",fontWeight:800,fontFamily:"'Syne',sans-serif",letterSpacing:".03em",zIndex:2,boxShadow:"0 2px 6px rgba(0,0,0,.15)"},children:c.badge}),r.jsxs("div",{style:{position:"relative",zIndex:1,flex:1,display:"flex",flexDirection:"column"},children:[r.jsx("div",{style:{width:a?48:54,height:a?48:54,borderRadius:13,background:c.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:a?"1.55rem":"1.75rem",marginBottom:12,boxShadow:"0 6px 16px rgba(0,0,0,.14), inset 0 -2px 0 rgba(0,0,0,.08)"},children:c.icon}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:a?"1.05rem":"1.15rem",color:"var(--ink, #111)",marginBottom:6,letterSpacing:"-.3px"},children:c.title}),r.jsx("div",{style:{fontSize:a?".8rem":".83rem",color:"var(--gray, #666)",lineHeight:1.55,marginBottom:10,flex:1},children:c.desc}),r.jsx("div",{style:{display:"inline-flex",alignItems:"center",background:"var(--surface2, #f5f5f5)",color:"var(--ink, #111)",padding:"3px 9px",borderRadius:50,fontSize:".66rem",fontWeight:600,marginBottom:12,alignSelf:"flex-start",fontFamily:"'DM Sans',sans-serif"},children:c.miniBadge}),r.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:5,fontSize:a?".78rem":".82rem",fontWeight:800,color:"var(--green, #1a6b3a)",fontFamily:"'Syne',sans-serif",letterSpacing:"-.1px"},children:[c.cta," ",r.jsx("span",{style:{fontSize:"1.05em"},children:"→"})]})]})]},c.id))}),r.jsxs("div",{style:{textAlign:"center",paddingTop:14,borderTop:"1px solid var(--border, #e5e5e5)",marginTop:4},children:[i?r.jsx("p",{style:{fontSize:a?".74rem":".78rem",color:"var(--green, #1a6b3a)",marginBottom:8,fontWeight:600},children:"✅ Connecté. Choisissez une action pour continuer."}):r.jsx("p",{style:{fontSize:a?".74rem":".78rem",color:"var(--gray, #666)",marginBottom:8},children:"💡 Pas encore inscrit ? Vous pourrez créer votre compte après avoir choisi."}),r.jsx("button",{onClick:t,style:{background:"transparent",border:"none",color:"var(--gray, #666)",fontSize:".78rem",cursor:"pointer",textDecoration:"underline",fontFamily:"inherit",padding:"4px 8px"},children:"Explorer librement le site"})]}),r.jsx("style",{children:`
          @keyframes yfadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes yslideUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .yorix-trust-badges::-webkit-scrollbar { display: none; }
        `})]})})}const Fr="v1.0",Rt={seller:{icon:"🏪",label:"Vendeur",color:"#f59e0b",engagement:"Je m'engage à fournir des produits conformes, authentiques et à respecter les transactions Yorix."},provider:{icon:"👷",label:"Prestataire",color:"#8b5cf6",engagement:"Je m'engage à fournir des services conformes, professionnels et à respecter mes clients."},delivery:{icon:"🚚",label:"Livreur",color:"#3b82f6",engagement:"Je m'engage à respecter les tarifs Yorix Ride, livrer les colis avec soin et dans les délais."}};function an({open:e,onClose:t,onAccepted:o,user:i,userData:a,role:s="seller",authForm:n={}}){const[l,c]=d.useState(!1),[g,f]=d.useState(!1),[x,w]=d.useState(!1),[y,u]=d.useState(!1),[k,p]=d.useState(""),b=d.useRef(null);if(d.useEffect(()=>{e&&(c(!1),f(!1),w(!1),p(""))},[e]),!e)return null;const z=Rt[s]||Rt.seller,C=S=>{const P=S.target;P.scrollHeight-P.scrollTop-P.clientHeight<50&&!l&&c(!0)},I=()=>{if(!l){p("Veuillez d'abord lire l'intégralité du contrat (scrollez jusqu'en bas).");return}if(!g){p("Vous devez cocher la case d'acceptation pour continuer.");return}p(""),w(!0)},L=async()=>{u(!0),p("");try{let S="unknown";try{S=(await(await fetch("https://api.ipify.org?format=json")).json()).ip||"unknown"}catch(Z){console.warn("Impossible de récupérer l'IP:",Z)}const P=navigator.userAgent||"unknown",W=(n==null?void 0:n.nom)||(a==null?void 0:a.nom)||"Inconnu",G=(n==null?void 0:n.tel)||(a==null?void 0:a.telephone)||"Inconnu",{error:J}=await E.from("user_contract_acceptance").insert({user_id:(i==null?void 0:i.id)||null,full_name:W,phone:G,role:s,contract_version:Fr,accepted_at:new Date().toISOString(),ip_address:S,user_agent:P,acceptance_checkbox:!0,otp_verified:!1,signature_type:"checkbox_v1"});J&&console.warn("Acceptance DB error:",J),u(!1),w(!1),o({version:Fr,acceptedAt:new Date().toISOString(),ip:S,userAgent:P})}catch(S){console.error("Erreur acceptance:",S),p("Erreur : "+(S.message||"Impossible d'enregistrer l'acceptation.")),u(!1)}};return r.jsxs(r.Fragment,{children:[r.jsx("div",{onClick:S=>S.target===S.currentTarget&&!y&&t(),style:{position:"fixed",inset:0,background:"rgba(10, 20, 16, 0.88)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",zIndex:99998,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",animation:"yfadeIn .25s ease"},children:r.jsxs("div",{style:{background:"var(--surface, #fff)",borderRadius:18,maxWidth:720,width:"100%",maxHeight:"92vh",display:"flex",flexDirection:"column",boxShadow:"0 28px 70px rgba(0,0,0,.45)",animation:"yslideUp .3s cubic-bezier(.2,.8,.2,1)",overflow:"hidden"},children:[r.jsxs("div",{style:{background:"linear-gradient(135deg, #0a1410 0%, #1a3a24 100%)",padding:"20px 24px",color:"#fff",position:"relative"},children:[r.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:6,background:z.color,color:"#fff",padding:"4px 12px",borderRadius:50,fontSize:".7rem",fontWeight:700,marginBottom:8},children:[z.icon," Inscription ",z.label]}),r.jsx("h2",{style:{fontFamily:"'Syne',sans-serif",fontSize:"1.3rem",fontWeight:800,marginBottom:4,letterSpacing:"-.4px",lineHeight:1.2},children:"Contrat d'utilisation et d'engagement Yorix"}),r.jsx("p",{style:{color:"rgba(255,255,255,.7)",fontSize:".82rem",lineHeight:1.5,marginBottom:0},children:"Veuillez lire attentivement ces conditions. L'inscription implique votre engagement contractuel."}),r.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,height:3,background:"rgba(255,255,255,.15)"},children:r.jsx("div",{style:{height:"100%",background:"linear-gradient(90deg, var(--yellow, #fcd116), #4fd17d)",width:l?"100%":"20%",transition:"width .4s"}})})]}),r.jsxs("div",{ref:b,onScroll:C,style:{padding:"20px 24px",overflowY:"auto",flex:1,fontSize:".84rem",lineHeight:1.65,color:"var(--ink, #111)",fontFamily:"'DM Sans',sans-serif"},children:[r.jsx(nn,{role:s,roleInfo:z}),!l&&r.jsx("div",{style:{position:"sticky",bottom:0,textAlign:"center",padding:"10px",background:"linear-gradient(to top, var(--surface, #fff) 60%, rgba(255,255,255,0))",pointerEvents:"none",fontSize:".74rem",color:"var(--gray, #666)",fontWeight:600},children:"⬇ Continuez à scroller pour activer l'acceptation"}),l&&r.jsx("div",{style:{textAlign:"center",padding:"12px",marginTop:16,background:"var(--green-pale, #e8f5e9)",border:"1px solid var(--green-light, #86efac)",borderRadius:9,fontSize:".78rem",color:"var(--green, #1a6b3a)",fontWeight:700},children:"✓ Vous avez lu l'intégralité du contrat"})]}),r.jsxs("div",{style:{borderTop:"1px solid var(--border, #e5e5e5)",padding:"16px 24px",background:"var(--surface2, #f8f8f8)"},children:[r.jsxs("div",{style:{background:`${z.color}15`,border:`1.5px solid ${z.color}40`,borderRadius:9,padding:"10px 12px",marginBottom:12,fontSize:".78rem",color:"var(--ink, #111)",fontWeight:600,display:"flex",alignItems:"flex-start",gap:8},children:[r.jsx("span",{style:{fontSize:"1.1rem",flexShrink:0},children:z.icon}),r.jsx("span",{children:z.engagement})]}),r.jsxs("label",{style:{display:"flex",alignItems:"flex-start",gap:10,cursor:l?"pointer":"not-allowed",opacity:l?1:.5,marginBottom:12,userSelect:"none"},children:[r.jsx("input",{type:"checkbox",checked:g,onChange:S=>{l&&f(S.target.checked)},disabled:!l,style:{marginTop:2,width:18,height:18,cursor:l?"pointer":"not-allowed",accentColor:"var(--green, #1a6b3a)",flexShrink:0}}),r.jsx("span",{style:{fontSize:".82rem",lineHeight:1.5,color:"var(--ink, #111)",fontWeight:600},children:"J'ai lu, compris et j'accepte les conditions d'utilisation, commissions, règles et engagements de Yorix."})]}),r.jsx("p",{style:{fontSize:".7rem",color:"var(--gray, #666)",marginBottom:12,lineHeight:1.5},children:"🛡️ Cette étape protège Yorix, vos clients et votre activité. Yorix protège ses utilisateurs grâce à des engagements de transparence, qualité et sécurité."}),k&&r.jsxs("div",{style:{background:"#fff0f0",border:"1px solid #fecaca",color:"#ce1126",padding:"8px 12px",borderRadius:7,fontSize:".78rem",marginBottom:10},children:["⚠️ ",k]}),r.jsxs("div",{style:{display:"flex",gap:8},children:[r.jsx("button",{onClick:t,disabled:y,style:{flex:1,background:"var(--surface, #fff)",color:"var(--ink, #111)",border:"1.5px solid var(--border, #e5e5e5)",padding:"12px 16px",borderRadius:9,fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".85rem",cursor:y?"not-allowed":"pointer"},children:"Annuler"}),r.jsx("button",{onClick:I,disabled:!l||!g||y,style:{flex:2,background:l&&g?"linear-gradient(135deg, var(--green, #1a6b3a), #0d4d28)":"var(--border, #e5e5e5)",color:l&&g?"#fff":"var(--gray, #666)",border:"none",padding:"12px 16px",borderRadius:9,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".88rem",cursor:l&&g&&!y?"pointer":"not-allowed",transition:"all .2s"},children:"✓ Accepter et continuer"})]})]})]})}),x&&r.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",backdropFilter:"blur(4px)",zIndex:99999,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",animation:"yfadeIn .2s ease"},children:r.jsxs("div",{style:{background:"var(--surface, #fff)",borderRadius:14,maxWidth:440,width:"100%",padding:"24px 22px",boxShadow:"0 20px 50px rgba(0,0,0,.4)",animation:"yslideUp .3s cubic-bezier(.2,.8,.2,1)"},children:[r.jsxs("div",{style:{textAlign:"center",marginBottom:16},children:[r.jsx("div",{style:{fontSize:"2.5rem",marginBottom:8},children:"📜"}),r.jsx("h3",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.15rem",color:"var(--ink, #111)",marginBottom:6,letterSpacing:"-.3px"},children:"Confirmer votre engagement"}),r.jsxs("p",{style:{fontSize:".84rem",color:"var(--gray, #666)",lineHeight:1.6},children:["En acceptant, vous reconnaissez être ",r.jsx("strong",{style:{color:"var(--ink, #111)"},children:"légalement engagé"})," envers les conditions Yorix. Cette acceptation sera tracée et conservée comme preuve."]})]}),r.jsxs("div",{style:{background:"var(--surface2, #f5f5f5)",border:"1px solid var(--border, #e5e5e5)",borderRadius:9,padding:"12px 14px",marginBottom:14,fontSize:".74rem"},children:[r.jsx("div",{style:{fontWeight:700,marginBottom:6,color:"var(--gray, #666)"},children:"📋 Informations enregistrées :"}),r.jsxs("div",{style:{color:"var(--ink, #111)",lineHeight:1.7},children:[r.jsxs("div",{children:["👤 ",r.jsx("strong",{children:(n==null?void 0:n.nom)||(a==null?void 0:a.nom)||"—"})]}),r.jsxs("div",{children:["📞 ",(n==null?void 0:n.tel)||(a==null?void 0:a.telephone)||"—"]}),r.jsxs("div",{children:[z.icon," Rôle : ",z.label]}),r.jsxs("div",{children:["📅 ",new Date().toLocaleString("fr-FR")]}),r.jsxs("div",{children:["📝 Contrat version ",Fr]})]})]}),k&&r.jsxs("div",{style:{background:"#fff0f0",border:"1px solid #fecaca",color:"#ce1126",padding:"8px 12px",borderRadius:7,fontSize:".78rem",marginBottom:10},children:["⚠️ ",k]}),r.jsxs("div",{style:{display:"flex",gap:8},children:[r.jsx("button",{onClick:()=>w(!1),disabled:y,style:{flex:1,background:"var(--surface, #fff)",color:"var(--ink, #111)",border:"1.5px solid var(--border, #e5e5e5)",padding:"11px 16px",borderRadius:9,fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".82rem",cursor:y?"not-allowed":"pointer"},children:"← Annuler"}),r.jsx("button",{onClick:L,disabled:y,style:{flex:1.5,background:"linear-gradient(135deg, var(--green, #1a6b3a), #0d4d28)",color:"#fff",border:"none",padding:"11px 16px",borderRadius:9,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".82rem",cursor:y?"wait":"pointer",opacity:y?.7:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6},children:y?r.jsxs(r.Fragment,{children:[r.jsx("span",{style:{width:14,height:14,border:"2px solid #fff",borderTopColor:"transparent",borderRadius:"50%",animation:"spin .7s linear infinite"}}),"Enregistrement..."]}):"✓ Accepter et continuer"})]})]})}),r.jsx("style",{children:`
        @keyframes yfadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes yslideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `})]})}function nn({role:e,roleInfo:t}){const o=({children:a})=>r.jsx("h3",{style:{fontFamily:"'Syne',sans-serif",fontSize:".95rem",fontWeight:800,color:"var(--ink, #111)",marginTop:18,marginBottom:8,letterSpacing:"-.2px"},children:a}),i=({children:a})=>r.jsx("h4",{style:{fontFamily:"'Syne',sans-serif",fontSize:".84rem",fontWeight:700,color:"var(--ink, #111)",marginTop:12,marginBottom:6},children:a});return r.jsxs("div",{children:[r.jsxs("div",{style:{background:"var(--green-pale, #e8f5e9)",border:"1px solid var(--green-light, #86efac)",borderRadius:9,padding:"10px 12px",marginBottom:14,fontSize:".78rem"},children:[r.jsxs("div",{style:{fontWeight:700,color:"var(--green, #1a6b3a)",marginBottom:4},children:["📜 Contrat Yorix CM — Version v1.0 — ",new Date().toLocaleDateString("fr-FR")]}),r.jsx("div",{style:{color:"var(--ink, #111)"},children:"Marketplace camerounaise • Vendeurs • Prestataires • Livreurs"})]}),r.jsx(o,{children:"PRÉAMBULE"}),r.jsxs("p",{children:["Le présent contrat régit les relations entre ",r.jsx("strong",{children:"YORIX CAMEROUN"})," (« Yorix »), exploitant www.yorix.cm, et toute personne physique ou morale (« l'Utilisateur Professionnel ») souhaitant proposer des produits, services ou livraisons via la Plateforme."]}),r.jsx("p",{children:"En cochant la case d'acceptation, vous reconnaissez avoir lu, compris et accepté l'intégralité des présentes conditions, et vous engagez juridiquement à les respecter."}),r.jsx(o,{children:"ARTICLE 1 — OBJET"}),r.jsxs("p",{children:["Le présent Contrat définit les conditions d'utilisation de Yorix pour vendre des produits, proposer des services ou effectuer des livraisons. L'inscription est ",r.jsx("strong",{children:"gratuite"}),". Yorix se rémunère via une commission de 5% sur chaque transaction."]}),r.jsx(o,{children:"ARTICLE 2 — INSCRIPTION ET VÉRIFICATION"}),r.jsxs("p",{children:["Pour vous inscrire, vous devez : être âgé d'",r.jsx("strong",{children:"au moins 18 ans"}),", disposer d'une ",r.jsx("strong",{children:"pièce d'identité valide"}),", fournir un ",r.jsx("strong",{children:"numéro camerounais"})," actif (MTN ou Orange) et fournir des informations exactes."]}),r.jsx("p",{children:"Yorix se réserve le droit de demander des justificatifs (CNI, attestation, photo) à tout moment. Les comptes non vérifiés peuvent être suspendus."}),r.jsx(o,{children:"ARTICLE 3 — ENGAGEMENTS COMMUNS"}),r.jsx("p",{children:"En vous inscrivant, vous vous engagez à :"}),r.jsxs("ul",{style:{paddingLeft:20,marginTop:6},children:[r.jsx("li",{children:"Respecter les Acheteurs : courtoisie, professionnalisme, honnêteté"}),r.jsx("li",{children:"Fournir des informations exactes"}),r.jsx("li",{children:"Respecter les engagements (délai, qualité, prix)"}),r.jsxs("li",{children:[r.jsx("strong",{children:"Ne jamais contourner Yorix"})," en proposant un paiement direct hors plateforme"]}),r.jsx("li",{children:"Ne pas frauder (faux avis, faux profils, doubles comptes)"}),r.jsx("li",{children:"Respecter les lois camerounaises en vigueur"}),r.jsx("li",{children:"Maintenir un comportement professionnel"}),r.jsx("li",{children:"Coopérer avec Yorix en cas de litige"})]}),r.jsx(o,{children:"ARTICLE 4 — ENGAGEMENT SPÉCIFIQUE À VOTRE RÔLE"}),r.jsxs("div",{style:{background:`${t.color}15`,border:`1.5px solid ${t.color}50`,borderRadius:9,padding:"12px 14px",marginTop:8},children:[r.jsxs("div",{style:{fontWeight:800,marginBottom:6,color:"var(--ink, #111)"},children:[t.icon," En tant que ",t.label]}),e==="seller"&&r.jsxs("ul",{style:{paddingLeft:20,marginTop:4},children:[r.jsxs("li",{children:["Je m'engage à fournir des ",r.jsx("strong",{children:"produits conformes"})," à leur description"]}),r.jsxs("li",{children:["Je garantis que mes produits sont ",r.jsx("strong",{children:"authentiques et légaux"})]}),r.jsxs("li",{children:["Je m'engage à ",r.jsx("strong",{children:"expédier dans les délais"})," annoncés"]}),r.jsxs("li",{children:["J'accepte la ",r.jsx("strong",{children:"commission Yorix de 5%"})," sur chaque vente"]}),r.jsxs("li",{children:["J'accepte le système ",r.jsx("strong",{children:"Escrow"})," (libération des fonds après livraison validée)"]}),r.jsxs("li",{children:["Je m'engage à ",r.jsx("strong",{children:"rembourser"})," en cas de produit non conforme"]}),r.jsxs("li",{children:["Je ne vendrai ",r.jsx("strong",{children:"jamais de produits contrefaits, illégaux ou dangereux"})]})]}),e==="provider"&&r.jsxs("ul",{style:{paddingLeft:20,marginTop:4},children:[r.jsxs("li",{children:["Je m'engage à fournir des ",r.jsx("strong",{children:"services conformes et professionnels"})]}),r.jsxs("li",{children:["Je garantis avoir les ",r.jsx("strong",{children:"qualifications nécessaires"})]}),r.jsxs("li",{children:["Je m'engage à ",r.jsx("strong",{children:"respecter les rendez-vous"})," et délais"]}),r.jsxs("li",{children:["Je facture des ",r.jsx("strong",{children:"tarifs justes et transparents"})]}),r.jsxs("li",{children:["Tarifs Yorix recommandés : ",r.jsx("strong",{children:"10 000 FCFA / projet"})," ou ",r.jsx("strong",{children:"5 000 FCFA / heure"})]}),r.jsxs("li",{children:["J'accepte la ",r.jsx("strong",{children:"commission Yorix de 5%"})]}),r.jsxs("li",{children:["Je ne solliciterai ",r.jsx("strong",{children:"jamais de paiement hors Yorix"})," pour contourner la commission"]})]}),e==="delivery"&&r.jsxs("ul",{style:{paddingLeft:20,marginTop:4},children:[r.jsxs("li",{children:["Je m'engage à ",r.jsx("strong",{children:"respecter les tarifs Yorix Ride"})," affichés au client"]}),r.jsxs("li",{children:["Je m'engage à ",r.jsx("strong",{children:"livrer les colis confiés"})," dans les délais"]}),r.jsxs("li",{children:["J'accepte la ",r.jsx("strong",{children:"commission Yorix"})," sur chaque livraison"]}),r.jsxs("li",{children:["Je dispose d'un ",r.jsx("strong",{children:"véhicule en bon état"})," et des ",r.jsx("strong",{children:"documents légaux"})]}),r.jsxs("li",{children:["Je traiterai les colis avec ",r.jsx("strong",{children:"soin et confidentialité"})]}),r.jsxs("li",{children:["En cas de ",r.jsx("strong",{children:"perte ou détérioration"}),", j'accepte d'être tenu responsable"]}),r.jsxs("li",{children:["Je n'effectuerai ",r.jsx("strong",{children:"aucune livraison illégale"})," (drogues, armes, contrefaçons)"]})]})]}),r.jsx(o,{children:"ARTICLE 5 — COMMISSIONS ET PAIEMENTS"}),r.jsx(i,{children:"5.1 Commission Yorix"}),r.jsxs("p",{children:["Yorix prélève une ",r.jsx("strong",{children:"commission de 5%"})," sur chaque transaction. Exemple : pour 10 000 FCFA, vous recevez 9 500 FCFA."]}),r.jsx(i,{children:"5.2 Paiement"}),r.jsxs("p",{children:["Versement via ",r.jsx("strong",{children:"MTN MoMo"})," ou ",r.jsx("strong",{children:"Orange Money"}),", au plus tard ",r.jsx("strong",{children:"48 heures"})," après validation de la livraison/prestation."]}),r.jsx(i,{children:"5.3 Modification des commissions"}),r.jsxs("p",{children:["Yorix peut modifier les commissions avec un ",r.jsx("strong",{children:"préavis de 30 jours"}),"."]}),r.jsx(o,{children:"ARTICLE 6 — SYSTÈME ESCROW"}),r.jsxs("p",{children:["Les fonds versés par l'Acheteur sont ",r.jsx("strong",{children:"bloqués chez Yorix"})," jusqu'à validation de la livraison. En cas de litige, Yorix arbitre sous ",r.jsx("strong",{children:"48h maximum"}),"."]}),r.jsx(o,{children:"ARTICLE 7 — NOTATION ET RÉPUTATION"}),r.jsxs("p",{children:["Les Acheteurs notent de ",r.jsx("strong",{children:"1 à 5 étoiles"}),". Une note moyenne sous ",r.jsx("strong",{children:"3,0/5"})," sur plus de 10 avis peut entraîner suspension. Tout faux avis entraîne l'",r.jsx("strong",{children:"exclusion immédiate"}),"."]}),r.jsx(o,{children:"ARTICLE 8 — INTERDICTIONS ET SANCTIONS"}),r.jsx("p",{children:r.jsx("strong",{children:"Strictement interdit :"})}),r.jsxs("ul",{style:{paddingLeft:20},children:[r.jsx("li",{children:"Contournement de la plateforme (paiement direct)"}),r.jsx("li",{children:"Faux avis, faux profils, fausses livraisons"}),r.jsx("li",{children:"Vente de produits illégaux, contrefaits, dangereux"}),r.jsx("li",{children:"Discrimination, harcèlement, propos haineux"}),r.jsx("li",{children:"Usurpation d'identité"}),r.jsx("li",{children:"Tentative de piratage"})]}),r.jsxs("p",{children:[r.jsx("strong",{children:"Sanctions :"})," avertissement, suspension (24h-30j), exclusion définitive, retenue des paiements, poursuites judiciaires."]}),r.jsx(o,{children:"ARTICLE 9 — RESPONSABILITÉ"}),r.jsxs("p",{children:["Vous êtes ",r.jsx("strong",{children:"seul responsable"})," de vos produits/services/livraisons. Yorix agit comme ",r.jsx("strong",{children:"intermédiaire technique"}),"."]}),r.jsx(o,{children:"ARTICLE 10 — DONNÉES PERSONNELLES"}),r.jsxs("p",{children:["Vos données sont stockées de manière sécurisée et jamais revendues. Droit d'accès, rectification, suppression : ",r.jsx("strong",{children:"support@yorix.cm"}),"."]}),r.jsx(o,{children:"ARTICLE 11 — TRAÇABILITÉ DE L'ACCEPTATION"}),r.jsxs("p",{children:["En cochant la case, sont enregistrés : votre nom, téléphone, rôle, date/heure, IP, navigateur, version du contrat. Ces informations constituent une ",r.jsx("strong",{children:"preuve juridique"}),"."]}),r.jsx(o,{children:"ARTICLE 12 — MODIFICATION DU CONTRAT"}),r.jsx("p",{children:"Yorix peut modifier ce contrat. Vous serez notifié par email et devrez réaccepter la nouvelle version lors de votre prochaine connexion."}),r.jsx(o,{children:"ARTICLE 13 — RÉSILIATION"}),r.jsxs("p",{children:["Vous pouvez résilier à tout moment via ",r.jsx("strong",{children:"support@yorix.cm"}),". Yorix peut résilier sans préavis en cas de manquement grave, fraude."]}),r.jsx(o,{children:"ARTICLE 14 — DROIT APPLICABLE"}),r.jsxs("p",{children:["Contrat régi par le ",r.jsx("strong",{children:"droit camerounais"}),". En cas de litige : tribunaux compétents de ",r.jsx("strong",{children:"Douala"}),"."]}),r.jsx(o,{children:"ARTICLE 15 — CONTACT"}),r.jsxs("p",{children:["📧 support@yorix.cm",r.jsx("br",{}),"📱 +237 696 56 56 54",r.jsx("br",{}),"📍 Douala / Yaoundé, Cameroun"]}),r.jsxs("div",{style:{marginTop:24,padding:"14px 16px",background:"linear-gradient(135deg, #1a3a24, #0d3320)",borderRadius:11,color:"#fff"},children:[r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".95rem",marginBottom:6},children:"🤝 Engagement final"}),r.jsx("p",{style:{color:"rgba(255,255,255,.85)",fontSize:".82rem",lineHeight:1.6,marginBottom:0},children:"En acceptant, je reconnais que je ne crée pas simplement un compte. Je m'engage à respecter un système, des engagements professionnels et des obligations légales. Yorix protège ses utilisateurs grâce à des engagements de transparence, qualité et sécurité."})]}),r.jsx("p",{style:{textAlign:"center",marginTop:16,fontSize:".7rem",color:"var(--gray, #666)"},children:"🇨🇲 Yorix CM — La marketplace de confiance du Cameroun"})]})}function sn({value:e="",onChange:t,placeholder:o="Entrez votre mot de passe",showStrength:i=!1,showRules:a=!1,confirmValue:s=null,autoComplete:n="current-password",autoMask:l=10,id:c,ariaLabel:g="Mot de passe"}){const[f,x]=d.useState(!1),[w,y]=d.useState(!1),u=d.useRef(null),k=d.useRef(null);d.useEffect(()=>(f&&l>0&&(k.current=setTimeout(()=>{x(!1)},l*1e3)),()=>{k.current&&clearTimeout(k.current)}),[f,l]);const p=S=>{S.preventDefault(),S.stopPropagation(),x(P=>!P),setTimeout(()=>{var P;return(P=u.current)==null?void 0:P.focus()},0)},b=d.useMemo(()=>{if(!e)return{score:0,label:"",color:""};let S=0;return e.length>=6&&S++,e.length>=10&&S++,/[A-Z]/.test(e)&&S++,/[0-9]/.test(e)&&S++,/[^A-Za-z0-9]/.test(e)&&S++,S<=1?{score:1,label:"Faible",color:"#dc2626"}:S<=2?{score:2,label:"Moyen",color:"#f59e0b"}:S<=3?{score:3,label:"Bon",color:"#3b82f6"}:S<=4?{score:4,label:"Fort",color:"#16a34a"}:{score:5,label:"Très fort",color:"#15803d"}},[e]),z=d.useMemo(()=>({length:e.length>=6,uppercase:/[A-Z]/.test(e),digit:/[0-9]/.test(e)}),[e]),C=s!==null?e&&s&&e===s:null,I=s!==null?s.length>0&&e!==s:!1,L=()=>I?"var(--red, #dc2626)":C||w?"var(--green, #1a6b3a)":"var(--border, #e5e5e5)";return r.jsxs("div",{style:{width:"100%"},children:[r.jsxs("div",{style:{position:"relative",width:"100%"},children:[r.jsx("input",{ref:u,id:c,type:f?"text":"password",value:e,onChange:S=>t(S.target.value),onFocus:()=>y(!0),onBlur:()=>y(!1),placeholder:o,autoComplete:n,"aria-label":g,style:{width:"100%",padding:"12px 48px 12px 14px",borderRadius:9,border:`1.5px solid ${L()}`,background:"var(--surface, #fff)",color:"var(--ink, #111)",fontSize:".88rem",fontFamily:"'DM Sans',sans-serif",outline:"none",transition:"border-color .15s",boxSizing:"border-box",letterSpacing:f?"0.02em":"0.1em"}}),r.jsx("button",{type:"button",onClick:p,"aria-label":f?"Masquer le mot de passe":"Afficher le mot de passe",title:f?"Masquer le mot de passe":"Afficher le mot de passe",tabIndex:0,style:{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",background:"transparent",border:"none",cursor:"pointer",padding:8,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--gray, #666)",transition:"background .15s, color .15s"},onMouseOver:S=>{S.currentTarget.style.background="var(--surface2, #f5f5f5)",S.currentTarget.style.color="var(--green, #1a6b3a)"},onMouseOut:S=>{S.currentTarget.style.background="transparent",S.currentTarget.style.color="var(--gray, #666)"},children:f?r.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[r.jsx("path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"}),r.jsx("circle",{cx:"12",cy:"12",r:"3"})]}):r.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[r.jsx("path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24"}),r.jsx("path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"}),r.jsx("path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"}),r.jsx("line",{x1:"2",y1:"2",x2:"22",y2:"22"})]})})]}),i&&e&&r.jsxs("div",{style:{marginTop:6},children:[r.jsx("div",{style:{display:"flex",gap:3,marginBottom:4},children:[1,2,3,4,5].map(S=>r.jsx("div",{style:{flex:1,height:4,borderRadius:2,background:S<=b.score?b.color:"var(--border, #e5e5e5)",transition:"background .25s"}},S))}),r.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:".68rem",fontFamily:"'DM Sans',sans-serif"},children:[r.jsx("span",{style:{color:"var(--gray, #666)"},children:"💪 Force du mot de passe"}),r.jsx("span",{style:{color:b.color,fontWeight:700},children:b.label})]})]}),a&&e&&r.jsxs("div",{style:{marginTop:8,padding:"8px 10px",background:"var(--surface2, #f5f5f5)",border:"1px solid var(--border, #e5e5e5)",borderRadius:7,display:"flex",flexDirection:"column",gap:3},children:[r.jsx(Ur,{ok:z.length,text:"Au moins 6 caractères"}),r.jsx(Ur,{ok:z.uppercase,text:"Une majuscule (recommandé)",optional:!0}),r.jsx(Ur,{ok:z.digit,text:"Un chiffre (recommandé)",optional:!0})]}),s!==null&&s.length>0&&r.jsx("div",{style:{marginTop:6,fontSize:".74rem",fontFamily:"'DM Sans',sans-serif",fontWeight:600,color:C?"var(--green, #16a34a)":"var(--red, #dc2626)",display:"flex",alignItems:"center",gap:5},children:C?r.jsx(r.Fragment,{children:"✓ Les mots de passe correspondent"}):r.jsx(r.Fragment,{children:"✗ Les mots de passe ne correspondent pas"})})]})}function Ur({ok:e,text:t,optional:o}){return r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:".72rem",color:e?"var(--green, #16a34a)":"var(--gray, #666)",fontFamily:"'DM Sans',sans-serif"},children:[r.jsx("span",{style:{width:14,height:14,borderRadius:"50%",background:e?"var(--green, #16a34a)":"var(--border, #e5e5e5)",color:"#fff",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:".55rem",fontWeight:800,flexShrink:0},children:e?"✓":"·"}),r.jsxs("span",{children:[t,o&&!e&&r.jsx("span",{style:{opacity:.6,fontSize:".66rem"},children:" (optionnel)"})]})]})}function ln({authOpen:e,setAuthOpen:t,authTab:o,setAuthTab:i,selectedRole:a,setSelectedRole:s,authForm:n,setAuthForm:l,authError:c,setAuthError:g,authLoading:f,doLogin:x,doRegister:w,doGoogle:y}){return e?r.jsx("div",{className:"modal-overlay",onClick:u=>u.target===u.currentTarget&&t(!1),children:r.jsxs("div",{className:"modal",style:{width:"100%",maxWidth:480,margin:"0 auto"},children:[r.jsx("button",{type:"button",className:"modal-close",onClick:()=>t(!1),children:"✕"}),r.jsx("div",{className:"modal-title",children:o==="login"?"Bon retour ! 👋":"Rejoindre Yorix 🇨🇲"}),r.jsx("p",{className:"modal-sub",children:"Votre marketplace camerounaise de confiance"}),r.jsxs("div",{className:"auth-tabs",children:[r.jsx("button",{type:"button",className:`auth-tab${o==="login"?" active":""}`,onClick:()=>{i("login"),g("")},children:"🔑 Connexion"}),r.jsx("button",{type:"button",className:`auth-tab${o==="register"?" active":""}`,onClick:()=>{i("register"),g("")},children:"🚀 Inscription"})]}),c&&r.jsxs("div",{className:"error-msg",children:["⚠️ ",c]}),o==="register"&&r.jsxs(r.Fragment,{children:[r.jsx("div",{style:{background:"var(--green-pale)",border:"1px solid var(--green-light)",borderRadius:9,padding:"10px 12px",marginBottom:12,fontSize:".78rem",color:"var(--green)",fontWeight:600},children:"👇 Choisissez votre profil pour commencer"}),r.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14},children:[{id:"buyer",icon:"🛍️",label:"Acheteur",desc:"J'achète des produits"},{id:"seller",icon:"🏪",label:"Vendeur",desc:"Je vends mes produits"},{id:"delivery",icon:"🚚",label:"Livreur",desc:"J'effectue des livraisons"},{id:"provider",icon:"👷",label:"Prestataire",desc:"Je propose des services"}].map(u=>r.jsxs("div",{role:"button",tabIndex:0,onClick:()=>s(u.id),onKeyDown:k=>k.key==="Enter"&&s(u.id),style:{border:`2px solid ${a===u.id?"var(--green)":"var(--border)"}`,borderRadius:10,padding:"12px 10px",cursor:"pointer",background:a===u.id?"var(--green-pale)":"var(--surface)",textAlign:"center",transition:"all .2s"},children:[r.jsx("div",{style:{fontSize:"1.8rem",marginBottom:4},children:u.icon}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem",color:"var(--ink)"},children:u.label}),r.jsx("div",{style:{fontSize:".67rem",color:"var(--gray)",marginTop:2},children:u.desc}),a===u.id&&r.jsx("div",{style:{marginTop:5,fontSize:".62rem",fontWeight:700,color:"var(--green)"},children:"✅ Sélectionné"})]},u.id))}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{className:"form-label",children:["Nom complet ",r.jsx("span",{children:"*"})]}),r.jsx("input",{className:"form-input",placeholder:"Ex: Amina Bello",value:n.nom,onChange:u=>l(k=>({...k,nom:u.target.value}))})]}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{className:"form-label",children:["Téléphone ",r.jsx("span",{children:"*"})]}),r.jsx("input",{className:"form-input",type:"tel",placeholder:"+237 6XX XXX XXX",value:n.tel,onChange:u=>l(k=>({...k,tel:u.target.value}))})]})]}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{className:"form-label",children:["Email ",r.jsx("span",{children:"*"})]}),r.jsx("input",{className:"form-input",type:"email",placeholder:"votre@email.com",value:n.email,onChange:u=>l(k=>({...k,email:u.target.value}))})]}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{className:"form-label",children:["Mot de passe ",r.jsx("span",{children:"*"})]}),r.jsx(sn,{value:n.password,onChange:u=>l(k=>({...k,password:u})),placeholder:o==="login"?"Entrez votre mot de passe":"Choisissez un mot de passe",autoComplete:o==="login"?"current-password":"new-password",showStrength:o==="register",showRules:o==="register",ariaLabel:"Mot de passe",id:"auth-password"}),o==="login"&&r.jsx("div",{style:{fontSize:".7rem",color:"var(--gray)",marginTop:5,display:"flex",alignItems:"center",gap:4},children:"💡 Cliquez sur l'œil pour afficher ou masquer votre mot de passe"})]}),r.jsx("button",{type:"button",className:"form-submit",onClick:o==="login"?x:w,disabled:f,style:{fontSize:".9rem",padding:"13px"},children:f?r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"spinner",style:{width:16,height:16,borderWidth:2}}),"Chargement..."]}):o==="login"?"🔑 Se connecter":`🚀 Créer mon compte ${a==="buyer"?"Acheteur":a==="seller"?"Vendeur":a==="delivery"?"Livreur":"Prestataire"}`}),o==="register"&&r.jsx("p",{style:{fontSize:".68rem",color:"var(--gray)",textAlign:"center",marginTop:8},children:"En vous inscrivant, vous acceptez nos conditions d'utilisation"}),r.jsx("div",{className:"divider",children:"ou"}),r.jsxs("button",{type:"button",className:"social-btn",onClick:y,children:[r.jsx("span",{children:"🇬"})," Continuer avec Google"]})]})}):null}function dn({navCompact:e,dark:t,setDark:o,user:i,userData:a,userRole:s,goPage:n,filterCat:l,setFilterCat:c,search:g,setSearch:f,produits:x,setOnboardingOpen:w,setNotifOpen:y,unread:u,totalQty:k,setAuthTab:p,setAuthOpen:b,setSelectedRole:z,doLogout:C,navQuickRef:I,navQuickOpen:L,setNavQuickOpen:S,TABS:P,tabActive:W,commerceDeliveryPolicy:G,roleChipClass:J}){var Z;return r.jsxs("div",{className:`header-sticky-stack${e?" header-sticky-stack--compact":""}`,children:[r.jsxs("div",{className:"topbar",children:[r.jsxs("div",{className:"topbar-l",children:[r.jsxs("div",{className:"flag-wrap",children:[r.jsxs("span",{className:"flag",children:[r.jsx("span",{className:"fg"}),r.jsx("span",{className:"fr"}),r.jsx("span",{className:"fy"})]}),r.jsx("span",{children:"Cameroun 🇨🇲"})]}),r.jsx("span",{children:"FR / EN"}),r.jsx("span",{children:"📞 +237 696 56 56 54"})]}),r.jsxs("div",{className:"topbar-r",children:[r.jsx("span",{onClick:()=>n("aide"),children:"🆘 Aide"}),r.jsx("span",{onClick:()=>n("contact"),children:"📞 Contact"}),i?r.jsxs("span",{style:{color:"#b7e4c7"},children:["👤 ",(a==null?void 0:a.nom)||((Z=i.email)==null?void 0:Z.split("@")[0])]}):r.jsx("span",{onClick:()=>{p("login"),b(!0)},children:"🔑 Se connecter"})]})]}),r.jsxs("nav",{className:"navbar",children:[r.jsx("div",{className:"logo-wrap",onClick:()=>n("home"),children:r.jsxs("div",{className:"logo-txt",children:["Yo",r.jsx("span",{children:"rix"}),r.jsx("sup",{children:"CM"})]})}),r.jsx("div",{className:"nav-search-wrap",children:r.jsxs("div",{className:"nav-search",children:[r.jsxs("select",{value:l,onChange:h=>c(h.target.value),"aria-label":"Filtrer par catégorie",children:[r.jsx("option",{value:"",children:"Tout"}),ao.map(h=>r.jsx("option",{children:h},h))]}),r.jsx("input",{placeholder:"Produit, marque, mot-clé…",value:g,onChange:h=>f(h.target.value),onKeyDown:h=>h.key==="Enter"&&n("produits"),autoComplete:"off","aria-label":"Rechercher dans le catalogue","aria-expanded":g.trim().length>=2,"aria-haspopup":"listbox"}),g.trim().length>=2&&r.jsxs("div",{className:"nav-search-dd",role:"listbox","aria-label":"Suggestions catalogue",children:[x.filter(h=>(h.name_fr||"").toLowerCase().includes(g.toLowerCase())||(h.description_fr||"").toLowerCase().includes(g.toLowerCase())).slice(0,8).map(h=>{var N;return r.jsxs("button",{type:"button",className:"nav-search-dd-item",role:"option",onClick:()=>{f(""),n("produits")},children:[h.image?r.jsx("img",{src:h.image,className:"nav-search-dd-img",alt:"",onError:$=>{$.currentTarget.style.visibility="hidden"}}):r.jsx("span",{className:"nav-search-dd-img nav-search-dd-ph","aria-hidden":!0,children:"📦"}),r.jsxs("div",{style:{minWidth:0},children:[r.jsx("div",{className:"nav-search-dd-t",children:h.name_fr}),r.jsxs("div",{className:"nav-search-dd-p",children:[(N=h.prix)==null?void 0:N.toLocaleString()," FCFA"]})]})]},h.id)}),x.filter(h=>(h.name_fr||"").toLowerCase().includes(g.toLowerCase())).length===0&&r.jsxs("div",{className:"nav-search-dd-empty",children:["Aucun résultat pour « ",g," » — touche Entrée pour ouvrir le catalogue filtré."]})]}),r.jsx("button",{type:"button",onClick:()=>n("produits"),"aria-label":"Lancer la recherche catalogue",children:"🔍"})]})}),r.jsxs("div",{className:"nav-actions",children:[r.jsx("button",{type:"button",className:"nav-cta-onboard",onClick:()=>w(!0),title:"Que cherchez-vous ?",children:"🚀 Démarrer"}),r.jsx("button",{type:"button",className:"dark-toggle",onClick:()=>o(h=>!h),title:t?"Mode clair":"Mode sombre",children:t?"☀️":"🌙"}),i&&r.jsxs("button",{type:"button",className:"icon-btn",onClick:()=>y(h=>!h),title:"Notifications",children:["🔔",u>0&&r.jsx("span",{className:"ibadge",children:u})]}),r.jsxs("button",{type:"button",className:"icon-btn",onClick:()=>n("cart"),title:"Mon panier",children:["🛒",k>0&&r.jsx("span",{className:"ibadge",children:k})]}),i?r.jsxs(r.Fragment,{children:[r.jsx("span",{className:`role-chip ${J()}`,children:no[s||"buyer"]}),r.jsx("div",{className:"user-av",onClick:()=>n("dashboard"),title:"Mon espace",children:((a==null?void 0:a.nom)||i.email||"?")[0].toUpperCase()}),r.jsx("button",{type:"button",className:"btn-red",onClick:C,title:"Déconnexion",children:"🚪 Déconnexion"})]}):r.jsxs(r.Fragment,{children:[r.jsx("button",{type:"button",className:"btn-ghost",onClick:()=>{p("login"),b(!0)},children:"🔑 Connexion"}),r.jsx("button",{type:"button",className:"btn-green",onClick:()=>{p("register"),z("buyer"),b(!0)},children:"🚀 S'inscrire"})]})]})]}),r.jsxs("div",{className:"nav-tabs-row",ref:I,children:[r.jsx("nav",{className:"nav-tabs","aria-label":"Rubriques Yorix",children:P.map(h=>r.jsx("div",{className:`tab${W(h.p)?" active":""}`,onClick:()=>{S(!1),n(h.p)},role:"presentation",children:h.l},h.p))}),r.jsxs("div",{className:"nav-quick-wrap",children:[r.jsx("button",{type:"button",className:"nav-quick-btn","aria-expanded":L,onClick:()=>S(h=>!h),children:"☰ Navigation"}),L&&r.jsx("div",{className:"nav-quick-panel",role:"dialog","aria-label":"Navigation Yorix",children:r.jsxs("div",{className:"nav-quick-mega-cols",children:[r.jsxs("div",{className:"nav-quick-section",children:[r.jsx("h4",{children:"Marketplace"}),r.jsx("div",{className:"nav-quick-links",children:[{ic:"🏠",l:"Accueil",p:"home"},{ic:"🛍️",l:"Produits & catalogue",p:"produits"},{ic:"🛒",l:"Panier · paiement sécurisé",p:"cart"},{ic:"🏷️",l:"Bons plans du moment",p:"bonsPlans"},{ic:"🚚",l:"Livraison & suivi",p:"livraison"}].map(h=>r.jsxs("button",{type:"button",onClick:()=>{S(!1),n(h.p)},children:[r.jsx("span",{className:"nav-quick-ico",children:h.ic}),r.jsx("span",{children:h.l})]},h.l))})]}),r.jsxs("div",{className:"nav-quick-section",children:[r.jsx("h4",{children:"Confiance & croissance"}),r.jsx("div",{className:"nav-quick-links",children:[{ic:"🔐",l:"Escrow acheteur",p:"escrow"},{ic:"🧑‍🔧",l:"Prestataires vérifiés",p:"prestataires"},{ic:"💼",l:"Yorix Business",p:"business"},{ic:"🎓",l:"Academy",p:"academy"},{ic:"📰",l:"Blog & tendances CM",p:"blog"},{ic:"⭐",l:"Programme fidélité",p:"loyalty"}].map(h=>r.jsxs("button",{type:"button",onClick:()=>{S(!1),n(h.p)},children:[r.jsx("span",{className:"nav-quick-ico",children:h.ic}),r.jsx("span",{children:h.l})]},h.l))})]}),r.jsxs("div",{className:"nav-quick-section",children:[r.jsx("h4",{children:"Support Yorix"}),r.jsxs("div",{className:"nav-quick-links",children:[r.jsxs("button",{type:"button",onClick:()=>{S(!1),n("contact")},children:[r.jsx("span",{className:"nav-quick-ico",children:"📞"}),r.jsx("span",{children:"Contact relation client"})]}),r.jsxs("button",{type:"button",onClick:()=>{S(!1),n("aide")},children:[r.jsx("span",{className:"nav-quick-ico",children:"🆘"}),r.jsx("span",{children:"SOS · centre d'aide"})]}),r.jsxs("button",{type:"button",onClick:()=>{S(!1),n("faq")},children:[r.jsx("span",{className:"nav-quick-ico",children:"❓"}),r.jsx("span",{children:"FAQ marketplace"})]})]})]})]})})]})]}),r.jsxs("div",{className:"pay-strip",children:[r.jsx("b",{style:{color:"var(--ink)"},children:"Paiement :"}),r.jsxs("div",{className:"pay-methods",children:[r.jsx("span",{className:"pm mtn-b",children:"📱 MTN MoMo"}),r.jsx("span",{className:"pm ora-b",children:"🔶 Orange Money"}),r.jsx("span",{className:"pm",children:"💳 Carte"}),r.jsx("span",{className:"pm",children:"💵 Cash"})]}),r.jsxs("div",{className:"strip-right",children:[r.jsx("span",{children:"🚚 J+1 Douala & Yaoundé"}),r.jsxs("span",{role:"link",tabIndex:0,onClick:()=>n("bonsPlans"),onKeyDown:h=>h.key==="Enter"&&n("bonsPlans"),style:{cursor:"pointer",fontWeight:700,color:"var(--green)",textDecoration:"underline"},children:["Livraison offerte dès ",G.freeShippingThresholdXaf.toLocaleString("fr-FR")," FCFA"]}),r.jsx("span",{children:"🔐 Escrow sécurisé"}),i&&r.jsxs("span",{style:{color:"var(--gold)"},children:["👤 ",(a==null?void 0:a.nom)||i.email]})]})]})]})}function cn({items:e}){return e!=null&&e.length?r.jsx("nav",{"aria-label":"Fil d'Ariane",className:"seo-breadcrumb",children:r.jsx("ol",{style:{display:"flex",flexWrap:"wrap",gap:"6px 10px",alignItems:"center",listStyle:"none",margin:"0 0 16px",padding:0,fontSize:".78rem",color:"var(--gray)"},children:e.map((t,o)=>r.jsxs("li",{style:{display:"flex",alignItems:"center",gap:8},children:[o>0&&r.jsx("span",{"aria-hidden":"true",children:"/"}),t.href&&!t.current?r.jsx("a",{href:t.href,style:{color:"var(--green)",fontWeight:600},children:t.label}):r.jsx("span",{style:{color:t.current?"var(--ink)":"var(--gray)",fontWeight:t.current?700:500},children:t.label})]},t.href||o))})}):null}function Mt({city:e,mode:t,goPage:o}){const i=(e==null?void 0:e.name)||"Cameroun",a=(e==null?void 0:e.slug)||"",s={hub:`Yorix à ${i} — marketplace, livraison & services`,acheter:`Acheter en ligne à ${i} — Yorix marketplace Cameroun`,livraison:`Livraison à ${i} — livreurs & colis au Cameroun`,prestataires:`Prestataires à ${i} — services à domicile vérifiés`},n={hub:`Yorix est une marketplace camerounaise : achetez en ligne à ${i}, faites-vous livrer rapidement et trouvez des prestataires vérifiés. Paiement MTN MoMo, Orange Money et protection Escrow.`,acheter:`Sur Yorix, l’achat en ligne à ${i} est simple : catalogue produits locaux et importés, vendeurs vérifiés, livraison suivie. Idéal pour votre shopping au Cameroun.`,livraison:`Notre service de livraison couvre ${i} et le réseau national : livreurs indépendants, suivi et tarifs transparents. Colis, courses, e-commerce — Yorix Ride.`,prestataires:`Trouvez des prestataires à ${i} : plomberie, électricité, ménage, beauté, BTP… profils vérifiés et réservation par WhatsApp.`},l=[{label:"Accueil",href:"/"},{label:s[t]||s.hub,current:!0}];return r.jsx("section",{className:"sec",style:{paddingBottom:8},children:r.jsxs("div",{style:{maxWidth:920,margin:"0 auto"},children:[r.jsx(cn,{items:l}),r.jsxs("header",{children:[r.jsx("h1",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.15rem, 2.5vw, 1.45rem)",color:"var(--ink)",margin:"0 0 12px",letterSpacing:"-.4px"},children:s[t]||s.hub}),r.jsx("p",{style:{fontSize:".88rem",color:"var(--gray)",lineHeight:1.75,margin:0},children:n[t]||n.hub})]}),r.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:10,marginTop:18},children:[r.jsxs("button",{type:"button",className:"cta-w",style:{padding:"12px 14px",textAlign:"left",borderRadius:12,cursor:"pointer"},onClick:()=>a&&o("seoCity",{citySlug:a,mode:"acheter"}),children:[r.jsxs("strong",{style:{display:"block",marginBottom:4},children:["🛍️ Produits à ",i]}),r.jsx("span",{style:{fontSize:".76rem",opacity:.9},children:"Marketplace & catégories"})]}),r.jsxs("button",{type:"button",className:"cta-w",style:{padding:"12px 14px",textAlign:"left",borderRadius:12,cursor:"pointer"},onClick:()=>a&&o("seoCity",{citySlug:a,mode:"livraison"}),children:[r.jsx("strong",{style:{display:"block",marginBottom:4},children:"🚚 Livraison"}),r.jsx("span",{style:{fontSize:".76rem",opacity:.9},children:"Livreurs & délais"})]}),r.jsxs("button",{type:"button",className:"cta-w",style:{padding:"12px 14px",textAlign:"left",borderRadius:12,cursor:"pointer"},onClick:()=>a&&o("seoCity",{citySlug:a,mode:"prestataires"}),children:[r.jsx("strong",{style:{display:"block",marginBottom:4},children:"👷 Prestataires"}),r.jsx("span",{style:{fontSize:".76rem",opacity:.9},children:"Services à domicile"})]}),r.jsxs("button",{type:"button",className:"cta-w",style:{padding:"12px 14px",textAlign:"left",borderRadius:12,cursor:"pointer"},onClick:()=>o("business"),children:[r.jsx("strong",{style:{display:"block",marginBottom:4},children:"💼 Business"}),r.jsx("span",{style:{fontSize:".76rem",opacity:.9},children:"B2B & grossistes"})]})]})]})})}function pn({user:e,userData:t,initialProduct:o=null,onClose:i,isModal:a=!1}){const[s,n]=d.useState([]),[l,c]=d.useState(null),[g,f]=d.useState([]),[x,w]=d.useState(""),[y,u]=d.useState(!0),[k,p]=d.useState(!1),[b,z]=d.useState(!1),[C,I]=d.useState(""),L=d.useRef(null);d.useEffect(()=>{o!=null&&o.vendeur_id&&(e!=null&&e.id)&&o.vendeur_id!==e.id&&P(o.vendeur_id,o.id)},[o==null?void 0:o.id,e==null?void 0:e.id]),d.useEffect(()=>{e!=null&&e.id&&S()},[e==null?void 0:e.id]);const S=async()=>{u(!0);try{const{data:h,error:N}=await E.from("conversations").select("*").or(`user1_id.eq.${e.id},user2_id.eq.${e.id}`).order("last_message_at",{ascending:!1});if(N)throw N;n(h||[])}catch(h){console.warn("Chargement conversations:",h.message)}u(!1)},P=async(h,N=null)=>{if(!(e!=null&&e.id)||!h||e.id===h)return;const[$,q]=e.id<h?[e.id,h]:[h,e.id];try{let F=E.from("conversations").select("*").eq("user1_id",$).eq("user2_id",q);N?F=F.eq("product_id",N):F=F.is("product_id",null);const{data:ae}=await F.maybeSingle();if(ae){c(ae.id),await S();return}const{data:fe,error:K}=await E.from("conversations").insert({user1_id:$,user2_id:q,product_id:N}).select().single();if(K)throw K;c(fe.id),await S()}catch(F){console.error("startConversation:",F),alert("Erreur : "+F.message)}};d.useEffect(()=>{if(!l){f([]);return}W()},[l]);const W=async()=>{try{const{data:h,error:N}=await E.from("messages").select("*").eq("conversation_id",l).order("created_at",{ascending:!0});if(N)throw N;f(h||[])}catch(h){console.warn("Chargement messages:",h.message)}};d.useEffect(()=>{if(!l)return;const h=E.channel(`chat-${l}`).on("postgres_changes",{event:"INSERT",schema:"public",table:"messages",filter:`conversation_id=eq.${l}`},N=>{f($=>$.some(q=>q.id===N.new.id)?$:[...$,N.new])}).subscribe();return()=>{E.removeChannel(h)}},[l]),d.useEffect(()=>{var h;(h=L.current)==null||h.scrollIntoView({behavior:"smooth"})},[g]);const G=async()=>{if(!x.trim()||!l||k)return;const h=Sa(x);if(h!=null&&h.bloque){z(!0),I(h.raison||"Partage de contact interdit"),setTimeout(()=>z(!1),5e3),e&&E.from("fraud_logs").insert({type:"tentative_contournement_chat",user_id:e.id,message:x}).then(({error:N})=>{N&&console.warn("fraud_logs:",N.message)});return}p(!0);try{const{data:N,error:$}=await E.from("messages").insert({conversation_id:l,sender_id:e.id,content:x.trim()}).select().single();if($)throw $;f(q=>q.some(F=>F.id===N.id)?q:[...q,N]),w("")}catch(N){alert("Erreur envoi : "+N.message)}p(!1)},J=h=>h.user1_id===e.id?h.user2_id:h.user1_id;if(!e)return r.jsx("div",{style:{padding:30,textAlign:"center",color:"var(--gray)"},children:"🔐 Connectez-vous pour accéder à la messagerie."});const Z=a?{background:"var(--surface)",borderRadius:13,overflow:"hidden",height:"80vh",maxHeight:600,display:"flex",width:"100%"}:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:13,overflow:"hidden",height:500,display:"flex"};return r.jsxs("div",{style:Z,children:[r.jsxs("div",{style:{width:240,borderRight:"1px solid var(--border)",background:"var(--surface2)",display:"flex",flexDirection:"column"},children:[r.jsx("div",{style:{padding:"12px 14px",borderBottom:"1px solid var(--border)",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".85rem",color:"var(--ink)"},children:"💬 Conversations"}),r.jsx("div",{style:{flex:1,overflowY:"auto"},children:y?r.jsx("div",{style:{padding:20,textAlign:"center",color:"var(--gray)",fontSize:".78rem"},children:"Chargement..."}):s.length===0?r.jsxs("div",{style:{padding:20,textAlign:"center",color:"var(--gray)",fontSize:".75rem",lineHeight:1.6},children:["Aucune conversation.",r.jsx("br",{}),r.jsx("br",{}),'Clique sur "Contacter le vendeur" depuis un produit.']}):s.map(h=>r.jsxs("div",{onClick:()=>c(h.id),style:{padding:"10px 12px",cursor:"pointer",borderBottom:"1px solid var(--border)",background:l===h.id?"var(--green-pale)":"transparent"},children:[r.jsxs("div",{style:{fontWeight:600,fontSize:".8rem",color:"var(--ink)"},children:["👤 ",J(h).slice(0,8),"..."]}),r.jsx("div",{style:{fontSize:".65rem",color:"var(--gray)",marginTop:2},children:h.last_message_at?new Date(h.last_message_at).toLocaleString("fr-FR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}):"Nouveau"}),h.product_id&&r.jsx("div",{style:{fontSize:".6rem",color:"var(--green)",marginTop:3,fontWeight:600},children:"🛍️ Sur un produit"})]},h.id))})]}),r.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column"},children:[r.jsxs("div",{style:{padding:"12px 16px",borderBottom:"1px solid var(--border)",background:"var(--green)",color:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[r.jsxs("div",{children:[r.jsx("div",{style:{fontWeight:700,fontSize:".88rem"},children:l?"💬 Conversation":"Sélectionne une conversation"}),r.jsx("div",{style:{fontSize:".68rem",opacity:.85},children:"🔒 Messagerie sécurisée · Partage de contact interdit"})]}),i&&r.jsx("button",{onClick:i,style:{background:"rgba(255,255,255,.15)",color:"#fff",border:"none",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:"1rem"},children:"✕"})]}),r.jsxs("div",{style:{flex:1,overflowY:"auto",padding:14,background:"var(--surface)",display:"flex",flexDirection:"column",gap:8},children:[l?g.length===0?r.jsxs("div",{style:{textAlign:"center",color:"var(--gray)",marginTop:60,fontSize:".85rem"},children:["Aucun message.",r.jsx("br",{}),"Envoie le premier ! 👇"]}):g.map(h=>{const N=h.sender_id===e.id;return r.jsxs("div",{style:{alignSelf:N?"flex-end":"flex-start",maxWidth:"75%",background:N?"var(--green)":"var(--surface2)",color:N?"#fff":"var(--ink)",padding:"8px 12px",borderRadius:N?"12px 12px 3px 12px":"12px 12px 12px 3px",fontSize:".85rem",lineHeight:1.4,wordBreak:"break-word"},children:[r.jsx("div",{children:h.content}),r.jsxs("div",{style:{fontSize:".6rem",opacity:.7,marginTop:3,textAlign:N?"right":"left"},children:[new Date(h.created_at).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),N&&(h.is_read?" ✓✓":" ✓")]})]},h.id)}):r.jsx("div",{style:{textAlign:"center",color:"var(--gray)",marginTop:60,fontSize:".85rem"},children:"👈 Sélectionne une conversation à gauche"}),b&&r.jsxs("div",{style:{background:"#fee2e2",border:"1px solid #fca5a5",borderRadius:9,padding:"10px 14px",color:"#991b1b",fontSize:".78rem",textAlign:"center",margin:"8px 0",lineHeight:1.5},children:["🚫 ",r.jsx("strong",{children:"Message bloqué"}),r.jsx("br",{}),C||"Partage de contacts externes interdit sur Yorix",r.jsx("br",{}),r.jsx("span",{style:{fontSize:".7rem",opacity:.8},children:"Utilise la messagerie Yorix pour tes échanges."})]}),r.jsx("div",{ref:L})]}),l&&r.jsxs("div",{style:{padding:10,borderTop:"1px solid var(--border)",display:"flex",gap:7,background:"var(--surface)"},children:[r.jsx("input",{type:"text",placeholder:"Écris ton message...",value:x,onChange:h=>w(h.target.value),onKeyDown:h=>{h.key==="Enter"&&!k&&G()},disabled:k,style:{flex:1,border:"1.5px solid var(--border)",borderRadius:8,padding:"9px 12px",fontFamily:"'DM Sans',sans-serif",fontSize:".83rem",outline:"none",background:"var(--surface2)",color:"var(--ink)"}}),r.jsx("button",{onClick:G,disabled:k||!x.trim(),style:{background:"var(--green)",color:"#fff",border:"none",width:40,height:40,borderRadius:8,cursor:k||!x.trim()?"not-allowed":"pointer",fontSize:"1rem",opacity:k||!x.trim()?.5:1},children:k?"...":"➤"})]})]})]})}const gn="modulepreload",fn=function(e){return"/"+e},It={},U=function(t,o,i){let a=Promise.resolve();if(o&&o.length>0){document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),l=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));a=Promise.allSettled(o.map(c=>{if(c=fn(c),c in It)return;It[c]=!0;const g=c.endsWith(".css"),f=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${f}`))return;const x=document.createElement("link");if(x.rel=g?"stylesheet":gn,g||(x.as="script"),x.crossOrigin="",x.href=c,l&&x.setAttribute("nonce",l),document.head.appendChild(x),g)return new Promise((w,y)=>{x.addEventListener("load",w),x.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(n){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=n,window.dispatchEvent(l),!l.defaultPrevented)throw n}return a.then(n=>{for(const l of n||[])l.status==="rejected"&&s(l.reason);return t().catch(s)})};function H({minHeight:e=200,label:t="Chargement..."}){return r.jsxs("div",{className:"loading",style:{minHeight:e,justifyContent:"center",padding:"24px 0"},children:[r.jsx("div",{className:"spinner"}),t]})}const mn=d.lazy(()=>U(()=>import("./HomePage-BNfEF2Nw.js"),__vite__mapDeps([0,1,2,3,4,5,6])).then(e=>({default:e.HomePage}))),xn=d.lazy(()=>U(()=>import("./ProductRouteSections-PB1Gqe-b.js"),__vite__mapDeps([7,2,1,3,4,5,6])).then(e=>({default:e.ProductRouteSections}))),un=d.lazy(()=>U(()=>import("./LivraisonPage-DGRKY75O.js"),__vite__mapDeps([8,1,6])).then(e=>({default:e.LivraisonPage}))),bn=d.lazy(()=>U(()=>import("./SiteMarketingPages-CSQ38_EM.js"),__vite__mapDeps([9,1,6])).then(e=>({default:e.SiteMarketingPages})));d.lazy(()=>U(()=>import("./LivraisonLazyBlocks-CsVkZ8cn.js"),__vite__mapDeps([10,1,6])).then(e=>({default:e.LivraisonTopInteractive})));d.lazy(()=>U(()=>import("./LivraisonLazyBlocks-CsVkZ8cn.js"),__vite__mapDeps([10,1,6])).then(e=>({default:e.LivraisonBottomInteractive})));const hn=d.lazy(()=>U(()=>import("./FicheProduit-BCoa7pqx.js"),__vite__mapDeps([11,1,3,4,5,6])).then(e=>({default:e.FicheProduit}))),yn=d.lazy(()=>U(()=>import("./PrestPage-dx-CU_jD.js"),__vite__mapDeps([12,1,6])).then(e=>({default:e.PrestPage}))),vn=d.lazy(()=>U(()=>import("./CheckoutPage-D0H5-sDJ.js"),__vite__mapDeps([13,1,5,14,6])).then(e=>({default:e.CheckoutPage}))),wn=d.lazy(()=>U(()=>import("./CartPage-B64Rv_5n.js"),__vite__mapDeps([15,3,1,14,6])).then(e=>({default:e.CartPage}))),kn=d.lazy(()=>U(()=>import("./AcademyDetail-KGfg_8tW.js"),__vite__mapDeps([16,1,6])).then(e=>({default:e.AcademyDetail}))),jn=d.lazy(()=>U(()=>import("./AcademyContactForm-Ce10ECqg.js"),__vite__mapDeps([17,1,6])).then(e=>({default:e.AcademyContactForm}))),Sn=d.lazy(()=>U(()=>import("./LoyaltyPage-BJOUPqQ9.js"),__vite__mapDeps([18,1,6])).then(e=>({default:e.LoyaltyPage}))),zn=d.lazy(()=>U(()=>import("./SellerDashboard-DEb1xgTG.js"),__vite__mapDeps([19,1,6])).then(e=>({default:e.SellerDashboard}))),Cn=d.lazy(()=>U(()=>import("./BuyerDashboard-C82eZ5SN.js"),__vite__mapDeps([20,1,6])).then(e=>({default:e.BuyerDashboard}))),_n=d.lazy(()=>U(()=>import("./DeliveryDashboard-DXDeekI7.js"),__vite__mapDeps([21,1,6])).then(e=>({default:e.DeliveryDashboard}))),En=d.lazy(()=>U(()=>import("./ProviderDashboard-CbT6ytMC.js"),__vite__mapDeps([22,1,6])).then(e=>({default:e.ProviderDashboard}))),An=d.lazy(()=>U(()=>import("./AdminDashboard-ComEtVZ9.js"),__vite__mapDeps([23,1,6])).then(e=>({default:e.AdminDashboard}))),Tn=d.lazy(()=>U(()=>import("./NotificationsPage-BvTkyzlF.js"),__vite__mapDeps([24,1,6])).then(e=>({default:e.NotificationsPage}))),Nn=d.lazy(()=>U(()=>import("./PromotionsPage-DOwnFcDl.js"),__vite__mapDeps([25,1,6])).then(e=>({default:e.PromotionsPage})));function Rn({ctx:e}){var Xe,Ge;const{page:t,route:o,user:i,userData:a,userRole:s,dark:n,goPage:l,filterCat:c,setFilterCat:g,search:f,setSearch:x,produits:w,produitsLoading:y,wishlist:u,addToCart:k,toggleWish:p,openProductUrl:b,setOnboardingOpen:z,allServices:C,nlEmail:I,setNlEmail:L,nlSent:S,setNlSent:P,commerceDeliveryPolicy:W,showSeoLocal:G,detailProduct:J,detailProductLoading:Z,needsProductListingChunk:h,showProduits:N,seoCityName:$,produitsFiltres:q,showLivraison:F,showPrestataires:ae,selectedPrest:fe,setSelectedPrest:K,prestSyncFilters:ze,addServiceToCart:R,cartItems:ee,cartSummary:Le,changeQty:O,removeItem:Y,setCartItems:B,persistCheckoutContact:V,setAuthTab:re,setSelectedRole:de,setAuthOpen:te,setDemandeLivraisonOpen:Ce,notifs:$e,marquerNotifLue:gr,marquerToutesLues:fr,supprimerNotif:Fe,loadNotifsForUser:mr,setNotifPrefs:xr,isSiteMarketingPage:ur,inscriptionSent:br,setInscriptionSent:hr,inscriptionForm:yr,setInscriptionForm:vr,inscriptionError:wr,inscriptionLoading:Ue,soumettreCandidaturePrestataire:kr,academyCourses:We,academyLoading:jr,goAcademyDetail:Sr,blogFilter:zr,setBlogFilter:Cr,selectedCourse:Ve,goAcademyContact:_r,dashTab:ne,setDashTab:be,getDashNav:Er,roleChipClass:Ar,doLogout:Tr,loyaltyPts:Nr,setLoyaltyPts:Rr,totalQty:Mr,waOpen:Pe,setWaOpen:Ir,tabActive:Lr,unread:He}=e;return r.jsxs(r.Fragment,{children:[t==="home"&&r.jsx(d.Suspense,{fallback:r.jsx(H,{minHeight:280,label:"Chargement de l'accueil..."}),children:r.jsx(mn,{filterCat:c,setFilterCat:g,search:f,setSearch:x,produitsLoading:y,produits:w,user:i,userData:a,wishlist:u,addToCart:k,toggleWish:p,openProductUrl:b,setOnboardingOpen:z,goPage:l,allServices:C,nlEmail:I,setNlEmail:L,nlSent:S,setNlSent:P,freeShippingThresholdXaf:W.freeShippingThresholdXaf})}),G&&t==="livraison"&&o.citySlug&&Q[o.citySlug]&&r.jsx(Mt,{city:Q[o.citySlug],mode:"livraison",goPage:l}),G&&t==="seoCity"&&o.citySlug&&Q[o.citySlug]&&r.jsx(Mt,{city:Q[o.citySlug],mode:o.cityMode||"hub",goPage:l}),t==="productDetail"&&r.jsx("div",{className:"anim",children:Z?r.jsxs("div",{className:"loading",style:{minHeight:320,justifyContent:"center"},children:[r.jsx("div",{className:"spinner"})," Chargement du produit..."]}):J?r.jsx(d.Suspense,{fallback:r.jsx(H,{minHeight:320,label:"Chargement du produit..."}),children:r.jsx(hn,{product:J,user:i,userData:a,onClose:()=>l("produits"),onAddToCart:k})}):r.jsx("section",{className:"sec anim",children:r.jsxs("div",{className:"empty-state",children:[r.jsx("div",{className:"empty-icon",children:"🔍"}),r.jsx("p",{children:"Produit introuvable."}),r.jsx("button",{className:"form-submit",style:{width:"auto",marginTop:16},type:"button",onClick:()=>l("produits"),children:"← Retour aux produits"})]})})}),h&&r.jsx(d.Suspense,{fallback:r.jsx(H,{label:"Chargement catalogue..."}),children:r.jsx(xn,{showProduits:N,page:t,seoCityName:$,produitsFiltres:q,produitsLoading:y,produits:w,filterCat:c,setFilterCat:g,search:f,user:i,userData:a,wishlist:u,addToCart:k,toggleWish:p,openProductUrl:b,dark:n,goPage:l})}),F&&r.jsx(d.Suspense,{fallback:r.jsx(H,{label:"Chargement livraison..."}),children:r.jsx(un,{route:o,user:i,userData:a,setDemandeLivraisonOpen:Ce,setAuthTab:re,setSelectedRole:de,setAuthOpen:te})}),ae&&r.jsx(d.Suspense,{fallback:r.jsx(H,{label:"Chargement prestataires..."}),children:r.jsx(yn,{user:i,userData:a,allServices:C,goPage:l,setSelectedPrest:K,selectedPrest:fe,onOpenPrestDetail:D=>l("prestDetail",{prestSlug:Gt(D.name,D.id)}),onClosePrestDetail:()=>{o.metierSlug&&o.villeSlug?l("prestataires",{metierSlug:o.metierSlug,villeSlug:o.villeSlug}):t==="seoCity"&&o.cityMode==="prestataires"&&o.citySlug?l("seoCity",{citySlug:o.citySlug,mode:"prestataires"}):l("prestataires")},syncFilters:ze,onAddServiceToCart:R})}),t==="cart"&&r.jsx(d.Suspense,{fallback:r.jsx(H,{label:"Chargement panier..."}),children:r.jsx(wn,{cartItems:ee,cartSummary:Le,changeQty:O,removeItem:Y,goPage:l,addToCart:k,produits:w,wishlist:u,toggleWish:p})}),t==="checkout"&&r.jsx(d.Suspense,{fallback:r.jsx(H,{label:"Chargement checkout..."}),children:r.jsx(vn,{user:i,userData:a,cartItems:ee,summary:Le,setCartItems:B,goPage:l,fallbackWhatsappNumber:ua,momoNumber:ma,orangeNumber:xa,persistCheckoutContact:V})}),t==="notifications"&&!i&&r.jsxs("section",{className:"sec anim",style:{maxWidth:480,margin:"0 auto",textAlign:"center",padding:"48px 20px"},children:[r.jsx("h1",{className:"sec-title",style:{fontSize:"1.25rem"},children:"Vos notifications Yorix"}),r.jsx("p",{style:{color:"var(--gray)",marginBottom:22,fontSize:".9rem",lineHeight:1.55},children:"Connectez-vous pour suivre les messages, commandes, paiements et livraisons en temps réel."}),r.jsx("button",{type:"button",className:"form-submit",style:{width:"auto",padding:"12px 28px"},onClick:()=>{re("login"),te(!0)},children:"Se connecter"})]}),t==="notifications"&&i&&r.jsx(d.Suspense,{fallback:r.jsx(H,{label:"Chargement notifications..."}),children:r.jsx(Tn,{user:i,notifs:$e,goPage:l,onMarkRead:gr,onMarkAllRead:fr,onDismiss:Fe,refreshNotificationsFull:()=>mr(i.id,120),onPrefsUpdated:xr})}),ur&&r.jsx(d.Suspense,{fallback:r.jsx(H,{label:"Chargement page..."}),children:r.jsx(bn,{page:t,goPage:l,setAuthOpen:te,setAuthTab:re,setSelectedRole:de,inscriptionSent:br,setInscriptionSent:hr,inscriptionForm:yr,setInscriptionForm:vr,inscriptionError:wr,inscriptionLoading:Ue,submitInscriptionPrestataire:kr,academyCourses:We,academyLoading:jr,goAcademyDetail:Sr,blogFilter:zr,setBlogFilter:Cr,nlEmail:I,setNlEmail:L,nlSent:S,setNlSent:P,user:i,userData:a})}),t==="academyDetail"&&r.jsx(d.Suspense,{fallback:r.jsx(H,{label:"Chargement formation..."}),children:r.jsx(kn,{course:Ve,goPage:l,goContact:_r})}),t==="academyContact"&&r.jsx(d.Suspense,{fallback:r.jsx(H,{label:"Chargement formulaire..."}),children:r.jsx(jn,{course:Ve,user:i,userData:a,goPage:l})}),t==="bonsPlans"&&r.jsx(d.Suspense,{fallback:r.jsx(H,{label:"Chargement bons plans..."}),children:r.jsx(Nn,{goPage:l,freeShippingThresholdXaf:W.freeShippingThresholdXaf})}),t==="loyalty"&&r.jsx(d.Suspense,{fallback:r.jsx(H,{label:"Chargement fidélité..."}),children:r.jsx(Sn,{user:i,userData:a,goPage:l,setAuthOpen:te,setAuthTab:re})}),t==="dashboard"&&(i?r.jsxs("div",{className:"dash-layout anim",children:[r.jsxs("div",{className:"dash-sidebar",children:[r.jsx("div",{className:"dash-avatar",children:((Xe=a==null?void 0:a.nom)==null?void 0:Xe[0])||"U"}),r.jsx("div",{className:"dash-name",title:(a==null?void 0:a.nom)||i.email,children:(a==null?void 0:a.nom)||((Ge=i.email)==null?void 0:Ge.split("@")[0])||"Utilisateur"}),r.jsx("div",{className:"dash-role-badge",children:r.jsx("span",{className:`role-chip ${Ar()}`,children:no[s||"buyer"]})}),r.jsxs("div",{className:"dash-nav",children:[Er().map(D=>r.jsxs("div",{className:`dash-nav-item${ne===D.id?" active":""}`,onClick:()=>be(D.id),children:[D.icon," ",D.label]},D.id)),r.jsx("div",{className:"dash-nav-divider"}),r.jsx("div",{className:`dash-nav-item${ne==="messages"?" active":""}`,onClick:()=>be("messages"),children:"💬 Messages"}),r.jsx("div",{className:"dash-nav-item",onClick:Tr,style:{color:"var(--red)"},children:"🚪 Déconnexion"})]})]}),r.jsxs("div",{className:"dash-content",children:[ne==="messages"&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"dash-page-title",children:"💬 Messagerie Yorix"}),r.jsx("div",{className:"info-msg",children:"🔐 Messagerie sécurisée entre acheteurs et vendeurs. Tes discussions sont privées et protégées."}),r.jsx(pn,{user:i,userData:a})]}),ne!=="messages"&&s==="seller"&&r.jsx(d.Suspense,{fallback:r.jsx(H,{label:"Chargement espace vendeur..."}),children:r.jsx(zn,{user:i,userData:a,dashTab:ne,setDashTab:be})}),ne!=="messages"&&s==="delivery"&&r.jsx(d.Suspense,{fallback:r.jsx(H,{label:"Chargement espace livreur..."}),children:r.jsx(_n,{user:i,userData:a,dashTab:ne,setDashTab:be})}),ne!=="messages"&&s==="provider"&&r.jsx(d.Suspense,{fallback:r.jsx(H,{label:"Chargement espace prestataire..."}),children:r.jsx(En,{user:i,userData:a,dashTab:ne,setDashTab:be})}),ne!=="messages"&&(s==="buyer"||!s)&&r.jsx(d.Suspense,{fallback:r.jsx(H,{label:"Chargement tableau de bord..."}),children:r.jsx(Cn,{user:i,userData:a,wishlist:u,totalQty:Mr,loyaltyPts:Nr,setLoyaltyPts:Rr,dashTab:ne,goPage:l})})]})]}):r.jsxs("div",{className:"empty-state anim",style:{padding:"60px 0"},children:[r.jsx("div",{className:"empty-icon",children:"🔐"}),r.jsx("p",{children:"Connectez-vous pour accéder à votre espace"}),r.jsx("button",{className:"form-submit",style:{width:"auto",padding:"11px 28px",marginTop:16},onClick:()=>te(!0),children:"Se connecter"})]})),t!=="home"&&r.jsxs("div",{className:"newsletter",children:[r.jsx("div",{className:"nl-title",children:"📬 Restez informé(e)"}),r.jsx("p",{className:"nl-sub",children:"Les meilleures offres Yorix dans votre boîte mail."}),S?r.jsx("div",{style:{background:"rgba(255,255,255,.2)",borderRadius:8,padding:"9px 18px",color:"#fff",fontWeight:600},children:"✅ Abonné(e) !"}):r.jsxs("div",{className:"nl-form",children:[r.jsx("input",{className:"nl-input",placeholder:"Votre email...",value:I,onChange:D=>L(D.target.value)}),r.jsx("button",{type:"button",className:"nl-btn",onClick:async()=>{I&&(await E.from("newsletter").insert({email:I}).catch(D=>console.warn(D==null?void 0:D.message)),P(!0))},children:"S'abonner 🚀"})]})]}),r.jsxs("div",{className:"yorix-fab-stack","aria-live":"polite",children:[i&&((a==null?void 0:a.role)==="admin"||(a==null?void 0:a.role)==="superadmin")&&t!=="admin"&&r.jsx("button",{type:"button",className:"admin-quick-pill",onClick:()=>l("admin"),title:"Ouvrir l’administration",children:"⚙️ Admin Yorix"}),r.jsxs("div",{className:"wa-float",children:[Pe&&r.jsxs("div",{className:"wa-card",children:[r.jsx("div",{className:"wa-card-title",children:"💬 Contacter Yorix"}),r.jsx("div",{className:"wa-card-sub",children:"Support 7j/7 · Réponse rapide"}),r.jsx("a",{href:`https://wa.me/${sr}?text=${encodeURIComponent("Bonjour Yorix ! J'ai besoin d'aide.")}`,target:"_blank",rel:"noreferrer",className:"wa-link wa-link-green",children:"📱 WhatsApp +237 696 56 56 54"}),r.jsx("a",{href:"tel:+237696565654",className:"wa-link wa-link-ghost",children:"📞 Appeler"}),r.jsx("a",{href:"mailto:support@yorix.cm",className:"wa-link wa-link-ghost",children:"✉️ support@yorix.cm"})]}),r.jsxs("div",{style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center"},children:[r.jsx("div",{className:"wa-pulse"}),r.jsx("button",{type:"button",className:"wa-btn","aria-expanded":Pe,onClick:()=>Ir(D=>!D),children:Pe?"✕":"💬"})]})]})]}),r.jsxs("div",{className:"mobile-nav",children:[r.jsx("div",{className:"mn-inner",children:[{icon:"🏠",label:"Accueil",p:"home"},{icon:"🛍️",label:"Produits",p:"produits"},{icon:"🚚",label:"Livraison",p:"livraison"},{icon:"📊",label:"Mon espace",p:"dashboard"},{icon:"💬",label:"WhatsApp",p:"wa"}].map(D=>r.jsxs("div",{className:`mn-item${Lr(D.p)?" active":""}`,onClick:()=>{D.p==="wa"?window.open(`https://wa.me/${sr}?text=${encodeURIComponent("Bonjour Yorix ! J'ai besoin d'aide.")}`,"_blank"):D.p==="dashboard"&&!i?(re("register"),te(!0)):l(D.p)},children:[r.jsx("div",{className:"mn-icon",children:D.icon}),r.jsx("div",{className:"mn-label",children:D.label}),D.p==="dashboard"&&!i&&r.jsx("div",{style:{position:"absolute",top:0,right:2,background:"var(--green)",color:"#fff",fontSize:".45rem",fontWeight:700,padding:"1px 3px",borderRadius:3},children:"S'inscrire"}),D.p==="dashboard"&&He>0&&i&&r.jsx("div",{className:"mn-badge",children:He})]},D.label))}),!i&&r.jsxs("div",{style:{borderTop:"1px solid var(--border)",padding:"8px 16px",display:"flex",gap:8},children:[r.jsx("button",{type:"button",onClick:()=>{re("login"),te(!0)},style:{flex:1,padding:"9px",borderRadius:8,border:"1.5px solid var(--border)",background:"var(--surface)",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".78rem",cursor:"pointer",color:"var(--ink)"},children:"🔑 Connexion"}),r.jsx("button",{type:"button",onClick:()=>{re("register"),de("buyer"),te(!0)},style:{flex:2,padding:"9px",borderRadius:8,border:"none",background:"var(--green)",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem",cursor:"pointer",color:"#fff"},children:"🚀 S'inscrire gratuitement"})]})]}),t==="admin"&&r.jsx(d.Suspense,{fallback:r.jsx(H,{label:"Chargement admin..."}),children:r.jsx(An,{user:i,userData:a,goPage:l})})]})}function Mn({goPage:e,setDashTab:t,setDemandeLivraisonOpen:o,setNotifs:i,onProfileLoaded:a}){const[s,n]=d.useState(null),[l,c]=d.useState(null),[g,f]=d.useState(null),[x,w]=d.useState(!0),[y,u]=d.useState(!1),[k,p]=d.useState("login"),[b,z]=d.useState("buyer"),[C,I]=d.useState({nom:"",email:"",tel:"",password:""}),[L,S]=d.useState(""),[P,W]=d.useState(!1),[G,J]=d.useState(!1),[Z,h]=d.useState(!1),[N,$]=d.useState(null),[q,F]=d.useState(null),ae=d.useCallback(async O=>{const Y=await wa(O),B=ka(Y);c(Y),f(B),await a(O)},[a]);d.useEffect(()=>{let O=!1;E.auth.getSession().then(({data:{session:B},error:V})=>{O||(V&&console.warn("Auth getSession:",V.message),B!=null&&B.user&&(n(B.user),ae(B.user.id)),w(!1))}).catch(B=>{console.warn("Auth getSession:",(B==null?void 0:B.message)||B),O||w(!1)});const{data:{subscription:Y}}=E.auth.onAuthStateChange((B,V)=>{V!=null&&V.user?(n(V.user),ae(V.user.id)):(n(null),c(null),f(null),i([]))});return()=>{O=!0,Y.unsubscribe()}},[ae,i]);const fe=d.useCallback(O=>{const Y=O||q;Y&&(Y==="buy"?e("produits"):Y==="sell"?e("dashboard"):Y==="service"?e("prestataires"):Y==="delivery"&&(e("livraison"),setTimeout(()=>o(!0),300)),F(null))},[q,e,o]),K=async()=>{S(""),W(!0);try{const{data:O,error:Y}=await E.auth.signInWithPassword({email:C.email,password:C.password});if(Y)throw Y;n(O.user),await ae(O.user.id),u(!1),q&&setTimeout(()=>fe(q),300),_a({to:C.email,subject:`Bienvenue sur Yorix, ${C.nom} ! 🎉`,html:Aa(C.nom,b)}).catch(B=>console.warn("Email bienvenue:",B))}catch{S("Email ou mot de passe incorrect.")}W(!1)},ze=async()=>{var O;S(""),W(!0);try{if(!C.nom||!C.email||!C.password||!C.tel)throw new Error("Tous les champs sont obligatoires.");if(!b)throw new Error("Veuillez choisir un profil (Acheteur, Vendeur, Livreur ou Prestataire).");if(["seller","provider","delivery"].includes(b)&&!Z){$({nom:C.nom,email:C.email,tel:C.tel,password:C.password,role:b}),W(!1),J(!0);return}const{data:B,error:V}=await E.auth.signUp({email:C.email,password:C.password,options:{data:{display_name:C.nom,nom:C.nom,telephone:C.tel,role:b}}});if(V)throw V;const re=(O=B.user)==null?void 0:O.id;if(!re)throw new Error("Erreur création compte.");const{error:de}=await E.from("profiles").upsert({id:re,nom:C.nom,email:C.email,telephone:C.tel,role:b,langue:"fr",actif:!0,verifie:!1,note:0,nombre_avis:0,total_commandes:0});de&&console.error("Profile insert error:",de),await E.from("wallets").insert({user_id:re,solde:0,total_gagne:0,devise:"FCFA"}).then(te=>te.error&&console.error(te.error)),await ae(re),u(!1),I({nom:"",email:"",tel:"",password:""}),h(!1),$(null),q&&setTimeout(()=>fe(q),500)}catch(Y){console.error("Register error:",Y),S(Y.message.includes("already")?"Cet email est déjà utilisé.":Y.message)}W(!1)};return{user:s,setUser:n,userData:l,setUserData:c,userRole:g,setUserRole:f,loading:x,authOpen:y,setAuthOpen:u,authTab:k,setAuthTab:p,selectedRole:b,setSelectedRole:z,authForm:C,setAuthForm:I,authError:L,setAuthError:S,authLoading:P,setAuthLoading:W,contractOpen:G,setContractOpen:J,contractAccepted:Z,setContractAccepted:h,pendingRegistration:N,setPendingRegistration:$,pendingAction:q,setPendingAction:F,chargerProfil:ae,doLogin:K,doRegister:ze,doGoogle:async()=>{const{error:O}=await E.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin}});O&&S(O.message)},doLogout:async()=>{await E.auth.signOut(),n(null),c(null),f(null),t("overview"),e("home")},handleContractAccepted:async O=>{J(!1),h(!0),setTimeout(()=>{ze()},200)},executePendingAction:fe}}const xo="yorix_cart";function In(){try{const e=localStorage.getItem(xo);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t.map(pr).filter(Boolean):[]}catch{return[]}}function Ln(e){try{localStorage.setItem(xo,JSON.stringify(e||[]))}catch{}}function pr(e){if(!e||!e.id)return null;const t=e.kind||"product";return{...e,kind:t,qty:Math.max(1,Number(e.qty||1)),prix:Number(e.prix||0),fulfillmentMode:e.fulfillmentMode||(t==="service"?"booking":"delivery")}}function Pn(e){if(!(e!=null&&e.id))return null;let t=[];if(Array.isArray(e.image_urls))t=e.image_urls;else if(typeof e.image_urls=="string")try{t=JSON.parse(e.image_urls)}catch{t=[]}const o=e.image&&String(e.image).startsWith("http")?e.image:t[0]&&String(t[0]).startsWith("http")?t[0]:null;return pr({id:e.id,kind:"product",name:e.name_fr||e.name||"Produit",image:o,prix:Number(e.prix||0),qty:1,vendeur_id:e.vendeur_id||null,vendeur_nom:e.vendeur_nom||"",categorie:e.categorie||"",ville:e.ville||"",stock:e.stock??null,fulfillmentMode:"delivery",pricingSnapshot:{base:Number(e.prix||0),currency:"XAF"}})}function On(e){return e!=null&&e.id?pr({id:e.id,kind:"service",name:e.name||e.provider_nom||e.metier||"Prestation",image:e.photo||null,prix:Number(e.prix_number||e.prix||0),qty:1,provider_id:e.provider_id||null,provider_nom:e.provider_nom||e.name||"",categorie:e.categorie||"Service",ville:e.ville||"",booking:{date:"",time:"",locationType:"home",notes:""},fulfillmentMode:"booking",pricingSnapshot:{base:Number(e.prix_number||e.prix||0),currency:"XAF"}}):null}function Lt(e,t){const o=pr(t);if(!o)return e||[];const i=Array.isArray(e)?e:[],a=i.findIndex(s=>s.id===o.id&&s.kind===o.kind);return a===-1?[...i,o]:i.map((s,n)=>n!==a?s:{...s,qty:s.kind==="service"?1:Math.max(1,s.qty+o.qty)})}function Dn(e,t,o,i){return(e||[]).map(a=>a.id!==t||o&&a.kind!==o?a:a.kind==="service"?{...a,qty:1}:{...a,qty:Math.max(1,Number(a.qty||1)+i)})}function qn(e,t,o){return(e||[]).filter(i=>!(i.id===t&&(!o||i.kind===o)))}function Yn(e,t=1500){return Ba(e,t)}function Bn(e){const[t,o]=d.useState(()=>In());d.useEffect(()=>{Ln(t)},[t]);const i=d.useCallback(g=>{const f=Pn(g);f&&o(x=>Lt(x,f))},[]),a=d.useCallback(g=>{const f=On(g);f&&o(x=>Lt(x,f))},[]),s=d.useCallback((g,f,x=null)=>{o(w=>Dn(w,g,x,f))},[]),n=d.useCallback((g,f=null)=>{o(x=>qn(x,g,f))},[]),l=d.useMemo(()=>Yn(t,e),[t,e]),c=l.qty;return{cartItems:t,setCartItems:o,addToCart:i,addServiceToCart:a,changeQty:s,removeItem:n,cartSummary:l,totalQty:c}}function $n(){const e=bi(),t=Bt(),o=d.useMemo(()=>Ii(t.pathname),[t.pathname]),i=o.page,[a,s]=d.useState("overview"),[n,l]=d.useState(!1),[c,g]=d.useState(!1),[f,x]=d.useState([]),[w,y]=d.useState(!0),[u,k]=d.useState([]);d.useEffect(()=>{(async()=>{const{data:v,error:j}=await E.from("services").select("*").eq("actif",!0).eq("disponible",!0).order("created_at",{ascending:!1});j||k(v||[])})()},[]);const[p,b]=d.useState(""),[z,C]=d.useState(""),[I,L]=d.useState(!1),[S,P]=d.useState([]),[W,G]=d.useState(()=>pe()),J=d.useRef(W);J.current=W;const[Z,h]=d.useState(!1),[N,$]=d.useState(!1),q=d.useRef(null),[F,ae]=d.useState(()=>it());d.useEffect(()=>{let m=!1;const v=()=>{m||(m=!0,requestAnimationFrame(()=>{m=!1,h(window.scrollY>16)}))};return v(),window.addEventListener("scroll",v,{passive:!0}),()=>window.removeEventListener("scroll",v)},[]),d.useEffect(()=>{if(!N)return;const m=v=>{q.current&&!q.current.contains(v.target)&&$(!1)};return document.addEventListener("mousedown",m),()=>document.removeEventListener("mousedown",m)},[N]),d.useEffect(()=>{let m=!1;return(async()=>{try{const{data:v,error:j}=await E.from("commerce_settings").select("free_shipping_threshold_xaf, standard_delivery_fee_xaf").eq("id",1).maybeSingle();if(m||j||!v)return;ae(co({freeShippingThresholdXaf:Number(v.free_shipping_threshold_xaf),standardDeliveryFeeXaf:Number(v.standard_delivery_fee_xaf)}))}catch{}})(),()=>{m=!0}},[]);const fe=d.useCallback(async(m,v=40)=>{if(!m)return;const{data:j,error:T}=await E.from("notifications").select("*").eq("user_id",m).order("created_at",{ascending:!1}).limit(v);T?console.warn("Notifications:",T.message):P(j||[])},[]),K=d.useCallback((m,v={})=>{e(qr(m,v)),window.scrollTo(0,0),L(!1)},[e]),ze=Mn({goPage:K,setDashTab:s,setDemandeLivraisonOpen:l,setNotifs:P,onProfileLoaded:fe}),{user:R,userData:ee,setUserData:Le,userRole:O,loading:Y,authOpen:B,setAuthOpen:V,authTab:re,setAuthTab:de,selectedRole:te,setSelectedRole:Ce,authForm:$e,setAuthForm:gr,authError:fr,setAuthError:Fe,authLoading:mr,setAuthLoading:xr,contractOpen:ur,setContractOpen:br,setPendingAction:hr,doLogin:yr,doRegister:vr,doGoogle:wr,doLogout:Ue,handleContractAccepted:kr,executePendingAction:We}=ze,{cartItems:jr,setCartItems:Sr,addToCart:zr,addServiceToCart:Cr,changeQty:Ve,removeItem:_r,cartSummary:ne,totalQty:be}=Bn(F);d.useEffect(()=>{if(!(R!=null&&R.id)){G(pe());return}let m=!1;return mo(E,R.id).then(v=>{m||G(v)}),()=>{m=!0}},[R==null?void 0:R.id]);const[Er,Ar]=d.useState(!1),[Tr,Nr]=d.useState(""),[Rr,Mr]=d.useState(!1),[Pe,Ir]=d.useState(new Set),[Lr,He]=d.useState(320),[Xe,Ge]=d.useState("TOUT"),[D,_e]=d.useState(null),[uo,Oe]=d.useState(!1),[Je,bo]=d.useState([]),[ho,nt]=d.useState(!0),[yo,Pr]=d.useState(null),[Ke,Qe]=d.useState(null),[vo,De]=d.useState(!1);d.useEffect(()=>{(async()=>{nt(!0);const{data:v,error:j}=await E.from("academy_courses").select("*").eq("actif",!0).order("prix",{ascending:!0});j||bo(v||[]),nt(!1)})()},[]);const wo=d.useCallback(m=>{m!=null&&m.id&&(Pr(m),e(qr("academyDetail",{courseId:m.id})))},[e]),ko=d.useCallback(m=>{m!=null&&m.id&&(Pr(m),e(qr("academyContact",{courseId:m.id})))},[e]),[jo,st]=d.useState(!1),[So,lt]=d.useState(!1),[zo,Ee]=d.useState(""),[A,Co]=d.useState({nom:"",prenom:"",tel:"",email:"",metier:"",ville:"",experience:"",tarif:"",bio:""}),_o=async()=>{if(Ee(""),!A.nom.trim()){Ee("Le nom est obligatoire");return}if(!A.tel.trim()){Ee("Le téléphone est obligatoire");return}if(!A.metier){Ee("Veuillez choisir un métier");return}if(A.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(A.email)){Ee("Email invalide");return}lt(!0);try{const{data:m,error:v}=await E.from("prestataires").insert({nom:A.nom,prenom:A.prenom||null,telephone:A.tel,email:A.email||null,metier:A.metier,ville:A.ville||null,experience:A.experience||null,tarif:A.tarif||null,bio:A.bio||null,status:"pending",user_id:(R==null?void 0:R.id)||null}).select().single();v&&console.warn("Table prestataires Supabase:",v.message);const j=["👷 *NOUVELLE CANDIDATURE PRESTATAIRE YORIX*","","👤 *Informations*",`Nom : ${A.nom}${A.prenom?" "+A.prenom:""}`,`Téléphone : ${A.tel}`,A.email?`Email : ${A.email}`:"","","💼 *Profil professionnel*",`Métier : ${A.metier}`,A.ville?`Ville : ${A.ville}`:"",A.experience?`Expérience : ${A.experience}`:"",A.tarif?`Tarif : ${A.tarif}`:"","",A.bio?`📝 *Présentation*
${A.bio}`:"","","✅ *Actions à faire*","1. Contacter le candidat sous 24h","2. Vérifier les qualifications","3. Valider ou refuser le profil","","Yorix CM 🇨🇲"].filter(Boolean).join(`
`),T=`https://wa.me/${sr}?text=${encodeURIComponent(j)}`;window.open(T,"_blank");const oe=`Nouvelle candidature prestataire — ${A.nom} (${A.metier})`,ie=["Bonjour,","","Nouvelle candidature prestataire sur Yorix CM :","",`👤 Nom : ${A.nom}${A.prenom?" "+A.prenom:""}`,`📞 Téléphone : ${A.tel}`,A.email?`📧 Email : ${A.email}`:"",`💼 Métier : ${A.metier}`,A.ville?`📍 Ville : ${A.ville}`:"",A.experience?`⏱ Expérience : ${A.experience}`:"",A.tarif?`💰 Tarif : ${A.tarif}`:"","",A.bio?`📝 Présentation :
${A.bio}`:"","","---","Envoyé depuis yorix.cm"].filter(Boolean).join(`
`),he=`mailto:raisaodin1@gmail.com?subject=${encodeURIComponent(oe)}&body=${encodeURIComponent(ie)}`;setTimeout(()=>window.open(he,"_blank"),500),st(!0)}catch(m){console.error("soumettreCandidaturePrestataire:",m),Ee("Erreur : "+(m.message||"Impossible d'envoyer la candidature. Réessayez."))}lt(!1)},[Eo,Un]=d.useState([{text:"Bonjour ! Comment puis-je vous aider ?",me:!1,time:"10:02"}]),[Wn,Vn]=d.useState(""),[Hn,Xn]=d.useState(!1),Ao=d.useRef(null);d.useEffect(()=>{if(!localStorage.getItem("yorix_onboarding_seen")){const v=setTimeout(()=>Oe(!0),800);return()=>clearTimeout(v)}},[]);const To=d.useCallback(m=>{localStorage.setItem("yorix_onboarding_seen","1"),Oe(!1);const j={buy:{needAuth:!1,page:"produits"},sell:{needAuth:!0,role:"seller",page:"dashboard"},service:{needAuth:!1,page:"prestataires"},delivery:{needAuth:!0,role:"buyer",action:"openDelivery"}}[m];if(j){if(j.needAuth&&!R){hr(m),Ce(j.role||"buyer"),de("register"),V(!0);return}We(m)}},[R,We]),No=d.useCallback(()=>{localStorage.setItem("yorix_onboarding_seen","1"),Oe(!1)},[]);d.useEffect(()=>{if(!(R!=null&&R.id))return;const m=E.channel(`notifications_rt_${R.id}`).on("postgres_changes",{event:"INSERT",schema:"public",table:"notifications",filter:`user_id=eq.${R.id}`},v=>{const j=v.new;P(T=>T.some(oe=>oe.id===j.id)?T:[j,...T].slice(0,120));try{Xa(at(j),J.current)}catch{}}).subscribe();return()=>{E.removeChannel(m)}},[R==null?void 0:R.id]),d.useEffect(()=>{if(!("serviceWorker"in navigator))return;const m=v=>{var T;if(((T=v.data)==null?void 0:T.type)!=="NOTIF_NAV")return;const j=typeof v.data.url=="string"?v.data.url:"/";e(j.startsWith("/")?j:`/${j}`)};return navigator.serviceWorker.addEventListener("message",m),()=>navigator.serviceWorker.removeEventListener("message",m)},[e]),d.useEffect(()=>{y(!0);const m=async()=>{let j=E.from("products").select("*").or("actif.eq.true,actif.is.null").order("sponsorise",{ascending:!1}).order("created_at",{ascending:!1}).limit(60);z&&(j=j.eq("categorie",z));const{data:T,error:oe}=await j;oe&&console.warn("Produits:",oe.message),x(T||[]),y(!1)};m();const v=E.channel("prod_rt").on("postgres_changes",{event:"*",schema:"public",table:"products"},m).subscribe();return()=>E.removeChannel(v)},[z]),d.useEffect(()=>{var m;(m=Ao.current)==null||m.scrollIntoView({behavior:"smooth"})},[Eo]);const Ze=t.pathname;d.useEffect(()=>{if(o.categorySlug){const m=Mi(o.categorySlug,ao);C(m||"")}else o.page==="produits"&&Ze==="/produits"&&C("")},[o.categorySlug,o.page,Ze]);const ye=d.useMemo(()=>{var m;return o.citySlug?(m=Q[o.citySlug])==null?void 0:m.name:null},[o.citySlug]),Ro=d.useMemo(()=>{var m;return o.page==="prestataires"&&o.metierSlug&&o.villeSlug?{cat:Ht[o.metierSlug]||"",ville:((m=Q[o.villeSlug])==null?void 0:m.name)||""}:o.page==="seoCity"&&o.cityMode==="prestataires"&&ye?{cat:"",ville:ye}:o.page==="prestataires"&&Ze==="/prestataires"?{cat:"",ville:""}:null},[o.page,o.metierSlug,o.villeSlug,o.cityMode,ye,Ze]);d.useEffect(()=>{if(o.page!=="academyDetail"&&o.page!=="academyContact")return;const m=o.courseId;if(!m||!Je.length)return;const v=Je.find(j=>String(j.id)===String(m));v&&Pr(v)},[o.page,o.courseId,Je]),d.useEffect(()=>{if(o.page!=="productDetail"||!o.productSlug){Qe(null),De(!1);return}const{id:m}=zt(o.productSlug);if(!m){Qe(null),De(!1);return}let v=!1;return De(!0),E.from("products").select("*").eq("id",m).maybeSingle().then(({data:j,error:T})=>{v||(T&&console.warn("Détail produit:",T.message),Qe(j||null),De(!1))}).catch(j=>{v||(console.warn("Détail produit:",(j==null?void 0:j.message)||j),Qe(null),De(!1))}),()=>{v=!0}},[o.page,o.productSlug]),d.useEffect(()=>{if(o.page!=="prestDetail"||!o.prestSlug){o.page!=="prestDetail"&&_e(null);return}const{id:m}=zt(o.prestSlug);if(!m){_e(null);return}const v=va.find(T=>T.id===m);if(v){_e(v);return}const j=u.find(T=>`real-${T.id}`===m||String(T.id)===m);_e(j?{id:`real-${j.id}`,name:j.provider_nom||"Prestataire Yorix",metier:j.nom||"Service",categorie:j.categorie||"Autre",ville:j.ville||"Cameroun",quartier:"",emoji:"🛠️",photo:null,color_bg:"linear-gradient(135deg, #dcfce7, #bbf7d0)",tags:[j.categorie||"Service"].filter(Boolean),note:j.note||5,avis:j.nombre_avis||0,prix:j.prix?`${Number(j.prix).toLocaleString("fr-FR")} FCFA`:"",verifie:!0,dispo:j.disponible!==!1,bio:j.description||"",telephone:"",realisations:0,isReal:!0}:null)},[o.page,o.prestSlug,u]);const Mo=d.useCallback(async m=>{if(!(R!=null&&R.id)||!m)return;const v={};if(m.telephone!=null&&String(m.telephone).trim()!==""&&(v.telephone=String(m.telephone).trim()),m.adresse!=null&&(v.adresse=String(m.adresse).trim()),m.ville!=null&&(v.ville=String(m.ville).trim()),m.nom!=null&&(v.nom=String(m.nom).trim()),!Object.keys(v).length)return;const{error:j}=await E.from("profiles").update(v).eq("id",R.id);if(j){console.warn("Profil checkout non sauvegardé:",j.message||j);return}Le(T=>T&&{...T,...v})},[R==null?void 0:R.id]),Io=d.useCallback(m=>Ir(v=>{const j=new Set(v);return j.has(m)?j.delete(m):j.add(m),j}),[]),dt=async(m,v={navigate:!0,closeDrawer:!0})=>{const j=typeof m=="object"?m.id:m,T=typeof m=="object"?m:S.find(ie=>ie.id===j);try{const{error:ie}=await E.from("notifications").update({lu:!0}).eq("id",j);ie&&console.warn("marquerNotifLue:",ie.message)}catch(ie){console.warn("marquerNotifLue exception:",ie==null?void 0:ie.message)}if(P(ie=>ie.map(he=>he.id===j?{...he,lu:!0}:he)),v.closeDrawer&&L(!1),!v.navigate||!T)return;const oe=String(T.link||"").trim();if(oe.startsWith("http")){window.open(oe,"_blank","noopener,noreferrer");return}if(oe.startsWith("/")){e(oe);return}T.type==="new_product"||oe.includes("/products/")?K("produits"):T.type==="new_message"&&(K("dashboard"),s("messages"))},ct=async m=>{if(m){try{const{error:v}=await E.from("notifications").delete().eq("id",m);v&&console.warn("supprimerNotif:",v.message)}catch(v){console.warn("supprimerNotif:",v==null?void 0:v.message)}P(v=>v.filter(j=>j.id!==m))}},pt=async()=>{const m=S.filter(v=>!v.lu).map(v=>v.id);if(m.length!==0){try{const{error:v}=await E.from("notifications").update({lu:!0}).in("id",m);v&&console.warn("marquerToutesLues:",v.message)}catch(v){console.warn("marquerToutesLues exception:",v==null?void 0:v.message)}P(v=>v.map(j=>({...j,lu:!0})))}},gt=S.filter(m=>!m.lu).length,Lo=d.useMemo(()=>{let m=f.filter(v=>{var j,T;return!p||((j=v.name_fr)==null?void 0:j.toLowerCase().includes(p.toLowerCase()))||((T=v.description_fr)==null?void 0:T.toLowerCase().includes(p.toLowerCase()))});if(i==="seoCity"&&o.cityMode==="acheter"&&ye){const v=ye.toLowerCase();m=m.filter(j=>{const T=(j.ville||"").toLowerCase();return!T||T.includes(v)||v.includes(T)})}return m},[f,p,i,o.cityMode,ye]),Po=i==="seoCity"||i==="livraison"&&!!o.citySlug,ft=i==="produits"||i==="seoCity"&&o.cityMode==="acheter",Oo=i==="livraison"||i==="seoCity"&&o.cityMode==="livraison",Do=i==="prestataires"||i==="prestDetail"||i==="seoCity"&&o.cityMode==="prestataires",qo=ft||i==="escrow",Yo=d.useMemo(()=>["faq","devenirVendeur","devenirLivreur","inscription","business","academy","blog","contact","aide","cgv","mentions","confidentialite"].includes(i),[i]),mt=d.useCallback(m=>m==="produits"?i==="produits"||i==="seoCity"&&o.cityMode==="acheter":m==="livraison"?i==="livraison"||i==="seoCity"&&o.cityMode==="livraison":m==="prestataires"?i==="prestataires"||i==="prestDetail"||i==="seoCity"&&o.cityMode==="prestataires":i===m,[i,o.cityMode]),Bo=d.useCallback(m=>{K("productDetail",{productSlug:Gt(m.name_fr||m.name,m.id)})},[K]),xt=()=>({buyer:"chip-buyer",seller:"chip-seller",delivery:"chip-delivery",provider:"chip-provider",admin:"chip-admin"})[O]||"chip-buyer",$o=()=>O==="seller"?[{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"🏪",id:"mesProduits",label:"Mes produits"},{icon:"➕",id:"ajouterProduit",label:"Ajouter produit"},{icon:"📦",id:"commandes",label:"Commandes"},{icon:"💰",id:"wallet",label:"Wallet"}]:O==="delivery"?[{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"🟡",id:"disponibles",label:"Disponibles"},{icon:"🚚",id:"enCours",label:"En cours"},{icon:"✅",id:"historique",label:"Historique"},{icon:"💰",id:"wallet",label:"Gains"}]:O==="provider"?[{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"📋",id:"demandes",label:"Demandes"},{icon:"🛠️",id:"mesServices",label:"Mes services"},{icon:"+",id:"ajouterService",label:"Ajouter service"}]:[{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"📦",id:"commandes",label:"Mes commandes"},{icon:"❤️",id:"favoris",label:"Favoris"},{icon:"🌟",id:"loyalty",label:"Fidélité"}],Fo=[{l:"🏠 Accueil",p:"home"},{l:"🛍️ Produits",p:"produits"},{l:"🎁 Bons plans",p:"bonsPlans"},{l:"🚚 Livraison",p:"livraison"},{l:"🔐 Escrow",p:"escrow"},{l:"👷 Prestataires",p:"prestataires"},{l:"💼 Business",p:"business"},{l:"🎓 Academy",p:"academy"},{l:"📰 Blog",p:"blog"},{l:"🌟 Fidélité",p:"loyalty"},{l:"📞 Contact",p:"contact"},{l:"🆘 Aide",p:"aide"},...R&&((ee==null?void 0:ee.role)==="admin"||(ee==null?void 0:ee.role)==="superadmin")?[{l:"⚙️ Admin",p:"admin"}]:[]],ve=d.useMemo(()=>{const m=o.canonicalPath||t.pathname,v={"@context":"https://schema.org","@type":"Organization",name:"Yorix CM",alternateName:"Yorix Cameroun",url:ce,logo:`${ce}/favicon.svg`,image:`${ce}/og-image.svg`,email:"support@yorix.cm",telephone:"+237696565654",foundingDate:"2025",address:{"@type":"PostalAddress",addressCountry:"CM",addressLocality:"Douala",addressRegion:"Littoral"},areaServed:{"@type":"Country",name:"Cameroun"},contactPoint:[{"@type":"ContactPoint",telephone:"+237696565654",contactType:"customer service",areaServed:"CM",availableLanguage:["French","English"]}],sameAs:["https://www.facebook.com/yorixcm","https://www.instagram.com/yorixcm","https://wa.me/237696565654"]},j=M=>M!=null&&M.length?{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:M.map((se,we)=>{var Ae;return{"@type":"ListItem",position:we+1,name:se.name,item:(Ae=se.path)!=null&&Ae.startsWith("http")?se.path:`${ce}${se.path||"/"}`}})}:null,T={"@context":"https://schema.org","@type":"WebSite",name:"Yorix CM",url:ce,potentialAction:{"@type":"SearchAction",target:`${Li()}?q={search_term_string}`,"query-input":"required name=search_term_string"}};if(i==="dashboard"||i==="admin")return{title:"Espace membre — Yorix CM",description:"Tableau de bord Yorix.",canonicalPath:m,noindex:!0,jsonLd:[]};if(i==="home")return{title:"Yorix.cm — Marketplace Cameroun | Achat en ligne, livraison, escrow, prestataires",description:"Yorix est une marketplace camerounaise : achat en ligne, vendre en ligne, livreur & livraison Douala, Yaoundé, Bafoussam, escrow MTN MoMo & Orange Money, prestataires vérifiés.",canonicalPath:"/",keywords:"marketplace Cameroun, achat en ligne Cameroun, vendre en ligne Cameroun, livraison Cameroun, livreur Cameroun, escrow Cameroun, prestataires Cameroun, Douala, Yaoundé, Bafoussam",jsonLd:[v,T]};if(i==="productDetail"&&Ke){const M=Ke,se=M.image&&String(M.image).startsWith("http")?M.image:Array.isArray(M.image_urls)&&M.image_urls[0]?M.image_urls[0]:`${ce}/og-image.svg`,we=M.description_fr&&String(M.description_fr).slice(0,158)||`Acheter ${M.name_fr||"ce produit"} sur Yorix — marketplace & livraison Cameroun.`,Ae={"@context":"https://schema.org","@type":"Product",name:M.name_fr||"Produit Yorix",image:se,description:we,brand:{"@type":"Brand",name:"Yorix CM"},offers:{"@type":"Offer",url:`${ce}${m}`,priceCurrency:"XAF",price:M.prix,availability:"https://schema.org/InStock"}},Or=j([{name:"Accueil",path:"/"},{name:"Produits",path:"/produits"},{name:M.name_fr||"Produit",path:m}]);return{title:`${M.name_fr||"Produit"} — achat en ligne Cameroun | Yorix.cm`,description:we,canonicalPath:m,ogType:"product",ogImage:se.startsWith("http")?se:`${ce}/og-image.svg`,jsonLd:[Ae,Or,v]}}if(i==="notifications")return{title:"Notifications — alertes commandes & messages | Yorix.cm",description:"Historique de vos alertes Yorix : commandes, paiements, livraisons, prestations et messages.",canonicalPath:"/notifications",noindex:!0,jsonLd:[v]};if(i==="faq")return{title:"FAQ Yorix — marketplace, livraison, escrow Cameroun",description:"Réponses sur l’achat en ligne, la livraison, les prestataires, MTN MoMo, Orange Money et l’escrow sur Yorix.cm.",canonicalPath:"/faq",jsonLd:[{"@context":"https://schema.org","@type":"FAQPage",mainEntity:[{"@type":"Question",name:"Comment acheter sur Yorix au Cameroun ?",acceptedAnswer:{"@type":"Answer",text:"Parcourez les produits, ajoutez au panier et finalisez via WhatsApp ou paiement mobile (MTN MoMo, Orange Money)."}},{"@type":"Question",name:"La livraison couvre quelles villes ?",acceptedAnswer:{"@type":"Answer",text:"Douala, Yaoundé, Bafoussam, Bamenda, Kribi et un réseau national en expansion. Délais J+1 sur les grandes villes."}},{"@type":"Question",name:"Comment fonctionne l’escrow Yorix ?",acceptedAnswer:{"@type":"Answer",text:"Les fonds sont sécurisés jusqu’à confirmation de réception par l’acheteur, puis libérés au vendeur."}}]},v]};if(i==="seoCity"&&o.citySlug&&Q[o.citySlug]){const M=Q[o.citySlug].name,se={hub:{title:`Yorix ${M} — marketplace, livraison & prestataires | Cameroun`,desc:`Marketplace à ${M} : acheter en ligne, livraison, services et escrow. MTN MoMo, Orange Money — Yorix.cm.`},acheter:{title:`Acheter en ligne à ${M} — marketplace Yorix Cameroun`,desc:`Achat en ligne à ${M} : produits vérifiés, paiement mobile, livraison. La marketplace camerounaise Yorix.`},livraison:{title:`Livraison à ${M} — livreur & colis | Yorix Ride Cameroun`,desc:`Service de livraison rapide à ${M} et partout au Cameroun. Suivi, tarifs clairs — Yorix Ride.`},prestataires:{title:`Prestataires à ${M} — services à domicile | Yorix.cm`,desc:`Trouvez des prestataires vérifiés à ${M} : plomberie, électricité, ménage, beauté, informatique…`}},we=se[o.cityMode]||se.hub,Ae={"@context":"https://schema.org","@type":"LocalBusiness",name:`Yorix — ${M}`,url:`${ce}${m}`,address:{"@type":"PostalAddress",addressLocality:M,addressCountry:"CM"},areaServed:{"@type":"City",name:M},parentOrganization:{"@type":"Organization",name:"Yorix CM"}},Or=j([{name:"Accueil",path:"/"},{name:M,path:m}]);return{title:we.title,description:we.desc,canonicalPath:m,jsonLd:[Ae,Or,v]}}const oe={produits:"Produits — marketplace en ligne Cameroun | Yorix.cm",livraison:"Livraison Cameroun — livreurs Yorix Ride | Douala, Yaoundé",escrow:"Escrow Cameroun — paiement sécurisé marketplace | Yorix.cm",prestataires:"Prestataires Cameroun — services à domicile vérifiés | Yorix.cm",business:"Yorix Business — solutions B2B marketplace Cameroun",blog:"Blog Yorix — actualités marketplace Cameroun",academy:"Yorix Academy — formations e-commerce Cameroun",loyalty:"Fidélité Yorix — points & récompenses",contact:"Contact Yorix — support marketplace Cameroun",aide:"Centre d'aide Yorix — marketplace & livraison Cameroun",faq:"FAQ Yorix — achat, livraison, escrow, vendeurs | Cameroun",cgv:"CGV Yorix.cm — conditions générales de vente",confidentialite:"Politique de confidentialité — Yorix.cm",mentions:"Mentions légales — Yorix.cm",devenirVendeur:"Devenir vendeur sur Yorix — marketplace Cameroun",devenirLivreur:"Devenir livreur Yorix Ride — livraison Cameroun",inscription:"Devenir prestataire Yorix — services Cameroun"},ie={produits:"Produits",livraison:"Livraison",escrow:"Escrow & sécurité",prestataires:"Prestataires",business:"Business",blog:"Blog",academy:"Academy",loyalty:"Fidélité",contact:"Contact",aide:"Centre d'aide",faq:"FAQ",cgv:"CGV",confidentialite:"Confidentialité",mentions:"Mentions légales",devenirVendeur:"Devenir vendeur",devenirLivreur:"Devenir livreur",inscription:"Devenir prestataire",bonsPlans:"Bons plans"},he=oe[i];if(he){const M=ie[i],se=M?j([{name:"Accueil",path:"/"},{name:M,path:nr[i]||m}]):null;return{title:he,description:"Yorix.cm — marketplace & super-app pour acheter, vendre, se faire livrer et trouver des prestataires au Cameroun. MTN MoMo, Orange Money, escrow.",canonicalPath:nr[i]||m,jsonLd:[se,v].filter(Boolean)}}return{title:"Yorix CM — Marketplace #1 au Cameroun",description:"Marketplace camerounaise : produits, livraison, prestataires, escrow MTN MoMo & Orange Money.",canonicalPath:m,jsonLd:[v]}},[i,o.canonicalPath,o.citySlug,o.cityMode,t.pathname,Ke]),Uo={page:i,route:o,user:R,userData:ee,userRole:O,dark:c,goPage:K,filterCat:z,setFilterCat:C,search:p,setSearch:b,produits:f,produitsLoading:w,wishlist:Pe,addToCart:zr,toggleWish:Io,openProductUrl:Bo,setOnboardingOpen:Oe,allServices:u,nlEmail:Tr,setNlEmail:Nr,nlSent:Rr,setNlSent:Mr,commerceDeliveryPolicy:F,showSeoLocal:Po,detailProduct:Ke,detailProductLoading:vo,needsProductListingChunk:qo,showProduits:ft,seoCityName:ye,produitsFiltres:Lo,showLivraison:Oo,showPrestataires:Do,selectedPrest:D,setSelectedPrest:_e,prestSyncFilters:Ro,addServiceToCart:Cr,cartItems:jr,cartSummary:ne,changeQty:Ve,removeItem:_r,setCartItems:Sr,persistCheckoutContact:Mo,setAuthTab:de,setSelectedRole:Ce,setAuthOpen:V,setDemandeLivraisonOpen:l,notifs:S,marquerNotifLue:dt,marquerToutesLues:pt,supprimerNotif:ct,loadNotifsForUser:fe,setNotifPrefs:G,isSiteMarketingPage:Yo,inscriptionSent:jo,setInscriptionSent:st,inscriptionForm:A,setInscriptionForm:Co,inscriptionError:zo,inscriptionLoading:So,soumettreCandidaturePrestataire:_o,academyCourses:Je,academyLoading:ho,goAcademyDetail:wo,blogFilter:Xe,setBlogFilter:Ge,selectedCourse:yo,goAcademyContact:ko,dashTab:a,setDashTab:s,getDashNav:$o,roleChipClass:xt,doLogout:Ue,loyaltyPts:Lr,setLoyaltyPts:He,totalQty:be,waOpen:Er,setWaOpen:Ar,tabActive:mt,unread:gt};return Y?r.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",fontFamily:"'DM Sans',sans-serif",color:"#1a6b3a",gap:12},children:[r.jsx("div",{style:{width:40,height:40,border:"4px solid #e2ddd6",borderTopColor:"#1a6b3a",borderRadius:"50%",animation:"spin .7s linear infinite"}}),"Chargement de Yorix...",r.jsx("style",{children:"@keyframes spin{to{transform:rotate(360deg);}}"})]}):r.jsxs(r.Fragment,{children:[r.jsx("style",{children:Ta(c)}),r.jsx(pa,{title:ve.title,description:ve.description,canonicalPath:ve.canonicalPath,keywords:ve.keywords,ogType:ve.ogType||"website",jsonLd:ve.jsonLd,noindex:ve.noindex}),r.jsx(an,{open:ur,onClose:()=>{br(!1),xr(!1),Fe("Vous devez accepter le contrat pour finaliser votre inscription.")},onAccepted:kr,user:R,userData:ee,role:te,authForm:$e}),r.jsx(on,{open:uo,onClose:No,onSelectAction:To,user:R}),n&&r.jsx(qa,{user:R,userData:ee,onClose:()=>l(!1),onSuccess:m=>{console.log("Livraison créée avec code:",m)}}),r.jsx(ln,{authOpen:B,setAuthOpen:V,authTab:re,setAuthTab:de,selectedRole:te,setSelectedRole:Ce,authForm:$e,setAuthForm:gr,authError:fr,setAuthError:Fe,authLoading:mr,doLogin:yr,doRegister:vr,doGoogle:wr}),r.jsx(dn,{navCompact:Z,dark:c,setDark:g,user:R,userData:ee,userRole:O,goPage:K,filterCat:z,setFilterCat:C,search:p,setSearch:b,produits:f,setOnboardingOpen:Oe,setNotifOpen:L,unread:gt,totalQty:be,setAuthTab:de,setAuthOpen:V,setSelectedRole:Ce,doLogout:Ue,navQuickRef:q,navQuickOpen:N,setNavQuickOpen:$,TABS:Fo,tabActive:mt,commerceDeliveryPolicy:F,roleChipClass:xt}),I&&R&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"notif-backdrop",role:"presentation",onClick:()=>L(!1)}),r.jsx("div",{className:"notif-drawer notif-drawer--premium",children:r.jsx(rn,{variant:"dropdown",user:R,notifs:S,goPage:K,onMarkRead:dt,onMarkAllRead:pt,onDismiss:ct,onClose:()=>L(!1),onPrefsUpdated:G})})]}),r.jsx(Ai,{resetKeys:[i,t.pathname],children:r.jsx(Rn,{ctx:Uo})}),r.jsx(tn,{goPage:K,freeShippingThresholdXaf:F.freeShippingThresholdXaf})]})}function Fn(){return r.jsx(Wt,{children:r.jsx($n,{})})}Vr.createRoot(document.getElementById("root")).render(r.jsx(ue.StrictMode,{children:r.jsx(_i,{children:r.jsx(to,{children:r.jsx(Fn,{})})})}));export{Oa as A,es as B,ao as C,Qn as D,Zn as E,ns as F,ma as M,rn as N,xa as O,va as P,rs as R,Vt as S,sr as Y,U as _,ya as a,Q as b,pn as c,Bt as d,nr as e,ts as f,os as g,ua as h,is as i,r as j,ps as k,ds as l,Pa as m,ls as n,ir as o,gs as p,lr as q,cs as r,E as s,_a as t,bi as u,Ra as v,no as w,ss as x,so as y,as as z};
