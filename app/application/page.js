"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useStudentSession } from "../../hooks/useStudentSession";
import { getSupabase } from "../../lib/supabase";
import { fetchMyRegistration } from "../../lib/registrationService";
import { RegistrationForm } from "../../components/RegistrationForm";
import { bannerErrorClass } from "../../lib/uiClasses";

function ApplicationContent() {
  const { session, checkingSession, initError, verifiedMobile, isPhoneLogin, googleEmail } =
    useStudentSession();
  const [registration, setRegistration] = useState(null);
  const [loadingRegistration, setLoadingRegistration] = useState(true);

  useEffect(() => {
    if (!session?.user?.id) {
      return;
    }

    async function loadRegistration() {
      setLoadingRegistration(true);
      try {
        const data = await fetchMyRegistration(getSupabase(), session.user.id);
        setRegistration(data);
      } finally {
        setLoadingRegistration(false);
      }
    }

    loadRegistration();
  }, [session]);

  if (checkingSession || loadingRegistration) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-text-muted text-sm">
        <div
          className="w-9 h-9 border-3 border-line border-t-red rounded-full animate-spin"
          aria-hidden="true"
        />
        <span>Loading application...</span>
      </div>
    );
  }

  if (initError) {
    return <div className={bannerErrorClass} role="alert">{initError}</div>;
  }

  return (
    <>
      <div className="relative overflow-hidden bg-yellow-soft/60 backdrop-blur-sm text-white -mx-4 sm:-mx-5 lg:-mx-6 mb-5 sm:mb-9 px-4 sm:px-5 lg:px-6 py-7 sm:py-9 lg:py-12 border-b border-line/50">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(59,130,246,0.15)_0%,transparent_45%),radial-gradient(circle_at_5%_95%,rgba(37,99,235,0.2)_0%,transparent_50%)]"
          aria-hidden="true"
        />
        <div className="relative max-w-[900px] mx-auto">
          <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-white bg-red/20 border border-red/50 px-3 py-1 rounded-full mb-3.5">
            Admissions Open
          </span>
          <h1 className="text-white text-[clamp(24px,6vw,38px)] mb-3">Student Registration Form</h1>
          <p className="text-black-soft text-[clamp(14px,3.5vw,15px)] max-w-[560px] m-0 mb-3 leading-relaxed">
            Please fill in all details carefully as per your official documents. Fields marked with
            * are mandatory.
          </p>
          <Link href="/dashboard" className="text-sm font-semibold text-red hover:text-red-dark">
            ← Back to dashboard
          </Link>
        </div>
      </div>

      <RegistrationForm
        registration={registration}
        verifiedMobile={verifiedMobile}
        isPhoneLogin={isPhoneLogin}
        googleEmail={googleEmail}
      />
    </>
  );
}

export default function ApplicationPage() {
  return (
    <main className="max-w-[900px] mx-auto w-full px-4 sm:px-5 lg:px-6 pb-[max(clamp(40px,8vw,64px),env(safe-area-inset-bottom,0px))]">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-text-muted text-sm">
            <div
              className="w-9 h-9 border-3 border-line border-t-red rounded-full animate-spin"
              aria-hidden="true"
            />
            <span>Loading...</span>
          </div>
        }
      >
        <ApplicationContent />
      </Suspense>
    </main>
  );
}
