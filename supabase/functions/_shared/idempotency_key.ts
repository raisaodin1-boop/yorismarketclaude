/**
 * Clé acceptée par `checkout_idempotency.key` (type uuid Postgres).
 *
 * Le contrôle historique `^[0-9a-fA-F-]{16,}$` laissait passer
 * `${timestamp}-${userId}` envoyé par l'app mobile. Postgres rejetait
 * l'INSERT (invalid input syntax for type uuid) et confirm_checkout
 * répondait 500 avant toute création de commande.
 * Une clé non conforme est ignorée : le checkout continue, sans
 * déduplication, au lieu de casser le paiement.
 */
export function isCheckoutIdempotencyKey(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    value,
  );
}
