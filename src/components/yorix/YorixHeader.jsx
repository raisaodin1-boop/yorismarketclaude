import { CATS, ROLE_LABELS } from "../../lib/constants";

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
            <span>Cameroun 🇨🇲</span>
          </div>
          <span
            role="group"
            aria-label="Langue du site"
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
          <span onClick={() => goPage("aide")}>🆘 Aide</span>
          <span onClick={() => goPage("contact")}>📞 Contact</span>
          {user ? (
            <span style={{ color: "#b7e4c7" }}>👤 {userData?.nom || user.email?.split("@")[0]}</span>
          ) : (
            <span
              onClick={() => {
                setAuthTab("login");
                setAuthOpen(true);
              }}
            >
              🔑 Se connecter
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
            <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} aria-label="Filtrer par catégorie">
              <option value="">Tout</option>
              {CATS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input
              placeholder="Produit, marque, mot-clé…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && goPage("produits")}
              autoComplete="off"
              aria-label="Rechercher dans le catalogue"
              aria-expanded={search.trim().length >= 2}
              aria-haspopup="listbox"
            />
            {search.trim().length >= 2 && (
              <div className="nav-search-dd" role="listbox" aria-label="Suggestions catalogue">
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
                        <div className="nav-search-dd-p">{p.prix?.toLocaleString()} FCFA</div>
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
            <button type="button" onClick={() => goPage("produits")} aria-label="Lancer la recherche catalogue">
              🔍
            </button>
          </div>
        </div>

        <div className="nav-actions">
          <button type="button" className="nav-cta-onboard" onClick={() => setOnboardingOpen(true)} title="Que cherchez-vous ?">
            🚀 Démarrer
          </button>

          <button type="button" className="dark-toggle" onClick={() => setDark((d) => !d)} title={dark ? "Mode clair" : "Mode sombre"}>
            {dark ? "☀️" : "🌙"}
          </button>

          {user && (
            <button type="button" className="icon-btn" onClick={() => setNotifOpen((o) => !o)} title="Notifications">
              🔔
              {unread > 0 && <span className="ibadge">{unread}</span>}
            </button>
          )}

          <button type="button" className="icon-btn" onClick={() => goPage("cart")} title="Mon panier">
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
                🚀 S'inscrire
              </button>
            </>
          ) : (
            <>
              <span className={`role-chip ${roleChipClass()}`}>{ROLE_LABELS[userRole || "buyer"]}</span>
              <div className="user-av" onClick={() => goPage("dashboard")} title="Mon espace">
                {(userData?.nom || user.email || "?")[0].toUpperCase()}
              </div>
              <button type="button" className="btn-red" onClick={doLogout} title="Déconnexion">
                🚪 Déconnexion
              </button>
            </>
          )}
        </div>
      </nav>

      <div className="nav-tabs-row" ref={navQuickRef}>
        <nav className="nav-tabs" aria-label="Rubriques Yorix">
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
            ☰ Navigation
          </button>
          {navQuickOpen && (
            <div className="nav-quick-panel" role="dialog" aria-label="Navigation Yorix">
              <div className="nav-quick-mega-cols">
                <div className="nav-quick-section">
                  <h4>Marketplace</h4>
                  <div className="nav-quick-links">
                    {[
                      { ic: "🏠", l: "Accueil", p: "home" },
                      { ic: "🛍️", l: "Produits & catalogue", p: "produits" },
                      { ic: "🛒", l: "Panier · paiement sécurisé", p: "cart" },
                      { ic: "🏷️", l: "Bons plans du moment", p: "bonsPlans" },
                      { ic: "🚚", l: "Livraison & suivi", p: "livraison" },
                    ].map((x) => (
                      <button
                        key={x.l}
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
                  <h4>Confiance &amp; croissance</h4>
                  <div className="nav-quick-links">
                    {[
                      { ic: "🔐", l: "Escrow acheteur", p: "escrow" },
                      { ic: "🧑‍🔧", l: "Prestataires vérifiés", p: "prestataires" },
                      { ic: "💼", l: "Yorix Business", p: "business" },
                      { ic: "🎓", l: "Academy", p: "academy" },
                      { ic: "📰", l: "Blog & tendances CM", p: "blog" },
                      { ic: "⭐", l: "Programme fidélité", p: "loyalty" },
                    ].map((x) => (
                      <button
                        key={x.l}
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
                  <h4>Support Yorix</h4>
                  <div className="nav-quick-links">
                    <button
                      type="button"
                      onClick={() => {
                        setNavQuickOpen(false);
                        goPage("contact");
                      }}
                    >
                      <span className="nav-quick-ico">📞</span>
                      <span>Contact relation client</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setNavQuickOpen(false);
                        goPage("aide");
                      }}
                    >
                      <span className="nav-quick-ico">🆘</span>
                      <span>SOS · centre d&apos;aide</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setNavQuickOpen(false);
                        goPage("faq");
                      }}
                    >
                      <span className="nav-quick-ico">❓</span>
                      <span>FAQ marketplace</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pay-strip">
        <b style={{ color: "var(--ink)" }}>Paiement :</b>
        <div className="pay-methods">
          <span className="pm mtn-b">📱 MTN MoMo</span>
          <span className="pm ora-b">🔶 Orange Money</span>
          <span className="pm">💳 Carte</span>
          <span className="pm">💵 Cash</span>
        </div>
        <div className="strip-right">
          <span>🚚 J+1 Douala & Yaoundé</span>
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
            Livraison offerte dès {commerceDeliveryPolicy.freeShippingThresholdXaf.toLocaleString("fr-FR")} FCFA
          </span>
          <span>🔐 Escrow sécurisé</span>
          {user && <span style={{ color: "var(--gold)" }}>👤 {userData?.nom || user.email}</span>}
        </div>
      </div>
    </div>
  );
}
