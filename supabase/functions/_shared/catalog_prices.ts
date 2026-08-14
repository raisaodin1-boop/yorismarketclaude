/** Prix catalogue depuis la base (pas le JSON client). */

type Line = Record<string, unknown>;

interface SupabaseForCatalog {
  from: (
    table: string,
  ) => {
    select: (cols: string) => {
      in: (
        col: string,
        vals: string[],
      ) => Promise<{ data: unknown; error?: { message: string } | null }>;
    };
  };
}

function kindOf(line: Line): string {
  return String(line.kind || "product");
}

/** variant_id sent by web checkout; _variantId is the cart field. */
export function variantIdFromLine(line: Line): string | null {
  const raw = line.variant_id ?? line.variantId ?? line._variantId;
  if (raw == null) return null;
  const s = String(raw).trim();
  return s === "" ? null : s;
}

export function variantsFromRow(row: { variants?: unknown }): Array<{
  id?: unknown;
  prix?: unknown;
  price?: unknown;
  stock?: unknown;
  label?: unknown;
}> {
  const v = row.variants;
  if (Array.isArray(v)) return v as ReturnType<typeof variantsFromRow>;
  if (typeof v === "string" && v.trim()) {
    try {
      const parsed = JSON.parse(v);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

export function findVariant(
  row: { variants?: unknown },
  variantId: string,
): { id: string; prix: number; stock: number; label: string } | null {
  const wanted = String(variantId);
  for (const v of variantsFromRow(row)) {
    if (String(v?.id ?? "") !== wanted) continue;
    return {
      id: wanted,
      prix: Number(v.prix ?? v.price ?? 0),
      stock: Number(v.stock ?? 0),
      label: String(v.label ?? ""),
    };
  }
  return null;
}

function isPromoActiveRow(row: {
  promo?: boolean | null;
  promo_pct?: unknown;
  promo_starts_at?: string | null;
  promo_ends_at?: string | null;
}): boolean {
  const pct = Number(row.promo_pct ?? 0);
  if (!row.promo && pct <= 0) return false;
  const now = Date.now();
  if (row.promo_starts_at) {
    const start = new Date(row.promo_starts_at).getTime();
    if (now < start) return false;
  }
  if (row.promo_ends_at) {
    const end = new Date(row.promo_ends_at).getTime();
    if (now > end) return false;
  }
  return row.promo === true || pct > 0;
}

function applyPromoToBase(
  base: number,
  row: {
    promo?: boolean | null;
    promo_pct?: unknown;
    promo_starts_at?: string | null;
    promo_ends_at?: string | null;
  },
): number {
  const rounded = Math.round(base);
  if (!isPromoActiveRow(row)) return rounded;
  const pct = Math.min(100, Math.max(0, Number(row.promo_pct ?? 0)));
  if (pct <= 0) return rounded;
  return Math.round(rounded * (1 - pct / 100));
}

function effectivePriceFromRow(row: {
  prix?: unknown;
  promo?: boolean | null;
  promo_pct?: unknown;
  promo_starts_at?: string | null;
  promo_ends_at?: string | null;
}): number {
  return applyPromoToBase(Number(row.prix ?? 0), row);
}

export async function applyCatalogPricing(
  supabase: SupabaseForCatalog,
  items: Line[],
): Promise<{ lines: Line[]; error?: string }> {
  const productLines = items.filter((i) => kindOf(i) === "product") as Line[];
  const serviceLines = items.filter((i) => kindOf(i) === "service") as Line[];

  const productIds = [...new Set(productLines.map((i) => String(i.id)))];
  const serviceIds = [...new Set(serviceLines.map((i) => String(i.id)))];

  const productRow = new Map<string, Record<string, unknown>>();
  if (productIds.length) {
    const { data, error } = await supabase
      .from("products")
      .select(
        "id,prix,actif,promo,promo_pct,promo_starts_at,promo_ends_at,has_variants,variants,vendeur_id,vendeur_nom,ville",
      )
      .in("id", productIds);
    if (error) return { lines: [], error: error.message };
    const rows = (data ?? []) as Record<string, unknown>[];
    const seen = new Set<string>();
    for (const row of rows) {
      const id = String(row.id ?? "");
      if (!id) continue;
      seen.add(id);
      if (row.actif === false) return { lines: [], error: "Produit indisponible" };
      productRow.set(id, row);
    }
    for (const id of productIds) {
      if (!seen.has(id)) return { lines: [], error: "Produit introuvable" };
    }
  }

  const servicePrice = new Map<string, number>();
  const serviceProvider = new Map<string, string | null>();
  if (serviceIds.length) {
    const { data, error } = await supabase
      .from("services")
      .select("id,prix,disponible,actif,provider_id")
      .in("id", serviceIds);
    if (error) return { lines: [], error: error.message };
    const rows = (data ?? []) as {
      id?: string;
      prix?: unknown;
      disponible?: boolean | null;
      actif?: boolean | null;
      provider_id?: string | null;
    }[];
    const seen = new Set<string>();
    for (const row of rows) {
      const id = String(row.id ?? "");
      if (!id) continue;
      seen.add(id);
      if (row.disponible === false || row.actif === false) {
        return { lines: [], error: "Prestation indisponible" };
      }
      servicePrice.set(id, Number(row.prix ?? 0));
      serviceProvider.set(id, row.provider_id ?? null);
    }
    for (const id of serviceIds) {
      if (!seen.has(id)) return { lines: [], error: "Prestation introuvable" };
    }
  }

  const lines: Line[] = [];
  for (const raw of items) {
    const line = { ...raw } as Line;
    const k = kindOf(line);
    const sid = String(line.id ?? "");
    if (k === "product") {
      const row = productRow.get(sid);
      if (!row) return { lines: [], error: "Produit introuvable" };
      const hasVariants = row.has_variants === true && variantsFromRow(row).length > 0;
      const variantId = variantIdFromLine(line);
      let unit = effectivePriceFromRow(row as {
        prix?: unknown;
        promo?: boolean | null;
        promo_pct?: unknown;
        promo_starts_at?: string | null;
        promo_ends_at?: string | null;
      });
      if (hasVariants && variantId) {
        const variant = findVariant(row, variantId);
        if (!variant) return { lines: [], error: "Variante introuvable" };
        unit = applyPromoToBase(variant.prix, row as {
          promo?: boolean | null;
          promo_pct?: unknown;
          promo_starts_at?: string | null;
          promo_ends_at?: string | null;
        });
        line.variant_id = variant.id;
        line.variant_label = variant.label;
      } else {
        delete line.variant_id;
        delete line.variant_label;
      }
      line.price = unit;
      line.prix = unit;
      // Never trust client-supplied seller identity.
      line.vendeur_id = row.vendeur_id ?? null;
      if (row.vendeur_nom != null && String(row.vendeur_nom) !== "") {
        line.vendeur_nom = row.vendeur_nom;
      }
      if (row.ville != null && line.ville == null) {
        line.ville = row.ville;
      }
    } else if (k === "service") {
      const p = servicePrice.get(sid);
      if (p !== undefined) {
        line.price = p;
        line.prix = p;
      }
      const providerId = serviceProvider.get(sid);
      if (providerId !== undefined) {
        line.provider_id = providerId;
      }
    }
    lines.push(line);
  }

  return { lines };
}
