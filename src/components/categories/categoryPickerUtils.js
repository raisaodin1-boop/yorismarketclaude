import { MERCH_HUBS } from "../../lib/merchHubs";
import { AUTO_MERCH_CATEGORY_SLUGS, isSellerSelectableCategory } from "../../lib/merchPlacement";
import { categoryLabel } from "../../lib/marketplaceCategories";

export { isSellerSelectableCategory, AUTO_MERCH_CATEGORY_SLUGS };

const PREMIUM_KINDS = new Set(["featured", "promotional", "local", "seasonal", "brand_driven"]);
const HUB_SLUGS = new Set(Object.keys(MERCH_HUBS));

export function isPremiumCategoryNode(node) {
  if (!node) return false;
  if (HUB_SLUGS.has(node.slug) || node.slug === "made-in-cameroun") return true;
  if (node.is_made_in_cameroon || node.is_top_products || node.is_featured_homepage) return true;
  return PREMIUM_KINDS.has(node.category_kind || "standard");
}

/** Libellé carte — 🇨🇲 Made in Cameroun, jamais « CM » seul */
export function getCategoryDisplayLabel(node, locale = "fr") {
  if (!node) return "";
  if (node.slug === "made-in-cameroun") {
    return locale === "en" ? "Made in Cameroon" : "Made in Cameroun";
  }
  const badge = String(node.category_badge || "").trim();
  if (badge) {
    return badge.replace(/^CM$/i, "🇨🇲 Made in Cameroun").replace(/^cm$/i, "🇨🇲");
  }
  const raw = categoryLabel(node, locale);
  if (/^cm$/i.test(raw.trim())) {
    return locale === "en" ? "Made in Cameroon" : "Made in Cameroun";
  }
  return raw;
}

export function getCategoryDisplayIcon(node) {
  if (!node?.slug) return "📦";
  if (node.slug === "made-in-cameroun") return "🇨🇲";
  const hub = MERCH_HUBS[node.slug];
  if (hub?.emoji) return hub.emoji;
  return node.icon || "📦";
}

export function partitionCategoryRoots(roots, { sellerMode = false } = {}) {
  const premium = [];
  const standard = [];
  for (const r of roots) {
    if (sellerMode && !isSellerSelectableCategory(r)) continue;
    if (isPremiumCategoryNode(r)) premium.push(r);
    else standard.push(r);
  }
  const byOrder = (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0);
  premium.sort(byOrder);
  standard.sort(byOrder);
  return { premium, standard };
}

export function filterCategoryNodes(nodes, needle, locale = "fr") {
  if (!needle) return nodes;
  const q = needle.toLowerCase();
  return nodes.filter((n) => {
    const label = getCategoryDisplayLabel(n, locale).toLowerCase();
    const fr = (n.name_fr || "").toLowerCase();
    const en = (n.name_en || "").toLowerCase();
    const subs = (n.children || []).some((c) =>
      getCategoryDisplayLabel(c, locale).toLowerCase().includes(q),
    );
    return label.includes(q) || fr.includes(q) || en.includes(q) || subs;
  });
}
