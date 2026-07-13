-- Harden automated loyalty pack crediting: a paid Paynote transaction must
-- match the selected catalog pack and exact amount before points are issued.
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
  v_purchase public.loyalty_pack_purchases%ROWTYPE;
  v_pack public.loyalty_packs%ROWTYPE;
  v_payment public.payment_transactions%ROWTYPE;
  v_expected_points integer;
  v_expected_amount numeric(14,2);
BEGIN
  SELECT * INTO v_purchase
  FROM public.loyalty_pack_purchases
  WHERE id = p_purchase_id
  FOR UPDATE;

  IF v_purchase.id IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Achat introuvable');
  END IF;

  IF v_purchase.status = 'credited' THEN
    RETURN json_build_object('success', true, 'already', true, 'purchase_id', v_purchase.id);
  END IF;

  IF v_purchase.status = 'cancelled' THEN
    RETURN json_build_object('success', false, 'error', 'Achat annulé');
  END IF;

  SELECT * INTO v_pack
  FROM public.loyalty_packs
  WHERE id = v_purchase.pack_id;

  IF v_pack.id IS NULL OR COALESCE(v_pack.actif, false) IS NOT TRUE THEN
    RETURN json_build_object('success', false, 'error', 'Pack fidélité indisponible');
  END IF;

  v_expected_points :=
    COALESCE(v_pack.points, 0)::integer
    + ROUND((COALESCE(v_pack.points, 0)::numeric * COALESCE(v_pack.bonus_pct, 0)::numeric) / 100)::integer;
  v_expected_amount := ROUND(COALESCE(v_pack.prix_fcfa, 0))::numeric(14,2);

  IF ROUND(COALESCE(v_purchase.prix_fcfa, 0))::numeric(14,2) <> v_expected_amount
     OR COALESCE(v_purchase.points, 0)::integer <> v_expected_points THEN
    RETURN json_build_object('success', false, 'error', 'Achat fidélité incohérent avec le pack sélectionné');
  END IF;

  SELECT * INTO v_payment
  FROM public.payment_transactions
  WHERE provider = 'paynote_mtn'
    AND provider_ref = p_payment_ref
    AND status = 'paid'
    AND order_group_id = 'LOYALTY-' || p_purchase_id::text
    AND ROUND(COALESCE(amount, 0))::numeric(14,2) = v_expected_amount
  ORDER BY created_at DESC
  LIMIT 1;

  IF v_payment.id IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Paiement non confirmé pour ce montant');
  END IF;

  PERFORM public.add_loyalty_points(
    v_purchase.user_id,
    v_expected_points,
    'achat_points',
    'Pack acheté (MTN MoMo direct) : ' || COALESCE(v_pack.nom, v_purchase.pack_nom, 'Pack'),
    v_expected_amount,
    v_purchase.id,
    'points_pack'
  );

  UPDATE public.loyalty_pack_purchases
  SET
    status = 'credited',
    points = v_expected_points,
    prix_fcfa = v_expected_amount,
    validated_at = now(),
    admin_notes = 'Crédité automatiquement — paiement MTN MoMo (Paynote) confirmé, ref ' || p_payment_ref,
    paid_at = COALESCE(paid_at, v_payment.updated_at, v_payment.created_at, now())
  WHERE id = p_purchase_id;

  RETURN json_build_object(
    'success', true,
    'purchase_id', v_purchase.id,
    'points_credited', v_expected_points
  );
END;
$$;

REVOKE ALL ON FUNCTION public.credit_pack_purchase_from_payment(uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.credit_pack_purchase_from_payment(uuid, text) TO service_role;
