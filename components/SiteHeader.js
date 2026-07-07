"use client";

import { usePathname } from "next/navigation";

const navLinkClass =
  "text-black text-[13px] font-semibold px-3 py-2.5 rounded-full border-[1.5px] border-line bg-yellow-soft whitespace-nowrap flex-1 md:flex-none text-center min-h-11 inline-flex items-center justify-center transition-[background,border-color,color] hover:bg-red hover:border-red hover:text-white";

export function SiteHeader() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <header className="sticky top-0 z-100 bg-white text-black shadow-sm border-b-3 border-red">
      <div className="max-w-[1100px] mx-auto px-4 md:px-5 lg:px-6 py-3 pb-[max(12px,env(safe-area-inset-bottom,0px))] flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
        <a
          href="/"
          className="flex items-center gap-3 text-inherit no-underline min-w-0 flex-1 hover:text-inherit"
        >
          <span
            className="shrink-0 w-11 h-11 flex items-center justify-center bg-red text-white font-bold text-[13px] tracking-wide rounded-lg"
            aria-hidden="true"
          >
            KRSU
          </span>
          <span className="flex flex-col gap-0.5 min-w-0">
            <span className="font-serif text-[clamp(13px,3.2vw,15px)] font-bold leading-snug text-black">
              KRSU Online Registration Portal
            </span>
            <span className="text-[10px] tracking-wider uppercase text-red font-semibold">
              Medical Admissions
            </span>
          </span>
        </a>
        <nav className="flex items-center gap-2 shrink-0 w-full md:w-auto" aria-label="Site">
          {!isAdmin && (
            <a href="#registration-form" className={navLinkClass}>
              Apply Now
            </a>
          )}
          {!isAdmin && (
            <a href="/admin" className={navLinkClass}>
              Admin
            </a>
          )}
          {isAdmin && (
            <a href="/" className={navLinkClass}>
              Registration Form
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
