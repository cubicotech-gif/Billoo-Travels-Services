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

  const ext = file.name.split(".").pop();
  // For branding/logo uploads, use a fixed name so re-uploads replace the old file
  const isLogo = bucket === "branding" && folder === "logo";
  const fileName = isLogo
    ? `logo/logo.${ext}`
    : `${folder ? folder + "/" : ""}${Date.now()}.${ext}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
  // Add cache-busting param so browsers don't serve stale logos
  const publicUrl = isLogo
    ? `${urlData.publicUrl}?v=${Date.now()}`
    : urlData.publicUrl;

  return NextResponse.json({ url: publicUrl, path: data.path }, { status: 201 });
}
