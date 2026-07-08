-- Orders cancel: admin could SELECT but not UPDATE (stale update_orders policy).
-- Idempotent.

DROP POLICY IF EXISTS update_orders ON public.orders;
DROP POLICY IF EXISTS orders_update_seller_or_admin_guarded ON public.orders;
DROP POLICY IF EXISTS orders_update_related_guarded ON public.orders;

DROP POLICY IF EXISTS orders_update_admin ON public.orders;
CREATE POLICY orders_update_admin
  ON public.orders FOR UPDATE TO authenticated
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

DROP POLICY IF EXISTS orders_update_participant ON public.orders;
CREATE POLICY orders_update_participant
  ON public.orders FOR UPDATE TO authenticated
  USING (
    client_id = auth.uid()
    OR vendeur_id = auth.uid()
    OR livreur_id = auth.uid()
  )
  WITH CHECK (
    client_id = auth.uid()
    OR vendeur_id = auth.uid()
    OR livreur_id = auth.uid()
  );

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

  RETURN v_order;
END;
$$;

REVOKE ALL ON FUNCTION public.fn_cancel_order(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.fn_cancel_order(uuid) TO authenticated;
