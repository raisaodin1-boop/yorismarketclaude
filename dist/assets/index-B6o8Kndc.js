const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/HomePage-CBoT9FI_.js","assets/react-CDaM45aE.js","assets/ProdGrid-H2MUfd5C.js","assets/OptimizedImage--pbmNhdz.js","assets/ModalCommander-DulhMFKg.js","assets/checkoutApi-B0o1Ip9g.js","assets/supabase-D2gm834s.js","assets/ProductRouteSections-BQGUOqfc.js","assets/LivraisonPage-BFQPoCcX.js","assets/SiteMarketingPages-D4OANwqi.js","assets/LivraisonLazyBlocks-DF8AGIRY.js","assets/FicheProduit-Crmvplwl.js","assets/PrestPage-NVexfbeu.js","assets/CheckoutPage-BY1FA9V9.js","assets/FreeShippingProgress-CjeXH0gb.js","assets/CartPage-BfMLOl-4.js","assets/AcademyDetail-DXs-N7-E.js","assets/AcademyContactForm-CzIbyaCg.js","assets/LoyaltyPage-6UpvDu8m.js","assets/SellerDashboard-CEDG88JS.js","assets/BuyerDashboard-ByrI5hIm.js","assets/DeliveryDashboard-3ZE-DSlF.js","assets/ProviderDashboard-D4Sa33Hi.js","assets/AdminDashboard-C62tKYsc.js","assets/NotificationsPage-CjhThkWx.js","assets/PromotionsPage-Eem6JY3c.js"])))=>i.map(i=>d[i]);
var Ii=Object.defineProperty;var Li=(e,i,t)=>i in e?Ii(e,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[i]=t;var Z=(e,i,t)=>Li(e,typeof i!="symbol"?i+"":i,t);import{r as l,a as Oi,R as Di,g as wr,b as ee}from"./react-CDaM45aE.js";import{c as Bi}from"./supabase-D2gm834s.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const d of n)if(d.type==="childList")for(const a of d.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const d={};return n.integrity&&(d.integrity=n.integrity),n.referrerPolicy&&(d.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?d.credentials="include":n.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function o(n){if(n.ep)return;n.ep=!0;const d=t(n);fetch(n.href,d)}})();var wt={exports:{}},He={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fi=l,qi=Symbol.for("react.element"),Yi=Symbol.for("react.fragment"),$i=Object.prototype.hasOwnProperty,Ui=Fi.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Wi={key:!0,ref:!0,__self:!0,__source:!0};function kt(e,i,t){var o,n={},d=null,a=null;t!==void 0&&(d=""+t),i.key!==void 0&&(d=""+i.key),i.ref!==void 0&&(a=i.ref);for(o in i)$i.call(i,o)&&!Wi.hasOwnProperty(o)&&(n[o]=i[o]);if(e&&e.defaultProps)for(o in i=e.defaultProps,i)n[o]===void 0&&(n[o]=i[o]);return{$$typeof:qi,type:e,key:d,ref:a,props:n,_owner:Ui.current}}He.Fragment=Yi;He.jsx=kt;He.jsxs=kt;wt.exports=He;var r=wt.exports,gr={},et=Oi;gr.createRoot=et.createRoot,gr.hydrateRoot=et.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ne(){return Ne=Object.assign?Object.assign.bind():function(e){for(var i=1;i<arguments.length;i++){var t=arguments[i];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},Ne.apply(this,arguments)}var le;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(le||(le={}));const rt="popstate";function Vi(e){e===void 0&&(e={});function i(o,n){let{pathname:d,search:a,hash:p}=o.location;return xr("",{pathname:d,search:a,hash:p},n.state&&n.state.usr||null,n.state&&n.state.key||"default")}function t(o,n){return typeof n=="string"?n:jt(n)}return Ji(i,t,null,e)}function Q(e,i){if(e===!1||e===null||typeof e>"u")throw new Error(i)}function Hi(e,i){{typeof console<"u"&&console.warn(i);try{throw new Error(i)}catch{}}}function Xi(){return Math.random().toString(36).substr(2,8)}function tt(e,i){return{usr:e.state,key:e.key,idx:i}}function xr(e,i,t,o){return t===void 0&&(t=null),Ne({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof i=="string"?Xe(i):i,{state:t,key:i&&i.key||o||Xi()})}function jt(e){let{pathname:i="/",search:t="",hash:o=""}=e;return t&&t!=="?"&&(i+=t.charAt(0)==="?"?t:"?"+t),o&&o!=="#"&&(i+=o.charAt(0)==="#"?o:"#"+o),i}function Xe(e){let i={};if(e){let t=e.indexOf("#");t>=0&&(i.hash=e.substr(t),e=e.substr(0,t));let o=e.indexOf("?");o>=0&&(i.search=e.substr(o),e=e.substr(0,o)),e&&(i.pathname=e)}return i}function Ji(e,i,t,o){o===void 0&&(o={});let{window:n=document.defaultView,v5Compat:d=!1}=o,a=n.history,p=le.Pop,c=null,m=g();m==null&&(m=0,a.replaceState(Ne({},a.state,{idx:m}),""));function g(){return(a.state||{idx:null}).idx}function h(){p=le.Pop;let f=g(),b=f==null?null:f-m;m=f,c&&c({action:p,location:w.location,delta:b})}function k(f,b){p=le.Push;let y=xr(w.location,f,b);m=g()+1;let P=tt(y,m),E=w.createHref(y);try{a.pushState(P,"",E)}catch(B){if(B instanceof DOMException&&B.name==="DataCloneError")throw B;n.location.assign(E)}d&&c&&c({action:p,location:w.location,delta:1})}function v(f,b){p=le.Replace;let y=xr(w.location,f,b);m=g();let P=tt(y,m),E=w.createHref(y);a.replaceState(P,"",E),d&&c&&c({action:p,location:w.location,delta:0})}function z(f){let b=n.location.origin!=="null"?n.location.origin:n.location.href,y=typeof f=="string"?f:jt(f);return y=y.replace(/ $/,"%20"),Q(b,"No window.location.(origin|href) available to create URL for href: "+y),new URL(y,b)}let w={get action(){return p},get location(){return e(n,a)},listen(f){if(c)throw new Error("A history only accepts one active listener");return n.addEventListener(rt,h),c=f,()=>{n.removeEventListener(rt,h),c=null}},createHref(f){return i(n,f)},createURL:z,encodeLocation(f){let b=z(f);return{pathname:b.pathname,search:b.search,hash:b.hash}},push:k,replace:v,go(f){return a.go(f)}};return w}var it;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(it||(it={}));function Gi(e,i){if(i==="/")return e;if(!e.toLowerCase().startsWith(i.toLowerCase()))return null;let t=i.endsWith("/")?i.length-1:i.length,o=e.charAt(t);return o&&o!=="/"?null:e.slice(t)||"/"}const Ki=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Qi=e=>Ki.test(e);function Zi(e,i){i===void 0&&(i="/");let{pathname:t,search:o="",hash:n=""}=typeof e=="string"?Xe(e):e,d;if(t)if(Qi(t))d=t;else{if(t.includes("//")){let a=t;t=t.replace(/\/\/+/g,"/"),Hi(!1,"Pathnames cannot have embedded double slashes - normalizing "+(a+" -> "+t))}t.startsWith("/")?d=ot(t.substring(1),"/"):d=ot(t,i)}else d=i;return{pathname:d,search:oo(o),hash:no(n)}}function ot(e,i){let t=i.replace(/\/+$/,"").split("/");return e.split("/").forEach(n=>{n===".."?t.length>1&&t.pop():n!=="."&&t.push(n)}),t.length>1?t.join("/"):"/"}function sr(e,i,t,o){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+i+"` field ["+JSON.stringify(o)+"].  Please separate it out to the ")+("`to."+t+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function eo(e){return e.filter((i,t)=>t===0||i.route.path&&i.route.path.length>0)}function ro(e,i){let t=eo(e);return i?t.map((o,n)=>n===t.length-1?o.pathname:o.pathnameBase):t.map(o=>o.pathnameBase)}function to(e,i,t,o){o===void 0&&(o=!1);let n;typeof e=="string"?n=Xe(e):(n=Ne({},e),Q(!n.pathname||!n.pathname.includes("?"),sr("?","pathname","search",n)),Q(!n.pathname||!n.pathname.includes("#"),sr("#","pathname","hash",n)),Q(!n.search||!n.search.includes("#"),sr("#","search","hash",n)));let d=e===""||n.pathname==="",a=d?"/":n.pathname,p;if(a==null)p=t;else{let h=i.length-1;if(!o&&a.startsWith("..")){let k=a.split("/");for(;k[0]==="..";)k.shift(),h-=1;n.pathname=k.join("/")}p=h>=0?i[h]:"/"}let c=Zi(n,p),m=a&&a!=="/"&&a.endsWith("/"),g=(d||a===".")&&t.endsWith("/");return!c.pathname.endsWith("/")&&(m||g)&&(c.pathname+="/"),c}const io=e=>e.join("/").replace(/\/\/+/g,"/"),oo=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,no=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e,St=["post","put","patch","delete"];new Set(St);const ao=["get",...St];new Set(ao);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ve(){return Ve=Object.assign?Object.assign.bind():function(e){for(var i=1;i<arguments.length;i++){var t=arguments[i];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},Ve.apply(this,arguments)}const Ct=l.createContext(null),kr=l.createContext(null),jr=l.createContext(null),Sr=l.createContext({outlet:null,matches:[],isDataRoute:!1});function Cr(){return l.useContext(jr)!=null}function zt(){return Cr()||Q(!1),l.useContext(jr).location}function _t(e){l.useContext(kr).static||l.useLayoutEffect(e)}function so(){let{isDataRoute:e}=l.useContext(Sr);return e?uo():lo()}function lo(){Cr()||Q(!1);let e=l.useContext(Ct),{basename:i,future:t,navigator:o}=l.useContext(kr),{matches:n}=l.useContext(Sr),{pathname:d}=zt(),a=JSON.stringify(ro(n,t.v7_relativeSplatPath)),p=l.useRef(!1);return _t(()=>{p.current=!0}),l.useCallback(function(m,g){if(g===void 0&&(g={}),!p.current)return;if(typeof m=="number"){o.go(m);return}let h=to(m,JSON.parse(a),d,g.relative==="path");e==null&&i!=="/"&&(h.pathname=h.pathname==="/"?i:io([i,h.pathname])),(g.replace?o.replace:o.push)(h,g.state,g)},[i,o,a,d,e])}var Tt=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(Tt||{}),Et=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(Et||{});function co(e){let i=l.useContext(Ct);return i||Q(!1),i}function po(e){let i=l.useContext(Sr);return i||Q(!1),i}function fo(e){let i=po(),t=i.matches[i.matches.length-1];return t.route.id||Q(!1),t.route.id}function uo(){let{router:e}=co(Tt.UseNavigateStable),i=fo(Et.UseNavigateStable),t=l.useRef(!1);return _t(()=>{t.current=!0}),l.useCallback(function(n,d){d===void 0&&(d={}),t.current&&(typeof n=="number"?e.navigate(n):e.navigate(n,Ve({fromRouteId:i},d)))},[e,i])}function mo(e,i){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function go(e){let{basename:i="/",children:t=null,location:o,navigationType:n=le.Pop,navigator:d,static:a=!1,future:p}=e;Cr()&&Q(!1);let c=i.replace(/^\/*/,"/"),m=l.useMemo(()=>({basename:c,navigator:d,static:a,future:Ve({v7_relativeSplatPath:!1},p)}),[c,p,d,a]);typeof o=="string"&&(o=Xe(o));let{pathname:g="/",search:h="",hash:k="",state:v=null,key:z="default"}=o,w=l.useMemo(()=>{let f=Gi(g,c);return f==null?null:{location:{pathname:f,search:h,hash:k,state:v,key:z},navigationType:n}},[c,g,h,k,v,z,n]);return w==null?null:l.createElement(kr.Provider,{value:m},l.createElement(jr.Provider,{children:t,value:w}))}new Promise(()=>{});/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const xo="6";try{window.__reactRouterVersion=xo}catch{}const ho="startTransition",nt=Di[ho];function bo(e){let{basename:i,children:t,future:o,window:n}=e,d=l.useRef();d.current==null&&(d.current=Vi({window:n,v5Compat:!0}));let a=d.current,[p,c]=l.useState({action:a.action,location:a.location}),{v7_startTransition:m}=o||{},g=l.useCallback(h=>{m&&nt?nt(()=>c(h)):c(h)},[c,m]);return l.useLayoutEffect(()=>a.listen(g),[a,g]),l.useEffect(()=>mo(o),[o]),l.createElement(go,{basename:i,children:t,location:p.location,navigationType:p.action,navigator:a,future:o})}var at;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(at||(at={}));var st;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(st||(st={}));const ie="https://www.yorix.cm",At=[{slug:"yaounde",name:"Yaoundé",region:"Centre"},{slug:"douala",name:"Douala",region:"Littoral"},{slug:"bafoussam",name:"Bafoussam",region:"Ouest"},{slug:"bamenda",name:"Bamenda",region:"Nord-Ouest"},{slug:"kribi",name:"Kribi",region:"Sud"},{slug:"bertoua",name:"Bertoua",region:"Est"},{slug:"garoua",name:"Garoua",region:"Nord"},{slug:"ngaoundere",name:"Ngaoundéré",region:"Adamaoua"},{slug:"maroua",name:"Maroua",region:"Extrême-Nord"},{slug:"ebolowa",name:"Ebolowa",region:"Sud"}],q=Object.fromEntries(At.map(e=>[e.slug,e]));Object.fromEntries(At.map(e=>[e.name.toLowerCase(),e.slug]));const Nt={plomberie:"Plomberie",electricite:"Électricité",menage:"Nettoyage",beaute:"Beauté",reparation:"Réparation",transport:"Transport",graphisme:"Graphisme",photographie:"Photographie",nettoyage:"Nettoyage",menuiserie:"Menuiserie",informatique:"Informatique",cuisine:"Cuisine",maconnerie:"Maçonnerie",peinture:"Peinture",couture:"Couture"},vo={"mode-accesoires":"Mode & Accessoires"};function yo(e){return Rt(e||"")}function Rt(e){return e?(String(e).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ø/g,"o").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"yorix").slice(0,80):"yorix"}function lt(e,i){return`${Rt(e)}--${i}`}function ct(e){if(!e||typeof e!="string")return{base:"",id:""};const i=e.lastIndexOf("--");return i===-1?{base:e,id:""}:{base:e.slice(0,i),id:e.slice(i+2)}}const zr={home:"/",produits:"/produits",livraison:"/livraison",escrow:"/escrow",prestataires:"/prestataires",inscription:"/devenir-prestataire",business:"/business",academy:"/academy",blog:"/blog",loyalty:"/fidelite",contact:"/contact",aide:"/aide",faq:"/faq",cgv:"/cgv",mentions:"/mentions-legales",confidentialite:"/politique-confidentialite",dashboard:"/dashboard",admin:"/admin",checkout:"/checkout",cart:"/panier",bonsPlans:"/bons-plans",notifications:"/notifications",devenirVendeur:"/devenir-vendeur",devenirLivreur:"/devenir-livreur"};function lr(e,i={}){if(e==="productDetail"&&i.productSlug)return`/produit/${i.productSlug}`;if(e==="prestDetail"&&i.prestSlug)return`/prestataire/${i.prestSlug}`;if(e==="produits"&&i.categorySlug)return`/categories/${i.categorySlug}`;if(e==="livraison"&&i.citySlug&&q[i.citySlug])return`/livraison/${i.citySlug}`;if(e==="prestataires"&&i.metierSlug&&i.villeSlug)return`/prestataires/${i.metierSlug}/${i.villeSlug}`;if(e==="seoCity"){const{citySlug:t,mode:o="hub"}=i;return!t||!q[t]?"/":o==="acheter"?`/acheter-a-${t}`:o==="livraison"?`/livraison-a-${t}`:o==="prestataires"?`/prestataires-a-${t}`:`/${t}`}return e==="academyDetail"&&i.courseId?`/academy/${i.courseId}`:e==="academyContact"&&i.courseId?`/academy/${i.courseId}/contact`:zr[e]??"/"}function wo(e,i=[]){if(!e)return"";const t=vo[e];return t&&i.includes(t)?t:i.find(n=>yo(n)===e)||""}function ko(e){const i=e.replace(/\/+$/,"")||"/";if(i==="/")return{page:"home",canonicalPath:"/"};const t=i.split("/").filter(Boolean),[o,n,d]=t;if(o==="produit"&&n)return{page:"productDetail",productSlug:n,canonicalPath:i};if(o==="categories"&&n)return{page:"produits",categorySlug:n,canonicalPath:i};if(o==="livraison")return n?q[n]?{page:"livraison",citySlug:n,canonicalPath:i}:{page:"livraison",canonicalPath:"/livraison"}:{page:"livraison",canonicalPath:"/livraison"};if(o==="prestataire"&&n)return{page:"prestDetail",prestSlug:n,canonicalPath:i};if(o==="prestataires"&&n&&d&&Nt[n]&&q[d])return{page:"prestataires",metierSlug:n,villeSlug:d,canonicalPath:i};if(o==="prestataires")return{page:"prestataires",canonicalPath:"/prestataires"};if(o==="academy"&&n)return d==="contact"?{page:"academyContact",courseId:n,canonicalPath:i}:{page:"academyDetail",courseId:n,canonicalPath:i};const a=q[o];if(t.length===1&&a)return{page:"seoCity",citySlug:o,cityMode:"hub",canonicalPath:i};if(o!=null&&o.startsWith("acheter-a-")){const c=o.replace(/^acheter-a-/,"");if(q[c])return{page:"seoCity",citySlug:c,cityMode:"acheter",canonicalPath:i}}if(o!=null&&o.startsWith("livraison-a-")){const c=o.replace(/^livraison-a-/,"");if(q[c])return{page:"seoCity",citySlug:c,cityMode:"livraison",canonicalPath:i}}if(o!=null&&o.startsWith("prestataires-a-")){const c=o.replace(/^prestataires-a-/,"");if(q[c])return{page:"seoCity",citySlug:c,cityMode:"prestataires",canonicalPath:i}}const p={produits:"produits",livraison:"livraison",escrow:"escrow",prestataires:"prestataires",business:"business",academy:"academy",blog:"blog",fidelite:"loyalty",contact:"contact",aide:"aide",faq:"faq",cgv:"cgv",mentions:"mentions","mentions-legales":"mentions",confidentialite:"confidentialite","politique-confidentialite":"confidentialite",dashboard:"dashboard",admin:"admin",checkout:"checkout",panier:"cart",cart:"cart","bons-plans":"bonsPlans",notifications:"notifications","devenir-vendeur":"devenirVendeur","devenir-livreur":"devenirLivreur","devenir-prestataire":"inscription",inscription:"inscription"};if(t.length===1&&p[o]){const c=p[o];return{page:c,canonicalPath:zr[c]??`/${o}`}}return{page:"home",canonicalPath:"/"}}function jo(){return`${ie}/produits`}var So=typeof Element<"u",Co=typeof Map=="function",zo=typeof Set=="function",_o=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function Ye(e,i){if(e===i)return!0;if(e&&i&&typeof e=="object"&&typeof i=="object"){if(e.constructor!==i.constructor)return!1;var t,o,n;if(Array.isArray(e)){if(t=e.length,t!=i.length)return!1;for(o=t;o--!==0;)if(!Ye(e[o],i[o]))return!1;return!0}var d;if(Co&&e instanceof Map&&i instanceof Map){if(e.size!==i.size)return!1;for(d=e.entries();!(o=d.next()).done;)if(!i.has(o.value[0]))return!1;for(d=e.entries();!(o=d.next()).done;)if(!Ye(o.value[1],i.get(o.value[0])))return!1;return!0}if(zo&&e instanceof Set&&i instanceof Set){if(e.size!==i.size)return!1;for(d=e.entries();!(o=d.next()).done;)if(!i.has(o.value[0]))return!1;return!0}if(_o&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(i)){if(t=e.length,t!=i.length)return!1;for(o=t;o--!==0;)if(e[o]!==i[o])return!1;return!0}if(e.constructor===RegExp)return e.source===i.source&&e.flags===i.flags;if(e.valueOf!==Object.prototype.valueOf&&typeof e.valueOf=="function"&&typeof i.valueOf=="function")return e.valueOf()===i.valueOf();if(e.toString!==Object.prototype.toString&&typeof e.toString=="function"&&typeof i.toString=="function")return e.toString()===i.toString();if(n=Object.keys(e),t=n.length,t!==Object.keys(i).length)return!1;for(o=t;o--!==0;)if(!Object.prototype.hasOwnProperty.call(i,n[o]))return!1;if(So&&e instanceof Element)return!1;for(o=t;o--!==0;)if(!((n[o]==="_owner"||n[o]==="__v"||n[o]==="__o")&&e.$$typeof)&&!Ye(e[n[o]],i[n[o]]))return!1;return!0}return e!==e&&i!==i}var To=function(i,t){try{return Ye(i,t)}catch(o){if((o.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw o}};const Eo=wr(To);var Ao=function(e,i,t,o,n,d,a,p){if(!e){var c;if(i===void 0)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var m=[t,o,n,d,a,p],g=0;c=new Error(i.replace(/%s/g,function(){return m[g++]})),c.name="Invariant Violation"}throw c.framesToPop=1,c}},No=Ao;const dt=wr(No);var Ro=function(i,t,o,n){var d=o?o.call(n,i,t):void 0;if(d!==void 0)return!!d;if(i===t)return!0;if(typeof i!="object"||!i||typeof t!="object"||!t)return!1;var a=Object.keys(i),p=Object.keys(t);if(a.length!==p.length)return!1;for(var c=Object.prototype.hasOwnProperty.bind(t),m=0;m<a.length;m++){var g=a[m];if(!c(g))return!1;var h=i[g],k=t[g];if(d=o?o.call(n,h,k,g):void 0,d===!1||d===void 0&&h!==k)return!1}return!0};const Po=wr(Ro);var Pt=(e=>(e.BASE="base",e.BODY="body",e.HEAD="head",e.HTML="html",e.LINK="link",e.META="meta",e.NOSCRIPT="noscript",e.SCRIPT="script",e.STYLE="style",e.TITLE="title",e.FRAGMENT="Symbol(react.fragment)",e))(Pt||{}),cr={link:{rel:["amphtml","canonical","alternate"]},script:{type:["application/ld+json"]},meta:{charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]}},pt=Object.values(Pt),_r={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},Mo=Object.entries(_r).reduce((e,[i,t])=>(e[t]=i,e),{}),J="data-rh",be={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate",PRIORITIZE_SEO_TAGS:"prioritizeSeoTags"},ve=(e,i)=>{for(let t=e.length-1;t>=0;t-=1){const o=e[t];if(Object.prototype.hasOwnProperty.call(o,i))return o[i]}return null},Io=e=>{let i=ve(e,"title");const t=ve(e,be.TITLE_TEMPLATE);if(Array.isArray(i)&&(i=i.join("")),t&&i)return t.replace(/%s/g,()=>i);const o=ve(e,be.DEFAULT_TITLE);return i||o||void 0},Lo=e=>ve(e,be.ON_CHANGE_CLIENT_STATE)||(()=>{}),dr=(e,i)=>i.filter(t=>typeof t[e]<"u").map(t=>t[e]).reduce((t,o)=>({...t,...o}),{}),Oo=(e,i)=>i.filter(t=>typeof t.base<"u").map(t=>t.base).reverse().reduce((t,o)=>{if(!t.length){const n=Object.keys(o);for(let d=0;d<n.length;d+=1){const p=n[d].toLowerCase();if(e.indexOf(p)!==-1&&o[p])return t.concat(o)}}return t},[]),Do=e=>console&&typeof console.warn=="function"&&console.warn(e),Ee=(e,i,t)=>{const o={};return t.filter(n=>Array.isArray(n[e])?!0:(typeof n[e]<"u"&&Do(`Helmet: ${e} should be of type "Array". Instead found type "${typeof n[e]}"`),!1)).map(n=>n[e]).reverse().reduce((n,d)=>{const a={};d.filter(c=>{let m;const g=Object.keys(c);for(let k=0;k<g.length;k+=1){const v=g[k],z=v.toLowerCase();i.indexOf(z)!==-1&&!(m==="rel"&&c[m].toLowerCase()==="canonical")&&!(z==="rel"&&c[z].toLowerCase()==="stylesheet")&&(m=z),i.indexOf(v)!==-1&&(v==="innerHTML"||v==="cssText"||v==="itemprop")&&(m=v)}if(!m||!c[m])return!1;const h=c[m].toLowerCase();return o[m]||(o[m]={}),a[m]||(a[m]={}),o[m][h]?!1:(a[m][h]=!0,!0)}).reverse().forEach(c=>n.push(c));const p=Object.keys(a);for(let c=0;c<p.length;c+=1){const m=p[c],g={...o[m],...a[m]};o[m]=g}return n},[]).reverse()},Bo=(e,i)=>{if(Array.isArray(e)&&e.length){for(let t=0;t<e.length;t+=1)if(e[t][i])return!0}return!1},Fo=e=>({baseTag:Oo(["href"],e),bodyAttributes:dr("bodyAttributes",e),defer:ve(e,be.DEFER),encode:ve(e,be.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:dr("htmlAttributes",e),linkTags:Ee("link",["rel","href"],e),metaTags:Ee("meta",["name","charset","http-equiv","property","itemprop"],e),noscriptTags:Ee("noscript",["innerHTML"],e),onChangeClientState:Lo(e),scriptTags:Ee("script",["src","innerHTML"],e),styleTags:Ee("style",["cssText"],e),title:Io(e),titleAttributes:dr("titleAttributes",e),prioritizeSeoTags:Bo(e,be.PRIORITIZE_SEO_TAGS)}),Mt=e=>Array.isArray(e)?e.join(""):e,qo=(e,i)=>{const t=Object.keys(e);for(let o=0;o<t.length;o+=1)if(i[t[o]]&&i[t[o]].includes(e[t[o]]))return!0;return!1},pr=(e,i)=>Array.isArray(e)?e.reduce((t,o)=>(qo(o,i)?t.priority.push(o):t.default.push(o),t),{priority:[],default:[]}):{default:e,priority:[]},ft=(e,i)=>({...e,[i]:void 0}),Yo=["noscript","script","style"],hr=(e,i=!0)=>i===!1?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"),It=e=>Object.keys(e).reduce((i,t)=>{const o=typeof e[t]<"u"?`${t}="${e[t]}"`:`${t}`;return i?`${i} ${o}`:o},""),$o=(e,i,t,o)=>{const n=It(t),d=Mt(i);return n?`<${e} ${J}="true" ${n}>${hr(d,o)}</${e}>`:`<${e} ${J}="true">${hr(d,o)}</${e}>`},Uo=(e,i,t=!0)=>i.reduce((o,n)=>{const d=n,a=Object.keys(d).filter(m=>!(m==="innerHTML"||m==="cssText")).reduce((m,g)=>{const h=typeof d[g]>"u"?g:`${g}="${hr(d[g],t)}"`;return m?`${m} ${h}`:h},""),p=d.innerHTML||d.cssText||"",c=Yo.indexOf(e)===-1;return`${o}<${e} ${J}="true" ${a}${c?"/>":`>${p}</${e}>`}`},""),Lt=(e,i={})=>Object.keys(e).reduce((t,o)=>{const n=_r[o];return t[n||o]=e[o],t},i),Wo=(e,i,t)=>{const o={key:i,[J]:!0},n=Lt(t,o);return[ee.createElement("title",n,i)]},$e=(e,i)=>i.map((t,o)=>{const n={key:o,[J]:!0};return Object.keys(t).forEach(d=>{const p=_r[d]||d;if(p==="innerHTML"||p==="cssText"){const c=t.innerHTML||t.cssText;n.dangerouslySetInnerHTML={__html:c}}else n[p]=t[d]}),ee.createElement(e,n)}),W=(e,i,t=!0)=>{switch(e){case"title":return{toComponent:()=>Wo(e,i.title,i.titleAttributes),toString:()=>$o(e,i.title,i.titleAttributes,t)};case"bodyAttributes":case"htmlAttributes":return{toComponent:()=>Lt(i),toString:()=>It(i)};default:return{toComponent:()=>$e(e,i),toString:()=>Uo(e,i,t)}}},Vo=({metaTags:e,linkTags:i,scriptTags:t,encode:o})=>{const n=pr(e,cr.meta),d=pr(i,cr.link),a=pr(t,cr.script);return{priorityMethods:{toComponent:()=>[...$e("meta",n.priority),...$e("link",d.priority),...$e("script",a.priority)],toString:()=>`${W("meta",n.priority,o)} ${W("link",d.priority,o)} ${W("script",a.priority,o)}`},metaTags:n.default,linkTags:d.default,scriptTags:a.default}},Ho=e=>{const{baseTag:i,bodyAttributes:t,encode:o=!0,htmlAttributes:n,noscriptTags:d,styleTags:a,title:p="",titleAttributes:c,prioritizeSeoTags:m}=e;let{linkTags:g,metaTags:h,scriptTags:k}=e,v={toComponent:()=>{},toString:()=>""};return m&&({priorityMethods:v,linkTags:g,metaTags:h,scriptTags:k}=Vo(e)),{priority:v,base:W("base",i,o),bodyAttributes:W("bodyAttributes",t,o),htmlAttributes:W("htmlAttributes",n,o),link:W("link",g,o),meta:W("meta",h,o),noscript:W("noscript",d,o),script:W("script",k,o),style:W("style",a,o),title:W("title",{title:p,titleAttributes:c},o)}},br=Ho,Fe=[],Ot=!!(typeof window<"u"&&window.document&&window.document.createElement),vr=class{constructor(e,i){Z(this,"instances",[]);Z(this,"canUseDOM",Ot);Z(this,"context");Z(this,"value",{setHelmet:e=>{this.context.helmet=e},helmetInstances:{get:()=>this.canUseDOM?Fe:this.instances,add:e=>{(this.canUseDOM?Fe:this.instances).push(e)},remove:e=>{const i=(this.canUseDOM?Fe:this.instances).indexOf(e);(this.canUseDOM?Fe:this.instances).splice(i,1)}}});this.context=e,this.canUseDOM=i||!1,i||(e.helmet=br({baseTag:[],bodyAttributes:{},htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}},Xo={},Dt=ee.createContext(Xo),ce,Bt=(ce=class extends l.Component{constructor(t){super(t);Z(this,"helmetData");this.helmetData=new vr(this.props.context||{},ce.canUseDOM)}render(){return ee.createElement(Dt.Provider,{value:this.helmetData.value},this.props.children)}},Z(ce,"canUseDOM",Ot),ce),he=(e,i)=>{const t=document.head||document.querySelector("head"),o=t.querySelectorAll(`${e}[${J}]`),n=[].slice.call(o),d=[];let a;return i&&i.length&&i.forEach(p=>{const c=document.createElement(e);for(const m in p)if(Object.prototype.hasOwnProperty.call(p,m))if(m==="innerHTML")c.innerHTML=p.innerHTML;else if(m==="cssText")c.styleSheet?c.styleSheet.cssText=p.cssText:c.appendChild(document.createTextNode(p.cssText));else{const g=m,h=typeof p[g]>"u"?"":p[g];c.setAttribute(m,h)}c.setAttribute(J,"true"),n.some((m,g)=>(a=g,c.isEqualNode(m)))?n.splice(a,1):d.push(c)}),n.forEach(p=>{var c;return(c=p.parentNode)==null?void 0:c.removeChild(p)}),d.forEach(p=>t.appendChild(p)),{oldTags:n,newTags:d}},yr=(e,i)=>{const t=document.getElementsByTagName(e)[0];if(!t)return;const o=t.getAttribute(J),n=o?o.split(","):[],d=[...n],a=Object.keys(i);for(const p of a){const c=i[p]||"";t.getAttribute(p)!==c&&t.setAttribute(p,c),n.indexOf(p)===-1&&n.push(p);const m=d.indexOf(p);m!==-1&&d.splice(m,1)}for(let p=d.length-1;p>=0;p-=1)t.removeAttribute(d[p]);n.length===d.length?t.removeAttribute(J):t.getAttribute(J)!==a.join(",")&&t.setAttribute(J,a.join(","))},Jo=(e,i)=>{typeof e<"u"&&document.title!==e&&(document.title=Mt(e)),yr("title",i)},ut=(e,i)=>{const{baseTag:t,bodyAttributes:o,htmlAttributes:n,linkTags:d,metaTags:a,noscriptTags:p,onChangeClientState:c,scriptTags:m,styleTags:g,title:h,titleAttributes:k}=e;yr("body",o),yr("html",n),Jo(h,k);const v={baseTag:he("base",t),linkTags:he("link",d),metaTags:he("meta",a),noscriptTags:he("noscript",p),scriptTags:he("script",m),styleTags:he("style",g)},z={},w={};Object.keys(v).forEach(f=>{const{newTags:b,oldTags:y}=v[f];b.length&&(z[f]=b),y.length&&(w[f]=v[f].oldTags)}),i&&i(),c(e,z,w)},Ae=null,Go=e=>{Ae&&cancelAnimationFrame(Ae),e.defer?Ae=requestAnimationFrame(()=>{ut(e,()=>{Ae=null})}):(ut(e),Ae=null)},Ko=Go,mt=class extends l.Component{constructor(){super(...arguments);Z(this,"rendered",!1)}shouldComponentUpdate(i){return!Po(i,this.props)}componentDidUpdate(){this.emitChange()}componentWillUnmount(){const{helmetInstances:i}=this.props.context;i.remove(this),this.emitChange()}emitChange(){const{helmetInstances:i,setHelmet:t}=this.props.context;let o=null;const n=Fo(i.get().map(d=>{const a={...d.props};return delete a.context,a}));Bt.canUseDOM?Ko(n):br&&(o=br(n)),t(o)}init(){if(this.rendered)return;this.rendered=!0;const{helmetInstances:i}=this.props.context;i.add(this),this.emitChange()}render(){return this.init(),null}},mr,Qo=(mr=class extends l.Component{shouldComponentUpdate(e){return!Eo(ft(this.props,"helmetData"),ft(e,"helmetData"))}mapNestedChildrenToProps(e,i){if(!i)return null;switch(e.type){case"script":case"noscript":return{innerHTML:i};case"style":return{cssText:i};default:throw new Error(`<${e.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`)}}flattenArrayTypeChildren(e,i,t,o){return{...i,[e.type]:[...i[e.type]||[],{...t,...this.mapNestedChildrenToProps(e,o)}]}}mapObjectTypeChildren(e,i,t,o){switch(e.type){case"title":return{...i,[e.type]:o,titleAttributes:{...t}};case"body":return{...i,bodyAttributes:{...t}};case"html":return{...i,htmlAttributes:{...t}};default:return{...i,[e.type]:{...t}}}}mapArrayTypeChildrenToProps(e,i){let t={...i};return Object.keys(e).forEach(o=>{t={...t,[o]:e[o]}}),t}warnOnInvalidChildren(e,i){return dt(pt.some(t=>e.type===t),typeof e.type=="function"?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${pt.join(", ")} are allowed. Helmet does not support rendering <${e.type}> elements. Refer to our API for more information.`),dt(!i||typeof i=="string"||Array.isArray(i)&&!i.some(t=>typeof t!="string"),`Helmet expects a string as a child of <${e.type}>. Did you forget to wrap your children in braces? ( <${e.type}>{\`\`}</${e.type}> ) Refer to our API for more information.`),!0}mapChildrenToProps(e,i){let t={};return ee.Children.forEach(e,o=>{if(!o||!o.props)return;const{children:n,...d}=o.props,a=Object.keys(d).reduce((c,m)=>(c[Mo[m]||m]=d[m],c),{});let{type:p}=o;switch(typeof p=="symbol"?p=p.toString():this.warnOnInvalidChildren(o,n),p){case"Symbol(react.fragment)":i=this.mapChildrenToProps(n,i);break;case"link":case"meta":case"noscript":case"script":case"style":t=this.flattenArrayTypeChildren(o,t,a,n);break;default:i=this.mapObjectTypeChildren(o,i,a,n);break}}),this.mapArrayTypeChildrenToProps(t,i)}render(){const{children:e,...i}=this.props;let t={...i},{helmetData:o}=i;if(e&&(t=this.mapChildrenToProps(e,t)),o&&!(o instanceof vr)){const n=o;o=new vr(n.context,!0),delete t.helmetData}return o?ee.createElement(mt,{...t,context:o.value}):ee.createElement(Dt.Consumer,null,n=>ee.createElement(mt,{...t,context:n}))}},Z(mr,"defaultProps",{defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1}),mr);function Zo({title:e,description:i,canonicalPath:t,robots:o="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",keywords:n,ogType:d="website",ogImage:a="https://www.yorix.cm/og-image.jpg",jsonLd:p=[],noindex:c=!1}){const m=`${ie}${t!=null&&t.startsWith("/")?t:`/${t||""}`}`.replace(/([^:]\/)\/+/g,"$1"),g=c?"noindex, nofollow":o,h=Array.isArray(p)?p.filter(Boolean):p?[p]:[];return r.jsxs(Qo,{children:[r.jsx("html",{lang:"fr"}),r.jsx("title",{children:e}),r.jsx("meta",{name:"description",content:i}),n&&r.jsx("meta",{name:"keywords",content:n}),r.jsx("meta",{name:"robots",content:g}),r.jsx("link",{rel:"canonical",href:m}),r.jsx("link",{rel:"alternate",hrefLang:"fr-CM",href:m}),r.jsx("link",{rel:"alternate",hrefLang:"fr",href:m}),r.jsx("link",{rel:"alternate",hrefLang:"x-default",href:m}),r.jsx("meta",{property:"og:type",content:d}),r.jsx("meta",{property:"og:site_name",content:"Yorix CM"}),r.jsx("meta",{property:"og:title",content:e}),r.jsx("meta",{property:"og:description",content:i}),r.jsx("meta",{property:"og:url",content:m}),r.jsx("meta",{property:"og:image",content:a}),r.jsx("meta",{property:"og:image:width",content:"1200"}),r.jsx("meta",{property:"og:image:height",content:"630"}),r.jsx("meta",{property:"og:locale",content:"fr_FR"}),r.jsx("meta",{name:"twitter:card",content:"summary_large_image"}),r.jsx("meta",{name:"twitter:title",content:e}),r.jsx("meta",{name:"twitter:description",content:i}),r.jsx("meta",{name:"twitter:image",content:a}),h.map((k,v)=>r.jsx("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:typeof k=="string"?k:JSON.stringify(k)}},v))]})}function en({items:e}){return e!=null&&e.length?r.jsx("nav",{"aria-label":"Fil d'Ariane",className:"seo-breadcrumb",children:r.jsx("ol",{style:{display:"flex",flexWrap:"wrap",gap:"6px 10px",alignItems:"center",listStyle:"none",margin:"0 0 16px",padding:0,fontSize:".78rem",color:"var(--gray)"},children:e.map((i,t)=>r.jsxs("li",{style:{display:"flex",alignItems:"center",gap:8},children:[t>0&&r.jsx("span",{"aria-hidden":"true",children:"/"}),i.href&&!i.current?r.jsx("a",{href:i.href,style:{color:"var(--green)",fontWeight:600},children:i.label}):r.jsx("span",{style:{color:i.current?"var(--ink)":"var(--gray)",fontWeight:i.current?700:500},children:i.label})]},i.href||t))})}):null}function gt({city:e,mode:i,goPage:t}){const o=(e==null?void 0:e.name)||"Cameroun",n=(e==null?void 0:e.slug)||"",d={hub:`Yorix à ${o} — marketplace, livraison & services`,acheter:`Acheter en ligne à ${o} — Yorix marketplace Cameroun`,livraison:`Livraison à ${o} — livreurs & colis au Cameroun`,prestataires:`Prestataires à ${o} — services à domicile vérifiés`},a={hub:`Yorix est une marketplace camerounaise : achetez en ligne à ${o}, faites-vous livrer rapidement et trouvez des prestataires vérifiés. Paiement MTN MoMo, Orange Money et protection Escrow.`,acheter:`Sur Yorix, l’achat en ligne à ${o} est simple : catalogue produits locaux et importés, vendeurs vérifiés, livraison suivie. Idéal pour votre shopping au Cameroun.`,livraison:`Notre service de livraison couvre ${o} et le réseau national : livreurs indépendants, suivi et tarifs transparents. Colis, courses, e-commerce — Yorix Ride.`,prestataires:`Trouvez des prestataires à ${o} : plomberie, électricité, ménage, beauté, BTP… profils vérifiés et réservation par WhatsApp.`},p=[{label:"Accueil",href:"/"},{label:d[i]||d.hub,current:!0}];return r.jsx("section",{className:"sec",style:{paddingBottom:8},children:r.jsxs("div",{style:{maxWidth:920,margin:"0 auto"},children:[r.jsx(en,{items:p}),r.jsxs("header",{children:[r.jsx("h1",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.15rem, 2.5vw, 1.45rem)",color:"var(--ink)",margin:"0 0 12px",letterSpacing:"-.4px"},children:d[i]||d.hub}),r.jsx("p",{style:{fontSize:".88rem",color:"var(--gray)",lineHeight:1.75,margin:0},children:a[i]||a.hub})]}),r.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:10,marginTop:18},children:[r.jsxs("button",{type:"button",className:"cta-w",style:{padding:"12px 14px",textAlign:"left",borderRadius:12,cursor:"pointer"},onClick:()=>n&&t("seoCity",{citySlug:n,mode:"acheter"}),children:[r.jsxs("strong",{style:{display:"block",marginBottom:4},children:["🛍️ Produits à ",o]}),r.jsx("span",{style:{fontSize:".76rem",opacity:.9},children:"Marketplace & catégories"})]}),r.jsxs("button",{type:"button",className:"cta-w",style:{padding:"12px 14px",textAlign:"left",borderRadius:12,cursor:"pointer"},onClick:()=>n&&t("seoCity",{citySlug:n,mode:"livraison"}),children:[r.jsx("strong",{style:{display:"block",marginBottom:4},children:"🚚 Livraison"}),r.jsx("span",{style:{fontSize:".76rem",opacity:.9},children:"Livreurs & délais"})]}),r.jsxs("button",{type:"button",className:"cta-w",style:{padding:"12px 14px",textAlign:"left",borderRadius:12,cursor:"pointer"},onClick:()=>n&&t("seoCity",{citySlug:n,mode:"prestataires"}),children:[r.jsx("strong",{style:{display:"block",marginBottom:4},children:"👷 Prestataires"}),r.jsx("span",{style:{fontSize:".76rem",opacity:.9},children:"Services à domicile"})]}),r.jsxs("button",{type:"button",className:"cta-w",style:{padding:"12px 14px",textAlign:"left",borderRadius:12,cursor:"pointer"},onClick:()=>t("business"),children:[r.jsx("strong",{style:{display:"block",marginBottom:4},children:"💼 Business"}),r.jsx("span",{style:{fontSize:".76rem",opacity:.9},children:"B2B & grossistes"})]})]})]})})}const rn="https://msrymchhhxitdevthvdi.supabase.co",tn="sb_publishable_yJj7JNdn-r19Pjc070IOBg_y2VzGJXA",on=rn,nn=tn,R=Bi(on,nn),Ue="237696565654",an="676935195",sn="696565654",ln="237696565654",cn="yorix_unsigned",xt=["Téléphones & HighTech","Mode & Accessoires","Alimentation","Maison & Decoration","Agricole","Beauté & Soins","BTP","Automobile","Éducation","Services"],dn=["Toutes les villes","Douala","Yaoundé","Bafoussam","Bamenda","Garoua","Kribi","Ngaoundéré","Maroua","Ebolowa","Buea","Bertoua"],ht={buyer:"🛍️ Acheteur",seller:"🏪 Vendeur",delivery:"🚚 Livreur",provider:"👷 Prestataire",admin:"🛡️ Administrateur"},Sa={pending:"⏳ En attente",en_cours:"🚚 En cours",livre:"✅ Livré",echec:"❌ Échoué"},Ca={pending:"⏳ En attente",securise:"🔐 Sécurisé",libere:"✅ Libéré",rembourse:"↩️ Remboursé"},pn=[{id:"p1",name:"Claude Mbassi",metier:"Plombier certifié",categorie:"Plomberie",ville:"Douala",quartier:"Akwa",emoji:"🔧",photo:"https://images.unsplash.com/photo-1620207418302-439b387441b0?w=400&q=80",color_bg:"linear-gradient(135deg, #dbeafe, #bfdbfe)",tags:["Plomberie","Sanitaire","Chauffe-eau"],note:4.9,avis:87,prix:"15 000 FCFA/h",experience:"8 ans",verifie:!0,top:!0,dispo:!0,bio:"Spécialiste en installations sanitaires et réparations d'urgence. Intervention rapide dans tout Douala. Devis gratuit.",telephone:"+237696565454",realisations:340},{id:"p2",name:"Électro Bertrand",metier:"Électricien",categorie:"Électricité",ville:"Yaoundé",quartier:"Bastos",emoji:"⚡",photo:"https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&q=80",color_bg:"linear-gradient(135deg, #fef3c7, #fde68a)",tags:["Électricité","Installation","Dépannage"],note:4.8,avis:124,prix:"12 000 FCFA/h",experience:"12 ans",verifie:!0,top:!0,dispo:!0,bio:"Installation électrique complète, mise aux normes, dépannage 24h/24. Travaux garantis 1 an.",telephone:"+237677884455",realisations:450},{id:"p3",name:"Raissa Design",metier:"Graphiste freelance",categorie:"Graphisme",ville:"Douala",quartier:"Bonanjo",emoji:"🎨",photo:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",color_bg:"linear-gradient(135deg, #fce7f3, #fbcfe8)",tags:["Logo","Flyer","Branding"],note:5,avis:56,prix:"25 000 FCFA/projet",experience:"5 ans",verifie:!0,top:!1,dispo:!0,bio:"Création d'identité visuelle, logos, flyers et supports print. Style moderne et africain contemporain.",telephone:"+237699001122",realisations:180},{id:"p4",name:"PhotoCam Pro",metier:"Photographe",categorie:"Photographie",ville:"Kribi",quartier:"Centre-ville",emoji:"📸",photo:"https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400&q=80",color_bg:"linear-gradient(135deg, #e0e7ff, #c7d2fe)",tags:["Mariage","Portrait","Événementiel"],note:4.9,avis:203,prix:"50 000 FCFA/jour",experience:"10 ans",verifie:!0,top:!0,dispo:!0,bio:"Photographe de mariage, portrait et événementiel. Studio équipé + déplacement partout au Cameroun.",telephone:"+237670223344",realisations:520},{id:"p5",name:"CleanPro237",metier:"Service de nettoyage",categorie:"Nettoyage",ville:"Douala",quartier:"Bonapriso",emoji:"🧹",photo:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",color_bg:"linear-gradient(135deg, #dcfce7, #bbf7d0)",tags:["Ménage","Bureaux","Grand nettoyage"],note:4.6,avis:312,prix:"8 000 FCFA/h",experience:"6 ans",verifie:!0,top:!1,dispo:!0,bio:"Nettoyage professionnel de maisons, bureaux et appartements. Produits écologiques. Équipe formée.",telephone:"+237655112233",realisations:890},{id:"p6",name:"DevCam Tech",metier:"Développeur Web",categorie:"Informatique",ville:"Yaoundé",quartier:"Nlongkak",emoji:"💻",photo:"https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80",color_bg:"linear-gradient(135deg, #cffafe, #a5f3fc)",tags:["Site web","App","E-commerce"],note:4.8,avis:41,prix:"200 000 FCFA/projet",experience:"7 ans",verifie:!0,top:!0,dispo:!0,bio:"Création de sites web, applications mobiles et boutiques en ligne. Technologies React, Next.js, React Native.",telephone:"+237690112233",realisations:95},{id:"p7",name:"Kouakou Menuiserie",metier:"Menuisier ébéniste",categorie:"Menuiserie",ville:"Bafoussam",quartier:"Tamdja",emoji:"🪚",photo:"https://images.unsplash.com/photo-1513467655676-561b7d489a88?w=400&q=80",color_bg:"linear-gradient(135deg, #fed7aa, #fdba74)",tags:["Meubles","Placards","Sur-mesure"],note:4.7,avis:156,prix:"À partir de 50 000 FCFA",experience:"15 ans",verifie:!0,top:!1,dispo:!0,bio:"Menuiserie traditionnelle et moderne. Fabrication de meubles sur-mesure, placards, portes et fenêtres.",telephone:"+237677445566",realisations:420},{id:"p8",name:"Chef Marguerite",metier:"Cuisinière événementielle",categorie:"Cuisine",ville:"Douala",quartier:"Logbessou",emoji:"👩‍🍳",photo:"https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80",color_bg:"linear-gradient(135deg, #fecaca, #fca5a5)",tags:["Traiteur","Mariages","Cuisine locale"],note:4.9,avis:178,prix:"3 500 FCFA/pers.",experience:"20 ans",verifie:!0,top:!0,dispo:!0,bio:"Traiteur spécialisé cuisine camerounaise et internationale. Ndolé, Poulet DG, Eru... pour mariages et événements.",telephone:"+237699778899",realisations:260},{id:"p9",name:"Beauté by Sandra",metier:"Coiffeuse à domicile",categorie:"Beauté",ville:"Yaoundé",quartier:"Mvan",emoji:"💇‍♀️",photo:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",color_bg:"linear-gradient(135deg, #fbcfe8, #f9a8d4)",tags:["Tresses","Coloration","Soins"],note:5,avis:89,prix:"10 000 FCFA/prest.",experience:"6 ans",verifie:!0,top:!1,dispo:!0,bio:"Coiffure à domicile : tresses africaines, mèches, coloration, soins capillaires. Je me déplace partout à Yaoundé.",telephone:"+237651223344",realisations:340}],za=[{id:1,slug:"vendre-en-ligne-cameroun-2026",title:"Comment vendre en ligne au Cameroun en 2026 : le guide complet",excerpt:"Stratégies concrètes pour lancer ton business e-commerce au Cameroun : choix des produits, marketing WhatsApp, paiement mobile, logistique locale.",cat:"BUSINESS",emoji:"📈",color_bg:"linear-gradient(135deg, #dbeafe, #bfdbfe)",image:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",date:"15 avril 2026",read:"8 min",author:"Équipe Yorix",author_avatar:"Y",featured:!0,external_url:"https://www.journalducameroun.com/e-commerce-au-cameroun-un-marche-en-pleine-expansion/",tags:["E-commerce","Cameroun","Business"]},{id:2,slug:"produits-camerounais-plus-vendus",title:"Les 10 produits camerounais les plus vendus en ligne",excerpt:"Beurre de karité, pagne wax, cacao, miel de Oku, poivre de Penja... Découvre les produits locaux qui cartonnent à l'international.",cat:"LOCAL",emoji:"🌿",color_bg:"linear-gradient(135deg, #dcfce7, #bbf7d0)",image:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",date:"12 avril 2026",read:"6 min",author:"Marie Tchoumi",author_avatar:"M",featured:!1,external_url:"https://www.investiraucameroun.com/agriculture",tags:["Produits locaux","Export","Artisanat"]},{id:3,slug:"mtn-momo-vs-orange-money",title:"MTN MoMo vs Orange Money : quel système de paiement choisir ?",excerpt:"Comparatif détaillé des deux géants du mobile money au Cameroun : frais, limites, sécurité, intégration marchande et expérience utilisateur.",cat:"PAIEMENT",emoji:"💳",color_bg:"linear-gradient(135deg, #fef3c7, #fde68a)",image:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",date:"10 avril 2026",read:"7 min",author:"Jean-Paul Essomba",author_avatar:"J",featured:!1,external_url:"https://www.gsma.com/mobilefordevelopment/mobile-money/",tags:["MoMo","Orange Money","Fintech"]},{id:4,slug:"suivi-commande-temps-reel",title:"Suivi de commande en temps réel : comment ça marche chez Yorix",excerpt:"Découvre notre système de tracking GPS inspiré d'Uber : de la collecte chez le vendeur jusqu'à ta porte, tu vois tout en direct.",cat:"LIVRAISON",emoji:"🚚",color_bg:"linear-gradient(135deg, #fed7aa, #fdba74)",image:"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",date:"8 avril 2026",read:"5 min",author:"Équipe Yorix Ride",author_avatar:"R",featured:!1,external_url:"https://www.uber.com/fr/newsroom/",tags:["Livraison","GPS","Technologie"]},{id:5,slug:"escrow-protection-acheteur",title:"Escrow Yorix : pourquoi ton argent est 100% protégé",excerpt:"Comprends en 5 minutes le système Escrow : ton paiement reste bloqué jusqu'à la livraison confirmée. Zéro arnaque, zéro stress.",cat:"SÉCURITÉ",emoji:"🔐",color_bg:"linear-gradient(135deg, #e9d5ff, #d8b4fe)",image:"https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",date:"5 avril 2026",read:"4 min",author:"Équipe Sécurité",author_avatar:"S",featured:!1,external_url:"https://en.wikipedia.org/wiki/Escrow",tags:["Escrow","Sécurité","Paiement"]},{id:6,slug:"electricien-fiable-douala",title:"Comment trouver un électricien fiable à Douala en 2026",excerpt:"Check-list complète : vérifier les qualifications, demander un devis, évaluer les avis, éviter les arnaques courantes dans le BTP camerounais.",cat:"PRESTATAIRES",emoji:"⚡",color_bg:"linear-gradient(135deg, #fecaca, #fca5a5)",image:"https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",date:"2 avril 2026",read:"6 min",author:"Service Prestataires",author_avatar:"P",featured:!1,external_url:"https://www.cameroon-tribune.cm/",tags:["BTP","Douala","Prestataires"]},{id:7,slug:"pagne-wax-histoire-tendances",title:"Le pagne wax camerounais : histoire, tendances et où acheter",excerpt:"Du marché de Mokolo aux défilés internationaux, le pagne wax conquiert le monde. Guide complet pour reconnaître un vrai pagne de qualité.",cat:"MODE",emoji:"👗",color_bg:"linear-gradient(135deg, #fce7f3, #fbcfe8)",image:"https://images.unsplash.com/photo-1617627191894-1c9e59f7a4ab?w=800&q=80",date:"28 mars 2026",read:"9 min",author:"Fatima Abakar",author_avatar:"F",featured:!1,external_url:"https://www.vogue.fr/mode/article/wax-pagne-africain-histoire",tags:["Mode","Pagne","Culture"]},{id:8,slug:"devenir-livreur-yorix",title:"Devenir livreur Yorix : gagne jusqu'à 150 000 FCFA/mois",excerpt:"Témoignages de livreurs actifs à Yaoundé et Douala, processus d'inscription, revenus réels et conseils pour maximiser tes gains.",cat:"CARRIÈRE",emoji:"🏍️",color_bg:"linear-gradient(135deg, #cffafe, #a5f3fc)",image:"https://images.unsplash.com/photo-1558383331-f520f2888351?w=800&q=80",date:"25 mars 2026",read:"7 min",author:"Équipe Yorix Ride",author_avatar:"R",featured:!1,external_url:"https://www.cameroon-info.net/",tags:["Emploi","Livraison","Revenus"]},{id:9,slug:"fiscalite-vendeurs-cameroun",title:"Fiscalité des vendeurs en ligne au Cameroun : ce qu'il faut savoir",excerpt:"TVA, impôt sur le revenu, patente : toutes les obligations fiscales d'un e-commerçant camerounais expliquées simplement.",cat:"BUSINESS",emoji:"📊",color_bg:"linear-gradient(135deg, #dbeafe, #bfdbfe)",image:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",date:"22 mars 2026",read:"10 min",author:"Expert Comptable",author_avatar:"E",featured:!1,external_url:"https://www.impots.cm/",tags:["Fiscalité","Impôts","Business"]}],_a=[{icon:"🎁",name:"Bon 5 000 FCFA",pts:500},{icon:"🚚",name:"Livraison gratuite x3",pts:300},{icon:"⭐",name:"Statut VIP Yorix",pts:1e3},{icon:"📱",name:"-20% téléphones",pts:400},{icon:"☕",name:"Pack café 500g",pts:200},{icon:"🎓",name:"Cours Academy offert",pts:350}];function We(e,i={}){if(!e||typeof e!="string"||!e.includes("cloudinary.com"))return e;const{width:t=400,quality:o="auto:low",format:n="auto",dpr:d="auto"}=i;if(e.includes("/w_")||e.includes("/q_"))return e;const a=[`w_${t}`,`q_${o}`,`f_${n}`,`dpr_${d}`,"c_limit"].join(",");return e.replace(/\/upload\//,`/upload/${a}/`)}function Ta(e){return!e||!e.includes("cloudinary.com")?"":[`${We(e,{width:400})} 400w`,`${We(e,{width:800})} 800w`,`${We(e,{width:1200})} 1200w`].join(", ")}function Ea(e){return!e||!e.includes("cloudinary.com")?"":We(e,{width:20,quality:"auto:low"})}async function Aa(e){const i=new FormData;i.append("file",e),i.append("upload_preset",cn);const o=await(await fetch("https://api.cloudinary.com/v1_1/dulwb03nf/image/upload",{method:"POST",body:i})).json();if(o.error)throw new Error(o.error.message);return o.secure_url}async function fn(e){const{data:i,error:t}=await R.from("profiles").select("*").eq("id",e).maybeSingle();return t?(console.error("getUserProfile ERROR:",t),null):i}function un(e){const i=["buyer","seller","delivery","provider","admin"],t=e==null?void 0:e.role;return t==="superadmin"?"admin":t&&i.includes(t)?t:"buyer"}const mn=[/(\+?237[\s\-]?[0-9]{8,9})/g,/(\+?[0-9]{1,3}[\s\-]?[0-9]{9,10})/g,/(whatsapp|wa\.me|t\.me|telegram)/gi,/([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g,/(facebook\.com|instagram\.com)/gi];function gn(e){return mn.some(i=>new RegExp(i.source,i.flags).test(e))?{bloque:!0}:{bloque:!1}}const xn="https://msrymchhhxitdevthvdi.supabase.co/functions/v1/send-email";async function hn({to:e,subject:i,html:t,from:o}){try{const n=await fetch(xn,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({to:e,subject:i,html:t,from:o})}),d=await n.json();return n.ok?{success:!0,id:d.id}:(console.error("sendEmail error:",d),{success:!1,error:d.error})}catch(n){return console.error("sendEmail exception:",n),{success:!1,error:n.message}}}function bn(e,i){return`
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f5f1e8;padding:0">
      <div style="background:linear-gradient(135deg,#1a6b3a,#0d4a25);padding:24px 32px;text-align:center">
        <h1 style="color:#fff;margin:0;font-size:28px;letter-spacing:-.5px">Yo<span style="color:#fcd116">rix</span> CM</h1>
        <p style="color:rgba(255,255,255,.8);margin:4px 0 0;font-size:13px">Marketplace du Cameroun 🇨🇲</p>
      </div>
      <div style="background:#fff;padding:32px;border-left:1px solid #e2ddd6;border-right:1px solid #e2ddd6">
        <h2 style="color:#1a6b3a;margin:0 0 16px;font-size:20px">${e}</h2>
        ${i}
      </div>
      <div style="background:#0d1f14;padding:20px 32px;text-align:center;color:rgba(255,255,255,.6);font-size:12px">
        <p style="margin:0 0 8px"><strong style="color:#fff">Yorix CM</strong> — RC DOUALA/2026/B237</p>
        <p style="margin:0">📱 +237 696 56 56 54 · ✉️ support@yorix.cm · 🌐 <a href="https://www.yorix.cm" style="color:#4fd17d">yorix.cm</a></p>
        <p style="margin:12px 0 0;font-size:11px;opacity:.5">Vous recevez cet email car vous êtes utilisateur de Yorix CM.</p>
      </div>
    </div>
  `}function vn(e,i="client"){const o={buyer:"acheteur",seller:"vendeur",delivery:"livreur",provider:"prestataire",client:"client"}[i]||"client";return bn(`Bienvenue sur Yorix, ${e} ! 🎉`,`
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
    `)}const yn=e=>`
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

/* NAVBAR */
.navbar{background:var(--surface);padding:0 24px;display:flex;align-items:center;gap:12px;height:64px;position:sticky;top:0;z-index:300;border-bottom:1px solid var(--border);box-shadow:0 2px 16px var(--shadow);}
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

/* TABS */
.nav-tabs{background:var(--green);display:flex;padding:0 24px;overflow-x:auto;scrollbar-width:none;}
.nav-tabs::-webkit-scrollbar{display:none;}
.tab{color:rgba(255,255,255,.65);padding:9px 13px;font-size:.77rem;font-weight:500;cursor:pointer;border-bottom:2px solid transparent;white-space:nowrap;transition:all .2s;}
.tab:hover{color:#fff;}.tab.active{color:var(--yellow);border-bottom-color:var(--yellow);}

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
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:500;display:flex;align-items:center;justify-content:center;padding:16px;}
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
.notif-backdrop{position:fixed;inset:0;background:rgba(15,20,18,.28);z-index:398;backdrop-filter:blur(2px);}
.notif-drawer{position:fixed;top:62px;right:12px;width:min(408px,calc(100vw - 20px));max-height:calc(100vh - 72px);display:flex;flex-direction:column;background:var(--surface);border-radius:16px;border:1px solid var(--border);box-shadow:0 16px 48px rgba(0,0,0,.14),0 4px 14px rgba(26,107,58,.08);z-index:400;overflow:hidden;}
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
.wa-float{position:fixed;bottom:20px;right:20px;z-index:500;display:flex;flex-direction:column;align-items:flex-end;gap:8px;}
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
.footer{background:${e?"#060d09":"#0a1a10"};color:rgba(255,255,255,.44);padding:34px 24px 18px;margin-top:32px;}
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
.mobile-nav{display:none;position:fixed;bottom:0;left:0;right:0;background:var(--surface);border-top:1px solid var(--border);padding:6px 0 0;z-index:400;box-shadow:0 -4px 20px var(--shadow);}
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
`;function wn({user:e,userData:i,onClose:t,onSuccess:o}){const[n,d]=l.useState(1),[a,p]=l.useState({nom:(i==null?void 0:i.nom)||"",telephone:(i==null?void 0:i.telephone)||"",adresse_collecte:"",adresse_livraison:"",ville:(i==null?void 0:i.ville)||"Douala",colis_description:"",vehicule:"Moto",budget:"",urgence:"normal"}),[c,m]=l.useState({}),[g,h]=l.useState(!1),[k,v]=l.useState(""),z=()=>{const f={};return a.nom.trim()||(f.nom="Nom obligatoire"),a.telephone.trim()||(f.telephone="Téléphone obligatoire"),a.adresse_collecte.trim()||(f.adresse_collecte="Adresse de collecte obligatoire"),a.adresse_livraison.trim()||(f.adresse_livraison="Adresse de livraison obligatoire"),a.colis_description.trim()||(f.colis_description="Description du colis obligatoire"),m(f),Object.keys(f).length===0},w=async()=>{if(z()){h(!0);try{const f=Math.random().toString(36).substring(2,7).toUpperCase(),b=Date.now().toString(36).slice(-3).toUpperCase(),y="YX-"+f+b,{data:P,error:E}=await R.from("deliveries").insert({code_suivi:y,client_nom:a.nom,client_tel:a.telephone,adresse_collecte:a.adresse_collecte,adresse_livraison:a.adresse_livraison,statut:"commande_recue",livreur_vehicule:a.vehicule,distance_km:3.5,temps_estime_min:a.urgence==="urgent"?20:a.urgence==="express"?15:40,commande_at:new Date().toISOString()}).select().single();if(E)throw E;const B={normal:"🟢 Normal (30-60 min)",urgent:"🟠 Urgent (15-30 min)",express:"🔴 Express (< 15 min)"},T=["🚚 *NOUVELLE DEMANDE DE LIVRAISON YORIX*","","📦 *CODE DE SUIVI : "+y+"*","","👤 *CLIENT*","Nom : "+a.nom,"Téléphone : "+a.telephone,"Ville : "+a.ville,"","📍 *TRAJET*","🔴 Collecte : "+a.adresse_collecte,"🟢 Livraison : "+a.adresse_livraison,"","📦 *COLIS*","Description : "+a.colis_description,"Véhicule : "+a.vehicule,"Urgence : "+(B[a.urgence]||a.urgence),a.budget?"Budget proposé : "+a.budget+" FCFA":"Budget : À définir","","✅ *ACTIONS À FAIRE*","1. Assigner un livreur disponible","2. Confirmer le prix au client","3. Le client suit sa livraison sur yorix.cm/livraison avec le code "+y,"","Merci Yorix ! 🇨🇲"].join(`
`),I="https://wa.me/"+Ue+"?text="+encodeURIComponent(T);window.open(I,"_blank"),v(y),d(2),o==null||o(y)}catch(f){console.error("ModalDemandeLivraison:",f),alert("Erreur : "+f.message)}h(!1)}};return n===2?r.jsx("div",{className:"modal-overlay",onClick:f=>f.target===f.currentTarget&&t(),children:r.jsxs("div",{className:"modal",style:{maxWidth:480,textAlign:"center"},children:[r.jsx("button",{className:"modal-close",onClick:t,children:"✕"}),r.jsx("div",{style:{fontSize:"4rem",marginBottom:12},children:"🎉"}),r.jsx("h2",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.4rem",color:"var(--green)",marginBottom:8,letterSpacing:"-.3px"},children:"Demande envoyée !"}),r.jsxs("p",{style:{fontSize:".88rem",color:"var(--gray)",lineHeight:1.7,marginBottom:20},children:["Notre équipe va assigner un livreur et vous recontacter dans les ",r.jsx("strong",{children:"5 minutes"})," pour confirmer."]}),r.jsxs("div",{style:{background:"linear-gradient(135deg, var(--green-pale), #fef9e0)",border:"2px dashed var(--green)",borderRadius:12,padding:18,marginBottom:18},children:[r.jsx("div",{style:{fontSize:".7rem",color:"var(--gray)",fontWeight:700,marginBottom:5,letterSpacing:".05em"},children:"VOTRE CODE DE SUIVI"}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontSize:"1.8rem",fontWeight:800,color:"var(--green)",letterSpacing:".08em",marginBottom:10},children:k}),r.jsx("button",{onClick:()=>{var f;(f=navigator.clipboard)==null||f.writeText(k),alert("✅ Code copié !")},style:{background:"var(--surface)",color:"var(--ink)",border:"1.5px solid var(--border)",borderRadius:8,padding:"6px 14px",fontSize:".75rem",fontWeight:600,cursor:"pointer"},children:"📋 Copier le code"})]}),r.jsx("p",{style:{fontSize:".78rem",color:"var(--gray)",marginBottom:18,lineHeight:1.6},children:"💡 Conservez ce code pour suivre votre livraison en temps réel sur la page Livraison."}),r.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:[r.jsx("button",{onClick:t,style:{background:"var(--surface2)",color:"var(--ink)",border:"1.5px solid var(--border)",borderRadius:9,padding:"11px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".82rem"},children:"Fermer"}),r.jsx("button",{onClick:()=>{t(),window.location.href="/?page=livraison&code="+k},style:{background:"var(--green)",color:"#fff",border:"none",padding:"11px",borderRadius:9,cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem"},children:"📍 Suivre maintenant"})]})]})}):r.jsx("div",{className:"modal-overlay",onClick:f=>f.target===f.currentTarget&&t(),children:r.jsxs("div",{className:"modal",style:{maxWidth:560},children:[r.jsx("button",{className:"modal-close",onClick:t,children:"✕"}),r.jsxs("div",{style:{textAlign:"center",marginBottom:18},children:[r.jsx("div",{style:{fontSize:"2.8rem",marginBottom:6,background:"var(--green-pale)",width:72,height:72,borderRadius:"50%",display:"inline-flex",alignItems:"center",justifyContent:"center"},children:"📦"}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontSize:"1.3rem",fontWeight:800,color:"var(--ink)",marginTop:8,letterSpacing:"-.3px"},children:"Demander une livraison"}),r.jsx("p",{style:{fontSize:".82rem",color:"var(--gray)",marginTop:4},children:"Remplissez le formulaire, un livreur sera assigné en quelques minutes"})]}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",color:"var(--green)",marginBottom:8,marginTop:4},children:"👤 Vos coordonnées"}),r.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14},children:[r.jsxs("div",{className:"form-group",style:{marginBottom:0},children:[r.jsxs("label",{className:"form-label",children:["Nom ",r.jsx("span",{children:"*"})]}),r.jsx("input",{className:"form-input"+(c.nom?" error":""),placeholder:"Votre nom",value:a.nom,onChange:f=>p(b=>({...b,nom:f.target.value}))}),c.nom&&r.jsx("span",{className:"form-error-text",children:c.nom})]}),r.jsxs("div",{className:"form-group",style:{marginBottom:0},children:[r.jsxs("label",{className:"form-label",children:["Téléphone ",r.jsx("span",{children:"*"})]}),r.jsx("input",{className:"form-input"+(c.telephone?" error":""),placeholder:"+237 6XX XXX XXX",value:a.telephone,onChange:f=>p(b=>({...b,telephone:f.target.value}))}),c.telephone&&r.jsx("span",{className:"form-error-text",children:c.telephone})]})]}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",color:"var(--green)",marginBottom:8},children:"📍 Adresses"}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{className:"form-label",children:["🔴 Adresse de collecte ",r.jsx("span",{children:"*"})]}),r.jsx("input",{className:"form-input"+(c.adresse_collecte?" error":""),placeholder:"Ex: Marché Central, Douala",value:a.adresse_collecte,onChange:f=>p(b=>({...b,adresse_collecte:f.target.value}))}),c.adresse_collecte&&r.jsx("span",{className:"form-error-text",children:c.adresse_collecte})]}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{className:"form-label",children:["🟢 Adresse de livraison ",r.jsx("span",{children:"*"})]}),r.jsx("input",{className:"form-input"+(c.adresse_livraison?" error":""),placeholder:"Ex: Akwa Nord, Rue Bonanjo, Douala",value:a.adresse_livraison,onChange:f=>p(b=>({...b,adresse_livraison:f.target.value}))}),c.adresse_livraison&&r.jsx("span",{className:"form-error-text",children:c.adresse_livraison})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Ville"}),r.jsx("select",{className:"form-select",value:a.ville,onChange:f=>p(b=>({...b,ville:f.target.value})),children:dn.filter(f=>f!=="Toutes les villes").map(f=>r.jsx("option",{value:f,children:f},f))})]}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",color:"var(--green)",marginBottom:8,marginTop:4},children:"📦 Détails du colis"}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{className:"form-label",children:["Description du colis ",r.jsx("span",{children:"*"})]}),r.jsx("textarea",{className:"form-textarea"+(c.colis_description?" error":""),style:{minHeight:60},placeholder:"Ex: Enveloppe de documents, Carton de 5kg, Sac à main...",value:a.colis_description,onChange:f=>p(b=>({...b,colis_description:f.target.value}))}),c.colis_description&&r.jsx("span",{className:"form-error-text",children:c.colis_description})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Type de véhicule"}),r.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6},children:[{id:"Moto",icon:"🏍️",label:"Moto",sub:"Petits colis"},{id:"Voiture",icon:"🚗",label:"Voiture",sub:"Colis moyens"},{id:"Minibus",icon:"🚐",label:"Minibus",sub:"Gros volume"}].map(f=>r.jsxs("div",{onClick:()=>p(b=>({...b,vehicule:f.id})),style:{border:"2px solid "+(a.vehicule===f.id?"var(--green)":"var(--border)"),background:a.vehicule===f.id?"var(--green-pale)":"var(--surface)",borderRadius:9,padding:"10px 6px",cursor:"pointer",textAlign:"center",transition:"all .2s"},children:[r.jsx("div",{style:{fontSize:"1.4rem",marginBottom:3},children:f.icon}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem",color:"var(--ink)"},children:f.label}),r.jsx("div",{style:{fontSize:".62rem",color:"var(--gray)"},children:f.sub})]},f.id))})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Niveau d'urgence"}),r.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6},children:[{id:"normal",icon:"🟢",label:"Normal",time:"30-60 min"},{id:"urgent",icon:"🟠",label:"Urgent",time:"15-30 min"},{id:"express",icon:"🔴",label:"Express",time:"< 15 min"}].map(f=>r.jsxs("div",{onClick:()=>p(b=>({...b,urgence:f.id})),style:{border:"2px solid "+(a.urgence===f.id?"var(--green)":"var(--border)"),background:a.urgence===f.id?"var(--green-pale)":"var(--surface)",borderRadius:9,padding:"10px 6px",cursor:"pointer",textAlign:"center",transition:"all .2s"},children:[r.jsx("div",{style:{fontSize:"1.1rem",marginBottom:2},children:f.icon}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".76rem",color:"var(--ink)"},children:f.label}),r.jsx("div",{style:{fontSize:".62rem",color:"var(--gray)"},children:f.time})]},f.id))})]}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{className:"form-label",children:["Budget proposé (FCFA) ",r.jsx("span",{style:{color:"var(--gray)",fontSize:".7rem"},children:"— optionnel"})]}),r.jsx("input",{className:"form-input",type:"number",placeholder:"Ex: 2000 (laisser vide = à définir avec livreur)",value:a.budget,onChange:f=>p(b=>({...b,budget:f.target.value}))}),r.jsx("div",{style:{fontSize:".68rem",color:"var(--gray)",marginTop:4,lineHeight:1.5},children:"💡 Tarifs indicatifs : Intra-ville 500-1500 F · Inter-quartiers 1500-3000 F · Inter-villes 3000-8000 F"})]}),r.jsx("button",{className:"form-submit",onClick:w,disabled:g,style:{marginTop:8},children:g?r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"spinner",style:{width:16,height:16,borderWidth:2}}),"Envoi en cours..."]}):"📦 Envoyer ma demande"}),r.jsx("p",{style:{fontSize:".7rem",color:"var(--gray)",textAlign:"center",marginTop:10,lineHeight:1.5},children:"🔒 Vos informations sont sécurisées · Paiement à la livraison"})]})})}function kn({user:e,userData:i,initialProduct:t=null,onClose:o,isModal:n=!1}){const[d,a]=l.useState([]),[p,c]=l.useState(null),[m,g]=l.useState([]),[h,k]=l.useState(""),[v,z]=l.useState(!0),[w,f]=l.useState(!1),[b,y]=l.useState(!1),[P,E]=l.useState(""),B=l.useRef(null);l.useEffect(()=>{t!=null&&t.vendeur_id&&(e!=null&&e.id)&&t.vendeur_id!==e.id&&I(t.vendeur_id,t.id)},[t==null?void 0:t.id,e==null?void 0:e.id]),l.useEffect(()=>{e!=null&&e.id&&T()},[e==null?void 0:e.id]);const T=async()=>{z(!0);try{const{data:S,error:M}=await R.from("conversations").select("*").or(`user1_id.eq.${e.id},user2_id.eq.${e.id}`).order("last_message_at",{ascending:!1});if(M)throw M;a(S||[])}catch(S){console.warn("Chargement conversations:",S.message)}z(!1)},I=async(S,M=null)=>{if(!(e!=null&&e.id)||!S||e.id===S)return;const[Y,G]=e.id<S?[e.id,S]:[S,e.id];try{let L=R.from("conversations").select("*").eq("user1_id",Y).eq("user2_id",G);M?L=L.eq("product_id",M):L=L.is("product_id",null);const{data:pe}=await L.maybeSingle();if(pe){c(pe.id),await T();return}const{data:re,error:te}=await R.from("conversations").insert({user1_id:Y,user2_id:G,product_id:M}).select().single();if(te)throw te;c(re.id),await T()}catch(L){console.error("startConversation:",L),alert("Erreur : "+L.message)}};l.useEffect(()=>{if(!p){g([]);return}oe()},[p]);const oe=async()=>{try{const{data:S,error:M}=await R.from("messages").select("*").eq("conversation_id",p).order("created_at",{ascending:!0});if(M)throw M;g(S||[])}catch(S){console.warn("Chargement messages:",S.message)}};l.useEffect(()=>{if(!p)return;const S=R.channel(`chat-${p}`).on("postgres_changes",{event:"INSERT",schema:"public",table:"messages",filter:`conversation_id=eq.${p}`},M=>{g(Y=>Y.some(G=>G.id===M.new.id)?Y:[...Y,M.new])}).subscribe();return()=>{R.removeChannel(S)}},[p]),l.useEffect(()=>{var S;(S=B.current)==null||S.scrollIntoView({behavior:"smooth"})},[m]);const V=async()=>{if(!h.trim()||!p||w)return;const S=gn(h);if(S!=null&&S.bloque){y(!0),E(S.raison||"Partage de contact interdit"),setTimeout(()=>y(!1),5e3),e&&R.from("fraud_logs").insert({type:"tentative_contournement_chat",user_id:e.id,message:h}).then(({error:M})=>{M&&console.warn("fraud_logs:",M.message)});return}f(!0);try{const{data:M,error:Y}=await R.from("messages").insert({conversation_id:p,sender_id:e.id,content:h.trim()}).select().single();if(Y)throw Y;g(G=>G.some(L=>L.id===M.id)?G:[...G,M]),k("")}catch(M){alert("Erreur envoi : "+M.message)}f(!1)},U=S=>S.user1_id===e.id?S.user2_id:S.user1_id;if(!e)return r.jsx("div",{style:{padding:30,textAlign:"center",color:"var(--gray)"},children:"🔐 Connectez-vous pour accéder à la messagerie."});const de=n?{background:"var(--surface)",borderRadius:13,overflow:"hidden",height:"80vh",maxHeight:600,display:"flex",width:"100%"}:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:13,overflow:"hidden",height:500,display:"flex"};return r.jsxs("div",{style:de,children:[r.jsxs("div",{style:{width:240,borderRight:"1px solid var(--border)",background:"var(--surface2)",display:"flex",flexDirection:"column"},children:[r.jsx("div",{style:{padding:"12px 14px",borderBottom:"1px solid var(--border)",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".85rem",color:"var(--ink)"},children:"💬 Conversations"}),r.jsx("div",{style:{flex:1,overflowY:"auto"},children:v?r.jsx("div",{style:{padding:20,textAlign:"center",color:"var(--gray)",fontSize:".78rem"},children:"Chargement..."}):d.length===0?r.jsxs("div",{style:{padding:20,textAlign:"center",color:"var(--gray)",fontSize:".75rem",lineHeight:1.6},children:["Aucune conversation.",r.jsx("br",{}),r.jsx("br",{}),'Clique sur "Contacter le vendeur" depuis un produit.']}):d.map(S=>r.jsxs("div",{onClick:()=>c(S.id),style:{padding:"10px 12px",cursor:"pointer",borderBottom:"1px solid var(--border)",background:p===S.id?"var(--green-pale)":"transparent"},children:[r.jsxs("div",{style:{fontWeight:600,fontSize:".8rem",color:"var(--ink)"},children:["👤 ",U(S).slice(0,8),"..."]}),r.jsx("div",{style:{fontSize:".65rem",color:"var(--gray)",marginTop:2},children:S.last_message_at?new Date(S.last_message_at).toLocaleString("fr-FR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}):"Nouveau"}),S.product_id&&r.jsx("div",{style:{fontSize:".6rem",color:"var(--green)",marginTop:3,fontWeight:600},children:"🛍️ Sur un produit"})]},S.id))})]}),r.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column"},children:[r.jsxs("div",{style:{padding:"12px 16px",borderBottom:"1px solid var(--border)",background:"var(--green)",color:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[r.jsxs("div",{children:[r.jsx("div",{style:{fontWeight:700,fontSize:".88rem"},children:p?"💬 Conversation":"Sélectionne une conversation"}),r.jsx("div",{style:{fontSize:".68rem",opacity:.85},children:"🔒 Messagerie sécurisée · Partage de contact interdit"})]}),o&&r.jsx("button",{onClick:o,style:{background:"rgba(255,255,255,.15)",color:"#fff",border:"none",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:"1rem"},children:"✕"})]}),r.jsxs("div",{style:{flex:1,overflowY:"auto",padding:14,background:"var(--surface)",display:"flex",flexDirection:"column",gap:8},children:[p?m.length===0?r.jsxs("div",{style:{textAlign:"center",color:"var(--gray)",marginTop:60,fontSize:".85rem"},children:["Aucun message.",r.jsx("br",{}),"Envoie le premier ! 👇"]}):m.map(S=>{const M=S.sender_id===e.id;return r.jsxs("div",{style:{alignSelf:M?"flex-end":"flex-start",maxWidth:"75%",background:M?"var(--green)":"var(--surface2)",color:M?"#fff":"var(--ink)",padding:"8px 12px",borderRadius:M?"12px 12px 3px 12px":"12px 12px 12px 3px",fontSize:".85rem",lineHeight:1.4,wordBreak:"break-word"},children:[r.jsx("div",{children:S.content}),r.jsxs("div",{style:{fontSize:".6rem",opacity:.7,marginTop:3,textAlign:M?"right":"left"},children:[new Date(S.created_at).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),M&&(S.is_read?" ✓✓":" ✓")]})]},S.id)}):r.jsx("div",{style:{textAlign:"center",color:"var(--gray)",marginTop:60,fontSize:".85rem"},children:"👈 Sélectionne une conversation à gauche"}),b&&r.jsxs("div",{style:{background:"#fee2e2",border:"1px solid #fca5a5",borderRadius:9,padding:"10px 14px",color:"#991b1b",fontSize:".78rem",textAlign:"center",margin:"8px 0",lineHeight:1.5},children:["🚫 ",r.jsx("strong",{children:"Message bloqué"}),r.jsx("br",{}),P||"Partage de contacts externes interdit sur Yorix",r.jsx("br",{}),r.jsx("span",{style:{fontSize:".7rem",opacity:.8},children:"Utilise la messagerie Yorix pour tes échanges."})]}),r.jsx("div",{ref:B})]}),p&&r.jsxs("div",{style:{padding:10,borderTop:"1px solid var(--border)",display:"flex",gap:7,background:"var(--surface)"},children:[r.jsx("input",{type:"text",placeholder:"Écris ton message...",value:h,onChange:S=>k(S.target.value),onKeyDown:S=>{S.key==="Enter"&&!w&&V()},disabled:w,style:{flex:1,border:"1.5px solid var(--border)",borderRadius:8,padding:"9px 12px",fontFamily:"'DM Sans',sans-serif",fontSize:".83rem",outline:"none",background:"var(--surface2)",color:"var(--ink)"}}),r.jsx("button",{onClick:V,disabled:w||!h.trim(),style:{background:"var(--green)",color:"#fff",border:"none",width:40,height:40,borderRadius:8,cursor:w||!h.trim()?"not-allowed":"pointer",fontSize:"1rem",opacity:w||!h.trim()?.5:1},children:w?"...":"➤"})]})]})]})}const jn="modulepreload",Sn=function(e){return"/"+e},bt={},D=function(i,t,o){let n=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),p=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));n=Promise.allSettled(t.map(c=>{if(c=Sn(c),c in bt)return;bt[c]=!0;const m=c.endsWith(".css"),g=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${g}`))return;const h=document.createElement("link");if(h.rel=m?"stylesheet":jn,m||(h.as="script"),h.crossOrigin="",h.href=c,p&&h.setAttribute("nonce",p),document.head.appendChild(h),m)return new Promise((k,v)=>{h.addEventListener("load",k),h.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${c}`)))})}))}function d(a){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=a,window.dispatchEvent(p),!p.defaultPrevented)throw a}return n.then(a=>{for(const p of a||[])p.status==="rejected"&&d(p.reason);return i().catch(d)})};function F({minHeight:e=200,label:i="Chargement..."}){return r.jsxs("div",{className:"loading",style:{minHeight:e,justifyContent:"center",padding:"24px 0"},children:[r.jsx("div",{className:"spinner"}),i]})}const Cn=l.lazy(()=>D(()=>import("./HomePage-CBoT9FI_.js"),__vite__mapDeps([0,1,2,3,4,5,6])).then(e=>({default:e.HomePage}))),zn=l.lazy(()=>D(()=>import("./ProductRouteSections-BQGUOqfc.js"),__vite__mapDeps([7,2,1,3,4,5,6])).then(e=>({default:e.ProductRouteSections}))),_n=l.lazy(()=>D(()=>import("./LivraisonPage-BFQPoCcX.js"),__vite__mapDeps([8,1,6])).then(e=>({default:e.LivraisonPage}))),Tn=l.lazy(()=>D(()=>import("./SiteMarketingPages-D4OANwqi.js"),__vite__mapDeps([9,1,6])).then(e=>({default:e.SiteMarketingPages})));l.lazy(()=>D(()=>import("./LivraisonLazyBlocks-DF8AGIRY.js"),__vite__mapDeps([10,1,6])).then(e=>({default:e.LivraisonTopInteractive})));l.lazy(()=>D(()=>import("./LivraisonLazyBlocks-DF8AGIRY.js"),__vite__mapDeps([10,1,6])).then(e=>({default:e.LivraisonBottomInteractive})));const En=l.lazy(()=>D(()=>import("./FicheProduit-Crmvplwl.js"),__vite__mapDeps([11,1,3,4,5,6])).then(e=>({default:e.FicheProduit}))),An=l.lazy(()=>D(()=>import("./PrestPage-NVexfbeu.js"),__vite__mapDeps([12,1,6])).then(e=>({default:e.PrestPage}))),Nn=l.lazy(()=>D(()=>import("./CheckoutPage-BY1FA9V9.js"),__vite__mapDeps([13,1,5,14,6])).then(e=>({default:e.CheckoutPage}))),Rn=l.lazy(()=>D(()=>import("./CartPage-BfMLOl-4.js"),__vite__mapDeps([15,3,1,14,6])).then(e=>({default:e.CartPage}))),Pn=l.lazy(()=>D(()=>import("./AcademyDetail-DXs-N7-E.js"),__vite__mapDeps([16,1,6])).then(e=>({default:e.AcademyDetail}))),Mn=l.lazy(()=>D(()=>import("./AcademyContactForm-CzIbyaCg.js"),__vite__mapDeps([17,1,6])).then(e=>({default:e.AcademyContactForm}))),In=l.lazy(()=>D(()=>import("./LoyaltyPage-6UpvDu8m.js"),__vite__mapDeps([18,1,6])).then(e=>({default:e.LoyaltyPage}))),Ln=l.lazy(()=>D(()=>import("./SellerDashboard-CEDG88JS.js"),__vite__mapDeps([19,1,6])).then(e=>({default:e.SellerDashboard}))),On=l.lazy(()=>D(()=>import("./BuyerDashboard-ByrI5hIm.js"),__vite__mapDeps([20,1,6])).then(e=>({default:e.BuyerDashboard}))),Dn=l.lazy(()=>D(()=>import("./DeliveryDashboard-3ZE-DSlF.js"),__vite__mapDeps([21,1,6])).then(e=>({default:e.DeliveryDashboard}))),Bn=l.lazy(()=>D(()=>import("./ProviderDashboard-D4Sa33Hi.js"),__vite__mapDeps([22,1,6])).then(e=>({default:e.ProviderDashboard}))),Fn=l.lazy(()=>D(()=>import("./AdminDashboard-C62tKYsc.js"),__vite__mapDeps([23,1,6])).then(e=>({default:e.AdminDashboard}))),qn=l.lazy(()=>D(()=>import("./NotificationsPage-CjhThkWx.js"),__vite__mapDeps([24,1,6])).then(e=>({default:e.NotificationsPage}))),Yn=l.lazy(()=>D(()=>import("./PromotionsPage-Eem6JY3c.js"),__vite__mapDeps([25,1,6])).then(e=>({default:e.PromotionsPage})));function Ft(e){if(!e||e.id==null)return null;const i=e.kind||"product",t=Math.max(1,Number(e.qty||1)),o=Number(e.prix??e.price??0),n=e.fulfillmentMode||(i==="service"?"booking":"delivery");return{...e,kind:i,qty:t,prix:o,fulfillmentMode:n}}function Tr(){return{freeShippingThresholdXaf:(Number.isFinite(NaN),5e4),standardDeliveryFeeXaf:(Number.isFinite(NaN),1500)}}function qt(e){const i=Tr(),t=e==null?void 0:e.freeShippingThresholdXaf,o=e==null?void 0:e.standardDeliveryFeeXaf;return{freeShippingThresholdXaf:t!=null&&Number.isFinite(Number(t))&&Number(t)>=0?Number(t):i.freeShippingThresholdXaf,standardDeliveryFeeXaf:o!=null&&Number.isFinite(Number(o))&&Number(o)>=0?Number(o):i.standardDeliveryFeeXaf}}function $n(e){return(e||[]).map(Ft).filter(Boolean).filter(t=>t.kind==="product"&&t.fulfillmentMode!=="pickup").reduce((t,o)=>t+o.prix*o.qty,0)}function Un(e,i){let t=Tr();typeof i=="number"&&Number.isFinite(i)?t={...t,standardDeliveryFeeXaf:i}:i&&typeof i=="object"&&(t=qt(i));const o=(e||[]).map(Ft).filter(Boolean),n=o.filter(y=>y.kind==="product"),d=o.filter(y=>y.kind==="service"),a=n.reduce((y,P)=>y+P.prix*P.qty,0),p=d.reduce((y,P)=>y+P.prix*P.qty,0),c=a+p,m=o.reduce((y,P)=>y+P.qty,0),g=$n(o),h=g>0,k=t.freeShippingThresholdXaf,v=t.standardDeliveryFeeXaf,z=h&&g>=k,w=h&&!z?Math.round(v):0,f=z||!h?0:Math.max(0,Math.round(k-g)),b=!h||k<=0?null:Math.min(1,g/k);return{qty:m,productsCount:n.length,servicesCount:d.length,productsSubtotal:a,servicesSubtotal:p,shippableProductsSubtotal:g,subtotal:c,delivery:w,total:c+w,policyThreshold:k,policyStandardFee:v,hasShippableProducts:h,freeShippingUnlocked:z,amountRemainingForFreeShipping:f,freeShippingProgress01:b,freeShippingNotApplicable:!h}}function Na(e,i,t,o=4){const n=Math.max(1,Number(o)||4),d=new Set((e||[]).map(v=>v.id)),a=(i||[]).filter(v=>(v==null?void 0:v.id)!=null&&!d.has(v.id)),p=t==null?void 0:t.hasShippableProducts,c=t==null?void 0:t.freeShippingUnlocked,m=(t==null?void 0:t.amountRemainingForFreeShipping)||0;if(!p||c||a.length===0)return a.slice(0,n);const h=a.map(v=>{const z=Number(v.prix||0),w=z>=m;return{p:v,price:z,coversGap:w,delta:w?z-m:m-z}}).filter(v=>v.price>0).sort((v,z)=>v.coversGap!==z.coversGap?v.coversGap?-1:1:v.delta-z.delta).slice(0,n).map(v=>v.p);if(h.length>=n)return h;const k=a.filter(v=>!h.some(z=>z.id===v.id)).slice(0,n-h.length);return[...h,...k]}const Yt="yorix_cart";function Wn(){try{const e=localStorage.getItem(Yt);if(!e)return[];const i=JSON.parse(e);return Array.isArray(i)?i.map(Je).filter(Boolean):[]}catch{return[]}}function Vn(e){try{localStorage.setItem(Yt,JSON.stringify(e||[]))}catch{}}function Je(e){if(!e||!e.id)return null;const i=e.kind||"product";return{...e,kind:i,qty:Math.max(1,Number(e.qty||1)),prix:Number(e.prix||0),fulfillmentMode:e.fulfillmentMode||(i==="service"?"booking":"delivery")}}function Hn(e){if(!(e!=null&&e.id))return null;let i=[];if(Array.isArray(e.image_urls))i=e.image_urls;else if(typeof e.image_urls=="string")try{i=JSON.parse(e.image_urls)}catch{i=[]}const t=e.image&&String(e.image).startsWith("http")?e.image:i[0]&&String(i[0]).startsWith("http")?i[0]:null;return Je({id:e.id,kind:"product",name:e.name_fr||e.name||"Produit",image:t,prix:Number(e.prix||0),qty:1,vendeur_id:e.vendeur_id||null,vendeur_nom:e.vendeur_nom||"",categorie:e.categorie||"",ville:e.ville||"",stock:e.stock??null,fulfillmentMode:"delivery",pricingSnapshot:{base:Number(e.prix||0),currency:"XAF"}})}function Xn(e){return e!=null&&e.id?Je({id:e.id,kind:"service",name:e.name||e.provider_nom||e.metier||"Prestation",image:e.photo||null,prix:Number(e.prix_number||e.prix||0),qty:1,provider_id:e.provider_id||null,provider_nom:e.provider_nom||e.name||"",categorie:e.categorie||"Service",ville:e.ville||"",booking:{date:"",time:"",locationType:"home",notes:""},fulfillmentMode:"booking",pricingSnapshot:{base:Number(e.prix_number||e.prix||0),currency:"XAF"}}):null}function vt(e,i){const t=Je(i);if(!t)return e||[];const o=Array.isArray(e)?e:[],n=o.findIndex(d=>d.id===t.id&&d.kind===t.kind);return n===-1?[...o,t]:o.map((d,a)=>a!==n?d:{...d,qty:d.kind==="service"?1:Math.max(1,d.qty+t.qty)})}function Jn(e,i,t,o){return(e||[]).map(n=>n.id!==i||t&&n.kind!==t?n:n.kind==="service"?{...n,qty:1}:{...n,qty:Math.max(1,Number(n.qty||1)+o)})}function Gn(e,i,t){return(e||[]).filter(o=>!(o.id===i&&(!t||o.kind===t)))}function Kn(e,i=1500){return Un(e,i)}const A={messages:"messages",orders:"orders",payments:"payments",delivery:"delivery",security:"security",promotions:"promotions",system:"system"},K={critical:"critical",important:"important",standard:"standard",promo:"promo"},Qn=[{test:e=>/payment|paiement|checkout|cinetpay/i.test(e||""),category:A.payments,priority:K.critical},{test:e=>/security|fraud|litige|connexion|login|suspicious/i.test(e||""),category:A.security,priority:K.critical},{test:e=>/deliver|livraison|livreur|shipping|colis/i.test(e||""),category:A.delivery,priority:K.important},{test:e=>/order|commande|booking|réservation|prestation|service_booking/i.test(e||""),category:A.orders,priority:K.important},{test:e=>/message|chat|support|conversation/i.test(e||""),category:A.messages,priority:K.important},{test:e=>/promo|offre|soldes|flash/i.test(e||""),category:A.promotions,priority:K.promo}],Zn={[A.messages]:"💬",[A.orders]:"📦",[A.payments]:"💳",[A.delivery]:"🚚",[A.security]:"🛡️",[A.promotions]:"🏷️",[A.system]:"🔔"};function ea(e,i,t){const o=`${e||""} ${i||""} ${t||""}`;for(const n of Qn)if(n.test(o))return{category:n.category,priority:n.priority};return{category:A.system,priority:K.standard}}function ra(e){return e==null?"":String(e).replace(/https?:\/\/[^\s]+/g,i=>{try{const t=new URL(i);return t.hostname.includes("wa.me")||t.hostname.includes("whatsapp")?"Lien WhatsApp":t.hostname.includes("yorix")?"Ouvrir sur Yorix":`[${t.hostname}]`}catch{return"Lien"}})}function Er(e){var a;const i=e.type||"",t=e.titre||"",o=ea(i,t,e.message),n=e.category||o.category,d=e.priority||o.priority;return{...e,_category:n,_priority:d,_icon:e.icon||Zn[n]||"🔔",_title:t||"Notification Yorix",_body:ra(e.message),_image:e.image_url||((a=e.metadata)==null?void 0:a.image_url)||null,_deeplink:typeof e.link=="string"?e.link.trim():"",_timeLabel:e.created_at?new Date(e.created_at).toLocaleString("fr-FR",{dateStyle:"short",timeStyle:"short"}):""}}function ta(e,i){return!i||i==="all"?e:(e||[]).filter(t=>Er(t)._category===i)}function ia(e,i){if(typeof window>"u"||typeof Notification>"u"||Notification.permission!=="granted"||!(i!=null&&i.pushBrowser))return;const t=e._category||A.system;if(!(i.categories&&i.categories[t]===!1))try{new Notification(e._title,{body:(e._body||"").slice(0,180),icon:"/icons/icon-192.png",tag:String(e.id||e.created_at||"yorix"),silent:!(i!=null&&i.sound)})}catch{}}const $t="yorix_notification_prefs_v1",qe=()=>({pushBrowser:!0,sound:!1,email:!1,sms:!1,whatsappDigest:!1,categories:{[A.messages]:!0,[A.orders]:!0,[A.payments]:!0,[A.delivery]:!0,[A.security]:!0,[A.promotions]:!0,[A.system]:!0}});function X(){try{const e=localStorage.getItem($t);if(!e)return qe();const i=JSON.parse(e);return{...qe(),...i,categories:{...qe().categories,...i.categories||{}}}}catch{return qe()}}function Ut(e){try{const i=X(),t={...i,...e,categories:{...i.categories,...e.categories||{}}};return localStorage.setItem($t,JSON.stringify(t)),t}catch{return X()}}function oa(e){return e?{pushBrowser:e.push_enabled!==!1&&e.desktop_alerts!==!1,sound:e.sound_enabled===!0,email:e.email_critical===!0,sms:e.sms_critical===!0,whatsappDigest:e.whatsapp_critical!==!1,categories:{[A.messages]:e.category_messages!==!1,[A.orders]:e.category_orders!==!1,[A.payments]:e.category_payments!==!1,[A.delivery]:e.category_delivery!==!1,[A.security]:e.category_security!==!1,[A.promotions]:e.category_promotions!==!1,[A.system]:e.category_system!==!1}}:null}function Wt(e,i){const t=i.categories||{};return{user_id:e,push_enabled:i.pushBrowser!==!1,desktop_alerts:i.pushBrowser!==!1,sound_enabled:i.sound===!0,email_critical:i.email===!0,sms_critical:i.sms===!0,whatsapp_critical:i.whatsappDigest!==!1,category_messages:t[A.messages]!==!1,category_orders:t[A.orders]!==!1,category_payments:t[A.payments]!==!1,category_delivery:t[A.delivery]!==!1,category_security:t[A.security]!==!1,category_promotions:t[A.promotions]!==!1,category_system:t[A.system]!==!1,updated_at:new Date().toISOString()}}async function Vt(e,i){if(!(e!=null&&e.from)||!i)return X();try{const{data:t,error:o}=await e.from("notification_preferences").select("*").eq("user_id",i).maybeSingle();if(o)return console.warn("[notification_prefs] load:",o.message),X();if(t){const p=oa(t);return p&&Ut(p),p||X()}const n=X(),d=Wt(i,n),{error:a}=await e.from("notification_preferences").upsert(d,{onConflict:"user_id"});return a&&console.warn("[notification_prefs] seed:",a.message),n}catch(t){return console.warn("[notification_prefs]",(t==null?void 0:t.message)||t),X()}}async function na(e,i,t){const o=Ut(t);if(!(e!=null&&e.from)||!i)return o;try{const n=Wt(i,o),{error:d}=await e.from("notification_preferences").upsert(n,{onConflict:"user_id"});d&&console.warn("[notification_prefs] save:",d.message)}catch(n){console.warn("[notification_prefs] save",(n==null?void 0:n.message)||n)}return o}function aa({user:e,compact:i=!1}){const[t,o]=l.useState("loading"),[n,d]=l.useState(null);l.useEffect(()=>{a()},[e==null?void 0:e.id]);async function a(){if(!("serviceWorker"in navigator)||!("PushManager"in window)){o("unsupported");return}if(Notification.permission==="denied"){o("denied");return}try{const k=await(await navigator.serviceWorker.ready).pushManager.getSubscription();o(k?"subscribed":"unsubscribed")}catch(h){console.error("[PushManager] Erreur check :",h),o("unsubscribed")}}async function p(){if(!(e!=null&&e.id)){d("Vous devez être connecté");return}{d("Configuration manquante (VAPID)"),console.error("[PushManager] VITE_VAPID_PUBLIC_KEY non définie");return}}async function c(){o("pending"),d(null);try{const k=await(await navigator.serviceWorker.ready).pushManager.getSubscription();if(k){const v=k.endpoint,{error:z}=await R.from("push_subscriptions").delete().eq("endpoint",v);z&&console.warn("[PushManager] Erreur delete Supabase :",z),await k.unsubscribe()}o("unsubscribed"),console.log("[PushManager] ✅ Désabonné des push")}catch(h){console.error("[PushManager] Erreur désabonnement :",h),d(h.message||"Erreur lors du désabonnement"),o("subscribed")}}if(!(e!=null&&e.id))return null;const m={padding:i?"10px 12px":"14px 16px",background:"var(--surface2, #f6f6f6)",borderRadius:12,border:"1px solid var(--border, #e5e5e5)",marginBottom:12,fontSize:i?13:14},g={padding:"8px 14px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:600,fontSize:13,marginTop:8,width:"100%"};return t==="loading"?r.jsx("div",{style:m,children:r.jsx("div",{style:{color:"var(--gray, #666)"},children:"⏳ Vérification..."})}):t==="unsupported"?r.jsxs("div",{style:m,children:[r.jsx("div",{style:{color:"var(--gray, #666)"},children:"ℹ️ Votre navigateur ne supporte pas les notifications push."}),r.jsx("div",{style:{fontSize:11,color:"var(--gray, #999)",marginTop:4},children:"Utilisez Chrome, Firefox ou Edge pour activer cette fonctionnalité."})]}):t==="denied"?r.jsxs("div",{style:m,children:[r.jsx("div",{style:{color:"#c62828"},children:"🔕 Notifications bloquées"}),r.jsx("div",{style:{fontSize:11,color:"var(--gray, #666)",marginTop:4},children:"Vous avez refusé les notifications. Pour les réactiver, allez dans les paramètres de votre navigateur (🔒 icône à gauche de l'URL)."})]}):t==="subscribed"?r.jsxs("div",{style:m,children:[r.jsx("div",{style:{color:"var(--green, #2e7d32)",fontWeight:600},children:"🔔 Notifications activées"}),r.jsx("div",{style:{fontSize:11,color:"var(--gray, #666)",marginTop:4},children:"Vous recevrez des alertes pour les nouveaux messages et produits."}),r.jsx("button",{style:{...g,background:"var(--surface, #fff)",border:"1px solid var(--border, #ddd)",color:"var(--ink, #222)"},onClick:c,children:"🔕 Désactiver les notifications"}),n&&r.jsxs("div",{style:{color:"#c62828",fontSize:12,marginTop:6},children:["⚠️ ",n]})]}):t==="pending"?r.jsx("div",{style:m,children:r.jsx("div",{style:{color:"var(--gray, #666)"},children:"⏳ En cours..."})}):r.jsxs("div",{style:m,children:[r.jsx("div",{style:{fontWeight:600,marginBottom:4},children:"🔔 Activer les notifications"}),r.jsx("div",{style:{fontSize:12,color:"var(--gray, #666)",marginBottom:8},children:"Soyez alerté dès qu'un client vous envoie un message ou qu'un nouveau produit est ajouté."}),r.jsx("button",{style:{...g,background:"var(--green, #2e7d32)",color:"#fff"},onClick:p,children:"✅ Activer maintenant"}),n&&r.jsxs("div",{style:{color:"#c62828",fontSize:12,marginTop:6},children:["⚠️ ",n]})]})}const sa=[{key:"all",label:"Tous"},{key:A.messages,label:"Messages"},{key:A.orders,label:"Commandes"},{key:A.payments,label:"Paiements"},{key:A.delivery,label:"Livraison"},{key:A.security,label:"Sécurité"},{key:A.promotions,label:"Promos"},{key:A.system,label:"Système"}];function la(e){return e===K.critical?"notif-card-priority-critical":e===K.important?"notif-card-priority-important":e===K.promo?"notif-card-priority-promo":"notif-card-priority-standard"}function ca({variant:e="dropdown",notifs:i=[],user:t,goPage:o,onMarkRead:n,onMarkAllRead:d,onDismiss:a,onClose:p,onPrefsUpdated:c}){const[m,g]=l.useState("all"),[h,k]=l.useState(()=>X());l.useEffect(()=>{if(!(t!=null&&t.id)){k(X());return}let f=!1;return Vt(R,t.id).then(b=>{f||k(b)}),()=>{f=!0}},[t==null?void 0:t.id]);const v=l.useMemo(()=>ta(i,m==="all"?null:m),[i,m]),z=f=>{na(R,t==null?void 0:t.id,f).then(b=>{k(b),c==null||c(b)})},w=l.useMemo(()=>i.filter(f=>!f.lu).length,[i]);return r.jsxs("div",{className:`notif-hub notif-hub--${e}`,children:[r.jsxs("div",{className:"notif-hub-toolbar",children:[r.jsxs("div",{className:"notif-hub-title-row",children:[r.jsx("h2",{className:"notif-hub-title",children:"Notifications"}),w>0&&r.jsx("span",{className:"notif-hub-badge",children:w>99?"99+":w})]}),r.jsxs("div",{className:"notif-hub-actions-top",children:[w>0&&r.jsx("button",{type:"button",className:"notif-link-btn",onClick:()=>d==null?void 0:d(),children:"Tout marquer lu"}),e==="dropdown"&&r.jsx("button",{type:"button",className:"notif-link-btn notif-link-btn-strong",onClick:()=>o==null?void 0:o("notifications"),children:"Voir tout"}),e==="dropdown"&&r.jsx("button",{type:"button",className:"notif-hub-close",onClick:()=>p==null?void 0:p(),"aria-label":"Fermer",children:"✕"})]})]}),r.jsx("div",{className:"notif-filter-strip",role:"tablist",children:sa.map(f=>r.jsx("button",{type:"button",role:"tab","aria-selected":m===f.key,className:`notif-chip${m===f.key?" notif-chip--active":""}`,onClick:()=>g(f.key),children:f.label},f.key))}),r.jsx("div",{className:e==="dropdown"?"notif-hub-scroll notif-hub-scroll--drop":"notif-hub-scroll notif-hub-scroll--page",children:v.length===0?r.jsxs("div",{className:"notif-empty premium",children:[r.jsx("div",{className:"notif-empty-icon",children:"🔕"}),r.jsx("div",{className:"notif-empty-title",children:"Aucune alerte dans ce filtre"}),r.jsx("p",{className:"notif-empty-sub",children:"Les commandes, messages et livraisons apparaîtront ici en temps réel."})]}):r.jsx("ul",{className:"notif-card-list",children:v.map(f=>{var y,P;const b=Er(f);return r.jsxs("li",{className:`notif-card-li ${la(b._priority)}`,children:[r.jsxs("button",{type:"button",className:`notif-card-main${f.lu?"":" notif-card-unread"}`,onClick:()=>n==null?void 0:n(f,{navigate:!0,closeDrawer:e==="dropdown"}),children:[r.jsxs("span",{className:"notif-card-avatar","aria-hidden":!0,children:[b._image?r.jsx("img",{src:b._image,alt:"",loading:"lazy"}):r.jsx("span",{className:"notif-card-emoji",children:b._icon}),!f.lu&&r.jsx("span",{className:"notif-card-dot"})]}),r.jsxs("span",{className:"notif-card-copy",children:[r.jsxs("span",{className:"notif-card-top",children:[r.jsx("span",{className:"notif-card-title",children:b._title}),r.jsx("time",{className:"notif-card-time",dateTime:f.created_at||void 0,children:b._timeLabel})]}),r.jsx("span",{className:"notif-card-body",children:b._body}),((y=b._deeplink)==null?void 0:y.startsWith("http"))&&r.jsx("span",{className:"notif-card-cta-secondary",children:"Ouverture du lien sécurisé →"}),((P=b._deeplink)==null?void 0:P.startsWith("/"))&&r.jsx("span",{className:"notif-card-cta-secondary",children:"Appuyer pour ouvrir dans Yorix"})]})]}),r.jsxs("div",{className:"notif-card-side",children:[r.jsx("button",{type:"button",className:"notif-mini-btn",title:"Lu",onClick:E=>{E.stopPropagation(),n==null||n(f,{navigate:!1,closeDrawer:!1})},children:"✓"}),r.jsx("button",{type:"button",className:"notif-mini-btn notif-mini-btn-del",title:"Masquer",onClick:E=>{E.stopPropagation(),a==null||a(f.id)},children:"🗑"})]})]},String(b.id))})})}),r.jsxs("div",{className:"notif-hub-footer-premium",children:[r.jsxs("div",{className:"notif-preferences-mini",children:[r.jsx("div",{className:"notif-preferences-title",children:"Préférences (compte synchronisé)"}),r.jsxs("label",{className:"notif-toggle",children:[r.jsx("input",{type:"checkbox",checked:h.pushBrowser,onChange:f=>z({pushBrowser:f.target.checked})}),"Alertes bureau (navigateur ouvert)"]}),r.jsxs("label",{className:"notif-toggle",children:[r.jsx("input",{type:"checkbox",checked:h.sound,onChange:f=>z({sound:f.target.checked})}),"Son discret (si navigateur autorise)"]})]}),r.jsx(aa,{user:t,compact:!0})]})]})}function da({open:e,onClose:i,onSelectAction:t,user:o}){const[n,d]=l.useState(!1);if(l.useEffect(()=>{const c=()=>d(window.innerWidth<600);return c(),window.addEventListener("resize",c),()=>window.removeEventListener("resize",c)},[]),l.useEffect(()=>(e?document.body.style.overflow="hidden":document.body.style.overflow="",()=>{document.body.style.overflow=""}),[e]),!e)return null;const a=[{id:"buy",icon:"🛍️",title:"Acheter",desc:"Des milliers de produits livrés à Yaoundé, Douala et partout.",color:"linear-gradient(135deg, #10b981, #059669)",bgIcon:"rgba(16, 185, 129, .12)",cta:"Explorer maintenant",badge:"⭐ Populaire",badgeColor:"#fcd116",miniBadge:"🔒 Escrow inclus"},{id:"sell",icon:"🏪",title:"Vendre",desc:"Créez votre boutique en 2 minutes. Vendez dès aujourd'hui.",color:"linear-gradient(135deg, #f59e0b, #d97706)",bgIcon:"rgba(245, 158, 11, .12)",cta:"Ouvrir ma boutique",badge:null,miniBadge:"💰 Commission 5%"},{id:"service",icon:"👷",title:"Trouver un pro",desc:"Plombiers, électriciens, photographes — tous vérifiés.",color:"linear-gradient(135deg, #8b5cf6, #7c3aed)",bgIcon:"rgba(139, 92, 246, .12)",cta:"Trouver un pro",badge:null,miniBadge:"✓ 850+ vérifiés"},{id:"delivery",icon:"🚚",title:"Faire livrer",desc:"Un livreur récupère votre colis en moins de 30 min.",color:"linear-gradient(135deg, #3b82f6, #2563eb)",bgIcon:"rgba(59, 130, 246, .12)",cta:"Appeler un livreur",badge:null,miniBadge:"⚡ ~25 min"}],p=[{icon:"🛡️",label:"Paiement sécurisé"},{icon:"✅",label:"Vendeurs vérifiés"},{icon:"🇨🇲",label:"100% Cameroun"},{icon:"⚡",label:"Inscription 2 min"}];return r.jsx("div",{onClick:c=>c.target===c.currentTarget&&i(),style:{position:"fixed",inset:0,background:"rgba(10, 20, 16, 0.88)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",zIndex:99999,display:"flex",alignItems:"center",justifyContent:"center",padding:n?"12px":"20px",overflowY:"auto",animation:"yfadeIn .25s ease"},children:r.jsxs("div",{style:{background:"var(--surface, #fff)",borderRadius:n?18:22,maxWidth:880,width:"100%",padding:n?"26px 18px 22px":"36px 32px 28px",position:"relative",boxShadow:"0 28px 70px rgba(0,0,0,.45)",animation:"yslideUp .35s cubic-bezier(.2,.8,.2,1)",maxHeight:"94vh",overflowY:"auto"},children:[r.jsx("button",{onClick:i,style:{position:"absolute",top:14,right:14,background:"var(--surface2, #f5f5f5)",border:"none",width:38,height:38,borderRadius:"50%",cursor:"pointer",fontSize:"1.05rem",color:"var(--ink, #111)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2,fontWeight:600},"aria-label":"Fermer",children:"✕"}),r.jsxs("div",{style:{textAlign:"center",marginBottom:n?18:22},children:[r.jsx("div",{style:{display:"inline-flex",alignItems:"center",gap:6,background:"var(--green-pale, #e8f5e9)",color:"var(--green, #1a6b3a)",padding:"5px 14px",borderRadius:50,fontSize:".7rem",fontWeight:700,marginBottom:12,letterSpacing:".02em"},children:"🇨🇲 Bienvenue sur Yorix CM"}),r.jsx("h1",{style:{fontFamily:"'Syne',sans-serif",fontSize:n?"1.45rem":"1.85rem",fontWeight:800,color:"var(--ink, #111)",marginBottom:8,letterSpacing:"-.5px",lineHeight:1.18},children:"Que voulez-vous faire aujourd'hui ?"}),r.jsx("p",{style:{color:"var(--gray, #666)",fontSize:n?".84rem":".92rem",maxWidth:520,margin:"0 auto",lineHeight:1.55},children:"Acheter, vendre, faire livrer ou trouver un pro — Yorix s'occupe du reste."})]}),r.jsx("div",{style:{display:"flex",gap:n?6:8,justifyContent:"center",flexWrap:n?"nowrap":"wrap",overflowX:n?"auto":"visible",marginBottom:n?18:24,paddingBottom:n?4:0,scrollbarWidth:"none",msOverflowStyle:"none"},className:"yorix-trust-badges",children:p.map((c,m)=>r.jsxs("div",{style:{background:"var(--surface2, #f8f8f8)",border:"1px solid var(--border, #e5e5e5)",color:"var(--ink, #111)",padding:n?"6px 11px":"7px 14px",borderRadius:50,fontSize:n?".68rem":".74rem",fontWeight:600,whiteSpace:"nowrap",display:"inline-flex",alignItems:"center",gap:5,fontFamily:"'DM Sans',sans-serif",animation:`yfadeIn .4s ease ${.1+m*.05}s both`,flexShrink:0},children:[r.jsx("span",{style:{fontSize:".95em"},children:c.icon}),r.jsx("span",{children:c.label})]},c.label))}),r.jsx("div",{style:{display:"grid",gridTemplateColumns:n?"1fr":"repeat(2, 1fr)",gap:n?12:16,marginBottom:18},children:a.map((c,m)=>r.jsxs("button",{onClick:()=>t(c.id),style:{background:"var(--surface, #fff)",border:"1.5px solid var(--border, #e5e5e5)",borderRadius:16,padding:n?"20px 18px":"24px 22px",cursor:"pointer",textAlign:"left",transition:"all .25s cubic-bezier(.2,.8,.2,1)",position:"relative",overflow:"hidden",fontFamily:"inherit",minHeight:n?0:220,display:"flex",flexDirection:"column",animation:`yslideUp .4s cubic-bezier(.2,.8,.2,1) ${.15+m*.08}s both`},onMouseOver:g=>{n||(g.currentTarget.style.transform="translateY(-4px)",g.currentTarget.style.boxShadow="0 14px 32px rgba(0,0,0,.12)",g.currentTarget.style.borderColor="transparent")},onMouseOut:g=>{n||(g.currentTarget.style.transform="none",g.currentTarget.style.boxShadow="none",g.currentTarget.style.borderColor="var(--border, #e5e5e5)")},onTouchStart:g=>{g.currentTarget.style.transform="scale(0.98)"},onTouchEnd:g=>{g.currentTarget.style.transform="none"},children:[r.jsx("div",{style:{position:"absolute",top:-14,right:-14,width:80,height:80,background:c.bgIcon,borderRadius:"50%",zIndex:0}}),c.badge&&r.jsx("div",{style:{position:"absolute",top:12,right:12,background:c.badgeColor,color:"#0d1f14",padding:"3px 9px",borderRadius:50,fontSize:".62rem",fontWeight:800,fontFamily:"'Syne',sans-serif",letterSpacing:".03em",zIndex:2,boxShadow:"0 2px 6px rgba(0,0,0,.15)"},children:c.badge}),r.jsxs("div",{style:{position:"relative",zIndex:1,flex:1,display:"flex",flexDirection:"column"},children:[r.jsx("div",{style:{width:n?48:54,height:n?48:54,borderRadius:13,background:c.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:n?"1.55rem":"1.75rem",marginBottom:12,boxShadow:"0 6px 16px rgba(0,0,0,.14), inset 0 -2px 0 rgba(0,0,0,.08)"},children:c.icon}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:n?"1.05rem":"1.15rem",color:"var(--ink, #111)",marginBottom:6,letterSpacing:"-.3px"},children:c.title}),r.jsx("div",{style:{fontSize:n?".8rem":".83rem",color:"var(--gray, #666)",lineHeight:1.55,marginBottom:10,flex:1},children:c.desc}),r.jsx("div",{style:{display:"inline-flex",alignItems:"center",background:"var(--surface2, #f5f5f5)",color:"var(--ink, #111)",padding:"3px 9px",borderRadius:50,fontSize:".66rem",fontWeight:600,marginBottom:12,alignSelf:"flex-start",fontFamily:"'DM Sans',sans-serif"},children:c.miniBadge}),r.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:5,fontSize:n?".78rem":".82rem",fontWeight:800,color:"var(--green, #1a6b3a)",fontFamily:"'Syne',sans-serif",letterSpacing:"-.1px"},children:[c.cta," ",r.jsx("span",{style:{fontSize:"1.05em"},children:"→"})]})]})]},c.id))}),r.jsxs("div",{style:{textAlign:"center",paddingTop:14,borderTop:"1px solid var(--border, #e5e5e5)",marginTop:4},children:[o?r.jsx("p",{style:{fontSize:n?".74rem":".78rem",color:"var(--green, #1a6b3a)",marginBottom:8,fontWeight:600},children:"✅ Connecté. Choisissez une action pour continuer."}):r.jsx("p",{style:{fontSize:n?".74rem":".78rem",color:"var(--gray, #666)",marginBottom:8},children:"💡 Pas encore inscrit ? Vous pourrez créer votre compte après avoir choisi."}),r.jsx("button",{onClick:i,style:{background:"transparent",border:"none",color:"var(--gray, #666)",fontSize:".78rem",cursor:"pointer",textDecoration:"underline",fontFamily:"inherit",padding:"4px 8px"},children:"Explorer librement le site"})]}),r.jsx("style",{children:`
          @keyframes yfadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes yslideUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .yorix-trust-badges::-webkit-scrollbar { display: none; }
        `})]})})}const fr="v1.0",yt={seller:{icon:"🏪",label:"Vendeur",color:"#f59e0b",engagement:"Je m'engage à fournir des produits conformes, authentiques et à respecter les transactions Yorix."},provider:{icon:"👷",label:"Prestataire",color:"#8b5cf6",engagement:"Je m'engage à fournir des services conformes, professionnels et à respecter mes clients."},delivery:{icon:"🚚",label:"Livreur",color:"#3b82f6",engagement:"Je m'engage à respecter les tarifs Yorix Ride, livrer les colis avec soin et dans les délais."}};function pa({open:e,onClose:i,onAccepted:t,user:o,userData:n,role:d="seller",authForm:a={}}){const[p,c]=l.useState(!1),[m,g]=l.useState(!1),[h,k]=l.useState(!1),[v,z]=l.useState(!1),[w,f]=l.useState(""),b=l.useRef(null);if(l.useEffect(()=>{e&&(c(!1),g(!1),k(!1),f(""))},[e]),!e)return null;const y=yt[d]||yt.seller,P=T=>{const I=T.target;I.scrollHeight-I.scrollTop-I.clientHeight<50&&!p&&c(!0)},E=()=>{if(!p){f("Veuillez d'abord lire l'intégralité du contrat (scrollez jusqu'en bas).");return}if(!m){f("Vous devez cocher la case d'acceptation pour continuer.");return}f(""),k(!0)},B=async()=>{z(!0),f("");try{let T="unknown";try{T=(await(await fetch("https://api.ipify.org?format=json")).json()).ip||"unknown"}catch(de){console.warn("Impossible de récupérer l'IP:",de)}const I=navigator.userAgent||"unknown",oe=(a==null?void 0:a.nom)||(n==null?void 0:n.nom)||"Inconnu",V=(a==null?void 0:a.tel)||(n==null?void 0:n.telephone)||"Inconnu",{error:U}=await R.from("user_contract_acceptance").insert({user_id:(o==null?void 0:o.id)||null,full_name:oe,phone:V,role:d,contract_version:fr,accepted_at:new Date().toISOString(),ip_address:T,user_agent:I,acceptance_checkbox:!0,otp_verified:!1,signature_type:"checkbox_v1"});U&&console.warn("Acceptance DB error:",U),z(!1),k(!1),t({version:fr,acceptedAt:new Date().toISOString(),ip:T,userAgent:I})}catch(T){console.error("Erreur acceptance:",T),f("Erreur : "+(T.message||"Impossible d'enregistrer l'acceptation.")),z(!1)}};return r.jsxs(r.Fragment,{children:[r.jsx("div",{onClick:T=>T.target===T.currentTarget&&!v&&i(),style:{position:"fixed",inset:0,background:"rgba(10, 20, 16, 0.88)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",zIndex:99998,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",animation:"yfadeIn .25s ease"},children:r.jsxs("div",{style:{background:"var(--surface, #fff)",borderRadius:18,maxWidth:720,width:"100%",maxHeight:"92vh",display:"flex",flexDirection:"column",boxShadow:"0 28px 70px rgba(0,0,0,.45)",animation:"yslideUp .3s cubic-bezier(.2,.8,.2,1)",overflow:"hidden"},children:[r.jsxs("div",{style:{background:"linear-gradient(135deg, #0a1410 0%, #1a3a24 100%)",padding:"20px 24px",color:"#fff",position:"relative"},children:[r.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:6,background:y.color,color:"#fff",padding:"4px 12px",borderRadius:50,fontSize:".7rem",fontWeight:700,marginBottom:8},children:[y.icon," Inscription ",y.label]}),r.jsx("h2",{style:{fontFamily:"'Syne',sans-serif",fontSize:"1.3rem",fontWeight:800,marginBottom:4,letterSpacing:"-.4px",lineHeight:1.2},children:"Contrat d'utilisation et d'engagement Yorix"}),r.jsx("p",{style:{color:"rgba(255,255,255,.7)",fontSize:".82rem",lineHeight:1.5,marginBottom:0},children:"Veuillez lire attentivement ces conditions. L'inscription implique votre engagement contractuel."}),r.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,height:3,background:"rgba(255,255,255,.15)"},children:r.jsx("div",{style:{height:"100%",background:"linear-gradient(90deg, var(--yellow, #fcd116), #4fd17d)",width:p?"100%":"20%",transition:"width .4s"}})})]}),r.jsxs("div",{ref:b,onScroll:P,style:{padding:"20px 24px",overflowY:"auto",flex:1,fontSize:".84rem",lineHeight:1.65,color:"var(--ink, #111)",fontFamily:"'DM Sans',sans-serif"},children:[r.jsx(fa,{role:d,roleInfo:y}),!p&&r.jsx("div",{style:{position:"sticky",bottom:0,textAlign:"center",padding:"10px",background:"linear-gradient(to top, var(--surface, #fff) 60%, rgba(255,255,255,0))",pointerEvents:"none",fontSize:".74rem",color:"var(--gray, #666)",fontWeight:600},children:"⬇ Continuez à scroller pour activer l'acceptation"}),p&&r.jsx("div",{style:{textAlign:"center",padding:"12px",marginTop:16,background:"var(--green-pale, #e8f5e9)",border:"1px solid var(--green-light, #86efac)",borderRadius:9,fontSize:".78rem",color:"var(--green, #1a6b3a)",fontWeight:700},children:"✓ Vous avez lu l'intégralité du contrat"})]}),r.jsxs("div",{style:{borderTop:"1px solid var(--border, #e5e5e5)",padding:"16px 24px",background:"var(--surface2, #f8f8f8)"},children:[r.jsxs("div",{style:{background:`${y.color}15`,border:`1.5px solid ${y.color}40`,borderRadius:9,padding:"10px 12px",marginBottom:12,fontSize:".78rem",color:"var(--ink, #111)",fontWeight:600,display:"flex",alignItems:"flex-start",gap:8},children:[r.jsx("span",{style:{fontSize:"1.1rem",flexShrink:0},children:y.icon}),r.jsx("span",{children:y.engagement})]}),r.jsxs("label",{style:{display:"flex",alignItems:"flex-start",gap:10,cursor:p?"pointer":"not-allowed",opacity:p?1:.5,marginBottom:12,userSelect:"none"},children:[r.jsx("input",{type:"checkbox",checked:m,onChange:T=>{p&&g(T.target.checked)},disabled:!p,style:{marginTop:2,width:18,height:18,cursor:p?"pointer":"not-allowed",accentColor:"var(--green, #1a6b3a)",flexShrink:0}}),r.jsx("span",{style:{fontSize:".82rem",lineHeight:1.5,color:"var(--ink, #111)",fontWeight:600},children:"J'ai lu, compris et j'accepte les conditions d'utilisation, commissions, règles et engagements de Yorix."})]}),r.jsx("p",{style:{fontSize:".7rem",color:"var(--gray, #666)",marginBottom:12,lineHeight:1.5},children:"🛡️ Cette étape protège Yorix, vos clients et votre activité. Yorix protège ses utilisateurs grâce à des engagements de transparence, qualité et sécurité."}),w&&r.jsxs("div",{style:{background:"#fff0f0",border:"1px solid #fecaca",color:"#ce1126",padding:"8px 12px",borderRadius:7,fontSize:".78rem",marginBottom:10},children:["⚠️ ",w]}),r.jsxs("div",{style:{display:"flex",gap:8},children:[r.jsx("button",{onClick:i,disabled:v,style:{flex:1,background:"var(--surface, #fff)",color:"var(--ink, #111)",border:"1.5px solid var(--border, #e5e5e5)",padding:"12px 16px",borderRadius:9,fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".85rem",cursor:v?"not-allowed":"pointer"},children:"Annuler"}),r.jsx("button",{onClick:E,disabled:!p||!m||v,style:{flex:2,background:p&&m?"linear-gradient(135deg, var(--green, #1a6b3a), #0d4d28)":"var(--border, #e5e5e5)",color:p&&m?"#fff":"var(--gray, #666)",border:"none",padding:"12px 16px",borderRadius:9,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".88rem",cursor:p&&m&&!v?"pointer":"not-allowed",transition:"all .2s"},children:"✓ Accepter et continuer"})]})]})]})}),h&&r.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",backdropFilter:"blur(4px)",zIndex:99999,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",animation:"yfadeIn .2s ease"},children:r.jsxs("div",{style:{background:"var(--surface, #fff)",borderRadius:14,maxWidth:440,width:"100%",padding:"24px 22px",boxShadow:"0 20px 50px rgba(0,0,0,.4)",animation:"yslideUp .3s cubic-bezier(.2,.8,.2,1)"},children:[r.jsxs("div",{style:{textAlign:"center",marginBottom:16},children:[r.jsx("div",{style:{fontSize:"2.5rem",marginBottom:8},children:"📜"}),r.jsx("h3",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.15rem",color:"var(--ink, #111)",marginBottom:6,letterSpacing:"-.3px"},children:"Confirmer votre engagement"}),r.jsxs("p",{style:{fontSize:".84rem",color:"var(--gray, #666)",lineHeight:1.6},children:["En acceptant, vous reconnaissez être ",r.jsx("strong",{style:{color:"var(--ink, #111)"},children:"légalement engagé"})," envers les conditions Yorix. Cette acceptation sera tracée et conservée comme preuve."]})]}),r.jsxs("div",{style:{background:"var(--surface2, #f5f5f5)",border:"1px solid var(--border, #e5e5e5)",borderRadius:9,padding:"12px 14px",marginBottom:14,fontSize:".74rem"},children:[r.jsx("div",{style:{fontWeight:700,marginBottom:6,color:"var(--gray, #666)"},children:"📋 Informations enregistrées :"}),r.jsxs("div",{style:{color:"var(--ink, #111)",lineHeight:1.7},children:[r.jsxs("div",{children:["👤 ",r.jsx("strong",{children:(a==null?void 0:a.nom)||(n==null?void 0:n.nom)||"—"})]}),r.jsxs("div",{children:["📞 ",(a==null?void 0:a.tel)||(n==null?void 0:n.telephone)||"—"]}),r.jsxs("div",{children:[y.icon," Rôle : ",y.label]}),r.jsxs("div",{children:["📅 ",new Date().toLocaleString("fr-FR")]}),r.jsxs("div",{children:["📝 Contrat version ",fr]})]})]}),w&&r.jsxs("div",{style:{background:"#fff0f0",border:"1px solid #fecaca",color:"#ce1126",padding:"8px 12px",borderRadius:7,fontSize:".78rem",marginBottom:10},children:["⚠️ ",w]}),r.jsxs("div",{style:{display:"flex",gap:8},children:[r.jsx("button",{onClick:()=>k(!1),disabled:v,style:{flex:1,background:"var(--surface, #fff)",color:"var(--ink, #111)",border:"1.5px solid var(--border, #e5e5e5)",padding:"11px 16px",borderRadius:9,fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".82rem",cursor:v?"not-allowed":"pointer"},children:"← Annuler"}),r.jsx("button",{onClick:B,disabled:v,style:{flex:1.5,background:"linear-gradient(135deg, var(--green, #1a6b3a), #0d4d28)",color:"#fff",border:"none",padding:"11px 16px",borderRadius:9,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".82rem",cursor:v?"wait":"pointer",opacity:v?.7:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6},children:v?r.jsxs(r.Fragment,{children:[r.jsx("span",{style:{width:14,height:14,border:"2px solid #fff",borderTopColor:"transparent",borderRadius:"50%",animation:"spin .7s linear infinite"}}),"Enregistrement..."]}):"✓ Accepter et continuer"})]})]})}),r.jsx("style",{children:`
        @keyframes yfadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes yslideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `})]})}function fa({role:e,roleInfo:i}){const t=({children:n})=>r.jsx("h3",{style:{fontFamily:"'Syne',sans-serif",fontSize:".95rem",fontWeight:800,color:"var(--ink, #111)",marginTop:18,marginBottom:8,letterSpacing:"-.2px"},children:n}),o=({children:n})=>r.jsx("h4",{style:{fontFamily:"'Syne',sans-serif",fontSize:".84rem",fontWeight:700,color:"var(--ink, #111)",marginTop:12,marginBottom:6},children:n});return r.jsxs("div",{children:[r.jsxs("div",{style:{background:"var(--green-pale, #e8f5e9)",border:"1px solid var(--green-light, #86efac)",borderRadius:9,padding:"10px 12px",marginBottom:14,fontSize:".78rem"},children:[r.jsxs("div",{style:{fontWeight:700,color:"var(--green, #1a6b3a)",marginBottom:4},children:["📜 Contrat Yorix CM — Version v1.0 — ",new Date().toLocaleDateString("fr-FR")]}),r.jsx("div",{style:{color:"var(--ink, #111)"},children:"Marketplace camerounaise • Vendeurs • Prestataires • Livreurs"})]}),r.jsx(t,{children:"PRÉAMBULE"}),r.jsxs("p",{children:["Le présent contrat régit les relations entre ",r.jsx("strong",{children:"YORIX CAMEROUN"})," (« Yorix »), exploitant www.yorix.cm, et toute personne physique ou morale (« l'Utilisateur Professionnel ») souhaitant proposer des produits, services ou livraisons via la Plateforme."]}),r.jsx("p",{children:"En cochant la case d'acceptation, vous reconnaissez avoir lu, compris et accepté l'intégralité des présentes conditions, et vous engagez juridiquement à les respecter."}),r.jsx(t,{children:"ARTICLE 1 — OBJET"}),r.jsxs("p",{children:["Le présent Contrat définit les conditions d'utilisation de Yorix pour vendre des produits, proposer des services ou effectuer des livraisons. L'inscription est ",r.jsx("strong",{children:"gratuite"}),". Yorix se rémunère via une commission de 5% sur chaque transaction."]}),r.jsx(t,{children:"ARTICLE 2 — INSCRIPTION ET VÉRIFICATION"}),r.jsxs("p",{children:["Pour vous inscrire, vous devez : être âgé d'",r.jsx("strong",{children:"au moins 18 ans"}),", disposer d'une ",r.jsx("strong",{children:"pièce d'identité valide"}),", fournir un ",r.jsx("strong",{children:"numéro camerounais"})," actif (MTN ou Orange) et fournir des informations exactes."]}),r.jsx("p",{children:"Yorix se réserve le droit de demander des justificatifs (CNI, attestation, photo) à tout moment. Les comptes non vérifiés peuvent être suspendus."}),r.jsx(t,{children:"ARTICLE 3 — ENGAGEMENTS COMMUNS"}),r.jsx("p",{children:"En vous inscrivant, vous vous engagez à :"}),r.jsxs("ul",{style:{paddingLeft:20,marginTop:6},children:[r.jsx("li",{children:"Respecter les Acheteurs : courtoisie, professionnalisme, honnêteté"}),r.jsx("li",{children:"Fournir des informations exactes"}),r.jsx("li",{children:"Respecter les engagements (délai, qualité, prix)"}),r.jsxs("li",{children:[r.jsx("strong",{children:"Ne jamais contourner Yorix"})," en proposant un paiement direct hors plateforme"]}),r.jsx("li",{children:"Ne pas frauder (faux avis, faux profils, doubles comptes)"}),r.jsx("li",{children:"Respecter les lois camerounaises en vigueur"}),r.jsx("li",{children:"Maintenir un comportement professionnel"}),r.jsx("li",{children:"Coopérer avec Yorix en cas de litige"})]}),r.jsx(t,{children:"ARTICLE 4 — ENGAGEMENT SPÉCIFIQUE À VOTRE RÔLE"}),r.jsxs("div",{style:{background:`${i.color}15`,border:`1.5px solid ${i.color}50`,borderRadius:9,padding:"12px 14px",marginTop:8},children:[r.jsxs("div",{style:{fontWeight:800,marginBottom:6,color:"var(--ink, #111)"},children:[i.icon," En tant que ",i.label]}),e==="seller"&&r.jsxs("ul",{style:{paddingLeft:20,marginTop:4},children:[r.jsxs("li",{children:["Je m'engage à fournir des ",r.jsx("strong",{children:"produits conformes"})," à leur description"]}),r.jsxs("li",{children:["Je garantis que mes produits sont ",r.jsx("strong",{children:"authentiques et légaux"})]}),r.jsxs("li",{children:["Je m'engage à ",r.jsx("strong",{children:"expédier dans les délais"})," annoncés"]}),r.jsxs("li",{children:["J'accepte la ",r.jsx("strong",{children:"commission Yorix de 5%"})," sur chaque vente"]}),r.jsxs("li",{children:["J'accepte le système ",r.jsx("strong",{children:"Escrow"})," (libération des fonds après livraison validée)"]}),r.jsxs("li",{children:["Je m'engage à ",r.jsx("strong",{children:"rembourser"})," en cas de produit non conforme"]}),r.jsxs("li",{children:["Je ne vendrai ",r.jsx("strong",{children:"jamais de produits contrefaits, illégaux ou dangereux"})]})]}),e==="provider"&&r.jsxs("ul",{style:{paddingLeft:20,marginTop:4},children:[r.jsxs("li",{children:["Je m'engage à fournir des ",r.jsx("strong",{children:"services conformes et professionnels"})]}),r.jsxs("li",{children:["Je garantis avoir les ",r.jsx("strong",{children:"qualifications nécessaires"})]}),r.jsxs("li",{children:["Je m'engage à ",r.jsx("strong",{children:"respecter les rendez-vous"})," et délais"]}),r.jsxs("li",{children:["Je facture des ",r.jsx("strong",{children:"tarifs justes et transparents"})]}),r.jsxs("li",{children:["Tarifs Yorix recommandés : ",r.jsx("strong",{children:"10 000 FCFA / projet"})," ou ",r.jsx("strong",{children:"5 000 FCFA / heure"})]}),r.jsxs("li",{children:["J'accepte la ",r.jsx("strong",{children:"commission Yorix de 5%"})]}),r.jsxs("li",{children:["Je ne solliciterai ",r.jsx("strong",{children:"jamais de paiement hors Yorix"})," pour contourner la commission"]})]}),e==="delivery"&&r.jsxs("ul",{style:{paddingLeft:20,marginTop:4},children:[r.jsxs("li",{children:["Je m'engage à ",r.jsx("strong",{children:"respecter les tarifs Yorix Ride"})," affichés au client"]}),r.jsxs("li",{children:["Je m'engage à ",r.jsx("strong",{children:"livrer les colis confiés"})," dans les délais"]}),r.jsxs("li",{children:["J'accepte la ",r.jsx("strong",{children:"commission Yorix"})," sur chaque livraison"]}),r.jsxs("li",{children:["Je dispose d'un ",r.jsx("strong",{children:"véhicule en bon état"})," et des ",r.jsx("strong",{children:"documents légaux"})]}),r.jsxs("li",{children:["Je traiterai les colis avec ",r.jsx("strong",{children:"soin et confidentialité"})]}),r.jsxs("li",{children:["En cas de ",r.jsx("strong",{children:"perte ou détérioration"}),", j'accepte d'être tenu responsable"]}),r.jsxs("li",{children:["Je n'effectuerai ",r.jsx("strong",{children:"aucune livraison illégale"})," (drogues, armes, contrefaçons)"]})]})]}),r.jsx(t,{children:"ARTICLE 5 — COMMISSIONS ET PAIEMENTS"}),r.jsx(o,{children:"5.1 Commission Yorix"}),r.jsxs("p",{children:["Yorix prélève une ",r.jsx("strong",{children:"commission de 5%"})," sur chaque transaction. Exemple : pour 10 000 FCFA, vous recevez 9 500 FCFA."]}),r.jsx(o,{children:"5.2 Paiement"}),r.jsxs("p",{children:["Versement via ",r.jsx("strong",{children:"MTN MoMo"})," ou ",r.jsx("strong",{children:"Orange Money"}),", au plus tard ",r.jsx("strong",{children:"48 heures"})," après validation de la livraison/prestation."]}),r.jsx(o,{children:"5.3 Modification des commissions"}),r.jsxs("p",{children:["Yorix peut modifier les commissions avec un ",r.jsx("strong",{children:"préavis de 30 jours"}),"."]}),r.jsx(t,{children:"ARTICLE 6 — SYSTÈME ESCROW"}),r.jsxs("p",{children:["Les fonds versés par l'Acheteur sont ",r.jsx("strong",{children:"bloqués chez Yorix"})," jusqu'à validation de la livraison. En cas de litige, Yorix arbitre sous ",r.jsx("strong",{children:"48h maximum"}),"."]}),r.jsx(t,{children:"ARTICLE 7 — NOTATION ET RÉPUTATION"}),r.jsxs("p",{children:["Les Acheteurs notent de ",r.jsx("strong",{children:"1 à 5 étoiles"}),". Une note moyenne sous ",r.jsx("strong",{children:"3,0/5"})," sur plus de 10 avis peut entraîner suspension. Tout faux avis entraîne l'",r.jsx("strong",{children:"exclusion immédiate"}),"."]}),r.jsx(t,{children:"ARTICLE 8 — INTERDICTIONS ET SANCTIONS"}),r.jsx("p",{children:r.jsx("strong",{children:"Strictement interdit :"})}),r.jsxs("ul",{style:{paddingLeft:20},children:[r.jsx("li",{children:"Contournement de la plateforme (paiement direct)"}),r.jsx("li",{children:"Faux avis, faux profils, fausses livraisons"}),r.jsx("li",{children:"Vente de produits illégaux, contrefaits, dangereux"}),r.jsx("li",{children:"Discrimination, harcèlement, propos haineux"}),r.jsx("li",{children:"Usurpation d'identité"}),r.jsx("li",{children:"Tentative de piratage"})]}),r.jsxs("p",{children:[r.jsx("strong",{children:"Sanctions :"})," avertissement, suspension (24h-30j), exclusion définitive, retenue des paiements, poursuites judiciaires."]}),r.jsx(t,{children:"ARTICLE 9 — RESPONSABILITÉ"}),r.jsxs("p",{children:["Vous êtes ",r.jsx("strong",{children:"seul responsable"})," de vos produits/services/livraisons. Yorix agit comme ",r.jsx("strong",{children:"intermédiaire technique"}),"."]}),r.jsx(t,{children:"ARTICLE 10 — DONNÉES PERSONNELLES"}),r.jsxs("p",{children:["Vos données sont stockées de manière sécurisée et jamais revendues. Droit d'accès, rectification, suppression : ",r.jsx("strong",{children:"support@yorix.cm"}),"."]}),r.jsx(t,{children:"ARTICLE 11 — TRAÇABILITÉ DE L'ACCEPTATION"}),r.jsxs("p",{children:["En cochant la case, sont enregistrés : votre nom, téléphone, rôle, date/heure, IP, navigateur, version du contrat. Ces informations constituent une ",r.jsx("strong",{children:"preuve juridique"}),"."]}),r.jsx(t,{children:"ARTICLE 12 — MODIFICATION DU CONTRAT"}),r.jsx("p",{children:"Yorix peut modifier ce contrat. Vous serez notifié par email et devrez réaccepter la nouvelle version lors de votre prochaine connexion."}),r.jsx(t,{children:"ARTICLE 13 — RÉSILIATION"}),r.jsxs("p",{children:["Vous pouvez résilier à tout moment via ",r.jsx("strong",{children:"support@yorix.cm"}),". Yorix peut résilier sans préavis en cas de manquement grave, fraude."]}),r.jsx(t,{children:"ARTICLE 14 — DROIT APPLICABLE"}),r.jsxs("p",{children:["Contrat régi par le ",r.jsx("strong",{children:"droit camerounais"}),". En cas de litige : tribunaux compétents de ",r.jsx("strong",{children:"Douala"}),"."]}),r.jsx(t,{children:"ARTICLE 15 — CONTACT"}),r.jsxs("p",{children:["📧 support@yorix.cm",r.jsx("br",{}),"📱 +237 696 56 56 54",r.jsx("br",{}),"📍 Douala / Yaoundé, Cameroun"]}),r.jsxs("div",{style:{marginTop:24,padding:"14px 16px",background:"linear-gradient(135deg, #1a3a24, #0d3320)",borderRadius:11,color:"#fff"},children:[r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".95rem",marginBottom:6},children:"🤝 Engagement final"}),r.jsx("p",{style:{color:"rgba(255,255,255,.85)",fontSize:".82rem",lineHeight:1.6,marginBottom:0},children:"En acceptant, je reconnais que je ne crée pas simplement un compte. Je m'engage à respecter un système, des engagements professionnels et des obligations légales. Yorix protège ses utilisateurs grâce à des engagements de transparence, qualité et sécurité."})]}),r.jsx("p",{style:{textAlign:"center",marginTop:16,fontSize:".7rem",color:"var(--gray, #666)"},children:"🇨🇲 Yorix CM — La marketplace de confiance du Cameroun"})]})}function ua({value:e="",onChange:i,placeholder:t="Entrez votre mot de passe",showStrength:o=!1,showRules:n=!1,confirmValue:d=null,autoComplete:a="current-password",autoMask:p=10,id:c,ariaLabel:m="Mot de passe"}){const[g,h]=l.useState(!1),[k,v]=l.useState(!1),z=l.useRef(null),w=l.useRef(null);l.useEffect(()=>(g&&p>0&&(w.current=setTimeout(()=>{h(!1)},p*1e3)),()=>{w.current&&clearTimeout(w.current)}),[g,p]);const f=T=>{T.preventDefault(),T.stopPropagation(),h(I=>!I),setTimeout(()=>{var I;return(I=z.current)==null?void 0:I.focus()},0)},b=l.useMemo(()=>{if(!e)return{score:0,label:"",color:""};let T=0;return e.length>=6&&T++,e.length>=10&&T++,/[A-Z]/.test(e)&&T++,/[0-9]/.test(e)&&T++,/[^A-Za-z0-9]/.test(e)&&T++,T<=1?{score:1,label:"Faible",color:"#dc2626"}:T<=2?{score:2,label:"Moyen",color:"#f59e0b"}:T<=3?{score:3,label:"Bon",color:"#3b82f6"}:T<=4?{score:4,label:"Fort",color:"#16a34a"}:{score:5,label:"Très fort",color:"#15803d"}},[e]),y=l.useMemo(()=>({length:e.length>=6,uppercase:/[A-Z]/.test(e),digit:/[0-9]/.test(e)}),[e]),P=d!==null?e&&d&&e===d:null,E=d!==null?d.length>0&&e!==d:!1,B=()=>E?"var(--red, #dc2626)":P||k?"var(--green, #1a6b3a)":"var(--border, #e5e5e5)";return r.jsxs("div",{style:{width:"100%"},children:[r.jsxs("div",{style:{position:"relative",width:"100%"},children:[r.jsx("input",{ref:z,id:c,type:g?"text":"password",value:e,onChange:T=>i(T.target.value),onFocus:()=>v(!0),onBlur:()=>v(!1),placeholder:t,autoComplete:a,"aria-label":m,style:{width:"100%",padding:"12px 48px 12px 14px",borderRadius:9,border:`1.5px solid ${B()}`,background:"var(--surface, #fff)",color:"var(--ink, #111)",fontSize:".88rem",fontFamily:"'DM Sans',sans-serif",outline:"none",transition:"border-color .15s",boxSizing:"border-box",letterSpacing:g?"0.02em":"0.1em"}}),r.jsx("button",{type:"button",onClick:f,"aria-label":g?"Masquer le mot de passe":"Afficher le mot de passe",title:g?"Masquer le mot de passe":"Afficher le mot de passe",tabIndex:0,style:{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",background:"transparent",border:"none",cursor:"pointer",padding:8,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--gray, #666)",transition:"background .15s, color .15s"},onMouseOver:T=>{T.currentTarget.style.background="var(--surface2, #f5f5f5)",T.currentTarget.style.color="var(--green, #1a6b3a)"},onMouseOut:T=>{T.currentTarget.style.background="transparent",T.currentTarget.style.color="var(--gray, #666)"},children:g?r.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[r.jsx("path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"}),r.jsx("circle",{cx:"12",cy:"12",r:"3"})]}):r.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[r.jsx("path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24"}),r.jsx("path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"}),r.jsx("path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"}),r.jsx("line",{x1:"2",y1:"2",x2:"22",y2:"22"})]})})]}),o&&e&&r.jsxs("div",{style:{marginTop:6},children:[r.jsx("div",{style:{display:"flex",gap:3,marginBottom:4},children:[1,2,3,4,5].map(T=>r.jsx("div",{style:{flex:1,height:4,borderRadius:2,background:T<=b.score?b.color:"var(--border, #e5e5e5)",transition:"background .25s"}},T))}),r.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:".68rem",fontFamily:"'DM Sans',sans-serif"},children:[r.jsx("span",{style:{color:"var(--gray, #666)"},children:"💪 Force du mot de passe"}),r.jsx("span",{style:{color:b.color,fontWeight:700},children:b.label})]})]}),n&&e&&r.jsxs("div",{style:{marginTop:8,padding:"8px 10px",background:"var(--surface2, #f5f5f5)",border:"1px solid var(--border, #e5e5e5)",borderRadius:7,display:"flex",flexDirection:"column",gap:3},children:[r.jsx(ur,{ok:y.length,text:"Au moins 6 caractères"}),r.jsx(ur,{ok:y.uppercase,text:"Une majuscule (recommandé)",optional:!0}),r.jsx(ur,{ok:y.digit,text:"Un chiffre (recommandé)",optional:!0})]}),d!==null&&d.length>0&&r.jsx("div",{style:{marginTop:6,fontSize:".74rem",fontFamily:"'DM Sans',sans-serif",fontWeight:600,color:P?"var(--green, #16a34a)":"var(--red, #dc2626)",display:"flex",alignItems:"center",gap:5},children:P?r.jsx(r.Fragment,{children:"✓ Les mots de passe correspondent"}):r.jsx(r.Fragment,{children:"✗ Les mots de passe ne correspondent pas"})})]})}function ur({ok:e,text:i,optional:t}){return r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:".72rem",color:e?"var(--green, #16a34a)":"var(--gray, #666)",fontFamily:"'DM Sans',sans-serif"},children:[r.jsx("span",{style:{width:14,height:14,borderRadius:"50%",background:e?"var(--green, #16a34a)":"var(--border, #e5e5e5)",color:"#fff",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:".55rem",fontWeight:800,flexShrink:0},children:e?"✓":"·"}),r.jsxs("span",{children:[i,t&&!e&&r.jsx("span",{style:{opacity:.6,fontSize:".66rem"},children:" (optionnel)"})]})]})}function ma(){var Kr,Qr,Zr;const e=so(),i=zt(),t=l.useMemo(()=>ko(i.pathname),[i.pathname]),o=t.page,[n,d]=l.useState(!1),[a,p]=l.useState(null),[c,m]=l.useState(null),[g,h]=l.useState(null),[k,v]=l.useState(!0),[z,w]=l.useState(!1),[f,b]=l.useState("login"),[y,P]=l.useState("buyer"),[E,B]=l.useState({nom:"",email:"",tel:"",password:""}),[T,I]=l.useState(""),[oe,V]=l.useState(!1),[U,de]=l.useState([]),[S,M]=l.useState(!0),[Y,G]=l.useState([]);l.useEffect(()=>{(async()=>{const{data:u,error:x}=await R.from("services").select("*").eq("actif",!0).eq("disponible",!0).order("created_at",{ascending:!1});x||G(u||[])})()},[]);const[L,pe]=l.useState(""),[re,te]=l.useState(""),[fe,ye]=l.useState(()=>Wn());l.useEffect(()=>{Vn(fe)},[fe]);const[Ht,we]=l.useState(!1),[ke,ue]=l.useState([]),[Ar,Re]=l.useState(()=>X()),Nr=l.useRef(Ar);Nr.current=Ar;const[je,Xt]=l.useState(()=>Tr());l.useEffect(()=>{let s=!1;return(async()=>{try{const{data:u,error:x}=await R.from("commerce_settings").select("free_shipping_threshold_xaf, standard_delivery_fee_xaf").eq("id",1).maybeSingle();if(s||x||!u)return;Xt(qt({freeShippingThresholdXaf:Number(u.free_shipping_threshold_xaf),standardDeliveryFeeXaf:Number(u.standard_delivery_fee_xaf)}))}catch{}})(),()=>{s=!0}},[]);const Rr=l.useCallback(async(s,u=40)=>{if(!s)return;const{data:x,error:j}=await R.from("notifications").select("*").eq("user_id",s).order("created_at",{ascending:!1}).limit(u);j?console.warn("Notifications:",j.message):ue(x||[])},[]);l.useEffect(()=>{if(!(a!=null&&a.id)){Re(X());return}let s=!1;return Vt(R,a.id).then(u=>{s||Re(u)}),()=>{s=!0}},[a==null?void 0:a.id]);const[H,ne]=l.useState("overview"),[Pr,Jt]=l.useState(!1),[Se,Ge]=l.useState(""),[Ke,Qe]=l.useState(!1),[Pe,Gt]=l.useState(new Set),[Kt,Qt]=l.useState(320),[Zt,ei]=l.useState("TOUT"),[ri,me]=l.useState(null),[ti,Ze]=l.useState(!1),[ii,er]=l.useState(!1),[oi,Mr]=l.useState(!1),[ga,Ir]=l.useState(null),[ni,Ce]=l.useState(!1),[ge,Lr]=l.useState(null),[Me,ai]=l.useState([]),[si,Or]=l.useState(!0),[Dr,rr]=l.useState(null),[ze,Ie]=l.useState(null),[li,_e]=l.useState(!1);l.useEffect(()=>{(async()=>{Or(!0);const{data:u,error:x}=await R.from("academy_courses").select("*").eq("actif",!0).order("prix",{ascending:!0});x||ai(u||[]),Or(!1)})()},[]);const ci=l.useCallback(s=>{s!=null&&s.id&&(rr(s),e(lr("academyDetail",{courseId:s.id})))},[e]),di=l.useCallback(s=>{s!=null&&s.id&&(rr(s),e(lr("academyContact",{courseId:s.id})))},[e]),[pi,Br]=l.useState(!1),[fi,Fr]=l.useState(!1),[ui,xe]=l.useState(""),[_,mi]=l.useState({nom:"",prenom:"",tel:"",email:"",metier:"",ville:"",experience:"",tarif:"",bio:""}),gi=async()=>{if(xe(""),!_.nom.trim()){xe("Le nom est obligatoire");return}if(!_.tel.trim()){xe("Le téléphone est obligatoire");return}if(!_.metier){xe("Veuillez choisir un métier");return}if(_.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(_.email)){xe("Email invalide");return}Fr(!0);try{const{data:s,error:u}=await R.from("prestataires").insert({nom:_.nom,prenom:_.prenom||null,telephone:_.tel,email:_.email||null,metier:_.metier,ville:_.ville||null,experience:_.experience||null,tarif:_.tarif||null,bio:_.bio||null,status:"pending",user_id:(a==null?void 0:a.id)||null}).select().single();u&&console.warn("Table prestataires Supabase:",u.message);const x=["👷 *NOUVELLE CANDIDATURE PRESTATAIRE YORIX*","","👤 *Informations*",`Nom : ${_.nom}${_.prenom?" "+_.prenom:""}`,`Téléphone : ${_.tel}`,_.email?`Email : ${_.email}`:"","","💼 *Profil professionnel*",`Métier : ${_.metier}`,_.ville?`Ville : ${_.ville}`:"",_.experience?`Expérience : ${_.experience}`:"",_.tarif?`Tarif : ${_.tarif}`:"","",_.bio?`📝 *Présentation*
${_.bio}`:"","","✅ *Actions à faire*","1. Contacter le candidat sous 24h","2. Vérifier les qualifications","3. Valider ou refuser le profil","","Yorix CM 🇨🇲"].filter(Boolean).join(`
`),j=`https://wa.me/${Ue}?text=${encodeURIComponent(x)}`;window.open(j,"_blank");const O=`Nouvelle candidature prestataire — ${_.nom} (${_.metier})`,N=["Bonjour,","","Nouvelle candidature prestataire sur Yorix CM :","",`👤 Nom : ${_.nom}${_.prenom?" "+_.prenom:""}`,`📞 Téléphone : ${_.tel}`,_.email?`📧 Email : ${_.email}`:"",`💼 Métier : ${_.metier}`,_.ville?`📍 Ville : ${_.ville}`:"",_.experience?`⏱ Expérience : ${_.experience}`:"",_.tarif?`💰 Tarif : ${_.tarif}`:"","",_.bio?`📝 Présentation :
${_.bio}`:"","","---","Envoyé depuis yorix.cm"].filter(Boolean).join(`
`),$=`mailto:raisaodin1@gmail.com?subject=${encodeURIComponent(O)}&body=${encodeURIComponent(N)}`;setTimeout(()=>window.open($,"_blank"),500),Br(!0)}catch(s){console.error("soumettreCandidaturePrestataire:",s),xe("Erreur : "+(s.message||"Impossible d'envoyer la candidature. Réessayez."))}Fr(!1)},[xi,xa]=l.useState([{text:"Bonjour ! Comment puis-je vous aider ?",me:!1,time:"10:02"}]),[ha,ba]=l.useState(""),[va,ya]=l.useState(!1),hi=l.useRef(null);l.useEffect(()=>{if(!localStorage.getItem("yorix_onboarding_seen")){const u=setTimeout(()=>Ce(!0),800);return()=>clearTimeout(u)}},[]);const bi=l.useCallback(s=>{localStorage.setItem("yorix_onboarding_seen","1"),Ce(!1);const x={buy:{needAuth:!1,page:"produits"},sell:{needAuth:!0,role:"seller",page:"dashboard"},service:{needAuth:!1,page:"prestataires"},delivery:{needAuth:!0,role:"buyer",action:"openDelivery"}}[s];if(x){if(x.needAuth&&!a){Lr(s),P(x.role||"buyer"),b("register"),w(!0);return}tr(s)}},[a]),tr=l.useCallback(s=>{const u=s||ge;u&&(u==="buy"?C("produits"):u==="sell"?C("dashboard"):u==="service"?C("prestataires"):u==="delivery"&&(C("livraison"),setTimeout(()=>Ze(!0),300)),Lr(null))},[ge]),vi=l.useCallback(()=>{localStorage.setItem("yorix_onboarding_seen","1"),Ce(!1)},[]),C=l.useCallback((s,u={})=>{e(lr(s,u)),window.scrollTo(0,0),we(!1)},[e]);l.useEffect(()=>{let s=!1;R.auth.getSession().then(({data:{session:x},error:j})=>{s||(j&&console.warn("Auth getSession:",j.message),x!=null&&x.user&&(p(x.user),Le(x.user.id)),v(!1))}).catch(x=>{console.warn("Auth getSession:",(x==null?void 0:x.message)||x),s||v(!1)});const{data:{subscription:u}}=R.auth.onAuthStateChange((x,j)=>{j!=null&&j.user?(p(j.user),Le(j.user.id)):(p(null),m(null),h(null),ue([]))});return()=>{s=!0,u.unsubscribe()}},[]);const Le=async s=>{const u=await fn(s),x=un(u);m(u),h(x),await Rr(s,40)};l.useEffect(()=>{if(!(a!=null&&a.id))return;const s=R.channel(`notifications_rt_${a.id}`).on("postgres_changes",{event:"INSERT",schema:"public",table:"notifications",filter:`user_id=eq.${a.id}`},u=>{const x=u.new;ue(j=>j.some(O=>O.id===x.id)?j:[x,...j].slice(0,120));try{ia(Er(x),Nr.current)}catch{}}).subscribe();return()=>{R.removeChannel(s)}},[a==null?void 0:a.id]),l.useEffect(()=>{if(!("serviceWorker"in navigator))return;const s=u=>{var j;if(((j=u.data)==null?void 0:j.type)!=="NOTIF_NAV")return;const x=typeof u.data.url=="string"?u.data.url:"/";e(x.startsWith("/")?x:`/${x}`)};return navigator.serviceWorker.addEventListener("message",s),()=>navigator.serviceWorker.removeEventListener("message",s)},[e]),l.useEffect(()=>{M(!0);const s=async()=>{let x=R.from("products").select("*").or("actif.eq.true,actif.is.null").order("sponsorise",{ascending:!1}).order("created_at",{ascending:!1}).limit(60);re&&(x=x.eq("categorie",re));const{data:j,error:O}=await x;O&&console.warn("Produits:",O.message),de(j||[]),M(!1)};s();const u=R.channel("prod_rt").on("postgres_changes",{event:"*",schema:"public",table:"products"},s).subscribe();return()=>R.removeChannel(u)},[re]),l.useEffect(()=>{var s;(s=hi.current)==null||s.scrollIntoView({behavior:"smooth"})},[xi]);const Oe=i.pathname;l.useEffect(()=>{if(t.categorySlug){const s=wo(t.categorySlug,xt);te(s||"")}else t.page==="produits"&&Oe==="/produits"&&te("")},[t.categorySlug,t.page,Oe]);const ae=l.useMemo(()=>{var s;return t.citySlug?(s=q[t.citySlug])==null?void 0:s.name:null},[t.citySlug]),yi=l.useMemo(()=>{var s;return t.page==="prestataires"&&t.metierSlug&&t.villeSlug?{cat:Nt[t.metierSlug]||"",ville:((s=q[t.villeSlug])==null?void 0:s.name)||""}:t.page==="seoCity"&&t.cityMode==="prestataires"&&ae?{cat:"",ville:ae}:t.page==="prestataires"&&Oe==="/prestataires"?{cat:"",ville:""}:null},[t.page,t.metierSlug,t.villeSlug,t.cityMode,ae,Oe]);l.useEffect(()=>{if(t.page!=="academyDetail"&&t.page!=="academyContact")return;const s=t.courseId;if(!s||!Me.length)return;const u=Me.find(x=>String(x.id)===String(s));u&&rr(u)},[t.page,t.courseId,Me]),l.useEffect(()=>{if(t.page!=="productDetail"||!t.productSlug){Ie(null),_e(!1);return}const{id:s}=ct(t.productSlug);if(!s){Ie(null),_e(!1);return}let u=!1;return _e(!0),R.from("products").select("*").eq("id",s).maybeSingle().then(({data:x,error:j})=>{u||(j&&console.warn("Détail produit:",j.message),Ie(x||null),_e(!1))}).catch(x=>{u||(console.warn("Détail produit:",(x==null?void 0:x.message)||x),Ie(null),_e(!1))}),()=>{u=!0}},[t.page,t.productSlug]),l.useEffect(()=>{if(t.page!=="prestDetail"||!t.prestSlug){t.page!=="prestDetail"&&me(null);return}const{id:s}=ct(t.prestSlug);if(!s){me(null);return}const u=pn.find(j=>j.id===s);if(u){me(u);return}const x=Y.find(j=>`real-${j.id}`===s||String(j.id)===s);me(x?{id:`real-${x.id}`,name:x.provider_nom||"Prestataire Yorix",metier:x.nom||"Service",categorie:x.categorie||"Autre",ville:x.ville||"Cameroun",quartier:"",emoji:"🛠️",photo:null,color_bg:"linear-gradient(135deg, #dcfce7, #bbf7d0)",tags:[x.categorie||"Service"].filter(Boolean),note:x.note||5,avis:x.nombre_avis||0,prix:x.prix?`${Number(x.prix).toLocaleString("fr-FR")} FCFA`:"",verifie:!0,dispo:x.disponible!==!1,bio:x.description||"",telephone:"",realisations:0,isReal:!0}:null)},[t.page,t.prestSlug,Y]);const wi=async()=>{I(""),V(!0);try{const{data:s,error:u}=await R.auth.signInWithPassword({email:E.email,password:E.password});if(u)throw u;p(s.user),await Le(s.user.id),w(!1),ge&&setTimeout(()=>tr(ge),300),hn({to:E.email,subject:`Bienvenue sur Yorix, ${E.nom} ! 🎉`,html:vn(E.nom,y)}).catch(x=>console.warn("Email bienvenue:",x))}catch{I("Email ou mot de passe incorrect.")}V(!1)},qr=async()=>{var s;I(""),V(!0);try{if(!E.nom||!E.email||!E.password||!E.tel)throw new Error("Tous les champs sont obligatoires.");if(!y)throw new Error("Veuillez choisir un profil (Acheteur, Vendeur, Livreur ou Prestataire).");if(["seller","provider","delivery"].includes(y)&&!oi){Ir({nom:E.nom,email:E.email,tel:E.tel,password:E.password,role:y}),V(!1),er(!0);return}const{data:x,error:j}=await R.auth.signUp({email:E.email,password:E.password,options:{data:{display_name:E.nom,nom:E.nom,telephone:E.tel,role:y}}});if(j)throw j;const O=(s=x.user)==null?void 0:s.id;if(!O)throw new Error("Erreur création compte.");const{error:N}=await R.from("profiles").upsert({id:O,nom:E.nom,email:E.email,telephone:E.tel,role:y,langue:"fr",actif:!0,verifie:!1,note:0,nombre_avis:0,total_commandes:0});N&&console.error("Profile insert error:",N),await R.from("wallets").insert({user_id:O,solde:0,total_gagne:0,devise:"FCFA"}).then($=>$.error&&console.error($.error)),await Le(O),w(!1),B({nom:"",email:"",tel:"",password:""}),Mr(!1),Ir(null),ge&&setTimeout(()=>tr(ge),500)}catch(u){console.error("Register error:",u),I(u.message.includes("already")?"Cet email est déjà utilisé.":u.message)}V(!1)},ki=async()=>{const{error:s}=await R.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin}});s&&I(s.message)},Yr=async()=>{await R.auth.signOut(),p(null),m(null),h(null),ne("overview"),C("home")},ji=async s=>{er(!1),Mr(!0),setTimeout(()=>{qr()},200)},De=l.useCallback(s=>{const u=Hn(s);u&&ye(x=>vt(x,u))},[]),Si=l.useCallback(s=>{const u=Xn(s);u&&ye(x=>vt(x,u))},[]),Ci=(s,u,x=null)=>ye(j=>Jn(j,s,x,u)),zi=(s,u=null)=>ye(x=>Gn(x,s,u)),ir=l.useMemo(()=>Kn(fe,je),[fe,je]),or=ir.qty,_i=l.useCallback(async s=>{if(!(a!=null&&a.id)||!s)return;const u={};if(s.telephone!=null&&String(s.telephone).trim()!==""&&(u.telephone=String(s.telephone).trim()),s.adresse!=null&&(u.adresse=String(s.adresse).trim()),s.ville!=null&&(u.ville=String(s.ville).trim()),s.nom!=null&&(u.nom=String(s.nom).trim()),!Object.keys(u).length)return;const{error:x}=await R.from("profiles").update(u).eq("id",a.id);if(x){console.warn("Profil checkout non sauvegardé:",x.message||x);return}m(j=>j&&{...j,...u})},[a==null?void 0:a.id]),nr=l.useCallback(s=>Gt(u=>{const x=new Set(u);return x.has(s)?x.delete(s):x.add(s),x}),[]),$r=async(s,u={navigate:!0,closeDrawer:!0})=>{const x=typeof s=="object"?s.id:s,j=typeof s=="object"?s:ke.find(N=>N.id===x);try{const{error:N}=await R.from("notifications").update({lu:!0}).eq("id",x);N&&console.warn("marquerNotifLue:",N.message)}catch(N){console.warn("marquerNotifLue exception:",N==null?void 0:N.message)}if(ue(N=>N.map($=>$.id===x?{...$,lu:!0}:$)),u.closeDrawer&&we(!1),!u.navigate||!j)return;const O=String(j.link||"").trim();if(O.startsWith("http")){window.open(O,"_blank","noopener,noreferrer");return}if(O.startsWith("/")){e(O);return}j.type==="new_product"||O.includes("/products/")?C("produits"):j.type==="new_message"&&(C("dashboard"),ne("messages"))},Ur=async s=>{if(s){try{const{error:u}=await R.from("notifications").delete().eq("id",s);u&&console.warn("supprimerNotif:",u.message)}catch(u){console.warn("supprimerNotif:",u==null?void 0:u.message)}ue(u=>u.filter(x=>x.id!==s))}},Wr=async()=>{const s=ke.filter(u=>!u.lu).map(u=>u.id);if(s.length!==0){try{const{error:u}=await R.from("notifications").update({lu:!0}).in("id",s);u&&console.warn("marquerToutesLues:",u.message)}catch(u){console.warn("marquerToutesLues exception:",u==null?void 0:u.message)}ue(u=>u.map(x=>({...x,lu:!0})))}},Be=ke.filter(s=>!s.lu).length,Ti=l.useMemo(()=>{let s=U.filter(u=>{var x,j;return!L||((x=u.name_fr)==null?void 0:x.toLowerCase().includes(L.toLowerCase()))||((j=u.description_fr)==null?void 0:j.toLowerCase().includes(L.toLowerCase()))});if(o==="seoCity"&&t.cityMode==="acheter"&&ae){const u=ae.toLowerCase();s=s.filter(x=>{const j=(x.ville||"").toLowerCase();return!j||j.includes(u)||u.includes(j)})}return s},[U,L,o,t.cityMode,ae]),Vr=o==="seoCity"||o==="livraison"&&!!t.citySlug,Hr=o==="produits"||o==="seoCity"&&t.cityMode==="acheter",Ei=o==="livraison"||o==="seoCity"&&t.cityMode==="livraison",Ai=o==="prestataires"||o==="prestDetail"||o==="seoCity"&&t.cityMode==="prestataires",Ni=Hr||o==="escrow",Ri=l.useMemo(()=>["faq","devenirVendeur","devenirLivreur","inscription","business","academy","blog","contact","aide","cgv","mentions","confidentialite"].includes(o),[o]),Xr=l.useCallback(s=>s==="produits"?o==="produits"||o==="seoCity"&&t.cityMode==="acheter":s==="livraison"?o==="livraison"||o==="seoCity"&&t.cityMode==="livraison":s==="prestataires"?o==="prestataires"||o==="prestDetail"||o==="seoCity"&&t.cityMode==="prestataires":o===s,[o,t.cityMode]),Jr=l.useCallback(s=>{C("productDetail",{productSlug:lt(s.name_fr||s.name,s.id)})},[C]),Gr=()=>({buyer:"chip-buyer",seller:"chip-seller",delivery:"chip-delivery",provider:"chip-provider",admin:"chip-admin"})[g]||"chip-buyer",Pi=()=>g==="seller"?[{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"🏪",id:"mesProduits",label:"Mes produits"},{icon:"➕",id:"ajouterProduit",label:"Ajouter produit"},{icon:"📦",id:"commandes",label:"Commandes"},{icon:"💰",id:"wallet",label:"Wallet"}]:g==="delivery"?[{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"🟡",id:"disponibles",label:"Disponibles"},{icon:"🚚",id:"enCours",label:"En cours"},{icon:"✅",id:"historique",label:"Historique"},{icon:"💰",id:"wallet",label:"Gains"}]:g==="provider"?[{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"📋",id:"demandes",label:"Demandes"},{icon:"🛠️",id:"mesServices",label:"Mes services"},{icon:"+",id:"ajouterService",label:"Ajouter service"}]:[{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"📦",id:"commandes",label:"Mes commandes"},{icon:"❤️",id:"favoris",label:"Favoris"},{icon:"🌟",id:"loyalty",label:"Fidélité"}],Mi=[{l:"🏠 Accueil",p:"home"},{l:"🛍️ Produits",p:"produits"},{l:"🎁 Bons plans",p:"bonsPlans"},{l:"🚚 Livraison",p:"livraison"},{l:"🔐 Escrow",p:"escrow"},{l:"👷 Prestataires",p:"prestataires"},{l:"💼 Business",p:"business"},{l:"🎓 Academy",p:"academy"},{l:"📰 Blog",p:"blog"},{l:"🌟 Fidélité",p:"loyalty"},{l:"📞 Contact",p:"contact"},{l:"🆘 Aide",p:"aide"},...a&&((c==null?void 0:c.role)==="admin"||(c==null?void 0:c.role)==="superadmin")?[{l:"⚙️ Admin",p:"admin"}]:[]],se=l.useMemo(()=>{const s=t.canonicalPath||i.pathname,u={"@context":"https://schema.org","@type":"Organization",name:"Yorix CM",alternateName:"Yorix Cameroun",url:ie,logo:`${ie}/icons/icon-512.png`,areaServed:{"@type":"Country",name:"Cameroun"},sameAs:["https://www.facebook.com/yorixcm","https://www.instagram.com/yorixcm","https://wa.me/237696565654"]},x={"@context":"https://schema.org","@type":"WebSite",name:"Yorix CM",url:ie,potentialAction:{"@type":"SearchAction",target:`${jo()}?q={search_term_string}`,"query-input":"required name=search_term_string"}};if(o==="dashboard"||o==="admin")return{title:"Espace membre — Yorix CM",description:"Tableau de bord Yorix.",canonicalPath:s,noindex:!0,jsonLd:[]};if(o==="home")return{title:"Yorix.cm — Marketplace Cameroun | Achat en ligne, livraison, escrow, prestataires",description:"Yorix est une marketplace camerounaise : achat en ligne, vendre en ligne, livreur & livraison Douala, Yaoundé, Bafoussam, escrow MTN MoMo & Orange Money, prestataires vérifiés.",canonicalPath:"/",keywords:"marketplace Cameroun, achat en ligne Cameroun, vendre en ligne Cameroun, livraison Cameroun, livreur Cameroun, escrow Cameroun, prestataires Cameroun, Douala, Yaoundé, Bafoussam",jsonLd:[u,x]};if(o==="productDetail"&&ze){const N=ze,$=N.image&&String(N.image).startsWith("http")?N.image:Array.isArray(N.image_urls)&&N.image_urls[0]?N.image_urls[0]:`${ie}/icons/icon-512.png`,Te=N.description_fr&&String(N.description_fr).slice(0,158)||`Acheter ${N.name_fr||"ce produit"} sur Yorix — marketplace & livraison Cameroun.`,ar={"@context":"https://schema.org","@type":"Product",name:N.name_fr||"Produit Yorix",image:$,description:Te,brand:{"@type":"Brand",name:"Yorix CM"},offers:{"@type":"Offer",url:`${ie}${s}`,priceCurrency:"XAF",price:N.prix,availability:"https://schema.org/InStock"}};return{title:`${N.name_fr||"Produit"} — achat en ligne Cameroun | Yorix.cm`,description:Te,canonicalPath:s,ogType:"product",jsonLd:[ar,u]}}if(o==="notifications")return{title:"Notifications — alertes commandes & messages | Yorix.cm",description:"Historique de vos alertes Yorix : commandes, paiements, livraisons, prestations et messages.",canonicalPath:"/notifications",noindex:!0,jsonLd:[u]};if(o==="faq")return{title:"FAQ Yorix — marketplace, livraison, escrow Cameroun",description:"Réponses sur l’achat en ligne, la livraison, les prestataires, MTN MoMo, Orange Money et l’escrow sur Yorix.cm.",canonicalPath:"/faq",jsonLd:[{"@context":"https://schema.org","@type":"FAQPage",mainEntity:[{"@type":"Question",name:"Comment acheter sur Yorix au Cameroun ?",acceptedAnswer:{"@type":"Answer",text:"Parcourez les produits, ajoutez au panier et finalisez via WhatsApp ou paiement mobile (MTN MoMo, Orange Money)."}},{"@type":"Question",name:"La livraison couvre quelles villes ?",acceptedAnswer:{"@type":"Answer",text:"Douala, Yaoundé, Bafoussam, Bamenda, Kribi et un réseau national en expansion. Délais J+1 sur les grandes villes."}},{"@type":"Question",name:"Comment fonctionne l’escrow Yorix ?",acceptedAnswer:{"@type":"Answer",text:"Les fonds sont sécurisés jusqu’à confirmation de réception par l’acheteur, puis libérés au vendeur."}}]},u]};if(o==="seoCity"&&t.citySlug&&q[t.citySlug]){const N=q[t.citySlug].name,$={hub:{title:`Yorix ${N} — marketplace, livraison & prestataires | Cameroun`,desc:`Marketplace à ${N} : acheter en ligne, livraison, services et escrow. MTN MoMo, Orange Money — Yorix.cm.`},acheter:{title:`Acheter en ligne à ${N} — marketplace Yorix Cameroun`,desc:`Achat en ligne à ${N} : produits vérifiés, paiement mobile, livraison. La marketplace camerounaise Yorix.`},livraison:{title:`Livraison à ${N} — livreur & colis | Yorix Ride Cameroun`,desc:`Service de livraison rapide à ${N} et partout au Cameroun. Suivi, tarifs clairs — Yorix Ride.`},prestataires:{title:`Prestataires à ${N} — services à domicile | Yorix.cm`,desc:`Trouvez des prestataires vérifiés à ${N} : plomberie, électricité, ménage, beauté, informatique…`}},Te=$[t.cityMode]||$.hub,ar={"@context":"https://schema.org","@type":"LocalBusiness",name:`Yorix — ${N}`,url:`${ie}${s}`,address:{"@type":"PostalAddress",addressLocality:N,addressCountry:"CM"},areaServed:{"@type":"City",name:N},parentOrganization:{"@type":"Organization",name:"Yorix CM"}};return{title:Te.title,description:Te.desc,canonicalPath:s,jsonLd:[ar,u]}}const O={produits:"Produits — marketplace en ligne Cameroun | Yorix.cm",livraison:"Livraison Cameroun — livreurs Yorix Ride | Douala, Yaoundé",escrow:"Escrow Cameroun — paiement sécurisé marketplace | Yorix.cm",prestataires:"Prestataires Cameroun — services à domicile vérifiés | Yorix.cm",business:"Yorix Business — solutions B2B marketplace Cameroun",blog:"Blog Yorix — actualités marketplace Cameroun",academy:"Yorix Academy — formations e-commerce Cameroun",loyalty:"Fidélité Yorix — points & récompenses",contact:"Contact Yorix — support marketplace Cameroun",aide:"Centre d'aide Yorix — marketplace & livraison Cameroun",faq:"FAQ Yorix — achat, livraison, escrow, vendeurs | Cameroun",cgv:"CGV Yorix.cm — conditions générales de vente",confidentialite:"Politique de confidentialité — Yorix.cm",mentions:"Mentions légales — Yorix.cm",devenirVendeur:"Devenir vendeur sur Yorix — marketplace Cameroun",devenirLivreur:"Devenir livreur Yorix Ride — livraison Cameroun",inscription:"Devenir prestataire Yorix — services Cameroun"}[o];return O?{title:O,description:"Yorix.cm — marketplace & super-app pour acheter, vendre, se faire livrer et trouver des prestataires au Cameroun. MTN MoMo, Orange Money, escrow.",canonicalPath:zr[o]||s,jsonLd:[u]}:{title:"Yorix CM — Marketplace #1 au Cameroun",description:"Marketplace camerounaise : produits, livraison, prestataires, escrow MTN MoMo & Orange Money.",canonicalPath:s,jsonLd:[u]}},[o,t.canonicalPath,t.citySlug,t.cityMode,i.pathname,ze]);return k?r.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",fontFamily:"'DM Sans',sans-serif",color:"#1a6b3a",gap:12},children:[r.jsx("div",{style:{width:40,height:40,border:"4px solid #e2ddd6",borderTopColor:"#1a6b3a",borderRadius:"50%",animation:"spin .7s linear infinite"}}),"Chargement de Yorix...",r.jsx("style",{children:"@keyframes spin{to{transform:rotate(360deg);}}"})]}):r.jsxs(r.Fragment,{children:[r.jsx("style",{children:yn(n)}),r.jsx(Zo,{title:se.title,description:se.description,canonicalPath:se.canonicalPath,keywords:se.keywords,ogType:se.ogType||"website",jsonLd:se.jsonLd,noindex:se.noindex}),r.jsx(pa,{open:ii,onClose:()=>{er(!1),V(!1),I("Vous devez accepter le contrat pour finaliser votre inscription.")},onAccepted:ji,user:a,userData:c,role:y,authForm:E}),r.jsx(da,{open:ni,onClose:vi,onSelectAction:bi,user:a}),ti&&r.jsx(wn,{user:a,userData:c,onClose:()=>Ze(!1),onSuccess:s=>{console.log("Livraison créée avec code:",s)}}),z&&r.jsx("div",{className:"modal-overlay",onClick:s=>s.target===s.currentTarget&&w(!1),children:r.jsxs("div",{className:"modal",style:{width:"100%",maxWidth:480,margin:"0 auto"},children:[r.jsx("button",{className:"modal-close",onClick:()=>w(!1),children:"✕"}),r.jsx("div",{className:"modal-title",children:f==="login"?"Bon retour ! 👋":"Rejoindre Yorix 🇨🇲"}),r.jsx("p",{className:"modal-sub",children:"Votre marketplace camerounaise de confiance"}),r.jsxs("div",{className:"auth-tabs",children:[r.jsx("button",{className:`auth-tab${f==="login"?" active":""}`,onClick:()=>{b("login"),I("")},children:"🔑 Connexion"}),r.jsx("button",{className:`auth-tab${f==="register"?" active":""}`,onClick:()=>{b("register"),I("")},children:"🚀 Inscription"})]}),T&&r.jsxs("div",{className:"error-msg",children:["⚠️ ",T]}),f==="register"&&r.jsxs(r.Fragment,{children:[r.jsx("div",{style:{background:"var(--green-pale)",border:"1px solid var(--green-light)",borderRadius:9,padding:"10px 12px",marginBottom:12,fontSize:".78rem",color:"var(--green)",fontWeight:600},children:"👇 Choisissez votre profil pour commencer"}),r.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14},children:[{id:"buyer",icon:"🛍️",label:"Acheteur",desc:"J'achète des produits"},{id:"seller",icon:"🏪",label:"Vendeur",desc:"Je vends mes produits"},{id:"delivery",icon:"🚚",label:"Livreur",desc:"J'effectue des livraisons"},{id:"provider",icon:"👷",label:"Prestataire",desc:"Je propose des services"}].map(s=>r.jsxs("div",{onClick:()=>P(s.id),style:{border:`2px solid ${y===s.id?"var(--green)":"var(--border)"}`,borderRadius:10,padding:"12px 10px",cursor:"pointer",background:y===s.id?"var(--green-pale)":"var(--surface)",textAlign:"center",transition:"all .2s"},children:[r.jsx("div",{style:{fontSize:"1.8rem",marginBottom:4},children:s.icon}),r.jsx("div",{style:{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem",color:"var(--ink)"},children:s.label}),r.jsx("div",{style:{fontSize:".67rem",color:"var(--gray)",marginTop:2},children:s.desc}),y===s.id&&r.jsx("div",{style:{marginTop:5,fontSize:".62rem",fontWeight:700,color:"var(--green)"},children:"✅ Sélectionné"})]},s.id))}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{className:"form-label",children:["Nom complet ",r.jsx("span",{children:"*"})]}),r.jsx("input",{className:"form-input",placeholder:"Ex: Amina Bello",value:E.nom,onChange:s=>B(u=>({...u,nom:s.target.value}))})]}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{className:"form-label",children:["Téléphone ",r.jsx("span",{children:"*"})]}),r.jsx("input",{className:"form-input",type:"tel",placeholder:"+237 6XX XXX XXX",value:E.tel,onChange:s=>B(u=>({...u,tel:s.target.value}))})]})]}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{className:"form-label",children:["Email ",r.jsx("span",{children:"*"})]}),r.jsx("input",{className:"form-input",type:"email",placeholder:"votre@email.com",value:E.email,onChange:s=>B(u=>({...u,email:s.target.value}))})]}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{className:"form-label",children:["Mot de passe ",r.jsx("span",{children:"*"})]}),r.jsx(ua,{value:E.password,onChange:s=>B(u=>({...u,password:s})),placeholder:f==="login"?"Entrez votre mot de passe":"Choisissez un mot de passe",autoComplete:f==="login"?"current-password":"new-password",showStrength:f==="register",showRules:f==="register",ariaLabel:"Mot de passe",id:"auth-password"}),f==="login"&&r.jsx("div",{style:{fontSize:".7rem",color:"var(--gray)",marginTop:5,display:"flex",alignItems:"center",gap:4},children:"💡 Cliquez sur l'œil pour afficher ou masquer votre mot de passe"})]}),r.jsx("button",{className:"form-submit",onClick:f==="login"?wi:qr,disabled:oe,style:{fontSize:".9rem",padding:"13px"},children:oe?r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"spinner",style:{width:16,height:16,borderWidth:2}}),"Chargement..."]}):f==="login"?"🔑 Se connecter":`🚀 Créer mon compte ${y==="buyer"?"Acheteur":y==="seller"?"Vendeur":y==="delivery"?"Livreur":"Prestataire"}`}),f==="register"&&r.jsx("p",{style:{fontSize:".68rem",color:"var(--gray)",textAlign:"center",marginTop:8},children:"En vous inscrivant, vous acceptez nos conditions d'utilisation"}),r.jsx("div",{className:"divider",children:"ou"}),r.jsxs("button",{className:"social-btn",onClick:ki,children:[r.jsx("span",{children:"🇬"})," Continuer avec Google"]})]})}),r.jsxs("div",{className:"topbar",children:[r.jsxs("div",{className:"topbar-l",children:[r.jsxs("div",{className:"flag-wrap",children:[r.jsxs("span",{className:"flag",children:[r.jsx("span",{className:"fg"}),r.jsx("span",{className:"fr"}),r.jsx("span",{className:"fy"})]}),r.jsx("span",{children:"Cameroun 🇨🇲"})]}),r.jsx("span",{children:"FR / EN"}),r.jsx("span",{children:"📞 +237 696 56 56 54"})]}),r.jsxs("div",{className:"topbar-r",children:[r.jsx("span",{onClick:()=>C("aide"),children:"🆘 Aide"}),r.jsx("span",{onClick:()=>C("contact"),children:"📞 Contact"}),a?r.jsxs("span",{style:{color:"#b7e4c7"},children:["👤 ",(c==null?void 0:c.nom)||((Kr=a.email)==null?void 0:Kr.split("@")[0])]}):r.jsx("span",{onClick:()=>{b("login"),w(!0)},children:"🔑 Se connecter"})]})]}),r.jsxs("nav",{className:"navbar",children:[r.jsx("div",{className:"logo-wrap",onClick:()=>C("home"),children:r.jsxs("div",{className:"logo-txt",children:["Yo",r.jsx("span",{children:"rix"}),r.jsx("sup",{children:"CM"})]})}),r.jsxs("div",{className:"nav-search",style:{position:"relative"},children:[r.jsxs("select",{value:re,onChange:s=>te(s.target.value),children:[r.jsx("option",{value:"",children:"Tout"}),xt.map(s=>r.jsx("option",{children:s},s))]}),r.jsx("input",{placeholder:"Rechercher un produit...",value:L,onChange:s=>pe(s.target.value),onKeyDown:s=>s.key==="Enter"&&C("produits"),autoComplete:"off"}),L.trim().length>=2&&r.jsxs("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"var(--bg)",border:"1px solid var(--border)",borderRadius:10,boxShadow:"0 4px 16px rgba(0,0,0,0.12)",zIndex:9999,maxHeight:320,overflowY:"auto",marginTop:4},children:[U.filter(s=>(s.name_fr||"").toLowerCase().includes(L.toLowerCase())||(s.description_fr||"").toLowerCase().includes(L.toLowerCase())).slice(0,8).map(s=>{var u;return r.jsxs("div",{onClick:()=>{pe(""),C("produits")},style:{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",cursor:"pointer",borderBottom:"1px solid var(--border)",fontSize:13},onMouseEnter:x=>x.currentTarget.style.background="var(--bg2)",onMouseLeave:x=>x.currentTarget.style.background="transparent",children:[s.image&&r.jsx("img",{src:s.image,style:{width:36,height:36,objectFit:"cover",borderRadius:6},alt:"",onError:x=>x.currentTarget.style.display="none"}),r.jsxs("div",{children:[r.jsx("div",{style:{fontWeight:500},children:s.name_fr}),r.jsxs("div",{style:{color:"var(--gray)",fontSize:12},children:[(u=s.prix)==null?void 0:u.toLocaleString()," FCFA"]})]})]},s.id)}),U.filter(s=>(s.name_fr||"").toLowerCase().includes(L.toLowerCase())).length===0&&r.jsxs("div",{style:{padding:14,color:"var(--gray)",fontSize:13,textAlign:"center"},children:['Aucun résultat pour "',L,'"']})]}),r.jsx("button",{onClick:()=>C("produits"),children:"🔍"})]}),r.jsxs("div",{className:"nav-actions",children:[r.jsx("button",{onClick:()=>Ce(!0),title:"Que cherchez-vous ?",style:{background:"linear-gradient(135deg, var(--green, #1a6b3a), #0d4d28)",color:"#fff",border:"none",padding:"7px 14px",borderRadius:8,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".75rem",cursor:"pointer",whiteSpace:"nowrap",boxShadow:"0 2px 8px rgba(26,107,58,.25)"},children:"🚀 Démarrer"}),r.jsx("button",{className:"dark-toggle",onClick:()=>d(s=>!s),title:n?"Mode clair":"Mode sombre",children:n?"☀️":"🌙"}),a&&r.jsxs("button",{className:"icon-btn",onClick:()=>we(s=>!s),title:"Notifications",children:["🔔",Be>0&&r.jsx("span",{className:"ibadge",children:Be})]}),r.jsxs("button",{className:"icon-btn",onClick:()=>C("cart"),title:"Mon panier",children:["🛒",or>0&&r.jsx("span",{className:"ibadge",children:or})]}),a?r.jsxs(r.Fragment,{children:[r.jsx("span",{className:`role-chip ${Gr()}`,children:ht[g||"buyer"]}),r.jsx("div",{className:"user-av",onClick:()=>C("dashboard"),title:"Mon espace",children:((c==null?void 0:c.nom)||a.email||"?")[0].toUpperCase()}),r.jsx("button",{className:"btn-red",onClick:Yr,title:"Déconnexion",children:"🚪 Déconnexion"})]}):r.jsxs(r.Fragment,{children:[r.jsx("button",{className:"btn-ghost",onClick:()=>{b("login"),w(!0)},children:"🔑 Connexion"}),r.jsx("button",{className:"btn-green",onClick:()=>{b("register"),P("buyer"),w(!0)},children:"🚀 S'inscrire"})]})]})]}),Ht&&a&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"notif-backdrop",role:"presentation",onClick:()=>we(!1)}),r.jsx("div",{className:"notif-drawer notif-drawer--premium",children:r.jsx(ca,{variant:"dropdown",user:a,notifs:ke,goPage:C,onMarkRead:$r,onMarkAllRead:Wr,onDismiss:Ur,onClose:()=>we(!1),onPrefsUpdated:Re})})]}),r.jsx("div",{className:"nav-tabs",children:Mi.map(s=>r.jsx("div",{className:`tab${Xr(s.p)?" active":""}`,onClick:()=>C(s.p),children:s.l},s.p))}),r.jsxs("div",{className:"pay-strip",children:[r.jsx("b",{style:{color:"var(--ink)"},children:"Paiement :"}),r.jsxs("div",{className:"pay-methods",children:[r.jsx("span",{className:"pm mtn-b",children:"📱 MTN MoMo"}),r.jsx("span",{className:"pm ora-b",children:"🔶 Orange Money"}),r.jsx("span",{className:"pm",children:"💳 Carte"}),r.jsx("span",{className:"pm",children:"💵 Cash"})]}),r.jsxs("div",{className:"strip-right",children:[r.jsx("span",{children:"🚚 J+1 Douala & Yaoundé"}),r.jsxs("span",{role:"link",tabIndex:0,onClick:()=>C("bonsPlans"),onKeyDown:s=>s.key==="Enter"&&C("bonsPlans"),style:{cursor:"pointer",fontWeight:700,color:"var(--green)",textDecoration:"underline"},children:["Livraison offerte dès ",je.freeShippingThresholdXaf.toLocaleString("fr-FR")," FCFA"]}),r.jsx("span",{children:"🔐 Escrow sécurisé"}),a&&r.jsxs("span",{style:{color:"var(--gold)"},children:["👤 ",(c==null?void 0:c.nom)||a.email]})]})]}),o==="home"&&r.jsx(l.Suspense,{fallback:r.jsx(F,{minHeight:280,label:"Chargement de l'accueil..."}),children:r.jsx(Cn,{filterCat:re,setFilterCat:te,search:L,setSearch:pe,produitsLoading:S,produits:U,user:a,userData:c,wishlist:Pe,addToCart:De,toggleWish:nr,openProductUrl:Jr,setOnboardingOpen:Ce,goPage:C,allServices:Y,nlEmail:Se,setNlEmail:Ge,nlSent:Ke,setNlSent:Qe,freeShippingThresholdXaf:je.freeShippingThresholdXaf})}),Vr&&o==="livraison"&&t.citySlug&&q[t.citySlug]&&r.jsx(gt,{city:q[t.citySlug],mode:"livraison",goPage:C}),Vr&&o==="seoCity"&&t.citySlug&&q[t.citySlug]&&r.jsx(gt,{city:q[t.citySlug],mode:t.cityMode||"hub",goPage:C}),o==="productDetail"&&r.jsx("div",{className:"anim",children:li?r.jsxs("div",{className:"loading",style:{minHeight:320,justifyContent:"center"},children:[r.jsx("div",{className:"spinner"})," Chargement du produit..."]}):ze?r.jsx(l.Suspense,{fallback:r.jsx(F,{minHeight:320,label:"Chargement du produit..."}),children:r.jsx(En,{product:ze,user:a,userData:c,onClose:()=>C("produits"),onAddToCart:De})}):r.jsx("section",{className:"sec anim",children:r.jsxs("div",{className:"empty-state",children:[r.jsx("div",{className:"empty-icon",children:"🔍"}),r.jsx("p",{children:"Produit introuvable."}),r.jsx("button",{className:"form-submit",style:{width:"auto",marginTop:16},type:"button",onClick:()=>C("produits"),children:"← Retour aux produits"})]})})}),Ni&&r.jsx(l.Suspense,{fallback:r.jsx(F,{label:"Chargement catalogue..."}),children:r.jsx(zn,{showProduits:Hr,page:o,seoCityName:ae,produitsFiltres:Ti,produitsLoading:S,produits:U,filterCat:re,setFilterCat:te,search:L,user:a,userData:c,wishlist:Pe,addToCart:De,toggleWish:nr,openProductUrl:Jr,dark:n})}),Ei&&r.jsx(l.Suspense,{fallback:r.jsx(F,{label:"Chargement livraison..."}),children:r.jsx(_n,{route:t,user:a,userData:c,setDemandeLivraisonOpen:Ze,setAuthTab:b,setSelectedRole:P,setAuthOpen:w})}),Ai&&r.jsx(l.Suspense,{fallback:r.jsx(F,{label:"Chargement prestataires..."}),children:r.jsx(An,{user:a,userData:c,allServices:Y,goPage:C,setSelectedPrest:me,selectedPrest:ri,onOpenPrestDetail:s=>C("prestDetail",{prestSlug:lt(s.name,s.id)}),onClosePrestDetail:()=>{t.metierSlug&&t.villeSlug?C("prestataires",{metierSlug:t.metierSlug,villeSlug:t.villeSlug}):o==="seoCity"&&t.cityMode==="prestataires"&&t.citySlug?C("seoCity",{citySlug:t.citySlug,mode:"prestataires"}):C("prestataires")},syncFilters:yi,onAddServiceToCart:Si})}),o==="cart"&&r.jsx(l.Suspense,{fallback:r.jsx(F,{label:"Chargement panier..."}),children:r.jsx(Rn,{cartItems:fe,cartSummary:ir,changeQty:Ci,removeItem:zi,goPage:C,addToCart:De,produits:U,wishlist:Pe,toggleWish:nr})}),o==="checkout"&&r.jsx(l.Suspense,{fallback:r.jsx(F,{label:"Chargement checkout..."}),children:r.jsx(Nn,{user:a,userData:c,cartItems:fe,summary:ir,setCartItems:ye,goPage:C,fallbackWhatsappNumber:ln,momoNumber:an,orangeNumber:sn,persistCheckoutContact:_i})}),o==="notifications"&&!a&&r.jsxs("section",{className:"sec anim",style:{maxWidth:480,margin:"0 auto",textAlign:"center",padding:"48px 20px"},children:[r.jsx("h1",{className:"sec-title",style:{fontSize:"1.25rem"},children:"Vos notifications Yorix"}),r.jsx("p",{style:{color:"var(--gray)",marginBottom:22,fontSize:".9rem",lineHeight:1.55},children:"Connectez-vous pour suivre les messages, commandes, paiements et livraisons en temps réel."}),r.jsx("button",{type:"button",className:"form-submit",style:{width:"auto",padding:"12px 28px"},onClick:()=>{b("login"),w(!0)},children:"Se connecter"})]}),o==="notifications"&&a&&r.jsx(l.Suspense,{fallback:r.jsx(F,{label:"Chargement notifications..."}),children:r.jsx(qn,{user:a,notifs:ke,goPage:C,onMarkRead:$r,onMarkAllRead:Wr,onDismiss:Ur,refreshNotificationsFull:()=>Rr(a.id,120),onPrefsUpdated:Re})}),Ri&&r.jsx(l.Suspense,{fallback:r.jsx(F,{label:"Chargement page..."}),children:r.jsx(Tn,{page:o,goPage:C,setAuthOpen:w,setAuthTab:b,setSelectedRole:P,inscriptionSent:pi,setInscriptionSent:Br,inscriptionForm:_,setInscriptionForm:mi,inscriptionError:ui,inscriptionLoading:fi,submitInscriptionPrestataire:gi,academyCourses:Me,academyLoading:si,goAcademyDetail:ci,blogFilter:Zt,setBlogFilter:ei,nlEmail:Se,setNlEmail:Ge,nlSent:Ke,setNlSent:Qe})}),o==="academyDetail"&&r.jsx(l.Suspense,{fallback:r.jsx(F,{label:"Chargement formation..."}),children:r.jsx(Pn,{course:Dr,goPage:C,goContact:di})}),o==="academyContact"&&r.jsx(l.Suspense,{fallback:r.jsx(F,{label:"Chargement formulaire..."}),children:r.jsx(Mn,{course:Dr,user:a,userData:c,goPage:C})}),o==="bonsPlans"&&r.jsx(l.Suspense,{fallback:r.jsx(F,{label:"Chargement bons plans..."}),children:r.jsx(Yn,{goPage:C,freeShippingThresholdXaf:je.freeShippingThresholdXaf})}),o==="loyalty"&&r.jsx(l.Suspense,{fallback:r.jsx(F,{label:"Chargement fidélité..."}),children:r.jsx(In,{user:a,userData:c,goPage:C,setAuthOpen:w,setAuthTab:b})}),o==="dashboard"&&(a?r.jsxs("div",{className:"dash-layout anim",children:[r.jsxs("div",{className:"dash-sidebar",children:[r.jsx("div",{className:"dash-avatar",children:((Qr=c==null?void 0:c.nom)==null?void 0:Qr[0])||"U"}),r.jsx("div",{className:"dash-name",title:(c==null?void 0:c.nom)||a.email,children:(c==null?void 0:c.nom)||((Zr=a.email)==null?void 0:Zr.split("@")[0])||"Utilisateur"}),r.jsx("div",{className:"dash-role-badge",children:r.jsx("span",{className:`role-chip ${Gr()}`,children:ht[g||"buyer"]})}),r.jsxs("div",{className:"dash-nav",children:[Pi().map(s=>r.jsxs("div",{className:`dash-nav-item${H===s.id?" active":""}`,onClick:()=>ne(s.id),children:[s.icon," ",s.label]},s.id)),r.jsx("div",{className:"dash-nav-divider"}),r.jsx("div",{className:`dash-nav-item${H==="messages"?" active":""}`,onClick:()=>ne("messages"),children:"💬 Messages"}),r.jsx("div",{className:"dash-nav-item",onClick:Yr,style:{color:"var(--red)"},children:"🚪 Déconnexion"})]})]}),r.jsxs("div",{className:"dash-content",children:[H==="messages"&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"dash-page-title",children:"💬 Messagerie Yorix"}),r.jsx("div",{className:"info-msg",children:"🔐 Messagerie sécurisée entre acheteurs et vendeurs. Tes discussions sont privées et protégées."}),r.jsx(kn,{user:a,userData:c})]}),H!=="messages"&&g==="seller"&&r.jsx(l.Suspense,{fallback:r.jsx(F,{label:"Chargement espace vendeur..."}),children:r.jsx(Ln,{user:a,userData:c,dashTab:H,setDashTab:ne})}),H!=="messages"&&g==="delivery"&&r.jsx(l.Suspense,{fallback:r.jsx(F,{label:"Chargement espace livreur..."}),children:r.jsx(Dn,{user:a,userData:c,dashTab:H,setDashTab:ne})}),H!=="messages"&&g==="provider"&&r.jsx(l.Suspense,{fallback:r.jsx(F,{label:"Chargement espace prestataire..."}),children:r.jsx(Bn,{user:a,userData:c,dashTab:H,setDashTab:ne})}),H!=="messages"&&(g==="buyer"||!g)&&r.jsx(l.Suspense,{fallback:r.jsx(F,{label:"Chargement tableau de bord..."}),children:r.jsx(On,{user:a,userData:c,wishlist:Pe,totalQty:or,loyaltyPts:Kt,setLoyaltyPts:Qt,dashTab:H,goPage:C})})]})]}):r.jsxs("div",{className:"empty-state anim",style:{padding:"60px 0"},children:[r.jsx("div",{className:"empty-icon",children:"🔐"}),r.jsx("p",{children:"Connectez-vous pour accéder à votre espace"}),r.jsx("button",{className:"form-submit",style:{width:"auto",padding:"11px 28px",marginTop:16},onClick:()=>w(!0),children:"Se connecter"})]})),o!=="home"&&r.jsxs("div",{className:"newsletter",children:[r.jsx("div",{className:"nl-title",children:"📬 Restez informé(e)"}),r.jsx("p",{className:"nl-sub",children:"Les meilleures offres Yorix dans votre boîte mail."}),Ke?r.jsx("div",{style:{background:"rgba(255,255,255,.2)",borderRadius:8,padding:"9px 18px",color:"#fff",fontWeight:600},children:"✅ Abonné(e) !"}):r.jsxs("div",{className:"nl-form",children:[r.jsx("input",{className:"nl-input",placeholder:"Votre email...",value:Se,onChange:s=>Ge(s.target.value)}),r.jsx("button",{className:"nl-btn",onClick:async()=>{Se&&(await R.from("newsletter").insert({email:Se}).catch(s=>console.warn(s==null?void 0:s.message)),Qe(!0))},children:"S'abonner 🚀"})]})]}),r.jsxs("div",{className:"wa-float",children:[Pr&&r.jsxs("div",{className:"wa-card",children:[r.jsx("div",{className:"wa-card-title",children:"💬 Contacter Yorix"}),r.jsx("div",{className:"wa-card-sub",children:"Support 7j/7 · Réponse rapide"}),r.jsx("a",{href:`https://wa.me/${Ue}?text=${encodeURIComponent("Bonjour Yorix ! J'ai besoin d'aide.")}`,target:"_blank",rel:"noreferrer",className:"wa-link wa-link-green",children:"📱 WhatsApp +237 696 56 56 54"}),r.jsx("a",{href:"tel:+237696565654",className:"wa-link wa-link-ghost",children:"📞 Appeler"}),r.jsx("a",{href:"mailto:support@yorix.cm",className:"wa-link wa-link-ghost",children:"✉️ support@yorix.cm"})]}),r.jsxs("div",{style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center"},children:[r.jsx("div",{className:"wa-pulse"}),r.jsx("button",{className:"wa-btn",onClick:()=>Jt(s=>!s),children:Pr?"✕":"💬"})]})]}),r.jsxs("div",{className:"mobile-nav",children:[r.jsx("div",{className:"mn-inner",children:[{icon:"🏠",label:"Accueil",p:"home"},{icon:"🛍️",label:"Produits",p:"produits"},{icon:"🚚",label:"Livraison",p:"livraison"},{icon:"📊",label:"Mon espace",p:"dashboard"},{icon:"💬",label:"WhatsApp",p:"wa"}].map(s=>r.jsxs("div",{className:`mn-item${Xr(s.p)?" active":""}`,onClick:()=>{s.p==="wa"?window.open(`https://wa.me/${Ue}?text=${encodeURIComponent("Bonjour Yorix ! J'ai besoin d'aide.")}`,"_blank"):s.p==="dashboard"&&!a?(b("register"),w(!0)):C(s.p)},children:[r.jsx("div",{className:"mn-icon",children:s.icon}),r.jsx("div",{className:"mn-label",children:s.label}),s.p==="dashboard"&&!a&&r.jsx("div",{style:{position:"absolute",top:0,right:2,background:"var(--green)",color:"#fff",fontSize:".45rem",fontWeight:700,padding:"1px 3px",borderRadius:3},children:"S'inscrire"}),s.p==="dashboard"&&Be>0&&a&&r.jsx("div",{className:"mn-badge",children:Be})]},s.label))}),!a&&r.jsxs("div",{style:{borderTop:"1px solid var(--border)",padding:"8px 16px",display:"flex",gap:8},children:[r.jsx("button",{onClick:()=>{b("login"),w(!0)},style:{flex:1,padding:"9px",borderRadius:8,border:"1.5px solid var(--border)",background:"var(--surface)",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".78rem",cursor:"pointer",color:"var(--ink)"},children:"🔑 Connexion"}),r.jsx("button",{onClick:()=>{b("register"),P("buyer"),w(!0)},style:{flex:2,padding:"9px",borderRadius:8,border:"none",background:"var(--green)",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem",cursor:"pointer",color:"#fff"},children:"🚀 S'inscrire gratuitement"})]})]}),o==="admin"&&r.jsx(l.Suspense,{fallback:r.jsx(F,{label:"Chargement admin..."}),children:r.jsx(Fn,{user:a,userData:c,goPage:C})}),r.jsxs("footer",{className:"footer",children:[r.jsxs("div",{className:"footer-grid",children:[r.jsxs("div",{children:[r.jsxs("div",{className:"footer-logo",children:["Yo",r.jsx("span",{children:"rix"})," CM"]}),r.jsx("p",{className:"footer-desc",children:"La marketplace camerounaise complète — produits, prestataires, livraison, paiement MoMo sécurisé Escrow."}),r.jsxs("div",{className:"footer-contact",children:[r.jsx("span",{children:"📞 +237 696 56 56 54"}),r.jsx("span",{children:"✉️ support@yorix.cm"}),r.jsx("span",{children:"🇨🇲 Douala · Yaoundé · Bafoussam · et partout"})]})]}),r.jsxs("div",{className:"footer-col",children:[r.jsx("h4",{children:"Marketplace"}),r.jsx("ul",{children:[{l:"Tous les produits",p:"produits"},{l:"Acheter à Douala",nav:()=>C("seoCity",{citySlug:"douala",mode:"acheter"})},{l:"Acheter à Yaoundé",nav:()=>C("seoCity",{citySlug:"yaounde",mode:"acheter"})},{l:"Vendre sur Yorix",p:"devenirVendeur"}].map(s=>r.jsx("li",{onClick:()=>s.nav?s.nav():C(s.p),children:s.l},s.l))})]}),r.jsxs("div",{className:"footer-col",children:[r.jsx("h4",{children:"Services & villes"}),r.jsx("ul",{children:[{l:"Livraison Cameroun",p:"livraison"},{l:"Livraison à Douala",nav:()=>C("livraison",{citySlug:"douala"})},{l:"Prestataires Cameroun",p:"prestataires"},{l:"Prestataires à Yaoundé",nav:()=>C("seoCity",{citySlug:"yaounde",mode:"prestataires"})},{l:"Escrow 🔐",p:"escrow"},{l:"Business 💼",p:"business"},{l:"Academy 🎓",p:"academy"}].map(s=>r.jsx("li",{onClick:()=>s.nav?s.nav():C(s.p),children:s.l},s.l))})]}),r.jsxs("div",{className:"footer-col",children:[r.jsx("h4",{children:"Rejoindre Yorix"}),r.jsx("ul",{children:[{l:"Devenir livreur",p:"devenirLivreur"},{l:"Devenir prestataire",p:"inscription"},{l:"FAQ",p:"faq"},{l:"Centre d'aide",p:"aide"},{l:"Nous contacter",p:"contact"},{l:"📜 CGV",p:"cgv"},{l:"🔒 Confidentialité",p:"confidentialite"}].map(s=>r.jsx("li",{onClick:()=>C(s.p),children:s.l},s.l))})]})]}),r.jsxs("div",{className:"footer-bottom",children:[r.jsx("span",{children:"© 2026 Yorix Cameroun — RC: DOUALA/2026/B237"}),r.jsxs("div",{className:"fb-badges",children:[r.jsx("span",{className:"fbb",children:"📱 MTN MoMo"}),r.jsx("span",{className:"fbb",children:"🔶 Orange Money"}),r.jsx("span",{className:"fbb",children:"🔐 Escrow"}),r.jsx("span",{className:"fbb",children:"🇨🇲 Made in CM"})]})]})]})]})}gr.createRoot(document.getElementById("root")).render(r.jsx(ee.StrictMode,{children:r.jsx(bo,{children:r.jsx(Bt,{children:r.jsx(ma,{})})})}));export{za as B,xt as C,Sa as D,Ca as E,an as M,ca as N,sn as O,pn as P,_a as R,At as S,Ue as Y,D as _,dn as a,q as b,kn as c,Ta as d,Ea as e,ln as f,hn as g,ht as h,r as j,We as o,Na as p,R as s,Aa as u};
