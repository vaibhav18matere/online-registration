"use client";

import { useEffect } from "react";
import { declarationIntro, declarationPoints } from "../lib/declarationContent";
import { primaryButtonClass } from "../lib/uiClasses";

export function DeclarationModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-1000 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-[rgba(20,16,12,0.55)] backdrop-blur-[2px]"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="flex flex-col w-full sm:w-[min(760px,100%)] max-h-[min(92dvh,900px)] sm:max-h-[min(88dvh,900px)] bg-white border-[1.5px] border-line rounded-t-xl sm:rounded-xl shadow-md overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="declaration-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-5 border-b border-line bg-yellow-bg">
          <h2
            id="declaration-modal-title"
            className="m-0 font-serif text-lg sm:text-[22px] text-black"
          >
            Undertaking and Declaration
          </h2>
          <button
            type="button"
            className="inline-flex items-center justify-center w-9 h-9 border-0 rounded-lg bg-transparent text-black text-[28px] leading-none cursor-pointer hover:bg-black/6"
            onClick={onClose}
            aria-label="Close declaration"
          >
            ×
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
          <p className="m-0 mb-5 text-sm sm:text-[14px] leading-relaxed text-black">
            {declarationIntro}
          </p>
          <ol className="m-0 pl-5 grid gap-3">
            {declarationPoints.map((point, index) => (
              <li key={index} className="text-sm sm:text-[14px] leading-relaxed text-black">
                {point}
              </li>
            ))}
          </ol>
        </div>
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-t border-line bg-white">
          <button type="button" className={`${primaryButtonClass} w-full!`} onClick={onClose}>
            I have read this
          </button>
        </div>
      </div>
    </div>
  );
}
