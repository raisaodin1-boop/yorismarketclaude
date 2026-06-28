import { filterProductsByMerchHub, getMerchHub } from "./merchHubs";
import { productMatchesCategoryFilter } from "./marketplaceCategories";
import { productMatchesSearch } from "./productSearch";

/**
 * Filtre le cache produits global (hors pagination catalogue dédiée).
 */
export function filterCatalogProducts(
  produits,
  {
    search = "",
    page,
    cityMode,
    merchHub,
    citySlug,
    seoCityName,
    categoryFilter,
    filterCat,
    sellerMerchProfiles = [],
  },
) {
  let list = (produits || []).filter((p) => productMatchesSearch(p, search));

  if (page === "seoCity" && cityMode === "acheter" && seoCityName) {
    const sl = seoCityName.toLowerCase();
    list = list.filter((p) => {
      const v = (p.ville || "").toLowerCase();
      return !v || v.includes(sl) || sl.includes(v);
    });
  }

  if (page === "merchHub" && merchHub) {
    const hub = getMerchHub(merchHub);
    if (hub?.filter) {
      list = filterProductsByMerchHub(list, hub.filter, {
        citySlug,
        sellerProfiles: sellerMerchProfiles,
      });
    }
  }

  if (categoryFilter?.filterLabel || categoryFilter?.categoryId) {
    list = list.filter((p) => productMatchesCategoryFilter(p, categoryFilter));
  } else if (filterCat) {
    const fc = filterCat.toLowerCase();
    list = list.filter((p) => (p.categorie || "").toLowerCase() === fc);
  }

  return list;
}
