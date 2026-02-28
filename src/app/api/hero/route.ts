import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// GET /api/hero — returns all hero destinations ordered by sort_order
export async function GET() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("hero_destinations")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    // Table may not exist yet — return empty so page still works
    if (error.code === "42P01") {
      return NextResponse.json({ destinations: [] });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ destinations: data });
}

// POST /api/hero — create a new hero destination (admin only)
export async function POST(request: NextRequest) {
  const supabase = createAdminClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from("hero_destinations")
    .insert([body])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ destination: data }, { status: 201 });
}
