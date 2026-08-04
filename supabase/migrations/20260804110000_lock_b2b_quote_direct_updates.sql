-- B2B quote workflow must go through SECURITY DEFINER RPCs
-- (fn_respond_b2b_request / fn_accept_b2b_quote). Direct UPDATE policies
-- let a buyer forge quote_amount/status/deposit_pct, or a seller mutate
-- buyer fields outside the guarded transition + notification path.

DO $$
BEGIN
  IF to_regclass('public.b2b_requests') IS NULL THEN
    RETURN;
  END IF;

  DROP POLICY IF EXISTS b2b_buyer_update ON public.b2b_requests;
  DROP POLICY IF EXISTS b2b_seller_update ON public.b2b_requests;
END $$;
