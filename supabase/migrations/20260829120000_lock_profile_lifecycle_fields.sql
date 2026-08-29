-- Lock profile lifecycle / moderation fields against self-service writes.
--
-- Bug: profiles_update_self_or_admin (20260526000100) only pins `role`.
-- Authenticated users can PATCH their own actif / deactivated_at / deleted_at /
-- ban_reason / email_original. Admin soft-ban and hard-delete are therefore
-- reversible by the banned user:
--   PATCH /rest/v1/profiles?id=eq.<self>
--   { "actif": true, "deactivated_at": null, "deleted_at": null, "ban_reason": null }
--
-- The app then treats the account as live again (useYorixAuth.enforceProfileAccess
-- / isProfileAccessible). Reactivation is supposed to go through
-- fn_admin_reactivate_user only.
--
-- Trigger scenario (reproduced on PostgreSQL 16 with current policies):
--   SET ROLE authenticated; SET request.jwt.claim.sub = <banned seller>;
--   UPDATE profiles SET actif = true, deactivated_at = NULL WHERE id = auth.uid();
-- → row_count=1, account is active again.
--
-- Trusted writers remain:
--   - platform admins (is_platform_admin())
--   - service_role / SECURITY DEFINER RPCs (fn_admin_soft_ban_user,
--     fn_admin_reactivate_user, fn_admin_hard_delete_user)
--     via current_user <> 'authenticated'

DO $$
BEGIN
  IF to_regclass('public.profiles') IS NULL THEN
    RETURN;
  END IF;

  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS actif boolean;
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS deactivated_at timestamptz;
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS deleted_at timestamptz;
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS ban_reason text;
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email_original text;
END $$;

CREATE OR REPLACE FUNCTION public.fn_guard_profile_lifecycle_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF current_user <> 'authenticated' OR public.is_platform_admin() THEN
    RETURN NEW;
  END IF;

  IF NEW.actif IS DISTINCT FROM OLD.actif
     OR NEW.deactivated_at IS DISTINCT FROM OLD.deactivated_at
     OR NEW.deleted_at IS DISTINCT FROM OLD.deleted_at
     OR NEW.ban_reason IS DISTINCT FROM OLD.ban_reason
     OR NEW.email_original IS DISTINCT FROM OLD.email_original THEN
    RAISE EXCEPTION 'Profile lifecycle fields can only be changed by the platform'
      USING ERRCODE = '42501';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_guard_profile_lifecycle_update ON public.profiles;
CREATE TRIGGER trg_guard_profile_lifecycle_update
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.fn_guard_profile_lifecycle_update();

COMMENT ON FUNCTION public.fn_guard_profile_lifecycle_update() IS
  'Blocks authenticated clients from self-unbanning, self-undeleting, or rewriting admin moderation fields.';
