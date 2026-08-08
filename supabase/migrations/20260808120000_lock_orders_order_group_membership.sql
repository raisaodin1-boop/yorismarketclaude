-- Freeze checkout order-group membership after confirm_checkout.
--
-- Bug: authenticated buyers could INSERT extra pending rows into an existing
-- `order_group_id` (or sellers could UPDATE an unpaid row onto that group).
-- MoMo/CinetPay settlement then marks every row in the group paid/escrowed for
-- the cheap checkout total — under-collection / free goods.
--
-- Service role (confirm_checkout Edge Function) bypasses RLS and remains the
-- only writer that may assign `order_group_id` on insert. Legacy WhatsApp /
-- ModalCommander inserts omit the column and stay valid.

DROP POLICY IF EXISTS orders_insert_buyer_pending_only ON public.orders;
CREATE POLICY orders_insert_buyer_pending_only
  ON public.orders FOR INSERT TO authenticated
  WITH CHECK (
    client_id = auth.uid()
    AND order_group_id IS NULL
    AND coalesce(status, 'pending') = 'pending'
    AND coalesce(livraison_status, 'pending') IN ('pending', 'pending_pickup')
    AND coalesce(escrow_status, 'pending') = 'pending'
    AND coalesce(payment_status, 'pending') IN ('pending', 'cod_pending')
    AND coalesce(commission, 0) >= 0
    AND coalesce(montant, 0) >= 0
    AND coalesce(montant_vendeur, 0) >= 0
  );

CREATE OR REPLACE FUNCTION public.is_trusted_security_writer()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    coalesce(auth.role(), '') = 'service_role'
    OR public.is_platform_admin();
$$;

REVOKE ALL ON FUNCTION public.is_trusted_security_writer() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_trusted_security_writer() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_trusted_security_writer() TO service_role;

CREATE OR REPLACE FUNCTION public.fn_guard_order_group_id()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.order_group_id IS DISTINCT FROM OLD.order_group_id
     AND NOT public.is_trusted_security_writer() THEN
    RAISE EXCEPTION 'order_group_id is immutable after insert';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_guard_order_group_id ON public.orders;
CREATE TRIGGER trg_guard_order_group_id
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.fn_guard_order_group_id();

COMMENT ON FUNCTION public.fn_guard_order_group_id() IS
  'Prevents clients/sellers from moving unpaid order rows into another payable checkout group.';
