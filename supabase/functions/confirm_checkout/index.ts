import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, ok } from "../_shared/cors.ts";
import { applyCatalogPricing } from "../_shared/catalog_prices.ts";
import { insertAutoDelivery } from "../_shared/delivery_auto.ts";
import { computeCheckoutTotals, resolveDeliveryPolicy } from "../_shared/delivery_policy.ts";
import { dispatchNotificationById } from "../_shared/internal_dispatch.ts";

function uuidish(v: string) {
  return /^[0-9a-fA-F-]{16,}$/.test(v);
}

class CheckoutHttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function verifyIntentOwner(
  req: Request,
  supabaseUrl: string,
  customerId: unknown,
) {
  if (typeof customerId !== "string" || !uuidish(customerId)) return;

  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) {
    throw new CheckoutHttpError("Authorization requise pour confirmer ce panier.", 401);
  }

  const anon = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY") || "");
  const { data: { user }, error } = await anon.auth.getUser(token);
  if (error || !user || user.id !== customerId) {
    throw new CheckoutHttpError("Session invalide ou compte différent du client.", 403);
  }
}

async function cleanupCreatedCheckoutRows(
  supabase: ReturnType<typeof createClient>,
  orderIds: string[],
  serviceBookingIds: string[],
  stockAdjustments: { productId: string; qty: number }[],
): Promise<boolean> {
  let ok = true;
  if (orderIds.length) {
    const { error: itemErr } = await supabase.from("order_items").delete().in("order_id", orderIds);
    if (itemErr) {
      ok = false;
      console.error("[confirm_checkout] cleanup order_items:", itemErr.message);
    }

    const { error: deliveryErr } = await supabase.from("deliveries").delete().in("order_id", orderIds);
    if (deliveryErr) {
      ok = false;
      console.error("[confirm_checkout] cleanup deliveries:", deliveryErr.message);
    }

    const { error: orderErr } = await supabase.from("orders").delete().in("id", orderIds);
    if (orderErr) {
      ok = false;
      console.error("[confirm_checkout] cleanup orders:", orderErr.message);
    }
  }

  if (serviceBookingIds.length) {
    const { error: bookingErr } = await supabase
      .from("service_bookings")
      .delete()
      .in("id", serviceBookingIds);
    if (bookingErr) {
      ok = false;
      console.error("[confirm_checkout] cleanup service_bookings:", bookingErr.message);
    }
  }

  for (const stock of stockAdjustments) {
    const { error: restoreErr } = await supabase.rpc("increment_product_stock", {
      p_product_id: stock.productId,
      p_qty: stock.qty,
    });
    if (restoreErr) {
      ok = false;
      console.error(
        `[confirm_checkout] restore stock ${stock.productId}:`,
        restoreErr.message,
      );
    }
  }

  return ok;
}

async function insertNotificationAndDispatch(
  supabase: ReturnType<typeof createClient>,
  row: Record<string, unknown>,
) {
  const { data, error } = await supabase.from("notifications").insert(row).select("id").maybeSingle();
  if (error) {
    console.error("[confirm_checkout] notification insert:", error.message);
    return;
  }
  const id = data && typeof (data as { id?: unknown }).id !== "undefined"
    ? String((data as { id: string | number }).id)
    : "";
  if (!id) return;
  const r = await dispatchNotificationById(id);
  if (!r.ok) {
    console.error("[confirm_checkout] dispatch_notification", r.status, r.body);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return ok({ error: "Method not allowed" }, { status: 405 });

  let supabaseForCleanup: ReturnType<typeof createClient> | null = null;
  let claimedCheckoutIntentId = "";
  let confirmedIntent = false;
  const createdOrderIds: string[] = [];
  const createdServiceBookingIds: string[] = [];
  const appliedStockAdjustments: { productId: string; qty: number }[] = [];

  try {
    const body = await req.json();
    const checkoutIntentId = String(body?.checkout_intent_id || "");
    if (!checkoutIntentId || !uuidish(checkoutIntentId)) {
      return ok({ error: "Invalid checkout_intent_id" }, { status: 400 });
    }

    const paymentMethod = String(body?.payment_method || "cinetpay");
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabase = createClient(
      supabaseUrl,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );
    supabaseForCleanup = supabase;

    const { data: existingIntent, error: intentError } = await supabase
      .from("checkout_intents")
      .select("*")
      .eq("id", checkoutIntentId)
      .maybeSingle();
    if (intentError) throw intentError;
    if (!existingIntent) return ok({ error: "Checkout intent not found" }, { status: 404 });

    if (String(existingIntent.status || "") !== "ready") {
      const msg = existingIntent.status === "confirmed"
        ? "Checkout intent already confirmed"
        : "Checkout intent is already being processed";
      return ok({ error: msg }, { status: 409 });
    }

    await verifyIntentOwner(req, supabaseUrl, existingIntent.customer_id);

    const { data: intent, error: claimError } = await supabase
      .from("checkout_intents")
      .update({ status: "processing", updated_at: new Date().toISOString() })
      .eq("id", checkoutIntentId)
      .eq("status", "ready")
      .select("*")
      .maybeSingle();
    if (claimError) throw claimError;
    if (!intent) {
      return ok({ error: "Checkout intent is already being processed" }, { status: 409 });
    }
    claimedCheckoutIntentId = checkoutIntentId;

    const payload = intent.payload || {};
    const itemsRaw = Array.isArray(payload.items) ? payload.items : [];
    const priceRes = await applyCatalogPricing(supabase, itemsRaw);
    if (priceRes.error) return ok({ error: priceRes.error }, { status: 400 });
    const items = priceRes.lines;
    const customer = payload.customer || {};
    const orderGroupId = `YORIX-${checkoutIntentId.slice(0, 8).toUpperCase()}`;

    const policy = await resolveDeliveryPolicy(supabase);
    const totals = computeCheckoutTotals(items, policy);
    const intentSub = Math.round(Number(intent.subtotal ?? 0));
    if (intentSub !== totals.subtotalFull) {
      return ok(
        { error: "Cart subtotal mismatch — refresh checkout." },
        { status: 409 },
      );
    }

    const del = Math.round(Number(intent.delivery_fee ?? 0));
    const tot = Math.round(Number(intent.total ?? 0));
    if (del !== totals.deliveryFee || tot !== totals.total) {
      const { error: patchErr } = await supabase
        .from("checkout_intents")
        .update({
          delivery_fee: totals.deliveryFee,
          total: totals.total,
          updated_at: new Date().toISOString(),
        })
        .eq("id", checkoutIntentId);
      if (patchErr) throw patchErr;
    }

    const productIds = [...new Set(
      items
        .filter((line) => (line.kind || "product") === "product")
        .map((line) => String(line.id)),
    )];
    const vendeurByProduct = new Map<string, string | null>();
    if (productIds.length) {
      const { data: prows } = await supabase
        .from("products")
        .select("id,vendeur_id")
        .in("id", productIds);
      for (const r of prows || []) {
        const row = r as { id?: string; vendeur_id?: string | null };
        if (row.id) vendeurByProduct.set(String(row.id), row.vendeur_id ?? null);
      }
    }

    const deliveryTracking: { order_id: string; code_suivi: string }[] = [];

    const clientNom = String(customer.nom || "Client Yorix");
    const clientTel = String(customer.telephone || "");
    const addrFromBody =
      typeof body?.address === "string" && body.address.trim() !== ""
        ? body.address.trim()
        : "";
    const adresseLivraison = addrFromBody ||
      String(customer.adresse || customer.ville || "Cameroun");

    const ordersCreated: any[] = [];
    const sellerNotifications: Record<string, unknown>[] = [];
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
        createdServiceBookingIds.push(String(booking.id));
        ordersCreated.push({ type: "service_booking", id: booking.id });
        continue;
      }

      const qty = Math.max(1, Number(item.qty || 1));
      const unitPrice = Number(item.price || 0);
      const gross = unitPrice * qty;
      const commission = Math.round(gross * 0.05);
      const net = gross - commission;

      const pid = String(item.id ?? "");
      const vendeurRaw = (item as { vendeur_id?: string | null }).vendeur_id;
      const vendeurId =
        vendeurRaw != null && vendeurRaw !== ""
          ? String(vendeurRaw)
          : vendeurByProduct.get(pid) ?? null;

      const fulfillment = String(item.fulfillmentMode || "delivery");

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          order_group_id: orderGroupId,
          product_id: item.id,
          vendeur_id: vendeurId,
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
      createdOrderIds.push(String(order.id));

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

      // Décrémentation du stock — appel RPC atomique défini dans la migration SQL
      const { error: stockErr } = await supabase.rpc("decrement_product_stock", {
        p_product_id: pid,
        p_qty: qty,
      });
      if (stockErr) {
        console.error(`[confirm_checkout] stock decrement ${pid}:`, stockErr.message);
        throw new CheckoutHttpError("Stock insuffisant pour finaliser la commande.", 409);
      }
      appliedStockAdjustments.push({ productId: pid, qty });

      if (vendeurId) {
        sellerNotifications.push({
          user_id: vendeurId,
          type: "seller_new_order",
          title: "Nouvelle commande Yorix",
          message:
            `${clientNom} · groupe ${orderGroupId} · ligne ${gross.toLocaleString("fr-FR")} FCFA (commission ${commission.toLocaleString("fr-FR")} F)`,
          link: "/dashboard",
          lu: false,
          priority: "high",
          category: "orders",
          payload: { order_id: order.id, checkout_intent_id: checkoutIntentId },
        });
      }

      if (fulfillment !== "pickup") {
        const vn = String((item as { vendeur_nom?: string }).vendeur_nom || "vendeur");
        const vville = String((item as { ville?: string }).ville || "").trim();
        const pickup = vville !== ""
          ? `Boutique ${vn}, ${vville}`
          : "Boutique Yorix";
        try {
          const { code } = await insertAutoDelivery(supabase, {
            orderId: String(order.id),
            clientNom,
            clientTel,
            adresseLivraison,
            adresseCollecte: pickup,
          });
          deliveryTracking.push({ order_id: String(order.id), code_suivi: code });
        } catch (derr) {
          console.error(
            "confirm_checkout livraison auto:",
            derr instanceof Error ? derr.message : derr,
          );
        }
      }

      ordersCreated.push({ type: "order", id: order.id });
    }

    const { data: confirmedRow, error: confirmIntentError } = await supabase
      .from("checkout_intents")
      .update({ status: "confirmed", updated_at: new Date().toISOString() })
      .eq("id", checkoutIntentId)
      .eq("status", "processing")
      .select("id")
      .maybeSingle();
    if (confirmIntentError) throw confirmIntentError;
    if (!confirmedRow) {
      throw new CheckoutHttpError("Checkout intent state changed during confirmation.", 409);
    }
    confirmedIntent = true;

    for (const notification of sellerNotifications) {
      await insertNotificationAndDispatch(supabase, notification);
    }

    const buyerId = typeof customer.id === "string" && uuidish(customer.id) ? customer.id : null;
    if (buyerId) {
      await insertNotificationAndDispatch(supabase, {
        user_id: buyerId,
        type: "buyer_order_confirmed",
        title: "Commande confirmée",
        message:
          `Votre commande ${orderGroupId} est enregistrée. Total TTC ${Math.round(Number(totals.total)).toLocaleString("fr-FR")} FCFA.`,
        link: "/dashboard",
        lu: false,
        priority: "high",
        category: "orders",
        payload: { checkout_intent_id: checkoutIntentId, order_group_id: orderGroupId },
      });
    }

    const { data: intentAfter } = await supabase
      .from("checkout_intents")
      .select("total, delivery_fee, subtotal")
      .eq("id", checkoutIntentId)
      .maybeSingle();

    return ok({
      checkout_intent_id: checkoutIntentId,
      order_group_id: orderGroupId,
      created: ordersCreated,
      delivery_tracking: deliveryTracking,
      total: intentAfter?.total ?? totals.total,
      delivery_fee: intentAfter?.delivery_fee ?? totals.deliveryFee,
      subtotal: intentAfter?.subtotal ?? totals.subtotalFull,
    });
  } catch (e) {
    const status = e instanceof CheckoutHttpError ? e.status : 500;
    if (supabaseForCleanup && claimedCheckoutIntentId && !confirmedIntent) {
      const cleanupOk = await cleanupCreatedCheckoutRows(
        supabaseForCleanup,
        createdOrderIds,
        createdServiceBookingIds,
        appliedStockAdjustments,
      );
      const { error: resetErr } = await supabaseForCleanup
        .from("checkout_intents")
        .update({
          status: cleanupOk ? "ready" : "failed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", claimedCheckoutIntentId)
        .eq("status", "processing");
      if (resetErr) {
        console.error("[confirm_checkout] reset intent status:", resetErr.message);
      }
    }
    return ok({ error: e instanceof Error ? e.message : "unknown error" }, { status });
  }
});

