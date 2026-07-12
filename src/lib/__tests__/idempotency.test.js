import { describe, expect, it, vi } from "vitest";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

describe("createCheckoutIdempotencyKey", () => {
  it("uses crypto.randomUUID when available", async () => {
    vi.resetModules();
    vi.stubGlobal("crypto", { randomUUID: () => "11111111-2222-3333-4444-555555555555" });
    const { createCheckoutIdempotencyKey } = await import("../idempotency.js");

    expect(createCheckoutIdempotencyKey()).toBe("11111111-2222-3333-4444-555555555555");

    vi.unstubAllGlobals();
  });

  it("falls back to a UUID-shaped key accepted by confirm_checkout", async () => {
    vi.resetModules();
    vi.stubGlobal("crypto", {});
    const { createCheckoutIdempotencyKey } = await import("../idempotency.js");

    expect(createCheckoutIdempotencyKey()).toMatch(UUID_RE);

    vi.unstubAllGlobals();
  });
});
