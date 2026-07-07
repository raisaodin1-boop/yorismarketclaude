import { describe, expect, it } from "vitest";
import {
  wholesalePriceSummary,
  nextWholesaleTierHint,
  importLogisticsHint,
} from "../wholesaleCardMeta.js";

describe("wholesaleCardMeta", () => {
  it("computes retail vs wholesale savings", () => {
    const s = wholesalePriceSummary({
      prix: 10000,
      min_qty_gros: 10,
      prix_gros: 6500,
    });
    expect(s.wholesale).toBe(6500);
    expect(s.retail).toBe(10000);
    expect(s.savingsPct).toBe(35);
  });

  it("shows next tier group hint", () => {
    const hint = nextWholesaleTierHint(
      {
        min_qty_gros: 10,
        wholesale_tiers: [
          { min_qty: 10, unit_price: 6500 },
          { min_qty: 25, unit_price: 5000 },
        ],
      },
      "fr",
    );
    expect(hint).not.toBeNull();
    expect(hint.remaining).toBe(15);
    expect(hint.nextPrice).toBe(5000);
  });

  it("returns import logistics hint for foreign origin", () => {
    const hint = importLogisticsHint(
      { country_of_origin: "CN", incoterm: "DDP", lead_time_days: 30 },
      "fr",
    );
    expect(hint.customs).toContain("Dédouanement");
    expect(hint.escrow).toContain("Douala");
  });
});
