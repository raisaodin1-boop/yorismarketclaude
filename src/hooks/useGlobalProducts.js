import { useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { GLOBAL_PRODUCTS_LIMIT, PRODUCT_LIST_COLUMNS } from "../lib/productListColumns";

const GLOBAL_PRODUCTS_KEY = ["global-products"];

async function fetchGlobalProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_LIST_COLUMNS)
    .or("actif.eq.true,actif.is.null")
    .order("sponsorise", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(GLOBAL_PRODUCTS_LIMIT);
  if (error) throw error;
  return data ?? [];
}

/**
 * Cache produits global (accueil, hubs, SEO) — désactivé sur `/produits` (catalogue paginé).
 */
export function useGlobalProducts({ page, cityMode }) {
  const queryClient = useQueryClient();
  const invalidateTimer = useRef(null);

  const isCatalogPage = page === "produits" || (page === "seoCity" && cityMode === "acheter");

  const query = useQuery({
    queryKey: GLOBAL_PRODUCTS_KEY,
    queryFn: fetchGlobalProducts,
    enabled: !isCatalogPage,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isCatalogPage || !query.data) return undefined;

    const scheduleInvalidate = () => {
      if (invalidateTimer.current) clearTimeout(invalidateTimer.current);
      invalidateTimer.current = setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: GLOBAL_PRODUCTS_KEY });
      }, 4000);
    };

    const channel = supabase
      .channel("prod_rt")
      .on("postgres_changes", { event: "*", schema: "public", table: "products" }, scheduleInvalidate)
      .subscribe();

    return () => {
      if (invalidateTimer.current) clearTimeout(invalidateTimer.current);
      supabase.removeChannel(channel);
    };
  }, [isCatalogPage, query.data, queryClient]);

  return {
    produits: isCatalogPage ? [] : (query.data ?? []),
    setProduits: (updater) => {
      queryClient.setQueryData(GLOBAL_PRODUCTS_KEY, (prev) =>
        typeof updater === "function" ? updater(prev ?? []) : updater,
      );
    },
    produitsLoading: isCatalogPage ? false : query.isLoading,
    setProduitsLoading: () => {},
    loadGlobalProducts: query.refetch,
  };
}
