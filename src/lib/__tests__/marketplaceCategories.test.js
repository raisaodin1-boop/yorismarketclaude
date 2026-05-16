import { describe, expect, it } from "vitest";
import {
  categoryIdsForProductQuery,
  productMatchesCategoryFilter,
} from "../marketplaceCategories.js";

describe("marketplace category filters", () => {
  it("keeps real taxonomy ids for Supabase product queries", () => {
    expect(
      categoryIdsForProductQuery({
        categoryId: "root-id",
        categoryIds: ["root-id", "child-id", "tax-static-fallback", "child-id", null],
      }),
    ).toEqual(["root-id", "child-id"]);
  });

  it("falls back to a single category id when the expanded list is absent", () => {
    expect(categoryIdsForProductQuery({ categoryId: "child-id" })).toEqual(["child-id"]);
  });

  it("matches products through any category id in a root category filter", () => {
    const filter = {
      filterLabel: "High-Tech & Téléphones",
      categoryId: "root-id",
      categoryIds: ["root-id", "phones-id"],
    };

    expect(productMatchesCategoryFilter({ category_id: "phones-id", categorie: "Smartphones" }, filter)).toBe(true);
  });
});
