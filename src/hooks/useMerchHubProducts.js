import { useQuery } from "@tanstack/react-query";
import { fetchMerchHubProducts } from "../lib/merchHubProducts";

/**
 * Produits pour une page hub merchandising (/made-in-cameroun, /top-produits, …).
 */
export function useMerchHubProducts(merchHubSlug) {
  const query = useQuery({
    queryKey: ["merch-hub-products", merchHubSlug],
    queryFn: () => fetchMerchHubProducts(merchHubSlug),
    enabled: Boolean(merchHubSlug),
    staleTime: 120_000,
  });

  return {
    products: query.data?.products ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
