import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { uploadSingleImage } from "../utils/helpers";

// ─────────────────────────────────────────────────────────────
// COMPOSANT : SELLER DASHBOARD — Yorix CM (version complète)
// ─────────────────────────────────────────────────────────────
export function SellerDashboard({ user, userData, dashTab, setDashTab }) {
  const [mesProduits, setMesProduits]     = useState([]);
  const [mesCommandes, setMesCommandes]   = useState([]);
  const [wallet, setWallet]               = useState({ solde: 0, total_gagne: 0 });
  const [loadingData, setLoadingData]     = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);
  const [saveMsg, setSaveMsg]             = useState(null);

  // ── Formulaire ajout produit ──
  const [form, setForm]         = useState({ name_fr: "", name_en: "", description_fr: "", prix: "", stock: "", categorie: "", ville: "", escrow: true });
  const [images, setImages]     = useState([]);
  const [previews, setPreviews] = useState([]);
  const [progress, setProgress] = useState(0);
  const [saving, setSaving]     = useState(false);
  const inputRef                = useRef(null);

  // ── Édition inline produit ──
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm]   = useState({});

  // ── Confirmation suppression ──
  const [pendingDelete, setPendingDelete] = useState(null);

  // ── Confirmation action commande ──
  const [pendingConfirm, setPendingConfirm] = useState(null);

  // Listes locales utilisées par le formulaire
  const CATS   = ["Téléphones & HighTech", "Mode & Accesoires", "Alimentation", "Maison & Decoration", "Agricole", "Beauté & Soins", "BTP", "Automobile", "Éducation", "Services", "Autre"];
  const VILLES = ["Yaoundé", "Douala", "Bafoussam", "Bamenda", "Garoua", "Maroua", "Ngaoundéré", "Bertoua", "Ebolowa", "Kribi"];

  const STATUS_LABELS = { pending: "En attente", paid: "Payée", shipped: "Expédiée", delivered: "Livrée", cancelled: "Annulée" };
  const STATUS_COLORS = { pending: "#888", paid: "#2563eb", shipped: "#d97706", delivered: "#16a34a", cancelled: "#dc2626" };

  // ── CHARGEMENT DONNÉES ──
  const loadAll = async () => {
    if (!user?.id) return;
    setLoadingData(true);

    const [prodsRes, cmdsRes, walRes] = await Promise.all([
      supabase.from("products").select("*").eq("vendeur_id", user.id).order("created_at", { ascending: false }),
      supabase.from("orders").select("*").eq("vendeur_id", user.id).order("created_at", { ascending: false }),
      supabase.from("wallets").select("*").eq("user_id", user.id).maybeSingle(),
    ]);

    if (prodsRes.error) console.error("products:", prodsRes.error);
    if (cmdsRes.error)  console.error("orders:",   cmdsRes.error);
    if (walRes.error)   console.error("wallets:",  walRes.error);

    setMesProduits(prodsRes.data || []);
    setMesCommandes(cmdsRes.data || []);
    if (walRes.data) setWallet(walRes.data);
    setLoadingData(false);
  };

  useEffect(() => { loadAll(); /* eslint-disable-next-line */ }, [user?.id]);

  // ── AJOUT PRODUIT ──
  const handleFiles = (files) => {
    const arr = Array.from(files).slice(0, 8);
    setImages(prev  => [...prev, ...arr].slice(0, 8));
    const urls = arr.map(f => URL.createObjectURL(f));
    setPreviews(prev => [...prev, ...urls].slice(0, 8));
  };

  const removePreview = (i) => {
    setImages(prev   => prev.filter((_, idx) => idx !== i));
    setPreviews(prev => prev.filter((_, idx) => idx !== i));
  };

  const resetForm = () => {
    setForm({ name_fr: "", name_en: "", description_fr: "", prix: "", stock: "", categorie: "", ville: "", escrow: true });
    setImages([]); setPreviews([]); setProgress(0);
  };

  const saveNewProduct = async () => {
    if (!form.name_fr.trim() || !form.prix || isNaN(Number(form.prix))) {
      setSaveMsg({ type: "error", text: "Nom et prix sont obligatoires." });
      setTimeout(() => setSaveMsg(null), 3000);
      return;
    }
    setSaving(true); setProgress(10);
    try {
      let imageUrls = [];
      if (images.length > 0) {
        setProgress(20);
        const uploads = images.map((f, i) =>
          uploadSingleImage(f).then(url => {
            setProgress(20 + Math.round((i + 1) / images.length * 50));
            return url;
          })
        );
        imageUrls = (await Promise.all(uploads)).filter(Boolean);
      }
      setProgress(80);

      const { error } = await supabase.from("products").insert({
        name_fr:        form.name_fr,
        name_en:        form.name_en || form.name_fr,
        description_fr: form.description_fr,
        prix:           Number(form.prix),
        stock:          Number(form.stock || 0),
        categorie:      form.categorie || "Autre",
        ville:          form.ville || "Douala",
        image:          imageUrls[0] || null,
        image_urls:     imageUrls,
        vendeur_id:     user.id,
        vendeur_nom:    userData?.nom || "",
        actif:          true,
        escrow:         form.escrow,
        local:          true,
        vues: 0, clics: 0, vente_total: 0, note: 0, nombre_avis: 0,
      });
      if (error) throw error;

      setProgress(100);
      setSaveMsg({ type: "success", text: "✅ Produit publié ! Il est visible sur la plateforme." });
      resetForm();
      setTimeout(() => { setSaveMsg(null); setProgress(0); }, 3000);
      loadAll();
    } catch (err) {
      setSaveMsg({ type: "error", text: "Erreur : " + err.message });
    }
    setSaving(false);
  };

  // ── MODIFICATION PRODUIT ──
  const startEdit = (p) => {
    setEditingId(p.id);
    setEditForm({
      name_fr:        p.name_fr || "",
      description_fr: p.description_fr || "",
      prix:           p.prix || "",
      stock:          p.stock ?? 0,
      categorie:      p.categorie || "",
      ville:          p.ville || "",
    });
  };

  const cancelEdit = () => { setEditingId(null); setEditForm({}); };

  const saveEdit = async (id) => {
    if (!editForm.name_fr?.trim() || !editForm.prix || isNaN(Number(editForm.prix))) {
      alert("Nom et prix sont obligatoires."); return;
    }
    setLoadingAction(true);
    const { error } = await supabase.from("products").update({
      name_fr:        editForm.name_fr,
      description_fr: editForm.description_fr,
      prix:           Number(editForm.prix),
      stock:          Number(editForm.stock || 0),
      categorie:      editForm.categorie,
      ville:          editForm.ville,
    }).eq("id", id);

    if (error) {
      console.error(error);
      alert("Erreur modification : " + error.message);
      setLoadingAction(false);
      return;
    }
    setMesProduits(prev => prev.map(p => p.id === id ? { ...p, ...editForm, prix: Number(editForm.prix), stock: Number(editForm.stock || 0) } : p));
    setEditingId(null); setEditForm({});
    setLoadingAction(false);
  };

  // ── ACTIVER / DÉSACTIVER PRODUIT ──
  const toggleActif = async (id, current) => {
    setLoadingAction(true);
    const { error } = await supabase.from("products").update({ actif: !current }).eq("id", id);
    if (error) { console.error(error); alert("Erreur : " + error.message); setLoadingAction(false); return; }
    setMesProduits(prev => prev.map(p => p.id === id ? { ...p, actif: !current } : p));
    setLoadingAction(false);
  };

  // ── SUPPRESSION PRODUIT ──
  const deleteProduct = async (id) => {
    setLoadingAction(true);
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) { console.error(error); alert("Erreur suppression : " + error.message); setLoadingAction(false); return; }
    setMesProduits(prev => prev.filter(p => p.id !== id));
    setPendingDelete(null);
    setLoadingAction(false);
  };

  // ── COMMANDES ──
  const updateOrderStatus = async (orderId, field, value) => {
    const { error } = await supabase.from("orders").update({ [field]: value }).eq("id", orderId);
    if (error) { console.error(error); alert("Erreur : " + error.message); setPendingConfirm(null); return; }
    setMesCommandes(prev => prev.map(c => c.id === orderId ? { ...c, [field]: value } : c));
    setPendingConfirm(null);
  };

  // ── UTILS ──
  const revenusTotal     = mesCommandes.reduce((t, c) => c.status === "delivered" ? t + (Number(c.montant_vendeur) || 0) : t, 0);
  const commandesActives = mesCommandes.filter(c => ["pending", "paid", "shipped"].includes(c.status)).length;

  // ── STYLES INLINE PARTAGÉS ──
  const S = {
    card:     { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 20, marginBottom: 14 },
    input:    { border: "1.5px solid var(--border)", borderRadius: 8, padding: "8px 11px", fontFamily: "'DM Sans',sans-serif", fontSize: ".82rem", background: "var(--surface)", color: "var(--ink)", outline: "none", width: "100%" },
    label:    { fontSize: ".72rem", fontWeight: 600, color: "var(--ink)", marginBottom: 4, display: "block" },
    btnGreen: { background: "var(--green)", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".78rem" },
    btnGhost: { background: "var(--surface2)", color: "var(--ink)", border: "1.5px solid var(--border)", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".78rem" },
    btnRed:   { background: "transparent", color: "#ce1126", border: "1.5px solid #fecaca", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".75rem" },
    btnBlue:  { background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".75rem" },
    row:      { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
    secTitle: { fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1rem", color: "var(--ink)", marginBottom: 14 },
  };

  if (loadingData) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 60, gap: 12, color: "var(--green)" }}>
        <div className="spinner" style={{ width: 30, height: 30, borderWidth: 3 }} /> Chargement...
      </div>
    );
  }

  return (
    <>
      {/* ── MODAL CONFIRMATION SUPPRESSION ── */}
      {pendingDelete && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "var(--surface)", borderRadius: 14, padding: 28, maxWidth: 340, width: "90%", textAlign: "center", border: "1px solid var(--border)" }}>
            <div style={{ fontSize: "2rem", marginBottom: 10 }}>🗑️</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1rem", color: "var(--ink)", marginBottom: 8 }}>Supprimer ce produit ?</div>
            <p style={{ fontSize: ".82rem", color: "var(--gray)", marginBottom: 20, lineHeight: 1.6 }}>
              "<strong>{pendingDelete.nom}</strong>" sera définitivement supprimé de la plateforme.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button style={S.btnGhost} onClick={() => setPendingDelete(null)}>Annuler</button>
              <button
                disabled={loadingAction}
                style={{ ...S.btnRed, background: "#ce1126", color: "#fff", border: "none", padding: "8px 20px" }}
                onClick={() => deleteProduct(pendingDelete.id)}
              >
                {loadingAction ? "Suppression..." : "Supprimer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL CONFIRMATION COMMANDE ── */}
      {pendingConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "var(--surface)", borderRadius: 14, padding: 24, maxWidth: 320, width: "90%", textAlign: "center", border: "1px solid var(--border)" }}>
            <p style={{ marginBottom: 18, fontSize: ".85rem", lineHeight: 1.6 }}>{pendingConfirm.label}</p>
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button style={S.btnGhost} onClick={() => setPendingConfirm(null)}>Annuler</button>
              <button style={S.btnGreen} onClick={() => updateOrderStatus(pendingConfirm.id, pendingConfirm.field, pendingConfirm.value)}>
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════ OVERVIEW ════ */}
      {dashTab === "overview" && (
        <>
          <div className="dash-page-title">Bonjour {userData?.nom} 👋</div>

          <div className="dash-stats">
            {[
              { icon: "📦", val: mesProduits.length,                                   lbl: "Produits publiés" },
              { icon: "🛒", val: commandesActives,                                      lbl: "Commandes actives" },
              { icon: "✅", val: mesCommandes.filter(c => c.status === "delivered").length, lbl: "Livrées" },
              { icon: "💰", val: `${revenusTotal.toLocaleString("fr-FR")} FCFA`,        lbl: "Revenus nets" },
            ].map(s => (
              <div key={s.lbl} className="dstat">
                <div className="dstat-icon">{s.icon}</div>
                <div className="dstat-val">{s.val}</div>
                <div className="dstat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>

          <div style={S.card}>
            <div style={S.row}>
              <div style={S.secTitle}>📦 Mes derniers produits</div>
              <button style={S.btnGhost} onClick={() => setDashTab("mesProduits")}>Voir tout →</button>
            </div>
            {mesProduits.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <p>Aucun produit publié</p>
                <button style={{ ...S.btnGreen, marginTop: 12 }} onClick={() => setDashTab("ajouterProduit")}>+ Ajouter mon premier produit</button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {mesProduits.slice(0, 4).map(p => (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: "var(--surface2)", borderRadius: 10, border: "1px solid var(--border)" }}>
                    {p.image ? (
                      <img src={p.image} alt="" style={{ width: 46, height: 46, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} onError={e => e.currentTarget.style.display = "none"} />
                    ) : (
                      <div style={{ width: 46, height: 46, borderRadius: 8, background: "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", flexShrink: 0 }}>📦</div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: ".83rem", color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name_fr}</div>
                      <div style={{ fontSize: ".7rem", color: "var(--gray)", marginTop: 2 }}>{p.categorie} · {p.ville}</div>
                    </div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".88rem", color: "var(--green)", flexShrink: 0 }}>{p.prix?.toLocaleString()} F</div>
                    <span style={{ fontSize: ".65rem", padding: "2px 8px", borderRadius: 20, background: p.actif ? "var(--green-pale)" : "var(--surface2)", color: p.actif ? "var(--green)" : "var(--gray)", border: `1px solid ${p.actif ? "var(--green-light)" : "var(--border)"}`, flexShrink: 0 }}>
                      {p.actif ? "Actif" : "Inactif"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={S.card}>
            <div style={S.row}>
              <div style={S.secTitle}>🛒 Commandes récentes</div>
              <button style={S.btnGhost} onClick={() => setDashTab("commandes")}>Voir tout →</button>
            </div>
            {mesCommandes.length === 0 ? (
              <div className="empty-state"><div className="empty-icon">🛒</div><p>Aucune commande</p></div>
            ) : (
              mesCommandes.slice(0, 3).map(c => (
                <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: ".82rem" }}>{c.client_nom || "Client"}</div>
                    <div style={{ fontSize: ".7rem", color: "var(--gray)", marginTop: 2 }}>{(c.montant_vendeur || 0).toLocaleString()} FCFA</div>
                  </div>
                  <span style={{ fontSize: ".68rem", padding: "2px 10px", borderRadius: 20, background: (STATUS_COLORS[c.status] || "#888") + "22", color: STATUS_COLORS[c.status] || "#888", fontWeight: 600 }}>
                    {STATUS_LABELS[c.status] || c.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* ════ MES PRODUITS ════ */}
      {dashTab === "mesProduits" && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div className="dash-page-title" style={{ marginBottom: 0 }}>📦 Mes produits ({mesProduits.length})</div>
            <button style={S.btnGreen} onClick={() => setDashTab("ajouterProduit")}>+ Ajouter</button>
          </div>

          {mesProduits.length === 0 ? (
            <div style={S.card}>
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <p>Aucun produit publié</p>
                <button style={{ ...S.btnGreen, marginTop: 12 }} onClick={() => setDashTab("ajouterProduit")}>+ Ajouter mon premier produit</button>
              </div>
            </div>
          ) : (
            mesProduits.map(p => (
              <div key={p.id} style={{ ...S.card, opacity: p.actif ? 1 : 0.65, transition: "opacity .2s" }}>
                {editingId === p.id ? (
                  <>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".9rem", color: "var(--green)", marginBottom: 14 }}>✏️ Modifier le produit</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                      <div>
                        <label style={S.label}>Nom (FR) *</label>
                        <input style={S.input} value={editForm.name_fr} onChange={e => setEditForm(f => ({ ...f, name_fr: e.target.value }))} />
                      </div>
                      <div>
                        <label style={S.label}>Prix (FCFA) *</label>
                        <input style={S.input} type="number" value={editForm.prix} onChange={e => setEditForm(f => ({ ...f, prix: e.target.value }))} />
                      </div>
                      <div>
                        <label style={S.label}>Stock</label>
                        <input style={S.input} type="number" value={editForm.stock} onChange={e => setEditForm(f => ({ ...f, stock: e.target.value }))} />
                      </div>
                      <div>
                        <label style={S.label}>Catégorie</label>
                        <select style={S.input} value={editForm.categorie} onChange={e => setEditForm(f => ({ ...f, categorie: e.target.value }))}>
                          <option value="">Choisir...</option>
                          {CATS.map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={S.label}>Ville</label>
                        <select style={S.input} value={editForm.ville} onChange={e => setEditForm(f => ({ ...f, ville: e.target.value }))}>
                          <option value="">Choisir...</option>
                          {VILLES.map(v => <option key={v}>{v}</option>)}
                        </select>
                      </div>
                      <div style={{ gridColumn: "1/-1" }}>
                        <label style={S.label}>Description</label>
                        <textarea style={{ ...S.input, minHeight: 65, resize: "vertical" }} value={editForm.description_fr} onChange={e => setEditForm(f => ({ ...f, description_fr: e.target.value }))} />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={S.btnGreen} disabled={loadingAction} onClick={() => saveEdit(p.id)}>
                        {loadingAction ? "Sauvegarde..." : "✅ Sauvegarder"}
                      </button>
                      <button style={S.btnGhost} onClick={cancelEdit}>Annuler</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      {p.image ? (
                        <img src={p.image} alt="" style={{ width: 64, height: 64, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} onError={e => e.currentTarget.style.display = "none"} />
                      ) : (
                        <div style={{ width: 64, height: 64, borderRadius: 10, background: "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", flexShrink: 0 }}>📦</div>
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".92rem", color: "var(--ink)" }}>{p.name_fr}</div>
                          <span style={{ fontSize: ".62rem", padding: "2px 8px", borderRadius: 20, background: p.actif ? "var(--green-pale)" : "var(--surface2)", color: p.actif ? "var(--green)" : "var(--gray)", border: `1px solid ${p.actif ? "var(--green-light)" : "var(--border)"}` }}>
                            {p.actif ? "✅ Actif" : "⛔ Inactif"}
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: ".75rem", color: "var(--gray)", marginBottom: 6 }}>
                          <span>💰 <strong style={{ color: "var(--green)" }}>{p.prix?.toLocaleString()} FCFA</strong></span>
                          <span>📦 Stock : <strong style={{ color: !p.stock || p.stock === 0 ? "#ce1126" : p.stock <= 5 ? "#d97706" : "var(--ink)" }}>{p.stock ?? 0}</strong></span>
                          {p.categorie && <span>🏷️ {p.categorie}</span>}
                          {p.ville     && <span>📍 {p.ville}</span>}
                        </div>
                        {p.description_fr && (
                          <div style={{ fontSize: ".72rem", color: "var(--gray)", lineHeight: 1.5, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                            {p.description_fr}
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                      <button style={S.btnGreen} onClick={() => startEdit(p)}>✏️ Modifier</button>
                      <button style={S.btnGhost} disabled={loadingAction} onClick={() => toggleActif(p.id, p.actif)}>
                        {p.actif ? "⛔ Désactiver" : "✅ Activer"}
                      </button>
                      <button style={S.btnRed} onClick={() => setPendingDelete({ id: p.id, nom: p.name_fr })}>
                        🗑️ Supprimer
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </>
      )}

      {/* ════ AJOUTER PRODUIT ════ */}
      {dashTab === "ajouterProduit" && (
        <div className="prod-form">
          <div className="pf-title">➕ Nouveau produit</div>

          {saveMsg && (
            <div className={saveMsg.type === "success" ? "success-msg" : "error-msg"} style={{ marginBottom: 14 }}>
              {saveMsg.text}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nom du produit (FR) <span>*</span></label>
              <input className="form-input" placeholder="Ex: Sac tissé Bamoun" value={form.name_fr} onChange={e => setForm(f => ({ ...f, name_fr: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Nom (EN)</label>
              <input className="form-input" placeholder="Ex: Bamoun woven bag" value={form.name_en} onChange={e => setForm(f => ({ ...f, name_en: e.target.value }))} />
            </div>
            <div className="form-group full">
              <label className="form-label">Description détaillée</label>
              <textarea className="form-textarea" placeholder="Matière, dimensions, utilisation..." value={form.description_fr} onChange={e => setForm(f => ({ ...f, description_fr: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Prix (FCFA) <span>*</span></label>
              <input className="form-input" type="number" min="0" placeholder="Ex: 25000" value={form.prix} onChange={e => setForm(f => ({ ...f, prix: e.target.value }))} />
              {form.prix && !isNaN(Number(form.prix)) && (
                <span style={{ fontSize: ".67rem", color: "var(--gray)", marginTop: 3 }}>
                  Commission Yorix (5%) : {Math.round(Number(form.prix) * 0.05).toLocaleString()} FCFA · Vous recevez : <strong style={{ color: "var(--green)" }}>{Math.round(Number(form.prix) * 0.95).toLocaleString()} FCFA</strong>
                </span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Stock disponible</label>
              <input className="form-input" type="number" min="0" placeholder="Ex: 10" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Catégorie</label>
              <select className="form-select" value={form.categorie} onChange={e => setForm(f => ({ ...f, categorie: e.target.value }))}>
                <option value="">Choisir...</option>
                {CATS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Ville</label>
              <select className="form-select" value={form.ville} onChange={e => setForm(f => ({ ...f, ville: e.target.value }))}>
                <option value="">Choisir...</option>
                {VILLES.map(v => <option key={v}>{v}</option>)}
              </select>
            </div>

            <div className="form-group full">
              <label className="form-label">📸 Photos du produit (max 8, via Cloudinary)</label>
              <div
                className="img-upload-area"
                onClick={() => inputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add("dragover"); }}
                onDragLeave={e => e.currentTarget.classList.remove("dragover")}
                onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove("dragover"); handleFiles(e.dataTransfer.files); }}
              >
                <div className="img-upload-icon">📸</div>
                <div className="img-upload-text">Cliquer pour choisir ou glisser-déposer</div>
                <div className="img-upload-hint">JPEG, PNG, WebP · Max 8 images · La 1ère sera la photo principale</div>
              </div>
              <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={e => handleFiles(e.target.files)} />

              {previews.length > 0 && (
                <div className="img-previews">
                  {previews.map((url, i) => (
                    <div key={i} className="img-preview-item">
                      <img
                        src={url}
                        alt={`preview ${i}`}
                        onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = "https://via.placeholder.com/70?text=📦"; }}
                      />
                      <button className="img-preview-del" onClick={() => removePreview(i)}>×</button>
                      {i === 0 && (
                        <span style={{ position: "absolute", bottom: 2, left: 2, background: "var(--green)", color: "#fff", fontSize: ".5rem", fontWeight: 700, padding: "1px 4px", borderRadius: 3 }}>
                          PRINCIPALE
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {saving && progress > 0 && (
                <div className="upload-progress">
                  <div className="upload-progress-bar" style={{ width: `${progress}%` }} />
                </div>
              )}
            </div>

            <div className="form-group full">
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: ".82rem", fontWeight: 600, color: "var(--ink)" }}>
                <input type="checkbox" checked={form.escrow} onChange={e => setForm(f => ({ ...f, escrow: e.target.checked }))} />
                🔐 Activer la protection Escrow (recommandé)
              </label>
            </div>
          </div>

          <button className="form-submit" onClick={saveNewProduct} disabled={saving}>
            {saving ? (
              <>
                <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                Publication... ({progress}%)
              </>
            ) : (
              "✅ Publier le produit"
            )}
          </button>
        </div>
      )}

      {/* ════ COMMANDES ════ */}
      {dashTab === "commandes" && (
        <>
          <div className="dash-page-title">🛒 Mes commandes ({mesCommandes.length})</div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
            {[
              { label: "⏳ En attente", filter: "pending",   color: "#d97706" },
              { label: "💳 Payées",     filter: "paid",      color: "#2563eb" },
              { label: "🚚 Expédiées",  filter: "shipped",   color: "#7c3aed" },
              { label: "✅ Livrées",    filter: "delivered", color: "#16a34a" },
            ].map(s => (
              <div key={s.label} style={{ background: s.color + "18", border: `1px solid ${s.color}33`, borderRadius: 8, padding: "6px 12px", fontSize: ".72rem", fontWeight: 700, color: s.color }}>
                {s.label} : {mesCommandes.filter(c => c.status === s.filter).length}
              </div>
            ))}
          </div>

          {mesCommandes.length === 0 ? (
            <div style={S.card}>
              <div className="empty-state"><div className="empty-icon">🛒</div><p>Aucune commande pour l'instant</p></div>
            </div>
          ) : (
            mesCommandes.map(c => (
              <div key={c.id} style={{ ...S.card, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".88rem", color: "var(--ink)" }}>{c.client_nom || "Client"}</div>
                    <div style={{ fontSize: ".7rem", color: "var(--gray)", marginTop: 2 }}>
                      📞 {c.telephone || "—"} · #{String(c.id).slice(-8)}
                    </div>
                  </div>
                  <span style={{ fontSize: ".68rem", padding: "3px 10px", borderRadius: 20, background: (STATUS_COLORS[c.status] || "#888") + "22", color: STATUS_COLORS[c.status] || "#888", fontWeight: 700 }}>
                    {STATUS_LABELS[c.status] || c.status}
                  </span>
                </div>

                <div style={{ display: "flex", gap: 12, fontSize: ".75rem", color: "var(--gray)", marginBottom: 10, flexWrap: "wrap" }}>
                  <span>💰 <strong style={{ color: "var(--green)" }}>{(c.montant_vendeur || 0).toLocaleString()} FCFA</strong> nets</span>
                  <span>📅 {c.created_at ? new Date(c.created_at).toLocaleDateString("fr-FR") : "—"}</span>
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {c.status === "pending" && (
                    <button style={S.btnBlue} onClick={() => setPendingConfirm({ id: c.id, field: "status", value: "paid", label: "Marquer cette commande comme payée ?" })}>
                      💳 Marquer payée
                    </button>
                  )}
                  {c.status === "paid" && (
                    <button style={S.btnGreen} onClick={() => setPendingConfirm({ id: c.id, field: "status", value: "shipped", label: "Marquer cette commande comme expédiée ?" })}>
                      🚚 Marquer expédiée
                    </button>
                  )}
                  {c.status === "shipped" && (
                    <button style={S.btnGreen} onClick={() => setPendingConfirm({ id: c.id, field: "status", value: "delivered", label: "Marquer cette commande comme livrée ?" })}>
                      ✅ Marquer livrée
                    </button>
                  )}
                  {c.telephone && (
                    <button
                      style={{ background: "#25D366", color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".75rem" }}
                      onClick={() => window.open(`https://wa.me/${c.telephone.replace(/[^0-9]/g, "").replace(/^0/, "237")}?text=${encodeURIComponent(`Bonjour ${c.client_nom || ""}! Votre commande Yorix est en cours. 📦`)}`, "_blank")}
                    >
                      📱 WhatsApp
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </>
      )}

      {/* ════ WALLET ════ */}
      {dashTab === "wallet" && (
        <>
          <div className="dash-page-title">💰 Mon portefeuille</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div style={{ padding: 20, background: "var(--green-pale)", border: "1px solid var(--green-light)", borderRadius: 12 }}>
              <div style={{ fontSize: ".72rem", color: "var(--gray)", fontWeight: 600, marginBottom: 6 }}>SOLDE DISPONIBLE</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.8rem", fontWeight: 800, color: "var(--green)" }}>
                {Number(wallet.solde).toLocaleString("fr-FR")} <span style={{ fontSize: ".8rem", fontWeight: 400, color: "var(--gray)" }}>FCFA</span>
              </div>
            </div>
            <div style={{ padding: 20, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12 }}>
              <div style={{ fontSize: ".72rem", color: "var(--gray)", fontWeight: 600, marginBottom: 6 }}>TOTAL GAGNÉ</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.8rem", fontWeight: 800, color: "#2563eb" }}>
                {Number(wallet.total_gagne).toLocaleString("fr-FR")} <span style={{ fontSize: ".8rem", fontWeight: 400, color: "var(--gray)" }}>FCFA</span>
              </div>
            </div>
          </div>
          <div style={S.card}>
            <div style={S.secTitle}>💸 Retrait</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
              <button style={{ ...S.btnGhost, padding: 14, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: "1.4rem" }}>📱</span>
                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".82rem" }}>MTN MoMo</span>
                <span style={{ fontSize: ".7rem", color: "var(--gray)" }}>676 935 195</span>
              </button>
              <button style={{ ...S.btnGhost, padding: 14, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: "1.4rem" }}>🔶</span>
                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".82rem" }}>Orange Money</span>
                <span style={{ fontSize: ".7rem", color: "var(--gray)" }}>696 565 654</span>
              </button>
            </div>
            <div style={{ background: "var(--surface2)", borderRadius: 8, padding: "10px 14px", fontSize: ".75rem", color: "var(--gray)" }}>
              ℹ️ Retrait minimum : 5 000 FCFA · Commission Yorix (5%) déduite automatiquement à la vente
            </div>
          </div>
        </>
      )}
    </>
  );
}
