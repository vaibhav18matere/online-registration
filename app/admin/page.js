"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "../../lib/supabase";

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
    if (session) fetchRegistrations();
  }, [session]);

  async function fetchRegistrations() {
    setLoading(true);
    const { data, error } = await getSupabase()
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setRegistrations(data);
    setLoading(false);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError(null);
    setLoggingIn(true);
    const { error } = await getSupabase().auth.signInWithPassword({ email, password });
    if (error) setLoginError(error.message);
    setLoggingIn(false);
  }

  async function handleLogout() {
    await getSupabase().auth.signOut();
  }

  if (checkingSession) {
    return (
      <main className="admin-page">
        <div className="loading-state">
          <div className="loading-spinner" aria-hidden="true" />
          <span>Checking session...</span>
        </div>
      </main>
    );
  }

  if (initError) {
    return (
      <main className="admin-page">
        <div className="admin-login-wrap">
          <div className="admin-login">
            <span className="admin-login-badge">Staff Portal</span>
            <h2>Configuration Required</h2>
            <p className="admin-login-desc">{initError}</p>
            <p className="admin-login-desc">
              In Vercel, add <strong>NEXT_PUBLIC_SUPABASE_URL</strong> and{" "}
              <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY</strong>, then trigger a new deployment.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="admin-page">
        <div className="admin-login-wrap">
          <div className="admin-login">
            <span className="admin-login-badge">Staff Portal</span>
            <h2>Admin Login</h2>
            <p className="admin-login-desc">
              Sign in to view and manage student registration submissions.
            </p>
            <form onSubmit={handleLogin}>
              <div className="field">
                <label htmlFor="admin-email">Email</label>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="admin-password">Password</label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              {loginError && (
                <div className="error-text" style={{ marginBottom: 16 }}>
                  {loginError}
                </div>
              )}
              <button type="submit" className="primary" style={{ width: "100%" }} disabled={loggingIn}>
                {loggingIn && <span className="spinner" aria-hidden="true" />}
                {loggingIn ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-header">
        <h1>
          Registrations
          <span className="count-badge">{registrations.length}</span>
        </h1>
        <div className="admin-actions">
          <button className="logout-btn" type="button" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner" aria-hidden="true" />
          <span>Loading submissions...</span>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Submitted</th>
                <th>Full Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Course</th>
                <th>City / State</th>
                <th>PCB Total</th>
                <th>NEET</th>
                <th>Payment</th>
                <th>UTR</th>
                <th>Screenshot</th>
                <th>Photo</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <tr key={r.id}>
                  <td>{new Date(r.created_at).toLocaleString()}</td>
                  <td>{r.full_name}</td>
                  <td>{r.mobile}</td>
                  <td>{r.email}</td>
                  <td><span className="course-tag">{r.course}</span></td>
                  <td>{r.city}, {r.state}</td>
                  <td>{r.pcb_total ?? "-"}</td>
                  <td>{r.neet_score ?? "-"}</td>
                  <td>{r.payment_mode}</td>
                  <td>{r.utr_number ?? "-"}</td>
                  <td>
                    {r.payment_screenshot_url ? (
                      <a href={r.payment_screenshot_url} target="_blank" rel="noreferrer">View</a>
                    ) : "-"}
                  </td>
                  <td>
                    {r.photograph_url ? (
                      <a href={r.photograph_url} target="_blank" rel="noreferrer">View</a>
                    ) : "-"}
                  </td>
                </tr>
              ))}
              {registrations.length === 0 && (
                <tr className="empty-row">
                  <td colSpan={12}>
                    <div className="empty-state-icon" aria-hidden="true">📋</div>
                    No submissions yet. Applications will appear here once students register.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
