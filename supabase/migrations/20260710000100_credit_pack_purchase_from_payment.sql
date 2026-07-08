-- Variante automatisée de validate_pack_purchase(), pour créditer les points
-- suite à un paiement MTN MoMo direct (Paynote) confirmé, sans intervention
-- admin. Sécurité : exige la preuve d'un paiement réellement confirmé
-- (payment_transactions.status='paid') lié à cet achat par référence exacte
-- — pas de confiance aveugle dans les paramètres d'entrée.
CREATE OR REPLACE FUNCTION public.credit_pack_purchase_from_payment(
  p_purchase_id uuid,
  p_payment_ref text
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_purchase loyalty_pack_purchases;
  v_payment_ok boolean;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM payment_transactions
    WHERE provider_ref = p_payment_ref
      AND status = 'paid'
      AND order_group_id = 'LOYALTY-' || p_purchase_id::text
  ) INTO v_payment_ok;

  IF NOT v_payment_ok THEN
    RETURN json_build_object('success', false, 'error', 'Paiement non confirmé');
  END IF;

  SELECT * INTO v_purchase FROM loyalty_pack_purchases WHERE id = p_purchase_id FOR UPDATE;

  IF v_purchase.id IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Achat introuvable');
  END IF;

  IF v_purchase.status = 'credited' THEN
    RETURN json_build_object('success', true, 'already', true, 'purchase_id', v_purchase.id);
  END IF;

  IF v_purchase.status = 'cancelled' THEN
    RETURN json_build_object('success', false, 'error', 'Achat annulé');
  END IF;

  PERFORM add_loyalty_points(
    v_purchase.user_id,
    v_purchase.points,
    'achat_points',
    'Pack acheté (MTN MoMo direct) : ' || COALESCE(v_purchase.pack_nom, 'Pack'),
    v_purchase.prix_fcfa,
    v_purchase.id,
    'points_pack'
  );

  UPDATE loyalty_pack_purchases
  SET
    status = 'credited',
    validated_at = now(),
    admin_notes = 'Crédité automatiquement — paiement MTN MoMo (Paynote) confirmé, ref ' || p_payment_ref,
    paid_at = COALESCE(paid_at, now())
  WHERE id = p_purchase_id;

  RETURN json_build_object(
    'success', true,
    'purchase_id', v_purchase.id,
    'points_credited', v_purchase.points
  );
END;
$$;

REVOKE ALL ON FUNCTION public.credit_pack_purchase_from_payment(uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.credit_pack_purchase_from_payment(uuid, text) TO service_role;
