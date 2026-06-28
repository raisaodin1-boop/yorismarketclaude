import { describe, it, expect } from "vitest";
import { formatPlatformStat } from "../platformStats.js";

describe("platformStats", () => {
  it("formatPlatformStat adds suffix for small numbers", () => {
    expect(formatPlatformStat(180)).toBe("180+");
  });

  it("formatPlatformStat formats thousands", () => {
    expect(formatPlatformStat(1240)).toMatch(/^1[.,]2k\+$/);
  });
});
