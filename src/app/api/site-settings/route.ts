import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// GET /api/site-settings — public (logo shown to all visitors)
export async function GET() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("site_settings")
    .select("logo_url, logo_width, logo_height")
    .eq("id", 1)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// PATCH /api/site-settings — admin only
// Body: { logo_url?, logo_width?, logo_height? }
export async function PATCH(request: NextRequest) {
  const supabase = createAdminClient();
  const body = await request.json();

  const allowed = ["logo_url", "logo_width", "logo_height"];
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) updates[key] = body[key];
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No valid fields provided" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("site_settings")
    .update(updates)
    .eq("id", 1)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
