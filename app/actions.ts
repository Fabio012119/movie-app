"use server";

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
  const auth = (await cookies()).get("auth_user");
  if (!auth) redirect("/login?next=/movies");

  const c = await cookies();
  const raw = c.get("fav_ids")?.value || "[]";
  let ids: string[] = [];
  try {
    ids = JSON.parse(raw);
  } catch {}
  const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];

  c.set("fav_ids", JSON.stringify(next), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  const referer = (await headers()).get("referer") || "/movies";
  redirect(referer);
}
