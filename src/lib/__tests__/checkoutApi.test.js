import { describe, it, expect, beforeEach, vi } from "vitest";

const invoke = vi.fn();

vi.mock("../supabase.js", () => ({
  supabase: {
    functions: { invoke },
  },
}));

describe("checkoutApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("createCheckoutIntent invokes Edge function", async () => {
    const { createCheckoutIntent } = await import("../checkoutApi.js");
    invoke.mockResolvedValueOnce({ data: { intentId: "x" }, error: null });
    const out = await createCheckoutIntent({ a: 1 });
    expect(invoke).toHaveBeenCalledWith("create_checkout_intent", { body: { a: 1 } });
    expect(out).toEqual({ intentId: "x" });
  });

  it("confirmCheckout propagates invoke errors", async () => {
    const { confirmCheckout } = await import("../checkoutApi.js");
    const err = new Error("edge");
    invoke.mockResolvedValueOnce({ data: null, error: err });
    await expect(confirmCheckout({})).rejects.toThrow("edge");
  });

  it("checkoutReturnStatus throws on data.error", async () => {
    const { checkoutReturnStatus } = await import("../checkoutApi.js");
    invoke.mockResolvedValueOnce({ data: { error: "bad" }, error: null });
    await expect(checkoutReturnStatus({ id: 1 })).rejects.toThrow("bad");
  });
});
