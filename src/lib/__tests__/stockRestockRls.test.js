// @vitest-environment node
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const migrationPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../supabase/migrations/20261010120000_fix_stock_restock_rls.sql",
);

const migrationSql = readFileSync(migrationPath, "utf8");

function runPsql(args, sql) {
  return spawnSync("sudo", ["-u", "postgres", "psql", "-v", "ON_ERROR_STOP=1", ...args], {
    encoding: "utf8",
    input: sql,
    timeout: 20000,
  });
}

function postgresAvailable() {
  const probe = spawnSync("sudo", ["-u", "postgres", "psql", "-c", "SELECT 1"], {
    encoding: "utf8",
    timeout: 15000,
  });
  return probe.status === 0;
}

const hasPostgres = postgresAvailable();

describe("stock restock migration", () => {
  it("runs the lifecycle trigger as security definer", () => {
    expect(migrationSql).toMatch(/SECURITY DEFINER/);
    expect(migrationSql).toMatch(/SET search_path = public/);
    expect(migrationSql).toMatch(/fn_products_sync_stock_lifecycle/);
  });

  it.skipIf(!hasPostgres)("lets a seller restock from 0 and still blocks direct audit inserts", () => {
    const db = "yorix_stock_repro";
    const role = "yorix_seller_restock_test";
    const productId = "11111111-1111-1111-1111-111111111111";

    runPsql(["-d", "postgres", "-c", `DROP DATABASE IF EXISTS ${db}`], "");
    runPsql(["-d", "postgres", "-c", `DROP ROLE IF EXISTS ${role}`], "");
    const created = runPsql(
      ["-d", "postgres"],
      `CREATE ROLE ${role} NOLOGIN; CREATE DATABASE ${db};`,
    );
    expect(created.status, created.stderr).toBe(0);

    const sql = `
      DO $$
      BEGIN
        CREATE ROLE service_role NOLOGIN;
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END $$;

      CREATE TABLE public.commerce_settings (
        id int PRIMARY KEY,
        stock_out_grace_days int NOT NULL DEFAULT 30,
        stock_low_threshold int NOT NULL DEFAULT 5
      );
      INSERT INTO public.commerce_settings (id, stock_out_grace_days, stock_low_threshold)
      VALUES (1, 30, 5);

      CREATE TABLE public.products (
        id uuid PRIMARY KEY,
        vendeur_id uuid,
        stock integer,
        stock_status text NOT NULL DEFAULT 'in_stock',
        out_of_stock_since timestamptz,
        auto_removal_date timestamptz,
        is_archived boolean NOT NULL DEFAULT false,
        hidden_from_marketplace boolean NOT NULL DEFAULT false,
        seller_notified boolean NOT NULL DEFAULT false,
        last_stock_alert_sent timestamptz,
        stock_alerts_sent jsonb NOT NULL DEFAULT '{}'::jsonb
      );

      CREATE TABLE public.stock_lifecycle_log (
        id bigserial PRIMARY KEY,
        product_id uuid,
        vendeur_id uuid,
        event text NOT NULL,
        day_offset int,
        payload jsonb NOT NULL DEFAULT '{}'::jsonb,
        created_at timestamptz NOT NULL DEFAULT now()
      );
      ALTER TABLE public.stock_lifecycle_log ENABLE ROW LEVEL SECURITY;
      CREATE POLICY stock_lifecycle_log_admin_select
        ON public.stock_lifecycle_log FOR SELECT TO ${role}
        USING (false);

      ${migrationSql}

      CREATE TRIGGER trg_products_sync_stock_lifecycle
        BEFORE INSERT OR UPDATE OF stock ON public.products
        FOR EACH ROW EXECUTE FUNCTION public.fn_products_sync_stock_lifecycle();

      GRANT USAGE ON SCHEMA public TO ${role};
      GRANT SELECT, UPDATE ON public.products TO ${role};
      GRANT INSERT, SELECT ON public.stock_lifecycle_log TO ${role};
      GRANT USAGE, SELECT ON SEQUENCE public.stock_lifecycle_log_id_seq TO ${role};

      INSERT INTO public.products (id, vendeur_id, stock, is_archived, stock_status)
      VALUES ('${productId}', '22222222-2222-2222-2222-222222222222', 0, true, 'out_of_stock');

      SET ROLE ${role};
      UPDATE public.products SET stock = 3 WHERE id = '${productId}';
      RESET ROLE;

      DO $$
      DECLARE
        v_stock int;
        v_status text;
        v_archived boolean;
        v_hidden boolean;
        v_logs int;
      BEGIN
        SELECT stock, stock_status, is_archived, hidden_from_marketplace
          INTO v_stock, v_status, v_archived, v_hidden
          FROM public.products WHERE id = '${productId}';
        IF v_stock IS DISTINCT FROM 3 OR v_status IS DISTINCT FROM 'low'
           OR v_archived OR v_hidden THEN
          RAISE EXCEPTION 'restock did not apply (stock=%, status=%, archived=%, hidden=%)',
            v_stock, v_status, v_archived, v_hidden;
        END IF;
        SELECT count(*) INTO v_logs FROM public.stock_lifecycle_log WHERE event = 'restocked';
        IF v_logs IS DISTINCT FROM 1 THEN
          RAISE EXCEPTION 'expected 1 restock audit row, got %', v_logs;
        END IF;
      END $$;

      SET ROLE ${role};
      UPDATE public.products SET stock = 8 WHERE id = '${productId}';
      UPDATE public.products SET stock = 0 WHERE id = '${productId}';
      UPDATE public.products SET stock = 4 WHERE id = '${productId}';
      RESET ROLE;

      DO $$
      DECLARE
        v_logs int;
        v_stock int;
      BEGIN
        SELECT count(*) INTO v_logs FROM public.stock_lifecycle_log WHERE event = 'restocked';
        SELECT stock INTO v_stock FROM public.products WHERE id = '${productId}';
        IF v_logs IS DISTINCT FROM 2 OR v_stock IS DISTINCT FROM 4 THEN
          RAISE EXCEPTION 'second restock failed (logs=%, stock=%)', v_logs, v_stock;
        END IF;
      END $$;

      SET ROLE ${role};
      DO $$
      BEGIN
        INSERT INTO public.stock_lifecycle_log (event) VALUES ('forged');
        RAISE EXCEPTION 'direct audit insert should have been denied';
      EXCEPTION
        WHEN OTHERS THEN
          IF SQLERRM NOT ILIKE '%row-level security%' THEN
            RAISE;
          END IF;
      END $$;
      RESET ROLE;
    `;

    try {
      const result = runPsql(["-d", db], sql);
      expect(result.status, `${result.stdout}\n${result.stderr}`).toBe(0);
    } finally {
      runPsql(["-d", "postgres", "-c", `DROP DATABASE IF EXISTS ${db}`], "");
      runPsql(["-d", "postgres", "-c", `DROP ROLE IF EXISTS ${role}`], "");
    }
  });
});
