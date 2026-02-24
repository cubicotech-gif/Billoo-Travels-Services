import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// GET /api/media — admin only: list all files across buckets
export async function GET(request: NextRequest) {
  const supabase = createAdminClient();
  const { searchParams } = new URL(request.url);
  const bucket = searchParams.get("bucket") || "media";

  const { data, error } = await supabase.storage.from(bucket).list("", {
    limit: 200,
    sortBy: { column: "created_at", order: "desc" },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Build public URLs for each file
  const files = (data || [])
    .filter((f) => f.name !== ".emptyFolderPlaceholder")
    .map((f) => {
      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(f.name);
      return {
        name: f.name,
        url: urlData.publicUrl,
        size: f.metadata?.size ?? 0,
        created_at: f.created_at,
        bucket,
      };
    });

  return NextResponse.json({ files });
}

// DELETE /api/media — admin only: delete a file
export async function DELETE(request: NextRequest) {
  const supabase = createAdminClient();
  const body = await request.json();
  const { path, bucket } = body;

  if (!path || !bucket) {
    return NextResponse.json({ error: "path and bucket are required." }, { status: 400 });
  }

  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
