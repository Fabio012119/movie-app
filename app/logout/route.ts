import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const res = NextResponse.redirect(new URL("/", req.url));
  res.cookies.set("auth_token", "", { path: "/", httpOnly: true, maxAge: 0 });
  res.cookies.set("auth_user", "", { path: "/", httpOnly: false, maxAge: 0 });
  return res;
}
