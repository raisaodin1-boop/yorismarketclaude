import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  optimizeCloudinaryUrl,
  cloudinaryResponsive,
  cloudinarySrcset,
  cloudinaryPlaceholder,
  CLOUDINARY_PRESETS,
} from "../../utils/helpers.js";
import { OptimizedImage } from "../OptimizedImage.jsx";

const CLD = "https://res.cloudinary.com/dulwb03nf/image/upload/v1/produit.jpg";

describe("transformations Cloudinary", () => {
  it("insère les transformations après /upload/", () => {
    const out = optimizeCloudinaryUrl(CLD, { width: 300 });
    expect(out).toContain("/upload/w_300,");
    expect(out).toContain("f_auto");
    expect(out).toContain("c_limit");
  });

  it("supporte hauteur + recadrage (c_fill) pour les presets", () => {
    const out = optimizeCloudinaryUrl(CLD, { width: 300, height: 300, crop: "fill" });
    expect(out).toContain("w_300");
    expect(out).toContain("h_300");
    expect(out).toContain("c_fill");
  });

  it("ne touche pas une URL non-Cloudinary", () => {
    const ext = "https://example.com/a.jpg";
    expect(optimizeCloudinaryUrl(ext, { width: 300 })).toBe(ext);
  });

  it("ne double pas une URL déjà optimisée", () => {
    const already = "https://res.cloudinary.com/x/image/upload/w_300,q_auto/v1/a.jpg";
    expect(optimizeCloudinaryUrl(already, { width: 800 })).toBe(already);
  });

  it("expose les presets thumb/card/hero attendus", () => {
    expect(CLOUDINARY_PRESETS.thumb).toMatchObject({ width: 80, height: 80, crop: "fill" });
    expect(CLOUDINARY_PRESETS.card).toMatchObject({ width: 300, height: 300, crop: "fill" });
    expect(CLOUDINARY_PRESETS.hero).toMatchObject({ width: 800, height: 600, crop: "limit" });
  });

  it("génère un srcset Retina 1x/2x (dimensions doublées)", () => {
    const { src, srcSet } = cloudinaryResponsive(CLD, "card");
    expect(src).toContain("w_300");
    expect(src).toContain("c_fill");
    expect(srcSet).toContain(" 1x");
    expect(srcSet).toContain(" 2x");
    expect(srcSet).toContain("w_600"); // 2x
    expect(srcSet).toContain("h_600");
  });

  it("cloudinarySrcset propose 400/800/1200w et placeholder en w_20", () => {
    const set = cloudinarySrcset(CLD);
    expect(set).toContain("400w");
    expect(set).toContain("800w");
    expect(set).toContain("1200w");
    expect(cloudinaryPlaceholder(CLD)).toContain("w_20");
  });
});

describe("OptimizedImage", () => {
  it("affiche un fallback (sans <img>) quand src est absent", () => {
    const html = renderToStaticMarkup(
      React.createElement(OptimizedImage, { src: null, fallbackEmoji: "📦" })
    );
    expect(html).toContain("📦");
    expect(html).not.toContain("srcset");
  });

  it("rend une image lazy avec srcset preset par défaut", () => {
    const html = renderToStaticMarkup(
      React.createElement(OptimizedImage, { src: CLD, size: "card" })
    );
    expect(html).toContain('loading="lazy"');
    expect(html).toContain("c_fill");
    expect(html).toContain("w_300");
    expect(html).toContain("2x");
  });

  it("met la première image (priority) en eager pour le LCP", () => {
    const html = renderToStaticMarkup(
      React.createElement(OptimizedImage, { src: CLD, size: "card", priority: true })
    );
    expect(html).toContain('loading="eager"');
    expect(html.toLowerCase()).toContain('fetchpriority="high"');
  });
});
