import { createClient } from "@supabase/supabase-js";
import { checkPaynoteMtnBalance } from "./_lib/paynote.js";

/*
 * Solde du compte marchand MTN MoMo (Paynote) — réservé au superadmin strict
 * (ni admin, ni admin_partner). Donnée financière sensible.
 */

async function getAuthenticatedSuperAdmin(req) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) return null;

  const anon = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  const { data: userData, error: userErr } = await anon.auth.getUser(token);
  if (userErr || !userData?.user) return null;

  const admin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data: profile, error: profileErr } = await admin
    .from("profiles")
    .select("role")
    .eq("id", userData.user.id)
    .maybeSingle();
  if (profileErr || !profile) return null;
  if (profile.role !== "superadmin") return null;

  return userData.user;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const admin = await getAuthenticatedSuperAdmin(req);
  if (!admin) {
    return res.status(403).json({ error: "Accès réservé au super administrateur" });
  }

  try {
    const data = await checkPaynoteMtnBalance();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(502).json({ error: error.message });
  }
}
