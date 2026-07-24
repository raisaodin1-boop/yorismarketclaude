/**
 * Map CinetPay /payment/check `data.status` to our ledger status.
 *
 * Only ACCEPTED is success. Only documented terminal refusals are failures.
 * PENDING / WAITING / empty / unknown must stay pending — otherwise a buyer
 * returning from checkout while MoMo is still processing permanently marks a
 * live charge as failed (and checkout_return_status will not re-check).
 */
const KNOWN_FAILURE_STATUSES = new Set([
  "REFUSED",
  "REJECTED",
  "CANCELED",
  "CANCELLED",
  "FAILED",
  "EXPIRED",
]);

export type CinetPayLedgerStatus = "paid" | "failed" | "pending";

export function mapCinetPayPaymentStatus(rawStatus: unknown): CinetPayLedgerStatus {
  const status = String(rawStatus ?? "").trim().toUpperCase();
  if (status === "ACCEPTED") return "paid";
  if (KNOWN_FAILURE_STATUSES.has(status)) return "failed";
  return "pending";
}
