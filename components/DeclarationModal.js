"use client";

import { useEffect } from "react";
import { declarationIntro, declarationPoints } from "../lib/declarationContent";

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
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="declaration-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="declaration-modal-title">Undertaking and Declaration</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close declaration">
            ×
          </button>
        </div>
        <div className="modal-body">
          <p className="declaration-intro">{declarationIntro}</p>
          <ol className="declaration-list">
            {declarationPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ol>
        </div>
        <div className="modal-footer">
          <button type="button" className="primary" onClick={onClose}>
            I have read this
          </button>
        </div>
      </div>
    </div>
  );
}
