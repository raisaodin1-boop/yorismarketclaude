// Génère sitemap.xml au prebuild — URLs alignées sur src/lib/seoRoutes.js
import { createClient } from "@supabase/supabase-js";
import { loadEnv } from "vite";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import {
  SEO_CITIES,
  METIER_SLUG_TO_CATEGORY,
  PAGE_PATH,
  buildEntitySlug,
  categoryToSlug,
  localePath,
} from "../src/lib/seoRoutes.js";
import { CATS } from "../src/lib/constants.js";
import { MERCH_HUB_SLUGS } from "../src/lib/merchHubs.js";
import {
  PROGRAMMATIC_SITEMAP_PATHS,
  getBlogGuidePaths,
} from "../src/lib/seoProgrammatic.js";
import {
  SUPABASE_PROJECT_URL,
  SUPABASE_ANON_PUBLISHABLE_KEY,
} from "../src/lib/supabaseDefaults.js";

const today = new Date().toISOString().split("T")[0];

/** Résout URL + clé pour Node : process.env > fichiers .env (Vite) > défauts projet (même source que le client). */
function resolveSupabaseConfig() {
  const cwd = process.cwd();
  const fromProd = loadEnv("production", cwd, "");
  const fromDev = loadEnv("development", cwd, "");

  const urlCandidates = [
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_URL,
    fromProd.VITE_SUPABASE_URL,
    fromProd.SUPABASE_URL,
    fromDev.VITE_SUPABASE_URL,
    fromDev.SUPABASE_URL,
    SUPABASE_PROJECT_URL,
  ].filter(Boolean);

  const url = urlCandidates[0] ?? SUPABASE_PROJECT_URL;
  const explicitAnon =
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    fromProd.VITE_SUPABASE_ANON_KEY ||
    fromProd.SUPABASE_ANON_KEY ||
    fromDev.VITE_SUPABASE_ANON_KEY ||
    fromDev.SUPABASE_ANON_KEY;

  const anonKey = explicitAnon || SUPABASE_ANON_PUBLISHABLE_KEY;

  /** D’où vient au moins la clé utilisée pour l’écriture du log */
  let sourceHint;
  if (explicitAnon) {
    const fromProcess =
      Boolean(process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY);
    const fromDotenvFiles = Boolean(
      fromProd.VITE_SUPABASE_ANON_KEY ||
        fromProd.SUPABASE_ANON_KEY ||
        fromDev.VITE_SUPABASE_ANON_KEY ||
        fromDev.SUPABASE_ANON_KEY
    );
    if (fromProcess) sourceHint = "env CI/shell ou export manuel";
    else if (fromDotenvFiles) sourceHint = "fichier .env / .env.local (loadEnv Vite)";
    else sourceHint = "env ou .env";
  } else {
    sourceHint = "supabaseDefaults.js (identique au client SPA — aucune variable requise en local)";
  }

  return { url, anonKey, sourceHint };
}

const DEFAULT_PUBLIC_SITE = "https://www.yorix.cm";

/** Base URL absolue pour les `<loc>` du sitemap (aligné sur VITE_PUBLIC_SITE_URL côté front). */
function resolvePublicSiteUrl() {
  const cwd = process.cwd();
  const fromProd = loadEnv("production", cwd, "");
  const fromDev = loadEnv("development", cwd, "");
  const u =
    process.env.VITE_PUBLIC_SITE_URL ||
    fromProd.VITE_PUBLIC_SITE_URL ||
    fromDev.VITE_PUBLIC_SITE_URL ||
    "";
  const s = String(u).trim().replace(/\/$/, "");
  return s || DEFAULT_PUBLIC_SITE;
}

function urlEntry(siteBase, loc, lastmod, priority, changefreq) {
  return `  <url>
    <loc>${siteBase}${loc}</loc>
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

const SITEMAP_LANGS = ["fr", "en"];

async function fetchProducts(supabase) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("id, name_fr, created_at")
      .or("actif.eq.true,actif.is.null")
      .limit(2000);
    if (error) {
      console.warn(`⚠️ Sitemap — produits: ${error.message} (${error.code ?? "sans code"})`);
      return [];
    }
    return data || [];
  } catch (err) {
    console.warn("⚠️ Sitemap — produits (exception réseau):", err.message);
    return [];
  }
}

async function fetchServices(supabase) {
  try {
    const { data, error } = await supabase
      .from("services")
      .select("id, provider_nom, created_at")
      .eq("actif", true)
      .limit(1000);
    if (error) {
      console.warn(`⚠️ Sitemap — services: ${error.message} (${error.code ?? "sans code"})`);
      return [];
    }
    return data || [];
  } catch (err) {
    console.warn("⚠️ Sitemap — services (exception réseau):", err.message);
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

function merchHubUrls() {
  return MERCH_HUB_SLUGS.map((slug) => [`/${slug}`, "0.9", "daily"]);
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
  const { url, anonKey, sourceHint } = resolveSupabaseConfig();
  const siteBase = resolvePublicSiteUrl();
  console.log(`ℹ️ Sitemap — connexion Supabase (${sourceHint})`);

  const supabase = createClient(url, anonKey);
  const products = await fetchProducts(supabase);
  const services = await fetchServices(supabase);

  const urls = [];

  for (const lang of SITEMAP_LANGS) {
    for (const [pathBare, pr, ch] of staticSeoPages) {
      const loc = !pathBare || pathBare === "" ? localePath(lang, "/") : localePath(lang, pathBare);
      urls.push(urlEntry(siteBase, loc, today, pr, ch));
    }
  }

  for (const seoPath of PROGRAMMATIC_SITEMAP_PATHS) {
    urls.push(urlEntry(siteBase, seoPath, today, "0.92", "weekly"));
  }
  for (const lang of SITEMAP_LANGS) {
    for (const guidePath of getBlogGuidePaths()) {
      urls.push(urlEntry(siteBase, localePath(lang, guidePath), today, "0.82", "monthly"));
    }
  }

  for (const lang of SITEMAP_LANGS) {
    for (const u of cityUrls()) {
      urls.push(urlEntry(siteBase, localePath(lang, u.loc), today, u.pr, u.ch));
    }
  }

  for (const lang of SITEMAP_LANGS) {
    for (const row of categoryUrls()) {
      urls.push(urlEntry(siteBase, localePath(lang, row[0]), today, row[1], row[2]));
    }
  }

  for (const lang of SITEMAP_LANGS) {
    for (const row of merchHubUrls()) {
      urls.push(urlEntry(siteBase, localePath(lang, row[0]), today, row[1], row[2]));
    }
  }

  for (const lang of SITEMAP_LANGS) {
    for (const m of metierVilleUrls()) {
      urls.push(urlEntry(siteBase, localePath(lang, m[0]), today, m[1], m[2]));
    }
  }

  for (const lang of SITEMAP_LANGS) {
    for (const p of products) {
      const slug = buildEntitySlug(p.name_fr || "produit", p.id);
      urls.push(
        urlEntry(
          siteBase,
          localePath(lang, `/produit/${slug}`),
          (p.created_at || today).split("T")[0],
          "0.72",
          "weekly"
        )
      );
    }
  }

  for (const lang of SITEMAP_LANGS) {
    for (const s of services) {
      const slug = buildEntitySlug(s.provider_nom || "prestataire", `real-${s.id}`);
      urls.push(
        urlEntry(
          siteBase,
          localePath(lang, `/prestataire/${slug}`),
          (s.created_at || today).split("T")[0],
          "0.68",
          "weekly"
        )
      );
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  const publicDir = join(process.cwd(), "public");
  if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });

  writeFileSync(join(publicDir, "sitemap.xml"), xml);
  console.log(
    `✅ sitemap.xml — ${urls.length} URLs (produits: ${products.length}, services: ${services.length})`
  );
}

generate().catch((err) => {
  console.error("❌ sitemap:", err);
  process.exit(0);
});
