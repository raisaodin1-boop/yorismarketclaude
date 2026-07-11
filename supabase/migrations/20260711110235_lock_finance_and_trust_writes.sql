-- Critical security hardening for finance and trust fields.
--
-- RLS WITH CHECK only sees the proposed row, so it cannot prove that sensitive
-- columns were preserved. These triggers compare OLD and NEW rows and reserve
-- money, escrow, and verification fields for platform admins or service-role
-- backends.

CREATE OR REPLACE FUNCTION public.is_trusted_security_writer()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT coalesce(auth.role(), '') = 'service_role'
    OR public.is_platform_admin();
$$;

REVOKE ALL ON FUNCTION public.is_trusted_security_writer() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_trusted_security_writer() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_trusted_security_writer() TO service_role;

-- Orders: sellers may update operational status, but never payment/escrow or
-- accounting columns directly from the browser.
CREATE OR REPLACE FUNCTION public.fn_guard_order_financial_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP <> 'UPDATE' THEN
    RETURN NEW;
  END IF;

  IF public.is_trusted_security_writer() THEN
    RETURN NEW;
  END IF;

  IF NEW.payment_status IS DISTINCT FROM OLD.payment_status
    OR NEW.escrow_status IS DISTINCT FROM OLD.escrow_status
    OR NEW.payment_method IS DISTINCT FROM OLD.payment_method
    OR NEW.payment_provider IS DISTINCT FROM OLD.payment_provider
    OR NEW.provider_tx_ref IS DISTINCT FROM OLD.provider_tx_ref
    OR NEW.payout_status IS DISTINCT FROM OLD.payout_status
    OR NEW.montant IS DISTINCT FROM OLD.montant
    OR NEW.commission IS DISTINCT FROM OLD.commission
    OR NEW.montant_vendeur IS DISTINCT FROM OLD.montant_vendeur
  THEN
    RAISE EXCEPTION 'order financial fields are restricted to platform admins';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_guard_order_financial_fields ON public.orders;
CREATE TRIGGER trg_guard_order_financial_fields
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.fn_guard_order_financial_fields();

DROP POLICY IF EXISTS orders_update_seller_guarded ON public.orders;
CREATE POLICY orders_update_seller_guarded
  ON public.orders FOR UPDATE TO authenticated
  USING (vendeur_id = auth.uid())
  WITH CHECK (
    vendeur_id = auth.uid()
    AND coalesce(status, 'pending') IN ('pending', 'validee', 'livre', 'annulee', 'shipped', 'delivered', 'paid')
    AND coalesce(livraison_status, 'pending') IN ('pending', 'pending_pickup', 'preparation', 'collecte', 'en_route', 'livre', 'shipped', 'delivered')
    AND coalesce(escrow_status, 'pending') IN ('pending', 'securise', 'libere', 'rembourse')
    AND coalesce(payment_status, 'pending') IN ('pending', 'cod_pending', 'paid', 'failed')
  );

-- Admin finance KPIs must not bypass orders RLS for every authenticated user.
-- Admins still see platform-wide totals through orders_select_related_or_admin;
-- non-admins can no longer read owner-bypassed platform aggregates.
CREATE OR REPLACE VIEW public.admin_finance_kpis
WITH (security_invoker = true) AS
SELECT
  coalesce(sum(o.montant), 0)::numeric(14, 2) AS volume_total,
  coalesce(sum(o.commission), 0)::numeric(14, 2) AS yorix_commission_total,
  coalesce(sum(CASE WHEN o.payment_status = 'paid' THEN o.montant_vendeur ELSE 0 END), 0)::numeric(14, 2) AS seller_net_payable,
  coalesce(sum(CASE WHEN o.payment_status = 'paid' AND o.livraison_status = 'livre' THEN o.montant_vendeur ELSE 0 END), 0)::numeric(14, 2) AS seller_net_releasable,
  coalesce(sum(CASE WHEN o.payment_method = 'cod' THEN o.montant ELSE 0 END), 0)::numeric(14, 2) AS cod_volume,
  count(*)::int AS total_orders
FROM public.orders o;

REVOKE ALL ON public.admin_finance_kpis FROM PUBLIC;
GRANT SELECT ON public.admin_finance_kpis TO authenticated;

-- KYC rows: sellers can draft/submit their dossier, but cannot approve it or
-- forge reviewer metadata. Admin RPCs and service-role jobs remain allowed.
CREATE OR REPLACE FUNCTION public.fn_guard_seller_kyc_review_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF public.is_trusted_security_writer() THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'INSERT' THEN
    IF NEW.status = 'verified'
      OR NEW.reviewed_at IS NOT NULL
      OR NEW.reviewer_id IS NOT NULL
      OR NEW.reviewer_note IS NOT NULL
    THEN
      RAISE EXCEPTION 'seller KYC review fields are restricted to platform admins';
    END IF;
    RETURN NEW;
  END IF;

  IF NEW.status = 'verified'
    OR NEW.reviewed_at IS DISTINCT FROM OLD.reviewed_at
    OR NEW.reviewer_id IS DISTINCT FROM OLD.reviewer_id
    OR NEW.reviewer_note IS DISTINCT FROM OLD.reviewer_note
  THEN
    RAISE EXCEPTION 'seller KYC review fields are restricted to platform admins';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_guard_seller_kyc_review_fields ON public.seller_kyc;
CREATE TRIGGER trg_guard_seller_kyc_review_fields
  BEFORE INSERT OR UPDATE ON public.seller_kyc
  FOR EACH ROW
  EXECUTE FUNCTION public.fn_guard_seller_kyc_review_fields();

DROP POLICY IF EXISTS seller_kyc_insert_own ON public.seller_kyc;
CREATE POLICY seller_kyc_insert_own
  ON public.seller_kyc FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND coalesce(status, 'draft') IN ('draft', 'pending')
  );

DROP POLICY IF EXISTS seller_kyc_update_own ON public.seller_kyc;
CREATE POLICY seller_kyc_update_own
  ON public.seller_kyc FOR UPDATE TO authenticated
  USING (user_id = auth.uid() OR public.is_platform_admin())
  WITH CHECK (
    public.is_platform_admin()
    OR (
      user_id = auth.uid()
      AND coalesce(status, 'draft') IN ('draft', 'pending', 'info_requested', 'rejected')
    )
  );

-- Profile/product verification badges must only be written by admin tooling.
CREATE OR REPLACE FUNCTION public.fn_guard_profile_verification_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP <> 'UPDATE' OR public.is_trusted_security_writer() THEN
    RETURN NEW;
  END IF;

  IF NEW.verifie IS DISTINCT FROM OLD.verifie
    OR NEW.seller_verified_at IS DISTINCT FROM OLD.seller_verified_at
  THEN
    RAISE EXCEPTION 'profile verification fields are restricted to platform admins';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_guard_profile_verification_fields ON public.profiles;
CREATE TRIGGER trg_guard_profile_verification_fields
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.fn_guard_profile_verification_fields();

CREATE OR REPLACE FUNCTION public.fn_guard_product_verification_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP <> 'UPDATE' OR public.is_trusted_security_writer() THEN
    RETURN NEW;
  END IF;

  IF NEW.vendeur_verifie IS DISTINCT FROM OLD.vendeur_verifie THEN
    RAISE EXCEPTION 'product seller verification fields are restricted to platform admins';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_guard_product_verification_fields ON public.products;
CREATE TRIGGER trg_guard_product_verification_fields
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.fn_guard_product_verification_fields();

-- Wallet creation remains available during signup, but the first client insert
-- must be a zero-balance wallet. Credits and debits must use admin/service paths.
DROP POLICY IF EXISTS wallets_insert_owner ON public.wallets;
CREATE POLICY wallets_insert_owner
  ON public.wallets FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND coalesce(solde, 0) = 0
    AND coalesce(total_gagne, 0) = 0
  );
