-- Remediate public delivery-table exposure while keeping code-based tracking.

DROP POLICY IF EXISTS deliveries_select_all ON public.deliveries;
DROP POLICY IF EXISTS deliveries_insert_anyone ON public.deliveries;

DROP POLICY IF EXISTS deliveries_select_related_or_admin ON public.deliveries;
CREATE POLICY deliveries_select_related_or_admin
ON public.deliveries
FOR SELECT
TO authenticated
USING (
  livreur_id = auth.uid()
  OR public.is_platform_admin()
  OR EXISTS (
    SELECT 1
    FROM public.orders o
    WHERE o.id = deliveries.order_id
      AND (o.client_id = auth.uid() OR o.vendeur_id = auth.uid())
  )
);

DROP POLICY IF EXISTS deliveries_insert_auth_or_admin ON public.deliveries;
CREATE POLICY deliveries_insert_auth_or_admin
ON public.deliveries
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_platform_admin()
  OR livreur_id IS NULL
  OR livreur_id = auth.uid()
);

CREATE OR REPLACE FUNCTION public.get_delivery_tracking(p_code_suivi text)
RETURNS SETOF public.deliveries
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT *
  FROM public.deliveries
  WHERE code_suivi = upper(btrim(coalesce(p_code_suivi, '')))
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.get_delivery_tracking(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_delivery_tracking(text) TO anon, authenticated;
