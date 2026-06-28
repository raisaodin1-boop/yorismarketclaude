import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

const GLOBAL_PRODUCTS_LIMIT = 200;

/**
 * Cache produits global (accueil, hubs, SEO) — désactivé sur `/produits` (catalogue paginé).
 */
export function useGlobalProducts({ page, cityMode }) {
  const [produits, setProduits] = useState([]);
  const [produitsLoading, setProduitsLoading] = useState(true);
  const [globalProductsLoaded, setGlobalProductsLoaded] = useState(false);

  const loadGlobalProducts = useCallback(async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .or("actif.eq.true,actif.is.null")
      .order("sponsorise", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(GLOBAL_PRODUCTS_LIMIT);
    if (error) console.warn("Produits:", error.message);
    setProduits(data || []);
    setProduitsLoading(false);
  }, []);

  useEffect(() => {
    const isCatalogPage = page === "produits" || (page === "seoCity" && cityMode === "acheter");
    if (isCatalogPage) {
      setProduitsLoading(false);
      return undefined;
    }
    if (globalProductsLoaded) return undefined;

    let cancelled = false;
    setProduitsLoading(true);
    loadGlobalProducts().then(() => {
      if (!cancelled) setGlobalProductsLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, [page, cityMode, globalProductsLoaded, loadGlobalProducts]);

  useEffect(() => {
    if (!globalProductsLoaded) return undefined;
    const channel = supabase
      .channel("prod_rt")
      .on("postgres_changes", { event: "*", schema: "public", table: "products" }, loadGlobalProducts)
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [globalProductsLoaded, loadGlobalProducts]);

  return { produits, setProduits, produitsLoading, setProduitsLoading, loadGlobalProducts };
}
