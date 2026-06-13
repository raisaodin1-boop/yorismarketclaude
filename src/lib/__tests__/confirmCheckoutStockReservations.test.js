import { describe, expect, it } from "vitest";

import {
  collectProductStockReservations,
  stockUnavailablePayload,
} from "../../../supabase/functions/confirm_checkout/stock_reservations.ts";

describe("confirm checkout stock reservations", () => {
  it("aggregates only product quantities for the bulk stock RPC", () => {
    expect(
      collectProductStockReservations([
        { id: "p1", kind: "product", qty: 2 },
        { id: "svc1", kind: "service", qty: 99 },
        { id: "p1", kind: "product", qty: 3 },
        { id: "p2", qty: 1 },
      ]),
    ).toEqual([
      { product_id: "p1", qty: 5 },
      { product_id: "p2", qty: 1 },
    ]);
  });

  it("normalizes malformed checkout quantities before stock decrement", () => {
    expect(
      collectProductStockReservations([
        { id: "p1", kind: "product", qty: "not-a-number" },
        { id: "p2", kind: "product", qty: 0 },
        { id: "p3", kind: "product", qty: 2.9 },
      ]),
    ).toEqual([
      { product_id: "p1", qty: 1 },
      { product_id: "p2", qty: 1 },
      { product_id: "p3", qty: 2 },
    ]);
  });

  it("returns a client-safe stock failure payload", () => {
    expect(stockUnavailablePayload("available: 0", "p1")).toEqual({
      error: "Stock insuffisant pour finaliser cette commande.",
      code: "stock_unavailable",
      product_id: "p1",
      details: "available: 0",
    });
  });
});
