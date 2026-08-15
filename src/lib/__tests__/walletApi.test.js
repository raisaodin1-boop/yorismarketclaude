import { describe, expect, it } from "vitest";
import { ensureZeroWallet } from "../walletApi.js";

function fakeClient({ rpcError = null, insertError = null } = {}) {
  const calls = { rpc: [], insert: [] };
  return {
    calls,
    rpc: async (name) => {
      calls.rpc.push(name);
      return { error: rpcError };
    },
    from: (table) => ({
      insert: async (row) => {
        calls.insert.push({ table, row });
        return { error: insertError };
      },
    }),
  };
}

describe("ensureZeroWallet", () => {
  it("uses fn_ensure_wallet when the RPC exists", async () => {
    const client = fakeClient();
    const result = await ensureZeroWallet(client, "user-1");
    expect(result).toEqual({ ok: true });
    expect(client.calls.rpc).toEqual(["fn_ensure_wallet"]);
    expect(client.calls.insert).toEqual([]);
  });

  it("falls back to a zero-balance insert", async () => {
    const client = fakeClient({ rpcError: { message: "function does not exist" } });
    const result = await ensureZeroWallet(client, "user-1");
    expect(result).toEqual({ ok: true });
    expect(client.calls.insert).toEqual([
      {
        table: "wallets",
        row: { user_id: "user-1", solde: 0, total_gagne: 0, devise: "FCFA" },
      },
    ]);
  });

  it("treats a unique conflict as success", async () => {
    const client = fakeClient({
      rpcError: { message: "function does not exist" },
      insertError: { message: "duplicate key value violates unique constraint" },
    });
    expect(await ensureZeroWallet(client, "user-1")).toEqual({ ok: true });
  });

  it("rejects a missing user", async () => {
    expect(await ensureZeroWallet(fakeClient(), null)).toEqual({
      ok: false,
      error: "missing user",
    });
  });
});
