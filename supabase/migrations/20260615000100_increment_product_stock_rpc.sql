-- RPC : increment_product_stock
-- Restores product stock when confirm_checkout has to roll back partial rows
-- after a stock decrement succeeded but before the checkout intent was confirmed.

CREATE OR REPLACE FUNCTION public.increment_product_stock(
  p_product_id uuid,
  p_qty        integer
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_new_stock integer;
BEGIN
  IF p_qty <= 0 THEN
    RAISE EXCEPTION 'increment_product_stock: p_qty doit être > 0 (reçu: %)', p_qty;
  END IF;

  UPDATE public.products
     SET stock      = COALESCE(stock, 0) + p_qty,
         updated_at = NOW()
   WHERE id = p_product_id
   RETURNING stock INTO v_new_stock;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'increment_product_stock: produit % introuvable', p_product_id;
  END IF;

  RETURN v_new_stock;
END;
$$;

REVOKE ALL ON FUNCTION public.increment_product_stock(uuid, integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.increment_product_stock(uuid, integer) FROM authenticated;
REVOKE ALL ON FUNCTION public.increment_product_stock(uuid, integer) FROM anon;
GRANT EXECUTE ON FUNCTION public.increment_product_stock(uuid, integer) TO service_role;

COMMENT ON FUNCTION public.increment_product_stock(uuid, integer) IS
  'Restaure le stock produit après un rollback applicatif de confirm_checkout. '
  'Réservée aux Edge Functions via service_role.';
