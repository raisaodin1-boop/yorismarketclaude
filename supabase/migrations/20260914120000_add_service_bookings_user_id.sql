-- Production has a BEFORE INSERT trigger on service_bookings that reads
-- NEW.user_id. The in-repo table never had that column, so confirm_checkout
-- (service_role) and any other insert crash with:
--   record "new" has no field "user_id"  (SQLSTATE 42703)
-- Adding the column unblocks inserts. A sync trigger copies client_id when
-- user_id is omitted so guest/client rows stay consistent.

ALTER TABLE IF EXISTS public.service_bookings
  ADD COLUMN IF NOT EXISTS user_id uuid;

UPDATE public.service_bookings
SET user_id = client_id
WHERE user_id IS NULL
  AND client_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_service_bookings_user_id
  ON public.service_bookings (user_id);

CREATE OR REPLACE FUNCTION public.fn_service_bookings_sync_user_id()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.user_id IS NULL THEN
    NEW.user_id := NEW.client_id;
  END IF;
  IF NEW.client_id IS NULL THEN
    NEW.client_id := NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS aaa_trg_service_bookings_sync_user_id ON public.service_bookings;
CREATE TRIGGER aaa_trg_service_bookings_sync_user_id
  BEFORE INSERT OR UPDATE ON public.service_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.fn_service_bookings_sync_user_id();

COMMENT ON COLUMN public.service_bookings.user_id IS
  'Alias of client_id for a production trigger that reads NEW.user_id.';
