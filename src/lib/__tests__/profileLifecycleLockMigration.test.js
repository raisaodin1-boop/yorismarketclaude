// @vitest-environment node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const migrationPath = fileURLToPath(
  new URL(
    "../../../supabase/migrations/20260829120000_lock_profile_lifecycle_fields.sql",
    import.meta.url,
  ),
);
const migration = readFileSync(migrationPath, "utf8");

describe("profiles lifecycle fields lock migration", () => {
  it("installs a BEFORE UPDATE trigger for non-admin authenticated writers", () => {
    expect(migration).toContain("fn_guard_profile_lifecycle_update");
    expect(migration).toContain("trg_guard_profile_lifecycle_update");
    expect(migration).toContain("BEFORE UPDATE ON public.profiles");
    expect(migration).toContain("SECURITY INVOKER");
    expect(migration).toContain("current_user <> 'authenticated'");
    expect(migration).toContain("public.is_platform_admin()");
  });

  it("blocks self-service changes to ban and deletion columns", () => {
    ["actif", "deactivated_at", "deleted_at", "ban_reason", "email_original"].forEach((column) => {
      expect(migration).toContain(`NEW.${column} IS DISTINCT FROM OLD.${column}`);
    });
    expect(migration).toContain("Profile lifecycle fields can only be changed by the platform");
    expect(migration).toContain("ERRCODE = '42501'");
  });
});
