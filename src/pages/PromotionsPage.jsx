import { PromotionsPremiumView } from "../components/promotions/PromotionsPremiumView";

/**
 * Bons plans & promotions — expérience conversion premium (urgence, flash, filtres).
 */
export function PromotionsPage({
  locale = "fr",
  goPage,
  goToCategory,
  freeShippingThresholdXaf = 50000,
  user,
  userData,
  wishlist,
  addToCart,
  toggleWish,
  openProductUrl,
  openSellerUrl,
}) {
  return (
    <PromotionsPremiumView
      locale={locale}
      goPage={goPage}
      goToCategory={goToCategory}
      freeShippingThresholdXaf={freeShippingThresholdXaf}
      user={user}
      userData={userData}
      wishlist={wishlist}
      addToCart={addToCart}
      toggleWish={toggleWish}
      openProductUrl={openProductUrl}
      openSellerUrl={openSellerUrl}
    />
  );
}
