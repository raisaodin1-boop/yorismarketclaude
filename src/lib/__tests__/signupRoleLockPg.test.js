// @vitest-environment node
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const here = fileURLToPath(new URL(".", import.meta.url));
const beforeSql = readFileSync(join(here, "signup-role-lock-before.sql"), "utf8");
const migrationSql = readFileSync(
  join(here, "../../../supabase/migrations/20260916120000_lock_signup_profile_roles.sql"),
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

describe("signup metadata role escalation (PostgreSQL)", () => {
  it("clamps DEFINER signup to buyer and still allows admin role RPC + seller signup", () => {
    if (!psqlAvailable()) return;

    const beforeOut = runAsPostgres(beforeSql);
    expect(beforeOut).toMatch(/BUG_REPRODUCED/);

    const afterSql = `
      ${beforeSql.replace("RAISE NOTICE 'BUG_REPRODUCED';", "RAISE NOTICE 'SETUP_DONE';")}
      ${migrationSql}

      DO $after$
      DECLARE
        v_attacker uuid := 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
        v_seller uuid := '11111111-1111-1111-1111-111111111111';
        v_admin uuid := 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
        v_role text;
        v_res jsonb;
        v_denied boolean := false;
      BEGIN
        -- Setup inserted the attacker as superadmin *before* the trigger existed.
        DELETE FROM public.profiles WHERE id = v_attacker;
        PERFORM set_config('request.jwt.claim.sub', v_attacker::text, true);
        PERFORM public.handle_new_user_sim(v_attacker, 'superadmin');
        SELECT role INTO v_role FROM public.profiles WHERE id = v_attacker;
        IF v_role IS DISTINCT FROM 'buyer' THEN
          RAISE EXCEPTION 'expected signup clamp to buyer, got %', v_role;
        END IF;
        IF public.is_platform_admin() THEN
          RAISE EXCEPTION 'clamped buyer still counted as platform admin';
        END IF;

        PERFORM set_config('request.jwt.claim.sub', v_seller::text, true);
        SET ROLE authenticated;
        INSERT INTO public.profiles (id, nom, email, role)
        VALUES (v_seller, 'Seller', 'seller@example.com', 'seller');
        RESET ROLE;
        SELECT role INTO v_role FROM public.profiles WHERE id = v_seller;
        IF v_role IS DISTINCT FROM 'seller' THEN
          RAISE EXCEPTION 'legitimate seller signup failed, got %', v_role;
        END IF;

        -- First admin cannot be created through the trigger; same as a one-time SQL grant.
        INSERT INTO public.profiles (id, nom, email, role)
        VALUES (v_admin, 'Admin', 'admin@example.com', 'buyer');
        PERFORM set_config('session_replication_role', 'replica', true);
        UPDATE public.profiles SET role = 'admin' WHERE id = v_admin;
        PERFORM set_config('session_replication_role', 'origin', true);

        PERFORM set_config('request.jwt.claim.sub', v_admin::text, true);
        v_res := public.fn_admin_update_user_role(v_seller, 'provider');
        IF coalesce(v_res->>'role', '') <> 'provider' THEN
          RAISE EXCEPTION 'admin role RPC failed: %', v_res;
        END IF;
        SELECT role INTO v_role FROM public.profiles WHERE id = v_seller;
        IF v_role IS DISTINCT FROM 'provider' THEN
          RAISE EXCEPTION 'expected admin RPC to set provider, got %', v_role;
        END IF;

        PERFORM set_config('request.jwt.claim.sub', v_seller::text, true);
        SET ROLE authenticated;
        BEGIN
          UPDATE public.profiles SET role = 'superadmin' WHERE id = v_seller;
        EXCEPTION WHEN insufficient_privilege THEN
          v_denied := true;
        END;
        RESET ROLE;
        IF NOT v_denied THEN
          RAISE EXCEPTION 'self-escalation UPDATE still succeeded after lock';
        END IF;
        SELECT role INTO v_role FROM public.profiles WHERE id = v_seller;
        IF v_role IS DISTINCT FROM 'provider' THEN
          RAISE EXCEPTION 'expected role to stay provider after denied escalate, got %', v_role;
        END IF;

        RAISE NOTICE 'FIX_VERIFIED';
      END;
      $after$;
    `;

    const afterOut = runAsPostgres(afterSql);
    expect(afterOut).toMatch(/FIX_VERIFIED/);
  });
});
