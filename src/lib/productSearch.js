/** Normalise une chaîne pour la recherche (casse + accents). */
export function normalizeSearchText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

/** Vérifie si un produit correspond à une requête (vide = tout passe). */
export function productMatchesSearch(product, query) {
  const q = normalizeSearchText(query?.trim());
  if (!q) return true;
  return (
    normalizeSearchText(product?.name_fr).includes(q) ||
    normalizeSearchText(product?.description_fr).includes(q) ||
    normalizeSearchText(product?.categorie).includes(q)
  );
}

/** Filtre une liste de produits par requête texte. */
export function filterProductsBySearch(products, query, limit) {
  const trimmed = query?.trim();
  if (!trimmed || trimmed.length < 2) return [];
  const list = (products || []).filter((p) => productMatchesSearch(p, trimmed));
  return limit != null ? list.slice(0, limit) : list;
}
