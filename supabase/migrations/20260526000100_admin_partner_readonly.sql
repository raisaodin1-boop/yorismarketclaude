-- Admin partenaire (admin_partner) : lecture agrégée, aucune écriture admin.
-- Idempotent.

CREATE OR REPLACE FUNCTION public.is_platform_admin_viewer()
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
      AND p.role IN ('admin', 'superadmin', 'admin_partner')
  );
$$;

GRANT EXECUTE ON FUNCTION public.is_platform_admin_viewer() TO authenticated;

-- ─── profiles : lecture élargie, écriture rôle réservée aux admins complets ───
DO $$
BEGIN
  IF to_regclass('public.profiles') IS NULL THEN
    RETURN;
  END IF;

  DROP POLICY IF EXISTS profiles_select_self_or_admin ON public.profiles;
  CREATE POLICY profiles_select_self_or_admin
    ON public.profiles FOR SELECT TO authenticated
    USING (id = auth.uid() OR public.is_platform_admin_viewer());

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
END $$;

-- ─── SELECT policies : is_platform_admin → is_platform_admin_viewer ───────────
DO $$
DECLARE
  pol record;
BEGIN
  FOR pol IN
    SELECT schemaname, tablename, policyname, cmd, qual
    FROM pg_policies
    WHERE schemaname = 'public'
      AND cmd = 'SELECT'
      AND qual IS NOT NULL
      AND qual LIKE '%is_platform_admin()%'
      AND qual NOT LIKE '%is_platform_admin_viewer()%'
  LOOP
    EXECUTE format(
      'DROP POLICY IF EXISTS %I ON %I.%I',
      pol.policyname, pol.schemaname, pol.tablename
    );
    EXECUTE format(
      'CREATE POLICY %I ON %I.%I FOR SELECT TO authenticated USING (%s)',
      pol.policyname,
      pol.schemaname,
      pol.tablename,
      replace(pol.qual, 'is_platform_admin()', 'is_platform_admin_viewer()')
    );
  END LOOP;
END $$;

-- commerce_settings : lecture déjà publique ; update admin complet inchangé
DO $$
BEGIN
  IF to_regclass('public.commerce_settings') IS NULL THEN
    RETURN;
  END IF;
  DROP POLICY IF EXISTS commerce_settings_update_admin ON public.commerce_settings;
  CREATE POLICY commerce_settings_update_admin
    ON public.commerce_settings FOR UPDATE TO authenticated
    USING (public.is_platform_admin())
    WITH CHECK (public.is_platform_admin());
END $$;

-- notification_delivery_log (policy nom explicite)
DO $$
BEGIN
  IF to_regclass('public.notification_delivery_log') IS NULL THEN
    RETURN;
  END IF;
  DROP POLICY IF EXISTS notification_delivery_log_select_admin_only ON public.notification_delivery_log;
  CREATE POLICY notification_delivery_log_select_admin_only
    ON public.notification_delivery_log FOR SELECT TO authenticated
    USING (public.is_platform_admin_viewer());
END $$;

-- fraud_logs lecture partenaire
DO $$
BEGIN
  IF to_regclass('public.fraud_logs') IS NULL THEN
    RETURN;
  END IF;
  DROP POLICY IF EXISTS fraud_logs_select_admin_only ON public.fraud_logs;
  CREATE POLICY fraud_logs_select_admin_only
    ON public.fraud_logs FOR SELECT TO authenticated
    USING (public.is_platform_admin_viewer());
END $$;

-- notifications_select_admin (migration plateforme)
DO $$
BEGIN
  IF to_regclass('public.notifications') IS NULL THEN
    RETURN;
  END IF;
  DROP POLICY IF EXISTS notifications_select_admin ON public.notifications;
  CREATE POLICY notifications_select_admin
    ON public.notifications FOR SELECT TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.id = auth.uid()
          AND p.role IN ('admin', 'superadmin', 'admin_partner')
      )
    );
END $$;

COMMENT ON FUNCTION public.is_platform_admin_viewer() IS
  'Vrai pour admin, superadmin et admin_partner (lecture panneau admin).';
