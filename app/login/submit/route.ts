import { NextResponse } from "next/server";
import { BASE } from "@/utils/general";

const LOGIN_URL = `${BASE?.replace(/\/$/, "")}/auth/login`;

export async function POST(req: Request) {
  const form = await req.formData();
  const username = String(form.get("username") || "").trim();
  const password = String(form.get("password") || "");
  const next = String(form.get("next") || "/movies");

  if (!username || !password) {
    const url = new URL("/login", req.url);
    url.searchParams.set("error", "missing");
    url.searchParams.set("next", next);
    return NextResponse.redirect(url);
  }

  let apiRes: Response;
  try {
    apiRes = await fetch(LOGIN_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
    });
  } catch {
    const url = new URL("/login", req.url);
    url.searchParams.set("error", "network");
    url.searchParams.set("next", next);
    return NextResponse.redirect(url);
  }

  if (apiRes.status === 401 || apiRes.status === 400) {
    const url = new URL("/login", req.url);
    url.searchParams.set("error", "invalid");
    url.searchParams.set("next", next);
    return NextResponse.redirect(url);
  }
  if (apiRes.status === 429) {
    const url = new URL("/login", req.url);
    url.searchParams.set("error", "rate_limit");
    url.searchParams.set("next", next);
    return NextResponse.redirect(url);
  }
  if (!apiRes.ok) {
    const url = new URL("/login", req.url);
    url.searchParams.set("error", "server");
    url.searchParams.set("next", next);
    return NextResponse.redirect(url);
  }

  const data = await apiRes.json().catch(() => ({}));
  const token = data?.token as string | undefined;
  const name = (data?.user?.username as string | undefined) ?? username;

  if (!token) {
    const url = new URL("/login", req.url);
    url.searchParams.set("error", "bad_response");
    url.searchParams.set("next", next);
    return NextResponse.redirect(url);
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
