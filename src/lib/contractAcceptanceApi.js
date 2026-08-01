import { buildContractAcceptanceRow } from "./authRegistration";

/**
 * Persist a legally attributable contract acceptance for an authenticated user.
 * Fails closed: callers must treat a returned error as blocking for pro signup.
 */
export async function recordContractAcceptance(client, userId, acceptance) {
  if (!client?.from) {
    return { error: new Error("Client Supabase indisponible.") };
  }
  let row;
  try {
    row = buildContractAcceptanceRow(userId, acceptance);
  } catch (error) {
    return { error };
  }

  const { error } = await client.from("user_contract_acceptance").insert(row);
  return { error: error || null };
}
