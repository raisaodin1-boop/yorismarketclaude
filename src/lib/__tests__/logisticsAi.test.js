import { describe, it, expect } from "vitest";
import { explainDeliveryEta } from "../logisticsAi.js";

describe("logisticsAi", () => {
  it("explains intra-city ETA", () => {
    const r = explainDeliveryEta({ originCity: "Douala", destCity: "Douala" });
    expect(r.summaryFr).toContain("Douala");
    expect(r.factors.length).toBeGreaterThan(2);
    expect(r.costs.min).toBeGreaterThan(0);
  });

  it("explains inter-city ETA", () => {
    const r = explainDeliveryEta({ originCity: "Douala", destCity: "Yaoundé" });
    expect(r.distanceKm).toBeGreaterThan(50);
  });
});
