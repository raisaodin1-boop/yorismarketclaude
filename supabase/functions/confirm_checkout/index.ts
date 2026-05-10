import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, ok } from "../_shared/cors.ts";

function uuidish(v: string) {
  return /^[0-9a-fA-F-]{16,}$/.test(v);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return ok({ error: "Method not allowed" }, { status: 405 });

  try {
    const body = await req.json();
    const checkoutIntentId = String(body?.checkout_intent_id || "");
    if (!checkoutIntentId || !uuidish(checkoutIntentId)) {
      return ok({ error: "Invalid checkout_intent_id" }, { status: 400 });
    }

    const paymentMethod = String(body?.payment_method || "cinetpay");
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    const { data: intent, error: intentError } = await supabase
      .from("checkout_intents")
      .select("*")
      .eq("id", checkoutIntentId)
      .maybeSingle();
    if (intentError) throw intentError;
    if (!intent) return ok({ error: "Checkout intent not found" }, { status: 404 });

    const payload = intent.payload || {};
    const items = Array.isArray(payload.items) ? payload.items : [];
    const customer = payload.customer || {};
    const orderGroupId = `YORIX-${checkoutIntentId.slice(0, 8).toUpperCase()}`;

    const ordersCreated: any[] = [];
    for (const item of items) {
      if (item.kind === "service") {
        const { data: booking, error: bookingError } = await supabase
          .from("service_bookings")
          .insert({
            service_id: item.id,
            provider_id: item.provider_id || null,
            client_id: customer.id || null,
            client_nom: customer.nom || "Client Yorix",
            client_tel: customer.telephone || "",
            booking_date: item.booking?.date || null,
            booking_time: item.booking?.time || null,
            location_type: body?.location_type || item.booking?.locationType || "home",
            location_address: body?.address || customer.adresse || null,
            status: "reserved",
            notes: item.booking?.notes || null,
          })
          .select("id")
          .single();
        if (bookingError) throw bookingError;
        ordersCreated.push({ type: "service_booking", id: booking.id });
        continue;
      }

      const qty = Math.max(1, Number(item.qty || 1));
      const unitPrice = Number(item.price || 0);
      const gross = unitPrice * qty;
      const commission = Math.round(gross * 0.05);
      const net = gross - commission;

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          order_group_id: orderGroupId,
          product_id: item.id,
          client_id: customer.id || null,
          client_nom: customer.nom || "Client Yorix",
          telephone: customer.telephone || "",
          montant: gross,
          commission: commission,
          montant_vendeur: net,
          status: "pending",
          livraison_status: item.fulfillmentMode === "pickup" ? "pending_pickup" : "pending",
          escrow_status: "pending",
          payment_method: paymentMethod,
          payment_status: paymentMethod === "cod" ? "cod_pending" : "pending",
          payment_provider: paymentMethod === "cinetpay" ? "cinetpay" : "manual",
        })
        .select("id")
        .single();
      if (orderError) throw orderError;

      const { error: itemError } = await supabase.from("order_items").insert({
        order_id: order.id,
        item_kind: "product",
        product_id: item.id,
        quantity: qty,
        unit_price: unitPrice,
        subtotal: gross,
        fulfillment_mode: item.fulfillmentMode || "delivery",
        meta: { checkout_intent_id: checkoutIntentId },
      });
      if (itemError) throw itemError;

      ordersCreated.push({ type: "order", id: order.id });
    }

    await supabase.from("checkout_intents").update({ status: "confirmed" }).eq("id", checkoutIntentId);

    return ok({
      checkout_intent_id: checkoutIntentId,
      order_group_id: orderGroupId,
      created: ordersCreated,
    });
  } catch (e) {
    return ok({ error: e instanceof Error ? e.message : "unknown error" }, { status: 500 });
  }
});

