-- Minimal reproduction of the live service_bookings trigger crash.
-- A production trigger reads NEW.user_id, but the table has no such column.

DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO public;

CREATE TABLE public.service_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NULL,
  service_id uuid NULL,
  provider_id uuid NULL,
  client_id uuid NULL,
  client_nom text NULL,
  client_tel text NULL,
  booking_date date NULL,
  booking_time text NULL,
  location_type text NOT NULL DEFAULT 'home',
  location_address text NULL,
  status text NOT NULL DEFAULT 'reserved',
  notes text NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Mimic the live trigger: any reference to NEW.user_id raises 42703
-- ("record \"new\" has no field \"user_id\"") while the column is missing.
CREATE OR REPLACE FUNCTION public.fn_service_bookings_legacy_user_id()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  PERFORM NEW.user_id;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_service_bookings_legacy_user_id
  BEFORE INSERT ON public.service_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.fn_service_bookings_legacy_user_id();

DO $repro$
DECLARE
  v_sqlstate text;
  v_msg text;
BEGIN
  BEGIN
    INSERT INTO public.service_bookings (service_id, client_id, client_nom, status)
    VALUES (
      '7e5eeb72-e1fd-4bcd-8bdb-0039e60770ca',
      '11111111-1111-1111-1111-111111111111',
      'probe',
      'reserved'
    );
    RAISE EXCEPTION 'expected missing user_id field error, insert succeeded';
  EXCEPTION WHEN undefined_column THEN
    v_sqlstate := SQLSTATE;
    v_msg := SQLERRM;
  END;
  IF v_sqlstate IS DISTINCT FROM '42703' OR v_msg NOT ILIKE '%user_id%' THEN
    RAISE EXCEPTION 'unexpected repro error: % %', v_sqlstate, v_msg;
  END IF;
  RAISE NOTICE 'BUG_REPRODUCED';
END;
$repro$;
