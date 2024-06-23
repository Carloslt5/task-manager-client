export function getEndpoint() {
  return import.meta.env.VITE_APP_ENDPOINT || "/api";
}

export const API_DEFAULT_LIMIT = 10;
