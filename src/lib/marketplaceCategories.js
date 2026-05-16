/**
 * Taxonomie marketplace_categories (Supabase) + arbre hiérarchique.
 */
import { supabase } from "./supabase";
import {
  flattenTaxonomyToRows,
  buildCategoryTree,
  findCategoryInFlat,
  LEGACY_CAT_TO_PARENT_SLUG,
} from "../data/categoryTaxonomy.js";

let cache = null;
let cacheAt = 0;
const TTL_MS = 5 * 60 * 1000;

export function bustCategoryCache() {
  cache = null;
  cacheAt = 0;
}

function normalizeDbRow(row, parentSlug = null) {
  return {
    ...row,
    parent_slug: parentSlug,
    active: row.active !== false,
  };
}

/**
 * @returns {Promise<Array<Record<string, unknown>>>}
 */
export async function fetchMarketplaceCategories(opts = {}) {
  const { type = "product", homepageOnly = false, kind = null, bust = false } = opts;
  const now = Date.now();
  if (cache && now - cacheAt < TTL_MS && !bust) {
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
      const byId = Object.fromEntries(data.map((r) => [r.id, r]));
      const flat = data.map((r) =>
        normalizeDbRow(r, r.parent_id ? byId[r.parent_id]?.slug : null),
      );
      cache = flat;
      cacheAt = now;
      return filterCached(flat, opts);
    }
  } catch (e) {
    console.warn("marketplace_categories:", e?.message || e);
  }

  const fallback = flattenTaxonomyToRows();
  cache = fallback;
  cacheAt = now;
  return filterCached(fallback, opts);
}

function filterCached(rows, opts) {
  let out = rows;
  if (opts.rootsOnly) out = out.filter((r) => !r.parent_id);
  if (opts.childrenOf) out = out.filter((r) => r.parent_slug === opts.childrenOf || r.parent_id === opts.childrenOf);
  if (opts.homepageOnly) out = out.filter((r) => r.is_featured_homepage);
  if (opts.kind) out = out.filter((r) => r.category_kind === opts.kind);
  if (opts.madeInCameroon) out = out.filter((r) => r.is_made_in_cameroon);
  return out;
}

export async function fetchCategoryTree(opts = {}) {
  const flat = await fetchMarketplaceCategories(opts);
  return buildCategoryTree(flat);
}

export function categoryLabel(row, locale = "fr") {
  if (!row) return "";
  return locale === "en" ? row.name_en || row.name_fr : row.name_fr || row.name_en;
}

export function findCategory(flat, { slug, parentSlug } = {}) {
  return findCategoryInFlat(flat, { slug, parentSlug });
}

/** Résout filtre catalogue depuis slugs URL */
export function resolveCategoryFilter(flat, { categorySlug, subCategorySlug } = {}) {
  if (!categorySlug) return { filterLabel: "", categoryId: null, categoryIds: [], parent: null, child: null };

  const parent = findCategoryInFlat(flat, { slug: categorySlug });
  if (!parent) {
    return { filterLabel: categorySlug.replace(/-/g, " "), categoryId: null, categoryIds: [], parent: null, child: null };
  }

  if (subCategorySlug) {
    const child = findCategoryInFlat(flat, { slug: subCategorySlug, parentSlug: categorySlug });
    const label = child ? categoryLabel(child) : subCategorySlug.replace(/-/g, " ");
    return {
      filterLabel: label,
      categoryId: child?.id || null,
      categoryIds: child?.id ? [child.id] : [],
      parent,
      child,
    };
  }

  const childIds = flat.filter((r) => r.parent_id === parent.id || r.parent_slug === parent.slug).map((r) => r.id);
  return {
    filterLabel: categoryLabel(parent),
    categoryId: parent.id,
    categoryIds: [parent.id, ...childIds].filter(Boolean),
    parent,
    child: null,
  };
}

/** Payload insert/update produit */
export function buildProductCategoryPayload(flat, { parentSlug, subSlug, legacyLabel }) {
  const parent = parentSlug ? findCategoryInFlat(flat, { slug: parentSlug }) : null;
  const child = subSlug && parentSlug ? findCategoryInFlat(flat, { slug: subSlug, parentSlug }) : null;
  const row = child || parent;
  const label =
    legacyLabel ||
    (row ? categoryLabel(row) : parent ? categoryLabel(parent) : "Autre");

  return {
    categorie: label,
    category_id: row?.id && !String(row.id).startsWith("tax-") ? row.id : null,
    parent_slug: parentSlug || parent?.slug || null,
    sub_slug: subSlug || child?.slug || null,
  };
}

export function legacyCategorieToSlugs(categorieText) {
  const key = (categorieText || "").trim();
  const parentSlug = LEGACY_CAT_TO_PARENT_SLUG[key];
  return parentSlug ? { parentSlug, subSlug: null } : { parentSlug: null, subSlug: null };
}

export function productMatchesCategoryFilter(product, filter) {
  if (!filter?.filterLabel && !filter?.categoryId && !filter?.categoryIds?.length) return true;

  if (filter.categoryId && product.category_id === filter.categoryId) return true;
  if (filter.categoryIds?.length && filter.categoryIds.includes(product.category_id)) return true;

  const label = (product.categorie || "").toLowerCase();
  const want = (filter.filterLabel || "").toLowerCase();
  if (want && label === want) return true;
  if (filter.parent && label === categoryLabel(filter.parent).toLowerCase()) return true;
  if (filter.child && label === categoryLabel(filter.child).toLowerCase()) return true;

  return false;
}
