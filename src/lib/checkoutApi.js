import { supabase } from "./supabase";

async function callEdge(functionName, payload) {
  const { data, error } = await supabase.functions.invoke(functionName, {
    body: payload,
  });
  if (error) throw error;
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

