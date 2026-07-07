"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useStudentSession } from "../../hooks/useStudentSession";
import { getSupabase } from "../../lib/supabase";
import { REGISTRATION_STATUS_LABELS } from "../../lib/formState";
import { fetchMyRegistration, getDocumentCompletion } from "../../lib/registrationService";
import { DocumentChecklist } from "../../components/DocumentChecklist";
import {
  bannerErrorClass,
  primaryButtonClass,
  secondaryButtonClass,
  sectionClass,
  sectionBodyClass,
  sectionTitleClass,
} from "../../lib/uiClasses";

export default function DashboardPage() {
  const { session, checkingSession, initError, loginDisplay, signOut, isAuthenticated } =
    useStudentSession();
  const [registration, setRegistration] = useState(null);
  const [loadingRegistration, setLoadingRegistration] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (!session?.user?.id) {
      return;
    }

    async function loadRegistration() {
      setLoadingRegistration(true);
      setLoadError(null);
      try {
        const data = await fetchMyRegistration(getSupabase(), session.user.id);
        setRegistration(data);
      } catch (error) {
        setLoadError(
          error instanceof Error ? error.message : "Unable to load your application."
        );
      } finally {
        setLoadingRegistration(false);
      }
    }

    loadRegistration();
  }, [session]);

  if (checkingSession || (isAuthenticated && loadingRegistration)) {
    return (
      <main className="max-w-[900px] mx-auto w-full px-4 sm:px-5 lg:px-6 py-12">
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-text-muted text-sm">
          <div
            className="w-9 h-9 border-3 border-line border-t-red rounded-full animate-spin"
            aria-hidden="true"
          />
          <span>Loading your dashboard...</span>
        </div>
      </main>
    );
  }

  if (initError) {
    return (
      <main className="max-w-[900px] mx-auto w-full px-4 sm:px-5 lg:px-6 py-12">
        <div className={bannerErrorClass} role="alert">
          {initError}
        </div>
      </main>
    );
  }

  const docCompletion = getDocumentCompletion(registration);

  return (
    <main className="max-w-[900px] mx-auto w-full px-4 sm:px-5 lg:px-6 py-6 sm:py-10 pb-[max(48px,env(safe-area-inset-bottom,0px))]">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-red text-[clamp(24px,5vw,32px)] mb-2">My Dashboard</h1>
          <p className="m-0">
            Logged in as <strong>{loginDisplay}</strong>
          </p>
        </div>
        <button type="button" className={secondaryButtonClass} onClick={signOut}>
          Log out
        </button>
      </div>

      {loadError && (
        <div className={`${bannerErrorClass} mb-5`} role="alert">
          {loadError}
        </div>
      )}

      {!registration ? (
        <section className={sectionClass}>
          <div className={sectionBodyClass}>
            <h2 className={sectionTitleClass}>Start your application</h2>
            <p className="text-sm text-text-muted mt-2 mb-6 leading-relaxed">
              You have not started an application yet. Complete the registration form to apply for
              admission. You can save a draft and return anytime.
            </p>
            <Link href="/application" className={`${primaryButtonClass} inline-flex no-underline`}>
              Start Application
            </Link>
          </div>
        </section>
      ) : (
        <>
          <section className={sectionClass}>
            <div className={sectionBodyClass}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <h2 className={sectionTitleClass}>{registration.full_name || "Your Application"}</h2>
                <span
                  className="inline-flex self-start px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-yellow-soft border border-line text-red"
                >
                  {REGISTRATION_STATUS_LABELS[registration.status] || registration.status}
                </span>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm m-0">
                <div>
                  <dt className="text-text-muted font-semibold mb-0.5">Email</dt>
                  <dd className="m-0">{registration.email || "—"}</dd>
                </div>
                <div>
                  <dt className="text-text-muted font-semibold mb-0.5">Mobile</dt>
                  <dd className="m-0">{registration.mobile || "—"}</dd>
                </div>
                <div>
                  <dt className="text-text-muted font-semibold mb-0.5">City / State</dt>
                  <dd className="m-0">
                    {[registration.city, registration.state].filter(Boolean).join(", ") || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-text-muted font-semibold mb-0.5">NEET Score</dt>
                  <dd className="m-0">{registration.neet_score ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-text-muted font-semibold mb-0.5">PCB Total</dt>
                  <dd className="m-0">{registration.pcb_total ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-text-muted font-semibold mb-0.5">Payment</dt>
                  <dd className="m-0">{registration.payment_mode || "—"}</dd>
                </div>
              </dl>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Link href="/application" className={`${primaryButtonClass} inline-flex no-underline text-center justify-center`}>
                  {registration.status === "draft" ? "Continue Application" : "Edit Application"}
                </Link>
                {registration.status === "draft" && (
                  <Link
                    href="/application#documents"
                    className={`${secondaryButtonClass} inline-flex no-underline text-center justify-center`}
                  >
                    Upload Documents
                  </Link>
                )}
              </div>
            </div>
          </section>

          <section className={`${sectionClass} mt-5`}>
            <div className={sectionBodyClass}>
              <div className="flex items-center justify-between gap-3 mb-4">
                <h2 className={sectionTitleClass}>Documents</h2>
                <span className="text-xs font-semibold text-text-muted">
                  {docCompletion.uploaded}/{docCompletion.total} uploaded
                  {docCompletion.requiredMissing > 0 &&
                    ` · ${docCompletion.requiredMissing} required missing`}
                </span>
              </div>
              <DocumentChecklist registration={registration} />
            </div>
          </section>
        </>
      )}
    </main>
  );
}
