import { useState } from "react";

// Sélecteur de variantes affiché sur la fiche produit et dans ProdGrid
export function ProductVariantSelector({ product, onSelect, selectedVariantId }) {
  if (!product?.has_variants || !Array.isArray(product.variants) || product.variants.length === 0) {
    return null;
  }

  return (
    <div className="variant-selector">
      <div className="variant-selector__label">
        Choisir une variante <span className="variant-selector__required">*</span>
      </div>
      <div className="variant-selector__grid">
        {product.variants.map((v) => {
          const active = selectedVariantId === v.id;
          const outOfStock = v.stock <= 0;
          return (
            <button
              key={v.id}
              type="button"
              className={`variant-chip${active ? " variant-chip--active" : ""}${outOfStock ? " variant-chip--sold-out" : ""}`}
              onClick={() => !outOfStock && onSelect(v)}
              disabled={outOfStock}
              aria-pressed={active}
              title={outOfStock ? "Rupture de stock" : v.label}
            >
              {v.image_url && (
                <img
                  src={v.image_url}
                  alt={v.label}
                  className="variant-chip__img"
                />
              )}
              <span className="variant-chip__label">{v.label}</span>
              {v.prix !== product.prix && (
                <span className="variant-chip__price">
                  {Number(v.prix).toLocaleString()} F
                </span>
              )}
              {outOfStock && <span className="variant-chip__oos">Épuisé</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
