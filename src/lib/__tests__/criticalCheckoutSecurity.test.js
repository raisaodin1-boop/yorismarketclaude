// @vitest-environment node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";
import { describe, expect, it } from "vitest";

const confirmCheckoutSource = readFileSync(
  resolve(cwd(), "supabase/functions/confirm_checkout/index.ts"),
  "utf8",
);

describe("confirm_checkout critical guards", () => {
  it("rejects an already consumed checkout intent before creating orders", () => {
    const statusGuard = confirmCheckoutSource.indexOf('intent.status !== "ready"');
    const orderInsert = confirmCheckoutSource.indexOf('.from("orders")');

    expect(statusGuard).toBeGreaterThan(-1);
    expect(orderInsert).toBeGreaterThan(-1);
    expect(statusGuard).toBeLessThan(orderInsert);
    expect(confirmCheckoutSource).toContain("CHECKOUT_INTENT_ALREADY_USED");
  });

  it("verifies ownership for customer-bound intents", () => {
    const customerIdCheck = confirmCheckoutSource.indexOf("const customerId =");
    const orderInsert = confirmCheckoutSource.indexOf('.from("orders")');

    expect(customerIdCheck).toBeGreaterThan(-1);
    expect(customerIdCheck).toBeLessThan(orderInsert);
    expect(confirmCheckoutSource).toContain('req.headers.get("Authorization")');
    expect(confirmCheckoutSource).toContain("anon.auth.getUser(token)");
    expect(confirmCheckoutSource).toContain("user.id !== customerId");
  });
});
