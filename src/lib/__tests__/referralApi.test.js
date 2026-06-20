import { describe, it, expect, beforeEach, vi } from "vitest";

const rpc = vi.fn();

vi.mock("../supabase.js", () => ({
  supabase: {
    rpc,
  },
}));

describe("referralApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("applies referral codes through the server-side RPC", async () => {
    const { applyReferralCode } = await import("../referralApi.js");
    const result = { ok: true, referrerId: "referrer-1", bonusId: "bonus-1" };
    rpc.mockResolvedValueOnce({ data: result, error: null });

    await expect(applyReferralCode(" k7mn3p ", "user-1")).resolves.toEqual(result);

    expect(rpc).toHaveBeenCalledWith("apply_referral_code", {
      p_referral_code: "K7MN3P",
      p_new_user_id: "user-1",
    });
  });

  it("credits referral bonuses through the server-side RPC", async () => {
    const { creditReferralBonusIfEligible } = await import("../referralApi.js");
    const result = { ok: true, credited: true, amount: 5000 };
    rpc.mockResolvedValueOnce({ data: result, error: null });

    await expect(creditReferralBonusIfEligible("user-1", "YORIX-12345678")).resolves.toEqual(result);

    expect(rpc).toHaveBeenCalledWith("credit_referral_bonus_if_eligible", {
      p_user_id: "user-1",
      p_order_id: "YORIX-12345678",
    });
  });

  it("throws RPC errors so callers can decide whether to ignore them", async () => {
    const { creditReferralBonusIfEligible } = await import("../referralApi.js");
    const error = new Error("rls");
    rpc.mockResolvedValueOnce({ data: null, error });

    await expect(creditReferralBonusIfEligible("user-1", "YORIX-12345678")).rejects.toThrow("rls");
  });

  it("does not call Supabase when the user id is missing", async () => {
    const { creditReferralBonusIfEligible } = await import("../referralApi.js");

    await expect(creditReferralBonusIfEligible("", "YORIX-12345678")).resolves.toEqual({
      ok: false,
      credited: false,
      reason: "missing_user",
    });
    expect(rpc).not.toHaveBeenCalled();
  });
});
