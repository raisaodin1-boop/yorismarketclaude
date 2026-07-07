import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { showAppToast } from "../lib/appToast";
import { Stars } from "./Stars";

const STAR_LABELS = { 1: "Très mauvais", 2: "Mauvais", 3: "Correct", 4: "Bien", 5: "Excellent" };
const STAR_COLORS = { 1: "avis-star-label--1", 2: "avis-star-label--2", 3: "avis-star-label--3", 4: "avis-star-label--4", 5: "avis-star-label--5" };

export function FormulaireAvis({ productId, userId, userName, onSubmit, verifiedPurchase }) {
  const [note, setNote]           = useState(0);
  const [texte, setTexte]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [done, setDone]           = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  useEffect(() => {
    if (!userId || !productId) return;
    supabase
      .from("reviews")
      .select("id")
      .eq("product_id", productId)
      .eq("user_id", userId)
      .limit(1)
      .then(({ data }) => setAlreadyReviewed((data || []).length > 0));
  }, [userId, productId]);

  const submit = async () => {
    if (!note) { showAppToast("Choisissez une note !", "error"); return; }
    if (texte.trim().length < 20) { showAppToast("Commentaire trop court (min 20 caractères)", "error"); return; }
    setLoading(true);
    try {
      const { error } = await supabase.from("reviews").insert({
        product_id:        productId,
        user_id:           userId || null,
        auteur:            userName || "Anonyme",
        note,
        texte,
        verified_purchase: Boolean(verifiedPurchase),
      });
      if (error) throw error;
      supabase.rpc("update_product_rating", { p_product_id: productId }).catch(() => {});
      setDone(true);
      showAppToast("Merci pour votre avis !", "success", 3000);
      onSubmit?.({ auteur: userName || "Anonyme", note, texte, verified_purchase: Boolean(verifiedPurchase) });
    } catch (err) {
      showAppToast("Erreur : " + (err.message || "Réessayez"), "error");
    }
    setLoading(false);
  };

  if (done) return (
    <div className="success-msg" style={{ display:"flex", alignItems:"center", gap:8 }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
      Merci pour votre avis !
    </div>
  );

  if (alreadyReviewed) return (
    <div style={{ background:"var(--surface2)", borderRadius:10, padding:"10px 14px", fontSize:".78rem", color:"var(--gray)", marginBottom:12 }}>
      Vous avez déjà laissé un avis pour ce produit.
    </div>
  );

  return (
    <div style={{ background:"var(--surface2)", borderRadius:12, padding:16, marginBottom:12 }}>
      <div style={{ fontFamily: "var(--font-display)", fontWeight:700, fontSize:".88rem", color:"var(--ink)", marginBottom:10 }}>
        Laisser un avis
        {verifiedPurchase && (
          <span className="avis-verified" style={{ marginLeft:8 }}>Achat vérifié</span>
        )}
      </div>
      <div style={{ marginBottom:10 }}>
        <div style={{ fontSize:".73rem", fontWeight:600, color:"var(--ink)", marginBottom:5 }}>Note :</div>
        <Stars value={note} onSelect={setNote} size="lg" />
        {note > 0 && (
          <div className={`avis-star-label ${STAR_COLORS[note] || ""}`}>{STAR_LABELS[note]}</div>
        )}
      </div>
      <textarea
        className="form-textarea"
        style={{ minHeight:70 }}
        placeholder="Votre commentaire (min 20 caractères)…"
        value={texte}
        onChange={e => setTexte(e.target.value)}
      />
      <div className="avis-char-count" style={{ color: texte.length < 20 && texte.length > 0 ? "var(--red,#e53e3e)" : "var(--gray)" }}>
        {texte.length} / 20 min
      </div>
      <button
        className="form-submit"
        style={{ marginTop:8 }}
        onClick={submit}
        disabled={loading || !note || texte.trim().length < 20}
      >
        {loading ? (
          <><div className="spinner" style={{ width:14, height:14, borderWidth:2 }} /> Envoi…</>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Publier l'avis
          </>
        )}
      </button>
    </div>
  );
}
