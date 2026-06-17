import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { SkeletonCard } from "../SkeletonCard.jsx";

describe("SkeletonCard", () => {
  const html = renderToStaticMarkup(React.createElement(SkeletonCard));

  it("reproduit la structure d'une carte produit", () => {
    expect(html).toContain("sk-card");
    expect(html).toContain("sk-img");
    expect(html).toContain("sk-line");
    expect(html).toContain("sk-btn");
  });

  it("est décoratif (masqué aux lecteurs d'écran)", () => {
    expect(html).toContain('aria-hidden="true"');
  });

  it("ne contient ni image ni texte réels", () => {
    expect(html).not.toContain("<img");
    expect(html).not.toContain("FCFA");
  });
});
