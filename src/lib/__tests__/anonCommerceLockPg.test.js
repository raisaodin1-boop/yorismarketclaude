// @vitest-environment node
import { describe, expect, it } from "vitest";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const migration = readFileSync(
  join(root, "supabase/migrations/20260910120000_lock_anon_checkout_delivery_pii.sql"),
  "utf8",
);

const BUYER = "11111111-1111-1111-1111-111111111111";
const SELLER = "22222222-2222-2222-2222-222222222222";
const ORDER = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";
const INTENT = "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb";
const ITEM = "cccccccc-cccc-cccc-cccc-cccccccccccc";

function psql(sql) {
  return spawnSync("sudo", ["-u", "postgres", "psql", "-v", "ON_ERROR_STOP=1", "-d", "yorix_anon_commerce_lock"], {
    input: sql,
    encoding: "utf8",
  });
}

describe("anon commerce lock on PostgreSQL 16", () => {
  it("blocks anon PII reads and checkout total PATCH while tracking RPC still works", () => {
    spawnSync("sudo", ["-u", "postgres", "dropdb", "--if-exists", "yorix_anon_commerce_lock"], { encoding: "utf8" });
    const created = spawnSync("sudo", ["-u", "postgres", "createdb", "yorix_anon_commerce_lock"], { encoding: "utf8" });
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

      CREATE TABLE public.orders (
        id uuid PRIMARY KEY,
        client_id uuid,
        vendeur_id uuid,
        livreur_id uuid
      );
      CREATE TABLE public.checkout_intents (
        id uuid PRIMARY KEY,
        customer_id uuid,
        payload jsonb NOT NULL DEFAULT '{}'::jsonb,
        total numeric(14,2) NOT NULL DEFAULT 0,
        status text NOT NULL DEFAULT 'ready'
      );
      CREATE TABLE public.order_items (
        id uuid PRIMARY KEY,
        order_id uuid NOT NULL,
        quantity int NOT NULL DEFAULT 1,
        unit_price numeric(14,2) NOT NULL DEFAULT 0
      );
      CREATE TABLE public.deliveries (
        id serial PRIMARY KEY,
        code_suivi text,
        statut text,
        client_id uuid,
        livreur_id uuid,
        order_id uuid,
        client_nom text,
        client_tel text,
        adresse_collecte text,
        adresse_livraison text,
        livreur_nom text,
        livreur_tel text,
        livreur_vehicule text,
        livreur_note numeric,
        distance_km numeric,
        temps_estime_min int,
        commission_livreur numeric,
        montant numeric,
        commande_at timestamptz,
        assigne_at timestamptz,
        accepte_at timestamptz,
        preparation_at timestamptz,
        collecte_at timestamptz,
        en_route_at timestamptz,
        livre_at timestamptz
      );
      CREATE TABLE public.business_requests (
        id serial PRIMARY KEY,
        entreprise text,
        contact text,
        email text,
        telephone text,
        besoins text,
        status text DEFAULT 'new',
        created_at timestamptz DEFAULT now()
      );

      -- Pre-fix: mirrors production leftover anon grants.
      GRANT SELECT, INSERT, UPDATE ON public.checkout_intents, public.order_items, public.deliveries, public.business_requests TO anon, authenticated;
      GRANT SELECT ON public.orders TO authenticated;
      GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

      INSERT INTO public.profiles (id, role) VALUES ('${BUYER}', 'buyer'), ('${SELLER}', 'seller');
      INSERT INTO public.orders (id, client_id, vendeur_id) VALUES ('${ORDER}', '${BUYER}', '${SELLER}');
      INSERT INTO public.checkout_intents (id, customer_id, payload, total)
      VALUES (
        '${INTENT}',
        '${BUYER}',
        '{"customer":{"nom":"Ada","email":"ada@example.test","telephone":"690000000"}}'::jsonb,
        50000
      );
      INSERT INTO public.order_items (id, order_id, quantity, unit_price)
      VALUES ('${ITEM}', '${ORDER}', 2, 25000);
      INSERT INTO public.deliveries (
        code_suivi, statut, client_id, client_nom, client_tel,
        adresse_livraison, adresse_collecte, livreur_nom, livreur_tel, commission_livreur
      ) VALUES (
        'YX-LOCK1', 'en_route', '${BUYER}', 'Ada', '690000000',
        'Rue de la Joie', 'Boutique Test', 'Moto Jean', '691111111', 1500
      );
      INSERT INTO public.business_requests (entreprise, contact, email, telephone)
      VALUES ('Acme', 'Pat', 'pat@example.test', '692222222');
    `);
    expect(setup.status, setup.stderr + setup.stdout).toBe(0);

    const before = psql(`
      SET ROLE anon;
      SELECT 'deliveries=' || COUNT(*)::text FROM public.deliveries WHERE client_tel IS NOT NULL;
      SELECT 'intents=' || COUNT(*)::text FROM public.checkout_intents WHERE payload ? 'customer';
      SELECT 'items=' || COUNT(*)::text FROM public.order_items;
      SELECT 'leads=' || COUNT(*)::text FROM public.business_requests WHERE email LIKE '%@example.test';
      UPDATE public.checkout_intents SET total = 1 WHERE id = '${INTENT}'::uuid;
      SELECT 'patched_total=' || total::text FROM public.checkout_intents WHERE id = '${INTENT}'::uuid;
    `);
    expect(before.status, before.stderr + before.stdout).toBe(0);
    expect(before.stdout).toMatch(/deliveries=1/);
    expect(before.stdout).toMatch(/intents=1/);
    expect(before.stdout).toMatch(/items=1/);
    expect(before.stdout).toMatch(/leads=1/);
    expect(before.stdout).toMatch(/patched_total=1/);

    const applied = psql(migration);
    expect(applied.status, applied.stderr + applied.stdout).toBe(0);

    const afterAnon = psql(`
      SET ROLE anon;
      SELECT COUNT(*) FROM public.deliveries;
    `);
    const deliveriesDenied =
      afterAnon.status !== 0 && /permission denied/i.test(afterAnon.stderr + afterAnon.stdout);
    expect(deliveriesDenied, afterAnon.stderr + afterAnon.stdout).toBe(true);

    const afterIntent = psql(`
      SET ROLE anon;
      SELECT COUNT(*) FROM public.checkout_intents;
    `);
    const intentDenied =
      afterIntent.status !== 0 && /permission denied/i.test(afterIntent.stderr + afterIntent.stdout);
    expect(intentDenied, afterIntent.stderr + afterIntent.stdout).toBe(true);

    const afterItems = psql(`
      SET ROLE anon;
      SELECT COUNT(*) FROM public.order_items;
    `);
    const itemsDenied =
      afterItems.status !== 0 && /permission denied/i.test(afterItems.stderr + afterItems.stdout);
    expect(itemsDenied, afterItems.stderr + afterItems.stdout).toBe(true);

    const afterLeads = psql(`
      SET ROLE anon;
      SELECT COUNT(*) FROM public.business_requests;
    `);
    const leadsDenied =
      afterLeads.status !== 0 && /permission denied/i.test(afterLeads.stderr + afterLeads.stdout);
    expect(leadsDenied, afterLeads.stderr + afterLeads.stdout).toBe(true);

    const afterPatch = psql(`
      SET ROLE anon;
      UPDATE public.checkout_intents SET total = 2 WHERE id = '${INTENT}'::uuid;
      SELECT 'anon_patch_n=' || COUNT(*)::text FROM public.checkout_intents WHERE total = 2;
    `);
    const patchDenied =
      afterPatch.status !== 0 && /permission denied/i.test(afterPatch.stderr + afterPatch.stdout);
    expect(patchDenied, afterPatch.stderr + afterPatch.stdout).toBe(true);

    const restoreCheck = psql(`
      SELECT 'stored_total=' || total::text FROM public.checkout_intents WHERE id = '${INTENT}'::uuid;
    `);
    expect(restoreCheck.status, restoreCheck.stderr + restoreCheck.stdout).toBe(0);
    expect(restoreCheck.stdout).toMatch(/stored_total=1/);

    const track = psql(`
      SET ROLE anon;
      SELECT 'track_code=' || (public.fn_public_track_delivery('YX-LOCK1')->>'code_suivi');
      SELECT 'track_tel=' || coalesce(public.fn_public_track_delivery('YX-LOCK1')->>'client_tel', 'absent');
      SELECT 'track_nom=' || coalesce(public.fn_public_track_delivery('YX-LOCK1')->>'client_nom', 'absent');
    `);
    expect(track.status, track.stderr + track.stdout).toBe(0);
    expect(track.stdout).toMatch(/track_code=YX-LOCK1/);
    expect(track.stdout).toMatch(/track_tel=absent/);
    expect(track.stdout).toMatch(/track_nom=absent/);

    const ownerRead = psql(`
      BEGIN;
      SET ROLE authenticated;
      SELECT set_config('request.jwt.claim.sub', '${BUYER}', true);
      SELECT 'own_intent=' || total::text FROM public.checkout_intents WHERE id = '${INTENT}'::uuid;
      SELECT 'own_items=' || COUNT(*)::text FROM public.order_items;
      COMMIT;
    `);
    expect(ownerRead.status, ownerRead.stderr + ownerRead.stdout).toBe(0);
    expect(ownerRead.stdout).toMatch(/own_intent=1/);
    expect(ownerRead.stdout).toMatch(/own_items=1/);

    const ownerPatch = psql(`
      BEGIN;
      SET ROLE authenticated;
      SELECT set_config('request.jwt.claim.sub', '${BUYER}', true);
      UPDATE public.checkout_intents SET total = 9 WHERE id = '${INTENT}'::uuid;
      SELECT 'buyer_patch_n=' || COUNT(*)::text FROM public.checkout_intents WHERE total = 9;
      COMMIT;
    `);
    expect(ownerPatch.status, ownerPatch.stderr + ownerPatch.stdout).toBe(0);
    expect(ownerPatch.stdout).toMatch(/buyer_patch_n=0/);

    const leadInsert = psql(`
      SET ROLE anon;
      INSERT INTO public.business_requests (entreprise, contact, email, telephone)
      VALUES ('NewCo', 'Sam', 'sam@example.test', '693333333');
    `);
    expect(leadInsert.status, leadInsert.stderr + leadInsert.stdout).toBe(0);

    const leadCount = psql(`
      SELECT 'lead_n=' || COUNT(*)::text FROM public.business_requests;
    `);
    expect(leadCount.status, leadCount.stderr + leadCount.stdout).toBe(0);
    expect(leadCount.stdout).toMatch(/lead_n=2/);
  });
});
