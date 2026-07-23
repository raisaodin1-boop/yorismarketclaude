-- The delivery-pro admin tab is available to admin_partner users, but the
-- table was created after the migration that widened admin SELECT policies to
-- is_platform_admin_viewer(). Add the missing read-only policy explicitly.

DROP POLICY IF EXISTS delivery_pro_quotes_admin_viewer_read
  ON public.delivery_pro_quotes;

CREATE POLICY delivery_pro_quotes_admin_viewer_read
  ON public.delivery_pro_quotes
  FOR SELECT TO authenticated
  USING (public.is_platform_admin_viewer());
