-- Lock leftover anonymous REST access on commerce tables.
-- Confirmed live 2026-09-10 with the publishable anon key:
--   deliveries          GET 206  /19  (names, phones, addresses)
--   checkout_intents    GET 206  /22  (payload.customer email/phone) + PATCH of total
--   order_items         GET 206  /10  + PATCH of quantity
--   business_requests   GET 200  /1   (email, telephone)
-- In-repo policies are TO authenticated, but production still grants anon.
-- Public tracking keeps working via fn_public_track_delivery(code).

DO $$
DECLARE
  t text;
  p record;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'deliveries',
    'checkout_intents',
    'order_items',
    'business_requests'
  ]
  LOOP
    IF to_regclass(format('public.%I', t)) IS NULL THEN
      CONTINUE;
    END IF;

    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('ALTER TABLE public.%I FORCE ROW LEVEL SECURITY', t);
    EXECUTE format('REVOKE ALL ON TABLE public.%I FROM anon', t);
    EXECUTE format('REVOKE ALL ON TABLE public.%I FROM public', t);

    FOR p IN
      SELECT policyname
      FROM pg_policies
      WHERE schemaname = 'public' AND tablename = t
    LOOP
      EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', p.policyname, t);
    END LOOP;
  END LOOP;
END $$;

-- ── deliveries: participants + admin only; public tracking is the RPC ────────
DO $$
BEGIN
  IF to_regclass('public.deliveries') IS NULL THEN
    RETURN;
  END IF;

  GRANT SELECT, INSERT, UPDATE ON public.deliveries TO authenticated;

  CREATE POLICY deliveries_select_related_or_admin
    ON public.deliveries FOR SELECT TO authenticated
    USING (
      client_id = auth.uid()
      OR livreur_id = auth.uid()
      OR public.is_platform_admin()
      OR EXISTS (
        SELECT 1
        FROM public.orders o
        WHERE o.id::text = deliveries.order_id::text
          AND (o.client_id = auth.uid() OR o.vendeur_id = auth.uid())
      )
    );

  CREATE POLICY deliveries_insert_authenticated_owner_or_admin
    ON public.deliveries FOR INSERT TO authenticated
    WITH CHECK (
      public.is_platform_admin()
      OR client_id = auth.uid()
    );

  CREATE POLICY deliveries_update_related_or_admin
    ON public.deliveries FOR UPDATE TO authenticated
    USING (
      public.is_platform_admin()
      OR client_id = auth.uid()
      OR livreur_id = auth.uid()
    )
    WITH CHECK (
      public.is_platform_admin()
      OR client_id = auth.uid()
      OR livreur_id = auth.uid()
    );
END $$;

-- ── checkout_intents: owner read; no client writes (Edge uses service_role) ──
DO $$
BEGIN
  IF to_regclass('public.checkout_intents') IS NULL THEN
    RETURN;
  END IF;

  GRANT SELECT ON public.checkout_intents TO authenticated;
  GRANT UPDATE ON public.checkout_intents TO authenticated;

  CREATE POLICY checkout_intents_select_owner_or_admin
    ON public.checkout_intents FOR SELECT TO authenticated
    USING (customer_id = auth.uid() OR public.is_platform_admin());

  CREATE POLICY checkout_intents_update_admin_only
    ON public.checkout_intents FOR UPDATE TO authenticated
    USING (public.is_platform_admin())
    WITH CHECK (public.is_platform_admin());
END $$;

-- ── order_items: related read; admin/service writes ─────────────────────────
DO $$
BEGIN
  IF to_regclass('public.order_items') IS NULL THEN
    RETURN;
  END IF;

  GRANT SELECT ON public.order_items TO authenticated;
  GRANT INSERT, UPDATE ON public.order_items TO authenticated;

  CREATE POLICY order_items_select_related_or_admin
    ON public.order_items FOR SELECT TO authenticated
    USING (
      EXISTS (
        SELECT 1
        FROM public.orders o
        WHERE o.id = order_items.order_id
          AND (
            o.client_id = auth.uid()
            OR o.vendeur_id = auth.uid()
            OR o.livreur_id = auth.uid()
            OR public.is_platform_admin()
          )
      )
    );

  CREATE POLICY order_items_insert_admin_only
    ON public.order_items FOR INSERT TO authenticated
    WITH CHECK (public.is_platform_admin());

  CREATE POLICY order_items_update_admin_only
    ON public.order_items FOR UPDATE TO authenticated
    USING (public.is_platform_admin())
    WITH CHECK (public.is_platform_admin());
END $$;

-- ── business_requests: public INSERT (lead form), no anon SELECT ────────────
DO $$
DECLARE
  seq text;
BEGIN
  IF to_regclass('public.business_requests') IS NULL THEN
    RETURN;
  END IF;

  GRANT INSERT ON public.business_requests TO anon, authenticated;
  GRANT SELECT ON public.business_requests TO authenticated;

  SELECT pg_get_serial_sequence('public.business_requests', 'id') INTO seq;
  IF seq IS NOT NULL THEN
    EXECUTE format('GRANT USAGE, SELECT ON SEQUENCE %s TO anon, authenticated', seq);
  END IF;

  CREATE POLICY business_requests_insert_anyone
    ON public.business_requests FOR INSERT TO anon, authenticated
    WITH CHECK (true);

  CREATE POLICY business_requests_select_admin
    ON public.business_requests FOR SELECT TO authenticated
    USING (public.is_platform_admin());
END $$;

-- ── Public tracking by exact code (no table LIST for anon) ───────────────────
CREATE OR REPLACE FUNCTION public.fn_public_track_delivery(p_code text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_code text := upper(trim(coalesce(p_code, '')));
  v_row jsonb;
BEGIN
  IF v_code = '' OR length(v_code) < 4 OR length(v_code) > 32 THEN
    RETURN NULL;
  END IF;

  SELECT jsonb_build_object(
    'id', d.id,
    'code_suivi', d.code_suivi,
    'statut', d.statut,
    'adresse_collecte', d.adresse_collecte,
    'adresse_livraison', d.adresse_livraison,
    'livreur_nom', d.livreur_nom,
    'livreur_tel', d.livreur_tel,
    'livreur_vehicule', d.livreur_vehicule,
    'livreur_note', d.livreur_note,
    'distance_km', d.distance_km,
    'temps_estime_min', d.temps_estime_min,
    'commande_at', d.commande_at,
    'assigne_at', d.assigne_at,
    'accepte_at', d.accepte_at,
    'preparation_at', d.preparation_at,
    'collecte_at', d.collecte_at,
    'en_route_at', d.en_route_at,
    'livre_at', d.livre_at
  )
  INTO v_row
  FROM public.deliveries d
  WHERE d.code_suivi = v_code
  LIMIT 1;

  RETURN v_row;
END;
$$;

REVOKE ALL ON FUNCTION public.fn_public_track_delivery(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.fn_public_track_delivery(text) TO anon, authenticated;
