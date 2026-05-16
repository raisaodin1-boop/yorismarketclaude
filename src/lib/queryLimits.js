/**
 * Plafonds par défaut pour les listes Supabase (évite scans illimités côté client).
 * Ajuster selon la volumétrie ; pagination « suivant » peut s’appuyer sur .range(from, to).
 */

export const DASHBOARD_ORDERS_LIMIT = 200;
export const DASHBOARD_PRODUCTS_LIMIT = 300;
export const CATALOG_PRODUCTS_LIMIT = 300;
export const DASHBOARD_SERVICES_LIMIT = 200;
export const CHAT_CONVERSATIONS_LIMIT = 120;
export const CHAT_MESSAGES_LIMIT = 400;
export const LOYALTY_CATALOG_LIMIT = 80;
