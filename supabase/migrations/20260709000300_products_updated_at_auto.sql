-- ═══════════════════════════════════════════════════════════════════════════
-- products.updated_at : maintenance automatique + découplage du RPC de stock
--
-- Contexte : decrement_product_stock (20260601000100) posait explicitement
-- `updated_at = NOW()` dans son UPDATE. Résultat : si la colonne manquait, TOUT
-- checkout produit cassait (cf. 20260709000200 qui ajoute la colonne).
--
-- Meilleure approche pour l'app :
--   1) un trigger BEFORE UPDATE générique tient `updated_at` à jour pour TOUTES
--      les modifications de produits (édition vendeur, admin, stock, RPC…),
--      pas seulement ce chemin précis ;
--   2) le RPC de stock est réécrit SANS référence à `updated_at` — il ne peut
--      donc plus jamais échouer à cause de cette colonne ; l'horodatage reste
--      correct grâce au trigger.
--
-- Idempotent : CREATE OR REPLACE + DROP TRIGGER IF EXISTS. Réappliquer est sûr.
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── 1) Fonction trigger générique ──────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.fn_products_set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END
$$;

DROP TRIGGER IF EXISTS trg_products_set_updated_at ON public.products;
CREATE TRIGGER trg_products_set_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.fn_products_set_updated_at();

-- ─── 2) RPC de stock découplé de updated_at ─────────────────────────────────
CREATE OR REPLACE FUNCTION public.decrement_product_stock(
  p_product_id uuid,
  p_qty        integer
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_current_stock integer;
  v_new_stock     integer;
BEGIN
  IF p_qty <= 0 THEN
    RAISE EXCEPTION 'decrement_product_stock: p_qty doit être > 0 (reçu: %)', p_qty;
  END IF;

  SELECT stock
    INTO v_current_stock
    FROM public.products
   WHERE id = p_product_id
     FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'decrement_product_stock: produit % introuvable', p_product_id;
  END IF;

  v_current_stock := COALESCE(v_current_stock, 0);

  IF v_current_stock < p_qty THEN
    RAISE EXCEPTION
      'decrement_product_stock: stock insuffisant pour le produit % (disponible: %, demandé: %)',
      p_product_id, v_current_stock, p_qty;
  END IF;

  v_new_stock := v_current_stock - p_qty;

  -- updated_at est posé automatiquement par trg_products_set_updated_at ;
  -- le trigger stock lifecycle (trg_products_sync_stock_lifecycle) recalcule
  -- stock_status / out_of_stock_since / auto_removal_date.
  UPDATE public.products
     SET stock = v_new_stock
   WHERE id = p_product_id;

  RETURN v_new_stock;
END;
$$;

REVOKE ALL ON FUNCTION public.decrement_product_stock(uuid, integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.decrement_product_stock(uuid, integer) FROM authenticated;
REVOKE ALL ON FUNCTION public.decrement_product_stock(uuid, integer) FROM anon;
GRANT  EXECUTE ON FUNCTION public.decrement_product_stock(uuid, integer) TO service_role;
