import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { showAppToast } from "../lib/appToast";

function SvgShield({ color = "currentColor" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}
function SvgCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

const DOC_TYPES = [
  { value: "cni",      label: "Carte Nationale d'Identité (CNI)" },
  { value: "passport", label: "Passeport" },
  { value: "rccm",     label: "Registre de Commerce (RCCM)" },
  { value: "other",    label: "Autre document officiel" },
];

export function SellerKYC({ userId }) {
  const [kyc, setKyc]         = useState(null);
  const [loading, setLoading] = useState(true);
  const [docType, setDocType] = useState("cni");
  const [file1, setFile1]     = useState(null);
  const [file2, setFile2]     = useState(null);
  const [saving, setSaving]   = useState(false);
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  useEffect(() => {
    if (!userId) return;
    supabase.from("seller_kyc").select("*").eq("user_id", userId).single()
      .then(({ data }) => { setKyc(data); setLoading(false); });
  }, [userId]);

  const sanitizeFileName = (name) =>
    name.replace(/[^a-zA-Z0-9._-]/g, "_").replace(/_{2,}/g, "_").slice(0, 80);

  const uploadFile = async (file, slot) => {
    const ext = file.name.split(".").pop().toLowerCase() || "jpg";
    const safeName = `${userId}/${slot}_${Date.now()}.${ext}`;
    const { data, error } = await supabase.storage
      .from("kyc-docs")
      .upload(safeName, file, { upsert: true, contentType: file.type });
    if (error) throw error;
    // Bucket privé → signed URL valable 10 ans
    const { data: signed, error: signErr } = await supabase.storage
      .from("kyc-docs")
      .createSignedUrl(data.path, 60 * 60 * 24 * 365 * 10);
    if (signErr) throw signErr;
    return signed.signedUrl;
  };

  const handleSubmit = async () => {
    if (!file1) { showAppToast("Ajoutez au moins le recto du document", "error"); return; }
    setSaving(true);
    try {
      const url1 = await uploadFile(file1, "doc1");
      let url2 = null;
      if (file2) url2 = await uploadFile(file2, "doc2");
      await supabase.from("seller_kyc").upsert({
        user_id:      userId,
        doc_type:     docType,
        doc_url:      url1,
        doc_url2:     url2,
        status:       "pending",
        submitted_at: new Date().toISOString(),
        updated_at:   new Date().toISOString(),
      }, { onConflict: "user_id" });
      setKyc({ status: "pending", submitted_at: new Date().toISOString(), doc_type: docType });
      showAppToast("Documents envoyés — vérification sous 48h ouvrées", "success", 5000);
    } catch (e) {
      showAppToast("Erreur upload : " + e.message, "error");
    }
    setSaving(false);
  };

  if (loading) return <div style={{ color: "var(--gray)", fontSize: ".8rem" }}>Chargement…</div>;

  const status = kyc?.status || "none";

  return (
    <div>
      {/* Status badge */}
      <div className={`kyc-status kyc-status--${status}`}>
        {status === "verified" && <SvgCheck />}
        {status === "pending"  && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
        {status === "none"     && <SvgShield />}
        {status === "rejected" && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>}
        <div>
          <div style={{ fontWeight: 700 }}>
            {status === "none"     && "Identité non vérifiée"}
            {status === "pending"  && "Vérification en cours"}
            {status === "verified" && "Identité vérifiée ✓"}
            {status === "rejected" && "Document refusé"}
          </div>
          {kyc?.submitted_at && status !== "verified" && (
            <div style={{ fontSize: ".68rem", fontWeight: 400, marginTop: 2 }}>
              Soumis le {new Date(kyc.submitted_at).toLocaleDateString("fr-FR")}
            </div>
          )}
          {kyc?.reviewer_note && status === "rejected" && (
            <div style={{ fontSize: ".72rem", marginTop: 4 }}>{kyc.reviewer_note}</div>
          )}
        </div>
      </div>

      {/* Benefits */}
      {status === "none" && (
        <div style={{ background: "var(--surface2)", borderRadius: 10, padding: "12px 14px", marginBottom: 16, fontSize: ".78rem", color: "var(--ink)", lineHeight: 1.6 }}>
          <strong>Avantages de la vérification :</strong><br/>
          • Badge "Vendeur vérifié" sur vos produits<br/>
          • Accès aux commandes B2B (achat en gros)<br/>
          • Priorité dans les résultats de recherche<br/>
          • Limite de retrait augmentée (500 000 FCFA/mois)
        </div>
      )}

      {/* Upload form */}
      {(status === "none" || status === "rejected") && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="form-group">
            <label className="form-label">Type de document <span style={{ color: "var(--red,#e53e3e)" }}>*</span></label>
            <select className="form-input" value={docType} onChange={e => setDocType(e.target.value)}>
              {DOC_TYPES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
          </div>

          <div>
            <div className="form-label" style={{ marginBottom: 6 }}>
              {docType === "cni" ? "Recto de la CNI" : "Document"} <span style={{ color: "var(--red,#e53e3e)" }}>*</span>
            </div>
            <div
              className="kyc-upload-zone"
              onClick={() => ref1.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === "Enter" && ref1.current?.click()}
            >
              <input ref={ref1} type="file" accept="image/*,.pdf" onChange={e => setFile1(e.target.files?.[0] || null)} />
              {file1 ? (
                <div className="kyc-doc-preview">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  {file1.name}
                </div>
              ) : (
                <div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gray)" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" style={{ display: "block", margin: "0 auto 8px" }}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <div style={{ fontSize: ".78rem", color: "var(--gray)", fontWeight: 600 }}>Cliquer pour choisir</div>
                  <div style={{ fontSize: ".65rem", color: "var(--gray)", marginTop: 2 }}>JPG, PNG, PDF — max 5 Mo</div>
                </div>
              )}
            </div>
          </div>

          {docType === "cni" && (
            <div>
              <div className="form-label" style={{ marginBottom: 6 }}>Verso de la CNI (optionnel)</div>
              <div
                className="kyc-upload-zone"
                onClick={() => ref2.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === "Enter" && ref2.current?.click()}
              >
                <input ref={ref2} type="file" accept="image/*,.pdf" onChange={e => setFile2(e.target.files?.[0] || null)} />
                {file2 ? (
                  <div className="kyc-doc-preview">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                    {file2.name}
                  </div>
                ) : (
                  <div style={{ fontSize: ".78rem", color: "var(--gray)", fontWeight: 600 }}>Verso (optionnel)</div>
                )}
              </div>
            </div>
          )}

          <button className="form-submit" onClick={handleSubmit} disabled={saving || !file1}>
            {saving ? (
              <><div className="spinner" style={{ width: 15, height: 15, borderWidth: 2 }} /> Envoi en cours…</>
            ) : (
              <><SvgShield color="#fff" /> Soumettre pour vérification</>
            )}
          </button>

          <p style={{ fontSize: ".68rem", color: "var(--gray)", textAlign: "center", lineHeight: 1.5 }}>
            Vos documents sont chiffrés et utilisés uniquement pour la vérification d'identité. Traitement sous 24–48h ouvrées.
          </p>
        </div>
      )}

      {status === "pending" && (
        <div style={{ background: "#fef3c7", border: "1px solid #fcd34d", borderRadius: 10, padding: "16px", textAlign: "center" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" style={{ display: "block", margin: "0 auto 10px" }} aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: ".9rem", color: "#92400e", marginBottom: 6 }}>Vérification en cours</div>
          <div style={{ fontSize: ".78rem", color: "#78350f" }}>Nos équipes examinent votre document. Vous recevrez une notification sous 24–48h ouvrées.</div>
        </div>
      )}

      {status === "verified" && (
        <div style={{ background: "#d1fae5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "20px", textAlign: "center" }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" style={{ display: "block", margin: "0 auto 10px" }} aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1rem", color: "#065f46", marginBottom: 6 }}>Identité vérifiée</div>
          <div style={{ fontSize: ".78rem", color: "#047857" }}>Votre identité a été vérifiée avec succès. Le badge "Vendeur vérifié" est maintenant visible sur vos produits.</div>
        </div>
      )}
    </div>
  );
}
