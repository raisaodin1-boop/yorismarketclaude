import { QueryClient } from "@tanstack/react-query";

// Cache catalogue : 2 min « fresh » (pas de refetch), gardé 5 min en mémoire.
export const queryClientOptions = {
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
};

export function createQueryClient() {
  return new QueryClient(queryClientOptions);
}
