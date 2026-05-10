import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, ok } from "../_shared/cors.ts";
import { computeCheckoutTotals, resolveDeliveryPolicy } from "../_shared/delivery_policy.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return ok({ error: "Method not allowed" }, { status: 405 });

  try {
    const body = await req.json();
    const items = Array.isArray(body?.items) ? body.items : [];
    if (!items.length) return ok({ error: "Cart is empty" }, { status: 400 });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
    );

    const policy = await resolveDeliveryPolicy(supabase);
    const totals = computeCheckoutTotals(items, policy);

    const { data, error } = await supabase
      .from("checkout_intents")
      .insert({
        customer_id: body?.customer?.id || null,
        payload: body,
        checkout_type: body?.checkoutType || "product_only",
        status: "ready",
        subtotal: totals.subtotalFull,
        delivery_fee: totals.deliveryFee,
        total: totals.total,
      })
      .select(
        "id, checkout_type, subtotal, delivery_fee, total, status",
      )
      .single();

    if (error) throw error;

    return ok({
      checkout_intent_id: data.id,
      checkout_type: data.checkout_type,
      subtotal: data.subtotal,
      delivery_fee: data.delivery_fee,
      total: data.total,
      status: data.status,
      free_shipping_unlocked: totals.freeShippingUnlocked,
      shippable_products_subtotal: totals.shippableProductsSubtotal,
    });
  } catch (e) {
    return ok({ error: e instanceof Error ? e.message : "unknown error" }, { status: 500 });
  }
});
