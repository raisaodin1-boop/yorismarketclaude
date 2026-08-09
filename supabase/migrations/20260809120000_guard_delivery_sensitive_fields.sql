-- Harden deliveries money / ownership / fulfillment fields.
--
-- Bug: deliveries UPDATE RLS only checks identity
--   (client_id = auth.uid() OR livreur_id = auth.uid()).
-- RLS WITH CHECK cannot compare OLD vs NEW, so an assigned courier (or the
-- client) can PATCH commission_livreur / montant / order_id / statut directly.
-- livreur_stats then reports forged gains, and clients can mark missions livre.
--
-- INSERT was similarly open: any authenticated client could insert a row with
-- statut='livre', livreur_id=self, and an arbitrary commission_livreur.
--
-- Trusted paths remain available:
--   - platform admins (dashboard assign/edit)
--   - service_role / SECURITY DEFINER RPCs (accepter_livraison, refuser_livraison,
--     Edge Function auto-delivery) via current_user <> 'authenticated'

DROP POLICY IF EXISTS deliveries_insert_authenticated_owner_or_admin ON public.deliveries;
CREATE POLICY deliveries_insert_authenticated_owner_or_admin
  ON public.deliveries FOR INSERT TO authenticated
  WITH CHECK (
    public.is_platform_admin()
    OR (
      client_id = auth.uid()
      AND coalesce(statut, 'commande_recue') = 'commande_recue'
      AND coalesce(commission_livreur, 0) = 0
      AND livreur_id IS NULL
    )
  );

CREATE OR REPLACE FUNCTION public.fn_guard_delivery_sensitive_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  -- Service-role / SECURITY DEFINER writers and platform admins keep full access.
  IF current_user <> 'authenticated' OR public.is_platform_admin() THEN
    RETURN NEW;
  END IF;

  IF NEW.commission_livreur IS DISTINCT FROM OLD.commission_livreur
    OR NEW.montant IS DISTINCT FROM OLD.montant
    OR NEW.order_id IS DISTINCT FROM OLD.order_id
    OR NEW.client_id IS DISTINCT FROM OLD.client_id
    OR NEW.code_suivi IS DISTINCT FROM OLD.code_suivi
  THEN
    RAISE EXCEPTION 'Only admins may change delivery pricing or ownership fields'
      USING ERRCODE = '42501';
  END IF;

  IF NEW.livreur_id IS DISTINCT FROM OLD.livreur_id
    OR NEW.livreur_nom IS DISTINCT FROM OLD.livreur_nom
    OR NEW.livreur_tel IS DISTINCT FROM OLD.livreur_tel
    OR NEW.livreur_vehicule IS DISTINCT FROM OLD.livreur_vehicule
  THEN
    RAISE EXCEPTION 'Only admins may assign or reassign couriers'
      USING ERRCODE = '42501';
  END IF;

  -- Status transitions: assigned courier only (clients cannot mark livre/annule).
  IF NEW.statut IS DISTINCT FROM OLD.statut
    AND OLD.livreur_id IS DISTINCT FROM auth.uid()
  THEN
    RAISE EXCEPTION 'Only the assigned courier may advance delivery status'
      USING ERRCODE = '42501';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_guard_delivery_sensitive_update ON public.deliveries;
CREATE TRIGGER trg_guard_delivery_sensitive_update
  BEFORE UPDATE ON public.deliveries
  FOR EACH ROW
  EXECUTE FUNCTION public.fn_guard_delivery_sensitive_update();

COMMENT ON FUNCTION public.fn_guard_delivery_sensitive_update() IS
  'Blocks clients/couriers from forging delivery commission, ownership, assignment, or unauthorized status changes.';
