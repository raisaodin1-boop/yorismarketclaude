import { useMemo, useState } from "react";
import { MarketingBreadcrumb } from "../components/layout/MarketingBreadcrumb";
import { BLOG_DATA } from "../lib/constants";
import { supabase } from "../lib/supabase";

// ─────────────────────────────────────────────────────────────
//  YORIX JOURNAL — Refonte premium magazine (v2)
//  Cohérent avec la page Fidélité v3 (.yorix-loy-v2 / .yloy-*)
//  Préserve : props existantes, BLOG_DATA, newsletter Supabase
// ─────────────────────────────────────────────────────────────

const CATEGORY_META = {
  BUSINESS:     { icon: "📈", color: "#1565c0", pitch: "Stratégies, lancement, croissance" },
  LOCAL:        { icon: "🌿", color: "#1a6b3a", pitch: "Produits locaux, terroir & export" },
  PAIEMENT:     { icon: "💳", color: "#b45309", pitch: "Mobile money, fintech, escrow" },
  LIVRAISON:    { icon: "🚚", color: "#ea580c", pitch: "Yorix Ride, logistique, suivi" },
  "SÉCURITÉ":   { icon: "🔐", color: "#7c3aed", pitch: "Escrow, anti-arnaque, confiance" },
  PRESTATAIRES: { icon: "⚡", color: "#dc2626", pitch: "Services à domicile, BTP, beauté" },
  MODE:         { icon: "👗", color: "#db2777", pitch: "Style camerounais, wax, tendances" },
  "CARRIÈRE":   { icon: "🏍️", color: "#0891b2", pitch: "Devenir vendeur, livreur, freelance" },
};

const EDITORIAL_PILLARS = [
  { e: "🇨🇲", t: "100 % camerounais",    d: "Rédigé par des journalistes basés à Douala et Yaoundé, sur le terrain." },
  { e: "✅", t: "Faits vérifiés",         d: "Sources publiques, partenaires officiels, chiffres horodatés." },
  { e: "🧭", t: "Actionnable",            d: "Chaque guide se termine par une étape concrète à exécuter aujourd’hui." },
  { e: "🛡️", t: "Indépendant",           d: "Pas d’advertorial déguisé — la transparence éditoriale d’abord." },
];

const GUIDE_HIGHLIGHTS = ["BUSINESS", "SÉCURITÉ", "LIVRAISON"]; // Catégories considérées comme guides pratiques

function openExternal(url) {
  if (!url) return;
  window.open(url, "_blank", "noopener,noreferrer");
}

function ArticleCard({ p, size = "normal" }) {
  const meta = CATEGORY_META[p.cat] || { icon: p.emoji, color: "var(--green)" };
  return (
    <article
      className={`yblog-card yblog-card--${size}`}
      role="link"
      tabIndex={0}
      onClick={() => openExternal(p.external_url)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openExternal(p.external_url);
        }
      }}
    >
      <div className="yblog-card-media" style={{ background: p.color_bg || "var(--green-pale)" }}>
        {p.image ? (
          <img src={p.image} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} />
        ) : (
          <span className="yblog-card-emoji" aria-hidden>{p.emoji}</span>
        )}
        <span className="yblog-card-cat" style={{ "--cat-color": meta.color }}>
          <span aria-hidden>{meta.icon}</span> {p.cat}
        </span>
        <span className="yblog-card-read"><span aria-hidden>⏱</span> {p.read}</span>
      </div>
      <div className="yblog-card-body">
        <h3 className="yblog-card-title">{p.title}</h3>
        <p className="yblog-card-ex">{p.excerpt}</p>
        {p.tags && p.tags.length > 0 && (
          <div className="yblog-tags">
            {p.tags.slice(0, 3).map((t) => (
              <span key={t} className="yblog-tag-sm">#{t}</span>
            ))}
          </div>
        )}
        <div className="yblog-card-foot">
          <div className="yblog-author">
            <div className="yblog-av" aria-hidden>{p.author_avatar || "Y"}</div>
            <div className="yblog-author-text">
              <div className="yblog-an">{p.author}</div>
              <div className="yblog-ad">{p.date}</div>
            </div>
          </div>
          <span className="yblog-read-hint" aria-hidden>Lire <span>→</span></span>
        </div>
      </div>
    </article>
  );
}

export function BlogPage({ blogFilter, setBlogFilter, nlEmail, setNlEmail, nlSent, setNlSent, goPage }) {
  const [query, setQuery] = useState("");

  // Liste des catégories disponibles dans la data, dans l'ordre d'apparition
  const categoryOrder = useMemo(
    () => Array.from(new Set(BLOG_DATA.map((p) => p.cat))),
    []
  );

  // Comptes par catégorie (pour les pills)
  const counts = useMemo(() => {
    const map = { TOUT: BLOG_DATA.length };
    BLOG_DATA.forEach((p) => { map[p.cat] = (map[p.cat] || 0) + 1; });
    return map;
  }, []);

  // Articles filtrés (catégorie + recherche)
  const filteredAll = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BLOG_DATA.filter((p) => blogFilter === "TOUT" || p.cat === blogFilter)
      .filter((p) => !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || (p.tags || []).some((t) => t.toLowerCase().includes(q)));
  }, [blogFilter, query]);

  // Article à la une (dans le filtre courant), sinon premier match
  const featured = useMemo(() => {
    return (
      BLOG_DATA.find((p) => p.featured && (blogFilter === "TOUT" || p.cat === blogFilter)) ||
      filteredAll[0] ||
      BLOG_DATA[0]
    );
  }, [blogFilter, filteredAll]);

  // Articles de la grille (on retire le featured uniquement si vue "TOUT")
  const gridArticles = useMemo(() => {
    if (blogFilter === "TOUT") {
      return filteredAll.filter((p) => p.id !== featured?.id);
    }
    return filteredAll;
  }, [filteredAll, featured, blogFilter]);

  // Guides pratiques (sélection éditoriale)
  const guideArticles = useMemo(() => {
    return BLOG_DATA.filter((p) => GUIDE_HIGHLIGHTS.includes(p.cat)).slice(0, 3);
  }, []);

  const submitNewsletter = async () => {
    if (!nlEmail || !nlEmail.includes("@")) return;
    try {
      await supabase.from("newsletter").insert({ email: nlEmail });
    } catch (e) {
      // silencieux : pas bloquant pour l'utilisateur
      console.warn(e?.message);
    }
    setNlSent(true);
  };

  const featMeta = featured ? (CATEGORY_META[featured.cat] || { icon: featured.emoji, color: "var(--green)" }) : null;

  return (
    <section className="anim yorix-blog-v2">
      {/* ════════════ HERO MAGAZINE PREMIUM ════════════ */}
      <header className="yblog-hero">
        <div className="yblog-hero-fx" aria-hidden>
          <div className="yblog-hero-glow yblog-hero-glow--a" />
          <div className="yblog-hero-glow yblog-hero-glow--b" />
          <div className="yblog-hero-grid-deco" />
        </div>

        <div className="yblog-section-inner yblog-hero-inner">
          {typeof goPage === "function" && (
            <div className="yblog-hero-bc">
              <MarketingBreadcrumb
                items={[
                  { label: "Accueil", onClick: () => goPage("home") },
                  { label: "Yorix Journal · blog officiel" },
                ]}
              />
            </div>
          )}

          <div className="yblog-hero-grid">
            <div className="yblog-hero-left">
              <span className="yblog-eyebrow yblog-eyebrow--on-dark">
                <span className="yblog-eyebrow-dot" aria-hidden /> Yorix Journal · officiel
              </span>

              <h1 className="yblog-h1">
                Toute l’actualité du <em>commerce camerounais</em>
              </h1>

              <p className="yblog-sub">
                Guides pratiques, analyses de marché, tendances et opportunités —
                rédigés par notre équipe et des experts <strong>basés au Cameroun</strong>.
              </p>

              <form
                className="yblog-hero-search"
                onSubmit={(e) => { e.preventDefault(); }}
                role="search"
                aria-label="Rechercher un article"
              >
                <span className="yblog-hero-search-ico" aria-hidden>🔎</span>
                <input
                  type="search"
                  placeholder="Rechercher : MoMo, livraison, escrow, wax…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Rechercher un article"
                />
                {query && (
                  <button
                    type="button"
                    className="yblog-hero-search-clear"
                    aria-label="Effacer la recherche"
                    onClick={() => setQuery("")}
                  >×</button>
                )}
              </form>

              <ul className="yblog-hero-themes" aria-label="Thèmes éditoriaux">
                {Object.entries(CATEGORY_META).slice(0, 5).map(([cat, m]) => (
                  <li key={cat}>
                    <button
                      type="button"
                      className="yblog-hero-theme"
                      onClick={() => { setBlogFilter(cat); setQuery(""); }}
                    >
                      <span aria-hidden>{m.icon}</span> {cat}
                    </button>
                  </li>
                ))}
              </ul>

              <ul className="yblog-hero-trust" aria-label="Engagement éditorial">
                <li><span aria-hidden>✅</span> Faits vérifiés</li>
                <li><span aria-hidden>🇨🇲</span> Rédigé au Cameroun</li>
                <li><span aria-hidden>📅</span> Mis à jour chaque semaine</li>
              </ul>
            </div>

            {/* Carte magazine à la une — colonne droite */}
            <div className="yblog-hero-right">
              {featured && (
                <article
                  className="yblog-hero-feat"
                  role="link"
                  tabIndex={0}
                  onClick={() => openExternal(featured.external_url)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openExternal(featured.external_url);
                    }
                  }}
                  aria-label={`À la une : ${featured.title}`}
                >
                  <div className="yblog-hero-feat-shine" aria-hidden />
                  <div className="yblog-hero-feat-media" style={{ background: featured.color_bg || "var(--green-pale)" }}>
                    {featured.image ? (
                      <img src={featured.image} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                    ) : (
                      <span className="yblog-hero-feat-fallback" aria-hidden>{featured.emoji}</span>
                    )}
                    <span className="yblog-hero-feat-pin">À la une</span>
                  </div>
                  <div className="yblog-hero-feat-body">
                    <span className="yblog-hero-feat-kicker" style={{ "--cat-color": featMeta?.color }}>
                      <span aria-hidden>{featMeta?.icon}</span> {featured.cat}
                    </span>
                    <h2 className="yblog-hero-feat-title">{featured.title}</h2>
                    <p className="yblog-hero-feat-ex">{featured.excerpt}</p>
                    <div className="yblog-hero-feat-foot">
                      <div className="yblog-author">
                        <div className="yblog-av" aria-hidden>{featured.author_avatar || "Y"}</div>
                        <div className="yblog-author-text">
                          <div className="yblog-an">{featured.author}</div>
                          <div className="yblog-ad">{featured.date} · ⏱ {featured.read}</div>
                        </div>
                      </div>
                      <span className="yblog-read-hint yblog-read-hint--strong" aria-hidden>Lire <span>→</span></span>
                    </div>
                  </div>
                </article>
              )}

              <div className="yblog-orbit yblog-orbit--a" aria-hidden />
              <div className="yblog-orbit yblog-orbit--b" aria-hidden />
            </div>
          </div>
        </div>
      </header>

      {/* ════════════ CATÉGORIES PREMIUM ════════════ */}
      <section className="yblog-section yblog-section--cats">
        <div className="yblog-section-inner">
          <div className="yblog-cats-head">
            <span className="yblog-eyebrow">Catégories éditoriales</span>
            <h2 className="yblog-h2-sm">Choisissez votre <em>angle</em></h2>
          </div>

          <div className="yblog-cats" role="tablist" aria-label="Filtrer par catégorie">
            <button
              type="button"
              role="tab"
              aria-selected={blogFilter === "TOUT"}
              className={`yblog-cat${blogFilter === "TOUT" ? " is-active" : ""}`}
              onClick={() => setBlogFilter("TOUT")}
            >
              <span className="yblog-cat-ico" aria-hidden>📚</span>
              <span className="yblog-cat-label">Tout</span>
              <span className="yblog-cat-count">{counts.TOUT}</span>
            </button>
            {categoryOrder.map((cat) => {
              const m = CATEGORY_META[cat] || { icon: "📰", color: "var(--green)" };
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={blogFilter === cat}
                  className={`yblog-cat${blogFilter === cat ? " is-active" : ""}`}
                  style={{ "--cat-color": m.color }}
                  onClick={() => setBlogFilter(cat)}
                >
                  <span className="yblog-cat-ico" aria-hidden>{m.icon}</span>
                  <span className="yblog-cat-label">{cat}</span>
                  <span className="yblog-cat-count">{counts[cat] || 0}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════ DERNIERS ARTICLES ════════════ */}
      <section className="yblog-section">
        <div className="yblog-section-inner">
          <div className="yblog-section-head">
            <div>
              <span className="yblog-eyebrow">
                {blogFilter === "TOUT" ? "01 · Tous nos articles" : `01 · Catégorie · ${blogFilter}`}
              </span>
              <h2 className="yblog-h2">Derniers articles</h2>
              <p className="yblog-lead">
                Analyses, guides pratiques et tendances — sélectionnés et tenus à jour par la rédaction Yorix.
              </p>
            </div>
            <div className="yblog-section-meta">
              <strong>{filteredAll.length}</strong> article{filteredAll.length > 1 ? "s" : ""}
              {query && <span className="yblog-section-q"> · « {query} »</span>}
            </div>
          </div>

          {gridArticles.length === 0 ? (
            <div className="yblog-empty">
              <div className="yblog-empty-ico" aria-hidden>📰</div>
              <h3>Aucun article ne correspond à votre recherche.</h3>
              <p>Essayez un autre mot-clé ou parcourez toutes les catégories.</p>
              <div className="yblog-empty-cta">
                <button
                  type="button"
                  className="yblog-btn yblog-btn--pri"
                  onClick={() => { setBlogFilter("TOUT"); setQuery(""); }}
                >
                  Voir tous les articles
                </button>
              </div>
            </div>
          ) : (
            <div className="yblog-grid">
              {gridArticles.map((p) => <ArticleCard key={p.id} p={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* ════════════ GUIDES PRATIQUES ════════════ */}
      {blogFilter === "TOUT" && !query && guideArticles.length > 0 && (
        <section className="yblog-section yblog-section--tinted">
          <div className="yblog-section-inner">
            <div className="yblog-section-head">
              <div>
                <span className="yblog-eyebrow">02 · Guides pratiques</span>
                <h2 className="yblog-h2">
                  Nos meilleurs guides pour <em>grandir</em>
                </h2>
                <p className="yblog-lead">
                  Business, sécurité, livraison : les ressources que nous recommandons en priorité aux vendeurs et acheteurs.
                </p>
              </div>
              <button
                type="button"
                className="yblog-btn yblog-btn--ghost-dark"
                onClick={() => setBlogFilter("BUSINESS")}
              >
                Voir tous les guides
              </button>
            </div>

            <div className="yblog-guides-grid">
              {guideArticles.map((p) => <ArticleCard key={p.id} p={p} size="guide" />)}
            </div>
          </div>
        </section>
      )}

      {/* ════════════ AUTORITÉ ÉDITORIALE ════════════ */}
      <section className="yblog-section">
        <div className="yblog-section-inner">
          <div className="yblog-section-head yblog-section-head--center">
            <span className="yblog-eyebrow">03 · Yorix Journal · l’autorité business CM</span>
            <h2 className="yblog-h2 yblog-h2--center">
              Une rédaction au cœur du <em>marché camerounais</em>
            </h2>
            <p className="yblog-lead yblog-lead--center">
              Notre mission : décrypter le commerce, la livraison et la fintech au Cameroun avec des contenus
              utiles, vérifiés et actionnables.
            </p>
          </div>

          <div className="yblog-pillars">
            {EDITORIAL_PILLARS.map((p) => (
              <article key={p.t} className="yblog-pillar">
                <div className="yblog-pillar-emoji" aria-hidden>{p.e}</div>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ NEWSLETTER PREMIUM ════════════ */}
      <section className="yblog-section">
        <div className="yblog-section-inner">
          <div className="yblog-nl">
            <div className="yblog-nl-fx" aria-hidden />
            <div className="yblog-nl-left">
              <span className="yblog-eyebrow yblog-eyebrow--on-dark">04 · Newsletter Yorix Journal</span>
              <h2 className="yblog-h2 yblog-h2--on-dark">
                Recevez les meilleures <em>analyses Yorix</em>
              </h2>
              <p className="yblog-sub yblog-sub--on-dark">
                Une newsletter par semaine · guides, données de marché, opportunités locales.
                <strong> Zéro spam, désinscription en un clic.</strong>
              </p>
              <ul className="yblog-nl-perks">
                <li><span aria-hidden>📈</span> Analyses commerce CM</li>
                <li><span aria-hidden>🎯</span> Conseils vendeurs</li>
                <li><span aria-hidden>💎</span> Opportunités exclusives</li>
              </ul>
            </div>

            <form
              className="yblog-nl-form"
              onSubmit={(e) => { e.preventDefault(); submitNewsletter(); }}
              noValidate
            >
              <label htmlFor="yblog-nl-email" className="yblog-nl-lbl">Votre email professionnel</label>
              <div className="yblog-nl-row">
                <input
                  id="yblog-nl-email"
                  type="email"
                  className="yblog-nl-inp"
                  placeholder="vous@entreprise.cm"
                  value={nlEmail}
                  onChange={(e) => setNlEmail(e.target.value)}
                  required
                />
                <button type="submit" className="yblog-btn yblog-btn--pri yblog-nl-submit">
                  {nlSent ? "Abonné(e) ✓" : "S’abonner"}
                </button>
              </div>
              <p className="yblog-nl-note">
                {nlSent
                  ? "Merci ! Confirmez votre inscription depuis l’email que nous venons d’envoyer."
                  : "RGPD · vous pouvez vous désabonner à tout moment depuis chaque envoi."}
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ════════════ CTA CONTRIBUTION / PARTENARIAT ════════════ */}
      <section className="yblog-section">
        <div className="yblog-section-inner">
          <div className="yblog-final-cta">
            <div className="yblog-final-cta-text">
              <span className="yblog-eyebrow yblog-eyebrow--on-dark">05 · Vous avez quelque chose à dire ?</span>
              <h2 className="yblog-h2 yblog-h2--on-dark">
                Devenez <em>contributeur</em> ou <em>partenaire</em> du Journal Yorix
              </h2>
              <p className="yblog-sub yblog-sub--on-dark">
                Experts business, journalistes, prestataires : proposez un sujet, un guide, ou un partenariat
                éditorial. Nous lisons toutes les propositions sous 72 heures.
              </p>
            </div>
            <div className="yblog-final-cta-actions">
              <button
                type="button"
                className="yblog-btn yblog-btn--pri"
                onClick={() => goPage?.("contact")}
              >
                Proposer un sujet
              </button>
              <button
                type="button"
                className="yblog-btn yblog-btn--ghost"
                onClick={() => goPage?.("business")}
              >
                Devenir partenaire
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
