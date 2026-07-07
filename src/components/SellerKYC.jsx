import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { showAppToast } from "../lib/appToast";
import { uploadCloudinaryFile } from "../utils/helpers";
import {
  SELLER_CATEGORIES,
  categoryLabel,
  kycChecklist,
  validateKycSubmission,
} from "../lib/sellerKyc";
import {
  BUSINESS_REGISTRATION_COUNTRIES,
  IMPORT_BUSINESS_COUNTRIES,
  isOtherCountryCode,
  resolveCountryLabel,
} from "../lib/importWholesale";
import { CountrySelectWithOther } from "./seller/CountrySelectWithOther";

// Compresse une image via canvas — réduit les photos mobile (5-10 MB) à ~300 KB
async function compressImage(file, maxPx = 1200, quality = 0.82) {
  if (!file.type.startsWith("image/")) return file; // PDF → pas de compression
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxPx / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      canvas.toBlob(
        (blob) => resolve(blob ? new File([blob], file.name.replace(/\.\w+$/, ".jpg"), { type: "image/jpeg" }) : file),
        "image/jpeg", quality
      );
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(file); };
    img.src = url;
  });
}

const VILLES_CM = ["Yaoundé","Douala","Bafoussam","Bamenda","Garoua","Maroua","Ngaoundéré","Bertoua","Ebolowa","Kribi","Limbe","Kumba","Buea","Edéa","Nkongsamba","Dschang","Foumban","Kumbo","Mbouda","Sangmélima"];

const STEPS = [
  { id: 1, label: "Identité",    icon: "👤" },
  { id: 2, label: "Coordonnées", icon: "📞" },
  { id: 3, label: "Activité",    icon: "🏪" },
  { id: 4, label: "Documents",   icon: "📄" },
  { id: 5, label: "Validation",  icon: "✅" },
];

function ProgressBar({ step }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        {STEPS.map((s) => (
          <div key={s.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: ".75rem", fontWeight: 800, marginBottom: 4,
              background: step > s.id ? "var(--green)" : step === s.id ? "var(--green)" : "var(--surface2)",
              color: step >= s.id ? "#fff" : "var(--gray)",
              border: step === s.id ? "2px solid var(--green)" : "2px solid transparent",
              boxShadow: step === s.id ? "0 0 0 3px var(--green-pale,#d1fae5)" : "none",
              transition: "all .2s",
            }}>
              {step > s.id ? "✓" : s.id}
            </div>
            <div style={{ fontSize: ".58rem", color: step >= s.id ? "var(--green)" : "var(--gray)", fontWeight: step === s.id ? 700 : 400, textAlign: "center" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: 4, background: "var(--surface2)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ height: "100%", background: "var(--green)", borderRadius: 4, width: `${((step - 1) / (STEPS.length - 1)) * 100}%`, transition: "width .3s" }} />
      </div>
    </div>
  );
}

function Field({ label, required, children, hint }) {
  return (
    <div className="form-group" style={{ marginBottom: 14 }}>
      <label className="form-label">
        {label}{required && <span style={{ color: "var(--red,#e53e3e)", marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {hint && <div style={{ fontSize: ".65rem", color: "var(--gray)", marginTop: 3 }}>{hint}</div>}
    </div>
  );
}

function UploadZone({ label, file, onFile, accept = "image/*,.pdf", inputRef, hint }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div className="form-label" style={{ marginBottom: 6 }}>{label}</div>
      <div
        className="kyc-upload-zone"
        onClick={() => inputRef.current?.click()}
        role="button" tabIndex={0}
        onKeyDown={e => e.key === "Enter" && inputRef.current?.click()}
        style={{ minHeight: 80 }}
      >
        <input ref={inputRef} type="file" accept={accept} onChange={e => onFile(e.target.files?.[0] || null)} />
        {file ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            <span style={{ fontSize: ".78rem", color: "var(--ink)", fontWeight: 600 }}>{file.name}</span>
            <button
              type="button"
              onClick={e => { e.stopPropagation(); onFile(null); }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--gray)", fontSize: ".8rem", marginLeft: "auto" }}
            >✕</button>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "8px 0" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gray)" strokeWidth="1.5" strokeLinecap="round" style={{ display: "block", margin: "0 auto 6px" }} aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
            </svg>
            <div style={{ fontSize: ".75rem", color: "var(--gray)", fontWeight: 600 }}>Cliquer pour choisir</div>
            {hint && <div style={{ fontSize: ".62rem", color: "var(--gray)", marginTop: 2 }}>{hint}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

export function SellerKYC({ userId, userEmail, userPhone }) {
  const [kyc, setKyc]         = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep]       = useState(1);
  const [saving, setSaving]   = useState(false);
  const draftKey = userId ? `kyc_draft_${userId}` : null;

  // Champs formulaire
  const [form, setForm] = useState({
    full_name: "", birth_date: "", birth_place: "", cni_number: "", cni_expiry: "",
    phone: userPhone || "", email: userEmail || "", whatsapp: "",
    seller_category: "online",
    seller_type: "particulier", company_name: "", rccm: "",
    business_country: "Cameroun",
    business_country_code: "CM",
    business_country_other: "",
    country: "Cameroun", city: "", quartier: "", address: "",
    location_map_url: "",
    declaration: false,
  });

  const [fileCniR, setFileCniR] = useState(null);
  const [fileCniV, setFileCniV] = useState(null);
  const [fileSelfie, setFileSelfie] = useState(null);
  const [fileShop, setFileShop] = useState(null);
  const [fileShopPlan, setFileShopPlan] = useState(null);
  const [fileLocationProof, setFileLocationProof] = useState(null);
  const [fileRccmDoc, setFileRccmDoc] = useState(null);
  const [fileLegalDocs, setFileLegalDocs] = useState([]);
  const [fileImportProofs, setFileImportProofs] = useState([]);
  const refCniR   = useRef(null);
  const refCniV   = useRef(null);
  const refSelfie = useRef(null);
  const refShop   = useRef(null);
  const refShopPlan = useRef(null);
  const refLocationProof = useRef(null);
  const refRccmDoc = useRef(null);
  const initialLoad = useRef(true);

  const upd = (field, val) => setForm(f => ({ ...f, [field]: val }));

  // ── Sauvegarde automatique brouillon localStorage ──
  useEffect(() => {
    if (!draftKey || initialLoad.current) return;
    try { localStorage.setItem(draftKey, JSON.stringify({ form, step })); } catch {}
  }, [form, step]);

  // ── Chargement initial : Supabase en priorité, sinon localStorage ──
  useEffect(() => {
    if (!userId) return;
    supabase.from("seller_kyc").select("*").eq("user_id", userId).maybeSingle()
      .then(({ data }) => {
        if (data) {
          setKyc(data);
          populateForm(data);
          // Restaurer l'étape depuis localStorage si plus avancée
          try {
            const raw = localStorage.getItem(`kyc_draft_${userId}`);
            if (raw) {
              const draft = JSON.parse(raw);
              if (draft.step > 1 && data.status !== "verified" && data.status !== "pending") {
                setStep(draft.step);
              }
            }
          } catch {}
        } else {
          // Aucun enregistrement Supabase → essayer localStorage
          try {
            const raw = localStorage.getItem(`kyc_draft_${userId}`);
            if (raw) {
              const draft = JSON.parse(raw);
              if (draft.form) setForm(f => ({ ...f, ...draft.form }));
              if (draft.step) setStep(draft.step);
              showAppToast("Brouillon restauré — continuez où vous étiez !", "success", 4000);
            }
          } catch {}
        }
        setLoading(false);
        setTimeout(() => { initialLoad.current = false; }, 100);
      });
  }, [userId]);

  const populateForm = (data) => {
    setForm(f => ({
      ...f,
      full_name:    data.full_name    || "",
      birth_date:   data.birth_date   || "",
      birth_place:  data.birth_place  || "",
      cni_number:   data.cni_number   || "",
      cni_expiry:   data.cni_expiry   || "",
      phone:        data.phone        || userPhone || "",
      email:        data.email        || userEmail || "",
      whatsapp:     data.whatsapp     || "",
      seller_type:  data.seller_type  || "particulier",
      seller_category: data.seller_category || (data.seller_type === "entreprise" ? "local_business" : "online"),
      company_name: data.company_name || "",
      rccm:         data.rccm         || "",
      business_country: data.business_country || data.country || "Cameroun",
      business_country_code: data.business_country_code || data.business_country || "CM",
      business_country_other: data.business_country_other || "",
      country:      data.country      || "Cameroun",
      city:         data.city         || "",
      quartier:     data.quartier     || "",
      address:      data.address      || "",
      location_map_url: data.location_map_url || "",
      declaration:  data.declaration  || false,
    }));
  };

  // ── Sauvegarde partielle vers Supabase (champs texte seulement) ──
  const saveDraft = async (fields = {}) => {
    try {
      await supabase.from("seller_kyc").upsert(
        { user_id: userId, status: "draft", updated_at: new Date().toISOString(), ...fields },
        { onConflict: "user_id" }
      );
    } catch {}
  };

  const slotToField = { cni_recto: "doc_url", cni_verso: "doc_url2", selfie: "selfie_url", shop: "shop_photo_url" };

  const uploadFile = async (file, slot, attempt = 0) => {
    try {
      const compressed = await compressImage(file);
      const url = await uploadCloudinaryFile(compressed, { folder: `kyc/${userId}` });
      // Sauvegarder immédiatement l'URL en base (draft) pour ne pas perdre l'upload
      const field = slotToField[slot];
      if (field) saveDraft({ [field]: url });
      return url;
    } catch (e) {
      if (attempt < 2) {
        await new Promise(r => setTimeout(r, 1500 * (attempt + 1)));
        return uploadFile(file, slot, attempt + 1);
      }
      throw e;
    }
  };

  const uploadMany = async (files, type, labelPrefix) => {
    const out = [];
    for (let i = 0; i < files.length; i += 1) {
      const url = await uploadFile(files[i], type);
      out.push({ type, url, label: `${labelPrefix} ${i + 1}` });
    }
    return out;
  };

  const handleSubmit = async () => {
    if (!form.declaration) { showAppToast("Veuillez accepter la déclaration sur l'honneur", "error"); return; }

    const preCheck = validateKycSubmission(kyc, form, {
      cni_recto: fileCniR || kyc?.doc_url,
      selfie: fileSelfie || kyc?.selfie_url,
      shop_plan: fileShopPlan,
      location_proof: fileLocationProof,
      rccm_doc: fileRccmDoc,
      legal_docs: fileLegalDocs,
      import_proofs: fileImportProofs,
    });
    if (!preCheck.ok) { showAppToast(preCheck.message, "error", 5000); return; }

    setSaving(true);
    try {
      const url1 = fileCniR ? await uploadFile(fileCniR, "cni_recto") : (kyc?.doc_url || null);
      const url2 = fileCniV ? await uploadFile(fileCniV, "cni_verso") : (kyc?.doc_url2 || null);
      const urlSelfie = fileSelfie ? await uploadFile(fileSelfie, "selfie") : (kyc?.selfie_url || null);
      const urlShop = fileShop ? await uploadFile(fileShop, "shop") : (kyc?.shop_photo_url || null);

      const extra = Array.isArray(kyc?.extra_docs) ? kyc.extra_docs.filter((d) => d?.url) : [];
      const mergeExtra = (type, url, label) => {
        if (url) extra.push({ type, url, label });
      };
      if (fileShopPlan) mergeExtra("shop_plan", await uploadFile(fileShopPlan, "shop_plan"), "Plan boutique");
      if (fileLocationProof) mergeExtra("location_proof", await uploadFile(fileLocationProof, "location_proof"), "Justificatif local");
      if (fileRccmDoc) mergeExtra("rccm", await uploadFile(fileRccmDoc, "rccm"), "RCCM");
      const legalUploaded = await uploadMany(fileLegalDocs, "legal_doc", "Document légal");
      const importUploaded = await uploadMany(fileImportProofs, "import_proof", "Pièce import");
      const extra_docs = [...extra, ...legalUploaded, ...importUploaded];

      const seller_type = ["local_business", "import_business"].includes(form.seller_category) ? "entreprise" : "particulier";

      const payload = {
        user_id: userId,
        full_name: form.full_name,
        birth_date: form.birth_date || null,
        birth_place: form.birth_place,
        cni_number: form.cni_number,
        cni_expiry: form.cni_expiry || null,
        phone: form.phone,
        email: form.email,
        whatsapp: form.whatsapp || null,
        seller_type,
        seller_category: form.seller_category,
        company_name: form.company_name || null,
        rccm: form.rccm || null,
        business_country: resolveCountryLabel(form.business_country_code, form.business_country_other),
        business_country_code: form.business_country_code || null,
        business_country_other: isOtherCountryCode(form.business_country_code)
          ? (form.business_country_other?.trim() || null)
          : null,
        country: form.country,
        city: form.city,
        quartier: form.quartier,
        address: form.address,
        location_map_url: form.location_map_url || null,
        declaration: form.declaration,
        doc_url: url1,
        doc_url2: url2,
        selfie_url: urlSelfie,
        shop_photo_url: urlShop,
        extra_docs,
        status: "pending",
        kyc_level: form.seller_category === "import_business" ? "full" : "lite",
        submitted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        reviewer_note: null,
      };

      const { error: upsertErr } = await supabase.from("seller_kyc").upsert(payload, { onConflict: "user_id" });
      if (upsertErr) throw upsertErr;

      await supabase.from("notifications").insert({
        user_id: userId,
        type: "kyc",
        title: "Demande KYC envoyée",
        message: "Votre dossier de vérification vendeur est en cours d'examen (24–48h). Le badge sera activé après validation admin.",
        link: "/dashboard?tab=kyc",
        lu: false,
      }).catch(() => {});

      setKyc({ ...payload, status: "pending" });
      try { if (draftKey) localStorage.removeItem(draftKey); } catch {}
      showAppToast("Dossier envoyé — validation par l'équipe admin sous 24–48h", "success", 5000);
    } catch (e) {
      const msg = e?.message || "";
      const friendly = /failed to fetch|network|load failed/i.test(msg)
        ? "Connexion instable — vérifiez votre réseau et réessayez"
        : msg || "Connexion interrompue, réessayez";
      showAppToast("Erreur : " + friendly, "error", 6000);
    }
    setSaving(false);
  };

  // ── Validation par étape ──
  const canNext = () => {
    if (step === 1) return form.full_name.trim() && form.birth_date && form.birth_place.trim() && form.cni_number.trim();
    if (step === 2) return form.phone.replace(/\s/g,"").length >= 8 && form.email.includes("@");
    if (step === 3) {
      const needsCompany = ["local_business", "import_business"].includes(form.seller_category);
      return form.city.trim() && form.quartier.trim() && form.address.trim()
        && (!needsCompany || form.company_name.trim());
    }
    if (step === 4) {
      const hasCni = fileCniR || kyc?.doc_url;
      const hasSelfie = fileSelfie || kyc?.selfie_url;
      if (!hasCni || !hasSelfie) return false;
      if (form.seller_category === "physical_store") {
        return (fileShopPlan || kyc?.extra_docs?.some?.((d) => d.type === "shop_plan"))
          && (fileLocationProof || kyc?.extra_docs?.some?.((d) => d.type === "location_proof"));
      }
      if (form.seller_category === "local_business") {
        const legalCount = fileLegalDocs.length + (kyc?.extra_docs?.filter?.((d) => d.type === "legal_doc")?.length || 0);
        return (form.rccm.trim() || fileRccmDoc) && legalCount >= 2 && (fileRccmDoc || kyc?.extra_docs?.some?.((d) => d.type === "rccm"));
      }
      if (form.seller_category === "import_business") {
        const importCount = fileImportProofs.length + (kyc?.extra_docs?.filter?.((d) => d.type === "import_proof")?.length || 0);
        const countryOk = form.business_country_code
          && (!isOtherCountryCode(form.business_country_code) || form.business_country_other?.trim?.());
        return (form.rccm.trim() || fileRccmDoc) && importCount >= 3 && countryOk;
      }
      return true;
    }
    return true;
  };

  if (loading) return <div style={{ color: "var(--gray)", fontSize: ".8rem", textAlign: "center", padding: 20 }}>Chargement…</div>;

  // ── Statut final (pending / verified / rejected) ──
  const status = kyc?.status;

  if (status === "verified") return (
    <div style={{ background: "#d1fae5", border: "1px solid #6ee7b7", borderRadius: 14, padding: 24, textAlign: "center" }}>
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" style={{ display: "block", margin: "0 auto 12px" }} aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
      </svg>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: "#065f46", marginBottom: 6 }}>Identité vérifiée ✓</div>
      <div style={{ fontSize: ".82rem", color: "#047857", lineHeight: 1.6 }}>
        Votre identité a été vérifiée avec succès.<br/>
        Le badge <strong style={{ color: "#1d4ed8" }}>Vendeur vérifié</strong> (coche bleue) sera visible sur vos produits après validation admin.
      </div>
      {kyc?.kyc_level === "full" && (
        <div style={{ marginTop: 12, background: "#fff", borderRadius: 10, padding: "8px 14px", fontSize: ".75rem", color: "#059669", fontWeight: 700 }}>
          ⭐ KYC Complet — Retrait jusqu'à 500 000 FCFA/mois · B2B activé
        </div>
      )}
    </div>
  );

  if (status === "pending") return (
    <div style={{ background: "#fef3c7", border: "1px solid #fcd34d", borderRadius: 14, padding: 24, textAlign: "center" }}>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" style={{ display: "block", margin: "0 auto 10px" }} aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: ".95rem", color: "#92400e", marginBottom: 6 }}>Dossier en cours d'examen</div>
      <div style={{ fontSize: ".8rem", color: "#78350f", lineHeight: 1.6 }}>
        Soumis le <strong>{kyc.submitted_at ? new Date(kyc.submitted_at).toLocaleDateString("fr-FR") : "—"}</strong><br/>
        Nos équipes traitent votre dossier sous 24–48h ouvrées.
      </div>
      <div style={{ marginTop: 12, background: "#fff", borderRadius: 10, padding: "8px 14px", fontSize: ".75rem", color: "#92400e" }}>
        Niveau : <strong>{kyc.kyc_level === "full" ? "⭐ KYC Complet" : "KYC Lite"}</strong>
      </div>
      <button
        onClick={() => setKyc(k => ({ ...k, status: "none" }))}
        style={{ marginTop: 14, background: "none", border: "1px solid #fcd34d", borderRadius: 8, padding: "7px 16px", fontSize: ".75rem", color: "#92400e", cursor: "pointer", fontWeight: 600 }}
      >
        Modifier mon dossier
      </button>
    </div>
  );

  if (status === "info_requested") return (
    <div>
      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 14, padding: 16, marginBottom: 20 }}>
        <div style={{ fontWeight: 700, color: "#1d4ed8", marginBottom: 6 }}>💬 Compléments demandés</div>
        <div style={{ fontSize: ".8rem", color: "#1e40af", lineHeight: 1.6 }}>
          {kyc.reviewer_note || "Merci de compléter votre dossier."}
        </div>
      </div>
      {renderForm()}
    </div>
  );

  if (status === "rejected") return (
    <div>
      <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 14, padding: 16, marginBottom: 20 }}>
        <div style={{ fontWeight: 700, color: "#991b1b", marginBottom: 6 }}>❌ Dossier refusé</div>
        <div style={{ fontSize: ".8rem", color: "#7f1d1d", lineHeight: 1.6 }}>
          Motif : <strong>{kyc.reviewer_note || "Non précisé"}</strong>
        </div>
        <div style={{ fontSize: ".72rem", color: "#991b1b", marginTop: 6 }}>Corrigez les informations ci-dessous et soumettez à nouveau.</div>
      </div>
      {/* Re-show the form */}
      {renderForm()}
    </div>
  );

  function renderForm() {
    return (
      <div>
        <ProgressBar step={step} />

        {/* ── ÉTAPE 1 : IDENTITÉ ── */}
        {step === 1 && (
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: ".92rem", color: "var(--ink)", marginBottom: 16 }}>👤 Informations d'identité</div>
            <Field label="Nom complet (prénom + nom)" required>
              <input className="form-input" placeholder="Ex: Marie Ngono Biya" value={form.full_name} onChange={e => upd("full_name", e.target.value)} />
            </Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Field label="Date de naissance" required>
                <input className="form-input" type="date" max={new Date(Date.now() - 18*365*24*3600*1000).toISOString().slice(0,10)} value={form.birth_date} onChange={e => upd("birth_date", e.target.value)} />
              </Field>
              <Field label="Lieu de naissance" required>
                <input className="form-input" placeholder="Ex: Yaoundé" value={form.birth_place} onChange={e => upd("birth_place", e.target.value)} />
              </Field>
              <Field label="Numéro CNI" required hint="Numéro figurant sur votre carte d'identité">
                <input className="form-input" placeholder="Ex: 123456789" value={form.cni_number} onChange={e => upd("cni_number", e.target.value)} />
              </Field>
              <Field label="Date d'expiration CNI">
                <input className="form-input" type="date" value={form.cni_expiry} onChange={e => upd("cni_expiry", e.target.value)} />
              </Field>
            </div>
          </div>
        )}

        {/* ── ÉTAPE 2 : COORDONNÉES ── */}
        {step === 2 && (
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: ".92rem", color: "var(--ink)", marginBottom: 16 }}>📞 Coordonnées</div>
            <Field label="Téléphone principal" required hint="Numéro MTN ou Orange actif">
              <input className="form-input" type="tel" inputMode="numeric" placeholder="Ex: 677 123 456" value={form.phone} onChange={e => upd("phone", e.target.value)} />
            </Field>
            <Field label="Adresse email" required>
              <input className="form-input" type="email" placeholder="votre@email.com" value={form.email} onChange={e => upd("email", e.target.value)} />
            </Field>
            <Field label="WhatsApp (optionnel)" hint="Si différent du téléphone principal">
              <input className="form-input" type="tel" inputMode="numeric" placeholder="Ex: 690 456 789" value={form.whatsapp} onChange={e => upd("whatsapp", e.target.value)} />
            </Field>
          </div>
        )}

        {/* ── ÉTAPE 3 : ACTIVITÉ ── */}
        {step === 3 && (
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: ".92rem", color: "var(--ink)", marginBottom: 16 }}>🏪 Type de vendeur & localisation</div>
            <Field label="Profil vendeur" required hint="Les pièces demandées à l'étape suivante s'adaptent à votre profil.">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {Object.values(SELLER_CATEGORIES).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => upd("seller_category", cat.id)}
                    style={{
                      textAlign: "left",
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: `2px solid ${form.seller_category === cat.id ? "#1d4ed8" : "var(--border)"}`,
                      background: form.seller_category === cat.id ? "#eff6ff" : "var(--surface)",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: ".8rem" }}>{cat.icon} {cat.labelFr}</div>
                    <div style={{ fontSize: ".65rem", color: "var(--gray)", marginTop: 4, lineHeight: 1.4 }}>{cat.descFr}</div>
                  </button>
                ))}
              </div>
            </Field>
            {(form.seller_category === "local_business" || form.seller_category === "import_business") && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Field label="Raison sociale / Entreprise" required>
                  <input className="form-input" placeholder="Ex: SARL Afro Market" value={form.company_name} onChange={e => upd("company_name", e.target.value)} />
                </Field>
                <Field label="N° RCCM (pays d'implantation)" required hint="Registre du commerce du pays où la société est enregistrée">
                  <input className="form-input" placeholder="Ex: RC/DLA/2023/B/123 ou équivalent" value={form.rccm} onChange={e => upd("rccm", e.target.value)} />
                </Field>
                <CountrySelectWithOther
                  label="Pays d'enregistrement (RCCM)"
                  required
                  value={form.business_country_code}
                  other={form.business_country_other}
                  onChange={(code) => upd("business_country_code", code)}
                  onOtherChange={(v) => upd("business_country_other", v)}
                  options={form.seller_category === "import_business"
                    ? IMPORT_BUSINESS_COUNTRIES
                    : BUSINESS_REGISTRATION_COUNTRIES}
                  hint="Chine, Inde, France, Nigeria… ou Autre avec précision"
                />
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Field label="Pays (localisation)" required>
                <input className="form-input" value={form.country} onChange={e => upd("country", e.target.value)} />
              </Field>
              <Field label="Ville" required>
                <select className="form-input" value={form.city} onChange={e => upd("city", e.target.value)}>
                  <option value="">Choisir...</option>
                  {VILLES_CM.map(v => <option key={v}>{v}</option>)}
                  <option value="Autre">Autre ville</option>
                </select>
              </Field>
              <Field label="Quartier" required>
                <input className="form-input" placeholder="Ex: Bastos, Akwa…" value={form.quartier} onChange={e => upd("quartier", e.target.value)} />
              </Field>
              <Field label="Adresse précise" required>
                <input className="form-input" placeholder="Rue, repère, immeuble…" value={form.address} onChange={e => upd("address", e.target.value)} />
              </Field>
            </div>
            {form.seller_category !== "online" && (
              <Field label="Lien Google Maps / plan (optionnel)" hint="Collez un lien Maps ou plan de la boutique">
                <input className="form-input" placeholder="https://maps.google.com/…" value={form.location_map_url} onChange={e => upd("location_map_url", e.target.value)} />
              </Field>
            )}
          </div>
        )}

        {/* ── ÉTAPE 4 : DOCUMENTS ── */}
        {step === 4 && (
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: ".92rem", color: "var(--ink)", marginBottom: 8 }}>📄 Documents — {categoryLabel(form.seller_category)}</div>
            <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "10px 14px", fontSize: ".75rem", color: "#1d4ed8", marginBottom: 16, lineHeight: 1.6 }}>
              Validation <strong>uniquement par l'équipe admin</strong> après examen. Le badge apparaît seulement après approbation.
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <UploadZone label="📷 CNI — Recto *" file={fileCniR} onFile={setFileCniR} inputRef={refCniR} hint={kyc?.doc_url ? "Déjà envoyé" : "Obligatoire"} />
              <UploadZone label="📷 CNI — Verso" file={fileCniV} onFile={setFileCniV} inputRef={refCniV} />
              <UploadZone label="🤳 Selfie avec CNI *" file={fileSelfie} onFile={setFileSelfie} inputRef={refSelfie} hint="Obligatoire" />
              {(form.seller_category === "online" || form.seller_category === "physical_store") && (
                <UploadZone label="🏪 Photo lieu / stock" file={fileShop} onFile={setFileShop} inputRef={refShop} />
              )}
            </div>
            {form.seller_category === "physical_store" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 8 }}>
                <UploadZone label="🗺 Plan / photo boutique *" file={fileShopPlan} onFile={setFileShopPlan} inputRef={refShopPlan} hint="Façade, enseigne ou plan" />
                <UploadZone label="📋 Justificatif local *" file={fileLocationProof} onFile={setFileLocationProof} inputRef={refLocationProof} hint="Bail, impôt, quittance loyer…" />
              </div>
            )}
            {form.seller_category === "local_business" && (
              <div style={{ marginTop: 8 }}>
                <UploadZone label="📋 Scan RCCM *" file={fileRccmDoc} onFile={setFileRccmDoc} inputRef={refRccmDoc} />
                <div style={{ fontSize: ".72rem", fontWeight: 700, color: "var(--gray)", margin: "12px 0 8px" }}>Documents légaux (min. 2) — patente, NIU, statuts…</div>
                {fileLegalDocs.map((f, i) => (
                  <div key={i} style={{ fontSize: ".75rem", marginBottom: 4 }}>✓ {f.name}</div>
                ))}
                <input type="file" accept="image/*,.pdf" multiple onChange={(e) => setFileLegalDocs(Array.from(e.target.files || []))} />
              </div>
            )}
            {form.seller_category === "import_business" && (
              <div style={{ marginTop: 8 }}>
                <UploadZone label="📋 RCCM / licence pays d'implantation *" file={fileRccmDoc} onFile={setFileRccmDoc} inputRef={refRccmDoc} />
                <div style={{ fontSize: ".72rem", fontWeight: 700, color: "var(--gray)", margin: "12px 0 8px" }}>Pièces de fiabilité import (min. 3) — contrat usine, BL, licence import…</div>
                {fileImportProofs.map((f, i) => (
                  <div key={i} style={{ fontSize: ".75rem", marginBottom: 4 }}>✓ {f.name}</div>
                ))}
                <input type="file" accept="image/*,.pdf" multiple onChange={(e) => setFileImportProofs(Array.from(e.target.files || []))} />
              </div>
            )}
          </div>
        )}

        {/* ── ÉTAPE 5 : VALIDATION ── */}
        {step === 5 && (
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: ".92rem", color: "var(--ink)", marginBottom: 16 }}>✅ Récapitulatif & Déclaration</div>

            {/* Récap */}
            <div style={{ background: "var(--surface2)", borderRadius: 12, padding: "14px 16px", marginBottom: 16, display: "flex", flexDirection: "column", gap: 8, fontSize: ".78rem" }}>
              {[
                ["Nom",         form.full_name],
                ["Naissance",   `${form.birth_date ? new Date(form.birth_date).toLocaleDateString("fr-FR") : "—"} à ${form.birth_place}`],
                ["CNI n°",      form.cni_number],
                ["Téléphone",   form.phone],
                ["Email",       form.email],
                ["Type",        categoryLabel(form.seller_category || (form.seller_type === "entreprise" ? "local_business" : "online"))],
                form.company_name && ["Entreprise", form.company_name],
                form.rccm && ["RCCM", `${form.rccm} (${resolveCountryLabel(form.business_country_code, form.business_country_other)})`],
                ["Localisation",`${form.quartier}, ${form.city}, ${form.country}`],
                ["Documents",   [fileCniR && "CNI recto", fileCniV && "CNI verso", fileSelfie && "Selfie", fileShop && "Boutique"].filter(Boolean).join(" · ") || (kyc?.doc_url ? "Déjà soumis" : "Aucun")],
              ].map(([lbl, val]) => (
                <div key={lbl} style={{ display: "flex", gap: 10 }}>
                  <span style={{ color: "var(--gray)", minWidth: 100, flexShrink: 0 }}>{lbl}</span>
                  <strong style={{ color: "var(--ink)", wordBreak: "break-word" }}>{val || "—"}</strong>
                </div>
              ))}
            </div>

            {/* Déclaration sur l'honneur */}
            <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", background: form.declaration ? "var(--green-pale,#f0fdf4)" : "var(--surface2)", border: `1.5px solid ${form.declaration ? "var(--green)" : "var(--border)"}`, borderRadius: 12, padding: "14px 16px", transition: "all .2s" }}>
              <input
                type="checkbox"
                checked={form.declaration}
                onChange={e => upd("declaration", e.target.checked)}
                style={{ width: 18, height: 18, marginTop: 1, accentColor: "var(--green)", flexShrink: 0 }}
              />
              <span style={{ fontSize: ".78rem", color: "var(--ink)", lineHeight: 1.6 }}>
                Je certifie sur l'honneur que les informations fournies sont exactes, que les documents transmis m'appartiennent et que je suis autorisé(e) à exercer une activité commerciale. Je reconnais que toute fausse déclaration entraîne la suspension immédiate de mon compte Yorix.
              </span>
            </label>
          </div>
        )}

        {/* ── NAVIGATION ── */}
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(s => s - 1)}
              style={{ padding: "11px 20px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--ink)", fontWeight: 700, fontSize: ".83rem", cursor: "pointer" }}
            >
              ← Retour
            </button>
          )}
          {step < 5 ? (
            <button
              type="button"
              onClick={() => {
                // Sauvegarder les champs de l'étape courante en Supabase (brouillon)
                const stepFields = [
                  { full_name: form.full_name, birth_date: form.birth_date || null, birth_place: form.birth_place, cni_number: form.cni_number, cni_expiry: form.cni_expiry || null },
                  { phone: form.phone, email: form.email, whatsapp: form.whatsapp || null },
                  { seller_type: form.seller_category === "local_business" || form.seller_category === "import_business" ? "entreprise" : "particulier", seller_category: form.seller_category, company_name: form.company_name || null, rccm: form.rccm || null, business_country_code: form.business_country_code, business_country_other: form.business_country_other || null, country: form.country, city: form.city, quartier: form.quartier, address: form.address, location_map_url: form.location_map_url || null },
                  {},
                ][step - 1] || {};
                if (Object.keys(stepFields).length) saveDraft(stepFields);
                setStep(s => s + 1);
              }}
              disabled={!canNext()}
              style={{
                flex: 1, padding: "12px", borderRadius: 10, border: "none", background: canNext() ? "var(--green)" : "var(--surface2)",
                color: canNext() ? "#fff" : "var(--gray)", fontWeight: 700, fontSize: ".85rem", cursor: canNext() ? "pointer" : "not-allowed", transition: "all .2s",
              }}
            >
              Continuer →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving || !form.declaration}
              style={{
                flex: 1, padding: "12px", borderRadius: 10, border: "none",
                background: form.declaration ? "var(--green)" : "var(--surface2)",
                color: form.declaration ? "#fff" : "var(--gray)", fontWeight: 700, fontSize: ".85rem",
                cursor: form.declaration && !saving ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              {saving ? (
                <><div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> Envoi en cours…</>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Envoyer mon dossier
                </>
              )}
            </button>
          )}
        </div>

        <p style={{ fontSize: ".65rem", color: "var(--gray)", textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>
          Vos documents sont chiffrés et utilisés uniquement pour la vérification. Traitement sous 24–48h ouvrées.
        </p>
      </div>
    );
  }

  return renderForm();
}
