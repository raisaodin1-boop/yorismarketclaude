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
} from "./utils/helpers";

import { makeCSS } from "./utils/styles";

// ─────────────────────────────────────────────────────────────
// COMPOSANT : ÉTOILES (rating)
// ─────────────────────────────────────────────────────────────
function Stars({ value = 0, max = 5, onSelect = null, size = "normal" }) {
  const [hover, setHover] = useState(0);
  const current = hover || value;
  return (
    <div className={`stars-display${onSelect ? " star-input" : ""}`} style={{ cursor: onSelect ? "pointer" : "default" }}>
      {Array.from({ length: max }, (_, i) => i + 1).map(n => (
        <span
          key={n}
          className={`star ${n <= current ? "filled" : "empty"}`}
          style={{ fontSize: size === "lg" ? "1.4rem" : ".72rem" }}
          onClick={() => onSelect && onSelect(n)}
          onMouseEnter={() => onSelect && setHover(n)}
          onMouseLeave={() => onSelect && setHover(0)}
        >★</span>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPOSANT : MODAL COMMANDER (Commande + WhatsApp)
// ─────────────────────────────────────────────────────────────
function ModalCommander({ product, user, userData, onClose, onSuccess }) {
  const [nom, setNom]         = useState(userData?.nom || "");
  const [tel, setTel]         = useState(userData?.telephone || "");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]   = useState({});
  const [done, setDone]       = useState(false);

  const validate = () => {
    const e = {};
    if (!nom.trim()) e.nom = "Nom obligatoire";
    if (!tel.trim()) e.tel = "Téléphone obligatoire";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCommander = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await creerCommandeSupabase({ product, clientNom: nom, telephone: tel, userId: user?.id || null });
      setDone(true);
      setTimeout(() => { onSuccess?.(); onClose(); }, 2000);
    } catch (err) {
      console.error("creerCommande:", err);
      alert("Erreur lors de la commande : " + err.message);
    }
    setLoading(false);
  };

  const commission  = Math.round(product.prix * COMMISSION_RATE);
  const netVendeur  = product.prix - commission;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-title">📦 Commander ce produit</div>
        <p className="modal-sub">{product.name_fr}</p>

        {done ? (
          <div className="success-msg">✅ Commande créée avec succès ! Vous serez contacté(e) sous peu.</div>
        ) : (
          <>
            {/* Résumé prix */}
            <div style={{ background:"var(--surface2)", borderRadius:10, padding:"12px 14px", marginBottom:16 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:".82rem", marginBottom:4 }}>
                <span style={{ color:"var(--gray)" }}>Prix produit</span>
                <strong>{product.prix?.toLocaleString()} FCFA</strong>
              </div>
              <div className="commission-box" style={{ margin:0 }}>
                <span>Commission Yorix ({Math.round(COMMISSION_RATE * 100)}%)</span>
                <strong>−{commission.toLocaleString()} FCFA</strong>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:".82rem", marginTop:4, fontWeight:700, color:"var(--green)" }}>
                <span>Vendeur reçoit</span>
                <span>{netVendeur.toLocaleString()} FCFA</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Votre nom <span>*</span></label>
              <input className={`form-input${errors.nom ? " error" : ""}`} placeholder="Ex: Amina Bello" value={nom} onChange={e => setNom(e.target.value)} />
              {errors.nom && <span className="form-error-text">{errors.nom}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Téléphone <span>*</span></label>
              <input className={`form-input${errors.tel ? " error" : ""}`} placeholder="+237 6XX XXX XXX" value={tel} onChange={e => setTel(e.target.value)} />
              {errors.tel && <span className="form-error-text">{errors.tel}</span>}
            </div>

            <button className="form-submit" onClick={handleCommander} disabled={loading}>
              {loading ? <><div className="spinner" style={{ width:16, height:16, borderWidth:2 }}/>Enregistrement...</> : "✅ Confirmer la commande"}
            </button>

            <div className="divider">ou</div>
            <p style={{textAlign:"center",fontSize:".75rem",color:"var(--gray)"}}>
              💡 Tu peux aussi ajouter au panier et commander tout en une fois via WhatsApp
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPOSANT : FORMULAIRE AVIS
// ─────────────────────────────────────────────────────────────
function FormulaireAvis({ productId, userId, userName, onSubmit }) {
  const [note, setNote]       = useState(0);
  const [texte, setTexte]     = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);

  const submit = async () => {
    if (!note) { alert("Choisissez une note !"); return; }
    if (!texte.trim()) { alert("Rédigez un commentaire !"); return; }
    setLoading(true);
    try {
      await supabase.from("reviews").insert({
        product_id: productId,
        user_id: userId || null,
        auteur: userName || "Anonyme",
        note,
        texte,
      });
      setDone(true);
      onSubmit?.({ auteur: userName || "Anonyme", note, texte });
    } catch (err) {
      console.error("FormulaireAvis:", err);
    }
    setLoading(false);
  };

  if (done) return <div className="success-msg">✅ Merci pour votre avis !</div>;

  return (
    <div style={{ background:"var(--surface2)", borderRadius:12, padding:16, marginBottom:12 }}>
      <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".88rem", color:"var(--ink)", marginBottom:10 }}>Laisser un avis</div>
      <div style={{ marginBottom:10 }}>
        <div style={{ fontSize:".73rem", fontWeight:600, color:"var(--ink)", marginBottom:5 }}>Note :</div>
        <Stars value={note} onSelect={setNote} size="lg" />
      </div>
      <textarea
        className="form-textarea"
        style={{ minHeight:65 }}
        placeholder="Votre commentaire..."
        value={texte}
        onChange={e => setTexte(e.target.value)}
      />
      <button className="form-submit" style={{ marginTop:8 }} onClick={submit} disabled={loading || !note}>
        {loading ? "⏳ Envoi..." : "📝 Publier l'avis"}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPOSANT : FICHE PRODUIT DÉTAIL
// ─────────────────────────────────────────────────────────────
function FicheProduit({ product, user, userData, onClose, onAddToCart }) {
  const [activeImg, setActiveImg]   = useState(0);
  const [avis, setAvis]             = useState([]);
  const [showCmdModal, setShowCmdModal] = useState(false);
  // Priorité : p.image en premier, puis image_urls[], filtrer les URL non-http
  const parseImageUrls = (val) => {
      if (!val) return []
      if (Array.isArray(val)) return val
      try { const p = JSON.parse(val); return Array.isArray(p) ? p : [] }
      catch { return [] }
    }
    const imgArr = parseImageUrls(product.image_urls)
    const rawImgs = product.image && product.image.startsWith("http")
      ? [product.image, ...imgArr.filter(u => u && u.startsWith("http") && u !== product.image)]
      : imgArr.filter(u => u && u.startsWith("http"));
  const images = rawImgs.length > 0 ? rawImgs : [];

  useEffect(() => {
    supabase.from("reviews").select("*").eq("product_id", product.id).order("created_at", { ascending: false }).then(({ data }) => setAvis(data || []));
  }, [product.id]);

  const avgNote = avis.length ? (avis.reduce((a, r) => a + r.note, 0) / avis.length).toFixed(1) : product.note || 0;

 return (
   <div style={{minHeight:"100vh",background:"var(--bg)",paddingBottom:40}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"16px"}}>
          <button onClick={onClose} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"var(--gray)",fontSize:"14px",marginBottom:16,padding:"8px 0"}}>
            ← Retour
          </button>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start"}}>

        {/* Images */}
        {images.length > 0 ? (
          <div style={{ marginBottom:16 }}>
            <img 
 src={product.image || (images && images[0]) || ""}
  alt={product.name}
  loading="lazy"
/>
            {images.length > 1 && (
              <div className="img-gallery">
                {images.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt=""
                    className={`img-gallery-thumb${i === activeImg ? " active" : ""}`}
                    onClick={() => setActiveImg(i)}
                    onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = "https://via.placeholder.com/80?text=📦"; }}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div style={{ height:140, background:"var(--surface2)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"4rem", marginBottom:16 }}>📦</div>
        )}

        {/* Infos */}
        <div className="modal-title">{product.name_fr}</div>
        <div style={{ display:"flex", alignItems:"center", gap:8, margin:"6px 0 10px" }}>
          <Stars value={Math.round(avgNote)} />
          <span style={{ fontSize:".75rem", color:"var(--gray)" }}>{avgNote} / 5 ({avis.length} avis)</span>
          {product.ville && <span className="tag">📍 {product.ville}</span>}
          {product.categorie && <span className="tag">{product.categorie}</span>}
        </div>

        {product.description_fr && (
          <p style={{ fontSize:".82rem", color:"var(--gray)", lineHeight:1.75, marginBottom:12 }}>{product.description_fr}</p>
        )}

        {/* Stock */}
        {product.stock !== undefined && product.stock !== null && (
          <div style={{ marginBottom:10 }}>
            <span className={`prod-stock ${product.stock > 5 ? "stock-ok" : product.stock > 0 ? "stock-low" : "stock-out"}`}>
              {product.stock > 5 ? `✅ En stock (${product.stock})` : product.stock > 0 ? `⚠️ Plus que ${product.stock} en stock !` : "❌ Rupture de stock"}
            </span>
          </div>
        )}

        {/* Prix */}
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.5rem", fontWeight:800, color:"var(--green)", marginBottom:14 }}>
          {product.prix?.toLocaleString()} <span style={{ fontSize:".8rem", fontFamily:"'DM Sans',sans-serif", fontWeight:400, color:"var(--gray)" }}>FCFA</span>
        </div>

        {/* Escrow */}
        {product.escrow && (
          <div className="commission-box" style={{ marginBottom:12 }}>
            <span>🔐 Paiement protégé Escrow Yorix</span>
            <span style={{ fontSize:".68rem" }}>Fonds libérés à la livraison</span>
          </div>
        )}

        {/* Actions — WA centralisé dans le panier */}
        <div style={{ display:"flex", gap:8, marginBottom:16 }}>
          <button className="btn-cmd-sm" style={{ flex:2, padding:"11px", borderRadius:9 }} onClick={() => setShowCmdModal(true)}>
            ✅ Commander
          </button>
          {onAddToCart && (
            <button onClick={() => { onAddToCart(product); onClose(); }} style={{ background:"var(--green)", color:"#fff", border:"none", borderRadius:9, padding:"11px 16px", cursor:"pointer", fontSize:".85rem", fontWeight:700 }}>
              🛒
            </button>
          )}
        </div>

        <div className="divider-h"/>

        {/* Avis */}
        <div className="avis-section">
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".95rem", color:"var(--ink)", marginBottom:12 }}>
            💬 Avis clients ({avis.length})
          </div>
          {user && (
            <FormulaireAvis
              productId={product.id}
              userId={user.id}
              userName={userData?.nom || user.email}
              onSubmit={newAvis => setAvis(prev => [{ ...newAvis, id: Date.now() }, ...prev])}
            />
          )}
          {avis.length === 0 ? (
            <div style={{ fontSize:".8rem", color:"var(--gray)", textAlign:"center", padding:"12px 0" }}>Aucun avis pour l'instant.</div>
          ) : avis.map(a => (
            <div key={a.id} className="avis-card">
              <div className="avis-header">
                <div>
                  <span className="avis-auteur">{a.auteur}</span>
                  <Stars value={a.note} />
                </div>
                <span className="avis-date">{a.created_at ? new Date(a.created_at).toLocaleDateString("fr-FR") : ""}</span>
              </div>
              <p className="avis-texte">{a.texte}</p>
            </div>
          ))}
        </div>

        {showCmdModal && (
          <ModalCommander product={product} user={user} userData={userData} onClose={() => setShowCmdModal(false)} />
        )}
      </div>
        </div>
      </div>
    );
}

// ─────────────────────────────────────────────────────────────
// COMPOSANT : COMPTE À REBOURS OFFRE FLASH
// ─────────────────────────────────────────────────────────────
function FlashCountdown() {
  const getSecondsLeft = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(23, 59, 59, 999);
    return Math.floor((midnight - now) / 1000);
  };
  const [secs, setSecs] = useState(getSecondsLeft);
  useEffect(() => {
    const t = setInterval(() => setSecs(s => s > 0 ? s - 1 : getSecondsLeft()), 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return (
    <div style={{display:"flex",gap:4,alignItems:"center"}}>
      {[h,m,s].map((v,i) => (
        <span key={i} style={{display:"flex",alignItems:"center",gap:4}}>
          <span style={{background:"var(--red)",color:"#fff",padding:"2px 7px",borderRadius:5,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".82rem",minWidth:30,textAlign:"center"}}>{v}</span>
          {i < 2 && <span style={{fontWeight:800,color:"var(--red)",fontSize:".82rem"}}>:</span>}
        </span>
      ))}
    </div>
  );
}

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

              (/* ── INFOS ── */)
          <div className="prod-info" onClick={()=>setFicheOpen(p)}>
                (/* Badges vendeur */) 
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

// ─────────────────────────────────────────────────────────────
// DASHBOARD SELLER
// ─────────────────────────────────────────────────────────────
function SellerDashboard({ user, userData, dashTab, setDashTab }) {
  const [mesProduits, setMesProduits]   = useState([]);
  const [mesCommandes, setMesCommandes] = useState([]);
  const [wallet, setWallet]             = useState({ solde:0, total_gagne:0 });
  const [loadingData, setLoadingData]   = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      setLoadingData(true);
      const [{ data: prods }, { data: cmds }, { data: wal }] = await Promise.all([
        supabase.from("products").select("*").eq("vendeur_id", user.id).order("created_at", { ascending:false }),
        supabase.from("orders").select("*").eq("vendeur_id", user.id).order("created_at", { ascending:false }),
        supabase.from("wallets").select("*").eq("user_id", user.id).maybeSingle(),
      ]);
      setMesProduits(prods || []);
      setMesCommandes(cmds || []);
      if (wal) setWallet(wal);
      setLoadingData(false);
    };
    loadAll();
  }, [user.id]);

  const revenusTotal    = mesCommandes.filter(c => c.status === "delivered").reduce((a, c) => a + (c.montant_vendeur || 0), 0);
  const commandesActives = mesCommandes.filter(c => ["pending","paid","shipped"].includes(c.status)).length;

  const updateOrderStatus = async (orderId, field, value) => {
    await supabase.from("orders").update({ [field]: value }).eq("id", orderId);
    setMesCommandes(prev => prev.map(c => c.id === orderId ? {...c, [field]: value} : c));
  };

  if (loadingData) return <div className="loading"><div className="spinner"/>Chargement...</div>;

  return (
    <>
      {dashTab === "overview" && (
        <>
          <div className="dash-page-title">Bonjour {userData?.nom} 🏪</div>
          <div className="dash-stats">
            {[
              { icon:"🏪", val:mesProduits.length,          lbl:"Produits actifs",   trend:"" },
              { icon:"📦", val:commandesActives,            lbl:"Commandes actives", trend:"" },
              { icon:"✅", val:mesCommandes.filter(c=>c.status==="delivered").length, lbl:"Livrées", trend:"" },
              { icon:"💰", val:`${revenusTotal.toLocaleString()} F`, lbl:"Revenus nets", trend:"+5%" },
            ].map(s => (
              <div key={s.lbl} className="dstat">
                <div className="dstat-icon">{s.icon}</div>
                <div className="dstat-val">{s.val}</div>
                <div className="dstat-lbl">{s.lbl}</div>
                {s.trend && <div className="dstat-trend">{s.trend}</div>}
              </div>
            ))}
          </div>

          {/* Dernières commandes */}
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".95rem", color:"var(--ink)", marginBottom:12 }}>Dernières commandes reçues</div>
          {mesCommandes.length === 0
            ? <div className="empty-state"><div className="empty-icon">📦</div><p>Aucune commande pour l'instant</p></div>
            : mesCommandes.slice(0, 5).map(c => (
                <div key={c.id} className="order-card">
                  <div className="oc-icon">📦</div>
                  <div className="oc-info">
                    <div className="oc-name">#{String(c.id).slice(-8)} — {c.client_nom || "Client"}</div>
                    <div className="oc-meta">
                      {c.montant?.toLocaleString()} FCFA · Commission: {c.commission?.toLocaleString()} F · Net: {c.montant_vendeur?.toLocaleString()} F
                      <br/>📞 {c.telephone || "-"} · {c.created_at ? new Date(c.created_at).toLocaleDateString("fr-FR") : ""}
                    </div>
                  </div>
                  <div className="oc-actions">
                    <span className={`status-badge s-${c.status}`}>{c.status}</span>
                    <span className={`status-badge s-${c.escrow_status}`}>{ESCROW_STATUSES[c.escrow_status] || c.escrow_status}</span>
                  </div>
                </div>
              ))
          }
        </>
      )}

      {dashTab === "mesProduits" && (
        <>
          <div className="dash-page-title">🏪 Mes produits ({mesProduits.length})</div>
          {mesProduits.length === 0
            ? <div className="empty-state"><div className="empty-icon">📦</div><p>Aucun produit</p><button className="form-submit" style={{width:"auto",padding:"10px 24px",marginTop:12}} onClick={()=>setDashTab("ajouterProduit")}>+ Ajouter</button></div>
            : <div className="prod-grid">
                {mesProduits.map(p => (
                  <div key={p.id} className="prod-card">
                    <div className="prod-img-wrap">
                      {(p.image && p.image.startsWith("http")) || (p.image_urls?.[0] && p.image_urls[0].startsWith("http"))
                        ? <img
                            src={p.image && p.image.startsWith("http") ? p.image : p.image_urls[0]}
                            alt={p.name_fr}
                            onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src="https://via.placeholder.com/300?text=📦";}}
                          />
                        : <div className="prod-img-placeholder">📦</div>
                      }
                      {!p.actif && <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:".8rem",fontWeight:700}}>Désactivé</div>}
                    </div>
                    <div className="prod-info">
                      <div className="prod-name">{p.name_fr}</div>
                      <div className="prod-loc">👁 {p.vues||0} vues · Stock: {p.stock != null ? p.stock : "-"}</div>
                      <div className="prod-price-row">
                        <span className="price">{p.prix?.toLocaleString()} <span className="price-unit">FCFA</span></span>
                        <button
                          style={{background:"var(--red)",color:"#fff",border:"none",width:26,height:26,borderRadius:6,cursor:"pointer",fontSize:".85rem",display:"flex",alignItems:"center",justifyContent:"center"}}
                          onClick={async () => { if (!window.confirm("Supprimer ?")) return; await supabase.from("products").update({actif:false}).eq("id",p.id); setMesProduits(prev=>prev.filter(x=>x.id!==p.id)); }}
                        >🗑</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          }
        </>
      )}

      {dashTab === "ajouterProduit" && (
        <FormulaireProduit user={user} userData={userData} onSaved={() => setDashTab("mesProduits")} />
      )}

      {dashTab === "commandes" && (
        <>
          <div className="dash-page-title">📦 Toutes les commandes ({mesCommandes.length})</div>
          {mesCommandes.length === 0
            ? <div className="empty-state"><div className="empty-icon">📦</div><p>Aucune commande</p></div>
            : mesCommandes.map(c => (
                <div key={c.id} className="order-card" style={{ flexDirection:"column", alignItems:"stretch" }}>
                  <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                    <div className="oc-icon">📦</div>
                    <div className="oc-info">
                      <div className="oc-name">#{String(c.id).slice(-8)} — {c.client_nom}</div>
                      <div className="oc-meta">
                        💰 {c.montant?.toLocaleString()} FCFA · Net vendeur: {c.montant_vendeur?.toLocaleString()} FCFA<br/>
                        📞 {c.telephone} · {c.created_at ? new Date(c.created_at).toLocaleDateString("fr-FR") : ""}
                      </div>
                    </div>
                    <div className="oc-actions">
                      <span className={`status-badge s-${c.status}`}>{c.status}</span>
                      <span className={`status-badge s-${c.escrow_status}`}>{c.escrow_status}</span>
                      <span className={`status-badge s-${c.livraison_status}`}>{c.livraison_status}</span>
                    </div>
                  </div>
                  {/* Actions rapides */}
                  <div style={{ display:"flex", gap:6, marginTop:10, flexWrap:"wrap" }}>
                    {c.status === "pending" && (
                      <button className="btn-action-sm" onClick={() => updateOrderStatus(c.id, "status", "paid")}>✅ Marquer payée</button>
                    )}
                    {c.status === "paid" && (
                      <button className="btn-action-sm" onClick={() => updateOrderStatus(c.id, "status", "shipped")}>🚚 Marquer expédiée</button>
                    )}
                    {c.escrow_status === "pending" && c.status === "paid" && (
                      <button className="btn-action-sm" onClick={() => updateOrderStatus(c.id, "escrow_status", "securise")}>🔐 Sécuriser Escrow</button>
                    )}
                    {c.escrow_status === "securise" && c.status === "shipped" && (
                      <button className="btn-action-sm" onClick={() => updateOrderStatus(c.id, "escrow_status", "libere")}>💰 Libérer Escrow</button>
                    )}
                    {c.livraison_status === "pending" && (
                      <button className="btn-action-sm" onClick={() => updateOrderStatus(c.id, "livraison_status", "en_cours")}>🏍️ Livraison en cours</button>
                    )}
                    {c.livraison_status === "en_cours" && (
                      <button className="btn-action-sm" onClick={() => updateOrderStatus(c.id, "livraison_status", "livre")}>✅ Marquer livré</button>
                    )}
                    <button
                      className="btn-wa-sm"
                      onClick={() => window.open(`https://wa.me/${c.telephone?.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Bonjour ${c.client_nom} ! Votre commande Yorix est en cours de traitement. 🛍️`)}`, "_blank")}
                    >
                      📱 Contacter client
                    </button>
                  </div>
                </div>
              ))
          }
        </>
      )}

      {dashTab === "wallet" && (
        <>
          <div className="dash-page-title">💰 Mon Wallet</div>
          <div className="wallet-card">
            <div className="wc-label">Solde disponible</div>
            <div className="wc-amount">{wallet.solde?.toLocaleString() || 0} FCFA</div>
            <div className="wc-sub">
              Total gagné : {wallet.total_gagne?.toLocaleString() || 0} FCFA · Commission Yorix {Math.round(COMMISSION_RATE*100)}%
            </div>
          </div>
          <div className="commission-box">
            <span>Revenus des commandes livrées</span>
            <strong>{revenusTotal.toLocaleString()} FCFA</strong>
          </div>
          <div className="info-box">
            <div className="info-icon">📱</div>
            <p>Retrait MTN MoMo et Orange Money — bientôt disponible.</p>
          </div>
        </>
      )}
    </>
  );
}

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
              { icon:"🌟", val:`${loyaltyPts} pts`,   lbl:"Points fidélité" },
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
                <div key={c.id} className="order-card">
                  <div className="oc-icon">📦</div>
                  <div className="oc-info">
                    <div className="oc-name">#{String(c.id).slice(-8)}</div>
                    <div className="oc-meta">{c.montant?.toLocaleString()} FCFA · {c.created_at ? new Date(c.created_at).toLocaleDateString("fr-FR") : ""}</div>
                  </div>
                  <div className="oc-actions">
                    <span className={`status-badge s-${c.status}`}>{c.status}</span>
                    <span className={`status-badge s-${c.escrow_status}`}>{ESCROW_STATUSES[c.escrow_status] || c.escrow_status}</span>
                  </div>
                </div>
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
    try {
      await supabase.from("deliveries").update({ status: newStatus, livreur_id: user.id }).eq("commande_id", id).then(r => r.error && console.error(r.error));
      setLivraisons(prev => prev.map(l => l.id === id ? {...l, status: newStatus} : l));
    } catch (err) {
      console.error("actionLivraison:", err);
      setLivraisons(prev => prev.map(l => l.id === id ? {...l, status: newStatus} : l));
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
        <span className={`status-badge s-${l.status==="available"?"pending":l.status==="in_progress"?"en_cours":l.status}`}>
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
        <div style={{display:"flex",gap:8}}>
          <button
            style={{flex:1,background:"#1565c0",color:"#fff",border:"none",padding:"9px",borderRadius:8,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem",cursor:"pointer"}}
            onClick={() => window.open(`https://wa.me/${l.telephone?.replace(/\D/g,"")}?text=${encodeURIComponent(`Bonjour ${l.client} ! Je suis votre livreur Yorix, je suis en route. 🚚\n\n📍 J'arrive dans ${l.temps_estime}.`)}`, "_blank")}
          >📱 Contacter client</button>
          <button
            style={{flex:1,background:"var(--green)",color:"#fff",border:"none",padding:"9px",borderRadius:8,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".78rem",cursor:"pointer"}}
            onClick={() => actionLivraison(l.id, "delivered")}
          >✅ Confirmer livraison</button>
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
          { icon:"💰", val:`${gainsTotal.toLocaleString()} F`, lbl:"Gains disponibles", trend:`${gainsMois.toLocaleString()} F ce mois` },
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

  const repondre = (id, accepte) => setDemandes(prev => prev.map(d => d.id === id ? {...d, status: accepte ? "accepted" : "refused"} : d));

  const saveService = async () => {
    if (!serviceForm.nom || !serviceForm.prix) { alert("Nom et prix obligatoires !"); return; }
    await supabase.from("services").insert({ ...serviceForm, prix: Number(serviceForm.prix), provider_id: user.id, provider_nom: userData?.nom }).catch(e => console.warn(e?.message));
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
function AdminDashboard({ user, userData, goPage }) {

  // ── États principaux ──
  const [adminTab, setAdminTab]       = useState("overview");
  const [loading, setLoading]         = useState(true);
  const [refreshKey, setRefreshKey]   = useState(0);

  // ── Données ──
  const [stats, setStats]             = useState({ users:0, products:0, orders:0, revenue:0, revenueToday:0, revenueWeek:0, commissionTotal:0, vendeurs:0, livreurs:0 });
  const [produits, setProduits]       = useState([]);
  const [produitsFull, setProduitsFull] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [commandes, setCommandes]     = useState([]);
  const [chartVentes, setChartVentes] = useState([]);
  const [chartInscrits, setChartInscrits] = useState([]);
  const [topProduits, setTopProduits] = useState([]);

  // ── Filtres produits ──
  const [searchProd, setSearchProd]   = useState("");
  const [filterProdCat, setFilterProdCat] = useState("");
  const [filterProdStatut, setFilterProdStatut] = useState("");

  // ── Filtres utilisateurs ──
  const [searchUser, setSearchUser]   = useState("");
  const [filterRole, setFilterRole]   = useState("");

  // ── Filtres commandes ──
  const [filterOrder, setFilterOrder] = useState("");
  const [sortOrder, setSortOrder]     = useState("desc");

  // ── Modals détails ──
  const [selectedProd, setSelectedProd] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // ── Toast notifications ──
  const [toast, setToast]             = useState(null);

  // ─── Sécurité admin ───
  if (!user || (userData?.role !== "admin" && userData?.role !== "superadmin")) {
    return (
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"60vh",gap:16,padding:40}}>
        <div style={{fontSize:"4rem"}}>🔒</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.4rem",color:"var(--ink)"}}>Accès refusé</div>
        <p style={{color:"var(--gray)",textAlign:"center",maxWidth:400,lineHeight:1.7}}>
          Cette page est réservée aux administrateurs Yorix.<br/>
          Connectez-vous avec un compte admin pour y accéder.
        </p>
        <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"}}>
          <button className="form-submit" style={{width:"auto",padding:"10px 24px"}} onClick={()=>goPage("home")}>← Retour à l'accueil</button>
          <button className="btn-ghost" style={{padding:"10px 18px"}} onClick={()=>goPage("dashboard")}>Mon espace</button>
        </div>
        <div style={{background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:10,padding:"12px 16px",marginTop:8,fontSize:".78rem",color:"var(--gray)",maxWidth:420,textAlign:"center"}}>
          💡 Pour activer le mode admin : Supabase → Table <strong>users</strong> → trouve ton compte → change la colonne <strong>role</strong> en <code>admin</code>
        </div>
      </div>
    );
  }

  // ─── Affichage toast ───
  const showToast = (msg, type="success") => {
    setToast({msg, type});
    setTimeout(() => setToast(null), 3000);
  };

  // ─── Chargement des données ───
  useEffect(() => { loadAll(); }, [refreshKey]);

  const loadAll = async () => {
    setLoading(true);
    try {
      const today = new Date(); today.setHours(0,0,0,0);
      const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate()-7);

      const [usersRes, profilesRes, prodRes, ordersRes] = await Promise.all([
  supabase.from("users").select("*").order("created_at",{ascending:false}).limit(500),
  supabase.from("profiles").select("*").order("created_at",{ascending:false}).limit(500),
  supabase.from("products").select("*").order("created_at",{ascending:false}).limit(500),
  supabase.from("orders").select("*").order("created_at",{ascending:false}).limit(500),
]);

// Fusionner users + profiles (dédupliquer par id/uid)
const rawUsers    = usersRes.data    || [];
const rawProfiles = profilesRes.data || [];
const mergedMap = new Map();
[...rawUsers, ...rawProfiles].forEach(u => {
  const key = u.uid || u.id;
  if (!key) return;
  const existing = mergedMap.get(key) || {};
  mergedMap.set(key, { ...existing, ...u, uid: key });
});
const usersData = Array.from(mergedMap.values());
console.log("[Admin] usersRes:", usersRes.error, "count:", rawUsers.length);
console.log("[Admin] profilesRes:", profilesRes.error, "count:", rawProfiles.length);
console.log("[Admin] merged users:", usersData.length);
      const prodsData   = prodRes.data    || [];
      const ordersData  = ordersRes.data  || [];

      // Stats globales
      const commissionTotal = ordersData.reduce((s,o) => s+(o.commission||0), 0);
      const revenueTotal    = ordersData.reduce((s,o) => s+(o.montant||0), 0);
      const revenueToday    = ordersData.filter(o => new Date(o.created_at) >= today).reduce((s,o) => s+(o.commission||0), 0);
      const revenueWeek     = ordersData.filter(o => new Date(o.created_at) >= weekAgo).reduce((s,o) => s+(o.commission||0), 0);

      // Graphique ventes 7 jours
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

      // Top produits par ventes simulées
      const topP = prodsData
        .filter(p => p.vente_total > 0)
        .sort((a,b) => (b.vente_total||0) - (a.vente_total||0))
        .slice(0,5);

      setStats({
        users: usersData.length,
        products: prodsData.length,
        orders: ordersData.length,
        revenue: revenueTotal,
        commissionTotal,
        revenueToday,
        revenueWeek,
        vendeurs: usersData.filter(u=>u.role==="seller").length,
        livreurs: usersData.filter(u=>u.role==="delivery").length,
        ruptures: prodsData.filter(p=>(p.stock||0)===0).length,
        enAttente: ordersData.filter(o=>o.status==="pending").length,
      });
      setUtilisateurs(usersData);
      setProduits(prodsData);
      setProduitsFull(prodsData);
      setCommandes(ordersData);
      setChartVentes(chartV);
      setChartInscrits(chartI);
      setTopProduits(topP);

    } catch(e) { console.error("Admin load:", e); showToast("Erreur de chargement", "error"); }
    setLoading(false);
  };

  // ─── Actions ───
 const supprimerProduit = async (id, nom) => {
  if (!window.confirm(`Supprimer "${nom}" ? Cette action est irréversible.`)) return;
  const { error } = await supabase.from("products").delete().eq("id",id);
  if (error) { console.error("supprimerProduit:", error); showToast("Erreur : "+error.message, "error"); return; }
  setProduits(p => p.filter(x=>x.id!==id));
  setProduitsFull(p => p.filter(x=>x.id!==id));
  showToast(`Produit "${nom}" supprimé`);
};

  const toggleActifProduit = async (id, actif) => {
  const { error } = await supabase.from("products").update({actif:!actif}).eq("id",id);
  if (error) { console.error("toggleActifProduit:", error); showToast("Erreur : "+error.message, "error"); return; }
  const update = p => p.map(x=>x.id===id?{...x,actif:!actif}:x);
  setProduits(update); setProduitsFull(update);
  showToast(actif ? "Produit désactivé" : "Produit activé");
};


 const changerRole = async (uid, newRole) => {
  const [r1, r2] = await Promise.all([
    supabase.from("users").update({role:newRole}).eq("uid",uid),
    supabase.from("profiles").update({role:newRole}).eq("id",uid),
  ]);
  if (r1.error && r2.error) { console.error("changerRole:", r1.error, r2.error); showToast("Erreur changement rôle", "error"); return; }
  setUtilisateurs(u => u.map(x=>(x.uid||x.id)===uid?{...x,role:newRole}:x));
  showToast(`Rôle changé → ${newRole}`);
};


 const supprimerUser = async (uid, email) => {
  if (!window.confirm(`Supprimer l'utilisateur "${email}" ?`)) return;
  const { error } = await supabase.from("users").delete().eq("uid",uid);
  if (error) { console.error("supprimerUser:", error); showToast("Erreur : "+error.message, "error"); return; }
  setUtilisateurs(u => u.filter(x=>(x.uid||x.id)!==uid));
  showToast(`Utilisateur supprimé`);
};

 const toggleVendeur = async (uid, actif) => {
  const { error } = await supabase.from("users").update({actif:!actif}).eq("uid",uid);
  if (error) { console.error("toggleVendeur:", error); showToast("Erreur : "+error.message, "error"); return; }
  setUtilisateurs(u => u.map(x=>(x.uid||x.id)===uid?{...x,actif:!actif}:x));
  showToast(actif ? "Vendeur suspendu" : "Vendeur réactivé");
};

 const validerCommande = async (id) => {
  const { error } = await supabase.from("orders").update({status:"validee"}).eq("id",id);
  if (error) { console.error("validerCommande:", error); showToast("Erreur : "+error.message, "error"); return; }
  setCommandes(c => c.map(x=>x.id===id?{...x,status:"validee"}:x));
  showToast("Commande validée ✅");
};

  const marquerLivre = async (id) => {
  const { error } = await supabase.from("orders").update({status:"livre",livraison_status:"livre",escrow_status:"libere"}).eq("id",id);
  if (error) { console.error("marquerLivre:", error); showToast("Erreur : "+error.message, "error"); return; }
  setCommandes(c => c.map(x=>x.id===id?{...x,status:"livre",livraison_status:"livre",escrow_status:"libere"}:x));
  showToast("Commande marquée livrée 📦");
};

  const annulerCommande = async (id) => {
  if (!window.confirm("Annuler cette commande ?")) return;
  const { error } = await supabase.from("orders").update({status:"annulee"}).eq("id",id);
  if (error) { console.error("annulerCommande:", error); showToast("Erreur : "+error.message, "error"); return; }
  setCommandes(c => c.map(x=>x.id===id?{...x,status:"annulee"}:x));
  showToast("Commande annulée");
};
  const rembourserCommande = async (id) => {
    if (!window.confirm("Rembourser cette commande ? Le client sera contacté.")) return;
    await supabase.from("orders").update({
      status:"rembourse",
      escrow_status:"rembourse",
    }).eq("id",id).catch(()=>{});
    setCommandes(c => c.map(x=>x.id===id?{...x,status:"rembourse",escrow_status:"rembourse"}:x));
    showToast("Commande remboursée 💸");
  };

  const changerLivraison = async (id, newStatus) => {
    await supabase.from("orders").update({livraison_status:newStatus}).eq("id",id).catch(()=>{});
    setCommandes(c => c.map(x=>x.id===id?{...x,livraison_status:newStatus}:x));
    showToast(`Livraison → ${newStatus}`);
  };

  const verifierUser = async (uid, verifie) => {
    await supabase.from("users").update({verifie:!verifie}).eq("uid",uid).catch(()=>{});
    setUtilisateurs(u => u.map(x=>(x.uid||x.id)===uid?{...x,verifie:!verifie}:x));
    showToast(verifie ? "Vérification retirée" : "Utilisateur vérifié ✅");
  };

  const envoyerNotifUser = async (uid, titre, message) => {
    await supabase.from("notifications").insert({
      user_id: uid,
      titre,
      message,
      lu: false,
      icon: "📢",
    }).catch(()=>{});
    showToast("Notification envoyée 📢");
  };

  // ─── Export CSV ───
  const exportCSV = (data, filename) => {
    if (!data.length) return;
    const keys = Object.keys(data[0]);
    const csv = [keys.join(","), ...data.map(row => keys.map(k => `"${(row[k]||"").toString().replace(/"/g,'""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], {type:"text/csv"});
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a"); a.href=url; a.download=filename; a.click();
    showToast(`Export ${filename} téléchargé`);
  };

  // ─── Filtres calculés ───
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
  const alertes   = [
    ...produits.filter(p=>(p.stock||0)===0).map(p=>({type:"red",  label:"Stock 0",  msg:`📦 ${p.name_fr||"Produit"} — vendeur : ${p.vendeur_nom||"?"}`})),
    ...commandes.filter(o=>o.status==="pending").map(o=>({type:"yellow", label:"Commande", msg:`⏳ ${o.client_nom||"Client"} — ${(o.montant||0).toLocaleString()} FCFA`})),
    ...utilisateurs.filter(u=>new Date()-new Date(u.created_at)<86400000).map(u=>({type:"green", label:"Nouveau", msg:`🆕 ${u.nom||u.email||"Utilisateur"} — ${u.role||"buyer"}`})),
  ];

  const maxChartV   = Math.max(...chartVentes.map(d=>d.orders), 1);
  const maxChartRev = Math.max(...chartVentes.map(d=>d.revenue), 1);
  const maxChartI   = Math.max(...chartInscrits.map(d=>d.val), 1);

 const CATS_LIST = ["Téléphones & HighTech","Mode & Accesoires","Alimentation","Maison & Decoration","Agricole","Beauté & Soins","BTP","Automobile","Éducation","Services"];
  // ─── Navigation ───
  const NAV = [
    {id:"overview",    icon:"📊", label:"Vue d'ensemble"},
    {id:"produits",    icon:"📦", label:"Produits",    badge:produits.filter(p=>(p.stock||0)===0).length||null},
    {id:"commandes",   icon:"🛍️", label:"Commandes",   badge:commandes.filter(o=>o.status==="pending").length||null},
    {id:"utilisateurs",icon:"👥", label:"Utilisateurs"},
    {id:"vendeurs",    icon:"🏪", label:"Vendeurs"},
    {id:"revenus",     icon:"💰", label:"Revenus"},
    {id:"alertes",     icon:"🔔", label:"Alertes",     badge:alertes.length||null},
  ];

  // ─── Helpers UI ───
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

  if (loading) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"50vh",gap:14,color:"var(--green)",flexDirection:"column"}}>
      <div style={{width:40,height:40,border:"4px solid var(--border)",borderTopColor:"var(--green)",borderRadius:"50%",animation:"spin .7s linear infinite"}}/>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700}}>Chargement des données Yorix...</div>
    </div>
  );

  return (
    <div className="admin-layout" style={{minHeight:"calc(100vh - 130px)"}}>

      {/* ── TOAST ── */}
      {toast && (
        <div style={{
          position:"fixed",bottom:24,right:24,zIndex:9999,
          background:toast.type==="error"?"#ce1126":"var(--green)",
          color:"#fff",padding:"12px 20px",borderRadius:10,
          fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".85rem",
          boxShadow:"0 4px 20px rgba(0,0,0,.2)",animation:"fadeUp .3s ease",
          display:"flex",alignItems:"center",gap:8,
        }}>
          {toast.type==="error"?"❌":"✅"} {toast.msg}
        </div>
      )}
      {/* ── MODAL DÉTAIL COMMANDE ── */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setSelectedOrder(null)}>
          <div className="modal modal-lg">
            <button className="modal-close" onClick={()=>setSelectedOrder(null)}>✕</button>
            <div className="modal-title">🛍️ Commande #{String(selectedOrder.id).slice(-8)}</div>
            <div className="modal-sub">{selectedOrder.created_at ? new Date(selectedOrder.created_at).toLocaleString("fr-FR") : ""}</div>

            {/* Statuts */}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
              <BadgeStatut statut={selectedOrder.status}/>
              <BadgeStatut statut={selectedOrder.escrow_status}/>
              <BadgeStatut statut={selectedOrder.livraison_status}/>
            </div>

            {/* Infos client + vendeur */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
              <div style={{background:"var(--surface2)",borderRadius:10,padding:12}}>
                <div style={{fontSize:".7rem",color:"var(--gray)",fontWeight:700,marginBottom:6}}>👤 CLIENT</div>
                <div style={{fontSize:".82rem",fontWeight:600}}>{selectedOrder.client_nom||"—"}</div>
                <div style={{fontSize:".72rem",color:"var(--gray)",marginTop:3}}>📞 {selectedOrder.telephone||"—"}</div>
                {selectedOrder.adresse && <div style={{fontSize:".72rem",color:"var(--gray)",marginTop:3}}>📍 {selectedOrder.adresse}</div>}
              </div>
              <div style={{background:"var(--surface2)",borderRadius:10,padding:12}}>
                <div style={{fontSize:".7rem",color:"var(--gray)",fontWeight:700,marginBottom:6}}>🏪 VENDEUR</div>
                <div style={{fontSize:".82rem",fontWeight:600}}>
                  {utilisateurs.find(u=>(u.uid||u.id)===selectedOrder.vendeur_id)?.nom||"—"}
                </div>
                <div style={{fontSize:".72rem",color:"var(--gray)",marginTop:3}}>
                  {utilisateurs.find(u=>(u.uid||u.id)===selectedOrder.vendeur_id)?.telephone||"—"}
                </div>
              </div>
            </div>

            {/* Produit */}
            {(() => {
              const prod = produits.find(p=>p.id===selectedOrder.product_id);
              return prod ? (
                <div style={{background:"var(--surface2)",borderRadius:10,padding:12,marginBottom:14,display:"flex",gap:10,alignItems:"center"}}>
                  {prod.image && <img src={prod.image} alt="" style={{width:60,height:60,borderRadius:8,objectFit:"cover"}}/>}
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:".85rem"}}>{prod.name_fr}</div>
                    <div style={{fontSize:".7rem",color:"var(--gray)"}}>{prod.categorie} · {prod.ville}</div>
                  </div>
                </div>
              ) : null;
            })()}

            {/* Montants */}
            <div style={{background:"var(--green-pale)",border:"1px solid var(--green-light)",borderRadius:10,padding:14,marginBottom:16}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:".8rem",marginBottom:5}}>
                <span style={{color:"var(--gray)"}}>Montant total</span>
                <strong>{(selectedOrder.montant||0).toLocaleString()} FCFA</strong>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:".8rem",marginBottom:5}}>
                <span style={{color:"var(--gray)"}}>Commission Yorix (5%)</span>
                <strong style={{color:"var(--red)"}}>−{(selectedOrder.commission||0).toLocaleString()} FCFA</strong>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:".9rem",fontWeight:800,color:"var(--green)",paddingTop:6,borderTop:"1px dashed var(--green-light)"}}>
                <span>Net vendeur</span>
                <span>{(selectedOrder.montant_vendeur||0).toLocaleString()} FCFA</span>
              </div>
            </div>

            {/* Actions rapides */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:8}}>
              {selectedOrder.status==="pending" && (
                <button className="admin-action-btn" style={{background:"#e6f0ff",color:"#1a4a9a",padding:"8px"}} onClick={()=>{validerCommande(selectedOrder.id);setSelectedOrder(null);}}>✅ Valider commande</button>
              )}
              {selectedOrder.status==="validee" && (
                <button className="admin-action-btn" style={{background:"#e6fff0",color:"#1a6b3a",padding:"8px"}} onClick={()=>{marquerLivre(selectedOrder.id);setSelectedOrder(null);}}>📦 Marquer livrée</button>
              )}
              {selectedOrder.livraison_status!=="en_cours" && selectedOrder.livraison_status!=="livre" && (
                <button className="admin-action-btn" style={{background:"#fff9e6",color:"#b8860b",padding:"8px"}} onClick={()=>changerLivraison(selectedOrder.id,"en_cours")}>🏍️ Livraison en cours</button>
              )}
              {!["rembourse","annulee"].includes(selectedOrder.status) && (
                <button className="admin-action-btn" style={{background:"#e0f2f1",color:"#00695c",padding:"8px"}} onClick={()=>{rembourserCommande(selectedOrder.id);setSelectedOrder(null);}}>💸 Rembourser</button>
              )}
              {!["livre","annulee"].includes(selectedOrder.status) && (
                <button className="admin-action-btn" style={{background:"#fff0f0",color:"#ce1126",padding:"8px"}} onClick={()=>{annulerCommande(selectedOrder.id);setSelectedOrder(null);}}>❌ Annuler</button>
              )}
              {selectedOrder.telephone && (
                <button className="admin-action-btn" style={{background:"#dcfce7",color:"#166534",padding:"8px",gridColumn:"1/-1"}} onClick={()=>window.open(`https://wa.me/${selectedOrder.telephone.replace(/\D/g,"")}?text=${encodeURIComponent(`Bonjour ${selectedOrder.client_nom||""}, concernant votre commande Yorix #${String(selectedOrder.id).slice(-8)}`)}`)}>📱 Contacter client WhatsApp</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL DÉTAIL UTILISATEUR ── */}
      {selectedUser && (
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setSelectedUser(null)}>
          <div className="modal">
            <button className="modal-close" onClick={()=>setSelectedUser(null)}>✕</button>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
              <div style={{width:56,height:56,borderRadius:"50%",background:"var(--green)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.6rem",fontWeight:800}}>
                {(selectedUser.nom||selectedUser.email||"?")[0].toUpperCase()}
              </div>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem"}}>{selectedUser.nom||"—"}</div>
                <div style={{fontSize:".75rem",color:"var(--gray)"}}>{selectedUser.email||"—"}</div>
                <span className={`role-chip chip-${selectedUser.role||"buyer"}`} style={{marginTop:4,display:"inline-block"}}>{ROLE_LABELS[selectedUser.role]||selectedUser.role}</span>
              </div>
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:6,background:"var(--surface2)",borderRadius:10,padding:12,marginBottom:14}}>
              {[
                ["📞 Téléphone", selectedUser.telephone||"—"],
                ["📍 Ville", selectedUser.ville||"—"],
                ["✅ Vérifié", selectedUser.verifie?"Oui":"Non"],
                ["🟢 Actif", selectedUser.actif!==false?"Oui":"Non"],
                ["📅 Inscription", selectedUser.created_at?new Date(selectedUser.created_at).toLocaleDateString("fr-FR"):"—"],
                ["🛍️ Commandes", commandes.filter(o=>o.client_id===(selectedUser.uid||selectedUser.id)||o.vendeur_id===(selectedUser.uid||selectedUser.id)).length],
              ].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:".78rem",padding:"3px 0"}}>
                  <span style={{color:"var(--gray)"}}>{k}</span>
                  <strong>{v}</strong>
                </div>
              ))}
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
              <button className="admin-action-btn" style={{background:selectedUser.verifie?"#fff9e6":"#e6fff0",color:selectedUser.verifie?"#b8860b":"#1a6b3a",padding:"8px"}} onClick={()=>{verifierUser(selectedUser.uid||selectedUser.id,selectedUser.verifie);setSelectedUser({...selectedUser,verifie:!selectedUser.verifie});}}>
                {selectedUser.verifie?"❌ Retirer vérif":"✅ Vérifier"}
              </button>
              <button className="admin-action-btn" style={{background:"#e6f0ff",color:"#1a4a9a",padding:"8px"}} onClick={()=>{
                const titre = prompt("Titre de la notification :");
                if (!titre) return;
                const msg = prompt("Message :");
                if (!msg) return;
                envoyerNotifUser(selectedUser.uid||selectedUser.id, titre, msg);
              }}>📢 Notifier</button>
              {selectedUser.telephone && (
                <button className="admin-action-btn" style={{background:"#dcfce7",color:"#166534",padding:"8px",gridColumn:"1/-1"}} onClick={()=>window.open(`https://wa.me/${selectedUser.telephone.replace(/\D/g,"")}?text=${encodeURIComponent(`Bonjour ${selectedUser.nom||""}, l'équipe Yorix vous contacte.`)}`)}>📱 WhatsApp</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL DÉTAIL PRODUIT ── */}
      {selectedProd && typeof document !== 'undefined' && ReactDOM.createPortal(
  <div style={{position:"fixed",inset:0,zIndex:999,background:"var(--bg)",overflowY:"auto"}}>
         <div style={{maxWidth:1100,margin:"0 auto",padding:"16px 16px 40px"}}>
           <button onClick={()=>setSelectedProd(null)} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"var(--gray)",fontSize:"14px",marginBottom:20,padding:"8px 0",fontWeight:500}}>
        ← Retour aux produits
      </button>
            <div className="modal-title">{selectedProd.name_fr||"Produit"}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:12}}>
              {selectedProd.image && (
                <img src={selectedProd.image} alt="" style={{width:"100%",borderRadius:10,objectFit:"cover",maxHeight:200}} onError={e=>e.target.style.display="none"}/>
              )}
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {[
                  ["Vendeur", selectedProd.vendeur_nom||"—"],
                  ["Prix", `${(selectedProd.prix||0).toLocaleString()} FCFA`],
                  ["Stock", selectedProd.stock||0],
                  ["Catégorie", selectedProd.categorie||"—"],
                  ["Ville", selectedProd.ville||"—"],
                  ["Statut", selectedProd.actif?"Actif":"Inactif"],
                  ["Vues", selectedProd.vues||0],
                  ["Ventes", selectedProd.vente_total||0],
                ].map(([k,v])=>(
                  <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:".8rem",padding:"5px 0",borderBottom:"1px solid var(--border)"}}>
                    <span style={{color:"var(--gray)"}}>{k}</span>
                    <strong style={{color:"var(--ink)"}}>{v}</strong>
                  </div>
                ))}
              </div>
            </div>
            {selectedProd.description_fr && (
              <div style={{marginTop:14,fontSize:".8rem",color:"var(--gray)",lineHeight:1.7}}>{selectedProd.description_fr}</div>
            )}
            <div style={{display:"flex",gap:8,marginTop:16}}>
              <button className="form-submit" style={{flex:1}} onClick={()=>{toggleActifProduit(selectedProd.id,selectedProd.actif);setSelectedProd(null);}}>
                {selectedProd.actif?"⛔ Désactiver":"✅ Activer"}
              </button>
              <button className="btn-ghost" style={{flex:1}} onClick={()=>{supprimerProduit(selectedProd.id,selectedProd.name_fr);setSelectedProd(null);}}>
                🗑️ Supprimer
              </button>
            </div>
          </div>
        </div>
     , document.body)}

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
          <div style={{fontSize:".67rem",color:"rgba(255,255,255,.3)",marginTop:6,padding:"6px 8px",background:"rgba(255,255,255,.04)",borderRadius:6}}>
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
          <button onClick={()=>setRefreshKey(k=>k+1)} style={{width:"100%",background:"rgba(79,209,125,.12)",color:"#4fd17d",border:"1px solid rgba(79,209,125,.2)",borderRadius:7,padding:"8px",fontSize:".75rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
            🔄 Actualiser
          </button>
          <button onClick={()=>goPage("home")} style={{width:"100%",background:"rgba(255,255,255,.05)",color:"rgba(255,255,255,.5)",border:"1px solid rgba(255,255,255,.1)",borderRadius:7,padding:"8px",fontSize:".75rem",cursor:"pointer"}}>
            ← Retour au site
          </button>
        </div>

        {/* Mini stats sidebar */}
        <div style={{padding:"14px 16px",marginTop:12,borderTop:"1px solid rgba(255,255,255,.07)"}}>
          {[
            {l:"Vendeurs",v:stats.vendeurs,c:"#4fd17d"},
            {l:"Livreurs",v:stats.livreurs,c:"#60a5fa"},
            {l:"Ruptures",v:stats.ruptures,c:stats.ruptures>0?"#f87171":"#4fd17d"},
            {l:"En attente",v:stats.enAttente,c:stats.enAttente>0?"#fbbf24":"#4fd17d"},
          ].map(s=>(
            <div key={s.l} style={{display:"flex",justifyContent:"space-between",fontSize:".7rem",padding:"4px 0"}}>
              <span style={{color:"rgba(255,255,255,.4)"}}>{s.l}</span>
              <span style={{color:s.c,fontWeight:700}}>{s.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONTENU PRINCIPAL ── */}
      <div className="admin-content">

        {/* ════ VUE D'ENSEMBLE ════ */}
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
              <StatCard icon="👥" val={stats.users.toLocaleString()} lbl="Utilisateurs" trend={`+${utilisateurs.filter(u=>new Date()-new Date(u.created_at)<86400000*7).length} cette semaine`} col="#e6f0ff" ic="#1a4a9a" onClick={()=>setAdminTab("utilisateurs")}/>
              <StatCard icon="📦" val={stats.products.toLocaleString()} lbl="Produits" trend={`${produits.filter(p=>p.actif).length} actifs · ${produits.filter(p=>!p.actif).length} inactifs`} col="#e6fff0" ic="#1a6b3a" onClick={()=>setAdminTab("produits")}/>
              <StatCard icon="🛍️" val={stats.orders.toLocaleString()} lbl="Commandes" trend={`${stats.enAttente} en attente`} col="#fff9e6" ic="#b8860b" onClick={()=>setAdminTab("commandes")}/>
              <StatCard icon="💰" val={`${stats.commissionTotal.toLocaleString()} F`} lbl="Commissions Yorix" trend="5% par transaction" col="#fff0f6" ic="#a0105a" onClick={()=>setAdminTab("revenus")}/>
              <StatCard icon="📅" val={`${stats.revenueToday.toLocaleString()} F`} lbl="Revenus aujourd'hui" trend="Commissions du jour" col="#f0fff4" ic="#276749"/>
              <StatCard icon="📈" val={`${stats.revenueWeek.toLocaleString()} F`} lbl="Revenus 7 jours" trend="Cette semaine" col="#fef9f0" ic="#7b5a10"/>
              <StatCard icon="🏪" val={stats.vendeurs} lbl="Vendeurs actifs" trend={`${sellers.filter(s=>s.actif!==false).length} actifs`} col="#ede7f6" ic="#6a1b9a"/>
              <StatCard icon="🚚" val={stats.livreurs} lbl="Livreurs" trend="Disponibles" col="#e0f7fa" ic="#006064"/>
            </div>

            {/* Graphiques côte à côte */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
              {/* Graphique commandes */}
              <div className="admin-section">
                <div className="admin-section-title">
                  📈 Commandes / jour
                  <span style={{fontSize:".69rem",color:"var(--gray)",fontWeight:400}}>7 derniers jours</span>
                </div>
                <div style={{display:"flex",alignItems:"flex-end",gap:5,height:90,marginBottom:6}}>
                  {chartVentes.map((d,i)=>(
                    <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                      <div style={{fontSize:".6rem",color:"var(--gray)"}}>{d.orders||""}</div>
                      <div style={{
                        width:"100%",borderRadius:"3px 3px 0 0",
                        height:`${Math.max((d.orders/maxChartV)*70,d.orders>0?8:3)}px`,
                        background:i===chartVentes.length-1?"var(--green)":i===chartVentes.findIndex(x=>x.orders===Math.max(...chartVentes.map(x=>x.orders)))?"var(--yellow)":"var(--green-mid)",
                        opacity:.85,transition:"height .5s",
                      }}/>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",gap:5}}>
                  {chartVentes.map((d,i)=><div key={i} style={{flex:1,textAlign:"center",fontSize:".6rem",color:"var(--gray)"}}>{d.label}</div>)}
                </div>
              </div>

              {/* Graphique inscriptions */}
              <div className="admin-section">
                <div className="admin-section-title">
                  👥 Inscriptions / jour
                  <span style={{fontSize:".69rem",color:"var(--gray)",fontWeight:400}}>7 derniers jours</span>
                </div>
                <div style={{display:"flex",alignItems:"flex-end",gap:5,height:90,marginBottom:6}}>
                  {chartInscrits.map((d,i)=>(
                    <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                      <div style={{fontSize:".6rem",color:"var(--gray)"}}>{d.val||""}</div>
                      <div style={{
                        width:"100%",borderRadius:"3px 3px 0 0",
                        height:`${Math.max((d.val/maxChartI)*70,d.val>0?8:3)}px`,
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

            {/* Top produits + Alertes */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
              {/* Top produits */}
              <div className="admin-section">
                <div className="admin-section-title">🏆 Top produits</div>
                {topProduits.length===0
                  ? <div style={{fontSize:".78rem",color:"var(--gray)",padding:"12px 0"}}>Aucune vente enregistrée</div>
                  : topProduits.map((p,i)=>(
                    <div key={p.id} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:"1px solid var(--border)"}}>
                      <div style={{width:22,height:22,borderRadius:6,background:i===0?"var(--yellow)":i===1?"var(--gray)":"var(--border)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".7rem",fontWeight:800,flexShrink:0,color:i<2?"#0d1f14":"var(--ink)"}}>
                        {i+1}
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:".78rem",fontWeight:600,color:"var(--ink)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name_fr||"—"}</div>
                        <div style={{fontSize:".65rem",color:"var(--gray)"}}>{p.vendeur_nom||"—"}</div>
                      </div>
                      <div style={{fontSize:".72rem",fontWeight:700,color:"var(--green)",flexShrink:0}}>{p.vente_total} ventes</div>
                    </div>
                  ))
                }
              </div>

              {/* Alertes rapides */}
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

            {/* Dernières commandes */}
            <div className="admin-section">
              <div className="admin-section-title">
                🛍️ Dernières commandes
                <button className="admin-action-btn" style={{background:"var(--green)",color:"#fff"}} onClick={()=>setAdminTab("commandes")}>Voir tout →</button>
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Client</th><th>Montant</th><th>Commission</th><th>Statut</th><th>Date</th><th>Actions</th></tr></thead>
                  <tbody>
                    {commandes.slice(0,6).map(o=>(
                      <tr key={o.id}>
                        <td>
                          <strong style={{fontSize:".8rem"}}>{o.client_nom||"—"}</strong>
                          {o.telephone && <div style={{fontSize:".65rem",color:"var(--gray)"}}>{o.telephone}</div>}
                        </td>
                        <td><strong style={{color:"var(--ink)"}}>{(o.montant||0).toLocaleString()} F</strong></td>
                        <td style={{color:"var(--green)",fontWeight:700}}>{(o.commission||0).toLocaleString()} F</td>
                        <td><BadgeStatut statut={o.status}/></td>
                        <td style={{fontSize:".7rem",color:"var(--gray)"}}>{o.created_at?new Date(o.created_at).toLocaleDateString("fr-FR"):"-"}</td>
                        <td style={{display:"flex",gap:3,flexWrap:"wrap"}}>
                          {o.status==="pending" && <button className="admin-action-btn" style={{background:"#e6f0ff",color:"#1a4a9a"}} onClick={()=>validerCommande(o.id)}>✅</button>}
                          {o.status==="validee" && <button className="admin-action-btn" style={{background:"#e6fff0",color:"#1a6b3a"}} onClick={()=>marquerLivre(o.id)}>📦</button>}
                          {o.telephone && <button className="admin-action-btn" style={{background:"#dcfce7",color:"#166534"}} onClick={()=>window.open(`https://wa.me/${o.telephone.replace(/\D/g,"")}?text=${encodeURIComponent(`Bonjour ${o.client_nom||""}, votre commande Yorix est en cours. 📦`)}`)}>📱</button>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ════ PRODUITS ════ */}
        {adminTab==="produits" && (
          <>
            <div className="admin-page-title">
              📦 Gestion des produits
              <span style={{fontSize:".75rem",background:"var(--green)",color:"#fff",padding:"3px 10px",borderRadius:50,fontWeight:600,marginLeft:8}}>{produitsFiltres.length} / {produits.length}</span>
            </div>

            {/* Filtres */}
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

            {/* Résumé rapide */}
            <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}>
              {[
                {l:"Total",v:produits.length,c:"var(--ink)"},
                {l:"Actifs",v:produits.filter(p=>p.actif).length,c:"var(--green)"},
                {l:"Inactifs",v:produits.filter(p=>!p.actif).length,c:"var(--gray)"},
                {l:"Ruptures",v:produits.filter(p=>(p.stock||0)===0).length,c:"var(--red)"},
              ].map(s=>(
                <div key={s.l} style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:8,padding:"8px 14px",fontSize:".75rem"}}>
                  <span style={{color:"var(--gray)"}}>{s.l} : </span>
                  <strong style={{color:s.c}}>{s.v}</strong>
                </div>
              ))}
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Produit</th><th>Prix</th><th>Vendeur</th><th>Cat.</th><th>Ville</th><th>Stock</th><th>Vues</th><th>Statut</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {produitsFiltres.map(p=>(
                    <tr key={p.id}>
                      <td>
                        <div style={{display:"flex",alignItems:"center",gap:9}}>
                          {(p.image||p.image_urls?.[0]) && (
                            <img src={p.image||p.image_urls?.[0]} alt="" style={{width:38,height:38,borderRadius:7,objectFit:"cover",flexShrink:0}} onError={e=>e.target.style.display="none"}/>
                          )}
                          <div>
                            <strong style={{fontSize:".79rem"}}>{p.name_fr||"—"}</strong>
                            {p.escrow && <span style={{marginLeft:4,fontSize:".58rem",background:"#e6f0ff",color:"#1a4a9a",padding:"1px 4px",borderRadius:3}}>🔐</span>}
                            {p.flash && <span style={{marginLeft:3,fontSize:".58rem",background:"#fff0f0",color:"#ce1126",padding:"1px 4px",borderRadius:3}}>⚡</span>}
                          </div>
                        </div>
                      </td>
                      <td><strong style={{color:"var(--green)"}}>{(p.prix||0).toLocaleString()} F</strong></td>
                      <td style={{fontSize:".75rem",maxWidth:100,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.vendeur_nom||"—"}</td>
                      <td><span className="admin-badge admin-badge-gray">{p.categorie||"—"}</span></td>
                      <td style={{fontSize:".72rem"}}>{p.ville||"—"}</td>
                      <td>
                        <span className={`admin-badge admin-badge-${(p.stock||0)===0?"red":(p.stock||0)<=5?"yellow":"green"}`}>
                          {p.stock||0}
                        </span>
                      </td>
                      <td style={{fontSize:".72rem",color:"var(--gray)"}}>{p.vues||0}</td>
                      <td><span className={`admin-badge admin-badge-${p.actif?"green":"gray"}`}>{p.actif?"Actif":"Inactif"}</span></td>
                      <td>
                        <div style={{display:"flex",gap:3}}>
                          <button className="admin-action-btn" style={{background:"#e6f0ff",color:"#1a4a9a"}} onClick={()=>setSelectedProd(p)}>👁</button>
                          <button className="admin-action-btn" style={{background:p.actif?"#fff9e6":"#e6fff0",color:p.actif?"#b8860b":"#1a6b3a"}} onClick={()=>toggleActifProduit(p.id,p.actif)}>
                            {p.actif?"⛔":"✅"}
                          </button>
                          <button className="admin-action-btn" style={{background:"#fff0f0",color:"#ce1126"}} onClick={()=>supprimerProduit(p.id,p.name_fr)}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {produitsFiltres.length===0 && (
                    <tr><td colSpan={9} style={{textAlign:"center",padding:28,color:"var(--gray)"}}>Aucun produit trouvé</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ════ COMMANDES ════ */}
        {adminTab==="commandes" && (
          <>
            <div className="admin-page-title">
              🛍️ Gestion des commandes
              <span style={{fontSize:".75rem",background:"var(--green)",color:"#fff",padding:"3px 10px",borderRadius:50,fontWeight:600,marginLeft:8}}>{commandesFiltrees.length}</span>
            </div>

            {/* Résumé statuts */}
            <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}>
              {[
                {l:"⏳ En attente",v:commandes.filter(o=>o.status==="pending").length, c:"#b8860b",bg:"#fff9e6"},
                {l:"✅ Validées",  v:commandes.filter(o=>o.status==="validee").length, c:"#1a4a9a",bg:"#e6f0ff"},
                {l:"📦 Livrées",  v:commandes.filter(o=>o.status==="livre").length,   c:"#1a6b3a",bg:"#e6fff0"},
                {l:"❌ Annulées", v:commandes.filter(o=>o.status==="annulee").length,  c:"#ce1126",bg:"#fff0f0"},
              ].map(s=>(
                <div key={s.l} onClick={()=>setFilterOrder(s.l.includes("attente")?"pending":s.l.includes("Validée")?"validee":s.l.includes("Livré")?"livre":"annulee")} style={{background:s.bg,border:`1px solid ${s.c}30`,borderRadius:8,padding:"8px 14px",cursor:"pointer",fontSize:".75rem"}}>
                  <span style={{color:"var(--gray)"}}>{s.l} : </span>
                  <strong style={{color:s.c}}>{s.v}</strong>
                </div>
              ))}
            </div>

            <div className="admin-filter-row">
              <select className="admin-search" style={{maxWidth:180}} value={filterOrder} onChange={e=>setFilterOrder(e.target.value)}>
                <option value="">Tous les statuts</option>
                <option value="pending">⏳ En attente</option>
                <option value="validee">✅ Validée</option>
                <option value="livre">📦 Livrée</option>
                <option value="annulee">❌ Annulée</option>
              </select>
              <button className="admin-action-btn" style={{background:"var(--surface2)",color:"var(--ink)",padding:"7px 12px",borderRadius:8,border:"1px solid var(--border)"}} onClick={()=>setSortOrder(s=>s==="desc"?"asc":"desc")}>
                {sortOrder==="desc"?"⬇ Plus récent":"⬆ Plus ancien"}
              </button>
              <button className="admin-action-btn" style={{background:"#e6f0ff",color:"#1a4a9a",padding:"7px 12px",borderRadius:8,marginLeft:"auto"}} onClick={()=>exportCSV(commandesFiltrees.map(o=>({id:o.id,client:o.client_nom,telephone:o.telephone,montant:o.montant,commission:o.commission,statut:o.status,date:o.created_at})),"commandes-yorix.csv")}>
                📤 Export CSV
              </button>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Client</th><th>Montant</th><th>Commission</th><th>Escrow</th><th>Livraison</th><th>Statut</th><th>Date</th><th>Actions</th></tr></thead>
                <tbody>
                  {commandesFiltrees.map(o=>(
                    <tr key={o.id} style={{cursor:"pointer"}} onClick={e=>{if(e.target.tagName!=="BUTTON")setSelectedOrder(o);}}>
                      <td>
                        <strong style={{fontSize:".8rem"}}>{o.client_nom||"—"}</strong>
                        {o.telephone && <div style={{fontSize:".65rem",color:"var(--gray)"}}>{o.telephone}</div>}
                      </td>
                      <td><strong>{(o.montant||0).toLocaleString()} F</strong></td>
                      <td style={{color:"var(--green)",fontWeight:700}}>{(o.commission||0).toLocaleString()} F</td>
                      <td><BadgeStatut statut={o.escrow_status}/></td>
                      <td><BadgeStatut statut={o.livraison_status}/></td>
                      <td><BadgeStatut statut={o.status}/></td>
                      <td style={{fontSize:".7rem",color:"var(--gray)",whiteSpace:"nowrap"}}>{o.created_at?new Date(o.created_at).toLocaleDateString("fr-FR"):"-"}</td>
                      <td>
                        <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
                          {o.status==="pending" && <button className="admin-action-btn" style={{background:"#e6f0ff",color:"#1a4a9a"}} onClick={()=>validerCommande(o.id)}>✅</button>}
                          {o.status==="validee" && <button className="admin-action-btn" style={{background:"#e6fff0",color:"#1a6b3a"}} onClick={()=>marquerLivre(o.id)}>📦</button>}
                          {!["livre","annulee"].includes(o.status) && <button className="admin-action-btn" style={{background:"#fff0f0",color:"#ce1126"}} onClick={()=>annulerCommande(o.id)}>❌</button>}
                          {o.telephone && (
                            <button className="admin-action-btn" style={{background:"#dcfce7",color:"#166534"}} onClick={()=>window.open(`https://wa.me/${o.telephone.replace(/\D/g,"")}?text=${encodeURIComponent(`Bonjour ${o.client_nom||""} ! Votre commande Yorix est en cours. 📦`)}`)}>📱</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {commandesFiltrees.length===0 && (
                    <tr><td colSpan={8} style={{textAlign:"center",padding:28,color:"var(--gray)"}}>Aucune commande trouvée</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ════ UTILISATEURS ════ */}
        {adminTab==="utilisateurs" && (
          <>
            <div className="admin-page-title">
              👥 Gestion des utilisateurs
              <span style={{fontSize:".75rem",background:"var(--green)",color:"#fff",padding:"3px 10px",borderRadius:50,fontWeight:600,marginLeft:8}}>{usersFiltres.length} / {utilisateurs.length}</span>
            </div>

            {/* Résumé rôles */}
            <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}>
              {["buyer","seller","delivery","provider","admin"].map(r=>{
                const cnt = utilisateurs.filter(u=>u.role===r).length;
                const colors = {buyer:"#1a4a9a",seller:"#1a6b3a",delivery:"#b8860b",provider:"#6a1b9a",admin:"#ce1126"};
                return (
                  <div key={r} onClick={()=>setFilterRole(r===filterRole?"":r)} style={{background:"var(--surface)",border:`1.5px solid ${filterRole===r?colors[r]:"var(--border)"}`,borderRadius:8,padding:"7px 12px",cursor:"pointer",fontSize:".73rem",transition:"all .15s"}}>
                    <span style={{color:colors[r]||"var(--gray)",fontWeight:700}}>{ROLE_LABELS[r]||r}</span>
                    <span style={{color:"var(--gray)",marginLeft:6}}>{cnt}</span>
                  </div>
                );
              })}
            </div>

            <div className="admin-filter-row">
              <input className="admin-search" style={{maxWidth:260}} placeholder="🔍 Nom ou email..." value={searchUser} onChange={e=>setSearchUser(e.target.value)}/>
              <button className="admin-action-btn" style={{background:"var(--surface2)",color:"var(--ink)",padding:"7px 12px",borderRadius:8,border:"1px solid var(--border)"}} onClick={()=>{setSearchUser("");setFilterRole("");}}>✕ Reset</button>
              <button className="admin-action-btn" style={{background:"#e6f0ff",color:"#1a4a9a",padding:"7px 12px",borderRadius:8,marginLeft:"auto"}} onClick={()=>exportCSV(usersFiltres.map(u=>({uid:u.uid,nom:u.nom,email:u.email,role:u.role,ville:u.ville,telephone:u.telephone,inscription:u.created_at})),"utilisateurs-yorix.csv")}>
                📤 Export CSV
              </button>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Utilisateur</th><th>Email</th><th>Rôle</th><th>Ville</th><th>Téléphone</th><th>Inscription</th><th>Actions</th></tr></thead>
                <tbody>
                  {usersFiltres.map(u=>{
                    const uid = u.uid||u.id;
                    return (
                      <tr key={uid} style={{cursor:"pointer"}} onClick={e=>{if(e.target.tagName!=="BUTTON"&&e.target.tagName!=="SELECT")setSelectedUser(u);}}>
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
                        <td style={{fontSize:".75rem",color:"var(--gray)",maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{u.email||"—"}</td>
                        <td>
                          <select
                            value={u.role||"buyer"}
                            style={{border:"1px solid var(--border)",background:"var(--surface)",borderRadius:6,padding:"3px 8px",fontSize:".72rem",cursor:"pointer",color:"var(--ink)",outline:"none"}}
                            onChange={e=>changerRole(uid,e.target.value)}
                          >
                            {["buyer","seller","delivery","provider","admin"].map(r=><option key={r} value={r}>{r}</option>)}
                          </select>
                        </td>
                        <td style={{fontSize:".73rem"}}>{u.ville||"—"}</td>
                        <td style={{fontSize:".73rem",color:"var(--gray)"}}>{u.telephone||"—"}</td>
                        <td style={{fontSize:".7rem",color:"var(--gray)",whiteSpace:"nowrap"}}>{u.created_at?new Date(u.created_at).toLocaleDateString("fr-FR"):"-"}</td>
                        <td>
                          <div style={{display:"flex",gap:3}}>
                            {u.telephone && <button className="admin-action-btn" style={{background:"#dcfce7",color:"#166534"}} onClick={()=>window.open(`https://wa.me/${u.telephone.replace(/\D/g,"")}`)}>📱</button>}
                            <button className="admin-action-btn" style={{background:"#fff0f0",color:"#ce1126"}} onClick={()=>supprimerUser(uid,u.email)}>🗑️</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {usersFiltres.length===0 && (
                    <tr><td colSpan={7} style={{textAlign:"center",padding:28,color:"var(--gray)"}}>Aucun utilisateur trouvé</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ════ VENDEURS ════ */}
        {adminTab==="vendeurs" && (
          <>
            <div className="admin-page-title">
              🏪 Gestion des vendeurs
              <span style={{fontSize:".75rem",background:"var(--green)",color:"#fff",padding:"3px 10px",borderRadius:50,fontWeight:600,marginLeft:8}}>{sellers.length}</span>
            </div>

            {/* Stats vendeurs */}
            <div className="stat-cards-grid" style={{marginBottom:16}}>
              <StatCard icon="🏪" val={sellers.length} lbl="Vendeurs total" col="#e6fff0" ic="#1a6b3a"/>
              <StatCard icon="✅" val={sellers.filter(s=>s.actif!==false).length} lbl="Actifs" col="#e6f0ff" ic="#1a4a9a"/>
              <StatCard icon="⛔" val={sellers.filter(s=>s.actif===false).length} lbl="Suspendus" col="#fff0f0" ic="#ce1126"/>
              <StatCard icon="✔️" val={sellers.filter(s=>s.verifie).length} lbl="Vérifiés" col="#fff9e6" ic="#b8860b"/>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Vendeur</th><th>Email</th><th>Produits</th><th>Ventes</th><th>Revenus vendeur</th><th>Commission</th><th>Statut</th><th>Actions</th></tr></thead>
                <tbody>
                  {sellers.map(u=>{
                    const uid = u.uid||u.id;
                    const mesProds = produits.filter(p=>p.vendeur_id===uid);
                    const mesVentes = commandes.filter(o=>o.vendeur_id===uid);
                    const revVendeur = mesVentes.reduce((s,o)=>s+(o.montant_vendeur||0),0);
                    const commissionVendeur = mesVentes.reduce((s,o)=>s+(o.commission||0),0);
                    return (
                      <tr key={uid}>
                        <td>
                          <div style={{display:"flex",alignItems:"center",gap:8}}>
                            <div style={{width:32,height:32,borderRadius:"50%",background:"var(--green)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:".8rem",flexShrink:0}}>
                              {(u.nom||"?")[0].toUpperCase()}
                            </div>
                            <div>
                              <strong style={{fontSize:".8rem"}}>{u.nom||"—"}</strong>
                              {u.verifie && <span style={{marginLeft:4,fontSize:".6rem",background:"#e6fff0",color:"#1a6b3a",padding:"1px 4px",borderRadius:3}}>✅</span>}
                              {mesProds.length>=5 && <span style={{marginLeft:3,fontSize:".6rem",background:"#fff9e6",color:"#b8860b",padding:"1px 4px",borderRadius:3}}>⭐ Top</span>}
                            </div>
                          </div>
                        </td>
                        <td style={{fontSize:".72rem",color:"var(--gray)"}}>{u.email||"—"}</td>
                        <td>
                          <span className="admin-badge admin-badge-blue">{mesProds.length}</span>
                          {mesProds.filter(p=>p.actif).length > 0 && <span style={{fontSize:".63rem",color:"var(--green)",marginLeft:4}}>{mesProds.filter(p=>p.actif).length} actifs</span>}
                        </td>
                        <td><span className="admin-badge admin-badge-green">{mesVentes.length}</span></td>
                        <td style={{color:"var(--green)",fontWeight:700}}>{revVendeur.toLocaleString()} F</td>
                        <td style={{color:"var(--red)",fontWeight:700,fontSize:".75rem"}}>{commissionVendeur.toLocaleString()} F</td>
                        <td><span className={`admin-badge admin-badge-${u.actif!==false?"green":"red"}`}>{u.actif!==false?"Actif":"Suspendu"}</span></td>
                        <td>
                          <div style={{display:"flex",gap:3}}>
                            <button className="admin-action-btn" style={{background:u.actif!==false?"#fff0f0":"#e6fff0",color:u.actif!==false?"#ce1126":"#1a6b3a"}} onClick={()=>toggleVendeur(uid,u.actif!==false)}>
                              {u.actif!==false?"⛔":"✅"}
                            </button>
                            {u.telephone && <button className="admin-action-btn" style={{background:"#dcfce7",color:"#166534"}} onClick={()=>window.open(`https://wa.me/${u.telephone.replace(/\D/g,"")}?text=${encodeURIComponent(`Bonjour ${u.nom||""}, l'équipe Yorix vous contacte.`)}`)}>📱</button>}
                            {u.email && <button className="admin-action-btn" style={{background:"#e6f0ff",color:"#1a4a9a"}} onClick={()=>window.open(`mailto:${u.email}`)}>✉️</button>}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {sellers.length===0 && (
                    <tr><td colSpan={8} style={{textAlign:"center",padding:28,color:"var(--gray)"}}>Aucun vendeur inscrit</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ════ REVENUS ════ */}
        {adminTab==="revenus" && (
          <>
            <div className="admin-page-title">💰 Revenus & Finances</div>

            <div className="stat-cards-grid" style={{marginBottom:20}}>
              <StatCard icon="💵" val={`${stats.commissionTotal.toLocaleString()} F`} lbl="Commissions totales (5%)" col="#e6fff0" ic="#1a6b3a"/>
              <StatCard icon="💰" val={`${stats.revenue.toLocaleString()} F`} lbl="Volume transactions total" col="#fff9e6" ic="#b8860b"/>
              <StatCard icon="📅" val={`${stats.revenueToday.toLocaleString()} F`} lbl="Commissions aujourd'hui" col="#f0fff4" ic="#276749"/>
              <StatCard icon="📈" val={`${stats.revenueWeek.toLocaleString()} F`} lbl="Commissions 7 jours" col="#fef9f0" ic="#7b5a10"/>
              <StatCard icon="🛍️" val={stats.orders} lbl="Commandes totales" col="#e6f0ff" ic="#1a4a9a"/>
              <StatCard icon="✅" val={commandes.filter(o=>o.status==="livre").length} lbl="Commandes livrées" col="#e6fff0" ic="#1a6b3a"/>
            </div>

            {/* Graphique revenus 7 jours */}
            <div className="admin-section" style={{marginBottom:16}}>
              <div className="admin-section-title">📈 Commissions journalières — 7 derniers jours</div>
              <div style={{display:"flex",alignItems:"flex-end",gap:8,height:100,marginBottom:8}}>
                {chartVentes.map((d,i)=>(
                  <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                    {d.revenue > 0 && <div style={{fontSize:".6rem",color:"var(--gray)"}}>{d.revenue.toLocaleString()}</div>}
                    <div style={{
                      width:"100%",borderRadius:"4px 4px 0 0",
                      height:`${Math.max((d.revenue/maxChartRev)*80,d.revenue>0?8:3)}px`,
                      background:i===chartVentes.length-1?"var(--yellow)":"var(--green)",
                      opacity:.85,transition:"height .5s",cursor:"default",
                    }} title={`${d.revenue.toLocaleString()} FCFA`}/>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:8}}>
                {chartVentes.map((d,i)=><div key={i} style={{flex:1,textAlign:"center",fontSize:".63rem",color:"var(--gray)"}}>{d.label}</div>)}
              </div>
            </div>

            {/* Revenus par catégorie */}
            <div className="admin-section">
              <div className="admin-section-title">📊 Commissions par catégorie</div>
              {CATS_LIST.map(cat=>{
                const catOrders = commandes.filter(o=>{
                  const prod = produits.find(p=>p.id===o.product_id);
                  return prod?.categorie===cat;
                });
                const catRev = catOrders.reduce((s,o)=>s+(o.commission||0),0);
                const totalRev = Math.max(stats.commissionTotal,1);
                const pct = Math.round((catRev/totalRev)*100);
                return (
                  <div key={cat} style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                    <div style={{width:110,fontSize:".75rem",color:"var(--gray)",flexShrink:0}}>{cat}</div>
                    <div style={{flex:1,background:"var(--surface2)",borderRadius:6,height:20,overflow:"hidden",position:"relative"}}>
                      <div style={{height:"100%",background:"var(--green)",borderRadius:6,width:`${pct}%`,transition:"width .6s",opacity:.85}}/>
                      {pct>5 && <div style={{position:"absolute",right:6,top:"50%",transform:"translateY(-50%)",fontSize:".6rem",color:"var(--surface)",fontWeight:700}}>{pct}%</div>}
                    </div>
                    <div style={{width:90,fontSize:".75rem",fontWeight:700,color:"var(--green)",textAlign:"right",flexShrink:0}}>{catRev.toLocaleString()} F</div>
                    <div style={{width:40,fontSize:".7rem",color:"var(--gray)",textAlign:"right",flexShrink:0}}>{catOrders.length} cmd</div>
                  </div>
                );
              })}
            </div>

            {/* Top vendeurs par revenus */}
            <div className="admin-section">
              <div className="admin-section-title">🏪 Top 5 vendeurs par commissions générées</div>
              {sellers
                .map(u=>{
                  const uid = u.uid||u.id;
                  const rev = commandes.filter(o=>o.vendeur_id===uid).reduce((s,o)=>s+(o.commission||0),0);
                  return {...u, revCommission: rev};
                })
                .sort((a,b)=>b.revCommission-a.revCommission)
                .slice(0,5)
                .map((u,i)=>(
                  <div key={u.uid||u.id} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 0",borderBottom:"1px solid var(--border)"}}>
                    <div style={{width:24,height:24,borderRadius:6,background:i===0?"var(--yellow)":i===1?"#c0c0c0":"var(--surface2)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:".72rem",color:i<2?"#0d1f14":"var(--gray)",flexShrink:0}}>{i+1}</div>
                    <div style={{flex:1}}>
                      <strong style={{fontSize:".8rem"}}>{u.nom||"—"}</strong>
                      <div style={{fontSize:".65rem",color:"var(--gray)"}}>{u.email||""}</div>
                    </div>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,color:"var(--green)",fontSize:".85rem"}}>{u.revCommission.toLocaleString()} F</div>
                    {u.telephone && <button className="admin-action-btn" style={{background:"#dcfce7",color:"#166534"}} onClick={()=>window.open(`https://wa.me/${u.telephone.replace(/\D/g,"")}`)}>📱</button>}
                  </div>
                ))
              }
            </div>
          </>
        )}

        {/* ════ ALERTES ════ */}
        {adminTab==="alertes" && (
          <>
            <div className="admin-page-title">
              🔔 Alertes & Notifications
              <span style={{fontSize:".75rem",background:alertes.length>0?"var(--red)":"var(--green)",color:"#fff",padding:"3px 10px",borderRadius:50,fontWeight:600,marginLeft:8}}>{alertes.length} alerte{alertes.length!==1?"s":""}</span>
            </div>

            {alertes.length===0 && (
              <div style={{textAlign:"center",padding:"48px 0",color:"var(--gray)"}}>
                <div style={{fontSize:"3.5rem",marginBottom:12}}>✅</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1rem",marginBottom:6,color:"var(--ink)"}}>Tout va bien !</div>
                <p>Aucune alerte en cours sur la plateforme Yorix.</p>
              </div>
            )}

            {/* Ruptures de stock */}
            <div className="admin-section">
              <div className="admin-section-title">
                📦 Ruptures de stock
                <span className="admin-badge admin-badge-red">{produits.filter(p=>(p.stock||0)===0).length}</span>
              </div>
              {produits.filter(p=>(p.stock||0)===0).length===0
                ? <div className="admin-alert admin-alert-green">✅ Aucun produit en rupture de stock</div>
                : produits.filter(p=>(p.stock||0)===0).map(p=>(
                    <div key={p.id} className="admin-alert admin-alert-red" style={{flexWrap:"wrap",gap:8}}>
                      <div>
                        <strong>{p.name_fr||"Produit"}</strong>
                        <div style={{fontSize:".7rem",marginTop:2}}>Vendeur : {p.vendeur_nom||"—"} · Catégorie : {p.categorie||"—"} · Prix : {(p.prix||0).toLocaleString()} FCFA</div>
                      </div>
                      <div style={{marginLeft:"auto",display:"flex",gap:4}}>
                        <button className="admin-action-btn" style={{background:"#e6fff0",color:"#1a6b3a"}} onClick={()=>{toggleActifProduit(p.id,true);}}>⛔ Désactiver</button>
                        {p.vendeur_id && <button className="admin-action-btn" style={{background:"#dcfce7",color:"#166534"}} onClick={()=>window.open(`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent(`Bonjour, votre produit "${p.name_fr}" est en rupture de stock sur Yorix.`)}`)}>📱</button>}
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
                : commandes.filter(o=>o.status==="pending").map(o=>(
                    <div key={o.id} className="admin-alert admin-alert-yellow" style={{flexWrap:"wrap",gap:8}}>
                      <div>
                        <strong>{o.client_nom||"Client"}</strong>
                        <div style={{fontSize:".7rem",marginTop:2}}>{(o.montant||0).toLocaleString()} FCFA · {o.created_at?new Date(o.created_at).toLocaleDateString("fr-FR"):"-"}</div>
                      </div>
                      <div style={{marginLeft:"auto",display:"flex",gap:4}}>
                        <button className="admin-action-btn" style={{background:"#e6f0ff",color:"#1a4a9a"}} onClick={()=>validerCommande(o.id)}>✅ Valider</button>
                        {o.telephone && <button className="admin-action-btn" style={{background:"#dcfce7",color:"#166534"}} onClick={()=>window.open(`https://wa.me/${o.telephone.replace(/\D/g,"")}`)}>📱</button>}
                      </div>
                    </div>
                  ))
              }
            </div>

            {/* Nouveaux utilisateurs 24h */}
            <div className="admin-section">
              <div className="admin-section-title">
                🆕 Nouveaux utilisateurs (24h)
                <span className="admin-badge admin-badge-green">{utilisateurs.filter(u=>new Date()-new Date(u.created_at)<86400000).length}</span>
              </div>
              {utilisateurs.filter(u=>new Date()-new Date(u.created_at)<86400000).length===0
                ? <div className="admin-alert" style={{background:"var(--surface2)",border:"1px solid var(--border)"}}>Aucun nouvel utilisateur dans les 24h</div>
                : utilisateurs.filter(u=>new Date()-new Date(u.created_at)<86400000).map(u=>(
                    <div key={u.uid||u.id} className="admin-alert admin-alert-green" style={{flexWrap:"wrap"}}>
                      <div>
                        <strong>{u.nom||u.email||"—"}</strong>
                        <div style={{fontSize:".7rem",marginTop:2}}>{u.role||"buyer"} · {u.ville||"—"} · {u.created_at?new Date(u.created_at).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}):""}</div>
                      </div>
                      {u.telephone && <button className="admin-action-btn" style={{marginLeft:"auto",background:"#dcfce7",color:"#166534"}} onClick={()=>window.open(`https://wa.me/${u.telephone.replace(/\D/g,"")}`)}>📱</button>}
                    </div>
                  ))
              }
            </div>

            {/* Stock faible */}
            <div className="admin-section">
              <div className="admin-section-title">
                ⚠️ Stock faible (1–2 unités)
                <span className="admin-badge admin-badge-yellow">{produits.filter(p=>p.stock>0&&p.stock<=5).length}</span>
              </div>
              {produits.filter(p=>p.stock>0&&p.stock<=5).length===0
                ? <div className="admin-alert admin-alert-green">✅ Aucun stock faible</div>
                : produits.filter(p=>p.stock>0&&p.stock<=5).map(p=>(
                    <div key={p.id} className="admin-alert admin-alert-yellow">
                      <div>
                        <strong>{p.name_fr||"Produit"}</strong>
                        <div style={{fontSize:".7rem",marginTop:2}}>Stock : {p.stock} · Vendeur : {p.vendeur_nom||"—"}</div>
                      </div>
                    </div>
                  ))
              }
            </div>
          </>
        )}

      </div>
    </div>
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
  const [search, setSearch]                     = useState("");
  const [filterCat, setFilterCat]               = useState("");

  // Panier
  const [cartOpen, setCartOpen]   = useState(false);
  const [cartItems, setCartItems] = useState([]);

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
  const [inscriptionSent, setInscriptionSent] = useState(false);
  const [inscriptionForm, setInscriptionForm] = useState({ nom:"",prenom:"",tel:"",email:"",metier:"",ville:"",experience:"",tarif:"",bio:"" });

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
      let q = supabase.from("products").select("*").eq("actif", true).order("sponsorise", { ascending:false }).order("created_at", { ascending:false }).limit(40);
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
        options: { data: { display_name: authForm.nom } },
      });
      if (error) throw error;

      const uid = data.user?.id;
      if (!uid) throw new Error("Erreur création compte.");

      const { error: profileError } = await supabase.from("users").insert({
        uid,
        nom:          authForm.nom,
        email:        authForm.email,
        telephone:    authForm.tel,
        role:         selectedRole,   // ← rôle EXACTEMENT choisi par l'utilisateur
        langue:       "fr",
        actif:        true,
        verifie:      false,
        note:         0,
        nombre_avis:  0,
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
    setCartItems(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) return prev.map(i => i.id === p.id ? {...i, qty:i.qty+1} : i);
      const img = p.image_urls?.[0] || p.image || null;
      return [...prev, { 
  id: p.id, 
  name: p.name_fr, 
  image: img, 
  prix: p.prix, 
  qty: 1, 
  vendeur_id: p.vendeur_id,
  vendeur_nom: p.vendeur_nom || "",   // ← ajouter
  categorie: p.categorie || "",        // ← ajouter
  ville: p.ville || "",                // ← ajouter
  stock: p.stock || null               // ← ajouter
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
      const batch = cartItems.map(item =>
        supabase.from("orders").insert({
          product_id: item.id, vendeur_id: item.vendeur_id,
          client_id: user.id, client_nom: userData?.nom || user.email,
          telephone: userData?.telephone || "",
          montant: item.prix * item.qty,
          commission: Math.round(item.prix * item.qty * COMMISSION_RATE),
          montant_vendeur: Math.round(item.prix * item.qty * (1-COMMISSION_RATE)),
          status:"pending", livraison_status:"pending", escrow_status:"pending",
        })
      );
      await Promise.all(batch);
      setCartItems([]);
      setCartOpen(false);
      alert("✅ Commande créée ! Vous serez contacté(e) pour le paiement.");
      goPage("dashboard");
    } catch (err) { alert("Erreur : " + err.message); }
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
    if (userRole === "provider") return [{icon:"📊",id:"overview",label:"Vue d'ensemble"},{icon:"📋",id:"demandes",label:"Demandes"},{icon:"➕",id:"ajouterService",label:"Ajouter service"}];
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
              position:"absolute",
              top:"100%",
              left:0,
              right:0,
              background:"var(--bg)",
              border:"1px solid var(--border)",
              borderRadius:"10px",
              boxShadow:"0 4px 16px rgba(0,0,0,0.12)",
              zIndex:9999,
              maxHeight:"320px",
              overflowY:"auto",
              marginTop:"4px"
            }}>
              {produit.filter(p=>
                p.name?.toLowerCase().includes(search.toLowerCase())
              ).slice(0,8).map(p=>(
                <div
                  key={p.id}
                  onClick={()=>{
                    setProduit(p)
                    goPage("produit")
                    setSearch("")
                  }}
                  style={{
                    display:"flex",
                    alignItems:"center",
                    gap:"10px",
                    padding:"10px 14px",
                    cursor:"pointer",
                    borderBottom:"1px solid var(--border)",
                    fontSize:"13px"
                  }}
                  onMouseEnter={e=>e.currentTarget.style.background="var(--bg2)"}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                >
                  {p.image&&<img src={p.image} style={{width:36,height:36,objectFit:"cover",borderRadius:6}} alt=""/>}
                  <div>
                    <div style={{fontWeight:500}}>{p.name}</div>
                    <div style={{color:"var(--gray)",fontSize:"12px"}}>{p.prix?.toLocaleString()} FCFA</div>
                  </div>
                </div>
              ))}
              {produit.filter(p=>
                p.name?.toLowerCase().includes(search.toLowerCase())
              ).length===0&&(
                <div style={{padding:"14px",color:"var(--gray)",fontSize:"13px",textAlign:"center"}}>
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

          {/* ── PRESTATAIRES ── */}
          <section className="sec">
            <div className="sec-head">
              <h2 className="sec-title">👷 Prestataires de confiance</h2>
              <span className="sec-link" onClick={()=>goPage("prestataires")}>Voir tous →</span>
            </div>
            <div className="prest-grid">
              {PREST_DATA.slice(0,3).map(p=>(
                <div key={p.name} className="prest-card">
                  <div className="prest-top">
                    <div className="prest-av">{p.emoji}</div>
                    <div><div className="prest-name">{p.name}</div><div className="prest-meta">{p.meta}</div></div>
                  </div>
                  <div className="prest-tags">{p.tags.map(t=><span key={t} className="ptag">{t}</span>)}</div>
                  <div className="prest-footer">
                    <div><div className="prest-price">{p.prix}</div><div style={{fontSize:".69rem",color:"var(--gray)"}}>⭐ {p.note} · {p.avis} avis</div></div>
                    <button className="btn-hire" onClick={()=>window.open(`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent(`Bonjour, je cherche un prestataire : ${p.name}`)}`, "_blank")}>📱 Contacter</button>
                  </div>
                </div>
              ))}
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
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                <button
                  style={{background:"var(--yellow)",color:"#0d1f14",border:"none",padding:"11px 20px",borderRadius:9,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".85rem",cursor:"pointer"}}
                  onClick={()=>window.open(`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent("Bonjour Yorix Ride ! Je veux une livraison 📦\n\n📍 Adresse de collecte : \n📍 Adresse de livraison : \n📦 Contenu du colis : ")}`, "_blank")}
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
                      onClick={()=>d.dispo&&window.open(`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent(`Bonjour ! Je veux une livraison avec ${d.name} (${d.vehicule}) 🛵\n\n📍 Adresse collecte : \n📍 Adresse livraison : \n📦 Description colis : `)}`, "_blank")}
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

      {/* ════════ PAGE : PRESTATAIRES ════════ */}
      {page==="prestataires"&&(
        <section className="sec anim">
          <div className="sec-head"><h2 className="sec-title">👷 Prestataires Yorix vérifiés</h2><button className="btn-green" onClick={()=>goPage("inscription")}>+ Devenir prestataire</button></div>
          <div className="prest-grid">
            {PREST_DATA.map(p=>(
              <div key={p.name} className="prest-card">
                <div className="prest-top"><div className="prest-av">{p.emoji}</div><div><div className="prest-name">{p.name}</div><div className="prest-meta">{p.meta}</div></div></div>
                <div className="prest-tags">{p.tags.map(t=><span key={t} className="ptag">{t}</span>)}</div>
                <div className="prest-footer"><div><div className="prest-price">{p.prix}</div><div style={{fontSize:".69rem",color:"var(--gray)"}}>⭐ {p.note} · {p.avis} avis</div></div><button className="btn-hire" onClick={()=>window.open(`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent(`Bonjour, je souhaite contacter ${p.name} pour ${p.tags[0]}`)}`,'_blank')}>WhatsApp</button></div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ════════ PAGE : INSCRIPTION PRESTATAIRE ════════ */}
      {page==="inscription"&&(
        <section className="sec anim">
          <div style={{maxWidth:600,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:24}}>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.6rem",fontWeight:800,color:"var(--ink)",marginBottom:7,letterSpacing:"-.5px"}}>👷 Devenir prestataire Yorix</h2>
              <p style={{color:"var(--gray)",fontSize:".86rem",lineHeight:1.7}}>Développez votre activité et accédez à des milliers de clients au Cameroun.</p>
            </div>
            {inscriptionSent?<div className="success-msg">🎉 Candidature envoyée ! L'équipe Yorix vous contacte sous 24h.</div>:(
              <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,padding:24}}>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Nom <span>*</span></label><input className="form-input" value={inscriptionForm.nom} onChange={e=>setInscriptionForm(f=>({...f,nom:e.target.value}))} placeholder="Votre nom"/></div>
                  <div className="form-group"><label className="form-label">Prénom</label><input className="form-input" value={inscriptionForm.prenom} onChange={e=>setInscriptionForm(f=>({...f,prenom:e.target.value}))} placeholder="Votre prénom"/></div>
                  <div className="form-group"><label className="form-label">Téléphone <span>*</span></label><input className="form-input" value={inscriptionForm.tel} onChange={e=>setInscriptionForm(f=>({...f,tel:e.target.value}))} placeholder="+237 696 56 56 54"/></div>
                  <div className="form-group"><label className="form-label">Email</label><input className="form-input" value={inscriptionForm.email} onChange={e=>setInscriptionForm(f=>({...f,email:e.target.value}))} placeholder="email@mail.com"/></div>
                  <div className="form-group"><label className="form-label">Métier <span>*</span></label><select className="form-select" value={inscriptionForm.metier} onChange={e=>setInscriptionForm(f=>({...f,metier:e.target.value}))}><option value="">Choisir...</option>{["Plomberie","Électricité","Maçonnerie","Peinture","Menuiserie","Informatique","Graphisme","Photographie","Nettoyage","Transport","Cuisine","Autre"].map(m=><option key={m}>{m}</option>)}</select></div>
                  <div className="form-group"><label className="form-label">Ville</label><select className="form-select" value={inscriptionForm.ville} onChange={e=>setInscriptionForm(f=>({...f,ville:e.target.value}))}><option value="">Choisir...</option>{CITIES.filter(c=>c!=="Toutes les villes").map(c=><option key={c}>{c}</option>)}</select></div>
                  <div className="form-group"><label className="form-label">Expérience</label><input className="form-input" value={inscriptionForm.experience} onChange={e=>setInscriptionForm(f=>({...f,experience:e.target.value}))} placeholder="Ex: 5 ans"/></div>
                  <div className="form-group"><label className="form-label">Tarif (FCFA)</label><input className="form-input" value={inscriptionForm.tarif} onChange={e=>setInscriptionForm(f=>({...f,tarif:e.target.value}))} placeholder="Ex: 15 000/h"/></div>
                  <div className="form-group full"><label className="form-label">Présentation</label><textarea className="form-textarea" value={inscriptionForm.bio} onChange={e=>setInscriptionForm(f=>({...f,bio:e.target.value}))} placeholder="Décrivez vos compétences..."/></div>
                </div>
                <button className="form-submit" onClick={async()=>{if(!inscriptionForm.nom||!inscriptionForm.tel||!inscriptionForm.metier){alert("Nom, téléphone et métier obligatoires !");return;}await supabase.from("prestataires").insert(inscriptionForm).catch(e => console.warn(e?.message));setInscriptionSent(true);}}>🚀 Soumettre ma candidature</button>
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
          <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:12,padding:22}}>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"var(--ink)",marginBottom:4}}>📋 Demande d'accès Business</h3>
            <p style={{fontSize:".78rem",color:"var(--gray)",marginBottom:16}}>Notre équipe B2B vous contacte sous 24h.</p>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Entreprise *</label><input className="form-input" placeholder="Nom de l'entreprise"/></div>
              <div className="form-group"><label className="form-label">Contact</label><input className="form-input" placeholder="Votre nom"/></div>
              <div className="form-group"><label className="form-label">Email pro</label><input className="form-input" placeholder="contact@entreprise.cm"/></div>
              <div className="form-group"><label className="form-label">Téléphone</label><input className="form-input" placeholder="+237 ..."/></div>
              <div className="form-group full"><label className="form-label">Besoins principaux</label><textarea className="form-textarea" style={{minHeight:65}} placeholder="Décrivez vos besoins..."/></div>
            </div>
            <button className="form-submit">💼 Soumettre ma demande</button>
          </div>
        </section>
      )}

      {/* ════════ PAGE : ACADEMY ════════ */}
      {page==="academy"&&(
        <section className="sec anim">
          <div style={{background:"linear-gradient(135deg,#1a3a24,#0a1410)",borderRadius:14,padding:28,marginBottom:20,textAlign:"center"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(252,209,22,.14)",color:"var(--yellow)",border:"1px solid rgba(252,209,22,.24)",padding:"4px 11px",borderRadius:50,fontSize:".7rem",fontWeight:700,marginBottom:12}}>🎓 Yorix Academy</div>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.45rem",fontWeight:800,color:"#fff",marginBottom:6,letterSpacing:"-.5px"}}>Formez-vous pour vendre mieux</h2>
            <p style={{color:"rgba(255,255,255,.5)",fontSize:".85rem",marginBottom:18}}>Des cours créés par des experts camerounais.</p>
            <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}><button className="cta-y">Commencer gratuitement</button><button className="cta-w">Voir le catalogue</button></div>
          </div>
          <div className="courses-grid">{COURSES_DATA.map(c=><div key={c.title} className="course-card"><div className="course-img" style={{background:c.bg}}>{c.emoji}</div><div className="course-body"><div className={`course-level ${c.lc}`}>{c.level}</div><div className="course-title">{c.title}</div><div className="course-meta">⏱ {c.duree} · 👥 {c.apprenants}</div><div className="course-footer"><div className="course-price">{c.prix}</div><button className="course-btn">Démarrer →</button></div></div></div>)}</div>
        </section>
      )}

      {/* ════════ PAGE : BLOG ════════ */}
      {page==="blog"&&(
        <section className="sec anim">
          <div className="sec-head"><h2 className="sec-title">📰 Blog Yorix</h2></div>
          <div className="blog-grid">{BLOG_DATA.map(p=><div key={p.title} className="blog-card"><div className="blog-img">{p.emoji}</div><div className="blog-body"><div className="blog-cat">{p.cat}</div><div className="blog-title">{p.title}</div><div className="blog-excerpt">{p.excerpt}</div></div><div className="blog-footer"><span>{p.date}</span><span>⏱ {p.read}</span></div></div>)}</div>
        </section>
      )}

      {/* ════════ PAGE : FIDÉLITÉ ════════ */}
      {page==="loyalty"&&(
        <section className="sec anim">
          <div style={{background:"linear-gradient(135deg,#1a3a24,var(--green))",borderRadius:14,padding:22,color:"#fff",marginBottom:18}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",marginBottom:4}}>🌟 Mes points Yorix</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:"2rem",fontWeight:800,color:"var(--yellow)"}}>{loyaltyPts} pts</div>
            <div style={{fontSize:".71rem",opacity:.62,marginBottom:12}}>Niveau Or · {1000-loyaltyPts} pts pour Platine</div>
            <div style={{background:"rgba(255,255,255,.2)",borderRadius:50,height:7}}><div style={{background:"var(--yellow)",borderRadius:50,height:7,width:`${Math.min((loyaltyPts%1000)/10,100)}%`,transition:"width .6s"}}/></div>
          </div>
          <div className="sec-head"><h2 className="sec-title">🎁 Récompenses</h2></div>
          <div className="rewards-grid">{REWARDS_DATA.map(r=><div key={r.name} className="reward-card"><div className="reward-icon">{r.icon}</div><div className="reward-name">{r.name}</div><div className="reward-pts">{r.pts} pts</div><button className="reward-btn" onClick={()=>setLoyaltyPts(p=>Math.max(0,p-r.pts))}>Échanger</button></div>)}</div>
        </section>
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
          <div className="footer-col"><h4>Aide</h4><ul>{["Centre d'aide","Payer avec MoMo","Suivi commande","Nous contacter"].map(i=><li key={i}>{i}</li>)}</ul></div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Yorix Cameroun — RC: DOUALA/2026/B237</span>
          <div className="fb-badges"><span className="fbb">📱 MTN MoMo</span><span className="fbb">🔶 Orange Money</span><span className="fbb">🔐 Escrow</span><span className="fbb">🇨🇲 Made in CM</span></div>
        </div>
      </footer>
    </>
  );
}
