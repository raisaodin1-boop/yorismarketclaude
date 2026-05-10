import { useState, useRef } from "react";
import { supabase, COMMISSION_RATE } from "../lib/supabase";
import { CATS, CITIES } from "../lib/constants";
import { uploadSingleImage } from "../utils/helpers";

// ─────────────────────────────────────────────────────────────
// COMPOSANT : FORMULAIRE AJOUT PRODUIT (multi-images)
// ─────────────────────────────────────────────────────────────
export function FormulaireProduit({ user, userData, onSaved }) {
  const [form, setForm] = useState({
    name_fr: "", name_en: "", description_fr: "",
    prix: "", stock: "", categorie: "", ville: "", escrow: true,
  });
  const [images, setImages]       = useState([]);
  const [previews, setPreviews]   = useState([]);
  const [errors, setErrors]       = useState({});
  const [saving, setSaving]       = useState(false);
  const [progress, setProgress]   = useState(0);
  const [saved, setSaved]         = useState(false);
  const [saveError, setSaveError] = useState("");
  const inputRef = useRef(null);

  const handleFiles = (files) => {
    const arr = Array.from(files).slice(0, 8);
    setImages(prev => [...prev, ...arr].slice(0, 8));
    const urls = arr.map(f => URL.createObjectURL(f));
    setPreviews(prev => [...prev, ...urls].slice(0, 8));
  };

  const removeImage = (i) => {
    setImages(prev => prev.filter((_, idx) => idx !== i));
    setPreviews(prev => prev.filter((_, idx) => idx !== i));
  };

  const validate = () => {
    const e = {};
    if (!form.name_fr.trim()) e.name_fr = "Nom obligatoire";
    if (!form.prix || isNaN(Number(form.prix))) e.prix = "Prix invalide";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = async () => {
    if (!validate()) return;
    setSaving(true); setSaveError(""); setProgress(10);

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
        sponsorise:     false,
        escrow:         form.escrow,
        local:          true,
        vues:           0,
        clics:          0,
        vente_total:    0,
        note:           0,
        nombre_avis:    0,
      });

      if (error) throw error;

      setProgress(100);
      setSaved(true);
      setForm({ name_fr: "", name_en: "", description_fr: "", prix: "", stock: "", categorie: "", ville: "", escrow: true });
      setImages([]); setPreviews([]);
      setTimeout(() => { setSaved(false); setProgress(0); }, 3500);
      onSaved?.();

    } catch (err) {
      console.error("FormulaireProduit save:", err);
      setSaveError("Erreur : " + err.message);
      setProgress(0);
    }
    setSaving(false);
  };

  return (
    <div className="prod-form">
      <div className="pf-title">➕ Nouveau produit</div>

      {saved && <div className="success-msg">✅ Produit publié ! Il est visible sur la plateforme.</div>}
      {saveError && <div className="error-msg">❌ {saveError}</div>}

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Nom du produit (FR) <span>*</span></label>
          <input
            className={`form-input${errors.name_fr ? " error" : ""}`}
            placeholder="Ex: Sac tissé Bamoun"
            value={form.name_fr}
            onChange={e => setForm(f => ({ ...f, name_fr: e.target.value }))}
          />
          {errors.name_fr && <span className="form-error-text">{errors.name_fr}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Nom (EN)</label>
          <input
            className="form-input"
            placeholder="Ex: Bamoun woven bag"
            value={form.name_en}
            onChange={e => setForm(f => ({ ...f, name_en: e.target.value }))}
          />
        </div>

        <div className="form-group full">
          <label className="form-label">Description détaillée</label>
          <textarea
            className="form-textarea"
            placeholder="Matière, dimensions, utilisation, état..."
            value={form.description_fr}
            onChange={e => setForm(f => ({ ...f, description_fr: e.target.value }))}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Prix (FCFA) <span>*</span></label>
          <input
            className={`form-input${errors.prix ? " error" : ""}`}
            type="number"
            min="0"
            placeholder="Ex: 25000"
            value={form.prix}
            onChange={e => setForm(f => ({ ...f, prix: e.target.value }))}
          />
          {errors.prix && <span className="form-error-text">{errors.prix}</span>}
          {form.prix && !isNaN(Number(form.prix)) && (
            <span style={{ fontSize: ".67rem", color: "var(--gray)", marginTop: 3 }}>
              Commission Yorix ({Math.round(COMMISSION_RATE * 100)}%) :{" "}
              {Math.round(Number(form.prix) * COMMISSION_RATE).toLocaleString()} FCFA · Vous recevez :{" "}
              {Math.round(Number(form.prix) * (1 - COMMISSION_RATE)).toLocaleString()} FCFA
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Stock disponible</label>
          <input
            className="form-input"
            type="number"
            min="0"
            placeholder="Ex: 10"
            value={form.stock}
            onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Catégorie</label>
          <select
            className="form-select"
            value={form.categorie}
            onChange={e => setForm(f => ({ ...f, categorie: e.target.value }))}
          >
            <option value="">Choisir...</option>
            {CATS.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Ville</label>
          <select
            className="form-select"
            value={form.ville}
            onChange={e => setForm(f => ({ ...f, ville: e.target.value }))}
          >
            <option value="">Choisir...</option>
            {CITIES.filter(c => c !== "Toutes les villes").map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="form-group full">
          <label className="form-label">📸 Photos du produit (max 8, via Cloudinary)</label>
          <div
            className="img-upload-area"
            onClick={() => inputRef.current?.click()}
            onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add("dragover"); }}
            onDragLeave={e => e.currentTarget.classList.remove("dragover")}
            onDrop={e => {
              e.preventDefault();
              e.currentTarget.classList.remove("dragover");
              handleFiles(e.dataTransfer.files);
            }}
          >
            <div className="img-upload-icon">📸</div>
            <div className="img-upload-text">Cliquer pour choisir ou glisser-déposer</div>
            <div className="img-upload-hint">JPEG, PNG, WebP · Max 8 images · La 1ère sera la photo principale</div>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={e => handleFiles(e.target.files)}
          />

          {previews.length > 0 && (
            <div className="img-previews">
              {previews.map((url, i) => (
                <div key={i} className="img-preview-item">
                  <img
                    src={url}
                    alt={`preview ${i}`}
                    onError={e => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://via.placeholder.com/70?text=📦";
                    }}
                  />
                  <button className="img-preview-del" onClick={() => removeImage(i)}>×</button>
                  {i === 0 && (
                    <span style={{
                      position: "absolute", bottom: 2, left: 2,
                      background: "var(--green)", color: "#fff",
                      fontSize: ".5rem", fontWeight: 700,
                      padding: "1px 4px", borderRadius: 3,
                    }}>
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
            <input
              type="checkbox"
              checked={form.escrow}
              onChange={e => setForm(f => ({ ...f, escrow: e.target.checked }))}
            />
            🔐 Activer la protection Escrow (recommandé)
          </label>
        </div>
      </div>

      <button className="form-submit" onClick={save} disabled={saving}>
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
  );
}
