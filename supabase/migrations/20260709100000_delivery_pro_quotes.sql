-- Demandes de devis livraison pro (vendeurs / boutiques B2B logistique)

CREATE TABLE IF NOT EXISTS public.delivery_pro_quotes (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  shop_name       text NOT NULL,
  owner_name      text NOT NULL,
  phone           text NOT NULL,
  email           text NOT NULL,
  city            text NOT NULL,
  address         text NOT NULL,
  monthly_volume  text NOT NULL,
  driver_mode     text NOT NULL CHECK (driver_mode IN ('assigned', 'pool')),
  notes           text,
  status          text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'contacted', 'quoted', 'closed')),
  admin_notes     text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS delivery_pro_quotes_status_idx ON public.delivery_pro_quotes(status);
CREATE INDEX IF NOT EXISTS delivery_pro_quotes_created_idx ON public.delivery_pro_quotes(created_at DESC);

ALTER TABLE public.delivery_pro_quotes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS delivery_pro_quotes_insert ON public.delivery_pro_quotes;
CREATE POLICY delivery_pro_quotes_insert ON public.delivery_pro_quotes
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(trim(shop_name)) > 0
    AND length(trim(owner_name)) > 0
    AND length(trim(phone)) > 0
    AND length(trim(email)) > 0
    AND length(trim(city)) > 0
    AND length(trim(address)) > 0
    AND length(trim(monthly_volume)) > 0
    AND driver_mode IN ('assigned', 'pool')
  );

DROP POLICY IF EXISTS delivery_pro_quotes_admin ON public.delivery_pro_quotes;
CREATE POLICY delivery_pro_quotes_admin ON public.delivery_pro_quotes
  FOR ALL TO authenticated
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

DROP POLICY IF EXISTS delivery_pro_quotes_owner_read ON public.delivery_pro_quotes;
CREATE POLICY delivery_pro_quotes_owner_read ON public.delivery_pro_quotes
  FOR SELECT TO authenticated
  USING (user_id IS NOT NULL AND user_id = auth.uid());

COMMENT ON TABLE public.delivery_pro_quotes IS
  'Demandes de devis livraison professionnelle (vendeurs). Traitées hors plateforme par l''équipe admin.';
