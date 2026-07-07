export function mergeClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const inputBase =
  "w-full min-h-11 px-3.5 py-2.5 border-[1.5px] border-line rounded-lg text-base font-[inherit] bg-yellow-bg text-black transition-[border-color,box-shadow] hover:not(:disabled):not(:read-only):border-yellow-border focus:outline-none focus:border-red focus:shadow-[0_0_0_3px_rgba(196,30,58,0.12)] focus:bg-white read-only:bg-yellow-soft read-only:text-text-muted read-only:cursor-not-allowed disabled:bg-yellow-soft disabled:text-text-muted disabled:cursor-not-allowed";

export const inputError =
  "border-error bg-error-bg focus:shadow-[0_0_0_3px_rgba(196,30,58,0.15)]";

export const labelClass =
  "block text-xs sm:text-[13px] font-semibold mb-1.5 text-black";

export const fieldClass = "mb-1 min-w-0";

export const fieldFullClass = "col-span-full";

export const gridClass =
  "grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-x-5 sm:gap-y-4";

export const sectionClass =
  "bg-white border-[1.5px] border-line rounded-xl mb-4 sm:mb-6 shadow-sm overflow-hidden scroll-mt-[140px] md:scroll-mt-[84px]";

export const sectionHeaderClass =
  "flex items-start gap-3.5 px-4 sm:px-7 pt-5 sm:pt-6";

export const sectionNumberClass =
  "shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-red text-white text-sm font-bold rounded-full";

export const sectionTitleClass =
  "font-serif text-red text-lg sm:text-xl mb-1 leading-tight";

export const sectionSubClass = "text-xs sm:text-[13px] text-text-muted m-0";

export const sectionBodyClass =
  "px-4 sm:px-7 pt-4 sm:pt-5 pb-2 sm:pb-3";

export const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 w-full md:w-auto md:min-w-[220px] bg-red text-white border-0 px-7 py-3.5 text-[15px] font-semibold rounded-lg cursor-pointer font-[inherit] shadow-sm transition-[transform,box-shadow,opacity,background] min-h-12 hover:not-disabled:bg-red-dark hover:not-disabled:-translate-y-px hover:not-disabled:shadow-md active:not-disabled:translate-y-0 disabled:opacity-65 disabled:cursor-not-allowed disabled:transform-none";

export const spinnerClass =
  "w-4 h-4 border-2 border-white/35 border-t-white rounded-full animate-spin shrink-0";

export const errorTextClass =
  "text-error text-xs mt-1 flex items-start gap-1 leading-snug before:content-['•'] before:shrink-0";

export const radioRowClass = "flex gap-2.5 flex-wrap";

export const radioOptionClass =
  "flex items-center gap-2 text-sm font-medium text-black mb-0! px-4 py-3 border-[1.5px] border-line rounded-lg cursor-pointer bg-yellow-bg transition-[border-color,background,box-shadow] select-none min-h-11 flex-[1_1_100%] min-w-full xs:flex-[1_1_calc(50%-5px)] xs:min-w-[calc(50%-5px)] has-checked:border-red has-checked:bg-red-light has-checked:shadow-[0_0_0_3px_rgba(196,30,58,0.08)] [&_input]:w-[18px] [&_input]:h-[18px] [&_input]:accent-red [&_input]:cursor-pointer [&_input]:shrink-0";

export function fileDropClass(hasFile) {
  return mergeClasses(
    "block border-2 border-dashed border-line rounded-lg px-4 py-5 sm:py-7 text-center bg-yellow-bg cursor-pointer transition-[border-color,background] hover:border-red hover:bg-yellow-soft",
    hasFile && "border-success border-solid bg-success-bg"
  );
}

export const bannerSuccessClass =
  "flex items-start gap-3 px-4 py-3.5 rounded-lg text-sm sm:text-[14px] mb-5 leading-normal bg-success-bg text-success border-[1.5px] border-green-300 before:content-['✓'] before:shrink-0 before:text-lg before:leading-snug";

export const bannerErrorClass =
  "flex items-start gap-3 px-4 py-3.5 rounded-lg text-sm sm:text-[14px] mb-5 leading-normal bg-error-bg text-error border-[1.5px] border-red-300 before:content-['!'] before:shrink-0 before:text-lg before:font-bold before:leading-snug";

export const marksTableWrapClass =
  "mb-3 sm:overflow-x-auto sm:border-[1.5px] sm:border-line sm:rounded-lg";

export const marksTableClass = "w-full sm:min-w-[320px] border-collapse m-0";

export const marksTableHeadClass = "hidden sm:table-header-group";

export const marksTableHeadCellClass =
  "bg-yellow-soft text-red font-bold text-[11px] uppercase tracking-wide text-left px-4 py-3 border-b border-line";

export const marksTableBodyClass =
  "[&_tr]:block [&_tr]:bg-yellow-bg [&_tr]:border-[1.5px] [&_tr]:border-line [&_tr]:rounded-lg [&_tr]:mb-2.5 [&_tr:last-child]:mb-0 sm:[&_tr]:table-row sm:[&_tr]:bg-transparent sm:[&_tr]:border-0 sm:[&_tr]:rounded-none sm:[&_tr]:mb-0 sm:hover:[&_tr]:bg-yellow-bg";

export const marksTableSubjectCellClass =
  "block px-3.5 py-3 bg-yellow-soft text-[15px] font-semibold sm:table-cell sm:px-4 sm:py-3 sm:bg-transparent sm:text-sm sm:font-semibold sm:border-b sm:border-line";

export const marksTableValueCellClass =
  "flex items-center justify-between gap-3 px-3.5 py-2.5 border-b border-line sm:table-cell sm:px-4 sm:py-3 sm:border-b sm:border-line before:content-[attr(data-label)] before:font-semibold before:text-red before:text-xs before:shrink-0 sm:before:content-none";

export const marksTableInputCellClass =
  "flex flex-col items-stretch px-3.5 py-2.5 sm:table-cell sm:px-4 sm:py-3 before:content-[attr(data-label)] before:font-semibold before:text-red before:text-xs before:mb-1 sm:before:content-none [&_input]:w-full [&_input]:min-h-10 [&_input]:px-2.5 [&_input]:py-2 sm:[&_input]:max-w-[100px]";

export function inputClassName(field, errors) {
  return mergeClasses(inputBase, errors[field] && inputError);
}

export const adminTableWrapClass =
  "md:overflow-x-auto md:bg-white md:border-[1.5px] md:border-line md:rounded-xl md:shadow-sm";

export const adminTableClass =
  "w-full md:min-w-[900px] border-collapse text-[13px]";

export const adminTableHeadClass = "hidden md:table-header-group";

export const adminTableHeadCellClass =
  "sticky top-0 bg-red text-white text-left px-3.5 py-3 whitespace-nowrap text-[11px] font-bold uppercase tracking-wide";

export const adminTableBodyClass =
  "[&_tr]:block [&_tr]:bg-white [&_tr]:border-[1.5px] [&_tr]:border-line [&_tr]:rounded-xl [&_tr]:shadow-sm [&_tr]:mb-3 [&_tr:last-child]:mb-0 md:[&_tr]:table-row md:[&_tr]:bg-transparent md:[&_tr]:border-0 md:[&_tr]:rounded-none md:[&_tr]:shadow-none md:[&_tr]:mb-0 md:hover:[&_tr]:bg-yellow-bg";

export const adminTableCellClass =
  "flex items-start justify-between gap-3 px-3.5 py-2.5 border-b border-line text-right text-black md:table-cell md:text-left md:whitespace-nowrap before:content-[attr(data-label)] before:font-bold before:text-red before:text-[11px] before:uppercase before:tracking-wide before:text-left before:flex-[0_0_42%] before:max-w-[42%] md:before:content-none first:bg-yellow-soft first:font-semibold first:rounded-t-xl md:first:bg-transparent md:first:rounded-none last:border-b-0";

export const adminTableLinkClass =
  "inline-flex items-center gap-1 text-red font-semibold text-xs px-3 py-1.5 bg-yellow-bg rounded-full border border-line transition-[background,border-color] hover:bg-red-light hover:border-red hover:text-red-dark";
