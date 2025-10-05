"use server";
import { cookies } from "next/headers";
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
