import { describe, expect, it } from "vitest";
import {
  resolvePrestTier,
  prestArrivalEta,
  isLiveAvailable,
  portfolioCount,
} from "../prestCardMeta.js";

describe("prestCardMeta", () => {
  it("assigns tier badges by profile strength", () => {
    expect(resolvePrestTier({ premium: true, note: 4.9, realisations: 250 })?.label).toBe("Super Pro");
    expect(resolvePrestTier({ top: true, note: 4.8, realisations: 120 })?.label).toBe("Expert Yorix");
    expect(resolvePrestTier({ verifie: true, note: 4.6 })?.label).toBe("Premium");
  });

  it("returns uber-style ETA when available", () => {
    const eta = prestArrivalEta({ id: "p1", dispo: true }, "fr");
    expect(eta).toMatch(/Arrive dans/);
  });

  it("detects live availability", () => {
    expect(isLiveAvailable({ dispo: true, reponse_rapide: true })).toBe(true);
    expect(isLiveAvailable({ dispo: false })).toBe(false);
  });

  it("estimates portfolio size for photographers", () => {
    expect(portfolioCount({ categorie: "Photographie", realisations: 520 })).toBeGreaterThan(10);
  });
});
