import { describe, it, expect } from "vitest";
import { shouldShowGlobalNewsletter, shouldShowSiteFooter, shouldUseCatalogFocusHeader } from "../pageChrome.js";

describe("pageChrome", () => {
  it("hides global newsletter on admin and dashboard", () => {
    expect(shouldShowGlobalNewsletter("admin")).toBe(false);
    expect(shouldShowGlobalNewsletter("dashboard")).toBe(false);
    expect(shouldShowGlobalNewsletter("checkout")).toBe(false);
    expect(shouldShowGlobalNewsletter("home")).toBe(false);
  });

  it("shows global newsletter on catalog discovery pages", () => {
    expect(shouldShowGlobalNewsletter("produits")).toBe(true);
    expect(shouldShowGlobalNewsletter("merchHub")).toBe(true);
    expect(shouldShowGlobalNewsletter("livraison")).toBe(true);
  });

  it("hides site footer on admin and transactional pages", () => {
    expect(shouldShowSiteFooter("admin")).toBe(false);
    expect(shouldShowSiteFooter("dashboard")).toBe(false);
    expect(shouldShowSiteFooter("checkout")).toBe(false);
    expect(shouldShowSiteFooter("home")).toBe(true);
  });

  it("uses catalog focus header on key merch hubs", () => {
    expect(shouldUseCatalogFocusHeader("merchHub", "made-in-cameroun")).toBe(true);
    expect(shouldUseCatalogFocusHeader("merchHub", "sourcer-en-gros")).toBe(true);
    expect(shouldUseCatalogFocusHeader("merchHub", "top-produits")).toBe(false);
    expect(shouldUseCatalogFocusHeader("produits", "made-in-cameroun")).toBe(false);
  });
});
