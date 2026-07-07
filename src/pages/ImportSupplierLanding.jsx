/**
 * Landing fournisseurs internationaux — Model B import / gros.
 */
export function ImportSupplierLanding({ locale = "fr", onRegister, onBrowseWholesale }) {
  const isEn = locale === "en";

  return (
    <section className="sec anim">
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: 28 }}>
          <span style={{ fontSize: ".72rem", fontWeight: 800, color: "#1d4ed8", letterSpacing: ".08em" }}>
            {isEn ? "YORIX IMPORT & WHOLESALE" : "YORIX IMPORT & GROS"}
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(1.35rem, 3vw, 1.85rem)",
              color: "var(--ink)",
              margin: "12px 0",
              lineHeight: 1.15,
            }}
          >
            {isEn
              ? "Sell wholesale to Cameroon — Chinese & international suppliers"
              : "Vendez en gros au Cameroun — fournisseurs chinois & internationaux"}
          </h1>
          <p style={{ color: "var(--gray)", fontSize: ".9rem", lineHeight: 1.75, maxWidth: 620, margin: "0 auto" }}>
            {isEn
              ? "List products with MOQ tiers, lead times and Incoterms. Buyers send B2B requests; you reply with quotes. Escrow protects both sides."
              : "Publiez vos produits avec paliers MOQ, délais et Incoterms. Les acheteurs envoient des demandes B2B ; vous répondez par devis. L'escrow protège les deux parties."}
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
            marginBottom: 28,
          }}
        >
          {[
            {
              icon: "🇨🇳",
              title: isEn ? "China → Cameroon" : "Chine → Cameroun",
              desc: isEn
                ? "FOB/CIF, 15–45 day lead time, MOQ from 10 units."
                : "FOB/CIF, délai 15–45 j, MOQ dès 10 unités.",
            },
            {
              icon: "📋",
              title: isEn ? "Quote workflow" : "Parcours devis",
              desc: isEn
                ? "Request → your quote → buyer accepts → escrow deposit."
                : "Demande → votre devis → acceptation → acompte escrow.",
            },
            {
              icon: "🔐",
              title: "Escrow Yorix",
              desc: isEn
                ? "Funds secured until delivery confirmed."
                : "Fonds sécurisés jusqu'à confirmation livraison.",
            },
          ].map((card) => (
            <div
              key={card.title}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: 18,
              }}
            >
              <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontWeight: 800, fontSize: ".9rem", marginBottom: 6 }}>{card.title}</div>
              <div style={{ fontSize: ".78rem", color: "var(--gray)", lineHeight: 1.6 }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button type="button" className="cta-y" onClick={onRegister}>
            {isEn ? "Register as import supplier" : "S'inscrire comme fournisseur import"}
          </button>
          <button type="button" className="cta-w" onClick={onBrowseWholesale}>
            {isEn ? "Browse wholesale catalog" : "Voir le catalogue gros"}
          </button>
        </div>

        <ol
          style={{
            marginTop: 32,
            paddingLeft: 20,
            fontSize: ".82rem",
            color: "var(--gray)",
            lineHeight: 1.8,
          }}
        >
          <li>{isEn ? "Create a seller account and complete KYC." : "Créez un compte vendeur et complétez le KYC."}</li>
          <li>
            {isEn
              ? "Add products: enable B2B, set origin China, MOQ tiers, lead time & Incoterm."
              : "Ajoutez des produits : activez le B2B, origine Chine, paliers MOQ, délai et Incoterm."}
          </li>
          <li>
            {isEn
              ? "Manage B2B inbox in your seller dashboard — send quotes within 24–48h."
              : "Gérez l'inbox B2B dans votre dashboard vendeur — répondez sous 24–48h."}
          </li>
        </ol>
      </div>
    </section>
  );
}
