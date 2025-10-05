import { redirect } from "next/navigation";
import { BASE } from "@/utils/general";
import type { Movie } from "@/types/movie";

export async function fetchMovieById(
  id: number,
  token: string,
): Promise<Movie | null> {
  const url = `${BASE}/movies/${id}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 401) {
    redirect(`/login?next=/movies/${id}`);
  }
  if (!res.ok) return null;
  return res.json();
}
