-- Harden catalog + delivery-pro quote INSERT privileges.
--
-- products (20260601000200):
--   INSERT used `vendeur_id = auth.uid() OR role IN ('seller', …)`.
--   Any seller therefore passed WITH CHECK regardless of vendeur_id and could
--   attribute listings to another shop. admin_partner was also included in
--   INSERT/UPDATE/DELETE despite the read-only partner design
--   (20260526000100_admin_partner_readonly).
--
-- delivery_pro_quotes (20260709100000):
--   Public INSERT only validated non-empty text + driver_mode, so callers could
--   set status/admin_notes or spoof user_id on create.

-- ─── products ───────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS products_insert_seller ON public.products;
CREATE POLICY products_insert_seller
  ON public.products
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (
      vendeur_id = auth.uid()
      AND EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid()
          AND role IN ('seller', 'admin', 'superadmin')
      )
    )
    OR public.is_platform_admin()
  );

DROP POLICY IF EXISTS products_update_seller ON public.products;
CREATE POLICY products_update_seller
  ON public.products
  FOR UPDATE
  TO authenticated
  USING (
    vendeur_id = auth.uid()
    OR public.is_platform_admin()
  )
  WITH CHECK (
    vendeur_id = auth.uid()
    OR public.is_platform_admin()
  );

DROP POLICY IF EXISTS products_delete_seller ON public.products;
CREATE POLICY products_delete_seller
  ON public.products
  FOR DELETE
  TO authenticated
  USING (
    vendeur_id = auth.uid()
    OR public.is_platform_admin()
  );

-- ─── delivery_pro_quotes ────────────────────────────────────────────────────
DROP POLICY IF EXISTS delivery_pro_quotes_insert ON public.delivery_pro_quotes;
CREATE POLICY delivery_pro_quotes_insert ON public.delivery_pro_quotes
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(trim(shop_name)) > 0
    AND length(trim(owner_name)) > 0
    AND length(trim(phone)) > 0
    AND length(trim(email)) > 0
    AND length(trim(city)) > 0
    AND length(trim(address)) > 0
    AND length(trim(monthly_volume)) > 0
    AND driver_mode IN ('assigned', 'pool')
    AND status = 'pending'
    AND admin_notes IS NULL
    AND (user_id IS NULL OR user_id = auth.uid())
  );
