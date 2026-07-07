import { useTranslation } from "react-i18next";
import { Moon, Sun, Rocket, Phone, LifeBuoy, LogIn, User, Package, Search, Flag, ShoppingCart, Menu } from "lucide-react";
import { roleLabel } from "../../i18n/index.js";
import { EMOTIONAL_NAV } from "../../lib/merchHubs";
import { ContentIcon } from "../../lib/contentIcons";
import { categoryLabel } from "../../lib/marketplaceCategories";
import { productMatchesSearch } from "../../lib/productSearch";
import { NAV_QUICK_ICONS, LucideIcon } from "../../lib/lucideNavIcons";
import { CategoryMobileNav } from "../categories/CategoryMobileNav";
import { NotificationBell } from "../NotificationBell";
import { OptimizedImage } from "../OptimizedImage";
import { Button } from "../ui/Button";
import "../categories/categoryUi.css";
import "./marketplaceHeader.css";

export function YorixHeader({
  navCompact,
  dark,
  setDark,
  user,
  userData,
  userRole,
  goPage,
  siteLocale = "fr",
  switchLocale,
  filterCat,
  setFilterCat,
  categoryTree = [],
  goToCategory,
  search,
  setSearch,
  produits,
  onOpenProduct,
  onOpenCommandPalette,
  setOnboardingOpen,
  onNotifsSync,
  onOpenNotification,
  onMarkNotifRead,
  notifRevision = 0,
  unreadNotifs = 0,
  totalQty,
  openCart,
  onOpenUserMenu,
  setAuthTab,
  setAuthOpen,
  setSelectedRole,
  doLogout,
  navQuickRef,
  navQuickOpen,
  setNavQuickOpen,
  tabActive: _tabActive,
  roleChipClass,
}) {
  const { t } = useTranslation("nav");
  const localeTag = siteLocale === "en" ? "en-FR" : "fr-FR";
  const cmdKLabel =
    typeof navigator !== "undefined" && /Mac|iPhone|iPad/i.test(navigator.platform)
      ? "⌘K"
      : "Ctrl+K";

  return (
    <div className={`header-sticky-stack header-sticky-stack--slim${navCompact ? " header-sticky-stack--compact" : ""}`}>
      <div className="topbar">
        <div className="topbar-l">
          <div className="flag-wrap">
            <span className="flag">
              <span className="fg" />
              <span className="fr" />
              <span className="fy" />
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              {t("topbar.cameroon")} <Flag size={14} aria-hidden />
            </span>
          </div>
          <span
            role="group"
            aria-label={t("sticky_lang_hint", { ns: "common" })}
            style={{ display: "inline-flex", gap: 6, alignItems: "center", userSelect: "none" }}
          >
            <button
              type="button"
              onClick={() => switchLocale?.("fr")}
              style={{
                cursor: "pointer",
                fontWeight: siteLocale === "fr" ? 700 : 500,
                opacity: siteLocale === "fr" ? 1 : 0.7,
                background: "none",
                border: "none",
                color: "inherit",
                padding: 0,
                font: "inherit",
              }}
              aria-pressed={siteLocale === "fr"}
            >
              FR
            </button>
            <span aria-hidden style={{ opacity: 0.45 }}>
              |
            </span>
            <button
              type="button"
              onClick={() => switchLocale?.("en")}
              style={{
                cursor: "pointer",
                fontWeight: siteLocale === "en" ? 700 : 500,
                opacity: siteLocale === "en" ? 1 : 0.7,
                background: "none",
                border: "none",
                color: "inherit",
                padding: 0,
                font: "inherit",
              }}
              aria-pressed={siteLocale === "en"}
            >
              EN
            </button>
          </span>
          <span><LucideIcon icon={Phone} size={14} /> +237 696 56 56 54</span>
        </div>
        <div className="topbar-r">
          <button type="button" className="topbar-link" onClick={() => goPage("aide")}>
            <LucideIcon icon={LifeBuoy} size={14} /> {t("topbar.help")}
          </button>
          <button type="button" className="topbar-link" onClick={() => goPage("contact")}>
            <LucideIcon icon={Phone} size={14} /> {t("topbar.contact")}
          </button>
          {user ? (
            <span style={{ color: "#b7e4c7", display: "inline-flex", alignItems: "center", gap: 4 }}>
              <LucideIcon icon={User} size={14} /> {userData?.nom || user.email?.split("@")[0]}
            </span>
          ) : (
            <button
              type="button"
              className="topbar-link"
              onClick={() => {
                setAuthTab("login");
                setAuthOpen(true);
              }}
            >
              <LucideIcon icon={LogIn} size={14} /> {t("topbar.login")}
            </button>
          )}
        </div>
      </div>

      <nav className="navbar navbar--yorix-mobile navbar--marketplace navbar--slim">
        <div className="logo-wrap" onClick={() => goPage("home")}>
          <div className="logo-txt">
            Yo<span>rix</span>
            <sup>CM</sup>
          </div>
        </div>

        <div className="nav-search-wrap" ref={navQuickRef}>
          <div className="nav-search nav-search--breathing">
            <select
              className="nav-search-cat-desktop"
              value={filterCat}
              onChange={(e) => {
                const v = e.target.value;
                setFilterCat(v);
                const root = categoryTree.find((r) => categoryLabel(r, siteLocale) === v);
                if (root) goToCategory?.({ parentSlug: root.slug });
                else if (!v) goPage("produits");
              }}
              aria-label={t("search.ariaCategory")}
            >
              <option value="">{t("search.allCategories")}</option>
              {categoryTree.map((r) => (
                <option key={r.id || r.slug} value={categoryLabel(r, siteLocale)}>
                  {categoryLabel(r, siteLocale)}
                </option>
              ))}
            </select>
            <div className="nav-search-field">
              <input
                placeholder={t("search.placeholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") goPage("produits");
                  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                    e.preventDefault();
                    onOpenCommandPalette?.();
                  }
                }}
                autoComplete="off"
                aria-label={t("search.ariaSearch")}
                aria-expanded={search.trim().length >= 2}
                aria-haspopup="listbox"
              />
              {onOpenCommandPalette && !search.trim() && (
                <button
                  type="button"
                  className="nav-search-cmd-hint"
                  onClick={() => onOpenCommandPalette()}
                  aria-label={siteLocale === "en" ? "Open command palette" : "Ouvrir la palette de commande"}
                >
                  <kbd>{cmdKLabel}</kbd>
                </button>
              )}
            </div>
            {search.trim().length >= 2 && (
              <div className="nav-search-dd" role="listbox" aria-label={t("search.ariaSuggestions")}>
                {produits
                  .filter((p) => productMatchesSearch(p, search))
                  .slice(0, 8)
                  .map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className="nav-search-dd-item"
                      role="option"
                      onClick={() => {
                        setSearch("");
                        if (onOpenProduct) onOpenProduct(p);
                        else goPage("produits");
                      }}
                    >
                      {(p.image?.startsWith("http") || (p.image_urls?.[0]?.startsWith("http"))) ? (
                        <OptimizedImage
                          src={p.image?.startsWith("http") ? p.image : p.image_urls?.[0]}
                          alt=""
                          size="thumb"
                          className="nav-search-dd-img"
                          style={{ width: 40, height: 40, minHeight: 40 }}
                        />
                      ) : (
                        <span className="nav-search-dd-img nav-search-dd-ph" aria-hidden>
                          <Package size={18} strokeWidth={2} />
                        </span>
                      )}
                      <div style={{ minWidth: 0 }}>
                        <div className="nav-search-dd-t">{p.name_fr}</div>
                        <div className="nav-search-dd-p">{p.prix?.toLocaleString(localeTag)} FCFA</div>
                      </div>
                    </button>
                  ))}
                {produits.filter((p) => productMatchesSearch(p, search)).length === 0 && (
                  <div className="nav-search-dd-empty">
                    Aucun résultat pour « {search} » — touche Entrée pour ouvrir le catalogue filtré.
                  </div>
                )}
              </div>
            )}
            <button type="button" className="nav-search-submit" onClick={() => goPage("produits")} aria-label={t("search.ariaSubmit")}>
              <Search size={16} strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>

          {navQuickOpen && (
            <div className="nav-quick-panel nav-quick-panel--navbar" role="dialog" aria-label={t("actions.navDialog")}>
              <div className="nav-quick-mega-cols">
                {categoryTree.length > 0 && (
                  <div className="nav-quick-section" style={{ gridColumn: "1 / -1" }}>
                    <CategoryMobileNav
                      tree={categoryTree}
                      locale={siteLocale}
                      onNavigate={(v) => {
                        setNavQuickOpen(false);
                        goToCategory?.(v);
                      }}
                    />
                  </div>
                )}
                <div className="nav-quick-section">
                  <h4>{t("quickNav.marketplace")}</h4>
                  <div className="nav-quick-links">
                    {[
                      { key: "produits", l: t("tabs.products"), p: "produits" },
                      { key: "bonsPlans", l: t("tabs.deals"), p: "bonsPlans" },
                      { key: "prestataires", l: t("tabs.providers"), p: "prestataires" },
                      { key: "cart", l: t("quickNav.cartSecure"), p: "cart" },
                      { key: "livraison", l: t("quickNav.deliveryTrack"), p: "livraison" },
                    ].map((x) => {
                      const Icon = NAV_QUICK_ICONS[x.key];
                      return (
                        <button
                          key={x.p}
                          type="button"
                          onClick={() => {
                            setNavQuickOpen(false);
                            goPage(x.p);
                          }}
                        >
                          <span className="nav-quick-ico">{Icon && <Icon size={16} strokeWidth={2.25} />}</span>
                          <span>{x.l}</span>
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() => {
                        setNavQuickOpen(false);
                        goPage("merchHub", { merchHub: "sourcer-en-gros" });
                      }}
                    >
                      <span className="nav-quick-ico"><Package size={16} strokeWidth={2.25} /></span>
                      <span>{siteLocale === "en" ? "Wholesale" : "Sourcer en gros"}</span>
                    </button>
                  </div>
                </div>
                <div className="nav-quick-section">
                  <h4>{siteLocale === "en" ? "Highlights" : "Sélections"}</h4>
                  <div className="nav-quick-links">
                    {EMOTIONAL_NAV.map((item) => {
                      const label = siteLocale === "en" ? item.labelEn : item.labelFr;
                      return (
                        <button
                          key={item.hub || item.page || item.alias}
                          type="button"
                          onClick={() => {
                            setNavQuickOpen(false);
                            if (item.hub) goPage("merchHub", { merchHub: item.hub });
                            else if (item.page === "seoAlias" && item.alias) goPage("business", { seoAlias: item.alias });
                            else goPage(item.page);
                          }}
                        >
                          <span className="nav-quick-ico"><ContentIcon name={item.iconKey} size={16} /></span>
                          <span>{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="nav-quick-section">
                  <h4>{t("quickNav.trust")}</h4>
                  <div className="nav-quick-links">
                    {[
                      { key: "escrow", l: t("quickNav.escrowBuyer"), p: "escrow" },
                      { key: "business", l: t("tabs.business"), p: "business" },
                      { key: "academy", l: t("tabs.academy"), p: "academy" },
                      { key: "blog", l: t("quickNav.blogTrends"), p: "blog" },
                      { key: "loyalty", l: t("quickNav.loyaltyProgram"), p: "loyalty" },
                    ].map((x) => {
                      const Icon = NAV_QUICK_ICONS[x.key];
                      return (
                        <button
                          key={x.p}
                          type="button"
                          onClick={() => {
                            setNavQuickOpen(false);
                            goPage(x.p);
                          }}
                        >
                          <span className="nav-quick-ico">{Icon && <Icon size={16} strokeWidth={2.25} />}</span>
                          <span>{x.l}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="nav-quick-section">
                  <h4>{t("quickNav.support")}</h4>
                  <div className="nav-quick-links">
                    <button type="button" onClick={() => { setNavQuickOpen(false); goPage("contact"); }}>
                      <span className="nav-quick-ico"><Phone size={16} strokeWidth={2.25} /></span>
                      <span>{t("quickNav.contactSupport")}</span>
                    </button>
                    <button type="button" onClick={() => { setNavQuickOpen(false); goPage("aide"); }}>
                      <span className="nav-quick-ico"><LifeBuoy size={16} strokeWidth={2.25} /></span>
                      <span>{t("quickNav.helpSos")}</span>
                    </button>
                    <button type="button" onClick={() => { setNavQuickOpen(false); goPage("faq"); }}>
                      <span className="nav-quick-ico"><LucideIcon icon={NAV_QUICK_ICONS.faq} size={16} /></span>
                      <span>{t("quickNav.faqMarketplace")}</span>
                    </button>
                    <button type="button" onClick={() => { setNavQuickOpen(false); setOnboardingOpen(true); }}>
                      <span className="nav-quick-ico"><Rocket size={16} strokeWidth={2.25} /></span>
                      <span>{t("actions.getStarted")}</span>
                    </button>
                    <button type="button" onClick={() => setDark((d) => !d)}>
                      <span className="nav-quick-ico">{dark ? <Sun size={16} /> : <Moon size={16} />}</span>
                      <span>{dark ? t("actions.lightMode") : t("actions.darkMode")}</span>
                    </button>
                    <button type="button" onClick={() => switchLocale?.(siteLocale === "fr" ? "en" : "fr")}>
                      <span className="nav-quick-ico"><Flag size={16} strokeWidth={2.25} /></span>
                      <span>{siteLocale === "fr" ? "English (EN)" : "Français (FR)"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="icon-btn nav-menu-btn"
            aria-expanded={navQuickOpen}
            aria-label={siteLocale === "en" ? "Menu" : "Menu"}
            onClick={() => setNavQuickOpen((o) => !o)}
          >
            <Menu size={20} strokeWidth={2.25} aria-hidden />
          </button>

          {user && (
            <NotificationBell
              user={user}
              goPage={goPage}
              siteLocale={siteLocale}
              onSync={onNotifsSync}
              onOpenNotification={onOpenNotification}
              onMarkNotifRead={onMarkNotifRead}
              notifRevision={notifRevision}
              unreadNotifs={unreadNotifs}
            />
          )}

          <button type="button" className="icon-btn" onClick={openCart} title={t("actions.cart")} aria-label={t("actions.cart")}>
            <ShoppingCart size={18} strokeWidth={2} aria-hidden="true" />
            {totalQty > 0 && <span className="ibadge">{totalQty}</span>}
          </button>

          <div className="user-menu-mobile">
            <button
              type="button"
              className="user-menu-trigger umd-trigger"
              aria-label={user ? t("actions.mySpace") : t("topbar.login")}
              onClick={onOpenUserMenu}
            >
              {user ? (userData?.nom || user.email || "?")[0].toUpperCase() : (
                <Menu size={18} strokeWidth={2} aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="nav-auth-desktop">
            {!user ? (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="btn-ghost"
                  onClick={() => {
                    setAuthTab("login");
                    setAuthOpen(true);
                  }}
                >
                  {t("actions.loginShort")}
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  className="btn-green"
                  onClick={() => {
                    setAuthTab("register");
                    setSelectedRole("buyer");
                    setAuthOpen(true);
                  }}
                >
                  {t("actions.register")}
                </Button>
              </>
            ) : (
              <>
                <span className={`role-chip ${roleChipClass()}`}>{roleLabel(t, userRole || "buyer")}</span>
                <button
                  type="button"
                  className="user-av"
                  onClick={() => goPage("dashboard")}
                  title={t("actions.mySpace")}
                  aria-label={t("actions.mySpace")}
                >
                  {(userData?.nom || user.email || "?")[0].toUpperCase()}
                </button>
                <button type="button" className="btn-red" onClick={doLogout} title={t("actions.logout")}>
                  {t("actions.logout")}
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
