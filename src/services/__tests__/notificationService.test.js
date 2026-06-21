import { describe, expect, it, vi } from "vitest";

function makeClient() {
  const maybeSingle = vi.fn().mockResolvedValue({ data: { id: "notif-1" }, error: null });
  const select = vi.fn(() => ({ maybeSingle }));
  const insert = vi.fn(() => ({ select }));
  const from = vi.fn(() => ({ insert }));
  return { client: { from }, insert };
}

describe("notificationService", () => {
  it("stores explicit important priority as a DB-allowed high priority", async () => {
    const { publishInAppNotification } = await import("../notificationService.js");
    const { client, insert } = makeClient();

    const result = await publishInAppNotification(client, {
      userId: "user-1",
      type: "delivery",
      title: "Livreur assigné",
      message: "Nouvelle course disponible",
      priority: "important",
      category: "delivery",
    });

    expect(result).toEqual({ ok: true, id: "notif-1" });
    expect(insert).toHaveBeenCalledWith(
      expect.objectContaining({
        priority: "high",
        category: "delivery",
      }),
    );
  });

  it("uses a DB-allowed default priority for important notification types", async () => {
    const { publishInAppNotification } = await import("../notificationService.js");
    const { client, insert } = makeClient();

    await publishInAppNotification(client, {
      userId: "user-1",
      type: "seller_new_order",
      title: "Nouvelle commande",
      message: "Une commande attend votre confirmation",
    });

    expect(insert).toHaveBeenCalledWith(
      expect.objectContaining({
        priority: "high",
        category: "orders",
      }),
    );
  });
});
