import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────
// COMPOSANT : COMPTE À REBOURS OFFRE FLASH
// ─────────────────────────────────────────────────────────────
export function FlashCountdown() {
  const getSecondsLeft = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(23, 59, 59, 999);
    return Math.floor((midnight - now) / 1000);
  };
  const [secs, setSecs] = useState(getSecondsLeft);
  useEffect(() => {
    const t = setInterval(() => setSecs(s => s > 0 ? s - 1 : getSecondsLeft()), 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return (
    <div style={{display:"flex",gap:4,alignItems:"center"}}>
      {[h,m,s].map((v,i) => (
        <span key={i} style={{display:"flex",alignItems:"center",gap:4}}>
          <span style={{background:"var(--red)",color:"#fff",padding:"2px 7px",borderRadius:5,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:".82rem",minWidth:30,textAlign:"center"}}>{v}</span>
          {i < 2 && <span style={{fontWeight:800,color:"var(--red)",fontSize:".82rem"}}>:</span>}
        </span>
      ))}
    </div>
  );
}
