import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { GLOBAL_PRODUCTS_LIMIT, PRODUCT_LIST_COLUMNS } from "../lib/productListColumns";

const RAILS_QUERY_KEY = ["global-products"];

async function fetchRailsProducts() {
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

/** Produits pour rails merchandising sur `/produits` (cache partagé avec l'accueil). */
export function useCatalogRails({ enabled = true } = {}) {
  const query = useQuery({
    queryKey: RAILS_QUERY_KEY,
    queryFn: fetchRailsProducts,
    enabled,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    products: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
