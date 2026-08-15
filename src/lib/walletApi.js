/**
 * Ensure the signed-in user has a zero-balance wallet.
 * Prefers the SECURITY DEFINER RPC (post-migration); falls back to a
 * constrained client insert that RLS will reject if solde != 0.
 */
export async function ensureZeroWallet(client, userId) {
  if (!client || !userId) return { ok: false, error: "missing user" };

  const { error: rpcError } = await client.rpc("fn_ensure_wallet");
  if (!rpcError) return { ok: true };

  const { error } = await client.from("wallets").insert({
    user_id: userId,
    solde: 0,
    total_gagne: 0,
    devise: "FCFA",
  });

  if (!error) return { ok: true };
  const msg = error.message || "";
  if (/duplicate|unique|already exists/i.test(msg)) return { ok: true };
  return { ok: false, error };
}
