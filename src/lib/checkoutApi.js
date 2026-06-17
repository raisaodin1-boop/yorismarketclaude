import { supabase } from "./supabase";

/**
 * Erreur enrichie remontée par les Edge Functions.
 * `code` permet au composant de réagir finement (ex. STOCK_INSUFFICIENT) ;
 * `isNetwork` distingue une coupure réseau d'une erreur métier.
 */
export class CheckoutError extends Error {
  constructor(message, { code = "", status = 0, isNetwork = false, details = {} } = {}) {
    super(message);
    this.name = "CheckoutError";
    this.code = code;
    this.status = status;
    this.isNetwork = isNetwork;
    this.details = details;
  }
}

/**
 * supabase-js renvoie une `FunctionsHttpError` (avec le `Response` dans
 * `error.context`) pour tout statut non-2xx. On lit ce corps JSON pour récupérer
 * les champs structurés (`error`, `product`, `available`, `requested`).
 */
async function parseEdgeError(error) {
  if (error?.name === "FunctionsFetchError") {
    return new CheckoutError("network", { isNetwork: true });
  }
  const ctx = error?.context;
  if (ctx && typeof ctx.json === "function") {
    try {
      const body = await ctx.json();
      return new CheckoutError(String(body?.error || "edge_error"), {
        code: String(body?.error || ""),
        status: Number(ctx.status || 0),
        details: body || {},
      });
    } catch {
      /* corps non-JSON : on retombe sur le message brut */
    }
  }
  return new CheckoutError(error?.message || "edge_error", {
    status: Number(ctx?.status || 0),
  });
}

async function callEdge(functionName, payload) {
  let data, error;
  try {
    ({ data, error } = await supabase.functions.invoke(functionName, { body: payload }));
  } catch (e) {
    // Coupure réseau / fetch impossible avant même d'atteindre l'Edge.
    throw new CheckoutError(e?.message || "network", { isNetwork: true });
  }
  if (error) throw await parseEdgeError(error);
  // Garde rétrocompatible : certaines Edge renvoient l'erreur en HTTP 200.
  if (data?.error) {
    throw new CheckoutError(String(data.error), { code: String(data.error), details: data });
  }
  return data;
}

export async function createCheckoutIntent(payload) {
  return callEdge("create_checkout_intent", payload);
}

export async function confirmCheckout(payload) {
  return callEdge("confirm_checkout", payload);
}

export async function initPaymentCinetPay(payload) {
  return callEdge("init_payment_cinetpay", payload);
}

/** Retour depuis CinetPay : lit `payment_transactions` + `deliveries` (JWT requis côté Edge). */
export async function checkoutReturnStatus(payload) {
  let data, error;
  try {
    ({ data, error } = await supabase.functions.invoke("checkout_return_status", { body: payload }));
  } catch (e) {
    throw new CheckoutError(e?.message || "network", { isNetwork: true });
  }
  if (error) throw await parseEdgeError(error);
  if (data?.error) throw new CheckoutError(String(data.error), { code: String(data.error), details: data });
  return data;
}
