import { useState, useRef, useEffect } from "react";
import { YORIX_WA_NUMBER } from "../lib/supabase";
import { ContentIcon, prestIconKey } from "../lib/contentIcons";
import {
  MapPin,
  Star,
  Clock3,
  MessageCircle,
  Phone,
  Calendar,
  CheckCircle2,
  MoreHorizontal,
} from "lucide-react";
import {
  resolvePrestTier,
  prestArrivalEta,
  isLiveAvailable,
} from "../lib/prestCardMeta";

export const PREST_PRIX = {
  projet: 10000,
  heure: 5000,
};

export function formatPrestPrix(prest) {
  if (prest.prix_custom) return prest.prix_custom;
  if (prest.tarification === "horaire" || prest.tarif_type === "heure") {
    return `Dès ${PREST_PRIX.heure.toLocaleString()} FCFA/h`;
  }
  return `Dès ${PREST_PRIX.projet.toLocaleString()} FCFA/projet`;
}

export function PrestCard({ p, onClick, locale = "fr" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const displayPrix = p.prix || formatPrestPrix(p);
  const phone = (p.telephone || "").replace(/\D/g, "") || YORIX_WA_NUMBER;
  const tier = resolvePrestTier(p);
  const eta = prestArrivalEta(p, locale);
  const live = isLiveAvailable(p);
  const isEn = locale === "en";

  useEffect(() => {
    if (!menuOpen) return undefined;
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menuOpen]);

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    const msg = `Bonjour ${p.name} ! Je vous contacte via Yorix pour une prestation de ${p.metier || p.categorie}.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleCall = (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    window.open(`tel:+${phone}`, "_self");
  };

  const handleReserve = (e) => {
    e.stopPropagation();
    const msg = `Bonjour Yorix ! Je souhaite réserver avec ${p.name} (${p.metier || p.categorie}) — paiement Escrow sécurisé.`;
    window.open(`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <article className="prest-card" onClick={onClick}>
      <div className="prest-card__head">
        {tier && <span className="prest-card__tier">{tier.label}</span>}
        {p.photo ? (
          <img src={p.photo} alt={p.name} className="prest-card__avatar" onError={(e) => { e.currentTarget.style.display = "none"; }} />
        ) : (
          <div className="prest-card__avatar-fallback">
            <ContentIcon name={prestIconKey(p)} size={36} />
          </div>
        )}
        <div className="prest-card__identity">
          <div className="prest-card__name">
            {p.name}
            {p.verifie && <CheckCircle2 size={14} style={{ color: "var(--green)", verticalAlign: "middle", marginLeft: 4 }} aria-hidden />}
          </div>
          <div className="prest-card__metier">{p.metier || p.categorie}</div>
          <div className="prest-card__loc">
            <MapPin size={11} aria-hidden />
            {p.ville}{p.quartier ? `, ${p.quartier}` : ""}
          </div>
        </div>
      </div>

      <div className="prest-card__body">
        {live && (
          <span className="prest-card__live">
            <span className="prest-card__live-dot" aria-hidden />
            {isEn ? "Available now" : "Disponible maintenant"}
          </span>
        )}
        {eta && (
          <div className="prest-card__eta">
            <Clock3 size={12} aria-hidden /> {eta}
          </div>
        )}
        <div className="prest-card__stats">
          {(p.avis || 0) > 0 && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
              <Star size={12} fill="#fcd116" color="#fcd116" aria-hidden />
              <strong>{p.note}</strong>
              <span style={{ color: "var(--gray)" }}>({p.avis})</span>
            </span>
          )}
          {(p.realisations || 0) > 0 && (
            <span style={{ color: "var(--gray)" }}>{p.realisations} {isEn ? "jobs" : "missions"}</span>
          )}
        </div>
        <div className="prest-card__price">
          <div className="prest-card__price-lbl">{isEn ? "FROM" : "À PARTIR DE"}</div>
          <div className="prest-card__price-val">{displayPrix}</div>
        </div>
        <div className="prest-card__actions">
          <button type="button" className="prest-card__cta-primary" onClick={handleReserve}>
            <Calendar size={14} aria-hidden />
            {isEn ? "Book" : "Réserver"}
          </button>
          <div className="prest-card__contact-wrap" ref={menuRef}>
            <button
              type="button"
              className="prest-card__cta-more"
              aria-expanded={menuOpen}
              aria-label={isEn ? "Contact options" : "Options de contact"}
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((o) => !o);
              }}
            >
              <MoreHorizontal size={18} aria-hidden />
            </button>
            {menuOpen && (
              <div className="prest-card__contact-menu" role="menu">
                <button type="button" role="menuitem" onClick={handleCall}>
                  <Phone size={14} aria-hidden /> {isEn ? "Call" : "Appeler"}
                </button>
                <button type="button" role="menuitem" onClick={handleWhatsApp}>
                  <MessageCircle size={14} aria-hidden /> WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
