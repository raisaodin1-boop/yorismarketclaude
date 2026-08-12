-- Lock seller verification / trust-badge fields.
--
-- Bug: authenticated sellers can forge marketplace trust signals because RLS only
-- checks row ownership, not column semantics:
--   1) products.vendeur_verifie (and Made in CM "verified") via products_update_seller
--   2) profiles.verifie / seller_verified_at via profiles_update_self_or_admin
--      (policy only preserves role)
--   3) seller_kyc.status / reviewer_* via seller_kyc_update_own / insert_own
--
-- Trigger scenario (reproduced on PostgreSQL 16 with current policies):
--   SET ROLE authenticated; SET request.jwt.claim.sub = <seller>;
--   UPDATE products SET vendeur_verifie = true WHERE vendeur_id = auth.uid();
--   UPDATE profiles SET verifie = true WHERE id = auth.uid();
--   UPDATE seller_kyc SET status = 'verified' WHERE user_id = auth.uid();
-- → VerifiedSellerBadge appears without admin KYC approval; pending KYC leaves the queue.
--
-- Trusted writers remain:
--   - platform admins (dashboard toggle / MIC buttons)
--   - service_role / SECURITY DEFINER RPCs (fn_admin_decide_seller_kyc) via
--     current_user <> 'authenticated'

-- ─── products: freeze vendeur_verifie + admin-only MIC statuses ───────────────
CREATE OR REPLACE FUNCTION public.fn_guard_product_verification_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF current_user <> 'authenticated' OR public.is_platform_admin() THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'INSERT' THEN
    IF coalesce(NEW.vendeur_verifie, false) IS TRUE THEN
      RAISE EXCEPTION 'Only admins may set product verification badge'
        USING ERRCODE = '42501';
    END IF;
    IF NEW.made_in_cameroon_status IS NOT NULL
       AND NEW.made_in_cameroon_status IN ('verified', 'rejected')
    THEN
      RAISE EXCEPTION 'Only admins may set Made in Cameroon verified/rejected status'
        USING ERRCODE = '42501';
    END IF;
    IF NEW.made_in_cameroon_verified_at IS NOT NULL THEN
      RAISE EXCEPTION 'Only admins may set Made in Cameroon verification timestamp'
        USING ERRCODE = '42501';
    END IF;
    RETURN NEW;
  END IF;

  IF NEW.vendeur_verifie IS DISTINCT FROM OLD.vendeur_verifie THEN
    RAISE EXCEPTION 'Only admins may change product verification badge'
      USING ERRCODE = '42501';
  END IF;

  IF NEW.made_in_cameroon_status IS DISTINCT FROM OLD.made_in_cameroon_status THEN
    IF NEW.made_in_cameroon_status IN ('verified', 'rejected')
       OR OLD.made_in_cameroon_status IN ('verified', 'rejected')
    THEN
      RAISE EXCEPTION 'Only admins may change Made in Cameroon verified/rejected status'
        USING ERRCODE = '42501';
    END IF;
  END IF;

  IF NEW.made_in_cameroon_verified_at IS DISTINCT FROM OLD.made_in_cameroon_verified_at THEN
    RAISE EXCEPTION 'Only admins may change Made in Cameroon verification timestamp'
      USING ERRCODE = '42501';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_guard_product_verification_fields ON public.products;
CREATE TRIGGER trg_guard_product_verification_fields
  BEFORE INSERT OR UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.fn_guard_product_verification_fields();

COMMENT ON FUNCTION public.fn_guard_product_verification_fields() IS
  'Blocks sellers from forging vendeur_verifie / Made in Cameroon verified badges.';

-- ─── profiles: freeze verifie + seller_verified_at ───────────────────────────
CREATE OR REPLACE FUNCTION public.fn_guard_profile_verification_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF TG_OP <> 'UPDATE' THEN
    RETURN NEW;
  END IF;

  IF current_user <> 'authenticated' OR public.is_platform_admin() THEN
    RETURN NEW;
  END IF;

  IF NEW.verifie IS DISTINCT FROM OLD.verifie
    OR NEW.seller_verified_at IS DISTINCT FROM OLD.seller_verified_at
  THEN
    RAISE EXCEPTION 'Only admins may change seller verification flags'
      USING ERRCODE = '42501';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_guard_profile_verification_fields ON public.profiles;
CREATE TRIGGER trg_guard_profile_verification_fields
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.fn_guard_profile_verification_fields();

COMMENT ON FUNCTION public.fn_guard_profile_verification_fields() IS
  'Blocks self-service forging of profiles.verifie / seller_verified_at.';

-- ─── seller_kyc: sellers may draft/submit, never self-approve ────────────────
DROP POLICY IF EXISTS seller_kyc_insert_own ON public.seller_kyc;
CREATE POLICY seller_kyc_insert_own
  ON public.seller_kyc FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND coalesce(status, 'draft') IN ('draft', 'pending')
    AND reviewer_id IS NULL
    AND reviewed_at IS NULL
    AND reviewer_note IS NULL
  );

CREATE OR REPLACE FUNCTION public.fn_guard_seller_kyc_decision_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF current_user <> 'authenticated' OR public.is_platform_admin() THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'INSERT' THEN
    IF coalesce(NEW.status, 'draft') NOT IN ('draft', 'pending') THEN
      RAISE EXCEPTION 'Sellers may only create draft or pending KYC rows'
        USING ERRCODE = '42501';
    END IF;
    IF NEW.reviewer_id IS NOT NULL
      OR NEW.reviewed_at IS NOT NULL
      OR NEW.reviewer_note IS NOT NULL
    THEN
      RAISE EXCEPTION 'Sellers may not set KYC review fields'
        USING ERRCODE = '42501';
    END IF;
    RETURN NEW;
  END IF;

  IF NEW.user_id IS DISTINCT FROM OLD.user_id THEN
    RAISE EXCEPTION 'KYC ownership cannot be reassigned'
      USING ERRCODE = '42501';
  END IF;

  IF NEW.reviewer_id IS DISTINCT FROM OLD.reviewer_id
    OR NEW.reviewed_at IS DISTINCT FROM OLD.reviewed_at
    OR NEW.reviewer_note IS DISTINCT FROM OLD.reviewer_note
  THEN
    RAISE EXCEPTION 'Only admins may set KYC review fields'
      USING ERRCODE = '42501';
  END IF;

  IF NEW.status IS DISTINCT FROM OLD.status THEN
    IF NEW.status NOT IN ('draft', 'pending') THEN
      RAISE EXCEPTION 'Sellers may only set KYC status to draft or pending'
        USING ERRCODE = '42501';
    END IF;
    -- Once admin-verified, only admins may move the dossier.
    IF OLD.status = 'verified' THEN
      RAISE EXCEPTION 'Verified KYC can only be changed by admins'
        USING ERRCODE = '42501';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_guard_seller_kyc_decision_fields ON public.seller_kyc;
CREATE TRIGGER trg_guard_seller_kyc_decision_fields
  BEFORE INSERT OR UPDATE ON public.seller_kyc
  FOR EACH ROW
  EXECUTE FUNCTION public.fn_guard_seller_kyc_decision_fields();

COMMENT ON FUNCTION public.fn_guard_seller_kyc_decision_fields() IS
  'Blocks sellers from self-approving KYC or forging reviewer decision fields.';
