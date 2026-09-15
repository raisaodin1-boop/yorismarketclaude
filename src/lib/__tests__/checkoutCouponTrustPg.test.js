// @vitest-environment node
import { describe, expect, it } from "vitest";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const migration = readFileSync(
  join(root, "supabase/migrations/20260915120000_lock_checkout_intent_coupon_writes.sql"),
  "utf8",
);

const BUYER = "11111111-1111-1111-1111-111111111111";
const INTENT = "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb";
const DB = "yorix_checkout_coupon_lock";

function psql(sql) {
  return spawnSync("sudo", ["-u", "postgres", "psql", "-v", "ON_ERROR_STOP=1", "-d", DB], {
    input: sql,
    encoding: "utf8",
  });
}

describe("checkout intent coupon write lock on PostgreSQL 16", () => {
  it("blocks leftover anon INSERT of a forged coupon_discount", () => {
    spawnSync("sudo", ["-u", "postgres", "dropdb", "--if-exists", DB], { encoding: "utf8" });
    const created = spawnSync("sudo", ["-u", "postgres", "createdb", DB], { encoding: "utf8" });
    expect(created.status, created.stderr).toBe(0);

    const setup = psql(`
      CREATE SCHEMA IF NOT EXISTS auth;
      CREATE OR REPLACE FUNCTION auth.uid() RETURNS uuid
      LANGUAGE sql STABLE AS $$
        SELECT NULLIF(current_setting('request.jwt.claim.sub', true), '')::uuid;
      $$;
      GRANT USAGE ON SCHEMA auth TO PUBLIC;
      GRANT EXECUTE ON FUNCTION auth.uid() TO PUBLIC;

      DO $$ BEGIN CREATE ROLE anon NOLOGIN; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
      DO $$ BEGIN CREATE ROLE authenticated NOLOGIN; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
      GRANT USAGE ON SCHEMA public TO anon, authenticated;

      CREATE TABLE public.profiles (
        id uuid PRIMARY KEY,
        role text
      );
      CREATE OR REPLACE FUNCTION public.is_platform_admin()
      RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
        SELECT EXISTS (
          SELECT 1 FROM public.profiles p
          WHERE p.id = auth.uid() AND p.role IN ('admin', 'superadmin')
        );
      $$;
      GRANT EXECUTE ON FUNCTION public.is_platform_admin() TO PUBLIC;

      CREATE TABLE public.checkout_intents (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        customer_id uuid,
        payload jsonb NOT NULL DEFAULT '{}'::jsonb,
        total numeric(14,2) NOT NULL DEFAULT 0,
        subtotal numeric(14,2) NOT NULL DEFAULT 0,
        coupon_code text,
        coupon_discount numeric(14,2) NOT NULL DEFAULT 0,
        status text NOT NULL DEFAULT 'ready'
      );

      ALTER TABLE public.checkout_intents ENABLE ROW LEVEL SECURITY;
      GRANT SELECT, INSERT, UPDATE ON public.checkout_intents TO anon, authenticated;
      CREATE POLICY leftover_anon_all ON public.checkout_intents
        FOR ALL TO anon USING (true) WITH CHECK (true);
      CREATE POLICY leftover_auth_all ON public.checkout_intents
        FOR ALL TO authenticated USING (true) WITH CHECK (true);

      INSERT INTO public.profiles (id, role) VALUES ('${BUYER}', 'buyer');
      INSERT INTO public.checkout_intents (id, customer_id, payload, total, subtotal)
      VALUES ('${INTENT}', '${BUYER}', '{"items":[]}'::jsonb, 50000, 50000);
    `);
    expect(setup.status, setup.stderr + setup.stdout).toBe(0);

    const before = psql(`
      SET ROLE anon;
      INSERT INTO public.checkout_intents (payload, total, subtotal, coupon_code, coupon_discount)
      VALUES ('{"items":[{"kind":"product"}]}'::jsonb, 0, 60000, 'FORGED', 60000)
      RETURNING 'forged_insert=' || coupon_discount::text;
    `);
    expect(before.status, before.stderr + before.stdout).toBe(0);
    expect(before.stdout).toMatch(/forged_insert=60000/);

    const applied = psql(migration);
    expect(applied.status, applied.stderr + applied.stdout).toBe(0);

    const afterInsert = psql(`
      SET ROLE anon;
      INSERT INTO public.checkout_intents (payload, total, subtotal, coupon_code, coupon_discount)
      VALUES ('{"items":[{"kind":"product"}]}'::jsonb, 0, 60000, 'FORGED', 60000);
    `);
    const insertDenied =
      afterInsert.status !== 0 && /permission denied/i.test(afterInsert.stderr + afterInsert.stdout);
    expect(insertDenied, afterInsert.stderr + afterInsert.stdout).toBe(true);

    const afterPatch = psql(`
      SET ROLE anon;
      UPDATE public.checkout_intents SET coupon_discount = 49900, total = 100 WHERE id = '${INTENT}'::uuid;
      SELECT 'patched=' || coupon_discount::text FROM public.checkout_intents WHERE id = '${INTENT}'::uuid;
    `);
    const patchDenied =
      afterPatch.status !== 0 && /permission denied/i.test(afterPatch.stderr + afterPatch.stdout);
    expect(patchDenied, afterPatch.stderr + afterPatch.stdout).toBe(true);

    const buyerRead = psql(`
      BEGIN;
      SELECT set_config('request.jwt.claim.sub', '${BUYER}', true);
      SET ROLE authenticated;
      SELECT 'buyer_total=' || total::text FROM public.checkout_intents WHERE id = '${INTENT}'::uuid;
      COMMIT;
    `);
    expect(buyerRead.status, buyerRead.stderr + buyerRead.stdout).toBe(0);
    expect(buyerRead.stdout).toMatch(/buyer_total=50000/);
  });
});
