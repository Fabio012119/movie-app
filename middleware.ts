import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const { pathname, search } = req.nextUrl;

  if (pathname.startsWith("/movies") && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    if (pathname !== "/login")
      url.searchParams.set("next", pathname + (search || ""));
    return NextResponse.redirect(url);
  }

  if (pathname === "/login" && token) {
    const next = req.nextUrl.searchParams.get("next") || "/movies";
    const url = req.nextUrl.clone();
    url.pathname = next;
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = { matcher: ["/movies/:path*", "/login"] };
