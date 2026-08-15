-- Lock wallet self-insert / self-credit.
--
-- Bug: wallets_insert_owner only checks user_id = auth.uid(). Any authenticated
-- user can INSERT a wallet with an arbitrary solde / total_gagne. UPDATE is
-- admin-only, but INSERT is not, so a missing wallet (Google OAuth never
-- creates one; email signup insert is best-effort) is a mint:
--   INSERT INTO wallets (user_id, solde, total_gagne)
--   VALUES (auth.uid(), 99999999, 99999999);
-- then fn_request_wallet_withdrawal() pays it out as a pending withdrawal.
--
-- Trigger scenario (reproduced on PostgreSQL 16 with current policies):
--   SET ROLE authenticated; SET request.jwt.claim.sub = <oauth user>;
--   INSERT INTO wallets (user_id, solde) VALUES (auth.uid(), 500000);
--   SELECT public.fn_request_wallet_withdrawal(5000, 'mtn_momo', '670000000');
-- → row_count=1, solde inflated, pending withdrawal created.
--
-- Trusted writers remain:
--   - platform admins
--   - service_role / SECURITY DEFINER RPCs (fn_request_wallet_withdrawal)
--     via current_user <> 'authenticated'

DO $$
BEGIN
  IF to_regclass('public.wallets') IS NULL THEN
    CREATE TABLE public.wallets (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid NOT NULL,
      solde numeric NOT NULL DEFAULT 0,
      total_gagne numeric NOT NULL DEFAULT 0,
      devise text DEFAULT 'FCFA',
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    );
  END IF;
END $$;

ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets FORCE ROW LEVEL SECURITY;

ALTER TABLE public.wallets ADD COLUMN IF NOT EXISTS solde numeric;
ALTER TABLE public.wallets ADD COLUMN IF NOT EXISTS total_gagne numeric;
ALTER TABLE public.wallets ADD COLUMN IF NOT EXISTS user_id uuid;
ALTER TABLE public.wallets ADD COLUMN IF NOT EXISTS devise text;
ALTER TABLE public.wallets ADD COLUMN IF NOT EXISTS updated_at timestamptz;

-- If a client already inserted a second inflated wallet, keep the lowest
-- balance row (signup writes solde=0 first) so UNIQUE(user_id) can be applied.
DELETE FROM public.wallets w
WHERE w.ctid NOT IN (
  SELECT DISTINCT ON (user_id) ctid
  FROM public.wallets
  WHERE user_id IS NOT NULL
  ORDER BY user_id, coalesce(solde, 0) ASC, ctid ASC
);

CREATE UNIQUE INDEX IF NOT EXISTS wallets_user_id_key
  ON public.wallets (user_id);

DROP POLICY IF EXISTS wallets_insert_owner ON public.wallets;
CREATE POLICY wallets_insert_owner
  ON public.wallets FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND coalesce(solde, 0) = 0
    AND coalesce(total_gagne, 0) = 0
  );

CREATE OR REPLACE FUNCTION public.fn_guard_wallet_balances()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF current_user <> 'authenticated' OR public.is_platform_admin() THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'INSERT' THEN
    IF coalesce(NEW.solde, 0) <> 0 OR coalesce(NEW.total_gagne, 0) <> 0 THEN
      RAISE EXCEPTION 'Wallet balances can only be created at zero'
        USING ERRCODE = '42501';
    END IF;
    NEW.solde := 0;
    NEW.total_gagne := 0;
    RETURN NEW;
  END IF;

  IF NEW.user_id IS DISTINCT FROM OLD.user_id THEN
    RAISE EXCEPTION 'Wallet owner cannot be changed'
      USING ERRCODE = '42501';
  END IF;

  IF NEW.solde IS DISTINCT FROM OLD.solde
     OR NEW.total_gagne IS DISTINCT FROM OLD.total_gagne THEN
    RAISE EXCEPTION 'Wallet balances can only be changed by the platform'
      USING ERRCODE = '42501';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_guard_wallet_balances ON public.wallets;
CREATE TRIGGER trg_guard_wallet_balances
  BEFORE INSERT OR UPDATE ON public.wallets
  FOR EACH ROW
  EXECUTE FUNCTION public.fn_guard_wallet_balances();

COMMENT ON FUNCTION public.fn_guard_wallet_balances() IS
  'Blocks authenticated clients from minting or rewriting wallet balances.';

CREATE OR REPLACE FUNCTION public.fn_ensure_wallet()
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_id uuid;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Authentification requise';
  END IF;

  INSERT INTO public.wallets (user_id, solde, total_gagne, devise)
  VALUES (v_uid, 0, 0, 'FCFA')
  ON CONFLICT (user_id) DO NOTHING;

  SELECT id INTO v_id FROM public.wallets WHERE user_id = v_uid;
  RETURN v_id;
END;
$$;

REVOKE ALL ON FUNCTION public.fn_ensure_wallet() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.fn_ensure_wallet() TO authenticated;

COMMENT ON FUNCTION public.fn_ensure_wallet() IS
  'Creates a zero-balance wallet for the current user if missing. Idempotent.';
