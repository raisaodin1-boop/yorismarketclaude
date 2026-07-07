import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";

const REPLACEMENTS = [
  [/var\(--font-display,\s*["']Syne["'],\s*sans-serif\)/g, "var(--font-display)"],
  [/font-family:\s*['"]Plus Jakarta Sans['"],\s*['"]Syne['"],\s*sans-serif/gi, "font-family:var(--font-display)"],
  [/font-family:\s*['"]Inter['"],\s*['"]DM Sans['"],\s*sans-serif/gi, "font-family:var(--font-body)"],
  [/fontFamily:\s*["']'Syne',sans-serif["']/g, 'fontFamily: "var(--font-display)"'],
  [/fontFamily:\s*["']'DM Sans',sans-serif["']/g, 'fontFamily: "var(--font-body)"'],
  [/font-family:\s*['"]Syne['"],\s*sans-serif/gi, "font-family: var(--font-display)"],
  [/font-family:\s*['"]DM Sans['"],\s*sans-serif/gi, "font-family: var(--font-body)"],
  [/font-family:\s*['"]Syne['"],sans-serif/gi, "font-family:var(--font-display)"],
  [/font-family:\s*['"]DM Sans['"],sans-serif/gi, "font-family:var(--font-body)"],
  [/Inter \(body\) · Plus Jakarta Sans \(headings\) · Syne \(brand\)/g, "Inter (body) · Plus Jakarta Sans (display)"],
  [/Brand elements keep Syne/g, "Brand elements use display font"],
];

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "dist" || name === ".git") continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(jsx|js|css|html)$/.test(name)) out.push(p);
  }
  return out;
}

const files = [
  path.join(ROOT, "index.html"),
  ...walk(path.join(ROOT, "src")),
  ...walk(path.join(ROOT, "public")),
];

let changed = 0;
for (const file of files) {
  let text = fs.readFileSync(file, "utf8");
  const orig = text;
  for (const [re, rep] of REPLACEMENTS) text = text.replace(re, rep);
  if (path.basename(file) === "index.html") {
    text = text.replace(/https:\/\/fonts\.googleapis\.com\/css2\?[^"]+/g, FONT_URL);
  }
  if (text !== orig) {
    fs.writeFileSync(file, text, "utf8");
    changed++;
    console.log("updated:", path.relative(ROOT, file));
  }
}

const remaining = [];
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  if (/(?:'Syne'|"Syne"|DM Sans|DM\+Sans)/i.test(text)) remaining.push(path.relative(ROOT, file));
}

console.log(`\n${changed} file(s) updated.`);
if (remaining.length) {
  console.log("Remaining Syne/DM Sans references:");
  remaining.forEach((f) => console.log(" -", f));
  process.exit(1);
}
