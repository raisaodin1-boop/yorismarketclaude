import { describe, it, expect, vi } from "vitest";
import { createQueryClient, queryClientOptions } from "../queryClient.js";

describe("createQueryClient", () => {
  it("cache les données catalogue 2 minutes (staleTime)", () => {
    expect(queryClientOptions.defaultOptions.queries.staleTime).toBe(2 * 60 * 1000);
  });

  it("ne refetch pas au retour de focus (marketplace)", () => {
    expect(queryClientOptions.defaultOptions.queries.refetchOnWindowFocus).toBe(false);
  });

  it("sert le cache sans refetch pour une même clé dans le staleTime", async () => {
    const queryClient = createQueryClient();
    const queryFn = vi.fn().mockResolvedValue(["produit"]);

    await queryClient.fetchQuery({ queryKey: ["catalog-products", { page: 0 }], queryFn });
    await queryClient.fetchQuery({ queryKey: ["catalog-products", { page: 0 }], queryFn });

    // 2e appel servi depuis le cache → queryFn appelé une seule fois.
    expect(queryFn).toHaveBeenCalledTimes(1);
  });

  it("refetch quand la clé change (page/filtre différent)", async () => {
    const queryClient = createQueryClient();
    const queryFn = vi.fn().mockResolvedValue(["produit"]);

    await queryClient.fetchQuery({ queryKey: ["catalog-products", { page: 0 }], queryFn });
    await queryClient.fetchQuery({ queryKey: ["catalog-products", { page: 1 }], queryFn });

    expect(queryFn).toHaveBeenCalledTimes(2);
  });
});
