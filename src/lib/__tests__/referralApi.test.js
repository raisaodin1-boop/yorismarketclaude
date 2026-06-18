import { describe, it, expect, beforeEach, vi } from "vitest";

const { from } = vi.hoisted(() => ({
  from: vi.fn(),
}));

vi.mock("../supabase.js", () => ({
  supabase: {
    from,
  },
}));

function referrerLookup(result) {
  const builder = {};
  builder.select = vi.fn(() => builder);
  builder.eq = vi.fn(() => builder);
  builder.not = vi.fn(() => builder);
  builder.maybeSingle = vi.fn().mockResolvedValue(result);
  return builder;
}

function profileUpdate(result) {
  const builder = {};
  builder.update = vi.fn(() => builder);
  builder.eq = vi.fn().mockResolvedValue(result);
  return builder;
}

describe("referralApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a pending referral bonus with upsert when applying a valid code", async () => {
    const lookup = referrerLookup({ data: { id: "referrer-1" }, error: null });
    const update = profileUpdate({ error: null });
    const bonuses = {
      upsert: vi.fn().mockResolvedValue({ error: null }),
    };

    from
      .mockReturnValueOnce(lookup)
      .mockReturnValueOnce(update)
      .mockReturnValueOnce(bonuses);

    const { applyReferralCode, REFERRAL_BONUS_AMOUNT } = await import("../referralApi.js");
    const result = await applyReferralCode("ABC123", "new-user-1");

    expect(result).toEqual({ ok: true, referrerId: "referrer-1" });
    expect(update.update).toHaveBeenCalledWith({ referrer_id: "referrer-1" });
    expect(bonuses.upsert).toHaveBeenCalledWith({
      referrer_id: "referrer-1",
      referred_id: "new-user-1",
      bonus_amount: REFERRAL_BONUS_AMOUNT,
      status: "pending",
    }, { onConflict: "referred_id", ignoreDuplicates: true });
  });

  it("does not create a bonus when linking the referrer fails", async () => {
    const lookup = referrerLookup({ data: { id: "referrer-1" }, error: null });
    const update = profileUpdate({ error: new Error("RLS denied") });

    from
      .mockReturnValueOnce(lookup)
      .mockReturnValueOnce(update);

    const { applyReferralCode } = await import("../referralApi.js");
    const result = await applyReferralCode("ABC123", "new-user-1");

    expect(result).toEqual({ ok: false, error: "Impossible de lier le parrain." });
    expect(from).not.toHaveBeenCalledWith("referral_bonuses");
  });
});
