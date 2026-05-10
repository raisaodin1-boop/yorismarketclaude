import { MarketingBreadcrumb } from "../components/layout/MarketingBreadcrumb";
import { BLOG_DATA } from "../lib/constants";
import { supabase } from "../lib/supabase";

export function BlogPage({ blogFilter, setBlogFilter, nlEmail, setNlEmail, nlSent, setNlSent, goPage }) {
  return (
    <section className="sec anim yorix-pro-page">
      {typeof goPage === "function" && (
        <div className="yorix-bc-row">
          <MarketingBreadcrumb items={[{ label: "Accueil", onClick: () => goPage("home") }, { label: "Journal / Blog" }]} />
        </div>
      )}
      <div className="yorix-blog-hero">
        <div className="yorix-blog-hero-glare" aria-hidden />
        <div className="yorix-blog-hero-glare yorix-blog-hero-glare--b" aria-hidden />
        <div className="yorix-blog-hero-inner">
          <div className="yorix-blog-tag">Yorix Journal</div>
          <h1 className="yorix-blog-h1">
            Tout l&apos;actu du <em className="yorix-blog-h1-em">commerce camerounais</em>
          </h1>
          <p className="yorix-blog-lead">
            Guides pratiques, analyses de marché, conseils business et tendances locales. Rédigés par notre équipe et des experts basés au Cameroun.
          </p>
        </div>
      </div>

      <div className="yorix-blog-cats" role="tablist" aria-label="Catégories articles">
        {["TOUT", ...Array.from(new Set(BLOG_DATA.map((p) => p.cat)))].map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={blogFilter === c}
            className={`yorix-blog-cat${blogFilter === c ? " is-active" : ""}`}
            onClick={() => setBlogFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {(() => {
        const featured = BLOG_DATA.find((p) => p.featured && (blogFilter === "TOUT" || p.cat === blogFilter));
        if (!featured) return null;
        return (
          <div
            role="link"
            tabIndex={0}
            className="yorix-blog-featured"
            onClick={() => window.open(featured.external_url, "_blank", "noopener,noreferrer")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                window.open(featured.external_url, "_blank", "noopener,noreferrer");
              }
            }}
          >
            <div className="yorix-blog-feat-media" style={{ background: featured.color_bg || "var(--green-pale)" }}>
              {featured.image ? (
                <img src={featured.image} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} />
              ) : (
                <span className="yorix-blog-feat-fallback" aria-hidden>{featured.emoji}</span>
              )}
              <span className="yorix-blog-feat-badge">À la une</span>
            </div>
            <div className="yorix-blog-feat-body">
              <div className="yorix-blog-feat-kicker">
                {featured.emoji} {featured.cat}
              </div>
              <h2 className="yorix-blog-feat-title">{featured.title}</h2>
              <p className="yorix-blog-feat-ex">{featured.excerpt}</p>
              {featured.tags?.length > 0 && (
                <div className="yorix-blog-tags">
                  {featured.tags.map((t) => (
                    <span key={t} className="yorix-blog-tag-sm">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
              <div className="yorix-blog-feat-foot">
                <div className="yorix-blog-author">
                  <div className="yorix-blog-av">{featured.author_avatar || "Y"}</div>
                  <div>
                    <div className="yorix-blog-an">{featured.author}</div>
                    <div className="yorix-blog-ad">
                      {featured.date} · ⏱ {featured.read}
                    </div>
                  </div>
                </div>
                <span className="yorix-blog-btn-rd" role="presentation">Lire l&apos;article →</span>
              </div>
            </div>
          </div>
        );
      })()}

      <div className="yorix-blog-grid">
        {BLOG_DATA.filter((p) => !p.featured || blogFilter !== "TOUT")
          .filter((p) => blogFilter === "TOUT" || p.cat === blogFilter)
          .map((p) => (
            <article
              key={p.id}
              className="yorix-blog-card"
              onClick={() => window.open(p.external_url, "_blank", "noopener,noreferrer")}
            >
              <div className="yorix-blog-card-media" style={{ background: p.color_bg || "var(--green-pale)" }}>
                {p.image ? (
                  <img src={p.image} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                ) : (
                  <span className="yorix-blog-card-emoji" aria-hidden>{p.emoji}</span>
                )}
                <span className="yorix-blog-card-cat">
                  {p.emoji} {p.cat}
                </span>
                <span className="yorix-blog-card-read">⏱ {p.read}</span>
              </div>
              <div className="yorix-blog-card-body">
                <h3 className="yorix-blog-card-title">{p.title}</h3>
                <p className="yorix-blog-card-ex">{p.excerpt}</p>
                {p.tags && p.tags.length > 0 && (
                  <div className="yorix-blog-tags">
                    {p.tags.slice(0, 2).map((t) => (
                      <span key={t} className="yorix-blog-tag-sm">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
                <div className="yorix-blog-card-foot">
                  <div className="yorix-blog-author">
                    <div className="yorix-blog-av" style={{ width: 28, height: 28, fontSize: ".72rem" }}>{p.author_avatar || "Y"}</div>
                    <div>
                      <div className="yorix-blog-an" style={{ fontSize: ".71rem" }}>{p.author}</div>
                      <div className="yorix-blog-ad" style={{ fontSize: ".61rem" }}>{p.date}</div>
                    </div>
                  </div>
                  <span className="yorix-blog-read-hint">Lire →</span>
                </div>
              </div>
            </article>
          ))}
      </div>

      {BLOG_DATA.filter((p) => blogFilter === "TOUT" || p.cat === blogFilter).length === 0 && (
        <div className="empty-state" style={{ padding: "60px 0" }}>
          <div className="empty-icon">📰</div>
          <p>Aucun article dans cette catégorie pour l&apos;instant.</p>
          <button type="button" className="form-submit" style={{ width: "auto", padding: "10px 24px", marginTop: 16 }} onClick={() => setBlogFilter("TOUT")}>
            Voir tous les articles
          </button>
        </div>
      )}

      <aside className="yorix-blog-nl">
        <div className="yorix-blog-nl-ico" aria-hidden>📬</div>
        <h3 className="yorix-blog-nl-h">Ne rate aucun article</h3>
        <p className="yorix-blog-nl-p">
          Reçois nos meilleurs guides et analyses marketplace chaque semaine — zéro spam, désinscription en un clic.
        </p>
        <div className="yorix-blog-nl-row">
          <label className="visually-hidden" htmlFor="yorix-blog-nl-email">Email newsletter</label>
          <input
            id="yorix-blog-nl-email"
            type="email"
            className="yorix-blog-nl-inp"
            placeholder="ton@email.cm"
            value={nlEmail}
            onChange={(e) => setNlEmail(e.target.value)}
          />
          <button
            type="button"
            className="yorix-blog-nl-submit"
            onClick={async () => {
              if (nlEmail) {
                await supabase.from("newsletter").insert({ email: nlEmail }).catch((e) => console.warn(e?.message));
                setNlSent(true);
              }
            }}
          >
            {nlSent ? "Abonné(e) ✅" : "S'abonner"}
          </button>
        </div>
      </aside>
    </section>
  );
}
