// @vitest-environment node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const migrationPath = fileURLToPath(
  new URL(
    "../../../supabase/migrations/20260914120000_add_service_bookings_user_id.sql",
    import.meta.url,
  ),
);
const checkoutPath = fileURLToPath(
  new URL("../../../supabase/functions/confirm_checkout/index.ts", import.meta.url),
);
const migration = readFileSync(migrationPath, "utf8");
const checkout = readFileSync(checkoutPath, "utf8");

describe("service_bookings user_id column (checkout crash)", () => {
  it("adds user_id and a BEFORE INSERT sync trigger", () => {
    expect(migration).toContain("ADD COLUMN IF NOT EXISTS user_id uuid");
    expect(migration).toContain("fn_service_bookings_sync_user_id");
    expect(migration).toContain("aaa_trg_service_bookings_sync_user_id");
    expect(migration).toContain("BEFORE INSERT OR UPDATE ON public.service_bookings");
    expect(migration).toContain("NEW.user_id := NEW.client_id");
  });

  it("stamps user_id from the checkout customer on service bookings", () => {
    expect(checkout).toMatch(/\.from\("service_bookings"\)[\s\S]*\.insert\(\{/);
    expect(checkout).toMatch(/user_id:\s*customer\.id\s*\|\|\s*null/);
    expect(checkout).toMatch(/client_id:\s*customer\.id\s*\|\|\s*null/);
  });
});
