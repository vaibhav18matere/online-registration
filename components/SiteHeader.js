"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStudentSession } from "../hooks/useStudentSession";

const navLinkClass =
  "text-white/90 text-[13px] font-semibold px-3 py-2.5 rounded-full border-[1.5px] border-line/80 bg-yellow-soft/80 backdrop-blur-sm whitespace-nowrap flex-1 md:flex-none text-center min-h-11 inline-flex items-center justify-center transition-all duration-300 hover:bg-red hover:border-red hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(59,130,246,0.35)] no-underline";

export function SiteHeader() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isLogin = pathname.startsWith("/login");
  const { isAuthenticated, checkingSession, signOut } = useStudentSession();

  return (
    <header className="sticky top-0 z-100 bg-yellow-soft/90 backdrop-blur-md text-white shadow-md border-b border-line/60">
      <div className="max-w-[1100px] mx-auto px-4 md:px-5 lg:px-6 py-3 pb-[max(12px,env(safe-area-inset-bottom,0px))] flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 text-inherit no-underline min-w-0 flex-1 hover:text-inherit"
        >
          <span
            className="shrink-0 w-11 h-11 flex items-center justify-center bg-gradient-to-br from-red to-red-dark text-white font-bold text-[13px] tracking-wide rounded-lg shadow-md"
            aria-hidden="true"
          >
            KRSU
          </span>
          <span className="flex flex-col gap-0.5 min-w-0">
            <span className="font-serif text-[clamp(13px,3.2vw,15px)] font-bold leading-snug text-white">
              KRSU Online Registration Portal
            </span>
            <span className="text-[10px] tracking-wider uppercase text-red font-semibold">
              Medical Admissions
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-2 shrink-0 w-full md:w-auto" aria-label="Site">
          {!isAdmin && !checkingSession && isAuthenticated && (
            <Link href="/dashboard" className={navLinkClass}>
              Dashboard
            </Link>
          )}
          {!isAdmin && !checkingSession && !isAuthenticated && !isLogin && (
            <Link href="/login" className={navLinkClass}>
              Login
            </Link>
          )}
          {!isAdmin && !checkingSession && isAuthenticated && (
            <Link href="/application" className={navLinkClass}>
              Application
            </Link>
          )}
          {!isAdmin && !checkingSession && !isAuthenticated && (
            <Link href="/login?redirect=/application" className={navLinkClass}>
              Apply Now
            </Link>
          )}
          {!isAdmin && (
            <Link href="/admin" className={navLinkClass}>
              Admin
            </Link>
          )}
          {!isAdmin && !checkingSession && isAuthenticated && (
            <button type="button" className={navLinkClass} onClick={signOut}>
              Logout
            </button>
          )}
          {isAdmin && (
            <Link href="/" className={navLinkClass}>
              Home
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
