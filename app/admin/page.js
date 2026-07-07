"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "../../lib/supabase";
import { ADMISSION_DOCUMENTS } from "../../lib/documents";
import {
  adminTableBodyClass,
  adminTableCellClass,
  adminTableClass,
  adminTableHeadCellClass,
  adminTableHeadClass,
  adminTableLinkClass,
  adminTableWrapClass,
  errorTextClass,
  fieldClass,
  inputBase,
  labelClass,
  primaryButtonClass,
  spinnerClass,
} from "../../lib/uiClasses";

function DocumentLinks({ registration }) {
  const links = ADMISSION_DOCUMENTS.filter((doc) => registration[doc.dbColumn]).map((doc) => (
    <a
      key={doc.dbColumn}
      href={registration[doc.dbColumn]}
      target="_blank"
      rel="noreferrer"
      className={adminTableLinkClass}
    >
      {doc.label}
    </a>
  ));

  if (links.length === 0) {
    return "-";
  }

  return <div className="flex flex-wrap gap-1.5">{links}</div>;
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

  const pageClass =
    "max-w-[1200px] mx-auto w-full px-3 sm:px-6 pb-12 sm:pb-16 pt-5 sm:pt-8";

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
          <div className="w-full max-w-[420px] p-7 sm:p-10 bg-white border-[1.5px] border-line rounded-xl shadow-lg">
            <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-red mb-3">
              Staff Portal
            </span>
            <h2 className="text-[clamp(22px,5vw,26px)] mb-2">Configuration Required</h2>
            <p className="text-text-muted text-sm m-0 mb-7 leading-normal">{initError}</p>
            <p className="text-text-muted text-sm m-0 mb-7 leading-normal">
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
      <main className={pageClass}>
        <div className="flex items-center justify-center min-h-[calc(100dvh-220px)] py-6 sm:py-12 px-3 sm:px-6">
          <div className="w-full max-w-[420px] p-7 sm:p-10 bg-white border-[1.5px] border-line rounded-xl shadow-lg">
            <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-red mb-3">
              Staff Portal
            </span>
            <h2 className="text-[clamp(22px,5vw,26px)] mb-2">Admin Login</h2>
            <p className="text-text-muted text-sm m-0 mb-7 leading-normal">
              Sign in to view and manage student registration submissions.
            </p>
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
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
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={pageClass}>
      <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-4 mb-5 pb-4 border-b-3 border-red">
        <h1 className="text-[clamp(20px,5vw,24px)] flex items-center gap-3 flex-wrap text-black">
          Registrations
          <span className="inline-flex items-center justify-center min-w-8 h-7 px-2.5 bg-red text-white font-sans text-[13px] font-semibold rounded-full">
            {registrations.length}
          </span>
        </h1>
        <div className="flex gap-2.5 items-center w-full xs:w-auto">
          <button
            className="bg-white border-[1.5px] border-line px-4 py-2.5 rounded-lg cursor-pointer font-[inherit] text-[13px] font-semibold text-black min-h-11 w-full xs:w-auto transition-[border-color,background,color] hover:border-red hover:bg-red-light hover:text-red"
            type="button"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center gap-4 py-10 sm:py-16 text-text-muted text-sm">
          <div
            className="w-9 h-9 border-3 border-line border-t-red rounded-full animate-spin"
            aria-hidden="true"
          />
          <span>Loading submissions...</span>
        </div>
      ) : (
        <>
          <p className="flex items-center gap-2 m-0 mb-2.5 p-2.5 rounded-lg bg-yellow-soft border border-line text-text-muted text-xs leading-snug md:hidden before:content-['↔'] before:text-red before:font-bold before:shrink-0">
            Each registration appears as a card below. Use a wider screen for the full table view.
          </p>
          <div className={adminTableWrapClass}>
            <table className={adminTableClass}>
              <thead className={adminTableHeadClass}>
                <tr>
                  {[
                    "Submitted",
                    "Full Name",
                    "Mobile",
                    "Email",
                    "City / State",
                    "PCB Total",
                    "NEET",
                    "Payment",
                    "UTR",
                    "Screenshot",
                    "Documents",
                  ].map((heading) => (
                    <th key={heading} className={adminTableHeadCellClass}>
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={adminTableBodyClass}>
                {registrations.map((r) => (
                  <tr key={r.id}>
                    <td className={adminTableCellClass} data-label="Submitted">
                      {new Date(r.created_at).toLocaleString()}
                    </td>
                    <td className={adminTableCellClass} data-label="Full Name">
                      {r.full_name}
                    </td>
                    <td className={adminTableCellClass} data-label="Mobile">
                      {r.mobile}
                    </td>
                    <td className={adminTableCellClass} data-label="Email">
                      {r.email}
                    </td>
                    <td className={adminTableCellClass} data-label="City / State">
                      {r.city}, {r.state}
                    </td>
                    <td className={adminTableCellClass} data-label="PCB Total">
                      {r.pcb_total ?? "-"}
                    </td>
                    <td className={adminTableCellClass} data-label="NEET">
                      {r.neet_score ?? "-"}
                    </td>
                    <td className={adminTableCellClass} data-label="Payment">
                      {r.payment_mode}
                    </td>
                    <td className={adminTableCellClass} data-label="UTR">
                      {r.utr_number ?? "-"}
                    </td>
                    <td className={adminTableCellClass} data-label="Screenshot">
                      {r.payment_screenshot_url ? (
                        <a href={r.payment_screenshot_url} target="_blank" rel="noreferrer" className={adminTableLinkClass}>
                          View
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className={adminTableCellClass} data-label="Documents">
                      <DocumentLinks registration={r} />
                    </td>
                  </tr>
                ))}
                {registrations.length === 0 && (
                  <tr>
                    <td colSpan={12} className="block md:table-cell text-center py-8 sm:py-12 px-5 text-text-muted whitespace-normal before:content-none!">
                      <div className="text-[32px] mb-2 opacity-50" aria-hidden="true">
                        📋
                      </div>
                      No submissions yet. Applications will appear here once students register.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}
