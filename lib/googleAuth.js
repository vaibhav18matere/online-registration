export async function signInWithGoogle(supabase, redirectPath) {
  const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectPath)}`;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    throw error;
  }
}
