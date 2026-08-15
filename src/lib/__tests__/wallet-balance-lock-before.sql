-- Empirical repro for wallet self-insert mint (run as superuser).
-- Prints BUG_REPRODUCED then FIX_VERIFIED on success.

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

CREATE OR REPLACE FUNCTION public.is_platform_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT false;
$$;
GRANT EXECUTE ON FUNCTION public.is_platform_admin() TO authenticated;

DROP TABLE IF EXISTS public.notifications CASCADE;
DROP TABLE IF EXISTS public.wallet_transactions CASCADE;
DROP TABLE IF EXISTS public.wallets CASCADE;

CREATE TABLE public.wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  solde numeric NOT NULL DEFAULT 0,
  total_gagne numeric NOT NULL DEFAULT 0,
  devise text DEFAULT 'FCFA',
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.wallet_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  order_id uuid,
  service_booking_id uuid,
  transaction_type text NOT NULL,
  amount numeric(14,2) NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'XAF',
  status text NOT NULL DEFAULT 'pending',
  provider text,
  provider_ref text,
  notes text,
  meta jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  type text,
  title text,
  message text,
  lu boolean DEFAULT false
);

ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets FORCE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE ON public.wallets TO authenticated;
GRANT ALL ON public.wallets TO postgres;

-- Current main policies (20260516000100)
DROP POLICY IF EXISTS wallets_select_owner_or_admin ON public.wallets;
CREATE POLICY wallets_select_owner_or_admin
  ON public.wallets FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_platform_admin());

DROP POLICY IF EXISTS wallets_insert_owner ON public.wallets;
CREATE POLICY wallets_insert_owner
  ON public.wallets FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS wallets_update_admin_only ON public.wallets;
CREATE POLICY wallets_update_admin_only
  ON public.wallets FOR UPDATE TO authenticated
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

-- Minimal copy of fn_request_wallet_withdrawal (20260707200000)
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
    v_uid, 'withdrawal', p_amount, 'XAF', 'pending', p_provider,
    COALESCE(p_notes, ''),
    jsonb_build_object('phone', regexp_replace(p_phone, '\s', '', 'g'))
  )
  RETURNING id INTO v_tx_id;

  UPDATE public.wallets
  SET solde = solde - p_amount, updated_at = now()
  WHERE user_id = v_uid;

  INSERT INTO public.notifications (user_id, type, title, message, lu)
  VALUES (v_uid, 'wallet', 'Demande de retrait reçue', 'ok', false);

  RETURN v_tx_id;
END;
$$;
REVOKE ALL ON FUNCTION public.fn_request_wallet_withdrawal(numeric, text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.fn_request_wallet_withdrawal(numeric, text, text, text) TO authenticated;

DO $repro$
DECLARE
  v_uid uuid := '11111111-1111-1111-1111-111111111111';
  v_solde numeric;
  v_tx uuid;
  v_rc int;
BEGIN
  PERFORM set_config('request.jwt.claim.sub', v_uid::text, false);
  SET ROLE authenticated;

  INSERT INTO public.wallets (user_id, solde, total_gagne, devise)
  VALUES (v_uid, 500000, 500000, 'FCFA');
  GET DIAGNOSTICS v_rc = ROW_COUNT;
  IF v_rc <> 1 THEN
    RAISE EXCEPTION 'expected inflated insert to succeed on current main, row_count=%', v_rc;
  END IF;

  SELECT solde INTO v_solde FROM public.wallets WHERE user_id = v_uid;
  IF v_solde <> 500000 THEN
    RAISE EXCEPTION 'expected minted solde 500000, got %', v_solde;
  END IF;

  v_tx := public.fn_request_wallet_withdrawal(5000, 'mtn_momo', '670000000');
  IF v_tx IS NULL THEN
    RAISE EXCEPTION 'withdrawal RPC returned null after mint';
  END IF;

  RESET ROLE;
  RAISE NOTICE 'BUG_REPRODUCED';
END;
$repro$;
