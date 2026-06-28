export const CREDIT_CONSENT_VERSION = "1.0";

/**
 * Score interne Yorix (0–100) — pas un score bancaire.
 * Nécessite consentement explicite.
 */
export function computeCreditScore(orders = [], { consented = false } = {}) {
  if (!consented) {
    return {
      consented: false,
      score: null,
      tier: null,
      factors: [],
      summaryFr: "Activez Yorix Credit Score pour voir votre profil de confiance.",
      summaryEn: "Enable Yorix Credit Score to see your trust profile.",
    };
  }

  const list = Array.isArray(orders) ? orders : [];
  let score = 40;
  const factors = [];

  const completed = list.filter((o) =>
    ["livre", "validee", "completed", "delivered"].includes(String(o.status || "").toLowerCase()) ||
    String(o.livraison_status || "").toLowerCase() === "livre",
  );
  const cancelled = list.filter((o) =>
    ["annulee", "cancelled", "canceled"].includes(String(o.status || "").toLowerCase()),
  );

  if (completed.length >= 10) {
    score += 18;
    factors.push({ key: "orders", impact: 18, labelFr: `${completed.length} commandes honorées`, labelEn: `${completed.length} completed orders` });
  } else if (completed.length >= 3) {
    score += 10;
    factors.push({ key: "orders", impact: 10, labelFr: `${completed.length} commandes honorées`, labelEn: `${completed.length} completed orders` });
  } else if (completed.length > 0) {
    score += 4;
    factors.push({ key: "orders", impact: 4, labelFr: `${completed.length} commande(s) honorée(s)`, labelEn: `${completed.length} completed order(s)` });
  }

  const onTime = completed.filter((o) => String(o.livraison_status || "").toLowerCase() === "livre");
  if (onTime.length >= 5) {
    score += 12;
    factors.push({ key: "delivery", impact: 12, labelFr: "Livraisons confirmées", labelEn: "Confirmed deliveries" });
  }

  const paid = list.filter((o) => o.montant > 0 && !cancelled.find((c) => c.id === o.id));
  if (paid.length >= 5) {
    score += 10;
    factors.push({ key: "payments", impact: 10, labelFr: "Historique de paiements régulier", labelEn: "Regular payment history" });
  }

  if (cancelled.length > completed.length && cancelled.length >= 2) {
    score -= 15;
    factors.push({ key: "cancels", impact: -15, labelFr: "Annulations fréquentes", labelEn: "Frequent cancellations" });
  }

  if (list.length === 0) {
    score = 50;
    factors.push({ key: "new", impact: 0, labelFr: "Nouveau profil — score neutre", labelEn: "New profile — neutral score" });
  }

  score = Math.max(10, Math.min(99, Math.round(score)));

  let tier = "starter";
  if (score >= 80) tier = "trusted";
  else if (score >= 65) tier = "solid";
  else if (score >= 50) tier = "building";

  const tierFr = { trusted: "Profil de confiance élevé", solid: "Profil solide", building: "En progression", starter: "Débutant" }[tier];
  const tierEn = { trusted: "High trust profile", solid: "Solid profile", building: "Building", starter: "Starter" }[tier];

  return {
    consented: true,
    score,
    tier,
    tierLabelFr: tierFr,
    tierLabelEn: tierEn,
    factors,
    summaryFr: `Votre Yorix Credit Score est de ${score}/100 — ${tierFr}. Ce score interne facilite l'accès à certains services Yorix (pas un crédit bancaire).`,
    summaryEn: `Your Yorix Credit Score is ${score}/100 — ${tierEn}. This internal score helps access select Yorix services (not a bank credit score).`,
  };
}
