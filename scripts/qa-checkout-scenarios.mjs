const scenarios = [
  {
    name: "product_only",
    cart: [{ id: "p1", kind: "product", qty: 2, prix: 15000 }],
    expect: { subtotal: 30000, delivery: 1500, total: 31500, type: "product_only" },
  },
  {
    name: "service_only",
    cart: [{ id: "s1", kind: "service", qty: 1, prix: 10000 }],
    expect: { subtotal: 10000, delivery: 0, total: 10000, type: "service_only" },
  },
  {
    name: "mixed",
    cart: [
      { id: "p2", kind: "product", qty: 1, prix: 60000 },
      { id: "s2", kind: "service", qty: 1, prix: 5000 },
    ],
    expect: { subtotal: 65000, delivery: 0, total: 65000, type: "mixed" },
  },
];

function detectCheckoutType(items) {
  const hasProduct = items.some((i) => i.kind === "product");
  const hasService = items.some((i) => i.kind === "service");
  if (hasProduct && hasService) return "mixed";
  if (hasService) return "service_only";
  return "product_only";
}

function summary(items) {
  const productsSubtotal = items.filter((i) => i.kind === "product").reduce((s, i) => s + i.prix * i.qty, 0);
  const servicesSubtotal = items.filter((i) => i.kind === "service").reduce((s, i) => s + i.prix * i.qty, 0);
  const subtotal = productsSubtotal + servicesSubtotal;
  const delivery = productsSubtotal > 0 && productsSubtotal < 50000 ? 1500 : 0;
  return { subtotal, delivery, total: subtotal + delivery };
}

let failures = 0;
for (const s of scenarios) {
  const type = detectCheckoutType(s.cart);
  const got = summary(s.cart);
  const pass =
    type === s.expect.type &&
    got.subtotal === s.expect.subtotal &&
    got.delivery === s.expect.delivery &&
    got.total === s.expect.total;
  if (!pass) {
    failures += 1;
    console.error(`[FAIL] ${s.name}`, { got: { ...got, type }, expect: s.expect });
  } else {
    console.log(`[OK] ${s.name}`);
  }
}

if (failures > 0) {
  process.exit(1);
}

console.log("QA checkout scenarios passed.");

