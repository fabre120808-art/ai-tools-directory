import { NextResponse } from "next/server";
import { getAdminSessionCookieName, getSessionCookieOptions } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/internal-admin/login", request.url));
  response.cookies.set(getAdminSessionCookieName(), "", {
    ...getSessionCookieOptions(),
    maxAge: 0
  });
  return response;
}
