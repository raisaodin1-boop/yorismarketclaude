import React from "react";
import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { HomePage } from "../HomePage.jsx";

describe("HomePage", () => {
  let mountedRoot = null;
  let mountedContainer = null;

  afterEach(async () => {
    if (mountedRoot) {
      await act(async () => {
        mountedRoot.unmount();
      });
      mountedRoot = null;
    }
    mountedContainer?.remove();
    mountedContainer = null;
  });

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

  it("reveals animated homepage content when IntersectionObserver is unavailable", async () => {
    const originalIntersectionObserver = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = undefined;
    mountedContainer = document.createElement("div");
    document.body.appendChild(mountedContainer);
    mountedRoot = createRoot(mountedContainer);

    try {
      await act(async () => {
        mountedRoot.render(
          React.createElement(HomePage, {
            produits: [],
            allServices: [],
            produitsLoading: false,
            filterCat: "",
            setFilterCat: vi.fn(),
            search: "",
            setSearch: vi.fn(),
            goPage: vi.fn(),
            setOnboardingOpen: vi.fn(),
          }),
        );
      });

      expect(mountedContainer.querySelector(".yx-reveal")?.classList.contains("is-in")).toBe(true);
    } finally {
      globalThis.IntersectionObserver = originalIntersectionObserver;
    }
  });
});
