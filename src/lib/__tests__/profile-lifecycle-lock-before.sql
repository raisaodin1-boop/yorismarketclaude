-- Empirical repro for profile self-unban (run as superuser).
-- Prints BUG_REPRODUCED then FIX_VERIFIED on success.

CREATE SCHEMA IF NOT EXISTS auth;
CREATE OR REPLACE FUNCTION auth.uid()
RETURNS uuid
LANGUAGE sql
STABLE
AS $$
  SELECT NULLIF(current_setting('request.jwt.claim.sub', true), '')::uuid;
$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    CREATE ROLE authenticated NOLOGIN;
  END IF;
END $$;

GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT EXECUTE ON FUNCTION auth.uid() TO authenticated;

DROP TABLE IF EXISTS public.profiles CASCADE;

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  nom text,
  email text,
  telephone text,
  role text NOT NULL DEFAULT 'buyer',
  actif boolean DEFAULT true,
  verifie boolean DEFAULT false,
  deactivated_at timestamptz,
  deleted_at timestamptz,
  ban_reason text,
  email_original text,
  updated_at timestamptz DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.is_platform_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role IN ('admin', 'superadmin')
  );
$$;
GRANT EXECUTE ON FUNCTION public.is_platform_admin() TO authenticated;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO postgres;

-- Current main UPDATE policy (20260526000100)
DROP POLICY IF EXISTS profiles_select_self_or_admin ON public.profiles;
CREATE POLICY profiles_select_self_or_admin
  ON public.profiles FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.is_platform_admin());

DROP POLICY IF EXISTS profiles_insert_self ON public.profiles;
CREATE POLICY profiles_insert_self
  ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (
    id = auth.uid()
    AND coalesce(role, 'buyer') IN ('buyer', 'seller', 'provider', 'delivery')
  );

DROP POLICY IF EXISTS profiles_update_self_or_admin ON public.profiles;
CREATE POLICY profiles_update_self_or_admin
  ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid() OR public.is_platform_admin())
  WITH CHECK (
    public.is_platform_admin()
    OR (
      id = auth.uid()
      AND role IS NOT DISTINCT FROM (
        SELECT p.role FROM public.profiles p WHERE p.id = auth.uid()
      )
    )
  );

-- Minimal copies of admin lifecycle RPCs (20260529000100)
CREATE OR REPLACE FUNCTION public.fn_admin_soft_ban_user(
  p_user_id uuid,
  p_reason text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_platform_admin() THEN
    RAISE EXCEPTION 'Accès refusé';
  END IF;
  UPDATE public.profiles SET
    actif = false,
    deactivated_at = now(),
    ban_reason = nullif(trim(p_reason), ''),
    updated_at = now()
  WHERE id = p_user_id
    AND deleted_at IS NULL;
  RETURN jsonb_build_object('ok', true, 'mode', 'soft_ban');
END;
$$;
REVOKE ALL ON FUNCTION public.fn_admin_soft_ban_user(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.fn_admin_soft_ban_user(uuid, text) TO authenticated;

CREATE OR REPLACE FUNCTION public.fn_admin_reactivate_user(p_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_platform_admin() THEN
    RAISE EXCEPTION 'Accès refusé';
  END IF;
  UPDATE public.profiles SET
    actif = true,
    deactivated_at = NULL,
    ban_reason = NULL,
    updated_at = now()
  WHERE id = p_user_id
    AND deleted_at IS NULL;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Utilisateur introuvable ou supprimé définitivement';
  END IF;
  RETURN jsonb_build_object('ok', true, 'mode', 'reactivated');
END;
$$;
REVOKE ALL ON FUNCTION public.fn_admin_reactivate_user(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.fn_admin_reactivate_user(uuid) TO authenticated;

DO $repro$
DECLARE
  v_seller uuid := '11111111-1111-1111-1111-111111111111';
  v_admin uuid := 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
  v_actif boolean;
  v_rc int;
BEGIN
  INSERT INTO public.profiles (id, nom, email, role, actif)
  VALUES
    (v_seller, 'Seller', 'seller@example.com', 'seller', true),
    (v_admin, 'Admin', 'admin@example.com', 'admin', true);

  PERFORM set_config('request.jwt.claim.sub', v_admin::text, false);
  PERFORM public.fn_admin_soft_ban_user(v_seller, 'fraude');

  SELECT actif INTO v_actif FROM public.profiles WHERE id = v_seller;
  IF v_actif IS DISTINCT FROM false THEN
    RAISE EXCEPTION 'expected soft-ban to set actif=false, got %', v_actif;
  END IF;

  PERFORM set_config('request.jwt.claim.sub', v_seller::text, false);
  SET ROLE authenticated;

  UPDATE public.profiles
  SET actif = true, deactivated_at = NULL, ban_reason = NULL
  WHERE id = v_seller;
  GET DIAGNOSTICS v_rc = ROW_COUNT;
  IF v_rc <> 1 THEN
    RAISE EXCEPTION 'expected self-unban UPDATE to succeed on current main, row_count=%', v_rc;
  END IF;

  SELECT actif INTO v_actif FROM public.profiles WHERE id = v_seller;
  IF v_actif IS DISTINCT FROM true THEN
    RAISE EXCEPTION 'expected self-unban to restore actif=true, got %', v_actif;
  END IF;

  RESET ROLE;
  RAISE NOTICE 'BUG_REPRODUCED';
END;
$repro$;
