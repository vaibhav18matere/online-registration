export function mergeClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const cardHoverClass =
  "transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(59,130,246,0.22)] hover:border-blue-400/45";

export const inputBase =
  "w-full min-h-11 px-3.5 py-2.5 border-[1.5px] border-line rounded-lg text-base font-[inherit] bg-yellow-soft text-white transition-[border-color,box-shadow,background] hover:not(:disabled):not(:read-only):border-yellow-border focus:outline-none focus:border-red focus:shadow-[0_0_0_3px_rgba(59,130,246,0.25)] focus:bg-yellow-muted read-only:bg-yellow-bg read-only:text-text-muted read-only:cursor-not-allowed disabled:bg-yellow-bg disabled:text-text-muted disabled:cursor-not-allowed";

export const inputError =
  "border-error bg-error-bg focus:shadow-[0_0_0_3px_rgba(248,113,113,0.2)]";

export const labelClass =
  "block text-xs sm:text-[13px] font-semibold mb-1.5 text-white/90";

export const fieldClass = "mb-1 min-w-0";

export const fieldFullClass = "col-span-full";

export const gridClass =
  "grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-x-5 sm:gap-y-4";

export const sectionClass = mergeClasses(
  "bg-yellow-soft border-[1.5px] border-line rounded-xl mb-4 sm:mb-6 shadow-md overflow-hidden scroll-mt-[140px] md:scroll-mt-[84px]",
  cardHoverClass
);

export const sectionHeaderClass =
  "flex items-start gap-3.5 px-4 sm:px-7 pt-5 sm:pt-6";

export const sectionNumberClass =
  "shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-gradient-to-br from-red to-red-dark text-white text-sm font-bold rounded-full shadow-md";

export const sectionTitleClass =
  "font-serif text-white text-lg sm:text-xl mb-1 leading-tight";

export const sectionSubClass = "text-xs sm:text-[13px] text-text-muted m-0";

export const sectionBodyClass =
  "px-4 sm:px-7 pt-4 sm:pt-5 pb-2 sm:pb-3";

export const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 w-full md:w-auto md:min-w-[220px] bg-gradient-to-r from-red to-red-dark text-white border-0 px-7 py-3.5 text-[15px] font-semibold rounded-lg cursor-pointer font-[inherit] shadow-md transition-[transform,box-shadow,opacity,background] min-h-12 hover:not-disabled:from-red-dark hover:not-disabled:to-red hover:not-disabled:-translate-y-0.5 hover:not-disabled:shadow-[0_8px_24px_rgba(59,130,246,0.4)] active:not-disabled:translate-y-0 disabled:opacity-65 disabled:cursor-not-allowed disabled:transform-none";

export const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 w-full md:w-auto md:min-w-[160px] bg-yellow-soft text-white border-[1.5px] border-line px-7 py-3.5 text-[15px] font-semibold rounded-lg cursor-pointer font-[inherit] shadow-sm transition-all duration-300 min-h-12 hover:not-disabled:border-red hover:not-disabled:bg-red-light hover:not-disabled:text-white hover:not-disabled:-translate-y-0.5 disabled:opacity-65 disabled:cursor-not-allowed";

export const spinnerClass =
  "w-4 h-4 border-2 border-white/35 border-t-white rounded-full animate-spin shrink-0";

export const errorTextClass =
  "text-error text-xs mt-1 flex items-start gap-1 leading-snug before:content-['•'] before:shrink-0";

export const radioRowClass = "flex gap-2.5 flex-wrap";

export const radioOptionClass =
  "flex items-center gap-2 text-sm font-medium text-white mb-0! px-4 py-3 border-[1.5px] border-line rounded-lg cursor-pointer bg-yellow-bg transition-all duration-300 select-none min-h-11 flex-[1_1_100%] min-w-full xs:flex-[1_1_calc(50%-5px)] xs:min-w-[calc(50%-5px)] has-checked:border-red has-checked:bg-red-light has-checked:shadow-[0_0_0_3px_rgba(59,130,246,0.2)] hover:border-blue-400/50 [&_input]:w-[18px] [&_input]:h-[18px] [&_input]:accent-red [&_input]:cursor-pointer [&_input]:shrink-0";

export function fileDropClass(hasFile) {
  return mergeClasses(
    "block border-2 border-dashed border-line rounded-lg px-4 py-5 sm:py-7 text-center bg-yellow-bg cursor-pointer transition-all duration-300 hover:border-red hover:bg-yellow-soft hover:-translate-y-0.5",
    hasFile && "border-success border-solid bg-success-bg"
  );
}

export const bannerSuccessClass =
  "flex items-start gap-3 px-4 py-3.5 rounded-lg text-sm sm:text-[14px] mb-5 leading-normal bg-success-bg text-success border-[1.5px] border-green-500/40 before:content-['✓'] before:shrink-0 before:text-lg before:leading-snug";

export const bannerErrorClass =
  "flex items-start gap-3 px-4 py-3.5 rounded-lg text-sm sm:text-[14px] mb-5 leading-normal bg-error-bg text-error border-[1.5px] border-red-400/40 before:content-['!'] before:shrink-0 before:text-lg before:font-bold before:leading-snug";

export const actionLinkClass =
  "inline-flex items-center gap-1 text-red font-semibold text-xs px-3 py-1.5 bg-yellow-bg rounded-full border border-line transition-all duration-300 hover:bg-red-light hover:border-red hover:text-white hover:-translate-y-px cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

export const marksTableWrapClass =
  "mb-3 sm:overflow-x-auto sm:border-[1.5px] sm:border-line sm:rounded-lg";

export const marksTableClass = "w-full sm:min-w-[320px] border-collapse m-0";

export const marksTableHeadClass = "hidden sm:table-header-group";

export const marksTableHeadCellClass =
  "bg-yellow-muted text-white font-bold text-[11px] uppercase tracking-wide text-left px-4 py-3 border-b border-line";

export const marksTableBodyClass =
  "[&_tr]:block [&_tr]:bg-yellow-bg [&_tr]:border-[1.5px] [&_tr]:border-line [&_tr]:rounded-lg [&_tr]:mb-2.5 [&_tr:last-child]:mb-0 sm:[&_tr]:table-row sm:[&_tr]:bg-transparent sm:[&_tr]:border-0 sm:[&_tr]:rounded-none sm:[&_tr]:mb-0 sm:hover:[&_tr]:bg-yellow-soft/50";

export const marksTableSubjectCellClass =
  "block px-3.5 py-3 bg-yellow-muted/50 text-[15px] font-semibold text-white sm:table-cell sm:px-4 sm:py-3 sm:bg-transparent sm:text-sm sm:font-semibold sm:border-b sm:border-line";

export const marksTableValueCellClass =
  "flex items-center justify-between gap-3 px-3.5 py-2.5 border-b border-line text-white sm:table-cell sm:px-4 sm:py-3 sm:border-b sm:border-line before:content-[attr(data-label)] before:font-semibold before:text-red before:text-xs before:shrink-0 sm:before:content-none";

export const marksTableInputCellClass =
  "flex flex-col items-stretch px-3.5 py-2.5 sm:table-cell sm:px-4 sm:py-3 before:content-[attr(data-label)] before:font-semibold before:text-red before:text-xs before:mb-1 sm:before:content-none [&_input]:w-full [&_input]:min-h-10 [&_input]:px-2.5 [&_input]:py-2 sm:[&_input]:max-w-[100px]";

export function inputClassName(field, errors) {
  return mergeClasses(inputBase, errors[field] && inputError);
}

export const adminTableLinkClass = actionLinkClass;
