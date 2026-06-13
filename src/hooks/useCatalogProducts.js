import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export const CATALOG_PAGE_SIZE = 20;

// Colonnes consommées par la grille (ProdGrid + productPricing + madeInCameroon), au lieu de SELECT *.
const LIST_COLUMNS = [
  "id",
  "name_fr",
  "description_fr",
  "prix",
  "stock",
  "categorie",
  "category_id",
  "image",
  "image_urls",
  "ville",
  "vendeur_nom",
  "note",
  "nombre_avis",
  "sponsorise",
  "flash",
  "escrow",
  "vente_total",
  "promo",
  "promo_pct",
  "promo_starts_at",
  "promo_ends_at",
  "is_made_in_cameroon",
  "made_in_cameroon_status",
  "created_at",
].join(",");

// PostgREST coupe sur , % ( ) : on neutralise pour éviter une requête malformée.
export function sanitizeTerm(value) {
  return String(value || "").replace(/[%,()]/g, " ").trim();
}

export function buildCategoryClause(categoryFilter, legacyCat) {
  const clauses = [];
  if (categoryFilter?.categoryIds?.length) {
    clauses.push(`category_id.in.(${categoryFilter.categoryIds.join(",")})`);
  }
  const label = sanitizeTerm(categoryFilter?.filterLabel || legacyCat);
  if (label) {
    clauses.push(`categorie.ilike.%${label}%`);
  }
  return clauses;
}

export async function fetchCatalogPage({ page, pageSize, search, categoryFilter, legacyCat }) {
  const from = page * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("products")
    .select(LIST_COLUMNS, { count: "exact" })
    .or("actif.eq.true,actif.is.null")
    .order("sponsorise", { ascending: false })
    .order("created_at", { ascending: false })
    .range(from, to);

  const term = sanitizeTerm(search);
  if (term) {
    query = query.or(`name_fr.ilike.%${term}%,description_fr.ilike.%${term}%`);
  }

  // Catégorie : id taxonomie OU libellé legacy, comme productMatchesCategoryFilter côté client.
  const categoryClause = buildCategoryClause(categoryFilter, legacyCat);
  if (categoryClause.length) {
    query = query.or(categoryClause.join(","));
  }

  const { data, count, error } = await query;
  if (error) throw error;
  return { products: data ?? [], total: count ?? 0 };
}

/**
 * Catalogue paginé côté serveur, mis en cache 2 min (staleTime global).
 * `search` doit être débouncé en amont pour ne pas requêter à chaque frappe.
 */
export function useCatalogProducts({
  page = 0,
  pageSize = CATALOG_PAGE_SIZE,
  search = "",
  categoryFilter = null,
  legacyCat = "",
} = {}) {
  const query = useQuery({
    queryKey: [
      "catalog-products",
      {
        page,
        pageSize,
        search: sanitizeTerm(search).toLowerCase(),
        categoryIds: categoryFilter?.categoryIds ?? [],
        categoryLabel: (categoryFilter?.filterLabel || legacyCat || "").toLowerCase(),
      },
    ],
    queryFn: () => fetchCatalogPage({ page, pageSize, search, categoryFilter, legacyCat }),
    placeholderData: keepPreviousData,
  });

  const total = query.data?.total ?? 0;

  return {
    products: query.data?.products ?? [],
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isPlaceholder: query.isPlaceholderData,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
