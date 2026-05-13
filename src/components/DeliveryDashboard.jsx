// ═══════════════════════════════════════════════════════════════════════════
// 🏍️ YORIX RIDE — DASHBOARD LIVREUR (Premium · Realtime · Mobile-First)
// ═══════════════════════════════════════════════════════════════════════════
// - Connecté à Supabase (table `deliveries`)
// - Realtime via supabase.channel pour des mises à jour instantanées
// - Workflow ACCEPTER / REFUSER avec notifications admin & client
// - Statistiques calculées dynamiquement (gains, taux d'acceptation, etc.)
// - UX premium : cartes modernes, timeline, badges, mobile-first
// ═══════════════════════════════════════════════════════════════════════════

import { useEffect, useMemo, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";
import {
  DELIVERY_STATUTS,
  getStatutConfig,
  livreurAccepter,
  livreurRefuser,
  livreurAvancerStatut,
  computeLivreurStats,
  openWhatsApp,
} from "../utils/deliveryWorkflow";

// ─── PETIT UTIL UI ──────────────────────────────────────────────────────────
function StatutBadge({ statut, size = "md" }) {
  const cfg = getStatutConfig(statut);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: size === "sm" ? "2px 8px" : "3px 10px",
        borderRadius: 50,
        background: cfg.bg,
        color: cfg.color,
        border: `1px solid ${cfg.color}`,
        fontSize: size === "sm" ? ".66rem" : ".72rem",
        fontWeight: 700,
        whiteSpace: "nowrap",
        lineHeight: 1.2,
      }}
    >
      <span>{cfg.icon}</span>
      <span>{cfg.label}</span>
    </span>
  );
}

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => onClose?.(), 3500);
    return () => clearTimeout(t);
  }, [toast, onClose]);
  if (!toast) return null;
  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        bottom: 90,
        transform: "translateX(-50%)",
        zIndex: 9999,
        background: toast.type === "error" ? "#ce1126" : "var(--green)",
        color: "#fff",
        padding: "11px 22px",
        borderRadius: 50,
        fontFamily: "'DM Sans',sans-serif",
        fontWeight: 600,
        fontSize: ".85rem",
        boxShadow: "0 8px 24px rgba(0,0,0,.25)",
        maxWidth: "calc(100vw - 32px)",
        textAlign: "center",
      }}
      role="status"
    >
      {toast.type === "error" ? "❌ " : "✅ "}{toast.msg}
    </div>
  );
}

// ─── CARTE LIVRAISON ────────────────────────────────────────────────────────
function LivraisonCard({ l, user, onAccepter, onRefuser, onAvancer, onContacter, onShowDetails }) {
  const cfg = getStatutConfig(l.statut);
  const isDispoForMe = l.statut === "livreur_assigne" && l.livreur_id === user?.id;
  const isMine = l.livreur_id === user?.id;
  const distance = l.distance_km ? `${l.distance_km} km` : "—";
  const eta = l.temps_estime_min ? `~${l.temps_estime_min} min` : "—";

  return (
    <div
      style={{
        background: "var(--surface)",
        border: `1.5px solid ${isDispoForMe ? cfg.color : "var(--border)"}`,
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        boxShadow: isDispoForMe ? `0 0 0 3px ${cfg.bg}` : "0 1px 3px rgba(0,0,0,.04)",
        transition: "box-shadow .2s, transform .15s",
      }}
    >
      {/* HEADER */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <div
            style={{
              width: 40, height: 40, borderRadius: 10,
              background: cfg.bg, color: cfg.color,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.15rem", flexShrink: 0,
            }}
          >
            {cfg.icon}
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: ".92rem",
                color: "var(--ink)",
                letterSpacing: ".03em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {l.code_suivi}
            </div>
            <div style={{ fontSize: ".68rem", color: "var(--gray)" }}>
              👤 {l.client_nom || "Client"} · 📞 {l.client_tel || "—"}
            </div>
          </div>
        </div>
        <StatutBadge statut={l.statut} size="sm" />
      </div>

      {/* TRAJET */}
      <div
        style={{
          background: "var(--surface2)",
          borderRadius: 10,
          padding: "10px 12px",
          marginBottom: 10,
          fontSize: ".76rem",
        }}
      >
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <span style={{ color: "#ef4444", fontWeight: 700, flexShrink: 0 }}>🔴</span>
          <div style={{ minWidth: 0 }}>
            <span style={{ fontWeight: 600, color: "var(--gray)", fontSize: ".66rem", letterSpacing: ".05em" }}>COLLECTE</span>
            <br />
            <span style={{ color: "var(--ink)" }}>{l.adresse_collecte || "—"}</span>
          </div>
        </div>
        <div style={{ borderLeft: "2px dashed var(--border)", marginLeft: 6, height: 10, marginTop: 4, marginBottom: 4 }} />
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <span style={{ color: "var(--green)", fontWeight: 700, flexShrink: 0 }}>🟢</span>
          <div style={{ minWidth: 0 }}>
            <span style={{ fontWeight: 600, color: "var(--gray)", fontSize: ".66rem", letterSpacing: ".05em" }}>LIVRAISON</span>
            <br />
            <span style={{ color: "var(--ink)" }}>{l.adresse_livraison || "—"}</span>
          </div>
        </div>
      </div>

      {/* MÉTRIQUES */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        {l.colis_description && (
          <span style={pillStyle}>📦 {l.colis_description}</span>
        )}
        <span style={pillStyle}>📏 {distance}</span>
        <span style={pillStyle}>⏱ {eta}</span>
        {l.urgence && l.urgence !== "normal" && (
          <span style={{ ...pillStyle, background: "#fff7ed", color: "#c2410c", borderColor: "#fed7aa" }}>
            {l.urgence === "express" ? "🔴 Express" : "🟠 Urgent"}
          </span>
        )}
        {(l.montant > 0 || l.commission_livreur > 0) && (
          <span style={{ ...pillStyle, background: "var(--green-pale)", color: "var(--green)", fontWeight: 700, borderColor: "var(--green)" }}>
            💰 {l.commission_livreur ? `Gain ${Number(l.commission_livreur).toLocaleString()} F` : `${Number(l.montant).toLocaleString()} F`}
          </span>
        )}
      </div>

      {l.instructions && (
        <div
          style={{
            background: "#fff9e6",
            borderLeft: "3px solid #f59e0b",
            padding: "8px 10px",
            borderRadius: 6,
            marginBottom: 10,
            fontSize: ".72rem",
            color: "#92400e",
            lineHeight: 1.4,
          }}
        >
          📝 <strong>Instructions :</strong> {l.instructions}
        </div>
      )}

      {/* ACTIONS */}
      {isDispoForMe && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button
            onClick={() => onAccepter(l)}
            style={btnPrimary}
            aria-label="Accepter la mission"
          >
            ✅ Accepter
          </button>
          <button
            onClick={() => onRefuser(l)}
            style={btnDangerOutline}
            aria-label="Refuser la mission"
          >
            ❌ Refuser
          </button>
          <button onClick={() => onShowDetails(l)} style={btnGhost}>
            👁️ Détails
          </button>
        </div>
      )}

      {isMine && l.statut === "accepte" && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button onClick={() => onAvancer(l, "preparation")} style={btnPrimary}>
            📦 Démarrer préparation
          </button>
          <button onClick={() => onContacter(l)} style={btnWA}>
            💬 Contacter client
          </button>
        </div>
      )}
      {isMine && l.statut === "preparation" && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button onClick={() => onAvancer(l, "collecte")} style={btnPrimary}>
            🏪 Marquer collecté
          </button>
          <button onClick={() => onContacter(l)} style={btnWA}>
            💬 Contacter client
          </button>
        </div>
      )}
      {isMine && l.statut === "collecte" && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button onClick={() => onAvancer(l, "en_route")} style={btnPrimary}>
            🏍️ En route !
          </button>
          <button onClick={() => onContacter(l)} style={btnWA}>
            💬 Contacter client
          </button>
        </div>
      )}
      {isMine && l.statut === "en_route" && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button onClick={() => onAvancer(l, "livre")} style={btnSuccess}>
            ✅ Confirmer livraison
          </button>
          <button onClick={() => onContacter(l)} style={btnWA}>
            💬 Contacter client
          </button>
        </div>
      )}
      {l.statut === "livre" && (
        <div
          style={{
            background: "var(--green-pale)",
            color: "var(--green)",
            padding: "8px 12px",
            borderRadius: 8,
            fontSize: ".75rem",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          ✅ Livraison terminée le{" "}
          {l.livre_at ? new Date(l.livre_at).toLocaleDateString("fr-FR") : "—"}
        </div>
      )}
    </div>
  );
}

// ─── STYLES BOUTONS ─────────────────────────────────────────────────────────
const pillStyle = {
  background: "var(--surface2)",
  border: "1px solid var(--border)",
  borderRadius: 50,
  padding: "3px 9px",
  fontSize: ".68rem",
  fontWeight: 600,
  color: "var(--ink)",
  whiteSpace: "nowrap",
};

const btnBase = {
  flex: "1 1 130px",
  minWidth: 0,
  padding: "10px 12px",
  borderRadius: 9,
  fontFamily: "'Syne',sans-serif",
  fontWeight: 700,
  fontSize: ".8rem",
  cursor: "pointer",
  border: "none",
  whiteSpace: "nowrap",
};
const btnPrimary = { ...btnBase, background: "var(--green)", color: "#fff" };
const btnSuccess = { ...btnBase, background: "#16a34a", color: "#fff" };
const btnDangerOutline = {
  ...btnBase,
  background: "var(--surface)",
  color: "#ce1126",
  border: "1.5px solid #ce1126",
};
const btnGhost = {
  ...btnBase,
  background: "var(--surface2)",
  color: "var(--ink)",
  border: "1.5px solid var(--border)",
};
const btnWA = { ...btnBase, background: "#25D366", color: "#fff" };

// ─── MODAL REFUS ────────────────────────────────────────────────────────────
function ModalRefus({ open, onClose, onConfirm, loading }) {
  const [motif, setMotif] = useState("");
  const [autre, setAutre] = useState("");
  if (!open) return null;
  const MOTIFS = [
    "Trop loin de ma position",
    "Véhicule pas adapté",
    "Indisponible maintenant",
    "Adresse imprécise",
    "Colis trop volumineux",
    "Autre",
  ];
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 440 }}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.05rem", marginBottom: 4, color: "var(--ink)" }}>
          ❌ Refuser la mission
        </h3>
        <p style={{ fontSize: ".8rem", color: "var(--gray)", marginBottom: 14 }}>
          La mission sera remise à la disposition d'autres livreurs. Indiquez la raison pour aider Yorix à mieux vous attribuer les prochaines courses.
        </p>
        <div style={{ display: "grid", gap: 6, marginBottom: 12 }}>
          {MOTIFS.map((m) => (
            <button
              key={m}
              onClick={() => setMotif(m)}
              style={{
                textAlign: "left",
                padding: "9px 12px",
                borderRadius: 8,
                background: motif === m ? "var(--green-pale)" : "var(--surface2)",
                border: `1.5px solid ${motif === m ? "var(--green)" : "var(--border)"}`,
                color: "var(--ink)",
                fontSize: ".82rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {motif === m ? "● " : "○ "}{m}
            </button>
          ))}
        </div>
        {motif === "Autre" && (
          <textarea
            className="form-textarea"
            placeholder="Précisez la raison..."
            value={autre}
            onChange={(e) => setAutre(e.target.value)}
            style={{ minHeight: 60, marginBottom: 12 }}
          />
        )}
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onClose} style={{ ...btnGhost, flex: 1 }} disabled={loading}>
            Annuler
          </button>
          <button
            onClick={() => onConfirm(motif === "Autre" ? autre.trim() : motif)}
            style={{ ...btnDangerOutline, flex: 1, background: "#ce1126", color: "#fff", border: "none" }}
            disabled={loading || !motif || (motif === "Autre" && !autre.trim())}
          >
            {loading ? "..." : "Confirmer le refus"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MODAL DÉTAILS ──────────────────────────────────────────────────────────
function ModalDetails({ delivery, onClose, onAccepter, onRefuser, onContacter, isDispoForMe }) {
  if (!delivery) return null;
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 520 }}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "var(--ink)", marginBottom: 2 }}>
          📦 Détails de la mission
        </h3>
        <div style={{ fontFamily: "'Syne',sans-serif", color: "var(--green)", fontSize: ".9rem", letterSpacing: ".05em", marginBottom: 12 }}>
          {delivery.code_suivi}
        </div>

        <div style={{ display: "grid", gap: 10, fontSize: ".85rem" }}>
          <Row label="👤 Client" value={delivery.client_nom || "—"} />
          <Row label="📞 Téléphone" value={delivery.client_tel || "—"} />
          <Row label="🏙️ Ville" value={delivery.ville || "—"} />
          <Row label="🔴 Collecte" value={delivery.adresse_collecte || "—"} multiline />
          <Row label="🟢 Livraison" value={delivery.adresse_livraison || "—"} multiline />
          <Row label="📦 Colis" value={delivery.colis_description || "—"} multiline />
          <Row label="📏 Distance" value={`${delivery.distance_km || "—"} km`} />
          <Row label="⏱ Temps estimé" value={`${delivery.temps_estime_min || "—"} min`} />
          <Row
            label="💰 Montant"
            value={delivery.montant ? Number(delivery.montant).toLocaleString() + " FCFA" : "À définir"}
          />
          <Row
            label="🎁 Votre gain"
            value={delivery.commission_livreur ? Number(delivery.commission_livreur).toLocaleString() + " FCFA" : "À définir"}
          />
          {delivery.instructions && <Row label="📝 Instructions" value={delivery.instructions} multiline />}
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 18, flexWrap: "wrap" }}>
          {isDispoForMe && (
            <>
              <button onClick={() => { onClose(); onAccepter(delivery); }} style={btnPrimary}>
                ✅ Accepter
              </button>
              <button onClick={() => { onClose(); onRefuser(delivery); }} style={btnDangerOutline}>
                ❌ Refuser
              </button>
            </>
          )}
          <button onClick={() => onContacter(delivery)} style={btnWA}>
            💬 Contacter client
          </button>
        </div>
      </div>
    </div>
  );
}
function Row({ label, value, multiline }) {
  return (
    <div style={{ display: multiline ? "block" : "flex", justifyContent: "space-between", gap: 12 }}>
      <span style={{ color: "var(--gray)", fontWeight: 600, fontSize: ".75rem", whiteSpace: "nowrap" }}>{label}</span>
      <span style={{ color: "var(--ink)", fontWeight: 600, textAlign: multiline ? "left" : "right", lineHeight: 1.4 }}>
        {value}
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════
export function DeliveryDashboard({ user, userData, dashTab, setDashTab }) {
  const [livraisons, setLivraisons] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [toast, setToast]           = useState(null);
  const [refusOpen, setRefusOpen]   = useState(null);
  const [details, setDetails]       = useState(null);
  const [busyId, setBusyId]         = useState(null);
  const [soundOn, setSoundOn]       = useState(() => {
    try { return localStorage.getItem("yorix_sound_livreur") !== "0"; } catch { return true; }
  });

  // ── Notif sonore : Web Audio API (sans asset externe) ──
  const playPing = useCallback(() => {
    if (!soundOn) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(880, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.18);
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
      o.connect(g); g.connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + 0.55);
    } catch {}
  }, [soundOn]);

  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
  }, []);

  // ── LOAD INITIAL ────────────────────────────────────────────────────────
  const loadLivraisons = useCallback(async () => {
    if (!user?.id) { setLivraisons([]); setLoading(false); return; }
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from("deliveries")
        .select("*")
        .eq("livreur_id", user.id)
        .order("commande_at", { ascending: false })
        .limit(200);
      if (err) throw err;
      setLivraisons(data || []);
    } catch (e) {
      console.error("[DeliveryDashboard] load:", e);
      setError(e.message || "Impossible de charger les missions");
      setLivraisons([]);
    }
    setLoading(false);
  }, [user?.id]);

  useEffect(() => { setLoading(true); loadLivraisons(); }, [loadLivraisons]);

  // ── REALTIME ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!user?.id) return;
    const channel = supabase
      .channel(`livreur-deliveries-${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "deliveries", filter: `livreur_id=eq.${user.id}` },
        (payload) => {
          setLivraisons((prev) => {
            if (payload.eventType === "INSERT") {
              const exists = prev.find((p) => p.id === payload.new.id);
              if (exists) return prev;
              playPing();
              showToast(`🚚 Nouvelle mission : ${payload.new.code_suivi}`);
              return [payload.new, ...prev];
            }
            if (payload.eventType === "UPDATE") {
              const wasMine = prev.find((p) => p.id === payload.new.id);
              if (!wasMine && payload.new.livreur_id === user.id) {
                playPing();
                showToast(`🚚 Mission assignée : ${payload.new.code_suivi}`);
                return [payload.new, ...prev];
              }
              return prev.map((p) => (p.id === payload.new.id ? payload.new : p));
            }
            if (payload.eventType === "DELETE") {
              return prev.filter((p) => p.id !== payload.old.id);
            }
            return prev;
          });
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user?.id, playPing, showToast]);

  // ── ACTIONS ──────────────────────────────────────────────────────────────
  const handleAccepter = async (l) => {
    setBusyId(l.id);
    try {
      const updated = await livreurAccepter({ delivery: l, user, userData });
      if (updated) {
        setLivraisons((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        showToast(`✅ Mission acceptée : ${updated.code_suivi}`);
      }
    } catch (e) {
      showToast(e.message || "Erreur acceptation", "error");
    }
    setBusyId(null);
  };

  const handleRefuserConfirm = async (motif) => {
    const l = refusOpen;
    if (!l) return;
    setBusyId(l.id);
    try {
      await livreurRefuser({ delivery: l, user, userData, motif });
      setLivraisons((prev) => prev.filter((p) => p.id !== l.id));
      showToast("Mission refusée — bien noté.");
      setRefusOpen(null);
    } catch (e) {
      showToast(e.message || "Erreur refus", "error");
    }
    setBusyId(null);
  };

  const handleAvancer = async (l, nouveauStatut) => {
    setBusyId(l.id);
    try {
      const updated = await livreurAvancerStatut({ delivery: l, user, nouveauStatut });
      if (updated) {
        setLivraisons((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        showToast(`✅ Statut → ${getStatutConfig(nouveauStatut).label}`);
      }
    } catch (e) {
      showToast(e.message || "Erreur changement statut", "error");
    }
    setBusyId(null);
  };

  const handleContacter = (l) => {
    const msg = [
      `Bonjour ${l.client_nom || ""} ! 👋`,
      "",
      `Je suis ${userData?.nom || "votre livreur Yorix"} 🏍️.`,
      `Je m'occupe de votre livraison ${l.code_suivi}.`,
      "",
      "À tout de suite !",
    ].join("\n");
    const ok = openWhatsApp(l.client_tel, msg);
    if (!ok) showToast("Téléphone client invalide", "error");
  };

  // ── STATS DÉRIVÉES ───────────────────────────────────────────────────────
  const stats = useMemo(() => computeLivreurStats(livraisons), [livraisons]);

  // Listes filtrées
  const dispo   = livraisons.filter((l) => l.statut === "livreur_assigne");
  const enCours = livraisons.filter((l) => ["accepte", "preparation", "collecte", "en_route"].includes(l.statut));
  const livrees = livraisons.filter((l) => l.statut === "livre");

  const toggleSound = () => {
    setSoundOn((s) => {
      try { localStorage.setItem("yorix_sound_livreur", s ? "0" : "1"); } catch {}
      return !s;
    });
  };

  // ── RENDU ────────────────────────────────────────────────────────────────
  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />
      <ModalRefus
        open={!!refusOpen}
        onClose={() => setRefusOpen(null)}
        onConfirm={handleRefuserConfirm}
        loading={busyId === refusOpen?.id}
      />
      <ModalDetails
        delivery={details}
        onClose={() => setDetails(null)}
        onAccepter={handleAccepter}
        onRefuser={(l) => setRefusOpen(l)}
        onContacter={handleContacter}
        isDispoForMe={details?.statut === "livreur_assigne" && details?.livreur_id === user?.id}
      />

      {/* HEADER */}
      <div
        className="dash-page-title"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}
      >
        <span>
          Bonjour {userData?.nom || "Livreur"} 🏍️{" "}
          <span style={{ fontSize: ".75rem", color: "var(--gray)", fontFamily: "'DM Sans',sans-serif", fontWeight: 400 }}>
            — Yorix Ride
          </span>
        </span>
        <button
          onClick={toggleSound}
          aria-label={soundOn ? "Désactiver le son" : "Activer le son"}
          title={soundOn ? "Sons activés" : "Sons désactivés"}
          style={{
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            color: "var(--ink)",
            borderRadius: 50,
            padding: "5px 12px",
            fontSize: ".75rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {soundOn ? "🔔 Sons ON" : "🔕 Sons OFF"}
        </button>
      </div>

      {/* STATS */}
      <div className="dash-stats">
        {[
          { icon: "🟡", val: dispo.length,                          lbl: "À accepter",         trend: dispo.length ? "Nouvelles missions !" : "" },
          { icon: "🚚", val: enCours.length,                        lbl: "En cours",           trend: "" },
          { icon: "✅", val: stats.missions_livrees,                lbl: "Livrées",            trend: `${stats.taux_acceptation}% accept.` },
          { icon: "💰", val: `${stats.gains_total.toLocaleString()} F`, lbl: "Gains totaux",  trend: `${stats.gains_mois.toLocaleString()} F / mois` },
        ].map((s) => (
          <div key={s.lbl} className="dstat">
            <div className="dstat-icon">{s.icon}</div>
            <div className="dstat-val">{s.val}</div>
            <div className="dstat-lbl">{s.lbl}</div>
            {s.trend && <div className="dstat-trend">{s.trend}</div>}
          </div>
        ))}
      </div>

      {error && (
        <div
          style={{
            background: "#fff0f0",
            border: "1px solid #fecaca",
            color: "#ce1126",
            padding: 14,
            borderRadius: 10,
            marginBottom: 14,
            fontSize: ".85rem",
          }}
        >
          ⚠️ {error}
          <button
            onClick={loadLivraisons}
            style={{
              marginLeft: 10,
              background: "transparent",
              color: "#ce1126",
              border: "1px solid #ce1126",
              padding: "4px 10px",
              borderRadius: 6,
              fontSize: ".75rem",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Réessayer
          </button>
        </div>
      )}

      {/* CONTENU SELON TAB */}
      {loading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 0",
            gap: 12,
            color: "var(--green)",
          }}
        >
          <div
            style={{
              width: 32, height: 32,
              border: "3px solid var(--border)",
              borderTopColor: "var(--green)",
              borderRadius: "50%",
              animation: "spin .7s linear infinite",
            }}
          />
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600 }}>
            Chargement des missions...
          </span>
          <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
        </div>
      )}

      {!loading && dashTab === "overview" && (
        <>
          <SectionTitle icon="🟡" title={`Missions à accepter (${dispo.length})`} />
          {dispo.length === 0 ? (
            <EmptyState
              icon="🛵"
              title="Aucune mission disponible"
              hint="Reste connecté, on t'envoie un signal sonore dès qu'une nouvelle mission arrive."
            />
          ) : (
            dispo.map((l) => (
              <LivraisonCard
                key={l.id}
                l={l}
                user={user}
                onAccepter={handleAccepter}
                onRefuser={(d) => setRefusOpen(d)}
                onAvancer={handleAvancer}
                onContacter={handleContacter}
                onShowDetails={setDetails}
              />
            ))
          )}

          {enCours.length > 0 && (
            <>
              <SectionTitle icon="🚚" title={`En cours (${enCours.length})`} />
              {enCours.map((l) => (
                <LivraisonCard
                  key={l.id}
                  l={l}
                  user={user}
                  onAccepter={handleAccepter}
                  onRefuser={(d) => setRefusOpen(d)}
                  onAvancer={handleAvancer}
                  onContacter={handleContacter}
                  onShowDetails={setDetails}
                />
              ))}
            </>
          )}
        </>
      )}

      {!loading && dashTab === "disponibles" && (
        <>
          <SectionTitle icon="🟡" title="Missions disponibles" />
          {dispo.length === 0 ? (
            <EmptyState icon="🛵" title="Aucune mission disponible" />
          ) : (
            dispo.map((l) => (
              <LivraisonCard
                key={l.id}
                l={l}
                user={user}
                onAccepter={handleAccepter}
                onRefuser={(d) => setRefusOpen(d)}
                onAvancer={handleAvancer}
                onContacter={handleContacter}
                onShowDetails={setDetails}
              />
            ))
          )}
        </>
      )}

      {!loading && dashTab === "enCours" && (
        <>
          <SectionTitle icon="🚚" title={`Livraisons en cours (${enCours.length})`} />
          {enCours.length === 0 ? (
            <EmptyState icon="🚚" title="Aucune livraison en cours" hint="Accepte une mission pour commencer." />
          ) : (
            enCours.map((l) => (
              <LivraisonCard
                key={l.id}
                l={l}
                user={user}
                onAccepter={handleAccepter}
                onRefuser={(d) => setRefusOpen(d)}
                onAvancer={handleAvancer}
                onContacter={handleContacter}
                onShowDetails={setDetails}
              />
            ))
          )}
        </>
      )}

      {!loading && dashTab === "historique" && (
        <>
          <SectionTitle icon="✅" title={`Historique (${livrees.length})`} />
          {livrees.length === 0 ? (
            <EmptyState icon="📋" title="Aucune livraison terminée" />
          ) : (
            livrees.map((l) => (
              <LivraisonCard
                key={l.id}
                l={l}
                user={user}
                onAccepter={handleAccepter}
                onRefuser={(d) => setRefusOpen(d)}
                onAvancer={handleAvancer}
                onContacter={handleContacter}
                onShowDetails={setDetails}
              />
            ))
          )}
        </>
      )}

      {!loading && dashTab === "wallet" && (
        <WalletSection stats={stats} livraisons={livraisons} />
      )}
    </>
  );
}

// ─── Sous-composants UI ─────────────────────────────────────────────────────
function SectionTitle({ icon, title }) {
  return (
    <div
      style={{
        fontFamily: "'Syne',sans-serif",
        fontWeight: 700,
        fontSize: ".95rem",
        color: "var(--ink)",
        margin: "18px 0 12px",
      }}
    >
      {icon} {title}
    </div>
  );
}

function EmptyState({ icon, title, hint }) {
  return (
    <div className="empty-state" style={{ background: "var(--surface)", borderRadius: 12, border: "1px solid var(--border)", padding: "30px 16px", textAlign: "center" }}>
      <div className="empty-icon" style={{ fontSize: "2.5rem" }}>{icon}</div>
      <p style={{ marginTop: 8, fontFamily: "'Syne',sans-serif", fontWeight: 700 }}>{title}</p>
      {hint && (
        <p style={{ fontSize: ".78rem", marginTop: 6, color: "var(--gray)" }}>{hint}</p>
      )}
    </div>
  );
}

function WalletSection({ stats, livraisons }) {
  const perfBadges = [
    { label: "Aujourd'hui",      val: `${stats.gains_jour.toLocaleString()} FCFA`,    ic: "📅" },
    { label: "Cette semaine",    val: `${stats.gains_semaine.toLocaleString()} FCFA`, ic: "📆" },
    { label: "Ce mois",          val: `${stats.gains_mois.toLocaleString()} FCFA`,    ic: "🗓️" },
    { label: "Total livraisons", val: stats.missions_livrees,                          ic: "✅" },
  ];

  return (
    <>
      <div className="dash-page-title">💰 Mes Gains</div>
      <div className="wallet-card">
        <div className="wc-label">Gains disponibles</div>
        <div className="wc-amount">{stats.gains_total.toLocaleString()} FCFA</div>
        <div className="wc-sub">
          Ce mois : {stats.gains_mois.toLocaleString()} FCFA · {stats.missions_livrees} livraisons effectuées
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 14 }}>
        {perfBadges.map((s) => (
          <div
            key={s.label}
            style={{
              background: "var(--surface)",
              borderRadius: 12,
              padding: "12px 14px",
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ fontSize: "1.1rem", marginBottom: 4 }}>{s.ic}</div>
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: ".88rem",
                color: "var(--ink)",
              }}
            >
              {s.val}
            </div>
            <div style={{ fontSize: ".68rem", color: "var(--gray)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: 14,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 800,
            fontSize: ".88rem",
            color: "var(--ink)",
            marginBottom: 8,
          }}
        >
          📊 Performance
        </div>
        <div style={{ display: "grid", gap: 10, fontSize: ".82rem" }}>
          <PerfRow label="Taux d'acceptation" value={`${stats.taux_acceptation}%`} color="#10b981" />
          <PerfRow label="Missions refusées" value={stats.missions_refusees} color="#ef4444" />
          <PerfRow label="Missions en cours" value={stats.missions_en_cours} color="#f59e0b" />
          <PerfRow label="Dernière livraison" value={stats.derniere_livraison ? new Date(stats.derniere_livraison).toLocaleDateString("fr-FR") : "—"} color="var(--gray)" />
        </div>
      </div>

      <div className="info-box">
        <div className="info-icon">📱</div>
        <p>Retrait MTN MoMo et Orange Money — bientôt disponible.</p>
      </div>
    </>
  );
}

function PerfRow({ label, value, color }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ color: "var(--gray)" }}>{label}</span>
      <span style={{ fontWeight: 800, color }}>{value}</span>
    </div>
  );
}
