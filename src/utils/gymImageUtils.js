const stripTrailingSlash = (s) => (typeof s === "string" ? s.replace(/\/+$/, "") : "");

const isProbablyJsonArrayString = (s) => {
  if (typeof s !== "string") return false;
  const trimmed = s.trim();
  return trimmed.startsWith("[") && trimmed.endsWith("]");
};

// Converts various backend/stored image values into absolute URLs usable in the frontend.
// Handles:
// - absolute http(s) URLs (passes through)
// - `/uploads/...` and `uploads/...` (prefixes with `VITE_API_URL`)
// - old localhost image URLs (swaps host for `VITE_API_URL`)
export function normalizeImageUrl(maybeUrl) {
  if (!maybeUrl) return null;

  if (typeof maybeUrl !== "string") return null;
  const trimmed = maybeUrl.trim();
  if (!trimmed) return null;

  // Allow base64/data URLs too.
  if (trimmed.startsWith("data:")) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) {
    // If the backend previously returned localhost image URLs, rewrite them for production.
    const apiBase = stripTrailingSlash(import.meta.env.VITE_API_URL);
    if (apiBase && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(trimmed)) {
      const path = trimmed.replace(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i, "");
      return `${apiBase}${path.startsWith("/") ? "" : "/"}${path}`;
    }
    return trimmed;
  }

  const apiBase = stripTrailingSlash(import.meta.env.VITE_API_URL);

  // `/uploads/...`
  if (trimmed.startsWith("/uploads/") || trimmed.startsWith("/uploads\\")) {
    return apiBase ? `${apiBase}${trimmed}`.replace(/\\/g, "/") : trimmed.replace(/\\/g, "/");
  }

  // `uploads/...`
  if (trimmed.startsWith("uploads/") || trimmed.startsWith("uploads\\")) {
    const withoutPrefix = trimmed.replace(/^uploads[\\/]/i, "uploads/").replace(/\\/g, "/");
    return apiBase ? `${apiBase}/${withoutPrefix}`.replace(/\/+/g, "/") : withoutPrefix;
  }

  // `.../uploads/...` (relative but includes uploads in the path)
  if (/\/uploads[\\/]/i.test(trimmed)) {
    return apiBase ? `${apiBase}/${trimmed.replace(/^\/+/, "")}`.replace(/\/+/g, "/") : trimmed.replace(/\\/g, "/");
  }

  // Leave other relative paths as-is (likely already handled by browser).
  // We prefer not to guess and break non-gym image values.
  return trimmed;
}

// Accepts gym.images field from backend in a few common shapes:
// - array of URLs
// - single string URL
// - JSON-stringified array
export function normalizeGymImages(imagesField) {
  if (!imagesField) return [];

  if (Array.isArray(imagesField)) {
    return imagesField.map(normalizeImageUrl).filter(Boolean);
  }

  if (typeof imagesField === "string") {
    if (isProbablyJsonArrayString(imagesField)) {
      try {
        const parsed = JSON.parse(imagesField);
        if (Array.isArray(parsed)) return parsed.map(normalizeImageUrl).filter(Boolean);
      } catch {
        // fallthrough to treating it as a single url
      }
    }

    const normalized = normalizeImageUrl(imagesField);
    return normalized ? [normalized] : [];
  }

  // Unknown type.
  return [];
}

