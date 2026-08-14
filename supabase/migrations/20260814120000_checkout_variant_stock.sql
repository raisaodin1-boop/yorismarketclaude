-- Checkout variant integrity
--
-- applyCatalogPricing now prices selected variants from products.variants, but
-- stock checks/decrements still used the aggregate products.stock column.
-- Two buyers could each purchase the last unit of the same SKU (e.g. "Rouge XL"
-- stock=1) because check_cart_stock only compared against the summed stock.
--
-- Also: decrement_product_stock never updated the variant JSON, so the UI kept
-- showing the SKU as available after a sale.
--
-- This migration:
--   1) Teaches check_cart_stock to lock and compare variant.stock when
--      variant_id is present.
--   2) Extends decrement_product_stock with an optional p_variant_id that
--      decrements both the JSON SKU stock and the aggregate products.stock.

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS has_variants boolean NOT NULL DEFAULT false;

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS variants jsonb;

CREATE OR REPLACE FUNCTION public.check_cart_stock(p_items jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_item           jsonb;
  v_id             uuid;
  v_qty            integer;
  v_stock          integer;
  v_name           text;
  v_has_variants   boolean;
  v_variants       jsonb;
  v_variant_id     text;
  v_variant_stock  integer;
  v_variant_found  boolean;
BEGIN
  IF p_items IS NULL OR jsonb_typeof(p_items) <> 'array' THEN
    RETURN NULL;
  END IF;

  PERFORM 1
    FROM public.products
   WHERE id IN (
           SELECT (elem->>'id')::uuid
             FROM jsonb_array_elements(p_items) elem
            WHERE elem->>'id' IS NOT NULL
         )
   ORDER BY id
     FOR UPDATE;

  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    IF (v_item->>'id') IS NULL THEN
      CONTINUE;
    END IF;

    v_id  := (v_item->>'id')::uuid;
    v_qty := GREATEST(1, COALESCE((v_item->>'qty')::integer, 1));
    v_variant_id := NULLIF(TRIM(COALESCE(v_item->>'variant_id', v_item->>'variantId', '')), '');

    SELECT stock, name_fr, COALESCE(has_variants, false),
           CASE
             WHEN variants IS NULL THEN '[]'::jsonb
             ELSE variants::jsonb
           END
      INTO v_stock, v_name, v_has_variants, v_variants
      FROM public.products
     WHERE id = v_id;

    IF NOT FOUND THEN
      RETURN jsonb_build_object(
        'product_id', v_id,
        'name',       'Produit introuvable',
        'available',  0,
        'requested',  v_qty
      );
    END IF;

    IF v_has_variants AND v_variant_id IS NOT NULL THEN
      v_variant_found := false;
      v_variant_stock := 0;
      SELECT true, COALESCE((elem->>'stock')::integer, 0)
        INTO v_variant_found, v_variant_stock
        FROM jsonb_array_elements(COALESCE(v_variants, '[]'::jsonb)) elem
       WHERE elem->>'id' = v_variant_id
       LIMIT 1;

      IF NOT COALESCE(v_variant_found, false) THEN
        RETURN jsonb_build_object(
          'product_id', v_id,
          'name',       COALESCE(v_name, 'Produit'),
          'available',  0,
          'requested',  v_qty
        );
      END IF;

      IF v_variant_stock < v_qty THEN
        RETURN jsonb_build_object(
          'product_id', v_id,
          'name',       COALESCE(v_name, 'Produit'),
          'available',  v_variant_stock,
          'requested',  v_qty
        );
      END IF;
    ELSIF v_stock IS NOT NULL AND v_stock < v_qty THEN
      RETURN jsonb_build_object(
        'product_id', v_id,
        'name',       COALESCE(v_name, 'Produit'),
        'available',  v_stock,
        'requested',  v_qty
      );
    END IF;
  END LOOP;

  RETURN NULL;
END;
$$;

REVOKE ALL ON FUNCTION public.check_cart_stock(jsonb) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.check_cart_stock(jsonb) FROM authenticated;
REVOKE ALL ON FUNCTION public.check_cart_stock(jsonb) FROM anon;
GRANT EXECUTE ON FUNCTION public.check_cart_stock(jsonb) TO service_role;

DROP FUNCTION IF EXISTS public.decrement_product_stock(uuid, integer);

CREATE OR REPLACE FUNCTION public.decrement_product_stock(
  p_product_id uuid,
  p_qty        integer,
  p_variant_id text DEFAULT NULL
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_current_stock  integer;
  v_new_stock      integer;
  v_has_variants   boolean;
  v_variants       jsonb;
  v_variant_id     text;
  v_variant_stock  integer;
  v_variant_found  boolean := false;
  v_updated        jsonb;
BEGIN
  IF p_qty <= 0 THEN
    RAISE EXCEPTION 'decrement_product_stock: p_qty doit être > 0 (reçu: %)', p_qty;
  END IF;

  v_variant_id := NULLIF(TRIM(COALESCE(p_variant_id, '')), '');

  SELECT stock, COALESCE(has_variants, false),
         CASE
           WHEN variants IS NULL THEN '[]'::jsonb
           ELSE variants::jsonb
         END
    INTO v_current_stock, v_has_variants, v_variants
    FROM public.products
   WHERE id = p_product_id
     FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'decrement_product_stock: produit % introuvable', p_product_id;
  END IF;

  v_current_stock := COALESCE(v_current_stock, 0);

  IF v_has_variants AND v_variant_id IS NOT NULL THEN
    SELECT true, COALESCE((elem->>'stock')::integer, 0)
      INTO v_variant_found, v_variant_stock
      FROM jsonb_array_elements(COALESCE(v_variants, '[]'::jsonb)) elem
     WHERE elem->>'id' = v_variant_id
     LIMIT 1;

    IF NOT COALESCE(v_variant_found, false) THEN
      RAISE EXCEPTION 'decrement_product_stock: variante % introuvable pour le produit %',
        v_variant_id, p_product_id;
    END IF;

    IF v_variant_stock < p_qty THEN
      RAISE EXCEPTION
        'decrement_product_stock: stock insuffisant pour le produit % (disponible: %, demandé: %)',
        p_product_id, v_variant_stock, p_qty;
    END IF;

    SELECT jsonb_agg(
             CASE
               WHEN elem->>'id' = v_variant_id THEN
                 jsonb_set(elem, '{stock}', to_jsonb(COALESCE((elem->>'stock')::integer, 0) - p_qty))
               ELSE elem
             END
           )
      INTO v_updated
      FROM jsonb_array_elements(COALESCE(v_variants, '[]'::jsonb)) elem;

    v_new_stock := v_current_stock - p_qty;
    IF v_new_stock < 0 THEN
      v_new_stock := 0;
    END IF;

    UPDATE public.products
       SET stock      = v_new_stock,
           variants   = COALESCE(v_updated, v_variants),
           updated_at = NOW()
     WHERE id = p_product_id;

    RETURN v_new_stock;
  END IF;

  IF v_current_stock < p_qty THEN
    RAISE EXCEPTION
      'decrement_product_stock: stock insuffisant pour le produit % (disponible: %, demandé: %)',
      p_product_id, v_current_stock, p_qty;
  END IF;

  v_new_stock := v_current_stock - p_qty;

  UPDATE public.products
     SET stock      = v_new_stock,
         updated_at = NOW()
   WHERE id = p_product_id;

  RETURN v_new_stock;
END;
$$;

REVOKE ALL ON FUNCTION public.decrement_product_stock(uuid, integer, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.decrement_product_stock(uuid, integer, text) FROM authenticated;
REVOKE ALL ON FUNCTION public.decrement_product_stock(uuid, integer, text) FROM anon;
GRANT EXECUTE ON FUNCTION public.decrement_product_stock(uuid, integer, text) TO service_role;

COMMENT ON FUNCTION public.decrement_product_stock(uuid, integer, text) IS
  'Décrémente atomiquement le stock produit (et la variante JSON si p_variant_id). '
  'Appelée par confirm_checkout. Lève une exception si stock insuffisant.';
