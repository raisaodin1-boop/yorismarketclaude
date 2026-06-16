import { supabase } from "./supabase";

async function readErrorResponseText(error) {
  const response = error?.context;
  if (!response || typeof response !== "object") return "";

  try {
    if (typeof response.clone === "function") {
      return await response.clone().text();
    }
    if (typeof response.text === "function" && !response.bodyUsed) {
      return await response.text();
    }
  } catch {
    return "";
  }
  return "";
}

export async function isEdgeFunctionUnavailable(error) {
  const name = String(error?.name || error?.constructor?.name || "");
  const message = String(error?.message || "");
  const combined = `${name} ${message}`.toLowerCase();

  if (
    combined.includes("functionsfetcherror") ||
    combined.includes("functionsrelayerror") ||
    combined.includes("failed to send") ||
    combined.includes("failed to fetch") ||
    combined.includes("networkerror")
  ) {
    return true;
  }

  if (!combined.includes("functionshttperror")) {
    return /edge function.*(not found|not deployed|unavailable)/i.test(message);
  }

  const status = Number(error?.context?.status || error?.status || error?.statusCode || 0);
  if (status !== 404) return false;

  const bodyText = await readErrorResponseText(error);
  const details = `${bodyText} ${error?.context?.statusText || ""} ${message}`.toLowerCase();
  return (
    details.includes("function not found") ||
    details.includes("edge function not found") ||
    details.includes("function_not_found") ||
    (details.includes("not_found") && details.includes("function"))
  );
}

async function callEdge(functionName, payload) {
  const { data, error } = await supabase.functions.invoke(functionName, {
    body: payload,
  });
  if (error) throw error;
  if (data?.error) throw new Error(String(data.error));
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
  const { data, error } = await supabase.functions.invoke("checkout_return_status", {
    body: payload,
  });
  if (error) throw error;
  if (data?.error) throw new Error(String(data.error));
  return data;
}

