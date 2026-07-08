-- Referme un trou de sécurité introduit par 20260707210000_fix_orders_cancel_rls.sql.
--
-- Cette migration avait remplacé les policies UPDATE à garde de colonnes par
-- une policy unique `orders_update_participant` ouverte à client_id / vendeur_id
-- / livreur_id sans AUCUNE contrainte sur les valeurs écrites. Un client
-- authentifié pouvait donc, depuis le navigateur, écrire directement
-- escrow_status='libere' / payment_status='paid' sur sa propre commande —
-- contournant tout le mécanisme d'escrow.
--
-- Vérification du code applicatif (grep exhaustif sur `.from("orders").update`) :
--   - AUCUN chemin client_id n'appelle un update direct sur `orders` (l'annulation
--     passe par fn_cancel_order, SECURITY DEFINER, qui ne dépend pas de cette policy).
--   - AUCUN chemin livreur_id n'appelle un update direct sur `orders` (les livreurs
--     modifient la table `deliveries`, pas `orders`).
--   - Le vendeur ne modifie que `status`, avec les valeurs 'paid' | 'shipped' | 'delivered'
--     (SellerDashboard.jsx `updateOrderStatus`).
--   - L'admin modifie status/livraison_status/escrow_status directement — déjà couvert
--     par la policy `orders_update_admin` (conservée telle quelle, non touchée ici).
--
-- Correctif : retirer client_id/livreur_id du droit d'UPDATE (jamais utilisé),
-- et restaurer une garde de valeurs pour le vendeur — en incluant 'paid', absent
-- de l'ancienne liste, pour ne pas casser le flux vendeur actuel.

DROP POLICY IF EXISTS orders_update_participant ON public.orders;

DROP POLICY IF EXISTS orders_update_seller_guarded ON public.orders;
CREATE POLICY orders_update_seller_guarded
  ON public.orders FOR UPDATE TO authenticated
  USING (
    vendeur_id = auth.uid()
  )
  WITH CHECK (
    vendeur_id = auth.uid()
    AND coalesce(status, 'pending') IN ('pending', 'validee', 'livre', 'annulee', 'shipped', 'delivered', 'paid')
    AND coalesce(livraison_status, 'pending') IN ('pending', 'pending_pickup', 'preparation', 'collecte', 'en_route', 'livre', 'shipped', 'delivered')
    AND coalesce(escrow_status, 'pending') IN ('pending', 'securise', 'libere', 'rembourse')
    AND coalesce(payment_status, 'pending') IN ('pending', 'cod_pending', 'paid', 'failed')
  );

-- `orders_update_admin` (créée par 20260707210000) reste inchangée : l'admin
-- garde un accès UPDATE total, nécessaire pour le panel AdminDashboard.
