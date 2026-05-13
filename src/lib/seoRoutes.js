/**
 * Yorix.cm — Routage SEO (chemins indexables, slugs, parsing URL ↔ état d’app)
 * Commentaire : une seule source de vérité pour les paths marketing / Google.
 */

const DEFAULT_SITE_URL = "https://www.yorix.cm";

/** URL publique du site (canonical, OG, liens). Surcharge : `VITE_PUBLIC_SITE_URL`. */
export const SITE_URL = (() => {
  try {
    const raw =
      typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_PUBLIC_SITE_URL;
    const s = String(raw || "").trim().replace(/\/$/, "");
    return s || DEFAULT_SITE_URL;
  } catch {
    return DEFAULT_SITE_URL;
  }
})();

/** Villes Cameroun — slug ASCII → libellé affiché (SEO local scalable) */
export const SEO_CITIES = [
  { slug: "yaounde", name: "Yaoundé", region: "Centre" },
  { slug: "douala", name: "Douala", region: "Littoral" },
  { slug: "bafoussam", name: "Bafoussam", region: "Ouest" },
  { slug: "bamenda", name: "Bamenda", region: "Nord-Ouest" },
  { slug: "kribi", name: "Kribi", region: "Sud" },
  { slug: "bertoua", name: "Bertoua", region: "Est" },
  { slug: "garoua", name: "Garoua", region: "Nord" },
  { slug: "ngaoundere", name: "Ngaoundéré", region: "Adamaoua" },
  { slug: "maroua", name: "Maroua", region: "Extrême-Nord" },
  { slug: "ebolowa", name: "Ebolowa", region: "Sud" },
];

export const CITY_BY_SLUG = Object.fromEntries(SEO_CITIES.map((c) => [c.slug, c]));

export const NAME_TO_CITY_SLUG = Object.fromEntries(
  SEO_CITIES.map((c) => [c.name.toLowerCase(), c.slug])
);

/** Métier (slug URL) → catégorie PrestPage / filtres */
export const METIER_SLUG_TO_CATEGORY = {
  plomberie: "Plomberie",
  electricite: "Électricité",
  menage: "Nettoyage",
  beaute: "Beauté",
  reparation: "Réparation",
  transport: "Transport",
  graphisme: "Graphisme",
  photographie: "Photographie",
  nettoyage: "Nettoyage",
  menuiserie: "Menuiserie",
  informatique: "Informatique",
  cuisine: "Cuisine",
  maconnerie: "Maçonnerie",
  peinture: "Peinture",
  couture: "Couture",
};

/** Slugs historiques (ex. typo dans l’URL) → libellé actuel dans CATS */
export const CATEGORY_SLUG_LEGACY = {
  "mode-accesoires": "Mode & Accessoires",
};

export function categoryToSlug(cat) {
  return slugify(cat || "");
}

export function slugify(str) {
  if (!str) return "yorix";
  const s = String(str)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ø/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return (s || "yorix").slice(0, 80);
}

/** Slug produit / prestataire : base--id (id peut être uuid ou p1, real-uuid…) */
export function buildEntitySlug(name, id) {
  const base = slugify(name);
  return `${base}--${id}`;
}

export function parseEntitySlug(segment) {
  if (!segment || typeof segment !== "string") return { base: "", id: "" };
  const idx = segment.lastIndexOf("--");
  if (idx === -1) return { base: segment, id: "" };
  return { base: segment.slice(0, idx), id: segment.slice(idx + 2) };
}

/** Pages internes → chemin canonical */
export const PAGE_PATH = {
  home: "/",
  produits: "/produits",
  livraison: "/livraison",
  escrow: "/escrow",
  prestataires: "/prestataires",
  inscription: "/devenir-prestataire",
  business: "/business",
  academy: "/academy",
  blog: "/blog",
  loyalty: "/fidelite",
  contact: "/contact",
  aide: "/aide",
  faq: "/faq",
  cgv: "/cgv",
  mentions: "/mentions-legales",
  confidentialite: "/politique-confidentialite",
  dashboard: "/dashboard",
  admin: "/admin",
  checkout: "/checkout",
  cart: "/panier",
  bonsPlans: "/bons-plans",
  notifications: "/notifications",
  devenirVendeur: "/devenir-vendeur",
  devenirLivreur: "/devenir-livreur",
};

export function pathForPage(page, opts = {}) {
  if (page === "productDetail" && opts.productSlug) {
    return `/produit/${opts.productSlug}`;
  }
  if (page === "prestDetail" && opts.prestSlug) {
    return `/prestataire/${opts.prestSlug}`;
  }
  if (page === "produits" && opts.categorySlug) {
    return `/categories/${opts.categorySlug}`;
  }
  if (page === "livraison" && opts.citySlug && CITY_BY_SLUG[opts.citySlug]) {
    return `/livraison/${opts.citySlug}`;
  }
  if (page === "prestataires" && opts.metierSlug && opts.villeSlug) {
    return `/prestataires/${opts.metierSlug}/${opts.villeSlug}`;
  }
  if (page === "seoCity") {
    const { citySlug, mode = "hub" } = opts;
    if (!citySlug || !CITY_BY_SLUG[citySlug]) return "/";
    if (mode === "acheter") return `/acheter-a-${citySlug}`;
    if (mode === "livraison") return `/livraison-a-${citySlug}`;
    if (mode === "prestataires") return `/prestataires-a-${citySlug}`;
    return `/${citySlug}`;
  }
  if (page === "academyDetail" && opts.courseId) {
    return `/academy/${opts.courseId}`;
  }
  if (page === "academyContact" && opts.courseId) {
    return `/academy/${opts.courseId}/contact`;
  }
  return PAGE_PATH[page] ?? "/";
}

/** Retrouve le libellé catégorie produit depuis l’URL /categories/:slug */
export function slugToCategoryName(slug, categories = []) {
  if (!slug) return "";
  const legacyName = CATEGORY_SLUG_LEGACY[slug];
  if (legacyName && categories.includes(legacyName)) return legacyName;
  const hit = categories.find((c) => categoryToSlug(c) === slug);
  return hit || "";
}

/**
 * pathname → état SPA (page + options SEO)
 */
export function parsePathname(pathname) {
  const raw = pathname.replace(/\/+$/, "") || "/";
  if (raw === "/") {
    return { page: "home", canonicalPath: "/" };
  }

  const parts = raw.split("/").filter(Boolean);
  const [a, b, c] = parts;

  if (a === "produit" && b) {
    return { page: "productDetail", productSlug: b, canonicalPath: raw };
  }
  if (a === "categories" && b) {
    return { page: "produits", categorySlug: b, canonicalPath: raw };
  }
  if (a === "livraison") {
    if (!b) return { page: "livraison", canonicalPath: "/livraison" };
    if (CITY_BY_SLUG[b]) {
      return { page: "livraison", citySlug: b, canonicalPath: raw };
    }
    return { page: "livraison", canonicalPath: "/livraison" };
  }
  if (a === "prestataire" && b) {
    return { page: "prestDetail", prestSlug: b, canonicalPath: raw };
  }
  if (a === "prestataires" && b && c) {
    if (METIER_SLUG_TO_CATEGORY[b] && CITY_BY_SLUG[c]) {
      return {
        page: "prestataires",
        metierSlug: b,
        villeSlug: c,
        canonicalPath: raw,
      };
    }
  }
  if (a === "prestataires") {
    return { page: "prestataires", canonicalPath: "/prestataires" };
  }

  if (a === "academy" && b) {
    if (c === "contact") {
      return { page: "academyContact", courseId: b, canonicalPath: raw };
    }
    return { page: "academyDetail", courseId: b, canonicalPath: raw };
  }

  const hubMatch = CITY_BY_SLUG[a];
  if (parts.length === 1 && hubMatch) {
    return { page: "seoCity", citySlug: a, cityMode: "hub", canonicalPath: raw };
  }

  if (a?.startsWith("acheter-a-")) {
    const slug = a.replace(/^acheter-a-/, "");
    if (CITY_BY_SLUG[slug]) {
      return { page: "seoCity", citySlug: slug, cityMode: "acheter", canonicalPath: raw };
    }
  }
  if (a?.startsWith("livraison-a-")) {
    const slug = a.replace(/^livraison-a-/, "");
    if (CITY_BY_SLUG[slug]) {
      return { page: "seoCity", citySlug: slug, cityMode: "livraison", canonicalPath: raw };
    }
  }
  if (a?.startsWith("prestataires-a-")) {
    const slug = a.replace(/^prestataires-a-/, "");
    if (CITY_BY_SLUG[slug]) {
      return { page: "seoCity", citySlug: slug, cityMode: "prestataires", canonicalPath: raw };
    }
  }

  const staticMap = {
    produits: "produits",
    livraison: "livraison",
    escrow: "escrow",
    prestataires: "prestataires",
    business: "business",
    academy: "academy",
    blog: "blog",
    fidelite: "loyalty",
    contact: "contact",
    aide: "aide",
    faq: "faq",
    cgv: "cgv",
    mentions: "mentions",
    "mentions-legales": "mentions",
    confidentialite: "confidentialite",
    "politique-confidentialite": "confidentialite",
    dashboard: "dashboard",
    admin: "admin",
    checkout: "checkout",
    panier: "cart",
    cart: "cart",
    "bons-plans": "bonsPlans",
    notifications: "notifications",
    "devenir-vendeur": "devenirVendeur",
    "devenir-livreur": "devenirLivreur",
    "devenir-prestataire": "inscription",
    inscription: "inscription",
  };

  if (parts.length === 1 && staticMap[a]) {
    const pg = staticMap[a];
    return { page: pg, canonicalPath: PAGE_PATH[pg] ?? `/${a}` };
  }

  return { page: "home", canonicalPath: "/" };
}

export function getSearchActionUrl() {
  return `${SITE_URL}/produits`;
}
