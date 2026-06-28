import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  Search,
  Home,
  ShoppingBag,
  ShoppingCart,
  Truck,
  Users,
  HelpCircle,
  Mail,
  Package,
  ArrowRight,
} from "lucide-react";
import { filterProductsBySearch, normalizeSearchText } from "../lib/productSearch";
import "./commandPalette.css";

const QUICK_ACTIONS = [
  { id: "home", page: "home", icon: Home, labelFr: "Accueil", labelEn: "Home" },
  { id: "produits", page: "produits", icon: ShoppingBag, labelFr: "Catalogue produits", labelEn: "Product catalog" },
  { id: "cart", page: "cart", icon: ShoppingCart, labelFr: "Panier", labelEn: "Cart" },
  { id: "livraison", page: "livraison", icon: Truck, labelFr: "Livraison", labelEn: "Delivery" },
  { id: "prestataires", page: "prestataires", icon: Users, labelFr: "Prestataires", labelEn: "Service providers" },
  { id: "aide", page: "aide", icon: HelpCircle, labelFr: "Centre d'aide", labelEn: "Help center" },
  { id: "contact", page: "contact", icon: Mail, labelFr: "Contact", labelEn: "Contact" },
];

/**
 * Palette de commande globale (⌘K / Ctrl+K).
 */
export function CommandPalette({
  open,
  onClose,
  produits = [],
  siteLocale = "fr",
  goPage,
  onOpenProduct,
  setSearch,
}) {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const en = siteLocale === "en";
  const localeTag = en ? "en-CM" : "fr-CM";

  const filteredProducts = useMemo(
    () => filterProductsBySearch(produits, query, 8),
    [produits, query],
  );

  const filteredActions = useMemo(() => {
    const q = normalizeSearchText(query.trim());
    if (!q) return QUICK_ACTIONS;
    return QUICK_ACTIONS.filter((a) => {
      const label = en ? a.labelEn : a.labelFr;
      return normalizeSearchText(label).includes(q) || normalizeSearchText(a.page).includes(q);
    });
  }, [query, en]);

  const items = useMemo(() => {
    const list = [];
    filteredActions.forEach((a) => list.push({ type: "action", data: a }));
    filteredProducts.forEach((p) => list.push({ type: "product", data: p }));
    return list;
  }, [filteredActions, filteredProducts]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIdx(0);
      return;
    }
    const t = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(t);
  }, [open]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const runItem = useCallback(
    (item) => {
      if (!item) return;
      onClose();
      if (item.type === "action") {
        goPage?.(item.data.page);
        return;
      }
      if (item.type === "product") {
        onOpenProduct?.(item.data);
      }
    },
    [goPage, onClose, onOpenProduct],
  );

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, Math.max(0, items.length - 1)));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (items[activeIdx]) {
        runItem(items[activeIdx]);
      } else if (query.trim()) {
        onClose();
        setSearch?.(query.trim());
        goPage?.("produits");
      }
    }
  };

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-cmd-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  if (!open) return null;

  const shortcutLabel =
    typeof navigator !== "undefined" && /Mac|iPhone|iPad/i.test(navigator.platform)
      ? "⌘K"
      : "Ctrl+K";

  return createPortal(
    <div
      className="cmd-palette-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="cmd-palette"
        role="dialog"
        aria-modal="true"
        aria-label={en ? "Command palette" : "Palette de commande"}
        onKeyDown={onKeyDown}
      >
        <div className="cmd-palette-head">
          <Search size={18} strokeWidth={2.25} aria-hidden className="cmd-palette-search-icon" />
          <input
            ref={inputRef}
            type="search"
            className="cmd-palette-input"
            placeholder={en ? "Search products, pages…" : "Rechercher produits, pages…"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            aria-autocomplete="list"
            aria-controls="cmd-palette-list"
          />
          <kbd className="cmd-palette-kbd" aria-hidden>
            {shortcutLabel}
          </kbd>
        </div>

        <div id="cmd-palette-list" className="cmd-palette-body" ref={listRef} role="listbox">
          {items.length === 0 && query.trim().length >= 2 && (
            <div className="cmd-palette-empty">
              {en ? `No results for “${query}”` : `Aucun résultat pour « ${query} »`}
              <button
                type="button"
                className="cmd-palette-empty-btn"
                onClick={() => {
                  onClose();
                  setSearch?.(query.trim());
                  goPage?.("produits");
                }}
              >
                {en ? "Search in catalog" : "Chercher dans le catalogue"}
                <ArrowRight size={14} aria-hidden />
              </button>
            </div>
          )}

          {filteredActions.length > 0 && (
            <div className="cmd-palette-section">
              <div className="cmd-palette-section-title">
                {en ? "Pages" : "Pages"}
              </div>
              {filteredActions.map((a) => {
                const idx = items.findIndex((it) => it.type === "action" && it.data.id === a.id);
                const Icon = a.icon;
                return (
                  <button
                    key={a.id}
                    type="button"
                    role="option"
                    aria-selected={idx === activeIdx}
                    data-cmd-idx={idx}
                    className={`cmd-palette-item${idx === activeIdx ? " is-active" : ""}`}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => runItem({ type: "action", data: a })}
                  >
                    <span className="cmd-palette-item-icon">
                      <Icon size={16} strokeWidth={2.25} aria-hidden />
                    </span>
                    <span className="cmd-palette-item-label">{en ? a.labelEn : a.labelFr}</span>
                    <ArrowRight size={14} className="cmd-palette-item-arrow" aria-hidden />
                  </button>
                );
              })}
            </div>
          )}

          {filteredProducts.length > 0 && (
            <div className="cmd-palette-section">
              <div className="cmd-palette-section-title">
                {en ? "Products" : "Produits"}
              </div>
              {filteredProducts.map((p) => {
                const idx = items.findIndex((it) => it.type === "product" && it.data.id === p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="option"
                    aria-selected={idx === activeIdx}
                    data-cmd-idx={idx}
                    className={`cmd-palette-item cmd-palette-item--product${idx === activeIdx ? " is-active" : ""}`}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => runItem({ type: "product", data: p })}
                  >
                    {p.image ? (
                      <img src={p.image} alt="" className="cmd-palette-thumb" />
                    ) : (
                      <span className="cmd-palette-item-icon">
                        <Package size={16} strokeWidth={2.25} aria-hidden />
                      </span>
                    )}
                    <span className="cmd-palette-item-label">
                      <span className="cmd-palette-prod-name">{p.name_fr}</span>
                      <span className="cmd-palette-prod-price">
                        {p.prix?.toLocaleString(localeTag)} FCFA
                      </span>
                    </span>
                    <ArrowRight size={14} className="cmd-palette-item-arrow" aria-hidden />
                  </button>
                );
              })}
            </div>
          )}

          {items.length === 0 && query.trim().length < 2 && (
            <div className="cmd-palette-hint">
              {en
                ? "Type to search — navigate with ↑↓, open with Enter"
                : "Tapez pour chercher — naviguez avec ↑↓, ouvrez avec Entrée"}
            </div>
          )}
        </div>

        <div className="cmd-palette-foot">
          <span>
            <kbd>↑↓</kbd> {en ? "navigate" : "naviguer"}
          </span>
          <span>
            <kbd>↵</kbd> {en ? "open" : "ouvrir"}
          </span>
          <span>
            <kbd>esc</kbd> {en ? "close" : "fermer"}
          </span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
