import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { sendEmail } from "../utils/helpers";

// ─────────────────────────────────────────────────────────────
// COMPOSANT ADMIN : Gestion achats de points (Yorix Points)
// ─────────────────────────────────────────────────────────────
export function LoyaltyAdminTab({ user, userData, showToast }) {
  const [purchases, setPurchases]             = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [filter, setFilter]                   = useState("pending");
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [actionLoading, setActionLoading]     = useState(null);
  const [stats, setStats]                     = useState({ pending: 0, credited: 0, cancelled: 0, revenue: 0 });

  const loadPurchases = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("loyalty_pack_purchases")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);

      if (error) throw error;

      const userIds = [...new Set((data || []).map(p => p.user_id).filter(Boolean))];
      let usersMap = {};
      if (userIds.length > 0) {
        const { data: users } = await supabase
          .from("profiles")
          .select("id,nom,email,telephone,points,points_level")
          .in("id", userIds);
        usersMap = Object.fromEntries((users || []).map(u => [u.id, u]));
      }

      const enriched = (data || []).map(p => ({
        ...p,
        client: usersMap[p.user_id] || null,
      }));

      setPurchases(enriched);

      const pending   = enriched.filter(p => p.status === "pending").length;
      const credited  = enriched.filter(p => p.status === "credited").length;
      const cancelled = enriched.filter(p => p.status === "cancelled").length;
      const revenue   = enriched
        .filter(p => p.status === "credited")
        .reduce((sum, p) => sum + (p.prix_fcfa || 0), 0);

      setStats({ pending, credited, cancelled, revenue });
    } catch (err) {
      console.error("loadPurchases:", err);
      showToast?.("Erreur chargement : " + err.message, "error");
    }
    setLoading(false);
  };

  useEffect(() => { loadPurchases(); }, []);

  const validateP = async (purchase) => {
    if (!window.confirm(
      `Valider l'achat de ${purchase.points} points pour ${purchase.client?.nom || "ce client"} ?\n\n` +
      `Montant : ${purchase.prix_fcfa?.toLocaleString("fr-FR")} FCFA\n` +
      `Les points seront crédités immédiatement.`
    )) return;

    setActionLoading(purchase.id);
    try {
      const { data, error } = await supabase.rpc("validate_pack_purchase", {
        p_purchase_id: purchase.id,
        p_admin_id:    user.id,
        p_admin_notes: "Validé manuellement",
      });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Erreur validation");

      if (purchase.client?.email) {
        try {
          await sendEmail({
            to:      purchase.client.email,
            subject: `🎉 ${purchase.points} points Yorix crédités sur votre compte !`,
            html: `
              <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;">
                <div style="background:linear-gradient(135deg,#1a3a24,#2d9655);color:#fff;padding:30px;border-radius:12px 12px 0 0;text-align:center;">
                  <div style="font-size:48px;margin-bottom:10px;">🌟</div>
                  <h1 style="margin:0;font-size:24px;font-family:'Syne',sans-serif;">Vos points sont arrivés !</h1>
                </div>
                <div style="background:#fff;padding:30px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
                  <p style="color:#374151;font-size:15px;line-height:1.7;">
                    Bonjour <strong>${purchase.client.nom || "cher client"}</strong>,
                  </p>
                  <p style="color:#374151;font-size:15px;line-height:1.7;">
                    Nous avons bien reçu votre paiement de <strong>${purchase.prix_fcfa?.toLocaleString("fr-FR")} FCFA</strong>.
                    Votre pack <strong>${purchase.pack_nom}</strong> est activé !
                  </p>
                  <div style="background:#f0fdf4;border:2px solid #86efac;border-radius:12px;padding:20px;text-align:center;margin:24px 0;">
                    <div style="color:#059669;font-size:14px;font-weight:600;margin-bottom:6px;">POINTS CRÉDITÉS</div>
                    <div style="color:#059669;font-size:42px;font-weight:800;font-family:'Syne',sans-serif;">+${purchase.points.toLocaleString("fr-FR")} pts</div>
                  </div>
                  <p style="color:#6b7280;font-size:14px;line-height:1.7;">
                    Vous pouvez dès maintenant échanger vos points contre des bons d'achat, livraisons gratuites, réductions et bien plus encore.
                  </p>
                  <div style="text-align:center;margin-top:24px;">
                    <a href="https://yorix.cm/loyalty" style="display:inline-block;background:#1a6b3a;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:600;">
                      🎁 Voir mes récompenses
                    </a>
                  </div>
                  <p style="color:#9ca3af;font-size:12px;text-align:center;margin-top:24px;">
                    Merci de faire confiance à Yorix 🇨🇲
                  </p>
                </div>
              </div>
            `,
          });

          await supabase
            .from("loyalty_pack_purchases")
            .update({ email_sent: true })
            .eq("id", purchase.id);
        } catch (emailErr) {
          console.warn("Email non envoyé:", emailErr);
        }
      }

      showToast?.(`✅ ${purchase.points} pts crédités à ${purchase.client?.nom || "client"}`);
      loadPurchases();
    } catch (err) {
      console.error("validateP:", err);
      showToast?.("Erreur : " + err.message, "error");
    }
    setActionLoading(null);
  };

  const cancelP = async (purchase) => {
    const reason = window.prompt("Raison de l'annulation ?", "Paiement non reçu");
    if (!reason) return;

    setActionLoading(purchase.id);
    try {
      const { data, error } = await supabase.rpc("cancel_pack_purchase", {
        p_purchase_id: purchase.id,
        p_admin_id:    user.id,
        p_reason:      reason,
      });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Erreur");

      showToast?.("Achat annulé");
      loadPurchases();
    } catch (err) {
      showToast?.("Erreur : " + err.message, "error");
    }
    setActionLoading(null);
  };

  const filtered = purchases.filter(p => filter === "all" || p.status === filter);

  const statusBadge = (status) => {
    const colors = {
      pending:   { bg: "#fff9e6", c: "#b8860b", label: "⏳ En attente" },
      credited:  { bg: "#e6fff0", c: "#1a6b3a", label: "✅ Crédité" },
      cancelled: { bg: "#fff0f0", c: "#ce1126", label: "❌ Annulé" },
      paid:      { bg: "#e6f0ff", c: "#1a4a9a", label: "💳 Payé" },
    };
    const s = colors[status] || colors.pending;
    return (
      <span style={{
        background: s.bg, color: s.c, fontSize: ".68rem", fontWeight: 700,
        padding: "3px 10px", borderRadius: 50,
      }}>
        {s.label}
      </span>
    );
  };

  return (
    <>
      {selectedPurchase && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setSelectedPurchase(null)}>
          <div className="modal" style={{ maxWidth: 520 }}>
            <button className="modal-close" onClick={() => setSelectedPurchase(null)}>✕</button>

            <div className="modal-title">💎 Détail achat pack</div>
            <div className="modal-sub">
              #{selectedPurchase.id.slice(0, 8)} · {new Date(selectedPurchase.created_at).toLocaleString("fr-FR")}
            </div>

            <div style={{ marginTop: 18 }}>{statusBadge(selectedPurchase.status)}</div>

            <div style={{ background: "var(--green-pale)", border: "1px solid var(--green-light)", borderRadius: 10, padding: 14, marginTop: 14 }}>
              <div style={{ fontSize: ".7rem", color: "var(--gray)", fontWeight: 700, marginBottom: 6 }}>📦 PACK COMMANDÉ</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1rem", marginBottom: 4 }}>
                {selectedPurchase.pack_nom || "Pack"}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".82rem", marginTop: 8 }}>
                <span style={{ color: "var(--gray)" }}>Points</span>
                <strong style={{ color: "var(--green)" }}>{selectedPurchase.points?.toLocaleString("fr-FR")} pts</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".82rem", marginTop: 4 }}>
                <span style={{ color: "var(--gray)" }}>Prix</span>
                <strong>{selectedPurchase.prix_fcfa?.toLocaleString("fr-FR")} FCFA</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".82rem", marginTop: 4 }}>
                <span style={{ color: "var(--gray)" }}>Moyen paiement</span>
                <strong>
                  {selectedPurchase.moyen_paiement === "momo" ? "📱 MTN MoMo"
                    : selectedPurchase.moyen_paiement === "orange" ? "🔶 Orange Money"
                    : selectedPurchase.moyen_paiement}
                </strong>
              </div>
            </div>

            <div style={{ background: "var(--surface2)", borderRadius: 10, padding: 14, marginTop: 10 }}>
              <div style={{ fontSize: ".7rem", color: "var(--gray)", fontWeight: 700, marginBottom: 6 }}>👤 CLIENT</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".92rem" }}>
                {selectedPurchase.nom || selectedPurchase.client?.nom || "—"}
              </div>
              <div style={{ fontSize: ".78rem", color: "var(--gray)", marginTop: 3 }}>
                📞 {selectedPurchase.telephone || selectedPurchase.client?.telephone || "—"}
              </div>
              {selectedPurchase.client?.email && (
                <div style={{ fontSize: ".78rem", color: "var(--gray)", marginTop: 3 }}>
                  ✉️ {selectedPurchase.client.email}
                </div>
              )}
              {selectedPurchase.client && (
                <div style={{ fontSize: ".72rem", color: "var(--gray)", marginTop: 6, paddingTop: 6, borderTop: "1px dashed var(--border)" }}>
                  Solde actuel : <strong style={{ color: "var(--ink)" }}>{selectedPurchase.client.points?.toLocaleString("fr-FR") || 0} pts</strong>
                  {" · "}Niveau : <strong style={{ color: "var(--ink)" }}>{selectedPurchase.client.points_level || "bronze"}</strong>
                </div>
              )}
            </div>

            {selectedPurchase.admin_notes && (
              <div style={{ background: "#fff9e6", borderRadius: 10, padding: 12, marginTop: 10, border: "1px solid #fde68a" }}>
                <div style={{ fontSize: ".7rem", color: "#92400e", fontWeight: 700, marginBottom: 4 }}>📝 NOTE ADMIN</div>
                <div style={{ fontSize: ".8rem", color: "#78350f" }}>{selectedPurchase.admin_notes}</div>
              </div>
            )}

            {selectedPurchase.validated_at && (
              <div style={{ fontSize: ".7rem", color: "var(--gray)", marginTop: 8, textAlign: "center" }}>
                Validé le {new Date(selectedPurchase.validated_at).toLocaleString("fr-FR")}
              </div>
            )}

            {selectedPurchase.status === "pending" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 16 }}>
                <button
                  onClick={() => { validateP(selectedPurchase); setSelectedPurchase(null); }}
                  disabled={actionLoading === selectedPurchase.id}
                  style={{
                    background: "var(--green)", color: "#fff", border: "none",
                    padding: "12px", borderRadius: 9, cursor: "pointer",
                    fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".82rem",
                  }}
                >
                  ✅ Valider & créditer
                </button>
                <button
                  onClick={() => { cancelP(selectedPurchase); setSelectedPurchase(null); }}
                  disabled={actionLoading === selectedPurchase.id}
                  style={{
                    background: "#fff0f0", color: "#ce1126", border: "1.5px solid #fecaca",
                    padding: "12px", borderRadius: 9, cursor: "pointer",
                    fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".82rem",
                  }}
                >
                  ❌ Annuler
                </button>
              </div>
            )}

            {(selectedPurchase.telephone || selectedPurchase.client?.telephone) && (
              <a
                href={`https://wa.me/${(selectedPurchase.telephone || selectedPurchase.client.telephone).replace(/\D/g, "")}?text=${encodeURIComponent(
                  `Bonjour ${selectedPurchase.nom || ""}, concernant votre achat de ${selectedPurchase.points} points Yorix (pack ${selectedPurchase.pack_nom})...`
                )}`}
                target="_blank" rel="noreferrer"
                style={{
                  display: "block", marginTop: 10, background: "#25D366", color: "#fff",
                  padding: "10px", borderRadius: 8, textDecoration: "none", textAlign: "center",
                  fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".78rem",
                }}
              >
                📱 Contacter sur WhatsApp
              </a>
            )}
          </div>
        </div>
      )}

      <div className="admin-page-title">
        🌟 Yorix Points — Achats de packs
        {stats.pending > 0 && (
          <span style={{
            background: "#ce1126", color: "#fff", fontSize: ".65rem", fontWeight: 800,
            padding: "3px 10px", borderRadius: 50, marginLeft: 8,
          }}>
            {stats.pending} en attente
          </span>
        )}
      </div>

      <div className="stat-cards-grid" style={{ marginBottom: 18 }}>
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: "#fff9e6" }}><span>⏳</span></div>
          <div className="stat-card-val">{stats.pending}</div>
          <div className="stat-card-lbl">En attente validation</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: "#e6fff0" }}><span>✅</span></div>
          <div className="stat-card-val">{stats.credited}</div>
          <div className="stat-card-lbl">Crédités</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: "#fff0f0" }}><span>❌</span></div>
          <div className="stat-card-val">{stats.cancelled}</div>
          <div className="stat-card-lbl">Annulés</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: "#e6f0ff" }}><span>💰</span></div>
          <div className="stat-card-val">{stats.revenue.toLocaleString("fr-FR")} F</div>
          <div className="stat-card-lbl">Revenu packs</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {[
          { id: "pending",   label: "⏳ En attente", count: stats.pending },
          { id: "credited",  label: "✅ Crédités",  count: stats.credited },
          { id: "cancelled", label: "❌ Annulés",   count: stats.cancelled },
          { id: "all",       label: "📋 Tous",      count: purchases.length },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              background: filter === f.id ? "var(--green)" : "var(--surface)",
              color: filter === f.id ? "#fff" : "var(--ink)",
              border: `1.5px solid ${filter === f.id ? "var(--green)" : "var(--border)"}`,
              borderRadius: 8, padding: "7px 14px", cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".78rem",
            }}
          >
            {f.label} ({f.count})
          </button>
        ))}
        <button
          onClick={loadPurchases}
          style={{
            background: "var(--surface2)", color: "var(--ink)",
            border: "1px solid var(--border)", borderRadius: 8,
            padding: "7px 14px", cursor: "pointer",
            fontSize: ".78rem", fontWeight: 600, marginLeft: "auto",
          }}
        >
          🔄 Actualiser
        </button>
      </div>

      {loading ? (
        <div className="loading"><div className="spinner" />Chargement...</div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💎</div>
          <p>Aucun achat {filter !== "all" ? filter : ""}.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Client</th>
                <th>Pack</th>
                <th>Points</th>
                <th>Montant</th>
                <th>Paiement</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} style={{ cursor: "pointer" }}>
                  <td style={{ fontSize: ".72rem", color: "var(--gray)", whiteSpace: "nowrap" }}>
                    {new Date(p.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}
                    <br />
                    <span style={{ fontSize: ".65rem" }}>
                      {new Date(p.created_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </td>
                  <td onClick={() => setSelectedPurchase(p)}>
                    <strong style={{ fontSize: ".82rem" }}>{p.nom || p.client?.nom || "—"}</strong>
                    <div style={{ fontSize: ".68rem", color: "var(--gray)" }}>
                      📞 {p.telephone || p.client?.telephone || "—"}
                    </div>
                  </td>
                  <td onClick={() => setSelectedPurchase(p)}>
                    <span style={{ fontWeight: 600, fontSize: ".8rem" }}>{p.pack_nom || "—"}</span>
                  </td>
                  <td onClick={() => setSelectedPurchase(p)}>
                    <strong style={{ color: "var(--green)" }}>
                      {p.points?.toLocaleString("fr-FR")} pts
                    </strong>
                  </td>
                  <td onClick={() => setSelectedPurchase(p)}>
                    <strong>{p.prix_fcfa?.toLocaleString("fr-FR")} F</strong>
                  </td>
                  <td onClick={() => setSelectedPurchase(p)}>
                    <span style={{ fontSize: ".72rem" }}>
                      {p.moyen_paiement === "momo" ? "📱 MoMo"
                        : p.moyen_paiement === "orange" ? "🔶 Orange"
                        : p.moyen_paiement}
                    </span>
                  </td>
                  <td>{statusBadge(p.status)}</td>
                  <td>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                      {p.status === "pending" && (
                        <>
                          <button
                            onClick={e => { e.stopPropagation(); validateP(p); }}
                            disabled={actionLoading === p.id}
                            className="admin-action-btn"
                            style={{ background: "#e6fff0", color: "#1a6b3a" }}
                            title="Valider et créditer"
                          >
                            {actionLoading === p.id ? "⏳" : "✅"}
                          </button>
                          <button
                            onClick={e => { e.stopPropagation(); cancelP(p); }}
                            disabled={actionLoading === p.id}
                            className="admin-action-btn"
                            style={{ background: "#fff0f0", color: "#ce1126" }}
                            title="Annuler"
                          >
                            ❌
                          </button>
                        </>
                      )}
                      {(p.telephone || p.client?.telephone) && (
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            window.open(`https://wa.me/${(p.telephone || p.client.telephone).replace(/\D/g, "")}`);
                          }}
                          className="admin-action-btn"
                          style={{ background: "#dcfce7", color: "#166534" }}
                          title="WhatsApp"
                        >
                          📱
                        </button>
                      )}
                      <button
                        onClick={e => { e.stopPropagation(); setSelectedPurchase(p); }}
                        className="admin-action-btn"
                        style={{ background: "#e6f0ff", color: "#1a4a9a" }}
                        title="Détails"
                      >
                        👁
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
