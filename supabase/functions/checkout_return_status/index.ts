import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, ok } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return ok({ error: "Method not allowed" }, { status: 405 });

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    if (!token || !anonKey || !supabaseUrl) {
      return ok({ error: "Session requise" }, { status: 401 });
    }

    const anon = createClient(supabaseUrl, anonKey);
    const { data: { user }, error: authErr } = await anon.auth.getUser(token);
    if (authErr || !user?.id) {
      return ok({ error: "Session invalide ou expirée" }, { status: 401 });
    }

    const body = await req.json();
    const transactionRef = String(body?.transaction_ref || "").trim();
    if (!transactionRef || !transactionRef.startsWith("YRXPAY-")) {
      return ok({ error: "transaction_ref invalide" }, { status: 400 });
    }

    const supabase = createClient(
      supabaseUrl,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
    );

    const { data: tx, error: txError } = await supabase
      .from("payment_transactions")
      .select("*")
      .eq("provider", "cinetpay")
      .eq("provider_ref", transactionRef)
      .maybeSingle();
    if (txError) throw txError;
    if (!tx) return ok({ error: "Transaction introuvable" }, { status: 404 });

    const intentId = String(tx.checkout_intent_id || "");
    if (intentId) {
      const { data: intent, error: intErr } = await supabase
        .from("checkout_intents")
        .select("customer_id")
        .eq("id", intentId)
        .maybeSingle();
      if (intErr) throw intErr;
      const cid = intent?.customer_id as string | null | undefined;
      if (cid && cid !== user.id) {
        return ok({ error: "Accès refusé" }, { status: 403 });
      }
    }

    const orderGroupId = String(tx.order_group_id || "");
    const { data: orders, error: ordErr } = await supabase
      .from("orders")
      .select("id, client_id")
      .eq("order_group_id", orderGroupId);
    if (ordErr) throw ordErr;
    if (!(orders?.length)) {
      return ok({ error: "Aucune commande pour ce paiement" }, { status: 404 });
    }
    for (const row of orders || []) {
      const cid = row.client_id as string | null | undefined;
      if (cid && cid !== user.id) {
        return ok({ error: "Accès refusé" }, { status: 403 });
      }
    }

    const CINETPAY_API_KEY = Deno.env.get("CINETPAY_API_KEY");
    const CINETPAY_SITE_ID = Deno.env.get("CINETPAY_SITE_ID");
    let payStatus = String(tx.status || "pending");

    if (
      payStatus === "pending" && CINETPAY_API_KEY && CINETPAY_SITE_ID
    ) {
      const verifyResp = await fetch("https://api-checkout.cinetpay.com/v2/payment/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apikey: CINETPAY_API_KEY,
          site_id: CINETPAY_SITE_ID,
          transaction_id: transactionRef,
        }),
      });
      const verifyJson = await verifyResp.json();
      const paymentStatus = String(
        verifyJson?.data?.status ?? "",
      ).toUpperCase();
      const finalStatus = paymentStatus === "ACCEPTED" ? "paid" : "failed";

      await supabase
        .from("payment_transactions")
        .update({
          status: finalStatus,
          payload: verifyJson,
          updated_at: new Date().toISOString(),
        })
        .eq("id", tx.id);

      if (finalStatus === "paid" && orderGroupId) {
        await supabase
          .from("orders")
          .update({
            payment_status: "paid",
            escrow_status: "securise",
            payment_provider: "cinetpay",
            provider_tx_ref: transactionRef,
            status: "validee",
          })
          .eq("order_group_id", orderGroupId);
      }

      payStatus = finalStatus;
    }

    const { data: freshTx } = await supabase
      .from("payment_transactions")
      .select("status,amount,currency,order_group_id,checkout_intent_id,provider_ref")
      .eq("id", tx.id)
      .maybeSingle();

    const orderIds = (orders || []).map((o) => String((o as { id: string }).id));
    const delivery_tracking: { order_id: string; code_suivi: string }[] = [];
    if (orderIds.length) {
      const { data: dels, error: dErr } = await supabase
        .from("deliveries")
        .select("order_id,code_suivi")
        .in("order_id", orderIds);
      if (dErr) throw dErr;
      for (const d of dels || []) {
        const row = d as { order_id?: string; code_suivi?: string };
        if (row.order_id && row.code_suivi) {
          delivery_tracking.push({
            order_id: row.order_id,
            code_suivi: row.code_suivi,
          });
        }
      }
    }

    return ok({
      payment_status: freshTx?.status ?? payStatus,
      amount: freshTx?.amount ?? tx.amount,
      currency: freshTx?.currency ?? tx.currency ?? "XAF",
      order_group_id: freshTx?.order_group_id ?? orderGroupId,
      checkout_intent_id: freshTx?.checkout_intent_id ?? intentId ?? null,
      provider_ref: freshTx?.provider_ref ?? transactionRef,
      delivery_tracking,
    });
  } catch (e) {
    return ok({ error: e instanceof Error ? e.message : "unknown error" }, { status: 500 });
  }
});
