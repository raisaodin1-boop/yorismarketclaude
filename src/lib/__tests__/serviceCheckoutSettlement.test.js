/**
 * @vitest-environment node
 *
 * Régression : un checkout service-only (ou mixte) créait seulement
 * `service_bookings` sans ligne `orders` liée à `order_group_id`.
 * MoMo/CinetPay ne règlent que `orders` → paiement encaissé, réservation
 * orpheline, et `checkout_return_status` 404 (« Aucune commande »).
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { transform } from "esbuild";
import { describe, expect, it } from "vitest";

const confirmPath = fileURLToPath(
  new URL("../../../supabase/functions/confirm_checkout/index.ts", import.meta.url),
);
const returnPath = fileURLToPath(
  new URL("../../../supabase/functions/checkout_return_status/index.ts", import.meta.url),
);
const webhookPath = fileURLToPath(
  new URL("../../../supabase/functions/webhook_cinetpay/index.ts", import.meta.url),
);
const momoStatusPath = fileURLToPath(
  new URL("../../../api/momo-status.js", import.meta.url),
);
const b2bMigrationPath = fileURLToPath(
  new URL(
    "../../../supabase/migrations/20260804110000_lock_b2b_quote_direct_updates.sql",
    import.meta.url,
  ),
);

function serviceBranch(source) {
  const start = source.indexOf('if (item.kind === "service")');
  expect(start).toBeGreaterThan(-1);
  const cont = source.indexOf("continue;", start);
  expect(cont).toBeGreaterThan(start);
  return source.slice(start, cont);
}

describe("service checkout settlement", () => {
  it("parses confirm_checkout after service order binding", async () => {
    const source = readFileSync(confirmPath, "utf8");
    await expect(transform(source, { loader: "ts", format: "esm" })).resolves.toBeTruthy();
  });

  it("creates a settleable orders row and links the service booking", () => {
    const branch = serviceBranch(readFileSync(confirmPath, "utf8"));

    expect(branch).toMatch(/\.from\("orders"\)/);
    expect(branch).toMatch(/order_group_id:\s*orderGroupId/);
    expect(branch).toMatch(/product_id:\s*null/);
    expect(branch).toMatch(/payment_status:/);
    expect(branch).toMatch(/\.from\("service_bookings"\)/);
    expect(branch).toMatch(/order_id:\s*order\.id/);
    expect(branch).toMatch(/\.from\("order_items"\)/);
    expect(branch).toMatch(/item_kind:\s*"service"/);
    expect(branch).toMatch(/service_id:\s*item\.id/);

    const orderInsert = branch.indexOf('.from("orders")');
    const bookingInsert = branch.indexOf('.from("service_bookings")');
    expect(orderInsert).toBeGreaterThan(-1);
    expect(bookingInsert).toBeGreaterThan(orderInsert);
  });

  it("keeps payment settlement keyed on orders.order_group_id", () => {
    const ret = readFileSync(returnPath, "utf8");
    const webhook = readFileSync(webhookPath, "utf8");
    const momo = readFileSync(momoStatusPath, "utf8");

    for (const source of [ret, webhook, momo]) {
      expect(source).toMatch(/\.from\("orders"\)/);
      expect(source).toMatch(/order_group_id/);
      expect(source).toMatch(/payment_status:\s*"paid"/);
    }

    expect(ret).toMatch(/Aucune commande pour ce paiement/);
  });
});

describe("b2b quote direct update lock", () => {
  it("drops buyer and seller direct UPDATE policies", () => {
    const sql = readFileSync(b2bMigrationPath, "utf8");
    expect(sql).toMatch(/DROP POLICY IF EXISTS b2b_buyer_update ON public\.b2b_requests/i);
    expect(sql).toMatch(/DROP POLICY IF EXISTS b2b_seller_update ON public\.b2b_requests/i);
    expect(sql).not.toMatch(/CREATE POLICY b2b_buyer_update/i);
    expect(sql).not.toMatch(/CREATE POLICY b2b_seller_update/i);
  });
});
