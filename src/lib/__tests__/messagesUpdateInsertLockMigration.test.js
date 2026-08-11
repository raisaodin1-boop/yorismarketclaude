import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// @vitest-environment node

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const migrationPath = join(
  root,
  "supabase/migrations/20260811120000_lock_messages_update_and_insert.sql",
);

describe("messages update/insert RLS hardening migration", () => {
  const migration = readFileSync(migrationPath, "utf8");

  it("drops the recipient mark-read UPDATE policy that allowed content forgery", () => {
    expect(migration).toContain("DROP POLICY IF EXISTS messages_update_recipient_mark_read");
    expect(migration).not.toMatch(
      /CREATE POLICY messages_update_recipient_mark_read[\s\S]*WITH CHECK \(\s*is_read IS TRUE/,
    );
  });

  it("requires conversation membership on messages INSERT", () => {
    expect(migration).toContain("DROP POLICY IF EXISTS messages_insert_sender");
    expect(migration).toContain("CREATE POLICY messages_insert_sender");
    expect(migration).toContain("sender_id = auth.uid()");
    expect(migration).toMatch(
      /CREATE POLICY messages_insert_sender[\s\S]*EXISTS \([\s\S]*FROM public\.conversations c[\s\S]*c\.id = conversation_id/,
    );
  });

  it("installs a BEFORE UPDATE trigger freezing message body and authorship", () => {
    expect(migration).toContain("fn_guard_message_sensitive_update");
    expect(migration).toContain("trg_guard_message_sensitive_update");
    expect(migration).toContain("BEFORE UPDATE ON public.messages");
    expect(migration).toContain("current_user <> 'authenticated'");
    expect(migration).toContain("public.is_platform_admin()");
    expect(migration).toContain("NEW.content IS DISTINCT FROM OLD.content");
    expect(migration).toContain("NEW.sender_id IS DISTINCT FROM OLD.sender_id");
    expect(migration).toContain("NEW.conversation_id IS DISTINCT FROM OLD.conversation_id");
    expect(migration).toContain("NEW.image_url IS DISTINCT FROM OLD.image_url");
    expect(migration).toContain("NEW.link_url IS DISTINCT FROM OLD.link_url");
  });

  it("freezes conversation participants after create", () => {
    expect(migration).toContain("fn_guard_conversation_participants_update");
    expect(migration).toContain("trg_guard_conversation_participants_update");
    expect(migration).toContain("BEFORE UPDATE ON public.conversations");
    expect(migration).toContain("NEW.user1_id IS DISTINCT FROM OLD.user1_id");
    expect(migration).toContain("NEW.user2_id IS DISTINCT FROM OLD.user2_id");
  });
});
