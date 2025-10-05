"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { BASE } from "@/utils/general";
import { cookies, headers } from "next/headers";

export async function toggleFavorite(formData: FormData) {
  const id = String(formData.get("movieId") || "");
  const isFav = String(formData.get("isFav") || "0") === "1";
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) redirect("/login?next=/movies");

  const url = `${BASE}/movies/${id}/favorite`;
  const method = isFav ? "DELETE" : "POST";

  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (res.status === 401) redirect("/login?next=/movies");
  if (!res.ok) throw new Error("Failed to toggle favorite");

  const referer = (await headers()).get("referer") || "/movies";
  const path = new URL(referer).pathname;
  revalidatePath(path);

  return { ok: true, id, nowFav: !isFav };
}
