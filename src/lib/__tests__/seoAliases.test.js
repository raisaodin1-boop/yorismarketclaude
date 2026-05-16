import { describe, it, expect } from "vitest";
import { parsePathname, pathForPage } from "../seoRoutes.js";

describe("SEO hubs & blog", () => {
  it("parses marketplace-cameroun as home with alias", () => {
    const r = parsePathname("/marketplace-cameroun");
    expect(r.page).toBe("home");
    expect(r.canonicalPath).toBe("/marketplace-cameroun");
    expect(r.seoAliasKey).toBe("marketplace-cameroun");
  });

  it("parses ecommerce-cameroun as produits", () => {
    const r = parsePathname("/ecommerce-cameroun");
    expect(r.page).toBe("produits");
    expect(r.seoAliasKey).toBe("ecommerce-cameroun");
  });

  it("parses blog guide slug", () => {
    const r = parsePathname("/blog/comment-vendre-en-ligne-cameroun");
    expect(r.page).toBe("blog");
    expect(r.blogSlug).toBe("comment-vendre-en-ligne-cameroun");
    expect(r.canonicalPath).toBe("/blog/comment-vendre-en-ligne-cameroun");
  });

  it("pathForPage blog avec slug", () => {
    expect(pathForPage("blog", { blogSlug: "livraison-douala-guide" })).toBe("/blog/livraison-douala-guide");
  });
});
