import { describe, it, expect } from "vitest";

describe("cinetpayStatus", () => {
  it("treats only accepted/paid statuses as finalized", async () => {
    const { isCinetpayPaymentFinalized } = await import("../cinetpayStatus.js");

    expect(isCinetpayPaymentFinalized("paid")).toBe(true);
    expect(isCinetpayPaymentFinalized("ACCEPTED")).toBe(true);
    expect(isCinetpayPaymentFinalized("pending")).toBe(false);
    expect(isCinetpayPaymentFinalized("WAITING_FOR_CUSTOMER")).toBe(false);
    expect(isCinetpayPaymentFinalized("REFUSED")).toBe(false);
  });

  it("normalizes unknown provider statuses to pending instead of failed", async () => {
    const { normalizeCinetpayStatus } = await import("../cinetpayStatus.js");

    expect(normalizeCinetpayStatus("REFUSED")).toBe("failed");
    expect(normalizeCinetpayStatus("CANCELLED")).toBe("failed");
    expect(normalizeCinetpayStatus("")).toBe("pending");
    expect(normalizeCinetpayStatus("PROCESSING")).toBe("pending");
  });
});
