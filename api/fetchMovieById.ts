//Utils
import { redirect } from "next/navigation";
import { BASE } from "@/utils/general";

export async function fetchMovieById(id: number, token: string) {
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
