const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/HomePage-rZODqGP1.js","assets/react-CDaM45aE.js","assets/ProdGrid-C0ZpLjXr.js","assets/OptimizedImage-CnT6s2-b.js","assets/ModalCommander-DKNOtXwo.js","assets/checkoutApi-Cs8eSKbu.js","assets/supabase-D2gm834s.js","assets/ProductRouteSections-CU8lhB_m.js","assets/LivraisonPage-CnOvyfsx.js","assets/SiteMarketingPages-u26qm0Tl.js","assets/LivraisonLazyBlocks-X0RtXcsF.js","assets/FicheProduit-EdltJTjL.js","assets/PrestPage-9jDeHjO7.js","assets/CheckoutPage-D1HSYVVs.js","assets/FreeShippingProgress-deebGIWH.js","assets/CartPage-NBW9wyfR.js","assets/AcademyDetail-DMvDtiCd.js","assets/AcademyContactForm-Dp0ynVYp.js","assets/LoyaltyPage-CNUOZ27k.js","assets/SellerDashboard-CE33eXhB.js","assets/BuyerDashboard-B0pdTyC3.js","assets/DeliveryDashboard-BFBMH4DP.js","assets/ProviderDashboard-CHFqHzlY.js","assets/AdminDashboard-DUtPE8Yu.js","assets/NotificationsPage-DCsZPeUP.js","assets/PromotionsPage-lzglQkuf.js"])))=>i.map(i=>d[i]);
var Uo=Object.defineProperty;var Wo=(r,o,t)=>o in r?Uo(r,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[o]=t;var te=(r,o,t)=>Wo(r,typeof o!="symbol"?o+"":o,t);import{r as l,a as Vo,R as Ho,g as Tr,b as oe}from"./react-CDaM45aE.js";import{c as Xo}from"./supabase-D2gm834s.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const c of a)if(c.type==="childList")for(const s of c.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(a){const c={};return a.integrity&&(c.integrity=a.integrity),a.referrerPolicy&&(c.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?c.credentials="include":a.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function i(a){if(a.ep)return;a.ep=!0;const c=t(a);fetch(a.href,c)}})();var _t={exports:{}},Ze={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Go=l,Jo=Symbol.for("react.element"),Ko=Symbol.for("react.fragment"),Qo=Object.prototype.hasOwnProperty,Zo=Go.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ei={key:!0,ref:!0,__self:!0,__source:!0};function Et(r,o,t){var i,a={},c=null,s=null;t!==void 0&&(c=""+t),o.key!==void 0&&(c=""+o.key),o.ref!==void 0&&(s=o.ref);for(i in o)Qo.call(o,i)&&!ei.hasOwnProperty(i)&&(a[i]=o[i]);if(r&&r.defaultProps)for(i in o=r.defaultProps,o)a[i]===void 0&&(a[i]=o[i]);return{$$typeof:Jo,type:r,key:c,ref:s,props:a,_owner:Zo.current}}Ze.Fragment=Ko;Ze.jsx=Et;Ze.jsxs=Et;_t.exports=Ze;var e=_t.exports,jr={},nt=Vo;jr.createRoot=nt.createRoot,jr.hydrateRoot=nt.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ie(){return Ie=Object.assign?Object.assign.bind():function(r){for(var o=1;o<arguments.length;o++){var t=arguments[o];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(r[i]=t[i])}return r},Ie.apply(this,arguments)}var ge;(function(r){r.Pop="POP",r.Push="PUSH",r.Replace="REPLACE"})(ge||(ge={}));const st="popstate";function ri(r){r===void 0&&(r={});function o(i,a){let{pathname:c,search:s,hash:p}=i.location;return Sr("",{pathname:c,search:s,hash:p},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function t(i,a){return typeof a=="string"?a:Tt(a)}return ii(o,t,null,r)}function re(r,o){if(r===!1||r===null||typeof r>"u")throw new Error(o)}function ti(r,o){{typeof console<"u"&&console.warn(o);try{throw new Error(o)}catch{}}}function oi(){return Math.random().toString(36).substr(2,8)}function lt(r,o){return{usr:r.state,key:r.key,idx:o}}function Sr(r,o,t,i){return t===void 0&&(t=null),Ie({pathname:typeof r=="string"?r:r.pathname,search:"",hash:""},typeof o=="string"?er(o):o,{state:t,key:o&&o.key||i||oi()})}function Tt(r){let{pathname:o="/",search:t="",hash:i=""}=r;return t&&t!=="?"&&(o+=t.charAt(0)==="?"?t:"?"+t),i&&i!=="#"&&(o+=i.charAt(0)==="#"?i:"#"+i),o}function er(r){let o={};if(r){let t=r.indexOf("#");t>=0&&(o.hash=r.substr(t),r=r.substr(0,t));let i=r.indexOf("?");i>=0&&(o.search=r.substr(i),r=r.substr(0,i)),r&&(o.pathname=r)}return o}function ii(r,o,t,i){i===void 0&&(i={});let{window:a=document.defaultView,v5Compat:c=!1}=i,s=a.history,p=ge.Pop,d=null,m=x();m==null&&(m=0,s.replaceState(Ie({},s.state,{idx:m}),""));function x(){return(s.state||{idx:null}).idx}function b(){p=ge.Pop;let g=x(),h=g==null?null:g-m;m=g,d&&d({action:p,location:v.location,delta:h})}function k(g,h){p=ge.Push;let w=Sr(v.location,g,h);m=x()+1;let M=lt(w,m),T=v.createHref(w);try{s.pushState(M,"",T)}catch(q){if(q instanceof DOMException&&q.name==="DataCloneError")throw q;a.location.assign(T)}c&&d&&d({action:p,location:v.location,delta:1})}function y(g,h){p=ge.Replace;let w=Sr(v.location,g,h);m=x();let M=lt(w,m),T=v.createHref(w);s.replaceState(M,"",T),c&&d&&d({action:p,location:v.location,delta:0})}function S(g){let h=a.location.origin!=="null"?a.location.origin:a.location.href,w=typeof g=="string"?g:Tt(g);return w=w.replace(/ $/,"%20"),re(h,"No window.location.(origin|href) available to create URL for href: "+w),new URL(w,h)}let v={get action(){return p},get location(){return r(a,s)},listen(g){if(d)throw new Error("A history only accepts one active listener");return a.addEventListener(st,b),d=g,()=>{a.removeEventListener(st,b),d=null}},createHref(g){return o(a,g)},createURL:S,encodeLocation(g){let h=S(g);return{pathname:h.pathname,search:h.search,hash:h.hash}},push:k,replace:y,go(g){return s.go(g)}};return v}var dt;(function(r){r.data="data",r.deferred="deferred",r.redirect="redirect",r.error="error"})(dt||(dt={}));function ai(r,o){if(o==="/")return r;if(!r.toLowerCase().startsWith(o.toLowerCase()))return null;let t=o.endsWith("/")?o.length-1:o.length,i=r.charAt(t);return i&&i!=="/"?null:r.slice(t)||"/"}const ni=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,si=r=>ni.test(r);function li(r,o){o===void 0&&(o="/");let{pathname:t,search:i="",hash:a=""}=typeof r=="string"?er(r):r,c;if(t)if(si(t))c=t;else{if(t.includes("//")){let s=t;t=t.replace(/\/\/+/g,"/"),ti(!1,"Pathnames cannot have embedded double slashes - normalizing "+(s+" -> "+t))}t.startsWith("/")?c=ct(t.substring(1),"/"):c=ct(t,o)}else c=o;return{pathname:c,search:fi(i),hash:mi(a)}}function ct(r,o){let t=o.replace(/\/+$/,"").split("/");return r.split("/").forEach(a=>{a===".."?t.length>1&&t.pop():a!=="."&&t.push(a)}),t.length>1?t.join("/"):"/"}function xr(r,o,t,i){return"Cannot include a '"+r+"' character in a manually specified "+("`to."+o+"` field ["+JSON.stringify(i)+"].  Please separate it out to the ")+("`to."+t+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function di(r){return r.filter((o,t)=>t===0||o.route.path&&o.route.path.length>0)}function ci(r,o){let t=di(r);return o?t.map((i,a)=>a===t.length-1?i.pathname:i.pathnameBase):t.map(i=>i.pathnameBase)}function pi(r,o,t,i){i===void 0&&(i=!1);let a;typeof r=="string"?a=er(r):(a=Ie({},r),re(!a.pathname||!a.pathname.includes("?"),xr("?","pathname","search",a)),re(!a.pathname||!a.pathname.includes("#"),xr("#","pathname","hash",a)),re(!a.search||!a.search.includes("#"),xr("#","search","hash",a)));let c=r===""||a.pathname==="",s=c?"/":a.pathname,p;if(s==null)p=t;else{let b=o.length-1;if(!i&&s.startsWith("..")){let k=s.split("/");for(;k[0]==="..";)k.shift(),b-=1;a.pathname=k.join("/")}p=b>=0?o[b]:"/"}let d=li(a,p),m=s&&s!=="/"&&s.endsWith("/"),x=(c||s===".")&&t.endsWith("/");return!d.pathname.endsWith("/")&&(m||x)&&(d.pathname+="/"),d}const gi=r=>r.join("/").replace(/\/\/+/g,"/"),fi=r=>!r||r==="?"?"":r.startsWith("?")?r:"?"+r,mi=r=>!r||r==="#"?"":r.startsWith("#")?r:"#"+r,At=["post","put","patch","delete"];new Set(At);const xi=["get",...At];new Set(xi);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ke(){return Ke=Object.assign?Object.assign.bind():function(r){for(var o=1;o<arguments.length;o++){var t=arguments[o];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(r[i]=t[i])}return r},Ke.apply(this,arguments)}const Nt=l.createContext(null),Ar=l.createContext(null),Nr=l.createContext(null),Rr=l.createContext({outlet:null,matches:[],isDataRoute:!1});function Mr(){return l.useContext(Nr)!=null}function Rt(){return Mr()||re(!1),l.useContext(Nr).location}function Mt(r){l.useContext(Ar).static||l.useLayoutEffect(r)}function ui(){let{isDataRoute:r}=l.useContext(Rr);return r?wi():bi()}function bi(){Mr()||re(!1);let r=l.useContext(Nt),{basename:o,future:t,navigator:i}=l.useContext(Ar),{matches:a}=l.useContext(Rr),{pathname:c}=Rt(),s=JSON.stringify(ci(a,t.v7_relativeSplatPath)),p=l.useRef(!1);return Mt(()=>{p.current=!0}),l.useCallback(function(m,x){if(x===void 0&&(x={}),!p.current)return;if(typeof m=="number"){i.go(m);return}let b=pi(m,JSON.parse(s),c,x.relative==="path");r==null&&o!=="/"&&(b.pathname=b.pathname==="/"?o:gi([o,b.pathname])),(x.replace?i.replace:i.push)(b,x.state,x)},[o,i,s,c,r])}var Pt=function(r){return r.UseBlocker="useBlocker",r.UseRevalidator="useRevalidator",r.UseNavigateStable="useNavigate",r}(Pt||{}),It=function(r){return r.UseBlocker="useBlocker",r.UseLoaderData="useLoaderData",r.UseActionData="useActionData",r.UseRouteError="useRouteError",r.UseNavigation="useNavigation",r.UseRouteLoaderData="useRouteLoaderData",r.UseMatches="useMatches",r.UseRevalidator="useRevalidator",r.UseNavigateStable="useNavigate",r.UseRouteId="useRouteId",r}(It||{});function hi(r){let o=l.useContext(Nt);return o||re(!1),o}function yi(r){let o=l.useContext(Rr);return o||re(!1),o}function vi(r){let o=yi(),t=o.matches[o.matches.length-1];return t.route.id||re(!1),t.route.id}function wi(){let{router:r}=hi(Pt.UseNavigateStable),o=vi(It.UseNavigateStable),t=l.useRef(!1);return Mt(()=>{t.current=!0}),l.useCallback(function(a,c){c===void 0&&(c={}),t.current&&(typeof a=="number"?r.navigate(a):r.navigate(a,Ke({fromRouteId:o},c)))},[r,o])}function ki(r,o){r==null||r.v7_startTransition,r==null||r.v7_relativeSplatPath}function ji(r){let{basename:o="/",children:t=null,location:i,navigationType:a=ge.Pop,navigator:c,static:s=!1,future:p}=r;Mr()&&re(!1);let d=o.replace(/^\/*/,"/"),m=l.useMemo(()=>({basename:d,navigator:c,static:s,future:Ke({v7_relativeSplatPath:!1},p)}),[d,p,c,s]);typeof i=="string"&&(i=er(i));let{pathname:x="/",search:b="",hash:k="",state:y=null,key:S="default"}=i,v=l.useMemo(()=>{let g=ai(x,d);return g==null?null:{location:{pathname:g,search:b,hash:k,state:y,key:S},navigationType:a}},[d,x,b,k,y,S,a]);return v==null?null:l.createElement(Ar.Provider,{value:m},l.createElement(Nr.Provider,{children:t,value:v}))}new Promise(()=>{});/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Si="6";try{window.__reactRouterVersion=Si}catch{}const zi="startTransition",pt=Ho[zi];function Ci(r){let{basename:o,children:t,future:i,window:a}=r,c=l.useRef();c.current==null&&(c.current=ri({window:a,v5Compat:!0}));let s=c.current,[p,d]=l.useState({action:s.action,location:s.location}),{v7_startTransition:m}=i||{},x=l.useCallback(b=>{m&&pt?pt(()=>d(b)):d(b)},[d,m]);return l.useLayoutEffect(()=>s.listen(x),[s,x]),l.useEffect(()=>ki(i),[i]),l.createElement(ji,{basename:o,children:t,location:p.location,navigationType:p.action,navigator:s,future:i})}var gt;(function(r){r.UseScrollRestoration="useScrollRestoration",r.UseSubmit="useSubmit",r.UseSubmitFetcher="useSubmitFetcher",r.UseFetcher="useFetcher",r.useViewTransitionState="useViewTransitionState"})(gt||(gt={}));var ft;(function(r){r.UseFetcher="useFetcher",r.UseFetchers="useFetchers",r.UseScrollRestoration="useScrollRestoration"})(ft||(ft={}));const J="https://www.yorix.cm",Lt=[{slug:"yaounde",name:"Yaoundé",region:"Centre"},{slug:"douala",name:"Douala",region:"Littoral"},{slug:"bafoussam",name:"Bafoussam",region:"Ouest"},{slug:"bamenda",name:"Bamenda",region:"Nord-Ouest"},{slug:"kribi",name:"Kribi",region:"Sud"},{slug:"bertoua",name:"Bertoua",region:"Est"},{slug:"garoua",name:"Garoua",region:"Nord"},{slug:"ngaoundere",name:"Ngaoundéré",region:"Adamaoua"},{slug:"maroua",name:"Maroua",region:"Extrême-Nord"},{slug:"ebolowa",name:"Ebolowa",region:"Sud"}],$=Object.fromEntries(Lt.map(r=>[r.slug,r]));Object.fromEntries(Lt.map(r=>[r.name.toLowerCase(),r.slug]));const Ot={plomberie:"Plomberie",electricite:"Électricité",menage:"Nettoyage",beaute:"Beauté",reparation:"Réparation",transport:"Transport",graphisme:"Graphisme",photographie:"Photographie",nettoyage:"Nettoyage",menuiserie:"Menuiserie",informatique:"Informatique",cuisine:"Cuisine",maconnerie:"Maçonnerie",peinture:"Peinture",couture:"Couture"},_i={"mode-accesoires":"Mode & Accessoires"};function Ei(r){return Dt(r||"")}function Dt(r){return r?(String(r).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ø/g,"o").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"yorix").slice(0,80):"yorix"}function mt(r,o){return`${Dt(r)}--${o}`}function xt(r){if(!r||typeof r!="string")return{base:"",id:""};const o=r.lastIndexOf("--");return o===-1?{base:r,id:""}:{base:r.slice(0,o),id:r.slice(o+2)}}const Qe={home:"/",produits:"/produits",livraison:"/livraison",escrow:"/escrow",prestataires:"/prestataires",inscription:"/devenir-prestataire",business:"/business",academy:"/academy",blog:"/blog",loyalty:"/fidelite",contact:"/contact",aide:"/aide",faq:"/faq",cgv:"/cgv",mentions:"/mentions-legales",confidentialite:"/politique-confidentialite",dashboard:"/dashboard",admin:"/admin",checkout:"/checkout",cart:"/panier",bonsPlans:"/bons-plans",notifications:"/notifications",devenirVendeur:"/devenir-vendeur",devenirLivreur:"/devenir-livreur"};function ur(r,o={}){if(r==="productDetail"&&o.productSlug)return`/produit/${o.productSlug}`;if(r==="prestDetail"&&o.prestSlug)return`/prestataire/${o.prestSlug}`;if(r==="produits"&&o.categorySlug)return`/categories/${o.categorySlug}`;if(r==="livraison"&&o.citySlug&&$[o.citySlug])return`/livraison/${o.citySlug}`;if(r==="prestataires"&&o.metierSlug&&o.villeSlug)return`/prestataires/${o.metierSlug}/${o.villeSlug}`;if(r==="seoCity"){const{citySlug:t,mode:i="hub"}=o;return!t||!$[t]?"/":i==="acheter"?`/acheter-a-${t}`:i==="livraison"?`/livraison-a-${t}`:i==="prestataires"?`/prestataires-a-${t}`:`/${t}`}return r==="academyDetail"&&o.courseId?`/academy/${o.courseId}`:r==="academyContact"&&o.courseId?`/academy/${o.courseId}/contact`:Qe[r]??"/"}function Ti(r,o=[]){if(!r)return"";const t=_i[r];return t&&o.includes(t)?t:o.find(a=>Ei(a)===r)||""}function Ai(r){const o=r.replace(/\/+$/,"")||"/";if(o==="/")return{page:"home",canonicalPath:"/"};const t=o.split("/").filter(Boolean),[i,a,c]=t;if(i==="produit"&&a)return{page:"productDetail",productSlug:a,canonicalPath:o};if(i==="categories"&&a)return{page:"produits",categorySlug:a,canonicalPath:o};if(i==="livraison")return a?$[a]?{page:"livraison",citySlug:a,canonicalPath:o}:{page:"livraison",canonicalPath:"/livraison"}:{page:"livraison",canonicalPath:"/livraison"};if(i==="prestataire"&&a)return{page:"prestDetail",prestSlug:a,canonicalPath:o};if(i==="prestataires"&&a&&c&&Ot[a]&&$[c])return{page:"prestataires",metierSlug:a,villeSlug:c,canonicalPath:o};if(i==="prestataires")return{page:"prestataires",canonicalPath:"/prestataires"};if(i==="academy"&&a)return c==="contact"?{page:"academyContact",courseId:a,canonicalPath:o}:{page:"academyDetail",courseId:a,canonicalPath:o};const s=$[i];if(t.length===1&&s)return{page:"seoCity",citySlug:i,cityMode:"hub",canonicalPath:o};if(i!=null&&i.startsWith("acheter-a-")){const d=i.replace(/^acheter-a-/,"");if($[d])return{page:"seoCity",citySlug:d,cityMode:"acheter",canonicalPath:o}}if(i!=null&&i.startsWith("livraison-a-")){const d=i.replace(/^livraison-a-/,"");if($[d])return{page:"seoCity",citySlug:d,cityMode:"livraison",canonicalPath:o}}if(i!=null&&i.startsWith("prestataires-a-")){const d=i.replace(/^prestataires-a-/,"");if($[d])return{page:"seoCity",citySlug:d,cityMode:"prestataires",canonicalPath:o}}const p={produits:"produits",livraison:"livraison",escrow:"escrow",prestataires:"prestataires",business:"business",academy:"academy",blog:"blog",fidelite:"loyalty",contact:"contact",aide:"aide",faq:"faq",cgv:"cgv",mentions:"mentions","mentions-legales":"mentions",confidentialite:"confidentialite","politique-confidentialite":"confidentialite",dashboard:"dashboard",admin:"admin",checkout:"checkout",panier:"cart",cart:"cart","bons-plans":"bonsPlans",notifications:"notifications","devenir-vendeur":"devenirVendeur","devenir-livreur":"devenirLivreur","devenir-prestataire":"inscription",inscription:"inscription"};if(t.length===1&&p[i]){const d=p[i];return{page:d,canonicalPath:Qe[d]??`/${i}`}}return{page:"home",canonicalPath:"/"}}function Ni(){return`${J}/produits`}var Ri=typeof Element<"u",Mi=typeof Map=="function",Pi=typeof Set=="function",Ii=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function He(r,o){if(r===o)return!0;if(r&&o&&typeof r=="object"&&typeof o=="object"){if(r.constructor!==o.constructor)return!1;var t,i,a;if(Array.isArray(r)){if(t=r.length,t!=o.length)return!1;for(i=t;i--!==0;)if(!He(r[i],o[i]))return!1;return!0}var c;if(Mi&&r instanceof Map&&o instanceof Map){if(r.size!==o.size)return!1;for(c=r.entries();!(i=c.next()).done;)if(!o.has(i.value[0]))return!1;for(c=r.entries();!(i=c.next()).done;)if(!He(i.value[1],o.get(i.value[0])))return!1;return!0}if(Pi&&r instanceof Set&&o instanceof Set){if(r.size!==o.size)return!1;for(c=r.entries();!(i=c.next()).done;)if(!o.has(i.value[0]))return!1;return!0}if(Ii&&ArrayBuffer.isView(r)&&ArrayBuffer.isView(o)){if(t=r.length,t!=o.length)return!1;for(i=t;i--!==0;)if(r[i]!==o[i])return!1;return!0}if(r.constructor===RegExp)return r.source===o.source&&r.flags===o.flags;if(r.valueOf!==Object.prototype.valueOf&&typeof r.valueOf=="function"&&typeof o.valueOf=="function")return r.valueOf()===o.valueOf();if(r.toString!==Object.prototype.toString&&typeof r.toString=="function"&&typeof o.toString=="function")return r.toString()===o.toString();if(a=Object.keys(r),t=a.length,t!==Object.keys(o).length)return!1;for(i=t;i--!==0;)if(!Object.prototype.hasOwnProperty.call(o,a[i]))return!1;if(Ri&&r instanceof Element)return!1;for(i=t;i--!==0;)if(!((a[i]==="_owner"||a[i]==="__v"||a[i]==="__o")&&r.$$typeof)&&!He(r[a[i]],o[a[i]]))return!1;return!0}return r!==r&&o!==o}var Li=function(o,t){try{return He(o,t)}catch(i){if((i.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw i}};const Oi=Tr(Li);var Di=function(r,o,t,i,a,c,s,p){if(!r){var d;if(o===void 0)d=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var m=[t,i,a,c,s,p],x=0;d=new Error(o.replace(/%s/g,function(){return m[x++]})),d.name="Invariant Violation"}throw d.framesToPop=1,d}},qi=Di;const ut=Tr(qi);var Bi=function(o,t,i,a){var c=i?i.call(a,o,t):void 0;if(c!==void 0)return!!c;if(o===t)return!0;if(typeof o!="object"||!o||typeof t!="object"||!t)return!1;var s=Object.keys(o),p=Object.keys(t);if(s.length!==p.length)return!1;for(var d=Object.prototype.hasOwnProperty.bind(t),m=0;m<s.length;m++){var x=s[m];if(!d(x))return!1;var b=o[x],k=t[x];if(c=i?i.call(a,b,k,x):void 0,c===!1||c===void 0&&b!==k)return!1}return!0};const Yi=Tr(Bi);var qt=(r=>(r.BASE="base",r.BODY="body",r.HEAD="head",r.HTML="html",r.LINK="link",r.META="meta",r.NOSCRIPT="noscript",r.SCRIPT="script",r.STYLE="style",r.TITLE="title",r.FRAGMENT="Symbol(react.fragment)",r))(qt||{}),br={link:{rel:["amphtml","canonical","alternate"]},script:{type:["application/ld+json"]},meta:{charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]}},bt=Object.values(qt),Pr={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},$i=Object.entries(Pr).reduce((r,[o,t])=>(r[t]=o,r),{}),Q="data-rh",Se={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate",PRIORITIZE_SEO_TAGS:"prioritizeSeoTags"},ze=(r,o)=>{for(let t=r.length-1;t>=0;t-=1){const i=r[t];if(Object.prototype.hasOwnProperty.call(i,o))return i[o]}return null},Fi=r=>{let o=ze(r,"title");const t=ze(r,Se.TITLE_TEMPLATE);if(Array.isArray(o)&&(o=o.join("")),t&&o)return t.replace(/%s/g,()=>o);const i=ze(r,Se.DEFAULT_TITLE);return o||i||void 0},Ui=r=>ze(r,Se.ON_CHANGE_CLIENT_STATE)||(()=>{}),hr=(r,o)=>o.filter(t=>typeof t[r]<"u").map(t=>t[r]).reduce((t,i)=>({...t,...i}),{}),Wi=(r,o)=>o.filter(t=>typeof t.base<"u").map(t=>t.base).reverse().reduce((t,i)=>{if(!t.length){const a=Object.keys(i);for(let c=0;c<a.length;c+=1){const p=a[c].toLowerCase();if(r.indexOf(p)!==-1&&i[p])return t.concat(i)}}return t},[]),Vi=r=>console&&typeof console.warn=="function"&&console.warn(r),Me=(r,o,t)=>{const i={};return t.filter(a=>Array.isArray(a[r])?!0:(typeof a[r]<"u"&&Vi(`Helmet: ${r} should be of type "Array". Instead found type "${typeof a[r]}"`),!1)).map(a=>a[r]).reverse().reduce((a,c)=>{const s={};c.filter(d=>{let m;const x=Object.keys(d);for(let k=0;k<x.length;k+=1){const y=x[k],S=y.toLowerCase();o.indexOf(S)!==-1&&!(m==="rel"&&d[m].toLowerCase()==="canonical")&&!(S==="rel"&&d[S].toLowerCase()==="stylesheet")&&(m=S),o.indexOf(y)!==-1&&(y==="innerHTML"||y==="cssText"||y==="itemprop")&&(m=y)}if(!m||!d[m])return!1;const b=d[m].toLowerCase();return i[m]||(i[m]={}),s[m]||(s[m]={}),i[m][b]?!1:(s[m][b]=!0,!0)}).reverse().forEach(d=>a.push(d));const p=Object.keys(s);for(let d=0;d<p.length;d+=1){const m=p[d],x={...i[m],...s[m]};i[m]=x}return a},[]).reverse()},Hi=(r,o)=>{if(Array.isArray(r)&&r.length){for(let t=0;t<r.length;t+=1)if(r[t][o])return!0}return!1},Xi=r=>({baseTag:Wi(["href"],r),bodyAttributes:hr("bodyAttributes",r),defer:ze(r,Se.DEFER),encode:ze(r,Se.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:hr("htmlAttributes",r),linkTags:Me("link",["rel","href"],r),metaTags:Me("meta",["name","charset","http-equiv","property","itemprop"],r),noscriptTags:Me("noscript",["innerHTML"],r),onChangeClientState:Ui(r),scriptTags:Me("script",["src","innerHTML"],r),styleTags:Me("style",["cssText"],r),title:Fi(r),titleAttributes:hr("titleAttributes",r),prioritizeSeoTags:Hi(r,Se.PRIORITIZE_SEO_TAGS)}),Bt=r=>Array.isArray(r)?r.join(""):r,Gi=(r,o)=>{const t=Object.keys(r);for(let i=0;i<t.length;i+=1)if(o[t[i]]&&o[t[i]].includes(r[t[i]]))return!0;return!1},yr=(r,o)=>Array.isArray(r)?r.reduce((t,i)=>(Gi(i,o)?t.priority.push(i):t.default.push(i),t),{priority:[],default:[]}):{default:r,priority:[]},ht=(r,o)=>({...r,[o]:void 0}),Ji=["noscript","script","style"],zr=(r,o=!0)=>o===!1?String(r):String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"),Yt=r=>Object.keys(r).reduce((o,t)=>{const i=typeof r[t]<"u"?`${t}="${r[t]}"`:`${t}`;return o?`${o} ${i}`:i},""),Ki=(r,o,t,i)=>{const a=Yt(t),c=Bt(o);return a?`<${r} ${Q}="true" ${a}>${zr(c,i)}</${r}>`:`<${r} ${Q}="true">${zr(c,i)}</${r}>`},Qi=(r,o,t=!0)=>o.reduce((i,a)=>{const c=a,s=Object.keys(c).filter(m=>!(m==="innerHTML"||m==="cssText")).reduce((m,x)=>{const b=typeof c[x]>"u"?x:`${x}="${zr(c[x],t)}"`;return m?`${m} ${b}`:b},""),p=c.innerHTML||c.cssText||"",d=Ji.indexOf(r)===-1;return`${i}<${r} ${Q}="true" ${s}${d?"/>":`>${p}</${r}>`}`},""),$t=(r,o={})=>Object.keys(r).reduce((t,i)=>{const a=Pr[i];return t[a||i]=r[i],t},o),Zi=(r,o,t)=>{const i={key:o,[Q]:!0},a=$t(t,i);return[oe.createElement("title",a,o)]},Xe=(r,o)=>o.map((t,i)=>{const a={key:i,[Q]:!0};return Object.keys(t).forEach(c=>{const p=Pr[c]||c;if(p==="innerHTML"||p==="cssText"){const d=t.innerHTML||t.cssText;a.dangerouslySetInnerHTML={__html:d}}else a[p]=t[c]}),oe.createElement(r,a)}),V=(r,o,t=!0)=>{switch(r){case"title":return{toComponent:()=>Zi(r,o.title,o.titleAttributes),toString:()=>Ki(r,o.title,o.titleAttributes,t)};case"bodyAttributes":case"htmlAttributes":return{toComponent:()=>$t(o),toString:()=>Yt(o)};default:return{toComponent:()=>Xe(r,o),toString:()=>Qi(r,o,t)}}},ea=({metaTags:r,linkTags:o,scriptTags:t,encode:i})=>{const a=yr(r,br.meta),c=yr(o,br.link),s=yr(t,br.script);return{priorityMethods:{toComponent:()=>[...Xe("meta",a.priority),...Xe("link",c.priority),...Xe("script",s.priority)],toString:()=>`${V("meta",a.priority,i)} ${V("link",c.priority,i)} ${V("script",s.priority,i)}`},metaTags:a.default,linkTags:c.default,scriptTags:s.default}},ra=r=>{const{baseTag:o,bodyAttributes:t,encode:i=!0,htmlAttributes:a,noscriptTags:c,styleTags:s,title:p="",titleAttributes:d,prioritizeSeoTags:m}=r;let{linkTags:x,metaTags:b,scriptTags:k}=r,y={toComponent:()=>{},toString:()=>""};return m&&({priorityMethods:y,linkTags:x,metaTags:b,scriptTags:k}=ea(r)),{priority:y,base:V("base",o,i),bodyAttributes:V("bodyAttributes",t,i),htmlAttributes:V("htmlAttributes",a,i),link:V("link",x,i),meta:V("meta",b,i),noscript:V("noscript",c,i),script:V("script",k,i),style:V("style",s,i),title:V("title",{title:p,titleAttributes:d},i)}},Cr=ra,We=[],Ft=!!(typeof window<"u"&&window.document&&window.document.createElement),_r=class{constructor(r,o){te(this,"instances",[]);te(this,"canUseDOM",Ft);te(this,"context");te(this,"value",{setHelmet:r=>{this.context.helmet=r},helmetInstances:{get:()=>this.canUseDOM?We:this.instances,add:r=>{(this.canUseDOM?We:this.instances).push(r)},remove:r=>{const o=(this.canUseDOM?We:this.instances).indexOf(r);(this.canUseDOM?We:this.instances).splice(o,1)}}});this.context=r,this.canUseDOM=o||!1,o||(r.helmet=Cr({baseTag:[],bodyAttributes:{},htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}},ta={},Ut=oe.createContext(ta),fe,Wt=(fe=class extends l.Component{constructor(t){super(t);te(this,"helmetData");this.helmetData=new _r(this.props.context||{},fe.canUseDOM)}render(){return oe.createElement(Ut.Provider,{value:this.helmetData.value},this.props.children)}},te(fe,"canUseDOM",Ft),fe),je=(r,o)=>{const t=document.head||document.querySelector("head"),i=t.querySelectorAll(`${r}[${Q}]`),a=[].slice.call(i),c=[];let s;return o&&o.length&&o.forEach(p=>{const d=document.createElement(r);for(const m in p)if(Object.prototype.hasOwnProperty.call(p,m))if(m==="innerHTML")d.innerHTML=p.innerHTML;else if(m==="cssText")d.styleSheet?d.styleSheet.cssText=p.cssText:d.appendChild(document.createTextNode(p.cssText));else{const x=m,b=typeof p[x]>"u"?"":p[x];d.setAttribute(m,b)}d.setAttribute(Q,"true"),a.some((m,x)=>(s=x,d.isEqualNode(m)))?a.splice(s,1):c.push(d)}),a.forEach(p=>{var d;return(d=p.parentNode)==null?void 0:d.removeChild(p)}),c.forEach(p=>t.appendChild(p)),{oldTags:a,newTags:c}},Er=(r,o)=>{const t=document.getElementsByTagName(r)[0];if(!t)return;const i=t.getAttribute(Q),a=i?i.split(","):[],c=[...a],s=Object.keys(o);for(const p of s){const d=o[p]||"";t.getAttribute(p)!==d&&t.setAttribute(p,d),a.indexOf(p)===-1&&a.push(p);const m=c.indexOf(p);m!==-1&&c.splice(m,1)}for(let p=c.length-1;p>=0;p-=1)t.removeAttribute(c[p]);a.length===c.length?t.removeAttribute(Q):t.getAttribute(Q)!==s.join(",")&&t.setAttribute(Q,s.join(","))},oa=(r,o)=>{typeof r<"u"&&document.title!==r&&(document.title=Bt(r)),Er("title",o)},yt=(r,o)=>{const{baseTag:t,bodyAttributes:i,htmlAttributes:a,linkTags:c,metaTags:s,noscriptTags:p,onChangeClientState:d,scriptTags:m,styleTags:x,title:b,titleAttributes:k}=r;Er("body",i),Er("html",a),oa(b,k);const y={baseTag:je("base",t),linkTags:je("link",c),metaTags:je("meta",s),noscriptTags:je("noscript",p),scriptTags:je("script",m),styleTags:je("style",x)},S={},v={};Object.keys(y).forEach(g=>{const{newTags:h,oldTags:w}=y[g];h.length&&(S[g]=h),w.length&&(v[g]=y[g].oldTags)}),o&&o(),d(r,S,v)},Pe=null,ia=r=>{Pe&&cancelAnimationFrame(Pe),r.defer?Pe=requestAnimationFrame(()=>{yt(r,()=>{Pe=null})}):(yt(r),Pe=null)},aa=ia,vt=class extends l.Component{constructor(){super(...arguments);te(this,"rendered",!1)}shouldComponentUpdate(o){return!Yi(o,this.props)}componentDidUpdate(){this.emitChange()}componentWillUnmount(){const{helmetInstances:o}=this.props.context;o.remove(this),this.emitChange()}emitChange(){const{helmetInstances:o,setHelmet:t}=this.props.context;let i=null;const a=Xi(o.get().map(c=>{const s={...c.props};return delete s.context,s}));Wt.canUseDOM?aa(a):Cr&&(i=Cr(a)),t(i)}init(){if(this.rendered)return;this.rendered=!0;const{helmetInstances:o}=this.props.context;o.add(this),this.emitChange()}render(){return this.init(),null}},kr,na=(kr=class extends l.Component{shouldComponentUpdate(r){return!Oi(ht(this.props,"helmetData"),ht(r,"helmetData"))}mapNestedChildrenToProps(r,o){if(!o)return null;switch(r.type){case"script":case"noscript":return{innerHTML:o};case"style":return{cssText:o};default:throw new Error(`<${r.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`)}}flattenArrayTypeChildren(r,o,t,i){return{...o,[r.type]:[...o[r.type]||[],{...t,...this.mapNestedChildrenToProps(r,i)}]}}mapObjectTypeChildren(r,o,t,i){switch(r.type){case"title":return{...o,[r.type]:i,titleAttributes:{...t}};case"body":return{...o,bodyAttributes:{...t}};case"html":return{...o,htmlAttributes:{...t}};default:return{...o,[r.type]:{...t}}}}mapArrayTypeChildrenToProps(r,o){let t={...o};return Object.keys(r).forEach(i=>{t={...t,[i]:r[i]}}),t}warnOnInvalidChildren(r,o){return ut(bt.some(t=>r.type===t),typeof r.type=="function"?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${bt.join(", ")} are allowed. Helmet does not support rendering <${r.type}> elements. Refer to our API for more information.`),ut(!o||typeof o=="string"||Array.isArray(o)&&!o.some(t=>typeof t!="string"),`Helmet expects a string as a child of <${r.type}>. Did you forget to wrap your children in braces? ( <${r.type}>{\`\`}</${r.type}> ) Refer to our API for more information.`),!0}mapChildrenToProps(r,o){let t={};return oe.Children.forEach(r,i=>{if(!i||!i.props)return;const{children:a,...c}=i.props,s=Object.keys(c).reduce((d,m)=>(d[$i[m]||m]=c[m],d),{});let{type:p}=i;switch(typeof p=="symbol"?p=p.toString():this.warnOnInvalidChildren(i,a),p){case"Symbol(react.fragment)":o=this.mapChildrenToProps(a,o);break;case"link":case"meta":case"noscript":case"script":case"style":t=this.flattenArrayTypeChildren(i,t,s,a);break;default:o=this.mapObjectTypeChildren(i,o,s,a);break}}),this.mapArrayTypeChildrenToProps(t,o)}render(){const{children:r,...o}=this.props;let t={...o},{helmetData:i}=o;if(r&&(t=this.mapChildrenToProps(r,t)),i&&!(i instanceof _r)){const a=i;i=new _r(a.context,!0),delete t.helmetData}return i?oe.createElement(vt,{...t,context:i.value}):oe.createElement(Ut.Consumer,null,a=>oe.createElement(vt,{...t,context:a}))}},te(kr,"defaultProps",{defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1}),kr);function sa({title:r,description:o,canonicalPath:t,robots:i="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",keywords:a,ogType:c="website",ogImage:s="https://www.yorix.cm/og-image.svg",ogImageAlt:p,ogImageType:d,jsonLd:m=[],noindex:x=!1}){const b=`${J}${t!=null&&t.startsWith("/")?t:`/${t||""}`}`.replace(/([^:]\/)\/+/g,"$1"),k=x?"noindex, nofollow":i,y=Array.isArray(m)?m.filter(Boolean):m?[m]:[],S=p||r||"Yorix CM — Marketplace #1 au Cameroun",v=d||(s.endsWith(".svg")?"image/svg+xml":s.endsWith(".png")?"image/png":s.endsWith(".webp")?"image/webp":"image/jpeg");return e.jsxs(na,{children:[e.jsx("html",{lang:"fr-CM"}),e.jsx("title",{children:r}),e.jsx("meta",{name:"description",content:o}),a&&e.jsx("meta",{name:"keywords",content:a}),e.jsx("meta",{name:"robots",content:k}),e.jsx("meta",{name:"googlebot",content:k}),e.jsx("link",{rel:"canonical",href:b}),e.jsx("link",{rel:"alternate",hrefLang:"fr-CM",href:b}),e.jsx("link",{rel:"alternate",hrefLang:"fr",href:b}),e.jsx("link",{rel:"alternate",hrefLang:"x-default",href:b}),e.jsx("meta",{property:"og:type",content:c}),e.jsx("meta",{property:"og:site_name",content:"Yorix CM"}),e.jsx("meta",{property:"og:title",content:r}),e.jsx("meta",{property:"og:description",content:o}),e.jsx("meta",{property:"og:url",content:b}),e.jsx("meta",{property:"og:image",content:s}),e.jsx("meta",{property:"og:image:type",content:v}),e.jsx("meta",{property:"og:image:width",content:"1200"}),e.jsx("meta",{property:"og:image:height",content:"630"}),e.jsx("meta",{property:"og:image:alt",content:S}),e.jsx("meta",{property:"og:locale",content:"fr_CM"}),e.jsx("meta",{property:"og:locale:alternate",content:"fr_FR"}),e.jsx("meta",{property:"og:locale:alternate",content:"en_US"}),e.jsx("meta",{name:"twitter:card",content:"summary_large_image"}),e.jsx("meta",{name:"twitter:site",content:"@yorixcm"}),e.jsx("meta",{name:"twitter:creator",content:"@yorixcm"}),e.jsx("meta",{name:"twitter:title",content:r}),e.jsx("meta",{name:"twitter:description",content:o}),e.jsx("meta",{name:"twitter:image",content:s}),e.jsx("meta",{name:"twitter:image:alt",content:S}),y.map((g,h)=>e.jsx("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:typeof g=="string"?g:JSON.stringify(g)}},h))]})}function la({items:r}){return r!=null&&r.length?e.jsx("nav",{"aria-label":"Fil d'Ariane",className:"seo-breadcrumb",children:e.jsx("ol",{style:{display:"flex",flexWrap:"wrap",gap:"6px 10px",alignItems:"center",listStyle:"none",margin:"0 0 16px",padding:0,fontSize:".78rem",color:"var(--gray)"},children:r.map((o,t)=>e.jsxs("li",{style:{display:"flex",alignItems:"center",gap:8},children:[t>0&&e.jsx("span",{"aria-hidden":"true",children:"/"}),o.href&&!o.current?e.jsx("a",{href:o.href,style:{color:"var(--green)",fontWeight:600},children:o.label}):e.jsx("span",{style:{color:o.current?"var(--ink)":"var(--gray)",fontWeight:o.current?700:500},children:o.label})]},o.href||t))})}):null}function wt({city:r,mode:o,goPage:t}){const i=(r==null?void 0:r.name)||"Cameroun",a=(r==null?void 0:r.slug)||"",c={hub:`Yorix à ${i} — marketplace, livraison & services`,acheter:`Acheter en ligne à ${i} — Yorix marketplace Cameroun`,livraison:`Livraison à ${i} — livreurs & colis au Cameroun`,prestataires:`Prestataires à ${i} — services à domicile vérifiés`},s={hub:`Yorix est une marketplace camerounaise : achetez en ligne à ${i}, faites-vous livrer rapidement et trouvez des prestataires vérifiés. Paiement MTN MoMo, Orange Money et protection Escrow.`,acheter:`Sur Yorix, l’achat en ligne à ${i} est simple : catalogue produits locaux et importés, vendeurs vérifiés, livraison suivie. Idéal pour votre shopping au Cameroun.`,livraison:`Notre service de livraison couvre ${i} et le réseau national : livreurs indépendants, suivi et tarifs transparents. Colis, courses, e-commerce — Yorix Ride.`,prestataires:`Trouvez des prestataires à ${i} : plomberie, électricité, ménage, beauté, BTP… profils vérifiés et réservation par WhatsApp.`},p=[{label:"Accueil",href:"/"},{label:c[o]||c.hub,current:!0}];return e.jsx("section",{className:"sec",style:{paddingBottom:8},children:e.jsxs("div",{style:{maxWidth:920,margin:"0 auto"},children:[e.jsx(la,{items:p}),e.jsxs("header",{children:[e.jsx("h1",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.15rem, 2.5vw, 1.45rem)",color:"var(--ink)",margin:"0 0 12px",letterSpacing:"-.4px"},children:c[o]||c.hub}),e.jsx("p",{style:{fontSize:".88rem",color:"var(--gray)",lineHeight:1.75,margin:0},children:s[o]||s.hub})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:10,marginTop:18},children:[e.jsxs("button",{type:"button",className:"cta-w",style:{padding:"12px 14px",textAlign:"left",borderRadius:12,cursor:"pointer"},onClick:()=>a&&t("seoCity",{citySlug:a,mode:"acheter"}),children:[e.jsxs("strong",{style:{display:"block",marginBottom:4},children:["🛍️ Produits à ",i]}),e.jsx("span",{style:{fontSize:".76rem",opacity:.9},children:"Marketplace & catégories"})]}),e.jsxs("button",{type:"button",className:"cta-w",style:{padding:"12px 14px",textAlign:"left",borderRadius:12,cursor:"pointer"},onClick:()=>a&&t("seoCity",{citySlug:a,mode:"livraison"}),children:[e.jsx("strong",{style:{display:"block",marginBottom:4},children:"🚚 Livraison"}),e.jsx("span",{style:{fontSize:".76rem",opacity:.9},children:"Livreurs & délais"})]}),e.jsxs("button",{type:"button",className:"cta-w",style:{padding:"12px 14px",textAlign:"left",borderRadius:12,cursor:"pointer"},onClick:()=>a&&t("seoCity",{citySlug:a,mode:"prestataires"}),children:[e.jsx("strong",{style:{display:"block",marginBottom:4},children:"👷 Prestataires"}),e.jsx("span",{style:{fontSize:".76rem",opacity:.9},children:"Services à domicile"})]}),e.jsxs("button",{type:"button",className:"cta-w",style:{padding:"12px 14px",textAlign:"left",borderRadius:12,cursor:"pointer"},onClick:()=>t("business"),children:[e.jsx("strong",{style:{display:"block",marginBottom:4},children:"💼 Business"}),e.jsx("span",{style:{fontSize:".76rem",opacity:.9},children:"B2B & grossistes"})]})]})]})})}const da="https://msrymchhhxitdevthvdi.supabase.co",ca="sb_publishable_yJj7JNdn-r19Pjc070IOBg_y2VzGJXA",pa=da,ga=ca,N=Xo(pa,ga),Ge="237696565654",fa="676935195",ma="696565654",xa="237696565654",ua="yorix_unsigned",kt=["Téléphones & HighTech","Mode & Accessoires","Alimentation","Maison & Decoration","Agricole","Beauté & Soins","BTP","Automobile","Éducation","Services"],ba=["Toutes les villes","Douala","Yaoundé","Bafoussam","Bamenda","Garoua","Kribi","Ngaoundéré","Maroua","Ebolowa","Buea","Bertoua"],jt={buyer:"🛍️ Acheteur",seller:"🏪 Vendeur",delivery:"🚚 Livreur",provider:"👷 Prestataire",admin:"🛡️ Administrateur"},Mn={pending:"⏳ En attente",en_cours:"🚚 En cours",livre:"✅ Livré",echec:"❌ Échoué"},Pn={pending:"⏳ En attente",securise:"🔐 Sécurisé",libere:"✅ Libéré",rembourse:"↩️ Remboursé"},ha=[{id:"p1",name:"Claude Mbassi",metier:"Plombier certifié",categorie:"Plomberie",ville:"Douala",quartier:"Akwa",emoji:"🔧",photo:"https://images.unsplash.com/photo-1620207418302-439b387441b0?w=400&q=80",color_bg:"linear-gradient(135deg, #dbeafe, #bfdbfe)",tags:["Plomberie","Sanitaire","Chauffe-eau"],note:4.9,avis:87,prix:"15 000 FCFA/h",experience:"8 ans",verifie:!0,top:!0,dispo:!0,bio:"Spécialiste en installations sanitaires et réparations d'urgence. Intervention rapide dans tout Douala. Devis gratuit.",telephone:"+237696565454",realisations:340},{id:"p2",name:"Électro Bertrand",metier:"Électricien",categorie:"Électricité",ville:"Yaoundé",quartier:"Bastos",emoji:"⚡",photo:"https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&q=80",color_bg:"linear-gradient(135deg, #fef3c7, #fde68a)",tags:["Électricité","Installation","Dépannage"],note:4.8,avis:124,prix:"12 000 FCFA/h",experience:"12 ans",verifie:!0,top:!0,dispo:!0,bio:"Installation électrique complète, mise aux normes, dépannage 24h/24. Travaux garantis 1 an.",telephone:"+237677884455",realisations:450},{id:"p3",name:"Raissa Design",metier:"Graphiste freelance",categorie:"Graphisme",ville:"Douala",quartier:"Bonanjo",emoji:"🎨",photo:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",color_bg:"linear-gradient(135deg, #fce7f3, #fbcfe8)",tags:["Logo","Flyer","Branding"],note:5,avis:56,prix:"25 000 FCFA/projet",experience:"5 ans",verifie:!0,top:!1,dispo:!0,bio:"Création d'identité visuelle, logos, flyers et supports print. Style moderne et africain contemporain.",telephone:"+237699001122",realisations:180},{id:"p4",name:"PhotoCam Pro",metier:"Photographe",categorie:"Photographie",ville:"Kribi",quartier:"Centre-ville",emoji:"📸",photo:"https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400&q=80",color_bg:"linear-gradient(135deg, #e0e7ff, #c7d2fe)",tags:["Mariage","Portrait","Événementiel"],note:4.9,avis:203,prix:"50 000 FCFA/jour",experience:"10 ans",verifie:!0,top:!0,dispo:!0,bio:"Photographe de mariage, portrait et événementiel. Studio équipé + déplacement partout au Cameroun.",telephone:"+237670223344",realisations:520},{id:"p5",name:"CleanPro237",metier:"Service de nettoyage",categorie:"Nettoyage",ville:"Douala",quartier:"Bonapriso",emoji:"🧹",photo:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",color_bg:"linear-gradient(135deg, #dcfce7, #bbf7d0)",tags:["Ménage","Bureaux","Grand nettoyage"],note:4.6,avis:312,prix:"8 000 FCFA/h",experience:"6 ans",verifie:!0,top:!1,dispo:!0,bio:"Nettoyage professionnel de maisons, bureaux et appartements. Produits écologiques. Équipe formée.",telephone:"+237655112233",realisations:890},{id:"p6",name:"DevCam Tech",metier:"Développeur Web",categorie:"Informatique",ville:"Yaoundé",quartier:"Nlongkak",emoji:"💻",photo:"https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80",color_bg:"linear-gradient(135deg, #cffafe, #a5f3fc)",tags:["Site web","App","E-commerce"],note:4.8,avis:41,prix:"200 000 FCFA/projet",experience:"7 ans",verifie:!0,top:!0,dispo:!0,bio:"Création de sites web, applications mobiles et boutiques en ligne. Technologies React, Next.js, React Native.",telephone:"+237690112233",realisations:95},{id:"p7",name:"Kouakou Menuiserie",metier:"Menuisier ébéniste",categorie:"Menuiserie",ville:"Bafoussam",quartier:"Tamdja",emoji:"🪚",photo:"https://images.unsplash.com/photo-1513467655676-561b7d489a88?w=400&q=80",color_bg:"linear-gradient(135deg, #fed7aa, #fdba74)",tags:["Meubles","Placards","Sur-mesure"],note:4.7,avis:156,prix:"À partir de 50 000 FCFA",experience:"15 ans",verifie:!0,top:!1,dispo:!0,bio:"Menuiserie traditionnelle et moderne. Fabrication de meubles sur-mesure, placards, portes et fenêtres.",telephone:"+237677445566",realisations:420},{id:"p8",name:"Chef Marguerite",metier:"Cuisinière événementielle",categorie:"Cuisine",ville:"Douala",quartier:"Logbessou",emoji:"👩‍🍳",photo:"https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80",color_bg:"linear-gradient(135deg, #fecaca, #fca5a5)",tags:["Traiteur","Mariages","Cuisine locale"],note:4.9,avis:178,prix:"3 500 FCFA/pers.",experience:"20 ans",verifie:!0,top:!0,dispo:!0,bio:"Traiteur spécialisé cuisine camerounaise et internationale. Ndolé, Poulet DG, Eru... pour mariages et événements.",telephone:"+237699778899",realisations:260},{id:"p9",name:"Beauté by Sandra",metier:"Coiffeuse à domicile",categorie:"Beauté",ville:"Yaoundé",quartier:"Mvan",emoji:"💇‍♀️",photo:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",color_bg:"linear-gradient(135deg, #fbcfe8, #f9a8d4)",tags:["Tresses","Coloration","Soins"],note:5,avis:89,prix:"10 000 FCFA/prest.",experience:"6 ans",verifie:!0,top:!1,dispo:!0,bio:"Coiffure à domicile : tresses africaines, mèches, coloration, soins capillaires. Je me déplace partout à Yaoundé.",telephone:"+237651223344",realisations:340}],In=[{id:1,slug:"vendre-en-ligne-cameroun-2026",title:"Comment vendre en ligne au Cameroun en 2026 : le guide complet",excerpt:"Stratégies concrètes pour lancer ton business e-commerce au Cameroun : choix des produits, marketing WhatsApp, paiement mobile, logistique locale.",cat:"BUSINESS",emoji:"📈",color_bg:"linear-gradient(135deg, #dbeafe, #bfdbfe)",image:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",date:"15 avril 2026",read:"8 min",author:"Équipe Yorix",author_avatar:"Y",featured:!0,external_url:"https://www.journalducameroun.com/e-commerce-au-cameroun-un-marche-en-pleine-expansion/",tags:["E-commerce","Cameroun","Business"]},{id:2,slug:"produits-camerounais-plus-vendus",title:"Les 10 produits camerounais les plus vendus en ligne",excerpt:"Beurre de karité, pagne wax, cacao, miel de Oku, poivre de Penja... Découvre les produits locaux qui cartonnent à l'international.",cat:"LOCAL",emoji:"🌿",color_bg:"linear-gradient(135deg, #dcfce7, #bbf7d0)",image:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",date:"12 avril 2026",read:"6 min",author:"Marie Tchoumi",author_avatar:"M",featured:!1,external_url:"https://www.investiraucameroun.com/agriculture",tags:["Produits locaux","Export","Artisanat"]},{id:3,slug:"mtn-momo-vs-orange-money",title:"MTN MoMo vs Orange Money : quel système de paiement choisir ?",excerpt:"Comparatif détaillé des deux géants du mobile money au Cameroun : frais, limites, sécurité, intégration marchande et expérience utilisateur.",cat:"PAIEMENT",emoji:"💳",color_bg:"linear-gradient(135deg, #fef3c7, #fde68a)",image:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",date:"10 avril 2026",read:"7 min",author:"Jean-Paul Essomba",author_avatar:"J",featured:!1,external_url:"https://www.gsma.com/mobilefordevelopment/mobile-money/",tags:["MoMo","Orange Money","Fintech"]},{id:4,slug:"suivi-commande-temps-reel",title:"Suivi de commande en temps réel : comment ça marche chez Yorix",excerpt:"Découvre notre système de tracking GPS inspiré d'Uber : de la collecte chez le vendeur jusqu'à ta porte, tu vois tout en direct.",cat:"LIVRAISON",emoji:"🚚",color_bg:"linear-gradient(135deg, #fed7aa, #fdba74)",image:"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",date:"8 avril 2026",read:"5 min",author:"Équipe Yorix Ride",author_avatar:"R",featured:!1,external_url:"https://www.uber.com/fr/newsroom/",tags:["Livraison","GPS","Technologie"]},{id:5,slug:"escrow-protection-acheteur",title:"Escrow Yorix : pourquoi ton argent est 100% protégé",excerpt:"Comprends en 5 minutes le système Escrow : ton paiement reste bloqué jusqu'à la livraison confirmée. Zéro arnaque, zéro stress.",cat:"SÉCURITÉ",emoji:"🔐",color_bg:"linear-gradient(135deg, #e9d5ff, #d8b4fe)",image:"https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",date:"5 avril 2026",read:"4 min",author:"Équipe Sécurité",author_avatar:"S",featured:!1,external_url:"https://en.wikipedia.org/wiki/Escrow",tags:["Escrow","Sécurité","Paiement"]},{id:6,slug:"electricien-fiable-douala",title:"Comment trouver un électricien fiable à Douala en 2026",excerpt:"Check-list complète : vérifier les qualifications, demander un devis, évaluer les avis, éviter les arnaques courantes dans le BTP camerounais.",cat:"PRESTATAIRES",emoji:"⚡",color_bg:"linear-gradient(135deg, #fecaca, #fca5a5)",image:"https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",date:"2 avril 2026",read:"6 min",author:"Service Prestataires",author_avatar:"P",featured:!1,external_url:"https://www.cameroon-tribune.cm/",tags:["BTP","Douala","Prestataires"]},{id:7,slug:"pagne-wax-histoire-tendances",title:"Le pagne wax camerounais : histoire, tendances et où acheter",excerpt:"Du marché de Mokolo aux défilés internationaux, le pagne wax conquiert le monde. Guide complet pour reconnaître un vrai pagne de qualité.",cat:"MODE",emoji:"👗",color_bg:"linear-gradient(135deg, #fce7f3, #fbcfe8)",image:"https://images.unsplash.com/photo-1617627191894-1c9e59f7a4ab?w=800&q=80",date:"28 mars 2026",read:"9 min",author:"Fatima Abakar",author_avatar:"F",featured:!1,external_url:"https://www.vogue.fr/mode/article/wax-pagne-africain-histoire",tags:["Mode","Pagne","Culture"]},{id:8,slug:"devenir-livreur-yorix",title:"Devenir livreur Yorix : gagne jusqu'à 150 000 FCFA/mois",excerpt:"Témoignages de livreurs actifs à Yaoundé et Douala, processus d'inscription, revenus réels et conseils pour maximiser tes gains.",cat:"CARRIÈRE",emoji:"🏍️",color_bg:"linear-gradient(135deg, #cffafe, #a5f3fc)",image:"https://images.unsplash.com/photo-1558383331-f520f2888351?w=800&q=80",date:"25 mars 2026",read:"7 min",author:"Équipe Yorix Ride",author_avatar:"R",featured:!1,external_url:"https://www.cameroon-info.net/",tags:["Emploi","Livraison","Revenus"]},{id:9,slug:"fiscalite-vendeurs-cameroun",title:"Fiscalité des vendeurs en ligne au Cameroun : ce qu'il faut savoir",excerpt:"TVA, impôt sur le revenu, patente : toutes les obligations fiscales d'un e-commerçant camerounais expliquées simplement.",cat:"BUSINESS",emoji:"📊",color_bg:"linear-gradient(135deg, #dbeafe, #bfdbfe)",image:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",date:"22 mars 2026",read:"10 min",author:"Expert Comptable",author_avatar:"E",featured:!1,external_url:"https://www.impots.cm/",tags:["Fiscalité","Impôts","Business"]}],Ln=[{icon:"🎁",name:"Bon 5 000 FCFA",pts:500},{icon:"🚚",name:"Livraison gratuite x3",pts:300},{icon:"⭐",name:"Statut VIP Yorix",pts:1e3},{icon:"📱",name:"-20% téléphones",pts:400},{icon:"☕",name:"Pack café 500g",pts:200},{icon:"🎓",name:"Cours Academy offert",pts:350}];function Je(r,o={}){if(!r||typeof r!="string"||!r.includes("cloudinary.com"))return r;const{width:t=400,quality:i="auto:low",format:a="auto",dpr:c="auto"}=o;if(r.includes("/w_")||r.includes("/q_"))return r;const s=[`w_${t}`,`q_${i}`,`f_${a}`,`dpr_${c}`,"c_limit"].join(",");return r.replace(/\/upload\//,`/upload/${s}/`)}function On(r){return!r||!r.includes("cloudinary.com")?"":[`${Je(r,{width:400})} 400w`,`${Je(r,{width:800})} 800w`,`${Je(r,{width:1200})} 1200w`].join(", ")}function Dn(r){return!r||!r.includes("cloudinary.com")?"":Je(r,{width:20,quality:"auto:low"})}async function qn(r){const o=new FormData;o.append("file",r),o.append("upload_preset",ua);const i=await(await fetch("https://api.cloudinary.com/v1_1/dulwb03nf/image/upload",{method:"POST",body:o})).json();if(i.error)throw new Error(i.error.message);return i.secure_url}async function ya(r){const{data:o,error:t}=await N.from("profiles").select("*").eq("id",r).maybeSingle();return t?(console.error("getUserProfile ERROR:",t),null):o}function va(r){const o=["buyer","seller","delivery","provider","admin"],t=r==null?void 0:r.role;return t==="superadmin"?"admin":t&&o.includes(t)?t:"buyer"}const wa=[/(\+?237[\s\-]?[0-9]{8,9})/g,/(\+?[0-9]{1,3}[\s\-]?[0-9]{9,10})/g,/(whatsapp|wa\.me|t\.me|telegram)/gi,/([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g,/(facebook\.com|instagram\.com)/gi];function ka(r){return wa.some(o=>new RegExp(o.source,o.flags).test(r))?{bloque:!0}:{bloque:!1}}const ja="https://msrymchhhxitdevthvdi.supabase.co/functions/v1/send-email";async function Sa({to:r,subject:o,html:t,from:i}){try{const a=await fetch(ja,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({to:r,subject:o,html:t,from:i})}),c=await a.json();return a.ok?{success:!0,id:c.id}:(console.error("sendEmail error:",c),{success:!1,error:c.error})}catch(a){return console.error("sendEmail exception:",a),{success:!1,error:a.message}}}function za(r,o){return`
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f5f1e8;padding:0">
      <div style="background:linear-gradient(135deg,#1a6b3a,#0d4a25);padding:24px 32px;text-align:center">
        <h1 style="color:#fff;margin:0;font-size:28px;letter-spacing:-.5px">Yo<span style="color:#fcd116">rix</span> CM</h1>
        <p style="color:rgba(255,255,255,.8);margin:4px 0 0;font-size:13px">Marketplace du Cameroun 🇨🇲</p>
      </div>
      <div style="background:#fff;padding:32px;border-left:1px solid #e2ddd6;border-right:1px solid #e2ddd6">
        <h2 style="color:#1a6b3a;margin:0 0 16px;font-size:20px">${r}</h2>
        ${o}
      </div>
      <div style="background:#0d1f14;padding:20px 32px;text-align:center;color:rgba(255,255,255,.6);font-size:12px">
        <p style="margin:0 0 8px"><strong style="color:#fff">Yorix CM</strong> — RC DOUALA/2026/B237</p>
        <p style="margin:0">📱 +237 696 56 56 54 · ✉️ support@yorix.cm · 🌐 <a href="https://www.yorix.cm" style="color:#4fd17d">yorix.cm</a></p>
        <p style="margin:12px 0 0;font-size:11px;opacity:.5">Vous recevez cet email car vous êtes utilisateur de Yorix CM.</p>
      </div>
    </div>
  `}function Ca(r,o="client"){const i={buyer:"acheteur",seller:"vendeur",delivery:"livreur",provider:"prestataire",client:"client"}[o]||"client";return za(`Bienvenue sur Yorix, ${r} ! 🎉`,`
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
    `)}const _a=r=>`
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
  --yorix-r-sm:10px;--yorix-r-md:12px;--yorix-r-lg:16px;--yorix-r-xl:20px;
  --yorix-sh-sm:0 4px 20px ${r?"rgba(0,0,0,.28)":"rgba(13,31,20,.06)"};
  --yorix-sh-md:0 12px 40px ${r?"rgba(0,0,0,.35)":"rgba(13,31,20,.09)"};
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
.nav-search-wrap{flex:1;max-width:440px;min-width:0;position:relative;}
.nav-search{display:flex;background:var(--surface);border:1px solid var(--border);border-radius:var(--yorix-r-md);overflow:hidden;transition:border-color .2s,box-shadow .2s;box-shadow:var(--yorix-sh-sm);}
.nav-search:focus-within{border-color:var(--green-mid);box-shadow:0 0 0 2px rgba(39,168,90,.12),var(--yorix-sh-sm);}
.nav-search select{border:none;border-right:1px solid var(--border);background:var(--surface2);padding:8px 7px;font-family:'DM Sans',sans-serif;font-size:.74rem;color:var(--gray);outline:none;min-width:86px;}
.nav-search input{flex:1;min-width:0;border:none;background:transparent;padding:8px 11px;font-family:'DM Sans',sans-serif;font-size:.8rem;outline:none;color:var(--ink);}
.nav-search input::placeholder{color:${r?"rgba(181,216,188,.42)":"var(--gray)"};opacity:${r?"1":".82"};}
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
.footer{position:relative;background:linear-gradient(180deg,${r?"#050a08":"#07120c"} 0%,${r?"#060d09":"#0a1a10"} 42%);color:rgba(255,255,255,.5);padding:0 24px 22px;margin-top:40px;border-top:1px solid rgba(255,255,255,.06);}
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
.loy-page.yorix-pro-page.sec{background:${r?"linear-gradient(185deg,var(--bg) 0%,#121f16 92%)":"linear-gradient(180deg,var(--bg) 0%,var(--sand) 100%)"};padding-bottom:40px;}
.yorix-loy-hero-bleed{width:100vw;max-width:none;position:relative;left:50%;margin-left:-50vw;box-sizing:border-box;padding-inline:clamp(18px,calc(env(safe-area-inset-left) + 14px),32px);padding-block:0 clamp(8px,1.8vw,12px);}
.yorix-loy-hero-bleed--guest{padding-bottom:clamp(32px,5vw,48px);}
.yorix-loy-hero-bleed--guest::before{content:'';position:absolute;left:4%;right:4%;bottom:-24%;pointer-events:none;height:clamp(200px,45vw,360px);background:radial-gradient(ellipse 85% 50% at 50% 0%,rgba(39,168,90,.13),transparent 72%);opacity:${r?".42":".95"};}
.yorix-loy-hero-inner{max-width:1200px;margin:0 auto;width:100%;}
.yorix-loy-body-stack{background:var(--surface)!important;border:1px solid var(--border);border-radius:clamp(18px,2.2vw,24px)!important;padding:clamp(22px,3.8vw,34px)!important;box-shadow:${r?"0 20px 48px rgba(0,0,0,.42),inset 0 1px 0 rgba(255,255,255,.04)":"0 22px 50px rgba(13,31,20,.09),inset 0 1px 0 rgba(255,255,255,.92)"}!important;}
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
.loy-stat-ico{font-size:1.85rem;line-height:1;margin-bottom:10px;filter:${r?"brightness(1.08)":"none"};}
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
.yorix-loy-v2{display:block;background:${r?"linear-gradient(180deg,#0a1410 0%,#0d1a12 100%)":"linear-gradient(180deg,#fbfaf7 0%,#f3efe7 100%)"};color:var(--ink);padding:0 0 clamp(40px,6vw,72px);overflow-x:hidden;}
.yorix-loy-v2 .yloy-section-inner{max-width:1200px;margin:0 auto;padding:0 clamp(16px,3vw,28px);width:100%;box-sizing:border-box;}
.yorix-loy-v2 .yloy-section{padding:clamp(40px,6vw,72px) 0;position:relative;}
.yorix-loy-v2 .yloy-section--tinted{background:${r?"linear-gradient(180deg,#0d1a12 0%,#101f17 50%,#0d1a12 100%)":"linear-gradient(180deg,#fbfaf7 0%,#eef1ec 50%,#fbfaf7 100%)"};}

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
.yorix-loy-v2 .yloy-earn-card{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:clamp(20px,2.4vw,26px) clamp(18px,2vw,22px);box-shadow:${r?"0 14px 32px rgba(0,0,0,.32)":"0 14px 34px rgba(13,31,20,.06)"};transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease;position:relative;overflow:hidden;}
.yorix-loy-v2 .yloy-earn-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--green),var(--green-light));transform:scaleX(.35);transform-origin:left;transition:transform .35s ease;}
.yorix-loy-v2 .yloy-earn-card:hover{transform:translateY(-5px);box-shadow:${r?"0 22px 48px rgba(0,0,0,.42)":"0 22px 48px rgba(13,31,20,.1)"};border-color:rgba(79,209,125,.4);}
.yorix-loy-v2 .yloy-earn-card:hover::before{transform:scaleX(1);}
.yorix-loy-v2 .yloy-earn-emoji{font-size:2.2rem;line-height:1;margin-bottom:14px;display:inline-flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:16px;background:linear-gradient(135deg,${r?"#1c2e22":"#f0fff5"},${r?"#152118":"#e2f7ec"});border:1px solid var(--border);}
.yorix-loy-v2 .yloy-earn-t{font-family:'Syne',sans-serif;font-weight:800;font-size:1rem;color:var(--ink);margin:0 0 8px;letter-spacing:-.3px;}
.yorix-loy-v2 .yloy-earn-d{font-size:.82rem;line-height:1.6;color:var(--gray);margin:0 0 14px;}
.yorix-loy-v2 .yloy-earn-pts{display:inline-flex;align-items:center;background:var(--green-pale);color:var(--green);border:1px solid rgba(39,168,90,.32);padding:5px 12px;border-radius:999px;font-family:'Syne',sans-serif;font-weight:800;font-size:.7rem;letter-spacing:.04em;}

/* ───────── TIERS ───────── */
.yorix-loy-v2 .yloy-tiers{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(14px,2vw,20px);}
@media (max-width:980px){.yorix-loy-v2 .yloy-tiers{grid-template-columns:repeat(2,minmax(0,1fr));}}
@media (max-width:560px){.yorix-loy-v2 .yloy-tiers{grid-template-columns:1fr;}}
.yorix-loy-v2 .yloy-tier{--tier-color:#CD7F32;background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:clamp(22px,2.6vw,28px) clamp(18px,2vw,22px) clamp(20px,2.4vw,24px);position:relative;transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease;overflow:hidden;}
.yorix-loy-v2 .yloy-tier::before{content:'';position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(90deg,var(--tier-color),color-mix(in srgb,var(--tier-color) 60%,#fff));}
.yorix-loy-v2 .yloy-tier:hover{transform:translateY(-4px);box-shadow:${r?"0 22px 48px rgba(0,0,0,.42)":"0 22px 48px rgba(13,31,20,.1)"};border-color:color-mix(in srgb,var(--tier-color) 45%,var(--border));}
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
.yorix-loy-v2 .yloy-nl{position:relative;background:${r?"linear-gradient(160deg,#152118 0%,#1c2e22 100%)":"linear-gradient(160deg,#ffffff 0%,#fbf9f3 100%)"};border:1px solid var(--border);border-radius:24px;padding:clamp(32px,4vw,48px) clamp(22px,3vw,40px);text-align:center;box-shadow:${r?"0 24px 56px rgba(0,0,0,.36)":"0 24px 56px rgba(13,31,20,.08)"};overflow:hidden;}
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
.yorix-loy-v2 .yloy-faq-item[open]{border-color:var(--green);box-shadow:${r?"0 10px 28px rgba(0,0,0,.32)":"0 10px 28px rgba(26,107,58,.08)"};}
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
.yorix-blog-v2{display:block;background:${r?"linear-gradient(180deg,#0a1410 0%,#0d1a12 100%)":"linear-gradient(180deg,#fbfaf7 0%,#f3efe7 100%)"};color:var(--ink);padding:0 0 clamp(40px,6vw,72px);overflow-x:hidden;}
.yorix-blog-v2 .yblog-section-inner{max-width:1200px;margin:0 auto;padding:0 clamp(16px,3vw,28px);width:100%;box-sizing:border-box;}
.yorix-blog-v2 .yblog-section{padding:clamp(40px,6vw,72px) 0;position:relative;}
.yorix-blog-v2 .yblog-section--cats{padding:clamp(28px,4vw,40px) 0 clamp(12px,2vw,18px);}
.yorix-blog-v2 .yblog-section--tinted{background:${r?"linear-gradient(180deg,#0d1a12 0%,#101f17 50%,#0d1a12 100%)":"linear-gradient(180deg,#fbfaf7 0%,#eef1ec 50%,#fbfaf7 100%)"};}

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
.yorix-blog-v2 .yblog-hero-feat{position:relative;z-index:2;width:min(440px,100%);background:${r?"#152118":"#fff"};border:1px solid ${r?"rgba(255,255,255,.14)":"rgba(0,0,0,.06)"};border-radius:24px;overflow:hidden;cursor:pointer;box-shadow:0 40px 80px rgba(0,0,0,.45);transform:perspective(1400px) rotateY(-5deg) rotateX(2deg);transition:transform .4s cubic-bezier(.2,.8,.2,1),box-shadow .3s ease;}
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
.yorix-blog-v2 .yblog-card{background:var(--surface);border:1px solid var(--border);border-radius:18px;overflow:hidden;cursor:pointer;display:flex;flex-direction:column;transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease;box-shadow:${r?"0 12px 28px rgba(0,0,0,.28)":"0 12px 28px rgba(13,31,20,.05)"};}
.yorix-blog-v2 .yblog-card:hover{transform:translateY(-5px);box-shadow:${r?"0 22px 48px rgba(0,0,0,.42)":"0 22px 48px rgba(26,107,58,.1)"};border-color:rgba(79,209,125,.4);}
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
.yorix-blog-v2 .yblog-pillar:hover{transform:translateY(-4px);box-shadow:${r?"0 22px 48px rgba(0,0,0,.42)":"0 22px 48px rgba(13,31,20,.1)"};border-color:rgba(79,209,125,.4);}
.yorix-blog-v2 .yblog-pillar:hover::before{transform:scaleX(1);}
.yorix-blog-v2 .yblog-pillar-emoji{font-size:2.4rem;line-height:1;margin-bottom:12px;display:inline-flex;align-items:center;justify-content:center;width:64px;height:64px;border-radius:18px;background:linear-gradient(135deg,${r?"#1c2e22":"#f0fff5"},${r?"#152118":"#e2f7ec"});border:1px solid var(--border);}
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

`;function Ea({user:r,userData:o,onClose:t,onSuccess:i}){const[a,c]=l.useState(1),[s,p]=l.useState({nom:(o==null?void 0:o.nom)||"",telephone:(o==null?void 0:o.telephone)||"",adresse_collecte:"",adresse_livraison:"",ville:(o==null?void 0:o.ville)||"Douala",colis_description:"",vehicule:"Moto",budget:"",urgence:"normal"}),[d,m]=l.useState({}),[x,b]=l.useState(!1),[k,y]=l.useState(""),S=()=>{const g={};return s.nom.trim()||(g.nom="Nom obligatoire"),s.telephone.trim()||(g.telephone="Téléphone obligatoire"),s.adresse_collecte.trim()||(g.adresse_collecte="Adresse de collecte obligatoire"),s.adresse_livraison.trim()||(g.adresse_livraison="Adresse de livraison obligatoire"),s.colis_description.trim()||(g.colis_description="Description du colis obligatoire"),m(g),Object.keys(g).length===0},v=async()=>{if(S()){b(!0);try{const g=Math.random().toString(36).substring(2,7).toUpperCase(),h=Date.now().toString(36).slice(-3).toUpperCase(),w="YX-"+g+h,{data:M,error:T}=await N.from("deliveries").insert({code_suivi:w,client_nom:s.nom,client_tel:s.telephone,adresse_collecte:s.adresse_collecte,adresse_livraison:s.adresse_livraison,statut:"commande_recue",livreur_vehicule:s.vehicule,distance_km:3.5,temps_estime_min:s.urgence==="urgent"?20:s.urgence==="express"?15:40,commande_at:new Date().toISOString()}).select().single();if(T)throw T;const q={normal:"🟢 Normal (30-60 min)",urgent:"🟠 Urgent (15-30 min)",express:"🔴 Express (< 15 min)"},E=["🚚 *NOUVELLE DEMANDE DE LIVRAISON YORIX*","","📦 *CODE DE SUIVI : "+w+"*","","👤 *CLIENT*","Nom : "+s.nom,"Téléphone : "+s.telephone,"Ville : "+s.ville,"","📍 *TRAJET*","🔴 Collecte : "+s.adresse_collecte,"🟢 Livraison : "+s.adresse_livraison,"","📦 *COLIS*","Description : "+s.colis_description,"Véhicule : "+s.vehicule,"Urgence : "+(q[s.urgence]||s.urgence),s.budget?"Budget proposé : "+s.budget+" FCFA":"Budget : À définir","","✅ *ACTIONS À FAIRE*","1. Assigner un livreur disponible","2. Confirmer le prix au client","3. Le client suit sa livraison sur yorix.cm/livraison avec le code "+w,"","Merci Yorix ! 🇨🇲"].join(`
`),I="https://wa.me/"+Ge+"?text="+encodeURIComponent(E);window.open(I,"_blank"),y(w),c(2),i==null||i(w)}catch(g){console.error("ModalDemandeLivraison:",g),alert("Erreur : "+g.message)}b(!1)}};return a===2?e.jsx("div",{className:"modal-overlay",onClick:g=>g.target===g.currentTarget&&t(),children:e.jsxs("div",{className:"modal",style:{maxWidth:480,textAlign:"center"},children:[e.jsx("button",{className:"modal-close",onClick:t,children:"✕"}),e.jsx("div",{style:{fontSize:"4rem",marginBottom:12},children:"🎉"}),e.jsx("h2",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.4rem",color:"var(--green)",marginBottom:8,letterSpacing:"-.3px"},children:"Demande envoyée !"}),e.jsxs("p",{style:{fontSize:".88rem",color:"var(--gray)",lineHeight:1.7,marginBottom:20},children:["Notre équipe va assigner un livreur et vous recontacter dans les ",e.jsx("strong",{children:"5 minutes"})," pour confirmer."]}),e.jsxs("div",{style:{background:"linear-gradient(135deg, var(--green-pale), #fef9e0)",border:"2px dashed var(--green)",borderRadius:12,padding:18,marginBottom:18},children:[e.jsx("div",{style:{fontSize:".7rem",color:"var(--gray)",fontWeight:700,marginBottom:5,letterSpacing:".05em"},children:"VOTRE CODE DE SUIVI"}),e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontSize:"1.8rem",fontWeight:800,color:"var(--green)",letterSpacing:".08em",marginBottom:10},children:k}),e.jsx("button",{onClick:()=>{var g;(g=navigator.clipboard)==null||g.writeText(k),alert("✅ Code copié !")},style:{background:"var(--surface)",color:"var(--ink)",border:"1.5px solid var(--border)",borderRadius:8,padding:"6px 14px",fontSize:".75rem",fontWeight:600,cursor:"pointer"},children:"📋 Copier le code"})]}),e.jsx("p",{style:{fontSize:".78rem",color:"var(--gray)",marginBottom:18,lineHeight:1.6},children:"💡 Conservez ce code pour suivre votre livraison en temps réel sur la page Livraison."}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:[e.jsx("button",{onClick:t,style:{background:"var(--surface2)",color:"var(--ink)",border:"1.5px solid var(--border)",borderRadius:9,padding:"11px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".82rem"},children:"Fermer"}),e.jsx("button",{onClick:()=>{t(),window.location.href="/?page=livraison&code="+k},style:{background:"var(--green)",color:"#fff",border:"none",padding:"11px",borderRadius:9,cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem"},children:"📍 Suivre maintenant"})]})]})}):e.jsx("div",{className:"modal-overlay",onClick:g=>g.target===g.currentTarget&&t(),children:e.jsxs("div",{className:"modal",style:{maxWidth:560},children:[e.jsx("button",{className:"modal-close",onClick:t,children:"✕"}),e.jsxs("div",{style:{textAlign:"center",marginBottom:18},children:[e.jsx("div",{style:{fontSize:"2.8rem",marginBottom:6,background:"var(--green-pale)",width:72,height:72,borderRadius:"50%",display:"inline-flex",alignItems:"center",justifyContent:"center"},children:"📦"}),e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontSize:"1.3rem",fontWeight:800,color:"var(--ink)",marginTop:8,letterSpacing:"-.3px"},children:"Demander une livraison"}),e.jsx("p",{style:{fontSize:".82rem",color:"var(--gray)",marginTop:4},children:"Remplissez le formulaire, un livreur sera assigné en quelques minutes"})]}),e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",color:"var(--green)",marginBottom:8,marginTop:4},children:"👤 Vos coordonnées"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14},children:[e.jsxs("div",{className:"form-group",style:{marginBottom:0},children:[e.jsxs("label",{className:"form-label",children:["Nom ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:"form-input"+(d.nom?" error":""),placeholder:"Votre nom",value:s.nom,onChange:g=>p(h=>({...h,nom:g.target.value}))}),d.nom&&e.jsx("span",{className:"form-error-text",children:d.nom})]}),e.jsxs("div",{className:"form-group",style:{marginBottom:0},children:[e.jsxs("label",{className:"form-label",children:["Téléphone ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:"form-input"+(d.telephone?" error":""),placeholder:"+237 6XX XXX XXX",value:s.telephone,onChange:g=>p(h=>({...h,telephone:g.target.value}))}),d.telephone&&e.jsx("span",{className:"form-error-text",children:d.telephone})]})]}),e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",color:"var(--green)",marginBottom:8},children:"📍 Adresses"}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["🔴 Adresse de collecte ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:"form-input"+(d.adresse_collecte?" error":""),placeholder:"Ex: Marché Central, Douala",value:s.adresse_collecte,onChange:g=>p(h=>({...h,adresse_collecte:g.target.value}))}),d.adresse_collecte&&e.jsx("span",{className:"form-error-text",children:d.adresse_collecte})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["🟢 Adresse de livraison ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:"form-input"+(d.adresse_livraison?" error":""),placeholder:"Ex: Akwa Nord, Rue Bonanjo, Douala",value:s.adresse_livraison,onChange:g=>p(h=>({...h,adresse_livraison:g.target.value}))}),d.adresse_livraison&&e.jsx("span",{className:"form-error-text",children:d.adresse_livraison})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Ville"}),e.jsx("select",{className:"form-select",value:s.ville,onChange:g=>p(h=>({...h,ville:g.target.value})),children:ba.filter(g=>g!=="Toutes les villes").map(g=>e.jsx("option",{value:g,children:g},g))})]}),e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",color:"var(--green)",marginBottom:8,marginTop:4},children:"📦 Détails du colis"}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Description du colis ",e.jsx("span",{children:"*"})]}),e.jsx("textarea",{className:"form-textarea"+(d.colis_description?" error":""),style:{minHeight:60},placeholder:"Ex: Enveloppe de documents, Carton de 5kg, Sac à main...",value:s.colis_description,onChange:g=>p(h=>({...h,colis_description:g.target.value}))}),d.colis_description&&e.jsx("span",{className:"form-error-text",children:d.colis_description})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Type de véhicule"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6},children:[{id:"Moto",icon:"🏍️",label:"Moto",sub:"Petits colis"},{id:"Voiture",icon:"🚗",label:"Voiture",sub:"Colis moyens"},{id:"Minibus",icon:"🚐",label:"Minibus",sub:"Gros volume"}].map(g=>e.jsxs("div",{onClick:()=>p(h=>({...h,vehicule:g.id})),style:{border:"2px solid "+(s.vehicule===g.id?"var(--green)":"var(--border)"),background:s.vehicule===g.id?"var(--green-pale)":"var(--surface)",borderRadius:9,padding:"10px 6px",cursor:"pointer",textAlign:"center",transition:"all .2s"},children:[e.jsx("div",{style:{fontSize:"1.4rem",marginBottom:3},children:g.icon}),e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem",color:"var(--ink)"},children:g.label}),e.jsx("div",{style:{fontSize:".62rem",color:"var(--gray)"},children:g.sub})]},g.id))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Niveau d'urgence"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6},children:[{id:"normal",icon:"🟢",label:"Normal",time:"30-60 min"},{id:"urgent",icon:"🟠",label:"Urgent",time:"15-30 min"},{id:"express",icon:"🔴",label:"Express",time:"< 15 min"}].map(g=>e.jsxs("div",{onClick:()=>p(h=>({...h,urgence:g.id})),style:{border:"2px solid "+(s.urgence===g.id?"var(--green)":"var(--border)"),background:s.urgence===g.id?"var(--green-pale)":"var(--surface)",borderRadius:9,padding:"10px 6px",cursor:"pointer",textAlign:"center",transition:"all .2s"},children:[e.jsx("div",{style:{fontSize:"1.1rem",marginBottom:2},children:g.icon}),e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".76rem",color:"var(--ink)"},children:g.label}),e.jsx("div",{style:{fontSize:".62rem",color:"var(--gray)"},children:g.time})]},g.id))})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Budget proposé (FCFA) ",e.jsx("span",{style:{color:"var(--gray)",fontSize:".7rem"},children:"— optionnel"})]}),e.jsx("input",{className:"form-input",type:"number",placeholder:"Ex: 2000 (laisser vide = à définir avec livreur)",value:s.budget,onChange:g=>p(h=>({...h,budget:g.target.value}))}),e.jsx("div",{style:{fontSize:".68rem",color:"var(--gray)",marginTop:4,lineHeight:1.5},children:"💡 Tarifs indicatifs : Intra-ville 500-1500 F · Inter-quartiers 1500-3000 F · Inter-villes 3000-8000 F"})]}),e.jsx("button",{className:"form-submit",onClick:v,disabled:x,style:{marginTop:8},children:x?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"spinner",style:{width:16,height:16,borderWidth:2}}),"Envoi en cours..."]}):"📦 Envoyer ma demande"}),e.jsx("p",{style:{fontSize:".7rem",color:"var(--gray)",textAlign:"center",marginTop:10,lineHeight:1.5},children:"🔒 Vos informations sont sécurisées · Paiement à la livraison"})]})})}function Ta({user:r,userData:o,initialProduct:t=null,onClose:i,isModal:a=!1}){const[c,s]=l.useState([]),[p,d]=l.useState(null),[m,x]=l.useState([]),[b,k]=l.useState(""),[y,S]=l.useState(!0),[v,g]=l.useState(!1),[h,w]=l.useState(!1),[M,T]=l.useState(""),q=l.useRef(null);l.useEffect(()=>{t!=null&&t.vendeur_id&&(r!=null&&r.id)&&t.vendeur_id!==r.id&&I(t.vendeur_id,t.id)},[t==null?void 0:t.id,r==null?void 0:r.id]),l.useEffect(()=>{r!=null&&r.id&&E()},[r==null?void 0:r.id]);const E=async()=>{S(!0);try{const{data:C,error:P}=await N.from("conversations").select("*").or(`user1_id.eq.${r.id},user2_id.eq.${r.id}`).order("last_message_at",{ascending:!1});if(P)throw P;s(C||[])}catch(C){console.warn("Chargement conversations:",C.message)}S(!1)},I=async(C,P=null)=>{if(!(r!=null&&r.id)||!C||r.id===C)return;const[F,Z]=r.id<C?[r.id,C]:[C,r.id];try{let L=N.from("conversations").select("*").eq("user1_id",F).eq("user2_id",Z);P?L=L.eq("product_id",P):L=L.is("product_id",null);const{data:xe}=await L.maybeSingle();if(xe){d(xe.id),await E();return}const{data:ie,error:ae}=await N.from("conversations").insert({user1_id:F,user2_id:Z,product_id:P}).select().single();if(ae)throw ae;d(ie.id),await E()}catch(L){console.error("startConversation:",L),alert("Erreur : "+L.message)}};l.useEffect(()=>{if(!p){x([]);return}se()},[p]);const se=async()=>{try{const{data:C,error:P}=await N.from("messages").select("*").eq("conversation_id",p).order("created_at",{ascending:!0});if(P)throw P;x(C||[])}catch(C){console.warn("Chargement messages:",C.message)}};l.useEffect(()=>{if(!p)return;const C=N.channel(`chat-${p}`).on("postgres_changes",{event:"INSERT",schema:"public",table:"messages",filter:`conversation_id=eq.${p}`},P=>{x(F=>F.some(Z=>Z.id===P.new.id)?F:[...F,P.new])}).subscribe();return()=>{N.removeChannel(C)}},[p]),l.useEffect(()=>{var C;(C=q.current)==null||C.scrollIntoView({behavior:"smooth"})},[m]);const H=async()=>{if(!b.trim()||!p||v)return;const C=ka(b);if(C!=null&&C.bloque){w(!0),T(C.raison||"Partage de contact interdit"),setTimeout(()=>w(!1),5e3),r&&N.from("fraud_logs").insert({type:"tentative_contournement_chat",user_id:r.id,message:b}).then(({error:P})=>{P&&console.warn("fraud_logs:",P.message)});return}g(!0);try{const{data:P,error:F}=await N.from("messages").insert({conversation_id:p,sender_id:r.id,content:b.trim()}).select().single();if(F)throw F;x(Z=>Z.some(L=>L.id===P.id)?Z:[...Z,P]),k("")}catch(P){alert("Erreur envoi : "+P.message)}g(!1)},W=C=>C.user1_id===r.id?C.user2_id:C.user1_id;if(!r)return e.jsx("div",{style:{padding:30,textAlign:"center",color:"var(--gray)"},children:"🔐 Connectez-vous pour accéder à la messagerie."});const me=a?{background:"var(--surface)",borderRadius:13,overflow:"hidden",height:"80vh",maxHeight:600,display:"flex",width:"100%"}:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:13,overflow:"hidden",height:500,display:"flex"};return e.jsxs("div",{style:me,children:[e.jsxs("div",{style:{width:240,borderRight:"1px solid var(--border)",background:"var(--surface2)",display:"flex",flexDirection:"column"},children:[e.jsx("div",{style:{padding:"12px 14px",borderBottom:"1px solid var(--border)",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".85rem",color:"var(--ink)"},children:"💬 Conversations"}),e.jsx("div",{style:{flex:1,overflowY:"auto"},children:y?e.jsx("div",{style:{padding:20,textAlign:"center",color:"var(--gray)",fontSize:".78rem"},children:"Chargement..."}):c.length===0?e.jsxs("div",{style:{padding:20,textAlign:"center",color:"var(--gray)",fontSize:".75rem",lineHeight:1.6},children:["Aucune conversation.",e.jsx("br",{}),e.jsx("br",{}),'Clique sur "Contacter le vendeur" depuis un produit.']}):c.map(C=>e.jsxs("div",{onClick:()=>d(C.id),style:{padding:"10px 12px",cursor:"pointer",borderBottom:"1px solid var(--border)",background:p===C.id?"var(--green-pale)":"transparent"},children:[e.jsxs("div",{style:{fontWeight:600,fontSize:".8rem",color:"var(--ink)"},children:["👤 ",W(C).slice(0,8),"..."]}),e.jsx("div",{style:{fontSize:".65rem",color:"var(--gray)",marginTop:2},children:C.last_message_at?new Date(C.last_message_at).toLocaleString("fr-FR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}):"Nouveau"}),C.product_id&&e.jsx("div",{style:{fontSize:".6rem",color:"var(--green)",marginTop:3,fontWeight:600},children:"🛍️ Sur un produit"})]},C.id))})]}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{padding:"12px 16px",borderBottom:"1px solid var(--border)",background:"var(--green)",color:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,fontSize:".88rem"},children:p?"💬 Conversation":"Sélectionne une conversation"}),e.jsx("div",{style:{fontSize:".68rem",opacity:.85},children:"🔒 Messagerie sécurisée · Partage de contact interdit"})]}),i&&e.jsx("button",{onClick:i,style:{background:"rgba(255,255,255,.15)",color:"#fff",border:"none",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:"1rem"},children:"✕"})]}),e.jsxs("div",{style:{flex:1,overflowY:"auto",padding:14,background:"var(--surface)",display:"flex",flexDirection:"column",gap:8},children:[p?m.length===0?e.jsxs("div",{style:{textAlign:"center",color:"var(--gray)",marginTop:60,fontSize:".85rem"},children:["Aucun message.",e.jsx("br",{}),"Envoie le premier ! 👇"]}):m.map(C=>{const P=C.sender_id===r.id;return e.jsxs("div",{style:{alignSelf:P?"flex-end":"flex-start",maxWidth:"75%",background:P?"var(--green)":"var(--surface2)",color:P?"#fff":"var(--ink)",padding:"8px 12px",borderRadius:P?"12px 12px 3px 12px":"12px 12px 12px 3px",fontSize:".85rem",lineHeight:1.4,wordBreak:"break-word"},children:[e.jsx("div",{children:C.content}),e.jsxs("div",{style:{fontSize:".6rem",opacity:.7,marginTop:3,textAlign:P?"right":"left"},children:[new Date(C.created_at).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),P&&(C.is_read?" ✓✓":" ✓")]})]},C.id)}):e.jsx("div",{style:{textAlign:"center",color:"var(--gray)",marginTop:60,fontSize:".85rem"},children:"👈 Sélectionne une conversation à gauche"}),h&&e.jsxs("div",{style:{background:"#fee2e2",border:"1px solid #fca5a5",borderRadius:9,padding:"10px 14px",color:"#991b1b",fontSize:".78rem",textAlign:"center",margin:"8px 0",lineHeight:1.5},children:["🚫 ",e.jsx("strong",{children:"Message bloqué"}),e.jsx("br",{}),M||"Partage de contacts externes interdit sur Yorix",e.jsx("br",{}),e.jsx("span",{style:{fontSize:".7rem",opacity:.8},children:"Utilise la messagerie Yorix pour tes échanges."})]}),e.jsx("div",{ref:q})]}),p&&e.jsxs("div",{style:{padding:10,borderTop:"1px solid var(--border)",display:"flex",gap:7,background:"var(--surface)"},children:[e.jsx("input",{type:"text",placeholder:"Écris ton message...",value:b,onChange:C=>k(C.target.value),onKeyDown:C=>{C.key==="Enter"&&!v&&H()},disabled:v,style:{flex:1,border:"1.5px solid var(--border)",borderRadius:8,padding:"9px 12px",fontFamily:"'DM Sans',sans-serif",fontSize:".83rem",outline:"none",background:"var(--surface2)",color:"var(--ink)"}}),e.jsx("button",{onClick:H,disabled:v||!b.trim(),style:{background:"var(--green)",color:"#fff",border:"none",width:40,height:40,borderRadius:8,cursor:v||!b.trim()?"not-allowed":"pointer",fontSize:"1rem",opacity:v||!b.trim()?.5:1},children:v?"...":"➤"})]})]})]})}const Aa="modulepreload",Na=function(r){return"/"+r},St={},O=function(o,t,i){let a=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),p=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));a=Promise.allSettled(t.map(d=>{if(d=Na(d),d in St)return;St[d]=!0;const m=d.endsWith(".css"),x=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${x}`))return;const b=document.createElement("link");if(b.rel=m?"stylesheet":Aa,m||(b.as="script"),b.crossOrigin="",b.href=d,p&&b.setAttribute("nonce",p),document.head.appendChild(b),m)return new Promise((k,y)=>{b.addEventListener("load",k),b.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${d}`)))})}))}function c(s){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=s,window.dispatchEvent(p),!p.defaultPrevented)throw s}return a.then(s=>{for(const p of s||[])p.status==="rejected"&&c(p.reason);return o().catch(c)})};function B({minHeight:r=200,label:o="Chargement..."}){return e.jsxs("div",{className:"loading",style:{minHeight:r,justifyContent:"center",padding:"24px 0"},children:[e.jsx("div",{className:"spinner"}),o]})}const Ra=l.lazy(()=>O(()=>import("./HomePage-rZODqGP1.js"),__vite__mapDeps([0,1,2,3,4,5,6])).then(r=>({default:r.HomePage}))),Ma=l.lazy(()=>O(()=>import("./ProductRouteSections-CU8lhB_m.js"),__vite__mapDeps([7,2,1,3,4,5,6])).then(r=>({default:r.ProductRouteSections}))),Pa=l.lazy(()=>O(()=>import("./LivraisonPage-CnOvyfsx.js"),__vite__mapDeps([8,1,6])).then(r=>({default:r.LivraisonPage}))),Ia=l.lazy(()=>O(()=>import("./SiteMarketingPages-u26qm0Tl.js"),__vite__mapDeps([9,1,6])).then(r=>({default:r.SiteMarketingPages})));l.lazy(()=>O(()=>import("./LivraisonLazyBlocks-X0RtXcsF.js"),__vite__mapDeps([10,1,6])).then(r=>({default:r.LivraisonTopInteractive})));l.lazy(()=>O(()=>import("./LivraisonLazyBlocks-X0RtXcsF.js"),__vite__mapDeps([10,1,6])).then(r=>({default:r.LivraisonBottomInteractive})));const La=l.lazy(()=>O(()=>import("./FicheProduit-EdltJTjL.js"),__vite__mapDeps([11,1,3,4,5,6])).then(r=>({default:r.FicheProduit}))),Oa=l.lazy(()=>O(()=>import("./PrestPage-9jDeHjO7.js"),__vite__mapDeps([12,1,6])).then(r=>({default:r.PrestPage}))),Da=l.lazy(()=>O(()=>import("./CheckoutPage-D1HSYVVs.js"),__vite__mapDeps([13,1,5,14,6])).then(r=>({default:r.CheckoutPage}))),qa=l.lazy(()=>O(()=>import("./CartPage-NBW9wyfR.js"),__vite__mapDeps([15,3,1,14,6])).then(r=>({default:r.CartPage}))),Ba=l.lazy(()=>O(()=>import("./AcademyDetail-DMvDtiCd.js"),__vite__mapDeps([16,1,6])).then(r=>({default:r.AcademyDetail}))),Ya=l.lazy(()=>O(()=>import("./AcademyContactForm-Dp0ynVYp.js"),__vite__mapDeps([17,1,6])).then(r=>({default:r.AcademyContactForm}))),$a=l.lazy(()=>O(()=>import("./LoyaltyPage-CNUOZ27k.js"),__vite__mapDeps([18,1,6])).then(r=>({default:r.LoyaltyPage}))),Fa=l.lazy(()=>O(()=>import("./SellerDashboard-CE33eXhB.js"),__vite__mapDeps([19,1,6])).then(r=>({default:r.SellerDashboard}))),Ua=l.lazy(()=>O(()=>import("./BuyerDashboard-B0pdTyC3.js"),__vite__mapDeps([20,1,6])).then(r=>({default:r.BuyerDashboard}))),Wa=l.lazy(()=>O(()=>import("./DeliveryDashboard-BFBMH4DP.js"),__vite__mapDeps([21,1,6])).then(r=>({default:r.DeliveryDashboard}))),Va=l.lazy(()=>O(()=>import("./ProviderDashboard-CHFqHzlY.js"),__vite__mapDeps([22,1,6])).then(r=>({default:r.ProviderDashboard}))),Ha=l.lazy(()=>O(()=>import("./AdminDashboard-DUtPE8Yu.js"),__vite__mapDeps([23,1,6])).then(r=>({default:r.AdminDashboard}))),Xa=l.lazy(()=>O(()=>import("./NotificationsPage-DCsZPeUP.js"),__vite__mapDeps([24,1,6])).then(r=>({default:r.NotificationsPage}))),Ga=l.lazy(()=>O(()=>import("./PromotionsPage-lzglQkuf.js"),__vite__mapDeps([25,1,6])).then(r=>({default:r.PromotionsPage})));function Vt(r){if(!r||r.id==null)return null;const o=r.kind||"product",t=Math.max(1,Number(r.qty||1)),i=Number(r.prix??r.price??0),a=r.fulfillmentMode||(o==="service"?"booking":"delivery");return{...r,kind:o,qty:t,prix:i,fulfillmentMode:a}}function Ir(){return{freeShippingThresholdXaf:(Number.isFinite(NaN),5e4),standardDeliveryFeeXaf:(Number.isFinite(NaN),1500)}}function Ht(r){const o=Ir(),t=r==null?void 0:r.freeShippingThresholdXaf,i=r==null?void 0:r.standardDeliveryFeeXaf;return{freeShippingThresholdXaf:t!=null&&Number.isFinite(Number(t))&&Number(t)>=0?Number(t):o.freeShippingThresholdXaf,standardDeliveryFeeXaf:i!=null&&Number.isFinite(Number(i))&&Number(i)>=0?Number(i):o.standardDeliveryFeeXaf}}function Ja(r){return(r||[]).map(Vt).filter(Boolean).filter(t=>t.kind==="product"&&t.fulfillmentMode!=="pickup").reduce((t,i)=>t+i.prix*i.qty,0)}function Ka(r,o){let t=Ir();typeof o=="number"&&Number.isFinite(o)?t={...t,standardDeliveryFeeXaf:o}:o&&typeof o=="object"&&(t=Ht(o));const i=(r||[]).map(Vt).filter(Boolean),a=i.filter(w=>w.kind==="product"),c=i.filter(w=>w.kind==="service"),s=a.reduce((w,M)=>w+M.prix*M.qty,0),p=c.reduce((w,M)=>w+M.prix*M.qty,0),d=s+p,m=i.reduce((w,M)=>w+M.qty,0),x=Ja(i),b=x>0,k=t.freeShippingThresholdXaf,y=t.standardDeliveryFeeXaf,S=b&&x>=k,v=b&&!S?Math.round(y):0,g=S||!b?0:Math.max(0,Math.round(k-x)),h=!b||k<=0?null:Math.min(1,x/k);return{qty:m,productsCount:a.length,servicesCount:c.length,productsSubtotal:s,servicesSubtotal:p,shippableProductsSubtotal:x,subtotal:d,delivery:v,total:d+v,policyThreshold:k,policyStandardFee:y,hasShippableProducts:b,freeShippingUnlocked:S,amountRemainingForFreeShipping:g,freeShippingProgress01:h,freeShippingNotApplicable:!b}}function Bn(r,o,t,i=4){const a=Math.max(1,Number(i)||4),c=new Set((r||[]).map(y=>y.id)),s=(o||[]).filter(y=>(y==null?void 0:y.id)!=null&&!c.has(y.id)),p=t==null?void 0:t.hasShippableProducts,d=t==null?void 0:t.freeShippingUnlocked,m=(t==null?void 0:t.amountRemainingForFreeShipping)||0;if(!p||d||s.length===0)return s.slice(0,a);const b=s.map(y=>{const S=Number(y.prix||0),v=S>=m;return{p:y,price:S,coversGap:v,delta:v?S-m:m-S}}).filter(y=>y.price>0).sort((y,S)=>y.coversGap!==S.coversGap?y.coversGap?-1:1:y.delta-S.delta).slice(0,a).map(y=>y.p);if(b.length>=a)return b;const k=s.filter(y=>!b.some(S=>S.id===y.id)).slice(0,a-b.length);return[...b,...k]}const Xt="yorix_cart";function Qa(){try{const r=localStorage.getItem(Xt);if(!r)return[];const o=JSON.parse(r);return Array.isArray(o)?o.map(rr).filter(Boolean):[]}catch{return[]}}function Za(r){try{localStorage.setItem(Xt,JSON.stringify(r||[]))}catch{}}function rr(r){if(!r||!r.id)return null;const o=r.kind||"product";return{...r,kind:o,qty:Math.max(1,Number(r.qty||1)),prix:Number(r.prix||0),fulfillmentMode:r.fulfillmentMode||(o==="service"?"booking":"delivery")}}function en(r){if(!(r!=null&&r.id))return null;let o=[];if(Array.isArray(r.image_urls))o=r.image_urls;else if(typeof r.image_urls=="string")try{o=JSON.parse(r.image_urls)}catch{o=[]}const t=r.image&&String(r.image).startsWith("http")?r.image:o[0]&&String(o[0]).startsWith("http")?o[0]:null;return rr({id:r.id,kind:"product",name:r.name_fr||r.name||"Produit",image:t,prix:Number(r.prix||0),qty:1,vendeur_id:r.vendeur_id||null,vendeur_nom:r.vendeur_nom||"",categorie:r.categorie||"",ville:r.ville||"",stock:r.stock??null,fulfillmentMode:"delivery",pricingSnapshot:{base:Number(r.prix||0),currency:"XAF"}})}function rn(r){return r!=null&&r.id?rr({id:r.id,kind:"service",name:r.name||r.provider_nom||r.metier||"Prestation",image:r.photo||null,prix:Number(r.prix_number||r.prix||0),qty:1,provider_id:r.provider_id||null,provider_nom:r.provider_nom||r.name||"",categorie:r.categorie||"Service",ville:r.ville||"",booking:{date:"",time:"",locationType:"home",notes:""},fulfillmentMode:"booking",pricingSnapshot:{base:Number(r.prix_number||r.prix||0),currency:"XAF"}}):null}function zt(r,o){const t=rr(o);if(!t)return r||[];const i=Array.isArray(r)?r:[],a=i.findIndex(c=>c.id===t.id&&c.kind===t.kind);return a===-1?[...i,t]:i.map((c,s)=>s!==a?c:{...c,qty:c.kind==="service"?1:Math.max(1,c.qty+t.qty)})}function tn(r,o,t,i){return(r||[]).map(a=>a.id!==o||t&&a.kind!==t?a:a.kind==="service"?{...a,qty:1}:{...a,qty:Math.max(1,Number(a.qty||1)+i)})}function on(r,o,t){return(r||[]).filter(i=>!(i.id===o&&(!t||i.kind===t)))}function an(r,o=1500){return Ka(r,o)}const A={messages:"messages",orders:"orders",payments:"payments",delivery:"delivery",security:"security",promotions:"promotions",system:"system"},ee={critical:"critical",important:"important",standard:"standard",promo:"promo"},nn=[{test:r=>/payment|paiement|checkout|cinetpay/i.test(r||""),category:A.payments,priority:ee.critical},{test:r=>/security|fraud|litige|connexion|login|suspicious/i.test(r||""),category:A.security,priority:ee.critical},{test:r=>/deliver|livraison|livreur|shipping|colis/i.test(r||""),category:A.delivery,priority:ee.important},{test:r=>/order|commande|booking|réservation|prestation|service_booking/i.test(r||""),category:A.orders,priority:ee.important},{test:r=>/message|chat|support|conversation/i.test(r||""),category:A.messages,priority:ee.important},{test:r=>/promo|offre|soldes|flash/i.test(r||""),category:A.promotions,priority:ee.promo}],sn={[A.messages]:"💬",[A.orders]:"📦",[A.payments]:"💳",[A.delivery]:"🚚",[A.security]:"🛡️",[A.promotions]:"🏷️",[A.system]:"🔔"};function ln(r,o,t){const i=`${r||""} ${o||""} ${t||""}`;for(const a of nn)if(a.test(i))return{category:a.category,priority:a.priority};return{category:A.system,priority:ee.standard}}function dn(r){return r==null?"":String(r).replace(/https?:\/\/[^\s]+/g,o=>{try{const t=new URL(o);return t.hostname.includes("wa.me")||t.hostname.includes("whatsapp")?"Lien WhatsApp":t.hostname.includes("yorix")?"Ouvrir sur Yorix":`[${t.hostname}]`}catch{return"Lien"}})}function Lr(r){var s;const o=r.type||"",t=r.titre||"",i=ln(o,t,r.message),a=r.category||i.category,c=r.priority||i.priority;return{...r,_category:a,_priority:c,_icon:r.icon||sn[a]||"🔔",_title:t||"Notification Yorix",_body:dn(r.message),_image:r.image_url||((s=r.metadata)==null?void 0:s.image_url)||null,_deeplink:typeof r.link=="string"?r.link.trim():"",_timeLabel:r.created_at?new Date(r.created_at).toLocaleString("fr-FR",{dateStyle:"short",timeStyle:"short"}):""}}function cn(r,o){return!o||o==="all"?r:(r||[]).filter(t=>Lr(t)._category===o)}function pn(r,o){if(typeof window>"u"||typeof Notification>"u"||Notification.permission!=="granted"||!(o!=null&&o.pushBrowser))return;const t=r._category||A.system;if(!(o.categories&&o.categories[t]===!1))try{new Notification(r._title,{body:(r._body||"").slice(0,180),icon:"/favicon.svg",tag:String(r.id||r.created_at||"yorix"),silent:!(o!=null&&o.sound)})}catch{}}const Gt="yorix_notification_prefs_v1",Ve=()=>({pushBrowser:!0,sound:!1,email:!1,sms:!1,whatsappDigest:!1,categories:{[A.messages]:!0,[A.orders]:!0,[A.payments]:!0,[A.delivery]:!0,[A.security]:!0,[A.promotions]:!0,[A.system]:!0}});function K(){try{const r=localStorage.getItem(Gt);if(!r)return Ve();const o=JSON.parse(r);return{...Ve(),...o,categories:{...Ve().categories,...o.categories||{}}}}catch{return Ve()}}function Jt(r){try{const o=K(),t={...o,...r,categories:{...o.categories,...r.categories||{}}};return localStorage.setItem(Gt,JSON.stringify(t)),t}catch{return K()}}function gn(r){return r?{pushBrowser:r.push_enabled!==!1&&r.desktop_alerts!==!1,sound:r.sound_enabled===!0,email:r.email_critical===!0,sms:r.sms_critical===!0,whatsappDigest:r.whatsapp_critical!==!1,categories:{[A.messages]:r.category_messages!==!1,[A.orders]:r.category_orders!==!1,[A.payments]:r.category_payments!==!1,[A.delivery]:r.category_delivery!==!1,[A.security]:r.category_security!==!1,[A.promotions]:r.category_promotions!==!1,[A.system]:r.category_system!==!1}}:null}function Kt(r,o){const t=o.categories||{};return{user_id:r,push_enabled:o.pushBrowser!==!1,desktop_alerts:o.pushBrowser!==!1,sound_enabled:o.sound===!0,email_critical:o.email===!0,sms_critical:o.sms===!0,whatsapp_critical:o.whatsappDigest!==!1,category_messages:t[A.messages]!==!1,category_orders:t[A.orders]!==!1,category_payments:t[A.payments]!==!1,category_delivery:t[A.delivery]!==!1,category_security:t[A.security]!==!1,category_promotions:t[A.promotions]!==!1,category_system:t[A.system]!==!1,updated_at:new Date().toISOString()}}async function Qt(r,o){if(!(r!=null&&r.from)||!o)return K();try{const{data:t,error:i}=await r.from("notification_preferences").select("*").eq("user_id",o).maybeSingle();if(i)return console.warn("[notification_prefs] load:",i.message),K();if(t){const p=gn(t);return p&&Jt(p),p||K()}const a=K(),c=Kt(o,a),{error:s}=await r.from("notification_preferences").upsert(c,{onConflict:"user_id"});return s&&console.warn("[notification_prefs] seed:",s.message),a}catch(t){return console.warn("[notification_prefs]",(t==null?void 0:t.message)||t),K()}}async function fn(r,o,t){const i=Jt(t);if(!(r!=null&&r.from)||!o)return i;try{const a=Kt(o,i),{error:c}=await r.from("notification_preferences").upsert(a,{onConflict:"user_id"});c&&console.warn("[notification_prefs] save:",c.message)}catch(a){console.warn("[notification_prefs] save",(a==null?void 0:a.message)||a)}return i}function mn({user:r,compact:o=!1}){const[t,i]=l.useState("loading"),[a,c]=l.useState(null);l.useEffect(()=>{s()},[r==null?void 0:r.id]);async function s(){if(!("serviceWorker"in navigator)||!("PushManager"in window)){i("unsupported");return}if(Notification.permission==="denied"){i("denied");return}try{const k=await(await navigator.serviceWorker.ready).pushManager.getSubscription();i(k?"subscribed":"unsubscribed")}catch(b){console.error("[PushManager] Erreur check :",b),i("unsubscribed")}}async function p(){if(!(r!=null&&r.id)){c("Vous devez être connecté");return}{c("Configuration manquante (VAPID)"),console.error("[PushManager] VITE_VAPID_PUBLIC_KEY non définie");return}}async function d(){i("pending"),c(null);try{const k=await(await navigator.serviceWorker.ready).pushManager.getSubscription();if(k){const y=k.endpoint,{error:S}=await N.from("push_subscriptions").delete().eq("endpoint",y);S&&console.warn("[PushManager] Erreur delete Supabase :",S),await k.unsubscribe()}i("unsubscribed"),console.log("[PushManager] ✅ Désabonné des push")}catch(b){console.error("[PushManager] Erreur désabonnement :",b),c(b.message||"Erreur lors du désabonnement"),i("subscribed")}}if(!(r!=null&&r.id))return null;const m={padding:o?"10px 12px":"14px 16px",background:"var(--surface2, #f6f6f6)",borderRadius:12,border:"1px solid var(--border, #e5e5e5)",marginBottom:12,fontSize:o?13:14},x={padding:"8px 14px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:600,fontSize:13,marginTop:8,width:"100%"};return t==="loading"?e.jsx("div",{style:m,children:e.jsx("div",{style:{color:"var(--gray, #666)"},children:"⏳ Vérification..."})}):t==="unsupported"?e.jsxs("div",{style:m,children:[e.jsx("div",{style:{color:"var(--gray, #666)"},children:"ℹ️ Votre navigateur ne supporte pas les notifications push."}),e.jsx("div",{style:{fontSize:11,color:"var(--gray, #999)",marginTop:4},children:"Utilisez Chrome, Firefox ou Edge pour activer cette fonctionnalité."})]}):t==="denied"?e.jsxs("div",{style:m,children:[e.jsx("div",{style:{color:"#c62828"},children:"🔕 Notifications bloquées"}),e.jsx("div",{style:{fontSize:11,color:"var(--gray, #666)",marginTop:4},children:"Vous avez refusé les notifications. Pour les réactiver, allez dans les paramètres de votre navigateur (🔒 icône à gauche de l'URL)."})]}):t==="subscribed"?e.jsxs("div",{style:m,children:[e.jsx("div",{style:{color:"var(--green, #2e7d32)",fontWeight:600},children:"🔔 Notifications activées"}),e.jsx("div",{style:{fontSize:11,color:"var(--gray, #666)",marginTop:4},children:"Vous recevrez des alertes pour les nouveaux messages et produits."}),e.jsx("button",{style:{...x,background:"var(--surface, #fff)",border:"1px solid var(--border, #ddd)",color:"var(--ink, #222)"},onClick:d,children:"🔕 Désactiver les notifications"}),a&&e.jsxs("div",{style:{color:"#c62828",fontSize:12,marginTop:6},children:["⚠️ ",a]})]}):t==="pending"?e.jsx("div",{style:m,children:e.jsx("div",{style:{color:"var(--gray, #666)"},children:"⏳ En cours..."})}):e.jsxs("div",{style:m,children:[e.jsx("div",{style:{fontWeight:600,marginBottom:4},children:"🔔 Activer les notifications"}),e.jsx("div",{style:{fontSize:12,color:"var(--gray, #666)",marginBottom:8},children:"Soyez alerté dès qu'un client vous envoie un message ou qu'un nouveau produit est ajouté."}),e.jsx("button",{style:{...x,background:"var(--green, #2e7d32)",color:"#fff"},onClick:p,children:"✅ Activer maintenant"}),a&&e.jsxs("div",{style:{color:"#c62828",fontSize:12,marginTop:6},children:["⚠️ ",a]})]})}const xn=[{key:"all",label:"Tous"},{key:A.messages,label:"Messages"},{key:A.orders,label:"Commandes"},{key:A.payments,label:"Paiements"},{key:A.delivery,label:"Livraison"},{key:A.security,label:"Sécurité"},{key:A.promotions,label:"Promos"},{key:A.system,label:"Système"}];function un(r){return r===ee.critical?"notif-card-priority-critical":r===ee.important?"notif-card-priority-important":r===ee.promo?"notif-card-priority-promo":"notif-card-priority-standard"}function bn({variant:r="dropdown",notifs:o=[],user:t,goPage:i,onMarkRead:a,onMarkAllRead:c,onDismiss:s,onClose:p,onPrefsUpdated:d}){const[m,x]=l.useState("all"),[b,k]=l.useState(()=>K());l.useEffect(()=>{if(!(t!=null&&t.id)){k(K());return}let g=!1;return Qt(N,t.id).then(h=>{g||k(h)}),()=>{g=!0}},[t==null?void 0:t.id]);const y=l.useMemo(()=>cn(o,m==="all"?null:m),[o,m]),S=g=>{fn(N,t==null?void 0:t.id,g).then(h=>{k(h),d==null||d(h)})},v=l.useMemo(()=>o.filter(g=>!g.lu).length,[o]);return e.jsxs("div",{className:`notif-hub notif-hub--${r}`,children:[e.jsxs("div",{className:"notif-hub-toolbar",children:[e.jsxs("div",{className:"notif-hub-title-row",children:[e.jsx("h2",{className:"notif-hub-title",children:"Notifications"}),v>0&&e.jsx("span",{className:"notif-hub-badge",children:v>99?"99+":v})]}),e.jsxs("div",{className:"notif-hub-actions-top",children:[v>0&&e.jsx("button",{type:"button",className:"notif-link-btn",onClick:()=>c==null?void 0:c(),children:"Tout marquer lu"}),r==="dropdown"&&e.jsx("button",{type:"button",className:"notif-link-btn notif-link-btn-strong",onClick:()=>i==null?void 0:i("notifications"),children:"Voir tout"}),r==="dropdown"&&e.jsx("button",{type:"button",className:"notif-hub-close",onClick:()=>p==null?void 0:p(),"aria-label":"Fermer",children:"✕"})]})]}),e.jsx("div",{className:"notif-filter-strip",role:"tablist",children:xn.map(g=>e.jsx("button",{type:"button",role:"tab","aria-selected":m===g.key,className:`notif-chip${m===g.key?" notif-chip--active":""}`,onClick:()=>x(g.key),children:g.label},g.key))}),e.jsx("div",{className:r==="dropdown"?"notif-hub-scroll notif-hub-scroll--drop":"notif-hub-scroll notif-hub-scroll--page",children:y.length===0?e.jsxs("div",{className:"notif-empty premium",children:[e.jsx("div",{className:"notif-empty-icon",children:"🔕"}),e.jsx("div",{className:"notif-empty-title",children:"Aucune alerte dans ce filtre"}),e.jsx("p",{className:"notif-empty-sub",children:"Les commandes, messages et livraisons apparaîtront ici en temps réel."})]}):e.jsx("ul",{className:"notif-card-list",children:y.map(g=>{var w,M;const h=Lr(g);return e.jsxs("li",{className:`notif-card-li ${un(h._priority)}`,children:[e.jsxs("button",{type:"button",className:`notif-card-main${g.lu?"":" notif-card-unread"}`,onClick:()=>a==null?void 0:a(g,{navigate:!0,closeDrawer:r==="dropdown"}),children:[e.jsxs("span",{className:"notif-card-avatar","aria-hidden":!0,children:[h._image?e.jsx("img",{src:h._image,alt:"",loading:"lazy"}):e.jsx("span",{className:"notif-card-emoji",children:h._icon}),!g.lu&&e.jsx("span",{className:"notif-card-dot"})]}),e.jsxs("span",{className:"notif-card-copy",children:[e.jsxs("span",{className:"notif-card-top",children:[e.jsx("span",{className:"notif-card-title",children:h._title}),e.jsx("time",{className:"notif-card-time",dateTime:g.created_at||void 0,children:h._timeLabel})]}),e.jsx("span",{className:"notif-card-body",children:h._body}),((w=h._deeplink)==null?void 0:w.startsWith("http"))&&e.jsx("span",{className:"notif-card-cta-secondary",children:"Ouverture du lien sécurisé →"}),((M=h._deeplink)==null?void 0:M.startsWith("/"))&&e.jsx("span",{className:"notif-card-cta-secondary",children:"Appuyer pour ouvrir dans Yorix"})]})]}),e.jsxs("div",{className:"notif-card-side",children:[e.jsx("button",{type:"button",className:"notif-mini-btn",title:"Lu",onClick:T=>{T.stopPropagation(),a==null||a(g,{navigate:!1,closeDrawer:!1})},children:"✓"}),e.jsx("button",{type:"button",className:"notif-mini-btn notif-mini-btn-del",title:"Masquer",onClick:T=>{T.stopPropagation(),s==null||s(g.id)},children:"🗑"})]})]},String(h.id))})})}),e.jsxs("div",{className:"notif-hub-footer-premium",children:[e.jsxs("div",{className:"notif-preferences-mini",children:[e.jsx("div",{className:"notif-preferences-title",children:"Préférences (compte synchronisé)"}),e.jsxs("label",{className:"notif-toggle",children:[e.jsx("input",{type:"checkbox",checked:b.pushBrowser,onChange:g=>S({pushBrowser:g.target.checked})}),"Alertes bureau (navigateur ouvert)"]}),e.jsxs("label",{className:"notif-toggle",children:[e.jsx("input",{type:"checkbox",checked:b.sound,onChange:g=>S({sound:g.target.checked})}),"Son discret (si navigateur autorise)"]})]}),e.jsx(mn,{user:t,compact:!0})]})]})}function hn({goPage:r,freeShippingThresholdXaf:o=25e3}){var t;return e.jsxs("footer",{className:"footer footer--premium",children:[e.jsx("div",{className:"footer-premium-accent","aria-hidden":!0}),e.jsxs("div",{className:"footer-trust-strip",children:[e.jsx("span",{className:"fts-item",children:"🔐 Escrow vérifiable"}),e.jsx("span",{className:"fts-item",children:"📱 MoMo · Orange Money"}),e.jsxs("span",{className:"fts-item",children:["Livraison offerte dès ",((t=o==null?void 0:o.toLocaleString)==null?void 0:t.call(o,"fr-FR"))??"—"," FCFA"]}),e.jsx("span",{className:"fts-item",children:"🇨🇲 Support WhatsApp CM"})]}),e.jsxs("div",{className:"footer-grid",children:[e.jsxs("div",{className:"footer-brand-col",children:[e.jsxs("div",{className:"footer-logo",children:["Yo",e.jsx("span",{children:"rix"})," CM"]}),e.jsx("p",{className:"footer-desc",children:"Marketplace camerounaise — catalogue produits, prestataires terrain, livraison Yorix Ride, paiements traçables et programme de fidélité."}),e.jsxs("div",{className:"footer-contact",children:[e.jsx("span",{children:"📞 +237 696 56 56 54"}),e.jsx("span",{children:"✉️ support@yorix.cm"}),e.jsx("span",{children:"🇨🇲 Douala · Yaoundé · Bafoussam · tout le pays"})]}),e.jsxs("div",{className:"footer-cta-cluster",children:[e.jsx("button",{type:"button",className:"footer-cta-chip",onClick:()=>r("produits"),children:"Parcourir les produits"}),e.jsx("button",{type:"button",className:"footer-cta-chip footer-cta-chip--ghost",onClick:()=>r("aide"),children:"Centre d'aide"})]})]}),e.jsxs("nav",{className:"footer-col","aria-label":"Marketplace",children:[e.jsx("h4",{children:"Marketplace"}),e.jsx("ul",{children:[{l:"Tous les produits",p:"produits"},{l:"Panier · checkout",p:"cart"},{l:"Livraison",p:"livraison"},{l:"Bons plans",p:"bonsPlans"},{l:"Acheter à Douala",nav:()=>r("seoCity",{citySlug:"douala",mode:"acheter"})},{l:"Vendre sur Yorix",p:"devenirVendeur"}].map(i=>e.jsx("li",{children:e.jsx("button",{type:"button",onClick:()=>i.nav?i.nav():r(i.p),children:i.l})},i.l))})]}),e.jsxs("nav",{className:"footer-col","aria-label":"Services et confiance",children:[e.jsx("h4",{children:"Services & confiance"}),e.jsx("ul",{children:[{l:"Escrow 🔐",p:"escrow"},{l:"Prestataires",p:"prestataires"},{l:"Business 💼",p:"business"},{l:"Academy 🎓",p:"academy"},{l:"Blog & guides",p:"blog"},{l:"Fidélité ⭐",p:"loyalty"},{l:"Livraison à Yaoundé",nav:()=>r("livraison",{citySlug:"yaounde"})}].map(i=>e.jsx("li",{children:e.jsx("button",{type:"button",onClick:()=>i.nav?i.nav():r(i.p),children:i.l})},i.l))})]}),e.jsxs("nav",{className:"footer-col","aria-label":"Rejoindre et légal",children:[e.jsx("h4",{children:"Rejoindre Yorix"}),e.jsx("ul",{children:[{l:"Devenir livreur",p:"devenirLivreur"},{l:"Devenir prestataire",p:"inscription"},{l:"Contact",p:"contact"},{l:"FAQ",p:"faq"},{l:"SOS · Aide",p:"aide"},{l:"Mentions légales",p:"mentions"},{l:"CGV",p:"cgv"},{l:"Confidentialité",p:"confidentialite"}].map(i=>e.jsx("li",{children:e.jsx("button",{type:"button",onClick:()=>r(i.p),children:i.l})},i.l))})]})]}),e.jsxs("div",{className:"footer-bottom",children:[e.jsx("span",{className:"footer-copy",children:"© 2026 Yorix Cameroun — RC: DOUALA/2026/B237"}),e.jsxs("div",{className:"fb-badges",role:"list",children:[e.jsx("span",{className:"fbb",role:"listitem",children:"📱 MTN MoMo"}),e.jsx("span",{className:"fbb",role:"listitem",children:"🔶 Orange Money"}),e.jsx("span",{className:"fbb",role:"listitem",children:"🔐 Escrow"}),e.jsx("span",{className:"fbb",role:"listitem",children:"🇨🇲 Made in CM"})]})]})]})}function yn({open:r,onClose:o,onSelectAction:t,user:i}){const[a,c]=l.useState(!1);if(l.useEffect(()=>{const d=()=>c(window.innerWidth<600);return d(),window.addEventListener("resize",d),()=>window.removeEventListener("resize",d)},[]),l.useEffect(()=>(r?document.body.style.overflow="hidden":document.body.style.overflow="",()=>{document.body.style.overflow=""}),[r]),!r)return null;const s=[{id:"buy",icon:"🛍️",title:"Acheter",desc:"Des milliers de produits livrés à Yaoundé, Douala et partout.",color:"linear-gradient(135deg, #10b981, #059669)",bgIcon:"rgba(16, 185, 129, .12)",cta:"Explorer maintenant",badge:"⭐ Populaire",badgeColor:"#fcd116",miniBadge:"🔒 Escrow inclus"},{id:"sell",icon:"🏪",title:"Vendre",desc:"Créez votre boutique en 2 minutes. Vendez dès aujourd'hui.",color:"linear-gradient(135deg, #f59e0b, #d97706)",bgIcon:"rgba(245, 158, 11, .12)",cta:"Ouvrir ma boutique",badge:null,miniBadge:"💰 Commission 5%"},{id:"service",icon:"👷",title:"Trouver un pro",desc:"Plombiers, électriciens, photographes — tous vérifiés.",color:"linear-gradient(135deg, #8b5cf6, #7c3aed)",bgIcon:"rgba(139, 92, 246, .12)",cta:"Trouver un pro",badge:null,miniBadge:"✓ 850+ vérifiés"},{id:"delivery",icon:"🚚",title:"Faire livrer",desc:"Un livreur récupère votre colis en moins de 30 min.",color:"linear-gradient(135deg, #3b82f6, #2563eb)",bgIcon:"rgba(59, 130, 246, .12)",cta:"Appeler un livreur",badge:null,miniBadge:"⚡ ~25 min"}],p=[{icon:"🛡️",label:"Paiement sécurisé"},{icon:"✅",label:"Vendeurs vérifiés"},{icon:"🇨🇲",label:"100% Cameroun"},{icon:"⚡",label:"Inscription 2 min"}];return e.jsx("div",{onClick:d=>d.target===d.currentTarget&&o(),style:{position:"fixed",inset:0,background:"rgba(10, 20, 16, 0.88)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",zIndex:99999,display:"flex",alignItems:"center",justifyContent:"center",padding:a?"12px":"20px",overflowY:"auto",animation:"yfadeIn .25s ease"},children:e.jsxs("div",{style:{background:"var(--surface, #fff)",borderRadius:a?18:22,maxWidth:880,width:"100%",padding:a?"26px 18px 22px":"36px 32px 28px",position:"relative",boxShadow:"0 28px 70px rgba(0,0,0,.45)",animation:"yslideUp .35s cubic-bezier(.2,.8,.2,1)",maxHeight:"94vh",overflowY:"auto"},children:[e.jsx("button",{onClick:o,style:{position:"absolute",top:14,right:14,background:"var(--surface2, #f5f5f5)",border:"none",width:38,height:38,borderRadius:"50%",cursor:"pointer",fontSize:"1.05rem",color:"var(--ink, #111)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2,fontWeight:600},"aria-label":"Fermer",children:"✕"}),e.jsxs("div",{style:{textAlign:"center",marginBottom:a?18:22},children:[e.jsx("div",{style:{display:"inline-flex",alignItems:"center",gap:6,background:"var(--green-pale, #e8f5e9)",color:"var(--green, #1a6b3a)",padding:"5px 14px",borderRadius:50,fontSize:".7rem",fontWeight:700,marginBottom:12,letterSpacing:".02em"},children:"🇨🇲 Bienvenue sur Yorix CM"}),e.jsx("h1",{style:{fontFamily:"'Syne',sans-serif",fontSize:a?"1.45rem":"1.85rem",fontWeight:800,color:"var(--ink, #111)",marginBottom:8,letterSpacing:"-.5px",lineHeight:1.18},children:"Que voulez-vous faire aujourd'hui ?"}),e.jsx("p",{style:{color:"var(--gray, #666)",fontSize:a?".84rem":".92rem",maxWidth:520,margin:"0 auto",lineHeight:1.55},children:"Acheter, vendre, faire livrer ou trouver un pro — Yorix s'occupe du reste."})]}),e.jsx("div",{style:{display:"flex",gap:a?6:8,justifyContent:"center",flexWrap:a?"nowrap":"wrap",overflowX:a?"auto":"visible",marginBottom:a?18:24,paddingBottom:a?4:0,scrollbarWidth:"none",msOverflowStyle:"none"},className:"yorix-trust-badges",children:p.map((d,m)=>e.jsxs("div",{style:{background:"var(--surface2, #f8f8f8)",border:"1px solid var(--border, #e5e5e5)",color:"var(--ink, #111)",padding:a?"6px 11px":"7px 14px",borderRadius:50,fontSize:a?".68rem":".74rem",fontWeight:600,whiteSpace:"nowrap",display:"inline-flex",alignItems:"center",gap:5,fontFamily:"'DM Sans',sans-serif",animation:`yfadeIn .4s ease ${.1+m*.05}s both`,flexShrink:0},children:[e.jsx("span",{style:{fontSize:".95em"},children:d.icon}),e.jsx("span",{children:d.label})]},d.label))}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:a?"1fr":"repeat(2, 1fr)",gap:a?12:16,marginBottom:18},children:s.map((d,m)=>e.jsxs("button",{onClick:()=>t(d.id),style:{background:"var(--surface, #fff)",border:"1.5px solid var(--border, #e5e5e5)",borderRadius:16,padding:a?"20px 18px":"24px 22px",cursor:"pointer",textAlign:"left",transition:"all .25s cubic-bezier(.2,.8,.2,1)",position:"relative",overflow:"hidden",fontFamily:"inherit",minHeight:a?0:220,display:"flex",flexDirection:"column",animation:`yslideUp .4s cubic-bezier(.2,.8,.2,1) ${.15+m*.08}s both`},onMouseOver:x=>{a||(x.currentTarget.style.transform="translateY(-4px)",x.currentTarget.style.boxShadow="0 14px 32px rgba(0,0,0,.12)",x.currentTarget.style.borderColor="transparent")},onMouseOut:x=>{a||(x.currentTarget.style.transform="none",x.currentTarget.style.boxShadow="none",x.currentTarget.style.borderColor="var(--border, #e5e5e5)")},onTouchStart:x=>{x.currentTarget.style.transform="scale(0.98)"},onTouchEnd:x=>{x.currentTarget.style.transform="none"},children:[e.jsx("div",{style:{position:"absolute",top:-14,right:-14,width:80,height:80,background:d.bgIcon,borderRadius:"50%",zIndex:0}}),d.badge&&e.jsx("div",{style:{position:"absolute",top:12,right:12,background:d.badgeColor,color:"#0d1f14",padding:"3px 9px",borderRadius:50,fontSize:".62rem",fontWeight:800,fontFamily:"'Syne',sans-serif",letterSpacing:".03em",zIndex:2,boxShadow:"0 2px 6px rgba(0,0,0,.15)"},children:d.badge}),e.jsxs("div",{style:{position:"relative",zIndex:1,flex:1,display:"flex",flexDirection:"column"},children:[e.jsx("div",{style:{width:a?48:54,height:a?48:54,borderRadius:13,background:d.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:a?"1.55rem":"1.75rem",marginBottom:12,boxShadow:"0 6px 16px rgba(0,0,0,.14), inset 0 -2px 0 rgba(0,0,0,.08)"},children:d.icon}),e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:a?"1.05rem":"1.15rem",color:"var(--ink, #111)",marginBottom:6,letterSpacing:"-.3px"},children:d.title}),e.jsx("div",{style:{fontSize:a?".8rem":".83rem",color:"var(--gray, #666)",lineHeight:1.55,marginBottom:10,flex:1},children:d.desc}),e.jsx("div",{style:{display:"inline-flex",alignItems:"center",background:"var(--surface2, #f5f5f5)",color:"var(--ink, #111)",padding:"3px 9px",borderRadius:50,fontSize:".66rem",fontWeight:600,marginBottom:12,alignSelf:"flex-start",fontFamily:"'DM Sans',sans-serif"},children:d.miniBadge}),e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:5,fontSize:a?".78rem":".82rem",fontWeight:800,color:"var(--green, #1a6b3a)",fontFamily:"'Syne',sans-serif",letterSpacing:"-.1px"},children:[d.cta," ",e.jsx("span",{style:{fontSize:"1.05em"},children:"→"})]})]})]},d.id))}),e.jsxs("div",{style:{textAlign:"center",paddingTop:14,borderTop:"1px solid var(--border, #e5e5e5)",marginTop:4},children:[i?e.jsx("p",{style:{fontSize:a?".74rem":".78rem",color:"var(--green, #1a6b3a)",marginBottom:8,fontWeight:600},children:"✅ Connecté. Choisissez une action pour continuer."}):e.jsx("p",{style:{fontSize:a?".74rem":".78rem",color:"var(--gray, #666)",marginBottom:8},children:"💡 Pas encore inscrit ? Vous pourrez créer votre compte après avoir choisi."}),e.jsx("button",{onClick:o,style:{background:"transparent",border:"none",color:"var(--gray, #666)",fontSize:".78rem",cursor:"pointer",textDecoration:"underline",fontFamily:"inherit",padding:"4px 8px"},children:"Explorer librement le site"})]}),e.jsx("style",{children:`
          @keyframes yfadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes yslideUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .yorix-trust-badges::-webkit-scrollbar { display: none; }
        `})]})})}const vr="v1.0",Ct={seller:{icon:"🏪",label:"Vendeur",color:"#f59e0b",engagement:"Je m'engage à fournir des produits conformes, authentiques et à respecter les transactions Yorix."},provider:{icon:"👷",label:"Prestataire",color:"#8b5cf6",engagement:"Je m'engage à fournir des services conformes, professionnels et à respecter mes clients."},delivery:{icon:"🚚",label:"Livreur",color:"#3b82f6",engagement:"Je m'engage à respecter les tarifs Yorix Ride, livrer les colis avec soin et dans les délais."}};function vn({open:r,onClose:o,onAccepted:t,user:i,userData:a,role:c="seller",authForm:s={}}){const[p,d]=l.useState(!1),[m,x]=l.useState(!1),[b,k]=l.useState(!1),[y,S]=l.useState(!1),[v,g]=l.useState(""),h=l.useRef(null);if(l.useEffect(()=>{r&&(d(!1),x(!1),k(!1),g(""))},[r]),!r)return null;const w=Ct[c]||Ct.seller,M=E=>{const I=E.target;I.scrollHeight-I.scrollTop-I.clientHeight<50&&!p&&d(!0)},T=()=>{if(!p){g("Veuillez d'abord lire l'intégralité du contrat (scrollez jusqu'en bas).");return}if(!m){g("Vous devez cocher la case d'acceptation pour continuer.");return}g(""),k(!0)},q=async()=>{S(!0),g("");try{let E="unknown";try{E=(await(await fetch("https://api.ipify.org?format=json")).json()).ip||"unknown"}catch(me){console.warn("Impossible de récupérer l'IP:",me)}const I=navigator.userAgent||"unknown",se=(s==null?void 0:s.nom)||(a==null?void 0:a.nom)||"Inconnu",H=(s==null?void 0:s.tel)||(a==null?void 0:a.telephone)||"Inconnu",{error:W}=await N.from("user_contract_acceptance").insert({user_id:(i==null?void 0:i.id)||null,full_name:se,phone:H,role:c,contract_version:vr,accepted_at:new Date().toISOString(),ip_address:E,user_agent:I,acceptance_checkbox:!0,otp_verified:!1,signature_type:"checkbox_v1"});W&&console.warn("Acceptance DB error:",W),S(!1),k(!1),t({version:vr,acceptedAt:new Date().toISOString(),ip:E,userAgent:I})}catch(E){console.error("Erreur acceptance:",E),g("Erreur : "+(E.message||"Impossible d'enregistrer l'acceptation.")),S(!1)}};return e.jsxs(e.Fragment,{children:[e.jsx("div",{onClick:E=>E.target===E.currentTarget&&!y&&o(),style:{position:"fixed",inset:0,background:"rgba(10, 20, 16, 0.88)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",zIndex:99998,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",animation:"yfadeIn .25s ease"},children:e.jsxs("div",{style:{background:"var(--surface, #fff)",borderRadius:18,maxWidth:720,width:"100%",maxHeight:"92vh",display:"flex",flexDirection:"column",boxShadow:"0 28px 70px rgba(0,0,0,.45)",animation:"yslideUp .3s cubic-bezier(.2,.8,.2,1)",overflow:"hidden"},children:[e.jsxs("div",{style:{background:"linear-gradient(135deg, #0a1410 0%, #1a3a24 100%)",padding:"20px 24px",color:"#fff",position:"relative"},children:[e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:6,background:w.color,color:"#fff",padding:"4px 12px",borderRadius:50,fontSize:".7rem",fontWeight:700,marginBottom:8},children:[w.icon," Inscription ",w.label]}),e.jsx("h2",{style:{fontFamily:"'Syne',sans-serif",fontSize:"1.3rem",fontWeight:800,marginBottom:4,letterSpacing:"-.4px",lineHeight:1.2},children:"Contrat d'utilisation et d'engagement Yorix"}),e.jsx("p",{style:{color:"rgba(255,255,255,.7)",fontSize:".82rem",lineHeight:1.5,marginBottom:0},children:"Veuillez lire attentivement ces conditions. L'inscription implique votre engagement contractuel."}),e.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,height:3,background:"rgba(255,255,255,.15)"},children:e.jsx("div",{style:{height:"100%",background:"linear-gradient(90deg, var(--yellow, #fcd116), #4fd17d)",width:p?"100%":"20%",transition:"width .4s"}})})]}),e.jsxs("div",{ref:h,onScroll:M,style:{padding:"20px 24px",overflowY:"auto",flex:1,fontSize:".84rem",lineHeight:1.65,color:"var(--ink, #111)",fontFamily:"'DM Sans',sans-serif"},children:[e.jsx(wn,{role:c,roleInfo:w}),!p&&e.jsx("div",{style:{position:"sticky",bottom:0,textAlign:"center",padding:"10px",background:"linear-gradient(to top, var(--surface, #fff) 60%, rgba(255,255,255,0))",pointerEvents:"none",fontSize:".74rem",color:"var(--gray, #666)",fontWeight:600},children:"⬇ Continuez à scroller pour activer l'acceptation"}),p&&e.jsx("div",{style:{textAlign:"center",padding:"12px",marginTop:16,background:"var(--green-pale, #e8f5e9)",border:"1px solid var(--green-light, #86efac)",borderRadius:9,fontSize:".78rem",color:"var(--green, #1a6b3a)",fontWeight:700},children:"✓ Vous avez lu l'intégralité du contrat"})]}),e.jsxs("div",{style:{borderTop:"1px solid var(--border, #e5e5e5)",padding:"16px 24px",background:"var(--surface2, #f8f8f8)"},children:[e.jsxs("div",{style:{background:`${w.color}15`,border:`1.5px solid ${w.color}40`,borderRadius:9,padding:"10px 12px",marginBottom:12,fontSize:".78rem",color:"var(--ink, #111)",fontWeight:600,display:"flex",alignItems:"flex-start",gap:8},children:[e.jsx("span",{style:{fontSize:"1.1rem",flexShrink:0},children:w.icon}),e.jsx("span",{children:w.engagement})]}),e.jsxs("label",{style:{display:"flex",alignItems:"flex-start",gap:10,cursor:p?"pointer":"not-allowed",opacity:p?1:.5,marginBottom:12,userSelect:"none"},children:[e.jsx("input",{type:"checkbox",checked:m,onChange:E=>{p&&x(E.target.checked)},disabled:!p,style:{marginTop:2,width:18,height:18,cursor:p?"pointer":"not-allowed",accentColor:"var(--green, #1a6b3a)",flexShrink:0}}),e.jsx("span",{style:{fontSize:".82rem",lineHeight:1.5,color:"var(--ink, #111)",fontWeight:600},children:"J'ai lu, compris et j'accepte les conditions d'utilisation, commissions, règles et engagements de Yorix."})]}),e.jsx("p",{style:{fontSize:".7rem",color:"var(--gray, #666)",marginBottom:12,lineHeight:1.5},children:"🛡️ Cette étape protège Yorix, vos clients et votre activité. Yorix protège ses utilisateurs grâce à des engagements de transparence, qualité et sécurité."}),v&&e.jsxs("div",{style:{background:"#fff0f0",border:"1px solid #fecaca",color:"#ce1126",padding:"8px 12px",borderRadius:7,fontSize:".78rem",marginBottom:10},children:["⚠️ ",v]}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx("button",{onClick:o,disabled:y,style:{flex:1,background:"var(--surface, #fff)",color:"var(--ink, #111)",border:"1.5px solid var(--border, #e5e5e5)",padding:"12px 16px",borderRadius:9,fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".85rem",cursor:y?"not-allowed":"pointer"},children:"Annuler"}),e.jsx("button",{onClick:T,disabled:!p||!m||y,style:{flex:2,background:p&&m?"linear-gradient(135deg, var(--green, #1a6b3a), #0d4d28)":"var(--border, #e5e5e5)",color:p&&m?"#fff":"var(--gray, #666)",border:"none",padding:"12px 16px",borderRadius:9,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".88rem",cursor:p&&m&&!y?"pointer":"not-allowed",transition:"all .2s"},children:"✓ Accepter et continuer"})]})]})]})}),b&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",backdropFilter:"blur(4px)",zIndex:99999,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",animation:"yfadeIn .2s ease"},children:e.jsxs("div",{style:{background:"var(--surface, #fff)",borderRadius:14,maxWidth:440,width:"100%",padding:"24px 22px",boxShadow:"0 20px 50px rgba(0,0,0,.4)",animation:"yslideUp .3s cubic-bezier(.2,.8,.2,1)"},children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:16},children:[e.jsx("div",{style:{fontSize:"2.5rem",marginBottom:8},children:"📜"}),e.jsx("h3",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.15rem",color:"var(--ink, #111)",marginBottom:6,letterSpacing:"-.3px"},children:"Confirmer votre engagement"}),e.jsxs("p",{style:{fontSize:".84rem",color:"var(--gray, #666)",lineHeight:1.6},children:["En acceptant, vous reconnaissez être ",e.jsx("strong",{style:{color:"var(--ink, #111)"},children:"légalement engagé"})," envers les conditions Yorix. Cette acceptation sera tracée et conservée comme preuve."]})]}),e.jsxs("div",{style:{background:"var(--surface2, #f5f5f5)",border:"1px solid var(--border, #e5e5e5)",borderRadius:9,padding:"12px 14px",marginBottom:14,fontSize:".74rem"},children:[e.jsx("div",{style:{fontWeight:700,marginBottom:6,color:"var(--gray, #666)"},children:"📋 Informations enregistrées :"}),e.jsxs("div",{style:{color:"var(--ink, #111)",lineHeight:1.7},children:[e.jsxs("div",{children:["👤 ",e.jsx("strong",{children:(s==null?void 0:s.nom)||(a==null?void 0:a.nom)||"—"})]}),e.jsxs("div",{children:["📞 ",(s==null?void 0:s.tel)||(a==null?void 0:a.telephone)||"—"]}),e.jsxs("div",{children:[w.icon," Rôle : ",w.label]}),e.jsxs("div",{children:["📅 ",new Date().toLocaleString("fr-FR")]}),e.jsxs("div",{children:["📝 Contrat version ",vr]})]})]}),v&&e.jsxs("div",{style:{background:"#fff0f0",border:"1px solid #fecaca",color:"#ce1126",padding:"8px 12px",borderRadius:7,fontSize:".78rem",marginBottom:10},children:["⚠️ ",v]}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx("button",{onClick:()=>k(!1),disabled:y,style:{flex:1,background:"var(--surface, #fff)",color:"var(--ink, #111)",border:"1.5px solid var(--border, #e5e5e5)",padding:"11px 16px",borderRadius:9,fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".82rem",cursor:y?"not-allowed":"pointer"},children:"← Annuler"}),e.jsx("button",{onClick:q,disabled:y,style:{flex:1.5,background:"linear-gradient(135deg, var(--green, #1a6b3a), #0d4d28)",color:"#fff",border:"none",padding:"11px 16px",borderRadius:9,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".82rem",cursor:y?"wait":"pointer",opacity:y?.7:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6},children:y?e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{width:14,height:14,border:"2px solid #fff",borderTopColor:"transparent",borderRadius:"50%",animation:"spin .7s linear infinite"}}),"Enregistrement..."]}):"✓ Accepter et continuer"})]})]})}),e.jsx("style",{children:`
        @keyframes yfadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes yslideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `})]})}function wn({role:r,roleInfo:o}){const t=({children:a})=>e.jsx("h3",{style:{fontFamily:"'Syne',sans-serif",fontSize:".95rem",fontWeight:800,color:"var(--ink, #111)",marginTop:18,marginBottom:8,letterSpacing:"-.2px"},children:a}),i=({children:a})=>e.jsx("h4",{style:{fontFamily:"'Syne',sans-serif",fontSize:".84rem",fontWeight:700,color:"var(--ink, #111)",marginTop:12,marginBottom:6},children:a});return e.jsxs("div",{children:[e.jsxs("div",{style:{background:"var(--green-pale, #e8f5e9)",border:"1px solid var(--green-light, #86efac)",borderRadius:9,padding:"10px 12px",marginBottom:14,fontSize:".78rem"},children:[e.jsxs("div",{style:{fontWeight:700,color:"var(--green, #1a6b3a)",marginBottom:4},children:["📜 Contrat Yorix CM — Version v1.0 — ",new Date().toLocaleDateString("fr-FR")]}),e.jsx("div",{style:{color:"var(--ink, #111)"},children:"Marketplace camerounaise • Vendeurs • Prestataires • Livreurs"})]}),e.jsx(t,{children:"PRÉAMBULE"}),e.jsxs("p",{children:["Le présent contrat régit les relations entre ",e.jsx("strong",{children:"YORIX CAMEROUN"})," (« Yorix »), exploitant www.yorix.cm, et toute personne physique ou morale (« l'Utilisateur Professionnel ») souhaitant proposer des produits, services ou livraisons via la Plateforme."]}),e.jsx("p",{children:"En cochant la case d'acceptation, vous reconnaissez avoir lu, compris et accepté l'intégralité des présentes conditions, et vous engagez juridiquement à les respecter."}),e.jsx(t,{children:"ARTICLE 1 — OBJET"}),e.jsxs("p",{children:["Le présent Contrat définit les conditions d'utilisation de Yorix pour vendre des produits, proposer des services ou effectuer des livraisons. L'inscription est ",e.jsx("strong",{children:"gratuite"}),". Yorix se rémunère via une commission de 5% sur chaque transaction."]}),e.jsx(t,{children:"ARTICLE 2 — INSCRIPTION ET VÉRIFICATION"}),e.jsxs("p",{children:["Pour vous inscrire, vous devez : être âgé d'",e.jsx("strong",{children:"au moins 18 ans"}),", disposer d'une ",e.jsx("strong",{children:"pièce d'identité valide"}),", fournir un ",e.jsx("strong",{children:"numéro camerounais"})," actif (MTN ou Orange) et fournir des informations exactes."]}),e.jsx("p",{children:"Yorix se réserve le droit de demander des justificatifs (CNI, attestation, photo) à tout moment. Les comptes non vérifiés peuvent être suspendus."}),e.jsx(t,{children:"ARTICLE 3 — ENGAGEMENTS COMMUNS"}),e.jsx("p",{children:"En vous inscrivant, vous vous engagez à :"}),e.jsxs("ul",{style:{paddingLeft:20,marginTop:6},children:[e.jsx("li",{children:"Respecter les Acheteurs : courtoisie, professionnalisme, honnêteté"}),e.jsx("li",{children:"Fournir des informations exactes"}),e.jsx("li",{children:"Respecter les engagements (délai, qualité, prix)"}),e.jsxs("li",{children:[e.jsx("strong",{children:"Ne jamais contourner Yorix"})," en proposant un paiement direct hors plateforme"]}),e.jsx("li",{children:"Ne pas frauder (faux avis, faux profils, doubles comptes)"}),e.jsx("li",{children:"Respecter les lois camerounaises en vigueur"}),e.jsx("li",{children:"Maintenir un comportement professionnel"}),e.jsx("li",{children:"Coopérer avec Yorix en cas de litige"})]}),e.jsx(t,{children:"ARTICLE 4 — ENGAGEMENT SPÉCIFIQUE À VOTRE RÔLE"}),e.jsxs("div",{style:{background:`${o.color}15`,border:`1.5px solid ${o.color}50`,borderRadius:9,padding:"12px 14px",marginTop:8},children:[e.jsxs("div",{style:{fontWeight:800,marginBottom:6,color:"var(--ink, #111)"},children:[o.icon," En tant que ",o.label]}),r==="seller"&&e.jsxs("ul",{style:{paddingLeft:20,marginTop:4},children:[e.jsxs("li",{children:["Je m'engage à fournir des ",e.jsx("strong",{children:"produits conformes"})," à leur description"]}),e.jsxs("li",{children:["Je garantis que mes produits sont ",e.jsx("strong",{children:"authentiques et légaux"})]}),e.jsxs("li",{children:["Je m'engage à ",e.jsx("strong",{children:"expédier dans les délais"})," annoncés"]}),e.jsxs("li",{children:["J'accepte la ",e.jsx("strong",{children:"commission Yorix de 5%"})," sur chaque vente"]}),e.jsxs("li",{children:["J'accepte le système ",e.jsx("strong",{children:"Escrow"})," (libération des fonds après livraison validée)"]}),e.jsxs("li",{children:["Je m'engage à ",e.jsx("strong",{children:"rembourser"})," en cas de produit non conforme"]}),e.jsxs("li",{children:["Je ne vendrai ",e.jsx("strong",{children:"jamais de produits contrefaits, illégaux ou dangereux"})]})]}),r==="provider"&&e.jsxs("ul",{style:{paddingLeft:20,marginTop:4},children:[e.jsxs("li",{children:["Je m'engage à fournir des ",e.jsx("strong",{children:"services conformes et professionnels"})]}),e.jsxs("li",{children:["Je garantis avoir les ",e.jsx("strong",{children:"qualifications nécessaires"})]}),e.jsxs("li",{children:["Je m'engage à ",e.jsx("strong",{children:"respecter les rendez-vous"})," et délais"]}),e.jsxs("li",{children:["Je facture des ",e.jsx("strong",{children:"tarifs justes et transparents"})]}),e.jsxs("li",{children:["Tarifs Yorix recommandés : ",e.jsx("strong",{children:"10 000 FCFA / projet"})," ou ",e.jsx("strong",{children:"5 000 FCFA / heure"})]}),e.jsxs("li",{children:["J'accepte la ",e.jsx("strong",{children:"commission Yorix de 5%"})]}),e.jsxs("li",{children:["Je ne solliciterai ",e.jsx("strong",{children:"jamais de paiement hors Yorix"})," pour contourner la commission"]})]}),r==="delivery"&&e.jsxs("ul",{style:{paddingLeft:20,marginTop:4},children:[e.jsxs("li",{children:["Je m'engage à ",e.jsx("strong",{children:"respecter les tarifs Yorix Ride"})," affichés au client"]}),e.jsxs("li",{children:["Je m'engage à ",e.jsx("strong",{children:"livrer les colis confiés"})," dans les délais"]}),e.jsxs("li",{children:["J'accepte la ",e.jsx("strong",{children:"commission Yorix"})," sur chaque livraison"]}),e.jsxs("li",{children:["Je dispose d'un ",e.jsx("strong",{children:"véhicule en bon état"})," et des ",e.jsx("strong",{children:"documents légaux"})]}),e.jsxs("li",{children:["Je traiterai les colis avec ",e.jsx("strong",{children:"soin et confidentialité"})]}),e.jsxs("li",{children:["En cas de ",e.jsx("strong",{children:"perte ou détérioration"}),", j'accepte d'être tenu responsable"]}),e.jsxs("li",{children:["Je n'effectuerai ",e.jsx("strong",{children:"aucune livraison illégale"})," (drogues, armes, contrefaçons)"]})]})]}),e.jsx(t,{children:"ARTICLE 5 — COMMISSIONS ET PAIEMENTS"}),e.jsx(i,{children:"5.1 Commission Yorix"}),e.jsxs("p",{children:["Yorix prélève une ",e.jsx("strong",{children:"commission de 5%"})," sur chaque transaction. Exemple : pour 10 000 FCFA, vous recevez 9 500 FCFA."]}),e.jsx(i,{children:"5.2 Paiement"}),e.jsxs("p",{children:["Versement via ",e.jsx("strong",{children:"MTN MoMo"})," ou ",e.jsx("strong",{children:"Orange Money"}),", au plus tard ",e.jsx("strong",{children:"48 heures"})," après validation de la livraison/prestation."]}),e.jsx(i,{children:"5.3 Modification des commissions"}),e.jsxs("p",{children:["Yorix peut modifier les commissions avec un ",e.jsx("strong",{children:"préavis de 30 jours"}),"."]}),e.jsx(t,{children:"ARTICLE 6 — SYSTÈME ESCROW"}),e.jsxs("p",{children:["Les fonds versés par l'Acheteur sont ",e.jsx("strong",{children:"bloqués chez Yorix"})," jusqu'à validation de la livraison. En cas de litige, Yorix arbitre sous ",e.jsx("strong",{children:"48h maximum"}),"."]}),e.jsx(t,{children:"ARTICLE 7 — NOTATION ET RÉPUTATION"}),e.jsxs("p",{children:["Les Acheteurs notent de ",e.jsx("strong",{children:"1 à 5 étoiles"}),". Une note moyenne sous ",e.jsx("strong",{children:"3,0/5"})," sur plus de 10 avis peut entraîner suspension. Tout faux avis entraîne l'",e.jsx("strong",{children:"exclusion immédiate"}),"."]}),e.jsx(t,{children:"ARTICLE 8 — INTERDICTIONS ET SANCTIONS"}),e.jsx("p",{children:e.jsx("strong",{children:"Strictement interdit :"})}),e.jsxs("ul",{style:{paddingLeft:20},children:[e.jsx("li",{children:"Contournement de la plateforme (paiement direct)"}),e.jsx("li",{children:"Faux avis, faux profils, fausses livraisons"}),e.jsx("li",{children:"Vente de produits illégaux, contrefaits, dangereux"}),e.jsx("li",{children:"Discrimination, harcèlement, propos haineux"}),e.jsx("li",{children:"Usurpation d'identité"}),e.jsx("li",{children:"Tentative de piratage"})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Sanctions :"})," avertissement, suspension (24h-30j), exclusion définitive, retenue des paiements, poursuites judiciaires."]}),e.jsx(t,{children:"ARTICLE 9 — RESPONSABILITÉ"}),e.jsxs("p",{children:["Vous êtes ",e.jsx("strong",{children:"seul responsable"})," de vos produits/services/livraisons. Yorix agit comme ",e.jsx("strong",{children:"intermédiaire technique"}),"."]}),e.jsx(t,{children:"ARTICLE 10 — DONNÉES PERSONNELLES"}),e.jsxs("p",{children:["Vos données sont stockées de manière sécurisée et jamais revendues. Droit d'accès, rectification, suppression : ",e.jsx("strong",{children:"support@yorix.cm"}),"."]}),e.jsx(t,{children:"ARTICLE 11 — TRAÇABILITÉ DE L'ACCEPTATION"}),e.jsxs("p",{children:["En cochant la case, sont enregistrés : votre nom, téléphone, rôle, date/heure, IP, navigateur, version du contrat. Ces informations constituent une ",e.jsx("strong",{children:"preuve juridique"}),"."]}),e.jsx(t,{children:"ARTICLE 12 — MODIFICATION DU CONTRAT"}),e.jsx("p",{children:"Yorix peut modifier ce contrat. Vous serez notifié par email et devrez réaccepter la nouvelle version lors de votre prochaine connexion."}),e.jsx(t,{children:"ARTICLE 13 — RÉSILIATION"}),e.jsxs("p",{children:["Vous pouvez résilier à tout moment via ",e.jsx("strong",{children:"support@yorix.cm"}),". Yorix peut résilier sans préavis en cas de manquement grave, fraude."]}),e.jsx(t,{children:"ARTICLE 14 — DROIT APPLICABLE"}),e.jsxs("p",{children:["Contrat régi par le ",e.jsx("strong",{children:"droit camerounais"}),". En cas de litige : tribunaux compétents de ",e.jsx("strong",{children:"Douala"}),"."]}),e.jsx(t,{children:"ARTICLE 15 — CONTACT"}),e.jsxs("p",{children:["📧 support@yorix.cm",e.jsx("br",{}),"📱 +237 696 56 56 54",e.jsx("br",{}),"📍 Douala / Yaoundé, Cameroun"]}),e.jsxs("div",{style:{marginTop:24,padding:"14px 16px",background:"linear-gradient(135deg, #1a3a24, #0d3320)",borderRadius:11,color:"#fff"},children:[e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".95rem",marginBottom:6},children:"🤝 Engagement final"}),e.jsx("p",{style:{color:"rgba(255,255,255,.85)",fontSize:".82rem",lineHeight:1.6,marginBottom:0},children:"En acceptant, je reconnais que je ne crée pas simplement un compte. Je m'engage à respecter un système, des engagements professionnels et des obligations légales. Yorix protège ses utilisateurs grâce à des engagements de transparence, qualité et sécurité."})]}),e.jsx("p",{style:{textAlign:"center",marginTop:16,fontSize:".7rem",color:"var(--gray, #666)"},children:"🇨🇲 Yorix CM — La marketplace de confiance du Cameroun"})]})}function kn({value:r="",onChange:o,placeholder:t="Entrez votre mot de passe",showStrength:i=!1,showRules:a=!1,confirmValue:c=null,autoComplete:s="current-password",autoMask:p=10,id:d,ariaLabel:m="Mot de passe"}){const[x,b]=l.useState(!1),[k,y]=l.useState(!1),S=l.useRef(null),v=l.useRef(null);l.useEffect(()=>(x&&p>0&&(v.current=setTimeout(()=>{b(!1)},p*1e3)),()=>{v.current&&clearTimeout(v.current)}),[x,p]);const g=E=>{E.preventDefault(),E.stopPropagation(),b(I=>!I),setTimeout(()=>{var I;return(I=S.current)==null?void 0:I.focus()},0)},h=l.useMemo(()=>{if(!r)return{score:0,label:"",color:""};let E=0;return r.length>=6&&E++,r.length>=10&&E++,/[A-Z]/.test(r)&&E++,/[0-9]/.test(r)&&E++,/[^A-Za-z0-9]/.test(r)&&E++,E<=1?{score:1,label:"Faible",color:"#dc2626"}:E<=2?{score:2,label:"Moyen",color:"#f59e0b"}:E<=3?{score:3,label:"Bon",color:"#3b82f6"}:E<=4?{score:4,label:"Fort",color:"#16a34a"}:{score:5,label:"Très fort",color:"#15803d"}},[r]),w=l.useMemo(()=>({length:r.length>=6,uppercase:/[A-Z]/.test(r),digit:/[0-9]/.test(r)}),[r]),M=c!==null?r&&c&&r===c:null,T=c!==null?c.length>0&&r!==c:!1,q=()=>T?"var(--red, #dc2626)":M||k?"var(--green, #1a6b3a)":"var(--border, #e5e5e5)";return e.jsxs("div",{style:{width:"100%"},children:[e.jsxs("div",{style:{position:"relative",width:"100%"},children:[e.jsx("input",{ref:S,id:d,type:x?"text":"password",value:r,onChange:E=>o(E.target.value),onFocus:()=>y(!0),onBlur:()=>y(!1),placeholder:t,autoComplete:s,"aria-label":m,style:{width:"100%",padding:"12px 48px 12px 14px",borderRadius:9,border:`1.5px solid ${q()}`,background:"var(--surface, #fff)",color:"var(--ink, #111)",fontSize:".88rem",fontFamily:"'DM Sans',sans-serif",outline:"none",transition:"border-color .15s",boxSizing:"border-box",letterSpacing:x?"0.02em":"0.1em"}}),e.jsx("button",{type:"button",onClick:g,"aria-label":x?"Masquer le mot de passe":"Afficher le mot de passe",title:x?"Masquer le mot de passe":"Afficher le mot de passe",tabIndex:0,style:{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",background:"transparent",border:"none",cursor:"pointer",padding:8,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--gray, #666)",transition:"background .15s, color .15s"},onMouseOver:E=>{E.currentTarget.style.background="var(--surface2, #f5f5f5)",E.currentTarget.style.color="var(--green, #1a6b3a)"},onMouseOut:E=>{E.currentTarget.style.background="transparent",E.currentTarget.style.color="var(--gray, #666)"},children:x?e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[e.jsx("path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"}),e.jsx("circle",{cx:"12",cy:"12",r:"3"})]}):e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[e.jsx("path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24"}),e.jsx("path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"}),e.jsx("path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"}),e.jsx("line",{x1:"2",y1:"2",x2:"22",y2:"22"})]})})]}),i&&r&&e.jsxs("div",{style:{marginTop:6},children:[e.jsx("div",{style:{display:"flex",gap:3,marginBottom:4},children:[1,2,3,4,5].map(E=>e.jsx("div",{style:{flex:1,height:4,borderRadius:2,background:E<=h.score?h.color:"var(--border, #e5e5e5)",transition:"background .25s"}},E))}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:".68rem",fontFamily:"'DM Sans',sans-serif"},children:[e.jsx("span",{style:{color:"var(--gray, #666)"},children:"💪 Force du mot de passe"}),e.jsx("span",{style:{color:h.color,fontWeight:700},children:h.label})]})]}),a&&r&&e.jsxs("div",{style:{marginTop:8,padding:"8px 10px",background:"var(--surface2, #f5f5f5)",border:"1px solid var(--border, #e5e5e5)",borderRadius:7,display:"flex",flexDirection:"column",gap:3},children:[e.jsx(wr,{ok:w.length,text:"Au moins 6 caractères"}),e.jsx(wr,{ok:w.uppercase,text:"Une majuscule (recommandé)",optional:!0}),e.jsx(wr,{ok:w.digit,text:"Un chiffre (recommandé)",optional:!0})]}),c!==null&&c.length>0&&e.jsx("div",{style:{marginTop:6,fontSize:".74rem",fontFamily:"'DM Sans',sans-serif",fontWeight:600,color:M?"var(--green, #16a34a)":"var(--red, #dc2626)",display:"flex",alignItems:"center",gap:5},children:M?e.jsx(e.Fragment,{children:"✓ Les mots de passe correspondent"}):e.jsx(e.Fragment,{children:"✗ Les mots de passe ne correspondent pas"})})]})}function wr({ok:r,text:o,optional:t}){return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:".72rem",color:r?"var(--green, #16a34a)":"var(--gray, #666)",fontFamily:"'DM Sans',sans-serif"},children:[e.jsx("span",{style:{width:14,height:14,borderRadius:"50%",background:r?"var(--green, #16a34a)":"var(--border, #e5e5e5)",color:"#fff",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:".55rem",fontWeight:800,flexShrink:0},children:r?"✓":"·"}),e.jsxs("span",{children:[o,t&&!r&&e.jsx("span",{style:{opacity:.6,fontSize:".66rem"},children:" (optionnel)"})]})]})}function jn(){var ot,it,at;const r=ui(),o=Rt(),t=l.useMemo(()=>Ai(o.pathname),[o.pathname]),i=t.page,[a,c]=l.useState(!1),[s,p]=l.useState(null),[d,m]=l.useState(null),[x,b]=l.useState(null),[k,y]=l.useState(!0),[S,v]=l.useState(!1),[g,h]=l.useState("login"),[w,M]=l.useState("buyer"),[T,q]=l.useState({nom:"",email:"",tel:"",password:""}),[E,I]=l.useState(""),[se,H]=l.useState(!1),[W,me]=l.useState([]),[C,P]=l.useState(!0),[F,Z]=l.useState([]);l.useEffect(()=>{(async()=>{const{data:f,error:u}=await N.from("services").select("*").eq("actif",!0).eq("disponible",!0).order("created_at",{ascending:!1});u||Z(f||[])})()},[]);const[L,xe]=l.useState(""),[ie,ae]=l.useState(""),[ue,Ce]=l.useState(()=>Qa());l.useEffect(()=>{Za(ue)},[ue]);const[Zt,_e]=l.useState(!1),[Ee,be]=l.useState([]),[Or,Le]=l.useState(()=>K()),Dr=l.useRef(Or);Dr.current=Or;const[eo,ro]=l.useState(!1),[Oe,ne]=l.useState(!1),tr=l.useRef(null),[he,to]=l.useState(()=>Ir());l.useEffect(()=>{let n=!1;const f=()=>{n||(n=!0,requestAnimationFrame(()=>{n=!1,ro(window.scrollY>16)}))};return f(),window.addEventListener("scroll",f,{passive:!0}),()=>window.removeEventListener("scroll",f)},[]),l.useEffect(()=>{if(!Oe)return;const n=f=>{tr.current&&!tr.current.contains(f.target)&&ne(!1)};return document.addEventListener("mousedown",n),()=>document.removeEventListener("mousedown",n)},[Oe]),l.useEffect(()=>{let n=!1;return(async()=>{try{const{data:f,error:u}=await N.from("commerce_settings").select("free_shipping_threshold_xaf, standard_delivery_fee_xaf").eq("id",1).maybeSingle();if(n||u||!f)return;to(Ht({freeShippingThresholdXaf:Number(f.free_shipping_threshold_xaf),standardDeliveryFeeXaf:Number(f.standard_delivery_fee_xaf)}))}catch{}})(),()=>{n=!0}},[]);const qr=l.useCallback(async(n,f=40)=>{if(!n)return;const{data:u,error:j}=await N.from("notifications").select("*").eq("user_id",n).order("created_at",{ascending:!1}).limit(f);j?console.warn("Notifications:",j.message):be(u||[])},[]);l.useEffect(()=>{if(!(s!=null&&s.id)){Le(K());return}let n=!1;return Qt(N,s.id).then(f=>{n||Le(f)}),()=>{n=!0}},[s==null?void 0:s.id]);const[X,le]=l.useState("overview"),[or,oo]=l.useState(!1),[Te,ir]=l.useState(""),[ar,nr]=l.useState(!1),[De,io]=l.useState(new Set),[ao,no]=l.useState(320),[so,lo]=l.useState("TOUT"),[co,ye]=l.useState(null),[po,sr]=l.useState(!1),[go,lr]=l.useState(!1),[fo,Br]=l.useState(!1),[Sn,Yr]=l.useState(null),[mo,Ae]=l.useState(!1),[ve,$r]=l.useState(null),[qe,xo]=l.useState([]),[uo,Fr]=l.useState(!0),[Ur,dr]=l.useState(null),[Ne,Be]=l.useState(null),[bo,Re]=l.useState(!1);l.useEffect(()=>{(async()=>{Fr(!0);const{data:f,error:u}=await N.from("academy_courses").select("*").eq("actif",!0).order("prix",{ascending:!0});u||xo(f||[]),Fr(!1)})()},[]);const ho=l.useCallback(n=>{n!=null&&n.id&&(dr(n),r(ur("academyDetail",{courseId:n.id})))},[r]),yo=l.useCallback(n=>{n!=null&&n.id&&(dr(n),r(ur("academyContact",{courseId:n.id})))},[r]),[vo,Wr]=l.useState(!1),[wo,Vr]=l.useState(!1),[ko,we]=l.useState(""),[_,jo]=l.useState({nom:"",prenom:"",tel:"",email:"",metier:"",ville:"",experience:"",tarif:"",bio:""}),So=async()=>{if(we(""),!_.nom.trim()){we("Le nom est obligatoire");return}if(!_.tel.trim()){we("Le téléphone est obligatoire");return}if(!_.metier){we("Veuillez choisir un métier");return}if(_.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(_.email)){we("Email invalide");return}Vr(!0);try{const{data:n,error:f}=await N.from("prestataires").insert({nom:_.nom,prenom:_.prenom||null,telephone:_.tel,email:_.email||null,metier:_.metier,ville:_.ville||null,experience:_.experience||null,tarif:_.tarif||null,bio:_.bio||null,status:"pending",user_id:(s==null?void 0:s.id)||null}).select().single();f&&console.warn("Table prestataires Supabase:",f.message);const u=["👷 *NOUVELLE CANDIDATURE PRESTATAIRE YORIX*","","👤 *Informations*",`Nom : ${_.nom}${_.prenom?" "+_.prenom:""}`,`Téléphone : ${_.tel}`,_.email?`Email : ${_.email}`:"","","💼 *Profil professionnel*",`Métier : ${_.metier}`,_.ville?`Ville : ${_.ville}`:"",_.experience?`Expérience : ${_.experience}`:"",_.tarif?`Tarif : ${_.tarif}`:"","",_.bio?`📝 *Présentation*
${_.bio}`:"","","✅ *Actions à faire*","1. Contacter le candidat sous 24h","2. Vérifier les qualifications","3. Valider ou refuser le profil","","Yorix CM 🇨🇲"].filter(Boolean).join(`
`),j=`https://wa.me/${Ge}?text=${encodeURIComponent(u)}`;window.open(j,"_blank");const D=`Nouvelle candidature prestataire — ${_.nom} (${_.metier})`,Y=["Bonjour,","","Nouvelle candidature prestataire sur Yorix CM :","",`👤 Nom : ${_.nom}${_.prenom?" "+_.prenom:""}`,`📞 Téléphone : ${_.tel}`,_.email?`📧 Email : ${_.email}`:"",`💼 Métier : ${_.metier}`,_.ville?`📍 Ville : ${_.ville}`:"",_.experience?`⏱ Expérience : ${_.experience}`:"",_.tarif?`💰 Tarif : ${_.tarif}`:"","",_.bio?`📝 Présentation :
${_.bio}`:"","","---","Envoyé depuis yorix.cm"].filter(Boolean).join(`
`),G=`mailto:raisaodin1@gmail.com?subject=${encodeURIComponent(D)}&body=${encodeURIComponent(Y)}`;setTimeout(()=>window.open(G,"_blank"),500),Wr(!0)}catch(n){console.error("soumettreCandidaturePrestataire:",n),we("Erreur : "+(n.message||"Impossible d'envoyer la candidature. Réessayez."))}Vr(!1)},[zo,zn]=l.useState([{text:"Bonjour ! Comment puis-je vous aider ?",me:!1,time:"10:02"}]),[Cn,_n]=l.useState(""),[En,Tn]=l.useState(!1),Co=l.useRef(null);l.useEffect(()=>{if(!localStorage.getItem("yorix_onboarding_seen")){const f=setTimeout(()=>Ae(!0),800);return()=>clearTimeout(f)}},[]);const _o=l.useCallback(n=>{localStorage.setItem("yorix_onboarding_seen","1"),Ae(!1);const u={buy:{needAuth:!1,page:"produits"},sell:{needAuth:!0,role:"seller",page:"dashboard"},service:{needAuth:!1,page:"prestataires"},delivery:{needAuth:!0,role:"buyer",action:"openDelivery"}}[n];if(u){if(u.needAuth&&!s){$r(n),M(u.role||"buyer"),h("register"),v(!0);return}cr(n)}},[s]),cr=l.useCallback(n=>{const f=n||ve;f&&(f==="buy"?z("produits"):f==="sell"?z("dashboard"):f==="service"?z("prestataires"):f==="delivery"&&(z("livraison"),setTimeout(()=>sr(!0),300)),$r(null))},[ve]),Eo=l.useCallback(()=>{localStorage.setItem("yorix_onboarding_seen","1"),Ae(!1)},[]),z=l.useCallback((n,f={})=>{r(ur(n,f)),window.scrollTo(0,0),_e(!1)},[r]);l.useEffect(()=>{let n=!1;N.auth.getSession().then(({data:{session:u},error:j})=>{n||(j&&console.warn("Auth getSession:",j.message),u!=null&&u.user&&(p(u.user),Ye(u.user.id)),y(!1))}).catch(u=>{console.warn("Auth getSession:",(u==null?void 0:u.message)||u),n||y(!1)});const{data:{subscription:f}}=N.auth.onAuthStateChange((u,j)=>{j!=null&&j.user?(p(j.user),Ye(j.user.id)):(p(null),m(null),b(null),be([]))});return()=>{n=!0,f.unsubscribe()}},[]);const Ye=async n=>{const f=await ya(n),u=va(f);m(f),b(u),await qr(n,40)};l.useEffect(()=>{if(!(s!=null&&s.id))return;const n=N.channel(`notifications_rt_${s.id}`).on("postgres_changes",{event:"INSERT",schema:"public",table:"notifications",filter:`user_id=eq.${s.id}`},f=>{const u=f.new;be(j=>j.some(D=>D.id===u.id)?j:[u,...j].slice(0,120));try{pn(Lr(u),Dr.current)}catch{}}).subscribe();return()=>{N.removeChannel(n)}},[s==null?void 0:s.id]),l.useEffect(()=>{if(!("serviceWorker"in navigator))return;const n=f=>{var j;if(((j=f.data)==null?void 0:j.type)!=="NOTIF_NAV")return;const u=typeof f.data.url=="string"?f.data.url:"/";r(u.startsWith("/")?u:`/${u}`)};return navigator.serviceWorker.addEventListener("message",n),()=>navigator.serviceWorker.removeEventListener("message",n)},[r]),l.useEffect(()=>{P(!0);const n=async()=>{let u=N.from("products").select("*").or("actif.eq.true,actif.is.null").order("sponsorise",{ascending:!1}).order("created_at",{ascending:!1}).limit(60);ie&&(u=u.eq("categorie",ie));const{data:j,error:D}=await u;D&&console.warn("Produits:",D.message),me(j||[]),P(!1)};n();const f=N.channel("prod_rt").on("postgres_changes",{event:"*",schema:"public",table:"products"},n).subscribe();return()=>N.removeChannel(f)},[ie]),l.useEffect(()=>{var n;(n=Co.current)==null||n.scrollIntoView({behavior:"smooth"})},[zo]);const $e=o.pathname;l.useEffect(()=>{if(t.categorySlug){const n=Ti(t.categorySlug,kt);ae(n||"")}else t.page==="produits"&&$e==="/produits"&&ae("")},[t.categorySlug,t.page,$e]);const de=l.useMemo(()=>{var n;return t.citySlug?(n=$[t.citySlug])==null?void 0:n.name:null},[t.citySlug]),To=l.useMemo(()=>{var n;return t.page==="prestataires"&&t.metierSlug&&t.villeSlug?{cat:Ot[t.metierSlug]||"",ville:((n=$[t.villeSlug])==null?void 0:n.name)||""}:t.page==="seoCity"&&t.cityMode==="prestataires"&&de?{cat:"",ville:de}:t.page==="prestataires"&&$e==="/prestataires"?{cat:"",ville:""}:null},[t.page,t.metierSlug,t.villeSlug,t.cityMode,de,$e]);l.useEffect(()=>{if(t.page!=="academyDetail"&&t.page!=="academyContact")return;const n=t.courseId;if(!n||!qe.length)return;const f=qe.find(u=>String(u.id)===String(n));f&&dr(f)},[t.page,t.courseId,qe]),l.useEffect(()=>{if(t.page!=="productDetail"||!t.productSlug){Be(null),Re(!1);return}const{id:n}=xt(t.productSlug);if(!n){Be(null),Re(!1);return}let f=!1;return Re(!0),N.from("products").select("*").eq("id",n).maybeSingle().then(({data:u,error:j})=>{f||(j&&console.warn("Détail produit:",j.message),Be(u||null),Re(!1))}).catch(u=>{f||(console.warn("Détail produit:",(u==null?void 0:u.message)||u),Be(null),Re(!1))}),()=>{f=!0}},[t.page,t.productSlug]),l.useEffect(()=>{if(t.page!=="prestDetail"||!t.prestSlug){t.page!=="prestDetail"&&ye(null);return}const{id:n}=xt(t.prestSlug);if(!n){ye(null);return}const f=ha.find(j=>j.id===n);if(f){ye(f);return}const u=F.find(j=>`real-${j.id}`===n||String(j.id)===n);ye(u?{id:`real-${u.id}`,name:u.provider_nom||"Prestataire Yorix",metier:u.nom||"Service",categorie:u.categorie||"Autre",ville:u.ville||"Cameroun",quartier:"",emoji:"🛠️",photo:null,color_bg:"linear-gradient(135deg, #dcfce7, #bbf7d0)",tags:[u.categorie||"Service"].filter(Boolean),note:u.note||5,avis:u.nombre_avis||0,prix:u.prix?`${Number(u.prix).toLocaleString("fr-FR")} FCFA`:"",verifie:!0,dispo:u.disponible!==!1,bio:u.description||"",telephone:"",realisations:0,isReal:!0}:null)},[t.page,t.prestSlug,F]);const Ao=async()=>{I(""),H(!0);try{const{data:n,error:f}=await N.auth.signInWithPassword({email:T.email,password:T.password});if(f)throw f;p(n.user),await Ye(n.user.id),v(!1),ve&&setTimeout(()=>cr(ve),300),Sa({to:T.email,subject:`Bienvenue sur Yorix, ${T.nom} ! 🎉`,html:Ca(T.nom,w)}).catch(u=>console.warn("Email bienvenue:",u))}catch{I("Email ou mot de passe incorrect.")}H(!1)},Hr=async()=>{var n;I(""),H(!0);try{if(!T.nom||!T.email||!T.password||!T.tel)throw new Error("Tous les champs sont obligatoires.");if(!w)throw new Error("Veuillez choisir un profil (Acheteur, Vendeur, Livreur ou Prestataire).");if(["seller","provider","delivery"].includes(w)&&!fo){Yr({nom:T.nom,email:T.email,tel:T.tel,password:T.password,role:w}),H(!1),lr(!0);return}const{data:u,error:j}=await N.auth.signUp({email:T.email,password:T.password,options:{data:{display_name:T.nom,nom:T.nom,telephone:T.tel,role:w}}});if(j)throw j;const D=(n=u.user)==null?void 0:n.id;if(!D)throw new Error("Erreur création compte.");const{error:Y}=await N.from("profiles").upsert({id:D,nom:T.nom,email:T.email,telephone:T.tel,role:w,langue:"fr",actif:!0,verifie:!1,note:0,nombre_avis:0,total_commandes:0});Y&&console.error("Profile insert error:",Y),await N.from("wallets").insert({user_id:D,solde:0,total_gagne:0,devise:"FCFA"}).then(G=>G.error&&console.error(G.error)),await Ye(D),v(!1),q({nom:"",email:"",tel:"",password:""}),Br(!1),Yr(null),ve&&setTimeout(()=>cr(ve),500)}catch(f){console.error("Register error:",f),I(f.message.includes("already")?"Cet email est déjà utilisé.":f.message)}H(!1)},No=async()=>{const{error:n}=await N.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin}});n&&I(n.message)},Xr=async()=>{await N.auth.signOut(),p(null),m(null),b(null),le("overview"),z("home")},Ro=async n=>{lr(!1),Br(!0),setTimeout(()=>{Hr()},200)},Fe=l.useCallback(n=>{const f=en(n);f&&Ce(u=>zt(u,f))},[]),Mo=l.useCallback(n=>{const f=rn(n);f&&Ce(u=>zt(u,f))},[]),Po=(n,f,u=null)=>Ce(j=>tn(j,n,u,f)),Io=(n,f=null)=>Ce(u=>on(u,n,f)),pr=l.useMemo(()=>an(ue,he),[ue,he]),gr=pr.qty,Lo=l.useCallback(async n=>{if(!(s!=null&&s.id)||!n)return;const f={};if(n.telephone!=null&&String(n.telephone).trim()!==""&&(f.telephone=String(n.telephone).trim()),n.adresse!=null&&(f.adresse=String(n.adresse).trim()),n.ville!=null&&(f.ville=String(n.ville).trim()),n.nom!=null&&(f.nom=String(n.nom).trim()),!Object.keys(f).length)return;const{error:u}=await N.from("profiles").update(f).eq("id",s.id);if(u){console.warn("Profil checkout non sauvegardé:",u.message||u);return}m(j=>j&&{...j,...f})},[s==null?void 0:s.id]),fr=l.useCallback(n=>io(f=>{const u=new Set(f);return u.has(n)?u.delete(n):u.add(n),u}),[]),Gr=async(n,f={navigate:!0,closeDrawer:!0})=>{const u=typeof n=="object"?n.id:n,j=typeof n=="object"?n:Ee.find(Y=>Y.id===u);try{const{error:Y}=await N.from("notifications").update({lu:!0}).eq("id",u);Y&&console.warn("marquerNotifLue:",Y.message)}catch(Y){console.warn("marquerNotifLue exception:",Y==null?void 0:Y.message)}if(be(Y=>Y.map(G=>G.id===u?{...G,lu:!0}:G)),f.closeDrawer&&_e(!1),!f.navigate||!j)return;const D=String(j.link||"").trim();if(D.startsWith("http")){window.open(D,"_blank","noopener,noreferrer");return}if(D.startsWith("/")){r(D);return}j.type==="new_product"||D.includes("/products/")?z("produits"):j.type==="new_message"&&(z("dashboard"),le("messages"))},Jr=async n=>{if(n){try{const{error:f}=await N.from("notifications").delete().eq("id",n);f&&console.warn("supprimerNotif:",f.message)}catch(f){console.warn("supprimerNotif:",f==null?void 0:f.message)}be(f=>f.filter(u=>u.id!==n))}},Kr=async()=>{const n=Ee.filter(f=>!f.lu).map(f=>f.id);if(n.length!==0){try{const{error:f}=await N.from("notifications").update({lu:!0}).in("id",n);f&&console.warn("marquerToutesLues:",f.message)}catch(f){console.warn("marquerToutesLues exception:",f==null?void 0:f.message)}be(f=>f.map(u=>({...u,lu:!0})))}},Ue=Ee.filter(n=>!n.lu).length,Oo=l.useMemo(()=>{let n=W.filter(f=>{var u,j;return!L||((u=f.name_fr)==null?void 0:u.toLowerCase().includes(L.toLowerCase()))||((j=f.description_fr)==null?void 0:j.toLowerCase().includes(L.toLowerCase()))});if(i==="seoCity"&&t.cityMode==="acheter"&&de){const f=de.toLowerCase();n=n.filter(u=>{const j=(u.ville||"").toLowerCase();return!j||j.includes(f)||f.includes(j)})}return n},[W,L,i,t.cityMode,de]),Qr=i==="seoCity"||i==="livraison"&&!!t.citySlug,Zr=i==="produits"||i==="seoCity"&&t.cityMode==="acheter",Do=i==="livraison"||i==="seoCity"&&t.cityMode==="livraison",qo=i==="prestataires"||i==="prestDetail"||i==="seoCity"&&t.cityMode==="prestataires",Bo=Zr||i==="escrow",Yo=l.useMemo(()=>["faq","devenirVendeur","devenirLivreur","inscription","business","academy","blog","contact","aide","cgv","mentions","confidentialite"].includes(i),[i]),et=l.useCallback(n=>n==="produits"?i==="produits"||i==="seoCity"&&t.cityMode==="acheter":n==="livraison"?i==="livraison"||i==="seoCity"&&t.cityMode==="livraison":n==="prestataires"?i==="prestataires"||i==="prestDetail"||i==="seoCity"&&t.cityMode==="prestataires":i===n,[i,t.cityMode]),rt=l.useCallback(n=>{z("productDetail",{productSlug:mt(n.name_fr||n.name,n.id)})},[z]),tt=()=>({buyer:"chip-buyer",seller:"chip-seller",delivery:"chip-delivery",provider:"chip-provider",admin:"chip-admin"})[x]||"chip-buyer",$o=()=>x==="seller"?[{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"🏪",id:"mesProduits",label:"Mes produits"},{icon:"➕",id:"ajouterProduit",label:"Ajouter produit"},{icon:"📦",id:"commandes",label:"Commandes"},{icon:"💰",id:"wallet",label:"Wallet"}]:x==="delivery"?[{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"🟡",id:"disponibles",label:"Disponibles"},{icon:"🚚",id:"enCours",label:"En cours"},{icon:"✅",id:"historique",label:"Historique"},{icon:"💰",id:"wallet",label:"Gains"}]:x==="provider"?[{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"📋",id:"demandes",label:"Demandes"},{icon:"🛠️",id:"mesServices",label:"Mes services"},{icon:"+",id:"ajouterService",label:"Ajouter service"}]:[{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"📦",id:"commandes",label:"Mes commandes"},{icon:"❤️",id:"favoris",label:"Favoris"},{icon:"🌟",id:"loyalty",label:"Fidélité"}],Fo=[{l:"🏠 Accueil",p:"home"},{l:"🛍️ Produits",p:"produits"},{l:"🎁 Bons plans",p:"bonsPlans"},{l:"🚚 Livraison",p:"livraison"},{l:"🔐 Escrow",p:"escrow"},{l:"👷 Prestataires",p:"prestataires"},{l:"💼 Business",p:"business"},{l:"🎓 Academy",p:"academy"},{l:"📰 Blog",p:"blog"},{l:"🌟 Fidélité",p:"loyalty"},{l:"📞 Contact",p:"contact"},{l:"🆘 Aide",p:"aide"},...s&&((d==null?void 0:d.role)==="admin"||(d==null?void 0:d.role)==="superadmin")?[{l:"⚙️ Admin",p:"admin"}]:[]],ce=l.useMemo(()=>{const n=t.canonicalPath||o.pathname,f={"@context":"https://schema.org","@type":"Organization",name:"Yorix CM",alternateName:"Yorix Cameroun",url:J,logo:`${J}/favicon.svg`,image:`${J}/og-image.svg`,email:"support@yorix.cm",telephone:"+237696565654",foundingDate:"2025",address:{"@type":"PostalAddress",addressCountry:"CM",addressLocality:"Douala",addressRegion:"Littoral"},areaServed:{"@type":"Country",name:"Cameroun"},contactPoint:[{"@type":"ContactPoint",telephone:"+237696565654",contactType:"customer service",areaServed:"CM",availableLanguage:["French","English"]}],sameAs:["https://www.facebook.com/yorixcm","https://www.instagram.com/yorixcm","https://wa.me/237696565654"]},u=R=>R!=null&&R.length?{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:R.map((U,pe)=>{var ke;return{"@type":"ListItem",position:pe+1,name:U.name,item:(ke=U.path)!=null&&ke.startsWith("http")?U.path:`${J}${U.path||"/"}`}})}:null,j={"@context":"https://schema.org","@type":"WebSite",name:"Yorix CM",url:J,potentialAction:{"@type":"SearchAction",target:`${Ni()}?q={search_term_string}`,"query-input":"required name=search_term_string"}};if(i==="dashboard"||i==="admin")return{title:"Espace membre — Yorix CM",description:"Tableau de bord Yorix.",canonicalPath:n,noindex:!0,jsonLd:[]};if(i==="home")return{title:"Yorix.cm — Marketplace Cameroun | Achat en ligne, livraison, escrow, prestataires",description:"Yorix est une marketplace camerounaise : achat en ligne, vendre en ligne, livreur & livraison Douala, Yaoundé, Bafoussam, escrow MTN MoMo & Orange Money, prestataires vérifiés.",canonicalPath:"/",keywords:"marketplace Cameroun, achat en ligne Cameroun, vendre en ligne Cameroun, livraison Cameroun, livreur Cameroun, escrow Cameroun, prestataires Cameroun, Douala, Yaoundé, Bafoussam",jsonLd:[f,j]};if(i==="productDetail"&&Ne){const R=Ne,U=R.image&&String(R.image).startsWith("http")?R.image:Array.isArray(R.image_urls)&&R.image_urls[0]?R.image_urls[0]:`${J}/og-image.svg`,pe=R.description_fr&&String(R.description_fr).slice(0,158)||`Acheter ${R.name_fr||"ce produit"} sur Yorix — marketplace & livraison Cameroun.`,ke={"@context":"https://schema.org","@type":"Product",name:R.name_fr||"Produit Yorix",image:U,description:pe,brand:{"@type":"Brand",name:"Yorix CM"},offers:{"@type":"Offer",url:`${J}${n}`,priceCurrency:"XAF",price:R.prix,availability:"https://schema.org/InStock"}},mr=u([{name:"Accueil",path:"/"},{name:"Produits",path:"/produits"},{name:R.name_fr||"Produit",path:n}]);return{title:`${R.name_fr||"Produit"} — achat en ligne Cameroun | Yorix.cm`,description:pe,canonicalPath:n,ogType:"product",ogImage:U.startsWith("http")?U:`${J}/og-image.svg`,jsonLd:[ke,mr,f]}}if(i==="notifications")return{title:"Notifications — alertes commandes & messages | Yorix.cm",description:"Historique de vos alertes Yorix : commandes, paiements, livraisons, prestations et messages.",canonicalPath:"/notifications",noindex:!0,jsonLd:[f]};if(i==="faq")return{title:"FAQ Yorix — marketplace, livraison, escrow Cameroun",description:"Réponses sur l’achat en ligne, la livraison, les prestataires, MTN MoMo, Orange Money et l’escrow sur Yorix.cm.",canonicalPath:"/faq",jsonLd:[{"@context":"https://schema.org","@type":"FAQPage",mainEntity:[{"@type":"Question",name:"Comment acheter sur Yorix au Cameroun ?",acceptedAnswer:{"@type":"Answer",text:"Parcourez les produits, ajoutez au panier et finalisez via WhatsApp ou paiement mobile (MTN MoMo, Orange Money)."}},{"@type":"Question",name:"La livraison couvre quelles villes ?",acceptedAnswer:{"@type":"Answer",text:"Douala, Yaoundé, Bafoussam, Bamenda, Kribi et un réseau national en expansion. Délais J+1 sur les grandes villes."}},{"@type":"Question",name:"Comment fonctionne l’escrow Yorix ?",acceptedAnswer:{"@type":"Answer",text:"Les fonds sont sécurisés jusqu’à confirmation de réception par l’acheteur, puis libérés au vendeur."}}]},f]};if(i==="seoCity"&&t.citySlug&&$[t.citySlug]){const R=$[t.citySlug].name,U={hub:{title:`Yorix ${R} — marketplace, livraison & prestataires | Cameroun`,desc:`Marketplace à ${R} : acheter en ligne, livraison, services et escrow. MTN MoMo, Orange Money — Yorix.cm.`},acheter:{title:`Acheter en ligne à ${R} — marketplace Yorix Cameroun`,desc:`Achat en ligne à ${R} : produits vérifiés, paiement mobile, livraison. La marketplace camerounaise Yorix.`},livraison:{title:`Livraison à ${R} — livreur & colis | Yorix Ride Cameroun`,desc:`Service de livraison rapide à ${R} et partout au Cameroun. Suivi, tarifs clairs — Yorix Ride.`},prestataires:{title:`Prestataires à ${R} — services à domicile | Yorix.cm`,desc:`Trouvez des prestataires vérifiés à ${R} : plomberie, électricité, ménage, beauté, informatique…`}},pe=U[t.cityMode]||U.hub,ke={"@context":"https://schema.org","@type":"LocalBusiness",name:`Yorix — ${R}`,url:`${J}${n}`,address:{"@type":"PostalAddress",addressLocality:R,addressCountry:"CM"},areaServed:{"@type":"City",name:R},parentOrganization:{"@type":"Organization",name:"Yorix CM"}},mr=u([{name:"Accueil",path:"/"},{name:R,path:n}]);return{title:pe.title,description:pe.desc,canonicalPath:n,jsonLd:[ke,mr,f]}}const D={produits:"Produits — marketplace en ligne Cameroun | Yorix.cm",livraison:"Livraison Cameroun — livreurs Yorix Ride | Douala, Yaoundé",escrow:"Escrow Cameroun — paiement sécurisé marketplace | Yorix.cm",prestataires:"Prestataires Cameroun — services à domicile vérifiés | Yorix.cm",business:"Yorix Business — solutions B2B marketplace Cameroun",blog:"Blog Yorix — actualités marketplace Cameroun",academy:"Yorix Academy — formations e-commerce Cameroun",loyalty:"Fidélité Yorix — points & récompenses",contact:"Contact Yorix — support marketplace Cameroun",aide:"Centre d'aide Yorix — marketplace & livraison Cameroun",faq:"FAQ Yorix — achat, livraison, escrow, vendeurs | Cameroun",cgv:"CGV Yorix.cm — conditions générales de vente",confidentialite:"Politique de confidentialité — Yorix.cm",mentions:"Mentions légales — Yorix.cm",devenirVendeur:"Devenir vendeur sur Yorix — marketplace Cameroun",devenirLivreur:"Devenir livreur Yorix Ride — livraison Cameroun",inscription:"Devenir prestataire Yorix — services Cameroun"},Y={produits:"Produits",livraison:"Livraison",escrow:"Escrow & sécurité",prestataires:"Prestataires",business:"Business",blog:"Blog",academy:"Academy",loyalty:"Fidélité",contact:"Contact",aide:"Centre d'aide",faq:"FAQ",cgv:"CGV",confidentialite:"Confidentialité",mentions:"Mentions légales",devenirVendeur:"Devenir vendeur",devenirLivreur:"Devenir livreur",inscription:"Devenir prestataire",bonsPlans:"Bons plans"},G=D[i];if(G){const R=Y[i],U=R?u([{name:"Accueil",path:"/"},{name:R,path:Qe[i]||n}]):null;return{title:G,description:"Yorix.cm — marketplace & super-app pour acheter, vendre, se faire livrer et trouver des prestataires au Cameroun. MTN MoMo, Orange Money, escrow.",canonicalPath:Qe[i]||n,jsonLd:[U,f].filter(Boolean)}}return{title:"Yorix CM — Marketplace #1 au Cameroun",description:"Marketplace camerounaise : produits, livraison, prestataires, escrow MTN MoMo & Orange Money.",canonicalPath:n,jsonLd:[f]}},[i,t.canonicalPath,t.citySlug,t.cityMode,o.pathname,Ne]);return k?e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",fontFamily:"'DM Sans',sans-serif",color:"#1a6b3a",gap:12},children:[e.jsx("div",{style:{width:40,height:40,border:"4px solid #e2ddd6",borderTopColor:"#1a6b3a",borderRadius:"50%",animation:"spin .7s linear infinite"}}),"Chargement de Yorix...",e.jsx("style",{children:"@keyframes spin{to{transform:rotate(360deg);}}"})]}):e.jsxs(e.Fragment,{children:[e.jsx("style",{children:_a(a)}),e.jsx(sa,{title:ce.title,description:ce.description,canonicalPath:ce.canonicalPath,keywords:ce.keywords,ogType:ce.ogType||"website",jsonLd:ce.jsonLd,noindex:ce.noindex}),e.jsx(vn,{open:go,onClose:()=>{lr(!1),H(!1),I("Vous devez accepter le contrat pour finaliser votre inscription.")},onAccepted:Ro,user:s,userData:d,role:w,authForm:T}),e.jsx(yn,{open:mo,onClose:Eo,onSelectAction:_o,user:s}),po&&e.jsx(Ea,{user:s,userData:d,onClose:()=>sr(!1),onSuccess:n=>{console.log("Livraison créée avec code:",n)}}),S&&e.jsx("div",{className:"modal-overlay",onClick:n=>n.target===n.currentTarget&&v(!1),children:e.jsxs("div",{className:"modal",style:{width:"100%",maxWidth:480,margin:"0 auto"},children:[e.jsx("button",{className:"modal-close",onClick:()=>v(!1),children:"✕"}),e.jsx("div",{className:"modal-title",children:g==="login"?"Bon retour ! 👋":"Rejoindre Yorix 🇨🇲"}),e.jsx("p",{className:"modal-sub",children:"Votre marketplace camerounaise de confiance"}),e.jsxs("div",{className:"auth-tabs",children:[e.jsx("button",{className:`auth-tab${g==="login"?" active":""}`,onClick:()=>{h("login"),I("")},children:"🔑 Connexion"}),e.jsx("button",{className:`auth-tab${g==="register"?" active":""}`,onClick:()=>{h("register"),I("")},children:"🚀 Inscription"})]}),E&&e.jsxs("div",{className:"error-msg",children:["⚠️ ",E]}),g==="register"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{background:"var(--green-pale)",border:"1px solid var(--green-light)",borderRadius:9,padding:"10px 12px",marginBottom:12,fontSize:".78rem",color:"var(--green)",fontWeight:600},children:"👇 Choisissez votre profil pour commencer"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14},children:[{id:"buyer",icon:"🛍️",label:"Acheteur",desc:"J'achète des produits"},{id:"seller",icon:"🏪",label:"Vendeur",desc:"Je vends mes produits"},{id:"delivery",icon:"🚚",label:"Livreur",desc:"J'effectue des livraisons"},{id:"provider",icon:"👷",label:"Prestataire",desc:"Je propose des services"}].map(n=>e.jsxs("div",{onClick:()=>M(n.id),style:{border:`2px solid ${w===n.id?"var(--green)":"var(--border)"}`,borderRadius:10,padding:"12px 10px",cursor:"pointer",background:w===n.id?"var(--green-pale)":"var(--surface)",textAlign:"center",transition:"all .2s"},children:[e.jsx("div",{style:{fontSize:"1.8rem",marginBottom:4},children:n.icon}),e.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem",color:"var(--ink)"},children:n.label}),e.jsx("div",{style:{fontSize:".67rem",color:"var(--gray)",marginTop:2},children:n.desc}),w===n.id&&e.jsx("div",{style:{marginTop:5,fontSize:".62rem",fontWeight:700,color:"var(--green)"},children:"✅ Sélectionné"})]},n.id))}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Nom complet ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:"form-input",placeholder:"Ex: Amina Bello",value:T.nom,onChange:n=>q(f=>({...f,nom:n.target.value}))})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Téléphone ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:"form-input",type:"tel",placeholder:"+237 6XX XXX XXX",value:T.tel,onChange:n=>q(f=>({...f,tel:n.target.value}))})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Email ",e.jsx("span",{children:"*"})]}),e.jsx("input",{className:"form-input",type:"email",placeholder:"votre@email.com",value:T.email,onChange:n=>q(f=>({...f,email:n.target.value}))})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Mot de passe ",e.jsx("span",{children:"*"})]}),e.jsx(kn,{value:T.password,onChange:n=>q(f=>({...f,password:n})),placeholder:g==="login"?"Entrez votre mot de passe":"Choisissez un mot de passe",autoComplete:g==="login"?"current-password":"new-password",showStrength:g==="register",showRules:g==="register",ariaLabel:"Mot de passe",id:"auth-password"}),g==="login"&&e.jsx("div",{style:{fontSize:".7rem",color:"var(--gray)",marginTop:5,display:"flex",alignItems:"center",gap:4},children:"💡 Cliquez sur l'œil pour afficher ou masquer votre mot de passe"})]}),e.jsx("button",{className:"form-submit",onClick:g==="login"?Ao:Hr,disabled:se,style:{fontSize:".9rem",padding:"13px"},children:se?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"spinner",style:{width:16,height:16,borderWidth:2}}),"Chargement..."]}):g==="login"?"🔑 Se connecter":`🚀 Créer mon compte ${w==="buyer"?"Acheteur":w==="seller"?"Vendeur":w==="delivery"?"Livreur":"Prestataire"}`}),g==="register"&&e.jsx("p",{style:{fontSize:".68rem",color:"var(--gray)",textAlign:"center",marginTop:8},children:"En vous inscrivant, vous acceptez nos conditions d'utilisation"}),e.jsx("div",{className:"divider",children:"ou"}),e.jsxs("button",{className:"social-btn",onClick:No,children:[e.jsx("span",{children:"🇬"})," Continuer avec Google"]})]})}),e.jsxs("div",{className:`header-sticky-stack${eo?" header-sticky-stack--compact":""}`,children:[e.jsxs("div",{className:"topbar",children:[e.jsxs("div",{className:"topbar-l",children:[e.jsxs("div",{className:"flag-wrap",children:[e.jsxs("span",{className:"flag",children:[e.jsx("span",{className:"fg"}),e.jsx("span",{className:"fr"}),e.jsx("span",{className:"fy"})]}),e.jsx("span",{children:"Cameroun 🇨🇲"})]}),e.jsx("span",{children:"FR / EN"}),e.jsx("span",{children:"📞 +237 696 56 56 54"})]}),e.jsxs("div",{className:"topbar-r",children:[e.jsx("span",{onClick:()=>z("aide"),children:"🆘 Aide"}),e.jsx("span",{onClick:()=>z("contact"),children:"📞 Contact"}),s?e.jsxs("span",{style:{color:"#b7e4c7"},children:["👤 ",(d==null?void 0:d.nom)||((ot=s.email)==null?void 0:ot.split("@")[0])]}):e.jsx("span",{onClick:()=>{h("login"),v(!0)},children:"🔑 Se connecter"})]})]}),e.jsxs("nav",{className:"navbar",children:[e.jsx("div",{className:"logo-wrap",onClick:()=>z("home"),children:e.jsxs("div",{className:"logo-txt",children:["Yo",e.jsx("span",{children:"rix"}),e.jsx("sup",{children:"CM"})]})}),e.jsx("div",{className:"nav-search-wrap",children:e.jsxs("div",{className:"nav-search",children:[e.jsxs("select",{value:ie,onChange:n=>ae(n.target.value),"aria-label":"Filtrer par catégorie",children:[e.jsx("option",{value:"",children:"Tout"}),kt.map(n=>e.jsx("option",{children:n},n))]}),e.jsx("input",{placeholder:"Produit, marque, mot-clé…",value:L,onChange:n=>xe(n.target.value),onKeyDown:n=>n.key==="Enter"&&z("produits"),autoComplete:"off","aria-label":"Rechercher dans le catalogue","aria-expanded":L.trim().length>=2,"aria-haspopup":"listbox"}),L.trim().length>=2&&e.jsxs("div",{className:"nav-search-dd",role:"listbox","aria-label":"Suggestions catalogue",children:[W.filter(n=>(n.name_fr||"").toLowerCase().includes(L.toLowerCase())||(n.description_fr||"").toLowerCase().includes(L.toLowerCase())).slice(0,8).map(n=>{var f;return e.jsxs("button",{type:"button",className:"nav-search-dd-item",role:"option",onClick:()=>{xe(""),z("produits")},children:[n.image?e.jsx("img",{src:n.image,className:"nav-search-dd-img",alt:"",onError:u=>{u.currentTarget.style.visibility="hidden"}}):e.jsx("span",{className:"nav-search-dd-img nav-search-dd-ph","aria-hidden":!0,children:"📦"}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("div",{className:"nav-search-dd-t",children:n.name_fr}),e.jsxs("div",{className:"nav-search-dd-p",children:[(f=n.prix)==null?void 0:f.toLocaleString()," FCFA"]})]})]},n.id)}),W.filter(n=>(n.name_fr||"").toLowerCase().includes(L.toLowerCase())).length===0&&e.jsxs("div",{className:"nav-search-dd-empty",children:["Aucun résultat pour « ",L," » — touche Entrée pour ouvrir le catalogue filtré."]})]}),e.jsx("button",{type:"button",onClick:()=>z("produits"),"aria-label":"Lancer la recherche catalogue",children:"🔍"})]})}),e.jsxs("div",{className:"nav-actions",children:[e.jsx("button",{type:"button",className:"nav-cta-onboard",onClick:()=>Ae(!0),title:"Que cherchez-vous ?",children:"🚀 Démarrer"}),e.jsx("button",{className:"dark-toggle",onClick:()=>c(n=>!n),title:a?"Mode clair":"Mode sombre",children:a?"☀️":"🌙"}),s&&e.jsxs("button",{className:"icon-btn",onClick:()=>_e(n=>!n),title:"Notifications",children:["🔔",Ue>0&&e.jsx("span",{className:"ibadge",children:Ue})]}),e.jsxs("button",{className:"icon-btn",onClick:()=>z("cart"),title:"Mon panier",children:["🛒",gr>0&&e.jsx("span",{className:"ibadge",children:gr})]}),s?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:`role-chip ${tt()}`,children:jt[x||"buyer"]}),e.jsx("div",{className:"user-av",onClick:()=>z("dashboard"),title:"Mon espace",children:((d==null?void 0:d.nom)||s.email||"?")[0].toUpperCase()}),e.jsx("button",{className:"btn-red",onClick:Xr,title:"Déconnexion",children:"🚪 Déconnexion"})]}):e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"btn-ghost",onClick:()=>{h("login"),v(!0)},children:"🔑 Connexion"}),e.jsx("button",{className:"btn-green",onClick:()=>{h("register"),M("buyer"),v(!0)},children:"🚀 S'inscrire"})]})]})]}),e.jsxs("div",{className:"nav-tabs-row",ref:tr,children:[e.jsx("nav",{className:"nav-tabs","aria-label":"Rubriques Yorix",children:Fo.map(n=>e.jsx("div",{className:`tab${et(n.p)?" active":""}`,onClick:()=>{ne(!1),z(n.p)},role:"presentation",children:n.l},n.p))}),e.jsxs("div",{className:"nav-quick-wrap",children:[e.jsx("button",{type:"button",className:"nav-quick-btn","aria-expanded":Oe,onClick:()=>ne(n=>!n),children:"☰ Navigation"}),Oe&&e.jsx("div",{className:"nav-quick-panel",role:"dialog","aria-label":"Navigation Yorix",children:e.jsxs("div",{className:"nav-quick-mega-cols",children:[e.jsxs("div",{className:"nav-quick-section",children:[e.jsx("h4",{children:"Marketplace"}),e.jsx("div",{className:"nav-quick-links",children:[{ic:"🏠",l:"Accueil",p:"home"},{ic:"🛍️",l:"Produits & catalogue",p:"produits"},{ic:"🛒",l:"Panier · paiement sécurisé",p:"cart"},{ic:"🏷️",l:"Bons plans du moment",p:"bonsPlans"},{ic:"🚚",l:"Livraison & suivi",p:"livraison"}].map(n=>e.jsxs("button",{type:"button",onClick:()=>{ne(!1),z(n.p)},children:[e.jsx("span",{className:"nav-quick-ico",children:n.ic}),e.jsx("span",{children:n.l})]},n.l))})]}),e.jsxs("div",{className:"nav-quick-section",children:[e.jsx("h4",{children:"Confiance & croissance"}),e.jsx("div",{className:"nav-quick-links",children:[{ic:"🔐",l:"Escrow acheteur",p:"escrow"},{ic:"🧑‍🔧",l:"Prestataires vérifiés",p:"prestataires"},{ic:"💼",l:"Yorix Business",p:"business"},{ic:"🎓",l:"Academy",p:"academy"},{ic:"📰",l:"Blog & tendances CM",p:"blog"},{ic:"⭐",l:"Programme fidélité",p:"loyalty"}].map(n=>e.jsxs("button",{type:"button",onClick:()=>{ne(!1),z(n.p)},children:[e.jsx("span",{className:"nav-quick-ico",children:n.ic}),e.jsx("span",{children:n.l})]},n.l))})]}),e.jsxs("div",{className:"nav-quick-section",children:[e.jsx("h4",{children:"Support Yorix"}),e.jsxs("div",{className:"nav-quick-links",children:[e.jsxs("button",{type:"button",onClick:()=>{ne(!1),z("contact")},children:[e.jsx("span",{className:"nav-quick-ico",children:"📞"}),e.jsx("span",{children:"Contact relation client"})]}),e.jsxs("button",{type:"button",onClick:()=>{ne(!1),z("aide")},children:[e.jsx("span",{className:"nav-quick-ico",children:"🆘"}),e.jsx("span",{children:"SOS · centre d'aide"})]}),e.jsxs("button",{type:"button",onClick:()=>{ne(!1),z("faq")},children:[e.jsx("span",{className:"nav-quick-ico",children:"❓"}),e.jsx("span",{children:"FAQ marketplace"})]})]})]})]})})]})]}),e.jsxs("div",{className:"pay-strip",children:[e.jsx("b",{style:{color:"var(--ink)"},children:"Paiement :"}),e.jsxs("div",{className:"pay-methods",children:[e.jsx("span",{className:"pm mtn-b",children:"📱 MTN MoMo"}),e.jsx("span",{className:"pm ora-b",children:"🔶 Orange Money"}),e.jsx("span",{className:"pm",children:"💳 Carte"}),e.jsx("span",{className:"pm",children:"💵 Cash"})]}),e.jsxs("div",{className:"strip-right",children:[e.jsx("span",{children:"🚚 J+1 Douala & Yaoundé"}),e.jsxs("span",{role:"link",tabIndex:0,onClick:()=>z("bonsPlans"),onKeyDown:n=>n.key==="Enter"&&z("bonsPlans"),style:{cursor:"pointer",fontWeight:700,color:"var(--green)",textDecoration:"underline"},children:["Livraison offerte dès ",he.freeShippingThresholdXaf.toLocaleString("fr-FR")," FCFA"]}),e.jsx("span",{children:"🔐 Escrow sécurisé"}),s&&e.jsxs("span",{style:{color:"var(--gold)"},children:["👤 ",(d==null?void 0:d.nom)||s.email]})]})]})]}),Zt&&s&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"notif-backdrop",role:"presentation",onClick:()=>_e(!1)}),e.jsx("div",{className:"notif-drawer notif-drawer--premium",children:e.jsx(bn,{variant:"dropdown",user:s,notifs:Ee,goPage:z,onMarkRead:Gr,onMarkAllRead:Kr,onDismiss:Jr,onClose:()=>_e(!1),onPrefsUpdated:Le})})]}),i==="home"&&e.jsx(l.Suspense,{fallback:e.jsx(B,{minHeight:280,label:"Chargement de l'accueil..."}),children:e.jsx(Ra,{filterCat:ie,setFilterCat:ae,search:L,setSearch:xe,produitsLoading:C,produits:W,user:s,userData:d,wishlist:De,addToCart:Fe,toggleWish:fr,openProductUrl:rt,setOnboardingOpen:Ae,goPage:z,allServices:F,nlEmail:Te,setNlEmail:ir,nlSent:ar,setNlSent:nr,freeShippingThresholdXaf:he.freeShippingThresholdXaf})}),Qr&&i==="livraison"&&t.citySlug&&$[t.citySlug]&&e.jsx(wt,{city:$[t.citySlug],mode:"livraison",goPage:z}),Qr&&i==="seoCity"&&t.citySlug&&$[t.citySlug]&&e.jsx(wt,{city:$[t.citySlug],mode:t.cityMode||"hub",goPage:z}),i==="productDetail"&&e.jsx("div",{className:"anim",children:bo?e.jsxs("div",{className:"loading",style:{minHeight:320,justifyContent:"center"},children:[e.jsx("div",{className:"spinner"})," Chargement du produit..."]}):Ne?e.jsx(l.Suspense,{fallback:e.jsx(B,{minHeight:320,label:"Chargement du produit..."}),children:e.jsx(La,{product:Ne,user:s,userData:d,onClose:()=>z("produits"),onAddToCart:Fe})}):e.jsx("section",{className:"sec anim",children:e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:"🔍"}),e.jsx("p",{children:"Produit introuvable."}),e.jsx("button",{className:"form-submit",style:{width:"auto",marginTop:16},type:"button",onClick:()=>z("produits"),children:"← Retour aux produits"})]})})}),Bo&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement catalogue..."}),children:e.jsx(Ma,{showProduits:Zr,page:i,seoCityName:de,produitsFiltres:Oo,produitsLoading:C,produits:W,filterCat:ie,setFilterCat:ae,search:L,user:s,userData:d,wishlist:De,addToCart:Fe,toggleWish:fr,openProductUrl:rt,dark:a,goPage:z})}),Do&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement livraison..."}),children:e.jsx(Pa,{route:t,user:s,userData:d,setDemandeLivraisonOpen:sr,setAuthTab:h,setSelectedRole:M,setAuthOpen:v})}),qo&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement prestataires..."}),children:e.jsx(Oa,{user:s,userData:d,allServices:F,goPage:z,setSelectedPrest:ye,selectedPrest:co,onOpenPrestDetail:n=>z("prestDetail",{prestSlug:mt(n.name,n.id)}),onClosePrestDetail:()=>{t.metierSlug&&t.villeSlug?z("prestataires",{metierSlug:t.metierSlug,villeSlug:t.villeSlug}):i==="seoCity"&&t.cityMode==="prestataires"&&t.citySlug?z("seoCity",{citySlug:t.citySlug,mode:"prestataires"}):z("prestataires")},syncFilters:To,onAddServiceToCart:Mo})}),i==="cart"&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement panier..."}),children:e.jsx(qa,{cartItems:ue,cartSummary:pr,changeQty:Po,removeItem:Io,goPage:z,addToCart:Fe,produits:W,wishlist:De,toggleWish:fr})}),i==="checkout"&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement checkout..."}),children:e.jsx(Da,{user:s,userData:d,cartItems:ue,summary:pr,setCartItems:Ce,goPage:z,fallbackWhatsappNumber:xa,momoNumber:fa,orangeNumber:ma,persistCheckoutContact:Lo})}),i==="notifications"&&!s&&e.jsxs("section",{className:"sec anim",style:{maxWidth:480,margin:"0 auto",textAlign:"center",padding:"48px 20px"},children:[e.jsx("h1",{className:"sec-title",style:{fontSize:"1.25rem"},children:"Vos notifications Yorix"}),e.jsx("p",{style:{color:"var(--gray)",marginBottom:22,fontSize:".9rem",lineHeight:1.55},children:"Connectez-vous pour suivre les messages, commandes, paiements et livraisons en temps réel."}),e.jsx("button",{type:"button",className:"form-submit",style:{width:"auto",padding:"12px 28px"},onClick:()=>{h("login"),v(!0)},children:"Se connecter"})]}),i==="notifications"&&s&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement notifications..."}),children:e.jsx(Xa,{user:s,notifs:Ee,goPage:z,onMarkRead:Gr,onMarkAllRead:Kr,onDismiss:Jr,refreshNotificationsFull:()=>qr(s.id,120),onPrefsUpdated:Le})}),Yo&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement page..."}),children:e.jsx(Ia,{page:i,goPage:z,setAuthOpen:v,setAuthTab:h,setSelectedRole:M,inscriptionSent:vo,setInscriptionSent:Wr,inscriptionForm:_,setInscriptionForm:jo,inscriptionError:ko,inscriptionLoading:wo,submitInscriptionPrestataire:So,academyCourses:qe,academyLoading:uo,goAcademyDetail:ho,blogFilter:so,setBlogFilter:lo,nlEmail:Te,setNlEmail:ir,nlSent:ar,setNlSent:nr})}),i==="academyDetail"&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement formation..."}),children:e.jsx(Ba,{course:Ur,goPage:z,goContact:yo})}),i==="academyContact"&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement formulaire..."}),children:e.jsx(Ya,{course:Ur,user:s,userData:d,goPage:z})}),i==="bonsPlans"&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement bons plans..."}),children:e.jsx(Ga,{goPage:z,freeShippingThresholdXaf:he.freeShippingThresholdXaf})}),i==="loyalty"&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement fidélité..."}),children:e.jsx($a,{user:s,userData:d,goPage:z,setAuthOpen:v,setAuthTab:h})}),i==="dashboard"&&(s?e.jsxs("div",{className:"dash-layout anim",children:[e.jsxs("div",{className:"dash-sidebar",children:[e.jsx("div",{className:"dash-avatar",children:((it=d==null?void 0:d.nom)==null?void 0:it[0])||"U"}),e.jsx("div",{className:"dash-name",title:(d==null?void 0:d.nom)||s.email,children:(d==null?void 0:d.nom)||((at=s.email)==null?void 0:at.split("@")[0])||"Utilisateur"}),e.jsx("div",{className:"dash-role-badge",children:e.jsx("span",{className:`role-chip ${tt()}`,children:jt[x||"buyer"]})}),e.jsxs("div",{className:"dash-nav",children:[$o().map(n=>e.jsxs("div",{className:`dash-nav-item${X===n.id?" active":""}`,onClick:()=>le(n.id),children:[n.icon," ",n.label]},n.id)),e.jsx("div",{className:"dash-nav-divider"}),e.jsx("div",{className:`dash-nav-item${X==="messages"?" active":""}`,onClick:()=>le("messages"),children:"💬 Messages"}),e.jsx("div",{className:"dash-nav-item",onClick:Xr,style:{color:"var(--red)"},children:"🚪 Déconnexion"})]})]}),e.jsxs("div",{className:"dash-content",children:[X==="messages"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"dash-page-title",children:"💬 Messagerie Yorix"}),e.jsx("div",{className:"info-msg",children:"🔐 Messagerie sécurisée entre acheteurs et vendeurs. Tes discussions sont privées et protégées."}),e.jsx(Ta,{user:s,userData:d})]}),X!=="messages"&&x==="seller"&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement espace vendeur..."}),children:e.jsx(Fa,{user:s,userData:d,dashTab:X,setDashTab:le})}),X!=="messages"&&x==="delivery"&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement espace livreur..."}),children:e.jsx(Wa,{user:s,userData:d,dashTab:X,setDashTab:le})}),X!=="messages"&&x==="provider"&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement espace prestataire..."}),children:e.jsx(Va,{user:s,userData:d,dashTab:X,setDashTab:le})}),X!=="messages"&&(x==="buyer"||!x)&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement tableau de bord..."}),children:e.jsx(Ua,{user:s,userData:d,wishlist:De,totalQty:gr,loyaltyPts:ao,setLoyaltyPts:no,dashTab:X,goPage:z})})]})]}):e.jsxs("div",{className:"empty-state anim",style:{padding:"60px 0"},children:[e.jsx("div",{className:"empty-icon",children:"🔐"}),e.jsx("p",{children:"Connectez-vous pour accéder à votre espace"}),e.jsx("button",{className:"form-submit",style:{width:"auto",padding:"11px 28px",marginTop:16},onClick:()=>v(!0),children:"Se connecter"})]})),i!=="home"&&e.jsxs("div",{className:"newsletter",children:[e.jsx("div",{className:"nl-title",children:"📬 Restez informé(e)"}),e.jsx("p",{className:"nl-sub",children:"Les meilleures offres Yorix dans votre boîte mail."}),ar?e.jsx("div",{style:{background:"rgba(255,255,255,.2)",borderRadius:8,padding:"9px 18px",color:"#fff",fontWeight:600},children:"✅ Abonné(e) !"}):e.jsxs("div",{className:"nl-form",children:[e.jsx("input",{className:"nl-input",placeholder:"Votre email...",value:Te,onChange:n=>ir(n.target.value)}),e.jsx("button",{className:"nl-btn",onClick:async()=>{Te&&(await N.from("newsletter").insert({email:Te}).catch(n=>console.warn(n==null?void 0:n.message)),nr(!0))},children:"S'abonner 🚀"})]})]}),e.jsxs("div",{className:"yorix-fab-stack","aria-live":"polite",children:[s&&((d==null?void 0:d.role)==="admin"||(d==null?void 0:d.role)==="superadmin")&&i!=="admin"&&e.jsx("button",{type:"button",className:"admin-quick-pill",onClick:()=>z("admin"),title:"Ouvrir l’administration",children:"⚙️ Admin Yorix"}),e.jsxs("div",{className:"wa-float",children:[or&&e.jsxs("div",{className:"wa-card",children:[e.jsx("div",{className:"wa-card-title",children:"💬 Contacter Yorix"}),e.jsx("div",{className:"wa-card-sub",children:"Support 7j/7 · Réponse rapide"}),e.jsx("a",{href:`https://wa.me/${Ge}?text=${encodeURIComponent("Bonjour Yorix ! J'ai besoin d'aide.")}`,target:"_blank",rel:"noreferrer",className:"wa-link wa-link-green",children:"📱 WhatsApp +237 696 56 56 54"}),e.jsx("a",{href:"tel:+237696565654",className:"wa-link wa-link-ghost",children:"📞 Appeler"}),e.jsx("a",{href:"mailto:support@yorix.cm",className:"wa-link wa-link-ghost",children:"✉️ support@yorix.cm"})]}),e.jsxs("div",{style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsx("div",{className:"wa-pulse"}),e.jsx("button",{type:"button",className:"wa-btn","aria-expanded":or,onClick:()=>oo(n=>!n),children:or?"✕":"💬"})]})]})]}),e.jsxs("div",{className:"mobile-nav",children:[e.jsx("div",{className:"mn-inner",children:[{icon:"🏠",label:"Accueil",p:"home"},{icon:"🛍️",label:"Produits",p:"produits"},{icon:"🚚",label:"Livraison",p:"livraison"},{icon:"📊",label:"Mon espace",p:"dashboard"},{icon:"💬",label:"WhatsApp",p:"wa"}].map(n=>e.jsxs("div",{className:`mn-item${et(n.p)?" active":""}`,onClick:()=>{n.p==="wa"?window.open(`https://wa.me/${Ge}?text=${encodeURIComponent("Bonjour Yorix ! J'ai besoin d'aide.")}`,"_blank"):n.p==="dashboard"&&!s?(h("register"),v(!0)):z(n.p)},children:[e.jsx("div",{className:"mn-icon",children:n.icon}),e.jsx("div",{className:"mn-label",children:n.label}),n.p==="dashboard"&&!s&&e.jsx("div",{style:{position:"absolute",top:0,right:2,background:"var(--green)",color:"#fff",fontSize:".45rem",fontWeight:700,padding:"1px 3px",borderRadius:3},children:"S'inscrire"}),n.p==="dashboard"&&Ue>0&&s&&e.jsx("div",{className:"mn-badge",children:Ue})]},n.label))}),!s&&e.jsxs("div",{style:{borderTop:"1px solid var(--border)",padding:"8px 16px",display:"flex",gap:8},children:[e.jsx("button",{onClick:()=>{h("login"),v(!0)},style:{flex:1,padding:"9px",borderRadius:8,border:"1.5px solid var(--border)",background:"var(--surface)",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".78rem",cursor:"pointer",color:"var(--ink)"},children:"🔑 Connexion"}),e.jsx("button",{onClick:()=>{h("register"),M("buyer"),v(!0)},style:{flex:2,padding:"9px",borderRadius:8,border:"none",background:"var(--green)",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem",cursor:"pointer",color:"#fff"},children:"🚀 S'inscrire gratuitement"})]})]}),i==="admin"&&e.jsx(l.Suspense,{fallback:e.jsx(B,{label:"Chargement admin..."}),children:e.jsx(Ha,{user:s,userData:d,goPage:z})}),e.jsx(hn,{goPage:z,freeShippingThresholdXaf:he.freeShippingThresholdXaf})]})}jr.createRoot(document.getElementById("root")).render(e.jsx(oe.StrictMode,{children:e.jsx(Ci,{children:e.jsx(Wt,{children:e.jsx(jn,{})})})}));export{In as B,kt as C,Mn as D,Pn as E,fa as M,bn as N,ma as O,ha as P,Ln as R,Lt as S,Ge as Y,O as _,ba as a,$ as b,Ta as c,Rt as d,Qe as e,On as f,Dn as g,xa as h,qn as i,e as j,Sa as k,jt as l,Je as o,Bn as p,N as s,ui as u};
