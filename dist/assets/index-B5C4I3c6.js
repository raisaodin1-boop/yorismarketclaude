const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/HomePage-BlNChdsL.js","assets/react-CDaM45aE.js","assets/ProdGrid-BozDb498.js","assets/OptimizedImage-CHo4rPlF.js","assets/ModalCommander-C4cQHBOf.js","assets/checkoutApi-trcdFKfa.js","assets/supabase-D2gm834s.js","assets/ProductRouteSections-C6pAf5PK.js","assets/LivraisonPage-C7oKiiaw.js","assets/SiteMarketingPages-BwViIUNy.js","assets/LivraisonLazyBlocks-3PG2emD2.js","assets/FicheProduit-CheIJdRB.js","assets/PrestPage-CgVhUGOm.js","assets/CheckoutPage-DWPNu13H.js","assets/FreeShippingProgress-A2YlDR2x.js","assets/CartPage-BFvbyqFO.js","assets/AcademyDetail-C3xVCJBS.js","assets/AcademyContactForm-HxOJRF05.js","assets/LoyaltyPage-CBWJnfoR.js","assets/SellerDashboard-CKNSaC5b.js","assets/BuyerDashboard-rd_8a4OC.js","assets/DeliveryDashboard-B1Hm4WoO.js","assets/ProviderDashboard-DAXtxf6z.js","assets/AdminDashboard-BNI4Ol2p.js","assets/NotificationsPage-L7JzUV8E.js","assets/PromotionsPage-CjGOzjcy.js"])))=>i.map(i=>d[i]);
var Go=Object.defineProperty;var Jo=(e,t,o)=>t in e?Go(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var te=(e,t,o)=>Jo(e,typeof t!="symbol"?t+"":t,o);import{r as c,a as Ko,R as Qo,g as Rr,b as oe}from"./react-CDaM45aE.js";import{c as Zo}from"./supabase-D2gm834s.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const d of a)if(d.type==="childList")for(const n of d.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(a){const d={};return a.integrity&&(d.integrity=a.integrity),a.referrerPolicy&&(d.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?d.credentials="include":a.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function i(a){if(a.ep)return;a.ep=!0;const d=o(a);fetch(a.href,d)}})();var Nt={exports:{}},tr={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ei=c,ri=Symbol.for("react.element"),ti=Symbol.for("react.fragment"),oi=Object.prototype.hasOwnProperty,ii=ei.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ai={key:!0,ref:!0,__self:!0,__source:!0};function Rt(e,t,o){var i,a={},d=null,n=null;o!==void 0&&(d=""+o),t.key!==void 0&&(d=""+t.key),t.ref!==void 0&&(n=t.ref);for(i in t)oi.call(t,i)&&!ai.hasOwnProperty(i)&&(a[i]=t[i]);if(e&&e.defaultProps)for(i in t=e.defaultProps,t)a[i]===void 0&&(a[i]=t[i]);return{$$typeof:ri,type:e,key:d,ref:n,props:a,_owner:ii.current}}tr.Fragment=ti;tr.jsx=Rt;tr.jsxs=Rt;Nt.exports=tr;var r=Nt.exports,Cr={},dt=Ko;Cr.createRoot=dt.createRoot,Cr.hydrateRoot=dt.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Oe(){return Oe=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(e[i]=o[i])}return e},Oe.apply(this,arguments)}var ge;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(ge||(ge={}));const ct="popstate";function ni(e){e===void 0&&(e={});function t(i,a){let{pathname:d,search:n,hash:p}=i.location;return _r("",{pathname:d,search:n,hash:p},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function o(i,a){return typeof a=="string"?a:Mt(a)}return di(t,o,null,e)}function re(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function si(e,t){{typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function li(){return Math.random().toString(36).substr(2,8)}function pt(e,t){return{usr:e.state,key:e.key,idx:t}}function _r(e,t,o,i){return o===void 0&&(o=null),Oe({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?or(t):t,{state:o,key:t&&t.key||i||li()})}function Mt(e){let{pathname:t="/",search:o="",hash:i=""}=e;return o&&o!=="?"&&(t+=o.charAt(0)==="?"?o:"?"+o),i&&i!=="#"&&(t+=i.charAt(0)==="#"?i:"#"+i),t}function or(e){let t={};if(e){let o=e.indexOf("#");o>=0&&(t.hash=e.substr(o),e=e.substr(0,o));let i=e.indexOf("?");i>=0&&(t.search=e.substr(i),e=e.substr(0,i)),e&&(t.pathname=e)}return t}function di(e,t,o,i){i===void 0&&(i={});let{window:a=document.defaultView,v5Compat:d=!1}=i,n=a.history,p=ge.Pop,l=null,m=x();m==null&&(m=0,n.replaceState(Oe({},n.state,{idx:m}),""));function x(){return(n.state||{idx:null}).idx}function b(){p=ge.Pop;let g=x(),h=g==null?null:g-m;m=g,l&&l({action:p,location:v.location,delta:h})}function w(g,h){p=ge.Push;let k=_r(v.location,g,h);m=x()+1;let M=pt(k,m),T=v.createHref(k);try{n.pushState(M,"",T)}catch(O){if(O instanceof DOMException&&O.name==="DataCloneError")throw O;a.location.assign(T)}d&&l&&l({action:p,location:v.location,delta:1})}function y(g,h){p=ge.Replace;let k=_r(v.location,g,h);m=x();let M=pt(k,m),T=v.createHref(k);n.replaceState(M,"",T),d&&l&&l({action:p,location:v.location,delta:0})}function j(g){let h=a.location.origin!=="null"?a.location.origin:a.location.href,k=typeof g=="string"?g:Mt(g);return k=k.replace(/ $/,"%20"),re(h,"No window.location.(origin|href) available to create URL for href: "+k),new URL(k,h)}let v={get action(){return p},get location(){return e(a,n)},listen(g){if(l)throw new Error("A history only accepts one active listener");return a.addEventListener(ct,b),l=g,()=>{a.removeEventListener(ct,b),l=null}},createHref(g){return t(a,g)},createURL:j,encodeLocation(g){let h=j(g);return{pathname:h.pathname,search:h.search,hash:h.hash}},push:w,replace:y,go(g){return n.go(g)}};return v}var gt;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(gt||(gt={}));function ci(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let o=t.endsWith("/")?t.length-1:t.length,i=e.charAt(o);return i&&i!=="/"?null:e.slice(o)||"/"}const pi=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,gi=e=>pi.test(e);function fi(e,t){t===void 0&&(t="/");let{pathname:o,search:i="",hash:a=""}=typeof e=="string"?or(e):e,d;if(o)if(gi(o))d=o;else{if(o.includes("//")){let n=o;o=o.replace(/\/\/+/g,"/"),si(!1,"Pathnames cannot have embedded double slashes - normalizing "+(n+" -> "+o))}o.startsWith("/")?d=ft(o.substring(1),"/"):d=ft(o,t)}else d=t;return{pathname:d,search:hi(i),hash:yi(a)}}function ft(e,t){let o=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?o.length>1&&o.pop():a!=="."&&o.push(a)}),o.length>1?o.join("/"):"/"}function hr(e,t,o,i){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(i)+"].  Please separate it out to the ")+("`to."+o+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function mi(e){return e.filter((t,o)=>o===0||t.route.path&&t.route.path.length>0)}function xi(e,t){let o=mi(e);return t?o.map((i,a)=>a===o.length-1?i.pathname:i.pathnameBase):o.map(i=>i.pathnameBase)}function ui(e,t,o,i){i===void 0&&(i=!1);let a;typeof e=="string"?a=or(e):(a=Oe({},e),re(!a.pathname||!a.pathname.includes("?"),hr("?","pathname","search",a)),re(!a.pathname||!a.pathname.includes("#"),hr("#","pathname","hash",a)),re(!a.search||!a.search.includes("#"),hr("#","search","hash",a)));let d=e===""||a.pathname==="",n=d?"/":a.pathname,p;if(n==null)p=o;else{let b=t.length-1;if(!i&&n.startsWith("..")){let w=n.split("/");for(;w[0]==="..";)w.shift(),b-=1;a.pathname=w.join("/")}p=b>=0?t[b]:"/"}let l=fi(a,p),m=n&&n!=="/"&&n.endsWith("/"),x=(d||n===".")&&o.endsWith("/");return!l.pathname.endsWith("/")&&(m||x)&&(l.pathname+="/"),l}const bi=e=>e.join("/").replace(/\/\/+/g,"/"),hi=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,yi=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e,It=["post","put","patch","delete"];new Set(It);const vi=["get",...It];new Set(vi);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ze(){return Ze=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(e[i]=o[i])}return e},Ze.apply(this,arguments)}const Pt=c.createContext(null),Mr=c.createContext(null),Ir=c.createContext(null),Pr=c.createContext({outlet:null,matches:[],isDataRoute:!1});function Lr(){return c.useContext(Ir)!=null}function Lt(){return Lr()||re(!1),c.useContext(Ir).location}function Ot(e){c.useContext(Mr).static||c.useLayoutEffect(e)}function wi(){let{isDataRoute:e}=c.useContext(Pr);return e?Ci():ki()}function ki(){Lr()||re(!1);let e=c.useContext(Pt),{basename:t,future:o,navigator:i}=c.useContext(Mr),{matches:a}=c.useContext(Pr),{pathname:d}=Lt(),n=JSON.stringify(xi(a,o.v7_relativeSplatPath)),p=c.useRef(!1);return Ot(()=>{p.current=!0}),c.useCallback(function(m,x){if(x===void 0&&(x={}),!p.current)return;if(typeof m=="number"){i.go(m);return}let b=ui(m,JSON.parse(n),d,x.relative==="path");e==null&&t!=="/"&&(b.pathname=b.pathname==="/"?t:bi([t,b.pathname])),(x.replace?i.replace:i.push)(b,x.state,x)},[t,i,n,d,e])}var Dt=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(Dt||{}),qt=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(qt||{});function ji(e){let t=c.useContext(Pt);return t||re(!1),t}function Si(e){let t=c.useContext(Pr);return t||re(!1),t}function zi(e){let t=Si(),o=t.matches[t.matches.length-1];return o.route.id||re(!1),o.route.id}function Ci(){let{router:e}=ji(Dt.UseNavigateStable),t=zi(qt.UseNavigateStable),o=c.useRef(!1);return Ot(()=>{o.current=!0}),c.useCallback(function(a,d){d===void 0&&(d={}),o.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,Ze({fromRouteId:t},d)))},[e,t])}function _i(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function Ei(e){let{basename:t="/",children:o=null,location:i,navigationType:a=ge.Pop,navigator:d,static:n=!1,future:p}=e;Lr()&&re(!1);let l=t.replace(/^\/*/,"/"),m=c.useMemo(()=>({basename:l,navigator:d,static:n,future:Ze({v7_relativeSplatPath:!1},p)}),[l,p,d,n]);typeof i=="string"&&(i=or(i));let{pathname:x="/",search:b="",hash:w="",state:y=null,key:j="default"}=i,v=c.useMemo(()=>{let g=ci(x,l);return g==null?null:{location:{pathname:g,search:b,hash:w,state:y,key:j},navigationType:a}},[l,x,b,w,y,j,a]);return v==null?null:c.createElement(Mr.Provider,{value:m},c.createElement(Ir.Provider,{children:o,value:v}))}new Promise(()=>{});/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Ai="6";try{window.__reactRouterVersion=Ai}catch{}const Ti="startTransition",mt=Qo[Ti];function Ni(e){let{basename:t,children:o,future:i,window:a}=e,d=c.useRef();d.current==null&&(d.current=ni({window:a,v5Compat:!0}));let n=d.current,[p,l]=c.useState({action:n.action,location:n.location}),{v7_startTransition:m}=i||{},x=c.useCallback(b=>{m&&mt?mt(()=>l(b)):l(b)},[l,m]);return c.useLayoutEffect(()=>n.listen(x),[n,x]),c.useEffect(()=>_i(i),[i]),c.createElement(Ei,{basename:t,children:o,location:p.location,navigationType:p.action,navigator:n,future:i})}var xt;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(xt||(xt={}));var ut;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(ut||(ut={}));const K="https://www.yorix.cm",Yt=[{slug:"yaounde",name:"Yaoundé",region:"Centre"},{slug:"douala",name:"Douala",region:"Littoral"},{slug:"bafoussam",name:"Bafoussam",region:"Ouest"},{slug:"bamenda",name:"Bamenda",region:"Nord-Ouest"},{slug:"kribi",name:"Kribi",region:"Sud"},{slug:"bertoua",name:"Bertoua",region:"Est"},{slug:"garoua",name:"Garoua",region:"Nord"},{slug:"ngaoundere",name:"Ngaoundéré",region:"Adamaoua"},{slug:"maroua",name:"Maroua",region:"Extrême-Nord"},{slug:"ebolowa",name:"Ebolowa",region:"Sud"}],F=Object.fromEntries(Yt.map(e=>[e.slug,e]));Object.fromEntries(Yt.map(e=>[e.name.toLowerCase(),e.slug]));const $t={plomberie:"Plomberie",electricite:"Électricité",menage:"Nettoyage",beaute:"Beauté",reparation:"Réparation",transport:"Transport",graphisme:"Graphisme",photographie:"Photographie",nettoyage:"Nettoyage",menuiserie:"Menuiserie",informatique:"Informatique",cuisine:"Cuisine",maconnerie:"Maçonnerie",peinture:"Peinture",couture:"Couture"},Ri={"mode-accesoires":"Mode & Accessoires"};function Mi(e){return Bt(e||"")}function Bt(e){return e?(String(e).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ø/g,"o").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"yorix").slice(0,80):"yorix"}function bt(e,t){return`${Bt(e)}--${t}`}function ht(e){if(!e||typeof e!="string")return{base:"",id:""};const t=e.lastIndexOf("--");return t===-1?{base:e,id:""}:{base:e.slice(0,t),id:e.slice(t+2)}}const er={home:"/",produits:"/produits",livraison:"/livraison",escrow:"/escrow",prestataires:"/prestataires",inscription:"/devenir-prestataire",business:"/business",academy:"/academy",blog:"/blog",loyalty:"/fidelite",contact:"/contact",aide:"/aide",faq:"/faq",cgv:"/cgv",mentions:"/mentions-legales",confidentialite:"/politique-confidentialite",dashboard:"/dashboard",admin:"/admin",checkout:"/checkout",cart:"/panier",bonsPlans:"/bons-plans",notifications:"/notifications",devenirVendeur:"/devenir-vendeur",devenirLivreur:"/devenir-livreur"};function yr(e,t={}){if(e==="productDetail"&&t.productSlug)return`/produit/${t.productSlug}`;if(e==="prestDetail"&&t.prestSlug)return`/prestataire/${t.prestSlug}`;if(e==="produits"&&t.categorySlug)return`/categories/${t.categorySlug}`;if(e==="livraison"&&t.citySlug&&F[t.citySlug])return`/livraison/${t.citySlug}`;if(e==="prestataires"&&t.metierSlug&&t.villeSlug)return`/prestataires/${t.metierSlug}/${t.villeSlug}`;if(e==="seoCity"){const{citySlug:o,mode:i="hub"}=t;return!o||!F[o]?"/":i==="acheter"?`/acheter-a-${o}`:i==="livraison"?`/livraison-a-${o}`:i==="prestataires"?`/prestataires-a-${o}`:`/${o}`}return e==="academyDetail"&&t.courseId?`/academy/${t.courseId}`:e==="academyContact"&&t.courseId?`/academy/${t.courseId}/contact`:er[e]??"/"}function Ii(e,t=[]){if(!e)return"";const o=Ri[e];return o&&t.includes(o)?o:t.find(a=>Mi(a)===e)||""}function Pi(e){const t=e.replace(/\/+$/,"")||"/";if(t==="/")return{page:"home",canonicalPath:"/"};const o=t.split("/").filter(Boolean),[i,a,d]=o;if(i==="produit"&&a)return{page:"productDetail",productSlug:a,canonicalPath:t};if(i==="categories"&&a)return{page:"produits",categorySlug:a,canonicalPath:t};if(i==="livraison")return a?F[a]?{page:"livraison",citySlug:a,canonicalPath:t}:{page:"livraison",canonicalPath:"/livraison"}:{page:"livraison",canonicalPath:"/livraison"};if(i==="prestataire"&&a)return{page:"prestDetail",prestSlug:a,canonicalPath:t};if(i==="prestataires"&&a&&d&&$t[a]&&F[d])return{page:"prestataires",metierSlug:a,villeSlug:d,canonicalPath:t};if(i==="prestataires")return{page:"prestataires",canonicalPath:"/prestataires"};if(i==="academy"&&a)return d==="contact"?{page:"academyContact",courseId:a,canonicalPath:t}:{page:"academyDetail",courseId:a,canonicalPath:t};const n=F[i];if(o.length===1&&n)return{page:"seoCity",citySlug:i,cityMode:"hub",canonicalPath:t};if(i!=null&&i.startsWith("acheter-a-")){const l=i.replace(/^acheter-a-/,"");if(F[l])return{page:"seoCity",citySlug:l,cityMode:"acheter",canonicalPath:t}}if(i!=null&&i.startsWith("livraison-a-")){const l=i.replace(/^livraison-a-/,"");if(F[l])return{page:"seoCity",citySlug:l,cityMode:"livraison",canonicalPath:t}}if(i!=null&&i.startsWith("prestataires-a-")){const l=i.replace(/^prestataires-a-/,"");if(F[l])return{page:"seoCity",citySlug:l,cityMode:"prestataires",canonicalPath:t}}const p={produits:"produits",livraison:"livraison",escrow:"escrow",prestataires:"prestataires",business:"business",academy:"academy",blog:"blog",fidelite:"loyalty",contact:"contact",aide:"aide",faq:"faq",cgv:"cgv",mentions:"mentions","mentions-legales":"mentions",confidentialite:"confidentialite","politique-confidentialite":"confidentialite",dashboard:"dashboard",admin:"admin",checkout:"checkout",panier:"cart",cart:"cart","bons-plans":"bonsPlans",notifications:"notifications","devenir-vendeur":"devenirVendeur","devenir-livreur":"devenirLivreur","devenir-prestataire":"inscription",inscription:"inscription"};if(o.length===1&&p[i]){const l=p[i];return{page:l,canonicalPath:er[l]??`/${i}`}}return{page:"home",canonicalPath:"/"}}function Li(){return`${K}/produits`}var Oi=typeof Element<"u",Di=typeof Map=="function",qi=typeof Set=="function",Yi=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function Ge(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){if(e.constructor!==t.constructor)return!1;var o,i,a;if(Array.isArray(e)){if(o=e.length,o!=t.length)return!1;for(i=o;i--!==0;)if(!Ge(e[i],t[i]))return!1;return!0}var d;if(Di&&e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(d=e.entries();!(i=d.next()).done;)if(!t.has(i.value[0]))return!1;for(d=e.entries();!(i=d.next()).done;)if(!Ge(i.value[1],t.get(i.value[0])))return!1;return!0}if(qi&&e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(d=e.entries();!(i=d.next()).done;)if(!t.has(i.value[0]))return!1;return!0}if(Yi&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(t)){if(o=e.length,o!=t.length)return!1;for(i=o;i--!==0;)if(e[i]!==t[i])return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf&&typeof e.valueOf=="function"&&typeof t.valueOf=="function")return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString&&typeof e.toString=="function"&&typeof t.toString=="function")return e.toString()===t.toString();if(a=Object.keys(e),o=a.length,o!==Object.keys(t).length)return!1;for(i=o;i--!==0;)if(!Object.prototype.hasOwnProperty.call(t,a[i]))return!1;if(Oi&&e instanceof Element)return!1;for(i=o;i--!==0;)if(!((a[i]==="_owner"||a[i]==="__v"||a[i]==="__o")&&e.$$typeof)&&!Ge(e[a[i]],t[a[i]]))return!1;return!0}return e!==e&&t!==t}var $i=function(t,o){try{return Ge(t,o)}catch(i){if((i.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw i}};const Bi=Rr($i);var Fi=function(e,t,o,i,a,d,n,p){if(!e){var l;if(t===void 0)l=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var m=[o,i,a,d,n,p],x=0;l=new Error(t.replace(/%s/g,function(){return m[x++]})),l.name="Invariant Violation"}throw l.framesToPop=1,l}},Ui=Fi;const yt=Rr(Ui);var Wi=function(t,o,i,a){var d=i?i.call(a,t,o):void 0;if(d!==void 0)return!!d;if(t===o)return!0;if(typeof t!="object"||!t||typeof o!="object"||!o)return!1;var n=Object.keys(t),p=Object.keys(o);if(n.length!==p.length)return!1;for(var l=Object.prototype.hasOwnProperty.bind(o),m=0;m<n.length;m++){var x=n[m];if(!l(x))return!1;var b=t[x],w=o[x];if(d=i?i.call(a,b,w,x):void 0,d===!1||d===void 0&&b!==w)return!1}return!0};const Vi=Rr(Wi);var Ft=(e=>(e.BASE="base",e.BODY="body",e.HEAD="head",e.HTML="html",e.LINK="link",e.META="meta",e.NOSCRIPT="noscript",e.SCRIPT="script",e.STYLE="style",e.TITLE="title",e.FRAGMENT="Symbol(react.fragment)",e))(Ft||{}),vr={link:{rel:["amphtml","canonical","alternate"]},script:{type:["application/ld+json"]},meta:{charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]}},vt=Object.values(Ft),Or={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},Hi=Object.entries(Or).reduce((e,[t,o])=>(e[o]=t,e),{}),Z="data-rh",ze={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate",PRIORITIZE_SEO_TAGS:"prioritizeSeoTags"},Ce=(e,t)=>{for(let o=e.length-1;o>=0;o-=1){const i=e[o];if(Object.prototype.hasOwnProperty.call(i,t))return i[t]}return null},Xi=e=>{let t=Ce(e,"title");const o=Ce(e,ze.TITLE_TEMPLATE);if(Array.isArray(t)&&(t=t.join("")),o&&t)return o.replace(/%s/g,()=>t);const i=Ce(e,ze.DEFAULT_TITLE);return t||i||void 0},Gi=e=>Ce(e,ze.ON_CHANGE_CLIENT_STATE)||(()=>{}),wr=(e,t)=>t.filter(o=>typeof o[e]<"u").map(o=>o[e]).reduce((o,i)=>({...o,...i}),{}),Ji=(e,t)=>t.filter(o=>typeof o.base<"u").map(o=>o.base).reverse().reduce((o,i)=>{if(!o.length){const a=Object.keys(i);for(let d=0;d<a.length;d+=1){const p=a[d].toLowerCase();if(e.indexOf(p)!==-1&&i[p])return o.concat(i)}}return o},[]),Ki=e=>console&&typeof console.warn=="function"&&console.warn(e),Pe=(e,t,o)=>{const i={};return o.filter(a=>Array.isArray(a[e])?!0:(typeof a[e]<"u"&&Ki(`Helmet: ${e} should be of type "Array". Instead found type "${typeof a[e]}"`),!1)).map(a=>a[e]).reverse().reduce((a,d)=>{const n={};d.filter(l=>{let m;const x=Object.keys(l);for(let w=0;w<x.length;w+=1){const y=x[w],j=y.toLowerCase();t.indexOf(j)!==-1&&!(m==="rel"&&l[m].toLowerCase()==="canonical")&&!(j==="rel"&&l[j].toLowerCase()==="stylesheet")&&(m=j),t.indexOf(y)!==-1&&(y==="innerHTML"||y==="cssText"||y==="itemprop")&&(m=y)}if(!m||!l[m])return!1;const b=l[m].toLowerCase();return i[m]||(i[m]={}),n[m]||(n[m]={}),i[m][b]?!1:(n[m][b]=!0,!0)}).reverse().forEach(l=>a.push(l));const p=Object.keys(n);for(let l=0;l<p.length;l+=1){const m=p[l],x={...i[m],...n[m]};i[m]=x}return a},[]).reverse()},Qi=(e,t)=>{if(Array.isArray(e)&&e.length){for(let o=0;o<e.length;o+=1)if(e[o][t])return!0}return!1},Zi=e=>({baseTag:Ji(["href"],e),bodyAttributes:wr("bodyAttributes",e),defer:Ce(e,ze.DEFER),encode:Ce(e,ze.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:wr("htmlAttributes",e),linkTags:Pe("link",["rel","href"],e),metaTags:Pe("meta",["name","charset","http-equiv","property","itemprop"],e),noscriptTags:Pe("noscript",["innerHTML"],e),onChangeClientState:Gi(e),scriptTags:Pe("script",["src","innerHTML"],e),styleTags:Pe("style",["cssText"],e),title:Xi(e),titleAttributes:wr("titleAttributes",e),prioritizeSeoTags:Qi(e,ze.PRIORITIZE_SEO_TAGS)}),Ut=e=>Array.isArray(e)?e.join(""):e,ea=(e,t)=>{const o=Object.keys(e);for(let i=0;i<o.length;i+=1)if(t[o[i]]&&t[o[i]].includes(e[o[i]]))return!0;return!1},kr=(e,t)=>Array.isArray(e)?e.reduce((o,i)=>(ea(i,t)?o.priority.push(i):o.default.push(i),o),{priority:[],default:[]}):{default:e,priority:[]},wt=(e,t)=>({...e,[t]:void 0}),ra=["noscript","script","style"],Er=(e,t=!0)=>t===!1?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"),Wt=e=>Object.keys(e).reduce((t,o)=>{const i=typeof e[o]<"u"?`${o}="${e[o]}"`:`${o}`;return t?`${t} ${i}`:i},""),ta=(e,t,o,i)=>{const a=Wt(o),d=Ut(t);return a?`<${e} ${Z}="true" ${a}>${Er(d,i)}</${e}>`:`<${e} ${Z}="true">${Er(d,i)}</${e}>`},oa=(e,t,o=!0)=>t.reduce((i,a)=>{const d=a,n=Object.keys(d).filter(m=>!(m==="innerHTML"||m==="cssText")).reduce((m,x)=>{const b=typeof d[x]>"u"?x:`${x}="${Er(d[x],o)}"`;return m?`${m} ${b}`:b},""),p=d.innerHTML||d.cssText||"",l=ra.indexOf(e)===-1;return`${i}<${e} ${Z}="true" ${n}${l?"/>":`>${p}</${e}>`}`},""),Vt=(e,t={})=>Object.keys(e).reduce((o,i)=>{const a=Or[i];return o[a||i]=e[i],o},t),ia=(e,t,o)=>{const i={key:t,[Z]:!0},a=Vt(o,i);return[oe.createElement("title",a,t)]},Je=(e,t)=>t.map((o,i)=>{const a={key:i,[Z]:!0};return Object.keys(o).forEach(d=>{const p=Or[d]||d;if(p==="innerHTML"||p==="cssText"){const l=o.innerHTML||o.cssText;a.dangerouslySetInnerHTML={__html:l}}else a[p]=o[d]}),oe.createElement(e,a)}),H=(e,t,o=!0)=>{switch(e){case"title":return{toComponent:()=>ia(e,t.title,t.titleAttributes),toString:()=>ta(e,t.title,t.titleAttributes,o)};case"bodyAttributes":case"htmlAttributes":return{toComponent:()=>Vt(t),toString:()=>Wt(t)};default:return{toComponent:()=>Je(e,t),toString:()=>oa(e,t,o)}}},aa=({metaTags:e,linkTags:t,scriptTags:o,encode:i})=>{const a=kr(e,vr.meta),d=kr(t,vr.link),n=kr(o,vr.script);return{priorityMethods:{toComponent:()=>[...Je("meta",a.priority),...Je("link",d.priority),...Je("script",n.priority)],toString:()=>`${H("meta",a.priority,i)} ${H("link",d.priority,i)} ${H("script",n.priority,i)}`},metaTags:a.default,linkTags:d.default,scriptTags:n.default}},na=e=>{const{baseTag:t,bodyAttributes:o,encode:i=!0,htmlAttributes:a,noscriptTags:d,styleTags:n,title:p="",titleAttributes:l,prioritizeSeoTags:m}=e;let{linkTags:x,metaTags:b,scriptTags:w}=e,y={toComponent:()=>{},toString:()=>""};return m&&({priorityMethods:y,linkTags:x,metaTags:b,scriptTags:w}=aa(e)),{priority:y,base:H("base",t,i),bodyAttributes:H("bodyAttributes",o,i),htmlAttributes:H("htmlAttributes",a,i),link:H("link",x,i),meta:H("meta",b,i),noscript:H("noscript",d,i),script:H("script",w,i),style:H("style",n,i),title:H("title",{title:p,titleAttributes:l},i)}},Ar=na,He=[],Ht=!!(typeof window<"u"&&window.document&&window.document.createElement),Tr=class{constructor(e,t){te(this,"instances",[]);te(this,"canUseDOM",Ht);te(this,"context");te(this,"value",{setHelmet:e=>{this.context.helmet=e},helmetInstances:{get:()=>this.canUseDOM?He:this.instances,add:e=>{(this.canUseDOM?He:this.instances).push(e)},remove:e=>{const t=(this.canUseDOM?He:this.instances).indexOf(e);(this.canUseDOM?He:this.instances).splice(t,1)}}});this.context=e,this.canUseDOM=t||!1,t||(e.helmet=Ar({baseTag:[],bodyAttributes:{},htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}},sa={},Xt=oe.createContext(sa),fe,Gt=(fe=class extends c.Component{constructor(o){super(o);te(this,"helmetData");this.helmetData=new Tr(this.props.context||{},fe.canUseDOM)}render(){return oe.createElement(Xt.Provider,{value:this.helmetData.value},this.props.children)}},te(fe,"canUseDOM",Ht),fe),Se=(e,t)=>{const o=document.head||document.querySelector("head"),i=o.querySelectorAll(`${e}[${Z}]`),a=[].slice.call(i),d=[];let n;return t&&t.length&&t.forEach(p=>{const l=document.createElement(e);for(const m in p)if(Object.prototype.hasOwnProperty.call(p,m))if(m==="innerHTML")l.innerHTML=p.innerHTML;else if(m==="cssText")l.styleSheet?l.styleSheet.cssText=p.cssText:l.appendChild(document.createTextNode(p.cssText));else{const x=m,b=typeof p[x]>"u"?"":p[x];l.setAttribute(m,b)}l.setAttribute(Z,"true"),a.some((m,x)=>(n=x,l.isEqualNode(m)))?a.splice(n,1):d.push(l)}),a.forEach(p=>{var l;return(l=p.parentNode)==null?void 0:l.removeChild(p)}),d.forEach(p=>o.appendChild(p)),{oldTags:a,newTags:d}},Nr=(e,t)=>{const o=document.getElementsByTagName(e)[0];if(!o)return;const i=o.getAttribute(Z),a=i?i.split(","):[],d=[...a],n=Object.keys(t);for(const p of n){const l=t[p]||"";o.getAttribute(p)!==l&&o.setAttribute(p,l),a.indexOf(p)===-1&&a.push(p);const m=d.indexOf(p);m!==-1&&d.splice(m,1)}for(let p=d.length-1;p>=0;p-=1)o.removeAttribute(d[p]);a.length===d.length?o.removeAttribute(Z):o.getAttribute(Z)!==n.join(",")&&o.setAttribute(Z,n.join(","))},la=(e,t)=>{typeof e<"u"&&document.title!==e&&(document.title=Ut(e)),Nr("title",t)},kt=(e,t)=>{const{baseTag:o,bodyAttributes:i,htmlAttributes:a,linkTags:d,metaTags:n,noscriptTags:p,onChangeClientState:l,scriptTags:m,styleTags:x,title:b,titleAttributes:w}=e;Nr("body",i),Nr("html",a),la(b,w);const y={baseTag:Se("base",o),linkTags:Se("link",d),metaTags:Se("meta",n),noscriptTags:Se("noscript",p),scriptTags:Se("script",m),styleTags:Se("style",x)},j={},v={};Object.keys(y).forEach(g=>{const{newTags:h,oldTags:k}=y[g];h.length&&(j[g]=h),k.length&&(v[g]=y[g].oldTags)}),t&&t(),l(e,j,v)},Le=null,da=e=>{Le&&cancelAnimationFrame(Le),e.defer?Le=requestAnimationFrame(()=>{kt(e,()=>{Le=null})}):(kt(e),Le=null)},ca=da,jt=class extends c.Component{constructor(){super(...arguments);te(this,"rendered",!1)}shouldComponentUpdate(t){return!Vi(t,this.props)}componentDidUpdate(){this.emitChange()}componentWillUnmount(){const{helmetInstances:t}=this.props.context;t.remove(this),this.emitChange()}emitChange(){const{helmetInstances:t,setHelmet:o}=this.props.context;let i=null;const a=Zi(t.get().map(d=>{const n={...d.props};return delete n.context,n}));Gt.canUseDOM?ca(a):Ar&&(i=Ar(a)),o(i)}init(){if(this.rendered)return;this.rendered=!0;const{helmetInstances:t}=this.props.context;t.add(this),this.emitChange()}render(){return this.init(),null}},zr,pa=(zr=class extends c.Component{shouldComponentUpdate(e){return!Bi(wt(this.props,"helmetData"),wt(e,"helmetData"))}mapNestedChildrenToProps(e,t){if(!t)return null;switch(e.type){case"script":case"noscript":return{innerHTML:t};case"style":return{cssText:t};default:throw new Error(`<${e.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`)}}flattenArrayTypeChildren(e,t,o,i){return{...t,[e.type]:[...t[e.type]||[],{...o,...this.mapNestedChildrenToProps(e,i)}]}}mapObjectTypeChildren(e,t,o,i){switch(e.type){case"title":return{...t,[e.type]:i,titleAttributes:{...o}};case"body":return{...t,bodyAttributes:{...o}};case"html":return{...t,htmlAttributes:{...o}};default:return{...t,[e.type]:{...o}}}}mapArrayTypeChildrenToProps(e,t){let o={...t};return Object.keys(e).forEach(i=>{o={...o,[i]:e[i]}}),o}warnOnInvalidChildren(e,t){return yt(vt.some(o=>e.type===o),typeof e.type=="function"?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${vt.join(", ")} are allowed. Helmet does not support rendering <${e.type}> elements. Refer to our API for more information.`),yt(!t||typeof t=="string"||Array.isArray(t)&&!t.some(o=>typeof o!="string"),`Helmet expects a string as a child of <${e.type}>. Did you forget to wrap your children in braces? ( <${e.type}>{\`\`}</${e.type}> ) Refer to our API for more information.`),!0}mapChildrenToProps(e,t){let o={};return oe.Children.forEach(e,i=>{if(!i||!i.props)return;const{children:a,...d}=i.props,n=Object.keys(d).reduce((l,m)=>(l[Hi[m]||m]=d[m],l),{});let{type:p}=i;switch(typeof p=="symbol"?p=p.toString():this.warnOnInvalidChildren(i,a),p){case"Symbol(react.fragment)":t=this.mapChildrenToProps(a,t);break;case"link":case"meta":case"noscript":case"script":case"style":o=this.flattenArrayTypeChildren(i,o,n,a);break;default:t=this.mapObjectTypeChildren(i,t,n,a);break}}),this.mapArrayTypeChildrenToProps(o,t)}render(){const{children:e,...t}=this.props;let o={...t},{helmetData:i}=t;if(e&&(o=this.mapChildrenToProps(e,o)),i&&!(i instanceof Tr)){const a=i;i=new Tr(a.context,!0),delete o.helmetData}return i?oe.createElement(jt,{...o,context:i.value}):oe.createElement(Xt.Consumer,null,a=>oe.createElement(jt,{...o,context:a}))}},te(zr,"defaultProps",{defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1}),zr);function ga({title:e,description:t,canonicalPath:o,robots:i="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",keywords:a,ogType:d="website",ogImage:n="https://www.yorix.cm/og-image.svg",ogImageAlt:p,ogImageType:l,jsonLd:m=[],noindex:x=!1}){const b=`${K}${o!=null&&o.startsWith("/")?o:`/${o||""}`}`.replace(/([^:]\/)\/+/g,"$1"),w=x?"noindex, nofollow":i,y=Array.isArray(m)?m.filter(Boolean):m?[m]:[],j=p||e||"Yorix CM — Marketplace #1 au Cameroun",v=l||(n.endsWith(".svg")?"image/svg+xml":n.endsWith(".png")?"image/png":n.endsWith(".webp")?"image/webp":"image/jpeg");return r.jsxs(pa,{children:[r.jsx("html",{lang:"fr-CM"}),r.jsx("title",{children:e}),r.jsx("meta",{name:"description",content:t}),a&&r.jsx("meta",{name:"keywords",content:a}),r.jsx("meta",{name:"robots",content:w}),r.jsx("meta",{name:"googlebot",content:w}),r.jsx("link",{rel:"canonical",href:b}),r.jsx("link",{rel:"alternate",hrefLang:"fr-CM",href:b}),r.jsx("link",{rel:"alternate",hrefLang:"fr",href:b}),r.jsx("link",{rel:"alternate",hrefLang:"x-default",href:b}),r.jsx("meta",{property:"og:type",content:d}),r.jsx("meta",{property:"og:site_name",content:"Yorix CM"}),r.jsx("meta",{property:"og:title",content:e}),r.jsx("meta",{property:"og:description",content:t}),r.jsx("meta",{property:"og:url",content:b}),r.jsx("meta",{property:"og:image",content:n}),r.jsx("meta",{property:"og:image:type",content:v}),r.jsx("meta",{property:"og:image:width",content:"1200"}),r.jsx("meta",{property:"og:image:height",content:"630"}),r.jsx("meta",{property:"og:image:alt",content:j}),r.jsx("meta",{property:"og:locale",content:"fr_CM"}),r.jsx("meta",{property:"og:locale:alternate",content:"fr_FR"}),r.jsx("meta",{property:"og:locale:alternate",content:"en_US"}),r.jsx("meta",{name:"twitter:card",content:"summary_large_image"}),r.jsx("meta",{name:"twitter:site",content:"@yorixcm"}),r.jsx("meta",{name:"twitter:creator",content:"@yorixcm"}),r.jsx("meta",{name:"twitter:title",content:e}),r.jsx("meta",{name:"twitter:description",content:t}),r.jsx("meta",{name:"twitter:image",content:n}),r.jsx("meta",{name:"twitter:image:alt",content:j}),y.map((g,h)=>r.jsx("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:typeof g=="string"?g:JSON.stringify(g)}},h))]})}function fa({items:e}){return e!=null&&e.length?r.jsx("nav",{"aria-label":"Fil d'Ariane",className:"seo-breadcrumb",children:r.jsx("ol",{style:{display:"flex",flexWrap:"wrap",gap:"6px 10px",alignItems:"center",listStyle:"none",margin:"0 0 16px",padding:0,fontSize:".78rem",color:"var(--gray)"},children:e.map((t,o)=>r.jsxs("li",{style:{display:"flex",alignItems:"center",gap:8},children:[o>0&&r.jsx("span",{"aria-hidden":"true",children:"/"}),t.href&&!t.current?r.jsx("a",{href:t.href,style:{color:"var(--green)",fontWeight:600},children:t.label}):r.jsx("span",{style:{color:t.current?"var(--ink)":"var(--gray)",fontWeight:t.current?700:500},children:t.label})]},t.href||o))})}):null}function St({city:e,mode:t,goPage:o}){const i=(e==null?void 0:e.name)||"Cameroun",a=(e==null?void 0:e.slug)||"",d={hub:`Yorix à ${i} — marketplace, livraison & services`,acheter:`Acheter en ligne à ${i} — Yorix marketplace Cameroun`,livraison:`Livraison à ${i} — livreurs & colis au Cameroun`,prestataires:`Prestataires à ${i} — services à domicile vérifiés`},n={hub:`Yorix est une marketplace camerounaise : achetez en ligne à ${i}, faites-vous livrer rapidement et trouvez des prestataires vérifiés. Paiement MTN MoMo, Orange Money et protection Escrow.`,acheter:`Sur Yorix, l’achat en ligne à ${i} est simple : catalogue produits locaux et importés, vendeurs vérifiés, livraison suivie. Idéal pour votre shopping au Cameroun.`,livraison:`Notre service de livraison couvre ${i} et le réseau national : livreurs indépendants, suivi et tarifs transparents. Colis, courses, e-commerce — Yorix Ride.`,prestataires:`Trouvez des prestataires à ${i} : plomberie, électricité, ménage, beauté, BTP… profils vérifiés et réservation par WhatsApp.`},p=[{label:"Accueil",href:"/"},{label:d[t]||d.hub,current:!0}];return r.jsx("section",{className:"sec",style:{paddingBottom:8},children:r.jsxs("div",{style:{maxWidth:920,margin:"0 auto"},children:[r.jsx(fa,{items:p}),r.jsxs("header",{children:[r.jsx("h1",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.15rem, 2.5vw, 1.45rem)",color:"var(--ink)",margin:"0 0 12px",letterSpacing:"-.4px"},children:d[t]||d.hub}),r.jsx("p",{style:{fontSize:".88rem",color:"var(--gray)",lineHeight:1.75,margin:0},children:n[t]||n.hub})]}),r.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:10,marginTop:18},children:[r.jsxs("button",{type:"button",className:"cta-w",style:{padding:"12px 14px",textAlign:"left",borderRadius:12,cursor:"pointer"},onClick:()=>a&&o("seoCity",{citySlug:a,mode:"acheter"}),children:[r.jsxs("strong",{style:{display:"block",marginBottom:4},children:["🛍️ Produits à ",i]}),r.jsx("span",{style:{fontSize:".76rem",opacity:.9},children:"Marketplace & catégories"})]}),r.jsxs("button",{type:"button",className:"cta-w",style:{padding:"12px 14px",textAlign:"left",borderRadius:12,cursor:"pointer"},onClick:()=>a&&o("seoCity",{citySlug:a,mode:"livraison"}),children:[r.jsx("strong",{style:{display:"block",marginBottom:4},children:"🚚 Livraison"}),r.jsx("span",{style:{fontSize:".76rem",opacity:.9},children:"Livreurs & délais"})]}),r.jsxs("button",{type:"button",className:"cta-w",style:{padding:"12px 14px",textAlign:"left",borderRadius:12,cursor:"pointer"},onClick:()=>a&&o("seoCity",{citySlug:a,mode:"prestataires"}),children:[r.jsx("strong",{style:{display:"block",marginBottom:4},children:"👷 Prestataires"}),r.jsx("span",{style:{fontSize:".76rem",opacity:.9},children:"Services à domicile"})]}),r.jsxs("button",{type:"button",className:"cta-w",style:{padding:"12px 14px",textAlign:"left",borderRadius:12,cursor:"pointer"},onClick:()=>o("business"),children:[r.jsx("strong",{style:{display:"block",marginBottom:4},children:"💼 Business"}),r.jsx("span",{style:{fontSize:".76rem",opacity:.9},children:"B2B & grossistes"})]})]})]})})}const ma="https://msrymchhhxitdevthvdi.supabase.co",xa="sb_publishable_yJj7JNdn-r19Pjc070IOBg_y2VzGJXA",ua=ma,ba=xa,_=Zo(ua,ba),Ke="237696565654",ha="676935195",ya="696565654",va="237696565654",wa="yorix_unsigned",zt=["Téléphones & HighTech","Mode & Accessoires","Alimentation","Maison & Decoration","Agricole","Beauté & Soins","BTP","Automobile","Éducation","Services"],ka=["Toutes les villes","Douala","Yaoundé","Bafoussam","Bamenda","Garoua","Kribi","Ngaoundéré","Maroua","Ebolowa","Buea","Bertoua"],Ct={buyer:"🛍️ Acheteur",seller:"🏪 Vendeur",delivery:"🚚 Livreur",provider:"👷 Prestataire",admin:"🛡️ Administrateur"},Xn={pending:"⏳ En attente",en_cours:"🚚 En cours",livre:"✅ Livré",echec:"❌ Échoué"},Gn={pending:"⏳ En attente",securise:"🔐 Sécurisé",libere:"✅ Libéré",rembourse:"↩️ Remboursé"},ja=[{id:"p1",name:"Claude Mbassi",metier:"Plombier certifié",categorie:"Plomberie",ville:"Douala",quartier:"Akwa",emoji:"🔧",photo:"https://images.unsplash.com/photo-1620207418302-439b387441b0?w=400&q=80",color_bg:"linear-gradient(135deg, #dbeafe, #bfdbfe)",tags:["Plomberie","Sanitaire","Chauffe-eau"],note:4.9,avis:87,prix:"15 000 FCFA/h",experience:"8 ans",verifie:!0,top:!0,dispo:!0,bio:"Spécialiste en installations sanitaires et réparations d'urgence. Intervention rapide dans tout Douala. Devis gratuit.",telephone:"+237696565454",realisations:340},{id:"p2",name:"Électro Bertrand",metier:"Électricien",categorie:"Électricité",ville:"Yaoundé",quartier:"Bastos",emoji:"⚡",photo:"https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&q=80",color_bg:"linear-gradient(135deg, #fef3c7, #fde68a)",tags:["Électricité","Installation","Dépannage"],note:4.8,avis:124,prix:"12 000 FCFA/h",experience:"12 ans",verifie:!0,top:!0,dispo:!0,bio:"Installation électrique complète, mise aux normes, dépannage 24h/24. Travaux garantis 1 an.",telephone:"+237677884455",realisations:450},{id:"p3",name:"Raissa Design",metier:"Graphiste freelance",categorie:"Graphisme",ville:"Douala",quartier:"Bonanjo",emoji:"🎨",photo:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",color_bg:"linear-gradient(135deg, #fce7f3, #fbcfe8)",tags:["Logo","Flyer","Branding"],note:5,avis:56,prix:"25 000 FCFA/projet",experience:"5 ans",verifie:!0,top:!1,dispo:!0,bio:"Création d'identité visuelle, logos, flyers et supports print. Style moderne et africain contemporain.",telephone:"+237699001122",realisations:180},{id:"p4",name:"PhotoCam Pro",metier:"Photographe",categorie:"Photographie",ville:"Kribi",quartier:"Centre-ville",emoji:"📸",photo:"https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400&q=80",color_bg:"linear-gradient(135deg, #e0e7ff, #c7d2fe)",tags:["Mariage","Portrait","Événementiel"],note:4.9,avis:203,prix:"50 000 FCFA/jour",experience:"10 ans",verifie:!0,top:!0,dispo:!0,bio:"Photographe de mariage, portrait et événementiel. Studio équipé + déplacement partout au Cameroun.",telephone:"+237670223344",realisations:520},{id:"p5",name:"CleanPro237",metier:"Service de nettoyage",categorie:"Nettoyage",ville:"Douala",quartier:"Bonapriso",emoji:"🧹",photo:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",color_bg:"linear-gradient(135deg, #dcfce7, #bbf7d0)",tags:["Ménage","Bureaux","Grand nettoyage"],note:4.6,avis:312,prix:"8 000 FCFA/h",experience:"6 ans",verifie:!0,top:!1,dispo:!0,bio:"Nettoyage professionnel de maisons, bureaux et appartements. Produits écologiques. Équipe formée.",telephone:"+237655112233",realisations:890},{id:"p6",name:"DevCam Tech",metier:"Développeur Web",categorie:"Informatique",ville:"Yaoundé",quartier:"Nlongkak",emoji:"💻",photo:"https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80",color_bg:"linear-gradient(135deg, #cffafe, #a5f3fc)",tags:["Site web","App","E-commerce"],note:4.8,avis:41,prix:"200 000 FCFA/projet",experience:"7 ans",verifie:!0,top:!0,dispo:!0,bio:"Création de sites web, applications mobiles et boutiques en ligne. Technologies React, Next.js, React Native.",telephone:"+237690112233",realisations:95},{id:"p7",name:"Kouakou Menuiserie",metier:"Menuisier ébéniste",categorie:"Menuiserie",ville:"Bafoussam",quartier:"Tamdja",emoji:"🪚",photo:"https://images.unsplash.com/photo-1513467655676-561b7d489a88?w=400&q=80",color_bg:"linear-gradient(135deg, #fed7aa, #fdba74)",tags:["Meubles","Placards","Sur-mesure"],note:4.7,avis:156,prix:"À partir de 50 000 FCFA",experience:"15 ans",verifie:!0,top:!1,dispo:!0,bio:"Menuiserie traditionnelle et moderne. Fabrication de meubles sur-mesure, placards, portes et fenêtres.",telephone:"+237677445566",realisations:420},{id:"p8",name:"Chef Marguerite",metier:"Cuisinière événementielle",categorie:"Cuisine",ville:"Douala",quartier:"Logbessou",emoji:"👩‍🍳",photo:"https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80",color_bg:"linear-gradient(135deg, #fecaca, #fca5a5)",tags:["Traiteur","Mariages","Cuisine locale"],note:4.9,avis:178,prix:"3 500 FCFA/pers.",experience:"20 ans",verifie:!0,top:!0,dispo:!0,bio:"Traiteur spécialisé cuisine camerounaise et internationale. Ndolé, Poulet DG, Eru... pour mariages et événements.",telephone:"+237699778899",realisations:260},{id:"p9",name:"Beauté by Sandra",metier:"Coiffeuse à domicile",categorie:"Beauté",ville:"Yaoundé",quartier:"Mvan",emoji:"💇‍♀️",photo:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",color_bg:"linear-gradient(135deg, #fbcfe8, #f9a8d4)",tags:["Tresses","Coloration","Soins"],note:5,avis:89,prix:"10 000 FCFA/prest.",experience:"6 ans",verifie:!0,top:!1,dispo:!0,bio:"Coiffure à domicile : tresses africaines, mèches, coloration, soins capillaires. Je me déplace partout à Yaoundé.",telephone:"+237651223344",realisations:340}],Jn=[{id:1,slug:"vendre-en-ligne-cameroun-2026",title:"Comment vendre en ligne au Cameroun en 2026 : le guide complet",excerpt:"Stratégies concrètes pour lancer ton business e-commerce au Cameroun : choix des produits, marketing WhatsApp, paiement mobile, logistique locale.",cat:"BUSINESS",emoji:"📈",color_bg:"linear-gradient(135deg, #dbeafe, #bfdbfe)",image:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",date:"15 avril 2026",read:"8 min",author:"Équipe Yorix",author_avatar:"Y",featured:!0,external_url:"https://www.journalducameroun.com/e-commerce-au-cameroun-un-marche-en-pleine-expansion/",tags:["E-commerce","Cameroun","Business"]},{id:2,slug:"produits-camerounais-plus-vendus",title:"Les 10 produits camerounais les plus vendus en ligne",excerpt:"Beurre de karité, pagne wax, cacao, miel de Oku, poivre de Penja... Découvre les produits locaux qui cartonnent à l'international.",cat:"LOCAL",emoji:"🌿",color_bg:"linear-gradient(135deg, #dcfce7, #bbf7d0)",image:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",date:"12 avril 2026",read:"6 min",author:"Marie Tchoumi",author_avatar:"M",featured:!1,external_url:"https://www.investiraucameroun.com/agriculture",tags:["Produits locaux","Export","Artisanat"]},{id:3,slug:"mtn-momo-vs-orange-money",title:"MTN MoMo vs Orange Money : quel système de paiement choisir ?",excerpt:"Comparatif détaillé des deux géants du mobile money au Cameroun : frais, limites, sécurité, intégration marchande et expérience utilisateur.",cat:"PAIEMENT",emoji:"💳",color_bg:"linear-gradient(135deg, #fef3c7, #fde68a)",image:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",date:"10 avril 2026",read:"7 min",author:"Jean-Paul Essomba",author_avatar:"J",featured:!1,external_url:"https://www.gsma.com/mobilefordevelopment/mobile-money/",tags:["MoMo","Orange Money","Fintech"]},{id:4,slug:"suivi-commande-temps-reel",title:"Suivi de commande en temps réel : comment ça marche chez Yorix",excerpt:"Découvre notre système de tracking GPS inspiré d'Uber : de la collecte chez le vendeur jusqu'à ta porte, tu vois tout en direct.",cat:"LIVRAISON",emoji:"🚚",color_bg:"linear-gradient(135deg, #fed7aa, #fdba74)",image:"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",date:"8 avril 2026",read:"5 min",author:"Équipe Yorix Ride",author_avatar:"R",featured:!1,external_url:"https://www.uber.com/fr/newsroom/",tags:["Livraison","GPS","Technologie"]},{id:5,slug:"escrow-protection-acheteur",title:"Escrow Yorix : pourquoi ton argent est 100% protégé",excerpt:"Comprends en 5 minutes le système Escrow : ton paiement reste bloqué jusqu'à la livraison confirmée. Zéro arnaque, zéro stress.",cat:"SÉCURITÉ",emoji:"🔐",color_bg:"linear-gradient(135deg, #e9d5ff, #d8b4fe)",image:"https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",date:"5 avril 2026",read:"4 min",author:"Équipe Sécurité",author_avatar:"S",featured:!1,external_url:"https://en.wikipedia.org/wiki/Escrow",tags:["Escrow","Sécurité","Paiement"]},{id:6,slug:"electricien-fiable-douala",title:"Comment trouver un électricien fiable à Douala en 2026",excerpt:"Check-list complète : vérifier les qualifications, demander un devis, évaluer les avis, éviter les arnaques courantes dans le BTP camerounais.",cat:"PRESTATAIRES",emoji:"⚡",color_bg:"linear-gradient(135deg, #fecaca, #fca5a5)",image:"https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",date:"2 avril 2026",read:"6 min",author:"Service Prestataires",author_avatar:"P",featured:!1,external_url:"https://www.cameroon-tribune.cm/",tags:["BTP","Douala","Prestataires"]},{id:7,slug:"pagne-wax-histoire-tendances",title:"Le pagne wax camerounais : histoire, tendances et où acheter",excerpt:"Du marché de Mokolo aux défilés internationaux, le pagne wax conquiert le monde. Guide complet pour reconnaître un vrai pagne de qualité.",cat:"MODE",emoji:"👗",color_bg:"linear-gradient(135deg, #fce7f3, #fbcfe8)",image:"https://images.unsplash.com/photo-1617627191894-1c9e59f7a4ab?w=800&q=80",date:"28 mars 2026",read:"9 min",author:"Fatima Abakar",author_avatar:"F",featured:!1,external_url:"https://www.vogue.fr/mode/article/wax-pagne-africain-histoire",tags:["Mode","Pagne","Culture"]},{id:8,slug:"devenir-livreur-yorix",title:"Devenir livreur Yorix : gagne jusqu'à 150 000 FCFA/mois",excerpt:"Témoignages de livreurs actifs à Yaoundé et Douala, processus d'inscription, revenus réels et conseils pour maximiser tes gains.",cat:"CARRIÈRE",emoji:"🏍️",color_bg:"linear-gradient(135deg, #cffafe, #a5f3fc)",image:"https://images.unsplash.com/photo-1558383331-f520f2888351?w=800&q=80",date:"25 mars 2026",read:"7 min",author:"Équipe Yorix Ride",author_avatar:"R",featured:!1,external_url:"https://www.cameroon-info.net/",tags:["Emploi","Livraison","Revenus"]},{id:9,slug:"fiscalite-vendeurs-cameroun",title:"Fiscalité des vendeurs en ligne au Cameroun : ce qu'il faut savoir",excerpt:"TVA, impôt sur le revenu, patente : toutes les obligations fiscales d'un e-commerçant camerounais expliquées simplement.",cat:"BUSINESS",emoji:"📊",color_bg:"linear-gradient(135deg, #dbeafe, #bfdbfe)",image:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",date:"22 mars 2026",read:"10 min",author:"Expert Comptable",author_avatar:"E",featured:!1,external_url:"https://www.impots.cm/",tags:["Fiscalité","Impôts","Business"]}],Kn=[{icon:"🎁",name:"Bon 5 000 FCFA",pts:500},{icon:"🚚",name:"Livraison gratuite x3",pts:300},{icon:"⭐",name:"Statut VIP Yorix",pts:1e3},{icon:"📱",name:"-20% téléphones",pts:400},{icon:"☕",name:"Pack café 500g",pts:200},{icon:"🎓",name:"Cours Academy offert",pts:350}];function Qe(e,t={}){if(!e||typeof e!="string"||!e.includes("cloudinary.com"))return e;const{width:o=400,quality:i="auto:low",format:a="auto",dpr:d="auto"}=t;if(e.includes("/w_")||e.includes("/q_"))return e;const n=[`w_${o}`,`q_${i}`,`f_${a}`,`dpr_${d}`,"c_limit"].join(",");return e.replace(/\/upload\//,`/upload/${n}/`)}function Qn(e){return!e||!e.includes("cloudinary.com")?"":[`${Qe(e,{width:400})} 400w`,`${Qe(e,{width:800})} 800w`,`${Qe(e,{width:1200})} 1200w`].join(", ")}function Zn(e){return!e||!e.includes("cloudinary.com")?"":Qe(e,{width:20,quality:"auto:low"})}async function es(e){const t=new FormData;t.append("file",e),t.append("upload_preset",wa);const i=await(await fetch("https://api.cloudinary.com/v1_1/dulwb03nf/image/upload",{method:"POST",body:t})).json();if(i.error)throw new Error(i.error.message);return i.secure_url}async function Sa(e){const{data:t,error:o}=await _.from("profiles").select("*").eq("id",e).maybeSingle();return o?(console.error("getUserProfile ERROR:",o),null):t}function za(e){const t=["buyer","seller","delivery","provider","admin"],o=e==null?void 0:e.role;return o==="superadmin"?"admin":o&&t.includes(o)?o:"buyer"}const Ca=[/(\+?237[\s\-]?[0-9]{8,9})/g,/(\+?[0-9]{1,3}[\s\-]?[0-9]{9,10})/g,/(whatsapp|wa\.me|t\.me|telegram)/gi,/([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g,/(facebook\.com|instagram\.com)/gi];function _a(e){return Ca.some(t=>new RegExp(t.source,t.flags).test(e))?{bloque:!0}:{bloque:!1}}const Ea="https://msrymchhhxitdevthvdi.supabase.co/functions/v1/send-email";async function Aa({to:e,subject:t,html:o,from:i}){try{const a=await fetch(Ea,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({to:e,subject:t,html:o,from:i})}),d=await a.json();return a.ok?{success:!0,id:d.id}:(console.error("sendEmail error:",d),{success:!1,error:d.error})}catch(a){return console.error("sendEmail exception:",a),{success:!1,error:a.message}}}function Ta(e,t){return`
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
  `}function Na(e,t="client"){const i={buyer:"acheteur",seller:"vendeur",delivery:"livreur",provider:"prestataire",client:"client"}[t]||"client";return Ta(`Bienvenue sur Yorix, ${e} ! 🎉`,`
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
    `)}const Ra=e=>`
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

`;async function Ma(e,t){const o=t.userId;if(!o)return{ok:!1,error:"no userId"};const i=(t.titre||t.title||"Yorix").trim(),a=t.metadata??t.payload??null,d={user_id:o,type:t.type||"system",title:i,message:t.message??"",link:t.link??null,lu:!1,priority:t.priority||"standard",category:t.category||"system",payload:a},{data:n,error:p}=await e.from("notifications").insert(d).select("id").maybeSingle();return p?{ok:!1,error:p.message}:{ok:!0,id:n==null?void 0:n.id}}const Ia={commande_recue:{label:"En attente",short:"En attente",icon:"⏳",color:"#f59e0b",bg:"#fef3c7",order:1},livreur_assigne:{label:"Livreur assigné",short:"Assignée",icon:"🏍️",color:"#0ea5e9",bg:"#e0f2fe",order:2},accepte:{label:"Acceptée par livreur",short:"Acceptée",icon:"✅",color:"#10b981",bg:"#d1fae5",order:3},refuse:{label:"Refusée par livreur",short:"Refusée",icon:"❌",color:"#ef4444",bg:"#fee2e2",order:0},preparation:{label:"Préparation",short:"Préparation",icon:"📦",color:"#3b82f6",bg:"#dbeafe",order:4},collecte:{label:"Colis collecté",short:"Collecté",icon:"🏪",color:"#8b5cf6",bg:"#ede9fe",order:5},en_route:{label:"En route",short:"En route",icon:"🏍️",color:"#10b981",bg:"#d1fae5",order:6},livre:{label:"Livré",short:"Livré",icon:"✅",color:"#22c55e",bg:"#dcfce7",order:7},annule:{label:"Annulé",short:"Annulé",icon:"❌",color:"#ef4444",bg:"#fee2e2",order:-1}};function rr(e){return Ia[e]||{label:e||"—",short:"—",icon:"•",color:"#64748b",bg:"#f1f5f9",order:0}}const Pa=()=>{const e=Math.random().toString(36).substring(2,7).toUpperCase(),t=Date.now().toString(36).slice(-3).toUpperCase();return`YX-${e}${t}`};async function _e({delivery:e,acteurId:t,acteurRole:o,action:i,ancienStatut:a,nouveauStatut:d,payload:n}){try{await _.from("delivery_logs").insert({delivery_id:(e==null?void 0:e.id)||null,code_suivi:(e==null?void 0:e.code_suivi)||null,acteur_id:t||null,acteur_role:o||"system",action:i,ancien_statut:a||null,nouveau_statut:d||null,payload:n||null})}catch(p){console.warn("[deliveryWorkflow] log skipped:",p==null?void 0:p.message)}}async function me({userId:e,type:t,title:o,message:i,link:a,payload:d}){if(!e)return{ok:!1,reason:"no-user"};const n=await Ma(_,{userId:e,type:t||"delivery",title:o||"Notification Yorix",message:i||"",link:a||null,priority:"important",category:"delivery",payload:d||null});return n.ok?{ok:!0}:(console.warn("[deliveryWorkflow] notification skipped:",n.error),{ok:!1,reason:n.error})}function La(e){if(!e)return"";const t=String(e).replace(/[^0-9]/g,"");return t?t.startsWith("237")?t:`237${t.replace(/^0+/,"")}`:""}function Oa(e,t){const o=La(e);return o?`https://wa.me/${o}?text=${encodeURIComponent(t||"")}`:null}function Da(e,t){const o=Oa(e,t);if(!o)return!1;try{return window.open(o,"_blank","noopener,noreferrer"),!0}catch{return!1}}function _t(e){return e==null||isNaN(e)?"À définir":Number(e).toLocaleString("fr-FR")+" FCFA"}function qa(e){const t=`https://yorix.cm/?page=dashboard&tab=disponibles&code=${e.code_suivi}`;return["🚚 *NOUVELLE COURSE YORIX DISPONIBLE*","","📦 *Code mission :* "+(e.code_suivi||"—"),"","👤 *CLIENT*","Nom : "+(e.client_nom||"N/A"),"Téléphone : "+(e.client_tel||"N/A"),"","📍 *TRAJET*","🔴 Collecte : "+(e.adresse_collecte||"N/A"),"🟢 Livraison : "+(e.adresse_livraison||"N/A"),"Ville : "+(e.ville||"N/A"),"","💰 Montant : "+_t(e.montant),e.commission_livreur?"🎁 Votre gain : "+_t(e.commission_livreur):"","📏 Distance : ~"+(e.distance_km||3.5)+" km","⏱️ Temps estimé : ~"+(e.temps_estime_min||25)+" min",(e.instructions,""),e.instructions?"📝 Instructions : "+e.instructions:"","","👉 Connectez-vous à votre dashboard Yorix pour ACCEPTER ou REFUSER cette livraison :",t,"","Yorix CM 🇨🇲"].filter(Boolean).join(`
`)}async function rs({delivery:e,livreur:t,acteurId:o,openWhatsAppFallback:i=!0}){if(!(e!=null&&e.id))throw new Error("Livraison invalide");if(!(t!=null&&t.nom))throw new Error("Livreur invalide");const a={livreur_id:t.id||t.uid||null,livreur_nom:t.nom,livreur_tel:t.telephone||t.tel||"",livreur_vehicule:t.vehicule||t.livreur_vehicule||"Moto",statut:"livreur_assigne",assigne_at:new Date().toISOString(),refuse_at:null,refus_motif:null,accepte_at:null,notif_livreur_sent:!1},{data:d,error:n}=await _.from("deliveries").update(a).eq("id",e.id).select().single();if(n)throw n;const p=d||{...e,...a};a.livreur_id&&await me({userId:a.livreur_id,type:"delivery_assigned",title:"🚚 Nouvelle course Yorix",message:`Mission ${p.code_suivi} : ${p.adresse_collecte||""} → ${p.adresse_livraison||""}`,link:`/?page=dashboard&tab=disponibles&code=${p.code_suivi}`,payload:{delivery_id:p.id,code:p.code_suivi}});let l=!1;return i&&a.livreur_tel&&(l=Da(a.livreur_tel,qa(p))),(l||a.livreur_id)&&await _.from("deliveries").update({notif_livreur_sent:!0}).eq("id",p.id),await _e({delivery:p,acteurId:o,acteurRole:"admin",action:e.livreur_id?"reassigned":"assigned",ancienStatut:e.statut,nouveauStatut:"livreur_assigne",payload:{livreur_id:a.livreur_id,livreur_nom:a.livreur_nom,wa:l}}),{delivery:p,waOpened:l}}async function Jt({delivery:e,patch:t,acteurId:o}){if(!(e!=null&&e.id))throw new Error("Livraison invalide");const i={...t},a=new Date().toISOString();t.statut&&t.statut!==e.statut&&(t.statut==="preparation"&&!e.preparation_at&&(i.preparation_at=a),t.statut==="collecte"&&!e.collecte_at&&(i.collecte_at=a),t.statut==="en_route"&&!e.en_route_at&&(i.en_route_at=a),t.statut==="livre"&&!e.livre_at&&(i.livre_at=a),t.statut==="annule"&&!e.annule_at&&(i.annule_at=a));const{data:d,error:n}=await _.from("deliveries").update(i).eq("id",e.id).select().single();if(n)throw n;return await _e({delivery:d,acteurId:o,acteurRole:"admin",action:"edited",ancienStatut:e.statut,nouveauStatut:d.statut,payload:{patch:t}}),d}async function ts({delivery:e,nouveauStatut:t,acteurId:o,notifyClient:i=!0}){const a=await Jt({delivery:e,patch:{statut:t},acteurId:o});return i&&e.client_id&&await me({userId:e.client_id,type:"delivery_status",title:`Livraison ${e.code_suivi} : ${rr(t).label}`,message:`Votre livraison est maintenant : ${rr(t).label}.`,link:`/?page=livraison&code=${e.code_suivi}`,payload:{delivery_id:e.id,statut:t}}),a}async function os({delivery:e,motif:t,acteurId:o}){const i=await Jt({delivery:e,patch:{statut:"annule",refus_motif:t||null,annule_at:new Date().toISOString()},acteurId:o});return e.client_id&&await me({userId:e.client_id,type:"delivery_cancelled",title:"❌ Livraison annulée",message:`Votre livraison ${e.code_suivi} a été annulée. ${t?"Motif : "+t:""}`,link:`/?page=livraison&code=${e.code_suivi}`,payload:{delivery_id:e.id,motif:t}}),i}async function is({delivery:e,user:t,userData:o}){if(!(e!=null&&e.id))throw new Error("Mission invalide");if(!(t!=null&&t.id))throw new Error("Authentification requise");let i=null;const{data:a,error:d}=await _.rpc("accepter_livraison",{p_delivery_id:e.id});if(!d&&a)i=Array.isArray(a)?a[0]:a;else{d&&console.warn("[livreurAccepter] RPC fallback:",d.message);const{data:n,error:p}=await _.from("deliveries").update({statut:"accepte",accepte_at:new Date().toISOString()}).eq("id",e.id).eq("livreur_id",t.id).select().single();if(p)throw p;i=n,await _e({delivery:i,acteurId:t.id,acteurRole:"delivery",action:"accepted",ancienStatut:e.statut,nouveauStatut:"accepte"})}return i!=null&&i.client_id&&await me({userId:i.client_id,type:"delivery_accepted",title:"✅ Votre livraison a un livreur !",message:`${i.livreur_nom||"Votre livreur"} a accepté votre livraison ${i.code_suivi}.`,link:`/?page=livraison&code=${i.code_suivi}`,payload:{delivery_id:i.id}}),i}async function as({delivery:e,user:t,userData:o,motif:i}){if(!(e!=null&&e.id))throw new Error("Mission invalide");if(!(t!=null&&t.id))throw new Error("Authentification requise");let a=null;const{data:d,error:n}=await _.rpc("refuser_livraison",{p_delivery_id:e.id,p_motif:i||null});if(!n&&d)a=Array.isArray(d)?d[0]:d;else{n&&console.warn("[livreurRefuser] RPC fallback:",n.message);const p=e.livreur_nom,m=[...Array.isArray(e.historique_refus)?e.historique_refus:[],{livreur_id:t.id,livreur_nom:p,motif:i||"",refuse_at:new Date().toISOString()}],{data:x,error:b}=await _.from("deliveries").update({statut:"commande_recue",livreur_id:null,livreur_nom:null,livreur_tel:null,livreur_vehicule:null,assigne_at:null,accepte_at:null,refuse_at:new Date().toISOString(),refus_motif:i||null,historique_refus:m}).eq("id",e.id).eq("livreur_id",t.id).select().single();if(b)throw b;a=x,await _e({delivery:a,acteurId:t.id,acteurRole:"delivery",action:"refused",ancienStatut:e.statut,nouveauStatut:"commande_recue",payload:{motif:i}})}return await me({userId:null,type:"delivery_refused",title:"⚠️ Mission refusée",message:`${(o==null?void 0:o.nom)||"Un livreur"} a refusé la mission ${e.code_suivi}. ${i?"Motif : "+i:""}`,link:"/?page=admin&tab=deliveries",payload:{delivery_id:e.id,motif:i}}),a}async function ns({delivery:e,user:t,nouveauStatut:o}){if(!(e!=null&&e.id)||!(t!=null&&t.id))throw new Error("Paramètres invalides");if(!["preparation","collecte","en_route","livre"].includes(o))throw new Error("Statut non autorisé pour le livreur : "+o);const a={statut:o},d=new Date().toISOString();o==="preparation"&&(a.preparation_at=d),o==="collecte"&&(a.collecte_at=d),o==="en_route"&&(a.en_route_at=d),o==="livre"&&(a.livre_at=d);const{data:n,error:p}=await _.from("deliveries").update(a).eq("id",e.id).eq("livreur_id",t.id).select().single();if(p)throw p;return n!=null&&n.client_id&&await me({userId:n.client_id,type:"delivery_status",title:`${rr(o).icon} Livraison ${n.code_suivi}`,message:rr(o).label,link:`/?page=livraison&code=${n.code_suivi}`,payload:{delivery_id:n.id,statut:o}}),await _e({delivery:n,acteurId:t.id,acteurRole:"delivery",action:"status_change",ancienStatut:e.statut,nouveauStatut:o}),n}async function Ya({clientId:e=null,clientNom:t="",clientTel:o="",adresseCollecte:i="",adresseLivraison:a="",ville:d="",colisDescription:n="",vehicule:p="Moto",urgence:l="normal",montant:m=0,distanceKm:x=3.5,tempsEstimeMin:b=30,instructions:w="",orderId:y=null}){const j=Pa(),v={code_suivi:j,order_id:y,client_id:e,client_nom:t,client_tel:o,adresse_collecte:i||"Boutique Yorix",adresse_livraison:a,ville:d||null,colis_description:n||null,livreur_vehicule:p,urgence:l,montant:Number(m)||0,distance_km:x,temps_estime_min:b,instructions:w||null,statut:"commande_recue",commande_at:new Date().toISOString()},{data:g,error:h}=await _.from("deliveries").insert(v).select().single();if(h)throw h;return await me({userId:null,type:"delivery_request",title:"🚚 Nouvelle demande de livraison",message:`${t||"Client"} → ${a} (${j})`,link:"/?page=admin&tab=deliveries",payload:{delivery_id:g.id,code:j}}),await _e({delivery:g,acteurId:e,acteurRole:e?"client":"system",action:"created",nouveauStatut:"commande_recue"}),{code:j,delivery:g}}function ss(e){var v;const t=Array.isArray(e)?e:[],o=t.filter(g=>g.statut==="livre"),i=t.filter(g=>g.statut==="refuse"||g.refus_motif),a=t.filter(g=>["accepte","preparation","collecte","en_route"].includes(g.statut)),d=t.filter(g=>g.statut==="livreur_assigne"),n=g=>g.reduce((h,k)=>h+Number(k.commission_livreur||0),0),p=new Date,l=new Date(p.getFullYear(),p.getMonth(),1),m=new Date(p.getTime()-7*864e5),x=new Date(p.getFullYear(),p.getMonth(),p.getDate()),b=g=>o.filter(h=>h.livre_at&&new Date(h.livre_at)>=g),w=t.filter(g=>["accepte","refuse","preparation","collecte","en_route","livre"].includes(g.statut)||g.refus_motif),y=t.filter(g=>["accepte","preparation","collecte","en_route","livre"].includes(g.statut)&&!g.refus_motif),j=w.length===0?0:Math.round(y.length/w.length*1e3)/10;return{total_missions:t.length,missions_livrees:o.length,missions_refusees:i.length,missions_en_cours:a.length,missions_dispos:d.length,gains_total:n(o),gains_mois:n(b(l)),gains_semaine:n(b(m)),gains_jour:n(b(x)),taux_acceptation:j,derniere_livraison:((v=o[0])==null?void 0:v.livre_at)||null}}function $a({user:e,userData:t,onClose:o,onSuccess:i}){const[a,d]=c.useState(1),[n,p]=c.useState({nom:(t==null?void 0:t.nom)||"",telephone:(t==null?void 0:t.telephone)||"",adresse_collecte:"",adresse_livraison:"",ville:(t==null?void 0:t.ville)||"Douala",colis_description:"",vehicule:"Moto",budget:"",urgence:"normal"}),[l,m]=c.useState({}),[x,b]=c.useState(!1),[w,y]=c.useState(""),j=()=>{const g={};return n.nom.trim()||(g.nom="Nom obligatoire"),n.telephone.trim()||(g.telephone="Téléphone obligatoire"),n.adresse_collecte.trim()||(g.adresse_collecte="Adresse de collecte obligatoire"),n.adresse_livraison.trim()||(g.adresse_livraison="Adresse de livraison obligatoire"),n.colis_description.trim()||(g.colis_description="Description du colis obligatoire"),m(g),Object.keys(g).length===0},v=async()=>{if(j()){b(!0);try{const{delivery:g,code:h}=await Ya({clientId:(e==null?void 0:e.id)||null,form:{nom:n.nom,telephone:n.telephone,adresse_collecte:n.adresse_collecte,adresse_livraison:n.adresse_livraison,ville:n.ville,colis_description:n.colis_description,vehicule:n.vehicule,urgence:n.urgence,budget:n.budget}}),k={normal:"🟢 Normal (30-60 min)",urgent:"🟠 Urgent (15-30 min)",express:"🔴 Express (< 15 min)"},M=["🚚 *NOUVELLE DEMANDE DE LIVRAISON YORIX*","","📦 *CODE DE SUIVI : "+h+"*","","👤 *CLIENT*","Nom : "+n.nom,"Téléphone : "+n.telephone,"Ville : "+n.ville,"","📍 *TRAJET*","🔴 Collecte : "+n.adresse_collecte,"🟢 Livraison : "+n.adresse_livraison,"","📦 *COLIS*","Description : "+n.colis_description,"Véhicule : "+n.vehicule,"Urgence : "+(k[n.urgence]||n.urgence),n.budget?"Budget proposé : "+n.budget+" FCFA":"Budget : À définir","","✅ *ACTIONS À FAIRE*","1. Assigner un livreur disponible","2. Confirmer le prix au client","3. Le client suit sa livraison sur yorix.cm/livraison avec le code "+h,"","Merci Yorix ! 🇨🇲"].join(`
`),T="https://wa.me/"+Ke+"?text="+encodeURIComponent(M);window.open(T,"_blank","noopener,noreferrer"),y(h),d(2),i==null||i(h,g)}catch(g){console.error("ModalDemandeLivraison:",g),alert("Erreur : "+((g==null?void 0:g.message)||"Impossible de créer la livraison"))}b(!1)}};return a===2?r.jsx("div",{className:"modal-overlay",onClick:g=>g.target===g.currentTarget&&o(),children:r.jsxs("div",{className:"modal",style:{maxWidth:480,textAlign:"center"},children:[r.jsx("button",{className:"modal-close",onClick:o,children:"✕"}),r.jsx("div",{style:{fontSize:"4rem",marginBottom:12},children:"🎉"}),r.jsx("h2",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.4rem",color:"var(--green)",marginBottom:8,letterSpacing:"-.3px"},children:"Demande envoyée !"}),r.jsxs("p",{style:{fontSize:".88rem",color:"var(--gray)",lineHeight:1.7,marginBottom:20},children:["Notre équipe va assigner un livreur et vous recontacter dans les ",r.jsx("strong",{children:"5 minutes"})," pour confirmer."]}),r.jsxs("div",{style:{background:"linear-gradient(135deg, var(--green-pale), #fef9e0)",border:"2px dashed var(--green)",borderRadius:12,padding:18,marginBottom:18},children:[r.jsx("div",{style:{fontSize:".7rem",color:"var(--gray)",fontWeight:700,marginBottom:5,letterSpacing:".05em"},children:"VOTRE CODE DE SUIVI"}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontSize:"1.8rem",fontWeight:800,color:"var(--green)",letterSpacing:".08em",marginBottom:10},children:w}),r.jsx("button",{onClick:()=>{var g;(g=navigator.clipboard)==null||g.writeText(w),alert("✅ Code copié !")},style:{background:"var(--surface)",color:"var(--ink)",border:"1.5px solid var(--border)",borderRadius:8,padding:"6px 14px",fontSize:".75rem",fontWeight:600,cursor:"pointer"},children:"📋 Copier le code"})]}),r.jsx("p",{style:{fontSize:".78rem",color:"var(--gray)",marginBottom:18,lineHeight:1.6},children:"💡 Conservez ce code pour suivre votre livraison en temps réel sur la page Livraison."}),r.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:[r.jsx("button",{onClick:o,style:{background:"var(--surface2)",color:"var(--ink)",border:"1.5px solid var(--border)",borderRadius:9,padding:"11px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".82rem"},children:"Fermer"}),r.jsx("button",{onClick:()=>{o(),window.location.href="/?page=livraison&code="+w},style:{background:"var(--green)",color:"#fff",border:"none",padding:"11px",borderRadius:9,cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem"},children:"📍 Suivre maintenant"})]})]})}):r.jsx("div",{className:"modal-overlay",onClick:g=>g.target===g.currentTarget&&o(),children:r.jsxs("div",{className:"modal",style:{maxWidth:560},children:[r.jsx("button",{className:"modal-close",onClick:o,children:"✕"}),r.jsxs("div",{style:{textAlign:"center",marginBottom:18},children:[r.jsx("div",{style:{fontSize:"2.8rem",marginBottom:6,background:"var(--green-pale)",width:72,height:72,borderRadius:"50%",display:"inline-flex",alignItems:"center",justifyContent:"center"},children:"📦"}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontSize:"1.3rem",fontWeight:800,color:"var(--ink)",marginTop:8,letterSpacing:"-.3px"},children:"Demander une livraison"}),r.jsx("p",{style:{fontSize:".82rem",color:"var(--gray)",marginTop:4},children:"Remplissez le formulaire, un livreur sera assigné en quelques minutes"})]}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",color:"var(--green)",marginBottom:8,marginTop:4},children:"👤 Vos coordonnées"}),r.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14},children:[r.jsxs("div",{className:"form-group",style:{marginBottom:0},children:[r.jsxs("label",{className:"form-label",children:["Nom ",r.jsx("span",{children:"*"})]}),r.jsx("input",{className:"form-input"+(l.nom?" error":""),placeholder:"Votre nom",value:n.nom,onChange:g=>p(h=>({...h,nom:g.target.value}))}),l.nom&&r.jsx("span",{className:"form-error-text",children:l.nom})]}),r.jsxs("div",{className:"form-group",style:{marginBottom:0},children:[r.jsxs("label",{className:"form-label",children:["Téléphone ",r.jsx("span",{children:"*"})]}),r.jsx("input",{className:"form-input"+(l.telephone?" error":""),placeholder:"+237 6XX XXX XXX",value:n.telephone,onChange:g=>p(h=>({...h,telephone:g.target.value}))}),l.telephone&&r.jsx("span",{className:"form-error-text",children:l.telephone})]})]}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",color:"var(--green)",marginBottom:8},children:"📍 Adresses"}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{className:"form-label",children:["🔴 Adresse de collecte ",r.jsx("span",{children:"*"})]}),r.jsx("input",{className:"form-input"+(l.adresse_collecte?" error":""),placeholder:"Ex: Marché Central, Douala",value:n.adresse_collecte,onChange:g=>p(h=>({...h,adresse_collecte:g.target.value}))}),l.adresse_collecte&&r.jsx("span",{className:"form-error-text",children:l.adresse_collecte})]}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{className:"form-label",children:["🟢 Adresse de livraison ",r.jsx("span",{children:"*"})]}),r.jsx("input",{className:"form-input"+(l.adresse_livraison?" error":""),placeholder:"Ex: Akwa Nord, Rue Bonanjo, Douala",value:n.adresse_livraison,onChange:g=>p(h=>({...h,adresse_livraison:g.target.value}))}),l.adresse_livraison&&r.jsx("span",{className:"form-error-text",children:l.adresse_livraison})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Ville"}),r.jsx("select",{className:"form-select",value:n.ville,onChange:g=>p(h=>({...h,ville:g.target.value})),children:ka.filter(g=>g!=="Toutes les villes").map(g=>r.jsx("option",{value:g,children:g},g))})]}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",color:"var(--green)",marginBottom:8,marginTop:4},children:"📦 Détails du colis"}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{className:"form-label",children:["Description du colis ",r.jsx("span",{children:"*"})]}),r.jsx("textarea",{className:"form-textarea"+(l.colis_description?" error":""),style:{minHeight:60},placeholder:"Ex: Enveloppe de documents, Carton de 5kg, Sac à main...",value:n.colis_description,onChange:g=>p(h=>({...h,colis_description:g.target.value}))}),l.colis_description&&r.jsx("span",{className:"form-error-text",children:l.colis_description})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Type de véhicule"}),r.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6},children:[{id:"Moto",icon:"🏍️",label:"Moto",sub:"Petits colis"},{id:"Voiture",icon:"🚗",label:"Voiture",sub:"Colis moyens"},{id:"Minibus",icon:"🚐",label:"Minibus",sub:"Gros volume"}].map(g=>r.jsxs("div",{onClick:()=>p(h=>({...h,vehicule:g.id})),style:{border:"2px solid "+(n.vehicule===g.id?"var(--green)":"var(--border)"),background:n.vehicule===g.id?"var(--green-pale)":"var(--surface)",borderRadius:9,padding:"10px 6px",cursor:"pointer",textAlign:"center",transition:"all .2s"},children:[r.jsx("div",{style:{fontSize:"1.4rem",marginBottom:3},children:g.icon}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem",color:"var(--ink)"},children:g.label}),r.jsx("div",{style:{fontSize:".62rem",color:"var(--gray)"},children:g.sub})]},g.id))})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Niveau d'urgence"}),r.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6},children:[{id:"normal",icon:"🟢",label:"Normal",time:"30-60 min"},{id:"urgent",icon:"🟠",label:"Urgent",time:"15-30 min"},{id:"express",icon:"🔴",label:"Express",time:"< 15 min"}].map(g=>r.jsxs("div",{onClick:()=>p(h=>({...h,urgence:g.id})),style:{border:"2px solid "+(n.urgence===g.id?"var(--green)":"var(--border)"),background:n.urgence===g.id?"var(--green-pale)":"var(--surface)",borderRadius:9,padding:"10px 6px",cursor:"pointer",textAlign:"center",transition:"all .2s"},children:[r.jsx("div",{style:{fontSize:"1.1rem",marginBottom:2},children:g.icon}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".76rem",color:"var(--ink)"},children:g.label}),r.jsx("div",{style:{fontSize:".62rem",color:"var(--gray)"},children:g.time})]},g.id))})]}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{className:"form-label",children:["Budget proposé (FCFA) ",r.jsx("span",{style:{color:"var(--gray)",fontSize:".7rem"},children:"— optionnel"})]}),r.jsx("input",{className:"form-input",type:"number",placeholder:"Ex: 2000 (laisser vide = à définir avec livreur)",value:n.budget,onChange:g=>p(h=>({...h,budget:g.target.value}))}),r.jsx("div",{style:{fontSize:".68rem",color:"var(--gray)",marginTop:4,lineHeight:1.5},children:"💡 Tarifs indicatifs : Intra-ville 500-1500 F · Inter-quartiers 1500-3000 F · Inter-villes 3000-8000 F"})]}),r.jsx("button",{className:"form-submit",onClick:v,disabled:x,style:{marginTop:8},children:x?r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"spinner",style:{width:16,height:16,borderWidth:2}}),"Envoi en cours..."]}):"📦 Envoyer ma demande"}),r.jsx("p",{style:{fontSize:".7rem",color:"var(--gray)",textAlign:"center",marginTop:10,lineHeight:1.5},children:"🔒 Vos informations sont sécurisées · Paiement à la livraison"})]})})}function Ba({user:e,userData:t,initialProduct:o=null,onClose:i,isModal:a=!1}){const[d,n]=c.useState([]),[p,l]=c.useState(null),[m,x]=c.useState([]),[b,w]=c.useState(""),[y,j]=c.useState(!0),[v,g]=c.useState(!1),[h,k]=c.useState(!1),[M,T]=c.useState(""),O=c.useRef(null);c.useEffect(()=>{o!=null&&o.vendeur_id&&(e!=null&&e.id)&&o.vendeur_id!==e.id&&L(o.vendeur_id,o.id)},[o==null?void 0:o.id,e==null?void 0:e.id]),c.useEffect(()=>{e!=null&&e.id&&N()},[e==null?void 0:e.id]);const N=async()=>{j(!0);try{const{data:E,error:I}=await _.from("conversations").select("*").or(`user1_id.eq.${e.id},user2_id.eq.${e.id}`).order("last_message_at",{ascending:!1});if(I)throw I;n(E||[])}catch(E){console.warn("Chargement conversations:",E.message)}j(!1)},L=async(E,I=null)=>{if(!(e!=null&&e.id)||!E||e.id===E)return;const[U,ee]=e.id<E?[e.id,E]:[E,e.id];try{let P=_.from("conversations").select("*").eq("user1_id",U).eq("user2_id",ee);I?P=P.eq("product_id",I):P=P.is("product_id",null);const{data:ue}=await P.maybeSingle();if(ue){l(ue.id),await N();return}const{data:ie,error:ae}=await _.from("conversations").insert({user1_id:U,user2_id:ee,product_id:I}).select().single();if(ae)throw ae;l(ie.id),await N()}catch(P){console.error("startConversation:",P),alert("Erreur : "+P.message)}};c.useEffect(()=>{if(!p){x([]);return}se()},[p]);const se=async()=>{try{const{data:E,error:I}=await _.from("messages").select("*").eq("conversation_id",p).order("created_at",{ascending:!0});if(I)throw I;x(E||[])}catch(E){console.warn("Chargement messages:",E.message)}};c.useEffect(()=>{if(!p)return;const E=_.channel(`chat-${p}`).on("postgres_changes",{event:"INSERT",schema:"public",table:"messages",filter:`conversation_id=eq.${p}`},I=>{x(U=>U.some(ee=>ee.id===I.new.id)?U:[...U,I.new])}).subscribe();return()=>{_.removeChannel(E)}},[p]),c.useEffect(()=>{var E;(E=O.current)==null||E.scrollIntoView({behavior:"smooth"})},[m]);const X=async()=>{if(!b.trim()||!p||v)return;const E=_a(b);if(E!=null&&E.bloque){k(!0),T(E.raison||"Partage de contact interdit"),setTimeout(()=>k(!1),5e3),e&&_.from("fraud_logs").insert({type:"tentative_contournement_chat",user_id:e.id,message:b}).then(({error:I})=>{I&&console.warn("fraud_logs:",I.message)});return}g(!0);try{const{data:I,error:U}=await _.from("messages").insert({conversation_id:p,sender_id:e.id,content:b.trim()}).select().single();if(U)throw U;x(ee=>ee.some(P=>P.id===I.id)?ee:[...ee,I]),w("")}catch(I){alert("Erreur envoi : "+I.message)}g(!1)},V=E=>E.user1_id===e.id?E.user2_id:E.user1_id;if(!e)return r.jsx("div",{style:{padding:30,textAlign:"center",color:"var(--gray)"},children:"🔐 Connectez-vous pour accéder à la messagerie."});const xe=a?{background:"var(--surface)",borderRadius:13,overflow:"hidden",height:"80vh",maxHeight:600,display:"flex",width:"100%"}:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:13,overflow:"hidden",height:500,display:"flex"};return r.jsxs("div",{style:xe,children:[r.jsxs("div",{style:{width:240,borderRight:"1px solid var(--border)",background:"var(--surface2)",display:"flex",flexDirection:"column"},children:[r.jsx("div",{style:{padding:"12px 14px",borderBottom:"1px solid var(--border)",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".85rem",color:"var(--ink)"},children:"💬 Conversations"}),r.jsx("div",{style:{flex:1,overflowY:"auto"},children:y?r.jsx("div",{style:{padding:20,textAlign:"center",color:"var(--gray)",fontSize:".78rem"},children:"Chargement..."}):d.length===0?r.jsxs("div",{style:{padding:20,textAlign:"center",color:"var(--gray)",fontSize:".75rem",lineHeight:1.6},children:["Aucune conversation.",r.jsx("br",{}),r.jsx("br",{}),'Clique sur "Contacter le vendeur" depuis un produit.']}):d.map(E=>r.jsxs("div",{onClick:()=>l(E.id),style:{padding:"10px 12px",cursor:"pointer",borderBottom:"1px solid var(--border)",background:p===E.id?"var(--green-pale)":"transparent"},children:[r.jsxs("div",{style:{fontWeight:600,fontSize:".8rem",color:"var(--ink)"},children:["👤 ",V(E).slice(0,8),"..."]}),r.jsx("div",{style:{fontSize:".65rem",color:"var(--gray)",marginTop:2},children:E.last_message_at?new Date(E.last_message_at).toLocaleString("fr-FR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}):"Nouveau"}),E.product_id&&r.jsx("div",{style:{fontSize:".6rem",color:"var(--green)",marginTop:3,fontWeight:600},children:"🛍️ Sur un produit"})]},E.id))})]}),r.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column"},children:[r.jsxs("div",{style:{padding:"12px 16px",borderBottom:"1px solid var(--border)",background:"var(--green)",color:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[r.jsxs("div",{children:[r.jsx("div",{style:{fontWeight:700,fontSize:".88rem"},children:p?"💬 Conversation":"Sélectionne une conversation"}),r.jsx("div",{style:{fontSize:".68rem",opacity:.85},children:"🔒 Messagerie sécurisée · Partage de contact interdit"})]}),i&&r.jsx("button",{onClick:i,style:{background:"rgba(255,255,255,.15)",color:"#fff",border:"none",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:"1rem"},children:"✕"})]}),r.jsxs("div",{style:{flex:1,overflowY:"auto",padding:14,background:"var(--surface)",display:"flex",flexDirection:"column",gap:8},children:[p?m.length===0?r.jsxs("div",{style:{textAlign:"center",color:"var(--gray)",marginTop:60,fontSize:".85rem"},children:["Aucun message.",r.jsx("br",{}),"Envoie le premier ! 👇"]}):m.map(E=>{const I=E.sender_id===e.id;return r.jsxs("div",{style:{alignSelf:I?"flex-end":"flex-start",maxWidth:"75%",background:I?"var(--green)":"var(--surface2)",color:I?"#fff":"var(--ink)",padding:"8px 12px",borderRadius:I?"12px 12px 3px 12px":"12px 12px 12px 3px",fontSize:".85rem",lineHeight:1.4,wordBreak:"break-word"},children:[r.jsx("div",{children:E.content}),r.jsxs("div",{style:{fontSize:".6rem",opacity:.7,marginTop:3,textAlign:I?"right":"left"},children:[new Date(E.created_at).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),I&&(E.is_read?" ✓✓":" ✓")]})]},E.id)}):r.jsx("div",{style:{textAlign:"center",color:"var(--gray)",marginTop:60,fontSize:".85rem"},children:"👈 Sélectionne une conversation à gauche"}),h&&r.jsxs("div",{style:{background:"#fee2e2",border:"1px solid #fca5a5",borderRadius:9,padding:"10px 14px",color:"#991b1b",fontSize:".78rem",textAlign:"center",margin:"8px 0",lineHeight:1.5},children:["🚫 ",r.jsx("strong",{children:"Message bloqué"}),r.jsx("br",{}),M||"Partage de contacts externes interdit sur Yorix",r.jsx("br",{}),r.jsx("span",{style:{fontSize:".7rem",opacity:.8},children:"Utilise la messagerie Yorix pour tes échanges."})]}),r.jsx("div",{ref:O})]}),p&&r.jsxs("div",{style:{padding:10,borderTop:"1px solid var(--border)",display:"flex",gap:7,background:"var(--surface)"},children:[r.jsx("input",{type:"text",placeholder:"Écris ton message...",value:b,onChange:E=>w(E.target.value),onKeyDown:E=>{E.key==="Enter"&&!v&&X()},disabled:v,style:{flex:1,border:"1.5px solid var(--border)",borderRadius:8,padding:"9px 12px",fontFamily:"'DM Sans',sans-serif",fontSize:".83rem",outline:"none",background:"var(--surface2)",color:"var(--ink)"}}),r.jsx("button",{onClick:X,disabled:v||!b.trim(),style:{background:"var(--green)",color:"#fff",border:"none",width:40,height:40,borderRadius:8,cursor:v||!b.trim()?"not-allowed":"pointer",fontSize:"1rem",opacity:v||!b.trim()?.5:1},children:v?"...":"➤"})]})]})]})}const Fa="modulepreload",Ua=function(e){return"/"+e},Et={},D=function(t,o,i){let a=Promise.resolve();if(o&&o.length>0){document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),p=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));a=Promise.allSettled(o.map(l=>{if(l=Ua(l),l in Et)return;Et[l]=!0;const m=l.endsWith(".css"),x=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${x}`))return;const b=document.createElement("link");if(b.rel=m?"stylesheet":Fa,m||(b.as="script"),b.crossOrigin="",b.href=l,p&&b.setAttribute("nonce",p),document.head.appendChild(b),m)return new Promise((w,y)=>{b.addEventListener("load",w),b.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${l}`)))})}))}function d(n){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=n,window.dispatchEvent(p),!p.defaultPrevented)throw n}return a.then(n=>{for(const p of n||[])p.status==="rejected"&&d(p.reason);return t().catch(d)})};function Y({minHeight:e=200,label:t="Chargement..."}){return r.jsxs("div",{className:"loading",style:{minHeight:e,justifyContent:"center",padding:"24px 0"},children:[r.jsx("div",{className:"spinner"}),t]})}const Wa=c.lazy(()=>D(()=>import("./HomePage-BlNChdsL.js"),__vite__mapDeps([0,1,2,3,4,5,6])).then(e=>({default:e.HomePage}))),Va=c.lazy(()=>D(()=>import("./ProductRouteSections-C6pAf5PK.js"),__vite__mapDeps([7,2,1,3,4,5,6])).then(e=>({default:e.ProductRouteSections}))),Ha=c.lazy(()=>D(()=>import("./LivraisonPage-C7oKiiaw.js"),__vite__mapDeps([8,1,6])).then(e=>({default:e.LivraisonPage}))),Xa=c.lazy(()=>D(()=>import("./SiteMarketingPages-BwViIUNy.js"),__vite__mapDeps([9,1,6])).then(e=>({default:e.SiteMarketingPages})));c.lazy(()=>D(()=>import("./LivraisonLazyBlocks-3PG2emD2.js"),__vite__mapDeps([10,1,6])).then(e=>({default:e.LivraisonTopInteractive})));c.lazy(()=>D(()=>import("./LivraisonLazyBlocks-3PG2emD2.js"),__vite__mapDeps([10,1,6])).then(e=>({default:e.LivraisonBottomInteractive})));const Ga=c.lazy(()=>D(()=>import("./FicheProduit-CheIJdRB.js"),__vite__mapDeps([11,1,3,4,5,6])).then(e=>({default:e.FicheProduit}))),Ja=c.lazy(()=>D(()=>import("./PrestPage-CgVhUGOm.js"),__vite__mapDeps([12,1,6])).then(e=>({default:e.PrestPage}))),Ka=c.lazy(()=>D(()=>import("./CheckoutPage-DWPNu13H.js"),__vite__mapDeps([13,1,5,14,6])).then(e=>({default:e.CheckoutPage}))),Qa=c.lazy(()=>D(()=>import("./CartPage-BFvbyqFO.js"),__vite__mapDeps([15,3,1,14,6])).then(e=>({default:e.CartPage}))),Za=c.lazy(()=>D(()=>import("./AcademyDetail-C3xVCJBS.js"),__vite__mapDeps([16,1,6])).then(e=>({default:e.AcademyDetail}))),en=c.lazy(()=>D(()=>import("./AcademyContactForm-HxOJRF05.js"),__vite__mapDeps([17,1,6])).then(e=>({default:e.AcademyContactForm}))),rn=c.lazy(()=>D(()=>import("./LoyaltyPage-CBWJnfoR.js"),__vite__mapDeps([18,1,6])).then(e=>({default:e.LoyaltyPage}))),tn=c.lazy(()=>D(()=>import("./SellerDashboard-CKNSaC5b.js"),__vite__mapDeps([19,1,6])).then(e=>({default:e.SellerDashboard}))),on=c.lazy(()=>D(()=>import("./BuyerDashboard-rd_8a4OC.js"),__vite__mapDeps([20,1,6])).then(e=>({default:e.BuyerDashboard}))),an=c.lazy(()=>D(()=>import("./DeliveryDashboard-B1Hm4WoO.js"),__vite__mapDeps([21,1,6])).then(e=>({default:e.DeliveryDashboard}))),nn=c.lazy(()=>D(()=>import("./ProviderDashboard-DAXtxf6z.js"),__vite__mapDeps([22,1,6])).then(e=>({default:e.ProviderDashboard}))),sn=c.lazy(()=>D(()=>import("./AdminDashboard-BNI4Ol2p.js"),__vite__mapDeps([23,1,6])).then(e=>({default:e.AdminDashboard}))),ln=c.lazy(()=>D(()=>import("./NotificationsPage-L7JzUV8E.js"),__vite__mapDeps([24,1,6])).then(e=>({default:e.NotificationsPage}))),dn=c.lazy(()=>D(()=>import("./PromotionsPage-CjGOzjcy.js"),__vite__mapDeps([25,1,6])).then(e=>({default:e.PromotionsPage})));function Kt(e){if(!e||e.id==null)return null;const t=e.kind||"product",o=Math.max(1,Number(e.qty||1)),i=Number(e.prix??e.price??0),a=e.fulfillmentMode||(t==="service"?"booking":"delivery");return{...e,kind:t,qty:o,prix:i,fulfillmentMode:a}}function Dr(){return{freeShippingThresholdXaf:(Number.isFinite(NaN),5e4),standardDeliveryFeeXaf:(Number.isFinite(NaN),1500)}}function Qt(e){const t=Dr(),o=e==null?void 0:e.freeShippingThresholdXaf,i=e==null?void 0:e.standardDeliveryFeeXaf;return{freeShippingThresholdXaf:o!=null&&Number.isFinite(Number(o))&&Number(o)>=0?Number(o):t.freeShippingThresholdXaf,standardDeliveryFeeXaf:i!=null&&Number.isFinite(Number(i))&&Number(i)>=0?Number(i):t.standardDeliveryFeeXaf}}function cn(e){return(e||[]).map(Kt).filter(Boolean).filter(o=>o.kind==="product"&&o.fulfillmentMode!=="pickup").reduce((o,i)=>o+i.prix*i.qty,0)}function pn(e,t){let o=Dr();typeof t=="number"&&Number.isFinite(t)?o={...o,standardDeliveryFeeXaf:t}:t&&typeof t=="object"&&(o=Qt(t));const i=(e||[]).map(Kt).filter(Boolean),a=i.filter(k=>k.kind==="product"),d=i.filter(k=>k.kind==="service"),n=a.reduce((k,M)=>k+M.prix*M.qty,0),p=d.reduce((k,M)=>k+M.prix*M.qty,0),l=n+p,m=i.reduce((k,M)=>k+M.qty,0),x=cn(i),b=x>0,w=o.freeShippingThresholdXaf,y=o.standardDeliveryFeeXaf,j=b&&x>=w,v=b&&!j?Math.round(y):0,g=j||!b?0:Math.max(0,Math.round(w-x)),h=!b||w<=0?null:Math.min(1,x/w);return{qty:m,productsCount:a.length,servicesCount:d.length,productsSubtotal:n,servicesSubtotal:p,shippableProductsSubtotal:x,subtotal:l,delivery:v,total:l+v,policyThreshold:w,policyStandardFee:y,hasShippableProducts:b,freeShippingUnlocked:j,amountRemainingForFreeShipping:g,freeShippingProgress01:h,freeShippingNotApplicable:!b}}function ls(e,t,o,i=4){const a=Math.max(1,Number(i)||4),d=new Set((e||[]).map(y=>y.id)),n=(t||[]).filter(y=>(y==null?void 0:y.id)!=null&&!d.has(y.id)),p=o==null?void 0:o.hasShippableProducts,l=o==null?void 0:o.freeShippingUnlocked,m=(o==null?void 0:o.amountRemainingForFreeShipping)||0;if(!p||l||n.length===0)return n.slice(0,a);const b=n.map(y=>{const j=Number(y.prix||0),v=j>=m;return{p:y,price:j,coversGap:v,delta:v?j-m:m-j}}).filter(y=>y.price>0).sort((y,j)=>y.coversGap!==j.coversGap?y.coversGap?-1:1:y.delta-j.delta).slice(0,a).map(y=>y.p);if(b.length>=a)return b;const w=n.filter(y=>!b.some(j=>j.id===y.id)).slice(0,a-b.length);return[...b,...w]}const Zt="yorix_cart";function gn(){try{const e=localStorage.getItem(Zt);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t.map(ir).filter(Boolean):[]}catch{return[]}}function fn(e){try{localStorage.setItem(Zt,JSON.stringify(e||[]))}catch{}}function ir(e){if(!e||!e.id)return null;const t=e.kind||"product";return{...e,kind:t,qty:Math.max(1,Number(e.qty||1)),prix:Number(e.prix||0),fulfillmentMode:e.fulfillmentMode||(t==="service"?"booking":"delivery")}}function mn(e){if(!(e!=null&&e.id))return null;let t=[];if(Array.isArray(e.image_urls))t=e.image_urls;else if(typeof e.image_urls=="string")try{t=JSON.parse(e.image_urls)}catch{t=[]}const o=e.image&&String(e.image).startsWith("http")?e.image:t[0]&&String(t[0]).startsWith("http")?t[0]:null;return ir({id:e.id,kind:"product",name:e.name_fr||e.name||"Produit",image:o,prix:Number(e.prix||0),qty:1,vendeur_id:e.vendeur_id||null,vendeur_nom:e.vendeur_nom||"",categorie:e.categorie||"",ville:e.ville||"",stock:e.stock??null,fulfillmentMode:"delivery",pricingSnapshot:{base:Number(e.prix||0),currency:"XAF"}})}function xn(e){return e!=null&&e.id?ir({id:e.id,kind:"service",name:e.name||e.provider_nom||e.metier||"Prestation",image:e.photo||null,prix:Number(e.prix_number||e.prix||0),qty:1,provider_id:e.provider_id||null,provider_nom:e.provider_nom||e.name||"",categorie:e.categorie||"Service",ville:e.ville||"",booking:{date:"",time:"",locationType:"home",notes:""},fulfillmentMode:"booking",pricingSnapshot:{base:Number(e.prix_number||e.prix||0),currency:"XAF"}}):null}function At(e,t){const o=ir(t);if(!o)return e||[];const i=Array.isArray(e)?e:[],a=i.findIndex(d=>d.id===o.id&&d.kind===o.kind);return a===-1?[...i,o]:i.map((d,n)=>n!==a?d:{...d,qty:d.kind==="service"?1:Math.max(1,d.qty+o.qty)})}function un(e,t,o,i){return(e||[]).map(a=>a.id!==t||o&&a.kind!==o?a:a.kind==="service"?{...a,qty:1}:{...a,qty:Math.max(1,Number(a.qty||1)+i)})}function bn(e,t,o){return(e||[]).filter(i=>!(i.id===t&&(!o||i.kind===o)))}function hn(e,t=1500){return pn(e,t)}const S={messages:"messages",orders:"orders",payments:"payments",delivery:"delivery",security:"security",promotions:"promotions",system:"system",business:"business",admin:"admin"},$={critical:"critical",important:"important",standard:"standard",promo:"promo"},yn=[{test:e=>/admin|incident|réclamation|reclamation|staff yorix|paiement bloqué/i.test(e||""),category:S.admin,priority:$.critical},{test:e=>/business|b2b|partenaire|yorix business/i.test(e||""),category:S.business,priority:$.important},{test:e=>/payment|paiement|checkout|cinetpay|escrow/i.test(e||""),category:S.payments,priority:$.critical},{test:e=>/security|fraud|litige|connexion|login|suspicious/i.test(e||""),category:S.security,priority:$.critical},{test:e=>/deliver|livraison|livreur|shipping|colis/i.test(e||""),category:S.delivery,priority:$.important},{test:e=>/order|commande|booking|réservation|prestation|service_booking/i.test(e||""),category:S.orders,priority:$.important},{test:e=>/message|chat|support|conversation/i.test(e||""),category:S.messages,priority:$.important},{test:e=>/promo|offre|soldes|flash/i.test(e||""),category:S.promotions,priority:$.promo}],vn={[S.messages]:"💬",[S.orders]:"📦",[S.payments]:"💳",[S.delivery]:"🚚",[S.security]:"🛡️",[S.promotions]:"🏷️",[S.system]:"🔔",[S.business]:"💼",[S.admin]:"⚙️"};function wn(e){if(e==null||e==="")return $.standard;const t=String(e).toLowerCase();return t==="urgent"||t==="critical"?$.critical:t==="high"||t==="important"?$.important:t==="normal"||t==="standard"?$.standard:t==="promo"||t==="promotion"?$.promo:$.standard}function kn(e,t,o){const i=`${e||""} ${t||""} ${o||""}`;for(const a of yn)if(a.test(i))return{category:a.category,priority:a.priority};return{category:S.system,priority:$.standard}}function jn(e){return e==null?"":String(e).replace(/https?:\/\/[^\s]+/g,t=>{try{const o=new URL(t);return o.hostname.includes("wa.me")||o.hostname.includes("whatsapp")?"Lien WhatsApp":o.hostname.includes("yorix")?"Ouvrir sur Yorix":`[${o.hostname}]`}catch{return"Lien"}})}function qr(e){const t=e.type||"",o=String(e.titre||e.title||""),i=kn(t,o,e.message),a=e.category||i.category,d=wn(e.priority||i.priority);return{...e,_category:a,_priority:d,_icon:e.icon||vn[a]||"🔔",_title:o||"Notification Yorix",_body:jn(e.message),_image:e.image_url||typeof e.metadata=="object"&&e.metadata!==null&&e.metadata.image_url||null,_deeplink:typeof e.link=="string"?e.link.trim():"",_timeLabel:e.created_at?new Date(e.created_at).toLocaleString("fr-FR",{dateStyle:"short",timeStyle:"short"}):""}}function Sn(e,t){return!t||t==="all"?e:(e||[]).filter(o=>qr(o)._category===t)}function zn(e,t){if(typeof window>"u"||typeof Notification>"u"||Notification.permission!=="granted"||!(t!=null&&t.pushBrowser))return;const o=e._category||S.system;if(!(t.categories&&t.categories[o]===!1))try{new Notification(e._title,{body:(e._body||"").slice(0,180),icon:"/favicon.svg",tag:String(e.id||e.created_at||"yorix"),silent:!(t!=null&&t.sound)})}catch{}}const eo="yorix_notification_prefs_v1",Xe=()=>({pushBrowser:!0,sound:!1,email:!1,sms:!1,whatsappDigest:!1,categories:{[S.messages]:!0,[S.orders]:!0,[S.payments]:!0,[S.delivery]:!0,[S.security]:!0,[S.promotions]:!0,[S.system]:!0,[S.business]:!0,[S.admin]:!0}});function Q(){try{const e=localStorage.getItem(eo);if(!e)return Xe();const t=JSON.parse(e);return{...Xe(),...t,categories:{...Xe().categories,...t.categories||{}}}}catch{return Xe()}}function ro(e){try{const t=Q(),o={...t,...e,categories:{...t.categories,...e.categories||{}}};return localStorage.setItem(eo,JSON.stringify(o)),o}catch{return Q()}}function Cn(e){return e?{pushBrowser:e.push_enabled!==!1&&e.desktop_alerts!==!1,sound:e.sound_enabled===!0,email:e.email_critical===!0,sms:e.sms_critical===!0,whatsappDigest:e.whatsapp_critical!==!1,categories:{[S.messages]:e.category_messages!==!1,[S.orders]:e.category_orders!==!1,[S.payments]:e.category_payments!==!1,[S.delivery]:e.category_delivery!==!1,[S.security]:e.category_security!==!1,[S.promotions]:e.category_promotions!==!1,[S.system]:e.category_system!==!1,[S.business]:e.category_business!==!1,[S.admin]:e.category_admin!==!1}}:null}function to(e,t){const o=t.categories||{};return{user_id:e,push_enabled:t.pushBrowser!==!1,desktop_alerts:t.pushBrowser!==!1,sound_enabled:t.sound===!0,email_critical:t.email===!0,sms_critical:t.sms===!0,whatsapp_critical:t.whatsappDigest!==!1,category_messages:o[S.messages]!==!1,category_orders:o[S.orders]!==!1,category_payments:o[S.payments]!==!1,category_delivery:o[S.delivery]!==!1,category_security:o[S.security]!==!1,category_promotions:o[S.promotions]!==!1,category_system:o[S.system]!==!1,category_business:o[S.business]!==!1,category_admin:o[S.admin]!==!1,updated_at:new Date().toISOString()}}async function oo(e,t){if(!(e!=null&&e.from)||!t)return Q();try{const{data:o,error:i}=await e.from("notification_preferences").select("*").eq("user_id",t).maybeSingle();if(i)return console.warn("[notification_prefs] load:",i.message),Q();if(o){const p=Cn(o);return p&&ro(p),p||Q()}const a=Q(),d=to(t,a),{error:n}=await e.from("notification_preferences").upsert(d,{onConflict:"user_id"});return n&&console.warn("[notification_prefs] seed:",n.message),a}catch(o){return console.warn("[notification_prefs]",(o==null?void 0:o.message)||o),Q()}}async function _n(e,t,o){const i=ro(o);if(!(e!=null&&e.from)||!t)return i;try{const a=to(t,i),{error:d}=await e.from("notification_preferences").upsert(a,{onConflict:"user_id"});d&&console.warn("[notification_prefs] save:",d.message)}catch(a){console.warn("[notification_prefs] save",(a==null?void 0:a.message)||a)}return i}function En(e){const t="=".repeat((4-e.length%4)%4),o=(e+t).replace(/-/g,"+").replace(/_/g,"/"),i=atob(o),a=new Uint8Array(i.length);for(let d=0;d<i.length;++d)a[d]=i.charCodeAt(d);return a}function An({user:e,compact:t=!1}){const[o,i]=c.useState("loading"),[a,d]=c.useState(null),n="BHYax0YuzkC8V_07eVRTEathfnPPJCOh6uUocRG-tmcOu-etHRdAUm_nvOnXYi7OhbJfWJTYf_gkN4v2JA6SuWQ";c.useEffect(()=>{p()},[e==null?void 0:e.id]);async function p(){if(!("serviceWorker"in navigator)||!("PushManager"in window)){i("unsupported");return}if(Notification.permission==="denied"){i("denied");return}try{const y=await(await navigator.serviceWorker.ready).pushManager.getSubscription();i(y?"subscribed":"unsubscribed")}catch(w){console.error("[PushManager] Erreur check :",w),i("unsubscribed")}}async function l(){var w,y;if(!(e!=null&&e.id)){d("Vous devez être connecté");return}i("pending"),d(null);try{const j=await Notification.requestPermission();if(j!=="granted"){i(j==="denied"?"denied":"unsubscribed");return}const v=await navigator.serviceWorker.ready;let g=await v.pushManager.getSubscription();g||(g=await v.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:En(n)}));const h=g.toJSON(),k=h.endpoint||g.endpoint,M=(w=h.keys)==null?void 0:w.p256dh,T=(y=h.keys)==null?void 0:y.auth;if(!k||!M||!T)throw new Error("Abonnement invalide (clés manquantes)");const{error:O}=await _.from("push_subscriptions").upsert({user_id:e.id,endpoint:k,p256dh:M,auth:T,user_agent:navigator.userAgent.slice(0,300)},{onConflict:"endpoint"});if(O)throw console.error("[PushManager] Erreur Supabase :",O),new Error("Erreur enregistrement : "+O.message);i("subscribed"),console.log("[PushManager] ✅ Abonné aux push notifications")}catch(j){console.error("[PushManager] Erreur abonnement :",j),d(j.message||"Erreur lors de l'abonnement"),i("unsubscribed")}}async function m(){i("pending"),d(null);try{const y=await(await navigator.serviceWorker.ready).pushManager.getSubscription();if(y){const j=y.endpoint,{error:v}=await _.from("push_subscriptions").delete().eq("endpoint",j);v&&console.warn("[PushManager] Erreur delete Supabase :",v),await y.unsubscribe()}i("unsubscribed"),console.log("[PushManager] ✅ Désabonné des push")}catch(w){console.error("[PushManager] Erreur désabonnement :",w),d(w.message||"Erreur lors du désabonnement"),i("subscribed")}}if(!(e!=null&&e.id))return null;const x={padding:t?"10px 12px":"14px 16px",background:"var(--surface2, #f6f6f6)",borderRadius:12,border:"1px solid var(--border, #e5e5e5)",marginBottom:12,fontSize:t?13:14},b={padding:"8px 14px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:600,fontSize:13,marginTop:8,width:"100%"};return o==="loading"?r.jsx("div",{style:x,children:r.jsx("div",{style:{color:"var(--gray, #666)"},children:"⏳ Vérification..."})}):o==="unsupported"?r.jsxs("div",{style:x,children:[r.jsx("div",{style:{color:"var(--gray, #666)"},children:"ℹ️ Votre navigateur ne supporte pas les notifications push."}),r.jsx("div",{style:{fontSize:11,color:"var(--gray, #999)",marginTop:4},children:"Utilisez Chrome, Firefox ou Edge pour activer cette fonctionnalité."})]}):o==="denied"?r.jsxs("div",{style:x,children:[r.jsx("div",{style:{color:"#c62828"},children:"🔕 Notifications bloquées"}),r.jsx("div",{style:{fontSize:11,color:"var(--gray, #666)",marginTop:4},children:"Vous avez refusé les notifications. Pour les réactiver, allez dans les paramètres de votre navigateur (🔒 icône à gauche de l'URL)."})]}):o==="subscribed"?r.jsxs("div",{style:x,children:[r.jsx("div",{style:{color:"var(--green, #2e7d32)",fontWeight:600},children:"🔔 Notifications activées"}),r.jsx("div",{style:{fontSize:11,color:"var(--gray, #666)",marginTop:4},children:"Vous recevrez des alertes pour les nouveaux messages et produits."}),r.jsx("button",{style:{...b,background:"var(--surface, #fff)",border:"1px solid var(--border, #ddd)",color:"var(--ink, #222)"},onClick:m,children:"🔕 Désactiver les notifications"}),a&&r.jsxs("div",{style:{color:"#c62828",fontSize:12,marginTop:6},children:["⚠️ ",a]})]}):o==="pending"?r.jsx("div",{style:x,children:r.jsx("div",{style:{color:"var(--gray, #666)"},children:"⏳ En cours..."})}):r.jsxs("div",{style:x,children:[r.jsx("div",{style:{fontWeight:600,marginBottom:4},children:"🔔 Activer les notifications"}),r.jsx("div",{style:{fontSize:12,color:"var(--gray, #666)",marginBottom:8},children:"Soyez alerté dès qu'un client vous envoie un message ou qu'un nouveau produit est ajouté."}),r.jsx("button",{style:{...b,background:"var(--green, #2e7d32)",color:"#fff"},onClick:l,children:"✅ Activer maintenant"}),a&&r.jsxs("div",{style:{color:"#c62828",fontSize:12,marginTop:6},children:["⚠️ ",a]})]})}const Tn=[{key:"all",label:"Tous"},{key:S.messages,label:"Messages"},{key:S.orders,label:"Commandes"},{key:S.payments,label:"Paiements"},{key:S.delivery,label:"Livraison"},{key:S.business,label:"Business"},{key:S.admin,label:"Admin"},{key:S.security,label:"Sécurité"},{key:S.promotions,label:"Promos"},{key:S.system,label:"Système"}];function Nn(e){return e===$.critical||e==="urgent"?"notif-card-priority-critical":e===$.important||e==="high"?"notif-card-priority-important":e===$.promo||e==="promo"?"notif-card-priority-promo":"notif-card-priority-standard"}function Rn({variant:e="dropdown",notifs:t=[],user:o,goPage:i,onMarkRead:a,onMarkAllRead:d,onDismiss:n,onClose:p,onPrefsUpdated:l}){const[m,x]=c.useState("all"),[b,w]=c.useState(()=>Q());c.useEffect(()=>{if(!(o!=null&&o.id)){w(Q());return}let g=!1;return oo(_,o.id).then(h=>{g||w(h)}),()=>{g=!0}},[o==null?void 0:o.id]);const y=c.useMemo(()=>Sn(t,m==="all"?null:m),[t,m]),j=g=>{_n(_,o==null?void 0:o.id,g).then(h=>{w(h),l==null||l(h)})},v=c.useMemo(()=>t.filter(g=>!g.lu).length,[t]);return r.jsxs("div",{className:`notif-hub notif-hub--${e}`,children:[r.jsxs("div",{className:"notif-hub-toolbar",children:[r.jsxs("div",{className:"notif-hub-title-row",children:[r.jsx("h2",{className:"notif-hub-title",children:"Notifications"}),v>0&&r.jsx("span",{className:"notif-hub-badge",children:v>99?"99+":v})]}),r.jsxs("div",{className:"notif-hub-actions-top",children:[v>0&&r.jsx("button",{type:"button",className:"notif-link-btn",onClick:()=>d==null?void 0:d(),children:"Tout marquer lu"}),e==="dropdown"&&r.jsx("button",{type:"button",className:"notif-link-btn notif-link-btn-strong",onClick:()=>i==null?void 0:i("notifications"),children:"Voir tout"}),e==="dropdown"&&r.jsx("button",{type:"button",className:"notif-hub-close",onClick:()=>p==null?void 0:p(),"aria-label":"Fermer",children:"✕"})]})]}),r.jsx("div",{className:"notif-filter-strip",role:"tablist",children:Tn.map(g=>r.jsx("button",{type:"button",role:"tab","aria-selected":m===g.key,className:`notif-chip${m===g.key?" notif-chip--active":""}`,onClick:()=>x(g.key),children:g.label},g.key))}),r.jsx("div",{className:e==="dropdown"?"notif-hub-scroll notif-hub-scroll--drop":"notif-hub-scroll notif-hub-scroll--page",children:y.length===0?r.jsxs("div",{className:"notif-empty premium",children:[r.jsx("div",{className:"notif-empty-icon",children:"🔕"}),r.jsx("div",{className:"notif-empty-title",children:"Aucune alerte dans ce filtre"}),r.jsx("p",{className:"notif-empty-sub",children:"Les commandes, messages et livraisons apparaîtront ici en temps réel."})]}):r.jsx("ul",{className:"notif-card-list",children:y.map(g=>{var k,M;const h=qr(g);return r.jsxs("li",{className:`notif-card-li ${Nn(h._priority)}`,children:[r.jsxs("button",{type:"button",className:`notif-card-main${g.lu?"":" notif-card-unread"}`,onClick:()=>a==null?void 0:a(g,{navigate:!0,closeDrawer:e==="dropdown"}),children:[r.jsxs("span",{className:"notif-card-avatar","aria-hidden":!0,children:[h._image?r.jsx("img",{src:h._image,alt:"",loading:"lazy"}):r.jsx("span",{className:"notif-card-emoji",children:h._icon}),!g.lu&&r.jsx("span",{className:"notif-card-dot"})]}),r.jsxs("span",{className:"notif-card-copy",children:[r.jsxs("span",{className:"notif-card-top",children:[r.jsx("span",{className:"notif-card-title",children:h._title}),r.jsx("time",{className:"notif-card-time",dateTime:g.created_at||void 0,children:h._timeLabel})]}),r.jsx("span",{className:"notif-card-body",children:h._body}),((k=h._deeplink)==null?void 0:k.startsWith("http"))&&r.jsx("span",{className:"notif-card-cta-secondary",children:"Ouverture du lien sécurisé →"}),((M=h._deeplink)==null?void 0:M.startsWith("/"))&&r.jsx("span",{className:"notif-card-cta-secondary",children:"Appuyer pour ouvrir dans Yorix"})]})]}),r.jsxs("div",{className:"notif-card-side",children:[r.jsx("button",{type:"button",className:"notif-mini-btn",title:"Lu",onClick:T=>{T.stopPropagation(),a==null||a(g,{navigate:!1,closeDrawer:!1})},children:"✓"}),r.jsx("button",{type:"button",className:"notif-mini-btn notif-mini-btn-del",title:"Masquer",onClick:T=>{T.stopPropagation(),n==null||n(g.id)},children:"🗑"})]})]},String(h.id))})})}),r.jsxs("div",{className:"notif-hub-footer-premium",children:[r.jsxs("div",{className:"notif-preferences-mini",children:[r.jsx("div",{className:"notif-preferences-title",children:"Préférences (compte synchronisé)"}),r.jsxs("label",{className:"notif-toggle",children:[r.jsx("input",{type:"checkbox",checked:b.pushBrowser,onChange:g=>j({pushBrowser:g.target.checked})}),"Alertes bureau (navigateur ouvert)"]}),r.jsxs("label",{className:"notif-toggle",children:[r.jsx("input",{type:"checkbox",checked:b.sound,onChange:g=>j({sound:g.target.checked})}),"Son discret (si navigateur autorise)"]})]}),r.jsx(An,{user:o,compact:!0})]})]})}function Mn({goPage:e,freeShippingThresholdXaf:t=25e3}){var o;return r.jsxs("footer",{className:"footer footer--premium",children:[r.jsx("div",{className:"footer-premium-accent","aria-hidden":!0}),r.jsxs("div",{className:"footer-trust-strip",children:[r.jsx("span",{className:"fts-item",children:"🔐 Escrow vérifiable"}),r.jsx("span",{className:"fts-item",children:"📱 MoMo · Orange Money"}),r.jsxs("span",{className:"fts-item",children:["Livraison offerte dès ",((o=t==null?void 0:t.toLocaleString)==null?void 0:o.call(t,"fr-FR"))??"—"," FCFA"]}),r.jsx("span",{className:"fts-item",children:"🇨🇲 Support WhatsApp CM"})]}),r.jsxs("div",{className:"footer-grid",children:[r.jsxs("div",{className:"footer-brand-col",children:[r.jsxs("div",{className:"footer-logo",children:["Yo",r.jsx("span",{children:"rix"})," CM"]}),r.jsx("p",{className:"footer-desc",children:"Marketplace camerounaise — catalogue produits, prestataires terrain, livraison Yorix Ride, paiements traçables et programme de fidélité."}),r.jsxs("div",{className:"footer-contact",children:[r.jsx("span",{children:"📞 +237 696 56 56 54"}),r.jsx("span",{children:"✉️ support@yorix.cm"}),r.jsx("span",{children:"🇨🇲 Douala · Yaoundé · Bafoussam · tout le pays"})]}),r.jsxs("div",{className:"footer-cta-cluster",children:[r.jsx("button",{type:"button",className:"footer-cta-chip",onClick:()=>e("produits"),children:"Parcourir les produits"}),r.jsx("button",{type:"button",className:"footer-cta-chip footer-cta-chip--ghost",onClick:()=>e("aide"),children:"Centre d'aide"})]})]}),r.jsxs("nav",{className:"footer-col","aria-label":"Marketplace",children:[r.jsx("h4",{children:"Marketplace"}),r.jsx("ul",{children:[{l:"Tous les produits",p:"produits"},{l:"Panier · checkout",p:"cart"},{l:"Livraison",p:"livraison"},{l:"Bons plans",p:"bonsPlans"},{l:"Acheter à Douala",nav:()=>e("seoCity",{citySlug:"douala",mode:"acheter"})},{l:"Vendre sur Yorix",p:"devenirVendeur"}].map(i=>r.jsx("li",{children:r.jsx("button",{type:"button",onClick:()=>i.nav?i.nav():e(i.p),children:i.l})},i.l))})]}),r.jsxs("nav",{className:"footer-col","aria-label":"Services et confiance",children:[r.jsx("h4",{children:"Services & confiance"}),r.jsx("ul",{children:[{l:"Escrow 🔐",p:"escrow"},{l:"Prestataires",p:"prestataires"},{l:"Business 💼",p:"business"},{l:"Academy 🎓",p:"academy"},{l:"Blog & guides",p:"blog"},{l:"Fidélité ⭐",p:"loyalty"},{l:"Livraison à Yaoundé",nav:()=>e("livraison",{citySlug:"yaounde"})}].map(i=>r.jsx("li",{children:r.jsx("button",{type:"button",onClick:()=>i.nav?i.nav():e(i.p),children:i.l})},i.l))})]}),r.jsxs("nav",{className:"footer-col","aria-label":"Rejoindre et légal",children:[r.jsx("h4",{children:"Rejoindre Yorix"}),r.jsx("ul",{children:[{l:"Devenir livreur",p:"devenirLivreur"},{l:"Devenir prestataire",p:"inscription"},{l:"Contact",p:"contact"},{l:"FAQ",p:"faq"},{l:"SOS · Aide",p:"aide"},{l:"Mentions légales",p:"mentions"},{l:"CGV",p:"cgv"},{l:"Confidentialité",p:"confidentialite"}].map(i=>r.jsx("li",{children:r.jsx("button",{type:"button",onClick:()=>e(i.p),children:i.l})},i.l))})]})]}),r.jsxs("div",{className:"footer-bottom",children:[r.jsx("span",{className:"footer-copy",children:"© 2026 Yorix Cameroun — RC: DOUALA/2026/B237"}),r.jsxs("div",{className:"fb-badges",role:"list",children:[r.jsx("span",{className:"fbb",role:"listitem",children:"📱 MTN MoMo"}),r.jsx("span",{className:"fbb",role:"listitem",children:"🔶 Orange Money"}),r.jsx("span",{className:"fbb",role:"listitem",children:"🔐 Escrow"}),r.jsx("span",{className:"fbb",role:"listitem",children:"🇨🇲 Made in CM"})]})]})]})}function In({open:e,onClose:t,onSelectAction:o,user:i}){const[a,d]=c.useState(!1);if(c.useEffect(()=>{const l=()=>d(window.innerWidth<600);return l(),window.addEventListener("resize",l),()=>window.removeEventListener("resize",l)},[]),c.useEffect(()=>(e?document.body.style.overflow="hidden":document.body.style.overflow="",()=>{document.body.style.overflow=""}),[e]),!e)return null;const n=[{id:"buy",icon:"🛍️",title:"Acheter",desc:"Des milliers de produits livrés à Yaoundé, Douala et partout.",color:"linear-gradient(135deg, #10b981, #059669)",bgIcon:"rgba(16, 185, 129, .12)",cta:"Explorer maintenant",badge:"⭐ Populaire",badgeColor:"#fcd116",miniBadge:"🔒 Escrow inclus"},{id:"sell",icon:"🏪",title:"Vendre",desc:"Créez votre boutique en 2 minutes. Vendez dès aujourd'hui.",color:"linear-gradient(135deg, #f59e0b, #d97706)",bgIcon:"rgba(245, 158, 11, .12)",cta:"Ouvrir ma boutique",badge:null,miniBadge:"💰 Commission 5%"},{id:"service",icon:"👷",title:"Trouver un pro",desc:"Plombiers, électriciens, photographes — tous vérifiés.",color:"linear-gradient(135deg, #8b5cf6, #7c3aed)",bgIcon:"rgba(139, 92, 246, .12)",cta:"Trouver un pro",badge:null,miniBadge:"✓ 850+ vérifiés"},{id:"delivery",icon:"🚚",title:"Faire livrer",desc:"Un livreur récupère votre colis en moins de 30 min.",color:"linear-gradient(135deg, #3b82f6, #2563eb)",bgIcon:"rgba(59, 130, 246, .12)",cta:"Appeler un livreur",badge:null,miniBadge:"⚡ ~25 min"}],p=[{icon:"🛡️",label:"Paiement sécurisé"},{icon:"✅",label:"Vendeurs vérifiés"},{icon:"🇨🇲",label:"100% Cameroun"},{icon:"⚡",label:"Inscription 2 min"}];return r.jsx("div",{onClick:l=>l.target===l.currentTarget&&t(),style:{position:"fixed",inset:0,background:"rgba(10, 20, 16, 0.88)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",zIndex:99999,display:"flex",alignItems:"center",justifyContent:"center",padding:a?"12px":"20px",overflowY:"auto",animation:"yfadeIn .25s ease"},children:r.jsxs("div",{style:{background:"var(--surface, #fff)",borderRadius:a?18:22,maxWidth:880,width:"100%",padding:a?"26px 18px 22px":"36px 32px 28px",position:"relative",boxShadow:"0 28px 70px rgba(0,0,0,.45)",animation:"yslideUp .35s cubic-bezier(.2,.8,.2,1)",maxHeight:"94vh",overflowY:"auto"},children:[r.jsx("button",{onClick:t,style:{position:"absolute",top:14,right:14,background:"var(--surface2, #f5f5f5)",border:"none",width:38,height:38,borderRadius:"50%",cursor:"pointer",fontSize:"1.05rem",color:"var(--ink, #111)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2,fontWeight:600},"aria-label":"Fermer",children:"✕"}),r.jsxs("div",{style:{textAlign:"center",marginBottom:a?18:22},children:[r.jsx("div",{style:{display:"inline-flex",alignItems:"center",gap:6,background:"var(--green-pale, #e8f5e9)",color:"var(--green, #1a6b3a)",padding:"5px 14px",borderRadius:50,fontSize:".7rem",fontWeight:700,marginBottom:12,letterSpacing:".02em"},children:"🇨🇲 Bienvenue sur Yorix CM"}),r.jsx("h1",{style:{fontFamily:"'Syne',sans-serif",fontSize:a?"1.45rem":"1.85rem",fontWeight:800,color:"var(--ink, #111)",marginBottom:8,letterSpacing:"-.5px",lineHeight:1.18},children:"Que voulez-vous faire aujourd'hui ?"}),r.jsx("p",{style:{color:"var(--gray, #666)",fontSize:a?".84rem":".92rem",maxWidth:520,margin:"0 auto",lineHeight:1.55},children:"Acheter, vendre, faire livrer ou trouver un pro — Yorix s'occupe du reste."})]}),r.jsx("div",{style:{display:"flex",gap:a?6:8,justifyContent:"center",flexWrap:a?"nowrap":"wrap",overflowX:a?"auto":"visible",marginBottom:a?18:24,paddingBottom:a?4:0,scrollbarWidth:"none",msOverflowStyle:"none"},className:"yorix-trust-badges",children:p.map((l,m)=>r.jsxs("div",{style:{background:"var(--surface2, #f8f8f8)",border:"1px solid var(--border, #e5e5e5)",color:"var(--ink, #111)",padding:a?"6px 11px":"7px 14px",borderRadius:50,fontSize:a?".68rem":".74rem",fontWeight:600,whiteSpace:"nowrap",display:"inline-flex",alignItems:"center",gap:5,fontFamily:"'DM Sans',sans-serif",animation:`yfadeIn .4s ease ${.1+m*.05}s both`,flexShrink:0},children:[r.jsx("span",{style:{fontSize:".95em"},children:l.icon}),r.jsx("span",{children:l.label})]},l.label))}),r.jsx("div",{style:{display:"grid",gridTemplateColumns:a?"1fr":"repeat(2, 1fr)",gap:a?12:16,marginBottom:18},children:n.map((l,m)=>r.jsxs("button",{onClick:()=>o(l.id),style:{background:"var(--surface, #fff)",border:"1.5px solid var(--border, #e5e5e5)",borderRadius:16,padding:a?"20px 18px":"24px 22px",cursor:"pointer",textAlign:"left",transition:"all .25s cubic-bezier(.2,.8,.2,1)",position:"relative",overflow:"hidden",fontFamily:"inherit",minHeight:a?0:220,display:"flex",flexDirection:"column",animation:`yslideUp .4s cubic-bezier(.2,.8,.2,1) ${.15+m*.08}s both`},onMouseOver:x=>{a||(x.currentTarget.style.transform="translateY(-4px)",x.currentTarget.style.boxShadow="0 14px 32px rgba(0,0,0,.12)",x.currentTarget.style.borderColor="transparent")},onMouseOut:x=>{a||(x.currentTarget.style.transform="none",x.currentTarget.style.boxShadow="none",x.currentTarget.style.borderColor="var(--border, #e5e5e5)")},onTouchStart:x=>{x.currentTarget.style.transform="scale(0.98)"},onTouchEnd:x=>{x.currentTarget.style.transform="none"},children:[r.jsx("div",{style:{position:"absolute",top:-14,right:-14,width:80,height:80,background:l.bgIcon,borderRadius:"50%",zIndex:0}}),l.badge&&r.jsx("div",{style:{position:"absolute",top:12,right:12,background:l.badgeColor,color:"#0d1f14",padding:"3px 9px",borderRadius:50,fontSize:".62rem",fontWeight:800,fontFamily:"'Syne',sans-serif",letterSpacing:".03em",zIndex:2,boxShadow:"0 2px 6px rgba(0,0,0,.15)"},children:l.badge}),r.jsxs("div",{style:{position:"relative",zIndex:1,flex:1,display:"flex",flexDirection:"column"},children:[r.jsx("div",{style:{width:a?48:54,height:a?48:54,borderRadius:13,background:l.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:a?"1.55rem":"1.75rem",marginBottom:12,boxShadow:"0 6px 16px rgba(0,0,0,.14), inset 0 -2px 0 rgba(0,0,0,.08)"},children:l.icon}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:a?"1.05rem":"1.15rem",color:"var(--ink, #111)",marginBottom:6,letterSpacing:"-.3px"},children:l.title}),r.jsx("div",{style:{fontSize:a?".8rem":".83rem",color:"var(--gray, #666)",lineHeight:1.55,marginBottom:10,flex:1},children:l.desc}),r.jsx("div",{style:{display:"inline-flex",alignItems:"center",background:"var(--surface2, #f5f5f5)",color:"var(--ink, #111)",padding:"3px 9px",borderRadius:50,fontSize:".66rem",fontWeight:600,marginBottom:12,alignSelf:"flex-start",fontFamily:"'DM Sans',sans-serif"},children:l.miniBadge}),r.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:5,fontSize:a?".78rem":".82rem",fontWeight:800,color:"var(--green, #1a6b3a)",fontFamily:"'Syne',sans-serif",letterSpacing:"-.1px"},children:[l.cta," ",r.jsx("span",{style:{fontSize:"1.05em"},children:"→"})]})]})]},l.id))}),r.jsxs("div",{style:{textAlign:"center",paddingTop:14,borderTop:"1px solid var(--border, #e5e5e5)",marginTop:4},children:[i?r.jsx("p",{style:{fontSize:a?".74rem":".78rem",color:"var(--green, #1a6b3a)",marginBottom:8,fontWeight:600},children:"✅ Connecté. Choisissez une action pour continuer."}):r.jsx("p",{style:{fontSize:a?".74rem":".78rem",color:"var(--gray, #666)",marginBottom:8},children:"💡 Pas encore inscrit ? Vous pourrez créer votre compte après avoir choisi."}),r.jsx("button",{onClick:t,style:{background:"transparent",border:"none",color:"var(--gray, #666)",fontSize:".78rem",cursor:"pointer",textDecoration:"underline",fontFamily:"inherit",padding:"4px 8px"},children:"Explorer librement le site"})]}),r.jsx("style",{children:`
          @keyframes yfadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes yslideUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .yorix-trust-badges::-webkit-scrollbar { display: none; }
        `})]})})}const jr="v1.0",Tt={seller:{icon:"🏪",label:"Vendeur",color:"#f59e0b",engagement:"Je m'engage à fournir des produits conformes, authentiques et à respecter les transactions Yorix."},provider:{icon:"👷",label:"Prestataire",color:"#8b5cf6",engagement:"Je m'engage à fournir des services conformes, professionnels et à respecter mes clients."},delivery:{icon:"🚚",label:"Livreur",color:"#3b82f6",engagement:"Je m'engage à respecter les tarifs Yorix Ride, livrer les colis avec soin et dans les délais."}};function Pn({open:e,onClose:t,onAccepted:o,user:i,userData:a,role:d="seller",authForm:n={}}){const[p,l]=c.useState(!1),[m,x]=c.useState(!1),[b,w]=c.useState(!1),[y,j]=c.useState(!1),[v,g]=c.useState(""),h=c.useRef(null);if(c.useEffect(()=>{e&&(l(!1),x(!1),w(!1),g(""))},[e]),!e)return null;const k=Tt[d]||Tt.seller,M=N=>{const L=N.target;L.scrollHeight-L.scrollTop-L.clientHeight<50&&!p&&l(!0)},T=()=>{if(!p){g("Veuillez d'abord lire l'intégralité du contrat (scrollez jusqu'en bas).");return}if(!m){g("Vous devez cocher la case d'acceptation pour continuer.");return}g(""),w(!0)},O=async()=>{j(!0),g("");try{let N="unknown";try{N=(await(await fetch("https://api.ipify.org?format=json")).json()).ip||"unknown"}catch(xe){console.warn("Impossible de récupérer l'IP:",xe)}const L=navigator.userAgent||"unknown",se=(n==null?void 0:n.nom)||(a==null?void 0:a.nom)||"Inconnu",X=(n==null?void 0:n.tel)||(a==null?void 0:a.telephone)||"Inconnu",{error:V}=await _.from("user_contract_acceptance").insert({user_id:(i==null?void 0:i.id)||null,full_name:se,phone:X,role:d,contract_version:jr,accepted_at:new Date().toISOString(),ip_address:N,user_agent:L,acceptance_checkbox:!0,otp_verified:!1,signature_type:"checkbox_v1"});V&&console.warn("Acceptance DB error:",V),j(!1),w(!1),o({version:jr,acceptedAt:new Date().toISOString(),ip:N,userAgent:L})}catch(N){console.error("Erreur acceptance:",N),g("Erreur : "+(N.message||"Impossible d'enregistrer l'acceptation.")),j(!1)}};return r.jsxs(r.Fragment,{children:[r.jsx("div",{onClick:N=>N.target===N.currentTarget&&!y&&t(),style:{position:"fixed",inset:0,background:"rgba(10, 20, 16, 0.88)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",zIndex:99998,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",animation:"yfadeIn .25s ease"},children:r.jsxs("div",{style:{background:"var(--surface, #fff)",borderRadius:18,maxWidth:720,width:"100%",maxHeight:"92vh",display:"flex",flexDirection:"column",boxShadow:"0 28px 70px rgba(0,0,0,.45)",animation:"yslideUp .3s cubic-bezier(.2,.8,.2,1)",overflow:"hidden"},children:[r.jsxs("div",{style:{background:"linear-gradient(135deg, #0a1410 0%, #1a3a24 100%)",padding:"20px 24px",color:"#fff",position:"relative"},children:[r.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:6,background:k.color,color:"#fff",padding:"4px 12px",borderRadius:50,fontSize:".7rem",fontWeight:700,marginBottom:8},children:[k.icon," Inscription ",k.label]}),r.jsx("h2",{style:{fontFamily:"'Syne',sans-serif",fontSize:"1.3rem",fontWeight:800,marginBottom:4,letterSpacing:"-.4px",lineHeight:1.2},children:"Contrat d'utilisation et d'engagement Yorix"}),r.jsx("p",{style:{color:"rgba(255,255,255,.7)",fontSize:".82rem",lineHeight:1.5,marginBottom:0},children:"Veuillez lire attentivement ces conditions. L'inscription implique votre engagement contractuel."}),r.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,height:3,background:"rgba(255,255,255,.15)"},children:r.jsx("div",{style:{height:"100%",background:"linear-gradient(90deg, var(--yellow, #fcd116), #4fd17d)",width:p?"100%":"20%",transition:"width .4s"}})})]}),r.jsxs("div",{ref:h,onScroll:M,style:{padding:"20px 24px",overflowY:"auto",flex:1,fontSize:".84rem",lineHeight:1.65,color:"var(--ink, #111)",fontFamily:"'DM Sans',sans-serif"},children:[r.jsx(Ln,{role:d,roleInfo:k}),!p&&r.jsx("div",{style:{position:"sticky",bottom:0,textAlign:"center",padding:"10px",background:"linear-gradient(to top, var(--surface, #fff) 60%, rgba(255,255,255,0))",pointerEvents:"none",fontSize:".74rem",color:"var(--gray, #666)",fontWeight:600},children:"⬇ Continuez à scroller pour activer l'acceptation"}),p&&r.jsx("div",{style:{textAlign:"center",padding:"12px",marginTop:16,background:"var(--green-pale, #e8f5e9)",border:"1px solid var(--green-light, #86efac)",borderRadius:9,fontSize:".78rem",color:"var(--green, #1a6b3a)",fontWeight:700},children:"✓ Vous avez lu l'intégralité du contrat"})]}),r.jsxs("div",{style:{borderTop:"1px solid var(--border, #e5e5e5)",padding:"16px 24px",background:"var(--surface2, #f8f8f8)"},children:[r.jsxs("div",{style:{background:`${k.color}15`,border:`1.5px solid ${k.color}40`,borderRadius:9,padding:"10px 12px",marginBottom:12,fontSize:".78rem",color:"var(--ink, #111)",fontWeight:600,display:"flex",alignItems:"flex-start",gap:8},children:[r.jsx("span",{style:{fontSize:"1.1rem",flexShrink:0},children:k.icon}),r.jsx("span",{children:k.engagement})]}),r.jsxs("label",{style:{display:"flex",alignItems:"flex-start",gap:10,cursor:p?"pointer":"not-allowed",opacity:p?1:.5,marginBottom:12,userSelect:"none"},children:[r.jsx("input",{type:"checkbox",checked:m,onChange:N=>{p&&x(N.target.checked)},disabled:!p,style:{marginTop:2,width:18,height:18,cursor:p?"pointer":"not-allowed",accentColor:"var(--green, #1a6b3a)",flexShrink:0}}),r.jsx("span",{style:{fontSize:".82rem",lineHeight:1.5,color:"var(--ink, #111)",fontWeight:600},children:"J'ai lu, compris et j'accepte les conditions d'utilisation, commissions, règles et engagements de Yorix."})]}),r.jsx("p",{style:{fontSize:".7rem",color:"var(--gray, #666)",marginBottom:12,lineHeight:1.5},children:"🛡️ Cette étape protège Yorix, vos clients et votre activité. Yorix protège ses utilisateurs grâce à des engagements de transparence, qualité et sécurité."}),v&&r.jsxs("div",{style:{background:"#fff0f0",border:"1px solid #fecaca",color:"#ce1126",padding:"8px 12px",borderRadius:7,fontSize:".78rem",marginBottom:10},children:["⚠️ ",v]}),r.jsxs("div",{style:{display:"flex",gap:8},children:[r.jsx("button",{onClick:t,disabled:y,style:{flex:1,background:"var(--surface, #fff)",color:"var(--ink, #111)",border:"1.5px solid var(--border, #e5e5e5)",padding:"12px 16px",borderRadius:9,fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".85rem",cursor:y?"not-allowed":"pointer"},children:"Annuler"}),r.jsx("button",{onClick:T,disabled:!p||!m||y,style:{flex:2,background:p&&m?"linear-gradient(135deg, var(--green, #1a6b3a), #0d4d28)":"var(--border, #e5e5e5)",color:p&&m?"#fff":"var(--gray, #666)",border:"none",padding:"12px 16px",borderRadius:9,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".88rem",cursor:p&&m&&!y?"pointer":"not-allowed",transition:"all .2s"},children:"✓ Accepter et continuer"})]})]})]})}),b&&r.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",backdropFilter:"blur(4px)",zIndex:99999,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",animation:"yfadeIn .2s ease"},children:r.jsxs("div",{style:{background:"var(--surface, #fff)",borderRadius:14,maxWidth:440,width:"100%",padding:"24px 22px",boxShadow:"0 20px 50px rgba(0,0,0,.4)",animation:"yslideUp .3s cubic-bezier(.2,.8,.2,1)"},children:[r.jsxs("div",{style:{textAlign:"center",marginBottom:16},children:[r.jsx("div",{style:{fontSize:"2.5rem",marginBottom:8},children:"📜"}),r.jsx("h3",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.15rem",color:"var(--ink, #111)",marginBottom:6,letterSpacing:"-.3px"},children:"Confirmer votre engagement"}),r.jsxs("p",{style:{fontSize:".84rem",color:"var(--gray, #666)",lineHeight:1.6},children:["En acceptant, vous reconnaissez être ",r.jsx("strong",{style:{color:"var(--ink, #111)"},children:"légalement engagé"})," envers les conditions Yorix. Cette acceptation sera tracée et conservée comme preuve."]})]}),r.jsxs("div",{style:{background:"var(--surface2, #f5f5f5)",border:"1px solid var(--border, #e5e5e5)",borderRadius:9,padding:"12px 14px",marginBottom:14,fontSize:".74rem"},children:[r.jsx("div",{style:{fontWeight:700,marginBottom:6,color:"var(--gray, #666)"},children:"📋 Informations enregistrées :"}),r.jsxs("div",{style:{color:"var(--ink, #111)",lineHeight:1.7},children:[r.jsxs("div",{children:["👤 ",r.jsx("strong",{children:(n==null?void 0:n.nom)||(a==null?void 0:a.nom)||"—"})]}),r.jsxs("div",{children:["📞 ",(n==null?void 0:n.tel)||(a==null?void 0:a.telephone)||"—"]}),r.jsxs("div",{children:[k.icon," Rôle : ",k.label]}),r.jsxs("div",{children:["📅 ",new Date().toLocaleString("fr-FR")]}),r.jsxs("div",{children:["📝 Contrat version ",jr]})]})]}),v&&r.jsxs("div",{style:{background:"#fff0f0",border:"1px solid #fecaca",color:"#ce1126",padding:"8px 12px",borderRadius:7,fontSize:".78rem",marginBottom:10},children:["⚠️ ",v]}),r.jsxs("div",{style:{display:"flex",gap:8},children:[r.jsx("button",{onClick:()=>w(!1),disabled:y,style:{flex:1,background:"var(--surface, #fff)",color:"var(--ink, #111)",border:"1.5px solid var(--border, #e5e5e5)",padding:"11px 16px",borderRadius:9,fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".82rem",cursor:y?"not-allowed":"pointer"},children:"← Annuler"}),r.jsx("button",{onClick:O,disabled:y,style:{flex:1.5,background:"linear-gradient(135deg, var(--green, #1a6b3a), #0d4d28)",color:"#fff",border:"none",padding:"11px 16px",borderRadius:9,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".82rem",cursor:y?"wait":"pointer",opacity:y?.7:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6},children:y?r.jsxs(r.Fragment,{children:[r.jsx("span",{style:{width:14,height:14,border:"2px solid #fff",borderTopColor:"transparent",borderRadius:"50%",animation:"spin .7s linear infinite"}}),"Enregistrement..."]}):"✓ Accepter et continuer"})]})]})}),r.jsx("style",{children:`
        @keyframes yfadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes yslideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `})]})}function Ln({role:e,roleInfo:t}){const o=({children:a})=>r.jsx("h3",{style:{fontFamily:"'Syne',sans-serif",fontSize:".95rem",fontWeight:800,color:"var(--ink, #111)",marginTop:18,marginBottom:8,letterSpacing:"-.2px"},children:a}),i=({children:a})=>r.jsx("h4",{style:{fontFamily:"'Syne',sans-serif",fontSize:".84rem",fontWeight:700,color:"var(--ink, #111)",marginTop:12,marginBottom:6},children:a});return r.jsxs("div",{children:[r.jsxs("div",{style:{background:"var(--green-pale, #e8f5e9)",border:"1px solid var(--green-light, #86efac)",borderRadius:9,padding:"10px 12px",marginBottom:14,fontSize:".78rem"},children:[r.jsxs("div",{style:{fontWeight:700,color:"var(--green, #1a6b3a)",marginBottom:4},children:["📜 Contrat Yorix CM — Version v1.0 — ",new Date().toLocaleDateString("fr-FR")]}),r.jsx("div",{style:{color:"var(--ink, #111)"},children:"Marketplace camerounaise • Vendeurs • Prestataires • Livreurs"})]}),r.jsx(o,{children:"PRÉAMBULE"}),r.jsxs("p",{children:["Le présent contrat régit les relations entre ",r.jsx("strong",{children:"YORIX CAMEROUN"})," (« Yorix »), exploitant www.yorix.cm, et toute personne physique ou morale (« l'Utilisateur Professionnel ») souhaitant proposer des produits, services ou livraisons via la Plateforme."]}),r.jsx("p",{children:"En cochant la case d'acceptation, vous reconnaissez avoir lu, compris et accepté l'intégralité des présentes conditions, et vous engagez juridiquement à les respecter."}),r.jsx(o,{children:"ARTICLE 1 — OBJET"}),r.jsxs("p",{children:["Le présent Contrat définit les conditions d'utilisation de Yorix pour vendre des produits, proposer des services ou effectuer des livraisons. L'inscription est ",r.jsx("strong",{children:"gratuite"}),". Yorix se rémunère via une commission de 5% sur chaque transaction."]}),r.jsx(o,{children:"ARTICLE 2 — INSCRIPTION ET VÉRIFICATION"}),r.jsxs("p",{children:["Pour vous inscrire, vous devez : être âgé d'",r.jsx("strong",{children:"au moins 18 ans"}),", disposer d'une ",r.jsx("strong",{children:"pièce d'identité valide"}),", fournir un ",r.jsx("strong",{children:"numéro camerounais"})," actif (MTN ou Orange) et fournir des informations exactes."]}),r.jsx("p",{children:"Yorix se réserve le droit de demander des justificatifs (CNI, attestation, photo) à tout moment. Les comptes non vérifiés peuvent être suspendus."}),r.jsx(o,{children:"ARTICLE 3 — ENGAGEMENTS COMMUNS"}),r.jsx("p",{children:"En vous inscrivant, vous vous engagez à :"}),r.jsxs("ul",{style:{paddingLeft:20,marginTop:6},children:[r.jsx("li",{children:"Respecter les Acheteurs : courtoisie, professionnalisme, honnêteté"}),r.jsx("li",{children:"Fournir des informations exactes"}),r.jsx("li",{children:"Respecter les engagements (délai, qualité, prix)"}),r.jsxs("li",{children:[r.jsx("strong",{children:"Ne jamais contourner Yorix"})," en proposant un paiement direct hors plateforme"]}),r.jsx("li",{children:"Ne pas frauder (faux avis, faux profils, doubles comptes)"}),r.jsx("li",{children:"Respecter les lois camerounaises en vigueur"}),r.jsx("li",{children:"Maintenir un comportement professionnel"}),r.jsx("li",{children:"Coopérer avec Yorix en cas de litige"})]}),r.jsx(o,{children:"ARTICLE 4 — ENGAGEMENT SPÉCIFIQUE À VOTRE RÔLE"}),r.jsxs("div",{style:{background:`${t.color}15`,border:`1.5px solid ${t.color}50`,borderRadius:9,padding:"12px 14px",marginTop:8},children:[r.jsxs("div",{style:{fontWeight:800,marginBottom:6,color:"var(--ink, #111)"},children:[t.icon," En tant que ",t.label]}),e==="seller"&&r.jsxs("ul",{style:{paddingLeft:20,marginTop:4},children:[r.jsxs("li",{children:["Je m'engage à fournir des ",r.jsx("strong",{children:"produits conformes"})," à leur description"]}),r.jsxs("li",{children:["Je garantis que mes produits sont ",r.jsx("strong",{children:"authentiques et légaux"})]}),r.jsxs("li",{children:["Je m'engage à ",r.jsx("strong",{children:"expédier dans les délais"})," annoncés"]}),r.jsxs("li",{children:["J'accepte la ",r.jsx("strong",{children:"commission Yorix de 5%"})," sur chaque vente"]}),r.jsxs("li",{children:["J'accepte le système ",r.jsx("strong",{children:"Escrow"})," (libération des fonds après livraison validée)"]}),r.jsxs("li",{children:["Je m'engage à ",r.jsx("strong",{children:"rembourser"})," en cas de produit non conforme"]}),r.jsxs("li",{children:["Je ne vendrai ",r.jsx("strong",{children:"jamais de produits contrefaits, illégaux ou dangereux"})]})]}),e==="provider"&&r.jsxs("ul",{style:{paddingLeft:20,marginTop:4},children:[r.jsxs("li",{children:["Je m'engage à fournir des ",r.jsx("strong",{children:"services conformes et professionnels"})]}),r.jsxs("li",{children:["Je garantis avoir les ",r.jsx("strong",{children:"qualifications nécessaires"})]}),r.jsxs("li",{children:["Je m'engage à ",r.jsx("strong",{children:"respecter les rendez-vous"})," et délais"]}),r.jsxs("li",{children:["Je facture des ",r.jsx("strong",{children:"tarifs justes et transparents"})]}),r.jsxs("li",{children:["Tarifs Yorix recommandés : ",r.jsx("strong",{children:"10 000 FCFA / projet"})," ou ",r.jsx("strong",{children:"5 000 FCFA / heure"})]}),r.jsxs("li",{children:["J'accepte la ",r.jsx("strong",{children:"commission Yorix de 5%"})]}),r.jsxs("li",{children:["Je ne solliciterai ",r.jsx("strong",{children:"jamais de paiement hors Yorix"})," pour contourner la commission"]})]}),e==="delivery"&&r.jsxs("ul",{style:{paddingLeft:20,marginTop:4},children:[r.jsxs("li",{children:["Je m'engage à ",r.jsx("strong",{children:"respecter les tarifs Yorix Ride"})," affichés au client"]}),r.jsxs("li",{children:["Je m'engage à ",r.jsx("strong",{children:"livrer les colis confiés"})," dans les délais"]}),r.jsxs("li",{children:["J'accepte la ",r.jsx("strong",{children:"commission Yorix"})," sur chaque livraison"]}),r.jsxs("li",{children:["Je dispose d'un ",r.jsx("strong",{children:"véhicule en bon état"})," et des ",r.jsx("strong",{children:"documents légaux"})]}),r.jsxs("li",{children:["Je traiterai les colis avec ",r.jsx("strong",{children:"soin et confidentialité"})]}),r.jsxs("li",{children:["En cas de ",r.jsx("strong",{children:"perte ou détérioration"}),", j'accepte d'être tenu responsable"]}),r.jsxs("li",{children:["Je n'effectuerai ",r.jsx("strong",{children:"aucune livraison illégale"})," (drogues, armes, contrefaçons)"]})]})]}),r.jsx(o,{children:"ARTICLE 5 — COMMISSIONS ET PAIEMENTS"}),r.jsx(i,{children:"5.1 Commission Yorix"}),r.jsxs("p",{children:["Yorix prélève une ",r.jsx("strong",{children:"commission de 5%"})," sur chaque transaction. Exemple : pour 10 000 FCFA, vous recevez 9 500 FCFA."]}),r.jsx(i,{children:"5.2 Paiement"}),r.jsxs("p",{children:["Versement via ",r.jsx("strong",{children:"MTN MoMo"})," ou ",r.jsx("strong",{children:"Orange Money"}),", au plus tard ",r.jsx("strong",{children:"48 heures"})," après validation de la livraison/prestation."]}),r.jsx(i,{children:"5.3 Modification des commissions"}),r.jsxs("p",{children:["Yorix peut modifier les commissions avec un ",r.jsx("strong",{children:"préavis de 30 jours"}),"."]}),r.jsx(o,{children:"ARTICLE 6 — SYSTÈME ESCROW"}),r.jsxs("p",{children:["Les fonds versés par l'Acheteur sont ",r.jsx("strong",{children:"bloqués chez Yorix"})," jusqu'à validation de la livraison. En cas de litige, Yorix arbitre sous ",r.jsx("strong",{children:"48h maximum"}),"."]}),r.jsx(o,{children:"ARTICLE 7 — NOTATION ET RÉPUTATION"}),r.jsxs("p",{children:["Les Acheteurs notent de ",r.jsx("strong",{children:"1 à 5 étoiles"}),". Une note moyenne sous ",r.jsx("strong",{children:"3,0/5"})," sur plus de 10 avis peut entraîner suspension. Tout faux avis entraîne l'",r.jsx("strong",{children:"exclusion immédiate"}),"."]}),r.jsx(o,{children:"ARTICLE 8 — INTERDICTIONS ET SANCTIONS"}),r.jsx("p",{children:r.jsx("strong",{children:"Strictement interdit :"})}),r.jsxs("ul",{style:{paddingLeft:20},children:[r.jsx("li",{children:"Contournement de la plateforme (paiement direct)"}),r.jsx("li",{children:"Faux avis, faux profils, fausses livraisons"}),r.jsx("li",{children:"Vente de produits illégaux, contrefaits, dangereux"}),r.jsx("li",{children:"Discrimination, harcèlement, propos haineux"}),r.jsx("li",{children:"Usurpation d'identité"}),r.jsx("li",{children:"Tentative de piratage"})]}),r.jsxs("p",{children:[r.jsx("strong",{children:"Sanctions :"})," avertissement, suspension (24h-30j), exclusion définitive, retenue des paiements, poursuites judiciaires."]}),r.jsx(o,{children:"ARTICLE 9 — RESPONSABILITÉ"}),r.jsxs("p",{children:["Vous êtes ",r.jsx("strong",{children:"seul responsable"})," de vos produits/services/livraisons. Yorix agit comme ",r.jsx("strong",{children:"intermédiaire technique"}),"."]}),r.jsx(o,{children:"ARTICLE 10 — DONNÉES PERSONNELLES"}),r.jsxs("p",{children:["Vos données sont stockées de manière sécurisée et jamais revendues. Droit d'accès, rectification, suppression : ",r.jsx("strong",{children:"support@yorix.cm"}),"."]}),r.jsx(o,{children:"ARTICLE 11 — TRAÇABILITÉ DE L'ACCEPTATION"}),r.jsxs("p",{children:["En cochant la case, sont enregistrés : votre nom, téléphone, rôle, date/heure, IP, navigateur, version du contrat. Ces informations constituent une ",r.jsx("strong",{children:"preuve juridique"}),"."]}),r.jsx(o,{children:"ARTICLE 12 — MODIFICATION DU CONTRAT"}),r.jsx("p",{children:"Yorix peut modifier ce contrat. Vous serez notifié par email et devrez réaccepter la nouvelle version lors de votre prochaine connexion."}),r.jsx(o,{children:"ARTICLE 13 — RÉSILIATION"}),r.jsxs("p",{children:["Vous pouvez résilier à tout moment via ",r.jsx("strong",{children:"support@yorix.cm"}),". Yorix peut résilier sans préavis en cas de manquement grave, fraude."]}),r.jsx(o,{children:"ARTICLE 14 — DROIT APPLICABLE"}),r.jsxs("p",{children:["Contrat régi par le ",r.jsx("strong",{children:"droit camerounais"}),". En cas de litige : tribunaux compétents de ",r.jsx("strong",{children:"Douala"}),"."]}),r.jsx(o,{children:"ARTICLE 15 — CONTACT"}),r.jsxs("p",{children:["📧 support@yorix.cm",r.jsx("br",{}),"📱 +237 696 56 56 54",r.jsx("br",{}),"📍 Douala / Yaoundé, Cameroun"]}),r.jsxs("div",{style:{marginTop:24,padding:"14px 16px",background:"linear-gradient(135deg, #1a3a24, #0d3320)",borderRadius:11,color:"#fff"},children:[r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".95rem",marginBottom:6},children:"🤝 Engagement final"}),r.jsx("p",{style:{color:"rgba(255,255,255,.85)",fontSize:".82rem",lineHeight:1.6,marginBottom:0},children:"En acceptant, je reconnais que je ne crée pas simplement un compte. Je m'engage à respecter un système, des engagements professionnels et des obligations légales. Yorix protège ses utilisateurs grâce à des engagements de transparence, qualité et sécurité."})]}),r.jsx("p",{style:{textAlign:"center",marginTop:16,fontSize:".7rem",color:"var(--gray, #666)"},children:"🇨🇲 Yorix CM — La marketplace de confiance du Cameroun"})]})}function On({value:e="",onChange:t,placeholder:o="Entrez votre mot de passe",showStrength:i=!1,showRules:a=!1,confirmValue:d=null,autoComplete:n="current-password",autoMask:p=10,id:l,ariaLabel:m="Mot de passe"}){const[x,b]=c.useState(!1),[w,y]=c.useState(!1),j=c.useRef(null),v=c.useRef(null);c.useEffect(()=>(x&&p>0&&(v.current=setTimeout(()=>{b(!1)},p*1e3)),()=>{v.current&&clearTimeout(v.current)}),[x,p]);const g=N=>{N.preventDefault(),N.stopPropagation(),b(L=>!L),setTimeout(()=>{var L;return(L=j.current)==null?void 0:L.focus()},0)},h=c.useMemo(()=>{if(!e)return{score:0,label:"",color:""};let N=0;return e.length>=6&&N++,e.length>=10&&N++,/[A-Z]/.test(e)&&N++,/[0-9]/.test(e)&&N++,/[^A-Za-z0-9]/.test(e)&&N++,N<=1?{score:1,label:"Faible",color:"#dc2626"}:N<=2?{score:2,label:"Moyen",color:"#f59e0b"}:N<=3?{score:3,label:"Bon",color:"#3b82f6"}:N<=4?{score:4,label:"Fort",color:"#16a34a"}:{score:5,label:"Très fort",color:"#15803d"}},[e]),k=c.useMemo(()=>({length:e.length>=6,uppercase:/[A-Z]/.test(e),digit:/[0-9]/.test(e)}),[e]),M=d!==null?e&&d&&e===d:null,T=d!==null?d.length>0&&e!==d:!1,O=()=>T?"var(--red, #dc2626)":M||w?"var(--green, #1a6b3a)":"var(--border, #e5e5e5)";return r.jsxs("div",{style:{width:"100%"},children:[r.jsxs("div",{style:{position:"relative",width:"100%"},children:[r.jsx("input",{ref:j,id:l,type:x?"text":"password",value:e,onChange:N=>t(N.target.value),onFocus:()=>y(!0),onBlur:()=>y(!1),placeholder:o,autoComplete:n,"aria-label":m,style:{width:"100%",padding:"12px 48px 12px 14px",borderRadius:9,border:`1.5px solid ${O()}`,background:"var(--surface, #fff)",color:"var(--ink, #111)",fontSize:".88rem",fontFamily:"'DM Sans',sans-serif",outline:"none",transition:"border-color .15s",boxSizing:"border-box",letterSpacing:x?"0.02em":"0.1em"}}),r.jsx("button",{type:"button",onClick:g,"aria-label":x?"Masquer le mot de passe":"Afficher le mot de passe",title:x?"Masquer le mot de passe":"Afficher le mot de passe",tabIndex:0,style:{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",background:"transparent",border:"none",cursor:"pointer",padding:8,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--gray, #666)",transition:"background .15s, color .15s"},onMouseOver:N=>{N.currentTarget.style.background="var(--surface2, #f5f5f5)",N.currentTarget.style.color="var(--green, #1a6b3a)"},onMouseOut:N=>{N.currentTarget.style.background="transparent",N.currentTarget.style.color="var(--gray, #666)"},children:x?r.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[r.jsx("path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"}),r.jsx("circle",{cx:"12",cy:"12",r:"3"})]}):r.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[r.jsx("path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24"}),r.jsx("path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"}),r.jsx("path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"}),r.jsx("line",{x1:"2",y1:"2",x2:"22",y2:"22"})]})})]}),i&&e&&r.jsxs("div",{style:{marginTop:6},children:[r.jsx("div",{style:{display:"flex",gap:3,marginBottom:4},children:[1,2,3,4,5].map(N=>r.jsx("div",{style:{flex:1,height:4,borderRadius:2,background:N<=h.score?h.color:"var(--border, #e5e5e5)",transition:"background .25s"}},N))}),r.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:".68rem",fontFamily:"'DM Sans',sans-serif"},children:[r.jsx("span",{style:{color:"var(--gray, #666)"},children:"💪 Force du mot de passe"}),r.jsx("span",{style:{color:h.color,fontWeight:700},children:h.label})]})]}),a&&e&&r.jsxs("div",{style:{marginTop:8,padding:"8px 10px",background:"var(--surface2, #f5f5f5)",border:"1px solid var(--border, #e5e5e5)",borderRadius:7,display:"flex",flexDirection:"column",gap:3},children:[r.jsx(Sr,{ok:k.length,text:"Au moins 6 caractères"}),r.jsx(Sr,{ok:k.uppercase,text:"Une majuscule (recommandé)",optional:!0}),r.jsx(Sr,{ok:k.digit,text:"Un chiffre (recommandé)",optional:!0})]}),d!==null&&d.length>0&&r.jsx("div",{style:{marginTop:6,fontSize:".74rem",fontFamily:"'DM Sans',sans-serif",fontWeight:600,color:M?"var(--green, #16a34a)":"var(--red, #dc2626)",display:"flex",alignItems:"center",gap:5},children:M?r.jsx(r.Fragment,{children:"✓ Les mots de passe correspondent"}):r.jsx(r.Fragment,{children:"✗ Les mots de passe ne correspondent pas"})})]})}function Sr({ok:e,text:t,optional:o}){return r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:".72rem",color:e?"var(--green, #16a34a)":"var(--gray, #666)",fontFamily:"'DM Sans',sans-serif"},children:[r.jsx("span",{style:{width:14,height:14,borderRadius:"50%",background:e?"var(--green, #16a34a)":"var(--border, #e5e5e5)",color:"#fff",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:".55rem",fontWeight:800,flexShrink:0},children:e?"✓":"·"}),r.jsxs("span",{children:[t,o&&!e&&r.jsx("span",{style:{opacity:.6,fontSize:".66rem"},children:" (optionnel)"})]})]})}function Dn(){var nt,st,lt;const e=wi(),t=Lt(),o=c.useMemo(()=>Pi(t.pathname),[t.pathname]),i=o.page,[a,d]=c.useState(!1),[n,p]=c.useState(null),[l,m]=c.useState(null),[x,b]=c.useState(null),[w,y]=c.useState(!0),[j,v]=c.useState(!1),[g,h]=c.useState("login"),[k,M]=c.useState("buyer"),[T,O]=c.useState({nom:"",email:"",tel:"",password:""}),[N,L]=c.useState(""),[se,X]=c.useState(!1),[V,xe]=c.useState([]),[E,I]=c.useState(!0),[U,ee]=c.useState([]);c.useEffect(()=>{(async()=>{const{data:f,error:u}=await _.from("services").select("*").eq("actif",!0).eq("disponible",!0).order("created_at",{ascending:!1});u||ee(f||[])})()},[]);const[P,ue]=c.useState(""),[ie,ae]=c.useState(""),[be,Ee]=c.useState(()=>gn());c.useEffect(()=>{fn(be)},[be]);const[io,Ae]=c.useState(!1),[Te,he]=c.useState([]),[Yr,De]=c.useState(()=>Q()),$r=c.useRef(Yr);$r.current=Yr;const[ao,no]=c.useState(!1),[qe,ne]=c.useState(!1),ar=c.useRef(null),[ye,so]=c.useState(()=>Dr());c.useEffect(()=>{let s=!1;const f=()=>{s||(s=!0,requestAnimationFrame(()=>{s=!1,no(window.scrollY>16)}))};return f(),window.addEventListener("scroll",f,{passive:!0}),()=>window.removeEventListener("scroll",f)},[]),c.useEffect(()=>{if(!qe)return;const s=f=>{ar.current&&!ar.current.contains(f.target)&&ne(!1)};return document.addEventListener("mousedown",s),()=>document.removeEventListener("mousedown",s)},[qe]),c.useEffect(()=>{let s=!1;return(async()=>{try{const{data:f,error:u}=await _.from("commerce_settings").select("free_shipping_threshold_xaf, standard_delivery_fee_xaf").eq("id",1).maybeSingle();if(s||u||!f)return;so(Qt({freeShippingThresholdXaf:Number(f.free_shipping_threshold_xaf),standardDeliveryFeeXaf:Number(f.standard_delivery_fee_xaf)}))}catch{}})(),()=>{s=!0}},[]);const Br=c.useCallback(async(s,f=40)=>{if(!s)return;const{data:u,error:z}=await _.from("notifications").select("*").eq("user_id",s).order("created_at",{ascending:!1}).limit(f);z?console.warn("Notifications:",z.message):he(u||[])},[]);c.useEffect(()=>{if(!(n!=null&&n.id)){De(Q());return}let s=!1;return oo(_,n.id).then(f=>{s||De(f)}),()=>{s=!0}},[n==null?void 0:n.id]);const[G,le]=c.useState("overview"),[nr,lo]=c.useState(!1),[Ne,sr]=c.useState(""),[lr,dr]=c.useState(!1),[Ye,co]=c.useState(new Set),[po,go]=c.useState(320),[fo,mo]=c.useState("TOUT"),[xo,ve]=c.useState(null),[uo,cr]=c.useState(!1),[bo,pr]=c.useState(!1),[ho,Fr]=c.useState(!1),[qn,Ur]=c.useState(null),[yo,Re]=c.useState(!1),[we,Wr]=c.useState(null),[$e,vo]=c.useState([]),[wo,Vr]=c.useState(!0),[Hr,gr]=c.useState(null),[Me,Be]=c.useState(null),[ko,Ie]=c.useState(!1);c.useEffect(()=>{(async()=>{Vr(!0);const{data:f,error:u}=await _.from("academy_courses").select("*").eq("actif",!0).order("prix",{ascending:!0});u||vo(f||[]),Vr(!1)})()},[]);const jo=c.useCallback(s=>{s!=null&&s.id&&(gr(s),e(yr("academyDetail",{courseId:s.id})))},[e]),So=c.useCallback(s=>{s!=null&&s.id&&(gr(s),e(yr("academyContact",{courseId:s.id})))},[e]),[zo,Xr]=c.useState(!1),[Co,Gr]=c.useState(!1),[_o,ke]=c.useState(""),[A,Eo]=c.useState({nom:"",prenom:"",tel:"",email:"",metier:"",ville:"",experience:"",tarif:"",bio:""}),Ao=async()=>{if(ke(""),!A.nom.trim()){ke("Le nom est obligatoire");return}if(!A.tel.trim()){ke("Le téléphone est obligatoire");return}if(!A.metier){ke("Veuillez choisir un métier");return}if(A.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(A.email)){ke("Email invalide");return}Gr(!0);try{const{data:s,error:f}=await _.from("prestataires").insert({nom:A.nom,prenom:A.prenom||null,telephone:A.tel,email:A.email||null,metier:A.metier,ville:A.ville||null,experience:A.experience||null,tarif:A.tarif||null,bio:A.bio||null,status:"pending",user_id:(n==null?void 0:n.id)||null}).select().single();f&&console.warn("Table prestataires Supabase:",f.message);const u=["👷 *NOUVELLE CANDIDATURE PRESTATAIRE YORIX*","","👤 *Informations*",`Nom : ${A.nom}${A.prenom?" "+A.prenom:""}`,`Téléphone : ${A.tel}`,A.email?`Email : ${A.email}`:"","","💼 *Profil professionnel*",`Métier : ${A.metier}`,A.ville?`Ville : ${A.ville}`:"",A.experience?`Expérience : ${A.experience}`:"",A.tarif?`Tarif : ${A.tarif}`:"","",A.bio?`📝 *Présentation*
${A.bio}`:"","","✅ *Actions à faire*","1. Contacter le candidat sous 24h","2. Vérifier les qualifications","3. Valider ou refuser le profil","","Yorix CM 🇨🇲"].filter(Boolean).join(`
`),z=`https://wa.me/${Ke}?text=${encodeURIComponent(u)}`;window.open(z,"_blank");const q=`Nouvelle candidature prestataire — ${A.nom} (${A.metier})`,B=["Bonjour,","","Nouvelle candidature prestataire sur Yorix CM :","",`👤 Nom : ${A.nom}${A.prenom?" "+A.prenom:""}`,`📞 Téléphone : ${A.tel}`,A.email?`📧 Email : ${A.email}`:"",`💼 Métier : ${A.metier}`,A.ville?`📍 Ville : ${A.ville}`:"",A.experience?`⏱ Expérience : ${A.experience}`:"",A.tarif?`💰 Tarif : ${A.tarif}`:"","",A.bio?`📝 Présentation :
${A.bio}`:"","","---","Envoyé depuis yorix.cm"].filter(Boolean).join(`
`),J=`mailto:raisaodin1@gmail.com?subject=${encodeURIComponent(q)}&body=${encodeURIComponent(B)}`;setTimeout(()=>window.open(J,"_blank"),500),Xr(!0)}catch(s){console.error("soumettreCandidaturePrestataire:",s),ke("Erreur : "+(s.message||"Impossible d'envoyer la candidature. Réessayez."))}Gr(!1)},[To,Yn]=c.useState([{text:"Bonjour ! Comment puis-je vous aider ?",me:!1,time:"10:02"}]),[$n,Bn]=c.useState(""),[Fn,Un]=c.useState(!1),No=c.useRef(null);c.useEffect(()=>{if(!localStorage.getItem("yorix_onboarding_seen")){const f=setTimeout(()=>Re(!0),800);return()=>clearTimeout(f)}},[]);const Ro=c.useCallback(s=>{localStorage.setItem("yorix_onboarding_seen","1"),Re(!1);const u={buy:{needAuth:!1,page:"produits"},sell:{needAuth:!0,role:"seller",page:"dashboard"},service:{needAuth:!1,page:"prestataires"},delivery:{needAuth:!0,role:"buyer",action:"openDelivery"}}[s];if(u){if(u.needAuth&&!n){Wr(s),M(u.role||"buyer"),h("register"),v(!0);return}fr(s)}},[n]),fr=c.useCallback(s=>{const f=s||we;f&&(f==="buy"?C("produits"):f==="sell"?C("dashboard"):f==="service"?C("prestataires"):f==="delivery"&&(C("livraison"),setTimeout(()=>cr(!0),300)),Wr(null))},[we]),Mo=c.useCallback(()=>{localStorage.setItem("yorix_onboarding_seen","1"),Re(!1)},[]),C=c.useCallback((s,f={})=>{e(yr(s,f)),window.scrollTo(0,0),Ae(!1)},[e]);c.useEffect(()=>{let s=!1;_.auth.getSession().then(({data:{session:u},error:z})=>{s||(z&&console.warn("Auth getSession:",z.message),u!=null&&u.user&&(p(u.user),Fe(u.user.id)),y(!1))}).catch(u=>{console.warn("Auth getSession:",(u==null?void 0:u.message)||u),s||y(!1)});const{data:{subscription:f}}=_.auth.onAuthStateChange((u,z)=>{z!=null&&z.user?(p(z.user),Fe(z.user.id)):(p(null),m(null),b(null),he([]))});return()=>{s=!0,f.unsubscribe()}},[]);const Fe=async s=>{const f=await Sa(s),u=za(f);m(f),b(u),await Br(s,40)};c.useEffect(()=>{if(!(n!=null&&n.id))return;const s=_.channel(`notifications_rt_${n.id}`).on("postgres_changes",{event:"INSERT",schema:"public",table:"notifications",filter:`user_id=eq.${n.id}`},f=>{const u=f.new;he(z=>z.some(q=>q.id===u.id)?z:[u,...z].slice(0,120));try{zn(qr(u),$r.current)}catch{}}).subscribe();return()=>{_.removeChannel(s)}},[n==null?void 0:n.id]),c.useEffect(()=>{if(!("serviceWorker"in navigator))return;const s=f=>{var z;if(((z=f.data)==null?void 0:z.type)!=="NOTIF_NAV")return;const u=typeof f.data.url=="string"?f.data.url:"/";e(u.startsWith("/")?u:`/${u}`)};return navigator.serviceWorker.addEventListener("message",s),()=>navigator.serviceWorker.removeEventListener("message",s)},[e]),c.useEffect(()=>{I(!0);const s=async()=>{let u=_.from("products").select("*").or("actif.eq.true,actif.is.null").order("sponsorise",{ascending:!1}).order("created_at",{ascending:!1}).limit(60);ie&&(u=u.eq("categorie",ie));const{data:z,error:q}=await u;q&&console.warn("Produits:",q.message),xe(z||[]),I(!1)};s();const f=_.channel("prod_rt").on("postgres_changes",{event:"*",schema:"public",table:"products"},s).subscribe();return()=>_.removeChannel(f)},[ie]),c.useEffect(()=>{var s;(s=No.current)==null||s.scrollIntoView({behavior:"smooth"})},[To]);const Ue=t.pathname;c.useEffect(()=>{if(o.categorySlug){const s=Ii(o.categorySlug,zt);ae(s||"")}else o.page==="produits"&&Ue==="/produits"&&ae("")},[o.categorySlug,o.page,Ue]);const de=c.useMemo(()=>{var s;return o.citySlug?(s=F[o.citySlug])==null?void 0:s.name:null},[o.citySlug]),Io=c.useMemo(()=>{var s;return o.page==="prestataires"&&o.metierSlug&&o.villeSlug?{cat:$t[o.metierSlug]||"",ville:((s=F[o.villeSlug])==null?void 0:s.name)||""}:o.page==="seoCity"&&o.cityMode==="prestataires"&&de?{cat:"",ville:de}:o.page==="prestataires"&&Ue==="/prestataires"?{cat:"",ville:""}:null},[o.page,o.metierSlug,o.villeSlug,o.cityMode,de,Ue]);c.useEffect(()=>{if(o.page!=="academyDetail"&&o.page!=="academyContact")return;const s=o.courseId;if(!s||!$e.length)return;const f=$e.find(u=>String(u.id)===String(s));f&&gr(f)},[o.page,o.courseId,$e]),c.useEffect(()=>{if(o.page!=="productDetail"||!o.productSlug){Be(null),Ie(!1);return}const{id:s}=ht(o.productSlug);if(!s){Be(null),Ie(!1);return}let f=!1;return Ie(!0),_.from("products").select("*").eq("id",s).maybeSingle().then(({data:u,error:z})=>{f||(z&&console.warn("Détail produit:",z.message),Be(u||null),Ie(!1))}).catch(u=>{f||(console.warn("Détail produit:",(u==null?void 0:u.message)||u),Be(null),Ie(!1))}),()=>{f=!0}},[o.page,o.productSlug]),c.useEffect(()=>{if(o.page!=="prestDetail"||!o.prestSlug){o.page!=="prestDetail"&&ve(null);return}const{id:s}=ht(o.prestSlug);if(!s){ve(null);return}const f=ja.find(z=>z.id===s);if(f){ve(f);return}const u=U.find(z=>`real-${z.id}`===s||String(z.id)===s);ve(u?{id:`real-${u.id}`,name:u.provider_nom||"Prestataire Yorix",metier:u.nom||"Service",categorie:u.categorie||"Autre",ville:u.ville||"Cameroun",quartier:"",emoji:"🛠️",photo:null,color_bg:"linear-gradient(135deg, #dcfce7, #bbf7d0)",tags:[u.categorie||"Service"].filter(Boolean),note:u.note||5,avis:u.nombre_avis||0,prix:u.prix?`${Number(u.prix).toLocaleString("fr-FR")} FCFA`:"",verifie:!0,dispo:u.disponible!==!1,bio:u.description||"",telephone:"",realisations:0,isReal:!0}:null)},[o.page,o.prestSlug,U]);const Po=async()=>{L(""),X(!0);try{const{data:s,error:f}=await _.auth.signInWithPassword({email:T.email,password:T.password});if(f)throw f;p(s.user),await Fe(s.user.id),v(!1),we&&setTimeout(()=>fr(we),300),Aa({to:T.email,subject:`Bienvenue sur Yorix, ${T.nom} ! 🎉`,html:Na(T.nom,k)}).catch(u=>console.warn("Email bienvenue:",u))}catch{L("Email ou mot de passe incorrect.")}X(!1)},Jr=async()=>{var s;L(""),X(!0);try{if(!T.nom||!T.email||!T.password||!T.tel)throw new Error("Tous les champs sont obligatoires.");if(!k)throw new Error("Veuillez choisir un profil (Acheteur, Vendeur, Livreur ou Prestataire).");if(["seller","provider","delivery"].includes(k)&&!ho){Ur({nom:T.nom,email:T.email,tel:T.tel,password:T.password,role:k}),X(!1),pr(!0);return}const{data:u,error:z}=await _.auth.signUp({email:T.email,password:T.password,options:{data:{display_name:T.nom,nom:T.nom,telephone:T.tel,role:k}}});if(z)throw z;const q=(s=u.user)==null?void 0:s.id;if(!q)throw new Error("Erreur création compte.");const{error:B}=await _.from("profiles").upsert({id:q,nom:T.nom,email:T.email,telephone:T.tel,role:k,langue:"fr",actif:!0,verifie:!1,note:0,nombre_avis:0,total_commandes:0});B&&console.error("Profile insert error:",B),await _.from("wallets").insert({user_id:q,solde:0,total_gagne:0,devise:"FCFA"}).then(J=>J.error&&console.error(J.error)),await Fe(q),v(!1),O({nom:"",email:"",tel:"",password:""}),Fr(!1),Ur(null),we&&setTimeout(()=>fr(we),500)}catch(f){console.error("Register error:",f),L(f.message.includes("already")?"Cet email est déjà utilisé.":f.message)}X(!1)},Lo=async()=>{const{error:s}=await _.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin}});s&&L(s.message)},Kr=async()=>{await _.auth.signOut(),p(null),m(null),b(null),le("overview"),C("home")},Oo=async s=>{pr(!1),Fr(!0),setTimeout(()=>{Jr()},200)},We=c.useCallback(s=>{const f=mn(s);f&&Ee(u=>At(u,f))},[]),Do=c.useCallback(s=>{const f=xn(s);f&&Ee(u=>At(u,f))},[]),qo=(s,f,u=null)=>Ee(z=>un(z,s,u,f)),Yo=(s,f=null)=>Ee(u=>bn(u,s,f)),mr=c.useMemo(()=>hn(be,ye),[be,ye]),xr=mr.qty,$o=c.useCallback(async s=>{if(!(n!=null&&n.id)||!s)return;const f={};if(s.telephone!=null&&String(s.telephone).trim()!==""&&(f.telephone=String(s.telephone).trim()),s.adresse!=null&&(f.adresse=String(s.adresse).trim()),s.ville!=null&&(f.ville=String(s.ville).trim()),s.nom!=null&&(f.nom=String(s.nom).trim()),!Object.keys(f).length)return;const{error:u}=await _.from("profiles").update(f).eq("id",n.id);if(u){console.warn("Profil checkout non sauvegardé:",u.message||u);return}m(z=>z&&{...z,...f})},[n==null?void 0:n.id]),ur=c.useCallback(s=>co(f=>{const u=new Set(f);return u.has(s)?u.delete(s):u.add(s),u}),[]),Qr=async(s,f={navigate:!0,closeDrawer:!0})=>{const u=typeof s=="object"?s.id:s,z=typeof s=="object"?s:Te.find(B=>B.id===u);try{const{error:B}=await _.from("notifications").update({lu:!0}).eq("id",u);B&&console.warn("marquerNotifLue:",B.message)}catch(B){console.warn("marquerNotifLue exception:",B==null?void 0:B.message)}if(he(B=>B.map(J=>J.id===u?{...J,lu:!0}:J)),f.closeDrawer&&Ae(!1),!f.navigate||!z)return;const q=String(z.link||"").trim();if(q.startsWith("http")){window.open(q,"_blank","noopener,noreferrer");return}if(q.startsWith("/")){e(q);return}z.type==="new_product"||q.includes("/products/")?C("produits"):z.type==="new_message"&&(C("dashboard"),le("messages"))},Zr=async s=>{if(s){try{const{error:f}=await _.from("notifications").delete().eq("id",s);f&&console.warn("supprimerNotif:",f.message)}catch(f){console.warn("supprimerNotif:",f==null?void 0:f.message)}he(f=>f.filter(u=>u.id!==s))}},et=async()=>{const s=Te.filter(f=>!f.lu).map(f=>f.id);if(s.length!==0){try{const{error:f}=await _.from("notifications").update({lu:!0}).in("id",s);f&&console.warn("marquerToutesLues:",f.message)}catch(f){console.warn("marquerToutesLues exception:",f==null?void 0:f.message)}he(f=>f.map(u=>({...u,lu:!0})))}},Ve=Te.filter(s=>!s.lu).length,Bo=c.useMemo(()=>{let s=V.filter(f=>{var u,z;return!P||((u=f.name_fr)==null?void 0:u.toLowerCase().includes(P.toLowerCase()))||((z=f.description_fr)==null?void 0:z.toLowerCase().includes(P.toLowerCase()))});if(i==="seoCity"&&o.cityMode==="acheter"&&de){const f=de.toLowerCase();s=s.filter(u=>{const z=(u.ville||"").toLowerCase();return!z||z.includes(f)||f.includes(z)})}return s},[V,P,i,o.cityMode,de]),rt=i==="seoCity"||i==="livraison"&&!!o.citySlug,tt=i==="produits"||i==="seoCity"&&o.cityMode==="acheter",Fo=i==="livraison"||i==="seoCity"&&o.cityMode==="livraison",Uo=i==="prestataires"||i==="prestDetail"||i==="seoCity"&&o.cityMode==="prestataires",Wo=tt||i==="escrow",Vo=c.useMemo(()=>["faq","devenirVendeur","devenirLivreur","inscription","business","academy","blog","contact","aide","cgv","mentions","confidentialite"].includes(i),[i]),ot=c.useCallback(s=>s==="produits"?i==="produits"||i==="seoCity"&&o.cityMode==="acheter":s==="livraison"?i==="livraison"||i==="seoCity"&&o.cityMode==="livraison":s==="prestataires"?i==="prestataires"||i==="prestDetail"||i==="seoCity"&&o.cityMode==="prestataires":i===s,[i,o.cityMode]),it=c.useCallback(s=>{C("productDetail",{productSlug:bt(s.name_fr||s.name,s.id)})},[C]),at=()=>({buyer:"chip-buyer",seller:"chip-seller",delivery:"chip-delivery",provider:"chip-provider",admin:"chip-admin"})[x]||"chip-buyer",Ho=()=>x==="seller"?[{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"🏪",id:"mesProduits",label:"Mes produits"},{icon:"➕",id:"ajouterProduit",label:"Ajouter produit"},{icon:"📦",id:"commandes",label:"Commandes"},{icon:"💰",id:"wallet",label:"Wallet"}]:x==="delivery"?[{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"🟡",id:"disponibles",label:"Disponibles"},{icon:"🚚",id:"enCours",label:"En cours"},{icon:"✅",id:"historique",label:"Historique"},{icon:"💰",id:"wallet",label:"Gains"}]:x==="provider"?[{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"📋",id:"demandes",label:"Demandes"},{icon:"🛠️",id:"mesServices",label:"Mes services"},{icon:"+",id:"ajouterService",label:"Ajouter service"}]:[{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"📦",id:"commandes",label:"Mes commandes"},{icon:"❤️",id:"favoris",label:"Favoris"},{icon:"🌟",id:"loyalty",label:"Fidélité"}],Xo=[{l:"🏠 Accueil",p:"home"},{l:"🛍️ Produits",p:"produits"},{l:"🎁 Bons plans",p:"bonsPlans"},{l:"🚚 Livraison",p:"livraison"},{l:"🔐 Escrow",p:"escrow"},{l:"👷 Prestataires",p:"prestataires"},{l:"💼 Business",p:"business"},{l:"🎓 Academy",p:"academy"},{l:"📰 Blog",p:"blog"},{l:"🌟 Fidélité",p:"loyalty"},{l:"📞 Contact",p:"contact"},{l:"🆘 Aide",p:"aide"},...n&&((l==null?void 0:l.role)==="admin"||(l==null?void 0:l.role)==="superadmin")?[{l:"⚙️ Admin",p:"admin"}]:[]],ce=c.useMemo(()=>{const s=o.canonicalPath||t.pathname,f={"@context":"https://schema.org","@type":"Organization",name:"Yorix CM",alternateName:"Yorix Cameroun",url:K,logo:`${K}/favicon.svg`,image:`${K}/og-image.svg`,email:"support@yorix.cm",telephone:"+237696565654",foundingDate:"2025",address:{"@type":"PostalAddress",addressCountry:"CM",addressLocality:"Douala",addressRegion:"Littoral"},areaServed:{"@type":"Country",name:"Cameroun"},contactPoint:[{"@type":"ContactPoint",telephone:"+237696565654",contactType:"customer service",areaServed:"CM",availableLanguage:["French","English"]}],sameAs:["https://www.facebook.com/yorixcm","https://www.instagram.com/yorixcm","https://wa.me/237696565654"]},u=R=>R!=null&&R.length?{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:R.map((W,pe)=>{var je;return{"@type":"ListItem",position:pe+1,name:W.name,item:(je=W.path)!=null&&je.startsWith("http")?W.path:`${K}${W.path||"/"}`}})}:null,z={"@context":"https://schema.org","@type":"WebSite",name:"Yorix CM",url:K,potentialAction:{"@type":"SearchAction",target:`${Li()}?q={search_term_string}`,"query-input":"required name=search_term_string"}};if(i==="dashboard"||i==="admin")return{title:"Espace membre — Yorix CM",description:"Tableau de bord Yorix.",canonicalPath:s,noindex:!0,jsonLd:[]};if(i==="home")return{title:"Yorix.cm — Marketplace Cameroun | Achat en ligne, livraison, escrow, prestataires",description:"Yorix est une marketplace camerounaise : achat en ligne, vendre en ligne, livreur & livraison Douala, Yaoundé, Bafoussam, escrow MTN MoMo & Orange Money, prestataires vérifiés.",canonicalPath:"/",keywords:"marketplace Cameroun, achat en ligne Cameroun, vendre en ligne Cameroun, livraison Cameroun, livreur Cameroun, escrow Cameroun, prestataires Cameroun, Douala, Yaoundé, Bafoussam",jsonLd:[f,z]};if(i==="productDetail"&&Me){const R=Me,W=R.image&&String(R.image).startsWith("http")?R.image:Array.isArray(R.image_urls)&&R.image_urls[0]?R.image_urls[0]:`${K}/og-image.svg`,pe=R.description_fr&&String(R.description_fr).slice(0,158)||`Acheter ${R.name_fr||"ce produit"} sur Yorix — marketplace & livraison Cameroun.`,je={"@context":"https://schema.org","@type":"Product",name:R.name_fr||"Produit Yorix",image:W,description:pe,brand:{"@type":"Brand",name:"Yorix CM"},offers:{"@type":"Offer",url:`${K}${s}`,priceCurrency:"XAF",price:R.prix,availability:"https://schema.org/InStock"}},br=u([{name:"Accueil",path:"/"},{name:"Produits",path:"/produits"},{name:R.name_fr||"Produit",path:s}]);return{title:`${R.name_fr||"Produit"} — achat en ligne Cameroun | Yorix.cm`,description:pe,canonicalPath:s,ogType:"product",ogImage:W.startsWith("http")?W:`${K}/og-image.svg`,jsonLd:[je,br,f]}}if(i==="notifications")return{title:"Notifications — alertes commandes & messages | Yorix.cm",description:"Historique de vos alertes Yorix : commandes, paiements, livraisons, prestations et messages.",canonicalPath:"/notifications",noindex:!0,jsonLd:[f]};if(i==="faq")return{title:"FAQ Yorix — marketplace, livraison, escrow Cameroun",description:"Réponses sur l’achat en ligne, la livraison, les prestataires, MTN MoMo, Orange Money et l’escrow sur Yorix.cm.",canonicalPath:"/faq",jsonLd:[{"@context":"https://schema.org","@type":"FAQPage",mainEntity:[{"@type":"Question",name:"Comment acheter sur Yorix au Cameroun ?",acceptedAnswer:{"@type":"Answer",text:"Parcourez les produits, ajoutez au panier et finalisez via WhatsApp ou paiement mobile (MTN MoMo, Orange Money)."}},{"@type":"Question",name:"La livraison couvre quelles villes ?",acceptedAnswer:{"@type":"Answer",text:"Douala, Yaoundé, Bafoussam, Bamenda, Kribi et un réseau national en expansion. Délais J+1 sur les grandes villes."}},{"@type":"Question",name:"Comment fonctionne l’escrow Yorix ?",acceptedAnswer:{"@type":"Answer",text:"Les fonds sont sécurisés jusqu’à confirmation de réception par l’acheteur, puis libérés au vendeur."}}]},f]};if(i==="seoCity"&&o.citySlug&&F[o.citySlug]){const R=F[o.citySlug].name,W={hub:{title:`Yorix ${R} — marketplace, livraison & prestataires | Cameroun`,desc:`Marketplace à ${R} : acheter en ligne, livraison, services et escrow. MTN MoMo, Orange Money — Yorix.cm.`},acheter:{title:`Acheter en ligne à ${R} — marketplace Yorix Cameroun`,desc:`Achat en ligne à ${R} : produits vérifiés, paiement mobile, livraison. La marketplace camerounaise Yorix.`},livraison:{title:`Livraison à ${R} — livreur & colis | Yorix Ride Cameroun`,desc:`Service de livraison rapide à ${R} et partout au Cameroun. Suivi, tarifs clairs — Yorix Ride.`},prestataires:{title:`Prestataires à ${R} — services à domicile | Yorix.cm`,desc:`Trouvez des prestataires vérifiés à ${R} : plomberie, électricité, ménage, beauté, informatique…`}},pe=W[o.cityMode]||W.hub,je={"@context":"https://schema.org","@type":"LocalBusiness",name:`Yorix — ${R}`,url:`${K}${s}`,address:{"@type":"PostalAddress",addressLocality:R,addressCountry:"CM"},areaServed:{"@type":"City",name:R},parentOrganization:{"@type":"Organization",name:"Yorix CM"}},br=u([{name:"Accueil",path:"/"},{name:R,path:s}]);return{title:pe.title,description:pe.desc,canonicalPath:s,jsonLd:[je,br,f]}}const q={produits:"Produits — marketplace en ligne Cameroun | Yorix.cm",livraison:"Livraison Cameroun — livreurs Yorix Ride | Douala, Yaoundé",escrow:"Escrow Cameroun — paiement sécurisé marketplace | Yorix.cm",prestataires:"Prestataires Cameroun — services à domicile vérifiés | Yorix.cm",business:"Yorix Business — solutions B2B marketplace Cameroun",blog:"Blog Yorix — actualités marketplace Cameroun",academy:"Yorix Academy — formations e-commerce Cameroun",loyalty:"Fidélité Yorix — points & récompenses",contact:"Contact Yorix — support marketplace Cameroun",aide:"Centre d'aide Yorix — marketplace & livraison Cameroun",faq:"FAQ Yorix — achat, livraison, escrow, vendeurs | Cameroun",cgv:"CGV Yorix.cm — conditions générales de vente",confidentialite:"Politique de confidentialité — Yorix.cm",mentions:"Mentions légales — Yorix.cm",devenirVendeur:"Devenir vendeur sur Yorix — marketplace Cameroun",devenirLivreur:"Devenir livreur Yorix Ride — livraison Cameroun",inscription:"Devenir prestataire Yorix — services Cameroun"},B={produits:"Produits",livraison:"Livraison",escrow:"Escrow & sécurité",prestataires:"Prestataires",business:"Business",blog:"Blog",academy:"Academy",loyalty:"Fidélité",contact:"Contact",aide:"Centre d'aide",faq:"FAQ",cgv:"CGV",confidentialite:"Confidentialité",mentions:"Mentions légales",devenirVendeur:"Devenir vendeur",devenirLivreur:"Devenir livreur",inscription:"Devenir prestataire",bonsPlans:"Bons plans"},J=q[i];if(J){const R=B[i],W=R?u([{name:"Accueil",path:"/"},{name:R,path:er[i]||s}]):null;return{title:J,description:"Yorix.cm — marketplace & super-app pour acheter, vendre, se faire livrer et trouver des prestataires au Cameroun. MTN MoMo, Orange Money, escrow.",canonicalPath:er[i]||s,jsonLd:[W,f].filter(Boolean)}}return{title:"Yorix CM — Marketplace #1 au Cameroun",description:"Marketplace camerounaise : produits, livraison, prestataires, escrow MTN MoMo & Orange Money.",canonicalPath:s,jsonLd:[f]}},[i,o.canonicalPath,o.citySlug,o.cityMode,t.pathname,Me]);return w?r.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",fontFamily:"'DM Sans',sans-serif",color:"#1a6b3a",gap:12},children:[r.jsx("div",{style:{width:40,height:40,border:"4px solid #e2ddd6",borderTopColor:"#1a6b3a",borderRadius:"50%",animation:"spin .7s linear infinite"}}),"Chargement de Yorix...",r.jsx("style",{children:"@keyframes spin{to{transform:rotate(360deg);}}"})]}):r.jsxs(r.Fragment,{children:[r.jsx("style",{children:Ra(a)}),r.jsx(ga,{title:ce.title,description:ce.description,canonicalPath:ce.canonicalPath,keywords:ce.keywords,ogType:ce.ogType||"website",jsonLd:ce.jsonLd,noindex:ce.noindex}),r.jsx(Pn,{open:bo,onClose:()=>{pr(!1),X(!1),L("Vous devez accepter le contrat pour finaliser votre inscription.")},onAccepted:Oo,user:n,userData:l,role:k,authForm:T}),r.jsx(In,{open:yo,onClose:Mo,onSelectAction:Ro,user:n}),uo&&r.jsx($a,{user:n,userData:l,onClose:()=>cr(!1),onSuccess:s=>{console.log("Livraison créée avec code:",s)}}),j&&r.jsx("div",{className:"modal-overlay",onClick:s=>s.target===s.currentTarget&&v(!1),children:r.jsxs("div",{className:"modal",style:{width:"100%",maxWidth:480,margin:"0 auto"},children:[r.jsx("button",{className:"modal-close",onClick:()=>v(!1),children:"✕"}),r.jsx("div",{className:"modal-title",children:g==="login"?"Bon retour ! 👋":"Rejoindre Yorix 🇨🇲"}),r.jsx("p",{className:"modal-sub",children:"Votre marketplace camerounaise de confiance"}),r.jsxs("div",{className:"auth-tabs",children:[r.jsx("button",{className:`auth-tab${g==="login"?" active":""}`,onClick:()=>{h("login"),L("")},children:"🔑 Connexion"}),r.jsx("button",{className:`auth-tab${g==="register"?" active":""}`,onClick:()=>{h("register"),L("")},children:"🚀 Inscription"})]}),N&&r.jsxs("div",{className:"error-msg",children:["⚠️ ",N]}),g==="register"&&r.jsxs(r.Fragment,{children:[r.jsx("div",{style:{background:"var(--green-pale)",border:"1px solid var(--green-light)",borderRadius:9,padding:"10px 12px",marginBottom:12,fontSize:".78rem",color:"var(--green)",fontWeight:600},children:"👇 Choisissez votre profil pour commencer"}),r.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14},children:[{id:"buyer",icon:"🛍️",label:"Acheteur",desc:"J'achète des produits"},{id:"seller",icon:"🏪",label:"Vendeur",desc:"Je vends mes produits"},{id:"delivery",icon:"🚚",label:"Livreur",desc:"J'effectue des livraisons"},{id:"provider",icon:"👷",label:"Prestataire",desc:"Je propose des services"}].map(s=>r.jsxs("div",{onClick:()=>M(s.id),style:{border:`2px solid ${k===s.id?"var(--green)":"var(--border)"}`,borderRadius:10,padding:"12px 10px",cursor:"pointer",background:k===s.id?"var(--green-pale)":"var(--surface)",textAlign:"center",transition:"all .2s"},children:[r.jsx("div",{style:{fontSize:"1.8rem",marginBottom:4},children:s.icon}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem",color:"var(--ink)"},children:s.label}),r.jsx("div",{style:{fontSize:".67rem",color:"var(--gray)",marginTop:2},children:s.desc}),k===s.id&&r.jsx("div",{style:{marginTop:5,fontSize:".62rem",fontWeight:700,color:"var(--green)"},children:"✅ Sélectionné"})]},s.id))}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{className:"form-label",children:["Nom complet ",r.jsx("span",{children:"*"})]}),r.jsx("input",{className:"form-input",placeholder:"Ex: Amina Bello",value:T.nom,onChange:s=>O(f=>({...f,nom:s.target.value}))})]}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{className:"form-label",children:["Téléphone ",r.jsx("span",{children:"*"})]}),r.jsx("input",{className:"form-input",type:"tel",placeholder:"+237 6XX XXX XXX",value:T.tel,onChange:s=>O(f=>({...f,tel:s.target.value}))})]})]}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{className:"form-label",children:["Email ",r.jsx("span",{children:"*"})]}),r.jsx("input",{className:"form-input",type:"email",placeholder:"votre@email.com",value:T.email,onChange:s=>O(f=>({...f,email:s.target.value}))})]}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{className:"form-label",children:["Mot de passe ",r.jsx("span",{children:"*"})]}),r.jsx(On,{value:T.password,onChange:s=>O(f=>({...f,password:s})),placeholder:g==="login"?"Entrez votre mot de passe":"Choisissez un mot de passe",autoComplete:g==="login"?"current-password":"new-password",showStrength:g==="register",showRules:g==="register",ariaLabel:"Mot de passe",id:"auth-password"}),g==="login"&&r.jsx("div",{style:{fontSize:".7rem",color:"var(--gray)",marginTop:5,display:"flex",alignItems:"center",gap:4},children:"💡 Cliquez sur l'œil pour afficher ou masquer votre mot de passe"})]}),r.jsx("button",{className:"form-submit",onClick:g==="login"?Po:Jr,disabled:se,style:{fontSize:".9rem",padding:"13px"},children:se?r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"spinner",style:{width:16,height:16,borderWidth:2}}),"Chargement..."]}):g==="login"?"🔑 Se connecter":`🚀 Créer mon compte ${k==="buyer"?"Acheteur":k==="seller"?"Vendeur":k==="delivery"?"Livreur":"Prestataire"}`}),g==="register"&&r.jsx("p",{style:{fontSize:".68rem",color:"var(--gray)",textAlign:"center",marginTop:8},children:"En vous inscrivant, vous acceptez nos conditions d'utilisation"}),r.jsx("div",{className:"divider",children:"ou"}),r.jsxs("button",{className:"social-btn",onClick:Lo,children:[r.jsx("span",{children:"🇬"})," Continuer avec Google"]})]})}),r.jsxs("div",{className:`header-sticky-stack${ao?" header-sticky-stack--compact":""}`,children:[r.jsxs("div",{className:"topbar",children:[r.jsxs("div",{className:"topbar-l",children:[r.jsxs("div",{className:"flag-wrap",children:[r.jsxs("span",{className:"flag",children:[r.jsx("span",{className:"fg"}),r.jsx("span",{className:"fr"}),r.jsx("span",{className:"fy"})]}),r.jsx("span",{children:"Cameroun 🇨🇲"})]}),r.jsx("span",{children:"FR / EN"}),r.jsx("span",{children:"📞 +237 696 56 56 54"})]}),r.jsxs("div",{className:"topbar-r",children:[r.jsx("span",{onClick:()=>C("aide"),children:"🆘 Aide"}),r.jsx("span",{onClick:()=>C("contact"),children:"📞 Contact"}),n?r.jsxs("span",{style:{color:"#b7e4c7"},children:["👤 ",(l==null?void 0:l.nom)||((nt=n.email)==null?void 0:nt.split("@")[0])]}):r.jsx("span",{onClick:()=>{h("login"),v(!0)},children:"🔑 Se connecter"})]})]}),r.jsxs("nav",{className:"navbar",children:[r.jsx("div",{className:"logo-wrap",onClick:()=>C("home"),children:r.jsxs("div",{className:"logo-txt",children:["Yo",r.jsx("span",{children:"rix"}),r.jsx("sup",{children:"CM"})]})}),r.jsx("div",{className:"nav-search-wrap",children:r.jsxs("div",{className:"nav-search",children:[r.jsxs("select",{value:ie,onChange:s=>ae(s.target.value),"aria-label":"Filtrer par catégorie",children:[r.jsx("option",{value:"",children:"Tout"}),zt.map(s=>r.jsx("option",{children:s},s))]}),r.jsx("input",{placeholder:"Produit, marque, mot-clé…",value:P,onChange:s=>ue(s.target.value),onKeyDown:s=>s.key==="Enter"&&C("produits"),autoComplete:"off","aria-label":"Rechercher dans le catalogue","aria-expanded":P.trim().length>=2,"aria-haspopup":"listbox"}),P.trim().length>=2&&r.jsxs("div",{className:"nav-search-dd",role:"listbox","aria-label":"Suggestions catalogue",children:[V.filter(s=>(s.name_fr||"").toLowerCase().includes(P.toLowerCase())||(s.description_fr||"").toLowerCase().includes(P.toLowerCase())).slice(0,8).map(s=>{var f;return r.jsxs("button",{type:"button",className:"nav-search-dd-item",role:"option",onClick:()=>{ue(""),C("produits")},children:[s.image?r.jsx("img",{src:s.image,className:"nav-search-dd-img",alt:"",onError:u=>{u.currentTarget.style.visibility="hidden"}}):r.jsx("span",{className:"nav-search-dd-img nav-search-dd-ph","aria-hidden":!0,children:"📦"}),r.jsxs("div",{style:{minWidth:0},children:[r.jsx("div",{className:"nav-search-dd-t",children:s.name_fr}),r.jsxs("div",{className:"nav-search-dd-p",children:[(f=s.prix)==null?void 0:f.toLocaleString()," FCFA"]})]})]},s.id)}),V.filter(s=>(s.name_fr||"").toLowerCase().includes(P.toLowerCase())).length===0&&r.jsxs("div",{className:"nav-search-dd-empty",children:["Aucun résultat pour « ",P," » — touche Entrée pour ouvrir le catalogue filtré."]})]}),r.jsx("button",{type:"button",onClick:()=>C("produits"),"aria-label":"Lancer la recherche catalogue",children:"🔍"})]})}),r.jsxs("div",{className:"nav-actions",children:[r.jsx("button",{type:"button",className:"nav-cta-onboard",onClick:()=>Re(!0),title:"Que cherchez-vous ?",children:"🚀 Démarrer"}),r.jsx("button",{className:"dark-toggle",onClick:()=>d(s=>!s),title:a?"Mode clair":"Mode sombre",children:a?"☀️":"🌙"}),n&&r.jsxs("button",{className:"icon-btn",onClick:()=>Ae(s=>!s),title:"Notifications",children:["🔔",Ve>0&&r.jsx("span",{className:"ibadge",children:Ve})]}),r.jsxs("button",{className:"icon-btn",onClick:()=>C("cart"),title:"Mon panier",children:["🛒",xr>0&&r.jsx("span",{className:"ibadge",children:xr})]}),n?r.jsxs(r.Fragment,{children:[r.jsx("span",{className:`role-chip ${at()}`,children:Ct[x||"buyer"]}),r.jsx("div",{className:"user-av",onClick:()=>C("dashboard"),title:"Mon espace",children:((l==null?void 0:l.nom)||n.email||"?")[0].toUpperCase()}),r.jsx("button",{className:"btn-red",onClick:Kr,title:"Déconnexion",children:"🚪 Déconnexion"})]}):r.jsxs(r.Fragment,{children:[r.jsx("button",{className:"btn-ghost",onClick:()=>{h("login"),v(!0)},children:"🔑 Connexion"}),r.jsx("button",{className:"btn-green",onClick:()=>{h("register"),M("buyer"),v(!0)},children:"🚀 S'inscrire"})]})]})]}),r.jsxs("div",{className:"nav-tabs-row",ref:ar,children:[r.jsx("nav",{className:"nav-tabs","aria-label":"Rubriques Yorix",children:Xo.map(s=>r.jsx("div",{className:`tab${ot(s.p)?" active":""}`,onClick:()=>{ne(!1),C(s.p)},role:"presentation",children:s.l},s.p))}),r.jsxs("div",{className:"nav-quick-wrap",children:[r.jsx("button",{type:"button",className:"nav-quick-btn","aria-expanded":qe,onClick:()=>ne(s=>!s),children:"☰ Navigation"}),qe&&r.jsx("div",{className:"nav-quick-panel",role:"dialog","aria-label":"Navigation Yorix",children:r.jsxs("div",{className:"nav-quick-mega-cols",children:[r.jsxs("div",{className:"nav-quick-section",children:[r.jsx("h4",{children:"Marketplace"}),r.jsx("div",{className:"nav-quick-links",children:[{ic:"🏠",l:"Accueil",p:"home"},{ic:"🛍️",l:"Produits & catalogue",p:"produits"},{ic:"🛒",l:"Panier · paiement sécurisé",p:"cart"},{ic:"🏷️",l:"Bons plans du moment",p:"bonsPlans"},{ic:"🚚",l:"Livraison & suivi",p:"livraison"}].map(s=>r.jsxs("button",{type:"button",onClick:()=>{ne(!1),C(s.p)},children:[r.jsx("span",{className:"nav-quick-ico",children:s.ic}),r.jsx("span",{children:s.l})]},s.l))})]}),r.jsxs("div",{className:"nav-quick-section",children:[r.jsx("h4",{children:"Confiance & croissance"}),r.jsx("div",{className:"nav-quick-links",children:[{ic:"🔐",l:"Escrow acheteur",p:"escrow"},{ic:"🧑‍🔧",l:"Prestataires vérifiés",p:"prestataires"},{ic:"💼",l:"Yorix Business",p:"business"},{ic:"🎓",l:"Academy",p:"academy"},{ic:"📰",l:"Blog & tendances CM",p:"blog"},{ic:"⭐",l:"Programme fidélité",p:"loyalty"}].map(s=>r.jsxs("button",{type:"button",onClick:()=>{ne(!1),C(s.p)},children:[r.jsx("span",{className:"nav-quick-ico",children:s.ic}),r.jsx("span",{children:s.l})]},s.l))})]}),r.jsxs("div",{className:"nav-quick-section",children:[r.jsx("h4",{children:"Support Yorix"}),r.jsxs("div",{className:"nav-quick-links",children:[r.jsxs("button",{type:"button",onClick:()=>{ne(!1),C("contact")},children:[r.jsx("span",{className:"nav-quick-ico",children:"📞"}),r.jsx("span",{children:"Contact relation client"})]}),r.jsxs("button",{type:"button",onClick:()=>{ne(!1),C("aide")},children:[r.jsx("span",{className:"nav-quick-ico",children:"🆘"}),r.jsx("span",{children:"SOS · centre d'aide"})]}),r.jsxs("button",{type:"button",onClick:()=>{ne(!1),C("faq")},children:[r.jsx("span",{className:"nav-quick-ico",children:"❓"}),r.jsx("span",{children:"FAQ marketplace"})]})]})]})]})})]})]}),r.jsxs("div",{className:"pay-strip",children:[r.jsx("b",{style:{color:"var(--ink)"},children:"Paiement :"}),r.jsxs("div",{className:"pay-methods",children:[r.jsx("span",{className:"pm mtn-b",children:"📱 MTN MoMo"}),r.jsx("span",{className:"pm ora-b",children:"🔶 Orange Money"}),r.jsx("span",{className:"pm",children:"💳 Carte"}),r.jsx("span",{className:"pm",children:"💵 Cash"})]}),r.jsxs("div",{className:"strip-right",children:[r.jsx("span",{children:"🚚 J+1 Douala & Yaoundé"}),r.jsxs("span",{role:"link",tabIndex:0,onClick:()=>C("bonsPlans"),onKeyDown:s=>s.key==="Enter"&&C("bonsPlans"),style:{cursor:"pointer",fontWeight:700,color:"var(--green)",textDecoration:"underline"},children:["Livraison offerte dès ",ye.freeShippingThresholdXaf.toLocaleString("fr-FR")," FCFA"]}),r.jsx("span",{children:"🔐 Escrow sécurisé"}),n&&r.jsxs("span",{style:{color:"var(--gold)"},children:["👤 ",(l==null?void 0:l.nom)||n.email]})]})]})]}),io&&n&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"notif-backdrop",role:"presentation",onClick:()=>Ae(!1)}),r.jsx("div",{className:"notif-drawer notif-drawer--premium",children:r.jsx(Rn,{variant:"dropdown",user:n,notifs:Te,goPage:C,onMarkRead:Qr,onMarkAllRead:et,onDismiss:Zr,onClose:()=>Ae(!1),onPrefsUpdated:De})})]}),i==="home"&&r.jsx(c.Suspense,{fallback:r.jsx(Y,{minHeight:280,label:"Chargement de l'accueil..."}),children:r.jsx(Wa,{filterCat:ie,setFilterCat:ae,search:P,setSearch:ue,produitsLoading:E,produits:V,user:n,userData:l,wishlist:Ye,addToCart:We,toggleWish:ur,openProductUrl:it,setOnboardingOpen:Re,goPage:C,allServices:U,nlEmail:Ne,setNlEmail:sr,nlSent:lr,setNlSent:dr,freeShippingThresholdXaf:ye.freeShippingThresholdXaf})}),rt&&i==="livraison"&&o.citySlug&&F[o.citySlug]&&r.jsx(St,{city:F[o.citySlug],mode:"livraison",goPage:C}),rt&&i==="seoCity"&&o.citySlug&&F[o.citySlug]&&r.jsx(St,{city:F[o.citySlug],mode:o.cityMode||"hub",goPage:C}),i==="productDetail"&&r.jsx("div",{className:"anim",children:ko?r.jsxs("div",{className:"loading",style:{minHeight:320,justifyContent:"center"},children:[r.jsx("div",{className:"spinner"})," Chargement du produit..."]}):Me?r.jsx(c.Suspense,{fallback:r.jsx(Y,{minHeight:320,label:"Chargement du produit..."}),children:r.jsx(Ga,{product:Me,user:n,userData:l,onClose:()=>C("produits"),onAddToCart:We})}):r.jsx("section",{className:"sec anim",children:r.jsxs("div",{className:"empty-state",children:[r.jsx("div",{className:"empty-icon",children:"🔍"}),r.jsx("p",{children:"Produit introuvable."}),r.jsx("button",{className:"form-submit",style:{width:"auto",marginTop:16},type:"button",onClick:()=>C("produits"),children:"← Retour aux produits"})]})})}),Wo&&r.jsx(c.Suspense,{fallback:r.jsx(Y,{label:"Chargement catalogue..."}),children:r.jsx(Va,{showProduits:tt,page:i,seoCityName:de,produitsFiltres:Bo,produitsLoading:E,produits:V,filterCat:ie,setFilterCat:ae,search:P,user:n,userData:l,wishlist:Ye,addToCart:We,toggleWish:ur,openProductUrl:it,dark:a,goPage:C})}),Fo&&r.jsx(c.Suspense,{fallback:r.jsx(Y,{label:"Chargement livraison..."}),children:r.jsx(Ha,{route:o,user:n,userData:l,setDemandeLivraisonOpen:cr,setAuthTab:h,setSelectedRole:M,setAuthOpen:v})}),Uo&&r.jsx(c.Suspense,{fallback:r.jsx(Y,{label:"Chargement prestataires..."}),children:r.jsx(Ja,{user:n,userData:l,allServices:U,goPage:C,setSelectedPrest:ve,selectedPrest:xo,onOpenPrestDetail:s=>C("prestDetail",{prestSlug:bt(s.name,s.id)}),onClosePrestDetail:()=>{o.metierSlug&&o.villeSlug?C("prestataires",{metierSlug:o.metierSlug,villeSlug:o.villeSlug}):i==="seoCity"&&o.cityMode==="prestataires"&&o.citySlug?C("seoCity",{citySlug:o.citySlug,mode:"prestataires"}):C("prestataires")},syncFilters:Io,onAddServiceToCart:Do})}),i==="cart"&&r.jsx(c.Suspense,{fallback:r.jsx(Y,{label:"Chargement panier..."}),children:r.jsx(Qa,{cartItems:be,cartSummary:mr,changeQty:qo,removeItem:Yo,goPage:C,addToCart:We,produits:V,wishlist:Ye,toggleWish:ur})}),i==="checkout"&&r.jsx(c.Suspense,{fallback:r.jsx(Y,{label:"Chargement checkout..."}),children:r.jsx(Ka,{user:n,userData:l,cartItems:be,summary:mr,setCartItems:Ee,goPage:C,fallbackWhatsappNumber:va,momoNumber:ha,orangeNumber:ya,persistCheckoutContact:$o})}),i==="notifications"&&!n&&r.jsxs("section",{className:"sec anim",style:{maxWidth:480,margin:"0 auto",textAlign:"center",padding:"48px 20px"},children:[r.jsx("h1",{className:"sec-title",style:{fontSize:"1.25rem"},children:"Vos notifications Yorix"}),r.jsx("p",{style:{color:"var(--gray)",marginBottom:22,fontSize:".9rem",lineHeight:1.55},children:"Connectez-vous pour suivre les messages, commandes, paiements et livraisons en temps réel."}),r.jsx("button",{type:"button",className:"form-submit",style:{width:"auto",padding:"12px 28px"},onClick:()=>{h("login"),v(!0)},children:"Se connecter"})]}),i==="notifications"&&n&&r.jsx(c.Suspense,{fallback:r.jsx(Y,{label:"Chargement notifications..."}),children:r.jsx(ln,{user:n,notifs:Te,goPage:C,onMarkRead:Qr,onMarkAllRead:et,onDismiss:Zr,refreshNotificationsFull:()=>Br(n.id,120),onPrefsUpdated:De})}),Vo&&r.jsx(c.Suspense,{fallback:r.jsx(Y,{label:"Chargement page..."}),children:r.jsx(Xa,{page:i,goPage:C,setAuthOpen:v,setAuthTab:h,setSelectedRole:M,inscriptionSent:zo,setInscriptionSent:Xr,inscriptionForm:A,setInscriptionForm:Eo,inscriptionError:_o,inscriptionLoading:Co,submitInscriptionPrestataire:Ao,academyCourses:$e,academyLoading:wo,goAcademyDetail:jo,blogFilter:fo,setBlogFilter:mo,nlEmail:Ne,setNlEmail:sr,nlSent:lr,setNlSent:dr,user:n,userData:l})}),i==="academyDetail"&&r.jsx(c.Suspense,{fallback:r.jsx(Y,{label:"Chargement formation..."}),children:r.jsx(Za,{course:Hr,goPage:C,goContact:So})}),i==="academyContact"&&r.jsx(c.Suspense,{fallback:r.jsx(Y,{label:"Chargement formulaire..."}),children:r.jsx(en,{course:Hr,user:n,userData:l,goPage:C})}),i==="bonsPlans"&&r.jsx(c.Suspense,{fallback:r.jsx(Y,{label:"Chargement bons plans..."}),children:r.jsx(dn,{goPage:C,freeShippingThresholdXaf:ye.freeShippingThresholdXaf})}),i==="loyalty"&&r.jsx(c.Suspense,{fallback:r.jsx(Y,{label:"Chargement fidélité..."}),children:r.jsx(rn,{user:n,userData:l,goPage:C,setAuthOpen:v,setAuthTab:h})}),i==="dashboard"&&(n?r.jsxs("div",{className:"dash-layout anim",children:[r.jsxs("div",{className:"dash-sidebar",children:[r.jsx("div",{className:"dash-avatar",children:((st=l==null?void 0:l.nom)==null?void 0:st[0])||"U"}),r.jsx("div",{className:"dash-name",title:(l==null?void 0:l.nom)||n.email,children:(l==null?void 0:l.nom)||((lt=n.email)==null?void 0:lt.split("@")[0])||"Utilisateur"}),r.jsx("div",{className:"dash-role-badge",children:r.jsx("span",{className:`role-chip ${at()}`,children:Ct[x||"buyer"]})}),r.jsxs("div",{className:"dash-nav",children:[Ho().map(s=>r.jsxs("div",{className:`dash-nav-item${G===s.id?" active":""}`,onClick:()=>le(s.id),children:[s.icon," ",s.label]},s.id)),r.jsx("div",{className:"dash-nav-divider"}),r.jsx("div",{className:`dash-nav-item${G==="messages"?" active":""}`,onClick:()=>le("messages"),children:"💬 Messages"}),r.jsx("div",{className:"dash-nav-item",onClick:Kr,style:{color:"var(--red)"},children:"🚪 Déconnexion"})]})]}),r.jsxs("div",{className:"dash-content",children:[G==="messages"&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"dash-page-title",children:"💬 Messagerie Yorix"}),r.jsx("div",{className:"info-msg",children:"🔐 Messagerie sécurisée entre acheteurs et vendeurs. Tes discussions sont privées et protégées."}),r.jsx(Ba,{user:n,userData:l})]}),G!=="messages"&&x==="seller"&&r.jsx(c.Suspense,{fallback:r.jsx(Y,{label:"Chargement espace vendeur..."}),children:r.jsx(tn,{user:n,userData:l,dashTab:G,setDashTab:le})}),G!=="messages"&&x==="delivery"&&r.jsx(c.Suspense,{fallback:r.jsx(Y,{label:"Chargement espace livreur..."}),children:r.jsx(an,{user:n,userData:l,dashTab:G,setDashTab:le})}),G!=="messages"&&x==="provider"&&r.jsx(c.Suspense,{fallback:r.jsx(Y,{label:"Chargement espace prestataire..."}),children:r.jsx(nn,{user:n,userData:l,dashTab:G,setDashTab:le})}),G!=="messages"&&(x==="buyer"||!x)&&r.jsx(c.Suspense,{fallback:r.jsx(Y,{label:"Chargement tableau de bord..."}),children:r.jsx(on,{user:n,userData:l,wishlist:Ye,totalQty:xr,loyaltyPts:po,setLoyaltyPts:go,dashTab:G,goPage:C})})]})]}):r.jsxs("div",{className:"empty-state anim",style:{padding:"60px 0"},children:[r.jsx("div",{className:"empty-icon",children:"🔐"}),r.jsx("p",{children:"Connectez-vous pour accéder à votre espace"}),r.jsx("button",{className:"form-submit",style:{width:"auto",padding:"11px 28px",marginTop:16},onClick:()=>v(!0),children:"Se connecter"})]})),i!=="home"&&r.jsxs("div",{className:"newsletter",children:[r.jsx("div",{className:"nl-title",children:"📬 Restez informé(e)"}),r.jsx("p",{className:"nl-sub",children:"Les meilleures offres Yorix dans votre boîte mail."}),lr?r.jsx("div",{style:{background:"rgba(255,255,255,.2)",borderRadius:8,padding:"9px 18px",color:"#fff",fontWeight:600},children:"✅ Abonné(e) !"}):r.jsxs("div",{className:"nl-form",children:[r.jsx("input",{className:"nl-input",placeholder:"Votre email...",value:Ne,onChange:s=>sr(s.target.value)}),r.jsx("button",{className:"nl-btn",onClick:async()=>{Ne&&(await _.from("newsletter").insert({email:Ne}).catch(s=>console.warn(s==null?void 0:s.message)),dr(!0))},children:"S'abonner 🚀"})]})]}),r.jsxs("div",{className:"yorix-fab-stack","aria-live":"polite",children:[n&&((l==null?void 0:l.role)==="admin"||(l==null?void 0:l.role)==="superadmin")&&i!=="admin"&&r.jsx("button",{type:"button",className:"admin-quick-pill",onClick:()=>C("admin"),title:"Ouvrir l’administration",children:"⚙️ Admin Yorix"}),r.jsxs("div",{className:"wa-float",children:[nr&&r.jsxs("div",{className:"wa-card",children:[r.jsx("div",{className:"wa-card-title",children:"💬 Contacter Yorix"}),r.jsx("div",{className:"wa-card-sub",children:"Support 7j/7 · Réponse rapide"}),r.jsx("a",{href:`https://wa.me/${Ke}?text=${encodeURIComponent("Bonjour Yorix ! J'ai besoin d'aide.")}`,target:"_blank",rel:"noreferrer",className:"wa-link wa-link-green",children:"📱 WhatsApp +237 696 56 56 54"}),r.jsx("a",{href:"tel:+237696565654",className:"wa-link wa-link-ghost",children:"📞 Appeler"}),r.jsx("a",{href:"mailto:support@yorix.cm",className:"wa-link wa-link-ghost",children:"✉️ support@yorix.cm"})]}),r.jsxs("div",{style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center"},children:[r.jsx("div",{className:"wa-pulse"}),r.jsx("button",{type:"button",className:"wa-btn","aria-expanded":nr,onClick:()=>lo(s=>!s),children:nr?"✕":"💬"})]})]})]}),r.jsxs("div",{className:"mobile-nav",children:[r.jsx("div",{className:"mn-inner",children:[{icon:"🏠",label:"Accueil",p:"home"},{icon:"🛍️",label:"Produits",p:"produits"},{icon:"🚚",label:"Livraison",p:"livraison"},{icon:"📊",label:"Mon espace",p:"dashboard"},{icon:"💬",label:"WhatsApp",p:"wa"}].map(s=>r.jsxs("div",{className:`mn-item${ot(s.p)?" active":""}`,onClick:()=>{s.p==="wa"?window.open(`https://wa.me/${Ke}?text=${encodeURIComponent("Bonjour Yorix ! J'ai besoin d'aide.")}`,"_blank"):s.p==="dashboard"&&!n?(h("register"),v(!0)):C(s.p)},children:[r.jsx("div",{className:"mn-icon",children:s.icon}),r.jsx("div",{className:"mn-label",children:s.label}),s.p==="dashboard"&&!n&&r.jsx("div",{style:{position:"absolute",top:0,right:2,background:"var(--green)",color:"#fff",fontSize:".45rem",fontWeight:700,padding:"1px 3px",borderRadius:3},children:"S'inscrire"}),s.p==="dashboard"&&Ve>0&&n&&r.jsx("div",{className:"mn-badge",children:Ve})]},s.label))}),!n&&r.jsxs("div",{style:{borderTop:"1px solid var(--border)",padding:"8px 16px",display:"flex",gap:8},children:[r.jsx("button",{onClick:()=>{h("login"),v(!0)},style:{flex:1,padding:"9px",borderRadius:8,border:"1.5px solid var(--border)",background:"var(--surface)",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".78rem",cursor:"pointer",color:"var(--ink)"},children:"🔑 Connexion"}),r.jsx("button",{onClick:()=>{h("register"),M("buyer"),v(!0)},style:{flex:2,padding:"9px",borderRadius:8,border:"none",background:"var(--green)",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem",cursor:"pointer",color:"#fff"},children:"🚀 S'inscrire gratuitement"})]})]}),i==="admin"&&r.jsx(c.Suspense,{fallback:r.jsx(Y,{label:"Chargement admin..."}),children:r.jsx(sn,{user:n,userData:l,goPage:C})}),r.jsx(Mn,{goPage:C,freeShippingThresholdXaf:ye.freeShippingThresholdXaf})]})}Cr.createRoot(document.getElementById("root")).render(r.jsx(oe.StrictMode,{children:r.jsx(Ni,{children:r.jsx(Gt,{children:r.jsx(Dn,{})})})}));export{qa as A,Jn as B,zt as C,Xn as D,Gn as E,ts as F,ha as M,Rn as N,ya as O,ja as P,Kn as R,Yt as S,Ke as Y,D as _,ka as a,F as b,Ba as c,Lt as d,er as e,Qn as f,Zn as g,va as h,es as i,r as j,ss as k,as as l,Da as m,is as n,Qe as o,ls as p,rr as q,ns as r,_ as s,Aa as t,wi as u,Ia as v,Ct as w,os as x,Jt as y,rs as z};
