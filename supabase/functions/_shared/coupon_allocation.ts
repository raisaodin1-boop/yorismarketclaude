/**
 * Répartit une remise coupon sur les montants bruts des lignes produit
 * (plus grand reste) afin que la somme des `montant` / `montant_vendeur`
 * n'excède jamais l'encaissement réel (total panier − coupon).
 *
 * La part de coupon qui dépasse le sous-total produits (ex. remise
 * mordant sur les frais de livraison) n'est PAS imputée aux vendeurs :
 * elle reste un coût plateforme hors ledger commandes.
 */

export type OrderFinance = {
  /** Montant ligne après remise (ce que le client paie pour cette ligne). */
  montant: number;
  commission: number;
  montant_vendeur: number;
  /** Remise imputée à cette ligne (FCFA). */
  line_discount: number;
};

/** Répartition entière exacte : sum(result) === min(discount, sum(grosses)). */
export function allocateCouponAcrossGrosses(
  grosses: number[],
  couponDiscount: number,
): number[] {
  const cleaned = (grosses || []).map((g) => Math.max(0, Math.round(Number(g) || 0)));
  const total = cleaned.reduce((s, g) => s + g, 0);
  const discount = Math.max(0, Math.min(Math.round(Number(couponDiscount) || 0), total));
  if (discount === 0 || total === 0 || cleaned.length === 0) {
    return cleaned.map(() => 0);
  }

  const rawShares = cleaned.map((g) => (g / total) * discount);
  const floors = rawShares.map((x) => Math.floor(x));
  let remainder = discount - floors.reduce((s, n) => s + n, 0);

  const byFrac = rawShares
    .map((x, i) => ({ i, frac: x - floors[i] }))
    .sort((a, b) => b.frac - a.frac || a.i - b.i);

  const result = [...floors];
  for (let k = 0; k < remainder; k++) {
    result[byFrac[k % byFrac.length].i] += 1;
  }
  return result;
}

/** Commission 5 % sur le montant déjà remisé (aligné confirm_checkout). */
export function computeOrderFinance(
  gross: number,
  lineDiscount: number,
  commissionRate = 0.05,
): OrderFinance {
  const g = Math.max(0, Math.round(Number(gross) || 0));
  const d = Math.max(0, Math.min(Math.round(Number(lineDiscount) || 0), g));
  const montant = g - d;
  const commission = Math.round(montant * commissionRate);
  return {
    montant,
    commission,
    montant_vendeur: montant - commission,
    line_discount: d,
  };
}
