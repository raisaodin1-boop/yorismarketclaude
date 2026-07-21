// @vitest-environment node
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const migrationUrl = new URL(
  "../../../supabase/migrations/20260721110500_harden_loyalty_credit_from_payment.sql",
  import.meta.url,
);
const sql = readFileSync(migrationUrl, "utf8");

describe("loyalty credit payment hardening migration", () => {
  it("derives amount and points from an active catalog pack", () => {
    expect(sql).toContain("FROM public.loyalty_packs");
    expect(sql).toContain("COALESCE(v_pack.actif, false) IS NOT TRUE");
    expect(sql).toContain("v_expected_points");
    expect(sql).toContain("v_expected_amount");
    expect(sql).toContain("ROUND(COALESCE(v_purchase.points, 0))::integer <> v_expected_points");
    expect(sql).toContain("v_expected_points,\n    'achat_points'");
  });

  it("requires a paid Paynote XAF transaction for the exact catalog amount", () => {
    expect(sql).toContain("provider = 'paynote_mtn'");
    expect(sql).toContain("status = 'paid'");
    expect(sql).toContain("currency = 'XAF'");
    expect(sql).toContain("order_group_id = 'LOYALTY-' || p_purchase_id::text");
    expect(sql).toContain("ROUND(COALESCE(amount, 0))::numeric(14,2) = v_expected_amount");
  });

  it("keeps the definer RPC restricted to service_role", () => {
    expect(sql).toContain(
      "REVOKE ALL ON FUNCTION public.credit_pack_purchase_from_payment(uuid, text) FROM PUBLIC, anon, authenticated;",
    );
    expect(sql).toContain(
      "GRANT EXECUTE ON FUNCTION public.credit_pack_purchase_from_payment(uuid, text) TO service_role;",
    );
  });
});
