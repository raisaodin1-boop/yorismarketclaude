import fs from "fs";

const p = new URL("../src/YorixApp.jsx", import.meta.url);
let s = fs.readFileSync(p, "utf8");
const nl = s.includes("\r\n") ? "\r\n" : "\n";
const start = `<RouteErrorBoundary resetKeys={[page, location.pathname]}>${nl}`;
const end = `</RouteErrorBoundary>`;
const i = s.indexOf(start);
const j = s.indexOf(end, i);
if (i < 0 || j < 0) {
  console.error("rb", i, j);
  process.exit(1);
}
const inner = `${start}        <YorixPages ctx={pagesCtx} />${nl}      ${end}`;
const out = s.slice(0, i) + inner + s.slice(j + end.length);
fs.writeFileSync(p, out);
console.log("pages boundary", i, j);
