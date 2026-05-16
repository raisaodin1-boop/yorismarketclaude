import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import {
  PAGE_PATH,
  SEO_CITIES,
  categoryToSlug,
  localePath,
} from "../src/lib/seoRoutes.js";
import { CATS } from "../src/lib/constants.js";
import { MERCH_HUBS, MERCH_HUB_SLUGS } from "../src/lib/merchHubs.js";
import {
  SEO_BLOG_ARTICLES,
  SEO_URL_ALIASES,
  getBlogGuidePaths,
} from "../src/lib/seoProgrammatic.js";

const DIST_DIR = join(process.cwd(), "dist");
const SITE_URL = "https://www.yorix.cm";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.svg`;

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function absoluteUrl(pathname) {
  const path = pathname && pathname.startsWith("/") ? pathname : `/${pathname || ""}`;
  return `${SITE_URL}${path}`.replace(/([^:]\/)\/+/g, "$1");
}

function replaceMeta(html, selector, replacement) {
  return html.replace(selector, replacement);
}

function injectStaticSeo(html, route) {
  const canonical = absoluteUrl(route.path);
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const keywords = escapeHtml(route.keywords || "");
  const locale = route.locale === "en" ? "en" : "fr";
  const lang = locale === "en" ? "en-CM" : "fr-CM";
  const ogLocale = locale === "en" ? "en_US" : "fr_CM";
  const alternateLocale = locale === "en" ? "fr_CM" : "en_US";
  const schema = JSON.stringify(route.schema || defaultSchema(route, canonical));

  let out = html.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`);
  out = replaceMeta(out, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  out = replaceMeta(
    out,
    /<meta name="description" content="[^"]*"\s*\/>/,
    `<meta name="description" content="${description}" />`,
  );
  out = replaceMeta(
    out,
    /<meta name="keywords" content="[^"]*"\s*\/>/,
    `<meta name="keywords" content="${keywords}" />`,
  );
  out = replaceMeta(out, /<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`);
  out = replaceMeta(out, /<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${title}" />`);
  out = replaceMeta(
    out,
    /<meta property="og:description" content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${description}" />`,
  );
  out = replaceMeta(out, /<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`);
  out = replaceMeta(out, /<meta property="og:locale" content="[^"]*"\s*\/>/, `<meta property="og:locale" content="${ogLocale}" />`);
  out = replaceMeta(
    out,
    /<meta property="og:locale:alternate" content="[^"]*"\s*\/>/,
    `<meta property="og:locale:alternate" content="${alternateLocale}" />`,
  );
  out = replaceMeta(out, /<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${title}" />`);
  out = replaceMeta(
    out,
    /<meta name="twitter:description" content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${description}" />`,
  );

  out = out.replace(
    "</head>",
    `    <script type="application/ld+json" data-seo-snapshot="true">${schema}</script>\n  </head>`,
  );

  return out;
}

function defaultSchema(route, canonical) {
  const base = {
    "@context": "https://schema.org",
    "@type": route.schemaType || "WebPage",
    name: route.title,
    description: route.description,
    url: canonical,
    inLanguage: route.locale === "en" ? "en-CM" : "fr-CM",
    isPartOf: {
      "@type": "WebSite",
      name: "Yorix.cm",
      url: SITE_URL,
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}${localePath(route.locale || "fr", "/produits")}?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Yorix CM",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+237696565654",
        contactType: "customer service",
        areaServed: "CM",
        availableLanguage: ["French", "English"],
      },
    },
    primaryImageOfPage: DEFAULT_IMAGE,
  };

  if (route.faq?.length) {
    return [
      base,
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: route.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ];
  }

  return base;
}

function writeRoute(template, route) {
  const normalized = route.path.replace(/\/+$/, "") || "/";
  const segments = normalized.split("/").filter(Boolean);
  const targetDir = segments.length ? join(DIST_DIR, ...segments) : DIST_DIR;
  const targetPath = join(targetDir, "index.html");
  const htmlPath = segments.length ? join(DIST_DIR, `${segments.join("/")}.html`) : join(DIST_DIR, "index.html");
  const html = injectStaticSeo(template, route);

  mkdirSync(dirname(targetPath), { recursive: true });
  writeFileSync(targetPath, html);

  if (htmlPath !== targetPath) {
    mkdirSync(dirname(htmlPath), { recursive: true });
    writeFileSync(htmlPath, html);
  }
}

function route(locale, bare, title, description, keywords, extras = {}) {
  return {
    locale,
    path: localePath(locale, bare),
    title,
    description,
    keywords,
    ...extras,
  };
}

const homeFaq = [
  {
    q: "Quel site pour acheter en ligne au Cameroun ?",
    a: "Yorix.cm permet d'acheter des produits, réserver des services et organiser une livraison avec paiement MTN MoMo, Orange Money, cash ou carte selon les options disponibles.",
  },
  {
    q: "Yorix livre dans quelles villes ?",
    a: "Yorix couvre en priorité Douala, Yaoundé, Bafoussam, Bamenda, Kribi et d'autres villes camerounaises selon les vendeurs et livreurs disponibles.",
  },
  {
    q: "Comment vendre rapidement sur Yorix.cm ?",
    a: "Créez un compte vendeur, publiez vos produits avec photos et prix en FCFA, puis utilisez le tableau de bord Yorix pour suivre demandes, commandes et paiements.",
  },
];

function staticPageRoutes() {
  const routes = [
    route(
      "fr",
      "/",
      "Marketplace Cameroun | Achat en ligne, livraison & services | Yorix.cm",
      "Yorix.cm est la marketplace camerounaise pour acheter, vendre, se faire livrer et trouver des prestataires. Paiement MTN MoMo, Orange Money, escrow et support WhatsApp.",
      "marketplace Cameroun, achat en ligne Cameroun, e-commerce Cameroun, livraison Douala, livraison Yaoundé, vendre en ligne Cameroun, MTN MoMo, Orange Money",
      { schemaType: "OnlineStore", faq: homeFaq },
    ),
    route(
      "en",
      "/",
      "Cameroon Marketplace | Online shopping, delivery & services | Yorix.cm",
      "Yorix.cm helps Cameroon shoppers buy products, book services and arrange delivery with Mobile Money, escrow protection and WhatsApp support.",
      "Cameroon marketplace, online shopping Cameroon, delivery Cameroon, Mobile Money Cameroon",
      { schemaType: "OnlineStore" },
    ),
    route(
      "fr",
      PAGE_PATH.produits,
      "Achat en ligne Cameroun | Produits, MoMo & livraison | Yorix.cm",
      "Achetez en ligne au Cameroun sur Yorix.cm : téléphones, mode, beauté, alimentation, maison, produits locaux, paiement Mobile Money et livraison.",
      "achat en ligne Cameroun, acheter au Cameroun, produits Cameroun, marketplace produits, MoMo, Orange Money",
      { schemaType: "CollectionPage" },
    ),
    route(
      "fr",
      PAGE_PATH.livraison,
      "Livraison Cameroun | Colis, courses, Douala & Yaoundé | Yorix Ride",
      "Demandez une livraison au Cameroun avec Yorix Ride : colis, courses, marketplace, suivi, support WhatsApp et zones prioritaires Douala/Yaoundé.",
      "livraison Cameroun, livraison Douala, livraison Yaoundé, livreur Cameroun, Yorix Ride",
      { schemaType: "Service" },
    ),
    route(
      "fr",
      PAGE_PATH.prestataires,
      "Prestataires Cameroun | Services à domicile vérifiés | Yorix.cm",
      "Trouvez des prestataires au Cameroun : beauté, coiffure, plomberie, électricité, IT, nettoyage, BTP et services à domicile via Yorix.cm.",
      "prestataires Cameroun, services à domicile Cameroun, plombier Douala, coiffeuse Yaoundé, services Yorix",
      { schemaType: "CollectionPage" },
    ),
    route(
      "fr",
      PAGE_PATH.escrow,
      "Escrow Cameroun | Paiement sécurisé marketplace | Yorix.cm",
      "Avec l'escrow Yorix, le paiement reste protégé jusqu'à confirmation de réception. Achetez et vendez avec plus de confiance au Cameroun.",
      "escrow Cameroun, paiement sécurisé Cameroun, protection acheteur, marketplace sécurisée",
    ),
    route(
      "fr",
      PAGE_PATH.contact,
      "Contact Yorix Cameroun | WhatsApp support & aide commande",
      "Contactez Yorix.cm par WhatsApp au +237 696 56 56 54 ou par email support@yorix.cm pour achat, livraison, vendeur, escrow ou support.",
      "contact Yorix, support marketplace Cameroun, WhatsApp Yorix, aide commande Cameroun",
    ),
    route(
      "fr",
      PAGE_PATH.faq,
      "FAQ Yorix | Achat, livraison, paiement MoMo & escrow Cameroun",
      "Réponses rapides sur Yorix.cm : achat en ligne, livraison au Cameroun, paiement MTN MoMo et Orange Money, escrow, vendeurs et prestataires.",
      "FAQ Yorix, aide marketplace Cameroun, paiement MoMo, livraison Yorix",
      { faq: homeFaq },
    ),
  ];

  for (const [key, alias] of Object.entries(SEO_URL_ALIASES)) {
    routes.push(route(alias.lang, alias.pathBare, alias.title, alias.description, alias.keywords, {
      citySlug: alias.citySlug,
      aliasKey: key,
      schemaType: alias.page === "seoCity" ? "LocalBusiness" : "WebPage",
    }));
  }

  for (const city of SEO_CITIES) {
    routes.push(route(
      "fr",
      `/${city.slug}`,
      `Yorix ${city.name} | Marketplace, livraison & services au Cameroun`,
      `Achetez en ligne à ${city.name}, trouvez des prestataires et organisez vos livraisons avec Yorix.cm. Paiement Mobile Money et support WhatsApp.`,
      `Yorix ${city.name}, marketplace ${city.name}, livraison ${city.name}, achat en ligne ${city.name}`,
      { schemaType: "LocalBusiness" },
    ));
    routes.push(route(
      "fr",
      `/acheter-a-${city.slug}`,
      `Acheter en ligne à ${city.name} | Marketplace Yorix Cameroun`,
      `Achat en ligne à ${city.name} sur Yorix.cm : produits vérifiés, vendeurs locaux, paiement MTN MoMo/Orange Money et livraison.`,
      `acheter en ligne ${city.name}, marketplace ${city.name}, e-commerce ${city.name}`,
      { schemaType: "CollectionPage" },
    ));
    routes.push(route(
      "fr",
      `/livraison-a-${city.slug}`,
      `Livraison à ${city.name} | Colis & courses Yorix Ride`,
      `Service de livraison à ${city.name} : colis, courses, suivi et support WhatsApp avec Yorix Ride.`,
      `livraison ${city.name}, livreur ${city.name}, colis ${city.name}, Yorix Ride`,
      { schemaType: "Service" },
    ));
  }

  for (const cat of CATS) {
    routes.push(route(
      "fr",
      `/categories/${categoryToSlug(cat)}`,
      `${cat} Cameroun | Achat en ligne sur Yorix.cm`,
      `Découvrez la catégorie ${cat} sur Yorix.cm : produits au Cameroun, prix en FCFA, paiement Mobile Money et livraison selon disponibilité.`,
      `${cat} Cameroun, achat ${cat}, marketplace Cameroun, Yorix`,
      { schemaType: "CollectionPage" },
    ));
  }

  for (const slug of MERCH_HUB_SLUGS) {
    const hub = MERCH_HUBS[slug];
    routes.push(route(
      "fr",
      `/${slug}`,
      `${hub.titleFr} | Yorix.cm`,
      hub.descFr,
      hub.keywordsFr || "marketplace Cameroun, Yorix",
      { schemaType: "CollectionPage" },
    ));
  }

  for (const guidePath of getBlogGuidePaths()) {
    const slug = guidePath.split("/").pop();
    const art = SEO_BLOG_ARTICLES[slug];
    routes.push(route("fr", guidePath, art.title, art.description, art.keywords, {
      schemaType: "Article",
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: art.headline,
        description: art.description,
        datePublished: art.datePublished,
        author: { "@type": "Organization", name: "Yorix CM" },
        publisher: {
          "@type": "Organization",
          name: "Yorix CM",
          logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.svg` },
        },
        mainEntityOfPage: absoluteUrl(localePath("fr", guidePath)),
      },
    }));
  }

  return routes;
}

function main() {
  const templatePath = join(DIST_DIR, "index.html");
  if (!existsSync(templatePath)) {
    console.warn("SEO snapshots skipped: dist/index.html not found.");
    return;
  }
  const template = readFileSync(templatePath, "utf8");
  const routes = staticPageRoutes();
  for (const item of routes) writeRoute(template, item);
  console.log(`✅ SEO HTML snapshots — ${routes.length} routes`);
}

main();
