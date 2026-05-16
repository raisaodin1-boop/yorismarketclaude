/**
 * Valeurs par défaut du projet Supabase (clé « publishable », exposée côté client avec RLS).
 * Pour la prod ou après rotation de clé : définir `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`
 * dans `.env.local` / secrets CI — ne pas committer de clés sensibles hors publishable.
 *
 * Source unique pour le front (`supabase.js`) et le script Node `generate-sitemap.js`.
 */
export const SUPABASE_PROJECT_URL = "https://msrymchhhxitdevthvdi.supabase.co";

export const SUPABASE_ANON_PUBLISHABLE_KEY =
  "sb_publishable_yJj7JNdn-r19Pjc070IOBg_y2VzGJXA";
