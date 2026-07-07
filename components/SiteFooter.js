export function SiteFooter() {
  return (
    <footer className="mt-auto bg-yellow-soft/80 backdrop-blur-sm text-white border-t border-line/60">
      <div className="max-w-[1100px] mx-auto px-4 md:px-5 lg:px-6 py-7 md:py-9 pb-6 md:pb-7 grid grid-cols-1 gap-5">
        <div>
          <p className="m-0 text-[13px] leading-relaxed text-red font-semibold">
            Online Registration Portal
          </p>
          <p className="mt-2 m-0 text-xs leading-relaxed text-text-muted">
            For assistance, contact the admissions office during working hours.
          </p>
        </div>
      </div>
    </footer>
  );
}
