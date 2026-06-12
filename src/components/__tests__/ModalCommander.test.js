import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createCheckoutIntent: vi.fn(),
  confirmCheckout: vi.fn(),
  showAppToast: vi.fn(),
}));

vi.mock("../../lib/checkoutApi", () => ({
  createCheckoutIntent: mocks.createCheckoutIntent,
  confirmCheckout: mocks.confirmCheckout,
}));

vi.mock("../../lib/appToast", () => ({
  showAppToast: mocks.showAppToast,
}));

const { ModalCommander } = await import("../ModalCommander.jsx");

describe("ModalCommander", () => {
  let container;
  let root;
  let consoleError;
  let consoleWarn;

  beforeEach(() => {
    vi.clearAllMocks();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    consoleError.mockRestore();
    consoleWarn.mockRestore();
  });

  it("fails closed when checkout Edge Functions are unavailable", async () => {
    mocks.createCheckoutIntent.mockRejectedValueOnce(
      new Error("Failed to send a request to Edge Function"),
    );

    await act(async () => {
      root.render(
        React.createElement(ModalCommander, {
          product: {
            id: "product-1",
            name_fr: "Produit test",
            prix: 1000,
            vendeur_id: "seller-1",
            ville: "Douala",
          },
          user: { id: "buyer-1", email: "buyer@example.com" },
          userData: { nom: "Buyer", telephone: "690000000", ville: "Douala" },
          onClose: vi.fn(),
          onSuccess: vi.fn(),
        }),
      );
    });

    await act(async () => {
      container
        .querySelector(".form-submit")
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(mocks.createCheckoutIntent).toHaveBeenCalledOnce();
    expect(mocks.confirmCheckout).not.toHaveBeenCalled();
    expect(mocks.showAppToast).toHaveBeenCalledWith(
      "Commande indisponible pour le moment. Réessayez dans quelques instants.",
      "error",
    );
    expect(container.textContent).not.toContain("Commande créée avec succès");
  });
});
