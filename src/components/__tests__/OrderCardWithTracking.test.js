import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { OrderCardWithTracking } from "../OrderCardWithTracking.jsx";

vi.mock("../../lib/supabase", () => {
  const createQuery = () => {
    const query = {};
    query.select = vi.fn(() => query);
    query.eq = vi.fn(() => query);
    query.order = vi.fn(() => Promise.resolve({ data: [] }));
    query.in = vi.fn(() => Promise.resolve({ data: [] }));
    query.maybeSingle = vi.fn(() => Promise.resolve({ data: null }));
    return query;
  };

  return {
    supabase: {
      from: vi.fn(() => createQuery()),
    },
  };
});

const ORDER = {
  id: "00000000-0000-0000-0000-123456789abc",
  montant: 12500,
  status: "pending",
  escrow_status: "pending",
  created_at: "2026-07-18T10:00:00.000Z",
};

describe("OrderCardWithTracking", () => {
  let container;
  let root;

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
  });

  it("keeps the order detail dismissed when its close button is clicked", async () => {
    await act(async () => {
      root.render(<OrderCardWithTracking commande={ORDER} goPage={vi.fn()} />);
    });

    await act(async () => {
      container
        .querySelector('[role="button"]')
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelector('[role="dialog"]')).not.toBeNull();

    await act(async () => {
      container
        .querySelector('[aria-label="Fermer"]')
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.querySelector('[role="dialog"]')).toBeNull();
  });

  it("keeps the order detail dismissed when its backdrop is clicked", async () => {
    await act(async () => {
      root.render(<OrderCardWithTracking commande={ORDER} goPage={vi.fn()} />);
    });

    await act(async () => {
      container
        .querySelector('[role="button"]')
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    await act(async () => {
      container
        .querySelector(".modal-overlay")
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.querySelector('[role="dialog"]')).toBeNull();
  });
});
