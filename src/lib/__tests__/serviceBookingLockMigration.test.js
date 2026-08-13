// @vitest-environment node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const migrationPath = fileURLToPath(
  new URL(
    "../../../supabase/migrations/20260813120000_lock_service_booking_fields.sql",
    import.meta.url,
  ),
);
const migration = readFileSync(migrationPath, "utf8");

describe("service_bookings sensitive fields lock migration", () => {
  it("locks client inserts to reserved/pending rows without an order_id", () => {
    expect(migration).toMatch(
      /CREATE POLICY service_bookings_insert_client_or_admin[\s\S]*client_id = auth\.uid\(\)[\s\S]*status[\s\S]*reserved[\s\S]*pending[\s\S]*order_id IS NULL/,
    );
  });

  it("installs a BEFORE UPDATE trigger for non-admin authenticated writers", () => {
    expect(migration).toContain("fn_guard_service_booking_sensitive_update");
    expect(migration).toContain("trg_guard_service_booking_sensitive_update");
    expect(migration).toContain("BEFORE UPDATE ON public.service_bookings");
    expect(migration).toContain("current_user <> 'authenticated'");
    expect(migration).toContain("public.is_platform_admin()");
  });

  it("blocks forged ownership, order linkage, and client status changes", () => {
    ["provider_id", "client_id", "order_id", "service_id", "status"].forEach((column) => {
      expect(migration).toContain(`NEW.${column} IS DISTINCT FROM OLD.${column}`);
    });
    expect(migration).toContain("OLD.provider_id IS DISTINCT FROM auth.uid()");
    expect(migration).toContain("Only admins may change service booking ownership or order linkage");
    expect(migration).toContain("Only the assigned provider may advance service booking status");
  });
});
