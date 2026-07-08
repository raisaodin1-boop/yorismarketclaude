-- Hardening: notifications RLS, wallet withdrawals, B2B seller notify, b2b admin policy.
-- Idempotent — safe to re-run.

-- ─── Notifications : retirer les policies permissives héritées ───────────────
DO $$
BEGIN
  IF to_regclass('public.notifications') IS NULL THEN
    RETURN;
  END IF;

  DROP POLICY IF EXISTS notifications_insert_anyone ON public.notifications;
  DROP POLICY IF EXISTS notifications_insert ON public.notifications;
  DROP POLICY IF EXISTS phase1_allow_all_insert ON public.notifications;
  DROP POLICY IF EXISTS phase1_allow_all_select ON public.notifications;
  DROP POLICY IF EXISTS phase1_allow_all_update ON public.notifications;
  DROP POLICY IF EXISTS phase1_allow_all_delete ON public.notifications;
  DROP POLICY IF EXISTS "Authenticated users can insert notifications" ON public.notifications;

  DROP POLICY IF EXISTS notifications_insert_owner_or_admin ON public.notifications;
  CREATE POLICY notifications_insert_owner_or_admin
    ON public.notifications FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid() OR public.is_platform_admin());
END $$;

-- ─── RPC notification cross-utilisateur (livraison, parrainage, admin) ───────
CREATE OR REPLACE FUNCTION public.fn_publish_notification(
  p_user_id uuid,
  p_type text DEFAULT 'system',
  p_title text DEFAULT 'Yorix',
  p_message text DEFAULT '',
  p_link text DEFAULT NULL,
  p_priority text DEFAULT 'normal',
  p_category text DEFAULT NULL,
  p_payload jsonb DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_id uuid;
  v_allowed boolean := false;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Authentification requise';
  END IF;
  IF p_user_id IS NULL THEN
    RAISE EXCEPTION 'Destinataire requis';
  END IF;

  IF p_user_id = v_uid OR public.is_platform_admin() THEN
    v_allowed := true;
  ELSIF p_type LIKE 'delivery%' AND EXISTS (
    SELECT 1 FROM public.deliveries d
    WHERE (
      (d.client_id = p_user_id AND d.livreur_id = v_uid)
      OR (d.livreur_id = p_user_id AND public.is_platform_admin())
      OR (d.client_id = p_user_id AND public.is_platform_admin())
    )
  ) THEN
    v_allowed := true;
  ELSIF p_type = 'delivery_request'
    AND p_payload ? 'delivery_id'
    AND EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = p_user_id AND p.role IN ('admin', 'superadmin', 'admin_partner')
    )
    AND EXISTS (
      SELECT 1 FROM public.deliveries d
      WHERE d.id = (p_payload->>'delivery_id')::uuid
        AND (d.client_id = v_uid OR d.client_id IS NULL)
    )
  THEN
    v_allowed := true;
  ELSIF p_type = 'delivery_refused'
    AND EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = p_user_id AND p.role IN ('admin', 'superadmin', 'admin_partner')
    )
    AND EXISTS (
      SELECT 1 FROM public.deliveries d WHERE d.livreur_id = v_uid
    )
  THEN
    v_allowed := true;
  ELSIF p_type = 'referral_bonus'
    AND EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = v_uid AND p.referrer_id = p_user_id
    )
    AND EXISTS (
      SELECT 1 FROM public.referral_bonuses rb
      WHERE rb.referred_id = v_uid
        AND rb.referrer_id = p_user_id
        AND rb.status = 'credited'
    )
  THEN
    v_allowed := true;
  END IF;

  IF NOT v_allowed THEN
    RAISE EXCEPTION 'Non autorisé à notifier cet utilisateur';
  END IF;

  INSERT INTO public.notifications (
    user_id, type, title, message, link, lu, priority, category, payload
  ) VALUES (
    p_user_id,
    COALESCE(p_type, 'system'),
    COALESCE(NULLIF(trim(p_title), ''), 'Yorix'),
    COALESCE(p_message, ''),
    p_link,
    false,
    COALESCE(p_priority, 'normal'),
    p_category,
    p_payload
  )
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;

REVOKE ALL ON FUNCTION public.fn_publish_notification(uuid, text, text, text, text, text, text, jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.fn_publish_notification(uuid, text, text, text, text, text, text, jsonb) TO authenticated;

-- ─── Wallet transactions : lecture propriétaire + admin ────────────────────
DO $$
BEGIN
  IF to_regclass('public.wallet_transactions') IS NULL THEN
    RETURN;
  END IF;

  GRANT SELECT ON public.wallet_transactions TO authenticated;

  DROP POLICY IF EXISTS wallet_transactions_select_owner_or_admin ON public.wallet_transactions;
  CREATE POLICY wallet_transactions_select_owner_or_admin
    ON public.wallet_transactions FOR SELECT TO authenticated
    USING (user_id = auth.uid() OR public.is_platform_admin_viewer());
END $$;

-- ─── RPC retrait portefeuille (atomique) ───────────────────────────────────
CREATE OR REPLACE FUNCTION public.fn_request_wallet_withdrawal(
  p_amount numeric,
  p_provider text,
  p_phone text,
  p_notes text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_wallet public.wallets%ROWTYPE;
  v_tx_id uuid;
  v_min numeric := 5000;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Authentification requise';
  END IF;
  IF p_amount IS NULL OR p_amount < v_min THEN
    RAISE EXCEPTION 'Montant minimum : % FCFA', v_min;
  END IF;
  IF p_provider IS NULL OR p_provider NOT IN ('mtn_momo', 'orange_money') THEN
    RAISE EXCEPTION 'Méthode de retrait invalide';
  END IF;
  IF p_phone IS NULL OR length(regexp_replace(p_phone, '\s', '', 'g')) < 9 THEN
    RAISE EXCEPTION 'Numéro de téléphone invalide';
  END IF;

  SELECT * INTO v_wallet FROM public.wallets WHERE user_id = v_uid FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Portefeuille introuvable';
  END IF;
  IF COALESCE(v_wallet.solde, 0) < p_amount THEN
    RAISE EXCEPTION 'Solde insuffisant';
  END IF;

  INSERT INTO public.wallet_transactions (
    user_id, transaction_type, amount, currency, status, provider, notes, meta
  ) VALUES (
    v_uid,
    'withdrawal',
    p_amount,
    'XAF',
    'pending',
    p_provider,
    COALESCE(p_notes, ''),
    jsonb_build_object(
      'phone', regexp_replace(p_phone, '\s', '', 'g'),
      'fee_pct', 3,
      'net_amount', round(p_amount * 0.97)
    )
  )
  RETURNING id INTO v_tx_id;

  UPDATE public.wallets
  SET solde = solde - p_amount, updated_at = now()
  WHERE user_id = v_uid;

  INSERT INTO public.notifications (user_id, type, title, message, lu)
  VALUES (
    v_uid,
    'wallet',
    'Demande de retrait reçue',
    format('Votre retrait de %s FCFA est en traitement (sous 24h).', round(p_amount)::text),
    false
  );

  RETURN v_tx_id;
END;
$$;

REVOKE ALL ON FUNCTION public.fn_request_wallet_withdrawal(numeric, text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.fn_request_wallet_withdrawal(numeric, text, text, text) TO authenticated;

-- ─── B2B : admin policy via profiles + notif vendeur au insert ───────────────
DO $$
BEGIN
  IF to_regclass('public.b2b_requests') IS NULL THEN
    RETURN;
  END IF;

  DROP POLICY IF EXISTS b2b_admin ON public.b2b_requests;
  CREATE POLICY b2b_admin ON public.b2b_requests
    FOR ALL TO authenticated
    USING (public.is_platform_admin())
    WITH CHECK (public.is_platform_admin());

  DROP POLICY IF EXISTS b2b_buyer_insert ON public.b2b_requests;
  CREATE POLICY b2b_buyer_insert ON public.b2b_requests
    FOR INSERT TO authenticated
    WITH CHECK (buyer_id = auth.uid());

  DROP POLICY IF EXISTS b2b_buyer ON public.b2b_requests;
  CREATE POLICY b2b_buyer ON public.b2b_requests
    FOR SELECT TO authenticated
    USING (buyer_id = auth.uid());

  DROP POLICY IF EXISTS b2b_seller ON public.b2b_requests;
  CREATE POLICY b2b_seller ON public.b2b_requests
    FOR SELECT TO authenticated
    USING (seller_id = auth.uid());
END $$;

CREATE OR REPLACE FUNCTION public.trg_notify_seller_on_b2b_request()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.seller_id IS NOT NULL THEN
    INSERT INTO public.notifications (user_id, type, title, message, lu, payload)
    VALUES (
      NEW.seller_id,
      'b2b',
      'Nouvelle demande B2B',
      format(
        '%s souhaite commander %s unités. Tél : %s',
        COALESCE(NEW.contact_name, 'Un acheteur'),
        COALESCE(NEW.quantity::text, '?'),
        COALESCE(NEW.phone, '—')
      ),
      false,
      jsonb_build_object('b2b_request_id', NEW.id, 'product_id', NEW.product_id)
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS b2b_request_notify_seller ON public.b2b_requests;
CREATE TRIGGER b2b_request_notify_seller
  AFTER INSERT ON public.b2b_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.trg_notify_seller_on_b2b_request();
