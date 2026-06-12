import { describe, expect, it } from "vitest";
import migrationSql from "../../../supabase/migrations/20260612000100_fix_messages_insert_participant_rls.sql?raw";

describe("messages insert RLS migration", () => {
  it("requires the sender to participate in the target conversation", () => {
    const normalized = migrationSql.replace(/\s+/g, " ").toLowerCase();

    expect(normalized).toContain("drop policy if exists messages_insert_sender on public.messages");
    expect(normalized).toContain("create policy messages_insert_sender");
    expect(normalized).toContain("sender_id = auth.uid()");
    expect(normalized).toContain("from public.conversations c");
    expect(normalized).toContain("c.id = messages.conversation_id");
    expect(normalized).toContain("c.user1_id = auth.uid() or c.user2_id = auth.uid()");
    expect(normalized.indexOf("sender_id = auth.uid()")).toBeLessThan(
      normalized.indexOf("from public.conversations c"),
    );
  });
});
