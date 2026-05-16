import { useEffect, useMemo, useState } from "react";
import { fetchCategoryTree, fetchMarketplaceCategories } from "../lib/marketplaceCategories";

/**
 * Charge la taxonomie catégories (cache 5 min côté lib).
 * @param {{ locale?: string }} [opts]
 */
export function useCategoryTaxonomy(opts = {}) {
  const [flat, setFlat] = useState([]);
  const [tree, setTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([
      fetchMarketplaceCategories({ type: "product" }),
      fetchCategoryTree({ type: "product" }),
    ])
      .then(([rows, t]) => {
        if (cancelled) return;
        setFlat(rows);
        setTree(t);
        setError(null);
      })
      .catch((e) => {
        if (!cancelled) setError(e);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const roots = useMemo(() => tree, [tree]);

  return { flat, tree: roots, loading, error, locale: opts.locale || "fr" };
}
