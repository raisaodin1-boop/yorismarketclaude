/** Création livraison automatique — aligné sur helpers.js (genererCodeSuivi / creerLivraisonAutomatique). */

type DbClient = {
  from: (t: string) => {
    insert: (data: Record<string, unknown>) => {
      select: () => {
        single: () => Promise<{ data: unknown; error: { message: string } | null }>;
      };
    };
  };
};

/** Format YX-XXXXX comme le front historique. */
export function generateTrackingCode(): string {
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  const timestamp = Date.now().toString(36).slice(-3).toUpperCase();
  return `YX-${random}${timestamp}`;
}

export type AutoDeliveryInput = {
  orderId: string;
  clientNom: string;
  clientTel: string;
  adresseLivraison: string;
  adresseCollecte: string;
  distanceKm?: number;
  tempsEstimeMin?: number;
};

export async function insertAutoDelivery(
  supabase: DbClient,
  input: AutoDeliveryInput,
): Promise<{ code: string }> {
  const distanceKm = input.distanceKm ?? 3.5;
  const tempsEstimeMin = input.tempsEstimeMin ?? 25;
  const now = new Date().toISOString();

  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateTrackingCode();
    const insertData: Record<string, unknown> = {
      code_suivi: code,
      order_id: input.orderId,
      client_nom: input.clientNom,
      client_tel: input.clientTel,
      adresse_livraison: input.adresseLivraison,
      adresse_collecte: input.adresseCollecte || "Boutique Yorix",
      statut: "commande_recue",
      distance_km: distanceKm,
      temps_estime_min: tempsEstimeMin,
      commande_at: now,
    };

    const { error } = await supabase
      .from("deliveries")
      .insert(insertData)
      .select()
      .single();

    if (!error) return { code };
    const msg = error.message || "";
    if (/duplicate|unique|violates unique constraint/i.test(msg)) continue;
    throw error;
  }

  throw new Error("Impossible de générer un code de suivi unique");
}
