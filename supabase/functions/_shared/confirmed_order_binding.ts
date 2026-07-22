type CheckoutBindingQuery = {
  select: (columns: string) => CheckoutBindingQuery;
  eq: (column: string, value: string) => CheckoutBindingQuery;
  contains: (column: string, value: Record<string, string>) => CheckoutBindingQuery;
  limit: (count: number) => CheckoutBindingQuery;
  maybeSingle: () => Promise<{
    data: Record<string, unknown> | null;
    error: { message?: string } | null;
  }>;
};

type CheckoutBindingClient = {
  from: (table: string) => CheckoutBindingQuery;
};

/**
 * Proves that confirm_checkout completed this exact intent/order pair.
 * The payment functions run with service_role, so this check must fail closed:
 * client-supplied identifiers are never sufficient evidence of a valid order.
 */
export async function hasConfirmedOrderBinding(
  supabase: CheckoutBindingClient,
  checkoutIntentId: string,
  orderGroupId: string,
): Promise<boolean> {
  const query = supabase
    .from("checkout_idempotency")
    .select("key")
    .eq("status", "completed")
    .eq("order_group_id", orderGroupId)
    .contains("response", {
      checkout_intent_id: checkoutIntentId,
      order_group_id: orderGroupId,
    })
    .limit(1);
  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  return Boolean(data);
}
