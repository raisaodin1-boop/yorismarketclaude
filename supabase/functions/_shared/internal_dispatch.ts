/**
 * Appelle l’Edge Function `dispatch_notification` avec la service role
 * (même projet). À utiliser uniquement depuis d’autres Edge Functions
 * (jamais depuis le navigateur — pas de fuite de secret).
 */
export async function dispatchNotificationById(notificationId: string): Promise<{ ok: boolean; status: number; body: string }> {
  const base = (Deno.env.get("SUPABASE_URL") ?? "").replace(/\/$/, "");
  const sr = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  if (!base || !sr || !notificationId) {
    return { ok: false, status: 0, body: "missing env or notificationId" };
  }
  const url = `${base}/functions/v1/dispatch_notification`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sr}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ notification_id: notificationId }),
  });
  const body = await res.text();
  return { ok: res.ok, status: res.status, body };
}
