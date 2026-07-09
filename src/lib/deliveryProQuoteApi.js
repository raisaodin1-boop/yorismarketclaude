import { supabase } from "./supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateDeliveryProQuoteForm(form) {
  const errors = {};
  const shopName = String(form.shop_name || "").trim();
  const ownerName = String(form.owner_name || "").trim();
  const phone = String(form.phone || "").trim();
  const email = String(form.email || "").trim();

  if (!shopName) errors.shop_name = "Nom de la boutique obligatoire";
  if (!ownerName) errors.owner_name = "Nom du chef d'entreprise obligatoire";
  if (!phone || phone.replace(/\D/g, "").length < 9) errors.phone = "Téléphone obligatoire (9 chiffres min.)";
  if (!email) errors.email = "Email obligatoire";
  else if (!EMAIL_RE.test(email)) errors.email = "Email invalide";
  const city = String(form.city || "").trim();
  const address = String(form.address || "").trim();
  if (!city) errors.city = "Ville obligatoire";
  if (!address) errors.address = "Adresse obligatoire";
  if (!form.monthly_volume) errors.monthly_volume = "Volume mensuel obligatoire";
  if (!form.driver_mode || !["assigned", "pool"].includes(form.driver_mode)) {
    errors.driver_mode = "Choisissez un mode de livraison";
  }
  return errors;
}

export async function submitDeliveryProQuote(form, userId = null) {
  const errors = validateDeliveryProQuoteForm(form);
  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const row = {
    user_id: userId || null,
    shop_name: form.shop_name.trim(),
    owner_name: form.owner_name.trim(),
    phone: form.phone.trim(),
    email: form.email.trim().toLowerCase(),
    city: form.city.trim(),
    address: form.address.trim(),
    monthly_volume: form.monthly_volume,
    driver_mode: form.driver_mode,
    notes: form.notes?.trim() || null,
    status: "pending",
  };

  const { data, error } = await supabase.from("delivery_pro_quotes").insert(row).select("id").single();
  if (error) throw error;
  return { ok: true, id: data?.id, errors: {} };
}

export async function updateDeliveryProQuoteStatus(id, status, adminNotes) {
  const { error } = await supabase
    .from("delivery_pro_quotes")
    .update({
      status,
      admin_notes: adminNotes?.trim() || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw error;
}
