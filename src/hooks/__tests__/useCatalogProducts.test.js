import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock du client Supabase : on capture la chaîne de requête sans réseau.
const mocks = vi.hoisted(() => ({ from: vi.fn() }));
vi.mock("../../lib/supabase", () => ({ supabase: { from: mocks.from } }));

import {
  fetchCatalogPage,
  sanitizeTerm,
  buildCategoryClause,
} from "../useCatalogProducts.js";

function makeQueryBuilder(result) {
  const builder = {};
  for (const method of ["select", "or", "order", "range"]) {
    builder[method] = vi.fn(() => builder);
  }
  builder.then = (resolve) => resolve(result);
  return builder;
}

function orCalls(builder) {
  return builder.or.mock.calls.map((c) => c[0]);
}

describe("fetchCatalogPage", () => {
  let builder;

  beforeEach(() => {
    builder = makeQueryBuilder({ data: [{ id: 1 }], count: 137, error: null });
    mocks.from.mockReset();
    mocks.from.mockReturnValue(builder);
  });

  it("interroge la table products", async () => {
    await fetchCatalogPage({ page: 0, pageSize: 20 });
    expect(mocks.from).toHaveBeenCalledWith("products");
  });

  it("calcule les bornes .range() (bornes incluses, indexé 0)", async () => {
    await fetchCatalogPage({ page: 0, pageSize: 20 });
    expect(builder.range).toHaveBeenCalledWith(0, 19);

    builder.range.mockClear();
    await fetchCatalogPage({ page: 2, pageSize: 20 });
    expect(builder.range).toHaveBeenCalledWith(40, 59);
  });

  it("demande le total exact pour calculer les pages", async () => {
    await fetchCatalogPage({ page: 0, pageSize: 20 });
    const [columns, options] = builder.select.mock.calls[0];
    expect(options).toEqual({ count: "exact" });
    expect(columns).not.toBe("*");
    expect(columns).toContain("name_fr");
    expect(columns).toContain("prix");
  });

  it("garde un ordre déterministe (sponsorise puis created_at)", async () => {
    await fetchCatalogPage({ page: 0, pageSize: 20 });
    expect(builder.order).toHaveBeenCalledWith("sponsorise", { ascending: false });
    expect(builder.order).toHaveBeenCalledWith("created_at", { ascending: false });
  });

  it("pousse la recherche côté serveur (ilike name + description)", async () => {
    await fetchCatalogPage({ page: 0, pageSize: 20, search: "caméra" });
    const clause = orCalls(builder).find((c) => c.includes("name_fr.ilike"));
    expect(clause).toBeTruthy();
    expect(clause).toContain("name_fr.ilike.%caméra%");
    expect(clause).toContain("description_fr.ilike.%caméra%");
  });

  it("ne pousse pas de clause recherche quand le terme est vide", async () => {
    await fetchCatalogPage({ page: 0, pageSize: 20, search: "   " });
    expect(orCalls(builder).some((c) => c.includes("ilike"))).toBe(false);
  });

  it("retourne products + total normalisés", async () => {
    const res = await fetchCatalogPage({ page: 0, pageSize: 20 });
    expect(res).toEqual({ products: [{ id: 1 }], total: 137 });
  });

  it("propage l'erreur Supabase", async () => {
    builder = makeQueryBuilder({ data: null, count: null, error: new Error("boom") });
    mocks.from.mockReturnValue(builder);
    await expect(fetchCatalogPage({ page: 0, pageSize: 20 })).rejects.toThrow("boom");
  });
});

describe("sanitizeTerm", () => {
  it("neutralise les caractères qui cassent PostgREST", () => {
    expect(sanitizeTerm("a%b,c(d)")).toBe("a b c d");
  });
  it("tolère null/undefined", () => {
    expect(sanitizeTerm(null)).toBe("");
    expect(sanitizeTerm(undefined)).toBe("");
  });
});

describe("buildCategoryClause", () => {
  it("matche par id taxonomie ET par libellé legacy en contains (OR)", () => {
    const clauses = buildCategoryClause({ categoryIds: ["x", "y"], filterLabel: "Mode" }, "");
    expect(clauses).toEqual(["category_id.in.(x,y)", "categorie.ilike.%Mode%"]);
  });
  it("retombe sur le libellé legacy quand pas de taxonomie", () => {
    expect(buildCategoryClause(null, "Électronique")).toEqual(["categorie.ilike.%Électronique%"]);
  });
  it("renvoie une liste vide sans catégorie", () => {
    expect(buildCategoryClause(null, "")).toEqual([]);
  });
});
