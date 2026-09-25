import "server-only";
import { createClient } from "@supabase/supabase-js";
import { env, supabaseConfigured } from "@/lib/env";

/**
 * Secret-key client for trusted server code only (Server Actions, route handlers).
 * Never import this from a Client Component (docs/06 §4, DEV-02 §2).
 */
export function getAdminClient() {
  if (!supabaseConfigured) return null;
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.SUPABASE_SECRET_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
