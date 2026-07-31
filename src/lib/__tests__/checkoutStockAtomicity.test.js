/**
 * @vitest-environment node
 *
 * Régression : un checkout multi-lignes décrémente le stock ligne par ligne
 * hors transaction → une rupture concurrente sur la ligne N laisse les
 * commandes 1..N-1 + stock déjà consommé alors que l'acheteur reçoit une
 * erreur. Annuler une commande ne restaurait jamais le stock.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { transform } from "esbuild";
import { describe, expect, it } from "vitest";

const edgePath = fileURLToPath(
  new URL("../../../supabase/functions/confirm_checkout/index.ts", import.meta.url),
);
const migrationPath = fileURLToPath(
  new URL(
    "../../../supabase/migrations/20260731120000_atomic_checkout_stock_and_cancel_restore.sql",
    import.meta.url,
  ),
);

describe("checkout stock atomicity and cancel restore", () => {
  it("parses the confirm_checkout Edge Function after stock-flow changes", async () => {
    const source = readFileSync(edgePath, "utf8");
    await expect(transform(source, { loader: "ts", format: "esm" })).resolves.toBeTruthy();
  });

  it("reserves cart stock atomically before creating orders and can restore on failure", () => {
    const source = readFileSync(edgePath, "utf8");
    const rpcIndex = source.indexOf('"decrement_cart_stock"');
    const orderInsertIndex = source.indexOf('.from("orders")');
    const restoreIndex = source.indexOf('"restore_cart_stock"');

    expect(rpcIndex).toBeGreaterThan(-1);
    expect(orderInsertIndex).toBeGreaterThan(-1);
    expect(rpcIndex).toBeLessThan(orderInsertIndex);
    expect(source).not.toContain('"decrement_product_stock"');
    expect(restoreIndex).toBeGreaterThan(orderInsertIndex);
    expect(source).toMatch(/stockReserved/);
    expect(source).toMatch(/createdOrderIds/);
  });

  it("defines locked all-or-nothing stock RPCs and cancel-time restore", () => {
    const sql = readFileSync(migrationPath, "utf8");

    expect(sql).toMatch(/CREATE OR REPLACE FUNCTION public\.decrement_cart_stock/i);
    expect(sql).toMatch(/FOR UPDATE/);
    expect(sql).toMatch(/p\.stock IS NOT NULL\s+AND p\.stock < r\.qty/);
    expect(sql).toMatch(/SET stock = p\.stock - r\.qty/i);
    expect(sql).toMatch(/CREATE OR REPLACE FUNCTION public\.restore_cart_stock/i);
    expect(sql).toMatch(/SET stock = p\.stock \+ r\.qty/i);
    expect(sql).toMatch(/CREATE OR REPLACE FUNCTION public\.restore_order_stock/i);
    expect(sql).toMatch(/PERFORM public\.restore_order_stock\(p_order_id\)/);
    expect(sql).toMatch(
      /GRANT EXECUTE ON FUNCTION public\.decrement_cart_stock\(jsonb\) TO service_role/i,
    );
    expect(sql).toMatch(/CREATE OR REPLACE FUNCTION public\.fn_cancel_order/i);
  });

  it("keeps NULL stock as unlimited instead of coalescing to zero", () => {
    const sql = readFileSync(migrationPath, "utf8");
    expect(sql).not.toMatch(/coalesce\(p\.stock,\s*0\)\s*<\s*r\.qty/i);
    expect(sql).toMatch(/IF v_current_stock IS NULL THEN\s+RETURN NULL/i);
  });
});
