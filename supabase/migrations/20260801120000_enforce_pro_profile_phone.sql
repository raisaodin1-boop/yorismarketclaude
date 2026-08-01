-- Professional profiles (seller / provider / delivery) must carry a usable
-- phone number at INSERT time. This closes the Google OAuth path that used to
-- create empty-telephone pro accounts and bypass the registration hardening.

CREATE OR REPLACE FUNCTION public.enforce_pro_profile_phone()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.role IN ('seller', 'provider', 'delivery') THEN
    IF NEW.telephone IS NULL
       OR length(regexp_replace(COALESCE(NEW.telephone, ''), '\D', '', 'g')) < 9 THEN
      RAISE EXCEPTION
        'Professional profiles require a valid phone number (9+ digits)';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_enforce_pro_profile_phone ON public.profiles;
CREATE TRIGGER trg_enforce_pro_profile_phone
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_pro_profile_phone();
