/**
 * Hubs SEO Cameroun — chemins canoniques, métas et articles blog programmables.
 * Source unique pour parsing (via seoRoutes), sitemap (generate-sitemap) et Helmet (YorixApp).
 */

/** @typedef {{ page: string, canonicalPath: string, title: string, description: string, keywords?: string, citySlug?: string, cityMode?: string }} SeoAliasResolved */

/** Alias d’URL une-segment → même UI qu’une route existante + canonical dédié */
export const SEO_URL_ALIASES = {
  "marketplace-cameroun": {
    page: "home",
    canonicalPath: "/marketplace-cameroun",
    title: "Yorix.cm | Marketplace Cameroun – Achat, Vente, Livraison & Petites annonces",
    description:
      "La marketplace camerounaise Yorix.cm : achat en ligne, vente entre particuliers et pros, petites annonces vérifiées, livraison rapide et services partout au Cameroun (Douala, Yaoundé…).",
    keywords:
      "marketplace Cameroun, petites annonces Cameroun, achat en ligne Cameroun, vente en ligne Cameroun, e-commerce Cameroun",
  },
  "ecommerce-cameroun": {
    page: "produits",
    canonicalPath: "/ecommerce-cameroun",
    title: "E-commerce Cameroun | Boutique en ligne & catalogue produits | Yorix.cm",
    description:
      "E-commerce au Cameroun sur Yorix.cm : catalogue produits locaux et importés, paiement MTN MoMo & Orange Money, livraison nationale.",
    keywords:
      "ecommerce Cameroun, e-commerce Cameroun, boutique en ligne Cameroun, marketplace en ligne Cameroun",
  },
  "livraison-cameroun": {
    page: "livraison",
    canonicalPath: "/livraison-cameroun",
    title: "Livraison Cameroun — colis, courses & Yorix Ride | Douala, Yaoundé",
    description:
      "Livraison au Cameroun avec Yorix Ride : suivi, tarifs clairs, couverture Douala, Yaoundé, Bafoussam et extension nationale.",
    keywords: "livraison Cameroun, livreur Cameroun, livraison Douala, livraison Yaoundé, Yorix Ride",
  },
  "vendre-en-ligne-cameroun": {
    page: "devenirVendeur",
    canonicalPath: "/vendre-en-ligne-cameroun",
    title: "Vendre en ligne au Cameroun | Vendeur marketplace Yorix.cm",
    description:
      "Vendez en ligne depuis le Cameroun : boutique Yorix, visibilité nationale, paiements mobile money et outils vendeur.",
    keywords: "vendre en ligne Cameroun, devenir vendeur marketplace, vendeur en ligne Cameroun",
  },
  "achat-en-ligne-douala": {
    page: "seoCity",
    citySlug: "douala",
    cityMode: "acheter",
    canonicalPath: "/achat-en-ligne-douala",
    title: "Marketplace Douala — Achat en ligne & livraison | Yorix.cm",
    description:
      "Marketplace Douala sur Yorix.cm : achetez en ligne, livraison locale, paiement MoMo/Orange Money, escrow et vendeurs vérifiés.",
    keywords: "marketplace Douala, achat en ligne Douala, ecommerce Douala, livraison Douala",
  },
  "achat-en-ligne-yaounde": {
    page: "seoCity",
    citySlug: "yaounde",
    cityMode: "acheter",
    canonicalPath: "/achat-en-ligne-yaounde",
    title: "Marketplace Yaoundé — Achat en ligne & livraison | Yorix.cm",
    description:
      "Marketplace Yaoundé : produits et services avec livraison, marketplace camerounaise Yorix.cm et paiements sécurisés.",
    keywords: "marketplace Yaoundé, achat en ligne Yaoundé, ecommerce Yaoundé, livraison Yaoundé",
  },
};

export const PROGRAMMATIC_SITEMAP_PATHS = Object.values(SEO_URL_ALIASES).map((a) => a.canonicalPath);

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

/** Chemins guide pour sitemap */
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
