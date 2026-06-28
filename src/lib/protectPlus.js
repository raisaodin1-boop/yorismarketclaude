/**
 * Yorix Protect+ — score de confiance annonce (MVP règles métier).
 */
export function computeProtectPlus(product, context = {}) {
  if (!product) {
    return emptyProtect(0, "low");
  }

  let score = 42;
  const factors = [];

  const add = (impact, key, labelFr, labelEn) => {
    score += impact;
    factors.push({ key, impact, labelFr, labelEn });
  };

  if (product.vendeur_verifie || product.verifie) {
    add(22, "seller_verified", "Vendeur vérifié Yorix", "Yorix verified seller");
  }
  if (product.vendeur_id) {
    add(8, "seller_linked", "Vendeur identifié sur la plateforme", "Seller linked on platform");
  } else {
    add(-18, "no_seller", "Vendeur non identifié", "Seller not identified");
  }

  const sales = Number(product.vente_total) || 0;
  if (sales >= 30) add(14, "sales_high", `${sales}+ ventes`, `${sales}+ sales`);
  else if (sales >= 5) add(8, "sales_mid", `${sales} ventes`, `${sales} sales`);

  const hasImage = Boolean(product.image?.startsWith?.("http")) ||
    (Array.isArray(product.image_urls) && product.image_urls.length > 0);
  if (hasImage) add(8, "photos", "Photos réelles", "Real photos");
  else add(-12, "no_photos", "Sans photo", "No photo");

  const desc = String(product.description_fr || "").trim();
  if (desc.length >= 40) add(6, "description", "Description détaillée", "Detailed description");
  else if (desc.length < 8) add(-8, "thin_desc", "Description insuffisante", "Thin description");

  if (product.escrow) add(10, "escrow", "Paiement escrow disponible", "Escrow payment available");
  if (product.sponsorise) add(4, "sponsored", "Boutique mise en avant", "Featured store");

  const note = Number(context.avgReviewNote ?? product.note) || 0;
  const reviews = Number(context.reviewsCount) || Number(product.nombre_avis) || 0;
  if (reviews >= 3 && note >= 4) add(10, "reviews", `Note ${note}/5 (${reviews} avis)`, `Rating ${note}/5 (${reviews} reviews)`);
  else if (reviews > 0 && note < 3) add(-12, "bad_reviews", "Avis clients faibles", "Low customer reviews");

  const prix = Number(product.prix) || 0;
  const median = context.categoryMedianPrice;
  if (median && prix > 0) {
    if (prix < median * 0.35) {
      add(-22, "price_suspicious", "Prix anormalement bas", "Suspiciously low price");
    } else if (prix <= median * 1.15) {
      add(6, "price_fair", "Prix cohérent avec le marché", "Fair market price");
    }
  }

  if (product.actif === false) add(-30, "inactive", "Annonce inactive", "Inactive listing");

  score = Math.max(5, Math.min(99, Math.round(score)));

  let level = "moderate";
  if (score >= 85) level = "excellent";
  else if (score >= 70) level = "good";
  else if (score < 50) level = "low";

  return {
    score,
    level,
    factors: factors.filter((f) => Math.abs(f.impact) >= 4),
    labelFr: `Annonce fiable à ${score} %`,
    labelEn: `Listing trust score ${score}%`,
  };
}

function emptyProtect(score, level) {
  return {
    score,
    level,
    factors: [],
    labelFr: `Annonce fiable à ${score} %`,
    labelEn: `Listing trust score ${score}%`,
  };
}

export function protectLevelColor(level) {
  switch (level) {
    case "excellent":
      return "#16a34a";
    case "good":
      return "#0891b2";
    case "moderate":
      return "#d97706";
    default:
      return "#dc2626";
  }
}
