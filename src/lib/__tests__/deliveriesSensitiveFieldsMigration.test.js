// @vitest-environment node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const migrationPath = fileURLToPath(
  new URL(
    "../../../supabase/migrations/20260809120000_guard_delivery_sensitive_fields.sql",
    import.meta.url,
  ),
);
const migration = readFileSync(migrationPath, "utf8");

describe("deliveries sensitive fields guard migration", () => {
  it("locks client inserts to pending unassigned zero-commission rows", () => {
    expect(migration).toMatch(
      /CREATE POLICY deliveries_insert_authenticated_owner_or_admin[\s\S]*client_id = auth\.uid\(\)[\s\S]*statut[\s\S]*commande_recue[\s\S]*commission_livreur[\s\S]*= 0[\s\S]*livreur_id IS NULL/,
    );
  });

  it("installs a BEFORE UPDATE trigger for non-admin authenticated writers", () => {
    expect(migration).toContain("fn_guard_delivery_sensitive_update");
    expect(migration).toContain("trg_guard_delivery_sensitive_update");
    expect(migration).toContain("BEFORE UPDATE ON public.deliveries");
    expect(migration).toContain("current_user <> 'authenticated'");
    expect(migration).toContain("public.is_platform_admin()");
  });

  it("blocks forged pricing, ownership, assignment, and client status changes", () => {
    [
      "commission_livreur",
      "montant",
      "order_id",
      "client_id",
      "code_suivi",
      "livreur_id",
      "livreur_nom",
      "livreur_tel",
      "livreur_vehicule",
      "statut",
    ].forEach((column) => {
      expect(migration).toContain(`NEW.${column} IS DISTINCT FROM OLD.${column}`);
    });
    expect(migration).toContain("OLD.livreur_id IS DISTINCT FROM auth.uid()");
    expect(migration).toContain("Only admins may change delivery pricing or ownership fields");
    expect(migration).toContain("Only the assigned courier may advance delivery status");
  });
});
