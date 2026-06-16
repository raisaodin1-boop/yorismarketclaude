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

  it("does not treat Edge HTTP business errors as unavailable", async () => {
    const { isEdgeFunctionUnavailable } = await import("../checkoutApi.js");
    const err = new Error("Edge Function returned a non-2xx status code");
    err.name = "FunctionsHttpError";
    err.context = { status: 409, statusText: "Conflict" };

    await expect(isEdgeFunctionUnavailable(err)).resolves.toBe(false);
  });

  it("does not treat deployed function 404 responses as unavailable", async () => {
    const { isEdgeFunctionUnavailable } = await import("../checkoutApi.js");
    const err = new Error("Edge Function returned a non-2xx status code");
    err.name = "FunctionsHttpError";
    err.context = {
      status: 404,
      statusText: "Not Found",
      clone: () => ({
        text: async () => JSON.stringify({ error: "Checkout intent not found" }),
      }),
    };

    await expect(isEdgeFunctionUnavailable(err)).resolves.toBe(false);
  });

  it("treats missing Edge Functions as unavailable", async () => {
    const { isEdgeFunctionUnavailable } = await import("../checkoutApi.js");
    const err = new Error("Edge Function returned a non-2xx status code");
    err.name = "FunctionsHttpError";
    err.context = {
      status: 404,
      statusText: "Not Found",
      clone: () => ({
        text: async () => JSON.stringify({ message: "Function not found" }),
      }),
    };

    await expect(isEdgeFunctionUnavailable(err)).resolves.toBe(true);
  });

  it("treats Edge relay failures as unavailable", async () => {
    const { isEdgeFunctionUnavailable } = await import("../checkoutApi.js");
    const err = new Error("Failed to send a request to the Edge Function");
    err.name = "FunctionsRelayError";

    await expect(isEdgeFunctionUnavailable(err)).resolves.toBe(true);
  });

  it("checkoutReturnStatus throws on data.error", async () => {
    const { checkoutReturnStatus } = await import("../checkoutApi.js");
    invoke.mockResolvedValueOnce({ data: { error: "bad" }, error: null });
    await expect(checkoutReturnStatus({ id: 1 })).rejects.toThrow("bad");
  });
});
