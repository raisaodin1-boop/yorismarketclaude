import { describe, it, expect } from "vitest";
import {
  STOCK_STATUS,
  computeStockStatus,
  isPurchasable,
  isVisibleOnMarketplace,
  daysUntilAutoRemoval,
  daysSinceOutOfStock,
  formatStockBadge,
} from "../stockStatus.js";

const SETTINGS = { stock_low_threshold: 5, stock_out_grace_days: 30 };

describe("stockStatus", () => {
  it("computes in_stock / low / out_of_stock / archived", () => {
    expect(computeStockStatus({ stock: 20 }, SETTINGS)).toBe(STOCK_STATUS.IN_STOCK);
    expect(computeStockStatus({ stock: 3 }, SETTINGS)).toBe(STOCK_STATUS.LOW);
    expect(computeStockStatus({ stock: 0 }, SETTINGS)).toBe(STOCK_STATUS.OUT_OF_STOCK);
    expect(computeStockStatus({ stock: -2 }, SETTINGS)).toBe(STOCK_STATUS.OUT_OF_STOCK);
    expect(computeStockStatus({ stock: 100, is_archived: true }, SETTINGS)).toBe(STOCK_STATUS.ARCHIVED);
    expect(computeStockStatus({ stock: 100, hidden_from_marketplace: true }, SETTINGS)).toBe(STOCK_STATUS.ARCHIVED);
  });

  it("treats missing / null stock as rupture", () => {
    expect(computeStockStatus({}, SETTINGS)).toBe(STOCK_STATUS.OUT_OF_STOCK);
    expect(computeStockStatus({ stock: null }, SETTINGS)).toBe(STOCK_STATUS.OUT_OF_STOCK);
  });

  it("isPurchasable: stock > 0 + actif + not archived", () => {
    expect(isPurchasable({ stock: 1, actif: true })).toBe(true);
    expect(isPurchasable({ stock: 1, actif: false })).toBe(false);
    expect(isPurchasable({ stock: 0, actif: true })).toBe(false);
    expect(isPurchasable({ stock: 5, actif: true, is_archived: true })).toBe(false);
    expect(isPurchasable(null)).toBe(false);
  });

  it("isVisibleOnMarketplace ignores stock=0 (UX 'temporairement indisponible')", () => {
    expect(isVisibleOnMarketplace({ stock: 0, actif: true })).toBe(true);
    expect(isVisibleOnMarketplace({ stock: 0, actif: true, is_archived: true })).toBe(false);
    expect(isVisibleOnMarketplace({ stock: 5, actif: false })).toBe(false);
  });

  it("daysUntilAutoRemoval uses auto_removal_date if present", () => {
    const now = new Date("2026-05-16T12:00:00Z");
    const product = {
      stock: 0,
      out_of_stock_since: "2026-05-01T12:00:00Z",
      auto_removal_date: "2026-05-31T12:00:00Z",
    };
    expect(daysUntilAutoRemoval(product, SETTINGS, now)).toBe(15);
  });

  it("daysUntilAutoRemoval falls back to out_of_stock_since + graceDays", () => {
    const now = new Date("2026-05-16T12:00:00Z");
    const product = { stock: 0, out_of_stock_since: "2026-05-01T12:00:00Z" };
    expect(daysUntilAutoRemoval(product, SETTINGS, now)).toBe(15);
  });

  it("daysUntilAutoRemoval returns null if in stock", () => {
    expect(daysUntilAutoRemoval({ stock: 5 }, SETTINGS)).toBeNull();
  });

  it("daysSinceOutOfStock counts elapsed days", () => {
    const now = new Date("2026-05-16T12:00:00Z");
    expect(daysSinceOutOfStock({ out_of_stock_since: "2026-05-01T12:00:00Z" }, now)).toBe(15);
    expect(daysSinceOutOfStock({ out_of_stock_since: null }, now)).toBeNull();
  });

  it("formatStockBadge tones", () => {
    expect(formatStockBadge({ stock: 50 }, SETTINGS).tone).toBe("ok");
    expect(formatStockBadge({ stock: 3 }, SETTINGS).tone).toBe("warning");
    expect(formatStockBadge({ stock: 0 }, SETTINGS).tone).toBe("danger");
    expect(formatStockBadge({ stock: 0, is_archived: true }, SETTINGS).tone).toBe("muted");
  });
});
