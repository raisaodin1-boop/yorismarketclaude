import "./conversion.css";

const DEFAULT_ITEMS = [
  { icon: "🔐", label: "Paiement Escrow sécurisé" },
  { icon: "📱", label: "MTN MoMo & Orange Money" },
  { icon: "🚚", label: "Livraison Douala · Yaoundé" },
  { icon: "🇨🇲", label: "Marketplace camerounaise" },
];

export function TrustStrip({ items = DEFAULT_ITEMS, compact = false }) {
  return (
    <div className={`trust-strip${compact ? " trust-strip--compact" : ""}`} role="note">
      {items.map((it) => (
        <span key={it.label} className="trust-strip__item">
          <span aria-hidden>{it.icon}</span>
          {it.label}
        </span>
      ))}
    </div>
  );
}
