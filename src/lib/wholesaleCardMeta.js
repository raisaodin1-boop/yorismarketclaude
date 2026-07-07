import { parseWholesaleTiers, resolveWholesaleUnitPrice, isImportProduct, formatLeadTime } from "./importWholesale.js";
import { productMoq } from "./productMoq.js";

/** Prix unitaire gros pour affichage carte (MOQ ou premier palier). */
export function wholesaleUnitPriceForCard(product) {
  const moq = Math.max(1, Number(product?.min_qty_gros) || productMoq(product));
  return resolveWholesaleUnitPrice(product, moq);
}

/** Résumé prix détail vs gros pour vignettes B2B. */
export function wholesalePriceSummary(product) {
  const retail = Number(product?.prix) || 0;
  const moq = Math.max(1, Number(product?.min_qty_gros) || productMoq(product));
  const wholesale = wholesaleUnitPriceForCard(product);
  if (!wholesale || wholesale <= 0) return null;
  const savingsPct =
    retail > wholesale && retail > 0 ? Math.round((1 - wholesale / retail) * 100) : null;
  return { retail, wholesale, moq, savingsPct };
}

/** Prochain palier de prix gros (effet « groupage » visuel). */
export function nextWholesaleTierHint(product, locale = "fr") {
  const tiers = parseWholesaleTiers(product);
  if (tiers.length < 2) return null;
  const moq = Math.max(1, Number(product?.min_qty_gros) || tiers[0].min_qty || 1);
  const next = tiers.find((t) => t.min_qty > moq);
  if (!next) return null;
  const remaining = next.min_qty - moq;
  if (remaining <= 0) return null;
  const isEn = locale === "en";
  return {
    remaining,
    nextQty: next.min_qty,
    nextPrice: next.unit_price,
    label: isEn
      ? `${remaining} more to unlock ${next.unit_price.toLocaleString()} FCFA`
      : `Encore ${remaining} pcs → ${next.unit_price.toLocaleString()} FCFA`,
    progressPct: Math.min(85, Math.round((moq / next.min_qty) * 100)),
  };
}

/** Encart logistique import (honête selon incoterm). */
export function importLogisticsHint(product, locale = "fr") {
  if (!isImportProduct(product)) return null;
  const isEn = locale === "en";
  const inc = String(product?.incoterm || "FOB").toUpperCase();
  let customs;
  if (inc === "DDP") {
    customs = isEn ? "Customs included" : "Dédouanement inclus";
  } else if (inc === "CIF") {
    customs = isEn ? "Freight + insurance" : "Fret + assurance";
  } else {
    customs = isEn ? "Customs per incoterm" : "Douane selon incoterm";
  }
  return {
    lead: formatLeadTime(product?.lead_time_days, locale),
    incoterm: inc,
    customs,
    escrow: isEn ? "Pay Yorix — factory paid at Douala port" : "Payez Yorix — usine payée au port de Douala",
    mediation: isEn ? "Yorix mediation · WhatsApp" : "Médiation Yorix · WhatsApp",
  };
}

export function buildWholesaleWhatsAppText(product, locale = "fr") {
  const name = product?.name_fr || "Produit";
  const summary = wholesalePriceSummary(product);
  const moq = summary?.moq || productMoq(product);
  const wholesale = summary?.wholesale;
  const isEn = locale === "en";
  const priceLine = wholesale
    ? isEn
      ? `Wholesale (${moq}+): ${wholesale.toLocaleString("fr-FR")} FCFA/unit`
      : `Gros (${moq}+): ${wholesale.toLocaleString("fr-FR")} FCFA/unité`
    : "";
  const base = isEn
    ? `Hello Yorix! B2B quote request:\n${name}${priceLine ? `\n${priceLine}` : ""}\nEscrow until delivery confirmed.`
    : `Bonjour Yorix ! Demande devis gros :\n${name}${priceLine ? `\n${priceLine}` : ""}\nEscrow jusqu'à confirmation livraison.`;
  return base;
}
