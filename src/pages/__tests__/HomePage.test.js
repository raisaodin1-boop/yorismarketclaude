import React from "react";
import { describe, expect, it, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomePage } from "../HomePage.jsx";

vi.mock("../../hooks/usePlatformStats.js", () => ({
  usePlatformStats: () => ({
    stats: {
      products: 180,
      sellers: 48,
      orders: 350,
      services: 12,
      cities: 10,
      rating: 4.8,
      live: true,
    },
    isLoading: false,
  }),
}));

function renderHome(props = {}) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return renderToString(
    React.createElement(
      QueryClientProvider,
      { client },
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
        ...props,
      }),
    ),
  );
}

describe("HomePage", () => {
  it("renders the public homepage without throwing when catalog data is absent", () => {
    const html = renderHome();

    expect(html).toContain("Entreprise camerounaise");
    expect(html).toContain("Pourquoi");
    expect(html).toContain("Achetez sans risque");
    expect(html).toContain("Escrow");
  });

  it("renders English hero when locale is en", () => {
    const html = renderHome({ siteLocale: "en" });
    expect(html).toContain("Cameroonian company");
    expect(html).toContain("Shop safely");
    expect(html).toContain("Why");
  });
});
