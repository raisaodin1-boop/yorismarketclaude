/** @vitest-environment node */
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  extractPaynoteWebhookMessageId,
  settlePaynoteMtnPayment,
} from "../../../api/_lib/paynote_settle.js";

vi.mock("../../../api/_lib/paynote.js", () => ({
  extractPaynoteMessageId: (data) => data?.MessageId || data?.parameters?.MessageId || null,
  checkPaynoteMtnStatus: vi.fn(),
}));

vi.mock("../../../api/_lib/momo_orders.js", () => ({
  ensureMomoOrdersPaid: vi.fn(),
}));

import { checkPaynoteMtnStatus } from "../../../api/_lib/paynote.js";
import { ensureMomoOrdersPaid } from "../../../api/_lib/momo_orders.js";

describe("extractPaynoteWebhookMessageId", () => {
  it("reads top-level MessageId (documented webpayment shape)", () => {
    expect(
      extractPaynoteWebhookMessageId({
        ErrorCode: 200,
        parameters: { order_id: "x" },
        MessageId: "msg-top",
      }),
    ).toBe("msg-top");
  });

  it("reads paymentRef and nested message JSON", () => {
    expect(extractPaynoteWebhookMessageId({ paymentRef: "ref-1" })).toBe("ref-1");
    expect(
      extractPaynoteWebhookMessageId({
        message: JSON.stringify({ MessageId: "from-nested-json" }),
      }),
    ).toBe("from-nested-json");
  });

  it("returns null when no id is present", () => {
    expect(extractPaynoteWebhookMessageId({ status: "SUCCESSFUL" })).toBeNull();
  });
});

describe("settlePaynoteMtnPayment", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function mockTxLookup(tx) {
    return {
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(function eq() {
            return this;
          }),
          maybeSingle: vi.fn().mockResolvedValue({ data: tx, error: null }),
        })),
        update: vi.fn(() => ({
          eq: vi.fn().mockResolvedValue({ error: null }),
        })),
      })),
      rpc: vi.fn().mockResolvedValue({ data: { points_credited: 100 }, error: null }),
    };
  }

  it("does not trust webhook-implied success without provider SUCCESSFUL", async () => {
    const supabase = mockTxLookup({
      id: "tx-1",
      status: "pending",
      order_group_id: "YORIX-ABC",
      checkout_intent_id: "intent-1",
    });
    checkPaynoteMtnStatus.mockResolvedValue({ status: "PENDING" });

    await expect(settlePaynoteMtnPayment(supabase, "msg-1")).resolves.toMatchObject({
      outcome: "pending",
      reason: "provider_pending",
    });
    expect(ensureMomoOrdersPaid).not.toHaveBeenCalled();
  });

  it("marks checkout orders paid after verified SUCCESSFUL", async () => {
    const supabase = mockTxLookup({
      id: "tx-1",
      status: "pending",
      order_group_id: "YORIX-ABC",
      checkout_intent_id: "intent-1",
    });
    checkPaynoteMtnStatus.mockResolvedValue({ status: "SUCCESSFUL" });
    ensureMomoOrdersPaid.mockResolvedValue({ ok: true, orderIds: ["o1"] });

    await expect(settlePaynoteMtnPayment(supabase, "msg-1")).resolves.toMatchObject({
      outcome: "paid",
    });
    expect(ensureMomoOrdersPaid).toHaveBeenCalledWith(supabase, {
      orderGroupId: "YORIX-ABC",
      referenceId: "msg-1",
    });
  });

  it("credits loyalty packs for LOYALTY- order groups", async () => {
    const supabase = mockTxLookup({
      id: "tx-2",
      status: "pending",
      order_group_id: "LOYALTY-purchase-9",
      checkout_intent_id: null,
    });
    checkPaynoteMtnStatus.mockResolvedValue({ status: "SUCCESSFUL" });

    await expect(settlePaynoteMtnPayment(supabase, "msg-loy")).resolves.toMatchObject({
      outcome: "paid",
    });
    expect(supabase.rpc).toHaveBeenCalledWith("credit_pack_purchase_from_payment", {
      p_purchase_id: "purchase-9",
      p_payment_ref: "msg-loy",
    });
    expect(ensureMomoOrdersPaid).not.toHaveBeenCalled();
  });

  it("returns not_found for unknown MessageId", async () => {
    const supabase = mockTxLookup(null);
    await expect(settlePaynoteMtnPayment(supabase, "missing")).resolves.toEqual({
      outcome: "not_found",
      reason: "transaction_not_found",
    });
  });
});
