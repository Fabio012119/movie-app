import { NextResponse } from "next/server";
import type { ErrorCode } from "@/types/general";

export function redirectWith(req: Request, next: string, error: ErrorCode) {
  const url = new URL("/login", req.url);
  url.searchParams.set("error", error);
  url.searchParams.set("next", next);
  return NextResponse.redirect(url);
}
