// @vitest-environment node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const migrationPath = fileURLToPath(
  new URL(
    "../../../supabase/migrations/20260815120000_lock_wallet_self_insert_balances.sql",
    import.meta.url,
  ),
);
const migration = readFileSync(migrationPath, "utf8");

describe("wallet self-insert balance lock migration", () => {
  it("rejects non-zero client inserts via RLS", () => {
    expect(migration).toContain("DROP POLICY IF EXISTS wallets_insert_owner");
    expect(migration).toMatch(
      /CREATE POLICY wallets_insert_owner[\s\S]*user_id = auth\.uid\(\)[\s\S]*coalesce\(solde, 0\) = 0[\s\S]*coalesce\(total_gagne, 0\) = 0/,
    );
  });

  it("installs a BEFORE INSERT OR UPDATE trigger for authenticated writers", () => {
    expect(migration).toContain("fn_guard_wallet_balances");
    expect(migration).toContain("trg_guard_wallet_balances");
    expect(migration).toContain("BEFORE INSERT OR UPDATE ON public.wallets");
    expect(migration).toContain("SECURITY INVOKER");
    expect(migration).toContain("current_user <> 'authenticated'");
    expect(migration).toContain("Wallet balances can only be created at zero");
    expect(migration).toContain("Wallet balances can only be changed by the platform");
  });

  it("enforces one wallet per user and a zero-balance ensure RPC", () => {
    expect(migration).toContain("CREATE UNIQUE INDEX IF NOT EXISTS wallets_user_id_key");
    expect(migration).toContain("fn_ensure_wallet");
    expect(migration).toContain("ON CONFLICT (user_id) DO NOTHING");
    expect(migration).toContain("GRANT EXECUTE ON FUNCTION public.fn_ensure_wallet() TO authenticated");
  });
});
