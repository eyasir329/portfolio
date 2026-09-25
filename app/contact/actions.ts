"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { contactSchema, type ContactState } from "@/lib/contact/schema";
import { getAdminClient } from "@/lib/supabase/admin";
import { env } from "@/lib/env";
import { profile } from "@/content/profile";

export async function sendMessage(_prev: ContactState, form: FormData): Promise<ContactState> {
  const raw = Object.fromEntries(
    ["name", "email", "subject", "message", "website"].map((k) => [k, String(form.get(k) ?? "")]),
  );
  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    if (fieldErrors.website) return { status: "sent", name: raw.name ?? "", email: raw.email ?? "", message: "" }; // bot: pretend success
    return { status: "error", message: "A few things need fixing before sending.", fieldErrors, values: raw };
  }

  const { name, email, subject, message } = parsed.data;
  const supabase = getAdminClient();
  if (!supabase) {
    const body = encodeURIComponent(`${message}\n\n— ${name} <${email}>`);
    return {
      status: "unconfigured",
      mailto: `mailto:${profile.email}?subject=${encodeURIComponent(subject || `Hello from ${name}`)}&body=${body}`,
    };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const ipHash = createHash("sha256")
    .update(`${env.CONTACT_IP_SALT ?? "dev-salt"}:${ip}`)
    .digest("hex");

  // Simple rate limit: at most 3 messages per hour from the same (hashed) address.
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("messages")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);
  if ((count ?? 0) >= 3) {
    return {
      status: "error",
      message: "You’ve sent a few messages already. Please try again in an hour, or email me directly.",
      values: raw,
    };
  }

  const { error } = await supabase.from("messages").insert({
    name,
    email,
    subject: subject || null,
    body: message,
    ip_hash: ipHash,
    user_agent: h.get("user-agent")?.slice(0, 300) ?? null,
  });
  if (error) {
    return {
      status: "error",
      message: "Couldn’t send. Check your connection and try again. Nothing was lost.",
      values: raw,
    };
  }
  return { status: "sent", name, email, message };
}
