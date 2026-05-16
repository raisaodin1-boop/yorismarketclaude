import { describe, it, expect } from "vitest";
import { parsePathname, pathForPage } from "../seoRoutes.js";

describe("SEO hubs & blog (localized paths)", () => {
  it("parses marketplace-cameroun as home with alias", () => {
    const r = parsePathname("/fr/marketplace-cameroun");
    expect(r.page).toBe("home");
    expect(r.canonicalPath).toBe("/fr/marketplace-cameroun");
    expect(r.seoAliasKey).toBe("marketplace-cameroun");
  });

  it("parses English hub cameroon-marketplace", () => {
    const r = parsePathname("/en/cameroon-marketplace");
    expect(r.page).toBe("home");
    expect(r.locale).toBe("en");
    expect(r.canonicalPath).toBe("/en/cameroon-marketplace");
  });

  it("parses ecommerce-cameroun as produits", () => {
    const r = parsePathname("/fr/ecommerce-cameroun");
    expect(r.page).toBe("produits");
    expect(r.seoAliasKey).toBe("ecommerce-cameroun");
    expect(r.canonicalPath).toBe("/fr/ecommerce-cameroun");
  });

  it("parses blog guide slug with locale prefix", () => {
    const r = parsePathname("/fr/blog/comment-vendre-en-ligne-cameroun");
    expect(r.page).toBe("blog");
    expect(r.blogSlug).toBe("comment-vendre-en-ligne-cameroun");
    expect(r.canonicalPath).toBe("/fr/blog/comment-vendre-en-ligne-cameroun");
  });

  it("pathForPage blog avec slug et locale fr", () => {
    expect(pathForPage("blog", { blogSlug: "livraison-douala-guide", locale: "fr" })).toBe(
      "/fr/blog/livraison-douala-guide",
    );
  });

  it("pathForPage blog avec locale en", () => {
    expect(pathForPage("blog", { blogSlug: "livraison-douala-guide", locale: "en" })).toBe(
      "/en/blog/livraison-douala-guide",
    );
  });
});
