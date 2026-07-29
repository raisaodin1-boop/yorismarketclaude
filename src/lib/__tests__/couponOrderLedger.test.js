/**
 * @vitest-environment node
 *
 * Régression : un coupon réduit l'encaissement (intent.total) mais, avant ce
 * correctif, confirm_checkout écrivait encore montant / montant_vendeur au
 * brut catalogue → escrow vendeur > cash collecté.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { transform } from "esbuild";
import { describe, expect, it } from "vitest";

const allocationPath = fileURLToPath(
  new URL("../../../supabase/functions/_shared/coupon_allocation.ts", import.meta.url),
);
const confirmPath = fileURLToPath(
  new URL("../../../supabase/functions/confirm_checkout/index.ts", import.meta.url),
);

async function loadAllocation() {
  const source = readFileSync(allocationPath, "utf8");
  const { code } = await transform(source, {
    loader: "ts",
    format: "esm",
    target: "node18",
  });
  const dataUrl = `data:text/javascript;charset=utf-8,${encodeURIComponent(code)}`;
  return import(dataUrl);
}

describe("coupon_allocation", () => {
  it("returns zero discounts when coupon is 0", async () => {
    const { allocateCouponAcrossGrosses, computeOrderFinance } = await loadAllocation();
    expect(allocateCouponAcrossGrosses([10000, 5000], 0)).toEqual([0, 0]);
    expect(computeOrderFinance(10000, 0)).toEqual({
      montant: 10000,
      commission: 500,
      montant_vendeur: 9500,
      line_discount: 0,
    });
  });

  it("allocates an exact integer discount across lines (largest remainder)", async () => {
    const { allocateCouponAcrossGrosses } = await loadAllocation();
    const discounts = allocateCouponAcrossGrosses([10000, 5000], 2000);
    expect(discounts.reduce((s, n) => s + n, 0)).toBe(2000);
    expect(discounts[0]).toBe(1333);
    expect(discounts[1]).toBe(667);
  });

  it("never allocates more than the product subtotal (delivery bite stays off seller ledger)", async () => {
    const { allocateCouponAcrossGrosses } = await loadAllocation();
    // Coupon 3000 sur sous-total produits 2000 (+ livraison hors lignes).
    expect(allocateCouponAcrossGrosses([2000], 3000)).toEqual([2000]);
  });

  it("keeps seller escrow ≤ cash collected for product lines after coupon", async () => {
    const { allocateCouponAcrossGrosses, computeOrderFinance } = await loadAllocation();
    const grosses = [10000, 4000];
    const coupon = 2500;
    const deliveryFee = 1500;
    const cashCollected = grosses.reduce((s, g) => s + g, 0) + deliveryFee - coupon;

    const discounts = allocateCouponAcrossGrosses(grosses, coupon);
    const finances = grosses.map((g, i) => computeOrderFinance(g, discounts[i]));
    const sellerEscrow = finances.reduce((s, f) => s + f.montant_vendeur, 0);
    const lineCash = finances.reduce((s, f) => s + f.montant, 0);

    expect(lineCash).toBe(grosses.reduce((s, g) => s + g, 0) - coupon);
    expect(sellerEscrow).toBeLessThanOrEqual(lineCash);
    expect(sellerEscrow).toBeLessThanOrEqual(cashCollected);
    // Avant correctif : sellerEscrow aurait été 0.95*(10000+4000)=13300 > cash 13000.
    expect(0.95 * grosses.reduce((s, g) => s + g, 0)).toBeGreaterThan(cashCollected);
  });

  it("clamps a 100% coupon to zero seller payable on that line", async () => {
    const { computeOrderFinance } = await loadAllocation();
    expect(computeOrderFinance(8000, 8000)).toEqual({
      montant: 0,
      commission: 0,
      montant_vendeur: 0,
      line_discount: 8000,
    });
  });
});

describe("confirm_checkout coupon ledger wiring", () => {
  const source = readFileSync(confirmPath, "utf8");

  it("imports coupon allocation helpers", () => {
    expect(source).toContain('from "../_shared/coupon_allocation.ts"');
    expect(source).toContain("allocateCouponAcrossGrosses");
    expect(source).toContain("computeOrderFinance");
  });

  it("persists remised montant / montant_vendeur instead of catalog gross", () => {
    expect(source).toContain("const { montant, commission, montant_vendeur: net, line_discount } =");
    expect(source).toContain("montant,");
    expect(source).toContain("montant_vendeur: net,");
    expect(source).not.toMatch(/montant:\s*gross/);
    expect(source).toContain("subtotal: montant");
    expect(source).toContain("coupon_discount: line_discount");
  });

  it("returns the discounted expectedTotal in the confirmation response", () => {
    expect(source).toContain("total: intentAfter?.total ?? expectedTotal");
    expect(source).not.toContain("total: intentAfter?.total ?? totals.total");
  });
});
