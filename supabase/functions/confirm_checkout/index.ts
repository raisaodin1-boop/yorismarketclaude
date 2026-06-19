import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { applyCheckoutDiscount, validateCheckoutCoupon } from "../_shared/checkout_coupons.ts";
import { corsHeaders, ok } from "../_shared/cors.ts";
import { applyCatalogPricing } from "../_shared/catalog_prices.ts";
import { insertAutoDelivery } from "../_shared/delivery_auto.ts";
import { computeCheckoutTotals, resolveDeliveryPolicy } from "../_shared/delivery_policy.ts";
import { dispatchNotificationById } from "../_shared/internal_dispatch.ts";

function uuidish(v: string) {
  return /^[0-9a-fA-F-]{16,}$/.test(v);
}

/**
 * Réclame une clé d'idempotency.
 * - `owned: true`  → la ligne vient d'être créée, c'est NOUS qui traitons ce checkout.
 * - `owned: false` + `existing` → la clé existait déjà : soit la confirmation est
 *   terminée (on rejoue `response`), soit elle est encore en cours (doublon concurrent).
 * Le `upsert ... ignoreDuplicates` garantit l'atomicité de la prise de verrou même
 * si deux requêtes arrivent en parallèle (la contrainte de clé primaire tranche).
 */
async function claimIdempotency(
  supabase: ReturnType<typeof createClient>,
  key: string,
): Promise<{
  owned: boolean;
  existing?: { status?: string; response?: unknown };
}> {
  const { data: inserted, error } = await supabase
    .from("checkout_idempotency")
    .upsert({ key, status: "in_progress" }, { onConflict: "key", ignoreDuplicates: true })
    .select("key")
    .maybeSingle();
  if (error) throw error;
  if (inserted) return { owned: true };

  const { data: existing } = await supabase
    .from("checkout_idempotency")
    .select("status, response")
    .eq("key", key)
    .maybeSingle();
  return { owned: false, existing: existing ?? {} };
}

/** Libère une clé en cas d'échec, pour permettre une nouvelle tentative. */
async function releaseIdempotency(
  supabase: ReturnType<typeof createClient>,
  key: string,
) {
  await supabase.from("checkout_idempotency").delete().eq("key", key);
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

  // Hoistés hors du try pour rester accessibles au catch (libération de la clé).
  let supabase: ReturnType<typeof createClient> | null = null;
  let idempotencyKey = "";

  try {
    const body = await req.json();
    const checkoutIntentId = String(body?.checkout_intent_id || "");
    if (!checkoutIntentId || !uuidish(checkoutIntentId)) {
      return ok({ error: "Invalid checkout_intent_id" }, { status: 400 });
    }

    const paymentMethod = String(body?.payment_method || "cinetpay");

    // Clé d'idempotency générée côté client (une seule fois par session de
    // checkout). Optionnelle pour rester rétrocompatible, mais le frontend
    // l'envoie toujours : elle protège contre le double-clic / retry réseau.
    idempotencyKey =
      typeof body?.idempotency_key === "string" && uuidish(body.idempotency_key)
        ? body.idempotency_key
        : "";

    supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    // ── Idempotency : on tente de réclamer la clé AVANT tout traitement ──────
    // Si une confirmation identique est déjà passée, on rejoue sa réponse sans
    // recréer la moindre commande.
    if (idempotencyKey) {
      const claim = await claimIdempotency(supabase, idempotencyKey);
      if (!claim.owned) {
        const ex = claim.existing ?? {};
        if (ex.status === "completed" && ex.response) {
          return ok(ex.response as Record<string, unknown>, { status: 200 });
        }
        // Confirmation encore en cours (doublon concurrent) : on ne recrée rien.
        return ok(
          { error: "CHECKOUT_IN_PROGRESS" },
          { status: 409 },
        );
      }
    }

    const { data: intent, error: intentError } = await supabase
      .from("checkout_intents")
      .select("*")
      .eq("id", checkoutIntentId)
      .maybeSingle();
    if (intentError) throw intentError;
    if (!intent) return ok({ error: "Checkout intent not found" }, { status: 404 });

    const payload = intent.payload || {};
    const itemsRaw = Array.isArray(payload.items) ? payload.items : [];
    const priceRes = await applyCatalogPricing(supabase, itemsRaw);
    if (priceRes.error) return ok({ error: priceRes.error }, { status: 400 });
    const items = priceRes.lines;
    const customer = payload.customer || {};
    const orderGroupId = `YORIX-${checkoutIntentId.slice(0, 8).toUpperCase()}`;

    const policy = await resolveDeliveryPolicy(supabase);
    const totals = computeCheckoutTotals(items, policy);
    const coupon = await validateCheckoutCoupon(supabase, {
      code: (payload as { coupon?: { code?: unknown } }).coupon?.code,
      customerId: (customer as { id?: unknown }).id,
      grossTotal: totals.total,
    });
    if (coupon.error) {
      if (idempotencyKey) await releaseIdempotency(supabase, idempotencyKey);
      return ok({ error: coupon.error }, { status: 400 });
    }
    const discountTotal = coupon.discountAmount;
    const payableTotal = applyCheckoutDiscount(totals.total, discountTotal);
    const intentSub = Math.round(Number(intent.subtotal ?? 0));
    if (intentSub !== totals.subtotalFull) {
      return ok(
        { error: "Cart subtotal mismatch — refresh checkout." },
        { status: 409 },
      );
    }

    const del = Math.round(Number(intent.delivery_fee ?? 0));
    const tot = Math.round(Number(intent.total ?? 0));
    if (del !== totals.deliveryFee || tot !== payableTotal) {
      const { error: patchErr } = await supabase
        .from("checkout_intents")
        .update({
          delivery_fee: totals.deliveryFee,
          total: payableTotal,
          payload: {
            ...(typeof payload === "object" && payload !== null ? payload : {}),
            coupon: coupon.code
              ? { code: coupon.code, discount_amount: discountTotal }
              : null,
          },
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

    // ── Tâche 1 : vérification de stock AVANT toute création de commande ─────
    // L'appel RPC verrouille (FOR UPDATE) les lignes produits et compare le
    // stock disponible à la quantité demandée. Bloque la survente en amont avec
    // un message clair (produit concerné + disponible vs demandé).
    const stockCheckItems = items
      .filter((line) => (line.kind || "product") === "product")
      .map((line) => ({
        id: String(line.id),
        qty: Math.max(1, Number(line.qty || 1)),
      }));

    if (stockCheckItems.length) {
      const { data: shortage, error: stockCheckErr } = await supabase.rpc(
        "check_cart_stock",
        { p_items: stockCheckItems },
      );
      if (stockCheckErr) throw stockCheckErr;
      if (shortage) {
        const s = shortage as {
          name?: string;
          available?: number;
          requested?: number;
        };
        if (idempotencyKey) await releaseIdempotency(supabase, idempotencyKey);
        return ok(
          {
            error: "STOCK_INSUFFICIENT",
            product: s.name ?? "Produit",
            available: Number(s.available ?? 0),
            requested: Number(s.requested ?? 0),
          },
          { status: 409 },
        );
      }
    }

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

      if (vendeurId) {
        await insertNotificationAndDispatch(supabase, {
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

      // ── Tâche 2 : décrémentation atomique et BLOQUANTE du stock ────────────
      // decrement_product_stock re-vérifie sous verrou (FOR UPDATE) que
      // stock >= qty puis décrémente — c'est la double sécurité contre une race
      // condition survenue entre le check pré-commande et ici. En cas d'échec
      // (stock devenu insuffisant), on NE doit pas valider : on libère la clé
      // d'idempotency et on renvoie un 409 plutôt que d'avaler l'erreur.
      const { error: stockErr } = await supabase.rpc("decrement_product_stock", {
        p_product_id: pid,
        p_qty: qty,
      });
      if (stockErr) {
        console.error(`[confirm_checkout] stock decrement ${pid}:`, stockErr.message);
        if (idempotencyKey) await releaseIdempotency(supabase, idempotencyKey);
        return ok(
          {
            error: "STOCK_INSUFFICIENT",
            product: String((item as { name_fr?: string }).name_fr || "Produit"),
            available: 0,
            requested: qty,
          },
          { status: 409 },
        );
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

    await supabase.from("checkout_intents").update({ status: "confirmed" }).eq("id", checkoutIntentId);

    const buyerId = typeof customer.id === "string" && uuidish(customer.id) ? customer.id : null;
    if (buyerId) {
      await insertNotificationAndDispatch(supabase, {
        user_id: buyerId,
        type: "buyer_order_confirmed",
        title: "Commande confirmée",
        message:
          `Votre commande ${orderGroupId} est enregistrée. Total TTC ${Math.round(Number(payableTotal)).toLocaleString("fr-FR")} FCFA.`,
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

    const responseBody = {
      checkout_intent_id: checkoutIntentId,
      order_group_id: orderGroupId,
      created: ordersCreated,
      delivery_tracking: deliveryTracking,
      total: intentAfter?.total ?? payableTotal,
      delivery_fee: intentAfter?.delivery_fee ?? totals.deliveryFee,
      subtotal: intentAfter?.subtotal ?? totals.subtotalFull,
      coupon_code: coupon.code || null,
      coupon_discount: discountTotal,
    };

    // Idempotency : on marque la clé « completed » et on archive la réponse
    // exacte pour la rejouer sur un éventuel reclic / retry réseau.
    if (idempotencyKey) {
      await supabase
        .from("checkout_idempotency")
        .update({
          status: "completed",
          order_group_id: orderGroupId,
          response: responseBody,
          completed_at: new Date().toISOString(),
        })
        .eq("key", idempotencyKey);
    }

    return ok(responseBody);
  } catch (e) {
    // Échec non géré : on libère la clé pour autoriser une nouvelle tentative.
    try {
      if (supabase && idempotencyKey) {
        await releaseIdempotency(supabase, idempotencyKey);
      }
    } catch { /* best-effort */ }
    return ok({ error: e instanceof Error ? e.message : "unknown error" }, { status: 500 });
  }
});

