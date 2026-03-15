const SESSION_COOKIE_NAME = "internal_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");
}

async function signValue(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value)
  );

  return toHex(signature);
}

export function isAdminAuthConfigured() {
  return Boolean(getAdminPassword() && getSessionSecret());
}

export function getAdminSessionCookieName() {
  return SESSION_COOKIE_NAME;
}

export async function createAdminSessionToken() {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const secret = getSessionSecret();
  const signature = await signValue(String(expiresAt), secret);
  return `${expiresAt}.${signature}`;
}

export async function verifyAdminSessionToken(token?: string | null) {
  if (!token || !isAdminAuthConfigured()) {
    return false;
  }

  const [expiresAt, signature] = token.split(".");
  if (!expiresAt || !signature) {
    return false;
  }

  if (Number(expiresAt) < Date.now()) {
    return false;
  }

  const expected = await signValue(expiresAt, getSessionSecret());
  return signature === expected;
}

export function verifyAdminPassword(input: string) {
  const expected = getAdminPassword();
  if (!expected || !input) {
    return false;
  }

  return input === expected;
}

export async function isAdminAuthenticated() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(SESSION_COOKIE_NAME)?.value);
}

export async function assertAdminAuthenticated() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    throw new Error("관리자 인증이 필요합니다.");
  }
}

export function getSessionCookieOptions() {
  const secure = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure,
    path: "/",
    maxAge: SESSION_TTL_MS / 1000
  };
}
