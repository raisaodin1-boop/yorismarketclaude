import { describe, expect, it } from "vitest";
import { requiresContractAcceptance } from "../useYorixAuth.js";

describe("requiresContractAcceptance", () => {
  it("requires contracts for professional roles before acceptance", () => {
    expect(requiresContractAcceptance("seller", false)).toBe(true);
    expect(requiresContractAcceptance("provider", false)).toBe(true);
    expect(requiresContractAcceptance("delivery", false)).toBe(true);
  });

  it("does not reopen the contract gate after explicit acceptance", () => {
    expect(requiresContractAcceptance("seller", false, true)).toBe(false);
    expect(requiresContractAcceptance("provider", true)).toBe(false);
    expect(requiresContractAcceptance("buyer", false)).toBe(false);
  });
});
