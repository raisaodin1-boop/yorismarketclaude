import { useState } from "react";
import { MoreHorizontal, X } from "lucide-react";

/**
 * Navigation dashboard mobile — 4 onglets max + menu « Plus ».
 */
export function DashMobileNav({ items = [], activeId, onSelect, messagesItem }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const primaryCount = 3;
  const primary = items.slice(0, primaryCount);
  const overflow = items.slice(primaryCount);
  const showMore = overflow.length > 0;

  const pick = (id) => {
    onSelect(id);
    setMoreOpen(false);
  };

  return (
    <>
      <nav className="dash-mnav" aria-label="Navigation tableau de bord">
        {primary.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`dash-mnav__item${activeId === item.id ? " is-active" : ""}`}
            onClick={() => pick(item.id)}
          >
            <span className="dash-mnav__icon" aria-hidden>{item.icon}</span>
            <span className="dash-mnav__label">{item.shortLabel || item.label}</span>
          </button>
        ))}
        {messagesItem && (
          <button
            type="button"
            className={`dash-mnav__item${activeId === messagesItem.id ? " is-active" : ""}`}
            onClick={() => pick(messagesItem.id)}
          >
            <span className="dash-mnav__icon" aria-hidden>{messagesItem.icon}</span>
            <span className="dash-mnav__label">{messagesItem.shortLabel || messagesItem.label}</span>
          </button>
        )}
        {showMore && (
          <button
            type="button"
            className={`dash-mnav__item dash-mnav__item--more${overflow.some((i) => i.id === activeId) ? " is-active" : ""}`}
            onClick={() => setMoreOpen(true)}
            aria-expanded={moreOpen}
          >
            <MoreHorizontal size={20} strokeWidth={2} aria-hidden />
            <span className="dash-mnav__label">Plus</span>
          </button>
        )}
      </nav>

      {moreOpen && (
        <>
          <button type="button" className="dash-mnav-sheet__backdrop" aria-label="Fermer" onClick={() => setMoreOpen(false)} />
          <div className="dash-mnav-sheet" role="dialog" aria-label="Autres sections">
            <div className="dash-mnav-sheet__head">
              <strong>Autres sections</strong>
              <button type="button" onClick={() => setMoreOpen(false)} aria-label="Fermer">
                <X size={20} />
              </button>
            </div>
            <div className="dash-mnav-sheet__list">
              {overflow.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`dash-mnav-sheet__item${activeId === item.id ? " is-active" : ""}`}
                  onClick={() => pick(item.id)}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

/** Réorganise les onglets pour mobile (labels courts). */
export function buildMobileDashNavItems(items, locale = "fr") {
  const isEn = locale === "en";
  const order = ["overview", "commandes", "mesProduits", "disponibles", "favoris", "demandes", "wallet", "b2bDemandes", "loyalty", "parrainage", "kyc", "ajouterProduit", "enCours", "historique", "mesServices", "ajouterService"];
  const sorted = [...items].sort((a, b) => {
    const ia = order.indexOf(a.id);
    const ib = order.indexOf(b.id);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });

  const shortLabels = {
    overview: isEn ? "Home" : "Accueil",
    commandes: isEn ? "Orders" : "Commandes",
    mesProduits: isEn ? "Products" : "Produits",
    disponibles: isEn ? "Jobs" : "Dispos",
    favoris: isEn ? "Saved" : "Favoris",
    demandes: isEn ? "Requests" : "Demandes",
    wallet: isEn ? "Wallet" : "Wallet",
    b2bDemandes: "B2B",
    loyalty: isEn ? "Points" : "Points",
    parrainage: isEn ? "Refer" : "Parrainage",
    kyc: "KYC",
    ajouterProduit: isEn ? "Add" : "Ajouter",
    enCours: isEn ? "Active" : "En cours",
    historique: isEn ? "History" : "Historique",
    mesServices: isEn ? "Services" : "Services",
    ajouterService: isEn ? "Add+" : "Ajouter+",
  };

  return sorted.map((item) => ({
    ...item,
    shortLabel: shortLabels[item.id] || item.label?.split?.(" ")?.[0] || item.label,
  }));
}
