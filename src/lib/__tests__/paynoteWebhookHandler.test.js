/** @vitest-environment node */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const settleMocks = vi.hoisted(() => ({
  extractPaynoteWebhookMessageId: vi.fn(),
  settlePaynoteMtnPayment: vi.fn(),
  createClient: vi.fn(() => ({})),
}));

vi.mock("../../../api/_lib/paynote_settle.js", () => ({
  extractPaynoteWebhookMessageId: settleMocks.extractPaynoteWebhookMessageId,
  settlePaynoteMtnPayment: settleMocks.settlePaynoteMtnPayment,
}));

vi.mock("@supabase/supabase-js", () => ({
  createClient: settleMocks.createClient,
}));

import handler from "../../../api/paynote-webhook.js";

function mockRes() {
  return {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
}

describe("api/paynote-webhook", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role";
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("is registered by momo init endpoints as notifUrl", () => {
    const momo = readFileSync(fileURLToPath(new URL("../../../api/momo.js", import.meta.url)), "utf8");
    const loyalty = readFileSync(
      fileURLToPath(new URL("../../../api/momo-loyalty.js", import.meta.url)),
      "utf8",
    );
    expect(momo).toContain("/api/paynote-webhook");
    expect(loyalty).toContain("/api/paynote-webhook");
  });

  it("ACKs missing MessageId without settling", async () => {
    settleMocks.extractPaynoteWebhookMessageId.mockReturnValue(null);
    const res = mockRes();
    await handler({ method: "POST", body: { status: "SUCCESSFUL" } }, res);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ handled: false, reason: "missing_message_id" });
    expect(settleMocks.settlePaynoteMtnPayment).not.toHaveBeenCalled();
  });

  it("returns 503 so Paynote retries while settlement is still pending", async () => {
    settleMocks.extractPaynoteWebhookMessageId.mockReturnValue("msg-1");
    settleMocks.settlePaynoteMtnPayment.mockResolvedValue({
      outcome: "pending",
      reason: "orders_unpaid",
    });
    const res = mockRes();
    await handler({ method: "POST", body: { MessageId: "msg-1" } }, res);
    expect(res.statusCode).toBe(503);
    expect(settleMocks.settlePaynoteMtnPayment).toHaveBeenCalledWith(expect.anything(), "msg-1");
  });

  it("ACKs verified paid settlements", async () => {
    settleMocks.extractPaynoteWebhookMessageId.mockReturnValue("msg-1");
    settleMocks.settlePaynoteMtnPayment.mockResolvedValue({ outcome: "paid" });
    const res = mockRes();
    await handler({ method: "POST", body: { MessageId: "msg-1" } }, res);
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ handled: true, status: "paid" });
  });

  it("rejects non-POST methods", async () => {
    const res = mockRes();
    await handler({ method: "GET", body: {} }, res);
    expect(res.statusCode).toBe(405);
  });
});
