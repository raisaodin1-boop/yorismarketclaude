import { useMemo, useState } from "react";
import { Sparkles, Wand2 } from "lucide-react";
import { draftProductListing } from "../../lib/businessAi";
import "../ai/yorixAiPanels.css";

/**
 * Assistant rédaction fiche produit (Business AI MVP).
 * Le vendeur valide avant publication ; photos via Cloudinary inchangées.
 */
export function BusinessAiAssistant({
  form,
  setForm,
  peerProducts = [],
  locale = "fr",
}) {
  const [draft, setDraft] = useState(null);
  const [hint, setHint] = useState("");
  const isEn = locale === "en";

  const generate = () => {
    const result = draftProductListing({
      hint: hint.trim() || form.name_fr,
      category: form.categorie,
      ville: form.ville,
      priceHint: form.prix,
      peerProducts,
    });
    setDraft(result);
  };

  const apply = () => {
    if (!draft) return;
    setForm((f) => ({
      ...f,
      name_fr: draft.name_fr || f.name_fr,
      name_en: draft.name_en || f.name_en,
      description_fr: draft.description_fr || f.description_fr,
      prix: draft.prix || f.prix,
      ville: draft.ville || f.ville,
      categorie: draft.categorie || f.categorie,
    }));
  };

  const tips = useMemo(() => (isEn ? draft?.tipsEn : draft?.tipsFr) || [], [draft, isEn]);

  return (
    <section className="yai-panel yai-panel--business" aria-label="Yorix Business AI">
      <header className="yai-panel__head">
        <Sparkles size={18} aria-hidden className="yai-panel__ico" />
        <div>
          <div className="yai-panel__brand">Yorix Business AI</div>
          <div className="yai-panel__sub">
            {isEn
              ? "Draft listing — you validate before publish"
              : "Rédaction assistée — vous validez avant publication"}
          </div>
        </div>
      </header>

      <label className="yai-panel__label">
        {isEn ? "Product idea (optional)" : "Idée produit (optionnel)"}
        <input
          className="yai-panel__input"
          value={hint}
          onChange={(e) => setHint(e.target.value)}
          placeholder={isEn ? "e.g. iPhone 15 128GB Douala" : "ex. iPhone 15 128Go Douala"}
        />
      </label>

      <button type="button" className="yai-panel__btn" onClick={generate}>
        <Wand2 size={15} aria-hidden />
        {isEn ? "Generate draft" : "Générer la fiche"}
      </button>

      {draft && (
        <div className="yai-panel__result">
          <p className="yai-panel__preview-title">{draft.name_fr}</p>
          <p className="yai-panel__preview-desc">{draft.description_fr.slice(0, 220)}…</p>
          {draft.priceSuggestion && (
            <p className="yai-panel__meta">
              {isEn ? draft.priceSuggestion.rationaleEn : draft.priceSuggestion.rationaleFr}
              {" · "}
              <strong>{Number(draft.prix).toLocaleString(isEn ? "en-CM" : "fr-FR")} FCFA</strong>
            </p>
          )}
          <ul className="yai-panel__tips">
            {tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <button type="button" className="yai-panel__btn yai-panel__btn--apply" onClick={apply}>
            {isEn ? "Apply to form" : "Appliquer au formulaire"}
          </button>
        </div>
      )}
    </section>
  );
}
