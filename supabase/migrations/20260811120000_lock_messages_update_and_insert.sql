-- Harden messaging RLS against content forgery and cross-conversation spam.
--
-- Bug 1 — recipient UPDATE forge:
--   messages_update_recipient_mark_read (20260533000100) lets any conversation
--   participant UPDATE rows they did not send, as long as NEW.is_read IS TRUE.
--   WITH CHECK does not freeze content / sender_id / conversation_id / media, so
--   a recipient can rewrite a counterparty's message (dispute evidence, escrow
--   guidance, phishing) via a direct REST PATCH.
--
-- Bug 2 — INSERT without membership:
--   messages_insert_sender only checks sender_id = auth.uid(), so knowing a
--   conversation UUID is enough to inject messages into someone else's chat.
--
-- Bug 3 — conversation participant swap:
--   conversations UPDATE policies only require the caller remain on the NEW row,
--   so a participant can replace the other user and expose chat history.
--
-- Trusted writers (platform admins, service_role / SECURITY DEFINER RPCs such as
-- mark_conversation_messages_read and insert_chat_message_safe) stay open via
-- is_platform_admin() / current_user <> 'authenticated'.

-- ─── 1) Drop the overly broad recipient mark-read UPDATE policy ─────────────
-- Mark-read goes exclusively through mark_conversation_messages_read (SECURITY DEFINER).
DROP POLICY IF EXISTS messages_update_recipient_mark_read ON public.messages;
DROP POLICY IF EXISTS messages_update_recipient_is_read_only ON public.messages;

-- ─── 2) Require conversation membership on INSERT ───────────────────────────
DROP POLICY IF EXISTS messages_insert_sender ON public.messages;
CREATE POLICY messages_insert_sender
  ON public.messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    sender_id = auth.uid()
    AND EXISTS (
      SELECT 1
      FROM public.conversations c
      WHERE c.id = conversation_id
        AND (c.user1_id = auth.uid() OR c.user2_id = auth.uid())
    )
  );

-- ─── 3) Freeze message body / authorship / conversation for clients ─────────
CREATE OR REPLACE FUNCTION public.fn_guard_message_sensitive_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF current_user <> 'authenticated' OR public.is_platform_admin() THEN
    RETURN NEW;
  END IF;

  IF NEW.conversation_id IS DISTINCT FROM OLD.conversation_id
    OR NEW.sender_id IS DISTINCT FROM OLD.sender_id
    OR NEW.content IS DISTINCT FROM OLD.content
    OR NEW.image_url IS DISTINCT FROM OLD.image_url
    OR NEW.link_url IS DISTINCT FROM OLD.link_url
    OR NEW.created_at IS DISTINCT FROM OLD.created_at
  THEN
    RAISE EXCEPTION 'Only admins may change message content, media, or authorship'
      USING ERRCODE = '42501';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_guard_message_sensitive_update ON public.messages;
CREATE TRIGGER trg_guard_message_sensitive_update
  BEFORE UPDATE ON public.messages
  FOR EACH ROW
  EXECUTE FUNCTION public.fn_guard_message_sensitive_update();

COMMENT ON FUNCTION public.fn_guard_message_sensitive_update() IS
  'Blocks authenticated clients from forging message content, media, authorship, or conversation_id; is_read mark-read remains allowed.';

-- ─── 4) Freeze conversation participants after create ───────────────────────
CREATE OR REPLACE FUNCTION public.fn_guard_conversation_participants_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF current_user <> 'authenticated' OR public.is_platform_admin() THEN
    RETURN NEW;
  END IF;

  IF NEW.user1_id IS DISTINCT FROM OLD.user1_id
    OR NEW.user2_id IS DISTINCT FROM OLD.user2_id
  THEN
    RAISE EXCEPTION 'Only admins may change conversation participants'
      USING ERRCODE = '42501';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_guard_conversation_participants_update ON public.conversations;
CREATE TRIGGER trg_guard_conversation_participants_update
  BEFORE UPDATE ON public.conversations
  FOR EACH ROW
  EXECUTE FUNCTION public.fn_guard_conversation_participants_update();

COMMENT ON FUNCTION public.fn_guard_conversation_participants_update() IS
  'Blocks authenticated clients from swapping conversation participants (history exposure).';

NOTIFY pgrst, 'reload schema';
