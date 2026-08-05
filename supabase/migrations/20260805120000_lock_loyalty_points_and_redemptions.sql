-- Lock loyalty balances and reward redemptions.
--
-- Bugs closed:
-- 1) Authenticated clients could UPDATE profiles.points / points_total_gagnes /
--    points_level directly (RLS only preserves role).
-- 2) Authenticated clients could INSERT loyalty_redemptions with status
--    'validated' and arbitrary cout_points without debiting anything.
-- 3) add_loyalty_points remained EXECUTE for authenticated, allowing
--    client-side balance mutation if the SECURITY DEFINER body trusts args.
--
-- Fix: BEFORE UPDATE guard on profile loyalty columns, revoke direct
-- redemption inserts / direct add_loyalty_points, and expose a single
-- redeem_loyalty_reward RPC that validates catalog + balance server-side.

CREATE OR REPLACE FUNCTION public.is_trusted_security_writer()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT coalesce(auth.role(), '') = 'service_role'
    OR public.is_platform_admin();
$$;

REVOKE ALL ON FUNCTION public.is_trusted_security_writer() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_trusted_security_writer() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_trusted_security_writer() TO service_role;

CREATE OR REPLACE FUNCTION public.fn_guard_profile_loyalty_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP <> 'UPDATE' THEN
    RETURN NEW;
  END IF;

  -- Direct browser updates run as role "authenticated".
  -- SECURITY DEFINER loyalty RPCs (owned by postgres / supabase_admin) and
  -- service_role / platform admins remain allowed to mutate balances.
  IF public.is_trusted_security_writer()
     OR current_user IN ('postgres', 'supabase_admin')
  THEN
    RETURN NEW;
  END IF;

  IF NEW.points IS DISTINCT FROM OLD.points
    OR NEW.points_total_gagnes IS DISTINCT FROM OLD.points_total_gagnes
    OR NEW.points_level IS DISTINCT FROM OLD.points_level
  THEN
    RAISE EXCEPTION 'profile loyalty fields are restricted to trusted writers';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_guard_profile_loyalty_fields ON public.profiles;
CREATE TRIGGER trg_guard_profile_loyalty_fields
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.fn_guard_profile_loyalty_fields();

-- Catalog rewards: public read, admin write (mirror loyalty_packs).
DO $$
BEGIN
  IF to_regclass('public.loyalty_rewards') IS NULL THEN
    RETURN;
  END IF;

  ALTER TABLE public.loyalty_rewards ENABLE ROW LEVEL SECURITY;

  DROP POLICY IF EXISTS loyalty_rewards_select_public ON public.loyalty_rewards;
  DROP POLICY IF EXISTS loyalty_rewards_admin_all ON public.loyalty_rewards;

  CREATE POLICY loyalty_rewards_select_public
    ON public.loyalty_rewards FOR SELECT
    USING (true);

  CREATE POLICY loyalty_rewards_admin_all
    ON public.loyalty_rewards FOR ALL TO authenticated
    USING (public.is_platform_admin())
    WITH CHECK (public.is_platform_admin());

  GRANT SELECT ON public.loyalty_rewards TO anon, authenticated;
  GRANT INSERT, UPDATE, DELETE ON public.loyalty_rewards TO authenticated;
END $$;

-- Redemptions: no direct client INSERT. Use redeem_loyalty_reward().
DO $$
BEGIN
  IF to_regclass('public.loyalty_redemptions') IS NULL THEN
    RETURN;
  END IF;

  ALTER TABLE public.loyalty_redemptions ENABLE ROW LEVEL SECURITY;
  -- Keep FORCE off so the SECURITY DEFINER redeem RPC (table/owner context)
  -- can insert the validated row after balance debit. Authenticated clients
  -- still cannot insert: insert policies require platform admin.
  ALTER TABLE public.loyalty_redemptions NO FORCE ROW LEVEL SECURITY;

  DROP POLICY IF EXISTS loyalty_redemptions_insert_own ON public.loyalty_redemptions;
  DROP POLICY IF EXISTS loyalty_redemptions_insert_admin ON public.loyalty_redemptions;

  CREATE POLICY loyalty_redemptions_insert_admin
    ON public.loyalty_redemptions FOR INSERT TO authenticated
    WITH CHECK (public.is_platform_admin());

  GRANT SELECT, INSERT ON public.loyalty_redemptions TO authenticated;
END $$;

-- Atomic redeem: catalog price + balance check + debit + validated code.
CREATE OR REPLACE FUNCTION public.redeem_loyalty_reward(p_reward_id uuid)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_reward public.loyalty_rewards%ROWTYPE;
  v_points integer;
  v_cost integer;
  v_code text;
  v_redemption_id uuid;
BEGIN
  IF v_uid IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Non authentifié');
  END IF;

  IF p_reward_id IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Récompense invalide');
  END IF;

  SELECT * INTO v_reward
  FROM public.loyalty_rewards
  WHERE id = p_reward_id
    AND coalesce(actif, false) IS TRUE;

  IF v_reward.id IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Récompense introuvable');
  END IF;

  v_cost := greatest(0, coalesce(v_reward.cout_points, 0)::integer);
  IF v_cost <= 0 THEN
    RETURN json_build_object('success', false, 'error', 'Récompense non échangeable');
  END IF;

  SELECT coalesce(points, 0)::integer
  INTO v_points
  FROM public.profiles
  WHERE id = v_uid
  FOR UPDATE;

  IF v_points IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Profil introuvable');
  END IF;

  IF v_points < v_cost THEN
    RETURN json_build_object('success', false, 'error', 'Solde insuffisant');
  END IF;

  v_code := 'YX-'
    || upper(substr(to_hex(extract(epoch from clock_timestamp())::bigint), 1, 8))
    || '-'
    || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 4));

  PERFORM public.add_loyalty_points(
    v_uid,
    -v_cost,
    'echange',
    'Échange : ' || coalesce(v_reward.nom, 'Récompense'),
    NULL::numeric,
    NULL::uuid,
    'reward'
  );

  INSERT INTO public.loyalty_redemptions (
    user_id,
    reward_id,
    reward_nom,
    cout_points,
    code,
    status,
    expire_at
  ) VALUES (
    v_uid,
    v_reward.id,
    coalesce(v_reward.nom, 'Récompense'),
    v_cost,
    v_code,
    'validated',
    now() + interval '90 days'
  )
  RETURNING id INTO v_redemption_id;

  RETURN json_build_object(
    'success', true,
    'id', v_redemption_id,
    'code', v_code,
    'points_spent', v_cost,
    'reward_nom', coalesce(v_reward.nom, 'Récompense')
  );
EXCEPTION
  WHEN undefined_function THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Fonction de débit fidélité indisponible'
    );
  WHEN OTHERS THEN
    RETURN json_build_object(
      'success', false,
      'error', coalesce(SQLERRM, 'Échange impossible')
    );
END;
$$;

REVOKE ALL ON FUNCTION public.redeem_loyalty_reward(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.redeem_loyalty_reward(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.redeem_loyalty_reward(uuid) TO service_role;

-- Clients must not call add_loyalty_points directly anymore.
DO $$
DECLARE
  fn regprocedure;
BEGIN
  FOR fn IN
    SELECT p.oid::regprocedure
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public'
      AND p.proname = 'add_loyalty_points'
  LOOP
    EXECUTE format('REVOKE ALL ON FUNCTION %s FROM PUBLIC, anon, authenticated', fn);
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO service_role', fn);
  END LOOP;
END $$;
