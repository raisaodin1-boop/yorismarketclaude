import { supabase } from "./supabase";
import { filterProductsByMerchHub, getMerchHub } from "./merchHubs";

const HUB_FETCH_LIMIT = 400;

const SELLER_FILTERS = new Set(["top_sellers", "new_sellers"]);

async function loadSellerProfiles() {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, role, created_at, nom")
    .or("role.eq.seller,role.eq.vendeur")
    .limit(3000);
  if (error) {
    console.warn("merchHub seller profiles:", error.message);
    return [];
  }
  return data || [];
}

/**
 * Charge les produits d'un hub merchandising (requête dédiée, pas le cache global 200).
 */
export async function fetchMerchHubProducts(merchHubSlug) {
  const hub = getMerchHub(merchHubSlug);
  if (!hub?.filter) return { products: [], usedFallback: false };

  const sellerProfiles = SELLER_FILTERS.has(hub.filter) ? await loadSellerProfiles() : [];

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or("actif.eq.true,actif.is.null")
    .order("sponsorise", { ascending: false })
    .order("vente_total", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .limit(HUB_FETCH_LIMIT);

  if (error) throw error;

  const all = data || [];
  const products = filterProductsByMerchHub(all, hub.filter, { sellerProfiles });

  return {
    products: products.slice(0, 64),
  };
}

/** Produits pour hubs SEO Immobilier (catégorie / mots-clés). */
export async function fetchCategoryHighlightProducts(keywords, limit = 24) {
  const terms = (Array.isArray(keywords) ? keywords : [keywords]).filter(Boolean);
  if (!terms.length) return [];

  const orClause = terms
    .map((t) => `name_fr.ilike.%${t}%,description_fr.ilike.%${t}%,categorie.ilike.%${t}%`)
    .join(",");

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or("actif.eq.true,actif.is.null")
    .or(orClause)
    .order("sponsorise", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.warn("fetchCategoryHighlightProducts:", error.message);
    return fetchHighlightFallback(limit);
  }
  if (!data?.length) return fetchHighlightFallback(limit);
  return data;
}

async function fetchHighlightFallback(limit = 24) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or("actif.eq.true,actif.is.null")
    .order("sponsorise", { ascending: false })
    .order("vente_total", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.warn("fetchHighlightFallback:", error.message);
    return [];
  }
  return data || [];
}
