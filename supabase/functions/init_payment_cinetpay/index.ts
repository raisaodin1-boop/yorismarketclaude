import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, ok } from "../_shared/cors.ts";

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
    if (!CINETPAY_API_KEY || !CINETPAY_SITE_ID) {
      return ok({ error: "Missing CinetPay credentials in env" }, { status: 500 });
    }

    const txRef = `YRXPAY-${orderGroupId}-${Date.now()}`;
    const payload = {
      apikey: CINETPAY_API_KEY,
      site_id: CINETPAY_SITE_ID,
      transaction_id: txRef,
      amount,
      currency: "XAF",
      description: `Yorix checkout ${orderGroupId}`,
      channels: body?.channel || "ALL",
      notify_url: `${APP_BASE_URL}/functions/v1/webhook_cinetpay`,
      return_url: `${APP_BASE_URL}/checkout?status=return&tx=${txRef}`,
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
    const result = await response.json();
    if (!response.ok || result?.code !== "201") {
      return ok({ error: "CinetPay init failed", details: result }, { status: 400 });
    }

    const paymentUrl = result?.data?.payment_url || null;
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );
    await supabase.from("payment_transactions").insert({
      checkout_intent_id: checkoutIntentId,
      order_group_id: orderGroupId,
      provider: "cinetpay",
      provider_ref: txRef,
      payment_method: "cinetpay",
      amount,
      currency: "XAF",
      status: "pending",
      channel: body?.channel || "ALL",
      payload: result,
    });

    return ok({ transaction_ref: txRef, payment_url: paymentUrl, provider: "cinetpay" });
  } catch (e) {
    return ok({ error: e instanceof Error ? e.message : "unknown error" }, { status: 500 });
  }
});

