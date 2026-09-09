-- Lock anonymous (and non-peer) reads of profiles.email / telephone / points.
-- Production currently exposes every profile row to the publishable anon key.
-- Public storefronts keep a column-restricted view instead of SELECT * on profiles.

-- ─── 1) profiles: drop leftover permissive SELECT policies ─────────────────
DO $$
DECLARE
  p record;
BEGIN
  IF to_regclass('public.profiles') IS NULL THEN
    RETURN;
  END IF;

  ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;

  FOR p IN
    SELECT policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'profiles'
      AND cmd = 'SELECT'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.profiles', p.policyname);
  END LOOP;

  REVOKE ALL ON TABLE public.profiles FROM PUBLIC;
  REVOKE ALL ON TABLE public.profiles FROM anon;
  GRANT SELECT, INSERT, UPDATE ON TABLE public.profiles TO authenticated;
END $$;

DROP POLICY IF EXISTS profiles_select_self_or_admin ON public.profiles;
CREATE POLICY profiles_select_self_or_admin
  ON public.profiles FOR SELECT TO authenticated
  USING (
    id = auth.uid()
    OR public.is_platform_admin_viewer()
  );

DO $$
BEGIN
  IF to_regclass('public.conversations') IS NULL THEN
    RETURN;
  END IF;

  DROP POLICY IF EXISTS profiles_select_chat_peer ON public.profiles;
  CREATE POLICY profiles_select_chat_peer
    ON public.profiles FOR SELECT TO authenticated
    USING (
      EXISTS (
        SELECT 1
        FROM public.conversations c
        WHERE (c.user1_id = auth.uid() AND c.user2_id = profiles.id)
           OR (c.user2_id = auth.uid() AND c.user1_id = profiles.id)
      )
    );
END $$;

-- ─── 2) Public catalog view (owner rights; no email / phone / points) ──────
DO $$
DECLARE
  cols text := 'id, nom, role, verifie, note, nombre_avis, ville, langue, created_at';
  filters text := 'true';
BEGIN
  IF to_regclass('public.profiles') IS NULL THEN
    RETURN;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'supplier_channel'
  ) THEN
    cols := cols || ', supplier_channel';
  ELSE
    cols := cols || ', NULL::text AS supplier_channel';
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'referral_code'
  ) THEN
    cols := cols || ', referral_code';
  ELSE
    cols := cols || ', NULL::text AS referral_code';
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'referral_consent_signed_at'
  ) THEN
    cols := cols || ', referral_consent_signed_at';
  ELSE
    cols := cols || ', NULL::timestamptz AS referral_consent_signed_at';
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'actif'
  ) THEN
    filters := filters || ' AND coalesce(actif, true) = true';
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'deleted_at'
  ) THEN
    filters := filters || ' AND deleted_at IS NULL';
  END IF;

  EXECUTE format(
    'CREATE OR REPLACE VIEW public.public_catalog_profiles AS SELECT %s FROM public.profiles WHERE %s',
    cols,
    filters
  );
END $$;

COMMENT ON VIEW public.public_catalog_profiles IS
  'Projection publique des profils (vitrines, stats, parrainage). Jamais email/téléphone/soldes.';

GRANT SELECT ON public.public_catalog_profiles TO anon, authenticated;
REVOKE ALL ON public.public_catalog_profiles FROM PUBLIC;

DO $$
BEGIN
  EXECUTE 'ALTER VIEW public.public_catalog_profiles SET (security_invoker = false)';
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

-- ─── 3) Legacy public.users (confirmed live; emails readable with anon key) ─
DO $$
BEGIN
  IF to_regclass('public.users') IS NULL THEN
    RETURN;
  END IF;

  ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.users FORCE ROW LEVEL SECURITY;
  REVOKE ALL ON TABLE public.users FROM PUBLIC;
  REVOKE ALL ON TABLE public.users FROM anon;

  GRANT SELECT ON TABLE public.users TO authenticated;

  DROP POLICY IF EXISTS users_select_admin_only ON public.users;
  CREATE POLICY users_select_admin_only
    ON public.users FOR SELECT TO authenticated
    USING (public.is_platform_admin_viewer());
END $$;
