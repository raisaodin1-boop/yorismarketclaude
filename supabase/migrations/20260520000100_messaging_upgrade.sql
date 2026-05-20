-- Messagerie Yorix : annonces admin, pièces jointes, notifications pair-à-pair
-- Idempotent — safe à rejouer.

-- Prérequis (certains projets n'ont que is_admin() JWT)
CREATE OR REPLACE FUNCTION public.is_platform_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role IN ('admin', 'superadmin')
  );
$$;

-- Colonnes optionnelles sur messages (photos / liens officiels)
ALTER TABLE public.messages
  ADD COLUMN IF NOT EXISTS image_url text,
  ADD COLUMN IF NOT EXISTS link_url text;

-- Annonces générales (historique admin + fil « Yorix Équipe »)
CREATE TABLE IF NOT EXISTS public.yorix_broadcasts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES auth.users (id) ON DELETE SET NULL,
  title text,
  content text NOT NULL,
  image_url text,
  link_url text,
  recipient_count int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS yorix_broadcasts_created_idx
  ON public.yorix_broadcasts (created_at DESC);

CREATE TABLE IF NOT EXISTS public.yorix_broadcast_reads (
  broadcast_id uuid NOT NULL REFERENCES public.yorix_broadcasts (id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  read_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (broadcast_id, user_id)
);

ALTER TABLE public.yorix_broadcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.yorix_broadcast_reads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS yorix_broadcasts_select_authenticated ON public.yorix_broadcasts;
CREATE POLICY yorix_broadcasts_select_authenticated
  ON public.yorix_broadcasts FOR SELECT TO authenticated
  USING (true);

DROP POLICY IF EXISTS yorix_broadcasts_insert_admin ON public.yorix_broadcasts;
CREATE POLICY yorix_broadcasts_insert_admin
  ON public.yorix_broadcasts FOR INSERT TO authenticated
  WITH CHECK (public.is_platform_admin());

DROP POLICY IF EXISTS yorix_broadcast_reads_own ON public.yorix_broadcast_reads;
CREATE POLICY yorix_broadcast_reads_own
  ON public.yorix_broadcast_reads FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- RPC : message général à tous les profils + notifications push (trigger existant)
CREATE OR REPLACE FUNCTION public.fn_admin_broadcast_to_all(
  p_title text,
  p_content text,
  p_image_url text DEFAULT NULL,
  p_link_url text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_broadcast_id uuid;
  v_count int := 0;
  v_row record;
  v_title text;
BEGIN
  IF NOT public.is_platform_admin() THEN
    RAISE EXCEPTION 'Accès refusé — administrateur requis';
  END IF;

  IF p_content IS NULL OR length(trim(p_content)) < 2 THEN
    RAISE EXCEPTION 'Le message doit contenir au moins 2 caractères';
  END IF;

  v_title := coalesce(nullif(trim(p_title), ''), '📣 Annonce Yorix');

  INSERT INTO public.yorix_broadcasts (admin_id, title, content, image_url, link_url)
  VALUES (
    auth.uid(),
    v_title,
    trim(p_content),
    nullif(trim(p_image_url), ''),
    nullif(trim(p_link_url), '')
  )
  RETURNING id INTO v_broadcast_id;

  FOR v_row IN
    SELECT p.id FROM public.profiles p WHERE p.id IS NOT NULL
  LOOP
    INSERT INTO public.notifications (user_id, type, title, message, link, lu, payload)
    VALUES (
      v_row.id,
      'yorix_broadcast',
      v_title,
      left(trim(p_content), 1200),
      nullif(trim(p_link_url), ''),
      false,
      jsonb_build_object(
        'broadcast_id', v_broadcast_id,
        'image_url', nullif(trim(p_image_url), '')
      )
    );
    v_count := v_count + 1;
  END LOOP;

  UPDATE public.yorix_broadcasts
  SET recipient_count = v_count
  WHERE id = v_broadcast_id;

  RETURN jsonb_build_object(
    'broadcast_id', v_broadcast_id,
    'recipients', v_count,
    'title', v_title
  );
END;
$$;

REVOKE ALL ON FUNCTION public.fn_admin_broadcast_to_all(text, text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.fn_admin_broadcast_to_all(text, text, text, text) TO authenticated;

-- Met à jour last_message_at sur la conversation
CREATE OR REPLACE FUNCTION public.fn_messages_touch_conversation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.conversation_id IS NOT NULL
     AND to_regclass('public.conversations') IS NOT NULL THEN
    UPDATE public.conversations
    SET last_message_at = coalesce(NEW.created_at, now())
    WHERE id = NEW.conversation_id;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_messages_touch_conversation ON public.messages;
CREATE TRIGGER trg_messages_touch_conversation
  AFTER INSERT ON public.messages
  FOR EACH ROW EXECUTE FUNCTION public.fn_messages_touch_conversation();

-- Notification in-app pour le destinataire (hors expéditeur)
CREATE OR REPLACE FUNCTION public.fn_notify_peer_chat_message()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_conv record;
  v_recipient uuid;
  v_preview text;
  v_sender_name text;
BEGIN
  IF to_regclass('public.conversations') IS NULL
     OR to_regclass('public.notifications') IS NULL THEN
    RETURN NEW;
  END IF;

  SELECT * INTO v_conv
  FROM public.conversations c
  WHERE c.id = NEW.conversation_id;

  IF NOT FOUND THEN
    RETURN NEW;
  END IF;

  IF v_conv.user1_id = NEW.sender_id THEN
    v_recipient := v_conv.user2_id;
  ELSIF v_conv.user2_id = NEW.sender_id THEN
    v_recipient := v_conv.user1_id;
  ELSE
    RETURN NEW;
  END IF;

  IF v_recipient IS NULL OR v_recipient = NEW.sender_id THEN
    RETURN NEW;
  END IF;

  SELECT coalesce(p.nom, 'Un membre Yorix') INTO v_sender_name
  FROM public.profiles p
  WHERE p.id = NEW.sender_id;

  v_preview := left(
    coalesce(NEW.content, CASE WHEN NEW.image_url IS NOT NULL THEN '📷 Photo' ELSE 'Nouveau message' END),
    180
  );

  INSERT INTO public.notifications (user_id, type, title, message, link, lu, payload)
  VALUES (
    v_recipient,
    'new_message',
    '💬 ' || v_sender_name,
    v_preview,
    '/dashboard?tab=messages',
    false,
    jsonb_build_object('conversation_id', v_conv.id, 'sender_id', NEW.sender_id)
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_peer_chat_message ON public.messages;
CREATE TRIGGER trg_notify_peer_chat_message
  AFTER INSERT ON public.messages
  FOR EACH ROW EXECUTE FUNCTION public.fn_notify_peer_chat_message();

-- Realtime broadcasts (optionnel)
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.yorix_broadcasts;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
END $$;
