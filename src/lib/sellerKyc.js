/**
 * Vérification vendeur — catégories, pièces requises, checklist admin.
 */
import { isOtherCountryCode } from "./importWholesale.js";

export const SELLER_CATEGORIES = {
  online: {
    id: "online",
    labelFr: "Vendeur en ligne",
    labelEn: "Online seller",
    icon: "💻",
    descFr: "Vente sans boutique physique — pièce d'identité et localisation d'expédition.",
  },
  physical_store: {
    id: "physical_store",
    labelFr: "Boutique physique",
    labelEn: "Physical store",
    icon: "🏪",
    descFr: "Magasin ou showroom — plan de localisation + justificatif de local.",
  },
  local_business: {
    id: "local_business",
    labelFr: "Entreprise camerounaise",
    labelEn: "Cameroon business",
    icon: "🏢",
    descFr: "SARL, ETS, etc. — RCCM et documents légaux.",
  },
  import_business: {
    id: "import_business",
    labelFr: "Entreprise import",
    labelEn: "Import business",
    icon: "🌏",
    descFr: "Fournisseur international — RCCM du pays d'implantation + 3 pièces de fiabilité.",
  },
};

export const DOC_TYPES = {
  cni_recto: { labelFr: "CNI — Recto", required: true },
  cni_verso: { labelFr: "CNI — Verso", required: false },
  selfie: { labelFr: "Selfie avec CNI", required: true },
  shop_photo: { labelFr: "Photo boutique / façade", required: false },
  shop_plan: { labelFr: "Plan / photo localisation boutique", required: true },
  location_proof: { labelFr: "Justificatif local (bail, impôt, quittance…)", required: true },
  rccm: { labelFr: "RCCM / registre du commerce", required: true },
  legal_doc: { labelFr: "Document légal entreprise", required: false },
  import_proof: { labelFr: "Pièce justificative import", required: false },
};

export const KYC_STATUS_LABELS = {
  draft: "Brouillon",
  pending: "En attente",
  info_requested: "Complément demandé",
  verified: "Vérifié",
  rejected: "Refusé",
};

/** Pièces minimales par catégorie (hors champs texte adresse). */
export function requiredDocTypes(category) {
  switch (category) {
    case "physical_store":
      return ["cni_recto", "selfie", "shop_plan", "location_proof"];
    case "local_business":
      return ["cni_recto", "selfie", "rccm", "legal_doc", "legal_doc"];
    case "import_business":
      return ["cni_recto", "selfie", "rccm", "import_proof", "import_proof", "import_proof"];
    default:
      return ["cni_recto", "selfie"];
  }
}

export function categoryLabel(category, locale = "fr") {
  const c = SELLER_CATEGORIES[category];
  if (!c) return category || "—";
  return locale === "en" ? c.labelEn : c.labelFr;
}

/** Fusionne champs legacy + extra_docs en liste [{ type, url, label }] */
export function collectKycDocuments(kyc) {
  if (!kyc) return [];
  const docs = [];
  const push = (type, url, label) => {
    if (url) docs.push({ type, url, label: label || DOC_TYPES[type]?.labelFr || type });
  };
  push("cni_recto", kyc.doc_url);
  push("cni_verso", kyc.doc_url2);
  push("selfie", kyc.selfie_url);
  push("shop_photo", kyc.shop_photo_url, "Photo boutique");
  const extra = Array.isArray(kyc.extra_docs) ? kyc.extra_docs : [];
  extra.forEach((d) => {
    if (d?.url) docs.push({ type: d.type || "other", url: d.url, label: d.label || DOC_TYPES[d.type]?.labelFr || d.type });
  });
  return docs;
}

export function countDocsByType(docs, type) {
  return docs.filter((d) => d.type === type).length;
}

export function kycChecklist(kyc) {
  const category = kyc?.seller_category || (kyc?.seller_type === "entreprise" ? "local_business" : "online");
  const docs = collectKycDocuments(kyc);
  const required = requiredDocTypes(category);
  const typeCounts = required.reduce((acc, t) => {
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {});

  const items = Object.entries(typeCounts).map(([type, need]) => {
    const have = countDocsByType(docs, type);
    return {
      type,
      label: DOC_TYPES[type]?.labelFr || type,
      need,
      have,
      ok: have >= need,
    };
  });

  const addressOk = Boolean(
    kyc?.city?.trim?.() && kyc?.quartier?.trim?.() && kyc?.address?.trim?.(),
  );
  const mapOk = category === "online"
    ? addressOk
    : addressOk && Boolean(kyc?.location_map_url?.trim?.() || kyc?.shop_photo_url || countDocsByType(docs, "shop_plan") > 0);

  const rccmTextOk = category === "local_business" || category === "import_business"
    ? Boolean(kyc?.rccm?.trim?.() || countDocsByType(docs, "rccm") > 0)
    : true;

  const countryCode = kyc?.business_country_code || kyc?.business_country;
  const countryOther = kyc?.business_country_other;
  const countryOk = category === "local_business" || category === "import_business"
    ? Boolean(countryCode && (!isOtherCountryCode(countryCode) || countryOther?.trim?.()))
    : true;

  const companyOk = category === "local_business" || category === "import_business"
    ? Boolean(kyc?.company_name?.trim?.())
    : true;

  items.push({
    type: "address",
    label: "Adresse complète (ville, quartier, rue)",
    need: 1,
    have: addressOk ? 1 : 0,
    ok: addressOk,
  });

  if (category !== "online") {
    items.push({
      type: "location_map",
      label: "Localisation / plan boutique",
      need: 1,
      have: mapOk ? 1 : 0,
      ok: mapOk,
    });
  }

  if (category === "local_business" || category === "import_business") {
    items.push({
      type: "company_name",
      label: "Raison sociale",
      need: 1,
      have: companyOk ? 1 : 0,
      ok: companyOk,
    });
    items.push({
      type: "rccm_text",
      label: "N° RCCM (pays d'implantation)",
      need: 1,
      have: rccmTextOk ? 1 : 0,
      ok: rccmTextOk,
    });
    items.push({
      type: "business_country",
      label: "Pays RCCM (liste ou Autre précisé)",
      need: 1,
      have: countryOk ? 1 : 0,
      ok: countryOk,
    });
  }

  const complete = items.every((i) => i.ok);
  return { category, items, complete };
}

export function validateKycSubmission(kyc, form, files = {}) {
  const merged = {
    ...kyc,
    ...form,
    doc_url: files.cni_recto ? "pending" : kyc?.doc_url,
    selfie_url: files.selfie ? "pending" : kyc?.selfie_url,
    extra_docs: form.extra_docs || kyc?.extra_docs || [],
  };
  if (files.shop_plan) {
    merged.extra_docs = [...(merged.extra_docs || []), { type: "shop_plan", url: "pending" }];
  }
  if (files.location_proof) {
    merged.extra_docs = [...(merged.extra_docs || []), { type: "location_proof", url: "pending" }];
  }
  if (files.rccm_doc) {
    merged.extra_docs = [...(merged.extra_docs || []), { type: "rccm", url: "pending" }];
  }
  (files.legal_docs || []).forEach(() => {
    merged.extra_docs = [...(merged.extra_docs || []), { type: "legal_doc", url: "pending" }];
  });
  (files.import_proofs || []).forEach(() => {
    merged.extra_docs = [...(merged.extra_docs || []), { type: "import_proof", url: "pending" }];
  });

  const { complete, items } = kycChecklist(merged);
  if (!form.declaration) return { ok: false, message: "Acceptez la déclaration sur l'honneur." };
  if (!form.full_name?.trim?.()) return { ok: false, message: "Nom complet requis." };
  if (!complete) {
    const missing = items.filter((i) => !i.ok).map((i) => i.label).join(", ");
    return { ok: false, message: `Pièces ou informations manquantes : ${missing}` };
  }
  return { ok: true };
}
