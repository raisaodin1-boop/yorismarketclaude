// ═══════════════════════════════════════════════════════════════
//  YORIX CM — DELIVERY USE CASES + B2B SECTION
//  ✅ "Que pouvez-vous livrer avec Yorix ?" (multiplier usages mentaux)
//  ✅ Section B2B vendeurs (synergie marketplace)
//  ✅ Témoignages clients pour preuve sociale
// ═══════════════════════════════════════════════════════════════

import { YORIX_WA_NUMBER } from "../lib/supabase";

const USE_CASES = [
  {
    icon: "📦",
    title: "Colis & Paquets",
    desc: "Récupérez et livrez n'importe quel colis en ville",
    examples: "Achats en ligne · Cadeaux · Échanges",
    color: "linear-gradient(135deg, #3b82f6, #2563eb)",
    bgIcon: "rgba(59,130,246,.1)",
  },
  {
    icon: "📄",
    title: "Documents urgents",
    desc: "Livraison rapide de papiers et dossiers importants",
    examples: "Contrats · Dossiers admin · Lettres",
    color: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
    bgIcon: "rgba(139,92,246,.1)",
  },
  {
    icon: "🛒",
    title: "Courses & Achats",
    desc: "Le livreur fait vos courses au marché ou en boutique",
    examples: "Marché · Pharmacie · Supermarché",
    color: "linear-gradient(135deg, #10b981, #059669)",
    bgIcon: "rgba(16,185,129,.1)",
  },
  {
    icon: "🎁",
    title: "Cadeaux & Surprises",
    desc: "Offrez sans bouger : fleurs, gâteaux, cadeaux",
    examples: "Anniversaire · St Valentin · Mariage",
    color: "linear-gradient(135deg, #ec4899, #db2777)",
    bgIcon: "rgba(236,72,153,.1)",
  },
  {
    icon: "🍱",
    title: "Repas & Restaurants",
    desc: "Vos plats préférés livrés chauds chez vous",
    examples: "Restaurants · Snacks · Boissons",
    color: "linear-gradient(135deg, #f59e0b, #d97706)",
    bgIcon: "rgba(245,158,11,.1)",
  },
  {
    icon: "🪑",
    title: "Mobilier & Volumineux",
    desc: "Objets lourds avec véhicule adapté",
    examples: "Meubles · Électroménager · Cartons",
    color: "linear-gradient(135deg, #ef4444, #dc2626)",
    bgIcon: "rgba(239,68,68,.1)",
  },
];

const TEMOIGNAGES = [
  {
    nom: "Aïcha N.",
    role: "Cliente · Yaoundé",
    avatar: "A",
    avatarColor: "#ec4899",
    note: 5,
    texte: "J'ai commandé un livreur pour récupérer un cadeau au marché. 20 min plus tard, c'était chez moi. Service au top !",
  },
  {
    nom: "Bertrand K.",
    role: "Vendeur · Douala",
    avatar: "B",
    avatarColor: "#3b82f6",
    note: 5,
    texte: "Depuis que j'utilise Yorix Livraison pour mes clients, je vends 3x plus. Les livreurs sont fiables et rapides.",
  },
  {
    nom: "Grace T.",
    role: "Cliente · Bafoussam",
    avatar: "G",
    avatarColor: "#10b981",
    note: 5,
    texte: "Tarif clair dès le départ, suivi GPS, livreur sympa. C'est devenu mon réflexe pour tout faire livrer.",
  },
];

export function DeliveryUseCases({ onCommander, onOpenFullModal }) {
  return (
    <>
      {/* ═══ SECTION : QUE LIVRER ? ═══ */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "var(--green-pale, #e8f5e9)",
              color: "var(--green, #1a6b3a)",
              padding: "5px 14px",
              borderRadius: 50,
              fontSize: ".7rem",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            📦 Tout est livrable
          </div>
          <h2
            style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: "1.45rem",
              fontWeight: 800,
              color: "var(--ink, #111)",
              marginBottom: 8,
              letterSpacing: "-.5px",
            }}
          >
            Que pouvez-vous livrer avec Yorix ?
          </h2>
          <p
            style={{
              color: "var(--gray, #666)",
              fontSize: ".88rem",
              maxWidth: 540,
              margin: "0 auto",
              lineHeight: 1.55,
            }}
          >
            De la lettre au gros colis, nos livreurs équipés (moto, voiture, camionnette) s'adaptent à tous vos besoins.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 14,
          }}
        >
          {USE_CASES.map((uc) => (
            <div
              key={uc.title}
              style={{
                background: "var(--surface, #fff)",
                border: "1.5px solid var(--border, #e5e5e5)",
                borderRadius: 14,
                padding: 18,
                cursor: "pointer",
                transition: "all .25s",
                position: "relative",
                overflow: "hidden",
              }}
              onClick={onCommander}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,.08)";
                e.currentTarget.style.borderColor = "transparent";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "var(--border, #e5e5e5)";
              }}
            >
              {/* Décoration */}
              <div
                style={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  width: 65,
                  height: 65,
                  background: uc.bgIcon,
                  borderRadius: "50%",
                  zIndex: 0,
                }}
              />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 11,
                    background: uc.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.45rem",
                    marginBottom: 10,
                    boxShadow: "0 4px 12px rgba(0,0,0,.1)",
                  }}
                >
                  {uc.icon}
                </div>
                <div
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 800,
                    fontSize: ".98rem",
                    color: "var(--ink, #111)",
                    marginBottom: 5,
                    letterSpacing: "-.2px",
                  }}
                >
                  {uc.title}
                </div>
                <div
                  style={{
                    fontSize: ".78rem",
                    color: "var(--gray, #666)",
                    lineHeight: 1.5,
                    marginBottom: 8,
                  }}
                >
                  {uc.desc}
                </div>
                <div
                  style={{
                    fontSize: ".68rem",
                    color: "var(--green, #1a6b3a)",
                    fontWeight: 600,
                    fontStyle: "italic",
                  }}
                >
                  {uc.examples}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ SECTION : TÉMOIGNAGES ═══ */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <h2
            style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: "1.3rem",
              fontWeight: 800,
              color: "var(--ink, #111)",
              marginBottom: 6,
              letterSpacing: "-.4px",
            }}
          >
            ⭐ Ce que disent nos clients
          </h2>
          <p style={{ color: "var(--gray, #666)", fontSize: ".82rem" }}>
            12 000+ livraisons réussies · Note moyenne 4.8/5
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 14,
          }}
        >
          {TEMOIGNAGES.map((t, i) => (
            <div
              key={i}
              style={{
                background: "var(--surface, #fff)",
                border: "1px solid var(--border, #e5e5e5)",
                borderRadius: 12,
                padding: 18,
              }}
            >
              {/* Note étoiles */}
              <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span key={idx} style={{ color: idx < t.note ? "#fcd116" : "#e5e5e5", fontSize: ".95rem" }}>
                    ★
                  </span>
                ))}
              </div>

              {/* Texte */}
              <p
                style={{
                  fontSize: ".84rem",
                  color: "var(--ink, #111)",
                  lineHeight: 1.6,
                  marginBottom: 14,
                  fontStyle: "italic",
                }}
              >
                "{t.texte}"
              </p>

              {/* Profil */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: t.avatarColor,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 800,
                    fontSize: ".95rem",
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontWeight: 700,
                      fontSize: ".84rem",
                      color: "var(--ink, #111)",
                    }}
                  >
                    {t.nom}
                  </div>
                  <div style={{ fontSize: ".7rem", color: "var(--gray, #666)" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ SECTION B2B VENDEURS ═══ */}
      <div
        style={{
          background: "linear-gradient(135deg, #fef9e0 0%, #fff7d0 100%)",
          border: "2px solid #fcd116",
          borderRadius: 16,
          padding: "26px 24px",
          marginBottom: 24,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 150,
            height: 150,
            background: "rgba(252,209,22,.15)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24, alignItems: "center" }}>
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(13,31,20,.1)",
                color: "#0d1f14",
                padding: "4px 12px",
                borderRadius: 50,
                fontSize: ".68rem",
                fontWeight: 800,
                marginBottom: 10,
              }}
            >
              💼 Yorix Business · B2B
            </div>
            <h2
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: "1.4rem",
                fontWeight: 800,
                color: "#0d1f14",
                marginBottom: 8,
                letterSpacing: "-.4px",
                lineHeight: 1.2,
              }}
            >
              Vous êtes vendeur ? <br />
              Livrez vos clients avec Yorix.
            </h2>
            <p
              style={{
                fontSize: ".88rem",
                color: "#1a2e22",
                lineHeight: 1.6,
                marginBottom: 14,
                maxWidth: 460,
              }}
            >
              Synchronisez votre boutique Yorix Marketplace avec notre réseau de 850+ livreurs. Vos clients reçoivent leurs commandes en moins de 30 minutes.
            </p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
              {[
                "🚀 +3x plus de ventes",
                "📦 Livraison 30 min",
                "💰 Pas d'abonnement",
                "📊 Tableau de bord pro",
              ].map((t) => (
                <span
                  key={t}
                  style={{
                    background: "rgba(255,255,255,.7)",
                    color: "#0d1f14",
                    padding: "5px 11px",
                    borderRadius: 50,
                    fontSize: ".7rem",
                    fontWeight: 600,
                    border: "1px solid rgba(13,31,20,.1)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                onClick={() => {
                  const msg = "Bonjour Yorix ! Je suis vendeur et je souhaite intégrer Yorix Livraison pour livrer mes clients.";
                  const url = "https://wa.me/" + YORIX_WA_NUMBER + "?text=" + encodeURIComponent(msg);
                  window.open(url, "_blank");
                }}
                style={{
                  background: "#0d1f14",
                  color: "#fcd116",
                  border: "none",
                  padding: "11px 20px",
                  borderRadius: 10,
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 800,
                  fontSize: ".85rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(13,31,20,.25)",
                }}
              >
                💼 Devenir partenaire
              </button>
              <button
                onClick={onOpenFullModal}
                style={{
                  background: "rgba(255,255,255,.6)",
                  color: "#0d1f14",
                  border: "1.5px solid #0d1f14",
                  padding: "11px 20px",
                  borderRadius: 10,
                  fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 700,
                  fontSize: ".82rem",
                  cursor: "pointer",
                }}
              >
                📦 Tester une livraison
              </button>
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "5rem", lineHeight: 1, marginBottom: 6 }}>📦💨</div>
            <div
              style={{
                background: "rgba(255,255,255,.85)",
                borderRadius: 12,
                padding: 14,
                marginTop: 8,
                border: "1px solid rgba(13,31,20,.08)",
              }}
            >
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "#0d1f14" }}>
                +127%
              </div>
              <div style={{ fontSize: ".72rem", color: "#1a2e22", fontWeight: 600 }}>
                de ventes en moyenne pour les vendeurs partenaires
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
