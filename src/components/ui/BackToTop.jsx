import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Bouton retour en haut — bonus UX mobile & desktop */
export function BackToTop({ threshold = 400 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return (
    <button
      type="button"
      className={`yx-back-to-top${visible ? " is-visible" : ""}`}
      aria-label="Retour en haut de page"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp className="yx-icon yx-icon--md" aria-hidden="true" />
    </button>
  );
}
