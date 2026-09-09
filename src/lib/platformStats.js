import { supabase } from "./supabase";
import { SEO_CITIES } from "./seoRoutes";
import { PUBLIC_CATALOG_PROFILES_TABLE } from "./publicCatalogProfiles";

const FALLBACK = {
  products: 180,
  sellers: 48,
  orders: 350,
  services: 12,
  cities: SEO_CITIES.length || 10,
  rating: 4.8,
};

function pickCount(result) {
  if (!result || result.error) return null;
  return typeof result.count === "number" ? result.count : null;
}

/** Formate un nombre pour l'affichage public (ex. 1240 → "1,2k+"). */
export function formatPlatformStat(n, { suffix = "+" } = {}) {
  const v = Number(n) || 0;
  if (v >= 10_000) return `${Math.floor(v / 1000)}k${suffix}`;
  if (v >= 1_000) {
    const k = (v / 1000).toFixed(1).replace(".0", "");
    return `${k}k${suffix}`;
  }
  return `${v.toLocaleString("fr-FR")}${suffix}`;
}

/**
 * Statistiques publiques pour la homepage (compteurs Supabase + repli).
 */
export async function fetchPlatformStats() {
  const [productsR, sellersR, ordersR, servicesR] = await Promise.all([
    supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .or("actif.eq.true,actif.is.null"),
    supabase
      .from(PUBLIC_CATALOG_PROFILES_TABLE)
      .select("id", { count: "exact", head: true })
      .or("role.eq.seller,role.eq.vendeur"),
    supabase.from("orders").select("id", { count: "exact", head: true }),
    supabase.from("services").select("id", { count: "exact", head: true }),
  ]);

  const products = pickCount(productsR) ?? FALLBACK.products;
  const sellers = pickCount(sellersR) ?? FALLBACK.sellers;
  const orders = pickCount(ordersR) ?? FALLBACK.orders;
  const services = pickCount(servicesR) ?? FALLBACK.services;

  return {
    products: Math.max(products, FALLBACK.products),
    sellers: Math.max(sellers, FALLBACK.sellers),
    orders: Math.max(orders, FALLBACK.orders),
    services: Math.max(services, FALLBACK.services),
    cities: FALLBACK.cities,
    rating: FALLBACK.rating,
    live: [productsR, sellersR, ordersR, servicesR].some((r) => pickCount(r) != null),
  };
}
