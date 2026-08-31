-- Checkout (create_checkout_intent / confirm_checkout) recopient products.prix
-- / services.prix dans le sous-total. Aucun CHECK n'empêchait un vendeur
-- d'insérer prix = -N via l'API (le formulaire UI a min=0, RLS n'a pas
-- d'allowlist de colonnes). Un panier mixte (vrai produit + leurre négatif)
-- faisait payer moins que le catalogue — voire 0 FCFA — tout en créant
-- les commandes et en décrémentant le stock.
--
-- NOT VALID : n'échoue pas si des lignes historiques sont déjà négatives ;
-- les INSERT/UPDATE nouveaux sont tout de même contrôlés.

DO $$
BEGIN
  IF to_regclass('public.products') IS NOT NULL THEN
    ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_prix_non_negative;
    ALTER TABLE public.products
      ADD CONSTRAINT products_prix_non_negative
      CHECK (prix IS NULL OR prix >= 0) NOT VALID;
  END IF;

  IF to_regclass('public.services') IS NOT NULL THEN
    ALTER TABLE public.services DROP CONSTRAINT IF EXISTS services_prix_non_negative;
    ALTER TABLE public.services
      ADD CONSTRAINT services_prix_non_negative
      CHECK (prix IS NULL OR prix >= 0) NOT VALID;
  END IF;
END $$;
