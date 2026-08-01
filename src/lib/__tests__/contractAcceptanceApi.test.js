import { describe, it, expect, vi } from "vitest";
import { recordContractAcceptance } from "../contractAcceptanceApi";

describe("recordContractAcceptance", () => {
  it("inserts an attributed acceptance row for the authenticated user", async () => {
    const insert = vi.fn().mockResolvedValue({ error: null });
    const client = {
      from: vi.fn(() => ({ insert })),
    };

    const result = await recordContractAcceptance(client, "user-1", {
      fullName: "Amina Bello",
      phone: "690000000",
      role: "seller",
      version: "v1.0",
      ip: "1.2.3.4",
      userAgent: "Vitest",
    });

    expect(result.error).toBeNull();
    expect(client.from).toHaveBeenCalledWith("user_contract_acceptance");
    expect(insert).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: "user-1",
        full_name: "Amina Bello",
        phone: "690000000",
        role: "seller",
      }),
    );
  });

  it("fails closed when user id is missing", async () => {
    const result = await recordContractAcceptance({ from: vi.fn() }, null, {
      fullName: "Amina",
    });
    expect(result.error).toBeInstanceOf(Error);
  });

  it("surfaces database errors to the caller", async () => {
    const dbError = { message: "rls denied" };
    const client = {
      from: () => ({
        insert: vi.fn().mockResolvedValue({ error: dbError }),
      }),
    };
    const result = await recordContractAcceptance(client, "user-1", {
      fullName: "Amina",
      phone: "690000000",
      role: "seller",
    });
    expect(result.error).toEqual(dbError);
  });
});
