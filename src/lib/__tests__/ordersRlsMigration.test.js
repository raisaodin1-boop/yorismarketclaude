import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const migrationSql = readFileSync(
  new URL("../../../supabase/migrations/20260710110100_guard_seller_order_sensitive_updates.sql", import.meta.url),
  "utf8",
);

describe("seller order update guard migration", () => {
  it("installs an orders update trigger for direct seller writes", () => {
    expect(migrationSql).toContain("CREATE TRIGGER trg_guard_seller_order_sensitive_update");
    expect(migrationSql).toContain("BEFORE UPDATE ON public.orders");
    expect(migrationSql).toContain("EXECUTE FUNCTION public.fn_guard_seller_order_sensitive_update()");
  });

  it("keeps admin and trusted server order updates available", () => {
    expect(migrationSql).toContain("current_user <> 'authenticated'");
    expect(migrationSql).toContain("public.is_platform_admin()");
  });

  it("blocks sellers from changing payment, escrow, fulfillment, and accounting fields", () => {
    expect(migrationSql).toContain("OLD.vendeur_id = auth.uid()");

    [
      "vendeur_id",
      "client_id",
      "livreur_id",
      "product_id",
      "order_group_id",
      "client_nom",
      "telephone",
      "montant",
      "commission",
      "montant_vendeur",
      "livraison_status",
      "escrow_status",
      "payment_method",
      "payment_status",
      "payment_provider",
      "provider_tx_ref",
      "payout_status",
    ].forEach((column) => {
      expect(migrationSql).toContain(`NEW.${column} IS DISTINCT FROM OLD.${column}`);
    });

    expect(migrationSql).not.toContain("NEW.status IS DISTINCT FROM OLD.status");
    expect(migrationSql).toContain("Sellers may only update order status");
  });
});
