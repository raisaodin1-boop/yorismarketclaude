// @vitest-environment node
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const here = fileURLToPath(new URL(".", import.meta.url));
const migrationSql = readFileSync(
  join(here, "../../../supabase/migrations/20260916120000_lock_signup_profile_roles.sql"),
  "utf8",
);

describe("signup role lock migration", () => {
  it("installs a BEFORE INSERT OR UPDATE trigger that clamps non-public roles", () => {
    expect(migrationSql).toMatch(/fn_guard_profile_signup_role/);
    expect(migrationSql).toMatch(/BEFORE INSERT OR UPDATE OF role/);
    expect(migrationSql).toMatch(/NEW\.role := 'buyer'/);
    expect(migrationSql).toMatch(/is_platform_admin\(\)/);
    expect(migrationSql).toMatch(/ERRCODE = '42501'/);
  });
});
