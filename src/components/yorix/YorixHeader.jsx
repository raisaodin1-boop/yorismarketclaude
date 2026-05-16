import { useTranslation } from "react-i18next";
import { CATS } from "../../lib/constants";
import { roleLabel } from "../../i18n/index.js";

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
  search,
  setSearch,
  produits,
  setOnboardingOpen,
  setNotifOpen,
  unread,
  totalQty,
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
          <span>📞 +237 696 56 56 54</span>
        </div>
        <div className="topbar-r">
          <span onClick={() => goPage("aide")}>🆘 {t("topbar.help")}</span>
          <span onClick={() => goPage("contact")}>📞 {t("topbar.contact")}</span>
          {user ? (
            <span style={{ color: "#b7e4c7" }}>👤 {userData?.nom || user.email?.split("@")[0]}</span>
          ) : (
            <span
              onClick={() => {
                setAuthTab("login");
                setAuthOpen(true);
              }}
            >
              🔑 {t("topbar.login")}
            </span>
          )}
        </div>
      </div>

      <nav className="navbar">
        <div className="logo-wrap" onClick={() => goPage("home")}>
          <div className="logo-txt">
            Yo<span>rix</span>
            <sup>CM</sup>
          </div>
        </div>

        <div className="nav-search-wrap">
          <div className="nav-search">
            <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} aria-label={t("search.ariaCategory")}>
              <option value="">{t("search.allCategories")}</option>
              {CATS.map((c) => (
                <option key={c}>{c}</option>
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
                          📦
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
              🔍
            </button>
          </div>
        </div>

        <div className="nav-actions">
          <button type="button" className="nav-cta-onboard" onClick={() => setOnboardingOpen(true)} title={t("actions.getStartedTitle")}>
            🚀 {t("actions.getStarted")}
          </button>

          <button type="button" className="dark-toggle" onClick={() => setDark((d) => !d)} title={dark ? t("actions.lightMode") : t("actions.darkMode")}>
            {dark ? "☀️" : "🌙"}
          </button>

          {user && (
            <button type="button" className="icon-btn" onClick={() => setNotifOpen((o) => !o)} title={t("actions.notifications")}>
              🔔
              {unread > 0 && <span className="ibadge">{unread}</span>}
            </button>
          )}

          <button type="button" className="icon-btn" onClick={() => goPage("cart")} title={t("actions.cart")}>
            🛒
            {totalQty > 0 && <span className="ibadge">{totalQty}</span>}
          </button>

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
                🔑 Connexion
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
                🚀 {t("actions.register")}
              </button>
            </>
          ) : (
            <>
              <span className={`role-chip ${roleChipClass()}`}>{roleLabel(t, userRole || "buyer")}</span>
              <div className="user-av" onClick={() => goPage("dashboard")} title={t("actions.mySpace")}>
                {(userData?.nom || user.email || "?")[0].toUpperCase()}
              </div>
              <button type="button" className="btn-red" onClick={doLogout} title={t("actions.logout")}>
                🚪 {t("actions.logout")}
              </button>
            </>
          )}
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
            ☰ {t("actions.navigation")}
          </button>
          {navQuickOpen && (
            <div className="nav-quick-panel" role="dialog" aria-label={t("actions.navDialog")}>
              <div className="nav-quick-mega-cols">
                <div className="nav-quick-section">
                  <h4>{t("quickNav.marketplace")}</h4>
                  <div className="nav-quick-links">
                    {[
                      { ic: "🏠", l: t("quickNav.home"), p: "home" },
                      { ic: "🛍️", l: t("quickNav.catalog"), p: "produits" },
                      { ic: "🛒", l: t("quickNav.cartSecure"), p: "cart" },
                      { ic: "🏷️", l: t("quickNav.dealsNow"), p: "bonsPlans" },
                      { ic: "🚚", l: t("quickNav.deliveryTrack"), p: "livraison" },
                    ].map((x) => (
                      <button
                        key={x.p}
                        type="button"
                        onClick={() => {
                          setNavQuickOpen(false);
                          goPage(x.p);
                        }}
                      >
                        <span className="nav-quick-ico">{x.ic}</span>
                        <span>{x.l}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="nav-quick-section">
                  <h4>{t("quickNav.trust")}</h4>
                  <div className="nav-quick-links">
                    {[
                      { ic: "🔐", l: t("quickNav.escrowBuyer"), p: "escrow" },
                      { ic: "🧑‍🔧", l: t("quickNav.providersVerified"), p: "prestataires" },
                      { ic: "💼", l: t("tabs.business"), p: "business" },
                      { ic: "🎓", l: t("tabs.academy"), p: "academy" },
                      { ic: "📰", l: t("quickNav.blogTrends"), p: "blog" },
                      { ic: "⭐", l: t("quickNav.loyaltyProgram"), p: "loyalty" },
                    ].map((x) => (
                      <button
                        key={x.p}
                        type="button"
                        onClick={() => {
                          setNavQuickOpen(false);
                          goPage(x.p);
                        }}
                      >
                        <span className="nav-quick-ico">{x.ic}</span>
                        <span>{x.l}</span>
                      </button>
                    ))}
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
                      <span className="nav-quick-ico">📞</span>
                      <span>{t("quickNav.contactSupport")}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setNavQuickOpen(false);
                        goPage("aide");
                      }}
                    >
                      <span className="nav-quick-ico">🆘</span>
                      <span>{t("quickNav.helpSos")}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setNavQuickOpen(false);
                        goPage("faq");
                      }}
                    >
                      <span className="nav-quick-ico">❓</span>
                      <span>{t("quickNav.faqMarketplace")}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pay-strip">
        <b style={{ color: "var(--ink)" }}>{t("payStrip.payment")}</b>
        <div className="pay-methods">
          <span className="pm mtn-b">📱 {t("payStrip.momo")}</span>
          <span className="pm ora-b">🔶 {t("payStrip.orange")}</span>
          <span className="pm">💳 {t("payStrip.card")}</span>
          <span className="pm">💵 {t("payStrip.cash")}</span>
        </div>
        <div className="strip-right">
          <span>🚚 {t("payStrip.deliveryJ1")}</span>
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
          <span>🔐 {t("payStrip.escrowSecure")}</span>
          {user && <span style={{ color: "var(--gold)" }}>👤 {userData?.nom || user.email}</span>}
        </div>
      </div>
    </div>
  );
}
