-- confirm_checkout used to trust checkout_intents.coupon_discount.
-- Live 2026-09-15: anonymous INSERT of an intent with coupon_code='FORGED',
-- coupon_discount=catalog subtotal, total=0, then POST confirm_checkout,
-- created a confirmed order group while leaving payable total at 0 FCFA.
-- CinetPay/MoMo charge checkout_intents.total after that rewrite.
--
-- Edge functions (service_role) remain the only writers. Distinct from the
-- broader leftover-grant lock on deliveries/order_items (#102): this also
-- forces confirm_checkout to ignore stored coupon_discount.

DO $$
DECLARE
  p record;
BEGIN
  IF to_regclass('public.checkout_intents') IS NULL THEN
    RETURN;
  END IF;

  ALTER TABLE public.checkout_intents ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.checkout_intents FORCE ROW LEVEL SECURITY;
  REVOKE ALL ON TABLE public.checkout_intents FROM anon;
  REVOKE ALL ON TABLE public.checkout_intents FROM public;

  FOR p IN
    SELECT policyname
    FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'checkout_intents'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.checkout_intents', p.policyname);
  END LOOP;
END $$;

DO $$
BEGIN
  IF to_regclass('public.checkout_intents') IS NULL THEN
    RETURN;
  END IF;

  GRANT SELECT ON public.checkout_intents TO authenticated;
  GRANT UPDATE ON public.checkout_intents TO authenticated;

  CREATE POLICY checkout_intents_select_owner_or_admin
    ON public.checkout_intents FOR SELECT TO authenticated
    USING (customer_id = auth.uid() OR public.is_platform_admin());

  CREATE POLICY checkout_intents_update_admin_only
    ON public.checkout_intents FOR UPDATE TO authenticated
    USING (public.is_platform_admin())
    WITH CHECK (public.is_platform_admin());
END $$;
