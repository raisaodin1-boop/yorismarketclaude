import { describe, it, expect } from "vitest";
import {
  requiresContractAcceptance,
  resolveSignupRole,
  validateIdentityFields,
} from "../../lib/authRegistration";

describe("useYorixAuth registration gates", () => {
  it("requires contracts for professional roles before acceptance", () => {
    expect(requiresContractAcceptance("seller", false)).toBe(true);
    expect(requiresContractAcceptance("provider", false)).toBe(true);
    expect(requiresContractAcceptance("delivery", false)).toBe(true);
    expect(requiresContractAcceptance("buyer", false)).toBe(false);
  });

  it("does not reopen the contract gate after explicit acceptance bypass", () => {
    expect(requiresContractAcceptance("seller", false, true)).toBe(false);
    expect(requiresContractAcceptance("seller", true, false)).toBe(false);
  });

  it("blocks Google pro signup without phone identity fields", () => {
    expect(validateIdentityFields({ nom: "Amina", tel: "" })).toMatch(/Téléphone/);
  });

  it("never grants a pro OAuth role without a pending attributed contract", () => {
    expect(resolveSignupRole("seller", false)).toBe("buyer");
    expect(resolveSignupRole("delivery", true)).toBe("delivery");
  });
});
