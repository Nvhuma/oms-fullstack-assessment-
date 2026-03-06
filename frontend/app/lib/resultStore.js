/**
 * Small wrapper around sessionStorage for passing results between pages.
 * Keeps pages short and easier to debug.
 */
const KEY = "uploadResult";

export function setResult(value) {
  sessionStorage.setItem(KEY, JSON.stringify(value));
}

export function getResult() {
  const raw = sessionStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearResult() {
  sessionStorage.removeItem(KEY);
}
