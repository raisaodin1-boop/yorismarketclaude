-- ═══════════════════════════════════════════════════════════════════════════
-- Atomic checkout stock + restore on cancel
--
-- Bugs:
--   1) confirm_checkout checked stock, then created orders and decremented
--      per line. Under concurrency a later line can fail after earlier lines
--      already wrote orders + decremented stock → orphan orders / lost stock.
--   2) fn_cancel_order never restored stock, so admin/client cancel (or any
--      cancel of a reserved unpaid order) permanently removed inventory.
--
-- Fix:
--   • decrement_cart_stock / restore_cart_stock — all-or-nothing cart reserve
--     in one Postgres transaction (NULL stock = unlimited, matching
--     check_cart_stock).
--   • restore_order_stock + fn_cancel_order — put units back on cancel.
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── 1) Atomic cart decrement ───────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.decrement_cart_stock(p_items jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_shortage jsonb;
BEGIN
  IF p_items IS NULL OR jsonb_typeof(p_items) <> 'array' THEN
    RETURN NULL;
  END IF;

  -- Missing products fail before any stock update.
  SELECT jsonb_build_object(
           'product_id', r.id,
           'name',       'Produit introuvable',
           'available',  0,
           'requested',  r.qty
         )
    INTO v_shortage
    FROM (
      SELECT (elem->>'id')::uuid AS id,
             SUM(GREATEST(1, COALESCE(NULLIF(elem->>'qty', '')::integer, 1)))::integer AS qty
        FROM jsonb_array_elements(p_items) elem
       WHERE elem->>'id' IS NOT NULL
       GROUP BY (elem->>'id')::uuid
    ) r
    LEFT JOIN public.products p ON p.id = r.id
   WHERE p.id IS NULL
   ORDER BY r.id
   LIMIT 1;

  IF v_shortage IS NOT NULL THEN
    RETURN v_shortage;
  END IF;

  -- Lock existing product rows in a stable order to avoid deadlocks.
  PERFORM p.id
    FROM public.products p
    JOIN (
      SELECT (elem->>'id')::uuid AS id
        FROM jsonb_array_elements(p_items) elem
       WHERE elem->>'id' IS NOT NULL
       GROUP BY (elem->>'id')::uuid
    ) r ON r.id = p.id
   ORDER BY p.id
     FOR UPDATE;

  -- Stock NULL = unlimited (same contract as check_cart_stock).
  SELECT jsonb_build_object(
           'product_id', p.id,
           'name',       COALESCE(p.name_fr, 'Produit'),
           'available',  p.stock,
           'requested',  r.qty
         )
    INTO v_shortage
    FROM (
      SELECT (elem->>'id')::uuid AS id,
             SUM(GREATEST(1, COALESCE(NULLIF(elem->>'qty', '')::integer, 1)))::integer AS qty
        FROM jsonb_array_elements(p_items) elem
       WHERE elem->>'id' IS NOT NULL
       GROUP BY (elem->>'id')::uuid
    ) r
    JOIN public.products p ON p.id = r.id
   WHERE p.stock IS NOT NULL
     AND p.stock < r.qty
   ORDER BY p.id
   LIMIT 1;

  IF v_shortage IS NOT NULL THEN
    RETURN v_shortage;
  END IF;

  UPDATE public.products p
     SET stock = p.stock - r.qty
    FROM (
      SELECT (elem->>'id')::uuid AS id,
             SUM(GREATEST(1, COALESCE(NULLIF(elem->>'qty', '')::integer, 1)))::integer AS qty
        FROM jsonb_array_elements(p_items) elem
       WHERE elem->>'id' IS NOT NULL
       GROUP BY (elem->>'id')::uuid
    ) r
   WHERE p.id = r.id
     AND p.stock IS NOT NULL;

  RETURN NULL;
END;
$$;

REVOKE ALL ON FUNCTION public.decrement_cart_stock(jsonb) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.decrement_cart_stock(jsonb) FROM authenticated;
REVOKE ALL ON FUNCTION public.decrement_cart_stock(jsonb) FROM anon;
GRANT EXECUTE ON FUNCTION public.decrement_cart_stock(jsonb) TO service_role;

COMMENT ON FUNCTION public.decrement_cart_stock(jsonb) IS
  'Atomically checks and decrements all tracked product stock for a checkout cart. '
  'NULL stock is treated as unlimited. Returns NULL on success or a shortage jsonb.';


-- ─── 2) Cart-level restore (confirm_checkout failure compensation) ──────────
CREATE OR REPLACE FUNCTION public.restore_cart_stock(p_items jsonb)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_updated integer;
BEGIN
  IF p_items IS NULL OR jsonb_typeof(p_items) <> 'array' THEN
    RETURN 0;
  END IF;

  -- Only restore rows that track stock (NULL = unlimited, never decremented).
  UPDATE public.products p
     SET stock = p.stock + r.qty
    FROM (
      SELECT (elem->>'id')::uuid AS id,
             SUM(GREATEST(1, COALESCE(NULLIF(elem->>'qty', '')::integer, 1)))::integer AS qty
        FROM jsonb_array_elements(p_items) elem
       WHERE elem->>'id' IS NOT NULL
       GROUP BY (elem->>'id')::uuid
    ) r
   WHERE p.id = r.id
     AND p.stock IS NOT NULL;

  GET DIAGNOSTICS v_updated = ROW_COUNT;
  RETURN v_updated;
END;
$$;

REVOKE ALL ON FUNCTION public.restore_cart_stock(jsonb) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.restore_cart_stock(jsonb) FROM authenticated;
REVOKE ALL ON FUNCTION public.restore_cart_stock(jsonb) FROM anon;
GRANT EXECUTE ON FUNCTION public.restore_cart_stock(jsonb) TO service_role;

COMMENT ON FUNCTION public.restore_cart_stock(jsonb) IS
  'Best-effort compensation when cart stock was reserved but checkout later failed.';


-- ─── 3) Per-product increment (used by order cancel restore) ────────────────
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
  v_current_stock integer;
  v_new_stock     integer;
BEGIN
  IF p_qty IS NULL OR p_qty <= 0 THEN
    RAISE EXCEPTION 'increment_product_stock: p_qty doit être > 0 (reçu: %)', p_qty;
  END IF;

  SELECT stock
    INTO v_current_stock
    FROM public.products
   WHERE id = p_product_id
     FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'increment_product_stock: produit % introuvable', p_product_id;
  END IF;

  -- NULL stock = unlimited inventory; nothing was reserved, nothing to restore.
  IF v_current_stock IS NULL THEN
    RETURN NULL;
  END IF;

  v_new_stock := v_current_stock + p_qty;

  UPDATE public.products
     SET stock = v_new_stock
   WHERE id = p_product_id;

  RETURN v_new_stock;
END;
$$;

REVOKE ALL ON FUNCTION public.increment_product_stock(uuid, integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.increment_product_stock(uuid, integer) FROM authenticated;
REVOKE ALL ON FUNCTION public.increment_product_stock(uuid, integer) FROM anon;
GRANT EXECUTE ON FUNCTION public.increment_product_stock(uuid, integer) TO service_role;

COMMENT ON FUNCTION public.increment_product_stock(uuid, integer) IS
  'Restores tracked product stock after an order cancel or failed reservation.';


-- ─── 4) Restore stock for one order from order_items ────────────────────────
CREATE OR REPLACE FUNCTION public.restore_order_stock(p_order_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  r RECORD;
  v_restored integer := 0;
BEGIN
  IF p_order_id IS NULL THEN
    RAISE EXCEPTION 'restore_order_stock: commande invalide';
  END IF;

  FOR r IN
    SELECT product_id,
           GREATEST(1, COALESCE(quantity, 1))::integer AS qty
      FROM public.order_items
     WHERE order_id = p_order_id
       AND COALESCE(item_kind, 'product') = 'product'
       AND product_id IS NOT NULL
  LOOP
    PERFORM public.increment_product_stock(r.product_id, r.qty);
    v_restored := v_restored + 1;
  END LOOP;

  RETURN v_restored;
END;
$$;

REVOKE ALL ON FUNCTION public.restore_order_stock(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.restore_order_stock(uuid) FROM authenticated;
REVOKE ALL ON FUNCTION public.restore_order_stock(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.restore_order_stock(uuid) TO service_role;

COMMENT ON FUNCTION public.restore_order_stock(uuid) IS
  'Restores product stock for a single order from its order_items rows.';


-- ─── 5) Align single-product decrement with NULL=unlimited ──────────────────
CREATE OR REPLACE FUNCTION public.decrement_product_stock(
  p_product_id uuid,
  p_qty        integer
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_current_stock integer;
  v_new_stock     integer;
BEGIN
  IF p_qty <= 0 THEN
    RAISE EXCEPTION 'decrement_product_stock: p_qty doit être > 0 (reçu: %)', p_qty;
  END IF;

  SELECT stock
    INTO v_current_stock
    FROM public.products
   WHERE id = p_product_id
     FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'decrement_product_stock: produit % introuvable', p_product_id;
  END IF;

  -- NULL stock = unlimited (matches check_cart_stock / decrement_cart_stock).
  IF v_current_stock IS NULL THEN
    RETURN NULL;
  END IF;

  IF v_current_stock < p_qty THEN
    RAISE EXCEPTION
      'decrement_product_stock: stock insuffisant pour le produit % (disponible: %, demandé: %)',
      p_product_id, v_current_stock, p_qty;
  END IF;

  v_new_stock := v_current_stock - p_qty;

  UPDATE public.products
     SET stock = v_new_stock
   WHERE id = p_product_id;

  RETURN v_new_stock;
END;
$$;

REVOKE ALL ON FUNCTION public.decrement_product_stock(uuid, integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.decrement_product_stock(uuid, integer) FROM authenticated;
REVOKE ALL ON FUNCTION public.decrement_product_stock(uuid, integer) FROM anon;
GRANT EXECUTE ON FUNCTION public.decrement_product_stock(uuid, integer) TO service_role;


-- ─── 6) Cancel restores stock (once; double-cancel still blocked) ───────────
CREATE OR REPLACE FUNCTION public.fn_cancel_order(p_order_id uuid)
RETURNS public.orders
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_order public.orders;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Authentification requise';
  END IF;
  IF p_order_id IS NULL THEN
    RAISE EXCEPTION 'Commande invalide';
  END IF;

  SELECT * INTO v_order FROM public.orders WHERE id = p_order_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Commande introuvable';
  END IF;

  IF lower(coalesce(v_order.status, '')) IN ('annulee', 'cancelled', 'canceled', 'livre', 'delivered') THEN
    RAISE EXCEPTION 'Cette commande ne peut plus être annulée';
  END IF;

  IF NOT (
    public.is_platform_admin()
    OR v_order.client_id = v_uid
    OR v_order.vendeur_id = v_uid
  ) THEN
    RAISE EXCEPTION 'Non autorisé à annuler cette commande';
  END IF;

  UPDATE public.orders
  SET
    status = 'annulee',
    payment_status = CASE
      WHEN coalesce(payment_status, 'pending') IN ('paid', 'cod_pending') THEN payment_status
      ELSE 'cancelled'
    END,
    livraison_status = CASE
      WHEN coalesce(livraison_status, 'pending') = 'livre' THEN livraison_status
      ELSE 'annulee'
    END,
    updated_at = now()
  WHERE id = p_order_id
  RETURNING * INTO v_order;

  UPDATE public.deliveries
  SET
    statut = 'annule',
    annule_at = coalesce(annule_at, now())
  WHERE order_id::text = p_order_id::text
    AND coalesce(statut, '') NOT IN ('livre', 'annule');

  -- Stock was reserved at confirm_checkout; put it back exactly once on cancel.
  PERFORM public.restore_order_stock(p_order_id);

  RETURN v_order;
END;
$$;

REVOKE ALL ON FUNCTION public.fn_cancel_order(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.fn_cancel_order(uuid) TO authenticated;
