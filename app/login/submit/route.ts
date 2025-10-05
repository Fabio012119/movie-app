import { NextResponse } from "next/server";
import { BASE } from "@/utils/general";
import { redirectWith } from "@/utils/loginRedirects";

export async function POST(req: Request) {
  const form = await req.formData();
  const username = String(form.get("username") || "").trim();
  const password = String(form.get("password") || "");
  const next = String(form.get("next") || "/movies");

  if (!username || !password) {
    return redirectWith(req, next, "missing");
  }

  let apiRes: Response;
  try {
    apiRes = await fetch(`${BASE}/auth/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  } catch {
    return redirectWith(req, next, "network");
  }

  if (apiRes.status === 401 || apiRes.status === 400) {
    return redirectWith(req, next, "invalid");
  }
  if (apiRes.status === 429) {
    return redirectWith(req, next, "rate_limit");
  }
  if (!apiRes.ok) {
    return redirectWith(req, next, "server");
  }

  const data = await apiRes.json();
  const token = data?.token as string | undefined;
  const name = (data?.user?.username as string | undefined) ?? username;

  if (!token) {
    return redirectWith(req, next, "bad_response");
  }

  const res = NextResponse.redirect(new URL(next, req.url));
  res.cookies.set("auth_token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  res.cookies.set("auth_user", encodeURIComponent(name), {
    httpOnly: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return res;
}
