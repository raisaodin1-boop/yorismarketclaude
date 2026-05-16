import { useMemo, useState } from "react";
import { CATEGORY_TAXONOMY } from "../../data/categoryTaxonomy";
import { categoryLabel } from "../../lib/marketplaceCategories";
import {
  filterCategoryNodes,
  getCategoryDisplayIcon,
  getCategoryDisplayLabel,
  isPremiumCategoryNode,
  partitionCategoryRoots,
} from "./categoryPickerUtils";
import "./categoryUi.css";

function CategoryCard({ node, selected, onPick, locale, variant = "standard" }) {
  const premium = variant === "premium" || isPremiumCategoryNode(node);
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      className={`cat-picker-card${selected ? " is-selected" : ""}${premium ? " is-premium" : ""}`}
      onClick={() => onPick(node)}
    >
      <span className="cat-picker-card__check" aria-hidden>
        {selected ? "✓" : ""}
      </span>
      <span className="cat-picker-card__ico" aria-hidden>
        {getCategoryDisplayIcon(node)}
      </span>
      <span className="cat-picker-card__lbl">{getCategoryDisplayLabel(node, locale)}</span>
      {premium && node.is_top_products && (
        <span className="cat-picker-card__tag">Populaire</span>
      )}
    </button>
  );
}

function CategoryGrid({ nodes, selectedSlug, onPick, locale, emptyLabel }) {
  if (!nodes.length) {
    return <p className="cat-picker-empty">{emptyLabel}</p>;
  }
  return (
    <div className="cat-picker-grid" role="listbox">
      {nodes.map((node) => (
        <CategoryCard
          key={node.id || node.slug}
          node={node}
          selected={selectedSlug === node.slug}
          onPick={onPick}
          locale={locale}
          variant={isPremiumCategoryNode(node) ? "premium" : "standard"}
        />
      ))}
    </div>
  );
}

function CategorySection({ title, subtitle, children }) {
  return (
    <section className="cat-picker-section">
      <header className="cat-picker-section__head">
        <h4 className="cat-picker-section__title">{title}</h4>
        {subtitle && <p className="cat-picker-section__sub">{subtitle}</p>}
      </header>
      {children}
    </section>
  );
}

/**
 * Sélecteur 2 étapes : catégorie principale → sous-catégorie (UI premium).
 */
function TaxonomySelectFallback({ locale = "fr", value = {}, onChange }) {
  const isEn = locale === "en";
  const parentSlug = value.parentSlug || "";
  const parent = CATEGORY_TAXONOMY.find((c) => c.slug === parentSlug);
  const subs = parent?.children || [];

  return (
    <div className="cat-picker-fallback">
      <select
        className="form-select"
        value={parentSlug}
        onChange={(e) => {
          const slug = e.target.value;
          const node = CATEGORY_TAXONOMY.find((c) => c.slug === slug);
          onChange({
            parentSlug: slug,
            subSlug: "",
            label: node ? (isEn ? node.name_en : node.name_fr) : "",
          });
        }}
      >
        <option value="">{isEn ? "Choose a category…" : "Choisir une catégorie…"}</option>
        {CATEGORY_TAXONOMY.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.icon ? `${c.icon} ` : ""}
            {isEn ? c.name_en : c.name_fr}
          </option>
        ))}
      </select>
      {subs.length > 0 && (
        <select
          className="form-select"
          style={{ marginTop: 10 }}
          value={value.subSlug || ""}
          onChange={(e) => {
            const sub = subs.find((s) => s.slug === e.target.value);
            onChange({
              parentSlug,
              subSlug: e.target.value,
              label: sub ? (isEn ? sub.name_en : sub.name_fr) : value.label,
            });
          }}
        >
          <option value="">{isEn ? "Choose a subcategory…" : "Choisir une sous-catégorie…"}</option>
          {subs.map((s) => (
            <option key={s.slug} value={s.slug}>
              {isEn ? s.name_en : s.name_fr}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export function CategoryPicker({
  tree = [],
  locale = "fr",
  value = {},
  onChange,
  required = true,
  loading = false,
  onRetry,
}) {
  const [step, setStep] = useState(value.parentSlug && !value.subSlug ? 2 : value.subSlug ? 2 : 1);
  const [parentSlug, setParentSlug] = useState(value.parentSlug || "");
  const [subSlug, setSubSlug] = useState(value.subSlug || "");
  const [q, setQ] = useState("");
  const [viewTab, setViewTab] = useState("all");

  const parent = useMemo(() => tree.find((n) => n.slug === parentSlug), [tree, parentSlug]);
  const children = parent?.children || [];

  const { premium: premiumRoots, standard: standardRoots } = useMemo(
    () => partitionCategoryRoots(tree),
    [tree],
  );

  const needle = q.trim();
  const filteredPremium = useMemo(
    () => filterCategoryNodes(premiumRoots, needle, locale),
    [premiumRoots, needle, locale],
  );
  const filteredStandard = useMemo(
    () => filterCategoryNodes(standardRoots, needle, locale),
    [standardRoots, needle, locale],
  );
  const filteredChildren = useMemo(
    () => filterCategoryNodes(children, needle, locale),
    [children, needle, locale],
  );

  const pickParent = (node) => {
    setParentSlug(node.slug);
    setSubSlug("");
    setStep(2);
    setQ("");
    if (!node.children?.length) {
      onChange({
        parentSlug: node.slug,
        subSlug: null,
        label: getCategoryDisplayLabel(node, locale),
      });
    }
  };

  const pickChild = (node) => {
    setSubSlug(node.slug);
    onChange({
      parentSlug,
      subSlug: node.slug,
      label: getCategoryDisplayLabel(node, locale),
    });
  };

  const skipSub = () => {
    if (!parent) return;
    onChange({
      parentSlug,
      subSlug: null,
      label: getCategoryDisplayLabel(parent, locale),
    });
  };

  const showPremium = viewTab === "all" || viewTab === "premium";
  const showStandard = viewTab === "all" || viewTab === "marketplace";
  const isEn = locale === "en";

  if (loading) {
    return (
      <p className="cat-picker-loading" role="status">
        {isEn ? "Loading categories…" : "Chargement des catégories…"}
      </p>
    );
  }

  if (!tree.length) {
    return (
      <div className="cat-picker cat-picker--fallback">
        <p className="cat-picker-empty">
          {isEn
            ? "Categories could not be loaded. Use the list below:"
            : "Les catégories n'ont pas pu se charger. Utilisez la liste ci-dessous :"}
        </p>
        <TaxonomySelectFallback locale={locale} value={value} onChange={onChange} />
        {onRetry && (
          <button type="button" className="cat-picker-retry" onClick={onRetry}>
            {isEn ? "Retry" : "Réessayer"}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="cat-picker cat-picker--premium">
      <div className="cat-picker-search-wrap">
        <span className="cat-picker-search-ico" aria-hidden>
          🔍
        </span>
        <input
          type="search"
          className="cat-picker-search"
          placeholder={
            isEn
              ? "Search a category or subcategory…"
              : "Rechercher une catégorie ou sous-catégorie…"
          }
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label={isEn ? "Search categories" : "Rechercher catégories"}
        />
      </div>

      <nav className="cat-picker-steps" aria-label={isEn ? "Steps" : "Étapes"}>
        <button
          type="button"
          className={`cat-picker-step${step === 1 ? " is-active" : ""}`}
          onClick={() => {
            setStep(1);
            setSubSlug("");
          }}
        >
          1. {isEn ? "Category" : "Catégorie"}
        </button>
        <span className="cat-picker-step-sep" aria-hidden>
          ›
        </span>
        <button
          type="button"
          className={`cat-picker-step${step === 2 ? " is-active" : ""}`}
          disabled={!parentSlug}
          onClick={() => parentSlug && setStep(2)}
        >
          2. {isEn ? "Subcategory" : "Sous-catégorie"}
        </button>
      </nav>

      {step === 1 && !needle && (premiumRoots.length > 0 || standardRoots.length > 0) && (
        <div className="cat-picker-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={viewTab === "all"}
            className={`cat-picker-tab${viewTab === "all" ? " is-active" : ""}`}
            onClick={() => setViewTab("all")}
          >
            {isEn ? "All" : "Tout"}
          </button>
          {premiumRoots.length > 0 && (
            <button
              type="button"
              role="tab"
              aria-selected={viewTab === "premium"}
              className={`cat-picker-tab${viewTab === "premium" ? " is-active" : ""}`}
              onClick={() => setViewTab("premium")}
            >
              ✨ {isEn ? "Premium" : "Premium"}
            </button>
          )}
          {standardRoots.length > 0 && (
            <button
              type="button"
              role="tab"
              aria-selected={viewTab === "marketplace"}
              className={`cat-picker-tab${viewTab === "marketplace" ? " is-active" : ""}`}
              onClick={() => setViewTab("marketplace")}
            >
              🛍️ {isEn ? "Marketplace" : "Marketplace"}
            </button>
          )}
        </div>
      )}

      <div className="cat-picker-body">
        {step === 2 && (
          <button
            type="button"
            className="cat-picker-back"
            onClick={() => {
              setStep(1);
              setSubSlug("");
            }}
          >
            ← {parent ? getCategoryDisplayLabel(parent, locale) : isEn ? "Back" : "Retour"}
          </button>
        )}

        {step === 1 && (
          <>
            {needle && (
              <CategorySection
                title={isEn ? "Results" : "Résultats"}
                subtitle={`${filteredPremium.length + filteredStandard.length} ${isEn ? "matches" : "correspondances"}`}
              >
                <CategoryGrid
                  nodes={[...filteredPremium, ...filteredStandard]}
                  selectedSlug={parentSlug}
                  onPick={pickParent}
                  locale={locale}
                  emptyLabel={isEn ? "No category found." : "Aucune catégorie trouvée."}
                />
              </CategorySection>
            )}

            {!needle && showPremium && filteredPremium.length > 0 && (
              <CategorySection
                title={isEn ? "Premium discovery" : "Découverte premium"}
                subtitle={isEn ? "Highlights & local pride" : "Sélections mises en avant · fierté locale"}
              >
                <CategoryGrid
                  nodes={filteredPremium}
                  selectedSlug={parentSlug}
                  onPick={pickParent}
                  locale={locale}
                  emptyLabel=""
                />
              </CategorySection>
            )}

            {!needle && showStandard && filteredStandard.length > 0 && (
              <CategorySection
                title={isEn ? "Marketplace categories" : "Catégories marketplace"}
                subtitle={isEn ? "Classify your product" : "Classez votre produit dans le bon rayon"}
              >
                <CategoryGrid
                  nodes={filteredStandard}
                  selectedSlug={parentSlug}
                  onPick={pickParent}
                  locale={locale}
                  emptyLabel=""
                />
              </CategorySection>
            )}

            {!needle &&
              filteredPremium.length === 0 &&
              filteredStandard.length === 0 && (
                <p className="cat-picker-empty">
                  {isEn ? "No categories available." : "Aucune catégorie disponible."}
                </p>
              )}
          </>
        )}

        {step === 2 && (
          <>
            <CategorySection
              title={isEn ? "Choose a subcategory" : "Choisissez une sous-catégorie"}
              subtitle={parent ? getCategoryDisplayLabel(parent, locale) : ""}
            >
              <CategoryGrid
                nodes={filteredChildren}
                selectedSlug={subSlug}
                onPick={pickChild}
                locale={locale}
                emptyLabel={
                  isEn
                    ? "No subcategory for this search."
                    : "Aucune sous-catégorie pour cette recherche."
                }
              />
            </CategorySection>
            {!required && (
              <button type="button" className="cat-picker-skip" onClick={skipSub}>
                {isEn ? "Use main category only" : "Utiliser uniquement la catégorie principale"}
              </button>
            )}
          </>
        )}
      </div>

      {(value.subSlug || value.parentSlug) && (
        <p className="cat-picker-selected" role="status">
          <span className="cat-picker-selected__ico">✓</span>
          {value.label || (parent ? categoryLabel(parent, locale) : "")}
        </p>
      )}
    </div>
  );
}
