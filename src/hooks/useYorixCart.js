import { useState, useEffect, useMemo, useCallback } from "react";
import {
  loadCart,
  saveCart,
  makeProductCartItem,
  makeServiceCartItem,
  upsertCartItem,
  updateCartQty,
  removeCartItem,
  computeCartSummary,
} from "../domain/cartDomain";
/**
 * Panier persistant (localStorage) + totaux (frais livraison selon politique commerce).
 */
export function useYorixCart(commerceDeliveryPolicy) {
  const [cartItems, setCartItems] = useState(() => loadCart());

  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  const addToCart = useCallback((p) => {
    const cartItem = makeProductCartItem(p);
    if (!cartItem) return;
    setCartItems((prev) => upsertCartItem(prev, cartItem));
  }, []);

  const addServiceToCart = useCallback((service) => {
    const cartItem = makeServiceCartItem(service);
    if (!cartItem) return;
    setCartItems((prev) => upsertCartItem(prev, cartItem));
  }, []);

  const changeQty = useCallback((id, d, kind = null) => {
    setCartItems((prev) => updateCartQty(prev, id, kind, d));
  }, []);

  const removeItem = useCallback((id, kind = null) => {
    setCartItems((prev) => removeCartItem(prev, id, kind));
  }, []);

  const cartSummary = useMemo(
    () => computeCartSummary(cartItems, commerceDeliveryPolicy),
    [cartItems, commerceDeliveryPolicy],
  );
  const totalQty = cartSummary.qty;

  return {
    cartItems,
    setCartItems,
    addToCart,
    addServiceToCart,
    changeQty,
    removeItem,
    cartSummary,
    totalQty,
  };
}
