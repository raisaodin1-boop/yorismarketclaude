import { describe, expect, it } from "vitest";
import { formatProductDisplayName } from "../productDisplayName.js";

describe("formatProductDisplayName", () => {
  it("title-cases all-caps product names", () => {
    expect(formatProductDisplayName("POISSON FRAIS MACHOIRON")).toBe("Poisson Frais Machoiron");
  });

  it("leaves mixed-case names unchanged", () => {
    expect(formatProductDisplayName("Crabe frais de Kribi")).toBe("Crabe frais de Kribi");
  });

  it("handles empty input", () => {
    expect(formatProductDisplayName("")).toBe("");
    expect(formatProductDisplayName(null)).toBe("");
  });
});
