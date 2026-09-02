import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { saveContent } from "@/lib/content";
import { sanitizeContent } from "@/lib/validate";

export const dynamic = "force-dynamic";

export async function PUT(request: Request) {
  const session = await requireAdminApi();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const raw = await request.json();
    const content = sanitizeContent(raw);
    const saved = await saveContent(content);
    return NextResponse.json({ ok: true, content: saved });
  } catch (error) {
    console.error("Save content error:", error);
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}