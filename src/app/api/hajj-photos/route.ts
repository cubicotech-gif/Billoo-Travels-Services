import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// GET /api/hajj-photos — the photo library (public; read-only image URLs)
export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("hajj_photos")
    .select("key,label,grp,sort_order,image_url")
    .order("sort_order", { ascending: true });

  if (error) {
    // Migration 013 not run yet — the site simply falls back to placeholders.
    if (error.code === "42P01") return NextResponse.json({ photos: [], tableExists: false });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ photos: data, tableExists: true });
}

// PUT /api/hajj-photos — set or clear one photo (admin)
// Body: { key: string, image_url: string | null }
export async function PUT(request: NextRequest) {
  const supabase = createAdminClient();
  const { key, image_url } = await request.json();
  if (!key || typeof key !== "string") {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }
  const { error } = await supabase
    .from("hajj_photos")
    .update({ image_url: image_url || null })
    .eq("key", key);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
