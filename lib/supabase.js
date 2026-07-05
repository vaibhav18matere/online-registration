import { createClient } from "@supabase/supabase-js";

let supabaseClient = null;

export function getSupabase() {
  if (supabaseClient !== null) {
    return supabaseClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is required. Add it to your environment variables (e.g. in Vercel project settings)."
    );
  }

  if (!supabaseAnonKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY is required. Add it to your environment variables (e.g. in Vercel project settings)."
    );
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseClient;
}
