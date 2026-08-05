import { supabase } from "./supabase";

/**
 * Exchange a catalog loyalty reward for a validated redemption code.
 * Server-side RPC enforces catalog price + balance debit atomically.
 */
export async function redeemLoyaltyReward(rewardId) {
  if (!rewardId) {
    return { ok: false, error: "Récompense invalide" };
  }

  const { data, error } = await supabase.rpc("redeem_loyalty_reward", {
    p_reward_id: rewardId,
  });

  if (error) {
    return { ok: false, error: error.message || "Échange impossible" };
  }

  if (!data?.success) {
    return { ok: false, error: data?.error || "Échange impossible" };
  }

  return {
    ok: true,
    code: data.code,
    id: data.id,
    pointsSpent: data.points_spent,
    rewardNom: data.reward_nom,
  };
}
