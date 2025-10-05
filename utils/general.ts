export const BASE = "https://movie-api-decs.onrender.com/api";

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
