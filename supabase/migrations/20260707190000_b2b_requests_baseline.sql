-- B2B wholesale requests (aligns remote schema with local migrations).
-- Idempotent — safe when table already exists on remote.

CREATE TABLE IF NOT EXISTS public.b2b_requests (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id    uuid NOT NULL,
  seller_id     uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  company_name  text,
  contact_name  text NOT NULL,
  phone         text NOT NULL,
  email         text,
  quantity      integer NOT NULL CHECK (quantity > 0),
  message       text,
  status        text NOT NULL DEFAULT 'pending',
  quote_amount  numeric(14, 2),
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS b2b_requests_buyer_id_idx ON public.b2b_requests(buyer_id);
CREATE INDEX IF NOT EXISTS b2b_requests_seller_id_idx ON public.b2b_requests(seller_id);
CREATE INDEX IF NOT EXISTS b2b_requests_product_id_idx ON public.b2b_requests(product_id);
CREATE INDEX IF NOT EXISTS b2b_requests_status_idx ON public.b2b_requests(status);

ALTER TABLE public.b2b_requests ENABLE ROW LEVEL SECURITY;

-- Policies refined in 20260707200000_hardening_security_wallet_notifications.sql
