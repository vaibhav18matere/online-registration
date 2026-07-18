"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { useStudentSession } from "../hooks/useStudentSession";

const navLinkClass =
  "text-white/90 text-[13px] font-semibold px-3 py-2.5 rounded-full border-[1.5px] border-line/80 bg-yellow-soft/80 backdrop-blur-sm whitespace-nowrap flex-1 md:flex-none text-center min-h-11 inline-flex items-center justify-center transition-all duration-300 hover:bg-red hover:border-red hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(59,130,246,0.35)] no-underline";

const mobileMenuLinkClass =
  "block w-full text-left text-white text-[15px] font-semibold px-4 py-3.5 rounded-lg border border-transparent transition-colors hover:bg-yellow-muted hover:border-line no-underline min-h-12";

const SECTION_LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#about", label: "About KRSU" },
  { href: "/#mbbs", label: "MBBS at KRSU" },
  { href: "/#advantages", label: "Advantages" },
  { href: "/#rankings", label: "Rankings" },
  { href: "/#careers", label: "Career prospects" },
  { href: "/#benefits", label: "Benefits" },
  { href: "/#counseling", label: "Free counseling" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isLogin = pathname.startsWith("/login");
  const { isAuthenticated, checkingSession, signOut } = useStudentSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  function toggleMenu() {
    setMenuOpen((open) => !open);
  }

  function handleSectionNavigate(event, href) {
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) {
      closeMenu();
      return;
    }

    const sectionId = href.slice(hashIndex + 1);
    if (pathname !== "/") {
      closeMenu();
      return;
    }

    event.preventDefault();
    closeMenu();
    const target = document.getElementById(sectionId);
    if (!target) {
      return;
    }

    window.history.pushState(null, "", href);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header className="sticky top-0 z-100 bg-yellow-soft/90 backdrop-blur-md text-white shadow-md border-b border-line/60">
      <div className="max-w-[1100px] mx-auto px-4 md:px-5 lg:px-6 py-3 pb-[max(12px,env(safe-area-inset-bottom,0px))] flex items-center justify-between gap-3 md:gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 text-inherit no-underline min-w-0 flex-1 hover:text-inherit"
          onClick={closeMenu}
        >
          <Image
            src="/krsu-logo.jpg"
            alt="Kyrgyz Russian Slavic University logo"
            width={44}
            height={44}
            className="shrink-0 w-11 h-11 rounded-lg object-cover shadow-md bg-white"
            priority
          />
          <span className="flex flex-col gap-0.5 min-w-0">
            <span className="font-serif text-[clamp(13px,3.2vw,15px)] font-bold leading-snug text-white">
              KRSU Online Registration Portal
            </span>
            <span className="text-[10px] tracking-wider uppercase text-red font-semibold">
              Medical Admissions
            </span>
          </span>
        </Link>

        <button
          type="button"
          className="md:hidden shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-lg border-[1.5px] border-line bg-yellow-soft text-white transition-colors hover:border-red hover:bg-red-light"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={toggleMenu}
        >
          <span className="relative w-5 h-4" aria-hidden="true">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-2 shrink-0" aria-label="Site">
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

      {menuOpen ? (
        <>
          <button
            type="button"
            className="md:hidden fixed inset-0 top-[73px] z-40 bg-black/50 border-0 cursor-pointer"
            aria-label="Close menu overlay"
            onClick={closeMenu}
          />
          <div
            id={menuId}
            className="md:hidden absolute left-0 right-0 top-full z-50 border-t border-line/60 bg-yellow-bg/98 backdrop-blur-md shadow-lg max-h-[min(75vh,calc(100dvh-73px))] overflow-y-auto"
            role="dialog"
            aria-label="Navigation menu"
          >
            <nav className="px-4 py-4 pb-[max(16px,env(safe-area-inset-bottom,0px))]" aria-label="Mobile">
              {!isAdmin && (
                <div className="mb-4">
                  <p className="m-0 mb-2 px-4 text-[11px] font-bold tracking-widest uppercase text-red">
                    Explore
                  </p>
                  <ul className="m-0 p-0 list-none space-y-1">
                    {SECTION_LINKS.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={mobileMenuLinkClass}
                          onClick={(event) => handleSectionNavigate(event, item.href)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border-t border-line/60 pt-4">
                <p className="m-0 mb-2 px-4 text-[11px] font-bold tracking-widest uppercase text-red">
                  Account
                </p>
                <ul className="m-0 p-0 list-none space-y-1">
                  {isAdmin ? (
                    <li>
                      <Link href="/" className={mobileMenuLinkClass} onClick={closeMenu}>
                        Home
                      </Link>
                    </li>
                  ) : (
                    <>
                      {!checkingSession && isAuthenticated && (
                        <li>
                          <Link href="/dashboard" className={mobileMenuLinkClass} onClick={closeMenu}>
                            Dashboard
                          </Link>
                        </li>
                      )}
                      {!checkingSession && !isAuthenticated && !isLogin && (
                        <li>
                          <Link href="/login" className={mobileMenuLinkClass} onClick={closeMenu}>
                            Login
                          </Link>
                        </li>
                      )}
                      {!checkingSession && isAuthenticated && (
                        <li>
                          <Link href="/application" className={mobileMenuLinkClass} onClick={closeMenu}>
                            Application
                          </Link>
                        </li>
                      )}
                      {!checkingSession && !isAuthenticated && (
                        <li>
                          <Link
                            href="/login?redirect=/application"
                            className={mobileMenuLinkClass}
                            onClick={closeMenu}
                          >
                            Apply Now
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link href="/admin" className={mobileMenuLinkClass} onClick={closeMenu}>
                          Admin
                        </Link>
                      </li>
                      {!checkingSession && isAuthenticated && (
                        <li>
                          <button
                            type="button"
                            className={`${mobileMenuLinkClass} w-full cursor-pointer bg-transparent font-[inherit]`}
                            onClick={() => {
                              closeMenu();
                              signOut();
                            }}
                          >
                            Logout
                          </button>
                        </li>
                      )}
                    </>
                  )}
                </ul>
              </div>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
