export function getFileNameFromUrl(url, label) {
  const urlPath = url.split("?")[0];
  const extensionMatch = urlPath.match(/\.([a-zA-Z0-9]+)$/);
  const extension = extensionMatch ? extensionMatch[1] : "file";
  const safeLabel = label.replace(/[^a-zA-Z0-9-_]+/g, "-").replace(/^-|-$/g, "");
  return `${safeLabel}.${extension}`;
}

export async function downloadDocument(url, label) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Unable to download file. Please try again.");
  }

  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = blobUrl;
  anchor.download = getFileNameFromUrl(url, label);
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(blobUrl);
}
