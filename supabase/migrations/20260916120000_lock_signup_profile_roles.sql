-- Lock profiles.role against signup / metadata privilege escalation.
--
-- Bug (live 2026-09-16): POST /auth/v1/signup with user_metadata.role=superadmin
-- creates public.profiles.role=superadmin. handle_new_user is SECURITY DEFINER
-- (body not in repo) and bypasses profiles_insert_self RLS, which only allows
-- buyer/seller/provider/delivery. The resulting session has
-- is_platform_admin() = true and can read orders, payment_transactions, and
-- call fn_admin_update_user_role.
--
-- RLS WITH CHECK cannot stop a DEFINER insert as the table owner. A BEFORE
-- INSERT OR UPDATE trigger still sees NEW.role. Trusted admin writes go
-- through fn_admin_update_user_role, where auth.uid() is already an admin.

CREATE OR REPLACE FUNCTION public.fn_guard_profile_signup_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  public_roles constant text[] := ARRAY['buyer', 'seller', 'provider', 'delivery'];
  staff_roles constant text[] := ARRAY['admin', 'admin_partner', 'superadmin'];
BEGIN
  IF NEW.role IS NULL OR btrim(NEW.role) = '' THEN
    NEW.role := 'buyer';
  END IF;

  IF NEW.role = ANY (public_roles) THEN
    RETURN NEW;
  END IF;

  -- Existing platform admin (JWT) may assign staff roles, including via
  -- SECURITY DEFINER RPCs that keep request.jwt.claim.sub of the caller.
  IF NEW.role = ANY (staff_roles) AND public.is_platform_admin() THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'INSERT' THEN
    -- Signup / OAuth / handle_new_user: never fail account creation, clamp.
    NEW.role := 'buyer';
    RETURN NEW;
  END IF;

  RAISE EXCEPTION 'Role non autorisé'
    USING ERRCODE = '42501';
END;
$$;

DROP TRIGGER IF EXISTS trg_guard_profile_signup_role ON public.profiles;
DO $$
BEGIN
  IF to_regclass('public.profiles') IS NULL THEN
    RETURN;
  END IF;

  CREATE TRIGGER trg_guard_profile_signup_role
    BEFORE INSERT OR UPDATE OF role ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.fn_guard_profile_signup_role();
END $$;

COMMENT ON FUNCTION public.fn_guard_profile_signup_role() IS
  'Clamps signup/OAuth/handle_new_user profile roles to the public allowlist; staff roles require is_platform_admin().';
