-- ═══════════════════════════════════════════════════════════════════════════
-- Yorix — Plateforme notifications (push multi-appareils, journal, préférences)
-- Idempotent : safe à rejouer sur branches/staging.
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── 1) Abonnements Web Push (multi-device par utilisateur) ─────────────────
CREATE TABLE IF NOT EXISTS public.push_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  endpoint text NOT NULL,
  p256dh text NOT NULL,
  auth text NOT NULL,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT push_subscriptions_endpoint_key UNIQUE (endpoint)
);

CREATE INDEX IF NOT EXISTS push_subscriptions_user_id_idx
  ON public.push_subscriptions (user_id);

ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS push_subscriptions_select_own ON public.push_subscriptions;
CREATE POLICY push_subscriptions_select_own
  ON public.push_subscriptions FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS push_subscriptions_insert_own ON public.push_subscriptions;
CREATE POLICY push_subscriptions_insert_own
  ON public.push_subscriptions FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS push_subscriptions_update_own ON public.push_subscriptions;
CREATE POLICY push_subscriptions_update_own
  ON public.push_subscriptions FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS push_subscriptions_delete_own ON public.push_subscriptions;
CREATE POLICY push_subscriptions_delete_own
  ON public.push_subscriptions FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- ─── 2) Journal des envois (analytics admin / debug prod) ────────────────────
CREATE TABLE IF NOT EXISTS public.notification_delivery_log (
  id bigserial PRIMARY KEY,
  notification_id bigint REFERENCES public.notifications (id) ON DELETE SET NULL,
  user_id uuid REFERENCES auth.users (id) ON DELETE SET NULL,
  channel text NOT NULL,
  status text NOT NULL,
  detail text,
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS notification_delivery_log_created_idx
  ON public.notification_delivery_log (created_at DESC);

CREATE INDEX IF NOT EXISTS notification_delivery_log_user_idx
  ON public.notification_delivery_log (user_id);

ALTER TABLE public.notification_delivery_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS notification_delivery_log_admin_select ON public.notification_delivery_log;
CREATE POLICY notification_delivery_log_admin_select
  ON public.notification_delivery_log FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role IN ('admin', 'superadmin')
    )
  );

-- ─── 3) Préférences : catégories business & admin ────────────────────────────
ALTER TABLE public.notification_preferences
  ADD COLUMN IF NOT EXISTS category_business boolean NOT NULL DEFAULT true;

ALTER TABLE public.notification_preferences
  ADD COLUMN IF NOT EXISTS category_admin boolean NOT NULL DEFAULT true;

-- ─── 4) Admin : lecture agrégée des notifications (dashboard) ────────────────
DROP POLICY IF EXISTS notifications_select_admin ON public.notifications;
CREATE POLICY notifications_select_admin
  ON public.notifications FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role IN ('admin', 'superadmin')
    )
  );
