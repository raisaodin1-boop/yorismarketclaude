// @vitest-environment node
import { describe, expect, it } from "vitest";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const migration = readFileSync(
  join(root, "supabase/migrations/20260909120000_lock_public_profile_pii.sql"),
  "utf8",
);

const BUYER = "11111111-1111-1111-1111-111111111111";
const SELLER = "22222222-2222-2222-2222-222222222222";
const PEER = "33333333-3333-3333-3333-333333333333";

function psql(sql) {
  const r = spawnSync("sudo", ["-u", "postgres", "psql", "-v", "ON_ERROR_STOP=1", "-d", "yorix_pii_lock"], {
    input: sql,
    encoding: "utf8",
  });
  return r;
}

describe("profile PII lock on PostgreSQL 16", () => {
  it("blocks anon email reads after the migration while catalog view still works", () => {
    spawnSync("sudo", ["-u", "postgres", "dropdb", "--if-exists", "yorix_pii_lock"], { encoding: "utf8" });
    const created = spawnSync("sudo", ["-u", "postgres", "createdb", "yorix_pii_lock"], { encoding: "utf8" });
    expect(created.status, created.stderr).toBe(0);

    const setup = psql(`
      CREATE SCHEMA IF NOT EXISTS auth;
      CREATE OR REPLACE FUNCTION auth.uid() RETURNS uuid
      LANGUAGE sql STABLE AS $$
        SELECT NULLIF(current_setting('request.jwt.claim.sub', true), '')::uuid;
      $$;
      GRANT USAGE ON SCHEMA auth TO PUBLIC;
      GRANT EXECUTE ON FUNCTION auth.uid() TO PUBLIC;

      DO $$ BEGIN
        CREATE ROLE anon NOLOGIN; EXCEPTION WHEN duplicate_object THEN NULL;
      END $$;
      DO $$ BEGIN
        CREATE ROLE authenticated NOLOGIN; EXCEPTION WHEN duplicate_object THEN NULL;
      END $$;

      GRANT USAGE ON SCHEMA public TO anon, authenticated;

      CREATE TABLE public.profiles (
        id uuid PRIMARY KEY,
        email text,
        telephone text,
        nom text,
        role text,
        verifie boolean DEFAULT false,
        note numeric DEFAULT 0,
        nombre_avis integer DEFAULT 0,
        ville text,
        langue text DEFAULT 'fr',
        created_at timestamptz DEFAULT now(),
        actif boolean DEFAULT true,
        deleted_at timestamptz,
        points integer DEFAULT 0
      );
      CREATE TABLE public.users (
        id uuid PRIMARY KEY,
        email text,
        role text
      );
      CREATE TABLE public.conversations (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user1_id uuid,
        user2_id uuid
      );

      CREATE OR REPLACE FUNCTION public.is_platform_admin_viewer()
      RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
        SELECT EXISTS (
          SELECT 1 FROM public.profiles p
          WHERE p.id = auth.uid() AND p.role IN ('admin', 'superadmin', 'admin_partner')
        );
      $$;
      GRANT EXECUTE ON FUNCTION public.is_platform_admin_viewer() TO PUBLIC;

      -- Pre-fix: anon can read emails (mirrors production).
      GRANT SELECT ON public.profiles, public.users, public.conversations TO anon, authenticated;
      INSERT INTO public.profiles (id, email, telephone, nom, role, points)
      VALUES
        ('${BUYER}', 'buyer@example.test', '+237600000001', 'Buyer', 'buyer', 12),
        ('${SELLER}', 'seller@example.test', '+237600000002', 'Seller', 'seller', 99),
        ('${PEER}', 'peer@example.test', '+237600000003', 'Peer', 'buyer', 0);
      INSERT INTO public.users (id, email, role) VALUES ('${SELLER}', 'legacy@example.test', 'seller');
      INSERT INTO public.conversations (user1_id, user2_id) VALUES ('${BUYER}', '${PEER}');
    `);
    expect(setup.status, setup.stderr + setup.stdout).toBe(0);

    const before = psql(`
      SET ROLE anon;
      SELECT COUNT(*) AS n FROM public.profiles WHERE email LIKE '%@example.test';
      SELECT COUNT(*) AS n FROM public.users WHERE email LIKE '%@example.test';
    `);
    expect(before.status, before.stderr + before.stdout).toBe(0);
    expect(before.stdout).toMatch(/3/);

    const applied = psql(migration);
    expect(applied.status, applied.stderr + applied.stdout).toBe(0);

    const afterProfiles = psql(`
      SET ROLE anon;
      SELECT COUNT(*) FROM public.profiles WHERE email IS NOT NULL;
    `);
    const profilesDenied =
      afterProfiles.status !== 0 && /permission denied/i.test(afterProfiles.stderr + afterProfiles.stdout);
    const profilesEmpty = afterProfiles.status === 0 && / 0\n/.test(afterProfiles.stdout);
    expect(profilesDenied || profilesEmpty, afterProfiles.stderr + afterProfiles.stdout).toBe(true);

    const afterCatalog = psql(`
      SET ROLE anon;
      SELECT 'catalog=' || COUNT(*)::text FROM public.public_catalog_profiles;
      SELECT 'catalog_has_email=' || COUNT(*)::text
        FROM information_schema.columns
       WHERE table_schema='public' AND table_name='public_catalog_profiles' AND column_name='email';
    `);
    expect(afterCatalog.status, afterCatalog.stderr + afterCatalog.stdout).toBe(0);
    expect(afterCatalog.stdout).toMatch(/catalog=3/);
    expect(afterCatalog.stdout).toMatch(/catalog_has_email=0/);

    const afterUsers = psql(`
      SET ROLE anon;
      SELECT COUNT(*) FROM public.users WHERE email IS NOT NULL;
    `);
    const usersDenied =
      afterUsers.status !== 0 && /permission denied/i.test(afterUsers.stderr + afterUsers.stdout);
    const usersEmpty = afterUsers.status === 0 && / 0\n/.test(afterUsers.stdout);
    expect(usersDenied || usersEmpty, afterUsers.stderr + afterUsers.stdout).toBe(true);

    const selfRead = psql(`
      BEGIN;
      SET ROLE authenticated;
      SELECT set_config('request.jwt.claim.sub', '${BUYER}', true);
      SELECT email FROM public.profiles WHERE id = '${BUYER}'::uuid;
      SELECT email FROM public.profiles WHERE id = '${SELLER}'::uuid;
      SELECT email FROM public.profiles WHERE id = '${PEER}'::uuid;
      COMMIT;
    `);
    expect(selfRead.status, selfRead.stderr + selfRead.stdout).toBe(0);
    expect(selfRead.stdout).toMatch(/buyer@example.test/);
    expect(selfRead.stdout).toMatch(/peer@example.test/);
    expect(selfRead.stdout).not.toMatch(/seller@example.test/);
  });
});
