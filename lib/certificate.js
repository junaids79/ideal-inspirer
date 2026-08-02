// Generates a human-readable, reasonably-unique certificate number.
// Format: CERT-YYYYMMDD-XXXXXX (X = random base36 chars)
export function generateCertificateNo() {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `CERT-${datePart}-${randomPart}`;
}