// @vitest-environment node
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("loyalty credit payment hardening migration", () => {
  const sql = readFileSync(
    resolve(
      new URL("../../../../supabase/migrations/20260713110100_harden_loyalty_credit_from_payment.sql", import.meta.url)
        .pathname,
    ),
    "utf8",
  );

  it("binds automated credits to the pack catalog and paid transaction amount", () => {
    expect(sql).toContain("public.loyalty_packs");
    expect(sql).toContain("v_expected_points");
    expect(sql).toContain("v_expected_amount");
    expect(sql).toContain("provider = 'paynote_mtn'");
    expect(sql).toContain("ROUND(COALESCE(amount, 0))");
    expect(sql).toContain("COALESCE(v_purchase.points, 0)::integer <> v_expected_points");
  });
});
