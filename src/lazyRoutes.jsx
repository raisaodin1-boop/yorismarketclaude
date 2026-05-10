import { lazy } from "react";

export function RouteSuspenseFallback({ minHeight = 200, label = "Chargement..." }) {
  return (
    <div className="loading" style={{ minHeight, justifyContent: "center", padding: "24px 0" }}>
      <div className="spinner" />
      {label}
    </div>
  );
}

export const LazyHomePage = lazy(() =>
  import("./pages/HomePage").then((m) => ({ default: m.HomePage }))
);

export const LazyProductRouteSections = lazy(() =>
  import("./pages/ProductRouteSections").then((m) => ({ default: m.ProductRouteSections }))
);

export const LazyLivraisonPage = lazy(() =>
  import("./pages/LivraisonPage").then((m) => ({ default: m.LivraisonPage }))
);

export const LazySiteMarketingPages = lazy(() =>
  import("./pages/SiteMarketingPages").then((m) => ({ default: m.SiteMarketingPages }))
);

export const LazyLivraisonTopInteractive = lazy(() =>
  import("./components/LivraisonLazyBlocks").then((m) => ({
    default: m.LivraisonTopInteractive,
  }))
);

export const LazyLivraisonBottomInteractive = lazy(() =>
  import("./components/LivraisonLazyBlocks").then((m) => ({
    default: m.LivraisonBottomInteractive,
  }))
);

export const LazyFicheProduit = lazy(() =>
  import("./components/FicheProduit").then((m) => ({ default: m.FicheProduit }))
);

export const LazyPrestPage = lazy(() =>
  import("./components/PrestPage").then((m) => ({ default: m.PrestPage }))
);

export const LazyCheckoutPage = lazy(() =>
  import("./components/CheckoutPage").then((m) => ({ default: m.CheckoutPage }))
);

export const LazyCartPage = lazy(() =>
  import("./components/CartPage").then((m) => ({ default: m.CartPage }))
);

export const LazyAcademyDetail = lazy(() =>
  import("./components/AcademyDetail").then((m) => ({ default: m.AcademyDetail }))
);

export const LazyAcademyContactForm = lazy(() =>
  import("./components/AcademyContactForm").then((m) => ({ default: m.AcademyContactForm }))
);

export const LazyLoyaltyPage = lazy(() =>
  import("./components/LoyaltyPage").then((m) => ({ default: m.LoyaltyPage }))
);

export const LazySellerDashboard = lazy(() =>
  import("./components/SellerDashboard").then((m) => ({ default: m.SellerDashboard }))
);

export const LazyBuyerDashboard = lazy(() =>
  import("./components/BuyerDashboard").then((m) => ({ default: m.BuyerDashboard }))
);

export const LazyDeliveryDashboard = lazy(() =>
  import("./components/DeliveryDashboard").then((m) => ({ default: m.DeliveryDashboard }))
);

export const LazyProviderDashboard = lazy(() =>
  import("./components/ProviderDashboard").then((m) => ({ default: m.ProviderDashboard }))
);

export const LazyAdminDashboard = lazy(() =>
  import("./components/AdminDashboard").then((m) => ({ default: m.AdminDashboard }))
);
