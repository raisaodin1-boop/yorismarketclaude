/**
 * Idempotent CinetPay payment initiation.
 *
 * Without a claim, every `init_payment_cinetpay` call generated a fresh
 * `YRXPAY-…-${Date.now()}` transaction_id and opened a new provider session
 * before journaling. A lost HTTP response, double-submit, or "retry after
 * timeout" therefore created a second payable session for the same checkout.
 * The buyer can pay both sessions → money collected twice for one order.
 *
 * Flow (mirrors MoMo `api/_lib/momo_init.js`):
 *  1. Reuse an existing pending/paid journal that already has provider_ref
 *     (and a payment_url when still pending).
 *  2. Otherwise insert a pending claim (provider_ref NULL) under a unique
 *     partial index so concurrent POSTs cannot both proceed.
 *  3. Call CinetPay only after the claim is held; write provider_ref + payload
 *     on success, or mark the claim failed on provider error (releases slot).
 */

export type CinetPayTxRow = {
  id: string;
  status: string;
  provider_ref: string | null;
  checkout_intent_id?: string | null;
  order_group_id?: string | null;
  payload?: unknown;
  created_at?: string;
};

export type CinetPayInitResult =
  | {
      ok: true;
      reused: boolean;
      httpStatus: number;
      transaction_ref: string;
      payment_url: string | null;
      status: "pending" | "paid";
    }
  | {
      ok: false;
      httpStatus: number;
      error: string;
      details?: unknown;
    };

// Minimal supabase surface used by the helper (avoids pulling Deno URL types into tests).
export type CinetPaySupabase = {
  from: (table: string) => any;
};

export function isUniqueViolation(error: { code?: string; message?: string; details?: string } | null | undefined): boolean {
  const code = String(error?.code || "");
  const msg = String(error?.message || error?.details || "").toLowerCase();
  return code === "23505" || msg.includes("duplicate key") || msg.includes("unique constraint");
}

/** Prefer paid-with-ref, then pending-with-ref, then pending claim (null ref). */
export function pickReusableCinetPayTx(rows: CinetPayTxRow[] | null | undefined): CinetPayTxRow | null {
  if (!Array.isArray(rows) || rows.length === 0) return null;
  const paid = rows.find((row) => row.status === "paid" && row.provider_ref);
  if (paid) return paid;
  const pendingRef = rows.find((row) => row.status === "pending" && row.provider_ref);
  if (pendingRef) return pendingRef;
  const pendingClaim = rows.find((row) => row.status === "pending" && !row.provider_ref);
  return pendingClaim || null;
}

export function extractCinetPayPaymentUrl(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const data = (payload as { data?: { payment_url?: unknown } }).data;
  const url = data?.payment_url;
  return typeof url === "string" && url.length > 0 ? url : null;
}

export async function findActiveCinetPayTx(
  supabase: CinetPaySupabase,
  { checkoutIntentId = null, orderGroupId = null }: { checkoutIntentId?: string | null; orderGroupId?: string | null } = {},
): Promise<CinetPayTxRow | null> {
  if (!checkoutIntentId && !orderGroupId) return null;

  let query = supabase
    .from("payment_transactions")
    .select("id, status, provider_ref, checkout_intent_id, order_group_id, payload, created_at")
    .eq("provider", "cinetpay")
    .in("status", ["pending", "paid"]);

  if (checkoutIntentId) query = query.eq("checkout_intent_id", checkoutIntentId);
  else query = query.eq("order_group_id", orderGroupId);

  const { data, error } = await query.order("created_at", { ascending: false }).limit(20);
  if (error) throw error;

  const rows = Array.isArray(data) ? (data as CinetPayTxRow[]) : [];
  if (orderGroupId && checkoutIntentId) {
    const matched = rows.filter((row) => !row.order_group_id || row.order_group_id === orderGroupId);
    return pickReusableCinetPayTx(matched.length ? matched : rows);
  }
  return pickReusableCinetPayTx(rows);
}

export type CreateCinetPaySession = (txRef: string) => Promise<{
  paymentUrl: string | null;
  raw: unknown;
}>;

/**
 * Claim-or-reuse CinetPay initiation.
 *
 * `createPaymentSession` is injected so tests can assert a second call never
 * hits the provider.
 */
export async function initiateCinetPayPaymentIdempotent({
  supabase,
  createPaymentSession,
  checkoutIntentId,
  orderGroupId,
  amount,
  channel = "ALL",
  generateTxRef,
}: {
  supabase: CinetPaySupabase;
  createPaymentSession: CreateCinetPaySession;
  checkoutIntentId: string;
  orderGroupId: string;
  amount: number;
  channel?: string;
  generateTxRef?: () => string;
}): Promise<CinetPayInitResult> {
  if (typeof createPaymentSession !== "function") {
    throw new Error("createPaymentSession required");
  }

  let existing: CinetPayTxRow | null;
  try {
    existing = await findActiveCinetPayTx(supabase, { checkoutIntentId, orderGroupId });
  } catch (error) {
    return { ok: false, httpStatus: 500, error: error instanceof Error ? error.message : "lookup failed" };
  }

  if (existing?.provider_ref) {
    const paymentUrl = extractCinetPayPaymentUrl(existing.payload);
    if (existing.status === "paid") {
      return {
        ok: true,
        reused: true,
        httpStatus: 200,
        transaction_ref: existing.provider_ref,
        payment_url: paymentUrl,
        status: "paid",
      };
    }
    if (!paymentUrl) {
      // Session was opened / journaled without a recoverable URL. Opening a
      // second CinetPay session would allow a double payment — fail closed.
      return {
        ok: false,
        httpStatus: 500,
        error:
          "Paiement CinetPay déjà initié mais URL indisponible — ne réessayez pas, contactez le support",
      };
    }
    return {
      ok: true,
      reused: true,
      httpStatus: 200,
      transaction_ref: existing.provider_ref,
      payment_url: paymentUrl,
      status: "pending",
    };
  }

  if (existing && !existing.provider_ref) {
    return {
      ok: false,
      httpStatus: 409,
      error: "Paiement CinetPay déjà en cours d'initiation — réessayez dans un instant",
    };
  }

  const claimPayload = { channel, claimed_at: new Date().toISOString() };
  const { data: claim, error: claimErr } = await supabase
    .from("payment_transactions")
    .insert({
      checkout_intent_id: checkoutIntentId,
      order_group_id: orderGroupId,
      provider: "cinetpay",
      provider_ref: null,
      payment_method: "cinetpay",
      amount,
      currency: "XAF",
      status: "pending",
      channel,
      payload: claimPayload,
    })
    .select("id")
    .single();

  if (claimErr) {
    if (isUniqueViolation(claimErr)) {
      let raced: CinetPayTxRow | null;
      try {
        raced = await findActiveCinetPayTx(supabase, { checkoutIntentId, orderGroupId });
      } catch (error) {
        return { ok: false, httpStatus: 500, error: error instanceof Error ? error.message : "lookup failed" };
      }
      if (raced?.provider_ref) {
        const paymentUrl = extractCinetPayPaymentUrl(raced.payload);
        if (raced.status === "paid") {
          return {
            ok: true,
            reused: true,
            httpStatus: 200,
            transaction_ref: raced.provider_ref,
            payment_url: paymentUrl,
            status: "paid",
          };
        }
        if (paymentUrl) {
          return {
            ok: true,
            reused: true,
            httpStatus: 200,
            transaction_ref: raced.provider_ref,
            payment_url: paymentUrl,
            status: "pending",
          };
        }
      }
      return {
        ok: false,
        httpStatus: 409,
        error: "Paiement CinetPay déjà en cours d'initiation — réessayez dans un instant",
      };
    }
    return { ok: false, httpStatus: 500, error: claimErr.message || "claim failed" };
  }

  const txRef =
    typeof generateTxRef === "function"
      ? generateTxRef()
      : `YRXPAY-${orderGroupId}-${Date.now()}`;

  try {
    const { paymentUrl, raw } = await createPaymentSession(txRef);
    if (!paymentUrl) {
      throw new Error("CinetPay init: réponse sans payment_url");
    }

    const { error: updErr } = await supabase
      .from("payment_transactions")
      .update({
        provider_ref: txRef,
        payload: raw,
        updated_at: new Date().toISOString(),
      })
      .eq("id", claim.id);

    if (updErr) {
      // Provider session already exists — do NOT mark failed (would reopen the
      // unique slot and allow a second CinetPay session). Leave the null-ref
      // claim so further POSTs get 409 instead of double-charging.
      return {
        ok: false,
        httpStatus: 500,
        error:
          "Paiement initié chez CinetPay mais journal incomplet — ne réessayez pas, contactez le support",
      };
    }

    return {
      ok: true,
      reused: false,
      httpStatus: 200,
      transaction_ref: txRef,
      payment_url: paymentUrl,
      status: "pending",
    };
  } catch (error) {
    try {
      await supabase
        .from("payment_transactions")
        .update({
          status: "failed",
          payload: {
            ...claimPayload,
            error: error instanceof Error ? error.message : "cinetpay init failed",
            details: (error as { details?: unknown })?.details,
          },
          updated_at: new Date().toISOString(),
        })
        .eq("id", claim.id);
    } catch {
      /* best-effort */
    }
    const details = (error as { details?: unknown })?.details;
    return {
      ok: false,
      httpStatus: 400,
      error: error instanceof Error ? error.message : "CinetPay init failed",
      details,
    };
  }
}
