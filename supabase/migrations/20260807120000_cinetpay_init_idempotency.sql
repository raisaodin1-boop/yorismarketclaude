-- At most one in-flight CinetPay initiation per checkout intent / order group.
-- init_payment_cinetpay inserts a pending claim (provider_ref NULL) before
-- calling CinetPay; concurrent or retried POSTs hit this unique index and
-- reuse the existing journal / payment_url instead of opening a second
-- payable provider session (which can collect money twice for one order).

CREATE UNIQUE INDEX IF NOT EXISTS idx_payment_tx_cinetpay_pending_intent
  ON public.payment_transactions (checkout_intent_id)
  WHERE provider = 'cinetpay'
    AND status = 'pending'
    AND checkout_intent_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_payment_tx_cinetpay_pending_order_group
  ON public.payment_transactions (order_group_id)
  WHERE provider = 'cinetpay'
    AND status = 'pending'
    AND order_group_id IS NOT NULL;

COMMENT ON INDEX public.idx_payment_tx_cinetpay_pending_intent IS
  'Ensures a single pending CinetPay init claim per checkout_intent_id.';

COMMENT ON INDEX public.idx_payment_tx_cinetpay_pending_order_group IS
  'Ensures a single pending CinetPay init claim per order_group_id.';
