import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, ok } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return ok({ error: "Method not allowed" }, { status: 405 });

  try {
    const body = await req.json();
    const items = Array.isArray(body?.items) ? body.items : [];
    if (!items.length) return ok({ error: "Cart is empty" }, { status: 400 });

    const subtotal = items.reduce((sum: number, item: any) => {
      return sum + Number(item.price || 0) * Number(item.qty || 1);
    }, 0);
    const hasProduct = items.some((i: any) => i.kind === "product");
    const deliveryFee = hasProduct && subtotal < 50000 ? 1500 : 0;
    const total = subtotal + deliveryFee;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    const { data, error } = await supabase
      .from("checkout_intents")
      .insert({
        customer_id: body?.customer?.id || null,
        payload: body,
        checkout_type: body?.checkoutType || "product_only",
        status: "ready",
        subtotal,
        delivery_fee: deliveryFee,
        total,
      })
      .select("id, checkout_type, subtotal, delivery_fee, total, status")
      .single();

    if (error) throw error;

    return ok({
      checkout_intent_id: data.id,
      checkout_type: data.checkout_type,
      subtotal: data.subtotal,
      delivery_fee: data.delivery_fee,
      total: data.total,
      status: data.status,
    });
  } catch (e) {
    return ok({ error: e instanceof Error ? e.message : "unknown error" }, { status: 500 });
  }
});

