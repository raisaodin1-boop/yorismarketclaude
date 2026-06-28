import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  buildProductShareText,
  buildProductWhatsAppText,
  productPublicUrl,
  shareProduct,
} from "../shareUtils";

const product = {
  id: "11111111-1111-1111-1111-111111111111",
  name_fr: "Téléphone test",
  prix: 125000,
};

describe("shareUtils", () => {
  it("buildProductShareText sans emoji", () => {
    const text = buildProductShareText(product, "fr");
    expect(text).toContain("Téléphone test");
    expect(text).toContain("125");
    expect(text).not.toMatch(/^🛍️/);
    expect(text).toContain(productPublicUrl(product, "fr"));
  });

  it("buildProductWhatsAppText avec emoji", () => {
    const text = buildProductWhatsAppText(product, "fr");
    expect(text.startsWith("🛍️")).toBe(true);
  });

  describe("shareProduct", () => {
    beforeEach(() => {
      vi.stubGlobal("open", vi.fn());
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it("utilise navigator.share quand disponible", async () => {
      const share = vi.fn().mockResolvedValue(undefined);
      vi.stubGlobal("navigator", { share });

      const result = await shareProduct(product, "fr");
      expect(result).toEqual({ ok: true, method: "native" });
      expect(share).toHaveBeenCalledOnce();
    });

    it("repli presse-papiers si pas de Web Share", async () => {
      const writeText = vi.fn().mockResolvedValue(undefined);
      vi.stubGlobal("navigator", { clipboard: { writeText } });

      const result = await shareProduct(product, "fr");
      expect(result).toEqual({ ok: true, method: "clipboard" });
      expect(writeText).toHaveBeenCalledOnce();
    });
  });
});
