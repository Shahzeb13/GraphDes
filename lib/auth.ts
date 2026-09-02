import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { dbConnect } from "./db";
import AdminUser from "../models/AdminUser";

export const COOKIE_NAME = "admin_token";

const JWT_SECRET: string = process.env.JWT_SECRET || "dev-only-secret-change-me";

export interface AdminSession {
  id: string;
  email: string;
  exp?: number;
}

export function signToken(id: string, email: string): string {
  return jwt.sign({ sub: id, email }, JWT_SECRET, { expiresIn: "12h" });
}

export function verifyToken(token: string): AdminSession | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    if (typeof decoded.sub !== "string") return null;
    return {
      id: decoded.sub,
      email: typeof decoded.email === "string" ? decoded.email : "",
      exp: typeof decoded.exp === "number" ? decoded.exp : undefined,
    };
  } catch {
    return null;
  }
}

/** Read the session from the HttpOnly cookie + verify it against the DB. */
export async function getSessionUser(): Promise<AdminSession | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  try {
    await dbConnect();
    const user = await AdminUser.findById(payload.id).lean().exec();
    if (!user) return null;
    return { id: String(user._id), email: user.email };
  } catch {
    return null;
  }
}

/** Guard for Server Components & Layouts — redirects to login when logged out. */
export async function requireAdmin(): Promise<AdminSession> {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  return user;
}

/** Guard for API Route Handlers — returns null instead of redirecting. */
export async function requireAdminApi(): Promise<AdminSession | null> {
  return getSessionUser();
}

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 12, // 12 hours
};