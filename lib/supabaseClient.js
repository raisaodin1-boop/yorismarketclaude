import { createClient } from "@supabase/supabase-js";

// 🔥 CONFIG FIXE (temporaire pour corriger l’erreur)
const SUPABASE_URL = "https://msrymchhhxitdevthvdi.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_yJj7JNdn-r19Pjc070IOBg_y2VzGJXA";

// 🚀 Création du client Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
