-- payment_transactions avait des policies "phase1_allow_all_*" laissées d'une
-- phase de prototypage : SELECT/INSERT/UPDATE/DELETE ouverts à `public`, donc
-- accessibles sans authentification via la clé anon. Cette table contient les
-- montants collectés, numéros de téléphone, références de transaction —
-- données financières sensibles de toute la plateforme.
--
-- Toutes les écritures constatées dans le code passent par service_role
-- (webhook_cinetpay, api/momo.js, api/momo-status.js) qui contourne RLS —
-- aucun accès client direct en écriture n'est nécessaire.
-- La lecture, elle, est déjà utilisée par AdminDashboard.jsx (flux d'alertes
-- paiements échoués) pour tous les rôles admin — on préserve ce comportement.

DROP POLICY IF EXISTS phase1_allow_all_select ON public.payment_transactions;
DROP POLICY IF EXISTS phase1_allow_all_insert ON public.payment_transactions;
DROP POLICY IF EXISTS phase1_allow_all_update ON public.payment_transactions;
DROP POLICY IF EXISTS phase1_allow_all_delete ON public.payment_transactions;

CREATE POLICY payment_transactions_select_admin_viewer
  ON public.payment_transactions FOR SELECT TO authenticated
  USING (public.is_platform_admin_viewer());

-- Nouvelle fonction : superadmin strict (ni admin, ni admin_partner) pour les
-- données financières les plus sensibles (panneau trésorerie).
CREATE OR REPLACE FUNCTION public.is_platform_superadmin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.role = 'superadmin'
  );
$$;

REVOKE ALL ON FUNCTION public.is_platform_superadmin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_platform_superadmin() TO authenticated;
