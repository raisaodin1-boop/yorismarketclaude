import { useCallback } from "react";
import { Home, Search, ShoppingCart, Heart, User } from "lucide-react";

function NavIcon({ icon: Icon, active }) {
  return <Icon size={22} strokeWidth={active ? 2.25 : 1.85} aria-hidden />;
}

/** Barre de navigation basse — mobile (Jumia / Amazon style). */
export function MobileBottomNav({
  page,
  cartQty,
  wishlistCount = 0,
  user,
  onOpenCart,
  goPage,
  goDash,
  onOpenUser,
}) {
  const isHome = page === "home";
  const isExplore = page === "produits" || page === "seoCity" || page === "merchHub" || page === "bonsPlans";
  const isCart = page === "cart";
  const isFavorites = page === "dashboard"; // favoris via dashboard
  const isAccount = page === "dashboard" || page === "admin";

  const navItem = useCallback(
    (label, icon, isActive, onClick, badge = 0) => (
      <button
        key={label}
        type="button"
        className={`mbn-item${isActive ? " mbn-item--active" : ""}`}
        onClick={onClick}
        aria-label={label}
        aria-current={isActive ? "page" : undefined}
      >
        <span className="mbn-icon">
          {icon}
          {badge > 0 && (
            <span className="mbn-dot-badge" aria-hidden>
              {badge > 99 ? "99+" : badge}
            </span>
          )}
        </span>
        <span className="mbn-label">{label}</span>
      </button>
    ),
    [],
  );

  const openFavorites = () => {
    if (user && goDash) goDash("overview");
    else if (user) goPage("dashboard");
    else onOpenUser?.();
  };

  const openAccount = () => {
    if (user) goPage("dashboard");
    else onOpenUser?.();
  };

  return (
    <nav className="mobile-bottom-nav mobile-bottom-nav--v2" aria-label="Navigation principale">
      {navItem("Accueil", <NavIcon icon={Home} active={isHome} />, isHome, () => goPage("home"))}
      {navItem("Explorer", <NavIcon icon={Search} active={isExplore} />, isExplore, () => goPage("produits"))}
      {navItem(
        "Panier",
        <NavIcon icon={ShoppingCart} active={isCart} />,
        isCart,
        onOpenCart,
        cartQty,
      )}
      {navItem(
        "Favoris",
        <NavIcon icon={Heart} active={isFavorites && wishlistCount > 0} />,
        false,
        openFavorites,
        wishlistCount,
      )}
      {navItem(
        user ? "Compte" : "Connexion",
        <NavIcon icon={User} active={isAccount} />,
        isAccount && !!user,
        openAccount,
      )}
    </nav>
  );
}
