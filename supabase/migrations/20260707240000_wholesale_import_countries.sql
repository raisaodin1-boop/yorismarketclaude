-- Pays d'origine / RCCM : code + précision « Autre »

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS country_of_origin_other text;

ALTER TABLE public.seller_kyc
  ADD COLUMN IF NOT EXISTS business_country_code text,
  ADD COLUMN IF NOT EXISTS business_country_other text;

COMMENT ON COLUMN public.products.country_of_origin_other IS 'Nom du pays si country_of_origin = XX';
COMMENT ON COLUMN public.seller_kyc.business_country_code IS 'Code pays RCCM (CN, IN, FR, XX, …)';
COMMENT ON COLUMN public.seller_kyc.business_country_other IS 'Précision si business_country_code = XX';

-- Mettre à jour le canal fournisseur selon le code pays (pas seulement la Chine)
CREATE OR REPLACE FUNCTION public.fn_admin_decide_seller_kyc(
  p_kyc_id uuid,
  p_action text,
  p_note text DEFAULT NULL
)
RETURNS public.seller_kyc
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_admin uuid := auth.uid();
  v_row public.seller_kyc;
  v_action text := lower(trim(coalesce(p_action, '')));
  v_country_code text;
BEGIN
  IF v_admin IS NULL THEN RAISE EXCEPTION 'Authentification requise'; END IF;
  IF NOT public.is_platform_admin() THEN RAISE EXCEPTION 'Action réservée aux administrateurs'; END IF;
  IF v_action NOT IN ('approve', 'reject', 'info_requested', 'revoke') THEN RAISE EXCEPTION 'Action invalide'; END IF;

  SELECT * INTO v_row FROM public.seller_kyc WHERE id = p_kyc_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Dossier KYC introuvable'; END IF;

  IF v_action = 'approve' THEN
    UPDATE public.seller_kyc
    SET status = 'verified', reviewed_at = now(), reviewer_id = v_admin,
        reviewer_note = nullif(trim(p_note), ''), updated_at = now()
    WHERE id = p_kyc_id RETURNING * INTO v_row;

    v_country_code := upper(coalesce(
      v_row.business_country_code,
      nullif(trim(v_row.business_country), ''),
      v_row.country,
      'CM'
    ));

    UPDATE public.profiles
    SET
      verifie = true,
      seller_verified_at = now(),
      supplier_channel = CASE
        WHEN v_row.seller_category = 'import_business' THEN
          CASE WHEN v_country_code = 'CN' THEN 'import_cn' ELSE 'import_intl' END
        ELSE supplier_channel
      END,
      updated_at = now()
    WHERE id = v_row.user_id;

    UPDATE public.products SET vendeur_verifie = true WHERE vendeur_id = v_row.user_id;

    INSERT INTO public.notifications (user_id, type, title, message, lu, payload)
    VALUES (v_row.user_id, 'kyc', 'Vendeur vérifié ✓',
      'Votre profil vendeur a été validé. Le badge « Vendeur vérifié » est visible sur votre boutique.',
      false, jsonb_build_object('kyc_id', v_row.id, 'status', 'verified'));

  ELSIF v_action = 'reject' THEN
    UPDATE public.seller_kyc
    SET status = 'rejected', reviewed_at = now(), reviewer_id = v_admin,
        reviewer_note = nullif(trim(p_note), ''), updated_at = now()
    WHERE id = p_kyc_id RETURNING * INTO v_row;
    UPDATE public.profiles SET verifie = false, seller_verified_at = null, updated_at = now() WHERE id = v_row.user_id;
    UPDATE public.products SET vendeur_verifie = false WHERE vendeur_id = v_row.user_id;
    INSERT INTO public.notifications (user_id, type, title, message, lu, payload)
    VALUES (v_row.user_id, 'kyc', 'Vérification refusée',
      coalesce(nullif(trim(p_note), ''), 'Votre dossier a été refusé. Corrigez et soumettez à nouveau.'),
      false, jsonb_build_object('kyc_id', v_row.id, 'status', 'rejected'));

  ELSIF v_action = 'info_requested' THEN
    UPDATE public.seller_kyc
    SET status = 'info_requested', reviewed_at = now(), reviewer_id = v_admin,
        reviewer_note = nullif(trim(p_note), ''), updated_at = now()
    WHERE id = p_kyc_id RETURNING * INTO v_row;
    INSERT INTO public.notifications (user_id, type, title, message, lu, payload)
    VALUES (v_row.user_id, 'kyc', 'Informations complémentaires requises',
      coalesce(nullif(trim(p_note), ''), 'Merci de compléter votre dossier de vérification vendeur.'),
      false, jsonb_build_object('kyc_id', v_row.id, 'status', 'info_requested'));

  ELSIF v_action = 'revoke' THEN
    UPDATE public.seller_kyc
    SET status = 'rejected', reviewed_at = now(), reviewer_id = v_admin,
        reviewer_note = coalesce(nullif(trim(p_note), ''), 'Vérification retirée par l''administration'),
        updated_at = now()
    WHERE id = p_kyc_id RETURNING * INTO v_row;
    UPDATE public.profiles SET verifie = false, seller_verified_at = null, updated_at = now() WHERE id = v_row.user_id;
    UPDATE public.products SET vendeur_verifie = false WHERE vendeur_id = v_row.user_id;
    INSERT INTO public.notifications (user_id, type, title, message, lu, payload)
    VALUES (v_row.user_id, 'kyc', 'Badge vendeur retiré',
      coalesce(nullif(trim(p_note), ''), 'Votre badge vendeur vérifié a été retiré. Contactez le support.'),
      false, jsonb_build_object('kyc_id', v_row.id, 'status', 'revoked'));
  END IF;

  RETURN v_row;
END;
$$;
