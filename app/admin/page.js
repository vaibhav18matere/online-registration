"use client";

import { useEffect, useState } from "react";
import { Box, Button, Chip, Paper, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { getSupabase } from "../../lib/supabase";
import { RegistrationsDataGrid } from "../../components/RegistrationsDataGrid";
import {
  errorTextClass,
  fieldClass,
  inputBase,
  labelClass,
  primaryButtonClass,
  sectionClass,
  spinnerClass,
} from "../../lib/uiClasses";

function AdminLoginCard({ title, description, children }) {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: 420,
        p: { xs: 3.5, sm: 5 },
        borderRadius: 3,
        border: "1px solid rgba(59, 130, 246, 0.25)",
        bgcolor: "background.paper",
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.35)",
      }}
    >
      <Chip label="Staff Portal" size="small" color="primary" variant="outlined" sx={{ mb: 1.5 }} />
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {description}
      </Typography>
      {children}
    </Paper>
  );
}

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initError, setInitError] = useState(null);

  useEffect(() => {
    let authSubscription = null;

    async function initAuth() {
      try {
        const supabase = getSupabase();
        const { data } = await supabase.auth.getSession();
        setSession(data.session);

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
          setSession(newSession);
        });
        authSubscription = authListener.subscription;
      } catch (error) {
        setInitError(error instanceof Error ? error.message : "Unable to connect to Supabase.");
      } finally {
        setCheckingSession(false);
      }
    }

    initAuth();

    return () => {
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    if (session) {
      fetchRegistrations();
    }
  }, [session]);

  async function fetchRegistrations() {
    setLoading(true);
    const { data, error } = await getSupabase()
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) {
      setRegistrations(data);
    }
    setLoading(false);
  }

  async function handleLogin(event) {
    event.preventDefault();
    setLoginError(null);
    setLoggingIn(true);
    const { error } = await getSupabase().auth.signInWithPassword({ email, password });
    if (error) {
      setLoginError(error.message);
    }
    setLoggingIn(false);
  }

  async function handleLogout() {
    await getSupabase().auth.signOut();
  }

  const pageClass =
    "max-w-[1400px] mx-auto w-full px-3 sm:px-6 pb-12 sm:pb-16 pt-5 sm:pt-8";

  if (checkingSession) {
    return (
      <main className={pageClass}>
        <div className="flex flex-col items-center justify-center gap-4 py-10 sm:py-16 text-text-muted text-sm">
          <div
            className="w-9 h-9 border-3 border-line border-t-red rounded-full animate-spin"
            aria-hidden="true"
          />
          <span>Checking session...</span>
        </div>
      </main>
    );
  }

  if (initError) {
    return (
      <main className={pageClass}>
        <div className="flex items-center justify-center min-h-[calc(100dvh-220px)] py-6 sm:py-12 px-3 sm:px-6">
          <AdminLoginCard title="Configuration Required" description={initError}>
            <Typography variant="body2" color="text.secondary">
              In Vercel, add <strong>NEXT_PUBLIC_SUPABASE_URL</strong> and{" "}
              <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY</strong>, then trigger a new deployment.
            </Typography>
          </AdminLoginCard>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className={pageClass}>
        <div className="flex items-center justify-center min-h-[calc(100dvh-220px)] py-6 sm:py-12 px-3 sm:px-6">
          <AdminLoginCard
            title="Admin Login"
            description="Sign in to view and manage student registration submissions."
          >
            <form onSubmit={handleLogin}>
              <div className={fieldClass}>
                <label htmlFor="admin-email" className={labelClass}>
                  Email
                </label>
                <input
                  id="admin-email"
                  type="email"
                  className={inputBase}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@example.com"
                  required
                />
              </div>
              <div className={fieldClass}>
                <label htmlFor="admin-password" className={labelClass}>
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  className={inputBase}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              {loginError && <div className={`${errorTextClass} mb-4`}>{loginError}</div>}
              <button type="submit" className={`${primaryButtonClass} w-full!`} disabled={loggingIn}>
                {loggingIn && <span className={spinnerClass} aria-hidden="true" />}
                {loggingIn ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </AdminLoginCard>
        </div>
      </main>
    );
  }

  return (
    <main className={pageClass}>
      <Paper
        elevation={0}
        className={sectionClass}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
          bgcolor: "background.paper",
          border: "1px solid rgba(59, 130, 246, 0.25)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 0.5 }}>
              Registrations
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            <Chip label={`${registrations.length} total`} color="primary" variant="filled" />
            <Button
              variant="outlined"
              color="primary"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ borderRadius: 2 }}
            >
              Log out
            </Button>
          </Box>
        </Box>
      </Paper>

      {loading ? (
        <div className="flex flex-col items-center justify-center gap-4 py-10 sm:py-16 text-text-muted text-sm">
          <div
            className="w-9 h-9 border-3 border-line border-t-red rounded-full animate-spin"
            aria-hidden="true"
          />
          <span>Loading submissions...</span>
        </div>
      ) : (
        <RegistrationsDataGrid registrations={registrations} />
      )}
    </main>
  );
}
