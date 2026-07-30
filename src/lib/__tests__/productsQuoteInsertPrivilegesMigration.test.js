// @vitest-environment node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const migrationPath = fileURLToPath(
  new URL(
    "../../../supabase/migrations/20260730110000_lock_products_and_quote_insert_privileges.sql",
    import.meta.url,
  ),
);
const migration = readFileSync(migrationPath, "utf8");

describe("products and delivery-pro quote INSERT privilege lock", () => {
  it("forces seller product inserts onto their own vendeur_id and excludes admin_partner writes", () => {
    expect(migration).toMatch(
      /CREATE POLICY products_insert_seller[\s\S]*vendeur_id = auth\.uid\(\)[\s\S]*role IN \('seller', 'admin', 'superadmin'\)[\s\S]*OR public\.is_platform_admin\(\)/,
    );
    expect(migration).not.toMatch(/role IN \('seller', 'admin', 'admin_partner', 'superadmin'\)/);
    expect(migration).toMatch(
      /CREATE POLICY products_update_seller[\s\S]*OR public\.is_platform_admin\(\)[\s\S]*WITH CHECK \([\s\S]*OR public\.is_platform_admin\(\)/,
    );
    expect(migration).toMatch(
      /CREATE POLICY products_delete_seller[\s\S]*OR public\.is_platform_admin\(\)/,
    );
  });

  it("keeps public delivery-pro quote inserts pending, note-free, and self-attributed", () => {
    expect(migration).toMatch(
      /CREATE POLICY delivery_pro_quotes_insert[\s\S]*status = 'pending'[\s\S]*admin_notes IS NULL[\s\S]*user_id IS NULL OR user_id = auth\.uid\(\)/,
    );
  });
});
