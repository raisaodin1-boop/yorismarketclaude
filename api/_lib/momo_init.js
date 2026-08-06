/*
 * Idempotent MTN MoMo (Paynote) initiation.
 *
 * Without a claim, every POST /api/momo (or /api/momo-loyalty) called Paynote
 * before journaling. A lost HTTP response or double-submit therefore created
 * a second provider charge for the same checkout intent / loyalty purchase —
 * money collected twice while fulfillment only needs one paid tx.
 *
 * Flow:
 *  1. Reuse an existing pending/paid journal that already has provider_ref.
 *  2. Otherwise insert a pending claim (provider_ref NULL) under a unique
 *     partial index so concurrent POSTs cannot both proceed.
 *  3. Call Paynote only after the claim is held; write provider_ref on success
 *     or mark the claim failed on provider error (releases the unique slot).
 */

export function isUniqueViolation(error) {
  const code = String(error?.code || "");
  const msg = String(error?.message || error?.details || "").toLowerCase();
  return code === "23505" || msg.includes("duplicate key") || msg.includes("unique constraint");
}

/**
 * Latest in-flight or completed MoMo journal for a checkout intent and/or
 * order group (loyalty uses order_group_id = LOYALTY-<purchaseId>).
 */
export async function findActiveMomoTx(supabase, { checkoutIntentId = null, orderGroupId = null } = {}) {
  if (!checkoutIntentId && !orderGroupId) return null;

  let query = supabase
    .from("payment_transactions")
    .select("id, status, provider_ref, checkout_intent_id, order_group_id, created_at")
    .eq("provider", "paynote_mtn")
    .in("status", ["pending", "paid"]);

  if (checkoutIntentId) query = query.eq("checkout_intent_id", checkoutIntentId);
  else query = query.eq("order_group_id", orderGroupId);

  const { data, error } = await query.order("created_at", { ascending: false }).limit(20);
  if (error) throw error;

  const rows = Array.isArray(data) ? data : [];
  if (orderGroupId && checkoutIntentId) {
    // Intent lookup already applied; keep rows that match the order group when set.
    const matched = rows.filter((row) => !row.order_group_id || row.order_group_id === orderGroupId);
    return pickReusableMomoTx(matched.length ? matched : rows);
  }
  return pickReusableMomoTx(rows);
}

/** Prefer paid-with-ref, then pending-with-ref, then pending claim (null ref). */
export function pickReusableMomoTx(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return null;
  const paid = rows.find((row) => row.status === "paid" && row.provider_ref);
  if (paid) return paid;
  const pendingRef = rows.find((row) => row.status === "pending" && row.provider_ref);
  if (pendingRef) return pendingRef;
  const pendingClaim = rows.find((row) => row.status === "pending" && !row.provider_ref);
  return pendingClaim || null;
}

/**
 * Claim-or-reuse Paynote initiation.
 *
 * `initiatePayment` is injected (defaults to Paynote) so tests can assert
 * that a second call never hits the provider.
 */
export async function initiateMomoPaymentIdempotent({
  supabase,
  initiatePayment,
  checkoutIntentId = null,
  orderGroupId = null,
  amount,
  currency = "XAF",
  phone,
  extraPayload = {},
  paynoteArgs,
}) {
  if (typeof initiatePayment !== "function") {
    throw new Error("initiatePayment required");
  }

  let existing;
  try {
    existing = await findActiveMomoTx(supabase, { checkoutIntentId, orderGroupId });
  } catch (error) {
    return { ok: false, httpStatus: 500, error: error.message };
  }

  if (existing?.provider_ref) {
    return {
      ok: true,
      reused: true,
      httpStatus: 200,
      reference_id: existing.provider_ref,
      status: existing.status === "paid" ? "paid" : "pending",
    };
  }

  if (existing && !existing.provider_ref) {
    return {
      ok: false,
      httpStatus: 409,
      error: "Paiement MoMo déjà en cours d'initiation — réessayez dans un instant",
    };
  }

  const claimPayload = { phone, ...extraPayload };
  const { data: claim, error: claimErr } = await supabase
    .from("payment_transactions")
    .insert({
      checkout_intent_id: checkoutIntentId,
      order_group_id: orderGroupId,
      provider: "paynote_mtn",
      provider_ref: null,
      payment_method: "mtn_momo",
      amount,
      currency,
      status: "pending",
      channel: "momo",
      payload: claimPayload,
    })
    .select("id")
    .single();

  if (claimErr) {
    if (isUniqueViolation(claimErr)) {
      let raced;
      try {
        raced = await findActiveMomoTx(supabase, { checkoutIntentId, orderGroupId });
      } catch (error) {
        return { ok: false, httpStatus: 500, error: error.message };
      }
      if (raced?.provider_ref) {
        return {
          ok: true,
          reused: true,
          httpStatus: 200,
          reference_id: raced.provider_ref,
          status: raced.status === "paid" ? "paid" : "pending",
        };
      }
      return {
        ok: false,
        httpStatus: 409,
        error: "Paiement MoMo déjà en cours d'initiation — réessayez dans un instant",
      };
    }
    return { ok: false, httpStatus: 500, error: claimErr.message };
  }

  try {
    const { messageId, raw } = await initiatePayment(paynoteArgs);
    if (!messageId) {
      throw new Error("Paynote webpayment: réponse sans MessageId");
    }

    const { error: updErr } = await supabase
      .from("payment_transactions")
      .update({
        provider_ref: messageId,
        payload: { ...claimPayload, paynote: raw },
        updated_at: new Date().toISOString(),
      })
      .eq("id", claim.id);

    if (updErr) {
      // Provider already charged — do NOT mark failed (would reopen the unique
      // slot and allow a second Paynote call). Leave the null-ref claim so
      // further POSTs get 409 instead of double-charging.
      return {
        ok: false,
        httpStatus: 500,
        error:
          "Paiement initié chez l'opérateur mais journal incomplet — ne réessayez pas, contactez le support",
      };
    }

    return {
      ok: true,
      reused: false,
      httpStatus: 200,
      reference_id: messageId,
      status: "pending",
    };
  } catch (error) {
    try {
      await supabase
        .from("payment_transactions")
        .update({
          status: "failed",
          payload: { ...claimPayload, error: error.message },
          updated_at: new Date().toISOString(),
        })
        .eq("id", claim.id);
    } catch {
      /* best-effort */
    }
    return { ok: false, httpStatus: 502, error: error.message };
  }
}
