# Yorix Hybrid Marketplace Audit Baseline

## Current Tables Seen in Code
- `orders`
- `deliveries`
- `services`
- `profiles`
- `wallets`
- `notifications`
- `messages`
- `prestataires`

## Added Migration Targets
- `checkout_intents`: canonique pour le checkout dynamique.
- `confirm_checkout` (Edge) : après insertion des commandes produit en livraison (hors **pickup**), insertion auto dans `deliveries` + codes `YX-*` renvoyés dans `delivery_tracking`.
- `checkout_return_status` (Edge) : retour depuis CinetPay — JWT + vérif acheteur, sync statut `/payment/check` si `pending`, lecture `delivery_tracking`; appel depuis `CheckoutPage` (`?status=return&tx=YRXPAY-…`).
- `order_items`: découplage des lignes commande.
- `service_bookings`: réservation prestation avec statut dédié.
- `payment_transactions`: traçabilité fournisseur paiement.
- `wallet_transactions`: ledger financier non ambigu.
- `admin_finance_kpis` view: KPI agrégés côté SQL.

## Status Model Canonique
- Product order: `pending -> validee -> livre`
- Delivery: `commande_recue -> preparation -> collecte -> en_route -> livre`
- Service booking: `reserved -> accepted -> en_cours -> termine`
- Payment: `pending -> paid|failed`
- Escrow: `pending -> securise -> libere|rembourse`

## Zero Regression Strategy
- Keep legacy WhatsApp path available.
- Additive migration only (`IF NOT EXISTS`).
- Frontend now supports universal cart while preserving previous product cart behavior.
- Checkout route `/checkout` introduced without breaking existing pages.

## Production checklist (Supabase)

1. **Migrations** — Après merge : `supabase db push` (ou pipeline CI vers prod). Vérifier que `checkout_intents` n’a plus d’écritures RLS client (voir `20260512_checkout_intents_service_only_writes.sql`).
2. **Edge Functions** — Déployer : `create_checkout_intent`, `confirm_checkout`, `init_payment_cinetpay`, `webhook_cinetpay`, `dispatch_notification`. Secrets : `SUPABASE_*`, `SUPABASE_ANON_KEY` (auth JWT Edge), `CINETPAY_*`, `APP_BASE_URL`, VAPID / notification si utilisés.
3. **Dashboard Supabase** — Database → **Advisors / Performance / Security** : appliquer les recommandations (index manquants, RLS, extension `*_rls`).
4. **RLS Advisor** — S’assurer que les tables financières n’acceptent pas d’UPDATE côté `authenticated` sur des colonnes critiques si le métier passe par Edge (patterns type `*_admin_only`).
5. **Webhooks paiement** — `notify_url` doit pointer vers `{SUPABASE_URL}/functions/v1/webhook_cinetpay` ; tester un paiement test et vérifier `payment_transactions` + `orders.payment_status`.
6. **Smoke test checkout** — Panier réel → intent → confirmation COD / CinetPay ; vérifier que les montants en base alignent catalogue (pas le JSON navigateur).

### Index intents (voir migration `20260513_checkout_intents_indexes.sql`)

- `(customer_id, status)` où `customer_id` non null — requêtes type « mes paniers » / admin par client.
- `(status, created_at desc)` — file d’intents récents, monitoring.

