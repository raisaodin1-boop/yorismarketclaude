// scripts/generate-sitemap.js
// Génère sitemap.xml à chaque build Vercel
// Exécuté via "prebuild" dans package.json

import { createClient } from "@supabase/supabase-js";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const SUPABASE_URL = "https://msrymchhhxitdevthvdi.supabase.co";
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const SITE_URL = "https://yorix.cm";

const today = new Date().toISOString().split("T")[0];

// Pages statiques
const staticPages = [
  { loc: "/",                    priority: "1.0", changefreq: "daily" },
  { loc: "/?page=produits",      priority: "0.9", changefreq: "daily" },
  { loc: "/?page=livraison",     priority: "0.8", changefreq: "weekly" },
  { loc: "/?page=escrow",        priority: "0.7", changefreq: "monthly" },
  { loc: "/?page=prestataires",  priority: "0.8", changefreq: "weekly" },
  { loc: "/?page=business",      priority: "0.7", changefreq: "monthly" },
  { loc: "/?page=academy",       priority: "0.7", changefreq: "weekly" },
  { loc: "/?page=blog",          priority: "0.7", changefreq: "weekly" },
  { loc: "/?page=loyalty",       priority: "0.6", changefreq: "monthly" },
  { loc: "/?page=contact",       priority: "0.5", changefreq: "monthly" },
  { loc: "/?page=aide",          priority: "0.5", changefreq: "monthly" },
  { loc: "/?page=cgv",           priority: "0.3", changefreq: "yearly" },
  { loc: "/?page=mentions",      priority: "0.3", changefreq: "yearly" },
  { loc: "/?page=confidentialite", priority: "0.3", changefreq: "yearly" },
];

async function fetchProducts() {
  if (!SUPABASE_ANON_KEY) {
    console.warn("⚠️ Pas de clé Supabase, sitemap sans produits");
    return [];
  }
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data } = await supabase
      .from("products")
      .select("id, name_fr, updated_at")
      .or("actif.eq.true,actif.is.null")
      .limit(1000);
    return data || [];
  } catch (err) {
    console.warn("⚠️ Erreur produits:", err.message);
    return [];
  }
}

function urlEntry(loc, lastmod, priority, changefreq) {
  return `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function generate() {
  const products = await fetchProducts();
  const urls = [
    ...staticPages.map(p => urlEntry(p.loc, today, p.priority, p.changefreq)),
    ...products.map(p => urlEntry(
      `/?page=produits&id=${p.id}`,
      (p.updated_at || today).split("T")[0],
      "0.7",
      "weekly"
    )),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  const publicDir = join(process.cwd(), "public");
  if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });

  writeFileSync(join(publicDir, "sitemap.xml"), xml);
  console.log(`✅ sitemap.xml généré avec ${urls.length} URLs`);
}

generate().catch(err => {
  console.error("❌ Erreur génération sitemap:", err);
  process.exit(0); // Ne bloque pas le build
});
