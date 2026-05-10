// Génère sitemap.xml au prebuild — URLs alignées sur src/lib/seoRoutes.js
import { createClient } from "@supabase/supabase-js";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import {
  SITE_URL,
  SEO_CITIES,
  METIER_SLUG_TO_CATEGORY,
  PAGE_PATH,
  buildEntitySlug,
  categoryToSlug,
} from "../src/lib/seoRoutes.js";
import { CATS } from "../src/lib/constants.js";

const SUPABASE_URL = "https://msrymchhhxitdevthvdi.supabase.co";
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const today = new Date().toISOString().split("T")[0];

function urlEntry(loc, lastmod, priority, changefreq) {
  return `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const staticSeoPages = [
  ["", "1.0", "daily"],
  [PAGE_PATH.produits, "0.95", "daily"],
  [PAGE_PATH.livraison, "0.9", "weekly"],
  [PAGE_PATH.prestataires, "0.9", "weekly"],
  [PAGE_PATH.escrow, "0.85", "weekly"],
  [PAGE_PATH.business, "0.85", "monthly"],
  [PAGE_PATH.academy, "0.8", "weekly"],
  [PAGE_PATH.blog, "0.75", "weekly"],
  [PAGE_PATH.loyalty, "0.65", "monthly"],
  [PAGE_PATH.contact, "0.7", "monthly"],
  [PAGE_PATH.aide, "0.75", "monthly"],
  [PAGE_PATH.faq, "0.8", "weekly"],
  [PAGE_PATH.cgv, "0.4", "yearly"],
  [PAGE_PATH.mentions, "0.4", "yearly"],
  [PAGE_PATH.confidentialite, "0.4", "yearly"],
  [PAGE_PATH.inscription, "0.75", "monthly"],
  [PAGE_PATH.devenirVendeur, "0.8", "monthly"],
  [PAGE_PATH.devenirLivreur, "0.8", "monthly"],
];

async function fetchProducts() {
  if (!SUPABASE_ANON_KEY) return [];
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data } = await supabase
      .from("products")
      .select("id, name_fr, updated_at")
      .or("actif.eq.true,actif.is.null")
      .limit(2000);
    return data || [];
  } catch (err) {
    console.warn("⚠️ Erreur produits sitemap:", err.message);
    return [];
  }
}

async function fetchServices() {
  if (!SUPABASE_ANON_KEY) return [];
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data } = await supabase
      .from("services")
      .select("id, provider_nom, created_at")
      .eq("actif", true)
      .limit(1000);
    return data || [];
  } catch {
    return [];
  }
}

function cityUrls() {
  const out = [];
  for (const c of SEO_CITIES) {
    out.push({ loc: `/${c.slug}`, pr: "0.88", ch: "weekly" });
    out.push({ loc: `/acheter-a-${c.slug}`, pr: "0.87", ch: "weekly" });
    out.push({ loc: `/livraison-a-${c.slug}`, pr: "0.87", ch: "weekly" });
    out.push({ loc: `/prestataires-a-${c.slug}`, pr: "0.87", ch: "weekly" });
    out.push({ loc: `/livraison/${c.slug}`, pr: "0.86", ch: "weekly" });
  }
  return out;
}

function categoryUrls() {
  return CATS.filter(Boolean).map((cat) => [
    `/categories/${categoryToSlug(cat)}`,
    "0.82",
    "weekly",
  ]);
}

/** Combinaisons métier × ville (indexation locale scalable) */
function metierVilleUrls() {
  const out = [];
  const villes = ["douala", "yaounde", "bafoussam", "bamenda", "garoua", "kribi"];
  for (const m of Object.keys(METIER_SLUG_TO_CATEGORY)) {
    for (const v of villes) {
      out.push([`/prestataires/${m}/${v}`, "0.78", "weekly"]);
    }
  }
  return out;
}


async function generate() {
  const products = await fetchProducts();
  const services = await fetchServices();

  const urls = [];

  for (const [path, pr, ch] of staticSeoPages) {
    urls.push(urlEntry(path || "/", today, pr, ch));
  }

  for (const u of cityUrls()) {
    urls.push(urlEntry(u.loc, today, u.pr, u.ch));
  }

  for (const row of categoryUrls()) {
    urls.push(urlEntry(row[0], today, row[1], row[2]));
  }

  for (const m of metierVilleUrls()) {
    urls.push(urlEntry(m[0], today, m[1], m[2]));
  }

  for (const p of products) {
    const slug = buildEntitySlug(p.name_fr || "produit", p.id);
    urls.push(
      urlEntry(
        `/produit/${slug}`,
        (p.updated_at || today).split("T")[0],
        "0.72",
        "weekly"
      )
    );
  }

  for (const s of services) {
    const slug = buildEntitySlug(s.provider_nom || "prestataire", `real-${s.id}`);
    urls.push(
      urlEntry(
        `/prestataire/${slug}`,
        (s.created_at || today).split("T")[0],
        "0.68",
        "weekly"
      )
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  const publicDir = join(process.cwd(), "public");
  if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });

  writeFileSync(join(publicDir, "sitemap.xml"), xml);
  console.log(`✅ sitemap.xml — ${urls.length} URLs (produits: ${products.length}, services: ${services.length})`);
}

generate().catch((err) => {
  console.error("❌ sitemap:", err);
  process.exit(0);
});
