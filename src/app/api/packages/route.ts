import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// GET /api/packages
// ?all=1        → admin: all statuses (uses admin client)
// ?featured=1   → homepage: only featured active packages
// ?type=Umrah   → filter by type
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const all = searchParams.get("all");
  const featured = searchParams.get("featured");

  const supabase = all ? createAdminClient() : createClient();

  let query = supabase.from("packages").select("*").order("id");

  if (!all) {
    query = query.eq("status", "active");
  }
  if (type && type !== "All") {
    query = query.eq("type", type);
  }
  if (featured) {
    query = query.eq("featured", true);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ packages: data });
}

// POST /api/packages — admin only
export async function POST(request: NextRequest) {
  const supabase = createAdminClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from("packages")
    .insert([body])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ package: data }, { status: 201 });
}
