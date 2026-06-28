// ═══════════════════════════════════════════════════════════════
//  YORIX CM — PAGE PRESTATAIRES PREMIUM v2
//  ✅ Hero avec recherche puissante (métier + quartier + ville)
//  ✅ Raccourcis besoins urgents
//  ✅ Géolocalisation
//  ✅ Yorix Protect (système de confiance)
//  ✅ Catégories prioritaires
//  ✅ Tri intelligent
//  ✅ Sticky mobile CTA
//  ✅ "Cherche → Compare → Réserve → Service terminé"
// ═══════════════════════════════════════════════════════════════

import { useState, useEffect, useMemo } from "react";
import { YORIX_WA_NUMBER } from "../lib/supabase";
import { ContentIcon, prestIconKey, PREST_CATEGORY_ICON_KEYS } from "../lib/contentIcons";
import { Search, MapPin, Rocket, Shield, Star, CheckCircle2, AlertTriangle, RefreshCw, Phone, MessageCircle, Calendar, X, HardHat, Wrench, Zap, Users, CircleDot, Gem, Package, Briefcase, Clock3, Plus, FileText, Tag } from "lucide-react";
import { CITIES, PREST_DATA } from "../lib/constants";
import { showAppToast } from "../lib/appToast";
import { PrestCard, PREST_PRIX, formatPrestPrix } from "./PrestCard";

// ── CATÉGORIES PRIORITAIRES (forte demande quotidienne) ──
const CATEGORIES_PRIORITAIRES = [
  { cat: "", iconKey: "star", label: "Tous", color: "var(--green)" },
  { cat: "Plomberie", iconKey: "wrench", label: "Plomberie", color: "#3b82f6" },
  { cat: "Électricité", iconKey: "zap", label: "Électricité", color: "#f59e0b" },
  { cat: "Nettoyage", iconKey: "sparkles", label: "Ménage", color: "#10b981" },
  { cat: "Beauté", iconKey: "scissors", label: "Beauté", color: "#d946ef" },
  { cat: "Réparation", iconKey: "hammer", label: "Réparation", color: "#f97316" },
  { cat: "Photographie", iconKey: "camera", label: "Photo", color: "#8b5cf6" },
  { cat: "Cuisine", iconKey: "chefHat", label: "Traiteur", color: "#ef4444" },
  { cat: "Menuiserie", iconKey: "hammer", label: "Menuiserie", color: "#a855f7" },
  { cat: "Informatique", iconKey: "laptop", label: "Tech", color: "#06b6d4" },
  { cat: "Transport", iconKey: "truck", label: "Transport", color: "#0ea5e9" },
  { cat: "Couture", iconKey: "scissors", label: "Couture", color: "#ec4899" },
];

const RACCOURCIS_URGENTS = [
  { id: "plombier_urgent", label: "Plombier urgent", cat: "Plomberie", urgent: true, iconKey: "alert" },
  { id: "electricien_urgent", label: "Électricien urgent", cat: "Électricité", urgent: true, iconKey: "zap" },
  { id: "menage", label: "Ménage", cat: "Nettoyage", iconKey: "sparkles" },
  { id: "beaute_domicile", label: "Beauté à domicile", cat: "Beauté", iconKey: "scissors" },
  { id: "depannage", label: "Dépannage", cat: "Réparation", iconKey: "wrench" },
  { id: "livraison", label: "Livraison", cat: "Transport", iconKey: "package" },
];

const TRI_OPTIONS = [
  { id: "proches", label: "Plus proches", iconKey: "mapPin" },
  { id: "dispo", label: "Disponibles", iconKey: "circleDot" },
  { id: "notes", label: "Mieux notés", iconKey: "star" },
  { id: "moins_cher", label: "Moins chers", iconKey: "dollarSign" },
  { id: "premium", label: "Premium", iconKey: "gem" },
  { id: "urgent", label: "Urgence", iconKey: "alert" },
];

const PROTECT_BADGES = [
  { iconKey: "lock", label: "Paiement sécurisé" },
  { iconKey: "check", label: "Pro vérifié" },
  { iconKey: "lifeBuoy", label: "Support Yorix" },
  { iconKey: "shield", label: "Anti-arnaque" },
];

const WORKFLOW_STEPS = [
  { n: 1, iconKey: "search", t: "Cherchez", d: "Filtrez par métier, quartier ou note" },
  { n: 2, iconKey: "scale", t: "Comparez", d: "Profils, tarifs, avis et disponibilité" },
  { n: 3, iconKey: "calendar", t: "Réservez", d: "WhatsApp, appel ou réservation Yorix" },
  { n: 4, iconKey: "check", t: "Service terminé", d: "Évaluez et payez en toute sécurité" },
];

const PRO_PERKS = [
  { iconKey: "check", label: "Inscription gratuite" },
  { iconKey: "dollarSign", label: "Revenus 50K-300K/mois" },
  { iconKey: "smartphone", label: "Clients via WhatsApp" },
  { iconKey: "star", label: "Réputation en ligne" },
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
}) {
  const openPrest = (p) => {
    setSelectedPrest(p);
    onOpenPrestDetail?.(p);
  };
  const closePrest = () => {
    setSelectedPrest(null);
    onClosePrestDetail?.();
  };

  const [prestSearch, setPrestSearch]         = useState("");
  const [prestQuartier, setPrestQuartier]     = useState("");
  const [prestCatFilter, setPrestCatFilter]   = useState("");
  const [prestVilleFilter, setPrestVilleFilter] = useState("");
  const [triActif, setTriActif]               = useState("dispo");
  const [geoActive, setGeoActive]             = useState(false);
  const [userCoords, setUserCoords]           = useState(null);

  useEffect(() => {
    if (!syncFilters) return;
    setPrestCatFilter(syncFilters.cat || "");
    setPrestVilleFilter(syncFilters.ville || "");
  }, [syncFilters]);

  // ── Géolocalisation ──
  const activerGeo = () => {
    if (!navigator.geolocation) {
      showAppToast("La géolocalisation n'est pas supportée par votre navigateur.", "info");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoActive(true);
      },
      () => {
        showAppToast("Impossible d'obtenir votre position. Vérifiez les permissions.", "warning");
      }
    );
  };

  // ── Filtrage et tri ──
  const filteredPrests = useMemo(() => {
    // Combiner prestataires factices + réels Supabase
    const realPrests = (allServices || []).map((s) => ({
      id: `real-${s.id}`,
      name: s.provider_nom || "Prestataire Yorix",
      metier: s.nom || "Service",
      categorie: s.categorie || "Autre",
      ville: s.ville || "Cameroun",
      quartier: "",
      iconKey: PREST_CATEGORY_ICON_KEYS[s.categorie] || "wrench",
      photo: null,
      color_bg: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
      tags: [s.categorie || "Service"].filter(Boolean),
      note: s.note || 5.0,
      avis: s.nombre_avis || 0,
      // Application des prix harmonisés Yorix
      prix: s.prix
        ? `${Number(s.prix).toLocaleString("fr-FR")} FCFA`
        : formatPrestPrix({ tarif_type: s.tarif_type || "projet" }),
      tarif_type: s.tarif_type || "projet",
      experience: "Nouveau",
      verifie: false,
      top: false,
      dispo: s.disponible !== false,
      bio: s.description || "Service de qualité sur Yorix.",
      telephone: "",
      realisations: 0,
      temps_reponse: "< 1h",
      reponse_rapide: true,
      isReal: true,
    }));

    // Pour les prestataires factices, on harmonise aussi le prix s'il n'est pas défini
    const factices = PREST_DATA.map((p) => ({
      ...p,
      // Appliquer prix harmonisé si pas de prix custom
      prix: p.prix && p.prix !== ""
        ? p.prix
        : formatPrestPrix({ tarif_type: p.tarif_type || "projet" }),
      temps_reponse: p.temps_reponse || (p.reponse_rapide ? "< 1h" : "< 2h"),
    }));

    let result = [...factices, ...realPrests];

    // Filtre par recherche texte
    if (prestSearch.trim()) {
      const s = prestSearch.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(s) ||
        (p.metier || "").toLowerCase().includes(s) ||
        (p.categorie || "").toLowerCase().includes(s) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(s))
      );
    }

    // Filtre par quartier
    if (prestQuartier.trim()) {
      const q = prestQuartier.toLowerCase();
      result = result.filter(
        (p) =>
          (p.quartier || "").toLowerCase().includes(q) ||
          (p.ville || "").toLowerCase().includes(q)
      );
    }

    // Filtre catégorie
    if (prestCatFilter) {
      result = result.filter((p) => p.categorie === prestCatFilter);
    }

    // Filtre ville
    if (prestVilleFilter) {
      result = result.filter((p) => p.ville === prestVilleFilter);
    }

    // Tri
    if (triActif === "notes") {
      result.sort((a, b) => (b.note || 0) - (a.note || 0));
    } else if (triActif === "moins_cher") {
      const getNumPrix = (p) => {
        const m = (p.prix || "").toString().replace(/\D/g, "");
        return m ? parseInt(m, 10) : 999999;
      };
      result.sort((a, b) => getNumPrix(a) - getNumPrix(b));
    } else if (triActif === "premium") {
      result.sort((a, b) => (b.premium ? 1 : 0) - (a.premium ? 1 : 0));
    } else if (triActif === "urgent") {
      result.sort((a, b) => (b.urgent_24h ? 1 : 0) - (a.urgent_24h ? 1 : 0));
    } else if (triActif === "dispo") {
      result.sort((a, b) => (b.dispo ? 1 : 0) - (a.dispo ? 1 : 0));
    }

    return result;
  }, [allServices, prestSearch, prestQuartier, prestCatFilter, prestVilleFilter, triActif]);

  // ── Détection mobile pour sticky bar ──
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const topPrests = filteredPrests.filter((p) => p.top);
  const otherPrests = filteredPrests.filter((p) => !p.top);

  return (
    <section className="sec anim">

      {/* ═══ HERO PREMIUM AVEC RECHERCHE ═══ */}
      <div
        style={{
          background: "linear-gradient(135deg, #0a1410 0%, #1a3a24 50%, #0d3320 100%)",
          borderRadius: 18,
          padding: "30px 26px",
          color: "#fff",
          marginBottom: 20,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,.3)",
        }}
      >
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "rgba(252,209,22,.08)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -60, left: -50, width: 180, height: 180, background: "rgba(79,209,125,.06)", borderRadius: "50%" }} />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(252,209,22,.14)", color: "var(--yellow, #fcd116)",
              border: "1px solid rgba(252,209,22,.28)",
              padding: "5px 14px", borderRadius: 50,
              fontSize: ".7rem", fontWeight: 700, marginBottom: 14,
            }}
          >
            <HardHat size={14} aria-hidden /> Yorix Pros — Trouvez un pro fiable
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display), sans-serif", fontSize: "1.75rem", fontWeight: 800,
              marginBottom: 8, letterSpacing: "-.5px", lineHeight: 1.18,
            }}
          >
            Trouvez rapidement un <span style={{ color: "var(--yellow, #fcd116)" }}>professionnel fiable</span> près de chez vous
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,.65)", fontSize: ".9rem",
              marginBottom: 18, maxWidth: 600, lineHeight: 1.55,
            }}
          >
            Plombiers, électriciens, coiffeuses, photographes, menuisiers, réparateurs… vérifiés, notés et disponibles partout au Cameroun.
          </p>

          {/* ═══ MOTEUR DE RECHERCHE PUISSANT ═══ */}
          <div
            style={{
              background: "rgba(255,255,255,.08)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,.12)",
              borderRadius: 14,
              padding: 14,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 8,
                marginBottom: 10,
              }}
            >
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <div style={{ position: "relative", flex: "2 1 200px", minWidth: 180 }}>
                  <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", opacity: 0.85 }} aria-hidden />
                  <input
                    type="text"
                    placeholder="Métier ou prestation (ex: plombier, coiffeuse...)"
                    value={prestSearch}
                    onChange={(e) => setPrestSearch(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "11px 12px 11px 38px",
                      borderRadius: 9,
                      border: "1.5px solid rgba(255,255,255,.15)",
                      background: "rgba(255,255,255,.08)",
                      color: "#fff",
                      fontSize: ".84rem",
                      fontFamily: "var(--font-body)",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div style={{ position: "relative", flex: "1 1 140px", minWidth: 140 }}>
                  <MapPin size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", opacity: 0.85 }} aria-hidden />
                  <input
                    type="text"
                    placeholder="Quartier"
                    value={prestQuartier}
                    onChange={(e) => setPrestQuartier(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "11px 12px 11px 38px",
                      borderRadius: 9,
                      border: "1.5px solid rgba(255,255,255,.15)",
                      background: "rgba(255,255,255,.08)",
                      color: "#fff",
                      fontSize: ".84rem",
                      fontFamily: "var(--font-body)",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <select
                  value={prestVilleFilter}
                  onChange={(e) => setPrestVilleFilter(e.target.value)}
                  style={{
                    flex: "1 1 120px",
                    minWidth: 120,
                    padding: "11px 12px",
                    borderRadius: 9,
                    border: "1.5px solid rgba(255,255,255,.15)",
                    background: "rgba(255,255,255,.08)",
                    color: "#fff",
                    fontSize: ".84rem",
                    fontFamily: "var(--font-body)",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="" style={{ background: "#1a3a24" }}>Toutes villes</option>
                  {CITIES.filter((c) => c !== "Toutes les villes").map((c) => (
                    <option key={c} value={c} style={{ background: "#1a3a24" }}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                onClick={() => {
                  // Le filtrage est déjà actif via les states, on scroll vers les résultats
                  document.getElementById("prest-results")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  flex: "2 1 180px",
                  background: "linear-gradient(135deg, var(--yellow, #fcd116), #ffd84a)",
                  color: "#0d1f14",
                  border: "none",
                  padding: "12px 18px",
                  borderRadius: 10,
                  fontFamily: "var(--font-display), sans-serif",
                  fontWeight: 800,
                  fontSize: ".88rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(252,209,22,.3)",
                }}
              >
                <Rocket size={16} aria-hidden /> Trouver maintenant
              </button>
              <button
                onClick={activerGeo}
                style={{
                  flex: "1 1 140px",
                  background: geoActive ? "rgba(79,209,125,.2)" : "rgba(255,255,255,.08)",
                  color: geoActive ? "#4fd17d" : "#fff",
                  border: `1.5px solid ${geoActive ? "#4fd17d" : "rgba(255,255,255,.15)"}`,
                  padding: "12px 18px",
                  borderRadius: 10,
                  fontFamily: "var(--font-display), sans-serif",
                  fontWeight: 700,
                  fontSize: ".82rem",
                  cursor: "pointer",
                }}
              >
                {geoActive ? <><CheckCircle2 size={14} aria-hidden /> Position activée</> : <><MapPin size={14} aria-hidden /> Près de moi</>}
              </button>
            </div>
          </div>

          {/* ═══ RACCOURCIS URGENTS ═══ */}
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                fontSize: ".68rem",
                color: "rgba(255,255,255,.6)",
                fontWeight: 700,
                marginBottom: 8,
                letterSpacing: ".05em",
              }}
            >
              <Zap size={14} aria-hidden /> BESOIN URGENT ?
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {RACCOURCIS_URGENTS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setPrestCatFilter(r.cat)}
                  style={{
                    background: r.urgent ? "rgba(220,38,38,.2)" : "rgba(255,255,255,.08)",
                    color: r.urgent ? "#fca5a5" : "rgba(255,255,255,.85)",
                    border: r.urgent ? "1px solid rgba(220,38,38,.4)" : "1px solid rgba(255,255,255,.12)",
                    padding: "6px 12px",
                    borderRadius: 50,
                    fontSize: ".72rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    transition: "all .15s",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <ContentIcon name={r.iconKey} size={13} /> {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stats minimalistes */}
          <div
            style={{
              display: "flex",
              gap: 18,
              flexWrap: "wrap",
              paddingTop: 12,
              borderTop: "1px solid rgba(255,255,255,.1)",
            }}
          >
            {[
              { val: "850+", lbl: "Pros vérifiés" },
              { val: "100%", lbl: "Profils contrôlés" },
              { val: "4.8/5", lbl: "Note moyenne" },
              { val: "< 1h", lbl: "Temps de réponse" },
            ].map((s) => (
              <div key={s.lbl}>
                <div
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontSize: ".95rem",
                    fontWeight: 800,
                    color: "var(--yellow, #fcd116)",
                  }}
                >
                  {s.val}
                </div>
                <div style={{ fontSize: ".62rem", color: "rgba(255,255,255,.55)" }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ YORIX PROTECT ═══ */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--green-pale, #e8f5e9), #fef9e0)",
          border: "2px solid var(--green-light, #86efac)",
          borderRadius: 14,
          padding: "16px 20px",
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ color: "var(--green, #1a6b3a)" }}>
            <Shield size={32} strokeWidth={2.25} aria-hidden />
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-display), sans-serif",
                fontWeight: 800,
                fontSize: ".95rem",
                color: "var(--ink, #111)",
                marginBottom: 2,
              }}
            >
              Yorix Protect — Tranquillité garantie
            </div>
            <div style={{ fontSize: ".74rem", color: "var(--gray, #666)" }}>
              Tous nos prestataires sont vérifiés et nos transactions protégées.
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {PROTECT_BADGES.map((b) => (
            <span
              key={b.label}
              style={{
                background: "var(--surface, #fff)",
                color: "var(--ink, #111)",
                padding: "4px 10px",
                borderRadius: 50,
                fontSize: ".68rem",
                fontWeight: 600,
                border: "1px solid var(--border, #e5e5e5)",
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <ContentIcon name={b.iconKey} size={12} /> {b.label}
            </span>
          ))}
        </div>
      </div>

      {/* ═══ CATÉGORIES PRIORITAIRES ═══ */}
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: 18,
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        {CATEGORIES_PRIORITAIRES.map((c) => (
          <button
            key={c.label}
            onClick={() => setPrestCatFilter(c.cat)}
            style={{
              background: prestCatFilter === c.cat ? c.color : "var(--surface, #fff)",
              color: prestCatFilter === c.cat ? "#fff" : "var(--ink, #111)",
              border: `1.5px solid ${prestCatFilter === c.cat ? c.color : "var(--border, #e5e5e5)"}`,
              borderRadius: 50,
              padding: "8px 16px",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: ".78rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all .2s",
              flexShrink: 0,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <ContentIcon name={c.iconKey} size={14} /> {c.label}
          </button>
        ))}
      </div>

      {/* ═══ TRI INTELLIGENT ═══ */}
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: 16,
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: ".74rem",
            color: "var(--gray, #666)",
            fontWeight: 600,
          }}
        >
          Trier par :
        </span>
        {TRI_OPTIONS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTriActif(t.id)}
            style={{
              background: triActif === t.id ? "var(--green, #1a6b3a)" : "var(--surface2, #f5f5f5)",
              color: triActif === t.id ? "#fff" : "var(--ink, #111)",
              border: "none",
              padding: "5px 12px",
              borderRadius: 50,
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: ".7rem",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <ContentIcon name={t.iconKey} size={12} /> {t.label}
          </button>
        ))}
        {(prestSearch || prestQuartier || prestCatFilter || prestVilleFilter) && (
          <button
            onClick={() => {
              setPrestSearch("");
              setPrestQuartier("");
              setPrestCatFilter("");
              setPrestVilleFilter("");
            }}
            style={{
              marginLeft: "auto",
              background: "transparent",
              color: "var(--red, #ce1126)",
              border: "1px solid var(--red, #ce1126)",
              padding: "5px 12px",
              borderRadius: 50,
              fontSize: ".7rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <X size={12} aria-hidden /> Effacer filtres
          </button>
        )}
      </div>

      {/* ═══ RÉSULTATS ═══ */}
      <div id="prest-results">
        <div
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontWeight: 700,
            fontSize: ".95rem",
            color: "var(--ink, #111)",
            marginBottom: 14,
          }}
        >
          {filteredPrests.length} prestataire{filteredPrests.length > 1 ? "s" : ""} trouvé{filteredPrests.length > 1 ? "s" : ""}
        </div>

        {/* TOP PRESTATAIRES */}
        {topPrests.length > 0 && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Star size={18} fill="#fcd116" color="#fcd116" aria-hidden />
              <h3
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontWeight: 800,
                  fontSize: "1rem",
                  color: "var(--ink, #111)",
                  margin: 0,
                }}
              >
                Top prestataires
              </h3>
              <span
                style={{
                  background: "var(--yellow, #fcd116)",
                  color: "#0d1f14",
                  fontSize: ".58rem",
                  fontWeight: 800,
                  padding: "2px 8px",
                  borderRadius: 50,
                }}
              >
                RECOMMANDÉS
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
                gap: 14,
                marginBottom: 24,
              }}
            >
              {topPrests.map((p) => (
                <PrestCard key={p.id} p={p} onClick={() => openPrest(p)} />
              ))}
            </div>
          </>
        )}

        {/* TOUS LES AUTRES */}
        {otherPrests.length > 0 && (
          <>
            {topPrests.length > 0 && (
              <h3
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontWeight: 800,
                  fontSize: "1rem",
                  color: "var(--ink, #111)",
                  marginBottom: 12,
                }}
              >
                <HardHat size={16} aria-hidden /> Tous les prestataires
              </h3>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
                gap: 14,
              }}
            >
              {otherPrests.map((p) => (
                <PrestCard key={p.id} p={p} onClick={() => openPrest(p)} />
              ))}
            </div>
          </>
        )}

        {/* Aucun résultat */}
        {filteredPrests.length === 0 && (
          <div className="empty-state" style={{ padding: "60px 20px" }}>
            <div className="empty-icon" style={{ display: "flex", justifyContent: "center" }}>
              <Search size={40} strokeWidth={1.75} aria-hidden />
            </div>
            <p>Aucun prestataire ne correspond à votre recherche.</p>
            <button
              onClick={() => {
                setPrestSearch("");
                setPrestQuartier("");
                setPrestCatFilter("");
                setPrestVilleFilter("");
              }}
              style={{
                background: "var(--green, #1a6b3a)",
                color: "#fff",
                border: "none",
                padding: "10px 22px",
                borderRadius: 9,
                marginTop: 14,
                fontFamily: "var(--font-display), sans-serif",
                fontWeight: 700,
                fontSize: ".82rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <RefreshCw size={14} aria-hidden /> Voir tous les prestataires
            </button>
          </div>
        )}
      </div>

      {/* ═══ COMMENT ÇA FONCTIONNE (NOUVEAU FLOW) ═══ */}
      <div
        style={{
          background: "var(--surface, #fff)",
          border: "1px solid var(--border, #e5e5e5)",
          borderRadius: 14,
          padding: 22,
          marginTop: 30,
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontWeight: 800,
            fontSize: "1.05rem",
            color: "var(--ink, #111)",
            marginBottom: 16,
            textAlign: "center",
            letterSpacing: "-.3px",
          }}
        >
          <MapPin size={18} aria-hidden style={{ verticalAlign: "middle", marginRight: 6 }} />
          Comment ça fonctionne ?
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
          }}
        >
          {WORKFLOW_STEPS.map((s) => (
            <div
              key={s.n}
              style={{
                textAlign: "center",
                padding: "14px 10px",
                background: "var(--surface2, #f5f5f5)",
                borderRadius: 10,
                border: "1px solid var(--border, #e5e5e5)",
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  background: "var(--green, #1a6b3a)",
                  color: "#fff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-display), sans-serif",
                  fontWeight: 800,
                  fontSize: ".78rem",
                  margin: "0 auto 10px",
                }}
              >
                {s.n}
              </div>
              <div style={{ marginBottom: 5, color: "var(--green, #1a6b3a)", display: "flex", justifyContent: "center" }}>
                <ContentIcon name={s.iconKey} size={24} />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontWeight: 700,
                  fontSize: ".82rem",
                  color: "var(--ink, #111)",
                  marginBottom: 4,
                }}
              >
                {s.t}
              </div>
              <div
                style={{
                  fontSize: ".68rem",
                  color: "var(--gray, #666)",
                  lineHeight: 1.5,
                }}
              >
                {s.d}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ CTA DEVENIR PRESTATAIRE (BOOSTÉ) ═══ */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a3a24, #0d3320)",
          borderRadius: 16,
          padding: "30px 26px",
          marginTop: 24,
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: -30, right: -30, width: 150, height: 150, background: "rgba(252,209,22,.1)", borderRadius: "50%" }} />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 24,
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(252,209,22,.15)",
                color: "var(--yellow, #fcd116)",
                padding: "4px 12px",
                borderRadius: 50,
                fontSize: ".68rem",
                fontWeight: 700,
                marginBottom: 10,
              }}
            >
              <Briefcase size={13} aria-hidden /> Devenez pro Yorix
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display), sans-serif",
                fontWeight: 800,
                fontSize: "1.4rem",
                marginBottom: 8,
                letterSpacing: "-.4px",
                lineHeight: 1.2,
              }}
            >
              Vous êtes un pro ? <span style={{ color: "var(--yellow, #fcd116)" }}>Gagnez plus avec Yorix.</span>
            </h3>
            <p
              style={{
                fontSize: ".88rem",
                color: "rgba(255,255,255,.65)",
                lineHeight: 1.6,
                marginBottom: 14,
              }}
            >
              Rejoignez 850+ professionnels qui développent leur activité grâce à Yorix. Nouveaux clients, paiement garanti, réputation en ligne.
            </p>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
              {PRO_PERKS.map((p) => (
                <span
                  key={p.label}
                  style={{
                    background: "rgba(255,255,255,.1)",
                    color: "rgba(255,255,255,.85)",
                    padding: "4px 10px",
                    borderRadius: 50,
                    fontSize: ".68rem",
                    fontWeight: 600,
                    border: "1px solid rgba(255,255,255,.15)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <ContentIcon name={p.iconKey} size={12} /> {p.label}
                </span>
              ))}
            </div>

            <button
              onClick={() => goPage("inscription")}
              style={{
                background: "linear-gradient(135deg, var(--yellow, #fcd116), #ffd84a)",
                color: "#0d1f14",
                border: "none",
                padding: "13px 26px",
                borderRadius: 11,
                fontFamily: "var(--font-display), sans-serif",
                fontWeight: 800,
                fontSize: ".9rem",
                cursor: "pointer",
                boxShadow: "0 6px 18px rgba(252,209,22,.3)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Rocket size={16} aria-hidden /> Devenir prestataire gratuitement
            </button>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 6, color: "var(--yellow, #fcd116)" }}>
              <HardHat size={48} strokeWidth={1.75} aria-hidden />
              <Briefcase size={48} strokeWidth={1.75} aria-hidden />
            </div>
            <div
              style={{
                background: "rgba(252,209,22,.15)",
                border: "1px solid rgba(252,209,22,.3)",
                borderRadius: 12,
                padding: 14,
                marginTop: 8,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: "var(--yellow, #fcd116)",
                }}
              >
                +850
              </div>
              <div style={{ fontSize: ".7rem", color: "rgba(255,255,255,.7)", fontWeight: 600 }}>
                pros déjà inscrits
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ STICKY MOBILE CTA ═══ */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            bottom: 70,
            left: 12,
            right: 12,
            zIndex: 998,
            display: "flex",
            gap: 8,
          }}
        >
          <button
            onClick={() =>
              window.open(
                `https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent("Bonjour Yorix ! Je cherche un prestataire.")}`,
                "_blank"
              )
            }
            style={{
              flex: 2,
              background: "linear-gradient(135deg, var(--yellow, #fcd116), #ffd84a)",
              color: "#0d1f14",
              border: "none",
              padding: "13px 16px",
              borderRadius: 50,
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 800,
              fontSize: ".85rem",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(252,209,22,.45), 0 2px 6px rgba(0,0,0,.15)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Rocket size={16} aria-hidden /> Trouver un pro maintenant
          </button>
          <button
            onClick={() =>
              window.open(
                `https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent("Bonjour Yorix ! J'ai besoin d'aide pour trouver un prestataire.")}`,
                "_blank"
              )
            }
            style={{
              width: 50,
              height: 50,
              background: "#25D366",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              fontSize: "1.4rem",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(37,211,102,.45), 0 2px 6px rgba(0,0,0,.15)",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Contacter via WhatsApp"
          >
            <MessageCircle size={22} aria-hidden />
          </button>
        </div>
      )}

      {/* ═══ MODAL DÉTAIL PRESTATAIRE ═══ */}
      {selectedPrest && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && closePrest()}
        >
          <div className="modal" style={{ maxWidth: 540 }}>
            <button type="button" className="modal-close" onClick={() => closePrest()} aria-label="Fermer">
              <X size={18} aria-hidden />
            </button>

            {/* Photo/Avatar header */}
            <div
              style={{
                background: selectedPrest.color_bg || "var(--green-pale, #e8f5e9)",
                borderRadius: 12,
                padding: 24,
                marginBottom: 16,
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {selectedPrest.photo ? (
                <img
                  src={selectedPrest.photo}
                  alt={selectedPrest.name}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "4px solid #fff",
                    boxShadow: "0 6px 20px rgba(0,0,0,.15)",
                  }}
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              ) : (
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: "var(--green, #1a6b3a)",
                    color: "#fff",
                    fontSize: "3rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "4px solid #fff",
                    boxShadow: "0 6px 20px rgba(0,0,0,.15)",
                  }}
                >
                  <ContentIcon name={prestIconKey(selectedPrest)} size={40} />
                </div>
              )}

              <div
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  color: "var(--ink, #111)",
                  marginTop: 12,
                }}
              >
                {selectedPrest.name}
                {selectedPrest.verifie && (
                  <span style={{ marginLeft: 6, fontSize: ".82rem", color: "#0066cc" }}>✓</span>
                )}
              </div>
              <div style={{ fontSize: ".82rem", color: "var(--gray, #666)", marginTop: 3, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, flexWrap: "wrap" }}>
                <span>{selectedPrest.metier}</span>
                <span>·</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                  <MapPin size={12} aria-hidden /> {selectedPrest.ville}
                  {selectedPrest.quartier && `, ${selectedPrest.quartier}`}
                </span>
              </div>

              {/* Badges */}
              <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginTop: 10 }}>
                {selectedPrest.top && (
                  <span style={{ background: "var(--yellow, #fcd116)", color: "#0d1f14", padding: "3px 10px", borderRadius: 50, fontSize: ".62rem", fontWeight: 800, display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <Star size={10} fill="#0d1f14" aria-hidden /> TOP
                  </span>
                )}
                {selectedPrest.dispo && (
                  <span style={{ background: "#dcfce7", color: "#15803d", padding: "3px 10px", borderRadius: 50, fontSize: ".62rem", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <CircleDot size={10} aria-hidden /> Disponible
                  </span>
                )}
                {selectedPrest.urgent_24h && (
                  <span style={{ background: "#fff0f0", color: "#dc2626", padding: "3px 10px", borderRadius: 50, fontSize: ".62rem", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <AlertTriangle size={10} aria-hidden /> Urgence 24h
                  </span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 14 }}>
              {[
                { iconKey: "star", val: selectedPrest.note, lbl: `${selectedPrest.avis} avis` },
                { iconKey: "package", val: selectedPrest.realisations, lbl: "missions" },
                { iconKey: "briefcase", val: selectedPrest.experience, lbl: "expérience" },
              ].map((s) => (
                <div
                  key={s.lbl}
                  style={{
                    background: "var(--surface2, #f5f5f5)",
                    borderRadius: 9,
                    padding: 10,
                    textAlign: "center",
                    border: "1px solid var(--border, #e5e5e5)",
                  }}
                >
                  <div style={{ marginBottom: 2, display: "flex", justifyContent: "center", color: "var(--green, #1a6b3a)" }}>
                    <ContentIcon name={s.iconKey} size={16} />
                  </div>
                  <div style={{ fontFamily: "var(--font-display), sans-serif", fontWeight: 800, fontSize: ".85rem", color: "var(--ink, #111)" }}>
                    {s.val}
                  </div>
                  <div style={{ fontSize: ".62rem", color: "var(--gray, #666)" }}>{s.lbl}</div>
                </div>
              ))}
            </div>

            {/* Bio */}
            {selectedPrest.bio && (
              <div style={{ background: "var(--surface2, #f5f5f5)", borderRadius: 10, padding: 14, marginBottom: 14 }}>
                <div style={{ fontSize: ".68rem", fontWeight: 700, color: "var(--gray, #666)", marginBottom: 6, display: "flex", alignItems: "center", gap: 5 }}>
                  <FileText size={12} aria-hidden /> À PROPOS
                </div>
                <p style={{ fontSize: ".84rem", color: "var(--ink, #111)", lineHeight: 1.6 }}>
                  {selectedPrest.bio}
                </p>
              </div>
            )}

            {/* Tags / Spécialités */}
            {selectedPrest.tags && selectedPrest.tags.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: ".68rem", fontWeight: 700, color: "var(--gray, #666)", marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
                  <Tag size={12} aria-hidden /> SPÉCIALITÉS
                </div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {selectedPrest.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        background: "var(--green-pale, #e8f5e9)",
                        color: "var(--green, #1a6b3a)",
                        border: "1px solid var(--green-light, #86efac)",
                        padding: "4px 12px",
                        borderRadius: 50,
                        fontSize: ".7rem",
                        fontWeight: 600,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Prix */}
            <div
              style={{
                background: "var(--green-pale, #e8f5e9)",
                border: "1px solid var(--green-light, #86efac)",
                borderRadius: 10,
                padding: 14,
                marginBottom: 14,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: ".68rem", color: "var(--gray, #666)", fontWeight: 700 }}>TARIF</div>
                <div style={{ fontFamily: "var(--font-display), sans-serif", fontWeight: 800, fontSize: "1.15rem", color: "var(--green, #1a6b3a)" }}>
                  {selectedPrest.prix || formatPrestPrix(selectedPrest)}
                </div>
              </div>
              {selectedPrest.temps_reponse && (
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: ".62rem", color: "var(--gray, #666)" }}>Réponse</div>
                  <div style={{ fontSize: ".82rem", color: "var(--green, #1a6b3a)", fontWeight: 700, display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
                    <Clock3 size={12} aria-hidden /> {selectedPrest.temps_reponse}
                  </div>
                </div>
              )}
            </div>

            {/* 3 BOUTONS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/${(selectedPrest.telephone || YORIX_WA_NUMBER).replace(/\D/g, "")}?text=${encodeURIComponent(`Bonjour ${selectedPrest.name} ! Je vous contacte via Yorix.`)}`,
                    "_blank"
                  )
                }
                style={{
                  background: "#25D366", color: "#fff", border: "none",
                  padding: "11px 8px", borderRadius: 9,
                  fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: ".75rem",
                  cursor: "pointer",
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4,
                }}
              >
                <MessageCircle size={14} aria-hidden /> WhatsApp
              </button>
              <button
                onClick={() => {
                  const tel = (selectedPrest.telephone || YORIX_WA_NUMBER).replace(/\D/g, "");
                  window.open(`tel:+${tel}`, "_self");
                }}
                style={{
                  background: "#0066cc", color: "#fff", border: "none",
                  padding: "11px 8px", borderRadius: 9,
                  fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: ".75rem",
                  cursor: "pointer",
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4,
                }}
              >
                <Phone size={14} aria-hidden /> Appeler
              </button>
              <button
                onClick={() => {
                  if (!onAddServiceToCart) return;
                  const priceNum =
                    Number((selectedPrest.prix || "").toString().replace(/\D/g, "")) || 0;
                  onAddServiceToCart({
                    id: selectedPrest.id,
                    name: selectedPrest.metier || selectedPrest.name,
                    provider_nom: selectedPrest.name,
                    provider_id: selectedPrest.isReal ? String(selectedPrest.id).replace(/^real-/, "") : null,
                    categorie: selectedPrest.categorie,
                    ville: selectedPrest.ville,
                    prix: priceNum,
                    prix_number: priceNum,
                    photo: selectedPrest.photo,
                  });
                  closePrest();
                }}
                style={{
                  background: "var(--surface2, #f5f5f5)", color: "var(--ink, #111)", border: "1px solid var(--border,#ddd)",
                  padding: "11px 8px", borderRadius: 9,
                  fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: ".75rem",
                  cursor: "pointer",
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4,
                }}
              >
                <Plus size={14} aria-hidden /> Panier
              </button>
              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent(`Bonjour Yorix ! Je souhaite réserver une prestation avec ${selectedPrest.name} (${selectedPrest.metier}).`)}`,
                    "_blank"
                  )
                }
                style={{
                  background: "var(--green, #1a6b3a)", color: "#fff", border: "none",
                  padding: "11px 8px", borderRadius: 9,
                  fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: ".75rem",
                  cursor: "pointer",
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4,
                }}
              >
                <Calendar size={14} aria-hidden /> Réserver
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
