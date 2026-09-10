/** Public parcel tracking: code-gated RPC, never a full deliveries SELECT. */

export const PUBLIC_DELIVERY_TRACK_RPC = "fn_public_track_delivery";

export const PUBLIC_DELIVERY_TRACK_COLUMNS = [
  "id",
  "code_suivi",
  "statut",
  "adresse_collecte",
  "adresse_livraison",
  "livreur_nom",
  "livreur_tel",
  "livreur_vehicule",
  "livreur_note",
  "distance_km",
  "temps_estime_min",
  "commande_at",
  "assigne_at",
  "accepte_at",
  "preparation_at",
  "collecte_at",
  "en_route_at",
  "livre_at",
].join(",");

function isMissingRpc(error) {
  const msg = String(error?.message || error?.details || "");
  return /function|does not exist|schema cache|PGRST202/i.test(msg);
}

export async function fetchPublicDeliveryByCode(client, code) {
  const searchCode = String(code || "").trim().toUpperCase();
  if (!searchCode) {
    return { data: null, error: new Error("empty_code") };
  }

  const rpc = await client.rpc(PUBLIC_DELIVERY_TRACK_RPC, { p_code: searchCode });
  if (!rpc.error) {
    return { data: rpc.data || null, error: null };
  }
  if (!isMissingRpc(rpc.error)) {
    return { data: null, error: rpc.error };
  }

  return client
    .from("deliveries")
    .select(PUBLIC_DELIVERY_TRACK_COLUMNS)
    .eq("code_suivi", searchCode)
    .maybeSingle();
}
