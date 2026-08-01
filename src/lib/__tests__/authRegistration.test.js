import { describe, it, expect } from "vitest";
import {
  buildContractAcceptanceRow,
  clearPendingSignupArtifacts,
  PENDING_CONTRACT_KEY,
  PENDING_PROFILE_KEY,
  requiresContractAcceptance,
  resolveSignupRole,
  validateIdentityFields,
  validateRegistrationFields,
} from "../authRegistration";

describe("authRegistration", () => {
  it("requires a real phone number for identity fields", () => {
    expect(validateIdentityFields({ nom: "A", tel: "690000000" })).toBe(
      "Nom obligatoire (2 caractères minimum).",
    );
    expect(validateIdentityFields({ nom: "Amina", tel: "69000" })).toBe(
      "Téléphone obligatoire (9 chiffres minimum).",
    );
    expect(validateIdentityFields({ nom: "Amina", tel: "+237 690 00 00 00" })).toBeNull();
  });

  it("requires email and password for classic registration", () => {
    expect(
      validateRegistrationFields({
        nom: "Amina",
        tel: "690000000",
        email: "",
        password: "secret",
      }),
    ).toBe("Email obligatoire.");
  });

  it("gates professional roles until contract acceptance is explicit", () => {
    expect(requiresContractAcceptance("seller", false)).toBe(true);
    expect(requiresContractAcceptance("seller", true)).toBe(false);
    expect(requiresContractAcceptance("seller", false, true)).toBe(false);
    expect(requiresContractAcceptance("buyer", false)).toBe(false);
  });

  it("downgrades unattributed professional OAuth roles to buyer", () => {
    expect(resolveSignupRole("seller", false)).toBe("buyer");
    expect(resolveSignupRole("seller", true)).toBe("seller");
    expect(resolveSignupRole("buyer", false)).toBe("buyer");
  });

  it("refuses contract rows without an authenticated user id", () => {
    expect(() => buildContractAcceptanceRow(null, { fullName: "Amina" })).toThrow(/user_id/);
    expect(buildContractAcceptanceRow("uid-1", {
      fullName: "Amina",
      phone: "690000000",
      role: "seller",
      version: "v1.0",
      ip: "1.2.3.4",
      userAgent: "test",
    })).toMatchObject({
      user_id: "uid-1",
      full_name: "Amina",
      phone: "690000000",
      role: "seller",
    });
  });

  it("clears pending signup artifacts used across OAuth redirects", () => {
    const storage = {
      data: {
        [PENDING_PROFILE_KEY]: "{}",
        [PENDING_CONTRACT_KEY]: "{}",
      },
      removeItem(key) {
        delete this.data[key];
      },
    };
    clearPendingSignupArtifacts(storage);
    expect(storage.data[PENDING_PROFILE_KEY]).toBeUndefined();
    expect(storage.data[PENDING_CONTRACT_KEY]).toBeUndefined();
  });
});
