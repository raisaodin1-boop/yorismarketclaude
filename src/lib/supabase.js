import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const COMMISSION_RATE = 0.05;
export const YORIX_WA_NUMBER = "237696565654";
export const MOMO_NUMBER = "676935195";
export const ORANGE_NUMBER = "696565654";
export const PAYMENT_WA_NUMBER = "237696565654";
export const LIVRAISON_FEE = 1500;
export const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dulwb03nf";
export const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "yorix_unsigned";
