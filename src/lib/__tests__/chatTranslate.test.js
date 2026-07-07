import { describe, it, expect, vi, beforeEach } from "vitest";
import { detectTextLanguage, translateChatText, chatViewerLang } from "../chatTranslate.js";

describe("chatTranslate", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("detectTextLanguage", () => {
    it("detects French from common words", () => {
      expect(detectTextLanguage("Bonjour, quel est le prix de livraison ?")).toBe("fr");
    });

    it("detects English from common words", () => {
      expect(detectTextLanguage("Hello, what is the delivery price please?")).toBe("en");
    });

    it("uses accents as French hint when no keywords", () => {
      expect(detectTextLanguage("Très bien")).toBe("fr");
    });

    it("returns unknown for very short text", () => {
      expect(detectTextLanguage("a")).toBe("unknown");
    });
  });

  describe("chatViewerLang", () => {
    it("maps site locale to chat lang", () => {
      expect(chatViewerLang("en")).toBe("en");
      expect(chatViewerLang("fr")).toBe("fr");
      expect(chatViewerLang(undefined)).toBe("fr");
    });
  });

  describe("translateChatText", () => {
    it("returns null when source equals target language", async () => {
      await expect(translateChatText("Hello world product price", "en")).resolves.toBeNull();
    });

    it("returns null for empty input", async () => {
      await expect(translateChatText("", "en")).resolves.toBeNull();
    });

    it("fetches translation from API when languages differ", async () => {
      const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => ({
          responseData: { translatedText: "Hello, what is the price?" },
        }),
      });

      const result = await translateChatText("Bonjour, quel est le prix ?", "en");
      expect(result).toBe("Hello, what is the price?");
      expect(fetchMock).toHaveBeenCalledOnce();

      fetchMock.mockRestore();
    });

    it("uses cache on repeated calls", async () => {
      const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => ({
          responseData: { translatedText: "Good morning" },
        }),
      });

      const text = "Bonjour monsieur livraison commande";
      await translateChatText(text, "en");
      await translateChatText(text, "en");
      expect(fetchMock).toHaveBeenCalledOnce();

      fetchMock.mockRestore();
    });
  });
});
