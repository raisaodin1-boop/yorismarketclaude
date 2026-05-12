// ═══════════════════════════════════════════════════════════════════════════
// 🛠️ YORIX — MODAL ADMIN : ÉDITION COMPLÈTE D'UNE LIVRAISON
// ═══════════════════════════════════════════════════════════════════════════
// Permet à l'admin de :
//  - Modifier les adresses, ville, prix, commission livreur, instructions
//  - Changer le statut (avec timestamps synchronisés)
//  - Réassigner ou retirer un livreur
//  - Annuler la livraison (avec motif)
//
// Composant 100% piloté par props : pas de fetch interne.
// ═══════════════════════════════════════════════════════════════════════════

import { useEffect, useState } from "react";
import { DELIVERY_STATUTS, getStatutConfig } from "../utils/deliveryWorkflow";
import { CITIES } from "../lib/constants";

const STATUTS_ADMIN = [
  "commande_recue",
  "livreur_assigne",
  "accepte",
  "preparation",
  "collecte",
  "en_route",
  "livre",
  "annule",
];

export function ModalEditDelivery({
  delivery,
  livreurs = [],
  onClose,
  onSave,
  onReassign,
  onUnassign,
  onCancel,
}) {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("infos");

  useEffect(() => {
    if (!delivery) return;
    setForm({
      adresse_collecte:   delivery.adresse_collecte   || "",
      adresse_livraison:  delivery.adresse_livraison  || "",
      ville:              delivery.ville              || "",
      client_nom:         delivery.client_nom         || "",
      client_tel:         delivery.client_tel         || "",
      colis_description:  delivery.colis_description  || "",
      instructions:       delivery.instructions       || "",
      montant:            delivery.montant            || 0,
      commission_livreur: delivery.commission_livreur || 0,
      distance_km:        delivery.distance_km        || 3.5,
      temps_estime_min:   delivery.temps_estime_min   || 25,
      urgence:            delivery.urgence            || "normal",
      statut:             delivery.statut             || "commande_recue",
    });
  }, [delivery]);

  if (!delivery || !form) return null;

  const setF = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave?.(form);
    } finally {
      setSaving(false);
    }
  };

  const cfg = getStatutConfig(form.statut);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="modal"
        style={{
          maxWidth: 720,
          width: "100%",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          padding: 0,
          overflow: "hidden",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            padding: "18px 20px",
            background: "linear-gradient(135deg, #1a3a24, var(--green))",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <div>
            <div style={{ fontSize: ".72rem", opacity: 0.75 }}>LIVRAISON YORIX</div>
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: "1.3rem",
                letterSpacing: ".05em",
              }}
            >
              {delivery.code_suivi}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                background: cfg.bg,
                color: cfg.color,
                border: `1px solid ${cfg.color}`,
                padding: "5px 12px",
                borderRadius: 50,
                fontSize: ".78rem",
                fontWeight: 700,
              }}
            >
              {cfg.icon} {cfg.label}
            </span>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,.15)",
                border: "1px solid rgba(255,255,255,.25)",
                color: "#fff",
                width: 34,
                height: 34,
                borderRadius: "50%",
                fontSize: "1.1rem",
                cursor: "pointer",
              }}
              aria-label="Fermer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* TABS */}
        <div
          style={{
            display: "flex",
            gap: 4,
            padding: "8px 12px",
            background: "var(--surface2)",
            borderBottom: "1px solid var(--border)",
            overflowX: "auto",
          }}
        >
          {[
            { id: "infos",   label: "📦 Infos" },
            { id: "livreur", label: "🏍️ Livreur" },
            { id: "statut",  label: "🚦 Statut" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "7px 14px",
                borderRadius: 8,
                border: "none",
                background: tab === t.id ? "var(--green)" : "transparent",
                color: tab === t.id ? "#fff" : "var(--ink)",
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: ".82rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* CONTENU */}
        <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
          {tab === "infos" && (
            <>
              <SectionTitle>👤 Client</SectionTitle>
              <Grid2>
                <Field label="Nom du client">
                  <input
                    className="form-input"
                    value={form.client_nom}
                    onChange={(e) => setF("client_nom", e.target.value)}
                  />
                </Field>
                <Field label="Téléphone">
                  <input
                    className="form-input"
                    value={form.client_tel}
                    onChange={(e) => setF("client_tel", e.target.value)}
                    placeholder="+237..."
                  />
                </Field>
              </Grid2>

              <SectionTitle>📍 Adresses</SectionTitle>
              <Field label="🔴 Adresse de collecte">
                <input
                  className="form-input"
                  value={form.adresse_collecte}
                  onChange={(e) => setF("adresse_collecte", e.target.value)}
                  placeholder="Ex: Marché Central, Douala"
                />
              </Field>
              <Field label="🟢 Adresse de livraison">
                <input
                  className="form-input"
                  value={form.adresse_livraison}
                  onChange={(e) => setF("adresse_livraison", e.target.value)}
                  placeholder="Ex: Akwa, Douala"
                />
              </Field>
              <Grid2>
                <Field label="🏙️ Ville">
                  <select
                    className="form-select"
                    value={form.ville}
                    onChange={(e) => setF("ville", e.target.value)}
                  >
                    <option value="">— Choisir —</option>
                    {CITIES.filter((c) => c && c !== "Toutes les villes").map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field label="⏱ Temps estimé (min)">
                  <input
                    className="form-input"
                    type="number"
                    min="0"
                    value={form.temps_estime_min}
                    onChange={(e) => setF("temps_estime_min", Number(e.target.value))}
                  />
                </Field>
              </Grid2>

              <SectionTitle>📦 Colis</SectionTitle>
              <Field label="Description du colis">
                <textarea
                  className="form-textarea"
                  value={form.colis_description}
                  onChange={(e) => setF("colis_description", e.target.value)}
                  placeholder="Ex: Carton de 5kg, sac à main..."
                  style={{ minHeight: 50 }}
                />
              </Field>
              <Field label="📝 Instructions particulières">
                <textarea
                  className="form-textarea"
                  value={form.instructions}
                  onChange={(e) => setF("instructions", e.target.value)}
                  placeholder="Ex: Appeler avant d'arriver, livrer à la gardienne..."
                  style={{ minHeight: 60 }}
                />
              </Field>

              <SectionTitle>💰 Tarification</SectionTitle>
              <Grid2>
                <Field label="Montant total (FCFA)">
                  <input
                    className="form-input"
                    type="number"
                    min="0"
                    value={form.montant}
                    onChange={(e) => setF("montant", Number(e.target.value))}
                  />
                </Field>
                <Field label="🎁 Commission livreur (FCFA)">
                  <input
                    className="form-input"
                    type="number"
                    min="0"
                    value={form.commission_livreur}
                    onChange={(e) => setF("commission_livreur", Number(e.target.value))}
                  />
                </Field>
                <Field label="📏 Distance (km)">
                  <input
                    className="form-input"
                    type="number"
                    min="0"
                    step="0.1"
                    value={form.distance_km}
                    onChange={(e) => setF("distance_km", Number(e.target.value))}
                  />
                </Field>
                <Field label="🚨 Urgence">
                  <select
                    className="form-select"
                    value={form.urgence}
                    onChange={(e) => setF("urgence", e.target.value)}
                  >
                    <option value="normal">🟢 Normal</option>
                    <option value="urgent">🟠 Urgent</option>
                    <option value="express">🔴 Express</option>
                  </select>
                </Field>
              </Grid2>
            </>
          )}

          {tab === "livreur" && (
            <LivreurTab
              delivery={delivery}
              livreurs={livreurs}
              onReassign={onReassign}
              onUnassign={onUnassign}
              onClose={onClose}
            />
          )}

          {tab === "statut" && (
            <>
              <SectionTitle>🚦 Changer le statut</SectionTitle>
              <p style={{ fontSize: ".82rem", color: "var(--gray)", marginBottom: 14 }}>
                Sélectionnez le nouveau statut. Le client recevra une notification automatique.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px,1fr))", gap: 8 }}>
                {STATUTS_ADMIN.map((s) => {
                  const c = DELIVERY_STATUTS[s];
                  const active = form.statut === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setF("statut", s)}
                      style={{
                        textAlign: "left",
                        padding: "11px 13px",
                        borderRadius: 10,
                        background: active ? c.bg : "var(--surface2)",
                        border: `2px solid ${active ? c.color : "var(--border)"}`,
                        color: active ? c.color : "var(--ink)",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "'Syne',sans-serif",
                        fontSize: ".82rem",
                      }}
                    >
                      <div style={{ fontSize: "1.1rem", marginBottom: 2 }}>{c.icon}</div>
                      {c.label}
                    </button>
                  );
                })}
              </div>

              <div
                style={{
                  marginTop: 24,
                  padding: 14,
                  background: "#fff0f0",
                  border: "1px solid #fecaca",
                  borderRadius: 10,
                }}
              >
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "#ce1126", marginBottom: 6 }}>
                  ⚠️ Zone sensible
                </div>
                <p style={{ fontSize: ".8rem", color: "#7f1d1d", marginBottom: 10 }}>
                  Annuler une livraison la marque comme abandonnée. Le client recevra une notification d'annulation.
                </p>
                <button
                  onClick={async () => {
                    const motif = window.prompt("Motif de l'annulation (visible par le client) :", "");
                    if (motif === null) return;
                    await onCancel?.(motif || null);
                  }}
                  style={{
                    background: "#ce1126",
                    color: "#fff",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: 8,
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: ".82rem",
                  }}
                >
                  ❌ Annuler la livraison
                </button>
              </div>
            </>
          )}
        </div>

        {/* FOOTER */}
        <div
          style={{
            padding: "12px 16px",
            background: "var(--surface2)",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <div style={{ fontSize: ".72rem", color: "var(--gray)" }}>
            Créée {delivery.commande_at ? new Date(delivery.commande_at).toLocaleString("fr-FR") : "—"}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={onClose}
              style={{
                background: "var(--surface)",
                color: "var(--ink)",
                border: "1.5px solid var(--border)",
                padding: "10px 18px",
                borderRadius: 8,
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: ".85rem",
              }}
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                background: "var(--green)",
                color: "#fff",
                border: "none",
                padding: "10px 22px",
                borderRadius: 8,
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                cursor: saving ? "not-allowed" : "pointer",
                fontSize: ".88rem",
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? "Enregistrement..." : "💾 Enregistrer les modifications"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LivreurTab({ delivery, livreurs, onReassign, onUnassign }) {
  const [query, setQuery] = useState("");
  const filtered = (livreurs || []).filter((l) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      (l.nom       && l.nom.toLowerCase().includes(q)) ||
      (l.telephone && l.telephone.includes(q)) ||
      (l.email     && l.email.toLowerCase().includes(q)) ||
      (l.ville     && l.ville.toLowerCase().includes(q))
    );
  });

  return (
    <>
      <SectionTitle>🏍️ Livreur actuel</SectionTitle>
      {delivery.livreur_nom ? (
        <div
          style={{
            background: "var(--green-pale)",
            padding: 14,
            borderRadius: 12,
            border: "1px solid var(--green)",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "var(--green)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              flexShrink: 0,
            }}
          >
            🏍️
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".95rem", color: "var(--ink)" }}>
              {delivery.livreur_nom}
            </div>
            <div style={{ fontSize: ".75rem", color: "var(--gray)" }}>
              📞 {delivery.livreur_tel || "—"} · 🛵 {delivery.livreur_vehicule || "—"}
            </div>
            <div style={{ fontSize: ".7rem", color: "var(--gray)", marginTop: 2 }}>
              Assigné{" "}
              {delivery.assigne_at
                ? new Date(delivery.assigne_at).toLocaleString("fr-FR")
                : "—"}
              {delivery.accepte_at && (
                <> · Accepté {new Date(delivery.accepte_at).toLocaleTimeString("fr-FR")}</>
              )}
            </div>
          </div>
          <button
            onClick={() => onUnassign?.()}
            style={{
              background: "var(--surface)",
              color: "#ce1126",
              border: "1.5px solid #ce1126",
              padding: "8px 14px",
              borderRadius: 8,
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: ".78rem",
              cursor: "pointer",
            }}
          >
            🚫 Retirer
          </button>
        </div>
      ) : (
        <div
          style={{
            background: "#fef3c7",
            border: "1px dashed #f59e0b",
            color: "#92400e",
            padding: 14,
            borderRadius: 12,
            marginBottom: 16,
            fontSize: ".85rem",
          }}
        >
          ⚠️ Aucun livreur assigné pour le moment.
        </div>
      )}

      <SectionTitle>
        🔁 {delivery.livreur_nom ? "Changer de livreur" : "Assigner un livreur"} ({(livreurs || []).length})
      </SectionTitle>
      <input
        className="form-input"
        placeholder="🔍 Rechercher par nom, ville, téléphone..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: 10 }}
      />

      {filtered.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: 24,
            background: "var(--surface2)",
            borderRadius: 10,
            color: "var(--gray)",
          }}
        >
          😕 Aucun livreur trouvé.
        </div>
      ) : (
        <div style={{ display: "grid", gap: 8, maxHeight: 320, overflowY: "auto" }}>
          {filtered.map((liv) => {
            const uid = liv.uid || liv.id;
            const isCurrent = delivery.livreur_id === uid;
            return (
              <div
                key={uid}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: 10,
                  background: "var(--surface)",
                  border: `1.5px solid ${isCurrent ? "var(--green)" : "var(--border)"}`,
                  borderRadius: 10,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "var(--green-pale)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.1rem",
                    flexShrink: 0,
                  }}
                >
                  🏍️
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontWeight: 700,
                      fontSize: ".85rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {liv.nom || "Livreur"}
                    {liv.verifie && <span style={{ marginLeft: 5, color: "var(--green)" }}>✓</span>}
                  </div>
                  <div style={{ fontSize: ".7rem", color: "var(--gray)" }}>
                    📞 {liv.telephone || "—"} · {liv.ville || "—"}
                  </div>
                </div>
                <button
                  onClick={() => onReassign?.(liv)}
                  disabled={isCurrent}
                  style={{
                    background: isCurrent ? "var(--surface2)" : "var(--green)",
                    color: isCurrent ? "var(--gray)" : "#fff",
                    border: "none",
                    padding: "7px 12px",
                    borderRadius: 8,
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 700,
                    fontSize: ".75rem",
                    cursor: isCurrent ? "default" : "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {isCurrent ? "✓ Actuel" : delivery.livreur_id ? "🔁 Réassigner" : "✅ Assigner"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

function SectionTitle({ children }) {
  return (
    <div
      style={{
        fontFamily: "'Syne',sans-serif",
        fontWeight: 800,
        fontSize: ".88rem",
        color: "var(--green)",
        margin: "16px 0 8px",
        letterSpacing: ".02em",
      }}
    >
      {children}
    </div>
  );
}

function Grid2({ children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="form-group" style={{ marginBottom: 8 }}>
      <label className="form-label" style={{ fontSize: ".78rem", fontWeight: 600 }}>{label}</label>
      {children}
    </div>
  );
}
