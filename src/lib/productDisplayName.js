/**
 * Nom produit lisible — évite les MAJUSCULES agressives en catalogue.
 * @param {string | null | undefined} name
 */
export function formatProductDisplayName(name) {
  if (!name || typeof name !== "string") return "";
  const trimmed = name.trim();
  const letters = trimmed.replace(/[^A-Za-zÀ-ÿ]/g, "");
  if (!letters) return trimmed;

  const upperCount = (letters.match(/[A-ZÀ-ÖØ-Þ]/g) || []).length;
  if (upperCount / letters.length < 0.65) return trimmed;

  return trimmed
    .toLowerCase()
    .split(/(\s+|[-/'])/)
    .map((part) => {
      if (!part || /^[\s\-/'"]+$/.test(part)) return part;
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join("");
}
