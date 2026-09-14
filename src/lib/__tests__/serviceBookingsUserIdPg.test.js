// @vitest-environment node
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const here = fileURLToPath(new URL(".", import.meta.url));
const beforeSql = readFileSync(join(here, "service-bookings-user-id-before.sql"), "utf8");
const migrationSql = readFileSync(
  join(here, "../../../supabase/migrations/20260914120000_add_service_bookings_user_id.sql"),
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

describe("service_bookings user_id (PostgreSQL)", () => {
  it("reproduces the missing-field crash then accepts checkout-shaped inserts after the migration", () => {
    if (!psqlAvailable()) return;

    const beforeOut = runAsPostgres(beforeSql);
    expect(beforeOut).toMatch(/BUG_REPRODUCED/);

    const afterSql = `
      ${beforeSql.replace("RAISE NOTICE 'BUG_REPRODUCED';", "RAISE NOTICE 'SETUP_DONE';")}
      ${migrationSql}

      DO $after$
      DECLARE
        v_id uuid;
        v_user uuid;
        v_client uuid;
      BEGIN
        INSERT INTO public.service_bookings (service_id, client_id, client_nom, status)
        VALUES (
          '7e5eeb72-e1fd-4bcd-8bdb-0039e60770ca',
          '11111111-1111-1111-1111-111111111111',
          'probe',
          'reserved'
        )
        RETURNING id, user_id, client_id INTO v_id, v_user, v_client;

        IF v_id IS NULL THEN
          RAISE EXCEPTION 'checkout-shaped insert still failed after adding user_id';
        END IF;
        IF v_user IS DISTINCT FROM '11111111-1111-1111-1111-111111111111'::uuid THEN
          RAISE EXCEPTION 'sync trigger did not copy client_id onto user_id, got %', v_user;
        END IF;
        IF v_client IS DISTINCT FROM '11111111-1111-1111-1111-111111111111'::uuid THEN
          RAISE EXCEPTION 'client_id was rewritten, got %', v_client;
        END IF;

        INSERT INTO public.service_bookings (service_id, user_id, client_nom, status)
        VALUES (
          '003aee99-5860-45f0-b996-ca8ca3f9d69e',
          '22222222-2222-2222-2222-222222222222',
          'probe-user',
          'reserved'
        )
        RETURNING client_id INTO v_client;
        IF v_client IS DISTINCT FROM '22222222-2222-2222-2222-222222222222'::uuid THEN
          RAISE EXCEPTION 'sync trigger did not copy user_id onto client_id, got %', v_client;
        END IF;

        INSERT INTO public.service_bookings (service_id, client_nom, status)
        VALUES (
          '7e5eeb72-e1fd-4bcd-8bdb-0039e60770ca',
          'guest',
          'reserved'
        )
        RETURNING user_id, client_id INTO v_user, v_client;
        IF v_user IS NOT NULL OR v_client IS NOT NULL THEN
          RAISE EXCEPTION 'guest insert should keep both ids null, got user_id=% client_id=%', v_user, v_client;
        END IF;

        RAISE NOTICE 'FIX_VERIFIED';
      END;
      $after$;
    `;

    const afterOut = runAsPostgres(afterSql);
    expect(afterOut).toMatch(/FIX_VERIFIED/);
  });
});
