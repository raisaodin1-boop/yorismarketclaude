-- Harden service_bookings ownership / status / order linkage.
--
-- Bug: service_bookings UPDATE RLS only checks identity
--   (client_id = auth.uid() OR provider_id = auth.uid()).
-- RLS WITH CHECK cannot compare OLD vs NEW, so the client on a booking can
-- PATCH provider_id / order_id / status directly. That hijacks the job away
-- from the real provider, forges completion, and can re-point the row at
-- another order (money impact once service checkout settlement lands).
--
-- INSERT was similarly open: any authenticated client could insert a row with
-- status='completed' and an arbitrary order_id.
--
-- Trusted paths remain available:
--   - platform admins
--   - service_role (confirm_checkout Edge Function) via current_user <> 'authenticated'
--   - the assigned provider may still advance status (ProviderDashboard accept/refuse)

DROP POLICY IF EXISTS service_bookings_insert_client_or_admin ON public.service_bookings;
CREATE POLICY service_bookings_insert_client_or_admin
  ON public.service_bookings FOR INSERT TO authenticated
  WITH CHECK (
    public.is_platform_admin()
    OR (
      client_id = auth.uid()
      AND coalesce(status, 'reserved') IN ('reserved', 'pending')
      AND order_id IS NULL
    )
  );

CREATE OR REPLACE FUNCTION public.fn_guard_service_booking_sensitive_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  -- Service-role writers and platform admins keep full access.
  IF current_user <> 'authenticated' OR public.is_platform_admin() THEN
    RETURN NEW;
  END IF;

  IF NEW.provider_id IS DISTINCT FROM OLD.provider_id
    OR NEW.client_id IS DISTINCT FROM OLD.client_id
    OR NEW.order_id IS DISTINCT FROM OLD.order_id
    OR NEW.service_id IS DISTINCT FROM OLD.service_id
  THEN
    RAISE EXCEPTION 'Only admins may change service booking ownership or order linkage'
      USING ERRCODE = '42501';
  END IF;

  -- Status transitions: assigned provider only (clients cannot mark completed).
  IF NEW.status IS DISTINCT FROM OLD.status
    AND OLD.provider_id IS DISTINCT FROM auth.uid()
  THEN
    RAISE EXCEPTION 'Only the assigned provider may advance service booking status'
      USING ERRCODE = '42501';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_guard_service_booking_sensitive_update ON public.service_bookings;
CREATE TRIGGER trg_guard_service_booking_sensitive_update
  BEFORE UPDATE ON public.service_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.fn_guard_service_booking_sensitive_update();

COMMENT ON FUNCTION public.fn_guard_service_booking_sensitive_update() IS
  'Blocks clients from forging service booking provider, order linkage, or status.';
