// ─────────────────────────────────────────────────────────────
// COMPOSANT : CARTE PRESTATAIRE PREMIUM
// ─────────────────────────────────────────────────────────────
export function PrestCard({ p, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: 14, overflow: "hidden",
        cursor: "pointer", transition: "transform .2s, box-shadow .2s, border-color .2s",
        display: "flex", flexDirection: "column",
      }}
      onMouseOver={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 14px 28px rgba(0,0,0,.1)";
        e.currentTarget.style.borderColor = "var(--green-light)";
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      {/* Header avec photo */}
      <div style={{
        background: p.color_bg || "var(--green-pale)",
        padding: "20px 16px", position: "relative",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        {p.photo ? (
          <img
            src={p.photo}
            alt={p.name}
            style={{
              width: 60, height: 60, borderRadius: "50%",
              objectFit: "cover", border: "3px solid #fff",
              boxShadow: "0 4px 12px rgba(0,0,0,.1)",
              flexShrink: 0,
            }}
            onError={e => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        <div style={{
          display: p.photo ? "none" : "flex",
          width: 60, height: 60, borderRadius: "50%",
          background: "#fff", alignItems: "center", justifyContent: "center",
          fontSize: "1.8rem", border: "3px solid #fff",
          boxShadow: "0 4px 12px rgba(0,0,0,.1)", flexShrink: 0,
        }}>
          {p.emoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap",
            marginBottom: 2,
          }}>
            <div style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1rem",
              color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}>
              {p.name}
            </div>
            {p.verifie && (
              <span title="Vérifié" style={{
                background: "var(--green)", color: "#fff",
                width: 16, height: 16, borderRadius: "50%",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontSize: ".55rem", fontWeight: 800, flexShrink: 0,
              }}>
                ✓
              </span>
            )}
          </div>
          <div style={{
            fontSize: ".72rem", color: "var(--gray)", fontWeight: 500,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {p.metier}
          </div>
          <div style={{
            fontSize: ".68rem", color: "var(--gray)", marginTop: 2,
          }}>
            📍 {p.ville}{p.quartier && ` · ${p.quartier}`}
          </div>
        </div>
        {/* Badges */}
        <div style={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 4 }}>
          {p.top && (
            <span style={{
              background: "var(--yellow)", color: "#0d1f14",
              padding: "3px 8px", borderRadius: 50,
              fontSize: ".6rem", fontWeight: 800,
              fontFamily: "'Syne',sans-serif",
              boxShadow: "0 2px 8px rgba(0,0,0,.1)",
            }}>
              ⭐ TOP
            </span>
          )}
          {p.dispo && (
            <span title="Disponible" style={{
              width: 10, height: 10, background: "#22c55e",
              borderRadius: "50%", border: "2px solid #fff",
              boxShadow: "0 0 0 2px rgba(34,197,94,.3)",
            }}/>
          )}
        </div>
      </div>

      {/* Corps */}
      <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Tags */}
        {p.tags && p.tags.length > 0 && (
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
            {p.tags.slice(0, 3).map(t => (
              <span key={t} style={{
                background: "var(--surface2)", color: "var(--ink)",
                padding: "3px 9px", borderRadius: 50,
                fontSize: ".65rem", fontWeight: 600,
              }}>
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Stats rapides */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10, marginBottom: 10,
          fontSize: ".7rem", color: "var(--gray)",
        }}>
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <span style={{ color: "#f59e0b" }}>⭐</span>
            <strong style={{ color: "var(--ink)" }}>{p.note}</strong>
            <span>({p.avis})</span>
          </span>
          {p.realisations > 0 && (
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              📦 <strong style={{ color: "var(--ink)" }}>{p.realisations}</strong>
            </span>
          )}
          {p.experience && (
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              💼 <strong style={{ color: "var(--ink)" }}>{p.experience}</strong>
            </span>
          )}
        </div>

        {/* Prix + bouton */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: 10, borderTop: "1px solid var(--border)", marginTop: "auto",
        }}>
          <div>
            <div style={{ fontSize: ".6rem", color: "var(--gray)", fontWeight: 600 }}>
              TARIF
            </div>
            <div style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".92rem",
              color: "var(--green)",
            }}>
              {p.prix}
            </div>
          </div>
          <button
            onClick={e => {
              e.stopPropagation();
              const phone = (p.telephone || "237696565654").replace(/\D/g, "");
              window.open(`https://wa.me/${phone}?text=${encodeURIComponent(`Bonjour ${p.name} ! Je vous contacte via Yorix pour une prestation de ${p.categorie}.`)}`, "_blank");
            }}
            style={{
              background: "#25D366", color: "#fff", border: "none",
              padding: "7px 14px", borderRadius: 8,
              fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".75rem",
              cursor: "pointer", whiteSpace: "nowrap",
              display: "flex", alignItems: "center", gap: 4,
            }}
          >
            💬 Contacter
          </button>
        </div>
      </div>
    </div>
  );
}
