import { Helmet } from "react-helmet-async";
import { SITE_URL } from "../../lib/seoRoutes";

/**
 * Métadonnées par route : title/description/canonical/OG/Twitter/hreflang + JSON-LD optionnel.
 * Centralise toute la couche SEO côté SPA pour rester cohérent avec l'index.html racine.
 */
export function SeoHead({
  title,
  description,
  canonicalPath,
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  keywords,
  ogType = "website",
  ogImage = `${SITE_URL.replace(/\/$/, "")}/og-image.svg`,
  ogImageAlt,
  ogImageType,
  jsonLd = [],
  noindex = false,
}) {
  const canonical = `${SITE_URL}${canonicalPath?.startsWith("/") ? canonicalPath : `/${canonicalPath || ""}`}`.replace(
    /([^:]\/)\/+/g,
    "$1"
  );
  const robotsFinal = noindex ? "noindex, nofollow" : robots;

  const ldNodes = Array.isArray(jsonLd) ? jsonLd.filter(Boolean) : jsonLd ? [jsonLd] : [];
  const imgAlt = ogImageAlt || title || "Yorix CM — Marketplace #1 au Cameroun";
  const imgType =
    ogImageType ||
    (ogImage.endsWith(".svg")
      ? "image/svg+xml"
      : ogImage.endsWith(".png")
        ? "image/png"
        : ogImage.endsWith(".webp")
          ? "image/webp"
          : "image/jpeg");

  return (
    <Helmet>
      <html lang="fr-CM" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsFinal} />
      <meta name="googlebot" content={robotsFinal} />
      <link rel="canonical" href={canonical} />

      <link rel="alternate" hrefLang="fr-CM" href={canonical} />
      <link rel="alternate" hrefLang="fr" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Yorix CM" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:type" content={imgType} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imgAlt} />
      <meta property="og:locale" content="fr_CM" />
      <meta property="og:locale:alternate" content="fr_FR" />
      <meta property="og:locale:alternate" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@yorixcm" />
      <meta name="twitter:creator" content="@yorixcm" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={imgAlt} />

      {ldNodes.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: typeof schema === "string" ? schema : JSON.stringify(schema),
          }}
        />
      ))}
    </Helmet>
  );
}
