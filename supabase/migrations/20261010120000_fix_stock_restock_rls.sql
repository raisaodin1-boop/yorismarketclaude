-- Réapprovisionnement vendeur bloqué par le journal de stock.
--
-- fn_products_sync_stock_lifecycle (20260524000100) s'exécutait avec les droits
-- de l'appelant. Dès qu'un produit passe de stock NULL/0 à un stock positif,
-- le trigger INSERT dans stock_lifecycle_log. Cette table a le RLS activé et
-- aucune policy INSERT (écriture prévue uniquement via service_role).
--
-- Conséquence : un vendeur authentifié qui réapprovisionne (dashboard
-- « Réapprovisionner », réactivation d'un produit archivé, ou édition qui
-- remonte le stock) reçoit
--   new row violates row-level security policy for table "stock_lifecycle_log"
-- et le UPDATE de products est annulé. Le produit reste à 0 et invendable.
-- Les baisses de stock (vente, passage à 0) ne font pas cet INSERT et
-- continuaient de fonctionner.
--
-- Correctif : SECURITY DEFINER. L'INSERT d'audit s'exécute en tant que
-- propriétaire de la fonction (rôle de migration, qui contourne le RLS).
-- Le vendeur ne peut toujours pas écrire le journal lui-même.

CREATE OR REPLACE FUNCTION public.fn_products_sync_stock_lifecycle()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_grace int := 30;
  v_low int := 5;
BEGIN
  BEGIN
    SELECT stock_out_grace_days, stock_low_threshold
    INTO v_grace, v_low
    FROM public.commerce_settings
    WHERE id = 1;
  EXCEPTION WHEN OTHERS THEN
    NULL;
  END;

  IF NEW.stock IS NULL THEN
    NEW.stock := 0;
  END IF;

  IF NEW.stock <= 0 THEN
    IF NEW.out_of_stock_since IS NULL THEN
      NEW.out_of_stock_since := now();
      NEW.auto_removal_date := now() + make_interval(days => v_grace);
      NEW.seller_notified := false;
      NEW.stock_alerts_sent := '{}'::jsonb;
    END IF;
    IF NEW.is_archived THEN
      NEW.stock_status := 'archived';
    ELSE
      NEW.stock_status := 'out_of_stock';
    END IF;
  ELSE
    IF TG_OP = 'UPDATE' AND (OLD.stock IS NULL OR OLD.stock <= 0) THEN
      INSERT INTO public.stock_lifecycle_log (product_id, vendeur_id, event, payload)
      VALUES (NEW.id, NEW.vendeur_id, 'restocked',
        jsonb_build_object('previous_stock', OLD.stock, 'new_stock', NEW.stock));
    END IF;
    NEW.out_of_stock_since := NULL;
    NEW.auto_removal_date := NULL;
    NEW.seller_notified := false;
    NEW.last_stock_alert_sent := NULL;
    NEW.stock_alerts_sent := '{}'::jsonb;
    NEW.is_archived := false;
    NEW.hidden_from_marketplace := false;
    IF NEW.stock <= v_low THEN
      NEW.stock_status := 'low';
    ELSE
      NEW.stock_status := 'in_stock';
    END IF;
  END IF;

  RETURN NEW;
END
$$;

REVOKE ALL ON FUNCTION public.fn_products_sync_stock_lifecycle() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.fn_products_sync_stock_lifecycle() TO service_role;

COMMENT ON FUNCTION public.fn_products_sync_stock_lifecycle() IS
  'Maintient stock_status / out_of_stock_since. SECURITY DEFINER pour que '
  'l''audit restocked ne soit pas rejeté par le RLS de stock_lifecycle_log '
  'quand un vendeur réapprovisionne.';
