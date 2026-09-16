-- Empirical repro: DEFINER-style INSERT of profiles.role=superadmin
-- (simulates production handle_new_user). Prints BUG_REPRODUCED.

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
  role text NOT NULL DEFAULT 'buyer',
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

CREATE OR REPLACE FUNCTION public.fn_admin_update_user_role(
  p_user_id uuid,
  p_new_role text
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

  IF p_new_role NOT IN ('buyer', 'seller', 'delivery', 'provider', 'admin', 'admin_partner', 'superadmin') THEN
    RAISE EXCEPTION 'Rôle invalide';
  END IF;

  UPDATE public.profiles SET role = p_new_role, updated_at = now()
  WHERE id = p_user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Utilisateur introuvable';
  END IF;

  RETURN jsonb_build_object('ok', true, 'role', p_new_role);
END;
$$;
REVOKE ALL ON FUNCTION public.fn_admin_update_user_role(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.fn_admin_update_user_role(uuid, text) TO authenticated;

-- Simulates handle_new_user (SECURITY DEFINER, table owner, bypasses RLS).
CREATE OR REPLACE FUNCTION public.handle_new_user_sim(p_id uuid, p_meta_role text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, nom, email, role)
  VALUES (p_id, 'Meta User', 'meta@example.com', p_meta_role);
END;
$$;

DO $repro$
DECLARE
  v_attacker uuid := 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
  v_role text;
BEGIN
  PERFORM set_config('request.jwt.claim.sub', v_attacker::text, true);
  PERFORM public.handle_new_user_sim(v_attacker, 'superadmin');

  SELECT role INTO v_role FROM public.profiles WHERE id = v_attacker;
  IF v_role IS DISTINCT FROM 'superadmin' THEN
    RAISE EXCEPTION 'expected DEFINER insert to store superadmin, got %', v_role;
  END IF;

  IF NOT public.is_platform_admin() THEN
    RAISE EXCEPTION 'expected forged superadmin JWT to pass is_platform_admin()';
  END IF;

  RAISE NOTICE 'BUG_REPRODUCED';
END;
$repro$;
