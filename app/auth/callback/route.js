import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function readSupabaseEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  return { supabaseUrl, supabaseAnonKey };
}

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const nextPath = searchParams.get("next") || "/dashboard";

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_auth_code`);
  }

  const { supabaseUrl, supabaseAnonKey } = readSupabaseEnv();
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.redirect(`${origin}/login?error=supabase_not_configured`);
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
  }

  const safeNextPath = nextPath.startsWith("/") ? nextPath : "/dashboard";
  return NextResponse.redirect(`${origin}${safeNextPath}`);
}
