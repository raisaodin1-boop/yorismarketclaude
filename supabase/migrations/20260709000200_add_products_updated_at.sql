-- ═══════════════════════════════════════════════════════════════════════════
-- FIX : colonne products.updated_at manquante → checkout cassé pour TOUS
-- les produits.
--
-- Le RPC public.decrement_product_stock (20260601000100) fait
--   UPDATE public.products SET stock = …, updated_at = NOW() WHERE id = …
-- appelé par la Edge Function confirm_checkout pour CHAQUE ligne produit.
-- Si la colonne updated_at n'existe pas, Postgres lève
--   « column "updated_at" of relation "products" does not exist »
-- ce qui fait échouer confirm_checkout en 500 → l'acheteur voit
-- « Impossible de finaliser le checkout ». Les commandes 100 % services
-- passent (elles n'appellent pas le RPC), d'où l'impression d'un bug
-- « spécifique aux produits ».
--
-- Idempotent : IF NOT EXISTS + backfill borné. Réappliquer est sans effet.
-- ═══════════════════════════════════════════════════════════════════════════

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

-- Backfill des lignes existantes sur created_at quand il est disponible,
-- sinon sur now() (déjà posé par le DEFAULT). N'écrase jamais une valeur.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'products' AND column_name = 'created_at'
  ) THEN
    UPDATE public.products
       SET updated_at = created_at
     WHERE updated_at IS NULL OR updated_at = now();
  END IF;
END$$;

COMMENT ON COLUMN public.products.updated_at IS
  'Horodatage de dernière modification. Mis à jour par decrement_product_stock '
  'lors des commandes ; requis pour confirm_checkout.';
