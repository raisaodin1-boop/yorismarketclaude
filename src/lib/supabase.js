import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://msrymchhhxitdevthvdi.supabase.co",
  "sb_publishable_yJj7JNdn-r19Pjc070IOBg_y2VzGJXA"
);

export const COMMISSION_RATE = 0.05;
export const YORIX_WA_NUMBER = "237696565654";
export const MOMO_NUMBER = "676935195";
export const ORANGE_NUMBER = "696565654";
export const PAYMENT_WA_NUMBER = "237696565654";
export const LIVRAISON_FEE = 1500;
export const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dulwb03nf";
export const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "yorix_unsigned";
export const SUPABASE_ANON_KEY = "sb_publishable_yJj7JNdn-r19Pjc070IOBg_y2VzGJXA";
