"use client";

import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a href="/" className="site-brand">
          <span className="site-brand-mark" aria-hidden="true">KRSU</span>
          <span className="site-brand-text">
            <span className="site-brand-name">KRSU Online Registration Portal</span>
            <span className="site-brand-tagline">Admissions · Medical · Dental · Post Graduate</span>
          </span>
        </a>
        <nav className="site-nav" aria-label="Site">
          {!isAdmin && <a href="#registration-form">Apply Now</a>}
          {!isAdmin && <a href="/admin">Admin</a>}
          {isAdmin && <a href="/">Registration Form</a>}
        </nav>
      </div>
    </header>
  );
}
