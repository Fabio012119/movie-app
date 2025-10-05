"use server";

import { redirect } from "next/navigation";
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

  const referer = (await headers()).get("referer") || "/movies";
  if (res.status === 200) redirect(referer);
}
