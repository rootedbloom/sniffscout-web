import { NextResponse, type NextRequest } from "next/server";

// City pages live at /dog-friendly-places-<city>-<state>, the same addresses as the Softr site.
export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const m = pathname.match(/^\/dog-friendly-places-([a-z0-9-]+)\/?$/);
  if (m) {
    const url = req.nextUrl.clone();
    url.pathname = `/city/${m[1]}`;
    return NextResponse.rewrite(url);
  }
  // Old Softr links for cities without their own page: /dog-friendly-places?city=union-ky
  const c = searchParams.get("city");
  if (pathname.replace(/\/$/, "") === "/dog-friendly-places" && c && /^[a-z0-9-]+$/i.test(c)) {
    const url = req.nextUrl.clone();
    url.pathname = `/dog-friendly-places-${c.toLowerCase()}`;
    url.searchParams.delete("city");
    return NextResponse.redirect(url, 301);
  }
  // /city/<slug> is internal; send visitors to the public address.
  const i = pathname.match(/^\/city\/([a-z0-9-]+)\/?$/);
  if (i && !req.headers.get("x-middleware-rewrite")) {
    const url = req.nextUrl.clone();
    url.pathname = `/dog-friendly-places-${i[1]}`;
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}
