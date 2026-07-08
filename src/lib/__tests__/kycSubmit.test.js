import { describe, expect, it } from "vitest";
import { formatKycError, mergeExtraDocs } from "../kycSubmit.js";

describe("kycSubmit", () => {
  it("does not label session expiry as network error", () => {
    expect(formatKycError(new Error("JWT expired"))).toMatch(/Session expirée/i);
    expect(formatKycError({ code: "SESSION_EXPIRED" })).toMatch(/Session expirée/i);
  });

  it("does not label upload timeout as generic network", () => {
    const msg = formatKycError(new Error("The operation timed out"));
    expect(msg).toMatch(/trop de temps/i);
    expect(msg).not.toMatch(/vérifiez votre réseau/i);
  });

  it("mergeExtraDocs dedupes by url", () => {
    const merged = mergeExtraDocs(
      [{ type: "rccm", url: "http://a", label: "A" }],
      [{ type: "rccm", url: "http://a", label: "A dup" }, { type: "legal_doc", url: "http://b" }],
    );
    expect(merged).toHaveLength(2);
  });
});
