import { ADMISSION_DOCUMENTS } from "../lib/documents";
import { DocumentActions } from "./DocumentActions";
import { cardHoverClass, mergeClasses } from "../lib/uiClasses";

export function DocumentChecklist({ registration }) {
  return (
    <ul className="m-0 p-0 list-none grid gap-2">
      {ADMISSION_DOCUMENTS.map((doc) => {
        const uploaded = Boolean(registration?.[doc.dbColumn]);
        return (
          <li
            key={doc.name}
            className={mergeClasses(
              "flex items-center justify-between gap-3 px-3.5 py-3 rounded-lg border-[1.5px]",
              uploaded ? "border-success/50 bg-success-bg" : "border-line bg-yellow-bg",
              cardHoverClass
            )}
          >
            <span className="text-sm font-medium text-white">
              {doc.label}
              {doc.required ? (
                <span className="text-red ml-0.5">*</span>
              ) : (
                <span className="text-text-muted font-normal text-xs ml-1">({doc.optionalHint})</span>
              )}
            </span>
            <span className="shrink-0 flex items-center gap-2">
              {uploaded ? (
                <>
                  <span className="text-xs font-semibold text-success">Uploaded</span>
                  <DocumentActions
                    url={registration[doc.dbColumn]}
                    label={doc.label}
                    compact
                  />
                </>
              ) : (
                <span className="text-xs font-semibold text-text-muted">Missing</span>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
