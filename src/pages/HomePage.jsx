// ═══════════════════════════════════════════════════════════════
//  YORIX CM — HOMEPAGE PREMIUM v3 (+ fusion : promo strip, wa mobile,
//  classe home-premium pour hovers ProdGrid, CSS externe + reduced-motion)
// ═══════════════════════════════════════════════════════════════

import { useCallback, useState, useEffect, useRef } from "react";
import { FlashCountdown } from "../components/FlashCountdown";
import { ProdGrid } from "../components/ProdGrid";
import { CITIES } from "../lib/constants";
import { ContentIcon } from "../lib/contentIcons";
import { HomePremiumMerch } from "../components/home/HomePremiumMerch";
import { HomeCategoryGrid } from "../components/categories/HomeCategoryGrid";
import { HomeTrendingProducts } from "../components/home/HomeTrendingProducts";
import { HomeBuyerSellerCta } from "../components/home/HomeBuyerSellerCta";
import { HomeBrandStory } from "../components/home/HomeBrandStory";
import { HomeSocialProof } from "../components/home/HomeSocialProof";
import { HomeEscrowTrust } from "../components/home/HomeEscrowTrust";
import { categoryLabel } from "../lib/marketplaceCategories";
import { SEO_CITIES } from "../lib/seoRoutes";
import { supabase, YORIX_WA_NUMBER } from "../lib/supabase";
import { usePlatformStats } from "../hooks/usePlatformStats";
import { formatPlatformStat } from "../lib/platformStats";
import homePremiumCss from "./homePageV3Premium.css?raw";

/** Services secondaires — visibles sans diluer le message principal */
const SECONDARY_PATHS = [
  { key: "livraison", labelFr: "Livraison", labelEn: "Delivery", iconKey: "truck" },
  { key: "escrow", labelFr: "Escrow", labelEn: "Escrow", iconKey: "shield" },
  { key: "prestataires", labelFr: "Services", labelEn: "Services", iconKey: "wrench" },
  { key: "aide", labelFr: "Aide", labelEn: "Help", iconKey: "lifeBuoy" },
];

const TRUST_BADGES = [
  { iconKey: "shield", t: "Escrow — argent protégé" },
  { iconKey: "smartphone", t: "MTN MoMo & Orange Money" },
  { iconKey: "check", t: "Vendeurs vérifiés" },
  { iconKey: "truck", t: "Livraison suivie" },
  { iconKey: "messageCircle", t: "Support WhatsApp 7j/7" },
  { iconKey: "flag", t: "Entreprise camerounaise" },
];

const TESTIMONIALS = [
  {
    quote: "J'avais peur de payer en ligne. Avec l'escrow Yorix, je savais que mon argent était protégé jusqu'à réception.",
    author: "Marie N.",
    meta: "Douala · Acheteuse",
    avatar: "M",
    color: "#1a6b3a",
    stars: 5,
  },
  {
    quote: "Mes clients paient en MoMo sans crainte grâce à l'escrow. Plus de « je paierai à la livraison » qui ne paie jamais.",
    author: "Jean-Paul K.",
    meta: "Vendeur mode · Yaoundé",
    avatar: "J",
    color: "#f59e0b",
    stars: 5,
  },
  {
    quote: "Enfin une alternative sérieuse à Facebook — vendeurs vérifiés, livraison suivie et quelqu'un au bout du WhatsApp.",
    author: "Sophie A.",
    meta: "Acheteuse · Douala",
    avatar: "S",
    color: "#7c3aed",
    stars: 5,
  },
];

const SEO_FAQS = [
  {
    q: "Pourquoi acheter sur Yorix plutôt que sur Facebook ?",
    a: "Sur Facebook, vous payez sans garantie. Sur Yorix, votre argent reste bloqué en escrow jusqu'à ce que vous confirmiez la livraison. Vendeurs vérifiés, suivi commande et support WhatsApp inclus.",
  },
  {
    q: "Comment fonctionne l'Escrow Yorix ?",
    a: "Vous payez (MoMo, Orange Money ou carte). Yorix conserve les fonds. Le vendeur expédie. Vous validez la réception — seulement alors le vendeur est payé. En cas de litige, notre équipe intervient.",
  },
  {
    q: "Comment commander rapidement sur Yorix.cm ?",
    a: "Recherchez un produit ou une ville, ajoutez au panier ou contactez le support WhatsApp. Paiement sécurisé et livraison suivie à chaque étape.",
  },
];

export function HomePage({
  siteLocale = "fr",
  filterCat = "",
  setFilterCat = () => {},
  search = "",
  setSearch = () => {},
  produitsLoading,
  produits = [],
  user,
  userData,
  wishlist = [],
  addToCart = () => {},
  toggleWish = () => {},
  openProductUrl = () => {},
  openSellerUrl,
  setOnboardingOpen = () => {},
  goPage = () => {},
  categoryTree = [],
  goToCategory = () => {},
  allServices = [],
  nlEmail = "",
  setNlEmail = () => {},
  nlSent,
  setNlSent = () => {},
  freeShippingThresholdXaf = 50000,
}) {
  const [quickCity, setQuickCity] = useState("");
  const safeProduits = Array.isArray(produits) ? produits : [];
  const safeServices = Array.isArray(allServices) ? allServices : [];
  const isEn = siteLocale === "en";
  const { stats: platformStats, isLoading: statsLoading } = usePlatformStats();

  const handleHeroSearch = useCallback(() => {
    const cityEntry = SEO_CITIES.find((c) => c.name === quickCity);
    if (cityEntry) {
      goPage("seoCity", { citySlug: cityEntry.slug, mode: "acheter" });
      return;
    }
    goPage("produits");
  }, [goPage, quickCity]);

  const th = Number(freeShippingThresholdXaf) || 50000;

  // ── Scroll-reveal : active tous les .yx-reveal de la page d'accueil
  const homeRef = useRef(null);
  useEffect(() => {
    const container = homeRef.current;
    if (!container) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      container.querySelectorAll(".yx-reveal").forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      }),
      { threshold: 0.05, rootMargin: "60px 0px 0px 0px" }
    );
    const tid = setTimeout(() => {
      container.querySelectorAll(".yx-reveal").forEach((el) => io.observe(el));
    }, 50);
    return () => { clearTimeout(tid); io.disconnect(); };
  }, []);

  const submitNewsletter = async () => {
    const email = nlEmail?.trim();
    if (!email || !email.includes("@")) return;
    try {
      const { error } = await supabase.from("newsletter").insert({ email });
      if (error) console.warn(error.message);
    } catch (e) {
      console.warn(e?.message);
    }
    setNlSent(true);
  };

  return (
    <>
      <style>{homePremiumCss}</style>

      <div className="home-premium yorix-home-v3 anim" ref={homeRef}>
        <div className="yhm3-marquee" role="region" aria-label="Avantages Yorix">
          <div className="yhm3-marquee-track">
            {[...TRUST_BADGES, ...TRUST_BADGES].map((b, i) => (
              <span key={`${b.t}-${i}`} className="yhm3-marquee-item">
                <span aria-hidden><ContentIcon name={b.iconKey} size={14} /></span> {b.t}
              </span>
            ))}
          </div>
        </div>

        <header className="yhm3-hero">
          <div className="yhm3-hero-mesh" aria-hidden="true" />
          <div className="yhm3-orb1" aria-hidden="true" />
          <div className="yhm3-orb2" aria-hidden="true" />
          <div className="yhm3-hero-inner">
            <div className="yhm3-hero-grid">
              <div>
                <span className="yhm3-eyebrow">
                  <span className="yhm3-eyebrow-dot" /> <ContentIcon name="flag" size={14} style={{ display: "inline", verticalAlign: "middle" }} />{" "}
                  {isEn ? "Cameroonian company · Secure checkout" : "Entreprise camerounaise · Paiement sécurisé"}
                </span>

                <h1 className="yhm3-h1">
                  {isEn ? (
                    <>
                      Shop safely across
                      <br />
                      <em>all of Cameroon</em>
                    </>
                  ) : (
                    <>
                      Achetez sans risque
                      <br />
                      <em>partout au Cameroun</em>
                    </>
                  )}
                </h1>

                <p className="yhm3-sub">
                  {isEn ? (
                    <>
                      Your money is only released to the seller <strong>after delivery</strong>. MTN MoMo, Orange Money,
                      verified sellers and tracked delivery — a marketplace built in Cameroon, for Cameroonians.
                    </>
                  ) : (
                    <>
                      Votre argent n&apos;est versé au vendeur <strong>qu&apos;après la livraison</strong>. MTN MoMo,
                      Orange Money, vendeurs vérifiés et livraison suivie — une marketplace 100 % camerounaise.
                    </>
                  )}
                </p>

                <div className="yhm3-hero-ctas yx-reveal yx-reveal-d2">
                  <button type="button" className="yhm3-btn yhm3-btn--pri" onClick={() => goPage("produits")}>
                    {isEn ? "Shop now" : "Acheter"}
                  </button>
                  <button type="button" className="yhm3-btn yhm3-btn--sec" onClick={() => goPage("devenirVendeur")}>
                    {isEn ? "Sell" : "Vendre"}
                  </button>
                  <button
                    type="button"
                    className="yhm3-btn yhm3-btn--wa"
                    onClick={() =>
                      window.open(
                        `https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent("Bonjour Yorix ! Je veux commander rapidement.")}`,
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{flexShrink:0}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Commander via WhatsApp
                  </button>
                </div>

                <div className="yhm3-hero-trust yx-reveal yx-reveal-d3">
                  <div className="yhm3-trust-pill yhm3-trust-pill--escrow">
                    <ContentIcon name="shield" size={13} />
                    {isEn ? "Escrow protected" : "Escrow — argent protégé"}
                  </div>
                  <div className="yhm3-trust-pill">
                    <ContentIcon name="lock" size={13} />
                    {isEn ? "Secure payment" : "Paiement sécurisé"}
                  </div>
                  <div className="yhm3-trust-pill">
                    <ContentIcon name="check" size={13} />
                    {isEn ? "Verified sellers" : "Vendeurs vérifiés"}
                  </div>
                  <div className="yhm3-trust-pill">
                    <ContentIcon name="truck" size={13} />
                    {isEn ? "Tracked delivery" : "Livraison suivie"}
                  </div>
                  <div className="yhm3-trust-pill">
                    <ContentIcon name="messageCircle" size={13} />
                    {isEn ? "WhatsApp support" : "WhatsApp 7j/7"}
                  </div>
                  <button type="button" className="yhm3-trust-pill yhm3-trust-pill--link" onClick={() => goPage("cgv")}>
                    <ContentIcon name="refresh" size={13} />
                    {isEn ? "Refund policy" : "Remboursement"}
                  </button>
                </div>

                <div className="yhm3-hero-stats">
                  <div>
                    <div className="yhm3-hero-stat-val">
                      {platformStats ? formatPlatformStat(platformStats.products) : "180+"}
                    </div>
                    <div className="yhm3-hero-stat-lbl">{isEn ? "Products" : "Produits"}</div>
                  </div>
                  <div>
                    <div className="yhm3-hero-stat-val">
                      {platformStats ? formatPlatformStat(platformStats.sellers) : "48+"}
                    </div>
                    <div className="yhm3-hero-stat-lbl">{isEn ? "Sellers" : "Vendeurs"}</div>
                  </div>
                  <div>
                    <div className="yhm3-hero-stat-val">
                      {platformStats ? formatPlatformStat(platformStats.orders) : "350+"}
                    </div>
                    <div className="yhm3-hero-stat-lbl">{isEn ? "Delivered orders" : "Commandes livrées"}</div>
                  </div>
                  <div>
                    <div className="yhm3-hero-stat-val">{platformStats?.cities || 10}+</div>
                    <div className="yhm3-hero-stat-lbl">{isEn ? "Cities" : "Villes"}</div>
                  </div>
                </div>
              </div>

              <aside className="yhm3-search-panel" aria-label="Recherche rapide">
                <div className="yhm3-search-trust-bar">
                  <span className="yhm3-search-trust-dot" />
                  <span>Catalogue en ligne · mis à jour en temps réel</span>
                </div>
                <div className="yhm3-search-head">
                  <div className="yhm3-search-title">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--hm-green)" strokeWidth="2.5" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    Trouver en quelques secondes
                  </div>
                  <p className="yhm3-search-sub">Filtres synchronisés avec le catalogue live.</p>
                </div>

                <div className="yhm3-search-row">
                  <select
                    className="yhm3-search-select"
                    value={filterCat}
                    onChange={(e) => setFilterCat(e.target.value)}
                    aria-label="Catégorie"
                  >
                    <option value="">Toutes catégories</option>
                    {categoryTree.map((r) => (
                      <option key={r.id || r.slug} value={categoryLabel(r, siteLocale)}>
                        {categoryLabel(r, siteLocale)}
                      </option>
                    ))}
                  </select>
                  <input
                    className="yhm3-search-input"
                    placeholder="Produit, marque, mot-clé…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Recherche"
                  />
                </div>

                <div className="yhm3-search-row">
                  <select
                    className="yhm3-search-select"
                    value={quickCity}
                    onChange={(e) => setQuickCity(e.target.value)}
                    aria-label="Ville"
                  >
                    <option value="">Toutes les villes</option>
                    {CITIES.filter((c) => !/^toutes/i.test(c)).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <input
                    className="yhm3-search-input"
                    placeholder="Budget max (FCFA)"
                    readOnly
                    tabIndex={-1}
                    style={{ opacity: 0.65 }}
                  />
                </div>

                <button type="button" className="yhm3-search-cta" onClick={handleHeroSearch}>
                  <ContentIcon name="search" size={16} /> Lancer la recherche
                </button>

                <div className="yhm3-search-trends">
                  <span className="yhm3-search-trends-lbl">Tendances</span>
                  {["Pagne wax", "iPhone", "Karité", "BTP"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="yhm3-search-tag"
                      onClick={() => {
                        setSearch(s);
                        goPage("produits");
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <div className="yhm3-search-perks">
                  <div className="yhm3-perk-item">
                    <div className="yhm3-perk-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                    </div>
                    <div>
                      Livraison offerte dès{" "}
                      <strong>{th.toLocaleString("fr-FR")} FCFA</strong>
                      {" · "}
                      <button type="button" onClick={() => goPage("bonsPlans")}>
                        Détails
                      </button>
                    </div>
                  </div>
                  <div className="yhm3-perk-item">
                    <div className="yhm3-perk-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                    </div>
                    <div>Paiement MTN MoMo &amp; Orange Money accepté</div>
                  </div>
                  <div className="yhm3-perk-item">
                    <div className="yhm3-perk-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <div>Escrow protection · paiement à la livraison</div>
                  </div>
                  <div className="yhm3-perk-item">
                    <div className="yhm3-perk-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <div>Support WhatsApp 7j/7 · réponse rapide</div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </header>

        <HomeEscrowTrust locale={siteLocale} goPage={goPage} />

        <HomeBuyerSellerCta
          locale={siteLocale}
          onBrowse={() => goPage("produits")}
          onSell={() => goPage("devenirVendeur")}
        />

        <HomeTrendingProducts
          produits={safeProduits}
          locale={siteLocale}
          loading={produitsLoading}
          user={user}
          userData={userData}
          addToCart={addToCart}
          toggleWish={toggleWish}
          wishlist={wishlist}
          openProductUrl={openProductUrl}
          openSellerUrl={openSellerUrl}
          onSeeAll={() => goPage("merchHub", { merchHub: "produits-tendance" })}
        />

        <section className="yhm3-section">
          <div className="yhm3-section-head">
            <div>
              <span className="yhm3-eyebrow-light">{isEn ? "Catalog" : "Catalogue"}</span>
              <h2 className="yhm3-h2">
                {isEn ? "Popular " : "Produits "}
                <em>{isEn ? "products" : "populaires"}</em>
              </h2>
              <p className="yhm3-lead">
                {isEn
                  ? "A daily selection from verified Cameroonian sellers — every purchase protected by escrow."
                  : "Une sélection quotidienne de vendeurs camerounais — chaque achat protégé par l'escrow."}
              </p>
            </div>
            <button type="button" className="yhm3-section-link" onClick={() => goPage("produits")}>
              {isEn ? "View all" : "Tout voir"} <span>→</span>
            </button>
          </div>

          {produitsLoading ? (
            <div className="yhm3-loading">
              <div className="yhm3-spinner" />
              {isEn ? "Loading catalog…" : "Chargement du catalogue…"}
            </div>
          ) : safeProduits.length === 0 ? (
            <div className="yhm3-empty">
              <div className="yhm3-empty-ico"><ContentIcon name="shoppingBag" size={32} /></div>
              <p>{isEn ? "Catalog filling up — check back soon." : "Le catalogue se remplit — revenez très vite."}</p>
            </div>
          ) : (
            <ProdGrid
              prods={safeProduits.slice(0, 10)}
              user={user}
              userData={userData}
              onAddToCart={addToCart}
              onWish={toggleWish}
              wishlist={wishlist}
              onOpenProductUrl={openProductUrl}
              onOpenSellerUrl={openSellerUrl}
            />
          )}
        </section>

        {categoryTree.length > 0 && (
          <HomeCategoryGrid
            tree={categoryTree}
            locale={siteLocale}
            onCategoryClick={(v) => goToCategory?.(v)}
            onSeeAll={() => goPage("produits")}
          />
        )}

        <section className="yhm3-section">
          <div className="yhm3-section-head yhm3-section-head--center">
            <span className="yhm3-eyebrow-light">{isEn ? "Testimonials" : "Témoignages"}</span>
            <h2 className="yhm3-h2 yhm3-h2--center">
              {isEn ? "They " : "Ils "}
              <em>{isEn ? "trust Yorix" : "nous font confiance"}</em>
            </h2>
            <p className="yhm3-lead yhm3-lead--center">
              {isEn
                ? "Buyers and sellers who chose security over informal deals."
                : "Acheteurs et vendeurs qui ont choisi la sécurité plutôt que les achats informels."}
            </p>
          </div>

          <div className="yhm3-stories">
            {TESTIMONIALS.map((t, i) => (
              <figure key={t.author} className={`yhm3-story yx-reveal yx-reveal-d${Math.min(i + 1, 4)}`} style={{ "--story-color": t.color }}>
                <div className="yhm3-story-stars" aria-label={`${t.stars} sur 5`}>
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <ContentIcon key={si} name="star" size={12} />
                  ))}
                </div>
                <blockquote className="yhm3-story-quote">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="yhm3-story-foot">
                  <div className="yhm3-story-av">{t.avatar}</div>
                  <div>
                    <div className="yhm3-story-name">{t.author}</div>
                    <div className="yhm3-story-meta">{t.meta}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <HomeSocialProof locale={siteLocale} stats={platformStats} isLoading={statsLoading} />

        <section className="yhm3-section">
          <div className="yhm3-flash-toolbar">
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span className="yhm3-flash-pill"><ContentIcon name="zap" size={12} /> Temps limité</span>
              <h2 className="yhm3-h2" style={{ marginBottom: 0, fontSize: "1.5rem" }}>
                Offres flash du <em>jour</em>
              </h2>
            </div>
            <div className="yhm3-flash-end">
              <span>Fin dans</span>
              <FlashCountdown />
            </div>
          </div>

          <div className="yhm3-flash-banner">
            <div className="yhm3-flash-banner-left">
              <div className="yhm3-flash-title"><ContentIcon name="zap" size={18} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} /> Sélection éclair · high-tech & lifestyle</div>
              <div className="yhm3-flash-sub">Paiement MoMo / Orange · stocks limités selon vendeurs partenaires</div>
            </div>
            <button
              type="button"
              className="yhm3-btn yhm3-btn--green"
              onClick={() => {
                setFilterCat("Téléphones & HighTech");
                goPage("produits");
              }}
            >
              Voir les promos →
            </button>
          </div>

          {!produitsLoading && safeProduits.length > 0 && (
            <ProdGrid
              prods={safeProduits.slice(0, 4).map((p, i) => ({
                ...p,
                flash: i < 2,
                promo: i >= 2 && i < 4,
                promo_pct: i === 2 ? 20 : i === 3 ? 15 : 0,
              }))}
              user={user}
              userData={userData}
              onAddToCart={addToCart}
              onWish={toggleWish}
              wishlist={wishlist}
              onOpenProductUrl={openProductUrl}
              onOpenSellerUrl={openSellerUrl}
            />
          )}
        </section>

        <HomePremiumMerch goPage={goPage} produits={safeProduits} locale={siteLocale} />

        <HomeBrandStory locale={siteLocale} />

        <section className="yhm3-section--tinted" aria-labelledby="seo-faq-title">
          <div className="yhm3-section-head yhm3-section-head--center">
            <span className="yhm3-eyebrow-light">{isEn ? "FAQ" : "Questions fréquentes"}</span>
            <h2 id="seo-faq-title" className="yhm3-h2 yhm3-h2--center">
              {isEn ? "Quick answers before you " : "Réponses rapides avant de "}
              <em>{isEn ? "order" : "commander"}</em>
            </h2>
            <p className="yhm3-lead yhm3-lead--center">
              {isEn
                ? "Trust, escrow and delivery — the questions every buyer asks."
                : "Confiance, escrow et livraison — les questions que se posent tous les acheteurs."}
            </p>
          </div>

          <div style={{ maxWidth: 860, margin: "0 auto", display: "grid", gap: 12 }}>
            {SEO_FAQS.map((item) => (
              <details
                key={item.q}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: "14px 16px",
                }}
              >
                <summary style={{ cursor: "pointer", fontWeight: 800, color: "var(--ink)" }}>{item.q}</summary>
                <p style={{ color: "var(--gray)", fontSize: ".9rem", lineHeight: 1.7, marginTop: 10 }}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="yhm3-section">
          <div className="yhm3-section-head">
            <div>
              <span className="yhm3-eyebrow-light">Prestataires</span>
              <h2 className="yhm3-h2">
                Prestataires <em>sélectionnés</em>
              </h2>
              <p className="yhm3-lead">Des talents camerounais vérifiés pour vos besoins du quotidien.</p>
            </div>
            <button type="button" className="yhm3-section-link" onClick={() => goPage("prestataires")}>
              Marketplace services <span>→</span>
            </button>
          </div>

          <div className="yhm3-prest-grid">
            {safeServices.length === 0 ? (
              <div className="yhm3-empty" style={{ gridColumn: "1/-1" }}>
                <div className="yhm3-empty-ico"><ContentIcon name="wrench" size={32} /></div>
                <p>Les talents arrivent — explorez bientôt la vitrine services.</p>
              </div>
            ) : (
              safeServices.slice(0, 3).map((s) => (
                <article key={s.id} className="yhm3-prest-card">
                  <div className="yhm3-prest-top">
                    <div className="yhm3-prest-av"><ContentIcon name="userCircle" size={28} /></div>
                    <div>
                      <div className="yhm3-prest-name">{s.provider_nom || "Prestataire"}</div>
                      <div className="yhm3-prest-meta">{s.nom}</div>
                    </div>
                  </div>
                  <div className="yhm3-prest-tags">
                    {s.categorie && <span className="yhm3-ptag">{s.categorie}</span>}
                    {s.ville && <span className="yhm3-ptag"><ContentIcon name="mapPin" size={11} /> {s.ville}</span>}
                  </div>
                  <div className="yhm3-prest-foot">
                    <div>
                      <div className="yhm3-prest-price">{Number(s.prix).toLocaleString()} F</div>
                      <div className="yhm3-prest-note" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <ContentIcon name="star" size={12} /> {s.note || 0} · {s.nombre_avis || 0} avis
                      </div>
                    </div>
                    <button
                      type="button"
                      className="yhm3-btn-hire"
                      onClick={() =>
                        window.open(
                          `https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent(
                            `Bonjour Yorix ! Projet : ${s.nom} (${s.provider_nom})`,
                          )}`,
                          "_blank",
                          "noopener,noreferrer",
                        )
                      }
                    >
                      Contacter
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <div className="yhm3-secondary-strip yhm3-secondary-strip--footer yx-reveal" aria-label={isEn ? "More on Yorix" : "Aussi sur Yorix"}>
          <span className="yhm3-secondary-strip__lbl">{isEn ? "Also on Yorix" : "Aussi sur Yorix"}</span>
          {SECONDARY_PATHS.map((p) => (
            <button key={p.key} type="button" className="yhm3-secondary-pill" onClick={() => goPage(p.key)}>
              <ContentIcon name={p.iconKey} size={13} /> {isEn ? p.labelEn : p.labelFr}
            </button>
          ))}
        </div>

        <section className="yhm3-section">
          <div className="yhm3-nl">
            <div className="yhm3-nl-left">
              <span className="yhm3-eyebrow">
                <span className="yhm3-eyebrow-dot" /> Newsletter Yorix
              </span>
              <h2 className="yhm3-h2 yhm3-h2--on-dark">
                {isEn ? "Deals & " : "Bons plans & "}
                <em>{isEn ? "new arrivals" : "nouveautés"}</em>
              </h2>
              <p className="yhm3-sub" style={{ color: "rgba(255,255,255,.78)" }}>
                {isEn
                  ? "Exclusive deals, new sellers in your city — no spam."
                  : "Offres exclusives, nouveaux vendeurs dans votre ville — sans spam."}
              </p>
              <ul className="yhm3-nl-perks">
                <li>
                  <span aria-hidden><ContentIcon name="gift" size={14} /></span> {isEn ? "Exclusive deals" : "Bons plans exclusifs"}
                </li>
                <li>
                  <span aria-hidden><ContentIcon name="mapPin" size={14} /></span> {isEn ? "New city hubs" : "Nouvelles villes"}
                </li>
                <li>
                  <span aria-hidden><ContentIcon name="shield" size={14} /></span> {isEn ? "Escrow tips" : "Conseils escrow"}
                </li>
              </ul>
            </div>

            <form
              className="yhm3-nl-form"
              onSubmit={(e) => {
                e.preventDefault();
                submitNewsletter();
              }}
              noValidate
            >
              {nlSent ? (
                <div className="yhm3-nl-success"><ContentIcon name="partyPopper" size={18} /> Merci ! Vous êtes inscrit(e).</div>
              ) : (
                <>
                  <label htmlFor="yhm3-nl-email" className="yhm3-nl-lbl">
                    VOTRE MEILLEUR EMAIL
                  </label>
                  <div className="yhm3-nl-row">
                    <input
                      id="yhm3-nl-email"
                      type="email"
                      className="yhm3-nl-inp"
                      placeholder="vous@email.cm"
                      value={nlEmail}
                      onChange={(e) => setNlEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                    <button type="submit" className="yhm3-btn yhm3-btn--pri">
                      Rejoindre <ContentIcon name="rocket" size={16} />
                    </button>
                  </div>
                  <p className="yhm3-nl-note"><ContentIcon name="lock" size={12} /> RGPD · désinscription en un clic depuis chaque envoi.</p>
                </>
              )}
            </form>
          </div>
        </section>

        <section className="yhm3-section">
          <div className="yhm3-final">
            <div className="yhm3-final-inner">
              <span className="yhm3-eyebrow">
                <span className="yhm3-eyebrow-dot" /> Prêt à commencer ?
              </span>
              <h2 className="yhm3-h2 yhm3-h2--on-dark">
                {isEn ? (
                  <>
                    Buy and sell with
                    <br />
                    <em>complete peace of mind</em>
                  </>
                ) : (
                  <>
                    Achetez et vendez en
                    <br />
                    <em>toute confiance</em>
                  </>
                )}
              </h2>
              <p className="yhm3-sub" style={{ color: "rgba(255,255,255,.78)" }}>
                {isEn ? (
                  <>
                    <strong style={{ color: "#fff" }}>Escrow on every order</strong> · MoMo & Orange Money · WhatsApp support 7/7.
                    The Cameroonian marketplace where your money is protected.
                  </>
                ) : (
                  <>
                    <strong style={{ color: "#fff" }}>Escrow sur chaque commande</strong> · MoMo & Orange Money · WhatsApp 7j/7.
                    La marketplace camerounaise où votre argent est protégé.
                  </>
                )}
              </p>

              <div className="yhm3-final-actions">
                <button type="button" className="yhm3-btn yhm3-btn--pri" onClick={() => goPage("produits")}>
                  <ContentIcon name="shoppingBag" size={16} /> {isEn ? "Shop now" : "Acheter maintenant"}
                </button>
                <button type="button" className="yhm3-btn yhm3-btn--sec" onClick={() => goPage("devenirVendeur")}>
                  <ContentIcon name="store" size={16} /> {isEn ? "Become a seller" : "Devenir vendeur"}
                </button>
              </div>

              <ul className="yhm3-final-trust">
                <li>
                  <span aria-hidden><ContentIcon name="shield" size={14} /></span> Escrow inclus
                </li>
                <li>
                  <span aria-hidden><ContentIcon name="flag" size={14} /></span> {isEn ? "100% Cameroon" : "100% Cameroun"}
                </li>
                <li>
                  <span aria-hidden><ContentIcon name="smartphone" size={14} /></span> Mobile Money
                </li>
                <li>
                  <span aria-hidden><ContentIcon name="check" size={14} /></span> {isEn ? "Verified sellers" : "Vendeurs vérifiés"}
                </li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
