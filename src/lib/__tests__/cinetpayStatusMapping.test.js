// @vitest-environment node

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { mapCinetPayPaymentStatus } from "../../../supabase/functions/_shared/cinetpay_status.ts";

const returnStatusSource = readFileSync(
  fileURLToPath(new URL("../../../supabase/functions/checkout_return_status/index.ts", import.meta.url)),
  "utf8",
);
const webhookSource = readFileSync(
  fileURLToPath(new URL("../../../supabase/functions/webhook_cinetpay/index.ts", import.meta.url)),
  "utf8",
);

describe("mapCinetPayPaymentStatus", () => {
  it("maps only ACCEPTED to paid", () => {
    expect(mapCinetPayPaymentStatus("ACCEPTED")).toBe("paid");
    expect(mapCinetPayPaymentStatus("accepted")).toBe("paid");
  });

  it("maps documented terminal refusals to failed", () => {
    expect(mapCinetPayPaymentStatus("REFUSED")).toBe("failed");
    expect(mapCinetPayPaymentStatus("CANCELED")).toBe("failed");
    expect(mapCinetPayPaymentStatus("CANCELLED")).toBe("failed");
    expect(mapCinetPayPaymentStatus("REJECTED")).toBe("failed");
    expect(mapCinetPayPaymentStatus("FAILED")).toBe("failed");
    expect(mapCinetPayPaymentStatus("EXPIRED")).toBe("failed");
  });

  it("keeps pending/empty/unknown non-terminal so live charges are not frozen as failed", () => {
    expect(mapCinetPayPaymentStatus("")).toBe("pending");
    expect(mapCinetPayPaymentStatus(null)).toBe("pending");
    expect(mapCinetPayPaymentStatus(undefined)).toBe("pending");
    expect(mapCinetPayPaymentStatus("PENDING")).toBe("pending");
    expect(mapCinetPayPaymentStatus("WAITING_CUSTOMER_PAYMENT")).toBe("pending");
    expect(mapCinetPayPaymentStatus("PROCESSING")).toBe("pending");
  });
});

describe("CinetPay status wiring", () => {
  it("uses the shared mapper instead of treating every non-ACCEPTED status as failed", () => {
    expect(returnStatusSource).toContain('import { mapCinetPayPaymentStatus } from "../_shared/cinetpay_status.ts"');
    expect(webhookSource).toContain('import { mapCinetPayPaymentStatus } from "../_shared/cinetpay_status.ts"');
    expect(returnStatusSource).toContain("mapCinetPayPaymentStatus(verifyJson?.data?.status)");
    expect(webhookSource).toContain("mapCinetPayPaymentStatus(verify?.data?.status)");
    expect(returnStatusSource).not.toMatch(
      /paymentStatus === ["']ACCEPTED["'] \? ["']paid["'] : ["']failed["']/,
    );
    expect(webhookSource).not.toMatch(
      /paymentStatus === ["']ACCEPTED["'] \? ["']paid["'] : ["']failed["']/,
    );
  });

  it("does not default webhook verification to failed when credentials are missing", () => {
    expect(webhookSource).not.toMatch(/let finalStatus = ["']failed["']/);
    expect(webhookSource).toMatch(/if \(!CINETPAY_API_KEY \|\| !CINETPAY_SITE_ID\)/);
    expect(webhookSource).toMatch(/status: ["']pending["']/);
  });

  it("never downgrades an already-paid transaction from the webhook", () => {
    expect(webhookSource).toMatch(/if \(tx\.status === ["']paid["']\)/);
  });
});
