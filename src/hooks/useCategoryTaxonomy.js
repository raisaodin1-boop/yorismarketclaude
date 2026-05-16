import { useCallback, useEffect, useMemo, useState } from "react";
import { loadCategoryTaxonomy } from "../lib/marketplaceCategories";

/**
 * Charge la taxonomie catégories (cache 5 min côté lib).
 * Repli sur la taxonomie statique si Supabase est vide ou en erreur.
 * @param {{ locale?: string, enabled?: boolean }} [opts]
 */
export function useCategoryTaxonomy(opts = {}) {
  const enabled = opts.enabled !== false;
  const [flat, setFlat] = useState([]);
  const [tree, setTree] = useState([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return undefined;
    }

    let cancelled = false;
    setLoading(true);

    loadCategoryTaxonomy({ type: "product", bust: reloadKey > 0 })
      .then(({ flat: rows, tree: t, fromFallback }) => {
        if (cancelled) return;
        setFlat(rows);
        setTree(t);
        setError(null);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [enabled, reloadKey]);

  const roots = useMemo(() => tree, [tree]);

  return {
    flat,
    tree: roots,
    loading,
    error,
    reload,
    locale: opts.locale || "fr",
  };
}
