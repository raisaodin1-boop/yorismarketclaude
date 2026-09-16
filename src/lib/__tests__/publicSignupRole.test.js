import { describe, expect, it } from "vitest";
import { publicSignupRole, ROLES_PUBLIC_SIGNUP } from "../roles.js";

describe("publicSignupRole", () => {
  it("allows the four public marketplace roles", () => {
    for (const role of ROLES_PUBLIC_SIGNUP) {
      expect(publicSignupRole(role)).toBe(role);
    }
  });

  it("clamps staff and unknown roles to buyer", () => {
    expect(publicSignupRole("admin")).toBe("buyer");
    expect(publicSignupRole("superadmin")).toBe("buyer");
    expect(publicSignupRole("admin_partner")).toBe("buyer");
    expect(publicSignupRole("")).toBe("buyer");
    expect(publicSignupRole(null)).toBe("buyer");
    expect(publicSignupRole("hack")).toBe("buyer");
  });
});
