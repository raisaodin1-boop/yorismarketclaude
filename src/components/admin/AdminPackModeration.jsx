import { useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";
import "./adminPackModeration.css";

/**
 * Modération des packs vendeur — validation admin obligatoire avant publication.
 */
export function AdminPackModeration({ produits = [], showToast, requireWrite, onDone }) {
  const [busyId, setBusyId] = useState(null);
  const [rejectId, setRejectId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [correctionId, setCorrectionId] = useState(null);
  const [correctionNotes, setCorrectionNotes] = useState("");

  const pending = useMemo(
    () =>
      (produits || []).filter(
        (p) => p.is_pack && (p.pack_status === "pending" || p.pack_status === "correction"),
      ),
    [produits],
  );

  const linkedLabels = (pack, all) => {
    const ids = pack.pack_linked_product_ids || [];
    if (!ids.length) return "—";
    return ids
      .map((id) => all.find((x) => x.id === id)?.name_fr || id.slice(0, 8))
      .join(", ");
  };

  const openEdit = (p) => {
    setEditId(p.id);
    setEditForm({
      name_fr: p.name_fr || "",
      description_fr: p.description_fr || "",
      pack_description: p.pack_description || "",
      prix: p.prix ?? "",
    });
  };

  const moderate = async (productId, action, extra = {}) => {
    if (!requireWrite?.()) return;
    setBusyId(productId);
    try {
      if (action === "correct_publish") {
        const { error: upErr } = await supabase
          .from("products")
          .update({
            name_fr: editForm.name_fr?.trim(),
            description_fr: editForm.description_fr?.trim(),
            pack_description: editForm.pack_description?.trim(),
            prix: Number(editForm.prix),
          })
          .eq("id", productId);
        if (upErr) throw upErr;
      }

      const { error } = await supabase.rpc("fn_admin_moderate_product_pack", {
        p_product_id: productId,
        p_action: action === "correct_publish" ? "approve" : action,
        p_admin_notes: extra.adminNotes || null,
        p_rejection_reason: extra.rejectionReason || null,
      });
      if (error) throw error;

      showToast?.(
        action === "approve" || action === "correct_publish"
          ? "Pack publié"
          : action === "correction"
            ? "Vendeur notifié — correction demandée"
            : "Pack supprimé — vendeur notifié",
        "success",
      );
      setRejectId(null);
      setRejectReason("");
      setEditId(null);
      setCorrectionId(null);
      setCorrectionNotes("");
      onDone?.();
    } catch (e) {
      showToast?.(e.message || "Erreur modération pack", "error");
    }
    setBusyId(null);
  };

  if (!pending.length) {
    return (
      <div className="admin-pack-empty">
        <p>Aucun pack en attente de validation.</p>
      </div>
    );
  }

  return (
    <div className="admin-pack-mod">
      <div className="admin-pack-alert" role="alert">
        <strong>{pending.length} pack{pending.length > 1 ? "s" : ""} à modérer</strong>
        <span> — valider, corriger et publier, ou supprimer avec motif.</span>
      </div>

      <div className="admin-pack-list">
        {pending.map((p) => (
          <article key={p.id} className="admin-pack-card">
            <div className="admin-pack-card__head">
              {p.image ? (
                <img src={p.image} alt="" className="admin-pack-card__img" />
              ) : (
                <span className="admin-pack-card__img admin-pack-card__img--ph">📦</span>
              )}
              <div>
                <h4>{p.name_fr}</h4>
                <p className="admin-pack-card__meta">
                  Vendeur : {p.vendeur_nom || p.vendeur_id?.slice(0, 8)} · {Number(p.prix).toLocaleString()} F
                  {p.pack_status === "correction" && (
                    <span className="admin-pack-badge"> Correction demandée</span>
                  )}
                </p>
              </div>
            </div>

            <p className="admin-pack-card__desc">
              <strong>Description pack :</strong> {p.pack_description || p.description_fr || "—"}
            </p>
            <p className="admin-pack-card__linked">
              <strong>Produits liés :</strong> {linkedLabels(p, produits)}
            </p>
            {p.pack_admin_notes && (
              <p className="admin-pack-card__notes">Notes : {p.pack_admin_notes}</p>
            )}

            {editId === p.id ? (
              <div className="admin-pack-edit">
                <input
                  className="form-input"
                  value={editForm.name_fr}
                  onChange={(e) => setEditForm((f) => ({ ...f, name_fr: e.target.value }))}
                  placeholder="Titre"
                />
                <textarea
                  className="form-input"
                  rows={2}
                  value={editForm.pack_description}
                  onChange={(e) => setEditForm((f) => ({ ...f, pack_description: e.target.value }))}
                  placeholder="Description pack"
                />
                <input
                  className="form-input"
                  type="number"
                  value={editForm.prix}
                  onChange={(e) => setEditForm((f) => ({ ...f, prix: e.target.value }))}
                  placeholder="Prix"
                />
                <div className="admin-pack-actions">
                  <button
                    type="button"
                    className="admin-action-btn"
                    style={{ background: "var(--green)", color: "#fff" }}
                    disabled={busyId === p.id}
                    onClick={() => moderate(p.id, "correct_publish")}
                  >
                    Corriger et publier
                  </button>
                  <button type="button" className="admin-action-btn" onClick={() => setEditId(null)}>
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div className="admin-pack-actions">
                <button
                  type="button"
                  className="admin-action-btn"
                  style={{ background: "var(--green)", color: "#fff" }}
                  disabled={busyId === p.id}
                  onClick={() => moderate(p.id, "approve")}
                >
                  Valider et publier
                </button>
                <button
                  type="button"
                  className="admin-action-btn"
                  style={{ background: "#2563eb", color: "#fff" }}
                  disabled={busyId === p.id}
                  onClick={() => openEdit(p)}
                >
                  Corriger et publier
                </button>
                <button
                  type="button"
                  className="admin-action-btn"
                  style={{ background: "#d97706", color: "#fff" }}
                  disabled={busyId === p.id}
                  onClick={() => {
                    const notes = window.prompt("Message au vendeur (correction à faire) :");
                    if (notes === null) return;
                    moderate(p.id, "correction", { adminNotes: notes });
                  }}
                >
                  Renvoyer au vendeur
                </button>
                <button
                  type="button"
                  className="admin-action-btn"
                  style={{ background: "var(--red)", color: "#fff" }}
                  disabled={busyId === p.id}
                  onClick={() => setRejectId(p.id)}
                >
                  Supprimer
                </button>
              </div>
            )}

            {correctionId === p.id && (
              <div className="admin-pack-correction">
                <textarea
                  className="form-input"
                  rows={3}
                  placeholder="Message au vendeur (corrections à faire)…"
                  value={correctionNotes}
                  onChange={(e) => setCorrectionNotes(e.target.value)}
                />
                <div className="admin-pack-actions">
                  <button
                    type="button"
                    className="admin-action-btn"
                    style={{ background: "#d97706", color: "#fff" }}
                    disabled={!correctionNotes.trim() || busyId === p.id}
                    onClick={() =>
                      moderate(p.id, "correction", { adminNotes: correctionNotes.trim() })
                    }
                  >
                    Envoyer au vendeur
                  </button>
                  <button
                    type="button"
                    className="admin-action-btn"
                    onClick={() => setCorrectionId(null)}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            )}

            {rejectId === p.id && (
              <div className="admin-pack-reject">
                <textarea
                  className="form-input"
                  rows={3}
                  placeholder="Raison du refus (envoyée au vendeur)…"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
                <div className="admin-pack-actions">
                  <button
                    type="button"
                    className="admin-action-btn"
                    style={{ background: "var(--red)", color: "#fff" }}
                    disabled={!rejectReason.trim() || busyId === p.id}
                    onClick={() => moderate(p.id, "reject", { rejectionReason: rejectReason.trim() })}
                  >
                    Confirmer suppression
                  </button>
                  <button type="button" className="admin-action-btn" onClick={() => setRejectId(null)}>
                    Annuler
                  </button>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
