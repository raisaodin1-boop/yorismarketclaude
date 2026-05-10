import { MarketingBreadcrumb } from "../components/layout/MarketingBreadcrumb";
import { BLOG_DATA } from "../lib/constants";
import { supabase } from "../lib/supabase";

export function BlogPage({ blogFilter, setBlogFilter, nlEmail, setNlEmail, nlSent, setNlSent, goPage }) {
  return (
    <section className="sec anim yorix-pro-page">
      {typeof goPage === "function" && (
        <div style={{ marginBottom: 16 }}>
          <MarketingBreadcrumb items={[{ label: "Accueil", onClick: () => goPage("home") }, { label: "Journal / Blog" }]} />
        </div>
      )}
      <div
        style={{
          background: "linear-gradient(135deg, #0a1410 0%, #1a3a24 50%, #0d3320 100%)",
          borderRadius: 16,
          padding: "36px 28px",
          color: "#fff",
          marginBottom: 28,
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "rgba(252,209,22,.08)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -60, left: -50, width: 180, height: 180, background: "rgba(79,209,125,.06)", borderRadius: "50%" }} />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(252,209,22,.14)", color: "var(--yellow)", border: "1px solid rgba(252,209,22,.28)", padding: "5px 14px", borderRadius: 50, fontSize: ".72rem", fontWeight: 700, marginBottom: 14 }}>
            📰 Yorix Journal
          </div>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "2rem", fontWeight: 800, marginBottom: 10, letterSpacing: "-.5px", lineHeight: 1.15 }}>
            Tout l'actu du <span style={{ color: "var(--yellow)" }}>commerce camerounais</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,.65)", fontSize: ".9rem", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            Guides pratiques, analyses de marché, conseils business et tendances locales. Écrit par notre équipe et des experts camerounais.
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24, justifyContent: "center" }}>
        {["TOUT", ...Array.from(new Set(BLOG_DATA.map((p) => p.cat)))].map((c) => (
          <button
            key={c}
            onClick={() => setBlogFilter(c)}
            style={{
              padding: "7px 16px",
              borderRadius: 50,
              border: `1.5px solid ${blogFilter === c ? "var(--green)" : "var(--border)"}`,
              background: blogFilter === c ? "var(--green)" : "var(--surface)",
              color: blogFilter === c ? "#fff" : "var(--ink)",
              fontFamily: "'DM Sans',sans-serif",
              fontWeight: 600,
              fontSize: ".76rem",
              cursor: "pointer",
              transition: "all .2s",
            }}
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
            onClick={() => window.open(featured.external_url, "_blank", "noopener,noreferrer")}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              overflow: "hidden",
              marginBottom: 28,
              cursor: "pointer",
              transition: "transform .2s, box-shadow .2s",
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr",
              gap: 0,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,.1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ background: featured.color_bg || "var(--green-pale)", minHeight: 280, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              {featured.image ? (
                <img
                  src={featured.image}
                  alt={featured.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div style={{ fontSize: "6rem", opacity: 0.5 }}>{featured.emoji}</div>
              )}
              <span style={{ position: "absolute", top: 16, left: 16, background: "var(--yellow)", color: "#0d1f14", padding: "5px 12px", borderRadius: 50, fontSize: ".68rem", fontWeight: 800, fontFamily: "'Syne',sans-serif", boxShadow: "0 4px 12px rgba(0,0,0,.15)" }}>
                ⭐ À LA UNE
              </span>
            </div>
            <div style={{ padding: "28px 26px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: ".68rem", fontWeight: 800, color: "var(--green)", letterSpacing: ".08em", marginBottom: 10 }}>
                {featured.emoji} {featured.cat}
              </div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "var(--ink)", marginBottom: 10, letterSpacing: "-.3px", lineHeight: 1.25 }}>{featured.title}</h2>
              <p style={{ fontSize: ".86rem", color: "var(--gray)", lineHeight: 1.7, marginBottom: 16 }}>{featured.excerpt}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                {featured.tags?.map((t) => (
                  <span key={t} style={{ background: "var(--surface2)", color: "var(--gray)", padding: "3px 10px", borderRadius: 50, fontSize: ".67rem", fontWeight: 600 }}>
                    #{t}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".82rem" }}>
                    {featured.author_avatar || "Y"}
                  </div>
                  <div>
                    <div style={{ fontSize: ".76rem", fontWeight: 700, color: "var(--ink)" }}>{featured.author}</div>
                    <div style={{ fontSize: ".66rem", color: "var(--gray)" }}>
                      {featured.date} · ⏱ {featured.read}
                    </div>
                  </div>
                </div>
                <button style={{ background: "var(--green)", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 9, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".78rem", cursor: "pointer" }}>
                  Lire l'article →
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
        {BLOG_DATA.filter((p) => !p.featured || blogFilter !== "TOUT")
          .filter((p) => blogFilter === "TOUT" || p.cat === blogFilter)
          .map((p) => (
            <article
              key={p.id}
              onClick={() => window.open(p.external_url, "_blank", "noopener,noreferrer")}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform .2s, box-shadow .2s, border-color .2s",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 14px 28px rgba(0,0,0,.1)";
                e.currentTarget.style.borderColor = "var(--green-light)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <div style={{ height: 180, position: "relative", background: p.color_bg || "var(--green-pale)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                {p.image ? (
                  <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                ) : (
                  <div style={{ fontSize: "4rem", opacity: 0.6 }}>{p.emoji}</div>
                )}
                <span style={{ position: "absolute", top: 12, left: 12, background: "rgba(255,255,255,.95)", backdropFilter: "blur(10px)", color: "var(--ink)", padding: "4px 11px", borderRadius: 50, fontSize: ".64rem", fontWeight: 800, letterSpacing: ".05em", fontFamily: "'Syne',sans-serif" }}>
                  {p.emoji} {p.cat}
                </span>
                <span style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,.6)", backdropFilter: "blur(10px)", color: "#fff", padding: "4px 10px", borderRadius: 50, fontSize: ".62rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}>
                  ⏱ {p.read}
                </span>
              </div>

              <div style={{ padding: "16px 16px 14px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: ".98rem", fontWeight: 800, color: "var(--ink)", marginBottom: 8, letterSpacing: "-.2px", lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.title}</h3>
                <p style={{ fontSize: ".78rem", color: "var(--gray)", lineHeight: 1.6, marginBottom: 12, flex: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.excerpt}</p>

                {p.tags && p.tags.length > 0 && (
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
                    {p.tags.slice(0, 2).map((t) => (
                      <span key={t} style={{ background: "var(--surface2)", color: "var(--gray)", padding: "2px 8px", borderRadius: 50, fontSize: ".6rem", fontWeight: 600 }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 11, borderTop: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: "var(--green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".68rem" }}>
                      {p.author_avatar || "Y"}
                    </div>
                    <div>
                      <div style={{ fontSize: ".68rem", fontWeight: 700, color: "var(--ink)" }}>{p.author}</div>
                      <div style={{ fontSize: ".6rem", color: "var(--gray)" }}>{p.date}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: ".68rem", fontWeight: 700, color: "var(--green)", display: "flex", alignItems: "center", gap: 3 }}>
                    Lire →
                  </span>
                </div>
              </div>
            </article>
          ))}
      </div>

      {BLOG_DATA.filter((p) => blogFilter === "TOUT" || p.cat === blogFilter).length === 0 && (
        <div className="empty-state" style={{ padding: "60px 0" }}>
          <div className="empty-icon">📰</div>
          <p>Aucun article dans cette catégorie pour l'instant.</p>
          <button className="form-submit" style={{ width: "auto", padding: "10px 24px", marginTop: 16 }} onClick={() => setBlogFilter("TOUT")}>
            Voir tous les articles
          </button>
        </div>
      )}

      <div style={{ background: "linear-gradient(135deg, var(--green-pale), #fef9e0)", border: "2px solid var(--green-light)", borderRadius: 14, padding: "26px 28px", marginTop: 32, textAlign: "center" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>📬</div>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.2rem", fontWeight: 800, color: "var(--ink)", marginBottom: 8, letterSpacing: "-.3px" }}>
          Ne rate aucun article
        </h3>
        <p style={{ fontSize: ".84rem", color: "var(--gray)", marginBottom: 16, maxWidth: 460, margin: "0 auto 16px", lineHeight: 1.6 }}>
          Reçois chaque semaine nos meilleurs guides et analyses directement dans ta boîte mail.
        </p>
        <div style={{ display: "flex", gap: 8, maxWidth: 400, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
          <input
            type="email"
            placeholder="ton@email.cm"
            value={nlEmail}
            onChange={(e) => setNlEmail(e.target.value)}
            style={{ flex: 1, minWidth: 200, padding: "11px 14px", borderRadius: 9, border: "1.5px solid var(--border)", background: "var(--surface)", color: "var(--ink)", fontFamily: "'DM Sans',sans-serif", fontSize: ".85rem", outline: "none" }}
          />
          <button
            onClick={async () => {
              if (nlEmail) {
                await supabase.from("newsletter").insert({ email: nlEmail }).catch((e) => console.warn(e?.message));
                setNlSent(true);
              }
            }}
            style={{ background: "var(--green)", color: "#fff", border: "none", padding: "11px 22px", borderRadius: 9, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".82rem", cursor: "pointer", whiteSpace: "nowrap" }}
          >
            {nlSent ? "✅ Abonné(e) !" : "S'abonner 🚀"}
          </button>
        </div>
      </div>
    </section>
  );
}
