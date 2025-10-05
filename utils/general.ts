export const BASE = process.env.API_URL?.replace(/\/$/, "");

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
