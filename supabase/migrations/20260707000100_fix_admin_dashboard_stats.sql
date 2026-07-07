-- Restore admin dashboard read access (orders, finance KPIs, commerce settings, push counts).
-- Idempotent.

-- ─── commerce_settings (missing on some environments) ───────────────────────
CREATE TABLE IF NOT EXISTS public.commerce_settings (
  id smallint PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  free_shipping_threshold_xaf numeric(14, 2) NOT NULL DEFAULT 50000,
  standard_delivery_fee_xaf numeric(14, 2) NOT NULL DEFAULT 1500,
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.commerce_settings (id) VALUES (1)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.commerce_settings
  ADD COLUMN IF NOT EXISTS stock_out_grace_days int NOT NULL DEFAULT 30,
  ADD COLUMN IF NOT EXISTS stock_low_threshold int NOT NULL DEFAULT 5,
  ADD COLUMN IF NOT EXISTS stock_auto_archive boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS stock_hard_delete boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS stock_reminder_days_csv text NOT NULL DEFAULT '1,15,25',
  ADD COLUMN IF NOT EXISTS stock_premium_seller_exempt boolean NOT NULL DEFAULT true;

ALTER TABLE public.commerce_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS commerce_settings_select_all ON public.commerce_settings;
CREATE POLICY commerce_settings_select_all
  ON public.commerce_settings FOR SELECT
  USING (true);

DROP POLICY IF EXISTS commerce_settings_update_admin ON public.commerce_settings;
CREATE POLICY commerce_settings_update_admin
  ON public.commerce_settings FOR UPDATE TO authenticated
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

GRANT SELECT ON public.commerce_settings TO authenticated, anon;
GRANT UPDATE ON public.commerce_settings TO authenticated;

-- ─── orders : lecture admin / partenaire ────────────────────────────────────
DROP POLICY IF EXISTS select_own_orders ON public.orders;
DROP POLICY IF EXISTS orders_select_related_or_admin ON public.orders;

CREATE POLICY orders_select_related_or_admin
  ON public.orders FOR SELECT TO authenticated
  USING (
    client_id = auth.uid()
    OR vendeur_id = auth.uid()
    OR livreur_id = auth.uid()
    OR public.is_platform_admin_viewer()
  );

-- ─── admin_finance_kpis : agrégats complets (owner bypass RLS) ───────────────
CREATE OR REPLACE VIEW public.admin_finance_kpis
WITH (security_invoker = false) AS
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

-- ─── push_subscriptions : comptage admin ────────────────────────────────────
DO $$
BEGIN
  IF to_regclass('public.push_subscriptions') IS NULL THEN
    RETURN;
  END IF;

  DROP POLICY IF EXISTS push_subscriptions_select_admin_viewer ON public.push_subscriptions;
  CREATE POLICY push_subscriptions_select_admin_viewer
    ON public.push_subscriptions FOR SELECT TO authenticated
    USING (user_id = auth.uid() OR public.is_platform_admin_viewer());
END $$;

-- ─── prestataires : inclure admin_partner en lecture ────────────────────────
DO $$
BEGIN
  IF to_regclass('public.prestataires') IS NULL THEN
    RETURN;
  END IF;

  DROP POLICY IF EXISTS prestataires_select_admin_viewer ON public.prestataires;
  CREATE POLICY prestataires_select_admin_viewer
    ON public.prestataires FOR SELECT TO authenticated
    USING (public.is_platform_admin_viewer());
END $$;

-- ─── notifications count admin (remplace is_admin JWT fragile) ─────────────
DO $$
BEGIN
  IF to_regclass('public.notifications') IS NULL THEN
    RETURN;
  END IF;

  DROP POLICY IF EXISTS admins_view_all_notifications ON public.notifications;
  CREATE POLICY admins_view_all_notifications
    ON public.notifications FOR SELECT TO authenticated
    USING (public.is_platform_admin_viewer());
END $$;
