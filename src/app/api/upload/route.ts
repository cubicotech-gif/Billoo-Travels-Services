import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// POST /api/upload — admin only
// Body: FormData with fields: file (File), bucket (string), path (string)
export async function POST(request: NextRequest) {
  const supabase = createAdminClient();
  const formData = await request.formData();

  const file = formData.get("file") as File | null;
  const bucket = (formData.get("bucket") as string) || "media";
  const folder = (formData.get("folder") as string) || "";

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const ext = (file.name.split(".").pop() || "").toLowerCase();
  const fileName = `${folder ? folder + "/" : ""}${Date.now()}.${ext}`;

  // Derive MIME type from extension when file.type is empty or unreliable
  const mimeMap: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
    svg: "image/svg+xml",
    gif: "image/gif",
    mp4: "video/mp4",
    pdf: "application/pdf",
  };
  const contentType = file.type || mimeMap[ext] || "application/octet-stream";

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      contentType,
      upsert: false,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);

  return NextResponse.json({ url: urlData.publicUrl, path: data.path }, { status: 201 });
}
