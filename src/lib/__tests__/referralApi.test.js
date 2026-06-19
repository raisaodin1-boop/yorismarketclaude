import { beforeEach, describe, expect, it, vi } from "vitest";

const supabaseMock = {
  from: vi.fn(),
};

vi.mock("../supabase.js", () => ({
  supabase: supabaseMock,
}));

function installReferralCreditMock({ productCategorie }) {
  const calls = [];

  supabaseMock.from.mockImplementation((table) => {
    const state = { table, action: "select", filters: [], values: null };
    const resultFor = () => {
      calls.push({ ...state, filters: [...state.filters] });
      if (table === "profiles") return { data: { referrer_id: "referrer-1" }, error: null };
      if (table === "referral_bonuses" && state.action === "select") {
        return { data: { id: "bonus-1", status: "pending" }, error: null };
      }
      if (table === "orders") return { data: [{ id: "order-1" }], error: null };
      if (table === "order_items") return { data: [{ product_id: "product-1" }], error: null };
      if (table === "products") {
        return { data: [{ id: "product-1", categorie: productCategorie, category_id: null }], error: null };
      }
      return { data: null, error: null };
    };

    const chain = {
      select() {
        state.action = "select";
        return chain;
      },
      update(values) {
        state.action = "update";
        state.values = values;
        return chain;
      },
      insert(values) {
        state.action = "insert";
        state.values = values;
        return Promise.resolve(resultFor());
      },
      eq(column, value) {
        state.filters.push([column, value]);
        return chain;
      },
      in(column, value) {
        state.filters.push([column, value]);
        return chain;
      },
      limit() {
        return chain;
      },
      maybeSingle() {
        return Promise.resolve(resultFor());
      },
      then(resolve, reject) {
        return Promise.resolve(resultFor()).then(resolve, reject);
      },
    };
    return chain;
  });

  return calls;
}

describe("referralApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("matches eligible referral categories across labels and slugs", async () => {
    const { isReferralCategoryEligible } = await import("../referralApi.js");

    expect(isReferralCategoryEligible("Électronique & Technologie")).toBe(true);
    expect(isReferralCategoryEligible("mode-beaute")).toBe(true);
    expect(isReferralCategoryEligible("Services à domicile", "services")).toBe(false);
    expect(isReferralCategoryEligible("Immobilier", "immobilier")).toBe(false);
  });

  it("does not credit referral bonuses for ineligible order categories", async () => {
    const calls = installReferralCreditMock({ productCategorie: "Services à domicile" });
    const { creditReferralBonusIfEligible } = await import("../referralApi.js");

    await creditReferralBonusIfEligible("referred-1", "YORIX-ORDER");

    expect(calls).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          table: "orders",
          filters: expect.arrayContaining([
            ["client_id", "referred-1"],
            ["order_group_id", "YORIX-ORDER"],
          ]),
        }),
      ]),
    );
    expect(calls.some((call) => call.table === "wallets" && call.action === "update")).toBe(false);
    expect(calls.some((call) => call.table === "referral_bonuses" && call.action === "update")).toBe(false);
  });
});
