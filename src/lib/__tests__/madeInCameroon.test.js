import { describe, it, expect } from "vitest";
import {
  detectMadeInCameroonAuto,
  resolveMadeInCameroon,
  buildMadeInCameroonPayload,
  productMatchesMadeInFilter,
  MIC_STATUS,
} from "../madeInCameroon.js";

describe("madeInCameroon", () => {
  it("does not auto-detect from city alone", () => {
    expect(detectMadeInCameroonAuto({ ville: "Douala" })).toBe(false);
    expect(detectMadeInCameroonAuto({ ville: "Paris" })).toBe(false);
  });

  it("suggests auto for strong local category or brand", () => {
    expect(detectMadeInCameroonAuto({ categorie: "Artisan local" })).toBe(true);
    expect(detectMadeInCameroonAuto({ local_brand_name: "Mboa Wear" })).toBe(true);
  });

  it("seller declares yes", () => {
    const r = resolveMadeInCameroon({
      is_made_in_cameroon: true,
      made_in_cameroon_status: MIC_STATUS.DECLARED,
    });
    expect(r.show).toBe(true);
    expect(r.label).toContain("Made in");
  });

  it("does not show badge for legacy local flag only", () => {
    const r = resolveMadeInCameroon({ local: true, ville: "Douala" });
    expect(r.show).toBe(false);
  });

  it("admin verified badge", () => {
    const r = resolveMadeInCameroon({
      made_in_cameroon_status: MIC_STATUS.VERIFIED,
    });
    expect(r.verified).toBe(true);
    expect(r.show).toBe(true);
  });

  it("hub filter excludes loose local/auto without explicit flag", () => {
    expect(productMatchesMadeInFilter({ local: true, ville: "Douala" })).toBe(false);
    expect(
      productMatchesMadeInFilter({
        is_made_in_cameroon: true,
        made_in_cameroon_status: MIC_STATUS.DECLARED,
      }),
    ).toBe(true);
  });

  it("builds payload for imported", () => {
    const p = buildMadeInCameroonPayload(
      { madeInChoice: "imported" },
      { ville: "Douala" },
    );
    expect(p.made_in_cameroon_status).toBe(MIC_STATUS.IMPORTED);
    expect(p.is_made_in_cameroon).toBe(false);
  });

  it("default seller choice is not made in cameroon", () => {
    const p = buildMadeInCameroonPayload({}, { ville: "Douala", categorie: "Mode" });
    expect(p.is_made_in_cameroon).toBe(false);
    expect(p.made_in_cameroon_status).toBe(MIC_STATUS.IMPORTED);
  });
});
