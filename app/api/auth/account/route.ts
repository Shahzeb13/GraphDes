import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import AdminUser, { hashPassword } from "@/models/AdminUser";
import { COOKIE_NAME, SESSION_COOKIE_OPTIONS, getSessionUser, signToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(request: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { currentPassword?: unknown; email?: unknown; newPassword?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const currentPassword = typeof body.currentPassword === "string" ? body.currentPassword : "";
  if (!currentPassword) {
    return NextResponse.json({ error: "Current password is required" }, { status: 400 });
  }

  try {
    await dbConnect();
    const user = await AdminUser.findById(session.id);
    if (!user) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    const ok = await user.comparePassword(currentPassword);
    if (!ok) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 403 });
    }

    if (typeof body.email === "string" && body.email.trim()) {
      const newEmail = body.email.trim().toLowerCase();
      if (newEmail !== user.email) {
        const existing = await AdminUser.findOne({ email: newEmail });
        if (existing) {
          return NextResponse.json({ error: "That email is already in use" }, { status: 400 });
        }
        user.email = newEmail;
      }
    }

    if (typeof body.newPassword === "string" && body.newPassword) {
      if (body.newPassword.length < 8) {
        return NextResponse.json(
          { error: "New password must be at least 8 characters" },
          { status: 400 }
        );
      }
      // Hash the new password with bcryptjs before saving.
      user.password = await hashPassword(body.newPassword);
    }

    await user.save();

    // Re-issue the JWT in case the email changed.
    const token = signToken(String(user._id), user.email);
    const res = NextResponse.json({ ok: true, email: user.email });
    res.cookies.set(COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);
    return res;
  } catch (error) {
    console.error("Update account error:", error);
    return NextResponse.json({ error: "Failed to update account" }, { status: 500 });
  }
}