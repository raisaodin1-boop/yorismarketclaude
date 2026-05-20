import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { uploadSingleImage } from "../../utils/helpers";
import { filtrerMsg } from "../../lib/chatSecurity";

/**
 * Envoi d'une annonce générale à tous les utilisateurs Yorix (admin).
 */
export function AdminBroadcastPanel({ showToast }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [sending, setSending] = useState(false);
  const [history, setHistory] = useState([]);
  const [loadingHist, setLoadingHist] = useState(true);

  const loadHistory = async () => {
    setLoadingHist(true);
    const { data, error } = await supabase
      .from("yorix_broadcasts")
      .select("id, title, content, image_url, link_url, recipient_count, created_at")
      .order("created_at", { ascending: false })
      .limit(20);
    if (error) console.warn("broadcasts history:", error.message);
    setHistory(data || []);
    setLoadingHist(false);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const onImagePick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast?.("Image max 5 Mo", "error");
      return;
    }
    setUploading(true);
    try {
      const url = await uploadSingleImage(file);
      setImageUrl(url);
      showToast?.("Image ajoutée", "success");
    } catch (err) {
      showToast?.(err.message || "Échec upload", "error");
    }
    setUploading(false);
    e.target.value = "";
  };

  const sendBroadcast = async () => {
    const body = content.trim();
    if (body.length < 2) {
      showToast?.("Écrivez un message (min. 2 caractères)", "error");
      return;
    }

    const filtre = filtrerMsg(body);
    if (filtre.bloque) {
      showToast?.(filtre.raison || "Contenu non autorisé", "error");
      return;
    }

    if (linkUrl.trim()) {
      const lf = filtrerMsg(linkUrl);
      if (lf.bloque) {
        showToast?.("Lien non autorisé (pas de contact externe)", "error");
        return;
      }
    }

    setSending(true);
    try {
      const { data, error } = await supabase.rpc("fn_admin_broadcast_to_all", {
        p_title: title.trim() || null,
        p_content: body,
        p_image_url: imageUrl || null,
        p_link_url: linkUrl.trim() || null,
      });
      if (error) throw error;

      const n = data?.recipients ?? 0;
      showToast?.(`Annonce envoyée à ${n.toLocaleString("fr-FR")} utilisateur(s)`, "success");
      setTitle("");
      setContent("");
      setLinkUrl("");
      setImageUrl("");
      await loadHistory();
    } catch (err) {
      showToast?.(err.message || "Échec envoi", "error");
    }
    setSending(false);
  };

  return (
    <div className="admin-broadcast">
      <p className="admin-broadcast-intro">
        Message général visible dans la messagerie (« Yorix Équipe ») et dans les notifications de chaque
        membre. Les photos et liens https sont autorisés ; pas de numéros ni e-mails dans le texte.
      </p>

      <div className="admin-broadcast-grid">
        <div className="admin-broadcast-form">
          <label className="admin-broadcast-label">
            Titre (optionnel)
            <input
              type="text"
              className="admin-broadcast-input"
              placeholder="Ex. Promo livraison gratuite"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
            />
          </label>

          <label className="admin-broadcast-label">
            Message *
            <textarea
              className="admin-broadcast-textarea"
              rows={5}
              placeholder="Votre annonce à toute la communauté Yorix…"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={4000}
            />
          </label>

          <label className="admin-broadcast-label">
            Lien officiel (https, optionnel)
            <input
              type="url"
              className="admin-broadcast-input"
              placeholder="https://yorix.cm/…"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
          </label>

          <div className="admin-broadcast-media">
            <label className="admin-broadcast-upload-btn">
              {uploading ? "Envoi…" : "📷 Ajouter une photo"}
              <input type="file" accept="image/*" hidden onChange={onImagePick} disabled={uploading} />
            </label>
            {imageUrl && (
              <div className="admin-broadcast-preview">
                <img src={imageUrl} alt="" />
                <button type="button" className="admin-broadcast-remove-img" onClick={() => setImageUrl("")}>
                  Retirer
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            className="admin-broadcast-send"
            onClick={sendBroadcast}
            disabled={sending || uploading}
          >
            {sending ? "Diffusion en cours…" : "📣 Envoyer à tous les utilisateurs"}
          </button>
        </div>

        <div className="admin-broadcast-preview-panel">
          <div className="admin-broadcast-preview-title">Aperçu mobile</div>
          <div className="msg-bubble msg-bubble--system">
            <div className="msg-bubble-meta">
              <span className="msg-bubble-name">Yorix Équipe</span>
              <span className="msg-bubble-time">Maintenant</span>
            </div>
            {title.trim() && <strong className="msg-system-title">{title.trim()}</strong>}
            <p className="msg-bubble-text">{content.trim() || "Votre message apparaîtra ici…"}</p>
            {imageUrl && <img src={imageUrl} alt="" className="msg-bubble-img" />}
            {linkUrl.trim() && (
              <span className="msg-bubble-cta">Ouvrir le lien →</span>
            )}
          </div>
        </div>
      </div>

      <div className="admin-broadcast-history">
        <h3 className="admin-section-title">Historique des annonces</h3>
        {loadingHist ? (
          <p className="admin-broadcast-muted">Chargement…</p>
        ) : history.length === 0 ? (
          <p className="admin-broadcast-muted">Aucune annonce pour le moment.</p>
        ) : (
          <ul className="admin-broadcast-list">
            {history.map((b) => (
              <li key={b.id} className="admin-broadcast-list-item">
                <div className="admin-broadcast-list-head">
                  <strong>{b.title || "Annonce Yorix"}</strong>
                  <span>{new Date(b.created_at).toLocaleString("fr-FR")}</span>
                </div>
                <p>{(b.content || "").slice(0, 200)}{(b.content || "").length > 200 ? "…" : ""}</p>
                <span className="admin-broadcast-muted">
                  {b.recipient_count?.toLocaleString("fr-FR") || 0} destinataires
                  {b.image_url ? " · 📷" : ""}
                  {b.link_url ? " · 🔗" : ""}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
