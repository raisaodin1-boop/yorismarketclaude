import { Shield, Smartphone, Truck, Flag } from "lucide-react";
import "./conversion.css";

const DEFAULT_ITEMS = [
  { icon: Shield, label: "Paiement Escrow sécurisé" },
  { icon: Smartphone, label: "MTN MoMo & Orange Money" },
  { icon: Truck, label: "Livraison Douala · Yaoundé" },
  { icon: Flag, label: "Marketplace camerounaise" },
];

export function TrustStrip({ items = DEFAULT_ITEMS, compact = false }) {
  return (
    <div className={`trust-strip${compact ? " trust-strip--compact" : ""}`} role="note">
      {items.map(({ icon: Icon, label }) => (
        <span key={label} className="trust-strip__item">
          <Icon size={14} strokeWidth={2.25} aria-hidden="true" style={{ color: "var(--green)" }} />
          {label}
        </span>
      ))}
    </div>
  );
}
