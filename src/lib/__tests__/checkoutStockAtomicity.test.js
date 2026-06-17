// @vitest-environment node

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { transform } from "esbuild";
import { describe, expect, it } from "vitest";

const root = resolve(fileURLToPath(new URL("../../..", import.meta.url)));
const edgePath = resolve(root, "supabase/functions/confirm_checkout/index.ts");
const migrationPath = resolve(
  root,
  "supabase/migrations/20260617000100_atomic_checkout_stock_decrement.sql",
);

describe("checkout stock atomicity", () => {
  it("parses the confirm_checkout Edge Function after stock-flow changes", async () => {
    const source = await readFile(edgePath, "utf8");
    await expect(transform(source, { loader: "ts", format: "esm" })).resolves.toBeTruthy();
  });

  it("decrements stock once for the whole cart before creating orders", async () => {
    const source = await readFile(edgePath, "utf8");
    const rpcIndex = source.indexOf('"decrement_cart_stock"');
    const orderInsertIndex = source.indexOf('.from("orders")');

    expect(rpcIndex).toBeGreaterThan(-1);
    expect(orderInsertIndex).toBeGreaterThan(-1);
    expect(rpcIndex).toBeLessThan(orderInsertIndex);
    expect(source).not.toContain('"decrement_product_stock"');
    expect(source).toContain('"restore_cart_stock"');
  });

  it("defines locked all-or-nothing stock decrement and cleanup restore RPCs", async () => {
    const sql = await readFile(migrationPath, "utf8");

    expect(sql).toContain("create or replace function public.decrement_cart_stock");
    expect(sql).toContain("for update");
    expect(sql).toContain("where coalesce(p.stock, 0) < r.qty");
    expect(sql).toContain("set stock      = coalesce(p.stock, 0) - r.qty");
    expect(sql).toContain("create or replace function public.restore_cart_stock");
    expect(sql).toContain("set stock      = coalesce(p.stock, 0) + r.qty");
    expect(sql).toContain("grant execute on function public.decrement_cart_stock(jsonb) to service_role");
  });
});
