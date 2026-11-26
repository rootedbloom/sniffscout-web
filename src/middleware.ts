import { NextResponse, type NextRequest } from "next/server";

// Old Softr city pages (/dog-friendly-places-union-ky) move to /ky/union.
export function middleware(req: NextRequest) {
  const m = req.nextUrl.pathname.match(/^\/dog-friendly-places-(.+)-([a-z]{2})\/?$/);
  if (m) {
    const url = req.nextUrl.clone();
    url.pathname = `/${m[2]}/${m[1]}`;
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}
