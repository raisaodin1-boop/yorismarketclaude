import { useMemo, useState } from "react";
import { MarketingBreadcrumb } from "../components/layout/MarketingBreadcrumb";

const SECTIONS = [
  {
    id: "buy",
    icon: "🛍️",
    title: "Acheter sur Yorix",
    faqs: [
      { q: "Comment passer une commande ?", r: "Parcourez le catalogue ou la recherche, ajoutez au panier puis finalisez sur la page Checkout (paiement sécurisé ou WhatsApp)." },
      { q: "Quels modes de paiement ?", r: "MTN Mobile Money, Orange Money, CinetPay carte, paiement sécurisé via escrow ou option selon le vendeur." },
      { q: "Comment fonctionne l'escrow ?", r: "Votre paiement est protégé jusqu'à votre confirmation de réception. En cas de litige, équipe médiation sous 48h ouvrées." },
    ],
  },
  {
    id: "sell",
    icon: "🏪",
    title: "Vendre sur Yorix",
    faqs: [
      { q: "Comment créer ma boutique ?", r: "Créez un compte vendeur → Dashboard vendeur → Publier un produis. La page est mise en ligne immédiatement." },
      { q: "Commission Yorix ?", r: "Commission standard indicative 5% sur la vente (montants vendeur calculés automatiquement à la commande)." },
      { q: "Badge Top vendeur ?", r: "Réactivité et historique positif augmentent votre visibilité — contactez-nous pour le programme mis en avant." },
    ],
  },
  {
    id: "ship",
    icon: "🚚",
    title: "Livraison & suivi",
    faqs: [
      { q: "Quels sont les délais ?", r: "Zones prioritaires (Douala, Yaoundé) : souvent 24–72 h. Autres régions : 3–7 jours ouvrés selon transport." },
      { q: "Colis non reçu ?", r: "Via Support WhatsApp +237 696 56 56 54 avec votre code de suivi ou référence commande groupe." },
    ],
  },
  {
    id: "money",
    icon: "💰",
    title: "Fidélité & points",
    faqs: [
      { q: "Comment gagner des points ?", r: "Achats, ventes, actions qualité sur la plateforme — vérifiez votre solde depuis Fidélité." },
      { q: "Échange minimum ?", r: "Seuils indiqués sur la page Fidélité (bons d'achat et récompenses mises à jour régulièrement)." },
    ],
  },
];

function normalize(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function HelpCentrePage({ goPage }) {
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState(SECTIONS[0].id);

  const filtered = useMemo(() => {
    const n = normalize(q);
    if (!n) return SECTIONS;
    return SECTIONS.map((sec) => ({
      ...sec,
      faqs: sec.faqs.filter((f) => normalize(f.q + f.r).includes(n)),
    })).filter((sec) => sec.faqs.length > 0);
  }, [q]);

  return (
    <div className="yorix-help yorix-pro-page anim">
      <div className="yorix-help-hero">
        <MarketingBreadcrumb items={[{ label: "Accueil", onClick: () => goPage("home") }, { label: "Centre d'aide" }]} />
        <h1 className="yorix-help-title">Centre d&apos;aide Yorix</h1>
        <p className="yorix-help-lead">
          Réponses instantanées, organisées par sujet — marketplace, escrow, livraison et fidélité.
        </p>
        <label className="yorix-help-search">
          <span className="visually-hidden">Rechercher dans l&apos;aide</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ex. escrow, livraison, points…"
            autoComplete="off"
          />
        </label>
        <div className="yorix-help-quick">
          <button type="button" className="yorix-chip" onClick={() => goPage("escrow")}>
            Escrow acheteur
          </button>
          <button type="button" className="yorix-chip" onClick={() => goPage("livraison")}>
            Suivi livraison
          </button>
          <button type="button" className="yorix-chip" onClick={() => goPage("loyalty")}>
            Points Yorix
          </button>
          <button type="button" className="yorix-chip wa" onClick={() => goPage("contact")}>
            Contacter support
          </button>
        </div>
      </div>

      <div className="yorix-help-layout">
        <aside className="yorix-help-sidebar" aria-label="Catégories d'aide">
          <nav className="yorix-help-nav">
            {SECTIONS.map((sec) => (
              <button
                key={sec.id}
                type="button"
                className={`yorix-help-nav-item${activeCat === sec.id ? " is-active" : ""}`}
                onClick={() => {
                  setActiveCat(sec.id);
                  document.getElementById(`help-sec-${sec.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                <span aria-hidden>{sec.icon}</span>
                <span>{sec.title}</span>
              </button>
            ))}
          </nav>
        </aside>
        <div className="yorix-help-main">
          {filtered.length === 0 ? (
            <div className="yorix-help-empty">
              <p>Aucun résultat pour « {q} ».</p>
              <button type="button" className="cta-y" onClick={() => setQ("")}>
                Effacer la recherche
              </button>
            </div>
          ) : (
            filtered.map((section) => (
              <section key={section.id} id={`help-sec-${section.id}`} className="yorix-help-block">
                <h2 className="yorix-help-block-title">
                  <span className="yorix-help-block-ico" aria-hidden>
                    {section.icon}
                  </span>
                  {section.title}
                </h2>
                <div className="yorix-help-faq-list">
                  {section.faqs.map((item, i) => (
                    <details key={`${section.id}-${i}`} className="yorix-details">
                      <summary>{item.q}</summary>
                      <p>{item.r}</p>
                    </details>
                  ))}
                </div>
              </section>
            ))
          )}
          <div className="yorix-help-cta-bar">
            <div>
              <strong>Besoin d&apos;un humain ?</strong>
              <span>Équipe en ligne 7j/7 pour les urgences commande.</span>
            </div>
            <button type="button" className="btn-wa" onClick={() => goPage("contact")}>
              WhatsApp &amp; contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
