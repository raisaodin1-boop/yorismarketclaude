import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, ok } from "../_shared/cors.ts";
import { applyCatalogPricing } from "../_shared/catalog_prices.ts";
import { insertAutoDelivery } from "../_shared/delivery_auto.ts";
import { computeCheckoutTotals, resolveDeliveryPolicy } from "../_shared/delivery_policy.ts";
import { dispatchNotificationById } from "../_shared/internal_dispatch.ts";

function uuidish(v: string) {
  return /^[0-9a-fA-F-]{16,}$/.test(v);
}

function checkoutIntentCustomerId(intent: Record<string, unknown>) {
  const direct = typeof intent.customer_id === "string" ? intent.customer_id : "";
  if (direct && uuidish(direct)) return direct;
  const payload = intent.payload && typeof intent.payload === "object"
    ? intent.payload as Record<string, unknown>
    : {};
  const customer = payload.customer && typeof payload.customer === "object"
    ? payload.customer as Record<string, unknown>
    : {};
  const fromPayload = typeof customer.id === "string" ? customer.id : "";
  return fromPayload && uuidish(fromPayload) ? fromPayload : "";
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
  let checkoutIntentId = "";
  let intentClaimed = false;
  let irreversibleStarted = false;

  try {
    const body = await req.json();
    checkoutIntentId = String(body?.checkout_intent_id || "");
    if (!checkoutIntentId || !uuidish(checkoutIntentId)) {
      return ok({ error: "Invalid checkout_intent_id" }, { status: 400 });
    }

    const paymentMethod = String(body?.payment_method || "cinetpay");
    // "hq" (siège Yorix) | "seller" (boutique du vendeur) — actif seulement
    // quand le produit a fulfillmentMode="pickup" (choisi côté client).
    const pickupPointType = body?.pickup_point === "hq" ? "hq" : "seller";
    const YORIX_HQ_ADDRESS = "Yaoundé, Barrière Ahala, en face de Skymotors";

    // Clé d'idempotency générée côté client (une seule fois par session de
    // checkout). Obligatoire : avec le verrou sur checkout_intents.status,
    // elle protège les retries sans recréer de commandes.
    idempotencyKey =
      typeof body?.idempotency_key === "string" && uuidish(body.idempotency_key)
        ? body.idempotency_key
        : "";
    if (!idempotencyKey) {
      return ok({ error: "Missing idempotency_key" }, { status: 400 });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    supabase = createClient(
      supabaseUrl,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    let { data: intent, error: intentError } = await supabase
      .from("checkout_intents")
      .select("*")
      .eq("id", checkoutIntentId)
      .maybeSingle();
    if (intentError) throw intentError;
    if (!intent) return ok({ error: "Checkout intent not found" }, { status: 404 });

    const intentCustomerId = checkoutIntentCustomerId(intent as Record<string, unknown>);
    if (intentCustomerId) {
      const authHeader = req.headers.get("Authorization") ?? "";
      const token = authHeader.replace(/^Bearer\s+/i, "").trim();
      const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
      if (!token || !anonKey || !supabaseUrl) {
        return ok({ error: "Session requise" }, { status: 401 });
      }
      const anon = createClient(supabaseUrl, anonKey);
      const { data: { user }, error: authErr } = await anon.auth.getUser(token);
      if (authErr || !user?.id) {
        return ok({ error: "Session invalide ou expirée" }, { status: 401 });
      }
      if (user.id !== intentCustomerId) {
        return ok({ error: "Accès refusé" }, { status: 403 });
      }
    } else if (paymentMethod !== "whatsapp_backup") {
      return ok({ error: "Session requise" }, { status: 401 });
    }

    // ── Idempotency : on tente de réclamer la clé AVANT tout traitement ──────
    // Si une confirmation identique est déjà passée, on rejoue sa réponse sans
    // recréer la moindre commande.
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

    const orderGroupId = `YORIX-${checkoutIntentId.slice(0, 8).toUpperCase()}`;

    const { data: claimedIntent, error: claimIntentError } = await supabase
      .from("checkout_intents")
      .update({
        status: "processing",
        updated_at: new Date().toISOString(),
      })
      .eq("id", checkoutIntentId)
      .eq("status", "ready")
      .select("*")
      .maybeSingle();
    if (claimIntentError) throw claimIntentError;
    if (!claimedIntent) {
      await releaseIdempotency(supabase, idempotencyKey);
      const { data: freshIntent } = await supabase
        .from("checkout_intents")
        .select("status")
        .eq("id", checkoutIntentId)
        .maybeSingle();
      const status = String(
        (freshIntent as { status?: unknown } | null)?.status ??
          (intent as { status?: unknown }).status ??
          "",
      );
      if (status === "confirmed") {
        return ok(
          { error: "CHECKOUT_ALREADY_CONFIRMED", order_group_id: orderGroupId },
          { status: 409 },
        );
      }
      if (status === "processing") {
        return ok({ error: "CHECKOUT_IN_PROGRESS" }, { status: 409 });
      }
      return ok({ error: "Checkout intent is not ready" }, { status: 409 });
    }
    intentClaimed = true;
    intent = claimedIntent;

    const abortBeforeCreation = async (
      responseBody: Record<string, unknown>,
      status: number,
    ) => {
      await releaseIdempotency(supabase!, idempotencyKey);
      if (intentClaimed && !irreversibleStarted) {
        await supabase!
          .from("checkout_intents")
          .update({ status: "ready", updated_at: new Date().toISOString() })
          .eq("id", checkoutIntentId)
          .eq("status", "processing");
        intentClaimed = false;
      }
      return ok(responseBody, { status });
    };

    const payload = intent.payload || {};
    const itemsRaw = Array.isArray(payload.items) ? payload.items : [];
    const priceRes = await applyCatalogPricing(supabase, itemsRaw);
    if (priceRes.error) return abortBeforeCreation({ error: priceRes.error }, 400);
    const items = priceRes.lines;
    const customer = payload.customer || {};

    const policy = await resolveDeliveryPolicy(supabase);
    const totals = computeCheckoutTotals(items, policy);
    const intentSub = Math.round(Number(intent.subtotal ?? 0));
    if (intentSub !== totals.subtotalFull) {
      return abortBeforeCreation(
        { error: "Cart subtotal mismatch — refresh checkout." },
        409,
      );
    }

    // Le coupon (revalidé et figé côté serveur par create_checkout_intent) est
    // une remise sur le total dû, distincte du recalcul brut depuis le panier :
    // on la ré-applique au total recalculé plutôt que de la perdre en écrasant
    // avec `totals.total`.
    const couponDiscount = Math.max(0, Math.round(Number(intent.coupon_discount ?? 0)));
    const expectedTotal = Math.max(0, totals.total - couponDiscount);

    const del = Math.round(Number(intent.delivery_fee ?? 0));
    const tot = Math.round(Number(intent.total ?? 0));
    if (del !== totals.deliveryFee || tot !== expectedTotal) {
      const { error: patchErr } = await supabase
        .from("checkout_intents")
        .update({
          delivery_fee: totals.deliveryFee,
          total: expectedTotal,
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
    const pickupAddresses = new Set<string>();

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
        return abortBeforeCreation(
          {
            error: "STOCK_INSUFFICIENT",
            product: s.name ?? "Produit",
            available: Number(s.available ?? 0),
            requested: Number(s.requested ?? 0),
          },
          409,
        );
      }
    }

    const ordersCreated: any[] = [];
    irreversibleStarted = true;
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
        // Ne mapper en STOCK_INSUFFICIENT que si l'erreur vient réellement du
        // contrôle de stock — toute autre erreur (schéma, permissions, etc.)
        // était auparavant maquillée en "0 disponible", ce qui a déjà masqué
        // un vrai bug de schéma. On la laisse remonter telle quelle sinon.
        if (/stock insuffisant/i.test(stockErr.message)) {
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
        return ok({ error: stockErr.message }, { status: 500 });
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
      } else {
        // Retrait sur place : aucune livraison à créer. On mémorise l'adresse
        // de retrait (siège Yorix ou boutique vendeur) pour l'inclure dans la
        // notification de confirmation envoyée à l'acheteur.
        if (pickupPointType === "hq") {
          pickupAddresses.add(`Siège Yorix — ${YORIX_HQ_ADDRESS}`);
        } else {
          const vn = String((item as { vendeur_nom?: string }).vendeur_nom || "vendeur");
          const vville = String((item as { ville?: string }).ville || "").trim();
          pickupAddresses.add(
            vville !== "" ? `Boutique ${vn}, ${vville}` : `Boutique ${vn}`,
          );
        }
      }

      ordersCreated.push({ type: "order", id: order.id });
    }

    const { error: confirmIntentError } = await supabase
      .from("checkout_intents")
      .update({ status: "confirmed", updated_at: new Date().toISOString() })
      .eq("id", checkoutIntentId)
      .eq("status", "processing");
    if (confirmIntentError) throw confirmIntentError;

    const buyerId = typeof customer.id === "string" && uuidish(customer.id) ? customer.id : null;
    if (buyerId) {
      await insertNotificationAndDispatch(supabase, {
        user_id: buyerId,
        type: "buyer_order_confirmed",
        title: "Commande confirmée",
        message:
          `Votre commande ${orderGroupId} est enregistrée. Total TTC ${Math.round(Number(expectedTotal)).toLocaleString("fr-FR")} FCFA.` +
          (pickupAddresses.size
            ? ` Retrait sur place : ${[...pickupAddresses].join(" · ")}.`
            : ""),
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
      total: intentAfter?.total ?? totals.total,
      delivery_fee: intentAfter?.delivery_fee ?? totals.deliveryFee,
      subtotal: intentAfter?.subtotal ?? totals.subtotalFull,
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
      if (supabase && intentClaimed && !irreversibleStarted) {
        await supabase
          .from("checkout_intents")
          .update({ status: "ready", updated_at: new Date().toISOString() })
          .eq("id", checkoutIntentId)
          .eq("status", "processing");
      }
    } catch { /* best-effort */ }
    // Les erreurs Postgrest (supabase-js) ne sont pas des instances d'Error —
    // `instanceof Error` échoue et masquait le vrai message derrière "unknown error".
    const msg = e instanceof Error
      ? e.message
      : (e as { message?: string })?.message || String(e) || "unknown error";
    console.error("[confirm_checkout] unhandled:", msg, e);
    return ok({ error: msg }, { status: 500 });
  }
});

