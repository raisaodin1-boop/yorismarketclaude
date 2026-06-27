import { useTranslation } from "react-i18next";
import { Moon, Sun, Rocket, Phone, LifeBuoy, LogIn, User, Package, Truck, Smartphone, CreditCard, Banknote, Shield, Search } from "lucide-react";
import { roleLabel } from "../../i18n/index.js";
import { EMOTIONAL_NAV } from "../../lib/merchHubs";
import { categoryLabel } from "../../lib/marketplaceCategories";
import { NAV_QUICK_ICONS, PAY_STRIP_ICONS, LucideIcon } from "../../lib/lucideNavIcons";
import { CategoryMegaMenu } from "../categories/CategoryMegaMenu";
import { CategoryMobileNav } from "../categories/CategoryMobileNav";
import { NotificationBell } from "../NotificationBell";
import { Button } from "../ui/Button";
import "../categories/categoryUi.css";

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
  TABS,
  tabActive,
  commerceDeliveryPolicy,
  roleChipClass,
}) {
  const { t } = useTranslation("nav");
  const localeTag = siteLocale === "en" ? "en-FR" : "fr-FR";
  const freeShip = commerceDeliveryPolicy.freeShippingThresholdXaf.toLocaleString(localeTag);

  return (
    <div className={`header-sticky-stack${navCompact ? " header-sticky-stack--compact" : ""}`}>
      <div className="topbar">
        <div className="topbar-l">
          <div className="flag-wrap">
            <span className="flag">
              <span className="fg" />
              <span className="fr" />
              <span className="fy" />
            </span>
            <span>{t("topbar.cameroon")} 🇨🇲</span>
          </div>
          <span
            role="group"
            aria-label={t("sticky_lang_hint", { ns: "common" })}
            style={{ display: "inline-flex", gap: 6, alignItems: "center", userSelect: "none" }}
          >
            <span
              role="button"
              tabIndex={0}
              onClick={() => switchLocale?.("fr")}
              onKeyDown={(e) => e.key === "Enter" && switchLocale?.("fr")}
              style={{
                cursor: "pointer",
                fontWeight: siteLocale === "fr" ? 700 : 500,
                opacity: siteLocale === "fr" ? 1 : 0.7,
              }}
            >
              FR
            </span>
            <span aria-hidden style={{ opacity: 0.45 }}>
              |
            </span>
            <span
              role="button"
              tabIndex={0}
              onClick={() => switchLocale?.("en")}
              onKeyDown={(e) => e.key === "Enter" && switchLocale?.("en")}
              style={{
                cursor: "pointer",
                fontWeight: siteLocale === "en" ? 700 : 500,
                opacity: siteLocale === "en" ? 1 : 0.7,
              }}
            >
              EN
            </span>
          </span>
          <span><LucideIcon icon={Phone} size={14} /> +237 696 56 56 54</span>
        </div>
        <div className="topbar-r">
          <span onClick={() => goPage("aide")}><LucideIcon icon={LifeBuoy} size={14} /> {t("topbar.help")}</span>
          <span onClick={() => goPage("contact")}><LucideIcon icon={Phone} size={14} /> {t("topbar.contact")}</span>
          {user ? (
            <span style={{ color: "#b7e4c7", display: "inline-flex", alignItems: "center", gap: 4 }}>
              <LucideIcon icon={User} size={14} /> {userData?.nom || user.email?.split("@")[0]}
            </span>
          ) : (
            <span
              onClick={() => {
                setAuthTab("login");
                setAuthOpen(true);
              }}
              style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
            >
              <LucideIcon icon={LogIn} size={14} /> {t("topbar.login")}
            </span>
          )}
        </div>
      </div>

      <nav className="navbar navbar--yorix-mobile">
        <div className="logo-wrap" onClick={() => goPage("home")}>
          <div className="logo-txt">
            Yo<span>rix</span>
            <sup>CM</sup>
          </div>
        </div>

        <span className="nav-lang-mobile" role="group" aria-label={t("sticky_lang_hint", { ns: "common" })}>
          <button
            type="button"
            className={siteLocale === "fr" ? "active" : ""}
            onClick={() => switchLocale?.("fr")}
          >
            FR
          </button>
          <span aria-hidden>|</span>
          <button
            type="button"
            className={siteLocale === "en" ? "active" : ""}
            onClick={() => switchLocale?.("en")}
          >
            EN
          </button>
        </span>

        {categoryTree.length > 0 && (
          <CategoryMegaMenu tree={categoryTree} locale={siteLocale} onNavigate={(v) => goToCategory?.(v)} />
        )}

        <div className="nav-search-wrap">
          <div className="nav-search">
            <select
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
            <input
              placeholder={t("search.placeholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && goPage("produits")}
              autoComplete="off"
              aria-label={t("search.ariaSearch")}
              aria-expanded={search.trim().length >= 2}
              aria-haspopup="listbox"
            />
            {search.trim().length >= 2 && (
              <div className="nav-search-dd" role="listbox" aria-label={t("search.ariaSuggestions")}>
                {produits
                  .filter(
                    (p) =>
                      (p.name_fr || "").toLowerCase().includes(search.toLowerCase()) ||
                      (p.description_fr || "").toLowerCase().includes(search.toLowerCase()),
                  )
                  .slice(0, 8)
                  .map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className="nav-search-dd-item"
                      role="option"
                      onClick={() => {
                        setSearch("");
                        goPage("produits");
                      }}
                    >
                      {p.image ? (
                        <img
                          src={p.image}
                          className="nav-search-dd-img"
                          alt=""
                          onError={(e) => {
                            e.currentTarget.style.visibility = "hidden";
                          }}
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
                {produits.filter((p) => (p.name_fr || "").toLowerCase().includes(search.toLowerCase())).length === 0 && (
                  <div className="nav-search-dd-empty">
                    Aucun résultat pour « {search} » — touche Entrée pour ouvrir le catalogue filtré.
                  </div>
                )}
              </div>
            )}
            <button type="button" onClick={() => goPage("produits")} aria-label={t("search.ariaSubmit")}>
              <Search size={16} strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="nav-actions">
          <Button type="button" variant="primary" size="sm" className="nav-cta-onboard" icon={Rocket} onClick={() => setOnboardingOpen(true)} title={t("actions.getStartedTitle")}>
            {t("actions.getStarted")}
          </Button>

          <button type="button" className="dark-toggle" onClick={() => setDark((d) => !d)} title={dark ? t("actions.lightMode") : t("actions.darkMode")} aria-label={dark ? t("actions.lightMode") : t("actions.darkMode")}>
            {dark ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
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

          <button type="button" className="icon-btn" onClick={openCart} title={t("actions.cart")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              )}
            </button>
          </div>

          <div className="nav-auth-desktop">
            {!user ? (
              <>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => {
                    setAuthTab("login");
                    setAuthOpen(true);
                  }}
                >
                  Connexion
                </button>
                <button
                  type="button"
                  className="btn-green"
                  onClick={() => {
                    setAuthTab("register");
                    setSelectedRole("buyer");
                    setAuthOpen(true);
                  }}
                >
                  {t("actions.register")}
                </button>
              </>
            ) : (
              <>
                <span className={`role-chip ${roleChipClass()}`}>{roleLabel(t, userRole || "buyer")}</span>
                <div className="user-av" onClick={() => goPage("dashboard")} title={t("actions.mySpace")}>
                  {(userData?.nom || user.email || "?")[0].toUpperCase()}
                </div>
                <button type="button" className="btn-red" onClick={doLogout} title={t("actions.logout")}>
                  {t("actions.logout")}
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="nav-tabs-row" ref={navQuickRef}>
        <nav className="nav-tabs" aria-label={t("actions.navigation")}>
          {TABS.map((t) => (
            <div
              key={t.p}
              className={`tab${tabActive(t.p) ? " active" : ""}`}
              onClick={() => {
                setNavQuickOpen(false);
                goPage(t.p);
              }}
              role="presentation"
            >
              {t.l}
            </div>
          ))}
        </nav>
        <div className="nav-quick-wrap">
          <button type="button" className="nav-quick-btn" aria-expanded={navQuickOpen} onClick={() => setNavQuickOpen((o) => !o)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            {t("actions.navigation")}
          </button>
          {navQuickOpen && (
            <div className="nav-quick-panel" role="dialog" aria-label={t("actions.navDialog")}>
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
                      { key: "home", l: t("quickNav.home"), p: "home" },
                      { key: "produits", l: t("quickNav.catalog"), p: "produits" },
                      { key: "cart", l: t("quickNav.cartSecure"), p: "cart" },
                      { key: "bonsPlans", l: t("quickNav.dealsNow"), p: "bonsPlans" },
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
                    );})}
                  </div>
                </div>
                <div className="nav-quick-section">
                  <h4>{t("quickNav.trust")}</h4>
                  <div className="nav-quick-links">
                    {[
                      { key: "escrow", l: t("quickNav.escrowBuyer"), p: "escrow" },
                      { key: "prestataires", l: t("quickNav.providersVerified"), p: "prestataires" },
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
                    );})}
                  </div>
                </div>
                <div className="nav-quick-section">
                  <h4>{t("quickNav.support")}</h4>
                  <div className="nav-quick-links">
                    <button
                      type="button"
                      onClick={() => {
                        setNavQuickOpen(false);
                        goPage("contact");
                      }}
                    >
                      <span className="nav-quick-ico"><Phone size={16} strokeWidth={2.25} /></span>
                      <span>{t("quickNav.contactSupport")}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setNavQuickOpen(false);
                        goPage("aide");
                      }}
                    >
                      <span className="nav-quick-ico"><LifeBuoy size={16} strokeWidth={2.25} /></span>
                      <span>{t("quickNav.helpSos")}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setNavQuickOpen(false);
                        goPage("faq");
                      }}
                    >
                      <span className="nav-quick-ico"><LucideIcon icon={NAV_QUICK_ICONS.faq} size={16} /></span>
                      <span>{t("quickNav.faqMarketplace")}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <nav className="yorix-emotional-nav" aria-label={siteLocale === "en" ? "Shop highlights" : "Sélections marketplace"}>
        {EMOTIONAL_NAV.map((item) => {
          const label = siteLocale === "en" ? item.labelEn : item.labelFr;
          const onClick = () => {
            if (item.hub) goPage("merchHub", { merchHub: item.hub });
            else if (item.page === "seoAlias" && item.alias) goPage("business");
            else goPage(item.page);
          };
          return (
            <button key={item.hub || item.page || item.alias} type="button" className="yorix-emotional-nav-btn" onClick={onClick}>
              <span aria-hidden>{item.icon}</span> {label}
            </button>
          );
        })}
      </nav>

      <div className="pay-strip">
        <b style={{ color: "var(--ink)" }}>{t("payStrip.payment")}</b>
        <div className="pay-methods">
          <span className="pm mtn-b"><LucideIcon icon={PAY_STRIP_ICONS.momo} size={14} /> {t("payStrip.momo")}</span>
          <span className="pm ora-b"><LucideIcon icon={PAY_STRIP_ICONS.orange} size={14} /> {t("payStrip.orange")}</span>
          <span className="pm"><LucideIcon icon={PAY_STRIP_ICONS.card} size={14} /> {t("payStrip.card")}</span>
          <span className="pm"><LucideIcon icon={PAY_STRIP_ICONS.cash} size={14} /> {t("payStrip.cash")}</span>
        </div>
        <div className="strip-right">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><LucideIcon icon={PAY_STRIP_ICONS.delivery} size={14} /> {t("payStrip.deliveryJ1")}</span>
          <span
            role="link"
            tabIndex={0}
            onClick={() => goPage("bonsPlans")}
            onKeyDown={(e) => e.key === "Enter" && goPage("bonsPlans")}
            style={{
              cursor: "pointer",
              fontWeight: 700,
              color: "var(--green)",
              textDecoration: "underline",
            }}
          >
            {t("payStrip.freeShippingFrom", { amount: freeShip })}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><LucideIcon icon={PAY_STRIP_ICONS.escrow} size={14} /> {t("payStrip.escrowSecure")}</span>
          {user && (
            <span style={{ color: "var(--gold)", display: "inline-flex", alignItems: "center", gap: 4 }}>
              <LucideIcon icon={User} size={14} /> {userData?.nom || user.email}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
