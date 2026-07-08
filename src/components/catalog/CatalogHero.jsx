import { useSiteT } from "../../hooks/useSiteT";

export function CatalogHero({
  siteLocale = "fr",
  total = 0,
  compact = false,
  activeLabel = "",
  seoCityName = "",
}) {
  const { t, isEn } = useSiteT(siteLocale);

  if (compact) {
    const title =
      activeLabel ||
      (seoCityName
        ? isEn
          ? `Shop in ${seoCityName}`
          : `Achat à ${seoCityName}`
        : t("catalog:allProducts"));
    return (
      <header className="catalog-hero catalog-hero--compact">
        <h1 className="catalog-hero__title">{title}</h1>
        {total > 0 && (
          <p className="catalog-hero__sub">
            {t("catalog:heroCount", { count: total.toLocaleString(isEn ? "en-GB" : "fr-FR") })}
          </p>
        )}
      </header>
    );
  }

  return (
    <header className="catalog-hero">
      <span className="catalog-hero__eyebrow">🇨🇲 Yorix · {isEn ? "Trust platform" : "Plateforme de confiance"}</span>
      <h1 className="catalog-hero__title">{t("catalog:heroTitle")}</h1>
      <p className="catalog-hero__sub">{t("catalog:heroSub")}</p>
      {total > 0 && (
        <p className="catalog-hero__sub" style={{ marginBottom: 12, fontWeight: 700, color: "var(--ink)" }}>
          {t("catalog:heroCount", { count: total.toLocaleString(isEn ? "en-GB" : "fr-FR") })}
        </p>
      )}
      <div className="catalog-hero__trust">
        <span className="catalog-hero__pill">🛡️ Escrow</span>
        <span className="catalog-hero__pill">{isEn ? "Verified sellers" : "Vendeurs vérifiés"}</span>
        <span className="catalog-hero__pill">{isEn ? "MoMo · Orange Money" : "MoMo · Orange Money"}</span>
        <span className="catalog-hero__pill">{isEn ? "Tracked delivery" : "Livraison suivie"}</span>
      </div>
    </header>
  );
}
