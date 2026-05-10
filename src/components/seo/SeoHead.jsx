import { Helmet } from "react-helmet-async";
import { SITE_URL } from "../../lib/seoRoutes";

/**
 * Métadonnées par route : title/description/canonical/OG/Twitter/hreflang + JSON-LD optionnel.
 */
export function SeoHead({
  title,
  description,
  canonicalPath,
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  keywords,
  ogType = "website",
  ogImage = "https://www.yorix.cm/og-image.jpg",
  jsonLd = [],
  noindex = false,
}) {
  const canonical = `${SITE_URL}${canonicalPath?.startsWith("/") ? canonicalPath : `/${canonicalPath || ""}`}`.replace(
    /([^:]\/)\/+/g,
    "$1"
  );
  const robotsFinal = noindex ? "noindex, nofollow" : robots;

  const ldNodes = Array.isArray(jsonLd) ? jsonLd.filter(Boolean) : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <html lang="fr" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsFinal} />
      <link rel="canonical" href={canonical} />

      <link rel="alternate" hrefLang="fr-CM" href={canonical} />
      <link rel="alternate" hrefLang="fr" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Yorix CM" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="fr_FR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

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
