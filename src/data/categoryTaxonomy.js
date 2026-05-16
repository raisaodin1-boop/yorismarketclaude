/**
 * Taxonomie Yorix — 15 catégories principales + sous-catégories.
 * Source de vérité frontend (repli si Supabase indisponible) + miroir des seeds SQL.
 */

/** @typedef {{ slug: string, name_fr: string, name_en: string, icon?: string, sort_order?: number, children?: SubCat[] }} ParentCat */
/** @typedef {{ slug: string, name_fr: string, name_en: string, sort_order?: number }} SubCat */

/** @type {ParentCat[]} */
export const CATEGORY_TAXONOMY = [
  {
    slug: "electronique-technologie",
    name_fr: "Électronique & Technologie",
    name_en: "Electronics & Technology",
    icon: "📱",
    sort_order: 10,
    children: [
      { slug: "smartphones", name_fr: "Smartphones", name_en: "Smartphones" },
      { slug: "ordinateurs-portables", name_fr: "Ordinateurs portables", name_en: "Laptops" },
      { slug: "tablettes", name_fr: "Tablettes", name_en: "Tablets" },
      { slug: "televiseurs", name_fr: "Téléviseurs", name_en: "TVs" },
      { slug: "accessoires-tech", name_fr: "Accessoires tech", name_en: "Tech accessories" },
      { slug: "gaming", name_fr: "Gaming & consoles", name_en: "Gaming & consoles" },
      { slug: "photo-video", name_fr: "Photo & vidéo", name_en: "Photo & video" },
    ],
  },
  {
    slug: "electromenager",
    name_fr: "Électroménager",
    name_en: "Home Appliances",
    icon: "🔌",
    sort_order: 20,
    children: [
      { slug: "gros-electromenager", name_fr: "Gros électroménager", name_en: "Major appliances" },
      { slug: "petit-electromenager", name_fr: "Petit électroménager", name_en: "Small appliances" },
      { slug: "climatisation", name_fr: "Climatisation", name_en: "Air conditioning" },
      { slug: "cuisine-electro", name_fr: "Cuisine électro", name_en: "Kitchen appliances" },
    ],
  },
  {
    slug: "maison-cuisine",
    name_fr: "Maison & Cuisine",
    name_en: "Home & Kitchen",
    icon: "🏠",
    sort_order: 30,
    children: [
      { slug: "meubles", name_fr: "Meubles", name_en: "Furniture" },
      { slug: "decoration", name_fr: "Décoration", name_en: "Home decor" },
      { slug: "ustensiles-cuisine", name_fr: "Ustensiles cuisine", name_en: "Kitchenware" },
      { slug: "literie", name_fr: "Literie", name_en: "Bedding" },
      { slug: "jardin-bricolage", name_fr: "Jardin & bricolage", name_en: "Garden & DIY" },
    ],
  },
  {
    slug: "mode-beaute",
    name_fr: "Mode & Beauté",
    name_en: "Fashion & Beauty",
    icon: "👗",
    sort_order: 40,
    children: [
      { slug: "vetements-femme", name_fr: "Vêtements femme", name_en: "Women's clothing" },
      { slug: "vetements-homme", name_fr: "Vêtements homme", name_en: "Men's clothing" },
      { slug: "chaussures", name_fr: "Chaussures", name_en: "Shoes" },
      { slug: "sacs-accessoires", name_fr: "Sacs & accessoires", name_en: "Bags & accessories" },
      { slug: "cosmetiques", name_fr: "Cosmétiques", name_en: "Cosmetics" },
      { slug: "bijoux", name_fr: "Bijoux", name_en: "Jewelry" },
    ],
  },
  {
    slug: "sante-bien-etre",
    name_fr: "Santé & Bien-être",
    name_en: "Health & Wellness",
    icon: "💊",
    sort_order: 50,
    children: [
      { slug: "parapharmacie", name_fr: "Parapharmacie", name_en: "OTC health" },
      { slug: "complements", name_fr: "Compléments", name_en: "Supplements" },
      { slug: "hygiene", name_fr: "Hygiène", name_en: "Hygiene" },
      { slug: "materiel-medical", name_fr: "Matériel médical", name_en: "Medical equipment" },
    ],
  },
  {
    slug: "automobile-moto",
    name_fr: "Automobile & Moto",
    name_en: "Automotive & Motorcycles",
    icon: "🚗",
    sort_order: 60,
    children: [
      { slug: "pieces-auto", name_fr: "Pièces auto", name_en: "Car parts" },
      { slug: "accessoires-auto", name_fr: "Accessoires auto", name_en: "Car accessories" },
      { slug: "motos", name_fr: "Motos & scooters", name_en: "Motorcycles" },
      { slug: "entretien-auto", name_fr: "Entretien auto", name_en: "Car maintenance" },
    ],
  },
  {
    slug: "immobilier",
    name_fr: "Immobilier",
    name_en: "Real Estate",
    icon: "🏢",
    sort_order: 70,
    children: [
      { slug: "appartements", name_fr: "Appartements", name_en: "Apartments" },
      { slug: "maisons", name_fr: "Maisons", name_en: "Houses" },
      { slug: "terrains", name_fr: "Terrains", name_en: "Land" },
      { slug: "locations", name_fr: "Locations", name_en: "Rentals" },
      { slug: "bureaux-commerces", name_fr: "Bureaux & commerces", name_en: "Commercial property" },
    ],
  },
  {
    slug: "services",
    name_fr: "Services",
    name_en: "Services",
    icon: "🛠️",
    sort_order: 80,
    children: [
      { slug: "livraison-svc", name_fr: "Livraison", name_en: "Delivery" },
      { slug: "plomberie-svc", name_fr: "Plomberie", name_en: "Plumbing" },
      { slug: "electricite-svc", name_fr: "Électricité", name_en: "Electrical" },
      { slug: "nettoyage-svc", name_fr: "Nettoyage", name_en: "Cleaning" },
      { slug: "informatique-svc", name_fr: "Informatique", name_en: "IT services" },
      { slug: "beaute-services", name_fr: "Beauté & coiffure", name_en: "Beauty services" },
    ],
  },
  {
    slug: "emploi",
    name_fr: "Emploi & Opportunités",
    name_en: "Jobs & Opportunities",
    icon: "💼",
    sort_order: 90,
    children: [
      { slug: "offres-emploi", name_fr: "Offres d'emploi", name_en: "Job offers" },
      { slug: "stages", name_fr: "Stages", name_en: "Internships" },
      { slug: "freelance", name_fr: "Freelance", name_en: "Freelance" },
      { slug: "bourses", name_fr: "Bourses & concours", name_en: "Scholarships" },
    ],
  },
  {
    slug: "agriculture",
    name_fr: "Agriculture & Agrobusiness",
    name_en: "Agriculture & Agribusiness",
    icon: "🌾",
    sort_order: 100,
    children: [
      { slug: "semences", name_fr: "Semences", name_en: "Seeds" },
      { slug: "intrants", name_fr: "Intrants", name_en: "Farm inputs" },
      { slug: "elevage", name_fr: "Élevage", name_en: "Livestock" },
      { slug: "materiel-agricole", name_fr: "Matériel agricole", name_en: "Farm equipment" },
      { slug: "produits-agricoles", name_fr: "Produits agricoles", name_en: "Farm produce" },
    ],
  },
  {
    slug: "alimentation",
    name_fr: "Alimentation",
    name_en: "Food & Groceries",
    icon: "🍽️",
    sort_order: 110,
    children: [
      { slug: "epicerie", name_fr: "Épicerie", name_en: "Groceries" },
      { slug: "frais", name_fr: "Produits frais", name_en: "Fresh food" },
      { slug: "boissons", name_fr: "Boissons", name_en: "Beverages" },
      { slug: "produits-locaux", name_fr: "Produits locaux", name_en: "Local products" },
    ],
  },
  {
    slug: "bebe-enfants",
    name_fr: "Bébé & Enfants",
    name_en: "Baby & Kids",
    icon: "🍼",
    sort_order: 120,
    children: [
      { slug: "puericulture", name_fr: "Puériculture", name_en: "Baby care" },
      { slug: "jouets", name_fr: "Jouets", name_en: "Toys" },
      { slug: "vetements-enfants", name_fr: "Vêtements enfants", name_en: "Kids clothing" },
      { slug: "mobilier-bebe", name_fr: "Mobilier bébé", name_en: "Baby furniture" },
    ],
  },
  {
    slug: "education",
    name_fr: "Éducation & Formation",
    name_en: "Education & Training",
    icon: "📚",
    sort_order: 130,
    children: [
      { slug: "livres", name_fr: "Livres", name_en: "Books" },
      { slug: "fournitures", name_fr: "Fournitures scolaires", name_en: "School supplies" },
      { slug: "cours-formations", name_fr: "Cours & formations", name_en: "Courses" },
      { slug: "informatique-education", name_fr: "Informatique éducation", name_en: "EdTech" },
    ],
  },
  {
    slug: "evenements",
    name_fr: "Événements",
    name_en: "Events",
    icon: "🎉",
    sort_order: 140,
    children: [
      { slug: "mariage", name_fr: "Mariage", name_en: "Weddings" },
      { slug: "fetes", name_fr: "Fêtes & anniversaires", name_en: "Parties" },
      { slug: "decoration-evenement", name_fr: "Décoration événement", name_en: "Event decor" },
      { slug: "location-materiel", name_fr: "Location matériel", name_en: "Equipment rental" },
    ],
  },
  {
    slug: "industrie-btp",
    name_fr: "Industrie & Entreprise",
    name_en: "Industry & Business",
    icon: "🏗️",
    sort_order: 150,
    children: [
      { slug: "materiaux", name_fr: "Matériaux BTP", name_en: "Building materials" },
      { slug: "equipements", name_fr: "Équipements pro", name_en: "Professional equipment" },
      { slug: "outillage", name_fr: "Outillage", name_en: "Tools" },
      { slug: "securite-travail", name_fr: "Sécurité au travail", name_en: "Work safety" },
    ],
  },
];

/** Anciens libellés CATS → slug parent */
export const LEGACY_CAT_TO_PARENT_SLUG = {
  "Téléphones & HighTech": "electronique-technologie",
  "Mode & Accessoires": "mode-beaute",
  Alimentation: "alimentation",
  "Maison & Decoration": "maison-cuisine",
  Agricole: "agriculture",
  "Beauté & Soins": "mode-beaute",
  BTP: "industrie-btp",
  Automobile: "automobile-moto",
  Éducation: "education",
  Services: "services",
  Autre: "electronique-technologie",
};

/** Slugs racine pour SEO / sitemap */
export const ROOT_CATEGORY_SLUGS = CATEGORY_TAXONOMY.map((c) => c.slug);

export function flattenTaxonomyToRows() {
  const rows = [];
  for (const parent of CATEGORY_TAXONOMY) {
    rows.push({
      id: `tax-${parent.slug}`,
      parent_id: null,
      parent_slug: null,
      slug: parent.slug,
      name_fr: parent.name_fr,
      name_en: parent.name_en,
      icon: parent.icon || "📦",
      sort_order: parent.sort_order ?? 0,
      category_type: "product",
      category_kind: "standard",
      active: true,
      is_featured_homepage: parent.sort_order <= 40,
    });
    for (let i = 0; i < (parent.children || []).length; i++) {
      const ch = parent.children[i];
      rows.push({
        id: `tax-${parent.slug}-${ch.slug}`,
        parent_id: `tax-${parent.slug}`,
        parent_slug: parent.slug,
        slug: ch.slug,
        name_fr: ch.name_fr,
        name_en: ch.name_en,
        icon: parent.icon || "📦",
        sort_order: (parent.sort_order ?? 0) + i + 1,
        category_type: "product",
        category_kind: "standard",
        active: true,
        is_featured_homepage: false,
      });
    }
  }
  return rows;
}

export function buildCategoryTree(flatRows) {
  const byId = new Map();
  const roots = [];
  for (const r of flatRows) {
    byId.set(r.id, { ...r, children: [] });
  }
  for (const r of flatRows) {
    const node = byId.get(r.id);
    if (r.parent_id && byId.has(r.parent_id)) {
      byId.get(r.parent_id).children.push(node);
    } else if (!r.parent_id) {
      roots.push(node);
    }
  }
  const sortNodes = (list) => {
    list.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
    list.forEach((n) => sortNodes(n.children || []));
  };
  sortNodes(roots);
  return roots;
}

export function findCategoryInFlat(flat, { slug, parentSlug } = {}) {
  if (!slug) return null;
  if (parentSlug) {
    return (
      flat.find((r) => r.slug === slug && r.parent_slug === parentSlug) ||
      flat.find((r) => r.slug === slug && r.parent_id)
    );
  }
  const roots = flat.filter((r) => !r.parent_id);
  const rootHit = roots.find((r) => r.slug === slug);
  if (rootHit) return rootHit;
  return flat.find((r) => r.slug === slug) || null;
}

export function categoryBrowsePath(parentSlug, subSlug) {
  if (subSlug && parentSlug) return `/categories/${parentSlug}/${subSlug}`;
  if (parentSlug) return `/${parentSlug}`;
  return "/produits";
}

export function getRootCategoryLabels(locale = "fr") {
  return CATEGORY_TAXONOMY.map((c) => (locale === "en" ? c.name_en : c.name_fr));
}
