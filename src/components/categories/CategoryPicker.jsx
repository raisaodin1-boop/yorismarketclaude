import { useMemo, useState } from "react";
import { categoryLabel } from "../../lib/marketplaceCategories";
import "./categoryUi.css";

/**
 * Sélecteur 2 étapes : catégorie principale → sous-catégorie.
 */
export function CategoryPicker({ tree = [], locale = "fr", value = {}, onChange, required = true }) {
  const [step, setStep] = useState(value.parentSlug && !value.subSlug ? 2 : value.subSlug ? 2 : 1);
  const [parentSlug, setParentSlug] = useState(value.parentSlug || "");
  const [subSlug, setSubSlug] = useState(value.subSlug || "");
  const [q, setQ] = useState("");

  const parent = useMemo(() => tree.find((n) => n.slug === parentSlug), [tree, parentSlug]);
  const children = parent?.children || [];

  const filteredRoots = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return tree;
    return tree.filter((r) => {
      const fr = (r.name_fr || "").toLowerCase();
      const en = (r.name_en || "").toLowerCase();
      const subs = (r.children || []).some(
        (c) =>
          (c.name_fr || "").toLowerCase().includes(needle) ||
          (c.name_en || "").toLowerCase().includes(needle),
      );
      return fr.includes(needle) || en.includes(needle) || subs;
    });
  }, [tree, q]);

  const filteredChildren = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return children;
    return children.filter(
      (c) =>
        (c.name_fr || "").toLowerCase().includes(needle) ||
        (c.name_en || "").toLowerCase().includes(needle),
    );
  }, [children, q]);

  const pickParent = (node) => {
    setParentSlug(node.slug);
    setSubSlug("");
    setStep(2);
    setQ("");
    if (!node.children?.length) {
      onChange({
        parentSlug: node.slug,
        subSlug: null,
        label: categoryLabel(node, locale),
      });
    }
  };

  const pickChild = (node) => {
    setSubSlug(node.slug);
    onChange({
      parentSlug,
      subSlug: node.slug,
      label: categoryLabel(node, locale),
    });
  };

  const skipSub = () => {
    if (!parent) return;
    onChange({
      parentSlug,
      subSlug: null,
      label: categoryLabel(parent, locale),
    });
  };

  return (
    <div className="cat-picker">
      <input
        type="search"
        className="cat-picker-search"
        placeholder={locale === "en" ? "Search category…" : "Rechercher une catégorie…"}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label={locale === "en" ? "Search categories" : "Rechercher catégories"}
      />
      <div className="cat-picker-steps" aria-hidden>
        <span className={step === 1 ? "is-active" : ""}>1. {locale === "en" ? "Main" : "Principale"}</span>
        <span>›</span>
        <span className={step === 2 ? "is-active" : ""}>2. {locale === "en" ? "Sub" : "Sous-catégorie"}</span>
      </div>

      {step === 2 && (
        <button
          type="button"
          className="cat-picker-back"
          onClick={() => {
            setStep(1);
            setSubSlug("");
          }}
        >
          ← {parent ? categoryLabel(parent, locale) : locale === "en" ? "Back" : "Retour"}
        </button>
      )}

      {step === 1 && (
        <div className="cat-picker-grid" role="listbox">
          {filteredRoots.map((node) => (
            <button
              key={node.id || node.slug}
              type="button"
              role="option"
              className={`cat-picker-card${parentSlug === node.slug ? " is-selected" : ""}`}
              onClick={() => pickParent(node)}
            >
              <span className="ico">{node.icon || "📦"}</span>
              <span className="lbl">{categoryLabel(node, locale)}</span>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <>
          <div className="cat-picker-grid" role="listbox">
            {filteredChildren.map((node) => (
              <button
                key={node.id || node.slug}
                type="button"
                role="option"
                className={`cat-picker-card${subSlug === node.slug ? " is-selected" : ""}`}
                onClick={() => pickChild(node)}
              >
                <span className="ico">{parent?.icon || "📦"}</span>
                <span className="lbl">{categoryLabel(node, locale)}</span>
              </button>
            ))}
          </div>
          {!required && (
            <button type="button" className="cat-picker-back" onClick={skipSub}>
              {locale === "en" ? "Use main category only" : "Utiliser la catégorie principale"}
            </button>
          )}
        </>
      )}

      {(value.subSlug || value.parentSlug) && (
        <p style={{ fontSize: "0.8rem", color: "var(--green,#16a34a)", margin: 0 }}>
          ✓ {value.label || categoryLabel(parent, locale)}
        </p>
      )}
    </div>
  );
}
