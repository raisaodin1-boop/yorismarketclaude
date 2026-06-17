import { useCallback, useEffect, useState } from "react";

const ICONS = {
  error:   "✕",
  warning: "!",
  success: "✓",
  info:    "i",
};

/** Modern toast with auto-dismiss progress bar. */
export function YorixToast({ toast, onClose }) {
  const duration = toast?.duration ?? 4500;

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(t);
  }, [toast, onClose, duration]);

  if (!toast) return null;

  const type = toast.type || "info";

  return (
    <div
      className={`yorix-toast yorix-toast--${type}`}
      role="alert"
      aria-live="polite"
    >
      <span className={`yorix-toast__icon yorix-toast__icon--${type}`} aria-hidden>
        {ICONS[type] ?? "i"}
      </span>
      <span className="yorix-toast__msg">{toast.msg}</span>
      <button type="button" className="yorix-toast__close" onClick={onClose} aria-label="Fermer">
        ×
      </button>
      {/* Progress bar depletes over the duration */}
      <div
        className="yorix-toast__bar"
        style={{ animationDuration: `${duration}ms` }}
        aria-hidden
      />
    </div>
  );
}

export function useYorixToast() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg, type = "error", duration) => {
    setToast({ msg, type, duration });
  }, []);

  const clearToast = useCallback(() => setToast(null), []);

  return { toast, showToast, clearToast };
}
