import { createClient } from "@supabase/supabase-js";
import {
  SUPABASE_PROJECT_URL,
  SUPABASE_ANON_PUBLISHABLE_KEY,
} from "../src/lib/supabaseDefaults.js";

const viteUrl =
  typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_SUPABASE_URL;
const viteKey =
  typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = viteUrl || SUPABASE_PROJECT_URL;
const supabaseAnonKey = viteKey || SUPABASE_ANON_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
