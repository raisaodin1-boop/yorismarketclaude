import { useState, useEffect, useMemo } from "react";
import { maskPIIForDisplay } from "../lib/chatSecurity";
import { sanitizeChatDisplayText } from "../lib/chatMessages";
import { translateChatText, chatViewerLang } from "../lib/chatTranslate";

const URL_RE = /(https?:\/\/[^\s<]+[^\s<.,;:!?)}\]'"])/gi;

function safeHref(url) {
  try {
    const u = new URL(url);
    if (u.protocol === "http:" || u.protocol === "https:") return u.href;
  } catch {
    /* ignore */
  }
  return null;
}

function splitTextParts(text) {
  const parts = [];
  if (!text) return parts;

  let last = 0;
  const re = new RegExp(URL_RE.source, URL_RE.flags);
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push({ type: "text", value: text.slice(last, m.index) });
    parts.push({ type: "link", value: m[0] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ type: "text", value: text.slice(last) });
  if (parts.length === 0) parts.push({ type: "text", value: text });
  return parts;
}

function TextParts({ parts }) {
  return (
    <>
      {parts.map((p, i) => {
        if (p.type === "link") {
          const href = safeHref(p.value);
          if (!href) return <span key={i}>{p.value}</span>;
          return (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="msg-inline-link">
              {p.value}
            </a>
          );
        }
        return <span key={i}>{p.value}</span>;
      })}
    </>
  );
}

/**
 * Corps de message : texte masqué, liens cliquables, image, traduction FR↔EN.
 */
export function ChatMessageBody({
  content,
  imageUrl,
  linkUrl,
  revealPII = false,
  viewerLocale = "fr",
  autoTranslate = false,
  openLinkLabel = "Ouvrir le lien →",
  translatedLabel = "Traduction",
  showOriginalLabel = "Original",
  translatingLabel = "Traduction…",
}) {
  let raw = content || "";
  if (imageUrl) raw = sanitizeChatDisplayText(raw);
  const text = maskPIIForDisplay(raw, { reveal: revealPII });
  const targetLang = chatViewerLang(viewerLocale);

  const [translation, setTranslation] = useState(null);
  const [showOriginal, setShowOriginal] = useState(false);
  const [translating, setTranslating] = useState(false);

  useEffect(() => {
    setTranslation(null);
    setShowOriginal(false);
    if (!autoTranslate || !text || text.trim().length < 2) {
      setTranslating(false);
      return undefined;
    }

    let cancelled = false;
    setTranslating(true);
    translateChatText(text, targetLang)
      .then((tr) => {
        if (!cancelled) {
          setTranslation(tr);
          setTranslating(false);
        }
      })
      .catch(() => {
        if (!cancelled) setTranslating(false);
      });

    return () => {
      cancelled = true;
    };
  }, [text, autoTranslate, targetLang]);

  const displayText =
    autoTranslate && translation && !showOriginal ? translation : text;
  const parts = useMemo(() => splitTextParts(displayText), [displayText]);
  const officialLink = linkUrl ? safeHref(linkUrl) : null;
  const canToggleTranslation = autoTranslate && translation && translation !== text;

  return (
    <div className="msg-bubble-body">
      {imageUrl && (
        <a
          href={imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="msg-bubble-img-wrap"
        >
          <img src={imageUrl} alt="" className="msg-bubble-img" loading="lazy" />
        </a>
      )}
      {canToggleTranslation && (
        <div className="msg-translate-bar">
          <span className="msg-translate-badge">{translatedLabel}</span>
          <button
            type="button"
            className="msg-translate-toggle"
            onClick={() => setShowOriginal((v) => !v)}
          >
            {showOriginal ? translatedLabel : showOriginalLabel}
          </button>
        </div>
      )}
      {translating && autoTranslate && text && (
        <span className="msg-translate-pending">{translatingLabel}</span>
      )}
      {parts.length > 0 && (
        <p className="msg-bubble-text">
          <TextParts parts={parts} />
        </p>
      )}
      {officialLink && (
        <a href={officialLink} target="_blank" rel="noopener noreferrer" className="msg-bubble-cta">
          {openLinkLabel}
        </a>
      )}
    </div>
  );
}
