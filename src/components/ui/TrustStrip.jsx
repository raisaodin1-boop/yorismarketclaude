import { Shield, Truck, Smartphone, MessageCircle } from "lucide-react";

const DEFAULT_ITEMS = [
  { icon: Shield, label: "Paiement Escrow sécurisé" },
  { icon: Smartphone, label: "MoMo & Orange Money" },
  { icon: Truck, label: "Livraison suivie" },
  { icon: MessageCircle, label: "Support WhatsApp 7j/7" },
];

/** Indicateurs de confiance — affichage uniquement, sans logique métier. */
export function TrustStrip({ items = DEFAULT_ITEMS, className = "" }) {
  return (
    <div className={`yx-trust-strip ${className}`.trim()} role="list" aria-label="Garanties Yorix">
      {items.map(({ icon: Icon, label }) => (
        <div key={label} className="yx-trust-item" role="listitem">
          <Icon className="yx-icon yx-icon--sm" aria-hidden="true" style={{ color: "var(--green)" }} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
