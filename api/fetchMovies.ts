import { BASE } from "@/utils/general";
import type { MoviesResponse } from "@/types/movie";

export async function fetchMovies(
  page: number,
  token?: string,
): Promise<MoviesResponse | null> {
  const PER_PAGE = 8;
  const url = `${BASE}/movies?page=${page}&limit=${PER_PAGE}`;
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) return null;
  return res.json();
}
