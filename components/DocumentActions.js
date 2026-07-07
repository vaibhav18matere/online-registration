"use client";

import { useState } from "react";
import { downloadDocument } from "../lib/downloadDocument";
import { actionLinkClass, mergeClasses } from "../lib/uiClasses";

export function DocumentActions({ url, label, compact }) {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(null);

  async function handleDownload() {
    setError(null);
    setDownloading(true);
    try {
      await downloadDocument(url, label);
    } catch (downloadError) {
      setError(
        downloadError instanceof Error ? downloadError.message : "Download failed."
      );
    } finally {
      setDownloading(false);
    }
  }

  return (
    <span className={mergeClasses("inline-flex flex-col items-end gap-1", compact && "items-start")}>
      <span className="inline-flex flex-wrap items-center gap-1.5">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className={actionLinkClass}
        >
          View
        </a>
        <button
          type="button"
          className={actionLinkClass}
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading ? "..." : "Download"}
        </button>
      </span>
      {error && <span className="text-[10px] text-error">{error}</span>}
    </span>
  );
}
