// @vitest-environment node
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  PUBLIC_DELIVERY_TRACK_COLUMNS,
  PUBLIC_DELIVERY_TRACK_RPC,
  fetchPublicDeliveryByCode,
} from "../publicDeliveryTracking.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const migrationPath = join(
  root,
  "supabase/migrations/20260910120000_lock_anon_checkout_delivery_pii.sql",
);

describe("lock anon checkout/delivery PII migration", () => {
  const sql = readFileSync(migrationPath, "utf8");

  it("revokes anon on the leaked commerce tables", () => {
    expect(sql).toMatch(/REVOKE ALL ON TABLE public\.%I FROM anon/i);
    expect(sql).toMatch(/'deliveries'/);
    expect(sql).toMatch(/'checkout_intents'/);
    expect(sql).toMatch(/'order_items'/);
    expect(sql).toMatch(/'business_requests'/);
    expect(sql).toMatch(/FORCE ROW LEVEL SECURITY/i);
  });

  it("blocks client writes of checkout totals", () => {
    expect(sql).toMatch(/checkout_intents_update_admin_only/);
    expect(sql).toMatch(/order_items_update_admin_only/);
    expect(sql).not.toMatch(/checkout_intents_update_owner_or_admin/);
  });

  it("keeps owner/admin SELECT and a code-gated public tracking RPC", () => {
    expect(sql).toMatch(/checkout_intents_select_owner_or_admin/);
    expect(sql).toMatch(/deliveries_select_related_or_admin/);
    expect(sql).toMatch(/CREATE OR REPLACE FUNCTION public\.fn_public_track_delivery/);
    expect(sql).toMatch(/GRANT EXECUTE ON FUNCTION public\.fn_public_track_delivery\(text\) TO anon, authenticated/);
    const rpcChunk = sql.slice(sql.indexOf("fn_public_track_delivery"));
    expect(rpcChunk).not.toMatch(/client_tel/);
    expect(rpcChunk).not.toMatch(/client_nom/);
    expect(rpcChunk).not.toMatch(/commission_livreur/);
  });
});

describe("public delivery tracking client", () => {
  it("tracker uses the RPC helper instead of select *", () => {
    const tracker = readFileSync(join(root, "src/components/DeliveryTracker.jsx"), "utf8");
    expect(tracker).toContain("fetchPublicDeliveryByCode");
    expect(tracker).not.toMatch(/from\("deliveries"\)/);
    expect(tracker).not.toMatch(/select\("\*"\)/);
  });

  it("calls the tracking RPC then falls back only when the function is missing", async () => {
    const calls = [];
    const client = {
      rpc: async (name, args) => {
        calls.push(["rpc", name, args]);
        return { data: { code_suivi: args.p_code, statut: "en_route" }, error: null };
      },
      from: () => ({
        select: () => ({
          eq: async () => {
            calls.push(["fallback"]);
            return { data: { statut: "should_not_run" }, error: null };
          },
        }),
      }),
    };
    const { data } = await fetchPublicDeliveryByCode(client, "yx-abc12");
    expect(calls[0]).toEqual(["rpc", PUBLIC_DELIVERY_TRACK_RPC, { p_code: "YX-ABC12" }]);
    expect(data.statut).toBe("en_route");
    expect(calls.some((c) => c[0] === "fallback")).toBe(false);
  });

  it("falls back to a code-filtered select without PII columns when RPC is absent", async () => {
    let selected = "";
    const client = {
      rpc: async () => ({ data: null, error: { message: "function fn_public_track_delivery does not exist" } }),
      from: (table) => ({
        select: (cols) => {
          selected = `${table}:${cols}`;
          return {
            eq: (col, val) => ({
              maybeSingle: async () => ({
                data: col === "code_suivi" && val === "YX-OK" ? { code_suivi: val } : null,
                error: null,
              }),
            }),
          };
        },
      }),
    };
    const { data } = await fetchPublicDeliveryByCode(client, "yx-ok");
    expect(selected.startsWith("deliveries:")).toBe(true);
    expect(selected).toContain("code_suivi");
    expect(selected).not.toMatch(/client_tel/);
    expect(selected).not.toMatch(/client_nom/);
    expect(selected).toBe(`deliveries:${PUBLIC_DELIVERY_TRACK_COLUMNS}`);
    expect(data.code_suivi).toBe("YX-OK");
  });
});
