// @vitest-environment node
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const here = fileURLToPath(new URL(".", import.meta.url));
const beforeSql = readFileSync(join(here, "wallet-balance-lock-before.sql"), "utf8");
const migrationSql = readFileSync(
  join(here, "../../../supabase/migrations/20260815120000_lock_wallet_self_insert_balances.sql"),
  "utf8",
);

function psqlAvailable() {
  try {
    const r = spawnSync("psql", ["--version"], { encoding: "utf8" });
    return r.status === 0;
  } catch {
    return false;
  }
}

function runAsPostgres(sql) {
  const r = spawnSync(
    "sudo",
    ["-u", "postgres", "psql", "-v", "ON_ERROR_STOP=1", "-f", "-"],
    { encoding: "utf8", input: sql },
  );
  const out = `${r.stdout || ""}\n${r.stderr || ""}`;
  if (r.status !== 0) {
    throw new Error(out || `psql exited ${r.status}`);
  }
  return out;
}

describe("wallet self-insert mint (PostgreSQL)", () => {
  it("blocks inflated inserts after the lock migration and still allows zero wallets + DEFINER debit", () => {
    if (!psqlAvailable()) return;

    const beforeOut = runAsPostgres(beforeSql);
    expect(beforeOut).toMatch(/BUG_REPRODUCED/);

    const afterSql = `
      ${beforeSql.replace("RAISE NOTICE 'BUG_REPRODUCED';", "RAISE NOTICE 'SETUP_DONE';")}
      ${migrationSql}

      DO $after$
      DECLARE
        v_uid uuid := '22222222-2222-2222-2222-222222222222';
        v_solde numeric;
        v_id uuid;
        v_tx uuid;
        v_denied boolean := false;
      BEGIN
        DELETE FROM public.wallets;
        DELETE FROM public.wallet_transactions;
        DELETE FROM public.notifications;

        PERFORM set_config('request.jwt.claim.sub', v_uid::text, false);
        SET ROLE authenticated;

        BEGIN
          INSERT INTO public.wallets (user_id, solde, total_gagne, devise)
          VALUES (v_uid, 500000, 500000, 'FCFA');
        EXCEPTION WHEN insufficient_privilege OR check_violation THEN
          v_denied := true;
        END;
        IF NOT v_denied THEN
          RAISE EXCEPTION 'inflated insert still succeeded after lock';
        END IF;

        INSERT INTO public.wallets (user_id, solde, total_gagne, devise)
        VALUES (v_uid, 0, 0, 'FCFA');
        SELECT solde INTO v_solde FROM public.wallets WHERE user_id = v_uid;
        IF v_solde <> 0 THEN
          RAISE EXCEPTION 'zero insert stored %', v_solde;
        END IF;

        RESET ROLE;
        -- service-role / DEFINER credit (simulates escrow payout), then client withdrawal
        UPDATE public.wallets SET solde = 8000, total_gagne = 8000 WHERE user_id = v_uid;
        SET ROLE authenticated;
        v_tx := public.fn_request_wallet_withdrawal(5000, 'mtn_momo', '670000000');
        IF v_tx IS NULL THEN
          RAISE EXCEPTION 'legitimate withdrawal failed after lock';
        END IF;
        SELECT solde INTO v_solde FROM public.wallets WHERE user_id = v_uid;
        IF v_solde <> 3000 THEN
          RAISE EXCEPTION 'expected remaining 3000 after withdrawal, got %', v_solde;
        END IF;

        RESET ROLE;
        PERFORM set_config('request.jwt.claim.sub', v_uid::text, false);
        SET ROLE authenticated;
        v_id := public.fn_ensure_wallet();
        IF v_id IS NULL THEN
          RAISE EXCEPTION 'fn_ensure_wallet returned null';
        END IF;

        RESET ROLE;
        RAISE NOTICE 'FIX_VERIFIED';
      END;
      $after$;
    `;

    const afterOut = runAsPostgres(afterSql);
    expect(afterOut).toMatch(/FIX_VERIFIED/);
  });
});
