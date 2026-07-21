// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createClient: vi.fn(),
  initiatePayment: vi.fn(),
  checkStatus: vi.fn(),
}));

vi.mock("@supabase/supabase-js", () => ({ createClient: mocks.createClient }));
vi.mock("../../../api/_lib/paynote.js", () => ({
  initiatePaynoteMtnPayment: mocks.initiatePayment,
  checkPaynoteMtnStatus: mocks.checkStatus,
}));

import initiateLoyaltyPayment from "../../../api/momo-loyalty.js";
import checkLoyaltyPayment from "../../../api/momo-loyalty-status.js";

function queryReturning(result) {
  const query = {
    select: vi.fn(() => query),
    eq: vi.fn(() => query),
    update: vi.fn(() => query),
    maybeSingle: vi.fn().mockResolvedValue(result),
  };
  return query;
}

function responseRecorder() {
  return {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

describe("loyalty MoMo integrity", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_ANON_KEY = "anon";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service";
  });

  it("rejects client-controlled price and points before calling Paynote", async () => {
    const authClient = {
      auth: { getUser: vi.fn().mockResolvedValue({ data: { user: { id: "user-1" } }, error: null }) },
    };
    const purchaseQuery = queryReturning({
      data: {
        id: "11111111-1111-1111-1111-111111111111",
        user_id: "user-1",
        pack_id: "pack-1",
        prix_fcfa: 1,
        points: 999999,
        status: "pending",
        pack_nom: "Forged",
      },
      error: null,
    });
    const packQuery = queryReturning({
      data: {
        id: "pack-1",
        nom: "Découverte",
        points: 100,
        prix_fcfa: 2000,
        bonus_pct: 0,
        actif: true,
      },
      error: null,
    });
    const insert = vi.fn().mockResolvedValue({ error: null });
    const serviceClient = {
      from: vi.fn((table) => {
        if (table === "loyalty_pack_purchases") return purchaseQuery;
        if (table === "loyalty_packs") return packQuery;
        return { insert };
      }),
    };
    mocks.createClient.mockReturnValueOnce(authClient).mockReturnValueOnce(serviceClient);
    mocks.initiatePayment.mockResolvedValue({ messageId: "pay-1", raw: {} });
    const res = responseRecorder();

    await initiateLoyaltyPayment(
      {
        method: "POST",
        headers: { authorization: "Bearer token" },
        body: {
          purchase_id: "11111111-1111-1111-1111-111111111111",
          phone: "670000000",
        },
      },
      res,
    );

    expect(res.statusCode).toBe(409);
    expect(res.body.error).toMatch(/incohérent/);
    expect(mocks.initiatePayment).not.toHaveBeenCalled();
    expect(serviceClient.from).toHaveBeenCalledWith("loyalty_packs");
  });

  it("charges the catalog amount when the purchase snapshot matches", async () => {
    const authClient = {
      auth: { getUser: vi.fn().mockResolvedValue({ data: { user: { id: "user-1" } }, error: null }) },
    };
    const purchaseQuery = queryReturning({
      data: {
        id: "11111111-1111-1111-1111-111111111111",
        user_id: "user-1",
        pack_id: "pack-1",
        prix_fcfa: 5000,
        points: 330,
        status: "pending",
        pack_nom: "Populaire",
      },
      error: null,
    });
    const packQuery = queryReturning({
      data: {
        id: "pack-1",
        nom: "Populaire",
        points: 300,
        prix_fcfa: 5000,
        bonus_pct: 10,
        actif: true,
      },
      error: null,
    });
    const insert = vi.fn().mockResolvedValue({ error: null });
    const serviceClient = {
      from: vi.fn((table) => {
        if (table === "loyalty_pack_purchases") return purchaseQuery;
        if (table === "loyalty_packs") return packQuery;
        return { insert };
      }),
    };
    mocks.createClient.mockReturnValueOnce(authClient).mockReturnValueOnce(serviceClient);
    mocks.initiatePayment.mockResolvedValue({ messageId: "pay-1", raw: {} });
    const res = responseRecorder();

    await initiateLoyaltyPayment(
      {
        method: "POST",
        headers: { authorization: "Bearer token" },
        body: {
          purchase_id: "11111111-1111-1111-1111-111111111111",
          phone: "670000000",
        },
      },
      res,
    );

    expect(res.statusCode).toBe(200);
    expect(mocks.initiatePayment).toHaveBeenCalledWith(expect.objectContaining({ amount: 5000 }));
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({ amount: 5000, currency: "XAF" }));
  });

  it("reports a paid but incoherent purchase as pending credit", async () => {
    const authClient = {
      auth: { getUser: vi.fn().mockResolvedValue({ data: { user: { id: "user-1" } }, error: null }) },
    };
    const transactionQuery = queryReturning({
      data: {
        id: "tx-1",
        provider: "paynote_mtn",
        provider_ref: "pay-1",
        order_group_id: "LOYALTY-11111111-1111-1111-1111-111111111111",
        amount: 1,
        status: "pending",
      },
      error: null,
    });
    const purchaseQuery = queryReturning({
      data: { user_id: "user-1", status: "pending", points: 999999 },
      error: null,
    });
    const rpc = vi.fn().mockResolvedValue({
      data: { success: false, error: "Paiement non confirmé pour ce montant" },
      error: null,
    });
    const serviceClient = {
      from: vi.fn((table) => (table === "payment_transactions" ? transactionQuery : purchaseQuery)),
      rpc,
    };
    mocks.createClient.mockReturnValueOnce(authClient).mockReturnValueOnce(serviceClient);
    mocks.checkStatus.mockResolvedValue({ status: "SUCCESSFUL" });
    const res = responseRecorder();

    await checkLoyaltyPayment(
      {
        method: "GET",
        headers: { authorization: "Bearer token" },
        query: { reference_id: "pay-1" },
      },
      res,
    );

    expect(rpc).toHaveBeenCalledWith("credit_pack_purchase_from_payment", {
      p_purchase_id: "11111111-1111-1111-1111-111111111111",
      p_payment_ref: "pay-1",
    });
    expect(res.body).toEqual({
      status: "paid",
      credit_pending: true,
      error: "Paiement non confirmé pour ce montant",
    });
  });

  it("retries credit validation when the transaction is already marked paid", async () => {
    const authClient = {
      auth: { getUser: vi.fn().mockResolvedValue({ data: { user: { id: "user-1" } }, error: null }) },
    };
    const transactionQuery = queryReturning({
      data: {
        id: "tx-1",
        provider: "paynote_mtn",
        provider_ref: "pay-1",
        order_group_id: "LOYALTY-11111111-1111-1111-1111-111111111111",
        amount: 2000,
        status: "paid",
      },
      error: null,
    });
    const purchaseQuery = queryReturning({
      data: { user_id: "user-1", status: "pending", points: 100 },
      error: null,
    });
    const rpc = vi.fn().mockResolvedValue({
      data: { success: true, points_credited: 100 },
      error: null,
    });
    const serviceClient = {
      from: vi.fn((table) => (table === "payment_transactions" ? transactionQuery : purchaseQuery)),
      rpc,
    };
    mocks.createClient.mockReturnValueOnce(authClient).mockReturnValueOnce(serviceClient);
    const res = responseRecorder();

    await checkLoyaltyPayment(
      {
        method: "GET",
        headers: { authorization: "Bearer token" },
        query: { reference_id: "pay-1" },
      },
      res,
    );

    expect(mocks.checkStatus).not.toHaveBeenCalled();
    expect(rpc).toHaveBeenCalledOnce();
    expect(res.body).toEqual({ status: "paid", points_credited: 100 });
  });
});
