const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/HomePage-CarFP3Jw.js","assets/react-CDaM45aE.js","assets/ProdGrid-CmvCuS15.js","assets/OptimizedImage-v-42A-y8.js","assets/ModalCommander-Dm2sSf-u.js","assets/checkoutApi-Bn_e2fYc.js","assets/supabase-D2gm834s.js","assets/ProductRouteSections-CKeAlbiE.js","assets/MarketingBreadcrumb-aDjPiL7y.js","assets/LivraisonPage-CbWXr00T.js","assets/SiteMarketingPages-D1pI_0Vt.js","assets/LivraisonLazyBlocks-4vqaz1UR.js","assets/FicheProduit-1n43Q3Ng.js","assets/PrestPage-D6xhNyn1.js","assets/CheckoutPage-3-z-OJ3C.js","assets/FreeShippingProgress-Lpes2AnN.js","assets/CartPage-CqKnB6kC.js","assets/AcademyDetail-DVgsxW9C.js","assets/AcademyContactForm-CYkFuups.js","assets/LoyaltyPage-t7JL3exQ.js","assets/SellerDashboard-BECH6tUQ.js","assets/BuyerDashboard-eICVy84w.js","assets/DeliveryDashboard-CTa11BN5.js","assets/ProviderDashboard-7CSf9rhs.js","assets/AdminDashboard-B5vYaXs-.js","assets/NotificationsPage-BRpA0_JR.js","assets/PromotionsPage-7eyH0cjG.js"])))=>i.map(i=>d[i]);
var Bi=Object.defineProperty;var Fi=(r,i,t)=>i in r?Bi(r,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[i]=t;var Z=(r,i,t)=>Fi(r,typeof i!="symbol"?i+"":i,t);import{r as l,a as Yi,R as $i,g as Sr,b as ee}from"./react-CDaM45aE.js";import{c as Ui}from"./supabase-D2gm834s.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const d of a)if(d.type==="childList")for(const s of d.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function t(a){const d={};return a.integrity&&(d.integrity=a.integrity),a.referrerPolicy&&(d.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?d.credentials="include":a.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function o(a){if(a.ep)return;a.ep=!0;const d=t(a);fetch(a.href,d)}})();var St={exports:{}},Je={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wi=l,Vi=Symbol.for("react.element"),Hi=Symbol.for("react.fragment"),Xi=Object.prototype.hasOwnProperty,Ji=Wi.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Gi={key:!0,ref:!0,__self:!0,__source:!0};function Ct(r,i,t){var o,a={},d=null,s=null;t!==void 0&&(d=""+t),i.key!==void 0&&(d=""+i.key),i.ref!==void 0&&(s=i.ref);for(o in i)Xi.call(i,o)&&!Gi.hasOwnProperty(o)&&(a[o]=i[o]);if(r&&r.defaultProps)for(o in i=r.defaultProps,i)a[o]===void 0&&(a[o]=i[o]);return{$$typeof:Vi,type:r,key:d,ref:s,props:a,_owner:Ji.current}}Je.Fragment=Hi;Je.jsx=Ct;Je.jsxs=Ct;St.exports=Je;var e=St.exports,br={},it=Yi;br.createRoot=it.createRoot,br.hydrateRoot=it.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Re(){return Re=Object.assign?Object.assign.bind():function(r){for(var i=1;i<arguments.length;i++){var t=arguments[i];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(r[o]=t[o])}return r},Re.apply(this,arguments)}var ce;(function(r){r.Pop="POP",r.Push="PUSH",r.Replace="REPLACE"})(ce||(ce={}));const ot="popstate";function Ki(r){r===void 0&&(r={});function i(o,a){let{pathname:d,search:s,hash:p}=o.location;return vr("",{pathname:d,search:s,hash:p},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function t(o,a){return typeof a=="string"?a:zt(a)}return eo(i,t,null,r)}function Q(r,i){if(r===!1||r===null||typeof r>"u")throw new Error(i)}function Qi(r,i){{typeof console<"u"&&console.warn(i);try{throw new Error(i)}catch{}}}function Zi(){return Math.random().toString(36).substr(2,8)}function at(r,i){return{usr:r.state,key:r.key,idx:i}}function vr(r,i,t,o){return t===void 0&&(t=null),Re({pathname:typeof r=="string"?r:r.pathname,search:"",hash:""},typeof i=="string"?Ge(i):i,{state:t,key:i&&i.key||o||Zi()})}function zt(r){let{pathname:i="/",search:t="",hash:o=""}=r;return t&&t!=="?"&&(i+=t.charAt(0)==="?"?t:"?"+t),o&&o!=="#"&&(i+=o.charAt(0)==="#"?o:"#"+o),i}function Ge(r){let i={};if(r){let t=r.indexOf("#");t>=0&&(i.hash=r.substr(t),r=r.substr(0,t));let o=r.indexOf("?");o>=0&&(i.search=r.substr(o),r=r.substr(0,o)),r&&(i.pathname=r)}return i}function eo(r,i,t,o){o===void 0&&(o={});let{window:a=document.defaultView,v5Compat:d=!1}=o,s=a.history,p=ce.Pop,c=null,m=g();m==null&&(m=0,s.replaceState(Re({},s.state,{idx:m}),""));function g(){return(s.state||{idx:null}).idx}function h(){p=ce.Pop;let f=g(),b=f==null?null:f-m;m=f,c&&c({action:p,location:w.location,delta:b})}function k(f,b){p=ce.Push;let y=vr(w.location,f,b);m=g()+1;let M=at(y,m),E=w.createHref(y);try{s.pushState(M,"",E)}catch(q){if(q instanceof DOMException&&q.name==="DataCloneError")throw q;a.location.assign(E)}d&&c&&c({action:p,location:w.location,delta:1})}function v(f,b){p=ce.Replace;let y=vr(w.location,f,b);m=g();let M=at(y,m),E=w.createHref(y);s.replaceState(M,"",E),d&&c&&c({action:p,location:w.location,delta:0})}function z(f){let b=a.location.origin!=="null"?a.location.origin:a.location.href,y=typeof f=="string"?f:zt(f);return y=y.replace(/ $/,"%20"),Q(b,"No window.location.(origin|href) available to create URL for href: "+y),new URL(y,b)}let w={get action(){return p},get location(){return r(a,s)},listen(f){if(c)throw new Error("A history only accepts one active listener");return a.addEventListener(ot,h),c=f,()=>{a.removeEventListener(ot,h),c=null}},createHref(f){return i(a,f)},createURL:z,encodeLocation(f){let b=z(f);return{pathname:b.pathname,search:b.search,hash:b.hash}},push:k,replace:v,go(f){return s.go(f)}};return w}var nt;(function(r){r.data="data",r.deferred="deferred",r.redirect="redirect",r.error="error"})(nt||(nt={}));function ro(r,i){if(i==="/")return r;if(!r.toLowerCase().startsWith(i.toLowerCase()))return null;let t=i.endsWith("/")?i.length-1:i.length,o=r.charAt(t);return o&&o!=="/"?null:r.slice(t)||"/"}const to=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,io=r=>to.test(r);function oo(r,i){i===void 0&&(i="/");let{pathname:t,search:o="",hash:a=""}=typeof r=="string"?Ge(r):r,d;if(t)if(io(t))d=t;else{if(t.includes("//")){let s=t;t=t.replace(/\/\/+/g,"/"),Qi(!1,"Pathnames cannot have embedded double slashes - normalizing "+(s+" -> "+t))}t.startsWith("/")?d=st(t.substring(1),"/"):d=st(t,i)}else d=i;return{pathname:d,search:co(o),hash:po(a)}}function st(r,i){let t=i.replace(/\/+$/,"").split("/");return r.split("/").forEach(a=>{a===".."?t.length>1&&t.pop():a!=="."&&t.push(a)}),t.length>1?t.join("/"):"/"}function dr(r,i,t,o){return"Cannot include a '"+r+"' character in a manually specified "+("`to."+i+"` field ["+JSON.stringify(o)+"].  Please separate it out to the ")+("`to."+t+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function ao(r){return r.filter((i,t)=>t===0||i.route.path&&i.route.path.length>0)}function no(r,i){let t=ao(r);return i?t.map((o,a)=>a===t.length-1?o.pathname:o.pathnameBase):t.map(o=>o.pathnameBase)}function so(r,i,t,o){o===void 0&&(o=!1);let a;typeof r=="string"?a=Ge(r):(a=Re({},r),Q(!a.pathname||!a.pathname.includes("?"),dr("?","pathname","search",a)),Q(!a.pathname||!a.pathname.includes("#"),dr("#","pathname","hash",a)),Q(!a.search||!a.search.includes("#"),dr("#","search","hash",a)));let d=r===""||a.pathname==="",s=d?"/":a.pathname,p;if(s==null)p=t;else{let h=i.length-1;if(!o&&s.startsWith("..")){let k=s.split("/");for(;k[0]==="..";)k.shift(),h-=1;a.pathname=k.join("/")}p=h>=0?i[h]:"/"}let c=oo(a,p),m=s&&s!=="/"&&s.endsWith("/"),g=(d||s===".")&&t.endsWith("/");return!c.pathname.endsWith("/")&&(m||g)&&(c.pathname+="/"),c}const lo=r=>r.join("/").replace(/\/\/+/g,"/"),co=r=>!r||r==="?"?"":r.startsWith("?")?r:"?"+r,po=r=>!r||r==="#"?"":r.startsWith("#")?r:"#"+r,_t=["post","put","patch","delete"];new Set(_t);const fo=["get",..._t];new Set(fo);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Xe(){return Xe=Object.assign?Object.assign.bind():function(r){for(var i=1;i<arguments.length;i++){var t=arguments[i];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(r[o]=t[o])}return r},Xe.apply(this,arguments)}const Tt=l.createContext(null),Cr=l.createContext(null),zr=l.createContext(null),_r=l.createContext({outlet:null,matches:[],isDataRoute:!1});function Tr(){return l.useContext(zr)!=null}function Et(){return Tr()||Q(!1),l.useContext(zr).location}function At(r){l.useContext(Cr).static||l.useLayoutEffect(r)}function uo(){let{isDataRoute:r}=l.useContext(_r);return r?bo():mo()}function mo(){Tr()||Q(!1);let r=l.useContext(Tt),{basename:i,future:t,navigator:o}=l.useContext(Cr),{matches:a}=l.useContext(_r),{pathname:d}=Et(),s=JSON.stringify(no(a,t.v7_relativeSplatPath)),p=l.useRef(!1);return At(()=>{p.current=!0}),l.useCallback(function(m,g){if(g===void 0&&(g={}),!p.current)return;if(typeof m=="number"){o.go(m);return}let h=so(m,JSON.parse(s),d,g.relative==="path");r==null&&i!=="/"&&(h.pathname=h.pathname==="/"?i:lo([i,h.pathname])),(g.replace?o.replace:o.push)(h,g.state,g)},[i,o,s,d,r])}var Nt=function(r){return r.UseBlocker="useBlocker",r.UseRevalidator="useRevalidator",r.UseNavigateStable="useNavigate",r}(Nt||{}),Rt=function(r){return r.UseBlocker="useBlocker",r.UseLoaderData="useLoaderData",r.UseActionData="useActionData",r.UseRouteError="useRouteError",r.UseNavigation="useNavigation",r.UseRouteLoaderData="useRouteLoaderData",r.UseMatches="useMatches",r.UseRevalidator="useRevalidator",r.UseNavigateStable="useNavigate",r.UseRouteId="useRouteId",r}(Rt||{});function go(r){let i=l.useContext(Tt);return i||Q(!1),i}function xo(r){let i=l.useContext(_r);return i||Q(!1),i}function ho(r){let i=xo(),t=i.matches[i.matches.length-1];return t.route.id||Q(!1),t.route.id}function bo(){let{router:r}=go(Nt.UseNavigateStable),i=ho(Rt.UseNavigateStable),t=l.useRef(!1);return At(()=>{t.current=!0}),l.useCallback(function(a,d){d===void 0&&(d={}),t.current&&(typeof a=="number"?r.navigate(a):r.navigate(a,Xe({fromRouteId:i},d)))},[r,i])}function vo(r,i){r==null||r.v7_startTransition,r==null||r.v7_relativeSplatPath}function yo(r){let{basename:i="/",children:t=null,location:o,navigationType:a=ce.Pop,navigator:d,static:s=!1,future:p}=r;Tr()&&Q(!1);let c=i.replace(/^\/*/,"/"),m=l.useMemo(()=>({basename:c,navigator:d,static:s,future:Xe({v7_relativeSplatPath:!1},p)}),[c,p,d,s]);typeof o=="string"&&(o=Ge(o));let{pathname:g="/",search:h="",hash:k="",state:v=null,key:z="default"}=o,w=l.useMemo(()=>{let f=ro(g,c);return f==null?null:{location:{pathname:f,search:h,hash:k,state:v,key:z},navigationType:a}},[c,g,h,k,v,z,a]);return w==null?null:l.createElement(Cr.Provider,{value:m},l.createElement(zr.Provider,{children:t,value:w}))}new Promise(()=>{});/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const wo="6";try{window.__reactRouterVersion=wo}catch{}const ko="startTransition",lt=$i[ko];function jo(r){let{basename:i,children:t,future:o,window:a}=r,d=l.useRef();d.current==null&&(d.current=Ki({window:a,v5Compat:!0}));let s=d.current,[p,c]=l.useState({action:s.action,location:s.location}),{v7_startTransition:m}=o||{},g=l.useCallback(h=>{m&&lt?lt(()=>c(h)):c(h)},[c,m]);return l.useLayoutEffect(()=>s.listen(g),[s,g]),l.useEffect(()=>vo(o),[o]),l.createElement(yo,{basename:i,children:t,location:p.location,navigationType:p.action,navigator:s,future:o})}var ct;(function(r){r.UseScrollRestoration="useScrollRestoration",r.UseSubmit="useSubmit",r.UseSubmitFetcher="useSubmitFetcher",r.UseFetcher="useFetcher",r.useViewTransitionState="useViewTransitionState"})(ct||(ct={}));var dt;(function(r){r.UseFetcher="useFetcher",r.UseFetchers="useFetchers",r.UseScrollRestoration="useScrollRestoration"})(dt||(dt={}));const oe="https://www.yorix.cm",Mt=[{slug:"yaounde",name:"Yaoundé",region:"Centre"},{slug:"douala",name:"Douala",region:"Littoral"},{slug:"bafoussam",name:"Bafoussam",region:"Ouest"},{slug:"bamenda",name:"Bamenda",region:"Nord-Ouest"},{slug:"kribi",name:"Kribi",region:"Sud"},{slug:"bertoua",name:"Bertoua",region:"Est"},{slug:"garoua",name:"Garoua",region:"Nord"},{slug:"ngaoundere",name:"Ngaoundéré",region:"Adamaoua"},{slug:"maroua",name:"Maroua",region:"Extrême-Nord"},{slug:"ebolowa",name:"Ebolowa",region:"Sud"}],F=Object.fromEntries(Mt.map(r=>[r.slug,r]));Object.fromEntries(Mt.map(r=>[r.name.toLowerCase(),r.slug]));const Pt={plomberie:"Plomberie",electricite:"Électricité",menage:"Nettoyage",beaute:"Beauté",reparation:"Réparation",transport:"Transport",graphisme:"Graphisme",photographie:"Photographie",nettoyage:"Nettoyage",menuiserie:"Menuiserie",informatique:"Informatique",cuisine:"Cuisine",maconnerie:"Maçonnerie",peinture:"Peinture",couture:"Couture"},So={"mode-accesoires":"Mode & Accessoires"};function Co(r){return It(r||"")}function It(r){return r?(String(r).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ø/g,"o").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"yorix").slice(0,80):"yorix"}function pt(r,i){return`${It(r)}--${i}`}function ft(r){if(!r||typeof r!="string")return{base:"",id:""};const i=r.lastIndexOf("--");return i===-1?{base:r,id:""}:{base:r.slice(0,i),id:r.slice(i+2)}}const Er={home:"/",produits:"/produits",livraison:"/livraison",escrow:"/escrow",prestataires:"/prestataires",inscription:"/devenir-prestataire",business:"/business",academy:"/academy",blog:"/blog",loyalty:"/fidelite",contact:"/contact",aide:"/aide",faq:"/faq",cgv:"/cgv",mentions:"/mentions-legales",confidentialite:"/politique-confidentialite",dashboard:"/dashboard",admin:"/admin",checkout:"/checkout",cart:"/panier",bonsPlans:"/bons-plans",notifications:"/notifications",devenirVendeur:"/devenir-vendeur",devenirLivreur:"/devenir-livreur"};function pr(r,i={}){if(r==="productDetail"&&i.productSlug)return`/produit/${i.productSlug}`;if(r==="prestDetail"&&i.prestSlug)return`/prestataire/${i.prestSlug}`;if(r==="produits"&&i.categorySlug)return`/categories/${i.categorySlug}`;if(r==="livraison"&&i.citySlug&&F[i.citySlug])return`/livraison/${i.citySlug}`;if(r==="prestataires"&&i.metierSlug&&i.villeSlug)return`/prestataires/${i.metierSlug}/${i.villeSlug}`;if(r==="seoCity"){const{citySlug:t,mode:o="hub"}=i;return!t||!F[t]?"/":o==="acheter"?`/acheter-a-${t}`:o==="livraison"?`/livraison-a-${t}`:o==="prestataires"?`/prestataires-a-${t}`:`/${t}`}return r==="academyDetail"&&i.courseId?`/academy/${i.courseId}`:r==="academyContact"&&i.courseId?`/academy/${i.courseId}/contact`:Er[r]??"/"}function zo(r,i=[]){if(!r)return"";const t=So[r];return t&&i.includes(t)?t:i.find(a=>Co(a)===r)||""}function _o(r){const i=r.replace(/\/+$/,"")||"/";if(i==="/")return{page:"home",canonicalPath:"/"};const t=i.split("/").filter(Boolean),[o,a,d]=t;if(o==="produit"&&a)return{page:"productDetail",productSlug:a,canonicalPath:i};if(o==="categories"&&a)return{page:"produits",categorySlug:a,canonicalPath:i};if(o==="livraison")return a?F[a]?{page:"livraison",citySlug:a,canonicalPath:i}:{page:"livraison",canonicalPath:"/livraison"}:{page:"livraison",canonicalPath:"/livraison"};if(o==="prestataire"&&a)return{page:"prestDetail",prestSlug:a,canonicalPath:i};if(o==="prestataires"&&a&&d&&Pt[a]&&F[d])return{page:"prestataires",metierSlug:a,villeSlug:d,canonicalPath:i};if(o==="prestataires")return{page:"prestataires",canonicalPath:"/prestataires"};if(o==="academy"&&a)return d==="contact"?{page:"academyContact",courseId:a,canonicalPath:i}:{page:"academyDetail",courseId:a,canonicalPath:i};const s=F[o];if(t.length===1&&s)return{page:"seoCity",citySlug:o,cityMode:"hub",canonicalPath:i};if(o!=null&&o.startsWith("acheter-a-")){const c=o.replace(/^acheter-a-/,"");if(F[c])return{page:"seoCity",citySlug:c,cityMode:"acheter",canonicalPath:i}}if(o!=null&&o.startsWith("livraison-a-")){const c=o.replace(/^livraison-a-/,"");if(F[c])return{page:"seoCity",citySlug:c,cityMode:"livraison",canonicalPath:i}}if(o!=null&&o.startsWith("prestataires-a-")){const c=o.replace(/^prestataires-a-/,"");if(F[c])return{page:"seoCity",citySlug:c,cityMode:"prestataires",canonicalPath:i}}const p={produits:"produits",livraison:"livraison",escrow:"escrow",prestataires:"prestataires",business:"business",academy:"academy",blog:"blog",fidelite:"loyalty",contact:"contact",aide:"aide",faq:"faq",cgv:"cgv",mentions:"mentions","mentions-legales":"mentions",confidentialite:"confidentialite","politique-confidentialite":"confidentialite",dashboard:"dashboard",admin:"admin",checkout:"checkout",panier:"cart",cart:"cart","bons-plans":"bonsPlans",notifications:"notifications","devenir-vendeur":"devenirVendeur","devenir-livreur":"devenirLivreur","devenir-prestataire":"inscription",inscription:"inscription"};if(t.length===1&&p[o]){const c=p[o];return{page:c,canonicalPath:Er[c]??`/${o}`}}return{page:"home",canonicalPath:"/"}}function To(){return`${oe}/produits`}var Eo=typeof Element<"u",Ao=typeof Map=="function",No=typeof Set=="function",Ro=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function Ue(r,i){if(r===i)return!0;if(r&&i&&typeof r=="object"&&typeof i=="object"){if(r.constructor!==i.constructor)return!1;var t,o,a;if(Array.isArray(r)){if(t=r.length,t!=i.length)return!1;for(o=t;o--!==0;)if(!Ue(r[o],i[o]))return!1;return!0}var d;if(Ao&&r instanceof Map&&i instanceof Map){if(r.size!==i.size)return!1;for(d=r.entries();!(o=d.next()).done;)if(!i.has(o.value[0]))return!1;for(d=r.entries();!(o=d.next()).done;)if(!Ue(o.value[1],i.get(o.value[0])))return!1;return!0}if(No&&r instanceof Set&&i instanceof Set){if(r.size!==i.size)return!1;for(d=r.entries();!(o=d.next()).done;)if(!i.has(o.value[0]))return!1;return!0}if(Ro&&ArrayBuffer.isView(r)&&ArrayBuffer.isView(i)){if(t=r.length,t!=i.length)return!1;for(o=t;o--!==0;)if(r[o]!==i[o])return!1;return!0}if(r.constructor===RegExp)return r.source===i.source&&r.flags===i.flags;if(r.valueOf!==Object.prototype.valueOf&&typeof r.valueOf=="function"&&typeof i.valueOf=="function")return r.valueOf()===i.valueOf();if(r.toString!==Object.prototype.toString&&typeof r.toString=="function"&&typeof i.toString=="function")return r.toString()===i.toString();if(a=Object.keys(r),t=a.length,t!==Object.keys(i).length)return!1;for(o=t;o--!==0;)if(!Object.prototype.hasOwnProperty.call(i,a[o]))return!1;if(Eo&&r instanceof Element)return!1;for(o=t;o--!==0;)if(!((a[o]==="_owner"||a[o]==="__v"||a[o]==="__o")&&r.$$typeof)&&!Ue(r[a[o]],i[a[o]]))return!1;return!0}return r!==r&&i!==i}var Mo=function(i,t){try{return Ue(i,t)}catch(o){if((o.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw o}};const Po=Sr(Mo);var Io=function(r,i,t,o,a,d,s,p){if(!r){var c;if(i===void 0)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var m=[t,o,a,d,s,p],g=0;c=new Error(i.replace(/%s/g,function(){return m[g++]})),c.name="Invariant Violation"}throw c.framesToPop=1,c}},Lo=Io;const ut=Sr(Lo);var Oo=function(i,t,o,a){var d=o?o.call(a,i,t):void 0;if(d!==void 0)return!!d;if(i===t)return!0;if(typeof i!="object"||!i||typeof t!="object"||!t)return!1;var s=Object.keys(i),p=Object.keys(t);if(s.length!==p.length)return!1;for(var c=Object.prototype.hasOwnProperty.bind(t),m=0;m<s.length;m++){var g=s[m];if(!c(g))return!1;var h=i[g],k=t[g];if(d=o?o.call(a,h,k,g):void 0,d===!1||d===void 0&&h!==k)return!1}return!0};const Do=Sr(Oo);var Lt=(r=>(r.BASE="base",r.BODY="body",r.HEAD="head",r.HTML="html",r.LINK="link",r.META="meta",r.NOSCRIPT="noscript",r.SCRIPT="script",r.STYLE="style",r.TITLE="title",r.FRAGMENT="Symbol(react.fragment)",r))(Lt||{}),fr={link:{rel:["amphtml","canonical","alternate"]},script:{type:["application/ld+json"]},meta:{charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]}},mt=Object.values(Lt),Ar={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},qo=Object.entries(Ar).reduce((r,[i,t])=>(r[t]=i,r),{}),J="data-rh",ve={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate",PRIORITIZE_SEO_TAGS:"prioritizeSeoTags"},ye=(r,i)=>{for(let t=r.length-1;t>=0;t-=1){const o=r[t];if(Object.prototype.hasOwnProperty.call(o,i))return o[i]}return null},Bo=r=>{let i=ye(r,"title");const t=ye(r,ve.TITLE_TEMPLATE);if(Array.isArray(i)&&(i=i.join("")),t&&i)return t.replace(/%s/g,()=>i);const o=ye(r,ve.DEFAULT_TITLE);return i||o||void 0},Fo=r=>ye(r,ve.ON_CHANGE_CLIENT_STATE)||(()=>{}),ur=(r,i)=>i.filter(t=>typeof t[r]<"u").map(t=>t[r]).reduce((t,o)=>({...t,...o}),{}),Yo=(r,i)=>i.filter(t=>typeof t.base<"u").map(t=>t.base).reverse().reduce((t,o)=>{if(!t.length){const a=Object.keys(o);for(let d=0;d<a.length;d+=1){const p=a[d].toLowerCase();if(r.indexOf(p)!==-1&&o[p])return t.concat(o)}}return t},[]),$o=r=>console&&typeof console.warn=="function"&&console.warn(r),Ae=(r,i,t)=>{const o={};return t.filter(a=>Array.isArray(a[r])?!0:(typeof a[r]<"u"&&$o(`Helmet: ${r} should be of type "Array". Instead found type "${typeof a[r]}"`),!1)).map(a=>a[r]).reverse().reduce((a,d)=>{const s={};d.filter(c=>{let m;const g=Object.keys(c);for(let k=0;k<g.length;k+=1){const v=g[k],z=v.toLowerCase();i.indexOf(z)!==-1&&!(m==="rel"&&c[m].toLowerCase()==="canonical")&&!(z==="rel"&&c[z].toLowerCase()==="stylesheet")&&(m=z),i.indexOf(v)!==-1&&(v==="innerHTML"||v==="cssText"||v==="itemprop")&&(m=v)}if(!m||!c[m])return!1;const h=c[m].toLowerCase();return o[m]||(o[m]={}),s[m]||(s[m]={}),o[m][h]?!1:(s[m][h]=!0,!0)}).reverse().forEach(c=>a.push(c));const p=Object.keys(s);for(let c=0;c<p.length;c+=1){const m=p[c],g={...o[m],...s[m]};o[m]=g}return a},[]).reverse()},Uo=(r,i)=>{if(Array.isArray(r)&&r.length){for(let t=0;t<r.length;t+=1)if(r[t][i])return!0}return!1},Wo=r=>({baseTag:Yo(["href"],r),bodyAttributes:ur("bodyAttributes",r),defer:ye(r,ve.DEFER),encode:ye(r,ve.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:ur("htmlAttributes",r),linkTags:Ae("link",["rel","href"],r),metaTags:Ae("meta",["name","charset","http-equiv","property","itemprop"],r),noscriptTags:Ae("noscript",["innerHTML"],r),onChangeClientState:Fo(r),scriptTags:Ae("script",["src","innerHTML"],r),styleTags:Ae("style",["cssText"],r),title:Bo(r),titleAttributes:ur("titleAttributes",r),prioritizeSeoTags:Uo(r,ve.PRIORITIZE_SEO_TAGS)}),Ot=r=>Array.isArray(r)?r.join(""):r,Vo=(r,i)=>{const t=Object.keys(r);for(let o=0;o<t.length;o+=1)if(i[t[o]]&&i[t[o]].includes(r[t[o]]))return!0;return!1},mr=(r,i)=>Array.isArray(r)?r.reduce((t,o)=>(Vo(o,i)?t.priority.push(o):t.default.push(o),t),{priority:[],default:[]}):{default:r,priority:[]},gt=(r,i)=>({...r,[i]:void 0}),Ho=["noscript","script","style"],yr=(r,i=!0)=>i===!1?String(r):String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"),Dt=r=>Object.keys(r).reduce((i,t)=>{const o=typeof r[t]<"u"?`${t}="${r[t]}"`:`${t}`;return i?`${i} ${o}`:o},""),Xo=(r,i,t,o)=>{const a=Dt(t),d=Ot(i);return a?`<${r} ${J}="true" ${a}>${yr(d,o)}</${r}>`:`<${r} ${J}="true">${yr(d,o)}</${r}>`},Jo=(r,i,t=!0)=>i.reduce((o,a)=>{const d=a,s=Object.keys(d).filter(m=>!(m==="innerHTML"||m==="cssText")).reduce((m,g)=>{const h=typeof d[g]>"u"?g:`${g}="${yr(d[g],t)}"`;return m?`${m} ${h}`:h},""),p=d.innerHTML||d.cssText||"",c=Ho.indexOf(r)===-1;return`${o}<${r} ${J}="true" ${s}${c?"/>":`>${p}</${r}>`}`},""),qt=(r,i={})=>Object.keys(r).reduce((t,o)=>{const a=Ar[o];return t[a||o]=r[o],t},i),Go=(r,i,t)=>{const o={key:i,[J]:!0},a=qt(t,o);return[ee.createElement("title",a,i)]},We=(r,i)=>i.map((t,o)=>{const a={key:o,[J]:!0};return Object.keys(t).forEach(d=>{const p=Ar[d]||d;if(p==="innerHTML"||p==="cssText"){const c=t.innerHTML||t.cssText;a.dangerouslySetInnerHTML={__html:c}}else a[p]=t[d]}),ee.createElement(r,a)}),W=(r,i,t=!0)=>{switch(r){case"title":return{toComponent:()=>Go(r,i.title,i.titleAttributes),toString:()=>Xo(r,i.title,i.titleAttributes,t)};case"bodyAttributes":case"htmlAttributes":return{toComponent:()=>qt(i),toString:()=>Dt(i)};default:return{toComponent:()=>We(r,i),toString:()=>Jo(r,i,t)}}},Ko=({metaTags:r,linkTags:i,scriptTags:t,encode:o})=>{const a=mr(r,fr.meta),d=mr(i,fr.link),s=mr(t,fr.script);return{priorityMethods:{toComponent:()=>[...We("meta",a.priority),...We("link",d.priority),...We("script",s.priority)],toString:()=>`${W("meta",a.priority,o)} ${W("link",d.priority,o)} ${W("script",s.priority,o)}`},metaTags:a.default,linkTags:d.default,scriptTags:s.default}},Qo=r=>{const{baseTag:i,bodyAttributes:t,encode:o=!0,htmlAttributes:a,noscriptTags:d,styleTags:s,title:p="",titleAttributes:c,prioritizeSeoTags:m}=r;let{linkTags:g,metaTags:h,scriptTags:k}=r,v={toComponent:()=>{},toString:()=>""};return m&&({priorityMethods:v,linkTags:g,metaTags:h,scriptTags:k}=Ko(r)),{priority:v,base:W("base",i,o),bodyAttributes:W("bodyAttributes",t,o),htmlAttributes:W("htmlAttributes",a,o),link:W("link",g,o),meta:W("meta",h,o),noscript:W("noscript",d,o),script:W("script",k,o),style:W("style",s,o),title:W("title",{title:p,titleAttributes:c},o)}},wr=Qo,Ye=[],Bt=!!(typeof window<"u"&&window.document&&window.document.createElement),kr=class{constructor(r,i){Z(this,"instances",[]);Z(this,"canUseDOM",Bt);Z(this,"context");Z(this,"value",{setHelmet:r=>{this.context.helmet=r},helmetInstances:{get:()=>this.canUseDOM?Ye:this.instances,add:r=>{(this.canUseDOM?Ye:this.instances).push(r)},remove:r=>{const i=(this.canUseDOM?Ye:this.instances).indexOf(r);(this.canUseDOM?Ye:this.instances).splice(i,1)}}});this.context=r,this.canUseDOM=i||!1,i||(r.helmet=wr({baseTag:[],bodyAttributes:{},htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}},Zo={},Ft=ee.createContext(Zo),de,Yt=(de=class extends l.Component{constructor(t){super(t);Z(this,"helmetData");this.helmetData=new kr(this.props.context||{},de.canUseDOM)}render(){return ee.createElement(Ft.Provider,{value:this.helmetData.value},this.props.children)}},Z(de,"canUseDOM",Bt),de),be=(r,i)=>{const t=document.head||document.querySelector("head"),o=t.querySelectorAll(`${r}[${J}]`),a=[].slice.call(o),d=[];let s;return i&&i.length&&i.forEach(p=>{const c=document.createElement(r);for(const m in p)if(Object.prototype.hasOwnProperty.call(p,m))if(m==="innerHTML")c.innerHTML=p.innerHTML;else if(m==="cssText")c.styleSheet?c.styleSheet.cssText=p.cssText:c.appendChild(document.createTextNode(p.cssText));else{const g=m,h=typeof p[g]>"u"?"":p[g];c.setAttribute(m,h)}c.setAttribute(J,"true"),a.some((m,g)=>(s=g,c.isEqualNode(m)))?a.splice(s,1):d.push(c)}),a.forEach(p=>{var c;return(c=p.parentNode)==null?void 0:c.removeChild(p)}),d.forEach(p=>t.appendChild(p)),{oldTags:a,newTags:d}},jr=(r,i)=>{const t=document.getElementsByTagName(r)[0];if(!t)return;const o=t.getAttribute(J),a=o?o.split(","):[],d=[...a],s=Object.keys(i);for(const p of s){const c=i[p]||"";t.getAttribute(p)!==c&&t.setAttribute(p,c),a.indexOf(p)===-1&&a.push(p);const m=d.indexOf(p);m!==-1&&d.splice(m,1)}for(let p=d.length-1;p>=0;p-=1)t.removeAttribute(d[p]);a.length===d.length?t.removeAttribute(J):t.getAttribute(J)!==s.join(",")&&t.setAttribute(J,s.join(","))},ea=(r,i)=>{typeof r<"u"&&document.title!==r&&(document.title=Ot(r)),jr("title",i)},xt=(r,i)=>{const{baseTag:t,bodyAttributes:o,htmlAttributes:a,linkTags:d,metaTags:s,noscriptTags:p,onChangeClientState:c,scriptTags:m,styleTags:g,title:h,titleAttributes:k}=r;jr("body",o),jr("html",a),ea(h,k);const v={baseTag:be("base",t),linkTags:be("link",d),metaTags:be("meta",s),noscriptTags:be("noscript",p),scriptTags:be("script",m),styleTags:be("style",g)},z={},w={};Object.keys(v).forEach(f=>{const{newTags:b,oldTags:y}=v[f];b.length&&(z[f]=b),y.length&&(w[f]=v[f].oldTags)}),i&&i(),c(r,z,w)},Ne=null,ra=r=>{Ne&&cancelAnimationFrame(Ne),r.defer?Ne=requestAnimationFrame(()=>{xt(r,()=>{Ne=null})}):(xt(r),Ne=null)},ta=ra,ht=class extends l.Component{constructor(){super(...arguments);Z(this,"rendered",!1)}shouldComponentUpdate(i){return!Do(i,this.props)}componentDidUpdate(){this.emitChange()}componentWillUnmount(){const{helmetInstances:i}=this.props.context;i.remove(this),this.emitChange()}emitChange(){const{helmetInstances:i,setHelmet:t}=this.props.context;let o=null;const a=Wo(i.get().map(d=>{const s={...d.props};return delete s.context,s}));Yt.canUseDOM?ta(a):wr&&(o=wr(a)),t(o)}init(){if(this.rendered)return;this.rendered=!0;const{helmetInstances:i}=this.props.context;i.add(this),this.emitChange()}render(){return this.init(),null}},hr,ia=(hr=class extends l.Component{shouldComponentUpdate(r){return!Po(gt(this.props,"helmetData"),gt(r,"helmetData"))}mapNestedChildrenToProps(r,i){if(!i)return null;switch(r.type){case"script":case"noscript":return{innerHTML:i};case"style":return{cssText:i};default:throw new Error(`<${r.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`)}}flattenArrayTypeChildren(r,i,t,o){return{...i,[r.type]:[...i[r.type]||[],{...t,...this.mapNestedChildrenToProps(r,o)}]}}mapObjectTypeChildren(r,i,t,o){switch(r.type){case"title":return{...i,[r.type]:o,titleAttributes:{...t}};case"body":return{...i,bodyAttributes:{...t}};case"html":return{...i,htmlAttributes:{...t}};default:return{...i,[r.type]:{...t}}}}mapArrayTypeChildrenToProps(r,i){let t={...i};return Object.keys(r).forEach(o=>{t={...t,[o]:r[o]}}),t}warnOnInvalidChildren(r,i){return ut(mt.some(t=>r.type===t),typeof r.type=="function"?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${mt.join(", ")} are allowed. Helmet does not support rendering <${r.type}> elements. Refer to our API for more information.`),ut(!i||typeof i=="string"||Array.isArray(i)&&!i.some(t=>typeof t!="string"),`Helmet expects a string as a child of <${r.type}>. Did you forget to wrap your children in braces? ( <${r.type}>{\`\`}</${r.type}> ) Refer to our API for more information.`),!0}mapChildrenToProps(r,i){let t={};return ee.Children.forEach(r,o=>{if(!o||!o.props)return;const{children:a,...d}=o.props,s=Object.keys(d).reduce((c,m)=>(c[qo[m]||m]=d[m],c),{});let{type:p}=o;switch(typeof p=="symbol"?p=p.toString():this.warnOnInvalidChildren(o,a),p){case"Symbol(react.fragment)":i=this.mapChildrenToProps(a,i);break;case"link":case"meta":case"noscript":case"script":case"style":t=this.flattenArrayTypeChildren(o,t,s,a);break;default:i=this.mapObjectTypeChildren(o,i,s,a);break}}),this.mapArrayTypeChildrenToProps(t,i)}render(){const{children:r,...i}=this.props;let t={...i},{helmetData:o}=i;if(r&&(t=this.mapChildrenToProps(r,t)),o&&!(o instanceof kr)){const a=o;o=new kr(a.context,!0),delete t.helmetData}return o?ee.createElement(ht,{...t,context:o.value}):ee.createElement(Ft.Consumer,null,a=>ee.createElement(ht,{...t,context:a}))}},Z(hr,"defaultProps",{defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1}),hr);function oa({title:r,description:i,canonicalPath:t,robots:o="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",keywords:a,ogType:d="website",ogImage:s="https://www.yorix.cm/og-image.jpg",jsonLd:p=[],noindex:c=!1}){const m=`${oe}${t!=null&&t.startsWith("/")?t:`/${t||""}`}`.replace(/([^:]\/)\/+/g,"$1"),g=c?"noindex, nofollow":o,h=Array.isArray(p)?p.filter(Boolean):p?[p]:[];return e.jsxs(ia,{children:[e.jsx("html",{lang:"fr"}),e.jsx("title",{children:r}),e.jsx("meta",{name:"description",content:i}),a&&e.jsx("meta",{name:"keywords",content:a}),e.jsx("meta",{name:"robots",content:g}),e.jsx("link",{rel:"canonical",href:m}),e.jsx("link",{rel:"alternate",hrefLang:"fr-CM",href:m}),e.jsx("link",{rel:"alternate",hrefLang:"fr",href:m}),e.jsx("link",{rel:"alternate",hrefLang:"x-default",href:m}),e.jsx("meta",{property:"og:type",content:d}),e.jsx("meta",{property:"og:site_name",content:"Yorix CM"}),e.jsx("meta",{property:"og:title",content:r}),e.jsx("meta",{property:"og:description",content:i}),e.jsx("meta",{property:"og:url",content:m}),e.jsx("meta",{property:"og:image",content:s}),e.jsx("meta",{property:"og:image:width",content:"1200"}),e.jsx("meta",{property:"og:image:height",content:"630"}),e.jsx("meta",{property:"og:locale",content:"fr_FR"}),e.jsx("meta",{name:"twitter:card",content:"summary_large_image"}),e.jsx("meta",{name:"twitter:title",content:r}),e.jsx("meta",{name:"twitter:description",content:i}),e.jsx("meta",{name:"twitter:image",content:s}),h.map((k,v)=>e.jsx("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:typeof k=="string"?k:JSON.stringify(k)}},v))]})}function aa({items:r}){return r!=null&&r.length?e.jsx("nav",{"aria-label":"Fil d'Ariane",className:"seo-breadcrumb",children:e.jsx("ol",{style:{display:"flex",flexWrap:"wrap",gap:"6px 10px",alignItems:"center",listStyle:"none",margin:"0 0 16px",padding:0,fontSize:".78rem",color:"var(--gray)"},children:r.map((i,t)=>e.jsxs("li",{style:{display:"flex",alignItems:"center",gap:8},children:[t>0&&e.jsx("span",{"aria-hidden":"true",children:"/"}),i.href&&!i.current?e.jsx("a",{href:i.href,style:{color:"var(--green)",fontWeight:600},children:i.label}):e.jsx("span",{style:{color:i.current?"var(--ink)":"var(--gray)",fontWeight:i.current?700:500},children:i.label})]},i.href||t))})}):null}function bt({city:r,mode:i,goPage:t}){const o=(r==null?void 0:r.name)||"Cameroun",a=(r==null?void 0:r.slug)||"",d={hub:`Yorix à ${o} — marketplace, livraison & services`,acheter:`Acheter en ligne à ${o} — Yorix marketplace Cameroun`,livraison:`Livraison à ${o} — livreurs & colis au Cameroun`,prestataires:`Prestataires à ${o} — services à domicile vérifiés`},s={hub:`Yorix est une marketplace camerounaise : achetez en ligne à ${o}, faites-vous livrer rapidement et trouvez des prestataires vérifiés. Paiement MTN MoMo, Orange Money et protection Escrow.`,acheter:`Sur Yorix, l’achat en ligne à ${o} est simple : catalogue produits locaux et importés, vendeurs vérifiés, livraison suivie. Idéal pour votre shopping au Cameroun.`,livraison:`Notre service de livraison couvre ${o} et le réseau national : livreurs indépendants, suivi et tarifs transparents. Colis, courses, e-commerce — Yorix Ride.`,prestataires:`Trouvez des prestataires à ${o} : plomberie, électricité, ménage, beauté, BTP… profils vérifiés et réservation par WhatsApp.`},p=[{label:"Accueil",href:"/"},{label:d[i]||d.hub,current:!0}];return e.jsx("section",{className:"sec",style:{paddingBottom:8},children:e.jsxs("div",{style:{maxWidth:920,margin:"0 auto"},children:[e.jsx(aa,{items:p}),e.jsxs("header",{children:[e.jsx("h1",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.15rem, 2.5vw, 1.45rem)",color:"var(--ink)",margin:"0 0 12px",letterSpacing:"-.4px"},children:d[i]||d.hub}),e.jsx("p",{style:{fontSize:".88rem",color:"var(--gray)",lineHeight:1.75,margin:0},children:s[i]||s.hub})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:10,marginTop:18},children:[e.jsxs("button",{type:"button",className:"cta-w",style:{padding:"12px 14px",textAlign:"left",borderRadius:12,cursor:"pointer"},onClick:()=>a&&t("seoCity",{citySlug:a,mode:"acheter"}),children:[e.jsxs("strong",{style:{display:"block",marginBottom:4},children:["🛍️ Produits à ",o]}),e.jsx("span",{style:{fontSize:".76rem",opacity:.9},children:"Marketplace & catégories"})]}),e.jsxs("button",{type:"button",className:"cta-w",style:{padding:"12px 14px",textAlign:"left",borderRadius:12,cursor:"pointer"},onClick:()=>a&&t("seoCity",{citySlug:a,mode:"livraison"}),children:[e.jsx("strong",{style:{display:"block",marginBottom:4},children:"🚚 Livraison"}),e.jsx("span",{style:{fontSize:".76rem",opacity:.9},children:"Livreurs & délais"})]}),e.jsxs("button",{type:"button",className:"cta-w",style:{padding:"12px 14px",textAlign:"left",borderRadius:12,cursor:"pointer"},onClick:()=>a&&t("seoCity",{citySlug:a,mode:"prestataires"}),children:[e.jsx("strong",{style:{display:"block",marginBottom:4},children:"👷 Prestataires"}),e.jsx("span",{style:{fontSize:".76rem",opacity:.9},children:"Services à domicile"})]}),e.jsxs("button",{type:"button",className:"cta-w",style:{padding:"12px 14px",textAlign:"left",borderRadius:12,cursor:"pointer"},onClick:()=>t("business"),children:[e.jsx("strong",{style:{display:"block",marginBottom:4},children:"💼 Business"}),e.jsx("span",{style:{fontSize:".76rem",opacity:.9},children:"B2B & grossistes"})]})]})]})})}const na="https://msrymchhhxitdevthvdi.supabase.co",sa="sb_publishable_yJj7JNdn-r19Pjc070IOBg_y2VzGJXA",la=na,ca=sa,R=Ui(la,ca),Ve="237696565654",da="676935195",pa="696565654",fa="237696565654",ua="yorix_unsigned",vt=["Téléphones & HighTech","Mode & Accessoires","Alimentation","Maison & Decoration","Agricole","Beauté & Soins","BTP","Automobile","Éducation","Services"],ma=["Toutes les villes","Douala","Yaoundé","Bafoussam","Bamenda","Garoua","Kribi","Ngaoundéré","Maroua","Ebolowa","Buea","Bertoua"],yt={buyer:"🛍️ Acheteur",seller:"🏪 Vendeur",delivery:"🚚 Livreur",provider:"👷 Prestataire",admin:"🛡️ Administrateur"},En={pending:"⏳ En attente",en_cours:"🚚 En cours",livre:"✅ Livré",echec:"❌ Échoué"},An={pending:"⏳ En attente",securise:"🔐 Sécurisé",libere:"✅ Libéré",rembourse:"↩️ Remboursé"},ga=[{id:"p1",name:"Claude Mbassi",metier:"Plombier certifié",categorie:"Plomberie",ville:"Douala",quartier:"Akwa",emoji:"🔧",photo:"https://images.unsplash.com/photo-1620207418302-439b387441b0?w=400&q=80",color_bg:"linear-gradient(135deg, #dbeafe, #bfdbfe)",tags:["Plomberie","Sanitaire","Chauffe-eau"],note:4.9,avis:87,prix:"15 000 FCFA/h",experience:"8 ans",verifie:!0,top:!0,dispo:!0,bio:"Spécialiste en installations sanitaires et réparations d'urgence. Intervention rapide dans tout Douala. Devis gratuit.",telephone:"+237696565454",realisations:340},{id:"p2",name:"Électro Bertrand",metier:"Électricien",categorie:"Électricité",ville:"Yaoundé",quartier:"Bastos",emoji:"⚡",photo:"https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&q=80",color_bg:"linear-gradient(135deg, #fef3c7, #fde68a)",tags:["Électricité","Installation","Dépannage"],note:4.8,avis:124,prix:"12 000 FCFA/h",experience:"12 ans",verifie:!0,top:!0,dispo:!0,bio:"Installation électrique complète, mise aux normes, dépannage 24h/24. Travaux garantis 1 an.",telephone:"+237677884455",realisations:450},{id:"p3",name:"Raissa Design",metier:"Graphiste freelance",categorie:"Graphisme",ville:"Douala",quartier:"Bonanjo",emoji:"🎨",photo:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",color_bg:"linear-gradient(135deg, #fce7f3, #fbcfe8)",tags:["Logo","Flyer","Branding"],note:5,avis:56,prix:"25 000 FCFA/projet",experience:"5 ans",verifie:!0,top:!1,dispo:!0,bio:"Création d'identité visuelle, logos, flyers et supports print. Style moderne et africain contemporain.",telephone:"+237699001122",realisations:180},{id:"p4",name:"PhotoCam Pro",metier:"Photographe",categorie:"Photographie",ville:"Kribi",quartier:"Centre-ville",emoji:"📸",photo:"https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400&q=80",color_bg:"linear-gradient(135deg, #e0e7ff, #c7d2fe)",tags:["Mariage","Portrait","Événementiel"],note:4.9,avis:203,prix:"50 000 FCFA/jour",experience:"10 ans",verifie:!0,top:!0,dispo:!0,bio:"Photographe de mariage, portrait et événementiel. Studio équipé + déplacement partout au Cameroun.",telephone:"+237670223344",realisations:520},{id:"p5",name:"CleanPro237",metier:"Service de nettoyage",categorie:"Nettoyage",ville:"Douala",quartier:"Bonapriso",emoji:"🧹",photo:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",color_bg:"linear-gradient(135deg, #dcfce7, #bbf7d0)",tags:["Ménage","Bureaux","Grand nettoyage"],note:4.6,avis:312,prix:"8 000 FCFA/h",experience:"6 ans",verifie:!0,top:!1,dispo:!0,bio:"Nettoyage professionnel de maisons, bureaux et appartements. Produits écologiques. Équipe formée.",telephone:"+237655112233",realisations:890},{id:"p6",name:"DevCam Tech",metier:"Développeur Web",categorie:"Informatique",ville:"Yaoundé",quartier:"Nlongkak",emoji:"💻",photo:"https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80",color_bg:"linear-gradient(135deg, #cffafe, #a5f3fc)",tags:["Site web","App","E-commerce"],note:4.8,avis:41,prix:"200 000 FCFA/projet",experience:"7 ans",verifie:!0,top:!0,dispo:!0,bio:"Création de sites web, applications mobiles et boutiques en ligne. Technologies React, Next.js, React Native.",telephone:"+237690112233",realisations:95},{id:"p7",name:"Kouakou Menuiserie",metier:"Menuisier ébéniste",categorie:"Menuiserie",ville:"Bafoussam",quartier:"Tamdja",emoji:"🪚",photo:"https://images.unsplash.com/photo-1513467655676-561b7d489a88?w=400&q=80",color_bg:"linear-gradient(135deg, #fed7aa, #fdba74)",tags:["Meubles","Placards","Sur-mesure"],note:4.7,avis:156,prix:"À partir de 50 000 FCFA",experience:"15 ans",verifie:!0,top:!1,dispo:!0,bio:"Menuiserie traditionnelle et moderne. Fabrication de meubles sur-mesure, placards, portes et fenêtres.",telephone:"+237677445566",realisations:420},{id:"p8",name:"Chef Marguerite",metier:"Cuisinière événementielle",categorie:"Cuisine",ville:"Douala",quartier:"Logbessou",emoji:"👩‍🍳",photo:"https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80",color_bg:"linear-gradient(135deg, #fecaca, #fca5a5)",tags:["Traiteur","Mariages","Cuisine locale"],note:4.9,avis:178,prix:"3 500 FCFA/pers.",experience:"20 ans",verifie:!0,top:!0,dispo:!0,bio:"Traiteur spécialisé cuisine camerounaise et internationale. Ndolé, Poulet DG, Eru... pour mariages et événements.",telephone:"+237699778899",realisations:260},{id:"p9",name:"Beauté by Sandra",metier:"Coiffeuse à domicile",categorie:"Beauté",ville:"Yaoundé",quartier:"Mvan",emoji:"💇‍♀️",photo:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",color_bg:"linear-gradient(135deg, #fbcfe8, #f9a8d4)",tags:["Tresses","Coloration","Soins"],note:5,avis:89,prix:"10 000 FCFA/prest.",experience:"6 ans",verifie:!0,top:!1,dispo:!0,bio:"Coiffure à domicile : tresses africaines, mèches, coloration, soins capillaires. Je me déplace partout à Yaoundé.",telephone:"+237651223344",realisations:340}],Nn=[{id:1,slug:"vendre-en-ligne-cameroun-2026",title:"Comment vendre en ligne au Cameroun en 2026 : le guide complet",excerpt:"Stratégies concrètes pour lancer ton business e-commerce au Cameroun : choix des produits, marketing WhatsApp, paiement mobile, logistique locale.",cat:"BUSINESS",emoji:"📈",color_bg:"linear-gradient(135deg, #dbeafe, #bfdbfe)",image:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",date:"15 avril 2026",read:"8 min",author:"Équipe Yorix",author_avatar:"Y",featured:!0,external_url:"https://www.journalducameroun.com/e-commerce-au-cameroun-un-marche-en-pleine-expansion/",tags:["E-commerce","Cameroun","Business"]},{id:2,slug:"produits-camerounais-plus-vendus",title:"Les 10 produits camerounais les plus vendus en ligne",excerpt:"Beurre de karité, pagne wax, cacao, miel de Oku, poivre de Penja... Découvre les produits locaux qui cartonnent à l'international.",cat:"LOCAL",emoji:"🌿",color_bg:"linear-gradient(135deg, #dcfce7, #bbf7d0)",image:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",date:"12 avril 2026",read:"6 min",author:"Marie Tchoumi",author_avatar:"M",featured:!1,external_url:"https://www.investiraucameroun.com/agriculture",tags:["Produits locaux","Export","Artisanat"]},{id:3,slug:"mtn-momo-vs-orange-money",title:"MTN MoMo vs Orange Money : quel système de paiement choisir ?",excerpt:"Comparatif détaillé des deux géants du mobile money au Cameroun : frais, limites, sécurité, intégration marchande et expérience utilisateur.",cat:"PAIEMENT",emoji:"💳",color_bg:"linear-gradient(135deg, #fef3c7, #fde68a)",image:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",date:"10 avril 2026",read:"7 min",author:"Jean-Paul Essomba",author_avatar:"J",featured:!1,external_url:"https://www.gsma.com/mobilefordevelopment/mobile-money/",tags:["MoMo","Orange Money","Fintech"]},{id:4,slug:"suivi-commande-temps-reel",title:"Suivi de commande en temps réel : comment ça marche chez Yorix",excerpt:"Découvre notre système de tracking GPS inspiré d'Uber : de la collecte chez le vendeur jusqu'à ta porte, tu vois tout en direct.",cat:"LIVRAISON",emoji:"🚚",color_bg:"linear-gradient(135deg, #fed7aa, #fdba74)",image:"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",date:"8 avril 2026",read:"5 min",author:"Équipe Yorix Ride",author_avatar:"R",featured:!1,external_url:"https://www.uber.com/fr/newsroom/",tags:["Livraison","GPS","Technologie"]},{id:5,slug:"escrow-protection-acheteur",title:"Escrow Yorix : pourquoi ton argent est 100% protégé",excerpt:"Comprends en 5 minutes le système Escrow : ton paiement reste bloqué jusqu'à la livraison confirmée. Zéro arnaque, zéro stress.",cat:"SÉCURITÉ",emoji:"🔐",color_bg:"linear-gradient(135deg, #e9d5ff, #d8b4fe)",image:"https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",date:"5 avril 2026",read:"4 min",author:"Équipe Sécurité",author_avatar:"S",featured:!1,external_url:"https://en.wikipedia.org/wiki/Escrow",tags:["Escrow","Sécurité","Paiement"]},{id:6,slug:"electricien-fiable-douala",title:"Comment trouver un électricien fiable à Douala en 2026",excerpt:"Check-list complète : vérifier les qualifications, demander un devis, évaluer les avis, éviter les arnaques courantes dans le BTP camerounais.",cat:"PRESTATAIRES",emoji:"⚡",color_bg:"linear-gradient(135deg, #fecaca, #fca5a5)",image:"https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",date:"2 avril 2026",read:"6 min",author:"Service Prestataires",author_avatar:"P",featured:!1,external_url:"https://www.cameroon-tribune.cm/",tags:["BTP","Douala","Prestataires"]},{id:7,slug:"pagne-wax-histoire-tendances",title:"Le pagne wax camerounais : histoire, tendances et où acheter",excerpt:"Du marché de Mokolo aux défilés internationaux, le pagne wax conquiert le monde. Guide complet pour reconnaître un vrai pagne de qualité.",cat:"MODE",emoji:"👗",color_bg:"linear-gradient(135deg, #fce7f3, #fbcfe8)",image:"https://images.unsplash.com/photo-1617627191894-1c9e59f7a4ab?w=800&q=80",date:"28 mars 2026",read:"9 min",author:"Fatima Abakar",author_avatar:"F",featured:!1,external_url:"https://www.vogue.fr/mode/article/wax-pagne-africain-histoire",tags:["Mode","Pagne","Culture"]},{id:8,slug:"devenir-livreur-yorix",title:"Devenir livreur Yorix : gagne jusqu'à 150 000 FCFA/mois",excerpt:"Témoignages de livreurs actifs à Yaoundé et Douala, processus d'inscription, revenus réels et conseils pour maximiser tes gains.",cat:"CARRIÈRE",emoji:"🏍️",color_bg:"linear-gradient(135deg, #cffafe, #a5f3fc)",image:"https://images.unsplash.com/photo-1558383331-f520f2888351?w=800&q=80",date:"25 mars 2026",read:"7 min",author:"Équipe Yorix Ride",author_avatar:"R",featured:!1,external_url:"https://www.cameroon-info.net/",tags:["Emploi","Livraison","Revenus"]},{id:9,slug:"fiscalite-vendeurs-cameroun",title:"Fiscalité des vendeurs en ligne au Cameroun : ce qu'il faut savoir",excerpt:"TVA, impôt sur le revenu, patente : toutes les obligations fiscales d'un e-commerçant camerounais expliquées simplement.",cat:"BUSINESS",emoji:"📊",color_bg:"linear-gradient(135deg, #dbeafe, #bfdbfe)",image:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",date:"22 mars 2026",read:"10 min",author:"Expert Comptable",author_avatar:"E",featured:!1,external_url:"https://www.impots.cm/",tags:["Fiscalité","Impôts","Business"]}],Rn=[{icon:"🎁",name:"Bon 5 000 FCFA",pts:500},{icon:"🚚",name:"Livraison gratuite x3",pts:300},{icon:"⭐",name:"Statut VIP Yorix",pts:1e3},{icon:"📱",name:"-20% téléphones",pts:400},{icon:"☕",name:"Pack café 500g",pts:200},{icon:"🎓",name:"Cours Academy offert",pts:350}];function He(r,i={}){if(!r||typeof r!="string"||!r.includes("cloudinary.com"))return r;const{width:t=400,quality:o="auto:low",format:a="auto",dpr:d="auto"}=i;if(r.includes("/w_")||r.includes("/q_"))return r;const s=[`w_${t}`,`q_${o}`,`f_${a}`,`dpr_${d}`,"c_limit"].join(",");return r.replace(/\/upload\//,`/upload/${s}/`)}function Mn(r){return!r||!r.includes("cloudinary.com")?"":[`${He(r,{width:400})} 400w`,`${He(r,{width:800})} 800w`,`${He(r,{width:1200})} 1200w`].join(", ")}function Pn(r){return!r||!r.includes("cloudinary.com")?"":He(r,{width:20,quality:"auto:low"})}async function In(r){const i=new FormData;i.append("file",r),i.append("upload_preset",ua);const o=await(await fetch("https://api.cloudinary.com/v1_1/dulwb03nf/image/upload",{method:"POST",body:i})).json();if(o.error)throw new Error(o.error.message);return o.secure_url}async function xa(r){const{data:i,error:t}=await R.from("profiles").select("*").eq("id",r).maybeSingle();return t?(console.error("getUserProfile ERROR:",t),null):i}function ha(r){const i=["buyer","seller","delivery","provider","admin"],t=r==null?void 0:r.role;return t==="superadmin"?"admin":t&&i.includes(t)?t:"buyer"}const ba=[/(\+?237[\s\-]?[0-9]{8,9})/g,/(\+?[0-9]{1,3}[\s\-]?[0-9]{9,10})/g,/(whatsapp|wa\.me|t\.me|telegram)/gi,/([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g,/(facebook\.com|instagram\.com)/gi];function va(r){return ba.some(i=>new RegExp(i.source,i.flags).test(r))?{bloque:!0}:{bloque:!1}}const ya="https://msrymchhhxitdevthvdi.supabase.co/functions/v1/send-email";async function wa({to:r,subject:i,html:t,from:o}){try{const a=await fetch(ya,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({to:r,subject:i,html:t,from:o})}),d=await a.json();return a.ok?{success:!0,id:d.id}:(console.error("sendEmail error:",d),{success:!1,error:d.error})}catch(a){return console.error("sendEmail exception:",a),{success:!1,error:a.message}}}function ka(r,i){return`
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f5f1e8;padding:0">
      <div style="background:linear-gradient(135deg,#1a6b3a,#0d4a25);padding:24px 32px;text-align:center">
        <h1 style="color:#fff;margin:0;font-size:28px;letter-spacing:-.5px">Yo<span style="color:#fcd116">rix</span> CM</h1>
        <p style="color:rgba(255,255,255,.8);margin:4px 0 0;font-size:13px">Marketplace du Cameroun 🇨🇲</p>
      </div>
      <div style="background:#fff;padding:32px;border-left:1px solid #e2ddd6;border-right:1px solid #e2ddd6">
        <h2 style="color:#1a6b3a;margin:0 0 16px;font-size:20px">${r}</h2>
        ${i}
      </div>
      <div style="background:#0d1f14;padding:20px 32px;text-align:center;color:rgba(255,255,255,.6);font-size:12px">
        <p style="margin:0 0 8px"><strong style="color:#fff">Yorix CM</strong> — RC DOUALA/2026/B237</p>
        <p style="margin:0">📱 +237 696 56 56 54 · ✉️ support@yorix.cm · 🌐 <a href="https://www.yorix.cm" style="color:#4fd17d">yorix.cm</a></p>
        <p style="margin:12px 0 0;font-size:11px;opacity:.5">Vous recevez cet email car vous êtes utilisateur de Yorix CM.</p>
      </div>
    </div>
  `}function ja(r,i="client"){const o={buyer:"acheteur",seller:"vendeur",delivery:"livreur",provider:"prestataire",client:"client"}[i]||"client";return ka(`Bienvenue sur Yorix, ${r} ! 🎉`,`
      <p style="font-size:15px;line-height:1.7;color:#0d1f14">Nous sommes ravis de vous compter parmi nos <strong>${o}s</strong> sur Yorix CM, la marketplace camerounaise #1.</p>
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
    `)}const Sa=r=>`
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --ink:${r?"#e8f0eb":"#0d1f14"};
  --green:#1a6b3a;--green-mid:#27a85a;--green-light:#4fd17d;
  --green-pale:${r?"#1a3a24":"#c8f5d9"};
  --red:#ce1126;--yellow:#fcd116;--gold:#c9a84c;
  --wa:#25D366;
  --bg:${r?"#0d1a12":"#f5f2ed"};
  --surface:${r?"#152118":"#ffffff"};
  --surface2:${r?"#1c2e22":"#f0ece6"};
  --sand:${r?"#1a2e1e":"#ede8df"};
  --border:${r?"#2a4030":"#e2ddd6"};
  --gray:${r?"#7a9a82":"#6b7a72"};
  --shadow:${r?"rgba(0,0,0,.45)":"rgba(0,0,0,.08)"};
}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--ink);transition:background .3s,color .3s;}

/* TOPBAR */
.topbar{background:${r?"#0a1410":"#0d1f14"};padding:5px 24px;display:flex;align-items:center;justify-content:space-between;font-size:.71rem;color:rgba(255,255,255,.44);}
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
.nav-search{flex:1;max-width:440px;display:flex;background:var(--surface2);border:1.5px solid var(--border);border-radius:10px;overflow:hidden;transition:border-color .2s;}
.nav-search:focus-within{border-color:var(--green-mid);}
.nav-search select{border:none;border-right:1px solid var(--border);background:var(--sand);padding:9px 8px;font-family:'DM Sans',sans-serif;font-size:.76rem;color:var(--gray);outline:none;min-width:90px;}
.nav-search input{flex:1;border:none;background:transparent;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:.82rem;outline:none;color:var(--ink);}
.nav-search input::placeholder{color:var(--gray);}
.nav-search button{background:var(--green);color:#fff;border:none;padding:0 13px;cursor:pointer;font-size:1rem;}
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
.nav-quick-panel{position:absolute;top:calc(100% + 6px);right:0;background:var(--surface);border-radius:14px;border:1px solid var(--border);box-shadow:0 14px 40px var(--shadow);min-width:min(340px,calc(100vw - 32px));z-index:500;padding:14px;display:grid;gap:14px;}
.nav-quick-panel[hidden]{display:none!important;}
.nav-quick-section h4{font-family:'Syne',sans-serif;font-size:.68rem;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:var(--gray);margin:0 0 8px;}
.nav-quick-links{display:flex;flex-wrap:wrap;gap:6px;}
.nav-quick-links button{border:none;background:var(--surface2);color:var(--ink);padding:7px 10px;border-radius:8px;font-size:.72rem;font-weight:600;cursor:pointer;}
.nav-quick-links button:hover{background:var(--green-pale);color:var(--green);}

.admin-quick-pill{position:fixed;bottom:calc(92px + env(safe-area-inset-bottom));right:max(14px,env(safe-area-inset-right));z-index:510;background:linear-gradient(135deg,#0d1f14,var(--green));color:#fff;border:none;padding:11px 16px;border-radius:50px;font-size:.74rem;font-weight:800;font-family:'Syne',sans-serif;cursor:pointer;box-shadow:0 8px 24px rgba(26,107,58,.38);transition:transform .15s;display:flex;align-items:center;gap:6px;}
.admin-quick-pill:hover{transform:translateY(-2px);}
@media (min-width:901px){.admin-quick-pill{bottom:24px;right:24px;}}


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
.sec-title{font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:800;color:var(--ink);letter-spacing:-.5px;}
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
.trust{background:${r?"#0a1410":"#0d1f14"};padding:18px 24px;}
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

.checkout-form-card{padding:16px;}
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
  border-radius:10px;
  padding:12px;
}
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

/* WA FLOAT */
.wa-float{position:fixed;bottom:20px;right:20px;z-index:480;display:flex;flex-direction:column;align-items:flex-end;gap:8px;}
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
.admin-sidebar{width:220px;background:${r?"#060d09":"#0a1a10"};color:#fff;padding:20px 0;flex-shrink:0;position:sticky;top:0;height:100vh;overflow-y:auto;}
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
.admin-sidebar{width:220px;background:${r?"#060d09":"#0a1a10"};color:#fff;padding:20px 0;flex-shrink:0;}
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
.footer{background:${r?"#060d09":"#0a1a10"};color:rgba(255,255,255,.44);padding:34px 24px 18px;margin-top:32px;}
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
.trust-banner{background:${r?"#0f1f16":"#f0faf4"};border-bottom:1px solid ${r?"#2a4030":"#c8f0d8"};padding:8px 20px;display:flex;align-items:center;justify-content:center;gap:20px;flex-wrap:wrap;}
.tb-item{display:flex;align-items:center;gap:5px;font-size:.72rem;font-weight:600;color:${r?"#7aca94":"#1a6b3a"};}

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
.why-section{background:${r?"#0f1a14":"#f8fbf9"};border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:28px 24px;}
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
  .footer-grid{grid-template-columns:1fr 1fr;}
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
  .wa-float{bottom:100px;}
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
.yorix-bc{margin:0 0 16px;}
.yorix-bc__list{display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px;list-style:none;padding:0;margin:0;font-size:.72rem;}
.yorix-bc__item{display:inline-flex;align-items:center;gap:6px;}
.yorix-bc__link,.yorix-bc__current{font-family:'DM Sans',sans-serif;font-size:.72rem;}
.yorix-bc__link{background:none;border:none;padding:0;color:var(--green);font-weight:600;cursor:pointer;text-decoration:underline;text-underline-offset:2px;}
.yorix-bc__link:hover{color:var(--green-mid);}
.yorix-bc__current{color:var(--gray);font-weight:600;cursor:default;text-decoration:none;}
.yorix-bc__sep{color:var(--border);font-weight:400;user-select:none;}

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
.yorix-panel--buy{border-left:4px solid #1565c0;background:${r?"#151d24":"linear-gradient(180deg,#fafdff 0%,var(--surface) 100%)"};}
.yorix-panel--sell{border-left:4px solid var(--green);background:${r?"#151f18":"linear-gradient(180deg,#f4fff8 0%,var(--surface) 100%)"};}
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

`;function Ca({user:r,userData:i,onClose:t,onSuccess:o}){const[a,d]=l.useState(1),[s,p]=l.useState({nom:(i==null?void 0:i.nom)||"",telephone:(i==null?void 0:i.telephone)||"",adresse_collecte:"",adresse_livraison:"",ville:(i==null?void 0:i.ville)||"Douala",colis_description:"",vehicule:"Moto",budget:"",urgence:"normal"}),[c,m]=l.useState({}),[g,h]=l.useState(!1),[k,v]=l.useState(""),z=()=>{const f={};return s.nom.trim()||(f.nom="Nom obligatoire"),s.telephone.trim()||(f.telephone="Téléphone obligatoire"),s.adresse_collecte.trim()||(f.adresse_collecte="Adresse de collecte obligatoire"),s.adresse_livraison.trim()||(f.adresse_livraison="Adresse de livraison obligatoire"),s.colis_description.trim()||(f.colis_description="Description du colis obligatoire"),m(f),Object.keys(f).length===0},w=async()=>{if(z()){h(!0);try{const f=Math.random().toString(36).substring(2,7).toUpperCase(),b=Date.now().toString(36).slice(-3).toUpperCase(),y="YX-"+f+b,{data:M,error:E}=await R.from("deliveries").insert({code_suivi:y,client_nom:s.nom,client_tel:s.telephone,adresse_collecte:s.adresse_collecte,adresse_livraison:s.adresse_livraison,statut:"commande_recue",livreur_vehicule:s.vehicule,distance_km:3.5,temps_estime_min:s.urgence==="urgent"?20:s.urgence==="express"?15:40,commande_at:new Date().toISOString()}).select().single();if(E)throw E;const q={normal:"🟢 Normal (30-60 min)",urgent:"🟠 Urgent (15-30 min)",express:"🔴 Express (< 15 min)"},T=["🚚 *NOUVELLE DEMANDE DE LIVRAISON YORIX*","","📦 *CODE DE SUIVI : "+y+"*","","👤 *CLIENT*","Nom : "+s.nom,"Téléphone : "+s.telephone,"Ville : "+s.ville,"","📍 *TRAJET*","🔴 Collecte : "+s.adresse_collecte,"🟢 Livraison : "+s.adresse_livraison,"","📦 *COLIS*","Description : "+s.colis_description,"Véhicule : "+s.vehicule,"Urgence : "+(q[s.urgence]||s.urgence),s.budget?"Budget proposé : "+s.budget+" FCFA":"Budget : À définir","","✅ *ACTIONS À FAIRE*","1. Assigner un livreur disponible","2. Confirmer le prix au client","3. Le client suit sa livraison sur yorix.cm/livraison avec le code "+y,"","Merci Yorix ! 🇨🇲"].join(`
`),I="https://wa.me/"+Ve+"?text="+encodeURIComponent(T);window.open(I,"_blank"),v(y),d(2),o==null||o(y)}catch(f){console.error("ModalDemandeLivraison:",f),alert("Erreur : "+f.message)}h(!1)}};return a===2?e.jsx("div",{className:"modal-overlay",onClick:f=>f.target===f.currentTarget&&t(),children:e.jsxs("div",{className:"modal",style:{maxWidth:480,textAlign:"center"},children:[e.jsx("button",{className:"modal-close",onClick:t,children:"✕"}),e.jsx("div",{style:{fontSize:"4rem",marginBottom:12},children:"🎉"}),e.jsx("h2",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.4rem",color:"var(--green)",marginBottom:8,letterSpacing:"-.3px"},children:"Demande envoyée !"}),e.jsxs("p",{style:{fontSize:".88rem",color:"var(--gray)",lineHeight:1.7,marginBottom:20},children:["Notre équipe va assigner un livreur et vous recontacter dans les ",e.jsx("strong",{children:"5 minutes"})," pour confirmer."]}),e.jsxs("div",{style:{background:"linear-gradient(135deg, var(--green-pale), #fef9e0)",border:"2px dashed var(--green)",borderRadius:12,padding:18,marginBottom:18},children:[e.jsx("div",{style:{fontSize:".7rem",color:"var(--gray)",fontWeight:700,marginBottom:5,letterSpacing:".05em"},children:"VOTRE CODE DE SUIVI"}),e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontSize:"1.8rem",fontWeight:800,color:"var(--green)",letterSpacing:".08em",marginBottom:10},children:k}),e.jsx("button",{onClick:()=>{var f;(f=navigator.clipboard)==null||f.writeText(k),alert("✅ Code copié !")},style:{background:"var(--surface)",color:"var(--ink)",border:"1.5px solid var(--border)",borderRadius:8,padding:"6px 14px",fontSize:".75rem",fontWeight:600,cursor:"pointer"},children:"📋 Copier le code"})]}),e.jsx("p",{style:{fontSize:".78rem",color:"var(--gray)",marginBottom:18,lineHeight:1.6},children:"💡 Conservez ce code pour suivre votre livraison en temps réel sur la page Livraison."}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:[e.jsx("button",{onClick:t,style:{background:"var(--surface2)",color:"var(--ink)",border:"1.5px solid var(--border)",borderRadius:9,padding:"11px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".82rem"},children:"Fermer"}),e.jsx("button",{onClick:()=>{t(),window.location.href="/?page=livraison&code="+k},style:{background:"var(--green)",color:"#fff",border:"none",padding:"11px",borderRadius:9,cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem"},children:"📍 Suivre maintenant"})]})]})}):e.jsx("div",{className:"modal-overlay",onClick:f=>f.target===f.currentTarget&&t(),children:e.jsxs("div",{className:"modal",style:{maxWidth:560},children:[e.jsx("button",{className:"modal-close",onClick:t,children:"✕"}),e.jsxs("div",{style:{textAlign:"center",marginBottom:18},children:[e.jsx("div",{style:{fontSize:"2.8rem",marginBottom:6,background:"var(--green-pale)",width:72,height:72,borderRadius:"50%",display:"inline-flex",alignItems:"center",justifyContent:"center"},children:"📦"}),e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontSize:"1.3rem",fontWeight:800,color:"var(--ink)",marginTop:8,letterSpacing:"-.3px"},children:"Demander une livraison"}),e.jsx("p",{style:{fontSize:".82rem",color:"var(--gray)",marginTop:4},children:"Remplissez le formulaire, un livreur sera assigné en quelques minutes"})]}),e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",color:"var(--green)",marginBottom:8,marginTop:4},children:"👤 Vos coordonnées"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14},children:[e.jsxs("div",{className:"form-group",style:{marginBottom:0},children:[e.jsxs("label",{className:"form-label",children:["Nom ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:"form-input"+(c.nom?" error":""),placeholder:"Votre nom",value:s.nom,onChange:f=>p(b=>({...b,nom:f.target.value}))}),c.nom&&e.jsx("span",{className:"form-error-text",children:c.nom})]}),e.jsxs("div",{className:"form-group",style:{marginBottom:0},children:[e.jsxs("label",{className:"form-label",children:["Téléphone ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:"form-input"+(c.telephone?" error":""),placeholder:"+237 6XX XXX XXX",value:s.telephone,onChange:f=>p(b=>({...b,telephone:f.target.value}))}),c.telephone&&e.jsx("span",{className:"form-error-text",children:c.telephone})]})]}),e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",color:"var(--green)",marginBottom:8},children:"📍 Adresses"}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["🔴 Adresse de collecte ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:"form-input"+(c.adresse_collecte?" error":""),placeholder:"Ex: Marché Central, Douala",value:s.adresse_collecte,onChange:f=>p(b=>({...b,adresse_collecte:f.target.value}))}),c.adresse_collecte&&e.jsx("span",{className:"form-error-text",children:c.adresse_collecte})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["🟢 Adresse de livraison ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:"form-input"+(c.adresse_livraison?" error":""),placeholder:"Ex: Akwa Nord, Rue Bonanjo, Douala",value:s.adresse_livraison,onChange:f=>p(b=>({...b,adresse_livraison:f.target.value}))}),c.adresse_livraison&&e.jsx("span",{className:"form-error-text",children:c.adresse_livraison})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Ville"}),e.jsx("select",{className:"form-select",value:s.ville,onChange:f=>p(b=>({...b,ville:f.target.value})),children:ma.filter(f=>f!=="Toutes les villes").map(f=>e.jsx("option",{value:f,children:f},f))})]}),e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",color:"var(--green)",marginBottom:8,marginTop:4},children:"📦 Détails du colis"}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Description du colis ",e.jsx("span",{children:"*"})]}),e.jsx("textarea",{className:"form-textarea"+(c.colis_description?" error":""),style:{minHeight:60},placeholder:"Ex: Enveloppe de documents, Carton de 5kg, Sac à main...",value:s.colis_description,onChange:f=>p(b=>({...b,colis_description:f.target.value}))}),c.colis_description&&e.jsx("span",{className:"form-error-text",children:c.colis_description})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Type de véhicule"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6},children:[{id:"Moto",icon:"🏍️",label:"Moto",sub:"Petits colis"},{id:"Voiture",icon:"🚗",label:"Voiture",sub:"Colis moyens"},{id:"Minibus",icon:"🚐",label:"Minibus",sub:"Gros volume"}].map(f=>e.jsxs("div",{onClick:()=>p(b=>({...b,vehicule:f.id})),style:{border:"2px solid "+(s.vehicule===f.id?"var(--green)":"var(--border)"),background:s.vehicule===f.id?"var(--green-pale)":"var(--surface)",borderRadius:9,padding:"10px 6px",cursor:"pointer",textAlign:"center",transition:"all .2s"},children:[e.jsx("div",{style:{fontSize:"1.4rem",marginBottom:3},children:f.icon}),e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem",color:"var(--ink)"},children:f.label}),e.jsx("div",{style:{fontSize:".62rem",color:"var(--gray)"},children:f.sub})]},f.id))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Niveau d'urgence"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6},children:[{id:"normal",icon:"🟢",label:"Normal",time:"30-60 min"},{id:"urgent",icon:"🟠",label:"Urgent",time:"15-30 min"},{id:"express",icon:"🔴",label:"Express",time:"< 15 min"}].map(f=>e.jsxs("div",{onClick:()=>p(b=>({...b,urgence:f.id})),style:{border:"2px solid "+(s.urgence===f.id?"var(--green)":"var(--border)"),background:s.urgence===f.id?"var(--green-pale)":"var(--surface)",borderRadius:9,padding:"10px 6px",cursor:"pointer",textAlign:"center",transition:"all .2s"},children:[e.jsx("div",{style:{fontSize:"1.1rem",marginBottom:2},children:f.icon}),e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".76rem",color:"var(--ink)"},children:f.label}),e.jsx("div",{style:{fontSize:".62rem",color:"var(--gray)"},children:f.time})]},f.id))})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Budget proposé (FCFA) ",e.jsx("span",{style:{color:"var(--gray)",fontSize:".7rem"},children:"— optionnel"})]}),e.jsx("input",{className:"form-input",type:"number",placeholder:"Ex: 2000 (laisser vide = à définir avec livreur)",value:s.budget,onChange:f=>p(b=>({...b,budget:f.target.value}))}),e.jsx("div",{style:{fontSize:".68rem",color:"var(--gray)",marginTop:4,lineHeight:1.5},children:"💡 Tarifs indicatifs : Intra-ville 500-1500 F · Inter-quartiers 1500-3000 F · Inter-villes 3000-8000 F"})]}),e.jsx("button",{className:"form-submit",onClick:w,disabled:g,style:{marginTop:8},children:g?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"spinner",style:{width:16,height:16,borderWidth:2}}),"Envoi en cours..."]}):"📦 Envoyer ma demande"}),e.jsx("p",{style:{fontSize:".7rem",color:"var(--gray)",textAlign:"center",marginTop:10,lineHeight:1.5},children:"🔒 Vos informations sont sécurisées · Paiement à la livraison"})]})})}function za({user:r,userData:i,initialProduct:t=null,onClose:o,isModal:a=!1}){const[d,s]=l.useState([]),[p,c]=l.useState(null),[m,g]=l.useState([]),[h,k]=l.useState(""),[v,z]=l.useState(!0),[w,f]=l.useState(!1),[b,y]=l.useState(!1),[M,E]=l.useState(""),q=l.useRef(null);l.useEffect(()=>{t!=null&&t.vendeur_id&&(r!=null&&r.id)&&t.vendeur_id!==r.id&&I(t.vendeur_id,t.id)},[t==null?void 0:t.id,r==null?void 0:r.id]),l.useEffect(()=>{r!=null&&r.id&&T()},[r==null?void 0:r.id]);const T=async()=>{z(!0);try{const{data:C,error:P}=await R.from("conversations").select("*").or(`user1_id.eq.${r.id},user2_id.eq.${r.id}`).order("last_message_at",{ascending:!1});if(P)throw P;s(C||[])}catch(C){console.warn("Chargement conversations:",C.message)}z(!1)},I=async(C,P=null)=>{if(!(r!=null&&r.id)||!C||r.id===C)return;const[Y,G]=r.id<C?[r.id,C]:[C,r.id];try{let L=R.from("conversations").select("*").eq("user1_id",Y).eq("user2_id",G);P?L=L.eq("product_id",P):L=L.is("product_id",null);const{data:fe}=await L.maybeSingle();if(fe){c(fe.id),await T();return}const{data:re,error:te}=await R.from("conversations").insert({user1_id:Y,user2_id:G,product_id:P}).select().single();if(te)throw te;c(re.id),await T()}catch(L){console.error("startConversation:",L),alert("Erreur : "+L.message)}};l.useEffect(()=>{if(!p){g([]);return}ae()},[p]);const ae=async()=>{try{const{data:C,error:P}=await R.from("messages").select("*").eq("conversation_id",p).order("created_at",{ascending:!0});if(P)throw P;g(C||[])}catch(C){console.warn("Chargement messages:",C.message)}};l.useEffect(()=>{if(!p)return;const C=R.channel(`chat-${p}`).on("postgres_changes",{event:"INSERT",schema:"public",table:"messages",filter:`conversation_id=eq.${p}`},P=>{g(Y=>Y.some(G=>G.id===P.new.id)?Y:[...Y,P.new])}).subscribe();return()=>{R.removeChannel(C)}},[p]),l.useEffect(()=>{var C;(C=q.current)==null||C.scrollIntoView({behavior:"smooth"})},[m]);const V=async()=>{if(!h.trim()||!p||w)return;const C=va(h);if(C!=null&&C.bloque){y(!0),E(C.raison||"Partage de contact interdit"),setTimeout(()=>y(!1),5e3),r&&R.from("fraud_logs").insert({type:"tentative_contournement_chat",user_id:r.id,message:h}).then(({error:P})=>{P&&console.warn("fraud_logs:",P.message)});return}f(!0);try{const{data:P,error:Y}=await R.from("messages").insert({conversation_id:p,sender_id:r.id,content:h.trim()}).select().single();if(Y)throw Y;g(G=>G.some(L=>L.id===P.id)?G:[...G,P]),k("")}catch(P){alert("Erreur envoi : "+P.message)}f(!1)},U=C=>C.user1_id===r.id?C.user2_id:C.user1_id;if(!r)return e.jsx("div",{style:{padding:30,textAlign:"center",color:"var(--gray)"},children:"🔐 Connectez-vous pour accéder à la messagerie."});const pe=a?{background:"var(--surface)",borderRadius:13,overflow:"hidden",height:"80vh",maxHeight:600,display:"flex",width:"100%"}:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:13,overflow:"hidden",height:500,display:"flex"};return e.jsxs("div",{style:pe,children:[e.jsxs("div",{style:{width:240,borderRight:"1px solid var(--border)",background:"var(--surface2)",display:"flex",flexDirection:"column"},children:[e.jsx("div",{style:{padding:"12px 14px",borderBottom:"1px solid var(--border)",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".85rem",color:"var(--ink)"},children:"💬 Conversations"}),e.jsx("div",{style:{flex:1,overflowY:"auto"},children:v?e.jsx("div",{style:{padding:20,textAlign:"center",color:"var(--gray)",fontSize:".78rem"},children:"Chargement..."}):d.length===0?e.jsxs("div",{style:{padding:20,textAlign:"center",color:"var(--gray)",fontSize:".75rem",lineHeight:1.6},children:["Aucune conversation.",e.jsx("br",{}),e.jsx("br",{}),'Clique sur "Contacter le vendeur" depuis un produit.']}):d.map(C=>e.jsxs("div",{onClick:()=>c(C.id),style:{padding:"10px 12px",cursor:"pointer",borderBottom:"1px solid var(--border)",background:p===C.id?"var(--green-pale)":"transparent"},children:[e.jsxs("div",{style:{fontWeight:600,fontSize:".8rem",color:"var(--ink)"},children:["👤 ",U(C).slice(0,8),"..."]}),e.jsx("div",{style:{fontSize:".65rem",color:"var(--gray)",marginTop:2},children:C.last_message_at?new Date(C.last_message_at).toLocaleString("fr-FR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}):"Nouveau"}),C.product_id&&e.jsx("div",{style:{fontSize:".6rem",color:"var(--green)",marginTop:3,fontWeight:600},children:"🛍️ Sur un produit"})]},C.id))})]}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{padding:"12px 16px",borderBottom:"1px solid var(--border)",background:"var(--green)",color:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,fontSize:".88rem"},children:p?"💬 Conversation":"Sélectionne une conversation"}),e.jsx("div",{style:{fontSize:".68rem",opacity:.85},children:"🔒 Messagerie sécurisée · Partage de contact interdit"})]}),o&&e.jsx("button",{onClick:o,style:{background:"rgba(255,255,255,.15)",color:"#fff",border:"none",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:"1rem"},children:"✕"})]}),e.jsxs("div",{style:{flex:1,overflowY:"auto",padding:14,background:"var(--surface)",display:"flex",flexDirection:"column",gap:8},children:[p?m.length===0?e.jsxs("div",{style:{textAlign:"center",color:"var(--gray)",marginTop:60,fontSize:".85rem"},children:["Aucun message.",e.jsx("br",{}),"Envoie le premier ! 👇"]}):m.map(C=>{const P=C.sender_id===r.id;return e.jsxs("div",{style:{alignSelf:P?"flex-end":"flex-start",maxWidth:"75%",background:P?"var(--green)":"var(--surface2)",color:P?"#fff":"var(--ink)",padding:"8px 12px",borderRadius:P?"12px 12px 3px 12px":"12px 12px 12px 3px",fontSize:".85rem",lineHeight:1.4,wordBreak:"break-word"},children:[e.jsx("div",{children:C.content}),e.jsxs("div",{style:{fontSize:".6rem",opacity:.7,marginTop:3,textAlign:P?"right":"left"},children:[new Date(C.created_at).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),P&&(C.is_read?" ✓✓":" ✓")]})]},C.id)}):e.jsx("div",{style:{textAlign:"center",color:"var(--gray)",marginTop:60,fontSize:".85rem"},children:"👈 Sélectionne une conversation à gauche"}),b&&e.jsxs("div",{style:{background:"#fee2e2",border:"1px solid #fca5a5",borderRadius:9,padding:"10px 14px",color:"#991b1b",fontSize:".78rem",textAlign:"center",margin:"8px 0",lineHeight:1.5},children:["🚫 ",e.jsx("strong",{children:"Message bloqué"}),e.jsx("br",{}),M||"Partage de contacts externes interdit sur Yorix",e.jsx("br",{}),e.jsx("span",{style:{fontSize:".7rem",opacity:.8},children:"Utilise la messagerie Yorix pour tes échanges."})]}),e.jsx("div",{ref:q})]}),p&&e.jsxs("div",{style:{padding:10,borderTop:"1px solid var(--border)",display:"flex",gap:7,background:"var(--surface)"},children:[e.jsx("input",{type:"text",placeholder:"Écris ton message...",value:h,onChange:C=>k(C.target.value),onKeyDown:C=>{C.key==="Enter"&&!w&&V()},disabled:w,style:{flex:1,border:"1.5px solid var(--border)",borderRadius:8,padding:"9px 12px",fontFamily:"'DM Sans',sans-serif",fontSize:".83rem",outline:"none",background:"var(--surface2)",color:"var(--ink)"}}),e.jsx("button",{onClick:V,disabled:w||!h.trim(),style:{background:"var(--green)",color:"#fff",border:"none",width:40,height:40,borderRadius:8,cursor:w||!h.trim()?"not-allowed":"pointer",fontSize:"1rem",opacity:w||!h.trim()?.5:1},children:w?"...":"➤"})]})]})]})}const _a="modulepreload",Ta=function(r){return"/"+r},wt={},D=function(i,t,o){let a=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),p=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));a=Promise.allSettled(t.map(c=>{if(c=Ta(c),c in wt)return;wt[c]=!0;const m=c.endsWith(".css"),g=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${g}`))return;const h=document.createElement("link");if(h.rel=m?"stylesheet":_a,m||(h.as="script"),h.crossOrigin="",h.href=c,p&&h.setAttribute("nonce",p),document.head.appendChild(h),m)return new Promise((k,v)=>{h.addEventListener("load",k),h.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${c}`)))})}))}function d(s){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=s,window.dispatchEvent(p),!p.defaultPrevented)throw s}return a.then(s=>{for(const p of s||[])p.status==="rejected"&&d(p.reason);return i().catch(d)})};function B({minHeight:r=200,label:i="Chargement..."}){return e.jsxs("div",{className:"loading",style:{minHeight:r,justifyContent:"center",padding:"24px 0"},children:[e.jsx("div",{className:"spinner"}),i]})}const Ea=l.lazy(()=>D(()=>import("./HomePage-CarFP3Jw.js"),__vite__mapDeps([0,1,2,3,4,5,6])).then(r=>({default:r.HomePage}))),Aa=l.lazy(()=>D(()=>import("./ProductRouteSections-CKeAlbiE.js"),__vite__mapDeps([7,2,1,3,4,5,8,6])).then(r=>({default:r.ProductRouteSections}))),Na=l.lazy(()=>D(()=>import("./LivraisonPage-CbWXr00T.js"),__vite__mapDeps([9,1,6])).then(r=>({default:r.LivraisonPage}))),Ra=l.lazy(()=>D(()=>import("./SiteMarketingPages-D1pI_0Vt.js"),__vite__mapDeps([10,1,8,6])).then(r=>({default:r.SiteMarketingPages})));l.lazy(()=>D(()=>import("./LivraisonLazyBlocks-4vqaz1UR.js"),__vite__mapDeps([11,1,6])).then(r=>({default:r.LivraisonTopInteractive})));l.lazy(()=>D(()=>import("./LivraisonLazyBlocks-4vqaz1UR.js"),__vite__mapDeps([11,1,6])).then(r=>({default:r.LivraisonBottomInteractive})));const Ma=l.lazy(()=>D(()=>import("./FicheProduit-1n43Q3Ng.js"),__vite__mapDeps([12,1,3,4,5,6])).then(r=>({default:r.FicheProduit}))),Pa=l.lazy(()=>D(()=>import("./PrestPage-D6xhNyn1.js"),__vite__mapDeps([13,1,6])).then(r=>({default:r.PrestPage}))),Ia=l.lazy(()=>D(()=>import("./CheckoutPage-3-z-OJ3C.js"),__vite__mapDeps([14,1,5,15,6])).then(r=>({default:r.CheckoutPage}))),La=l.lazy(()=>D(()=>import("./CartPage-CqKnB6kC.js"),__vite__mapDeps([16,3,1,15,6])).then(r=>({default:r.CartPage}))),Oa=l.lazy(()=>D(()=>import("./AcademyDetail-DVgsxW9C.js"),__vite__mapDeps([17,1,6])).then(r=>({default:r.AcademyDetail}))),Da=l.lazy(()=>D(()=>import("./AcademyContactForm-CYkFuups.js"),__vite__mapDeps([18,1,6])).then(r=>({default:r.AcademyContactForm}))),qa=l.lazy(()=>D(()=>import("./LoyaltyPage-t7JL3exQ.js"),__vite__mapDeps([19,1,8,6])).then(r=>({default:r.LoyaltyPage}))),Ba=l.lazy(()=>D(()=>import("./SellerDashboard-BECH6tUQ.js"),__vite__mapDeps([20,1,6])).then(r=>({default:r.SellerDashboard}))),Fa=l.lazy(()=>D(()=>import("./BuyerDashboard-eICVy84w.js"),__vite__mapDeps([21,1,6])).then(r=>({default:r.BuyerDashboard}))),Ya=l.lazy(()=>D(()=>import("./DeliveryDashboard-CTa11BN5.js"),__vite__mapDeps([22,1,6])).then(r=>({default:r.DeliveryDashboard}))),$a=l.lazy(()=>D(()=>import("./ProviderDashboard-7CSf9rhs.js"),__vite__mapDeps([23,1,6])).then(r=>({default:r.ProviderDashboard}))),Ua=l.lazy(()=>D(()=>import("./AdminDashboard-B5vYaXs-.js"),__vite__mapDeps([24,1,6])).then(r=>({default:r.AdminDashboard}))),Wa=l.lazy(()=>D(()=>import("./NotificationsPage-BRpA0_JR.js"),__vite__mapDeps([25,1,6])).then(r=>({default:r.NotificationsPage}))),Va=l.lazy(()=>D(()=>import("./PromotionsPage-7eyH0cjG.js"),__vite__mapDeps([26,1,6])).then(r=>({default:r.PromotionsPage})));function $t(r){if(!r||r.id==null)return null;const i=r.kind||"product",t=Math.max(1,Number(r.qty||1)),o=Number(r.prix??r.price??0),a=r.fulfillmentMode||(i==="service"?"booking":"delivery");return{...r,kind:i,qty:t,prix:o,fulfillmentMode:a}}function Nr(){return{freeShippingThresholdXaf:(Number.isFinite(NaN),5e4),standardDeliveryFeeXaf:(Number.isFinite(NaN),1500)}}function Ut(r){const i=Nr(),t=r==null?void 0:r.freeShippingThresholdXaf,o=r==null?void 0:r.standardDeliveryFeeXaf;return{freeShippingThresholdXaf:t!=null&&Number.isFinite(Number(t))&&Number(t)>=0?Number(t):i.freeShippingThresholdXaf,standardDeliveryFeeXaf:o!=null&&Number.isFinite(Number(o))&&Number(o)>=0?Number(o):i.standardDeliveryFeeXaf}}function Ha(r){return(r||[]).map($t).filter(Boolean).filter(t=>t.kind==="product"&&t.fulfillmentMode!=="pickup").reduce((t,o)=>t+o.prix*o.qty,0)}function Xa(r,i){let t=Nr();typeof i=="number"&&Number.isFinite(i)?t={...t,standardDeliveryFeeXaf:i}:i&&typeof i=="object"&&(t=Ut(i));const o=(r||[]).map($t).filter(Boolean),a=o.filter(y=>y.kind==="product"),d=o.filter(y=>y.kind==="service"),s=a.reduce((y,M)=>y+M.prix*M.qty,0),p=d.reduce((y,M)=>y+M.prix*M.qty,0),c=s+p,m=o.reduce((y,M)=>y+M.qty,0),g=Ha(o),h=g>0,k=t.freeShippingThresholdXaf,v=t.standardDeliveryFeeXaf,z=h&&g>=k,w=h&&!z?Math.round(v):0,f=z||!h?0:Math.max(0,Math.round(k-g)),b=!h||k<=0?null:Math.min(1,g/k);return{qty:m,productsCount:a.length,servicesCount:d.length,productsSubtotal:s,servicesSubtotal:p,shippableProductsSubtotal:g,subtotal:c,delivery:w,total:c+w,policyThreshold:k,policyStandardFee:v,hasShippableProducts:h,freeShippingUnlocked:z,amountRemainingForFreeShipping:f,freeShippingProgress01:b,freeShippingNotApplicable:!h}}function Ln(r,i,t,o=4){const a=Math.max(1,Number(o)||4),d=new Set((r||[]).map(v=>v.id)),s=(i||[]).filter(v=>(v==null?void 0:v.id)!=null&&!d.has(v.id)),p=t==null?void 0:t.hasShippableProducts,c=t==null?void 0:t.freeShippingUnlocked,m=(t==null?void 0:t.amountRemainingForFreeShipping)||0;if(!p||c||s.length===0)return s.slice(0,a);const h=s.map(v=>{const z=Number(v.prix||0),w=z>=m;return{p:v,price:z,coversGap:w,delta:w?z-m:m-z}}).filter(v=>v.price>0).sort((v,z)=>v.coversGap!==z.coversGap?v.coversGap?-1:1:v.delta-z.delta).slice(0,a).map(v=>v.p);if(h.length>=a)return h;const k=s.filter(v=>!h.some(z=>z.id===v.id)).slice(0,a-h.length);return[...h,...k]}const Wt="yorix_cart";function Ja(){try{const r=localStorage.getItem(Wt);if(!r)return[];const i=JSON.parse(r);return Array.isArray(i)?i.map(Ke).filter(Boolean):[]}catch{return[]}}function Ga(r){try{localStorage.setItem(Wt,JSON.stringify(r||[]))}catch{}}function Ke(r){if(!r||!r.id)return null;const i=r.kind||"product";return{...r,kind:i,qty:Math.max(1,Number(r.qty||1)),prix:Number(r.prix||0),fulfillmentMode:r.fulfillmentMode||(i==="service"?"booking":"delivery")}}function Ka(r){if(!(r!=null&&r.id))return null;let i=[];if(Array.isArray(r.image_urls))i=r.image_urls;else if(typeof r.image_urls=="string")try{i=JSON.parse(r.image_urls)}catch{i=[]}const t=r.image&&String(r.image).startsWith("http")?r.image:i[0]&&String(i[0]).startsWith("http")?i[0]:null;return Ke({id:r.id,kind:"product",name:r.name_fr||r.name||"Produit",image:t,prix:Number(r.prix||0),qty:1,vendeur_id:r.vendeur_id||null,vendeur_nom:r.vendeur_nom||"",categorie:r.categorie||"",ville:r.ville||"",stock:r.stock??null,fulfillmentMode:"delivery",pricingSnapshot:{base:Number(r.prix||0),currency:"XAF"}})}function Qa(r){return r!=null&&r.id?Ke({id:r.id,kind:"service",name:r.name||r.provider_nom||r.metier||"Prestation",image:r.photo||null,prix:Number(r.prix_number||r.prix||0),qty:1,provider_id:r.provider_id||null,provider_nom:r.provider_nom||r.name||"",categorie:r.categorie||"Service",ville:r.ville||"",booking:{date:"",time:"",locationType:"home",notes:""},fulfillmentMode:"booking",pricingSnapshot:{base:Number(r.prix_number||r.prix||0),currency:"XAF"}}):null}function kt(r,i){const t=Ke(i);if(!t)return r||[];const o=Array.isArray(r)?r:[],a=o.findIndex(d=>d.id===t.id&&d.kind===t.kind);return a===-1?[...o,t]:o.map((d,s)=>s!==a?d:{...d,qty:d.kind==="service"?1:Math.max(1,d.qty+t.qty)})}function Za(r,i,t,o){return(r||[]).map(a=>a.id!==i||t&&a.kind!==t?a:a.kind==="service"?{...a,qty:1}:{...a,qty:Math.max(1,Number(a.qty||1)+o)})}function en(r,i,t){return(r||[]).filter(o=>!(o.id===i&&(!t||o.kind===t)))}function rn(r,i=1500){return Xa(r,i)}const A={messages:"messages",orders:"orders",payments:"payments",delivery:"delivery",security:"security",promotions:"promotions",system:"system"},K={critical:"critical",important:"important",standard:"standard",promo:"promo"},tn=[{test:r=>/payment|paiement|checkout|cinetpay/i.test(r||""),category:A.payments,priority:K.critical},{test:r=>/security|fraud|litige|connexion|login|suspicious/i.test(r||""),category:A.security,priority:K.critical},{test:r=>/deliver|livraison|livreur|shipping|colis/i.test(r||""),category:A.delivery,priority:K.important},{test:r=>/order|commande|booking|réservation|prestation|service_booking/i.test(r||""),category:A.orders,priority:K.important},{test:r=>/message|chat|support|conversation/i.test(r||""),category:A.messages,priority:K.important},{test:r=>/promo|offre|soldes|flash/i.test(r||""),category:A.promotions,priority:K.promo}],on={[A.messages]:"💬",[A.orders]:"📦",[A.payments]:"💳",[A.delivery]:"🚚",[A.security]:"🛡️",[A.promotions]:"🏷️",[A.system]:"🔔"};function an(r,i,t){const o=`${r||""} ${i||""} ${t||""}`;for(const a of tn)if(a.test(o))return{category:a.category,priority:a.priority};return{category:A.system,priority:K.standard}}function nn(r){return r==null?"":String(r).replace(/https?:\/\/[^\s]+/g,i=>{try{const t=new URL(i);return t.hostname.includes("wa.me")||t.hostname.includes("whatsapp")?"Lien WhatsApp":t.hostname.includes("yorix")?"Ouvrir sur Yorix":`[${t.hostname}]`}catch{return"Lien"}})}function Rr(r){var s;const i=r.type||"",t=r.titre||"",o=an(i,t,r.message),a=r.category||o.category,d=r.priority||o.priority;return{...r,_category:a,_priority:d,_icon:r.icon||on[a]||"🔔",_title:t||"Notification Yorix",_body:nn(r.message),_image:r.image_url||((s=r.metadata)==null?void 0:s.image_url)||null,_deeplink:typeof r.link=="string"?r.link.trim():"",_timeLabel:r.created_at?new Date(r.created_at).toLocaleString("fr-FR",{dateStyle:"short",timeStyle:"short"}):""}}function sn(r,i){return!i||i==="all"?r:(r||[]).filter(t=>Rr(t)._category===i)}function ln(r,i){if(typeof window>"u"||typeof Notification>"u"||Notification.permission!=="granted"||!(i!=null&&i.pushBrowser))return;const t=r._category||A.system;if(!(i.categories&&i.categories[t]===!1))try{new Notification(r._title,{body:(r._body||"").slice(0,180),icon:"/icons/icon-192.png",tag:String(r.id||r.created_at||"yorix"),silent:!(i!=null&&i.sound)})}catch{}}const Vt="yorix_notification_prefs_v1",$e=()=>({pushBrowser:!0,sound:!1,email:!1,sms:!1,whatsappDigest:!1,categories:{[A.messages]:!0,[A.orders]:!0,[A.payments]:!0,[A.delivery]:!0,[A.security]:!0,[A.promotions]:!0,[A.system]:!0}});function X(){try{const r=localStorage.getItem(Vt);if(!r)return $e();const i=JSON.parse(r);return{...$e(),...i,categories:{...$e().categories,...i.categories||{}}}}catch{return $e()}}function Ht(r){try{const i=X(),t={...i,...r,categories:{...i.categories,...r.categories||{}}};return localStorage.setItem(Vt,JSON.stringify(t)),t}catch{return X()}}function cn(r){return r?{pushBrowser:r.push_enabled!==!1&&r.desktop_alerts!==!1,sound:r.sound_enabled===!0,email:r.email_critical===!0,sms:r.sms_critical===!0,whatsappDigest:r.whatsapp_critical!==!1,categories:{[A.messages]:r.category_messages!==!1,[A.orders]:r.category_orders!==!1,[A.payments]:r.category_payments!==!1,[A.delivery]:r.category_delivery!==!1,[A.security]:r.category_security!==!1,[A.promotions]:r.category_promotions!==!1,[A.system]:r.category_system!==!1}}:null}function Xt(r,i){const t=i.categories||{};return{user_id:r,push_enabled:i.pushBrowser!==!1,desktop_alerts:i.pushBrowser!==!1,sound_enabled:i.sound===!0,email_critical:i.email===!0,sms_critical:i.sms===!0,whatsapp_critical:i.whatsappDigest!==!1,category_messages:t[A.messages]!==!1,category_orders:t[A.orders]!==!1,category_payments:t[A.payments]!==!1,category_delivery:t[A.delivery]!==!1,category_security:t[A.security]!==!1,category_promotions:t[A.promotions]!==!1,category_system:t[A.system]!==!1,updated_at:new Date().toISOString()}}async function Jt(r,i){if(!(r!=null&&r.from)||!i)return X();try{const{data:t,error:o}=await r.from("notification_preferences").select("*").eq("user_id",i).maybeSingle();if(o)return console.warn("[notification_prefs] load:",o.message),X();if(t){const p=cn(t);return p&&Ht(p),p||X()}const a=X(),d=Xt(i,a),{error:s}=await r.from("notification_preferences").upsert(d,{onConflict:"user_id"});return s&&console.warn("[notification_prefs] seed:",s.message),a}catch(t){return console.warn("[notification_prefs]",(t==null?void 0:t.message)||t),X()}}async function dn(r,i,t){const o=Ht(t);if(!(r!=null&&r.from)||!i)return o;try{const a=Xt(i,o),{error:d}=await r.from("notification_preferences").upsert(a,{onConflict:"user_id"});d&&console.warn("[notification_prefs] save:",d.message)}catch(a){console.warn("[notification_prefs] save",(a==null?void 0:a.message)||a)}return o}function pn({user:r,compact:i=!1}){const[t,o]=l.useState("loading"),[a,d]=l.useState(null);l.useEffect(()=>{s()},[r==null?void 0:r.id]);async function s(){if(!("serviceWorker"in navigator)||!("PushManager"in window)){o("unsupported");return}if(Notification.permission==="denied"){o("denied");return}try{const k=await(await navigator.serviceWorker.ready).pushManager.getSubscription();o(k?"subscribed":"unsubscribed")}catch(h){console.error("[PushManager] Erreur check :",h),o("unsubscribed")}}async function p(){if(!(r!=null&&r.id)){d("Vous devez être connecté");return}{d("Configuration manquante (VAPID)"),console.error("[PushManager] VITE_VAPID_PUBLIC_KEY non définie");return}}async function c(){o("pending"),d(null);try{const k=await(await navigator.serviceWorker.ready).pushManager.getSubscription();if(k){const v=k.endpoint,{error:z}=await R.from("push_subscriptions").delete().eq("endpoint",v);z&&console.warn("[PushManager] Erreur delete Supabase :",z),await k.unsubscribe()}o("unsubscribed"),console.log("[PushManager] ✅ Désabonné des push")}catch(h){console.error("[PushManager] Erreur désabonnement :",h),d(h.message||"Erreur lors du désabonnement"),o("subscribed")}}if(!(r!=null&&r.id))return null;const m={padding:i?"10px 12px":"14px 16px",background:"var(--surface2, #f6f6f6)",borderRadius:12,border:"1px solid var(--border, #e5e5e5)",marginBottom:12,fontSize:i?13:14},g={padding:"8px 14px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:600,fontSize:13,marginTop:8,width:"100%"};return t==="loading"?e.jsx("div",{style:m,children:e.jsx("div",{style:{color:"var(--gray, #666)"},children:"⏳ Vérification..."})}):t==="unsupported"?e.jsxs("div",{style:m,children:[e.jsx("div",{style:{color:"var(--gray, #666)"},children:"ℹ️ Votre navigateur ne supporte pas les notifications push."}),e.jsx("div",{style:{fontSize:11,color:"var(--gray, #999)",marginTop:4},children:"Utilisez Chrome, Firefox ou Edge pour activer cette fonctionnalité."})]}):t==="denied"?e.jsxs("div",{style:m,children:[e.jsx("div",{style:{color:"#c62828"},children:"🔕 Notifications bloquées"}),e.jsx("div",{style:{fontSize:11,color:"var(--gray, #666)",marginTop:4},children:"Vous avez refusé les notifications. Pour les réactiver, allez dans les paramètres de votre navigateur (🔒 icône à gauche de l'URL)."})]}):t==="subscribed"?e.jsxs("div",{style:m,children:[e.jsx("div",{style:{color:"var(--green, #2e7d32)",fontWeight:600},children:"🔔 Notifications activées"}),e.jsx("div",{style:{fontSize:11,color:"var(--gray, #666)",marginTop:4},children:"Vous recevrez des alertes pour les nouveaux messages et produits."}),e.jsx("button",{style:{...g,background:"var(--surface, #fff)",border:"1px solid var(--border, #ddd)",color:"var(--ink, #222)"},onClick:c,children:"🔕 Désactiver les notifications"}),a&&e.jsxs("div",{style:{color:"#c62828",fontSize:12,marginTop:6},children:["⚠️ ",a]})]}):t==="pending"?e.jsx("div",{style:m,children:e.jsx("div",{style:{color:"var(--gray, #666)"},children:"⏳ En cours..."})}):e.jsxs("div",{style:m,children:[e.jsx("div",{style:{fontWeight:600,marginBottom:4},children:"🔔 Activer les notifications"}),e.jsx("div",{style:{fontSize:12,color:"var(--gray, #666)",marginBottom:8},children:"Soyez alerté dès qu'un client vous envoie un message ou qu'un nouveau produit est ajouté."}),e.jsx("button",{style:{...g,background:"var(--green, #2e7d32)",color:"#fff"},onClick:p,children:"✅ Activer maintenant"}),a&&e.jsxs("div",{style:{color:"#c62828",fontSize:12,marginTop:6},children:["⚠️ ",a]})]})}const fn=[{key:"all",label:"Tous"},{key:A.messages,label:"Messages"},{key:A.orders,label:"Commandes"},{key:A.payments,label:"Paiements"},{key:A.delivery,label:"Livraison"},{key:A.security,label:"Sécurité"},{key:A.promotions,label:"Promos"},{key:A.system,label:"Système"}];function un(r){return r===K.critical?"notif-card-priority-critical":r===K.important?"notif-card-priority-important":r===K.promo?"notif-card-priority-promo":"notif-card-priority-standard"}function mn({variant:r="dropdown",notifs:i=[],user:t,goPage:o,onMarkRead:a,onMarkAllRead:d,onDismiss:s,onClose:p,onPrefsUpdated:c}){const[m,g]=l.useState("all"),[h,k]=l.useState(()=>X());l.useEffect(()=>{if(!(t!=null&&t.id)){k(X());return}let f=!1;return Jt(R,t.id).then(b=>{f||k(b)}),()=>{f=!0}},[t==null?void 0:t.id]);const v=l.useMemo(()=>sn(i,m==="all"?null:m),[i,m]),z=f=>{dn(R,t==null?void 0:t.id,f).then(b=>{k(b),c==null||c(b)})},w=l.useMemo(()=>i.filter(f=>!f.lu).length,[i]);return e.jsxs("div",{className:`notif-hub notif-hub--${r}`,children:[e.jsxs("div",{className:"notif-hub-toolbar",children:[e.jsxs("div",{className:"notif-hub-title-row",children:[e.jsx("h2",{className:"notif-hub-title",children:"Notifications"}),w>0&&e.jsx("span",{className:"notif-hub-badge",children:w>99?"99+":w})]}),e.jsxs("div",{className:"notif-hub-actions-top",children:[w>0&&e.jsx("button",{type:"button",className:"notif-link-btn",onClick:()=>d==null?void 0:d(),children:"Tout marquer lu"}),r==="dropdown"&&e.jsx("button",{type:"button",className:"notif-link-btn notif-link-btn-strong",onClick:()=>o==null?void 0:o("notifications"),children:"Voir tout"}),r==="dropdown"&&e.jsx("button",{type:"button",className:"notif-hub-close",onClick:()=>p==null?void 0:p(),"aria-label":"Fermer",children:"✕"})]})]}),e.jsx("div",{className:"notif-filter-strip",role:"tablist",children:fn.map(f=>e.jsx("button",{type:"button",role:"tab","aria-selected":m===f.key,className:`notif-chip${m===f.key?" notif-chip--active":""}`,onClick:()=>g(f.key),children:f.label},f.key))}),e.jsx("div",{className:r==="dropdown"?"notif-hub-scroll notif-hub-scroll--drop":"notif-hub-scroll notif-hub-scroll--page",children:v.length===0?e.jsxs("div",{className:"notif-empty premium",children:[e.jsx("div",{className:"notif-empty-icon",children:"🔕"}),e.jsx("div",{className:"notif-empty-title",children:"Aucune alerte dans ce filtre"}),e.jsx("p",{className:"notif-empty-sub",children:"Les commandes, messages et livraisons apparaîtront ici en temps réel."})]}):e.jsx("ul",{className:"notif-card-list",children:v.map(f=>{var y,M;const b=Rr(f);return e.jsxs("li",{className:`notif-card-li ${un(b._priority)}`,children:[e.jsxs("button",{type:"button",className:`notif-card-main${f.lu?"":" notif-card-unread"}`,onClick:()=>a==null?void 0:a(f,{navigate:!0,closeDrawer:r==="dropdown"}),children:[e.jsxs("span",{className:"notif-card-avatar","aria-hidden":!0,children:[b._image?e.jsx("img",{src:b._image,alt:"",loading:"lazy"}):e.jsx("span",{className:"notif-card-emoji",children:b._icon}),!f.lu&&e.jsx("span",{className:"notif-card-dot"})]}),e.jsxs("span",{className:"notif-card-copy",children:[e.jsxs("span",{className:"notif-card-top",children:[e.jsx("span",{className:"notif-card-title",children:b._title}),e.jsx("time",{className:"notif-card-time",dateTime:f.created_at||void 0,children:b._timeLabel})]}),e.jsx("span",{className:"notif-card-body",children:b._body}),((y=b._deeplink)==null?void 0:y.startsWith("http"))&&e.jsx("span",{className:"notif-card-cta-secondary",children:"Ouverture du lien sécurisé →"}),((M=b._deeplink)==null?void 0:M.startsWith("/"))&&e.jsx("span",{className:"notif-card-cta-secondary",children:"Appuyer pour ouvrir dans Yorix"})]})]}),e.jsxs("div",{className:"notif-card-side",children:[e.jsx("button",{type:"button",className:"notif-mini-btn",title:"Lu",onClick:E=>{E.stopPropagation(),a==null||a(f,{navigate:!1,closeDrawer:!1})},children:"✓"}),e.jsx("button",{type:"button",className:"notif-mini-btn notif-mini-btn-del",title:"Masquer",onClick:E=>{E.stopPropagation(),s==null||s(f.id)},children:"🗑"})]})]},String(b.id))})})}),e.jsxs("div",{className:"notif-hub-footer-premium",children:[e.jsxs("div",{className:"notif-preferences-mini",children:[e.jsx("div",{className:"notif-preferences-title",children:"Préférences (compte synchronisé)"}),e.jsxs("label",{className:"notif-toggle",children:[e.jsx("input",{type:"checkbox",checked:h.pushBrowser,onChange:f=>z({pushBrowser:f.target.checked})}),"Alertes bureau (navigateur ouvert)"]}),e.jsxs("label",{className:"notif-toggle",children:[e.jsx("input",{type:"checkbox",checked:h.sound,onChange:f=>z({sound:f.target.checked})}),"Son discret (si navigateur autorise)"]})]}),e.jsx(pn,{user:t,compact:!0})]})]})}function gn({open:r,onClose:i,onSelectAction:t,user:o}){const[a,d]=l.useState(!1);if(l.useEffect(()=>{const c=()=>d(window.innerWidth<600);return c(),window.addEventListener("resize",c),()=>window.removeEventListener("resize",c)},[]),l.useEffect(()=>(r?document.body.style.overflow="hidden":document.body.style.overflow="",()=>{document.body.style.overflow=""}),[r]),!r)return null;const s=[{id:"buy",icon:"🛍️",title:"Acheter",desc:"Des milliers de produits livrés à Yaoundé, Douala et partout.",color:"linear-gradient(135deg, #10b981, #059669)",bgIcon:"rgba(16, 185, 129, .12)",cta:"Explorer maintenant",badge:"⭐ Populaire",badgeColor:"#fcd116",miniBadge:"🔒 Escrow inclus"},{id:"sell",icon:"🏪",title:"Vendre",desc:"Créez votre boutique en 2 minutes. Vendez dès aujourd'hui.",color:"linear-gradient(135deg, #f59e0b, #d97706)",bgIcon:"rgba(245, 158, 11, .12)",cta:"Ouvrir ma boutique",badge:null,miniBadge:"💰 Commission 5%"},{id:"service",icon:"👷",title:"Trouver un pro",desc:"Plombiers, électriciens, photographes — tous vérifiés.",color:"linear-gradient(135deg, #8b5cf6, #7c3aed)",bgIcon:"rgba(139, 92, 246, .12)",cta:"Trouver un pro",badge:null,miniBadge:"✓ 850+ vérifiés"},{id:"delivery",icon:"🚚",title:"Faire livrer",desc:"Un livreur récupère votre colis en moins de 30 min.",color:"linear-gradient(135deg, #3b82f6, #2563eb)",bgIcon:"rgba(59, 130, 246, .12)",cta:"Appeler un livreur",badge:null,miniBadge:"⚡ ~25 min"}],p=[{icon:"🛡️",label:"Paiement sécurisé"},{icon:"✅",label:"Vendeurs vérifiés"},{icon:"🇨🇲",label:"100% Cameroun"},{icon:"⚡",label:"Inscription 2 min"}];return e.jsx("div",{onClick:c=>c.target===c.currentTarget&&i(),style:{position:"fixed",inset:0,background:"rgba(10, 20, 16, 0.88)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",zIndex:99999,display:"flex",alignItems:"center",justifyContent:"center",padding:a?"12px":"20px",overflowY:"auto",animation:"yfadeIn .25s ease"},children:e.jsxs("div",{style:{background:"var(--surface, #fff)",borderRadius:a?18:22,maxWidth:880,width:"100%",padding:a?"26px 18px 22px":"36px 32px 28px",position:"relative",boxShadow:"0 28px 70px rgba(0,0,0,.45)",animation:"yslideUp .35s cubic-bezier(.2,.8,.2,1)",maxHeight:"94vh",overflowY:"auto"},children:[e.jsx("button",{onClick:i,style:{position:"absolute",top:14,right:14,background:"var(--surface2, #f5f5f5)",border:"none",width:38,height:38,borderRadius:"50%",cursor:"pointer",fontSize:"1.05rem",color:"var(--ink, #111)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2,fontWeight:600},"aria-label":"Fermer",children:"✕"}),e.jsxs("div",{style:{textAlign:"center",marginBottom:a?18:22},children:[e.jsx("div",{style:{display:"inline-flex",alignItems:"center",gap:6,background:"var(--green-pale, #e8f5e9)",color:"var(--green, #1a6b3a)",padding:"5px 14px",borderRadius:50,fontSize:".7rem",fontWeight:700,marginBottom:12,letterSpacing:".02em"},children:"🇨🇲 Bienvenue sur Yorix CM"}),e.jsx("h1",{style:{fontFamily:"'Syne',sans-serif",fontSize:a?"1.45rem":"1.85rem",fontWeight:800,color:"var(--ink, #111)",marginBottom:8,letterSpacing:"-.5px",lineHeight:1.18},children:"Que voulez-vous faire aujourd'hui ?"}),e.jsx("p",{style:{color:"var(--gray, #666)",fontSize:a?".84rem":".92rem",maxWidth:520,margin:"0 auto",lineHeight:1.55},children:"Acheter, vendre, faire livrer ou trouver un pro — Yorix s'occupe du reste."})]}),e.jsx("div",{style:{display:"flex",gap:a?6:8,justifyContent:"center",flexWrap:a?"nowrap":"wrap",overflowX:a?"auto":"visible",marginBottom:a?18:24,paddingBottom:a?4:0,scrollbarWidth:"none",msOverflowStyle:"none"},className:"yorix-trust-badges",children:p.map((c,m)=>e.jsxs("div",{style:{background:"var(--surface2, #f8f8f8)",border:"1px solid var(--border, #e5e5e5)",color:"var(--ink, #111)",padding:a?"6px 11px":"7px 14px",borderRadius:50,fontSize:a?".68rem":".74rem",fontWeight:600,whiteSpace:"nowrap",display:"inline-flex",alignItems:"center",gap:5,fontFamily:"'DM Sans',sans-serif",animation:`yfadeIn .4s ease ${.1+m*.05}s both`,flexShrink:0},children:[e.jsx("span",{style:{fontSize:".95em"},children:c.icon}),e.jsx("span",{children:c.label})]},c.label))}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:a?"1fr":"repeat(2, 1fr)",gap:a?12:16,marginBottom:18},children:s.map((c,m)=>e.jsxs("button",{onClick:()=>t(c.id),style:{background:"var(--surface, #fff)",border:"1.5px solid var(--border, #e5e5e5)",borderRadius:16,padding:a?"20px 18px":"24px 22px",cursor:"pointer",textAlign:"left",transition:"all .25s cubic-bezier(.2,.8,.2,1)",position:"relative",overflow:"hidden",fontFamily:"inherit",minHeight:a?0:220,display:"flex",flexDirection:"column",animation:`yslideUp .4s cubic-bezier(.2,.8,.2,1) ${.15+m*.08}s both`},onMouseOver:g=>{a||(g.currentTarget.style.transform="translateY(-4px)",g.currentTarget.style.boxShadow="0 14px 32px rgba(0,0,0,.12)",g.currentTarget.style.borderColor="transparent")},onMouseOut:g=>{a||(g.currentTarget.style.transform="none",g.currentTarget.style.boxShadow="none",g.currentTarget.style.borderColor="var(--border, #e5e5e5)")},onTouchStart:g=>{g.currentTarget.style.transform="scale(0.98)"},onTouchEnd:g=>{g.currentTarget.style.transform="none"},children:[e.jsx("div",{style:{position:"absolute",top:-14,right:-14,width:80,height:80,background:c.bgIcon,borderRadius:"50%",zIndex:0}}),c.badge&&e.jsx("div",{style:{position:"absolute",top:12,right:12,background:c.badgeColor,color:"#0d1f14",padding:"3px 9px",borderRadius:50,fontSize:".62rem",fontWeight:800,fontFamily:"'Syne',sans-serif",letterSpacing:".03em",zIndex:2,boxShadow:"0 2px 6px rgba(0,0,0,.15)"},children:c.badge}),e.jsxs("div",{style:{position:"relative",zIndex:1,flex:1,display:"flex",flexDirection:"column"},children:[e.jsx("div",{style:{width:a?48:54,height:a?48:54,borderRadius:13,background:c.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:a?"1.55rem":"1.75rem",marginBottom:12,boxShadow:"0 6px 16px rgba(0,0,0,.14), inset 0 -2px 0 rgba(0,0,0,.08)"},children:c.icon}),e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:a?"1.05rem":"1.15rem",color:"var(--ink, #111)",marginBottom:6,letterSpacing:"-.3px"},children:c.title}),e.jsx("div",{style:{fontSize:a?".8rem":".83rem",color:"var(--gray, #666)",lineHeight:1.55,marginBottom:10,flex:1},children:c.desc}),e.jsx("div",{style:{display:"inline-flex",alignItems:"center",background:"var(--surface2, #f5f5f5)",color:"var(--ink, #111)",padding:"3px 9px",borderRadius:50,fontSize:".66rem",fontWeight:600,marginBottom:12,alignSelf:"flex-start",fontFamily:"'DM Sans',sans-serif"},children:c.miniBadge}),e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:5,fontSize:a?".78rem":".82rem",fontWeight:800,color:"var(--green, #1a6b3a)",fontFamily:"'Syne',sans-serif",letterSpacing:"-.1px"},children:[c.cta," ",e.jsx("span",{style:{fontSize:"1.05em"},children:"→"})]})]})]},c.id))}),e.jsxs("div",{style:{textAlign:"center",paddingTop:14,borderTop:"1px solid var(--border, #e5e5e5)",marginTop:4},children:[o?e.jsx("p",{style:{fontSize:a?".74rem":".78rem",color:"var(--green, #1a6b3a)",marginBottom:8,fontWeight:600},children:"✅ Connecté. Choisissez une action pour continuer."}):e.jsx("p",{style:{fontSize:a?".74rem":".78rem",color:"var(--gray, #666)",marginBottom:8},children:"💡 Pas encore inscrit ? Vous pourrez créer votre compte après avoir choisi."}),e.jsx("button",{onClick:i,style:{background:"transparent",border:"none",color:"var(--gray, #666)",fontSize:".78rem",cursor:"pointer",textDecoration:"underline",fontFamily:"inherit",padding:"4px 8px"},children:"Explorer librement le site"})]}),e.jsx("style",{children:`
          @keyframes yfadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes yslideUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .yorix-trust-badges::-webkit-scrollbar { display: none; }
        `})]})})}const gr="v1.0",jt={seller:{icon:"🏪",label:"Vendeur",color:"#f59e0b",engagement:"Je m'engage à fournir des produits conformes, authentiques et à respecter les transactions Yorix."},provider:{icon:"👷",label:"Prestataire",color:"#8b5cf6",engagement:"Je m'engage à fournir des services conformes, professionnels et à respecter mes clients."},delivery:{icon:"🚚",label:"Livreur",color:"#3b82f6",engagement:"Je m'engage à respecter les tarifs Yorix Ride, livrer les colis avec soin et dans les délais."}};function xn({open:r,onClose:i,onAccepted:t,user:o,userData:a,role:d="seller",authForm:s={}}){const[p,c]=l.useState(!1),[m,g]=l.useState(!1),[h,k]=l.useState(!1),[v,z]=l.useState(!1),[w,f]=l.useState(""),b=l.useRef(null);if(l.useEffect(()=>{r&&(c(!1),g(!1),k(!1),f(""))},[r]),!r)return null;const y=jt[d]||jt.seller,M=T=>{const I=T.target;I.scrollHeight-I.scrollTop-I.clientHeight<50&&!p&&c(!0)},E=()=>{if(!p){f("Veuillez d'abord lire l'intégralité du contrat (scrollez jusqu'en bas).");return}if(!m){f("Vous devez cocher la case d'acceptation pour continuer.");return}f(""),k(!0)},q=async()=>{z(!0),f("");try{let T="unknown";try{T=(await(await fetch("https://api.ipify.org?format=json")).json()).ip||"unknown"}catch(pe){console.warn("Impossible de récupérer l'IP:",pe)}const I=navigator.userAgent||"unknown",ae=(s==null?void 0:s.nom)||(a==null?void 0:a.nom)||"Inconnu",V=(s==null?void 0:s.tel)||(a==null?void 0:a.telephone)||"Inconnu",{error:U}=await R.from("user_contract_acceptance").insert({user_id:(o==null?void 0:o.id)||null,full_name:ae,phone:V,role:d,contract_version:gr,accepted_at:new Date().toISOString(),ip_address:T,user_agent:I,acceptance_checkbox:!0,otp_verified:!1,signature_type:"checkbox_v1"});U&&console.warn("Acceptance DB error:",U),z(!1),k(!1),t({version:gr,acceptedAt:new Date().toISOString(),ip:T,userAgent:I})}catch(T){console.error("Erreur acceptance:",T),f("Erreur : "+(T.message||"Impossible d'enregistrer l'acceptation.")),z(!1)}};return e.jsxs(e.Fragment,{children:[e.jsx("div",{onClick:T=>T.target===T.currentTarget&&!v&&i(),style:{position:"fixed",inset:0,background:"rgba(10, 20, 16, 0.88)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",zIndex:99998,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",animation:"yfadeIn .25s ease"},children:e.jsxs("div",{style:{background:"var(--surface, #fff)",borderRadius:18,maxWidth:720,width:"100%",maxHeight:"92vh",display:"flex",flexDirection:"column",boxShadow:"0 28px 70px rgba(0,0,0,.45)",animation:"yslideUp .3s cubic-bezier(.2,.8,.2,1)",overflow:"hidden"},children:[e.jsxs("div",{style:{background:"linear-gradient(135deg, #0a1410 0%, #1a3a24 100%)",padding:"20px 24px",color:"#fff",position:"relative"},children:[e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:6,background:y.color,color:"#fff",padding:"4px 12px",borderRadius:50,fontSize:".7rem",fontWeight:700,marginBottom:8},children:[y.icon," Inscription ",y.label]}),e.jsx("h2",{style:{fontFamily:"'Syne',sans-serif",fontSize:"1.3rem",fontWeight:800,marginBottom:4,letterSpacing:"-.4px",lineHeight:1.2},children:"Contrat d'utilisation et d'engagement Yorix"}),e.jsx("p",{style:{color:"rgba(255,255,255,.7)",fontSize:".82rem",lineHeight:1.5,marginBottom:0},children:"Veuillez lire attentivement ces conditions. L'inscription implique votre engagement contractuel."}),e.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,height:3,background:"rgba(255,255,255,.15)"},children:e.jsx("div",{style:{height:"100%",background:"linear-gradient(90deg, var(--yellow, #fcd116), #4fd17d)",width:p?"100%":"20%",transition:"width .4s"}})})]}),e.jsxs("div",{ref:b,onScroll:M,style:{padding:"20px 24px",overflowY:"auto",flex:1,fontSize:".84rem",lineHeight:1.65,color:"var(--ink, #111)",fontFamily:"'DM Sans',sans-serif"},children:[e.jsx(hn,{role:d,roleInfo:y}),!p&&e.jsx("div",{style:{position:"sticky",bottom:0,textAlign:"center",padding:"10px",background:"linear-gradient(to top, var(--surface, #fff) 60%, rgba(255,255,255,0))",pointerEvents:"none",fontSize:".74rem",color:"var(--gray, #666)",fontWeight:600},children:"⬇ Continuez à scroller pour activer l'acceptation"}),p&&e.jsx("div",{style:{textAlign:"center",padding:"12px",marginTop:16,background:"var(--green-pale, #e8f5e9)",border:"1px solid var(--green-light, #86efac)",borderRadius:9,fontSize:".78rem",color:"var(--green, #1a6b3a)",fontWeight:700},children:"✓ Vous avez lu l'intégralité du contrat"})]}),e.jsxs("div",{style:{borderTop:"1px solid var(--border, #e5e5e5)",padding:"16px 24px",background:"var(--surface2, #f8f8f8)"},children:[e.jsxs("div",{style:{background:`${y.color}15`,border:`1.5px solid ${y.color}40`,borderRadius:9,padding:"10px 12px",marginBottom:12,fontSize:".78rem",color:"var(--ink, #111)",fontWeight:600,display:"flex",alignItems:"flex-start",gap:8},children:[e.jsx("span",{style:{fontSize:"1.1rem",flexShrink:0},children:y.icon}),e.jsx("span",{children:y.engagement})]}),e.jsxs("label",{style:{display:"flex",alignItems:"flex-start",gap:10,cursor:p?"pointer":"not-allowed",opacity:p?1:.5,marginBottom:12,userSelect:"none"},children:[e.jsx("input",{type:"checkbox",checked:m,onChange:T=>{p&&g(T.target.checked)},disabled:!p,style:{marginTop:2,width:18,height:18,cursor:p?"pointer":"not-allowed",accentColor:"var(--green, #1a6b3a)",flexShrink:0}}),e.jsx("span",{style:{fontSize:".82rem",lineHeight:1.5,color:"var(--ink, #111)",fontWeight:600},children:"J'ai lu, compris et j'accepte les conditions d'utilisation, commissions, règles et engagements de Yorix."})]}),e.jsx("p",{style:{fontSize:".7rem",color:"var(--gray, #666)",marginBottom:12,lineHeight:1.5},children:"🛡️ Cette étape protège Yorix, vos clients et votre activité. Yorix protège ses utilisateurs grâce à des engagements de transparence, qualité et sécurité."}),w&&e.jsxs("div",{style:{background:"#fff0f0",border:"1px solid #fecaca",color:"#ce1126",padding:"8px 12px",borderRadius:7,fontSize:".78rem",marginBottom:10},children:["⚠️ ",w]}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx("button",{onClick:i,disabled:v,style:{flex:1,background:"var(--surface, #fff)",color:"var(--ink, #111)",border:"1.5px solid var(--border, #e5e5e5)",padding:"12px 16px",borderRadius:9,fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".85rem",cursor:v?"not-allowed":"pointer"},children:"Annuler"}),e.jsx("button",{onClick:E,disabled:!p||!m||v,style:{flex:2,background:p&&m?"linear-gradient(135deg, var(--green, #1a6b3a), #0d4d28)":"var(--border, #e5e5e5)",color:p&&m?"#fff":"var(--gray, #666)",border:"none",padding:"12px 16px",borderRadius:9,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".88rem",cursor:p&&m&&!v?"pointer":"not-allowed",transition:"all .2s"},children:"✓ Accepter et continuer"})]})]})]})}),h&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",backdropFilter:"blur(4px)",zIndex:99999,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",animation:"yfadeIn .2s ease"},children:e.jsxs("div",{style:{background:"var(--surface, #fff)",borderRadius:14,maxWidth:440,width:"100%",padding:"24px 22px",boxShadow:"0 20px 50px rgba(0,0,0,.4)",animation:"yslideUp .3s cubic-bezier(.2,.8,.2,1)"},children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:16},children:[e.jsx("div",{style:{fontSize:"2.5rem",marginBottom:8},children:"📜"}),e.jsx("h3",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.15rem",color:"var(--ink, #111)",marginBottom:6,letterSpacing:"-.3px"},children:"Confirmer votre engagement"}),e.jsxs("p",{style:{fontSize:".84rem",color:"var(--gray, #666)",lineHeight:1.6},children:["En acceptant, vous reconnaissez être ",e.jsx("strong",{style:{color:"var(--ink, #111)"},children:"légalement engagé"})," envers les conditions Yorix. Cette acceptation sera tracée et conservée comme preuve."]})]}),e.jsxs("div",{style:{background:"var(--surface2, #f5f5f5)",border:"1px solid var(--border, #e5e5e5)",borderRadius:9,padding:"12px 14px",marginBottom:14,fontSize:".74rem"},children:[e.jsx("div",{style:{fontWeight:700,marginBottom:6,color:"var(--gray, #666)"},children:"📋 Informations enregistrées :"}),e.jsxs("div",{style:{color:"var(--ink, #111)",lineHeight:1.7},children:[e.jsxs("div",{children:["👤 ",e.jsx("strong",{children:(s==null?void 0:s.nom)||(a==null?void 0:a.nom)||"—"})]}),e.jsxs("div",{children:["📞 ",(s==null?void 0:s.tel)||(a==null?void 0:a.telephone)||"—"]}),e.jsxs("div",{children:[y.icon," Rôle : ",y.label]}),e.jsxs("div",{children:["📅 ",new Date().toLocaleString("fr-FR")]}),e.jsxs("div",{children:["📝 Contrat version ",gr]})]})]}),w&&e.jsxs("div",{style:{background:"#fff0f0",border:"1px solid #fecaca",color:"#ce1126",padding:"8px 12px",borderRadius:7,fontSize:".78rem",marginBottom:10},children:["⚠️ ",w]}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx("button",{onClick:()=>k(!1),disabled:v,style:{flex:1,background:"var(--surface, #fff)",color:"var(--ink, #111)",border:"1.5px solid var(--border, #e5e5e5)",padding:"11px 16px",borderRadius:9,fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".82rem",cursor:v?"not-allowed":"pointer"},children:"← Annuler"}),e.jsx("button",{onClick:q,disabled:v,style:{flex:1.5,background:"linear-gradient(135deg, var(--green, #1a6b3a), #0d4d28)",color:"#fff",border:"none",padding:"11px 16px",borderRadius:9,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".82rem",cursor:v?"wait":"pointer",opacity:v?.7:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6},children:v?e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{width:14,height:14,border:"2px solid #fff",borderTopColor:"transparent",borderRadius:"50%",animation:"spin .7s linear infinite"}}),"Enregistrement..."]}):"✓ Accepter et continuer"})]})]})}),e.jsx("style",{children:`
        @keyframes yfadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes yslideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `})]})}function hn({role:r,roleInfo:i}){const t=({children:a})=>e.jsx("h3",{style:{fontFamily:"'Syne',sans-serif",fontSize:".95rem",fontWeight:800,color:"var(--ink, #111)",marginTop:18,marginBottom:8,letterSpacing:"-.2px"},children:a}),o=({children:a})=>e.jsx("h4",{style:{fontFamily:"'Syne',sans-serif",fontSize:".84rem",fontWeight:700,color:"var(--ink, #111)",marginTop:12,marginBottom:6},children:a});return e.jsxs("div",{children:[e.jsxs("div",{style:{background:"var(--green-pale, #e8f5e9)",border:"1px solid var(--green-light, #86efac)",borderRadius:9,padding:"10px 12px",marginBottom:14,fontSize:".78rem"},children:[e.jsxs("div",{style:{fontWeight:700,color:"var(--green, #1a6b3a)",marginBottom:4},children:["📜 Contrat Yorix CM — Version v1.0 — ",new Date().toLocaleDateString("fr-FR")]}),e.jsx("div",{style:{color:"var(--ink, #111)"},children:"Marketplace camerounaise • Vendeurs • Prestataires • Livreurs"})]}),e.jsx(t,{children:"PRÉAMBULE"}),e.jsxs("p",{children:["Le présent contrat régit les relations entre ",e.jsx("strong",{children:"YORIX CAMEROUN"})," (« Yorix »), exploitant www.yorix.cm, et toute personne physique ou morale (« l'Utilisateur Professionnel ») souhaitant proposer des produits, services ou livraisons via la Plateforme."]}),e.jsx("p",{children:"En cochant la case d'acceptation, vous reconnaissez avoir lu, compris et accepté l'intégralité des présentes conditions, et vous engagez juridiquement à les respecter."}),e.jsx(t,{children:"ARTICLE 1 — OBJET"}),e.jsxs("p",{children:["Le présent Contrat définit les conditions d'utilisation de Yorix pour vendre des produits, proposer des services ou effectuer des livraisons. L'inscription est ",e.jsx("strong",{children:"gratuite"}),". Yorix se rémunère via une commission de 5% sur chaque transaction."]}),e.jsx(t,{children:"ARTICLE 2 — INSCRIPTION ET VÉRIFICATION"}),e.jsxs("p",{children:["Pour vous inscrire, vous devez : être âgé d'",e.jsx("strong",{children:"au moins 18 ans"}),", disposer d'une ",e.jsx("strong",{children:"pièce d'identité valide"}),", fournir un ",e.jsx("strong",{children:"numéro camerounais"})," actif (MTN ou Orange) et fournir des informations exactes."]}),e.jsx("p",{children:"Yorix se réserve le droit de demander des justificatifs (CNI, attestation, photo) à tout moment. Les comptes non vérifiés peuvent être suspendus."}),e.jsx(t,{children:"ARTICLE 3 — ENGAGEMENTS COMMUNS"}),e.jsx("p",{children:"En vous inscrivant, vous vous engagez à :"}),e.jsxs("ul",{style:{paddingLeft:20,marginTop:6},children:[e.jsx("li",{children:"Respecter les Acheteurs : courtoisie, professionnalisme, honnêteté"}),e.jsx("li",{children:"Fournir des informations exactes"}),e.jsx("li",{children:"Respecter les engagements (délai, qualité, prix)"}),e.jsxs("li",{children:[e.jsx("strong",{children:"Ne jamais contourner Yorix"})," en proposant un paiement direct hors plateforme"]}),e.jsx("li",{children:"Ne pas frauder (faux avis, faux profils, doubles comptes)"}),e.jsx("li",{children:"Respecter les lois camerounaises en vigueur"}),e.jsx("li",{children:"Maintenir un comportement professionnel"}),e.jsx("li",{children:"Coopérer avec Yorix en cas de litige"})]}),e.jsx(t,{children:"ARTICLE 4 — ENGAGEMENT SPÉCIFIQUE À VOTRE RÔLE"}),e.jsxs("div",{style:{background:`${i.color}15`,border:`1.5px solid ${i.color}50`,borderRadius:9,padding:"12px 14px",marginTop:8},children:[e.jsxs("div",{style:{fontWeight:800,marginBottom:6,color:"var(--ink, #111)"},children:[i.icon," En tant que ",i.label]}),r==="seller"&&e.jsxs("ul",{style:{paddingLeft:20,marginTop:4},children:[e.jsxs("li",{children:["Je m'engage à fournir des ",e.jsx("strong",{children:"produits conformes"})," à leur description"]}),e.jsxs("li",{children:["Je garantis que mes produits sont ",e.jsx("strong",{children:"authentiques et légaux"})]}),e.jsxs("li",{children:["Je m'engage à ",e.jsx("strong",{children:"expédier dans les délais"})," annoncés"]}),e.jsxs("li",{children:["J'accepte la ",e.jsx("strong",{children:"commission Yorix de 5%"})," sur chaque vente"]}),e.jsxs("li",{children:["J'accepte le système ",e.jsx("strong",{children:"Escrow"})," (libération des fonds après livraison validée)"]}),e.jsxs("li",{children:["Je m'engage à ",e.jsx("strong",{children:"rembourser"})," en cas de produit non conforme"]}),e.jsxs("li",{children:["Je ne vendrai ",e.jsx("strong",{children:"jamais de produits contrefaits, illégaux ou dangereux"})]})]}),r==="provider"&&e.jsxs("ul",{style:{paddingLeft:20,marginTop:4},children:[e.jsxs("li",{children:["Je m'engage à fournir des ",e.jsx("strong",{children:"services conformes et professionnels"})]}),e.jsxs("li",{children:["Je garantis avoir les ",e.jsx("strong",{children:"qualifications nécessaires"})]}),e.jsxs("li",{children:["Je m'engage à ",e.jsx("strong",{children:"respecter les rendez-vous"})," et délais"]}),e.jsxs("li",{children:["Je facture des ",e.jsx("strong",{children:"tarifs justes et transparents"})]}),e.jsxs("li",{children:["Tarifs Yorix recommandés : ",e.jsx("strong",{children:"10 000 FCFA / projet"})," ou ",e.jsx("strong",{children:"5 000 FCFA / heure"})]}),e.jsxs("li",{children:["J'accepte la ",e.jsx("strong",{children:"commission Yorix de 5%"})]}),e.jsxs("li",{children:["Je ne solliciterai ",e.jsx("strong",{children:"jamais de paiement hors Yorix"})," pour contourner la commission"]})]}),r==="delivery"&&e.jsxs("ul",{style:{paddingLeft:20,marginTop:4},children:[e.jsxs("li",{children:["Je m'engage à ",e.jsx("strong",{children:"respecter les tarifs Yorix Ride"})," affichés au client"]}),e.jsxs("li",{children:["Je m'engage à ",e.jsx("strong",{children:"livrer les colis confiés"})," dans les délais"]}),e.jsxs("li",{children:["J'accepte la ",e.jsx("strong",{children:"commission Yorix"})," sur chaque livraison"]}),e.jsxs("li",{children:["Je dispose d'un ",e.jsx("strong",{children:"véhicule en bon état"})," et des ",e.jsx("strong",{children:"documents légaux"})]}),e.jsxs("li",{children:["Je traiterai les colis avec ",e.jsx("strong",{children:"soin et confidentialité"})]}),e.jsxs("li",{children:["En cas de ",e.jsx("strong",{children:"perte ou détérioration"}),", j'accepte d'être tenu responsable"]}),e.jsxs("li",{children:["Je n'effectuerai ",e.jsx("strong",{children:"aucune livraison illégale"})," (drogues, armes, contrefaçons)"]})]})]}),e.jsx(t,{children:"ARTICLE 5 — COMMISSIONS ET PAIEMENTS"}),e.jsx(o,{children:"5.1 Commission Yorix"}),e.jsxs("p",{children:["Yorix prélève une ",e.jsx("strong",{children:"commission de 5%"})," sur chaque transaction. Exemple : pour 10 000 FCFA, vous recevez 9 500 FCFA."]}),e.jsx(o,{children:"5.2 Paiement"}),e.jsxs("p",{children:["Versement via ",e.jsx("strong",{children:"MTN MoMo"})," ou ",e.jsx("strong",{children:"Orange Money"}),", au plus tard ",e.jsx("strong",{children:"48 heures"})," après validation de la livraison/prestation."]}),e.jsx(o,{children:"5.3 Modification des commissions"}),e.jsxs("p",{children:["Yorix peut modifier les commissions avec un ",e.jsx("strong",{children:"préavis de 30 jours"}),"."]}),e.jsx(t,{children:"ARTICLE 6 — SYSTÈME ESCROW"}),e.jsxs("p",{children:["Les fonds versés par l'Acheteur sont ",e.jsx("strong",{children:"bloqués chez Yorix"})," jusqu'à validation de la livraison. En cas de litige, Yorix arbitre sous ",e.jsx("strong",{children:"48h maximum"}),"."]}),e.jsx(t,{children:"ARTICLE 7 — NOTATION ET RÉPUTATION"}),e.jsxs("p",{children:["Les Acheteurs notent de ",e.jsx("strong",{children:"1 à 5 étoiles"}),". Une note moyenne sous ",e.jsx("strong",{children:"3,0/5"})," sur plus de 10 avis peut entraîner suspension. Tout faux avis entraîne l'",e.jsx("strong",{children:"exclusion immédiate"}),"."]}),e.jsx(t,{children:"ARTICLE 8 — INTERDICTIONS ET SANCTIONS"}),e.jsx("p",{children:e.jsx("strong",{children:"Strictement interdit :"})}),e.jsxs("ul",{style:{paddingLeft:20},children:[e.jsx("li",{children:"Contournement de la plateforme (paiement direct)"}),e.jsx("li",{children:"Faux avis, faux profils, fausses livraisons"}),e.jsx("li",{children:"Vente de produits illégaux, contrefaits, dangereux"}),e.jsx("li",{children:"Discrimination, harcèlement, propos haineux"}),e.jsx("li",{children:"Usurpation d'identité"}),e.jsx("li",{children:"Tentative de piratage"})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Sanctions :"})," avertissement, suspension (24h-30j), exclusion définitive, retenue des paiements, poursuites judiciaires."]}),e.jsx(t,{children:"ARTICLE 9 — RESPONSABILITÉ"}),e.jsxs("p",{children:["Vous êtes ",e.jsx("strong",{children:"seul responsable"})," de vos produits/services/livraisons. Yorix agit comme ",e.jsx("strong",{children:"intermédiaire technique"}),"."]}),e.jsx(t,{children:"ARTICLE 10 — DONNÉES PERSONNELLES"}),e.jsxs("p",{children:["Vos données sont stockées de manière sécurisée et jamais revendues. Droit d'accès, rectification, suppression : ",e.jsx("strong",{children:"support@yorix.cm"}),"."]}),e.jsx(t,{children:"ARTICLE 11 — TRAÇABILITÉ DE L'ACCEPTATION"}),e.jsxs("p",{children:["En cochant la case, sont enregistrés : votre nom, téléphone, rôle, date/heure, IP, navigateur, version du contrat. Ces informations constituent une ",e.jsx("strong",{children:"preuve juridique"}),"."]}),e.jsx(t,{children:"ARTICLE 12 — MODIFICATION DU CONTRAT"}),e.jsx("p",{children:"Yorix peut modifier ce contrat. Vous serez notifié par email et devrez réaccepter la nouvelle version lors de votre prochaine connexion."}),e.jsx(t,{children:"ARTICLE 13 — RÉSILIATION"}),e.jsxs("p",{children:["Vous pouvez résilier à tout moment via ",e.jsx("strong",{children:"support@yorix.cm"}),". Yorix peut résilier sans préavis en cas de manquement grave, fraude."]}),e.jsx(t,{children:"ARTICLE 14 — DROIT APPLICABLE"}),e.jsxs("p",{children:["Contrat régi par le ",e.jsx("strong",{children:"droit camerounais"}),". En cas de litige : tribunaux compétents de ",e.jsx("strong",{children:"Douala"}),"."]}),e.jsx(t,{children:"ARTICLE 15 — CONTACT"}),e.jsxs("p",{children:["📧 support@yorix.cm",e.jsx("br",{}),"📱 +237 696 56 56 54",e.jsx("br",{}),"📍 Douala / Yaoundé, Cameroun"]}),e.jsxs("div",{style:{marginTop:24,padding:"14px 16px",background:"linear-gradient(135deg, #1a3a24, #0d3320)",borderRadius:11,color:"#fff"},children:[e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".95rem",marginBottom:6},children:"🤝 Engagement final"}),e.jsx("p",{style:{color:"rgba(255,255,255,.85)",fontSize:".82rem",lineHeight:1.6,marginBottom:0},children:"En acceptant, je reconnais que je ne crée pas simplement un compte. Je m'engage à respecter un système, des engagements professionnels et des obligations légales. Yorix protège ses utilisateurs grâce à des engagements de transparence, qualité et sécurité."})]}),e.jsx("p",{style:{textAlign:"center",marginTop:16,fontSize:".7rem",color:"var(--gray, #666)"},children:"🇨🇲 Yorix CM — La marketplace de confiance du Cameroun"})]})}function bn({value:r="",onChange:i,placeholder:t="Entrez votre mot de passe",showStrength:o=!1,showRules:a=!1,confirmValue:d=null,autoComplete:s="current-password",autoMask:p=10,id:c,ariaLabel:m="Mot de passe"}){const[g,h]=l.useState(!1),[k,v]=l.useState(!1),z=l.useRef(null),w=l.useRef(null);l.useEffect(()=>(g&&p>0&&(w.current=setTimeout(()=>{h(!1)},p*1e3)),()=>{w.current&&clearTimeout(w.current)}),[g,p]);const f=T=>{T.preventDefault(),T.stopPropagation(),h(I=>!I),setTimeout(()=>{var I;return(I=z.current)==null?void 0:I.focus()},0)},b=l.useMemo(()=>{if(!r)return{score:0,label:"",color:""};let T=0;return r.length>=6&&T++,r.length>=10&&T++,/[A-Z]/.test(r)&&T++,/[0-9]/.test(r)&&T++,/[^A-Za-z0-9]/.test(r)&&T++,T<=1?{score:1,label:"Faible",color:"#dc2626"}:T<=2?{score:2,label:"Moyen",color:"#f59e0b"}:T<=3?{score:3,label:"Bon",color:"#3b82f6"}:T<=4?{score:4,label:"Fort",color:"#16a34a"}:{score:5,label:"Très fort",color:"#15803d"}},[r]),y=l.useMemo(()=>({length:r.length>=6,uppercase:/[A-Z]/.test(r),digit:/[0-9]/.test(r)}),[r]),M=d!==null?r&&d&&r===d:null,E=d!==null?d.length>0&&r!==d:!1,q=()=>E?"var(--red, #dc2626)":M||k?"var(--green, #1a6b3a)":"var(--border, #e5e5e5)";return e.jsxs("div",{style:{width:"100%"},children:[e.jsxs("div",{style:{position:"relative",width:"100%"},children:[e.jsx("input",{ref:z,id:c,type:g?"text":"password",value:r,onChange:T=>i(T.target.value),onFocus:()=>v(!0),onBlur:()=>v(!1),placeholder:t,autoComplete:s,"aria-label":m,style:{width:"100%",padding:"12px 48px 12px 14px",borderRadius:9,border:`1.5px solid ${q()}`,background:"var(--surface, #fff)",color:"var(--ink, #111)",fontSize:".88rem",fontFamily:"'DM Sans',sans-serif",outline:"none",transition:"border-color .15s",boxSizing:"border-box",letterSpacing:g?"0.02em":"0.1em"}}),e.jsx("button",{type:"button",onClick:f,"aria-label":g?"Masquer le mot de passe":"Afficher le mot de passe",title:g?"Masquer le mot de passe":"Afficher le mot de passe",tabIndex:0,style:{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",background:"transparent",border:"none",cursor:"pointer",padding:8,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--gray, #666)",transition:"background .15s, color .15s"},onMouseOver:T=>{T.currentTarget.style.background="var(--surface2, #f5f5f5)",T.currentTarget.style.color="var(--green, #1a6b3a)"},onMouseOut:T=>{T.currentTarget.style.background="transparent",T.currentTarget.style.color="var(--gray, #666)"},children:g?e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[e.jsx("path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"}),e.jsx("circle",{cx:"12",cy:"12",r:"3"})]}):e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[e.jsx("path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24"}),e.jsx("path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"}),e.jsx("path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"}),e.jsx("line",{x1:"2",y1:"2",x2:"22",y2:"22"})]})})]}),o&&r&&e.jsxs("div",{style:{marginTop:6},children:[e.jsx("div",{style:{display:"flex",gap:3,marginBottom:4},children:[1,2,3,4,5].map(T=>e.jsx("div",{style:{flex:1,height:4,borderRadius:2,background:T<=b.score?b.color:"var(--border, #e5e5e5)",transition:"background .25s"}},T))}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:".68rem",fontFamily:"'DM Sans',sans-serif"},children:[e.jsx("span",{style:{color:"var(--gray, #666)"},children:"💪 Force du mot de passe"}),e.jsx("span",{style:{color:b.color,fontWeight:700},children:b.label})]})]}),a&&r&&e.jsxs("div",{style:{marginTop:8,padding:"8px 10px",background:"var(--surface2, #f5f5f5)",border:"1px solid var(--border, #e5e5e5)",borderRadius:7,display:"flex",flexDirection:"column",gap:3},children:[e.jsx(xr,{ok:y.length,text:"Au moins 6 caractères"}),e.jsx(xr,{ok:y.uppercase,text:"Une majuscule (recommandé)",optional:!0}),e.jsx(xr,{ok:y.digit,text:"Un chiffre (recommandé)",optional:!0})]}),d!==null&&d.length>0&&e.jsx("div",{style:{marginTop:6,fontSize:".74rem",fontFamily:"'DM Sans',sans-serif",fontWeight:600,color:M?"var(--green, #16a34a)":"var(--red, #dc2626)",display:"flex",alignItems:"center",gap:5},children:M?e.jsx(e.Fragment,{children:"✓ Les mots de passe correspondent"}):e.jsx(e.Fragment,{children:"✗ Les mots de passe ne correspondent pas"})})]})}function xr({ok:r,text:i,optional:t}){return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:".72rem",color:r?"var(--green, #16a34a)":"var(--gray, #666)",fontFamily:"'DM Sans',sans-serif"},children:[e.jsx("span",{style:{width:14,height:14,borderRadius:"50%",background:r?"var(--green, #16a34a)":"var(--border, #e5e5e5)",color:"#fff",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:".55rem",fontWeight:800,flexShrink:0},children:r?"✓":"·"}),e.jsxs("span",{children:[i,t&&!r&&e.jsx("span",{style:{opacity:.6,fontSize:".66rem"},children:" (optionnel)"})]})]})}function vn(){var et,rt,tt;const r=uo(),i=Et(),t=l.useMemo(()=>_o(i.pathname),[i.pathname]),o=t.page,[a,d]=l.useState(!1),[s,p]=l.useState(null),[c,m]=l.useState(null),[g,h]=l.useState(null),[k,v]=l.useState(!0),[z,w]=l.useState(!1),[f,b]=l.useState("login"),[y,M]=l.useState("buyer"),[E,q]=l.useState({nom:"",email:"",tel:"",password:""}),[T,I]=l.useState(""),[ae,V]=l.useState(!1),[U,pe]=l.useState([]),[C,P]=l.useState(!0),[Y,G]=l.useState([]);l.useEffect(()=>{(async()=>{const{data:u,error:x}=await R.from("services").select("*").eq("actif",!0).eq("disponible",!0).order("created_at",{ascending:!1});x||G(u||[])})()},[]);const[L,fe]=l.useState(""),[re,te]=l.useState(""),[ue,we]=l.useState(()=>Ja());l.useEffect(()=>{Ga(ue)},[ue]);const[Gt,ke]=l.useState(!1),[je,me]=l.useState([]),[Mr,Me]=l.useState(()=>X()),Pr=l.useRef(Mr);Pr.current=Mr;const[Kt,Qt]=l.useState(!1),[Pe,ie]=l.useState(!1),Qe=l.useRef(null),[Se,Zt]=l.useState(()=>Nr());l.useEffect(()=>{let n=!1;const u=()=>{n||(n=!0,requestAnimationFrame(()=>{n=!1,Qt(window.scrollY>16)}))};return u(),window.addEventListener("scroll",u,{passive:!0}),()=>window.removeEventListener("scroll",u)},[]),l.useEffect(()=>{if(!Pe)return;const n=u=>{Qe.current&&!Qe.current.contains(u.target)&&ie(!1)};return document.addEventListener("mousedown",n),()=>document.removeEventListener("mousedown",n)},[Pe]),l.useEffect(()=>{let n=!1;return(async()=>{try{const{data:u,error:x}=await R.from("commerce_settings").select("free_shipping_threshold_xaf, standard_delivery_fee_xaf").eq("id",1).maybeSingle();if(n||x||!u)return;Zt(Ut({freeShippingThresholdXaf:Number(u.free_shipping_threshold_xaf),standardDeliveryFeeXaf:Number(u.standard_delivery_fee_xaf)}))}catch{}})(),()=>{n=!0}},[]);const Ir=l.useCallback(async(n,u=40)=>{if(!n)return;const{data:x,error:S}=await R.from("notifications").select("*").eq("user_id",n).order("created_at",{ascending:!1}).limit(u);S?console.warn("Notifications:",S.message):me(x||[])},[]);l.useEffect(()=>{if(!(s!=null&&s.id)){Me(X());return}let n=!1;return Jt(R,s.id).then(u=>{n||Me(u)}),()=>{n=!0}},[s==null?void 0:s.id]);const[H,ne]=l.useState("overview"),[Lr,ei]=l.useState(!1),[Ce,Ze]=l.useState(""),[er,rr]=l.useState(!1),[Ie,ri]=l.useState(new Set),[ti,ii]=l.useState(320),[oi,ai]=l.useState("TOUT"),[ni,ge]=l.useState(null),[si,tr]=l.useState(!1),[li,ir]=l.useState(!1),[ci,Or]=l.useState(!1),[yn,Dr]=l.useState(null),[di,ze]=l.useState(!1),[xe,qr]=l.useState(null),[Le,pi]=l.useState([]),[fi,Br]=l.useState(!0),[Fr,or]=l.useState(null),[_e,Oe]=l.useState(null),[ui,Te]=l.useState(!1);l.useEffect(()=>{(async()=>{Br(!0);const{data:u,error:x}=await R.from("academy_courses").select("*").eq("actif",!0).order("prix",{ascending:!0});x||pi(u||[]),Br(!1)})()},[]);const mi=l.useCallback(n=>{n!=null&&n.id&&(or(n),r(pr("academyDetail",{courseId:n.id})))},[r]),gi=l.useCallback(n=>{n!=null&&n.id&&(or(n),r(pr("academyContact",{courseId:n.id})))},[r]),[xi,Yr]=l.useState(!1),[hi,$r]=l.useState(!1),[bi,he]=l.useState(""),[_,vi]=l.useState({nom:"",prenom:"",tel:"",email:"",metier:"",ville:"",experience:"",tarif:"",bio:""}),yi=async()=>{if(he(""),!_.nom.trim()){he("Le nom est obligatoire");return}if(!_.tel.trim()){he("Le téléphone est obligatoire");return}if(!_.metier){he("Veuillez choisir un métier");return}if(_.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(_.email)){he("Email invalide");return}$r(!0);try{const{data:n,error:u}=await R.from("prestataires").insert({nom:_.nom,prenom:_.prenom||null,telephone:_.tel,email:_.email||null,metier:_.metier,ville:_.ville||null,experience:_.experience||null,tarif:_.tarif||null,bio:_.bio||null,status:"pending",user_id:(s==null?void 0:s.id)||null}).select().single();u&&console.warn("Table prestataires Supabase:",u.message);const x=["👷 *NOUVELLE CANDIDATURE PRESTATAIRE YORIX*","","👤 *Informations*",`Nom : ${_.nom}${_.prenom?" "+_.prenom:""}`,`Téléphone : ${_.tel}`,_.email?`Email : ${_.email}`:"","","💼 *Profil professionnel*",`Métier : ${_.metier}`,_.ville?`Ville : ${_.ville}`:"",_.experience?`Expérience : ${_.experience}`:"",_.tarif?`Tarif : ${_.tarif}`:"","",_.bio?`📝 *Présentation*
${_.bio}`:"","","✅ *Actions à faire*","1. Contacter le candidat sous 24h","2. Vérifier les qualifications","3. Valider ou refuser le profil","","Yorix CM 🇨🇲"].filter(Boolean).join(`
`),S=`https://wa.me/${Ve}?text=${encodeURIComponent(x)}`;window.open(S,"_blank");const O=`Nouvelle candidature prestataire — ${_.nom} (${_.metier})`,N=["Bonjour,","","Nouvelle candidature prestataire sur Yorix CM :","",`👤 Nom : ${_.nom}${_.prenom?" "+_.prenom:""}`,`📞 Téléphone : ${_.tel}`,_.email?`📧 Email : ${_.email}`:"",`💼 Métier : ${_.metier}`,_.ville?`📍 Ville : ${_.ville}`:"",_.experience?`⏱ Expérience : ${_.experience}`:"",_.tarif?`💰 Tarif : ${_.tarif}`:"","",_.bio?`📝 Présentation :
${_.bio}`:"","","---","Envoyé depuis yorix.cm"].filter(Boolean).join(`
`),$=`mailto:raisaodin1@gmail.com?subject=${encodeURIComponent(O)}&body=${encodeURIComponent(N)}`;setTimeout(()=>window.open($,"_blank"),500),Yr(!0)}catch(n){console.error("soumettreCandidaturePrestataire:",n),he("Erreur : "+(n.message||"Impossible d'envoyer la candidature. Réessayez."))}$r(!1)},[wi,wn]=l.useState([{text:"Bonjour ! Comment puis-je vous aider ?",me:!1,time:"10:02"}]),[kn,jn]=l.useState(""),[Sn,Cn]=l.useState(!1),ki=l.useRef(null);l.useEffect(()=>{if(!localStorage.getItem("yorix_onboarding_seen")){const u=setTimeout(()=>ze(!0),800);return()=>clearTimeout(u)}},[]);const ji=l.useCallback(n=>{localStorage.setItem("yorix_onboarding_seen","1"),ze(!1);const x={buy:{needAuth:!1,page:"produits"},sell:{needAuth:!0,role:"seller",page:"dashboard"},service:{needAuth:!1,page:"prestataires"},delivery:{needAuth:!0,role:"buyer",action:"openDelivery"}}[n];if(x){if(x.needAuth&&!s){qr(n),M(x.role||"buyer"),b("register"),w(!0);return}ar(n)}},[s]),ar=l.useCallback(n=>{const u=n||xe;u&&(u==="buy"?j("produits"):u==="sell"?j("dashboard"):u==="service"?j("prestataires"):u==="delivery"&&(j("livraison"),setTimeout(()=>tr(!0),300)),qr(null))},[xe]),Si=l.useCallback(()=>{localStorage.setItem("yorix_onboarding_seen","1"),ze(!1)},[]),j=l.useCallback((n,u={})=>{r(pr(n,u)),window.scrollTo(0,0),ke(!1)},[r]);l.useEffect(()=>{let n=!1;R.auth.getSession().then(({data:{session:x},error:S})=>{n||(S&&console.warn("Auth getSession:",S.message),x!=null&&x.user&&(p(x.user),De(x.user.id)),v(!1))}).catch(x=>{console.warn("Auth getSession:",(x==null?void 0:x.message)||x),n||v(!1)});const{data:{subscription:u}}=R.auth.onAuthStateChange((x,S)=>{S!=null&&S.user?(p(S.user),De(S.user.id)):(p(null),m(null),h(null),me([]))});return()=>{n=!0,u.unsubscribe()}},[]);const De=async n=>{const u=await xa(n),x=ha(u);m(u),h(x),await Ir(n,40)};l.useEffect(()=>{if(!(s!=null&&s.id))return;const n=R.channel(`notifications_rt_${s.id}`).on("postgres_changes",{event:"INSERT",schema:"public",table:"notifications",filter:`user_id=eq.${s.id}`},u=>{const x=u.new;me(S=>S.some(O=>O.id===x.id)?S:[x,...S].slice(0,120));try{ln(Rr(x),Pr.current)}catch{}}).subscribe();return()=>{R.removeChannel(n)}},[s==null?void 0:s.id]),l.useEffect(()=>{if(!("serviceWorker"in navigator))return;const n=u=>{var S;if(((S=u.data)==null?void 0:S.type)!=="NOTIF_NAV")return;const x=typeof u.data.url=="string"?u.data.url:"/";r(x.startsWith("/")?x:`/${x}`)};return navigator.serviceWorker.addEventListener("message",n),()=>navigator.serviceWorker.removeEventListener("message",n)},[r]),l.useEffect(()=>{P(!0);const n=async()=>{let x=R.from("products").select("*").or("actif.eq.true,actif.is.null").order("sponsorise",{ascending:!1}).order("created_at",{ascending:!1}).limit(60);re&&(x=x.eq("categorie",re));const{data:S,error:O}=await x;O&&console.warn("Produits:",O.message),pe(S||[]),P(!1)};n();const u=R.channel("prod_rt").on("postgres_changes",{event:"*",schema:"public",table:"products"},n).subscribe();return()=>R.removeChannel(u)},[re]),l.useEffect(()=>{var n;(n=ki.current)==null||n.scrollIntoView({behavior:"smooth"})},[wi]);const qe=i.pathname;l.useEffect(()=>{if(t.categorySlug){const n=zo(t.categorySlug,vt);te(n||"")}else t.page==="produits"&&qe==="/produits"&&te("")},[t.categorySlug,t.page,qe]);const se=l.useMemo(()=>{var n;return t.citySlug?(n=F[t.citySlug])==null?void 0:n.name:null},[t.citySlug]),Ci=l.useMemo(()=>{var n;return t.page==="prestataires"&&t.metierSlug&&t.villeSlug?{cat:Pt[t.metierSlug]||"",ville:((n=F[t.villeSlug])==null?void 0:n.name)||""}:t.page==="seoCity"&&t.cityMode==="prestataires"&&se?{cat:"",ville:se}:t.page==="prestataires"&&qe==="/prestataires"?{cat:"",ville:""}:null},[t.page,t.metierSlug,t.villeSlug,t.cityMode,se,qe]);l.useEffect(()=>{if(t.page!=="academyDetail"&&t.page!=="academyContact")return;const n=t.courseId;if(!n||!Le.length)return;const u=Le.find(x=>String(x.id)===String(n));u&&or(u)},[t.page,t.courseId,Le]),l.useEffect(()=>{if(t.page!=="productDetail"||!t.productSlug){Oe(null),Te(!1);return}const{id:n}=ft(t.productSlug);if(!n){Oe(null),Te(!1);return}let u=!1;return Te(!0),R.from("products").select("*").eq("id",n).maybeSingle().then(({data:x,error:S})=>{u||(S&&console.warn("Détail produit:",S.message),Oe(x||null),Te(!1))}).catch(x=>{u||(console.warn("Détail produit:",(x==null?void 0:x.message)||x),Oe(null),Te(!1))}),()=>{u=!0}},[t.page,t.productSlug]),l.useEffect(()=>{if(t.page!=="prestDetail"||!t.prestSlug){t.page!=="prestDetail"&&ge(null);return}const{id:n}=ft(t.prestSlug);if(!n){ge(null);return}const u=ga.find(S=>S.id===n);if(u){ge(u);return}const x=Y.find(S=>`real-${S.id}`===n||String(S.id)===n);ge(x?{id:`real-${x.id}`,name:x.provider_nom||"Prestataire Yorix",metier:x.nom||"Service",categorie:x.categorie||"Autre",ville:x.ville||"Cameroun",quartier:"",emoji:"🛠️",photo:null,color_bg:"linear-gradient(135deg, #dcfce7, #bbf7d0)",tags:[x.categorie||"Service"].filter(Boolean),note:x.note||5,avis:x.nombre_avis||0,prix:x.prix?`${Number(x.prix).toLocaleString("fr-FR")} FCFA`:"",verifie:!0,dispo:x.disponible!==!1,bio:x.description||"",telephone:"",realisations:0,isReal:!0}:null)},[t.page,t.prestSlug,Y]);const zi=async()=>{I(""),V(!0);try{const{data:n,error:u}=await R.auth.signInWithPassword({email:E.email,password:E.password});if(u)throw u;p(n.user),await De(n.user.id),w(!1),xe&&setTimeout(()=>ar(xe),300),wa({to:E.email,subject:`Bienvenue sur Yorix, ${E.nom} ! 🎉`,html:ja(E.nom,y)}).catch(x=>console.warn("Email bienvenue:",x))}catch{I("Email ou mot de passe incorrect.")}V(!1)},Ur=async()=>{var n;I(""),V(!0);try{if(!E.nom||!E.email||!E.password||!E.tel)throw new Error("Tous les champs sont obligatoires.");if(!y)throw new Error("Veuillez choisir un profil (Acheteur, Vendeur, Livreur ou Prestataire).");if(["seller","provider","delivery"].includes(y)&&!ci){Dr({nom:E.nom,email:E.email,tel:E.tel,password:E.password,role:y}),V(!1),ir(!0);return}const{data:x,error:S}=await R.auth.signUp({email:E.email,password:E.password,options:{data:{display_name:E.nom,nom:E.nom,telephone:E.tel,role:y}}});if(S)throw S;const O=(n=x.user)==null?void 0:n.id;if(!O)throw new Error("Erreur création compte.");const{error:N}=await R.from("profiles").upsert({id:O,nom:E.nom,email:E.email,telephone:E.tel,role:y,langue:"fr",actif:!0,verifie:!1,note:0,nombre_avis:0,total_commandes:0});N&&console.error("Profile insert error:",N),await R.from("wallets").insert({user_id:O,solde:0,total_gagne:0,devise:"FCFA"}).then($=>$.error&&console.error($.error)),await De(O),w(!1),q({nom:"",email:"",tel:"",password:""}),Or(!1),Dr(null),xe&&setTimeout(()=>ar(xe),500)}catch(u){console.error("Register error:",u),I(u.message.includes("already")?"Cet email est déjà utilisé.":u.message)}V(!1)},_i=async()=>{const{error:n}=await R.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin}});n&&I(n.message)},Wr=async()=>{await R.auth.signOut(),p(null),m(null),h(null),ne("overview"),j("home")},Ti=async n=>{ir(!1),Or(!0),setTimeout(()=>{Ur()},200)},Be=l.useCallback(n=>{const u=Ka(n);u&&we(x=>kt(x,u))},[]),Ei=l.useCallback(n=>{const u=Qa(n);u&&we(x=>kt(x,u))},[]),Ai=(n,u,x=null)=>we(S=>Za(S,n,x,u)),Ni=(n,u=null)=>we(x=>en(x,n,u)),nr=l.useMemo(()=>rn(ue,Se),[ue,Se]),sr=nr.qty,Ri=l.useCallback(async n=>{if(!(s!=null&&s.id)||!n)return;const u={};if(n.telephone!=null&&String(n.telephone).trim()!==""&&(u.telephone=String(n.telephone).trim()),n.adresse!=null&&(u.adresse=String(n.adresse).trim()),n.ville!=null&&(u.ville=String(n.ville).trim()),n.nom!=null&&(u.nom=String(n.nom).trim()),!Object.keys(u).length)return;const{error:x}=await R.from("profiles").update(u).eq("id",s.id);if(x){console.warn("Profil checkout non sauvegardé:",x.message||x);return}m(S=>S&&{...S,...u})},[s==null?void 0:s.id]),lr=l.useCallback(n=>ri(u=>{const x=new Set(u);return x.has(n)?x.delete(n):x.add(n),x}),[]),Vr=async(n,u={navigate:!0,closeDrawer:!0})=>{const x=typeof n=="object"?n.id:n,S=typeof n=="object"?n:je.find(N=>N.id===x);try{const{error:N}=await R.from("notifications").update({lu:!0}).eq("id",x);N&&console.warn("marquerNotifLue:",N.message)}catch(N){console.warn("marquerNotifLue exception:",N==null?void 0:N.message)}if(me(N=>N.map($=>$.id===x?{...$,lu:!0}:$)),u.closeDrawer&&ke(!1),!u.navigate||!S)return;const O=String(S.link||"").trim();if(O.startsWith("http")){window.open(O,"_blank","noopener,noreferrer");return}if(O.startsWith("/")){r(O);return}S.type==="new_product"||O.includes("/products/")?j("produits"):S.type==="new_message"&&(j("dashboard"),ne("messages"))},Hr=async n=>{if(n){try{const{error:u}=await R.from("notifications").delete().eq("id",n);u&&console.warn("supprimerNotif:",u.message)}catch(u){console.warn("supprimerNotif:",u==null?void 0:u.message)}me(u=>u.filter(x=>x.id!==n))}},Xr=async()=>{const n=je.filter(u=>!u.lu).map(u=>u.id);if(n.length!==0){try{const{error:u}=await R.from("notifications").update({lu:!0}).in("id",n);u&&console.warn("marquerToutesLues:",u.message)}catch(u){console.warn("marquerToutesLues exception:",u==null?void 0:u.message)}me(u=>u.map(x=>({...x,lu:!0})))}},Fe=je.filter(n=>!n.lu).length,Mi=l.useMemo(()=>{let n=U.filter(u=>{var x,S;return!L||((x=u.name_fr)==null?void 0:x.toLowerCase().includes(L.toLowerCase()))||((S=u.description_fr)==null?void 0:S.toLowerCase().includes(L.toLowerCase()))});if(o==="seoCity"&&t.cityMode==="acheter"&&se){const u=se.toLowerCase();n=n.filter(x=>{const S=(x.ville||"").toLowerCase();return!S||S.includes(u)||u.includes(S)})}return n},[U,L,o,t.cityMode,se]),Jr=o==="seoCity"||o==="livraison"&&!!t.citySlug,Gr=o==="produits"||o==="seoCity"&&t.cityMode==="acheter",Pi=o==="livraison"||o==="seoCity"&&t.cityMode==="livraison",Ii=o==="prestataires"||o==="prestDetail"||o==="seoCity"&&t.cityMode==="prestataires",Li=Gr||o==="escrow",Oi=l.useMemo(()=>["faq","devenirVendeur","devenirLivreur","inscription","business","academy","blog","contact","aide","cgv","mentions","confidentialite"].includes(o),[o]),Kr=l.useCallback(n=>n==="produits"?o==="produits"||o==="seoCity"&&t.cityMode==="acheter":n==="livraison"?o==="livraison"||o==="seoCity"&&t.cityMode==="livraison":n==="prestataires"?o==="prestataires"||o==="prestDetail"||o==="seoCity"&&t.cityMode==="prestataires":o===n,[o,t.cityMode]),Qr=l.useCallback(n=>{j("productDetail",{productSlug:pt(n.name_fr||n.name,n.id)})},[j]),Zr=()=>({buyer:"chip-buyer",seller:"chip-seller",delivery:"chip-delivery",provider:"chip-provider",admin:"chip-admin"})[g]||"chip-buyer",Di=()=>g==="seller"?[{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"🏪",id:"mesProduits",label:"Mes produits"},{icon:"➕",id:"ajouterProduit",label:"Ajouter produit"},{icon:"📦",id:"commandes",label:"Commandes"},{icon:"💰",id:"wallet",label:"Wallet"}]:g==="delivery"?[{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"🟡",id:"disponibles",label:"Disponibles"},{icon:"🚚",id:"enCours",label:"En cours"},{icon:"✅",id:"historique",label:"Historique"},{icon:"💰",id:"wallet",label:"Gains"}]:g==="provider"?[{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"📋",id:"demandes",label:"Demandes"},{icon:"🛠️",id:"mesServices",label:"Mes services"},{icon:"+",id:"ajouterService",label:"Ajouter service"}]:[{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"📦",id:"commandes",label:"Mes commandes"},{icon:"❤️",id:"favoris",label:"Favoris"},{icon:"🌟",id:"loyalty",label:"Fidélité"}],qi=[{l:"🏠 Accueil",p:"home"},{l:"🛍️ Produits",p:"produits"},{l:"🎁 Bons plans",p:"bonsPlans"},{l:"🚚 Livraison",p:"livraison"},{l:"🔐 Escrow",p:"escrow"},{l:"👷 Prestataires",p:"prestataires"},{l:"💼 Business",p:"business"},{l:"🎓 Academy",p:"academy"},{l:"📰 Blog",p:"blog"},{l:"🌟 Fidélité",p:"loyalty"},{l:"📞 Contact",p:"contact"},{l:"🆘 Aide",p:"aide"},...s&&((c==null?void 0:c.role)==="admin"||(c==null?void 0:c.role)==="superadmin")?[{l:"⚙️ Admin",p:"admin"}]:[]],le=l.useMemo(()=>{const n=t.canonicalPath||i.pathname,u={"@context":"https://schema.org","@type":"Organization",name:"Yorix CM",alternateName:"Yorix Cameroun",url:oe,logo:`${oe}/icons/icon-512.png`,areaServed:{"@type":"Country",name:"Cameroun"},sameAs:["https://www.facebook.com/yorixcm","https://www.instagram.com/yorixcm","https://wa.me/237696565654"]},x={"@context":"https://schema.org","@type":"WebSite",name:"Yorix CM",url:oe,potentialAction:{"@type":"SearchAction",target:`${To()}?q={search_term_string}`,"query-input":"required name=search_term_string"}};if(o==="dashboard"||o==="admin")return{title:"Espace membre — Yorix CM",description:"Tableau de bord Yorix.",canonicalPath:n,noindex:!0,jsonLd:[]};if(o==="home")return{title:"Yorix.cm — Marketplace Cameroun | Achat en ligne, livraison, escrow, prestataires",description:"Yorix est une marketplace camerounaise : achat en ligne, vendre en ligne, livreur & livraison Douala, Yaoundé, Bafoussam, escrow MTN MoMo & Orange Money, prestataires vérifiés.",canonicalPath:"/",keywords:"marketplace Cameroun, achat en ligne Cameroun, vendre en ligne Cameroun, livraison Cameroun, livreur Cameroun, escrow Cameroun, prestataires Cameroun, Douala, Yaoundé, Bafoussam",jsonLd:[u,x]};if(o==="productDetail"&&_e){const N=_e,$=N.image&&String(N.image).startsWith("http")?N.image:Array.isArray(N.image_urls)&&N.image_urls[0]?N.image_urls[0]:`${oe}/icons/icon-512.png`,Ee=N.description_fr&&String(N.description_fr).slice(0,158)||`Acheter ${N.name_fr||"ce produit"} sur Yorix — marketplace & livraison Cameroun.`,cr={"@context":"https://schema.org","@type":"Product",name:N.name_fr||"Produit Yorix",image:$,description:Ee,brand:{"@type":"Brand",name:"Yorix CM"},offers:{"@type":"Offer",url:`${oe}${n}`,priceCurrency:"XAF",price:N.prix,availability:"https://schema.org/InStock"}};return{title:`${N.name_fr||"Produit"} — achat en ligne Cameroun | Yorix.cm`,description:Ee,canonicalPath:n,ogType:"product",jsonLd:[cr,u]}}if(o==="notifications")return{title:"Notifications — alertes commandes & messages | Yorix.cm",description:"Historique de vos alertes Yorix : commandes, paiements, livraisons, prestations et messages.",canonicalPath:"/notifications",noindex:!0,jsonLd:[u]};if(o==="faq")return{title:"FAQ Yorix — marketplace, livraison, escrow Cameroun",description:"Réponses sur l’achat en ligne, la livraison, les prestataires, MTN MoMo, Orange Money et l’escrow sur Yorix.cm.",canonicalPath:"/faq",jsonLd:[{"@context":"https://schema.org","@type":"FAQPage",mainEntity:[{"@type":"Question",name:"Comment acheter sur Yorix au Cameroun ?",acceptedAnswer:{"@type":"Answer",text:"Parcourez les produits, ajoutez au panier et finalisez via WhatsApp ou paiement mobile (MTN MoMo, Orange Money)."}},{"@type":"Question",name:"La livraison couvre quelles villes ?",acceptedAnswer:{"@type":"Answer",text:"Douala, Yaoundé, Bafoussam, Bamenda, Kribi et un réseau national en expansion. Délais J+1 sur les grandes villes."}},{"@type":"Question",name:"Comment fonctionne l’escrow Yorix ?",acceptedAnswer:{"@type":"Answer",text:"Les fonds sont sécurisés jusqu’à confirmation de réception par l’acheteur, puis libérés au vendeur."}}]},u]};if(o==="seoCity"&&t.citySlug&&F[t.citySlug]){const N=F[t.citySlug].name,$={hub:{title:`Yorix ${N} — marketplace, livraison & prestataires | Cameroun`,desc:`Marketplace à ${N} : acheter en ligne, livraison, services et escrow. MTN MoMo, Orange Money — Yorix.cm.`},acheter:{title:`Acheter en ligne à ${N} — marketplace Yorix Cameroun`,desc:`Achat en ligne à ${N} : produits vérifiés, paiement mobile, livraison. La marketplace camerounaise Yorix.`},livraison:{title:`Livraison à ${N} — livreur & colis | Yorix Ride Cameroun`,desc:`Service de livraison rapide à ${N} et partout au Cameroun. Suivi, tarifs clairs — Yorix Ride.`},prestataires:{title:`Prestataires à ${N} — services à domicile | Yorix.cm`,desc:`Trouvez des prestataires vérifiés à ${N} : plomberie, électricité, ménage, beauté, informatique…`}},Ee=$[t.cityMode]||$.hub,cr={"@context":"https://schema.org","@type":"LocalBusiness",name:`Yorix — ${N}`,url:`${oe}${n}`,address:{"@type":"PostalAddress",addressLocality:N,addressCountry:"CM"},areaServed:{"@type":"City",name:N},parentOrganization:{"@type":"Organization",name:"Yorix CM"}};return{title:Ee.title,description:Ee.desc,canonicalPath:n,jsonLd:[cr,u]}}const O={produits:"Produits — marketplace en ligne Cameroun | Yorix.cm",livraison:"Livraison Cameroun — livreurs Yorix Ride | Douala, Yaoundé",escrow:"Escrow Cameroun — paiement sécurisé marketplace | Yorix.cm",prestataires:"Prestataires Cameroun — services à domicile vérifiés | Yorix.cm",business:"Yorix Business — solutions B2B marketplace Cameroun",blog:"Blog Yorix — actualités marketplace Cameroun",academy:"Yorix Academy — formations e-commerce Cameroun",loyalty:"Fidélité Yorix — points & récompenses",contact:"Contact Yorix — support marketplace Cameroun",aide:"Centre d'aide Yorix — marketplace & livraison Cameroun",faq:"FAQ Yorix — achat, livraison, escrow, vendeurs | Cameroun",cgv:"CGV Yorix.cm — conditions générales de vente",confidentialite:"Politique de confidentialité — Yorix.cm",mentions:"Mentions légales — Yorix.cm",devenirVendeur:"Devenir vendeur sur Yorix — marketplace Cameroun",devenirLivreur:"Devenir livreur Yorix Ride — livraison Cameroun",inscription:"Devenir prestataire Yorix — services Cameroun"}[o];return O?{title:O,description:"Yorix.cm — marketplace & super-app pour acheter, vendre, se faire livrer et trouver des prestataires au Cameroun. MTN MoMo, Orange Money, escrow.",canonicalPath:Er[o]||n,jsonLd:[u]}:{title:"Yorix CM — Marketplace #1 au Cameroun",description:"Marketplace camerounaise : produits, livraison, prestataires, escrow MTN MoMo & Orange Money.",canonicalPath:n,jsonLd:[u]}},[o,t.canonicalPath,t.citySlug,t.cityMode,i.pathname,_e]);return k?e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",fontFamily:"'DM Sans',sans-serif",color:"#1a6b3a",gap:12},children:[e.jsx("div",{style:{width:40,height:40,border:"4px solid #e2ddd6",borderTopColor:"#1a6b3a",borderRadius:"50%",animation:"spin .7s linear infinite"}}),"Chargement de Yorix...",e.jsx("style",{children:"@keyframes spin{to{transform:rotate(360deg);}}"})]}):e.jsxs(e.Fragment,{children:[e.jsx("style",{children:Sa(a)}),e.jsx(oa,{title:le.title,description:le.description,canonicalPath:le.canonicalPath,keywords:le.keywords,ogType:le.ogType||"website",jsonLd:le.jsonLd,noindex:le.noindex}),e.jsx(xn,{open:li,onClose:()=>{ir(!1),V(!1),I("Vous devez accepter le contrat pour finaliser votre inscription.")},onAccepted:Ti,user:s,userData:c,role:y,authForm:E}),e.jsx(gn,{open:di,onClose:Si,onSelectAction:ji,user:s}),si&&e.jsx(Ca,{user:s,userData:c,onClose:()=>tr(!1),onSuccess:n=>{console.log("Livraison créée avec code:",n)}}),z&&e.jsx("div",{className:"modal-overlay",onClick:n=>n.target===n.currentTarget&&w(!1),children:e.jsxs("div",{className:"modal",style:{width:"100%",maxWidth:480,margin:"0 auto"},children:[e.jsx("button",{className:"modal-close",onClick:()=>w(!1),children:"✕"}),e.jsx("div",{className:"modal-title",children:f==="login"?"Bon retour ! 👋":"Rejoindre Yorix 🇨🇲"}),e.jsx("p",{className:"modal-sub",children:"Votre marketplace camerounaise de confiance"}),e.jsxs("div",{className:"auth-tabs",children:[e.jsx("button",{className:`auth-tab${f==="login"?" active":""}`,onClick:()=>{b("login"),I("")},children:"🔑 Connexion"}),e.jsx("button",{className:`auth-tab${f==="register"?" active":""}`,onClick:()=>{b("register"),I("")},children:"🚀 Inscription"})]}),T&&e.jsxs("div",{className:"error-msg",children:["⚠️ ",T]}),f==="register"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{background:"var(--green-pale)",border:"1px solid var(--green-light)",borderRadius:9,padding:"10px 12px",marginBottom:12,fontSize:".78rem",color:"var(--green)",fontWeight:600},children:"👇 Choisissez votre profil pour commencer"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14},children:[{id:"buyer",icon:"🛍️",label:"Acheteur",desc:"J'achète des produits"},{id:"seller",icon:"🏪",label:"Vendeur",desc:"Je vends mes produits"},{id:"delivery",icon:"🚚",label:"Livreur",desc:"J'effectue des livraisons"},{id:"provider",icon:"👷",label:"Prestataire",desc:"Je propose des services"}].map(n=>e.jsxs("div",{onClick:()=>M(n.id),style:{border:`2px solid ${y===n.id?"var(--green)":"var(--border)"}`,borderRadius:10,padding:"12px 10px",cursor:"pointer",background:y===n.id?"var(--green-pale)":"var(--surface)",textAlign:"center",transition:"all .2s"},children:[e.jsx("div",{style:{fontSize:"1.8rem",marginBottom:4},children:n.icon}),e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem",color:"var(--ink)"},children:n.label}),e.jsx("div",{style:{fontSize:".67rem",color:"var(--gray)",marginTop:2},children:n.desc}),y===n.id&&e.jsx("div",{style:{marginTop:5,fontSize:".62rem",fontWeight:700,color:"var(--green)"},children:"✅ Sélectionné"})]},n.id))}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Nom complet ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:"form-input",placeholder:"Ex: Amina Bello",value:E.nom,onChange:n=>q(u=>({...u,nom:n.target.value}))})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Téléphone ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:"form-input",type:"tel",placeholder:"+237 6XX XXX XXX",value:E.tel,onChange:n=>q(u=>({...u,tel:n.target.value}))})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Email ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:"form-input",type:"email",placeholder:"votre@email.com",value:E.email,onChange:n=>q(u=>({...u,email:n.target.value}))})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Mot de passe ",e.jsx("span",{children:"*"})]}),e.jsx(bn,{value:E.password,onChange:n=>q(u=>({...u,password:n})),placeholder:f==="login"?"Entrez votre mot de passe":"Choisissez un mot de passe",autoComplete:f==="login"?"current-password":"new-password",showStrength:f==="register",showRules:f==="register",ariaLabel:"Mot de passe",id:"auth-password"}),f==="login"&&e.jsx("div",{style:{fontSize:".7rem",color:"var(--gray)",marginTop:5,display:"flex",alignItems:"center",gap:4},children:"💡 Cliquez sur l'œil pour afficher ou masquer votre mot de passe"})]}),e.jsx("button",{className:"form-submit",onClick:f==="login"?zi:Ur,disabled:ae,style:{fontSize:".9rem",padding:"13px"},children:ae?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"spinner",style:{width:16,height:16,borderWidth:2}}),"Chargement..."]}):f==="login"?"🔑 Se connecter":`🚀 Créer mon compte ${y==="buyer"?"Acheteur":y==="seller"?"Vendeur":y==="delivery"?"Livreur":"Prestataire"}`}),f==="register"&&e.jsx("p",{style:{fontSize:".68rem",color:"var(--gray)",textAlign:"center",marginTop:8},children:"En vous inscrivant, vous acceptez nos conditions d'utilisation"}),e.jsx("div",{className:"divider",children:"ou"}),e.jsxs("button",{className:"social-btn",onClick:_i,children:[e.jsx("span",{children:"🇬"})," Continuer avec Google"]})]})}),e.jsxs("div",{className:`header-sticky-stack${Kt?" header-sticky-stack--compact":""}`,children:[e.jsxs("div",{className:"topbar",children:[e.jsxs("div",{className:"topbar-l",children:[e.jsxs("div",{className:"flag-wrap",children:[e.jsxs("span",{className:"flag",children:[e.jsx("span",{className:"fg"}),e.jsx("span",{className:"fr"}),e.jsx("span",{className:"fy"})]}),e.jsx("span",{children:"Cameroun 🇨🇲"})]}),e.jsx("span",{children:"FR / EN"}),e.jsx("span",{children:"📞 +237 696 56 56 54"})]}),e.jsxs("div",{className:"topbar-r",children:[e.jsx("span",{onClick:()=>j("aide"),children:"🆘 Aide"}),e.jsx("span",{onClick:()=>j("contact"),children:"📞 Contact"}),s?e.jsxs("span",{style:{color:"#b7e4c7"},children:["👤 ",(c==null?void 0:c.nom)||((et=s.email)==null?void 0:et.split("@")[0])]}):e.jsx("span",{onClick:()=>{b("login"),w(!0)},children:"🔑 Se connecter"})]})]}),e.jsxs("nav",{className:"navbar",children:[e.jsx("div",{className:"logo-wrap",onClick:()=>j("home"),children:e.jsxs("div",{className:"logo-txt",children:["Yo",e.jsx("span",{children:"rix"}),e.jsx("sup",{children:"CM"})]})}),e.jsxs("div",{className:"nav-search",style:{position:"relative"},children:[e.jsxs("select",{value:re,onChange:n=>te(n.target.value),children:[e.jsx("option",{value:"",children:"Tout"}),vt.map(n=>e.jsx("option",{children:n},n))]}),e.jsx("input",{placeholder:"Rechercher un produit...",value:L,onChange:n=>fe(n.target.value),onKeyDown:n=>n.key==="Enter"&&j("produits"),autoComplete:"off"}),L.trim().length>=2&&e.jsxs("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"var(--bg)",border:"1px solid var(--border)",borderRadius:10,boxShadow:"0 4px 16px rgba(0,0,0,0.12)",zIndex:9999,maxHeight:320,overflowY:"auto",marginTop:4},children:[U.filter(n=>(n.name_fr||"").toLowerCase().includes(L.toLowerCase())||(n.description_fr||"").toLowerCase().includes(L.toLowerCase())).slice(0,8).map(n=>{var u;return e.jsxs("div",{onClick:()=>{fe(""),j("produits")},style:{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",cursor:"pointer",borderBottom:"1px solid var(--border)",fontSize:13},onMouseEnter:x=>x.currentTarget.style.background="var(--bg2)",onMouseLeave:x=>x.currentTarget.style.background="transparent",children:[n.image&&e.jsx("img",{src:n.image,style:{width:36,height:36,objectFit:"cover",borderRadius:6},alt:"",onError:x=>x.currentTarget.style.display="none"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:500},children:n.name_fr}),e.jsxs("div",{style:{color:"var(--gray)",fontSize:12},children:[(u=n.prix)==null?void 0:u.toLocaleString()," FCFA"]})]})]},n.id)}),U.filter(n=>(n.name_fr||"").toLowerCase().includes(L.toLowerCase())).length===0&&e.jsxs("div",{style:{padding:14,color:"var(--gray)",fontSize:13,textAlign:"center"},children:['Aucun résultat pour "',L,'"']})]}),e.jsx("button",{onClick:()=>j("produits"),children:"🔍"})]}),e.jsxs("div",{className:"nav-actions",children:[e.jsx("button",{onClick:()=>ze(!0),title:"Que cherchez-vous ?",style:{background:"linear-gradient(135deg, var(--green, #1a6b3a), #0d4d28)",color:"#fff",border:"none",padding:"7px 14px",borderRadius:8,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".75rem",cursor:"pointer",whiteSpace:"nowrap",boxShadow:"0 2px 8px rgba(26,107,58,.25)"},children:"🚀 Démarrer"}),e.jsx("button",{className:"dark-toggle",onClick:()=>d(n=>!n),title:a?"Mode clair":"Mode sombre",children:a?"☀️":"🌙"}),s&&e.jsxs("button",{className:"icon-btn",onClick:()=>ke(n=>!n),title:"Notifications",children:["🔔",Fe>0&&e.jsx("span",{className:"ibadge",children:Fe})]}),e.jsxs("button",{className:"icon-btn",onClick:()=>j("cart"),title:"Mon panier",children:["🛒",sr>0&&e.jsx("span",{className:"ibadge",children:sr})]}),s?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:`role-chip ${Zr()}`,children:yt[g||"buyer"]}),e.jsx("div",{className:"user-av",onClick:()=>j("dashboard"),title:"Mon espace",children:((c==null?void 0:c.nom)||s.email||"?")[0].toUpperCase()}),e.jsx("button",{className:"btn-red",onClick:Wr,title:"Déconnexion",children:"🚪 Déconnexion"})]}):e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"btn-ghost",onClick:()=>{b("login"),w(!0)},children:"🔑 Connexion"}),e.jsx("button",{className:"btn-green",onClick:()=>{b("register"),M("buyer"),w(!0)},children:"🚀 S'inscrire"})]})]})]}),e.jsxs("div",{className:"nav-tabs-row",ref:Qe,children:[e.jsx("nav",{className:"nav-tabs","aria-label":"Rubriques Yorix",children:qi.map(n=>e.jsx("div",{className:`tab${Kr(n.p)?" active":""}`,onClick:()=>{ie(!1),j(n.p)},role:"presentation",children:n.l},n.p))}),e.jsxs("div",{className:"nav-quick-wrap",children:[e.jsx("button",{type:"button",className:"nav-quick-btn","aria-expanded":Pe,onClick:()=>ie(n=>!n),children:"☰ Navigation"}),Pe&&e.jsxs("div",{className:"nav-quick-panel",role:"dialog","aria-label":"Liens rapides Yorix",children:[e.jsxs("div",{className:"nav-quick-section",children:[e.jsx("h4",{children:"Marketplace"}),e.jsx("div",{className:"nav-quick-links",children:[{l:"Accueil",p:"home"},{l:"Produits",p:"produits"},{l:"Panier / checkout",p:"cart"},{l:"Bons plans",p:"bonsPlans"},{l:"Livraison",p:"livraison"}].map(n=>e.jsx("button",{type:"button",onClick:()=>{ie(!1),j(n.p)},children:n.l},n.l))})]}),e.jsxs("div",{className:"nav-quick-section",children:[e.jsx("h4",{children:"Confiance · croissance"}),e.jsx("div",{className:"nav-quick-links",children:[{l:"Escrow",p:"escrow"},{l:"Prestataires",p:"prestataires"},{l:"Business",p:"business"},{l:"Academy",p:"academy"},{l:"Blog",p:"blog"},{l:"Fidélité",p:"loyalty"}].map(n=>e.jsx("button",{type:"button",onClick:()=>{ie(!1),j(n.p)},children:n.l},n.l))})]}),e.jsxs("div",{className:"nav-quick-section",children:[e.jsx("h4",{children:"Support"}),e.jsxs("div",{className:"nav-quick-links",children:[e.jsx("button",{type:"button",onClick:()=>{ie(!1),j("contact")},children:"Contact"}),e.jsx("button",{type:"button",onClick:()=>{ie(!1),j("aide")},children:"SOS · Aide"}),e.jsx("button",{type:"button",onClick:()=>{ie(!1),j("faq")},children:"FAQ"})]})]})]})]})]}),e.jsxs("div",{className:"pay-strip",children:[e.jsx("b",{style:{color:"var(--ink)"},children:"Paiement :"}),e.jsxs("div",{className:"pay-methods",children:[e.jsx("span",{className:"pm mtn-b",children:"📱 MTN MoMo"}),e.jsx("span",{className:"pm ora-b",children:"🔶 Orange Money"}),e.jsx("span",{className:"pm",children:"💳 Carte"}),e.jsx("span",{className:"pm",children:"💵 Cash"})]}),e.jsxs("div",{className:"strip-right",children:[e.jsx("span",{children:"🚚 J+1 Douala & Yaoundé"}),e.jsxs("span",{role:"link",tabIndex:0,onClick:()=>j("bonsPlans"),onKeyDown:n=>n.key==="Enter"&&j("bonsPlans"),style:{cursor:"pointer",fontWeight:700,color:"var(--green)",textDecoration:"underline"},children:["Livraison offerte dès ",Se.freeShippingThresholdXaf.toLocaleString("fr-FR")," FCFA"]}),e.jsx("span",{children:"🔐 Escrow sécurisé"}),s&&e.jsxs("span",{style:{color:"var(--gold)"},children:["👤 ",(c==null?void 0:c.nom)||s.email]})]})]})]}),Gt&&s&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"notif-backdrop",role:"presentation",onClick:()=>ke(!1)}),e.jsx("div",{className:"notif-drawer notif-drawer--premium",children:e.jsx(mn,{variant:"dropdown",user:s,notifs:je,goPage:j,onMarkRead:Vr,onMarkAllRead:Xr,onDismiss:Hr,onClose:()=>ke(!1),onPrefsUpdated:Me})})]}),o==="home"&&e.jsx(l.Suspense,{fallback:e.jsx(B,{minHeight:280,label:"Chargement de l'accueil..."}),children:e.jsx(Ea,{filterCat:re,setFilterCat:te,search:L,setSearch:fe,produitsLoading:C,produits:U,user:s,userData:c,wishlist:Ie,addToCart:Be,toggleWish:lr,openProductUrl:Qr,setOnboardingOpen:ze,goPage:j,allServices:Y,nlEmail:Ce,setNlEmail:Ze,nlSent:er,setNlSent:rr,freeShippingThresholdXaf:Se.freeShippingThresholdXaf})}),Jr&&o==="livraison"&&t.citySlug&&F[t.citySlug]&&e.jsx(bt,{city:F[t.citySlug],mode:"livraison",goPage:j}),Jr&&o==="seoCity"&&t.citySlug&&F[t.citySlug]&&e.jsx(bt,{city:F[t.citySlug],mode:t.cityMode||"hub",goPage:j}),o==="productDetail"&&e.jsx("div",{className:"anim",children:ui?e.jsxs("div",{className:"loading",style:{minHeight:320,justifyContent:"center"},children:[e.jsx("div",{className:"spinner"})," Chargement du produit..."]}):_e?e.jsx(l.Suspense,{fallback:e.jsx(B,{minHeight:320,label:"Chargement du produit..."}),children:e.jsx(Ma,{product:_e,user:s,userData:c,onClose:()=>j("produits"),onAddToCart:Be})}):e.jsx("section",{className:"sec anim",children:e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:"🔍"}),e.jsx("p",{children:"Produit introuvable."}),e.jsx("button",{className:"form-submit",style:{width:"auto",marginTop:16},type:"button",onClick:()=>j("produits"),children:"← Retour aux produits"})]})})}),Li&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement catalogue..."}),children:e.jsx(Aa,{showProduits:Gr,page:o,seoCityName:se,produitsFiltres:Mi,produitsLoading:C,produits:U,filterCat:re,setFilterCat:te,search:L,user:s,userData:c,wishlist:Ie,addToCart:Be,toggleWish:lr,openProductUrl:Qr,dark:a,goPage:j})}),Pi&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement livraison..."}),children:e.jsx(Na,{route:t,user:s,userData:c,setDemandeLivraisonOpen:tr,setAuthTab:b,setSelectedRole:M,setAuthOpen:w})}),Ii&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement prestataires..."}),children:e.jsx(Pa,{user:s,userData:c,allServices:Y,goPage:j,setSelectedPrest:ge,selectedPrest:ni,onOpenPrestDetail:n=>j("prestDetail",{prestSlug:pt(n.name,n.id)}),onClosePrestDetail:()=>{t.metierSlug&&t.villeSlug?j("prestataires",{metierSlug:t.metierSlug,villeSlug:t.villeSlug}):o==="seoCity"&&t.cityMode==="prestataires"&&t.citySlug?j("seoCity",{citySlug:t.citySlug,mode:"prestataires"}):j("prestataires")},syncFilters:Ci,onAddServiceToCart:Ei})}),o==="cart"&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement panier..."}),children:e.jsx(La,{cartItems:ue,cartSummary:nr,changeQty:Ai,removeItem:Ni,goPage:j,addToCart:Be,produits:U,wishlist:Ie,toggleWish:lr})}),o==="checkout"&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement checkout..."}),children:e.jsx(Ia,{user:s,userData:c,cartItems:ue,summary:nr,setCartItems:we,goPage:j,fallbackWhatsappNumber:fa,momoNumber:da,orangeNumber:pa,persistCheckoutContact:Ri})}),o==="notifications"&&!s&&e.jsxs("section",{className:"sec anim",style:{maxWidth:480,margin:"0 auto",textAlign:"center",padding:"48px 20px"},children:[e.jsx("h1",{className:"sec-title",style:{fontSize:"1.25rem"},children:"Vos notifications Yorix"}),e.jsx("p",{style:{color:"var(--gray)",marginBottom:22,fontSize:".9rem",lineHeight:1.55},children:"Connectez-vous pour suivre les messages, commandes, paiements et livraisons en temps réel."}),e.jsx("button",{type:"button",className:"form-submit",style:{width:"auto",padding:"12px 28px"},onClick:()=>{b("login"),w(!0)},children:"Se connecter"})]}),o==="notifications"&&s&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement notifications..."}),children:e.jsx(Wa,{user:s,notifs:je,goPage:j,onMarkRead:Vr,onMarkAllRead:Xr,onDismiss:Hr,refreshNotificationsFull:()=>Ir(s.id,120),onPrefsUpdated:Me})}),Oi&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement page..."}),children:e.jsx(Ra,{page:o,goPage:j,setAuthOpen:w,setAuthTab:b,setSelectedRole:M,inscriptionSent:xi,setInscriptionSent:Yr,inscriptionForm:_,setInscriptionForm:vi,inscriptionError:bi,inscriptionLoading:hi,submitInscriptionPrestataire:yi,academyCourses:Le,academyLoading:fi,goAcademyDetail:mi,blogFilter:oi,setBlogFilter:ai,nlEmail:Ce,setNlEmail:Ze,nlSent:er,setNlSent:rr})}),o==="academyDetail"&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement formation..."}),children:e.jsx(Oa,{course:Fr,goPage:j,goContact:gi})}),o==="academyContact"&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement formulaire..."}),children:e.jsx(Da,{course:Fr,user:s,userData:c,goPage:j})}),o==="bonsPlans"&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement bons plans..."}),children:e.jsx(Va,{goPage:j,freeShippingThresholdXaf:Se.freeShippingThresholdXaf})}),o==="loyalty"&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement fidélité..."}),children:e.jsx(qa,{user:s,userData:c,goPage:j,setAuthOpen:w,setAuthTab:b})}),o==="dashboard"&&(s?e.jsxs("div",{className:"dash-layout anim",children:[e.jsxs("div",{className:"dash-sidebar",children:[e.jsx("div",{className:"dash-avatar",children:((rt=c==null?void 0:c.nom)==null?void 0:rt[0])||"U"}),e.jsx("div",{className:"dash-name",title:(c==null?void 0:c.nom)||s.email,children:(c==null?void 0:c.nom)||((tt=s.email)==null?void 0:tt.split("@")[0])||"Utilisateur"}),e.jsx("div",{className:"dash-role-badge",children:e.jsx("span",{className:`role-chip ${Zr()}`,children:yt[g||"buyer"]})}),e.jsxs("div",{className:"dash-nav",children:[Di().map(n=>e.jsxs("div",{className:`dash-nav-item${H===n.id?" active":""}`,onClick:()=>ne(n.id),children:[n.icon," ",n.label]},n.id)),e.jsx("div",{className:"dash-nav-divider"}),e.jsx("div",{className:`dash-nav-item${H==="messages"?" active":""}`,onClick:()=>ne("messages"),children:"💬 Messages"}),e.jsx("div",{className:"dash-nav-item",onClick:Wr,style:{color:"var(--red)"},children:"🚪 Déconnexion"})]})]}),e.jsxs("div",{className:"dash-content",children:[H==="messages"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"dash-page-title",children:"💬 Messagerie Yorix"}),e.jsx("div",{className:"info-msg",children:"🔐 Messagerie sécurisée entre acheteurs et vendeurs. Tes discussions sont privées et protégées."}),e.jsx(za,{user:s,userData:c})]}),H!=="messages"&&g==="seller"&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement espace vendeur..."}),children:e.jsx(Ba,{user:s,userData:c,dashTab:H,setDashTab:ne})}),H!=="messages"&&g==="delivery"&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement espace livreur..."}),children:e.jsx(Ya,{user:s,userData:c,dashTab:H,setDashTab:ne})}),H!=="messages"&&g==="provider"&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement espace prestataire..."}),children:e.jsx($a,{user:s,userData:c,dashTab:H,setDashTab:ne})}),H!=="messages"&&(g==="buyer"||!g)&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement tableau de bord..."}),children:e.jsx(Fa,{user:s,userData:c,wishlist:Ie,totalQty:sr,loyaltyPts:ti,setLoyaltyPts:ii,dashTab:H,goPage:j})})]})]}):e.jsxs("div",{className:"empty-state anim",style:{padding:"60px 0"},children:[e.jsx("div",{className:"empty-icon",children:"🔐"}),e.jsx("p",{children:"Connectez-vous pour accéder à votre espace"}),e.jsx("button",{className:"form-submit",style:{width:"auto",padding:"11px 28px",marginTop:16},onClick:()=>w(!0),children:"Se connecter"})]})),o!=="home"&&e.jsxs("div",{className:"newsletter",children:[e.jsx("div",{className:"nl-title",children:"📬 Restez informé(e)"}),e.jsx("p",{className:"nl-sub",children:"Les meilleures offres Yorix dans votre boîte mail."}),er?e.jsx("div",{style:{background:"rgba(255,255,255,.2)",borderRadius:8,padding:"9px 18px",color:"#fff",fontWeight:600},children:"✅ Abonné(e) !"}):e.jsxs("div",{className:"nl-form",children:[e.jsx("input",{className:"nl-input",placeholder:"Votre email...",value:Ce,onChange:n=>Ze(n.target.value)}),e.jsx("button",{className:"nl-btn",onClick:async()=>{Ce&&(await R.from("newsletter").insert({email:Ce}).catch(n=>console.warn(n==null?void 0:n.message)),rr(!0))},children:"S'abonner 🚀"})]})]}),s&&((c==null?void 0:c.role)==="admin"||(c==null?void 0:c.role)==="superadmin")&&o!=="admin"&&e.jsx("button",{type:"button",className:"admin-quick-pill",onClick:()=>j("admin"),title:"Ouvrir l’administration",children:"⚙️ Admin Yorix"}),e.jsxs("div",{className:"wa-float",children:[Lr&&e.jsxs("div",{className:"wa-card",children:[e.jsx("div",{className:"wa-card-title",children:"💬 Contacter Yorix"}),e.jsx("div",{className:"wa-card-sub",children:"Support 7j/7 · Réponse rapide"}),e.jsx("a",{href:`https://wa.me/${Ve}?text=${encodeURIComponent("Bonjour Yorix ! J'ai besoin d'aide.")}`,target:"_blank",rel:"noreferrer",className:"wa-link wa-link-green",children:"📱 WhatsApp +237 696 56 56 54"}),e.jsx("a",{href:"tel:+237696565654",className:"wa-link wa-link-ghost",children:"📞 Appeler"}),e.jsx("a",{href:"mailto:support@yorix.cm",className:"wa-link wa-link-ghost",children:"✉️ support@yorix.cm"})]}),e.jsxs("div",{style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsx("div",{className:"wa-pulse"}),e.jsx("button",{className:"wa-btn",onClick:()=>ei(n=>!n),children:Lr?"✕":"💬"})]})]}),e.jsxs("div",{className:"mobile-nav",children:[e.jsx("div",{className:"mn-inner",children:[{icon:"🏠",label:"Accueil",p:"home"},{icon:"🛍️",label:"Produits",p:"produits"},{icon:"🚚",label:"Livraison",p:"livraison"},{icon:"📊",label:"Mon espace",p:"dashboard"},{icon:"💬",label:"WhatsApp",p:"wa"}].map(n=>e.jsxs("div",{className:`mn-item${Kr(n.p)?" active":""}`,onClick:()=>{n.p==="wa"?window.open(`https://wa.me/${Ve}?text=${encodeURIComponent("Bonjour Yorix ! J'ai besoin d'aide.")}`,"_blank"):n.p==="dashboard"&&!s?(b("register"),w(!0)):j(n.p)},children:[e.jsx("div",{className:"mn-icon",children:n.icon}),e.jsx("div",{className:"mn-label",children:n.label}),n.p==="dashboard"&&!s&&e.jsx("div",{style:{position:"absolute",top:0,right:2,background:"var(--green)",color:"#fff",fontSize:".45rem",fontWeight:700,padding:"1px 3px",borderRadius:3},children:"S'inscrire"}),n.p==="dashboard"&&Fe>0&&s&&e.jsx("div",{className:"mn-badge",children:Fe})]},n.label))}),!s&&e.jsxs("div",{style:{borderTop:"1px solid var(--border)",padding:"8px 16px",display:"flex",gap:8},children:[e.jsx("button",{onClick:()=>{b("login"),w(!0)},style:{flex:1,padding:"9px",borderRadius:8,border:"1.5px solid var(--border)",background:"var(--surface)",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".78rem",cursor:"pointer",color:"var(--ink)"},children:"🔑 Connexion"}),e.jsx("button",{onClick:()=>{b("register"),M("buyer"),w(!0)},style:{flex:2,padding:"9px",borderRadius:8,border:"none",background:"var(--green)",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem",cursor:"pointer",color:"#fff"},children:"🚀 S'inscrire gratuitement"})]})]}),o==="admin"&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement admin..."}),children:e.jsx(Ua,{user:s,userData:c,goPage:j})}),e.jsxs("footer",{className:"footer",children:[e.jsxs("div",{className:"footer-grid",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"footer-logo",children:["Yo",e.jsx("span",{children:"rix"})," CM"]}),e.jsx("p",{className:"footer-desc",children:"La marketplace camerounaise complète — produits, prestataires, livraison, paiement MoMo sécurisé Escrow."}),e.jsxs("div",{className:"footer-contact",children:[e.jsx("span",{children:"📞 +237 696 56 56 54"}),e.jsx("span",{children:"✉️ support@yorix.cm"}),e.jsx("span",{children:"🇨🇲 Douala · Yaoundé · Bafoussam · et partout"})]})]}),e.jsxs("div",{className:"footer-col",children:[e.jsx("h4",{children:"Marketplace"}),e.jsx("ul",{children:[{l:"Tous les produits",p:"produits"},{l:"Acheter à Douala",nav:()=>j("seoCity",{citySlug:"douala",mode:"acheter"})},{l:"Acheter à Yaoundé",nav:()=>j("seoCity",{citySlug:"yaounde",mode:"acheter"})},{l:"Vendre sur Yorix",p:"devenirVendeur"}].map(n=>e.jsx("li",{onClick:()=>n.nav?n.nav():j(n.p),children:n.l},n.l))})]}),e.jsxs("div",{className:"footer-col",children:[e.jsx("h4",{children:"Services & villes"}),e.jsx("ul",{children:[{l:"Livraison Cameroun",p:"livraison"},{l:"Livraison à Douala",nav:()=>j("livraison",{citySlug:"douala"})},{l:"Prestataires Cameroun",p:"prestataires"},{l:"Prestataires à Yaoundé",nav:()=>j("seoCity",{citySlug:"yaounde",mode:"prestataires"})},{l:"Escrow 🔐",p:"escrow"},{l:"Business 💼",p:"business"},{l:"Academy 🎓",p:"academy"}].map(n=>e.jsx("li",{onClick:()=>n.nav?n.nav():j(n.p),children:n.l},n.l))})]}),e.jsxs("div",{className:"footer-col",children:[e.jsx("h4",{children:"Rejoindre Yorix"}),e.jsx("ul",{children:[{l:"Devenir livreur",p:"devenirLivreur"},{l:"Devenir prestataire",p:"inscription"},{l:"FAQ",p:"faq"},{l:"Centre d'aide",p:"aide"},{l:"Nous contacter",p:"contact"},{l:"📜 CGV",p:"cgv"},{l:"🔒 Confidentialité",p:"confidentialite"}].map(n=>e.jsx("li",{onClick:()=>j(n.p),children:n.l},n.l))})]})]}),e.jsxs("div",{className:"footer-bottom",children:[e.jsx("span",{children:"© 2026 Yorix Cameroun — RC: DOUALA/2026/B237"}),e.jsxs("div",{className:"fb-badges",children:[e.jsx("span",{className:"fbb",children:"📱 MTN MoMo"}),e.jsx("span",{className:"fbb",children:"🔶 Orange Money"}),e.jsx("span",{className:"fbb",children:"🔐 Escrow"}),e.jsx("span",{className:"fbb",children:"🇨🇲 Made in CM"})]})]})]})]})}br.createRoot(document.getElementById("root")).render(e.jsx(ee.StrictMode,{children:e.jsx(jo,{children:e.jsx(Yt,{children:e.jsx(vn,{})})})}));export{Nn as B,vt as C,En as D,An as E,da as M,mn as N,pa as O,ga as P,Rn as R,Mt as S,Ve as Y,D as _,ma as a,F as b,za as c,Et as d,Er as e,Mn as f,Pn as g,fa as h,In as i,e as j,wa as k,yt as l,He as o,Ln as p,R as s,uo as u};
