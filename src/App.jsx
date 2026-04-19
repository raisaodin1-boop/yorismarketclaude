// ══════════════════════════════════════════════════════════════
//  YORIX CM — VERSION PROFESSIONNELLE COMPLÈTE
//  ✅ WhatsApp Commander
//  ✅ Upload multiple Cloudinary
//  ✅ Commandes Supabase (orders)
//  ✅ Avis / Étoiles / Commentaires
//  ✅ Avis / Étoiles / Commentaires
//  ✅ Commission automatique 5%
//  ✅ Livraison avec statuts
//  ✅ Escrow simulé
//  ✅ Dashboard vendeur complet
//  ✅ Notifications temps réel
//  ✅ 4 rôles : buyer / seller / delivery / provider
// ═══════════════════════════════════════════════════════════════

import { useState, useEffect, useRef, useCallback } from "react";
import ReactDOM from 'react-dom'
import { Helmet } from 'react-helmet-async';
import {
  supabase,
  COMMISSION_RATE,
  YORIX_WA_NUMBER,
  MOMO_NUMBER,
  ORANGE_NUMBER,
  PAYMENT_WA_NUMBER,
  LIVRAISON_FEE,
  CLOUD_NAME,
  UPLOAD_PRESET,
} from "./lib/supabase";

import {
  CATS,
  CITIES,
  ROLE_LABELS,
  DELIVERY_STATUSES,
  ESCROW_STATUSES,
  PREST_DATA,
  BLOG_DATA,
  COURSES_DATA,
  REWARDS_DATA,
} from "./lib/constants";

import {
  uploadSingleImage,
  creerCommandeSupabase,
  getUserProfile,
  getUserRole,
  filtrerMsg,
  sendEmail,
  emailBienvenue,
  creerLivraisonAutomatique,
  updateLivraisonStatut,
  genererCodeSuivi,
} from "./utils/helpers";
import { makeCSS } from "./utils/styles";
import { Stars } from "./components/Stars";
import { FlashCountdown } from "./components/FlashCountdown";
import { PrestCard } from "./components/PrestCard";
import { FormulaireAvis } from "./components/FormulaireAvis";
import { ModalCommander } from "./components/ModalCommander";
import { BusinessForm } from "./components/BusinessForm";
import { PagesLegales } from "./components/PagesLegales";
import { LevelBadge } from "./components/LevelBadge";
import { PointsAnimation } from "./components/PointsAnimation";
import { ModalDemandeLivraison } from "./components/ModalDemandeLivraison";
import { AcademyDetail } from "./components/AcademyDetail";
import { AcademyContactForm } from "./components/AcademyContactForm";
import { OrderCardWithTracking } from "./components/OrderCardWithTracking";
import { DeliveryTracker } from "./components/DeliveryTracker";
import { FicheProduit } from "./components/FicheProduit";


// ─────────────────────────────────────────────────────────────
// COMPOSANT : ÉTOILES (rating)
// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// COMPOSANT : GRILLE PRODUITS
// ─────────────────────────────────────────────────────────────
function ProdGrid({ prods, user, userData, onAddToCart, onWish, wishlist, onOpenProd }) {
  const [ficheOpen, setFicheOpen] = useState(null);
  const [cmdOpen, setCmdOpen]     = useState(null);

  // ── Image sécurisée
  const getSafeImg = (p) => {
    if (p.image && p.image.startsWith("http")) return p.image;
    if (p.image_urls && p.image_urls[0] && p.image_urls[0].startsWith("http")) return p.image_urls[0];
    return null;
  };

  // ── Badges vendeur (simulés selon données produit)
  const getVendeurBadges = (p) => {
    const badges = [];
    if (p.sponsorise)                      badges.push({label:"⭐ Top Vendeur",   cls:"badge-top"});
    if (p.verifie || p.vendeur_verifie)    badges.push({label:"✅ Vérifié",        cls:"badge-verif"});
    if (p.promo)                            badges.push({label:"🔥 Promo du jour", cls:"badge-promo"});
    if (p.flash)                            badges.push({label:"⚡ Offre flash",   cls:"badge-flash"});
    if (p.vente_total > 50)                 badges.push({label:"🏆 Best seller",   cls:"badge-best"});
    return badges;
  };

  return (
    <>
      <div className="prod-grid">
        {prods.map(p => {
          const safeImg    = getSafeImg(p);
          const stockClass = p.stock > 5 ? "stock-ok" : p.stock > 0 ? "stock-low" : "stock-out";
          const vendBadges = getVendeurBadges(p);
          const prixPromo  = p.promo_pct ? Math.round(p.prix * (1 - p.promo_pct / 100)) : null;

          return (
            <div key={p.id} className={`prod-card${p.flash?" prod-card-flash":""}`}>

              {/* ── IMAGE ── */}
           <div className="prod-img-wrap" onClick={()=>setFicheOpen(p)}>
                {safeImg ? (
                  <img
                    src={safeImg}
                    alt={p.name_fr}
                    onError={e => { e.currentTarget.onerror=null; e.currentTarget.src="https://via.placeholder.com/300?text=📦"; }}
                  />
                ) : (
                  <div className="prod-img-placeholder">📦</div>
                )}
                {/* Badge haut gauche */}
                {p.flash    && <span className="pbadge-flash">⚡ Flash</span>}
                {!p.flash && p.promo && <span className="pbadge-promo">-{p.promo_pct||20}%</span>}
                {!p.flash && !p.promo && p.sponsorise && <span className="pbadge-r">⭐ Top</span>}
                {/* Badge haut droit */}
                {p.local && <span className="pbadge-y">🇨🇲</span>}
                {/* Escrow bas gauche */}
                {p.escrow && <span className="escrow-badge">🔐</span>}
                {/* Wishlist */}
                <button className="wish-btn" onClick={e => { e.stopPropagation(); onWish(p.id); }}>
                  {wishlist.has(p.id) ? "❤️" : "🤍"}
                </button>
              </div>

              {/* ── INFOS ── */}
          <div className="prod-info" onClick={()=>setFicheOpen(p)}>
            {/* Badges vendeur */} 
                {vendBadges.length > 0 && (
                  <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:4}}>
                    {vendBadges.map(b=>(
                      <span key={b.label} className={`vendor-badge ${b.cls}`}>{b.label}</span>
                    ))}
                  </div>
                )}

                <div className="prod-name">{p.name_fr}</div>
                <div className="prod-loc">📍 {p.ville || "Cameroun"} · {p.vendeur_nom || ""}</div>

                {/* Badges conversion */}
                <div className="prod-badge-row">
                  {p.stock > 0 && p.stock <= 5 && <span className="pb pb-fire">🔥 Stock limité</span>}
                  <span className="pb pb-truck">🚚 Livraison rapide</span>
                  <span className="pb pb-cash">💰 Paiement livraison</span>
                </div>

                {p.description_fr && <div className="prod-desc">{p.description_fr}</div>}

                {p.stock !== undefined && p.stock !== null && (
                  <div className={`prod-stock ${stockClass}`} style={{ fontSize:".65rem" }}>
                    {p.stock > 5 ? `✅ ${p.stock} en stock` : p.stock > 0 ? `⚠️ ${p.stock} restant(s)` : "❌ Rupture"}
                  </div>
                )}

                <div className="prod-rating">
                  <Stars value={Math.round(p.note || 0)} />
                  <span className="rcount">({p.nombre_avis || 0})</span>
                </div>

                <div className="prod-price-row">
                  <div>
                    {prixPromo ? (
                      <>
                        <span className="price">{prixPromo.toLocaleString()} <span className="price-unit">FCFA</span></span>
                        <span style={{fontSize:".65rem",color:"var(--gray)",textDecoration:"line-through",marginLeft:5}}>{p.prix?.toLocaleString()}</span>
                      </>
                    ) : (
                      <span className="price">{p.prix?.toLocaleString()} <span className="price-unit">FCFA</span></span>
                    )}
                  </div>
                  <button className="add-btn" onClick={e => { e.stopPropagation(); onAddToCart(p); }}>+</button>
                </div>
              </div>

              {/* ── BOUTON PANIER (WA retiré des cartes — centralisé dans le panier) ── */}
              <div className="prod-actions" style={{ padding:"0 11px 11px" }}>
                <button
                  className="add-btn"
                  style={{width:"100%",padding:"8px",borderRadius:8,fontSize:".78rem",fontFamily:"'Syne',sans-serif",fontWeight:700,background:"var(--green)",color:"#fff",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}
                  onClick={e => { e.stopPropagation(); onAddToCart(p); }}
                >
                  🛒 Ajouter au panier
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {ficheOpen && (
        <FicheProduit product={ficheOpen} user={user} userData={userData} onClose={() => setFicheOpen(null)} onAddToCart={onAddToCart} />
      )}
      {cmdOpen && (
        <ModalCommander product={cmdOpen} user={user} userData={userData} onClose={() => setCmdOpen(null)} />
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPOSANT : FORMULAIRE AJOUT PRODUIT (multi-images)
// ─────────────────────────────────────────────────────────────
function FormulaireProduit({ user, userData, onSaved }) {
  const [form, setForm]           = useState({ name_fr:"", name_en:"", description_fr:"", prix:"", stock:"", categorie:"", ville:"", escrow:true });
  const [images, setImages]       = useState([]);          // File[]
  const [previews, setPreviews]   = useState([]);          // string[]
  const [errors, setErrors]       = useState({});
  const [saving, setSaving]       = useState(false);
  const [progress, setProgress]   = useState(0);
  const [saved, setSaved]         = useState(false);
  const [saveError, setSaveError] = useState("");
  const inputRef = useRef(null);

  const handleFiles = (files) => {
    const arr = Array.from(files).slice(0, 8); // max 8 images
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
        // Upload en parallèle
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
        name_fr:       form.name_fr,
        name_en:       form.name_en || form.name_fr,
        description_fr: form.description_fr,
        prix:          Number(form.prix),
        stock:         Number(form.stock || 0),
        categorie:     form.categorie || "Autre",
        ville:         form.ville || "Douala",
        image:         imageUrls[0] || null,
        image_urls:    imageUrls,
        vendeur_id:    user.id,
        vendeur_nom:   userData?.nom || "",
        actif:         true,
        sponsorise:    false,
        escrow:        form.escrow,
        local:         true,
        vues:          0,
        clics:         0,
        vente_total:   0,
        note:          0,
        nombre_avis:   0,
      });

      if (error) throw error;

      setProgress(100);
      setSaved(true);
      setForm({ name_fr:"", name_en:"", description_fr:"", prix:"", stock:"", categorie:"", ville:"", escrow:true });
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

      {saved    && <div className="success-msg">✅ Produit publié ! Il est visible sur la plateforme.</div>}
      {saveError && <div className="error-msg">❌ {saveError}</div>}

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Nom du produit (FR) <span>*</span></label>
          <input className={`form-input${errors.name_fr?" error":""}`} placeholder="Ex: Sac tissé Bamoun" value={form.name_fr} onChange={e => setForm(f=>({...f,name_fr:e.target.value}))} />
          {errors.name_fr && <span className="form-error-text">{errors.name_fr}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Nom (EN)</label>
          <input className="form-input" placeholder="Ex: Bamoun woven bag" value={form.name_en} onChange={e => setForm(f=>({...f,name_en:e.target.value}))} />
        </div>
        <div className="form-group full">
          <label className="form-label">Description détaillée</label>
          <textarea className="form-textarea" placeholder="Matière, dimensions, utilisation, état..." value={form.description_fr} onChange={e => setForm(f=>({...f,description_fr:e.target.value}))} />
        </div>
        <div className="form-group">
          <label className="form-label">Prix (FCFA) <span>*</span></label>
          <input className={`form-input${errors.prix?" error":""}`} type="number" min="0" placeholder="Ex: 25000" value={form.prix} onChange={e => setForm(f=>({...f,prix:e.target.value}))} />
          {errors.prix && <span className="form-error-text">{errors.prix}</span>}
          {form.prix && !isNaN(Number(form.prix)) && (
            <span style={{ fontSize:".67rem", color:"var(--gray)", marginTop:3 }}>
              Commission Yorix ({Math.round(COMMISSION_RATE*100)}%) : {Math.round(Number(form.prix)*COMMISSION_RATE).toLocaleString()} FCFA · Vous recevez : {Math.round(Number(form.prix)*(1-COMMISSION_RATE)).toLocaleString()} FCFA
            </span>
          )}
        </div>
        <div className="form-group">
          <label className="form-label">Stock disponible</label>
          <input className="form-input" type="number" min="0" placeholder="Ex: 10" value={form.stock} onChange={e => setForm(f=>({...f,stock:e.target.value}))} />
        </div>
        <div className="form-group">
          <label className="form-label">Catégorie</label>
          <select className="form-select" value={form.categorie} onChange={e => setForm(f=>({...f,categorie:e.target.value}))}>
            <option value="">Choisir...</option>
            {CATS.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Ville</label>
          <select className="form-select" value={form.ville} onChange={e => setForm(f=>({...f,ville:e.target.value}))}>
            <option value="">Choisir...</option>
            {CITIES.filter(c => c !== "Toutes les villes").map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Upload multiple */}
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
          <input ref={inputRef} type="file" accept="image/*" multiple style={{ display:"none" }} onChange={e => handleFiles(e.target.files)} />

          {previews.length > 0 && (
            <div className="img-previews">
              {previews.map((url, i) => (
                <div key={i} className="img-preview-item">
                  <img src={url} alt={`preview ${i}`} onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src="https://via.placeholder.com/70?text=📦";}} />
                  <button className="img-preview-del" onClick={() => removeImage(i)}>×</button>
                  {i === 0 && <span style={{ position:"absolute", bottom:2, left:2, background:"var(--green)", color:"#fff", fontSize:".5rem", fontWeight:700, padding:"1px 4px", borderRadius:3 }}>PRINCIPALE</span>}
                </div>
              ))}
            </div>
          )}

          {saving && progress > 0 && (
            <div className="upload-progress">
              <div className="upload-progress-bar" style={{ width:`${progress}%` }} />
            </div>
          )}
        </div>

        <div className="form-group full">
          <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", fontSize:".82rem", fontWeight:600, color:"var(--ink)" }}>
            <input type="checkbox" checked={form.escrow} onChange={e => setForm(f=>({...f,escrow:e.target.checked}))} />
            🔐 Activer la protection Escrow (recommandé)
          </label>
        </div>
      </div>

      <button className="form-submit" onClick={save} disabled={saving}>
        {saving
          ? <><div className="spinner" style={{ width:16, height:16, borderWidth:2 }}/>Publication... ({progress}%)</>
          : "✅ Publier le produit"
        }
      </button>
    </div>
  );
}

 // ═══════════════════════════════════════════════════════════════
// ✅ SELLER DASHBOARD — YORIX CM — VERSION COMPLÈTE AMÉLIORÉE
// Remplacer tout le bloc "// ================= SELLER DASHBOARD =================" 
// jusqu'à la fonction suivante (BuyerDashboard) par ce code
// ═══════════════════════════════════════════════════════════════

function SellerDashboard({ user, userData, dashTab, setDashTab }) {

  const [mesProduits, setMesProduits]     = useState([]);
  const [mesCommandes, setMesCommandes]   = useState([]);
  const [wallet, setWallet]               = useState({ solde: 0, total_gagne: 0 });
  const [loadingData, setLoadingData]     = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);
  const [saveMsg, setSaveMsg]             = useState(null); // { type: "success"|"error", text }

  // ── Formulaire ajout produit ──
  const [form, setForm]         = useState({ name_fr:"", name_en:"", description_fr:"", prix:"", stock:"", categorie:"", ville:"", escrow:true });
  const [images, setImages]     = useState([]);
  const [previews, setPreviews] = useState([]);
  const [progress, setProgress] = useState(0);
  const [saving, setSaving]     = useState(false);
  const inputRef                = useRef(null);

  // ── Édition inline produit ──
  const [editingId, setEditingId]       = useState(null);
  const [editForm, setEditForm]         = useState({});

  // ── Confirmation suppression ──
  const [pendingDelete, setPendingDelete] = useState(null); // { id, nom }

  // ── Confirmation action commande ──
  const [pendingConfirm, setPendingConfirm] = useState(null);

  // ─────────────────────────────────────────────────────────────
  // CHARGEMENT DONNÉES
  // ─────────────────────────────────────────────────────────────
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

  useEffect(() => { loadAll(); }, [user?.id]);

  // ─────────────────────────────────────────────────────────────
  // AJOUT PRODUIT
  // ─────────────────────────────────────────────────────────────
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
    setForm({ name_fr:"", name_en:"", description_fr:"", prix:"", stock:"", categorie:"", ville:"", escrow:true });
    setImages([]); setPreviews([]); setProgress(0);
  };

  const saveNewProduct = async () => {
    if (!form.name_fr.trim() || !form.prix || isNaN(Number(form.prix))) {
      setSaveMsg({ type:"error", text:"Nom et prix sont obligatoires." });
      setTimeout(() => setSaveMsg(null), 3000);
      return;
    }
    setSaving(true); setProgress(10);
    try {
      let imageUrls = [];
      if (images.length > 0) {
        setProgress(20);
        const uploads = images.map((f, i) =>
          uploadSingleImage(f).then(url => { setProgress(20 + Math.round((i+1)/images.length*50)); return url; })
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
        vues:           0, clics:0, vente_total:0, note:0, nombre_avis:0,
      });
      if (error) throw error;
      setProgress(100);
      setSaveMsg({ type:"success", text:"✅ Produit publié ! Il est visible sur la plateforme." });
      resetForm();
      setTimeout(() => { setSaveMsg(null); setProgress(0); }, 3000);
      loadAll();
    } catch (err) {
      setSaveMsg({ type:"error", text:"Erreur : " + err.message });
    }
    setSaving(false);
  };

  // ─────────────────────────────────────────────────────────────
  // MODIFICATION PRODUIT
  // ─────────────────────────────────────────────────────────────
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
    if (error) { console.error(error); alert("Erreur modification : " + error.message); setLoadingAction(false); return; }
    setMesProduits(prev => prev.map(p => p.id === id ? { ...p, ...editForm, prix: Number(editForm.prix), stock: Number(editForm.stock || 0) } : p));
    setEditingId(null); setEditForm({});
    setLoadingAction(false);
  };

  // ─────────────────────────────────────────────────────────────
  // ACTIVER / DÉSACTIVER PRODUIT
  // ─────────────────────────────────────────────────────────────
  const toggleActif = async (id, current) => {
    setLoadingAction(true);
    const { error } = await supabase.from("products").update({ actif: !current }).eq("id", id);
    if (error) { console.error(error); alert("Erreur : " + error.message); setLoadingAction(false); return; }
    setMesProduits(prev => prev.map(p => p.id === id ? { ...p, actif: !current } : p));
    setLoadingAction(false);
  };

  // ─────────────────────────────────────────────────────────────
  // SUPPRESSION PRODUIT
  // ─────────────────────────────────────────────────────────────
  const deleteProduct = async (id) => {
    setLoadingAction(true);
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) { console.error(error); alert("Erreur suppression : " + error.message); setLoadingAction(false); return; }
    setMesProduits(prev => prev.filter(p => p.id !== id));
    setPendingDelete(null);
    setLoadingAction(false);
  };

  // ─────────────────────────────────────────────────────────────
  // COMMANDES
  // ─────────────────────────────────────────────────────────────
  const updateOrderStatus = async (orderId, field, value) => {
    const { error } = await supabase.from("orders").update({ [field]: value }).eq("id", orderId);
    if (error) { console.error(error); alert("Erreur : " + error.message); setPendingConfirm(null); return; }
    setMesCommandes(prev => prev.map(c => c.id === orderId ? { ...c, [field]: value } : c));
    setPendingConfirm(null);
  };

  // ─────────────────────────────────────────────────────────────
  // UTILS
  // ─────────────────────────────────────────────────────────────
  const revenusTotal     = mesCommandes.reduce((t, c) => c.status === "delivered" ? t + (Number(c.montant_vendeur) || 0) : t, 0);
  const commandesActives = mesCommandes.filter(c => ["pending","paid","shipped"].includes(c.status)).length;

  const STATUS_LABELS = { pending:"En attente", paid:"Payée", shipped:"Expédiée", delivered:"Livrée", cancelled:"Annulée" };
  const STATUS_COLORS = { pending:"#888", paid:"#2563eb", shipped:"#d97706", delivered:"#16a34a", cancelled:"#dc2626" };

  const CATS  = ["Téléphones & HighTech","Mode & Accesoires","Alimentation","Maison & Decoration","Agricole","Beauté & Soins","BTP","Automobile","Éducation","Services","Autre"];
  const VILLES = ["Yaoundé","Douala","Bafoussam","Bamenda","Garoua","Maroua","Ngaoundéré","Bertoua","Ebolowa","Kribi"];

  // ─────────────────────────────────────────────────────────────
  // STYLES INLINE PARTAGÉS
  // ─────────────────────────────────────────────────────────────
  const S = {
    card:    { background:"var(--surface)", border:"1px solid var(--border)", borderRadius:14, padding:20, marginBottom:14 },
    input:   { border:"1.5px solid var(--border)", borderRadius:8, padding:"8px 11px", fontFamily:"'DM Sans',sans-serif", fontSize:".82rem", background:"var(--surface)", color:"var(--ink)", outline:"none", width:"100%" },
    label:   { fontSize:".72rem", fontWeight:600, color:"var(--ink)", marginBottom:4, display:"block" },
    btnGreen:{ background:"var(--green)", color:"#fff", border:"none", borderRadius:8, padding:"8px 16px", cursor:"pointer", fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".78rem" },
    btnGhost:{ background:"var(--surface2)", color:"var(--ink)", border:"1.5px solid var(--border)", borderRadius:8, padding:"8px 14px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:".78rem" },
    btnRed:  { background:"transparent", color:"#ce1126", border:"1.5px solid #fecaca", borderRadius:8, padding:"6px 12px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:".75rem" },
    btnBlue: { background:"#2563eb", color:"#fff", border:"none", borderRadius:8, padding:"6px 14px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:".75rem" },
    row:     { display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 },
    secTitle:{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1rem", color:"var(--ink)", marginBottom:14 },
  };

  if (loadingData) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:60, gap:12, color:"var(--green)" }}>
      <div className="spinner" style={{ width:30, height:30, borderWidth:3 }}/> Chargement...
    </div>
  );

  return (
    <>
      {/* ── MODAL CONFIRMATION SUPPRESSION ── */}
      {pendingDelete && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ background:"var(--surface)", borderRadius:14, padding:28, maxWidth:340, width:"90%", textAlign:"center", border:"1px solid var(--border)" }}>
            <div style={{ fontSize:"2rem", marginBottom:10 }}>🗑️</div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1rem", color:"var(--ink)", marginBottom:8 }}>Supprimer ce produit ?</div>
            <p style={{ fontSize:".82rem", color:"var(--gray)", marginBottom:20, lineHeight:1.6 }}>
              "<strong>{pendingDelete.nom}</strong>" sera définitivement supprimé de la plateforme.
            </p>
            <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
              <button style={S.btnGhost} onClick={() => setPendingDelete(null)}>Annuler</button>
              <button
                disabled={loadingAction}
                style={{ ...S.btnRed, background:"#ce1126", color:"#fff", border:"none", padding:"8px 20px" }}
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
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ background:"var(--surface)", borderRadius:14, padding:24, maxWidth:320, width:"90%", textAlign:"center", border:"1px solid var(--border)" }}>
            <p style={{ marginBottom:18, fontSize:".85rem", lineHeight:1.6 }}>{pendingConfirm.label}</p>
            <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
              <button style={S.btnGhost} onClick={() => setPendingConfirm(null)}>Annuler</button>
              <button
                style={S.btnGreen}
                onClick={() => updateOrderStatus(pendingConfirm.id, pendingConfirm.field, pendingConfirm.value)}
              >
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

          {/* Stats */}
          <div className="dash-stats">
            {[
              { icon:"📦", val:mesProduits.length,                                        lbl:"Produits publiés" },
              { icon:"🛒", val:commandesActives,                                           lbl:"Commandes actives" },
              { icon:"✅", val:mesCommandes.filter(c=>c.status==="delivered").length,      lbl:"Livrées" },
              { icon:"💰", val:`${revenusTotal.toLocaleString("fr-FR")} FCFA`,             lbl:"Revenus nets" },
            ].map(s => (
              <div key={s.lbl} className="dstat">
                <div className="dstat-icon">{s.icon}</div>
                <div className="dstat-val">{s.val}</div>
                <div className="dstat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>

          {/* Aperçu produits */}
          <div style={S.card}>
            <div style={S.row}>
              <div style={S.secTitle}>📦 Mes derniers produits</div>
              <button style={S.btnGhost} onClick={() => setDashTab("mesProduits")}>Voir tout →</button>
            </div>
            {mesProduits.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <p>Aucun produit publié</p>
                <button style={{ ...S.btnGreen, marginTop:12 }} onClick={() => setDashTab("ajouterProduit")}>+ Ajouter mon premier produit</button>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {mesProduits.slice(0, 4).map(p => (
                  <div key={p.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 12px", background:"var(--surface2)", borderRadius:10, border:"1px solid var(--border)" }}>
                    {p.image ? (
                      <img src={p.image} alt="" style={{ width:46, height:46, borderRadius:8, objectFit:"cover", flexShrink:0 }} onError={e => e.currentTarget.style.display="none"}/>
                    ) : (
                      <div style={{ width:46, height:46, borderRadius:8, background:"var(--border)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.4rem", flexShrink:0 }}>📦</div>
                    )}
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontWeight:700, fontSize:".83rem", color:"var(--ink)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.name_fr}</div>
                      <div style={{ fontSize:".7rem", color:"var(--gray)", marginTop:2 }}>{p.categorie} · {p.ville}</div>
                    </div>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:".88rem", color:"var(--green)", flexShrink:0 }}>{p.prix?.toLocaleString()} F</div>
                    <span style={{ fontSize:".65rem", padding:"2px 8px", borderRadius:20, background: p.actif ? "var(--green-pale)" : "var(--surface2)", color: p.actif ? "var(--green)" : "var(--gray)", border:`1px solid ${p.actif ? "var(--green-light)" : "var(--border)"}`, flexShrink:0 }}>
                      {p.actif ? "Actif" : "Inactif"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Aperçu commandes */}
          <div style={S.card}>
            <div style={S.row}>
              <div style={S.secTitle}>🛒 Commandes récentes</div>
              <button style={S.btnGhost} onClick={() => setDashTab("commandes")}>Voir tout →</button>
            </div>
            {mesCommandes.length === 0 ? (
              <div className="empty-state"><div className="empty-icon">🛒</div><p>Aucune commande</p></div>
            ) : (
              mesCommandes.slice(0, 3).map(c => (
                <div key={c.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:"1px solid var(--border)" }}>
                  <div>
                    <div style={{ fontWeight:600, fontSize:".82rem" }}>{c.client_nom || "Client"}</div>
                    <div style={{ fontSize:".7rem", color:"var(--gray)", marginTop:2 }}>{(c.montant_vendeur||0).toLocaleString()} FCFA</div>
                  </div>
                  <span style={{ fontSize:".68rem", padding:"2px 10px", borderRadius:20, background:(STATUS_COLORS[c.status]||"#888")+"22", color:STATUS_COLORS[c.status]||"#888", fontWeight:600 }}>
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
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <div className="dash-page-title" style={{ marginBottom:0 }}>📦 Mes produits ({mesProduits.length})</div>
            <button style={S.btnGreen} onClick={() => setDashTab("ajouterProduit")}>+ Ajouter</button>
          </div>

          {mesProduits.length === 0 ? (
            <div style={S.card}>
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <p>Aucun produit publié</p>
                <button style={{ ...S.btnGreen, marginTop:12 }} onClick={() => setDashTab("ajouterProduit")}>+ Ajouter mon premier produit</button>
              </div>
            </div>
          ) : (
            mesProduits.map(p => (
              <div key={p.id} style={{ ...S.card, opacity: p.actif ? 1 : 0.65, transition:"opacity .2s" }}>

                {editingId === p.id ? (
                  /* ── MODE ÉDITION ── */
                  <>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:".9rem", color:"var(--green)", marginBottom:14 }}>✏️ Modifier le produit</div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                      <div>
                        <label style={S.label}>Nom (FR) *</label>
                        <input style={S.input} value={editForm.name_fr} onChange={e => setEditForm(f => ({...f, name_fr:e.target.value}))}/>
                      </div>
                      <div>
                        <label style={S.label}>Prix (FCFA) *</label>
                        <input style={S.input} type="number" value={editForm.prix} onChange={e => setEditForm(f => ({...f, prix:e.target.value}))}/>
                      </div>
                      <div>
                        <label style={S.label}>Stock</label>
                        <input style={S.input} type="number" value={editForm.stock} onChange={e => setEditForm(f => ({...f, stock:e.target.value}))}/>
                      </div>
                      <div>
                        <label style={S.label}>Catégorie</label>
                        <select style={S.input} value={editForm.categorie} onChange={e => setEditForm(f => ({...f, categorie:e.target.value}))}>
                          <option value="">Choisir...</option>
                          {CATS.map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={S.label}>Ville</label>
                        <select style={S.input} value={editForm.ville} onChange={e => setEditForm(f => ({...f, ville:e.target.value}))}>
                          <option value="">Choisir...</option>
                          {VILLES.map(v => <option key={v}>{v}</option>)}
                        </select>
                      </div>
                      <div style={{ gridColumn:"1/-1" }}>
                        <label style={S.label}>Description</label>
                        <textarea style={{ ...S.input, minHeight:65, resize:"vertical" }} value={editForm.description_fr} onChange={e => setEditForm(f => ({...f, description_fr:e.target.value}))}/>
                      </div>
                    </div>
                    <div style={{ display:"flex", gap:8 }}>
                      <button style={S.btnGreen} disabled={loadingAction} onClick={() => saveEdit(p.id)}>
                        {loadingAction ? "Sauvegarde..." : "✅ Sauvegarder"}
                      </button>
                      <button style={S.btnGhost} onClick={cancelEdit}>Annuler</button>
                    </div>
                  </>
                ) : (
                  /* ── MODE LECTURE ── */
                  <>
                    <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                      {p.image ? (
                        <img src={p.image} alt="" style={{ width:64, height:64, borderRadius:10, objectFit:"cover", flexShrink:0 }} onError={e => e.currentTarget.style.display="none"}/>
                      ) : (
                        <div style={{ width:64, height:64, borderRadius:10, background:"var(--surface2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.8rem", flexShrink:0 }}>📦</div>
                      )}
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:4 }}>
                          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:".92rem", color:"var(--ink)" }}>{p.name_fr}</div>
                          <span style={{ fontSize:".62rem", padding:"2px 8px", borderRadius:20, background: p.actif ? "var(--green-pale)" : "var(--surface2)", color: p.actif ? "var(--green)" : "var(--gray)", border:`1px solid ${p.actif ? "var(--green-light)" : "var(--border)"}` }}>
                            {p.actif ? "✅ Actif" : "⛔ Inactif"}
                          </span>
                        </div>
                        <div style={{ display:"flex", gap:12, flexWrap:"wrap", fontSize:".75rem", color:"var(--gray)", marginBottom:6 }}>
                          <span>💰 <strong style={{ color:"var(--green)" }}>{p.prix?.toLocaleString()} FCFA</strong></span>
                          <span>📦 Stock : <strong style={{ color: !p.stock || p.stock===0 ? "#ce1126" : p.stock<=5 ? "#d97706" : "var(--ink)" }}>{p.stock ?? 0}</strong></span>
                          {p.categorie && <span>🏷️ {p.categorie}</span>}
                          {p.ville     && <span>📍 {p.ville}</span>}
                        </div>
                        {p.description_fr && (
                          <div style={{ fontSize:".72rem", color:"var(--gray)", lineHeight:1.5, overflow:"hidden", textOverflow:"ellipsis", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>
                            {p.description_fr}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display:"flex", gap:8, marginTop:12, flexWrap:"wrap" }}>
                      <button style={S.btnGreen} onClick={() => startEdit(p)}>✏️ Modifier</button>
                      <button style={S.btnGhost} disabled={loadingAction} onClick={() => toggleActif(p.id, p.actif)}>
                        {p.actif ? "⛔ Désactiver" : "✅ Activer"}
                      </button>
                      <button style={S.btnRed} onClick={() => setPendingDelete({ id:p.id, nom:p.name_fr })}>
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
            <div className={saveMsg.type === "success" ? "success-msg" : "error-msg"} style={{ marginBottom:14 }}>
              {saveMsg.text}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nom du produit (FR) <span>*</span></label>
              <input className="form-input" placeholder="Ex: Sac tissé Bamoun" value={form.name_fr} onChange={e => setForm(f=>({...f,name_fr:e.target.value}))}/>
            </div>
            <div className="form-group">
              <label className="form-label">Nom (EN)</label>
              <input className="form-input" placeholder="Ex: Bamoun woven bag" value={form.name_en} onChange={e => setForm(f=>({...f,name_en:e.target.value}))}/>
            </div>
            <div className="form-group full">
              <label className="form-label">Description détaillée</label>
              <textarea className="form-textarea" placeholder="Matière, dimensions, utilisation..." value={form.description_fr} onChange={e => setForm(f=>({...f,description_fr:e.target.value}))}/>
            </div>
            <div className="form-group">
              <label className="form-label">Prix (FCFA) <span>*</span></label>
              <input className="form-input" type="number" min="0" placeholder="Ex: 25000" value={form.prix} onChange={e => setForm(f=>({...f,prix:e.target.value}))}/>
              {form.prix && !isNaN(Number(form.prix)) && (
                <span style={{ fontSize:".67rem", color:"var(--gray)", marginTop:3 }}>
                  Commission Yorix (5%) : {Math.round(Number(form.prix)*0.05).toLocaleString()} FCFA · Vous recevez : <strong style={{color:"var(--green)"}}>{Math.round(Number(form.prix)*0.95).toLocaleString()} FCFA</strong>
                </span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Stock disponible</label>
              <input className="form-input" type="number" min="0" placeholder="Ex: 10" value={form.stock} onChange={e => setForm(f=>({...f,stock:e.target.value}))}/>
            </div>
            <div className="form-group">
              <label className="form-label">Catégorie</label>
              <select className="form-select" value={form.categorie} onChange={e => setForm(f=>({...f,categorie:e.target.value}))}>
                <option value="">Choisir...</option>
                {CATS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Ville</label>
              <select className="form-select" value={form.ville} onChange={e => setForm(f=>({...f,ville:e.target.value}))}>
                <option value="">Choisir...</option>
                {VILLES.map(v => <option key={v}>{v}</option>)}
              </select>
            </div>

            {/* Upload images */}
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
              <input ref={inputRef} type="file" accept="image/*" multiple style={{ display:"none" }} onChange={e => handleFiles(e.target.files)}/>

              {previews.length > 0 && (
                <div className="img-previews">
                  {previews.map((url, i) => (
                    <div key={i} className="img-preview-item">
                      <img src={url} alt={`preview ${i}`} onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src="https://via.placeholder.com/70?text=📦";}}/>
                      <button className="img-preview-del" onClick={() => removePreview(i)}>×</button>
                      {i === 0 && <span style={{ position:"absolute", bottom:2, left:2, background:"var(--green)", color:"#fff", fontSize:".5rem", fontWeight:700, padding:"1px 4px", borderRadius:3 }}>PRINCIPALE</span>}
                    </div>
                  ))}
                </div>
              )}

              {saving && progress > 0 && (
                <div className="upload-progress">
                  <div className="upload-progress-bar" style={{ width:`${progress}%` }}/>
                </div>
              )}
            </div>

            <div className="form-group full">
              <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", fontSize:".82rem", fontWeight:600, color:"var(--ink)" }}>
                <input type="checkbox" checked={form.escrow} onChange={e => setForm(f=>({...f,escrow:e.target.checked}))}/>
                🔐 Activer la protection Escrow (recommandé)
              </label>
            </div>
          </div>

          <button className="form-submit" onClick={saveNewProduct} disabled={saving}>
            {saving
              ? <><div className="spinner" style={{ width:16, height:16, borderWidth:2 }}/>Publication... ({progress}%)</>
              : "✅ Publier le produit"
            }
          </button>
        </div>
      )}

      {/* ════ COMMANDES ════ */}
      {dashTab === "commandes" && (
        <>
          <div className="dash-page-title">🛒 Mes commandes ({mesCommandes.length})</div>

          {/* Résumé statuts */}
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:14 }}>
            {[
              { label:"⏳ En attente", filter:"pending",   color:"#d97706" },
              { label:"💳 Payées",     filter:"paid",      color:"#2563eb" },
              { label:"🚚 Expédiées",  filter:"shipped",   color:"#7c3aed" },
              { label:"✅ Livrées",    filter:"delivered", color:"#16a34a" },
            ].map(s => (
              <div key={s.label} style={{ background:s.color+"18", border:`1px solid ${s.color}33`, borderRadius:8, padding:"6px 12px", fontSize:".72rem", fontWeight:700, color:s.color }}>
                {s.label} : {mesCommandes.filter(c=>c.status===s.filter).length}
              </div>
            ))}
          </div>

          {mesCommandes.length === 0 ? (
            <div style={S.card}>
              <div className="empty-state"><div className="empty-icon">🛒</div><p>Aucune commande pour l'instant</p></div>
            </div>
          ) : (
            mesCommandes.map(c => (
              <div key={c.id} style={{ ...S.card, marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                  <div>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".88rem", color:"var(--ink)" }}>{c.client_nom || "Client"}</div>
                    <div style={{ fontSize:".7rem", color:"var(--gray)", marginTop:2 }}>
                      📞 {c.telephone || "—"} · #{String(c.id).slice(-8)}
                    </div>
                  </div>
                  <span style={{ fontSize:".68rem", padding:"3px 10px", borderRadius:20, background:(STATUS_COLORS[c.status]||"#888")+"22", color:STATUS_COLORS[c.status]||"#888", fontWeight:700 }}>
                    {STATUS_LABELS[c.status] || c.status}
                  </span>
                </div>

                <div style={{ display:"flex", gap:12, fontSize:".75rem", color:"var(--gray)", marginBottom:10, flexWrap:"wrap" }}>
                  <span>💰 <strong style={{ color:"var(--green)" }}>{(c.montant_vendeur||0).toLocaleString()} FCFA</strong> nets</span>
                  <span>📅 {c.created_at ? new Date(c.created_at).toLocaleDateString("fr-FR") : "—"}</span>
                </div>

                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {c.status === "pending" && (
                    <button style={S.btnBlue} onClick={() => setPendingConfirm({ id:c.id, field:"status", value:"paid", label:"Marquer cette commande comme payée ?" })}>
                      💳 Marquer payée
                    </button>
                  )}
                  {c.status === "paid" && (
                    <button style={S.btnGreen} onClick={() => setPendingConfirm({ id:c.id, field:"status", value:"shipped", label:"Marquer cette commande comme expédiée ?" })}>
                      🚚 Marquer expédiée
                    </button>
                  )}
                  {c.status === "shipped" && (
                    <button style={S.btnGreen} onClick={() => setPendingConfirm({ id:c.id, field:"status", value:"delivered", label:"Marquer cette commande comme livrée ?" })}>
                      ✅ Marquer livrée
                    </button>
                  )}
                  {c.telephone && (
                    <button
                      style={{ background:"#25D366", color:"#fff", border:"none", borderRadius:8, padding:"7px 14px", cursor:"pointer", fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".75rem" }}
                      onClick={() => window.open(`https://wa.me/${c.telephone.replace(/[^0-9]/g,"").replace(/^0/,"237")}?text=${encodeURIComponent(`Bonjour ${c.client_nom||""}! Votre commande Yorix est en cours. 📦`)}`, "_blank")}
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
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
            <div style={{ padding:20, background:"var(--green-pale)", border:"1px solid var(--green-light)", borderRadius:12 }}>
              <div style={{ fontSize:".72rem", color:"var(--gray)", fontWeight:600, marginBottom:6 }}>SOLDE DISPONIBLE</div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.8rem", fontWeight:800, color:"var(--green)" }}>
                {Number(wallet.solde).toLocaleString("fr-FR")} <span style={{ fontSize:".8rem", fontWeight:400, color:"var(--gray)" }}>FCFA</span>
              </div>
            </div>
            <div style={{ padding:20, background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:12 }}>
              <div style={{ fontSize:".72rem", color:"var(--gray)", fontWeight:600, marginBottom:6 }}>TOTAL GAGNÉ</div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.8rem", fontWeight:800, color:"#2563eb" }}>
                {Number(wallet.total_gagne).toLocaleString("fr-FR")} <span style={{ fontSize:".8rem", fontWeight:400, color:"var(--gray)" }}>FCFA</span>
              </div>
            </div>
          </div>
          <div style={S.card}>
            <div style={S.secTitle}>💸 Retrait</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
              <button style={{ ...S.btnGhost, padding:14, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                <span style={{ fontSize:"1.4rem" }}>📱</span>
                <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".82rem" }}>MTN MoMo</span>
                <span style={{ fontSize:".7rem", color:"var(--gray)" }}>676 935 195</span>
              </button>
              <button style={{ ...S.btnGhost, padding:14, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                <span style={{ fontSize:"1.4rem" }}>🔶</span>
                <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".82rem" }}>Orange Money</span>
                <span style={{ fontSize:".7rem", color:"var(--gray)" }}>696 565 654</span>
              </button>
            </div>
            <div style={{ background:"var(--surface2)", borderRadius:8, padding:"10px 14px", fontSize:".75rem", color:"var(--gray)" }}>
              ℹ️ Retrait minimum : 5 000 FCFA · Commission Yorix (5%) déduite automatiquement à la vente
            </div>
          </div>
        </>
      )}
    </>
  );
}
// ═══════════════════════════════════════════════════════════════
// FIN SELLER DASHBOARD
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// DASHBOARD BUYER
// ─────────────────────────────────────────────────────────────

function BuyerDashboard({ user, userData, wishlist, totalQty, loyaltyPts, setLoyaltyPts, dashTab, goPage }) {
  const [mesCommandes, setMesCommandes] = useState([]);

  useEffect(() => {
    supabase.from("orders").select("*").eq("client_id", user.id).order("created_at", { ascending:false }).then(({ data }) => setMesCommandes(data || []));
  }, [user.id]);

  return (
    <>
      {dashTab === "overview" && (
        <>
         <div className="dash-page-title">Bonjour {userData?.nom || user.email?.split("@")[0] || "cher client"} 🛍️</div>
          <div className="dash-stats">
            {[
              { icon:"📦", val:mesCommandes.length,  lbl:"Commandes" },
              { icon:"❤️", val:wishlist.size,         lbl:"Favoris" },
              { icon:"🛒", val:totalQty,              lbl:"Panier" },
              { icon:"🌟", val:`${loyaltyPts} pts`, lbl:"Points fidélité" },
            ].map(s => (
              <div key={s.lbl} className="dstat">
                <div className="dstat-icon">{s.icon}</div>
                <div className="dstat-val">{s.val}</div>
                <div className="dstat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".95rem", color:"var(--ink)", marginBottom:12 }}>Mes dernières commandes</div>
          {mesCommandes.length === 0
            ? <div className="empty-state"><div className="empty-icon">🛍️</div><p>Aucune commande</p><button className="form-submit" style={{width:"auto",padding:"10px 24px",marginTop:12}} onClick={() => goPage("produits")}>Voir les produits</button></div>
            : mesCommandes.slice(0, 5).map(c => (
                <div key={c.id} className="order-card">
                  <div className="oc-icon">📦</div>
                  <div className="oc-info">
                    <div className="oc-name">#{String(c.id).slice(-8)}</div>
                    <div className="oc-meta">{c.montant?.toLocaleString()} FCFA · {c.created_at ? new Date(c.created_at).toLocaleDateString("fr-FR") : ""}</div>
                  </div>
                  <div className="oc-actions">
                    <span className={`status-badge s-${c.status}`}>{c.status}</span>
                    <span className={`status-badge s-${c.livraison_status}`}>{DELIVERY_STATUSES[c.livraison_status] || c.livraison_status}</span>
                  </div>
                </div>
              ))
          }
        </>
      )}

     {dashTab === "commandes" && (
        <>
          <div className="dash-page-title">📦 Mes commandes</div>
          {mesCommandes.length === 0
            ? <div className="empty-state"><div className="empty-icon">📦</div><p>Aucune commande</p></div>
            : mesCommandes.map(c => (
                <OrderCardWithTracking key={c.id} commande={c} goPage={goPage} />
              ))
          }
        </>
      )}



                  {dashTab === "loyalty" && (
        <>
          <div className="dash-page-title">🌟 Programme fidélité</div>
          <div style={{ background:"linear-gradient(135deg,#1a3a24,var(--green))", borderRadius:14, padding:22, color:"#fff", marginBottom:18 }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, marginBottom:4 }}>Mes points</div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"2rem", fontWeight:800, color:"var(--yellow)" }}>{loyaltyPts} pts</div>
            <div style={{ fontSize:".71rem", opacity:.62, marginBottom:12 }}>Niveau Or · {1000 - loyaltyPts} pts pour Platine</div>
            <div style={{ background:"rgba(255,255,255,.2)", borderRadius:50, height:7 }}>
              <div style={{ background:"var(--yellow)", borderRadius:50, height:7, width:`${Math.min((loyaltyPts % 1000) / 10, 100)}%`, transition:"width .6s" }} />
            </div>
          </div>
          <div className="rewards-grid">
            {REWARDS_DATA.map(r => (
              <div key={r.name} className="reward-card">
                <div className="reward-icon">{r.icon}</div>
                <div className="reward-name">{r.name}</div>
                <div className="reward-pts">{r.pts} pts</div>
                <button className="reward-btn" onClick={() => setLoyaltyPts(p => Math.max(0, p - r.pts))}>Échanger</button>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD DELIVERY — Système Uber Yorix Ride
// ─────────────────────────────────────────────────────────────
function DeliveryDashboard({ user, userData, dashTab, setDashTab }) {
  const [livraisons, setLivraisons] = useState([
    { id:"YX-2847", client:"Amina T.", telephone:"655112233", adresse_collecte:"Marché Central, Douala", adresse_livraison:"Akwa, Douala", produit:"iPhone 14 128GB", montant:287500, commission_livreur:2500, status:"available", distance:"2.4 km", temps_estime:"~15 min" },
    { id:"YX-2835", client:"Bertrand K.", telephone:"677884455", adresse_collecte:"Boutique Ngoa-Ekélé, Yaoundé", adresse_livraison:"Bastos, Yaoundé", produit:"Robe Pagne Wax", montant:20500, commission_livreur:1500, status:"available", distance:"5.1 km", temps_estime:"~25 min" },
    { id:"YX-2801", client:"Célestine M.", telephone:"699001122", adresse_collecte:"Mall de Douala", adresse_livraison:"Bonanjo, Douala", produit:"Ventilateur 40cm", montant:25000, commission_livreur:1200, status:"in_progress", distance:"1.2 km", temps_estime:"~8 min" },
    { id:"YX-2799", client:"Rodrigue E.", telephone:"670223344", adresse_collecte:"Centre Ville, Bafoussam", adresse_livraison:"Quartier Mtcheu, Bafoussam", produit:"Sac à main cuir", montant:15000, commission_livreur:800, status:"delivered", distance:"3.0 km", temps_estime:"Livré" },
  ]);
  const [gainsTotal]  = useState(47500);
  const [gainsMois]   = useState(127000);

  const actionLivraison = async (id, newStatus) => {
    // Mapper les anciens statuts vers les nouveaux
    const statusMap = {
      "available":    "commande_recue",
      "in_progress":  "en_route",
      "delivered":    "livre",
      "refused":      "commande_recue",
    };
    const newStatutReal = statusMap[newStatus] || newStatus;

    try {
      // Préparer les updates avec timestamp approprié
      const updates = {
        statut:     newStatutReal,
        livreur_id: user.id,
        livreur_nom: userData?.nom || "Livreur Yorix",
        livreur_tel: userData?.telephone || "",
      };

      // Ajouter le timestamp correspondant
      const now = new Date().toISOString();
      if (newStatutReal === "preparation") updates.preparation_at = now;
      if (newStatutReal === "collecte")    updates.collecte_at    = now;
      if (newStatutReal === "en_route")    updates.en_route_at    = now;
      if (newStatutReal === "livre")       updates.livre_at       = now;

      // 1️⃣ Mettre à jour la vraie table deliveries (via order_id OU code_suivi)
      const { error } = await supabase
        .from("deliveries")
        .update(updates)
        .or(`order_id.eq.${id},code_suivi.eq.${id}`);

      if (error) console.warn("update deliveries:", error);

      // 2️⃣ Mettre à jour aussi l'UI locale (pour l'affichage immédiat)
      setLivraisons(prev => prev.map(l =>
        l.id === id ? { ...l, status: newStatus } : l
      ));

      // 3️⃣ Feedback utilisateur
      const feedbackMsgs = {
        "in_progress": "✅ Mission acceptée ! Le client est notifié.",
        "delivered":   "🎉 Livraison confirmée ! Bravo !",
        "refused":     "Mission refusée.",
      };
      if (feedbackMsgs[newStatus]) {
        // Petit toast discret au lieu d'un alert
        console.log(feedbackMsgs[newStatus]);
      }
    } catch (err) {
      console.error("actionLivraison:", err);
      setLivraisons(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    }
  };

  const dispo     = livraisons.filter(l => l.status === "available");
  const enCours   = livraisons.filter(l => l.status === "in_progress");
  const livrees   = livraisons.filter(l => l.status === "delivered");

  const LivraisonCard = ({ l, showActions = true }) => (
    <div style={{background:"var(--surface)",border:"1.5px solid var(--border)",borderRadius:12,padding:16,marginBottom:12}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:36,height:36,background:"var(--green-pale)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem"}}>📦</div>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".85rem",color:"var(--ink)"}}>#{l.id}</div>
            <div style={{fontSize:".68rem",color:"var(--gray)"}}>👤 {l.client} · 📞 {l.telephone}</div>
          </div>
        </div>
        <span className={`status-badge s-${l.status === "available" ? "pending" : l.status === "in_progress" ? "en_cours" : l.status}`}>
          {l.status==="available"?"🟡 Disponible":l.status==="in_progress"?"🚚 En cours":"✅ Livré"}
        </span>
      </div>
      {/* Trajet */}
      <div style={{background:"var(--surface2)",borderRadius:8,padding:"10px 12px",marginBottom:10,fontSize:".75rem"}}>
        <div style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:6}}>
          <span style={{color:"var(--green)",fontWeight:700,flexShrink:0}}>📍</span>
          <div><span style={{fontWeight:600,color:"var(--gray)",fontSize:".67rem"}}>COLLECTE</span><br/><span style={{color:"var(--ink)"}}>{l.adresse_collecte}</span></div>
        </div>
        <div style={{borderLeft:"2px dashed var(--border)",marginLeft:6,height:10,marginBottom:6}}/>
        <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
          <span style={{color:"var(--red)",fontWeight:700,flexShrink:0}}>🏠</span>
          <div><span style={{fontWeight:600,color:"var(--gray)",fontSize:".67rem"}}>LIVRAISON</span><br/><span style={{color:"var(--ink)"}}>{l.adresse_livraison}</span></div>
        </div>
      </div>
      {/* Infos commande */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:showActions?10:0}}>
        <span style={{background:"var(--surface2)",borderRadius:6,padding:"3px 8px",fontSize:".68rem",fontWeight:600,color:"var(--ink)"}}>📦 {l.produit}</span>
        <span style={{background:"var(--surface2)",borderRadius:6,padding:"3px 8px",fontSize:".68rem",fontWeight:600,color:"var(--ink)"}}>📏 {l.distance}</span>
        <span style={{background:"var(--surface2)",borderRadius:6,padding:"3px 8px",fontSize:".68rem",fontWeight:600,color:"var(--ink)"}}>⏱ {l.temps_estime}</span>
        <span style={{background:"var(--green-pale)",borderRadius:6,padding:"3px 8px",fontSize:".68rem",fontWeight:700,color:"var(--green)"}}>💰 Gain: {l.commission_livreur?.toLocaleString()} FCFA</span>
      </div>
      {/* Actions */}
      {showActions && l.status === "available" && (
        <div style={{display:"flex",gap:8}}>
          <button
            style={{flex:2,background:"var(--green)",color:"#fff",border:"none",padding:"9px",borderRadius:8,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem",cursor:"pointer"}}
            onClick={() => actionLivraison(l.id, "in_progress")}
          >✅ Accepter la livraison</button>
          <button
            style={{flex:1,background:"var(--surface2)",color:"var(--ink)",border:"1.5px solid var(--border)",padding:"9px",borderRadius:8,fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".78rem",cursor:"pointer"}}
            onClick={() => actionLivraison(l.id, "refused")}
          >❌ Refuser</button>
        </div>
      )}
      {showActions && l.status === "in_progress" && (
        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={{ flex: 1, background: "#1565c0", color: "#fff", border: "none", padding: "9px", borderRadius: 8, cursor: "pointer" }}
            onClick={() => {
              const url = `https://wa.me/${(l.telephone || "237696565654").replace(/\D/g,"")}?text=${encodeURIComponent(
                `Bonjour ${l.client} ! Je suis votre livreur Yorix 🏍️`
              )}`;
              window.open(url, "_blank");
            }}
          >
            📱 Contacter
          </button>
          <button
            style={{ flex: 1, background: "var(--green)", color: "#fff", border: "none", padding: "9px", borderRadius: 8, cursor: "pointer" }}
            onClick={() => actionLivraison(l.id, "delivered")}
          >
            ✅ Confirmer livraison
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="dash-page-title">Bonjour {userData?.nom} 🏍️ <span style={{fontSize:".75rem",color:"var(--gray)",fontFamily:"'DM Sans',sans-serif",fontWeight:400}}>— Yorix Ride</span></div>

      {/* Stats */}
      <div className="dash-stats">
        {[
          { icon:"🟡", val:dispo.length,           lbl:"Disponibles",      trend:"Nouvelles missions" },
          { icon:"🚚", val:enCours.length,          lbl:"En cours",         trend:"" },
          { icon:"✅", val:livrees.length,           lbl:"Livrées",          trend:"+" },
          { icon:"💰", val:`${gainsTotal.toLocaleString()} F`, lbl:"Gains disponibles", trend:`${gainsMois.toLocaleString()} F / mois` },
        ].map(s => (
          <div key={s.lbl} className="dstat">
            <div className="dstat-icon">{s.icon}</div>
            <div className="dstat-val">{s.val}</div>
            <div className="dstat-lbl">{s.lbl}</div>
            {s.trend && <div className="dstat-trend">{s.trend}</div>}
          </div>
        ))}
      </div>

      {/* Onglets dashboard livraison */}
      {dashTab === "overview" && (
        <>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".95rem",color:"var(--ink)",marginBottom:12}}>
            🟡 Missions disponibles ({dispo.length})
          </div>
          {dispo.length === 0
            ? <div className="empty-state"><div className="empty-icon">🛵</div><p>Aucune mission disponible pour l'instant</p><p style={{fontSize:".78rem",marginTop:6}}>Revenez dans quelques minutes !</p></div>
            : dispo.map(l => <LivraisonCard key={l.id} l={l}/>)
          }
          {enCours.length > 0 && (
            <>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".95rem",color:"var(--ink)",margin:"18px 0 12px"}}>🚚 En cours ({enCours.length})</div>
              {enCours.map(l => <LivraisonCard key={l.id} l={l}/>)}
            </>
          )}
        </>
      )}

      {dashTab === "disponibles" && (
        <>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".95rem",color:"var(--ink)",marginBottom:12}}>🟡 Missions disponibles</div>
          {dispo.length === 0
            ? <div className="empty-state"><div className="empty-icon">🛵</div><p>Aucune mission disponible</p></div>
            : dispo.map(l => <LivraisonCard key={l.id} l={l}/>)
          }
        </>
      )}

      {dashTab === "enCours" && (
        <>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".95rem",color:"var(--ink)",marginBottom:12}}>🚚 Livraisons en cours</div>
          {enCours.length === 0
            ? <div className="empty-state"><div className="empty-icon">🚚</div><p>Aucune livraison en cours</p></div>
            : enCours.map(l => <LivraisonCard key={l.id} l={l}/>)
          }
        </>
      )}

      {dashTab === "historique" && (
        <>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".95rem",color:"var(--ink)",marginBottom:12}}>✅ Historique ({livrees.length})</div>
          {livrees.length === 0
            ? <div className="empty-state"><div className="empty-icon">📋</div><p>Aucune livraison terminée</p></div>
            : livrees.map(l => <LivraisonCard key={l.id} l={l} showActions={false}/>)
          }
        </>
      )}

      {dashTab === "wallet" && (
        <>
          <div className="dash-page-title">💰 Mes Gains</div>
          <div className="wallet-card">
            <div className="wc-label">Gains disponibles</div>
            <div className="wc-amount">{gainsTotal.toLocaleString()} FCFA</div>
            <div className="wc-sub">Ce mois : {gainsMois.toLocaleString()} FCFA · {livrees.length} livraisons effectuées</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
            {[{label:"Aujourd'hui",val:"12 500 FCFA",ic:"📅"},{label:"Cette semaine",val:"47 500 FCFA",ic:"📆"},{label:"Ce mois",val:`${gainsMois.toLocaleString()} FCFA`,ic:"🗓️"},{label:"Total livraisons",val:livrees.length,ic:"✅"}].map(s=>(
              <div key={s.label} style={{background:"var(--surface2)",borderRadius:10,padding:"12px 14px",border:"1px solid var(--border)"}}>
                <div style={{fontSize:"1.1rem",marginBottom:4}}>{s.ic}</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".88rem",color:"var(--ink)"}}>{s.val}</div>
                <div style={{fontSize:".68rem",color:"var(--gray)"}}>{s.label}</div>
              </div>
            ))}
          </div>
          <div className="info-box"><div className="info-icon">📱</div><p>Retrait MTN MoMo et Orange Money — bientôt disponible.</p></div>
        </>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD PROVIDER
// ─────────────────────────────────────────────────────────────
function ProviderDashboard({ user, userData, dashTab, setDashTab }) {
  const [demandes, setDemandes] = useState([
    { id:1, client:"Amina T.", service:"Coiffure à domicile", date:"Demain 10h", adresse:"Akwa, Douala", budget:"5 000 FCFA", status:"pending" },
    { id:2, client:"Bertrand K.", service:"Réparation téléphone", date:"Aujourd'hui 15h", adresse:"Bastos, Yaoundé", budget:"3 500 FCFA", status:"pending" },
  ]);
  const [serviceForm, setServiceForm] = useState({ nom:"", categorie:"", description:"", prix:"", ville:"", disponible:true });
  const [serviceSaved, setServiceSaved] = useState(false);
  const [mesServices, setMesServices] = useState([]);
const [editingService, setEditingService] = useState(null);

// Charger MES services depuis Supabase
useEffect(() => {
  if (!user?.id) return;
  const loadMesServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("provider_id", user.id)
      .order("created_at", { ascending: false });
    if (!error) setMesServices(data || []);
  };
  loadMesServices();
}, [user?.id]);

// Supprimer un service
const supprimerService = async (id) => {
  if (!confirm("Supprimer ce service ?")) return;
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) { alert("Erreur : " + error.message); return; }
  const { data: refreshed } = await supabase
  .from("services")
  .select("*")
  .eq("provider_id", user.id)
  .order("created_at", { ascending: false });
if (refreshed) setMesServices(refreshed);
  setMesServices(prev => prev.filter(s => s.id !== id));
};

// Toggle disponibilité
const toggleDispo = async (id, current) => {
  const { error } = await supabase
    .from("services")
    .update({ disponible: !current })
    .eq("id", id);
  if (error) { alert("Erreur : " + error.message); return; }
  setMesServices(prev => prev.map(s => s.id === id ? {...s, disponible: !current} : s));
};

  const repondre = (id, accepte) => setDemandes(prev => prev.map(d => d.id === id ? {...d, status: accepte ? "accepted" : "refused"} : d));

  const saveService = async () => {
  if (!serviceForm.nom || !serviceForm.prix) {
    alert("Nom et prix obligatoires !");
    return;
  }
  
  const { error } = await supabase.from("services").insert({ 
    ...serviceForm, 
    prix: Number(serviceForm.prix), 
    provider_id: user.id, 
    provider_nom: userData?.nom 
  });
  
  if (error) {
    console.error("Erreur publication service:", error);
    alert("Erreur : " + error.message);
    return;
  }
  
  setServiceForm({ nom:"", categorie:"", description:"", prix:"", ville:"", disponible:true });
  setServiceSaved(true);
  setTimeout(() => setServiceSaved(false), 3000);
};

  return (
    <>
      {dashTab === "overview" && (
        <>
          <div className="dash-page-title">Bonjour {userData?.nom} 👷</div>
          <div className="dash-stats">
            {[
              { icon:"📋", val:demandes.filter(d=>d.status==="pending").length,  lbl:"Demandes" },
              { icon:"✅", val:demandes.filter(d=>d.status==="accepted").length, lbl:"Acceptées" },
              { icon:"💰", val:"85 000 F", lbl:"Ce mois", trend:"+12%" },
              { icon:"⭐", val:"4.9/5", lbl:"Ma note", trend:"" },
            ].map(s => (
              <div key={s.lbl} className="dstat">
                <div className="dstat-icon">{s.icon}</div>
                <div className="dstat-val">{s.val}</div>
                <div className="dstat-lbl">{s.lbl}</div>
                {s.trend && <div className="dstat-trend">{s.trend}</div>}
              </div>
            ))}
          </div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".95rem", color:"var(--ink)", marginBottom:12 }}>Demandes en attente</div>
          {demandes.filter(d => d.status === "pending").map(d => (
            <div key={d.id} className="order-card" style={{ flexDirection:"column", alignItems:"stretch" }}>
              <div style={{ display:"flex", gap:12 }}>
                <div className="oc-icon">🔧</div>
                <div className="oc-info">
                  <div className="oc-name">{d.client} — {d.service}</div>
                  <div className="oc-meta">📅 {d.date} · 📍 {d.adresse} · 💰 {d.budget}</div>
                </div>
                <span className="status-badge s-pending">⏳</span>
              </div>
              <div style={{ display:"flex", gap:8, marginTop:10 }}>
                <button className="btn-cmd-sm" onClick={() => repondre(d.id, true)}>✅ Accepter</button>
                <button className="btn-ghost" style={{ flex:1, fontSize:".78rem" }} onClick={() => repondre(d.id, false)}>❌ Refuser</button>
              </div>
            </div>
          ))}
        </>
      )}

      {dashTab === "ajouterService" && (
        <>
          <div className="dash-page-title">➕ Ajouter un service</div>
          {serviceSaved && <div className="success-msg">✅ Service publié !</div>}
          <div className="prod-form">
            <div className="form-row">
              <div className="form-group"><label className="form-label">Nom du service *</label><input className="form-input" placeholder="Ex: Coiffure à domicile" value={serviceForm.nom} onChange={e=>setServiceForm(f=>({...f,nom:e.target.value}))}/></div>
              <div className="form-group"><label className="form-label">Catégorie</label><select className="form-select" value={serviceForm.categorie} onChange={e=>setServiceForm(f=>({...f,categorie:e.target.value}))}><option value="">Choisir...</option>{["Beauté","Réparation","Cuisine","Transport","Nettoyage","Informatique","Photographie","Autre"].map(c=><option key={c}>{c}</option>)}</select></div>
              <div className="form-group full"><label className="form-label">Description</label><textarea className="form-textarea" placeholder="Décrivez votre service..." value={serviceForm.description} onChange={e=>setServiceForm(f=>({...f,description:e.target.value}))}/></div>
              <div className="form-group"><label className="form-label">Prix (FCFA) *</label><input className="form-input" type="number" placeholder="Ex: 5000" value={serviceForm.prix} onChange={e=>setServiceForm(f=>({...f,prix:e.target.value}))}/></div>
              <div className="form-group"><label className="form-label">Ville</label><select className="form-select" value={serviceForm.ville} onChange={e=>setServiceForm(f=>({...f,ville:e.target.value}))}><option value="">Choisir...</option>{CITIES.filter(c=>c!=="Toutes les villes").map(c=><option key={c}>{c}</option>)}</select></div>
              <div className="form-group full"><label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:".82rem",fontWeight:600,color:"var(--ink)"}}><input type="checkbox" checked={serviceForm.disponible} onChange={e=>setServiceForm(f=>({...f,disponible:e.target.checked}))}/>✅ Disponible maintenant</label></div>
            </div>
            <button className="form-submit" onClick={saveService}>✅ Publier le service</button>
          </div>
        </>
      )}
      {dashTab === "mesServices" && (
  <>
    <div className="dash-page-title">📋 Mes services ({mesServices.length})</div>
    
    {mesServices.length === 0 ? (
      <div style={{textAlign:"center", padding:40, color:"var(--gray)"}}>
        Aucun service publié.<br/>
        Clique sur "Ajouter service" pour commencer.
      </div>
    ) : (
      <div style={{display:"grid", gap:12}}>
        {mesServices.map(s => (
          <div key={s.id} className="order-card" style={{
            display:"flex", flexDirection:"column", gap:10,
            opacity: s.disponible ? 1 : 0.5
          }}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"start", gap:10, flexWrap:"wrap"}}>
              <div style={{flex:1, minWidth:200}}>
                <div style={{fontWeight:700, fontSize:"1.05rem"}}>{s.nom}</div>
                <div style={{fontSize:".82rem", color:"var(--gray)", marginTop:4}}>
                  📂 {s.categorie || "—"} · 📍 {s.ville || "—"}
                </div>
                {s.description && (
                  <div style={{fontSize:".85rem", marginTop:6, color:"var(--ink)"}}>
                    {s.description}
                  </div>
                )}
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontWeight:800, fontSize:"1.1rem", color:"var(--green)"}}>
                  {Number(s.prix).toLocaleString()} F
                </div>
                <div style={{fontSize:".7rem", color:s.disponible?"var(--green)":"var(--red)", marginTop:4}}>
                  {s.disponible ? "✅ Disponible" : "⛔ Indisponible"}
                </div>
              </div>
            </div>
            
            <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
              <button
                className="btn-ghost"
                style={{flex:1, fontSize:".82rem", padding:"8px"}}
                onClick={() => toggleDispo(s.id, s.disponible)}
              >
                {s.disponible ? "⏸️ Désactiver" : "▶️ Activer"}
              </button>
              <button
                className="btn-ghost"
                style={{flex:1, fontSize:".82rem", padding:"8px", color:"var(--red)"}}
                onClick={() => supprimerService(s.id)}
              >
                🗑️ Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </>
)}
    </>
  );
}


// ═══════════════════════════════════════════════════════════════
// APP PRINCIPALE
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// COMPOSANT : ADMIN DASHBOARD — Yorix CM
// ═══════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════
// ADMIN DASHBOARD — Yorix CM · Version complète Jumia-style
// ═══════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════
// 🌟 COMPOSANT ADMIN : Gestion achats de points (Yorix Points)
// À ajouter AVANT `function AdminDashboard` dans App.jsx
// ═══════════════════════════════════════════════════════════════

function LoyaltyAdminTab({ user, userData, showToast }) {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [filter, setFilter]       = useState("pending"); // pending, credited, cancelled, all
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [stats, setStats]         = useState({ pending: 0, credited: 0, cancelled: 0, revenue: 0 });
  const [prestatairesList, setPrestatairesList] = useState([]);
  const [prestatairesCount, setPrestatairesCount] = useState(0);
  const [selectedPrest, setSelectedPrest] = useState(null);
  const [prestFilter, setPrestFilter] = useState("pending");

  // Charger les achats
  const loadPurchases = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("loyalty_pack_purchases")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);

      if (error) throw error;

      // Enrichir avec données user
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

      // Calculer stats
      const pending = enriched.filter(p => p.status === "pending").length;
      const credited = enriched.filter(p => p.status === "credited").length;
      const cancelled = enriched.filter(p => p.status === "cancelled").length;
      const revenue = enriched
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

  // Valider un achat
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

      // Envoyer email au client (non bloquant)
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

          // Marquer email envoyé
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

  // Annuler un achat
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

  // Filtrage
  const filtered = purchases.filter(p => filter === "all" || p.status === filter);

  // Badge statut
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
      {/* ── MODAL DÉTAIL ── */}
      {selectedPurchase && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setSelectedPurchase(null)}>
          <div className="modal" style={{ maxWidth: 520 }}>
            <button className="modal-close" onClick={() => setSelectedPurchase(null)}>✕</button>
            
            <div className="modal-title">
              💎 Détail achat pack
            </div>
            <div className="modal-sub">
              #{selectedPurchase.id.slice(0, 8)} · {new Date(selectedPurchase.created_at).toLocaleString("fr-FR")}
            </div>

            <div style={{ marginTop: 18 }}>
              {statusBadge(selectedPurchase.status)}
            </div>

            {/* Infos pack */}
            <div style={{
              background: "var(--green-pale)", border: "1px solid var(--green-light)",
              borderRadius: 10, padding: 14, marginTop: 14,
            }}>
              <div style={{ fontSize: ".7rem", color: "var(--gray)", fontWeight: 700, marginBottom: 6 }}>
                📦 PACK COMMANDÉ
              </div>
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

            {/* Infos client */}
            <div style={{
              background: "var(--surface2)", borderRadius: 10, padding: 14, marginTop: 10,
            }}>
              <div style={{ fontSize: ".7rem", color: "var(--gray)", fontWeight: 700, marginBottom: 6 }}>
                👤 CLIENT
              </div>
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

            {/* Notes admin */}
            {selectedPurchase.admin_notes && (
              <div style={{
                background: "#fff9e6", borderRadius: 10, padding: 12, marginTop: 10,
                border: "1px solid #fde68a",
              }}>
                <div style={{ fontSize: ".7rem", color: "#92400e", fontWeight: 700, marginBottom: 4 }}>
                  📝 NOTE ADMIN
                </div>
                <div style={{ fontSize: ".8rem", color: "#78350f" }}>
                  {selectedPurchase.admin_notes}
                </div>
              </div>
            )}

            {selectedPurchase.validated_at && (
              <div style={{ fontSize: ".7rem", color: "var(--gray)", marginTop: 8, textAlign: "center" }}>
                Validé le {new Date(selectedPurchase.validated_at).toLocaleString("fr-FR")}
              </div>
            )}

            {/* Actions */}
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

            {/* Bouton WhatsApp */}
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

      {/* ── HEADER ── */}
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

      {/* ── STATS ── */}
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

      {/* ── FILTRES ── */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {[
          { id: "pending",   label: "⏳ En attente", count: stats.pending },
          { id: "credited",  label: "✅ Crédités",  count: stats.credited },
          { id: "cancelled", label: "❌ Annulés",   count: stats.cancelled },
          { id: "all",       label: "📋 Tous",       count: purchases.length },
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

      {/* ── TABLE ── */}
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
                    <strong style={{ fontSize: ".82rem" }}>
                      {p.nom || p.client?.nom || "—"}
                    </strong>
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

// ═══════════════════════════════════════════════════════════════
// 🎯 ADMIN DASHBOARD YORIX CM — VERSION PRO COMPLÈTE
// À REMPLACER INTÉGRALEMENT : de `function AdminDashboard({ user, userData, goPage }) {`
// jusqu'à la ligne `}` qui ferme ce composant (juste avant `// FORMULAIRE BUSINESS`)
// ═══════════════════════════════════════════════════════════════

function AdminDashboard({ user, userData, goPage }) {

  // ═══════════ ÉTATS PRINCIPAUX ═══════════
  const [adminTab, setAdminTab]       = useState("overview");
  const [loading, setLoading]         = useState(true);
  const [refreshKey, setRefreshKey]   = useState(0);
  const [toast, setToast]             = useState(null);
  const [loadError, setLoadError]     = useState(null);

  // ═══════════ DONNÉES ═══════════
  const [stats, setStats] = useState({
    users: 0, products: 0, orders: 0, deliveries: 0,
    revenue: 0, revenueToday: 0, revenueWeek: 0, commissionTotal: 0,
    vendeurs: 0, livreurs: 0, buyers: 0, providers: 0,
    ruptures: 0, enAttente: 0, livrees: 0,
  });
  const [produits, setProduits]             = useState([]);
  const [utilisateurs, setUtilisateurs]     = useState([]);
  const [commandes, setCommandes]           = useState([]);
  const [adminDeliveries, setAdminDeliveries] = useState([]);
  const [adminLivreurs, setAdminLivreurs]   = useState([]);
  const [prestatairesList, setPrestatairesList] = useState([]);
  const [chartVentes, setChartVentes]       = useState([]);
  const [chartInscrits, setChartInscrits]   = useState([]);
  const [topProduits, setTopProduits]       = useState([]);

  // ═══════════ FILTRES ═══════════
  const [searchProd, setSearchProd]             = useState("");
  const [filterProdCat, setFilterProdCat]       = useState("");
  const [filterProdStatut, setFilterProdStatut] = useState("");
  const [searchUser, setSearchUser]             = useState("");
  const [filterRole, setFilterRole]             = useState("");
  const [filterOrder, setFilterOrder]           = useState("");
  const [sortOrder, setSortOrder]               = useState("desc");
  const [adminDelivFilter, setAdminDelivFilter] = useState("all");
  const [prestFilter, setPrestFilter]           = useState("pending");

  // ═══════════ MODALS ═══════════
  const [selectedProd, setSelectedProd]         = useState(null);
  const [selectedOrder, setSelectedOrder]       = useState(null);
  const [selectedUser, setSelectedUser]         = useState(null);
  const [selectedPrest, setSelectedPrest]       = useState(null);
  const [assignModalOpen, setAssignModalOpen]   = useState(null);

  // ═══════════ SÉCURITÉ ADMIN ═══════════
  if (!user || (userData?.role !== "admin" && userData?.role !== "superadmin")) {
    return (
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"60vh",gap:16,padding:40}}>
        <div style={{fontSize:"4rem"}}>🔒</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.4rem",color:"var(--ink)"}}>Accès refusé</div>
        <p style={{color:"var(--gray)",textAlign:"center",maxWidth:400,lineHeight:1.7}}>
          Cette page est réservée aux administrateurs Yorix.<br/>
          Connectez-vous avec un compte admin pour y accéder.
        </p>
        <button className="form-submit" style={{width:"auto",padding:"10px 24px"}} onClick={()=>goPage("home")}>← Retour à l'accueil</button>
      </div>
    );
  }

  // ═══════════ TOAST ═══════════
  const showToast = (msg, type="success") => {
    setToast({msg, type});
    setTimeout(() => setToast(null), 3500);
  };

  // ═══════════ CHARGEMENT DES DONNÉES (ROBUSTE) ═══════════
  useEffect(() => { loadAll(); }, [refreshKey]);

  const loadAll = async () => {
    setLoading(true);
    setLoadError(null);
    console.log("[Admin] 🔄 Début chargement données...");

    try {
      const today = new Date(); today.setHours(0,0,0,0);
      const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate()-7);

      // Chargement PARALLÈLE de toutes les sources
      const results = await Promise.allSettled([
        supabase.from("users").select("*").order("created_at",{ascending:false}).limit(1000),
        supabase.from("profiles").select("*").order("created_at",{ascending:false}).limit(1000),
        supabase.from("products").select("*").order("created_at",{ascending:false}).limit(1000),
        supabase.from("orders").select("*").order("created_at",{ascending:false}).limit(1000),
        supabase.from("deliveries").select("*").order("commande_at",{ascending:false}).limit(500),
        supabase.from("prestataires").select("*").order("created_at",{ascending:false}).limit(500),
      ]);

      // Extraction des données avec gestion d'erreur par source
      const [usersR, profilesR, prodsR, ordersR, delivsR, prestsR] = results;

      const rawUsers    = usersR.status === "fulfilled" ? (usersR.value.data || []) : [];
      const rawProfiles = profilesR.status === "fulfilled" ? (profilesR.value.data || []) : [];
      const prodsData   = prodsR.status === "fulfilled" ? (prodsR.value.data || []) : [];
      const ordersData  = ordersR.status === "fulfilled" ? (ordersR.value.data || []) : [];
      const delivsData  = delivsR.status === "fulfilled" ? (delivsR.value.data || []) : [];
      const prestsData  = prestsR.status === "fulfilled" ? (prestsR.value.data || []) : [];

      // Logs détaillés
      console.log("[Admin] 📊 Résultats chargement:");
      console.log("  users:", rawUsers.length, usersR.status === "fulfilled" ? "✅" : "❌ " + usersR.reason?.message);
      console.log("  profiles:", rawProfiles.length, profilesR.status === "fulfilled" ? "✅" : "❌ " + profilesR.reason?.message);
      console.log("  products:", prodsData.length, prodsR.status === "fulfilled" ? "✅" : "❌ " + prodsR.reason?.message);
      console.log("  orders:", ordersData.length, ordersR.status === "fulfilled" ? "✅" : "❌ " + ordersR.reason?.message);
      console.log("  deliveries:", delivsData.length, delivsR.status === "fulfilled" ? "✅" : "❌ " + delivsR.reason?.message);
      console.log("  prestataires:", prestsData.length, prestsR.status === "fulfilled" ? "✅" : "❌ " + prestsR.reason?.message);

      // Fusionner users + profiles (dédupliqué par id/uid)
      const mergedMap = new Map();
      [...rawUsers, ...rawProfiles].forEach(u => {
        const key = u.uid || u.id;
        if (!key) return;
        const existing = mergedMap.get(key) || {};
        mergedMap.set(key, { ...existing, ...u, uid: key });
      });
      const usersData = Array.from(mergedMap.values());

      console.log("[Admin] 👥 Users fusionnés:", usersData.length);

      // Livreurs (filtrer par role=delivery)
      const livreursData = usersData.filter(u => u.role === "delivery");

      // Calculs stats globales
      const commissionTotal = ordersData.reduce((s,o) => s+(o.commission||0), 0);
      const revenueTotal    = ordersData.reduce((s,o) => s+(o.montant||0), 0);
      const revenueToday    = ordersData.filter(o => new Date(o.created_at) >= today).reduce((s,o) => s+(o.commission||0), 0);
      const revenueWeek     = ordersData.filter(o => new Date(o.created_at) >= weekAgo).reduce((s,o) => s+(o.commission||0), 0);

      // Graphique commandes 7 jours
      const chartV = Array.from({length:7}, (_,i) => {
        const d = new Date(); d.setDate(d.getDate()-6+i); d.setHours(0,0,0,0);
        const next = new Date(d); next.setDate(next.getDate()+1);
        const orders = ordersData.filter(o => { const t = new Date(o.created_at); return t >= d && t < next; });
        return {
          label: d.toLocaleDateString("fr-FR",{weekday:"short"}),
          orders: orders.length,
          revenue: orders.reduce((s,o)=>s+(o.commission||0),0),
        };
      });

      // Graphique inscriptions 7 jours
      const chartI = Array.from({length:7}, (_,i) => {
        const d = new Date(); d.setDate(d.getDate()-6+i); d.setHours(0,0,0,0);
        const next = new Date(d); next.setDate(next.getDate()+1);
        const cnt = usersData.filter(u => { const t = new Date(u.created_at); return t >= d && t < next; }).length;
        return { label: d.toLocaleDateString("fr-FR",{weekday:"short"}), val: cnt };
      });

      // Top produits
      const topP = prodsData
        .filter(p => (p.vente_total || 0) > 0)
        .sort((a,b) => (b.vente_total||0) - (a.vente_total||0))
        .slice(0,5);

      // Mettre à jour TOUS les états
      setStats({
        users: usersData.length,
        products: prodsData.length,
        orders: ordersData.length,
        deliveries: delivsData.length,
        revenue: revenueTotal,
        commissionTotal,
        revenueToday,
        revenueWeek,
        vendeurs: usersData.filter(u=>u.role==="seller").length,
        livreurs: livreursData.length,
        buyers: usersData.filter(u=>u.role==="buyer" || !u.role).length,
        providers: usersData.filter(u=>u.role==="provider").length,
        ruptures: prodsData.filter(p=>(p.stock||0)===0).length,
        enAttente: ordersData.filter(o=>o.status==="pending").length,
        livrees: ordersData.filter(o=>o.status==="livre").length,
      });
      setUtilisateurs(usersData);
      setProduits(prodsData);
      setCommandes(ordersData);
      setAdminDeliveries(delivsData);
      setAdminLivreurs(livreursData);
      setPrestatairesList(prestsData);
      setChartVentes(chartV);
      setChartInscrits(chartI);
      setTopProduits(topP);

      console.log("[Admin] ✅ Chargement terminé");

      // Avertir si aucune donnée chargée
      if (usersData.length === 0 && prodsData.length === 0 && ordersData.length === 0) {
        setLoadError("⚠️ Aucune donnée chargée. Vérifiez les politiques RLS Supabase (tables users, products, orders).");
      }

    } catch(e) {
      console.error("[Admin] ❌ Erreur critique:", e);
      setLoadError("Erreur : " + e.message);
      showToast("Erreur de chargement", "error");
    }
    setLoading(false);
  };

  // ═══════════ REALTIME DELIVERIES ═══════════
  useEffect(() => {
    const channel = supabase
      .channel("admin-deliveries-rt")
      .on("postgres_changes", { event: "*", schema: "public", table: "deliveries" }, () => {
        supabase.from("deliveries").select("*").order("commande_at",{ascending:false}).limit(500)
          .then(({data}) => { if (data) setAdminDeliveries(data); });
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  // ═══════════ ACTIONS LIVRAISONS ═══════════
  const assignerLivreur = async (delivery, livreur) => {
    try {
      const { error } = await supabase.from("deliveries").update({
        livreur_id:       livreur.id || livreur.uid,
        livreur_nom:      livreur.nom,
        livreur_tel:      livreur.telephone,
        livreur_vehicule: livreur.vehicule || "Moto",
        statut:           "preparation",
        preparation_at:   new Date().toISOString(),
      }).eq("id", delivery.id);
      if (error) throw error;

      // WhatsApp au livreur
      const msgLivreur = [
        "🚚 *NOUVELLE MISSION YORIX*",
        "",
        "📦 *Code :* " + delivery.code_suivi,
        "",
        "👤 *CLIENT*",
        "Nom : " + (delivery.client_nom || "N/A"),
        "Tél : " + (delivery.client_tel || "N/A"),
        "",
        "📍 *TRAJET*",
        "🔴 Collecte : " + (delivery.adresse_collecte || "N/A"),
        "🟢 Livraison : " + (delivery.adresse_livraison || "N/A"),
        "",
        "⏱️ Temps estimé : " + (delivery.temps_estime_min || 25) + " min",
        "📏 Distance : " + (delivery.distance_km || 3.5) + " km",
        "",
        "✅ Connecte-toi sur yorix.cm pour accepter",
        "",
        "Bon courage ! 💪",
      ].join("\n");

      const phoneClean = (livreur.telephone || "").replace(/[^0-9]/g, "");
      if (phoneClean) {
        window.open("https://wa.me/" + phoneClean + "?text=" + encodeURIComponent(msgLivreur), "_blank");
      }

      showToast("✅ Livreur " + livreur.nom + " assigné !");
      setAssignModalOpen(null);
      setRefreshKey(k => k+1);
    } catch (err) {
      showToast("Erreur : " + err.message, "error");
    }
  };

  const assignerLivreurManuel = async (delivery) => {
    const nom = window.prompt("Nom du livreur :");
    if (!nom || !nom.trim()) return;
    const tel = window.prompt("Téléphone du livreur (+237...) :");
    if (!tel || !tel.trim()) return;

    try {
      const { error } = await supabase.from("deliveries").update({
        livreur_nom:      nom.trim(),
        livreur_tel:      tel.trim(),
        livreur_vehicule: "Moto",
        statut:           "preparation",
        preparation_at:   new Date().toISOString(),
      }).eq("id", delivery.id);
      if (error) throw error;

      const phoneClean = tel.replace(/[^0-9]/g, "");
      const msg = [
        "🚚 NOUVELLE MISSION YORIX",
        "",
        "Code : " + delivery.code_suivi,
        "Client : " + delivery.client_nom + " (" + delivery.client_tel + ")",
        "Collecte : " + delivery.adresse_collecte,
        "Livraison : " + delivery.adresse_livraison,
      ].join("\n");
      window.open("https://wa.me/" + phoneClean + "?text=" + encodeURIComponent(msg), "_blank");

      showToast("✅ Livreur " + nom + " assigné manuellement !");
      setRefreshKey(k => k+1);
    } catch (err) {
      showToast("Erreur : " + err.message, "error");
    }
  };

  const changerStatutLivraison = async (delivery, newStatut) => {
    const updates = { statut: newStatut };
    const now = new Date().toISOString();
    if (newStatut === "preparation") updates.preparation_at = now;
    if (newStatut === "collecte")    updates.collecte_at    = now;
    if (newStatut === "en_route")    updates.en_route_at    = now;
    if (newStatut === "livre")       updates.livre_at       = now;

    const { error } = await supabase.from("deliveries").update(updates).eq("id", delivery.id);
    if (error) { showToast("Erreur : " + error.message, "error"); return; }
    showToast("✅ Statut mis à jour → " + newStatut);
    setRefreshKey(k => k+1);
  };

  // ═══════════ ACTIONS PRODUITS ═══════════
  const supprimerProduit = async (id, nom) => {
    if (!window.confirm(`Supprimer le produit "${nom}" ?`)) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) { showToast("Erreur : " + error.message, "error"); return; }
    setProduits(p => p.filter(x => x.id !== id));
    showToast(`Produit "${nom}" supprimé`);
  };

  const toggleActifProduit = async (id, actif) => {
    const { error } = await supabase.from("products").update({actif:!actif}).eq("id",id);
    if (error) { showToast("Erreur : "+error.message, "error"); return; }
    setProduits(p => p.map(x=>x.id===id?{...x,actif:!actif}:x));
    showToast(actif ? "Produit désactivé" : "Produit activé");
  };

  // ═══════════ ACTIONS UTILISATEURS ═══════════
  const changerRole = async (uid, newRole) => {
    const [r1, r2] = await Promise.all([
      supabase.from("users").update({role:newRole}).eq("uid",uid),
      supabase.from("profiles").update({role:newRole}).eq("id",uid),
    ]);
    if (r1.error && r2.error) { showToast("Erreur changement rôle", "error"); return; }
    setUtilisateurs(u => u.map(x=>(x.uid||x.id)===uid?{...x,role:newRole}:x));
    showToast(`Rôle changé → ${newRole}`);
  };

  const supprimerUser = async (uid, email) => {
    if (!window.confirm(`Supprimer "${email}" ?`)) return;
    const { error } = await supabase.from("users").delete().eq("uid", uid);
    if (error) { showToast("Erreur : " + error.message, "error"); return; }
    setUtilisateurs(u => u.filter(x => (x.uid || x.id) !== uid));
    showToast(`Utilisateur supprimé`);
  };

  const toggleVendeur = async (uid, actif) => {
    const { error } = await supabase.from("users").update({actif:!actif}).eq("uid",uid);
    if (error) { showToast("Erreur : "+error.message, "error"); return; }
    setUtilisateurs(u => u.map(x=>(x.uid||x.id)===uid?{...x,actif:!actif}:x));
    showToast(actif ? "Vendeur suspendu" : "Vendeur réactivé");
  };

  const verifierUser = async (uid, verifie) => {
    await supabase.from("users").update({verifie:!verifie}).eq("uid",uid).catch(()=>{});
    setUtilisateurs(u => u.map(x=>(x.uid||x.id)===uid?{...x,verifie:!verifie}:x));
    showToast(verifie ? "Vérification retirée" : "Utilisateur vérifié ✅");
  };

  // ═══════════ ACTIONS COMMANDES ═══════════
  const validerCommande = async (id) => {
    const { error } = await supabase.from("orders").update({status:"validee"}).eq("id",id);
    if (error) { showToast("Erreur : "+error.message, "error"); return; }
    setCommandes(c => c.map(x=>x.id===id?{...x,status:"validee"}:x));
    showToast("Commande validée ✅");
  };

  const marquerLivre = async (id) => {
    const { error } = await supabase.from("orders").update({status:"livre",livraison_status:"livre",escrow_status:"libere"}).eq("id",id);
    if (error) { showToast("Erreur : "+error.message, "error"); return; }
    setCommandes(c => c.map(x=>x.id===id?{...x,status:"livre",livraison_status:"livre",escrow_status:"libere"}:x));
    showToast("Commande marquée livrée 📦");
  };

  const annulerCommande = async (id) => {
    if (!window.confirm("Annuler cette commande ?")) return;
    const { error } = await supabase.from("orders").update({status:"annulee"}).eq("id",id);
    if (error) { showToast("Erreur : "+error.message, "error"); return; }
    setCommandes(c => c.map(x=>x.id===id?{...x,status:"annulee"}:x));
    showToast("Commande annulée");
  };

  // ═══════════ EXPORT CSV ═══════════
  const exportCSV = (data, filename) => {
    if (!data.length) { showToast("Aucune donnée à exporter", "error"); return; }
    const keys = Object.keys(data[0]);
    const csv = [keys.join(","), ...data.map(row => keys.map(k => `"${(row[k]||"").toString().replace(/"/g,'""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], {type:"text/csv"});
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a"); a.href=url; a.download=filename; a.click();
    showToast(`Export ${filename} téléchargé`);
  };

  // ═══════════ FILTRES CALCULÉS ═══════════
  const produitsFiltres = produits
    .filter(p => !searchProd || (p.name_fr||"").toLowerCase().includes(searchProd.toLowerCase()) || (p.vendeur_nom||"").toLowerCase().includes(searchProd.toLowerCase()))
    .filter(p => !filterProdCat || p.categorie===filterProdCat)
    .filter(p => filterProdStatut==="" ? true : filterProdStatut==="actif" ? p.actif : !p.actif);

  const usersFiltres = utilisateurs
    .filter(u => !searchUser || (u.email||"").toLowerCase().includes(searchUser.toLowerCase()) || (u.nom||"").toLowerCase().includes(searchUser.toLowerCase()))
    .filter(u => !filterRole || u.role===filterRole);

  const commandesFiltrees = [...commandes]
    .filter(o => !filterOrder || o.status===filterOrder)
    .sort((a,b) => sortOrder==="desc" ? new Date(b.created_at)-new Date(a.created_at) : new Date(a.created_at)-new Date(b.created_at));

  const sellers   = utilisateurs.filter(u => u.role==="seller");
  const livreursDispo = utilisateurs.filter(u => u.role === "delivery");

  const alertes = [
    ...produits.filter(p=>(p.stock||0)===0).map(p=>({type:"red",label:"Stock 0",msg:`📦 ${p.name_fr||"Produit"} — ${p.vendeur_nom||"?"}`})),
    ...commandes.filter(o=>o.status==="pending").map(o=>({type:"yellow",label:"Commande",msg:`⏳ ${o.client_nom||"Client"} — ${(o.montant||0).toLocaleString()} FCFA`})),
    ...adminDeliveries.filter(d=>d.statut==="commande_recue" && !d.livreur_id).map(d=>({type:"yellow",label:"Livraison",msg:`🚚 ${d.code_suivi} attend un livreur`})),
    ...utilisateurs.filter(u=>new Date()-new Date(u.created_at)<86400000).map(u=>({type:"green",label:"Nouveau",msg:`🆕 ${u.nom||u.email||"User"} — ${u.role||"buyer"}`})),
  ];

  const maxChartV   = Math.max(...chartVentes.map(d=>d.orders), 1);
  const maxChartRev = Math.max(...chartVentes.map(d=>d.revenue), 1);
  const maxChartI   = Math.max(...chartInscrits.map(d=>d.val), 1);

  const CATS_LIST = ["Téléphones & HighTech","Mode & Accesoires","Alimentation","Maison & Decoration","Agricole","Beauté & Soins","BTP","Automobile","Éducation","Services"];

  // ═══════════ NAVIGATION ═══════════
  const deliveriesEnAttente = adminDeliveries.filter(d => d.statut === "commande_recue" && !d.livreur_id).length;
  const prestPending = prestatairesList.filter(p=>p.status==="pending").length;

  const NAV = [
    {id:"overview",     icon:"📊", label:"Vue d'ensemble"},
    {id:"deliveries",   icon:"🚚", label:"Livraisons",   badge:deliveriesEnAttente||null},
    {id:"produits",     icon:"📦", label:"Produits",     badge:produits.filter(p=>(p.stock||0)===0).length||null},
    {id:"commandes",    icon:"🛍️", label:"Commandes",    badge:commandes.filter(o=>o.status==="pending").length||null},
    {id:"utilisateurs", icon:"👥", label:"Utilisateurs"},
    {id:"vendeurs",     icon:"🏪", label:"Vendeurs"},
    {id:"livreurs",     icon:"🏍️", label:"Livreurs"},
    {id:"prestataires", icon:"👷", label:"Prestataires", badge:prestPending||null},
    {id:"revenus",      icon:"💰", label:"Revenus"},
    {id:"loyalty",      icon:"🌟", label:"Yorix Points"},
    {id:"alertes",      icon:"🔔", label:"Alertes",      badge:alertes.length||null},
  ];

  // ═══════════ HELPERS UI ═══════════
  const StatCard = ({icon,val,lbl,trend,col,ic,onClick}) => (
    <div className="stat-card" style={{cursor:onClick?"pointer":"default",transition:"transform .15s,box-shadow .15s"}}
      onClick={onClick}
      onMouseOver={e=>{if(onClick){e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,.1)";}}}
      onMouseOut={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
      <div className="stat-card-icon" style={{background:col||"var(--surface2)"}}><span>{icon}</span></div>
      <div className="stat-card-val">{val}</div>
      <div className="stat-card-lbl">{lbl}</div>
      {trend && <div className="stat-card-trend" style={{color:ic||"var(--green)"}}>{trend}</div>}
    </div>
  );

  const BadgeStatut = ({statut}) => {
    const map = {
      livre:"green", validee:"blue", pending:"yellow", annulee:"red",
      libere:"green", securise:"blue", rembourse:"gray",
      en_cours:"yellow", echec:"red",
    };
    return <span className={`admin-badge admin-badge-${map[statut]||"gray"}`}>{statut||"—"}</span>;
  };

  const StatutLivraison = ({statut}) => {
    const cfg = {
      commande_recue: { label:"⏳ En attente",  color:"#f59e0b", bg:"#fef3c7" },
      preparation:    { label:"📦 Préparation", color:"#3b82f6", bg:"#dbeafe" },
      collecte:       { label:"🏪 Collecté",    color:"#8b5cf6", bg:"#ede9fe" },
      en_route:       { label:"🏍️ En route",    color:"#10b981", bg:"#d1fae5" },
      livre:          { label:"✅ Livré",       color:"#22c55e", bg:"#dcfce7" },
      annule:         { label:"❌ Annulé",      color:"#ef4444", bg:"#fee2e2" },
    }[statut] || { label:statut, color:"#64748b", bg:"#f1f5f9" };

    return (
      <span style={{
        padding:"3px 10px", borderRadius:20,
        background:cfg.bg, color:cfg.color,
        fontSize:".72rem", fontWeight:700,
        border:"1px solid " + cfg.color,
        display:"inline-block",
      }}>
        {cfg.label}
      </span>
    );
  };

  // ═══════════ LOADING ═══════════
  if (loading) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60vh",gap:14,color:"var(--green)",flexDirection:"column"}}>
      <div style={{width:46,height:46,border:"4px solid var(--border)",borderTopColor:"var(--green)",borderRadius:"50%",animation:"spin .7s linear infinite"}}/>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1rem"}}>Chargement du Yorix Admin...</div>
      <div style={{fontSize:".8rem",color:"var(--gray)"}}>Récupération des données Supabase</div>
    </div>
  );

  // ═══════════ RENDU PRINCIPAL ═══════════
  return (
    <div className="admin-layout" style={{minHeight:"calc(100vh - 130px)"}}>

      {/* ── TOAST ── */}
      {toast && (
        <div style={{
          position:"fixed",bottom:24,right:24,zIndex:9999,
          background:toast.type==="error"?"#ce1126":"var(--green)",
          color:"#fff",padding:"12px 20px",borderRadius:10,
          fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".85rem",
          boxShadow:"0 4px 20px rgba(0,0,0,.2)",
          display:"flex",alignItems:"center",gap:8,
        }}>
          {toast.type==="error"?"❌":"✅"} {toast.msg}
        </div>
      )}

      {/* ── MODAL ASSIGNATION LIVREUR ── */}
      {assignModalOpen && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setAssignModalOpen(null)}>
          <div className="modal" style={{maxWidth:600}}>
            <button className="modal-close" onClick={()=>setAssignModalOpen(null)}>✕</button>

            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.3rem",fontWeight:800,color:"var(--ink)",marginBottom:4}}>
              🏍️ Assigner un livreur
            </h2>
            <p style={{fontSize:".82rem",color:"var(--gray)",marginBottom:16}}>
              Livraison <strong style={{color:"var(--green)"}}>{assignModalOpen.code_suivi}</strong> · {assignModalOpen.client_nom}
            </p>

            <div style={{background:"var(--surface2)",borderRadius:10,padding:12,marginBottom:14,fontSize:".78rem",lineHeight:1.7}}>
              <div>🔴 <strong>Collecte :</strong> {assignModalOpen.adresse_collecte}</div>
              <div>🟢 <strong>Livraison :</strong> {assignModalOpen.adresse_livraison}</div>
              <div>📞 <strong>Client :</strong> {assignModalOpen.client_tel}</div>
            </div>

            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".92rem",color:"var(--green)",marginBottom:10}}>
              Livreurs disponibles ({adminLivreurs.length})
            </div>

            {adminLivreurs.length === 0 ? (
              <div style={{textAlign:"center",padding:30,background:"var(--surface2)",borderRadius:10,color:"var(--gray)"}}>
                <div style={{fontSize:"2.5rem",marginBottom:6}}>😕</div>
                <p style={{fontSize:".85rem",marginBottom:10}}>Aucun livreur inscrit.</p>
                <button
                  onClick={() => { setAssignModalOpen(null); assignerLivreurManuel(assignModalOpen); }}
                  style={{
                    background:"var(--green)",color:"#fff",border:"none",
                    padding:"10px 18px",borderRadius:8,cursor:"pointer",
                    fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem",
                  }}
                >
                  ➕ Assigner manuellement
                </button>
              </div>
            ) : (
              <div style={{display:"grid",gap:8,maxHeight:360,overflowY:"auto"}}>
                {adminLivreurs.map(liv => (
                  <div key={liv.uid||liv.id} style={{
                    display:"flex",alignItems:"center",gap:12,
                    background:"var(--surface)",border:"1.5px solid var(--border)",
                    borderRadius:10,padding:10,
                  }}>
                    <div style={{
                      width:44,height:44,borderRadius:"50%",
                      background:"var(--green-pale)",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:"1.3rem",
                    }}>🏍️</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".88rem"}}>
                        {liv.nom || "Livreur"}
                        {liv.verifie && <span style={{marginLeft:6,color:"var(--green)"}}>✓</span>}
                      </div>
                      <div style={{fontSize:".7rem",color:"var(--gray)"}}>
                        {liv.telephone || "N/A"}
                        {liv.note ? " · ⭐ " + liv.note : ""}
                      </div>
                    </div>
                    <button
                      onClick={() => assignerLivreur(assignModalOpen, liv)}
                      style={{
                        background:"var(--green)",color:"#fff",border:"none",
                        padding:"8px 14px",borderRadius:8,cursor:"pointer",
                        fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".75rem",
                      }}
                    >
                      Assigner
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div style={{marginTop:14,paddingTop:14,borderTop:"1px solid var(--border)"}}>
              <button
                onClick={() => { setAssignModalOpen(null); assignerLivreurManuel(assignModalOpen); }}
                style={{
                  width:"100%",background:"var(--surface2)",color:"var(--ink)",
                  border:"1.5px solid var(--border)",
                  padding:"10px",borderRadius:8,cursor:"pointer",
                  fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".82rem",
                }}
              >
                ➕ Assigner un livreur externe (saisie manuelle)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SIDEBAR ── */}
      <div className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
            <div style={{width:32,height:32,background:"var(--green)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem"}}>⚙️</div>
            <div>
              <div className="admin-sidebar-logo-txt">Yorix Admin</div>
              <div className="admin-sidebar-logo-sub">Panneau de contrôle</div>
            </div>
          </div>
          <div style={{fontSize:".67rem",color:"rgba(255,255,255,.4)",marginTop:6,padding:"6px 8px",background:"rgba(255,255,255,.04)",borderRadius:6}}>
            👤 {userData?.nom||user?.email?.split("@")[0]||"Admin"}
          </div>
        </div>

        {NAV.map(n => (
          <div key={n.id} className={`admin-nav-item${adminTab===n.id?" active":""}`} onClick={()=>setAdminTab(n.id)}>
            <span style={{fontSize:"1rem"}}>{n.icon}</span>
            <span style={{flex:1}}>{n.label}</span>
            {n.badge ? <span style={{background:"#ce1126",color:"#fff",fontSize:".6rem",fontWeight:800,padding:"1px 6px",borderRadius:50,minWidth:18,textAlign:"center"}}>{n.badge}</span> : null}
          </div>
        ))}

        <div style={{padding:"14px 16px 0",borderTop:"1px solid rgba(255,255,255,.07)",marginTop:16,display:"flex",flexDirection:"column",gap:6}}>
          <button onClick={()=>setRefreshKey(k=>k+1)} style={{width:"100%",background:"rgba(79,209,125,.12)",color:"#4fd17d",border:"1px solid rgba(79,209,125,.2)",borderRadius:7,padding:"8px",fontSize:".75rem",cursor:"pointer"}}>
            🔄 Actualiser les données
          </button>
          <button onClick={()=>goPage("home")} style={{width:"100%",background:"rgba(255,255,255,.05)",color:"rgba(255,255,255,.5)",border:"1px solid rgba(255,255,255,.1)",borderRadius:7,padding:"8px",fontSize:".75rem",cursor:"pointer"}}>
            ← Retour au site
          </button>
        </div>

        {/* Mini stats */}
        <div style={{padding:"14px 16px",marginTop:12,borderTop:"1px solid rgba(255,255,255,.07)"}}>
          <div style={{fontSize:".62rem",color:"rgba(255,255,255,.3)",fontWeight:700,letterSpacing:".1em",marginBottom:6}}>
            STATS RAPIDES
          </div>
          {[
            {l:"👥 Utilisateurs",v:stats.users,c:"#4fd17d"},
            {l:"🏪 Vendeurs",v:stats.vendeurs,c:"#60a5fa"},
            {l:"🏍️ Livreurs",v:stats.livreurs,c:"#fbbf24"},
            {l:"🚚 Livraisons",v:stats.deliveries,c:"#a78bfa"},
            {l:"📦 Produits",v:stats.products,c:"#fb7185"},
            {l:"🛍️ Commandes",v:stats.orders,c:"#34d399"},
          ].map(s=>(
            <div key={s.l} style={{display:"flex",justifyContent:"space-between",fontSize:".72rem",padding:"4px 0"}}>
              <span style={{color:"rgba(255,255,255,.55)"}}>{s.l}</span>
              <span style={{color:s.c,fontWeight:700}}>{s.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONTENU PRINCIPAL ── */}
      <div className="admin-content">

        {/* Banner d'erreur si problème de chargement */}
        {loadError && (
          <div style={{
            background:"#fff0f0",border:"1px solid #fecaca",color:"#ce1126",
            borderRadius:10,padding:"12px 16px",marginBottom:16,
            display:"flex",alignItems:"center",gap:10,fontSize:".85rem",
          }}>
            <span style={{fontSize:"1.3rem"}}>⚠️</span>
            <div style={{flex:1}}>{loadError}</div>
            <button onClick={()=>setRefreshKey(k=>k+1)} style={{background:"#ce1126",color:"#fff",border:"none",padding:"6px 12px",borderRadius:6,cursor:"pointer",fontSize:".78rem",fontWeight:700}}>
              🔄 Réessayer
            </button>
          </div>
        )}

        {/* ════════ VUE D'ENSEMBLE ════════ */}
        {adminTab==="overview" && (
          <>
            <div className="admin-page-title">
              📊 Vue d'ensemble
              <span style={{fontSize:".72rem",color:"var(--gray)",fontWeight:400,marginLeft:"auto"}}>
                {new Date().toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}
              </span>
            </div>

            {/* Cartes stats principales */}
            <div className="stat-cards-grid">
              <StatCard icon="👥" val={stats.users.toLocaleString()} lbl="Utilisateurs total" trend={`${stats.buyers} acheteurs · ${stats.vendeurs} vendeurs`} col="#e6f0ff" ic="#1a4a9a" onClick={()=>setAdminTab("utilisateurs")}/>
              <StatCard icon="🏍️" val={stats.livreurs} lbl="Livreurs inscrits" trend={`${adminDeliveries.filter(d=>!d.livreur_id).length} en attente d'assignation`} col="#fff9e6" ic="#b8860b" onClick={()=>setAdminTab("livreurs")}/>
              <StatCard icon="📦" val={stats.products.toLocaleString()} lbl="Produits" trend={`${produits.filter(p=>p.actif).length} actifs · ${stats.ruptures} en rupture`} col="#e6fff0" ic="#1a6b3a" onClick={()=>setAdminTab("produits")}/>
              <StatCard icon="🚚" val={stats.deliveries.toLocaleString()} lbl="Livraisons" trend={`${adminDeliveries.filter(d=>d.statut==="livre").length} livrées`} col="#f3e8ff" ic="#7c3aed" onClick={()=>setAdminTab("deliveries")}/>
              <StatCard icon="🛍️" val={stats.orders.toLocaleString()} lbl="Commandes" trend={`${stats.enAttente} en attente · ${stats.livrees} livrées`} col="#ecfdf5" ic="#059669" onClick={()=>setAdminTab("commandes")}/>
              <StatCard icon="💰" val={`${stats.commissionTotal.toLocaleString()} F`} lbl="Commissions Yorix" trend="5% par transaction" col="#fff0f6" ic="#a0105a" onClick={()=>setAdminTab("revenus")}/>
              <StatCard icon="📅" val={`${stats.revenueToday.toLocaleString()} F`} lbl="Revenus aujourd'hui" trend="Commissions du jour" col="#f0fff4" ic="#276749"/>
              <StatCard icon="📈" val={`${stats.revenueWeek.toLocaleString()} F`} lbl="Revenus 7 jours" trend="Cette semaine" col="#fef9f0" ic="#7b5a10"/>
            </div>

            {/* Alerte livraisons à assigner */}
            {deliveriesEnAttente > 0 && (
              <div style={{
                background:"linear-gradient(135deg, #fef3c7, #fde68a)",
                border:"2px solid #f59e0b",borderRadius:12,
                padding:16,marginBottom:18,
                display:"flex",alignItems:"center",gap:14,
              }}>
                <div style={{fontSize:"2.2rem"}}>🚚</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"#92400e"}}>
                    {deliveriesEnAttente} livraison{deliveriesEnAttente>1?"s":""} en attente d'assignation !
                  </div>
                  <div style={{fontSize:".8rem",color:"#78350f",marginTop:3}}>
                    Assigne un livreur rapidement pour satisfaire tes clients.
                  </div>
                </div>
                <button onClick={()=>setAdminTab("deliveries")} style={{
                  background:"#f59e0b",color:"#fff",border:"none",
                  padding:"10px 20px",borderRadius:9,cursor:"pointer",
                  fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",
                }}>
                  🏍️ Assigner maintenant →
                </button>
              </div>
            )}

            {/* Graphiques */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
              <div className="admin-section">
                <div className="admin-section-title">
                  📈 Commandes / jour
                  <span style={{fontSize:".69rem",color:"var(--gray)",fontWeight:400}}>7 derniers jours</span>
                </div>
                <div style={{display:"flex",alignItems:"flex-end",gap:5,height:100,marginBottom:6}}>
                  {chartVentes.map((d,i)=>(
                    <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                      <div style={{fontSize:".6rem",color:"var(--gray)"}}>{d.orders||""}</div>
                      <div style={{
                        width:"100%",borderRadius:"3px 3px 0 0",
                        height:`${Math.max((d.orders/maxChartV)*80,d.orders>0?8:3)}px`,
                        background:i===chartVentes.length-1?"var(--green)":"var(--green-mid, #4fd17d)",
                        opacity:.85,transition:"height .5s",
                      }}/>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",gap:5}}>
                  {chartVentes.map((d,i)=><div key={i} style={{flex:1,textAlign:"center",fontSize:".6rem",color:"var(--gray)"}}>{d.label}</div>)}
                </div>
              </div>

              <div className="admin-section">
                <div className="admin-section-title">
                  👥 Inscriptions / jour
                  <span style={{fontSize:".69rem",color:"var(--gray)",fontWeight:400}}>7 derniers jours</span>
                </div>
                <div style={{display:"flex",alignItems:"flex-end",gap:5,height:100,marginBottom:6}}>
                  {chartInscrits.map((d,i)=>(
                    <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                      <div style={{fontSize:".6rem",color:"var(--gray)"}}>{d.val||""}</div>
                      <div style={{
                        width:"100%",borderRadius:"3px 3px 0 0",
                        height:`${Math.max((d.val/maxChartI)*80,d.val>0?8:3)}px`,
                        background:"#818cf8",opacity:.85,transition:"height .5s",
                      }}/>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",gap:5}}>
                  {chartInscrits.map((d,i)=><div key={i} style={{flex:1,textAlign:"center",fontSize:".6rem",color:"var(--gray)"}}>{d.label}</div>)}
                </div>
              </div>
            </div>

            {/* Dernières livraisons + Alertes */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
              <div className="admin-section">
                <div className="admin-section-title">
                  🚚 Dernières livraisons
                  <button className="admin-action-btn" style={{background:"var(--green)",color:"#fff",fontSize:".65rem"}} onClick={()=>setAdminTab("deliveries")}>
                    Voir tout →
                  </button>
                </div>
                {adminDeliveries.length === 0 ? (
                  <div style={{fontSize:".78rem",color:"var(--gray)",padding:"12px 0",textAlign:"center"}}>Aucune livraison</div>
                ) : (
                  adminDeliveries.slice(0,4).map(d => (
                    <div key={d.id} style={{
                      display:"flex",alignItems:"center",gap:10,
                      padding:"8px 0",borderBottom:"1px solid var(--border)",
                    }}>
                      <div style={{
                        width:36,height:36,borderRadius:8,
                        background:"var(--green-pale)",
                        display:"flex",alignItems:"center",justifyContent:"center",
                        fontSize:"1rem",flexShrink:0,
                      }}>🚚</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem",color:"var(--green)"}}>
                          {d.code_suivi}
                        </div>
                        <div style={{fontSize:".68rem",color:"var(--gray)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                          {d.client_nom} → {d.adresse_livraison}
                        </div>
                      </div>
                      <StatutLivraison statut={d.statut}/>
                    </div>
                  ))
                )}
              </div>

              <div className="admin-section">
                <div className="admin-section-title">
                  🔔 Alertes actives
                  <button className="admin-action-btn" style={{background:"var(--red)",color:"#fff",fontSize:".65rem"}} onClick={()=>setAdminTab("alertes")}>
                    {alertes.length} →
                  </button>
                </div>
                {alertes.length===0
                  ? <div className="admin-alert admin-alert-green">✅ Aucune alerte — tout va bien !</div>
                  : alertes.slice(0,4).map((a,i)=>(
                    <div key={i} className={`admin-alert admin-alert-${a.type}`} style={{marginBottom:6}}>
                      <span style={{fontSize:".65rem",fontWeight:700,background:"rgba(0,0,0,.1)",padding:"1px 5px",borderRadius:4,marginRight:6}}>{a.label}</span>
                      <span style={{flex:1,fontSize:".75rem"}}>{a.msg}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </>
        )}

        {/* ════════ LIVRAISONS (onglet principal amélioré) ════════ */}
        {adminTab === "deliveries" && (
          <>
            <div className="admin-page-title">
              🚚 Gestion des livraisons
              <span style={{fontSize:".75rem",background:"var(--green)",color:"#fff",padding:"3px 10px",borderRadius:50,fontWeight:600,marginLeft:8}}>
                {adminDeliveries.length}
              </span>
            </div>

            {/* Stats livraisons */}
            <div className="stat-cards-grid" style={{marginBottom:18}}>
              <StatCard icon="⏳" val={adminDeliveries.filter(d=>d.statut==="commande_recue").length} lbl="En attente" col="#fef3c7" ic="#f59e0b"/>
              <StatCard icon="📦" val={adminDeliveries.filter(d=>d.statut==="preparation").length} lbl="Préparation" col="#dbeafe" ic="#3b82f6"/>
              <StatCard icon="🏍️" val={adminDeliveries.filter(d=>["collecte","en_route"].includes(d.statut)).length} lbl="En route" col="#d1fae5" ic="#10b981"/>
              <StatCard icon="✅" val={adminDeliveries.filter(d=>d.statut==="livre").length} lbl="Livrées" col="#dcfce7" ic="#22c55e"/>
            </div>

            {/* Filtres */}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:18,background:"var(--surface)",padding:10,borderRadius:10,border:"1px solid var(--border)"}}>
              {[
                { id:"all",            label:"📋 Toutes",      color:"#64748b" },
                { id:"commande_recue", label:"⏳ En attente",  color:"#f59e0b" },
                { id:"preparation",    label:"📦 Préparation", color:"#3b82f6" },
                { id:"collecte",       label:"🏪 Collecté",    color:"#8b5cf6" },
                { id:"en_route",       label:"🏍️ En route",   color:"#10b981" },
                { id:"livre",          label:"✅ Livrées",     color:"#22c55e" },
              ].map(f => {
                const count = f.id === "all" ? adminDeliveries.length : adminDeliveries.filter(d => d.statut === f.id).length;
                const active = adminDelivFilter === f.id;
                return (
                  <button key={f.id} onClick={() => setAdminDelivFilter(f.id)} style={{
                    padding:"7px 13px",borderRadius:20,
                    border:"2px solid " + (active ? f.color : "var(--border)"),
                    background:active ? f.color : "var(--surface2)",
                    color:active ? "#fff" : "var(--ink)",
                    fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem",
                    cursor:"pointer",transition:"all .2s",
                  }}>
                    {f.label} ({count})
                  </button>
                );
              })}
            </div>

            {/* Liste */}
            {adminDeliveries.filter(d => adminDelivFilter === "all" || d.statut === adminDelivFilter).length === 0 ? (
              <div style={{textAlign:"center",padding:50,background:"var(--surface)",borderRadius:12,color:"var(--gray)",border:"1px solid var(--border)"}}>
                <div style={{fontSize:"3.5rem",marginBottom:10}}>📭</div>
                <p style={{fontSize:".9rem"}}>Aucune livraison dans cette catégorie</p>
              </div>
            ) : (
              <div style={{display:"grid",gap:10}}>
                {adminDeliveries
                  .filter(d => adminDelivFilter === "all" || d.statut === adminDelivFilter)
                  .map(d => (
                    <div key={d.id} style={{
                      background:"var(--surface)",border:"1px solid var(--border)",
                      borderRadius:12,padding:14,
                    }}>
                      {/* Header */}
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,marginBottom:12}}>
                        <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.05rem",color:"var(--green)",letterSpacing:".05em"}}>
                            {d.code_suivi}
                          </div>
                          <StatutLivraison statut={d.statut}/>
                        </div>
                        <div style={{fontSize:".72rem",color:"var(--gray)"}}>
                          {d.commande_at ? new Date(d.commande_at).toLocaleString("fr-FR") : "-"}
                        </div>
                      </div>

                      {/* Infos */}
                      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:10,marginBottom:12,fontSize:".78rem"}}>
                        <div>
                          <div style={{fontSize:".65rem",color:"var(--gray)",fontWeight:700,marginBottom:3}}>👤 CLIENT</div>
                          <div style={{fontWeight:600,color:"var(--ink)"}}>{d.client_nom || "—"}</div>
                          <div style={{color:"var(--gray)"}}>{d.client_tel || "—"}</div>
                        </div>
                        <div>
                          <div style={{fontSize:".65rem",color:"var(--gray)",fontWeight:700,marginBottom:3}}>🔴 COLLECTE</div>
                          <div style={{color:"var(--ink)"}}>{d.adresse_collecte || "—"}</div>
                        </div>
                        <div>
                          <div style={{fontSize:".65rem",color:"var(--gray)",fontWeight:700,marginBottom:3}}>🟢 LIVRAISON</div>
                          <div style={{color:"var(--ink)"}}>{d.adresse_livraison || "—"}</div>
                        </div>
                      </div>

                      {/* Livreur */}
                      {d.livreur_nom ? (
                        <div style={{background:"var(--green-pale)",borderRadius:8,padding:"9px 12px",marginBottom:10,fontSize:".82rem",display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                          <span style={{fontSize:"1.2rem"}}>🏍️</span>
                          <div style={{flex:1}}>
                            <strong>Livreur :</strong> {d.livreur_nom}
                            <span style={{color:"var(--gray)",marginLeft:8}}>· {d.livreur_tel}</span>
                          </div>
                          {d.livreur_tel && (
                            <a href={`https://wa.me/${d.livreur_tel.replace(/\D/g,"")}`} target="_blank" rel="noreferrer"
                              style={{background:"#25D366",color:"#fff",padding:"4px 10px",borderRadius:6,fontSize:".7rem",fontWeight:700,textDecoration:"none"}}>
                              💬 WhatsApp
                            </a>
                          )}
                        </div>
                      ) : (
                        <div style={{background:"#fef3c7",border:"1px dashed #f59e0b",borderRadius:8,padding:"9px 12px",marginBottom:10,fontSize:".82rem",color:"#92400e"}}>
                          ⚠️ Aucun livreur assigné
                        </div>
                      )}

                      {/* Actions */}
                      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                        {!d.livreur_id && !d.livreur_nom && (
                          <button onClick={() => setAssignModalOpen(d)} style={{
                            flex:1,minWidth:150,background:"var(--green)",color:"#fff",border:"none",
                            padding:"9px 14px",borderRadius:8,
                            fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".8rem",cursor:"pointer",
                          }}>
                            🏍️ Assigner un livreur
                          </button>
                        )}

                        {d.livreur_nom && d.statut === "preparation" && (
                          <button onClick={() => changerStatutLivraison(d, "collecte")}
                            style={{background:"#8b5cf6",color:"#fff",border:"none",padding:"7px 12px",borderRadius:8,fontSize:".75rem",fontWeight:700,cursor:"pointer"}}>
                            🏪 Marquer Collecté
                          </button>
                        )}
                        {d.livreur_nom && d.statut === "collecte" && (
                          <button onClick={() => changerStatutLivraison(d, "en_route")}
                            style={{background:"#10b981",color:"#fff",border:"none",padding:"7px 12px",borderRadius:8,fontSize:".75rem",fontWeight:700,cursor:"pointer"}}>
                            🏍️ Marquer En route
                          </button>
                        )}
                        {d.livreur_nom && d.statut === "en_route" && (
                          <button onClick={() => changerStatutLivraison(d, "livre")}
                            style={{background:"#22c55e",color:"#fff",border:"none",padding:"7px 12px",borderRadius:8,fontSize:".75rem",fontWeight:700,cursor:"pointer"}}>
                            ✅ Marquer Livré
                          </button>
                        )}

                        <button onClick={() => window.open("/?page=livraison&code=" + d.code_suivi, "_blank")}
                          style={{background:"var(--surface2)",color:"var(--ink)",border:"1px solid var(--border)",padding:"7px 12px",borderRadius:8,fontSize:".75rem",fontWeight:600,cursor:"pointer"}}>
                          👁️ Tracker client
                        </button>

                        <button onClick={() => { navigator.clipboard?.writeText(d.code_suivi); showToast("Code copié : " + d.code_suivi); }}
                          style={{background:"var(--surface2)",color:"var(--ink)",border:"1px solid var(--border)",padding:"7px 12px",borderRadius:8,fontSize:".75rem",fontWeight:600,cursor:"pointer"}}>
                          📋 Copier
                        </button>

                        {d.client_tel && (
                          <a href={`https://wa.me/${d.client_tel.replace(/\D/g,"")}?text=${encodeURIComponent(`Bonjour ${d.client_nom||""} ! Concernant votre livraison ${d.code_suivi}...`)}`}
                            target="_blank" rel="noreferrer"
                            style={{background:"#25D366",color:"#fff",padding:"7px 12px",borderRadius:8,fontSize:".75rem",fontWeight:700,textDecoration:"none"}}>
                            📱 Contacter
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </>
        )}

        {/* ════════ LIVREURS (nouveau onglet dédié) ════════ */}
        {adminTab === "livreurs" && (
          <>
            <div className="admin-page-title">
              🏍️ Gestion des livreurs
              <span style={{fontSize:".75rem",background:"var(--green)",color:"#fff",padding:"3px 10px",borderRadius:50,fontWeight:600,marginLeft:8}}>
                {livreursDispo.length}
              </span>
            </div>

            <div className="stat-cards-grid" style={{marginBottom:18}}>
              <StatCard icon="🏍️" val={livreursDispo.length} lbl="Livreurs inscrits" col="#fff9e6" ic="#b8860b"/>
              <StatCard icon="✅" val={livreursDispo.filter(l=>l.actif!==false).length} lbl="Actifs" col="#e6fff0" ic="#1a6b3a"/>
              <StatCard icon="✔️" val={livreursDispo.filter(l=>l.verifie).length} lbl="Vérifiés" col="#e6f0ff" ic="#1a4a9a"/>
              <StatCard icon="📦" val={adminDeliveries.filter(d=>d.livreur_id).length} lbl="Livraisons assignées" col="#f3e8ff" ic="#7c3aed"/>
            </div>

            {livreursDispo.length === 0 ? (
              <div style={{textAlign:"center",padding:60,background:"var(--surface)",borderRadius:12,border:"1px solid var(--border)"}}>
                <div style={{fontSize:"4rem",marginBottom:14}}>🏍️</div>
                <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",color:"var(--ink)",marginBottom:8}}>
                  Aucun livreur inscrit
                </h3>
                <p style={{color:"var(--gray)",fontSize:".88rem",marginBottom:16,maxWidth:420,margin:"0 auto 16px"}}>
                  Tu peux encore assigner des livreurs manuellement sur chaque livraison. Ou invite des livreurs à s'inscrire via le lien :
                </p>
                <div style={{background:"var(--green-pale)",padding:"8px 14px",borderRadius:8,display:"inline-block",fontSize:".82rem"}}>
                  🔗 <a href="https://yorix.cm/?authTab=register&role=delivery" style={{color:"var(--green)",fontWeight:700}}>yorix.cm/inscription-livreur</a>
                </div>
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Livreur</th>
                      <th>Contact</th>
                      <th>Ville</th>
                      <th>Livraisons</th>
                      <th>Statut</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {livreursDispo.map(l => {
                      const uid = l.uid || l.id;
                      const mesLivraisons = adminDeliveries.filter(d => d.livreur_id === uid);
                      const livresCount = mesLivraisons.filter(d => d.statut === "livre").length;
                      return (
                        <tr key={uid}>
                          <td>
                            <div style={{display:"flex",alignItems:"center",gap:10}}>
                              <div style={{width:38,height:38,borderRadius:"50%",background:"var(--green-pale)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",flexShrink:0}}>
                                🏍️
                              </div>
                              <div>
                                <strong style={{fontSize:".85rem"}}>{l.nom || "—"}</strong>
                                {l.verifie && <span style={{marginLeft:4,fontSize:".6rem",background:"#e6fff0",color:"#1a6b3a",padding:"1px 4px",borderRadius:3}}>✅</span>}
                                <div style={{fontSize:".66rem",color:"var(--gray)"}}>{l.email || "—"}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{fontSize:".78rem"}}>
                            {l.telephone || "—"}
                          </td>
                          <td style={{fontSize:".78rem"}}>{l.ville || "—"}</td>
                          <td>
                            <span className="admin-badge admin-badge-blue">{mesLivraisons.length}</span>
                            {livresCount > 0 && <span style={{fontSize:".63rem",color:"var(--green)",marginLeft:4}}>{livresCount} livrées</span>}
                          </td>
                          <td>
                            <span className={`admin-badge admin-badge-${l.actif!==false?"green":"red"}`}>
                              {l.actif!==false?"🟢 Actif":"⛔ Suspendu"}
                            </span>
                          </td>
                          <td>
                            <div style={{display:"flex",gap:3}}>
                              {l.telephone && (
                                <a href={`https://wa.me/${l.telephone.replace(/\D/g,"")}`} target="_blank" rel="noreferrer"
                                  className="admin-action-btn" style={{background:"#dcfce7",color:"#166534",textDecoration:"none"}}>
                                  📱
                                </a>
                              )}
                              <button onClick={()=>verifierUser(uid,l.verifie)} className="admin-action-btn"
                                style={{background:l.verifie?"#fff9e6":"#e6fff0",color:l.verifie?"#b8860b":"#1a6b3a"}}>
                                {l.verifie?"❌":"✅"}
                              </button>
                              <button onClick={()=>toggleVendeur(uid,l.actif!==false)} className="admin-action-btn"
                                style={{background:l.actif!==false?"#fff0f0":"#e6fff0",color:l.actif!==false?"#ce1126":"#1a6b3a"}}>
                                {l.actif!==false?"⛔":"✅"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ════════ PRODUITS ════════ */}
        {adminTab==="produits" && (
          <>
            <div className="admin-page-title">
              📦 Gestion des produits
              <span style={{fontSize:".75rem",background:"var(--green)",color:"#fff",padding:"3px 10px",borderRadius:50,fontWeight:600,marginLeft:8}}>{produitsFiltres.length} / {produits.length}</span>
            </div>

            <div className="admin-filter-row" style={{flexWrap:"wrap",gap:8}}>
              <input className="admin-search" style={{maxWidth:240}} placeholder="🔍 Nom ou vendeur..." value={searchProd} onChange={e=>setSearchProd(e.target.value)}/>
              <select className="admin-search" style={{maxWidth:160}} value={filterProdCat} onChange={e=>setFilterProdCat(e.target.value)}>
                <option value="">Toutes catégories</option>
                {CATS_LIST.map(c=><option key={c}>{c}</option>)}
              </select>
              <select className="admin-search" style={{maxWidth:140}} value={filterProdStatut} onChange={e=>setFilterProdStatut(e.target.value)}>
                <option value="">Tous statuts</option>
                <option value="actif">✅ Actif</option>
                <option value="inactif">⛔ Inactif</option>
              </select>
              <button className="admin-action-btn" style={{background:"var(--surface2)",color:"var(--ink)",padding:"7px 12px",borderRadius:8,border:"1px solid var(--border)"}} onClick={()=>{setSearchProd("");setFilterProdCat("");setFilterProdStatut("");}}>✕ Reset</button>
              <button className="admin-action-btn" style={{background:"#e6f0ff",color:"#1a4a9a",padding:"7px 12px",borderRadius:8,marginLeft:"auto"}} onClick={()=>exportCSV(produitsFiltres.map(p=>({id:p.id,nom:p.name_fr,prix:p.prix,vendeur:p.vendeur_nom,ville:p.ville,stock:p.stock,categorie:p.categorie,actif:p.actif})),"produits-yorix.csv")}>
                📤 Export CSV
              </button>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Produit</th><th>Prix</th><th>Vendeur</th><th>Cat.</th><th>Ville</th><th>Stock</th><th>Statut</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {produitsFiltres.map(p=>(
                    <tr key={p.id}>
                      <td>
                        <div style={{display:"flex",alignItems:"center",gap:9}}>
                          {(p.image||p.image_urls?.[0]) && (
                            <img src={p.image||p.image_urls?.[0]} alt="" style={{width:38,height:38,borderRadius:7,objectFit:"cover",flexShrink:0}} onError={e=>e.target.style.display="none"}/>
                          )}
                          <strong style={{fontSize:".79rem"}}>{p.name_fr||"—"}</strong>
                        </div>
                      </td>
                      <td><strong style={{color:"var(--green)"}}>{(p.prix||0).toLocaleString()} F</strong></td>
                      <td style={{fontSize:".75rem"}}>{p.vendeur_nom||"—"}</td>
                      <td><span className="admin-badge admin-badge-gray">{p.categorie||"—"}</span></td>
                      <td style={{fontSize:".72rem"}}>{p.ville||"—"}</td>
                      <td>
                        <span className={`admin-badge admin-badge-${(p.stock||0)===0?"red":(p.stock||0)<=5?"yellow":"green"}`}>
                          {p.stock||0}
                        </span>
                      </td>
                      <td><span className={`admin-badge admin-badge-${p.actif?"green":"gray"}`}>{p.actif?"Actif":"Inactif"}</span></td>
                      <td>
                        <div style={{display:"flex",gap:3}}>
                          <button className="admin-action-btn" style={{background:p.actif?"#fff9e6":"#e6fff0",color:p.actif?"#b8860b":"#1a6b3a"}} onClick={()=>toggleActifProduit(p.id,p.actif)}>
                            {p.actif?"⛔":"✅"}
                          </button>
                          <button className="admin-action-btn" style={{background:"#fff0f0",color:"#ce1126"}} onClick={()=>supprimerProduit(p.id,p.name_fr)}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {produitsFiltres.length===0 && (
                    <tr><td colSpan={8} style={{textAlign:"center",padding:28,color:"var(--gray)"}}>Aucun produit trouvé</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ════════ COMMANDES ════════ */}
        {adminTab==="commandes" && (
          <>
            <div className="admin-page-title">
              🛍️ Gestion des commandes
              <span style={{fontSize:".75rem",background:"var(--green)",color:"#fff",padding:"3px 10px",borderRadius:50,fontWeight:600,marginLeft:8}}>{commandesFiltrees.length}</span>
            </div>

            <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}>
              {[
                {l:"⏳ En attente",v:commandes.filter(o=>o.status==="pending").length,c:"#b8860b",bg:"#fff9e6",f:"pending"},
                {l:"✅ Validées",v:commandes.filter(o=>o.status==="validee").length,c:"#1a4a9a",bg:"#e6f0ff",f:"validee"},
                {l:"📦 Livrées",v:commandes.filter(o=>o.status==="livre").length,c:"#1a6b3a",bg:"#e6fff0",f:"livre"},
                {l:"❌ Annulées",v:commandes.filter(o=>o.status==="annulee").length,c:"#ce1126",bg:"#fff0f0",f:"annulee"},
              ].map(s=>(
                <div key={s.l} onClick={()=>setFilterOrder(s.f===filterOrder?"":s.f)} style={{
                  background:s.bg,border:`1.5px solid ${filterOrder===s.f?s.c:s.c+"30"}`,
                  borderRadius:8,padding:"8px 14px",cursor:"pointer",fontSize:".75rem",
                }}>
                  <span style={{color:"var(--gray)"}}>{s.l} : </span>
                  <strong style={{color:s.c}}>{s.v}</strong>
                </div>
              ))}
            </div>

            {commandesFiltrees.length === 0 ? (
              <div style={{textAlign:"center",padding:50,background:"var(--surface)",borderRadius:12,color:"var(--gray)",border:"1px solid var(--border)"}}>
                <div style={{fontSize:"3rem",marginBottom:10}}>📭</div>
                <p>Aucune commande {filterOrder ? `"${filterOrder}"` : ""}</p>
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Client</th><th>Montant</th><th>Commission</th><th>Statut</th><th>Date</th><th>Actions</th></tr></thead>
                  <tbody>
                    {commandesFiltrees.map(o=>(
                      <tr key={o.id}>
                        <td>
                          <strong style={{fontSize:".8rem"}}>{o.client_nom||"—"}</strong>
                          {o.telephone && <div style={{fontSize:".65rem",color:"var(--gray)"}}>{o.telephone}</div>}
                        </td>
                        <td><strong>{(o.montant||0).toLocaleString()} F</strong></td>
                        <td style={{color:"var(--green)",fontWeight:700}}>{(o.commission||0).toLocaleString()} F</td>
                        <td><BadgeStatut statut={o.status}/></td>
                        <td style={{fontSize:".7rem",color:"var(--gray)",whiteSpace:"nowrap"}}>{o.created_at?new Date(o.created_at).toLocaleDateString("fr-FR"):"-"}</td>
                        <td>
                          <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
                            {o.status==="pending" && <button className="admin-action-btn" style={{background:"#e6f0ff",color:"#1a4a9a"}} onClick={()=>validerCommande(o.id)}>✅</button>}
                            {o.status==="validee" && <button className="admin-action-btn" style={{background:"#e6fff0",color:"#1a6b3a"}} onClick={()=>marquerLivre(o.id)}>📦</button>}
                            {!["livre","annulee"].includes(o.status) && <button className="admin-action-btn" style={{background:"#fff0f0",color:"#ce1126"}} onClick={()=>annulerCommande(o.id)}>❌</button>}
                            {o.telephone && <a href={`https://wa.me/${o.telephone.replace(/\D/g,"")}`} target="_blank" rel="noreferrer" className="admin-action-btn" style={{background:"#dcfce7",color:"#166534",textDecoration:"none"}}>📱</a>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ════════ UTILISATEURS ════════ */}
        {adminTab==="utilisateurs" && (
          <>
            <div className="admin-page-title">
              👥 Gestion des utilisateurs
              <span style={{fontSize:".75rem",background:"var(--green)",color:"#fff",padding:"3px 10px",borderRadius:50,fontWeight:600,marginLeft:8}}>{usersFiltres.length} / {utilisateurs.length}</span>
            </div>

            <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}>
              {["buyer","seller","delivery","provider","admin"].map(r=>{
                const cnt = utilisateurs.filter(u=>u.role===r).length;
                const colors = {buyer:"#1a4a9a",seller:"#1a6b3a",delivery:"#b8860b",provider:"#6a1b9a",admin:"#ce1126"};
                return (
                  <div key={r} onClick={()=>setFilterRole(r===filterRole?"":r)} style={{
                    background:"var(--surface)",border:`1.5px solid ${filterRole===r?colors[r]:"var(--border)"}`,
                    borderRadius:8,padding:"7px 12px",cursor:"pointer",fontSize:".73rem",
                  }}>
                    <span style={{color:colors[r]||"var(--gray)",fontWeight:700}}>{ROLE_LABELS[r]||r}</span>
                    <span style={{color:"var(--gray)",marginLeft:6}}>{cnt}</span>
                  </div>
                );
              })}
            </div>

            <div className="admin-filter-row">
              <input className="admin-search" style={{maxWidth:260}} placeholder="🔍 Nom ou email..." value={searchUser} onChange={e=>setSearchUser(e.target.value)}/>
              <button className="admin-action-btn" style={{background:"var(--surface2)",color:"var(--ink)",padding:"7px 12px",borderRadius:8,border:"1px solid var(--border)"}} onClick={()=>{setSearchUser("");setFilterRole("");}}>✕ Reset</button>
              <button className="admin-action-btn" style={{background:"#e6f0ff",color:"#1a4a9a",padding:"7px 12px",borderRadius:8,marginLeft:"auto"}} onClick={()=>exportCSV(usersFiltres.map(u=>({uid:u.uid,nom:u.nom,email:u.email,role:u.role,ville:u.ville,telephone:u.telephone})),"utilisateurs-yorix.csv")}>
                📤 Export CSV
              </button>
            </div>

            {usersFiltres.length === 0 ? (
              <div style={{textAlign:"center",padding:50,background:"var(--surface)",borderRadius:12,color:"var(--gray)",border:"1px solid var(--border)"}}>
                <div style={{fontSize:"3rem",marginBottom:10}}>👥</div>
                <p>Aucun utilisateur trouvé</p>
                {utilisateurs.length === 0 && (
                  <p style={{fontSize:".78rem",marginTop:10,color:"#ce1126"}}>
                    💡 Si la table users/profiles existe, vérifie les politiques RLS
                  </p>
                )}
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Utilisateur</th><th>Email</th><th>Rôle</th><th>Ville</th><th>Téléphone</th><th>Actions</th></tr></thead>
                  <tbody>
                    {usersFiltres.map(u=>{
                      const uid = u.uid||u.id;
                      return (
                        <tr key={uid}>
                          <td>
                            <div style={{display:"flex",alignItems:"center",gap:8}}>
                              <div style={{width:32,height:32,borderRadius:"50%",background:`hsl(${(uid||"").toString().charCodeAt(0)*7%360},50%,50%)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:".8rem"}}>
                                {(u.nom||u.email||"?")[0].toUpperCase()}
                              </div>
                              <div>
                                <strong style={{fontSize:".8rem"}}>{u.nom||"—"}</strong>
                                {u.verifie && <span style={{marginLeft:4,fontSize:".6rem",background:"#e6fff0",color:"#1a6b3a",padding:"1px 4px",borderRadius:3}}>✅</span>}
                              </div>
                            </div>
                          </td>
                          <td style={{fontSize:".75rem",color:"var(--gray)"}}>{u.email||"—"}</td>
                          <td>
                            <select value={u.role||"buyer"} style={{border:"1px solid var(--border)",background:"var(--surface)",borderRadius:6,padding:"3px 8px",fontSize:".72rem",cursor:"pointer",color:"var(--ink)"}} onChange={e=>changerRole(uid,e.target.value)}>
                              {["buyer","seller","delivery","provider","admin"].map(r=><option key={r} value={r}>{r}</option>)}
                            </select>
                          </td>
                          <td style={{fontSize:".73rem"}}>{u.ville||"—"}</td>
                          <td style={{fontSize:".73rem"}}>{u.telephone || "—"}</td>
                          <td>
                            <div style={{display:"flex",gap:3}}>
                              {u.telephone && <a href={`https://wa.me/${u.telephone.replace(/\D/g,"")}`} target="_blank" rel="noreferrer" className="admin-action-btn" style={{background:"#dcfce7",color:"#166534",textDecoration:"none"}}>📱</a>}
                              <button className="admin-action-btn" style={{background:"#fff0f0",color:"#ce1126"}} onClick={()=>supprimerUser(uid,u.email)}>🗑️</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ════════ VENDEURS ════════ */}
        {adminTab==="vendeurs" && (
          <>
            <div className="admin-page-title">
              🏪 Gestion des vendeurs
              <span style={{fontSize:".75rem",background:"var(--green)",color:"#fff",padding:"3px 10px",borderRadius:50,fontWeight:600,marginLeft:8}}>{sellers.length}</span>
            </div>

            <div className="stat-cards-grid" style={{marginBottom:16}}>
              <StatCard icon="🏪" val={sellers.length} lbl="Vendeurs total" col="#e6fff0" ic="#1a6b3a"/>
              <StatCard icon="✅" val={sellers.filter(s=>s.actif!==false).length} lbl="Actifs" col="#e6f0ff" ic="#1a4a9a"/>
              <StatCard icon="⛔" val={sellers.filter(s=>s.actif===false).length} lbl="Suspendus" col="#fff0f0" ic="#ce1126"/>
              <StatCard icon="✔️" val={sellers.filter(s=>s.verifie).length} lbl="Vérifiés" col="#fff9e6" ic="#b8860b"/>
            </div>

            {sellers.length === 0 ? (
              <div style={{textAlign:"center",padding:50,background:"var(--surface)",borderRadius:12,color:"var(--gray)"}}>
                <div style={{fontSize:"3rem",marginBottom:10}}>🏪</div>
                <p>Aucun vendeur inscrit</p>
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Vendeur</th><th>Email</th><th>Produits</th><th>Ventes</th><th>Statut</th><th>Actions</th></tr></thead>
                  <tbody>
                    {sellers.map(u=>{
                      const uid = u.uid||u.id;
                      const mesProds = produits.filter(p=>p.vendeur_id===uid);
                      const mesVentes = commandes.filter(o=>o.vendeur_id===uid);
                      return (
                        <tr key={uid}>
                          <td>
                            <div style={{display:"flex",alignItems:"center",gap:8}}>
                              <div style={{width:32,height:32,borderRadius:"50%",background:"var(--green)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:".8rem"}}>
                                {(u.nom||"?")[0].toUpperCase()}
                              </div>
                              <strong style={{fontSize:".8rem"}}>{u.nom||"—"}</strong>
                            </div>
                          </td>
                          <td style={{fontSize:".72rem",color:"var(--gray)"}}>{u.email||"—"}</td>
                          <td><span className="admin-badge admin-badge-blue">{mesProds.length}</span></td>
                          <td><span className="admin-badge admin-badge-green">{mesVentes.length}</span></td>
                          <td><span className={`admin-badge admin-badge-${u.actif!==false?"green":"red"}`}>{u.actif!==false?"Actif":"Suspendu"}</span></td>
                          <td>
                            <div style={{display:"flex",gap:3}}>
                              <button className="admin-action-btn" style={{background:u.actif!==false?"#fff0f0":"#e6fff0",color:u.actif!==false?"#ce1126":"#1a6b3a"}} onClick={()=>toggleVendeur(uid,u.actif!==false)}>
                                {u.actif!==false?"⛔":"✅"}
                              </button>
                              {u.telephone && <a href={`https://wa.me/${u.telephone.replace(/\D/g,"")}`} target="_blank" rel="noreferrer" className="admin-action-btn" style={{background:"#dcfce7",color:"#166534",textDecoration:"none"}}>📱</a>}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ════════ PRESTATAIRES ════════ */}
        {adminTab === "prestataires" && (
          <>
            <div className="admin-page-title">
              👷 Candidatures prestataires
              <span style={{fontSize:".75rem",background:prestPending>0?"#ce1126":"var(--green)",color:"#fff",padding:"3px 10px",borderRadius:50,fontWeight:600,marginLeft:8}}>
                {prestPending} en attente
              </span>
            </div>

            <div className="stat-cards-grid" style={{marginBottom:18}}>
              <StatCard icon="⏳" val={prestatairesList.filter(p=>p.status==="pending").length} lbl="En attente" col="#fff9e6" ic="#b8860b"/>
              <StatCard icon="✅" val={prestatairesList.filter(p=>p.status==="approved").length} lbl="Approuvés" col="#e6fff0" ic="#1a6b3a"/>
              <StatCard icon="❌" val={prestatairesList.filter(p=>p.status==="rejected").length} lbl="Refusés" col="#fff0f0" ic="#ce1126"/>
              <StatCard icon="📋" val={prestatairesList.length} lbl="Total" col="#e6f0ff" ic="#1a4a9a"/>
            </div>

            <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
              {[
                {id:"pending",label:"⏳ En attente"},
                {id:"approved",label:"✅ Approuvés"},
                {id:"rejected",label:"❌ Refusés"},
                {id:"all",label:"📋 Tous"},
              ].map(f => (
                <button key={f.id} onClick={()=>setPrestFilter(f.id)} style={{
                  background:prestFilter===f.id?"var(--green)":"var(--surface)",
                  color:prestFilter===f.id?"#fff":"var(--ink)",
                  border:`1.5px solid ${prestFilter===f.id?"var(--green)":"var(--border)"}`,
                  borderRadius:8,padding:"7px 14px",cursor:"pointer",
                  fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".78rem",
                }}>
                  {f.label} ({f.id==="all"?prestatairesList.length:prestatairesList.filter(p=>p.status===f.id).length})
                </button>
              ))}
            </div>

            {prestatairesList.filter(p => prestFilter==="all" || p.status===prestFilter).length === 0 ? (
              <div style={{textAlign:"center",padding:40,color:"var(--gray)",background:"var(--surface)",borderRadius:12}}>
                <div style={{fontSize:"3rem",marginBottom:10}}>👷</div>
                <p>Aucune candidature {prestFilter!=="all"?prestFilter:""}</p>
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Candidat</th><th>Métier</th><th>Ville</th><th>Téléphone</th><th>Statut</th><th>Actions</th></tr></thead>
                  <tbody>
                    {prestatairesList
                      .filter(p => prestFilter==="all" || p.status===prestFilter)
                      .map(p => (
                        <tr key={p.id}>
                          <td><strong style={{fontSize:".82rem"}}>{p.nom}{p.prenom ? " " + p.prenom : ""}</strong></td>
                          <td><span className="admin-badge admin-badge-blue">{p.metier}</span></td>
                          <td style={{fontSize:".75rem"}}>{p.ville || "—"}</td>
                          <td style={{fontSize:".75rem",color:"var(--gray)"}}>{p.telephone}</td>
                          <td>
                            <span className={`admin-badge admin-badge-${p.status==="approved"?"green":p.status==="rejected"?"red":"yellow"}`}>
                              {p.status==="approved"?"✅ Approuvé":p.status==="rejected"?"❌ Refusé":"⏳ En attente"}
                            </span>
                          </td>
                          <td>
                            <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                              {p.status==="pending" && (
                                <>
                                  <button className="admin-action-btn" style={{background:"#e6fff0",color:"#1a6b3a"}} onClick={async()=>{
                                    if(!window.confirm(`Approuver ${p.nom} ?`)) return;
                                    await supabase.from("prestataires").update({status:"approved",verifie:true}).eq("id",p.id);
                                    setPrestatairesList(prev => prev.map(x => x.id===p.id ? {...x,status:"approved"} : x));
                                    showToast(`✅ ${p.nom} approuvé`);
                                  }}>✅</button>
                                  <button className="admin-action-btn" style={{background:"#fff0f0",color:"#ce1126"}} onClick={async()=>{
                                    if(!window.confirm(`Refuser ${p.nom} ?`)) return;
                                    await supabase.from("prestataires").update({status:"rejected"}).eq("id",p.id);
                                    setPrestatairesList(prev => prev.map(x => x.id===p.id ? {...x,status:"rejected"} : x));
                                    showToast(`❌ Refusé`);
                                  }}>❌</button>
                                </>
                              )}
                              {p.telephone && <a href={`https://wa.me/${p.telephone.replace(/\D/g,"")}`} target="_blank" rel="noreferrer" className="admin-action-btn" style={{background:"#dcfce7",color:"#166534",textDecoration:"none"}}>📱</a>}
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ════════ REVENUS ════════ */}
        {adminTab==="revenus" && (
          <>
            <div className="admin-page-title">💰 Revenus & Finances</div>
            <div className="stat-cards-grid" style={{marginBottom:20}}>
              <StatCard icon="💵" val={`${stats.commissionTotal.toLocaleString()} F`} lbl="Commissions totales (5%)" col="#e6fff0" ic="#1a6b3a"/>
              <StatCard icon="💰" val={`${stats.revenue.toLocaleString()} F`} lbl="Volume total" col="#fff9e6" ic="#b8860b"/>
              <StatCard icon="📅" val={`${stats.revenueToday.toLocaleString()} F`} lbl="Aujourd'hui" col="#f0fff4" ic="#276749"/>
              <StatCard icon="📈" val={`${stats.revenueWeek.toLocaleString()} F`} lbl="7 jours" col="#fef9f0" ic="#7b5a10"/>
            </div>

            <div className="admin-section">
              <div className="admin-section-title">📈 Commissions journalières (7 derniers jours)</div>
              <div style={{display:"flex",alignItems:"flex-end",gap:8,height:120,marginBottom:8}}>
                {chartVentes.map((d,i)=>(
                  <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                    {d.revenue > 0 && <div style={{fontSize:".6rem",color:"var(--gray)"}}>{d.revenue.toLocaleString()}</div>}
                    <div style={{
                      width:"100%",borderRadius:"4px 4px 0 0",
                      height:`${Math.max((d.revenue/maxChartRev)*90,d.revenue>0?8:3)}px`,
                      background:i===chartVentes.length-1?"var(--yellow, #fcd116)":"var(--green)",
                      opacity:.85,
                    }}/>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:8}}>
                {chartVentes.map((d,i)=><div key={i} style={{flex:1,textAlign:"center",fontSize:".63rem",color:"var(--gray)"}}>{d.label}</div>)}
              </div>
            </div>
          </>
        )}

        {/* ════════ YORIX POINTS (LoyaltyAdminTab) ════════ */}
        {adminTab==="loyalty" && (
          <LoyaltyAdminTab user={user} userData={userData} showToast={showToast}/>
        )}

        {/* ════════ ALERTES ════════ */}
        {adminTab==="alertes" && (
          <>
            <div className="admin-page-title">
              🔔 Alertes & Notifications
              <span style={{fontSize:".75rem",background:alertes.length>0?"var(--red)":"var(--green)",color:"#fff",padding:"3px 10px",borderRadius:50,fontWeight:600,marginLeft:8}}>
                {alertes.length}
              </span>
            </div>

            {alertes.length===0 ? (
              <div style={{textAlign:"center",padding:"48px 0",color:"var(--gray)"}}>
                <div style={{fontSize:"3.5rem",marginBottom:12}}>✅</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1rem",marginBottom:6,color:"var(--ink)"}}>Tout va bien !</div>
                <p>Aucune alerte sur Yorix.</p>
              </div>
            ) : (
              <>
                {/* Livraisons à assigner */}
                <div className="admin-section">
                  <div className="admin-section-title">
                    🚚 Livraisons à assigner
                    <span className="admin-badge admin-badge-yellow">{adminDeliveries.filter(d=>d.statut==="commande_recue"&&!d.livreur_id).length}</span>
                  </div>
                  {adminDeliveries.filter(d=>d.statut==="commande_recue"&&!d.livreur_id).length===0
                    ? <div className="admin-alert admin-alert-green">✅ Toutes les livraisons ont un livreur</div>
                    : adminDeliveries.filter(d=>d.statut==="commande_recue"&&!d.livreur_id).map(d=>(
                      <div key={d.id} className="admin-alert admin-alert-yellow" style={{flexWrap:"wrap",gap:8}}>
                        <div>
                          <strong>{d.code_suivi}</strong>
                          <div style={{fontSize:".7rem",marginTop:2}}>{d.client_nom} → {d.adresse_livraison}</div>
                        </div>
                        <button onClick={()=>{setAdminTab("deliveries");setAssignModalOpen(d);}} style={{marginLeft:"auto",background:"var(--green)",color:"#fff",border:"none",padding:"6px 12px",borderRadius:6,cursor:"pointer",fontSize:".72rem",fontWeight:700}}>
                          🏍️ Assigner
                        </button>
                      </div>
                    ))
                  }
                </div>

                {/* Ruptures de stock */}
                <div className="admin-section">
                  <div className="admin-section-title">
                    📦 Ruptures de stock
                    <span className="admin-badge admin-badge-red">{produits.filter(p=>(p.stock||0)===0).length}</span>
                  </div>
                  {produits.filter(p=>(p.stock||0)===0).length===0
                    ? <div className="admin-alert admin-alert-green">✅ Aucun produit en rupture</div>
                    : produits.filter(p=>(p.stock||0)===0).slice(0,8).map(p=>(
                      <div key={p.id} className="admin-alert admin-alert-red">
                        <div>
                          <strong>{p.name_fr||"Produit"}</strong>
                          <div style={{fontSize:".7rem",marginTop:2}}>Vendeur : {p.vendeur_nom||"—"}</div>
                        </div>
                      </div>
                    ))
                  }
                </div>

                {/* Commandes en attente */}
                <div className="admin-section">
                  <div className="admin-section-title">
                    ⏳ Commandes en attente
                    <span className="admin-badge admin-badge-yellow">{commandes.filter(o=>o.status==="pending").length}</span>
                  </div>
                  {commandes.filter(o=>o.status==="pending").length===0
                    ? <div className="admin-alert admin-alert-green">✅ Aucune commande en attente</div>
                    : commandes.filter(o=>o.status==="pending").slice(0,6).map(o=>(
                      <div key={o.id} className="admin-alert admin-alert-yellow" style={{flexWrap:"wrap",gap:8}}>
                        <div>
                          <strong>{o.client_nom||"Client"}</strong>
                          <div style={{fontSize:".7rem",marginTop:2}}>{(o.montant||0).toLocaleString()} FCFA</div>
                        </div>
                        <button onClick={()=>validerCommande(o.id)} style={{marginLeft:"auto",background:"var(--green)",color:"#fff",border:"none",padding:"5px 10px",borderRadius:6,cursor:"pointer",fontSize:".7rem",fontWeight:700}}>
                          ✅ Valider
                        </button>
                      </div>
                    ))
                  }
                </div>
              </>
            )}
          </>
        )}

      </div>
    </div>
  );
}


// ┌─────────────────────────────────────────────────────────────┐
// │ Composant : Modal achat pack points                         │
// └─────────────────────────────────────────────────────────────┘
function LoyaltyPackModal({ pack, user, userData, onClose, onSuccess }) {
  const [nom, setNom]         = useState(userData?.nom || "");
  const [tel, setTel]         = useState(userData?.telephone || "");
  const [moyen, setMoyen]     = useState("momo");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]   = useState({});

  if (!pack) return null;

  const bonusPoints = pack.bonus_pct ? Math.round(pack.points * (pack.bonus_pct / 100)) : 0;
  const totalPoints = pack.points + bonusPoints;
  const ratio       = pack.prix_fcfa / totalPoints;

  const validate = () => {
    const e = {};
    if (!nom.trim()) e.nom = "Nom obligatoire";
    if (!tel.trim()) e.tel = "Téléphone obligatoire";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const acheter = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      // 1. Créer la demande d'achat
      const { data, error } = await supabase.from("loyalty_pack_purchases").insert({
        user_id:        user.id,
        pack_id:        pack.id,
        pack_nom:       pack.nom,
        points:         totalPoints,
        prix_fcfa:      pack.prix_fcfa,
        telephone:      tel,
        nom:            nom,
        moyen_paiement: moyen,
        status:         "pending",
      }).select().single();

      if (error) throw error;

      // 2. Générer le message WhatsApp
      const numero = moyen === "momo" ? MOMO_NUMBER : ORANGE_NUMBER;
      const operateur = moyen === "momo" ? "MTN Mobile Money" : "Orange Money";
      const msg = [
        "🌟 *ACHAT DE POINTS YORIX*",
        "",
        `📦 *Pack :* ${pack.nom} ${pack.emoji}`,
        `⭐ *Points :* ${pack.points}${bonusPoints > 0 ? ` + ${bonusPoints} bonus = *${totalPoints} pts*` : ""}`,
        `💰 *Prix :* ${pack.prix_fcfa.toLocaleString("fr-FR")} FCFA`,
        "",
        `💳 *Mode de paiement :* ${operateur}`,
        `📱 *Numéro :* ${numero}`,
        "",
        "👤 *Acheteur :*",
        `Nom : ${nom}`,
        `Téléphone : ${tel}`,
        `ID : ${data.id.slice(0, 8)}`,
        "",
        "✅ *Instructions :*",
        `1. J'effectue le paiement au ${numero}`,
        "2. J'envoie la capture ici",
        "3. Mes points sont crédités sous 1h",
        "",
        "Merci Yorix ! 🇨🇲",
      ].join("\n");

      window.open(`https://wa.me/${PAYMENT_WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
      onSuccess?.();
      onClose();
    } catch (err) {
      alert("Erreur : " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 460 }}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{
            fontSize: "3rem", marginBottom: 4,
            background: pack.color_bg, width: 72, height: 72,
            borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}>
            {pack.emoji}
          </div>
          <div style={{
            fontFamily: "'Syne',sans-serif", fontSize: "1.25rem", fontWeight: 800,
            color: "var(--ink)", marginTop: 8,
          }}>
            Pack {pack.nom}
          </div>
        </div>

        {/* Récap */}
        <div style={{
          background: "var(--green-pale)", border: "1px solid var(--green-light)",
          borderRadius: 11, padding: 14, marginBottom: 16,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".82rem", marginBottom: 4 }}>
            <span style={{ color: "var(--gray)" }}>Points de base</span>
            <strong>{pack.points.toLocaleString("fr-FR")} pts</strong>
          </div>
          {bonusPoints > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".82rem", marginBottom: 4 }}>
              <span style={{ color: "var(--green)" }}>🎁 Bonus (+{pack.bonus_pct}%)</span>
              <strong style={{ color: "var(--green)" }}>+{bonusPoints.toLocaleString("fr-FR")} pts</strong>
            </div>
          )}
          <div style={{
            display: "flex", justifyContent: "space-between",
            fontSize: ".95rem", fontFamily: "'Syne',sans-serif", fontWeight: 800,
            borderTop: "1px dashed var(--green-light)", paddingTop: 6, marginTop: 4, color: "var(--green)",
          }}>
            <span>TOTAL POINTS</span>
            <span>{totalPoints.toLocaleString("fr-FR")} pts</span>
          </div>
          <div style={{
            display: "flex", justifyContent: "space-between",
            fontSize: ".95rem", fontFamily: "'Syne',sans-serif", fontWeight: 800,
            marginTop: 6, color: "var(--ink)",
          }}>
            <span>À PAYER</span>
            <span>{pack.prix_fcfa.toLocaleString("fr-FR")} FCFA</span>
          </div>
          <div style={{ fontSize: ".68rem", color: "var(--gray)", marginTop: 4, textAlign: "center" }}>
            Soit {ratio.toFixed(1)} FCFA / point
          </div>
        </div>

        {/* Formulaire */}
        <div className="form-group">
          <label className="form-label">Nom complet <span>*</span></label>
          <input
            className={`form-input${errors.nom ? " error" : ""}`}
            value={nom}
            onChange={e => setNom(e.target.value)}
            placeholder="Raisa Kouekam"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Téléphone <span>*</span></label>
          <input
            className={`form-input${errors.tel ? " error" : ""}`}
            value={tel}
            onChange={e => setTel(e.target.value)}
            placeholder="+237 6XX XXX XXX"
          />
        </div>

        {/* Moyens de paiement */}
        <div className="form-group">
          <label className="form-label">Moyen de paiement <span>*</span></label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div
              onClick={() => setMoyen("momo")}
              style={{
                border: `2px solid ${moyen === "momo" ? "var(--green)" : "var(--border)"}`,
                background: moyen === "momo" ? "var(--green-pale)" : "var(--surface)",
                borderRadius: 10, padding: 12, cursor: "pointer", textAlign: "center",
              }}
            >
              <div style={{ fontSize: "1.4rem", marginBottom: 3 }}>📱</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".78rem" }}>MTN MoMo</div>
              <div style={{ fontSize: ".65rem", color: "var(--gray)" }}>{MOMO_NUMBER}</div>
            </div>
            <div
              onClick={() => setMoyen("orange")}
              style={{
                border: `2px solid ${moyen === "orange" ? "var(--green)" : "var(--border)"}`,
                background: moyen === "orange" ? "var(--green-pale)" : "var(--surface)",
                borderRadius: 10, padding: 12, cursor: "pointer", textAlign: "center",
              }}
            >
              <div style={{ fontSize: "1.4rem", marginBottom: 3 }}>🔶</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".78rem" }}>Orange Money</div>
              <div style={{ fontSize: ".65rem", color: "var(--gray)" }}>{ORANGE_NUMBER}</div>
            </div>
          </div>
        </div>

        <button className="form-submit" onClick={acheter} disabled={loading}>
          {loading
            ? <><div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />Traitement...</>
            : `💳 Payer ${pack.prix_fcfa.toLocaleString("fr-FR")} FCFA via WhatsApp`}
        </button>

        <p style={{ fontSize: ".68rem", color: "var(--gray)", textAlign: "center", marginTop: 8 }}>
          🔒 Paiement sécurisé · Points crédités sous 1h après confirmation
        </p>
      </div>
    </div>
  );
}

// ┌─────────────────────────────────────────────────────────────┐
// │ Composant : Modal échange récompense                        │
// └─────────────────────────────────────────────────────────────┘
function LoyaltyRedeemModal({ reward, userPoints, user, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [code, setCode]       = useState("");

  if (!reward) return null;

  const canAfford = userPoints >= reward.cout_points;

  const echanger = async () => {
    if (!canAfford) return;
    setLoading(true);
    try {
      // Générer code unique
      const newCode = `YX-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

      // 1. Créer l'échange
      const { error: errRedeem } = await supabase.from("loyalty_redemptions").insert({
        user_id:     user.id,
        reward_id:   reward.id,
        reward_nom:  reward.nom,
        cout_points: reward.cout_points,
        code:        newCode,
        status:      "validated",
        expire_at:   new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 jours
      });
      if (errRedeem) throw errRedeem;

      // 2. Débiter les points (fonction RPC)
      const { error: errDebit } = await supabase.rpc("add_loyalty_points", {
        p_user_id:      user.id,
        p_points:       -reward.cout_points,
        p_type:         "echange",
        p_description:  `Échange : ${reward.nom}`,
        p_reference_id: null,
        p_reference_type: "reward",
      });
      if (errDebit) throw errDebit;

      setCode(newCode);
      setDone(true);
      onSuccess?.();
    } catch (err) {
      alert("Erreur : " + err.message);
    }
    setLoading(false);
  };

  if (done) {
    return (
      <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="modal" style={{ maxWidth: 440, textAlign: "center" }}>
          <button className="modal-close" onClick={onClose}>✕</button>
          <div style={{ fontSize: "4rem", marginBottom: 12 }}>🎉</div>
          <div style={{
            fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.25rem",
            color: "var(--green)", marginBottom: 8,
          }}>
            Échange réussi !
          </div>
          <p style={{ color: "var(--gray)", fontSize: ".85rem", marginBottom: 18, lineHeight: 1.6 }}>
            Votre récompense <strong style={{ color: "var(--ink)" }}>"{reward.nom}"</strong> est activée.
          </p>
          <div style={{
            background: "var(--green-pale)", border: "2px dashed var(--green)",
            borderRadius: 12, padding: 16, marginBottom: 16,
          }}>
            <div style={{ fontSize: ".7rem", color: "var(--gray)", fontWeight: 700, marginBottom: 4 }}>
              VOTRE CODE UNIQUE
            </div>
            <div style={{
              fontFamily: "'Syne',sans-serif", fontSize: "1.35rem", fontWeight: 800,
              color: "var(--green)", letterSpacing: "0.05em",
            }}>
              {code}
            </div>
            <button
              onClick={() => navigator.clipboard?.writeText(code)}
              style={{
                marginTop: 8, background: "var(--surface)", color: "var(--ink)",
                border: "1px solid var(--border)", borderRadius: 7,
                padding: "5px 14px", fontSize: ".72rem", fontWeight: 600, cursor: "pointer",
              }}
            >
              📋 Copier
            </button>
          </div>
          <p style={{ fontSize: ".72rem", color: "var(--gray)" }}>
            Donnez ce code lors de votre prochain achat. Valable 90 jours.
          </p>
          <button
            className="form-submit"
            style={{ marginTop: 14 }}
            onClick={() => window.open(`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent(`Bonjour Yorix ! J'ai échangé ma récompense "${reward.nom}" avec le code ${code}`)}`, "_blank")}
          >
            📱 Activer sur WhatsApp
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 420 }}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{
            fontSize: "3rem", marginBottom: 4,
            background: reward.color_bg, width: 72, height: 72, borderRadius: "50%",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}>
            {reward.emoji}
          </div>
          <div style={{
            fontFamily: "'Syne',sans-serif", fontSize: "1.15rem", fontWeight: 800,
            color: "var(--ink)", marginTop: 8,
          }}>
            {reward.nom}
          </div>
          {reward.description && (
            <p style={{ fontSize: ".8rem", color: "var(--gray)", marginTop: 6 }}>{reward.description}</p>
          )}
        </div>

        <div style={{
          background: "var(--surface2)", borderRadius: 10, padding: 14, marginBottom: 14,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: ".82rem" }}>
            <span style={{ color: "var(--gray)" }}>Coût</span>
            <strong style={{ color: "var(--ink)" }}>{reward.cout_points.toLocaleString("fr-FR")} pts</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: ".82rem" }}>
            <span style={{ color: "var(--gray)" }}>Mon solde actuel</span>
            <strong style={{ color: "var(--ink)" }}>{userPoints.toLocaleString("fr-FR")} pts</strong>
          </div>
          <div style={{
            display: "flex", justifyContent: "space-between",
            borderTop: "1px dashed var(--border)", paddingTop: 6, fontSize: ".88rem",
            fontFamily: "'Syne',sans-serif", fontWeight: 800,
            color: canAfford ? "var(--green)" : "var(--red)",
          }}>
            <span>Après échange</span>
            <span>{(userPoints - reward.cout_points).toLocaleString("fr-FR")} pts</span>
          </div>
        </div>

        {canAfford ? (
          <button className="form-submit" onClick={echanger} disabled={loading}>
            {loading
              ? <><div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />Traitement...</>
              : `✅ Confirmer l'échange (${reward.cout_points} pts)`}
          </button>
        ) : (
          <>
            <div style={{
              background: "#fff0f0", border: "1px solid #fecaca", color: "#ce1126",
              borderRadius: 8, padding: "10px 14px", fontSize: ".78rem", textAlign: "center", marginBottom: 10,
            }}>
              ⚠️ Il vous manque <strong>{(reward.cout_points - userPoints).toLocaleString("fr-FR")}</strong> points
            </div>
            <button
              className="form-submit"
              style={{ background: "var(--yellow)", color: "#0d1f14" }}
              onClick={onClose}
            >
              💰 Acheter des points
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ┌─────────────────────────────────────────────────────────────┐
// │ PAGE PRINCIPALE : LOYALTY                                   │
// └─────────────────────────────────────────────────────────────┘
function LoyaltyPage({ user, userData, goPage, setAuthOpen, setAuthTab }) {
  const [packs, setPacks]               = useState([]);
  const [rewards, setRewards]           = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [redemptions, setRedemptions]   = useState([]);
  const [loading, setLoading]           = useState(true);
  const [selectedPack, setSelectedPack] = useState(null);
  const [selectedReward, setSelectedReward] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [totalGagnes, setTotalGagnes]   = useState(0);
  const [currentLevel, setCurrentLevel] = useState("bronze");
  const [tab, setTab]                   = useState("rewards"); // rewards, packs, history

  // Charger les données
  const loadAll = async () => {
    setLoading(true);

    const queries = [
      supabase.from("loyalty_packs").select("*").eq("actif", true).order("ordre"),
      supabase.from("loyalty_rewards").select("*").eq("actif", true).order("ordre"),
    ];

    if (user?.id) {
      queries.push(
        supabase.from("loyalty_transactions").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(30),
        supabase.from("loyalty_redemptions").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(10),
        supabase.from("profiles").select("points,points_total_gagnes,points_level").eq("id", user.id).single()
      );
    }

    const results = await Promise.all(queries);
    setPacks(results[0]?.data || []);
    setRewards(results[1]?.data || []);

    if (user?.id) {
      setTransactions(results[2]?.data || []);
      setRedemptions(results[3]?.data || []);
      const profile = results[4]?.data;
      if (profile) {
        setCurrentPoints(profile.points || 0);
        setTotalGagnes(profile.points_total_gagnes || 0);
        setCurrentLevel(profile.points_level || "bronze");
      }
    }

    setLoading(false);
  };

  useEffect(() => { loadAll(); }, [user?.id]);

  // Niveau suivant
  const levelThresholds = { bronze: 500, argent: 1000, or: 5000, platine: 5000 };
  const nextThreshold   = levelThresholds[currentLevel] || 500;
  const prevThreshold   = { bronze: 0, argent: 500, or: 1000, platine: 5000 }[currentLevel];
  const progressPct     = currentLevel === "platine"
    ? 100
    : Math.min(100, Math.round(((totalGagnes - prevThreshold) / (nextThreshold - prevThreshold)) * 100));
  const pointsToNext    = Math.max(0, nextThreshold - totalGagnes);

  // Labels transactions
  const typeLabels = {
    achat:               { label: "Achat",               emoji: "🛍️", color: "var(--green)" },
    vente:               { label: "Vente",               emoji: "💰", color: "var(--green)" },
    avis:                { label: "Avis publié",         emoji: "⭐", color: "#f59e0b" },
    achat_points:        { label: "Pack acheté",         emoji: "💎", color: "#7c3aed" },
    echange:             { label: "Récompense échangée", emoji: "🎁", color: "#ce1126" },
    bonus_inscription:   { label: "Bonus bienvenue",     emoji: "🎉", color: "var(--green)" },
    parrainage:          { label: "Parrainage",          emoji: "👥", color: "#2563eb" },
  };

  // Non connecté
  if (!user) {
    return (
      <section className="sec anim">
        <div style={{
          background: "linear-gradient(135deg,#1a3a24,var(--green))",
          borderRadius: 16, padding: "40px 28px", textAlign: "center", color: "#fff",
        }}>
          <div style={{ fontSize: "4rem", marginBottom: 14 }}>🌟</div>
          <h2 style={{
            fontFamily: "'Syne',sans-serif", fontSize: "1.6rem", fontWeight: 800,
            marginBottom: 8, letterSpacing: "-.5px",
          }}>
            Yorix Points — Programme de fidélité
          </h2>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: ".9rem", marginBottom: 20, maxWidth: 460, margin: "0 auto 20px" }}>
            Gagnez des points à chaque achat, vente ou avis posté. Échangez-les contre des bons d'achat, des livraisons gratuites et bien plus !
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              className="cta-y"
              onClick={() => { setAuthTab?.("register"); setAuthOpen?.(true); }}
            >
              🎁 Créer mon compte (+50 pts offerts)
            </button>
            <button
              className="cta-w"
              onClick={() => { setAuthTab?.("login"); setAuthOpen?.(true); }}
            >
              🔑 Me connecter
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {selectedPack && (
        <LoyaltyPackModal
          pack={selectedPack}
          user={user}
          userData={userData}
          onClose={() => setSelectedPack(null)}
          onSuccess={loadAll}
        />
      )}
      {selectedReward && (
        <LoyaltyRedeemModal
          reward={selectedReward}
          userPoints={currentPoints}
          user={user}
          onClose={() => setSelectedReward(null)}
          onSuccess={loadAll}
        />
      )}

      <section className="sec anim">
        {/* ── HERO CARTE POINTS ── */}
        <div style={{
          background: "linear-gradient(135deg, #1a3a24 0%, var(--green) 60%, #2d9655 100%)",
          borderRadius: 16, padding: "26px 24px", color: "#fff",
          marginBottom: 18, position: "relative", overflow: "hidden",
        }}>
          {/* Décor */}
          <div style={{
            position: "absolute", top: -30, right: -30, width: 180, height: 180,
            background: "rgba(252,209,22,.08)", borderRadius: "50%",
          }} />
          <div style={{
            position: "absolute", bottom: -50, left: -40, width: 160, height: 160,
            background: "rgba(255,255,255,.05)", borderRadius: "50%",
          }} />

          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
              <div>
                <div style={{ fontSize: ".72rem", opacity: .7, fontWeight: 600, marginBottom: 3 }}>
                  YORIX POINTS
                </div>
                <div style={{
                  fontFamily: "'Syne',sans-serif", fontSize: ".92rem", fontWeight: 600, opacity: .88,
                }}>
                  Mes points
                </div>
              </div>
              <LevelBadge level={currentLevel} size="lg" />
            </div>

            <div style={{
              fontFamily: "'Syne',sans-serif", fontSize: "2.8rem", fontWeight: 800,
              color: "var(--yellow)", lineHeight: 1, marginBottom: 4,
            }}>
              {currentPoints.toLocaleString("fr-FR")} <span style={{ fontSize: "1rem", color: "rgba(255,255,255,.6)" }}>pts</span>
            </div>

            <div style={{ fontSize: ".72rem", opacity: .65, marginBottom: 14 }}>
              Total gagné : {totalGagnes.toLocaleString("fr-FR")} pts · Niveau {currentLevel}
              {currentLevel !== "platine" && ` · ${pointsToNext.toLocaleString("fr-FR")} pts pour ${
                currentLevel === "bronze" ? "Argent"
                : currentLevel === "argent" ? "Or"
                : "Platine"
              }`}
            </div>

            {/* Progression niveau */}
            {currentLevel !== "platine" && (
              <div style={{
                background: "rgba(255,255,255,.15)", borderRadius: 50, height: 8,
                overflow: "hidden",
              }}>
                <div style={{
                  background: "linear-gradient(90deg, var(--yellow), #ffd84a)",
                  borderRadius: 50, height: "100%", width: `${progressPct}%`,
                  transition: "width .8s ease",
                }} />
              </div>
            )}

            {/* Actions rapides */}
            <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
              <button
                onClick={() => setTab("packs")}
                style={{
                  background: "var(--yellow)", color: "#0d1f14", border: "none",
                  padding: "9px 18px", borderRadius: 9,
                  fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".8rem",
                  cursor: "pointer", flex: "1 1 auto",
                }}
              >
                💎 Acheter des points
              </button>
              <button
                onClick={() => setTab("rewards")}
                style={{
                  background: "rgba(255,255,255,.15)", color: "#fff",
                  border: "1px solid rgba(255,255,255,.25)",
                  padding: "9px 18px", borderRadius: 9,
                  fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".8rem",
                  cursor: "pointer", flex: "1 1 auto",
                }}
              >
                🎁 Échanger
              </button>
            </div>
          </div>
        </div>

        {/* ── STATS RAPIDES ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 18 }}>
          {[
            { icon: "🛍️", val: transactions.filter(t => t.type === "achat").length, lbl: "Achats" },
            { icon: "💰", val: transactions.filter(t => t.type === "vente").length, lbl: "Ventes" },
            { icon: "⭐", val: transactions.filter(t => t.type === "avis").length, lbl: "Avis" },
            { icon: "🎁", val: redemptions.length, lbl: "Échanges" },
          ].map(s => (
            <div key={s.lbl} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 10, padding: "12px 10px", textAlign: "center",
            }}>
              <div style={{ fontSize: "1.3rem", marginBottom: 2 }}>{s.icon}</div>
              <div style={{
                fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "var(--ink)",
              }}>{s.val}</div>
              <div style={{ fontSize: ".65rem", color: "var(--gray)" }}>{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* ── COMMENT GAGNER DES POINTS ── */}
        <div style={{
          background: "var(--green-pale)", border: "1px solid var(--green-light)",
          borderRadius: 12, padding: 16, marginBottom: 18,
        }}>
          <div style={{
            fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".88rem",
            color: "var(--green)", marginBottom: 10,
          }}>
            💡 Comment gagner des points ?
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            {[
              { emoji: "🛍️", t: "Chaque achat", d: "1 point / 500 FCFA dépensés", c: "var(--green)" },
              { emoji: "💰", t: "Chaque vente", d: "1 point / 500 FCFA vendus", c: "var(--green)" },
              { emoji: "⭐", t: "Avis clients", d: "2 à 10 pts selon la note", c: "#f59e0b" },
            ].map(w => (
              <div key={w.t} style={{
                background: "var(--surface)", borderRadius: 9, padding: 12, textAlign: "center",
              }}>
                <div style={{ fontSize: "1.8rem", marginBottom: 5 }}>{w.emoji}</div>
                <div style={{
                  fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".78rem",
                  color: "var(--ink)", marginBottom: 3,
                }}>{w.t}</div>
                <div style={{ fontSize: ".7rem", color: "var(--gray)" }}>{w.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── TABS ── */}
        <div style={{
          display: "flex", gap: 6, marginBottom: 16, borderBottom: "1px solid var(--border)",
          overflowX: "auto",
        }}>
          {[
            { id: "rewards",  label: "🎁 Récompenses",    count: rewards.length },
            { id: "packs",    label: "💎 Acheter pts",   count: packs.length },
            { id: "history",  label: "📜 Historique",     count: transactions.length },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "10px 14px",
                fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".82rem",
                color: tab === t.id ? "var(--green)" : "var(--gray)",
                borderBottom: tab === t.id ? "3px solid var(--green)" : "3px solid transparent",
                whiteSpace: "nowrap",
              }}
            >
              {t.label} {t.count > 0 && <span style={{ opacity: .6, fontSize: ".72rem" }}>({t.count})</span>}
            </button>
          ))}
        </div>

        {/* ── TAB : RÉCOMPENSES ── */}
        {tab === "rewards" && (
          loading ? <div className="loading"><div className="spinner" />Chargement...</div>
          : rewards.length === 0 ? <div className="empty-state"><div className="empty-icon">🎁</div><p>Aucune récompense disponible</p></div>
          : <div className="rewards-grid">
              {rewards.map(r => {
                const canAfford = currentPoints >= r.cout_points;
                return (
                  <div
                    key={r.id}
                    className="reward-card"
                    style={{
                      opacity: canAfford ? 1 : 0.72,
                      position: "relative", overflow: "hidden",
                    }}
                  >
                    {r.valeur_fcfa && (
                      <span style={{
                        position: "absolute", top: 8, right: 8,
                        background: "var(--green)", color: "#fff",
                        fontSize: ".58rem", fontWeight: 700,
                        padding: "2px 7px", borderRadius: 4,
                      }}>
                        {r.valeur_fcfa.toLocaleString("fr-FR")} F
                      </span>
                    )}
                    <div className="reward-icon" style={{ background: r.color_bg }}>{r.emoji}</div>
                    <div className="reward-name">{r.nom}</div>
                    {r.description && (
                      <div style={{ fontSize: ".68rem", color: "var(--gray)", marginBottom: 6, textAlign: "center", lineHeight: 1.4 }}>
                        {r.description}
                      </div>
                    )}
                    <div className="reward-pts" style={{ color: canAfford ? "var(--green)" : "var(--gray)" }}>
                      {r.cout_points.toLocaleString("fr-FR")} pts
                    </div>
                    <button
                      className="reward-btn"
                      onClick={() => setSelectedReward(r)}
                      style={{
                        background: canAfford ? "var(--green)" : "var(--surface2)",
                        color: canAfford ? "#fff" : "var(--gray)",
                        border: canAfford ? "none" : "1px solid var(--border)",
                      }}
                    >
                      {canAfford ? "Échanger" : `Il manque ${(r.cout_points - currentPoints).toLocaleString("fr-FR")} pts`}
                    </button>
                  </div>
                );
              })}
            </div>
        )}

        {/* ── TAB : PACKS ── */}
        {tab === "packs" && (
          loading ? <div className="loading"><div className="spinner" />Chargement...</div>
          : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
              {packs.map(p => {
                const bonus = p.bonus_pct ? Math.round(p.points * p.bonus_pct / 100) : 0;
                const total = p.points + bonus;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPack(p)}
                    style={{
                      background: "var(--surface)",
                      border: `2px solid ${p.badge === "meilleur_deal" ? "var(--yellow)" : p.badge === "populaire" ? "var(--green)" : "var(--border)"}`,
                      borderRadius: 12, padding: 14, cursor: "pointer",
                      position: "relative", transition: "transform .15s,box-shadow .15s",
                    }}
                    onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,.08)"; }}
                    onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    {p.badge && (
                      <span style={{
                        position: "absolute", top: -9, left: "50%", transform: "translateX(-50%)",
                        background: p.badge === "meilleur_deal" ? "var(--yellow)" : p.badge === "populaire" ? "var(--green)" : "#7c3aed",
                        color: p.badge === "meilleur_deal" ? "#0d1f14" : "#fff",
                        fontSize: ".6rem", fontWeight: 800, padding: "3px 10px", borderRadius: 50,
                        textTransform: "uppercase", letterSpacing: ".05em",
                        fontFamily: "'Syne',sans-serif",
                      }}>
                        {p.badge === "meilleur_deal" ? "🔥 Meilleur deal" : p.badge === "populaire" ? "⭐ Populaire" : "🆕 Nouveau"}
                      </span>
                    )}

                    <div style={{
                      fontSize: "2.5rem", textAlign: "center", marginBottom: 6,
                      background: p.color_bg, borderRadius: "50%",
                      width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "4px auto 8px",
                    }}>
                      {p.emoji}
                    </div>

                    <div style={{
                      fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".88rem",
                      color: "var(--ink)", textAlign: "center", marginBottom: 4,
                    }}>
                      Pack {p.nom}
                    </div>

                    <div style={{
                      fontFamily: "'Syne',sans-serif", fontSize: "1.5rem", fontWeight: 800,
                      color: "var(--green)", textAlign: "center",
                    }}>
                      {total.toLocaleString("fr-FR")} pts
                    </div>

                    {bonus > 0 && (
                      <div style={{
                        textAlign: "center", fontSize: ".68rem", color: "#f59e0b",
                        fontWeight: 700, marginBottom: 4,
                      }}>
                        +{bonus} pts bonus (+{p.bonus_pct}%)
                      </div>
                    )}

                    <div style={{
                      textAlign: "center", fontSize: ".88rem", fontWeight: 700,
                      color: "var(--ink)", marginTop: 4,
                    }}>
                      {p.prix_fcfa.toLocaleString("fr-FR")} FCFA
                    </div>

                    <div style={{
                      textAlign: "center", fontSize: ".6rem", color: "var(--gray)", marginTop: 2,
                    }}>
                      {(p.prix_fcfa / total).toFixed(1)} FCFA / pt
                    </div>

                    <button style={{
                      width: "100%", marginTop: 10,
                      background: "var(--green)", color: "#fff", border: "none",
                      padding: "8px", borderRadius: 8, cursor: "pointer",
                      fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".75rem",
                    }}>
                      💳 Acheter
                    </button>
                  </div>
                );
              })}
            </div>
        )}

        {/* ── TAB : HISTORIQUE ── */}
        {tab === "history" && (
          loading ? <div className="loading"><div className="spinner" />Chargement...</div>
          : transactions.length === 0
            ? <div className="empty-state">
                <div className="empty-icon">📜</div>
                <p>Aucune transaction pour l'instant.</p>
                <p style={{ fontSize: ".78rem", marginTop: 8 }}>
                  Passez une commande ou postez un avis pour gagner vos premiers points !
                </p>
              </div>
            : <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
                {transactions.map((t, i) => {
                  const info = typeLabels[t.type] || { label: t.type, emoji: "💫", color: "var(--gray)" };
                  const isGain = t.points > 0;
                  return (
                    <div
                      key={t.id}
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "12px 14px",
                        borderBottom: i < transactions.length - 1 ? "1px solid var(--border)" : "none",
                      }}
                    >
                      <div style={{
                        width: 38, height: 38, borderRadius: "50%",
                        background: "var(--surface2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1.1rem", flexShrink: 0,
                      }}>
                        {info.emoji}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".82rem",
                          color: "var(--ink)",
                        }}>
                          {info.label}
                        </div>
                        <div style={{ fontSize: ".68rem", color: "var(--gray)", marginTop: 2 }}>
                          {t.description || "—"}
                          {t.montant_fcfa && ` · ${t.montant_fcfa.toLocaleString("fr-FR")} FCFA`}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{
                          fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".92rem",
                          color: isGain ? "var(--green)" : "#ce1126",
                        }}>
                          {isGain ? "+" : ""}{t.points.toLocaleString("fr-FR")}
                        </div>
                        <div style={{ fontSize: ".6rem", color: "var(--gray)" }}>
                          {new Date(t.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
        )}

        {/* ── MES ÉCHANGES EN COURS ── */}
        {tab === "rewards" && redemptions.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <div style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".95rem",
              color: "var(--ink)", marginBottom: 12,
            }}>
              🎫 Mes codes récompenses
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 10 }}>
              {redemptions.map(r => (
                <div key={r.id} style={{
                  background: "var(--surface)", border: "2px dashed var(--green-light)",
                  borderRadius: 10, padding: 12,
                }}>
                  <div style={{ fontSize: ".72rem", color: "var(--gray)", marginBottom: 3 }}>
                    {r.reward_nom}
                  </div>
                  <div style={{
                    fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".95rem",
                    color: "var(--green)", letterSpacing: "0.03em",
                  }}>
                    {r.code}
                  </div>
                  <div style={{
                    display: "flex", justifyContent: "space-between", marginTop: 6,
                    fontSize: ".64rem", color: "var(--gray)",
                  }}>
                    <span>Status : {r.status}</span>
                    <span>
                      {r.expire_at ? `Expire ${new Date(r.expire_at).toLocaleDateString("fr-FR")}` : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default function Yorix() {
  const [dark, setDark]           = useState(false);
  const [page, setPage]           = useState("home");
  const [user, setUser]           = useState(null);
  const [userData, setUserData]   = useState(null);
 const [userRole, setUserRole] = useState(null);
  const [loading, setLoading]     = useState(true);

  // Auth
  const [authOpen, setAuthOpen]         = useState(false);
  const [authTab, setAuthTab]           = useState("login");
  const [selectedRole, setSelectedRole] = useState("buyer");
  const [authForm, setAuthForm]         = useState({ nom:"", email:"", tel:"", password:"" });
  const [authError, setAuthError]       = useState("");
  const [authLoading, setAuthLoading]   = useState(false);

  // Produits
  const [produits, setProduits]                 = useState([]);
  const [produitsLoading, setProduitsLoading]   = useState(true);
  const [allServices, setAllServices] = useState([]);

useEffect(() => {
  const loadServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("actif", true)
      .eq("disponible", true)
      .order("created_at", { ascending: false });
    if (!error) setAllServices(data || []);
  };
  loadServices();
}, []);
  const [search, setSearch]                     = useState("");
  const [filterCat, setFilterCat]               = useState("");

  // Panier
  const [cartOpen, setCartOpen]   = useState(false);
 const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("yorix_cart");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // Sauvegarde automatique du panier à chaque modification
  useEffect(() => {
    try {
      localStorage.setItem("yorix_cart", JSON.stringify(cartItems));
    } catch (e) { console.warn("Cart save failed:", e); }
  }, [cartItems]);

  // Notifs
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs]       = useState([]);

  // Dashboard
  const [dashTab, setDashTab] = useState("overview");

  // Divers
  const [waOpen, setWaOpen]                 = useState(false);
  const [nlEmail, setNlEmail]               = useState("");
  const [nlSent, setNlSent]                 = useState(false);
  const [wishlist, setWishlist]             = useState(new Set());
  const [loyaltyPts, setLoyaltyPts]         = useState(320); 
  const [blogFilter, setBlogFilter]         = useState("TOUT"); // ✅ Filtre blog par catégorie
  const [prestSearch, setPrestSearch]       = useState("");     // ✅ Recherche prestataires
  const [prestCatFilter, setPrestCatFilter] = useState("");     // ✅ Filtre catégorie prestataires
  const [prestVilleFilter, setPrestVilleFilter] = useState(""); // ✅ Filtre ville prestataires
 const [selectedPrest, setSelectedPrest]   = useState(null);   // ✅ Modal détail prestataire
  const [demandeLivraisonOpen, setDemandeLivraisonOpen] = useState(false); // ✅ Modal demande livraison
   // Academy
  const [academyCourses, setAcademyCourses] = useState([]);
  const [academyLoading, setAcademyLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const loadCourses = async () => {
      setAcademyLoading(true);
      const { data, error } = await supabase
        .from("academy_courses")
        .select("*")
        .eq("actif", true)
        .order("prix", { ascending: true });
      if (!error) setAcademyCourses(data || []);
      setAcademyLoading(false);
    };
    loadCourses();
  }, []);

  const goAcademyDetail = (course) => {
    setSelectedCourse(course);
    goPage("academyDetail");
  };
  const goAcademyContact = (course) => {
    setSelectedCourse(course);
    goPage("academyContact");
  };

  const [inscriptionSent, setInscriptionSent] = useState(false);
  const [inscriptionLoading, setInscriptionLoading] = useState(false);
  const [inscriptionError, setInscriptionError] = useState("");
  const [inscriptionForm, setInscriptionForm] = useState({ nom:"",prenom:"",tel:"",email:"",metier:"",ville:"",experience:"",tarif:"",bio:"" });

  // ─────────────────────────────────────────────────────────────
  // SOUMETTRE CANDIDATURE PRESTATAIRE (avec Supabase + email + WA)
  // ─────────────────────────────────────────────────────────────
  const soumettreCandidaturePrestataire = async () => {
    // Reset erreur
    setInscriptionError("");

    // Validation
    if (!inscriptionForm.nom.trim()) {
      setInscriptionError("Le nom est obligatoire");
      return;
    }
    if (!inscriptionForm.tel.trim()) {
      setInscriptionError("Le téléphone est obligatoire");
      return;
    }
    if (!inscriptionForm.metier) {
      setInscriptionError("Veuillez choisir un métier");
      return;
    }
    // Validation email si renseigné
    if (inscriptionForm.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inscriptionForm.email)) {
      setInscriptionError("Email invalide");
      return;
    }

    setInscriptionLoading(true);

    try {
      // 1️⃣ Enregistrement dans Supabase (table prestataires)
      const { data, error } = await supabase
        .from("prestataires")
        .insert({
          nom:        inscriptionForm.nom,
          prenom:     inscriptionForm.prenom || null,
          telephone:  inscriptionForm.tel,
          email:      inscriptionForm.email || null,
          metier:     inscriptionForm.metier,
          ville:      inscriptionForm.ville || null,
          experience: inscriptionForm.experience || null,
          tarif:      inscriptionForm.tarif || null,
          bio:        inscriptionForm.bio || null,
          status:     "pending",
          user_id:    user?.id || null,
        })
        .select()
        .single();

      // Si la table n'existe pas ou erreur Supabase, on continue quand même
      // (on enverra au moins l'email + WhatsApp à l'admin)
      if (error) {
        console.warn("Table prestataires Supabase:", error.message);
      }

      // 2️⃣ Préparer le message WhatsApp pour l'admin Yorix
      const wamsg = [
        "👷 *NOUVELLE CANDIDATURE PRESTATAIRE YORIX*",
        "",
        "👤 *Informations*",
        `Nom : ${inscriptionForm.nom}${inscriptionForm.prenom ? " " + inscriptionForm.prenom : ""}`,
        `Téléphone : ${inscriptionForm.tel}`,
        inscriptionForm.email ? `Email : ${inscriptionForm.email}` : "",
        "",
        "💼 *Profil professionnel*",
        `Métier : ${inscriptionForm.metier}`,
        inscriptionForm.ville ? `Ville : ${inscriptionForm.ville}` : "",
        inscriptionForm.experience ? `Expérience : ${inscriptionForm.experience}` : "",
        inscriptionForm.tarif ? `Tarif : ${inscriptionForm.tarif}` : "",
        "",
        inscriptionForm.bio ? `📝 *Présentation*\n${inscriptionForm.bio}` : "",
        "",
        "✅ *Actions à faire*",
        "1. Contacter le candidat sous 24h",
        "2. Vérifier les qualifications",
        "3. Valider ou refuser le profil",
        "",
        "Yorix CM 🇨🇲",
      ].filter(Boolean).join("\n");

      // 3️⃣ Ouvrir WhatsApp avec le message pré-rempli
      const waUrl = `https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent(wamsg)}`;
      window.open(waUrl, "_blank");

      // 4️⃣ Envoyer email à l'admin (non bloquant)
      const sujet = `Nouvelle candidature prestataire — ${inscriptionForm.nom} (${inscriptionForm.metier})`;
      const corps = [
        "Bonjour,",
        "",
        "Nouvelle candidature prestataire sur Yorix CM :",
        "",
        `👤 Nom : ${inscriptionForm.nom}${inscriptionForm.prenom ? " " + inscriptionForm.prenom : ""}`,
        `📞 Téléphone : ${inscriptionForm.tel}`,
        inscriptionForm.email ? `📧 Email : ${inscriptionForm.email}` : "",
        `💼 Métier : ${inscriptionForm.metier}`,
        inscriptionForm.ville ? `📍 Ville : ${inscriptionForm.ville}` : "",
        inscriptionForm.experience ? `⏱ Expérience : ${inscriptionForm.experience}` : "",
        inscriptionForm.tarif ? `💰 Tarif : ${inscriptionForm.tarif}` : "",
        "",
        inscriptionForm.bio ? `📝 Présentation :\n${inscriptionForm.bio}` : "",
        "",
        "---",
        "Envoyé depuis yorix.cm",
      ].filter(Boolean).join("\n");

      const mailtoUrl = `mailto:raisaodin1@gmail.com?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
      // Ouvrir dans un nouvel onglet pour ne pas casser le flux
      setTimeout(() => window.open(mailtoUrl, "_blank"), 500);

      // 5️⃣ Succès
      setInscriptionSent(true);

    } catch (err) {
      console.error("soumettreCandidaturePrestataire:", err);
      setInscriptionError("Erreur : " + (err.message || "Impossible d'envoyer la candidature. Réessayez."));
    }

    setInscriptionLoading(false);
  };

  const [chatMessages, setChatMessages] = useState([{ text:"Bonjour ! Comment puis-je vous aider ?", me:false, time:"10:02" }]);
  const [chatMsg, setChatMsg]       = useState("");
  const [chatBlocked, setChatBlocked] = useState(false);
  const chatEndRef = useRef(null);

  // ── NAVIGATION ──
  const goPage = useCallback((p) => {
    setPage(p);
    window.scrollTo(0, 0);
    setCartOpen(false);
    setNotifOpen(false);
  }, []);

  // ── SUPABASE AUTH ──
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) { setUser(session.user); chargerProfil(session.user.id); }
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user) { setUser(session.user); chargerProfil(session.user.id); }
     else { setUser(null); setUserData(null); setUserRole(null); setNotifs([]); }
    });
    return () => subscription.unsubscribe();
  }, []);

  const chargerProfil = async (uid) => {
    const profile = await getUserProfile(uid);
    const role    = getUserRole(profile);
    setUserData(profile);
    setUserRole(role);
    // Notifs
    const { data } = await supabase.from("notifications").select("*").eq("user_id", uid).order("created_at", { ascending:false }).limit(10);
    setNotifs(data || []);
  };

  // ── PRODUITS TEMPS RÉEL ──
  useEffect(() => {
    setProduitsLoading(true);
    const load = async () => {
      let q = supabase.from("products").select("*").or("actif.eq.true,actif.is.null").order("sponsorise", { ascending:false }).order("created_at", { ascending:false }).limit(60);
      if (filterCat) q = q.eq("categorie", filterCat);
      const { data } = await q;
      setProduits(data || []);
      setProduitsLoading(false);
    };
    load();
    const channel = supabase.channel("prod_rt").on("postgres_changes", { event:"*", schema:"public", table:"products" }, load).subscribe();
    return () => supabase.removeChannel(channel);
  }, [filterCat]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior:"smooth" }); }, [chatMessages]);

  // ── AUTH ──
  const doLogin = async () => {
    setAuthError(""); setAuthLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email:authForm.email, password:authForm.password });
      if (error) throw error;
      setUser(data.user);
      await chargerProfil(data.user.id);
      setAuthOpen(false);
      // Email de bienvenue automatique (non bloquant)
      sendEmail({
        to:      authForm.email,
        subject: `Bienvenue sur Yorix, ${authForm.nom} ! 🎉`,
        html:    emailBienvenue(authForm.nom, selectedRole),
      }).catch(e => console.warn("Email bienvenue:", e));
    } catch (err) { setAuthError("Email ou mot de passe incorrect."); }
    setAuthLoading(false);
  };

  const doRegister = async () => {
    setAuthError(""); setAuthLoading(true);
    try {
      if (!authForm.nom||!authForm.email||!authForm.password||!authForm.tel) throw new Error("Tous les champs sont obligatoires.");
      if (!selectedRole) throw new Error("Veuillez choisir un profil (Acheteur, Vendeur, Livreur ou Prestataire).");

      const { data, error } = await supabase.auth.signUp({
        email: authForm.email,
        password: authForm.password,
        options: { 
  data: { 
    display_name: authForm.nom,
    nom: authForm.nom,
    telephone: authForm.tel,
    role: selectedRole
  } 
},
      });
      if (error) throw error;

      const uid = data.user?.id;
      if (!uid) throw new Error("Erreur création compte.");

      const { error: profileError } = await supabase.from("profiles").upsert({
  id:         uid,
  nom:        authForm.nom,
  email:      authForm.email,
  telephone:  authForm.tel,
  role:       selectedRole,
  langue:     "fr",
  actif:      true,
  verifie:    false,
  note:       0,
  nombre_avis: 0,
  total_commandes: 0,
});
      if (profileError) console.error("Profile insert error:", profileError);

      await supabase.from("wallets").insert({ user_id:uid, solde:0, total_gagne:0, devise:"FCFA" }).then(r => r.error && console.error(r.error));
      await chargerProfil(uid);
      setAuthOpen(false);
      setAuthForm({ nom:"", email:"", tel:"", password:"" });
    } catch (err) {
      console.error("Register error:", err);
      setAuthError(err.message.includes("already") ? "Cet email est déjà utilisé." : err.message);
    }
    setAuthLoading(false);
  };

  const doGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider:"google", options:{ redirectTo:window.location.origin } });
    if (error) setAuthError(error.message);
  };

  const doLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); setUserData(null); setUserRole(null);
    setDashTab("overview");
    goPage("home");
  };

  // ── PANIER ──
 const addToCart = useCallback((p) => {
    if (!p?.id) {
      console.warn("⚠️ Produit sans ID, ignoré:", p);
      return;
    }

    // Parser image_urls proprement (peut être string JSON ou array)
    let imgArr = [];
    if (Array.isArray(p.image_urls)) {
      imgArr = p.image_urls;
    } else if (typeof p.image_urls === "string") {
      try { imgArr = JSON.parse(p.image_urls); } catch { imgArr = []; }
    }

    // Image finale : image principale d'abord, puis première du tableau
    const img = (p.image && p.image.startsWith("http"))
      ? p.image
      : (imgArr[0] && imgArr[0].startsWith("http") ? imgArr[0] : null);

    setCartItems(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, {
        id:          p.id,
        name:        p.name_fr || p.name || "Produit",
        image:       img,
        prix:        p.prix || 0,
        qty:         1,
        vendeur_id:  p.vendeur_id || null,
        vendeur_nom: p.vendeur_nom || "",
        categorie:   p.categorie || "",
        ville:       p.ville || "",
        stock:       p.stock || null,
      }];
    });
    setCartOpen(true);
  }, []);
  const changeQty = (id, d) => setCartItems(prev => prev.map(i => i.id===id ? {...i, qty:Math.max(1,i.qty+d)} : i));
  const removeItem = (id) => setCartItems(prev => prev.filter(i => i.id!==id));
  const totalQty   = cartItems.reduce((a,i) => a+i.qty, 0);
  const totalPrice = cartItems.reduce((a,i) => a+(i.prix*i.qty), 0);

  const passerCommande = async () => {
    if (!user) { setAuthOpen(true); setCartOpen(false); return; }
    try {
      // 1️⃣ Créer les commandes
      const orderPromises = cartItems.map(item =>
        supabase.from("orders").insert({
          product_id: item.id,
          vendeur_id: item.vendeur_id,
          client_id: user.id,
          client_nom: userData?.nom || user.email,
          telephone: userData?.telephone || "",
          montant: item.prix * item.qty,
          commission: Math.round(item.prix * item.qty * COMMISSION_RATE),
          montant_vendeur: Math.round(item.prix * item.qty * (1 - COMMISSION_RATE)),
          status: "pending",
          livraison_status: "pending",
          escrow_status: "pending",
        }).select().single()
      );
      const orderResults = await Promise.all(orderPromises);
      const createdOrders = orderResults.map(r => r.data).filter(Boolean);

      // 2️⃣ Créer automatiquement les livraisons pour chaque commande
      const codesSuivis = [];
      for (const order of createdOrders) {
        const item = cartItems.find(i => i.id === order.product_id);
        try {
          const { code } = await creerLivraisonAutomatique({
            supabase,
            orderId:           order.id,
            clientNom:         userData?.nom || user.email,
            clientTel:         userData?.telephone || "",
            adresseLivraison:  userData?.ville || "Cameroun",
            adresseCollecte:   item?.ville ? `Boutique ${item.vendeur_nom || "vendeur"}, ${item.ville}` : "Boutique Yorix",
            distanceKm:        3.5,
            tempsEstimeMin:    25,
          });
          codesSuivis.push(code);
        } catch (errLiv) {
          console.warn("Livraison non créée pour commande", order.id, errLiv);
        }
      }

      // 3️⃣ Vider le panier
      setCartItems([]);
      setCartOpen(false);

      // 4️⃣ Afficher un message avec les codes de suivi
      if (codesSuivis.length > 0) {
        const codesStr = codesSuivis.join(", ");
        const msg = `✅ Commande créée avec succès !\n\n📦 Code${codesSuivis.length > 1 ? "s" : ""} de suivi : ${codesStr}\n\nVous serez contacté(e) pour le paiement. Vous pouvez suivre votre livraison sur la page Livraison.`;
        alert(msg);
      } else {
        alert("✅ Commande créée ! Vous serez contacté(e) pour le paiement.");
      }

      goPage("dashboard");
    } catch (err) {
      alert("Erreur : " + err.message);
    }
  };

  // ── CHAT ──
  const sendChat = async () => {
    if (!chatMsg.trim()) return;
    const filtre = filtrerMsg(chatMsg);
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2,"0")}`;
    if (filtre.bloque) {
      setChatBlocked(true); setTimeout(() => setChatBlocked(false), 4000);
      if (user) await supabase.from("fraud_logs").insert({ type:"tentative_contournement", user_id:user.id, message:chatMsg }).catch(e => console.warn(e?.message));
      setChatMsg(""); return;
    }
    if (user) await supabase.from("messages").insert({ expediteur_id:user.id, destinataire_id:"support", texte:chatMsg, conversation_id:`${user.id}_support`, lu:false }).catch(e => console.warn(e?.message));
    setChatMessages(prev => [...prev, { text:chatMsg, me:true, time }]);
    setChatMsg("");
    setTimeout(() => setChatMessages(prev => [...prev, { text:"Merci ! Un conseiller Yorix vous répond dans quelques minutes. ⚡", me:false, time }]), 1200);
  };

  const toggleWish = useCallback((id) => setWishlist(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; }), []);

  const marquerNotifLue = async (id) => {
    await supabase.from("notifications").update({ lu:true }).eq("id", id).catch(e => console.warn(e?.message));
    setNotifs(prev => prev.map(n => n.id===id ? {...n,lu:true} : n));
  };
  const marquerToutesLues = async () => {
    const ids = notifs.filter(n => !n.lu).map(n => n.id);
    if (ids.length) { await supabase.from("notifications").update({lu:true}).in("id",ids).catch(e => console.warn(e?.message)); setNotifs(prev => prev.map(n => ({...n,lu:true}))); }
  };

  const unread = notifs.filter(n => !n.lu).length;
  const produitsFiltres = produits.filter(p => !search || p.name_fr?.toLowerCase().includes(search.toLowerCase()) || p.description_fr?.toLowerCase().includes(search.toLowerCase()));

  const roleChipClass = () => ({ buyer:"chip-buyer", seller:"chip-seller", delivery:"chip-delivery", provider:"chip-provider" }[userRole] || "chip-buyer");

  const getDashNav = () => {
    if (userRole === "seller")   return [{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"🏪",id:"mesProduits",label:"Mes produits"},{icon:"➕",id:"ajouterProduit",label:"Ajouter produit"},{icon:"📦",id:"commandes",label:"Commandes"},{icon:"💰",id:"wallet",label:"Wallet"}];
    if (userRole === "delivery") return [{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"🟡",id:"disponibles",label:"Disponibles"},{icon:"🚚",id:"enCours",label:"En cours"},{icon:"✅",id:"historique",label:"Historique"},{icon:"💰",id:"wallet",label:"Gains"}];
    if (userRole === "provider") return [{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"📋",id:"demandes",label:"Demandes"},{icon:"🛠️",id:"mesServices",label:"Mes services"},{icon:"+",id:"ajouterService",label:"Ajouter service"}];
    return [{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"📦",id:"commandes",label:"Mes commandes"},{icon:"❤️",id:"favoris",label:"Favoris"},{icon:"🌟",id:"loyalty",label:"Fidélité"}];
  };

  const TABS = [
  {l:"🏠 Accueil",p:"home"},{l:"🛍️ Produits",p:"produits"},{l:"🚚 Livraison",p:"livraison"},
  {l:"🔐 Escrow",p:"escrow"},{l:"👷 Prestataires",p:"prestataires"},{l:"💼 Business",p:"business"},
  {l:"🎓 Academy",p:"academy"},{l:"📰 Blog",p:"blog"},{l:"🌟 Fidélité",p:"loyalty"},
  {l:"📞 Contact",p:"contact"},{l:"🆘 Aide",p:"aide"},
  ...(user && (userData?.role==="admin" || userData?.role==="superadmin")
    ? [{l:"⚙️ Admin",p:"admin"}]
    : []),
];

  if (loading) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", fontFamily:"'DM Sans',sans-serif", color:"#1a6b3a", gap:12 }}>
      <div style={{ width:40, height:40, border:"4px solid #e2ddd6", borderTopColor:"#1a6b3a", borderRadius:"50%", animation:"spin .7s linear infinite" }}/>
      Chargement de Yorix...
      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </div>
  );

  return (
    <>
      <style>{makeCSS(dark)}</style>

      {/* ── AUTH MODAL ── */}
      {/* ── MODAL DEMANDE LIVRAISON ── */}
      {demandeLivraisonOpen && (
        <ModalDemandeLivraison
          user={user}
          userData={userData}
          onClose={() => setDemandeLivraisonOpen(false)}
          onSuccess={(code) => {
            console.log("Livraison créée avec code:", code);
          }}
        />
      )}
      {authOpen && (
        <div className="modal-overlay" onClick={e => e.target===e.currentTarget && setAuthOpen(false)}>
          <div className="modal" style={{width:"100%",maxWidth:480,margin:"0 auto"}}>
            <button className="modal-close" onClick={() => setAuthOpen(false)}>✕</button>
            <div className="modal-title">{authTab==="login" ? "Bon retour ! 👋" : "Rejoindre Yorix 🇨🇲"}</div>
            <p className="modal-sub">Votre marketplace camerounaise de confiance</p>
            <div className="auth-tabs">
              <button className={`auth-tab${authTab==="login"?" active":""}`} onClick={() => { setAuthTab("login"); setAuthError(""); }}>🔑 Connexion</button>
              <button className={`auth-tab${authTab==="register"?" active":""}`} onClick={() => { setAuthTab("register"); setAuthError(""); }}>🚀 Inscription</button>
            </div>
            {authError && <div className="error-msg">⚠️ {authError}</div>}

            {authTab === "register" && (
              <>
                <div style={{background:"var(--green-pale)",border:"1px solid var(--green-light)",borderRadius:9,padding:"10px 12px",marginBottom:12,fontSize:".78rem",color:"var(--green)",fontWeight:600}}>
                  👇 Choisissez votre profil pour commencer
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
                  {[
                    {id:"buyer",   icon:"🛍️", label:"Acheteur",    desc:"J'achète des produits"},
                    {id:"seller",  icon:"🏪", label:"Vendeur",     desc:"Je vends mes produits"},
                    {id:"delivery",icon:"🚚", label:"Livreur",     desc:"J'effectue des livraisons"},
                    {id:"provider",icon:"👷", label:"Prestataire", desc:"Je propose des services"},
                  ].map(r => (
                    <div
                      key={r.id}
                      onClick={() => setSelectedRole(r.id)}
                      style={{
                        border:`2px solid ${selectedRole===r.id?"var(--green)":"var(--border)"}`,
                        borderRadius:10,padding:"12px 10px",cursor:"pointer",
                        background:selectedRole===r.id?"var(--green-pale)":"var(--surface)",
                        textAlign:"center",transition:"all .2s",
                      }}
                    >
                      <div style={{fontSize:"1.8rem",marginBottom:4}}>{r.icon}</div>
                      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem",color:"var(--ink)"}}>{r.label}</div>
                      <div style={{fontSize:".67rem",color:"var(--gray)",marginTop:2}}>{r.desc}</div>
                      {selectedRole===r.id && <div style={{marginTop:5,fontSize:".62rem",fontWeight:700,color:"var(--green)"}}>✅ Sélectionné</div>}
                    </div>
                  ))}
                </div>
                <div className="form-group">
                  <label className="form-label">Nom complet <span>*</span></label>
                  <input className="form-input" placeholder="Ex: Amina Bello" value={authForm.nom} onChange={e => setAuthForm(f=>({...f,nom:e.target.value}))}/>
                </div>
                <div className="form-group">
                  <label className="form-label">Téléphone <span>*</span></label>
                  <input className="form-input" type="tel" placeholder="+237 6XX XXX XXX" value={authForm.tel} onChange={e => setAuthForm(f=>({...f,tel:e.target.value}))}/>
                </div>
              </>
            )}
            <div className="form-group">
              <label className="form-label">Email <span>*</span></label>
              <input className="form-input" type="email" placeholder="votre@email.com" value={authForm.email} onChange={e => setAuthForm(f=>({...f,email:e.target.value}))}/>
            </div>
            <div className="form-group">
              <label className="form-label">Mot de passe <span>*</span></label>
              <input className="form-input" type="password" placeholder="••••••••" value={authForm.password} onChange={e => setAuthForm(f=>({...f,password:e.target.value}))}/>
            </div>
            <button className="form-submit" onClick={authTab==="login" ? doLogin : doRegister} disabled={authLoading} style={{fontSize:".9rem",padding:"13px"}}>
              {authLoading
                ? <><div className="spinner" style={{width:16,height:16,borderWidth:2}}/>Chargement...</>
                : authTab==="login"
                  ? "🔑 Se connecter"
                  : `🚀 Créer mon compte ${selectedRole==="buyer"?"Acheteur":selectedRole==="seller"?"Vendeur":selectedRole==="delivery"?"Livreur":"Prestataire"}`
              }
            </button>
            {authTab==="register" && (
              <p style={{fontSize:".68rem",color:"var(--gray)",textAlign:"center",marginTop:8}}>
                En vous inscrivant, vous acceptez nos conditions d'utilisation
              </p>
            )}
            <div className="divider">ou</div>
            <button className="social-btn" onClick={doGoogle}><span>🇬</span> Continuer avec Google</button>
          </div>
        </div>
      )}
      {/* ── TOPBAR ── */}
      <div className="topbar">
        <div className="topbar-l">
          <div className="flag-wrap">
            <span className="flag"><span className="fg"/><span className="fr"/><span className="fy"/></span>
            <span>Cameroun 🇨🇲</span>
          </div>
          <span>FR / EN</span>
          <span>📞 +237 696 56 56 54</span>
        </div>
        <div className="topbar-r">
          <span onClick={()=>goPage("aide")}>🆘 Aide</span>
          <span onClick={()=>goPage("contact")}>📞 Contact</span>
          {user
            ? <span style={{color:"#b7e4c7"}}>👤 {userData?.nom || user.email?.split("@")[0]}</span>
            : <span onClick={()=>{ setAuthTab("login"); setAuthOpen(true); }}>🔑 Se connecter</span>
          }
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="logo-wrap" onClick={()=>goPage("home")}>
          <div className="logo-txt">Yo<span>rix</span><sup>CM</sup></div>
        </div>

        <div className="nav-search" style={{position:"relative"}}>
          <select value={filterCat} onChange={e=>setFilterCat(e.target.value)}>
            <option value="">Tout</option>
            {CATS.map(c=><option key={c}>{c}</option>)}
          </select>
          <input
            placeholder="Rechercher un produit..."
            value={search}
            onChange={e=>setSearch(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&goPage("produits")}
            autoComplete="off"
          />
         {search.trim().length >= 2 && (
  <div style={{
    position: "absolute", top: "100%", left: 0, right: 0,
    background: "var(--bg)", border: "1px solid var(--border)",
    borderRadius: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
    zIndex: 9999, maxHeight: 320, overflowY: "auto", marginTop: 4
  }}>
    {produits
      .filter(p =>
        (p.name_fr || "").toLowerCase().includes(search.toLowerCase()) ||
        (p.description_fr || "").toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 8)
      .map(p => (
        <div
          key={p.id}
          onClick={() => {
            setSearch("");
            goPage("produits");
          }}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 14px", cursor: "pointer",
            borderBottom: "1px solid var(--border)", fontSize: 13
          }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--bg2)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          {p.image && (
            <img
              src={p.image}
              style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 6 }}
              alt=""
              onError={e => e.currentTarget.style.display = "none"}
            />
          )}
          <div>
            <div style={{ fontWeight: 500 }}>{p.name_fr}</div>
            <div style={{ color: "var(--gray)", fontSize: 12 }}>
              {p.prix?.toLocaleString()} FCFA
            </div>
          </div>
        </div>
      ))
    }
    {produits.filter(p =>
      (p.name_fr || "").toLowerCase().includes(search.toLowerCase())
    ).length === 0 && (
      <div style={{ padding: 14, color: "var(--gray)", fontSize: 13, textAlign: "center" }}>
        Aucun résultat pour "{search}"
      </div>
    )}
  </div>
)}
          <button onClick={()=>goPage("produits")}>🔍</button>
        </div>

        <div className="nav-actions">
          {/* Dark mode */}
          <button
            className="dark-toggle"
            onClick={()=>setDark(d=>!d)}
            title={dark?"Mode clair":"Mode sombre"}
          >
            {dark?"☀️":"🌙"}
          </button>

          {/* Notifs (si connecté) */}
          {user && (
            <button className="icon-btn" onClick={()=>setNotifOpen(o=>!o)} title="Notifications">
              🔔{unread>0 && <span className="ibadge">{unread}</span>}
            </button>
          )}

          {/* Panier */}
          <button className="icon-btn" onClick={()=>setCartOpen(true)} title="Mon panier">
            🛒{totalQty>0 && <span className="ibadge">{totalQty}</span>}
          </button>

          {/* Boutons Auth */}
          {!user ? (
            <>
              <button
                className="btn-ghost"
                onClick={()=>{ setAuthTab("login"); setAuthOpen(true); }}
              >
                🔑 Connexion
              </button>
              <button
                className="btn-green"
                onClick={()=>{ setAuthTab("register"); setSelectedRole("buyer"); setAuthOpen(true); }}
              >
                🚀 S'inscrire
              </button>
            </>
          ) : (
            <>
              <span className={`role-chip ${roleChipClass()}`}>
                {ROLE_LABELS[userRole||"buyer"]}
              </span>
              <div
                className="user-av"
                onClick={()=>goPage("dashboard")}
                title="Mon espace"
              >
                {(userData?.nom||user.email||"?")[0].toUpperCase()}
              </div>
              <button className="btn-red" onClick={doLogout} title="Déconnexion">
                🚪 Déconnexion
              </button>
            </>
          )}
        </div>
      </nav>

      {/* ── NOTIFICATIONS DRAWER ── */}
      {notifOpen && user && (
        <div className="notif-drawer">
          <div className="notif-header">
            <span className="notif-title">🔔 Notifications</span>
            {unread>0 && <span className="notif-clear" onClick={marquerToutesLues}>Tout marquer lu</span>}
          </div>
          <div className="notif-list">
            {notifs.length===0
              ? <div style={{padding:"24px 14px",textAlign:"center",color:"var(--gray)",fontSize:".78rem"}}>Aucune notification</div>
              : notifs.map(n=>(
                  <div
                    key={n.id}
                    className={`notif-item${!n.lu?" unread":""}`}
                    onClick={()=>marquerNotifLue(n.id)}
                  >
                    <div className="notif-icon">{n.icon||"🔔"}</div>
                    <div className="notif-body">
                      <h4>{n.titre||"Notification"}</h4>
                      <p>{n.message||""}</p>
                      <div className="notif-time">{n.created_at ? new Date(n.created_at).toLocaleString("fr-FR") : ""}</div>
                    </div>
                  </div>
                ))
            }
          </div>
        </div>
      )}

     {/* — CART — */}
      {/* ═══ CART DRAWER AMAZON STYLE ═══ */}
<div className={`cart-overlay${cartOpen?" open":""}`} onClick={()=>setCartOpen(false)}/>
<div className={`cart-drawer${cartOpen?" open":""}`}>
  {/* Header */}
  <div className="cart-header">
    <div className="cart-header-left">
      <div className="cart-header-icon">🛒</div>
      <div>
        <div className="cart-title">Mon panier</div>
        <div className="cart-subtitle">
          {totalQty === 0 ? "Vide" : `${totalQty} article${totalQty > 1 ? "s" : ""}`}
        </div>
      </div>
    </div>
    <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
  </div>

  {/* Trust bar */}
  {cartItems.length > 0 && (
    <div className="cart-trust-bar">
      <span>🔒 Paiement sécurisé</span>
      <span>🚚 Livraison rapide</span>
      <span>✅ Garantie Yorix</span>
    </div>
  )}

  {/* Empty state */}
  {cartItems.length === 0 ? (
    <div className="cart-empty">
      <div className="cart-empty-icon">🛒</div>
      <div className="cart-empty-title">Votre panier est vide</div>
      <div className="cart-empty-sub">
        Parcourez notre catalogue et ajoutez vos produits préférés pour commander.
      </div>
      <button className="cart-empty-btn" onClick={() => { setCartOpen(false); goPage("produits"); }}>
        🛍️ Explorer les produits
      </button>
    </div>
  ) : (
    <>
      {/* Items list */}
      <div className="cart-items">
        {cartItems.map(item => {
          const sousTotal = item.prix * item.qty;
          const stockBadge =
            item.stock == null ? null :
            item.stock === 0 ? { cls: "ci-tag-stock-out", txt: "❌ Rupture" } :
            item.stock <= 5 ? { cls: "ci-tag-stock-low", txt: `⚠️ ${item.stock} restants` } :
            { cls: "ci-tag-stock-ok", txt: "✅ En stock" };

          return (
            <div key={item.id} className="cart-item">
              <div className="ci-img">
                {item.image && item.image.startsWith("http")
                  ? <img src={item.image} alt={item.name} onError={e => { e.currentTarget.style.display = "none"; }} />
                  : <div className="ci-img-placeholder">📦</div>
                }
              </div>
              <div className="ci-info">
                <div className="ci-name">{item.name}</div>
                {item.vendeur_nom && (
                  <div className="ci-vendeur">🏪 Vendeur : <strong>{item.vendeur_nom}</strong></div>
                )}
                <div className="ci-meta">
                  {item.categorie && <span className="ci-tag">{item.categorie}</span>}
                  {item.ville && <span className="ci-tag">📍 {item.ville}</span>}
                  {stockBadge && <span className={`ci-tag ${stockBadge.cls}`}>{stockBadge.txt}</span>}
                </div>
                <div className="ci-bottom">
                  <div className="ci-price-block">
                    <span className="ci-unit-price">{item.prix?.toLocaleString()} FCFA / unité</span>
                    <span className="ci-total-price">{sousTotal.toLocaleString()} FCFA</span>
                  </div>
                  <div className="ci-qty">
                    <button className="qty-btn" onClick={() => changeQty(item.id, -1)}>−</button>
                    <span className="qty-val">{item.qty}</span>
                    <button className="qty-btn" onClick={() => changeQty(item.id, 1)}>+</button>
                  </div>
                </div>
              </div>
              <button className="ci-del" onClick={() => removeItem(item.id)} title="Retirer">🗑</button>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="cart-footer">
        <div className="cart-promo-row">
          🎁 <strong>Plus que {Math.max(0, 50000 - totalPrice).toLocaleString()} FCFA</strong> pour la livraison offerte !
        </div>

        <div className="cart-summary">
          <div className="cart-total-row">
            <span>Sous-total ({totalQty} article{totalQty > 1 ? "s" : ""})</span>
            <strong>{totalPrice.toLocaleString()} FCFA</strong>
          </div>
          <div className="cart-total-row">
            <span>🚚 Livraison estimée</span>
            <strong>{totalPrice >= 50000 ? "Offerte ✨" : `${LIVRAISON_FEE.toLocaleString()} FCFA`}</strong>
          </div>
          <div className="cart-total-row discount">
            <span>🔐 Protection Escrow</span>
            <strong>Incluse</strong>
          </div>
          <div className="cart-divider" />
          <div className="cart-total-row grand">
            <span>TOTAL À PAYER</span>
            <strong>{(totalPrice + (totalPrice >= 50000 ? 0 : LIVRAISON_FEE)).toLocaleString()} FCFA</strong>
          </div>
        </div>

        {/* Payment methods */}
        <div className="cart-payment-section">
          <div className="cart-payment-title">💳 Choisir un mode de paiement</div>
          <div className="cart-payment-grid">
            <button
              className="cart-pay-btn momo"
              onClick={() => {
                const total = totalPrice + (totalPrice >= 50000 ? 0 : LIVRAISON_FEE);
                const lignes = cartItems.map(i => `• ${i.name} (x${i.qty}) = ${(i.prix*i.qty).toLocaleString()} FCFA`).join("\n");
                const msg = [
                  "🛒 *NOUVELLE COMMANDE YORIX*",
                  "",
                  "💳 *Mode de paiement :* MTN Mobile Money",
                  `📱 *Numéro MoMo :* ${MOMO_NUMBER}`,
                  "",
                  "📦 *Produits commandés :*",
                  lignes,
                  "",
                  `💰 Sous-total : ${totalPrice.toLocaleString()} FCFA`,
                  `🚚 Livraison : ${totalPrice >= 50000 ? "Gratuite" : LIVRAISON_FEE.toLocaleString() + " FCFA"}`,
                  `💵 *TOTAL : ${total.toLocaleString()} FCFA*`,
                  "",
                  "👤 *Client :*",
                  `Nom : ${userData?.nom || "____"}`,
                  `Téléphone : ${userData?.telephone || "____"}`,
                  `Adresse : ____`,
                  "",
                  "✅ *Instructions :*",
                  `1. J'effectue le paiement MoMo au ${MOMO_NUMBER}`,
                  "2. J'envoie la capture du paiement sur ce WhatsApp",
                  "3. Je confirme mon adresse de livraison",
                  "",
                  "Merci Yorix ! 🇨🇲",
                ].join("\n");
                window.open(`https://wa.me/${PAYMENT_WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
              }}
            >
              <div className="cart-pay-icon">📱</div>
              <div className="cart-pay-label">MTN MoMo</div>
              <div className="cart-pay-number">{MOMO_NUMBER}</div>
            </button>

            <button
              className="cart-pay-btn orange"
              onClick={() => {
                const total = totalPrice + (totalPrice >= 50000 ? 0 : LIVRAISON_FEE);
                const lignes = cartItems.map(i => `• ${i.name} (x${i.qty}) = ${(i.prix*i.qty).toLocaleString()} FCFA`).join("\n");
                const msg = [
                  "🛒 *NOUVELLE COMMANDE YORIX*",
                  "",
                  "💳 *Mode de paiement :* Orange Money",
                  `📱 *Numéro Orange Money :* ${ORANGE_NUMBER}`,
                  "",
                  "📦 *Produits commandés :*",
                  lignes,
                  "",
                  `💰 Sous-total : ${totalPrice.toLocaleString()} FCFA`,
                  `🚚 Livraison : ${totalPrice >= 50000 ? "Gratuite" : LIVRAISON_FEE.toLocaleString() + " FCFA"}`,
                  `💵 *TOTAL : ${total.toLocaleString()} FCFA*`,
                  "",
                  "👤 *Client :*",
                  `Nom : ${userData?.nom || "____"}`,
                  `Téléphone : ${userData?.telephone || "____"}`,
                  `Adresse : ____`,
                  "",
                  "✅ *Instructions :*",
                  `1. J'effectue le paiement Orange Money au ${ORANGE_NUMBER}`,
                  "2. J'envoie la capture du paiement sur ce WhatsApp",
                  "3. Je confirme mon adresse de livraison",
                  "",
                  "Merci Yorix ! 🇨🇲",
                ].join("\n");
                window.open(`https://wa.me/${PAYMENT_WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
              }}
            >
              <div className="cart-pay-icon">🔶</div>
              <div className="cart-pay-label">Orange Money</div>
              <div className="cart-pay-number">{ORANGE_NUMBER}</div>
            </button>
          </div>

          <button
            className="cart-wa-confirm"
            onClick={() => {
              const total = totalPrice + (totalPrice >= 50000 ? 0 : LIVRAISON_FEE);
              const lignes = cartItems.map(i => `• ${i.name} (x${i.qty}) = ${(i.prix*i.qty).toLocaleString()} FCFA`).join("\n");
              const msg = [
                "🛒 *NOUVELLE COMMANDE YORIX*",
                "",
                "📦 *Produits commandés :*",
                lignes,
                "",
                `💰 Sous-total : ${totalPrice.toLocaleString()} FCFA`,
                `🚚 Livraison : ${totalPrice >= 50000 ? "Gratuite" : LIVRAISON_FEE.toLocaleString() + " FCFA"}`,
                `💵 *TOTAL : ${total.toLocaleString()} FCFA*`,
                "",
                "👤 *Client :*",
                `Nom : ${userData?.nom || "____"}`,
                `Téléphone : ${userData?.telephone || "____"}`,
                `Adresse : ____`,
                "",
                "💳 *Modes de paiement disponibles :*",
                `📱 MTN MoMo : ${MOMO_NUMBER}`,
                `🔶 Orange Money : ${ORANGE_NUMBER}`,
                "",
                "👉 Après paiement, j'envoie la capture sur ce WhatsApp.",
                "",
                "Merci Yorix ! 🇨🇲",
              ].join("\n");
              window.open(`https://wa.me/${PAYMENT_WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
            }}
          >
            💬 Commander via WhatsApp
          </button>

          <div className="cart-info-text">
            Après paiement, envoyez la capture au <strong>+237 {PAYMENT_WA_NUMBER.slice(3)}</strong><br/>
            pour valider votre commande.
          </div>
        </div>
      </div>
    </>
  )}
</div>
      {/* ── TABS ── */}
      <div className="nav-tabs">{TABS.map(t=><div key={t.p} className={`tab${page===t.p?" active":""}`} onClick={()=>goPage(t.p)}>{t.l}</div>)}</div>

      {/* ── PAY STRIP ── */}
      <div className="pay-strip">
        <b style={{color:"var(--ink)"}}>Paiement :</b>
        <div className="pay-methods"><span className="pm mtn-b">📱 MTN MoMo</span><span className="pm ora-b">🔶 Orange Money</span><span className="pm">💳 Carte</span><span className="pm">💵 Cash</span></div>
        <div className="strip-right"><span>🚚 J+1 Douala & Yaoundé</span><span>🔐 Escrow sécurisé</span>{user&&<span style={{color:"var(--gold)"}}>👤 {userData?.nom||user.email}</span>}</div>
      </div>

      {/* ════════ PAGE : ACCUEIL ════════ */}
      {page==="home"&&(
        <div className="anim">
          <Helmet>
  <title>Yorix CM — Marketplace #1 au Cameroun</title>
  <meta name="description" content="Achetez et vendez en ligne au Cameroun. 
    Paiement MTN MoMo et Orange Money. Livraison rapide à Yaoundé et Douala." />
  <meta property="og:title" content="Yorix CM — Marketplace #1 au Cameroun" />
  <meta property="og:description" content="La marketplace camerounaise 
    avec paiement mobile." />
  <meta property="og:image" content="https://yorix.cm/icons/icon-512.png" />
  <meta property="og:url" content="https://yorix.cm" />
  <meta property="og:type" content="website" />
</Helmet>

          {/* ── TRUST BANNER ── */}
          <div className="trust-banner">
            <div className="tb-item">🚚 Livraison rapide à Yaoundé &amp; Douala</div>
            <div className="tb-item">🔒 Paiement 100% sécurisé</div>
            <div className="tb-item">✅ Produits vérifiés</div>
            <div className="tb-item">📱 Support WhatsApp 7j/7</div>
          </div>

          {/* ── HERO ── */}
          <section className="hero">
            <div className="hero-inner">
              <div>
                <div className="hero-tag">🇨🇲 Marketplace #1 au Cameroun</div>
                <h1>Achetez et faites-vous<br/>livrer à <em>Yaoundé</em></h1>
                <p className="hero-sub">Produits locaux & importés · Prestataires vérifiés · Livraison express · MTN MoMo & Orange Money</p>

                {/* Badges confiance */}
                <div className="hero-badges">
                  <span className="hbadge hbadge-yellow">⭐ +2 000 avis clients</span>
                  <span className="hbadge hbadge-green">📦 +100 produits vendus</span>
                  <span className="hbadge">🔒 Paiement sécurisé</span>
                  <span className="hbadge">🚚 Livraison rapide</span>
                </div>

                <div className="hero-ctas">
                  <button className="cta-y" onClick={()=>goPage("produits")}>🛍️ Voir les produits</button>
                  <button
                    className="cta-w"
                    onClick={()=>{setCartOpen(true);}}
                  >🛒 Mon panier</button>
                </div>

                <div className="hero-stats">
                  {[["85K+","Produits"],["12K","Vendeurs"],["3K","Prestataires"],["10","Régions"]].map(([n,l])=>(
                    <div key={l}><div className="stat-num">{n}</div><div className="stat-lbl">{l}</div></div>
                  ))}
                </div>
              </div>

              <div className="hero-card">
                <div className="hc-title">🔍 Recherche rapide</div>
                <div className="sf">
                  <select value={filterCat} onChange={e=>setFilterCat(e.target.value)}>
                    <option value="">Tout</option>{CATS.map(c=><option key={c}>{c}</option>)}
                  </select>
                  <input placeholder="Produit, marque..." value={search} onChange={e=>setSearch(e.target.value)}/>
                </div>
                <div className="sf">
                  <select>{CITIES.map(c=><option key={c}>{c}</option>)}</select>
                  <input placeholder="Budget max (FCFA)"/>
                </div>
                <button className="sbtn" onClick={()=>goPage("produits")}>🔍 Rechercher</button>
                <div className="pop-row">
                  <span className="pop-lbl">Tendances :</span>
                  {["Pagne wax","iPhone","Karité","BTP"].map(s=>(
                    <span key={s} className="pop-tag" onClick={()=>{setSearch(s);goPage("produits");}}>{s}</span>
                  ))}
                </div>
                {/* Mini trust dans hero card */}
                <div style={{marginTop:12,paddingTop:10,borderTop:"1px solid rgba(255,255,255,.1)",display:"flex",flexDirection:"column",gap:4}}>
                  {["✅ Paiement sécurisé MTN MoMo","🚚 Livraison Yaoundé & Douala","🔐 Remboursement garanti Escrow"].map(t=>(
                    <div key={t} style={{fontSize:".68rem",color:"rgba(255,255,255,.65)",display:"flex",alignItems:"center",gap:5}}>{t}</div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── SOCIAL PROOF BAR ── */}
          <div className="proof-bar">
            <div className="proof-item"><span className="proof-num">2 400+</span> commandes passées</div>
            <div className="proof-item"><span className="proof-num">850+</span> vendeurs actifs</div>
            <div className="proof-item"><span className="proof-num">98%</span> satisfaction client</div>
            <div className="proof-item"><span className="proof-num">J+1</span> livraison Yaoundé</div>
          </div>

          {/* ── OFFRES FLASH DU JOUR ── */}
          <section className="sec" style={{paddingBottom:0}}>
            <div className="sec-head">
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <h2 className="sec-title">⚡ Offres Flash</h2>
                <span style={{background:"#ff4444",color:"#fff",padding:"3px 10px",borderRadius:50,fontSize:".68rem",fontWeight:800,animation:"flashPulse 1.5s infinite"}}>AUJOURD'HUI SEULEMENT</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:".75rem",color:"var(--gray)"}}>Se termine dans :</span>
                <FlashCountdown/>
              </div>
            </div>
            {/* Bandeau promo */}
            <div style={{background:"linear-gradient(135deg,#ff4444,#ff6b35)",borderRadius:12,padding:"14px 18px",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"#fff",marginBottom:3}}>🔥 Promo du jour — jusqu'à -30% sur tous les téléphones !</div>
                <div style={{fontSize:".78rem",color:"rgba(255,255,255,.75)"}}>Offre valable uniquement aujourd'hui · Paiement MTN MoMo accepté</div>
              </div>
              <button
                style={{background:"#fff",color:"#ff4444",border:"none",padding:"9px 18px",borderRadius:8,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".82rem",cursor:"pointer",whiteSpace:"nowrap"}}
                onClick={()=>{ setFilterCat("Téléphones"); goPage("produits"); }}
              >🛍️ Voir les promos</button>
            </div>
            {/* Grille flash : les 4 premiers produits avec badge flash simulé */}
            {!produitsLoading && produits.length > 0 && (
              <ProdGrid
                prods={produits.slice(0,4).map((p,i) => ({
                  ...p,
                  flash: i < 2,
                  promo: i >= 2 && i < 4,
                  promo_pct: i === 2 ? 20 : i === 3 ? 15 : 0,
                }))}
                user={user} userData={userData} onAddToCart={addToCart} onWish={toggleWish} wishlist={wishlist}
              />
            )}
          </section>

          {/* ── PRODUITS RÉCENTS ── */}
          <section className="sec">
            <div className="sec-head">
              <h2 className="sec-title">🔥 Produits populaires</h2>
              <span className="sec-link" onClick={()=>goPage("produits")}>Voir tout →</span>
            </div>
            {produitsLoading
              ? <div className="loading"><div className="spinner"/>Chargement...</div>
              : produits.length===0
                ? <div className="empty-state"><div className="empty-icon">🛍️</div><p>Aucun produit pour l'instant</p></div>
                : <ProdGrid prods={produits.slice(0,10)} user={user} userData={userData} onAddToCart={addToCart} onWish={toggleWish} wishlist={wishlist}/>
            }
          </section>

          {/* ── TRUST BAND ── */}
          <div className="trust">
            <div className="trust-inner">
              {[
                {icon:"📱",t:"MTN MoMo & Orange",p:"Paiement mobile sécurisé"},
                {icon:"🔐",t:"Escrow Yorix",p:"Fonds protégés jusqu'à livraison"},
                {icon:"🚚",t:"Livraison J+1",p:"Yaoundé & Douala"},
                {icon:"🌟",t:"Vendeurs vérifiés",p:"Boutiques certifiées"},
              ].map(t=>(
                <div key={t.t} className="ti"><div className="ti-icon">{t.icon}</div><div><h4>{t.t}</h4><p>{t.p}</p></div></div>
              ))}
            </div>
          </div>

          {/* ── POURQUOI CHOISIR YORIX ── */}
          <div className="why-section">
            <div className="why-inner">
              <div style={{textAlign:"center",marginBottom:4}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"var(--green-pale)",color:"var(--green)",padding:"4px 12px",borderRadius:50,fontSize:".72rem",fontWeight:700,marginBottom:8}}>🏆 Pourquoi nous choisissons Yorix ?</div>
                <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.3rem",fontWeight:800,color:"var(--ink)",letterSpacing:"-.5px"}}>La marketplace la plus fiable du Cameroun</h2>
              </div>
              <div className="why-grid">
                {[
                  {icon:"🚚",title:"Livraison rapide",desc:"Livraison le jour même ou J+1 sur Yaoundé et Douala. Suivi GPS en temps réel."},
                  {icon:"✅",title:"Produits vérifiés",desc:"Chaque vendeur est contrôlé. Produits authentiques garantis ou remboursés."},
                  {icon:"🔒",title:"Paiement sécurisé",desc:"MTN MoMo, Orange Money, Escrow Yorix. Votre argent libéré à la réception."},
                  {icon:"📱",title:"Support WhatsApp",desc:"Notre équipe répond 7j/7 sur WhatsApp pour vous aider à chaque étape."},
                ].map(w=>(
                  <div key={w.title} className="why-card">
                    <div className="why-icon">{w.icon}</div>
                    <div className="why-title">{w.title}</div>
                    <div className="why-desc">{w.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

         {/* — PRESTATAIRES — */}
<section className="sec">
  <div className="sec-head">
    <h2 className="sec-title">🧑‍💼 Prestataires de confiance</h2>
    <span className="sec-link" onClick={() => goPage("prestataires")}>Voir tous →</span>
  </div>
  <div className="prest-grid">
    {allServices.length === 0 ? (
      <div style={{gridColumn:"1/-1", textAlign:"center", padding:30, color:"var(--gray)"}}>
        Aucun prestataire pour le moment.
      </div>
    ) : (
      allServices.slice(0, 3).map(s => (
        <div key={s.id} className="prest-card">
          <div className="prest-top">
            <div className="prest-av">🧑‍💼</div>
            <div>
              <div className="prest-name">{s.provider_nom || "Prestataire"}</div>
              <div className="prest-meta">{s.nom}</div>
            </div>
          </div>
          <div className="prest-tags">
            {s.categorie && <span className="ptag">{s.categorie}</span>}
            {s.ville && <span className="ptag">📍 {s.ville}</span>}
          </div>
          <div className="prest-footer">
            <div>
              <div className="prest-price">{Number(s.prix).toLocaleString()} F</div>
              <div style={{fontSize:".69rem",color:"var(--gray)"}}>
                ⭐ {s.note || 0} · {s.nombre_avis || 0} avis
              </div>
            </div>
            <button 
              className="btn-hire"
              onClick={() => window.open(
                `https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent(`Bonjour, je cherche un prestataire pour : ${s.nom} (${s.provider_nom})`)}`,
                '_blank'
              )}
            >
              Contacter
            </button>
          </div>
        </div>
      ))
    )}
  </div>
</section>

          {/* ── NEWSLETTER ── */}
          <div className="newsletter">
            <div className="nl-title">📬 Restez informé(e)</div>
            <p className="nl-sub">Les meilleures offres Yorix directement dans votre boîte mail.</p>
            {nlSent
              ? <div style={{background:"rgba(255,255,255,.2)",borderRadius:8,padding:"9px 18px",color:"#fff",fontWeight:600}}>✅ Vous êtes abonné(e) !</div>
              : <div className="nl-form">
                  <input className="nl-input" placeholder="Votre email..." value={nlEmail} onChange={e=>setNlEmail(e.target.value)}/>
                  <button className="nl-btn" onClick={async()=>{if(nlEmail){await supabase.from("newsletter").insert({email:nlEmail}).catch(e => console.warn(e?.message));setNlSent(true);}}}>S'abonner 🚀</button>
                </div>
            }
          </div>

          {/* ── WA STICKY MOBILE ── */}
          <div className="wa-sticky">
            <span className="wa-sticky-text">📱 Commander maintenant</span>
            <button
              className="wa-sticky-btn"
              onClick={()=>window.open(`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent("Bonjour Yorix ! Je veux commander 🛍️")}`, "_blank")}
            >
              Commander via WhatsApp
            </button>
          </div>

        </div>
      )}

      {/* ════════ PAGE : PRODUITS ════════ */}
      {page==="produits"&&(
        <section className="sec anim">
          <div className="sec-head">
            <h2 className="sec-title">🛍️ Tous les produits</h2>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <span style={{fontSize:".8rem",color:"var(--gray)"}}>{produitsFiltres.length} résultat(s)</span>
              {filterCat && <button className="btn-ghost" style={{fontSize:".72rem",padding:"4px 10px"}} onClick={()=>setFilterCat("")}>✕ {filterCat}</button>}
            </div>
          </div>
          {/* Filtres catégories */}
          <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:18}}>
            <button onClick={()=>setFilterCat("")} style={{padding:"5px 12px",borderRadius:50,border:"1.5px solid var(--border)",background:!filterCat?"var(--green)":"var(--surface)",color:!filterCat?"#fff":"var(--ink)",font:"600 .72rem 'DM Sans',sans-serif",cursor:"pointer"}}>Tout</button>
            {CATS.map(c=><button key={c} onClick={()=>setFilterCat(c)} style={{padding:"5px 12px",borderRadius:50,border:"1.5px solid var(--border)",background:filterCat===c?"var(--green)":"var(--surface)",color:filterCat===c?"#fff":"var(--ink)",font:"600 .72rem 'DM Sans',sans-serif",cursor:"pointer"}}>{c}</button>)}
          </div>
          {produitsLoading?<div className="loading"><div className="spinner"/>Chargement...</div>
            :produitsFiltres.length===0?<div className="empty-state"><div className="empty-icon">🔍</div><p>Aucun produit{search?` pour "${search}"`:""}.</p></div>
            :<ProdGrid prods={produitsFiltres} user={user} userData={userData} onAddToCart={addToCart} onWish={toggleWish} wishlist={wishlist}/>}
        </section>
      )}

     {/* ════════ PAGE : LIVRAISON ════════ */}
      {page==="livraison"&&(
        <div className="anim">
          <section className="sec">

            {/* ═══ SUIVI TEMPS RÉEL ═══ */}
            <DeliveryTracker />

            {/* ── HERO LIVRAISON ── */}
            <div style={{background:"linear-gradient(135deg,#0a1410,#1a3a24,#0d3320)",borderRadius:16,padding:28,color:"#fff",marginBottom:20,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:-20,right:-20,width:160,height:160,background:"rgba(79,209,125,.06)",borderRadius:"50%"}}/>
              <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(252,209,22,.14)",color:"var(--yellow)",border:"1px solid rgba(252,209,22,.28)",padding:"4px 12px",borderRadius:50,fontSize:".72rem",fontWeight:700,marginBottom:14}}>
                🛵 Yorix Ride — Livraison Express Cameroun
              </div>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.5rem",fontWeight:800,marginBottom:8,lineHeight:1.2}}>
                Livraison à domicile<br/><span style={{color:"#4fd17d"}}>comme Uber, partout au Cameroun</span>
              </h2>
              <p style={{color:"rgba(255,255,255,.6)",fontSize:".85rem",lineHeight:1.75,marginBottom:20,maxWidth:480}}>
                Commandez un produit, un livreur proche de vous accepte la mission en quelques secondes. Suivi GPS en temps réel, paiement à la livraison.
              </p>

              {/* Stats livraison */}
              <div style={{display:"flex",gap:20,flexWrap:"wrap",marginBottom:20}}>
                {[["🏍️","850+","Livreurs actifs"],["⏱️","~25 min","Temps moyen"],["⭐","4.8/5","Note moyenne"],["📦","12K+","Livraisons/mois"]].map(([ic,val,lbl])=>(
                  <div key={lbl}>
                    <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}>
                      <span style={{fontSize:"1rem"}}>{ic}</span>
                      <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"var(--yellow)"}}>{val}</span>
                    </div>
                    <div style={{fontSize:".62rem",color:"rgba(255,255,255,.35)"}}>{lbl}</div>
                  </div>
                ))}
              </div>

              {/* CTA commander livraison */}
              <div style={{display:"flex", gap:10, flexWrap:"wrap"}}>
                <button
                  style={{background:"var(--yellow)",color:"#0d1f14",border:"none",padding:"11px 20px",borderRadius:9,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",cursor:"pointer"}}
                  onClick={() => setDemandeLivraisonOpen(true)}
                >📦 Demander une livraison</button>
                <button
                  style={{background:"rgba(255,255,255,.09)",color:"#fff",border:"1px solid rgba(255,255,255,.2)",padding:"11px 20px",borderRadius:9,fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".85rem",cursor:"pointer"}}
                  onClick={()=>{ setAuthTab("register"); setSelectedRole("delivery"); setAuthOpen(true); }}
                >🏍️ Devenir livreur Yorix</button>
              </div>
            </div>

            {/* ── COMMENT ÇA MARCHE ── */}
            <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:22,marginBottom:20}}>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"var(--ink)",marginBottom:16,letterSpacing:"-.3px"}}>🗺️ Comment fonctionne Yorix Ride ?</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
                {[
                  {n:1,icon:"🛍️",t:"Vous commandez",d:"Passez commande sur Yorix ou via WhatsApp"},
                  {n:2,icon:"🏍️",t:"Livreur assigné",d:"Un livreur proche accepte votre mission en quelques secondes"},
                  {n:3,icon:"📍",t:"Suivi en direct",d:"Suivez votre livreur sur la carte en temps réel"},
                  {n:4,icon:"✅",t:"Livraison confirmée",d:"Réceptionnez et confirmez. Paiement libéré au livreur."},
                ].map(s=>(
                  <div key={s.n} style={{textAlign:"center",padding:"14px 10px",background:"var(--surface2)",borderRadius:10}}>
                    <div style={{width:28,height:28,background:"var(--green)",color:"#fff",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".78rem",margin:"0 auto 8px"}}>{s.n}</div>
                    <div style={{fontSize:"1.4rem",marginBottom:5}}>{s.icon}</div>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem",color:"var(--ink)",marginBottom:3}}>{s.t}</div>
                    <div style={{fontSize:".68rem",color:"var(--gray)",lineHeight:1.5}}>{s.d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── TARIFS ── */}
            <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:22,marginBottom:20}}>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"var(--ink)",marginBottom:14}}>💰 Tarifs de livraison</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
                {[
                  {zone:"🏙️ Intra-ville",prix:"500 – 1 500 FCFA",delai:"20 – 45 min",dispo:"Douala, Yaoundé"},
                  {zone:"🌆 Inter-quartiers",prix:"1 500 – 3 000 FCFA",delai:"1h – 2h",dispo:"Bafoussam, Bamenda"},
                  {zone:"🗺️ Inter-villes",prix:"3 000 – 8 000 FCFA",delai:"J+1",dispo:"Tout le Cameroun"},
                ].map(t=>(
                  <div key={t.zone} style={{background:"var(--surface2)",borderRadius:10,padding:14,border:"1px solid var(--border)"}}>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".84rem",color:"var(--ink)",marginBottom:5}}>{t.zone}</div>
                    <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1rem",fontWeight:800,color:"var(--green)",marginBottom:3}}>{t.prix}</div>
                    <div style={{fontSize:".69rem",color:"var(--gray)",marginBottom:2}}>⏱ {t.delai}</div>
                    <div style={{fontSize:".65rem",color:"var(--gray)"}}>{t.dispo}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── LIVREURS DISPONIBLES ── */}
            <div>
              <div className="sec-head"><h3 className="sec-title">🏍️ Livreurs disponibles maintenant</h3></div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                {[
                  {emoji:"🏍️",name:"Jean-Pierre M.",sub:"Moto · Douala · Akwa",livraisons:342,note:4.9,dispo:true,temps:"~15 min",vehicule:"Moto"},
                  {emoji:"🚐",name:"Augustin N.",sub:"Minibus · Yaoundé · Bastos",livraisons:218,note:4.8,dispo:true,temps:"~20 min",vehicule:"Minibus"},
                  {emoji:"🚗",name:"Grace T.",sub:"Voiture · Douala · Bonanjo",livraisons:156,note:5.0,dispo:true,temps:"~10 min",vehicule:"Voiture"},
                  {emoji:"🚚",name:"Fabrice K.",sub:"Camionnette · Bafoussam",livraisons:189,note:4.7,dispo:false,temps:null,vehicule:"Camionnette"},
                  {emoji:"🏍️",name:"Bertrand A.",sub:"Moto · Yaoundé · Mvan",livraisons:271,note:4.8,dispo:true,temps:"~18 min",vehicule:"Moto"},
                  {emoji:"🚐",name:"Carine M.",sub:"Minibus · Douala · Bonapriso",livraisons:98,note:4.9,dispo:false,temps:null,vehicule:"Minibus"},
                ].map(d=>(
                  <div key={d.name} style={{background:d.dispo?"var(--surface)":"var(--surface2)",border:`1.5px solid ${d.dispo?"var(--green-light)":"var(--border)"}`,borderRadius:12,padding:15,opacity:d.dispo?1:.7,transition:"all .2s"}}>
                    <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:10}}>
                      <div style={{width:44,height:44,borderRadius:"50%",background:d.dispo?"var(--green)":"var(--border)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",flexShrink:0}}>{d.emoji}</div>
                      <div style={{flex:1}}>
                        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".86rem",color:"var(--ink)"}}>{d.name}</div>
                        <div style={{fontSize:".65rem",color:"var(--gray)",lineHeight:1.4}}>{d.sub}</div>
                      </div>
                    </div>
                    <div style={{display:"flex",gap:8,marginBottom:8}}>
                      <div style={{background:"var(--surface2)",borderRadius:7,padding:"4px 8px",fontSize:".67rem",fontWeight:600,color:"var(--ink)"}}>⭐ {d.note}</div>
                      <div style={{background:"var(--surface2)",borderRadius:7,padding:"4px 8px",fontSize:".67rem",fontWeight:600,color:"var(--ink)"}}>📦 {d.livraisons} livraisons</div>
                    </div>
                    <div style={{fontSize:".67rem",marginBottom:10,fontWeight:600,color:d.dispo?"#27a85a":"var(--gray)"}}>
                      {d.dispo
                        ? <><span style={{width:6,height:6,background:"#4fd17d",borderRadius:"50%",display:"inline-block",marginRight:4}}/>Disponible · {d.temps}</>
                        : "⏸️ Non disponible pour le moment"
                      }
                    </div>
                   <button
                      style={{width:"100%",background:d.dispo?"var(--green)":"var(--border)",color:d.dispo?"#fff":"var(--gray)",border:"none",padding:"8px",borderRadius:8,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".75rem",cursor:d.dispo?"pointer":"default"}}
                      onClick={() => d.dispo && setDemandeLivraisonOpen(true)}
                    >{d.dispo?"📦 Demander livraison":"⏳ Voir plus tard"}</button>
                  </div>
                ))}
              </div>
            </div>

            {/* ── REJOINDRE COMME LIVREUR ── */}
            <div style={{background:"linear-gradient(135deg,#1a3a24,#0d3320)",borderRadius:14,padding:24,marginTop:20,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",color:"#fff",marginBottom:5}}>🏍️ Devenez livreur Yorix</div>
                <div style={{color:"rgba(255,255,255,.6)",fontSize:".82rem",lineHeight:1.6,maxWidth:360}}>Gagnez 15 000 – 80 000 FCFA/mois selon votre activité. Horaires libres, votre propre véhicule, paiement quotidien.</div>
                <div style={{display:"flex",gap:10,marginTop:10,flexWrap:"wrap"}}>
                  {["✅ Paiement quotidien","🕐 Horaires libres","🏍️ Votre véhicule"].map(t=><span key={t} style={{background:"rgba(255,255,255,.1)",color:"rgba(255,255,255,.8)",padding:"3px 9px",borderRadius:50,fontSize:".67rem"}}>{t}</span>)}
                </div>
              </div>
              <button
                style={{background:"var(--yellow)",color:"#0d1f14",border:"none",padding:"12px 22px",borderRadius:10,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",cursor:"pointer",whiteSpace:"nowrap"}}
                onClick={()=>{ setAuthTab("register"); setSelectedRole("delivery"); setAuthOpen(true); }}
              >🚀 S'inscrire comme livreur</button>
            </div>

          </section>
        </div>
      )}

      {/* ════════ PAGE : ESCROW ════════ */}
      {page==="escrow"&&(
        <section className="sec anim">
          <div style={{background:dark?"#152118":"#f0faf4",border:`1.5px solid ${dark?"#2a4030":"#c0ecd0"}`,borderRadius:14,padding:28,marginBottom:20}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"var(--green)",color:"#fff",padding:"4px 12px",borderRadius:50,fontSize:".7rem",fontWeight:700,marginBottom:12}}>🔐 Escrow Yorix</div>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.4rem",fontWeight:800,color:"var(--ink)",marginBottom:10,letterSpacing:"-.5px"}}>Votre argent protégé jusqu'à la livraison</h2>
            <p style={{color:"var(--gray)",fontSize:".86rem",lineHeight:1.75,marginBottom:20}}>Votre argent reste bloqué chez Yorix jusqu'à ce que vous confirmiez la réception. En cas de litige, nous vous remboursons.</p>
            <div className="escrow-steps">
              {[{n:1,t:"Vous commandez",d:"Votre paiement est bloqué · statut : pending"},{n:2,t:"Vendeur expédie",d:"Les fonds passent au statut : sécurisé 🔐"},{n:3,t:"Vous confirmez",d:"Fonds libérés au vendeur · statut : libéré ✅"},{n:4,t:"Litige ? Yorix arbitre",d:"Remboursement sous 48h · statut : remboursé ↩️"}].map(s=>(
                <div key={s.n} className="estep"><div className="estep-num">{s.n}</div><div className="estep-text"><h4>{s.t}</h4><p>{s.d}</p></div></div>
              ))}
            </div>
          </div>
          <div className="sec-head"><h2 className="sec-title">Produits avec protection Escrow</h2></div>
          {produitsLoading?<div className="loading"><div className="spinner"/>Chargement...</div>
            :<ProdGrid prods={produits.filter(p=>p.escrow).slice(0,10)} user={user} userData={userData} onAddToCart={addToCart} onWish={toggleWish} wishlist={wishlist}/>}
        </section>
      )}

     {/* ════════ PAGE : PRESTATAIRES — VERSION PREMIUM ════════ */}
      {page==="prestataires"&&(
        <section className="sec anim">

          {/* ── HERO PRESTATAIRES ── */}
          <div style={{
            background: "linear-gradient(135deg, #0a1410 0%, #1a3a24 50%, #0d3320 100%)",
            borderRadius: 16,
            padding: "32px 28px",
            color: "#fff",
            marginBottom: 24,
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -40, right: -40, width: 200, height: 200,
              background: "rgba(252,209,22,.08)", borderRadius: "50%",
            }}/>
            <div style={{
              position: "absolute", bottom: -60, left: -50, width: 180, height: 180,
              background: "rgba(79,209,125,.06)", borderRadius: "50%",
            }}/>

            <div style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 24, alignItems: "center" }}>
              <div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "rgba(252,209,22,.14)", color: "var(--yellow)",
                  border: "1px solid rgba(252,209,22,.28)",
                  padding: "5px 14px", borderRadius: 50,
                  fontSize: ".72rem", fontWeight: 700, marginBottom: 14,
                }}>
                  👷 Prestataires Yorix
                </div>
                <h1 style={{
                  fontFamily: "'Syne',sans-serif", fontSize: "1.9rem", fontWeight: 800,
                  marginBottom: 10, letterSpacing: "-.5px", lineHeight: 1.15,
                }}>
                  Trouve le <span style={{ color: "var(--yellow)" }}>professionnel idéal</span> près de chez toi
                </h1>
                <p style={{
                  color: "rgba(255,255,255,.65)", fontSize: ".88rem",
                  maxWidth: 460, lineHeight: 1.7, marginBottom: 18,
                }}>
                  Plombiers, électriciens, photographes, coiffeuses, traiteurs... Tous vérifiés, notés et disponibles partout au Cameroun.
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button
                    onClick={() => goPage("inscription")}
                    style={{
                      background: "var(--yellow)", color: "#0d1f14", border: "none",
                      padding: "11px 20px", borderRadius: 10,
                      fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".85rem",
                      cursor: "pointer", boxShadow: "0 4px 12px rgba(252,209,22,.25)",
                    }}
                  >
                    🚀 Devenir prestataire
                  </button>
                  <button
                    onClick={() => window.open(`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent("Bonjour Yorix ! Je cherche un prestataire.")}`, "_blank")}
                    style={{
                      background: "rgba(255,255,255,.1)", color: "#fff",
                      border: "1px solid rgba(255,255,255,.2)",
                      padding: "11px 20px", borderRadius: 10,
                      fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".85rem",
                      cursor: "pointer",
                    }}
                  >
                    💬 Besoin d'aide ?
                  </button>
                </div>
              </div>

              <div style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.1)",
                borderRadius: 12, padding: 18, backdropFilter: "blur(10px)",
              }}>
                <div style={{ fontSize: ".7rem", color: "rgba(255,255,255,.5)", fontWeight: 600, marginBottom: 12 }}>
                  📊 LA MARKETPLACE DE SERVICES
                </div>
                {[
                  { icon: "👷", val: "850+", lbl: "Prestataires actifs" },
                  { icon: "✅", val: "100%", lbl: "Profils vérifiés" },
                  { icon: "⭐", val: "4.8/5", lbl: "Note moyenne" },
                  { icon: "📍", val: "10+", lbl: "Villes couvertes" },
                ].map(s => (
                  <div key={s.lbl} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "6px 0",
                  }}>
                    <span style={{ fontSize: "1.1rem" }}>{s.icon}</span>
                    <span style={{
                      fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1rem",
                      color: "var(--yellow)", minWidth: 50,
                    }}>{s.val}</span>
                    <span style={{ fontSize: ".72rem", color: "rgba(255,255,255,.6)" }}>{s.lbl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── BARRE DE RECHERCHE + FILTRES ── */}
          <div style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 12, padding: 16, marginBottom: 20,
            display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center",
          }}>
            <input
              placeholder="🔍 Rechercher un prestataire, métier..."
              value={prestSearch}
              onChange={e => setPrestSearch(e.target.value)}
              style={{
                flex: "2 1 220px", minWidth: 200,
                padding: "10px 14px", borderRadius: 9,
                border: "1.5px solid var(--border)",
                background: "var(--surface2)", color: "var(--ink)",
                fontFamily: "'DM Sans',sans-serif", fontSize: ".85rem",
                outline: "none",
              }}
            />
            <select
              value={prestCatFilter}
              onChange={e => setPrestCatFilter(e.target.value)}
              style={{
                flex: "1 1 160px", padding: "10px 14px", borderRadius: 9,
                border: "1.5px solid var(--border)",
                background: "var(--surface2)", color: "var(--ink)",
                fontFamily: "'DM Sans',sans-serif", fontSize: ".85rem",
                outline: "none", cursor: "pointer",
              }}
            >
              <option value="">Toutes catégories</option>
              {Array.from(new Set(PREST_DATA.map(p => p.categorie))).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              value={prestVilleFilter}
              onChange={e => setPrestVilleFilter(e.target.value)}
              style={{
                flex: "1 1 140px", padding: "10px 14px", borderRadius: 9,
                border: "1.5px solid var(--border)",
                background: "var(--surface2)", color: "var(--ink)",
                fontFamily: "'DM Sans',sans-serif", fontSize: ".85rem",
                outline: "none", cursor: "pointer",
              }}
            >
              <option value="">Toutes villes</option>
              {CITIES.filter(c => c !== "Toutes les villes").map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {(prestSearch || prestCatFilter || prestVilleFilter) && (
              <button
                onClick={() => { setPrestSearch(""); setPrestCatFilter(""); setPrestVilleFilter(""); }}
                style={{
                  background: "var(--surface2)", color: "var(--ink)",
                  border: "1.5px solid var(--border)", borderRadius: 9,
                  padding: "10px 14px", cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".78rem",
                }}
              >
                ✕ Effacer
              </button>
            )}
          </div>

          {/* ── CATÉGORIES RAPIDES ── */}
          <div style={{
            display: "flex", gap: 10, flexWrap: "wrap",
            marginBottom: 24, overflowX: "auto", paddingBottom: 4,
          }}>
            {[
              { cat: "", label: "🌟 Tous", color: "var(--green)" },
              { cat: "Plomberie", label: "🔧 Plomberie", color: "#3b82f6" },
              { cat: "Électricité", label: "⚡ Électricité", color: "#f59e0b" },
              { cat: "Photographie", label: "📸 Photo", color: "#8b5cf6" },
              { cat: "Graphisme", label: "🎨 Design", color: "#ec4899" },
              { cat: "Nettoyage", label: "🧹 Nettoyage", color: "#10b981" },
              { cat: "Informatique", label: "💻 Tech", color: "#06b6d4" },
              { cat: "Menuiserie", label: "🪚 Menuiserie", color: "#f97316" },
              { cat: "Cuisine", label: "👩‍🍳 Traiteur", color: "#ef4444" },
              { cat: "Beauté", label: "💇‍♀️ Beauté", color: "#d946ef" },
            ].map(c => (
              <button
                key={c.label}
                onClick={() => setPrestCatFilter(c.cat)}
                style={{
                  background: prestCatFilter === c.cat ? c.color : "var(--surface)",
                  color: prestCatFilter === c.cat ? "#fff" : "var(--ink)",
                  border: `1.5px solid ${prestCatFilter === c.cat ? c.color : "var(--border)"}`,
                  borderRadius: 50, padding: "7px 16px",
                  fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".76rem",
                  cursor: "pointer", whiteSpace: "nowrap",
                  transition: "all .2s",
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* ── SECTION PRESTATAIRES VEDETTES ── */}
          {(() => {
            // Combiner prestataires factices + réels Supabase
            const realPrests = (allServices || []).map(s => ({
              id: `real-${s.id}`,
              name: s.provider_nom || "Prestataire Yorix",
              metier: s.nom || "Service",
              categorie: s.categorie || "Autre",
              ville: s.ville || "Cameroun",
              quartier: "",
              emoji: "🛠️",
              photo: null,
              color_bg: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
              tags: [s.categorie || "Service"].filter(Boolean),
              note: s.note || 5.0,
              avis: s.nombre_avis || 0,
              prix: `${Number(s.prix || 0).toLocaleString("fr-FR")} FCFA`,
              experience: "Nouveau",
              verifie: false,
              top: false,
              dispo: s.disponible !== false,
              bio: s.description || "Service de qualité sur Yorix.",
              telephone: "",
              realisations: 0,
              isReal: true,
            }));

            const allPrests = [...PREST_DATA, ...realPrests];

            // Filtrage
            const filtered = allPrests.filter(p => {
              if (prestSearch) {
                const s = prestSearch.toLowerCase();
                if (!p.name.toLowerCase().includes(s)
                  && !p.metier.toLowerCase().includes(s)
                  && !p.categorie.toLowerCase().includes(s)
                  && !(p.tags || []).some(t => t.toLowerCase().includes(s)))
                  return false;
              }
              if (prestCatFilter && p.categorie !== prestCatFilter) return false;
              if (prestVilleFilter && p.ville !== prestVilleFilter) return false;
              return true;
            });

            const topPrests = filtered.filter(p => p.top);
            const otherPrests = filtered.filter(p => !p.top);

            return (
              <>
                {/* Résultat count */}
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  marginBottom: 16,
                }}>
                  <div style={{
                    fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".95rem",
                    color: "var(--ink)",
                  }}>
                    {filtered.length} prestataire{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
                  </div>
                </div>

                {/* ── TOP PRESTATAIRES ── */}
                {topPrests.length > 0 && (
                  <>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8,
                      marginBottom: 14,
                    }}>
                      <span style={{ fontSize: "1.2rem" }}>⭐</span>
                      <h3 style={{
                        fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.05rem",
                        color: "var(--ink)", margin: 0,
                      }}>
                        Top prestataires
                      </h3>
                      <span style={{
                        background: "var(--yellow)", color: "#0d1f14",
                        fontSize: ".62rem", fontWeight: 800,
                        padding: "2px 8px", borderRadius: 50,
                      }}>
                        RECOMMANDÉS
                      </span>
                    </div>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
                      gap: 16, marginBottom: 28,
                    }}>
                      {topPrests.map(p => (
                        <PrestCard key={p.id} p={p} onClick={() => setSelectedPrest(p)} />
                      ))}
                    </div>
                  </>
                )}

                {/* ── AUTRES PRESTATAIRES ── */}
                {otherPrests.length > 0 && (
                  <>
                    {topPrests.length > 0 && (
                      <h3 style={{
                        fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.05rem",
                        color: "var(--ink)", marginBottom: 14,
                      }}>
                        👷 Tous les prestataires
                      </h3>
                    )}
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
                      gap: 16,
                    }}>
                      {otherPrests.map(p => (
                        <PrestCard key={p.id} p={p} onClick={() => setSelectedPrest(p)} />
                      ))}
                    </div>
                  </>
                )}

                {/* ── AUCUN RÉSULTAT ── */}
                {filtered.length === 0 && (
                  <div className="empty-state" style={{ padding: "60px 20px" }}>
                    <div className="empty-icon">🔍</div>
                    <p>Aucun prestataire ne correspond à ta recherche.</p>
                    <button
                      onClick={() => { setPrestSearch(""); setPrestCatFilter(""); setPrestVilleFilter(""); }}
                      style={{
                        background: "var(--green)", color: "#fff", border: "none",
                        padding: "10px 22px", borderRadius: 9, marginTop: 14,
                        fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".82rem",
                        cursor: "pointer",
                      }}
                    >
                      🔄 Voir tous les prestataires
                    </button>
                  </div>
                )}
              </>
            );
          })()}

          {/* ── COMMENT ÇA MARCHE ── */}
          <div style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 14, padding: 24, marginTop: 32,
          }}>
            <h3 style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.1rem",
              color: "var(--ink)", marginBottom: 18, textAlign: "center",
              letterSpacing: "-.3px",
            }}>
              🗺️ Comment ça fonctionne ?
            </h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 14,
            }}>
              {[
                { n: 1, icon: "🔍", t: "Cherche", d: "Filtre par métier, ville ou note" },
                { n: 2, icon: "💬", t: "Contacte", d: "WhatsApp direct avec le prestataire" },
                { n: 3, icon: "🤝", t: "Négocie", d: "Discute du tarif et des détails" },
                { n: 4, icon: "⭐", t: "Évalue", d: "Laisse un avis après la prestation" },
              ].map(s => (
                <div key={s.n} style={{
                  textAlign: "center", padding: "14px 10px",
                  background: "var(--surface2)", borderRadius: 10,
                  border: "1px solid var(--border)",
                }}>
                  <div style={{
                    width: 32, height: 32, background: "var(--green)", color: "#fff",
                    borderRadius: "50%", display: "flex", alignItems: "center",
                    justifyContent: "center", fontFamily: "'Syne',sans-serif",
                    fontWeight: 800, fontSize: ".82rem", margin: "0 auto 10px",
                  }}>{s.n}</div>
                  <div style={{ fontSize: "1.6rem", marginBottom: 6 }}>{s.icon}</div>
                  <div style={{
                    fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".85rem",
                    color: "var(--ink)", marginBottom: 4,
                  }}>{s.t}</div>
                  <div style={{ fontSize: ".72rem", color: "var(--gray)", lineHeight: 1.5 }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA DEVENIR PRESTATAIRE ── */}
          <div style={{
            background: "linear-gradient(135deg, var(--green-pale), #fef9e0)",
            border: "2px solid var(--green-light)", borderRadius: 14,
            padding: "28px 24px", marginTop: 24,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 16,
          }}>
            <div style={{ flex: "1 1 300px" }}>
              <h3 style={{
                fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.15rem",
                color: "var(--ink)", marginBottom: 8, letterSpacing: "-.3px",
              }}>
                🚀 Tu es un professionnel ?
              </h3>
              <p style={{
                fontSize: ".86rem", color: "var(--gray)", lineHeight: 1.6, marginBottom: 12,
              }}>
                Rejoins les 850+ prestataires Yorix. Obtiens de nouveaux clients chaque semaine, gère tes prestations et bâtis ta réputation.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["✅ Inscription gratuite", "📱 Clients via WhatsApp", "⭐ Système de notation"].map(t => (
                  <span key={t} style={{
                    background: "var(--surface)", color: "var(--ink)",
                    padding: "4px 11px", borderRadius: 50, fontSize: ".7rem",
                    fontWeight: 600, border: "1px solid var(--border)",
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => goPage("inscription")}
              style={{
                background: "var(--green)", color: "#fff", border: "none",
                padding: "13px 26px", borderRadius: 10,
                fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".9rem",
                cursor: "pointer", whiteSpace: "nowrap",
                boxShadow: "0 4px 12px rgba(26,107,58,.25)",
              }}
            >
              🎯 Devenir prestataire
            </button>
          </div>

          {/* ── MODAL DÉTAIL PRESTATAIRE ── */}
          {selectedPrest && (
            <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setSelectedPrest(null)}>
              <div className="modal" style={{ maxWidth: 540 }}>
                <button className="modal-close" onClick={() => setSelectedPrest(null)}>✕</button>

                {/* Photo/Avatar */}
                <div style={{
                  background: selectedPrest.color_bg || "var(--green-pale)",
                  borderRadius: 12, padding: 24, marginBottom: 16,
                  textAlign: "center", position: "relative", overflow: "hidden",
                }}>
                  {selectedPrest.photo ? (
                    <img
                      src={selectedPrest.photo}
                      alt={selectedPrest.name}
                      style={{
                        width: 100, height: 100, borderRadius: "50%",
                        objectFit: "cover", border: "4px solid #fff",
                        boxShadow: "0 6px 20px rgba(0,0,0,.15)",
                      }}
                      onError={e => { e.currentTarget.style.display = "none"; }}
                    />
                  ) : (
                    <div style={{
                      width: 100, height: 100, borderRadius: "50%",
                      background: "var(--green)", color: "#fff", fontSize: "3rem",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      border: "4px solid #fff", boxShadow: "0 6px 20px rgba(0,0,0,.15)",
                    }}>
                      {selectedPrest.emoji}
                    </div>
                  )}

                  <div style={{
                    fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.25rem",
                    color: "var(--ink)", marginTop: 12,
                  }}>
                    {selectedPrest.name}
                    {selectedPrest.verifie && (
                      <span style={{ marginLeft: 6, fontSize: ".82rem", color: "var(--green)" }}>✅</span>
                    )}
                  </div>
                  <div style={{ fontSize: ".82rem", color: "var(--gray)", marginTop: 3 }}>
                    {selectedPrest.metier} · 📍 {selectedPrest.ville}
                    {selectedPrest.quartier && `, ${selectedPrest.quartier}`}
                  </div>
                  {selectedPrest.top && (
                    <span style={{
                      display: "inline-block", marginTop: 8,
                      background: "var(--yellow)", color: "#0d1f14",
                      padding: "3px 10px", borderRadius: 50,
                      fontSize: ".65rem", fontWeight: 800,
                      fontFamily: "'Syne',sans-serif",
                    }}>
                      ⭐ TOP PRESTATAIRE
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div style={{
                  display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8,
                  marginBottom: 16,
                }}>
                  {[
                    { icon: "⭐", val: selectedPrest.note, lbl: `${selectedPrest.avis} avis` },
                    { icon: "📦", val: selectedPrest.realisations, lbl: "réalisations" },
                    { icon: "💼", val: selectedPrest.experience, lbl: "expérience" },
                  ].map(s => (
                    <div key={s.lbl} style={{
                      background: "var(--surface2)", borderRadius: 9, padding: 10,
                      textAlign: "center", border: "1px solid var(--border)",
                    }}>
                      <div style={{ fontSize: "1rem", marginBottom: 2 }}>{s.icon}</div>
                      <div style={{
                        fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".88rem",
                        color: "var(--ink)",
                      }}>
                        {s.val}
                      </div>
                      <div style={{ fontSize: ".62rem", color: "var(--gray)" }}>{s.lbl}</div>
                    </div>
                  ))}
                </div>

                {/* Bio */}
                {selectedPrest.bio && (
                  <div style={{
                    background: "var(--surface2)", borderRadius: 10, padding: 14,
                    marginBottom: 14,
                  }}>
                    <div style={{
                      fontSize: ".7rem", fontWeight: 700, color: "var(--gray)",
                      marginBottom: 6,
                    }}>
                      📝 À PROPOS
                    </div>
                    <p style={{ fontSize: ".84rem", color: "var(--ink)", lineHeight: 1.6 }}>
                      {selectedPrest.bio}
                    </p>
                  </div>
                )}

                {/* Tags */}
                {selectedPrest.tags && selectedPrest.tags.length > 0 && (
                  <div style={{ marginBottom: 14 }}>
                    <div style={{
                      fontSize: ".7rem", fontWeight: 700, color: "var(--gray)",
                      marginBottom: 8,
                    }}>
                      🏷️ SPÉCIALITÉS
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {selectedPrest.tags.map(t => (
                        <span key={t} style={{
                          background: "var(--green-pale)", color: "var(--green)",
                          border: "1px solid var(--green-light)",
                          padding: "4px 12px", borderRadius: 50,
                          fontSize: ".72rem", fontWeight: 600,
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prix */}
                <div style={{
                  background: "var(--green-pale)", border: "1px solid var(--green-light)",
                  borderRadius: 10, padding: 14, marginBottom: 16,
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <div>
                    <div style={{ fontSize: ".7rem", color: "var(--gray)", fontWeight: 700 }}>TARIF</div>
                    <div style={{
                      fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.2rem",
                      color: "var(--green)",
                    }}>
                      {selectedPrest.prix}
                    </div>
                  </div>
                  {selectedPrest.dispo && (
                    <span style={{
                      background: "#e6fff0", color: "#1a6b3a",
                      padding: "5px 12px", borderRadius: 50,
                      fontSize: ".72rem", fontWeight: 700,
                      border: "1px solid #86efac",
                    }}>
                      🟢 Disponible
                    </span>
                  )}
                </div>

                {/* Boutons action */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <button
                    onClick={() => window.open(`https://wa.me/${(selectedPrest.telephone || YORIX_WA_NUMBER).replace(/\D/g, "")}?text=${encodeURIComponent(`Bonjour ${selectedPrest.name} ! Je vous contacte via Yorix pour une prestation de ${selectedPrest.categorie}. Pouvez-vous m'aider ?`)}`, "_blank")}
                    style={{
                      background: "#25D366", color: "#fff", border: "none",
                      padding: "12px", borderRadius: 9,
                      fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".82rem",
                      cursor: "pointer",
                    }}
                  >
                    📱 WhatsApp direct
                  </button>
                  <button
                    onClick={() => window.open(`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent(`Bonjour Yorix ! Je souhaite réserver une prestation avec ${selectedPrest.name} (${selectedPrest.metier}).`)}`, "_blank")}
                    style={{
                      background: "var(--green)", color: "#fff", border: "none",
                      padding: "12px", borderRadius: 9,
                      fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".82rem",
                      cursor: "pointer",
                    }}
                  >
                    📅 Réserver via Yorix
                  </button>
                </div>
              </div>
            </div>
          )}

        </section>
      )}

      {/* ════════ PAGE : INSCRIPTION PRESTATAIRE ════════ */}
      {/* ════════ PAGE : INSCRIPTION PRESTATAIRE ════════ */}
      {page==="inscription"&&(
        <section className="sec anim">
          <div style={{maxWidth:600,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:24}}>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.6rem",fontWeight:800,color:"var(--ink)",marginBottom:7,letterSpacing:"-.5px"}}>👷 Devenir prestataire Yorix</h2>
              <p style={{color:"var(--gray)",fontSize:".86rem",lineHeight:1.7}}>Développez votre activité et accédez à des milliers de clients au Cameroun.</p>
            </div>
            {inscriptionSent?(
              <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:12,padding:40,textAlign:"center"}}>
                <div style={{fontSize:"3.5rem",marginBottom:14}}>🎉</div>
                <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.2rem",color:"var(--green)",marginBottom:10}}>Candidature envoyée avec succès !</h3>
                <p style={{fontSize:".88rem",color:"var(--gray)",lineHeight:1.7,maxWidth:420,margin:"0 auto 20px"}}>
                  Merci pour votre intérêt ! L'équipe Yorix vous contactera sous <strong>24h</strong> pour valider votre profil de prestataire.
                </p>
                <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
                  <button
                    onClick={()=>{setInscriptionSent(false);setInscriptionForm({nom:"",prenom:"",tel:"",email:"",metier:"",ville:"",experience:"",tarif:"",bio:""});}}
                    style={{background:"var(--surface2)",color:"var(--ink)",border:"1.5px solid var(--border)",borderRadius:8,padding:"9px 20px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".82rem"}}
                  >
                    Soumettre une autre candidature
                  </button>
                  <button
                    onClick={()=>goPage("home")}
                    style={{background:"var(--green)",color:"#fff",border:"none",borderRadius:8,padding:"9px 20px",cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem"}}
                  >
                    ← Retour à l'accueil
                  </button>
                </div>
              </div>
            ):(
              <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:24}}>
                {inscriptionError && (
                  <div style={{background:"#fff0f0",border:"1px solid #fecaca",color:"#ce1126",borderRadius:8,padding:"10px 14px",marginBottom:14,fontSize:".82rem"}}>
                    ⚠️ {inscriptionError}
                  </div>
                )}
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Nom <span>*</span></label><input className="form-input" value={inscriptionForm.nom} onChange={e=>setInscriptionForm(f=>({...f,nom:e.target.value}))} placeholder="Votre nom"/></div>
                  <div className="form-group"><label className="form-label">Prénom</label><input className="form-input" value={inscriptionForm.prenom} onChange={e=>setInscriptionForm(f=>({...f,prenom:e.target.value}))} placeholder="Votre prénom"/></div>
                  <div className="form-group"><label className="form-label">Téléphone <span>*</span></label><input className="form-input" value={inscriptionForm.tel} onChange={e=>setInscriptionForm(f=>({...f,tel:e.target.value}))} placeholder="+237 696 56 56 54"/></div>
                  <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" value={inscriptionForm.email} onChange={e=>setInscriptionForm(f=>({...f,email:e.target.value}))} placeholder="email@mail.com"/></div>
                  <div className="form-group"><label className="form-label">Métier <span>*</span></label><select className="form-select" value={inscriptionForm.metier} onChange={e=>setInscriptionForm(f=>({...f,metier:e.target.value}))}><option value="">Choisir...</option>{["Plomberie","Électricité","Maçonnerie","Peinture","Menuiserie","Informatique","Graphisme","Photographie","Nettoyage","Transport","Cuisine","Autre"].map(m=><option key={m}>{m}</option>)}</select></div>
                  <div className="form-group"><label className="form-label">Ville</label><select className="form-select" value={inscriptionForm.ville} onChange={e=>setInscriptionForm(f=>({...f,ville:e.target.value}))}><option value="">Choisir...</option>{CITIES.filter(c=>c!=="Toutes les villes").map(c=><option key={c}>{c}</option>)}</select></div>
                  <div className="form-group"><label className="form-label">Expérience</label><input className="form-input" value={inscriptionForm.experience} onChange={e=>setInscriptionForm(f=>({...f,experience:e.target.value}))} placeholder="Ex: 5 ans"/></div>
                  <div className="form-group"><label className="form-label">Tarif (FCFA)</label><input className="form-input" value={inscriptionForm.tarif} onChange={e=>setInscriptionForm(f=>({...f,tarif:e.target.value}))} placeholder="Ex: 15 000/h"/></div>
                  <div className="form-group full"><label className="form-label">Présentation</label><textarea className="form-textarea" value={inscriptionForm.bio} onChange={e=>setInscriptionForm(f=>({...f,bio:e.target.value}))} placeholder="Décrivez vos compétences..."/></div>
                </div>
                <button 
                  className="form-submit" 
                  disabled={inscriptionLoading}
                  onClick={soumettreCandidaturePrestataire}
                >
                  {inscriptionLoading 
                    ? <><div className="spinner" style={{width:16,height:16,borderWidth:2}}/>Envoi en cours...</>
                    : "🚀 Soumettre ma candidature"
                  }
                </button>
                <p style={{fontSize:".7rem",color:"var(--gray)",textAlign:"center",marginTop:10,lineHeight:1.5}}>
                  🔒 Vos informations sont sécurisées · Réponse sous 24h
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ════════ PAGE : BUSINESS ════════ */}
      {page==="business"&&(
        <section className="sec anim">
          <div className="biz-hero">
            <div style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(252,209,22,.14)",color:"var(--yellow)",border:"1px solid rgba(252,209,22,.24)",padding:"4px 11px",borderRadius:50,fontSize:".7rem",fontWeight:700,marginBottom:12}}>💼 Yorix Business</div>
            <div className="biz-title">La solution B2B pour les entreprises camerounaises</div>
            <p className="biz-sub">Achetez en gros, gérez vos fournisseurs et accédez à des tarifs professionnels exclusifs.</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><button className="cta-y">Démarrer gratuitement</button><button className="cta-w">Voir une démo</button></div>
            <div className="biz-feats">{[{icon:"📦",t:"Achats en gros",p:"Tarifs dégressifs dès 10 unités"},{icon:"🤝",t:"Fournisseurs vérifiés",p:"500+ fournisseurs certifiés"},{icon:"📊",t:"Tableaux de bord",p:"Suivi en temps réel"},{icon:"🔐",t:"Facturation pro",p:"Factures automatiques"}].map(f=><div key={f.t} className="biz-feat"><div style={{fontSize:"1.25rem",marginBottom:4}}>{f.icon}</div><h4>{f.t}</h4><p>{f.p}</p></div>)}</div>
          </div>
          <BusinessForm />
        </section>
      )}

            {/* ═══════════════ PAGE : ACADEMY (dynamique Supabase) ═══════════════ */}
      {page==="academy"&&(
        <section className="sec anim">
          <div style={{background:"linear-gradient(135deg,#1a3a24,#0a1410)",borderRadius:14,padding:28,marginBottom:20,textAlign:"center"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(252,209,22,.14)",color:"var(--yellow)",border:"1px solid rgba(252,209,22,.24)",padding:"4px 11px",borderRadius:50,fontSize:".7rem",fontWeight:700,marginBottom:12}}>🎓 Yorix Academy</div>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.45rem",fontWeight:800,color:"#fff",marginBottom:6,letterSpacing:"-.5px"}}>Formez-vous pour vendre mieux</h2>
            <p style={{color:"rgba(255,255,255,.5)",fontSize:".85rem",marginBottom:18}}>Des cours créés par des experts camerounais.</p>
            <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
              <button className="cta-y" onClick={()=>{const first=academyCourses.find(c=>c.prix===0);if(first)goAcademyDetail(first);}}>Commencer gratuitement</button>
              <button className="cta-w" onClick={()=>window.scrollTo({top:400,behavior:"smooth"})}>Voir le catalogue</button>
            </div>
          </div>

          {academyLoading
            ? <div className="loading"><div className="spinner"/>Chargement des formations...</div>
            : academyCourses.length===0
              ? <div className="empty-state"><div className="empty-icon">🎓</div><p>Aucune formation pour l'instant</p></div>
              : <div className="courses-grid">
                  {academyCourses.map(c=>(
                    <div key={c.id} className="course-card" onClick={()=>goAcademyDetail(c)} style={{cursor:"pointer"}}>
                      <div className="course-img" style={{background:c.color_bg||"#E8F5E9"}}>{c.emoji||"🎓"}</div>
                      <div className="course-body">
                        <div className={`course-level ${c.category==="DÉBUTANT"?"lc-debutant":c.category==="INTERMÉDIAIRE"?"lc-intermediaire":"lc-avance"}`}>{c.category}</div>
                        <div className="course-title">{c.title}</div>
                        <div className="course-meta">⏱ {c.duration} · 👥 {c.students_count||0}</div>
                        <div className="course-footer">
                          <div className="course-price">{c.prix===0?"Gratuit":`${c.prix.toLocaleString("fr-FR")} FCFA`}</div>
                          <button className="course-btn" onClick={e=>{e.stopPropagation();goAcademyDetail(c);}}>Démarrer →</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
          }
        </section>
      )}

      {/* ═══════════════ PAGE : ACADEMY DETAIL (article teaser) ═══════════════ */}
      {page==="academyDetail"&&(
        <AcademyDetail
          course={selectedCourse}
          goPage={goPage}
          goContact={goAcademyContact}
        />
      )}

      {/* ═══════════════ PAGE : ACADEMY CONTACT (formulaire) ═══════════════ */}
      {page==="academyContact"&&(
        <AcademyContactForm
          course={selectedCourse}
          user={user}
          userData={userData}
          goPage={goPage}
        />
      )}


      {/* ════════ PAGE : BLOG — VERSION PRO ════════ */}
      {page==="blog"&&(
        <section className="sec anim">

          {/* ── HERO BLOG ── */}
          <div style={{
            background: "linear-gradient(135deg, #0a1410 0%, #1a3a24 50%, #0d3320 100%)",
            borderRadius: 16,
            padding: "36px 28px",
            color: "#fff",
            marginBottom: 28,
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
          }}>
            <div style={{
              position: "absolute", top: -40, right: -40, width: 200, height: 200,
              background: "rgba(252,209,22,.08)", borderRadius: "50%",
            }}/>
            <div style={{
              position: "absolute", bottom: -60, left: -50, width: 180, height: 180,
              background: "rgba(79,209,125,.06)", borderRadius: "50%",
            }}/>

            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "rgba(252,209,22,.14)", color: "var(--yellow)",
                border: "1px solid rgba(252,209,22,.28)",
                padding: "5px 14px", borderRadius: 50,
                fontSize: ".72rem", fontWeight: 700, marginBottom: 14,
              }}>
                📰 Yorix Journal
              </div>
              <h1 style={{
                fontFamily: "'Syne',sans-serif", fontSize: "2rem", fontWeight: 800,
                marginBottom: 10, letterSpacing: "-.5px", lineHeight: 1.15,
              }}>
                Tout l'actu du <span style={{ color: "var(--yellow)" }}>commerce camerounais</span>
              </h1>
              <p style={{
                color: "rgba(255,255,255,.65)", fontSize: ".9rem",
                maxWidth: 560, margin: "0 auto", lineHeight: 1.7,
              }}>
                Guides pratiques, analyses de marché, conseils business et tendances locales.
                Écrit par notre équipe et des experts camerounais.
              </p>
            </div>
          </div>

          {/* ── FILTRES CATÉGORIES ── */}
          <div style={{
            display: "flex", gap: 8, flexWrap: "wrap",
            marginBottom: 24, justifyContent: "center",
          }}>
            {(() => {
              const cats = ["TOUT", ...Array.from(new Set(BLOG_DATA.map(p => p.cat)))];
              return cats.map(c => (
                <button
                  key={c}
                  onClick={() => setBlogFilter(c)}
                  style={{
                    padding: "7px 16px", borderRadius: 50,
                    border: `1.5px solid ${blogFilter === c ? "var(--green)" : "var(--border)"}`,
                    background: blogFilter === c ? "var(--green)" : "var(--surface)",
                    color: blogFilter === c ? "#fff" : "var(--ink)",
                    fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
                    fontSize: ".76rem", cursor: "pointer",
                    transition: "all .2s",
                  }}
                >
                  {c}
                </button>
              ));
            })()}
          </div>

          {/* ── ARTICLE FEATURED (le premier avec featured: true) ── */}
          {(() => {
            const featured = BLOG_DATA.find(p => p.featured && (blogFilter === "TOUT" || p.cat === blogFilter));
            if (!featured) return null;
            return (
              <div
                onClick={() => window.open(featured.external_url, "_blank", "noopener,noreferrer")}
                style={{
                  background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: 16, overflow: "hidden", marginBottom: 28,
                  cursor: "pointer", transition: "transform .2s, box-shadow .2s",
                  display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 0,
                }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,.1)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{
                  background: featured.color_bg || "var(--green-pale)",
                  minHeight: 280, position: "relative",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden",
                }}>
                  {featured.image ? (
                    <img
                      src={featured.image}
                      alt={featured.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
                      onError={e => { e.currentTarget.style.display = "none"; }}
                    />
                  ) : (
                    <div style={{ fontSize: "6rem", opacity: .5 }}>{featured.emoji}</div>
                  )}
                  <span style={{
                    position: "absolute", top: 16, left: 16,
                    background: "var(--yellow)", color: "#0d1f14",
                    padding: "5px 12px", borderRadius: 50,
                    fontSize: ".68rem", fontWeight: 800,
                    fontFamily: "'Syne',sans-serif",
                    boxShadow: "0 4px 12px rgba(0,0,0,.15)",
                  }}>
                    ⭐ À LA UNE
                  </span>
                </div>
                <div style={{ padding: "28px 26px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{
                    fontSize: ".68rem", fontWeight: 800, color: "var(--green)",
                    letterSpacing: ".08em", marginBottom: 10,
                  }}>
                    {featured.emoji} {featured.cat}
                  </div>
                  <h2 style={{
                    fontFamily: "'Syne',sans-serif", fontSize: "1.4rem", fontWeight: 800,
                    color: "var(--ink)", marginBottom: 10, letterSpacing: "-.3px",
                    lineHeight: 1.25,
                  }}>
                    {featured.title}
                  </h2>
                  <p style={{
                    fontSize: ".86rem", color: "var(--gray)",
                    lineHeight: 1.7, marginBottom: 16,
                  }}>
                    {featured.excerpt}
                  </p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                    {featured.tags?.map(t => (
                      <span key={t} style={{
                        background: "var(--surface2)", color: "var(--gray)",
                        padding: "3px 10px", borderRadius: 50,
                        fontSize: ".67rem", fontWeight: 600,
                      }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    paddingTop: 14, borderTop: "1px solid var(--border)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: "50%",
                        background: "var(--green)", color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".82rem",
                      }}>
                        {featured.author_avatar || "Y"}
                      </div>
                      <div>
                        <div style={{ fontSize: ".76rem", fontWeight: 700, color: "var(--ink)" }}>
                          {featured.author}
                        </div>
                        <div style={{ fontSize: ".66rem", color: "var(--gray)" }}>
                          {featured.date} · ⏱ {featured.read}
                        </div>
                      </div>
                    </div>
                    <button style={{
                      background: "var(--green)", color: "#fff", border: "none",
                      padding: "8px 16px", borderRadius: 9,
                      fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".78rem",
                      cursor: "pointer",
                    }}>
                      Lire l'article →
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ── GRILLE ARTICLES ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 18,
          }}>
            {BLOG_DATA
              .filter(p => !p.featured || blogFilter !== "TOUT")
              .filter(p => blogFilter === "TOUT" || p.cat === blogFilter)
              .map(p => (
                <article
                  key={p.id}
                  onClick={() => window.open(p.external_url, "_blank", "noopener,noreferrer")}
                  style={{
                    background: "var(--surface)", border: "1px solid var(--border)",
                    borderRadius: 14, overflow: "hidden",
                    cursor: "pointer", transition: "transform .2s, box-shadow .2s, border-color .2s",
                    display: "flex", flexDirection: "column",
                  }}
                  onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 14px 28px rgba(0,0,0,.1)"; e.currentTarget.style.borderColor = "var(--green-light)"; }}
                  onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border)"; }}
                >
                  {/* Image / visuel */}
                  <div style={{
                    height: 180, position: "relative",
                    background: p.color_bg || "var(--green-pale)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    overflow: "hidden",
                  }}>
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={e => { e.currentTarget.style.display = "none"; }}
                      />
                    ) : (
                      <div style={{ fontSize: "4rem", opacity: .6 }}>{p.emoji}</div>
                    )}
                    <span style={{
                      position: "absolute", top: 12, left: 12,
                      background: "rgba(255,255,255,.95)", backdropFilter: "blur(10px)",
                      color: "var(--ink)", padding: "4px 11px", borderRadius: 50,
                      fontSize: ".64rem", fontWeight: 800, letterSpacing: ".05em",
                      fontFamily: "'Syne',sans-serif",
                    }}>
                      {p.emoji} {p.cat}
                    </span>
                    <span style={{
                      position: "absolute", top: 12, right: 12,
                      background: "rgba(0,0,0,.6)", backdropFilter: "blur(10px)",
                      color: "#fff", padding: "4px 10px", borderRadius: 50,
                      fontSize: ".62rem", fontWeight: 700,
                      display: "flex", alignItems: "center", gap: 3,
                    }}>
                      ⏱ {p.read}
                    </span>
                  </div>

                  {/* Contenu */}
                  <div style={{ padding: "16px 16px 14px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 style={{
                      fontFamily: "'Syne',sans-serif", fontSize: ".98rem", fontWeight: 800,
                      color: "var(--ink)", marginBottom: 8,
                      letterSpacing: "-.2px", lineHeight: 1.3,
                      display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}>
                      {p.title}
                    </h3>
                    <p style={{
                      fontSize: ".78rem", color: "var(--gray)",
                      lineHeight: 1.6, marginBottom: 12, flex: 1,
                      display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}>
                      {p.excerpt}
                    </p>

                    {/* Tags */}
                    {p.tags && p.tags.length > 0 && (
                      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
                        {p.tags.slice(0, 2).map(t => (
                          <span key={t} style={{
                            background: "var(--surface2)", color: "var(--gray)",
                            padding: "2px 8px", borderRadius: 50,
                            fontSize: ".6rem", fontWeight: 600,
                          }}>
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer auteur */}
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      paddingTop: 11, borderTop: "1px solid var(--border)",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <div style={{
                          width: 26, height: 26, borderRadius: "50%",
                          background: "var(--green)", color: "#fff",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: ".68rem",
                        }}>
                          {p.author_avatar || "Y"}
                        </div>
                        <div>
                          <div style={{ fontSize: ".68rem", fontWeight: 700, color: "var(--ink)" }}>
                            {p.author}
                          </div>
                          <div style={{ fontSize: ".6rem", color: "var(--gray)" }}>
                            {p.date}
                          </div>
                        </div>
                      </div>
                      <span style={{
                        fontSize: ".68rem", fontWeight: 700, color: "var(--green)",
                        display: "flex", alignItems: "center", gap: 3,
                      }}>
                        Lire →
                      </span>
                    </div>
                  </div>
                </article>
              ))}
          </div>

          {/* ── Message si aucun article ── */}
          {BLOG_DATA.filter(p => blogFilter === "TOUT" || p.cat === blogFilter).length === 0 && (
            <div className="empty-state" style={{ padding: "60px 0" }}>
              <div className="empty-icon">📰</div>
              <p>Aucun article dans cette catégorie pour l'instant.</p>
              <button
                className="form-submit"
                style={{ width: "auto", padding: "10px 24px", marginTop: 16 }}
                onClick={() => setBlogFilter("TOUT")}
              >
                Voir tous les articles
              </button>
            </div>
          )}

          {/* ── CTA NEWSLETTER BLOG ── */}
          <div style={{
            background: "linear-gradient(135deg, var(--green-pale), #fef9e0)",
            border: "2px solid var(--green-light)",
            borderRadius: 14, padding: "26px 28px",
            marginTop: 32, textAlign: "center",
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>📬</div>
            <h3 style={{
              fontFamily: "'Syne',sans-serif", fontSize: "1.2rem", fontWeight: 800,
              color: "var(--ink)", marginBottom: 8, letterSpacing: "-.3px",
            }}>
              Ne rate aucun article
            </h3>
            <p style={{
              fontSize: ".84rem", color: "var(--gray)",
              marginBottom: 16, maxWidth: 460, margin: "0 auto 16px",
              lineHeight: 1.6,
            }}>
              Reçois chaque semaine nos meilleurs guides et analyses directement dans ta boîte mail.
            </p>
            <div style={{
              display: "flex", gap: 8, maxWidth: 400, margin: "0 auto",
              flexWrap: "wrap", justifyContent: "center",
            }}>
              <input
                type="email"
                placeholder="ton@email.cm"
                value={nlEmail}
                onChange={e => setNlEmail(e.target.value)}
                style={{
                  flex: 1, minWidth: 200,
                  padding: "11px 14px", borderRadius: 9,
                  border: "1.5px solid var(--border)",
                  background: "var(--surface)", color: "var(--ink)",
                  fontFamily: "'DM Sans',sans-serif", fontSize: ".85rem",
                  outline: "none",
                }}
              />
              <button
                onClick={async () => {
                  if (nlEmail) {
                    await supabase.from("newsletter").insert({ email: nlEmail }).catch(e => console.warn(e?.message));
                    setNlSent(true);
                  }
                }}
                style={{
                  background: "var(--green)", color: "#fff", border: "none",
                  padding: "11px 22px", borderRadius: 9,
                  fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".82rem",
                  cursor: "pointer", whiteSpace: "nowrap",
                }}
              >
                {nlSent ? "✅ Abonné(e) !" : "S'abonner 🚀"}
              </button>
            </div>
          </div>

        </section>
      )}
      
            {/* ═══════════════ PAGE : FIDÉLITÉ (système complet) ═══════════════ */}
      {page==="loyalty"&&(
        <LoyaltyPage
          user={user}
          userData={userData}
          goPage={goPage}
          setAuthOpen={setAuthOpen}
          setAuthTab={setAuthTab}
        />
      )}


      {/* ════════ PAGE : DASHBOARD ════════ */}
      {page==="dashboard"&&(
        user?(
          <div className="dash-layout anim">
            <div className="dash-sidebar">
              <div className="dash-avatar">{userData?.nom?.[0]||"U"}</div>
              <div className="dash-name" title={userData?.nom || user.email}>
  {userData?.nom || user.email?.split("@")[0] || "Utilisateur"}
</div>
              <div className="dash-role-badge"><span className={`role-chip ${roleChipClass()}`}>{ROLE_LABELS[userRole||"buyer"]}</span></div>
              <div className="dash-nav">
                {getDashNav().map(item=>(
                  <div key={item.id} className={`dash-nav-item${dashTab===item.id?" active":""}`} onClick={()=>setDashTab(item.id)}>{item.icon} {item.label}</div>
                ))}
                <div className="dash-nav-divider"/>
                <div className={`dash-nav-item${dashTab==="messages"?" active":""}`} onClick={()=>setDashTab("messages")}>💬 Messages</div>
                <div className="dash-nav-item" onClick={doLogout} style={{color:"var(--red)"}}>🚪 Déconnexion</div>
              </div>
            </div>

            <div className="dash-content">
              {/* Messages commun à tous */}
              {dashTab==="messages"&&(
                <>
                  <div className="dash-page-title">💬 Messagerie sécurisée</div>
                  <div className="info-msg">🔐 La messagerie Yorix est sécurisée. Tout partage de contact externe est automatiquement bloqué et enregistré.</div>
                  <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:13,overflow:"hidden",height:420,display:"flex",flexDirection:"column"}}>
                    <div style={{background:"var(--green)",padding:"12px 16px"}}>
                      <div style={{fontSize:".85rem",fontWeight:600,color:"#fff"}}>Support Yorix</div>
                      <div style={{fontSize:".68rem",color:"rgba(255,255,255,.6)"}}><span style={{width:6,height:6,background:"#4fd17d",borderRadius:"50%",display:"inline-block",marginRight:4}}/>En ligne</div>
                    </div>
                    <div style={{flex:1,overflowY:"auto",padding:14}}>
                      {chatMessages.map((m,i)=><div key={i} style={{marginBottom:10,display:"flex",flexDirection:"column",alignItems:m.me?"flex-end":"flex-start"}}><div style={{background:m.me?"var(--green)":"var(--surface2)",color:m.me?"#fff":"var(--ink)",padding:"8px 11px",borderRadius:m.me?"11px 11px 3px 11px":"11px 11px 11px 3px",fontSize:".79rem",maxWidth:"75%",lineHeight:1.45}}>{m.text}</div><div style={{fontSize:".6rem",color:"var(--gray)",marginTop:2}}>{m.time}</div></div>)}
                      {chatBlocked&&<div style={{background:"#f8d7da",border:"1px solid #f5c6cb",borderRadius:8,padding:"8px 12px",fontSize:".75rem",color:"#721c24",margin:"6px 0",textAlign:"center"}}>⚠️ Message bloqué : partage de contact externe interdit sur Yorix.</div>}
                      <div ref={chatEndRef}/>
                    </div>
                    <div style={{padding:10,borderTop:"1px solid var(--border)",display:"flex",gap:7}}><input style={{flex:1,border:"1.5px solid var(--border)",borderRadius:8,padding:"8px 11px",fontFamily:"'DM Sans',sans-serif",fontSize:".81rem",outline:"none",background:"var(--surface)",color:"var(--ink)"}} placeholder="Écrire un message..." value={chatMsg} onChange={e=>setChatMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()}/><button style={{background:"var(--green)",color:"#fff",border:"none",width:34,height:34,borderRadius:8,cursor:"pointer",fontSize:".95rem"}} onClick={sendChat}>➤</button></div>
                  </div>
                </>
              )}

              {/* Dashboards par rôle */}
              {dashTab!=="messages"&&userRole==="seller"&&<SellerDashboard user={user} userData={userData} dashTab={dashTab} setDashTab={setDashTab}/>}
              {dashTab!=="messages"&&userRole==="delivery"&&<DeliveryDashboard user={user} userData={userData} dashTab={dashTab} setDashTab={setDashTab}/>}
              {dashTab!=="messages"&&userRole==="provider"&&<ProviderDashboard user={user} userData={userData} dashTab={dashTab} setDashTab={setDashTab}/>}
              {dashTab!=="messages"&&(userRole==="buyer"||!userRole)&&<BuyerDashboard user={user} userData={userData} wishlist={wishlist} totalQty={totalQty} loyaltyPts={loyaltyPts} setLoyaltyPts={setLoyaltyPts} dashTab={dashTab} goPage={goPage}/>}
            </div>
          </div>
        ):(
          <div className="empty-state anim" style={{padding:"60px 0"}}>
            <div className="empty-icon">🔐</div>
            <p>Connectez-vous pour accéder à votre espace</p>
            <button className="form-submit" style={{width:"auto",padding:"11px 28px",marginTop:16}} onClick={()=>setAuthOpen(true)}>Se connecter</button>
          </div>
        )
      )}

      {/* Newsletter hors home */}
      {page!=="home"&&(
        <div className="newsletter">
          <div className="nl-title">📬 Restez informé(e)</div>
          <p className="nl-sub">Les meilleures offres Yorix dans votre boîte mail.</p>
          {nlSent?<div style={{background:"rgba(255,255,255,.2)",borderRadius:8,padding:"9px 18px",color:"#fff",fontWeight:600}}>✅ Abonné(e) !</div>
            :<div className="nl-form"><input className="nl-input" placeholder="Votre email..." value={nlEmail} onChange={e=>setNlEmail(e.target.value)}/><button className="nl-btn" onClick={async()=>{if(nlEmail){await supabase.from("newsletter").insert({email:nlEmail}).catch(e => console.warn(e?.message));setNlSent(true);}}}>S'abonner 🚀</button></div>}
        </div>
      )}

      {/* WA FLOAT */}
      <div className="wa-float">
        {waOpen&&<div className="wa-card">
          <div className="wa-card-title">💬 Contacter Yorix</div>
          <div className="wa-card-sub">Support 7j/7 · Réponse rapide</div>
          <a href={`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent("Bonjour Yorix ! J'ai besoin d'aide.")}`} target="_blank" rel="noreferrer" className="wa-link wa-link-green">📱 WhatsApp +237 696 56 56 54</a>
          <a href="tel:+237696565654" className="wa-link wa-link-ghost">📞 Appeler</a>
          <a href="mailto:support@yorix.cm" className="wa-link wa-link-ghost">✉️ support@yorix.cm</a>
        </div>}
        <div style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div className="wa-pulse"/>
          <button className="wa-btn" onClick={()=>setWaOpen(o=>!o)}>{waOpen?"✕":"💬"}</button>
        </div>
      </div>

      {/* MOBILE NAV */}
      <div className="mobile-nav">
        <div className="mn-inner">
          {[
            {icon:"🏠",label:"Accueil",p:"home"},
            {icon:"🛍️",label:"Produits",p:"produits"},
            {icon:"🚚",label:"Livraison",p:"livraison"},
            {icon:"📊",label:"Mon espace",p:"dashboard"},
            {icon:"💬",label:"WhatsApp",p:"wa"},
          ].map(item => (
            <div
              key={item.label}
              className={`mn-item${page===item.p?" active":""}`}
              onClick={() => {
                if (item.p === "wa") {
                  window.open(`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent("Bonjour Yorix ! J'ai besoin d'aide.")}`, "_blank");
                } else if (item.p === "dashboard" && !user) {
                  setAuthTab("register");
                  setAuthOpen(true);
                } else {
                  goPage(item.p);
                }
              }}
            >
              <div className="mn-icon">{item.icon}</div>
              <div className="mn-label">{item.label}</div>
              {item.p==="dashboard" && !user && (
                <div style={{position:"absolute",top:0,right:2,background:"var(--green)",color:"#fff",fontSize:".45rem",fontWeight:700,padding:"1px 3px",borderRadius:3}}>S'inscrire</div>
              )}
              {item.p==="dashboard" && unread>0 && user && <div className="mn-badge">{unread}</div>}
            </div>
          ))}
        </div>
        {/* Barre inscription rapide mobile si non connecté */}
        {!user && (
          <div style={{borderTop:"1px solid var(--border)",padding:"8px 16px",display:"flex",gap:8}}>
            <button
              onClick={() => { setAuthTab("login"); setAuthOpen(true); }}
              style={{flex:1,padding:"9px",borderRadius:8,border:"1.5px solid var(--border)",background:"var(--surface)",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".78rem",cursor:"pointer",color:"var(--ink)"}}
            >🔑 Connexion</button>
            <button
              onClick={() => { setAuthTab("register"); setSelectedRole("buyer"); setAuthOpen(true); }}
              style={{flex:2,padding:"9px",borderRadius:8,border:"none",background:"var(--green)",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem",cursor:"pointer",color:"#fff"}}
            >🚀 S'inscrire gratuitement</button>
          </div>
        )}
      </div>


      {/* ════════ PAGE : ADMIN ════════ */}
      {page==="admin"&&(
        <AdminDashboard user={user} userData={userData} goPage={goPage}/>
      )}

      {/* ════════ PAGE : CONTACT ════════ */}
      {page==="cgv"&&<PagesLegales type="cgv" goPage={goPage}/>}
      {page==="mentions"&&<PagesLegales type="mentions" goPage={goPage}/>}
      {page==="confidentialite"&&<PagesLegales type="confidentialite" goPage={goPage}/>}
      {page==="contact"&&(
        <section className="sec anim">
          <div style={{maxWidth:700,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:24}}>
              <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.5rem",color:"var(--ink)",marginBottom:8}}>📞 Nous contacter</h1>
              <p style={{color:"var(--gray)",fontSize:".86rem"}}>Notre équipe répond en moins de 2h · 7j/7</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:24}}>
              {[
                {icon:"📱",label:"WhatsApp",val:"+237 696 56 56 54",action:()=>window.open(`https://wa.me/237696565654?text=${encodeURIComponent("Bonjour Yorix !")}`)},
                {icon:"📞",label:"Téléphone",val:"+237 696 56 56 54",action:()=>window.open("tel:+237696565654")},
                {icon:"✉️",label:"Email",val:"support@yorix.cm",action:()=>window.open("mailto:support@yorix.cm")},
              ].map(c=>(
                <div key={c.label} onClick={c.action} style={{background:"var(--surface)",border:"1.5px solid var(--border)",borderRadius:12,padding:18,textAlign:"center",cursor:"pointer",transition:"border-color .2s"}}
                  onMouseOver={e=>e.currentTarget.style.borderColor="var(--green)"}
                  onMouseOut={e=>e.currentTarget.style.borderColor="var(--border)"}
                >
                  <div style={{fontSize:"2rem",marginBottom:8}}>{c.icon}</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".85rem",color:"var(--ink)",marginBottom:4}}>{c.label}</div>
                  <div style={{fontSize:".78rem",color:"var(--green)",fontWeight:600}}>{c.val}</div>
                </div>
              ))}
            </div>
            <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:24,marginBottom:16}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1rem",color:"var(--ink)",marginBottom:16}}>💬 Envoyer un message</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11,marginBottom:11}}>
                <div className="form-group" style={{marginBottom:0}}><label className="form-label">Nom *</label><input className="form-input" placeholder="Votre nom"/></div>
                <div className="form-group" style={{marginBottom:0}}><label className="form-label">Email *</label><input className="form-input" type="email" placeholder="email@exemple.cm"/></div>
              </div>
              <div className="form-group">
                <label className="form-label">Sujet *</label>
                <select className="form-select">
                  <option value="">Choisir un sujet...</option>
                  {["Problème avec une commande","Signaler un vendeur","Remboursement","Problème de paiement","Devenir vendeur","Devenir livreur","Autre"].map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group"><label className="form-label">Message *</label><textarea className="form-textarea" style={{minHeight:90}} placeholder="Décrivez votre demande..."/></div>
              <button className="form-submit" onClick={()=>window.open(`https://wa.me/237696565654?text=${encodeURIComponent("Bonjour Yorix ! Je vous contacte pour : ")}`)}>📱 Envoyer via WhatsApp</button>
            </div>
            <div style={{background:"var(--green-pale)",border:"1px solid var(--green-light)",borderRadius:11,padding:16,display:"flex",gap:14,flexWrap:"wrap"}}>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem",color:"var(--green)",marginBottom:6}}>⏰ Horaires</div>
                {[["Lun – Ven","8h – 20h"],["Samedi","9h – 18h"],["Dimanche","10h – 16h"]].map(([j,h])=>(
                  <div key={j} style={{display:"flex",justifyContent:"space-between",fontSize:".75rem",padding:"3px 0",borderBottom:"1px solid var(--border)"}}>
                    <span style={{color:"var(--gray)"}}>{j}</span><span style={{fontWeight:600,color:"var(--ink)"}}>{h}</span>
                  </div>
                ))}
              </div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".82rem",color:"var(--green)",marginBottom:6}}>📍 Bureaux</div>
                <div style={{fontSize:".75rem",color:"var(--gray)",lineHeight:1.7}}>Douala — Akwa<br/>Yaoundé — Bastos<br/>📞 +237 696 56 56 54</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ════════ PAGE : CENTRE D'AIDE ════════ */}
      {page==="aide"&&(
        <section className="sec anim">
          <div style={{maxWidth:800,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:24}}>
              <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.5rem",color:"var(--ink)",marginBottom:8}}>🆘 Centre d'aide</h1>
              <p style={{color:"var(--gray)",fontSize:".86rem"}}>Trouvez les réponses à vos questions</p>
            </div>
            {[
              {cat:"🛍️ Acheter sur Yorix",faq:[
                {q:"Comment passer une commande ?",r:"Cliquez sur un produit → Ajoutez au panier → Commander via WhatsApp. Le vendeur vous contacte sous 1h."},
                {q:"Quels modes de paiement ?",r:"MTN Mobile Money, Orange Money, et paiement à la livraison dans certaines villes."},
                {q:"Comment fonctionne l'Escrow ?",r:"Votre paiement est bloqué jusqu'à réception. Si problème, vous êtes remboursé sous 48h."},
              ]},
              {cat:"🏪 Vendre sur Yorix",faq:[
                {q:"Comment créer ma boutique ?",r:"Inscrivez-vous Vendeur → Dashboard → Ajouter produit. Votre produit est visible immédiatement."},
                {q:"Quelle est la commission Yorix ?",r:"5% sur chaque vente. Exemple : 10 000 FCFA vendus → vous recevez 9 500 FCFA."},
                {q:"Comment obtenir le badge Top Vendeur ?",r:"Automatique dès 5 produits actifs, ou achetez-le 15 000 FCFA/mois."},
              ]},
              {cat:"🚚 Livraison",faq:[
                {q:"Délais de livraison ?",r:"Intra-ville : 20–60 min. Inter-villes : 1–3 jours."},
                {q:"Colis non reçu ?",r:"Contactez immédiatement : support@yorix.cm ou WhatsApp +237 696 56 56 54."},
              ]},
              {cat:"💰 Points & Fidélité",faq:[
                {q:"Comment gagner des points ?",r:"5 points par achat, vente, livraison ou prestation. 10 points à l'inscription. 1 pt = 1 FCFA."},
                {q:"Échange minimum ?",r:"500 points = 500 FCFA. Utilisables en bons d'achat ou livraisons offertes."},
              ]},
            ].map(section=>(
              <div key={section.cat} style={{marginBottom:20}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".95rem",color:"var(--ink)",padding:"8px 0",borderBottom:"2px solid var(--green-light)",marginBottom:10}}>{section.cat}</div>
                {section.faq.map(({q,r},i)=>(
                  <details key={i} style={{marginBottom:8,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:9,overflow:"hidden"}}>
                    <summary style={{padding:"11px 14px",cursor:"pointer",fontWeight:600,fontSize:".83rem",color:"var(--ink)",userSelect:"none",listStyle:"none",display:"flex",justifyContent:"space-between"}}>
                      {q}<span style={{color:"var(--green)"}}>▾</span>
                    </summary>
                    <div style={{padding:"10px 14px 14px",fontSize:".8rem",color:"var(--gray)",lineHeight:1.75,borderTop:"1px solid var(--border)"}}>{r}</div>
                  </details>
                ))}
              </div>
            ))}
            <div style={{textAlign:"center",marginTop:20}}>
              <button className="btn-wa" style={{display:"inline-flex"}} onClick={()=>goPage("contact")}>📞 Contacter le support</button>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">Yo<span>rix</span> CM</div>
            <p className="footer-desc">La marketplace camerounaise complète — produits, prestataires, livraison, paiement MoMo sécurisé Escrow.</p>
            <div className="footer-contact"><span>📞 +237 696 56 56 54</span><span>✉️ support@yorix.cm</span><span>🇨🇲 Douala · Yaoundé · Bafoussam · et partout</span></div>
          </div>
          <div className="footer-col"><h4>Marketplace</h4><ul>{[{l:"Tous les produits",p:"produits"},{l:"Offres du jour",p:"produits"},{l:"Devenir vendeur",p:"inscription"}].map(i=><li key={i.l} onClick={()=>goPage(i.p)}>{i.l}</li>)}</ul></div>
          <div className="footer-col"><h4>Services</h4><ul>{[{l:"Escrow 🔐",p:"escrow"},{l:"Livraison 🚚",p:"livraison"},{l:"Prestataires 👷",p:"prestataires"},{l:"Business 💼",p:"business"},{l:"Academy 🎓",p:"academy"}].map(i=><li key={i.l} onClick={()=>goPage(i.p)}>{i.l}</li>)}</ul></div>
          <div className="footer-col"><h4>Aide</h4><ul>{[{l:"Centre d'aide",p:"aide"},{l:"Nous contacter",p:"contact"},{l:"📜 CGV",p:"cgv"},{l:"📋 Mentions légales",p:"mentions"},{l:"🔒 Confidentialité",p:"confidentialite"}].map(i=><li key={i.l} onClick={()=>goPage(i.p)}>{i.l}</li>)}</ul></div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Yorix Cameroun — RC: DOUALA/2026/B237</span>
          <div className="fb-badges"><span className="fbb">📱 MTN MoMo</span><span className="fbb">🔶 Orange Money</span><span className="fbb">🔐 Escrow</span><span className="fbb">🇨🇲 Made in CM</span></div>
        </div>
      </footer>
    </>
  );
}
