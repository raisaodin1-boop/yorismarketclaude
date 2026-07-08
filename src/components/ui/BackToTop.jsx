import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Bouton retour en haut — spec homepage (discret, après ~2 scrolls) */
export function BackToTop({ threshold }) {
  const [visible, setVisible] = useState(false);
  const [resolvedThreshold, setResolvedThreshold] = useState(threshold ?? 480);

  useEffect(() => {
    if (threshold != null) {
      setResolvedThreshold(threshold);
      return undefined;
    }
    const compute = () => setResolvedThreshold(Math.max(320, Math.round(window.innerHeight * 0.85)));
    compute();
    window.addEventListener("resize", compute, { passive: true });
    return () => window.removeEventListener("resize", compute);
  }, [threshold]);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > resolvedThreshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [resolvedThreshold]);

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
