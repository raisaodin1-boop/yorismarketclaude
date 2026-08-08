// @vitest-environment node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const migrationPath = fileURLToPath(
  new URL(
    "../../../supabase/migrations/20260808120000_lock_orders_order_group_membership.sql",
    import.meta.url,
  ),
);
const migration = readFileSync(migrationPath, "utf8");

describe("order group membership lock migration", () => {
  it("rejects client inserts that attach rows to a checkout order_group_id", () => {
    expect(migration).toMatch(
      /CREATE POLICY orders_insert_buyer_pending_only[\s\S]*FOR INSERT TO authenticated[\s\S]*order_group_id IS NULL/,
    );
    expect(migration).toContain("client_id = auth.uid()");
    expect(migration).toContain("coalesce(payment_status, 'pending') IN ('pending', 'cod_pending')");
  });

  it("freezes order_group_id on update for non-trusted writers", () => {
    expect(migration).toContain("fn_guard_order_group_id");
    expect(migration).toContain("trg_guard_order_group_id");
    expect(migration).toContain("NEW.order_group_id IS DISTINCT FROM OLD.order_group_id");
    expect(migration).toContain("public.is_trusted_security_writer()");
    expect(migration).toContain("order_group_id is immutable after insert");
  });
});
