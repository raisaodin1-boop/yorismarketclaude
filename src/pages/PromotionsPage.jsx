/**
 * Landing promotions saisonnières + rappel livraison offerte (pilier conversion).
 */
export function PromotionsPage({ goPage, goToCategory, freeShippingThresholdXaf = 50000 }) {
  const th = Number(freeShippingThresholdXaf) || 50000;

  const cards = [
    {
      emoji: "🍽️",
      title: "−15 % sur l'alimentation cette semaine",
      body:
        "Jusqu'au dimanche 17 mai 2026 (23h59) : épicerie, boissons, frais et snacks éligibles affichent −15 % sur le prix catalogue. Le montant réduit est appliqué au panier et au paiement.",
      cta: "Voir l'alimentation",
      categorySlug: "alimentation",
    },
    {
      emoji: "🚚",
      title: `Livraison offerte dès ${th.toLocaleString("fr-FR")} FCFA`,
      body:
        "Comme sur les grandes places de marché : vos produits à expéditer franchissent le seuil, la livraison standard est offerte automatiquement. Les prestations ne comptent pas dans ce sous-total colis.",
      cta: "Voir le catalogue",
      page: "produits",
    },
    {
      emoji: "🏙️",
      title: "Douala · Yaoundé — zones prioritaires",
      body:
        "Délais J+1 à J+2 sur zones actives lorsque vendeur et transport sont alignés. Combinez vos achats pour atteindre le seuil et éviter les frais.",
      cta: "Livraison par ville",
      page: "livraison",
    },
    {
      emoji: "⚡",
      title: "Campagnes flash & nouveaux clients",
      body:
        "Surveillez les annonces WhatsApp et l’Academy pour les saisonnières. Le seuil livraison offerte peut être combiné aux promos catalogue quand les vendeurs l’autorisent.",
      cta: "Academy Yorix",
      page: "academy",
    },
  ];

  return (
    <section className="sec anim promotions-page-wrap" style={{ maxWidth: 980, margin: "0 auto" }}>
      <h1 className="sec-title">Bons plans & livraison Yorix</h1>
      <p style={{ color: "var(--gray)", fontSize: ".9rem", lineHeight: 1.6, marginBottom: 22 }}>
        Stratégie conversion-first : augmentez votre panier moyen tout en voyant clairement ce que vous économisez sur la livraison.
      </p>

      <div
        className="fs-ship-banner fs-ship-banner--won"
        style={{ marginBottom: 22 }}
        role="region"
        aria-label="Offre livraison"
      >
        <span className="fs-ship-eyebrow fs-ship-eyebrow--gold">Offre spéciale marketplace</span>
        <div className="fs-ship-title">Livraison standard offerte dès {th.toLocaleString("fr-FR")} FCFA d’articles livrables</div>
        <p className="fs-ship-caption">
          Détail transparent sur le panier et au checkout · montants recalculés côté serveur au paiement.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
        {cards.map((c) => (
          <article key={c.title} className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: "2rem", marginBottom: 8 }}>{c.emoji}</div>
            <h2 className="h2" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1rem", marginBottom: 8 }}>
              {c.title}
            </h2>
            <p style={{ fontSize: ".82rem", color: "var(--gray)", lineHeight: 1.55, marginBottom: 12 }}>{c.body}</p>
            <button
              type="button"
              className="form-submit"
              style={{ width: "100%" }}
              onClick={() => {
                if (c.categorySlug && goToCategory) goToCategory({ parentSlug: c.categorySlug });
                else if (c.page) goPage(c.page);
              }}
            >
              {c.cta}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
