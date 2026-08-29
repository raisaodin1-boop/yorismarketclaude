// @vitest-environment node
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const here = fileURLToPath(new URL(".", import.meta.url));
const beforeSql = readFileSync(join(here, "profile-lifecycle-lock-before.sql"), "utf8");
const migrationSql = readFileSync(
  join(here, "../../../supabase/migrations/20260829120000_lock_profile_lifecycle_fields.sql"),
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

describe("profile self-unban (PostgreSQL)", () => {
  it("blocks self-unban after the lock migration and still allows name edits + admin reactivate", () => {
    if (!psqlAvailable()) return;

    const beforeOut = runAsPostgres(beforeSql);
    expect(beforeOut).toMatch(/BUG_REPRODUCED/);

    const afterSql = `
      ${beforeSql.replace("RAISE NOTICE 'BUG_REPRODUCED';", "RAISE NOTICE 'SETUP_DONE';")}
      ${migrationSql}

      DO $after$
      DECLARE
        v_seller uuid := '11111111-1111-1111-1111-111111111111';
        v_admin uuid := 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
        v_actif boolean;
        v_nom text;
        v_denied boolean := false;
        v_res jsonb;
      BEGIN
        -- Setup left the seller unbanned (repro). Re-apply the admin ban
        -- after the lock trigger is installed.
        PERFORM set_config('request.jwt.claim.sub', v_admin::text, false);
        PERFORM public.fn_admin_soft_ban_user(v_seller, 'fraude');
        SELECT actif INTO v_actif FROM public.profiles WHERE id = v_seller;
        IF v_actif IS DISTINCT FROM false THEN
          RAISE EXCEPTION 'expected re-ban before client UPDATE, got actif=%', v_actif;
        END IF;

        PERFORM set_config('request.jwt.claim.sub', v_seller::text, false);
        SET ROLE authenticated;

        BEGIN
          UPDATE public.profiles
          SET actif = true, deactivated_at = NULL, ban_reason = NULL
          WHERE id = v_seller;
        EXCEPTION WHEN insufficient_privilege THEN
          v_denied := true;
        END;
        IF NOT v_denied THEN
          RAISE EXCEPTION 'self-unban still succeeded after lock';
        END IF;

        SELECT actif INTO v_actif FROM public.profiles WHERE id = v_seller;
        IF v_actif IS DISTINCT FROM false THEN
          RAISE EXCEPTION 'expected actif to stay false after denied unban, got %', v_actif;
        END IF;

        UPDATE public.profiles SET nom = 'Seller renamed' WHERE id = v_seller;
        SELECT nom INTO v_nom FROM public.profiles WHERE id = v_seller;
        IF v_nom IS DISTINCT FROM 'Seller renamed' THEN
          RAISE EXCEPTION 'legitimate name update failed after lock';
        END IF;

        RESET ROLE;
        PERFORM set_config('request.jwt.claim.sub', v_admin::text, false);
        v_res := public.fn_admin_reactivate_user(v_seller);
        IF coalesce(v_res->>'ok', '') <> 'true' THEN
          RAISE EXCEPTION 'admin reactivate RPC failed after lock: %', v_res;
        END IF;
        SELECT actif INTO v_actif FROM public.profiles WHERE id = v_seller;
        IF v_actif IS DISTINCT FROM true THEN
          RAISE EXCEPTION 'expected admin reactivate to set actif=true, got %', v_actif;
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
