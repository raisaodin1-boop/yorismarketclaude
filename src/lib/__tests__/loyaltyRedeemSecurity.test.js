// @vitest-environment node
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it, vi, beforeEach } from "vitest";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..", "..");
const migration = readFileSync(
  resolve(root, "supabase/migrations/20260805120000_lock_loyalty_points_and_redemptions.sql"),
  "utf8",
);

const rpcMock = vi.fn();
vi.mock("../supabase", () => ({
  supabase: {
    rpc: (...args) => rpcMock(...args),
  },
}));

describe("loyalty points and redemption lock migration", () => {
  it("guards profile loyalty balance columns from direct client updates", () => {
    expect(migration).toContain("fn_guard_profile_loyalty_fields");
    expect(migration).toContain("trg_guard_profile_loyalty_fields");
    expect(migration).toContain("NEW.points IS DISTINCT FROM OLD.points");
    expect(migration).toContain("NEW.points_total_gagnes IS DISTINCT FROM OLD.points_total_gagnes");
    expect(migration).toContain("NEW.points_level IS DISTINCT FROM OLD.points_level");
    expect(migration).toContain("public.is_trusted_security_writer()");
  });

  it("removes open loyalty_redemptions insert-own and requires admin or RPC", () => {
    expect(migration).toContain("DROP POLICY IF EXISTS loyalty_redemptions_insert_own");
    expect(migration).toContain("loyalty_redemptions_insert_admin");
    expect(migration).toContain("WITH CHECK (public.is_platform_admin())");
    expect(migration).not.toMatch(
      /CREATE POLICY loyalty_redemptions_insert_own[\s\S]*WITH CHECK \(user_id = auth\.uid\(\)\)/,
    );
  });

  it("exposes redeem_loyalty_reward that checks catalog cost and balance", () => {
    expect(migration).toContain("CREATE OR REPLACE FUNCTION public.redeem_loyalty_reward(p_reward_id uuid)");
    expect(migration).toContain("SECURITY DEFINER");
    expect(migration).toContain("FROM public.loyalty_rewards");
    expect(migration).toContain("v_points < v_cost");
    expect(migration).toContain("PERFORM public.add_loyalty_points(");
    expect(migration).toContain("INSERT INTO public.loyalty_redemptions");
    expect(migration).toContain("GRANT EXECUTE ON FUNCTION public.redeem_loyalty_reward(uuid) TO authenticated");
  });

  it("revokes direct client execute on add_loyalty_points", () => {
    expect(migration).toContain("p.proname = 'add_loyalty_points'");
    expect(migration).toContain(
      "REVOKE ALL ON FUNCTION %s FROM PUBLIC, anon, authenticated",
    );
  });

  it("locks loyalty_rewards writes to platform admins", () => {
    expect(migration).toContain("loyalty_rewards_admin_all");
    expect(migration).toContain("ON public.loyalty_rewards FOR ALL TO authenticated");
    expect(migration).toContain("USING (public.is_platform_admin())");
  });
});

describe("redeemLoyaltyReward client helper", () => {
  beforeEach(() => {
    rpcMock.mockReset();
  });

  it("calls redeem_loyalty_reward and maps a successful response", async () => {
    rpcMock.mockResolvedValue({
      data: {
        success: true,
        code: "YX-ABC",
        id: "r1",
        points_spent: 500,
        reward_nom: "Bon 5k",
      },
      error: null,
    });

    const { redeemLoyaltyReward } = await import("../loyaltyRedeemApi.js");
    const result = await redeemLoyaltyReward("reward-1");

    expect(rpcMock).toHaveBeenCalledWith("redeem_loyalty_reward", {
      p_reward_id: "reward-1",
    });
    expect(result).toEqual({
      ok: true,
      code: "YX-ABC",
      id: "r1",
      pointsSpent: 500,
      rewardNom: "Bon 5k",
    });
  });

  it("surfaces RPC and business errors without minting a local code", async () => {
    rpcMock.mockResolvedValueOnce({
      data: null,
      error: { message: "permission denied" },
    });

    const { redeemLoyaltyReward } = await import("../loyaltyRedeemApi.js");
    await expect(redeemLoyaltyReward("reward-1")).resolves.toEqual({
      ok: false,
      error: "permission denied",
    });

    rpcMock.mockResolvedValueOnce({
      data: { success: false, error: "Solde insuffisant" },
      error: null,
    });
    await expect(redeemLoyaltyReward("reward-1")).resolves.toEqual({
      ok: false,
      error: "Solde insuffisant",
    });
  });
});
