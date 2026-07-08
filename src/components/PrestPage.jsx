import { useState, useEffect, useMemo } from "react";
import { YORIX_WA_NUMBER } from "../lib/supabase";
import { ContentIcon, prestIconKey, PREST_CATEGORY_ICON_KEYS } from "../lib/contentIcons";
import {
  Search, MapPin, Shield, Star, CheckCircle2, X, HardHat,
  Phone, MessageCircle, Calendar, CircleDot, FileText, Tag, Clock3, MoreHorizontal,
} from "lucide-react";
import { CITIES, PREST_DATA } from "../lib/constants";
import { showAppToast } from "../lib/appToast";
import { PrestCard, formatPrestPrix } from "./PrestCard";
import { PrestProvidersMap } from "./prest/PrestProvidersMap";
import { portfolioCount } from "../lib/prestCardMeta";
import "./prest/prestPage.css";

const CATEGORIES = [
  { cat: "", iconKey: "star", label: "Tous" },
  { cat: "Plomberie", iconKey: "wrench", label: "Plomberie" },
  { cat: "Électricité", iconKey: "zap", label: "Électricité" },
  { cat: "Nettoyage", iconKey: "sparkles", label: "Ménage" },
  { cat: "Beauté", iconKey: "scissors", label: "Beauté" },
  { cat: "Réparation", iconKey: "hammer", label: "Réparation" },
  { cat: "Photographie", iconKey: "camera", label: "Photo" },
  { cat: "Menuiserie", iconKey: "hammer", label: "Menuiserie" },
  { cat: "Informatique", iconKey: "laptop", label: "Tech" },
  { cat: "Transport", iconKey: "truck", label: "Transport" },
];

const TRI_OPTIONS = [
  { id: "dispo", label: "Disponibles", iconKey: "circleDot" },
  { id: "notes", label: "Mieux notés", iconKey: "star" },
  { id: "proches", label: "Plus proches", iconKey: "mapPin" },
  { id: "premium", label: "Premium", iconKey: "gem" },
];

export function PrestPage({
  user,
  userData,
  allServices,
  goPage,
  setSelectedPrest,
  selectedPrest,
  onOpenPrestDetail,
  onClosePrestDetail,
  syncFilters,
  onAddServiceToCart,
  siteLocale = "fr",
}) {
  const isEn = siteLocale === "en";

  const openPrest = (p) => {
    setSelectedPrest(p);
    onOpenPrestDetail?.(p);
  };
  const closePrest = () => {
    setSelectedPrest(null);
    onClosePrestDetail?.();
  };

  const [prestSearch, setPrestSearch] = useState("");
  const [prestQuartier, setPrestQuartier] = useState("");
  const [prestCatFilter, setPrestCatFilter] = useState("");
  const [prestVilleFilter, setPrestVilleFilter] = useState("");
  const [triActif, setTriActif] = useState("dispo");
  const [geoActive, setGeoActive] = useState(false);
  const [modalContactOpen, setModalContactOpen] = useState(false);

  useEffect(() => {
    if (!syncFilters) return;
    setPrestCatFilter(syncFilters.cat || "");
    setPrestVilleFilter(syncFilters.ville || "");
  }, [syncFilters]);

  const activerGeo = () => {
    if (!navigator.geolocation) {
      showAppToast(isEn ? "Geolocation not supported." : "Géolocalisation non supportée.", "info");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => setGeoActive(true),
      () => showAppToast(isEn ? "Could not get location." : "Impossible d'obtenir votre position.", "warning"),
    );
  };

  const filteredPrests = useMemo(() => {
    const realPrests = (allServices || []).map((s) => ({
      id: `real-${s.id}`,
      name: s.provider_nom || "Prestataire Yorix",
      metier: s.nom || "Service",
      categorie: s.categorie || "Autre",
      ville: s.ville || "Cameroun",
      quartier: "",
      iconKey: PREST_CATEGORY_ICON_KEYS[s.categorie] || "wrench",
      photo: null,
      tags: [s.categorie || "Service"].filter(Boolean),
      note: s.note || 0,
      avis: s.nombre_avis || 0,
      prix: s.prix ? `${Number(s.prix).toLocaleString("fr-FR")} FCFA` : formatPrestPrix({ tarif_type: s.tarif_type || "projet" }),
      tarif_type: s.tarif_type || "projet",
      experience: "Nouveau",
      verifie: false,
      top: false,
      dispo: s.disponible !== false,
      reponse_rapide: s.disponible !== false,
      bio: s.description || "Service de qualité sur Yorix.",
      telephone: "",
      realisations: 0,
      isReal: true,
    }));

    const factices = PREST_DATA.map((p) => ({
      ...p,
      prix: p.prix && p.prix !== "" ? p.prix : formatPrestPrix({ tarif_type: p.tarif_type || "projet" }),
      reponse_rapide: p.reponse_rapide ?? p.dispo,
    }));

    let result = [...factices, ...realPrests];

    if (prestSearch.trim()) {
      const s = prestSearch.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(s) ||
        (p.metier || "").toLowerCase().includes(s) ||
        (p.categorie || "").toLowerCase().includes(s) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(s)),
      );
    }
    if (prestQuartier.trim()) {
      const q = prestQuartier.toLowerCase();
      result = result.filter((p) =>
        (p.quartier || "").toLowerCase().includes(q) ||
        (p.ville || "").toLowerCase().includes(q),
      );
    }
    if (prestCatFilter) result = result.filter((p) => p.categorie === prestCatFilter);
    if (prestVilleFilter) result = result.filter((p) => p.ville === prestVilleFilter);

    if (triActif === "notes") result.sort((a, b) => (b.note || 0) - (a.note || 0));
    else if (triActif === "premium") result.sort((a, b) => (b.premium ? 1 : 0) - (a.premium ? 1 : 0));
    else if (triActif === "dispo") result.sort((a, b) => (b.dispo ? 1 : 0) - (a.dispo ? 1 : 0));

    return result;
  }, [allServices, prestSearch, prestQuartier, prestCatFilter, prestVilleFilter, triActif]);

  const topPrests = filteredPrests.filter((p) => p.top);
  const otherPrests = filteredPrests.filter((p) => !p.top);
  const mapVille = prestVilleFilter || filteredPrests[0]?.ville || "Douala";
  const hasFilters = prestSearch || prestQuartier || prestCatFilter || prestVilleFilter;

  const clearFilters = () => {
    setPrestSearch("");
    setPrestQuartier("");
    setPrestCatFilter("");
    setPrestVilleFilter("");
  };

  const reservePrest = (prest) => {
    const msg = isEn
      ? `Hello Yorix! I'd like to book ${prest.name} (${prest.metier}) with Escrow payment.`
      : `Bonjour Yorix ! Je souhaite réserver ${prest.name} (${prest.metier}) — paiement Escrow sécurisé.`;
    window.open(`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section className="sec anim prest-page">

      {/* Hero compact — résultats immédiats */}
      <header className="prest-hero">
        <span className="prest-hero__badge">
          <Shield size={13} aria-hidden /> {isEn ? "Verified pros · Escrow protected" : "Pros vérifiés · Escrow sécurisé"}
        </span>
        <h1 className="prest-hero__title">
          {isEn ? (
            <>Find a <em>verified professional</em> in under 2 minutes</>
          ) : (
            <>Trouvez un <em>professionnel vérifié</em> en moins de 2 minutes</>
          )}
        </h1>
        <p className="prest-hero__sub">
          {isEn
            ? "850+ verified professionals across Cameroon — results update as you type."
            : "Plus de 850 professionnels vérifiés partout au Cameroun — les résultats se mettent à jour en direct."}
        </p>

        <div className="prest-search">
          <div className="prest-search__field">
            <Search size={16} aria-hidden />
            <input
              type="search"
              className="prest-search__input"
              placeholder={isEn ? "Trade (e.g. plumber, electrician…)" : "Métier (ex: plombier, électricien…)"}
              value={prestSearch}
              onChange={(e) => setPrestSearch(e.target.value)}
              aria-label={isEn ? "Search providers" : "Rechercher un prestataire"}
            />
          </div>
          <div className="prest-search__field">
            <MapPin size={16} aria-hidden />
            <input
              type="text"
              className="prest-search__input"
              placeholder={isEn ? "Neighbourhood" : "Quartier"}
              value={prestQuartier}
              onChange={(e) => setPrestQuartier(e.target.value)}
            />
          </div>
          <select
            className="prest-search__select"
            value={prestVilleFilter}
            onChange={(e) => setPrestVilleFilter(e.target.value)}
            aria-label={isEn ? "City" : "Ville"}
          >
            <option value="">{isEn ? "All cities" : "Toutes villes"}</option>
            {CITIES.filter((c) => c !== "Toutes les villes").map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button
            type="button"
            className={`prest-search__geo${geoActive ? " is-active" : ""}`}
            onClick={activerGeo}
          >
            {geoActive ? <><CheckCircle2 size={14} aria-hidden /> {isEn ? "Near me" : "Près de moi"}</> : <><MapPin size={14} aria-hidden /> {isEn ? "Near me" : "Près de moi"}</>}
          </button>
        </div>
        <p className="prest-search__count" aria-live="polite">
          {filteredPrests.length} {isEn ? "provider(s) found" : "prestataire(s) — mise à jour instantanée"}
        </p>
      </header>

      {/* Catégories + tri — palette sobre */}
      <div className="prest-toolbar">
        {CATEGORIES.map((c) => (
          <button
            key={c.label}
            type="button"
            className={`prest-cat-btn${prestCatFilter === c.cat ? " is-active" : ""}`}
            onClick={() => setPrestCatFilter(c.cat)}
          >
            <ContentIcon name={c.iconKey} size={13} /> {c.label}
          </button>
        ))}
      </div>
      <div className="prest-toolbar">
        <span style={{ fontSize: ".72rem", color: "var(--gray)", fontWeight: 600 }}>
          {isEn ? "Sort:" : "Trier :"}
        </span>
        {TRI_OPTIONS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`prest-sort-btn${triActif === t.id ? " is-active" : ""}`}
            onClick={() => setTriActif(t.id)}
          >
            <ContentIcon name={t.iconKey} size={12} /> {t.label}
          </button>
        ))}
        {hasFilters && (
          <button type="button" className="prest-clear-btn" onClick={clearFilters}>
            <X size={12} aria-hidden /> {isEn ? "Clear" : "Effacer"}
          </button>
        )}
      </div>

      {/* Résultats + carte */}
      <div className="prest-layout" id="prest-results">
        <div>
          {topPrests.length > 0 && (
            <>
              <div className="prest-section-title">
                <Star size={16} fill="#fcd116" color="#fcd116" aria-hidden />
                {isEn ? "Top providers" : "Top prestataires"}
                <span className="prest-section-badge">{isEn ? "RECOMMENDED" : "RECOMMANDÉS"}</span>
              </div>
              <div className="prest-grid" style={{ marginBottom: "1.25rem" }}>
                {topPrests.map((p) => (
                  <PrestCard key={p.id} p={p} locale={siteLocale} onClick={() => openPrest(p)} />
                ))}
              </div>
            </>
          )}

          {otherPrests.length > 0 && (
            <>
              {topPrests.length > 0 && (
                <h3 className="prest-results-head">
                  <HardHat size={15} aria-hidden style={{ verticalAlign: "middle", marginRight: 6 }} />
                  {isEn ? "All providers" : "Tous les prestataires"}
                </h3>
              )}
              <div className="prest-grid">
                {otherPrests.map((p) => (
                  <PrestCard key={p.id} p={p} locale={siteLocale} onClick={() => openPrest(p)} />
                ))}
              </div>
            </>
          )}

          {filteredPrests.length === 0 && (
            <div className="empty-state" style={{ padding: "48px 16px" }}>
              <Search size={36} strokeWidth={1.5} aria-hidden />
              <p>{isEn ? "No providers match your search." : "Aucun prestataire ne correspond."}</p>
              <button type="button" className="form-submit" style={{ width: "auto" }} onClick={clearFilters}>
                {isEn ? "Show all" : "Voir tous"}
              </button>
            </div>
          )}

          {/* Tunnel Escrow — Uber + Escrow */}
          <div className="prest-escrow-flow">
            <h3 className="prest-escrow-flow__title">
              {isEn ? "Book with Escrow — pay only when satisfied" : "Réservez avec Escrow — payez seulement si satisfait"}
            </h3>
            <div className="prest-escrow-flow__steps">
              <span>{isEn ? "Book" : "Réserver"}</span>
              <span className="arrow">→</span>
              <span>Escrow</span>
              <span className="arrow">→</span>
              <span>{isEn ? "Pro arrives" : "Pro arrive"}</span>
              <span className="arrow">→</span>
              <span>PIN</span>
              <span className="arrow">→</span>
              <span>{isEn ? "Payment released" : "Paiement débloqué"}</span>
            </div>
          </div>
        </div>

        <PrestProvidersMap
          providers={filteredPrests}
          ville={mapVille}
          locale={siteLocale}
          onSelect={openPrest}
        />
      </div>

      {/* CTA pro — bas de page */}
      <div
        style={{
          marginTop: "1.5rem",
          padding: "1.25rem",
          borderRadius: 14,
          background: "linear-gradient(135deg, #1a3a24, #0d3320)",
          color: "#fff",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem" }}>
            {isEn ? "Are you a professional?" : "Vous êtes un pro ?"}
          </div>
          <div style={{ fontSize: ".8rem", opacity: 0.7, marginTop: 4 }}>
            {isEn ? "Join 850+ verified providers on Yorix." : "Rejoignez 850+ pros vérifiés sur Yorix."}
          </div>
        </div>
        <button
          type="button"
          onClick={() => goPage("inscription")}
          style={{
            background: "var(--yellow, #fcd116)",
            color: "#0d1f14",
            border: "none",
            padding: "11px 20px",
            borderRadius: 10,
            fontWeight: 800,
            fontSize: ".82rem",
            cursor: "pointer",
          }}
        >
          {isEn ? "Join free" : "S'inscrire gratuitement"}
        </button>
      </div>

      {/* Modal détail */}
      {selectedPrest && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closePrest()}>
          <div className="modal" style={{ maxWidth: 540 }}>
            <button type="button" className="modal-close" onClick={closePrest} aria-label={isEn ? "Close" : "Fermer"}>
              <X size={18} aria-hidden />
            </button>

            <div style={{ textAlign: "center", padding: "8px 0 16px" }}>
              {selectedPrest.photo ? (
                <img
                  src={selectedPrest.photo}
                  alt={selectedPrest.name}
                  style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", border: "4px solid #fff", boxShadow: "0 8px 24px rgba(0,0,0,.12)" }}
                />
              ) : (
                <div style={{ width: 120, height: 120, borderRadius: "50%", background: "var(--green)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                  <ContentIcon name={prestIconKey(selectedPrest)} size={48} />
                </div>
              )}
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", marginTop: 12 }}>
                {selectedPrest.name}
              </div>
              <div style={{ fontSize: ".82rem", color: "var(--gray)", marginTop: 4 }}>
                {selectedPrest.metier} · {selectedPrest.ville}
              </div>
              {selectedPrest.dispo && (
                <span className="prest-card__live" style={{ marginTop: 10 }}>
                  <span className="prest-card__live-dot" aria-hidden />
                  {isEn ? "Available now" : "Disponible maintenant"}
                </span>
              )}
            </div>

            {selectedPrest.bio && (
              <div style={{ background: "var(--surface2)", borderRadius: 10, padding: 14, marginBottom: 12 }}>
                <div style={{ fontSize: ".68rem", fontWeight: 700, color: "var(--gray)", marginBottom: 6, display: "flex", alignItems: "center", gap: 5 }}>
                  <FileText size={12} aria-hidden /> {isEn ? "ABOUT" : "À PROPOS"}
                </div>
                <p style={{ fontSize: ".84rem", lineHeight: 1.6, margin: 0 }}>{selectedPrest.bio}</p>
              </div>
            )}

            {portfolioCount(selectedPrest) > 0 && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: ".68rem", fontWeight: 700, color: "var(--gray)", marginBottom: 8 }}>
                  {isEn ? `Portfolio · ${portfolioCount(selectedPrest)} photos` : `Portfolio · ${portfolioCount(selectedPrest)} photos`}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
                  {(selectedPrest.portfolio_urls || []).slice(0, 4).map((url) => (
                    <img key={url} src={url} alt="" style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: 8 }} />
                  ))}
                  {!selectedPrest.portfolio_urls?.length &&
                    Array.from({ length: Math.min(4, portfolioCount(selectedPrest)) }).map((_, i) => (
                      <div key={i} style={{ aspectRatio: "1", borderRadius: 8, background: "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".65rem", color: "var(--gray)" }}>
                        {isEn ? "Work" : "Réalisation"} {i + 1}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {selectedPrest.video_url && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: ".68rem", fontWeight: 700, color: "var(--gray)", marginBottom: 6 }}>
                  {isEn ? "30s intro video" : "Vidéo de présentation (30 s)"}
                </div>
                <video src={selectedPrest.video_url} controls style={{ width: "100%", borderRadius: 10, maxHeight: 200 }} />
              </div>
            )}

            {selectedPrest.tags?.length > 0 && (
              <div style={{ marginBottom: 12, display: "flex", gap: 5, flexWrap: "wrap" }}>
                {selectedPrest.tags.map((t) => (
                  <span key={t} style={{ background: "var(--surface2)", padding: "4px 10px", borderRadius: 999, fontSize: ".68rem", fontWeight: 600 }}>
                    <Tag size={10} aria-hidden style={{ marginRight: 3 }} />{t}
                  </span>
                ))}
              </div>
            )}

            <div style={{ background: "color-mix(in srgb, var(--green) 8%, var(--surface))", borderRadius: 10, padding: 14, marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: ".65rem", color: "var(--gray)", fontWeight: 700 }}>{isEn ? "FROM" : "TARIF"}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: "var(--green)" }}>
                  {selectedPrest.prix || formatPrestPrix(selectedPrest)}
                </div>
              </div>
              {selectedPrest.temps_reponse && (
                <div style={{ fontSize: ".75rem", color: "var(--green)", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                  <Clock3 size={12} aria-hidden /> {selectedPrest.temps_reponse}
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                className="prest-card__cta-primary"
                style={{ flex: 1 }}
                onClick={() => reservePrest(selectedPrest)}
              >
                <Calendar size={14} aria-hidden /> {isEn ? "Book with Escrow" : "Réserver (Escrow)"}
              </button>
              <div className="prest-card__contact-wrap" style={{ position: "relative" }}>
                <button
                  type="button"
                  className="prest-card__cta-more"
                  style={{ height: "100%", minHeight: 44 }}
                  aria-expanded={modalContactOpen}
                  onClick={() => setModalContactOpen((o) => !o)}
                >
                  <MoreHorizontal size={18} aria-hidden />
                </button>
                {modalContactOpen && (
                  <div className="prest-card__contact-menu" style={{ bottom: "auto", top: "calc(100% + 6px)" }}>
                    <button
                      type="button"
                      onClick={() => {
                        const tel = (selectedPrest.telephone || YORIX_WA_NUMBER).replace(/\D/g, "");
                        window.open(`tel:+${tel}`, "_self");
                        setModalContactOpen(false);
                      }}
                    >
                      <Phone size={14} aria-hidden /> {isEn ? "Call" : "Appeler"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const tel = (selectedPrest.telephone || YORIX_WA_NUMBER).replace(/\D/g, "");
                        window.open(`https://wa.me/${tel}?text=${encodeURIComponent(`Bonjour ${selectedPrest.name} !`)}`, "_blank");
                        setModalContactOpen(false);
                      }}
                    >
                      <MessageCircle size={14} aria-hidden /> WhatsApp
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
