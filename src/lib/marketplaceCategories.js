/**
 * Fetch taxonomie marketplace_categories (Supabase) avec repli sur constantes legacy.
 */
import { supabase } from "./supabase";
import { CATS } from "./constants";
import { categoryToSlug } from "./seoRoutes";

let cache = null;
let cacheAt = 0;
const TTL_MS = 5 * 60 * 1000;

/**
 * @returns {Promise<Array<Record<string, unknown>>>}
 */
export async function fetchMarketplaceCategories(opts = {}) {
  const { type = "product", homepageOnly = false, kind = null } = opts;
  const now = Date.now();
  if (cache && now - cacheAt < TTL_MS && !opts.bust) {
    return filterCached(cache, opts);
  }

  try {
    let q = supabase
      .from("marketplace_categories")
      .select("*")
      .eq("active", true)
      .eq("category_type", type)
      .order("sort_order", { ascending: true });

    if (homepageOnly) q = q.eq("is_featured_homepage", true);
    if (kind) q = q.eq("category_kind", kind);

    const { data, error } = await q;
    if (error) throw error;
    if (data?.length) {
      cache = data;
      cacheAt = now;
      return filterCached(data, opts);
    }
  } catch (e) {
    console.warn("marketplace_categories:", e?.message || e);
  }

  return legacyCategoriesAsRows();
}

function filterCached(rows, opts) {
  let out = rows;
  if (opts.homepageOnly) out = out.filter((r) => r.is_featured_homepage);
  if (opts.kind) out = out.filter((r) => r.category_kind === opts.kind);
  if (opts.madeInCameroon) out = out.filter((r) => r.is_made_in_cameroon);
  return out;
}

function legacyCategoriesAsRows() {
  return CATS.map((name, i) => ({
    id: `legacy-${i}`,
    name_fr: name,
    name_en: name,
    slug: categoryToSlug(name),
    category_type: "product",
    category_kind: "standard",
    icon: "📦",
    sort_order: i * 10,
    is_featured_homepage: false,
    is_made_in_cameroon: false,
  }));
}

export function categoryLabel(row, locale = "fr") {
  if (!row) return "";
  return locale === "en" ? row.name_en || row.name_fr : row.name_fr || row.name_en;
}
