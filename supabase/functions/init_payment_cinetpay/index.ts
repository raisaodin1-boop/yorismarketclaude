import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, ok } from "../_shared/cors.ts";
import { initiateCinetPayPaymentIdempotent } from "../_shared/cinetpay_init.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return ok({ error: "Method not allowed" }, { status: 405 });

  try {
    const body = await req.json();
    const checkoutIntentId = String(body?.checkout_intent_id || "");
    const orderGroupId = String(body?.order_group_id || "");
    const amount = Number(body?.amount || 0);
    if (!checkoutIntentId || !orderGroupId || amount <= 0) {
      return ok({ error: "Missing checkout_intent_id/order_group_id/amount" }, { status: 400 });
    }

    const CINETPAY_API_KEY = Deno.env.get("CINETPAY_API_KEY");
    const CINETPAY_SITE_ID = Deno.env.get("CINETPAY_SITE_ID");
    const APP_BASE_URL = Deno.env.get("APP_BASE_URL") || "https://www.yorix.cm";
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
    if (!CINETPAY_API_KEY || !CINETPAY_SITE_ID) {
      return ok({ error: "Missing CinetPay credentials in env" }, { status: 500 });
    }
    if (!SUPABASE_URL) {
      return ok({ error: "Missing SUPABASE_URL for webhook URL" }, { status: 500 });
    }

    const supabase = createClient(
      SUPABASE_URL,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
    );

    // Validate amount against the server intent BEFORE opening a CinetPay
    // session — otherwise a mismatched client amount still creates a payable
    // provider transaction that can never be safely journaled.
    const { data: intent, error: intentErr } = await supabase
      .from("checkout_intents")
      .select("total")
      .eq("id", checkoutIntentId)
      .maybeSingle();
    if (intentErr) throw intentErr;
    if (!intent || Math.round(Number(intent.total ?? 0)) !== Math.round(amount)) {
      return ok(
        { error: "Amount does not match checkout total — reload and try again." },
        { status: 400 },
      );
    }

    const channel = body?.channel || "ALL";
    const result = await initiateCinetPayPaymentIdempotent({
      supabase,
      checkoutIntentId,
      orderGroupId,
      amount,
      channel,
      createPaymentSession: async (txRef) => {
        const payload = {
          apikey: CINETPAY_API_KEY,
          site_id: CINETPAY_SITE_ID,
          transaction_id: txRef,
          amount,
          currency: "XAF",
          description: `Yorix checkout ${orderGroupId}`,
          channels: channel,
          notify_url: `${SUPABASE_URL.replace(/\/$/, "")}/functions/v1/webhook_cinetpay`,
          return_url: `${APP_BASE_URL.replace(/\/$/, "")}/checkout?status=return&tx=${txRef}`,
          metadata: JSON.stringify({
            checkout_intent_id: checkoutIntentId,
            order_group_id: orderGroupId,
          }),
          customer_name: body?.customer_name || "Client Yorix",
          customer_phone_number: body?.customer_phone || "",
          customer_email: body?.customer_email || "support@yorix.cm",
        };

        const response = await fetch("https://api-checkout.cinetpay.com/v2/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const raw = await response.json();
        if (!response.ok || raw?.code !== "201") {
          const err = new Error("CinetPay init failed") as Error & { details?: unknown };
          err.details = raw;
          throw err;
        }
        return {
          paymentUrl: raw?.data?.payment_url || null,
          raw,
        };
      },
    });

    if (!result.ok) {
      return ok(
        { error: result.error, details: result.details },
        { status: result.httpStatus },
      );
    }

    return ok({
      transaction_ref: result.transaction_ref,
      payment_url: result.payment_url,
      provider: "cinetpay",
      status: result.status,
      reused: result.reused,
    });
  } catch (e) {
    return ok({ error: e instanceof Error ? e.message : "unknown error" }, { status: 500 });
  }
});
