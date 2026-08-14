// @vitest-environment node
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sql = readFileSync(
  join(here, "../../../supabase/migrations/20260814120000_checkout_variant_stock.sql"),
  "utf8",
);

describe("checkout variant stock migration", () => {
  it("checks variant.stock when variant_id is present", () => {
    expect(sql).toMatch(/v_item->>'variant_id'/);
    expect(sql).toMatch(/jsonb_array_elements/);
    expect(sql).toMatch(/elem->>'id' = v_variant_id/);
    expect(sql).toMatch(/v_variant_stock < v_qty/);
  });

  it("extends decrement_product_stock with optional p_variant_id", () => {
    expect(sql).toMatch(/DROP FUNCTION IF EXISTS public\.decrement_product_stock\(uuid, integer\)/);
    expect(sql).toMatch(/p_variant_id text DEFAULT NULL/);
    expect(sql).toMatch(/jsonb_set\(elem, '\{stock\}'/);
    expect(sql).toMatch(/GRANT EXECUTE ON FUNCTION public\.decrement_product_stock\(uuid, integer, text\) TO service_role/);
  });
});
