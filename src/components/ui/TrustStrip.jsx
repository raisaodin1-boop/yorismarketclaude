import { Shield, Truck, Smartphone, MessageCircle, Flag } from "lucide-react";
import "../conversion/conversion.css";

const DEFAULT_ITEMS = [
  { icon: Shield, label: "Paiement Escrow sécurisé" },
  { icon: Smartphone, label: "MTN MoMo & Orange Money" },
  { icon: Truck, label: "Livraison Douala · Yaoundé" },
  { icon: Flag, label: "Marketplace camerounaise" },
];

const CHECKOUT_ITEMS = [
  { icon: Shield, label: "Paiement Escrow sécurisé" },
  { icon: Smartphone, label: "MoMo & Orange Money" },
  { icon: Truck, label: "Livraison suivie" },
  { icon: MessageCircle, label: "Support WhatsApp 7j/7" },
];

/** Indicateurs de confiance unifiés (PDP, checkout, panier). */
export function TrustStrip({
  items,
  compact = false,
  variant = "default",
  className = "",
}) {
  const resolved =
    items ?? (variant === "checkout" ? CHECKOUT_ITEMS : DEFAULT_ITEMS);

  return (
    <div
      className={`trust-strip${compact ? " trust-strip--compact" : ""} ${className}`.trim()}
      role="note"
      aria-label="Garanties Yorix"
    >
      {resolved.map(({ icon: Icon, label }) => (
        <span key={label} className="trust-strip__item">
          <Icon size={14} strokeWidth={2.25} aria-hidden="true" style={{ color: "var(--green)" }} />
          {label}
        </span>
      ))}
    </div>
  );
}
