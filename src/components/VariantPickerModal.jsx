import { useState } from "react";
import { OptimizedImage } from "./OptimizedImage";
import { ProductVariantSelector } from "./ProductVariantSelector";

// Modal qui s'ouvre quand un produit à variantes est ajouté au panier
export function VariantPickerModal({ product, onConfirm, onClose }) {
  const [selected, setSelected] = useState(null);

  if (!product) return null;

  const effectivePrice = selected ? selected.prix : product.prix;
  const effectiveStock = selected ? selected.stock : product.stock;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Choisir une variante"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal variant-modal">
        {/* Header */}
        <div className="variant-modal__header">
          <div className="variant-modal__img">
            <OptimizedImage
              src={selected?.image_url || (product.image_urls?.[0]) || product.image}
              alt={product.name_fr}
              size="card"
              fallbackEmoji="📦"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="variant-modal__info">
            <div className="variant-modal__name">{product.name_fr}</div>
            <div className="variant-modal__price">
              {Number(effectivePrice).toLocaleString()}{" "}
              <span className="price-unit">FCFA</span>
            </div>
            {effectiveStock > 0 && effectiveStock <= 5 && (
              <div className="variant-modal__stock-warn">
                ⚠️ Plus que {effectiveStock} en stock
              </div>
            )}
          </div>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Fermer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Variant picker */}
        <div className="variant-modal__body">
          <ProductVariantSelector
            product={product}
            selectedVariantId={selected?.id}
            onSelect={setSelected}
          />
          {!selected && (
            <p className="variant-modal__hint">
              Sélectionnez une variante pour continuer
            </p>
          )}
        </div>

        {/* CTA */}
        <div className="variant-modal__footer">
          <button
            className="add-btn-full"
            disabled={!selected || effectiveStock <= 0}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: ".85rem",
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              background: selected && effectiveStock > 0 ? "var(--green)" : "var(--surface2)",
              color: selected && effectiveStock > 0 ? "#fff" : "var(--gray)",
              border: "none",
              borderRadius: 12,
              cursor: selected ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "all .2s",
            }}
            onClick={() => selected && onConfirm(selected)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
            </svg>
            {selected ? `Ajouter — ${Number(effectivePrice).toLocaleString()} FCFA` : "Choisir une variante"}
          </button>
        </div>
      </div>
    </div>
  );
}
