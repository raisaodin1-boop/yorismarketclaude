-- Model B: import / wholesale marketplace (international suppliers, B2B quote workflow).

-- ─── Profiles: canal fournisseur ───────────────────────────────────────────
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS supplier_channel text NOT NULL DEFAULT 'local';

COMMENT ON COLUMN public.profiles.supplier_channel IS 'local | import_cn | import_intl';

-- ─── Products: logistique import + paliers MOQ ─────────────────────────────
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS lead_time_days integer,
  ADD COLUMN IF NOT EXISTS incoterm text,
  ADD COLUMN IF NOT EXISTS wholesale_tiers jsonb;

COMMENT ON COLUMN public.products.wholesale_tiers IS '[{ "min_qty": 10, "unit_price": 18000 }, ...]';
COMMENT ON COLUMN public.products.incoterm IS 'EXW, FOB, CIF, DDP, etc.';

-- ─── B2B requests: workflow devis ───────────────────────────────────────────
ALTER TABLE public.b2b_requests
  ADD COLUMN IF NOT EXISTS quote_notes text,
  ADD COLUMN IF NOT EXISTS quote_currency text DEFAULT 'XAF',
  ADD COLUMN IF NOT EXISTS quoted_at timestamptz,
  ADD COLUMN IF NOT EXISTS accepted_at timestamptz,
  ADD COLUMN IF NOT EXISTS shipping_estimate_days integer,
  ADD COLUMN IF NOT EXISTS deposit_pct numeric(5, 2) DEFAULT 30;

-- ─── Policies: vendeur peut répondre aux demandes B2B ────────────────────────
DO $$
BEGIN
  IF to_regclass('public.b2b_requests') IS NULL THEN
    RETURN;
  END IF;

  DROP POLICY IF EXISTS b2b_seller_update ON public.b2b_requests;
  CREATE POLICY b2b_seller_update ON public.b2b_requests
    FOR UPDATE TO authenticated
    USING (seller_id = auth.uid() OR public.is_platform_admin())
    WITH CHECK (seller_id = auth.uid() OR public.is_platform_admin());

  DROP POLICY IF EXISTS b2b_buyer_update ON public.b2b_requests;
  CREATE POLICY b2b_buyer_update ON public.b2b_requests
    FOR UPDATE TO authenticated
    USING (buyer_id = auth.uid())
    WITH CHECK (buyer_id = auth.uid());
END $$;

-- ─── RPC: réponse devis vendeur ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.fn_respond_b2b_request(
  p_request_id uuid,
  p_quote_amount numeric,
  p_quote_notes text DEFAULT NULL,
  p_shipping_estimate_days integer DEFAULT NULL,
  p_deposit_pct numeric DEFAULT 30
)
RETURNS public.b2b_requests
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_row public.b2b_requests;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'Authentification requise'; END IF;

  SELECT * INTO v_row FROM public.b2b_requests WHERE id = p_request_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Demande introuvable'; END IF;

  IF NOT (v_row.seller_id = v_uid OR public.is_platform_admin()) THEN
    RAISE EXCEPTION 'Non autorisé';
  END IF;

  IF v_row.status NOT IN ('pending', 'quoted') THEN
    RAISE EXCEPTION 'Cette demande ne peut plus recevoir de devis';
  END IF;

  IF p_quote_amount IS NULL OR p_quote_amount <= 0 THEN
    RAISE EXCEPTION 'Montant du devis invalide';
  END IF;

  UPDATE public.b2b_requests
  SET
    quote_amount = p_quote_amount,
    quote_notes = nullif(trim(p_quote_notes), ''),
    quote_currency = 'XAF',
    shipping_estimate_days = p_shipping_estimate_days,
    deposit_pct = coalesce(p_deposit_pct, 30),
    status = 'quoted',
    quoted_at = now(),
    updated_at = now()
  WHERE id = p_request_id
  RETURNING * INTO v_row;

  IF v_row.buyer_id IS NOT NULL THEN
    INSERT INTO public.notifications (user_id, type, title, message, lu, payload)
    VALUES (
      v_row.buyer_id,
      'b2b',
      'Devis B2B reçu',
      format('Le fournisseur a répondu à votre demande : %s FCFA pour %s unités.',
        round(p_quote_amount)::text, coalesce(v_row.quantity::text, '?')),
      false,
      jsonb_build_object('b2b_request_id', v_row.id, 'status', 'quoted')
    );
  END IF;

  RETURN v_row;
END;
$$;

-- ─── RPC: acceptation devis acheteur ────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.fn_accept_b2b_quote(p_request_id uuid)
RETURNS public.b2b_requests
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_row public.b2b_requests;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'Authentification requise'; END IF;

  SELECT * INTO v_row FROM public.b2b_requests WHERE id = p_request_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Demande introuvable'; END IF;

  IF v_row.buyer_id IS DISTINCT FROM v_uid AND NOT public.is_platform_admin() THEN
    RAISE EXCEPTION 'Non autorisé';
  END IF;

  IF v_row.status <> 'quoted' OR v_row.quote_amount IS NULL THEN
    RAISE EXCEPTION 'Aucun devis à accepter';
  END IF;

  UPDATE public.b2b_requests
  SET status = 'accepted', accepted_at = now(), updated_at = now()
  WHERE id = p_request_id
  RETURNING * INTO v_row;

  IF v_row.seller_id IS NOT NULL THEN
    INSERT INTO public.notifications (user_id, type, title, message, lu, payload)
    VALUES (
      v_row.seller_id,
      'b2b',
      'Devis B2B accepté',
      format('L''acheteur a accepté votre devis de %s FCFA.', round(v_row.quote_amount)::text),
      false,
      jsonb_build_object('b2b_request_id', v_row.id, 'status', 'accepted')
    );
  END IF;

  RETURN v_row;
END;
$$;

REVOKE ALL ON FUNCTION public.fn_respond_b2b_request(uuid, numeric, text, integer, numeric) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.fn_accept_b2b_quote(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.fn_respond_b2b_request(uuid, numeric, text, integer, numeric) TO authenticated;
GRANT EXECUTE ON FUNCTION public.fn_accept_b2b_quote(uuid) TO authenticated;
