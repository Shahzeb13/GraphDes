import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { cloudinaryV2 } from "@/lib/cloudinary";
import { ALLOWED_UPLOAD_TYPES, MAX_UPLOAD_BYTES } from "@/lib/validate";

export const dynamic = "force-dynamic";
// Cloudinary's Node SDK needs the Node runtime.
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const session = await requireAdminApi();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let file: File | null = null;
  try {
    const formData = await request.formData();
    const maybeFile = formData.get("file");
    if (maybeFile instanceof File) file = maybeFile;
  } catch {
    return NextResponse.json({ error: "Invalid upload request" }, { status: 400 });
  }

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const mime = file.type || "application/octet-stream";
  if (!(ALLOWED_UPLOAD_TYPES as readonly string[]).includes(mime)) {
    return NextResponse.json(
      { error: "Unsupported file type. Use PNG, JPG, WEBP, GIF, SVG, or PDF." },
      { status: 415 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (buffer.byteLength > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: "File too large (max 12MB)" }, { status: 413 });
  }

  const isPdf = mime === "application/pdf";

  try {
    // Upload as a base64 data URI directly to Cloudinary.
    const result = await cloudinaryV2.uploader.upload(
      `data:${mime};base64,${buffer.toString("base64")}`,
      {
        folder: "portfolio",
        resource_type: isPdf ? "raw" : "image",
        use_filename: true,
        unique_filename: true,
      }
    );
    return NextResponse.json({ url: result.secure_url, publicId: result.public_id });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      { error: "Upload failed. Check your Cloudinary credentials." },
      { status: 500 }
    );
  }
}