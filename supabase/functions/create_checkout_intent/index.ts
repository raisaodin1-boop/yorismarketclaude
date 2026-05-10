import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, ok } from "../_shared/cors.ts";
import { applyCatalogPricing } from "../_shared/catalog_prices.ts";
import { computeCheckoutTotals, resolveDeliveryPolicy } from "../_shared/delivery_policy.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return ok({ error: "Method not allowed" }, { status: 405 });

  try {
    const body = await req.json();
    const itemsRaw = Array.isArray(body?.items) ? body.items : [];
    if (!itemsRaw.length) return ok({ error: "Cart is empty" }, { status: 400 });

    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabase = createClient(supabaseUrl, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "");

    const customerId = body?.customer?.id || null;
    if (customerId) {
      const authHeader = req.headers.get("Authorization") ?? "";
      const token = authHeader.replace(/^Bearer\s+/i, "").trim();
      if (!token) {
        return ok({ error: "Authorization requise pour ce panier." }, { status: 401 });
      }
      const anon = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY") || "");
      const { data: { user }, error: authErr } = await anon.auth.getUser(token);
      if (authErr || !user || user.id !== customerId) {
        return ok({ error: "Session invalide ou compte différent du client." }, { status: 403 });
      }
    }

    const priceRes = await applyCatalogPricing(supabase, itemsRaw);
    if (priceRes.error) return ok({ error: priceRes.error }, { status: 400 });
    const items = priceRes.lines;
    const bodyAuthoritative = {
      ...body,
      items,
    };

    const policy = await resolveDeliveryPolicy(supabase);
    const totals = computeCheckoutTotals(items, policy);

    const { data, error } = await supabase
      .from("checkout_intents")
      .insert({
        customer_id: customerId,
        payload: bodyAuthoritative,
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
