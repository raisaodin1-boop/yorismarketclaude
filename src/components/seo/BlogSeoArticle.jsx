/** Article guide SEO — présentation sobre (shell marketing). Les JSON-LD sont injectés dans YorixApp / SeoHead. */

import { getBlogArticle } from "../../lib/seoProgrammatic";

export function BlogSeoArticle({ slug, goPage }) {
  const art = getBlogArticle(slug);
  if (!art) {
    return (
      <section className="sec anim" style={{ maxWidth: 680, margin: "0 auto" }}>
        <p style={{ color: "var(--gray)", marginBottom: 16 }}>Article introuvable.</p>
        <button type="button" className="cta-y" onClick={() => goPage("blog")}>
          Retour au blog
        </button>
      </section>
    );
  }

  return (
    <article className="sec anim">
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <nav aria-label="Fil d'ariane" style={{ marginBottom: 18, fontSize: ".82rem", color: "var(--gray)" }}>
          <button type="button" onClick={() => goPage("home")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--green)", padding: 0 }}>
            Accueil
          </button>
          <span aria-hidden> · </span>
          <button type="button" onClick={() => goPage("blog")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--green)", padding: 0 }}>
            Blog
          </button>
          <span aria-hidden> · </span>
          <span>{art.headline}</span>
        </nav>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.35rem,4vw,1.75rem)", color: "var(--ink)", marginBottom: 12, lineHeight: 1.2 }}>
          {art.headline}
        </h1>
        <p style={{ fontSize: ".82rem", color: "var(--gray)", marginBottom: 28 }}>
          Publié le {art.datePublished} · Guide Yorix · Cameroun
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {art.sections.map((sec, i) => (
            <section key={i}>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.05rem", marginBottom: 10, color: "var(--ink)" }}>{sec.h2}</h2>
              <p style={{ fontSize: ".9rem", lineHeight: 1.75, color: "var(--gray)" }}>{sec.p}</p>
            </section>
          ))}
        </div>
        {art.faq?.length > 0 && (
          <section style={{ marginTop: 36, padding: "20px 18px", background: "var(--surface)", borderRadius: 12, border: "1px solid var(--border)" }}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1rem", marginBottom: 14 }}>Questions fréquentes</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {art.faq.map((f, j) => (
                <details key={j} style={{ cursor: "pointer" }}>
                  <summary style={{ fontWeight: 600, fontSize: ".86rem" }}>{f.q}</summary>
                  <p style={{ marginTop: 8, fontSize: ".84rem", lineHeight: 1.65, color: "var(--gray)", paddingLeft: 4 }}>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}
        <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 10 }}>
          <button type="button" className="cta-y" onClick={() => goPage("produits")}>
            Voir les produits
          </button>
          <button type="button" className="cta-w" onClick={() => goPage("livraison")}>
            Livraison Cameroun
          </button>
        </div>
      </div>
    </article>
  );
}
