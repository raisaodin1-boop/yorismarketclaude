import { useQuery } from "@tanstack/react-query";
import { fetchPlatformStats } from "../lib/platformStats";

export function usePlatformStats() {
  const query = useQuery({
    queryKey: ["platform-stats"],
    queryFn: fetchPlatformStats,
    staleTime: 300_000,
  });

  return {
    stats: query.data,
    isLoading: query.isLoading,
  };
}
