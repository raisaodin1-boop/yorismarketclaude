// @vitest-environment node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const migration = readFileSync(
  resolve(process.cwd(), "supabase/migrations/20260711110235_lock_finance_and_trust_writes.sql"),
  "utf8",
);

describe("critical security hardening migration", () => {
  it("blocks direct non-admin order finance and escrow changes", () => {
    expect(migration).toContain("fn_guard_order_financial_fields");
    expect(migration).toContain("trg_guard_order_financial_fields");
    expect(migration).toContain("NEW.payment_status IS DISTINCT FROM OLD.payment_status");
    expect(migration).toContain("NEW.escrow_status IS DISTINCT FROM OLD.escrow_status");
    expect(migration).toContain("NEW.montant_vendeur IS DISTINCT FROM OLD.montant_vendeur");
    expect(migration).toContain("public.is_trusted_security_writer()");
  });

  it("keeps admin finance KPIs under caller RLS", () => {
    expect(migration).toContain("CREATE OR REPLACE VIEW public.admin_finance_kpis");
    expect(migration).toContain("WITH (security_invoker = true)");
  });

  it("prevents sellers from self-verifying KYC or badges", () => {
    expect(migration).toContain("fn_guard_seller_kyc_review_fields");
    expect(migration).toContain("NEW.status = 'verified'");
    expect(migration).toContain("fn_guard_profile_verification_fields");
    expect(migration).toContain("NEW.verifie IS DISTINCT FROM OLD.verifie");
    expect(migration).toContain("fn_guard_product_verification_fields");
    expect(migration).toContain("NEW.vendeur_verifie IS DISTINCT FROM OLD.vendeur_verifie");
  });

  it("allows only zero-balance client wallet inserts", () => {
    expect(migration).toContain("DROP POLICY IF EXISTS wallets_insert_owner");
    expect(migration).toContain("coalesce(solde, 0) = 0");
    expect(migration).toContain("coalesce(total_gagne, 0) = 0");
  });
});
