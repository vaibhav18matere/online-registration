import { createClient } from "@supabase/supabase-js";

let supabaseClient = null;

function readSupabaseEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  return { supabaseUrl, supabaseAnonKey };
}

export function isSupabaseConfigured() {
  const { supabaseUrl, supabaseAnonKey } = readSupabaseEnv();
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getSupabase() {
  if (supabaseClient !== null) {
    return supabaseClient;
  }

  const { supabaseUrl, supabaseAnonKey } = readSupabaseEnv();

  if (!supabaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is missing. Add it in Vercel → Project Settings → Environment Variables, then redeploy."
    );
  }

  if (!supabaseAnonKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY is missing. Add it in Vercel → Project Settings → Environment Variables, then redeploy."
    );
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseClient;
}
