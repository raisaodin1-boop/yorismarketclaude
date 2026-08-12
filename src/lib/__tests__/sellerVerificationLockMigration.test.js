// @vitest-environment node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const migrationPath = fileURLToPath(
  new URL(
    "../../../supabase/migrations/20260812120000_lock_seller_verification_fields.sql",
    import.meta.url,
  ),
);
const migration = readFileSync(migrationPath, "utf8");

describe("seller verification fields lock migration", () => {
  it("guards product badge and Made in Cameroon admin statuses", () => {
    expect(migration).toContain("fn_guard_product_verification_fields");
    expect(migration).toContain("trg_guard_product_verification_fields");
    expect(migration).toContain("BEFORE INSERT OR UPDATE ON public.products");
    expect(migration).toContain("NEW.vendeur_verifie IS DISTINCT FROM OLD.vendeur_verifie");
    expect(migration).toContain("made_in_cameroon_status");
    expect(migration).toContain("made_in_cameroon_verified_at");
    expect(migration).toContain("Only admins may set product verification badge");
  });

  it("guards profiles.verifie and seller_verified_at for non-admins", () => {
    expect(migration).toContain("fn_guard_profile_verification_fields");
    expect(migration).toContain("trg_guard_profile_verification_fields");
    expect(migration).toContain("BEFORE UPDATE ON public.profiles");
    expect(migration).toContain("NEW.verifie IS DISTINCT FROM OLD.verifie");
    expect(migration).toContain("NEW.seller_verified_at IS DISTINCT FROM OLD.seller_verified_at");
    expect(migration).toContain("Only admins may change seller verification flags");
  });

  it("limits seller KYC inserts to draft/pending without reviewer fields", () => {
    expect(migration).toContain("DROP POLICY IF EXISTS seller_kyc_insert_own");
    expect(migration).toMatch(
      /CREATE POLICY seller_kyc_insert_own[\s\S]*user_id = auth\.uid\(\)[\s\S]*status[\s\S]*draft[\s\S]*pending[\s\S]*reviewer_id IS NULL/,
    );
  });

  it("blocks KYC self-approval and review-field forgery", () => {
    expect(migration).toContain("fn_guard_seller_kyc_decision_fields");
    expect(migration).toContain("trg_guard_seller_kyc_decision_fields");
    expect(migration).toContain("BEFORE INSERT OR UPDATE ON public.seller_kyc");
    expect(migration).toContain("Sellers may only set KYC status to draft or pending");
    expect(migration).toContain("Verified KYC can only be changed by admins");
    expect(migration).toContain("NEW.reviewer_id IS DISTINCT FROM OLD.reviewer_id");
    expect(migration).toContain("current_user <> 'authenticated'");
    expect(migration).toContain("public.is_platform_admin()");
  });
});
