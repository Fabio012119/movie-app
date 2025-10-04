"use server";
import { BASE } from "@/utils/general";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/movies");

  if (!username || !password) {
    redirect(`/login?error=missing&next=${encodeURIComponent(next)}`);
  }

  (await cookies()).set("auth_user", username, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  redirect(next);
}

export async function logout() {
  (await cookies()).delete("auth_user");
  redirect("/login");
}

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
