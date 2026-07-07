import { CatalogProducts } from "../components/catalog/CatalogProducts";
import { EscrowPremiumPage } from "./EscrowPremiumPage";

export function ProductRouteSections({
  showProduits,
  page,
  seoCityName,
  produitsLoading,
  produits,
  filterCat,
  setFilterCat,
  categoryTree = [],
  categoryFilter,
  goToCategory,
  siteLocale = "fr",
  search,
  user,
  userData,
  wishlist,
  addToCart,
  toggleWish,
  openProductUrl,
  openSellerUrl,
  dark,
  goPage,
}) {
  if (showProduits) {
    return (
      <CatalogProducts
        page={page}
        seoCityName={seoCityName}
        filterCat={filterCat}
        setFilterCat={setFilterCat}
        categoryTree={categoryTree}
        categoryFilter={categoryFilter}
        goToCategory={goToCategory}
        siteLocale={siteLocale}
        search={search}
        user={user}
        userData={userData}
        wishlist={wishlist}
        addToCart={addToCart}
        toggleWish={toggleWish}
        openProductUrl={openProductUrl}
        openSellerUrl={openSellerUrl}
        goPage={goPage}
      />
    );
  }

  if (page === "escrow" && typeof goPage === "function") {
    return (
      <EscrowPremiumPage
        dark={dark}
        produitsLoading={produitsLoading}
        produits={produits}
        user={user}
        userData={userData}
        wishlist={wishlist}
        addToCart={addToCart}
        toggleWish={toggleWish}
        openProductUrl={openProductUrl}
        goPage={goPage}
      />
    );
  }

  return null;
}
