-- Vérification vendeur v2 : catégories A/B/C/D, docs structurés, badge via admin uniquement.

ALTER TABLE public.seller_kyc
  ADD COLUMN IF NOT EXISTS seller_category text,
  ADD COLUMN IF NOT EXISTS business_country text,
  ADD COLUMN IF NOT EXISTS location_lat numeric(10, 7),
  ADD COLUMN IF NOT EXISTS location_lng numeric(10, 7),
  ADD COLUMN IF NOT EXISTS location_map_url text,
  ADD COLUMN IF NOT EXISTS extra_docs jsonb NOT NULL DEFAULT '[]'::jsonb;

COMMENT ON COLUMN public.seller_kyc.seller_category IS 'online | physical_store | local_business | import_business';
COMMENT ON COLUMN public.seller_kyc.extra_docs IS '[{ "type": "import_proof", "url": "...", "label": "..." }]';

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS seller_verified_at timestamptz;

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS vendeur_verifie boolean NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_products_vendeur_verifie
  ON public.products (vendeur_verifie)
  WHERE vendeur_verifie = true;

-- Backfill badge produits pour vendeurs déjà vérifiés
UPDATE public.products p
SET vendeur_verifie = true
FROM public.profiles pr
WHERE p.vendeur_id = pr.id AND pr.verifie = true;

-- ─── Décision admin KYC (seule voie de validation) ───────────────────────────
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
BEGIN
  IF v_admin IS NULL THEN
    RAISE EXCEPTION 'Authentification requise';
  END IF;

  IF NOT public.is_platform_admin() THEN
    RAISE EXCEPTION 'Action réservée aux administrateurs';
  END IF;

  IF v_action NOT IN ('approve', 'reject', 'info_requested', 'revoke') THEN
    RAISE EXCEPTION 'Action invalide';
  END IF;

  SELECT * INTO v_row FROM public.seller_kyc WHERE id = p_kyc_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Dossier KYC introuvable';
  END IF;

  IF v_action = 'approve' THEN
    UPDATE public.seller_kyc
    SET
      status = 'verified',
      reviewed_at = now(),
      reviewer_id = v_admin,
      reviewer_note = nullif(trim(p_note), ''),
      updated_at = now()
    WHERE id = p_kyc_id
    RETURNING * INTO v_row;

    UPDATE public.profiles
    SET
      verifie = true,
      seller_verified_at = now(),
      supplier_channel = CASE
        WHEN v_row.seller_category = 'import_business' THEN
          CASE
            WHEN upper(coalesce(v_row.business_country, v_row.country, '')) IN ('CN', 'CHINE', 'CHINA') THEN 'import_cn'
            ELSE 'import_intl'
          END
        ELSE supplier_channel
      END,
      updated_at = now()
    WHERE id = v_row.user_id;

    UPDATE public.products
    SET vendeur_verifie = true
    WHERE vendeur_id = v_row.user_id;

    INSERT INTO public.notifications (user_id, type, title, message, lu, payload)
    VALUES (
      v_row.user_id,
      'kyc',
      'Vendeur vérifié ✓',
      'Votre profil vendeur a été validé. Le badge « Vendeur vérifié » est visible sur votre boutique.',
      false,
      jsonb_build_object('kyc_id', v_row.id, 'status', 'verified')
    );

  ELSIF v_action = 'reject' THEN
    UPDATE public.seller_kyc
    SET
      status = 'rejected',
      reviewed_at = now(),
      reviewer_id = v_admin,
      reviewer_note = nullif(trim(p_note), ''),
      updated_at = now()
    WHERE id = p_kyc_id
    RETURNING * INTO v_row;

    UPDATE public.profiles
    SET verifie = false, seller_verified_at = null, updated_at = now()
    WHERE id = v_row.user_id;

    UPDATE public.products
    SET vendeur_verifie = false
    WHERE vendeur_id = v_row.user_id;

    INSERT INTO public.notifications (user_id, type, title, message, lu, payload)
    VALUES (
      v_row.user_id,
      'kyc',
      'Vérification refusée',
      coalesce(nullif(trim(p_note), ''), 'Votre dossier a été refusé. Corrigez et soumettez à nouveau.'),
      false,
      jsonb_build_object('kyc_id', v_row.id, 'status', 'rejected')
    );

  ELSIF v_action = 'info_requested' THEN
    UPDATE public.seller_kyc
    SET
      status = 'info_requested',
      reviewed_at = now(),
      reviewer_id = v_admin,
      reviewer_note = nullif(trim(p_note), ''),
      updated_at = now()
    WHERE id = p_kyc_id
    RETURNING * INTO v_row;

    INSERT INTO public.notifications (user_id, type, title, message, lu, payload)
    VALUES (
      v_row.user_id,
      'kyc',
      'Informations complémentaires requises',
      coalesce(nullif(trim(p_note), ''), 'Merci de compléter votre dossier de vérification vendeur.'),
      false,
      jsonb_build_object('kyc_id', v_row.id, 'status', 'info_requested')
    );

  ELSIF v_action = 'revoke' THEN
    UPDATE public.seller_kyc
    SET
      status = 'rejected',
      reviewed_at = now(),
      reviewer_id = v_admin,
      reviewer_note = coalesce(nullif(trim(p_note), ''), 'Vérification retirée par l''administration'),
      updated_at = now()
    WHERE id = p_kyc_id
    RETURNING * INTO v_row;

    UPDATE public.profiles
    SET verifie = false, seller_verified_at = null, updated_at = now()
    WHERE id = v_row.user_id;

    UPDATE public.products
    SET vendeur_verifie = false
    WHERE vendeur_id = v_row.user_id;

    INSERT INTO public.notifications (user_id, type, title, message, lu, payload)
    VALUES (
      v_row.user_id,
      'kyc',
      'Badge vendeur retiré',
      coalesce(nullif(trim(p_note), ''), 'Votre badge vendeur vérifié a été retiré. Contactez le support.'),
      false,
      jsonb_build_object('kyc_id', v_row.id, 'status', 'revoked')
    );
  END IF;

  RETURN v_row;
END;
$$;

REVOKE ALL ON FUNCTION public.fn_admin_decide_seller_kyc(uuid, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.fn_admin_decide_seller_kyc(uuid, text, text) TO authenticated;
