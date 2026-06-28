import { describe, it, expect } from "vitest";
import { computeCreditScore } from "../creditScore.js";

describe("creditScore", () => {
  it("requires consent", () => {
    const r = computeCreditScore([{ status: "livre", montant: 10000 }], { consented: false });
    expect(r.score).toBeNull();
    expect(r.consented).toBe(false);
  });

  it("scores completed orders with consent", () => {
    const orders = Array.from({ length: 6 }, (_, i) => ({
      id: String(i),
      status: "livre",
      livraison_status: "livre",
      montant: 15000,
    }));
    const r = computeCreditScore(orders, { consented: true });
    expect(r.score).toBeGreaterThan(60);
    expect(r.factors.length).toBeGreaterThan(0);
  });
});
