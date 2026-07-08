import { useMemo, useRef, useState, useEffect } from "react";
import {
  Smartphone,
  Shirt,
  Sparkles,
  Sofa,
  Laptop,
  ShoppingBag,
  Flag,
  Wrench,
  Store,
  Package,
  ShieldCheck,
  Search,
  Star,
  Lock,
} from "lucide-react";
import { ProdGrid } from "../ProdGrid";
import { OptimizedImage } from "../OptimizedImage";
import { formatPlatformStat } from "../../lib/platformStats";
import { useCountUp } from "../../hooks/useCountUp";
import { HOME_UNIVERSES, TRENDING_FILTERS } from "../../lib/homeCategories";
import { computeHomepageTrendingProducts } from "../../lib/merchPlacement";
import { productMatchesMadeInFilter } from "../../lib/madeInCameroon";
import { buildEntitySlug } from "../../lib/seoRoutes";

const ICONS = {
  smartphone: Smartphone,
  shirt: Shirt,
  sparkles: Sparkles,
  sofa: Sofa,
  laptop: Laptop,
  shoppingBag: ShoppingBag,
  flag: Flag,
  wrench: Wrench,
};

const TESTIMONIALS = [
  {
    quoteFr:
      "Le système d'escrow m'a rassuré dès ma première commande. J'ai reçu mon colis en 48h à Yaoundé.",
    quoteEn:
      "Escrow gave me confidence from my first order. I received my package in 48h in Yaoundé.",
    author: "Marie N.",
    metaFr: "Yaoundé · Acheteuse",
    metaEn: "Yaoundé · Buyer",
    avatar: "M",
  },
  {
    quoteFr:
      "Mes clients paient en MoMo sans crainte. Plus de paiements à la livraison qui ne arrivent jamais.",
    quoteEn:
      "My clients pay via MoMo without fear. No more cash-on-delivery that never comes.",
    author: "Jean-Paul K.",
    metaFr: "Vendeur · Douala",
    metaEn: "Seller · Douala",
    avatar: "J",
  },
  {
    quoteFr:
      "Enfin une alternative sérieuse — vendeurs vérifiés, livraison suivie et support WhatsApp.",
    quoteEn:
      "Finally a serious alternative — verified sellers, tracked delivery and WhatsApp support.",
    author: "Sophie A.",
    metaFr: "Douala · Acheteuse",
    metaEn: "Douala · Buyer",
    avatar: "S",
  },
];

function useInView(ref) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return active;
}

export function HomeRefonteHero({ locale = "fr", goPage }) {
  const isEn = locale === "en";
  return (
    <header className="yx-hero yx-reveal">
      <div className="yx-hero__grid">
        <div>
          <span className="yx-label">{isEn ? "#1 marketplace in Cameroon" : "La marketplace #1 au Cameroun"}</span>
          <h1 className="yx-hero__title">
            {isEn ? (
              <>
                Shop with <em>confidence</em>.
                <br />
                Pay with <em>security</em>.
              </>
            ) : (
              <>
                Achetez en <em>toute confiance</em>.
                <br />
                Payez en <em>toute sécurité</em>.
              </>
            )}
          </h1>
          <p className="yx-hero__sub">
            {isEn
              ? "Escrow · Tracked delivery · Mobile Money"
              : "Escrow intégré · Livraison suivie · Mobile Money"}
          </p>
          <div className="yx-hero__ctas">
            <button type="button" className="yx-btn yx-btn--primary" onClick={() => goPage("produits")}>
              {isEn ? "Explore catalog" : "Explorer le catalogue"}
            </button>
            <button type="button" className="yx-btn yx-btn--secondary" onClick={() => goPage("devenirVendeur")}>
              {isEn ? "Sell on Yorix" : "Vendre sur Yorix"}
            </button>
          </div>
        </div>
        <div className="yx-hero__visual" aria-hidden>
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80"
            alt=""
            loading="eager"
          />
        </div>
      </div>
    </header>
  );
}

export function HomeRefonteTrustBar({ locale = "fr", stats, isLoading }) {
  const isEn = locale === "en";
  const ref = useRef(null);
  const active = useInView(ref);

  const sellers = stats?.sellers ?? 2000;
  const products = stats?.products ?? 15000;
  const cities = 3;
  const escrowPct = 100;

  const cSellers = useCountUp(sellers, active);
  const cProducts = useCountUp(products, active);

  const items = [
    { icon: Store, val: isLoading ? "…" : `${formatPlatformStat(cSellers || sellers)}`, lbl: isEn ? "Verified sellers" : "Vendeurs vérifiés" },
    { icon: Package, val: isLoading ? "…" : `${formatPlatformStat(cProducts || products)}`, lbl: isEn ? "Products available" : "Produits disponibles" },
    { icon: Flag, val: `${cities}`, lbl: isEn ? "Cities covered" : "Villes couvertes" },
    { icon: Lock, val: `${escrowPct}%`, lbl: isEn ? "Secure payments (escrow)" : "Paiements sécurisés (escrow)" },
  ];

  return (
    <section className="yx-trust yx-reveal" ref={ref} aria-label={isEn ? "Trust indicators" : "Indicateurs de confiance"}>
      <div className="yx-trust__stats">
        {items.map(({ icon: Icon, val, lbl }) => (
          <div key={lbl} className="yx-trust__stat">
            <div className="yx-trust__icon">
              <Icon size={24} strokeWidth={1.5} aria-hidden />
            </div>
            <div className="yx-trust__val">{val}</div>
            <div className="yx-trust__lbl">{lbl}</div>
          </div>
        ))}
      </div>
      <div className="yx-trust__payments">
        {["MTN MoMo", "Orange Money", "Visa", "Mastercard"].map((p) => (
          <span key={p} className="yx-trust__pay">
            {p}
          </span>
        ))}
      </div>
    </section>
  );
}

export function HomeRefonteCategories({ locale = "fr", goPage, goToCategory }) {
  const isEn = locale === "en";

  const onClick = (u) => {
    if (u.hub) goPage("merchHub", { merchHub: u.hub });
    else if (u.page) goPage(u.page);
    else if (u.slug) goToCategory?.({ parentSlug: u.slug });
    else goPage("produits");
  };

  return (
    <section className="yx-section yx-reveal" aria-labelledby="yx-cat-title">
      <div className="yx-section__inner">
        <div className="yx-section__head">
          <h2 id="yx-cat-title" className="yx-h2">
            {isEn ? "Explore our worlds" : "Explorez nos univers"}
          </h2>
          <p className="yx-lead">{isEn ? "Find exactly what you need" : "Trouvez exactement ce qu'il vous faut"}</p>
        </div>
        <div className="yx-cat-grid">
          {HOME_UNIVERSES.map((u) => {
            const Icon = ICONS[u.icon] || Package;
            return (
              <button key={u.id} type="button" className="yx-cat-card" onClick={() => onClick(u)}>
                <Icon className="yx-cat-card__icon" size={40} strokeWidth={1.5} aria-hidden />
                <span className="yx-cat-card__label">{isEn ? u.labelEn : u.labelFr}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HomeRefonteTrending({
  locale = "fr",
  produits = [],
  loading,
  user,
  userData,
  addToCart,
  toggleWish,
  wishlist,
  openProductUrl,
  openSellerUrl,
  goPage,
}) {
  const isEn = locale === "en";
  const [filter, setFilter] = useState("all");
  const base = useMemo(() => computeHomepageTrendingProducts(produits, 24), [produits]);

  const filtered = useMemo(() => {
    const f = TRENDING_FILTERS.find((x) => x.id === filter) || TRENDING_FILTERS[0];
    return base.filter(f.match).slice(0, 8);
  }, [base, filter]);

  return (
    <section className="yx-section yx-section--alt yx-reveal" aria-labelledby="yx-trend-title">
      <div className="yx-section__inner">
        <div className="yx-section__head">
          <h2 id="yx-trend-title" className="yx-h2">
            {isEn ? "Trending now" : "Tendances du moment"}
          </h2>
          <p className="yx-lead">{isEn ? "Curated selection by our team" : "Sélection curatée par notre équipe"}</p>
        </div>
        <div className="yx-trend-filters" role="tablist">
          {TRENDING_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              className={`yx-trend-pill${filter === f.id ? " is-active" : ""}`}
              onClick={() => setFilter(f.id)}
            >
              {isEn ? f.labelEn : f.labelFr}
            </button>
          ))}
        </div>
        <div className="yx-trend-grid">
          {loading ? (
            <div className="yx-loading">{isEn ? "Loading…" : "Chargement…"}</div>
          ) : filtered.length === 0 ? (
            <div className="yx-loading">{isEn ? "Catalog updating soon." : "Catalogue bientôt disponible."}</div>
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
            />
          )}
        </div>
        <div className="yx-trend-cta">
          <button type="button" onClick={() => goPage("produits")}>
            {isEn ? "View full catalog →" : "Voir tout le catalogue →"}
          </button>
        </div>
      </div>
    </section>
  );
}

export function HomeRefonteHowItWorks({ locale = "fr" }) {
  const isEn = locale === "en";
  const steps = isEn
    ? [
        { icon: Search, title: "Find", desc: "Browse thousands of products from verified sellers across Cameroon." },
        { icon: ShieldCheck, title: "Pay securely", desc: "Funds held in escrow. The seller is paid only after you confirm delivery." },
        { icon: Package, title: "Receive", desc: "Tracked delivery via Yorix Ride. Confirm receipt — simple." },
      ]
    : [
        { icon: Search, title: "Trouvez", desc: "Parcourez des milliers de produits de vendeurs vérifiés dans tout le Cameroun." },
        { icon: ShieldCheck, title: "Payez en sécurité", desc: "Votre paiement est bloqué en escrow. Le vendeur n'est payé qu'après votre confirmation." },
        { icon: Package, title: "Recevez", desc: "Livraison suivie via Yorix Ride. Confirmez la réception — c'est simple." },
      ];

  return (
    <section className="yx-section yx-reveal" aria-labelledby="yx-how-title">
      <div className="yx-section__inner">
        <div className="yx-section__head">
          <h2 id="yx-how-title" className="yx-h2">
            {isEn ? "Buy in 3 simple steps" : "Achetez en 3 étapes simples"}
          </h2>
          <p className="yx-lead">
            {isEn
              ? "Your money is protected at every step thanks to our escrow system."
              : "Votre argent est protégé à chaque étape grâce à notre système d'escrow."}
          </p>
        </div>
        <div className="yx-steps">
          {steps.map((s, i) => (
            <div key={s.title} className="yx-step">
              <div className="yx-step__num">{String(i + 1).padStart(2, "0")}</div>
              <div className="yx-step__icon-wrap">
                <s.icon size={28} strokeWidth={1.5} aria-hidden />
              </div>
              <h3 className="yx-step__title">{s.title}</h3>
              <p className="yx-step__desc">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="yx-escrow-note">
          <Lock size={20} strokeWidth={1.5} aria-hidden />
          <span>
            {isEn
              ? "Escrow-secured payments — your money is protected until you confirm delivery."
              : "Paiements sécurisés par escrow — votre argent est protégé tant que vous n'avez pas confirmé la réception."}
          </span>
        </div>
      </div>
    </section>
  );
}

export function HomeRefonteMadeIn({ locale = "fr", produits = [], goPage, openProductUrl }) {
  const isEn = locale === "en";
  const madeIn = useMemo(() => produits.filter(productMatchesMadeInFilter).slice(0, 4), [produits]);

  if (madeIn.length === 0) return null;

  return (
    <section className="yx-mic yx-reveal" aria-labelledby="yx-mic-title">
      <div className="yx-mic__bg" aria-hidden />
      <div className="yx-mic__inner">
        <div>
          <span className="yx-label" style={{ color: "#34d399" }}>
            {isEn ? "Local pride" : "Fierté locale"}
          </span>
          <h2 id="yx-mic-title" className="yx-mic__title">
            Made in Cameroun
          </h2>
          <p className="yx-mic__sub">
            {isEn
              ? "Discover creators, artisans and brands that make Cameroon rich."
              : "Découvrez les créateurs, artisans et marques qui font la richesse du Cameroun."}
          </p>
          <button type="button" className="yx-btn yx-btn--white" onClick={() => goPage("merchHub", { merchHub: "made-in-cameroun" })}>
            {isEn ? "Explore Made in Cameroon →" : "Explorer Made in Cameroun →"}
          </button>
        </div>
        <div className="yx-mic__scroll">
          {madeIn.map((p) => (
            <article
              key={p.id}
              className="prod-card prod-card--compact"
              role="button"
              tabIndex={0}
              onClick={() =>
                openProductUrl
                  ? openProductUrl(p)
                  : goPage("productDetail", { productSlug: buildEntitySlug(p.name_fr, p.id) })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  openProductUrl
                    ? openProductUrl(p)
                    : goPage("productDetail", { productSlug: buildEntitySlug(p.name_fr, p.id) });
                }
              }}
            >
              <div className="prod-img-wrap">
                <OptimizedImage src={p.image || p.image_urls?.[0]} alt={p.name_fr || ""} size="card" fallbackEmoji="🇨🇲" />
              </div>
              <div className="prod-info">
                <div className="prod-name prod-name--rule3">{p.name_fr}</div>
                <div className="prod-price-row prod-price-row--rule3">
                  <span className="price">
                    {p.prix?.toLocaleString()} <span className="price-unit">FCFA</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeRefonteTestimonials({ locale = "fr", stats }) {
  const isEn = locale === "en";
  const rating = stats?.rating ?? 4.8;
  const orders = stats?.orders ?? 12000;

  return (
    <section className="yx-section yx-section--alt yx-reveal" aria-labelledby="yx-testi-title">
      <div className="yx-section__inner">
        <div className="yx-section__head">
          <h2 id="yx-testi-title" className="yx-h2">
            {isEn ? "What our clients say" : "Ce que disent nos clients"}
          </h2>
          <p className="yx-lead">
            {isEn
              ? "Thousands of buyers and sellers trust us every day."
              : "Des milliers d'acheteurs et vendeurs nous font confiance chaque jour."}
          </p>
        </div>
        <div className="yx-testi-grid">
          {TESTIMONIALS.map((t) => (
            <figure key={t.author} className="yx-testi-card">
              <div className="yx-testi-stars" aria-label="5/5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="#F59E0B" stroke="#F59E0B" aria-hidden />
                ))}
              </div>
              <blockquote className="yx-testi-quote">&ldquo;{isEn ? t.quoteEn : t.quoteFr}&rdquo;</blockquote>
              <figcaption className="yx-testi-foot">
                <div className="yx-testi-av">{t.avatar}</div>
                <div>
                  <div className="yx-testi-name">{t.author}</div>
                  <div className="yx-testi-meta">{isEn ? t.metaEn : t.metaFr}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="yx-testi-band">
          <span>⭐ {rating}/5 {isEn ? "average rating" : "note moyenne"}</span>
          <span>·</span>
          <span>{formatPlatformStat(orders)} {isEn ? "orders delivered" : "commandes livrées"}</span>
          <span>·</span>
          <span>98% {isEn ? "satisfaction" : "de satisfaction"}</span>
        </div>
      </div>
    </section>
  );
}

export function HomeRefonteFinalCta({ locale = "fr", goPage, setOnboardingOpen }) {
  const isEn = locale === "en";
  return (
    <section className="yx-final yx-reveal" aria-labelledby="yx-final-title">
      <h2 id="yx-final-title" className="yx-final__title">
        {isEn ? "Ready to join the Yorix community?" : "Prêt à rejoindre la communauté Yorix ?"}
      </h2>
      <p className="yx-final__sub">
        {isEn
          ? "Whether you're a buyer, seller or provider — there's a place for you."
          : "Que vous soyez acheteur, vendeur ou prestataire — votre place est ici."}
      </p>
      <div className="yx-final__actions">
        <button
          type="button"
          className="yx-btn yx-btn--white"
          onClick={() => (setOnboardingOpen ? setOnboardingOpen(true) : goPage("auth"))}
        >
          {isEn ? "Create my free account" : "Créer mon compte gratuitement"}
        </button>
        <button type="button" className="yx-btn yx-btn--white-outline" onClick={() => goPage("devenirVendeur")}>
          {isEn ? "Sell on Yorix" : "Vendre sur Yorix"}
        </button>
      </div>
    </section>
  );
}
