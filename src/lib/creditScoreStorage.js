import { supabase } from "./supabase";
import { CREDIT_CONSENT_VERSION } from "./creditScore";

export async function fetchCreditConsent(userId) {
  if (!userId) return { consented: false, version: null, consentedAt: null };

  const { data, error } = await supabase
    .from("credit_score_consents")
    .select("consented_at, revoked_at, consent_version")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.warn("credit_score_consents:", error.message);
    return { consented: false, version: null, consentedAt: null };
  }

  const consented = Boolean(data?.consented_at && !data?.revoked_at);
  return {
    consented,
    version: data?.consent_version || null,
    consentedAt: data?.consented_at || null,
  };
}

export async function grantCreditConsent(userId) {
  const { error } = await supabase.from("credit_score_consents").upsert(
    {
      user_id: userId,
      consented_at: new Date().toISOString(),
      revoked_at: null,
      consent_version: CREDIT_CONSENT_VERSION,
    },
    { onConflict: "user_id" },
  );
  if (error) throw error;
  return fetchCreditConsent(userId);
}

export async function revokeCreditConsent(userId) {
  const { error } = await supabase
    .from("credit_score_consents")
    .update({ revoked_at: new Date().toISOString() })
    .eq("user_id", userId);
  if (error) throw error;
  return { consented: false, version: null, consentedAt: null };
}
