-- Sellers can advance the public order status from their dashboard, but payment,
-- escrow, fulfillment, and accounting fields must only be changed by trusted
-- server/admin flows. RLS WITH CHECK cannot compare OLD vs NEW values, so this
-- trigger closes the direct Supabase client bypass left by the seller policy.

DROP TRIGGER IF EXISTS trg_guard_seller_order_sensitive_update ON public.orders;
DROP FUNCTION IF EXISTS public.fn_guard_seller_order_sensitive_update();

CREATE OR REPLACE FUNCTION public.fn_guard_seller_order_sensitive_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  -- Service-role/API calls and trusted SECURITY DEFINER functions do not run as
  -- the PostgREST authenticated role. Platform admins still need direct panel
  -- writes for delivery/escrow operations.
  IF current_user <> 'authenticated' OR public.is_platform_admin() THEN
    RETURN NEW;
  END IF;

  IF auth.uid() IS NOT NULL AND OLD.vendeur_id = auth.uid() THEN
    IF NEW.vendeur_id IS DISTINCT FROM OLD.vendeur_id
      OR NEW.client_id IS DISTINCT FROM OLD.client_id
      OR NEW.livreur_id IS DISTINCT FROM OLD.livreur_id
      OR NEW.product_id IS DISTINCT FROM OLD.product_id
      OR NEW.order_group_id IS DISTINCT FROM OLD.order_group_id
      OR NEW.client_nom IS DISTINCT FROM OLD.client_nom
      OR NEW.telephone IS DISTINCT FROM OLD.telephone
      OR NEW.montant IS DISTINCT FROM OLD.montant
      OR NEW.commission IS DISTINCT FROM OLD.commission
      OR NEW.montant_vendeur IS DISTINCT FROM OLD.montant_vendeur
      OR NEW.livraison_status IS DISTINCT FROM OLD.livraison_status
      OR NEW.escrow_status IS DISTINCT FROM OLD.escrow_status
      OR NEW.payment_method IS DISTINCT FROM OLD.payment_method
      OR NEW.payment_status IS DISTINCT FROM OLD.payment_status
      OR NEW.payment_provider IS DISTINCT FROM OLD.payment_provider
      OR NEW.provider_tx_ref IS DISTINCT FROM OLD.provider_tx_ref
      OR NEW.payout_status IS DISTINCT FROM OLD.payout_status
    THEN
      RAISE EXCEPTION 'Sellers may only update order status'
        USING ERRCODE = '42501';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_guard_seller_order_sensitive_update
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.fn_guard_seller_order_sensitive_update();
