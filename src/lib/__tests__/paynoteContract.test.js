/** @vitest-environment node */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("Paynote MTN contract", () => {
  const env = globalThis.process.env;
  const originalEnv = { ...env };
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.resetModules();
    env.PAYNOTE_CLIENT_ID = "client-id";
    env.PAYNOTE_CLIENT_SECRET = "client-secret";
    env.PAYNOTE_CUSTOMER_KEY = "cust-key";
    env.PAYNOTE_CUSTOMER_SECRET = "cust-secret";
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    for (const key of Object.keys(env)) {
      if (!(key in originalEnv)) delete env[key];
    }
    Object.assign(env, originalEnv);
  });

  it("extractPaynoteMessageId prefers documented top-level MessageId", async () => {
    const { extractPaynoteMessageId } = await import("../../../api/_lib/paynote.js");
    const documented = {
      ErrorCode: 200,
      body: "Pay Request Accepted",
      parameters: {
        operation: "collection Mtn",
        amount: "1250",
        order_id: "12323312",
      },
      MessageId: "558ad7f3-25ff-4e89-8090-XXXX",
    };
    expect(extractPaynoteMessageId(documented)).toBe("558ad7f3-25ff-4e89-8090-XXXX");
  });

  it("extractPaynoteMessageId falls back to parameters.MessageId", async () => {
    const { extractPaynoteMessageId } = await import("../../../api/_lib/paynote.js");
    expect(
      extractPaynoteMessageId({
        ErrorCode: 200,
        parameters: { MessageId: "legacy-nested-id" },
      }),
    ).toBe("legacy-nested-id");
  });

  it("initiatePaynoteMtnPayment reads top-level MessageId from Paynote response", async () => {
    const calls = [];
    globalThis.fetch = vi.fn(async (url, init) => {
      calls.push({ url: String(url), body: init?.body });
      if (String(url).includes("oauth2/token")) {
        return {
          ok: true,
          json: async () => ({ access_token: "tok", expires_in: 300 }),
        };
      }
      return {
        ok: true,
        json: async () => ({
          ErrorCode: 200,
          body: "Pay Request Accepted",
          parameters: {
            operation: "collection Mtn",
            amount: "1000",
            order_id: "intent-1",
          },
          MessageId: "msg-top-level",
        }),
      };
    });

    const { initiatePaynoteMtnPayment } = await import("../../../api/_lib/paynote.js");
    const out = await initiatePaynoteMtnPayment({
      orderId: "intent-1",
      amount: 1000,
      subscriberMsisdn: "690000000",
      description: "test",
      notifUrl: "https://example.com/hook",
    });

    expect(out.messageId).toBe("msg-top-level");
    expect(calls.some((c) => c.url.includes("/prod/webpayment"))).toBe(true);
  });

  it("checkPaynoteMtnStatus uses webpaymentmtn/status without payment_method", async () => {
    const calls = [];
    globalThis.fetch = vi.fn(async (url, init) => {
      calls.push({ url: String(url), body: init?.body });
      if (String(url).includes("oauth2/token")) {
        return {
          ok: true,
          json: async () => ({ access_token: "tok", expires_in: 300 }),
        };
      }
      return {
        ok: true,
        json: async () => ({ status: "SUCCESSFUL" }),
      };
    });

    const { checkPaynoteMtnStatus } = await import("../../../api/_lib/paynote.js");
    const status = await checkPaynoteMtnStatus("msg-1");
    expect(status).toEqual({ status: "SUCCESSFUL" });

    const statusCall = calls.find((c) => c.url.includes("/status"));
    expect(statusCall?.url).toBe("https://omapi.ynote.africa/prod/webpaymentmtn/status");
    const body = JSON.parse(statusCall.body);
    expect(body).toEqual({
      customerkey: "cust-key",
      customersecret: "cust-secret",
      message_id: "msg-1",
    });
    expect(body).not.toHaveProperty("payment_method");
  });
});
