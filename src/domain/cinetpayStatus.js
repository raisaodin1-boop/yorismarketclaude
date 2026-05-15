const FAILED_STATUSES = new Set([
  "CANCELED",
  "CANCELLED",
  "DECLINED",
  "EXPIRED",
  "FAILED",
  "REFUSED",
]);

export function normalizeCinetpayStatus(status) {
  const raw = String(status || "").trim();
  const lower = raw.toLowerCase();
  if (lower === "paid") return "paid";
  if (lower === "failed") return "failed";
  if (lower === "pending") return "pending";

  const upper = raw.toUpperCase();
  if (upper === "ACCEPTED") return "paid";
  if (FAILED_STATUSES.has(upper)) return "failed";
  return "pending";
}

export function isCinetpayPaymentFinalized(status) {
  return normalizeCinetpayStatus(status) === "paid";
}
