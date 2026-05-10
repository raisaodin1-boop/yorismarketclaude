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

