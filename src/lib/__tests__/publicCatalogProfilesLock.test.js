// @vitest-environment node
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PUBLIC_CATALOG_PROFILES_TABLE } from "../publicCatalogProfiles.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const migrationPath = join(
  root,
  "supabase/migrations/20260909120000_lock_public_profile_pii.sql",
);

describe("lock public profile PII migration", () => {
  const sql = readFileSync(migrationPath, "utf8");

  it("revokes anon SELECT on profiles and legacy users", () => {
    expect(sql).toMatch(/REVOKE ALL ON TABLE public\.profiles FROM anon/i);
    expect(sql).toMatch(/FORCE ROW LEVEL SECURITY/i);
    expect(sql).toMatch(/REVOKE ALL ON TABLE public\.users FROM anon/i);
  });

  it("does not expose email or telephone on the public catalog view", () => {
    expect(sql).toMatch(/CREATE OR REPLACE VIEW public\.public_catalog_profiles/i);
    const viewChunk = sql.slice(sql.indexOf("public.public_catalog_profiles"));
    expect(viewChunk).not.toMatch(/,\s*email\b/);
    expect(viewChunk).not.toMatch(/,\s*telephone\b/);
    expect(viewChunk).not.toMatch(/,\s*points\b/);
  });

  it("keeps self/admin and chat-peer SELECT for authenticated users", () => {
    expect(sql).toMatch(/profiles_select_self_or_admin/);
    expect(sql).toMatch(/profiles_select_chat_peer/);
    expect(sql).toMatch(/id = auth\.uid\(\)/);
  });
});

describe("public catalog client reads", () => {
  it("storefront and merch hubs use the catalog view, not profiles.*", () => {
    const storefront = readFileSync(join(root, "src/pages/SellerStorefrontPage.jsx"), "utf8");
    const merch = readFileSync(join(root, "src/lib/merchHubProducts.js"), "utf8");
    const stats = readFileSync(join(root, "src/lib/platformStats.js"), "utf8");
    const app = readFileSync(join(root, "src/YorixApp.jsx"), "utf8");
    const referral = readFileSync(join(root, "src/lib/referralApi.js"), "utf8");
    const delivery = readFileSync(join(root, "src/utils/deliveryWorkflow.js"), "utf8");

    for (const src of [storefront, merch, stats, app, referral, delivery]) {
      expect(src).toContain("PUBLIC_CATALOG_PROFILES");
    }
    expect(storefront).not.toMatch(/from\("profiles"\)\.select\("\*"\)/);
    expect(PUBLIC_CATALOG_PROFILES_TABLE).toBe("public_catalog_profiles");
  });
});
