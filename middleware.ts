import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  getAdminSessionCookieName,
  verifyAdminSessionToken
} from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isAdminPage = pathname.startsWith("/internal-admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isLoginPage = pathname === "/internal-admin/login";
  const isLoginApi = pathname === "/api/admin/login";

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  if (isLoginPage || isLoginApi) {
    const token = request.cookies.get(getAdminSessionCookieName())?.value;
    const authenticated = await verifyAdminSessionToken(token);

    if (authenticated && isLoginPage) {
      return NextResponse.redirect(new URL("/internal-admin/tools", request.url));
    }

    return NextResponse.next();
  }

  const token = request.cookies.get(getAdminSessionCookieName())?.value;
  const authenticated = await verifyAdminSessionToken(token);

  if (authenticated) {
    return NextResponse.next();
  }

  if (isAdminApi) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/internal-admin/login", request.url);
  loginUrl.searchParams.set("from", `${pathname}${search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/internal-admin/:path*", "/api/admin/:path*"]
};
