import React from "react";
import { describe, expect, it, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { HomePage } from "../HomePage.jsx";

describe("HomePage", () => {
  it("renders the public homepage without throwing when catalog data is absent", () => {
    const html = renderToString(
      React.createElement(HomePage, {
        produits: null,
        allServices: null,
        produitsLoading: false,
        filterCat: "",
        setFilterCat: vi.fn(),
        search: "",
        setSearch: vi.fn(),
        goPage: vi.fn(),
        setOnboardingOpen: vi.fn(),
      }),
    );

    expect(html).toContain("Super-app commerce");
    expect(html).toContain("Livraison");
  });
});
