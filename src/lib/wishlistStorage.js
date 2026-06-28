const WISHLIST_LOCAL_KEY = "yorix_wishlist_local";

/** @returns {string[]} */
export function readLocalWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_LOCAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(Boolean).map(String) : [];
  } catch {
    return [];
  }
}

/** @param {Iterable<string>} ids */
export function writeLocalWishlist(ids) {
  try {
    localStorage.setItem(WISHLIST_LOCAL_KEY, JSON.stringify([...new Set(ids)]));
  } catch {
    /* quota / private mode */
  }
}
