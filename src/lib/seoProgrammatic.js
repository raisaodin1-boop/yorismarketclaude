/**
 * Hubs SEO Cameroun — chemins canoniques, métas et articles blog programmables.
 * Source unique pour parsing (via seoRoutes), sitemap (generate-sitemap) et Helmet (YorixApp).
 */

/** @typedef {{ page: string, pathBare: string, lang: "fr"|"en", title: string, description: string, keywords?: string, citySlug?: string, cityMode?: string }} SeoAliasResolved */

/** Paires FR↔EN pour hreflang (slug URL segment unique) */
const HREFLANG_SLUG_PAIRS = [
  ["marketplace-cameroun", "cameroon-marketplace"],
  ["achat-en-ligne-cameroun", "buy-online-cameroon"],
  ["services-cameroun", "services-cameroon"],
  ["immobilier-cameroun", "properties-cameroon"],
  ["ecommerce-cameroun", "online-shopping-cameroon"],
  ["livraison-cameroun", "delivery-cameroon"],
  ["vendre-en-ligne-cameroun", "sell-online-cameroon"],
];

const HREFLANG_SLUG_MAP = Object.fromEntries(
  HREFLANG_SLUG_PAIRS.flatMap(([a, b]) => [
    [a, b],
    [b, a],
  ]),
);

/** Twin slug pour équivalent lingua (routes hub une-segment uniquement) */
export function slugHreflangTwin(seg) {
  return HREFLANG_SLUG_MAP[seg] ?? null;
}

/**
 * Alias d’URL une-segment : pathBare sans /fr ou /en (cf. seoRoutes.localePath).
 * canonicalPath ABSOLUTE = seoRoutes.localePath(alias.lang, alias.pathBare)
 */
export const SEO_URL_ALIASES = {
  "marketplace-cameroun": {
    lang: "fr",
    page: "home",
    pathBare: "/marketplace-cameroun",
    title: "Yorix.cm | Marketplace Cameroun – Achat, Vente, Livraison & Petites annonces",
    description:
      "La marketplace camerounaise Yorix.cm : achat en ligne, vente entre particuliers et pros, petites annonces vérifiées, livraison rapide et services partout au Cameroun (Douala, Yaoundé…).",
    keywords:
      "marketplace Cameroun, petites annonces Cameroun, achat en ligne Cameroun, vente en ligne Cameroun, e-commerce Cameroun",
  },
  "cameroon-marketplace": {
    lang: "en",
    page: "home",
    pathBare: "/cameroon-marketplace",
    title: "Yorix.cm | Cameroon Marketplace — Shop, Sell, Delivery",
    description:
      "Cameroon-focused marketplace Yorix.cm: verified listings, nationwide delivery mindset, Mobile Money payouts, escrow for safer trades across Douala, Yaoundé and beyond.",
    keywords:
      "Cameroon marketplace, online shopping Cameroon, buy online Cameroon, e-commerce Cameroon, Yorix",
  },
  "achat-en-ligne-cameroun": {
    lang: "fr",
    page: "produits",
    pathBare: "/achat-en-ligne-cameroun",
    title: "Achat en ligne Cameroun | Catalogue marketplace & paiement Mobile Money | Yorix.cm",
    description:
      "Achat en ligne au Cameroun sur Yorix.cm : catalogue produits, paiement MoMo/Orange Money, escrow et livraison.",
    keywords: "achat en ligne Cameroun, ecommerce Cameroun, marketplace Douala Yaoundé, paiement Mobile Money",
  },
  "buy-online-cameroon": {
    lang: "en",
    page: "produits",
    pathBare: "/buy-online-cameroon",
    title: "Buy online in Cameroon | Yorix.cm marketplace catalog",
    description:
      "Shop online in Cameroon on Yorix.cm: product catalog, Mobile Money payments, buyer protection and delivery options.",
    keywords: "buy online Cameroon, Cameroon ecommerce, Mobile Money shopping, Yorix",
  },
  "services-cameroun": {
    lang: "fr",
    page: "prestataires",
    pathBare: "/services-cameroun",
    title: "Services au Cameroun | Prestataires & réservations | Yorix.cm",
    description:
      "Trouvez des services vérifiés au Cameroun : plomberie, beauté, IT, réparation, formation — réservation sur Yorix.cm.",
    keywords: "services Cameroun, prestataires Douala, prestataires Yaoundé, marketplace services",
  },
  "services-cameroon": {
    lang: "en",
    page: "prestataires",
    pathBare: "/services-cameroon",
    title: "Services in Cameroon | Providers & bookings | Yorix.cm",
    description:
      "Book trusted local services in Cameroon: plumbing, beauty, IT, repairs, training — via Yorix.cm.",
    keywords: "services Cameroon, local providers, Douala services, Yaoundé services, Yorix",
  },
  "immobilier-cameroun": {
    lang: "fr",
    page: "business",
    pathBare: "/immobilier-cameroun",
    title: "Immobilier Cameroun | Offres, professionnels & visibilité | Yorix.cm",
    description:
      "Hub immobilier Cameroun sur Yorix.cm : annonces, professionnels de l’habitat et solutions business pour la visibilité locale.",
    keywords: "immobilier Cameroun, terrain maison appartement, annonces immo Douala Yaoundé",
  },
  "properties-cameroon": {
    lang: "en",
    page: "business",
    pathBare: "/properties-cameroon",
    title: "Real estate in Cameroon | Listings hub | Yorix.cm",
    description:
      "Cameroon property hub on Yorix.cm: verified professionals, visibility programs and curated housing supply over time.",
    keywords: "real estate Cameroon, property Cameroon, Douala Yaoundé housing, Yorix",
  },
  "ecommerce-cameroun": {
    lang: "fr",
    page: "produits",
    pathBare: "/ecommerce-cameroun",
    title: "E-commerce Cameroun | Boutique en ligne & catalogue produits | Yorix.cm",
    description:
      "E-commerce au Cameroun sur Yorix.cm : catalogue produits locaux et importés, paiement MTN MoMo & Orange Money, livraison nationale.",
    keywords:
      "ecommerce Cameroun, e-commerce Cameroun, boutique en ligne Cameroun, marketplace en ligne Cameroun",
  },
  "online-shopping-cameroon": {
    lang: "en",
    page: "produits",
    pathBare: "/online-shopping-cameroon",
    title: "E-commerce Cameroon | Online storefront & catalog | Yorix.cm",
    description:
      "Shop Cameroon catalogs on Yorix.cm : local vendors, imports, Mobile Money checkout and escrow.",
    keywords: "online shopping Cameroon, ecommerce Cameroon, Yorix marketplace",
  },
  "livraison-cameroun": {
    lang: "fr",
    page: "livraison",
    pathBare: "/livraison-cameroun",
    title: "Livraison Cameroun — colis, courses & Yorix Ride | Douala, Yaoundé",
    description:
      "Livraison au Cameroun avec Yorix Ride : suivi, tarifs clairs, couverture Douala, Yaoundé, Bafoussam et extension nationale.",
    keywords: "livraison Cameroun, livreur Cameroun, livraison Douala, livraison Yaoundé, Yorix Ride",
  },
  "delivery-cameroon": {
    lang: "en",
    page: "livraison",
    pathBare: "/delivery-cameroon",
    title: "Delivery in Cameroon | Parcels & Yorix Ride | Douala, Yaoundé",
    description:
      "Nationwide-focused delivery UX on Yorix.cm : transparent fees, courier network growth and intra-city reliability.",
    keywords: "delivery Cameroon, courier Douala, shipping Yaoundé, Yorix Ride",
  },
  "vendre-en-ligne-cameroun": {
    lang: "fr",
    page: "devenirVendeur",
    pathBare: "/vendre-en-ligne-cameroun",
    title: "Vendre en ligne au Cameroun | Vendeur marketplace Yorix.cm",
    description:
      "Vendez en ligne depuis le Cameroun : boutique Yorix, visibilité nationale, paiements mobile money et outils vendeur.",
    keywords: "vendre en ligne Cameroun, devenir vendeur marketplace, vendeur en ligne Cameroun",
  },
  "sell-online-cameroon": {
    lang: "en",
    page: "devenirVendeur",
    pathBare: "/sell-online-cameroon",
    title: "Sell online from Cameroon | Yorix seller hub",
    description:
      "Launch your Cameroon storefront with Yorix : national reach, escrow tools and MoMo-compatible flows.",
    keywords: "sell online Cameroon, become seller, Yorix vendor",
  },
  "achat-en-ligne-douala": {
    lang: "fr",
    page: "seoCity",
    citySlug: "douala",
    cityMode: "acheter",
    pathBare: "/achat-en-ligne-douala",
    title: "Marketplace Douala — Achat en ligne & livraison | Yorix.cm",
    description:
      "Marketplace Douala sur Yorix.cm : achetez en ligne, livraison locale, paiement MoMo/Orange Money, escrow et vendeurs vérifiés.",
    keywords: "marketplace Douala, achat en ligne Douala, ecommerce Douala, livraison Douala",
  },
  "achat-en-ligne-yaounde": {
    lang: "fr",
    page: "seoCity",
    citySlug: "yaounde",
    cityMode: "acheter",
    pathBare: "/achat-en-ligne-yaounde",
    title: "Marketplace Yaoundé — Achat en ligne & livraison | Yorix.cm",
    description:
      "Marketplace Yaoundé : produits et services avec livraison, marketplace camerounaise Yorix.cm et paiements sécurisés.",
    keywords: "marketplace Yaoundé, achat en ligne Yaoundé, ecommerce Yaoundé, livraison Yaoundé",
  },
  "marketplace-douala": {
    lang: "fr",
    page: "seoCity",
    citySlug: "douala",
    cityMode: "hub",
    pathBare: "/marketplace-douala",
    title: "Marketplace Douala | Achat en ligne, livraison & services | Yorix.cm",
    description:
      "Yorix.cm à Douala : achetez en ligne, trouvez des prestataires, vendez vos produits et organisez vos livraisons avec paiement Mobile Money.",
    keywords: "marketplace Douala, achat en ligne Douala, livraison Douala, prestataires Douala, Yorix Douala",
  },
  "marketplace-yaounde": {
    lang: "fr",
    page: "seoCity",
    citySlug: "yaounde",
    cityMode: "hub",
    pathBare: "/marketplace-yaounde",
    title: "Marketplace Yaoundé | Produits, services & livraison | Yorix.cm",
    description:
      "Yorix.cm à Yaoundé : catalogue produits, prestataires locaux, livraison, paiement MTN MoMo/Orange Money et support WhatsApp.",
    keywords: "marketplace Yaoundé, achat en ligne Yaoundé, livraison Yaoundé, prestataires Yaoundé",
  },
  "livraison-douala": {
    lang: "fr",
    page: "seoCity",
    citySlug: "douala",
    cityMode: "livraison",
    pathBare: "/livraison-douala",
    title: "Livraison Douala | Colis, courses & marketplace | Yorix Ride",
    description:
      "Service de livraison à Douala avec Yorix Ride : colis, courses, commandes marketplace, suivi et support WhatsApp.",
    keywords: "livraison Douala, livreur Douala, colis Douala, livraison Akwa, livraison Bonamoussadi",
  },
  "livraison-yaounde": {
    lang: "fr",
    page: "seoCity",
    citySlug: "yaounde",
    cityMode: "livraison",
    pathBare: "/livraison-yaounde",
    title: "Livraison Yaoundé | Colis, courses & Yorix Ride",
    description:
      "Livraison à Yaoundé avec Yorix Ride : colis, courses, commandes e-commerce, suivi et support WhatsApp.",
    keywords: "livraison Yaoundé, livreur Yaoundé, colis Yaoundé, livraison Bastos, livraison Mvan",
  },
  "prestataires-douala": {
    lang: "fr",
    page: "seoCity",
    citySlug: "douala",
    cityMode: "prestataires",
    pathBare: "/prestataires-douala",
    title: "Prestataires Douala | Services à domicile vérifiés | Yorix.cm",
    description:
      "Trouvez des prestataires à Douala : beauté, plomberie, électricité, nettoyage, IT, BTP et services à domicile via Yorix.cm.",
    keywords: "prestataires Douala, services à domicile Douala, plombier Douala, coiffeuse Douala",
  },
  "prestataires-yaounde": {
    lang: "fr",
    page: "seoCity",
    citySlug: "yaounde",
    cityMode: "prestataires",
    pathBare: "/prestataires-yaounde",
    title: "Prestataires Yaoundé | Services locaux & à domicile | Yorix.cm",
    description:
      "Réservez des prestataires à Yaoundé : beauté, réparation, informatique, nettoyage, BTP et services à domicile sur Yorix.cm.",
    keywords: "prestataires Yaoundé, services à domicile Yaoundé, plombier Yaoundé, coiffeuse Yaoundé",
  },
  "paiement-mobile-money-cameroun": {
    lang: "fr",
    page: "escrow",
    pathBare: "/paiement-mobile-money-cameroun",
    title: "Paiement Mobile Money Cameroun | MTN MoMo, Orange Money & escrow | Yorix.cm",
    description:
      "Yorix.cm facilite les achats au Cameroun avec MTN MoMo, Orange Money, cash, carte et protection escrow pour sécuriser les transactions.",
    keywords: "paiement Mobile Money Cameroun, MTN MoMo Cameroun, Orange Money Cameroun, escrow Cameroun",
  },
  "acheter-telephone-cameroun": {
    lang: "fr",
    page: "produits",
    pathBare: "/acheter-telephone-cameroun",
    title: "Acheter téléphone au Cameroun | Smartphones & high-tech | Yorix.cm",
    description:
      "Achetez téléphones, smartphones et accessoires high-tech au Cameroun sur Yorix.cm avec vendeurs locaux, paiement Mobile Money et livraison.",
    keywords: "acheter téléphone Cameroun, smartphone Cameroun, high-tech Cameroun, téléphone Douala, téléphone Yaoundé",
  },
};

/** Chemins complets hubs programmatics pour sitemap (préfixes /fr /en appliqués côté script) */
export const PROGRAMMATIC_SITEMAP_PATHS = Object.values(SEO_URL_ALIASES).map(
  (a) => `/${a.lang}${a.pathBare}`,
);

export function seoAliasLocalesForSitemap() {
  return Object.values(SEO_URL_ALIASES).map((a) => ({ lang: a.lang, pathBare: a.pathBare }));
}

/** Articles guides — contenu éditorial + FAQ schema */
export const SEO_BLOG_ARTICLES = {
  "top-sites-ecommerce-cameroun": {
    title: "Top sites e-commerce & marketplace au Cameroun (2026) — Yorix.cm",
    description:
      "Panorama des places de marché en ligne au Cameroun : généralistes, livraison, paiement mobile money. Pourquoi Yorix.cm se distingue.",
    datePublished: "2026-01-15",
    keywords: "ecommerce Cameroun, marketplace Cameroun, Jumia, achat en ligne Cameroun, Yorix",
    headline: "E-commerce au Cameroun : quelles plateformes choisir ?",
    sections: [
      {
        h2: "Le marché de l’achat en ligne au Cameroun",
        p: "Le Cameroun compte plusieurs acteurs : marketplaces généralistes, annonces entre particuliers et réseaux sociaux. Les acheteurs attendent surtout la confiance (livraison, litiges), le paiement MoMo/Orange Money et la rapidité.",
      },
      {
        h2: "Yorix.cm : marketplace locale, livraison et services",
        p: "Yorix.cm regroupe produits, prestataires et livraison (Yorix Ride) avec escrow pour sécuriser les transactions. L’expérience est pensée pour le mobile et les usages camerounais.",
      },
      {
        h2: "Comment comparer les plateformes ?",
        p: "Regardez les frais vendeur, les délais de livraison, la couverture géographique (Douala, Yaoundé, villes secondaires) et la qualité du support client.",
      },
    ],
    faq: [
      {
        q: "Quelle est la meilleure marketplace au Cameroun ?",
        a: "Cela dépend du besoin : catalogue large, livraison fiable et paiement local sont les critères clés. Yorix.cm cible l’écosystème complet produits + services + livraison.",
      },
      {
        q: "Yorix accepte-t-il MTN MoMo et Orange Money ?",
        a: "Oui, les flux de paiement mobile money sont au cœur du parcours d’achat sur Yorix.cm.",
      },
    ],
  },
  "comment-vendre-en-ligne-cameroun": {
    title: "Comment vendre en ligne au Cameroun — guide vendeur | Yorix.cm",
    description:
      "Étapes pour vendre en ligne au Cameroun : compte vendeur, photos, prix FCFA, livraison et encaissement MoMo. Guide pratique Yorix.",
    datePublished: "2026-02-01",
    keywords: "vendre en ligne Cameroun, vendeur marketplace, boutique en ligne Cameroun, Yorix vendeur",
    headline: "Vendre en ligne au Cameroun : le guide étape par étape",
    sections: [
      {
        h2: "Pourquoi vendre via une marketplace ?",
        p: "Une marketplace comme Yorix.cm vous apporte trafic, mécanisme d’escrow et visibilité sans monter une boutique technique seul.",
      },
      {
        h2: "Créez une fiche produit qui convertit",
        p: "Photos nettes, description honnête, prix en FCFA, stock réaliste et politique de livraison claire augmentent les commandes.",
      },
      {
        h2: "Paiements et livraison",
        p: "Proposez le retrait ou la livraison via le réseau Yorix Ride selon vos zones. Répondez vite aux messages pour la note client.",
      },
    ],
    faq: [
      {
        q: "Faut-il un statut entreprise pour vendre sur Yorix ?",
        a: "Les conditions dépendent de votre statut ; l’inscription vendeur guide les étapes. Contactez le support pour les profils pros.",
      },
      {
        q: "Comment fixer ses prix ?",
        a: "Intégrez coût d’achat, frais de livraison éventuels et commission plateforme pour rester compétitif tout en gardant une marge.",
      },
    ],
  },
  "livraison-douala-guide": {
    title: "Livraison à Douala — guide pratique colis & marketplace | Yorix.cm",
    description:
      "Tout savoir sur la livraison à Douala : délais, quartiers, suivi commande marketplace et livreurs Yorix Ride.",
    datePublished: "2026-02-18",
    keywords: "livraison Douala, colis Douala, Yorix Ride Douala, marketplace Douala livraison",
    headline: "Livraison à Douala : ce que les acheteurs et vendeurs doivent savoir",
    sections: [
      {
        h2: "La logistique urbaine à Douala",
        p: "Les livraisons intra-ville restent plus rapides que l’inter-villes ; prévoir les heures creuses et une adresse avec repères précis.",
      },
      {
        h2: "Suivi avec Yorix Ride",
        p: "Depuis votre commande marketplace, vous suivez l’état de la livraison et pouvez joindre le support en cas de blocage.",
      },
      {
        h2: "Conseils anti-litige",
        p: "Vérifiez le colis à réception avant de libérer l’escrow ; en cas de dommage, ouvrez une demande support avec photos.",
      },
    ],
    faq: [
      {
        q: "Combien de temps pour une livraison à Douala ?",
        a: "Les délais varient selon le vendeur et le créneau ; une estimation est affichée avant validation lorsque disponible.",
      },
      {
        q: "Livrez-vous en dehors de Douala ?",
        a: "Yorix étend progressivement son réseau ; consultez les options à la caisse ou sur la page livraison Cameroun.",
      },
    ],
  },
};

export const SEO_BLOG_SLUGS = Object.keys(SEO_BLOG_ARTICLES);

/** Chemins guide pour sitemap (sans préfixe langue — combinés en /fr/blog/… et /en/blog/…) */
export function getBlogGuidePaths() {
  return SEO_BLOG_SLUGS.map((slug) => `/blog/${slug}`);
}

export function getBlogArticle(slug) {
  if (!slug || !SEO_BLOG_ARTICLES[slug]) return null;
  return { slug, ...SEO_BLOG_ARTICLES[slug] };
}

export function resolveSeoLandingFromPath(segment) {
  return SEO_URL_ALIASES[segment] || null;
}
