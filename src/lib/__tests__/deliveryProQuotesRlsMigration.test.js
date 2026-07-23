// @vitest-environment node

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const migrationPath = fileURLToPath(
  new URL(
    "../../../supabase/migrations/20260723110100_delivery_pro_quotes_admin_partner_read.sql",
    import.meta.url,
  ),
);
const migration = readFileSync(migrationPath, "utf8");

describe("delivery pro quote admin-partner RLS", () => {
  it("grants admin viewers SELECT access without widening write access", () => {
    expect(migration).toMatch(
      /CREATE POLICY delivery_pro_quotes_admin_viewer_read[\s\S]*FOR SELECT TO authenticated[\s\S]*USING \(public\.is_platform_admin_viewer\(\)\)/,
    );
    expect(migration).not.toMatch(/FOR (?:ALL|INSERT|UPDATE|DELETE) TO authenticated/);
    expect(migration).not.toMatch(/is_platform_admin\(\)/);
  });
});
