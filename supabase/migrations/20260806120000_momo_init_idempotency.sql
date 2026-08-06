-- At most one in-flight MoMo (Paynote) initiation per checkout intent /
-- order group. api/momo.js and api/momo-loyalty.js insert a pending claim
-- (provider_ref NULL) before calling Paynote; concurrent or retried POSTs
-- hit this unique index and reuse the existing journal instead of creating
-- a second provider charge.

CREATE UNIQUE INDEX IF NOT EXISTS idx_payment_tx_momo_pending_intent
  ON public.payment_transactions (checkout_intent_id)
  WHERE provider = 'paynote_mtn'
    AND status = 'pending'
    AND checkout_intent_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_payment_tx_momo_pending_order_group
  ON public.payment_transactions (order_group_id)
  WHERE provider = 'paynote_mtn'
    AND status = 'pending'
    AND order_group_id IS NOT NULL;

COMMENT ON INDEX public.idx_payment_tx_momo_pending_intent IS
  'Ensures a single pending Paynote MoMo init claim per checkout_intent_id.';

COMMENT ON INDEX public.idx_payment_tx_momo_pending_order_group IS
  'Ensures a single pending Paynote MoMo init claim per order_group_id (incl. LOYALTY-*).';
