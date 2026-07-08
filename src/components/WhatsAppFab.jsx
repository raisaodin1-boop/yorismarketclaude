import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { YORIX_WA_NUMBER } from "../lib/supabase";

const DEFAULT_MSG = "Bonjour Yorix ! Je veux passer commande 🛍️";

export function WhatsAppFab({ message = DEFAULT_MSG }) {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    let idleTimer;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY + 8 && y > 120) setVisible(false);
      else if (y < lastY - 8) setVisible(true);
      setLastY(y);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setVisible(true), 2400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(idleTimer);
    };
  }, [lastY]);

  return (
    <a
      href={`https://wa.me/${YORIX_WA_NUMBER}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter Yorix sur WhatsApp"
      className={`yorix-wa-fab${visible ? "" : " yorix-wa-fab--hidden"}`}
      style={{ position: "relative" }}
    >
      <span
        aria-hidden="true"
        className="yorix-wa-fab__pulse"
      />
      <MessageCircle className="yx-icon yx-icon--lg" aria-hidden="true" />
    </a>
  );
}
