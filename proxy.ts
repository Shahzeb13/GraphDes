import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Next.js 16 renamed Middleware → Proxy.
 * Guards /admin/* so unauthenticated visitors are sent to the login page.
 *
 * The real authorization happens in the admin layout + route handlers
 * (which verify the JWT with the jsonwebtoken package). The proxy here
 * performs a best-effort signature check using Web Crypto so it can run
 * in the Edge runtime without Node dependencies.
 */

export const COOKIE_NAME = "admin_token";

const JWT_SECRET: string = process.env.JWT_SECRET || "dev-only-secret-change-me";

function base64UrlToBytes(input: string): Uint8Array {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = "=".repeat((4 - (b64.length % 4)) % 4);
  const binary = atob(b64 + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function base64UrlToString(input: string): string {
  return new TextDecoder().decode(base64UrlToBytes(input));
}

async function isValidToken(token: string): Promise<boolean> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    const [header, payload, signature] = parts;
    const data = `${header}.${payload}`;

    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(JWT_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlToBytes(signature) as BufferSource,
      enc.encode(data)
    );
    if (!valid) return false;

    const payloadObj = JSON.parse(base64UrlToString(payload)) as { exp?: number };
    if (typeof payloadObj.exp === "number" && Date.now() / 1000 > payloadObj.exp) return false;
    return true;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (isLogin) {
    // Already signed in — go straight to the dashboard.
    if (token && (await isValidToken(token))) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (!token || !(await isValidToken(token))) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};