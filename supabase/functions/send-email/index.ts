import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { corsHeaders, ok } from "../_shared/cors.ts";

const RESEND_API = "https://api.resend.com/emails";

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 254;
}

function normalizeEmail(s: string): string {
  return s.trim().toLowerCase();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const resendKey = Deno.env.get("RESEND_API_KEY") ?? "";
  if (!resendKey) {
    console.error("send-email: RESEND_API_KEY manquant (secret Edge)");
    return new Response(JSON.stringify({ success: false, error: "Service email non configuré" }), {
      status: 503,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
  const authHeader = req.headers.get("Authorization") ?? "";

  if (!authHeader.replace(/^Bearer\s+/i, "").trim()) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr || !user?.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: { to?: unknown; subject?: unknown; html?: unknown; from?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "JSON invalide" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const to = typeof body.to === "string" ? body.to : "";
  const subject = typeof body.subject === "string" ? body.subject.slice(0, 240) : "";
  const html = typeof body.html === "string" ? body.html.slice(0, 400000) : "";

  if (!isValidEmail(to) || !subject.trim() || !html.trim()) {
    return new Response(JSON.stringify({ error: "Payload invalide" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const toNorm = normalizeEmail(to);
  const userEmail = normalizeEmail(user.email);

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const role = typeof profile?.role === "string" ? profile.role : "buyer";
  const isAdmin = role === "admin" || role === "superadmin";

  if (toNorm !== userEmail && !isAdmin) {
    return new Response(
      JSON.stringify({ error: "Interdit : envoi réservé à votre propre adresse ou comptes staff" }),
      { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  const resendFrom = Deno.env.get("RESEND_FROM") ?? "Yorix <onboarding@resend.dev>";

  const res = await fetch(RESEND_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resendFrom,
      to: [toNorm],
      subject: subject.trim(),
      html,
    }),
  });

  const json = (await res.json().catch(() => ({}))) as { id?: string; message?: string };
  if (!res.ok) {
    console.error("send-email Resend:", res.status, json);
    return new Response(
      JSON.stringify({ success: false, error: json?.message || "Échec envoi" }),
      { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  return ok({ success: true, id: json.id });
});
