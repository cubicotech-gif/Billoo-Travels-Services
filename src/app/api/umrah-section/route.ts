import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// GET /api/umrah-section — public (banner shown to all visitors)
export async function GET() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("umrah_section")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) {
    // Table not created yet — return null so the homepage just skips the section
    if (error.code === "42P01") {
      return NextResponse.json({ section: null, tableExists: false });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ section: data, tableExists: true });
}

// PATCH /api/umrah-section — admin only
export async function PATCH(request: NextRequest) {
  const supabase = createAdminClient();
  const body = await request.json();

  const allowed = [
    "enabled",
    "eyebrow",
    "title",
    "title_highlight",
    "subtitle",
    "bg_image",
    "badge_enabled",
    "badge_text",
    "season_note",
    "cta_label",
    "cta_link",
    "spotlight_type",
    "secondary_enabled",
    "secondary_type",
    "secondary_eyebrow",
    "secondary_title",
    "secondary_title_highlight",
    "secondary_subtitle",
    "secondary_bg_image",
    "secondary_cta_label",
    "secondary_cta_link",
  ];
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) updates[key] = body[key];
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No valid fields provided" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("umrah_section")
    .update(updates)
    .eq("id", 1)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ section: data });
}
