-- Bulk stock reservation for checkout confirmation.
-- Runs all product decrements in one PostgreSQL statement so an insufficient
-- stock error rolls back every product touched by the checkout.

CREATE OR REPLACE FUNCTION public.decrement_checkout_product_stock(
  p_items jsonb
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_product_id uuid;
  v_qty integer;
  v_remaining integer;
  v_results jsonb := '[]'::jsonb;
BEGIN
  IF p_items IS NULL OR jsonb_typeof(p_items) <> 'array' THEN
    RAISE EXCEPTION 'decrement_checkout_product_stock: p_items must be a JSON array';
  END IF;

  FOR v_product_id, v_qty IN
    SELECT product_id, SUM(qty)::integer
    FROM jsonb_to_recordset(p_items) AS x(product_id uuid, qty integer)
    GROUP BY product_id
  LOOP
    IF v_product_id IS NULL THEN
      RAISE EXCEPTION 'decrement_checkout_product_stock: product_id is required';
    END IF;
    IF COALESCE(v_qty, 0) <= 0 THEN
      RAISE EXCEPTION 'decrement_checkout_product_stock: qty must be > 0 for product %', v_product_id;
    END IF;

    v_remaining := public.decrement_product_stock(v_product_id, v_qty);
    v_results := v_results || jsonb_build_array(jsonb_build_object(
      'product_id', v_product_id,
      'qty', v_qty,
      'remaining_stock', v_remaining
    ));
  END LOOP;

  RETURN v_results;
END;
$$;

REVOKE ALL ON FUNCTION public.decrement_checkout_product_stock(jsonb) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.decrement_checkout_product_stock(jsonb) FROM authenticated;
REVOKE ALL ON FUNCTION public.decrement_checkout_product_stock(jsonb) FROM anon;
GRANT EXECUTE ON FUNCTION public.decrement_checkout_product_stock(jsonb) TO service_role;

COMMENT ON FUNCTION public.decrement_checkout_product_stock(jsonb) IS
  'Atomically decrements all product stock lines for a checkout. '
  'Raises if any product is missing or has insufficient stock; PostgreSQL rolls back all decrements.';
