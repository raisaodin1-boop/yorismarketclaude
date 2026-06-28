import { useEffect, useState } from "react";

/** Fine barre de progression de lecture — bonus UX */
export function ScrollProgress() {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      setScale(height > 0 ? scrollTop / height : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="yx-scroll-progress"
      aria-hidden="true"
      style={{ transform: `scaleX(${scale})`, width: "100%" }}
    />
  );
}
