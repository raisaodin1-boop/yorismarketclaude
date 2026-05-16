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

function effectivePriceFromRow(row: {
  prix?: unknown;
  promo?: boolean | null;
  promo_pct?: unknown;
  promo_starts_at?: string | null;
  promo_ends_at?: string | null;
}): number {
  const base = Number(row.prix ?? 0);
  if (!isPromoActiveRow(row)) return Math.round(base);
  const pct = Math.min(100, Math.max(0, Number(row.promo_pct ?? 0)));
  if (pct <= 0) return Math.round(base);
  return Math.round(base * (1 - pct / 100));
}

export async function applyCatalogPricing(
  supabase: SupabaseForCatalog,
  items: Line[],
): Promise<{ lines: Line[]; error?: string }> {
  const productLines = items.filter((i) => kindOf(i) === "product") as Line[];
  const serviceLines = items.filter((i) => kindOf(i) === "service") as Line[];

  const productIds = [...new Set(productLines.map((i) => String(i.id)))];
  const serviceIds = [...new Set(serviceLines.map((i) => String(i.id)))];

  const productPrice = new Map<string, number>();
  if (productIds.length) {
    const { data, error } = await supabase
      .from("products")
      .select("id,prix,actif,promo,promo_pct,promo_starts_at,promo_ends_at")
      .in("id", productIds);
    if (error) return { lines: [], error: error.message };
    const rows = (data ?? []) as {
      id?: string;
      prix?: unknown;
      actif?: boolean | null;
      promo?: boolean | null;
      promo_pct?: unknown;
      promo_starts_at?: string | null;
      promo_ends_at?: string | null;
    }[];
    const seen = new Set<string>();
    for (const row of rows) {
      const id = String(row.id ?? "");
      if (!id) continue;
      seen.add(id);
      if (row.actif === false) return { lines: [], error: "Produit indisponible" };
      productPrice.set(id, effectivePriceFromRow(row));
    }
    for (const id of productIds) {
      if (!seen.has(id)) return { lines: [], error: "Produit introuvable" };
    }
  }

  const servicePrice = new Map<string, number>();
  if (serviceIds.length) {
    const { data, error } = await supabase
      .from("services")
      .select("id,prix,disponible,actif")
      .in("id", serviceIds);
    if (error) return { lines: [], error: error.message };
    const rows = (data ?? []) as {
      id?: string;
      prix?: unknown;
      disponible?: boolean | null;
      actif?: boolean | null;
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
    }
    for (const id of serviceIds) {
      if (!seen.has(id)) return { lines: [], error: "Prestation introuvable" };
    }
  }

  const lines = items.map((raw) => {
    const line = { ...raw } as Line;
    const k = kindOf(line);
    const sid = String(line.id ?? "");
    if (k === "product") {
      const p = productPrice.get(sid);
      if (p !== undefined) {
        line.price = p;
        line.prix = p;
      }
    } else if (k === "service") {
      const p = servicePrice.get(sid);
      if (p !== undefined) {
        line.price = p;
        line.prix = p;
      }
    }
    return line;
  });

  return { lines };
}
