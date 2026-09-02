import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import AdminUser from "@/models/AdminUser";
import { COOKIE_NAME, SESSION_COOKIE_OPTIONS, signToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Best-effort in-memory rate limiting (per server instance).
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 6;
const attempts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let email = "";
  let password = "";
  try {
    const body = await request.json();
    email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  try {
    await dbConnect();
    const user = await AdminUser.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const ok = await user.comparePassword(password);
    if (!ok) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = signToken(String(user._id), user.email);
    const res = NextResponse.json({ ok: true, email: user.email });
    res.cookies.set(COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);
    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Check the database connection and try again." },
      { status: 500 }
    );
  }
}