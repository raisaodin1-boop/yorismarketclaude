import fs from "fs";

const p = new URL("../src/YorixApp.jsx", import.meta.url);
let s = fs.readFileSync(p, "utf8");
const nl = s.includes("\r\n") ? "\r\n" : "\n";
const start =
  `      {/* ── EN-TÊTE STICKY (marketplace fluide desktop + mobile) ── */}${nl}      <div className={\`header-sticky-stack`;
const end = `      </div>{/* /.header-sticky-stack */}`;
const i = s.indexOf(start);
const j = s.indexOf(end, i);
if (i < 0 || j < 0) {
  console.error("markers", i, j);
  process.exit(1);
}
const rep = `      {/* ── EN-TÊTE STICKY (marketplace fluide desktop + mobile) ── */}${nl}      <YorixHeader${nl}        navCompact={navCompact}${nl}        dark={dark}${nl}        setDark={setDark}${nl}        user={user}${nl}        userData={userData}${nl}        userRole={userRole}${nl}        goPage={goPage}${nl}        filterCat={filterCat}${nl}        setFilterCat={setFilterCat}${nl}        search={search}${nl}        setSearch={setSearch}${nl}        produits={produits}${nl}        setOnboardingOpen={setOnboardingOpen}${nl}        setNotifOpen={setNotifOpen}${nl}        unread={unread}${nl}        totalQty={totalQty}${nl}        setAuthTab={setAuthTab}${nl}        setAuthOpen={setAuthOpen}${nl}        setSelectedRole={setSelectedRole}${nl}        doLogout={doLogout}${nl}        navQuickRef={navQuickRef}${nl}        navQuickOpen={navQuickOpen}${nl}        setNavQuickOpen={setNavQuickOpen}${nl}        TABS={TABS}${nl}        tabActive={tabActive}${nl}        commerceDeliveryPolicy={commerceDeliveryPolicy}${nl}        roleChipClass={roleChipClass}${nl}      />`;
fs.writeFileSync(p, s.slice(0, i) + rep + s.slice(j + end.length));
console.log("patched header", i, j);
