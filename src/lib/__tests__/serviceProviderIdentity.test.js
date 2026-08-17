/**
 * @vitest-environment node
 *
 * Régression : create_checkout_intent / confirm_checkout faisaient confiance
 * à `items[].provider_id` envoyé par le client. Un acheteur pouvait réassigner
 * une prestation au prestataire de son choix (lui-même, ou un tiers).
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { transform } from "esbuild";
import { describe, expect, it } from "vitest";

const here = dirname(fileURLToPath(import.meta.url));
const catalogPath = join(here, "../../../supabase/functions/_shared/catalog_prices.ts");
const confirmPath = join(here, "../../../supabase/functions/confirm_checkout/index.ts");

async function loadCatalogPrices() {
  const src = readFileSync(catalogPath, "utf8");
  const { code } = await transform(src, { loader: "ts", format: "esm" });
  return import(`data:text/javascript,${encodeURIComponent(code)}`);
}

function mockDb({ products = [], services = [] } = {}) {
  return {
    from(table) {
      const rows = table === "products" ? products : services;
      return {
        select() {
          return {
            async in(_col, ids) {
              const set = new Set((ids || []).map(String));
              return {
                data: rows.filter((r) => set.has(String(r.id))),
                error: null,
              };
            },
          };
        },
      };
    },
  };
}

const ALICE_SERVICE = {
  id: "svc-plomberie",
  prix: 25000,
  disponible: true,
  actif: true,
  provider_id: "alice-provider",
};

describe("service provider identity at checkout", () => {
  it("overwrites client provider_id with the catalog prestataire", async () => {
    const { applyCatalogPricing } = await loadCatalogPrices();
    const { lines, error } = await applyCatalogPricing(
      mockDb({ services: [ALICE_SERVICE] }),
      [{
        id: "svc-plomberie",
        kind: "service",
        qty: 1,
        price: 1,
        provider_id: "attacker",
      }],
    );
    expect(error).toBeUndefined();
    expect(lines[0].price).toBe(25000);
    expect(lines[0].provider_id).toBe("alice-provider");
  });

  it("clears a spoofed provider_id when the catalog row has none", async () => {
    const { applyCatalogPricing } = await loadCatalogPrices();
    const { lines, error } = await applyCatalogPricing(
      mockDb({ services: [{ ...ALICE_SERVICE, provider_id: null }] }),
      [{ id: "svc-plomberie", kind: "service", provider_id: "attacker" }],
    );
    expect(error).toBeUndefined();
    expect(lines[0].provider_id).toBeNull();
  });

  it("confirm_checkout inserts bookings with the catalog provider, not the client field", () => {
    const src = readFileSync(confirmPath, "utf8");
    expect(src).toMatch(/\.from\("services"\)/);
    expect(src).toMatch(/select\("id,provider_id"\)/);
    expect(src).toMatch(/providerByService/);
    expect(src).toMatch(/provider_id:\s*catalogProviderId/);
    expect(src).not.toMatch(/provider_id:\s*item\.provider_id/);
  });
});
