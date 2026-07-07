"use client";

import Link from "next/link";
import { useStudentSession } from "../hooks/useStudentSession";
import { cardHoverClass, primaryButtonClass, secondaryButtonClass } from "../lib/uiClasses";

export default function HomePage() {
  const { isAuthenticated, checkingSession } = useStudentSession();

  return (
    <>
      <section className="relative overflow-hidden text-white -mx-4 sm:-mx-5 lg:-mx-6 mb-5 sm:mb-9 border-b border-line/50 min-h-[min(520px,85vh)] flex items-end sm:items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: "url('/banner.jpeg')" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#050d18]/95 via-[#0a1628]/82 to-[#0f2847]/55"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#050d18]/90 via-[#0a1628]/25 to-[#0a1628]/40"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(59,130,246,0.18)_0%,transparent_55%)]"
          aria-hidden="true"
        />

        <div className="relative w-full max-w-[900px] mx-auto px-4 sm:px-5 lg:px-6 py-12 sm:py-16 lg:py-20">
          <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-white bg-red/25 border border-red/60 backdrop-blur-sm px-3 py-1 rounded-full mb-4 shadow-md">
            Admissions Open
          </span>
          <h1 className="text-white text-[clamp(28px,6vw,44px)] mb-4 leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] max-w-[640px]">
            KRSU Medical Admissions
          </h1>
          <p className="text-white/85 text-[clamp(15px,3.5vw,17px)] max-w-[580px] m-0 mb-8 leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
            Apply online for medical admissions. Sign in with Google or mobile OTP, complete the
            registration form, and track your application from your personal dashboard.
          </p>
          <div className="flex flex-col xs:flex-row gap-3">
            {!checkingSession && isAuthenticated ? (
              <Link href="/dashboard" className={`${primaryButtonClass} inline-flex no-underline justify-center shadow-lg`}>
                Go to Dashboard
              </Link>
            ) : (
              <Link href="/login" className={`${primaryButtonClass} inline-flex no-underline justify-center shadow-lg`}>
                Login to Apply
              </Link>
            )}
            <Link href="/login?redirect=/application" className={`${secondaryButtonClass} inline-flex no-underline justify-center backdrop-blur-sm bg-yellow-soft/70`}>
              Start Application
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-[900px] mx-auto w-full px-4 sm:px-5 lg:px-6 pb-[max(clamp(40px,8vw,64px),env(safe-area-inset-bottom,0px))]">
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              step: "1",
              title: "Sign in",
              text: "Use Google or mobile OTP to verify your identity securely.",
            },
            {
              step: "2",
              title: "Fill application",
              text: "Complete the form, save drafts, and upload documents at your own pace.",
            },
            {
              step: "3",
              title: "Track & update",
              text: "View your dashboard anytime to check status or upload remaining documents.",
            },
          ].map((item) => (
            <article
              key={item.step}
              className={`bg-yellow-soft border-[1.5px] border-line rounded-xl p-5 shadow-md ${cardHoverClass}`}
            >
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-gradient-to-br from-red to-red-dark text-white text-sm font-bold mb-3 shadow-md">
                {item.step}
              </span>
              <h2 className="font-serif text-white text-lg mb-2">{item.title}</h2>
              <p className="text-sm text-text-muted m-0 leading-relaxed">{item.text}</p>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
