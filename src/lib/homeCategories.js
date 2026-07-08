/** 8 univers homepage — spec refonte v1.0 */
export const HOME_UNIVERSES = [
  {
    id: "phones",
    slug: "electronique-technologie",
    icon: "smartphone",
    labelFr: "Téléphones & Tablettes",
    labelEn: "Phones & Tablets",
  },
  {
    id: "fashion",
    slug: "mode-beaute",
    icon: "shirt",
    labelFr: "Mode & Accessoires",
    labelEn: "Fashion & Accessories",
  },
  {
    id: "beauty",
    slug: "sante-bien-etre",
    icon: "sparkles",
    labelFr: "Beauté & Bien-être",
    labelEn: "Beauty & Wellness",
  },
  {
    id: "home",
    slug: "maison-cuisine",
    icon: "sofa",
    labelFr: "Maison & Déco",
    labelEn: "Home & Decor",
  },
  {
    id: "tech",
    slug: "electromenager",
    icon: "laptop",
    labelFr: "Électronique & High-Tech",
    labelEn: "Electronics & Tech",
  },
  {
    id: "food",
    slug: "alimentation",
    icon: "shoppingBag",
    labelFr: "Alimentation",
    labelEn: "Groceries",
  },
  {
    id: "mic",
    hub: "made-in-cameroun",
    icon: "flag",
    labelFr: "Made in Cameroun",
    labelEn: "Made in Cameroon",
  },
  {
    id: "services",
    page: "prestataires",
    icon: "wrench",
    labelFr: "Services",
    labelEn: "Services",
  },
];

export const TRENDING_FILTERS = [
  { id: "all", labelFr: "Tout", labelEn: "All", match: () => true },
  {
    id: "tech",
    labelFr: "Tech",
    labelEn: "Tech",
    match: (p) => /phone|tech|électron|electron|ordi|tablette|smart/i.test(`${p.name_fr} ${p.categorie || ""}`),
  },
  {
    id: "mode",
    labelFr: "Mode",
    labelEn: "Fashion",
    match: (p) => /mode|vetement|vêtement|chaussure|sac|beauté|beauty/i.test(`${p.name_fr} ${p.categorie || ""}`),
  },
  {
    id: "beauty",
    labelFr: "Beauté",
    labelEn: "Beauty",
    match: (p) => /beauté|beauty|cosm|parfum|soin|karité/i.test(`${p.name_fr} ${p.categorie || ""}`),
  },
  {
    id: "home",
    labelFr: "Maison",
    labelEn: "Home",
    match: (p) => /maison|meuble|cuisine|déco|deco|literie/i.test(`${p.name_fr} ${p.categorie || ""}`),
  },
];
