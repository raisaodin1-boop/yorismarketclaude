import { useState } from "react";
import { CITIES } from "../lib/constants";
import { submitDeliveryProQuote } from "../lib/deliveryProQuoteApi";
import { showAppToast } from "../lib/appToast";

const VOLUME_OPTIONS = [
  { id: "1-50", label: "1 – 50 colis / mois" },
  { id: "51-200", label: "51 – 200 colis / mois" },
  { id: "201-500", label: "201 – 500 colis / mois" },
  { id: "500+", label: "500+ colis / mois" },
];

export function ModalLivraisonPro({ user, userData, onClose }) {
  const [form, setForm] = useState({
    shop_name: userData?.nom_boutique || "",
    owner_name: userData?.nom || "",
    phone: userData?.telephone || "",
    email: userData?.email || user?.email || "",
    city: userData?.ville || "Douala",
    address: userData?.adresse || "",
    monthly_volume: "",
    driver_mode: "assigned",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const result = await submitDeliveryProQuote(form, user?.id || null);
      if (!result.ok) {
        setErrors(result.errors);
        setLoading(false);
        return;
      }
      setDone(true);
      showAppToast("Demande envoyée — notre équipe vous contactera par email.", "success", 4000);
    } catch (err) {
      showAppToast(err.message || "Envoi impossible. Réessayez ou contactez le support.", "error");
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-lg" role="dialog" aria-modal="true" aria-labelledby="liv-pro-title">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Fermer">
          ✕
        </button>

        {done ? (
          <>
            <div className="modal-title" id="liv-pro-title">✅ Demande enregistrée</div>
            <p className="modal-sub">
              Votre demande de devis livraison pro a été transmise à l&apos;équipe Yorix. Vous serez contacté par email
              sous 24–48h ouvrées.
            </p>
            <button type="button" className="form-submit" onClick={onClose}>
              Fermer
            </button>
          </>
        ) : (
          <>
            <div className="modal-title" id="liv-pro-title">🚀 Livraison pro pour vendeurs</div>
            <p className="modal-sub">
              Remplissez le formulaire — notre équipe étudie votre volume et vous envoie un devis personnalisé par email.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                  <label className="form-label">
                    Nom de la boutique <span>*</span>
                  </label>
                  <input
                    className="form-input"
                    required
                    value={form.shop_name}
                    onChange={(e) => set("shop_name", e.target.value)}
                    placeholder="Ex: Mode Élégance Douala"
                  />
                  {errors.shop_name && <div className="error-msg" style={{ marginTop: 4 }}>{errors.shop_name}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Nom du chef d&apos;entreprise <span>*</span>
                  </label>
                  <input
                    className="form-input"
                    required
                    value={form.owner_name}
                    onChange={(e) => set("owner_name", e.target.value)}
                    placeholder="Ex: Amina Bello"
                  />
                  {errors.owner_name && <div className="error-msg" style={{ marginTop: 4 }}>{errors.owner_name}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Téléphone <span>*</span>
                  </label>
                  <input
                    className="form-input"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+237 6XX XXX XXX"
                  />
                  {errors.phone && <div className="error-msg" style={{ marginTop: 4 }}>{errors.phone}</div>}
                </div>

                <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                  <label className="form-label">
                    Email professionnel <span>*</span>
                  </label>
                  <input
                    className="form-input"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="contact@votreboutique.cm"
                  />
                  {errors.email && <div className="error-msg" style={{ marginTop: 4 }}>{errors.email}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Ville <span>*</span>
                  </label>
                  <select
                    className="form-input"
                    required
                    value={form.city}
                    onChange={(e) => set("city", e.target.value)}
                  >
                    {CITIES.filter((c) => c !== "Toutes les villes").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.city && <div className="error-msg" style={{ marginTop: 4 }}>{errors.city}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Adresse boutique <span>*</span>
                  </label>
                  <input
                    className="form-input"
                    required
                    value={form.address}
                    onChange={(e) => set("address", e.target.value)}
                    placeholder="Quartier, rue…"
                  />
                  {errors.address && <div className="error-msg" style={{ marginTop: 4 }}>{errors.address}</div>}
                </div>

                <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                  <label className="form-label">
                    Volume d&apos;expédition / mois <span>*</span>
                  </label>
                  <select
                    className="form-input"
                    required
                    value={form.monthly_volume}
                    onChange={(e) => set("monthly_volume", e.target.value)}
                  >
                    <option value="">— Sélectionner —</option>
                    {VOLUME_OPTIONS.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  {errors.monthly_volume && (
                    <div className="error-msg" style={{ marginTop: 4 }}>{errors.monthly_volume}</div>
                  )}
                </div>

                <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                  <label className="form-label">
                    Mode de livraison souhaité <span>*</span>
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {[
                      { id: "assigned", title: "🧑‍✈️ Livreur assigné", desc: "Un livreur dédié à votre boutique" },
                      { id: "pool", title: "🔀 Pool Yorix", desc: "Livraisons via le réseau (aléatoire / dispatch)" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => set("driver_mode", opt.id)}
                        style={{
                          textAlign: "left",
                          padding: "12px 14px",
                          borderRadius: 10,
                          border: `2px solid ${form.driver_mode === opt.id ? "var(--green)" : "var(--border)"}`,
                          background: form.driver_mode === opt.id ? "var(--green-pale)" : "var(--surface)",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ fontWeight: 700, fontSize: ".82rem" }}>{opt.title}</div>
                        <div style={{ fontSize: ".68rem", color: "var(--gray)", marginTop: 4 }}>{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                  {errors.driver_mode && <div className="error-msg" style={{ marginTop: 4 }}>{errors.driver_mode}</div>}
                </div>

                <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                  <label className="form-label">Informations complémentaires (optionnel)</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    placeholder="Types de colis, horaires, zones de livraison…"
                    style={{ resize: "vertical" }}
                  />
                </div>
              </div>

              <p style={{ fontSize: ".68rem", color: "var(--gray)", margin: "12px 0" }}>
                En envoyant, vous acceptez d&apos;être recontacté par Yorix par email ou téléphone pour votre devis.
              </p>

              <button type="submit" className="form-submit" disabled={loading}>
                {loading ? "Envoi…" : "📨 Envoyer la demande de devis"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
