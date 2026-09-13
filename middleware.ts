import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("x-request-id", crypto.randomUUID());
  res.headers.set("x-flomaila", "1");
  if (req.nextUrl.pathname.startsWith("/api/")) res.headers.set("access-control-allow-origin", "*");
  return res;
}
export const config = { matcher: ["/api/:path*", "/w"] };
