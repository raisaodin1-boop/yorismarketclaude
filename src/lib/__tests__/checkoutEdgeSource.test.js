// @vitest-environment node
import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { transform } from "esbuild";

const confirmCheckoutUrl = new URL(
  "../../../supabase/functions/confirm_checkout/index.ts",
  import.meta.url,
);
const modalCommanderUrl = new URL(
  "../../components/ModalCommander.jsx",
  import.meta.url,
);

async function readSource(url) {
  return readFile(url, "utf8");
}

describe("checkout Edge safety invariants", () => {
  it("keeps confirm_checkout parseable after security hardening", async () => {
    const source = await readSource(confirmCheckoutUrl);
    await expect(transform(source, { loader: "ts" })).resolves.toBeTruthy();
  });

  it("requires intent-owner auth before confirmation", async () => {
    const source = await readSource(confirmCheckoutUrl);

    expect(source).toContain("verifyIntentOwner(req, supabaseUrl, existingIntent.customer_id)");
    expect(source).toContain("anon.auth.getUser(token)");
    expect(source).toContain("user.id !== customerId");
  });

  it("claims only ready intents before creating checkout side effects", async () => {
    const source = await readSource(confirmCheckoutUrl);
    const claimIndex = source.indexOf('.eq("status", "ready")');
    const orderInsertIndex = source.indexOf('.from("orders")\n        .insert');

    expect(source).toContain('status: "processing"');
    expect(source).toContain('status: "confirmed"');
    expect(claimIndex).toBeGreaterThan(-1);
    expect(orderInsertIndex).toBeGreaterThan(claimIndex);
  });

  it("treats stock decrement errors as fatal and cleans partial rows", async () => {
    const source = await readSource(confirmCheckoutUrl);
    const stockErrorIndex = source.indexOf("if (stockErr)");
    const cleanupIndex = source.indexOf("cleanupCreatedCheckoutRows(");

    expect(stockErrorIndex).toBeGreaterThan(-1);
    expect(source.slice(stockErrorIndex, stockErrorIndex + 300)).toContain(
      "throw new CheckoutHttpError",
    );
    expect(cleanupIndex).toBeGreaterThan(-1);
    expect(source).toContain('supabase.rpc("increment_product_stock"');
  });
});

describe("ModalCommander checkout safety", () => {
  it("does not fall back to direct client-side order insertion", async () => {
    const source = await readSource(modalCommanderUrl);
    await expect(transform(source, { loader: "jsx" })).resolves.toBeTruthy();

    expect(source).not.toContain("creerCommandeSupabase");
    expect(source).not.toContain("isEdgeUnavailable");
  });
});
