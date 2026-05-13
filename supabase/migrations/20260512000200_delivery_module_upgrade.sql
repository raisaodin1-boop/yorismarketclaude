-- ════════════════════════════════════════════════════════════════════════════
-- 🚚 YORIX — UPGRADE PROFESSIONNEL DU MODULE LIVRAISON
-- ════════════════════════════════════════════════════════════════════════════
-- Migration additive, idempotente, NON destructive.
-- Compatible avec l'existant : ne supprime aucune colonne, n'oblige rien.
-- À exécuter dans : Supabase Dashboard → SQL Editor → New Query
-- ════════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────────────
-- 1️⃣ COLONNES ADDITIONNELLES SUR `deliveries`
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.deliveries
  ADD COLUMN IF NOT EXISTS client_id        uuid,
  ADD COLUMN IF NOT EXISTS ville            text,
  ADD COLUMN IF NOT EXISTS montant          numeric(12, 2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS commission_livreur numeric(12, 2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS urgence          text DEFAULT 'normal',
  ADD COLUMN IF NOT EXISTS colis_description text,
  ADD COLUMN IF NOT EXISTS instructions     text,

  -- ÉTAPES DU WORKFLOW (timestamps)
  ADD COLUMN IF NOT EXISTS assigne_at       timestamptz,
  ADD COLUMN IF NOT EXISTS accepte_at       timestamptz,
  ADD COLUMN IF NOT EXISTS refuse_at        timestamptz,
  ADD COLUMN IF NOT EXISTS annule_at        timestamptz,

  -- TRAÇABILITÉ
  ADD COLUMN IF NOT EXISTS refus_motif      text,
  ADD COLUMN IF NOT EXISTS historique_refus jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS notif_admin_sent boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS notif_client_sent boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS notif_livreur_sent boolean DEFAULT false;

-- ─────────────────────────────────────────────────────────────────────────────
-- 2️⃣ INDEX POUR PERFORMANCE
-- ─────────────────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS deliveries_livreur_id_idx     ON public.deliveries(livreur_id);
CREATE INDEX IF NOT EXISTS deliveries_client_id_idx      ON public.deliveries(client_id);
CREATE INDEX IF NOT EXISTS deliveries_statut_idx         ON public.deliveries(statut);
CREATE INDEX IF NOT EXISTS deliveries_commande_at_idx    ON public.deliveries(commande_at DESC);
CREATE INDEX IF NOT EXISTS deliveries_code_suivi_idx     ON public.deliveries(code_suivi);

-- ─────────────────────────────────────────────────────────────────────────────
-- 3️⃣ CONTRAINTE STATUT (ajoutée seulement si pas déjà présente)
-- ─────────────────────────────────────────────────────────────────────────────
-- Statuts officiels du workflow Yorix :
--   commande_recue   → demande créée par le client / commande
--   livreur_assigne  → admin a assigné un livreur, attente d'acceptation
--   accepte          → livreur a accepté la mission
--   refuse           → livreur a refusé (la mission redevient disponible)
--   preparation      → préparation du colis chez le vendeur
--   collecte         → colis collecté par le livreur
--   en_route         → livreur en route vers le client
--   livre            → mission terminée
--   annule           → mission annulée

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'deliveries_statut_check'
  ) THEN
    -- Note : on n'ajoute PAS la contrainte CHECK pour rester souple
    -- et compatible avec d'éventuels statuts personnalisés existants.
    -- Si vous souhaitez la stricte cohérence, décommentez :
    --
    -- ALTER TABLE public.deliveries
    --   ADD CONSTRAINT deliveries_statut_check
    --   CHECK (statut IN (
    --     'commande_recue','livreur_assigne','accepte','refuse',
    --     'preparation','collecte','en_route','livre','annule'
    --   ));
    NULL;
  END IF;
END$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- 4️⃣ VUE POUR LES STATISTIQUES LIVREURS
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE VIEW public.livreur_stats AS
SELECT
  livreur_id,
  COUNT(*)                                                            AS total_missions,
  COUNT(*) FILTER (WHERE statut = 'livre')                            AS missions_livrees,
  COUNT(*) FILTER (WHERE statut = 'refuse' OR refus_motif IS NOT NULL) AS missions_refusees,
  COUNT(*) FILTER (WHERE statut IN ('accepte','preparation','collecte','en_route')) AS missions_en_cours,
  COALESCE(SUM(commission_livreur) FILTER (WHERE statut = 'livre'), 0) AS gains_total,
  COALESCE(SUM(commission_livreur) FILTER (
    WHERE statut = 'livre'
      AND livre_at >= date_trunc('month', now())
  ), 0)                                                                AS gains_mois,
  COALESCE(SUM(commission_livreur) FILTER (
    WHERE statut = 'livre'
      AND livre_at >= now() - interval '7 days'
  ), 0)                                                                AS gains_semaine,
  COALESCE(SUM(commission_livreur) FILTER (
    WHERE statut = 'livre'
      AND livre_at >= date_trunc('day', now())
  ), 0)                                                                AS gains_jour,
  CASE
    WHEN COUNT(*) FILTER (WHERE statut IN ('accepte','refuse','livre','preparation','collecte','en_route')) = 0 THEN 0
    ELSE ROUND(
      100.0 * COUNT(*) FILTER (WHERE statut IN ('accepte','preparation','collecte','en_route','livre'))::numeric
      / NULLIF(COUNT(*) FILTER (WHERE statut IN ('accepte','refuse','livre','preparation','collecte','en_route')), 0),
      1
    )
  END                                                                  AS taux_acceptation,
  MAX(livre_at) AS derniere_livraison
FROM public.deliveries
WHERE livreur_id IS NOT NULL
GROUP BY livreur_id;

-- ─────────────────────────────────────────────────────────────────────────────
-- 5️⃣ TABLE DE LOGS DES ACTIONS LIVRAISON (audit trail)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.delivery_logs (
  id           bigserial PRIMARY KEY,
  delivery_id  uuid REFERENCES public.deliveries(id) ON DELETE CASCADE,
  code_suivi   text,
  acteur_id    uuid,
  acteur_role  text,        -- 'admin' | 'delivery' | 'client' | 'system'
  action       text,        -- 'created' | 'assigned' | 'accepted' | 'refused' | 'status_change' | 'edited' | 'reassigned' | 'cancelled'
  ancien_statut text,
  nouveau_statut text,
  payload      jsonb,
  created_at   timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS delivery_logs_delivery_id_idx ON public.delivery_logs(delivery_id);
CREATE INDEX IF NOT EXISTS delivery_logs_acteur_id_idx   ON public.delivery_logs(acteur_id);
CREATE INDEX IF NOT EXISTS delivery_logs_created_at_idx  ON public.delivery_logs(created_at DESC);

-- ─────────────────────────────────────────────────────────────────────────────
-- 6️⃣ S'ASSURER QUE LA TABLE `notifications` SUPPORTE LE MODULE LIVRAISON
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.notifications (
  id          bigserial PRIMARY KEY,
  user_id     uuid,
  type        text,
  title       text,
  message     text,
  link        text,
  lu          boolean DEFAULT false,
  payload     jsonb,
  created_at  timestamptz DEFAULT now()
);

-- Ajoute les colonnes si la table existait déjà sans elles
ALTER TABLE public.notifications
  ADD COLUMN IF NOT EXISTS title   text,
  ADD COLUMN IF NOT EXISTS message text,
  ADD COLUMN IF NOT EXISTS link    text,
  ADD COLUMN IF NOT EXISTS payload jsonb,
  ADD COLUMN IF NOT EXISTS type    text,
  ADD COLUMN IF NOT EXISTS lu      boolean DEFAULT false;

CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS notifications_lu_idx      ON public.notifications(lu);
CREATE INDEX IF NOT EXISTS notifications_created_at_idx ON public.notifications(created_at DESC);

-- ─────────────────────────────────────────────────────────────────────────────
-- 7️⃣ FONCTION RPC : ACCEPTER UNE LIVRAISON (atomique, anti race-condition)
-- ─────────────────────────────────────────────────────────────────────────────
-- Le livreur appelle cette fonction pour accepter sa mission.
-- Empêche un double accept simultané. Retourne la ligne mise à jour.

CREATE OR REPLACE FUNCTION public.accepter_livraison(p_delivery_id uuid)
RETURNS public.deliveries
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_row public.deliveries;
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Authentification requise';
  END IF;

  UPDATE public.deliveries
  SET
    statut     = 'accepte',
    accepte_at = now()
  WHERE id = p_delivery_id
    AND livreur_id = v_uid
    AND statut IN ('livreur_assigne', 'commande_recue')
  RETURNING * INTO v_row;

  IF v_row.id IS NULL THEN
    RAISE EXCEPTION 'Livraison introuvable, déjà acceptée, ou non assignée à vous';
  END IF;

  INSERT INTO public.delivery_logs
    (delivery_id, code_suivi, acteur_id, acteur_role, action, nouveau_statut)
  VALUES
    (v_row.id, v_row.code_suivi, v_uid, 'delivery', 'accepted', 'accepte');

  RETURN v_row;
END;
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- 8️⃣ FONCTION RPC : REFUSER UNE LIVRAISON
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.refuser_livraison(
  p_delivery_id uuid,
  p_motif       text DEFAULT NULL
)
RETURNS public.deliveries
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_row     public.deliveries;
  v_uid     uuid := auth.uid();
  v_old     public.deliveries;
  v_history jsonb;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Authentification requise';
  END IF;

  SELECT * INTO v_old FROM public.deliveries WHERE id = p_delivery_id;
  IF v_old.id IS NULL THEN
    RAISE EXCEPTION 'Livraison introuvable';
  END IF;
  IF v_old.livreur_id IS DISTINCT FROM v_uid THEN
    RAISE EXCEPTION 'Cette livraison ne vous est pas assignée';
  END IF;

  v_history := COALESCE(v_old.historique_refus, '[]'::jsonb) ||
    jsonb_build_array(jsonb_build_object(
      'livreur_id', v_uid,
      'livreur_nom', v_old.livreur_nom,
      'motif',     COALESCE(p_motif, ''),
      'refuse_at', now()
    ));

  UPDATE public.deliveries
  SET
    statut            = 'commande_recue',
    livreur_id        = NULL,
    livreur_nom       = NULL,
    livreur_tel       = NULL,
    livreur_vehicule  = NULL,
    assigne_at        = NULL,
    accepte_at        = NULL,
    refuse_at         = now(),
    refus_motif       = p_motif,
    historique_refus  = v_history
  WHERE id = p_delivery_id
  RETURNING * INTO v_row;

  INSERT INTO public.delivery_logs
    (delivery_id, code_suivi, acteur_id, acteur_role, action, ancien_statut, nouveau_statut, payload)
  VALUES
    (v_row.id, v_row.code_suivi, v_uid, 'delivery', 'refused',
     v_old.statut, 'commande_recue', jsonb_build_object('motif', p_motif));

  RETURN v_row;
END;
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- 9️⃣ ROW LEVEL SECURITY (RLS)
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.deliveries     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_logs  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications  ENABLE ROW LEVEL SECURITY;

-- ─── deliveries ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS deliveries_select_all      ON public.deliveries;
DROP POLICY IF EXISTS deliveries_select_authed   ON public.deliveries;
DROP POLICY IF EXISTS deliveries_insert_anyone   ON public.deliveries;
DROP POLICY IF EXISTS deliveries_update_admin    ON public.deliveries;
DROP POLICY IF EXISTS deliveries_update_livreur  ON public.deliveries;
DROP POLICY IF EXISTS deliveries_update_self     ON public.deliveries;

-- Lecture : tout le monde peut consulter (pour le tracker public par code de suivi)
CREATE POLICY deliveries_select_all
ON public.deliveries FOR SELECT
USING (true);

-- Insert : tout authentifié (et anon le cas échéant)
CREATE POLICY deliveries_insert_anyone
ON public.deliveries FOR INSERT
WITH CHECK (true);

-- Update : un livreur peut updater UNIQUEMENT ses propres missions
-- (la fonction RPC bypasse via SECURITY DEFINER pour accepter/refuser proprement)
CREATE POLICY deliveries_update_livreur
ON public.deliveries FOR UPDATE
USING (livreur_id = auth.uid())
WITH CHECK (livreur_id = auth.uid());

-- Update : admin / superadmin via profiles.role
CREATE POLICY deliveries_update_admin
ON public.deliveries FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role IN ('admin','superadmin')
  )
)
WITH CHECK (true);

-- ─── delivery_logs ──────────────────────────────────────────────────────────
DROP POLICY IF EXISTS delivery_logs_select_admin  ON public.delivery_logs;
DROP POLICY IF EXISTS delivery_logs_select_self   ON public.delivery_logs;
DROP POLICY IF EXISTS delivery_logs_insert_authed ON public.delivery_logs;

CREATE POLICY delivery_logs_select_admin
ON public.delivery_logs FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role IN ('admin','superadmin')
  )
);

CREATE POLICY delivery_logs_select_self
ON public.delivery_logs FOR SELECT
USING (acteur_id = auth.uid());

CREATE POLICY delivery_logs_insert_authed
ON public.delivery_logs FOR INSERT
WITH CHECK (true);

-- ─── notifications ──────────────────────────────────────────────────────────
DROP POLICY IF EXISTS notifications_select_self   ON public.notifications;
DROP POLICY IF EXISTS notifications_update_self   ON public.notifications;
DROP POLICY IF EXISTS notifications_insert_anyone ON public.notifications;

CREATE POLICY notifications_select_self
ON public.notifications FOR SELECT
USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY notifications_update_self
ON public.notifications FOR UPDATE
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY notifications_insert_anyone
ON public.notifications FOR INSERT
WITH CHECK (true);

-- ─────────────────────────────────────────────────────────────────────────────
-- 🔟 REALTIME
-- ─────────────────────────────────────────────────────────────────────────────
-- Active la publication realtime sur les tables clés (idempotent)
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.deliveries;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.delivery_logs;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
END$$;

-- ════════════════════════════════════════════════════════════════════════════
-- ✅ FIN DE LA MIGRATION
-- ════════════════════════════════════════════════════════════════════════════
-- Pour vérifier que tout est bien en place :
--   SELECT column_name FROM information_schema.columns
--     WHERE table_name='deliveries' ORDER BY ordinal_position;
--   SELECT * FROM public.livreur_stats LIMIT 5;
--   SELECT proname FROM pg_proc WHERE proname IN ('accepter_livraison','refuser_livraison');
-- ════════════════════════════════════════════════════════════════════════════
