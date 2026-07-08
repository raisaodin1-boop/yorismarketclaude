import { useSearchParams } from "react-router-dom";
import { useSiteT } from "../../hooks/useSiteT";

const FILTERS = [
  { id: "douala", param: "ville", value: "douala", emoji: "📍" },
  { id: "yaounde", param: "ville", value: "yaounde", emoji: "📍" },
  { id: "madein", param: "madein", value: "1", emoji: "🇨🇲" },
  { id: "escrow", param: "escrow", value: "1", emoji: "🛡️" },
  { id: "express", param: "express", value: "1", emoji: "🚚" },
  { id: "budget", param: "max_prix", value: "200000", emoji: "💰" },
];

export function CatalogSearchFilters({ siteLocale = "fr", search = "" }) {
  const { t } = useSiteT(siteLocale);
  const [searchParams, setSearchParams] = useSearchParams();

  if (!search?.trim()) return null;

  const toggle = (filter) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("page");
      const current = next.get(filter.param);
      if (current === filter.value) next.delete(filter.param);
      else next.set(filter.param, filter.value);
      return next;
    });
  };

  const isActive = (filter) => searchParams.get(filter.param) === filter.value;

  return (
    <div className="catalog-search-filters" role="group" aria-label={t("catalog:searchFiltersAria")}>
      {FILTERS.map((f) => (
        <button
          key={f.id}
          type="button"
          className={`catalog-search-filter${isActive(f) ? " is-active" : ""}`}
          onClick={() => toggle(f)}
        >
          {f.emoji} {t(`catalog:filter_${f.id}`)}
        </button>
      ))}
    </div>
  );
}

/** Applique les filtres URL côté client sur une page déjà chargée (complément serveur). */
export function applyCatalogQuickFilters(products, searchParams) {
  let list = products || [];
  const ville = searchParams.get("ville");
  if (ville === "douala") {
    list = list.filter((p) => String(p.ville || "").toLowerCase().includes("douala"));
  } else if (ville === "yaounde") {
    list = list.filter((p) => String(p.ville || "").toLowerCase().includes("yaound"));
  }
  if (searchParams.get("madein") === "1") {
    list = list.filter(
      (p) =>
        p.is_made_in_cameroon ||
        p.local_brand_name?.trim?.() ||
        /cameroun|local|artisan|made in/i.test(String(p.categorie || "")),
    );
  }
  if (searchParams.get("escrow") === "1") {
    list = list.filter((p) => p.escrow);
  }
  if (searchParams.get("express") === "1") {
    list = list.filter((p) => {
      const v = String(p.ville || "").toLowerCase();
      return v.includes("douala") || v.includes("yaound");
    });
  }
  const maxPrix = parseInt(searchParams.get("max_prix"), 10);
  if (maxPrix > 0) {
    list = list.filter((p) => (Number(p.prix) || 0) <= maxPrix);
  }
  return list;
}
