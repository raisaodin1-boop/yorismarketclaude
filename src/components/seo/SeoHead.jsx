import { Helmet } from "react-helmet-async";
import { SITE_URL } from "../../lib/seoRoutes";

/**
 * Métadonnées par route : title/description/canonical/OG/Twitter/hreflang + JSON-LD optionnel.
 * @param {object} props
 * @param {"fr"|"en"} [props.locale] — défaut fr
 * @param {{ hrefLang: string, href: string }[]} [props.hrefLangAlternates]
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
  locale = "fr",
  hrefLangAlternates,
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

  const htmlLang = locale === "en" ? "en-CM" : "fr-CM";
  const ogPrimary = locale === "en" ? "en_US" : "fr_CM";
  const ogAlt1 = locale === "en" ? "fr_CM" : "en_US";

  const alternateLinks =
    Array.isArray(hrefLangAlternates) && hrefLangAlternates.length > 0
      ? hrefLangAlternates.map((alt) => <link key={alt.hrefLang} rel="alternate" hrefLang={alt.hrefLang} href={alt.href} />)
      : [
          <link key="fr-CM" rel="alternate" hrefLang="fr-CM" href={canonical} />,
          <link key="fr" rel="alternate" hrefLang="fr" href={canonical} />,
          <link key="xd" rel="alternate" hrefLang="x-default" href={canonical} />,
        ];

  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsFinal} />
      <meta name="googlebot" content={robotsFinal} />
      <link rel="canonical" href={canonical} />

      {alternateLinks}

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
      <meta property="og:locale" content={ogPrimary} />
      <meta property="og:locale:alternate" content={ogAlt1} />

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
