import { useCallback } from "react";

// SVG icons — no emoji, crisp on retina
function IconHome({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "1.8"} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
      <path d="M9 21V12h6v9" fill={active ? "#fff" : "none"} stroke={active ? "#fff" : "currentColor"} strokeWidth="1.8"/>
    </svg>
  );
}
function IconShop({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0" fill={active ? "rgba(26,107,58,.2)" : "none"}/>
    </svg>
  );
}
function IconCart({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="21" r="1"/>
      <circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
    </svg>
  );
}
function IconDelivery({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="3" width="15" height="13" rx="2"/>
      <path d="M16 8h4l3 5v4h-7V8z"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  );
}
function IconUser({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "rgba(26,107,58,.15)" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}

export function MobileBottomNav({ page, cartQty, user, onOpenCart, goPage, onOpenUser }) {
  const isHome      = page === "home";
  const isShop      = page === "produits" || page === "seoCity" || page === "merchHub";
  const isDelivery  = page === "livraison";
  const isDash      = page === "dashboard";

  const navItem = useCallback((label, icon, isActive, onClick) => (
    <button
      key={label}
      className={`mbn-item${isActive ? " mbn-item--active" : ""}`}
      onClick={onClick}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="mbn-icon">{icon}</span>
      <span className="mbn-label">{label}</span>
    </button>
  ), []);

  return (
    <nav className="mobile-bottom-nav" aria-label="Navigation principale">
      {navItem("Accueil",  <IconHome active={isHome} />,     isHome,     () => goPage("home"))}
      {navItem("Boutique", <IconShop active={isShop} />,     isShop,     () => goPage("produits"))}

      {/* Cart — centre pill button */}
      <button
        className="mbn-cart-btn"
        onClick={onOpenCart}
        aria-label={`Panier${cartQty > 0 ? ` — ${cartQty} article${cartQty > 1 ? "s" : ""}` : ""}`}
      >
        <IconCart />
        {cartQty > 0 && (
          <span className="mbn-cart-badge" aria-hidden="true">
            {cartQty > 99 ? "99+" : cartQty}
          </span>
        )}
      </button>

      {navItem("Livraison", <IconDelivery active={isDelivery} />, isDelivery, () => goPage("livraison"))}
      {navItem(user ? "Mon compte" : "Connexion", <IconUser active={isDash} />, isDash, user ? () => goPage("dashboard") : onOpenUser)}
    </nav>
  );
}
