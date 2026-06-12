-- Enforce that direct message inserts can only target conversations
-- where the authenticated sender is an actual participant.
DO $$
BEGIN
  IF to_regclass('public.messages') IS NOT NULL
     AND to_regclass('public.conversations') IS NOT NULL THEN
    DROP POLICY IF EXISTS messages_insert_sender ON public.messages;

    CREATE POLICY messages_insert_sender
      ON public.messages FOR INSERT TO authenticated
      WITH CHECK (
        sender_id = auth.uid()
        AND EXISTS (
          SELECT 1
          FROM public.conversations c
          WHERE c.id = messages.conversation_id
            AND (c.user1_id = auth.uid() OR c.user2_id = auth.uid())
        )
      );
  END IF;
END $$;
