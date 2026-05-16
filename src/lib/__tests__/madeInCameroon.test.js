import { describe, it, expect } from "vitest";
import {
  detectMadeInCameroonAuto,
  resolveMadeInCameroon,
  buildMadeInCameroonPayload,
  MIC_STATUS,
} from "../madeInCameroon.js";

describe("madeInCameroon", () => {
  it("auto-detects Cameroon city", () => {
    expect(detectMadeInCameroonAuto({ ville: "Douala" })).toBe(true);
    expect(detectMadeInCameroonAuto({ ville: "Paris" })).toBe(false);
  });

  it("seller declares yes", () => {
    const r = resolveMadeInCameroon({
      is_made_in_cameroon: true,
      made_in_cameroon_status: MIC_STATUS.DECLARED,
    });
    expect(r.show).toBe(true);
    expect(r.label).toContain("Made in");
  });

  it("admin verified badge", () => {
    const r = resolveMadeInCameroon({
      made_in_cameroon_status: MIC_STATUS.VERIFIED,
    });
    expect(r.verified).toBe(true);
  });

  it("builds payload for imported", () => {
    const p = buildMadeInCameroonPayload(
      { madeInChoice: "imported" },
      { ville: "Douala" },
      null,
    );
    expect(p.made_in_cameroon_status).toBe(MIC_STATUS.IMPORTED);
    expect(p.is_made_in_cameroon).toBe(false);
  });
});
