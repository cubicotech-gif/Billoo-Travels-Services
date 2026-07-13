import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// GET /api/homepage — public (trust bar + how-it-works content)
export async function GET() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("homepage_content")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) {
    // Table not created yet — return null so the homepage just skips these blocks
    if (error.code === "42P01") {
      return NextResponse.json({ content: null, tableExists: false });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ content: data, tableExists: true });
}

// PATCH /api/homepage — admin only
export async function PATCH(request: NextRequest) {
  const supabase = createAdminClient();
  const body = await request.json();

  const allowed = [
    "trust_enabled",
    "trust_items",
    "steps_enabled",
    "steps_label",
    "steps_title",
    "steps_highlight",
    "steps_subtitle",
    "steps",
    "accred_enabled",
    "accred_label",
    "accreditations",
    "licenses_enabled",
    "licenses_label",
    "licenses",
  ];
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) updates[key] = body[key];
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No valid fields provided" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("homepage_content")
    .update(updates)
    .eq("id", 1)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ content: data });
}
