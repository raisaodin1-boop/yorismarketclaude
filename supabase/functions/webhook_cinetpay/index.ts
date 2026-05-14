import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, ok } from "../_shared/cors.ts";

function normalizeCinetPayCheckStatus(status: unknown): "paid" | "failed" | "pending" {
  const raw = String(status ?? "").trim().toUpperCase();
  if (raw === "ACCEPTED") return "paid";
  if (["REFUSED", "CANCELLED", "CANCELED", "DECLINED", "EXPIRED", "FAILED"].includes(raw)) {
    return "failed";
  }
  return "pending";
}

function mergePaymentStatus(currentStatus: unknown, checkedStatus: "paid" | "failed" | "pending") {
  const current = String(currentStatus || "pending").toLowerCase();
  if (current === "paid") return "paid";
  if (checkedStatus === "pending" && (current === "failed" || current === "paid")) return current;
  return checkedStatus;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return ok({ error: "Method not allowed" }, { status: 405 });

  try {
    const body = await req.json();
    const txRef = String(body?.cpm_trans_id || body?.transaction_id || "");
    if (!txRef) return ok({ error: "Missing transaction reference" }, { status: 400 });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    const { data: tx, error: txError } = await supabase
      .from("payment_transactions")
      .select("*")
      .eq("provider", "cinetpay")
      .eq("provider_ref", txRef)
      .maybeSingle();
    if (txError) throw txError;
    if (!tx) return ok({ received: true, ignored: "transaction not found" });

    // Optional verification step with CinetPay check endpoint.
    const CINETPAY_API_KEY = Deno.env.get("CINETPAY_API_KEY");
    const CINETPAY_SITE_ID = Deno.env.get("CINETPAY_SITE_ID");
    let finalStatus = String(tx.status || "pending").toLowerCase();
    let verifyPayload: unknown = null;
    if (CINETPAY_API_KEY && CINETPAY_SITE_ID) {
      const verifyResp = await fetch("https://api-checkout.cinetpay.com/v2/payment/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apikey: CINETPAY_API_KEY,
          site_id: CINETPAY_SITE_ID,
          transaction_id: txRef,
        }),
      });
      const verify = await verifyResp.json().catch(() => ({}));
      verifyPayload = verify;
      finalStatus = mergePaymentStatus(
        tx.status,
        verifyResp.ok ? normalizeCinetPayCheckStatus(verify?.data?.status) : "pending",
      );
    }

    await supabase
      .from("payment_transactions")
      .update({
        status: finalStatus,
        payload: { webhook: body, verify: verifyPayload },
        updated_at: new Date().toISOString(),
      })
      .eq("id", tx.id);

    if (finalStatus === "paid" && tx.order_group_id) {
      await supabase
        .from("orders")
        .update({
          payment_status: "paid",
          escrow_status: "securise",
          payment_provider: "cinetpay",
          provider_tx_ref: txRef,
          status: "validee",
        })
        .eq("order_group_id", tx.order_group_id);
    }

    return ok({ received: true, provider_ref: txRef, status: finalStatus });
  } catch (e) {
    return ok({ error: e instanceof Error ? e.message : "unknown error" }, { status: 500 });
  }
});

