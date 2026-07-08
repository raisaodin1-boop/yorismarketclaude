import { useEffect, useState } from "react";

/** Compteur animé pour barre de confiance (spec homepage). */
export function useCountUp(target, active, durationMs = 1500) {
  const goal = Math.max(0, Number(target) || 0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return undefined;
    }
    if (goal === 0) {
      setValue(0);
      return undefined;
    }

    const start = performance.now();
    let frame;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - (1 - t) ** 3;
      setValue(Math.round(goal * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [goal, active, durationMs]);

  return value;
}
