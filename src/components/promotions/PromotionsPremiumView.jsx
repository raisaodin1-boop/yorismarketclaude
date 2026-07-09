import { useEffect, useMemo, useState } from "react";
import { ProdGrid } from "../ProdGrid";
import { FlashCountdown } from "../FlashCountdown";
import { useMerchHubProducts } from "../../hooks/useMerchHubProducts";
import { effectiveProductPrice, isPromoActive, productPromoListPrice } from "../../lib/productPricing";
import { productMatchesMadeInFilter } from "../../lib/madeInCameroon";
import { computeCityTrendingProducts } from "../../lib/merchPlacement";
import "../../pages/promotionsPage.css";

const BANNERS = [
  { id: "momo", emoji: "📱", title: "Journée Mobile Money", sub: "−20 % · Orange Money & MTN MoMo", bg: "linear-gradient(135deg,#0d6b3e,#1a3a24)" },
  { id: "ship", emoji: "🚚", title: "Livraison gratuite", sub: "Dès le seuil panier atteint", bg: "linear-gradient(135deg,#065f46,#0d6b3e)" },
  { id: "mic", emoji: "🇨🇲", title: "Made in Cameroon", sub: "Fierté locale · artisans vérifiés", bg: "linear-gradient(135deg,#14532d,#166534)" },
  { id: "bf", emoji: "🛍️", title: "Black Friday Yorix", sub: "Jusqu'à −70 % sur sélection", bg: "linear-gradient(135deg,#1e1b4b,#312e81)" },
  { id: "ramadan", emoji: "🌙", title: "Soldes Ramadan", sub: "Offres spéciales alimentation", bg: "linear-gradient(135deg,#78350f,#92400e)" },
  { id: "school", emoji: "🎒", title: "Back to School", sub: "Fournitures & tech étudiante", bg: "linear-gradient(135deg,#1e40af,#2563eb)" },
];

const FILTERS = [
  { id: "all", fr: "Tout", en: "All", match: () => true },
  { id: "flash", fr: "⚡ Flash Sale", en: "⚡ Flash Sale", match: (p) => p.flash },
  { id: "tech", fr: "📱 Tech", en: "📱 Tech", match: (p) => /tech|phone|smart|informatique|électronique|electronique/i.test(String(p.categorie || p.name_fr || "")) },
  { id: "food", fr: "🥑 Alimentaire", en: "🥑 Food", match: (p) => /aliment|food|épicerie|epicerie|boisson/i.test(String(p.categorie || p.name_fr || "")) },
  { id: "auto", fr: "🚗 Auto", en: "🚗 Auto", match: (p) => /auto|moto|véhicule|vehicule/i.test(String(p.categorie || p.name_fr || "")) },
  { id: "mode", fr: "👗 Mode", en: "👗 Fashion", match: (p) => /mode|vêtement|vetement|chaussure|beauté|beaute/i.test(String(p.categorie || p.name_fr || "")) },
  { id: "home", fr: "🏠 Maison", en: "🏠 Home", match: (p) => /maison|déco|deco|meuble|cuisine/i.test(String(p.categorie || p.name_fr || "")) },
  { id: "mic", fr: "🇨🇲 Made in CM", en: "🇨🇲 Made in CM", match: (p) => productMatchesMadeInFilter(p) },
  { id: "popular", fr: "🔥 Populaire", en: "🔥 Popular", match: (p) => (Number(p.vente_total) || 0) >= 3 || p.sponsorise },
];

const LOCAL_CITIES = [
  { slug: "douala", fr: "Douala", en: "Douala" },
  { slug: "yaoundé", fr: "Yaoundé", en: "Yaoundé" },
  { slug: "bafoussam", fr: "Bafoussam", en: "Bafoussam" },
  { slug: "kribi", fr: "Kribi", en: "Kribi" },
];

function PromoCountdown({ hours = 4, isEn }) {
  const [secs, setSecs] = useState(() => hours * 3600);
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : hours * 3600)), 1000);
    return () => clearInterval(t);
  }, [hours]);
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return (
    <span className="promo-countdown" aria-live="polite">
      {isEn ? "Ends in" : "Il reste"} {String(h).padStart(2, "0")}h {String(m).padStart(2, "0")}min {String(s).padStart(2, "0")}s
    </span>
  );
}

function maxPromoPct(products) {
  let max = 0;
  for (const p of products) {
    const pct = Number(p.promo_pct) || 0;
    if (pct > max) max = pct;
    if (p.prix && isPromoActive(p)) {
      const sale = effectiveProductPrice(p);
      const derived = Math.round((1 - sale / p.prix) * 100);
      if (derived > max) max = derived;
    }
  }
  return Math.min(70, Math.max(max, 15));
}

export function PromotionsPremiumView({
  locale = "fr",
  user,
  userData,
  wishlist = [],
  addToCart = () => {},
  toggleWish = () => {},
  openProductUrl = () => {},
  openSellerUrl,
  goPage = () => {},
  goToCategory,
  freeShippingThresholdXaf = 50000,
}) {
  const isEn = locale === "en";
  const { products, isLoading } = useMerchHubProducts("promotions");
  const [filter, setFilter] = useState("all");
  const [bannerIdx, setBannerIdx] = useState(0);
  const th = Number(freeShippingThresholdXaf) || 50000;
  const userCity = userData?.ville || "";

  useEffect(() => {
    const t = setInterval(() => setBannerIdx((i) => (i + 1) % BANNERS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const flashProducts = useMemo(
    () => products.filter((p) => p.flash || (isPromoActive(p) && Number(p.promo_pct) >= 20)).slice(0, 8),
    [products],
  );

  const filtered = useMemo(() => {
    const f = FILTERS.find((x) => x.id === filter) || FILTERS[0];
    let list = products.filter(f.match);
    if (userCity && filter === "all") {
      const local = list.filter((p) => String(p.ville || "").toLowerCase().includes(userCity.toLowerCase()));
      if (local.length >= 4) list = [...local, ...list.filter((p) => !local.includes(p))];
    }
    return list;
  }, [products, filter, userCity]);

  const aiPicks = useMemo(() => {
    const scored = [...products]
      .filter((p) => isPromoActive(p) || p.flash)
      .sort((a, b) => (Number(b.vente_total) || 0) - (Number(a.vente_total) || 0));
    return scored.slice(0, 6);
  }, [products]);

  const totalSavings = useMemo(
    () =>
      filtered.reduce((sum, p) => {
        if (!isPromoActive(p)) return sum;
        const list = productPromoListPrice(p);
        const sale = effectiveProductPrice(p);
        return list && sale < list ? sum + (list - sale) : sum;
      }, 0),
    [filtered],
  );

  const maxPct = useMemo(() => maxPromoPct(products), [products]);
  const banner = BANNERS[bannerIdx];

  const scrollToFlash = () => document.getElementById("promo-flash-section")?.scrollIntoView({ behavior: "smooth" });
  const scrollToGrid = () => document.getElementById("promo-grid-section")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="promo-page anim">
      {/* Hero */}
      <header className="promo-hero">
        <div className="promo-hero__inner">
          <span className="promo-hero__eyebrow">{isEn ? "Limited-time deals" : "Offres limitées"}</span>
          <h1 className="promo-hero__title">
            🔥 {isEn ? "Best deals in Cameroon" : "Les meilleures offres du Cameroun"}
          </h1>
          <p className="promo-hero__sub">
            {isEn
              ? `Save up to ${maxPct}% on verified Yorix products.`
              : `Économisez jusqu'à ${maxPct} % sur les produits vérifiés Yorix.`}
          </p>
          <div className="promo-hero__countdown-row">
            <span className="promo-hero__countdown-lbl">
              {isEn ? "Offers end in" : "Fin des offres dans"}
            </span>
            <FlashCountdown />
          </div>
          <div className="promo-hero__ctas">
            <button type="button" className="promo-btn promo-btn--primary" onClick={scrollToGrid}>
              {isEn ? "Explore deals" : "Explorer les offres"}
            </button>
            <button type="button" className="promo-btn promo-btn--flash" onClick={scrollToFlash}>
              ⚡ {isEn ? "Flash Sales" : "Voir les Flash Sales"}
            </button>
          </div>
        </div>
        <div className="promo-hero__visual" aria-hidden>
          <div className="promo-hero__visual-card">
            <span className="promo-hero__visual-pct">−{maxPct}%</span>
            <span className="promo-hero__visual-lbl">{isEn ? "Verified deals" : "Offres vérifiées"}</span>
          </div>
        </div>
      </header>

      {/* Banner slider */}
      <div className="promo-slider" role="region" aria-label={isEn ? "Campaign banners" : "Bannières campagnes"}>
        <div className="promo-slider__track" style={{ background: banner.bg }}>
          <span className="promo-slider__emoji" aria-hidden>{banner.emoji}</span>
          <div>
            <div className="promo-slider__title">{banner.title}</div>
            <div className="promo-slider__sub">{banner.sub}</div>
          </div>
        </div>
        <div className="promo-slider__dots">
          {BANNERS.map((b, i) => (
            <button
              key={b.id}
              type="button"
              className={`promo-slider__dot${i === bannerIdx ? " is-active" : ""}`}
              aria-label={b.title}
              onClick={() => setBannerIdx(i)}
            />
          ))}
        </div>
      </div>

      {/* Category filters */}
      <div className="promo-filters" role="tablist" aria-label={isEn ? "Deal categories" : "Catégories offres"}>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            className={`promo-filter-pill${filter === f.id ? " is-active" : ""}`}
            onClick={() => setFilter(f.id)}
          >
            {isEn ? f.en : f.fr}
          </button>
        ))}
      </div>

      {/* Personalization hint */}
      {userCity && (
        <p className="promo-personal">
          📍 {isEn ? `Deals near ${userCity}` : `Offres près de ${userCity}`}
          {user ? ` · ${isEn ? "Based on your profile" : "Basé sur votre profil"}` : ""}
        </p>
      )}

      {/* Savings bar */}
      {totalSavings > 0 && (
        <div className="promo-savings-bar" role="status">
          <span className="promo-savings-bar__lbl">
            {isEn ? "Today's savings on these deals" : "Aujourd'hui vous économisez"}
          </span>
          <strong className="promo-savings-bar__val">{totalSavings.toLocaleString()} FCFA</strong>
          <span className="promo-savings-bar__hint">{isEn ? "vs catalog price" : "sur ces promotions"}</span>
        </div>
      )}

      {/* Trust strip */}
      <div className="promo-trust-strip">
        {[
          isEn ? "🔒 Secure MTN MoMo & Orange Money" : "🔒 Paiement sécurisé MTN MoMo & Orange Money",
          isEn ? "🛡 Escrow until delivery confirmed" : "🛡 Escrow : vendeur payé après validation",
          isEn ? "📍 Tracked delivery" : "📍 Livraison suivie",
          isEn ? "💬 WhatsApp support" : "💬 Support WhatsApp réactif",
        ].map((t) => (
          <span key={t} className="promo-trust-chip">{t}</span>
        ))}
      </div>

      {/* Flash Sales */}
      {flashProducts.length > 0 && (
        <section id="promo-flash-section" className="promo-section promo-flash-section">
          <div className="promo-section__head">
            <h2 className="promo-section__title">⚡ {isEn ? "Flash Sales" : "Vente Flash"}</h2>
            <PromoCountdown hours={4} isEn={isEn} />
          </div>
          <div className="promo-flash-rail">
            {flashProducts.map((p) => {
              const pct = Number(p.promo_pct) || (p.prix && isPromoActive(p)
                ? Math.round((1 - effectiveProductPrice(p) / p.prix) * 100)
                : 15);
              return (
                <article
                  key={p.id}
                  className="promo-flash-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => openProductUrl(p)}
                  onKeyDown={(e) => e.key === "Enter" && openProductUrl(p)}
                >
                  <span className="promo-flash-card__pct">−{pct}%</span>
                  <div className="promo-flash-card__name">{(p.name_fr || "").slice(0, 42)}</div>
                  <div className="promo-flash-card__price">
                    {isPromoActive(p) ? effectiveProductPrice(p).toLocaleString() : p.prix?.toLocaleString()} F
                  </div>
                  <PromoCountdown hours={3 + (p.id?.charCodeAt(0) || 0) % 3} isEn={isEn} />
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* AI Recommendations */}
      {aiPicks.length >= 3 && (
        <section className="promo-section promo-ai-section">
          <h2 className="promo-section__title">✨ Yorix AI {isEn ? "recommends" : "recommande"}</h2>
          <p className="promo-section__sub">
            {isEn ? "These deals might interest you." : "Ces produits pourraient vous plaire."}
          </p>
          <ProdGrid
            prods={aiPicks}
            user={user}
            userData={userData}
            onAddToCart={addToCart}
            onWish={toggleWish}
            wishlist={wishlist}
            onOpenProductUrl={openProductUrl}
            onOpenSellerUrl={openSellerUrl}
            siteLocale={locale}
            promoMode
          />
        </section>
      )}

      {/* Main grid */}
      <section id="promo-grid-section" className="promo-section">
        <h2 className="promo-section__title">
          {filter === "all"
            ? (isEn ? "All promotions" : "Toutes les promotions")
            : (isEn ? FILTERS.find((f) => f.id === filter)?.en : FILTERS.find((f) => f.id === filter)?.fr)}
        </h2>
        {isLoading ? (
          <div className="promo-loading">{isEn ? "Loading deals…" : "Chargement des offres…"}</div>
        ) : filtered.length === 0 ? (
          <div className="promo-empty">
            <p>{isEn ? "No deals in this category yet." : "Aucune offre dans cette catégorie pour le moment."}</p>
            <button type="button" className="promo-btn promo-btn--primary" onClick={() => goPage("produits")}>
              {isEn ? "Browse catalog" : "Voir le catalogue"}
            </button>
          </div>
        ) : (
          <ProdGrid
            prods={filtered}
            user={user}
            userData={userData}
            onAddToCart={addToCart}
            onWish={toggleWish}
            wishlist={wishlist}
            onOpenProductUrl={openProductUrl}
            onOpenSellerUrl={openSellerUrl}
            siteLocale={locale}
            promoMode
          />
        )}
      </section>

      {/* Local promotions */}
      <section className="promo-section promo-local-section">
        <h2 className="promo-section__title">
          🔥 {isEn ? "Local deals" : "Promotions locales"}
        </h2>
        <div className="promo-local-grid">
          {LOCAL_CITIES.map((city) => {
            const cityProds = computeCityTrendingProducts(
              products.filter((p) => isPromoActive(p) || p.flash),
              city.fr,
              { limit: 4 },
            );
            if (cityProds.length === 0) return null;
            return (
              <div key={city.slug} className="promo-local-block">
                <h3 className="promo-local-block__title">
                  🔥 {isEn ? `${city.en} deals` : `Promotions ${city.fr}`}
                </h3>
                <ul className="promo-local-list">
                  {cityProds.slice(0, 3).map((p) => (
                    <li key={p.id}>
                      <button type="button" className="promo-local-item" onClick={() => openProductUrl(p)}>
                        <span className="promo-local-item__name">{(p.name_fr || "").slice(0, 36)}</span>
                        <span className="promo-local-item__price">
                          {isPromoActive(p) ? effectiveProductPrice(p).toLocaleString() : p.prix?.toLocaleString()} F
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Gamification mission */}
      <section className="promo-mission">
        <div className="promo-mission__icon" aria-hidden>🎁</div>
        <div>
          <h3 className="promo-mission__title">{isEn ? "Mission" : "Mission"}</h3>
          <p className="promo-mission__desc">
            {isEn
              ? `Buy 3 promotional items → free standard delivery (from ${th.toLocaleString()} F threshold combined).`
              : `Achetez 3 promotions → livraison standard offerte (seuil ${th.toLocaleString()} F combiné).`}
          </p>
          <p className="promo-mission__pts">
            {isEn ? "Earn 250 Yorix points on completion." : "Cumulez 250 points Yorix à la validation."}
          </p>
        </div>
        <button type="button" className="promo-btn promo-btn--primary" onClick={() => goPage("loyalty")}>
          {isEn ? "View rewards" : "Voir les récompenses"}
        </button>
      </section>

      {/* Free shipping reminder */}
      <div className="fs-ship-banner fs-ship-banner--won promo-ship-banner">
        <span className="fs-ship-eyebrow fs-ship-eyebrow--gold">{isEn ? "Marketplace offer" : "Offre marketplace"}</span>
        <div className="fs-ship-title">
          {isEn ? "Free delivery from" : "Livraison offerte dès"} {th.toLocaleString("fr-FR")} FCFA
        </div>
      </div>

      {/* Newsletter */}
      <section className="promo-newsletter">
        <h3 className="promo-newsletter__title">
          {isEn ? "Don't miss the next flash sale" : "Ne ratez pas la prochaine vente flash"}
        </h3>
        <p className="promo-newsletter__sub">
          {isEn ? "Get alerts on WhatsApp and email." : "Alertes WhatsApp et email."}
        </p>
        <button type="button" className="promo-btn promo-btn--flash" onClick={() => goPage("contact")}>
          {isEn ? "Subscribe to alerts" : "S'inscrire aux alertes"}
        </button>
      </section>
    </div>
  );
}
