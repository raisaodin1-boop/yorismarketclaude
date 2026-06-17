import { useEffect, useRef, useState } from "react";

/**
 * Thin top progress bar that animates on route changes.
 * Mount once in the app shell; call start()/done() imperatively,
 * or pass `active` prop for automatic control.
 */
export function PageProgressBar({ active }) {
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (active) {
      doneRef.current = false;
      setVisible(true);
      setWidth(0);

      // Rapid climb to 30%, then slow crawl to 85%
      requestAnimationFrame(() => {
        setWidth(30);
        timerRef.current = setInterval(() => {
          setWidth((w) => {
            if (w >= 85) { clearInterval(timerRef.current); return 85; }
            return w + (85 - w) * 0.06;
          });
        }, 300);
      });
    } else {
      clearInterval(timerRef.current);
      if (visible) {
        setWidth(100);
        const t = setTimeout(() => {
          setVisible(false);
          setWidth(0);
        }, 500);
        return () => clearTimeout(t);
      }
    }
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible) return null;

  return (
    <div
      className={`yx-page-bar${width >= 100 ? " yx-page-bar--done" : ""}`}
      style={{ width: `${width}%` }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(width)}
      aria-label="Chargement de la page"
    />
  );
}
