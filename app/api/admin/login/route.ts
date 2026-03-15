import { NextResponse } from "next/server";
import {
  createAdminSessionToken,
  getSessionCookieOptions,
  getAdminSessionCookieName,
  isAdminAuthConfigured,
  verifyAdminPassword
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirectTo") ?? "/internal-admin/tools");
  const url = new URL(request.url);
  const safeRedirectTo =
    redirectTo.startsWith("/internal-admin") && !redirectTo.startsWith("//")
      ? redirectTo
      : "/internal-admin/tools";

  if (!isAdminAuthConfigured()) {
    return NextResponse.redirect(new URL("/internal-admin/login?error=config", url));
  }

  if (!verifyAdminPassword(password)) {
    return NextResponse.redirect(new URL("/internal-admin/login?error=invalid", url));
  }

  const response = NextResponse.redirect(new URL(safeRedirectTo, url));
  response.cookies.set(
    getAdminSessionCookieName(),
    await createAdminSessionToken(),
    getSessionCookieOptions()
  );

  return response;
}
