-- Packs vendeur (modération admin) + catégorie packs-ensemble

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS is_pack boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS pack_status text,
  ADD COLUMN IF NOT EXISTS pack_description text,
  ADD COLUMN IF NOT EXISTS pack_linked_product_ids uuid[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS pack_admin_notes text,
  ADD COLUMN IF NOT EXISTS pack_rejection_reason text,
  ADD COLUMN IF NOT EXISTS pack_submitted_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_products_pack_pending
  ON public.products (pack_submitted_at DESC)
  WHERE is_pack = true AND pack_status = 'pending';

COMMENT ON COLUMN public.products.pack_status IS 'pending | approved | rejected | correction — null si pas un pack';

-- Catégorie choisie par le vendeur pour les packs
INSERT INTO public.marketplace_categories
  (name_fr, name_en, slug, category_type, category_kind, featured, trending,
   is_top_products, is_featured_homepage, category_badge, category_theme,
   sort_order, icon, seo_title_fr, seo_title_en, seo_description_fr, seo_description_en)
VALUES
  ('Packs & ensembles', 'Bundles & sets', 'packs-ensemble', 'product', 'promotional', true, false,
   false, false, '📦 Pack', 'deal', 5, '📦',
   'Packs et ensembles vendeur | Yorix.cm', 'Seller bundles | Yorix.cm',
   'Produits complémentaires : poisson+riz, téléphone+pochette…', 'Complementary product bundles.')
ON CONFLICT (slug, category_type) DO UPDATE SET
  name_fr = EXCLUDED.name_fr,
  category_badge = EXCLUDED.category_badge,
  seo_title_fr = EXCLUDED.seo_title_fr;

-- Modération pack (admin)
CREATE OR REPLACE FUNCTION public.fn_admin_moderate_product_pack(
  p_product_id uuid,
  p_action text,
  p_admin_notes text DEFAULT NULL,
  p_rejection_reason text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_product public.products%ROWTYPE;
  v_seller uuid;
  v_title text;
  v_msg text;
  v_notif_title text;
BEGIN
  IF NOT public.is_platform_admin() THEN
    RAISE EXCEPTION 'Accès refusé';
  END IF;

  SELECT * INTO v_product FROM public.products WHERE id = p_product_id;
  IF NOT FOUND OR v_product.is_pack IS NOT TRUE THEN
    RAISE EXCEPTION 'Pack introuvable';
  END IF;

  v_seller := v_product.vendeur_id;
  v_title := coalesce(v_product.name_fr, 'Votre pack');

  IF p_action = 'approve' THEN
    UPDATE public.products SET
      pack_status = 'approved',
      actif = true,
      pack_admin_notes = nullif(trim(p_admin_notes), ''),
      pack_rejection_reason = NULL
    WHERE id = p_product_id;

    v_notif_title := '✅ Pack approuvé';
    v_msg := 'Votre pack « ' || v_title || ' » est publié sur Yorix.';
    INSERT INTO public.notifications (user_id, type, title, message, link, lu)
    VALUES (v_seller, 'pack_moderation', v_notif_title, v_msg, '/dashboard', false);

    RETURN jsonb_build_object('ok', true, 'action', 'approve');

  ELSIF p_action = 'correction' THEN
    UPDATE public.products SET
      pack_status = 'correction',
      actif = false,
      pack_admin_notes = nullif(trim(p_admin_notes), ''),
      pack_rejection_reason = NULL
    WHERE id = p_product_id;

    v_notif_title := '✏️ Pack à corriger';
    v_msg := coalesce(nullif(trim(p_admin_notes), ''), 'Merci de corriger votre fiche pack.') ||
      E'\n\nPack : ' || v_title;
    INSERT INTO public.notifications (user_id, type, title, message, link, lu)
    VALUES (v_seller, 'pack_moderation', v_notif_title, v_msg, '/dashboard', false);

    RETURN jsonb_build_object('ok', true, 'action', 'correction');

  ELSIF p_action = 'reject' THEN
    v_msg := coalesce(nullif(trim(p_rejection_reason), ''), 'Pack non conforme aux règles Yorix.');
    INSERT INTO public.notifications (user_id, type, title, message, link, lu)
    VALUES (
      v_seller,
      'pack_moderation',
      '❌ Pack refusé',
      'Votre pack « ' || v_title || ' » a été refusé. Raison : ' || v_msg,
      '/dashboard',
      false
    );
    DELETE FROM public.products WHERE id = p_product_id;
    RETURN jsonb_build_object('ok', true, 'action', 'reject', 'deleted', true);

  ELSE
    RAISE EXCEPTION 'Action invalide (approve, correction, reject)';
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.fn_admin_moderate_product_pack(uuid, text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.fn_admin_moderate_product_pack(uuid, text, text, text) TO authenticated;
