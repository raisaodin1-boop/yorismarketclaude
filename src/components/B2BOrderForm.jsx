import { useState } from "react";
import { supabase } from "../lib/supabase";
import { showAppToast } from "../lib/appToast";
import { OptimizedImage } from "./OptimizedImage";

export function B2BOrderForm({ product, user, userData, onClose, onSuccess }) {
  const [form, setForm] = useState({
    company_name: "",
    contact_name: userData?.nom || "",
    phone:        userData?.telephone || "",
    email:        user?.email || "",
    quantity:     String(product?.min_qty_gros || 10),
    message:      "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(null);

  const minQty   = product?.min_qty_gros || 10;
  const unitPrice = product?.prix_gros || product?.prix || 0;
  const total    = Number(form.quantity || 0) * unitPrice;

  const handleSubmit = async () => {
    if (!form.contact_name.trim()) { showAppToast("Nom du contact requis", "error"); return; }
    if (!form.phone.replace(/s/g,"").match(/^d{8,}/)) { showAppToast("Numéro de téléphone invalide", "error"); return; }
    if (Number(form.quantity) < minQty) { showAppToast(`Quantité minimum : ${minQty} unités`, "error"); return; }
    setLoading(true);
    try {
      const { data, error } = await supabase.from("b2b_requests").insert({
        buyer_id:     user?.id || null,
        product_id:   product.id,
        seller_id:    product.vendeur_id,
        company_name: form.company_name.trim() || null,
        contact_name: form.contact_name.trim(),
        phone:        form.phone.replace(/s/g,""),
        email:        form.email.trim() || null,
        quantity:     Number(form.quantity),
        message:      form.message.trim() || null,
      }).select("id").single();
      if (error) throw error;

      await supabase.from("notifications").insert({
        user_id: product.vendeur_id,
        type:    "b2b",
        title:   "Nouvelle demande B2B",
        body:    `${form.contact_name} veut commander ${Number(form.quantity).toLocaleString()} unités de "${product.name_fr}". Tél : ${form.phone}`,
        lu:      false,
      }).catch(() => {});

      setDone(data?.id || "OK");
      onSuccess?.();
    } catch (e) {
      showAppToast("Erreur : " + e.message, "error");
    }
    setLoading(false);
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Commande en gros"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="modal b2b-modal">
        {/* Header */}
        <div className="b2b-header">
          <div className="b2b-header__img">
            <OptimizedImage
              src={product?.image_urls?.[0] || product?.image}
              alt={product?.name_fr}
              size="card"
              fallbackEmoji="📦"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="b2b-header__info">
            <div className="b2b-header__name">{product?.name_fr}</div>
            <div className="b2b-header__badge">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              ACHAT EN GROS · B2B
            </div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Fermer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {done ? (
          <div className="b2b-success">
            <div className="b2b-success__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div className="b2b-success__title">Demande envoyée !</div>
            <p className="b2b-success__sub">
              Le vendeur a reçu votre demande pour <strong>{form.quantity} unités</strong>.<br/>
              Il vous contactera sur <strong>{form.phone}</strong> sous 24h ouvrées.
            </p>
            <button className="form-submit" style={{ width: "auto", padding: "10px 24px", marginTop: 16 }} onClick={onClose}>
              Fermer
            </button>
          </div>
        ) : (
          <>
            <div className="b2b-body">
              {product?.prix_gros && (
                <div className="b2b-price-hint">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ display:"inline",verticalAlign:"middle",marginRight:4 }} aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r=".5" fill="currentColor"/></svg>
                  Prix de gros : <strong>{Number(product.prix_gros).toLocaleString()} FCFA/unité</strong> — minimum {minQty} unités
                  {Number(form.quantity) >= minQty && <> · Total indicatif : <strong>{total.toLocaleString()} FCFA</strong></>}
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Entreprise / Société (optionnel)</label>
                  <input className="form-input" placeholder="Ex: SARL Distribution Cameroun" value={form.company_name} onChange={e => setForm(f => ({...f, company_name: e.target.value}))} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div className="form-group">
                    <label className="form-label">Nom du contact <span style={{ color:"#e53e3e" }}>*</span></label>
                    <input className="form-input" placeholder="Votre nom" value={form.contact_name} onChange={e => setForm(f => ({...f, contact_name: e.target.value}))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Téléphone <span style={{ color:"#e53e3e" }}>*</span></label>
                    <input className="form-input" type="tel" inputMode="numeric" placeholder="6XX XXX XXX" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Email (optionnel)</label>
                  <input className="form-input" type="email" placeholder="email@exemple.com" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Quantité souhaitée <span style={{ color:"#e53e3e" }}>*</span></label>
                  <input
                    className="form-input"
                    type="number"
                    min={minQty}
                    placeholder={`Min ${minQty} unités`}
                    value={form.quantity}
                    onChange={e => setForm(f => ({...f, quantity: e.target.value}))}
                  />
                  {Number(form.quantity) > 0 && Number(form.quantity) < minQty && (
                    <span style={{ fontSize:".68rem", color:"#dc2626", marginTop:3 }}>Minimum {minQty} unités pour la vente en gros</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Message / demande spéciale</label>
                  <textarea
                    className="form-textarea"
                    style={{ minHeight: 70 }}
                    placeholder="Ex: délai de livraison souhaité, conditions de paiement, ville de livraison…"
                    value={form.message}
                    onChange={e => setForm(f => ({...f, message: e.target.value}))}
                  />
                </div>
              </div>
            </div>

            <div className="b2b-footer">
              <button className="form-submit" onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <><div className="spinner" style={{ width: 15, height: 15, borderWidth: 2 }} /> Envoi…</>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    Envoyer la demande
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
