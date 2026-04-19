// ┌────────────────────────────────────────────────────────────┐
// │ COMPOSANT : AcademyDetail (page d'article)                 │
// └────────────────────────────────────────────────────────────┘
export function AcademyDetail({ course, goPage, goContact }) {
  if (!course) return null;

  const renderMarkdown = (md) => {
    if (!md) return "";
    return md
      .replace(/^# (.+)$/gm, '<h1 style="font-family:\'Syne\',sans-serif;font-weight:800;font-size:1.8rem;color:var(--ink);margin:20px 0 14px;letter-spacing:-.5px">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 style="font-family:\'Syne\',sans-serif;font-weight:800;font-size:1.2rem;color:var(--green);margin:22px 0 10px">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 style="font-family:\'Syne\',sans-serif;font-weight:700;font-size:1rem;color:var(--ink);margin:16px 0 8px">$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--ink)">$1</strong>')
      .replace(/_(.+?)_/g, '<em style="color:var(--gray);font-style:italic">$1</em>')
      .replace(/^\d+\. (.+)$/gm, '<li style="margin-left:22px;margin-bottom:6px;list-style:decimal;color:var(--ink);font-size:.88rem;line-height:1.75">$1</li>')
      .replace(/^- (.+)$/gm, '<li style="margin-left:22px;margin-bottom:6px;list-style:disc;color:var(--ink);font-size:.88rem;line-height:1.75">$1</li>')
      .replace(/\n\n/g, '</p><p style="margin-bottom:14px;color:var(--ink);font-size:.88rem;line-height:1.8">')
      .replace(/^(?!<[hl])/gm, '<p style="margin-bottom:14px;color:var(--ink);font-size:.88rem;line-height:1.8">')
      .replace(/<p[^>]*><\/p>/g, '');
  };

  const isFree = (course.prix || 0) === 0;

  return (
    <section className="sec anim">
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <button
          onClick={() => goPage("academy")}
          style={{
            display: "flex", alignItems: "center", gap: 6, background: "none",
            border: "none", cursor: "pointer", color: "var(--gray)", fontSize: 14,
            marginBottom: 20, padding: "8px 0",
          }}
        >
          ← Retour à l'Academy
        </button>

        <div style={{
          background: course.color_bg || "var(--green-pale)",
          borderRadius: 14, padding: "28px 26px", marginBottom: 20,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
            <span style={{ fontSize: "3rem" }}>{course.emoji || "🎓"}</span>
            <div>
              <span style={{
                fontSize: ".7rem", fontWeight: 800, letterSpacing: "0.05em",
                color: course.category === "DÉBUTANT" ? "#1a6b3a"
                  : course.category === "INTERMÉDIAIRE" ? "#1a4a9a" : "#6a1b9a",
              }}>
                {course.category}
              </span>
              <div style={{
                display: "flex", gap: 12, marginTop: 4, fontSize: ".72rem", color: "var(--gray)",
              }}>
                <span>⏱ {course.duration}</span>
                <span>👥 {course.students_count || 0} étudiants</span>
              </div>
            </div>
          </div>

          <h1 style={{
            fontFamily: "'Syne',sans-serif", fontSize: "1.8rem", fontWeight: 800,
            color: "var(--ink)", marginBottom: 10, letterSpacing: "-.5px", lineHeight: 1.2,
          }}>
            {course.title}
          </h1>

          {course.full_description && (
            <p style={{ fontSize: ".88rem", color: "var(--gray)", lineHeight: 1.7 }}>
              {course.full_description}
            </p>
          )}
        </div>

        <div style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 14, padding: "28px 32px", marginBottom: 20,
        }}>
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(course.teaser_content) }} />
        </div>

        {!isFree ? (
          <div style={{
            background: "linear-gradient(135deg, #f0faf4, #fef9e0)",
            border: "2px solid var(--green-light)", borderRadius: 16,
            padding: "32px 28px", textAlign: "center",
          }}>
            <div style={{ fontSize: "3rem", marginBottom: 10 }}>🎓</div>
            <h3 style={{
              fontFamily: "'Syne',sans-serif", fontSize: "1.4rem", fontWeight: 800,
              color: "var(--ink)", marginBottom: 10,
            }}>
              Vous voulez aller plus loin ?
            </h3>
            <p style={{
              fontSize: ".88rem", color: "var(--gray)", lineHeight: 1.7,
              maxWidth: 480, margin: "0 auto 20px",
            }}>
              Cet aperçu n'est qu'une partie du contenu. Accédez à la formation complète
              avec tous les chapitres, exercices pratiques et cas d'études réels.
            </p>

            <div style={{
              background: "var(--surface)", borderRadius: 12, padding: "18px 28px",
              display: "inline-block", marginBottom: 20, border: "1px solid var(--border)",
            }}>
              <div style={{ fontSize: ".72rem", color: "var(--gray)", marginBottom: 4 }}>
                Formation complète
              </div>
              <div style={{
                fontFamily: "'Syne',sans-serif", fontSize: "2rem", fontWeight: 800,
                color: "var(--green)",
              }}>
                {course.prix.toLocaleString("fr-FR")} <span style={{ fontSize: "1rem", color: "var(--gray)" }}>FCFA</span>
              </div>
            </div>

            <div style={{
              display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap",
            }}>
              <button
                onClick={() => goContact(course)}
                style={{
                  background: "var(--green)", color: "#fff", border: "none",
                  padding: "13px 26px", borderRadius: 10,
                  fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".9rem",
                  cursor: "pointer", boxShadow: "0 4px 12px rgba(26,107,58,0.25)",
                }}
              >
                ✉️ Je suis intéressé(e)
              </button>

              
                href={`https://wa.me/237696565654?text=${encodeURIComponent(
                  `Bonjour Yorix Academy ! Je suis intéressé(e) par la formation "${course.title}" à ${course.prix.toLocaleString("fr-FR")} FCFA. Pouvez-vous me donner plus d'informations ?`
                )}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "#25D366", color: "#fff", border: "none",
                  padding: "13px 26px", borderRadius: 10,
                  fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".9rem",
                  cursor: "pointer", textDecoration: "none",
                  display: "inline-flex", alignItems: "center", gap: 8,
                }}
              >
                💬 WhatsApp direct
              </a>
            </div>

            <p style={{
              fontSize: ".72rem", color: "var(--gray)", marginTop: 14,
            }}>
              💳 Paiement sécurisé par MTN MoMo, Orange Money ou virement
            </p>
          </div>
        ) : (
          <div style={{
            background: "var(--green-pale)", border: "1px solid var(--green-light)",
            borderRadius: 14, padding: 24, textAlign: "center",
          }}>
            <h3 style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.2rem",
              color: "var(--green)", marginBottom: 8,
            }}>
              🎉 Cette formation est entièrement gratuite !
            </h3>
            <p style={{ fontSize: ".85rem", color: "var(--gray)", marginBottom: 16 }}>
              Continuez votre apprentissage avec nos autres formations.
            </p>
            <button
              onClick={() => goPage("academy")}
              className="form-submit"
              style={{ width: "auto", padding: "10px 24px" }}
            >
              Voir toutes les formations
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
