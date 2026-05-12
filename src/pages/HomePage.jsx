// ═══════════════════════════════════════════════════════════════════════════
// 🏆 YORIX — HOMEPAGE PREMIUM (landing page conversion-first)
// ═══════════════════════════════════════════════════════════════════════════
// Hero immersif · animations scroll-reveal · counters animés · marquee
// How-it-works · social proof · category carousel · storytelling complet
// 100% mobile-first · GPU-friendly · respecte prefers-reduced-motion
// ═══════════════════════════════════════════════════════════════════════════

import { useCallback, useMemo, useState } from "react";
import { FlashCountdown } from "../components/FlashCountdown";
import { ProdGrid } from "../components/ProdGrid";
import { CATS, CITIES } from "../lib/constants";
import { SEO_CITIES } from "../lib/seoRoutes";
import { supabase, YORIX_WA_NUMBER } from "../lib/supabase";
import {
  useScrollReveal,
  useStaggerReveal,
  CountUp,
} from "../utils/homeAnimations";

const QUICK_LINKS = [
  { key: "produits",     label: "Produits",  icon: "🛍️", desc: "Catalogue vérifié" },
  { key: "prestataires", label: "Services",  icon: "🛠️", desc: "Talents comme Fiverr" },
  { key: "livraison",    label: "Livraison", icon: "🚚", desc: "Yorix Ride & suivi" },
  { key: "business",     label: "Business",  icon: "💼", desc: "B2B & pros" },
  { key: "academy",      label: "Academy",   icon: "🎓", desc: "Monter en compétence" },
];

const TESTIMONIALS = [
  {
    quote: "Enfin une plateforme camerounaise qui ressemble aux géants — mais avec le sens du détail local.",
    author: "Acheteur vérifié",
    meta: "Douala · High-tech",
    rating: 5,
  },
  {
    quote: "Paiement MoMo fluide, escrow rassurant. Je recommande à mes clients de passer par Yorix.",
    author: "Vendeur pro",
    meta: "Mode & accessoires",
    rating: 5,
  },
  {
    quote: "Les prestataires sont notés, la prise de contact est simple. Parfait pour nos urgences à Yaoundé.",
    author: "PME & services",
    meta: "Yaoundé",
    rating: 5,
  },
];

// Catégories vedettes avec emoji premium (subset des CATS pour le carrousel)
const FEATURED_CATS = [
  { name: "Téléphones & HighTech", emoji: "📱", count: "Best-sellers" },
  { name: "Mode & accessoires",    emoji: "👗", count: "Tendance" },
  { name: "Beauté & cosmétique",   emoji: "💄", count: "Premium" },
  { name: "Maison & déco",         emoji: "🏡", count: "Confort" },
  { name: "Alimentation",          emoji: "🥘", count: "Frais" },
  { name: "Électroménager",        emoji: "🔌", count: "Pro" },
  { name: "Bébé & enfants",        emoji: "🧸", count: "Sûr" },
  { name: "Sport & fitness",       emoji: "🏃", count: "Actif" },
];

const HOW_STEPS = [
  { ico: "🔍", t: "Trouvez",    p: "Catalogue produits, services, formations — un seul moteur." },
  { ico: "🛒", t: "Commandez",  p: "Panier universel, paiement MoMo / Orange Money sans friction." },
  { ico: "🔐", t: "Escrow",     p: "Les fonds sont sécurisés jusqu'à votre confirmation." },
  { ico: "🚚", t: "Recevez",    p: "Livraison pilotée, suivi temps réel, support WhatsApp 7j/7." },
];

const PARTNERS = [
  { ico: "📱", t: "MTN MoMo" },
  { ico: "🟠", t: "Orange Money" },
  { ico: "💚", t: "WhatsApp Business" },
  { ico: "🇨🇲", t: "Made in Cameroun" },
  { ico: "🔐", t: "Escrow Sécurisé" },
  { ico: "🚚", t: "Yorix Ride" },
  { ico: "🎓", t: "Yorix Academy" },
  { ico: "💼", t: "Yorix Business" },
  { ico: "⚡", t: "Express J+1" },
  { ico: "🌍", t: "Pan-Africain" },
];

export function HomePage({
  filterCat,
  setFilterCat,
  search,
  setSearch,
  produitsLoading,
  produits,
  user,
  userData,
  wishlist,
  addToCart,
  toggleWish,
  openProductUrl,
  setOnboardingOpen,
  goPage,
  allServices,
  nlEmail,
  setNlEmail,
  nlSent,
  setNlSent,
  freeShippingThresholdXaf = 50000,
}) {
  const [quickCity, setQuickCity] = useState("");

  const handleHeroSearch = useCallback(() => {
    const cityEntry = SEO_CITIES.find((c) => c.name === quickCity);
    if (cityEntry) {
      goPage("seoCity", { citySlug: cityEntry.slug, mode: "acheter" });
      return;
    }
    goPage("produits");
  }, [goPage, quickCity]);

  const th = Number(freeShippingThresholdXaf) || 50000;

  // Refs pour scroll reveal
  const refCounters = useStaggerReveal(110);
  const refHowGrid  = useStaggerReveal(110);
  const refQuotes   = useStaggerReveal(140);
  const refBento    = useStaggerReveal(90);
  const refWhy      = useStaggerReveal(90);
  const refCats     = useStaggerReveal(60);
  const refTrust    = useStaggerReveal(100);
  const refSPLogos  = useStaggerReveal(70);

  const refFlashSec  = useScrollReveal();
  const refProdsSec  = useScrollReveal();
  const refPrestSec  = useScrollReveal();
  const refNewsl     = useScrollReveal();
  const refSocialP   = useScrollReveal();

  // Compteur de catégories réel (utilise les CATS)
  const nbCats = CATS.length;

  // Marquee partners (dupliqué pour boucle infinie)
  const marqueeItems = useMemo(() => [...PARTNERS, ...PARTNERS], []);

  return (
    <div className="home-premium anim">
      {/* ════════════ PROMO BANNER FLOTTANTE ════════════ */}
      <div className="yx-promo-banner" role="region" aria-label="Offre limitée">
        <span className="yx-promo-icon" aria-hidden>🎁</span>
        <span>
          Livraison <strong>OFFERTE</strong> dès {th.toLocaleString("fr-FR")} FCFA · stocks limités
        </span>
        <button type="button" className="yx-promo-cta" onClick={() => goPage("bonsPlans")}>
          J'en profite
        </button>
      </div>

      {/* ════════════ TRUST MARQUEE TOP ════════════ */}
      <div className="hp-trust-marquee" role="region" aria-label="Avantages Yorix">
        {[
          { t: "Livraison prioritaire Grandes villes", i: "🚚" },
          { t: "Paiement MTN MoMo & Orange Money",     i: "📱" },
          { t: "Escrow & protection acheteur",          i: "🔐" },
          { t: "Support humain WhatsApp 7j/7",          i: "💬" },
          { t: `Seuil livraison offerte dès ${th.toLocaleString("fr-FR")} FCFA`, i: "🎁" },
        ].map((x) => (
          <span key={x.t} className="hp-trust-node">
            <span aria-hidden>{x.i}</span> {x.t}
          </span>
        ))}
      </div>

      {/* ════════════ HERO IMMERSIF ════════════ */}
      <section className="hero hp-hero-shell" aria-labelledby="hp-hero-title">
        <div className="hp-hero-aurora" aria-hidden />
        <div className="yx-hero-orbs" aria-hidden><span /></div>

        <div className="hero-inner hp-hero-grid">
          <div className="hp-hero-copy">
            <div className="hero-tag hp-hero-tag">🇨🇲 Super-app commerce · Cameroun</div>
            <h1 id="hp-hero-title">
              Le marché numérique <br />
              qui <em>accélère</em> votre business
            </h1>
            <p className="hero-sub hp-hero-sub">
              Produits, freelances, livraison et formation — un seul écosystème premium.
              Conçu pour la confiance, pensé pour la conversion, ancré au Cameroun.
            </p>
            <p className="hp-hero-lead">
              Yorix réunit l'ambition d'Amazon &amp; Jumia, l'agilité Glovo sur la logistique,
              et l'esprit Fiverr pour les services — avec escrow, mobile money et une
              expérience mobile irréprochable.
            </p>

            <div className="hp-chip-scroller">
              {QUICK_LINKS.map((l) => (
                <button
                  key={l.key}
                  type="button"
                  className="hp-chip"
                  onClick={() => goPage(l.key)}
                  title={l.desc}
                >
                  <span className="hp-chip-ico" aria-hidden>
                    {l.icon}
                  </span>
                  <span>
                    <span className="hp-chip-label">{l.label}</span>
                    <span className="hp-chip-desc">{l.desc}</span>
                  </span>
                </button>
              ))}
            </div>

            <div className="hero-ctas hp-hero-ctas">
              <button
                type="button"
                className="cta-y hp-cta-primary"
                onClick={() => setOnboardingOpen(true)}
              >
                Démarrer · 30 s
              </button>
              <button
                type="button"
                className="cta-w hp-cta-ghost"
                onClick={() => goPage("produits")}
              >
                Parcourir le catalogue
              </button>
              <button
                type="button"
                className="cta-w hp-cta-ghost"
                onClick={() => goPage("bonsPlans")}
              >
                Bons plans livraison
              </button>
            </div>

            <div className="hero-badges">
              <span className="hbadge hbadge-yellow">⭐ Avis &amp; notes transparents</span>
              <span className="hbadge hbadge-green">📦 Vendeurs &amp; pros actifs</span>
              <span className="hbadge">🛡️ Données &amp; paiements sécurisés</span>
            </div>

            <div className="hero-stats hp-hero-stats">
              {[
                ["10+",  "Villes & hubs"],
                ["24/7", "Support WhatsApp"],
                ["100%", "Mobile money ready"],
                ["1",    "Écosystème tout-en-un"],
              ].map(([n, l]) => (
                <div key={l} className="hp-stat">
                  <div className="stat-num">{n}</div>
                  <div className="stat-lbl">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <aside className="hp-search-panel" aria-label="Recherche rapide">
            <div className="hp-panel-head">
              <div className="hc-title">Trouver en quelques secondes</div>
              <p className="hp-panel-sub">
                Filtres synchronisés avec le catalogue — même logique que sur tout le site.
              </p>
            </div>
            <div className="sf">
              <select
                value={filterCat}
                onChange={(e) => setFilterCat(e.target.value)}
                aria-label="Catégorie"
              >
                <option value="">Toutes catégories</option>
                {CATS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <input
                placeholder="Produit, marque, mot-clé…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Recherche"
              />
            </div>
            <div className="sf">
              <select
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
                placeholder="Budget max (FCFA) — optionnel"
                readOnly
                tabIndex={-1}
                style={{ opacity: 0.75 }}
              />
            </div>
            <button type="button" className="sbtn hp-sbtn" onClick={handleHeroSearch}>
              Lancer la recherche
            </button>
            <div className="pop-row">
              <span className="pop-lbl">Tendances</span>
              {["Pagne wax", "iPhone", "Karité", "BTP"].map((s) => (
                <button
                  key={s}
                  type="button"
                  className="pop-tag"
                  onClick={() => {
                    setSearch(s);
                    goPage("produits");
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
            <ul className="hp-panel-bullets">
              <li>
                Livraison offerte du panier physique dès{" "}
                <strong>{th.toLocaleString("fr-FR")} FCFA</strong> ·{" "}
                <button
                  type="button"
                  className="hp-inline-link"
                  onClick={() => goPage("bonsPlans")}
                >
                  Détails offre
                </button>
              </li>
              <li>
                Commission plateforme jamais affichée au client final — expérience
                e-commerce mondiale.
              </li>
            </ul>
          </aside>
        </div>

        <div className="yx-scroll-hint" aria-hidden>
          Faites défiler
        </div>
      </section>

      {/* ════════════ MEGA STRIP ACCÈS RAPIDES ════════════ */}
      <nav className="hp-mega-strip" aria-label="Accès rapides">
        <div className="hp-mega-inner">
          {QUICK_LINKS.map((l) => (
            <button
              key={l.key}
              type="button"
              className="hp-mega-tile"
              onClick={() => goPage(l.key)}
            >
              <span>{l.icon}</span>
              {l.label}
            </button>
          ))}
          <button
            type="button"
            className="hp-mega-tile hp-mega-tile--accent"
            onClick={() => goPage("faq")}
          >
            <span>❓</span>
            FAQ
          </button>
        </div>
      </nav>

      {/* ════════════ COUNTERS ANIMÉS ════════════ */}
      <div ref={refCounters} className="yx-counter-grid" role="region" aria-label="Yorix en chiffres">
        <div className="yx-counter">
          <div className="yx-counter-icon" aria-hidden>🛍️</div>
          <div className="yx-counter-num">
            <CountUp value={1200} suffix="+" />
          </div>
          <div className="yx-counter-lbl">Vendeurs &amp; prestataires</div>
          <div className="yx-counter-sub">Actifs &amp; vérifiés</div>
        </div>
        <div className="yx-counter">
          <div className="yx-counter-icon" aria-hidden>🏙️</div>
          <div className="yx-counter-num">
            <CountUp value={10} suffix="+" />
          </div>
          <div className="yx-counter-lbl">Villes desservies</div>
          <div className="yx-counter-sub">Douala · Yaoundé · plus</div>
        </div>
        <div className="yx-counter">
          <div className="yx-counter-icon" aria-hidden>📦</div>
          <div className="yx-counter-num">
            <CountUp value={15000} suffix="+" />
          </div>
          <div className="yx-counter-lbl">Commandes traitées</div>
          <div className="yx-counter-sub">Depuis le lancement</div>
        </div>
        <div className="yx-counter">
          <div className="yx-counter-icon" aria-hidden>🗂️</div>
          <div className="yx-counter-num">
            <CountUp value={nbCats} suffix="" />
          </div>
          <div className="yx-counter-lbl">Catégories</div>
          <div className="yx-counter-sub">Produits · services · formations</div>
        </div>
      </div>

      {/* ════════════ MARQUEE PARTENAIRES ════════════ */}
      <div className="yx-marquee-wrap" role="region" aria-label="Écosystème Yorix">
        <div className="yx-marquee-track">
          {marqueeItems.map((p, i) => (
            <span key={`${p.t}-${i}`} className="yx-marquee-item">
              <span className="yx-mq-ico" aria-hidden>{p.ico}</span>
              {p.t}
              <span className="yx-mq-dot" aria-hidden />
            </span>
          ))}
        </div>
      </div>

      {/* ════════════ HOW IT WORKS ════════════ */}
      <section className="yx-how-section" aria-labelledby="yx-how-title">
        <div className="yx-how-head">
          <span className="yx-how-kicker">Parcours premium</span>
          <h2 id="yx-how-title" className="yx-how-title">
            Comment ça marche en 4 étapes
          </h2>
          <p className="yx-how-sub">
            Une expérience pensée pour la confiance : du clic à la livraison, chaque étape
            est sécurisée et tracée.
          </p>
        </div>
        <div ref={refHowGrid} className="yx-how-grid">
          {HOW_STEPS.map((s, i) => (
            <div key={s.t} className="yx-how-step">
              <div className="yx-how-num">{i + 1}</div>
              <div className="yx-how-ico" aria-hidden>{s.ico}</div>
              <h4>{s.t}</h4>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ PROOF BAR ════════════ */}
      <div className="proof-bar hp-proof-bar yx-proof-glow">
        <div className="proof-item">
          <span className="proof-num">∞</span> ambition locale, standards internationaux
        </div>
        <div className="proof-item">
          <span className="proof-num">⚡</span> Tunnel d'achat optimisé mobile
        </div>
        <div className="proof-item">
          <span className="proof-num">🔒</span> Escrow &amp; mobile money
        </div>
        <div className="proof-item">
          <span className="proof-num">J+1</span> sur zones prioritaires
        </div>
      </div>

      {/* ════════════ TESTIMONIALS ════════════ */}
      <section className="hp-quotes" aria-label="Témoignages">
        <div ref={refQuotes} className="hp-quotes-inner">
          {TESTIMONIALS.map((t) => (
            <figure key={t.author} className="hp-quote-card">
              <div
                style={{
                  color: "#f59e0b",
                  fontSize: ".95rem",
                  letterSpacing: "2px",
                  lineHeight: 1,
                }}
                aria-label={`${t.rating} étoiles sur 5`}
              >
                {"⭐".repeat(t.rating)}
              </div>
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption>
                <strong>{t.author}</strong>
                <span>{t.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ════════════ CATÉGORIES VEDETTES (carrousel) ════════════ */}
      <section className="yx-cat-section" aria-labelledby="yx-cat-title">
        <div className="yx-cat-head">
          <div>
            <h2 id="yx-cat-title" className="yx-cat-title">
              Explorer par catégorie
            </h2>
            <div className="yx-cat-sub">Les rayons les plus parcourus de la marketplace.</div>
          </div>
          <button type="button" className="yx-cat-link" onClick={() => goPage("produits")}>
            Voir tout le catalogue →
          </button>
        </div>
        <div ref={refCats} className="yx-cat-scroller">
          {FEATURED_CATS.map((c) => (
            <button
              key={c.name}
              type="button"
              className="yx-cat-card"
              onClick={() => {
                setFilterCat(c.name);
                goPage("produits");
              }}
            >
              <div className="yx-cat-emoji" aria-hidden>{c.emoji}</div>
              <div className="yx-cat-name">{c.name}</div>
              <div className="yx-cat-count">{c.count}</div>
            </button>
          ))}
        </div>
      </section>

      {/* ════════════ FLASH DEALS ════════════ */}
      <section
        ref={refFlashSec}
        className="sec hp-flash-sec yx-reveal"
        style={{ paddingBottom: 0 }}
      >
        <div className="sec-head">
          <div className="yorix-sec-toolbar">
            <h2 className="sec-title">Offres flash du jour</h2>
            <span className="hp-flash-pill">Temps limité</span>
          </div>
          <div className="yorix-sec-toolbar-end">
            <span className="yorix-catalog-meta">Fin dans</span>
            <FlashCountdown />
          </div>
        </div>
        <div className="hp-flash-banner">
          <div>
            <div className="hp-flash-title">
              Sélection éclair — high-tech &amp; lifestyle
            </div>
            <div className="hp-flash-sub">
              Paiement MoMo / Orange · stocks selon vendeurs partenaires
            </div>
          </div>
          <button
            type="button"
            className="hp-flash-btn"
            onClick={() => {
              setFilterCat("Téléphones & HighTech");
              goPage("produits");
            }}
          >
            Voir les promos
          </button>
        </div>
        {!produitsLoading && produits.length > 0 && (
          <ProdGrid
            prods={produits.slice(0, 4).map((p, i) => ({
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
          />
        )}
      </section>

      {/* ════════════ PRODUITS DU MOMENT ════════════ */}
      <section ref={refProdsSec} className="sec yx-reveal">
        <div className="sec-head">
          <h2 className="sec-title">Produits du moment</h2>
          <span
            className="sec-link"
            onClick={() => goPage("produits")}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && goPage("produits")}
          >
            Tout voir →
          </span>
        </div>
        {produitsLoading ? (
          <div className="loading">
            <div className="spinner" /> Chargement du marché…
          </div>
        ) : produits.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🛍️</div>
            <p>Le catalogue se remplit — revenez très vite.</p>
          </div>
        ) : (
          <ProdGrid
            prods={produits.slice(0, 10)}
            user={user}
            userData={userData}
            onAddToCart={addToCart}
            onWish={toggleWish}
            wishlist={wishlist}
            onOpenProductUrl={openProductUrl}
          />
        )}
      </section>

      {/* ════════════ BENTO ÉCOSYSTÈME ════════════ */}
      <section className="hp-bento" aria-labelledby="hp-bento-title">
        <div className="hp-bento-header">
          <h2 id="hp-bento-title" className="hp-bento-title">
            Une plateforme, tous vos flux de revenus
          </h2>
          <p className="hp-bento-sub">
            Inspiré des leaders mondiaux — adapté au réel du Cameroun francophone.
          </p>
        </div>
        <div ref={refBento} className="hp-bento-grid">
          <article className="hp-bento-card hp-bento-card--wide">
            <div className="hp-bento-ico">🛍️</div>
            <h3>Marketplace produits</h3>
            <p>
              Découverte fluide, panier universel, checkout sécurisé — comme les grandes
              marketplaces africaines.
            </p>
            <button
              type="button"
              className="hp-bento-link"
              onClick={() => goPage("produits")}
            >
              Explorer →
            </button>
          </article>
          <article className="hp-bento-card">
            <div className="hp-bento-ico">🛠️</div>
            <h3>Services &amp; talents</h3>
            <p>
              Réservez des pros vérifiés : beauté, tech, BTP… expérience type marketplace
              de services.
            </p>
            <button
              type="button"
              className="hp-bento-link"
              onClick={() => goPage("prestataires")}
            >
              Trouver un pro →
            </button>
          </article>
          <article className="hp-bento-card">
            <div className="hp-bento-ico">🚚</div>
            <h3>Livraison &amp; logistique</h3>
            <p>
              Suivi, zones prioritaires Douala · Yaoundé, objectifs clairs comme une app
              de delivery moderne.
            </p>
            <button
              type="button"
              className="hp-bento-link"
              onClick={() => goPage("livraison")}
            >
              En savoir plus →
            </button>
          </article>
          <article className="hp-bento-card">
            <div className="hp-bento-ico">💼</div>
            <h3>Yorix Business</h3>
            <p>Outils et crédibilité pour VSE, corners digitaux et partenaires B2B.</p>
            <button
              type="button"
              className="hp-bento-link"
              onClick={() => goPage("business")}
            >
              Accéder →
            </button>
          </article>
          <article className="hp-bento-card">
            <div className="hp-bento-ico">🎓</div>
            <h3>Academy</h3>
            <p>
              Former vos équipes et vos clients aux bonnes pratiques e-commerce &amp;
              logistique.
            </p>
            <button
              type="button"
              className="hp-bento-link"
              onClick={() => goPage("academy")}
            >
              Formations →
            </button>
          </article>
        </div>
      </section>

      {/* ════════════ TRUST BAR ════════════ */}
      <div className="trust hp-trust-dark">
        <div ref={refTrust} className="trust-inner hp-trust-inner">
          {[
            { icon: "📱", t: "MTN MoMo & Orange", p: "Paiement sans friction partout où vous êtes." },
            { icon: "🔐", t: "Escrow Yorix",       p: "Les fonds avancent seulement quand vous validez." },
            { icon: "🚚", t: "Livraison pilotée",  p: "Réseau partenaires & zones prioritaires." },
            { icon: "🌟", t: "Profils & boutiques", p: "Signaux de confiance visibles dès la fiche." },
          ].map((item) => (
            <div key={item.t} className="ti hp-ti">
              <div className="ti-icon">{item.icon}</div>
              <div>
                <h4>{item.t}</h4>
                <p>{item.p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════ POURQUOI YORIX ════════════ */}
      <div className="why-section">
        <div className="why-inner">
          <div className="hp-why-intro">
            <div className="hp-why-kicker">Différenciation Yorix</div>
            <h2 className="hp-why-heading">
              Une expérience premium, pensée conversion
            </h2>
            <p className="hp-why-sub">
              Clarté des prix · Parcours mobile · Réassurance à chaque étape.
            </p>
          </div>
          <div ref={refWhy} className="why-grid">
            {[
              { icon: "🚀", title: "Vitesse & clarté",  desc: "Moins de friction entre l'intention et le paiement — tunnel optimisé." },
              { icon: "🌍", title: "Locals first",      desc: "Conçu au Cameroun pour les usages MoMo, WhatsApp et la log réelle." },
              { icon: "🎯", title: "Multi-canal",       desc: "Achat catalogue, réservation pros, livraison, business & formation." },
              { icon: "💬", title: "Humain accessible", desc: "Support WhatsApp quand il faut trancher vite." },
            ].map((w) => (
              <div key={w.title} className="why-card hp-why-card">
                <div className="why-icon">{w.icon}</div>
                <div className="why-title">{w.title}</div>
                <div className="why-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════ SOCIAL PROOF STRIP ════════════ */}
      <section ref={refSocialP} className="yx-social-proof yx-reveal" aria-label="Confiance clients">
        <div className="yx-sp-rating">
          <div className="yx-sp-stars" aria-hidden>
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <div className="yx-sp-score">4.9<span style={{ fontSize: ".55em", opacity: .7 }}>/5</span></div>
          <div className="yx-sp-label">
            Plus de <strong>2 800 avis</strong> vérifiés clients &amp; vendeurs
          </div>
        </div>
        <div ref={refSPLogos} className="yx-sp-logos">
          <div className="yx-sp-logo">🇨🇲 Marketplace #1 Cameroun</div>
          <div className="yx-sp-logo">⭐ Élu service client 2026</div>
          <div className="yx-sp-logo">🔐 Escrow certifié</div>
          <div className="yx-sp-logo">🎓 Formations agréées</div>
          <div className="yx-sp-logo">📈 +35% conversion</div>
        </div>
      </section>

      {/* ════════════ PRESTATAIRES SÉLECTIONNÉS ════════════ */}
      <section ref={refPrestSec} className="sec yx-reveal">
        <div className="sec-head">
          <h2 className="sec-title">Prestataires sélectionnés</h2>
          <span
            className="sec-link"
            onClick={() => goPage("prestataires")}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && goPage("prestataires")}
          >
            Marketplace services →
          </span>
        </div>
        <div className="prest-grid">
          {allServices.length === 0 ? (
            <div
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                padding: 30,
                color: "var(--gray)",
              }}
            >
              Les talents arrivent — explorez bientôt la vitrine services.
            </div>
          ) : (
            allServices.slice(0, 3).map((s) => (
              <div key={s.id} className="prest-card hp-prest-card">
                <div className="prest-top">
                  <div className="prest-av">🧑‍💼</div>
                  <div>
                    <div className="prest-name">{s.provider_nom || "Prestataire"}</div>
                    <div className="prest-meta">{s.nom}</div>
                  </div>
                </div>
                <div className="prest-tags">
                  {s.categorie && <span className="ptag">{s.categorie}</span>}
                  {s.ville && <span className="ptag">📍 {s.ville}</span>}
                </div>
                <div className="prest-footer">
                  <div>
                    <div className="prest-price">
                      {Number(s.prix).toLocaleString()} F
                    </div>
                    <div style={{ fontSize: ".69rem", color: "var(--gray)" }}>
                      ⭐ {s.note || 0} · {s.nombre_avis || 0} avis
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-hire"
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
              </div>
            ))
          )}
        </div>
      </section>

      {/* ════════════ NEWSLETTER PREMIUM ════════════ */}
      <div ref={refNewsl} className="newsletter hp-newsletter yx-reveal">
        <div className="nl-title">Restez dans la momentum Yorix</div>
        <p className="nl-sub">
          Alertes bons plans, nouveaux hubs villes et masterclass Academy — sans spam.
        </p>
        {nlSent ? (
          <div className="hp-nl-success">Merci ! Vous êtes inscrit(e).</div>
        ) : (
          <div className="nl-form hp-nl-form">
            <input
              className="nl-input"
              placeholder="Votre meilleur email…"
              value={nlEmail}
              onChange={(e) => setNlEmail(e.target.value)}
              type="email"
              autoComplete="email"
            />
            <button
              type="button"
              className="nl-btn"
              onClick={async () => {
                if (nlEmail) {
                  await supabase
                    .from("newsletter")
                    .insert({ email: nlEmail })
                    .catch((e) => console.warn(e?.message));
                  setNlSent(true);
                }
              }}
            >
              Rejoindre
            </button>
          </div>
        )}
      </div>

      {/* ════════════ STICKY WA MOBILE ════════════ */}
      <div className="wa-sticky">
        <span className="wa-sticky-text">Commande express</span>
        <button
          type="button"
          className="wa-sticky-btn"
          onClick={() =>
            window.open(
              `https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent(
                "Bonjour Yorix ! Je veux passer commande 🛍️",
              )}`,
              "_blank",
              "noopener,noreferrer",
            )
          }
        >
          WhatsApp
        </button>
      </div>
    </div>
  );
}
