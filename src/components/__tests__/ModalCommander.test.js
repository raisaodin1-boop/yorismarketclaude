import React, { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createRoot } from "react-dom/client";
import { createCheckoutIntent, confirmCheckout } from "../../lib/checkoutApi";
import { showAppToast } from "../../lib/appToast";
import { creerCommandeSupabase } from "../../utils/helpers";
import { isCheckoutEdgeUnavailable, ModalCommander } from "../ModalCommander.jsx";

vi.mock("../../lib/checkoutApi", () => ({
  createCheckoutIntent: vi.fn(),
  confirmCheckout: vi.fn(),
}));

vi.mock("../../utils/helpers", () => ({
  creerCommandeSupabase: vi.fn(),
}));

vi.mock("../../lib/appToast", () => ({
  showAppToast: vi.fn(),
}));

describe("ModalCommander", () => {
  let root;
  let container;

  const product = {
    id: "product-1",
    name_fr: "Produit test",
    prix: 1000,
    vendeur_id: "seller-1",
    vendeur_nom: "Vendeur",
    ville: "Douala",
  };

  const user = { id: "buyer-1", email: "buyer@example.com" };
  const userData = { nom: "Amina", telephone: "690000000", ville: "Douala" };

  beforeEach(() => {
    vi.clearAllMocks();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(async () => {
    await act(async () => {
      root?.unmount();
    });
    container?.remove();
    root = null;
    container = null;
  });

  async function renderModal() {
    await act(async () => {
      root.render(
        React.createElement(ModalCommander, {
          product,
          user,
          userData,
          onClose: vi.fn(),
          onSuccess: vi.fn(),
        }),
      );
    });
  }

  async function submit() {
    const button = container.querySelector(".form-submit");
    await act(async () => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await Promise.resolve();
      await Promise.resolve();
    });
  }

  it("classifies edge transport errors as unavailable", () => {
    expect(isCheckoutEdgeUnavailable(new Error("Failed to send request"))).toBe(true);
    expect(isCheckoutEdgeUnavailable(new Error("Business validation failed"))).toBe(false);
  });

  it("uses the direct DB fallback only when checkout intent creation is unavailable", async () => {
    createCheckoutIntent.mockRejectedValueOnce(new Error("Failed to send request"));
    creerCommandeSupabase.mockResolvedValueOnce({ id: "order-1" });

    await renderModal();
    await submit();

    expect(creerCommandeSupabase).toHaveBeenCalledWith({
      product,
      clientNom: "Amina",
      telephone: "690000000",
      userId: "buyer-1",
    });
    expect(confirmCheckout).not.toHaveBeenCalled();
  });

  it("does not create a fallback order when checkout confirmation fails after an intent exists", async () => {
    createCheckoutIntent.mockResolvedValueOnce({ checkout_intent_id: "intent-1" });
    confirmCheckout.mockRejectedValueOnce(
      new Error("FunctionsHttpError: Edge Function returned a non-2xx status code"),
    );

    await renderModal();
    await submit();

    expect(confirmCheckout).toHaveBeenCalledWith({
      checkout_intent_id: "intent-1",
      payment_method: "whatsapp_backup",
      address: "Douala",
    });
    expect(creerCommandeSupabase).not.toHaveBeenCalled();
    expect(showAppToast).toHaveBeenCalledWith(
      expect.stringContaining("Erreur lors de la commande"),
      "error",
    );
  });
});
