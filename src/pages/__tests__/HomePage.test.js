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
        produits: [],
        allServices: null,
        produitsLoading: false,
        goPage: vi.fn(),
        setOnboardingOpen: vi.fn(),
        ...props,
      }),
    ),
  );
}

describe("HomePage", () => {
  it("renders refonte homepage with trust hero and escrow", () => {
    const html = renderHome();

    expect(html).toContain("Achetez en");
    expect(html).toContain("toute confiance");
    expect(html).toContain("Escrow");
    expect(html).toContain("Tendances du moment");
    expect(html).toContain("Made in Cameroun");
  });

  it("renders English homepage when locale is en", () => {
    const html = renderHome({ siteLocale: "en" });
    expect(html).toContain("Shop with");
    expect(html).toContain("confidence");
    expect(html).toContain("Trending now");
  });
});
