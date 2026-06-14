// @vitest-environment node

import { Buffer } from "node:buffer";
import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { transform } from "esbuild";

async function loadConfirmCheckoutHandler() {
  const source = readFileSync(
    new URL("../../../supabase/functions/confirm_checkout/index.ts", import.meta.url),
    "utf8",
  );
  const patched = source
    .replace(
      'import { createClient } from "https://esm.sh/@supabase/supabase-js@2";',
      "const createClient = globalThis.__confirmCheckoutMocks.createClient;",
    )
    .replace(
      'import { corsHeaders, ok } from "../_shared/cors.ts";',
      "const { corsHeaders, ok } = globalThis.__confirmCheckoutMocks;",
    )
    .replace(
      'import { applyCatalogPricing } from "../_shared/catalog_prices.ts";',
      "const { applyCatalogPricing } = globalThis.__confirmCheckoutMocks;",
    )
    .replace(
      'import { insertAutoDelivery } from "../_shared/delivery_auto.ts";',
      "const { insertAutoDelivery } = globalThis.__confirmCheckoutMocks;",
    )
    .replace(
      'import { computeCheckoutTotals, resolveDeliveryPolicy } from "../_shared/delivery_policy.ts";',
      "const { computeCheckoutTotals, resolveDeliveryPolicy } = globalThis.__confirmCheckoutMocks;",
    )
    .replace(
      'import { dispatchNotificationById } from "../_shared/internal_dispatch.ts";',
      "const { dispatchNotificationById } = globalThis.__confirmCheckoutMocks;",
    )
    .replace(
      "Deno.serve(async (req) => {",
      "globalThis.__confirmCheckoutHandler = async (req) => {",
    )
    .replace(/\n\}\);\s*$/, "\n};");

  const { code } = await transform(patched, {
    loader: "ts",
    format: "esm",
    target: "es2020",
  });
  await import(
    `data:text/javascript;base64,${Buffer.from(code).toString("base64")}#${Date.now()}`
  );
  return globalThis.__confirmCheckoutHandler;
}

describe("confirm_checkout Edge Function", () => {
  it("fails closed and cleans up when the stock reservation RPC rejects", async () => {
    const calls = [];
    const checkoutIntentId = "123e4567-e89b-12d3-a456-426614174000";
    const productId = "223e4567-e89b-12d3-a456-426614174000";
    const orderId = "323e4567-e89b-12d3-a456-426614174000";
    const insertAutoDelivery = vi.fn();

    const supabase = {
      from(table) {
        return {
          select(columns) {
            calls.push({ type: "select", table, columns });
            return {
              eq(column, value) {
                calls.push({ type: "select_eq", table, column, value });
                return {
                  async maybeSingle() {
                    return {
                      data: {
                        id: checkoutIntentId,
                        payload: {
                          customer: { id: null, nom: "Client", telephone: "690000000" },
                          items: [{ id: productId, kind: "product", qty: 1, price: 1000 }],
                        },
                        subtotal: 1000,
                        delivery_fee: 0,
                        total: 1000,
                      },
                      error: null,
                    };
                  },
                };
              },
              async in(column, values) {
                calls.push({ type: "select_in", table, column, values });
                return { data: [{ id: productId, vendeur_id: "seller-1" }], error: null };
              },
            };
          },
          insert(row) {
            calls.push({ type: "insert", table, row });
            if (table === "orders") {
              return {
                select() {
                  return {
                    async single() {
                      return { data: { id: orderId }, error: null };
                    },
                  };
                },
              };
            }
            if (table === "notifications") {
              return {
                select() {
                  return {
                    async maybeSingle() {
                      return { data: { id: "notification-1" }, error: null };
                    },
                  };
                },
              };
            }
            return Promise.resolve({ data: null, error: null });
          },
          delete() {
            calls.push({ type: "delete", table });
            return {
              async eq(column, value) {
                calls.push({ type: "delete_eq", table, column, value });
                return { data: null, error: null };
              },
            };
          },
          update(row) {
            calls.push({ type: "update", table, row });
            return {
              async eq(column, value) {
                calls.push({ type: "update_eq", table, column, value });
                return { data: null, error: null };
              },
            };
          },
        };
      },
      async rpc(name, args) {
        calls.push({ type: "rpc", name, args });
        return { data: null, error: { message: "stock insuffisant" } };
      },
    };

    globalThis.__confirmCheckoutMocks = {
      createClient: () => supabase,
      corsHeaders: {},
      ok: (body, init = {}) =>
        new Response(JSON.stringify(body), {
          status: init.status || 200,
          headers: { "Content-Type": "application/json" },
        }),
      applyCatalogPricing: vi.fn(async () => ({
        lines: [{ id: productId, kind: "product", qty: 1, price: 1000, fulfillmentMode: "delivery" }],
      })),
      computeCheckoutTotals: vi.fn(() => ({
        subtotalFull: 1000,
        deliveryFee: 0,
        total: 1000,
      })),
      resolveDeliveryPolicy: vi.fn(async () => ({})),
      dispatchNotificationById: vi.fn(async () => ({ ok: true })),
      insertAutoDelivery,
    };

    const handler = await loadConfirmCheckoutHandler();
    const response = await handler(
      new Request("https://edge.test/confirm_checkout", {
        method: "POST",
        body: JSON.stringify({
          checkout_intent_id: checkoutIntentId,
          payment_method: "whatsapp_backup",
        }),
      }),
    );

    await expect(response.json()).resolves.toMatchObject({
      error: expect.stringContaining("stock decrement failed"),
    });
    expect(response.status).toBe(500);
    expect(calls).toContainEqual({ type: "delete_eq", table: "order_items", column: "order_id", value: orderId });
    expect(calls).toContainEqual({ type: "delete_eq", table: "orders", column: "id", value: orderId });
    expect(calls.some((call) => call.type === "insert" && call.table === "notifications")).toBe(false);
    expect(insertAutoDelivery).not.toHaveBeenCalled();

    delete globalThis.__confirmCheckoutMocks;
    delete globalThis.__confirmCheckoutHandler;
  });
});
